'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const E=require('../assets/engine.js');
test('uppercase theorem names preserve ordinary AND, OR and NOT words',()=>{
  for(const name of ['Odd is not even','Golden rule for ∩ and ∪','Exclusive or']){
    const r={id:'named',name,numbers:['1.1'],displayRef:'(1.1)',aliases:[]};
    assert.equal(E.gradeName([r],r,{typed:name.toUpperCase()}).ok,true);
    assert.equal(E.gradeProofName({...r,proof:{answers:[name]}},name.toUpperCase()),true);
  }
  assert.equal(E.normalizeName(String.raw`Definition of \NN`),E.normalizeName('Definition of ℕ'));
  assert.equal(E.normalizeInput('p AND NOT q'),'p ∧ ¬ q');
});
test('choice similarity follows edits to formula, name and alias contents after reuse',()=>{
  const a={name:'Identity',formula:'p ∧ true ≡ p',aliases:['Neutral element'],topic:'Logic'};
  const b={...a,aliases:[...a.aliases]};
  assert.equal(E.choiceSimilarity(a,b),1);
  for(const edit of [()=>{b.formula='p ∨ q ⇒ p';},()=>{b.name='Different';},()=>{b.aliases[0]='Unrelated';}]){
    edit();
    assert.equal(E.choiceSimilarity(a,b),E.choiceSimilarity({...a,aliases:[...a.aliases]},{...b,aliases:[...b.aliases]}));
  }
});
