"""Screen QWERTY editing and three-character completion in the shared Web UI."""
import json
import argparse
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from playwright.sync_api import sync_playwright

parser=argparse.ArgumentParser();parser.add_argument('--browser',choices=['chromium','webkit'],default='chromium');args=parser.parse_args()
ROOT = Path(__file__).resolve().parents[1]
class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass
class Server(ThreadingHTTPServer):
    request_queue_size = 128
server = Server(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
threading.Thread(target=server.serve_forever, daemon=True).start()
url = f'http://127.0.0.1:{server.server_port}'
errors = []
with sync_playwright() as pw:
    browser = getattr(pw,args.browser).launch(headless=True)
    page = browser.new_page(viewport={'width': 390, 'height': 844}, has_touch=True)
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.add_init_script('window.TQ_PORTABLE=true;')
    page.goto(url)
    page.wait_for_function('typeof TQDiagnostics === "function"')
    target = page.evaluate('''() => THEOREM_DATA.theorems.find(r => TQEngine.isQuestionCard(r)
        && r.preloaded2026 && r.name !== '原文未命名'
        && TQEngine.nameGroup(THEOREM_DATA.theorems,r).length === 1)''')
    def launch(mode, record=target):
        settings = {'modes': [mode], 'count': 1, 'retry': False, 'fullKeyboard': True,
                    'scope': {'era': 'all', 'manual': True, 'selected': [record['id']]}}
        page.evaluate('(s)=>{localStorage.removeItem("tq.session.v1");localStorage.setItem("tq.settings.v1",JSON.stringify(s));}', settings)
        page.reload()
        page.locator('[data-action="start"]').first.click()
        page.wait_for_function('TQDiagnostics().view === "quiz"')
    def edit(key):
        page.locator('#screen-keyboard').get_by_role('button', name={
            'TAB': 'Tab', 'LEFT': 'Cursor left', 'RIGHT': 'Cursor right',
            'BACKSPACE': 'Backspace', 'DONE': 'Done', 'SHIFT': 'Shift',
        }[key], exact=True).tap()
    def type_text(field, text):
        field.focus()
        for char in text:
            if char == ' ':
                page.locator('#screen-keyboard').get_by_role('button', name='Space', exact=True).tap()
                continue
            key = page.locator('#screen-keyboard').get_by_role('button', name=char, exact=True)
            if not key.count():
                edit('SHIFT')
                key = page.locator('#screen-keyboard').get_by_role('button', name=char, exact=True)
            key.tap()
        if not page.locator('#screen-keyboard').get_by_role('button', name='a', exact=True).count():
            edit('SHIFT')
    def set_text(field, text):
        field.focus()
        field.evaluate('(el)=>el.setSelectionRange(0,el.value.length)')
        edit('BACKSPACE')
        if all(ord(char) < 128 for char in text):
            type_text(field, text)
        else:
            # Unicode fixtures cannot be produced by the ASCII QWERTY layout.
            field.evaluate("(el,value)=>{el.value=value;el.dispatchEvent(new Event('input',{bubbles:true}));}", text)
    def check_keyboard_layout(field):
        field.focus()
        assert field.get_attribute('inputmode') == 'none'
        assert field.evaluate('(el)=>el.readOnly')
        assert page.locator('#screen-keyboard').is_visible()
        assert page.locator('.input-accessory').count() == 0
        assert page.locator('[data-edit-key]').count() == 0
        assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
    launch('formula')
    field = page.locator('#formula-answer')
    check_keyboard_layout(field)
    type_text(field, '\\')
    assert field.input_value() == '\\'
    assert page.locator('#shortcut-suggestions').is_visible()
    assert page.locator('#screen-suggestions [role="option"]').count() > 0
    type_text(field, 'lan')
    edit('TAB')
    assert field.input_value() == '∧'
    assert field.evaluate('(el)=>document.activeElement===el')
    set_text(field, 'p😀q')
    field.evaluate('(el)=>el.setSelectionRange(3,3)')
    edit('LEFT')
    assert field.evaluate('(el)=>el.selectionStart') == 1
    edit('RIGHT')
    assert field.evaluate('(el)=>el.selectionStart') == 3
    edit('BACKSPACE')
    assert field.input_value() == 'pq'
    # Seed an unfinished shortcut inside existing text; typing Space completes it.
    field.evaluate("(el)=>{el.value='p '+String.fromCharCode(92)+'lan q';el.dispatchEvent(new Event('input',{bubbles:true}));}")
    field.evaluate("(el)=>{el.setSelectionRange(6,6);el.dispatchEvent(new Event('input',{bubbles:true}));}")
    edit('TAB')
    assert field.input_value() == 'p ∧ q', field.input_value()
    page.screenshot(path='/private/tmp/theorem-mobile-inputs.png', full_page=True)
    page.set_viewport_size({'width':320,'height':700})
    page.evaluate("document.documentElement.style.fontSize='200%'")
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
    assert page.locator('#screen-keyboard').get_by_role('button', name='Cursor left', exact=True).evaluate('(el)=>el.getBoundingClientRect().width>=26 && el.getBoundingClientRect().height>=26')
    page.evaluate("document.documentElement.style.fontSize=''")
    page.set_viewport_size({'width':390,'height':844})
    edit('DONE')
    assert page.locator('#screen-keyboard').is_hidden()
    launch('symbol')
    field = page.locator('#symbol-answer')
    set_text(field, '\\lan')
    edit('TAB')
    assert field.input_value() == '\\land'
    launch('blanks')
    page.locator('#blank-0').focus()
    edit('TAB')
    assert page.locator('#blank-1').evaluate('(el)=>document.activeElement===el')
    edit('LEFT')
    assert page.locator('#blank-0').evaluate('(el)=>document.activeElement===el')
    template = page.evaluate('(f)=>TQEngine.blankTemplate(f)', target['formula'])
    for i, blank in enumerate(template['blanks']):
        field = page.locator(f'#blank-{i}')
        if blank['variable'] == template['variables'][0]:
            set_text(field, '')
            type_text(field, '\\')
            type_text(field, 'alp')
            assert page.locator('#screen-suggestions [role="option"]').count() > 0
            edit('TAB')
            assert field.input_value() == 'α'
        else:
            set_text(field, blank['variable'])
    edit('DONE')
    page.locator('#check-answer').click()
    assert page.locator('#quiz-bottom.correct').is_visible()
    launch('name')
    field = page.locator('#name-answer')
    check_keyboard_layout(field)
    set_text(field, target['name'][:2])
    assert page.locator('#name-suggestions').is_hidden()
    set_text(field, '  ' + target['name'][0])
    assert page.locator('#name-suggestions').is_visible()
    for query in ['3.47', '原文未', 'the precondition', 'zzz-no-matching-theorem']:
        set_text(field, query)
        assert page.locator('#name-suggestions').is_hidden()
        assert field.get_attribute('aria-expanded') == 'false'
    set_text(field, target['name'][:3])
    suggestion = page.locator('[data-action="suggest"]').first
    chosen = suggestion.get_attribute('data-name')
    assert chosen == suggestion.locator('.record-name').inner_text()
    assert suggestion.get_attribute('data-id') is None
    assert suggestion.get_attribute('data-group') is None
    assert page.locator('#name-suggestions .record-ref').count() == 0
    suggestion.tap()
    assert field.input_value() == chosen
    assert field.evaluate('(el)=>document.activeElement===el')
    page.set_viewport_size({'width':390,'height':844})
    set_text(field, target['name'][:3])
    edit('TAB')
    assert field.input_value() == chosen
    assert page.locator('#name-suggestions').is_hidden()
    unnamed = page.evaluate('''() => THEOREM_DATA.theorems.find(r => TQEngine.isQuestionCard(r)
        && r.name === '原文未命名' && r.numbers.length)''')
    launch('name', unnamed)
    # Restore the unnamed question with named cards also in the active scope.
    page.evaluate('''ids => {
        const settings=JSON.parse(localStorage.getItem('tq.settings.v1'));
        settings.scope.selected=ids;
        localStorage.setItem('tq.settings.v1',JSON.stringify(settings));
    }''', [unnamed['id'], target['id']])
    page.reload()
    page.locator('[data-action="resume"]').click()
    field = page.locator('#name-answer')
    set_text(field, target['name'][:3])
    assert page.locator('#name-suggestions').is_hidden()
    assert field.get_attribute('aria-expanded') == 'false'
    set_text(field, unnamed['numbers'][0])
    assert page.locator('#name-suggestions').is_hidden()
    edit('DONE')
    page.locator('#check-answer').click()
    assert page.locator('#quiz-bottom.correct').is_visible()
    alias_record = page.evaluate('''() => THEOREM_DATA.theorems.find(r => TQEngine.isQuestionCard(r)
        && r.name !== '原文未命名' && r.aliases.some(alias => alias.length >= 3 && alias !== r.name))''')
    launch('name', alias_record)
    field = page.locator('#name-answer')
    alias = next(alias for alias in alias_record['aliases'] if len(alias) >= 3 and alias != alias_record['name'])
    set_text(field, alias)
    alias_candidates = page.locator('[data-action="suggest"]').all()
    exact = [candidate for candidate in alias_candidates if candidate.get_attribute('data-name') == alias]
    assert len(exact) == 1
    exact[0].click()
    assert field.input_value() == alias
    edit('DONE')
    page.locator('#check-answer').click()
    assert page.locator('#quiz-bottom.correct').is_visible()
    group = page.evaluate("""() => {const rs=THEOREM_DATA.theorems.filter(TQEngine.isQuestionCard);
        const r=rs.find(r=>r.preloaded2026 && TQEngine.nameGroup(rs,r).length>1);
        return TQEngine.nameGroup(rs,r);}""")
    launch('name',group[0])
    page.evaluate('(ids)=>{const s=JSON.parse(localStorage.getItem("tq.settings.v1"));s.scope.selected=ids;localStorage.setItem("tq.settings.v1",JSON.stringify(s));localStorage.removeItem("tq.session.v1");}',[r['id'] for r in group])
    page.reload()
    page.locator('[data-action="start"]').first.click()
    field = page.locator('#name-answer')
    set_text(field, group[0]['name'][:3])
    candidates = page.locator('[data-action="suggest"]').all()
    exact = [candidate for candidate in candidates if candidate.get_attribute('data-name') == group[0]['name']]
    assert len(exact) == 1
    assert exact[0].locator('.record-ref').count() == 0
    exact[0].click()
    assert field.input_value() == group[0]['name']
    edit('DONE')
    page.locator('#check-answer').click()
    assert page.locator('#quiz-bottom.correct').is_visible()
    launch('name',group[0])
    field = page.locator('#name-answer')
    set_text(field, group[0]['name'][:3])
    edit('TAB')
    assert field.input_value() == group[0]['name']
    page.screenshot(path='/private/tmp/theorem-mobile-group.png',full_page=True)
    edit('DONE')
    page.locator('#check-answer').click()
    assert page.locator('#quiz-bottom.correct').is_visible()
    proof = json.loads((ROOT / 'data/proof-questions.json').read_text())[0]
    launch('proof', proof)
    field = page.locator('#proof-answer')
    answer = proof['proof']['answers'][0]
    set_text(field, answer[:2])
    assert page.locator('#proof-suggestions').is_hidden()
    set_text(field, '  ' + answer[0])
    assert page.locator('#proof-suggestions').is_visible()
    set_text(field, answer[:3])
    check_keyboard_layout(field)
    assert page.locator('#screen-suggestions #proof-suggestions').is_visible()
    assert field.evaluate('(el)=>getComputedStyle(el).fontFamily') == 'monospace'
    assert page.locator('#proof-suggestions .record-name').first.evaluate('(el)=>getComputedStyle(el).fontFamily') == 'monospace'
    page.set_viewport_size({'width':390,'height':844})
    chosen = page.locator('[data-action="proof-suggest"]').first.inner_text()
    edit('TAB')
    assert field.input_value() == chosen
    set_text(field, answer)
    matching = page.locator('[data-action="proof-suggest"]').filter(has_text=answer)
    exact = [matching.nth(i) for i in range(matching.count()) if matching.nth(i).get_attribute('data-name') == answer]
    assert len(exact) == 1
    exact[0].click()
    assert field.input_value() == answer
    edit('DONE')
    page.locator('#check-answer').click()
    assert page.locator('#quiz-bottom.correct').is_visible()
    page.locator('[data-action="exit-quiz"]').click()
    page.locator('[data-action="nav"][data-view="library"]').first.click()
    search = page.locator('input[data-filter="query"]')
    search.focus()
    type_text(search, '\\')
    page.wait_for_timeout(300)
    assert page.locator('#screen-keyboard').is_visible()
    edit('TAB')
    page.wait_for_timeout(300)
    assert not search.input_value().startswith('\\')
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
    assert not errors, errors
    browser.close()
server.shutdown()
print('Mobile input controls, caret editing, completion, name thresholds, proof names and search: passed')
