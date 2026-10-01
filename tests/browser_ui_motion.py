#!/usr/bin/env python3
"""UI focus/race and motion regressions. Run: python tests/browser_ui_motion.py.

Requires Python Playwright and its Chromium browser. Uses a local HTTP server,
explicit browser settings, and the portable app mode to avoid bank/SW traffic.
"""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import threading

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
BANK = json.loads((ROOT / 'data/theorems.json').read_text())
TARGET = next(r for r in BANK if r['formula'] == 'p ∧ q ≡ q ∧ p')


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


class Server(ThreadingHTTPServer):
    request_queue_size = 128


server = Server(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT)))
threading.Thread(target=server.serve_forever, daemon=True).start()
URL = f'http://127.0.0.1:{server.server_port}/'
errors = []


def seed(mode='choice', count=1, selected=None):
    scope = {'era': 'all', 'manual': True, 'selected': selected or [TARGET['id']]}
    return {'modes': [mode], 'count': count, 'retry': False, 'sound': False, 'fullKeyboard': True,
            'scope': scope, 'presets': [{'name': 'Saved empty query', 'scope': scope}]}


def page_new(browser, width, reduced=False, mode='choice'):
    page = browser.new_page(viewport={'width': width, 'height': 950},
                            has_touch=width < 620,
                            reduced_motion='reduce' if reduced else 'no-preference')
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.add_init_script('window.TQ_PORTABLE=true;if(!localStorage.getItem("tq.settings.v1"))'
                         'localStorage.setItem("tq.settings.v1",'
                         + json.dumps(json.dumps(seed(mode))) + ');')
    page.goto(URL)
    page.wait_for_function('typeof TQDiagnostics === "function"')
    return page


def go(page, view):
    page.locator(f'.nav-btn[data-view="{view}"]').click()


def launch(page):
    page.locator('[data-action="start"]').first.click()
    page.wait_for_function('TQDiagnostics().view === "quiz"')


def no_overflow(page):
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1')


def assert_modal_focus(page):
    page.wait_for_function('''() => {
      const dialog=document.querySelector('[role=dialog]');
      return dialog && dialog.contains(document.activeElement);
    }''')


def focus_and_races(page):
    go(page, 'settings')
    checkbox = page.locator('[data-setting-mode="formula"]')
    checkbox.focus()
    checkbox.press('Space')
    assert checkbox.evaluate('(el)=>document.activeElement===el')
    checkbox.press('Tab')
    assert not checkbox.evaluate('(el)=>document.activeElement===el')

    go(page, 'library')
    # Same-task dispatch makes the 220 ms debounce/reset race deterministic.
    page.evaluate('''() => {
      const input=document.querySelector('#library-query');
      input.value='Golden'; input.dispatchEvent(new Event('input',{bubbles:true}));
      document.querySelector('[data-action=reset-filters]').click();
    }''')
    page.wait_for_timeout(300)
    assert page.locator('#library-query').input_value() == ''
    assert page.evaluate('JSON.parse(localStorage.getItem("tq.settings.v1")).scope.query') == ''
    page.evaluate('''() => {
      const input=document.querySelector('#library-query');
      input.value='Golden'; input.dispatchEvent(new Event('input',{bubbles:true}));
      const preset=document.querySelector('[data-preset]');
      preset.value='0'; preset.dispatchEvent(new Event('change',{bubbles:true}));
    }''')
    page.wait_for_timeout(300)
    assert page.locator('#library-query').input_value() == ''

    page.locator('[data-action="detail"]').first.click()
    assert_modal_focus(page)
    assert page.locator('#app').evaluate('(el)=>el.inert')
    # Exercise native summaries and the modal boundary in both directions.
    summary = page.locator('[role="dialog"] summary').first
    if summary.count():
        summary.focus()
        summary.press('Enter')
    for key in ['Tab', 'Shift+Tab']:
        for _ in range(25):
            page.keyboard.press(key)
            assert_modal_focus(page)
    page.keyboard.press('Escape')
    assert page.locator('[role="dialog"][aria-modal="true"]').count() == 0
    assert not page.locator('#app').evaluate('(el)=>el.inert')
    # Reopening while the previous visual exit runs must retain the new dialog.
    page.evaluate('''() => {
      document.querySelector('[data-action=detail]').click();
      document.querySelector('[data-action=close-modal]').click();
      document.querySelector('[data-action=configure]').click();
    }''')
    page.wait_for_timeout(350)
    assert page.locator('[role="dialog"][aria-modal="true"]').count() == 1
    assert_modal_focus(page)
    page.keyboard.press('Escape')
    go(page, 'home')
    page.wait_for_timeout(350)
    assert not page.locator('#app').evaluate('(el)=>el.inert')
    no_overflow(page)


