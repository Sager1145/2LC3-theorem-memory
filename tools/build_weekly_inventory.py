#!/usr/bin/env python3
"""Index preloaded occurrences by Exercise N.x week and popup module."""
from __future__ import annotations

from collections import defaultdict
import json
from pathlib import Path
import re
from week_classification import exercise_number, homework_evidence, source_weeks

ROOT=Path(__file__).resolve().parents[1]
DATA=ROOT/'data'
WEEK=re.compile(r'^Week(\d+)[./]')


def build():
    bank=json.loads((DATA/'theorems.json').read_text(encoding='utf-8'))
    sources=json.loads((DATA/'sources.json').read_text(encoding='utf-8'))
    by_source=defaultdict(list)
    by_module_week=defaultdict(lambda:defaultdict(list))
    by_week=defaultdict(lambda:defaultdict(list))
    source_by_id={source['id']:source for source in sources}
    evidence=homework_evidence()
    for card in bank:
        for origin in card['sources']:
            sid=origin['sourceId']
            row={'cardId':card['id'], **origin['locator']}
            by_source[sid].append(row)
            source=source_by_id[sid]
            year=source.get('year', 2026 if sid.startswith('calc-2026-') else 2025)
            for week in source_weeks(source,evidence):
                by_week[(year,week)][card['id']].append({'sourceId':sid,**row})
            match=WEEK.match(origin['locator']['section'] or '')
            if match:
                year=source.get('year', 2026 if sid.startswith('calc-2026-') else 2025)
                by_module_week[(year,int(match.group(1)))][card['id']].append({'sourceId':sid,**row})
    cards={card['id']:card for card in bank}
    notebooks=[]
    for source in sources:
        rows=sorted(by_source[source['id']],key=lambda row:row.get('line', row.get('cell', 0)))
        assert len(rows)==source['declarations'],source['id']
        exercise=exercise_number(source['name'])
        notebooks.append({'sourceId':source['id'],'year':source.get('year', 2026 if source['id'].startswith('calc-2026-') else 2025),
                          'name':source['name'],'url':source['url'],'capture':source['localCapture'], 'sourceType':source.get('sourceType','preloaded-popup'),
                          'weeks':source_weeks(source,evidence),
                          'exerciseNumber':exercise[1] if exercise else None,
                          'weekEvidence':evidence.get(source['id']),
                          'occurrences':len(rows),'uniqueCards':len({row['cardId'] for row in rows}),
                          'declarations':rows})
    module_weeks=[]
    for (year,week),group in sorted(by_module_week.items()):
        items=[]
        for cid,rows in sorted(group.items(),key=lambda item:(cards[item[0]]['displayRef'],cards[item[0]]['name'],item[0])):
            card=cards[cid]
            items.append({'id':cid,'ref':card['displayRef'],'name':card['name'],'aliases':card['aliases'],
                          'kind':card['kind'],'formula':card['formula'],'occurrences':rows})
        module_weeks.append({'year':year,'week':week,'basis':'popup module name begins with WeekN',
                      'uniqueCards':len(items),'occurrences':sum(len(item['occurrences']) for item in items),
                      'cards':items})
    weeks=[]
    for (year,number),group in sorted(by_week.items()):
        rows=[{'id':cid,'ref':cards[cid]['displayRef'],'name':cards[cid]['name'],
               'aliases':cards[cid]['aliases'],'kind':cards[cid]['kind'],'formula':cards[cid]['formula'],
               'occurrences':occurrences}
              for cid,occurrences in sorted(group.items(),key=lambda item:(cards[item[0]]['displayRef'],cards[item[0]]['name'],item[0]))]
        weeks.append({'year':year,'week':number,'basis':'Exercise N.x title or reviewed Homework theorem/proof overlap',
                                'uniqueCards':len(rows),'occurrences':sum(len(x['occurrences']) for x in rows),
                                'notebooks':sorted({x['sourceId'] for row in rows for x in row['occurrences']}),
                                'cards':rows})
    assigned_cards={row['cardId'] for notebook in notebooks if notebook['weeks'] for row in notebook['declarations']}
    unassigned_notebooks=[notebook for notebook in notebooks if not notebook['weeks']]
    return {'scope':'Captured preloaded declarations and verified proved notebook declarations; Exercise Week uses N in Exercise N.x; Homework uses reviewed overlap or the source course week folder.',
            'notebookCount':len(notebooks),'occurrenceCount':sum(x['occurrences'] for x in notebooks),
            'unassignedNotebookCount':len(unassigned_notebooks),
            'unassignedOnlyCardCount':len(set(cards)-assigned_cards),
            'notebooks':notebooks,'weeks':weeks,'moduleWeeks':module_weeks}


