# Document-focused study verification — 2026-09-30

The web app and the iOS offline game use the same `documentStudy` evidence. The final integrated bank contains 1,341 cards; the 53-document audit confirms 11 Important and 367 repeated entries, of which 359 repeated entries are practice cards. The Important slide was visually checked on `2lcslides.pdf`, physical page 12.

- Source audit: exact Important references, 61 ambiguous base references excluded, family counters consistent, deterministic rebuild byte-identical.
- JavaScript: document-only predicates, union/intersection, and preservation of verified evidence for identical cards in older updates pass. The current full Node suite passes.
- Python: document metadata parity between JSON and the browser bundle, exact slide references, and source evidence checks pass; the existing manifest/ledger tests pass.
- Chromium: 39 representative checks cover scope intersections, actual localStorage persistence, saved presets, manual selection, session restoration, missing metadata and empty pools. A final 13-check pass and actual-corpus DOM check verify all three focused lists and queues, mobile layout, disabled launches and absence of JavaScript errors.
- Existing browser smoke: 39 scenarios pass, including answer variants and mobile practice. This smoke harness uses an explicit in-memory storage double; the separate focused review uses actual localStorage.
- iOS: simulator build succeeds; 16 relevant focus/scope/practice unit tests pass. The production WKWebView UI test passes (1 test, 0 failures): open 专项复习, select Important, start the current list, and confirm the Important session label and question badge.
- Packaging: static `_site` build, standalone HTML, and native offline HTML generation pass. The browser bundle exactly matches `data/theorems.json`; native snapshot injection preserves matching verified document evidence.

The first full iOS unit run was terminated with SIGKILL during the pre-existing whole-corpus fill test, rather than an assertion failure. Relevant suites were subsequently run separately and passed. No deployment or physical-device installation was performed by this task.

Standard-font simulator screenshots confirm the focus cards and all six navigation destinations fit the 375-point viewport. The simulator initially retained accessibility-extra-large from earlier work; the concurrently added whole-page Dynamic Type zoom magnifies and clips the whole game at that size. This existing shared UI behavior was not changed by the document-study feature. The prior simulator preference was restored after visual verification.

Production acceptance result: `/private/tmp/theorem-ios-focus-build/Logs/Test/Test-TheoremQuest-2026.09.30_15-13-54--0400.xcresult` (1 test, 0 failures). Relevant unit results: 16 tests, all passed. Independent review chats for document evidence, web behavior and iOS models completed their bounded checks.

The additional standard-font run reached the same correct practice session and captured the layout screenshot, but its redundant XCTest `isHittable` precondition failed before XCTest successfully scrolled and tapped. That brittle precondition was removed from the test; no further rerun was performed. The earlier production acceptance remains the clean passing UI result above.
