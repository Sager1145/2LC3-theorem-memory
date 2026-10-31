#!/usr/bin/env python3
"""Built/portable startup, verified snapshots and exact-version offline caches.
Usage: python3 tests/browser_loading.py [--browser chromium|webkit] [--site DIR]
--measure prints three cold runs with 10 Mbps, 100 ms RTT and 4x CPU throttling
(Chromium only; this local HTTP server does not gzip responses).
"""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import statistics
import socket
import subprocess
import sys
import tempfile
import threading
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]


class Handler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def do_GET(self):
        if urlparse(self.path).path.startswith('/data/'):
            self.server.bank_requests.append(self.path)
        if self.server.offline:
            self.connection.shutdown(socket.SHUT_RDWR)
            self.connection.close()
            return
        if '/assets/' in urlparse(self.path).path and self.server.fail_assets:
            self.server.unexpected_assets.append(self.path)
            self.send_error(503)
            return
        super().do_GET()


class Server(ThreadingHTTPServer):
    request_queue_size = 128
    fail_assets = False
    offline = False


def ready(page):
    page.wait_for_function('typeof TQDiagnostics === "function"')
    assert page.locator('[data-action=start]').first.is_visible()
    return page.evaluate('TQDiagnostics()')


def instrumentation(context):
    context.add_init_script('''window.__digests=[];
        const digest=crypto.subtle.digest.bind(crypto.subtle);
        crypto.subtle.digest=async (...args)=>{__digests.push(args[1].byteLength);return digest(...args)};
        new MutationObserver(()=>{if(document.querySelector('[data-action=start]')&&!window.__ready)
            window.__ready=performance.now()}).observe(document,{subtree:true,childList:true});''')


def run(browser, site, url, server, errors):
    context = browser.new_context(service_workers='allow')
    instrumentation(context)
    page = context.new_page()
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.goto(url)
    initial = ready(page)
    assert page.evaluate('__digests') == [], 'Uninstalled banks should not hash at startup'
    assert page.evaluate('TQ_BUNDLED_FINGERPRINT.length') == 64
    assert initial['cardCount'] > 0 and initial['proofCount'] > 0
    page.wait_for_function('navigator.serviceWorker.controller !== null')
    page.evaluate("localStorage.setItem('tq.progress.v1',JSON.stringify({...TQEngine.freshProgress(),xp:123}))")
    # Leave networking available for HTML/SW, but fail every asset request.
    # Cached scripts must load without making those requests.
    server.fail_assets = True
    page.reload()
    assert ready(page)['view'] == 'home'
    assert page.evaluate('JSON.parse(localStorage.getItem("tq.progress.v1")).xp') == 123
    assert server.unexpected_assets == [], server.unexpected_assets
    # Drop actual HTTP connections: Playwright's WebKit offline toggle can
    # reject the navigation itself before allowing a Service Worker fallback.
    server.offline = True
    page.reload()
    assert ready(page)['view'] == 'home'
    server.offline = False
    server.fail_assets = False
    context.close()

    # Seed a genuinely verified persisted snapshot using built update files.
    manifest = json.loads((site/'data/version.json').read_text())
    snapshot = {'manifest':manifest,'theoremText':(site/'data/theorems.json').read_text(),
                'sourceText':(site/'data/sources.json').read_text(),
                'studyText':(site/'data/study.json').read_text()}
    context = browser.new_context(service_workers='block')
    instrumentation(context)
    page = context.new_page()
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.goto(url)
    ready(page)
    page.evaluate('''async snapshot=>{
        snapshot.bundledFingerprint=TQ_BUNDLED_FINGERPRINT;
        await new Promise((resolve,reject)=>{
            const request=indexedDB.open('theorem-quest-bank',1);
            request.onupgradeneeded=()=>request.result.createObjectStore('snapshots');
            request.onerror=()=>reject(request.error);
            request.onsuccess=()=>{const db=request.result,tx=db.transaction('snapshots','readwrite');
                tx.objectStore('snapshots').put(snapshot,'installed');
                tx.oncomplete=()=>{db.close();resolve()};tx.onerror=()=>reject(tx.error)};
        });
    }''', snapshot)
    page.reload()
    assert ready(page)['bankRevision'] == manifest['revision']
    assert len(page.evaluate('__digests')) == 4, 'Restore checks files and revision, not bundled serialization'
    assert page.evaluate('THEOREM_DATA.theorems.length') == manifest['theoremCount']
    # An already verified current revision only needs the small manifest.
    server.bank_requests.clear()
    page.locator('[data-action=bank-entrance]').click()
    page.locator('[data-action=check-bank-update]').click()
    page.wait_for_function('!TQDiagnostics().bankBusy')
    assert '已是最新版本' in page.locator('#bank-update-status').inner_text()
    assert [urlparse(path).path for path in server.bank_requests] == ['/data/version.json']
    assert len(page.evaluate('__digests')) == 4
    # Tampering must still reject the installed snapshot and use the bundled bank.
    page.evaluate('''async()=>{await new Promise((resolve,reject)=>{
        const request=indexedDB.open('theorem-quest-bank',1);
        request.onsuccess=()=>{const db=request.result,tx=db.transaction('snapshots','readwrite'),store=tx.objectStore('snapshots');
            const read=store.get('installed');read.onsuccess=()=>{const s=read.result;s.theoremText+=' ';store.put(s,'installed')};
            tx.oncomplete=()=>{db.close();resolve()};tx.onerror=()=>reject(tx.error)};
    })}''')
    page.reload()
    state = ready(page)
    assert state['bankRevision'] == '' and '完整性校验' in state['bankMessage']
    assert state['cardCount'] == initial['cardCount']
    context.close()

    page = browser.new_page()
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.goto((site/'Theorem-Quest-Standalone.html').as_uri())
    portable = ready(page)
    assert portable['cardCount'] == initial['cardCount'] and portable['proofCount'] == initial['proofCount']
    page.locator('[data-action=start]').first.click()
    page.wait_for_function('TQDiagnostics().view === "quiz"')
    page.close()
    assert not errors, errors
    print(f'PASS: built/portable startup, verified/corrupt snapshot restore, cached assets and offline reload ({browser.browser_type.name})', flush=True)


