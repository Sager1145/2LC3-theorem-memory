# 定理闯关 iOS

最低 iOS 17，仅支持 iPhone。SwiftUI 外壳通过 `CompleteQuestView.swift` 的 WKWebView 载入 App 内置的 `TheoremQuest.html`，复用网页版界面、题型和判题引擎。主导航为闯关、定理库、专项复习、证明引用、错题本、资料审计、设置；无需登录，首次打开即可离线学习。

## 功能

- 七种题型：名称回忆、名称选择、字母填空、符号填空、公式拼写、反斜线符号、Proof 定理填空。公式输入、符号键盘、提示、作答反馈、同组名称与公式变体均由 web engine 处理；Proof 题仅接受定理名称。
- 按年份、Notebook、Week、章节、来源、编号区间筛选；Week 可选仅当周或包含此前周次。同一定理可属于多个 Week，按卡片 ID 去重。支持 Important／多次出现／重点与高频专项范围、手选卡片、收藏与范围预设。
- 记录错题、复练、学习历史、每日作答、连续练习、XP 和未完成关卡；所有页面共享同一份本机学习记录。
- 设置中可导出或导入学习备份、导出题库 JSON、重设范围及清空记录。导出通过 iOS 分享面板保存；导入通过 WKWebView 的文件输入选择 JSON，并在替换记录前确认。备份上限为 3 MB。
- 资料审计保留题库覆盖范围、来源和判题边界。外部来源链接在 Safari 面板打开，访问原网页需要网络。

Important 和重复次数来自 `documentStudy` 的课程文档依据：多次出现指至少两次声明或明确引用（含同一文档多次引用），同一资料的导出副本不重复累加；重点与高频是 Important 或多次出现的合集。旧题库仍可读取，但缺少 `documentStudy` 的卡片不进入专项范围；更新中的同 ID 同公式卡片可保留内置文档依据；原资料 `!!` 强调与 Important 标签分别展示。定理详情可查看依据，作答提示由同一网页引擎提供。

## 构建

需要 Xcode、XcodeGen 和 `/usr/bin/python3`。在仓库根目录运行：

```bash
cd ios
xcodegen generate --spec project.yml
open TheoremQuest.xcodeproj
```

选择 `TheoremQuest` scheme 与 iPhone 模拟器运行。真机安装需在 Signing & Capabilities 中选择自己的 Team。`project.yml` 是工程配置源文件，修改后重新运行 XcodeGen。

Xcode 的构建脚本调用 `tools/build_ios_web.py`，将当前网页 HTML、CSS、engine/data/app JavaScript 内联到 App bundle 的 `TheoremQuest.html`。该步骤无需安装 pip 依赖；课程资料重新提取所用的 Python 依赖属于另一流程。也可单独验证生成：

```bash
python3 tools/build_ios_web.py --output /private/tmp/TheoremQuest.html
```

## 离线与本机存储

界面和判题脚本内置于 App，学习过程不依赖线上站点，也不调用 AI 或外部 API。内置 `data/theorems.json` 与 `data/sources.json`，可用已校验的下载快照替换；Swift 注入原始 JSON，保留网页版需要的额外字段。

完整学习进度、设置和未完成关卡通过原生 storage bridge 保存至 App 的 UserDefaults，键为 `quest.web.storage.v1`，内部保留 `tq.progress.v1`、`tq.settings.v1`、`tq.session.v1`。它与 Safari／网页版浏览器的记录独立，跨设备迁移需手动导出、导入，没有云同步。分享文件临时写入 `QuestExports` 目录，关闭分享面板后删除。

首次使用新界面时，从旧原生 `Application Support/TheoremQuest/progress.json` 迁移收藏、待复练错题和每日作答次数，并设置一次性迁移标记。旧版本未保存的逐题历史、XP 和各题累计作答统计不会补造。迁移的待复练项按一条已知错题显示，后续依照网页版的分题型修复规则累积。

## 题库更新

设置中的“管理题库更新”打开原生更新面板。客户端从 `https://sager1145.github.io/2LC3-theorem-memory/` 获取 `data/version.json`；版本变化时下载题库和来源 JSON，校验 SHA-256、条目数与数据结构后切换快照。失败时继续使用内置或上次成功下载的数据。只有安装了不同版本的题库，关闭更新面板才会重新载入学习界面；取消或失败时保留当前页面。

