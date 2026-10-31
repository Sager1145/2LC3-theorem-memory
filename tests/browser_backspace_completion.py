"""Focused touch Backspace regressions while completion owns the input.

Run: python3 tests/browser_backspace_completion.py --browser chromium|webkit
Default viewports: mobile 390 and native 768. Each uses a fresh browser.
Text normally comes from rendered keys; selection fixtures use setSelectionRange.
"""
import argparse
import json
import threading
from functools import partial

from playwright.sync_api import sync_playwright, Error
from browser_qwerty import Quiet, ROOT, Server


def run(page, url, native):
    failures = []
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.add_init_script('''window.TQ_PORTABLE=true; window.TQ_NATIVE=%s;
        if(window.TQ_NATIVE)window.webkit={messageHandlers:{quest:{postMessage(){}}}};
    ''' % str(native).lower())
    page.goto(url)
    page.wait_for_function('typeof TQDiagnostics === "function"')
    formula = page.evaluate('''() => THEOREM_DATA.theorems.find(r =>
        TQEngine.isQuestionCard(r) && r.formula==='p ∧ q ≡ q ∧ p')''')
    named = page.evaluate('''() => THEOREM_DATA.theorems.find(r =>
        TQEngine.isQuestionCard(r) && r.name==='Definition of ≢')''')
    proof = json.loads((ROOT / 'data/proof-questions.json').read_text())[0]
    assert formula and named, 'Deterministic completion fixtures missing'

    def key(value):
        return page.locator('#screen-keyboard [data-qwerty-key=' + json.dumps(value) + ']')

    def tap(value):
        button = key(value)
        assert button.count() == 1 and button.is_visible(), ('Missing key', value)
        button.tap()  # Real touch coordinates exercise pointer handling.

    def type_text(text):
        for char in text:
            if char == ' ':
                tap('SPACE')
                continue
            if not key(char).count() or not key(char).is_visible():
                mode = 'LETTERS' if char.isalpha() else 'SYMBOLS'
                if key(mode).count() and key(mode).is_visible():
                    tap(mode)
                if not key(char).count() or not key(char).is_visible():
                    tap('SHIFT')
            tap(char)

    def launch(mode, record, selector):
        if page.url != url + "/":
            page.goto(url)
            page.wait_for_function('typeof TQDiagnostics === "function"')
        page.evaluate('''s=>{localStorage.removeItem('tq.session.v1');
            localStorage.setItem('tq.settings.v1',JSON.stringify(s));}''', {
            'modes': [mode], 'count': 1, 'retry': False, 'fullKeyboard': True,
            'scope': {'era': 'all', 'manual': True, 'selected': [record['id']]}})
        page.reload()
        page.locator('[data-action="start"]').first.tap()
        page.wait_for_function('TQDiagnostics().view==="quiz"')
        field = page.locator(selector)
        field.tap()
        page.locator('#screen-keyboard').wait_for(state='visible')
        assert field.evaluate('(el)=>el.readOnly && document.activeElement===el')
        return field

    def expect(field, value):
        assert field.count() == 1, f'Input disappeared after Backspace (page URL: {page.url})'
        actual = field.input_value()
        assert actual == value, f'expected {value!r}; got {actual!r}; caret={field.evaluate("el=>[el.selectionStart,el.selectionEnd]")}'
        assert field.evaluate('(el)=>document.activeElement===el'), 'Input lost focus'

    def check(label, action):
        try:
            action()
            print('  PASS:', label, flush=True)
        except (AssertionError, Error) as error:
            failures.append(f'{label}: {error}')
            print('  FAIL:', failures[-1], flush=True)

    def shortcut_deletion(mode='formula'):
        field = launch(mode, formula, '#symbol-answer' if mode == 'symbol' else '#formula-answer')
        type_text('\\lan')
        box = page.locator('#shortcut-suggestions')
        assert box.is_visible()
        for value in ['\\la', '\\l', '\\', '']:
            tap('BACKSPACE')
            expect(field, value)
            expected = page.evaluate('''value=>{
                const at=TQEngine.shortcutPrefix(value,value.length);
                return at?TQEngine.shortcutSuggestions(at.prefix).map(r=>r.key):[];
            }''', value)
            assert box.is_visible() == bool(expected), (value, expected)
            if expected:
                actual = box.locator('[role="option"]').evaluate_all('(els)=>els.map(el=>el.dataset.key)')
                assert actual == expected, (value, actual, expected)
        tap('BACKSPACE')
        expect(field, '')
        if mode == 'symbol':
            type_text('\\lan')
            box.wait_for(state='visible')
            completed = box.locator('[role="option"]').first.get_attribute('data-key')
            tap('TAB')
            expect(field, completed)
            tap('BACKSPACE')
            expect(field, completed[:-1])

    def name_deletion(mode, record, selector, box_selector):
        field = launch(mode, record, selector)
        type_text('Def')
        page.locator(box_selector).wait_for(state='visible')
        tap('BACKSPACE')
        expect(field, 'De')
        page.locator(box_selector).wait_for(state='hidden')

    def accepted(mode, record, selector, box_selector, action, use_tab):
        field = launch(mode, record, selector)
        type_text('Def')
        box = page.locator(box_selector)
        box.wait_for(state='visible')
        candidate = box.locator(f'[data-action="{action}"]').first
        value = candidate.get_attribute('data-name')
        # A completion may be accepted after repositioning the caret. This also
        # catches readonly-browser caret restoration, hidden by end-only typing.
        field.evaluate('(el)=>el.setSelectionRange(1,1)')
        if use_tab:
            tap('TAB')
        else:
            candidate.tap()
        expect(field, value)
        tap('BACKSPACE')
        expect(field, value[:-1])

    def selection_deletion():
        field = launch('formula', formula, '#formula-answer')
        type_text('\\lan')
        assert page.locator('#shortcut-suggestions').is_visible()
        field.evaluate('(el)=>el.setSelectionRange(2,4)')
        tap('BACKSPACE')
        expect(field, '\\l')
        assert field.evaluate('(el)=>el.selectionStart===2 && el.selectionEnd===2')
        assert page.locator('#shortcut-suggestions').is_visible()

    def middle_deletion():
        field = launch('formula', formula, '#formula-answer')
        type_text('\\lan')
        tap('LEFT')
        assert page.locator('#shortcut-suggestions').is_visible()
        tap('BACKSPACE')
        expect(field, '\\ln')
        assert field.evaluate('(el)=>el.selectionStart===2 && el.selectionEnd===2')

    def physical_deletion():
        field = launch('formula', formula, '#formula-answer')
        type_text('\\lan')
        assert page.locator('#shortcut-suggestions').is_visible()
        page.keyboard.press('Backspace')
        expect(field, '\\la')
        field.evaluate('(el)=>el.setSelectionRange(1,3)')
        page.keyboard.press('Backspace')
        expect(field, '\\')

    def focused_option(physical):
        field = launch('formula', formula, '#formula-answer')
        type_text('\\lan')
        candidate = page.locator('#shortcut-suggestions [role="option"]').first
        candidate.focus()
        assert candidate.evaluate('(el)=>document.activeElement===el')
        if physical:
            page.keyboard.press('Backspace')
            page.wait_for_timeout(100)  # Allow WebKit default history navigation to settle.
        else:
            tap('BACKSPACE')
        expect(field, '\\la')

    check('focused candidate then physical Backspace', lambda: focused_option(True))
    check('focused candidate then touch Backspace', lambda: focused_option(False))
    check('shortcut dropdown shrinks through empty and empty is no-op', shortcut_deletion)
    check('symbol shortcut deletion and accepted code Backspace', lambda: shortcut_deletion('symbol'))
    for mode, record, selector, box, action in [
        ('name', named, '#name-answer', '#name-suggestions', 'suggest'),
        ('proof', proof, '#proof-answer', '#proof-suggestions', 'proof-suggest'),
    ]:
        check(f'{mode} Def → De closes dropdown', lambda: name_deletion(mode, record, selector, box))
        for use_tab in [False, True]:
            check(f'{mode} accept by {"Tab" if use_tab else "candidate tap"} then Backspace',
                  lambda: accepted(mode, record, selector, box, action, use_tab))
    check('selected range with active shortcut dropdown', selection_deletion)
    check('middle caret with active shortcut dropdown', middle_deletion)
    check('physical Backspace on readonly screen input', physical_deletion)
    assert not errors, errors
    assert not failures, '\n'.join(failures)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--browser', choices=['chromium', 'webkit'], default='chromium')
    parser.add_argument('--viewport', type=int, choices=[320, 390, 667, 768])
    args = parser.parse_args()
    server = Server(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    failures = []
    sizes = {320: (700, False), 390: (844, False), 667: (375, False), 768: (1024, True)}
    try:
        with sync_playwright() as pw:
            for width in [args.viewport] if args.viewport else [390, 768]:
                height, native = sizes[width]
                browser = getattr(pw, args.browser).launch(headless=True)
                page = browser.new_page(viewport={'width': width, 'height': height}, has_touch=True)
                page.set_default_timeout(8000)
                label = f'{args.browser} {width}x{height}, native={native}'
                print(label, flush=True)
                try:
                    run(page, f'http://127.0.0.1:{server.server_port}', native)
                    print('PASS:', label, flush=True)
                except (AssertionError, Error) as error:
                    failures.append(f'{label}: {error}')
                finally:
                    browser.close()
    finally:
        server.shutdown()
    if failures:
        raise AssertionError('\n'.join(failures))


if __name__ == '__main__':
    main()
