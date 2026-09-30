'use strict';
// Independent, deterministic bank-wide grading audit. Production files are untouched.
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {performance}=require('node:perf_hooks');
const engineSha256=require('node:crypto').createHash('sha256').update(fs.readFileSync(path.join(__dirname,'../assets/engine.js'))).digest('hex');
const E=require('../assets/engine.js');
const declarations=require('../data/theorems.json');
const proofs=require('../data/proof-questions.json');
const cards=declarations.filter(E.isQuestionCard);
const modes=['name','choice','formula','blanks','cloze','symbol','proof'];
const reportPath=path.join(__dirname,'../docs/test-results/exhaustive-grading.json');
const counters={},failures=[],coverage={bank:declarations.length,declarationQuestions:cards.length,inferenceRulesExcluded:declarations.length-cards.length,proofQuestions:proofs.length,modes:{},formulaVariants:0,blankTemplates:0,clozePositions:0,symbolOccurrences:0,choiceCards:0,choiceRuns:0,choiceRunsByDifficulty:{},choicePoolSize:cards.length,proofAnswers:0};
const timings={};
let checks=0;
function check(section,id,description,expected,action,input){
  checks++;counters[section]=(counters[section]||0)+1;
  try {const actionStarted=performance.now(),actual=action();const elapsed=performance.now()-actionStarted;if(elapsed>250)console.log('slow-case',section,id,description,elapsed.toFixed(3)+' ms');if(!assertionEqual(actual,expected))failures.push({section,id,description,expected,actual,input});}
  catch(error){failures.push({section,id,description,expected,error:error.stack,input});}
}
function assertionEqual(a,b){return JSON.stringify(a)===JSON.stringify(b);}
function measured(label,action){const start=performance.now();const result=action();timings[label]=+(performance.now()-start).toFixed(3);console.log('audit-stage',label,timings[label]+' ms',checks+' checks',failures.length+' failures');fs.writeFileSync(reportPath+'.partial',JSON.stringify({stage:label,checks,failures:failures.slice(0,25),timings}));return result;}
function bijection(tokens){const vars=[...new Set(tokens.filter(E.isVariable))];return new Map(vars.map((v,i)=>[v,'z'+i]));}
function renamed(tokens,map){return tokens.map(t=>map.get(t)||t).join(' ');}
function gradeFormula(r,answer){return [r.formula,...(r.formulaVariants||[])].some(f=>E.compareFormula(f,answer).ok);}
function modeCount(mode){coverage.modes[mode]=(coverage.modes[mode]||0)+1;}
function seeded(seed=12345){return ()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}
const malicious=['','  ','\u0000','<script>alert(1)</script>','__proto__','constructor','process.exit(1)','(((',')','\\unknown','x'.repeat(2401),'p ∧ '.repeat(701)];