兼容尚未发布版本清单的旧 Pages：仅当清单返回 HTTP 404 时，通过 HTTPS 获取同站点的 `data/theorems.json` 与 `data/sources.json`，校验结构、非空题库和唯一 ID 后保存快照。旧版兼容流程没有发布者清单哈希可比对，本机计算的哈希用于后续快照恢复校验。其他网络错误或无效清单不会触发兼容流程。更新请求绕过缓存，与内置题库相同的线上版本也会显示版本信息。

快照位于 App 的 `Application Support/TheoremQuest/snapshots/<revision>/`，当前清单位于 `Application Support/TheoremQuest/version.json`。题库更新不清空原生 bridge 中的学习记录，卡片关联依赖稳定 ID。

启动时会检查更新，成功检查后 24 小时内跳过自动重复检查；面板可手动检查。后台通过 `BGAppRefreshTask` 请求约 24 小时后的刷新，实际调度由 iOS 决定。新题库需先完成仓库 Pages 部署；客户端读取已发布的结构化数据，不直接抓取课程 notebook，也不自动把未核验的候选内容变成题卡。

## 验证

离线 HTML 生成和 Xcode 模拟器构建已通过。网页的单元测试及浏览器集成场景已通过；模拟器端另行检查 WebKit 与原生桥接。在 Xcode 的 `TheoremQuest` scheme 中运行 Test，或在仓库根目录运行（设备名按本机调整）：

```bash
xcodebuild -project ios/TheoremQuest.xcodeproj -scheme TheoremQuest \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro' \
  CODE_SIGNING_ALLOWED=NO test
```

`LibraryStoreTests` 包含离线加载、更新校验、失败回退和快照恢复等测试。UI 测试已改为新 WebKit 主界面，覆盖五项导航、六题型入口、离线启动、关卡重启恢复、原生 JSON 分享与更新失败回退。实际运行结果以测试日志为准；文件导入完整往返、VoiceOver 与真机仍需单独检查。

`FillKeyboardUITests` 专门验证内置 WebKit 的字母与符号填空：一致变量改名、符号切换、提交后键盘锁定、结果与重新开始。iOS 字母填空使用内置键盘，自动前进时保持滚动位置；判题要求重复变量一致，不同变量不能合并。

发布前应在模拟器与真机检查六项导航、六种题型、范围筛选与预设、错题与统计、退出后恢复关卡、JSON 分享与导入、旧记录迁移，以及更新失败后继续离线学习。飞行模式下首次启动并完成一关，可检查内置资源是否完整。公式判题采用网页版的保守匹配规则，复杂语法和题库覆盖的实际边界见“资料审计”。

界面采用暖白、松石绿和蓝灰文字，使用彩色关卡与立体按钮；当前统一浅色外观，不使用纯黑背景。iOS 文字大小通过原生 Dynamic Type 与网页 rem 字号桥接同步，保持手机视口尺寸；题库更新面板使用原生可缩放文字。题卡与来源可在线更新，覆盖说明及待核对清单随 App 内置版本发布，并在资料审计中标明。

本次验证记录（2026-09-30）：网页浏览器集成 41 个场景通过；iOS 首页已在小屏 iPhone 模拟器视觉检查。五项导航、原生分享、关卡重启恢复和更新失败回退至少各有一次模拟器通过记录。完整 UI 测试尚未全部通过：存在并行运行导致的模拟器启动失败、WebKit 可访问性定位问题，且测试中途源码由其他 chat 更新。不能将这些部分通过记录视为全套或真机验收。

补充验收：六种题型已分别在模拟器离线启动；最终定向测试中的字母填空键盘完成/重开、符号选择与判题、五项导航均通过。375px 视口在 100%、150%、200% 文字大小下无横向溢出。完整文件导入往返与真机仍未验证。

最终整合验收（2026-09-30）：包含证明模块及最新名称判题修复的构建，在隔离 iOS 27.0 模拟器上通过全部 35 项单元测试和 10 项 UI 测试，失败 0。覆盖填空键盘、导航、专项复习、证明引用、六项原有题型入口、原生分享、关卡恢复及更新失败回退。较早的部分通过及中断记录保留为历史；最终命令、源码指纹和结果包见 [最终 iOS 测试报告](../docs/FINAL_IOS_TEST_REPORT.md)。真机、完整文件导入往返及 VoiceOver 未在本轮验证。

The production web view also includes the **证明引用** page and offline `notebook-hints.js`: actual proof Hint uses, repeated-use lists by Notebook/year/Week, evidence positions and precise-card focused practice. Coverage and ambiguity handling follow [NOTEBOOK_HINTS](../docs/NOTEBOOK_HINTS.md). The Xcode build regenerates the bundled HTML when this asset changes.
