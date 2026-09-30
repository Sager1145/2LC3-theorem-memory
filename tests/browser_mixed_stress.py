#!/usr/bin/env python3
"""1,000 mixed-mode answers without page reloads or browser restarts.

Launches twenty ordinary 50-question sessions via the production start button.
Uses isolated native storage and the shared DOM answer driver from the exhaustive
test. Alternates correct/wrong inputs, and verifies each repeated check is ignored.
"""
import hashlib
import json
import statistics
import threading
import time
from functools import partial
from playwright.sync_api import sync_playwright
from browser_exhaustive import ROOT, Server, Quiet, ANSWER

def main():
    server=Server(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start()
    errors,results,snapshots=[],[],[]
    started=time.perf_counter()
    try:
        with sync_playwright() as pw:
            browser=pw.chromium.launch(channel='chromium',headless=True)
            context=browser.new_context()
            page=context.new_page()
            page.on('pageerror',lambda e:errors.append(str(e)))
            page.add_init_script('''window.TQ_PORTABLE=true;
              if(!localStorage.getItem('tq.settings.v1'))localStorage.setItem('tq.settings.v1',JSON.stringify({
                modeDefaultsVersion:2,modes:['name','choice','blanks','cloze','formula','symbol','proof'],
                count:50,retry:false,sound:false,scope:{era:'all'}}));''')
            page.goto(f'http://127.0.0.1:{server.server_port}/')
            page.wait_for_function('typeof TQDiagnostics === "function"')
            cdp=context.new_cdp_session(page)
            cdp.send('Performance.enable')
            for round_index in range(20):
                page.locator('[data-action="start"]').first.click()
                for _ in range(5):
                    rows=page.evaluate(ANSWER,{'limit':10})
                    assert len(rows)==10
                    results.extend(rows)
                assert page.evaluate('TQDiagnostics().view')=='result'
                metrics={m['name']:m['value'] for m in cdp.send('Performance.getMetrics')['metrics']}
                snapshots.append({'answers':len(results),'heapMiB':round(metrics['JSHeapUsedSize']/1048576,2),**cdp.send('Memory.getDOMCounters')})
                print(json.dumps(snapshots[-1]),flush=True)
                page.locator('[data-action="nav"][data-view="home"]').first.click()
            progress=page.evaluate('JSON.parse(localStorage.getItem("tq.progress.v1"))')
            assert sum(r['attempts'] for r in progress['records'].values())==1000
            assert sum(r['correct'] for r in progress['records'].values())==500
            assert sum(r['wrong'] for r in progress['records'].values())==500
            assert progress['xp']==5000
            assert len(progress['history'])==20
            counts={mode:sum(r['mode']==mode for r in results) for mode in ['name','choice','blanks','cloze','formula','symbol','proof']}
            assert all(counts.values()),counts
            cdp.send('HeapProfiler.collectGarbage')
            metrics={m['name']:m['value'] for m in cdp.send('Performance.getMetrics')['metrics']}
            collected={'heapMiB':round(metrics['JSHeapUsedSize']/1048576,2),**cdp.send('Memory.getDOMCounters')}
            page.reload()
            page.wait_for_function('typeof TQDiagnostics === "function"')
            assert page.evaluate('JSON.parse(localStorage.getItem("tq.progress.v1")).history.length')==20
            assert not errors,errors
            latencies=sorted(r['ms'] for r in results)
            report={'answers':1000,'correct':500,'incorrect':500,'ordinarySessions':20,
                    'reloadsDuringAnswers':0,'browserRestarts':0,'modes':counts,
                    'duplicateSubmissionChecks':1000,'nativeStorageReload':True,
                    'invalidOrUnavailableWrongInputSkipped':sum(r['rejected'] for r in results),
                    'seconds':round(time.perf_counter()-started,2),'browser':browser.version,
                    'engineSHA256':hashlib.sha256((ROOT/'assets/engine.js').read_bytes()).hexdigest(),
                    'answerMedianMs':round(statistics.median(latencies),2),
                    'answerP95Ms':round(latencies[int(len(latencies)*.95)-1],2),
                    'answerMaxMs':round(max(latencies),2),'javascriptErrors':errors,
                    'memorySnapshots':snapshots,'afterGarbageCollection':collected}
            (ROOT/'docs/test-results/browser-mixed-stress.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
            print(json.dumps(report,ensure_ascii=False,indent=2))
            context.close();browser.close()
    finally:
        server.shutdown()

if __name__=='__main__':
    main()
