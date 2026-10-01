# Final iOS test report

## 手机键盘与 iOS／网页功能同步验收（2026-09-30）

当前源码重新构建后，在 iPhone SE（第 3 代）模拟器、iOS 27.0、标准文字大小下，**53 项全部通过，0 失败、0 跳过**：36 项 Swift 单元测试、17 项 UI 测试。Xcode 退出码为 0，结果包独立确认 53 项通过；测试前后源码指纹一致。生成的 App 内置 HTML 已核对，与当前网页全部脚本及 CSS 一致。

| 功能 | 网页端与 iOS 当前行为 |
| --- | --- |
| 名称回忆、Proof 定理填空 | 系统键盘输入；三个字符后提供名称候选；触屏 Tab 补全。名称中的特殊符号支持反斜线补全。 |
| 名称选择 | 可触摸选择、提交并结束关卡。 |
| 字母填空 | 启用系统键盘；支持普通字母及 `\alpha` 等希腊变量，触屏 Tab 补全并换空。仍可收起系统键盘后使用内置按键。 |
| 符号填空 | 新增系统键盘输入当前空位；可直接输入符号或 `\land`、`\equiv` 等代码；触屏 Tab 补全，再按 Tab 换空。支持修改、恢复关卡和完整判题。 |
| 公式拼写 | 系统键盘和内置符号键可用；支持反斜线、补全、左右光标、括号补齐与删除。 |
| 反斜线符号 | 补全保留代码文本，按符号对应的代码判题。 |
| 共用资源与页面 | 七种题型、七项导航共用网页引擎；修正 i18n 构建依赖。语言、主题、题库、专项复习与证明引用保持功能一致。 |
| 学习记录迁移 | 两端保留现有 JSON 备份导入／导出；iOS 导出使用原生分享面板。本轮没有增加自动云同步。 |

修复 iOS WebKit 触摸固定快捷按钮时输入框失焦的问题，补全后键盘保持可用。窄屏及 iOS 大字号下快捷按钮自动换行；320／390px 检查确认七个按钮可见、可点击且至少 44px。候选列表触摸滑动不会误插入或丢失焦点。窄屏切换到内置变量键时，先点“完成”收起系统键盘。

验证证据：

- 9 项原生键盘 UI 测试全部通过，覆盖七种题型、多空符号反斜线补全及希腊变量。
- 其余 8 项 UI 回归全部通过：七项导航、专项复习、七题型离线启动、备份入口、Notebook Hint、关卡恢复、题型配置与更新失败回退。
- 网页 42 项冒烟检查通过，零 JavaScript 错误；手机输入、符号填空、显示设置和中文 IME／搜索焦点回归通过。
- 引擎测试 50 项通过；全题库判题报告覆盖 261,207 项检查，其中符号填空 1,040 题、4,528 个空位。全部实际特殊符号都有反斜线输入代码。
- iOS 内置资源一致性测试通过；静态网页及单文件版已重新生成到 `/private/tmp/2lc3-mobile-parity-site`。

机器可读结果与源码指纹：[mobile-keyboard-parity.json](test-results/mobile-keyboard-parity.json)。最终日志：`/private/tmp/2lc3-keyboard-rebuilt-final.log`；结果包：`/private/tmp/2lc3-keyboard-rebuilt-final.xcresult`。此前完整运行的两个失败来自旧测试辅助函数错误滚动；重新构建后这两个流程均通过，旧失败记录保留在 JSON 中。

此结果是本地构建验收，未部署网页或发布 App。真机、VoiceOver、完整 JSON 文件导入往返，以及最大辅助文字大小下的完整原生测试仍未验证。原有模拟器大字号设置已恢复，模拟器恢复关机状态。

## 较早构建的验收记录

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
