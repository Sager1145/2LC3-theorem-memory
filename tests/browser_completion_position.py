"""Input-anchored completion geometry, scrolling, rotation and selection.

Run: python3 tests/browser_completion_position.py --browser chromium|webkit
"""
import argparse
import json
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]


class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def run(page, url, native):
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.add_init_script('window.TQ_PORTABLE=true;window.TQ_NATIVE=%s;' % str(native).lower())
    page.goto(url)
    page.wait_for_function('typeof TQDiagnostics === "function"')
    records = page.evaluate('''() => THEOREM_DATA.theorems.filter(r =>
        TQEngine.isQuestionCard(r) && r.name.startsWith('Definition of '))''')

    def launch(mode, ids):
        page.evaluate('''s => {
            localStorage.removeItem('tq.session.v1');
            localStorage.setItem('tq.settings.v1',JSON.stringify(s));
        }''', {'modes': [mode], 'count': 1, 'retry': False, 'fullKeyboard': True,
              'scope': {'era': 'all', 'manual': True, 'selected': ids}})
        page.reload()
        page.locator('[data-action="start"]').first.click()
        page.wait_for_function('TQDiagnostics().view === "quiz"')

    def enter(selector, text):
        field = page.locator(selector)
        field.focus()
        field.evaluate('''(el,text) => {
            el.value=text;el.setSelectionRange(text.length,text.length);
            el.dispatchEvent(new Event('input',{bubbles:true}));
        }''', text)
        return field

    def aligned(field, selector):
        page.wait_for_function('''([input,selector]) => {
            const field=document.querySelector(input),box=document.querySelector(selector);
            const r=box.getBoundingClientRect(),f=field.getBoundingClientRect();
            const keyboard=document.querySelector('#screen-keyboard'),k=keyboard.getBoundingClientRect();
            return box.getClientRects().length && !box.closest('#screen-keyboard')
                && Math.abs(r.left-f.left)<1 && Math.abs(r.top-f.bottom-4)<1
                && Math.abs(r.width-f.width)<1 && r.height>=30
                && r.left>=0 && r.right<=innerWidth+1 && r.bottom<=innerHeight
                && (keyboard.hidden || r.bottom<=k.top || r.right<=k.left || r.left>=k.right);
        }''', arg=['#'+field.get_attribute('id'), selector], timeout=5000)
        assert page.locator(selector).count() == 1
        assert field.get_attribute('aria-controls') == selector[1:]

    launch('name', [r['id'] for r in records])
    field = enter('#name-answer', 'Def')
    aligned(field, '#name-suggestions')
    box = page.locator('#name-suggestions')
    assert box.locator('[role="option"]').count() > 3
    keyboard_height = page.locator('#screen-keyboard').evaluate('(el)=>el.offsetHeight')
    # Scrolling candidates does not scroll the question or reposition the keyboard.
    box.evaluate('(el)=>el.scrollTop=el.scrollHeight')
    aligned(field, '#name-suggestions')
    assert box.evaluate('(el)=>el.scrollTop>0')
    enter('#name-answer', 'De')
    assert box.is_hidden()
    assert page.locator('#screen-keyboard').evaluate('(el)=>el.offsetHeight') == keyboard_height
    enter('#name-answer', 'Def')
    aligned(field, '#name-suggestions')
    assert page.locator('#screen-keyboard').evaluate('(el)=>el.offsetHeight') == keyboard_height
    page.screenshot(path=str(ROOT/'test-results'/'completion'/f'name-{page.viewport_size["width"]}.png'))
    box.locator('[role="option"]').first.click()
    assert field.input_value().startswith('Definition of ')
    assert field.evaluate('(el)=>document.activeElement===el')
    assert box.is_hidden()

    selected = next(r for r in records if r['name'] == 'Definition of ≢')
    launch('formula', [selected['id']])
    field = enter('#formula-answer', chr(92))
    aligned(field, '#shortcut-suggestions')
    box = page.locator('#shortcut-suggestions')
    assert box.locator('[role="option"]').count() > 3
    # Scroll the containing question, then scroll the field back into view.
    panel = page.locator('.quiz-main')
    if page.locator('#screen-keyboard').is_visible():
        panel.evaluate('(el)=>el.scrollTop=Math.max(0,el.scrollTop-12)')
        aligned(field, '#shortcut-suggestions')
        original = page.viewport_size
        page.set_viewport_size({'width': 667, 'height': 375})
        aligned(field, '#shortcut-suggestions')
        page.set_viewport_size(original)
        aligned(field, '#shortcut-suggestions')
    page.screenshot(path=str(ROOT/'test-results'/'completion'/f'symbol-{page.viewport_size["width"]}.png'))
    enter('#formula-answer', r'\lan')
    aligned(field, '#shortcut-suggestions')
    box.get_by_role('option').filter(has_text=r'\land').first.click()
    assert field.input_value() == '∧'
    assert field.evaluate('(el)=>document.activeElement===el')
    assert box.is_hidden()

    proof = json.loads((ROOT/'data/proof-questions.json').read_text())[0]
    launch('proof', [proof['id']])
    field = enter('#proof-answer', proof['proof']['answers'][0][:3])
    aligned(field, '#proof-suggestions')
    page.locator('#proof-suggestions [role="option"]').first.click()
    assert field.evaluate('(el)=>document.activeElement===el')
    assert page.locator('#proof-suggestions').is_hidden()
    if page.locator('#screen-keyboard').is_visible():
        page.locator('[data-qwerty-key="DONE"]').click()
        assert page.locator('#screen-suggestions').is_hidden()
        assert page.locator('.proof-chain #proof-suggestions').count() == 1
    assert not errors, errors


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--browser', choices=['chromium', 'webkit'], default='chromium')
    parser.add_argument('--viewport', type=int)
    args = parser.parse_args()
    (ROOT/'test-results'/'completion').mkdir(parents=True, exist_ok=True)
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    try:
        with sync_playwright() as pw:
            browser = getattr(pw, args.browser).launch(headless=True)
            for width, height, native in [(320, 700, False), (390, 844, False),
                                          (667, 375, False), (768, 1024, True),
                                          (1440, 1000, False)]:
                if args.viewport and width != args.viewport:
                    continue
                page = browser.new_page(viewport={'width': width, 'height': height}, has_touch=width<1000)
                try:
                    run(page, f'http://127.0.0.1:{server.server_port}', native)
                    print(f'PASS: {args.browser} completion {width}x{height}, native={native}', flush=True)
                except Exception:
                    print(page.evaluate('''() => [...document.querySelectorAll(
                        '#name-answer,#proof-answer,#formula-answer,#screen-suggestions,.autocomplete,#screen-keyboard,.quiz-main,#quiz-bottom')]
                        .map(el=>({id:el.id,hidden:el.hidden,rect:el.getBoundingClientRect().toJSON(),
                            parent:el.parentElement.id,overflow:getComputedStyle(el).overflowY}))'''), flush=True)
                    page.screenshot(path=str(ROOT/'test-results'/'completion'/f'failure-{args.browser}-{width}.png'))
                    raise
                finally:
                    page.close()
            browser.close()
    finally:
        server.shutdown()


if __name__ == '__main__':
    main()
