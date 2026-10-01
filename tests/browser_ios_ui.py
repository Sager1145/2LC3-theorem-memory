"""Regressions for iOS shared UI: navigation during search and screen QWERTY editing."""
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import threading
import argparse
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument('--browser', choices=['chromium','webkit'], default='chromium')
args = parser.parse_args()
ROOT = Path(__file__).resolve().parents[1]
class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args): pass
class BrowserHTTPServer(ThreadingHTTPServer):
    request_queue_size = 128
server = BrowserHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT)))
threading.Thread(target=server.serve_forever, daemon=True).start()
try:
    with sync_playwright() as pw:
        browser = getattr(pw, args.browser).launch(headless=True)
        page = browser.new_page(viewport={'width':375, 'height':667}, has_touch=True)
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.add_init_script('window.TQ_NATIVE = true;')
        page.goto(f'http://127.0.0.1:{server.server_port}/')
        try:
            page.wait_for_function('typeof TQDiagnostics === "function"')
        except Exception:
            print('Page errors during startup:', errors)
            raise
        def go(view):
            if view == 'audit':
                go('settings')
                page.locator('#main [data-action="nav"][data-view="audit"]').click()
                return
            page.locator(f'.nav-btn[data-view="{view}"]').click()
        go('audit')
        assert page.locator('.nav-btn[data-view="audit"]').count() == 0
        assert page.locator('.nav-btn[data-view="settings"]').get_attribute('aria-current') == 'page'
        page.locator('#main [data-action="nav"][data-view="settings"]').click()
        assert page.locator('h1').inner_text() == '练习设置'
        go('audit')
        # Dispatch navigation in the same task, before the search debounce fires.
        page.evaluate('''() => {
            const field = document.querySelector('#audit-query');
            field.value = 'test';
            field.dispatchEvent(new Event('input', {bubbles:true}));
            document.querySelector('.nav-btn[data-view="home"]').click();
        }''')
        page.wait_for_timeout(350)
        assert not errors, errors
        assert page.locator('[data-action="configure"]').is_visible()
        go('hints')
        # An in-progress Chinese composition must keep the original field alive.
        page.evaluate('''() => {
            window.composingField = document.querySelector('#hint-query');
            composingField.focus();
            composingField.dispatchEvent(new CompositionEvent('compositionstart', {bubbles:true}));
            composingField.value = 'zheng';
            composingField.dispatchEvent(new InputEvent('input', {bubbles:true, isComposing:true, data:'zheng'}));
        }''')
        assert page.evaluate('composingField.isConnected && document.activeElement === composingField'), 'IME field replaced during composition'
        page.evaluate('''() => {
            composingField.value = '证明';
            composingField.dispatchEvent(new CompositionEvent('compositionend', {bubbles:true, data:'证明'}));
            composingField.dispatchEvent(new InputEvent('input', {bubbles:true, isComposing:false, data:'证明'}));
        }''')
        assert page.locator('#hint-query').input_value() == '证明'
        assert page.locator('#hint-query').get_attribute('inputmode') == 'none'
        assert page.locator('#hint-query').evaluate('(el)=>el.readOnly')
        assert page.locator('#screen-keyboard').evaluate('(el)=>el.getBoundingClientRect().bottom<=innerHeight+1')
        page.locator('#screen-keyboard').get_by_role('button',name='Done',exact=True).tap()
        # Navigation must work while a search input is still focused.
        go('home')
        for destination, selector in [('library','input[data-filter="query"]'),('audit','#audit-query')]:
            go(destination)
            search = page.locator(selector)
            search.evaluate("(el)=>{el.value='';el.dispatchEvent(new Event('input',{bubbles:true}));}")
            assert search.get_attribute('inputmode') == 'none'
            assert search.evaluate('(el)=>el.readOnly')
            search.focus()
            page.locator('#screen-keyboard').get_by_role('button',name='\\',exact=True).tap()
            assert search.input_value() == '\\'
            assert search.evaluate('(el) => document.activeElement === el')
            page.locator('#screen-keyboard').get_by_role('button',name='Backspace',exact=True).tap()
            assert search.input_value() == ''
            page.locator('#screen-keyboard').get_by_role('button',name='Done',exact=True).tap()
            page.wait_for_timeout(350)
            assert page.locator('#screen-keyboard').is_hidden()
        for width in [320,375,390]:
            page.set_viewport_size({'width':width, 'height':667})
            for scale in [1,1.5,2]:
                page.evaluate('''scale => {
                    document.documentElement.style.fontSize = (16 * scale) + 'px';
                    document.documentElement.classList.toggle('native-large-text', scale > 1.25);
                }''', scale)
                for view in ['home','library','focus','hints','mistakes','audit','settings']:
                    go(view)
                    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (view,width,scale)
        page.locator('[data-setting="language"]').select_option('en')
        page.locator('[data-setting="appearance"]').select_option('dark')
        page.set_viewport_size({'width':320, 'height':667})
        for view in ['home','library','focus','hints','mistakes','audit','settings']:
            go(view)
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (view,'en','dark',2)
        assert not errors, errors
        browser.close()
        print('PASS: search navigation, Chinese composition fixtures, screen QWERTY, 7 pages at 3 widths and 3 text scales')
finally:
    server.shutdown()
