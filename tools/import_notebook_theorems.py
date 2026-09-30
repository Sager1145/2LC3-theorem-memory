#!/usr/bin/env python3
"""Merge verified notebook declarations with the popup bank, retaining provenance.

With a source directory, refresh the compact declaration capture. Without one,
reapply that capture after rebuilding the popup bank. Private HTML is never copied.
"""
from collections import defaultdict
from hashlib import sha256
import argparse
import json
from pathlib import Path
import re
from week_classification import MODULE_LABELS

ROOT = Path(__file__).resolve().parents[1]
CAPTURE = ROOT / 'research/notebooks/proved-declarations.json'

def normalized(value):
    return re.sub(r'\s+', '', value.replace('`', ''))

def merge(bank, sources, capture):
    previous_cards = {card['id']: card for card in bank}
    bank = [dict(card) for card in bank if not card['id'].startswith('nb-')]
    sources = [source for source in sources if not source['id'].startswith('notebook-2026-')]
    for card in bank:
        card['sources'] = [origin for origin in card['sources'] if not origin['sourceId'].startswith('notebook-2026-')]
        card['notebook2026'] = []
    sources.extend(capture['sources'])
    by_formula = defaultdict(list)
    for card in bank:
        by_formula[normalized(card['formula'])].append(card)
    added = 0
    for row in capture['declarations']:
        candidates = []
        for card in by_formula[normalized(row['formula'])]:
            if card['kind'] != row['kind'] or card.get('sideCondition') != row.get('sideCondition'):
                continue
            names = set(row['names']) & {card['name'], *card['aliases']}
            refs = {ref for ref in row['numbers'] if not re.fullmatch(r'\d+', ref)} & set(card['numbers'])
            if names or refs or (not row['names'] and not row['numbers'] and card['name'] == '原文未命名' and not card['numbers']):
                candidates.append(card)
        if len(candidates) == 1:
            card = candidates[0]
        else:
            key = [row['kind'], row['numbers'], row['names'], normalized(row['formula']), row.get('sideCondition')]
            # Local task numbers are scoped to their notebook.
            if any(re.fullmatch(r'\d+', ref) for ref in row['numbers']): key.append(row['sourceId'])
            digest = sha256(json.dumps(key, ensure_ascii=False).encode()).hexdigest()[:12]
            cid = 'nb-' + digest
            card = next((c for c in by_formula[normalized(row['formula'])] if c['id'] == cid), None)
            if card is None:
                card = {'id': cid, 'name': row['names'][0] if row['names'] else '原文未命名',
                        'aliases': row['names'][1:], 'numbers': row['numbers'], 'formula': row['formula'],
                        'formulaVariants': [row['formula']], 'kind': row['kind'], 'kinds': [row['kind']],
                        'topic': 'Notebook 已证明定理', 'current': True, 'important': False, 'priority': False,
                        'importantEvidence': [], 'emphasisEvidence': [], 'proofMentions': 0,
                        'domain': '以原 notebook 声明中的类型为准', 'sideCondition': row.get('sideCondition'),
                        'documentStudy': {'important': False, 'repeated': False, 'documentCount': 0, 'occurrences': 0, 'proofMentions': 0, 'importantEvidence': [], 'evidence': []},
                        'sources': [], 'preloaded2025': [], 'preloaded2026': [], 'notebook2026': [],
                        'preloadedSections': [], 'preloadedHomework': [], 'archiveWeeks': [], 'archiveWeekLabels': [],
                        'preloaded2026Sections': [], 'preloaded2026Weeks': [], 'occurrences': 0, 'documentCount': 0, 'repeated': False}
                if cid in previous_cards and previous_cards[cid]['formula'] == card['formula']:
                    for field in ('documentStudy',):
                        if field in previous_cards[cid]: card[field] = previous_cards[cid][field]
                card['displayRef'] = ('局部题号 ' if all(re.fullmatch(r'\d+', n) for n in row['numbers']) else '') + f"({row['numbers'][-1]})" if row['numbers'] else '未编号 · ' + digest[:6]
                bank.append(card); by_formula[normalized(row['formula'])].append(card); added += 1
        card['aliases'] = list(dict.fromkeys([*card['aliases'], *(name for name in row['names'] if name != card['name'])]))
        # Keep existing official references intact; the source excerpt retains local numbering.
        if not card['numbers'] and row['numbers']:
            card['numbers'] = row['numbers']
            card['displayRef'] = ('局部题号 ' if all(re.fullmatch(r'\d+', n) for n in row['numbers']) else '') + f"({row['numbers'][-1]})"
        origin = {key: row[key] for key in ('sourceId', 'locator', 'excerpt')}
        card['sources'].append(origin)
        card['notebook2026'] = sorted(set([*card['notebook2026'], int(row['sourceId'].rsplit('-', 1)[-1])]))
    for card in bank:
        count = len({o['sourceId'] for o in card['sources'] if not o['sourceId'].startswith('notebook-2026-')})
        card.update(occurrences=count, documentCount=count, repeated=count > 1)
    bank.sort(key=lambda r: (r['topic'], r['displayRef'], r['name'], r['formula']))
    return bank, sources, added

