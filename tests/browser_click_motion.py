"""Click feedback and bottom dock regressions in Chromium or WebKit.

Run: python3 tests/browser_click_motion.py --browser chromium|webkit
"""
import argparse
import json
import threading
from functools import partial

from playwright.sync_api import sync_playwright
from browser_qwerty import Quiet, ROOT, Server


def run(browser, url):
    errors = []
    for language in ['zh-CN', 'en']:
        for width in [320, 390, 620, 1440]:
            page = browser.new_page(viewport={'width': width, 'height': 844}, has_touch=width < 621)
            page.on('pageerror', lambda error: errors.append(str(error)))
            page.add_init_script('window.TQ_PORTABLE=true;localStorage.setItem("tq.settings.v1",' +
                                 json.dumps(json.dumps({'language': language, 'modes': ['choice'], 'count': 1})) + ');')
            page.goto(url)
            page.wait_for_function('typeof TQDiagnostics === "function"')
            if width < 621:
                page.wait_for_function('parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--bottom-nav-height"))>0')
                for large in [False, True]:
                    page.evaluate('''large=>{
                        document.documentElement.style.fontSize=large?'200%':'';
                        document.documentElement.classList.toggle('native-large-text',large);
                    }''', large)
                    page.wait_for_timeout(100)
                    metrics = page.locator('.nav').evaluate('''nav=>{
                        const buttons=[...nav.querySelectorAll('.nav-btn')];
                        const rects=buttons.map(el=>el.getBoundingClientRect());
                        const sidebar=nav.closest('.sidebar');
                        return {tracks:getComputedStyle(nav).gridTemplateColumns.split(' ').length,
                            count:buttons.length,widths:buttons.map(el=>el.offsetWidth),
                            end:rects.at(-1).right,start:rects[0].left,navWidth:nav.clientWidth,
                            reserved:parseFloat(getComputedStyle(document.querySelector('.app-shell')).paddingBottom),
                            height:sidebar.offsetHeight,documentWidth:document.documentElement.scrollWidth,
                            labelOverflow:buttons.some(el=>{
                                const label=el.querySelector('.nav-label');
                                return label.scrollWidth>label.clientWidth+1;
                            })};
                    }''')
                    assert metrics['tracks'] == metrics['count'] == 6, metrics
                    assert max(metrics['widths']) - min(metrics['widths']) <= 1, metrics
                    assert metrics['reserved'] >= metrics['height'], metrics
                    assert metrics['documentWidth'] <= width + 1, metrics
                    assert not metrics['labelOverflow'], metrics
                    if not large:
                        assert abs(width - metrics['end'] - metrics['start']) <= 1, metrics
                page.evaluate("document.documentElement.style.fontSize='';document.documentElement.classList.remove('native-large-text')")

            if width == 390 and language == 'zh-CN':
                page.wait_for_timeout(250)
                page.screenshot(path=f'/private/tmp/tq-click-motion-{browser.browser_type.name}.png')
            # Record WAAPI targets rather than racing a 200ms animation.
            page.evaluate('''() => {
                window.feedbackTargets=[];
                const animate=Element.prototype.animate;
                Element.prototype.animate=function(frames,options){
                    if(frames.some(frame=>'scale' in frame))feedbackTargets.push(this);
                    return animate.call(this,frames,options);
                };
            }''')
            page.locator('.nav-btn[data-view=settings]').click()
            page.wait_for_function('feedbackTargets.some(el=>el.isConnected && el.matches(".nav-btn[data-view=settings]"))')
            page.locator('[data-setting-mode=formula]').click()
            page.wait_for_function('feedbackTargets.some(el=>el.isConnected && el.matches("label:has([data-setting-mode=formula])"))')
            page.locator('.nav-btn[data-view=library]').click()
            page.locator('[data-action=detail]').first.click()
            summary = page.locator('.modal summary').first
            summary.click()
            page.wait_for_function('feedbackTargets.some(el=>el.isConnected && el.matches("summary"))')
            page.locator('.modal [data-action=close-modal]').click()
            page.locator('.nav-btn[data-view=home]').click()
            # Restore a deterministic choice-only question via the normal settings path.
            page.evaluate('''() => {
                const settings=JSON.parse(localStorage.getItem('tq.settings.v1'));
                settings.modes=['choice'];settings.fullKeyboard=false;
                localStorage.setItem('tq.settings.v1',JSON.stringify(settings));
            }''')
            page.reload()
            page.locator('[data-action=start]').first.click()
            for action in ['skip', 'hint', 'check']:
                button = page.locator(f'.quiz-bottom [data-action={action}]')
                assert button.is_visible(), (language, width, action)
                bounds = button.bounding_box()
                assert bounds['x'] >= 0 and bounds['x'] + bounds['width'] <= width + 1, bounds
                assert bounds['y'] + bounds['height'] <= 845, bounds
            page.locator('[data-action=hint]').click()
            assert page.locator('[role=dialog]').is_visible()
            page.close()

    # The screen keyboard handles touch on pointerdown, with no native click.
    page = browser.new_page(viewport={'width': 390, 'height': 844}, has_touch=True)
    page.add_init_script('window.TQ_PORTABLE=true;')
    page.goto(url)
    page.locator('.nav-btn[data-view=library]').tap()
    page.locator('#library-query').tap()
    page.locator('[data-qwerty-key=a]').tap()
    assert page.locator('#library-query').input_value() == 'a'
    page.wait_for_function('document.querySelector("[data-qwerty-key=a]").getAnimations().length>0')
    page.wait_for_timeout(250)
    page.emulate_media(reduced_motion='reduce')
    page.locator('[data-qwerty-key=b]').tap()
    page.wait_for_function('document.querySelector("[data-qwerty-key=b]").getAnimations().length>0')
    assert page.evaluate('''() => document.getAnimations().every(animation => {
        const frames=animation.effect.getKeyframes();
        return !frames.some(frame=>frame.scale && frame.scale!=='1') &&
            new Set(frames.map(frame=>frame.transform||'none')).size<=1;
    })''')
    assert page.locator('#library-query').input_value() == 'ab'
    page.close()
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
        print(f'PASS: {args.browser} clicks after rerender, labels, summaries, QWERTY, six tabs, 200% text and all footer actions')
    finally:
        server.shutdown()


if __name__ == '__main__':
    main()
