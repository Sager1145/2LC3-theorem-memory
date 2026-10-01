#!/usr/bin/env python3
"""Exercise every eligible card/mode through DOM events on an isolated local origin.

Deterministic queues are seeded through the supported saved-session format (100
questions per session). Answers use input/click events and production handlers.
This complements browser_smoke's real keyboard, mobile and launch-path coverage.
"""
import hashlib
import json
import statistics
import threading
import time
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs/test-results/browser-exhaustive.json'

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

class Server(ThreadingHTTPServer):
    request_queue_size = 128

ANSWER = r"""({limit}) => {
  const E=TQEngine, cards=[...THEOREM_DATA.theorems,...PROOF_QUESTIONS], byId=new Map(cards.map(r=>[r.id,r]));
  const completed=[];
  const input=(el,value)=>{if(!el)throw Error('missing input');el.value=value;el.dispatchEvent(new Event('input',{bubbles:true}));};
  for(let n=0;n<limit&&TQDiagnostics().view==='quiz';n++){
    const q=TQDiagnostics().question,r=byId.get(q.id),s=JSON.parse(localStorage.getItem('tq.session.v1'));
    const correct=s.index%2===0, start=performance.now();
    const fail=message=>{throw Error(JSON.stringify({id:q.id,mode:q.mode,correct,message}));};
    const empty=document.querySelector('#check-answer');
    if(!empty?.disabled)fail('empty answer should disable check');
    let rejected=false;
    if(q.mode==='choice'){
      const options=[...document.querySelectorAll('[data-action="choose"]')];
      const option=options.find(b=>correct?b.dataset.id===q.id:b.dataset.id!==q.id);
      if(!option)fail('missing choice');option.click();
    }else if(q.mode==='name'){
      const el=document.querySelector('#name-answer');
      if(el)input(el,correct?(r.name==='原文未命名'?r.numbers[0]:r.name):'definitely nonexistent theorem 987654321');
      else if(correct)document.querySelector('[data-action="group-name"]').click();
      else {
        const option=[...document.querySelectorAll('[data-action="group-ref"]')].find(b=>!E.gradeName(THEOREM_DATA.theorems.filter(E.isQuestionCard),r,{selectedId:b.dataset.id}).ok);
        if(option)option.click();else {document.querySelector('[data-action="skip"]').click();rejected=true;}
      }
    }else if(q.mode==='formula')input(document.querySelector('#formula-answer'),correct?r.formula:'@@@ invalid theorem @@@');
    else if(q.mode==='proof')input(document.querySelector('#proof-answer'),correct?r.proof.answers[0]:'definitely nonexistent theorem 987654321');
    else if(q.mode==='symbol'){
      input(document.querySelector('#symbol-answer'),correct?Object.entries(E.SHORTCUTS).find(([,symbol])=>symbol===s.state.symbolTarget)[0]:'\\invalidcommand');
    }else if(q.mode==='cloze'){
      for(const [i,blank] of s.state.cloze.blanks.entries()){
        document.querySelector('[data-action="cloze-slot"][data-slot="'+i+'"]').click();
        const token=correct||i>0?blank.correct:s.state.cloze.options.find(t=>t!==blank.correct);
        [...document.querySelectorAll('[data-action="cloze-key"]')].find(b=>b.dataset.token===token).click();
      }
    }else if(q.mode==='blanks'){
      const template=E.blankTemplate(r.formula), values=template.blanks.map(b=>b.variable);
      if(!correct){
        if(template.variables.length>1)values.fill(template.variables[0]);
        else if(values.length>1)values[values.length-1]='z999';
        else values[0]='true';
      }
      values.forEach((v,i)=>input(document.querySelector('#blank-'+i),v));
      if(!correct&&template.blanks.length===1){
        document.querySelector('#check-answer').click();
        if(TQDiagnostics().checked)fail('invalid blank variable was graded');
        rejected=true;document.querySelector('[data-action="skip"]').click();
      }
    }
    if(!TQDiagnostics().checked)document.querySelector('#check-answer').click();
    if(!TQDiagnostics().checked)fail('submission did not produce feedback');
    if(!document.querySelector('#quiz-bottom.'+(correct?'correct':'incorrect')))fail('wrong verdict');
    const stored=()=>JSON.parse(localStorage.getItem('tq.progress.v1')).records[q.id].attempts;
    const before=stored();
    // Force a stale duplicate check event; the production guard must ignore it.
    document.querySelector('#quiz-bottom').insertAdjacentHTML('beforeend','<button id="check-answer" data-action="check">duplicate</button>');
    document.querySelector('#check-answer').click();
    if(stored()!==before)fail('duplicate submission counted twice');
    completed.push({id:q.id,mode:q.mode,correct,rejected,ms:performance.now()-start});
    document.querySelector('[data-action="continue"]').click();
  }
  return completed;
}"""

