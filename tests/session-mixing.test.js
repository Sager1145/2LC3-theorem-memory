'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const E=require('../assets/engine.js');

const declarationModes=['name','choice','blanks','cloze','formula','symbol'];
const allModes=[...declarationModes,'proof'];
const formula='¬ (p ∧ q) ≡ ¬ p ∨ ¬ q';
const declarations=Array.from({length:24},(_,i)=>({
  id:`mixed-${i}`,name:`Law ${i}`,displayRef:`(${i})`,formula,kind:'Theorem'
}));
const proof={id:'sparse-proof',name:'Proof hint',formula:'p ∨ q',kind:'Proof step',proof:{answers:['Law 0']}};
const seeds=[1,7,42,2026];
function random(seed){
  let state=seed>>>0;
  return ()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};
}
function balanced(queue,modes){
  const counts=modes.map(mode=>queue.filter(q=>q.mode===mode).length);
  assert(Math.max(...counts)-Math.min(...counts)<=1,JSON.stringify({modes,counts}));
}
function validQueue(queue,records,modes,difficulty=2,allowed=()=>modes){
  const occurrences=new Map();
  for(const q of queue){
    const r=records.find(r=>r.id===q.id);
    assert(r,`out-of-scope card ${q.id}`);
    assert(E.isQuestionCard(r),`excluded card ${q.id}`);
    assert(modes.includes(q.mode),`unchecked mode ${q.mode}`);
    assert(allowed(r).includes(q.mode),`disallowed review mode for ${q.id}: ${q.mode}`);
    assert(E.eligibleModes(r,modes,difficulty).includes(q.mode),`ineligible ${q.id}: ${q.mode}`);
    assert.equal(q.retry,0);
    const id=E.canonicalId(q.id);
    occurrences.set(id,(occurrences.get(id)||0)+1);
    assert(occurrences.get(id)<=2,`card ${id} exceeds two appearances`);
  }
}

test('desktop sessions give every eligible mode one turn per randomized round',()=>{
  const orders=new Set();
  for(const seed of seeds){
    for(const count of [6,12,19,31]){
      const queue=E.makeSession(declarations,declarationModes,count,random(seed));
      assert.equal(queue.length,count);
      validQueue(queue,declarations,declarationModes);
      balanced(queue,declarationModes);
      for(let offset=0;offset+6<=queue.length;offset+=6){
        assert.deepEqual(new Set(queue.slice(offset,offset+6).map(q=>q.mode)),new Set(declarationModes));
      }
      if(count===6)orders.add(queue.map(q=>q.mode).join(','));
    }
    assert.deepEqual(E.makeSession(declarations,declarationModes,19,random(seed)),
      E.makeSession(declarations,declarationModes,19,random(seed)));
  }
  assert(orders.size>1,'seeded randomness should vary round order');
});

test('a sparse proof card gets a turn alongside all six declaration modes',()=>{
  const records=[...declarations,proof];
  for(const seed of seeds){
    const queue=E.makeSession(records,allModes,14,random(seed));
    assert.equal(queue.length,14);
    validQueue(queue,records,allModes);
    balanced(queue,allModes);
    assert.equal(queue.filter(q=>q.mode==='proof').length,2);
  }
});

test('mobile uses half choice, forty percent fills and ten percent full input',()=>{
  const records=[...declarations,proof];
  for(const seed of seeds){
    for(const count of [10,20,25,40]){
      const queue=E.makeSession(records,allModes,count,random(seed),2,{mobile:true});
      assert.equal(queue.length,count);
      validQueue(queue,records,allModes);
      const choice=queue.filter(q=>q.mode==='choice').length;
      const fills=queue.filter(q=>['blanks','cloze'].includes(q.mode)).length;
      const input=count-choice-fills;
      assert(Math.abs(choice-count*0.5)<=0.5);
      assert(Math.abs(fills-count*0.4)<=0.5);
      assert(Math.abs(input-count*0.1)<=0.5);
      balanced(queue,['blanks','cloze']);
      balanced(queue,['name','formula','symbol','proof']);
      if(count===40)assert.deepEqual(new Set(queue.map(q=>q.mode)),new Set(allModes));
    }
    assert.deepEqual(E.makeSession(records,allModes,25,random(seed),2,{mobile:true}),
      E.makeSession(records,allModes,25,random(seed),2,{mobile:true}));
  }
});

