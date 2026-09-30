# 测试与交付验证

2026-09-30 最新全题库正确/错误输入与压力验收见 [全题库压力测试报告](THEOREM_STRESS_REPORT.md)：233,677 项引擎断言、16,332 次逐卡浏览器提交、额外 1,000 题同页混合压力均通过。修复了名称全大写误判，优化了反斜线归一化与选择题特征计算；更新下载压力下的超时和最终单独复测分别保留证据。下文保留此前各轮结果。

## 最终整合验证 · 2026-09-30

本节是最终整合版本的验证记录；以下较早阶段的测试数量、文件指纹、待批准说明和失败记录保留为历史，不代表当前发布状态。用户已明确授权完成测试后提交并推送 main。

| 检查 | 最终结果 |
|---|---|
| Node 测试 | 44 项常规回归和 1 项完整题库审计分别通过，覆盖全部 45 项 Node 测试；完整审计 233,677 项检查、失败 0。 |
| `python3 -m unittest discover -s tests -p 'test_*.py'` | 38/38 通过。此前 notebook hints 的 `KeyError` 在最终整合版本中未再出现。 |
| `python3 tools/preloaded_ledger.py --fail-on-audit` | 115 份来源、25,462 次定位；未覆盖、孤立定位、字段不一致均为 0。 |
| `npm run build` | 网站和单文件 HTML 构建通过；最终题库 1,341 张卡。 |
| `python3 tools/build_ios_web.py --output /private/tmp/2lc3-final-ios.html` | iOS 内置离线 HTML 生成通过。 |
| 浏览器 | smoke 42 场景、proof 3 场景、题库更新 13 组，以及重启/连续两轮各 200 题均通过；JavaScript 错误 0。详见 [最终浏览器报告](FINAL_BROWSER_TEST_REPORT.md)。 |
| 全量判题与压力 | 8,166 个适用卡片/题型组合共 16,332 次浏览器提交全部通过，重复提交未重复计分；另有 1,000 次连续混合作答通过。87 个无法构造有效错误答案的组合使用非法输入或跳过。结构化结果见 [全量判题](test-results/exhaustive-grading.json)、[逐卡浏览器](test-results/browser-exhaustive.json) 和 [混合压力](test-results/browser-mixed-stress.json)。 |
| iOS | 最新源码构建通过 35 项单元测试和 10 项 UI 测试，失败 0。最终模拟器验证、结果包和运行限制见 [最终 iOS 报告](FINAL_IOS_TEST_REPORT.md)。 |
| 差异检查 | 源码、数据、文档和工程通过。原始捕获文本保留原有空白，未重写来源。 |
| 分支清单 | `git fetch --all --prune` 与远程 heads 核对后，本地和远程均只有 main；不存在需合并或删除的其他分支。 |

最终题库修订号为 `7945ec0305c16e3467c1f043df2485ce51491fdd5d9df06909085cbb2ed58ab2`。生成的清单校验值与本地发布 JSON 一致。重复 Xcode 工程副本、构建产物、用户状态和私人原稿由 `.gitignore` 排除。提交使用 GitHub noreply 身份，保留现有历史。

浏览器测试修复了本地 HTTP 服务器连接队列过小造成的 `app.js` 连接重置，并提供 `--channel chromium` 的可复现命令；没有降低判题或数据校验断言。更新检查的脚本等待上限为 45 秒，长于应用本身的 30 秒下载超时，以验证实际失败回退。线上部署结果在提交推送后通过对应 GitHub Actions 运行核对。

后续全量测试还修复了名称归一化错误：全大写名称中的 `NOT`、`AND`、`OR` 不再被当作公式运算符。判题引擎同时缓存快捷符号替换和名称选择特征，缓存会在卡片名称、公式或别名变化时失效。最终引擎 SHA-256 为 `618c94065599f05d3e406e68dc2733487a5d042f17cfa4e6cb508f25590d285b`。

## 较早阶段记录

核对日期：2026-09-30。本轮数据仅来自已打开的预载定理弹窗。

