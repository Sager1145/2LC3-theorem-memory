#!/usr/bin/env python3
"""Extract a lossless occurrence ledger from copied CalcCheck popup text.

The ledger is deliberately separate from card deduplication.  Every declaration
in every capture remains addressable by its source id and starting line.
"""
from __future__ import annotations

import argparse
from collections import Counter, defaultdict
from dataclasses import asdict, dataclass
import json
from pathlib import Path
import re
from typing import Iterable, Sequence


ROOT = Path(__file__).resolve().parents[1]
RAW_2025 = ROOT / "research/preloaded/raw"
RAW_2025I_EXTRA = ROOT / "research/preloaded/raw2025i-extra"
RAW_2026 = ROOT / "research/preloaded/raw2026"
DATA = ROOT / "data"

KINDS = (
    "Derived inference rule",
    "Primitive inference rule",
    "Axiom",
    "Theorem",
    "Lemma",
    "Corollary",
    "Fact",
)
START = re.compile(r"^(" + "|".join(map(re.escape, KINDS)) + r")\b")
SECTION = re.compile(r"^[A-Za-z][A-Za-z0-9._/-]*$")
NAME = re.compile(r"“([^”]+)”")
REFERENCE = re.compile(r"\(([^()\s]+)\)")
CONDITION_PREFIX = "— CalcCheck:"
NON_SECTIONS = {
    "OK",
    "Operator",
    "Operator Precedences",
    "Symbol",
    "Symbol Entry Codes",
}


@dataclass(frozen=True)
class Occurrence:
    source_id: str
    local_capture: str
    start_line: int
    end_line: int
    section: str | None
    kind: str
    references: tuple[str, ...]
    names: tuple[str, ...]
    formula: str
    conditions: tuple[str, ...]
    header: str
    continuations: tuple[str, ...]
    raw_block: str

    @property
    def key(self) -> tuple[str, int]:
        return self.source_id, self.start_line

    def to_dict(self) -> dict:
        return asdict(self)


def _source_id(path: Path) -> str:
    if path.parent.name == "raw" and re.fullmatch(r"hw.+\.txt", path.name):
        return f"calc-preloaded-{path.stem}"
    match = re.fullmatch(r"port(\d+)\.txt", path.name)
    if path.parent.name == "raw2025i-extra" and match:
        return f"calc-preloaded-2025i-{match.group(1)}"
    if path.parent.name == "raw2026" and match:
        return f"calc-2026-{match.group(1)}"
    raise ValueError(f"unsupported popup capture path: {path}")


def _split_header(line: str) -> tuple[str, str]:
    """Split at the first colon outside a curly-quoted declaration name."""
    quoted = False
    for index, char in enumerate(line):
        if char == "“":
            quoted = True
        elif char == "”":
            quoted = False
        elif char == ":" and not quoted:
            return line[:index], line[index + 1 :]
    return line, ""


def _references(header: str) -> tuple[str, ...]:
    # Parentheses inside quoted names are prose, not reference tokens.
    without_names = NAME.sub("", header)
    return tuple(REFERENCE.findall(without_names))


def _clean_formula_piece(value: str) -> str:
    return value.replace("\u00a0", " ").strip().replace("`", "")


