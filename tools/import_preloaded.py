#!/usr/bin/env python3
"""Build the quiz bank from the 26 copied CalcCheck preloaded theorem popups.

The raw captures were copied from each Homework notebook's Cell Actions →
Display list of preloaded theorems. Proof exercises in notebook cells are not
input to this script.
"""
from __future__ import annotations

from collections import defaultdict
from datetime import date
from hashlib import sha256
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / 'research/preloaded/raw'
DATA = ROOT / 'data'
KINDS = ('Derived inference rule', 'Primitive inference rule', 'Axiom', 'Theorem', 'Lemma', 'Corollary', 'Fact')
START = re.compile(r'^(' + '|'.join(map(re.escape, KINDS)) + r')\b')
SECTION = re.compile(r'^[A-Za-z][A-Za-z0-9._/-]*$')
NUMBER = re.compile(r'\((\d+(?:\.\d+)*(?:[a-z])?)\)')
NAME = re.compile(r'“([^”]+)”')
PORTS = {
    'hw01': 15001, 'hw02': 15004, 'hw03': 15011, 'hw04': 15012,
    'hw05': 15019, 'hw06': 15020, 'hw07': 15023, 'hw08': 15027,
    'hw09': 15028, 'hw10-1': 15034, 'hw10-2': 15035,
    'hw10-3': 15036, 'hw11': 15037, 'hw12': 15045,
    'hw13': 15051, 'hw14': 15059, 'hw15-1': 15062,
    'hw15-2': 15063, 'hw16': 15065, 'hw17': 15069,
    'hw18': 15072, 'hw19': 15073, 'hw19-2': 15074,
    'hw20': 15087, 'hw21': 15095, 'hw22': 15108,
}


def normalized(formula: str) -> str:
    return re.sub(r'\s+', '', formula.replace('`', ''))


def parse_file(name: str):
    lines = (RAW / f'{name}.txt').read_text(encoding='utf-8').splitlines()
    assert lines[0].endswith(' Theorem List'), (name, lines[0])
    assert lines[-1].endswith('OK'), (name, lines[-1])
    # The popup's OK button follows its final statement without a line break.
    lines[-1] = lines[-1][:-2]
    section = None
    entries = []
    for line_number, line in enumerate(lines, 1):
        line = line.rstrip()
        if START.match(line):
            entries.append({'line': line_number, 'section': section, 'raw': line,
                            'continuation': []})
        elif SECTION.fullmatch(line) and line not in {'OK', 'Symbol', 'Operator'}:
            if line not in {'Symbol Entry Codes', 'Operator Precedences'}:
                section = line
        elif entries and line[:1].isspace() and line.strip():
            entries[-1]['continuation'].append(line.strip())
    assert entries, name
    return entries


