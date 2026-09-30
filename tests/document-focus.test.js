const {test}=require('node:test');
const assert=require('node:assert/strict');
const E=require('../assets/engine.js');
test('document focus overrides repeated preloaded availability and distinguishes union from intersection',()=>{
 const rows=[
  {id:'neither',important:true,repeated:true,documentStudy:{important:false,repeated:false}},
  {id:'important',documentStudy:{important:true,repeated:false}},
  {id:'repeated',documentStudy:{important:false,repeated:true}},
  {id:'both',documentStudy:{important:true,repeated:true}}
 ];
 const ids=focus=>rows.filter(r=>E.documentFocusMatches(r,focus)).map(r=>r.id);
 assert.deepEqual(ids('all'),['neither','important','repeated','both']);
 assert.deepEqual(ids('important'),['important','both']);
 assert.deepEqual(ids('repeated'),['repeated','both']);
 assert.deepEqual(ids('priority'),['important','repeated','both']);
 assert.deepEqual(ids('both'),['both']);
});
test('unannotated older data remains readable but does not claim document evidence',()=>{
 assert(!E.documentFocusMatches({important:true},'important'));
 assert(!E.documentFocusMatches({repeated:true},'repeated'));
 assert(!E.documentFocusMatches({},'priority'));
});

test('older updates retain verified evidence only for identical stable cards',()=>{
 const evidence={important:true,repeated:true};
 const bundled=[{id:'stable',formula:'p ⇒ p',documentStudy:evidence},{id:'changed',formula:'p ⇒ q',documentStudy:evidence}];
 const update=[{id:'stable',formula:'p ⇒ p'},{id:'changed',formula:'q ⇒ p'},{id:'new',formula:'true'},{id:'own',formula:'true',documentStudy:{important:false,repeated:false}}];
 const merged=E.retainDocumentStudy(update,bundled);
 assert.equal(merged[0].documentStudy,evidence);
 assert.equal(merged[1].documentStudy,undefined);
 assert.equal(merged[2].documentStudy,undefined);
 assert.equal(merged[3],update[3]);
 assert.equal(update[0].documentStudy,undefined);
});
