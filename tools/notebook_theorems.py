#!/usr/bin/env python3
"""Extract proved declarations, never proof steps, from saved CalcCheck notebooks.

extract_html(raw, source_name) returns (declaration_rows, audit_counts).
collection(source_root) returns {sources, declarations, audit}. Each declaration
has sourceId, locator (actual rendered cell number), excerpt, kind, numbers,
names, formula and sideCondition. Whitespace is normalized in rendered statement
text; symbols, parentheses, names and reference labels are preserved. No proof
body or editable textarea contents leave the parser.
"""
from __future__ import annotations

from collections import Counter
import hashlib
import json
from pathlib import Path
import re

try:
    from .build_proof_questions import Node, Tree, clean, rendered
except ImportError:
    from build_proof_questions import Node, Tree, clean, rendered

PORT = re.compile(r'saved from url=.*?:(160\d{2})/')
KINDS = {'Theorem', 'Lemma', 'Corollary'}
BAD = {'RKInvalid', 'RKViolation', 'RKDefect', 'RKCheckFailed', 'RKEmptyHint',
       'RKParseErr', 'RKTypeErr', 'RKCheckTimedOut', 'RKInconclusive'}
EXCERPT_LIMIT = 2000


def notebook_week(source_name, raw='', reviewed_weeks=None):
    """Exercise first; Homework uses reviewed port evidence before folder fallback."""
    title = re.search(r'<title[^>]*>(.*?)</title>', raw, re.I | re.S)
    text = clean(title[1]) if title else source_name
    exercise = re.search(r'\b(?:Extra\s+)?Exercise\s+(\d+)\.\d+', text, re.I)
    if not exercise:
        exercise = re.search(r'\b(?:Extra\s+)?Exercise\s+(\d+)\.\d+', source_name, re.I)
    if exercise:
        return int(exercise[1])
    if re.search(r'\bHomework\s+\d+', text + ' ' + source_name, re.I):
        port = PORT.search(raw)
        reviewed = (reviewed_weeks or {}).get(f'calc-2026-{port[1]}') if port else None
        if reviewed and len(reviewed.get('weeks', [])) == 1:
            return reviewed['weeks'][0]
        folder = re.search(r'(?:^|/)week(\d+)(?:/|$)', source_name, re.I)
        return int(folder[1]) if folder else None
    return None


def _statement_text(container):
    """Render only nodes before the explicit Proof: marker, excluding diagnostics."""
    parts = []
    stopped = False

    def visit(node):
        nonlocal stopped
        if stopped:
            return
        if isinstance(node, str):
            parts.append(node)
            return
        if node.tag in ('textarea', 'script', 'style', 'noscript'):
            return
        if any(c.startswith('RK') for c in node.classes):
            return
        if node.tag == 'strong' and clean(node.text()) == 'Proof:':
            stopped = True
            return
        if node.tag == 'br':
            parts.append(' ')
            return
        for child in node.children:
            visit(child)

    visit(container)
    return clean(''.join(parts)), stopped


def _complete(container):
    nodes = list(container.walk())
    if any(BAD.intersection(n.classes) for n in nodes):
        return False, 'failedProofDeclarations'
    if any(c in ('ConjStatusOpen', 'ConjStatusRelative',
                 'HBConjStatusOpen', 'HBConjStatusRelative')
           for n in nodes for c in n.classes):
        return False, 'incompleteProofDeclarations'
    content = rendered(container)
    starts = list(re.finditer(r'\[\[CALC\]\]', content))
    if starts:
        for i, start in enumerate(starts):
            part = content[start.end():starts[i + 1].start() if i + 1 < len(starts) else len(content)]
            if '[[END]]' not in part or '[[BADHINT]]' in part:
                return False, 'uncheckedCalculationDeclarations'
            header = part.split('\n', 1)[0]
            if 'expected goal' in header and '[[MATCH]]' not in part.split('[[END]]', 1)[1]:
                return False, 'unmatchedGoalDeclarations'
        return True, 'calculationProofDeclarations'
    # A direct `By` proof has proven By status and Found diagnostics, without
    # calculation markers. The enclosing proven theorem alone is insufficient.
    direct = any('ConjStatusProven' in n.classes and clean(n.text()) == 'By' for n in nodes)
    confirmed = any('RKConfirmedOK' in n.classes and clean(n.text()).startswith('Found ') for n in nodes)
    return (True, 'directProofDeclarations') if direct and confirmed else (False, 'uncheckedProofDeclarations')


