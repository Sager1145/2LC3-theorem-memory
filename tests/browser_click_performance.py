"""Regressions for scoped DOM work and persistent cloze controls.

Run: python3 tests/browser_click_performance.py --browser chromium|webkit
"""
import argparse
import json
import threading
from functools import partial

from playwright.sync_api import sync_playwright
from browser_qwerty import Quiet, ROOT, Server


def run(browser, url):
    for language in ['zh-CN', 'en']:
        context = browser.new_context(viewport={'width': 390, 'height': 844}, has_touch=True)
        page = context.new_page()
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        seed = {'language': language, 'modes': ['choice'],
                'scope': {'era': '2026', 'archiveWeek': '3'},
                'presets': [{'name': 'Old module filter',
                             'scope': {'era': '2026', 'archiveWeek': '3'}}]}
        page.add_init_script('window.TQ_PORTABLE=true;localStorage.setItem("tq.settings.v1",' +
                             json.dumps(json.dumps(seed)) + ');')
        page.goto(url)
        page.wait_for_function('typeof TQDiagnostics === "function"')
        count = page.evaluate('TQDiagnostics().scopeCount')
        assert page.locator('[data-filter=archiveWeek]').count() == 0
        assert page.locator('[data-filter=week]').count() == 1
        page.locator('.nav-btn[data-view=library]').tap()
        page.locator('[data-action=reset-filters]').tap()
        assert page.evaluate('TQDiagnostics().scopeCount') == count
        page.locator('[data-preset]').select_option('0')
        assert page.evaluate('TQDiagnostics().scopeCount') == count

        # Observe real localization work: a tiny change on a large page must
        # not revisit the app shell or unrelated theorem content.
        page.locator('.nav-btn[data-view=hints]').tap()
        page.evaluate('''() => {
            const original=TQI18n;
            window.localizationRoots=[];
            window.TQI18n={...original,localize(root,language){
                localizationRoots.push(root.nodeType===3?'text':root.id||root.tagName);
                return original.localize(root,language);
            }};
            document.querySelector('#toast').textContent='练习设置';
        }''')
        expected = 'Practice settings' if language == 'en' else '练习设置'
        page.wait_for_function('text=>document.querySelector("#toast").textContent===text', arg=expected)
        roots = page.evaluate('localizationRoots')
        assert roots and not any(root in ['BODY', 'app', 'main'] for root in roots), roots
        page.evaluate('''() => {
            const box=document.createElement('div');box.id='dynamic-ui';
            box.innerHTML='<button title="练习设置">练习设置</button>'+
                '<span class="math">练习设置</span><input type="text" placeholder="练习设置">';
            document.body.append(box);
        }''')
        page.wait_for_function('text=>document.querySelector("#dynamic-ui button").title===text', arg=expected)
        assert page.locator('#dynamic-ui button').inner_text() == expected
        assert page.locator('#dynamic-ui .math').inner_text() == '练习设置'
        assert page.locator('#dynamic-ui input').get_attribute('inputmode') == 'none'
        assert page.locator('#dynamic-ui input').evaluate('(el)=>el.readOnly')
        if language == 'en':
            page.locator('.nav-btn[data-view=settings]').tap()
            page.locator('[data-setting=language]').select_option('zh-CN')
            page.wait_for_function('document.querySelector("#dynamic-ui button").title==="练习设置"')
            assert page.locator('#dynamic-ui button').inner_text() == '练习设置'
        page.evaluate('document.querySelector("#dynamic-ui").remove()')

        # Use the normal launch path with a known multi-slot symbol question.
        record = page.evaluate('''() => THEOREM_DATA.theorems.find(r=>
            TQEngine.isQuestionCard(r)&&TQEngine.clozeTemplate(r.formula,()=>0,3)?.blanks.length>=3)''')
        page.evaluate('''({language,id})=>{
            localStorage.setItem('tq.settings.v1',JSON.stringify({language,modes:['cloze'],
                choiceDifficulty:3,count:1,retry:false,scope:{era:'all',manual:true,selected:[id]}}));
        }''', {'language': language, 'id': record['id']})
        # Remove the initial-storage seed so this reload uses the new settings.
        # A fresh page in the same context has no page-level init script.
        cloze_page = page.context.new_page()
        cloze_page.on('pageerror', lambda error: errors.append(str(error)))
        cloze_page.add_init_script('window.TQ_PORTABLE=true;')
        cloze_page.goto(url)
        cloze_page.locator('[data-action=start]').first.tap()
        cloze_page.evaluate('''() => {
            window.stableShell=document.querySelector('.quiz-shell');
            window.stableInput=document.querySelector('#cloze-answer');
            window.stableKeyboard=document.querySelector('#keyboard');
        }''')
        template = cloze_page.evaluate('JSON.parse(localStorage.getItem("tq.session.v1")).state.cloze')
        for slot, blank in enumerate(template['blanks']):
            cloze_page.locator(f'[data-action=cloze-slot][data-slot="{slot}"]').tap()
            assert cloze_page.locator('[data-action=cloze-prev]').is_disabled() == (slot == 0)
            assert cloze_page.locator('[data-action=cloze-next]').is_disabled() == (slot == len(template['blanks']) - 1)
            cloze_page.locator('[data-action=cloze-key][data-token=' +
                               json.dumps(blank['correct'], ensure_ascii=False) + ']').tap()
        assert cloze_page.evaluate('''() => stableShell===document.querySelector('.quiz-shell')&&
            stableInput===document.querySelector('#cloze-answer')&&
            stableKeyboard===document.querySelector('#keyboard')''')
        cloze_page.locator('[data-action=cloze-delete]').tap()
        assert cloze_page.locator('#check-answer').is_disabled()
        last = template['blanks'][-1]['correct']
        cloze_page.locator('[data-action=cloze-key][data-token=' + json.dumps(last, ensure_ascii=False) + ']').tap()
        cloze_page.locator('#check-answer').tap()
        assert cloze_page.locator('#quiz-bottom.correct').is_visible()
        cloze_page.locator('[data-action=continue]').tap()
        cloze_page.wait_for_function('TQDiagnostics().view==="result"')
        cloze_page.close()
        context.close()
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
            run(browser, f'http://127.0.0.1:{server.server_port}')
            browser.close()
        print(f'PASS: {args.browser} materials Week migration, scoped localization, stable cloze controls and grading')
    finally:
        server.shutdown()


if __name__ == '__main__':
    main()