test('mobile favors fills when choice is unchecked and redistributes unavailable categories',()=>{
  for(const seed of seeds){
    const modes=['name','blanks','cloze','symbol'];
    const queue=E.makeSession(declarations,modes,20,random(seed),2,{mobile:true});
    assert.equal(queue.length,20);
    validQueue(queue,declarations,modes);
    assert.equal(queue.filter(q=>['blanks','cloze'].includes(q.mode)).length,16);
    balanced(queue,['blanks','cloze']);
    balanced(queue,['name','symbol']);
    const choiceAndFormula=E.makeSession(declarations,['choice','formula'],12,random(seed),2,{mobile:true});
    assert.equal(choiceAndFormula.length,12);
    assert.equal(choiceAndFormula.filter(q=>q.mode==='choice').length,10);
    validQueue(choiceAndFormula,declarations,['choice','formula']);
    const inputOnly=E.makeSession(declarations,['name','formula','symbol'],17,random(seed),2,{mobile:true});
    assert.equal(inputOnly.length,17);
    balanced(inputOnly,['name','formula','symbol']);
    validQueue(inputOnly,declarations,['name','formula','symbol']);
  }
});

test('mobile exhausts sparse categories and fills the queue within occurrence limits',()=>{
  const records=[...declarations.slice(0,3),proof];
  const allowed=new Map([
    [records[0].id,['choice']], [records[1].id,['blanks','cloze']],
    [records[2].id,['name','formula','symbol']], [proof.id,['proof']]
  ]);
  const modesForRecord=r=>allowed.get(r.id);
  for(const seed of seeds){
    const queue=E.makeSession(records,allModes,20,random(seed),2,{mobile:true,modesForRecord});
    assert.equal(queue.length,8);
    validQueue(queue,records,allModes,2,modesForRecord);
    for(const record of records)assert.equal(queue.filter(q=>q.id===record.id).length,2);
    assert.equal(queue.filter(q=>q.mode==='choice').length,2);
    assert.equal(queue.filter(q=>['blanks','cloze'].includes(q.mode)).length,2);
    assert.equal(queue.filter(q=>q.mode==='proof').length,2);
  }
});

test('mixed queues enforce scope, inference exclusion, hard choice exclusion and formula eligibility',()=>{
  const basic={...declarations[0],id:'basic',name:'Associativity of conjunction'};
  const constant={...declarations[1],id:'constant',formula:'true'};
  const inference={...declarations[2],id:'inference',kind:'Inference rule'};
  const records=[declarations[3],basic,constant,proof,inference];
  for(const mobile of [false,true])for(const seed of seeds){
    const queue=E.makeSession(records,allModes,35,random(seed),3,{mobile});
    assert.equal(queue.length,8);
    validQueue(queue,records,allModes,3);
    assert(!queue.some(q=>q.id==='basic'&&q.mode==='choice'));
    assert(!queue.some(q=>q.id==='constant'&&['blanks','cloze','symbol'].includes(q.mode)));
  }
});

test('wrong-bank mode restrictions participate in mixing without leaking unfailed modes',()=>{
  const records=[...declarations.slice(0,3),proof];
  const allowed=new Map([
    [records[0].id,['choice']], [records[1].id,['formula']],
    [records[2].id,['name','symbol']], [proof.id,['proof']]
  ]);
  const modesForRecord=r=>allowed.get(r.id);
  for(const mobile of [false,true])for(const seed of seeds){
    const queue=E.makeSession(records,allModes,20,random(seed),2,{mobile,modesForRecord});
    assert.equal(queue.length,8);
    validQueue(queue,records,allModes,2,modesForRecord);
    assert.deepEqual(new Set(queue.map(q=>q.mode)),new Set(['choice','formula','name','symbol','proof']));
  }
  assert.throws(()=>E.makeSession(records,['cloze'],4,random(1),2,{modesForRecord}));
});

