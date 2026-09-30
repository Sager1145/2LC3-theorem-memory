from __future__ import annotations

import sys
from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "tools"))

from preloaded_ledger import build_ledger, capture_paths, inverse_audit  # noqa: E402


class PreloadedLedgerTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.ledger = build_ledger(ROOT)
        cls.by_key = {row.key: row for row in cls.ledger}

    def occurrence(self, source_id: str, line: int):
        return self.by_key[(source_id, line)]

    def test_every_capture_and_occurrence_is_retained_deterministically(self):
        paths = capture_paths(ROOT)
        expected_count = len(list((ROOT / "research/preloaded/raw").glob("hw*.txt")))
        expected_count += len(
            list((ROOT / "research/preloaded/raw2025i-extra").glob("port*.txt"))
        )
        expected_count += len(list((ROOT / "research/preloaded/raw2026").glob("port*.txt")))
        self.assertEqual(expected_count, len(paths))
        self.assertEqual(expected_count, len({row.source_id for row in self.ledger}))
        self.assertEqual(self.ledger, build_ledger(ROOT))
        self.assertEqual(len(self.ledger), len(self.by_key))

    def test_2025i_extra_captures_use_their_provenance_namespace(self):
        occurrence = self.occurrence("calc-preloaded-2025i-15002", 5)
        self.assertEqual("PropLogic.All", occurrence.section)
        self.assertEqual(
            "research/preloaded/raw2025i-extra/port15002.txt",
            occurrence.local_capture,
        )

    def test_extended_reference_tokens_round_trip(self):
        examples = {
            ("calc-preloaded-hw01", 101): ("3.57=",),
            ("calc-preloaded-hw12", 288): ("8.12.1₂",),
            ("calc-preloaded-hw13", 472): ("15.44A",),
            ("calc-preloaded-hw22", 183): ("dom.100",),
        }
        for key, references in examples.items():
            with self.subTest(key=key):
                self.assertEqual(references, self.by_key[key].references)

        mixed = self.occurrence("calc-preloaded-hw15-1", 385)
        self.assertEqual(("11.7", "11.7∀"), mixed.references)

    def test_names_and_slash_section_are_preserved(self):
        names = self.occurrence("calc-preloaded-hw01", 97)
        self.assertEqual(
            (
                "Definition of ⇒ via ∨",
                "Definition of ⇒ from ∨",
                "Definition of ⇒",
                "Definition of implication",
            ),
            names.names,
        )
        section = self.occurrence("calc-preloaded-hw17", 491)
        self.assertEqual("Reference/ReferenceNotebook_BasicRelProps_SOL", section.section)

    def test_inference_and_condition_continuations_are_complete(self):
        sequence = self.occurrence("calc-2026-16010", 11)
        self.assertEqual(14, sequence.end_line)
        self.assertEqual(3, len(sequence.continuations))
        self.assertIn("P ⇒⁅ C₁ ⁆ Q", sequence.raw_block)
        self.assertEqual(
            "P ⇒⁅ C₁ ⁆ Q , Q ⇒⁅ C₂ ⁆ R ⊦ P ⇒⁅ (C₁ ⍮ C₂) ⁆ R",
            sequence.formula,
        )

        conditioned = self.occurrence("calc-preloaded-hw12", 285)
        self.assertEqual(286, conditioned.end_line)
        self.assertEqual(("— CalcCheck: Proviso: ¬occurs(`y`, `F`)",), conditioned.conditions)
        self.assertIn("CalcCheck: Proviso", conditioned.raw_block)

    def test_inverse_audit_reports_an_uncovered_raw_occurrence(self):
        first, second = self.ledger[0], self.ledger[1]
        cards = [
            {
                "id": "covered",
                "name": first.names[0] if first.names else "unnamed",
                "aliases": list(first.names[1:]),
                "numbers": list(first.references),
                "kind": first.kind,
                "kinds": [first.kind],
                "formula": first.formula,
                "formulaVariants": [first.formula],
                "sources": [
                    {
                        "sourceId": first.source_id,
                        "locator": {"line": first.start_line, "section": first.section},
                        "excerpt": first.header,
                    }
                ],
            }
        ]
        sources = [
            {"id": first.source_id, "declarations": 2},
        ]
        audit = inverse_audit([first, second], cards=cards, sources=sources)
        self.assertEqual(1, audit["coveredOccurrences"])
        self.assertEqual(second.source_id, audit["uncoveredOccurrences"][0]["sourceId"])
        self.assertEqual(second.start_line, audit["uncoveredOccurrences"][0]["startLine"])
        self.assertEqual([], audit["fieldMismatches"])


if __name__ == "__main__":
    unittest.main()
