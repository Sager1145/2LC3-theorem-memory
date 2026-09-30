#!/usr/bin/env python3
"""Inventory rendered CalcCheck proof hints, independently of popup availability."""
from __future__ import annotations
import argparse
from collections import Counter, defaultdict
import hashlib
import json
from pathlib import Path
import re
from build_proof_questions import Node, Tree, clean

ROOT=Path(__file__).resolve().parents[1]
QUOTE=re.compile(r'“([^”\n]+)”|"([^"\n]+)"')
REF=re.compile(r'\((\d+\.\d+(?:\.\d+)*(?:[a-z≡=])?[₀-₉]*)\)')
HINT=re.compile(r'^(.*?)⟨(.*?)⟩\s*$')

def norm(s):return re.sub(r'\s+','',s).casefold()
def ident(s):return hashlib.sha256(s.encode()).hexdigest()[:16]

def visible(n):
    if n.tag in ('script','style','textarea','noscript','pre','code'):return ''
    if n.tag=='br':return '\n'
    if any(c.startswith('RK') for c in n.classes):
        return '\n[[END]]\n' if 'All steps OK' in n.text() and 'RKConfirmedOK' in n.classes else ''
    if any(c.startswith('HBConjStatus') for c in n.classes):
        return ('[[CHECKED]]' if 'HBConjStatusProven' in n.classes else '[[UNCHECKED]]')+n.text()
    text=clean(n.text())
    if any(c.startswith('ConjStatus') for c in n.classes):
        state='checked' if 'ConjStatusProven' in n.classes else 'unchecked'
        if text=='Calculation:' or text.startswith('Calculation for expected goal'):return '\n[[CALC:'+state+']] '+text+'\n'
        if text=='By':return '[[BY:'+state+']]By '
    return ''.join(visible(x) if isinstance(x,Node) else x for x in n.children)

class Resolver:
    def __init__(self,bank):
        self.bank={r['id']:r for r in bank};self.names=defaultdict(set);self.refs=defaultdict(set)
        for r in bank:
            for n in [r['name']]+r.get('aliases',[]):
                if n!='原文未命名':self.names[norm(n)].add(r['id'])
            for n in r.get('numbers',[]):self.refs[n].add(r['id'])
    def group(self,label,names,refs,ids):
        ids=sorted(ids);formulas={norm(self.bank[i]['formula']) for i in ids}
        status='resolved' if ids and len(formulas)==1 else 'ambiguous' if ids else 'unresolved'
        key='cards:'+','.join(ids) if status=='resolved' else 'name:'+norm(label)
        return {'id':'hint-group-'+ident(key),'label':label,'names':names,'references':refs,'theoremIds':ids if status=='resolved' else [],'candidateTheoremIds':ids if status=='ambiguous' else [],'status':status}
    def resolve(self,hint):
        names=list(dict.fromkeys(m[1] or m[2] for m in QUOTE.finditer(hint)));refs=list(dict.fromkeys(REF.findall(hint)));groups=[];covered=set()
        refids=set().union(*(self.refs[n] for n in refs)) if refs else set()
        for name in names:
            ids=self.names[norm(name)].copy();narrow=ids & refids
            if narrow:ids=narrow
            matching=[n for n in refs if ids & self.refs[n]];covered.update(matching)
            groups.append(self.group(name,[name],matching,ids))
        for ref in refs:
            if ref not in covered:groups.append(self.group('('+ref+')',[],[ref],self.refs[ref]))
        if not groups:
            # Unquoted structural hints remain visible, without inventing a theorem match.
            label=clean(hint)[:180] or '(empty hint)'
            groups.append(self.group(label,[],[],self.names.get(norm(label),set())))
        groups=list({g['id']:g for g in groups}.values())
        return names,refs,groups

