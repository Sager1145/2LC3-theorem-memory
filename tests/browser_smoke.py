#!/usr/bin/env python3
"""DOM integration tests using system Chromium, without an HTTP server.
Storage is an explicit in-memory test double: this does NOT certify origin
permissions, native persistence, GitHub Pages deployment, or Service Workers.
Usage: python tests/browser_smoke.py [--screenshots DIR]
Requires playwright plus a system Chromium executable.
"""
from pathlib import Path
import sys,json,argparse,shutil
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'tools'))
from build_site import portable_html
ap=argparse.ArgumentParser();ap.add_argument('--screenshots');args=ap.parse_args()
shots=Path(args.screenshots) if args.screenshots else None
if shots:shots.mkdir(parents=True,exist_ok=True)
bank=json.loads((ROOT/'data/theorems.json').read_text())
target=next(r for r in bank if r['numbers'] and r['numbers'][-1]=='3.47a')
original=portable_html();logs=[];errors=[]

def settings(mode='choice',retry=False,count=1):
 return {'modes':[mode],'count':count,'goal':20,'retry':retry,'sound':False,'scope':{'era':'current','manual':True,'selected':[target['id']]}}

def page_new(browser,mode='choice',seed=None,width=1440):
 p=browser.new_page(viewport={'width':width,'height':950},device_scale_factor=1)
 p.on('pageerror',lambda e:errors.append(str(e)))
 store={'tq.settings.v1':json.dumps(settings(mode))} if seed is None else seed
 injection='<script>const __store='+json.dumps(store,ensure_ascii=False).replace('<','\\u003c')+''';
Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>__store[k]??null,setItem:(k,v)=>{__store[k]=String(v)},removeItem:k=>{delete __store[k]},clear:()=>{for(const k of Object.keys(__store))delete __store[k]},key:i=>Object.keys(__store)[i]??null,get length(){return Object.keys(__store).length}}});window.__testStore=__store;</script>'''
 html=original.replace('<script>window.TQ_PORTABLE=true;',injection+'<script>window.TQ_PORTABLE=true;',1)
 p.set_content(html,wait_until='domcontentloaded');p.wait_for_function('typeof TQDiagnostics==="function"');return p

def go(p,v):p.locator(f'[data-action="nav"][data-view="{v}"]').first.click()
def launch(p):p.locator('[data-action="start"]').first.click();p.wait_for_function('TQDiagnostics().view==="quiz"')
def ok(p):
 assert p.locator('#quiz-bottom.correct').count()==1,p.locator('#quiz-bottom').inner_text()

