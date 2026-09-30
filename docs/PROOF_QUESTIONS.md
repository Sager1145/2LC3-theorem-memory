# Completed proof hint exercises

The user confirmed the OneDrive `CS2LC` directory as the intended 2026 notebook collection. Only saved CalcCheckWeb notebook HTML with a `160xx` source URL is scanned; PDFs, DOCX notes, archives, popup theorem declarations, and instructional HTML are excluded.

The extractor requires a proven enclosing theorem when present, a proven calculation header, proven hint brackets, `All steps OK`, and `Calculation matches goal` for calculations with an expected goal. It preserves each consecutive expression / relation and hint / expression triple. Diagnostics are omitted. The answer is the one explicit theorem name, with substitution and fact context retained around `{{name}}`. Number-only references require a unique named declaration in the existing bank.

The confirmed source collection contains 24 notebook HTML files and 587 cells. Nine notebooks contain 120 completed calculations across 78 proof cells, yielding 436 completed steps. The 369 eligible exercises exclude 52 unnamed or unquoted hints, 9 numbered hints whose bank declarations are unnamed ((3.14), (3.32), (3.67)), and 6 hints containing multiple named theorems. No source proof is invented or completed by the importer.

Run:

```sh
python3 tools/build_proof_questions.py '/Users/sager/OneDrive - McMaster University/classsssssssssses/CS2LC'
python3 -m unittest discover -s tests -p test_proof_questions.py
```

Generated files: `data/proof-questions.json`, `data/proof-audit.json`, and `assets/proofs.js`. The JavaScript exports separate proof questions and proof-source metadata; proof questions remain separate. Verified enclosing theorem declarations are also imported into the normal bank by `tools/import_notebook_theorems.py`.

All scanned source files are listed below. Zero means the saved HTML contains no eligible checked calculation; empty editor text is not treated as a completed proof.

| Source HTML (relative to CS2LC) | Completed calculations | Eligible steps |
| --- | ---: | ---: |
| A1/A1.1 — Assignment 1 Notebook 1_ Propositional Calculus — CalcCheckWeb.html | 25 | 110 |
| A1/A1.2 — Assignment 1 Notebook 2_ Assignment Commands with Boolean Variables — CalcCheckWeb.html | 3 | 13 |
| week1/Ex1.1 — Exercise 1.1_ Simple Calculations in CalcCheck — CalcCheckWeb.html | 0 | 0 |
| week1/Ex1.2 — Exercise 1.2_ An Equational Theory of Integers — CalcCheckWeb.html | 0 | 0 |
| week1/Ex1.3 — Exercise 1.3_ Substitution — CalcCheckWeb.html | 0 | 0 |
| week1/Ex1.7 — Exercise 1.7_ Correctness of Assignment Commands — CalcCheckWeb.html | 0 | 0 |
| week1/H1 — Homework 1_ Getting Started with CalcCheck — CalcCheckWeb.html | 0 | 0 |
| week1/H2 — Homework 2_ Expressions and Calculations — CalcCheckWeb.html | 0 | 0 |
| week2/Ex2.1 — Exercise 2.1_ First Steps in Propositional Calculus following LADM Chapter 3 — CalcCheckWeb.html | 0 | 0 |
| week2/Ex2.2 — Exercise 2.2_ Propositional Calculus_ Disjunction — CalcCheckWeb.html | 0 | 0 |
| week2/Ex2.3 — Exercise 2.3_ Propositional Calculus_ Conjunction — CalcCheckWeb.html | 0 | 0 |
| week2/Ex2.4 — Exercise 2.4_ Propositional Calculus_ Implication — CalcCheckWeb.html | 0 | 0 |
| week2/Ex2.5 — Extra Exercise 2.5_ Knights and Knaves — CalcCheckWeb.html | 0 | 0 |
| week2/Ex2.6 — Exercise 2.6_ Assignment Commands with Boolean Variables — CalcCheckWeb.html | 0 | 0 |
| week2/H3 — Homework 3_ Correctness of Assignment Commands — CalcCheckWeb.html | 0 | 0 |
| week2/H4 — Homework 4_ First Steps in Propositional Calculus following LADM Chapter 3 — CalcCheckWeb.html | 0 | 0 |
| week2/H5 — Homework 5_ Propositional Calculus — CalcCheckWeb.html | 0 | 0 |
| week3/Ex3.1 — Exercise 3.1_ Natural Numbers and Induction_ Addition and Multiplication — CalcCheckWeb.html | 14 | 37 |
| week3/Ex3.2 — Exercise 3.2_ Monus Subtraction of the Natural Numbers — CalcCheckWeb.html | 18 | 49 |
| week3/Ex3.3 — Exercise 3.3_ Equality and Predecessors in ℕ — CalcCheckWeb.html | 13 | 39 |
| week3/Ex3.4 — Exercise 3.4_ Simple Proofs `By cases` on ℕ — CalcCheckWeb.html | 14 | 38 |
| week3/H6 — Homework 6_ Natural Numbers and Induction — CalcCheckWeb.html | 10 | 22 |
| week3/H7.1 — Homework 7 Notebook 1_ Calculations with Monotonicity and Antitonicity — CalcCheckWeb.html | 4 | 11 |
| week3/H7.2 — Homework 7 Notebook 2_ Order on ℕ — CalcCheckWeb.html | 19 | 50 |