def main():
    assert set(PORTS) == {p.stem for p in RAW.glob('hw*.txt')}
    old = json.loads((ROOT / 'research/preloaded/legacy-bank.json').read_text())
    coverage = json.loads((ROOT / 'research/preloaded/legacy-coverage.json').read_text())
    by_formula = defaultdict(list)
    for record in old:
        by_formula[normalized(record['formula'])].append(record)

    source_defs = []
    unique = {}
    for name, port in PORTS.items():
        entries = parse_file(name)
        source_id = f'calc-preloaded-{name}'
        source_defs.append({
            'id': source_id, 'name': f'{name.upper()} · CalcCheck preloaded theorem list',
            'format': 'CalcCheck theorem-list popup', 'status': 'complete-popup-copy',
            'lineage': '2025 course-provided preloaded theorem lists',
            'url': f'http://130.113.68.214:{port}/',
            'localCapture': f'research/preloaded/raw/{name}.txt',
            'declarations': len(entries), 'candidates': 0, 'pages': 0,
            'charactersRead': (RAW / f'{name}.txt').stat().st_size,
            'rawBytesAvailable': True,
        })
        for entry in entries:
            # Repeated identical declarations in one popup are one card.
            key = entry['raw'] + '\n' + '\n'.join(entry['continuation'])
            item = unique.setdefault(key, {**entry, 'occurrences': []})
            item['occurrences'].append({
                'sourceId': source_id,
                'locator': {'line': entry['line'], 'section': entry['section']},
                'excerpt': entry['raw'],
            })

    bank = []
    reused_ids = set()
    for item in unique.values():
        raw = item['raw']
        kind = START.match(raw).group(1)
        header, _, tail = raw.partition(':')
        numbers = NUMBER.findall(header)
        names = NAME.findall(header)
        formula = tail.replace('\u00a0', ' ').strip().replace('`', '')
        conditions = [x for x in item['continuation'] if x.startswith('— CalcCheck:')]
        if not formula:  # Inference rules are shown as premises/conclusion below the header.
            formula = ' '.join(x.replace('`', '') for x in item['continuation']
                               if not x.startswith('— CalcCheck:'))
        candidates = [r for r in by_formula[normalized(formula)]
                      if r['id'] not in reused_ids]
        candidates.sort(key=lambda r: (
            not bool(set(numbers) & set(r['numbers'])),
            names[0] not in [r['name'], *r['aliases']] if names else True,
        ))
        previous = candidates[0] if candidates else None
        if previous:
            reused_ids.add(previous['id'])
            record = {**previous}
        else:
            digest = sha256(raw.encode()).hexdigest()[:12]
            record = {
                'id': 'p-' + digest, 'topic': item['section'] or '其他',
                'importantEvidence': [], 'emphasisEvidence': [],
                'proofMentions': 0, 'domain': '以 CalcCheck 原模块中的类型为准',
            }
        record.update({
            'name': names[0] if names else '原文未命名',
            'aliases': names[1:], 'numbers': numbers,
            'formula': formula, 'formulaVariants': [formula],
            'kind': kind, 'kinds': [kind], 'current': True,
            'sources': item['occurrences'],
            'preloadedSections': sorted({x['locator']['section'] for x in item['occurrences']
                                         if x['locator']['section']}),
            'preloadedHomework': sorted({x['sourceId'].removeprefix('calc-preloaded-')
                                         for x in item['occurrences']}),
            'sideCondition': '；'.join(conditions) if conditions else record.get('sideCondition'),
        })
        if not previous:
            record['topic'] = item['section'] or '其他'
        record['occurrences'] = len(record['preloadedHomework'])
        record['documentCount'] = record['occurrences']
        record['repeated'] = record['occurrences'] > 1
        record['important'] = bool(record.get('importantEvidence'))
        record['priority'] = bool(record.get('emphasisEvidence'))
        record['displayRef'] = (f'({numbers[-1]})' if numbers else
                                '未编号 · ' + record['id'].split('-')[-1][:6])
        bank.append(record)

    # The old bank contained material from lecture notes and proof tasks; keep
    # an audit trail for everything that no longer qualifies for the quiz.
    excluded = [{'id': r['id'], 'name': r['name'], 'numbers': r['numbers'],
                 'formula': r['formula'], 'reason': 'not an exact declaration in copied preloaded lists'}
                for r in old if r['id'] not in reused_ids]
    (ROOT / 'research/preloaded').mkdir(parents=True, exist_ok=True)
    (ROOT / 'research/preloaded/excluded-existing.json').write_text(
        json.dumps(excluded, ensure_ascii=False, indent=2) + '\n')
    bank.sort(key=lambda r: (r['topic'], r['displayRef'], r['name'], r['formula']))
    sources = source_defs
    coverage.update({
        'builtAt': str(date.today()), 'theoremCount': len(bank),
        'currentCount': len(bank), 'historicalCount': 0,
        'preloadedNotebookCount': len(PORTS),
        'preloadedDeclarationCount': sum(s['declarations'] for s in source_defs),
        'preloadedUniqueCount': len(unique),
        'excludedPriorCards': len(excluded), 'sourceFiles': len(sources),
        'readFiles': len(sources), 'pdfPagesRead': 0, 'reviewCount': 0,
        'completePreloadedAccess': True, 'unavailable': [],
        'importantCount': sum(r['important'] for r in bank),
        'repeatedCount': sum(r['repeated'] for r in bank),
        'notice': '答题库逐条来自 2025 课程提供的 26 份 Homework CalcCheck「preloaded theorems」弹窗。Notebook 正文中的待证明题不作为入库依据。',
        'countMethod': '重复次数表示同一声明出现在几份 Homework 的预载弹窗中；H19 与 H19v 分别计数。不是课件引用次数或重要程度。',
        'curationNote': '所有原始弹窗文本和逐行位置保存在 research/preloaded/raw；题卡只从弹窗声明生成。旧题库中无法逐字对应弹窗声明的条目已从答题库移出。',
    })
    (DATA / 'theorems.json').write_text(json.dumps(bank, ensure_ascii=False, indent=2) + '\n')
    (DATA / 'sources.json').write_text(json.dumps(sources, ensure_ascii=False, indent=2) + '\n')
    (DATA / 'coverage.json').write_text(json.dumps(coverage, ensure_ascii=False, indent=2) + '\n')
    review = []
    (DATA / 'review-candidates.json').write_text('[]\n')
    (DATA / 'extraction-audit.json').write_text(json.dumps({
        'method': 'Only the copied preloaded theorem popups form the quiz bank.',
        'homework': len(PORTS), 'declarations': coverage['preloadedDeclarationCount'],
        'uniqueDeclarations': len(bank), 'excludedPriorCards': len(excluded),
        'excludedArchive': 'research/preloaded/excluded-existing.json',
    }, ensure_ascii=False, indent=2) + '\n')
    payload = {'theorems': bank, 'sources': sources, 'coverage': coverage, 'review': review}
    (ROOT / 'assets/data.js').write_text(
        '/* Generated from the course-provided CalcCheck preloaded theorem lists. */\n'
        'window.THEOREM_DATA = ' + json.dumps(payload, ensure_ascii=False,
                                               separators=(',', ':')).replace('<', '\\u003c') + ';\n')
    print(json.dumps({'homework': len(PORTS), 'declarations': coverage['preloadedDeclarationCount'],
                      'unique': len(bank), 'reused': len(reused_ids), 'excluded': len(excluded)},
                     ensure_ascii=False))


if __name__ == '__main__':
    main()
