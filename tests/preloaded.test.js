'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const bank=require('../data/theorems.json');
const sources=require('../data/sources.json');
const coverage=require('../data/coverage.json');

test('all published cards come from copied 2025 or 2026 preloaded popups',()=>{
  const captured2026=fs.readdirSync(path.join(root,'research/preloaded/raw2026')).filter(name=>/^port\d+\.txt$/.test(name));
  assert.equal(sources.filter(s=>s.id.startsWith('calc-2026-')).length,captured2026.length);
  assert.equal(coverage.current2026NotebookCount,captured2026.length);
  assert.equal(coverage.preloadedNotebookCount,26);
  assert.equal(coverage.preloadedUniqueCount,1052);
  assert.equal(coverage.current2026Count,bank.filter(card=>card.preloaded2026.length).length);
  assert.equal(coverage.practiceCount,bank.filter(card=>!/inference rule/i.test(card.kind)).length);
  assert.equal(coverage.current2026PracticeCount,bank.filter(card=>card.preloaded2026.length&&!/inference rule/i.test(card.kind)).length);
  assert.equal(coverage.preloadedDeclarationCount,sources.filter(s=>s.id.startsWith('calc-preloaded-')).reduce((n,s)=>n+s.declarations,0));
  const lines=new Map(sources.map(s=>[
    s.id,fs.readFileSync(path.join(root,s.localCapture),'utf8').split(/\r?\n/)
  ]));
  for(const card of bank){
    assert(card.sources.length>0,card.id);
    for(const origin of card.sources){
      const list=lines.get(origin.sourceId);
      assert(list,origin.sourceId);
      const line=list[origin.locator.line-1];
      assert(line?.startsWith(origin.excerpt),`${card.id} ${origin.sourceId}:${origin.locator.line}`);
    }
  }
  assert.equal(sources.find(s=>s.id==='calc-preloaded-hw07').declarations,4);
  assert.deepEqual(require('../data/review-candidates.json'),[]);
});
