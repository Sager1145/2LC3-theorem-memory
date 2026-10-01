"""Complete symbol cloze with screen QWERTY, backslash completion and touch Tab."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import threading
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args): pass
class Server(ThreadingHTTPServer):
    request_queue_size = 128
server = Server(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
threading.Thread(target=server.serve_forever, daemon=True).start()
try:
    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        errors = []
        for native in [False, True]:
            for width in [320, 390]:
                page = browser.new_page(viewport={'width': width, 'height': 844}, has_touch=True)
                page.on('pageerror', lambda error: errors.append(str(error)))
                page.add_init_script('window.TQ_PORTABLE=true;window.TQ_NATIVE=' + str(native).lower())
                page.goto(f'http://127.0.0.1:{server.server_port}')
                page.wait_for_function('typeof TQDiagnostics === "function"')
                record = page.evaluate("() => THEOREM_DATA.theorems.find(r=>r.formula==='p ∧ q ≡ q ∧ p')")
                page.evaluate('''id=>{localStorage.setItem('tq.settings.v1',JSON.stringify({modes:['cloze'],count:1,retry:false,fullKeyboard:true,scope:{era:'all',manual:true,selected:[id]}}));localStorage.removeItem('tq.session.v1')}''', record['id'])
                page.reload()
                page.locator('[data-action="start"]').first.tap()
                page.wait_for_function('TQDiagnostics().view === "quiz"')
                template = page.evaluate('JSON.parse(localStorage.getItem("tq.session.v1")).state.cloze')
                field = page.locator('#cloze-answer')
                assert field.get_attribute('inputmode') == 'none'
                assert field.evaluate('(el)=>el.readOnly')
                assert page.locator('.input-accessory').count() == 0
                assert page.locator('[data-edit-key]').count() == 0
                field.focus()
                page.locator('#screen-keyboard').wait_for(state='visible')
                def key(label):
                    page.locator('#screen-keyboard').get_by_role('button', name=label, exact=True).tap()
                def type_code(code):
                    field.focus()
                    field.evaluate('(el)=>el.setSelectionRange(0,el.value.length)')
                    key('Backspace')
                    for char in code:
                        button = page.locator('#screen-keyboard').get_by_role('button', name=char, exact=True)
                        if not button.count():
                            key('Shift')
                            button = page.locator('#screen-keyboard').get_by_role('button', name=char, exact=True)
                        button.tap()
                    if not page.locator('#screen-keyboard').get_by_role('button', name='a', exact=True).count():
                        key('Shift')
                for i, slot in enumerate(template['blanks']):
                    page.locator(f'[data-action="cloze-slot"][data-slot="{i}"]').tap()
                    assert field.evaluate('(el)=>document.activeElement===el'), page.evaluate('document.activeElement.outerHTML')
                    code = page.evaluate('(symbol)=>Object.entries(TQEngine.SHORTCUTS).find(([,value])=>value===symbol)[0]', slot['correct'])
                    type_code(code)
                    assert page.locator('#shortcut-suggestions').is_visible()
                    key('Tab')
                    assert field.input_value() == slot['correct']
                    assert page.locator(f'[data-action="cloze-slot"][data-slot="{i}"]').inner_text() == slot['correct']
                    assert field.evaluate('(el)=>document.activeElement===el'), page.evaluate('document.activeElement.outerHTML')
                    if i < len(template['blanks']) - 1:
                        key('Tab')
                        assert page.locator('[data-action="cloze-slot"].active').get_attribute('data-slot') == str(i + 1)
                # Resume retains answers entered using screen QWERTY.
                page.reload()
                page.locator('[data-action="resume"]').tap()
                assert page.locator('#check-answer').is_enabled()
                # Physical Tab advances inside the group and exits at its boundaries.
                field.focus()
                field.press('Tab')
                assert not field.evaluate('(el)=>document.activeElement===el'), (native,width,page.locator('.cloze-slot.active').get_attribute('data-slot'),field.input_value())
                page.locator('[data-action="cloze-slot"][data-slot="0"]').tap()
                field.press('Shift+Tab')
                assert not field.evaluate('(el)=>document.activeElement===el'), (native,width,page.locator('.cloze-slot.active').get_attribute('data-slot'),field.input_value())
                page.locator(f'[data-action="cloze-slot"][data-slot="{len(template["blanks"]) - 1}"]').tap()
                type_code('\\equiv')
                field.press('Tab')
                assert field.input_value() == '≡'
                # Restore the correct symbol through the same completion path.
                correct_code = page.evaluate('(symbol)=>Object.entries(TQEngine.SHORTCUTS).find(([,value])=>value===symbol)[0]', template['blanks'][-1]['correct'])
                type_code(correct_code)
                key('Tab')
                key('Done')
                page.locator('#check-answer').tap()
                assert page.locator('#quiz-bottom.correct').is_visible()
                assert field.is_disabled()
                assert page.locator('#screen-keyboard').is_hidden()
                assert page.locator('[data-action="cloze-key"]').count() == 0
                assert page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1')
                page.locator('[data-action="continue"]').tap()
                assert page.evaluate('TQDiagnostics().view === "result"')
                page.close()
        assert not errors, errors
        browser.close()
    print('PASS: cloze screen QWERTY, browser/native backslash completion, slot navigation, resume, grading and locks at 320/390px')
finally:
    server.shutdown()
