# Theorem Quest · 定理闯关

一个无需服务器、账号、API key 或前端依赖安装的 COMPSCI 2LC3 定理练习网站。采用短关卡、进度条、大按钮、即时反馈、连对 XP 和错题重试；界面与标志为独立设计，不是 Duolingo 或 CalcCheck 的官方产品。

> **题库来源：预载定理列表 + notebook 中已证明的定理。** 保留已核对的 2025i / 2026 预载声明，并纳入 2026 saved HTML 中经 CalcCheck 确认为已证明的 Theorem、Lemma、Corollary。重复声明合并并保留全部出处；未完成的证明任务不入库。`Exercise N.x` 的 N 归为 Week，Homework 优先使用已核对周次，缺少证据时使用课程周目录；Assignment 未确认周次则保持未归类。清单见 `docs/WEEKLY_INVENTORY.md`。

**在线练习：** https://sager1145.github.io/2LC3-theorem-memory/

**下载单文件版：** https://sager1145.github.io/2LC3-theorem-memory/Theorem-Quest-Standalone.html

新增 **Proof 定理填空**：在“配置练习”中勾选该题型，显示原 proof 中连续的起点、`= / ≡ ⟨定理名称空白⟩` 和终点，仅接受名称。题目只从用户确认的 2026 课程 HTML notebook 中已完成的计算提取；原提示里的替换条件保留，作答后显示完整原提示。证明步骤单独保存；已证明的定理声明也进入普通定理库。提取数量与跳过原因见 [proof-audit.json](data/proof-audit.json)。支持原 notebook / Week 筛选、续答、错题复练和学习备份。

重新提取（私有 notebook 不随网站发布）：

```sh
python3 tools/build_proof_questions.py "/path/to/2026-course-notebooks"
```

## 语言与外观

在「设置 → 界面与显示」选择简体中文或 English，以及浅色、深色或跟随系统。选项保存在本地，重启后恢复；中英文切换保留定理原名称、公式和原文片段。网页版、单文件版与 iOS 内置学习界面共享这些选项；iOS 外观同时应用到原生弹窗。

## 直接使用

构建后的 `_site/Theorem-Quest-Standalone.html` 可用浏览器直接打开，不依赖外部资源。部分浏览器不允许本地文件使用持久存储；网页会显示警告，仍可练习和导出备份。正式使用建议通过 GitHub Pages 固定在同一地址使用。

源码版也可以直接打开 `index.html`（须保留整个 assets 文件夹）。通过 HTTP 预览：

