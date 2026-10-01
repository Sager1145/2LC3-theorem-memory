(function () {
  'use strict';
  // Only UI copy belongs here; course text and answers retain their original form.
  const copy = String.raw`
答案详情	Answer details
↕ 上下滑动查看	↕ Scroll to view
同组答案	Related answers
定理信息	Theorem details
待复练	Review needed
直接点选任意空位，再点击字母按键填入；左右键也可切换，红色退格删除当前内容。	Tap any blank, then a letter to fill it. Arrows also switch blanks; the red Backspace clears the current blank.
直接点选任意符号空位，再点击按键填入；左右键也可切换，红色退格删除当前内容。	Tap any symbol blank, then a button to fill it. Arrows also switch blanks; the red Backspace clears the current blank.
点击下方按键填空	Tap the buttons below to fill the blank
完整键盘输入	Full keyboard input
默认关闭：填空题只使用大按键；开启后可用 QWERTY 和反斜线代码填空。其他输入题始终使用 QWERTY。	Off by default: fill blanks with large buttons. Enable QWERTY and backslash codes for blanks. Other input questions always use QWERTY.
点击按键填入符号并前进；左右移动切换空位，红色退格删除当前内容。	Tap a symbol to fill and advance. Arrows change blanks; the red Backspace clears the current blank.
点击字母按键填入并前进；左右移动切换空位，红色退格删除当前内容。	Tap a letter to fill and advance. Arrows change blanks; the red Backspace clears the current blank.
根据名称与公式结构，点击按键补全符号。	Use the name and formula structure to fill symbols with the buttons.
所选题型交错出现；手机端优先选择题和按键填空，减少完整输入题，错题可在本轮加练。	Selected modes are mixed. Phones favor choices and button blanks, with fewer full input questions; mistakes can return in this round.
输入反斜线代码补全符号。	Enter a backslash code to complete a symbol.
用 QWERTY 键盘输入反斜线代码，Tab 补全，再按 Tab 移到下一空。	Use the QWERTY keyboard to enter a backslash code. Tab completes it; Tab again moves to the next blank.
输入公式；特殊符号用 \\land、\\implies…	Enter the formula; use \\land, \\implies… for special symbols
Tab 或空格移到下一空；需要其他变量时输入反斜线代码补全。	Tab or Space moves to the next blank; enter backslash codes for other variables.
或原式指定类型	or the type specified in the original formula
用反斜线代码输入并补全公式	Enter and complete the formula with backslash codes
界面与显示	Interface and display
语言	Language
选择界面语言；定理名称与公式保留原文。	Choose the interface language; theorem names and formulas keep their original text.
外观	Appearance
浅色	Light
深色	Dark
跟随系统	System
按照设备设置自动切换。	Switch automatically with your device settings.
简体中文	Simplified Chinese
跳到主要内容	Skip to main content
此浏览器不允许本地存储。当前练习仍可使用；离开前请导出学习备份。	This browser blocks local storage. You can still practice; export a learning backup before leaving.
Theorem Quest 需要 JavaScript	Theorem Quest requires JavaScript
请启用 JavaScript。网站不需要登录，也不会上传答题内容。	Enable JavaScript. No sign-in is needed, and answers are never uploaded.
题库没有载入。请保留 assets 文件夹，或使用随附的单文件版本。	The question bank did not load. Keep the assets folder, or use the bundled single-file version.
检查当前网站发布的题库；校验通过后安装，保留学习记录。	Check the question bank published on this site. Install after verification and keep your learning history.
此浏览器无法校验题库，请使用 HTTPS 网站或新版浏览器。	This browser cannot verify the question bank. Use HTTPS or a newer browser.
此浏览器无法保存题库更新。	This browser cannot save question bank updates.
无法打开本地题库存储。	Cannot open local question bank storage.
题库存储正在被其他窗口占用，请关闭其他窗口后重试。	Another window is using question bank storage. Close it and try again.
题库更新未保存；请检查浏览器存储空间或权限。	The update was not saved. Check browser storage space and permissions.
题库版本清单无效或暂不支持。	The question bank manifest is invalid or unsupported.
题库文件路径或校验值无效。	The question bank file path or checksum is invalid.
题库文件大小或格式无效。	The question bank size or format is invalid.
下载内容未通过完整性校验，未安装。	The download failed integrity checks and was not installed.
题库条目数量与版本清单不一致。	The item count does not match the manifest.
题库来源格式无效或 ID 重复。	A source has an invalid format or duplicate ID.
定理格式无效、来源缺失或 ID 重复。	A theorem is invalid, lacks sources, or has a duplicate ID.
定理周次格式无效。	The theorem week format is invalid.
使用随附题库。	Using the bundled question bank.
Proof 定理填空	Proof theorem blanks
这一步用了哪条定理？	Which theorem was used in this step?
2026 已完成证明：起点 → 定理名称 → 终点，仅填名称	Completed 2026 proofs: start → theorem name → end; enter the name only
名称回忆	Name recall
这条定理叫什么？	What is this theorem called?
同名定理点选填空，其他条目输入名称	Tap to fill names shared by multiple theorems; type other names
名称选择	Name choice
为公式选择正确的定理	Choose the correct theorem for this formula
从名称与编号列表中选择	Choose from theorem names and references
字母填空	Variable blanks
补上字母，还原这条定理	Fill the variables to complete the theorem
符号已给出，允许一致改名	Symbols are given; consistent variable renaming is accepted
符号填空	Symbol blanks
当前符号空	Current symbol blank
输入符号或反斜线代码…	Enter a symbol or backslash code…
每个符号空都要填写。可用系统键盘输入符号或反斜线代码，Tab 补全，再按 Tab 移到下一空；也可点符号键填入并前进。	Fill every symbol blank. Type a symbol or backslash code with the system keyboard, tap Tab to complete, then Tab again for the next blank; symbol keys also fill and advance.
补上符号，还原这条定理	Fill the symbols to complete the theorem
看名称，用内置符号键盘填空	Use the name and built-in symbol keyboard to fill the blanks
看名称，用系统键盘或符号按键填空	Use the name and system keyboard or symbol keys to fill the blanks
公式拼写	Formula recall
写出这条定理的内容	Write this theorem's formula
符号按键，或 CalcCheck 风格输入	Use symbol keys or CalcCheck-style input
反斜线符号	Backslash symbols
这个符号的反斜线代码是什么？	What is the backslash code for this symbol?
输入 \\ 命令，可用字符补全	Enter a \\ command; character completion is available
全部定理	All theorems
多次出现	Repeated mentions
重点与高频	Important and frequent
Hint 中用到	Used in hints
Hint 多次出现	Repeated in hints
自由练习	Free practice
尚未练习	Not practiced yet
学期资料	Term materials
2026 定理与已完成证明	2026 theorems and completed proofs
全部年份	All years
2025i 已核对预载列表	Verified 2025i preload lists
当前学习的 notebook	Current notebook
全部已核对 notebook	All verified notebooks
Week（Exercise 与 Homework）	Week (Exercise and Homework)
全部 Week	All weeks
资料 Week（原模块标签）	Material week (original module label)
全部模块	All modules
模块 Week	Module week
周次范围	Week range
仅当周内容	This week only
包含此前全部 Week	Include all previous weeks
每周包含对应 Notebook 的预载定理与正文已证明定理；同一定理可出现在多个 Week。	Each week includes preload and proved theorems from its notebooks; a theorem may appear in several weeks.
专项复习	Focus review
课程文档明确标注 Important	Explicitly marked Important in course documents
原资料感叹号强调，与 Important 标签分开	Exclamation emphasis in the source, separate from Important
课程文档中匹配的定理声明或引用；同族导出副本不累加	Matching theorem declarations or references in course documents; duplicate exports are counted once
原文 !!	Source !!
待复练	Needs review
已熟悉	Familiar
2026 已证明	2026 proved
2026 预载	2026 preloaded
2025 归档	2025 archive
闯关	Quest
定理库	Library
证明引用	Proof references
错题本	Mistakes
返回设置	Back to settings
查看资料覆盖、来源与判题边界。	Review material coverage, sources and grading limits.
资料审计	Source audit
设置	Settings
Theorem Quest 首页	Theorem Quest home
主要导航	Main navigation
定理闯关	Theorem quests
一条定理，一次进步。	One theorem, one step forward.
本地保存 · 无需登录	Saved locally · No sign-in
独立学习工具，非课程官方产品。	Independent study tool; not an official course product.
题库更新	Question bank updates
连续练习天数	Consecutive practice days
学习经验值	Learning experience points
等式与基本规则	Equality and basic rules
整数与代数	Integers and algebra
等价、否定与异或	Equivalence, negation and XOR
析取 ∨	Disjunction ∨
合取 ∧	Conjunction ∧
蕴含 ⇒	Implication ⇒
替换与 Leibniz	Substitution and Leibniz
序与单调性	Order and monotonicity
自然数与归纳	Natural numbers and induction
命令正确性	Command correctness
量词与谓词逻辑	Quantifiers and predicate logic
集合与关系	Sets and relations
关系、序列与后期内容	Relations, sequences and later material
先把基础搭牢	Build a solid foundation
命题逻辑探险	Explore propositional logic
从定理走向证明	From theorems to proofs
扩展资料 · 自由探索	Extended materials · Explore freely
自由选择 · 不锁关 · 每关	Choose freely · All quests unlocked · Per quest:
资料模块	Material module
原模块 Week 标签，不代表 2026 发布周次	Original module week labels, not 2026 publication weeks
小步练习，记住大结构	Small steps, lasting understanding
今天也来一小关。	Take on a small quest today.
不只认得名字，也能把公式写出来。	Know the name and recall the formula.
配置练习	Configure practice
把熟悉的定理，变成直觉。	Turn familiar theorems into intuition.
先选一组想记住的定理。	Choose a set of theorems to learn.
种题型随机出题。答错没有惩罚，稍后再试一次。	random question types. No penalty for mistakes; try again shortly.
当前筛选没有条目。调整章节、编号范围，或取消手选限制即可开始。	No items match these filters. Adjust the chapter or reference range, or clear the manual selection limit.
继续上次关卡	Resume last quest
2026 预载与已证明定理	2026 preloaded and proved theorems
归档与全部资料	Archives and all materials
手选范围	Manual selection
筛选范围	Filtered scope
调整记忆范围	Adjust study scope
范围里暂时没有定理	No theorems in this scope
到定理库重设范围；你也可以一条一条勾选。	Reset the scope in the theorem library, or select individual theorems.
选择定理	Choose theorems
查看覆盖与来源	View coverage and sources
每日练习目标	Daily practice goal
坚持一点，比一次记很多更容易。	A little practice each day is easier than cramming.
今日完成 ✓	Today's goal complete ✓
继续积累	Keep going
再给错题一次机会	Give mistakes another chance
条定理等待复练。每种错题型连续答对 2 次后，就会移出待复练列表。	theorems need review. Answer each missed question type correctly twice in a row to clear it.
这里没有待复练的错题。遇到不熟悉的内容，我们会帮你留下来。	No mistakes need review. Unfamiliar material will be saved here.
错题复练	Review mistakes
你的定理收藏	Your theorem collection
练习过	Practiced
连续答对 ≥ 3 次	Correct at least 3 times in a row
个人收藏	Personal favorites
★ IMPORTANT 来自原资料；↻ 表示重复预载；☆ 是你自己的收藏，三者分开记录。	★ IMPORTANT comes from sources; ↻ marks repeated preloads; ☆ marks personal favorites. Each is tracked separately.
返回闯关	Back to quests
每关题数	Questions per quest
所选题型交错出现；手机端约半数为选择题，错题可在本轮加练。	Selected types alternate; on mobile, about half are multiple choice. Mistakes can reappear in this quest.
练习难度	Practice difficulty
选择题越难，干扰项越相似；困难档排除结合律、对称性、自反性。符号填空：简单 1 空、标准隐藏约一半、困难隐藏其余符号；左右连接的 = 或 ≡ 保留。	Harder choice questions use more similar distractors; Hard excludes associativity, symmetry and reflexivity. Symbol blanks: Easy hides 1, Standard hides about half, Hard hides the remaining symbols. The connecting = or ≡ stays visible.
简单	Easy
标准	Standard
困难	Hard
本轮错题再出现	Retry mistakes in this quest
每题本轮最多出现 2 次；仍需复练的题目留在错题本，下轮再练。	Each question appears at most twice per quest. Remaining mistakes stay saved for the next quest.
建立自己的记忆范围	Build your study scope
编号、别名和所有不同公式变体都在这里。	Find references, aliases and all distinct formula variants here.
练习此范围	Practice this scope
搜索名称、编号或公式	Search names, references or formulas
例如 Golden、3.47、p ⇒ q	For example: Golden, 3.47, p ⇒ q
章节	Chapter
全部章节	All chapters
编号区间（逗号分隔多个范围）	Reference ranges (separate with commas)
3.47 包含 a–f 子项；区间筛选不包含原文未编号条目。局部题号请结合来源筛选。	3.47 includes subitems a–f. Range filters exclude unnumbered items; use source filters for local exercise numbers.
重设筛选	Reset filters
我的收藏	My favorites
仅练手选	Practice manual selection only
按来源文件筛选	Filter by source file
全部来源文件	All source files
全选筛选结果	Select all filtered items
清空手选	Clear selection
保存范围	Save scope
题型	Question types
已存范围	Saved scopes
选择一个范围…	Choose a scope…
没有找到匹配的定理	No matching theorems
试试放宽编号范围，或取消 Important、来源、手选限制。	Expand the reference range, or clear Important, source or manual selection filters.
按课程文档集中复习	Focus your review using course documents
明确标注的重点，以及文档中反复出现的定理。	Explicitly marked important theorems and those repeatedly mentioned in documents.
题型与难度	Question types and difficulty
文档明确的 Important 标记	Explicit Important marks in documents
文档中至少两次声明或引用	Declared or referenced at least twice in documents
Important 或多次出现的合集	Important or repeatedly mentioned theorems
查看列表	View list
重复次数按课程文档中的定理声明或明确引用统计；同一资料的导出副本不累加。预载列表中的可用次数单独保留在原来源记录。点开定理可查看文档依据。	Counts use theorem declarations or explicit references in course documents, deduplicating exports. Preload availability counts remain in source records. Open a theorem to view the evidence.
复习当前列表	Review current list
当前范围没有匹配定理	No matching theorems in this scope
调整年份、Notebook、Week 或专项类型。	Adjust the year, notebook, week or review category.
年份	Year
Notebook 正文	Notebook body
全部 Notebook	All notebooks
正文未读取	Body not captured
仅当周	This week only
含此前全部	Include previous weeks
证明 Hint 定理	Proof hint theorems
逐个 Notebook 标注证明中真正引用的定理。	Track the theorems actually cited in proofs, notebook by notebook.
全部 Hint 定理	All hint theorems
重复 Hint 定理	Repeated hint theorems
复习 Hint 定理	Review hint theorems
只统计 Notebook 正文证明步骤的 hint，不计预载列表、声明或普通文字提及。一次 hint 内同一引用只计一次；同名不同公式保留为待区分定理族。重复列表表示当前范围内至少两处 hint 使用。	Counts only hints in notebook proof steps, excluding preload lists, declarations and ordinary mentions. Each reference is counted once per hint. Shared names with different formulas remain unresolved families. Repeated means used in at least two hints in this scope.
搜索 Hint 定理名称或编号	Search hint theorem names or references
例如 Modus ponens、3.35	For example: Modus ponens, 3.35
Hint 多次出现的定理	Theorems repeated in hints
Hint 中用到的定理	Theorems used in hints
当前范围没有匹配的 Hint 定理	No matching hint theorems in this scope
当前范围的 Notebook 正文尚未读取	Notebook bodies in this scope have not been captured
可以调整 Notebook、Week、搜索词或切换全部 Hint 定理。	Adjust the notebook, week or search term, or switch to all hint theorems.
Notebook 正文读取情况	Notebook capture status
已保存正文未包含可读取的证明 Hint	Saved body contains no readable proof hints
同名／同编号公式待区分	Formulas with a shared name or reference need disambiguation
尚未对应题库声明	Not yet matched to a question bank declaration
查看候选公式	View candidate formulas
（未确定具体变体）	(specific variant unresolved)
查看实际 Hint	View actual hints
已核对 Hint	Verified hint
原文 Hint（未核对）	Source hint (unverified)
计算已完成	Calculation complete
计算未完成	Calculation incomplete
打开原始 Notebook ↗	Open original notebook ↗
错误是下一次的线索	Mistakes guide your next attempt
每种做错的题型，连续答对 2 次后归档。历史不会删除。	Answer each missed question type correctly twice in a row to archive it. History is kept.
开始复练	Start review
已修复	Resolved
全部历史	All history
只复练当前范围	Review current scope only
只使用你勾选的题型来复练相应错题。某题在“公式拼写”中答错，需要在该题型连续答对 2 次，不能靠名称选择消除。查看答案或提示会保留为待复练。	Review uses your selected question types. A formula-recall mistake needs two consecutive correct answers in that type to clear. Viewing answers or hints keeps it marked for review.
最近答案	Latest answer
没有作答	No answer
再练这条	Practice again
看公式与来源	View formula and sources
这里暂时没有错题	No mistakes here yet
这里还没有记录	No history here yet
练习过程中答错、跳过或使用提示的定理，会自动记录在这里。	Theorems answered incorrectly, skipped or answered with hints are recorded here automatically.
来源片段	Source excerpt
有出处，才值得记住	Grounded in sources
资料与题库审计	Materials and question bank audit
定理声明来自预载列表与 notebook 正文已证明定理；Proof 填空来自 2026 HTML notebook 的已完成证明，保留原步骤和出处。	Declarations come from preload lists and proved notebook theorems. Proof blanks use completed proofs from 2026 HTML notebooks, preserving original steps and sources.
2026 可练卡片	2026 practice cards
所有年份可练卡片	Practice cards across all years
文档 Important 标记	Document Important marks
已核对的声明来源	Verified declaration sources
覆盖边界	Coverage limits
预载列表的核对范围	Verified preload coverage
重复计数、Important 与名称编号的规则	Rules for repetition, Important, names and references
判题的精确边界	Grading limits
不是逐字比较。接受字母一一对应的改名，以及受支持的交换律、结合律、反向关系写法。不能把两个独立变量合并，也不能用任意恒真式代替另一条定理。	Grading is structural. It accepts one-to-one variable renaming and supported commutative, associative and reversed-relation forms. Independent variables cannot be merged, and arbitrary tautologies cannot replace the theorem.
复杂量词、替换与命令语法采用保守的结构模板判题，接受一致的全局改名，但不声称验证任意等价改写或完整证明；这不是在线 CalcCheck 引擎。任何侧条件、变量类型仍需满足。公式字符清楚但无法可靠判定的答案不会静默判对。	Complex quantifiers, substitutions and commands use conservative structural templates with consistent global renaming. Arbitrary equivalences and full proofs are not verified; this is not a live CalcCheck engine. Side conditions and variable types still apply. Answers that cannot be judged reliably are not silently marked correct.
待核对提取	Extractions needing review
可能含缺字、侧条件、图形字符或证明片段；不是可靠答案。	May contain missing characters, side conditions, graphical symbols or proof fragments; these are not verified answers.
导出题库 JSON	Export question bank JSON
搜索待核对的编号或名称	Search unverified references or names
待核对	Unverified
当前题库	Current question bank:
更新保留错题、收藏、历史与 XP。	Updates keep mistakes, favorites, history and XP.
从 GitHub 部署网站检查并安装题库。	Check and install the question bank from the GitHub-hosted site.
管理题库更新	Manage question bank updates
正在检查…	Checking…
检查并安装题库更新	Check and install question bank update
单文件版与本地文件不能在线安装题库。请打开在线网站检查更新。	Single-file and local-file versions cannot install online updates. Open the website to check for updates.
打开在线题库	Open online question bank
正在下载并校验题库…	Downloading and verifying question bank…
当前网站尚未发布题库更新清单，请部署新版网站后再检查。	No update manifest has been published. Deploy the updated site, then check again.
服务器没有返回题库文件，请确认网站已部署或联网后重试。	The server did not return the question bank. Check the deployment and connection, then retry.
题库文件超过大小限制。	The question bank file exceeds the size limit.
已核验：当前题库已是最新版本。	Verified: your question bank is up to date.
更新失败，保留原题库与学习记录。	Update failed. The previous question bank and learning history are kept.
网络请求超时，请重试。	The network request timed out. Try again.
按你的方式练	Practice your way
练习设置	Practice settings
选择题型，保留进度，不需要服务器。	Choose question types and keep your progress on your device.
题型与节奏	Question types and pace
每日目标	Daily goal
按本机日期记录，不要求持续在线。	Tracked by your device's date; no continuous connection needed.
答题音效	Answer sounds
轻提示音，默认关闭；遵从系统减少动态效果设置。	Gentle feedback sounds, off by default; respects reduced-motion settings.
开始练习	Start practice
本地学习备份	Local learning backup
错题、历史、收藏和 XP 保存在此 App。换设备或卸载应用前，请先导出。没有云端同步。	Mistakes, history, favorites and XP are stored in this app. Export before switching devices or uninstalling. There is no cloud sync.
错题、历史、收藏和 XP 保存在这个浏览器。换设备、换站点或清除浏览器数据前，请先导出。没有云端同步。	Mistakes, history, favorites and XP are stored in this browser. Export before switching devices or sites, or clearing browser data. There is no cloud sync.
导出学习备份	Export learning backup
导入学习备份	Import learning backup
查看符号键盘	View symbol keyboard
导入会替换当前学习记录；文件经过结构与大小检查。题库来源文件不包含你的学习记录。	Import replaces current learning history; file structure and size are checked. Question bank source files do not contain your learning history.
数据管理	Data management
重设记忆范围	Reset study scope
清空学习记录	Clear learning history
重设范围不会删除成绩；清空学习记录需要再次确认。	Resetting the scope keeps results. Clearing learning history requires confirmation.
关于 Theorem Quest	About Theorem Quest
借鉴短关卡、即时反馈、连对和错题复练的学习节奏，使用独立设计，不隶属于 Duolingo、CalcCheck 或 McMaster。所有判题在设备本地进行，运行时不调用 AI 或外部 API。	An independently designed study tool with short quests, instant feedback, streaks and mistake review. Not affiliated with Duolingo, CalcCheck or McMaster. Grading runs locally without AI or external APIs.
完整公式不是严格字符匹配；复杂语法的保守匹配边界见“资料审计”。题库覆盖尚有缺口，不把提取候选当成已核验定理。	Full formulas use structural matching. See Source audit for complex-syntax limits. Coverage is incomplete; extraction candidates are not treated as verified theorems.
关闭	Close
这一关，想怎么练？	How would you like to practice?
定理卡片	Theorem card
同条目在原资料中的其他写法	Other source forms of this item
适用条件	Side conditions
原文类型：	Source type:
所有编号：	All references:
原文未编号；内部卡片 ID 仅供网站索引	Unnumbered in the source; internal card ID is only a website index
同条目别名：	Aliases:
★ 原文 Important 依据	★ Source evidence for Important
来源与原文片段	Sources and original excerpts
学习记录	Learning history
正确	Correct
使用提示	Used hint
需复练	Needs review
未作答	Unanswered
练习这条	Practice this theorem
复制公式	Copy formula
已收藏	Favorited
取消收藏	Remove favorite
收藏	Favorite
反斜线符号输入	Backslash symbol input
公式题中输入反斜线及代码前缀即可看到候选；按 ↓ / ↑ 选择，Tab 补成符号。完整代码后也可按空格转换。符号题中用相同的候选补全代码；下列同一符号的任意代码都可作答。	In formula questions, type a backslash and code prefix for suggestions. Use ↓ / ↑ to select and Tab to insert the symbol, or Space after a full code. In symbol questions, suggestions complete the code. Any listed code for the symbol is accepted.
反斜线代码	Backslash code
符号	Symbol
直接输入 := 是命令赋值；\\:= 才转换成替换符号 ≔。≡ 与 = 分开判题。	Typing := directly means command assignment; \\:= converts to the substitution symbol ≔. ≡ and = are graded separately.
请至少勾选一种题型。	Select at least one question type.
当前错题型未被勾选，请在配置中启用相应题型。	The missed question types are not selected. Enable them in practice configuration.
本题特殊符号	Special symbols in this question
本题符号	Question symbols
Proof 定理名称填空	Proof theorem name blank
所用定理名称	Theorem name used
仅输入定理名称	Enter the theorem name only
填写起点到终点之间所用的定理名称；不接受编号或公式。	Enter the theorem name used between the start and end; references and formulas are not accepted.
选择定理名称	Choose theorem name
可按 1–4 选择，再按 Enter 检查。	Press 1–4 to choose, then Enter to check.
补全定理名称；编号可留空。若选择编号，必须与公式对应。	Complete the theorem name. The reference is optional; if selected, it must match the formula.
名称	Name
编号（可选）	Reference (optional)
只选名称即可按 group 作答；选了编号后按该编号对应的公式判题。	Choosing only the name answers for the group. Choosing a reference grades against that reference's formula.
原文没有名称，请输入编号	The source has no name; enter the reference
输入名称、别名或编号	Enter a name, alias or reference
例如 11.47	For example: 11.47
例如 Golden rule、3.35…	For example: Golden rule, 3.35…
可输入原编号，或从候选中选择对应卡片。	Enter the original reference or choose its card from the suggestions.
可输入完整名称或别名；若指定编号，必须与这条公式对应。	Enter a full name or alias. If you specify a reference, it must match this formula.
补全定理变量	Complete theorem variables
补全定理符号	Complete theorem symbols
待填的符号	Symbol to fill
点下面的符号键填入空白，再检查答案。	Tap a symbol key to fill the blank, then check your answer.
每个符号空都要填写。点空白切换位置，点符号键填入并前进。	Fill every symbol blank. Tap a blank to select it; symbol keys fill it and advance.
删除当前符号	Delete current symbol
有符号与原定理不一致，请逐空核对。	Some symbols differ from the theorem. Check each blank.
本题符号键盘	Symbol keyboard for this question
符号键盘	Symbol keyboard
你的公式	Your formula
用下方按键拼出公式，或键入 \\land、\\implies…	Build the formula with the keys below, or type \\land, \\implies…
输入反斜线和代码前缀可看到全部匹配符号；↓ / ↑ 选项，Tab 补全。完整代码后按空格转换；Enter 检查。	Type a backslash and code prefix to see matching symbols. Use ↓ / ↑ to select and Tab to complete. Space converts a full code; Enter checks.
要输入的符号	Symbol to enter
输入这个符号的反斜线代码	Enter this symbol's backslash code
例如 \\land	For example: \\land
输入 \\ 后的字符；接受同一符号的所有已收录代码。↓ / ↑ 选择，Tab 补齐代码，Enter 检查。	Type the characters after \\. All listed codes for the symbol are accepted. Use ↓ / ↑ to select, Tab to complete and Enter to check.
退出并保存本关	Exit and save quest
本关进度	Quest progress
编号回忆	Reference recall
这条声明的原编号是什么？	What is this declaration's original reference?
根据上下两行推导，填写中间的定理名称。	Use the derivation above and below to fill the theorem name between them.
逻辑符号已经排好。字母不必与讲义相同，但逻辑结构要一致。	Logical symbols are given. Variables may differ from the notes, but the structure must match.
根据名称与公式结构，点符号键填空。	Use the name and formula structure to fill the blank with a symbol key.
回想运算符、变量关系和括号；不是逐字背诵。	Recall the operators, variable relationships and parentheses.
原文没有名称，请根据公式回忆编号。	The source has no name. Recall its reference from the formula.
看清公式结构，再选择名称与编号。	Study the formula structure, then choose its name and reference.
光标与编辑	Cursor and editing
光标左移	Move cursor left
光标右移	Move cursor right
左移	Left
右移	Right
退格	Backspace
字母按键 · 点一下填入并前进	Variable keys · Tap to fill and advance
本题按键	Question keys
全部按键	All keys
键盘快捷输入 ?	Keyboard shortcuts ?
空格	Space
清空	Clear
暂时不会	Skip for now
提示	Hint
准备好后按 Enter	Press Enter when ready
检查答案	Check answer
定理名称	Theorem name
名称与编号	Name and reference
公式	Formula
原证明提示：	Original proof hint:
对应符号：	Matching symbol:
对应公式：	Matching formula:
定理：	Theorem:
别名：	Aliases:
同组名称可单独作答；本题对应	The group name alone is accepted; this question uses
全部答案变体	All answer variants
全部名称与公式变体	All name and formula variants
（同组）	(same group)
同组变体	Group variant
本题	This question
答对了！	Correct!
带着提示，再记一次	Review it again with the hint
再记一次，就更近一步。	One more recall brings you closer.
正确答案	Correct answer
已记录到错题本。	Saved to your review notebook.
查看本关成果	View quest results
继续	Continue
没有匹配名称；也可以输入具体编号。	No matching names; you can also enter a specific reference.
未作答，先记住这条定理的名称与公式。	No answer yet. First learn this theorem's name and formula.
定理名称正确。	The theorem name is correct.
请填写原证明中使用的定理名称。	Enter the theorem name used in the original proof.
同组名称正确；未指定编号。	The group name is correct; no reference specified.
名称与编号对应正确。	The name and reference match.
名称或所选编号与当前公式不对应。	The name or selected reference does not match this formula.
符号填空正确。	The symbol is correct.
这个符号与原定理不一致。	This symbol does not match the original theorem.
符号代码正确。	The symbol code is correct.
请用反斜线代码输入显示的符号。	Enter the displayed symbol using its backslash code.
每个空只能填一个字母变量，如 p、p′ 或 n₀。	Each blank accepts one variable, such as p, p′ or n₀.
本次使用了提示，留待无提示时再练。	You used a hint; practice again without one next time.
暂无可核对的 notebook 出处。	No verifiable notebook source is available.
出现位置（预载定理列表）：	Locations (preloaded theorem lists):
Week 尚未归类	Week not classified yet
模块：	Module:
提示 · 本次将保留为待复练	Hint · This attempt will remain marked for review
先尝试完成；下一次不看提示再答对，才能推进错题修复。	Try to finish. Answer correctly without a hint next time to progress toward resolving this mistake.
继续作答	Continue answering
这一关，全都记住了！	You recalled every answer in this quest!
每一次回想，都有收获。	Every recall is progress.
本关 XP	Quest XP
首次作答正确率	First-attempt accuracy
最高连续答对	Best correct streak
回到闯关	Back to quests
再练本关错题	Retry this quest's mistakes
本关需要再记一次的定理	Theorems to recall again
把这份熟悉保留下来。之后也可以到定理库扩大范围。	Keep this familiarity growing. Expand your scope in the theorem library whenever you like.
学习记录已保存在此 App。	Learning history is saved in this app.
学习记录已保存在这个浏览器。	Learning history is saved in this browser.
本地保存不可用，请回设置页导出学习备份。	Local saving is unavailable. Export a learning backup from Settings.
学习备份已导出。	Learning backup exported.
备份文件超过 3 MB，未导入。	The backup exceeds 3 MB and was not imported.
替换当前学习记录？	Replace current learning history?
导入会替换现有错题、收藏和学习历史。建议先导出当前备份。	Import replaces mistakes, favorites and learning history. Export your current backup first.
先导出当前记录	Export current history first
确认导入	Confirm import
取消	Cancel
备份已导入。	Backup imported.
导入失败：	Import failed:
Hint 定理 · 专项复习	Hint theorems · Focused review
重复 Hint 定理 · 专项复习	Repeated hint theorems · Focused review
上次关卡已结束。	The previous quest has ended.
已取消收藏。	Favorite removed.
已加入个人收藏；不改变原文 Important 标记。	Added to personal favorites; the source Important mark is unchanged.
公式已复制。	Formula copied.
已重设为 2026 定理与已完成证明。	Reset to 2026 theorems and completed proofs.
保存记忆范围	Save study scope
范围名称	Scope name
例如 Midterm 1 · 蕴含	For example: Midterm 1 · Implication
保存	Save
先给范围取个名字。	Give the scope a name first.
范围已保存。	Scope saved.
错题专练	Mistake practice
当前范围 · 错题专练	Current scope · Mistake practice
单条错题复练	Review one mistake
本关错题复练	Review this quest's mistakes
清空全部学习记录？	Clear all learning history?
将删除本浏览器中的错题、XP、收藏、历史和未完成关卡。题库和筛选不会删除。	Deletes this browser's mistakes, XP, favorites, history and unfinished quests. The question bank and filters are kept.
先导出备份	Export backup first
确认清空	Confirm clear
学习记录已清空。	Learning history cleared.
文档复习依据	Document review evidence
计数按资料族去重。	Counts deduplicate related source families.
当前课程文档未找到可确认的标记或引用。	No verified marks or references found in the current course documents.
上一页	Previous
下一页	Next
输入快捷按钮	Input shortcuts
输入反斜线	Enter backslash
补全或下一输入框	Complete or next field
补齐括号	Complete parentheses
完成	Done
收起键盘	Dismiss keyboard
输入三个字符（含空格和特殊字符）即可补全；也可输入完整名称或别名。若指定编号，必须与这条公式对应。	Type three characters, including spaces and special characters, to see completions. You can also enter a full name or alias. Any specified reference must match this formula.
输入一个反斜线即可看到符号候选；↓ / ↑ 选项，Tab 补全。完整代码后按空格转换；Enter 检查。	Type one backslash to see symbol suggestions. Use ↓ / ↑ to select, Tab to complete, Space to convert a full code and Enter to check.
输入至少三个字符后显示候选。	Type at least three characters to see suggestions.
起点、定理提示、终点取自已完成证明的连续三行。只接受定理名称；未命名或使用多条定理的步骤不出题。原替换条件保留，答案显示完整提示。证明步骤独立于预载声明计数。	Starts, theorem hints and ends come from three consecutive lines of completed proofs. Only theorem names are accepted. Unnamed steps or steps using multiple theorems are excluded. Original substitution conditions and full hints are preserved. Proof steps are counted separately from preload declarations.
每份 CalcCheck 页面通过 Cell Actions 展开并复制全部预载条目；notebook 正文的证明任务不计入。	All preloaded entries were expanded via Cell Actions and copied from each CalcCheck page. Notebook proof tasks are excluded.
专项复习使用课程文档的 documentStudy 计数与依据。重复出现表示至少两次声明或明确引用，同族导出不累加；与下方预载列表计数分开。Important 只来自明确的原文标题或标注；!! 是另一种原文强调；个人收藏单独存储。重复预载不等于教师评级，也不等于独立出现的定理变体。	Focused review uses documentStudy evidence from course documents. Repeated means at least two declarations or explicit references; related exports are deduplicated. This is separate from preload counts. Important comes only from explicit source headings or marks; !! is separate source emphasis, and favorites are personal. Repeated preloads do not imply instructor ratings or distinct theorem variants.
同名不同编号保留。没有官方编号：显示“未编号”和内部卡片 ID；没有名称：显示“原文未命名”，练习时选择具体编号。局部 (1)、(2) 等题号不是 LADM 编号，要结合来源。	Items sharing a name but having different references are kept. Items without official references show an unnumbered label and internal ID. Unnamed items use reference recall. Local exercise numbers such as (1) and (2) are not LADM references and require source context.
来源是课程 CalcCheck 预载列表及已验证的 notebook 正文声明；来源记录给出对应 notebook 地址。	Sources are course CalcCheck preload lists and verified notebook declarations. Source records include notebook URLs.
副本不重复计数	Duplicate not counted again
来源数据保留弹窗列出的公理、定理、引理、推论、事实与推理规则；其中	Source data preserves listed axioms, theorems, lemmas, corollaries, facts and inference rules;
条推理规则不进入答题、选项或错题复练。notebook 正文里的待证明题不作为入库依据。	inference rules are excluded from questions, choices and mistake review. Unproved notebook tasks are not evidence for inclusion.
读取清单	Capture inventory
个文件 / 其他来源条目	files / other source entries
份 Homework 预载列表	Homework preload lists
份预载弹窗。另收录	preload dialogs. Also includes
次正文已证明声明。每张卡的来源可定位到 notebook、模块、原文行或 Cell；不同 notebook 的预载范围可能不同。	proved notebook declarations. Every card can be traced to its notebook, module, source line or cell. Preload scope can differ between notebooks.
已复制 2025i	Copied 2025i
份及 2026 年	dialogs and, for 2026,
Notebook Hint 引用	Notebook hint references
当前范围 Hint 使用	Hint uses in current scope
输入三个字符（含空格和特殊字符）即可补全名称。	Type three characters, including spaces and special characters, to see name completions.
输入三个字符（含空格和特殊字符）即可补全。	Type three characters, including spaces and special characters, to see completions.
输入三个字符开始补全…	Type three characters for suggestions…
输入定理名称或别名	Enter a theorem name or alias
输入三个字符即可补全名称；编号请手动填写。	Type three characters for name completions; enter references manually.
同名定理只需填写名称。	For shared names, just enter the name.
候选只补齐名称或别名。	Suggestions complete only names or aliases.
同名定理可只填写 group 统称；指定编号时须与公式对应。	The group name alone is accepted for shared names; any specified reference must match the formula.
可填写名称或别名；指定编号时须与公式对应。	Enter a name or alias; any specified reference must match the formula.
选择具体编号（可选）	Choose a reference (optional)
定理组	Theorem group
个编号	references
Notebook 证明 Hint 使用	Notebook proof hint uses
题库包含已复制的预载列表声明，以及 2026 notebook 中经 CalcCheck 确认为已证明的定理、引理与推论。Week 使用 Exercise 编号与 Homework 已核对周次（缺少核对时使用课程周目录）；未确认的 Assignment 周次保持未归类。	The bank contains copied preload declarations and 2026 notebook theorems, lemmas and corollaries confirmed proved by CalcCheck. Weeks use exercise numbers and verified homework weeks, falling back to course week directories. Unverified assignment weeks remain unclassified.
重复次数表示同一声明出现在几份 notebook 的预载弹窗中；同一弹窗内重复出现另保留各自行号。不是课件引用次数或重要程度。	Repetition counts the notebooks whose preload dialogs contain a declaration. Repeated entries within one dialog retain their line numbers. This does not measure slide citations or importance.
预载声明保留原文行号；notebook 已证明声明保留原文件、Cell、声明摘录与源文件 SHA-256。重复声明合并并保留全部来源。	Preload declarations keep source line numbers. Proved notebook declarations keep the original file, cell, excerpt and source SHA-256. Duplicate declarations are merged with all sources preserved.
2026 A1.1 预载弹窗	2026 A1.1 preload dialog
课程页面禁用预载列表；已完成的正文定理通过独立 notebook 来源收录。	The course page disables preloads; completed body theorems are included through separate notebook sources.
2026 PPT 发布周次	2026 slide publication weeks
课程官网未公开列出；Avenue 材料尚未提供，故不推断发布周次。	Not publicly listed on the course site; Avenue materials were not provided, so publication weeks are not inferred.
公式过长（上限 2400 字符）。	The formula exceeds the 2400-character limit.
公式包含过多符号。	The formula contains too many symbols.
嵌套过深。	Nesting is too deep.
缺少右括号。	Missing closing parenthesis.
此公式使用结构模板判题。	This formula uses structural-template grading.
请输入公式。	Enter a formula.
变量改名一致：	Consistent variable renaming: 
公式结构与原定理一致。	The formula structure matches the theorem.
先输入你的答案。	Enter your answer first.
括号没有配对，请先检查括号。	Parentheses do not match. Check them first.
左右两边写成同一个式子，不能代替原定理的变形关系。	Writing the same expression on both sides does not reproduce the theorem's transformation.
已接受交换、结合或反向关系写法。	Commutative, associative or reversed-relation notation accepted.
检查同一个字母是否始终代表同一个变量，以及逻辑符号、括号和常量。不能用另一条恒真式替代这条定理。	Check variable consistency, logical symbols, parentheses and constants. Another tautology cannot replace this theorem.
每个空只能填一个字母变量。	Each blank accepts one variable.
变量关系正确。	Variable relationships are correct.
同一个变量须保持一致，不同变量不能合并。	Keep each variable consistent; distinct variables cannot be merged.
当前范围没有定理，请调整筛选。	No theorems in the current scope. Adjust the filters.
至少选择一种题型。	Choose at least one question type.
当前范围没有适合所选题型的条目。	No items in this scope support the selected question types.
不是有效的 Theorem Quest 学习备份。	This is not a valid Theorem Quest learning backup.
入门与 CalcCheck	Introduction and CalcCheck
简单计算	Simple calculations
整数等式	Integer equalities
替换	Substitution
严格匹配	Strict matching
结合与对称	Associativity and symmetry
高难度练习	Advanced practice
赋值命令	Assignment commands
表达式与计算	Expressions and calculations
赋值命令正确性	Assignment command correctness
命题演算入门	Introduction to propositional calculus
析取	Disjunction
合取	Conjunction
蕴含	Implication
骑士与骗子	Knights and knaves
布尔变量赋值	Boolean variable assignments
命题演算证明	Propositional calculus proofs
命题演算	Propositional calculus
布尔赋值命令	Boolean assignment commands
加法与乘法	Addition and multiplication
截断减法	Truncated subtraction
相等与前驱	Equality and predecessor
分类证明	Proof by cases
单调性	Monotonicity
自然数的序	Natural number order
Leibniz 与替换	Leibniz and substitution
结构化证明	Structured proofs
`;
  const phrases = copy.trim().split('\n').map(line => line.replace(/\\\\/g, '\\').split('\t')).filter(pair => pair.length === 2).sort((a, b) => b[0].length - a[0].length);
  const exact = new Map(phrases);
  // One pass over original text prevents translated output being matched again.
  const escaped = phrases.map(([from]) => from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const phrasePattern = new RegExp(escaped.join('|'), 'g');
  const patterns = [
    [/这条定理需要 (\d+) 个不同变量；你的答案有 (\d+) 个。不同变量不能被合并。/g, 'This theorem needs $1 distinct variables; your answer has $2. Distinct variables cannot be merged.'],
    [/当前范围 (\d+) 条，(\d+) /g, 'Current scope: $1 theorems, $2 '],
    [/开始 (\d+) 题挑战/g, 'Start a $1-question quest'],
    [/开始 (\d+) 题/g, 'Start $1 questions'],
    [/Hint 使用 (\d+) 次/g, 'Used in hints $1 times'],
    [/文档出现 (\d+) 次/g, '$1 document mentions'],
    [/(\d+) 条定理 · (\d+) 条已熟悉/g, '$1 theorems · $2 familiar'],
    [/筛选 (\d+) 条 · 将练习 (\d+) 条 · 手选 (\d+) 条/g, '$1 filtered · $2 to practice · $3 selected'],
    [/当前筛选 (\d+) 条 · 可练 (\d+) 条/g, '$1 filtered · $2 available to practice'],
    [/当前范围 (\d+) 份 Notebook，已读取 (\d+) 份；正文未读取的 Notebook 不视为零引用。/g, 'Current scope: $1 notebooks, $2 captured; uncaptured notebooks are not treated as having zero references.'],
    [/需要 (\d+) 个不同变量。每处都要填写，重复字母须保持关系一致。Tab 或空格移到下一空；点字母键自动前进。/g, '$1 distinct variables needed. Fill every blank and keep repeated variables consistent. Tab or Space advances; tapping a variable key advances automatically.'],
    [/第 (\d+) 个字母空/g, 'Variable blank $1'],
    [/第 (\d+) 个符号空/g, 'Symbol blank $1'],
    [/共有 (\d+) 个符号空；每个位置都要按原定理填写。/g, '$1 symbol blanks; fill each position according to the original theorem.'],
    [/符号键盘 · (\d+) \/ (\d+)/g, 'Symbol keyboard · $1 / $2'],
    [/本轮最后一次复练/g, 'Final retry this quest'],
    [/(\d+) 连对，保持这个节奏！/g, '$1 correct in a row. Keep it up!'],
    [/(\d+) 连对/g, '$1 in a row'],
    [/完成 (\d+) 道主问题/g, 'Completed $1 main questions'],
    [/，加练 (\d+) 道错题/g, ', plus $1 mistake retries'],
    [/此备份包含 (\d+) 条学习记录、(\d+) XP。/g, 'This backup contains $1 learning records and $2 XP.'],
    [/保存当前筛选及手选的 (\d+) 个条目。/g, 'Save the current filters and $1 manually selected items.'],
    [/当前 (\d+) 条定理。勾选的题型交错出现，手机端优先选择题，至少选一种。Proof 题只来自 2026 已完成证明，共 (\d+) 个步骤。/g, 'Current scope: $1 theorems. Selected types alternate, with more multiple choice on mobile; choose at least one. Proof questions use only completed 2026 proofs, with $2 steps.'],
    [/累计 (\d+) 次需复练 · (\d+) 次正确/g, '$1 review attempts · $2 correct'],
    [/已安装题库更新：(\d+) 条。学习记录已保留；未完成关卡的当前题目将重新生成。/g, 'Question bank update installed: $1 items. Learning history is kept; the current question in unfinished quests will be regenerated.'],
    [/名称以 (.*?)… 开头。/g, 'The name starts with $1…'],
    [/代码以 (.*?)… 开头；输入后可用候选补齐。/g, 'The code starts with $1…; use suggestions to complete it.'],
    [/名称提示：/g, 'Name hint: '],
    [/这条定理原文没有名称，请按编号选择。/g, 'This theorem has no source name; choose by reference.'],
    [/；主题：/g, '; Topic: '],
    [/此公式有 (\d+) 个不同变量；常用原字母为 /g, 'This formula has $1 distinct variables; original variables: '],
    [/同一个变量在不同空的位置要保持一致。/g, 'Keep the same variable consistent across blanks.'],
    [/主要符号：/g, 'Main symbols: '],
    [/预载列表第 ([\d、, ]+) 行/g, 'Preload list lines $1'],
    [/第 (\d+) 页/g, 'Page $1'],
    [/第 (\d+) 行/g, 'Line $1'],
    [/步骤 (\d+)/g, 'Step $1'],
    [/(\d+) 次出现 \/ (\d+) 个资料组/g, '$1 mentions / $2 source families'],
    [/其中 (\d+) 次为证明引用。/g, '$1 are proof references.'],
    [/(\d+)\/(\d+) 次正确/g, '$1/$2 correct'],
    [/(\d+) 份 notebook/g, '$1 notebooks'],
    [/(\d+) 份 Notebook/g, '$1 notebooks'],
    [/(\d+) 处 hint/g, '$1 hints'],
    [/(\d+) 个位置/g, '$1 locations'],
    [/(\d+) 条卡片/g, '$1 cards'],
    [/(\d+) 条不同声明/g, '$1 distinct declarations'],
    [/(\d+) 条/g, '$1 items'],
    [/(\d+) 题/g, '$1 questions'],
    [/(\d+) 天/g, '$1 days'],
    [/(\d+) 处/g, '$1 locations'],
    [/(\d+) 页/g, '$1 pages'],
    [/(\d+) 次/g, '$1 times'],
    [/(\d+) 次声明提取/g, '$1 extracted declarations'],
    [/当前范围 /g, 'Current scope: '],
    [/资料状态：/g, 'Material status: '],
    [/已核对 /g, 'Verified '],
    [/实际发布 Week 与 PPT 仍待课程资料核对。/g, 'Publication weeks and slides still need verification against course materials.'],
    [/版本 /g, 'Version '],
    [/类型：/g, 'Type: '],
    [/剩余：/g, 'Remaining: '],
    [/构建日期：/g, 'Build date: '],
    [/题库与来源数据位于 data\/，可通过 tools\/ 重新整理新资料。/g, 'Question bank and source data are in data/; tools/ can process new materials.'],
    [/将 (.*?) 纳入手选范围/g, 'Add $1 to manual selection'],
    [/^练习 /g, 'Practice '],
    [/^输入 /g, 'Enter '],
    [/^填入 /g, 'Fill ']
  ];
  function translate(text, language) {
    const source = String(text == null ? '' : text);
    if (language !== 'en') return source;
    const trimmed = source.trim();
    if (exact.has(trimmed)) return source.replace(trimmed, exact.get(trimmed));
    let result = source;
    // Count patterns come first, before their component phrases are translated.
    for (const [pattern, replacement] of patterns) result = result.replace(pattern, replacement);
    return result.replace(phrasePattern, match => exact.get(match));
  }
  const textState = new WeakMap();
  const attributeState = new WeakMap();
  const ignore = '.math,.record-name,.record-ref,code,script,style,textarea,input,.proof-expression,.proof-hint-context,.source-formula,.formula-preview,.feedback-formula,.symbol-challenge,.blank-formula,#correct-answer,[data-action="proof-suggest"],.suggestion[data-group="true"] strong,[data-i18n-ignore],[data-action="group-name"],[data-action="group-ref"],[data-preset] option[data-i18n-ignore]';
  const attributeIgnore = '.math,.record-name,.record-ref,code,script,style,.proof-expression,.proof-hint-context,.source-formula,[data-i18n-ignore]';
  function localize(root, language) {
    if (!root) return;
    const doc = root.ownerDocument || root;
    const elements = root.nodeType === 1 ? [root, ...root.querySelectorAll('*')] : root.querySelectorAll ? [...root.querySelectorAll('*')] : [];
    for (const element of elements) {
      if (element.closest(attributeIgnore)) continue;
      let states = attributeState.get(element);
      if (!states) { states = new Map(); attributeState.set(element, states); }
      for (const name of ['title', 'aria-label', 'placeholder']) {
        if (!element.hasAttribute(name)) continue;
        const current = element.getAttribute(name);
        let state = states.get(name);
        if (!state || current !== state.output) state = { source: current, output: current };
        state.output = translate(state.source, language);
        states.set(name, state);
        if (current !== state.output) element.setAttribute(name, state.output);
      }
    }
    const walker = doc.createTreeWalker(root, 4);
    let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent || parent.closest(ignore)) continue;
      // The direct text in these containers is source/user content; their labelled children remain UI.
      if (parent.matches('.mistake-answer,.answer-variant .feedback-answer,.hint-group h2')) continue;
      const current = node.nodeValue;
      let state = textState.get(node);
      if (!state || current !== state.output) state = { source: current, output: current };
      const navLabels = {home: 'Quest', library: 'Library', focus: 'Focus', hints: 'Proofs', mistakes: 'Review', audit: 'Sources', settings: 'Settings'};
      const navButton = parent.closest('.nav-btn');
      state.output = language === 'en' && navButton && parent.tagName === 'SPAN' && !parent.classList.contains('nav-count') && !parent.classList.contains('nav-icon') ? navLabels[navButton.dataset.view] || translate(state.source, language) : translate(state.source, language);
      textState.set(node, state);
      if (current !== state.output) node.nodeValue = state.output;
    }
  }
  window.TQI18n = Object.freeze({ translate, localize });
})();
