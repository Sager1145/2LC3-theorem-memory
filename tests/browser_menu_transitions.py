"""Every menu switch, interruption and motion preferences in Chromium/WebKit.

Run: python3 tests/browser_menu_transitions.py --browser chromium|webkit
"""
import argparse
import json
import threading
from functools import partial

from playwright.sync_api import sync_playwright
from browser_qwerty import Quiet, ROOT, Server


def run(browser, url, width, reduced):
    page = browser.new_page(viewport={'width': width, 'height': 950}, has_touch=width < 621,
                            reduced_motion='reduce' if reduced else 'no-preference')
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    seed = {'modes': ['formula'], 'count': 1, 'retry': False, 'scope': {'era': 'all'},
            'presets': [{'name': 'All years', 'scope': {'era': 'all'}}]}
    page.add_init_script('window.TQ_PORTABLE=true;localStorage.setItem("tq.settings.v1",' +
                         json.dumps(json.dumps(seed)) + ');')
    page.goto(url)
    page.wait_for_function('typeof TQDiagnostics === "function"')
    page.evaluate('''() => {
        window.menuTransitions=[];
        document.addEventListener('transitionrun',ev=>{
            if(ev.target.matches('.menu-transition'))menuTransitions.push({
                id:ev.target.id,property:ev.propertyName,
                list:ev.target.matches('.theorem-list')});
        },true);
    }''')

    def settled():
        page.wait_for_function('document.getAnimations().every(a=>a.playState!=="running")')

    def change(action, panel='#menu-content'):
        settled()
        page.evaluate('menuTransitions=[]')
        action()
        page.wait_for_function('''selector => {
            const el=document.querySelector(selector);
            return el && el.matches('.menu-transition') && menuTransitions.some(e=>
                e.property==='opacity' && (selector==='.theorem-list'?e.list:e.id===el.id));
        }''', arg=panel)
        if reduced:
            assert not page.evaluate('menuTransitions.some(e=>e.property==="transform")')
        else:
            assert page.evaluate('menuTransitions.some(e=>e.property==="transform")')
        assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')

    def nav(view):
        change(lambda: page.locator(f'.nav-btn[data-view={view}]').click())
        assert page.evaluate('TQDiagnostics().view') == view

    for view in ['library', 'focus', 'hints', 'mistakes', 'settings', 'home']:
        nav(view)
    nav('settings')
    change(lambda: page.locator('[data-action=nav][data-view=audit]').click())
    change(lambda: page.locator('.btn[data-action=nav][data-view=settings]').click())
    change(lambda: page.locator('[data-setting=appearance]').select_option('dark'))
    change(lambda: page.locator('[data-setting=language]').select_option('en'))
    nav('mistakes')
    for tab in ['resolved', 'all', 'active']:
        change(lambda: page.locator(f'[data-action=wrong-tab][data-tab={tab}]').click(), '.theorem-list')
    nav('hints')
    for mode in ['repeated', 'used']:
        change(lambda: page.locator(f'[data-action=hint-list][data-mode={mode}]').click(), '.theorem-list')
    nav('focus')
    for focus in ['important', 'repeated', 'priority']:
        change(lambda: page.locator(f'[data-action=focus-list][data-focus={focus}]').click(), '.theorem-list')
    nav('library')
    change(lambda: page.locator('[data-filter=documentFocus]').select_option('all'), '.theorem-list')
    change(lambda: page.locator('[data-preset]').select_option('0'), '.theorem-list')
    change(lambda: page.locator('[data-action=library-page][data-page="2"]').click(), '.theorem-list')
    change(lambda: page.locator('[data-filter=era]').select_option('2026'), '.theorem-list')

    # Successive switches must inherit the visible state, with no stale callback.
    settled()
    page.locator('.nav-btn[data-view=home]').click()
    continuity = page.evaluate('''() => {
        const before=getComputedStyle(document.querySelector('#menu-content'));
        const opacity=parseFloat(before.opacity);
        const transform=before.transform;
        document.querySelector('.nav-btn[data-view=settings]').click();
        const after=getComputedStyle(document.querySelector('#menu-content'));
        return {opacity,after:parseFloat(after.opacity),transform,afterTransform:after.transform};
    }''')
    assert continuity['after'] >= continuity['opacity'] - .025, continuity
    for view in ['library', 'hints', 'focus', 'mistakes', 'settings']:
        page.evaluate('v=>document.querySelector(`.nav-btn[data-view=${v}]`).click()', view)
    settled()
    assert page.evaluate('TQDiagnostics().view') == 'settings'
    assert page.locator('#menu-content').evaluate('(el)=>getComputedStyle(el).opacity') == '1'
    assert page.locator('.nav-btn.active').get_attribute('data-view') == 'settings'

    # Keyboard navigation and text searching retain their immediate behavior.
    page.evaluate('menuTransitions=[]')
    page.locator('.nav-btn[data-view=library]').focus()
    page.keyboard.press('Enter')
    page.wait_for_timeout(180)
    assert page.locator('.menu-transition').count() == 0
    assert not page.evaluate('menuTransitions')
    page.locator('#library-query').evaluate('''el=>{
        el.value='Golden';el.dispatchEvent(new Event('input',{bubbles:true}));
    }''')
    page.wait_for_timeout(300)
    assert page.locator('.menu-transition').count() == 0

    # Full screen changes share the same boundary, including saved questions,
    # results and retries. Fixed quiz chrome fades without moving its dock.
    nav('home')
    change(lambda: page.locator('[data-action=start]').first.click(), '#main')
    assert page.evaluate('TQDiagnostics().view') == 'quiz'
    assert page.locator('.quiz-main').evaluate('(el)=>el.getAnimations().every(a=>a.transitionProperty)')
    settled()
    dock = page.locator('#quiz-bottom').bounding_box()
    if dock:  # Formula autofocus uses the screen keyboard on phones.
        assert dock['y'] + dock['height'] <= 951, dock
    change(lambda: page.locator('[data-action=exit-quiz]').click())
    change(lambda: page.locator('[data-action=resume]').click(), '#main')
    page.evaluate('document.querySelector("[data-action=skip]").click()')
    change(lambda: page.locator('[data-action=continue]').click(), '#main')
    assert page.evaluate('TQDiagnostics().view') == 'result'
    change(lambda: page.locator('[data-action=result-retry]').click(), '#main')
    assert page.evaluate('TQDiagnostics().view') == 'quiz'
    page.evaluate('document.querySelector("[data-action=skip]").click()')
    change(lambda: page.locator('[data-action=continue]').click(), '#main')
    change(lambda: page.locator('[data-action=nav][data-view=home]').click())

    # Interrupt a menu entrance with quiz launch and exit in the same task.
    settled()
    page.evaluate('''() => {
        document.querySelector('.nav-btn[data-view=settings]').click();
        document.querySelector('[data-action=start]').click();
        document.querySelector('[data-action=exit-quiz]').click();
    }''')
    settled()
    assert page.evaluate('TQDiagnostics().view') == 'home'
    assert page.locator('#menu-content').evaluate('(el)=>getComputedStyle(el).opacity') == '1'
    assert not page.locator('#app').evaluate('(el)=>el.inert')

    # Desktop formula keyboard has its own tab boundary, leaving tab controls still.
    if width > 760:
        page.locator('[data-action=start]').first.click()
        change(lambda: page.locator('[data-action=key-tab][data-tab=all]').click(), '#keyboard-menu-content')
        assert page.locator('[data-action=key][data-key=CLEAR]').count() == 1
        change(lambda: page.locator('[data-action=key-tab][data-tab=context]').click(), '#keyboard-menu-content')
        assert page.locator('[data-action=key][data-key=CLEAR]').count() == 0
        assert not page.locator('.key-panel-head').evaluate('(el)=>el.getAnimations().length')
    assert not errors, errors
    page.close()


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
                for width in [390, 1440]:
                    run(browser, f'http://127.0.0.1:{server.server_port}', width, reduced)
                    print(f'PASS: {args.browser} menus, width={width}, reduced={reduced}')
            browser.close()
    finally:
        server.shutdown()


if __name__ == '__main__':
    main()
