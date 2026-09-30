# Theorems actually used in notebook proof hints

`data/notebook-hints.json` inventories **rendered proof hints in the captured notebook body**, independently of the preloaded theorem popup. It includes every name in multi-theorem hints, numbered-only hints and direct `By` proofs. The list is wider than the one-answer practice-question bank.

The extraction reads only CalcCheck-rendered code cells. It excludes editable textarea drafts, prose/tutorial examples, diagnostic echoes, declaration headers and popup lists. Each distinct hint position counts once for each theorem group it names; repeating the same theorem on two real proof steps counts twice. Duplicate copies of one notebook export do not add usage.

Each use preserves source ID, code-cell number, calculation number, step and rendered line, original hint, bounded evidence excerpt, names and references. `checked` describes the individual hint brackets or `By` status. It does not claim the surrounding theorem or notebook is complete. An unchecked hint, if present in a future capture, remains visible with `checked: false`.

Resolution uses exact quoted theorem names/aliases and numeric references. A name shared by different formulas remains an **ambiguous theorem group** with `candidateTheoremIds`, rather than selecting an arbitrary formula. Exact numeric references can narrow a named group. Resolved groups have `theoremIds`; only these contribute to a precise card's `theoremCounts`. Missing names, assumptions, induction hypotheses and other structural hints remain visible as unresolved groups. Identical-formula duplicate cards may share a resolved group and source hint without inflating group totals.

`notebooks` includes every registered notebook, merged by year/port. `not-captured` means its body is unknown, not that it used zero theorems. `captured-no-rendered-hints` means the local saved body has no eligible rendered hints; it can still contain exercise templates. Captured file and URL evidence identify the inspected body. Only the local source directory is scanned; this script does not infer hints from a preloaded popup or fetch missing notebooks.

For every notebook, `hintUses` contains actual uses, `groupCounts` counts group use per distinct hint, and `theoremCounts` counts only resolved card use. Global `groups` retain notebook counts, checked hint counts and a `repeated` flag for two or more hint positions. Global repetition includes repeated use within one notebook. `summary` reports capture coverage separately from hint counts.

Rebuild after theorem import and document enrichment:

```sh
python3 tools/build_notebook_hints.py /path/to/CS2LC
python3 -m unittest discover -s tests -p test_notebook_hints.py
```

The current local capture covers 24 of 116 registered notebook ports. Nine captured notebooks contain 443 checked hint uses: 436 calculation hints and seven direct `By` proofs. These form 116 groups, of which 75 repeat. Eighteen groups are ambiguous and 24 are unresolved. These are capture totals, not a claim of complete live-notebook coverage.

Both web and the production iOS WKWebView share the offline asset `assets/notebook-hints.js`, regenerated alongside JSON by the extraction command. The navigation entry **证明引用** offers used/repeated lists, current Notebook/year/Week counts, original Hint evidence, ambiguity labels, and focused practice for precisely resolved cards. Searching also narrows that practice pool. Precise theorem cards show a Hint-use badge and evidence positions. The normal theorem-library focus menu also offers Hint-used and Hint-repeated scopes. Missing captures and captured bodies without rendered proof hints have separate labels.

Validation (2026-09-30): 42 Node tests and 38 Python tests passed, including per-Notebook scope/repetition, real-data count reconciliation, ambiguity exclusion and extraction tests. Production iOS acceptance passed (one test, zero failures): used/repeated lists, Notebook selector and repeated-Hint practice; all seven navigation entries fit at 375pt with standard text. Original source audit independently checked A1.1, Ex3.1, H7.1 and H7.2 Hint positions and direct By extraction. This validates saved-source behavior; it does not verify uncaptured live notebook bodies.

Independent Chromium acceptance also passed: all nine saved notebooks' paginated used/repeated lists matched independently aggregated local counts; uncaptured body handling, year/Week ranges, name/reference search, empty-search practice disabling, ambiguous candidates, actual Hint positions, precise-card evidence and focused-session membership were verified. At 375px all seven navigation entries and expanded evidence fit without horizontal overflow; no page JavaScript errors occurred.