```bash
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 练习方式

| 题型 | 提示与作答 | 规则 |
|---|---|---|
| 名称回忆 | 看公式，输入三个字符后按前缀补全名称或别名；同名名称只出现一次 | 例如 `Gol`；同组名称可作答，选编号时须对应当前公式。接受来源别名，也可直接输入编号。 |
| 名称选择 | 看公式，从四个名称＋编号选项中选择 | 支持 1–4 和 Enter。难度可选简单／标准／困难，越难越优先出现相似名称、同名不同编号和相似公式。困难档的题目与选项排除结合律、对称性、自反性。避免重复标签与等价公式干扰项。 |
| 字母填空 | 显示名称＋编号，固定运算符与括号，只填各处变量 | 手机默认使用大字母按键；可开启完整键盘输入。接受一致的变量一一改名，不要求原来的 p/q/r。 |
| 符号填空 | 显示名称＋编号，隐藏公式中的运算符或关系符 | 手机默认使用大符号按键和干扰键，左右切换空位，红色退格删除。可开启 QWERTY 与反斜线补全。外层 =／≡ 保留；简单挖 1 空、标准挖其余约一半、困难挖其余全部，位置随机。 |
| 公式拼写 | 显示名称＋编号，按字母/符号键或直接键盘输入 | 支持常用 CalcCheck 风格反斜线输入；不是完整 CalcCheck 证明检查器。 |
| 反斜线符号 | 显示定理中的一个符号，输入其 CalcCheck 风格代码 | 候选可用方向键和 Tab 补全；同一符号的别名代码均可作答。 |

默认启用全部七种题型，也可勾选任意组合。关卡在范围内可用的已勾选题型之间轮换，避免只反复出现少数题型；手机端在题型和范围允许时约 50% 为选择题、40% 为字母／符号填空、10% 为完整输入题；未启用或无可用题目的类别会将占比让给其他可用类别。错题复练只轮换实际做错的已勾选题型。没有变量的卡片不会生成字母填空题，没有适合隐藏的符号则不会生成符号填空题。默认每关 10 题，可改为 1、5、10、15、20、30、50 题。无生命值、无强制计时，也不锁定后续单元。

**命名原则：** 正常显示名称时总是并列编号。原文没有编号时显示“未编号”和内部卡片 ID；内部 ID 不是教材编号。没有名称的条目显示“原文未命名”及原编号，名称回忆题须答原编号，不把占位文字当成名称。名称回忆/选择题的题干故意隐藏答案名称与编号。名称补全候选只显示并填入名称或别名，不匹配编号；原文未命名的题目不提供名称补全。选择题选项和作答反馈仍显示名称与编号。

**Hint / 提示：** 作答前点击“提示”获取线索。未命名或未编号的定理还会列出具体出现的 Week、notebook 链接、年份、模块及预载列表行号。Week 使用对应 notebook 的课程周次，未确认的周次显示未归类。使用提示后，本题会保留为待复练。

## 手动划范围

在首页或“定理库”选择年份、具体 notebook、Week 或弹窗的 `WeekN.*` 模块。选择 Week 后可切换“仅当周内容”或“包含此前全部 Week”；同一定理可出现在多个 Week，范围内按卡片去重。Week 按 `Exercise N.x` 的 N 和经定理、证明重合核对的 Homework 归类，包含这些 notebook 的全部预载定理与正文已证明定理；模块 Week 只包含明确带该标签的声明。2026 弹窗中带 Week 标签的模块只有 Week 3；2025i 弹窗有 Week 3/4/5/6/7/8/9/11。也可按模块、来源、Important、重复预载、收藏或错题筛选。编号输入支持：

```text
3.47
3.1-3.82.5
3.35-3.53, 15.1a-15.29
```

单独 `3.47` 包含其 a–f 子项。区间端点按数字分段比较，不是字符串排序；要包括子编号，端点请写到对应子编号，如 `3.82.5`。无编号条目不进入编号区间，可用主题/来源或逐条勾选。

逐条勾选，或“全选筛选结果”，再开启“仅练手选”。“保存范围”会同时保存筛选条件和勾选的卡片；不同筛选是交集，不是并集。手选为空时不会静默改成练全部。

## 原文重点与错题

网页版与 iOS 的“专项复习”提供 Important、多次出现、重点与高频三个列表，可以直接启动对应练习，并叠加年份、Notebook 与 Week 范围。

`★ IMPORTANT` 来自课程文档明确的 Important 标记；`↻ 文档出现 N 次` 表示文档中匹配的定理声明或明确引用。同族导出副本不累加；预载列表可用次数单独保存。此次读取 53 份课程资料，确认 11 条 Important 和 367 条多次出现条目（其中 359 条可用于答题）。定理详情显示来源文件、页码或行号及原文依据。提取方法见 [文档复习依据](docs/DOCUMENT_STUDY.md)。

答错、跳过、使用提示会进入错题本，并在启用本轮重试时稍后安排一次复练。同一张题卡在一轮中最多出现两次（包括初始出题和复练，不同题型也合并计数）；第二次仍需复练时，本次答题不再出现，留在错题本供下一轮练习。选题范围较小时，实际题数会按此上限缩短；恢复旧关卡时也会移除超出上限的待答题。错题按**定理＋题型**记录：做错的那一种题型连续无提示答对 2 次才归档。答对另一题型不会把原错误清掉；错题历史会保留。

XP、每日练习数、连续练习天数、收藏、错题和未完成关卡只保存在浏览器；没有跨设备云同步。离开未完成关卡会保存作答内容。“设置”可导出备份，导入前会检查文件并请求确认。

题目公式、定理名称、输入框及名称候选使用 `monospace`，与 [官方 CalcCheck Notebook](http://130.113.68.214:16019/) 的 `.CCCode` 字体一致。名称补全按 [CalcCheck 文档](https://www.cas.mcmaster.ca/~kahl/CalcCheck/CalcCheckDoc/GettingStartedWithCalcCheckWeb.html) 使用名称前缀匹配。

手机版与 iOS 默认用大按键完成填空；“完整键盘输入”选项默认关闭，开启后填空也可用 QWERTY。名称、Proof、公式、搜索等非填空输入始终使用页面内 QWERTY，所有输入均不唤起系统键盘。键位尽量接近电脑：数字行与额外标点放在字母区上方，保留 QWERTY、ASDF、ZXCV 行；Shift 切换大写和上档符号，覆盖美式键盘全部可打印字符。Tab 补全或切换空位，左右箭头移动光标，Backspace 删除，Return 补全或检查，Shift+Return 在公式中换行，Done 收起键盘。

完整键盘模式不显示直接输入数学符号的按钮，统一键入 `\` 及代码，再用候选、Tab 或空格完成。键盘上方的候选列表独立滚动，保留原 combobox/listbox 的关联；竖屏为题面、当前输入和键盘分区，横屏采用内容与键盘分列。收起键盘后恢复检查区和导航。

## 符号键盘

```text
\land / \wedge       ∧       \lor / \vee        ∨
\lnot / \neg         ¬       \equiv / \==       ≡
\nequiv              ≢       \implies / \=>     ⇒
\follows / \<==      ⇐       \cdot / \.         ·
\leq                 ≤       \geq               ≥
\forall              ∀       \exists            ∃
\with                ❙       \spot              •
\becomes / \:=       ≔       \[-  \]-           ⁅ ⁆
\;_                  ⍮       \NN  \ZZ  \BB      ℕ ℤ 𝔹
```

手机上的搜索、名称回忆、Proof、公式及范围保存输入共用 QWERTY；填空题默认使用大按键，也可通过选项开启 QWERTY。名称回忆与 Proof 在输入三个字符后显示名称候选，空格和特殊字符也计数。同名多编号的 theorem group 合并为统称候选，选择具体编号时仍按对应公式判题。输入单个 `\` 即可显示符号候选；符号代码回忆题补全后保留代码，其他公式字段补全为数学符号。

符号代码后按 Tab 或空格转换。完整快捷表在网页“设置 → 查看符号键盘”。**直接 `:=` 保持命令赋值，`\:=` 才转换成替换符号 `≔`；`=` 与 `≡` 不互相混同。** Enter 检查，Shift+Enter 换行。桌面版仍提供公式辅助键；手机版填空默认按键填入，其他输入通过 QWERTY 和反斜线补全。

## 判题不是“任何恒真式都行”

例如 `(3.47a) De Morgan`：

```text
原式：¬ (p ∧ q) ≡ ¬ p ∨ ¬ q
接受：¬ (x ∧ y) ≡ ¬ x ∨ ¬ y
拒绝：¬ (x ∧ y) ≡ ¬ x ∨ ¬ x
拒绝：true
```

系统先检查分词、一一变量改名，再对受支持的语法树做受限交换/结合匹配。量词、显式替换和命令等复杂语法采用保守模板匹配。接受来源中收录的同条目等价写法，但不宣称证明任意等价变形。每张卡保留类型和适用条件；ℕ 的截断减法不能当作 ℤ 减法。详情见 `docs/PROJECT_PLAN.md`。

## iPhone 客户端

`ios/` 提供 iOS 17+ 的离线客户端，App 内置 WKWebView 复用当前网页的七种题型、补全和判题引擎，以及定理库、专项复习、证明引用、错题与备份功能。字母和符号填空默认使用大按键，可开启 QWERTY 与反斜线补全。iOS 使用原生分享面板及经过哈希校验的题库更新；学习记录通过导出／导入在 App 与浏览器间迁移。构建、测试及更新说明见 [iOS README](ios/README.md)。

## GitHub Pages 部署

网页顶部“题库更新”及“设置 → 题库更新”可检查并安装当前部署发布的题库。网页先下载 `data/version.json`，同时获取定理、来源与完整学习数据 `data/study.json`（Proof 题、证明引用、Week 范围及审计元数据），校验 SHA-256、修订号、条目数与数据结构，再存入 IndexedDB，刷新页面后仍可使用；更新保留收藏、错题、历史与 XP。离线或校验失败时保留原题库。单文件版请转到在线网站更新。iOS 中同一入口打开原生更新面板，从此 Pages 地址安装题库；旧部署缺少清单时的兼容方式见 iOS README。

本项目附带 `.github/workflows/pages.yml`。官方部署方式核对日期：2026-09-29。

1. 把源码放在仓库根目录，保留 `.github` 文件夹。根目录应直接有 `index.html`、`assets/`、`data/`。
2. 仓库 **Settings → Pages → Build and deployment → Source → GitHub Actions**。
3. 向 `main` 或 `master` 推送。工作流先运行全部 Node 测试、Python 测试和预载来源账本核对，再将 `_site` 上传、部署。首次在设置启用 Pages 后，可到 Actions 手动运行 “Test and deploy Theorem Quest”。

不需要部署原始课件、笔记、私人 ZIP 或学习备份。工作流只复制公开静态文件，不会发布 `private-sources/`、原稿或测试环境。

工作流使用 GitHub 官方文档所示的 checkout v6、configure-pages v5、upload-pages-artifact v4、deploy-pages v4；部署环境 `github-pages`，仅部署任务持有 pages/id-token 写权限。

官方参考（文档链接，不是本项目已部署地址）：
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 测试与构建

```bash
# Node.js 20+；没有 npm 运行依赖，也不必 npm install
npm test
python3 -m unittest discover -s tests -p 'test_*.py'
python3 tools/preloaded_ledger.py --fail-on-audit