def cloze_and_delayed_focus(browser, width, reduced):
    page = page_new(browser, width, reduced, 'cloze')
    # Hint opens before the quiz's delayed autofocus callback can execute.
    page.evaluate('''() => {
      document.querySelector('[data-action=start]').click();
      document.querySelector('[data-action=hint]').click();
    }''')
    page.wait_for_timeout(150)
    assert_modal_focus(page)
    page.keyboard.press('Escape')
    field = page.locator('#cloze-answer')
    slots = page.locator('[data-action="cloze-slot"]').count()
    page.locator('[data-action="cloze-slot"][data-slot="0"]').click()
    field.press('Shift+Tab')
    assert not field.evaluate('(el)=>document.activeElement===el')
    page.locator(f'[data-action="cloze-slot"][data-slot="{slots-1}"]').click()
    field.press('Tab')
    assert not field.evaluate('(el)=>document.activeElement===el')
    if slots > 1:
        page.locator('[data-action="cloze-slot"][data-slot="0"]').click()
        field.press('Tab')
        assert page.locator('.cloze-slot.active').get_attribute('data-slot') == '1'
        assert field.evaluate('(el)=>document.activeElement===el')
    if width < 620:
        page.locator(f'[data-action="cloze-slot"][data-slot="{slots-1}"]').tap()
        page.locator('[data-qwerty-key="TAB"]').tap()
        assert page.locator('.cloze-slot.active').get_attribute('data-slot') == '0'
        assert field.evaluate('(el)=>document.activeElement===el')
    no_overflow(page)
    page.close()


def toast_lifecycle(browser):
    page = page_new(browser, 390)
    go(page, 'library')
    page.locator('[data-action="reset-filters"]').click()
    assert page.locator('#toast').is_visible()
    page.wait_for_function('getComputedStyle(document.querySelector("#toast")).visibility === "hidden"', timeout=5000)
    assert not page.locator('#toast').is_visible()
    page.locator('[data-action="reset-filters"]').click()
    assert page.locator('#toast').is_visible()
    page.close()


def proof_completion(browser):
    page = page_new(browser, 390, mode='proof')
    proof = page.evaluate('PROOF_QUESTIONS[0]')
    # Use exactly one proof card to keep this autocomplete test deterministic.
    page.evaluate('''settings => {
      localStorage.setItem('tq.settings.v1',JSON.stringify(settings));
    }''', seed('proof', selected=[proof['id']]))
    page.goto(URL + '?proof-focus')
    page.wait_for_function('typeof TQDiagnostics === "function"')
    launch(page)
    field = page.locator('#proof-answer')
    answer = page.evaluate('''() => PROOF_QUESTIONS.find(r=>r.id===TQDiagnostics().question.id).proof.answers[0]''')
    field.focus()
    field.evaluate("(el,value)=>{el.value=value;el.dispatchEvent(new Event('input',{bubbles:true}));}", answer[:3])
    page.wait_for_function('document.querySelector("#proof-suggestions [role=option]") !== null')
    field.press('ArrowDown')
    active_id = field.get_attribute('aria-activedescendant')
    assert active_id
    assert page.locator('#' + active_id).get_attribute('aria-selected') == 'true'
    field.press('Enter')
    assert not field.get_attribute('aria-activedescendant')
    assert page.locator('#proof-suggestions').is_hidden()
    page.close()


def motion_and_result(browser, width, reduced):
    page = page_new(browser, width, reduced)
    button = page.locator('[data-action="start"]').first
    button.scroll_into_view_if_needed()
    size = button.evaluate('(el)=>[el.offsetWidth,el.offsetHeight]')
    bounds = button.bounding_box()
    page.mouse.move(bounds['x'] + bounds['width']/2, bounds['y'] + bounds['height']/2)
    page.mouse.down()
    assert button.evaluate('(el)=>[el.offsetWidth,el.offsetHeight]') == size
    page.mouse.up()
    page.wait_for_function('TQDiagnostics().view === "quiz"')
    page.locator(f'[data-action="choose"][data-id="{TARGET["id"]}"]').click()
    page.locator('#check-answer').click()
    assert page.locator('#quiz-bottom.correct').is_visible()
    no_overflow(page)
    page.locator('[data-action="continue"]').click()
    page.wait_for_function('TQDiagnostics().view === "result"')
    assert page.locator('.result-stat').count() == 3
    if reduced:
        assert page.evaluate('''() => document.getAnimations().every(animation => {
          const frames=animation.effect.getKeyframes();
          return new Set(frames.map(frame=>frame.transform || 'none')).size <= 1;
        })'''), 'Reduced motion still changes transforms'
    page.wait_for_timeout(450)
    for stat in page.locator('.result-stat').all():
        assert stat.is_visible()
        assert float(stat.evaluate('(el)=>getComputedStyle(el).opacity')) == 1
    no_overflow(page)
    page.close()


try:
    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        for reduced in [False, True]:
            for width in [320, 390, 1440]:
                page = page_new(browser, width, reduced)
                focus_and_races(page)
                page.close()
                cloze_and_delayed_focus(browser, width, reduced)
                motion_and_result(browser, width, reduced)
        proof_completion(browser)
        toast_lifecycle(browser)
        assert not errors, errors
        browser.close()
    print('PASS: focus, modal races, pending filters, cloze boundaries, proof ARIA, press geometry, results and reduced motion')
finally:
    server.shutdown()
