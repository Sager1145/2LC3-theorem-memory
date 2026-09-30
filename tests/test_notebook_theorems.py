from pathlib import Path
import hashlib
import tempfile
import unittest

from tools.notebook_theorems import collection, extract_html, notebook_week


def calculation(checked=True, matched=True):
    return ('<span class="ConjStatusProven">Calculation for expected goal</span> `x = x`:<br>'
            'PRIVATE PROOF STEP<br>'
            + ('<span class="RKConfirmedOK">All steps OK</span>' if checked else '')
            + ('<span class="RKConfirmedOK">Calculation matches goal ─ OK</span>' if matched else ''))


def notebook(status='Proven', body=None, declaration='Theorem (A1.2a) “Identity: example”: x = x'):
    kind, rest = declaration.split(' ', 1)
    return ('<!-- saved from url=(0028)http://130.113.68.214:16022/ -->'
            '<div tabindex="0"><div>[14]</div><textarea>PRIVATE EDITOR</textarea><div>'
            f'<strong><span class="ConjStatus{status}">{kind}</span></strong> {rest}<br>'
            '<strong>Proof:</strong><br>' + (body if body is not None else calculation())
            + '</div></div>')


class NotebookTheoremsTests(unittest.TestCase):
    def test_statement_is_declaration_not_calculation_or_editor(self):
        rows, counts = extract_html(notebook(), 'A1/example.html')
        self.assertEqual(counts['eligibleDeclarations'], 1)
        row = rows[0]
        self.assertEqual(row['sourceId'], 'notebook-2026-16022')
        self.assertEqual(row['locator']['cell'], 14)
        self.assertEqual(row['numbers'], ['A1.2a'])
        self.assertEqual(row['names'], ['Identity: example'])
        self.assertEqual(row['formula'], 'x = x')
        self.assertNotIn('PRIVATE', str(row))
        self.assertNotIn('Proof:', row['excerpt'])

    def test_open_relative_and_unchecked_rejected(self):
        for raw in [notebook(status='Open'), notebook(status='Relative'),
                    notebook(body=calculation(checked=False)),
                    notebook(body=calculation(matched=False)),
                    notebook(body=calculation() + '<span class="RKInvalid">failed</span>'),
                    notebook(body=calculation() + '<span class="HBConjStatusRelative">⟨</span>')]:
            with self.subTest(raw=raw):
                self.assertEqual(extract_html(raw, 'week3/example.html')[0], [])

    def test_all_nested_calculations_must_complete(self):
        raw = notebook(body=calculation() + calculation(checked=False))
        self.assertEqual(extract_html(raw, 'example.html')[0], [])
        raw = notebook(body=calculation() + calculation())
        self.assertEqual(len(extract_html(raw, 'example.html')[0]), 1)

    def test_checked_direct_by_corollary(self):
        direct = ('<strong><span class="ConjStatusProven">By </span></strong>“Identity”'
                  '<span class="RKConfirmedOK">Found “Identity”</span>')
        rows, counts = extract_html(notebook(body=direct, declaration='Corollary “Identity”: 0 + a = a'), 'example.html')
        self.assertEqual(rows[0]['kind'], 'Corollary')
        self.assertEqual(counts['directProofDeclarations'], 1)
        self.assertEqual(extract_html(notebook(body=direct.replace('Found ', 'Missing ')), 'example.html')[0], [])

    def test_unnamed_and_multiple_numbers_preserved(self):
        rows, _ = extract_html(notebook(declaration='Lemma (3.1) (3.1a): p ∨ q ≡ q ∨ p'), 'example.html')
        self.assertEqual(rows[0]['names'], [])
        self.assertEqual(rows[0]['numbers'], ['3.1', '3.1a'])
        self.assertEqual(rows[0]['formula'], 'p ∨ q ≡ q ∨ p')

    def test_popup_and_no_explicit_proof_do_not_qualify(self):
        popup = '<strong><span class="ConjStatusProven">Theorem</span></strong> “Popup”: y = y'
        self.assertEqual(extract_html(popup, 'example.html')[0], [])
        self.assertEqual(extract_html(notebook().replace('<strong>Proof:</strong>', ''), 'example.html')[0], [])

    def test_week_assignment(self):
        self.assertEqual(notebook_week('week2/Ex3.1 — Exercise 3.1.html'), 3)
        self.assertEqual(notebook_week('week3/H7.1 — Homework 7.html'), 3)
        self.assertIsNone(notebook_week('A1/A1.1 — Assignment 1.html'))
        self.assertIsNone(notebook_week('week2/A1.1 — Assignment 1.html'))
        self.assertEqual(notebook_week('arbitrary.html', '<title>Extra Exercise 2.5: Knights</title>'), 2)

    def test_reviewed_homework_week_precedes_folder_but_not_exercise(self):
        evidence = {'calc-2026-16022': {'weeks': [4], 'confidence': 'high'}}
        self.assertEqual(notebook_week('week3/H7.2 — Homework 7.html', notebook(), evidence), 4)
        self.assertEqual(notebook_week('week3/Exercise 3.4.html', notebook(), evidence), 3)

    def test_collection_filters_ports_and_empty_sources_and_hashes_bytes(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            raw = notebook()
            (root / 'Exercise 3.1.html').write_text(raw)
            (root / 'bad.html').write_text(notebook(status='Open').replace('16022', '16023'))
            (root / 'old.html').write_text(raw.replace('16022', '15022'))
            result = collection(root)
            self.assertEqual(len(result['sources']), 1)
            source = result['sources'][0]
            self.assertEqual(source['weeks'], [3])
            self.assertEqual(source['sha256'], hashlib.sha256(raw.encode()).hexdigest())
            self.assertEqual(source['declarations'], 1)
            self.assertEqual(source['sourceType'], 'notebook-proved')
            self.assertEqual(result['audit']['unprovenDeclarations'], 1)


if __name__ == '__main__':
    unittest.main()