def main():
    inventory=build()
    (DATA/'weekly-inventory.json').write_text(json.dumps(inventory,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    lines=['# 2025i 与 2026 定理 Week 清单','','按指定规则，`Exercise N.x` 的第一个数字 N 是 **Week**，第二个数字 x 是周内编号。Homework 根据预载定理及正文证明与 Exercise 周的重合归类，逐本证据记录在 [`homework-week-evidence.json`](../research/preloaded/homework-week-evidence.json)。Week N 收录对应 notebook 预载弹窗中的**全部定理**及经 CalcCheck 确认的正文已证明定理（Homework 正文优先使用已核对周次，缺少证据时使用课程 week 目录），包括重复预载的声明；一条定理可以出现在多个 Week。弹窗自己的 `WeekN.*` 模块标签另列。', '', f"Example、Reference、Assignment 等 {inventory['unassignedNotebookCount']} 份来源缺少可靠的 Exercise 周次依据，故仍在 [逐 notebook 清单](../data/weekly-inventory.json) 中保留全部声明；其中 {inventory['unassignedOnlyCardCount']} 张卡片只见于这些来源，暂不进入 Week 筛选。", '', '| 年份 | Week | notebook 数 | 声明出现次数 | 不同卡片 |','|---|---:|---:|---:|---:|']
    for group in inventory['weeks']:
        lines.append(f"| {group['year']} | {group['week']} | {len(group['notebooks'])} | {group['occurrences']} | {group['uniqueCards']} |")
    lines.extend(['','## Homework notebook 归类依据','','预载列表会累积早期定理；归类时同时核对正文证明与 Exercise 的主题或具体题目。','','| 年份 | Homework notebook | Week | 证据 |','|---|---|---:|---|'])
    for notebook in inventory['notebooks']:
        evidence=notebook['weekEvidence']
        if evidence is None:continue
        safe=lambda value:str(value).replace('|','\\|').replace('\n',' ')
        lines.append(f"| {notebook['year']} | [{safe(notebook['name'])}]({notebook['url']}) | {', '.join(map(str,notebook['weeks'])) or '未归类'} | {safe(' '.join(evidence['evidence']))} |")
    for group in inventory['weeks']:
        source_names={source['sourceId']:source for source in inventory['notebooks']}
        linked=', '.join(f"[{source_names[sid]['name']}]({source_names[sid]['url']})" for sid in group['notebooks'])
        lines.extend(['',f"## {group['year']} · Week {group['week']}",'',
                      f"对应 notebook：{linked}",'',
                      '| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |','|---|---|---|---|---:|'])
        for card in group['cards']:
            alias='；别名：'+'、'.join(card['aliases']) if card['aliases'] else ''
            safe=lambda s:str(s).replace('|','\\|').replace('\n',' ')
            lines.append(f"| {safe(card['ref'])} | {safe(card['name']+alias)} | {safe(card['kind'])} | {safe(card['formula'])} | {len(card['occurrences'])} |")
    lines.extend(['','## 弹窗原文中的 WeekN 模块','','这里按预载列表的模块名整理，与上面的 Exercise Week 分类独立。','','| notebook 年份 | 模块 Week | 声明出现次数 | 不同卡片 |','|---|---:|---:|---:|'])
    for group in inventory['moduleWeeks']:
        lines.append(f"| {group['year']} | {group['week']} | {group['occurrences']} | {group['uniqueCards']} |")
    for group in inventory['moduleWeeks']:
        source_names={source['sourceId']:source for source in inventory['notebooks']}
        member_ids=sorted({row['sourceId'] for card in group['cards'] for row in card['occurrences']})
        linked=', '.join(f"[{source_names[sid]['name']}]({source_names[sid]['url']})" for sid in member_ids)
        lines.extend(['',f"## {group['year']} notebook · 模块 Week {group['week']}",'',
                      f"出现于 notebook：{linked}",'',
                      '| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |','|---|---|---|---|---:|'])
        for card in group['cards']:
            alias='；别名：'+'、'.join(card['aliases']) if card['aliases'] else ''
            safe=lambda s:str(s).replace('|','\\|').replace('\n',' ')
            lines.append(f"| {safe(card['ref'])} | {safe(card['name']+alias)} | {safe(card['kind'])} | {safe(card['formula'])} | {len(card['occurrences'])} |")
    (ROOT/'docs/WEEKLY_INVENTORY.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
    print(json.dumps({'notebooks':inventory['notebookCount'],'occurrences':inventory['occurrenceCount'],
                      'weeks':[(x['year'],x['week'],x['uniqueCards']) for x in inventory['weeks']],
                      'moduleWeeks':[(x['year'],x['week'],x['uniqueCards']) for x in inventory['moduleWeeks']]},ensure_ascii=False))


if __name__=='__main__':main()
