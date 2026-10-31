"""Formula and variable-blank grading through the real desktop/mobile UI."""
import argparse
import json
import threading
from functools import partial

from playwright.sync_api import sync_playwright
from browser_qwerty import Quiet, ROOT, Server

FORMULA = 'p ∨ (q ∨ r) ≡ (p ∨ q) ∨ (p ∨ r)'
CASES = [
    (['p', 'q', 'r', 'r', 'p', 'q', 'p'], True),
    (['r', 'p', 'q', 'r', 'p', 'r', 'q'], True),
    (['p', 'q', 'r', 'p', 'p', 'q', 'r'], False),
]


def exercise(page, url, mobile):
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.add_init_script('window.TQ_PORTABLE=true;')
    page.goto(url)
    page.wait_for_function('typeof TQDiagnostics === "function"')
    card = page.evaluate('(f)=>THEOREM_DATA.theorems.find(r=>r.formula===f)', FORMULA)
    assert card
    for mode in ['formula', 'blanks']:
        for values, correct in CASES:
            page.evaluate('''s=>{localStorage.removeItem('tq.session.v1');
                localStorage.setItem('tq.settings.v1',JSON.stringify(s));}''', {
                'modes': [mode], 'count': 1, 'retry': False, 'fullKeyboard': False,
                'scope': {'era': 'all', 'manual': True, 'selected': [card['id']]},
            })
            page.reload()
            page.locator('[data-action="start"]').first.click()
            page.wait_for_function('TQDiagnostics().view==="quiz"')
            if mode == 'blanks':
                for i, value in enumerate(values):
                    if mobile:
                        page.locator('#keyboard [data-action="key"][data-key='+json.dumps(value)+']').tap()
                    else:
                        page.locator(f'#blank-{i}').fill(value)
            else:
                answer = page.evaluate('''v=>TQEngine.fillTemplate(
                    TQEngine.blankTemplate(THEOREM_DATA.theorems.find(r=>
                    r.formula===%s).formula),v)''' % json.dumps(FORMULA), values)
                field = page.locator('#formula-answer')
                if mobile:
                    # Fixture input exercises grading; QWERTY entry has separate coverage.
                    field.evaluate('''(el,text)=>{el.value=text;
                        el.dispatchEvent(new Event('input',{bubbles:true}));}''', answer)
                else:
                    field.fill(answer)
            assert page.locator('#check-answer').is_enabled()
            if mobile and mode == 'formula':
                page.locator('#formula-answer').tap()
                page.locator('#screen-keyboard [data-qwerty-key="ENTER"]').tap()
            else:
                page.locator('#check-answer').click(timeout=5000)
            page.wait_for_function('TQDiagnostics().checked')
            expected = 'correct' if correct else 'incorrect'
            assert page.locator('#quiz-bottom.'+expected).is_visible(), (mode, values)
    assert not errors, errors


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--browser', choices=['chromium', 'webkit'], default='chromium')
    args = parser.parse_args()
    server = Server(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    try:
        with sync_playwright() as pw:
            browser = getattr(pw, args.browser).launch(headless=True)
            for width, mobile in [(1440, False), (390, True)]:
                page = browser.new_page(viewport={'width': width, 'height': 950}, has_touch=mobile)
                try:
                    exercise(page, f'http://127.0.0.1:{server.server_port}', mobile)
                    print(f'PASS: {args.browser}, width={width}, 6 grouped-property cases')
                finally:
                    page.close()
            browser.close()
    finally:
        server.shutdown()


if __name__ == '__main__':
    main()
