'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const E=require('../assets/engine.js'),bank=require('../data/theorems.json'),sources=require('../data/sources.json');

test('mixed declaration origins retain Given and Proved independently',()=>{
  const record=bank.find(r=>r.id==='p-79e5c631d334');
  assert.deepEqual(E.declarationStatuses(record,sources),[
    {status:'given',year:2026},{status:'proved',year:2026},{status:'given',year:2025}
  ]);
  const inNotebook=port=>({...record,sources:record.sources.filter(origin=>sources.find(s=>s.id===origin.sourceId)?.url.includes(`:${port}/`))});
  assert.deepEqual(E.declarationStatuses(inNotebook(16024),sources),[{status:'proved',year:2026}]);
  assert.deepEqual(E.declarationStatuses(inNotebook(16025),sources),[{status:'given',year:2026}]);
});

test('source metadata establishes status; proof mentions and missing sources do not',()=>{
  assert.equal(E.declarationStatus({sourceType:'notebook-proved'}),'proved');
  assert.equal(E.declarationStatus({format:'CalcCheck theorem-list popup'}),'given');
  assert.equal(E.declarationStatus({format:'PDF',proofMentions:10}),null);
  assert.deepEqual(E.declarationStatuses({sources:[{sourceId:'missing'}],notebook2026:[16024]},sources),[]);
  const provedOnly=bank.find(r=>r.notebook2026?.length&&!r.preloaded2026?.length&&!r.preloaded2025?.length);
  assert.deepEqual(E.declarationStatuses(provedOnly,sources),[{status:'proved',year:2026}]);
});
