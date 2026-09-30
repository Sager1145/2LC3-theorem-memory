'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const E=require('../assets/engine.js'),bank=require('../data/theorems.json'),sources=require('../data/sources.json'),coverage=require('../data/coverage.json');
const okay=(a,b)=>assert.equal(E.compareFormula(a,b).ok,true,JSON.stringify({a,b,result:E.compareFormula(a,b)}));
const wrong=(a,b)=>assert.equal(E.compareFormula(a,b).ok,false,`${a} must not match ${b}`);
test('CalcCheck aliases, boundaries, command assignment ≠ substitution',()=>{
 assert.equal(E.normalizeInput(String.raw`p \land q \implies p \lor q`),'p ∧ q ⇒ p ∨ q');
 assert.equal(E.normalizeInput(String.raw`x := 1`),'x := 1');
 assert.equal(E.normalizeInput(String.raw`x \:= 1`),'x ≔ 1');
 assert.equal(E.normalizeInput(String.raw`\in \int \implies`),'∈ ℤ ⇒');
 wrong('(p ≡ q) = (p = q)','(p ≡ q) ≡ (p ≡ q)');
});
test('consistent renaming, Greek, primes and subscripts',()=>{
 okay('¬ (p ∧ q) ≡ ¬ p ∨ ¬ q','¬ (x ∧ y) ≡ ¬ x ∨ ¬ y');
 okay('p ∧ (p ⇒ q) ⇒ q',"α ∧ (α ⇒ β') ⇒ β'");
 okay('n = n₀ ⇒⁅ n := n + d ⁆ n = n₀ + d',"m = m₀ ⇒⁅ m := m + k ⁆ m = m₀ + k");
 wrong('p ∧ q ≡ q ∧ p','x ∧ x ≡ x ∧ x');
 wrong('¬ (p ∧ q) ≡ ¬ p ∨ ¬ q','¬ (x ∧ y) ≡ ¬ x ∨ ¬ x');
});
test('AC / parentheses / reversed relations accepted, wrong law rejected',()=>{
 okay('p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)','(y ∧ x) ∨ (z ∧ x) ≡ x ∧ (y ∨ z)');
 okay('a ≤ b ⇒ - b ≤ - a','x ≤ y ⇒ - x ≥ - y');
 okay('a + - a = 0','0 = x + (-x)');
 wrong('p ∧ true ≡ p','p ∨ false ≡ p');
 wrong('p ∧ q ≡ q ∧ p','true');
 wrong('p ∧ q ≡ q ∧ p','p ≡ p');
 wrong('p ⇒ (q ⇒ r)','(p ⇒ q) ⇒ r');
 wrong('A × B = B × A','B × A = A × B ≡ true');
});
test('syntax and long-input errors are safe',()=>{
 assert.equal(E.compareFormula('p','((p)').ok,false);
 assert.equal(E.compareFormula('p','').kind,'empty');
 assert.equal(E.compareFormula('p','p'.repeat(2500)).kind,'invalid');
 wrong('p ⇒ q','alert(1)');
});
test('numeric ranges do not lexically misorder numbers or parse regex',()=>{
 assert(E.referenceInRange(['3.47a'],'3.47'));
 assert(E.referenceInRange(['3.82.5'],'3.1-3.82.5,15.1-15.29'));
 assert(!E.referenceInRange(['3.82.5'],'3.1-3.9'));
 assert(!E.referenceInRange([], '3.1-3.82.5'));
 assert(!E.referenceInRange(['3.47'], '3.*'));
 assert(!E.referenceInRange(['3.47'],'[-['));
 assert(E.referenceInRange([],''));
});
test('queue only draws checked modes and current scope',()=>{
 const small=bank.slice(0,12),q=E.makeSession(small,['choice','formula'],12,()=>0.4);
 assert.equal(q.length,12);assert.equal(new Set(q.map(t=>t.id)).size,12);
 assert(q.every(t=>['choice','formula'].includes(t.mode)&&small.some(r=>r.id===t.id)));
 const t={id:'true',formula:'true'};
 assert.throws(()=>E.makeSession([t],['blanks'],1));assert.throws(()=>E.makeSession(small,[],1));
});
test('wrong bank: two unaided wins in each failed mode are required',()=>{
 const p=E.freshProgress(),id=bank[0].id;
 E.applyAttempt(p,id,'formula',false,'wrong',false,10000000);
 E.applyAttempt(p,id,'choice',true,'name');E.applyAttempt(p,id,'choice',true,'name');
 assert.equal(p.records[id].active,true);
 E.applyAttempt(p,id,'formula',true,'formula');assert.equal(p.records[id].active,true);
 E.applyAttempt(p,id,'formula',true,'formula',true);assert.equal(p.records[id].modeWins.formula,0);
 E.applyAttempt(p,id,'formula',true,'formula');E.applyAttempt(p,id,'formula',true,'formula');
 assert.equal(p.records[id].active,false);assert.equal(p.records[id].wrong,2);assert.equal(p.xp,50);
});
test('backup validation and round-trip preserve mistakes, discard unknown IDs',()=>{
 const p=E.freshProgress(),id=bank[0].id;E.applyAttempt(p,id,'name',false,'wrong');p.stars=[id];p.records.unknown={};
 const restored=E.validateProgress(JSON.parse(JSON.stringify(p)),bank.map(r=>r.id));
 assert.equal(restored.records[id].active,true);assert.deepEqual(restored.stars,[id]);assert(!restored.records.unknown);
 assert.throws(()=>E.validateProgress({schemaVersion:99},[]));
});
test('every published card is source-traceable and self-matchable',()=>{
 const ids=new Set(),ss=new Set(sources.map(s=>s.id));
 for(const r of bank){
  assert(r.name&&r.displayRef&&r.formula);assert(!ids.has(r.id));ids.add(r.id);
  assert(r.sources.length);assert(r.sources.every(x=>ss.has(x.sourceId)));
  assert(E.balanced(E.tokenize(r.formula)),r.id+' '+r.formula);
  okay(r.formula,r.formula);assert(!r.formula.includes('`'));
  assert(r.important===!!r.importantEvidence.length);
 }
 assert.equal(coverage.theoremCount,bank.length);assert.equal(coverage.completeProjectAccess,false);
});
test('every generated blank exercise accepts identity and fresh bijective renaming',()=>{
 for(const r of bank){
  const t=E.blankTemplate(r.formula);if(!t.blanks.length)continue;
  const filled=E.fillTemplate(t,t.blanks.map(b=>b.variable));okay(r.formula,filled);
  const renames=Object.fromEntries(t.variables.map((v,i)=>[v,'v'+i]));
  const renamed=E.fillTemplate(t,t.blanks.map(b=>renames[b.variable]));okay(r.formula,renamed);
 }
});
test('pure propositional entries are true on every Boolean valuation',()=>{
 const allowed=new Set(['var','const','¬','≡','≢','⇒','∧','∨','=']);let count=0;
 function valid(n){return allowed.has(n.op)&&(n.op!=='const'||['true','false'].includes(n.value))&&(!n.args||n.args.every(valid));}
 function evalTree(n,v){
  if(n.op==='var')return v[n.value];if(n.op==='const')return n.value==='true';
  const a=evalTree(n.args[0],v),b=n.args.length>1?evalTree(n.args[1],v):null;
  return ({'¬':()=>!a,'≡':()=>a===b,'=':()=>a===b,'≢':()=>a!==b,'⇒':()=>!a||b,'∧':()=>a&&b,'∨':()=>a||b})[n.op]();
 }
 for(const r of bank){let tree;try{tree=E.parse(r.formula);}catch{continue;}if(!valid(tree))continue;
  const vars=E.varsOf(E.tokenize(r.formula));if(vars.length>8)continue;count++;
  for(let m=0;m<2**vars.length;m++){const v=Object.fromEntries(vars.map((x,i)=>[x,!!(m&(1<<i))]));assert(evalTree(tree,v),r.displayRef+' '+r.name+' '+r.formula+' '+JSON.stringify(v));}
 }
 assert(count>100);console.log('Pure propositional cards checked:',count);
});