def main():
    fingerprints={p:hashlib.sha256((ROOT/p).read_bytes()).hexdigest() for p in
                  ['assets/engine.js','assets/app.js','data/theorems.json','data/proof-questions.json']}
    server = Server(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    errors, results, snapshots = [], [], []
    started = time.perf_counter()
    try:
        with sync_playwright() as pw:
            browser = pw.chromium.launch(channel='chromium', headless=True)
            context = browser.new_context()
            page = context.new_page()
            page.on('pageerror', lambda e: errors.append(str(e)))
            page.add_init_script('window.TQ_PORTABLE=true')
            page.goto(f'http://127.0.0.1:{server.server_port}/')
            page.wait_for_function('typeof TQDiagnostics === "function"')
            pairs = page.evaluate('''() => [...THEOREM_DATA.theorems,...PROOF_QUESTIONS]
              .filter(TQEngine.isQuestionCard).flatMap(r=>TQEngine.eligibleModes(r,
              ['name','choice','blanks','cloze','formula','symbol','proof']).map(mode=>({id:r.id,mode,retry:0})))''')
            queue = [q for pair in pairs for q in [pair, pair.copy()]]
            page.evaluate('''() => {
              localStorage.setItem('tq.settings.v1',JSON.stringify({modeDefaultsVersion:2,
                modes:['name','choice','blanks','cloze','formula','symbol','proof'],
                retry:false,sound:false,scope:{era:'all'}}));
              localStorage.removeItem('tq.progress.v1');
            }''')
            cdp = context.new_cdp_session(page)
            cdp.send('Performance.enable')
            for offset in range(0, len(queue), 100):
                batch = queue[offset:offset + 100]
                page.evaluate('''queue => localStorage.setItem('tq.session.v1',JSON.stringify({
                  queue,index:0,choiceDifficulty:2,label:'全量答题测试',results:[],combo:0,
                  bestCombo:0,xp:0,startedAt:Date.now(),state:null}))''', batch)
                page.reload()
                page.wait_for_function('typeof TQDiagnostics === "function"')
                page.locator('[data-action="resume"]').click()
                for index in range(0, len(batch), 10):
                    rows = page.evaluate(ANSWER, {'limit': min(10, len(batch) - index)})
                    assert len(rows) == min(10, len(batch) - index), (offset, index, rows)
                    results.extend(rows)
                assert page.evaluate('TQDiagnostics().view') == 'result'
                assert page.evaluate('localStorage.getItem("tq.session.v1")') is None
                metrics = {m['name']: m['value'] for m in cdp.send('Performance.getMetrics')['metrics']}
                snapshots.append({'answers': len(results), 'heapMiB': round(metrics['JSHeapUsedSize']/1048576, 2), **cdp.send('Memory.getDOMCounters')})
                print(json.dumps({'answers': len(results), 'total': len(queue), 'memory': snapshots[-1]}), flush=True)
            progress = page.evaluate('JSON.parse(localStorage.getItem("tq.progress.v1"))')
            assert sum(r['attempts'] for r in progress['records'].values()) == len(queue)
            assert progress['xp'] == len(pairs)*10
            assert sum(r['correct'] for r in progress['records'].values()) == len(pairs)
            assert sum(r['wrong'] for r in progress['records'].values()) == len(pairs)
            assert len({(r['id'],r['mode']) for r in results}) == len(pairs)
            page.reload()
            page.wait_for_function('typeof TQDiagnostics === "function"')
            assert page.evaluate('JSON.parse(localStorage.getItem("tq.progress.v1")).xp') == len(pairs)*10
            assert not errors, errors
            assert all(hashlib.sha256((ROOT/p).read_bytes()).hexdigest()==digest for p,digest in fingerprints.items()), 'production inputs changed during test'
            latencies = sorted(r['ms'] for r in results)
            summary = {'theoremCards': page.evaluate('THEOREM_DATA.theorems.length'),
                       'questionCards': page.evaluate('THEOREM_DATA.theorems.filter(TQEngine.isQuestionCard).length'),
                       'proofCards': page.evaluate('PROOF_QUESTIONS.length'),
                       'eligibleCardModePairs': len(pairs), 'answers': len(results),
                       'correct': len(pairs), 'incorrect': len(pairs),
                       'invalidOrUnavailableWrongInputSkipped': sum(r['rejected'] for r in results),
                       'byMode': {mode: sum(r['mode']==mode for r in results) for mode in sorted({r['mode'] for r in results})},
                       'duplicateSubmissionChecks': len(results), 'nativeStorageReload': True,
                       'browser': browser.version, 'fingerprints': fingerprints, 'seconds': round(time.perf_counter()-started,2),
                       'answerMedianMs': round(statistics.median(latencies),2),
                       'answerP95Ms': round(latencies[int(len(latencies)*.95)-1],2),
                       'answerMaxMs': round(max(latencies),2), 'javascriptErrors': errors,
                       'memorySnapshots': snapshots, 'coverage': [{'id':r['id'],'mode':r['mode'],'correct':r['correct'],'rejected':r['rejected']} for r in results]}
            OUT.parent.mkdir(parents=True, exist_ok=True)
            OUT.write_text(json.dumps(summary, ensure_ascii=False, indent=2)+'\n')
            print(json.dumps({k:v for k,v in summary.items() if k not in ['coverage','memorySnapshots']}, ensure_ascii=False, indent=2))
            context.close()
            browser.close()
    finally:
        server.shutdown()

if __name__ == '__main__':
    main()