def parse_capture(path: Path, root: Path = ROOT) -> list[Occurrence]:
    """Parse one popup capture without deduplicating any declarations."""
    path = path.resolve()
    lines = path.read_text(encoding="utf-8").splitlines()
    if not lines or not lines[0].endswith(" Theorem List"):
        raise ValueError(f"missing theorem-list header: {path}")
    if not lines[-1].endswith("OK"):
        raise ValueError(f"missing popup OK footer: {path}")

    # Captures normally put OK on its own line; tolerate a final declaration
    # followed immediately by OK because that is how the popup can be copied.
    if lines[-1] == "OK":
        lines = lines[:-1]
    else:
        lines[-1] = lines[-1][:-2]

    source_id = _source_id(path)
    try:
        local_capture = path.relative_to(root.resolve()).as_posix()
    except ValueError:
        local_capture = path.as_posix()

    pending: list[dict] = []
    section: str | None = None
    current: dict | None = None
    for line_number, exact_line in enumerate(lines, 1):
        classified = exact_line.rstrip()
        kind_match = START.match(classified)
        if kind_match:
            current = {
                "start_line": line_number,
                "end_line": line_number,
                "section": section,
                "kind": kind_match.group(1),
                "header": exact_line,
                "continuations": [],
            }
            pending.append(current)
        elif SECTION.fullmatch(classified) and classified not in NON_SECTIONS:
            section = classified
            current = None
        elif current is not None and exact_line[:1].isspace() and exact_line.strip():
            current["continuations"].append(exact_line)
            current["end_line"] = line_number
        elif classified:
            current = None

    occurrences: list[Occurrence] = []
    for item in pending:
        header_text, tail = _split_header(item["header"].rstrip())
        continuation_text = tuple(item["continuations"])
        cleaned_continuations = tuple(line.strip() for line in continuation_text)
        conditions = tuple(
            line for line in cleaned_continuations if line.startswith(CONDITION_PREFIX)
        )
        formula = _clean_formula_piece(tail)
        if not formula:
            formula = " ".join(
                _clean_formula_piece(line)
                for line in cleaned_continuations
                if not line.startswith(CONDITION_PREFIX)
            )
        raw_lines = (item["header"], *continuation_text)
        occurrences.append(
            Occurrence(
                source_id=source_id,
                local_capture=local_capture,
                start_line=item["start_line"],
                end_line=item["end_line"],
                section=item["section"],
                kind=item["kind"],
                references=_references(header_text),
                names=tuple(NAME.findall(header_text)),
                formula=formula,
                conditions=conditions,
                header=item["header"],
                continuations=continuation_text,
                raw_block="\n".join(raw_lines),
            )
        )
    if not occurrences:
        raise ValueError(f"capture contains no declarations: {path}")
    return occurrences


def capture_paths(root: Path = ROOT) -> list[Path]:
    return [
        *sorted((root / "research/preloaded/raw").glob("hw*.txt")),
        *sorted((root / "research/preloaded/raw2025i-extra").glob("port*.txt")),
        *sorted((root / "research/preloaded/raw2026").glob("port*.txt")),
    ]


def build_ledger(root: Path = ROOT) -> list[Occurrence]:
    return [occurrence for path in capture_paths(root) for occurrence in parse_capture(path, root)]


def _normalized(formula: str) -> str:
    return re.sub(r"\s+", "", formula.replace("`", ""))


def inverse_audit(
    occurrences: Sequence[Occurrence],
    cards: Sequence[dict] | None = None,
    sources: Sequence[dict] | None = None,
    data_dir: Path = DATA,
) -> dict:
    """Compare the occurrence ledger with generated card source locators."""
    if cards is None:
        cards = json.loads((data_dir / "theorems.json").read_text(encoding="utf-8"))
    if sources is None:
        sources = json.loads((data_dir / "sources.json").read_text(encoding="utf-8"))

    expected = {occurrence.key: occurrence for occurrence in occurrences}
    locator_cards: dict[tuple[str, int], list[tuple[dict, dict]]] = defaultdict(list)
    for card in cards:
        for origin in card.get("sources", []):
            source_id = origin.get("sourceId", "")
            line = origin.get("locator", {}).get("line")
            if source_id.startswith(("calc-preloaded-", "calc-2026-")) and isinstance(line, int):
                locator_cards[(source_id, line)].append((card, origin))

    uncovered = [expected[key] for key in sorted(expected) if key not in locator_cards]
    orphan_keys = sorted(key for key in locator_cards if key not in expected)
    duplicate_keys = sorted(key for key, values in locator_cards.items() if len(values) > 1)

    field_mismatches = []
    for key in sorted(expected.keys() & locator_cards.keys()):
        occurrence = expected[key]
        card, origin = locator_cards[key][0]
        represented_names = {card.get("name"), *card.get("aliases", [])}
        represented_kinds = {card.get("kind"), *card.get("kinds", [])}
        represented_formulas = card.get("formulaVariants") or [card.get("formula", "")]
        issues = []
        if occurrence.kind not in represented_kinds:
            issues.append("kind")
        if any(name not in represented_names for name in occurrence.names):
            issues.append("names")
        if any(reference not in card.get("numbers", []) for reference in occurrence.references):
            issues.append("references")
        if _normalized(occurrence.formula) not in {_normalized(value) for value in represented_formulas}:
            issues.append("formula")
        if origin.get("locator", {}).get("section") != occurrence.section:
            issues.append("section")
        if issues:
            field_mismatches.append(
                {
                    "sourceId": key[0],
                    "line": key[1],
                    "cardId": card.get("id"),
                    "issues": issues,
                }
            )

    ledger_by_source = Counter(occurrence.source_id for occurrence in occurrences)
    locators_by_source = Counter(key[0] for key in locator_cards)
    source_definitions = {
        source.get("id"): source
        for source in sources
        if source.get("id", "").startswith(("calc-preloaded-", "calc-2026-"))
    }
    all_source_ids = sorted(set(ledger_by_source) | set(source_definitions))
    count_mismatches = []
    for source_id in all_source_ids:
        ledger_count = ledger_by_source[source_id]
        declared_count = source_definitions.get(source_id, {}).get("declarations")
        locator_count = locators_by_source[source_id]
        if declared_count != ledger_count or locator_count != ledger_count:
            count_mismatches.append(
                {
                    "sourceId": source_id,
                    "ledger": ledger_count,
                    "declared": declared_count,
                    "locators": locator_count,
                }
            )

    return {
        "ledgerOccurrences": len(occurrences),
        "ledgerSources": len(ledger_by_source),
        "dataLocators": sum(len(values) for values in locator_cards.values()),
        "coveredOccurrences": len(expected) - len(uncovered),
        "uncoveredOccurrences": [
            {
                "sourceId": occurrence.source_id,
                "startLine": occurrence.start_line,
                "endLine": occurrence.end_line,
                "kind": occurrence.kind,
                "references": list(occurrence.references),
                "names": list(occurrence.names),
            }
            for occurrence in uncovered
        ],
        "orphanLocators": [
            {"sourceId": source_id, "line": line} for source_id, line in orphan_keys
        ],
        "duplicateLocators": [
            {"sourceId": source_id, "line": line} for source_id, line in duplicate_keys
        ],
        "fieldMismatches": field_mismatches,
        "sourceCountMismatches": count_mismatches,
    }


