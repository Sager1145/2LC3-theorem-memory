"""Keyboard press animation, single haptic ticks, and persisted haptic settings.

Run: python3 tests/browser_keyboard_feedback.py --browser chromium|webkit
"""
import argparse
import json
import threading
from functools import partial

from playwright.sync_api import sync_playwright
from browser_qwerty import Quiet, ROOT, Server


def exercise(browser, url, native):
    page = browser.new_page(viewport={'width': 390, 'height': 844}, has_touch=True)
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.add_init_script('''(() => {
        window.TQ_PORTABLE=true;window.TQ_NATIVE=__NATIVE__;
        window.hapticTicks=[];window.keyAnimations=[];
        window.webkit={messageHandlers:{quest:{postMessage(message){
            if(message.action==='keyboard-haptic')hapticTicks.push('native');
        }}}};
        Object.defineProperty(navigator,'vibrate',{configurable:true,
            value:duration=>{hapticTicks.push(duration);return true;}});
        const animate=Element.prototype.animate;
        Element.prototype.animate=function(frames,options){
            if(this.matches('.key-panel button,#screen-keyboard button,#screen-suggestions button'))
                keyAnimations.push({key:this.dataset.qwertyKey||this.dataset.key||this.dataset.action,
                    connected:this.isConnected,frames,duration:options.duration});
            return animate.call(this,frames,options);
        };
    })();'''.replace('__NATIVE__', str(native).lower()))
    page.goto(url)
    page.wait_for_function('typeof TQDiagnostics === "function"')

    def setting():
        page.locator('.nav-btn[data-view=settings]').tap()
        return page.locator('[data-setting=keyboardHaptics]')

    # Missing settings upgrade to the enabled default.
    assert setting().is_checked()
    page.locator('.nav-btn[data-view=library]').tap()
    page.locator('#library-query').tap()

    def key(value):
        return page.locator('[data-qwerty-key=' + json.dumps(value) + ']')

    def tap_feedback(button, enabled=True, reduced=False):
        ticks = page.evaluate('hapticTicks.length')
        animations = page.evaluate('keyAnimations.length')
        button.tap()
        page.wait_for_function('count=>keyAnimations.length>count', arg=animations)
        assert page.evaluate('hapticTicks.length') == ticks + int(enabled), 'One tick per press'
        animation = page.evaluate('keyAnimations.at(-1)')
        assert animation['connected'], animation
        assert animation['duration'] == (120 if reduced else 160), animation
        assert any('transform' in frame for frame in animation['frames']) != reduced, animation
        if reduced:
            assert all('scale' not in frame for frame in animation['frames'])

    # Every QWERTY character, number, punctuation, modifier, toolbar and editing key.
    keys = page.locator('#screen-keyboard button').evaluate_all('els=>els.map(el=>el.dataset.qwertyKey)')
    for value in keys:
        if page.locator('#screen-keyboard').is_hidden():
            page.locator('#library-query').tap()
        tap_feedback(key(value))
        if value == 'SHIFT':
            assert key('SHIFT').get_attribute('aria-pressed') == 'true'
            assert key('SHIFT').evaluate('el=>el.getAnimations().length>0'), 'Animate replacement Shift'
            tap_feedback(key('SHIFT'))
            if key('SHIFT').get_attribute('aria-pressed') == 'true':
                tap_feedback(key('SHIFT'))  # A rapid second tap now enables Caps Lock.
    assert set(page.evaluate('hapticTicks')) == ({'native'} if native else {8})

    # One-shot Shift replaces the pressed character with its base key. Feedback
    # must follow that replacement and still emit exactly one tick per press.
    page.locator('#library-query').tap()
    tap_feedback(key('SHIFT'))
    tap_feedback(key('A'))
    assert key('SHIFT').get_attribute('aria-pressed') == 'false'
    tap_feedback(key('SHIFT'))
    tap_feedback(key('!'))
    assert key('SHIFT').get_attribute('aria-pressed') == 'false'

    page.locator('#library-query').tap()
    page.locator('#library-query').evaluate("el=>{el.value='';el.setSelectionRange(0,0)}")
    tap_feedback(key('a'))
    assert page.locator('#library-query').input_value() == 'a', 'Tap must not enter twice'
    tap_feedback(key('BACKSPACE'))
    assert page.locator('#library-query').input_value() == ''
    # Accessibility activation has no preceding pointerdown.
    ticks = page.evaluate('hapticTicks.length')
    key('b').evaluate('el=>el.click()')
    assert page.locator('#library-query').input_value() == 'b'
    assert page.evaluate('hapticTicks.length') == ticks + 1

    key('DONE').tap()
    setting().uncheck()
    assert page.evaluate('JSON.parse(localStorage.getItem("tq.settings.v1")).keyboardHaptics') is False
    page.reload()
    page.wait_for_function('typeof TQDiagnostics === "function"')
    assert not setting().is_checked()
    page.locator('[data-setting=language]').select_option('en')
    assert page.locator('[data-setting=keyboardHaptics]').locator('..').inner_text().startswith('Keyboard haptics')
    page.locator('.nav-btn[data-view=library]').tap()
    page.locator('#library-query').tap()
    tap_feedback(key('a'), enabled=False)
    page.emulate_media(reduced_motion='reduce')
    tap_feedback(key('b'), enabled=False, reduced=True)
    page.emulate_media(reduced_motion='no-preference')
    key('DONE').tap()
    setting().check()

    # Letter and symbol panels, including disabled arrows and destructive controls.
    for mode in ['blanks', 'cloze']:
        record_id = page.evaluate('''mode=>THEOREM_DATA.theorems.find(r=>
            TQEngine.isQuestionCard(r)&&r.formula==='p ∧ q ≡ q ∧ p'&&
            TQEngine.eligibleModes(r,[mode],3).length).id''', mode)
        page.evaluate('''({mode,id})=>{
            localStorage.removeItem('tq.session.v1');
            const s=JSON.parse(localStorage.getItem('tq.settings.v1'));
            Object.assign(s,{modes:[mode],count:1,choiceDifficulty:3,
                scope:{era:'all',manual:true,selected:[id]}});
            localStorage.setItem('tq.settings.v1',JSON.stringify(s));
        }''', {'mode': mode, 'id': record_id})
        page.reload()
        page.locator('[data-action=start]').first.tap()
        answer = page.locator('#keyboard .key-row button:not(.key-control)').first
        tap_feedback(answer)
        controls = (['[data-key=CURSOR_LEFT]', '[data-key=CURSOR_RIGHT]', '[data-key=BACKSPACE]']
                    if mode == 'blanks' else ['[data-action=cloze-prev]', '[data-action=cloze-next]',
                                             '[data-action=cloze-delete]'])
        for selector in controls:
            button = page.locator('#keyboard ' + selector)
            if button.is_enabled():
                tap_feedback(button)
        disabled = page.locator('#keyboard button:disabled').first
        if disabled.count():
            ticks = page.evaluate('hapticTicks.length')
            disabled.evaluate('''el=>el.dispatchEvent(new PointerEvent('pointerdown',
                {bubbles:true,isPrimary:true,button:0}))''')
            assert page.evaluate('hapticTicks.length') == ticks
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
            for native in [False, True]:
                exercise(browser, f'http://127.0.0.1:{server.server_port}', native)
            browser.close()
        print(f'PASS: {args.browser} keyboard animation, haptics, persisted toggle, reduced motion and disabled keys')
    finally:
        server.shutdown()


if __name__ == '__main__':
    main()
