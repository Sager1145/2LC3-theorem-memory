'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const bank=require('../data/theorems.json');
const sources=require('../data/sources.json');
const coverage=require('../data/coverage.json');

test('popup provenance remains complete alongside proved notebook declarations',()=>{
  const captured2026=fs.readdirSync(path.join(root,'research/preloaded/raw2026')).filter(name=>/^port\d+\.txt$/.test(name));
  assert.equal(sources.filter(s=>s.id.startsWith('calc-2026-')).length,captured2026.length);
  assert.equal(coverage.current2026NotebookCount,captured2026.length);
  assert.equal(coverage.preloadedNotebookCount,sources.filter(s=>s.id.startsWith('calc-preloaded-')).length);
  assert(coverage.preloadedUniqueCount>=1052);
  assert.equal(coverage.current2026Count,bank.filter(card=>card.preloaded2026.length||card.notebook2026?.length).length);
  assert.equal(coverage.practiceCount,bank.filter(card=>!/inference rule/i.test(card.kind)).length);
  assert.equal(coverage.current2026PracticeCount,bank.filter(card=>(card.preloaded2026.length||card.notebook2026?.length)&&!/inference rule/i.test(card.kind)).length);
  assert.equal(coverage.preloadedDeclarationCount,sources.filter(s=>s.id.startsWith('calc-preloaded-')).reduce((n,s)=>n+s.declarations,0));
  const popupSources=sources.filter(s=>s.sourceType!=='notebook-proved');
  const lines=new Map(popupSources.map(s=>[
    s.id,fs.readFileSync(path.join(root,s.localCapture),'utf8').split(/\r?\n/)
  ]));
  const originLines=new Map(sources.map(s=>[s.id,new Set()]));
  for(const card of bank){
    assert(card.sources.length>0,card.id);
    for(const origin of card.sources){
      if(origin.sourceId.startsWith('notebook-2026-'))continue;
      const list=lines.get(origin.sourceId);
      assert(list,origin.sourceId);
      const line=list[origin.locator.line-1];
      assert(line?.startsWith(origin.excerpt),`${card.id} ${origin.sourceId}:${origin.locator.line}`);
      const start=origin.locator.line,end=origin.locator.endLine;
      assert(Number.isInteger(end)&&end>=start,`${card.id} missing endLine`);
      assert.equal(origin.rawBlock,list.slice(start-1,end).join('\n').replace(/OK$/,''),`${card.id} raw block`);
      assert(!originLines.get(origin.sourceId).has(start),`${origin.sourceId}:${start} has multiple cards`);
      originLines.get(origin.sourceId).add(start);
    }
  }
  for(const source of popupSources){
    const headers=lines.get(source.id).flatMap((line,index)=>/^(?:Axiom|Theorem|Lemma|Corollary|Fact|Derived inference rule|Primitive inference rule)\b/.test(line)?[index+1]:[]);
    assert.equal(headers.length,source.declarations,source.id);
    assert.deepEqual([...originLines.get(source.id)].sort((a,b)=>a-b),headers,`${source.id} missing declarations`);
  }
  assert.equal(sources.find(s=>s.id==='calc-preloaded-hw07').declarations,4);
  assert.deepEqual(require('../data/review-candidates.json'),[]);
});

test('unnamed declarations only borrow a name from an identical named source',()=>{
  for(const [ref,name] of [
    ['15.20','Negation as multiplication'],
    ['15.22','Commutativity of unary minus with ·'],
    ['15.25c','Cancellation across added subtractions']
  ]){
    const cards=bank.filter(card=>card.numbers.includes(ref));
    assert.equal(cards.length,1,ref);
    assert.equal(cards[0].name,name);
    assert(cards[0].sources.some(source=>source.excerpt.includes(`“${name}”`)),ref);
    assert(cards[0].sources.some(source=>!source.excerpt.includes('“')),ref);
  }
  const unnamed=bank.filter(card=>card.name==='原文未命名'&&!card.id.startsWith('nb-'));
  assert.equal(unnamed.length,38);
  assert(unnamed.every(card=>card.sources.every(source=>!source.excerpt.includes('“'))));
});

