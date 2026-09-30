# Theorem Quest · 定理闯关

一个无需服务器、账号、API key 或前端依赖安装的 COMPSCI 2LC3 定理练习网站。采用短关卡、进度条、大按钮、即时反馈、连对 XP 和错题重试；界面与标志为独立设计，不是 Duolingo 或 CalcCheck 的官方产品。

> **功能已实现；资料覆盖不宣称完整。** 当前发布 360 张来源可追踪的定理、公理、引理及推理规则卡，其中 282 张出现在已读取的近期笔记/提供材料，78 张来自额外核对的 2025 课件。仍有 128 条提取候选只列在资料审计中、不参加答题；部分 Project ZIP 和修订文件无法取得完整内容。“当前笔记”不表示全都属于 2026 课堂已讲范围。详见 `docs/SOURCE_AUDIT.md`。

**在线练习：** https://sager1145.github.io/2LC3-theorem-memory/

**下载单文件版：** https://sager1145.github.io/2LC3-theorem-memory/Theorem-Quest-Standalone.html

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
| 名称回忆 | 看公式，输入名称前三个字符，补全后提交 | 例如 `Gol`；同前缀、同名家族须明确选编号。也可直接输入编号。 |
| 名称选择 | 看公式，从四个名称＋编号选项中选择 | 支持 1–4 和 Enter。避免相同标签和同结构公式作为干扰项。 |
| 字母填空 | 显示名称＋编号，固定运算符与括号，只填各处变量 | 接受一致的变量一一改名、受支持的交换和结合，不要求原来的 p/q/r。 |
| 公式拼写 | 显示名称＋编号，按字母/符号键或直接键盘输入 | 支持常用 CalcCheck 风格反斜线输入；不是完整 CalcCheck 证明检查器。 |

勾选任意题型组合，关卡只从勾选的题型随机出题。没有变量的卡片不会生成空白题。默认每关 10 题，可改为 1、5、10、15、20、30、50 题。无生命值、无强制计时，也不锁定后续单元。

**命名原则：** 正常显示名称时总是并列编号。原文没有编号时显示“未编号”和内部卡片 ID；内部 ID 不是教材编号。没有名称的条目显示“原文未命名”及原编号。名称回忆/选择题的题干故意隐藏答案名称与编号，候选和反馈仍二者并列。

## 手动划范围

在“定理库”按主题、来源、当前/历史、Important、重复引用、收藏或错题筛选。编号输入支持：

```text
3.47
3.1-3.82.5
3.35-3.53, 15.1a-15.29
```

单独 `3.47` 包含其 a–f 子项。区间端点按数字分段比较，不是字符串排序；要包括子编号，端点请写到对应子编号，如 `3.82.5`。无编号条目不进入编号区间，可用主题/来源或逐条勾选。

逐条勾选，或“全选筛选结果”，再开启“仅练手选”。“保存范围”会同时保存筛选条件和勾选的卡片；不同筛选是交集，不是并集。手选为空时不会静默改成练全部。

## 原文重点与错题

`★ IMPORTANT`：仅标注原资料明确的 Important 标题/标记，本版有 11 张；卡片内可展开依据。`↻ 引用 N 次`：基于可读材料、按来源家族去重的名称或编号引用统计；同名家族共享的统计不能理解为每个变体各自的调用次数。个人收藏单独显示，不改变原文重点。

答错、跳过、使用提示会进入错题本，并在本轮稍后安排重试（每题最多追加两次，防止一关无限延长）。错题按**定理＋题型**记录：做错的那一种题型连续无提示答对 2 次才归档。答对另一题型不会把原错误清掉；错题历史会保留。

XP、每日练习数、连续练习天数、收藏、错题和未完成关卡只保存在浏览器；没有跨设备云同步。离开未完成关卡会保存作答内容。“设置”可导出备份，导入前会检查文件并请求确认。

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

符号代码后按 Tab 或空格转换。完整快捷表在网页“设置 → 查看符号键盘”。**直接 `:=` 保持命令赋值，`\:=` 才转换成替换符号 `≔`；`=` 与 `≡` 不互相混同。** Enter 检查，Shift+Enter 换行。额外键盘也包含当前公式用到的函数、集合/关系符号和常量。

## 判题不是“任何恒真式都行”

例如 `(3.47a) De Morgan`：

