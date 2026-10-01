"""Default mobile fill-in controls: large answer buttons without any keyboard.

Run: python3 tests/browser_fill_buttons.py [--browser chromium|webkit]
The separate browser_qwerty regression covers the fullKeyboard opt-in.
"""
import argparse
import json
import threading
from functools import partial

from playwright.sync_api import sync_playwright

from browser_qwerty import Quiet, ROOT, Server


def exercise(page, url, native):
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.add_init_script('''window.TQ_PORTABLE=true;window.TQ_NATIVE=%s;
        if(window.TQ_NATIVE)window.webkit={messageHandlers:{quest:{postMessage(){}}}};
    ''' % str(native).lower())
    page.goto(url)
    page.wait_for_function('typeof TQDiagnostics === "function"')
    variable_record = page.evaluate('''() => THEOREM_DATA.theorems.find(r=>
        TQEngine.isQuestionCard(r) && r.formula==='p ∧ q ≡ q ∧ p')''')
    symbol_record = page.evaluate('''() => THEOREM_DATA.theorems.find(r=>
        TQEngine.isQuestionCard(r) && TQEngine.eligibleModes(r,['cloze'],3).length
        && TQEngine.symbolsInFormula(r.formula).length>=3)''')
    assert variable_record and symbol_record, 'Fill-in fixtures missing'

    def launch(mode, record, difficulty=2):
        # Deliberately omit fullKeyboard: its default must be button-only.
        page.evaluate('''s=>{localStorage.removeItem('tq.session.v1');
            localStorage.setItem('tq.settings.v1',JSON.stringify(s));}''', {
                'modes': [mode], 'count': 1, 'retry': False, 'choiceDifficulty': difficulty,
                'scope': {'era': 'all', 'manual': True, 'selected': [record['id']]}})
        page.reload()
        page.locator('[data-action="start"]').first.tap()
        page.wait_for_function('TQDiagnostics().view==="quiz"')
        if mode in ['blanks', 'cloze']:
            page.locator('#keyboard').wait_for(state='visible')

    def field_checks(selector):
        field = page.locator(selector)
        field.tap()
        assert field.get_attribute('inputmode') == 'none', selector
        assert field.evaluate('(el)=>el.readOnly'), selector
        assert field.get_attribute('data-button-input') is not None, selector
        assert page.locator('#screen-keyboard').is_hidden()
        assert page.locator('html').evaluate('(el)=>el.classList.contains("button-fill-active")')
        assert page.locator('.input-accessory').count() == 0 or page.locator('.input-accessory').is_hidden()
        return field

    def key(value):
        return page.locator('#keyboard [data-action="key"][data-key=' + json.dumps(value, ensure_ascii=False) + ']')

    def tap_key(value):
        key(value).tap()
        assert page.locator('#screen-keyboard').is_hidden()

    def panel_checks(mode):
        page.locator('#keyboard').scroll_into_view_if_needed()
        controls = (page.locator('#keyboard .key-controls button') if mode == 'blanks'
                    else page.locator('#keyboard [data-action="cloze-prev"],'
                                      '#keyboard [data-action="cloze-next"],'
                                      '#keyboard [data-action="cloze-delete"]'))
        assert controls.count() == 3
        assert controls.evaluate_all('''els=>els.every(el=>{
            const r=el.getBoundingClientRect();return r.width>=47.9&&r.height>=47.9;
        })'''), 'Cursor and delete controls must be at least 48px'
        delete = key('BACKSPACE') if mode == 'blanks' else page.locator('[data-action="cloze-delete"]')
        assert delete.evaluate('''el=>{
            const s=getComputedStyle(el);
            return [s.color,s.backgroundColor,s.borderTopColor].some(color=>{
                const n=color.match(/[\\d.]+/g)?.map(Number);
                return n&&n[0]>100&&n[0]>n[1]*1.2&&n[0]>n[2]*1.2;
            });
        }'''), 'Delete must have a red visual treatment'
        assert page.locator('#keyboard .key').evaluate_all('''els=>els.every(el=>{
            const r=el.getBoundingClientRect();return r.width>=47.9&&r.height>=47.9;
        })'''), 'Answer keys must remain large'
        assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
        assert page.locator('#check-answer').is_visible()
        assert page.locator('#keyboard').evaluate('''el=>{
            const k=el.getBoundingClientRect(),f=document.querySelector('#quiz-bottom').getBoundingClientRect();
            const main=el.closest('.quiz-main'),m=main.getBoundingClientRect();
            const clipped=/^(auto|scroll)$/.test(getComputedStyle(main).overflowY);
            const visibleBottom=clipped?Math.min(k.bottom,m.bottom):k.bottom;
            return k.left>=-1&&k.right<=innerWidth+1&&visibleBottom<=f.top+1;
        }'''), 'Answer panel must not overlap the grading footer'
        page.screenshot(path=f'/tmp/tq-fill-buttons-{mode}-{page.viewport_size["width"]}.png')

    def resume():
        page.reload()
        page.locator('[data-action="resume"]').tap()
        page.wait_for_function('TQDiagnostics().view==="quiz"')
        assert page.locator('#screen-keyboard').is_hidden()

    def locked(mode, correct=True):
        assert page.locator('#quiz-bottom.' + ('correct' if correct else 'incorrect')).is_visible()
        assert page.locator('#screen-keyboard').is_hidden()
        if mode == 'blanks':
            assert page.locator('.blank-slot:not(:disabled)').count() == 0
            assert page.locator('#keyboard [data-action="key"]:not(:disabled)').count() == 0
        else:
            assert page.locator('#cloze-answer').is_disabled()
            assert page.locator('[data-action="cloze-slot"]:not(:disabled),'
                                '#keyboard button:not(:disabled)').count() == 0

    launch('blanks', variable_record)
    template = page.evaluate('(f)=>TQEngine.blankTemplate(f)', variable_record['formula'])
    letters = page.locator('#keyboard [data-action="key"]').evaluate_all(
        '(els)=>els.map(el=>el.dataset.key).filter(k=>!k.startsWith("CURSOR_")&&k!=="BACKSPACE")')
    assert len(set(letters) - set(template['variables'])) >= 2, 'Multiple letter distractors required'
    panel_checks('blanks')
    field_checks('#blank-0')
    tap_key(template['blanks'][0]['variable'])
    assert page.locator('#blank-1').evaluate('(el)=>document.activeElement===el'), 'Answer tap advances a blank'
    resume()
    assert page.locator('#blank-0').input_value() == template['blanks'][0]['variable']
    field_checks('#blank-1')
    tap_key(template['blanks'][1]['variable'])
    tap_key('CURSOR_LEFT')
    assert page.locator('#blank-1').evaluate('(el)=>document.activeElement===el')
    tap_key('BACKSPACE')
    assert page.locator('#blank-1').input_value() == ''
    tap_key('CURSOR_RIGHT')
    assert page.locator('#blank-2').evaluate('(el)=>document.activeElement===el')
    for index, blank in enumerate(template['blanks']):
        field_checks(f'#blank-{index}')
        tap_key(blank['variable'])
    page.locator('#check-answer').tap()
    locked('blanks')
    resume()
    locked('blanks')
    launch('blanks', variable_record)
    for index in range(len(template['blanks'])):
        field_checks(f'#blank-{index}')
        tap_key(template['variables'][0])
    page.locator('#check-answer').tap()
    locked('blanks', correct=False)

    blank_counts = []
    for difficulty in [1, 2, 3]:
        launch('cloze', symbol_record, difficulty)
        state = page.evaluate('JSON.parse(localStorage.getItem("tq.session.v1")).state')
        template = state['cloze']
        blank_counts.append(len(template['blanks']))
        correct_tokens = {slot['correct'] for slot in template['blanks']}
        options = page.locator('#keyboard [data-action="cloze-key"]').evaluate_all(
            '(els)=>els.map(el=>el.dataset.token)')
        assert len(set(options) - correct_tokens) >= 2, 'Multiple symbol distractors required'
        panel_checks('cloze')
        page.locator('[data-action="cloze-slot"][data-slot="0"]').tap()
        field_checks('#cloze-answer')
        token = template['blanks'][0]['correct']
        page.locator('[data-action="cloze-key"][data-token=' + json.dumps(token, ensure_ascii=False) + ']').tap()
        if len(template['blanks']) > 1:
            assert page.locator('[data-action="cloze-slot"].active').get_attribute('data-slot') == '1'
            page.locator('[data-action="cloze-prev"]').tap()
        page.locator('[data-action="cloze-delete"]').tap()
        assert page.locator('[data-action="cloze-slot"][data-slot="0"]').inner_text() == '？'
        page.locator('[data-action="cloze-key"][data-token=' + json.dumps(token, ensure_ascii=False) + ']').tap()
        resume()
        assert page.locator('[data-action="cloze-slot"][data-slot="0"]').inner_text() == token
        if len(template['blanks']) > 1:
            page.locator('[data-action="cloze-slot"][data-slot="0"]').tap()
            page.locator('[data-action="cloze-next"]').tap()
            assert page.locator('[data-action="cloze-slot"].active').get_attribute('data-slot') == '1'
        for index, slot in enumerate(template['blanks']):
            page.locator(f'[data-action="cloze-slot"][data-slot="{index}"]').tap()
            field_checks('#cloze-answer')
            page.locator('[data-action="cloze-key"][data-token=' + json.dumps(slot['correct'], ensure_ascii=False) + ']').tap()
            assert page.locator('#screen-keyboard').is_hidden()
        page.locator('#check-answer').tap()
        locked('cloze')
        resume()
        locked('cloze')
    assert blank_counts[0] == 1 and blank_counts[0] <= blank_counts[1] <= blank_counts[2], blank_counts
    launch('cloze', symbol_record)
    template = page.evaluate('JSON.parse(localStorage.getItem("tq.session.v1")).state.cloze')
    wrong = next(token for token in template['options'] if token != template['blanks'][0]['correct'])
    for index, slot in enumerate(template['blanks']):
        page.locator(f'[data-action="cloze-slot"][data-slot="{index}"]').tap()
        token = wrong if index == 0 else slot['correct']
        page.locator('[data-action="cloze-key"][data-token=' + json.dumps(token, ensure_ascii=False) + ']').tap()
    page.locator('#check-answer').tap()
    locked('cloze', correct=False)
    # Switch the actual settings checkbox, reload to verify persistence, then
    # start each fill-in mode using the persisted preference in both directions.
    def settings_page():
        if page.evaluate('TQDiagnostics().view') == 'quiz':
            page.locator('[data-action="exit-quiz"]').tap()
        page.locator('[data-action="nav"][data-view="settings"]').first.tap()
        return page.locator('[data-setting="fullKeyboard"]')

    for mode, record, selector in [('blanks', variable_record, '#blank-0'),
                                    ('cloze', symbol_record, '#cloze-answer')]:
        launch(mode, record)
        toggle = settings_page()
        assert not toggle.is_checked(), 'Full keyboard must default to off'
        toggle.tap()
        assert toggle.is_checked()
        assert page.evaluate('JSON.parse(localStorage.getItem("tq.settings.v1")).fullKeyboard') is True
        page.reload()
        toggle = settings_page()
        assert toggle.is_checked(), 'Full keyboard opt-in must survive reload'
        page.locator('[data-action="start"]').first.tap()
        field = page.locator(selector)
        field.tap()
        page.locator('#screen-keyboard').wait_for(state='visible')
        assert field.get_attribute('inputmode') == 'none' and field.evaluate('(el)=>el.readOnly')
        assert field.get_attribute('data-button-input') is None
        assert page.locator('#keyboard').is_hidden()
        toggle = settings_page()
        toggle.tap()
        assert not toggle.is_checked()
        assert page.evaluate('JSON.parse(localStorage.getItem("tq.settings.v1")).fullKeyboard') is False
        page.reload()
        toggle = settings_page()
        assert not toggle.is_checked(), 'Restored button preference must survive reload'
        page.locator('[data-action="start"]').first.tap()
        field_checks(selector)
        panel_checks(mode)

    # The fill-in preference never disables QWERTY for other text answers.
    for mode, selector in [('formula', '#formula-answer'), ('name', '#name-answer'),
                           ('symbol', '#symbol-answer')]:
        launch(mode, variable_record)
        field = page.locator(selector)
        field.tap()
        page.locator('#screen-keyboard').wait_for(state='visible')
        assert field.get_attribute('inputmode') == 'none'
        assert field.evaluate('(el)=>el.readOnly')
        assert not page.locator('html').evaluate('(el)=>el.classList.contains("button-fill-active")')
        page.locator('[data-qwerty-key="DONE"]').tap()
    assert not errors, errors


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--browser', choices=['chromium', 'webkit'], default='chromium')
    parser.add_argument('--viewport', type=int, choices=[320, 390, 667],
                        help='Run one viewport in a fresh browser process')
    args = parser.parse_args()
    server = Server(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    try:
        with sync_playwright() as pw:
            browser = getattr(pw, args.browser).launch(headless=True)
            for width, height, native in [(320, 700, False), (390, 844, True), (667, 375, False)]:
                if args.viewport and args.viewport != width:
                    continue
                page = browser.new_page(viewport={'width': width, 'height': height}, has_touch=True)
                try:
                    exercise(page, f'http://127.0.0.1:{server.server_port}', native)
                    print(f'PASS: {args.browser} fill buttons {width}x{height}, native={native}')
                finally:
                    page.close()
            browser.close()
    finally:
        server.shutdown()


if __name__ == '__main__':
    main()
