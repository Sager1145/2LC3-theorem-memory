#!/usr/bin/env node
/* Finalise the extracted corpus without inventing theorem statements or numbers.
 * Usage: node tools/finalize_bank.js path/to/raw-bank [output-root]
 */
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const ROOT=path.resolve(__dirname,'..'),E=require('../assets/engine.js');
const input=path.resolve(process.argv[2]||'.build/raw-bank'),output=path.resolve(process.argv[3]||ROOT);
const read=n=>JSON.parse(fs.readFileSync(path.join(input,n+'.json'),'utf8'));
const hash=s=>crypto.createHash('sha256').update(s).digest('hex').slice(0,12);
let raw=read('theorems'),sources=read('sources'),review=read('review-candidates'),coverage=read('coverage');
const curated=JSON.parse(fs.readFileSync(path.join(__dirname,'curations.json'),'utf8'));
if(!sources.some(s=>s.id==='indexed-week2-speech'))sources.push({id:'indexed-week2-speech',name:'COMPSCI_2LC3_Week2_Full_Notebook.tex [indexed text only]',format:'tex',status:'indexed-partial-read',lineage:'Week 2 notes',pages:0,charactersRead:null,declarations:2,candidates:0,rawBytesAvailable:false});
sources.push({id:'conversation-20260929-disjoint',name:'2026-09-29 · 用户提供的 Disjoint case analysis 定理声明',format:'conversation',status:'provided-declaration',lineage:'Provided 2LC3 conversation',pages:0,charactersRead:44,declarations:1,candidates:0,rawBytesAvailable:false});
const sourceMap=new Map(sources.map(s=>[s.id,s]));
const unique=a=>[...new Set(a)];
const uniqueObjs=a=>[...new Map(a.map(x=>[JSON.stringify(x),x])).values()];
const cleanFormula=s=>E.normalizeInput(s.replace(/`/g,''));
for(const r of raw){r.formula=cleanFormula(r.formula);r.formulaVariants=[r.formula];r.kinds=[r.kind];}
for(const c of curated){
 if(!sourceMap.has(c.sourceId))throw new Error('Unknown curation source: '+c.sourceId);
 const family=sourceMap.get(c.sourceId).lineage||c.sourceId;
 raw.push({...c,id:'t-'+hash(c.numbers.join('|')+'|'+c.name+'|'+c.formula),formulaVariants:[c.formula],kinds:[c.kind],
  sources:[{sourceId:c.sourceId,locator:c.locator,excerpt:`${c.numbers.map(n=>'('+n+')').join(' ')} “${c.name}”: ${c.formula}`,curation:c.curation}],
  importantEvidence:[],emphasisEvidence:[],frequencyByFamily:{[family]:1},proofFrequencyByFamily:{},countLowerBound:true});
}
function primary(r){return r.numbers?.length?r.numbers[r.numbers.length-1]:'';}
function names(r){return [r.name,...r.aliases].map(E.normalizeName).filter(x=>x!=='原文未命名');}
function canMerge(a,b){
 const x=primary(a),y=primary(b);
 if(x&&y&&x!==y)return false;
 if(!(x&&y)&&!names(a).some(n=>names(b).includes(n)))return false;
 // Same spellings over different domains remain separate when the type matters.
 if(a.domain&&b.domain&&a.domain!==b.domain)return false;
 return E.compareFormula(a.formula,b.formula).ok;
}
const bank=[],merges=[];
for(const r of raw){
 const previous=bank.find(t=>canMerge(t,r));
 if(!previous){bank.push(r);continue;}
 merges.push({removedId:r.id,keptId:previous.id,reason:'same reference / alias family and schema-equivalent formula'});
 const p=previous;
 if(p.name==='原文未命名'&&r.name!=='原文未命名')p.name=r.name;
 p.aliases=unique([...p.aliases,...r.aliases,r.name]).filter(x=>x!==p.name&&x!=='原文未命名');
 p.numbers=unique([...p.numbers,...r.numbers]).sort(E.compareRefs);
 p.sources=uniqueObjs([...p.sources,...r.sources]);p.formulaVariants=unique([...p.formulaVariants,...r.formulaVariants]);
 p.kinds=unique([...p.kinds,...r.kinds]);p.current=p.current||r.current;
 p.importantEvidence=uniqueObjs([...p.importantEvidence,...r.importantEvidence]);p.emphasisEvidence=uniqueObjs([...p.emphasisEvidence,...r.emphasisEvidence]);
 for(const field of ['frequencyByFamily','proofFrequencyByFamily']){
  p[field]||={};for(const [key,n]of Object.entries(r[field]||{}))p[field][key]=Math.max(p[field][key]||0,n);
 }
 if(!p.domain&&r.domain)p.domain=r.domain;
}
const natNames=new Set(['Monus exchange','Zero sum','Zero is least element','Zero is unique least element','Subtraction from zero']);
for(const r of bank){
 if(!r.domain){
  if(/\b(suc|pred|double|even|odd)\b/.test(r.formula)||natNames.has(r.name)){r.domain='ℕ（减法为截断减法）';r.topic='自然数与归纳';}
  else if(r.numbers.some(n=>n.startsWith('15.'))||r.topic==='整数与代数')r.domain='ℤ';
  else if(/⇒⁅|⊦|≔/.test(r.formula))r.domain='按原式类型与替换条件';
  else if(/\bpos\b|≤|≥/.test(r.formula))r.domain='ℤ / ℕ；保持原模块类型';
  else if(r.numbers.some(n=>n.startsWith('3.'))||/≡|⇒|∧|∨/.test(r.formula))r.domain='𝔹 或原式指定类型';
  else r.domain='按原模块类型';
 }
 if(r.name==='Monus exchange'||r.name==='Subtraction from zero'||r.name==='Zero sum')r.sideCondition='本条采用自然数 ℕ；a - b 表示 max(a - b, 0)，不是整数减法。';
 r.occurrences=Object.values(r.frequencyByFamily||{}).reduce((a,b)=>a+b,0)||r.sources.length;
 r.proofMentions=Object.values(r.proofFrequencyByFamily||{}).reduce((a,b)=>a+b,0);
 r.documentCount=Object.keys(r.frequencyByFamily||{}).length;
 r.important=r.importantEvidence.length>0;r.repeated=r.occurrences>1;r.priority=r.emphasisEvidence.length>0;
 r.displayRef=r.numbers.length?(r.numbers.every(x=>/^\d+$/.test(x))?'局部题号 ':'')+'('+primary(r)+')':'未编号 · '+r.id.slice(2,8);
 if(primary(r)==='3.84c')r.variantLabel=r.formula.includes('(e ≡ f)')?'含 ≡ 的替换':'含 = 的替换';
 if(primary(r)==='3.87.1')r.variantLabel=r.formula.includes('false')?'替换为 false':'替换为 true';
}
// Archive reviewed fragments explicitly; do not claim that the remaining PDFs are fully transcribed.
const reviewed=[];
review=review.filter(c=>{
 const hit=curated.find(r=>r.sourceId===c.source.sourceId&&r.locator.page===c.source.locator?.page&&r.numbers.some(n=>c.numbers.includes(n)));
 if(hit){reviewed.push({...c,status:'covered-by-visual-curation'});return false;}return true;
});
bank.sort((a,b)=>a.topic.localeCompare(b.topic,'zh-Hans')||E.compareRefs(primary(a)||'999',primary(b)||'999')||a.name.localeCompare(b.name));
const unavailable=[
 {name:'Archive.zip',reason:'Project 原始字节未获授权，索引无可读正文；无法保证其中独有条目已收录。'},
 {name:'Week1_Rebuilt_LaTeX_Package_v4.zip',reason:'修订 ZIP 原始字节不可取得；早期 Week 1 两套 ZIP、笔记与附录已读取。'},
 {name:'Week2_Revised_Source_Bundle.zip / Week2_Source_Bundle.zip',reason:'前者原始字节不可取得；后者只发现元数据。Week 2 Full Notebook 的索引 814 行已读取，但不是完整原始归档。'},
 {name:'Week1_Proof_Theorem_Notebook.tex',reason:'原始字节不可取得；索引读取到 1050/1120 行，最后 70 行的后续读取未返回正文。'},
 {name:'A1_Full_Notebook.tex / A1_Lecture_Crosswalk.tex',reason:'Full Notebook 原始字节不可取得且索引未返回正文；Crosswalk 只发现元数据。'},
 {name:'Week1_Lectures_Reconstructed / Week1_Slides_Proof_Companion',reason:'发现修订文件元数据，未取得全文；可读的早期 Week 1 版本已纳入。'},
 {name:'Week2_Lecture_Notes / Week2_Slide_Companion',reason:'Lecture Notes 索引未返回正文；Slide Companion 只发现元数据。'},
 {name:'Week3_Full_Notebook / Week3_Lecture_Companion',reason:'这两个版本只发现元数据；可读的两个更新版 Week 3 + Midterm 笔记与 ZIP 已纳入。'}
];
coverage={...coverage,sourceFiles:sources.length,theoremCount:bank.length,currentCount:bank.filter(r=>r.current).length,historicalCount:bank.filter(r=>!r.current).length,reviewCount:review.length,importantCount:bank.filter(r=>r.important).length,repeatedCount:bank.filter(r=>r.repeated).length,curationCount:curated.length,mergedDuplicateCount:merges.length,formulaVariantCount:bank.reduce((n,r)=>n+r.formulaVariants.length,0),unavailable,
 curationNote:'81 条人工补录来自已目视核对的课件页或已读取的 Week 2 索引；另纳入 9 月 29 日对话中明确给出的 Disjoint case analysis。历史 PDF 其余自动提取仍有待核对候选；未核对内容不进入自动判题。同一官方编号的等价写法合并为一张卡，所有原写法保存在 formulaVariants；不同编号不因逻辑等价而合并。',
 countMethod:coverage.countMethod+' 人工补录条目的次数是已核对位置的下界，不是全文件精确引用次数；标为 ≥。未读材料不参与计数。'};
fs.mkdirSync(path.join(output,'data'),{recursive:true});fs.mkdirSync(path.join(output,'assets'),{recursive:true});
for(const [name,obj]of Object.entries({theorems:bank,sources,coverage,'review-candidates':review,'extraction-audit':{merges,reviewed}}))fs.writeFileSync(path.join(output,'data',name+'.json'),JSON.stringify(obj,null,2)+'\n');
const payload={theorems:bank,sources,coverage,review};
fs.writeFileSync(path.join(output,'assets/data.js'),'/* Generated from provenance-tracked course sources. */\nwindow.THEOREM_DATA = '+JSON.stringify(payload).replace(/</g,'\\u003c')+';\n');
console.log(JSON.stringify(coverage,null,2));