test('weekly inventory follows Exercise titles and reviewed Homework evidence',()=>{
  const inventory=require('../data/weekly-inventory.json');
  assert.equal(inventory.notebookCount,sources.length);
  assert.equal(inventory.occurrenceCount,sources.reduce((n,s)=>n+s.declarations,0));
  assert.equal(inventory.unassignedNotebookCount,inventory.notebooks.filter(n=>!n.weeks.length).length);
  const assigned=new Set(inventory.notebooks.filter(n=>n.weeks.length).flatMap(n=>n.declarations.map(row=>row.cardId)));
  assert.equal(inventory.unassignedOnlyCardCount,bank.filter(card=>!assigned.has(card.id)).length);
  const bySource=new Map(inventory.notebooks.map(n=>[n.sourceId,n]));
  assert.equal(bySource.size,sources.length);
  for(const source of sources){
    const rows=bySource.get(source.id);
    assert(rows,source.id);
    assert.equal(rows.occurrences,source.declarations);
    assert.equal(source.year,rows.year);
    assert.deepEqual(source.weeks,rows.weeks);
  }
  const moduleExpected=new Map();
  for(const card of bank)for(const origin of card.sources){
    const match=/^Week(\d+)[./]/.exec(origin.locator.section||'');
    if(!match)continue;
    const year=bySource.get(origin.sourceId).year;
    const key=`${year}:${Number(match[1])}`;
    moduleExpected.set(key,(moduleExpected.get(key)||0)+1);
  }
  assert.equal(inventory.moduleWeeks.length,moduleExpected.size);
  for(const group of inventory.moduleWeeks){
    const key=`${group.year}:${group.week}`;
    assert.equal(group.occurrences,moduleExpected.get(key),key);
    assert.equal(group.uniqueCards,group.cards.length,key);
    assert(group.cards.every(card=>card.occurrences.every(row=>row.section.startsWith(`Week${group.week}.`)||row.section.startsWith(`Week${group.week}/`))));
  }
  const weekExpected=new Map();
  for(const card of bank)for(const origin of card.sources){
    const year=bySource.get(origin.sourceId).year;
    for(const week of bySource.get(origin.sourceId).weeks){
      const key=`${year}:${week}`;
      weekExpected.set(key,(weekExpected.get(key)||0)+1);
    }
  }
  assert.equal(inventory.weeks.length,weekExpected.size);
  for(const group of inventory.weeks){
    const key=`${group.year}:${group.week}`;
    assert.equal(group.occurrences,weekExpected.get(key),key);
    assert.equal(group.uniqueCards,group.cards.length,key);
  }
  const exercise=/^(?:2025i\s+)?(?:Extra\s+)?Exercise\s+(\d+)\.(\d+)|^2026\s+Ex(\d+)\.(\d+)/;
  for(const source of sources){
    const match=exercise.exec(source.name);
    if(match){
      const row=bySource.get(source.id);
      assert.deepEqual(row.weeks,[Number(match[1]||match[3])]);
      assert.equal(row.exerciseNumber,Number(match[2]||match[4]));
    }
  }
  const homework=require('../research/preloaded/homework-week-evidence.json').sources;
  const homeworkIds=sources.filter(s=>/^calc-preloaded-hw|^calc-2026-\d+$/.test(s.id)&&(/\bH\d/.test(s.name)||s.name.startsWith('HW'))).map(s=>s.id);
  assert.equal(Object.keys(homework).length,36);
  assert(homeworkIds.every(id=>homework[id]),'every readable Homework has a Week evidence record');
  for(const [id,assignment] of Object.entries(homework)){
    assert.deepEqual(bySource.get(id)?.weeks,assignment.weeks,id);
    assert(assignment.evidence?.length,id);
  }
  assert.equal(bySource.get('calc-preloaded-2025i-15076').exerciseNumber,2);
  assert.equal(bySource.get('calc-preloaded-2025i-15077').exerciseNumber,2);
  assert.deepEqual(bySource.get('calc-2026-16027').weeks,[4]);
});

