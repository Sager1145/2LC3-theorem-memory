"""Verify proof-only input, provenance scope, resume, feedback and mistake review."""
import json
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
proofs = json.loads((ROOT / 'data/proof-questions.json').read_text())
target = proofs[0]

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

class BrowserHTTPServer(ThreadingHTTPServer):
    # The page loads several assets concurrently; avoid resetting connections
    # when Chromium fills the default five-connection listen backlog.
    request_queue_size = 128

server = BrowserHTTPServer(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
threading.Thread(target=server.serve_forever, daemon=True).start()
url = f'http://127.0.0.1:{server.server_port}'
errors = []
with sync_playwright() as pw:
    browser = pw.chromium.launch(headless=True)
    longest=max(proofs,key=lambda r:len(r['proof']['start'])+len(r['proof']['hintTemplate'])+len(r['proof']['end']))
    for width,target in [(390,proofs[0]),(1200,proofs[0]),(390,longest)]:
        page = browser.new_page(viewport={'width': width, 'height': 900})
        page.on('pageerror', lambda error: errors.append(str(error)))
        settings = {'modes': ['proof'], 'count': 1, 'retry': False,
                    'scope': {'era': '2026', 'manual': True, 'selected': [target['id']]}}
        page.add_init_script('window.TQ_PORTABLE=true;')
        page.goto(url)
        page.evaluate('(s)=>localStorage.setItem("tq.settings.v1",JSON.stringify(s))', settings)
        page.reload()
        page.locator('[data-action="start"]').first.click()
        assert page.locator('#proof-start').inner_text() == target['proof']['start']
        assert page.locator('#proof-end').inner_text() == target['proof']['end']
        assert page.locator('#formula-answer, #name-answer, .choices').count() == 0
        assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
        if target is longest:
            page.screenshot(path='/private/tmp/theorem-proof-mobile.png',full_page=True)
        page.locator('#proof-answer').fill('not a theorem')
        page.reload()
        page.locator('[data-action="resume"]').click()
        assert page.locator('#proof-answer').input_value() == 'not a theorem'
        page.locator('#check-answer').click()
        assert page.locator('#quiz-bottom.incorrect').count() == 1
        assert target['proof']['answers'][0] in page.locator('#correct-answer').inner_text()
        page.locator('[data-action="exit-quiz"]').click()
        page.locator('[data-action="nav"][data-view="mistakes"]').first.click()
        page.locator('[data-action="review-all"]').click()
        page.locator('#proof-answer').fill(target['proof']['answers'][0])
        page.locator('#check-answer').click()
        assert page.locator('#quiz-bottom.correct').count() == 1
        page.close()
    browser.close()
server.shutdown()
assert not errors, errors
print('Proof UI: mobile/desktop layout, text-only answers, resume, grading and review passed.')
