#!/usr/bin/env python3
"""Stress the local web flow with native browser storage and offline cache."""
import argparse
import json
import sys
import statistics
import threading
import time
from tempfile import TemporaryDirectory
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--uninterrupted', action='store_true', help='Keep one Chromium process for all 200 answers.')
parser.add_argument('--channel', help='Playwright browser channel (chromium uses full Chromium instead of headless shell).')
args = parser.parse_args()
launch_options = dict(headless=True, args=['--no-sandbox'])
if args.channel:
    launch_options['channel'] = args.channel
class BrowserHTTPServer(ThreadingHTTPServer):
    # The page loads several assets concurrently; avoid resetting connections
    # when Chromium fills the default five-connection listen backlog.
    request_queue_size = 128

server = BrowserHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT)))
threading.Thread(target=server.serve_forever, daemon=True).start()
url = f'http://127.0.0.1:{server.server_port}/'
errors = []
with sync_playwright() as pw:
    profile = TemporaryDirectory(prefix='2lc3-browser-stress-')
    context = pw.chromium.launch_persistent_context(profile.name, **launch_options)
    page = context.new_page()
    page.add_init_script('window.TQ_PORTABLE=true')
    page.on('pageerror', lambda error: (errors.append(str(error)), print('DIAGNOSTIC: JavaScript error: ' + str(error), file=sys.stderr, flush=True)))
    start = time.perf_counter()
    page.goto(url)
    page.wait_for_function('typeof TQDiagnostics === "function"')
    first_load_ms = (time.perf_counter() - start) * 1000
    page.evaluate('''() => localStorage.setItem('tq.settings.v1', JSON.stringify({
      modes:['choice'], count:50, goal:20, retry:false, sound:false,
      scope:{era:'all', manual:false, selected:[]}
    }))''')
    page.reload()
    page.wait_for_function('TQDiagnostics().modes.length === 1')
    latencies = []
    snapshots = []
    cdp = context.new_cdp_session(page)
    cdp.send('Performance.enable')
    browser_version = cdp.send('Browser.getVersion')['product']
    def snapshot(answer_count):
        metrics = {m['name']: m['value'] for m in cdp.send('Performance.getMetrics')['metrics']}
        row = {'answers': answer_count, 'heapUsedMiB': round(metrics['JSHeapUsedSize'] / 1048576, 1),
               **cdp.send('Memory.getDOMCounters')}
        snapshots.append(row)
        print(json.dumps({'checkpoint': row}), file=sys.stderr, flush=True)
    page.on('crash', lambda: print('DIAGNOSTIC: renderer page crashed', file=sys.stderr, flush=True))
    page.on('close', lambda: print('DIAGNOSTIC: page closed; JavaScript errors: ' + json.dumps(errors), file=sys.stderr, flush=True))
    snapshot(0)
    for round_number in range(4):
        page.locator('[data-action="start"]').first.click()
        for index in range(50):
            question = page.evaluate('TQDiagnostics().question')
            assert question and question['mode'] == 'choice', (round_number, index, question)
            start = time.perf_counter()
            page.locator(f'[data-action="choose"][data-id="{question["id"]}"]').click()
            page.locator('#check-answer').click()
            assert page.locator('#quiz-bottom.correct').count() == 1, (round_number, index)
            latencies.append((time.perf_counter() - start) * 1000)
            page.locator('[data-action="continue"]').click()
            if (index + 1) % 25 == 0:
                snapshot(round_number * 50 + index + 1)
            if index == 24 and round_number == 0:
                page.reload()
                page.wait_for_function('typeof TQDiagnostics === "function"')
                assert page.locator('[data-action="resume"]').count() == 1
                page.locator('[data-action="resume"]').click()
                assert page.evaluate('TQDiagnostics().question') is not None
        assert page.evaluate('TQDiagnostics().view') == 'result'
        page.locator('[data-action="nav"][data-view="home"]').first.click()
        if round_number < 3 and not args.uninterrupted:
            context.close()
            context = pw.chromium.launch_persistent_context(profile.name, **launch_options)
            page = context.new_page()
            page.add_init_script('window.TQ_PORTABLE=true')
            page.on('pageerror', lambda error: (errors.append(str(error)), print('DIAGNOSTIC: JavaScript error: ' + str(error), file=sys.stderr, flush=True)))
            page.goto(url)
            page.wait_for_function('typeof TQDiagnostics === "function"')
            assert page.evaluate('JSON.parse(localStorage.getItem("tq.progress.v1")).history.length') == round_number + 1
            cdp = context.new_cdp_session(page)
            cdp.send('Performance.enable')
    progress = page.evaluate('JSON.parse(localStorage.getItem("tq.progress.v1"))')
    assert sum(row['attempts'] for row in progress['records'].values()) == 200
    assert len(progress['history']) == 4
    assert progress['history'][0]['total'] == 50
    assert progress['history'][0]['correct'] == 50
    assert page.evaluate('localStorage.getItem("tq.session.v1")') is None
    # A real reload must preserve the native localStorage state.
    page.reload()
    page.wait_for_function('typeof TQDiagnostics === "function"')
    assert page.evaluate('JSON.parse(localStorage.getItem("tq.progress.v1")).history[0].correct') == 50
    offline_page = context.new_page()
    offline_page.on('pageerror', lambda error: (errors.append(str(error)), print('DIAGNOSTIC: JavaScript error: ' + str(error), file=sys.stderr, flush=True)))
    offline_page.goto(url)
    offline_page.wait_for_function('typeof TQDiagnostics === "function"')
    offline_page.wait_for_function('navigator.serviceWorker.controller !== null', timeout=30000)
    cached = offline_page.evaluate('''async () => {
      const names = await caches.keys();
      const entries = await Promise.all(names.map(async name =>
        (await caches.open(name)).keys().then(keys => keys.map(key => key.url))));
      return entries.flat();
    }''')
    assert any(path.endswith('/assets/data.js') for path in cached), 'data.js not cached'
    context.set_offline(True)
    offline_page.reload()
    offline_page.wait_for_function('typeof TQDiagnostics === "function"')
    assert offline_page.evaluate('TQDiagnostics().view') == 'home'
    assert offline_page.evaluate('JSON.parse(localStorage.getItem("tq.progress.v1")).history[0].correct') == 50
    assert not errors, errors
    result = {
        'correctAnswers': 200,
        'browserRestarts': 0 if args.uninterrupted else 3,
        'browserChannel': args.channel or 'headless-shell',
        'browserVersion': browser_version,
        'memorySnapshots': snapshots,
        'nativeStorageAfterReload': True,
        'serviceWorkerOfflineReload': True,
        'firstLoadMs': round(first_load_ms),
        'answerMedianMs': round(statistics.median(latencies)),
        'answerP95Ms': round(sorted(latencies)[int(len(latencies) * 0.95) - 1]),
        'answerMaxMs': round(max(latencies)),
        'javascriptErrors': errors,
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))
    context.close()
    profile.cleanup()
server.shutdown()