| 检查 | 结果 |
|---|---|
| `npm test` | 23/23 通过。包括同名 group 的编号精确匹配、平凡恒等式误判回归、复杂公式题型分配、来源逐行核对、Week 清单、跨年份模块标签和重复计数，以及全部可读弹窗的展开记录。 |
| `python3 -m unittest discover -s tests -p 'test_*.py'` | 7/7 通过。 |
| `python3 tools/preloaded_ledger.py --fail-on-audit` | 115 份来源、25,462 次声明全部覆盖；未覆盖 0、孤立定位 0、字段不一致 0。 |
| `python3 tools/build_site.py --out _site --portable _site/Theorem-Quest-Standalone.html` | 静态网站和单文件版构建成功。 |
| Chromium DOM 集成 | 获得本机 Chromium 运行权限后，本地 HTTP 加载的 26/26 场景通过，JavaScript 错误 0；涵盖六种题型、交换律误判回归、2025i/2026 notebook、Week 筛选，以及 320px/390px 窄屏的符号选择/修改/恢复/锁定、内置键盘完整字母填空和编号组作答。 |
| Chromium 压力与离线 | 默认四轮共 200/200 题通过，三次重启沿用同一原生资料目录，首轮第 25 题刷新恢复；localStorage 与 Service Worker 离线刷新通过，JavaScript 错误 0。首次加载 128 ms，答题中位数 49 ms、P95 94 ms、最大 104 ms。 |
| Chromium 连续进程压力 | `--uninterrupted --channel chromium`：同一完整 Chromium 进程完成四轮共 200/200 题、浏览器重启 0；含第 25 题刷新恢复、原生持久化和离线刷新，JavaScript 错误 0。首次加载 561 ms，答题中位数 97 ms、P95 582 ms、最大 811 ms；堆检查点 6.4–30.9 MiB，刷新后监听器数保持 32。 |
| 数据可复现与范围语义 | 隔离副本重建全部 1,335 张卡、115 份来源和 25,462 次定位；重复重建字节稳定。2,988 个年份/Week/notebook/来源组合及 3 个旧 ID 迁移全部通过。初次来源 JSON 与浏览器数据包仅键序不同，解析内容一致。 |
| 发布文件隐私检查 | 当前可发布文件未匹配个人邮箱、本机用户目录、私钥或已知服务令牌模式；Xcode 用户状态、重复工程和私人原稿被忽略，未列入拟发布文件。旧历史仍有 7 次提交的个人邮箱元数据；本轮保留历史，拟议新提交使用 GitHub noreply 身份。 |
| iOS 模拟器测试 | Xcode 27.0 / iPhone 17 Pro 模拟器，单元测试 16/16、UI 测试 6/6 通过；覆盖答题、学习范围、进度持久化、版本同步、重复 ID 拒绝、离线回退、搜索/收藏、同公式与同名编号干扰项回归和完整练习流程。 |
| iOS 本地更新与窄屏显示 | 真实构建清单的下载/哈希/条目数安装、原子快照恢复、收藏保留、HTTP 503 回退、坏校验回退及同版本免下载六项通过。375 点 iPhone SE 模拟器完成最长 161 字符公式详情换行、收藏和十题流程；Times 正文、Menlo 公式及绿/蓝/金配色截图可读。 |
| iOS Reduce Motion / 放大文字 | 隔离临时副本中的两项验收通过，分别覆盖收藏和完整十题流程；放大文字另覆盖最长公式边界、滚动可达与截图检查。系统设置及应用 SwiftUI 环境值均已确认；未修改共享生产 Swift 或工程。 |

2025i 现场展开记录覆盖 87 份可读弹窗，2026 覆盖 28 份；每份最终折叠数为零，可见声明数与原始捕获逐份相等。记录分别见 [2025i 核对数据](../research/preloaded/audit-2025i-verification.json) 和 [2026 核对数据](../research/preloaded/audit-2026-popup-verification.json)。

DOM 场景测试使用内存存储替身；压力脚本单独验证了本地 HTTP 来源上的原生持久化和 Service Worker 离线安装。连续进程测试已在完整 Chromium 上通过；一次有界 headless-shell 尝试在第 150 题检查点后、第 175 题前退出，Playwright 报告进程 exitCode=0、signal=null，随后出现 TargetClosedError。该失败运行未到最终 JavaScript 错误断言，不能标为零错误；没有确认应用缺陷，退出原因仍未证明。上述本地测试不代替真实 GitHub Pages 部署验收。性能数据仅代表本次本机 Chromium 运行，非跨设备性能保证。复杂量词、替换及命令题采用保守匹配，网站也不宣称复现完整 CalcCheck 证明引擎。

旧的 iOS 系统 Reduce Motion 与放大文字验收被环境重启中断，随后在隔离临时副本中补完。Reduce Motion 开关开启且应用环境值确认收到该设置，收藏切换、十题反馈/下一题/完成流程通过；视频抽帧未见采样题目切换的水平滑动。放大文字使用系统 accessibility-extra-large 并确认应用环境值，搜索、最长公式详情换行、收藏、十题练习、完成和返回设置通过；截图检查确认文字在屏幕内换行、控件可通过滚动到达。测试中的可见标记、滚动与点击定位修正未进入生产源码。当前共享 iOS 文件无变更。应用重启前的旧日志与截图不可用，其通过结果保留在聊天记录中；补充验收产物见 [冻结 iOS 接续报告](/tmp/2lc3-ios-continuation.md)，其中列出两项测试的 xcresult、日志、视频及导出截图路径。

## 重跑

```bash
python3 tools/import_preloaded.py
python3 tools/enrich_2026.py
python3 tools/build_weekly_inventory.py
python3 tools/preloaded_ledger.py --fail-on-audit
python3 -m unittest discover -s tests -p 'test_*.py'
npm test
npm run build
python3 tests/browser_smoke.py
python3 tests/browser_stress.py
python3 tests/browser_stress.py --uninterrupted --channel chromium
```

