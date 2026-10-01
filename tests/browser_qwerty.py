"""Touch-only QWERTY input, completion, grading and mobile/native geometry.

Run: python tests/browser_qwerty.py [--browser chromium|webkit]
No fill/physical typing is used: all text is entered through rendered keys.
"""
import argparse
import json
import string
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]


class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


class Server(ThreadingHTTPServer):
    request_queue_size = 128


def run(page, url, native, extensive=False):
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.add_init_script('''window.TQ_PORTABLE=true;
        window.TQ_NATIVE=%s;
        if(window.TQ_NATIVE)window.webkit={messageHandlers:{quest:{postMessage(){}}}};
    ''' % str(native).lower())
    page.goto(url)
    page.wait_for_function('typeof TQDiagnostics === "function"')
    record = page.evaluate('''() => THEOREM_DATA.theorems.find(r =>
        TQEngine.isQuestionCard(r) && r.formula==='p ∧ q ≡ q ∧ p')''')
    assert record, 'Deterministic commutativity fixture missing'

    def key(value):
        return page.locator('#screen-keyboard [data-qwerty-key=' + json.dumps(value) + ']')

    def tap(value):
        button = key(value)
        assert button.count() == 1 and button.is_visible(), ('Missing visible key', value)
        button.tap()

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

    def focus(selector):
        field = page.locator(selector)
        field.tap()
        page.locator('#screen-keyboard').wait_for(state='visible')
        assert field.get_attribute('inputmode') == 'none', selector
        assert field.evaluate('(el)=>el.readOnly'), selector
        assert field.evaluate('(el)=>document.activeElement===el'), selector
        return field

    def clear(field):
        field.evaluate('(el)=>el.setSelectionRange(0,el.value.length)')
        tap('BACKSPACE')
        assert field.input_value() == ''

    def layout(field, suggestion=None):
        page.wait_for_function('''() => {
            const k=document.querySelector('#screen-keyboard').getBoundingClientRect();
            const f=document.activeElement.getBoundingClientRect();
            return k.bottom<=innerHeight+1 && f.top>=-1
                && (f.bottom<=k.top+1 || f.right<=k.left+1 || f.left>=k.right-1);
        }''')
        assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
        assert page.locator('#screen-keyboard').evaluate('''el => {
            const r=el.getBoundingClientRect();
            return r.left>=-1 && r.right<=innerWidth+1 && r.top>=0;
        }''')
        assert page.evaluate('''() => [...document.querySelectorAll(
            '#keyboard,.input-accessory,.theorem-symbols,[data-action="cloze-key"]')]
            .every(el=>!el.getClientRects().length || getComputedStyle(el).visibility==='hidden')''')
        assert page.locator('#screen-keyboard [data-qwerty-key]').evaluate_all(
            '(els)=>els.every(el=>el.dataset.qwertyKey.length!==1 || el.dataset.qwertyKey.charCodeAt(0)<=126)'), 'Direct math symbol keys must not appear'
        assert page.locator('#screen-keyboard [data-qwerty-key]').evaluate_all('''els => els.every(el=>{
            const r=el.getBoundingClientRect();return r.width>0 && r.height>=26
                && r.left>=-1 && r.right<=innerWidth+1 && r.bottom<=innerHeight+1;
        })''')
        assert page.evaluate('''() => [...document.querySelectorAll('#quiz-bottom,.sidebar')]
            .every(el=>{const r=el.getBoundingClientRect(),k=document.querySelector('#screen-keyboard').getBoundingClientRect();
                return !el.getClientRects().length || getComputedStyle(el).visibility==='hidden'
                    || r.bottom<=k.top+1 || r.top>=k.bottom-1
                    || r.right<=k.left+1 || r.left>=k.right-1;})''')
        if suggestion:
            box = page.locator(suggestion)
            box.wait_for(state='visible')
            assert box.evaluate('''el => {
                const r=el.getBoundingClientRect(),k=document.querySelector('#screen-keyboard').getBoundingClientRect();
                const keys=[...document.querySelectorAll('[data-qwerty-key]')].map(el=>el.getBoundingClientRect().top);
                return el.closest('#screen-suggestions') && r.top>=k.top-1
                    && r.bottom<=Math.min(...keys)+1 && r.height>0
                    && ['auto','scroll'].includes(getComputedStyle(el).overflowY);
            }'''), suggestion
            assert page.locator(suggestion).count() == 1, 'Completion list must be moved, not cloned'

    def launch(mode, selected=record):
        page.evaluate('''s=>{localStorage.removeItem('tq.session.v1');
            localStorage.setItem('tq.settings.v1',JSON.stringify(s));}''', {
                'modes': [mode], 'count': 1, 'retry': False, 'fullKeyboard': True,
                'scope': {'era': 'all', 'manual': True, 'selected': [selected['id']]}})
        page.reload()
        page.locator('[data-action="start"]').first.tap()
        page.wait_for_function('TQDiagnostics().view==="quiz"')

    launch('formula')
    field = focus('#formula-answer')
    layout(field)
    # Every printable US QWERTY character is reachable via keys, including all
    # shifted punctuation and both letter cases. Clear between characters so
    # backslash-space conversion cannot obscure the character under test.
    if extensive:
        reachable = set()
        for layer in ['LETTERS', 'SHIFT', 'SYMBOLS', 'SHIFT']:
            if key(layer).count() and key(layer).is_visible():
                tap(layer)
            reachable.update(page.locator('#screen-keyboard [data-qwerty-key]').evaluate_all(
                '(els)=>els.map(el=>el.dataset.qwertyKey).filter(s=>s.length===1)'))
        assert set(string.ascii_letters + string.digits + string.punctuation) <= reachable, sorted(
            set(string.ascii_letters + string.digits + string.punctuation) - reachable)
        for char in string.ascii_letters + string.digits + string.punctuation:
            type_text(char)
            assert field.input_value() == char, (char, field.input_value())
            clear(field)
        tap('SPACE')
        assert field.input_value() == ' '
        clear(field)
    type_text('pq')
    tap('LEFT')
    type_text('x')
    assert field.input_value() == 'pxq'
    tap('BACKSPACE')
    assert field.input_value() == 'pq'
    tap('RIGHT')
    assert field.evaluate('(el)=>el.selectionStart') == 2
    tap('DONE')
    assert page.locator('#screen-keyboard').is_hidden()
    focus('#formula-answer')
    assert field.input_value() == 'pq'
    clear(field)
    type_text('\\lan')
    layout(field, '#shortcut-suggestions')
    tap('TAB')
    assert field.input_value() == '∧'
    clear(field)
    type_text('p \\land q \\equiv q \\land p')
    # A trailing complete code is converted by the autocomplete Tab key.
    tap('TAB') if field.input_value().endswith('\\land') else None
    tap('ENTER')
    assert page.locator('#quiz-bottom.correct').is_visible()
    assert page.locator('#screen-keyboard').is_hidden()

    launch('symbol')
    field = focus('#symbol-answer')
    type_text('\\lan')
    layout(field, '#shortcut-suggestions')
    tap('TAB')
    assert field.input_value() == '\\land', 'Symbol questions retain shortcut code'
    tap('DONE')

    launch('cloze')
    template = page.evaluate('JSON.parse(localStorage.getItem("tq.session.v1")).state.cloze')
    for index, slot in enumerate(template['blanks']):
        page.locator(f'[data-action="cloze-slot"][data-slot="{index}"]').tap()
        field = focus('#cloze-answer')
        code = page.evaluate('(s)=>Object.entries(TQEngine.SHORTCUTS).find(([,v])=>v===s)[0]', slot['correct'])
        type_text(code)
        layout(field, '#shortcut-suggestions')
        tap('TAB')
        assert field.input_value() == slot['correct']
        if index < len(template['blanks']) - 1:
            tap('TAB')
            assert page.locator('[data-action="cloze-slot"].active').get_attribute('data-slot') == str(index + 1)
    tap('ENTER')
    assert page.locator('#quiz-bottom.correct').is_visible()

    launch('blanks')
    field = focus('#blank-0')
    tap('TAB')
    assert page.locator('#blank-1').evaluate('(el)=>document.activeElement===el')
    template = page.evaluate('(f)=>TQEngine.blankTemplate(f)', record['formula'])
    for index, blank in enumerate(template['blanks']):
        field = focus(f'#blank-{index}')
        type_text(blank['variable'])
    tap('ENTER')
    assert page.locator('#quiz-bottom.correct').is_visible()

    named = page.evaluate('''() => THEOREM_DATA.theorems.find(r=>TQEngine.isQuestionCard(r)
        && /^[A-Za-z][A-Za-z ]{2,}$/.test(r.name)
        && TQEngine.nameGroup(THEOREM_DATA.theorems,r).length===1)''')
    assert named, 'ASCII theorem name fixture missing'
    launch('name', named)
    field = focus('#name-answer')
    type_text(named['name'][:2])
    assert page.locator('#name-suggestions').is_hidden()
    type_text(named['name'][2])
    layout(field, '#name-suggestions')
    page.locator('#name-suggestions [data-action="suggest"]').first.tap()
    assert field.input_value() == named['name']
    assert field.evaluate('(el)=>document.activeElement===el')
    clear(field)
    type_text(named['name'][:3])
    tap('TAB')
    assert field.input_value() == named['name']
    tap('ENTER')
    assert page.locator('#quiz-bottom.correct').is_visible()

    # A name dropdown must yield to symbol candidates while a backslash code
    # is being entered; the original name dropdown returns after conversion.
    symbol_named = page.evaluate("""() => THEOREM_DATA.theorems.find(r=>
        TQEngine.isQuestionCard(r) && r.name==='Definition of ≢')""")
    assert symbol_named, 'Symbol theorem-name fixture missing'
    launch('name', symbol_named)
    field = focus('#name-answer')
    type_text('Definition of ' + '\\nequ')
    symbol_box = '#screen-suggestions .autocomplete:not([hidden])'
    layout(field, symbol_box)
    symbol_option = page.locator(symbol_box + ' [role="option"]').filter(has_text='\\nequiv')
    assert symbol_option.count() == 1
    symbol_option.tap()
    assert field.input_value() == 'Definition of ≢'
    assert field.evaluate('(el)=>document.activeElement===el')
    layout(field, '#name-suggestions')
    tap('TAB')
    assert field.input_value() == symbol_named['name']
    tap('ENTER')
    assert page.locator('#quiz-bottom.correct').is_visible()

    proof = json.loads((ROOT / 'data/proof-questions.json').read_text())[0]
    launch('proof', proof)
    field = focus('#proof-answer')
    type_text(proof['proof']['answers'][0][:2])
    assert page.locator('#proof-suggestions').is_hidden()
    type_text(proof['proof']['answers'][0][2])
    layout(field, '#proof-suggestions')
    tap('TAB')
    assert field.input_value() == proof['proof']['answers'][0]
    clear(field)
    type_text('Definition of ' + '\\nequ')
    layout(field, symbol_box)
    assert page.locator(symbol_box + ' [role="option"]').filter(has_text='\\nequiv').is_visible()
    tap('TAB')
    assert field.input_value() == 'Definition of ≢'
    assert field.evaluate('(el)=>document.activeElement===el')
    layout(field, '#proof-suggestions')
    tap('TAB')
    assert field.input_value() == proof['proof']['answers'][0]
    # Complete codes also convert through Space inside theorem/proof names.
    clear(field)
    type_text('Definition of ' + '\\nequiv')
    tap('SPACE')
    assert field.input_value() == 'Definition of ≢ '
    tap('TAB')
    assert field.input_value() == proof['proof']['answers'][0]
    tap('ENTER')
    assert page.locator('#quiz-bottom.correct').is_visible()

    page.locator('[data-action="exit-quiz"]').tap()
    page.locator('[data-action="nav"][data-view="library"]').first.tap()
    field = focus('#library-query')
    type_text('Golden')
    page.wait_for_timeout(350)  # Search debounce replaces the field.
    field = page.locator('#library-query')
    assert field.input_value() == 'Golden'
    assert field.evaluate('(el)=>document.activeElement===el')
    layout(field)
    tap('DONE')
    page.locator('[data-action="save-preset"]').tap()
    field = focus('#preset-name')
    type_text('Qwerty 123')
    layout(field)
    tap('DONE')
    page.locator('[data-action="confirm-preset"]').tap()
    assert page.locator('#modal-root [role="dialog"]').count() == 0
    assert page.evaluate('JSON.parse(localStorage.getItem("tq.settings.v1")).presets[0].name') == 'Qwerty 123'
    assert not errors, errors


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--browser', choices=['chromium', 'webkit'], default='chromium')
    parser.add_argument('--viewport', type=int, choices=[320, 390, 667, 768],
                        help='Run one viewport in a fresh browser process')
    args = parser.parse_args()
    server = Server(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    try:
        with sync_playwright() as pw:
            browser = getattr(pw, args.browser).launch(headless=True)
            for width, height, native in [(320, 700, False), (390, 844, False),
                                          (667, 375, False), (768, 1024, True)]:
                if args.viewport and args.viewport != width:
                    continue
                page = browser.new_page(viewport={'width': width, 'height': height}, has_touch=True)
                try:
                    run(page, f'http://127.0.0.1:{server.server_port}', native, extensive=width == 390)
                    print(f'PASS: {args.browser} QWERTY {width}x{height}, native={native}')
                finally:
                    page.close()
            browser.close()
    finally:
        server.shutdown()


if __name__ == '__main__':
    main()