def merge_files(capture_path=CAPTURE):
    if not capture_path.exists(): return
    data = ROOT / 'data'
    capture = json.loads(capture_path.read_text())
    bank, sources, added = merge(json.loads((data/'theorems.json').read_text()), json.loads((data/'sources.json').read_text()), capture)
    coverage = json.loads((data/'coverage.json').read_text())
    current = lambda card: bool(card.get('preloaded2026') or card.get('notebook2026'))
    coverage.update(theoremCount=len(bank), currentCount=len(bank), sourceFiles=len(sources), readFiles=len(sources),
                    current2026Count=sum(current(c) for c in bank), practiceCount=sum('inference rule' not in c['kind'].lower() for c in bank),
                    current2026PracticeCount=sum(current(c) and 'inference rule' not in c['kind'].lower() for c in bank),
                    notebookProvedDeclarationCount=len(capture['declarations']), notebookProvedSourceCount=len(capture['sources']),
                    repeatedCount=sum(c['repeated'] for c in bank),
                    notebookOnlyCardCount=sum(c['id'].startswith('nb-') for c in bank),
                    notice='题库包含已复制的预载列表声明，以及 2026 notebook 中经 CalcCheck 确认为已证明的定理、引理与推论。Week 使用 Exercise 编号与 Homework 已核对周次（缺少核对时使用课程周目录）；未确认的 Assignment 周次保持未归类。',
                    curationNote='预载声明保留原文行号；notebook 已证明声明保留原文件、Cell、声明摘录与源文件 SHA-256。重复声明合并并保留全部来源。')
    coverage['unavailable'] = [dict(x, reason='课程页面禁用预载列表；已完成的正文定理通过独立 notebook 来源收录。') if x['name']=='2026 A1.1 预载弹窗' else x for x in coverage.get('unavailable', [])]
    for name, value in [('theorems', bank), ('sources', sources), ('coverage', coverage)]:
        (data/f'{name}.json').write_text(json.dumps(value, ensure_ascii=False, indent=2)+'\n')
    audit_path = data / 'extraction-audit.json'
    audit = json.loads(audit_path.read_text())
    audit['method'] = 'Captured preloaded popup declarations plus independently verified proved notebook declarations.'
    audit['notebookProofs'] = {'capture': str(capture_path.relative_to(ROOT)), 'provedDeclarations': len(capture['declarations']), 'notebooks': len(capture['sources']), 'newCards': coverage['notebookOnlyCardCount']}
    audit_path.write_text(json.dumps(audit, ensure_ascii=False, indent=2)+'\n')
    payload = {'theorems': bank, 'sources': sources, 'coverage': coverage, 'review': json.loads((data/'review-candidates.json').read_text()),
               'weekBySource': {s['id']: s.get('weeks', []) for s in sources}, 'weekModuleLabels': MODULE_LABELS}
    (ROOT/'assets/data.js').write_text('/* Generated from verified course theorem declarations. */\nwindow.THEOREM_DATA = '+json.dumps(payload, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c')+';\n')
    print(json.dumps({'notebookDeclarations': len(capture['declarations']), 'newCards': added, 'cards': len(bank)}))

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source_root', nargs='?', type=Path)
    args = parser.parse_args()
    if args.source_root:
        from notebook_theorems import collection
        capture = collection(args.source_root)
        CAPTURE.parent.mkdir(parents=True, exist_ok=True)
        CAPTURE.write_text(json.dumps(capture, ensure_ascii=False, indent=2)+'\n')
    merge_files()

if __name__ == '__main__': main()
