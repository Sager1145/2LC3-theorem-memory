#!/usr/bin/env python3
"""Extract named hint exercises from checked CalcCheckWeb HTML calculations.

Pass the explicitly authorized notebook directory. Private HTML remains outside the
repository; the output keeps only consecutive expression/hint/expression triples.
"""
from __future__ import annotations
import argparse
from collections import Counter
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
VOID = {'br', 'hr', 'img', 'input', 'meta', 'link', 'canvas'}
QUOTES = re.compile(r'“([^”]+)”|"([^"\n]+)"')
HINT = re.compile(r'^(.*?)\s*⟨(.*?)⟩\s*$')
REF = re.compile(r'\((\d+\.\d+(?:\.\d+)*(?:[a-z≡=])?)\)')

class Node:
    def __init__(self, tag='', attrs=()):
        self.tag, self.attrs, self.children = tag, dict(attrs), []
    @property
    def classes(self):
        return self.attrs.get('class', '').split()
    def text(self):
        return ''.join(x.text() if isinstance(x, Node) else x for x in self.children)
    def walk(self):
        yield self
        for child in self.children:
            if isinstance(child, Node): yield from child.walk()

class Tree(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node(); self.stack = [self.root]
    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs); self.stack[-1].children.append(n)
        if tag not in VOID: self.stack.append(n)
    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]; break
    def handle_data(self, data): self.stack[-1].children.append(data)


def clean(text): return re.sub(r'\s+', ' ', text.replace('\xa0', ' ')).strip()


def rendered(node):
    """Keep br boundaries; omit diagnostic duplicates and mark checked regions."""
    if node.tag in ('script', 'style', 'textarea', 'noscript'): return ''
    if node.tag == 'br': return '\n'
    if any(c.startswith('HBConjStatus') and c != 'HBConjStatusProven' for c in node.classes):
        return '[[BADHINT]]' + node.text()
    if 'RKConfirmedOK' in node.classes:
        if 'All steps OK' in node.text(): return '\n[[END]]\n'
        if 'Calculation matches goal' in node.text(): return '\n[[MATCH]]\n'
        return ''
    if any(c in node.classes for c in ('RKInvalid','RKViolation','RKDefect','RKCheckFailed','RKEmptyHint','RKParseErr','RKTypeErr','RKCheckTimedOut','RKInconclusive')):
        return '\n[[BADHINT]]\n'
    if any(c.startswith('RK') for c in node.classes): return ''
    t = clean(node.text())
    if 'ConjStatusProven' in node.classes and (t == 'Calculation:' or t.startswith('Calculation for expected goal')):
        return '\n[[CALC]] ' + t + '\n'
    return ''.join(rendered(x) if isinstance(x, Node) else x for x in node.children)


