#!/usr/bin/env python3
"""Merge copied 2026 CalcCheck preloaded popups into the public quiz bank.

Only popup declarations are evidence. The first Assignment 1 notebook deliberately
hides its list and is excluded. The 2025 Week labels are kept as archive labels,
not represented as 2026 release dates.
"""
from __future__ import annotations
from collections import defaultdict
from datetime import date
from hashlib import sha256
import json
from pathlib import Path
import re

from import_preloaded import KINDS, NAME, NUMBER, SECTION, START, normalized

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / 'research/preloaded/raw2026'
DATA = ROOT / 'data'
HOMEWORK = {16001:'H1',16002:'Ex1.1',16003:'Ex1.2',16004:'Ex1.3',16005:'Ex1.4',16006:'Ex1.5',16007:'Ex1.6',16008:'Ex1.7',
            16009:'H2',16010:'H3',16011:'Ex2.1',16012:'Ex2.2',16013:'Ex2.3',16014:'Ex2.4',16015:'Ex2.5',16016:'Ex2.6',16017:'H4',16018:'H5',
            16020:'A1.2',16021:'H6',16022:'Ex3.1',16023:'Ex3.2',16024:'Ex3.3',16025:'Ex3.4',16026:'H7.1',16027:'H7.2',16028:'H8.1',16029:'H8.2'}
NAMES = {16001:'入门与 CalcCheck',16002:'简单计算',16003:'整数等式',16004:'替换',
         16005:'严格匹配',16006:'不自动使用结合与对称',16007:'高难度练习',16008:'赋值命令正确性',
         16009:'表达式与计算',16010:'赋值命令正确性',
         16011:'命题演算入门',16012:'析取',16013:'合取',
         16014:'命题演算：蕴含',16015:'骑士与骗子',16016:'布尔变量赋值命令',
         16017:'命题演算入门',16018:'命题演算',16020:'布尔赋值命令',16021:'自然数与归纳',
         16022:'自然数归纳：加法与乘法',16023:'自然数截断减法',16024:'自然数的相等与前驱',16025:'自然数分类证明',
         16026:'单调性与反单调性',16027:'自然数的序',16028:'Leibniz 与替换',16029:'结构化证明'}
WEEK_LABELS = {
 'Week3.Exercise-3-2_NatInd_SOL':'Week 3 · 自然数归纳',
 'Week3.Exercise-3-3_MonusSubtraction_SOL':'Week 3 · 自然数截断减法',
 'Week3.Homework-7_Nat-sucInd_SOL':'Week 3 · 自然数与后继归纳',
 'Week4.Exercise-4-4_IntegerOrder_SOL':'Week 4 · 整数的序',
 'Week6.Exercise-6-1_Sequences1_SOL':'Week 6 · 序列基础',
 'Week6.Exercise-6-2_Sequences2_SOL':'Week 6 · 序列进阶',
 'Week7.Exercise-7-2_CartesianProducts_SOL':'Week 7 · 笛卡儿积',
 'Week7.Homework-15-2_Relations_SOL':'Week 7 · 关系',
 'Week11.Exercise-11-4_Allegory_SOL':'Week 11 · Allegory',
}

def parse(path):
    lines=path.read_text(encoding='utf-8').splitlines()
    assert lines[0].endswith(' Theorem List') and lines[-1].endswith('OK'),path
    lines[-1]=lines[-1][:-2]
    section=None; entries=[]
    for i,line in enumerate(lines,1):
        line=line.rstrip()
        if START.match(line): entries.append({'line':i,'section':section,'raw':line,'continuation':[]})
        elif SECTION.fullmatch(line) and line not in {'OK','Symbol','Operator'}: section=line
        elif entries and line[:1].isspace() and line.strip(): entries[-1]['continuation'].append(line.strip())
    return entries

def fields(entry):
    raw=entry['raw'];header,_,tail=raw.partition(':')
    numbers=NUMBER.findall(header);names=NAME.findall(header)
    formula=tail.replace('\u00a0',' ').strip().replace('`','')
    if not formula:formula=' '.join(x.replace('`','') for x in entry['continuation'] if not x.startswith('— CalcCheck:'))
    return {'kind':START.match(raw).group(1),'numbers':numbers,'names':names,'formula':formula}

