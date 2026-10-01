"""Check real launch settings, device mixing, and difficulty-dependent symbol cloze."""
from collections import Counter
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import threading

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]
MODES = ['name', 'choice', 'blanks', 'cloze', 'formula', 'symbol', 'proof']


class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


class Server(ThreadingHTTPServer):
    request_queue_size = 128


server = Server(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
threading.Thread(target=server.serve_forever, daemon=True).start()
errors = []


def session(page):
    return page.evaluate('JSON.parse(localStorage.getItem("tq.session.v1"))')


def open_page(browser, width=1280, touch=False, native=False):
    page = browser.new_page(viewport={'width': width, 'height': 900}, has_touch=touch)
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.on('console', lambda message: errors.append(message.text) if message.type == 'error' else None)
    page.add_init_script('window.TQ_PORTABLE=true;window.TQ_NATIVE=' + str(native).lower())
    page.goto(f'http://127.0.0.1:{server.server_port}')
    page.wait_for_function('typeof TQDiagnostics === "function"')
    return page


def seed(page, settings):
    page.evaluate('''settings => {
      localStorage.setItem('tq.settings.v1', JSON.stringify(settings));
      localStorage.removeItem('tq.session.v1');
    }''', settings)
    page.reload()
    page.wait_for_function('typeof TQDiagnostics === "function"')


def settings_view(page):
    page.locator('[data-action="nav"][data-view="settings"]').first.click()
    page.locator('[data-setting-mode="proof"]').wait_for()


def start(page):
    page.locator('[data-action="start"]').first.click()
    page.wait_for_function('TQDiagnostics().view === "quiz"')
    return session(page)


try:
    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        page = open_page(browser)
        assert page.evaluate('TQDiagnostics().modes') == MODES
        # Historical defaults upgrade, while deliberate subsets survive cleaning.
        for saved, expected in [
            ({'modes': ['name', 'choice', 'cloze']}, MODES),
            ({'modeDefaultsVersion': 2, 'modes': ['name', 'choice', 'blanks', 'formula', 'symbol']}, MODES),
            ({'modes': ['cloze']}, ['cloze']),
            ({'modes': ['formula', 'symbol']}, ['formula', 'symbol']),
            ({'modeDefaultsVersion': 3, 'modes': ['name', 'choice', 'cloze']}, ['name', 'choice', 'cloze']),
        ]:
            seed(page, saved)
            assert page.evaluate('TQDiagnostics().modes') == expected, saved
            settings_view(page)
            checked = page.locator('[data-setting-mode]:checked').evaluate_all('(els)=>els.map(el=>el.dataset.settingMode)')
            assert set(checked) == set(expected), (saved, checked)
        # Exercise checkbox change events and persistence, not just injected settings.
        seed(page, {'modes': MODES, 'modeDefaultsVersion': 3})
        settings_view(page)
        for mode in MODES:
            if mode != 'cloze':
                page.locator(f'[data-setting-mode="{mode}"]').uncheck()
        page.reload()
        assert page.evaluate('TQDiagnostics().modes') == ['cloze']
        page.close()

        mixes = []
        for label, width, touch, native, mobile in [
            ('desktop', 1280, False, False, False),
            ('narrow boundary', 600, False, False, True),
            ('wide coarse pointer', 1280, True, False, True),
            ('wide native', 1280, False, True, True),
        ]:
            page = open_page(browser, width, touch, native)
            seed(page, {'modes': MODES, 'modeDefaultsVersion': 3, 'count': 50,
                        'retry': False, 'scope': {'era': 'all'}})
            settings_view(page)
            assert page.locator('[data-setting-mode]:checked').count() == 7
            queue = start(page)['queue']
            assert len(queue) == 50, (label, len(queue))
            counts = Counter(q['mode'] for q in queue)
            assert set(counts) == set(MODES), (label, counts)
            assert max(Counter(q['id'] for q in queue).values()) <= 2
            if mobile:
                fills = ['blanks', 'cloze']
                full_inputs = ['name', 'formula', 'symbol', 'proof']
                assert counts['choice'] == 25, (label, counts)
                assert sum(counts[m] for m in fills) == 20, (label, counts)
                assert sum(counts[m] for m in full_inputs) == 5, (label, counts)
                for group in [fills, full_inputs]:
                    assert max(counts[m] for m in group) - min(counts[m] for m in group) <= 1, (label, counts)
                    rotation = [q['mode'] for q in queue if q['mode'] in group]
                    for offset in range(0, len(rotation) - len(group) + 1, len(group)):
                        assert set(rotation[offset:offset + len(group)]) == set(group), (label, rotation)
                # Weighted fair scheduling keeps every category near its share.
                for length in range(1, len(queue) + 1):
                    prefix = Counter(q['mode'] for q in queue[:length])
                    for group, share in [(['choice'], .5), (fills, .4), (full_inputs, .1)]:
                        assert abs(sum(prefix[m] for m in group) - length * share) <= 1, (label, length, prefix)
            else:
                assert max(counts.values()) - min(counts.values()) <= 1, counts
                for offset in range(0, 49, 7):
                    assert set(q['mode'] for q in queue[offset:offset + 7]) == set(MODES)
                assert all(a['mode'] != b['mode'] for a, b in zip(queue, queue[1:]))
            mixes.append(f'{label}: {dict(counts)}')
            page.close()

        for selected, expected_groups in [
            (['blanks', 'cloze', 'name', 'formula'], [(['blanks', 'cloze'], 40), (['name', 'formula'], 10)]),
            (['choice', 'name', 'formula'], [(['choice'], 50 * 5 / 6), (['name', 'formula'], 50 / 6)]),
            (['name', 'formula', 'symbol', 'proof'], [( ['name', 'formula', 'symbol', 'proof'], 50)]),
        ]:
            page = open_page(browser, width=390, touch=True)
            seed(page, {'modes': selected, 'modeDefaultsVersion': 3, 'count': 50,
                        'retry': False, 'scope': {'era': 'all'}})
            queue = start(page)['queue']
            assert len(queue) == 50
            counts = Counter(q['mode'] for q in queue)
            assert set(counts) == set(selected), (selected, counts)
            for group, expected_count in expected_groups:
                assert abs(sum(counts[m] for m in group) - expected_count) <= 1, (selected, counts)
                assert max(counts[m] for m in group) - min(counts[m] for m in group) <= 1, (selected, counts)
            page.close()

        for difficulty, expected in [(1, 1), (2, 3), (3, 5)]:
            page = open_page(browser, width=390, touch=True)
            record_id = page.evaluate('''() => THEOREM_DATA.theorems.find(
                r => r.formula === '¬ (p ∧ q) ≡ ¬ p ∨ ¬ q').id''')
            seed(page, {'modes': ['cloze'], 'modeDefaultsVersion': 3, 'count': 1,
                        'retry': False, 'scope': {'era': 'all', 'manual': True, 'selected': [record_id]}})
            settings_view(page)
            assert page.locator('label[for="choice-difficulty"] strong').inner_text() == '练习难度'
            page.locator('[data-setting="choiceDifficulty"]').select_option(str(difficulty))
            page.reload()
            assert page.evaluate('TQDiagnostics().choiceDifficulty') == difficulty
            saved = start(page)
            assert saved['choiceDifficulty'] == difficulty
            assert saved['queue'][0] == {'id': record_id, 'mode': 'cloze', 'retry': 0}
            template = saved['state']['cloze']
            assert len(template['blanks']) == expected, (difficulty, template)
            anchor = template['tokens'].index('≡')
            assert anchor not in [blank['index'] for blank in template['blanks']]
            assert page.locator('.cloze-formula > span').filter(has_text='≡').count() == 1
            assert page.locator('[data-action="cloze-slot"]').count() == expected
            # Refresh must use the exact randomly chosen blank positions and options.
            page.reload()
            page.locator('[data-action="resume"]').click()
            assert session(page)['state']['cloze'] == template
            for slot, blank in enumerate(template['blanks']):
                page.locator(f'[data-action="cloze-slot"][data-slot="{slot}"]').click()
                page.locator(f'[data-action="cloze-key"][data-token="{blank["correct"]}"]').click()
            page.reload()
            page.locator('[data-action="resume"]').click()
            assert session(page)['state']['cloze'] == template
            assert session(page)['state']['clozeValues'] == [blank['correct'] for blank in template['blanks']]
            page.locator('#check-answer').click()
            assert page.locator('#quiz-bottom.correct').is_visible()
            page.locator('[data-action="continue"]').click()
            assert page.evaluate('TQDiagnostics().view') == 'result'
            page.close()
        assert not errors, errors
        browser.close()
    print('PASS: default/migrated modes, explicit subsets and checkbox persistence; 50-question device mixes; cloze difficulty 1/3/5, visible connector, exact resume and correct DOM grading; zero browser errors')
    print('\n'.join(mixes))
finally:
    server.shutdown()