def measure(browser, url):
    samples = []
    for run in range(3):
        context = browser.new_context(service_workers='block')
        instrumentation(context)
        page = context.new_page()
        cdp = context.new_cdp_session(page)
        cdp.send('Emulation.setCPUThrottlingRate', {'rate':4})
        cdp.send('Network.enable')
        cdp.send('Network.emulateNetworkConditions', {'offline':False,'latency':100,
                 'downloadThroughput':1250000,'uploadThroughput':1250000})
        page.goto(url,timeout=60000)
        ready(page)
        result = page.evaluate('({readyMs:__ready,digests:__digests,assetBytes:performance.getEntriesByType("resource").reduce((n,r)=>n+r.encodedBodySize,0)})')
        samples.append(result['readyMs'])
        print(json.dumps({'run':run,**result}),flush=True)
        context.close()
    print(json.dumps({'medianReadyMs':statistics.median(samples)}),flush=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--browser',choices=['chromium','webkit'],default='chromium')
    parser.add_argument('--site',type=Path)
    parser.add_argument('--measure',action='store_true')
    args = parser.parse_args()
    if args.measure and args.browser != 'chromium':
        parser.error('--measure requires Chromium CDP')
    with tempfile.TemporaryDirectory() as directory:
        site = args.site.resolve() if args.site else Path(directory)
        if not args.site:
            subprocess.run([sys.executable,str(ROOT/'tools/build_site.py'),'--out',str(site),
                            '--portable',str(site/'Theorem-Quest-Standalone.html')],check=True)
        server = Server(('127.0.0.1',0),partial(Handler,directory=str(site)))
        server.unexpected_assets = []
        server.bank_requests = []
        threading.Thread(target=server.serve_forever,daemon=True).start()
        try:
            with sync_playwright() as pw:
                browser = getattr(pw,args.browser).launch(headless=True)
                url = f'http://127.0.0.1:{server.server_port}/'
                if args.measure: measure(browser,url)
                else: run(browser,site,url,server,[])
                browser.close()
        finally:
            server.shutdown()


if __name__ == '__main__':
    main()
