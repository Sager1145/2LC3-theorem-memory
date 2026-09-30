#!/usr/bin/env python3
"""Bank updates: verified install, persistent restore, failure atomicity and native routing.
Usage: python tests/browser_bank_updates.py [--channel chromium]
"""
from copy import deepcopy
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import hashlib
import argparse
import json
import shutil
import threading
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--channel', help='Playwright browser channel; chromium uses full Chromium.')
args = parser.parse_args()
original = json.loads((ROOT / 'data/theorems.json').read_text())
sources = json.loads((ROOT / 'data/sources.json').read_text())
updated = deepcopy(original[1:])
added = deepcopy(original[0]); added['id'] = 'p-bank-update-test'; added['name'] = 'Verified updated theorem'
updated.append(added)

def payload(bank):
    texts = {'theorems': json.dumps(bank, ensure_ascii=False), 'sources': json.dumps(sources, ensure_ascii=False)}
    hashes = {key: hashlib.sha256(text.encode()).hexdigest() for key, text in texts.items()}
    manifest = {'schemaVersion': 1, 'revision': hashlib.sha256((hashes['theorems'] + ':' + hashes['sources']).encode()).hexdigest(),
                'theoremCount': len(bank), 'files': {key: {'path': 'data/' + key + '.json', 'sha256': digest} for key, digest in hashes.items()}}
    return texts, manifest

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args): pass

class BrowserHTTPServer(ThreadingHTTPServer):
    # The page loads several assets concurrently; avoid resetting connections
    # when Chromium fills the default five-connection listen backlog.
    request_queue_size = 128

server = BrowserHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT)))
threading.Thread(target=server.serve_forever, daemon=True).start()
url = f'http://127.0.0.1:{server.server_port}/'
errors = []
with sync_playwright() as pw:
    def create(portable=False, native=False):
        global browser
        binary = None if args.channel else shutil.which('chromium') or shutil.which('chromium-browser')
        browser = pw.chromium.launch(executable_path=binary, channel=args.channel, headless=True, args=['--no-sandbox'])
        context = browser.new_context(service_workers='block')
        context.add_init_script("window.__bankFetchOptions=[];const originalFetch=window.fetch;window.fetch=(url,options)=>{__bankFetchOptions.push(options?.cache);return originalFetch(url,options);};")
        if portable: context.add_init_script('window.TQ_PORTABLE=true;')
        if native: context.add_init_script("window.TQ_NATIVE=true;window.__nativeMessages=[];window.webkit={messageHandlers:{quest:{postMessage:m=>__nativeMessages.push(m)}}};")
        page = context.new_page(); page.on('pageerror', lambda e: errors.append(str(e)))
        diagnostics = []
        page.on('requestfailed', lambda request: diagnostics.append({'requestFailed': request.url, 'failure': request.failure}))
        page.on('response', lambda response: diagnostics.append({'httpStatus': response.status, 'url': response.url}) if response.status >= 400 else None)
        page.on('console', lambda message: diagnostics.append({'consoleError': message.text}) if message.type == 'error' else None)
        page.goto(url)
        try: page.wait_for_function('typeof TQDiagnostics === "function"')
        except Exception:
            state = page.evaluate('({globals:Object.fromEntries(["TQEngine","THEOREM_DATA","PROOF_QUESTIONS","TQDiagnostics"].map(k=>[k,typeof window[k]])),resources:performance.getEntriesByType("resource").map(r=>({name:r.name,duration:r.duration})),body:document.body.innerText.slice(0,300)})')
            print(json.dumps({'startupErrors': errors, 'url': page.url, 'diagnostics': diagnostics, 'state': state}), flush=True)
            raise
        return context, page
    def settings(page):
        page.locator('[data-action="bank-entrance"]').click()
        page.wait_for_function('TQDiagnostics().view === "settings"')
    def routes(context, bank, defect=None):
        texts, manifest = payload(bank)
        if defect == 'hash': manifest['files']['theorems']['sha256'] = '0' * 64
        if defect == 'count': manifest['theoremCount'] += 1
        if defect == 'schema': manifest['schemaVersion'] = 2
        if defect == 'path': manifest['files']['sources']['path'] = '../sources.json'
        seen = []
        def handler(route):
            path = urlparse(route.request.url).path
            seen.append(route.request.url)
            assert 'tq-bank-update=' in route.request.url
            if defect == 'network': return route.abort('failed')
            if defect == 'legacy': return route.fulfill(status=404, body='Not found')
            key = Path(path).stem
            route.fulfill(content_type='application/json', body=json.dumps(manifest) if key == 'version' else texts[key])
        context.route('**/data/*.json?*', handler)
        return seen
    def check(page):
        page.locator('[data-action="check-bank-update"]').click()
        # App download timeout is 30 s; allow its fallback to render before the
        # test timeout so a slow run reports the actual update status.
        page.wait_for_function('!TQDiagnostics().bankBusy', timeout=45000)
        status = page.locator('#bank-update-status').inner_text()
        print('Bank update status: ' + status, flush=True)
        return status

    # Install a different bank, preserve all history (including removed IDs), restore on reload.
    context, page = create()
    page.evaluate("""id=>{const p=TQEngine.freshProgress();TQEngine.applyAttempt(p,id,'choice',true,'saved answer');p.stars=[id];localStorage.setItem('tq.progress.v1',JSON.stringify(p));}""", original[0]['id'])
    page.reload(); page.wait_for_function('typeof TQDiagnostics === "function"')
    before = page.evaluate('localStorage.getItem("tq.progress.v1")')
    settings(page); seen = routes(context, updated)
    status = check(page)
    assert '已安装题库更新' in status, status
    assert len(seen) == 3
    assert page.evaluate('__bankFetchOptions') == ['no-store'] * 3
    assert page.evaluate('THEOREM_DATA.theorems.some(r=>r.id === "p-bank-update-test")')
    assert page.evaluate('localStorage.getItem("tq.progress.v1")') == before
    page.reload(); page.wait_for_function('typeof TQDiagnostics === "function"')
    assert page.evaluate('THEOREM_DATA.theorems.some(r=>r.id === "p-bank-update-test")')
    assert page.evaluate('TQDiagnostics().bankRevision')
    settings(page)
    assert '已是最新版本' in check(page)
    assert page.evaluate('localStorage.getItem("tq.progress.v1")') == before
    context.close(); browser.close()

    for defect in ['network', 'hash', 'count', 'path', 'schema', 'legacy']:
        context, page = create(); settings(page); routes(context, updated, defect)
        assert '更新失败' in check(page), defect
        assert not page.evaluate('THEOREM_DATA.theorems.some(r=>r.id === "p-bank-update-test")'), defect
        assert not page.evaluate('TQDiagnostics().bankRevision'), defect
        if defect == 'legacy': assert '部署新版网站' in page.locator('#bank-update-status').inner_text()
        context.close(); browser.close()
    # A resumable session is regenerated against a changed bank; removed cards
    # invalidate that session while leaving its historical progress intact.
    for removed in [False, True]:
        context, page = create()
        card = original[0] if removed else next(r for r in original[1:] if r.get('preloaded2026') and 'inference rule' not in r['kind'].lower())
        page.evaluate("""id=>localStorage.setItem('tq.session.v1',JSON.stringify({queue:[{id,mode:'formula',retry:0}],index:0,label:'Saved session',results:[],startedAt:Date.now(),state:{typed:'stale answer'}}))""", card['id'])
        page.reload(); page.wait_for_function('typeof TQDiagnostics === "function"')
        settings(page); routes(context, updated)
        status = check(page)
        assert '已安装题库更新' in status, {'removed': removed, 'status': status}
        if removed:
            assert page.evaluate("localStorage.getItem('tq.session.v1')") is None
        else:
            assert page.evaluate("JSON.parse(localStorage.getItem('tq.session.v1')).state") is None
            page.locator('[data-action="nav"][data-view="home"]').first.click()
            page.locator('[data-action="resume"]').click()
            assert page.evaluate('TQDiagnostics().question.id') == card['id']
            assert page.locator('#formula-answer').input_value() == ''
        context.close(); browser.close()
    context, page = create()
    page.evaluate("Object.defineProperty(window,'indexedDB',{value:{open(){throw new Error('storage denied')}}})")
    settings(page); routes(context, updated)
    assert '更新失败' in check(page)
    assert not page.evaluate('THEOREM_DATA.theorems.some(r=>r.id === "p-bank-update-test")')
    context.close(); browser.close()
    # Invalid structured content with a valid checksum must still be rejected.
    invalid = deepcopy(updated); invalid[0]['sources'][0]['sourceId'] = 'missing-source'
    context, page = create(); settings(page); routes(context, invalid)
    assert '更新失败' in check(page); context.close(); browser.close()
    context, page = create(portable=True); settings(page)
    assert page.locator('[data-action="check-bank-update"]').count() == 0
    assert page.get_by_role('link', name='打开在线题库').get_attribute('href') == 'https://sager1145.github.io/2LC3-theorem-memory/'
    context.close(); browser.close()
    context, page = create(native=True)
    page.locator('[data-action="bank-entrance"]').click()
    assert page.evaluate('__nativeMessages') == [{'action': 'updates'}]
    page.locator('[data-action="nav"][data-view="settings"]').click()
    page.locator('[data-action="native-updates"]').click()
    assert page.evaluate('__nativeMessages') == [{'action': 'updates'}, {'action': 'updates'}]
    assert page.locator('[data-action="check-bank-update"]').count() == 0
    context.close(); browser.close()
server.shutdown()
assert not errors, errors
print('PASS: install + restore + unchanged + history preservation; network/hash/count/path/schema failures; legacy guidance; portable and native entrances')