```text
原式：¬ (p ∧ q) ≡ ¬ p ∨ ¬ q
接受：¬ (x ∧ y) ≡ ¬ x ∨ ¬ y
拒绝：¬ (x ∧ y) ≡ ¬ x ∨ ¬ x
拒绝：true
```

系统先检查分词、一一变量改名，再对受支持的语法树做受限交换/结合匹配。量词、显式替换和命令等复杂语法采用保守模板匹配。接受来源中收录的同条目等价写法，但不宣称证明任意等价变形。每张卡保留类型和适用条件；ℕ 的截断减法不能当作 ℤ 减法。详情见 `docs/PROJECT_PLAN.md`。

## GitHub Pages 部署

本项目附带 `.github/workflows/pages.yml`。官方部署方式核对日期：2026-09-29。

1. 把源码放在仓库根目录，保留 `.github` 文件夹。根目录应直接有 `index.html`、`assets/`、`data/`。
2. 仓库 **Settings → Pages → Build and deployment → Source → GitHub Actions**。
3. 向 `main` 或 `master` 推送。工作流先运行 Node 测试，再将 `_site` 上传、部署。首次在设置启用 Pages 后，可到 Actions 手动运行 “Test and deploy Theorem Quest”。

不需要部署原始课件、笔记、私人 ZIP 或学习备份。工作流只复制公开静态文件，不会发布 `private-sources/`、原稿或测试环境。

工作流使用 GitHub 官方文档所示的 checkout v6、configure-pages v5、upload-pages-artifact v4、deploy-pages v4；部署环境 `github-pages`，仅部署任务持有 pages/id-token 写权限。

官方参考（文档链接，不是本项目已部署地址）：
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 测试与构建

```bash
# Node.js 20+；没有 npm 运行依赖，也不必 npm install
node --test tests/engine.test.js

# Python 3；构建时仅使用标准库
python3 tools/build_site.py --out _site --portable _site/Theorem-Quest-Standalone.html
python3 -m http.server 8000 --directory _site

# 可选：浏览器 DOM 测试，需 Python playwright 和系统 Chromium
python3 tests/browser_smoke.py --screenshots test-results/screenshots
```

`docs/TEST_REPORT.md` 明确区分已跑测试和未验证项目。本环境浏览器测试采用内存存储替身，不能据此声称测试了真实 GitHub Pages、浏览器原生持久化或 Service Worker 离线安装。

## 后续增量整理课程文件

网站部署不需要原始资料。要更新题库，在自己电脑上把有权使用的原件放在不提交到 Git 的 `private-sources/`：

```bash
python3 -m venv .venv
. .venv/bin/activate
python3 -m pip install -r tools/requirements.txt
python3 tools/build_corpus.py private-sources --out .build/raw-bank
node tools/finalize_bank.js .build/raw-bank
node --test tests/engine.test.js
python3 tools/build_site.py --out _site
```

以上是**重新整理，不是自动证明或自动补全**。保持原有来源和文件名，才能复用 `tools/curations.json` 内已有校核的 source ID；缺少对应来源时 finalizer 会报错，不静默丢失人工校核。改名或替换资料后，应重新核对来源定位。新候选先在 `review-candidates.json` 中核对，再添加明确的公式、编号、类型、侧条件和来源。更新覆盖说明，不能把 `completeProjectAccess` 自动设为 true。发布后如修改静态资源，应相应更新 `sw.js` 的缓存版本。

## 结构

```text
index.html                  入口，全部路径相对，支持仓库子路径
assets/app.js               界面、四题型、范围、错题、存储、备份
assets/engine.js            分词、匹配、队列和学习状态；可独立测试
assets/data.js              自动生成的浏览器题库包
assets/style.css            响应式视觉与交互
 data/theorems.json         卡片与原写法变体
 data/sources.json          来源、哈希、阅读状态及归档关系
 data/review-candidates.json 未核对片段；不出题
 data/extraction-audit.json 合并及人工核对记录
 data/coverage.json         覆盖范围及明确缺口
 tools/                    提取、整理、静态构建
 tests/                    自动测试
 docs/                     规划、资料审计、测试报告
 .github/workflows/pages.yml 自动测试及 Pages 部署
```

源文件只作为学习材料输入；题库中保留必要的定理声明和来源定位，不附完整课件或学生提交。没有跟踪器、广告、外部字体或运行时 AI 请求。
