const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('../assets/engine.js');
const proof = {id:'proof-test', name:'Symmetry of +', formula:'x + y', kind:'Proof step', proof:{answers:['Symmetry of +']}};
const theorem = {id:'theorem-test', name:'Symmetry of +', formula:'x + y = y + x', kind:'Theorem'};

test('proof steps accept only theorem names, never a reference or formula', () => {
  assert.equal(E.gradeProofName(proof,'  SYMMETRY of +  '),true);
  for(const answer of ['15.2','(15.2) Symmetry of +','x + y = y + x','','Symmetry']) {
    assert.equal(E.gradeProofName(proof,answer),false,answer);
  }
});

test('proof steps and declaration questions keep their own eligible modes', () => {
  assert.deepEqual(E.eligibleModes(proof,['proof','choice','formula','cloze']),['proof']);
  assert.deepEqual(E.eligibleModes(theorem,['proof']),[]);
  assert.ok(E.makeSession([proof,theorem],['proof'],12).every(q=>q.id===proof.id && q.mode==='proof'));
});

test('proof mistakes survive backup export and restore, and resolve through proof practice', () => {
  const progress=E.freshProgress();
  E.applyAttempt(progress,proof.id,'proof',false,'15.2');
  const restored=E.validateProgress(JSON.parse(JSON.stringify(progress)),[proof.id]);
  assert.deepEqual(restored.records[proof.id].wrongModes,['proof']);
  E.applyAttempt(restored,proof.id,'proof',true,'Symmetry of +');
  E.applyAttempt(restored,proof.id,'proof',true,'Symmetry of +');
  assert.equal(restored.records[proof.id].active,false);
});
