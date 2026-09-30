# Final Browser Test Report

On September 30, 2026, the final serial rerun against the updated theorem engine passed 42 smoke scenarios, three proof viewport/card cases and 13 bank update browser contexts, with no JavaScript errors. The engine SHA-256 was `618c94065599f05d3e406e68dc2733487a5d042f17cfa4e6cb508f25590d285b` before smoke, between scripts and after proof.

Both earlier full Chromium stress modes completed 200 correct answers with no JavaScript errors. Those stress results predate the shared engine caching and uppercase-name fixes; the separate whole-corpus and mixed stress audit covers the latest engine. The 200-answer runs were not repeated during this final rerun.

## Reproducible commands and results

Run from the repository root with Python 3 and Playwright installed. The successful full Chromium runs used Playwright Chromium 148.0.7778.96. Local HTTP binding and browser process launch required execution outside the restricted filesystem/process sandbox.

| Command | Result | Log |
| --- | --- | --- |
| `python3 tests/browser_smoke.py --channel chromium --screenshots /private/tmp/2lc3-final-browser/latest-screenshots` | 42 scenarios, zero JavaScript errors | `/private/tmp/2lc3-final-browser/latest-smoke.log` |
| `python3 tests/browser_proof.py` | Three cases: first proof at 390px and 1200px, longest proof at 390px; layout, resume, grading and review passed | `/private/tmp/2lc3-final-browser/latest-proof.log` |
| `python3 tests/browser_bank_updates.py --channel chromium` | 13 contexts; install/restore/unchanged, six rejected update defects, two saved-session changes, storage rejection, structured-content rejection, portable and native routing | `/private/tmp/2lc3-final-browser/latest-bank.log` |
| `python3 tests/browser_stress.py --channel chromium` | 200 correct answers across four lessons, three browser restarts, native storage reload and Service Worker offline reload passed | `/private/tmp/2lc3-final-browser/stress-restarts-chromium.log` |
| `python3 tests/browser_stress.py --uninterrupted --channel chromium` | 200 correct answers across four lessons in one process, native storage reload and Service Worker offline reload passed | `/private/tmp/2lc3-final-browser/stress-uninterrupted-chromium.log` |

The uninterrupted run passed before the HTTP backlog adjustment; the restart stress run used the updated harness. The final smoke, bank and proof runs used the latest source and ran serially. During this rerun, no product files changed. The bank harness SHA-256 was `cf44e2fd6656d1d8aa923f72304da41174d2fa8c9e418a81173ef9efe8e145fb` at completion; it includes the shared audit’s 45-second update-completion wait, allowing the application’s 30-second download limit to finish, and update-status diagnostics. The existing page startup timeout remains unchanged. Python syntax compilation and `git diff --check` also passed.

| Stress mode | Initial load | Answer median / P95 / max | Checkpoint heap range | Final heap |
| --- | --- | --- | --- | --- |
| Three restarts | 618 ms | 123 / 375 / 817 ms | 12.6–22.0 MiB | 14.4 MiB |
| Uninterrupted | 404 ms | 88 / 1093 / 2561 ms | 13.6–25.1 MiB | 17.7 MiB |

Both stress modes ended with one document and 34 event listeners. These timing values describe this local run, not a performance guarantee.

## Initial failures and test harness repair

The first sandboxed smoke attempt failed before opening a browser because binding its local HTTP socket was denied. The browser commands were subsequently authorized to execute outside that sandbox.

Initial smoke and bank runs encountered page startup timeouts. Smoke startup diagnostics captured `net::ERR_CONNECTION_RESET` for `assets/app.js`, while the engine and data globals loaded successfully. `TQDiagnostics` was absent and there were no JavaScript page errors. The Python test HTTP server used the default five-connection listen backlog, which was insufficient for the page's concurrent asset requests on this host. Each browser harness now uses a `ThreadingHTTPServer` subclass with a backlog of 128. The following full Chromium smoke and bank runs passed without increasing their assertion timeouts or adding retries.

Smoke and bank now accept `--channel chromium`, while preserving their default browser selection. Their startup diagnostics retain failed request, HTTP error, console error, global availability and resource timing evidence. This makes the successful commands reproducible without the temporary channel-selection wrapper used during diagnosis.

Separate headless-shell attempts experienced `TargetClosedError`: the first smoke run closed during answer-variant setup, and default restart stress closed while clicking Check Answer after the 125-answer checkpoint. Their logs contain no JavaScript errors. These browser process closures were not independently root-caused; the successful full Chromium runs establish the tested product behavior on that channel. Early scripts ran concurrently; all final successful runs were serial.

Failed-attempt logs remain in `/private/tmp/2lc3-final-browser/`: `smoke.log`, `smoke-retry.log`, `smoke-full-chromium.log`, `smoke-channel-diagnostics.log`, `bank-updates.log`, and `stress-default.log`.

## Scope

Smoke uses an explicit in-memory storage double. Proof uses native browser localStorage. Bank update tests exercise real browser storage and stubbed update HTTP responses; their native routing uses a JavaScript message-handler double. Stress exercises real localStorage, persistent browser profiles and a real Service Worker with offline reload.

These checks use a local HTTP server. They do not certify the deployed GitHub Pages site or native iOS storage/message handling. Mobile checks use browser viewport widths, not physical phones.