test('year-specific module labels and repeat counts follow source occurrences',()=>{
  const line=fs.readFileSync(path.join(root,'assets/data.js'),'utf8').split('\n')[1];
  const payload=JSON.parse(line.slice('window.THEOREM_DATA = '.length,-1));
  const labels=payload.weekModuleLabels;
  const moduleNames=new Set();
  for(const card of bank){
    const ids=new Set(card.sources.filter(origin=>!origin.sourceId.startsWith('notebook-2026-')).map(origin=>origin.sourceId));
    const oldSections=[...new Set(card.sources.filter(origin=>origin.sourceId.startsWith('calc-preloaded-')).map(origin=>origin.locator.section).filter(Boolean))].sort();
    const newSections=[...new Set(card.sources.filter(origin=>origin.sourceId.startsWith('calc-2026-')).map(origin=>origin.locator.section).filter(Boolean))].sort();
    assert.deepEqual(card.preloadedSections,oldSections,card.id);
    assert.deepEqual(card.preloaded2026Sections,newSections,card.id);
    const extractWeeks=sections=>[...new Set(sections.map(section=>/^Week(\d+)[./]/.exec(section)?.[1]).filter(Boolean).map(Number))].sort((a,b)=>a-b);
    assert.deepEqual(card.archiveWeeks,extractWeeks(oldSections),card.id);
    assert.deepEqual(card.preloaded2026Weeks,extractWeeks(newSections),card.id);
    assert.equal(card.occurrences,ids.size,card.id);
    assert.equal(card.documentCount,ids.size,card.id);
    assert.equal(card.repeated,ids.size>1,card.id);
    for(const section of [...oldSections,...newSections])if(/^Week\d+[./]/.test(section))moduleNames.add(section);
    assert.deepEqual(card.archiveWeekLabels,[...new Set(oldSections.filter(section=>/^Week\d+[./]/.test(section)).map(section=>labels[section]))].sort(),card.id);
  }
  assert.deepEqual(Object.keys(labels).sort(),[...moduleNames].sort());
  assert.equal(coverage.repeatedCount,bank.filter(card=>card.repeated).length);
});

test('every openable popup has a zero-collapsed live expansion record',()=>{
  const audit2025=require('../research/preloaded/audit-2025i.json');
  const verified2025=require('../research/preloaded/audit-2025i-verification.json');
  const audit2026=require('../research/preloaded/audit-2026.json');
  const verified2026=require('../research/preloaded/audit-2026-popup-verification.json').results;
  assert.equal(verified2025.length,audit2025.records.length);
  assert.equal(verified2026.length,audit2026.notebooks.filter(n=>n.popupAction!=='Not available. ❌').length);
  const captures=new Map(sources.filter(s=>s.sourceType!=='notebook-proved').map(s=>[Number(s.url.match(/:(\d+)\//)?.[1]),s.declarations]));
  for(const row of verified2025){
    if(!row.status.startsWith('all-expanded-verified'))continue;
    assert.equal(row.closedCountAfter,0,`2025i port ${row.port}`);
    assert.equal(row.openCountAfter,row.detailCountAfter,`2025i port ${row.port}`);
    assert.equal(row.declarationCountAfter,captures.get(row.port),`2025i port ${row.port}`);
  }
  for(const row of verified2026){
    assert.equal(row.status,'verified',`2026 port ${row.port}`);
    assert.equal(row.remainingCollapsed,0,`2026 port ${row.port}`);
    assert.equal(row.declarationCount,captures.get(row.port),`2026 port ${row.port}`);
  }
});
