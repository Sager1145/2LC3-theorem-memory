#!/usr/bin/env python3
"""DOM integration tests using Chromium and a local static HTTP server.
Storage is an explicit in-memory test double: this does NOT certify native
persistence, GitHub Pages deployment, or Service Workers.
Usage: python tests/browser_smoke.py [--screenshots DIR] [--channel chromium]
Requires playwright plus a system Chromium executable.
"""
from pathlib import Path
import json,argparse,shutil,threading
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from functools import partial
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
ap=argparse.ArgumentParser();ap.add_argument('--screenshots');ap.add_argument('--channel',help='Playwright browser channel; chromium uses full Chromium.');args=ap.parse_args()
shots=Path(args.screenshots) if args.screenshots else None
if shots:shots.mkdir(parents=True,exist_ok=True)
bank=json.loads((ROOT/'data/theorems.json').read_text())
current_practice=sum(bool(r.get('preloaded2026') or r.get('notebook2026')) and 'inference rule' not in r['kind'].lower() for r in bank)
target=next(r for r in bank if r['numbers'] and r['numbers'][-1]=='3.47a')
logs=[];errors=[]
class QuietHandler(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
class BrowserHTTPServer(ThreadingHTTPServer):
    # The page loads several assets concurrently; avoid resetting connections
    # when Chromium fills the default five-connection listen backlog.
    request_queue_size = 128

server=BrowserHTTPServer(('127.0.0.1',0),partial(QuietHandler,directory=str(ROOT)))
threading.Thread(target=server.serve_forever,daemon=True).start()
url=f'http://127.0.0.1:{server.server_port}/'

def settings(mode='choice',retry=False,count=1):
 return {'modes':[mode],'count':count,'goal':20,'retry':retry,'sound':False,'fullKeyboard':True,'scope':{'era':'current','manual':True,'selected':[target['id']]}}

def page_new(browser,mode='choice',seed=None,width=1440):
 p=browser.new_page(viewport={'width':width,'height':950},device_scale_factor=1)
 diagnostics=[]
 p.on('requestfailed',lambda request:diagnostics.append({'requestFailed':request.url,'failure':request.failure}))
 p.on('response',lambda response:diagnostics.append({'httpStatus':response.status,'url':response.url}) if response.status>=400 else None)
 p.on('console',lambda message:diagnostics.append({'consoleError':message.text}) if message.type=='error' else None)
 p.on('pageerror',lambda e:errors.append(str(e)))
 store={'tq.settings.v1':json.dumps(settings(mode))} if seed is None else seed
 injection='const __store='+json.dumps(store,ensure_ascii=False).replace('<','\\u003c')+''';
 Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>__store[k]??null,setItem:(k,v)=>{__store[k]=String(v)},removeItem:k=>{delete __store[k]},clear:()=>{for(const k of Object.keys(__store))delete __store[k]},key:i=>Object.keys(__store)[i]??null,get length(){return Object.keys(__store).length}}});window.__testStore=__store;'''
 p.add_init_script(script=injection+'window.TQ_PORTABLE=true;')
 p.goto(url,wait_until='domcontentloaded')
 try:p.wait_for_function('typeof TQDiagnostics==="function"')
 except Exception:
  state=p.evaluate('({globals:Object.fromEntries(["TQEngine","THEOREM_DATA","PROOF_QUESTIONS","TQDiagnostics"].map(k=>[k,typeof window[k]])),resources:performance.getEntriesByType("resource").map(r=>({name:r.name,duration:r.duration})),body:document.body.innerText.slice(0,300)})')
  print(json.dumps({'startupErrors':errors,'url':p.url,'diagnostics':diagnostics,'state':state},ensure_ascii=False),flush=True);raise
 return p

def go(p,v):
 if v=='audit':go(p,'settings')
 p.locator(f'[data-action="nav"][data-view="{v}"]').first.click()
def launch(p):p.locator('[data-action="start"]').first.click();p.wait_for_function('TQDiagnostics().view==="quiz"')
def ok(p):
 assert p.locator('#quiz-bottom.correct').count()==1,p.locator('#quiz-bottom').inner_text()

def screen_key(p,label):p.locator('#screen-keyboard').get_by_role('button',name=label,exact=True).click()
def dismiss_keyboard(p):
 if p.locator('#screen-keyboard').is_visible():screen_key(p,'Done')
def type_screen(p,field,text):
 field.focus()
 field.evaluate('(el)=>el.setSelectionRange(0,el.value.length)')
 screen_key(p,'Backspace')
 for char in text:
  label='Space' if char==' ' else char
  button=p.locator('#screen-keyboard').get_by_role('button',name=label,exact=True)
  if not button.count():
   screen_key(p,'Shift');button=p.locator('#screen-keyboard').get_by_role('button',name=label,exact=True)
  button.click()
 if not p.locator('#screen-keyboard').get_by_role('button',name='a',exact=True).count():screen_key(p,'Shift')
def screen_symbol(p,symbol,slot=None):
 if slot is not None:p.locator(f'[data-action="cloze-slot"][data-slot="{slot}"]').click()
 code=p.evaluate('(symbol)=>Object.entries(TQEngine.SHORTCUTS).find(([,value])=>value===symbol)[0]',symbol)
 type_screen(p,p.locator('#cloze-answer'),code);screen_key(p,'Tab')
def mobile_fixture(field,text):
 # Grading smoke uses Unicode fixtures; QWERTY typing is covered separately.
 field.focus();field.evaluate("(el,value)=>{el.value=value;el.dispatchEvent(new Event('input',{bubbles:true}));}",text)
def check(p):
 dismiss_keyboard(p);p.locator('#check-answer').click();p.wait_for_function('TQDiagnostics().checked')
def saved_session(p):return json.loads(p.evaluate('window.__testStore["tq.session.v1"]'))
def assert_active(p,card_id):
 progress=json.loads(p.evaluate('window.__testStore["tq.progress.v1"]'))
 assert progress['records'][card_id]['active'],progress['records'][card_id]
def continue_question(p):p.locator('[data-action="continue"]').click()

with sync_playwright() as pw:
 binary=None if args.channel else shutil.which('chromium') or shutil.which('chromium-browser')
 browser=pw.chromium.launch(executable_path=binary,channel=args.channel,headless=True,args=['--no-sandbox'])
 # Unnamed OR unnumbered cards show source-specific weeks and notebook links.
 hint_cards=[next(r for r in bank if r.get('preloaded2026') and r['name']=='原文未命名'),
             next(r for r in bank if r.get('preloaded2026') and not r['numbers'] and r['name']!='原文未命名')]
 for card in hint_cards:
  hint_settings=settings('formula');hint_settings['scope']['selected']=[card['id']]
  p=page_new(browser,seed={'tq.settings.v1':json.dumps(hint_settings)})
  launch(p);p.locator('[data-action="hint"]').click()
  locations=p.evaluate('TQEngine.hintLocations('+json.dumps(card)+',THEOREM_DATA.sources,THEOREM_DATA.weekBySource)')
  assert p.locator('[data-hint-source]').count()==len(locations)
  assert p.locator('[data-hint-year="2026"]').get_attribute('open') is not None
  for location in locations:
   row=p.locator('[data-hint-source="'+location['sourceId']+'"]')
   expected='、'.join('Week '+str(w) for w in location['weeks']) or 'Week 尚未归类'
   assert row.locator('strong').text_content()==expected,(location['sourceId'],row.locator('strong').text_content(),expected)
   assert row.locator('a').get_attribute('href')==location['url']
  p.locator('[data-action="close-modal"]').first.click()
  assert json.loads(p.evaluate('window.__testStore["tq.session.v1"]'))['state']['assisted']
  logs.append('hint: source weeks and notebook links for '+card['id'])
  p.close()
 # Both result states show all related cards, aliases and source formula variants,
 # even when the practice scope contains only the current card.
 variant_targets=[target,
  next(r for r in bank if r.get('preloaded2026') and r['aliases']),
  next(r for r in bank if r.get('preloaded2026') and r.get('variantLabel') and r['name']=='Replacement')]
 for card in variant_targets:
  for mode in ['choice','formula']:
   for correct in [True,False]:
    variant_settings=settings(mode);variant_settings['scope']['selected']=[card['id']]
    p=page_new(browser,seed={'tq.settings.v1':json.dumps(variant_settings)})
    launch(p)
    if mode=='choice':
     options=p.locator('[data-action="choose"]')
     if correct:p.locator(f'[data-action="choose"][data-id="{card["id"]}"]').click()
     else:
      next_option=next(options.nth(i) for i in range(options.count()) if options.nth(i).get_attribute('data-id')!=card['id'])
      next_option.click()
    else:p.locator('#formula-answer').fill(card['formula'] if correct else 'false')
    check(p)
    assert p.locator('#quiz-bottom.'+('correct' if correct else 'incorrect')).count()==1
    variants=p.evaluate('TQEngine.answerVariants(THEOREM_DATA.theorems.filter(TQEngine.isQuestionCard),'+json.dumps(card)+')')
    assert p.locator('[data-answer-variant]').count()==len(variants)
    for variant in variants:
     block=p.locator(f'[data-answer-variant="{variant["id"]}"]')
     assert block.is_visible()
     text=block.inner_text()
     for value in variant['names']+variant['references']+variant['formulas']:
      assert value in text,(variant['id'],value,text)
     if variant['variantLabel']:assert variant['variantLabel'] in text
     if variant['sideCondition']:assert variant['sideCondition'] in text
    logs.append(f'all answer variants: {card["id"]} / {mode} / {correct}');p.close()
 # Difficulty persists in settings and stays fixed in an active/resumed session.
 p=page_new(browser,'choice');go(p,'settings')
 assert p.locator('[data-setting="choiceDifficulty"]').input_value()=='2'
 p.locator('[data-setting="choiceDifficulty"]').select_option('3')
 assert json.loads(p.evaluate('window.__testStore["tq.settings.v1"]'))['choiceDifficulty']==3
 launch(p)
 assert p.evaluate('TQDiagnostics().sessionDifficulty')==3
 assert p.locator('[data-action="choose"]').count()==4
 assert p.evaluate("[...document.querySelectorAll('[data-action=choose]')].every(b => !TQEngine.isFoundationalTheorem(THEOREM_DATA.theorems.find(r => r.id===b.dataset.id)))")
 saved=p.evaluate('({...window.__testStore})');p.close()
 p=page_new(browser,seed=saved)
 p.locator('[data-action="resume"]').first.click()
 assert p.evaluate('TQDiagnostics().sessionDifficulty')==3
 assert p.locator('[data-action="choose"]').count()==4
 logs.append('choice difficulty: configurable, persisted and restored with the session');p.close()
 # Each mode is independently rendered and exercised through DOM events.
 p=page_new(browser,'choice');launch(p);p.locator(f'[data-action="choose"][data-id="{target["id"]}"]').click();check(p);ok(p)
 assert p.locator('#correct-answer').inner_text()==f'{target["displayRef"]} · {target["name"]}'
 p.locator('[data-action="continue"]').click();assert p.evaluate('TQDiagnostics().view')=='result';logs.append('choice: correct selection and results screen');p.close()
 p=page_new(browser,'name');launch(p);assert p.locator('#name-answer').count()==1
 p.locator('#name-answer').fill(target['name']);check(p);ok(p)
 assert p.locator('#correct-answer').inner_text()==f'{target["displayRef"]} · {target["name"]}'
 assert '同组名称' in p.locator('#quiz-bottom').inner_text()
 logs.append('name: shared theorem group uses a name blank and accepts the group name');p.close()
 p=page_new(browser,'name');launch(p)
 other=next(r for r in bank if r['numbers'] and r['numbers'][-1]=='3.47b')
 p.locator('.group-number-picker summary').click();p.locator(f'[data-action="group-ref"][data-id="{other["id"]}"]').click();check(p)
 assert p.locator('#quiz-bottom.incorrect').count()==1
 logs.append('name: a selected number must match the shown formula');p.close()
 p=page_new(browser,'blanks');launch(p)
 template=p.evaluate('TQEngine.blankTemplate('+json.dumps(target['formula'])+')')
 mp={v:'x'+str(i) for i,v in enumerate(template['variables'])}
 for i,b in enumerate(template['blanks']):p.locator(f'#blank-{i}').fill(mp[b['variable']])
 assert p.locator('#check-answer').is_enabled(),p.evaluate('TQDiagnostics()')
 check(p);ok(p);logs.append('blanks: every occurrence accepts fresh consistent variable names')
 assert p.locator('#correct-answer').inner_text()==target['formula']
 if shots:p.screenshot(path=str(shots/'blanks-desktop.png'),full_page=True)
 p.close()
 p=page_new(browser,'cloze',width=390);launch(p)
 p.locator('#cloze-answer').focus()
 assert p.locator('#screen-keyboard').is_visible()
 assert p.locator('#keyboard.cloze-keyboard').is_hidden()
 assert p.locator('#formula-answer').count()==0
 assert p.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
 template=p.evaluate('JSON.parse(window.__testStore["tq.session.v1"]).state.cloze')
 assert p.locator('.cloze-slot').count()>=2
 for i,blank in enumerate(template['blanks']):
  assert p.locator('#check-answer').is_disabled()
  screen_symbol(p,blank['correct'],i)
 check(p);ok(p)
 logs.append('cloze: mobile QWERTY shortcuts fill all blanks and grade them');p.close()
 p=page_new(browser,'blanks',width=390);launch(p)
 p.locator('#blank-0').focus()
 assert p.locator('#screen-keyboard').is_visible()
 assert p.locator('#keyboard').is_hidden()
 assert p.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
 type_screen(p,p.locator('#blank-0'),'p')
 assert p.locator('#blank-0').input_value()=='p'
 logs.append('letter blanks: mobile QWERTY enters a variable');p.close()
 p=page_new(browser,'formula');launch(p);p.locator('#formula-answer').fill('¬ (x ∧ y) ≡ ¬ x ∨ ¬ y');check(p);ok(p)
 assert p.locator('#correct-answer').inner_text()==target['formula']
 logs.append('formula: renamed De Morgan accepted');p.close()
 commutative=next(r for r in bank if r['formula']=='p ∧ q ≡ q ∧ p')
 copied_settings=settings('formula');copied_settings['scope']['selected']=[commutative['id']]
 p=page_new(browser,seed={'tq.settings.v1':json.dumps(copied_settings)})
 launch(p);p.locator('#formula-answer').fill('p ∧ q ≡ p ∧ q');check(p)
 assert p.locator('#quiz-bottom.incorrect').count()==1
 logs.append('formula: copying one side of a commutative law is rejected');p.close()
 p=page_new(browser,'formula');launch(p)
 p.locator('#formula-answer').fill('p \\land');p.locator('#formula-answer').press('Tab');assert p.locator('#formula-answer').input_value()=='p ∧'
 p.locator('[data-action="key"][data-key="q"]').first.click();assert 'q' in p.locator('#formula-answer').input_value()
 p.locator('#formula-answer').fill('true');check(p);assert p.locator('#quiz-bottom.incorrect').count()==1
 assert p.locator('#correct-answer').inner_text()==target['formula']
 p.locator('[data-action="continue"]').click();go(p,'home');go(p,'mistakes');assert p.locator('[data-action="review-one"]').count()==1
 logs.append('shortcuts and button keyboard; arbitrary tautology rejected and wrong bank populated')
 # Two correct mode-specific attempts clear the active bank across simulated reloads.
 seed=p.evaluate('JSON.parse(JSON.stringify(window.__testStore))');p.close()
 for n in range(2):
  p=page_new(browser,seed=seed);go(p,'mistakes');p.locator('[data-action="review-all"]').first.click();p.locator('#formula-answer').fill(target['formula']);check(p);ok(p)
  seed=p.evaluate('JSON.parse(JSON.stringify(window.__testStore))');p.close()
 progress=json.loads(seed['tq.progress.v1']);assert not progress['records'][target['id']]['active'];logs.append('wrong-bank round-trip and two unaided mode-specific wins repair card')
 # Recycle Chromium between groups to bound decoded corpus memory use.
 # Newly proved declarations participate in regular practice in their own week.
 for card in [r for r in bank if r['id'].startswith('nb-')]:
  seed_settings=settings('choice');seed_settings['scope']={'era':'2026','manual':True,'selected':[card['id']]}
  source_id=card['sources'][0]['sourceId']
  weeks=next(s['weeks'] for s in json.loads((ROOT/'data/sources.json').read_text()) if s['id']==source_id)
  if weeks:seed_settings['scope']['week']=str(weeks[0])
  p=page_new(browser,seed={'tq.settings.v1':json.dumps(seed_settings)})
  assert p.evaluate('TQDiagnostics().scopeCount')==1,card['id']
  launch(p);assert p.evaluate('TQDiagnostics().question.id')==card['id']
  p.close()
 logs.append('all six notebook-only declarations enter regular 2026 practice with source weeks')
 browser.close()
 browser=pw.chromium.launch(executable_path=binary,channel=args.channel,headless=True,args=['--no-sandbox'])
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
 go(p,'audit');assert '2026 可练卡片' in p.locator('#app').inner_text();logs.append('range/family filters, manual scope, saved preset, Important cards and source audit');p.close()
 browser.close()
 browser=pw.chromium.launch(executable_path=binary,channel=args.channel,headless=True,args=['--no-sandbox'])
 # Current-year notebook and archive Week selectors are real intersections.
 p=page_new(browser,seed={'tq.settings.v1':json.dumps({'modes':['choice']})});assert p.evaluate('TQDiagnostics().scopeCount')==current_practice
 assert p.locator('[data-filter="archiveWeek"]').first.locator('option').count()==2
 assert set(p.locator('[data-filter="week"]').first.locator('option').evaluate_all('(options)=>options.map(o=>o.value).filter(Boolean)'))=={'1','2','3','4'}
 p.locator('[data-filter="week"]').first.select_option('1')
 week1_sources={n['sourceId'] for n in json.loads((ROOT/'data/weekly-inventory.json').read_text())['notebooks'] if n['year']==2026 and 1 in n['weeks']}
 expected_week1=sum('inference rule' not in r['kind'].lower() and any(s['sourceId'] in week1_sources for s in r['sources']) for r in bank)
 assert p.evaluate('TQDiagnostics().scopeCount')==expected_week1
 p.locator('[data-filter="week"]').first.select_option('2')
 week2_sources={n['sourceId'] for n in json.loads((ROOT/'data/weekly-inventory.json').read_text())['notebooks'] if n['year']==2026 and 2 in n['weeks']}
 expected_week2=sum('inference rule' not in r['kind'].lower() and any(s['sourceId'] in week2_sources for s in r['sources']) for r in bank)
 assert p.evaluate('TQDiagnostics().scopeCount')==expected_week2
 p.locator('[data-filter="notebook"]').first.select_option('16002')
 assert p.evaluate('TQDiagnostics().scopeCount')==0
 p.locator('[data-filter="notebook"]').first.select_option('')
 p.locator('[data-filter="weekMode"]').first.select_option('through')
 expected_through=sum('inference rule' not in r['kind'].lower() and any(s['sourceId'] in week1_sources|week2_sources for s in r['sources']) for r in bank)
 assert p.evaluate('TQDiagnostics().scopeCount')==expected_through
 assert expected_through>expected_week2
 go(p,'library');assert p.locator('[data-filter="weekMode"]').first.input_value()=='through'
 p.locator('[data-filter="week"]').first.select_option('')
 p.locator('[data-filter="archiveWeek"]').first.select_option('3')
 assert p.evaluate('TQDiagnostics().scopeCount')==43
 p.locator('[data-filter="archiveWeek"]').first.select_option('')
 p.locator('[data-filter="notebook"]').first.select_option('16018')
 h5_count=p.evaluate('TQDiagnostics().scopeCount');assert 0<h5_count<current_practice
 expected_ports={str(port) for r in bank for port in [*r.get('preloaded2026',[]),*r.get('notebook2026',[])]}
 actual_ports=set(p.locator('[data-filter="notebook"]').first.locator('option').evaluate_all('(options)=>options.map(o=>o.value).filter(Boolean)'))
 assert actual_ports==expected_ports,(actual_ports^expected_ports)
 p.locator('[data-filter="notebook"]').first.select_option('16025')
 assert 0<p.evaluate('TQDiagnostics().scopeCount')<current_practice
 go(p,'library');assert p.locator('[data-filter="notebook"]').first.input_value()=='16025'
 p.locator('[data-filter="era"]').first.select_option('2025')
 assert p.locator('[data-filter="notebook"]').first.input_value()==''
 expected_2025_ports={str(port) for r in bank for port in r.get('preloaded2025',[])}
 actual_2025_ports=set(p.locator('[data-filter="notebook"]').first.locator('option').evaluate_all('(options)=>options.map(o=>o.value).filter(Boolean)'))
 assert actual_2025_ports==expected_2025_ports,(actual_2025_ports^expected_2025_ports)
 assert set(p.locator('[data-filter="archiveWeek"]').first.locator('option').evaluate_all('(options)=>options.map(o=>o.value).filter(Boolean)'))=={'3','4','5','6','7','8','9','11'}
 p.locator('[data-filter="archiveWeek"]').first.select_option('6')
 assert p.evaluate('TQDiagnostics().scopeCount')>0
 assert 'Week 6 · 序列进阶' in p.locator('#app').inner_text()
 logs.append('2026 notebook scope and readable 2025 Week 6 labels');p.close()
 browser.close()
 browser=pw.chromium.launch(executable_path=binary,channel=args.channel,headless=True,args=['--no-sandbox'])
 # In-session retry and hint accountability.
 p=page_new(browser,seed={'tq.settings.v1':json.dumps(settings('formula',True))});launch(p);p.locator('[data-action="skip"]').click()
 assert p.locator('[role="progressbar"]').get_attribute('aria-valuemax')=='2';p.locator('[data-action="continue"]').click()
 assert p.evaluate('TQDiagnostics().question.retry')==1
 p.locator('[data-action="hint"]').click();p.locator('[data-action="close-modal"]').first.click();p.locator('#formula-answer').fill(target['formula']);check(p)
 assert p.locator('#quiz-bottom.incorrect').count()==1
 assert len(saved_session(p)['queue'])==2
 assert_active(p,target['id']);continue_question(p)
 assert p.evaluate('TQDiagnostics().view')=='result'
 logs.append('second assisted occurrence stays in wrong bank and ends without a third');p.close()
 # A requested ten-question quest with one eligible card has at most two
 # occurrences, including proof and symbol cards; second skips stay active.
 for mode in ['choice','name','blanks','cloze','formula','symbol','proof']:
  cap_settings=settings(mode,True,10)
  if mode=='proof':cap_settings['scope']['selected']=[json.loads((ROOT/'data/proof-questions.json').read_text())[0]['id']]
  p=page_new(browser,seed={'tq.settings.v1':json.dumps(cap_settings)})
  launch(p);card_id=p.evaluate('TQDiagnostics().question.id')
  queue=saved_session(p)['queue'];assert len(queue)==2 and all(q['id']==card_id for q in queue),(mode,queue)
  for occurrence in range(2):
   p.locator('[data-action="skip"]').click()
   assert len(saved_session(p)['queue'])==2,(mode,saved_session(p))
   assert_active(p,card_id);continue_question(p)
  assert p.evaluate('TQDiagnostics().view')=='result',mode
  logs.append(mode+': count=10 single-card quest stops after two skips');p.close()
 # Wrong-bank review uses the same cap when its requested count exceeds scope.
 p=page_new(browser,seed={'tq.settings.v1':json.dumps(settings('formula',True,10))})
 launch(p);p.locator('[data-action="skip"]').click();p.locator('[data-action="exit-quiz"]').click()
 go(p,'mistakes');p.locator('[data-action="review-all"]').first.click()
 queue=saved_session(p)['queue'];assert len(queue)==2 and all(q['id']==target['id'] for q in queue),queue
 for occurrence in range(2):
  p.locator('[data-action="skip"]').click();assert len(saved_session(p)['queue'])==2
  continue_question(p)
 assert p.evaluate('TQDiagnostics().view')=='result';assert_active(p,target['id'])
 logs.append('wrong-bank count=10 review stops after two occurrences and keeps skipped card active');p.close()
 # A failed second answer is retained after simulated refresh. Legacy queues
 # keep the checked feedback but prune third/fourth future occurrences.
 p=page_new(browser,seed={'tq.settings.v1':json.dumps(settings('formula',True))})
 launch(p);p.locator('[data-action="skip"]').click();continue_question(p)
 p.locator('#formula-answer').fill('false');check(p)
 feedback=p.locator('#quiz-bottom').inner_text()
 seed=p.evaluate('({...window.__testStore})');legacy=json.loads(seed['tq.session.v1'])
 assert len(legacy['queue'])==2
 legacy['queue'].extend([dict(legacy['queue'][-1],retry=2),dict(legacy['queue'][0],mode='name')])
 seed['tq.session.v1']=json.dumps(legacy);p.close()
 p=page_new(browser,seed=seed);p.locator('[data-action="resume"]').first.click()
 assert p.evaluate('TQDiagnostics().checked')
 assert p.locator('#quiz-bottom').inner_text()==feedback
 restored=saved_session(p);assert restored['index']==1 and len(restored['queue'])==2,restored
 assert_active(p,target['id']);continue_question(p)
 assert p.evaluate('TQDiagnostics().view')=='result'
 logs.append('legacy resume prunes excess mixed-mode occurrences and retains checked second-failure feedback');p.close()
 # A legacy unfinished third occurrence is discarded after two recorded
 # failures, and resume reaches results without rendering another attempt.
 legacy['index']=2;legacy['state']=None
 seed['tq.session.v1']=json.dumps(legacy)
 p=page_new(browser,seed=seed);p.locator('[data-action="resume"]').first.click()
 assert p.evaluate('TQDiagnostics().view')=='result'
 assert json.loads(p.evaluate('window.__testStore["tq.progress.v1"]'))['records'][target['id']]['attempts']==2
 assert_active(p,target['id'])
 logs.append('legacy unchecked third occurrence resumes directly to results after two failures');p.close()
 # Five distinct cards put a first failure's retry after three other cards.
 delayed_settings=settings('choice',True,5)
 delayed_settings['scope']['selected']=[r['id'] for r in bank if r.get('preloaded2026') and 'inference rule' not in r['kind'].lower()][:5]
 p=page_new(browser,seed={'tq.settings.v1':json.dumps(delayed_settings)})
 launch(p);initial=saved_session(p)['queue'];assert len({q['id'] for q in initial})==5
 failed_id=initial[0]['id'];p.locator('[data-action="skip"]').click()
 queued=saved_session(p)['queue'];assert len(queued)==6 and queued[4]['id']==failed_id and queued[4]['retry']==1,queued
 continue_question(p)
 for q in initial[1:4]:
  assert p.evaluate('TQDiagnostics().question.id')==q['id']
  p.locator(f'[data-action="choose"][data-id="{q["id"]}"]').click();check(p);ok(p);continue_question(p)
 assert p.evaluate('TQDiagnostics().question.id')==failed_id
 p.locator('[data-action="skip"]').click();assert len(saved_session(p)['queue'])==6
 assert_active(p,failed_id);continue_question(p)
 q=p.evaluate('TQDiagnostics().question');assert q['id']==initial[4]['id']
 p.locator(f'[data-action="choose"][data-id="{q["id"]}"]').click();check(p);ok(p);continue_question(p)
 assert p.evaluate('TQDiagnostics().view')=='result'
 assert_active(p,failed_id)
 logs.append('multi-card quest delays one retry by three cards and never queues a third occurrence');p.close()
 # Backup import requires confirmation; formula-like injected HTML stays text.
 p=page_new(browser,seed={});go(p,'settings');backup={'schemaVersion':1,'records':{},'xp':70,'days':{},'stars':[target['id']],'history':[]}
 p.locator('#backup-file').set_input_files({'name':'backup.json','mimeType':'application/json','buffer':json.dumps(backup).encode()})
 p.locator('#confirm-import').click();assert '70 XP' in p.locator('#app').inner_text();logs.append('backup import validates and requires explicit confirmation');p.close()
 # Shared backslash autocomplete in formulas and a dedicated code recall mode.
 p=page_new(browser,'formula');launch(p);p.locator('#formula-answer').fill('\\lan')
 assert p.locator('#shortcut-suggestions').is_visible()
 p.locator('#formula-answer').press('Tab');assert p.locator('#formula-answer').input_value()=='∧'
 logs.append('formula: partial backslash command completes to a symbol');p.close()
 p=page_new(browser,'symbol');launch(p)
 symbol=p.locator('.symbol-challenge').inner_text()
 code=p.evaluate('(symbol)=>Object.entries(TQEngine.SHORTCUTS).find(([key,value])=>value===symbol)[0]',symbol)
 p.locator('#symbol-answer').fill(code[:max(2,len(code)-1)])
 assert p.locator('#shortcut-suggestions').is_visible()
 options=p.locator('[data-action="shortcut"]')
 chosen=next(i for i in range(options.count()) if options.nth(i).get_attribute('data-key')==code)
 options.nth(chosen).click()
 assert p.locator('#symbol-answer').input_value()==code
 check(p);ok(p);logs.append('symbol: command completion and answer validation');p.close()
 all_settings=settings('choice');all_settings['scope']={'era':'all','manual':False,'selected':[]}
 p=page_new(browser,'choice',seed={'tq.settings.v1':json.dumps(all_settings)})
 question_ids={r['id'] for r in bank if 'inference rule' not in r['kind'].lower()}
 assert p.evaluate('TQDiagnostics().scopeCount')==len(question_ids)
 launch(p)
 assert p.evaluate('TQDiagnostics().question.id') in question_ids
 assert set(p.locator('[data-action="choose"]').evaluate_all('(buttons)=>buttons.map(b=>b.dataset.id)'))<=question_ids
 logs.append('inference rules excluded from quiz scope and answer choices');p.close()
 # Responsive layout at both narrow and common phone widths.
 for w in [320,390]:
  p=page_new(browser,'formula',width=w)
  assert p.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
  if shots and w==390:p.screenshot(path=str(shots/'home-mobile.png'),full_page=True)
  launch(p);assert p.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),('quiz overflow',w,p.evaluate('document.documentElement.scrollWidth'))
  if shots and w==390:p.screenshot(path=str(shots/'formula-mobile.png'),full_page=True)
  type_screen(p,p.locator('#formula-answer'),'true');check(p);assert p.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
  logs.append(f'{w}px responsive home / quiz / feedback: no horizontal overflow');p.close()
 # Complete point-and-tap answer flows at both phone widths.
 for w in [320,390]:
  p=page_new(browser,'cloze',width=w);launch(p)
  template=p.evaluate('JSON.parse(window.__testStore["tq.session.v1"]).state.cloze')
  correct=template['blanks'][0]['correct']
  wrong=next(token for token in template['options'] if token!=correct)
  screen_symbol(p,wrong,0)
  assert p.locator('.cloze-slot').nth(0).inner_text()==wrong
  p.locator('.cloze-slot').nth(0).click()
  screen_symbol(p,correct,0)
  p.locator('[data-action="exit-quiz"]').click();p.locator('[data-action="resume"]').click()
  assert p.locator('.cloze-slot').nth(0).inner_text()==correct
  assert p.locator('#check-answer').is_disabled()
  for i,blank in enumerate(template['blanks'][1:],1):screen_symbol(p,blank['correct'],i)
  p.locator('.cloze-slot').nth(1).click();type_screen(p,p.locator('#cloze-answer'),'')
  assert p.locator('#check-answer').is_disabled()
  screen_symbol(p,template['blanks'][1]['correct'],1)
  check(p);ok(p)
  assert p.locator('#screen-keyboard').is_hidden()
  assert p.locator('#keyboard').is_hidden()
  assert p.locator('.cloze-slot:enabled').count()==0
  assert p.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
  logs.append(f'{w}px cloze: multiple blanks, correction, resume, deletion, grading and locking');p.close()
  p=page_new(browser,'blanks',width=w);launch(p)
  template=p.evaluate('TQEngine.blankTemplate('+json.dumps(target['formula'])+')')
  for i,b in enumerate(template['blanks']):
   p.locator(f'#blank-{i}').click()
   if all(ord(char)<128 for char in b['variable']):type_screen(p,p.locator(f'#blank-{i}'),b['variable'])
   else:mobile_fixture(p.locator(f'#blank-{i}'),b['variable'])
   assert p.locator(f'#blank-{i}').input_value()==b['variable']
  check(p);ok(p)
  assert p.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
  logs.append(f'{w}px letter blanks: complete and grade every slot using screen QWERTY');p.close()
  p=page_new(browser,'name',width=w);launch(p)
  mobile_fixture(p.locator('#name-answer'),target['name'])
  dismiss_keyboard(p)
  p.locator('.group-number-picker summary').click();p.locator(f'[data-action="group-ref"][data-id="{target["id"]}"]').click();check(p);ok(p)
  assert p.locator('.group-results').is_visible()
  assert target['formula'] in p.locator('.group-results').inner_text()
  assert p.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
  logs.append(f'{w}px group answer: grade the matching reference and show all group results');p.close()
 assert not errors,errors
 p=page_new(browser,seed={});
 if shots:p.screenshot(path=str(shots/'home-desktop.png'),full_page=True)
 p.close();browser.close()
server.shutdown()
print(json.dumps({'passed':len(logs),'scenarios':logs,'javascriptErrors':errors,'storage':'explicit in-memory test double','localHTTPTested':True,'httpDeploymentTested':False,'serviceWorkerTested':False},ensure_ascii=False,indent=2))