def extract_html(raw, notebook='', source_name='', week=None, numbered_names=None):
    tree = Tree(); tree.feed(raw)
    port_match = re.search(r'saved from url=.*?:(16\d{3})/', raw)
    port = int(port_match[1]) if port_match else None
    records, audit = [], Counter()
    cells = [n for n in tree.root.walk() if n.tag == 'div' and 'tabindex' in n.attrs and any(x.tag == 'textarea' for x in n.children if isinstance(x, Node))]
    for cell_index, cell in enumerate(cells, 1):
        sidebar = next((x for x in cell.children if isinstance(x, Node) and x.tag == 'div'), None)
        cell_number = re.search(r'\[(\d+)\]', sidebar.text()) if sidebar else None
        if cell_number: cell_index = int(cell_number[1])
        states = [n for n in cell.walk() if any(c in n.classes for c in ('ConjStatusProven', 'ConjStatusOpen', 'ConjStatusRelative')) and clean(n.text()) in ('Theorem', 'Lemma', 'Corollary')]
        if states and any('ConjStatusProven' not in n.classes for n in states):
            audit['incompleteProofCells'] += 1; continue
        content = ''.join(rendered(x) if isinstance(x, Node) else x for x in cell.children if x is not sidebar)
        lines = [clean(l) for l in content.splitlines() if clean(l)]
        label = next((l for l in lines if re.match(r'^(Theorem|Lemma|Corollary)\b', l)), 'Calculation')
        starts = [i for i,l in enumerate(lines) if l.startswith('[[CALC]]')]
        cell_completed = False
        for calc_index, start in enumerate(starts, 1):
            limit = starts[calc_index] if calc_index < len(starts) else len(lines)
            end = next((i for i in range(start+1, limit) if lines[i] == '[[END]]'), None)
            if end is None:
                audit['uncheckedCalculations'] += 1; continue
            if 'expected goal' in lines[start] and '[[MATCH]]' not in lines[end+1:limit]:
                audit['unmatchedGoalCalculations'] += 1; continue
            if any('[[BADHINT]]' in line for line in lines[start+1:end]):
                audit['failedHintCalculations'] += 1; continue
            cell_completed = True
            audit['completedCalculations'] += 1
            body = lines[start+1:end]
            step = 0
            for i,line in enumerate(body):
                match = HINT.match(line)
                if not match: continue
                step += 1
                audit['completedSteps'] += 1
                relation,hint = match.groups()
                quoted = list(QUOTES.finditer(hint))
                names = [m[1] or m[2] for m in quoted]
                references = REF.findall(hint)
                name_span = quoted[0].span() if len(quoted) == 1 else None
                if not names:
                    if len(references) == 1 and numbered_names and references[0] in numbered_names:
                        names = [numbered_names[references[0]]]
                        name_span = REF.search(hint).span()
                        audit['numberedNameSteps'] += 1
                    else:
                        audit['unresolvedNumberedSteps' if references else 'unnamedSteps'] += 1; continue
                if len(names) != 1:
                    audit['multipleNameSteps'] += 1; continue
                if quoted and references and any((numbered_names or {}).get(ref) != names[0] for ref in references):
                    audit['additionalReferenceSteps'] += 1; continue
                if i == 0 or i+1 == len(body) or HINT.match(body[i-1]) or HINT.match(body[i+1]):
                    audit['nonconsecutiveSteps'] += 1; continue
                # A checked hint has proven brackets; reject relative/open hints.
                name = names[0]; first,last = body[i-1],body[i+1]
                triple = f'{first}\n{relation} ⟨{hint.strip()}⟩\n{last}'
                first,last = (re.split(r'\s+(?:—|--)\s*', text, maxsplit=1)[0].strip() for text in (first,last))
                locator = {'file': source_name, 'cell': cell_index, 'calculation': calc_index, 'step': step}
                key = json.dumps([source_name,locator,triple],ensure_ascii=False,sort_keys=True)
                # Hide both the answer and any accompanying numeric reference.
                hint_template = hint[:name_span[0]] + '{{name}}' + hint[name_span[1]:]
                hint_template = REF.sub('', hint_template).strip()
                proof = {'start':first,'relation':relation,'hint':hint.strip(),'hintTemplate':hint_template,'end':last,'notebook':notebook,'proofLabel':label,'step':locator['step'],'answers':[name]}
                records.append({'id':'proof-'+hashlib.sha256(key.encode()).hexdigest()[:16], 'name':name,'aliases':[], 'numbers':[], 'displayRef':'Proof','formula':first,'kind':'Proof step','topic':'Proof','sources':[{'sourceId':f'calc-2026-{port}' if port else 'proof-html-'+hashlib.sha256(source_name.encode()).hexdigest()[:12],'locator':locator,'excerpt':triple}], 'preloaded2026':[port] if port else [],'preloaded2026Weeks':[week] if week else [],'proof':proof})
                audit['eligibleSteps'] += 1
        audit['completeProofCells'] += cell_completed
    audit['notebookCells'] = len(cells)
    return records, dict(audit)


def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('source_root',type=Path)
    p.add_argument('--output',type=Path,default=ROOT/'data/proof-questions.json')
    p.add_argument('--audit',type=Path,default=ROOT/'data/proof-audit.json')
    p.add_argument('--asset',type=Path,default=ROOT/'assets/proofs.js')
    args=p.parse_args(); records=[]; sources=[]; totals=Counter()
    bank=json.loads((ROOT/'data/theorems.json').read_text())
    by_number={}
    for card in bank:
        for number in card.get('numbers',[]): by_number.setdefault(number,[]).append(card)
    numbered_names={n:cs[0]['name'] for n,cs in by_number.items() if len(cs)==1 and cs[0]['name']!='原文未命名'}
    for path in sorted(args.source_root.rglob('*.html')):
        if '_files' in str(path): continue
        raw=path.read_text(); port=re.search(r'saved from url=.*?:(16\d{3})/',raw)
        if not port: continue
        source_name=str(path.relative_to(args.source_root))
        notebook=path.name.split(' — ')[0]
        w=re.search(r'(?:^|/)week(\d+)(?:/|$)',source_name,re.I)
        rows,counts=extract_html(raw,notebook,source_name,int(w[1]) if w else None,numbered_names)
        records.extend(rows); totals.update(counts)
        sources.append({'id':f'calc-2026-{port[1]}','name':f'2026 {notebook} · completed proof','url':f'http://130.113.68.214:{port[1]}/','year':2026,'weeks':[int(w[1])] if w else [],'format':'CalcCheckWeb saved notebook HTML','status':'checked-rendered-proof-extraction','file':source_name,'sha256':hashlib.sha256(raw.encode()).hexdigest(),'port':int(port[1]),**counts})
    args.output.write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
    args.asset.write_text('window.PROOF_QUESTIONS = '+json.dumps(records,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')+';\nwindow.PROOF_SOURCES = '+json.dumps(sources,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')+';\n')
    args.audit.write_text(json.dumps({'schemaVersion':1,'method':'Completed enclosing theorem when present, proven calculation header and hint brackets, All steps OK, plus Calculation matches goal for expected-goal calculations; consecutive expression/hint/expression with one explicit named theorem. Numbered hints require a unique named bank declaration. No popup declarations or invented proofs.','sourceCount':len(sources),'sourcesWithCompletedCalculations':sum(s.get('completedCalculations',0)>0 for s in sources),'summary':dict(totals),'sources':sources},ensure_ascii=False,indent=2)+'\n')
    print(json.dumps(dict(totals),indent=2))

if __name__=='__main__': main()