def summary(occurrences: Iterable[Occurrence]) -> dict:
    rows = list(occurrences)
    by_era = Counter("2026" if row.source_id.startswith("calc-2026-") else "2025" for row in rows)
    return {
        "sources": len({row.source_id for row in rows}),
        "occurrences": len(rows),
        "occurrences2025": by_era["2025"],
        "occurrences2026": by_era["2026"],
        "withContinuations": sum(bool(row.continuations) for row in rows),
        "withConditions": sum(bool(row.conditions) for row in rows),
    }


def _human_report(result: dict) -> str:
    stats = result["summary"]
    audit = result["audit"]
    lines = [
        (
            f"ledger: {stats['occurrences']} occurrences from {stats['sources']} sources "
            f"(2025: {stats['occurrences2025']}, 2026: {stats['occurrences2026']})"
        ),
        (
            f"data: {audit['coveredOccurrences']} covered, "
            f"{len(audit['uncoveredOccurrences'])} uncovered, "
            f"{len(audit['orphanLocators'])} orphan locators, "
            f"{len(audit['fieldMismatches'])} field mismatches"
        ),
    ]
    for row in audit["uncoveredOccurrences"]:
        lines.append(f"uncovered: {row['sourceId']}:{row['startLine']} {row['kind']}")
    for row in audit["sourceCountMismatches"]:
        lines.append(
            f"count: {row['sourceId']} ledger={row['ledger']} "
            f"declared={row['declared']} locators={row['locators']}"
        )
    return "\n".join(lines)


def main(argv: Sequence[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--json", action="store_true", help="emit the summary and audit as JSON")
    parser.add_argument(
        "--fail-on-audit",
        action="store_true",
        help="return nonzero when an occurrence or locator fails the inverse audit",
    )
    args = parser.parse_args(argv)

    ledger = build_ledger()
    result = {"summary": summary(ledger), "audit": inverse_audit(ledger)}
    if args.json:
        print(json.dumps(result, ensure_ascii=False, indent=2, sort_keys=True))
    else:
        print(_human_report(result))
    audit = result["audit"]
    failed = any(
        audit[key]
        for key in (
            "uncoveredOccurrences",
            "orphanLocators",
            "duplicateLocators",
            "fieldMismatches",
            "sourceCountMismatches",
        )
    )
    return 1 if args.fail_on_audit and failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