# Python 3；构建时仅使用标准库
python3 tools/build_site.py --out _site --portable _site/Theorem-Quest-Standalone.html
python3 -m http.server 8000 --directory _site

# 可选：浏览器 DOM 测试，需 Python playwright 和系统 Chromium
python3 tests/browser_smoke.py --screenshots test-results/screenshots
python3 tests/browser_bank_updates.py
python3 tests/browser_stress.py
python3 tests/browser_stress.py --uninterrupted --channel chromium
python3 tests/browser_mobile_inputs.py  # 手机屏幕输入、名称/定理组/Proof 补全和窄屏布局
python3 tests/browser_cloze_inputs.py  # 符号填空 QWERTY、反斜线补全、空位切换与恢复
python3 tests/browser_fill_buttons.py  # 默认按键填空、红色退格、移动、设置切换和锁定
python3 tests/browser_qwerty.py --browser chromium  # 全可打印字符、触控、补全和手机/iPad/横屏布局
python3 tests/browser_qwerty.py --browser webkit    # 同场景验证 WebKit
python3 tests/browser_exhaustive.py  # 全卡片适用题型，正确/错误输入与重复提交
python3 tests/browser_mixed_stress.py  # 同一页面连续 1,000 题，七题型混合
```

全题库答题与压力测试的覆盖、发现及复跑方式见 [全题库压力测试报告](docs/THEOREM_STRESS_REPORT.md)。

`docs/TEST_REPORT.md` 明确区分已跑测试和未验证项目。DOM 场景测试使用内存存储替身；压力脚本另行验证本地 HTTP 来源的原生持久化和 Service Worker 离线加载。GitHub Pages 的部署状态与版本清单另行核对；本地通过不能代替线上持久化与离线验收。详见 `docs/TEST_REPORT.md`。

## 更新课程预载列表

`research/preloaded/raw/` 保存原先 26 份 Homework 弹窗文本，`raw2025i-extra/`、`raw2026/` 和 `raw2026-extra/` 保存其余已核对弹窗；预载导入器读取列表文本；正文已证明声明由独立提取器读取并合并。更新或更正文本后运行：

```bash
python3 tools/import_preloaded.py
python3 tools/enrich_2026.py
python3 tools/build_weekly_inventory.py
python3 tools/preloaded_ledger.py --fail-on-audit
npm test
python3 tools/build_site.py --out _site
```

`research/preloaded/legacy-*` 保留旧题库及原始审计材料，`excluded-existing.json` 列出未能逐字对应预载声明的旧卡。新增 notebook 时先核对其确是课程提供的预载弹窗，再在审计索引中登记地址与原文捕获。发布后如修改静态资源，应更新 `sw.js` 的缓存版本。

## 结构

```text
index.html                  入口，全部路径相对，支持仓库子路径
assets/app.js               界面、七题型、范围、错题、存储、备份
assets/engine.js            分词、匹配、队列和学习状态；可独立测试
assets/data.js              自动生成的浏览器题库包
assets/style.css            响应式视觉与交互
 data/theorems.json         卡片与原写法变体
 data/sources.json          115 份可打开弹窗来源
 data/weekly-inventory.json 逐 notebook、Week 与原模块 Week 的出现清单
 data/review-candidates.json 当前为空；旧候选已归档
 data/extraction-audit.json 导入范围与旧卡排除摘要
 data/coverage.json         预载列表覆盖统计
 research/preloaded/        原始弹窗文本、旧版审计与排除清单
 tools/import_preloaded.py  从弹窗文本重建题库
 tools/                    旧提取工具、来源账本与静态构建
 ios/                      iPhone 客户端、原生离线题库与版本更新
 tests/                    自动测试
 docs/                     规划、资料审计、测试报告
 .github/workflows/pages.yml 自动测试及 Pages 部署
```

题库保留预载声明的模块与行号、正文已证明声明的原文件与 Cell，不附完整课件或完整证明。没有跟踪器、广告、外部字体或运行时 AI 请求。

## Notebook 已证明定理

```sh
python3 tools/import_notebook_theorems.py "/path/to/2026-course-notebooks"
python3 tools/build_weekly_inventory.py
```

精简声明捕获保存在 `research/notebooks/proved-declarations.json`，仅含声明、Cell、相对文件名与原 HTML 哈希。重新运行 `tools/enrich_2026.py` 会自动合并该捕获；也可运行无参数的 `tools/import_notebook_theorems.py` 重放。预载弹窗审计继续独立核对全部原声明。

### Notebook 证明中的 Hint 定理

网页与 iOS 的「证明引用」页按 Notebook / 年份 / Week 展示真正出现在证明 Hint 中的定理、当前范围内多次使用的列表，以及专项复习。每条引用保留原文与 Cell / Calculation / Step 位置，精确匹配的题库卡片也显示 Hint 使用标记。同名不同公式保留候选，未读取正文显示未知；预载列表不计为证明使用。数据覆盖及重新提取命令见 [NOTEBOOK_HINTS](docs/NOTEBOOK_HINTS.md)。