def main():
    assert set(HOMEWORK)=={int(p.stem.removeprefix('port')) for p in RAW.glob('port*.txt')},'每份已复制的 2026 弹窗都必须登记'
    bank=[card for card in json.loads((DATA/'theorems.json').read_text()) if not card['id'].startswith('y26-')]
    for card in bank:card['sources']=[src for src in card['sources'] if not src['sourceId'].startswith('calc-2026-')]
    sources=[src for src in json.loads((DATA/'sources.json').read_text()) if not src['id'].startswith('calc-2026-')]
    coverage=json.loads((DATA/'coverage.json').read_text())
    for card in bank:
        card['preloaded2026']=[]
        card['preloaded2026Sections']=[]
        card['preloaded2026Weeks']=[]
        card['archiveWeeks']=sorted({int(m.group(1)) for s in card.get('preloadedSections',[]) if (m:=re.match(r'Week(\d+)\.',s))})
        card['archiveWeekLabels']=[WEEK_LABELS[s] for s in card.get('preloadedSections',[]) if s in WEEK_LABELS]
    by_formula=defaultdict(list);by_ref=defaultdict(list)
    for card in bank:
        by_formula[normalized(card['formula'])].append(card)
        for n in card['numbers']:by_ref[n].append(card)
    unmatched=[];matches={'formula':0,'reference':0,'new':0}
    for port in HOMEWORK:
        path=RAW/f'port{port}.txt'
        entries=parse(path)
        sid=f'calc-2026-{port}'
        sources.append({'id':sid,'name':f'2026 {HOMEWORK[port]} · {NAMES.get(port, "课程练习")} · 预载列表',
                        'format':'CalcCheck theorem-list popup','status':'complete-popup-copy',
                        'lineage':'2026 publicly reachable CalcCheck notebook; release week unverified',
                        'url':f'http://130.113.68.214:{port}/',
                        'localCapture':str(path.relative_to(ROOT)),
                        'declarations':len(entries),'candidates':0,'pages':0,
                        'charactersRead':path.stat().st_size,'rawBytesAvailable':True})
        seen=set()
        for entry in entries:
            f=fields(entry)
            key=(f['kind'],tuple(f['numbers']),tuple(f['names']),normalized(f['formula']))
            if key in seen:continue
            seen.add(key)
            candidates=by_formula[normalized(f['formula'])]
            if candidates:
                candidates=sorted(candidates,key=lambda c:(not bool(set(c['numbers'])&set(f['numbers'])),f['names'][0] not in [c['name'],*c['aliases']] if f['names'] else True))
                card=candidates[0];matches['formula']+=1
            else:
                refs=[c for n in f['numbers'] for c in by_ref[n] if c['kind']==f['kind'] and (not f['names'] or f['names'][0] in [c['name'],*c['aliases']])]
                refs=list({c['id']:c for c in refs}.values())
                if len(refs)==1 and normalized(refs[0]['formula'])==normalized(f['formula']):
                    card=refs[0];matches['reference']+=1
                else:
                    digest=sha256((entry['raw']+'\n'+'\n'.join(entry['continuation'])).encode()).hexdigest()[:12]
                    card={'id':'y26-'+digest,'topic':entry['section'] or '其他','name':f['names'][0] if f['names'] else '原文未命名',
                          'aliases':f['names'][1:],'numbers':f['numbers'],'formula':f['formula'],'formulaVariants':[f['formula']],
                          'kind':f['kind'],'kinds':[f['kind']],'current':True,'domain':'以 CalcCheck 原模块中的类型为准',
                          'importantEvidence':[],'emphasisEvidence':[],'important':False,'priority':False,
                          'proofMentions':0,'preloadedSections':[entry['section']] if entry['section'] else [],
                          'preloadedHomework':[],'archiveWeeks':[],'archiveWeekLabels':[],
                          'sources':[],'occurrences':0,'documentCount':0,'repeated':False,
                          'displayRef':f'({f["numbers"][-1]})' if f['numbers'] else '未编号 · '+digest[:6],
                          'preloaded2026':[],'preloaded2026Sections':[],'preloaded2026Weeks':[]}
                    bank.append(card);by_formula[normalized(f['formula'])].append(card)
                    for n in f['numbers']:by_ref[n].append(card)
                    unmatched.append({'port':port,'id':card['id'],'raw':entry['raw']})
                    matches['new']+=1
            if port not in card['preloaded2026']:card['preloaded2026'].append(port)
            if entry['section'] and entry['section'] not in card['preloaded2026Sections']:card['preloaded2026Sections'].append(entry['section'])
            card['sources'].append({'sourceId':sid,'locator':{'line':entry['line'],'section':entry['section']},'excerpt':entry['raw']})
    for card in bank:
        card['preloaded2026'].sort()
        card['preloaded2026Sections'].sort()
        card['preloaded2026Weeks']=sorted({int(m.group(1)) for section in card['preloaded2026Sections'] if (m:=re.match(r'Week(\d+)\.',section))})
    bank.sort(key=lambda r:(r['topic'],r['displayRef'],r['name'],r['formula']))
    coverage.update({'builtAt':str(date.today()),'theoremCount':len(bank),'current2026Count':sum(bool(r['preloaded2026']) for r in bank),
                     'practiceCount':sum('inference rule' not in r['kind'].lower() for r in bank),
                     'current2026PracticeCount':sum(bool(r['preloaded2026']) and 'inference rule' not in r['kind'].lower() for r in bank),
                     'inferenceRuleCount':sum('inference rule' in r['kind'].lower() for r in bank),
                     'current2026NotebookCount':len(HOMEWORK),'sourceFiles':len(sources),'readFiles':len(sources),
                     'notice':f'2026 当前范围只使用 {len(HOMEWORK)} 份已复制 notebook 的预载弹窗逐条声明；A1.1 禁用弹窗，未作为来源。2025 历史 Week 标签不代表 2026 发布周次。',
                     'unavailable':[{'name':'2026 A1.1 预载弹窗','reason':'课程页面明确禁用预载列表；未把正文证明题加入题库。'},
                                    {'name':'2026 PPT 发布周次','reason':'课程官网未公开列出；Avenue 材料尚未提供，故不推断发布周次。'}]})
    (DATA/'theorems.json').write_text(json.dumps(bank,ensure_ascii=False,indent=2)+'\n')
    (DATA/'sources.json').write_text(json.dumps(sources,ensure_ascii=False,indent=2)+'\n')
    (DATA/'coverage.json').write_text(json.dumps(coverage,ensure_ascii=False,indent=2)+'\n')
    (ROOT/'research/preloaded/2026-match-audit.json').write_text(json.dumps({'matches':matches,'newCards':unmatched},ensure_ascii=False,indent=2)+'\n')
    payload={'theorems':bank,'sources':sources,'coverage':coverage,'review':json.loads((DATA/'review-candidates.json').read_text())}
    (ROOT/'assets/data.js').write_text('/* Generated from course-provided CalcCheck preloaded theorem lists. */\nwindow.THEOREM_DATA = '+json.dumps(payload,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')+';\n')
    print(json.dumps({'cards':len(bank),'current2026':coverage['current2026Count'],**matches},ensure_ascii=False))
if __name__=='__main__':main()
