"""Entered-name numbered chooser regression, including touch/native completion.

Run: python3 tests/browser_name_number_picker.py --browser chromium|webkit
Fixtures seed text with input events; chooser, candidate and keyboard use taps.
"""
import argparse
import json
import threading
from functools import partial

from playwright.sync_api import sync_playwright
from browser_qwerty import ROOT, Quiet, Server


def run(page, url, native):
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.add_init_script('''window.TQ_PORTABLE=true; window.TQ_NATIVE=%s;
        if(window.TQ_NATIVE)window.webkit={messageHandlers:{quest:{postMessage(){}}}};
    ''' % str(native).lower())
    page.goto(url)
    page.wait_for_function('typeof TQDiagnostics === "function"')
    fixture = page.evaluate('''() => {
        const E=TQEngine, rs=THEOREM_DATA.theorems.filter(E.isQuestionCard);
        const target=rs.find(r=>r.numbers?.includes('3.47a'));
        const group=E.nameGroup(rs,target);
        const other=rs.find(r=>r.name!==target.name && E.nameGroup(rs,r).length>1 &&
            new Set(E.nameGroup(rs,r).map(x=>x.displayRef)).size>1);
        const unique=rs.find(r=>r.name!=='原文未命名' && r.name &&
            rs.filter(x=>[x.name,...(x.aliases||[])].some(n=>E.normalizeName(n)===E.normalizeName(r.name))).length===1);
        const alias=rs.find(r=>r.aliases?.length && E.nameGroup(rs,r).length>1);
        return {target,group,other,unique,alias};
    }''')
    assert all(fixture.values()), 'Missing deterministic name fixtures'
    target = fixture['target']

    def activate(locator):
        if page.viewport_size['width'] < 1000:
            locator.tap()
        else:
            locator.click()

    def launch(record=target):
        page.evaluate('''s=>{localStorage.removeItem('tq.session.v1');
            localStorage.setItem('tq.settings.v1',JSON.stringify(s));}''', {
            'modes': ['name'], 'count': 1, 'retry': False, 'fullKeyboard': True,
            'scope': {'era': 'all', 'manual': True, 'selected': [record['id']]}})
        page.reload()
        activate(page.locator('[data-action="start"]').first)
        page.wait_for_function('TQDiagnostics().view==="quiz"')

    def text(value):
        field = page.locator('#name-answer')
        activate(field)
        field.evaluate('''(el,value)=>{el.value=value;
            el.dispatchEvent(new Event('input',{bubbles:true}));}''', value)

    def choices():
        return page.locator('[data-action="group-ref"]').evaluate_all('(els)=>els.map(el=>el.textContent.trim())')

    def hidden():
        assert choices() == [], choices()
        assert not page.locator('.group-number-picker').count() or page.locator('.group-number-picker').is_hidden()

    def refs(record):
        return page.evaluate('''r=>[...new Set(TQEngine.nameGroup(
            THEOREM_DATA.theorems.filter(TQEngine.isQuestionCard),r).map(x=>x.displayRef))]''', record)

    def shown(record):
        assert page.locator('.group-number-picker').is_visible()
        assert set(choices()) == set(refs(record)), (choices(), refs(record))
        assert len(choices()) == len(set(choices())), choices()

    def choose(record):
        dismiss()
        activate(page.locator('.group-number-picker summary'))
        activate(page.locator(f'[data-action="group-ref"][data-id="{record["id"]}"]'))

    def state():
        return page.evaluate('JSON.parse(localStorage.getItem("tq.session.v1")).state')

    def dismiss():
        if page.viewport_size['width'] >= 1000:
            page.locator('#name-answer').evaluate('(el)=>el.blur()')
            page.evaluate('()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))')
        if page.locator('#screen-keyboard').is_visible():
            activate(page.locator('#screen-keyboard [data-qwerty-key="DONE"]'))

    launch()
    hidden()
    for value in [target['name'][:3], 'no such theorem zz', target['displayRef'], fixture['unique']['name']]:
        text(value)
        hidden()
    # Whitespace/case normalization and matching the entered name, even when
    # that name is unrelated to the currently shown formula.
    normalized = '  ' + '   '.join(target['name'].upper().split()) + '  '
    text(normalized)
    shown(target)
    text(fixture['other']['name'])
    shown(fixture['other'])
    text(target['name'])
    choose(target)
    assert page.locator('#name-answer').input_value() == target['name']
    assert state()['selected'] == target['id']
    text(target['name'][:-1])
    hidden()
    assert state()['selected'] is None
    text(target['name'])
    choose(target)
    field = page.locator('#name-answer')
    activate(field)
    field.evaluate('(el)=>el.setSelectionRange(el.value.length,el.value.length)')
    if page.locator('#screen-keyboard').is_visible():
        activate(page.locator('#screen-keyboard [data-qwerty-key="BACKSPACE"]'))
    else:
        field.press('Backspace')
    hidden()
    assert state()['selected'] is None
    text('')
    hidden()

    # Candidate and Tab completion take the same path as entering a full name.
    for use_tab in [False, True]:
        text(target['name'][:3])
        candidate = page.locator('[data-action="suggest"]:visible').first
        assert candidate.get_attribute('data-name') == target['name']
        if use_tab:
            if page.locator('#screen-keyboard').is_visible():
                activate(page.locator('#screen-keyboard [data-qwerty-key="TAB"]'))
            else:
                page.locator('#name-answer').press('Tab')
        else:
            activate(candidate)
        assert page.locator('#name-answer').input_value() == target['name']
        shown(target)

    # A recognized alias is accepted as an exact name; arbitrary alias prefixes
    # do not reveal references. Its chooser follows the canonical name group.
    alias_record = fixture['alias']
    alias = alias_record['aliases'][0]
    launch(alias_record)
    text(alias[:-1])
    hidden()
    text(alias)
    shown(alias_record)

    for correct in [True, False]:
        launch()
        text(target['name'])
        selected = target if correct else next(r for r in fixture['group'] if r['displayRef'] != target['displayRef'])
        choose(selected)
        assert page.locator('#name-answer').input_value() == target['name']
        assert state()['selected'] == selected['id']
        page.reload()
        activate(page.locator('[data-action="resume"]').first)
        assert state()['selected'] == selected['id']
        assert page.locator('#name-answer').input_value() == target['name']
        shown(target)
        assert page.locator('[data-action="group-ref"][aria-pressed="true"]').count() == 1
        dismiss()
        activate(page.locator('#name-answer'))
        dismiss()
        page.locator('#check-answer').click()
        page.wait_for_function('TQDiagnostics().checked')
        assert page.locator('#quiz-bottom.' + ('correct' if correct else 'incorrect')).count() == 1
    assert not errors, errors


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--browser', choices=['chromium', 'webkit'], default='chromium')
    parser.add_argument('--viewport', type=int, choices=[390, 768, 1440])
    args = parser.parse_args()
    server = Server(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    try:
        with sync_playwright() as pw:
            for width in [args.viewport] if args.viewport else [390, 768, 1440]:
                browser = getattr(pw, args.browser).launch(headless=True)
                page = browser.new_page(viewport={'width': width, 'height': 1024 if width == 768 else 950}, has_touch=width < 1000)
                page.set_default_timeout(8000)
                try:
                    run(page, f'http://127.0.0.1:{server.server_port}', width == 768)
                    print(f'PASS: {args.browser} {width}px native={width == 768}', flush=True)
                finally:
                    browser.close()
    finally:
        server.shutdown()


if __name__ == '__main__':
    main()
