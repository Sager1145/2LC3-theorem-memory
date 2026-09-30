#!/usr/bin/env python3
"""Add document study evidence to existing cards, without treating popup availability as repetition.
Run with a Python environment containing pypdf. Source documents remain private.
"""
from __future__ import annotations
import argparse, hashlib, html, json, re, zipfile
from collections import defaultdict
from html.parser import HTMLParser
from pathlib import Path
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
REF = re.compile(r"\((\d+\.\d+(?:\.\d+)*(?:[a-z≡=])?)\)")
QUOTE = re.compile(r'“([^”\n]{2,160})”|"([^"\n]{2,160})"')
HINT = re.compile(r"⟨([^⟩]{0,1400})⟩")
SLIDE = re.compile(r"McMaster U\.?[,]?\s*COMPSCI 2LC3[^\n]*\n")
IMPORTANT = re.compile(r"\bImportant\b|重点|重要定理", re.I)

def norm(s):
    return re.sub(r"\s+", "", html.unescape(s)).casefold()

class VisibleHTML(HTMLParser):
    def __init__(self):
        super().__init__(); self.parts=[]; self.hidden=0
    def handle_starttag(self,tag,attrs):
        if tag in ('script','style','noscript'): self.hidden += 1
        if tag in ('div','p','pre','textarea','br','li'): self.parts.append('\n')
    def handle_endtag(self,tag):
        if tag in ('script','style','noscript'): self.hidden -= 1
        if tag in ('div','p','pre','textarea','li'): self.parts.append('\n')
    def handle_data(self,data):
        if not self.hidden: self.parts.append(data)

def extract(path,cache):
    raw=path.read_bytes(); sha=hashlib.sha256(raw).hexdigest()
    cached=cache/(sha+'.json')
    if cached.exists(): return sha,json.loads(cached.read_text())
    if path.suffix.lower()=='.pdf':
        from pypdf import PdfReader
        units=[{'page':i,'text':p.extract_text() or ''} for i,p in enumerate(PdfReader(path).pages,1)]
    elif path.suffix.lower()=='.docx':
        with zipfile.ZipFile(path) as z: tree=ET.fromstring(z.read('word/document.xml'))
        ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        units=[{'line':i,'text':''.join(p.itertext())} for i,p in enumerate(tree.findall('.//w:p',ns),1)]
    else:
        parser=VisibleHTML(); parser.feed(raw.decode('utf-8',errors='replace'))
        units=[{'line':1,'text':''.join(parser.parts)}]
    cache.mkdir(parents=True,exist_ok=True);cached.write_text(json.dumps(units,ensure_ascii=False))
    return sha,units

