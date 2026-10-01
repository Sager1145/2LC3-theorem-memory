'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const E=require('../assets/engine.js'),bank=require('../data/theorems.json'),sources=require('../data/sources.json'),coverage=require('../data/coverage.json');
const okay=(a,b)=>assert.equal(E.compareFormula(a,b).ok,true,JSON.stringify({a,b,result:E.compareFormula(a,b)}));
const wrong=(a,b)=>assert.equal(E.compareFormula(a,b).ok,false,`${a} must not match ${b}`);
test('hint locations pair each notebook with its own weeks and deduplicate occurrences',()=>{
 const r={sources:[
  {sourceId:'a',locator:{line:12,section:'Week9.Module'}},
  {sourceId:'a',locator:{line:12,section:'Week9.Module'}},
  {sourceId:'a',locator:{line:4,section:'Equality'}},
  {sourceId:'b',locator:{line:8}}, {sourceId:'c'}, {sourceId:'missing'}
 ]};
 const locations=E.hintLocations(r,[
  {id:'a',name:'Exercise 2.4',year:2026,weeks:[2],url:'http://example.test:16014/'},
  {id:'b',name:'Homework',year:2025,weeks:[1,3]},
  {id:'c',name:'Unassigned',year:2026,weeks:[]}
 ],{a:[2,2]});
 assert.equal(locations.length,3);
 assert.deepEqual(locations.find(s=>s.sourceId==='a').weeks,[2]);
 assert.deepEqual(locations.find(s=>s.sourceId==='a').lines,[4,12]);
 assert.deepEqual(locations.find(s=>s.sourceId==='a').sections,['Week9.Module','Equality']);
 assert.deepEqual(locations.find(s=>s.sourceId==='b').weeks,[1,3]);
 assert.deepEqual(locations.find(s=>s.sourceId==='c').weeks,[]);
 assert.deepEqual(E.hintLocations({},[]),[]);
});
test('CalcCheck aliases, boundaries, command assignment ≠ substitution',()=>{
 assert.equal(E.normalizeInput(String.raw`p \land q \implies p \lor q`),'p ∧ q ⇒ p ∨ q');
 assert.equal(E.normalizeInput(String.raw`x := 1`),'x := 1');
 assert.equal(E.normalizeInput(String.raw`x \:= 1`),'x ≔ 1');
 assert.equal(E.normalizeInput(String.raw`\in \int \implies`),'∈ ℤ ⇒');
 wrong('(p ≡ q) = (p = q)','(p ≡ q) ≡ (p ≡ q)');
});
test('every backslash command is convertible and can be suggested for symbol practice',()=>{
 for(const [code,symbol] of Object.entries(E.SHORTCUTS)){
  assert.equal(E.normalizeInput(code),symbol,code);
  assert(E.shortcutSuggestions(code).some(x=>x.key===code&&x.symbol===symbol),code);
  assert.deepEqual(E.shortcutPrefix(`p ${code}`),{start:2,prefix:code});
 }
 assert(E.shortcutSuggestions('\\lan').some(x=>x.key==='\\land'));
 assert(E.eligibleModes({formula:'p ∧ q'},['symbol']).includes('symbol'));
 assert(!E.eligibleModes({formula:'true'},['symbol']).includes('symbol'));
 const q=E.makeSession([{id:'s',formula:'p ∧ q'}],['symbol'],1,()=>0.5);
 assert.equal(q[0].mode,'symbol');
});
test('every special symbol blank has a backslash input command',()=>{
 const t=E.clozeTemplate('p ≡ q ≢ r ⇒ s ⇐ t ∧ u ∨ v ¬ w ≠ x ≤ y ≥ z ∈ a ∉ b ⊆ c ⊂ d ⊇ e ⊃ f ∪ g ∩ h ∖ i ∀ j ∃ k');
 const available=new Set(Object.values(E.SHORTCUTS));
 for(const {correct} of t.blanks)assert(available.has(correct),correct);
 assert.equal(E.normalizeInput(String.raw`A \setminus B`),'A ∖ B');
});
test('backslash suggestions open immediately and narrow as the command is typed',()=>{
 const suggestions=E.shortcutSuggestions('\\');
 assert.equal(suggestions.length,20);
 assert(suggestions.every(({key,symbol})=>E.SHORTCUTS[key]===symbol));
 assert.deepEqual(E.shortcutSuggestions('\\',3),suggestions.slice(0,3));
 const letterMatches=E.shortcutSuggestions('\\l');
 assert(letterMatches.length>0);
 assert(letterMatches.every(({key})=>key.toLowerCase().startsWith('\\l')));
 assert(letterMatches.some(({key})=>key==='\\land'));
 assert.deepEqual(E.shortcutSuggestions('\\L'),letterMatches);
 for(const prefix of ['', 'land', '\\unknown', '\\l ', null])assert.deepEqual(E.shortcutSuggestions(prefix),[]);
});
test('shortcut prefixes follow the caret and ignore later text',()=>{
 assert.deepEqual(E.shortcutPrefix('p \\'),{start:2,prefix:'\\'});
 assert.deepEqual(E.shortcutPrefix('p \\land q',3),{start:2,prefix:'\\'});
 assert.deepEqual(E.shortcutPrefix('p \\land q',4),{start:2,prefix:'\\l'});
 assert.deepEqual(E.shortcutPrefix('p \\land q',6),{start:2,prefix:'\\lan'});
 assert.deepEqual(E.shortcutPrefix('p \\land \\l'),{start:8,prefix:'\\l'});
 assert.equal(E.shortcutPrefix('p \\land q',2),null);
 assert.equal(E.shortcutPrefix('p \\land q'),null);
 assert.equal(E.shortcutPrefix('p \\unknown'),null);
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
 wrong('p ∧ q ≡ q ∧ p','p ∧ q ≡ p ∧ q');
 wrong('(a + b) + c = a + (b + c)','(a + b) + c = (a + b) + c');
 wrong('a ≥ b ≡ b ≤ a','b ≤ a ≡ b ≤ a');
 wrong('p ⇒ (q ⇒ r)','(p ⇒ q) ⇒ r');
 wrong('A × B = B × A','B × A = A × B ≡ true');
});
test('valid reassociation and symmetry accept alternate brackets without reordering noncommutative operations',()=>{
 okay('(Q ⨾ R) ⨾ S = Q ⨾ (R ⨾ S)','Q ⨾ (R ⨾ S) = (Q ⨾ R) ⨾ S');
 okay('(Q ⊕ R) ⊕ S = Q ⊕ (R ⊕ S)','(A ⊕ B ⊕ C) = A ⊕ (B ⊕ C)');
 okay('(xs ⌢ ys) ⌢ zs = xs ⌢ (ys ⌢ zs)','xs ⌢ ys ⌢ zs = xs ⌢ (ys ⌢ zs)');
 okay('p ∧ (q ∧ r) ≡ (p ∧ q) ∧ r','(x ∧ y) ∧ z ≡ x ∧ (y ∧ z)');
 wrong('Q ⨾ R ⨾ S = Q ⨾ (R ⨾ S)','Q ⨾ R ⨾ S = Q ⨾ (S ⨾ R)');
 wrong('(Q ⊕ R) ⊕ S = Q ⊕ (R ⊕ S)','(Q ⊕ S) ⊕ R = Q ⊕ (R ⊕ S)');
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
test('shared theorem names accept the group, while numbered answers identify the exact result',()=>{
 const a=bank.find(r=>r.numbers.includes('3.47a'));
 const b=bank.find(r=>r.numbers.includes('3.47b'));
 assert(E.nameGroup(bank,a).some(r=>r.id===b.id));
 assert.equal(E.gradeName(bank,a,{typed:'De Morgan'}).ok,true);
 assert.equal(E.gradeName(bank,a,{groupSelected:true}).ok,true);
 assert.equal(E.gradeName(bank,a,{selectedId:b.id}).ok,false);
 assert.equal(E.gradeName(bank,a,{typed:'(3.47b) De Morgan'}).ok,false);
 assert.equal(E.gradeName(bank,a,{typed:'(3.47a) De Morgan'}).ok,true);
 const alias=bank.find(r=>r.numbers.includes('11.42a'));
 assert.equal(E.gradeName(bank,alias,{typed:'Complement of ∪'}).ok,true);
 assert.equal(E.gradeName(bank,alias,{typed:'(11.42b) Complement of ∪'}).ok,false);
 const replacements=bank.filter(r=>r.name==='Replacement'&&r.numbers.includes('3.84c'));
 assert.equal(replacements.length,2);
 assert.equal(E.gradeName(bank,replacements[0],{selectedId:replacements[1].id}).ok,true);
 const negation=bank.find(r=>r.numbers.includes('15.20')&&r.name==='Negation as multiplication');
 assert(negation);
 assert.equal(E.gradeName(bank,negation,{typed:'15.20'}).ok,true);
 const reused=bank.find(r=>r.id==='p-a335d3c954a2');
 assert.equal(E.gradeName(bank,reused,{typed:reused.displayRef}).ok,true);
 const unnamed=bank.find(r=>r.numbers.includes('11.47'));
 assert.equal(unnamed.name,'原文未命名');
 assert.equal(E.gradeName(bank,unnamed,{typed:'原文未命名'}).ok,false);
 assert.equal(E.gradeName(bank,unnamed,{typed:'11.47'}).ok,true);
});
test('name completions rank actual names and alias prefixes without adding references or formulas',()=>{
 const records=[
  {id:'contains',name:'A Golden rule',aliases:[],numbers:['3.47'],displayRef:'(3.47)',formula:'p Golden q'},
  {id:'prefix',name:'Golden rule variant',aliases:['The gold law'],numbers:['3.48'],displayRef:'(3.48)'},
  {id:'exact',name:'Golden rule',aliases:['Gold law'],numbers:['3.49'],displayRef:'(3.49)'},
  {id:'shared',name:'Golden rule',aliases:['Gold law'],numbers:['3.50'],displayRef:'(3.50)'}
 ];
 assert.deepEqual(E.nameCompletions(records,'Golden rule'),['Golden rule','Golden rule variant']);
 assert.deepEqual(E.nameCompletions(records,'gold law'),['Gold law']);
 assert.deepEqual(E.nameCompletions([{name:'A Golden rule',aliases:['The gold law']}],'Golden'),[]);
 assert.deepEqual(E.nameCompletions(records,'Golden rule',2),['Golden rule','Golden rule variant']);
 assert.deepEqual(E.nameCompletions(records,'3.47'),[]);
 assert.deepEqual(E.nameCompletions(records,'p Golden q'),[]);
 assert.deepEqual(E.nameCompletions(records,'unknown'),[]);
 for(const record of records.slice(2))assert.equal(E.gradeName(records,record,{typed:'Golden rule'}).ok,true);
 assert.equal(E.gradeName(records,records[2],{typed:'Gold law'}).ok,true);
});
test('name completions preserve the raw three-character threshold and exclude unnamed or numeric candidates',()=>{
 const records=[
  {name:'Law',aliases:['Other law','123','11.47','原文未命名','']},
  {name:'law',aliases:['other LAW']},
  {name:'原文未命名',aliases:['Secret law']},
  {name:'',aliases:['Empty law']},
  {aliases:['Missing law']},
  {name:'123',aliases:[]}
 ];
 for(const query of ['',null,'La','😀'])assert.deepEqual(E.nameCompletions(records,query),[]);
 assert.deepEqual(E.nameCompletions(records,'  L'),['Law']);
 assert.deepEqual(E.nameCompletions(records,'LAW'),['Law']);
 for(const query of ['   ','Secret','Empty','Missing','原文未','123','11.47'])assert.deepEqual(E.nameCompletions(records,query),[]);
});
test('published theorem completions contain names and aliases only, with shared names offered once',()=>{
 assert.deepEqual(E.nameCompletions(bank,'3.47'),[]);
 assert.deepEqual(E.nameCompletions(bank,'原文未'),[]);
 const complements=E.nameCompletions(bank,'Complement of ∪');
 assert(complements.includes('Complement of ∪'));
 const deMorgan=E.nameCompletions(bank,'De Morgan');
 assert.equal(deMorgan.filter(name=>E.normalizeName(name)===E.normalizeName('De Morgan')).length,1);
 const known=new Set(bank.filter(r=>r.name&&r.name!=='原文未命名').flatMap(r=>[r.name,...(r.aliases||[])]));
 for(const query of ['De Morgan','Complement','Identity','Strengthening']){
  const names=E.nameCompletions(bank,query);
  assert(names.length>0,query);
  assert(names.every(name=>known.has(name)),query);
  assert.equal(new Set(names.map(E.normalizeName)).size,names.length,query);
 }
});
test('complex formulas are less likely to use free spelling when other modes are enabled',()=>{
 const long={id:'long',formula:'(∀ x ❙ R • (∀ y ❙ Q • P )) ≡ (∀ x ❙ R • (∀ y ❙ Q • P ))'};
 const short={id:'short',formula:'p ∧ q ≡ q ∧ p'};
 assert.equal(E.makeSession([long],['formula','choice'],1,()=>0.3)[0].mode,'choice');
 assert.equal(E.makeSession([short],['formula','choice'],1,()=>0.3)[0].mode,'formula');
 assert.equal(E.makeSession([long],['formula'],1,()=>0.3)[0].mode,'formula');
});
test('answer feedback includes every name, reference and formula with the current variant first',()=>{
 const a={id:'a',name:'Law',aliases:['Other name','Law'],numbers:['1a','1'],displayRef:'(1a)',formula:'p ∧ q',formulaVariants:['p ∧ q','q ∧ p'],sideCondition:'p is Boolean'};
 const b={id:'b',name:'law',aliases:['Second name'],numbers:['1b'],displayRef:'(1b)',formula:'p ∨ q',variantLabel:'disjunction'};
 const unrelated={...b,id:'c',name:'Different law'};
 assert.deepEqual(E.answerVariants([b,unrelated,a],a),[
  {id:'a',names:['Law','Other name'],references:['(1a)','(1)'],formulas:['p ∧ q','q ∧ p'],variantLabel:'',sideCondition:'p is Boolean'},
  {id:'b',names:['law','Second name'],references:['(1b)'],formulas:['p ∨ q'],variantLabel:'disjunction',sideCondition:''}
 ]);
 assert.deepEqual(E.answerVariants([],{id:'legacy',name:'Single',formula:'p'}),[
  {id:'legacy',names:['Single'],references:[],formulas:['p'],variantLabel:'',sideCondition:''}
 ]);
 const unnamed={...a,id:'unnamed',name:'原文未命名'};
 assert.equal(E.answerVariants([unnamed,{...unnamed,id:'other'}],unnamed).length,1);
});
test('symbol cloze requires multiple blanks and grades every occurrence',()=>{
 const formula='¬ (p ∧ q) ≡ ¬ p ∨ ¬ q',t=E.clozeTemplate(formula,()=>0);
 assert.equal(t.blanks.length,3);
 for(const b of t.blanks){assert.equal(t.tokens[b.index],b.correct);assert(t.options.includes(b.correct));}
 const values=t.blanks.map(b=>b.correct);
 assert(E.gradeCloze(t,values));
 assert.equal(E.fillCloze(t,values),E.tokenize(formula).join(' '));
 for(let i=0;i<values.length;i++){const wrong=values.slice();wrong[i]=t.options.find(x=>x!==values[i]);assert(!E.gradeCloze(t,wrong));}
 assert(!E.gradeCloze(t,values.slice(1)));
 assert(!E.gradeCloze(t,[...values,'∧']));
 const incomplete=values.slice();incomplete[1]='';assert.equal(E.fillCloze(t,incomplete),null);
 assert.equal(E.clozeTemplate('true'),null);
 assert.equal(E.clozeTemplate('p ∧ q'),null);
 assert(!E.eligibleModes({formula:'p ∧ q'},['cloze']).includes('cloze'));
 assert(E.eligibleModes({formula},['cloze']).includes('cloze'));
 assert.equal(E.makeSession([{id:'x',formula}],['cloze'],1,()=>0.5)[0].mode,'cloze');
});
test('queue only draws checked modes and current scope',()=>{
 const small=bank.filter(E.isQuestionCard).slice(0,12),q=E.makeSession(small,['choice','formula'],12,()=>0.4);
 assert.equal(q.length,12);assert.equal(new Set(q.map(t=>t.id)).size,12);
 assert(q.every(t=>['choice','formula'].includes(t.mode)&&small.some(r=>r.id===t.id)));
 const t={id:'true',formula:'true'};
 assert.throws(()=>E.makeSession([t],['blanks'],1));assert.throws(()=>E.makeSession(small,[],1));
});
test('inference rules never become questions',()=>{
 const rules=bank.filter(r=>/inference rule/i.test(r.kind));
 assert(rules.length>=9);
 assert(rules.every(r=>!E.isQuestionCard(r)));
 assert.equal(bank.filter(E.isQuestionCard).length,bank.length-rules.length);
 assert(E.makeSession(bank,['name','choice','blanks','formula','symbol'],100,()=>0.4).every(q=>E.isQuestionCard(bank.find(r=>r.id===q.id))));
 assert.throws(()=>E.makeSession(rules,['choice'],1));
});
test('each card appears at most twice, including mixed modes and small scopes',()=>{
 const cards=[{id:'a',formula:'p ∧ q'},{id:'b',formula:'p ∨ q'}];
 for(const options of [{},{mobile:true},{modesForRecord:r=>r.id==='a'?['formula']:['choice']}]){
  const queue=E.makeSession(cards,['choice','formula'],20,()=>0.4,2,options);
  assert.equal(queue.length,4);
  for(const r of cards)assert.equal(queue.filter(q=>q.id===r.id).length,2);
 }
 assert.equal(E.makeSession([cards[0]],['formula'],10).length,2);
 const proof={id:'proof',formula:'p',proof:{answers:['Law']}};
 const queue=E.makeSession([...cards,proof],['formula','proof'],20,()=>0.4);
 assert.equal(queue.length,6);assert.equal(queue.filter(q=>q.id==='proof').length,2);
});
test('delayed retry replaces a scheduled occurrence and stops after the second appearance',()=>{
 const first={id:'a',mode:'symbol',retry:0,symbol:'∧'};
 const queue=[first,...['b','c','d','e'].map(id=>({id,mode:'name',retry:0})),{id:'a',mode:'formula',retry:0}];
 const retried=E.retryQuestion(queue,0);
 assert.equal(retried.length,queue.length);
 assert.deepEqual(retried[4],{...first,retry:1});
 assert.deepEqual(retried.filter(q=>q.id==='a').map(q=>q.mode),['symbol','symbol']);
 assert.equal(E.retryQuestion(retried,4).filter(q=>q.id==='a').length,2);
 assert.equal(E.retryQuestion([first],0).length,2);
});
test('resuming old quests removes excess pending occurrences and preserves feedback',()=>{
 const q=(id,mode='name')=>({id,mode,retry:0});
 const state={checked:true,feedback:{ok:false}};
 const session={queue:[q('a'),q('a','formula'),q('a','choice'),q('b')],index:1,state};
 const capped=E.limitSessionOccurrences(session);
 assert.deepEqual(capped.queue.map(q=>q.id),['a','a','b']);
 assert.equal(capped.index,1);assert.equal(capped.state,state);
 const exhausted=E.limitSessionOccurrences({...session,index:2,state:{checked:false,typed:'old answer'}});
 assert.deepEqual(exhausted.queue.map(q=>q.id),['a','a','b']);
 assert.equal(exhausted.index,2);assert.equal(exhausted.state,null);
 const legacyId='p-b1df9f7082d5',id=E.canonicalId(legacyId);
 assert.equal(E.limitSessionOccurrences({queue:[q(legacyId),q(id),q(legacyId)],index:0,state:null}).queue.length,2);
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
test('merged unnamed card IDs retain saved progress and stars',()=>{
 const oldId='p-b1df9f7082d5',newId='t-d212aba8ab10';
 const p=E.freshProgress();
 E.applyAttempt(p,oldId,'name',false,'15.20');p.stars=[oldId];
 const restored=E.validateProgress(p,bank.map(r=>r.id));
 assert(restored.records[newId]?.active);
 assert.deepEqual(restored.stars,[newId]);
 assert.equal(restored.records[oldId],undefined);
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

test('choice difficulty increases distractor similarity and keeps answer positions shuffled',()=>{
 const card=(id,name,formula,topic='logic')=>({id,name,formula,topic,displayRef:`(${id})`});
 const target=card('target','Distributivity of conjunction over disjunction','p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)');
 const pool=[target,
  card('a','Distributivity of conjunction over disjunction','p ∧ (q ∨ r) ⇒ p'),
  card('b','Distributivity of disjunction over conjunction','p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r)'),
  card('c','Distributivity of implication over conjunction','p ⇒ (q ∧ r) ≡ (p ⇒ q) ∧ (p ⇒ r)'),
  card('d','Associativity of conjunction','p ∧ (q ∧ r) ≡ (p ∧ q) ∧ r'),
  card('e','Commutativity of disjunction','p ∨ q ≡ q ∨ p'),
  card('f','Absorption','p ∧ (p ∨ q) ≡ p'),
  card('g','Successor','suc n = n + 1','natural'),
  card('h','Zero','n + 0 = n','natural'),
  card('i','Predecessor','pred (suc n) = n','natural')];
 const scores=[1,2,3].map(level=>{
  const options=E.choiceOptions(pool,target,level,()=>0.3);
  assert.equal(options.length,4);assert.equal(options.filter(r=>r.id===target.id).length,1);
  assert.equal(new Set(options.map(E.label)).size,4);
  return options.filter(r=>r.id!==target.id).reduce((sum,r)=>sum+E.choiceSimilarity(target,r),0);
 });
 assert(scores[0]<scores[1]&&scores[1]<scores[2],scores.join(','));
 assert(E.choiceOptions(pool,target,3,()=>0.3).some(r=>r.id==='a'));
 const positions=new Set([0.1,0.4,0.7,0.99].map(seed=>E.choiceOptions(pool,target,3,()=>seed).findIndex(r=>r.id===target.id)));
 assert(positions.size>1);
});
test('choice distractors exclude equivalent formulas, variants, duplicate labels and inference rules',()=>{
 const target={id:'target',name:'Law',displayRef:'(1)',formula:'p ∧ q ≡ q ∧ p',formulaVariants:['p ∨ q ≡ q ∨ p']};
 const other={id:'other',name:'Other',displayRef:'(2)',formula:'p ⇒ q'};
 const pool=[target,{id:'alpha',name:'Renamed',displayRef:'(3)',formula:'x ∧ y ≡ y ∧ x'},
  {id:'variant',name:'Variant',displayRef:'(4)',formula:'x ∨ y ≡ y ∨ x'},
  {id:'rule',name:'Rule',displayRef:'(5)',formula:'p ∧ q ⇒ p',kind:'inference rule'},other,{...other,id:'duplicate'}];
 for(const level of [1,2,3]){
  assert.deepEqual(new Set(E.choiceOptions(pool,target,level,()=>0.4).map(E.label)),new Set([E.label(target),E.label(other)]));
 }
 assert.deepEqual(E.choiceOptions([target],target,3),[target]);
 assert.deepEqual(E.choiceOptions(pool,target,999,()=>0.4),E.choiceOptions(pool,target,2,()=>0.4));
});

test('hard choice excludes foundational questions and distractors without affecting other modes',()=>{
 const basics=['Associativity of conjunction','Symmetry of equality','Reflexivity of implication','结合律','自反性','对称性'];
 const simple=basics.map((name,i)=>({id:'basic'+i,name,displayRef:`(${i})`,formula:'p ∧ q ≡ q ∧ p'}));
 const target={id:'advanced',name:'Golden rule',displayRef:'(9)',formula:'p ∧ q ≡ p ≡ q ≡ p ∨ q'};
 const pool=[...simple,target];
 assert(simple.every(E.isFoundationalTheorem));
 assert(E.isFoundationalTheorem({...target,aliases:['Reflexivity']}));
 assert.equal(E.isFoundationalTheorem(target),false);
 assert(E.makeSession(pool,['choice'],20,()=>0.4,3).every(q=>q.id===target.id));
 assert.deepEqual(E.choiceOptions(pool,target,3),[target]);
 assert(E.choiceOptions(pool,target,1,()=>0.4).length>1);
 assert(E.makeSession(simple,['choice'],2,()=>0.4,2).length===2);
 assert.throws(()=>E.makeSession(simple,['choice'],2,()=>0.4,3),/没有适合/);
 assert(E.makeSession(simple,['choice','formula'],5,()=>0.4,3).every(q=>q.mode==='formula'));
});

test('letter blanks preserve each occurrence even when a swapped formula is equivalent',()=>{
 const template=E.blankTemplate('(p ∨ q) ∨ r ≡ p ∨ (q ∨ r)');
 assert(E.gradeBlanks(template,['x','y','z','x','y','z']).ok);
 assert(!E.gradeBlanks(template,['x','y','z','y','x','z']).ok);
 assert(!E.gradeBlanks(template,['x','x','z','x','x','z']).ok);
 assert(!E.gradeBlanks(template,['x','y','z','x','y','true']).ok);
 assert(!E.gradeBlanks(template,['x']).ok);
});
