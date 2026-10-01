"""Display preferences, persisted settings, translated UI and responsive layout."""
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import threading
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args): pass
class BrowserHTTPServer(ThreadingHTTPServer):
    request_queue_size = 128
server = BrowserHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT)))
threading.Thread(target=server.serve_forever, daemon=True).start()
url = f'http://127.0.0.1:{server.server_port}/'
shots = ROOT / 'test-results' / 'display'
shots.mkdir(parents=True, exist_ok=True)
try:
    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width':390,'height':844}, color_scheme='light')
        errors = []
        page = context.new_page()
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto(url)
        page.wait_for_function('typeof TQDiagnostics === "function"')
        def go(view):
            if view == 'audit':
                go('settings')
                page.locator('#main [data-action="nav"][data-view="audit"]').click()
                return
            page.locator(f'.nav-btn[data-view="{view}"]').click()
        def no_overflow():
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), page.url
        go('settings')
        page.locator('[data-setting="appearance"]').select_option('dark')
        page.wait_for_function('document.documentElement.dataset.theme === "dark"')
        page.locator('[data-setting="language"]').select_option('en')
        page.wait_for_function('document.documentElement.lang === "en" && document.querySelector("h1").textContent === "Practice settings"')
        assert page.locator('h1').inner_text() == 'Practice settings'
        assert page.locator('[data-setting="language"]').input_value() == 'en'
        no_overflow()
        page.screenshot(path=str(shots/'settings-dark-en.png'),full_page=True)
        page.screenshot(path=str(shots/'settings-dark-en-preview.png'))
        page.reload()
        page.wait_for_function('typeof TQDiagnostics === "function"')
        assert page.locator('html').get_attribute('data-theme') == 'dark'
        assert page.locator('html').get_attribute('lang') == 'en'
        go('settings')
        page.locator('[data-setting="appearance"]').select_option('system')
        assert page.locator('html').get_attribute('data-theme') == 'light'
        page.emulate_media(color_scheme='dark')
        page.wait_for_function('document.documentElement.dataset.theme === "dark"')
        page.locator('[data-setting="appearance"]').select_option('light')
        assert page.locator('html').get_attribute('data-theme') == 'light'
        page.locator('[data-setting="appearance"]').select_option('dark')
        for width in [320,390,768,1440]:
            page.set_viewport_size({'width':width,'height':950})
            for view in ['home','library','focus','hints','mistakes','audit','settings']:
                go(view)
                no_overflow()
            go('home')
            page.screenshot(path=str(shots/f'home-dark-en-{width}.png'),full_page=True)
        go('library')
        first_title = page.locator('.record-name').first.inner_text()
        first_formula = page.locator('.theorem-row .math').first.inner_text()
        go('settings')
        page.locator('[data-setting="language"]').select_option('zh-CN')
        assert page.locator('h1').inner_text() == '练习设置'
        go('library')
        assert page.locator('.record-name').first.inner_text() == first_title
        assert page.locator('.theorem-row .math').first.inner_text() == first_formula
        go('settings')
        page.locator('[data-setting="language"]').select_option('en')
        go('home')
        page.locator('[data-action="start"]').first.click()
        page.wait_for_function('TQDiagnostics().view === "quiz"')
        assert not page.locator('.quiz-main h1').evaluate('(el)=>/[\\u3400-\\u9fff]/.test(el.textContent)')
        no_overflow()
        page.screenshot(path=str(shots/'quiz-dark-en.png'),full_page=True)
        page.locator('[data-action="exit-quiz"]').click()
        page.wait_for_function('TQDiagnostics().view === "home"')
        page.locator('[data-action="configure"]').click()
        page.wait_for_function('document.querySelector("[role=dialog]") !== null')
        assert not page.locator('#modal-title').evaluate('(el)=>/[\\u3400-\\u9fff]/.test(el.textContent)')
        assert not errors, errors
        browser.close()
        print('PASS: language/theme persistence, system changes, all 7 pages at 4 sizes, source preservation, quiz and modal')
finally:
    server.shutdown()
