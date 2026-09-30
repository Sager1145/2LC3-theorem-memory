"""Week labels based on Exercise titles and reviewed Homework overlap."""
from __future__ import annotations

import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
EXERCISE = re.compile(r'^(?:2025i\s+)?(?:Extra\s+)?Exercise\s+(\d+)\.(\d+)|^2026\s+Ex(\d+)\.(\d+)')
EVIDENCE_PATH = ROOT / 'research/preloaded/homework-week-evidence.json'
MODULE_LABELS = {
    'Week3.Exercise-3-1_NatInd_SOL': 'Week 3 · 自然数归纳',
    'Week3.Exercise-3-2_NatInd_SOL': 'Week 3 · 自然数归纳',
    'Week3.Exercise-3-2_MonusSubtraction_SOL': 'Week 3 · 截断减法',
    'Week3.Exercise-3-3_MonusSubtraction_SOL': 'Week 3 · 截断减法',
    'Week3.Exercise-3-3_NatPred_SOL': 'Week 3 · 自然数前驱',
    'Week3.Homework-6_Nat-sucInd_SOL': 'Week 3 · 后继归纳',
    'Week3.Homework-7_Nat-sucInd_SOL': 'Week 3 · 后继归纳',
    'Week4.Exercise-4-4_IntegerOrder_SOL': 'Week 4 · 整数的序',
    'Week5.Exercise-5-2_NatPred_SOL': 'Week 5 · 自然数前驱',
    'Week5.Exercise-5-4_IntRanges_SOL': 'Week 5 · 整数范围',
    'Week5.Exercise-5-5_SumQuantificationInt_SOL': 'Week 5 · 整数求和',
    'Week6.Exercise-6-1_Sequences1_SOL': 'Week 6 · 序列基础',
    'Week6.Exercise-6-2_Sequences2_SOL': 'Week 6 · 序列进阶',
    'Week6.Exercise-6-5_MixedMonotonicity_SOL': 'Week 6 · 混合单调性',
    'Week7.Exercise-7-2_CartesianProducts_SOL': 'Week 7 · 笛卡儿积',
    'Week7.Homework-14_Sets1_SOL': 'Week 7 · 集合',
    'Week7.Homework-15-2_Relations_SOL': 'Week 7 · 关系',
    'Week8.Homework-17_HetRelProps_SOL': 'Week 8 · 异构关系',
    'Week9.Homework-18_InductionPrinciples_SOL': 'Week 9 · 归纳原理',
    'Week9.Homework-19_BinTree_SOL': 'Week 9 · 二叉树',
    'Week9.Homework-19v_BinTree_SOL': 'Week 9 · 二叉树',
    'Week9.Homework-20_Bags_SOL': 'Week 9 · 多重集',
    'Week11.Exercise-11-4_Allegory_SOL': 'Week 11 · Allegory',
}


def exercise_number(name):
    match = EXERCISE.match(name)
    if not match:
        return None
    a, b, c, d = match.groups()
    return (int(a), int(b)) if a else (int(c), int(d))


def homework_evidence():
    if not EVIDENCE_PATH.exists():
        return {}
    return json.loads(EVIDENCE_PATH.read_text(encoding='utf-8'))['sources']


def source_weeks(source, evidence=None):
    if source.get('sourceType') == 'notebook-proved':
        return list(source.get('weeks', []))
    exercise = exercise_number(source['name'])
    if exercise:
        return [exercise[0]]
    evidence = homework_evidence() if evidence is None else evidence
    return list(evidence.get(source['id'], {}).get('weeks', []))