浏览器测试需要 Python Playwright 与 Chromium；在部分 macOS 沙箱中 Chromium 启动需要额外系统权限。

## 最终本地整合与发布准备

本轮接续已重新运行 `npm test`（23/23）、Python unittest（7/7）、来源账本（25,462 次定位，未覆盖/孤立/字段不一致均为 0）、`npm run build`，全部通过。工作区 `git diff --check` 通过；全量 HEAD 差异检查在 35 份原始捕获文本中报告 1,882 处行末空白及 1 处 EOF 空行，保留原文不作格式重写。排除这些原始捕获后，代码、数据、文档和工程的差异检查通过。数据和浏览器接续结果从已完成聊天记录恢复；原 `/tmp` 报告及浏览器截图在应用重启后已丢失，未声称原始临时证据仍可访问。当前三个浏览器验收数据指纹仍一致：

| 文件 | SHA-256 |
|---|---|
| `assets/data.js` | `2d84a101c3bd990566af34d378ad4e2b4112268668a3dd3cb39d050498d5e976` |
| `data/theorems.json` | `c9389ade14e1cf7d880bb07f0b00ebab8ead06f446835739c27625c55b470ab8` |
| `data/weekly-inventory.json` | `7b499031e9b9810a3883d8531ea236f5f547cf778429ed515c559d7189936606` |

构建产物包含 17 个文件，仅有入口、图标、manifest、Service Worker、四个静态资源、七份数据及单文件版。生成的 `data/version.json` 校验值与实际发布 JSON 一致，题库条数为 1,335，修订号为 `bcdc82ad300ee36430b443e77c0f8241e8b0f0b7ec2bbe1ccdf981332d7ba28e`。构建时间随每次构建变化，数据修订号保持稳定。

本轮只读检查确认远程 `main` 与本地 HEAD 一致。入口中四个已变更资源统一使用 `?v=20260930-week-scope`；Service Worker 使用新缓存 `theorem-quest-preloaded-20260930-v12`。

当前 Pages 发布和真实 HTTPS 来源的持久化/离线验收均未进行。待用户批准后：

1. 复查最终差异及文件清单，将已核对的源码、审计、测试和 iOS 工程暂存；不暂存 `_site`、私人原稿、用户状态或临时测试结果。使用 GitHub noreply 身份提交，保留现有历史。
2. 再确认远程 `main` 与当前基准一致；若变化，先整合并重新核对。推送获批的提交到 `main`，让现有 “Test and deploy Theorem Quest” Actions 工作流构建和发布 `_site`。
3. 核对 workflow 成功且对应获批提交；在实际项目子路径核对入口、资源查询版本、定理/来源 JSON 哈希及版本清单，并下载单文件版验证加载。
4. 在实际 HTTPS 来源等待 Service Worker 控制和缓存建立，验证一次练习保存后的重新加载及离线重新加载。浏览器本地 HTTP 与线上来源的学习记录分别保存。
5. 核对 iOS 从线上清单读取到同一数据修订号，并记录更新校验、下载失败回退及原生收藏/进度保留结果。

前一整合聊天已暂存 125 个文件；本轮保留该暂存区，新增文档和入口查询版本修正留在工作区，待批准后复核并补充暂存。本轮未执行 `git add`、commit、push、workflow 手动触发或 Pages 发布。HEAD 仍为 `2305505a97b44c07b7c24822e84ac1e829f9cebd`。

前一整合聊天的 main 提交尝试被自动批准审查拒绝，理由是未建立可信的公开发布授权。尚无新提交或发布；最终 commit、push 和 Pages 发布均等待用户对本轮具体结果授权。

拟议提交标题：`Integrate audited Week scopes, mobile practice, and offline iOS client`。合并发布差异共 125 个文件（23 修改、102 新增）；原暂存区为 125 个文件，本接续的最终修改仅在 `README.md`、`docs/TEST_REPORT.md` 和 `index.html`，尚未补充暂存。全量文本差异：125 files changed, 664951 insertions(+), 72372 deletions(-)。

## Notebook proved theorem import · 2026-09-30

Imported 76 checked declarations from 8 of the 24 saved 2026 notebooks. Exact matching attaches 70 declaration occurrences to existing cards; 6 declarations create new cards, for 1,341 total cards. Week 3 receives 39 proved occurrences, Week 4 receives 9 (reviewed H7.2 correspondence), and 28 Assignment 1 occurrences remain unassigned by week. Both ordinary practice and notebook/year/week filters include these declarations.

Validation: 40 Node tests, 32 Python tests, 42 browser smoke scenarios (including all six new cards in regular weekly practice), and the unchanged 25,462-occurrence popup ledger pass. Static and standalone builds pass. Browser tests use the existing in-memory storage double. Native iOS compilation and deployment were not rerun for this data change.

A later wildcard notebook-test run also picked up concurrently added `test_notebook_hints.py`; its `test_duplicate_exports_and_uncaptured_are_not_false_zero` fails with `KeyError: name` in `build_notebook_hints.py`. Those files are outside this import change. The 9 extraction and 2 import tests were rerun separately and pass.