test('single-mode sessions stay usable for mobile and sparse proof scopes',()=>{
  for(const mobile of [false,true])for(const mode of allModes){
    const records=mode==='proof'?[proof]:declarations.slice(0,2);
    const queue=E.makeSession(records,[mode],9,random(7),2,{mobile});
    assert.equal(queue.length,Math.min(9,2*records.length));
    validQueue(queue,records,[mode]);
    assert(queue.every(q=>q.mode===mode));
  }
});

test('symbol cloze difficulty varies blank counts and samples valid positions reproducibly',()=>{
  const subsets=new Set();
  const tokens=E.tokenize(formula);
  for(const seed of seeds){
    const templates=[1,2,3].map(level=>E.clozeTemplate(formula,random(seed),level));
    assert.deepEqual(templates.map(t=>t.blanks.length),[1,3,5]);
    for(let i=0;i<templates.length;i++){
      const t=templates[i],indices=t.blanks.map(b=>b.index);
      assert.deepEqual(indices,[...indices].sort((a,b)=>a-b));
      assert.equal(new Set(indices).size,indices.length);
      for(const b of t.blanks){
        assert.equal(tokens[b.index],b.correct);
        assert(t.options.includes(b.correct));
      }
      const correct=t.blanks.map(b=>b.correct);
      assert(E.gradeCloze(t,correct));
      assert.equal(E.fillCloze(t,correct),tokens.join(' '));
      assert.deepEqual(t,E.clozeTemplate(formula,random(seed),i+1));
    }
    subsets.add(templates[1].blanks.map(b=>b.index).join(','));
    assert.equal(E.clozeTemplate(formula,random(seed)).blanks.length,3);
  }
  assert(subsets.size>1,'different seeds should sample different symbol positions');
  for(const level of [1,2,3]){
    assert.equal(E.clozeTemplate('p ∧ q',random(1),level),null);
    assert.equal(E.clozeTemplate('true',random(1),level),null);
    assert.equal(E.clozeTemplate('p ∧ q ≡ r',random(1),level).blanks.length,1);
  }
  assert(E.clozeTemplate(formula));
});

test('symbol cloze keeps the outer equality or equivalence connector visible',()=>{
  const cases=[
    {formula,connector:'≡'},
    {formula:'(p = q) ≡ (q = p)',connector:'≡'},
    {formula:'p + q = q + p',connector:'='},
    {formula:'((p = q) ≡ (q = p))',connector:'≡'},
    {formula:'(p + q = q + p)',connector:'='},
    {formula:'p ∧ q ≡ p ≡ q ≡ p ∨ q',connector:'≡'},
    {formula:'p = q ≡ q = p',connector:'≡'}
  ];
  for(const {formula:source,connector} of cases){
    const tokens=E.tokenize(source),anchor=tokens.indexOf(connector);
    assert(anchor>=0);
    for(const seed of seeds)for(const level of [1,2,3]){
      const template=E.clozeTemplate(source,random(seed),level);
      assert(template,source);
      assert(template.blanks.length>0,source);
      assert(!template.blanks.some(b=>b.index===anchor),`${source}: connector blanked at difficulty ${level}`);
      assert.equal(template.tokens[anchor],connector);
      assert.equal(E.fillCloze(template,template.blanks.map(b=>b.correct)),tokens.join(' '));
    }
    const hard=E.clozeTemplate(source,random(1),3);
    const otherRelations=tokens.map((token,index)=>({token,index}))
      .filter(({token,index})=>index!==anchor&&['=','≡'].includes(token));
    assert(otherRelations.every(({index})=>hard.blanks.some(b=>b.index===index)),source);
  }
});
