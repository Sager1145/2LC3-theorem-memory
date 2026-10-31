#!/usr/bin/env python3
"""Choice topics and legacy quest resumption through the real browser UI."""
import argparse
import json
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--browser', choices=['chromium', 'webkit'], default='chromium')
args = parser.parse_args()
bank = json.loads((ROOT / 'data/theorems.json').read_text())
target = next(r for r in bank if r['topic'] == '蕴含 ⇒' and r['name'] == 'Material implication')
foreign = next(r for r in bank if r['topic'] == '合取 ∧' and r['kind'].lower() != 'inference rule')
by_id = {r['id']: r for r in bank}


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT)))
threading.Thread(target=server.serve_forever, daemon=True).start()
errors = []
try:
    with sync_playwright() as pw:
        browser = getattr(pw, args.browser).launch(headless=True)
        page = browser.new_page()
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.add_init_script('window.TQ_PORTABLE=true;')
        page.goto(f'http://127.0.0.1:{server.server_port}')
        page.wait_for_function('typeof TQDiagnostics === "function"')
        for difficulty in [1, 2, 3]:
            settings = {'modes': ['choice'], 'count': 1, 'retry': False,
                        'choiceDifficulty': difficulty,
                        'scope': {'era': 'all', 'manual': True, 'selected': [target['id']]}}
            page.evaluate('''settings => {
                localStorage.setItem('tq.settings.v1', JSON.stringify(settings));
                localStorage.removeItem('tq.session.v1');
            }''', settings)
            page.reload()
            page.locator('[data-action="start"]').first.click()
            page.wait_for_function('TQDiagnostics().view === "quiz"')
            saved = page.evaluate('JSON.parse(localStorage.getItem("tq.session.v1"))')
            options = saved['state']['options']
            assert len(options) == 4
            assert options.count(target['id']) == 1
            assert all(by_id[r]['topic'] == target['topic'] for r in options)
            assert page.locator('[data-action="choose"]').count() == 4

            # Current same-topic options and answer selection survive a reload.
            page.locator(f'[data-action="choose"][data-id="{target["id"]}"]').click()
            page.reload()
            page.locator('[data-action="resume"]').click()
            resumed = page.evaluate('JSON.parse(localStorage.getItem("tq.session.v1"))')
            assert resumed['state']['options'] == options
            assert resumed['state']['selected'] == target['id']

            # An old quest containing a different topic regenerates its current question.
            page.locator('[data-action="exit-quiz"]').click()
            resumed['state']['options'] = [target['id'], foreign['id']]
            resumed['state']['selected'] = foreign['id']
            page.evaluate('saved => localStorage.setItem("tq.session.v1", JSON.stringify(saved))', resumed)
            page.reload()
            page.locator('[data-action="resume"]').click()
            refreshed = page.evaluate('JSON.parse(localStorage.getItem("tq.session.v1"))')
            assert refreshed['queue'] == resumed['queue']
            assert refreshed['index'] == resumed['index']
            assert refreshed['state']['selected'] is None
            assert len(refreshed['state']['options']) == 4
            assert all(by_id[r]['topic'] == target['topic'] for r in refreshed['state']['options'])
            page.locator('[data-action="exit-quiz"]').click()
        assert not errors, errors
        browser.close()
    print(f'{args.browser}: same-topic choices and quest resumption passed at all 3 difficulties')
finally:
    server.shutdown()
