"""Name completion coverage across broad prefixes, scopes and unnamed cards."""
import threading
from functools import partial

from playwright.sync_api import sync_playwright
from browser_qwerty import ROOT, Quiet, Server


def run(page, url, native):
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.add_init_script('window.TQ_PORTABLE=true;window.TQ_NATIVE=%s;' % str(native).lower())
    page.goto(url)
    page.wait_for_function('typeof TQDiagnostics === "function"')
    target, other, unnamed = page.evaluate('''() => {
        const rs=THEOREM_DATA.theorems.filter(TQEngine.isQuestionCard);
        return [rs.find(r=>r.name==='Definition of ≢'),
            rs.find(r=>r.name==='Golden rule'),
            rs.find(r=>r.name==='原文未命名' && r.numbers.length)];
    }''')
    assert target and other and unnamed

    def settings(record):
        return {'modes': ['name'], 'count': 1, 'retry': False, 'fullKeyboard': True,
                'scope': {'era': 'all', 'manual': True, 'selected': [record['id']]}}

    def launch(record):
        page.evaluate('''s=>{localStorage.removeItem('tq.session.v1');
            localStorage.setItem('tq.settings.v1',JSON.stringify(s));}''', settings(record))
        page.reload()
        page.locator('[data-action="start"]').first.click()
        page.wait_for_function('TQDiagnostics().view==="quiz"')

    def enter(text):
        field = page.locator('#name-answer')
        field.focus()
        field.evaluate('''(el,text)=>{el.value=text;el.setSelectionRange(text.length,text.length);
            el.dispatchEvent(new Event('input',{bubbles:true}));}''', text)
        return page.locator('[data-action="suggest"]').evaluate_all('(els)=>els.map(el=>el.dataset.name)')

    launch(other)
    names = enter('Def')
    assert len(names) > 80, len(names)
    assert target['name'] in names
    # Resume the question after its card is excluded by the current manual scope.
    launch(target)
    page.evaluate('s=>localStorage.setItem("tq.settings.v1",JSON.stringify(s))', settings(other))
    page.reload()
    page.locator('[data-action="resume"]').first.click()
    assert target['name'] in enter('Def')
    candidate = page.locator('[data-action="suggest"]').filter(has_text=target['name'])
    assert candidate.count() == 1
    candidate.click()
    assert page.locator('#name-answer').input_value() == target['name']
    if page.locator('#screen-keyboard').is_visible():
        page.locator('#screen-keyboard [data-qwerty-key="DONE"]').click()
    page.locator('#check-answer').click()
    assert page.locator('#quiz-bottom.correct').count() == 1

    launch(unnamed)
    assert 'Golden rule' in enter('Gol')
    for text in ['原文未', unnamed['numbers'][0]]:
        assert enter(text) == [], text
    assert not errors, errors


def main():
    server = Server(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    try:
        with sync_playwright() as pw:
            for name in ['chromium', 'webkit']:
                browser = getattr(pw, name).launch(headless=True)
                try:
                    for width, native in [(1440, False), (390, True)]:
                        page = browser.new_page(viewport={'width': width, 'height': 950}, has_touch=native)
                        page.set_default_timeout(8000)
                        run(page, f'http://127.0.0.1:{server.server_port}', native)
                        page.close()
                        print(f'PASS: {name} {width}px native={native}', flush=True)
                finally:
                    browser.close()
    finally:
        server.shutdown()


if __name__ == '__main__':
    main()
