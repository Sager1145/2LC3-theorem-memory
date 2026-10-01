"""Direct touch slot selection and modal grading feedback.

Run: python3 tests/browser_touch_feedback.py [--browser chromium|webkit]
Chromium uses real touch swipes; WebKit checks touch cancellation and wheel
scroll containment because Playwright's WebKit touchscreen API exposes taps.
"""
import argparse
import json
import threading
from functools import partial

from playwright.sync_api import sync_playwright

from browser_qwerty import Quiet, ROOT, Server


def exercise(page, url, browser_name, reduced):
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.add_init_script('window.TQ_PORTABLE=true;')
    page.goto(url)
    page.wait_for_function('typeof TQDiagnostics === "function"')
    record = page.evaluate('''() => THEOREM_DATA.theorems.find(r=>
        TQEngine.isQuestionCard(r) && r.formula==='p ∧ q ≡ q ∧ p')''')

    def launch(mode, records, count=1):
        page.evaluate('''s=>{localStorage.removeItem('tq.session.v1');
            localStorage.setItem('tq.settings.v1',JSON.stringify(s));}''', {
                'modes': [mode], 'count': count, 'retry': False,
                'choiceDifficulty': 3, 'fullKeyboard': False,
                'scope': {'era': 'all', 'manual': True,
                          'selected': [r['id'] for r in records]}})
        page.reload()
        page.locator('[data-action="start"]').first.tap()
        page.wait_for_function('TQDiagnostics().view==="quiz"')

    def key(value):
        return page.locator('#keyboard [data-action="key"][data-key=' +
                            json.dumps(value, ensure_ascii=False) + ']')

    def settled():
        page.wait_for_function('''() => document.getAnimations().every(a=>
            a.playState!=='running' || a.effect.getTiming().iterations===Infinity)''')

    def check_reduced_motion():
        if reduced:
            assert page.evaluate('''() => document.getAnimations().every(a=>{
                const frames=a.effect.getKeyframes();
                return new Set(frames.map(f=>f.transform||'none')).size<=1;
            })'''), 'Reduced motion must not animate transforms'

    launch('blanks', [record])
    blanks = page.locator('.blank-slot').count()
    assert blanks >= 3
    # Select nonadjacent positions and blur before tapping a key. Touch selection
    # must survive loss of DOM focus instead of falling back to the first blank.
    for index, letter in [(0, 'p'), (blanks // 2, 'q'), (blanks - 1, 'p')]:
        field = page.locator(f'#blank-{index}')
        field.tap()
        page.locator('.quiz-main h1').tap()
        assert not field.evaluate('(el)=>document.activeElement===el')
        before = page.locator('.blank-slot').evaluate_all('(els)=>els.map(el=>el.value)')
        key(letter).tap()
        after = page.locator('.blank-slot').evaluate_all('(els)=>els.map(el=>el.value)')
        assert after[index] == letter, ('Touch selected the wrong blank', index, after)
        assert all(a == b for i, (a, b) in enumerate(zip(before, after)) if i != index)
        check_reduced_motion()

    symbol_record = page.evaluate('''() => THEOREM_DATA.theorems.find(r=>
        TQEngine.isQuestionCard(r) && TQEngine.clozeTemplate(r.formula,()=>0,3)?.blanks.length>=3)''')
    launch('cloze', [symbol_record])
    template = page.evaluate('JSON.parse(localStorage.getItem("tq.session.v1")).state.cloze')
    assert len(template['blanks']) >= 3
    for index in [0, len(template['blanks']) // 2, len(template['blanks']) - 1]:
        page.locator(f'[data-action="cloze-slot"][data-slot="{index}"]').tap()
        token = template['blanks'][index]['correct']
        page.locator('#keyboard [data-action="cloze-key"][data-token=' +
                     json.dumps(token, ensure_ascii=False) + ']').tap()
        assert page.locator(f'[data-action="cloze-slot"][data-slot="{index}"]').inner_text() == token
        check_reduced_motion()

    # Use the largest answer group so scrolling is needed on a phone. Exercise
    # both the button-only fill layout and the ordinary quiz layout.
    grouped = page.evaluate('''() => {
        const rs=THEOREM_DATA.theorems.filter(TQEngine.isQuestionCard);
        const counts=new Map();
        for(const r of rs.filter(r=>r.numbers?.length)){const n=TQEngine.normalizeName(r.name);counts.set(n,(counts.get(n)||0)+1);}
        return rs.filter(r=>r.numbers?.length && r.name!=='原文未命名'
            && counts.get(TQEngine.normalizeName(r.name))<=12
            && TQEngine.eligibleModes(r,['blanks'],3).length)
            .sort((a,b)=>counts.get(TQEngine.normalizeName(b.name))-counts.get(TQEngine.normalizeName(a.name)))[0];
    }''')
    group_records = page.evaluate('''id=>TQEngine.nameGroup(THEOREM_DATA.theorems,
        THEOREM_DATA.theorems.find(r=>r.id===id))''', grouped['id'])
    cdp = page.context.new_cdp_session(page) if browser_name == 'chromium' else None

    def swipe(locator, direction=1):
        rect = locator.bounding_box()
        assert rect
        x = max(8, min(page.viewport_size['width'] - 8, rect['x'] + rect['width'] / 2))
        top = max(8, rect['y'])
        bottom = min(page.viewport_size['height'] - 8, rect['y'] + rect['height'])
        assert bottom - top > 50, rect
        start = bottom - 15 if direction > 0 else top + 15
        end = top + 15 if direction > 0 else bottom - 15
        if cdp:
            cdp.send('Input.dispatchTouchEvent', {'type': 'touchStart',
                     'touchPoints': [{'x': x, 'y': start}]})
            for step in range(1, 9):
                cdp.send('Input.dispatchTouchEvent', {'type': 'touchMove',
                         'touchPoints': [{'x': x, 'y': start + (end - start) * step / 8}]})
                page.wait_for_timeout(16)
            cdp.send('Input.dispatchTouchEvent', {'type': 'touchEnd', 'touchPoints': []})
        else:
            page.mouse.move(x, (top + bottom) / 2)
            page.mouse.wheel(0, direction * 450)
        page.wait_for_timeout(250)

    for mode in ['blanks', 'choice']:
        launch(mode, group_records + [record], count=2)
        # Restore a deterministic queue order through the existing session
        # persistence path: the longest answer comes first, a second stays for
        # checking that Continue unlocks the next question.
        page.evaluate('''fixture=>{
            const s=JSON.parse(localStorage.getItem('tq.session.v1'));
            s.queue=fixture;s.state=null;
            localStorage.setItem('tq.session.v1',JSON.stringify(s));
        }''', [{'id': grouped['id'], 'mode': mode}, {'id': record['id'], 'mode': mode}])
        page.reload()
        page.locator('[data-action="resume"]').tap()
        page.locator('[data-action="skip"]').tap()
        panel = page.locator('#quiz-bottom.feedback')
        panel.wait_for(state='visible')
        check_reduced_motion()
        settled()
        if mode == 'choice' and not reduced:
            page.set_viewport_size({'width': 390, 'height': 844})
            page.screenshot(path=f'/private/tmp/tq-feedback-{browser_name}-phone.png')
            page.set_viewport_size({'width': 667, 'height': 375})
            page.screenshot(path=f'/private/tmp/tq-feedback-{browser_name}-landscape.png')
            page.set_viewport_size({'width': 390, 'height': 700})
        assert page.locator('.quiz-main').evaluate('(el)=>el.inert'), 'Feedback background must be inert'
        assert page.locator('.quiz-top').evaluate('(el)=>el.inert'), 'Exit button must be blocked during feedback'
        assert not panel.evaluate('(el)=>el.inert'), 'Feedback itself must remain interactive'
        assert panel.locator('[data-action="continue"]').is_enabled()
        # touchstart must retain its native default so the answer sheet can pan.
        assert panel.locator('.feedback-message').evaluate('''el=>{
            const ev=new TouchEvent('touchstart',{bubbles:true,cancelable:true});
            el.dispatchEvent(ev);return !ev.defaultPrevented;
        }'''), 'Answer feedback prevents touch scrolling'
        scroller = panel.locator('.feedback-message')
        page.wait_for_function('''() => {
            const el=document.querySelector('#quiz-bottom .feedback-message');
            return el && el.scrollHeight>el.clientHeight+2 && el.clientHeight>50;
        }''')
        assert scroller.evaluate('(el)=>el.scrollHeight>el.clientHeight+2'), (
            'Fixture must require answer scrolling', mode,
            panel.evaluate('''el=>({question:TQDiagnostics().question,
                variants:el.querySelectorAll('.answer-variant').length,
                panel:el.getBoundingClientRect().toJSON(),
                scroll:el.querySelector('.feedback-message').getBoundingClientRect().toJSON()})'''))
        background = page.evaluate('''() => ({window:scrollY,
            main:document.querySelector('.quiz-main').scrollTop})''')
        swipe(scroller)
        assert scroller.evaluate('(el)=>el.scrollTop>0'), 'Touch/wheel did not scroll answer feedback'
        # Swiping again at the end cannot chain onto the quiz underneath.
        scroller.evaluate('(el)=>el.scrollTop=el.scrollHeight')
        swipe(scroller)
        after_scroll = page.evaluate('''() => ({window:scrollY,
            main:document.querySelector('.quiz-main').scrollTop})''')
        assert after_scroll == background, ('Feedback scroll leaked to quiz', mode, background, after_scroll)
        # A physical tap at the underlying exit location must not close the quiz.
        exit_rect = page.locator('[data-action="exit-quiz"]').bounding_box()
        page.touchscreen.tap(exit_rect['x'] + exit_rect['width'] / 2,
                             exit_rect['y'] + exit_rect['height'] / 2)
        assert page.evaluate('TQDiagnostics().view') == 'quiz'
        assert page.locator('#modal-root').inner_html() == ''
        panel.locator('[data-action="continue"]').tap()
        page.wait_for_function('''() => TQDiagnostics().view==='quiz' &&
            !document.querySelector('#quiz-bottom').classList.contains('feedback')''')
        check_reduced_motion()
        assert not page.locator('.quiz-main').evaluate('(el)=>el.inert')
        assert not page.locator('.quiz-top').evaluate('(el)=>el.inert')
        if mode == 'blanks':
            last = page.locator('.blank-slot').count() - 1
            page.locator(f'#blank-{last}').tap()
            value = page.locator('#keyboard [data-action="key"]').evaluate_all(
                '(els)=>els.map(el=>el.dataset.key).find(k=>TQEngine.isVariable(k))')
            key(value).tap()
            assert page.locator(f'#blank-{last}').input_value() == value
        else:
            page.locator('.choice').first.tap()
            assert page.locator('#check-answer').is_enabled()
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
            for reduced in [False, True]:
                page = browser.new_page(viewport={'width': 390, 'height': 700},
                                        has_touch=True,
                                        reduced_motion='reduce' if reduced else 'no-preference')
                try:
                    exercise(page, f'http://127.0.0.1:{server.server_port}', args.browser, reduced)
                    print(f'PASS: {args.browser} direct touch slots and feedback, reduced={reduced}')
                finally:
                    page.close()
            browser.close()
    finally:
        server.shutdown()


if __name__ == '__main__':
    main()