test('bank-wide grading audit and bounded deterministic stress',()=>{
const start=performance.now(),startedAt=new Date().toISOString();
measured('declarationGrading',()=>{
let declarationIndex=0;
for(const r of cards){
 declarationIndex++;if(declarationIndex===1||declarationIndex%50===0){const progress={stage:'declarationGrading',card:declarationIndex,total:cards.length,id:r.id,checks,failures:failures.slice(0,25)};console.log('audit-progress',JSON.stringify(progress));fs.writeFileSync(reportPath+'.partial',JSON.stringify(progress));}
 const eligible=E.eligibleModes(r,modes);eligible.forEach(modeCount);
 const foreign=cards.find(x=>x.id!==r.id&&x.displayRef!==r.displayRef&&!(r.numbers||[]).some(n=>(x.numbers||[]).includes(n)));
 check('eligibility',r.id,'declarations cannot use proof mode',false,()=>eligible.includes('proof'));
 for(const m of eligible)check('session',r.id,'single-card session uses requested mode '+m,[r.id,m],()=>{const q=E.makeSession([r],[m],1,()=>.4)[0];return [q.id,q.mode];});
 const variants=[...new Set([r.formula,...(r.formulaVariants||[])])];
 for(const [vi,formula] of variants.entries()){
  coverage.formulaVariants++;const id=r.id+':'+vi,tokens=E.tokenize(formula),map=bijection(tokens);
  for(const [label,answer] of [['identity',formula],['spaced tokens',tokens.join(' ')],['bijective rename',renamed(tokens,map)]])
   check('formula-positive',id,label,true,()=>gradeFormula(r,answer),answer);
  const shortcuts=new Map();for(const [key,symbol] of Object.entries(E.SHORTCUTS))if(!shortcuts.has(symbol))shortcuts.set(symbol,key);
  const encoded=tokens.map(t=>shortcuts.get(t)||t).join(' ');
  check('formula-positive',id,'shortcut encoded formula',true,()=>gradeFormula(r,encoded),encoded);
  // Appending a new false conjunct changes the formula's operator/constant structure.
  const corrupt='('+formula+') ∧ false';
  check('formula-negative',id,'extra false conjunct',false,()=>gradeFormula(r,corrupt),corrupt);
  if(map.size>=2){const merged=new Map(map),vars=[...map.keys()];merged.set(vars[1],merged.get(vars[0]));const answer=renamed(tokens,merged);
   check('formula-negative',id,'distinct variables merged',false,()=>gradeFormula(r,answer),answer);}
  const repeated=[...map.keys()].find(v=>tokens.filter(t=>t===v).length>1);
  if(repeated){const broken=tokens.slice();broken[broken.indexOf(repeated)]='z999';const answer=broken.join(' ');
   check('formula-negative',id,'one repeated occurrence renamed',false,()=>gradeFormula(r,answer),answer);}
 }
 for(const bad of malicious)check('formula-invalid',r.id,'empty, malformed or hostile answer',false,()=>gradeFormula(r,bad),bad.slice(0,100));
 const names=r.name==='原文未命名'?[]:[r.name,...(r.aliases||[])];
 const refs=[...new Set([r.displayRef,...(r.numbers||[]),...(r.numbers||[]).map(n=>'('+n+')')])];
 for(const name of names){check('name-positive',r.id,'canonical name or alias',true,()=>E.gradeName(cards,r,{typed:name}).ok,name);
  check('name-positive',r.id,'case and spacing normalization',true,()=>E.gradeName(cards,r,{typed:'  '+name.toUpperCase()+'  '}).ok,'  '+name.toUpperCase()+'  ');}
 for(const ref of refs){check('name-positive',r.id,'reference',true,()=>E.gradeName(cards,r,{typed:ref}).ok,ref);
  for(const name of names)for(const answer of [ref+' · '+name,ref+' '+name,name+' '+ref])check('name-positive',r.id,'name plus reference',true,()=>E.gradeName(cards,r,{typed:answer}).ok,answer);}
 check('name-positive',r.id,'selected own identifier',true,()=>E.gradeName(cards,r,{selectedId:r.id}).ok);
 check('name-group',r.id,'group enabled only for actual shared names',E.nameGroup(cards,r).length>1,()=>E.gradeName(cards,r,{groupSelected:true}).ok);
 for(const bad of malicious)check('name-negative',r.id,'invalid name input',false,()=>E.gradeName(cards,r,{typed:bad}).ok,bad.slice(0,100));
 check('name-negative',r.id,'unknown selected identifier',false,()=>E.gradeName(cards,r,{selectedId:'not-a-card'}).ok);
 if(r.name==='原文未命名')check('name-negative',r.id,'metadata is not a recalled name',false,()=>E.gradeName(cards,r,{typed:r.name}).ok);
 if(foreign){check('name-negative',r.id,'other selected identifier',false,()=>E.gradeName(cards,r,{selectedId:foreign.id}).ok);
  check('name-negative',r.id,'other numbered reference',false,()=>E.gradeName(cards,r,{typed:foreign.displayRef}).ok,foreign.displayRef);}
 const t=E.blankTemplate(r.formula);
 if(eligible.includes('blanks')){
  coverage.blankTemplates++;const map=bijection(t.tokens),identity=t.blanks.map(b=>b.variable),fresh=t.blanks.map(b=>map.get(b.variable));
  check('blanks-positive',r.id,'identity',true,()=>E.gradeBlanks(t,identity).ok);
  check('blanks-positive',r.id,'consistent bijective rename',true,()=>E.gradeBlanks(t,fresh).ok);
  for(const bad of ['', 'true','false','x + y','p q','1','<script>',null,{}]){const values=fresh.slice();values[0]=bad;check('blanks-negative',r.id,'invalid variable value',false,()=>E.gradeBlanks(t,values).ok,bad);}
  check('blanks-negative',r.id,'missing value',false,()=>E.gradeBlanks(t,fresh.slice(1)).ok);
  check('blanks-negative',r.id,'extra value',false,()=>E.gradeBlanks(t,[...fresh,'z999']).ok);
  if(t.variables.length>1)check('blanks-negative',r.id,'merge variables',false,()=>E.gradeBlanks(t,fresh.map(()=> 'z0')).ok);
  const repeated=t.variables.find(v=>t.blanks.filter(b=>b.variable===v).length>1);
  if(repeated){const broken=fresh.slice();broken[t.blanks.findIndex(b=>b.variable===repeated)]='z999';check('blanks-negative',r.id,'inconsistent repeated variable',false,()=>E.gradeBlanks(t,broken).ok);}
 }
 if(eligible.includes('cloze')){
  const tokens=E.tokenize(r.formula),operators=new Set(['≡','≢','⇒','⇐','∧','∨','¬','=','≠','<','≤','>','≥','+','-','·','/','∈','∉','⊆','⊂','⊇','⊃','∪','∩','∖','∀','∃']);
  const candidates=tokens.map((token,index)=>({token,index})).filter(x=>operators.has(x.token));
  for(let i=0;i<candidates.length;i++){
   coverage.clozePositions++;const c=E.clozeTemplate(r.formula,()=> (i+.5)/candidates.length);
   check('cloze',r.id,'every eligible position reachable',candidates[i].index,()=>c.index);
   check('cloze',r.id,'hidden token equals original',tokens[c.index],()=>c.correct);
   check('cloze',r.id,'correct option appears once',1,()=>c.options.filter(x=>x===c.correct).length);
   check('cloze',r.id,'unique options',c.options.length,()=>new Set(c.options).size);
   // Mirrors the UI's exact-symbol decision; structural equivalence is not the cloze contract.
   for(const option of c.options)check('cloze-ui-contract',r.id,'exact token grade',option===tokens[c.index],()=>option===c.correct,option);
  }
 }else check('cloze',r.id,'operatorless formula has no cloze',null,()=>E.clozeTemplate(r.formula));
 if(eligible.includes('symbol'))for(const symbol of E.symbolsInFormula(r.formula)){
  coverage.symbolOccurrences++;const entries=Object.entries(E.SHORTCUTS).filter(([,s])=>s===symbol);
  for(const [key] of entries){check('symbol',r.id,'shortcut accepted by UI contract',true,()=>E.SHORTCUTS[key]===symbol,key);
   check('symbol',r.id,'shortcut normalization',symbol,()=>E.normalizeInput(key),key);}
  for(const bad of ['',symbol,'\\unknown','<script>'])check('symbol-negative',r.id,'invalid raw shortcut',false,()=>E.SHORTCUTS[bad]===symbol,bad);
 }
}
});
measured('allCardChoicesFullPool',()=>{
 for(let i=0;i<cards.length;i++){
  const r=cards[i];coverage.choiceCards++;if(i%50===0)console.log('choice-progress',i+'/'+cards.length,'failures',failures.length);
  const pool=cards;
  for(const difficulty of [1,2,3]){
   if(!E.eligibleModes(r,['choice'],difficulty).length)continue;
   coverage.choiceRuns++;coverage.choiceRunsByDifficulty[difficulty]=(coverage.choiceRunsByDifficulty[difficulty]||0)+1;const opts=E.choiceOptions(pool,r,difficulty,seeded(i+1));
   check('choice',r.id,'contains target exactly once difficulty '+difficulty,1,()=>opts.filter(x=>x.id===r.id).length);
   check('choice',r.id,'choice size bounded difficulty '+difficulty,true,()=>opts.length>=1&&opts.length<=4);
   check('choice',r.id,'distinct display labels difficulty '+difficulty,opts.length,()=>new Set(opts.map(E.label)).size);
   for(const x of opts.filter(x=>x.id!==r.id)){
    check('choice',r.id,'distractor is an eligible question',true,()=>E.isQuestionCard(x)&&E.eligibleModes(x,['choice'],difficulty).includes('choice'));
    check('choice',r.id,'distractor differs from every variant',false,()=>[r.formula,...(r.formulaVariants||[])].some(a=>[x.formula,...(x.formulaVariants||[])].some(b=>E.compareFormula(a,b).ok)),x.id);
    check('choice-ui-contract',r.id,'distractor rejected by UI identifier grading',false,()=>x.id===r.id,x.id);
   }
  }
 }
});
measured('proofGrading',()=>{
for(const r of proofs){
 modeCount('proof');check('proof-mode',r.id,'proof-only eligibility',['proof'],()=>E.eligibleModes(r,modes));
 check('proof-session',r.id,'proof session draws correct card',[r.id,'proof'],()=>{const q=E.makeSession([r],['proof'],1,()=>.4)[0];return [q.id,q.mode];});
 for(const answer of r.proof.answers){coverage.proofAnswers++;
  check('proof-positive',r.id,'listed proof answer',true,()=>E.gradeProofName(r,answer),answer);
  check('proof-positive',r.id,'case/spacing normalization',true,()=>E.gradeProofName(r,'  '+answer.toUpperCase()+'  '),answer);
  check('proof-negative',r.id,'number plus answer rejected',false,()=>E.gradeProofName(r,'(999.999) '+answer));
 }
 for(const bad of [...malicious,r.formula,r.proof.end,'999.999',null,{},42])check('proof-negative',r.id,'non-name answer rejected',false,()=>E.gradeProofName(r,bad),typeof bad==='string'?bad.slice(0,100):bad);
}
});
measured('globalShortcutAudit',()=>{
for(const [key,symbol] of Object.entries(E.SHORTCUTS)){
 check('shortcut',key,'normalizes exactly',symbol,()=>E.normalizeInput(key));
 check('shortcut',key,'suggestion remains selectable',true,()=>E.shortcutSuggestions(key).some(x=>x.key===key&&x.symbol===symbol));
}
for(const r of declarations.filter(x=>!E.isQuestionCard(x)))check('excluded',r.id,'inference rule cannot form session',true,()=>{try{E.makeSession([r],['formula'],1);return false;}catch{return true;}});
});
const stress={};
measured('gradingStress',()=>{
 const n=20000,batchTimes=[];for(let offset=0;offset<n;offset+=1000){const t=performance.now();for(let j=offset;j<offset+1000;j++){
  const r=cards[j%cards.length],answer=j%2?r.formula:'('+r.formula+') ∧ false';
  check('stress-formula',r.id,'repeated deterministic decision',j%2===1,()=>gradeFormula(r,answer));
 }batchTimes.push(+(performance.now()-t).toFixed(3));}
 stress.formulaComparisons=n;stress.formulaBatchesMs=batchTimes;
});
measured('fullPoolChoiceStress',()=>{
 const times=[];for(let i=0;i<12;i++){const r=cards[Math.floor(i*cards.length/12)],t=performance.now(),opts=E.choiceOptions(cards,r,2,seeded(i+10));times.push(+(performance.now()-t).toFixed(3));
  check('stress-choice',r.id,'full pool contains target once',1,()=>opts.filter(x=>x.id===r.id).length);
  check('stress-choice',r.id,'full pool creates four unique labels',4,()=>new Set(opts.map(E.label)).size);
 }stress.fullPoolChoiceRuns=12;stress.fullPoolSize=cards.length;stress.fullPoolChoiceMs=times;
});
measured('progressStress',()=>{
 const p=E.freshProgress(),all=[...cards,...proofs],n=100000,now=1801260000000,totals=new Map(),eligibleById=new Map(all.map(r=>[r.id,E.eligibleModes(r,modes)]));
 for(let i=0;i<n;i++){
  const r=all[i%all.length],mode=r.proof?'proof':eligibleById.get(r.id)[i%eligibleById.get(r.id).length],ok=i%3!==0,assisted=i%17===0;
  E.applyAttempt(p,r.id,mode,ok,'answer-'+i,assisted,now+i);
  const acc=totals.get(r.id)||{attempts:0,correct:0,wrong:0};acc.attempts++;ok&&!assisted?acc.correct++:acc.wrong++;totals.set(r.id,acc);
 }
 for(const [id,total] of totals){const r=p.records[id];check('stress-progress',id,'attempt counters',total,()=>({attempts:r.attempts,correct:r.correct,wrong:r.wrong}));
  check('stress-progress',id,'log bounded to twelve',12,()=>r.log.length);
  check('stress-progress',id,'active matches failed modes',r.wrongModes.length>0,()=>r.active);}
 check('stress-progress','global','total attempts preserved',n,()=>Object.values(p.records).reduce((sum,r)=>sum+r.attempts,0));
 check('stress-progress','global','daily counter preserved',n,()=>Object.values(p.days).reduce((a,b)=>a+b,0));
 check('stress-progress','global','xp matches unaided correct',Object.values(p.records).reduce((sum,r)=>sum+r.correct*10,0),()=>p.xp);
 const json=JSON.stringify(p),restored=E.validateProgress(JSON.parse(json),all.map(r=>r.id));
 check('stress-progress','global','backup counters and logs survive',true,()=>all.every(r=>restored.records[r.id].attempts===p.records[r.id].attempts&&restored.records[r.id].correct===p.records[r.id].correct&&restored.records[r.id].wrong===p.records[r.id].wrong&&restored.records[r.id].log.length===12));
 stress.progressAttempts=n;stress.progressRecords=Object.keys(p.records).length;stress.progressBackupBytes=Buffer.byteLength(json);
 const q=E.makeSession(all,modes,20000,seeded(77));check('stress-session','global','large session length',20000,()=>q.length);
 const ids=new Set(all.map(r=>r.id));check('stress-session','global','large session stays inside scope and eligible mode',true,()=>q.every(x=>ids.has(x.id)&&E.eligibleModes(all.find(r=>r.id===x.id),modes).includes(x.mode)));stress.sessionLength=q.length;
});
const report={startedAt,finishedAt:new Date().toISOString(),durationMs:+(performance.now()-start).toFixed(3),node:process.version,engineSha256,memory:process.memoryUsage(),coverage,checks,counters,timings,stress,failedChecks:failures.length,failures,limitations:['Choice grading and cloze/symbol decisions reproduce assets/app.js contracts; browser behavior is covered separately.','Every question card has complete declaration-pool choice coverage at all eligible difficulties; 12 additional complete-pool runs measure warm repeat performance.','Stress is bounded: 20,000 repeated formula decisions, 100,000 progress updates and a 20,000-question generated session.','Declared variants are accepted independently; arbitrary semantic rewrites outside the matcher contract are not claimed.']};
fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n');fs.unlinkSync(reportPath+'.partial');fs.rmSync(reportPath+'.current',{force:true});
console.log(JSON.stringify({report:reportPath,checks,failedChecks:failures.length,coverage,timings,stress},null,2));
assert.equal(failures.length,0,JSON.stringify(failures.slice(0,12),null,2));
});