def extract_html(raw,source,resolver):
    tree=Tree();tree.feed(raw);uses=[];audit=Counter()
    cells=[n for n in tree.root.walk() if n.tag=='div' and 'tabindex' in n.attrs and any(isinstance(x,Node) and x.tag=='textarea' for x in n.children)]
    audit['notebookCells']=len(cells)
    for index,cell in enumerate(cells,1):
        sidebar=next((x for x in cell.children if isinstance(x,Node) and x.tag=='div'),None)
        number=re.search(r'\[(\d+)\]',sidebar.text()) if sidebar else None
        cell_index=int(number[1]) if number else index
        # Markdown tutorial/example cells have no CalcCheck checked-code status nodes.
        if not any(any(c.startswith(('ConjStatus','HBConjStatus')) for c in n.classes) for n in cell.walk()):continue
        audit['renderedProofCells']+=1
        lines=[clean(l) for l in ''.join(visible(x) if isinstance(x,Node) else x for x in cell.children if x is not sidebar).splitlines() if clean(l)]
        calculation=0;step=0;calculation_checked=False
        for line_index,line in enumerate(lines,1):
            if line.startswith('[[CALC:'):
                calculation+=1;step=0;calculation_checked=line.startswith('[[CALC:checked]]');continue
            if line=='[[END]]':calculation_checked=False;continue
            plain=re.sub(r'\[\[(?:CHECKED|UNCHECKED|BY:[a-z]+)\]\]','',line)
            match=HINT.match(plain)
            by=re.match(r'^By\s+(.+)$',plain) if '[[BY:' in line else None
            if not match and not by:continue
            # Bracket hints must have actual CalcCheck hint nodes, not prose angle brackets.
            if match and not re.search(r'\[\[(?:CHECKED|UNCHECKED)\]\]',line):continue
            hint=clean(match[2] if match else by[1]);step+=1
            checked=('[[UNCHECKED]]' not in line and line.count('[[CHECKED]]')>=2) if match else '[[BY:checked]]' in line
            names,refs,groups=resolver.resolve(hint)
            locator={'cell':cell_index,'calculation':calculation,'step':step,'line':line_index}
            key=json.dumps([source['sourceId'],locator],sort_keys=True)
            uses.append({'id':'hint-use-'+ident(key),'sourceId':source['sourceId'],'locator':locator,'hint':hint,'excerpt':plain[:650],'names':names,'references':refs,'theoremIds':sorted(set(i for g in groups for i in g['theoremIds'])),'groups':groups,'checked':checked,'calculationChecked':calculation_checked,'kind':'calculation' if match else 'by'})
            audit['hintCount']+=1;audit['checkedHintCount']+=checked;audit['multiTheoremHints']+=len(groups)>1
    return uses,dict(audit)

