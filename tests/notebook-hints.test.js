const {test}=require('node:test');
const assert=require('node:assert/strict');
const E=require('../assets/engine.js');
const data=require('../data/notebook-hints.json');
test('notebook scope uses actual hints and recomputes repetition locally',()=>{
 const group={id:'g',label:'Rule',theoremIds:['card'],candidateTheoremIds:[]};
 const n=(port,year,weeks,count)=>({sourceId:`n${port}`,port,year,weeks,groupCounts:{g:count},theoremCounts:{card:count},hintUses:Array.from({length:count},(_,i)=>({id:`${port}-${i}`,groups:[group]}))});
 const d={groups:[group],notebooks:[n(1,2026,[1],1),n(2,2026,[2],2),n(3,2025,[2],4)]};
 assert.equal(E.notebookHintRows(d,{era:'2026'})[0].hintCount,3);
 const local=E.notebookHintRows(d,{notebook:'1'})[0];
 assert.equal(local.hintCount,1);assert.equal(local.uses.length,1);assert.equal(local.notebookCount,1);
 assert.equal(E.notebookHintRows(d,{era:'2026',week:'2'})[0].hintCount,2);
 assert.equal(E.notebookHintCardCounts(d,{era:'2026',week:'2',weekMode:'through'}).get('card'),3);
 assert.equal(E.notebookHintRows(d,{notebook:'unknown'}).length,0);
});
test('real hint inventory preserves source coverage and excludes ambiguous card guesses',()=>{
 assert.equal(new Set(data.notebooks.map(n=>`${n.year}:${n.port}`)).size,data.notebooks.length);
 assert.equal(data.notebooks.reduce((s,n)=>s+n.hintUses.length,0),data.summary.hintCount);
 for(const n of data.notebooks){
  const precise={};
  for(const u of n.hintUses)for(const id of new Set(u.theoremIds))precise[id]=(precise[id]||0)+1;
  assert.deepEqual(n.theoremCounts,precise);
  for(const u of n.hintUses)for(const g of u.groups)if(g.status==='ambiguous')assert.equal(g.theoremIds.length,0);
  if(n.status==='not-captured')assert.equal(n.hintUses.length,0);
 }
 const rows=E.notebookHintRows(data,{era:'all'});
 assert.equal(rows.length,data.groups.length);
 for(const g of rows)assert.equal(g.hintCount,g.uses.length);
});