def family(path):
    name=path.name
    if name in ('2lcslides.pdf','COMPSCI_2LC3_Fall2025_Lecture_Slides_10up-A4.pdf'):return '2025 lecture slides'
    if path.parent.name=='organizednotes' or name.startswith('COMPSCI_2LC3_Week'):
        m=re.search(r'Week(\d+)',name)
        if m:return 'Week '+m[1]+' study notes'
    # Preliminary/revised exports of the same lecture count once.
    return re.sub(r'__.*$', '',name).replace('_PRELIMINARY','').replace('.pdf','')

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source_root',type=Path)
    parser.add_argument('--data',type=Path,default=ROOT/'data')
    parser.add_argument('--cache',type=Path,default=ROOT/'.build/document-text')
    args=parser.parse_args()
    bank=json.loads((args.data/'theorems.json').read_text()); byref=defaultdict(list); byname=defaultdict(set)
    for i,r in enumerate(bank):
        for n in r.get('numbers',[]):
            if '.' in n:byref[n].append(i)
        for n in [r['name']]+r.get('aliases',[]):
            if n!='原文未命名':byname[norm(n)].add(i)
    # Shared base references with different formulas cannot identify an exact variant.
    ambiguous_refs={n for n,ids in byref.items() if len({norm(bank[i]['formula']) for i in ids})>1}
    byref={n:ids for n,ids in byref.items() if n not in ambiguous_refs}
    study=[{'important':False,'repeated':False,'documentCount':0,'occurrences':0,'proofMentions':0,'importantEvidence':[],'evidence':[],'frequencyByFamily':{},'proofFrequencyByFamily':{}} for _ in bank]
    audited=[];seen=set()
    files=sorted(p for p in args.source_root.rglob('*') if p.suffix.lower() in ('.pdf','.html','.docx') and '_files' not in str(p))
    # Prefer the 10-up complete deck only if its alternative is absent.
    if (args.source_root/'2lcslides.pdf').exists():files=[p for p in files if p.name!='COMPSCI_2LC3_Fall2025_Lecture_Slides_10up-A4.pdf']
    for path in files:
        sha,units=extract(path,args.cache);name=str(path.relative_to(args.source_root));g=family(path)
        if sha in seen:continue
        seen.add(sha);sid='doc-'+sha[:12];counts=defaultdict(int);proofs=defaultdict(int);first={}
        print('Read '+name,flush=True)
        for unit in units:
            text=unit['text'];locator={k:v for k,v in unit.items() if k!='text'}
            chunks=SLIDE.split(text) if SLIDE.search(text) else [text]
            for chunk in chunks:
                matches=defaultdict(list)
                for m in REF.finditer(chunk):
                    for i in byref.get(m[1],[]):
                        # Some slides print the same reference twice side by side.
                        if matches[i] and not chunk[matches[i][-1][1]:m.start()].strip():continue
                        matches[i].append((m.start(),m.end()))
                for m in QUOTE.finditer(chunk):
                    ids=byname.get(norm(m[1] or m[2]),set())
                    if len(ids)==1:
                        i=next(iter(ids))
                        # A number and its name in the same declaration are one mention.
                        if not any(abs(m.start()-end)<80 and '\n' not in chunk[end:m.start()] for start,end in matches[i]):matches[i].append((m.start(),m.end()))
                title=next((l.strip() for l in chunk.splitlines() if l.strip()),'')
                for i,spans in matches.items():
                    counts[i]+=len(spans)
                    start,end=spans[0]
                    first.setdefault(i,{ 'sourceId':sid,'sourceName':name,'label':g,'locator':locator,'excerpt':re.sub(r'\s+',' ',chunk[max(0,start-60):end+160]).strip()})
                    if IMPORTANT.search(title) and REF.search(title) is None:
                        refs=[n for n in bank[i].get('numbers',[]) if any(m[1]==n for m in REF.finditer(chunk))]
                        if refs:
                            ev={'sourceId':sid,'sourceName':name,'label':title[:180],'locator':locator,'references':refs}
                            if ev not in study[i]['importantEvidence']:study[i]['importantEvidence'].append(ev)
                for hint in HINT.findall(chunk):
                    ids=set(i for m in REF.finditer(hint) for i in byref.get(m[1],[]))
                    for m in QUOTE.finditer(hint):
                        hit=byname.get(norm(m[1] or m[2]),set())
                        if len(hit)==1:ids.update(hit)
                    for i in ids:proofs[i]+=1
        for i,count in counts.items():
            s=study[i];s['frequencyByFamily'][g]=max(s['frequencyByFamily'].get(g,0),count)
            s['proofFrequencyByFamily'][g]=max(s['proofFrequencyByFamily'].get(g,0),proofs[i])
            s['evidence'].append({**first[i],'occurrences':count,'proofMentions':proofs[i]})
        audited.append({'id':sid,'name':name,'family':g,'unitsRead':len(units),'charactersRead':sum(len(u['text']) for u in units),'matchedCards':len(counts)})
    for r,s in zip(bank,study):
        s['occurrences']=sum(s['frequencyByFamily'].values());s['proofMentions']=sum(s['proofFrequencyByFamily'].values())
        s['documentCount']=len(s['frequencyByFamily']);s['important']=bool(s['importantEvidence']);s['repeated']=s['occurrences']>=2
        r['documentStudy']=s
    summary={'schemaVersion':1,'sources':audited,'ambiguousReferencesExcluded':sorted(ambiguous_refs),'matchedCount':sum(s['occurrences']>0 for s in study),'importantCount':sum(s['important'] for s in study),'repeatedCount':sum(s['repeated'] for s in study),'countMethod':'Unambiguous numbered references or quoted theorem names in local document text; number/name declaration pairs counted once. Per document family maximum across exports. ZIP copies and preloaded popup availability excluded. Counts are text extraction lower bounds; ambiguous base references and unnumbered names omitted. Proof counts match explicit angle-bracket hints.'}
    (args.data/'theorems.json').write_text(json.dumps(bank,ensure_ascii=False,indent=2)+'\n')
    (args.data/'document-study.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n')
    coverage=json.loads((args.data/'coverage.json').read_text());coverage['documentStudy']={k:v for k,v in summary.items() if k!='sources'}
    (args.data/'coverage.json').write_text(json.dumps(coverage,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps({k:v for k,v in summary.items() if k!='sources'},ensure_ascii=False,indent=2))

if __name__=='__main__':main()