def build(source_root,bank,registry):
    resolver=Resolver(bank);notebooks={};groups={};seen_uses=set()
    for r in registry:
        match=re.search(r':(\d{5})/',r.get('url',''))
        if not match:continue
        port=int(match[1]); year=r.get('year',2025)
        # Multiple provenance entries can describe the same notebook body.
        if any(n['port']==port and n['year']==year for n in notebooks.values()):continue
        sid=f'calc-2026-{port}' if year==2026 else r['id']
        notebooks[sid]={'sourceId':sid,'port':int(match[1]),'name':r['name'],'year':r.get('year',2025),'weeks':r.get('weeks',[]),'file':'','url':r['url'],'status':'not-captured','hintUses':[],'theoremCounts':{},'groupCounts':{}}
    title_ports=defaultdict(set)
    for n in notebooks.values():
        token=re.search(r'\b(H\d+(?:\.\d+)?|Ex\d+\.\d+|A\d+\.\d+)\b',n['name'])
        if token and n['year']==2026:title_ports[token[1]].add(n['port'])
    for path in sorted(source_root.rglob('*.html')):
        if '_files' in str(path):continue
        raw=path.read_text();match=re.search(r'saved from url=.*?:(16\d{3})/',raw)
        if not match:continue
        saved_port=int(match[1]);port=saved_port;file=str(path.relative_to(source_root));name=path.name.split(' — ')[0]
        title_match=title_ports.get(name,set())
        if len(title_match)==1:port=next(iter(title_match))
        sid=f'calc-2026-{port}'
        week=re.search(r'(?:^|/)week(\d+)(?:/|$)',file,re.I)
        source=notebooks.setdefault(sid,{'sourceId':sid,'port':port,'name':name,'year':2026,'weeks':[int(week[1])] if week else [],'url':f'http://130.113.68.214:{port}/','hintUses':[],'theoremCounts':{},'groupCounts':{}})
        source['savedFromPort']=saved_port;source['portResolution']='notebook-title' if port!=saved_port else 'saved-source-url'
        source['name']=name;source['file']=file;source['sha256']=hashlib.sha256(raw.encode()).hexdigest();source['status']='captured-no-rendered-hints'
        if week:source['weeks']=[int(week[1])]
        uses,audit=extract_html(raw,source,resolver);source['coverage']=audit
        for use in uses:
            if use['id'] in seen_uses:continue
            seen_uses.add(use['id']);source['hintUses'].append(use)
        if source['hintUses']:source['status']='captured-rendered-hints'
    for source in notebooks.values():
        counts=Counter();gc=Counter()
        for use in source['hintUses']:
            counts.update(sorted(set(use['theoremIds'])))
            for g in use['groups']:
                gc[g['id']]+=1
                if g['id'] not in groups:groups[g['id']]={**g,'hintCount':0,'checkedHintCount':0,'notebookCount':0,'notebookCounts':{}}
                ag=groups[g['id']];ag['hintCount']+=1;ag['checkedHintCount']+=use['checked'];ag['notebookCounts'][source['sourceId']]=ag['notebookCounts'].get(source['sourceId'],0)+1
                ag['references']=list(dict.fromkeys(ag['references']+g['references']));ag['names']=list(dict.fromkeys(ag['names']+g['names']))
        source['theoremCounts']=dict(counts);source['groupCounts']=dict(gc)
    for g in groups.values():g['notebookCount']=len(g['notebookCounts']);g['repeated']=g['hintCount']>=2
    notebooks=sorted(notebooks.values(),key=lambda s:(s['year'],s['port']));groups=sorted(groups.values(),key=lambda g:(-g['hintCount'],g['label']))
    summary={'registeredNotebooks':len(notebooks),'capturedNotebooks':sum(s['status']!='not-captured' for s in notebooks),'notebooksWithHints':sum(bool(s['hintUses']) for s in notebooks),'hintCount':sum(len(s['hintUses']) for s in notebooks),'checkedHintCount':sum(u['checked'] for s in notebooks for u in s['hintUses']),'groupCount':len(groups),'repeatedGroupCount':sum(g['repeated'] for g in groups),'ambiguousGroupCount':sum(g['status']=='ambiguous' for g in groups),'unresolvedGroupCount':sum(g['status']=='unresolved' for g in groups)}
    return {'schemaVersion':1,'method':'Rendered CalcCheck code-cell hint brackets and checked-status By statements; diagnostic echoes, textarea drafts, prose examples and popup declarations excluded. One theorem-group usage per distinct hint position. Individual hint checking is independent of enclosing proof completion; uncaptured bodies are unknown, not zero use. Ambiguous names/numbers retain candidate cards without precise card counts.','summary':summary,'notebooks':notebooks,'groups':groups}

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('source_root',type=Path);p.add_argument('--data',type=Path,default=ROOT/'data');p.add_argument('--asset',type=Path,default=ROOT/'assets/notebook-hints.js');args=p.parse_args()
    payload=build(args.source_root,json.loads((args.data/'theorems.json').read_text()),json.loads((args.data/'sources.json').read_text()))
    (args.data/'notebook-hints.json').write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n')
    args.asset.write_text('window.NOTEBOOK_HINTS = '+json.dumps(payload,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')+';\n')
    print(json.dumps(payload['summary'],indent=2))

if __name__=='__main__':main()