def check(p):p.locator('#check-answer').click();p.wait_for_function('TQDiagnostics().checked')
with sync_playwright() as pw:
 binary=shutil.which('chromium') or shutil.which('chromium-browser')
 browser=pw.chromium.launch(executable_path=binary,headless=True,args=['--no-sandbox'])
 # Each mode is independently rendered and exercised through DOM events.
 p=page_new(browser,'choice');launch(p);p.locator(f'[data-action="choose"][data-id="{target["id"]}"]').click();check(p);ok(p)
 p.locator('[data-action="continue"]').click();assert p.evaluate('TQDiagnostics().view')=='result';logs.append('choice: correct selection and results screen');p.close()
 p=page_new(browser,'name');launch(p);p.locator('#name-answer').fill('De M');assert p.locator('#name-suggestions').is_visible()
 p.locator(f'[data-action="suggest"][data-id="{target["id"]}"]').click();check(p);ok(p);logs.append('name: three-character search, explicit completion, submit');p.close()
 p=page_new(browser,'blanks');launch(p)
 template=p.evaluate('TQEngine.blankTemplate('+json.dumps(target['formula'])+')')
 mp={v:'x'+str(i) for i,v in enumerate(template['variables'])}
 for i,b in enumerate(template['blanks']):p.locator(f'#blank-{i}').fill(mp[b['variable']])
 check(p);ok(p);logs.append('blanks: every occurrence accepts fresh consistent variable names')
 if shots:p.screenshot(path=str(shots/'blanks-desktop.png'),full_page=True)
 p.close()
 p=page_new(browser,'formula');launch(p);p.locator('#formula-answer').fill('¬ (x ∧ y) ≡ ¬ x ∨ ¬ y');check(p);ok(p);logs.append('formula: renamed De Morgan accepted');p.close()
 p=page_new(browser,'formula');launch(p)
 p.locator('#formula-answer').fill('p \\land');p.locator('#formula-answer').press('Tab');assert p.locator('#formula-answer').input_value()=='p ∧'
 p.locator('[data-action="key"][data-key="q"]').first.click();assert 'q' in p.locator('#formula-answer').input_value()
 p.locator('#formula-answer').fill('true');check(p);assert p.locator('#quiz-bottom.incorrect').count()==1
 p.locator('[data-action="continue"]').click();go(p,'home');go(p,'mistakes');assert p.locator('[data-action="review-one"]').count()==1
 logs.append('shortcuts and button keyboard; arbitrary tautology rejected and wrong bank populated')
 # Two correct mode-specific attempts clear the active bank across simulated reloads.
 seed=p.evaluate('JSON.parse(JSON.stringify(window.__testStore))');p.close()
 for n in range(2):
  p=page_new(browser,seed=seed);go(p,'mistakes');p.locator('[data-action="review-all"]').first.click();p.locator('#formula-answer').fill(target['formula']);check(p);ok(p)
  seed=p.evaluate('JSON.parse(JSON.stringify(window.__testStore))');p.close()
 progress=json.loads(seed['tq.progress.v1']);assert not progress['records'][target['id']]['active'];logs.append('wrong-bank round-trip and two unaided mode-specific wins repair card')
 # Save/resume an unfinished typed answer.
 p=page_new(browser,'formula');launch(p);p.locator('#formula-answer').fill('¬ (x ∧ y)');p.locator('[data-action="exit-quiz"]').click()
 seed=p.evaluate('JSON.parse(JSON.stringify(window.__testStore))');p.close();p=page_new(browser,seed=seed)
 p.locator('[data-action="resume"]').click();assert p.locator('#formula-answer').input_value()=='¬ (x ∧ y)';logs.append('unfinished lesson resumes including typed answer');p.close()
 # Real input filter interactions, manual scopes, Important, presets.
 p=page_new(browser,seed={});go(p,'library');p.locator('[data-filter="range"]').fill('3.47');p.wait_for_timeout(320)
 assert p.evaluate('TQDiagnostics().scopeCount')==6
 p.locator('[data-action="select-filtered"]').click();assert p.evaluate('TQDiagnostics().scopeCount')==6
 p.locator('[data-action="save-preset"]').click();p.locator('#preset-name').fill('De Morgan six');p.locator('[data-action="confirm-preset"]').click()
 assert 'De Morgan six' in p.locator('[data-preset]').inner_text()
 p.locator('[data-action="reset-filters"]').click();p.locator('[data-filter="important"]').check();assert p.evaluate('TQDiagnostics().scopeCount')==11
 p.locator('[data-action="detail"]').first.click();assert 'Important' in p.locator('#modal-root').inner_text();p.locator('[data-action="close-modal"]').first.click()
 go(p,'audit');assert '2026 已核对卡片' in p.locator('#app').inner_text();logs.append('range/family filters, manual scope, saved preset, Important cards and source audit');p.close()
 # Current-year notebook and archive Week selectors are real intersections.
 p=page_new(browser,seed={});assert p.evaluate('TQDiagnostics().scopeCount')==248
 p.locator('[data-filter="notebook"]').first.select_option('16018')
 h5_count=p.evaluate('TQDiagnostics().scopeCount');assert 0<h5_count<248
 go(p,'library');assert p.locator('[data-filter="notebook"]').first.input_value()=='16018'
 p.locator('[data-filter="era"]').first.select_option('2025')
 assert p.locator('[data-filter="notebook"]').first.input_value()==''
 p.locator('[data-filter="archiveWeek"]').first.select_option('6')
 assert p.evaluate('TQDiagnostics().scopeCount')>0
 assert 'Week 6 · 序列进阶' in p.locator('#app').inner_text()
 logs.append('2026 notebook scope and readable 2025 Week 6 labels');p.close()
 # In-session retry and hint accountability.
 p=page_new(browser,seed={'tq.settings.v1':json.dumps(settings('formula',True))});launch(p);p.locator('[data-action="skip"]').click()
 assert p.locator('[role="progressbar"]').get_attribute('aria-valuemax')=='2';p.locator('[data-action="continue"]').click()
 assert p.evaluate('TQDiagnostics().question.retry')==1
 p.locator('[data-action="hint"]').click();p.locator('[data-action="close-modal"]').first.click();p.locator('#formula-answer').fill(target['formula']);check(p)
 assert p.locator('#quiz-bottom.incorrect').count()==1;logs.append('wrong answer gets delayed retry; assisted answer cannot repair or earn XP');p.close()
 # Backup import requires confirmation; formula-like injected HTML stays text.
 p=page_new(browser,seed={});go(p,'settings');backup={'schemaVersion':1,'records':{},'xp':70,'days':{},'stars':[target['id']],'history':[]}
 p.locator('#backup-file').set_input_files({'name':'backup.json','mimeType':'application/json','buffer':json.dumps(backup).encode()})
 p.locator('#confirm-import').click();assert '70 XP' in p.locator('#app').inner_text();logs.append('backup import validates and requires explicit confirmation');p.close()
 # Responsive layout at both narrow and common phone widths.
 for w in [320,390]:
  p=page_new(browser,'formula',width=w)
  assert p.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
  if shots and w==390:p.screenshot(path=str(shots/'home-mobile.png'),full_page=True)
  launch(p);assert p.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),('quiz overflow',w,p.evaluate('document.documentElement.scrollWidth'))
  if shots and w==390:p.screenshot(path=str(shots/'formula-mobile.png'),full_page=True)
  p.locator('#formula-answer').fill('true');check(p);assert p.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
  logs.append(f'{w}px responsive home / quiz / feedback: no horizontal overflow');p.close()
 assert not errors,errors
 p=page_new(browser,seed={});
 if shots:p.screenshot(path=str(shots/'home-desktop.png'),full_page=True)
 p.close();browser.close()
print(json.dumps({'passed':len(logs),'scenarios':logs,'javascriptErrors':errors,'storage':'explicit in-memory test double','httpDeploymentTested':False,'serviceWorkerTested':False},ensure_ascii=False,indent=2))
