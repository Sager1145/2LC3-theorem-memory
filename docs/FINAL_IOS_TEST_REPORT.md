# Final iOS test report

2026-09-30, final-source acceptance on iPhone 17 Pro simulator, iOS 27.0 (24A434), arm64, standard Dynamic Type (`large`).

**45 passed, 0 failed, 0 skipped:** 35 Swift Testing unit tests across 6 suites, plus all 10 XCUITest UI tests. Xcode exited 0 and reported `TEST EXECUTE SUCCEEDED`. The result bundle independently confirms all 45 passes. Unit suites finished in 19.236 seconds; UI tests in 345.496 seconds.

| UI test | Result | Seconds |
| --- | --- | ---: |
| `FillKeyboardUITests.testEmbeddedLetterKeyboardCompletesAndRestarts` | Passed | 45.389 |
| `FillKeyboardUITests.testEmbeddedSymbolKeyboardCanChangeAndGradeSelection` | Passed | 30.993 |
| `TheoremQuestUITests.testAllDestinationsAndOfflineHome` | Passed | 24.365 |
| `TheoremQuestUITests.testDocumentImportantFocusStartsOfflinePractice` | Passed | 20.997 |
| `TheoremQuestUITests.testEachModeCanStartOffline` | Passed | 98.520 |
| `TheoremQuestUITests.testNativeExportAndImportEntrances` | Passed | 26.621 |
| `TheoremQuestUITests.testNotebookHintUsedAndRepeatedListsStartOfflinePractice` | Passed | 23.423 |
| `TheoremQuestUITests.testSessionSurvivesRelaunch` | Passed | 27.376 |
| `TheoremQuestUITests.testSixPracticeModesAreEmbedded` | Passed | 17.049 |
| `TheoremQuestUITests.testUpdateFailureKeepsOfflineLibrary` | Passed | 30.764 |

The app was rebuilt with `build-for-testing`, then tested with `test-without-building`, `-parallel-testing-enabled NO`, and `CODE_SIGNING_ALLOWED=NO`. The generated bundled HTML contains the exact current engine, app, Notebook Hint, and proof scripts. Source hashes were checked again after completion and match the tested files. Machine-readable results and hashes: [ios-tests.json](test-results/ios-tests.json).

Earlier runs on the existing simulator stalled during accessibility snapshots while the host was under severe concurrent load. Fresh-device boot initially blocked waiting for SimLaunchHost; an independently occurring CoreSimulator service interruption cleared that condition. The recovered isolated run passed without product or test changes. These interrupted attempts are superseded by the complete final run.

The original simulator’s text-size preference was restored and verified as `UICTContentSizeCategoryAccessibilityXL`. Only this task’s stalled xcodebuild and orphan diagnostic collector were stopped. The temporary isolated simulator was shut down and removed after testing.

Local evidence retained:

- `/private/tmp/2lc3-final-isolated.xcresult`
- `/private/tmp/2lc3-final-isolated.log`
- `/private/tmp/2lc3-final-isolated-build.log`
- `/private/tmp/2lc3-final-isolated-summary.json`
- `/private/tmp/2lc3-coresimulator-sample.txt`
- `/private/tmp/2lc3-simlaunchhost-sample.txt`

The UI suite validates the native JSON export entrance, not a complete file import round trip. VoiceOver, physical devices, and a full UI suite at accessibility-extra-large remain separate validation.