def extract_html(raw, source_name):
    tree = Tree()
    tree.feed(raw)
    port = PORT.search(raw)
    source_id = f'notebook-2026-{port[1]}' if port else 'notebook-html-' + hashlib.sha256(source_name.encode()).hexdigest()[:12]
    audit = Counter()
    rows = []
    cells = [n for n in tree.root.walk() if n.tag == 'div' and 'tabindex' in n.attrs
             and any(isinstance(x, Node) and x.tag == 'textarea' for x in n.children)]
    for ordinal, cell in enumerate(cells, 1):
        sidebar = next((x for x in cell.children if isinstance(x, Node) and x.tag == 'div'), None)
        number = re.search(r'\[(\d+)\]', sidebar.text()) if sidebar else None
        cell_number = int(number[1]) if number else ordinal
        parents = {id(child): n for n in cell.walk() for child in n.children if isinstance(child, Node)}
        headers = [n for n in cell.walk() if clean(n.text()) in KINDS
                   and any(c.startswith('ConjStatus') for c in n.classes)]
        for declaration_index, header in enumerate(headers, 1):
            audit['renderedDeclarations'] += 1
            if 'ConjStatusProven' not in header.classes:
                audit['unprovenDeclarations'] += 1
                continue
            container = parents.get(id(header))
            while container is not None and container.tag in ('span', 'strong'):
                container = parents.get(id(container))
            if container is None:
                audit['unparsedDeclarations'] += 1
                continue
            statement, has_proof = _statement_text(container)
            if not has_proof:
                audit['missingProofDeclarations'] += 1
                continue
            complete, reason = _complete(container)
            audit[reason] += 1
            if not complete:
                continue
            # Colon inside a quoted name is legal; consume the header tokens
            # rather than splitting at the first colon anywhere in the text.
            match = re.fullmatch(r'(Theorem|Lemma|Corollary)\s*((?:(?:\([^()]+\)|“[^”]+”|"[^"\n]+")\s*)*):\s*(.+)', statement)
            if not match:
                audit['unparsedDeclarations'] += 1
                continue
            kind, tokens, formula = match.groups()
            names = [m[1] or m[2] for m in re.finditer(r'“([^”]+)”|"([^"\n]+)"', tokens)]
            numbers = re.findall(r'\(([^()]+)\)', re.sub(r'“[^”]+”|"[^"\n]+"', '', tokens))
            if len(statement) > EXCERPT_LIMIT:
                audit['oversizedDeclarations'] += 1
                continue
            locator = {'file': source_name, 'cell': cell_number,
                       'declaration': declaration_index, 'section': 'Notebook proved theorems'}
            rows.append({'sourceId': source_id, 'locator': locator, 'excerpt': statement,
                         'kind': kind, 'numbers': numbers, 'names': names,
                         'formula': formula, 'sideCondition': None})
            audit['eligibleDeclarations'] += 1
    audit['notebookCells'] = len(cells)
    return rows, dict(audit)


def collection(source_root, reviewed_weeks=None):
    """Collect only saved 160xx notebook HTML, with relative filenames and hashes."""
    root = Path(source_root)
    if reviewed_weeks is None:
        evidence_path = Path(__file__).resolve().parents[1] / 'research/preloaded/homework-week-evidence.json'
        reviewed_weeks = json.loads(evidence_path.read_text()).get('sources', {}) if evidence_path.exists() else {}
    declarations, sources = [], []
    totals = Counter()
    for path in sorted(root.rglob('*.html')):
        if any(p.endswith('_files') for p in path.relative_to(root).parts):
            continue
        raw_bytes = path.read_bytes()
        raw = raw_bytes.decode('utf-8')
        port = PORT.search(raw)
        if not port:
            continue
        source_name = path.relative_to(root).as_posix()
        rows, counts = extract_html(raw, source_name)
        declarations.extend(rows)
        totals.update(counts)
        week = notebook_week(source_name, raw, reviewed_weeks)
        if not rows:
            continue
        reviewed = reviewed_weeks.get(f'calc-2026-{port[1]}')
        week_evidence = ({'method': 'reviewed homework correspondence', 'sourceId': f'calc-2026-{port[1]}', **reviewed}
                         if reviewed and re.search(r'\bHomework\s+\d+', source_name, re.I)
                         else {'method': 'Exercise N.x' if re.search(r'\bExercise\s+\d+\.\d+', source_name, re.I) else 'Homework folder' if week is not None else 'unassigned'})
        sources.append({'id': f'notebook-2026-{port[1]}', 'name': '2026 ' + path.name.split(' — ')[0] + ' · proved notebook theorems',
                        'url': f'http://130.113.68.214:{port[1]}/', 'year': 2026,
                        'weeks': [week] if week is not None else [], 'weekEvidence': week_evidence, 'file': source_name,
                        'sha256': hashlib.sha256(raw_bytes).hexdigest(), 'port': int(port[1]),
                        'format': 'CalcCheck proved notebook declarations',
                        'sourceType': 'notebook-proved', 'declarations': len(rows),
                        'localCapture': 'research/notebooks/proved-declarations.json',
                        'status': 'checked-rendered-declaration-extraction', **counts})
    return {'sources': sources, 'declarations': declarations, 'audit': dict(totals)}


collect_notebooks = collection
