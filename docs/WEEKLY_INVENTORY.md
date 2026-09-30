# 2025i 与 2026 定理 Week 清单

按指定规则，`Exercise N.x` 的第一个数字 N 是 **Week**，第二个数字 x 是周内编号。Homework 根据预载定理及正文证明与 Exercise 周的重合归类，逐本证据记录在 [`homework-week-evidence.json`](../research/preloaded/homework-week-evidence.json)。Week N 收录对应 notebook 预载弹窗中的**全部定理**及经 CalcCheck 确认的正文已证明定理（Homework 正文优先使用已核对周次，缺少证据时使用课程 week 目录），包括重复预载的声明；一条定理可以出现在多个 Week。弹窗自己的 `WeekN.*` 模块标签另列。

Example、Reference、Assignment 等 24 份来源缺少可靠的 Exercise 周次依据，故仍在 [逐 notebook 清单](../data/weekly-inventory.json) 中保留全部声明；其中 78 张卡片只见于这些来源，暂不进入 Week 筛选。

| 年份 | Week | notebook 数 | 声明出现次数 | 不同卡片 |
|---|---:|---:|---:|---:|
| 2025 | 1 | 8 | 288 | 192 |
| 2025 | 2 | 9 | 505 | 167 |
| 2025 | 3 | 5 | 316 | 154 |
| 2025 | 4 | 5 | 915 | 216 |
| 2025 | 5 | 9 | 2135 | 471 |
| 2025 | 6 | 8 | 2825 | 483 |
| 2025 | 7 | 8 | 3295 | 535 |
| 2025 | 8 | 2 | 1066 | 569 |
| 2025 | 9 | 8 | 3858 | 733 |
| 2025 | 10 | 2 | 1073 | 563 |
| 2025 | 11 | 2 | 568 | 397 |
| 2026 | 1 | 10 | 388 | 199 |
| 2026 | 2 | 8 | 458 | 161 |
| 2026 | 3 | 12 | 628 | 241 |
| 2026 | 4 | 3 | 412 | 248 |

## Homework notebook 归类依据

预载列表会累积早期定理；归类时同时核对正文证明与 Exercise 的主题或具体题目。

| 年份 | Homework notebook | Week | 证据 |
|---|---|---:|---|
| 2025 | [HW01 · CalcCheck preloaded theorem list](http://130.113.68.214:15001/) | 1 | 正文证明整数等式 (15.19)、(15.21)、(15.22)、(15.25a/b)，与 Ex1.2 的同号证明对应。 大量预载 PropLogic 属累积基础，不能用最大交集判周。 |
| 2025 | [HW02 · CalcCheck preloaded theorem list](http://130.113.68.214:15004/) | 1 | 正文练表达式语法、优先级与整数代数计算，对应 Ex1.1 Simple Calculations。 30 条去重预载定理与 Ex1.1 完全相同。 |
| 2025 | [HW03 · CalcCheck preloaded theorem list](http://130.113.68.214:15011/) | 2 | 正文赋值命令正确性 Lemma(1) `x+y=13 ⇒[x:=x+7] x+y=20` 与 Ex2.6 逐字同题。 49 条去重预载中 41 条与 Ex2.6 重合。 |
| 2025 | [HW04 · CalcCheck preloaded theorem list](http://130.113.68.214:15012/) | 2 | 正文命题演算题 (3.4)、(3.5)、(3.11)–(3.13) 在 Ex2.1 原样出现。 自身预载仅 4 条 Equality，正文是主要依据。 |
| 2025 | [HW05 · CalcCheck preloaded theorem list](http://130.113.68.214:15019/) | 3 | 正文 Leibniz 与 Replacement (3.84a) 同于 Ex3.1 的标题和证明。 136 条去重预载中 130 条与 Ex3.1 重合。 |
| 2025 | [HW06 · CalcCheck preloaded theorem list](http://130.113.68.214:15020/) | 2 | 正文为结构化命题证明、⇒ 的单调/反单调及 (4.1)–(4.3)，对应 Ex2.4 蕴含体系。 较晚 Exercise 预载的完整覆盖属于累积，不能覆盖正文主题。 |
| 2025 | [HW07 · CalcCheck preloaded theorem list](http://130.113.68.214:15023/) | 3 | 正文自然数归纳证明 Successor、suc 与加法及 Doubling；Ex3.2 同主题。 自身预载仅 4 条 Equality，正文是归类依据。 |
| 2025 | [HW08 · CalcCheck preloaded theorem list](http://130.113.68.214:15027/) | 4 | 正文 ≤ 下加减法单调/反单调计算链与 Ex4.1 题链相接，均含 `5+(u-7)`。 188 条去重预载中 132 条与 Ex4.1 重合。 |
| 2025 | [HW09 · CalcCheck preloaded theorem list](http://130.113.68.214:15028/) | 6 | 正文证明 Squaring 程序的 while 不变式和赋值规则，与 Ex6.6 的 while correctness 同类。 202 条去重预载中 201 条与 Ex6.6 重合；端口邻近 Week4 不构成归类依据。 |
| 2025 | [HW10-1 · CalcCheck preloaded theorem list](http://130.113.68.214:15034/) | 5 | 正文用 quantification expansion 展开有限 ℕ 范围的 ∑/∏，承接 Ex5.4 的范围操作与 Ex5.5 求和量词。 与 Ex5.4/5.5 各有 161 条去重预载重合，主题是主要依据。 |
| 2025 | [HW10-2 · CalcCheck preloaded theorem list](http://130.113.68.214:15035/) | 5 | 正文延续 H10.1，计算有限 ∑/∏ 与二重求和，对应 Ex5.4/5.5。 264 条去重预载与 H10.1 相同。 |
| 2025 | [HW10-3 · CalcCheck preloaded theorem list](http://130.113.68.214:15036/) | 5 | 正文延续 H10.1/2，并计算 Gauss `∑ i≤100 i`，对应 Ex5.4 范围与 Ex5.5 求和量词。 未发现与单一 Ex5.x 逐题复刻，按证明主题归类。 |
| 2025 | [HW11 · CalcCheck preloaded theorem list](http://130.113.68.214:15037/) | 5 | 正文为量词内代换、dummy renaming 与避免变量捕获；Ex5.5 含 Replacement in ∑ 和 Interchange of dummies。 自身 32 条去重预载仅 4 条与 Ex5.5 重合，正文决定归类。 |
| 2025 | [HW12 · CalcCheck preloaded theorem list](http://130.113.68.214:15045/) | 5 | 正文证明 universal Instantiation 与 `∀x` 实例化，归入 Week5 量词单元。 335 条去重预载中 299 条与 Ex5.5 重合，但未发现逐题复刻的可读 Ex5.x。 |
| 2025 | [HW13 · CalcCheck preloaded theorem list](http://130.113.68.214:15051/) | 6 | 正文 ∀/∃ 见证和反例与 Ex6.3 的 `∀y∃x x·1=y` 等题近乎相同。 371 条去重预载全部被 Ex6.3 覆盖。 |
| 2025 | [HW14 · CalcCheck preloaded theorem list](http://130.113.68.214:15059/) | 7 | 正文证明集合并交换/结合、子集传递和 extensionality，对应 Ex7.1 集合论。 300 条去重预载全部被 Ex7.1 覆盖。 |
| 2025 | [HW15-1 · CalcCheck preloaded theorem list](http://130.113.68.214:15062/) | 7 | 正文证明 Cartesian product 的非空与 (14.7ii)，对应 Ex7.2 Pairs and Cartesian Products。 417 条去重预载中 405 条与 Ex7.2 重合，另有 12 条 Week7.Exercise-7-2 专用模块。 |
| 2025 | [HW15-2 · CalcCheck preloaded theorem list](http://130.113.68.214:15063/) | 7 | 正文从集合对定义关系并证明 inclusion、extensionality 与 identity relation，承接 Ex7.2。 与 Ex7.2 共享 405 条去重预载，另有 Week7.Exercise-7-2 专用模块。 |
| 2025 | [HW16 · CalcCheck preloaded theorem list](http://130.113.68.214:15065/) | 7 | 正文 converse、composition、domain 等关系运算性质与 Ex7.4 逐主题对应。 446 条去重预载与 Ex7.4 完全相同。 |
| 2025 | [HW17 · CalcCheck preloaded theorem list](http://130.113.68.214:15069/) | 8 | 正文异构关系的 univalence、totality、injectivity、surjectivity 及 converse，对应 Week8 关系性质链和 Ex8.2。 491 条去重预载全部被 Ex8.2 覆盖；Ex8.1 无可见代码单元。 |
| 2025 | [HW18 · CalcCheck preloaded theorem list](http://130.113.68.214:15072/) | 9 | 正文显式使用 ℕ 与 snoc 归纳；Ex9.1 即 Using Explicit Induction Principle。 300 条去重预载全部被 Ex9.1 覆盖。 |
| 2025 | [HW19 · CalcCheck preloaded theorem list](http://130.113.68.214:15073/) | 9 | 正文定义并证明 binary-tree mirror、singleton height 等，与 Ex9.2 同一树定义和证明链。 576 条去重预载中 547 条与 Ex9.2 重合。 |
| 2025 | [HW19-2 · CalcCheck preloaded theorem list](http://130.113.68.214:15074/) | 9 | 正文说明仅记号与 H19 不同，对应 Ex9.2 variant 的 EmptyT/Branch 记号。 576 条去重预载中 547 条与 Ex9.2 variant 重合。 |
| 2025 | [HW20 · CalcCheck preloaded theorem list](http://130.113.68.214:15087/) | 10 | 正文 bag membership、计数、重建、size 和 union/difference，对应 Ex10.2 Bags。 494 条去重预载全部被 Ex10.2 覆盖。 |
| 2025 | [HW21 · CalcCheck preloaded theorem list](http://130.113.68.214:15095/) | 11 | 正文称其为 abstract relation algebra 序列第一本，证明关系等式、反身/对称和 mapping；与 H22 指向的 Exercises 11.1–11.4 同序列。 预载仅通用模块；已知索引无 Ex11.x URL，无法直接做 Exercise 交集。 |
| 2025 | [HW22 · CalcCheck preloaded theorem list](http://130.113.68.214:15108/) | 11 | 正文明确写预载 Exercise 11.4，并要求先做 Exercises 11.1–11.4，证明 abstract relation algebra 的 subidentity 与 dom/ran。 预载含 Week11.Exercise-11-4_Allegory_SOL 9 条；Ex11.x notebook 未在已知索引开放。 |
| 2026 | [2026 H1 · 入门与 CalcCheck · 预载列表](http://130.113.68.214:16001/) | 1 | 正文指向 first lecture，以整数计算链、加乘减和消去律为证明目标，对应 Ex1.1–Ex1.6。 预载 178 条中大量是累积的 PropLogic.All，不能按后续周最大交集归类。 |
| 2026 | [2026 H2 · 表达式与计算 · 预载列表](http://130.113.68.214:16009/) | 1 | 正文以 second lecture 的表达式计算开篇，证明结合、交换、替换及整数展开化简，对应 Ex1.1、Ex1.3–Ex1.6。 30 条预载定理与 Ex1.1、Ex1.3 完整重合。 |
| 2026 | [2026 H3 · 赋值命令正确性 · 预载列表](http://130.113.68.214:16010/) | 1 | 正文明确写 setup is the same as in Exercise 1.7，并再次引用 Ex1.7 Lemma (4)。 49 条预载定理与 Ex1.7 完整重合，证明赋值命令正确性。 |
| 2026 | [2026 H4 · 命题演算入门 · 预载列表](http://130.113.68.214:16017/) | 2 | 正文证明等价、非等价、否定的 (3.4)、(3.5)、(3.11)–(3.13)，与 Ex2.1 同题。 预载仅 4 条 Equality，主要依据是正文证明。 |
| 2026 | [2026 H5 · 命题演算 · 预载列表](http://130.113.68.214:16018/) | 2 | 正文明确要求先完成 Exercises 2.2 to 2.4，证明析取、合取、De Morgan、蕴含等同组性质。 102 张来源卡片全部出现在 2026 Ex2 组。 |
| 2026 | [2026 H6 · 自然数与归纳 · 预载列表](http://130.113.68.214:16021/) | 3 | 正文证明自然数加法右单位、suc 移位、交换律；随后以 Week3.Homework-6_Nat-sucInd_SOL 被 Ex3.1–Ex3.4 预载。 自身预载仅 4 条 Equality，归类依据是正文产出的定理。 |
| 2026 | [2026 H7.1 · 单调性与反单调性 · 预载列表](http://130.113.68.214:16026/) | 4 | 正文证明整数 ≤ 上加法、取负、减法的单调性与反单调性；标题与 2025i Ex4.1 完全同题。 2026 Ex4 尚未开放；与 Ex2/Ex3 的预载交集主要是累积基础声明。 |
| 2026 | [2026 H7.2 · 自然数的序 · 预载列表](http://130.113.68.214:16027/) | 4 | 正文新证明 ℕ 上 ≤ 的反对称、传递，以及加法与 pred 单调性；2025i Ex4.4 正文也证明 Transitivity of ≤ 和 ≤-Monotonicity of +。 正文说明预载 H6、Ex3.1–Ex3.3，因此与 Ex3.4 的完整预载重合属于先修累积；2026 Ex4 尚未开放。 |
| 2026 | [2026 H8.1 · Leibniz 与替换 · 预载列表](http://130.113.68.214:16028/) | 3 | 正文证明 Leibniz (3.83) 和 Replacement (3.84)，与 2025i Ex3.1 的标题和证明主题完全对应。 正文引用 Ex2.4 作为先修，不能据此归 Week2。 |
| 2026 | [2026 H8.2 · 结构化证明 · 预载列表](http://130.113.68.214:16029/) | 3 | 正文三次明确指向 Week 3 lectures/slides，证明 structured proofs、assuming antecedent、by cases。 预载与 Ex2/H5 的命题演算底座大量重合，正文决定归类。 |

## 2025 · Week 1

对应 notebook：[2025i Exercise 1.1: Simple Calculations in CalcCheck · 预载列表](http://130.113.68.214:15005/), [2025i Exercise 1.2: An Equational Theory of Integers · 预载列表](http://130.113.68.214:15006/), [2025i Exercise 1.3: Substitution · 预载列表](http://130.113.68.214:15007/), [2025i Exercise 1.4: Re-Proving the Equational Theory of Integers with Rigid Matching · 预载列表](http://130.113.68.214:15008/), [2025i Exercise 1.5: Re-Proving the Integer Theorems without Automatic Associativity and Symmetry · 预载列表](http://130.113.68.214:15009/), [2025i Exercise 1.6: Re-Proving the Integer Theorems for Masochists · 预载列表](http://130.113.68.214:15010/), [HW01 · CalcCheck preloaded theorem list](http://130.113.68.214:15001/), [HW02 · CalcCheck preloaded theorem list](http://130.113.68.214:15004/)

| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |
|---|---|---|---|---:|
| (1.2) | Reflexivity of = | Axiom | x = x | 9 |
| (1.3) | Symmetry of = | Axiom | (x = y) = (y = x) | 9 |
| (1.4) | Transitivity of = | Derived inference rule | X = Y , Y = Z ⊦ X = Z | 9 |
| (1.5) | Leibniz | Derived inference rule | X = Y ⊦ E[z ≔ X] = E[z ≔ Y] | 9 |
| (15.13) | Unary minus | Axiom | a + - a = 0 | 4 |
| (15.14) | Subtraction | Axiom | a - b = a + - b | 4 |
| (15.17) | Self-inverse of unary minus | Theorem | - (- a) = a | 3 |
| (15.18) | Fixpoint of unary minus | Theorem | - 0 = 0 | 3 |
| (15.19) | Distributivity of unary minus over + | Theorem | - (a + b) = - a + - b | 3 |
| (15.1a) | Associativity of + | Axiom | (a + b) + c = a + (b + c) | 4 |
| (15.1b) | Associativity of · | Axiom | (a · b) · c = a · (b · c) | 4 |
| (15.20) | Negation as multiplication | Theorem | - a = - 1 · a | 3 |
| (15.21) | 原文未命名 | Theorem | - a · b = a · - b | 3 |
| (15.22) | Commutativity of unary minus with · | Theorem | a · - b = - (a · b) | 3 |
| (15.23) | 原文未命名 | Theorem | - a · - b = a · b | 3 |
| (15.24) | Right-identity of - | Theorem | a - 0 = a | 3 |
| (15.24a) | Subtraction of subtraction | Theorem | a - (b - c) = (a - b) + c | 3 |
| (15.25) | 原文未命名 | Theorem | (a - b) + (c - d) = (a + c) - (b + d) | 3 |
| (15.25a) | Mutual associativity of + and - | Theorem | a + (b - c) = (a + b) - c | 3 |
| (15.25b) | Subtraction of addition | Theorem | a - (b + c) = (a - b) - c | 3 |
| (15.25c) | Cancellation across added subtractions | Theorem | (a - b) + (b - c) = a - c | 3 |
| (15.26) | 原文未命名 | Theorem | (a - b) - (c - d) = (a + d) - (b + c) | 3 |
| (15.27) | 原文未命名 | Theorem | (a - b) · (c - d) = (a · c + b · d) - (a · d + b · c) | 3 |
| (15.29) | Distributivity of · over - | Theorem | (a - b) · c = a · c - b · c | 3 |
| (15.2a) | Symmetry of + | Axiom | a + b = b + a | 4 |
| (15.2b) | Symmetry of · | Axiom | a · b = b · a | 4 |
| (15.3) | Additive identity；别名：Identity of + | Axiom | 0 + a = a | 4 |
| (15.4) | Multiplicative identity；别名：Identity of · | Axiom | 1 · a = a | 4 |
| (15.5) | Distributivity of · over + | Axiom | a · (b + c) = a · b + a · c | 4 |
| (15.7) | Cancellation of · | Axiom | c ≠ 0 ⇒ (c · a = c · b ≡ a = b) | 1 |
| (15.8) | Cancellation of + | Axiom | a + b = a + c ≡ b = c | 1 |
| (15.9) | Zero of · | Axiom | a · 0 = 0 | 4 |
| (3.1) | Associativity of ≡ | Axiom | ((p ≡ q) ≡ r) ≡ (p ≡ (q ≡ r)) | 1 |
| (3.10) | Definition of ≢ | Axiom | (p ≢ q) ≡ ¬ (p ≡ q) | 1 |
| (3.11) | ¬ connection | Theorem | ¬ p ≡ (q ≡ (p ≡ ¬ q)) | 1 |
| (3.12) | Double negation | Theorem | ¬ (¬ p) ≡ p | 1 |
| (3.13) | Negation of `false` | Theorem | ¬ false ≡ true | 1 |
| (3.14) | 原文未命名 | Theorem | (p ≢ q) ≡ (¬ p ≡ q) | 1 |
| (3.15) | Definition of ¬ from ≡ | Theorem | ¬ p ≡ (p ≡ false) | 1 |
| (3.16) | Symmetry of ≢ | Theorem | (p ≢ q) ≡ (q ≢ p) | 1 |
| (3.17) | Associativity of ≢ | Theorem | ((p ≢ q) ≢ r) ≡ (p ≢ (q ≢ r)) | 1 |
| (3.18) | Mutual associativity of ≡ with ≢ | Theorem | ((p ≢ q) ≡ r) ≡ (p ≢ (q ≡ r)) | 1 |
| (3.19) | Mutual interchangeability of ≡ with ≢ | Theorem | (p ≢ (q ≡ r)) ≡ (p ≡ (q ≢ r)) | 1 |
| (3.2) | Symmetry of ≡ | Axiom | (p ≡ q) ≡ (q ≡ p) | 1 |
| (3.24) | Symmetry of ∨ | Axiom | p ∨ q ≡ q ∨ p | 1 |
| (3.25) | Associativity of ∨ | Axiom | (p ∨ q) ∨ r ≡ p ∨ (q ∨ r) | 1 |
| (3.26) | Idempotency of ∨ | Axiom | p ∨ p ≡ p | 1 |
| (3.27) | Distributivity of ∨ over ≡ | Axiom | p ∨ (q ≡ r) ≡ (p ∨ q ≡ p ∨ r) | 1 |
| (3.28) | Excluded middle；别名：LEM | Axiom | p ∨ ¬ p | 1 |
| (3.29) | Zero of ∨ | Theorem | p ∨ true ≡ true | 1 |
| (3.3) | Identity of ≡ | Axiom | true ≡ (q ≡ q) | 1 |
| (3.30) | Identity of ∨ | Theorem | p ∨ false ≡ p | 1 |
| (3.31) | Distributivity of ∨ over ∨ | Theorem | p ∨ (q ∨ r) ≡ (p ∨ q) ∨ (p ∨ r) | 1 |
| (3.32) | 原文未命名 | Theorem | p ∨ q ≡ (p ∨ ¬ q ≡ p) | 1 |
| (3.35) | Golden rule | Axiom | p ∧ q ≡ (p ≡ (q ≡ p ∨ q)) | 1 |
| (3.36) | Symmetry of ∧ | Theorem | p ∧ q ≡ q ∧ p | 1 |
| (3.37) | Associativity of ∧ | Theorem | (p ∧ q) ∧ r ≡ p ∧ (q ∧ r) | 1 |
| (3.38) | Idempotency of ∧ | Theorem | p ∧ p ≡ p | 1 |
| (3.39) | Identity of ∧ | Theorem | p ∧ true ≡ p | 1 |
| (3.4) | 原文未命名 | Theorem | true | 1 |
| (3.40) | Zero of ∧ | Theorem | p ∧ false ≡ false | 1 |
| (3.41) | Distributivity of ∧ over ∧ | Theorem | p ∧ (q ∧ r) ≡ (p ∧ q) ∧ (p ∧ r) | 1 |
| (3.42) | Contradiction | Theorem | p ∧ ¬ p ≡ false | 1 |
| (3.43a) | Absorption | Theorem | p ∧ (p ∨ q) ≡ p | 1 |
| (3.43b) | Absorption | Theorem | p ∨ (p ∧ q) ≡ p | 1 |
| (3.44a) | Absorption | Theorem | p ∧ (¬ p ∨ q) ≡ p ∧ q | 1 |
| (3.44b) | Absorption | Theorem | p ∨ (¬ p ∧ q) ≡ p ∨ q | 1 |
| (3.44c) | Absorption | Theorem | ¬ p ∧ (p ∨ q) ≡ ¬ p ∧ q | 1 |
| (3.44d) | Absorption | Theorem | ¬ p ∨ (p ∧ q) ≡ ¬ p ∨ q | 1 |
| (3.45) | Distributivity of ∨ over ∧ | Theorem | p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r) | 1 |
| (3.46) | Distributivity of ∧ over ∨ | Theorem | p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r) | 1 |
| (3.47a) | De Morgan | Theorem | ¬ (p ∧ q) ≡ ¬ p ∨ ¬ q | 1 |
| (3.47b) | De Morgan | Theorem | ¬ (p ∨ q) ≡ ¬ p ∧ ¬ q | 1 |
| (3.47c) | De Morgan | Theorem | ¬ (¬ p ∧ q) ≡ p ∨ ¬ q | 1 |
| (3.47d) | De Morgan | Theorem | ¬ (¬ p ∨ q) ≡ p ∧ ¬ q | 1 |
| (3.47e) | De Morgan dual of ∧ | Theorem | ¬ (¬ p ∧ ¬ q) ≡ p ∨ q | 1 |
| (3.47f) | De Morgan dual of ∨ | Theorem | ¬ (¬ p ∨ ¬ q) ≡ p ∧ q | 1 |
| (3.48) | 原文未命名 | Theorem | p ∧ q ≡ (p ∧ ¬ q ≡ ¬ p) | 1 |
| (3.49) | Semi-distributivity of ∧ over ≡ | Theorem | p ∧ (q ≡ r) ≡ (p ∧ q ≡ (p ∧ r ≡ p)) | 1 |
| (3.5) | Reflexivity of ≡ | Theorem | p ≡ p | 1 |
| (3.50) | Strong modus ponens for ≡ | Theorem | p ∧ (q ≡ p) ≡ p ∧ q | 1 |
| (3.51) | Replacement | Theorem | (p ≡ q) ∧ (r ≡ p) ≡ (p ≡ q) ∧ (r ≡ q) | 1 |
| (3.52) | Alternative definition of ≡ | Theorem | p ≡ (q ≡ (p ∧ q) ∨ (¬ p ∧ ¬ q)) | 1 |
| (3.53) | Exclusive or；别名：Alternative definition of ≢ | Theorem | (p ≢ q) ≡ (¬ p ∧ q) ∨ (p ∧ ¬ q) | 1 |
| (3.55) | 原文未命名 | Theorem | (p ∧ q) ∧ r ≡ (p ≡ (q ≡ (r ≡ (p ∨ q ≡ (q ∨ r ≡ (r ∨ p ≡ p ∨ (q ∨ r))))))) | 1 |
| (3.57) | Definition of ⇒ via ∨；别名：Definition of ⇒ from ∨、Definition of ⇒、Definition of implication | Axiom | p ⇒ q ≡ (p ∨ q ≡ q) | 1 |
| (3.57=) | Implication via ∨ | Lemma | (p ⇒ q) = (p ∨ q ≡ q) | 1 |
| (3.58) | Definition of ⇐；别名：Consequence | Axiom | p ⇐ q ≡ q ⇒ p | 1 |
| (3.59) | Material implication；别名：Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ ¬ p ∨ q | 1 |
| (3.60) | Definition of ⇒ via ∧；别名：Definition of ⇒ from ∧、Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ (p ∧ q ≡ p) | 1 |
| (3.60=) | Implication via ∧ | Lemma | (p ⇒ q) = (p ∧ q ≡ p) | 1 |
| (3.61) | Contrapositive | Theorem | p ⇒ q ≡ ¬ q ⇒ ¬ p | 1 |
| (3.61.1) | ¬-connection for ⇒ | Theorem | p ⇒ ¬ q ≡ q ⇒ ¬ p | 1 |
| (3.61.2) | ¬-connection for ⇒ | Theorem | ¬ p ⇒ q ≡ ¬ q ⇒ p | 1 |
| (3.62) | 原文未命名 | Theorem | p ⇒ (q ≡ r) ≡ (p ∧ q ≡ p ∧ r) | 1 |
| (3.63) | Distributivity of ⇒ over ≡ | Theorem | p ⇒ (q ≡ r) ≡ (p ⇒ q ≡ p ⇒ r) | 1 |
| (3.64) | Self-distributivity of ⇒ | Theorem | p ⇒ (q ⇒ r) ≡ (p ⇒ q) ⇒ (p ⇒ r) | 1 |
| (3.65) | Shunting | Theorem | p ∧ q ⇒ r ≡ p ⇒ (q ⇒ r) | 1 |
| (3.66) | Strong modus ponens | Theorem | p ∧ (p ⇒ q) ≡ p ∧ q | 1 |
| (3.67) | 原文未命名 | Theorem | p ∧ (q ⇒ p) ≡ p | 1 |
| (3.68) | 原文未命名 | Theorem | p ∨ (p ⇒ q) ≡ true | 1 |
| (3.69) | 原文未命名 | Theorem | p ∨ (q ⇒ p) ≡ q ⇒ p | 1 |
| (3.70) | 原文未命名 | Theorem | p ∨ q ⇒ p ∧ q ≡ (p ≡ q) | 1 |
| (3.71) | Reflexivity of ⇒ | Theorem | p ⇒ p | 1 |
| (3.72) | Right-zero of ⇒；别名：ex quodlibet verum | Theorem | p ⇒ true | 1 |
| (3.73) | Left-identity of ⇒ | Theorem | true ⇒ p ≡ p | 1 |
| (3.74) | Definition of ¬ from ⇒ | Theorem | p ⇒ false ≡ ¬ p | 1 |
| (3.75) | ex falso quodlibet | Theorem | false ⇒ p | 1 |
| (3.76a) | Weakening；别名：Strengthening | Theorem | p ⇒ p ∨ q | 1 |
| (3.76b) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p | 1 |
| (3.76c) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∨ q | 1 |
| (3.76d) | Weakening；别名：Strengthening | Theorem | p ∨ (q ∧ r) ⇒ p ∨ q | 1 |
| (3.76e) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∧ (q ∨ r) | 1 |
| (3.77) | Modus ponens | Theorem | p ∧ (p ⇒ q) ⇒ q | 1 |
| (3.78) | Case analysis | Theorem | (p ⇒ r) ∧ (q ⇒ r) ≡ p ∨ q ⇒ r | 1 |
| (3.79) | Case analysis | Theorem | (p ⇒ r) ∧ (¬ p ⇒ r) ≡ r | 1 |
| (3.8) | Definition of `false` | Axiom | false ≡ ¬ true | 1 |
| (3.80) | Mutual implication | Theorem | (p ⇒ q) ∧ (q ⇒ p) ≡ (p ≡ q) | 1 |
| (3.80.1) | Reflexivity of ⇒ wrt. ≡；别名：Reflexivity of ⇒ | Theorem | (p ≡ q) ⇒ (p ⇒ q) | 1 |
| (3.81) | Antisymmetry of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ p) ⇒ (p ≡ q) | 1 |
| (3.82.4) | Implication strengthening | Theorem | p ⇒ q ≡ p ⇒ p ∧ q | 1 |
| (3.82.5) | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 1 |
| (3.82a) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 1 |
| (3.82b) | Transitivity of ⇒ | Theorem | (p ≡ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 1 |
| (3.82c) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ≡ r) ⇒ (p ⇒ r) | 1 |
| (3.83) | Leibniz | Axiom | e = f ⇒ E[z ≔ e] = E[z ≔ f] | 1 |
| (3.83.1) | Leibniz | Corollary | d = e ⇒ f d = f e | 1 |
| (3.83.2) | Leibniz | Corollary | d = e ⇒ (p d ≡ p e) | 1 |
| (3.83.3) | Leibniz | Corollary | (d ≡ e) ⇒ (p d ≡ p e) | 1 |
| (3.83.4) | Leibniz | Corollary | (d ≡ e) ⇒ f d = f e | 1 |
| (3.84a) | Replacement | Theorem | e = f ∧ E[z ≔ e] ≡ e = f ∧ E[z ≔ f] | 1 |
| (3.84a≡) | Replacement | Theorem | (e ≡ f) ∧ E[z ≔ e] ≡ (e ≡ f) ∧ E[z ≔ f] | 1 |
| (3.84b) | Replacement | Theorem | e = f ⇒ E[z ≔ e] ≡ e = f ⇒ E[z ≔ f] | 1 |
| (3.84b≡) | Replacement | Theorem | (e ≡ f) ⇒ E[z ≔ e] ≡ (e ≡ f) ⇒ E[z ≔ f] | 1 |
| (3.84c) | Replacement | Theorem | q ∧ (e ≡ f) ⇒ E[z ≔ e] ≡ q ∧ (e ≡ f) ⇒ E[z ≔ f] | 1 |
| (3.84c) | Replacement | Theorem | q ∧ e = f ⇒ E[z ≔ e] ≡ q ∧ e = f ⇒ E[z ≔ f] | 1 |
| (3.85a) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] ≡ p ⇒ E[z ≔ true] | 1 |
| (3.85b) | Replace by `true` | Theorem | q ∧ p ⇒ E[z ≔ p] ≡ q ∧ p ⇒ E[z ≔ true] | 1 |
| (3.85c) | Replace by `false` | Theorem | ¬ p ⇒ E[z ≔ p] ≡ ¬ p ⇒ E[z ≔ false] | 1 |
| (3.85d) | Replace by `false` | Theorem | q ∧ ¬ p ⇒ E[z ≔ p] ≡ q ∧ ¬ p ⇒ E[z ≔ false] | 1 |
| (3.85e) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] = E[z ≔ true] | 1 |
| (3.86a) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ≡ E[z ≔ false] ⇒ p | 1 |
| (3.86b) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ∨ q ≡ E[z ≔ false] ⇒ p ∨ q | 1 |
| (3.87) | Replace by `true` | Theorem | p ∧ E[z ≔ p] ≡ p ∧ E[z ≔ true] | 1 |
| (3.87.1) | Abbreviated replace by `false` | Theorem | ¬ p ∧ E ≡ ¬ p ∧ E[p ≔ false] | 1 |
| (3.87.1) | Abbreviated replace by `true` | Theorem | p ∧ E ≡ p ∧ E[p ≔ true] | 1 |
| (3.88) | Replace by `false` | Theorem | p ∨ E[z ≔ p] ≡ p ∨ E[z ≔ false] | 1 |
| (3.89) | Shannon | Theorem | E[z ≔ p] ≡ (p ∧ E[z ≔ true]) ∨ (¬ p ∧ E[z ≔ false]) | 1 |
| (3.9) | Commutativity of ¬ with ≡ | Axiom | ¬ (p ≡ q) ≡ (¬ p ≡ q) | 1 |
| (4.3) | Left-monotonicity of ∧；别名：Monotonicity of ∧ | Theorem | (p ⇒ q) ⇒ (p ∧ r ⇒ q ∧ r) | 1 |
| 未编号 · 00099d | ∧₆-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ (u ⇒ p ∧ (q ∧ (r ∧ (s ∧ (t ∧ u))))))))) | 1 |
| 未编号 · 0102c0 | Identity of ≢ | Theorem | (p ≢ false) ≡ p | 1 |
| 未编号 · 0440d9 | Equivalence enrichment | Theorem | (p ≡ q) ⇒ ((p ⇒ r) ⇒ (p ⇒ q ∧ r)) | 1 |
| 未编号 · 08e6b7 | Monotonicity of ∧ | Theorem | (p ⇒ p') ⇒ ((q ⇒ q') ⇒ (p ∧ q ⇒ p' ∧ q')) | 1 |
| 未编号 · 0a2238 | Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ (p ∨ r ⇒ q ∨ r) | 1 |
| 未编号 · 0f2ed1 | Contributing conjunct to ≡ | Theorem | (p ∧ q ≡ r) ∧ p ⇒ (q ≡ r) | 1 |
| 未编号 · 15c06f | Transitivity of = | Theorem | e = f ∧ f = g ⇒ e = g | 1 |
| 未编号 · 23785d | Adding consequent to ∧ | Theorem | (p ⇒ q) ⇒ (p ∧ r ⇒ p ∧ (q ∧ r)) | 1 |
| 未编号 · 24a375 | Definition of ≡ | Axiom | (p ≡ q) = (p = q) | 1 |
| 未编号 · 25737b | Co-residual of ∨ | Theorem | q ⇒ x ∨ p ≡ ¬ p ∧ q ⇒ x | 1 |
| 未编号 · 2977f6 | Proof by contradiction | Theorem | ¬ p ⇒ false ≡ p | 1 |
| 未编号 · 29a570 | ∧₅-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ p ∧ (q ∧ (r ∧ (s ∧ t))))))) | 2 |
| 未编号 · 2b72bc | Definition of ∧ | Lemma | (p ∧ q) = (p ≡ (q ≡ p ∨ q)) | 1 |
| 未编号 · 31d3fa | Preserving conjunct after ⇒ | Theorem | p ∧ q ⇒ r ≡ p ∧ q ⇒ p ∧ r | 1 |
| 未编号 · 3aa5d0 | Monotonicity of ⇒；别名：Right-monotonicity of ⇒ | Theorem | (p ⇒ q) ⇒ ((r ⇒ p) ⇒ (r ⇒ q)) | 1 |
| 未编号 · 478166 | Right-distributivity of ⇒ over ∧₃ | Theorem | p ⇒ q ∧ (r ∧ s) ≡ (p ⇒ q) ∧ ((p ⇒ r) ∧ (p ⇒ s)) | 1 |
| 未编号 · 5aae8c | Definition of ≠ | Theorem | x ≠ y ≡ (x = y ≡ false) | 1 |
| 未编号 · 5f6c2d | Symmetry of ≠ | Theorem | x ≠ y ≡ y ≠ x | 1 |
| 未编号 · 70f478 | ∧-Introduction | Theorem | p ⇒ (q ⇒ p ∧ q) | 1 |
| 未编号 · 771122 | ∧₄-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ p ∧ (q ∧ (r ∧ s))))) | 1 |
| 未编号 · 79d90c | Left-monotonicity of ∨；别名：Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ (p ∨ r ⇒ q ∨ r) | 1 |
| 未编号 · 86a35c | Abbreviated replacement in ∧；别名：Abbreviated replacement | Theorem | P ∧ x = E ≡ P[x ≔ E] ∧ x = E | 1 |
| 未编号 · 8876d6 | Case shuffling | Theorem | (p ∨ q) ∧ (¬ p ∨ r) ≡ (p ∧ r) ∨ (¬ p ∧ q) | 1 |
| 未编号 · 90956c | ⇒-Introduction | Primitive inference rule | ( p ⊦ q ) ⊦ p ⇒ q | 1 |
| 未编号 · 94d527 | Weakening；别名：Strengthening | Theorem | (p ∨ q) ∧ r ⇒ p ∨ (q ∧ r) | 1 |
| 未编号 · 94f30a | ∧₇-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ (u ⇒ (v ⇒ p ∧ (q ∧ (r ∧ (s ∧ (t ∧ (u ∧ v))))))))))) | 1 |
| 未编号 · 9941d0 | ∧₃-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ p ∧ (q ∧ r))) | 1 |
| 未编号 · 9cb45b | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 1 |
| 未编号 · 9cd73a | Definition of ≠ | Axiom | x ≠ y ≡ ¬ (x = y) | 1 |
| 未编号 · a2a32a | Disjunction as implication | Lemma | p ∨ q ≡ ¬ p ⇒ q | 1 |
| 未编号 · b103d7 | Right-distributivity of ⇒ over ∧₄ | Theorem | p ⇒ q ∧ (r ∧ (s ∧ t)) ≡ (p ⇒ q) ∧ ((p ⇒ r) ∧ ((p ⇒ s) ∧ (p ⇒ t))) | 1 |
| 未编号 · b77dec | Abbreviated replacement in ⇒；别名：Abbreviated replacement | Theorem | x = E ⇒ P ≡ x = E ⇒ P[x ≔ E] | 1 |
| 未编号 · b8a06d | Exclusive or implies inclusive | Theorem | (p ≢ q) ⇒ p ∨ q | 1 |
| 未编号 · bb97a0 | Negation of ≠ | Theorem | ¬ (x ≠ y) ≡ x = y | 1 |
| 未编号 · bdf087 | Antitonicity of ¬ | Theorem | (p ⇒ q) ⇒ (¬ q ⇒ ¬ p) | 1 |
| 未编号 · ce5ae3 | Residual of ∧ | Theorem | x ∧ p ⇒ q ≡ x ⇒ (p ⇒ q) | 1 |
| 未编号 · e18e5f | Irreflexivity of ≠ | Theorem | x ≠ x ≡ false | 1 |
| 未编号 · e364a1 | Antitonicity of ⇒；别名：Left-antitonicity of ⇒ | Theorem | (p ⇒ q) ⇒ ((q ⇒ r) ⇒ (p ⇒ r)) | 1 |
| 未编号 · f1d779 | Cancellation of ¬ | Theorem | (¬ p ≡ ¬ q) = (p ≡ q) | 1 |
| 未编号 · f4948f | Case shuffling | Theorem | (p ⇒ q) ∧ (¬ p ⇒ r) ≡ (p ∧ q) ∨ (¬ p ∧ r) | 1 |
| 未编号 · f8a195 | Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ ((r ⇒ s) ⇒ (p ∨ r ⇒ q ∨ s)) | 2 |
| 未编号 · f93139 | Irreflexivity of ≠ | Theorem | ¬ (x ≠ x) | 1 |

## 2025 · Week 2

对应 notebook：[2025i Exercise 2.1: Propositional Calculus: From Equivalence to Inequivalence · 预载列表](http://130.113.68.214:15013/), [2025i Exercise 2.2: Propositional Calculus: Disjunction · 预载列表](http://130.113.68.214:15014/), [2025i Exercise 2.3: Propositional Calculus: Conjunction · 预载列表](http://130.113.68.214:15015/), [2025i Exercise 2.4: Implication · 预载列表](http://130.113.68.214:15016/), [2025i Extra Exercise 2.5: Knights and Knaves · 预载列表](http://130.113.68.214:15017/), [2025i Exercise 2.6: Assignment Commands with Boolean Variables · 预载列表](http://130.113.68.214:15018/), [HW03 · CalcCheck preloaded theorem list](http://130.113.68.214:15011/), [HW04 · CalcCheck preloaded theorem list](http://130.113.68.214:15012/), [HW06 · CalcCheck preloaded theorem list](http://130.113.68.214:15020/)

| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |
|---|---|---|---|---:|
| (1.2) | Reflexivity of = | Axiom | x = x | 10 |
| (1.3) | Symmetry of = | Axiom | (x = y) = (y = x) | 10 |
| (1.4) | Transitivity of = | Derived inference rule | X = Y , Y = Z ⊦ X = Z | 10 |
| (1.5) | Leibniz | Derived inference rule | X = Y ⊦ E[z ≔ X] = E[z ≔ Y] | 10 |
| (15.13) | Unary minus | Axiom | a + - a = 0 | 2 |
| (15.14) | Subtraction | Axiom | a - b = a + - b | 2 |
| (15.17) | Self-inverse of unary minus | Theorem | - (- a) = a | 2 |
| (15.18) | Fixpoint of unary minus | Theorem | - 0 = 0 | 2 |
| (15.19) | Distributivity of unary minus over + | Theorem | - (a + b) = - a + - b | 2 |
| (15.1a) | Associativity of + | Axiom | (a + b) + c = a + (b + c) | 2 |
| (15.1b) | Associativity of · | Axiom | (a · b) · c = a · (b · c) | 2 |
| (15.20) | Negation as multiplication | Theorem | - a = - 1 · a | 2 |
| (15.21) | 原文未命名 | Theorem | - a · b = a · - b | 2 |
| (15.22) | Commutativity of unary minus with · | Theorem | a · - b = - (a · b) | 2 |
| (15.23) | 原文未命名 | Theorem | - a · - b = a · b | 2 |
| (15.24) | Right-identity of - | Theorem | a - 0 = a | 2 |
| (15.24a) | Subtraction of subtraction | Theorem | a - (b - c) = (a - b) + c | 2 |
| (15.25) | 原文未命名 | Theorem | (a - b) + (c - d) = (a + c) - (b + d) | 2 |
| (15.25a) | Mutual associativity of + and - | Theorem | a + (b - c) = (a + b) - c | 2 |
| (15.25b) | Subtraction of addition | Theorem | a - (b + c) = (a - b) - c | 2 |
| (15.25c) | Cancellation across added subtractions | Theorem | (a - b) + (b - c) = a - c | 2 |
| (15.26) | 原文未命名 | Theorem | (a - b) - (c - d) = (a + d) - (b + c) | 2 |
| (15.27) | 原文未命名 | Theorem | (a - b) · (c - d) = (a · c + b · d) - (a · d + b · c) | 2 |
| (15.29) | Distributivity of · over - | Theorem | (a - b) · c = a · c - b · c | 2 |
| (15.2a) | Symmetry of + | Axiom | a + b = b + a | 2 |
| (15.2b) | Symmetry of · | Axiom | a · b = b · a | 2 |
| (15.3) | Additive identity；别名：Identity of + | Axiom | 0 + a = a | 2 |
| (15.4) | Multiplicative identity；别名：Identity of · | Axiom | 1 · a = a | 2 |
| (15.5) | Distributivity of · over + | Axiom | a · (b + c) = a · b + a · c | 2 |
| (15.7) | Cancellation of · | Axiom | c ≠ 0 ⇒ (c · a = c · b ≡ a = b) | 2 |
| (15.8) | Cancellation of + | Axiom | a + b = a + c ≡ b = c | 2 |
| (15.9) | Zero of · | Axiom | a · 0 = 0 | 2 |
| (3.1) | Associativity of ≡ | Axiom | ((p ≡ q) ≡ r) ≡ (p ≡ (q ≡ r)) | 7 |
| (3.10) | Definition of ≢ | Axiom | (p ≢ q) ≡ ¬ (p ≡ q) | 6 |
| (3.11) | ¬ connection | Theorem | ¬ p ≡ (q ≡ (p ≡ ¬ q)) | 6 |
| (3.12) | Double negation | Theorem | ¬ (¬ p) ≡ p | 6 |
| (3.13) | Negation of `false` | Theorem | ¬ false ≡ true | 6 |
| (3.14) | 原文未命名 | Theorem | (p ≢ q) ≡ (¬ p ≡ q) | 6 |
| (3.15) | Definition of ¬ from ≡ | Theorem | ¬ p ≡ (p ≡ false) | 6 |
| (3.16) | Symmetry of ≢ | Theorem | (p ≢ q) ≡ (q ≢ p) | 6 |
| (3.17) | Associativity of ≢ | Theorem | ((p ≢ q) ≢ r) ≡ (p ≢ (q ≢ r)) | 6 |
| (3.18) | Mutual associativity of ≡ with ≢ | Theorem | ((p ≢ q) ≡ r) ≡ (p ≢ (q ≡ r)) | 6 |
| (3.19) | Mutual interchangeability of ≡ with ≢ | Theorem | (p ≢ (q ≡ r)) ≡ (p ≡ (q ≢ r)) | 6 |
| (3.2) | Symmetry of ≡ | Axiom | (p ≡ q) ≡ (q ≡ p) | 7 |
| (3.24) | Symmetry of ∨ | Axiom | p ∨ q ≡ q ∨ p | 5 |
| (3.25) | Associativity of ∨ | Axiom | (p ∨ q) ∨ r ≡ p ∨ (q ∨ r) | 5 |
| (3.26) | Idempotency of ∨ | Axiom | p ∨ p ≡ p | 5 |
| (3.27) | Distributivity of ∨ over ≡ | Axiom | p ∨ (q ≡ r) ≡ (p ∨ q ≡ p ∨ r) | 5 |
| (3.28) | Excluded middle；别名：LEM | Axiom | p ∨ ¬ p | 5 |
| (3.29) | Zero of ∨ | Theorem | p ∨ true ≡ true | 5 |
| (3.3) | Identity of ≡ | Axiom | true ≡ (q ≡ q) | 7 |
| (3.30) | Identity of ∨ | Theorem | p ∨ false ≡ p | 5 |
| (3.31) | Distributivity of ∨ over ∨ | Theorem | p ∨ (q ∨ r) ≡ (p ∨ q) ∨ (p ∨ r) | 5 |
| (3.32) | 原文未命名 | Theorem | p ∨ q ≡ (p ∨ ¬ q ≡ p) | 5 |
| (3.35) | Golden rule | Axiom | p ∧ q ≡ (p ≡ (q ≡ p ∨ q)) | 4 |
| (3.36) | Symmetry of ∧ | Theorem | p ∧ q ≡ q ∧ p | 4 |
| (3.37) | Associativity of ∧ | Theorem | (p ∧ q) ∧ r ≡ p ∧ (q ∧ r) | 4 |
| (3.38) | Idempotency of ∧ | Theorem | p ∧ p ≡ p | 4 |
| (3.39) | Identity of ∧ | Theorem | p ∧ true ≡ p | 4 |
| (3.4) | 原文未命名 | Theorem | true | 7 |
| (3.40) | Zero of ∧ | Theorem | p ∧ false ≡ false | 4 |
| (3.41) | Distributivity of ∧ over ∧ | Theorem | p ∧ (q ∧ r) ≡ (p ∧ q) ∧ (p ∧ r) | 4 |
| (3.42) | Contradiction | Theorem | p ∧ ¬ p ≡ false | 4 |
| (3.43a) | Absorption | Theorem | p ∧ (p ∨ q) ≡ p | 4 |
| (3.43b) | Absorption | Theorem | p ∨ (p ∧ q) ≡ p | 4 |
| (3.44a) | Absorption | Theorem | p ∧ (¬ p ∨ q) ≡ p ∧ q | 4 |
| (3.44b) | Absorption | Theorem | p ∨ (¬ p ∧ q) ≡ p ∨ q | 4 |
| (3.44c) | Absorption | Theorem | ¬ p ∧ (p ∨ q) ≡ ¬ p ∧ q | 4 |
| (3.44d) | Absorption | Theorem | ¬ p ∨ (p ∧ q) ≡ ¬ p ∨ q | 4 |
| (3.45) | Distributivity of ∨ over ∧ | Theorem | p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r) | 4 |
| (3.46) | Distributivity of ∧ over ∨ | Theorem | p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r) | 4 |
| (3.47a) | De Morgan | Theorem | ¬ (p ∧ q) ≡ ¬ p ∨ ¬ q | 4 |
| (3.47b) | De Morgan | Theorem | ¬ (p ∨ q) ≡ ¬ p ∧ ¬ q | 4 |
| (3.47c) | De Morgan | Theorem | ¬ (¬ p ∧ q) ≡ p ∨ ¬ q | 4 |
| (3.47d) | De Morgan | Theorem | ¬ (¬ p ∨ q) ≡ p ∧ ¬ q | 4 |
| (3.47e) | De Morgan dual of ∧ | Theorem | ¬ (¬ p ∧ ¬ q) ≡ p ∨ q | 4 |
| (3.47f) | De Morgan dual of ∨ | Theorem | ¬ (¬ p ∨ ¬ q) ≡ p ∧ q | 4 |
| (3.48) | 原文未命名 | Theorem | p ∧ q ≡ (p ∧ ¬ q ≡ ¬ p) | 4 |
| (3.49) | Semi-distributivity of ∧ over ≡ | Theorem | p ∧ (q ≡ r) ≡ (p ∧ q ≡ (p ∧ r ≡ p)) | 4 |
| (3.5) | Reflexivity of ≡ | Theorem | p ≡ p | 7 |
| (3.50) | Strong modus ponens for ≡ | Theorem | p ∧ (q ≡ p) ≡ p ∧ q | 4 |
| (3.51) | Replacement | Theorem | (p ≡ q) ∧ (r ≡ p) ≡ (p ≡ q) ∧ (r ≡ q) | 4 |
| (3.52) | Alternative definition of ≡ | Theorem | p ≡ (q ≡ (p ∧ q) ∨ (¬ p ∧ ¬ q)) | 4 |
| (3.53) | Exclusive or；别名：Alternative definition of ≢ | Theorem | (p ≢ q) ≡ (¬ p ∧ q) ∨ (p ∧ ¬ q) | 4 |
| (3.55) | 原文未命名 | Theorem | (p ∧ q) ∧ r ≡ (p ≡ (q ≡ (r ≡ (p ∨ q ≡ (q ∨ r ≡ (r ∨ p ≡ p ∨ (q ∨ r))))))) | 4 |
| (3.57) | Definition of ⇒ via ∨；别名：Definition of ⇒ from ∨、Definition of ⇒、Definition of implication | Axiom | p ⇒ q ≡ (p ∨ q ≡ q) | 2 |
| (3.57=) | Implication via ∨ | Lemma | (p ⇒ q) = (p ∨ q ≡ q) | 2 |
| (3.58) | Definition of ⇐；别名：Consequence | Axiom | p ⇐ q ≡ q ⇒ p | 2 |
| (3.59) | Material implication；别名：Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ ¬ p ∨ q | 2 |
| (3.60) | Definition of ⇒ via ∧；别名：Definition of ⇒ from ∧、Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ (p ∧ q ≡ p) | 2 |
| (3.60=) | Implication via ∧ | Lemma | (p ⇒ q) = (p ∧ q ≡ p) | 2 |
| (3.61) | Contrapositive | Theorem | p ⇒ q ≡ ¬ q ⇒ ¬ p | 2 |
| (3.61.1) | ¬-connection for ⇒ | Theorem | p ⇒ ¬ q ≡ q ⇒ ¬ p | 2 |
| (3.61.2) | ¬-connection for ⇒ | Theorem | ¬ p ⇒ q ≡ ¬ q ⇒ p | 2 |
| (3.62) | 原文未命名 | Theorem | p ⇒ (q ≡ r) ≡ (p ∧ q ≡ p ∧ r) | 2 |
| (3.63) | Distributivity of ⇒ over ≡ | Theorem | p ⇒ (q ≡ r) ≡ (p ⇒ q ≡ p ⇒ r) | 2 |
| (3.64) | Self-distributivity of ⇒ | Theorem | p ⇒ (q ⇒ r) ≡ (p ⇒ q) ⇒ (p ⇒ r) | 2 |
| (3.65) | Shunting | Theorem | p ∧ q ⇒ r ≡ p ⇒ (q ⇒ r) | 2 |
| (3.66) | Strong modus ponens | Theorem | p ∧ (p ⇒ q) ≡ p ∧ q | 2 |
| (3.67) | 原文未命名 | Theorem | p ∧ (q ⇒ p) ≡ p | 2 |
| (3.68) | 原文未命名 | Theorem | p ∨ (p ⇒ q) ≡ true | 2 |
| (3.69) | 原文未命名 | Theorem | p ∨ (q ⇒ p) ≡ q ⇒ p | 2 |
| (3.70) | 原文未命名 | Theorem | p ∨ q ⇒ p ∧ q ≡ (p ≡ q) | 2 |
| (3.71) | Reflexivity of ⇒ | Theorem | p ⇒ p | 2 |
| (3.72) | Right-zero of ⇒；别名：ex quodlibet verum | Theorem | p ⇒ true | 2 |
| (3.73) | Left-identity of ⇒ | Theorem | true ⇒ p ≡ p | 2 |
| (3.74) | Definition of ¬ from ⇒ | Theorem | p ⇒ false ≡ ¬ p | 2 |
| (3.75) | ex falso quodlibet | Theorem | false ⇒ p | 2 |
| (3.76a) | Weakening；别名：Strengthening | Theorem | p ⇒ p ∨ q | 2 |
| (3.76b) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p | 2 |
| (3.76c) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∨ q | 2 |
| (3.76d) | Weakening；别名：Strengthening | Theorem | p ∨ (q ∧ r) ⇒ p ∨ q | 2 |
| (3.76e) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∧ (q ∨ r) | 2 |
| (3.77) | Modus ponens | Theorem | p ∧ (p ⇒ q) ⇒ q | 2 |
| (3.78) | Case analysis | Theorem | (p ⇒ r) ∧ (q ⇒ r) ≡ p ∨ q ⇒ r | 2 |
| (3.79) | Case analysis | Theorem | (p ⇒ r) ∧ (¬ p ⇒ r) ≡ r | 2 |
| (3.8) | Definition of `false` | Axiom | false ≡ ¬ true | 6 |
| (3.80) | Mutual implication | Theorem | (p ⇒ q) ∧ (q ⇒ p) ≡ (p ≡ q) | 2 |
| (3.80.1) | Reflexivity of ⇒ wrt. ≡；别名：Reflexivity of ⇒ | Theorem | (p ≡ q) ⇒ (p ⇒ q) | 2 |
| (3.81) | Antisymmetry of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ p) ⇒ (p ≡ q) | 2 |
| (3.82.4) | Implication strengthening | Theorem | p ⇒ q ≡ p ⇒ p ∧ q | 2 |
| (3.82.5) | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 2 |
| (3.82a) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 2 |
| (3.82b) | Transitivity of ⇒ | Theorem | (p ≡ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 2 |
| (3.82c) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ≡ r) ⇒ (p ⇒ r) | 2 |
| (3.83) | Leibniz | Axiom | e = f ⇒ E[z ≔ e] = E[z ≔ f] | 1 |
| (3.83.1) | Leibniz | Corollary | d = e ⇒ f d = f e | 1 |
| (3.83.2) | Leibniz | Corollary | d = e ⇒ (p d ≡ p e) | 1 |
| (3.83.3) | Leibniz | Corollary | (d ≡ e) ⇒ (p d ≡ p e) | 1 |
| (3.83.4) | Leibniz | Corollary | (d ≡ e) ⇒ f d = f e | 1 |
| (3.84a) | Replacement | Theorem | e = f ∧ E[z ≔ e] ≡ e = f ∧ E[z ≔ f] | 1 |
| (3.84a≡) | Replacement | Theorem | (e ≡ f) ∧ E[z ≔ e] ≡ (e ≡ f) ∧ E[z ≔ f] | 1 |
| (3.84b) | Replacement | Theorem | e = f ⇒ E[z ≔ e] ≡ e = f ⇒ E[z ≔ f] | 1 |
| (3.84b≡) | Replacement | Theorem | (e ≡ f) ⇒ E[z ≔ e] ≡ (e ≡ f) ⇒ E[z ≔ f] | 1 |
| (3.84c) | Replacement | Theorem | q ∧ (e ≡ f) ⇒ E[z ≔ e] ≡ q ∧ (e ≡ f) ⇒ E[z ≔ f] | 1 |
| (3.84c) | Replacement | Theorem | q ∧ e = f ⇒ E[z ≔ e] ≡ q ∧ e = f ⇒ E[z ≔ f] | 1 |
| (3.85a) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] ≡ p ⇒ E[z ≔ true] | 1 |
| (3.85b) | Replace by `true` | Theorem | q ∧ p ⇒ E[z ≔ p] ≡ q ∧ p ⇒ E[z ≔ true] | 1 |
| (3.85c) | Replace by `false` | Theorem | ¬ p ⇒ E[z ≔ p] ≡ ¬ p ⇒ E[z ≔ false] | 1 |
| (3.85d) | Replace by `false` | Theorem | q ∧ ¬ p ⇒ E[z ≔ p] ≡ q ∧ ¬ p ⇒ E[z ≔ false] | 1 |
| (3.85e) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] = E[z ≔ true] | 1 |
| (3.86a) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ≡ E[z ≔ false] ⇒ p | 1 |
| (3.86b) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ∨ q ≡ E[z ≔ false] ⇒ p ∨ q | 1 |
| (3.87) | Replace by `true` | Theorem | p ∧ E[z ≔ p] ≡ p ∧ E[z ≔ true] | 1 |
| (3.87.1) | Abbreviated replace by `false` | Theorem | ¬ p ∧ E ≡ ¬ p ∧ E[p ≔ false] | 1 |
| (3.87.1) | Abbreviated replace by `true` | Theorem | p ∧ E ≡ p ∧ E[p ≔ true] | 1 |
| (3.88) | Replace by `false` | Theorem | p ∨ E[z ≔ p] ≡ p ∨ E[z ≔ false] | 1 |
| (3.89) | Shannon | Theorem | E[z ≔ p] ≡ (p ∧ E[z ≔ true]) ∨ (¬ p ∧ E[z ≔ false]) | 1 |
| (3.9) | Commutativity of ¬ with ≡ | Axiom | ¬ (p ≡ q) ≡ (¬ p ≡ q) | 6 |
| 未编号 · 0102c0 | Identity of ≢ | Theorem | (p ≢ false) ≡ p | 6 |
| 未编号 · 15c06f | Transitivity of = | Theorem | e = f ∧ f = g ⇒ e = g | 1 |
| 未编号 · 24a375 | Definition of ≡ | Axiom | (p ≡ q) = (p = q) | 7 |
| 未编号 · 2b72bc | Definition of ∧ | Lemma | (p ∧ q) = (p ≡ (q ≡ p ∨ q)) | 4 |
| 未编号 · 5aae8c | Definition of ≠ | Theorem | x ≠ y ≡ (x = y ≡ false) | 1 |
| 未编号 · 5f6c2d | Symmetry of ≠ | Theorem | x ≠ y ≡ y ≠ x | 1 |
| 未编号 · 648d61 | Assignment | Axiom | P[x ≔ E] ⇒⁅ (x := E) ⁆ P | 2 |
| 未编号 · 86a35c | Abbreviated replacement in ∧；别名：Abbreviated replacement | Theorem | P ∧ x = E ≡ P[x ≔ E] ∧ x = E | 1 |
| 未编号 · 957cfc | Sequence | Primitive inference rule | P ⇒⁅ C₁ ⁆ Q , Q ⇒⁅ C₂ ⁆ R ⊦ P ⇒⁅ (C₁ ⍮ C₂) ⁆ R | 2 |
| 未编号 · 9cd73a | Definition of ≠ | Axiom | x ≠ y ≡ ¬ (x = y) | 1 |
| 未编号 · a3c539 | Associativity of ∧ | Axiom | (p ∧ q) ∧ r ≡ p ∧ (q ∧ r) | 1 |
| 未编号 · b77dec | Abbreviated replacement in ⇒；别名：Abbreviated replacement | Theorem | x = E ⇒ P ≡ x = E ⇒ P[x ≔ E] | 1 |
| 未编号 · bb97a0 | Negation of ≠ | Theorem | ¬ (x ≠ y) ≡ x = y | 1 |
| 未编号 · e18e5f | Irreflexivity of ≠ | Theorem | x ≠ x ≡ false | 1 |
| 未编号 · f1d779 | Cancellation of ¬ | Theorem | (¬ p ≡ ¬ q) = (p ≡ q) | 6 |
| 未编号 · f40d7f | Symmetry of ∧ | Axiom | p ∧ q ≡ q ∧ p | 1 |
| 未编号 · f695b0 | Associativity of ⍮ | Axiom | ((S₁ ⍮ S₂) ⍮ S₃) = (S₁ ⍮ (S₂ ⍮ S₃)) | 2 |
| 未编号 · f93139 | Irreflexivity of ≠ | Theorem | ¬ (x ≠ x) | 1 |

## 2025 · Week 3

对应 notebook：[2025i Exercise 3.1: Leibniz as Axiom, Replacement · 预载列表](http://130.113.68.214:15024/), [2025i Exercise 3.2: Natural Numbers and Induction: Addition and Multiplication · 预载列表](http://130.113.68.214:15025/), [2025i Exercise 3.3: Monus Subtraction · 预载列表](http://130.113.68.214:15026/), [HW05 · CalcCheck preloaded theorem list](http://130.113.68.214:15019/), [HW07 · CalcCheck preloaded theorem list](http://130.113.68.214:15023/)

| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |
|---|---|---|---|---:|
| (1.2) | Reflexivity of = | Axiom | x = x | 8 |
| (1.3) | Symmetry of = | Axiom | (x = y) = (y = x) | 8 |
| (1.4) | Transitivity of = | Derived inference rule | X = Y , Y = Z ⊦ X = Z | 8 |
| (1.5) | Leibniz | Derived inference rule | X = Y ⊦ E[z ≔ X] = E[z ≔ Y] | 8 |
| (15.13) | Unary minus | Axiom | a + - a = 0 | 2 |
| (15.14) | Subtraction | Axiom | a - b = a + - b | 2 |
| (15.17) | Self-inverse of unary minus | Theorem | - (- a) = a | 2 |
| (15.18) | Fixpoint of unary minus | Theorem | - 0 = 0 | 2 |
| (15.19) | Distributivity of unary minus over + | Theorem | - (a + b) = - a + - b | 2 |
| (15.1a) | Associativity of + | Axiom | (a + b) + c = a + (b + c) | 2 |
| (15.1b) | Associativity of · | Axiom | (a · b) · c = a · (b · c) | 2 |
| (15.20) | Negation as multiplication | Theorem | - a = - 1 · a | 2 |
| (15.21) | 原文未命名 | Theorem | - a · b = a · - b | 2 |
| (15.22) | Commutativity of unary minus with · | Theorem | a · - b = - (a · b) | 2 |
| (15.23) | 原文未命名 | Theorem | - a · - b = a · b | 2 |
| (15.24) | Right-identity of - | Theorem | a - 0 = a | 2 |
| (15.24a) | Subtraction of subtraction | Theorem | a - (b - c) = (a - b) + c | 2 |
| (15.25) | 原文未命名 | Theorem | (a - b) + (c - d) = (a + c) - (b + d) | 2 |
| (15.25a) | Mutual associativity of + and - | Theorem | a + (b - c) = (a + b) - c | 2 |
| (15.25b) | Subtraction of addition | Theorem | a - (b + c) = (a - b) - c | 2 |
| (15.25c) | Cancellation across added subtractions | Theorem | (a - b) + (b - c) = a - c | 2 |
| (15.26) | 原文未命名 | Theorem | (a - b) - (c - d) = (a + d) - (b + c) | 2 |
| (15.27) | 原文未命名 | Theorem | (a - b) · (c - d) = (a · c + b · d) - (a · d + b · c) | 2 |
| (15.29) | Distributivity of · over - | Theorem | (a - b) · c = a · c - b · c | 2 |
| (15.2a) | Symmetry of + | Axiom | a + b = b + a | 2 |
| (15.2b) | Symmetry of · | Axiom | a · b = b · a | 2 |
| (15.3) | Additive identity；别名：Identity of + | Axiom | 0 + a = a | 2 |
| (15.4) | Multiplicative identity；别名：Identity of · | Axiom | 1 · a = a | 2 |
| (15.5) | Distributivity of · over + | Axiom | a · (b + c) = a · b + a · c | 2 |
| (15.7) | Cancellation of · | Axiom | c ≠ 0 ⇒ (c · a = c · b ≡ a = b) | 2 |
| (15.8) | Cancellation of + | Axiom | a + b = a + c ≡ b = c | 2 |
| (15.9) | Zero of · | Axiom | a · 0 = 0 | 2 |
| (3.1) | Associativity of ≡ | Axiom | ((p ≡ q) ≡ r) ≡ (p ≡ (q ≡ r)) | 2 |
| (3.10) | Definition of ≢ | Axiom | (p ≢ q) ≡ ¬ (p ≡ q) | 2 |
| (3.11) | ¬ connection | Theorem | ¬ p ≡ (q ≡ (p ≡ ¬ q)) | 2 |
| (3.12) | Double negation | Theorem | ¬ (¬ p) ≡ p | 2 |
| (3.13) | Negation of `false` | Theorem | ¬ false ≡ true | 2 |
| (3.14) | 原文未命名 | Theorem | (p ≢ q) ≡ (¬ p ≡ q) | 2 |
| (3.15) | Definition of ¬ from ≡ | Theorem | ¬ p ≡ (p ≡ false) | 2 |
| (3.16) | Symmetry of ≢ | Theorem | (p ≢ q) ≡ (q ≢ p) | 2 |
| (3.17) | Associativity of ≢ | Theorem | ((p ≢ q) ≢ r) ≡ (p ≢ (q ≢ r)) | 2 |
| (3.18) | Mutual associativity of ≡ with ≢ | Theorem | ((p ≢ q) ≡ r) ≡ (p ≢ (q ≡ r)) | 2 |
| (3.19) | Mutual interchangeability of ≡ with ≢ | Theorem | (p ≢ (q ≡ r)) ≡ (p ≡ (q ≢ r)) | 2 |
| (3.2) | Symmetry of ≡ | Axiom | (p ≡ q) ≡ (q ≡ p) | 2 |
| (3.24) | Symmetry of ∨ | Axiom | p ∨ q ≡ q ∨ p | 2 |
| (3.25) | Associativity of ∨ | Axiom | (p ∨ q) ∨ r ≡ p ∨ (q ∨ r) | 2 |
| (3.26) | Idempotency of ∨ | Axiom | p ∨ p ≡ p | 2 |
| (3.27) | Distributivity of ∨ over ≡ | Axiom | p ∨ (q ≡ r) ≡ (p ∨ q ≡ p ∨ r) | 2 |
| (3.28) | Excluded middle；别名：LEM | Axiom | p ∨ ¬ p | 2 |
| (3.29) | Zero of ∨ | Theorem | p ∨ true ≡ true | 2 |
| (3.3) | Identity of ≡ | Axiom | true ≡ (q ≡ q) | 2 |
| (3.30) | Identity of ∨ | Theorem | p ∨ false ≡ p | 2 |
| (3.31) | Distributivity of ∨ over ∨ | Theorem | p ∨ (q ∨ r) ≡ (p ∨ q) ∨ (p ∨ r) | 2 |
| (3.32) | 原文未命名 | Theorem | p ∨ q ≡ (p ∨ ¬ q ≡ p) | 2 |
| (3.35) | Golden rule | Axiom | p ∧ q ≡ (p ≡ (q ≡ p ∨ q)) | 2 |
| (3.36) | Symmetry of ∧ | Theorem | p ∧ q ≡ q ∧ p | 2 |
| (3.37) | Associativity of ∧ | Theorem | (p ∧ q) ∧ r ≡ p ∧ (q ∧ r) | 2 |
| (3.38) | Idempotency of ∧ | Theorem | p ∧ p ≡ p | 2 |
| (3.39) | Identity of ∧ | Theorem | p ∧ true ≡ p | 2 |
| (3.4) | 原文未命名 | Theorem | true | 2 |
| (3.40) | Zero of ∧ | Theorem | p ∧ false ≡ false | 2 |
| (3.41) | Distributivity of ∧ over ∧ | Theorem | p ∧ (q ∧ r) ≡ (p ∧ q) ∧ (p ∧ r) | 2 |
| (3.42) | Contradiction | Theorem | p ∧ ¬ p ≡ false | 2 |
| (3.43a) | Absorption | Theorem | p ∧ (p ∨ q) ≡ p | 2 |
| (3.43b) | Absorption | Theorem | p ∨ (p ∧ q) ≡ p | 2 |
| (3.44a) | Absorption | Theorem | p ∧ (¬ p ∨ q) ≡ p ∧ q | 2 |
| (3.44b) | Absorption | Theorem | p ∨ (¬ p ∧ q) ≡ p ∨ q | 2 |
| (3.44c) | Absorption | Theorem | ¬ p ∧ (p ∨ q) ≡ ¬ p ∧ q | 2 |
| (3.44d) | Absorption | Theorem | ¬ p ∨ (p ∧ q) ≡ ¬ p ∨ q | 2 |
| (3.45) | Distributivity of ∨ over ∧ | Theorem | p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r) | 2 |
| (3.46) | Distributivity of ∧ over ∨ | Theorem | p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r) | 2 |
| (3.47a) | De Morgan | Theorem | ¬ (p ∧ q) ≡ ¬ p ∨ ¬ q | 2 |
| (3.47b) | De Morgan | Theorem | ¬ (p ∨ q) ≡ ¬ p ∧ ¬ q | 2 |
| (3.47c) | De Morgan | Theorem | ¬ (¬ p ∧ q) ≡ p ∨ ¬ q | 2 |
| (3.47d) | De Morgan | Theorem | ¬ (¬ p ∨ q) ≡ p ∧ ¬ q | 2 |
| (3.47e) | De Morgan dual of ∧ | Theorem | ¬ (¬ p ∧ ¬ q) ≡ p ∨ q | 2 |
| (3.47f) | De Morgan dual of ∨ | Theorem | ¬ (¬ p ∨ ¬ q) ≡ p ∧ q | 2 |
| (3.48) | 原文未命名 | Theorem | p ∧ q ≡ (p ∧ ¬ q ≡ ¬ p) | 2 |
| (3.49) | Semi-distributivity of ∧ over ≡ | Theorem | p ∧ (q ≡ r) ≡ (p ∧ q ≡ (p ∧ r ≡ p)) | 2 |
| (3.5) | Reflexivity of ≡ | Theorem | p ≡ p | 2 |
| (3.50) | Strong modus ponens for ≡ | Theorem | p ∧ (q ≡ p) ≡ p ∧ q | 2 |
| (3.51) | Replacement | Theorem | (p ≡ q) ∧ (r ≡ p) ≡ (p ≡ q) ∧ (r ≡ q) | 2 |
| (3.52) | Alternative definition of ≡ | Theorem | p ≡ (q ≡ (p ∧ q) ∨ (¬ p ∧ ¬ q)) | 2 |
| (3.53) | Exclusive or；别名：Alternative definition of ≢ | Theorem | (p ≢ q) ≡ (¬ p ∧ q) ∨ (p ∧ ¬ q) | 2 |
| (3.55) | 原文未命名 | Theorem | (p ∧ q) ∧ r ≡ (p ≡ (q ≡ (r ≡ (p ∨ q ≡ (q ∨ r ≡ (r ∨ p ≡ p ∨ (q ∨ r))))))) | 2 |
| (3.57) | Definition of ⇒ via ∨；别名：Definition of ⇒ from ∨、Definition of ⇒、Definition of implication | Axiom | p ⇒ q ≡ (p ∨ q ≡ q) | 2 |
| (3.57=) | Implication via ∨ | Lemma | (p ⇒ q) = (p ∨ q ≡ q) | 2 |
| (3.58) | Definition of ⇐；别名：Consequence | Axiom | p ⇐ q ≡ q ⇒ p | 2 |
| (3.59) | Material implication；别名：Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ ¬ p ∨ q | 2 |
| (3.60) | Definition of ⇒ via ∧；别名：Definition of ⇒ from ∧、Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ (p ∧ q ≡ p) | 2 |
| (3.60=) | Implication via ∧ | Lemma | (p ⇒ q) = (p ∧ q ≡ p) | 2 |
| (3.61) | Contrapositive | Theorem | p ⇒ q ≡ ¬ q ⇒ ¬ p | 2 |
| (3.61.1) | ¬-connection for ⇒ | Theorem | p ⇒ ¬ q ≡ q ⇒ ¬ p | 2 |
| (3.61.2) | ¬-connection for ⇒ | Theorem | ¬ p ⇒ q ≡ ¬ q ⇒ p | 2 |
| (3.62) | 原文未命名 | Theorem | p ⇒ (q ≡ r) ≡ (p ∧ q ≡ p ∧ r) | 2 |
| (3.63) | Distributivity of ⇒ over ≡ | Theorem | p ⇒ (q ≡ r) ≡ (p ⇒ q ≡ p ⇒ r) | 2 |
| (3.64) | Self-distributivity of ⇒ | Theorem | p ⇒ (q ⇒ r) ≡ (p ⇒ q) ⇒ (p ⇒ r) | 2 |
| (3.65) | Shunting | Theorem | p ∧ q ⇒ r ≡ p ⇒ (q ⇒ r) | 2 |
| (3.66) | Strong modus ponens | Theorem | p ∧ (p ⇒ q) ≡ p ∧ q | 2 |
| (3.67) | 原文未命名 | Theorem | p ∧ (q ⇒ p) ≡ p | 2 |
| (3.68) | 原文未命名 | Theorem | p ∨ (p ⇒ q) ≡ true | 2 |
| (3.69) | 原文未命名 | Theorem | p ∨ (q ⇒ p) ≡ q ⇒ p | 2 |
| (3.70) | 原文未命名 | Theorem | p ∨ q ⇒ p ∧ q ≡ (p ≡ q) | 2 |
| (3.71) | Reflexivity of ⇒ | Theorem | p ⇒ p | 2 |
| (3.72) | Right-zero of ⇒；别名：ex quodlibet verum | Theorem | p ⇒ true | 2 |
| (3.73) | Left-identity of ⇒ | Theorem | true ⇒ p ≡ p | 2 |
| (3.74) | Definition of ¬ from ⇒ | Theorem | p ⇒ false ≡ ¬ p | 2 |
| (3.75) | ex falso quodlibet | Theorem | false ⇒ p | 2 |
| (3.76a) | Weakening；别名：Strengthening | Theorem | p ⇒ p ∨ q | 2 |
| (3.76b) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p | 2 |
| (3.76c) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∨ q | 2 |
| (3.76d) | Weakening；别名：Strengthening | Theorem | p ∨ (q ∧ r) ⇒ p ∨ q | 2 |
| (3.76e) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∧ (q ∨ r) | 2 |
| (3.77) | Modus ponens | Theorem | p ∧ (p ⇒ q) ⇒ q | 2 |
| (3.78) | Case analysis | Theorem | (p ⇒ r) ∧ (q ⇒ r) ≡ p ∨ q ⇒ r | 2 |
| (3.79) | Case analysis | Theorem | (p ⇒ r) ∧ (¬ p ⇒ r) ≡ r | 2 |
| (3.8) | Definition of `false` | Axiom | false ≡ ¬ true | 2 |
| (3.80) | Mutual implication | Theorem | (p ⇒ q) ∧ (q ⇒ p) ≡ (p ≡ q) | 2 |
| (3.80.1) | Reflexivity of ⇒ wrt. ≡；别名：Reflexivity of ⇒ | Theorem | (p ≡ q) ⇒ (p ⇒ q) | 2 |
| (3.81) | Antisymmetry of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ p) ⇒ (p ≡ q) | 2 |
| (3.82.4) | Implication strengthening | Theorem | p ⇒ q ≡ p ⇒ p ∧ q | 2 |
| (3.82.5) | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 2 |
| (3.82a) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 2 |
| (3.82b) | Transitivity of ⇒ | Theorem | (p ≡ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 2 |
| (3.82c) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ≡ r) ⇒ (p ⇒ r) | 2 |
| (3.9) | Commutativity of ¬ with ≡ | Axiom | ¬ (p ≡ q) ≡ (¬ p ≡ q) | 2 |
| 未编号 · 0102c0 | Identity of ≢ | Theorem | (p ≢ false) ≡ p | 2 |
| 未编号 · 03c7aa | Associativity of + | Theorem | (a + b) + c = a + (b + c) | 1 |
| 未编号 · 05e01d | Associativity of · | Theorem | (k · m) · n = k · (m · n) | 1 |
| 未编号 · 24a375 | Definition of ≡ | Axiom | (p ≡ q) = (p = q) | 2 |
| 未编号 · 2b72bc | Definition of ∧ | Lemma | (p ∧ q) = (p ≡ (q ≡ p ∨ q)) | 2 |
| 未编号 · 42cf57 | Left-identity of · | Theorem | 1 · n = n | 1 |
| 未编号 · 5aae8c | Definition of ≠ | Theorem | x ≠ y ≡ (x = y ≡ false) | 1 |
| 未编号 · 5f6c2d | Symmetry of ≠ | Theorem | x ≠ y ≡ y ≠ x | 1 |
| 未编号 · 63a396 | Definition of + for `suc` | Axiom | suc m + n = suc (m + n) | 2 |
| 未编号 · 664fa2 | Multiplying the successor | Theorem | m · suc n = m + m · n | 1 |
| 未编号 · 667d5b | Shifting `suc` over + | Theorem | suc m + n = m + suc n | 2 |
| 未编号 · 794d96 | Definition of `double` | Axiom | double 0 = 0 | 2 |
| 未编号 · 79adc5 | Right-zero of · | Theorem | m · 0 = 0 | 1 |
| 未编号 · 81f366 | Definition of + for 0；别名：Left-identity of + | Axiom | 0 + n = n | 2 |
| 未编号 · 8a20aa | Definition of · for 0 | Axiom | 0 · n = 0 | 1 |
| 未编号 · 9cd73a | Definition of ≠ | Axiom | x ≠ y ≡ ¬ (x = y) | 1 |
| 未编号 · b5dc15 | Distributivity of · over + | Theorem | (k + m) · n = k · n + m · n | 1 |
| 未编号 · bac8f9 | Right-identity of + | Theorem | m + 0 = m | 2 |
| 未编号 · bb97a0 | Negation of ≠ | Theorem | ¬ (x ≠ y) ≡ x = y | 1 |
| 未编号 · c5667b | Definition of `double` | Axiom | double (suc n) = 2 + double n | 2 |
| 未编号 · cab2ec | Doubling | Theorem | double n = n + n | 2 |
| 未编号 · d0a211 | Definition of · for `suc` | Axiom | suc m · n = n + m · n | 1 |
| 未编号 · e18e5f | Irreflexivity of ≠ | Theorem | x ≠ x ≡ false | 1 |
| 未编号 · e44908 | Successor | Theorem | suc n = n + 1 | 1 |
| 未编号 · ef374b | Symmetry of · | Theorem | m · n = n · m | 1 |
| 未编号 · efb2f4 | Symmetry of + | Theorem | m + n = n + m | 2 |
| 未编号 · f1d779 | Cancellation of ¬ | Theorem | (¬ p ≡ ¬ q) = (p ≡ q) | 2 |
| 未编号 · f93139 | Irreflexivity of ≠ | Theorem | ¬ (x ≠ x) | 1 |

## 2025 · Week 4

对应 notebook：[2025i Exercise 4.1: Calculations with Monotonicity and Antitonicity · 预载列表](http://130.113.68.214:15029/), [2025i Exercise 4.2: Positivity · 预载列表](http://130.113.68.214:15031/), [2025i Exercise 4.3: Partial Solutions to Exercise 4.2: Positivity · 预载列表](http://130.113.68.214:15032/), [2025i Exercise 4.4: Order on Integers · 预载列表](http://130.113.68.214:15033/), [HW08 · CalcCheck preloaded theorem list](http://130.113.68.214:15027/)

| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |
|---|---|---|---|---:|
| (1.2) | Reflexivity of = | Axiom | x = x | 5 |
| (1.3) | Symmetry of = | Axiom | (x = y) = (y = x) | 5 |
| (1.4) | Transitivity of = | Derived inference rule | X = Y , Y = Z ⊦ X = Z | 5 |
| (1.5) | Leibniz | Derived inference rule | X = Y ⊦ E[z ≔ X] = E[z ≔ Y] | 5 |
| (15.13) | Unary minus | Axiom | a + - a = 0 | 5 |
| (15.14) | Subtraction | Axiom | a - b = a + - b | 5 |
| (15.17) | Self-inverse of unary minus | Theorem | - (- a) = a | 5 |
| (15.18) | Fixpoint of unary minus | Theorem | - 0 = 0 | 5 |
| (15.19) | Distributivity of unary minus over + | Theorem | - (a + b) = - a + - b | 5 |
| (15.1a) | Associativity of + | Axiom | (a + b) + c = a + (b + c) | 5 |
| (15.1b) | Associativity of · | Axiom | (a · b) · c = a · (b · c) | 5 |
| (15.20) | Negation as multiplication | Theorem | - a = - 1 · a | 5 |
| (15.21) | 原文未命名 | Theorem | - a · b = a · - b | 5 |
| (15.22) | Commutativity of unary minus with · | Theorem | a · - b = - (a · b) | 5 |
| (15.22b) | 原文未命名 | Theorem | - a · b = - (a · b) | 2 |
| (15.23) | 原文未命名 | Theorem | - a · - b = a · b | 5 |
| (15.24) | Right-identity of - | Theorem | a - 0 = a | 5 |
| (15.24a) | Subtraction of subtraction | Theorem | a - (b - c) = (a - b) + c | 3 |
| (15.25) | 原文未命名 | Theorem | (a - b) + (c - d) = (a + c) - (b + d) | 5 |
| (15.25a) | Mutual associativity of + and - | Theorem | a + (b - c) = (a + b) - c | 5 |
| (15.25b) | Subtraction of addition | Theorem | a - (b + c) = (a - b) - c | 5 |
| (15.25c) | Cancellation across added subtractions | Theorem | (a - b) + (b - c) = a - c | 5 |
| (15.26) | 原文未命名 | Theorem | (a - b) - (c - d) = (a + d) - (b + c) | 5 |
| (15.27) | 原文未命名 | Theorem | (a - b) · (c - d) = (a · c + b · d) - (a · d + b · c) | 5 |
| (15.29) | Distributivity of · over - | Theorem | (a - b) · c = a · c - b · c | 3 |
| (15.29a) | Distributivity of · over - | Theorem | (a - b) · c = a · c - b · c | 2 |
| (15.29b) | Distributivity of · over - | Theorem | c · (a - b) = c · a - c · b | 2 |
| (15.2a) | Symmetry of + | Axiom | a + b = b + a | 5 |
| (15.2b) | Symmetry of · | Axiom | a · b = b · a | 5 |
| (15.3) | Additive identity；别名：Identity of + | Axiom | 0 + a = a | 3 |
| (15.30) | Positivity under + | Axiom | pos a ∧ pos b ⇒ pos (a + b) | 1 |
| (15.30a) | Positivity under + | Theorem | pos a ⇒ (pos b ⇒ pos (a + b)) | 1 |
| (15.31) | Positivity under · | Axiom | pos a ∧ pos b ⇒ pos (a · b) | 1 |
| (15.31a) | Positivity under · | Theorem | pos a ⇒ (pos b ⇒ pos (a · b)) | 1 |
| (15.32) | Non-positivity of 0 | Axiom | ¬ pos 0 | 1 |
| (15.33) | Positivity under unary minus | Axiom | b ≠ 0 ⇒ (pos b ≡ ¬ pos (- b)) | 1 |
| (15.33a) | Positivity under unary minus | Theorem | b ≠ 0 ⇒ (pos b ≢ pos (- b)) | 1 |
| (15.33b) | Positivity under unary minus | Theorem | b ≠ 0 ⇒ (pos (- b) ≡ ¬ pos b) | 1 |
| (15.33c) | Positivity under unary minus | Theorem | (pos (- b) ≡ pos b) ⇒ b = 0 | 1 |
| (15.34) | Positivity of squares | Theorem | b ≠ 0 ⇒ pos (b · b) | 1 |
| (15.35) | Positivity under positive · | Theorem | pos a ⇒ (pos b ≡ pos (a · b)) | 1 |
| (15.3a) | Additive identity；别名：Identity of + | Axiom | 0 + a = a | 2 |
| (15.3b) | Additive identity；别名：Identity of + | Axiom | a + 0 = a | 2 |
| (15.4) | Multiplicative identity；别名：Identity of · | Axiom | 1 · a = a | 3 |
| (15.4a) | Multiplicative identity；别名：Identity of · | Axiom | 1 · a = a | 2 |
| (15.4b) | Multiplicative identity；别名：Identity of · | Axiom | a · 1 = a | 2 |
| (15.5) | Distributivity of · over + | Axiom | a · (b + c) = a · b + a · c | 3 |
| (15.5a) | Distributivity of · over + | Axiom | a · (b + c) = a · b + a · c | 2 |
| (15.5b) | Distributivity of · over + | Axiom | (b + c) · a = b · a + c · a | 2 |
| (15.7) | Cancellation of · | Axiom | c ≠ 0 ⇒ (c · a = c · b ≡ a = b) | 1 |
| (15.8) | Cancellation of + | Axiom | a + b = a + c ≡ b = c | 1 |
| (15.9) | Zero of · | Axiom | a · 0 = 0 | 5 |
| (3.1) | Associativity of ≡ | Axiom | ((p ≡ q) ≡ r) ≡ (p ≡ (q ≡ r)) | 5 |
| (3.10) | Definition of ≢ | Axiom | (p ≢ q) ≡ ¬ (p ≡ q) | 5 |
| (3.11) | ¬ connection | Theorem | ¬ p ≡ (q ≡ (p ≡ ¬ q)) | 5 |
| (3.12) | Double negation | Theorem | ¬ (¬ p) ≡ p | 5 |
| (3.13) | Negation of `false` | Theorem | ¬ false ≡ true | 5 |
| (3.14) | 原文未命名 | Theorem | (p ≢ q) ≡ (¬ p ≡ q) | 5 |
| (3.15) | Definition of ¬ from ≡ | Theorem | ¬ p ≡ (p ≡ false) | 5 |
| (3.16) | Symmetry of ≢ | Theorem | (p ≢ q) ≡ (q ≢ p) | 5 |
| (3.17) | Associativity of ≢ | Theorem | ((p ≢ q) ≢ r) ≡ (p ≢ (q ≢ r)) | 5 |
| (3.18) | Mutual associativity of ≡ with ≢ | Theorem | ((p ≢ q) ≡ r) ≡ (p ≢ (q ≡ r)) | 5 |
| (3.19) | Mutual interchangeability of ≡ with ≢ | Theorem | (p ≢ (q ≡ r)) ≡ (p ≡ (q ≢ r)) | 5 |
| (3.2) | Symmetry of ≡ | Axiom | (p ≡ q) ≡ (q ≡ p) | 5 |
| (3.24) | Symmetry of ∨ | Axiom | p ∨ q ≡ q ∨ p | 5 |
| (3.25) | Associativity of ∨ | Axiom | (p ∨ q) ∨ r ≡ p ∨ (q ∨ r) | 5 |
| (3.26) | Idempotency of ∨ | Axiom | p ∨ p ≡ p | 5 |
| (3.27) | Distributivity of ∨ over ≡ | Axiom | p ∨ (q ≡ r) ≡ (p ∨ q ≡ p ∨ r) | 5 |
| (3.28) | Excluded middle；别名：LEM | Axiom | p ∨ ¬ p | 5 |
| (3.29) | Zero of ∨ | Theorem | p ∨ true ≡ true | 5 |
| (3.3) | Identity of ≡ | Axiom | true ≡ (q ≡ q) | 5 |
| (3.30) | Identity of ∨ | Theorem | p ∨ false ≡ p | 5 |
| (3.31) | Distributivity of ∨ over ∨ | Theorem | p ∨ (q ∨ r) ≡ (p ∨ q) ∨ (p ∨ r) | 5 |
| (3.32) | 原文未命名 | Theorem | p ∨ q ≡ (p ∨ ¬ q ≡ p) | 5 |
| (3.35) | Golden rule | Axiom | p ∧ q ≡ (p ≡ (q ≡ p ∨ q)) | 5 |
| (3.36) | Symmetry of ∧ | Theorem | p ∧ q ≡ q ∧ p | 5 |
| (3.37) | Associativity of ∧ | Theorem | (p ∧ q) ∧ r ≡ p ∧ (q ∧ r) | 5 |
| (3.38) | Idempotency of ∧ | Theorem | p ∧ p ≡ p | 5 |
| (3.39) | Identity of ∧ | Theorem | p ∧ true ≡ p | 5 |
| (3.4) | 原文未命名 | Theorem | true | 5 |
| (3.40) | Zero of ∧ | Theorem | p ∧ false ≡ false | 5 |
| (3.41) | Distributivity of ∧ over ∧ | Theorem | p ∧ (q ∧ r) ≡ (p ∧ q) ∧ (p ∧ r) | 5 |
| (3.42) | Contradiction | Theorem | p ∧ ¬ p ≡ false | 5 |
| (3.43a) | Absorption | Theorem | p ∧ (p ∨ q) ≡ p | 5 |
| (3.43b) | Absorption | Theorem | p ∨ (p ∧ q) ≡ p | 5 |
| (3.44a) | Absorption | Theorem | p ∧ (¬ p ∨ q) ≡ p ∧ q | 5 |
| (3.44b) | Absorption | Theorem | p ∨ (¬ p ∧ q) ≡ p ∨ q | 5 |
| (3.44c) | Absorption | Theorem | ¬ p ∧ (p ∨ q) ≡ ¬ p ∧ q | 5 |
| (3.44d) | Absorption | Theorem | ¬ p ∨ (p ∧ q) ≡ ¬ p ∨ q | 5 |
| (3.45) | Distributivity of ∨ over ∧ | Theorem | p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r) | 5 |
| (3.46) | Distributivity of ∧ over ∨ | Theorem | p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r) | 5 |
| (3.47a) | De Morgan | Theorem | ¬ (p ∧ q) ≡ ¬ p ∨ ¬ q | 5 |
| (3.47b) | De Morgan | Theorem | ¬ (p ∨ q) ≡ ¬ p ∧ ¬ q | 5 |
| (3.47c) | De Morgan | Theorem | ¬ (¬ p ∧ q) ≡ p ∨ ¬ q | 5 |
| (3.47d) | De Morgan | Theorem | ¬ (¬ p ∨ q) ≡ p ∧ ¬ q | 5 |
| (3.47e) | De Morgan dual of ∧ | Theorem | ¬ (¬ p ∧ ¬ q) ≡ p ∨ q | 5 |
| (3.47f) | De Morgan dual of ∨ | Theorem | ¬ (¬ p ∨ ¬ q) ≡ p ∧ q | 5 |
| (3.48) | 原文未命名 | Theorem | p ∧ q ≡ (p ∧ ¬ q ≡ ¬ p) | 5 |
| (3.49) | Semi-distributivity of ∧ over ≡ | Theorem | p ∧ (q ≡ r) ≡ (p ∧ q ≡ (p ∧ r ≡ p)) | 5 |
| (3.5) | Reflexivity of ≡ | Theorem | p ≡ p | 5 |
| (3.50) | Strong modus ponens for ≡ | Theorem | p ∧ (q ≡ p) ≡ p ∧ q | 5 |
| (3.51) | Replacement | Theorem | (p ≡ q) ∧ (r ≡ p) ≡ (p ≡ q) ∧ (r ≡ q) | 5 |
| (3.52) | Alternative definition of ≡ | Theorem | p ≡ (q ≡ (p ∧ q) ∨ (¬ p ∧ ¬ q)) | 5 |
| (3.53) | Exclusive or；别名：Alternative definition of ≢ | Theorem | (p ≢ q) ≡ (¬ p ∧ q) ∨ (p ∧ ¬ q) | 5 |
| (3.55) | 原文未命名 | Theorem | (p ∧ q) ∧ r ≡ (p ≡ (q ≡ (r ≡ (p ∨ q ≡ (q ∨ r ≡ (r ∨ p ≡ p ∨ (q ∨ r))))))) | 5 |
| (3.57) | Definition of ⇒ via ∨；别名：Definition of ⇒ from ∨、Definition of ⇒、Definition of implication | Axiom | p ⇒ q ≡ (p ∨ q ≡ q) | 5 |
| (3.57=) | Implication via ∨ | Lemma | (p ⇒ q) = (p ∨ q ≡ q) | 5 |
| (3.58) | Definition of ⇐；别名：Consequence | Axiom | p ⇐ q ≡ q ⇒ p | 5 |
| (3.59) | Material implication；别名：Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ ¬ p ∨ q | 5 |
| (3.60) | Definition of ⇒ via ∧；别名：Definition of ⇒ from ∧、Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ (p ∧ q ≡ p) | 5 |
| (3.60=) | Implication via ∧ | Lemma | (p ⇒ q) = (p ∧ q ≡ p) | 5 |
| (3.61) | Contrapositive | Theorem | p ⇒ q ≡ ¬ q ⇒ ¬ p | 5 |
| (3.61.1) | ¬-connection for ⇒ | Theorem | p ⇒ ¬ q ≡ q ⇒ ¬ p | 5 |
| (3.61.2) | ¬-connection for ⇒ | Theorem | ¬ p ⇒ q ≡ ¬ q ⇒ p | 5 |
| (3.62) | 原文未命名 | Theorem | p ⇒ (q ≡ r) ≡ (p ∧ q ≡ p ∧ r) | 5 |
| (3.63) | Distributivity of ⇒ over ≡ | Theorem | p ⇒ (q ≡ r) ≡ (p ⇒ q ≡ p ⇒ r) | 5 |
| (3.64) | Self-distributivity of ⇒ | Theorem | p ⇒ (q ⇒ r) ≡ (p ⇒ q) ⇒ (p ⇒ r) | 5 |
| (3.65) | Shunting | Theorem | p ∧ q ⇒ r ≡ p ⇒ (q ⇒ r) | 5 |
| (3.66) | Strong modus ponens | Theorem | p ∧ (p ⇒ q) ≡ p ∧ q | 5 |
| (3.67) | 原文未命名 | Theorem | p ∧ (q ⇒ p) ≡ p | 5 |
| (3.68) | 原文未命名 | Theorem | p ∨ (p ⇒ q) ≡ true | 5 |
| (3.69) | 原文未命名 | Theorem | p ∨ (q ⇒ p) ≡ q ⇒ p | 5 |
| (3.70) | 原文未命名 | Theorem | p ∨ q ⇒ p ∧ q ≡ (p ≡ q) | 5 |
| (3.71) | Reflexivity of ⇒ | Theorem | p ⇒ p | 5 |
| (3.72) | Right-zero of ⇒；别名：ex quodlibet verum | Theorem | p ⇒ true | 5 |
| (3.73) | Left-identity of ⇒ | Theorem | true ⇒ p ≡ p | 5 |
| (3.74) | Definition of ¬ from ⇒ | Theorem | p ⇒ false ≡ ¬ p | 5 |
| (3.75) | ex falso quodlibet | Theorem | false ⇒ p | 5 |
| (3.76a) | Weakening；别名：Strengthening | Theorem | p ⇒ p ∨ q | 5 |
| (3.76b) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p | 5 |
| (3.76c) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∨ q | 5 |
| (3.76d) | Weakening；别名：Strengthening | Theorem | p ∨ (q ∧ r) ⇒ p ∨ q | 5 |
| (3.76e) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∧ (q ∨ r) | 5 |
| (3.77) | Modus ponens | Theorem | p ∧ (p ⇒ q) ⇒ q | 5 |
| (3.78) | Case analysis | Theorem | (p ⇒ r) ∧ (q ⇒ r) ≡ p ∨ q ⇒ r | 5 |
| (3.79) | Case analysis | Theorem | (p ⇒ r) ∧ (¬ p ⇒ r) ≡ r | 5 |
| (3.8) | Definition of `false` | Axiom | false ≡ ¬ true | 5 |
| (3.80) | Mutual implication | Theorem | (p ⇒ q) ∧ (q ⇒ p) ≡ (p ≡ q) | 5 |
| (3.80.1) | Reflexivity of ⇒ wrt. ≡；别名：Reflexivity of ⇒ | Theorem | (p ≡ q) ⇒ (p ⇒ q) | 5 |
| (3.81) | Antisymmetry of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ p) ⇒ (p ≡ q) | 5 |
| (3.82.4) | Implication strengthening | Theorem | p ⇒ q ≡ p ⇒ p ∧ q | 5 |
| (3.82.5) | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 5 |
| (3.82a) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 5 |
| (3.82b) | Transitivity of ⇒ | Theorem | (p ≡ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 5 |
| (3.82c) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ≡ r) ⇒ (p ⇒ r) | 5 |
| (3.83) | Leibniz | Axiom | e = f ⇒ E[z ≔ e] = E[z ≔ f] | 4 |
| (3.83.1) | Leibniz | Corollary | d = e ⇒ f d = f e | 4 |
| (3.83.2) | Leibniz | Corollary | d = e ⇒ (p d ≡ p e) | 4 |
| (3.83.3) | Leibniz | Corollary | (d ≡ e) ⇒ (p d ≡ p e) | 4 |
| (3.83.4) | Leibniz | Corollary | (d ≡ e) ⇒ f d = f e | 4 |
| (3.84a) | Replacement | Theorem | e = f ∧ E[z ≔ e] ≡ e = f ∧ E[z ≔ f] | 4 |
| (3.84a≡) | Replacement | Theorem | (e ≡ f) ∧ E[z ≔ e] ≡ (e ≡ f) ∧ E[z ≔ f] | 4 |
| (3.84b) | Replacement | Theorem | e = f ⇒ E[z ≔ e] ≡ e = f ⇒ E[z ≔ f] | 4 |
| (3.84b≡) | Replacement | Theorem | (e ≡ f) ⇒ E[z ≔ e] ≡ (e ≡ f) ⇒ E[z ≔ f] | 4 |
| (3.84c) | Replacement | Theorem | q ∧ (e ≡ f) ⇒ E[z ≔ e] ≡ q ∧ (e ≡ f) ⇒ E[z ≔ f] | 4 |
| (3.84c) | Replacement | Theorem | q ∧ e = f ⇒ E[z ≔ e] ≡ q ∧ e = f ⇒ E[z ≔ f] | 4 |
| (3.85a) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] ≡ p ⇒ E[z ≔ true] | 4 |
| (3.85b) | Replace by `true` | Theorem | q ∧ p ⇒ E[z ≔ p] ≡ q ∧ p ⇒ E[z ≔ true] | 4 |
| (3.85c) | Replace by `false` | Theorem | ¬ p ⇒ E[z ≔ p] ≡ ¬ p ⇒ E[z ≔ false] | 4 |
| (3.85d) | Replace by `false` | Theorem | q ∧ ¬ p ⇒ E[z ≔ p] ≡ q ∧ ¬ p ⇒ E[z ≔ false] | 4 |
| (3.85e) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] = E[z ≔ true] | 4 |
| (3.86a) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ≡ E[z ≔ false] ⇒ p | 4 |
| (3.86b) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ∨ q ≡ E[z ≔ false] ⇒ p ∨ q | 4 |
| (3.87) | Replace by `true` | Theorem | p ∧ E[z ≔ p] ≡ p ∧ E[z ≔ true] | 4 |
| (3.87.1) | Abbreviated replace by `false` | Theorem | ¬ p ∧ E ≡ ¬ p ∧ E[p ≔ false] | 4 |
| (3.87.1) | Abbreviated replace by `true` | Theorem | p ∧ E ≡ p ∧ E[p ≔ true] | 4 |
| (3.88) | Replace by `false` | Theorem | p ∨ E[z ≔ p] ≡ p ∨ E[z ≔ false] | 4 |
| (3.89) | Shannon | Theorem | E[z ≔ p] ≡ (p ∧ E[z ≔ true]) ∨ (¬ p ∧ E[z ≔ false]) | 4 |
| (3.9) | Commutativity of ¬ with ≡ | Axiom | ¬ (p ≡ q) ≡ (¬ p ≡ q) | 5 |
| (4.3) | Left-monotonicity of ∧；别名：Monotonicity of ∧ | Theorem | (p ⇒ q) ⇒ (p ∧ r ⇒ q ∧ r) | 4 |
| 未编号 · 00099d | ∧₆-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ (u ⇒ p ∧ (q ∧ (r ∧ (s ∧ (t ∧ u))))))))) | 4 |
| 未编号 · 0102c0 | Identity of ≢ | Theorem | (p ≢ false) ≡ p | 5 |
| 未编号 · 0440d9 | Equivalence enrichment | Theorem | (p ≡ q) ⇒ ((p ⇒ r) ⇒ (p ⇒ q ∧ r)) | 4 |
| 未编号 · 08e6b7 | Monotonicity of ∧ | Theorem | (p ⇒ p') ⇒ ((q ⇒ q') ⇒ (p ∧ q ⇒ p' ∧ q')) | 4 |
| 未编号 · 0a2238 | Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ (p ∨ r ⇒ q ∨ r) | 4 |
| 未编号 · 0a4bd6 | Positivity | Theorem | pos a ≡ a ≠ 0 ∧ ¬ pos (- a) | 1 |
| 未编号 · 0f2ed1 | Contributing conjunct to ≡ | Theorem | (p ∧ q ≡ r) ∧ p ⇒ (q ≡ r) | 4 |
| 未编号 · 15c06f | Transitivity of = | Theorem | e = f ∧ f = g ⇒ e = g | 4 |
| 未编号 · 23785d | Adding consequent to ∧ | Theorem | (p ⇒ q) ⇒ (p ∧ r ⇒ p ∧ (q ∧ r)) | 4 |
| 未编号 · 24a375 | Definition of ≡ | Axiom | (p ≡ q) = (p = q) | 5 |
| 未编号 · 25737b | Co-residual of ∨ | Theorem | q ⇒ x ∨ p ≡ ¬ p ∧ q ⇒ x | 4 |
| 未编号 · 2977f6 | Proof by contradiction | Theorem | ¬ p ⇒ false ≡ p | 4 |
| 未编号 · 29a570 | ∧₅-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ p ∧ (q ∧ (r ∧ (s ∧ t))))))) | 8 |
| 未编号 · 2b72bc | Definition of ∧ | Lemma | (p ∧ q) = (p ≡ (q ≡ p ∨ q)) | 5 |
| 未编号 · 31d3fa | Preserving conjunct after ⇒ | Theorem | p ∧ q ⇒ r ≡ p ∧ q ⇒ p ∧ r | 4 |
| 未编号 · 3aa5d0 | Monotonicity of ⇒；别名：Right-monotonicity of ⇒ | Theorem | (p ⇒ q) ⇒ ((r ⇒ p) ⇒ (r ⇒ q)) | 4 |
| 未编号 · 3ca479 | Positive implies non-zero | Theorem | pos a ⇒ a ≠ 0 | 1 |
| 未编号 · 478166 | Right-distributivity of ⇒ over ∧₃ | Theorem | p ⇒ q ∧ (r ∧ s) ≡ (p ⇒ q) ∧ ((p ⇒ r) ∧ (p ⇒ s)) | 4 |
| 未编号 · 5aae8c | Definition of ≠ | Theorem | x ≠ y ≡ (x = y ≡ false) | 3 |
| 未编号 · 5f6c2d | Symmetry of ≠ | Theorem | x ≠ y ≡ y ≠ x | 3 |
| 未编号 · 70f478 | ∧-Introduction | Theorem | p ⇒ (q ⇒ p ∧ q) | 4 |
| 未编号 · 771122 | ∧₄-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ p ∧ (q ∧ (r ∧ s))))) | 4 |
| 未编号 · 79d90c | Left-monotonicity of ∨；别名：Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ (p ∨ r ⇒ q ∨ r) | 4 |
| 未编号 · 86a35c | Abbreviated replacement in ∧；别名：Abbreviated replacement | Theorem | P ∧ x = E ≡ P[x ≔ E] ∧ x = E | 4 |
| 未编号 · 8876d6 | Case shuffling | Theorem | (p ∨ q) ∧ (¬ p ∨ r) ≡ (p ∧ r) ∨ (¬ p ∧ q) | 4 |
| 未编号 · 90956c | ⇒-Introduction | Primitive inference rule | ( p ⊦ q ) ⊦ p ⇒ q | 4 |
| 未编号 · 94d527 | Weakening；别名：Strengthening | Theorem | (p ∨ q) ∧ r ⇒ p ∨ (q ∧ r) | 4 |
| 未编号 · 94f30a | ∧₇-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ (u ⇒ (v ⇒ p ∧ (q ∧ (r ∧ (s ∧ (t ∧ (u ∧ v))))))))))) | 4 |
| 未编号 · 9941d0 | ∧₃-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ p ∧ (q ∧ r))) | 4 |
| 未编号 · 9cb45b | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 4 |
| 未编号 · 9cd73a | Definition of ≠ | Axiom | x ≠ y ≡ ¬ (x = y) | 3 |
| 未编号 · a2a32a | Disjunction as implication | Lemma | p ∨ q ≡ ¬ p ⇒ q | 4 |
| 未编号 · b103d7 | Right-distributivity of ⇒ over ∧₄ | Theorem | p ⇒ q ∧ (r ∧ (s ∧ t)) ≡ (p ⇒ q) ∧ ((p ⇒ r) ∧ ((p ⇒ s) ∧ (p ⇒ t))) | 4 |
| 未编号 · b77dec | Abbreviated replacement in ⇒；别名：Abbreviated replacement | Theorem | x = E ⇒ P ≡ x = E ⇒ P[x ≔ E] | 4 |
| 未编号 · b8a06d | Exclusive or implies inclusive | Theorem | (p ≢ q) ⇒ p ∨ q | 4 |
| 未编号 · bb97a0 | Negation of ≠ | Theorem | ¬ (x ≠ y) ≡ x = y | 3 |
| 未编号 · bdf087 | Antitonicity of ¬ | Theorem | (p ⇒ q) ⇒ (¬ q ⇒ ¬ p) | 4 |
| 未编号 · cac6ec | Positivity of 1 | Corollary | pos 1 | 1 |
| 未编号 · ce5ae3 | Residual of ∧ | Theorem | x ∧ p ⇒ q ≡ x ⇒ (p ⇒ q) | 4 |
| 未编号 · e18e5f | Irreflexivity of ≠ | Theorem | x ≠ x ≡ false | 3 |
| 未编号 · e364a1 | Antitonicity of ⇒；别名：Left-antitonicity of ⇒ | Theorem | (p ⇒ q) ⇒ ((q ⇒ r) ⇒ (p ⇒ r)) | 4 |
| 未编号 · e887d4 | Non-zero multiplication | Theorem | a ≠ 0 ⇒ (b ≠ 0 ⇒ a · b ≠ 0) | 1 |
| 未编号 · f1d779 | Cancellation of ¬ | Theorem | (¬ p ≡ ¬ q) = (p ≡ q) | 5 |
| 未编号 · f4948f | Case shuffling | Theorem | (p ⇒ q) ∧ (¬ p ⇒ r) ≡ (p ∧ q) ∨ (¬ p ∧ r) | 4 |
| 未编号 · f8a195 | Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ ((r ⇒ s) ⇒ (p ∨ r ⇒ q ∨ s)) | 8 |
| 未编号 · f93139 | Irreflexivity of ≠ | Theorem | ¬ (x ≠ x) | 3 |

## 2025 · Week 5

对应 notebook：[2025i Exercise 5.2: Equality and Predecessors in ℕ · 预载列表](http://130.113.68.214:15047/), [2025i Exercise 5.3: Simple Proofs `By cases` on ℕ · 预载列表](http://130.113.68.214:15048/), [2025i Exercise 5.4: Manipulating Ranges in ℤ · 预载列表](http://130.113.68.214:15049/), [2025i Exercise 5.5: Sum Quantification in ℤ · 预载列表](http://130.113.68.214:15050/), [HW10-1 · CalcCheck preloaded theorem list](http://130.113.68.214:15034/), [HW10-2 · CalcCheck preloaded theorem list](http://130.113.68.214:15035/), [HW10-3 · CalcCheck preloaded theorem list](http://130.113.68.214:15036/), [HW11 · CalcCheck preloaded theorem list](http://130.113.68.214:15037/), [HW12 · CalcCheck preloaded theorem list](http://130.113.68.214:15045/)

| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |
|---|---|---|---|---:|
| (1.2) | Reflexivity of = | Axiom | x = x | 30 |
| (1.3) | Symmetry of = | Axiom | (x = y) = (y = x) | 30 |
| (1.4) | Transitivity of = | Derived inference rule | X = Y , Y = Z ⊦ X = Z | 30 |
| (1.5) | Leibniz | Derived inference rule | X = Y ⊦ E[z ≔ X] = E[z ≔ Y] | 30 |
| (15.13) | Unary minus | Axiom | a + - a = 0 | 3 |
| (15.14) | Subtraction | Axiom | a - b = a + - b | 3 |
| (15.17) | Self-inverse of unary minus | Theorem | - (- a) = a | 3 |
| (15.18) | Fixpoint of unary minus | Theorem | - 0 = 0 | 3 |
| (15.19) | Distributivity of unary minus over + | Theorem | - (a + b) = - a + - b | 3 |
| (15.1a) | Associativity of + | Axiom | (a + b) + c = a + (b + c) | 3 |
| (15.1b) | Associativity of · | Axiom | (a · b) · c = a · (b · c) | 3 |
| (15.20) | Negation as multiplication | Theorem | - a = - 1 · a | 3 |
| (15.21) | 原文未命名 | Theorem | - a · b = a · - b | 3 |
| (15.22) | Commutativity of unary minus with · | Theorem | a · - b = - (a · b) | 3 |
| (15.23) | 原文未命名 | Theorem | - a · - b = a · b | 3 |
| (15.24) | Right-identity of - | Theorem | a - 0 = a | 3 |
| (15.24a) | Subtraction of subtraction | Theorem | a - (b - c) = (a - b) + c | 3 |
| (15.25) | 原文未命名 | Theorem | (a - b) + (c - d) = (a + c) - (b + d) | 3 |
| (15.25a) | Mutual associativity of + and - | Theorem | a + (b - c) = (a + b) - c | 3 |
| (15.25b) | Subtraction of addition | Theorem | a - (b + c) = (a - b) - c | 3 |
| (15.25c) | Cancellation across added subtractions | Theorem | (a - b) + (b - c) = a - c | 3 |
| (15.26) | 原文未命名 | Theorem | (a - b) - (c - d) = (a + d) - (b + c) | 3 |
| (15.27) | 原文未命名 | Theorem | (a - b) · (c - d) = (a · c + b · d) - (a · d + b · c) | 3 |
| (15.29) | Distributivity of · over - | Theorem | (a - b) · c = a · c - b · c | 3 |
| (15.2a) | Symmetry of + | Axiom | a + b = b + a | 3 |
| (15.2b) | Symmetry of · | Axiom | a · b = b · a | 3 |
| (15.3) | Additive identity；别名：Identity of + | Axiom | 0 + a = a | 3 |
| (15.30) | Positivity under + | Axiom | pos a ∧ pos b ⇒ pos (a + b) | 3 |
| (15.30a) | Positivity under + | Theorem | pos a ⇒ (pos b ⇒ pos (a + b)) | 3 |
| (15.31) | Positivity under · | Axiom | pos a ∧ pos b ⇒ pos (a · b) | 3 |
| (15.31a) | Positivity under · | Theorem | pos a ⇒ (pos b ⇒ pos (a · b)) | 3 |
| (15.32) | Non-positivity of 0 | Axiom | ¬ pos 0 | 3 |
| (15.33) | Positivity under unary minus | Axiom | b ≠ 0 ⇒ (pos b ≡ ¬ pos (- b)) | 3 |
| (15.33a) | Positivity under unary minus | Theorem | b ≠ 0 ⇒ (pos b ≢ pos (- b)) | 3 |
| (15.33b) | Positivity under unary minus | Theorem | b ≠ 0 ⇒ (pos (- b) ≡ ¬ pos b) | 3 |
| (15.33c) | Positivity under unary minus | Theorem | (pos (- b) ≡ pos b) ⇒ b = 0 | 3 |
| (15.34) | Positivity of squares | Theorem | b ≠ 0 ⇒ pos (b · b) | 3 |
| (15.35) | Positivity under positive · | Theorem | pos a ⇒ (pos b ≡ pos (a · b)) | 3 |
| (15.36) | Less；别名：Definition of < | Axiom | a < b ≡ pos (b - a) | 3 |
| (15.37) | Greater；别名：Definition of > | Axiom | a > b ≡ pos (a - b) | 3 |
| (15.38) | At most；别名：Definition of ≤ | Axiom | a ≤ b ≡ a < b ∨ a = b | 3 |
| (15.39) | At least；别名：Definition of ≥ | Axiom | a ≥ b ≡ a > b ∨ a = b | 3 |
| (15.4) | Multiplicative identity；别名：Identity of · | Axiom | 1 · a = a | 3 |
| (15.40) | Positive elements | Theorem | pos b ≡ 0 < b | 3 |
| (15.41a) | Transitivity；别名：Transitivity of < | Theorem | a < b ∧ b < c ⇒ a < c | 3 |
| (15.41b) | Transitivity；别名：Transitivity of ≤ with < | Theorem | a ≤ b ∧ b < c ⇒ a < c | 3 |
| (15.41c) | Transitivity；别名：Transitivity of < with ≤ | Theorem | a < b ∧ b ≤ c ⇒ a < c | 3 |
| (15.41d) | Transitivity；别名：Transitivity of ≤ | Theorem | a ≤ b ∧ b ≤ c ⇒ a ≤ c | 3 |
| (15.42) | <-Isotonicity of + | Theorem | a < b ≡ a + d < b + d | 3 |
| (15.42) | Monotonicity of ·；别名：<-Isotonicity of · | Theorem | 0 < d ⇒ (a < b ≡ a · d < b · d) | 1 |
| (15.44) | Trichotomy | Theorem | (a < b ≡ (a = b ≡ a > b)) ∧ ¬ (a < b ∧ (a = b ∧ a > b)) | 3 |
| (15.44A) | Trichotomy — A | Theorem | a < b ≡ (a = b ≡ a > b) | 2 |
| (15.44B) | Trichotomy — B | Theorem | ¬ (a < b ∧ (a = b ∧ a > b)) | 2 |
| (15.45) | Antisymmetry of ≤ | Theorem | a ≤ b ∧ b ≤ a ≡ a = b | 1 |
| (15.46) | Reflexivity of ≤ | Theorem | a ≤ a | 1 |
| (15.5) | Distributivity of · over + | Axiom | a · (b + c) = a · b + a · c | 3 |
| (15.7) | Cancellation of · | Axiom | c ≠ 0 ⇒ (c · a = c · b ≡ a = b) | 5 |
| (15.8) | Cancellation of + | Axiom | a + b = a + c ≡ b = c | 5 |
| (15.9) | Zero of · | Axiom | a · 0 = 0 | 3 |
| (3.1) | Associativity of ≡ | Axiom | ((p ≡ q) ≡ r) ≡ (p ≡ (q ≡ r)) | 8 |
| (3.10) | Definition of ≢ | Axiom | (p ≢ q) ≡ ¬ (p ≡ q) | 8 |
| (3.11) | ¬ connection | Theorem | ¬ p ≡ (q ≡ (p ≡ ¬ q)) | 8 |
| (3.12) | Double negation | Theorem | ¬ (¬ p) ≡ p | 8 |
| (3.13) | Negation of `false` | Theorem | ¬ false ≡ true | 8 |
| (3.14) | 原文未命名 | Theorem | (p ≢ q) ≡ (¬ p ≡ q) | 8 |
| (3.15) | Definition of ¬ from ≡ | Theorem | ¬ p ≡ (p ≡ false) | 8 |
| (3.16) | Symmetry of ≢ | Theorem | (p ≢ q) ≡ (q ≢ p) | 8 |
| (3.17) | Associativity of ≢ | Theorem | ((p ≢ q) ≢ r) ≡ (p ≢ (q ≢ r)) | 8 |
| (3.18) | Mutual associativity of ≡ with ≢ | Theorem | ((p ≢ q) ≡ r) ≡ (p ≢ (q ≡ r)) | 8 |
| (3.19) | Mutual interchangeability of ≡ with ≢ | Theorem | (p ≢ (q ≡ r)) ≡ (p ≡ (q ≢ r)) | 8 |
| (3.2) | Symmetry of ≡ | Axiom | (p ≡ q) ≡ (q ≡ p) | 8 |
| (3.24) | Symmetry of ∨ | Axiom | p ∨ q ≡ q ∨ p | 8 |
| (3.25) | Associativity of ∨ | Axiom | (p ∨ q) ∨ r ≡ p ∨ (q ∨ r) | 8 |
| (3.26) | Idempotency of ∨ | Axiom | p ∨ p ≡ p | 8 |
| (3.27) | Distributivity of ∨ over ≡ | Axiom | p ∨ (q ≡ r) ≡ (p ∨ q ≡ p ∨ r) | 8 |
| (3.28) | Excluded middle；别名：LEM | Axiom | p ∨ ¬ p | 8 |
| (3.29) | Zero of ∨ | Theorem | p ∨ true ≡ true | 8 |
| (3.3) | Identity of ≡ | Axiom | true ≡ (q ≡ q) | 8 |
| (3.30) | Identity of ∨ | Theorem | p ∨ false ≡ p | 8 |
| (3.31) | Distributivity of ∨ over ∨ | Theorem | p ∨ (q ∨ r) ≡ (p ∨ q) ∨ (p ∨ r) | 8 |
| (3.32) | 原文未命名 | Theorem | p ∨ q ≡ (p ∨ ¬ q ≡ p) | 8 |
| (3.35) | Golden rule | Axiom | p ∧ q ≡ (p ≡ (q ≡ p ∨ q)) | 8 |
| (3.36) | Symmetry of ∧ | Theorem | p ∧ q ≡ q ∧ p | 8 |
| (3.37) | Associativity of ∧ | Theorem | (p ∧ q) ∧ r ≡ p ∧ (q ∧ r) | 8 |
| (3.38) | Idempotency of ∧ | Theorem | p ∧ p ≡ p | 8 |
| (3.39) | Identity of ∧ | Theorem | p ∧ true ≡ p | 8 |
| (3.4) | 原文未命名 | Theorem | true | 8 |
| (3.40) | Zero of ∧ | Theorem | p ∧ false ≡ false | 8 |
| (3.41) | Distributivity of ∧ over ∧ | Theorem | p ∧ (q ∧ r) ≡ (p ∧ q) ∧ (p ∧ r) | 8 |
| (3.42) | Contradiction | Theorem | p ∧ ¬ p ≡ false | 8 |
| (3.43a) | Absorption | Theorem | p ∧ (p ∨ q) ≡ p | 8 |
| (3.43b) | Absorption | Theorem | p ∨ (p ∧ q) ≡ p | 8 |
| (3.44a) | Absorption | Theorem | p ∧ (¬ p ∨ q) ≡ p ∧ q | 8 |
| (3.44b) | Absorption | Theorem | p ∨ (¬ p ∧ q) ≡ p ∨ q | 8 |
| (3.44c) | Absorption | Theorem | ¬ p ∧ (p ∨ q) ≡ ¬ p ∧ q | 8 |
| (3.44d) | Absorption | Theorem | ¬ p ∨ (p ∧ q) ≡ ¬ p ∨ q | 8 |
| (3.45) | Distributivity of ∨ over ∧ | Theorem | p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r) | 8 |
| (3.46) | Distributivity of ∧ over ∨ | Theorem | p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r) | 8 |
| (3.47a) | De Morgan | Theorem | ¬ (p ∧ q) ≡ ¬ p ∨ ¬ q | 8 |
| (3.47b) | De Morgan | Theorem | ¬ (p ∨ q) ≡ ¬ p ∧ ¬ q | 8 |
| (3.47c) | De Morgan | Theorem | ¬ (¬ p ∧ q) ≡ p ∨ ¬ q | 8 |
| (3.47d) | De Morgan | Theorem | ¬ (¬ p ∨ q) ≡ p ∧ ¬ q | 8 |
| (3.47e) | De Morgan dual of ∧ | Theorem | ¬ (¬ p ∧ ¬ q) ≡ p ∨ q | 8 |
| (3.47f) | De Morgan dual of ∨ | Theorem | ¬ (¬ p ∨ ¬ q) ≡ p ∧ q | 8 |
| (3.48) | 原文未命名 | Theorem | p ∧ q ≡ (p ∧ ¬ q ≡ ¬ p) | 8 |
| (3.49) | Semi-distributivity of ∧ over ≡ | Theorem | p ∧ (q ≡ r) ≡ (p ∧ q ≡ (p ∧ r ≡ p)) | 8 |
| (3.5) | Reflexivity of ≡ | Theorem | p ≡ p | 8 |
| (3.50) | Strong modus ponens for ≡ | Theorem | p ∧ (q ≡ p) ≡ p ∧ q | 8 |
| (3.51) | Replacement | Theorem | (p ≡ q) ∧ (r ≡ p) ≡ (p ≡ q) ∧ (r ≡ q) | 8 |
| (3.52) | Alternative definition of ≡ | Theorem | p ≡ (q ≡ (p ∧ q) ∨ (¬ p ∧ ¬ q)) | 8 |
| (3.53) | Exclusive or；别名：Alternative definition of ≢ | Theorem | (p ≢ q) ≡ (¬ p ∧ q) ∨ (p ∧ ¬ q) | 8 |
| (3.55) | 原文未命名 | Theorem | (p ∧ q) ∧ r ≡ (p ≡ (q ≡ (r ≡ (p ∨ q ≡ (q ∨ r ≡ (r ∨ p ≡ p ∨ (q ∨ r))))))) | 8 |
| (3.57) | Definition of ⇒ via ∨；别名：Definition of ⇒ from ∨、Definition of ⇒、Definition of implication | Axiom | p ⇒ q ≡ (p ∨ q ≡ q) | 7 |
| (3.57=) | Implication via ∨ | Lemma | (p ⇒ q) = (p ∨ q ≡ q) | 7 |
| (3.58) | Definition of ⇐；别名：Consequence | Axiom | p ⇐ q ≡ q ⇒ p | 7 |
| (3.59) | Material implication；别名：Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ ¬ p ∨ q | 7 |
| (3.60) | Definition of ⇒ via ∧；别名：Definition of ⇒ from ∧、Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ (p ∧ q ≡ p) | 7 |
| (3.60=) | Implication via ∧ | Lemma | (p ⇒ q) = (p ∧ q ≡ p) | 7 |
| (3.61) | Contrapositive | Theorem | p ⇒ q ≡ ¬ q ⇒ ¬ p | 7 |
| (3.61.1) | ¬-connection for ⇒ | Theorem | p ⇒ ¬ q ≡ q ⇒ ¬ p | 7 |
| (3.61.2) | ¬-connection for ⇒ | Theorem | ¬ p ⇒ q ≡ ¬ q ⇒ p | 7 |
| (3.62) | 原文未命名 | Theorem | p ⇒ (q ≡ r) ≡ (p ∧ q ≡ p ∧ r) | 7 |
| (3.63) | Distributivity of ⇒ over ≡ | Theorem | p ⇒ (q ≡ r) ≡ (p ⇒ q ≡ p ⇒ r) | 7 |
| (3.64) | Self-distributivity of ⇒ | Theorem | p ⇒ (q ⇒ r) ≡ (p ⇒ q) ⇒ (p ⇒ r) | 7 |
| (3.65) | Shunting | Theorem | p ∧ q ⇒ r ≡ p ⇒ (q ⇒ r) | 7 |
| (3.66) | Strong modus ponens | Theorem | p ∧ (p ⇒ q) ≡ p ∧ q | 7 |
| (3.67) | 原文未命名 | Theorem | p ∧ (q ⇒ p) ≡ p | 7 |
| (3.68) | 原文未命名 | Theorem | p ∨ (p ⇒ q) ≡ true | 7 |
| (3.69) | 原文未命名 | Theorem | p ∨ (q ⇒ p) ≡ q ⇒ p | 7 |
| (3.70) | 原文未命名 | Theorem | p ∨ q ⇒ p ∧ q ≡ (p ≡ q) | 7 |
| (3.71) | Reflexivity of ⇒ | Theorem | p ⇒ p | 7 |
| (3.72) | Right-zero of ⇒；别名：ex quodlibet verum | Theorem | p ⇒ true | 7 |
| (3.73) | Left-identity of ⇒ | Theorem | true ⇒ p ≡ p | 7 |
| (3.74) | Definition of ¬ from ⇒ | Theorem | p ⇒ false ≡ ¬ p | 7 |
| (3.75) | ex falso quodlibet | Theorem | false ⇒ p | 7 |
| (3.76a) | Weakening；别名：Strengthening | Theorem | p ⇒ p ∨ q | 7 |
| (3.76b) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p | 7 |
| (3.76c) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∨ q | 7 |
| (3.76d) | Weakening；别名：Strengthening | Theorem | p ∨ (q ∧ r) ⇒ p ∨ q | 7 |
| (3.76e) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∧ (q ∨ r) | 7 |
| (3.77) | Modus ponens | Theorem | p ∧ (p ⇒ q) ⇒ q | 7 |
| (3.78) | Case analysis | Theorem | (p ⇒ r) ∧ (q ⇒ r) ≡ p ∨ q ⇒ r | 7 |
| (3.79) | Case analysis | Theorem | (p ⇒ r) ∧ (¬ p ⇒ r) ≡ r | 7 |
| (3.8) | Definition of `false` | Axiom | false ≡ ¬ true | 8 |
| (3.80) | Mutual implication | Theorem | (p ⇒ q) ∧ (q ⇒ p) ≡ (p ≡ q) | 7 |
| (3.80.1) | Reflexivity of ⇒ wrt. ≡；别名：Reflexivity of ⇒ | Theorem | (p ≡ q) ⇒ (p ⇒ q) | 7 |
| (3.81) | Antisymmetry of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ p) ⇒ (p ≡ q) | 7 |
| (3.82.4) | Implication strengthening | Theorem | p ⇒ q ≡ p ⇒ p ∧ q | 7 |
| (3.82.5) | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 7 |
| (3.82a) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 7 |
| (3.82b) | Transitivity of ⇒ | Theorem | (p ≡ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 7 |
| (3.82c) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ≡ r) ⇒ (p ⇒ r) | 7 |
| (3.83) | Leibniz | Axiom | e = f ⇒ E[z ≔ e] = E[z ≔ f] | 7 |
| (3.83.1) | Leibniz | Corollary | d = e ⇒ f d = f e | 7 |
| (3.83.2) | Leibniz | Corollary | d = e ⇒ (p d ≡ p e) | 7 |
| (3.83.3) | Leibniz | Corollary | (d ≡ e) ⇒ (p d ≡ p e) | 7 |
| (3.83.4) | Leibniz | Corollary | (d ≡ e) ⇒ f d = f e | 7 |
| (3.84a) | Replacement | Theorem | e = f ∧ E[z ≔ e] ≡ e = f ∧ E[z ≔ f] | 7 |
| (3.84a≡) | Replacement | Theorem | (e ≡ f) ∧ E[z ≔ e] ≡ (e ≡ f) ∧ E[z ≔ f] | 7 |
| (3.84b) | Replacement | Theorem | e = f ⇒ E[z ≔ e] ≡ e = f ⇒ E[z ≔ f] | 7 |
| (3.84b≡) | Replacement | Theorem | (e ≡ f) ⇒ E[z ≔ e] ≡ (e ≡ f) ⇒ E[z ≔ f] | 7 |
| (3.84c) | Replacement | Theorem | q ∧ (e ≡ f) ⇒ E[z ≔ e] ≡ q ∧ (e ≡ f) ⇒ E[z ≔ f] | 7 |
| (3.84c) | Replacement | Theorem | q ∧ e = f ⇒ E[z ≔ e] ≡ q ∧ e = f ⇒ E[z ≔ f] | 7 |
| (3.85a) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] ≡ p ⇒ E[z ≔ true] | 7 |
| (3.85b) | Replace by `true` | Theorem | q ∧ p ⇒ E[z ≔ p] ≡ q ∧ p ⇒ E[z ≔ true] | 7 |
| (3.85c) | Replace by `false` | Theorem | ¬ p ⇒ E[z ≔ p] ≡ ¬ p ⇒ E[z ≔ false] | 7 |
| (3.85d) | Replace by `false` | Theorem | q ∧ ¬ p ⇒ E[z ≔ p] ≡ q ∧ ¬ p ⇒ E[z ≔ false] | 7 |
| (3.85e) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] = E[z ≔ true] | 7 |
| (3.86a) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ≡ E[z ≔ false] ⇒ p | 7 |
| (3.86b) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ∨ q ≡ E[z ≔ false] ⇒ p ∨ q | 7 |
| (3.87) | Replace by `true` | Theorem | p ∧ E[z ≔ p] ≡ p ∧ E[z ≔ true] | 7 |
| (3.87.1) | Abbreviated replace by `false` | Theorem | ¬ p ∧ E ≡ ¬ p ∧ E[p ≔ false] | 7 |
| (3.87.1) | Abbreviated replace by `true` | Theorem | p ∧ E ≡ p ∧ E[p ≔ true] | 7 |
| (3.88) | Replace by `false` | Theorem | p ∨ E[z ≔ p] ≡ p ∨ E[z ≔ false] | 7 |
| (3.89) | Shannon | Theorem | E[z ≔ p] ≡ (p ∧ E[z ≔ true]) ∨ (¬ p ∧ E[z ≔ false]) | 7 |
| (3.9) | Commutativity of ¬ with ≡ | Axiom | ¬ (p ≡ q) ≡ (¬ p ≡ q) | 8 |
| (4.3) | Left-monotonicity of ∧；别名：Monotonicity of ∧ | Theorem | (p ⇒ q) ⇒ (p ∧ r ⇒ q ∧ r) | 7 |
| (8.11) | Substitution into ∀ | Axiom | (∀ y ❙ R • P )[x ≔ F] ≡ (∀ y ❙ R[x ≔ F] • P[x ≔ F] ) | 2 |
| (8.12.1) | Leibniz for ∀ range | Axiom | (∀ x • R₁ ≡ R₂ ) ⇒ ((∀ x ❙ R₁ • P ) ≡ (∀ x ❙ R₂ • P )) | 2 |
| (8.12.1₂) | Leibniz for ∀₂ range | Axiom | (∀ x, y • R₁ ≡ R₂ ) ⇒ ((∀ x, y ❙ R₁ • P ) ≡ (∀ x, y ❙ R₂ • P )) | 2 |
| (8.12.1₃) | Leibniz for ∀₃ range | Axiom | (∀ x, y, z • R₁ ≡ R₂ ) ⇒ ((∀ x, y, z ❙ R₁ • P ) ≡ (∀ x, y, z ❙ R₂ • P )) | 2 |
| (8.12.2) | Leibniz for ∀ body | Axiom | (∀ x • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∀ x ❙ R • P₁ ) ≡ (∀ x ❙ R • P₂ )) | 2 |
| (8.12.2₂) | Leibniz for ∀₂ body | Axiom | (∀ x, y • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∀ x, y ❙ R • P₁ ) ≡ (∀ x, y ❙ R • P₂ )) | 2 |
| (8.12.2₃) | Leibniz for ∀₃ body | Axiom | (∀ x, y, z • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∀ x, y, z ❙ R • P₁ ) ≡ (∀ x, y, z ❙ R • P₂ )) | 2 |
| (8.13) | Empty range for ∀ | Axiom | (∀ x ❙ false • P ) ≡ true | 2 |
| (8.14) | One-point rule for ∀ | Axiom | (∀ x ❙ x = E • P ) ≡ P[x ≔ E] | 2 |
| (8.15) | Distributivity of ∀ over ∧ | Axiom | (∀ x ❙ R • P ) ∧ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∧ Q ) | 2 |
| (8.16) | Disjoint range split for ∀ | Theorem | (∀ x • R ∧ S ≡ false ) ⇒ ((∀ x ❙ R ∨ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P )) | 2 |
| (8.16.1) | Alternative range split for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x ❙ R ∧ S • P ) ∧ (∀ x ❙ R ∧ ¬ S • P ) | 2 |
| (8.17) | General range split for ∀ | Axiom | (∀ x ❙ R ∨ S • P ) ∧ (∀ x ❙ R ∧ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P ) | 2 |
| (8.18) | Range split for ∀ | Theorem | (∀ x ❙ R ∨ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P ) | 4 |
| (8.18) | Range split for ∀₂ | Theorem | (∀ x, y ❙ R ∨ S • P ) ≡ (∀ x, y ❙ R • P ) ∧ (∀ x, y ❙ S • P ) | 2 |
| (8.19) | Interchange of dummies for ∀ | Theorem | (∀ x ❙ R • (∀ y ❙ S • P ) ) ≡ (∀ y ❙ S • (∀ x ❙ R • P ) ) | 2 |
| (8.19.1) | Dummy list permutation for ∀ | Axiom | (∀ x, y ❙ R • P ) ≡ (∀ y, x ❙ R • P ) | 2 |
| (8.19.1) | Dummy list permutation₁+₂ for ∀ | Axiom | (∀ x, y, z ❙ R • P ) ≡ (∀ y, z, x ❙ R • P ) | 2 |
| (8.20) | Nesting for ∀ | Axiom | (∀ x, y ❙ R ∧ S • P ) ≡ (∀ x ❙ R • (∀ y ❙ S • P ) ) | 2 |
| (8.20) | Nesting₁+₂ for ∀ | Axiom | (∀ x, y, z ❙ R ∧ S • P ) ≡ (∀ x ❙ R • (∀ y, z ❙ S • P ) ) | 2 |
| (8.20) | Nesting₂+₁ for ∀ | Axiom | (∀ x, y, z ❙ R ∧ S • P ) ≡ (∀ x, y ❙ R • (∀ z ❙ S • P ) ) | 2 |
| (8.20.1) | Nesting for ∀ | Theorem | (∀ x, y ❙ S • P ) ≡ (∀ x • (∀ y ❙ S • P ) ) | 2 |
| (8.20.1) | Nesting₁+₂ for ∀ | Theorem | (∀ x, y, z ❙ S • P ) ≡ (∀ x • (∀ y, z ❙ S • P ) ) | 2 |
| (8.20.1) | Nesting₂+₁ for ∀ | Theorem | (∀ x, y, z ❙ S • P ) ≡ (∀ x, y • (∀ z ❙ S • P ) ) | 2 |
| (8.20.2) | Nesting for ∀ | Theorem | (∀ x, y ❙ R • P ) ≡ (∀ x ❙ R • (∀ y • P ) ) | 2 |
| (8.20.2) | Nesting₁+₂ for ∀ | Theorem | (∀ x, y, z ❙ R • P ) ≡ (∀ x ❙ R • (∀ y, z • P ) ) | 2 |
| (8.20.2) | Nesting₂+₁ for ∀ | Theorem | (∀ x, y, z ❙ R • P ) ≡ (∀ x, y ❙ R • (∀ z • P ) ) | 2 |
| (8.20.3) | Replacement in ∀ | Theorem | (∀ y ❙ R ∧ e = f • P[x ≔ e] ) ≡ (∀ y ❙ R ∧ e = f • P[x ≔ f] ) | 2 |
| (8.21) | Dummy renaming for ∀；别名：α-conversion | Theorem | (∀ x ❙ R • P ) ≡ (∀ y ❙ R[x ≔ y] • P[x ≔ y] ) | 2 |
| (8.22) | Change of dummy in ∀ | Theorem | (∀ f • (∀ g • (∀ x • (∀ y • x = f y ≡ y = g x ) ) ⇒ ((∀ x ❙ R • P ) ≡ (∀ y ❙ R[x ≔ f y] • P[x ≔ f y] )) ) ) | 2 |
| (8.22.1) | Change of dummy in ∀ — variant | Theorem | (∀ x • (∀ y • x = f y ⇒ y = g x ) ) ⇒ ((∀ x ❙ R ∧ x = f (g x) • P ) ≡ (∀ y ❙ R[x ≔ f y] • P[x ≔ f y] )) | 2 |
| (8.22.2) | Range replacement in nested ∀ | Lemma | (∀ x ❙ R • (∀ y • Q₁ ≡ Q₂ ) ) ⇒ ((∀ x ❙ R • (∀ y ❙ Q₁ • P ) ) ≡ (∀ x ❙ R • (∀ y ❙ Q₂ • P ) )) | 2 |
| (8.22.3) | Change of restricted dummy in ∀ | Theorem | (∀ f • (∀ g • (∀ x ❙ R • (∀ y • x = f y ≡ y = g x ) ) ⇒ ((∀ x ❙ R • P ) ≡ (∀ y ❙ R[x ≔ f y] • P[x ≔ f y] )) ) ) | 2 |
| (9.10) | Range weakening for ∀；别名：Range strengthening for ∀ | Theorem | (∀ x ❙ Q ∨ R • P ) ⇒ (∀ x ❙ Q • P ) | 2 |
| (9.11) | Body weakening for ∀；别名：Body strengthening for ∀ | Theorem | (∀ x ❙ R • P ∧ Q ) ⇒ (∀ x ❙ R • P ) | 2 |
| (9.12) | Monotonicity of ∀；别名：Body monotonicity of ∀ | Theorem | (∀ x ❙ R • Q ⇒ P ) ⇒ ((∀ x ❙ R • Q ) ⇒ (∀ x ❙ R • P )) | 2 |
| (9.12a) | Range antitonicity of ∀ | Theorem | (∀ x ❙ ¬ P • Q ⇒ R ) ⇒ ((∀ x ❙ R • P ) ⇒ (∀ x ❙ Q • P )) | 2 |
| (9.12a) | Range antitonicity of ∀ | Theorem | (∀ x • Q ⇒ R ) ⇒ ((∀ x ❙ R • P ) ⇒ (∀ x ❙ Q • P )) | 2 |
| (9.13) | Instantiation | Theorem | (∀ x • P ) ⇒ P[x ≔ E] | 2 |
| (9.13.1) | Instantiation | Theorem | (∀ x • P ) ⇒ P[x ≔ x] | 2 |
| (9.13.2) | Instantiation | Theorem | (∀ x ❙ R • P ) ⇒ (R ⇒ P)[x ≔ E] | 2 |
| (9.2) | Trading for ∀ | Axiom | (∀ x ❙ R • P ) ≡ (∀ x • R ⇒ P ) | 2 |
| (9.3a) | Trading for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x • ¬ R ∨ P ) | 2 |
| (9.3b) | Trading for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x • R ∧ P ≡ R ) | 2 |
| (9.3c) | Trading for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x • R ∨ P ≡ P ) | 2 |
| (9.4a) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • R ⇒ P ) | 2 |
| (9.4b) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • ¬ R ∨ P ) | 2 |
| (9.4c) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • R ∧ P ≡ R ) | 2 |
| (9.4d) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • R ∨ P ≡ P ) | 2 |
| (9.5) | Distributivity of ∨ over ∀ | Axiom | P ∨ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∨ Q ) | 2 |
| (9.6) | 原文未命名 | Theorem | P ∨ (∀ x • ¬ R ) ≡ (∀ x ❙ R • P ) | 2 |
| (9.7) | Distributivity of ∧ over ∀ | Theorem | ¬ (∀ x • ¬ R ) ⇒ (P ∧ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∧ Q )) | 2 |
| (9.8) | True ∀ body | Theorem | (∀ x ❙ R • true ) | 2 |
| (9.9) | Sub-distributivity of ∀ over ≡ | Theorem | (∀ x ❙ R • P ≡ Q ) ⇒ ((∀ x ❙ R • P ) ≡ (∀ x ❙ R • Q )) | 2 |
| 未编号 · 00099d | ∧₆-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ (u ⇒ p ∧ (q ∧ (r ∧ (s ∧ (t ∧ u))))))))) | 7 |
| 未编号 · 00bbcc | Less than successor | Theorem | a < suc a | 3 |
| 未编号 · 0102c0 | Identity of ≢ | Theorem | (p ≢ false) ≡ p | 8 |
| 未编号 · 03c7aa | Associativity of + | Theorem | (a + b) + c = a + (b + c) | 6 |
| 未编号 · 042fcf | Predecessor | Theorem | pred n = n - 1 | 4 |
| 未编号 · 0440d9 | Equivalence enrichment | Theorem | (p ≡ q) ⇒ ((p ⇒ r) ⇒ (p ⇒ q ∧ r)) | 7 |
| 未编号 · 05e01d | Associativity of · | Theorem | (k · m) · n = k · (m · n) | 6 |
| 未编号 · 0743d7 | Identity of · | Corollary | 1 · a = a | 1 |
| 未编号 · 08e6b7 | Monotonicity of ∧ | Theorem | (p ⇒ p') ⇒ ((q ⇒ q') ⇒ (p ∧ q ⇒ p' ∧ q')) | 7 |
| 未编号 · 0a2238 | Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ (p ∨ r ⇒ q ∨ r) | 7 |
| 未编号 · 0a4bd6 | Positivity | Theorem | pos a ≡ a ≠ 0 ∧ ¬ pos (- a) | 3 |
| 未编号 · 0c7c25 | Transitivity；别名：Transitivity of > | Theorem | a > b ∧ b > c ⇒ a > c | 1 |
| 未编号 · 0f2ed1 | Contributing conjunct to ≡ | Theorem | (p ∧ q ≡ r) ∧ p ⇒ (q ≡ r) | 7 |
| 未编号 · 0f9cba | Definition of < in terms of `suc` and ≤ | Theorem | a < b ≡ suc a ≤ b | 3 |
| 未编号 · 115bc4 | Greater than zero implies successor | Theorem | 0 < n ⇒ n = suc pred n | 3 |
| 未编号 · 119736 | Triangle with new base | Axiom | triangleArea (suc n) = suc n + triangleArea n | 3 |
| 未编号 · 123d6e | At least successor | Theorem | a > b ≡ a ≥ b + 1 | 1 |
| 未编号 · 12cef0 | Monotonicity of -；别名：≤-Monotonicity of - | Theorem | a ≤ b ⇒ a - d ≤ b - d | 1 |
| 未编号 · 1448dd | Less than successor | Theorem | a < suc b ≡ a < b ∨ a = b | 3 |
| 未编号 · 147a53 | <-Isotonicity of `suc` | Axiom | suc a < suc b ≡ a < b | 3 |
| 未编号 · 14ca91 | Conditional cancellation of subtraction | Theorem | k ≤ m ⇒ (m - k) + k = m | 3 |
| 未编号 · 157179 | Anti-isotonicity of unary minus；别名：≤-Anti-isotonicity of unary minus | Theorem | a ≤ b ≡ - b ≤ - a | 1 |
| 未编号 · 15a04b | ≤-Monotonicity of + | Corollary | a ≤ b ∧ c ≤ d ⇒ a + c ≤ b + d | 3 |
| 未编号 · 15c06f | Transitivity of = | Theorem | e = f ∧ f = g ⇒ e = g | 7 |
| 未编号 · 191b3e | Zero is least element | Axiom | 0 ≤ a | 3 |
| 未编号 · 19df80 | Zero is not one | Theorem | 0 = 1 ≡ false | 4 |
| 未编号 · 1a94c2 | <-Anti-isotonicity of unary minus | Theorem | a < b ≡ - b < - a | 1 |
| 未编号 · 1f5c61 | ≤-Monotonicity of `pred` | Theorem | a ≤ b ⇒ pred a ≤ pred b | 3 |
| 未编号 · 21290d | Multiplying the successor | Theorem | m · suc n = m · n + m | 3 |
| 未编号 · 22473d | Transitivity of > | Theorem | a > b ∧ b > c ⇒ a > c | 2 |
| 未编号 · 22c029 | Split-off top | Theorem | m ≤ n ⇒ (m ≤ i < n + 1 ≡ m ≤ i < n ∨ i = n) | 1 |
| 未编号 · 231c87 | Least greater element；别名：Successor at most、Definition of < via successor and ≤ | Theorem | a < b ≡ a + 1 ≤ b | 1 |
| 未编号 · 23785d | Adding consequent to ∧ | Theorem | (p ⇒ q) ⇒ (p ∧ r ⇒ p ∧ (q ∧ r)) | 7 |
| 未编号 · 23fe3b | Predecessor of zero | Axiom | pred 0 = 0 | 4 |
| 未编号 · 243af9 | Cancellation of `suc` | Axiom | suc m = suc n ≡ m = n | 4 |
| 未编号 · 24a375 | Definition of ≡ | Axiom | (p ≡ q) = (p = q) | 8 |
| 未编号 · 25737b | Co-residual of ∨ | Theorem | q ⇒ x ∨ p ≡ ¬ p ∧ q ⇒ x | 7 |
| 未编号 · 25a975 | Super Small Triangle | Axiom | triangleArea 0 = 0 | 3 |
| 未编号 · 266568 | Generalised one-point rule for ∀ | Theorem | R[x ≔ e] ⇒ (∀ x ❙ R ∧ x = e • E ) = E[x ≔ e] | 2 |
| 未编号 · 267c2e | Pair dummy joining for ∀ | Theorem | (∀ x : t₁; y : t₂ ❙ R • E ) = (∀ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 2 |
| 未编号 · 28ac42 | ≤-Isotonicity of - | Theorem | a ≤ b ≡ a - d ≤ b - d | 1 |
| 未编号 · 2977f6 | Proof by contradiction | Theorem | ¬ p ⇒ false ≡ p | 7 |
| 未编号 · 2989a8 | ≤-Monotonicity of + | Theorem | a ≤ b ⇒ a + d ≤ b + d | 3 |
| 未编号 · 29a570 | ∧₅-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ p ∧ (q ∧ (r ∧ (s ∧ t))))))) | 14 |
| 未编号 · 2b72bc | Definition of ∧ | Lemma | (p ∧ q) = (p ≡ (q ≡ p ∨ q)) | 8 |
| 未编号 · 2b77ed | Successor greater；别名：Definition of ≥ via successor and > | Theorem | a + 1 > b ≡ a ≥ b | 1 |
| 未编号 · 303cfc | Complement of > | Theorem | a > b ≢ a ≤ b | 1 |
| 未编号 · 309d0d | One-point rule for ∀₂；别名：Two-point rule for ∀ | Theorem | (∀ x, y ❙ x = A ∧ y = B • P ) ≡ P[x, y ≔ A, B] | 2 |
| 未编号 · 30ad60 | Trichotomy — B | Theorem | ¬ (a < b ∧ (a = b ∧ a > b)) | 1 |
| 未编号 · 31d3fa | Preserving conjunct after ⇒ | Theorem | p ∧ q ⇒ r ≡ p ∧ q ⇒ p ∧ r | 7 |
| 未编号 · 33c144 | Complement of > | Theorem | ¬ (a > b) ≡ a ≤ b | 3 |
| 未编号 · 33cf6d | Definition of ≥ | Axiom | a ≥ b ≡ b ≤ a | 3 |
| 未编号 · 351d59 | Addition is non-decreasing | Theorem | b ≤ a + b | 3 |
| 未编号 · 35a9f8 | <-Isotonicity of + | Theorem | b < c ≡ a + b < a + c | 3 |
| 未编号 · 35e920 | Split off <-≤ range at top | Theorem | m < n ⇒ (m < i ≤ n ≡ m < i < n ∨ i = n) | 1 |
| 未编号 · 3683b4 | <-Monotonicity of `pred` | Theorem | suc a < b ⇒ pred (suc a) < pred b | 3 |
| 未编号 · 38133d | Body weakening for ∀；别名：Body strengthening for ∀ | Theorem | (∀ x ❙ R • P ) ⇒ (∀ x ❙ R • Q ⇒ P ) | 2 |
| 未编号 · 3aa5d0 | Monotonicity of ⇒；别名：Right-monotonicity of ⇒ | Theorem | (p ⇒ q) ⇒ ((r ⇒ p) ⇒ (r ⇒ q)) | 7 |
| 未编号 · 3bc8d4 | Zero sum | Theorem | 0 = a + b ≡ 0 = a ∧ 0 = b | 4 |
| 未编号 · 3c3941 | Introducing fresh ∀ | Theorem | P ⇒ (∀ x ❙ R • P ) | 2 |
| 未编号 · 3ca479 | Positive implies non-zero | Theorem | pos a ⇒ a ≠ 0 | 3 |
| 未编号 · 3d1bd1 | Successor is non-decreasing | Theorem | a ≤ suc a | 3 |
| 未编号 · 3fb235 | Monus exchange | Theorem | m + (n - m) = n + (m - n) | 6 |
| 未编号 · 4163b2 | Identity of + | Corollary | 0 + a = a | 1 |
| 未编号 · 42cf57 | Left-identity of · | Theorem | 1 · n = n | 6 |
| 未编号 · 4315c0 | Transitivity of < | Theorem | a < b ⇒ (b < c ⇒ a < c) | 3 |
| 未编号 · 4364d7 | Irreflexivity of > | Theorem | a = b ⇒ ¬ (a > b) | 1 |
| 未编号 · 438c2a | Only zero is less than one | Theorem | a < 1 ≡ a = 0 | 3 |
| 未编号 · 44bb82 | Boring disjoint range split for ∀ | Theorem | (R ∧ S ≡ false) ⇒ ((∀ x ❙ R ∨ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P )) | 2 |
| 未编号 · 478166 | Right-distributivity of ⇒ over ∧₃ | Theorem | p ⇒ q ∧ (r ∧ s) ≡ (p ⇒ q) ∧ ((p ⇒ r) ∧ (p ⇒ s)) | 7 |
| 未编号 · 48118f | Split off ≤-≤ range at top | Theorem | m ≤ n ⇒ (m ≤ i ≤ n ≡ m ≤ i < n ∨ i = n) | 1 |
| 未编号 · 4881c6 | Definition of < in term of ≤ and `pred` | Theorem | suc a < b ≡ suc a ≤ pred b | 3 |
| 未编号 · 4a62c3 | Irreflexivity of < | Theorem | ¬ (a < b ∧ a = b) | 3 |
| 未编号 · 4adf37 | <-Monotonicity of + | Theorem | a < b ∧ c < d ⇒ a + c < b + d | 1 |
| 未编号 · 4b60c2 | ≤-Isotonicity of + | Theorem | a ≤ b ≡ a + d ≤ b + d | 3 |
| 未编号 · 4c677f | Identity of · | Theorem | 1 · m = m | 3 |
| 未编号 · 4e9496 | Reflexivity of ≤ | Theorem | a ≤ a | 3 |
| 未编号 · 515cec | <-Monotonicity of + | Theorem | b < c ⇒ a + b < a + c | 3 |
| 未编号 · 53a471 | Triangle Solution | Theorem | 2 · triangleArea n = n · suc n | 3 |
| 未编号 · 56906f | Converse of ≤ | Theorem | a ≥ b ≡ b ≤ a | 3 |
| 未编号 · 56ec04 | Identity of + | Theorem | 0 + a = a | 3 |
| 未编号 · 5a04f6 | ≤-Monotonicity of · | Theorem | b ≤ c ⇒ a · b ≤ a · c | 3 |
| 未编号 · 5aae8c | Definition of ≠ | Theorem | x ≠ y ≡ (x = y ≡ false) | 4 |
| 未编号 · 5c98a9 | Irreflexivity of > | Theorem | a > b ⇒ ¬ (a = b) | 1 |
| 未编号 · 5f6c2d | Symmetry of ≠ | Theorem | x ≠ y ≡ y ≠ x | 4 |
| 未编号 · 617d8f | Zero is not one | Theorem | 0 ≠ 1 | 4 |
| 未编号 · 635d6b | Irreflexivity of < | Theorem | a < b ⇒ ¬ (a = b) | 6 |
| 未编号 · 63a396 | Definition of + for `suc` | Axiom | suc m + n = suc (m + n) | 3 |
| 未编号 · 642a29 | Split off <-≤ range at bottom | Theorem | m < n ⇒ (m < i ≤ n ≡ m + 1 < i ≤ n ∨ i = m + 1) | 1 |
| 未编号 · 65abc8 | Split off ≤-<-suc range at top | Theorem | m ≤ n ⇒ (m ≤ i < n + 1 ≡ m ≤ i < n ∨ i = n) | 1 |
| 未编号 · 664fa2 | Multiplying the successor | Theorem | m · suc n = m + m · n | 3 |
| 未编号 · 667d5b | Shifting `suc` over + | Theorem | suc m + n = m + suc n | 6 |
| 未编号 · 67761d | Least greater element | Theorem | a < b ≡ a + 1 ≤ b | 1 |
| 未编号 · 679f57 | Converse of < | Axiom | a > b ≡ b < a | 3 |
| 未编号 · 680791 | Split off <-≤-suc range at bottom | Theorem | m ≤ n ⇒ (m < i ≤ n + 1 ≡ m + 1 < i ≤ n + 1 ∨ i = m + 1) | 1 |
| 未编号 · 686663 | Irreflexivity of < | Corollary | a < b ⇒ a ≠ b | 3 |
| 未编号 · 68f8b8 | Definition of · for `suc`；别名：Definition of · | Axiom | suc m · n = n + m · n | 3 |
| 未编号 · 69866c | Predecessor of successor | Axiom | pred (suc n) = n | 4 |
| 未编号 · 702635 | Subtraction from multiplication with successor | Theorem | m · suc n - m = m · n | 6 |
| 未编号 · 70f478 | ∧-Introduction | Theorem | p ⇒ (q ⇒ p ∧ q) | 7 |
| 未编号 · 7640dd | Cancellation of · | Theorem | c ≠ 0 ⇒ (c · a = c · b ≡ a = b) | 3 |
| 未编号 · 771122 | ∧₄-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ p ∧ (q ∧ (r ∧ s))))) | 7 |
| 未编号 · 78d2c4 | Irreflexivity of > | Theorem | ¬ (a > b ∧ a = b) | 1 |
| 未编号 · 7907b0 | Less than successor | Theorem | a < b + 1 ≡ a ≤ b | 1 |
| 未编号 · 794d96 | Definition of `double` | Axiom | double 0 = 0 | 3 |
| 未编号 · 79adc5 | Right-zero of · | Theorem | m · 0 = 0 | 6 |
| 未编号 · 79d90c | Left-monotonicity of ∨；别名：Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ (p ∨ r ⇒ q ∨ r) | 7 |
| 未编号 · 79e5c6 | Cancellation of + | Theorem | k + m = k + n ≡ m = n | 4 |
| 未编号 · 7d8ebb | Distributivity of · over subtraction | Theorem | k · (m - n) = k · m - k · n | 6 |
| 未编号 · 7df813 | ≤-Monotonicity of + | Theorem | a ≤ b ⇒ (c ≤ d ⇒ a + c ≤ b + d) | 3 |
| 未编号 · 80d993 | Cancellation of multiplication with successor | Theorem | suc c · a = suc c · b ≡ a = b | 3 |
| 未编号 · 81f366 | Definition of + for 0；别名：Left-identity of + | Axiom | 0 + n = n | 3 |
| 未编号 · 831dfd | Split off ≤-≤ range at bottom | Theorem | m ≤ n ⇒ (m ≤ i ≤ n ≡ i = m ∨ m + 1 ≤ i ≤ n) | 1 |
| 未编号 · 833547 | Subtraction of zero from successor | Axiom | suc m - 0 = suc m | 6 |
| 未编号 · 857ba4 | Predecessor of non-zero | Theorem | n ≠ 0 ≡ suc pred  n = n | 1 |
| 未编号 · 8654fd | Definition of ≤ in terms of < | Theorem | a ≤ b ≡ a < b ∨ a = b | 3 |
| 未编号 · 86a35c | Abbreviated replacement in ∧；别名：Abbreviated replacement | Theorem | P ∧ x = E ≡ P[x ≔ E] ∧ x = E | 7 |
| 未编号 · 874365 | Empty range <_< | Theorem | a < b < a ≡ false | 1 |
| 未编号 · 8876d6 | Case shuffling | Theorem | (p ∨ q) ∧ (¬ p ∨ r) ≡ (p ∧ r) ∨ (¬ p ∧ q) | 7 |
| 未编号 · 88e9cd | Two-sided ≤-Monotonicity of +；别名：≤-Monotonicity of + | Theorem | a ≤ b ∧ c ≤ d ⇒ a + c ≤ b + d | 1 |
| 未编号 · 896ef9 | ≤-Isotonicity of + | Theorem | a + b ≤ a + c ≡ b ≤ c | 3 |
| 未编号 · 89a5cf | Irreflexivity of < | Corollary | ¬ (a < a) | 3 |
| 未编号 · 8a20aa | Definition of · for 0 | Axiom | 0 · n = 0 | 3 |
| 未编号 · 8c8ad4 | Self-cancellation of subtraction | Theorem | m - m = 0 | 6 |
| 未编号 · 8d2697 | Subtraction is non-increasing | Theorem | a - b ≤ a | 3 |
| 未编号 · 8f45e9 | Monotonicity of ·；别名：≤-Isotonicity of · | Theorem | 0 < d ⇒ (a ≤ b ≡ a · d ≤ b · d) | 1 |
| 未编号 · 90956c | ⇒-Introduction | Primitive inference rule | ( p ⊦ q ) ⊦ p ⇒ q | 7 |
| 未编号 · 9285e7 | <-≤-Transitivity；别名：Transitivity of < with ≤ | Theorem | k < m ≤ n ⇒ k < n | 3 |
| 未编号 · 94d527 | Weakening；别名：Strengthening | Theorem | (p ∨ q) ∧ r ⇒ p ∨ (q ∧ r) | 7 |
| 未编号 · 94f30a | ∧₇-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ (u ⇒ (v ⇒ p ∧ (q ∧ (r ∧ (s ∧ (t ∧ (u ∧ v))))))))))) | 7 |
| 未编号 · 95e67e | Successor is not at most zero | Axiom | suc a ≤ 0 ≡ false | 3 |
| 未编号 · 98ac7b | Definition of +；别名：Left-identity of +、Definition of + for 0 | Axiom | 0 + n = n | 3 |
| 未编号 · 9941d0 | ∧₃-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ p ∧ (q ∧ r))) | 7 |
| 未编号 · 9afd85 | Zero product | Theorem | 0 = a · b ≡ 0 = a ∨ 0 = b | 4 |
| 未编号 · 9b24b5 | ≤ cases | Theorem | a ≤ b ≡ a = b ∨ suc a ≤ b | 3 |
| 未编号 · 9cb45b | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 7 |
| 未编号 · 9cd73a | Definition of ≠ | Axiom | x ≠ y ≡ ¬ (x = y) | 4 |
| 未编号 · 9dff39 | <-Monotonicity of + | Theorem | a < b ⇒ a + d < b + d | 3 |
| 未编号 · 9eb4a8 | Body weakening for ∀；别名：Body strengthening for ∀ | Theorem | (∀ x ❙ R • P ) ⇒ (∀ x ❙ R • P ∨ Q ) | 2 |
| 未编号 · a13a80 | Split off <-≤-suc range at top | Theorem | m ≤ n ⇒ (m < i ≤ n + 1 ≡ m < i ≤ n ∨ i = n + 1) | 1 |
| 未编号 · a2a32a | Disjunction as implication | Lemma | p ∨ q ≡ ¬ p ⇒ q | 7 |
| 未编号 · a31008 | Pair dummy splitting for ∀ | Theorem | (∀ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∀ x : t₁; y : t₂ ❙ R[p ≔ ⟨x, y⟩] • E[p ≔ ⟨x, y⟩] ) | 2 |
| 未编号 · a34a19 | Definition of +；别名：Addition of successor、Definition of + for `suc` | Axiom | suc m + n = suc (m + n) | 3 |
| 未编号 · a56b54 | Fresh ∀ | Theorem | P ≡ (∀ x • P ) | 2 |
| 未编号 · a67f50 | Definition of · for 0；别名：Definition of ·、Left-zero of · | Axiom | 0 · n = 0 | 3 |
| 未编号 · a7321a | Predecessor is non-increasing | Theorem | pred a ≤ a | 3 |
| 未编号 · a8733b | Pair dummy joining for ∀ | Theorem | (∀ x : t₁ • (∀ y : t₂ ❙ R • E ) ) = (∀ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 2 |
| 未编号 · a967ba | Irreflexivity of < | Theorem | ¬ (a < a) | 3 |
| 未编号 · a9ba81 | Irreflexivity of < | Theorem | a = b ⇒ ¬ (a < b) | 3 |
| 未编号 · adbb13 | Split-off bottom | Theorem | m ≤ n ⇒ (m ≤ i < n + 1 ≡ m + 1 ≤ i < n + 1 ∨ i = m) | 1 |
| 未编号 · afc42a | Predecessor of non-zero | Theorem | n ≠ 0 ⇒ suc pred n = n | 3 |
| 未编号 · b02619 | Trichotomy；别名：Trichotomy — ∨ | Theorem | a < b ∨ (a = b ∨ a > b) | 1 |
| 未编号 · b103d7 | Right-distributivity of ⇒ over ∧₄ | Theorem | p ⇒ q ∧ (r ∧ (s ∧ t)) ≡ (p ⇒ q) ∧ ((p ⇒ r) ∧ ((p ⇒ s) ∧ (p ⇒ t))) | 7 |
| 未编号 · b24ac7 | Right-identity of subtraction | Theorem | m - 0 = m | 6 |
| 未编号 · b27a0c | Empty range ≤_< | Theorem | a ≤ b < a ≡ false | 1 |
| 未编号 · b30260 | ≤-Isotonicity of `suc` | Axiom | suc a ≤ suc b ≡ a ≤ b | 3 |
| 未编号 · b5dc15 | Distributivity of · over + | Theorem | (k + m) · n = k · n + m · n | 3 |
| 未编号 · b77dec | Abbreviated replacement in ⇒；别名：Abbreviated replacement | Theorem | x = E ⇒ P ≡ x = E ⇒ P[x ≔ E] | 7 |
| 未编号 · b86f5e | Irreflexivity of > | Theorem | ¬ (a > a) | 3 |
| 未编号 · b8a06d | Exclusive or implies inclusive | Theorem | (p ≢ q) ⇒ p ∨ q | 7 |
| 未编号 · b8d351 | Split off ≤-≤ range at bottom | Theorem | m ≤ n ⇒ (m ≤ i ≤ n ≡ i = m ∨ m < i ≤ n) | 1 |
| 未编号 · b9254e | ≤ preserves non-zero | Theorem | a ≤ b ⇒ (a ≠ 0 ⇒ b ≠ 0) | 6 |
| 未编号 · b9d13e | Subtraction from zero | Axiom | 0 - n = 0 | 6 |
| 未编号 · ba79d6 | Successor greater | Theorem | a + 1 > b ≡ a ≥ b | 1 |
| 未编号 · bac8f9 | Right-identity of + | Theorem | m + 0 = m | 6 |
| 未编号 · bb17de | Less than successor；别名：Definition of ≤ via < and successor | Theorem | a < b + 1 ≡ a ≤ b | 1 |
| 未编号 · bb8c8b | Asymmetry of < | Theorem | a < b ⇒ ¬ (b < a) | 3 |
| 未编号 · bb97a0 | Negation of ≠ | Theorem | ¬ (x ≠ y) ≡ x = y | 4 |
| 未编号 · bdf087 | Antitonicity of ¬ | Theorem | (p ⇒ q) ⇒ (¬ q ⇒ ¬ p) | 7 |
| 未编号 · bea6de | Zero of · | Theorem | m · 0 = 0 | 3 |
| 未编号 · bf397f | Empty range <_< | Theorem | a < b < a ⇒ false | 1 |
| 未编号 · bf49ff | ≤-Antitonicity of - | Theorem | b ≤ c ⇒ a - c ≤ a - b | 3 |
| 未编号 · bf62e0 | Antitonicity of unary minus；别名：≤-Antitonicity of unary minus | Theorem | a ≤ b ⇒ - b ≤ - a | 1 |
| 未编号 · c0390b | Distributivity of ⇒ over ∀ | Theorem | P ⇒ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ⇒ Q ) | 2 |
| 未编号 · c0e057 | Leibniz for ∀ body | Theorem | (∀ x • P₁ ≡ P₂ ) ⇒ ((∀ x ❙ R • P₁ ) ≡ (∀ x ❙ R • P₂ )) | 2 |
| 未编号 · c11d51 | <-Monotonicity of + | Theorem | a < b ⇒ (c < d ⇒ a + c < b + d) | 3 |
| 未编号 · c28972 | Nothing is less than zero | Axiom | a < 0 ≡ false | 3 |
| 未编号 · c4eac8 | Range weakening for ∀；别名：Range strengthening for ∀ | Theorem | (∀ x ❙ Q • P ) ⇒ (∀ x ❙ Q ∧ R • P ) | 2 |
| 未编号 · c506fd | Leibniz for ∀ body | Theorem | (∀ x ❙ R • P₁ ≡ P₂ ) ⇒ ((∀ x ❙ R • P₁ ) ≡ (∀ x ❙ R • P₂ )) | 2 |
| 未编号 · c54066 | Irreflexivity of < | Theorem | a < a ≡ false | 3 |
| 未编号 · c5667b | Definition of `double` | Axiom | double (suc n) = 2 + double n | 3 |
| 未编号 · c5d450 | Complement of < | Theorem | ¬ (a < b) ≡ a ≥ b | 3 |
| 未编号 · c793cd | Empty range <_≤ | Theorem | a < b ≤ a ≡ false | 1 |
| 未编号 · c8301e | Simple body-monotonicity of ∀ | Theorem | (∀ x • P ⇒ Q ) ⇒ ((∀ x ❙ R • P ) ⇒ (∀ x ❙ R • Q )) | 2 |
| 未编号 · c8e678 | <-Antitonicity of unary minus | Theorem | a < b ⇒ - b < - a | 1 |
| 未编号 · cab2ec | Doubling | Theorem | double n = n + n | 3 |
| 未编号 · cac6ec | Positivity of 1 | Corollary | pos 1 | 3 |
| 未编号 · cbd6b0 | Zero is not product of successors | Lemma | suc a · suc b = 0 ≡ false | 3 |
| 未编号 · cc3374 | Antisymmetry of ≤ | Theorem | a ≤ b ⇒ (b ≤ a ⇒ a = b) | 7 |
| 未编号 · cc8feb | Trichotomy — A | Theorem | a < b ≡ (a = b ≡ a > b) | 1 |
| 未编号 · cd3ffc | Inclusion of < in ≤ | Theorem | a < b ⇒ a ≤ b | 3 |
| 未编号 · cd7d15 | Adding the successor | Theorem | m + suc n = suc (m + n) | 3 |
| 未编号 · cdba4a | Asymmetry of < | Theorem | ¬ (a < b ∧ b < a) | 3 |
| 未编号 · ce5ae3 | Residual of ∧ | Theorem | x ∧ p ⇒ q ≡ x ⇒ (p ⇒ q) | 7 |
| 未编号 · d0a211 | Definition of · for `suc` | Axiom | suc m · n = n + m · n | 3 |
| 未编号 · d14899 | Subtraction of successor from successor | Axiom | suc m - suc n = m - n | 6 |
| 未编号 · d18f46 | Definition of ≤ in terms of `suc` and < | Theorem | a ≤ b ≡ a < suc b | 3 |
| 未编号 · d2c2dc | Distributivity of · over + | Theorem | k · (m + n) = k · m + k · n | 3 |
| 未编号 · d46e7c | Zero is unique least element | Theorem | a ≤ 0 ≡ a = 0 | 3 |
| 未编号 · d64a69 | Zero is not successor | Theorem | 0 ≠ suc n | 4 |
| 未编号 · d67a9f | Subtraction after addition | Theorem | (m + n) - n = m | 6 |
| 未编号 · d74161 | Greater zero via ≠ | Theorem | 0 < n ≡ n ≠ 0 | 3 |
| 未编号 · d80818 | At least successor；别名：Definition of > via ≥ and successor | Theorem | a > b ≡ a ≥ b + 1 | 1 |
| 未编号 · d8b322 | Indirect irreflexivity of < | Theorem | a = b ⇒ (a < b ≡ false) | 3 |
| 未编号 · dc6849 | Adding equations | Theorem | a₁ = b₁ ∧ a₂ = b₂ ⇒ a₁ + a₂ = b₁ + b₂ | 3 |
| 未编号 · dd496d | Zero is <-least element | Theorem | 0 < a ∨ 0 = a | 3 |
| 未编号 · de8a1e | Antitonicity of -；别名：≤-Antitonicity of - | Theorem | c ≤ b ⇒ a - b ≤ a - c | 1 |
| 未编号 · df7705 | Zero of · | Corollary | 0 · a = 0 | 1 |
| 未编号 · e18e5f | Irreflexivity of ≠ | Theorem | x ≠ x ≡ false | 4 |
| 未编号 · e1f012 | Zero is not successor | Axiom | 0 = suc n ≡ false | 4 |
| 未编号 · e2dbad | One-point rule for ∀₂² | Theorem | (∀ x, y ❙ y = B ∧ R • P ) ≡ (∀ x ❙ R[y ≔ B] • P[y ≔ B] ) | 2 |
| 未编号 · e364a1 | Antitonicity of ⇒；别名：Left-antitonicity of ⇒ | Theorem | (p ⇒ q) ⇒ ((q ⇒ r) ⇒ (p ⇒ r)) | 7 |
| 未编号 · e44908 | Successor | Theorem | suc n = n + 1 | 7 |
| 未编号 · e4ace3 | Zero or successor of predecessor | Theorem | n = 0 ∨ n = suc pred n | 3 |
| 未编号 · e5bad3 | Least positive | Axiom | pos a ≡ 1 ≤ a | 2 |
| 未编号 · e76f05 | Indirect irreflexivity of < | Corollary | a = b ⇒ ¬ (a < b) | 3 |
| 未编号 · e81b8f | Subtraction of sum | Theorem | k - (m + n) = (k - m) - n | 6 |
| 未编号 · e887d4 | Non-zero multiplication | Theorem | a ≠ 0 ⇒ (b ≠ 0 ⇒ a · b ≠ 0) | 12 |
| 未编号 · e9fe3f | Definition of 1 | Theorem | 1 = suc 0 | 3 |
| 未编号 · ec42a2 | Greater than zero means successor | Theorem | 0 < n ≡ n = suc pred n | 3 |
| 未编号 · ec8ec7 | Split off ≤-<-suc range at bottom | Theorem | m ≤ n ⇒ (m ≤ i < n + 1 ≡ m + 1 ≤ i < n + 1 ∨ i = m) | 1 |
| 未编号 · ef0d0c | Zero is less than successor | Axiom | 0 < suc a | 3 |
| 未编号 · ef374b | Symmetry of · | Theorem | m · n = n · m | 6 |
| 未编号 · efb2f4 | Symmetry of + | Theorem | m + n = n + m | 6 |
| 未编号 · f1d779 | Cancellation of ¬ | Theorem | (¬ p ≡ ¬ q) = (p ≡ q) | 8 |
| 未编号 · f226ab | Transitivity of ≤ | Theorem | a ≤ b ⇒ (b ≤ c ⇒ a ≤ c) | 6 |
| 未编号 · f245f4 | One-point rule for ∀₂¹ | Theorem | (∀ x, y ❙ x = A ∧ R • P ) ≡ (∀ y ❙ R • P )[x ≔ A] | 2 |
| 未编号 · f2bb9d | ≤-<-Transitivity；别名：Transitivity of ≤ with < | Lemma | a ≤ b ∧ b < c ⇒ a < c | 3 |
| 未编号 · f4948f | Case shuffling | Theorem | (p ⇒ q) ∧ (¬ p ⇒ r) ≡ (p ∧ q) ∨ (¬ p ∧ r) | 7 |
| 未编号 · f55b13 | Nothing is less than zero | Corollary | ¬ (a < 0) | 3 |
| 未编号 · f651fd | Converse of < | Theorem | a > b ≡ b < a | 3 |
| 未编号 · f6c4f5 | Cancellation of subtraction by addition | Theorem | m ≤ n ≡ (n - m) + m = n | 3 |
| 未编号 · f8a195 | Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ ((r ⇒ s) ⇒ (p ∨ r ⇒ q ∨ s)) | 14 |
| 未编号 · f93139 | Irreflexivity of ≠ | Theorem | ¬ (x ≠ x) | 4 |
| 未编号 · fa5564 | Cancellation of unary minus | Theorem | - a = - b ≡ a = b | 3 |
| 未编号 · fb7322 | Split off ≤-< range at bottom | Theorem | m < n ⇒ (m ≤ i < n ≡ m + 1 ≤ i < n ∨ i = m) | 1 |
| 未编号 · fbf6ed | ≤-Monotonicity of - | Theorem | a ≤ b ⇒ a - c ≤ b - c | 3 |
| 未编号 · fd7261 | Anti-isotonicity of -；别名：≤-Anti-isotonicity of - | Theorem | c ≤ b ≡ a - b ≤ a - c | 1 |
| 未编号 · fdb8c0 | Pair dummy splitting for ∀ | Theorem | (∀ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∀ a : t₁ • (∀ b : t₂ ❙ R[p ≔ ⟨a, b⟩] • E[p ≔ ⟨a, b⟩] ) ) | 2 |
| 未编号 · fe9fa0 | Complement of < | Theorem | a < b ≢ a ≥ b | 1 |

## 2025 · Week 6

对应 notebook：[2025i Exercise 6.1: Introduction to Sequences · 预载列表](http://130.113.68.214:15052/), [2025i Exercise 6.2: Sequences Continued · 预载列表](http://130.113.68.214:15053/), [2025i Exercise 6.3: Practice with ∀ and ∃ · 预载列表](http://130.113.68.214:15054/), [2025i Exercise 6.4: Indirect Equality, Maximum, and Minimum on ℤ · 预载列表](http://130.113.68.214:15055/), [2025i Exercise 6.5: “Mixed Monotonicity” · 预载列表](http://130.113.68.214:15056/), [2025i Exercise 6.6: Correctness of `while` Loops · 预载列表](http://130.113.68.214:15057/), [HW09 · CalcCheck preloaded theorem list](http://130.113.68.214:15028/), [HW13 · CalcCheck preloaded theorem list](http://130.113.68.214:15051/)

| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |
|---|---|---|---|---:|
| (1.2) | Reflexivity of = | Axiom | x = x | 11 |
| (1.3) | Symmetry of = | Axiom | (x = y) = (y = x) | 11 |
| (1.4) | Transitivity of = | Derived inference rule | X = Y , Y = Z ⊦ X = Z | 11 |
| (1.5) | Leibniz | Derived inference rule | X = Y ⊦ E[z ≔ X] = E[z ≔ Y] | 11 |
| (13.12) | Definition of ▹ for 𝜖 | Axiom | 𝜖 ▹ a = a ◃ 𝜖 | 1 |
| (13.13) | Definition of ▹ for ◃ | Axiom | (a ◃ s) ▹ b = a ◃ (s ▹ b) | 1 |
| (13.14) | Snoc is not empty | Theorem | xs ▹ x ≠ 𝜖 | 1 |
| (13.17) | Left-identity of ⌢；别名：Definition of ⌢ for 𝜖 | Axiom | 𝜖 ⌢ ys = ys | 1 |
| (13.18) | Mutual associativity of ◃ with ⌢；别名：Definition of ⌢ for ◃ | Axiom | (x ◃ xs) ⌢ ys = x ◃ (xs ⌢ ys) | 1 |
| (13.19) | Right-identity of ⌢ | Theorem | xs ⌢ 𝜖 = xs | 1 |
| (13.20) | Associativity of ⌢ | Theorem | (xs ⌢ ys) ⌢ zs = xs ⌢ (ys ⌢ zs) | 1 |
| (13.23) | Empty concatenation | Theorem | xs ⌢ ys = 𝜖 ≡ xs = 𝜖 ∧ ys = 𝜖 | 1 |
| (13.3) | Cons is not empty | Axiom | x ◃ xs ≠ 𝜖 | 1 |
| (13.4) | Cancellation of ◃ | Axiom | x ◃ xs = y ◃ ys ≡ x = y ∧ xs = ys | 1 |
| (15.13) | Unary minus | Axiom | a + - a = 0 | 8 |
| (15.14) | Subtraction | Axiom | a - b = a + - b | 8 |
| (15.17) | Self-inverse of unary minus | Theorem | - (- a) = a | 8 |
| (15.18) | Fixpoint of unary minus | Theorem | - 0 = 0 | 8 |
| (15.19) | Distributivity of unary minus over + | Theorem | - (a + b) = - a + - b | 8 |
| (15.1a) | Associativity of + | Axiom | (a + b) + c = a + (b + c) | 8 |
| (15.1b) | Associativity of · | Axiom | (a · b) · c = a · (b · c) | 8 |
| (15.20) | Negation as multiplication | Theorem | - a = - 1 · a | 8 |
| (15.21) | 原文未命名 | Theorem | - a · b = a · - b | 8 |
| (15.22) | Commutativity of unary minus with · | Theorem | a · - b = - (a · b) | 8 |
| (15.23) | 原文未命名 | Theorem | - a · - b = a · b | 8 |
| (15.24) | Right-identity of - | Theorem | a - 0 = a | 8 |
| (15.24a) | Subtraction of subtraction | Theorem | a - (b - c) = (a - b) + c | 8 |
| (15.25) | 原文未命名 | Theorem | (a - b) + (c - d) = (a + c) - (b + d) | 8 |
| (15.25a) | Mutual associativity of + and - | Theorem | a + (b - c) = (a + b) - c | 8 |
| (15.25b) | Subtraction of addition | Theorem | a - (b + c) = (a - b) - c | 8 |
| (15.25c) | Cancellation across added subtractions | Theorem | (a - b) + (b - c) = a - c | 8 |
| (15.26) | 原文未命名 | Theorem | (a - b) - (c - d) = (a + d) - (b + c) | 8 |
| (15.27) | 原文未命名 | Theorem | (a - b) · (c - d) = (a · c + b · d) - (a · d + b · c) | 8 |
| (15.29) | Distributivity of · over - | Theorem | (a - b) · c = a · c - b · c | 8 |
| (15.2a) | Symmetry of + | Axiom | a + b = b + a | 8 |
| (15.2b) | Symmetry of · | Axiom | a · b = b · a | 8 |
| (15.3) | Additive identity；别名：Identity of + | Axiom | 0 + a = a | 8 |
| (15.30) | Positivity under + | Axiom | pos a ∧ pos b ⇒ pos (a + b) | 7 |
| (15.30a) | Positivity under + | Theorem | pos a ⇒ (pos b ⇒ pos (a + b)) | 7 |
| (15.31) | Positivity under · | Axiom | pos a ∧ pos b ⇒ pos (a · b) | 7 |
| (15.31a) | Positivity under · | Theorem | pos a ⇒ (pos b ⇒ pos (a · b)) | 7 |
| (15.32) | Non-positivity of 0 | Axiom | ¬ pos 0 | 7 |
| (15.33) | Positivity under unary minus | Axiom | b ≠ 0 ⇒ (pos b ≡ ¬ pos (- b)) | 7 |
| (15.33a) | Positivity under unary minus | Theorem | b ≠ 0 ⇒ (pos b ≢ pos (- b)) | 7 |
| (15.33b) | Positivity under unary minus | Theorem | b ≠ 0 ⇒ (pos (- b) ≡ ¬ pos b) | 7 |
| (15.33c) | Positivity under unary minus | Theorem | (pos (- b) ≡ pos b) ⇒ b = 0 | 7 |
| (15.34) | Positivity of squares | Theorem | b ≠ 0 ⇒ pos (b · b) | 7 |
| (15.35) | Positivity under positive · | Theorem | pos a ⇒ (pos b ≡ pos (a · b)) | 7 |
| (15.36) | Less；别名：Definition of < | Axiom | a < b ≡ pos (b - a) | 7 |
| (15.37) | Greater；别名：Definition of > | Axiom | a > b ≡ pos (a - b) | 7 |
| (15.38) | At most；别名：Definition of ≤ | Axiom | a ≤ b ≡ a < b ∨ a = b | 7 |
| (15.39) | At least；别名：Definition of ≥ | Axiom | a ≥ b ≡ a > b ∨ a = b | 7 |
| (15.4) | Multiplicative identity；别名：Identity of · | Axiom | 1 · a = a | 8 |
| (15.40) | Positive elements | Theorem | pos b ≡ 0 < b | 7 |
| (15.41a) | Transitivity；别名：Transitivity of < | Theorem | a < b ∧ b < c ⇒ a < c | 7 |
| (15.41b) | Transitivity；别名：Transitivity of ≤ with < | Theorem | a ≤ b ∧ b < c ⇒ a < c | 7 |
| (15.41c) | Transitivity；别名：Transitivity of < with ≤ | Theorem | a < b ∧ b ≤ c ⇒ a < c | 7 |
| (15.41d) | Transitivity；别名：Transitivity of ≤ | Theorem | a ≤ b ∧ b ≤ c ⇒ a ≤ c | 7 |
| (15.42) | <-Isotonicity of + | Theorem | a < b ≡ a + d < b + d | 7 |
| (15.42) | Monotonicity of ·；别名：<-Isotonicity of · | Theorem | 0 < d ⇒ (a < b ≡ a · d < b · d) | 3 |
| (15.44) | Trichotomy | Theorem | (a < b ≡ (a = b ≡ a > b)) ∧ ¬ (a < b ∧ (a = b ∧ a > b)) | 7 |
| (15.44A) | Trichotomy — A | Theorem | a < b ≡ (a = b ≡ a > b) | 4 |
| (15.44B) | Trichotomy — B | Theorem | ¬ (a < b ∧ (a = b ∧ a > b)) | 4 |
| (15.45) | Antisymmetry of ≤ | Theorem | a ≤ b ∧ b ≤ a ≡ a = b | 3 |
| (15.46) | Reflexivity of ≤ | Theorem | a ≤ a | 3 |
| (15.5) | Distributivity of · over + | Axiom | a · (b + c) = a · b + a · c | 8 |
| (15.7) | Cancellation of · | Axiom | c ≠ 0 ⇒ (c · a = c · b ≡ a = b) | 13 |
| (15.8) | Cancellation of + | Axiom | a + b = a + c ≡ b = c | 13 |
| (15.9) | Zero of · | Axiom | a · 0 = 0 | 8 |
| (3.1) | Associativity of ≡ | Axiom | ((p ≡ q) ≡ r) ≡ (p ≡ (q ≡ r)) | 8 |
| (3.10) | Definition of ≢ | Axiom | (p ≢ q) ≡ ¬ (p ≡ q) | 8 |
| (3.11) | ¬ connection | Theorem | ¬ p ≡ (q ≡ (p ≡ ¬ q)) | 8 |
| (3.12) | Double negation | Theorem | ¬ (¬ p) ≡ p | 8 |
| (3.13) | Negation of `false` | Theorem | ¬ false ≡ true | 8 |
| (3.14) | 原文未命名 | Theorem | (p ≢ q) ≡ (¬ p ≡ q) | 8 |
| (3.15) | Definition of ¬ from ≡ | Theorem | ¬ p ≡ (p ≡ false) | 8 |
| (3.16) | Symmetry of ≢ | Theorem | (p ≢ q) ≡ (q ≢ p) | 8 |
| (3.17) | Associativity of ≢ | Theorem | ((p ≢ q) ≢ r) ≡ (p ≢ (q ≢ r)) | 8 |
| (3.18) | Mutual associativity of ≡ with ≢ | Theorem | ((p ≢ q) ≡ r) ≡ (p ≢ (q ≡ r)) | 8 |
| (3.19) | Mutual interchangeability of ≡ with ≢ | Theorem | (p ≢ (q ≡ r)) ≡ (p ≡ (q ≢ r)) | 8 |
| (3.2) | Symmetry of ≡ | Axiom | (p ≡ q) ≡ (q ≡ p) | 8 |
| (3.24) | Symmetry of ∨ | Axiom | p ∨ q ≡ q ∨ p | 8 |
| (3.25) | Associativity of ∨ | Axiom | (p ∨ q) ∨ r ≡ p ∨ (q ∨ r) | 8 |
| (3.26) | Idempotency of ∨ | Axiom | p ∨ p ≡ p | 8 |
| (3.27) | Distributivity of ∨ over ≡ | Axiom | p ∨ (q ≡ r) ≡ (p ∨ q ≡ p ∨ r) | 8 |
| (3.28) | Excluded middle；别名：LEM | Axiom | p ∨ ¬ p | 8 |
| (3.29) | Zero of ∨ | Theorem | p ∨ true ≡ true | 8 |
| (3.3) | Identity of ≡ | Axiom | true ≡ (q ≡ q) | 8 |
| (3.30) | Identity of ∨ | Theorem | p ∨ false ≡ p | 8 |
| (3.31) | Distributivity of ∨ over ∨ | Theorem | p ∨ (q ∨ r) ≡ (p ∨ q) ∨ (p ∨ r) | 8 |
| (3.32) | 原文未命名 | Theorem | p ∨ q ≡ (p ∨ ¬ q ≡ p) | 8 |
| (3.35) | Golden rule | Axiom | p ∧ q ≡ (p ≡ (q ≡ p ∨ q)) | 8 |
| (3.36) | Symmetry of ∧ | Theorem | p ∧ q ≡ q ∧ p | 8 |
| (3.37) | Associativity of ∧ | Theorem | (p ∧ q) ∧ r ≡ p ∧ (q ∧ r) | 8 |
| (3.38) | Idempotency of ∧ | Theorem | p ∧ p ≡ p | 8 |
| (3.39) | Identity of ∧ | Theorem | p ∧ true ≡ p | 8 |
| (3.4) | 原文未命名 | Theorem | true | 8 |
| (3.40) | Zero of ∧ | Theorem | p ∧ false ≡ false | 8 |
| (3.41) | Distributivity of ∧ over ∧ | Theorem | p ∧ (q ∧ r) ≡ (p ∧ q) ∧ (p ∧ r) | 8 |
| (3.42) | Contradiction | Theorem | p ∧ ¬ p ≡ false | 8 |
| (3.43a) | Absorption | Theorem | p ∧ (p ∨ q) ≡ p | 8 |
| (3.43b) | Absorption | Theorem | p ∨ (p ∧ q) ≡ p | 8 |
| (3.44a) | Absorption | Theorem | p ∧ (¬ p ∨ q) ≡ p ∧ q | 8 |
| (3.44b) | Absorption | Theorem | p ∨ (¬ p ∧ q) ≡ p ∨ q | 8 |
| (3.44c) | Absorption | Theorem | ¬ p ∧ (p ∨ q) ≡ ¬ p ∧ q | 8 |
| (3.44d) | Absorption | Theorem | ¬ p ∨ (p ∧ q) ≡ ¬ p ∨ q | 8 |
| (3.45) | Distributivity of ∨ over ∧ | Theorem | p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r) | 8 |
| (3.46) | Distributivity of ∧ over ∨ | Theorem | p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r) | 8 |
| (3.47a) | De Morgan | Theorem | ¬ (p ∧ q) ≡ ¬ p ∨ ¬ q | 8 |
| (3.47b) | De Morgan | Theorem | ¬ (p ∨ q) ≡ ¬ p ∧ ¬ q | 8 |
| (3.47c) | De Morgan | Theorem | ¬ (¬ p ∧ q) ≡ p ∨ ¬ q | 8 |
| (3.47d) | De Morgan | Theorem | ¬ (¬ p ∨ q) ≡ p ∧ ¬ q | 8 |
| (3.47e) | De Morgan dual of ∧ | Theorem | ¬ (¬ p ∧ ¬ q) ≡ p ∨ q | 8 |
| (3.47f) | De Morgan dual of ∨ | Theorem | ¬ (¬ p ∨ ¬ q) ≡ p ∧ q | 8 |
| (3.48) | 原文未命名 | Theorem | p ∧ q ≡ (p ∧ ¬ q ≡ ¬ p) | 8 |
| (3.49) | Semi-distributivity of ∧ over ≡ | Theorem | p ∧ (q ≡ r) ≡ (p ∧ q ≡ (p ∧ r ≡ p)) | 8 |
| (3.5) | Reflexivity of ≡ | Theorem | p ≡ p | 8 |
| (3.50) | Strong modus ponens for ≡ | Theorem | p ∧ (q ≡ p) ≡ p ∧ q | 8 |
| (3.51) | Replacement | Theorem | (p ≡ q) ∧ (r ≡ p) ≡ (p ≡ q) ∧ (r ≡ q) | 8 |
| (3.52) | Alternative definition of ≡ | Theorem | p ≡ (q ≡ (p ∧ q) ∨ (¬ p ∧ ¬ q)) | 8 |
| (3.53) | Exclusive or；别名：Alternative definition of ≢ | Theorem | (p ≢ q) ≡ (¬ p ∧ q) ∨ (p ∧ ¬ q) | 8 |
| (3.55) | 原文未命名 | Theorem | (p ∧ q) ∧ r ≡ (p ≡ (q ≡ (r ≡ (p ∨ q ≡ (q ∨ r ≡ (r ∨ p ≡ p ∨ (q ∨ r))))))) | 8 |
| (3.57) | Definition of ⇒ via ∨；别名：Definition of ⇒ from ∨、Definition of ⇒、Definition of implication | Axiom | p ⇒ q ≡ (p ∨ q ≡ q) | 8 |
| (3.57=) | Implication via ∨ | Lemma | (p ⇒ q) = (p ∨ q ≡ q) | 8 |
| (3.58) | Definition of ⇐；别名：Consequence | Axiom | p ⇐ q ≡ q ⇒ p | 8 |
| (3.59) | Material implication；别名：Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ ¬ p ∨ q | 8 |
| (3.60) | Definition of ⇒ via ∧；别名：Definition of ⇒ from ∧、Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ (p ∧ q ≡ p) | 8 |
| (3.60=) | Implication via ∧ | Lemma | (p ⇒ q) = (p ∧ q ≡ p) | 8 |
| (3.61) | Contrapositive | Theorem | p ⇒ q ≡ ¬ q ⇒ ¬ p | 8 |
| (3.61.1) | ¬-connection for ⇒ | Theorem | p ⇒ ¬ q ≡ q ⇒ ¬ p | 8 |
| (3.61.2) | ¬-connection for ⇒ | Theorem | ¬ p ⇒ q ≡ ¬ q ⇒ p | 8 |
| (3.62) | 原文未命名 | Theorem | p ⇒ (q ≡ r) ≡ (p ∧ q ≡ p ∧ r) | 8 |
| (3.63) | Distributivity of ⇒ over ≡ | Theorem | p ⇒ (q ≡ r) ≡ (p ⇒ q ≡ p ⇒ r) | 8 |
| (3.64) | Self-distributivity of ⇒ | Theorem | p ⇒ (q ⇒ r) ≡ (p ⇒ q) ⇒ (p ⇒ r) | 8 |
| (3.65) | Shunting | Theorem | p ∧ q ⇒ r ≡ p ⇒ (q ⇒ r) | 8 |
| (3.66) | Strong modus ponens | Theorem | p ∧ (p ⇒ q) ≡ p ∧ q | 8 |
| (3.67) | 原文未命名 | Theorem | p ∧ (q ⇒ p) ≡ p | 8 |
| (3.68) | 原文未命名 | Theorem | p ∨ (p ⇒ q) ≡ true | 8 |
| (3.69) | 原文未命名 | Theorem | p ∨ (q ⇒ p) ≡ q ⇒ p | 8 |
| (3.70) | 原文未命名 | Theorem | p ∨ q ⇒ p ∧ q ≡ (p ≡ q) | 8 |
| (3.71) | Reflexivity of ⇒ | Theorem | p ⇒ p | 8 |
| (3.72) | Right-zero of ⇒；别名：ex quodlibet verum | Theorem | p ⇒ true | 8 |
| (3.73) | Left-identity of ⇒ | Theorem | true ⇒ p ≡ p | 8 |
| (3.74) | Definition of ¬ from ⇒ | Theorem | p ⇒ false ≡ ¬ p | 8 |
| (3.75) | ex falso quodlibet | Theorem | false ⇒ p | 8 |
| (3.76a) | Weakening；别名：Strengthening | Theorem | p ⇒ p ∨ q | 8 |
| (3.76b) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p | 8 |
| (3.76c) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∨ q | 8 |
| (3.76d) | Weakening；别名：Strengthening | Theorem | p ∨ (q ∧ r) ⇒ p ∨ q | 8 |
| (3.76e) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∧ (q ∨ r) | 8 |
| (3.77) | Modus ponens | Theorem | p ∧ (p ⇒ q) ⇒ q | 8 |
| (3.78) | Case analysis | Theorem | (p ⇒ r) ∧ (q ⇒ r) ≡ p ∨ q ⇒ r | 8 |
| (3.79) | Case analysis | Theorem | (p ⇒ r) ∧ (¬ p ⇒ r) ≡ r | 8 |
| (3.8) | Definition of `false` | Axiom | false ≡ ¬ true | 8 |
| (3.80) | Mutual implication | Theorem | (p ⇒ q) ∧ (q ⇒ p) ≡ (p ≡ q) | 8 |
| (3.80.1) | Reflexivity of ⇒ wrt. ≡；别名：Reflexivity of ⇒ | Theorem | (p ≡ q) ⇒ (p ⇒ q) | 8 |
| (3.81) | Antisymmetry of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ p) ⇒ (p ≡ q) | 8 |
| (3.82.4) | Implication strengthening | Theorem | p ⇒ q ≡ p ⇒ p ∧ q | 8 |
| (3.82.5) | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 8 |
| (3.82a) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 8 |
| (3.82b) | Transitivity of ⇒ | Theorem | (p ≡ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 8 |
| (3.82c) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ≡ r) ⇒ (p ⇒ r) | 8 |
| (3.83) | Leibniz | Axiom | e = f ⇒ E[z ≔ e] = E[z ≔ f] | 8 |
| (3.83.1) | Leibniz | Corollary | d = e ⇒ f d = f e | 8 |
| (3.83.2) | Leibniz | Corollary | d = e ⇒ (p d ≡ p e) | 8 |
| (3.83.3) | Leibniz | Corollary | (d ≡ e) ⇒ (p d ≡ p e) | 8 |
| (3.83.4) | Leibniz | Corollary | (d ≡ e) ⇒ f d = f e | 8 |
| (3.84a) | Replacement | Theorem | e = f ∧ E[z ≔ e] ≡ e = f ∧ E[z ≔ f] | 8 |
| (3.84a≡) | Replacement | Theorem | (e ≡ f) ∧ E[z ≔ e] ≡ (e ≡ f) ∧ E[z ≔ f] | 8 |
| (3.84b) | Replacement | Theorem | e = f ⇒ E[z ≔ e] ≡ e = f ⇒ E[z ≔ f] | 8 |
| (3.84b≡) | Replacement | Theorem | (e ≡ f) ⇒ E[z ≔ e] ≡ (e ≡ f) ⇒ E[z ≔ f] | 8 |
| (3.84c) | Replacement | Theorem | q ∧ (e ≡ f) ⇒ E[z ≔ e] ≡ q ∧ (e ≡ f) ⇒ E[z ≔ f] | 8 |
| (3.84c) | Replacement | Theorem | q ∧ e = f ⇒ E[z ≔ e] ≡ q ∧ e = f ⇒ E[z ≔ f] | 8 |
| (3.85a) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] ≡ p ⇒ E[z ≔ true] | 8 |
| (3.85b) | Replace by `true` | Theorem | q ∧ p ⇒ E[z ≔ p] ≡ q ∧ p ⇒ E[z ≔ true] | 8 |
| (3.85c) | Replace by `false` | Theorem | ¬ p ⇒ E[z ≔ p] ≡ ¬ p ⇒ E[z ≔ false] | 8 |
| (3.85d) | Replace by `false` | Theorem | q ∧ ¬ p ⇒ E[z ≔ p] ≡ q ∧ ¬ p ⇒ E[z ≔ false] | 8 |
| (3.85e) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] = E[z ≔ true] | 8 |
| (3.86a) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ≡ E[z ≔ false] ⇒ p | 8 |
| (3.86b) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ∨ q ≡ E[z ≔ false] ⇒ p ∨ q | 8 |
| (3.87) | Replace by `true` | Theorem | p ∧ E[z ≔ p] ≡ p ∧ E[z ≔ true] | 8 |
| (3.87.1) | Abbreviated replace by `false` | Theorem | ¬ p ∧ E ≡ ¬ p ∧ E[p ≔ false] | 8 |
| (3.87.1) | Abbreviated replace by `true` | Theorem | p ∧ E ≡ p ∧ E[p ≔ true] | 8 |
| (3.88) | Replace by `false` | Theorem | p ∨ E[z ≔ p] ≡ p ∨ E[z ≔ false] | 8 |
| (3.89) | Shannon | Theorem | E[z ≔ p] ≡ (p ∧ E[z ≔ true]) ∨ (¬ p ∧ E[z ≔ false]) | 8 |
| (3.9) | Commutativity of ¬ with ≡ | Axiom | ¬ (p ≡ q) ≡ (¬ p ≡ q) | 8 |
| (4.3) | Left-monotonicity of ∧；别名：Monotonicity of ∧ | Theorem | (p ⇒ q) ⇒ (p ∧ r ⇒ q ∧ r) | 8 |
| (8.11) | Substitution into ∀ | Axiom | (∀ y ❙ R • P )[x ≔ F] ≡ (∀ y ❙ R[x ≔ F] • P[x ≔ F] ) | 6 |
| (8.11) | Substitution into ∃ | Axiom | (∃ y ❙ R • P )[x ≔ F] ≡ (∃ y ❙ R[x ≔ F] • P[x ≔ F] ) | 5 |
| (8.12.1) | Leibniz for ∀ range | Axiom | (∀ x • R₁ ≡ R₂ ) ⇒ ((∀ x ❙ R₁ • P ) ≡ (∀ x ❙ R₂ • P )) | 6 |
| (8.12.1) | Leibniz for ∃ range | Axiom | (∀ x • R₁ ≡ R₂ ) ⇒ ((∃ x ❙ R₁ • P ) ≡ (∃ x ❙ R₂ • P )) | 5 |
| (8.12.1₂) | Leibniz for ∀₂ range | Axiom | (∀ x, y • R₁ ≡ R₂ ) ⇒ ((∀ x, y ❙ R₁ • P ) ≡ (∀ x, y ❙ R₂ • P )) | 6 |
| (8.12.1₂) | Leibniz for ∃₂ range | Axiom | (∀ x, y • R₁ ≡ R₂ ) ⇒ ((∃ x, y ❙ R₁ • P ) ≡ (∃ x, y ❙ R₂ • P )) | 5 |
| (8.12.1₃) | Leibniz for ∀₃ range | Axiom | (∀ x, y, z • R₁ ≡ R₂ ) ⇒ ((∀ x, y, z ❙ R₁ • P ) ≡ (∀ x, y, z ❙ R₂ • P )) | 6 |
| (8.12.1₃) | Leibniz for ∃₃ range | Axiom | (∀ x, y, z • R₁ ≡ R₂ ) ⇒ ((∃ x, y, z ❙ R₁ • P ) ≡ (∃ x, y, z ❙ R₂ • P )) | 5 |
| (8.12.2) | Leibniz for ∀ body | Axiom | (∀ x • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∀ x ❙ R • P₁ ) ≡ (∀ x ❙ R • P₂ )) | 6 |
| (8.12.2) | Leibniz for ∃ body | Corollary | (∀ x ❙ R • P₁ ≡ P₂ ) ⇒ ((∃ x ❙ R • P₁ ) ≡ (∃ x ❙ R • P₂ )) | 5 |
| (8.12.2) | Leibniz for ∃ body | Axiom | (∀ x • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∃ x ❙ R • P₁ ) ≡ (∃ x ❙ R • P₂ )) | 5 |
| (8.12.2₂) | Leibniz for ∀₂ body | Axiom | (∀ x, y • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∀ x, y ❙ R • P₁ ) ≡ (∀ x, y ❙ R • P₂ )) | 6 |
| (8.12.2₂) | Leibniz for ∃₂ body | Axiom | (∀ x, y • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∃ x, y ❙ R • P₁ ) ≡ (∃ x, y ❙ R • P₂ )) | 5 |
| (8.12.2₃) | Leibniz for ∀₃ body | Axiom | (∀ x, y, z • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∀ x, y, z ❙ R • P₁ ) ≡ (∀ x, y, z ❙ R • P₂ )) | 6 |
| (8.12.2₃) | Leibniz for ∃₃ body | Axiom | (∀ x, y, z • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∃ x, y, z ❙ R • P₁ ) ≡ (∃ x, y, z ❙ R • P₂ )) | 5 |
| (8.13) | Empty range for ∀ | Axiom | (∀ x ❙ false • P ) ≡ true | 6 |
| (8.13) | Empty range for ∃ | Axiom | (∃ x ❙ false • P ) ≡ false | 5 |
| (8.14) | One-point rule for ∀ | Axiom | (∀ x ❙ x = E • P ) ≡ P[x ≔ E] | 6 |
| (8.14) | One-point rule for ∃ | Axiom | (∃ x ❙ x = E • P ) ≡ P[x ≔ E] | 5 |
| (8.15) | Distributivity of ∀ over ∧ | Axiom | (∀ x ❙ R • P ) ∧ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∧ Q ) | 6 |
| (8.15) | Distributivity of ∃ over ∨ | Axiom | (∃ x ❙ R • P ) ∨ (∃ x ❙ R • Q ) ≡ (∃ x ❙ R • P ∨ Q ) | 5 |
| (8.16) | Disjoint range split for ∀ | Theorem | (∀ x • R ∧ S ≡ false ) ⇒ ((∀ x ❙ R ∨ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P )) | 6 |
| (8.16) | Disjoint range split for ∃ | Theorem | (∀ x • R ∧ S ≡ false ) ⇒ ((∃ x ❙ R ∨ S • P ) ≡ (∃ x ❙ R • P ) ∨ (∃ x ❙ S • P )) | 5 |
| (8.16.1) | Alternative range split for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x ❙ R ∧ S • P ) ∧ (∀ x ❙ R ∧ ¬ S • P ) | 6 |
| (8.16.1) | Alternative range split for ∃ | Theorem | (∃ x ❙ R • P ) ≡ (∃ x ❙ R ∧ S • P ) ∨ (∃ x ❙ R ∧ ¬ S • P ) | 5 |
| (8.17) | General range split for ∀ | Axiom | (∀ x ❙ R ∨ S • P ) ∧ (∀ x ❙ R ∧ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P ) | 6 |
| (8.17) | General range split for ∃ | Axiom | (∃ x ❙ R ∨ S • P ) ∨ (∃ x ❙ R ∧ S • P ) ≡ (∃ x ❙ R • P ) ∨ (∃ x ❙ S • P ) | 5 |
| (8.18) | Range split for ∀ | Theorem | (∀ x ❙ R ∨ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P ) | 12 |
| (8.18) | Range split for ∀₂ | Theorem | (∀ x, y ❙ R ∨ S • P ) ≡ (∀ x, y ❙ R • P ) ∧ (∀ x, y ❙ S • P ) | 6 |
| (8.18) | Range split for ∃ | Theorem | (∃ x ❙ R ∨ S • P ) ≡ (∃ x ❙ R • P ) ∨ (∃ x ❙ S • P ) | 5 |
| (8.19) | Interchange of dummies for ∀ | Theorem | (∀ x ❙ R • (∀ y ❙ S • P ) ) ≡ (∀ y ❙ S • (∀ x ❙ R • P ) ) | 6 |
| (8.19) | Interchange of dummies for ∃ | Theorem | (∃ x ❙ R • (∃ y ❙ S • P ) ) ≡ (∃ y ❙ S • (∃ x ❙ R • P ) ) | 5 |
| (8.19.1) | Dummy list permutation for ∀ | Axiom | (∀ x, y ❙ R • P ) ≡ (∀ y, x ❙ R • P ) | 6 |
| (8.19.1) | Dummy list permutation for ∃ | Axiom | (∃ x, y ❙ R • P ) ≡ (∃ y, x ❙ R • P ) | 5 |
| (8.19.1) | Dummy list permutation₁+₂ for ∀ | Axiom | (∀ x, y, z ❙ R • P ) ≡ (∀ y, z, x ❙ R • P ) | 6 |
| (8.19.1) | Dummy list permutation₁+₂ for ∃ | Axiom | (∃ x, y, z ❙ R • P ) ≡ (∃ y, z, x ❙ R • P ) | 5 |
| (8.20) | Nesting for ∀ | Axiom | (∀ x, y ❙ R ∧ S • P ) ≡ (∀ x ❙ R • (∀ y ❙ S • P ) ) | 6 |
| (8.20) | Nesting for ∃ | Axiom | (∃ x, y ❙ R ∧ S • P ) ≡ (∃ x ❙ R • (∃ y ❙ S • P ) ) | 5 |
| (8.20) | Nesting₁+₂ for ∀ | Axiom | (∀ x, y, z ❙ R ∧ S • P ) ≡ (∀ x ❙ R • (∀ y, z ❙ S • P ) ) | 6 |
| (8.20) | Nesting₁+₂ for ∃ | Axiom | (∃ x, y, z ❙ R ∧ S • P ) ≡ (∃ x ❙ R • (∃ y, z ❙ S • P ) ) | 5 |
| (8.20) | Nesting₂+₁ for ∀ | Axiom | (∀ x, y, z ❙ R ∧ S • P ) ≡ (∀ x, y ❙ R • (∀ z ❙ S • P ) ) | 6 |
| (8.20) | Nesting₂+₁ for ∃ | Axiom | (∃ x, y, z ❙ R ∧ S • P ) ≡ (∃ x, y ❙ R • (∃ z ❙ S • P ) ) | 5 |
| (8.20.1) | Nesting for ∀ | Theorem | (∀ x, y ❙ S • P ) ≡ (∀ x • (∀ y ❙ S • P ) ) | 6 |
| (8.20.1) | Nesting for ∃ | Theorem | (∃ x, y ❙ S • P ) ≡ (∃ x • (∃ y ❙ S • P ) ) | 5 |
| (8.20.1) | Nesting₁+₂ for ∀ | Theorem | (∀ x, y, z ❙ S • P ) ≡ (∀ x • (∀ y, z ❙ S • P ) ) | 6 |
| (8.20.1) | Nesting₁+₂ for ∃ | Theorem | (∃ x, y, z ❙ S • P ) ≡ (∃ x • (∃ y, z ❙ S • P ) ) | 5 |
| (8.20.1) | Nesting₂+₁ for ∀ | Theorem | (∀ x, y, z ❙ S • P ) ≡ (∀ x, y • (∀ z ❙ S • P ) ) | 6 |
| (8.20.1) | Nesting₂+₁ for ∃ | Theorem | (∃ x, y, z ❙ S • P ) ≡ (∃ x, y • (∃ z ❙ S • P ) ) | 5 |
| (8.20.2) | Nesting for ∀ | Theorem | (∀ x, y ❙ R • P ) ≡ (∀ x ❙ R • (∀ y • P ) ) | 6 |
| (8.20.2) | Nesting for ∃ | Theorem | (∃ x, y ❙ R • P ) ≡ (∃ x ❙ R • (∃ y • P ) ) | 5 |
| (8.20.2) | Nesting₁+₂ for ∀ | Theorem | (∀ x, y, z ❙ R • P ) ≡ (∀ x ❙ R • (∀ y, z • P ) ) | 6 |
| (8.20.2) | Nesting₁+₂ for ∃ | Theorem | (∃ x, y, z ❙ R • P ) ≡ (∃ x ❙ R • (∃ y, z • P ) ) | 5 |
| (8.20.2) | Nesting₂+₁ for ∀ | Theorem | (∀ x, y, z ❙ R • P ) ≡ (∀ x, y ❙ R • (∀ z • P ) ) | 6 |
| (8.20.2) | Nesting₂+₁ for ∃ | Theorem | (∃ x, y, z ❙ R • P ) ≡ (∃ x, y ❙ R • (∃ z • P ) ) | 5 |
| (8.20.3) | Replacement in ∀ | Theorem | (∀ y ❙ R ∧ e = f • P[x ≔ e] ) ≡ (∀ y ❙ R ∧ e = f • P[x ≔ f] ) | 6 |
| (8.20.3) | Replacement in ∃ | Theorem | (∃ y ❙ R ∧ e = f • P[x ≔ e] ) ≡ (∃ y ❙ R ∧ e = f • P[x ≔ f] ) | 5 |
| (8.21) | Dummy renaming for ∀；别名：α-conversion | Theorem | (∀ x ❙ R • P ) ≡ (∀ y ❙ R[x ≔ y] • P[x ≔ y] ) | 6 |
| (8.21) | Dummy renaming for ∃；别名：α-conversion | Theorem | (∃ x ❙ R • P ) ≡ (∃ y ❙ R[x ≔ y] • P[x ≔ y] ) | 5 |
| (8.22) | Change of dummy in ∀ | Theorem | (∀ f • (∀ g • (∀ x • (∀ y • x = f y ≡ y = g x ) ) ⇒ ((∀ x ❙ R • P ) ≡ (∀ y ❙ R[x ≔ f y] • P[x ≔ f y] )) ) ) | 6 |
| (8.22) | Change of dummy in ∃ | Theorem | (∀ f • (∀ g • (∀ x • (∀ y • x = f y ≡ y = g x ) ) ⇒ ((∃ x ❙ R • P ) ≡ (∃ y ❙ R[x ≔ f y] • P[x ≔ f y] )) ) ) | 5 |
| (8.22.1) | Change of dummy in ∀ — variant | Theorem | (∀ x • (∀ y • x = f y ⇒ y = g x ) ) ⇒ ((∀ x ❙ R ∧ x = f (g x) • P ) ≡ (∀ y ❙ R[x ≔ f y] • P[x ≔ f y] )) | 6 |
| (8.22.1) | Change of dummy in ∃ — variant | Theorem | (∀ x • (∀ y • x = f y ⇒ y = g x ) ) ⇒ ((∃ x ❙ R ∧ x = f (g x) • P ) ≡ (∃ y ❙ R[x ≔ f y] • P[x ≔ f y] )) | 5 |
| (8.22.2) | Range replacement in nested ∀ | Lemma | (∀ x ❙ R • (∀ y • Q₁ ≡ Q₂ ) ) ⇒ ((∀ x ❙ R • (∀ y ❙ Q₁ • P ) ) ≡ (∀ x ❙ R • (∀ y ❙ Q₂ • P ) )) | 6 |
| (8.22.2) | Range replacement in nested ∃ | Lemma | (∀ x ❙ R • (∀ y • Q₁ ≡ Q₂ ) ) ⇒ ((∃ x ❙ R • (∃ y ❙ Q₁ • P ) ) ≡ (∃ x ❙ R • (∃ y ❙ Q₂ • P ) )) | 5 |
| (8.22.3) | Change of restricted dummy in ∀ | Theorem | (∀ f • (∀ g • (∀ x ❙ R • (∀ y • x = f y ≡ y = g x ) ) ⇒ ((∀ x ❙ R • P ) ≡ (∀ y ❙ R[x ≔ f y] • P[x ≔ f y] )) ) ) | 6 |
| (8.22.3) | Change of restricted dummy in ∃ | Theorem | (∀ f • (∀ g • (∀ x ❙ R • (∀ y • x = f y ≡ y = g x ) ) ⇒ ((∃ x ❙ R • P ) ≡ (∃ y ❙ R[x ≔ f y] • P[x ≔ f y] )) ) ) | 5 |
| (9.10) | Range weakening for ∀；别名：Range strengthening for ∀ | Theorem | (∀ x ❙ Q ∨ R • P ) ⇒ (∀ x ❙ Q • P ) | 6 |
| (9.11) | Body weakening for ∀；别名：Body strengthening for ∀ | Theorem | (∀ x ❙ R • P ∧ Q ) ⇒ (∀ x ❙ R • P ) | 6 |
| (9.12) | Monotonicity of ∀；别名：Body monotonicity of ∀ | Theorem | (∀ x ❙ R • Q ⇒ P ) ⇒ ((∀ x ❙ R • Q ) ⇒ (∀ x ❙ R • P )) | 6 |
| (9.12a) | Range antitonicity of ∀ | Theorem | (∀ x ❙ ¬ P • Q ⇒ R ) ⇒ ((∀ x ❙ R • P ) ⇒ (∀ x ❙ Q • P )) | 6 |
| (9.12a) | Range antitonicity of ∀ | Theorem | (∀ x • Q ⇒ R ) ⇒ ((∀ x ❙ R • P ) ⇒ (∀ x ❙ Q • P )) | 6 |
| (9.13) | Instantiation | Theorem | (∀ x • P ) ⇒ P[x ≔ E] | 6 |
| (9.13.1) | Instantiation | Theorem | (∀ x • P ) ⇒ P[x ≔ x] | 6 |
| (9.13.2) | Instantiation | Theorem | (∀ x ❙ R • P ) ⇒ (R ⇒ P)[x ≔ E] | 6 |
| (9.17) | Generalised De Morgan；别名：Definition of ∃ | Axiom | (∃ x ❙ R • P ) ≡ ¬ (∀ x ❙ R • ¬ P ) | 5 |
| (9.18a) | Generalised De Morgan | Theorem | ¬ (∃ x ❙ R • ¬ P ) ≡ (∀ x ❙ R • P ) | 5 |
| (9.18b) | Generalised De Morgan | Theorem | ¬ (∃ x ❙ R • P ) ≡ (∀ x ❙ R • ¬ P ) | 5 |
| (9.18c) | Generalised De Morgan | Theorem | (∃ x ❙ R • ¬ P ) ≡ ¬ (∀ x ❙ R • P ) | 5 |
| (9.19) | Trading for ∃ | Theorem | (∃ x ❙ R • P ) ≡ (∃ x • R ∧ P ) | 5 |
| (9.2) | Trading for ∀ | Axiom | (∀ x ❙ R • P ) ≡ (∀ x • R ⇒ P ) | 6 |
| (9.20) | Trading for ∃ | Theorem | (∃ x ❙ Q ∧ R • P ) ≡ (∃ x ❙ Q • R ∧ P ) | 5 |
| (9.21) | Distributivity of ∧ over ∃ | Theorem | P ∧ (∃ x ❙ R • Q ) ≡ (∃ x ❙ R • P ∧ Q ) | 5 |
| (9.22) | 原文未命名 | Theorem | P ∧ (∃ x • R ) ≡ (∃ x ❙ R • P ) | 5 |
| (9.22.1) | Distributivity of ∧ over ∀ | Theorem | (∃ x • R ) ⇒ (P ∧ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∧ Q )) | 5 |
| (9.23) | Distributivity of ∨ over ∃ | Theorem | (∃ x • R ) ⇒ (P ∨ (∃ x ❙ R • Q ) ≡ (∃ x ❙ R • P ∨ Q )) | 5 |
| (9.24) | False ∃ body | Theorem | (∃ x ❙ R • false ) ≡ false | 5 |
| (9.25) | Range weakening for ∃；别名：Range strengthening for ∃ | Theorem | (∃ x ❙ R • P ) ⇒ (∃ x ❙ Q ∨ R • P ) | 5 |
| (9.25.1) | Range weakening for ∃；别名：Range strengthening for ∃ | Theorem | (∃ x ❙ Q ∧ R • P ) ⇒ (∃ x ❙ R • P ) | 5 |
| (9.26) | Body weakening for ∃；别名：Body strengthening for ∃ | Theorem | (∃ x ❙ R • P ) ⇒ (∃ x ❙ R • P ∨ Q ) | 5 |
| (9.26.1) | Body weakening for ∃；别名：Body strengthening for ∃ | Theorem | (∃ x ❙ R • P ∧ Q ) ⇒ (∃ x ❙ R • P ) | 5 |
| (9.27) | Monotonicity of ∃；别名：Body monotonicity of ∃ | Theorem | (∀ x ❙ R • Q ⇒ P ) ⇒ ((∃ x ❙ R • Q ) ⇒ (∃ x ❙ R • P )) | 5 |
| (9.27.1) | Simple body-monotonicity of ∃ | Theorem | (∀ x • P ⇒ Q ) ⇒ ((∃ x ❙ R • P ) ⇒ (∃ x ❙ R • Q )) | 5 |
| (9.27.2) | Range monotonicity of ∃ | Theorem | (∀ x • Q ⇒ R ) ⇒ ((∃ x ❙ Q • P ) ⇒ (∃ x ❙ R • P )) | 5 |
| (9.27.3) | Range monotonicity of ∃ | Theorem | (∀ x ❙ P • Q ⇒ R ) ⇒ ((∃ x ❙ Q • P ) ⇒ (∃ x ❙ R • P )) | 5 |
| (9.28) | ∃-Introduction | Theorem | P[x ≔ E] ⇒ (∃ x • P ) | 5 |
| (9.28.1) | ∃-Introduction | Theorem | (R ∧ P)[x ≔ E] ⇒ (∃ x ❙ R • P ) | 5 |
| (9.29) | Interchange of quantifications | Theorem | (∃ x ❙ R • (∀ y ❙ Q • P ) ) ⇒ (∀ y ❙ Q • (∃ x ❙ R • P ) ) | 5 |
| (9.29.1) | Interchange of quantifications | Theorem | (∃ x • (∀ y • P ) ) ⇒ (∀ y • (∃ x • P ) ) | 5 |
| (9.30.1) | Witness | Theorem | (∃ x ❙ R • P ) ⇒ Q ≡ (∀ x • R ∧ P ⇒ Q ) | 5 |
| (9.30.2) | Witness | Theorem | (∃ x • P ) ⇒ Q ≡ (∀ x • P ⇒ Q ) | 5 |
| (9.3a) | Trading for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x • ¬ R ∨ P ) | 6 |
| (9.3b) | Trading for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x • R ∧ P ≡ R ) | 6 |
| (9.3c) | Trading for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x • R ∨ P ≡ P ) | 6 |
| (9.4a) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • R ⇒ P ) | 6 |
| (9.4b) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • ¬ R ∨ P ) | 6 |
| (9.4c) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • R ∧ P ≡ R ) | 6 |
| (9.4d) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • R ∨ P ≡ P ) | 6 |
| (9.5) | Distributivity of ∨ over ∀ | Axiom | P ∨ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∨ Q ) | 6 |
| (9.6) | 原文未命名 | Theorem | P ∨ (∀ x • ¬ R ) ≡ (∀ x ❙ R • P ) | 6 |
| (9.7) | Distributivity of ∧ over ∀ | Theorem | ¬ (∀ x • ¬ R ) ⇒ (P ∧ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∧ Q )) | 6 |
| (9.8) | True ∀ body | Theorem | (∀ x ❙ R • true ) | 6 |
| (9.9) | Sub-distributivity of ∀ over ≡ | Theorem | (∀ x ❙ R • P ≡ Q ) ⇒ ((∀ x ❙ R • P ) ≡ (∀ x ❙ R • Q )) | 6 |
| (Ex6.5.1) | 原文未命名 | Theorem | x < 2 ∧ 5 < y ⇒ x < 3 < y | 1 |
| (Ex6.5.2) | 原文未命名 | Theorem | (x < 2 ⇒ 5 ≤ y) ⇒ (x < 1 ⇒ 4 ≤ y) | 1 |
| (Ex6.5.3) | 原文未命名 | Theorem | x ≤ y ⇒ 2 · x ≤ 2 · y | 1 |
| (Ex6.5.4) | 原文未命名 | Theorem | x ≤ y ≤ z ⇒ (¬ (y ≤ 2 · y) ⇒ ¬ (z ≤ 2 · x)) | 1 |
| (Ex6.5.5) | 原文未命名 | Theorem | x ≤ 5 ∧ (∀ y ❙ 3 ≤ y • x < y ) ⇒ x ≤ 7 ∧ (∀ y ❙ 9 ≤ y • x < y ) | 1 |
| (H13a) | 原文未命名 | Fact | (7 ◃ (1 ◃ (9 ◃ 𝜖))) ▹ 5 = 7 ◃ (1 ◃ (9 ◃ (5 ◃ 𝜖))) | 1 |
| (H13b) | 原文未命名 | Fact | (4 ◃ (1 ◃ 𝜖)) ⌢ (8 ◃ (5 ◃ (2 ◃ 𝜖))) = 4 ◃ (1 ◃ (8 ◃ (5 ◃ (2 ◃ 𝜖)))) | 1 |
| 未编号 · 00099d | ∧₆-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ (u ⇒ p ∧ (q ∧ (r ∧ (s ∧ (t ∧ u))))))))) | 7 |
| 未编号 · 0102c0 | Identity of ≢ | Theorem | (p ≢ false) ≡ p | 8 |
| 未编号 · 026e7f | Left-antitonicity of < | Theorem | p ≤ q ⇒ (q < r ⇒ p < r) | 1 |
| 未编号 · 0440d9 | Equivalence enrichment | Theorem | (p ≡ q) ⇒ ((p ⇒ r) ⇒ (p ⇒ q ∧ r)) | 7 |
| 未编号 · 07c61f | Distributivity of ∑ over + | Axiom | (∑ x ❙ R • E₁ + E₂ ) = (∑ x ❙ R • E₁ ) + (∑ x ❙ R • E₂ ) | 1 |
| 未编号 · 08e6b7 | Monotonicity of ∧ | Theorem | (p ⇒ p') ⇒ ((q ⇒ q') ⇒ (p ∧ q ⇒ p' ∧ q')) | 8 |
| 未编号 · 0a2238 | Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ (p ∨ r ⇒ q ∨ r) | 8 |
| 未编号 · 0a4bd6 | Positivity | Theorem | pos a ≡ a ≠ 0 ∧ ¬ pos (- a) | 7 |
| 未编号 · 0c7c25 | Transitivity；别名：Transitivity of > | Theorem | a > b ∧ b > c ⇒ a > c | 3 |
| 未编号 · 0f2ed1 | Contributing conjunct to ≡ | Theorem | (p ∧ q ≡ r) ∧ p ⇒ (q ≡ r) | 7 |
| 未编号 · 123d6e | At least successor | Theorem | a > b ≡ a ≥ b + 1 | 3 |
| 未编号 · 12cef0 | Monotonicity of -；别名：≤-Monotonicity of - | Theorem | a ≤ b ⇒ a - d ≤ b - d | 3 |
| 未编号 · 153663 | Dummy renaming for ∑；别名：α-conversion for ∑ | Axiom | (∑ x ❙ R • E ) = (∑ y ❙ R[x ≔ y] • E[x ≔ y] ) | 1 |
| 未编号 · 157179 | Anti-isotonicity of unary minus；别名：≤-Anti-isotonicity of unary minus | Theorem | a ≤ b ≡ - b ≤ - a | 3 |
| 未编号 · 15c06f | Transitivity of = | Theorem | e = f ∧ f = g ⇒ e = g | 8 |
| 未编号 · 185ca9 | Empty range for ∑ | Axiom | (∑ x ❙ false • E ) = 0 | 1 |
| 未编号 · 1960cd | Split off ∑-term from bottom of ≤-<-suc range | Theorem | m ≤ n ⇒ (∑ i ❙ m ≤ i < n + 1 • E ) = E[i ≔ m] + (∑ i ❙ m + 1 ≤ i < n + 1 • E ) | 1 |
| 未编号 · 1a94c2 | <-Anti-isotonicity of unary minus | Theorem | a < b ≡ - b < - a | 3 |
| 未编号 · 2001b7 | Strengthening ⇒⁅⁆；别名：Strengthening the precondition、⇒_⇒⁅⁆ | Primitive inference rule | P₁ ⇒ P₂ , P₂ ⇒⁅ C ⁆ Q ⊦ P₁ ⇒⁅ C ⁆ Q | 2 |
| 未编号 · 22473d | Transitivity of > | Theorem | a > b ∧ b > c ⇒ a > c | 4 |
| 未编号 · 22c029 | Split-off top | Theorem | m ≤ n ⇒ (m ≤ i < n + 1 ≡ m ≤ i < n ∨ i = n) | 3 |
| 未编号 · 231c87 | Least greater element；别名：Successor at most、Definition of < via successor and ≤ | Theorem | a < b ≡ a + 1 ≤ b | 3 |
| 未编号 · 23785d | Adding consequent to ∧ | Theorem | (p ⇒ q) ⇒ (p ∧ r ⇒ p ∧ (q ∧ r)) | 7 |
| 未编号 · 24a375 | Definition of ≡ | Axiom | (p ≡ q) = (p = q) | 8 |
| 未编号 · 25737b | Co-residual of ∨ | Theorem | q ⇒ x ∨ p ≡ ¬ p ∧ q ⇒ x | 7 |
| 未编号 · 266568 | Generalised one-point rule for ∀ | Theorem | R[x ≔ e] ⇒ (∀ x ❙ R ∧ x = e • E ) = E[x ≔ e] | 6 |
| 未编号 · 267c2e | Pair dummy joining for ∀ | Theorem | (∀ x : t₁; y : t₂ ❙ R • E ) = (∀ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 6 |
| 未编号 · 28ac42 | ≤-Isotonicity of - | Theorem | a ≤ b ≡ a - d ≤ b - d | 3 |
| 未编号 · 2977f6 | Proof by contradiction | Theorem | ¬ p ⇒ false ≡ p | 8 |
| 未编号 · 2989a8 | ≤-Monotonicity of + | Theorem | a ≤ b ⇒ a + d ≤ b + d | 7 |
| 未编号 · 29a570 | ∧₅-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ p ∧ (q ∧ (r ∧ (s ∧ t))))))) | 14 |
| 未编号 · 29ef84 | Split off ∑-term from bottom of ≤-< range | Theorem | m < n ⇒ (∑ i ❙ m ≤ i < n • E ) = E[i ≔ m] + (∑ i ❙ m + 1 ≤ i < n • E ) | 1 |
| 未编号 · 2a0838 | Assignment | Derived inference rule | /\ x • Φ ≡ Ψ[x ≔ E] ⊦ Φ ⇒⁅ (x := E) ⁆ Ψ | 1 |
| 未编号 · 2b72bc | Definition of ∧ | Lemma | (p ∧ q) = (p ≡ (q ≡ p ∨ q)) | 8 |
| 未编号 · 2b77ed | Successor greater；别名：Definition of ≥ via successor and > | Theorem | a + 1 > b ≡ a ≥ b | 3 |
| 未编号 · 303cfc | Complement of > | Theorem | a > b ≢ a ≤ b | 3 |
| 未编号 · 309d0d | One-point rule for ∀₂；别名：Two-point rule for ∀ | Theorem | (∀ x, y ❙ x = A ∧ y = B • P ) ≡ P[x, y ≔ A, B] | 6 |
| 未编号 · 30ad60 | Trichotomy — B | Theorem | ¬ (a < b ∧ (a = b ∧ a > b)) | 3 |
| 未编号 · 31d3fa | Preserving conjunct after ⇒ | Theorem | p ∧ q ⇒ r ≡ p ∧ q ⇒ p ∧ r | 7 |
| 未编号 · 35e920 | Split off <-≤ range at top | Theorem | m < n ⇒ (m < i ≤ n ≡ m < i < n ∨ i = n) | 3 |
| 未编号 · 38133d | Body weakening for ∀；别名：Body strengthening for ∀ | Theorem | (∀ x ❙ R • P ) ⇒ (∀ x ❙ R • Q ⇒ P ) | 6 |
| 未编号 · 397724 | Weakening ⇒⁅⁆；别名：Weakening the postcondition、⇒⁅⁆_⇒ | Primitive inference rule | P ⇒⁅ C ⁆ Q₁ , Q₁ ⇒ Q₂ ⊦ P ⇒⁅ C ⁆ Q₂ | 2 |
| 未编号 · 39bf4c | Zero ∑ body | Theorem | (∑ x ❙ R • 0 ) = 0 | 1 |
| 未编号 · 3aa5d0 | Monotonicity of ⇒；别名：Right-monotonicity of ⇒ | Theorem | (p ⇒ q) ⇒ ((r ⇒ p) ⇒ (r ⇒ q)) | 8 |
| 未编号 · 3c3941 | Introducing fresh ∀ | Theorem | P ⇒ (∀ x ❙ R • P ) | 6 |
| 未编号 · 3ca479 | Positive implies non-zero | Theorem | pos a ⇒ a ≠ 0 | 7 |
| 未编号 · 3cdb84 | Pair dummy splitting for ∃ | Theorem | (∃ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∃ x : t₁; y : t₂ ❙ R[p ≔ ⟨x, y⟩] • E[p ≔ ⟨x, y⟩] ) | 5 |
| 未编号 · 3d2d0a | Weak left-antitonicity of < | Theorem | p < q ⇒ (q < r ⇒ p < r) | 1 |
| 未编号 · 4315c0 | Transitivity of < | Theorem | a < b ⇒ (b < c ⇒ a < c) | 1 |
| 未编号 · 4364d7 | Irreflexivity of > | Theorem | a = b ⇒ ¬ (a > b) | 3 |
| 未编号 · 44bb82 | Boring disjoint range split for ∀ | Theorem | (R ∧ S ≡ false) ⇒ ((∀ x ❙ R ∨ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P )) | 6 |
| 未编号 · 478166 | Right-distributivity of ⇒ over ∧₃ | Theorem | p ⇒ q ∧ (r ∧ s) ≡ (p ⇒ q) ∧ ((p ⇒ r) ∧ (p ⇒ s)) | 7 |
| 未编号 · 48118f | Split off ≤-≤ range at top | Theorem | m ≤ n ⇒ (m ≤ i ≤ n ≡ m ≤ i < n ∨ i = n) | 3 |
| 未编号 · 4a62c3 | Irreflexivity of < | Theorem | ¬ (a < b ∧ a = b) | 7 |
| 未编号 · 4adf37 | <-Monotonicity of + | Theorem | a < b ∧ c < d ⇒ a + c < b + d | 3 |
| 未编号 · 4b3d0d | skip | Derived inference rule | P ⇒ Q ⊦ P ⇒⁅ skip ⁆ Q | 2 |
| 未编号 · 4b60c2 | ≤-Isotonicity of + | Theorem | a ≤ b ≡ a + d ≤ b + d | 7 |
| 未编号 · 504508 | One-point rule for ∑ | Axiom | (∑ x ❙ x = D • E ) = E[x ≔ D] | 1 |
| 未编号 · 525492 | Sequence cases | Corollary | xs = 𝜖 ∨ xs = head xs ◃ tail xs | 1 |
| 未编号 · 56906f | Converse of ≤ | Theorem | a ≥ b ≡ b ≤ a | 7 |
| 未编号 · 56f912 | skip | Theorem | P ⇒⁅ skip ⁆ P | 2 |
| 未编号 · 577081 | Pair dummy joining for ∃ | Theorem | (∃ x : t₁; y : t₂ ❙ R • E ) = (∃ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 5 |
| 未编号 · 5a9a26 | Interchange of dummies for ∑ | Theorem | (∑ x ❙ Q • (∑ y ❙ R • P ) ) = (∑ y ❙ R • (∑ x ❙ Q • P ) ) | 1 |
| 未编号 · 5aae8c | Definition of ≠ | Theorem | x ≠ y ≡ (x = y ≡ false) | 8 |
| 未编号 · 5c98a9 | Irreflexivity of > | Theorem | a > b ⇒ ¬ (a = b) | 3 |
| 未编号 · 5cb6cb | Pair dummy joining for ∃ | Theorem | (∃ x : t₁ • (∃ y : t₂ ❙ R • E ) ) = (∃ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 5 |
| 未编号 · 5f6c2d | Symmetry of ≠ | Theorem | x ≠ y ≡ y ≠ x | 8 |
| 未编号 · 635d6b | Irreflexivity of < | Theorem | a < b ⇒ ¬ (a = b) | 7 |
| 未编号 · 642a29 | Split off <-≤ range at bottom | Theorem | m < n ⇒ (m < i ≤ n ≡ m + 1 < i ≤ n ∨ i = m + 1) | 3 |
| 未编号 · 648d61 | Assignment | Axiom | P[x ≔ E] ⇒⁅ (x := E) ⁆ P | 2 |
| 未编号 · 64c114 | Distributivity of · over ∑ | Axiom | a · (∑ x ❙ R • E ) = (∑ x ❙ R • a · E ) | 1 |
| 未编号 · 65abc8 | Split off ≤-<-suc range at top | Theorem | m ≤ n ⇒ (m ≤ i < n + 1 ≡ m ≤ i < n ∨ i = n) | 3 |
| 未编号 · 67761d | Least greater element | Theorem | a < b ≡ a + 1 ≤ b | 3 |
| 未编号 · 680791 | Split off <-≤-suc range at bottom | Theorem | m ≤ n ⇒ (m < i ≤ n + 1 ≡ m + 1 < i ≤ n + 1 ∨ i = m + 1) | 3 |
| 未编号 · 6e6534 | While | Primitive inference rule | B ∧ Q ⇒⁅ C ⁆ Q ⊦ Q ⇒⁅ while B do C od ⁆ ¬ B ∧ Q | 2 |
| 未编号 · 70f478 | ∧-Introduction | Theorem | p ⇒ (q ⇒ p ∧ q) | 7 |
| 未编号 · 771122 | ∧₄-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ p ∧ (q ∧ (r ∧ s))))) | 7 |
| 未编号 · 78d2c4 | Irreflexivity of > | Theorem | ¬ (a > b ∧ a = b) | 3 |
| 未编号 · 7907b0 | Less than successor | Theorem | a < b + 1 ≡ a ≤ b | 3 |
| 未编号 · 79d90c | Left-monotonicity of ∨；别名：Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ (p ∨ r ⇒ q ∨ r) | 8 |
| 未编号 · 7b97e3 | Right-monotonicity of < | Theorem | p ≤ q ⇒ (r < p ⇒ r < q) | 1 |
| 未编号 · 82b334 | Flipped transitivity of ≤ | Theorem | b ≤ c ⇒ (a ≤ b ⇒ a ≤ c) | 1 |
| 未编号 · 831dfd | Split off ≤-≤ range at bottom | Theorem | m ≤ n ⇒ (m ≤ i ≤ n ≡ i = m ∨ m + 1 ≤ i ≤ n) | 3 |
| 未编号 · 86a35c | Abbreviated replacement in ∧；别名：Abbreviated replacement | Theorem | P ∧ x = E ≡ P[x ≔ E] ∧ x = E | 8 |
| 未编号 · 874365 | Empty range <_< | Theorem | a < b < a ≡ false | 3 |
| 未编号 · 8876d6 | Case shuffling | Theorem | (p ∨ q) ∧ (¬ p ∨ r) ≡ (p ∧ r) ∨ (¬ p ∧ q) | 7 |
| 未编号 · 88e9cd | Two-sided ≤-Monotonicity of +；别名：≤-Monotonicity of + | Theorem | a ≤ b ∧ c ≤ d ⇒ a + c ≤ b + d | 3 |
| 未编号 · 8ad9cb | Left-antitonicity of ≤ | Theorem | p ≤ q ⇒ (q ≤ r ⇒ p ≤ r) | 1 |
| 未编号 · 8f45e9 | Monotonicity of ·；别名：≤-Isotonicity of · | Theorem | 0 < d ⇒ (a ≤ b ≡ a · d ≤ b · d) | 3 |
| 未编号 · 90956c | ⇒-Introduction | Primitive inference rule | ( p ⊦ q ) ⊦ p ⇒ q | 8 |
| 未编号 · 94c723 | Leibniz for ∑ range | Axiom | (∀ x • R₁ ≡ R₂ ) ⇒ (∑ x ❙ R₁ • E ) = (∑ x ❙ R₂ • E ) | 1 |
| 未编号 · 94d527 | Weakening；别名：Strengthening | Theorem | (p ∨ q) ∧ r ⇒ p ∨ (q ∧ r) | 7 |
| 未编号 · 94f30a | ∧₇-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ (u ⇒ (v ⇒ p ∧ (q ∧ (r ∧ (s ∧ (t ∧ (u ∧ v))))))))))) | 7 |
| 未编号 · 957cfc | Sequence | Primitive inference rule | P ⇒⁅ C₁ ⁆ Q , Q ⇒⁅ C₂ ⁆ R ⊦ P ⇒⁅ (C₁ ⍮ C₂) ⁆ R | 2 |
| 未编号 · 97f231 | Cons is not empty | Corollary | x ◃ xs = 𝜖 ≡ false | 1 |
| 未编号 · 97f8db | Disjoint range split for ∑ | Theorem | (∀ x • Q ∧ R ≡ false ) ⇒ (∑ x ❙ Q ∨ R • E ) = (∑ x ❙ Q • E ) + (∑ x ❙ R • E ) | 1 |
| 未编号 · 9941d0 | ∧₃-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ p ∧ (q ∧ r))) | 7 |
| 未编号 · 9cb45b | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 7 |
| 未编号 · 9cd73a | Definition of ≠ | Axiom | x ≠ y ≡ ¬ (x = y) | 8 |
| 未编号 · 9dff39 | <-Monotonicity of + | Theorem | a < b ⇒ a + d < b + d | 7 |
| 未编号 · 9eb4a8 | Body weakening for ∀；别名：Body strengthening for ∀ | Theorem | (∀ x ❙ R • P ) ⇒ (∀ x ❙ R • P ∨ Q ) | 6 |
| 未编号 · a13a80 | Split off <-≤-suc range at top | Theorem | m ≤ n ⇒ (m < i ≤ n + 1 ≡ m < i ≤ n ∨ i = n + 1) | 3 |
| 未编号 · a2a32a | Disjunction as implication | Lemma | p ∨ q ≡ ¬ p ⇒ q | 7 |
| 未编号 · a31008 | Pair dummy splitting for ∀ | Theorem | (∀ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∀ x : t₁; y : t₂ ❙ R[p ≔ ⟨x, y⟩] • E[p ≔ ⟨x, y⟩] ) | 6 |
| 未编号 · a56b54 | Fresh ∀ | Theorem | P ≡ (∀ x • P ) | 6 |
| 未编号 · a5b2bd | Flipped transitivity of < | Theorem | b < c ⇒ (a < b ⇒ a < c) | 1 |
| 未编号 · a7f85c | Definition of `head` | Axiom | head (x ◃ xs) = x | 1 |
| 未编号 · a7fbef | Multiplying by 3 | Theorem | 3 · x = (x + x) + x | 1 |
| 未编号 · a8733b | Pair dummy joining for ∀ | Theorem | (∀ x : t₁ • (∀ y : t₂ ❙ R • E ) ) = (∀ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 6 |
| 未编号 · a967ba | Irreflexivity of < | Theorem | ¬ (a < a) | 7 |
| 未编号 · a9ba81 | Irreflexivity of < | Theorem | a = b ⇒ ¬ (a < b) | 7 |
| 未编号 · ad4220 | Snoc is not empty | Corollary | xs ▹ x = 𝜖 ≡ false | 1 |
| 未编号 · ad7fe9 | Generalised one-point rule for ∃ | Theorem | R[x ≔ e] ⇒ (∃ x ❙ R ∧ x = e • E ) = E[x ≔ e] | 5 |
| 未编号 · adbb13 | Split-off bottom | Theorem | m ≤ n ⇒ (m ≤ i < n + 1 ≡ m + 1 ≤ i < n + 1 ∨ i = m) | 3 |
| 未编号 · b02619 | Trichotomy；别名：Trichotomy — ∨ | Theorem | a < b ∨ (a = b ∨ a > b) | 3 |
| 未编号 · b103d7 | Right-distributivity of ⇒ over ∧₄ | Theorem | p ⇒ q ∧ (r ∧ (s ∧ t)) ≡ (p ⇒ q) ∧ ((p ⇒ r) ∧ ((p ⇒ s) ∧ (p ⇒ t))) | 7 |
| 未编号 · b201e0 | Strict sequence cases | Theorem | xs = 𝜖 ≢ xs = head xs ◃ tail xs | 1 |
| 未编号 · b27a0c | Empty range ≤_< | Theorem | a ≤ b < a ≡ false | 3 |
| 未编号 · b77dec | Abbreviated replacement in ⇒；别名：Abbreviated replacement | Theorem | x = E ⇒ P ≡ x = E ⇒ P[x ≔ E] | 8 |
| 未编号 · b86f5e | Irreflexivity of > | Theorem | ¬ (a > a) | 7 |
| 未编号 · b8a06d | Exclusive or implies inclusive | Theorem | (p ≢ q) ⇒ p ∨ q | 7 |
| 未编号 · b8d351 | Split off ≤-≤ range at bottom | Theorem | m ≤ n ⇒ (m ≤ i ≤ n ≡ i = m ∨ m < i ≤ n) | 3 |
| 未编号 · ba79d6 | Successor greater | Theorem | a + 1 > b ≡ a ≥ b | 3 |
| 未编号 · bab4cf | Definition of `tail` | Axiom | tail (x ◃ xs) = xs | 1 |
| 未编号 · bb17de | Less than successor；别名：Definition of ≤ via < and successor | Theorem | a < b + 1 ≡ a ≤ b | 3 |
| 未编号 · bb884d | Weak right-monotonicity of < | Theorem | p < q ⇒ (r < p ⇒ r < q) | 1 |
| 未编号 · bb97a0 | Negation of ≠ | Theorem | ¬ (x ≠ y) ≡ x = y | 8 |
| 未编号 · bd5d83 | skip | Axiom | P ⇒⁅ skip ⁆ Q ≡ P ⇒ Q | 2 |
| 未编号 · bdf087 | Antitonicity of ¬ | Theorem | (p ⇒ q) ⇒ (¬ q ⇒ ¬ p) | 8 |
| 未编号 · be1be4 | Pair dummy splitting for ∃ | Theorem | (∃ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∃ a : t₁ • (∃ b : t₂ ❙ R[p ≔ ⟨a, b⟩] • E[p ≔ ⟨a, b⟩] ) ) | 5 |
| 未编号 · bf397f | Empty range <_< | Theorem | a < b < a ⇒ false | 3 |
| 未编号 · bf62e0 | Antitonicity of unary minus；别名：≤-Antitonicity of unary minus | Theorem | a ≤ b ⇒ - b ≤ - a | 3 |
| 未编号 · c0390b | Distributivity of ⇒ over ∀ | Theorem | P ⇒ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ⇒ Q ) | 6 |
| 未编号 · c0e057 | Leibniz for ∀ body | Theorem | (∀ x • P₁ ≡ P₂ ) ⇒ ((∀ x ❙ R • P₁ ) ≡ (∀ x ❙ R • P₂ )) | 6 |
| 未编号 · c11d51 | <-Monotonicity of + | Theorem | a < b ⇒ (c < d ⇒ a + c < b + d) | 7 |
| 未编号 · c1d724 | Dummy list permutation for ∑ | Axiom | (∑ x, y ❙ R • E ) = (∑ y, x ❙ R • E ) | 1 |
| 未编号 · c3117c | Replacement in ∑ | Theorem | (∑ x ❙ R ∧ e = f • E[y ≔ e] ) = (∑ x ❙ R ∧ e = f • E[y ≔ f] ) | 1 |
| 未编号 · c4eac8 | Range weakening for ∀；别名：Range strengthening for ∀ | Theorem | (∀ x ❙ Q • P ) ⇒ (∀ x ❙ Q ∧ R • P ) | 6 |
| 未编号 · c506fd | Leibniz for ∀ body | Theorem | (∀ x ❙ R • P₁ ≡ P₂ ) ⇒ ((∀ x ❙ R • P₁ ) ≡ (∀ x ❙ R • P₂ )) | 6 |
| 未编号 · c508e2 | Nesting for ∑ | Axiom | (∑ x ❙ Q • (∑ y ❙ R • E ) ) = (∑ x, y ❙ Q ∧ R • E ) | 1 |
| 未编号 · c793cd | Empty range <_≤ | Theorem | a < b ≤ a ≡ false | 3 |
| 未编号 · c8301e | Simple body-monotonicity of ∀ | Theorem | (∀ x • P ⇒ Q ) ⇒ ((∀ x ❙ R • P ) ⇒ (∀ x ❙ R • Q )) | 6 |
| 未编号 · c8e678 | <-Antitonicity of unary minus | Theorem | a < b ⇒ - b < - a | 3 |
| 未编号 · cac6ec | Positivity of 1 | Corollary | pos 1 | 7 |
| 未编号 · cbf866 | Leibniz for ∑ body | Axiom | (∀ x • R ⇒ E₁ = E₂ ) ⇒ (∑ x ❙ R • E₁ ) = (∑ x ❙ R • E₂ ) | 1 |
| 未编号 · cc3374 | Antisymmetry of ≤ | Theorem | a ≤ b ⇒ (b ≤ a ⇒ a = b) | 3 |
| 未编号 · cc8feb | Trichotomy — A | Theorem | a < b ≡ (a = b ≡ a > b) | 3 |
| 未编号 · cd096c | Right-monotonicity of ≤ | Theorem | p ≤ q ⇒ (r ≤ p ⇒ r ≤ q) | 1 |
| 未编号 · cdba4a | Asymmetry of < | Theorem | ¬ (a < b ∧ b < a) | 7 |
| 未编号 · ce5ae3 | Residual of ∧ | Theorem | x ∧ p ⇒ q ≡ x ⇒ (p ⇒ q) | 7 |
| 未编号 · d19257 | Non-empty-sequence decomposition | Theorem | xs ≠ 𝜖 ⇒ xs = head xs ◃ tail xs | 1 |
| 未编号 · d63816 | Multiplying by 2 | Theorem | 2 · x = x + x | 1 |
| 未编号 · d80818 | At least successor；别名：Definition of > via ≥ and successor | Theorem | a > b ≡ a ≥ b + 1 | 3 |
| 未编号 · de8a1e | Antitonicity of -；别名：≤-Antitonicity of - | Theorem | c ≤ b ⇒ a - b ≤ a - c | 3 |
| 未编号 · e18e5f | Irreflexivity of ≠ | Theorem | x ≠ x ≡ false | 8 |
| 未编号 · e2dbad | One-point rule for ∀₂² | Theorem | (∀ x, y ❙ y = B ∧ R • P ) ≡ (∀ x ❙ R[y ≔ B] • P[y ≔ B] ) | 6 |
| 未编号 · e364a1 | Antitonicity of ⇒；别名：Left-antitonicity of ⇒ | Theorem | (p ⇒ q) ⇒ ((q ⇒ r) ⇒ (p ⇒ r)) | 8 |
| 未编号 · e5bad3 | Least positive | Axiom | pos a ≡ 1 ≤ a | 6 |
| 未编号 · e887d4 | Non-zero multiplication | Theorem | a ≠ 0 ⇒ (b ≠ 0 ⇒ a · b ≠ 0) | 7 |
| 未编号 · eb923d | Boring disjoint range split for ∃ | Theorem | (R ∧ S ≡ false) ⇒ ((∃ x ❙ R ∨ S • P ) ≡ (∃ x ❙ R • P ) ∨ (∃ x ❙ S • P )) | 5 |
| 未编号 · ec8ec7 | Split off ≤-<-suc range at bottom | Theorem | m ≤ n ⇒ (m ≤ i < n + 1 ≡ m + 1 ≤ i < n + 1 ∨ i = m) | 3 |
| 未编号 · ef8cd6 | Assignment | Derived inference rule | Φ ≡ Ψ[x ≔ E] ⊦ Φ ⇒⁅ (x := E) ⁆ Ψ | 1 |
| 未编号 · f1d779 | Cancellation of ¬ | Theorem | (¬ p ≡ ¬ q) = (p ≡ q) | 8 |
| 未编号 · f226ab | Transitivity of ≤ | Theorem | a ≤ b ⇒ (b ≤ c ⇒ a ≤ c) | 7 |
| 未编号 · f245f4 | One-point rule for ∀₂¹ | Theorem | (∀ x, y ❙ x = A ∧ R • P ) ≡ (∀ y ❙ R • P )[x ≔ A] | 6 |
| 未编号 · f4948f | Case shuffling | Theorem | (p ⇒ q) ∧ (¬ p ⇒ r) ≡ (p ∧ q) ∨ (¬ p ∧ r) | 7 |
| 未编号 · f4bf83 | Split off ∑-term from top of ≤-<-suc range | Theorem | m ≤ n ⇒ (∑ i ❙ m ≤ i < n + 1 • E ) = (∑ i ❙ m ≤ i < n • E ) + E[i ≔ n] | 1 |
| 未编号 · f651fd | Converse of < | Theorem | a > b ≡ b < a | 7 |
| 未编号 · f695b0 | Associativity of ⍮ | Axiom | ((S₁ ⍮ S₂) ⍮ S₃) = (S₁ ⍮ (S₂ ⍮ S₃)) | 2 |
| 未编号 · f8a195 | Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ ((r ⇒ s) ⇒ (p ∨ r ⇒ q ∨ s)) | 16 |
| 未编号 · f93139 | Irreflexivity of ≠ | Theorem | ¬ (x ≠ x) | 8 |
| 未编号 · fa5564 | Cancellation of unary minus | Theorem | - a = - b ≡ a = b | 7 |
| 未编号 · fb7322 | Split off ≤-< range at bottom | Theorem | m < n ⇒ (m ≤ i < n ≡ m + 1 ≤ i < n ∨ i = m) | 3 |
| 未编号 · fd7261 | Anti-isotonicity of -；别名：≤-Anti-isotonicity of - | Theorem | c ≤ b ≡ a - b ≤ a - c | 3 |
| 未编号 · fdb8c0 | Pair dummy splitting for ∀ | Theorem | (∀ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∀ a : t₁ • (∀ b : t₂ ❙ R[p ≔ ⟨a, b⟩] • E[p ≔ ⟨a, b⟩] ) ) | 6 |
| 未编号 · fe9fa0 | Complement of < | Theorem | a < b ≢ a ≥ b | 3 |
| 未编号 · feb464 | Range split for ∑ | Axiom | (∑ x ❙ Q ∨ R • E ) + (∑ x ❙ Q ∧ R • E ) = (∑ x ❙ Q • E ) + (∑ x ❙ R • E ) | 1 |

## 2025 · Week 7

对应 notebook：[2025i Exercise 7.1: Set Theory · 预载列表](http://130.113.68.214:15060/), [2025i Exercise 7.2: Pairs and Cartesian Products · 预载列表](http://130.113.68.214:15061/), [2025i Exercise 7.3: Typed Universal Sets · 预载列表](http://130.113.68.214:15064/), [2025i Exercise 7.4: Relations via Set Theory: More Properties · 预载列表](http://130.113.68.214:15066/), [HW14 · CalcCheck preloaded theorem list](http://130.113.68.214:15059/), [HW15-1 · CalcCheck preloaded theorem list](http://130.113.68.214:15062/), [HW15-2 · CalcCheck preloaded theorem list](http://130.113.68.214:15063/), [HW16 · CalcCheck preloaded theorem list](http://130.113.68.214:15065/)

| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |
|---|---|---|---|---:|
| (1.2) | Reflexivity of = | Axiom | x = x | 8 |
| (1.3) | Symmetry of = | Axiom | (x = y) = (y = x) | 8 |
| (1.4) | Transitivity of = | Derived inference rule | X = Y , Y = Z ⊦ X = Z | 8 |
| (1.5) | Leibniz | Derived inference rule | X = Y ⊦ E[z ≔ X] = E[z ≔ Y] | 8 |
| (11.101) | Singleton set membership | Lemma | x ∈ { y } ≡ x = y | 6 |
| (11.102) | Singleton set inclusion | Lemma | { x } ⊆ S ≡ x ∈ S | 6 |
| (11.103) | Lower ~ connection for ⊆ | Theorem | ~ X ⊆ Y ≡ ~ Y ⊆ X | 6 |
| (11.104) | Upper ~ connection for ⊆ | Theorem | X ⊆ ~ Y ≡ Y ⊆ ~ X | 6 |
| (11.105) | Golden rule for ∩ and ∪ | Theorem | S ∩ T = S ≡ T = S ∪ T | 6 |
| (11.106) | Anti-isotonicity of ~ | Theorem | R ⊆ S ≡ ~ S ⊆ ~ R | 6 |
| (11.107) | Antitonicity of ~ | Theorem | R ⊆ S ⇒ ~ S ⊆ ~ R | 6 |
| (11.108) | Monotonicity of set difference | Theorem | R ⊆ S ⇒ R - T ⊆ S - T | 6 |
| (11.109) | Antitonicity of set difference | Theorem | S ⊆ T ⇒ R - T ⊆ R - S | 6 |
| (11.111) | Characterisation of ➩ | Axiom | S ⊆ A ➩ B ≡ S ∩ A ⊆ B | 6 |
| (11.112) | Membership in ➩ | Theorem | x ∈ A ➩ B ≡ x ∈ A ⇒ x ∈ B | 6 |
| (11.113) | Definition of ➩ | Theorem | A ➩ B = ~ A ∪ B | 6 |
| (11.114) | Pseudocomplement of union | Theorem | (A ∪ B) ➩ C = (A ➩ C) ∩ (B ➩ C) | 6 |
| (11.115) | Monotonicity of ➩ | Theorem | B ⊆ C ⇒ A ➩ B ⊆ A ➩ C | 6 |
| (11.13) | Set inclusion；别名：Subset、Definition of ⊆ | Axiom | S ⊆ T ≡ (∀ e ❙ e ∈ S • e ∈ T ) | 6 |
| (11.13) | Set inclusion；别名：Subset、Definition of ⊆ | Axiom | S ⊆ T ≡ (∀ e • e ∈ S ⇒ e ∈ T ) | 1 |
| (11.13b) | Set inclusion；别名：Subset、Definition of ⊆ | Theorem | S ⊆ T ≡ (∀ e • e ∈ S ⇒ e ∈ T ) | 6 |
| (11.13c) | Subset membership；别名：Casting | Theorem | X ⊆ Y ⇒ (x ∈ X ⇒ x ∈ Y) | 6 |
| (11.13d) | Superset membership | Theorem | x ∈ X ⇒ (X ⊆ Y ⇒ x ∈ Y) | 6 |
| (11.14) | Proper subset；别名：Definition of ⊂ | Axiom | S ⊂ T ≡ S ⊆ T ∧ S ≠ T | 6 |
| (11.15) | Superset；别名：Definition of ⊇ | Axiom | T ⊇ S ≡ S ⊆ T | 6 |
| (11.16) | Proper superset；别名：Definition of ⊃ | Axiom | T ⊃ S ≡ S ⊂ T | 6 |
| (11.18) | Set complement；别名：Complement | Axiom | v ∈ ~ S ≡ ¬ (v ∈ S) | 6 |
| (11.19) | Self-inverse of ~ | Theorem | ~ (~ S) = S | 6 |
| (11.20) | Set union；别名：Union | Axiom | v ∈ S ∪ T ≡ v ∈ S ∨ v ∈ T | 6 |
| (11.21) | Set intersection；别名：Intersection | Axiom | v ∈ S ∩ T ≡ v ∈ S ∧ v ∈ T | 6 |
| (11.22) | Set difference | Axiom | v ∈ S - T ≡ v ∈ S ∧ ¬ (v ∈ T) | 6 |
| (11.23) | Membership in ℙ；别名：Power set | Axiom | v ∈ ℙ S ≡ v ⊆ S | 6 |
| (11.26) | Symmetry of ∪ | Theorem | S ∪ T = T ∪ S | 7 |
| (11.27) | Associativity of ∪ | Theorem | S ∪ (T ∪ W) = (S ∪ T) ∪ W | 7 |
| (11.28) | Idempotency of ∪ | Theorem | S ∪ S = S | 7 |
| (11.29) | Zero of ∪ | Theorem | S ∪ 𝐔 = 𝐔 | 6 |
| (11.3) | Set membership | Axiom | F ∈ { x ❙ R • E } ≡ (∃ x ❙ R • F = E ) | 6 |
| (11.30) | Identity of ∪ | Theorem | S ∪ {} = S | 6 |
| (11.31) | Weakening of ∪ | Theorem | S ⊆ S ∪ T | 7 |
| (11.32) | Excluded middle for ∪；别名：Union with complement | Theorem | S ∪ ~ S = 𝐔 | 6 |
| (11.33) | Symmetry of ∩ | Theorem | S ∩ T = T ∩ S | 6 |
| (11.34) | Associativity of ∩ | Theorem | S ∩ (T ∩ W) = (S ∩ T) ∩ W | 6 |
| (11.35) | Idempotency of ∩ | Theorem | S ∩ S = S | 6 |
| (11.36) | Zero of ∩ | Theorem | S ∩ {} = {} | 6 |
| (11.37) | Identity of ∩ | Theorem | S ∩ 𝐔 = S | 6 |
| (11.38) | Weakening of ∩ | Theorem | S ∩ T ⊆ S | 6 |
| (11.39) | Contradiction for ∩；别名：Intersection with complement | Theorem | S ∩ ~ S = {} | 6 |
| (11.4) | Set extensionality | Axiom | S = T ≡ (∀ e • e ∈ S ≡ e ∈ T ) | 7 |
| (11.40) | Distributivity of ∪ over ∩ | Theorem | S ∪ (T ∩ W) = (S ∪ T) ∩ (S ∪ W) | 6 |
| (11.41) | Distributivity of ∩ over ∪ | Theorem | S ∩ (T ∪ W) = (S ∩ T) ∪ (S ∩ W) | 6 |
| (11.42a) | De Morgan for ∪；别名：Complement of ∪ | Theorem | ~ (S ∪ T) = ~ S ∩ ~ T | 6 |
| (11.42b) | De Morgan for ∩；别名：Complement of ∩ | Theorem | ~ (S ∩ T) = ~ S ∪ ~ T | 6 |
| (11.43) | Monotonicity of ∪ | Theorem | S ⊆ T ∧ V ⊆ W ⇒ S ∪ V ⊆ T ∪ W | 6 |
| (11.43b) | Monotonicity of ∪ | Theorem | S ⊆ T ⇒ S ∪ W ⊆ T ∪ W | 6 |
| (11.44) | Monotonicity of ∩ | Theorem | S ⊆ T ∧ V ⊆ W ⇒ S ∩ V ⊆ T ∩ W | 6 |
| (11.44b) | Monotonicity of ∩ | Theorem | S ⊆ T ⇒ S ∩ W ⊆ T ∩ W | 6 |
| (11.45) | Set inclusion via ∪ | Theorem | S ⊆ T ≡ S ∪ T = T | 6 |
| (11.46) | Set inclusion via ∩ | Theorem | S ⊆ T ≡ S ∩ T = S | 6 |
| (11.47) | 原文未命名 | Theorem | S ∪ T = 𝐔 ≡ (∀ x • ¬ (x ∈ S) ⇒ x ∈ T ) | 6 |
| (11.48) | 原文未命名 | Theorem | S ∩ T = {} ≡ (∀ x • x ∈ S ⇒ ¬ (x ∈ T) ) | 6 |
| (11.49) | Set difference via ∩ | Theorem | S - T = S ∩ ~ T | 6 |
| (11.5) | Set comprehension expansion | Theorem | S = { x ❙ x ∈ S • x } | 6 |
| (11.50) | Weakening for set difference | Theorem | S - T ⊆ S | 6 |
| (11.51) | Right-identity of set difference | Theorem | S - {} = S | 6 |
| (11.52) | 原文未命名 | Theorem | S ∩ (T - S) = {} | 6 |
| (11.53) | Union cancels difference | Theorem | S ∪ (T - S) = S ∪ T | 6 |
| (11.54) | Subtracting union | Theorem | S - (T ∪ W) = (S - T) ∩ (S - W) | 6 |
| (11.55) | Subtracting intersection | Theorem | S - (T ∩ W) = (S - T) ∪ (S - W) | 6 |
| (11.55.1) | Set complement via difference | Theorem | ~ S = 𝐔 - S | 6 |
| (11.56) | Simple set comprehension inclusion | Theorem | { x ❙ P } ⊆ { x ❙ Q } ≡ (∀ x • P ⇒ Q ) | 6 |
| (11.56.99) | Antisymmetry of ⊆ | Theorem | X ⊆ Y ∧ Y ⊆ X ⇒ X = Y | 6 |
| (11.57) | Mutual inclusion | Theorem | X ⊆ Y ∧ Y ⊆ X ≡ X = Y | 6 |
| (11.58) | Reflexivity of ⊆ | Theorem | X ⊆ X | 6 |
| (11.58b) | Reflexivity of ⊆ | Theorem | S = T ⇒ S ⊆ T | 6 |
| (11.59) | Transitivity of ⊆ | Theorem | X ⊆ Y ⇒ (Y ⊆ Z ⇒ X ⊆ Z) | 1 |
| (11.59) | Transitivity of ⊆ | Theorem | X ⊆ Y ∧ Y ⊆ Z ⇒ X ⊆ Z | 6 |
| (11.59b) | Transitivity of ⊆；别名：Antitonicity of ⊆ | Theorem | X ⊆ Y ⇒ (Y ⊆ Z ⇒ X ⊆ Z) | 6 |
| (11.59c) | Flipped transitivity of ⊆；别名：Monotonicity of ⊆ | Theorem | Y ⊆ Z ⇒ (X ⊆ Y ⇒ X ⊆ Z) | 6 |
| (11.6) | Mathematical formulation of set comprehension | Theorem | { x ❙ P • E } = { y ❙ (∃ x ❙ P • y = E ) } | 6 |
| (11.60) | Empty set is least；别名：Bottom set | Theorem | {} ⊆ X | 6 |
| (11.61) | 原文未命名 | Theorem | S ⊂ T ≡ S ⊆ T ∧ ¬ (T ⊆ S) | 6 |
| (11.62) | 原文未命名 | Theorem | S ⊂ T ≡ S ⊆ T ∧ (∃ x ❙ x ∈ T • ¬ (x ∈ S) ) | 6 |
| (11.63) | Inclusion in terms of ⊂ | Theorem | S ⊆ T ≡ S ⊂ T ∨ S = T | 6 |
| (11.64) | Irreflexivity of ⊂ | Theorem | ¬ (S ⊂ S) | 6 |
| (11.65) | Inclusion of ⊂ in ⊆ | Theorem | S ⊂ T ⇒ S ⊆ T | 6 |
| (11.66) | 原文未命名 | Theorem | S ⊂ T ⇒ ¬ (T ⊆ S) | 6 |
| (11.67) | 原文未命名 | Theorem | S ⊆ T ⇒ ¬ (T ⊂ S) | 6 |
| (11.68) | 原文未命名 | Theorem | S ⊆ T ∧ ¬ (W ⊆ T) ⇒ ¬ (W ⊆ S) | 6 |
| (11.69) | 原文未命名 | Theorem | (∃ x ❙ x ∈ S • ¬ (x ∈ T) ) ⇒ S ≠ T | 6 |
| (11.70a) | Transitivity of ⊆ with ⊂ | Theorem | X ⊆ Y ∧ Y ⊂ Z ⇒ X ⊂ Z | 6 |
| (11.70b) | Transitivity of ⊂ with ⊆ | Theorem | X ⊂ Y ∧ Y ⊆ Z ⇒ X ⊂ Z | 6 |
| (11.70c) | Transitivity of ⊂ with ⊂ | Theorem | X ⊂ Y ∧ Y ⊂ Z ⇒ X ⊂ Z | 6 |
| (11.71) | Power set of {} | Theorem | ℙ {} = { {} } | 6 |
| (11.72) | 原文未命名 | Theorem | S ∈ ℙ S | 6 |
| (11.72.1) | Definition of ℙ | Theorem | ℙ S = { s ❙ s ⊆ S } | 6 |
| (11.7b) | Simple membership | Theorem | e ∈ { x ❙ P } ≡ P[x ≔ e] | 6 |
| (11.7x) | 原文未命名 | Theorem | x ∈ { x ❙ P } ≡ P | 6 |
| (11.7∀) | Simple membership | Theorem | (∀ x • x ∈ { x ❙ P } ≡ P ) | 6 |
| (11.9) | Simple set comprehension equality | Theorem | { x ❙ Q } = { x ❙ R } ≡ (∀ x • Q ≡ R ) | 6 |
| (14.2) | Pair equality | Axiom | ⟨b, c⟩ = ⟨b', c'⟩ ≡ b = b' ∧ c = c' | 5 |
| (14.4) | Membership in × | Theorem | ⟨x, y⟩ ∈ S × T ≡ x ∈ S ∧ y ∈ T | 5 |
| (14.5) | Membership in swapped × | Theorem | ⟨x, y⟩ ∈ S × T ≡ ⟨y, x⟩ ∈ T × S | 5 |
| (14.6) | Empty factor in × | Theorem | S = {} ⇒ S × T = {} | 5 |
| (15.13) | Unary minus | Axiom | a + - a = 0 | 1 |
| (15.14) | Subtraction | Axiom | a - b = a + - b | 1 |
| (15.17) | Self-inverse of unary minus | Theorem | - (- a) = a | 1 |
| (15.18) | Fixpoint of unary minus | Theorem | - 0 = 0 | 1 |
| (15.19) | Distributivity of unary minus over + | Theorem | - (a + b) = - a + - b | 1 |
| (15.1a) | Associativity of + | Axiom | (a + b) + c = a + (b + c) | 1 |
| (15.1b) | Associativity of · | Axiom | (a · b) · c = a · (b · c) | 1 |
| (15.20) | Negation as multiplication | Theorem | - a = - 1 · a | 1 |
| (15.21) | 原文未命名 | Theorem | - a · b = a · - b | 1 |
| (15.22) | Commutativity of unary minus with · | Theorem | a · - b = - (a · b) | 1 |
| (15.23) | 原文未命名 | Theorem | - a · - b = a · b | 1 |
| (15.24) | Right-identity of - | Theorem | a - 0 = a | 1 |
| (15.24a) | Subtraction of subtraction | Theorem | a - (b - c) = (a - b) + c | 1 |
| (15.25) | 原文未命名 | Theorem | (a - b) + (c - d) = (a + c) - (b + d) | 1 |
| (15.25a) | Mutual associativity of + and - | Theorem | a + (b - c) = (a + b) - c | 1 |
| (15.25b) | Subtraction of addition | Theorem | a - (b + c) = (a - b) - c | 1 |
| (15.25c) | Cancellation across added subtractions | Theorem | (a - b) + (b - c) = a - c | 1 |
| (15.26) | 原文未命名 | Theorem | (a - b) - (c - d) = (a + d) - (b + c) | 1 |
| (15.27) | 原文未命名 | Theorem | (a - b) · (c - d) = (a · c + b · d) - (a · d + b · c) | 1 |
| (15.29) | Distributivity of · over - | Theorem | (a - b) · c = a · c - b · c | 1 |
| (15.2a) | Symmetry of + | Axiom | a + b = b + a | 1 |
| (15.2b) | Symmetry of · | Axiom | a · b = b · a | 1 |
| (15.3) | Additive identity；别名：Identity of + | Axiom | 0 + a = a | 1 |
| (15.36) | Less；别名：Definition of < | Axiom | a < b ≡ pos (b - a) | 1 |
| (15.37) | Greater；别名：Definition of > | Axiom | a > b ≡ pos (a - b) | 1 |
| (15.38) | At most；别名：Definition of ≤ | Axiom | a ≤ b ≡ a < b ∨ a = b | 1 |
| (15.39) | At least；别名：Definition of ≥ | Axiom | a ≥ b ≡ a > b ∨ a = b | 1 |
| (15.4) | Multiplicative identity；别名：Identity of · | Axiom | 1 · a = a | 1 |
| (15.40) | Positive elements | Theorem | pos b ≡ 0 < b | 1 |
| (15.41a) | Transitivity；别名：Transitivity of < | Theorem | a < b ∧ b < c ⇒ a < c | 1 |
| (15.41b) | Transitivity；别名：Transitivity of ≤ with < | Theorem | a ≤ b ∧ b < c ⇒ a < c | 1 |
| (15.41c) | Transitivity；别名：Transitivity of < with ≤ | Theorem | a < b ∧ b ≤ c ⇒ a < c | 1 |
| (15.41d) | Transitivity；别名：Transitivity of ≤ | Theorem | a ≤ b ∧ b ≤ c ⇒ a ≤ c | 1 |
| (15.42) | <-Isotonicity of + | Theorem | a < b ≡ a + d < b + d | 1 |
| (15.42) | Monotonicity of ·；别名：<-Isotonicity of · | Theorem | 0 < d ⇒ (a < b ≡ a · d < b · d) | 1 |
| (15.44) | Trichotomy | Theorem | (a < b ≡ (a = b ≡ a > b)) ∧ ¬ (a < b ∧ (a = b ∧ a > b)) | 1 |
| (15.45) | Antisymmetry of ≤ | Theorem | a ≤ b ∧ b ≤ a ≡ a = b | 1 |
| (15.46) | Reflexivity of ≤ | Theorem | a ≤ a | 1 |
| (15.5) | Distributivity of · over + | Axiom | a · (b + c) = a · b + a · c | 1 |
| (15.9) | Zero of · | Axiom | a · 0 = 0 | 1 |
| (3.1) | Associativity of ≡ | Axiom | ((p ≡ q) ≡ r) ≡ (p ≡ (q ≡ r)) | 8 |
| (3.10) | Definition of ≢ | Axiom | (p ≢ q) ≡ ¬ (p ≡ q) | 8 |
| (3.11) | ¬ connection | Theorem | ¬ p ≡ (q ≡ (p ≡ ¬ q)) | 8 |
| (3.12) | Double negation | Theorem | ¬ (¬ p) ≡ p | 8 |
| (3.13) | Negation of `false` | Theorem | ¬ false ≡ true | 8 |
| (3.14) | 原文未命名 | Theorem | (p ≢ q) ≡ (¬ p ≡ q) | 8 |
| (3.15) | Definition of ¬ from ≡ | Theorem | ¬ p ≡ (p ≡ false) | 8 |
| (3.16) | Symmetry of ≢ | Theorem | (p ≢ q) ≡ (q ≢ p) | 8 |
| (3.17) | Associativity of ≢ | Theorem | ((p ≢ q) ≢ r) ≡ (p ≢ (q ≢ r)) | 8 |
| (3.18) | Mutual associativity of ≡ with ≢ | Theorem | ((p ≢ q) ≡ r) ≡ (p ≢ (q ≡ r)) | 8 |
| (3.19) | Mutual interchangeability of ≡ with ≢ | Theorem | (p ≢ (q ≡ r)) ≡ (p ≡ (q ≢ r)) | 8 |
| (3.2) | Symmetry of ≡ | Axiom | (p ≡ q) ≡ (q ≡ p) | 8 |
| (3.24) | Symmetry of ∨ | Axiom | p ∨ q ≡ q ∨ p | 8 |
| (3.25) | Associativity of ∨ | Axiom | (p ∨ q) ∨ r ≡ p ∨ (q ∨ r) | 8 |
| (3.26) | Idempotency of ∨ | Axiom | p ∨ p ≡ p | 8 |
| (3.27) | Distributivity of ∨ over ≡ | Axiom | p ∨ (q ≡ r) ≡ (p ∨ q ≡ p ∨ r) | 8 |
| (3.28) | Excluded middle；别名：LEM | Axiom | p ∨ ¬ p | 8 |
| (3.29) | Zero of ∨ | Theorem | p ∨ true ≡ true | 8 |
| (3.3) | Identity of ≡ | Axiom | true ≡ (q ≡ q) | 8 |
| (3.30) | Identity of ∨ | Theorem | p ∨ false ≡ p | 8 |
| (3.31) | Distributivity of ∨ over ∨ | Theorem | p ∨ (q ∨ r) ≡ (p ∨ q) ∨ (p ∨ r) | 8 |
| (3.32) | 原文未命名 | Theorem | p ∨ q ≡ (p ∨ ¬ q ≡ p) | 8 |
| (3.35) | Golden rule | Axiom | p ∧ q ≡ (p ≡ (q ≡ p ∨ q)) | 8 |
| (3.36) | Symmetry of ∧ | Theorem | p ∧ q ≡ q ∧ p | 8 |
| (3.37) | Associativity of ∧ | Theorem | (p ∧ q) ∧ r ≡ p ∧ (q ∧ r) | 8 |
| (3.38) | Idempotency of ∧ | Theorem | p ∧ p ≡ p | 8 |
| (3.39) | Identity of ∧ | Theorem | p ∧ true ≡ p | 8 |
| (3.4) | 原文未命名 | Theorem | true | 8 |
| (3.40) | Zero of ∧ | Theorem | p ∧ false ≡ false | 8 |
| (3.41) | Distributivity of ∧ over ∧ | Theorem | p ∧ (q ∧ r) ≡ (p ∧ q) ∧ (p ∧ r) | 8 |
| (3.42) | Contradiction | Theorem | p ∧ ¬ p ≡ false | 8 |
| (3.43a) | Absorption | Theorem | p ∧ (p ∨ q) ≡ p | 8 |
| (3.43b) | Absorption | Theorem | p ∨ (p ∧ q) ≡ p | 8 |
| (3.44a) | Absorption | Theorem | p ∧ (¬ p ∨ q) ≡ p ∧ q | 8 |
| (3.44b) | Absorption | Theorem | p ∨ (¬ p ∧ q) ≡ p ∨ q | 8 |
| (3.44c) | Absorption | Theorem | ¬ p ∧ (p ∨ q) ≡ ¬ p ∧ q | 8 |
| (3.44d) | Absorption | Theorem | ¬ p ∨ (p ∧ q) ≡ ¬ p ∨ q | 8 |
| (3.45) | Distributivity of ∨ over ∧ | Theorem | p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r) | 8 |
| (3.46) | Distributivity of ∧ over ∨ | Theorem | p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r) | 8 |
| (3.47a) | De Morgan | Theorem | ¬ (p ∧ q) ≡ ¬ p ∨ ¬ q | 8 |
| (3.47b) | De Morgan | Theorem | ¬ (p ∨ q) ≡ ¬ p ∧ ¬ q | 8 |
| (3.47c) | De Morgan | Theorem | ¬ (¬ p ∧ q) ≡ p ∨ ¬ q | 8 |
| (3.47d) | De Morgan | Theorem | ¬ (¬ p ∨ q) ≡ p ∧ ¬ q | 8 |
| (3.47e) | De Morgan dual of ∧ | Theorem | ¬ (¬ p ∧ ¬ q) ≡ p ∨ q | 8 |
| (3.47f) | De Morgan dual of ∨ | Theorem | ¬ (¬ p ∨ ¬ q) ≡ p ∧ q | 8 |
| (3.48) | 原文未命名 | Theorem | p ∧ q ≡ (p ∧ ¬ q ≡ ¬ p) | 8 |
| (3.49) | Semi-distributivity of ∧ over ≡ | Theorem | p ∧ (q ≡ r) ≡ (p ∧ q ≡ (p ∧ r ≡ p)) | 8 |
| (3.5) | Reflexivity of ≡ | Theorem | p ≡ p | 8 |
| (3.50) | Strong modus ponens for ≡ | Theorem | p ∧ (q ≡ p) ≡ p ∧ q | 8 |
| (3.51) | Replacement | Theorem | (p ≡ q) ∧ (r ≡ p) ≡ (p ≡ q) ∧ (r ≡ q) | 8 |
| (3.52) | Alternative definition of ≡ | Theorem | p ≡ (q ≡ (p ∧ q) ∨ (¬ p ∧ ¬ q)) | 8 |
| (3.53) | Exclusive or；别名：Alternative definition of ≢ | Theorem | (p ≢ q) ≡ (¬ p ∧ q) ∨ (p ∧ ¬ q) | 8 |
| (3.55) | 原文未命名 | Theorem | (p ∧ q) ∧ r ≡ (p ≡ (q ≡ (r ≡ (p ∨ q ≡ (q ∨ r ≡ (r ∨ p ≡ p ∨ (q ∨ r))))))) | 8 |
| (3.57) | Definition of ⇒ via ∨；别名：Definition of ⇒ from ∨、Definition of ⇒、Definition of implication | Axiom | p ⇒ q ≡ (p ∨ q ≡ q) | 8 |
| (3.57=) | Implication via ∨ | Lemma | (p ⇒ q) = (p ∨ q ≡ q) | 8 |
| (3.58) | Definition of ⇐；别名：Consequence | Axiom | p ⇐ q ≡ q ⇒ p | 8 |
| (3.59) | Material implication；别名：Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ ¬ p ∨ q | 8 |
| (3.60) | Definition of ⇒ via ∧；别名：Definition of ⇒ from ∧、Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ (p ∧ q ≡ p) | 8 |
| (3.60=) | Implication via ∧ | Lemma | (p ⇒ q) = (p ∧ q ≡ p) | 8 |
| (3.61) | Contrapositive | Theorem | p ⇒ q ≡ ¬ q ⇒ ¬ p | 8 |
| (3.61.1) | ¬-connection for ⇒ | Theorem | p ⇒ ¬ q ≡ q ⇒ ¬ p | 8 |
| (3.61.2) | ¬-connection for ⇒ | Theorem | ¬ p ⇒ q ≡ ¬ q ⇒ p | 8 |
| (3.62) | 原文未命名 | Theorem | p ⇒ (q ≡ r) ≡ (p ∧ q ≡ p ∧ r) | 8 |
| (3.63) | Distributivity of ⇒ over ≡ | Theorem | p ⇒ (q ≡ r) ≡ (p ⇒ q ≡ p ⇒ r) | 8 |
| (3.64) | Self-distributivity of ⇒ | Theorem | p ⇒ (q ⇒ r) ≡ (p ⇒ q) ⇒ (p ⇒ r) | 8 |
| (3.65) | Shunting | Theorem | p ∧ q ⇒ r ≡ p ⇒ (q ⇒ r) | 8 |
| (3.66) | Strong modus ponens | Theorem | p ∧ (p ⇒ q) ≡ p ∧ q | 8 |
| (3.67) | 原文未命名 | Theorem | p ∧ (q ⇒ p) ≡ p | 8 |
| (3.68) | 原文未命名 | Theorem | p ∨ (p ⇒ q) ≡ true | 8 |
| (3.69) | 原文未命名 | Theorem | p ∨ (q ⇒ p) ≡ q ⇒ p | 8 |
| (3.70) | 原文未命名 | Theorem | p ∨ q ⇒ p ∧ q ≡ (p ≡ q) | 8 |
| (3.71) | Reflexivity of ⇒ | Theorem | p ⇒ p | 8 |
| (3.72) | Right-zero of ⇒；别名：ex quodlibet verum | Theorem | p ⇒ true | 8 |
| (3.73) | Left-identity of ⇒ | Theorem | true ⇒ p ≡ p | 8 |
| (3.74) | Definition of ¬ from ⇒ | Theorem | p ⇒ false ≡ ¬ p | 8 |
| (3.75) | ex falso quodlibet | Theorem | false ⇒ p | 8 |
| (3.76a) | Weakening；别名：Strengthening | Theorem | p ⇒ p ∨ q | 8 |
| (3.76b) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p | 8 |
| (3.76c) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∨ q | 8 |
| (3.76d) | Weakening；别名：Strengthening | Theorem | p ∨ (q ∧ r) ⇒ p ∨ q | 8 |
| (3.76e) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∧ (q ∨ r) | 8 |
| (3.77) | Modus ponens | Theorem | p ∧ (p ⇒ q) ⇒ q | 8 |
| (3.78) | Case analysis | Theorem | (p ⇒ r) ∧ (q ⇒ r) ≡ p ∨ q ⇒ r | 8 |
| (3.79) | Case analysis | Theorem | (p ⇒ r) ∧ (¬ p ⇒ r) ≡ r | 8 |
| (3.8) | Definition of `false` | Axiom | false ≡ ¬ true | 8 |
| (3.80) | Mutual implication | Theorem | (p ⇒ q) ∧ (q ⇒ p) ≡ (p ≡ q) | 8 |
| (3.80.1) | Reflexivity of ⇒ wrt. ≡；别名：Reflexivity of ⇒ | Theorem | (p ≡ q) ⇒ (p ⇒ q) | 8 |
| (3.81) | Antisymmetry of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ p) ⇒ (p ≡ q) | 8 |
| (3.82.4) | Implication strengthening | Theorem | p ⇒ q ≡ p ⇒ p ∧ q | 8 |
| (3.82.5) | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 8 |
| (3.82a) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 8 |
| (3.82b) | Transitivity of ⇒ | Theorem | (p ≡ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 8 |
| (3.82c) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ≡ r) ⇒ (p ⇒ r) | 8 |
| (3.83) | Leibniz | Axiom | e = f ⇒ E[z ≔ e] = E[z ≔ f] | 8 |
| (3.83.1) | Leibniz | Corollary | d = e ⇒ f d = f e | 8 |
| (3.83.2) | Leibniz | Corollary | d = e ⇒ (p d ≡ p e) | 8 |
| (3.83.3) | Leibniz | Corollary | (d ≡ e) ⇒ (p d ≡ p e) | 8 |
| (3.83.4) | Leibniz | Corollary | (d ≡ e) ⇒ f d = f e | 8 |
| (3.84a) | Replacement | Theorem | e = f ∧ E[z ≔ e] ≡ e = f ∧ E[z ≔ f] | 8 |
| (3.84a≡) | Replacement | Theorem | (e ≡ f) ∧ E[z ≔ e] ≡ (e ≡ f) ∧ E[z ≔ f] | 8 |
| (3.84b) | Replacement | Theorem | e = f ⇒ E[z ≔ e] ≡ e = f ⇒ E[z ≔ f] | 8 |
| (3.84b≡) | Replacement | Theorem | (e ≡ f) ⇒ E[z ≔ e] ≡ (e ≡ f) ⇒ E[z ≔ f] | 8 |
| (3.84c) | Replacement | Theorem | q ∧ (e ≡ f) ⇒ E[z ≔ e] ≡ q ∧ (e ≡ f) ⇒ E[z ≔ f] | 8 |
| (3.84c) | Replacement | Theorem | q ∧ e = f ⇒ E[z ≔ e] ≡ q ∧ e = f ⇒ E[z ≔ f] | 8 |
| (3.85a) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] ≡ p ⇒ E[z ≔ true] | 8 |
| (3.85b) | Replace by `true` | Theorem | q ∧ p ⇒ E[z ≔ p] ≡ q ∧ p ⇒ E[z ≔ true] | 8 |
| (3.85c) | Replace by `false` | Theorem | ¬ p ⇒ E[z ≔ p] ≡ ¬ p ⇒ E[z ≔ false] | 8 |
| (3.85d) | Replace by `false` | Theorem | q ∧ ¬ p ⇒ E[z ≔ p] ≡ q ∧ ¬ p ⇒ E[z ≔ false] | 8 |
| (3.85e) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] = E[z ≔ true] | 8 |
| (3.86a) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ≡ E[z ≔ false] ⇒ p | 8 |
| (3.86b) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ∨ q ≡ E[z ≔ false] ⇒ p ∨ q | 8 |
| (3.87) | Replace by `true` | Theorem | p ∧ E[z ≔ p] ≡ p ∧ E[z ≔ true] | 8 |
| (3.87.1) | Abbreviated replace by `false` | Theorem | ¬ p ∧ E ≡ ¬ p ∧ E[p ≔ false] | 8 |
| (3.87.1) | Abbreviated replace by `true` | Theorem | p ∧ E ≡ p ∧ E[p ≔ true] | 8 |
| (3.88) | Replace by `false` | Theorem | p ∨ E[z ≔ p] ≡ p ∨ E[z ≔ false] | 8 |
| (3.89) | Shannon | Theorem | E[z ≔ p] ≡ (p ∧ E[z ≔ true]) ∨ (¬ p ∧ E[z ≔ false]) | 8 |
| (3.9) | Commutativity of ¬ with ≡ | Axiom | ¬ (p ≡ q) ≡ (¬ p ≡ q) | 8 |
| (4.3) | Left-monotonicity of ∧；别名：Monotonicity of ∧ | Theorem | (p ⇒ q) ⇒ (p ∧ r ⇒ q ∧ r) | 8 |
| (8.11) | Substitution into ∀ | Axiom | (∀ y ❙ R • P )[x ≔ F] ≡ (∀ y ❙ R[x ≔ F] • P[x ≔ F] ) | 8 |
| (8.11) | Substitution into ∃ | Axiom | (∃ y ❙ R • P )[x ≔ F] ≡ (∃ y ❙ R[x ≔ F] • P[x ≔ F] ) | 8 |
| (8.12.1) | Leibniz for ∀ range | Axiom | (∀ x • R₁ ≡ R₂ ) ⇒ ((∀ x ❙ R₁ • P ) ≡ (∀ x ❙ R₂ • P )) | 8 |
| (8.12.1) | Leibniz for ∃ range | Axiom | (∀ x • R₁ ≡ R₂ ) ⇒ ((∃ x ❙ R₁ • P ) ≡ (∃ x ❙ R₂ • P )) | 8 |
| (8.12.1₂) | Leibniz for ∀₂ range | Axiom | (∀ x, y • R₁ ≡ R₂ ) ⇒ ((∀ x, y ❙ R₁ • P ) ≡ (∀ x, y ❙ R₂ • P )) | 8 |
| (8.12.1₂) | Leibniz for ∃₂ range | Axiom | (∀ x, y • R₁ ≡ R₂ ) ⇒ ((∃ x, y ❙ R₁ • P ) ≡ (∃ x, y ❙ R₂ • P )) | 8 |
| (8.12.1₃) | Leibniz for ∀₃ range | Axiom | (∀ x, y, z • R₁ ≡ R₂ ) ⇒ ((∀ x, y, z ❙ R₁ • P ) ≡ (∀ x, y, z ❙ R₂ • P )) | 8 |
| (8.12.1₃) | Leibniz for ∃₃ range | Axiom | (∀ x, y, z • R₁ ≡ R₂ ) ⇒ ((∃ x, y, z ❙ R₁ • P ) ≡ (∃ x, y, z ❙ R₂ • P )) | 8 |
| (8.12.2) | Leibniz for ∀ body | Axiom | (∀ x • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∀ x ❙ R • P₁ ) ≡ (∀ x ❙ R • P₂ )) | 8 |
| (8.12.2) | Leibniz for ∃ body | Corollary | (∀ x ❙ R • P₁ ≡ P₂ ) ⇒ ((∃ x ❙ R • P₁ ) ≡ (∃ x ❙ R • P₂ )) | 8 |
| (8.12.2) | Leibniz for ∃ body | Axiom | (∀ x • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∃ x ❙ R • P₁ ) ≡ (∃ x ❙ R • P₂ )) | 8 |
| (8.12.2₂) | Leibniz for ∀₂ body | Axiom | (∀ x, y • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∀ x, y ❙ R • P₁ ) ≡ (∀ x, y ❙ R • P₂ )) | 8 |
| (8.12.2₂) | Leibniz for ∃₂ body | Axiom | (∀ x, y • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∃ x, y ❙ R • P₁ ) ≡ (∃ x, y ❙ R • P₂ )) | 8 |
| (8.12.2₃) | Leibniz for ∀₃ body | Axiom | (∀ x, y, z • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∀ x, y, z ❙ R • P₁ ) ≡ (∀ x, y, z ❙ R • P₂ )) | 8 |
| (8.12.2₃) | Leibniz for ∃₃ body | Axiom | (∀ x, y, z • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∃ x, y, z ❙ R • P₁ ) ≡ (∃ x, y, z ❙ R • P₂ )) | 8 |
| (8.13) | Empty range for ∀ | Axiom | (∀ x ❙ false • P ) ≡ true | 8 |
| (8.13) | Empty range for ∃ | Axiom | (∃ x ❙ false • P ) ≡ false | 8 |
| (8.14) | One-point rule for ∀ | Axiom | (∀ x ❙ x = E • P ) ≡ P[x ≔ E] | 8 |
| (8.14) | One-point rule for ∃ | Axiom | (∃ x ❙ x = E • P ) ≡ P[x ≔ E] | 8 |
| (8.15) | Distributivity of ∀ over ∧ | Axiom | (∀ x ❙ R • P ) ∧ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∧ Q ) | 8 |
| (8.15) | Distributivity of ∃ over ∨ | Axiom | (∃ x ❙ R • P ) ∨ (∃ x ❙ R • Q ) ≡ (∃ x ❙ R • P ∨ Q ) | 8 |
| (8.16) | Disjoint range split for ∀ | Theorem | (∀ x • R ∧ S ≡ false ) ⇒ ((∀ x ❙ R ∨ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P )) | 8 |
| (8.16) | Disjoint range split for ∃ | Theorem | (∀ x • R ∧ S ≡ false ) ⇒ ((∃ x ❙ R ∨ S • P ) ≡ (∃ x ❙ R • P ) ∨ (∃ x ❙ S • P )) | 8 |
| (8.16.1) | Alternative range split for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x ❙ R ∧ S • P ) ∧ (∀ x ❙ R ∧ ¬ S • P ) | 8 |
| (8.16.1) | Alternative range split for ∃ | Theorem | (∃ x ❙ R • P ) ≡ (∃ x ❙ R ∧ S • P ) ∨ (∃ x ❙ R ∧ ¬ S • P ) | 8 |
| (8.17) | General range split for ∀ | Axiom | (∀ x ❙ R ∨ S • P ) ∧ (∀ x ❙ R ∧ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P ) | 8 |
| (8.17) | General range split for ∃ | Axiom | (∃ x ❙ R ∨ S • P ) ∨ (∃ x ❙ R ∧ S • P ) ≡ (∃ x ❙ R • P ) ∨ (∃ x ❙ S • P ) | 8 |
| (8.18) | Range split for ∀ | Theorem | (∀ x ❙ R ∨ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P ) | 16 |
| (8.18) | Range split for ∀₂ | Theorem | (∀ x, y ❙ R ∨ S • P ) ≡ (∀ x, y ❙ R • P ) ∧ (∀ x, y ❙ S • P ) | 8 |
| (8.18) | Range split for ∃ | Theorem | (∃ x ❙ R ∨ S • P ) ≡ (∃ x ❙ R • P ) ∨ (∃ x ❙ S • P ) | 8 |
| (8.19) | Interchange of dummies for ∀ | Theorem | (∀ x ❙ R • (∀ y ❙ S • P ) ) ≡ (∀ y ❙ S • (∀ x ❙ R • P ) ) | 8 |
| (8.19) | Interchange of dummies for ∃ | Theorem | (∃ x ❙ R • (∃ y ❙ S • P ) ) ≡ (∃ y ❙ S • (∃ x ❙ R • P ) ) | 8 |
| (8.19.1) | Dummy list permutation for ∀ | Axiom | (∀ x, y ❙ R • P ) ≡ (∀ y, x ❙ R • P ) | 8 |
| (8.19.1) | Dummy list permutation for ∃ | Axiom | (∃ x, y ❙ R • P ) ≡ (∃ y, x ❙ R • P ) | 8 |
| (8.19.1) | Dummy list permutation₁+₂ for ∀ | Axiom | (∀ x, y, z ❙ R • P ) ≡ (∀ y, z, x ❙ R • P ) | 8 |
| (8.19.1) | Dummy list permutation₁+₂ for ∃ | Axiom | (∃ x, y, z ❙ R • P ) ≡ (∃ y, z, x ❙ R • P ) | 8 |
| (8.20) | Nesting for ∀ | Axiom | (∀ x, y ❙ R ∧ S • P ) ≡ (∀ x ❙ R • (∀ y ❙ S • P ) ) | 8 |
| (8.20) | Nesting for ∃ | Axiom | (∃ x, y ❙ R ∧ S • P ) ≡ (∃ x ❙ R • (∃ y ❙ S • P ) ) | 8 |
| (8.20) | Nesting₁+₂ for ∀ | Axiom | (∀ x, y, z ❙ R ∧ S • P ) ≡ (∀ x ❙ R • (∀ y, z ❙ S • P ) ) | 8 |
| (8.20) | Nesting₁+₂ for ∃ | Axiom | (∃ x, y, z ❙ R ∧ S • P ) ≡ (∃ x ❙ R • (∃ y, z ❙ S • P ) ) | 8 |
| (8.20) | Nesting₂+₁ for ∀ | Axiom | (∀ x, y, z ❙ R ∧ S • P ) ≡ (∀ x, y ❙ R • (∀ z ❙ S • P ) ) | 8 |
| (8.20) | Nesting₂+₁ for ∃ | Axiom | (∃ x, y, z ❙ R ∧ S • P ) ≡ (∃ x, y ❙ R • (∃ z ❙ S • P ) ) | 8 |
| (8.20.1) | Nesting for ∀ | Theorem | (∀ x, y ❙ S • P ) ≡ (∀ x • (∀ y ❙ S • P ) ) | 8 |
| (8.20.1) | Nesting for ∃ | Theorem | (∃ x, y ❙ S • P ) ≡ (∃ x • (∃ y ❙ S • P ) ) | 8 |
| (8.20.1) | Nesting₁+₂ for ∀ | Theorem | (∀ x, y, z ❙ S • P ) ≡ (∀ x • (∀ y, z ❙ S • P ) ) | 8 |
| (8.20.1) | Nesting₁+₂ for ∃ | Theorem | (∃ x, y, z ❙ S • P ) ≡ (∃ x • (∃ y, z ❙ S • P ) ) | 8 |
| (8.20.1) | Nesting₂+₁ for ∀ | Theorem | (∀ x, y, z ❙ S • P ) ≡ (∀ x, y • (∀ z ❙ S • P ) ) | 8 |
| (8.20.1) | Nesting₂+₁ for ∃ | Theorem | (∃ x, y, z ❙ S • P ) ≡ (∃ x, y • (∃ z ❙ S • P ) ) | 8 |
| (8.20.2) | Nesting for ∀ | Theorem | (∀ x, y ❙ R • P ) ≡ (∀ x ❙ R • (∀ y • P ) ) | 8 |
| (8.20.2) | Nesting for ∃ | Theorem | (∃ x, y ❙ R • P ) ≡ (∃ x ❙ R • (∃ y • P ) ) | 8 |
| (8.20.2) | Nesting₁+₂ for ∀ | Theorem | (∀ x, y, z ❙ R • P ) ≡ (∀ x ❙ R • (∀ y, z • P ) ) | 8 |
| (8.20.2) | Nesting₁+₂ for ∃ | Theorem | (∃ x, y, z ❙ R • P ) ≡ (∃ x ❙ R • (∃ y, z • P ) ) | 8 |
| (8.20.2) | Nesting₂+₁ for ∀ | Theorem | (∀ x, y, z ❙ R • P ) ≡ (∀ x, y ❙ R • (∀ z • P ) ) | 8 |
| (8.20.2) | Nesting₂+₁ for ∃ | Theorem | (∃ x, y, z ❙ R • P ) ≡ (∃ x, y ❙ R • (∃ z • P ) ) | 8 |
| (8.20.3) | Replacement in ∀ | Theorem | (∀ y ❙ R ∧ e = f • P[x ≔ e] ) ≡ (∀ y ❙ R ∧ e = f • P[x ≔ f] ) | 8 |
| (8.20.3) | Replacement in ∃ | Theorem | (∃ y ❙ R ∧ e = f • P[x ≔ e] ) ≡ (∃ y ❙ R ∧ e = f • P[x ≔ f] ) | 8 |
| (8.21) | Dummy renaming for ∀；别名：α-conversion | Theorem | (∀ x ❙ R • P ) ≡ (∀ y ❙ R[x ≔ y] • P[x ≔ y] ) | 8 |
| (8.21) | Dummy renaming for ∃；别名：α-conversion | Theorem | (∃ x ❙ R • P ) ≡ (∃ y ❙ R[x ≔ y] • P[x ≔ y] ) | 8 |
| (8.22) | Change of dummy in ∀ | Theorem | (∀ f • (∀ g • (∀ x • (∀ y • x = f y ≡ y = g x ) ) ⇒ ((∀ x ❙ R • P ) ≡ (∀ y ❙ R[x ≔ f y] • P[x ≔ f y] )) ) ) | 8 |
| (8.22) | Change of dummy in ∃ | Theorem | (∀ f • (∀ g • (∀ x • (∀ y • x = f y ≡ y = g x ) ) ⇒ ((∃ x ❙ R • P ) ≡ (∃ y ❙ R[x ≔ f y] • P[x ≔ f y] )) ) ) | 8 |
| (8.22.1) | Change of dummy in ∀ — variant | Theorem | (∀ x • (∀ y • x = f y ⇒ y = g x ) ) ⇒ ((∀ x ❙ R ∧ x = f (g x) • P ) ≡ (∀ y ❙ R[x ≔ f y] • P[x ≔ f y] )) | 8 |
| (8.22.1) | Change of dummy in ∃ — variant | Theorem | (∀ x • (∀ y • x = f y ⇒ y = g x ) ) ⇒ ((∃ x ❙ R ∧ x = f (g x) • P ) ≡ (∃ y ❙ R[x ≔ f y] • P[x ≔ f y] )) | 8 |
| (8.22.2) | Range replacement in nested ∀ | Lemma | (∀ x ❙ R • (∀ y • Q₁ ≡ Q₂ ) ) ⇒ ((∀ x ❙ R • (∀ y ❙ Q₁ • P ) ) ≡ (∀ x ❙ R • (∀ y ❙ Q₂ • P ) )) | 8 |
| (8.22.2) | Range replacement in nested ∃ | Lemma | (∀ x ❙ R • (∀ y • Q₁ ≡ Q₂ ) ) ⇒ ((∃ x ❙ R • (∃ y ❙ Q₁ • P ) ) ≡ (∃ x ❙ R • (∃ y ❙ Q₂ • P ) )) | 8 |
| (8.22.3) | Change of restricted dummy in ∀ | Theorem | (∀ f • (∀ g • (∀ x ❙ R • (∀ y • x = f y ≡ y = g x ) ) ⇒ ((∀ x ❙ R • P ) ≡ (∀ y ❙ R[x ≔ f y] • P[x ≔ f y] )) ) ) | 8 |
| (8.22.3) | Change of restricted dummy in ∃ | Theorem | (∀ f • (∀ g • (∀ x ❙ R • (∀ y • x = f y ≡ y = g x ) ) ⇒ ((∃ x ❙ R • P ) ≡ (∃ y ❙ R[x ≔ f y] • P[x ≔ f y] )) ) ) | 8 |
| (9.10) | Range weakening for ∀；别名：Range strengthening for ∀ | Theorem | (∀ x ❙ Q ∨ R • P ) ⇒ (∀ x ❙ Q • P ) | 8 |
| (9.11) | Body weakening for ∀；别名：Body strengthening for ∀ | Theorem | (∀ x ❙ R • P ∧ Q ) ⇒ (∀ x ❙ R • P ) | 8 |
| (9.12) | Monotonicity of ∀；别名：Body monotonicity of ∀ | Theorem | (∀ x ❙ R • Q ⇒ P ) ⇒ ((∀ x ❙ R • Q ) ⇒ (∀ x ❙ R • P )) | 8 |
| (9.12a) | Range antitonicity of ∀ | Theorem | (∀ x ❙ ¬ P • Q ⇒ R ) ⇒ ((∀ x ❙ R • P ) ⇒ (∀ x ❙ Q • P )) | 8 |
| (9.12a) | Range antitonicity of ∀ | Theorem | (∀ x • Q ⇒ R ) ⇒ ((∀ x ❙ R • P ) ⇒ (∀ x ❙ Q • P )) | 8 |
| (9.13) | Instantiation | Theorem | (∀ x • P ) ⇒ P[x ≔ E] | 8 |
| (9.13.1) | Instantiation | Theorem | (∀ x • P ) ⇒ P[x ≔ x] | 8 |
| (9.13.2) | Instantiation | Theorem | (∀ x ❙ R • P ) ⇒ (R ⇒ P)[x ≔ E] | 8 |
| (9.17) | Generalised De Morgan；别名：Definition of ∃ | Axiom | (∃ x ❙ R • P ) ≡ ¬ (∀ x ❙ R • ¬ P ) | 8 |
| (9.18a) | Generalised De Morgan | Theorem | ¬ (∃ x ❙ R • ¬ P ) ≡ (∀ x ❙ R • P ) | 8 |
| (9.18b) | Generalised De Morgan | Theorem | ¬ (∃ x ❙ R • P ) ≡ (∀ x ❙ R • ¬ P ) | 8 |
| (9.18c) | Generalised De Morgan | Theorem | (∃ x ❙ R • ¬ P ) ≡ ¬ (∀ x ❙ R • P ) | 8 |
| (9.19) | Trading for ∃ | Theorem | (∃ x ❙ R • P ) ≡ (∃ x • R ∧ P ) | 8 |
| (9.2) | Trading for ∀ | Axiom | (∀ x ❙ R • P ) ≡ (∀ x • R ⇒ P ) | 8 |
| (9.20) | Trading for ∃ | Theorem | (∃ x ❙ Q ∧ R • P ) ≡ (∃ x ❙ Q • R ∧ P ) | 8 |
| (9.21) | Distributivity of ∧ over ∃ | Theorem | P ∧ (∃ x ❙ R • Q ) ≡ (∃ x ❙ R • P ∧ Q ) | 8 |
| (9.22) | 原文未命名 | Theorem | P ∧ (∃ x • R ) ≡ (∃ x ❙ R • P ) | 8 |
| (9.22.1) | Distributivity of ∧ over ∀ | Theorem | (∃ x • R ) ⇒ (P ∧ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∧ Q )) | 8 |
| (9.23) | Distributivity of ∨ over ∃ | Theorem | (∃ x • R ) ⇒ (P ∨ (∃ x ❙ R • Q ) ≡ (∃ x ❙ R • P ∨ Q )) | 8 |
| (9.24) | False ∃ body | Theorem | (∃ x ❙ R • false ) ≡ false | 8 |
| (9.25) | Range weakening for ∃；别名：Range strengthening for ∃ | Theorem | (∃ x ❙ R • P ) ⇒ (∃ x ❙ Q ∨ R • P ) | 8 |
| (9.25.1) | Range weakening for ∃；别名：Range strengthening for ∃ | Theorem | (∃ x ❙ Q ∧ R • P ) ⇒ (∃ x ❙ R • P ) | 8 |
| (9.26) | Body weakening for ∃；别名：Body strengthening for ∃ | Theorem | (∃ x ❙ R • P ) ⇒ (∃ x ❙ R • P ∨ Q ) | 8 |
| (9.26.1) | Body weakening for ∃；别名：Body strengthening for ∃ | Theorem | (∃ x ❙ R • P ∧ Q ) ⇒ (∃ x ❙ R • P ) | 8 |
| (9.27) | Monotonicity of ∃；别名：Body monotonicity of ∃ | Theorem | (∀ x ❙ R • Q ⇒ P ) ⇒ ((∃ x ❙ R • Q ) ⇒ (∃ x ❙ R • P )) | 8 |
| (9.27.1) | Simple body-monotonicity of ∃ | Theorem | (∀ x • P ⇒ Q ) ⇒ ((∃ x ❙ R • P ) ⇒ (∃ x ❙ R • Q )) | 8 |
| (9.27.2) | Range monotonicity of ∃ | Theorem | (∀ x • Q ⇒ R ) ⇒ ((∃ x ❙ Q • P ) ⇒ (∃ x ❙ R • P )) | 8 |
| (9.27.3) | Range monotonicity of ∃ | Theorem | (∀ x ❙ P • Q ⇒ R ) ⇒ ((∃ x ❙ Q • P ) ⇒ (∃ x ❙ R • P )) | 8 |
| (9.28) | ∃-Introduction | Theorem | P[x ≔ E] ⇒ (∃ x • P ) | 8 |
| (9.28.1) | ∃-Introduction | Theorem | (R ∧ P)[x ≔ E] ⇒ (∃ x ❙ R • P ) | 8 |
| (9.29) | Interchange of quantifications | Theorem | (∃ x ❙ R • (∀ y ❙ Q • P ) ) ⇒ (∀ y ❙ Q • (∃ x ❙ R • P ) ) | 8 |
| (9.29.1) | Interchange of quantifications | Theorem | (∃ x • (∀ y • P ) ) ⇒ (∀ y • (∃ x • P ) ) | 8 |
| (9.30.1) | Witness | Theorem | (∃ x ❙ R • P ) ⇒ Q ≡ (∀ x • R ∧ P ⇒ Q ) | 8 |
| (9.30.2) | Witness | Theorem | (∃ x • P ) ⇒ Q ≡ (∀ x • P ⇒ Q ) | 8 |
| (9.3a) | Trading for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x • ¬ R ∨ P ) | 8 |
| (9.3b) | Trading for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x • R ∧ P ≡ R ) | 8 |
| (9.3c) | Trading for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x • R ∨ P ≡ P ) | 8 |
| (9.4a) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • R ⇒ P ) | 8 |
| (9.4b) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • ¬ R ∨ P ) | 8 |
| (9.4c) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • R ∧ P ≡ R ) | 8 |
| (9.4d) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • R ∨ P ≡ P ) | 8 |
| (9.5) | Distributivity of ∨ over ∀ | Axiom | P ∨ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∨ Q ) | 8 |
| (9.6) | 原文未命名 | Theorem | P ∨ (∀ x • ¬ R ) ≡ (∀ x ❙ R • P ) | 8 |
| (9.7) | Distributivity of ∧ over ∀ | Theorem | ¬ (∀ x • ¬ R ) ⇒ (P ∧ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∧ Q )) | 8 |
| (9.8) | True ∀ body | Theorem | (∀ x ❙ R • true ) | 8 |
| (9.9) | Sub-distributivity of ∀ over ≡ | Theorem | (∀ x ❙ R • P ≡ Q ) ⇒ ((∀ x ❙ R • P ) ≡ (∀ x ❙ R • Q )) | 8 |
| 未编号 · 00099d | ∧₆-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ (u ⇒ p ∧ (q ∧ (r ∧ (s ∧ (t ∧ u))))))))) | 8 |
| 未编号 · 0102c0 | Identity of ≢ | Theorem | (p ≢ false) ≡ p | 8 |
| 未编号 · 021cd3 | snd after swap-× | Theorem | snd (swap-× p) = fst p | 5 |
| 未编号 · 035aaa | Pair equality | Axiom | p = q ≡ fst p = fst q ∧ snd p = snd q | 5 |
| 未编号 · 0440d9 | Equivalence enrichment | Theorem | (p ≡ q) ⇒ ((p ⇒ r) ⇒ (p ⇒ q ∧ r)) | 8 |
| 未编号 · 08e6b7 | Monotonicity of ∧ | Theorem | (p ⇒ p') ⇒ ((q ⇒ q') ⇒ (p ∧ q ⇒ p' ∧ q')) | 8 |
| 未编号 · 0a2238 | Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ (p ∨ r ⇒ q ∨ r) | 8 |
| 未编号 · 0c7c25 | Transitivity；别名：Transitivity of > | Theorem | a > b ∧ b > c ⇒ a > c | 1 |
| 未编号 · 0f2ed1 | Contributing conjunct to ≡ | Theorem | (p ∧ q ≡ r) ∧ p ⇒ (q ≡ r) | 8 |
| 未编号 · 11c8af | Relation union | Theorem | a ⦗ R ∪ S ⦘ b ≡ a ⦗ R ⦘ b ∨ a ⦗ S ⦘ b | 3 |
| 未编号 · 123d6e | At least successor | Theorem | a > b ≡ a ≥ b + 1 | 1 |
| 未编号 · 12cef0 | Monotonicity of -；别名：≤-Monotonicity of - | Theorem | a ≤ b ⇒ a - d ≤ b - d | 1 |
| 未编号 · 157179 | Anti-isotonicity of unary minus；别名：≤-Anti-isotonicity of unary minus | Theorem | a ≤ b ≡ - b ≤ - a | 1 |
| 未编号 · 15c06f | Transitivity of = | Theorem | e = f ∧ f = g ⇒ e = g | 8 |
| 未编号 · 1a94c2 | <-Anti-isotonicity of unary minus | Theorem | a < b ≡ - b < - a | 1 |
| 未编号 · 1da292 | Membership in two-element set enumeration | Lemma | x ∈ { x, y } | 6 |
| 未编号 · 1e7608 | Inclusion in {} | Theorem | S ⊆ {} ≡ S = {} | 6 |
| 未编号 · 22c029 | Split-off top | Theorem | m ≤ n ⇒ (m ≤ i < n + 1 ≡ m ≤ i < n ∨ i = n) | 1 |
| 未编号 · 23785d | Adding consequent to ∧ | Theorem | (p ⇒ q) ⇒ (p ∧ r ⇒ p ∧ (q ∧ r)) | 8 |
| 未编号 · 24a375 | Definition of ≡ | Axiom | (p ≡ q) = (p = q) | 8 |
| 未编号 · 25737b | Co-residual of ∨ | Theorem | q ⇒ x ∨ p ≡ ¬ p ∧ q ⇒ x | 8 |
| 未编号 · 258db7 | Relation inclusion | Corollary | R ⊆ S ≡ (∀ x, y ❙ x ⦗ R ⦘ y • x ⦗ S ⦘ y ) | 3 |
| 未编号 · 266568 | Generalised one-point rule for ∀ | Theorem | R[x ≔ e] ⇒ (∀ x ❙ R ∧ x = e • E ) = E[x ≔ e] | 8 |
| 未编号 · 267c2e | Pair dummy joining for ∀ | Theorem | (∀ x : t₁; y : t₂ ❙ R • E ) = (∀ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 8 |
| 未编号 · 28ac42 | ≤-Isotonicity of - | Theorem | a ≤ b ≡ a - d ≤ b - d | 1 |
| 未编号 · 2977f6 | Proof by contradiction | Theorem | ¬ p ⇒ false ≡ p | 8 |
| 未编号 · 2989a8 | ≤-Monotonicity of + | Theorem | a ≤ b ⇒ a + d ≤ b + d | 1 |
| 未编号 · 29a570 | ∧₅-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ p ∧ (q ∧ (r ∧ (s ∧ t))))))) | 16 |
| 未编号 · 2b72bc | Definition of ∧ | Lemma | (p ∧ q) = (p ≡ (q ≡ p ∨ q)) | 8 |
| 未编号 · 302939 | Relation inclusion | Corollary | R ⊆ S ≡ (∀ x • (∀ y ❙ x ⦗ R ⦘ y • x ⦗ S ⦘ y ) ) | 3 |
| 未编号 · 303cfc | Complement of > | Theorem | a > b ≢ a ≤ b | 1 |
| 未编号 · 309d0d | One-point rule for ∀₂；别名：Two-point rule for ∀ | Theorem | (∀ x, y ❙ x = A ∧ y = B • P ) ≡ P[x, y ≔ A, B] | 8 |
| 未编号 · 30ad60 | Trichotomy — B | Theorem | ¬ (a < b ∧ (a = b ∧ a > b)) | 1 |
| 未编号 · 31d3fa | Preserving conjunct after ⇒ | Theorem | p ∧ q ⇒ r ≡ p ∧ q ⇒ p ∧ r | 8 |
| 未编号 · 3656ea | Membership in ⌞_⌟ | Theorem | (∀ x : t • x ∈ ⌞ t ⌟ ) | 6 |
| 未编号 · 38133d | Body weakening for ∀；别名：Body strengthening for ∀ | Theorem | (∀ x ❙ R • P ) ⇒ (∀ x ❙ R • Q ⇒ P ) | 8 |
| 未编号 · 38c228 | Empty relation | Theorem | a ⦗ {} ⦘ b ≡ false | 3 |
| 未编号 · 3a29bc | Set abbreviation | Theorem | { x ❙ P } = { x ❙ P • x } | 6 |
| 未编号 · 3aa5d0 | Monotonicity of ⇒；别名：Right-monotonicity of ⇒ | Theorem | (p ⇒ q) ⇒ ((r ⇒ p) ⇒ (r ⇒ q)) | 8 |
| 未编号 · 3c3941 | Introducing fresh ∀ | Theorem | P ⇒ (∀ x ❙ R • P ) | 8 |
| 未编号 · 3cdb84 | Pair dummy splitting for ∃ | Theorem | (∃ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∃ x : t₁; y : t₂ ❙ R[p ≔ ⟨x, y⟩] • E[p ≔ ⟨x, y⟩] ) | 8 |
| 未编号 · 3e0f4b | Cartesian product of universal sets | Theorem | 𝐔 × 𝐔 = 𝐔 | 3 |
| 未编号 · 430a99 | Relation extensionality | Corollary | R = S ≡ (∀ x, y • x ⦗ R ⦘ y ≡ x ⦗ S ⦘ y ) | 3 |
| 未编号 · 4364d7 | Irreflexivity of > | Theorem | a = b ⇒ ¬ (a > b) | 1 |
| 未编号 · 44bb82 | Boring disjoint range split for ∀ | Theorem | (R ∧ S ≡ false) ⇒ ((∀ x ❙ R ∨ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P )) | 8 |
| 未编号 · 478166 | Right-distributivity of ⇒ over ∧₃ | Theorem | p ⇒ q ∧ (r ∧ s) ≡ (p ⇒ q) ∧ ((p ⇒ r) ∧ (p ⇒ s)) | 8 |
| 未编号 · 4a62c3 | Irreflexivity of < | Theorem | ¬ (a < b ∧ a = b) | 1 |
| 未编号 · 4a98c7 | Pair extensionality | Theorem | p = ⟨fst p, snd p⟩ | 5 |
| 未编号 · 4adf37 | <-Monotonicity of + | Theorem | a < b ∧ c < d ⇒ a + c < b + d | 1 |
| 未编号 · 4b60c2 | ≤-Isotonicity of + | Theorem | a ≤ b ≡ a + d ≤ b + d | 1 |
| 未编号 · 4f50fa | Empty set | Theorem | {} = { x ❙ false } | 6 |
| 未编号 · 512e5b | Definition of `snd` | Axiom | snd ⟨x, y⟩ = y | 5 |
| 未编号 · 538ae9 | Definition of 𝕀 via `id` | Axiom | 𝕀 = id 𝐔 | 3 |
| 未编号 · 54dc6e | Relation complement | Theorem | a ⦗ ~ R ⦘ b ≡ ¬ (a ⦗ R ⦘ b) | 3 |
| 未编号 · 56906f | Converse of ≤ | Theorem | a ≥ b ≡ b ≤ a | 1 |
| 未编号 · 577081 | Pair dummy joining for ∃ | Theorem | (∃ x : t₁; y : t₂ ❙ R • E ) = (∃ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 8 |
| 未编号 · 57c1d9 | Membership in set enumeration | Lemma | x ∈ { u ❙ u = x ∨ R } | 6 |
| 未编号 · 59ca14 | Subset of ⌞_⌟ | Theorem | (∀ S : set t • S ⊆ ⌞ t ⌟ ) | 6 |
| 未编号 · 5aae8c | Definition of ≠ | Theorem | x ≠ y ≡ (x = y ≡ false) | 8 |
| 未编号 · 5c98a9 | Irreflexivity of > | Theorem | a > b ⇒ ¬ (a = b) | 1 |
| 未编号 · 5cb6cb | Pair dummy joining for ∃ | Theorem | (∃ x : t₁ • (∃ y : t₂ ❙ R • E ) ) = (∃ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 8 |
| 未编号 · 5f6c2d | Symmetry of ≠ | Theorem | x ≠ y ≡ y ≠ x | 8 |
| 未编号 · 635d6b | Irreflexivity of < | Theorem | a < b ⇒ ¬ (a = b) | 1 |
| 未编号 · 67761d | Least greater element | Theorem | a < b ≡ a + 1 ≤ b | 1 |
| 未编号 · 697e4a | Singleton relation inclusion | Lemma | { ⟨a, b⟩ } ⊆ R ≡ a ⦗ R ⦘ b | 3 |
| 未编号 · 6ab39c | Universal set | Theorem | x ∈ 𝐔 | 6 |
| 未编号 · 70f478 | ∧-Introduction | Theorem | p ⇒ (q ⇒ p ∧ q) | 8 |
| 未编号 · 741e9f | Membership in `Ran` | Axiom | y ∈ Ran R ≡ (∃ x • x ⦗ R ⦘ y ) | 3 |
| 未编号 · 771122 | ∧₄-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ p ∧ (q ∧ (r ∧ s))))) | 8 |
| 未编号 · 788acc | Relationship via 𝕀；别名：Identity relation | Theorem | x ⦗ 𝕀 ⦘ y ≡ x = y | 3 |
| 未编号 · 78d2c4 | Irreflexivity of > | Theorem | ¬ (a > b ∧ a = b) | 1 |
| 未编号 · 7907b0 | Less than successor | Theorem | a < b + 1 ≡ a ≤ b | 1 |
| 未编号 · 79d90c | Left-monotonicity of ∨；别名：Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ (p ∨ r ⇒ q ∨ r) | 8 |
| 未编号 · 7cec6b | Definition of `fst` | Axiom | fst ⟨x, y⟩ = x | 5 |
| 未编号 · 81fb75 | Relation inclusion | Corollary | R ⊆ S ≡ (∀ x, y • x ⦗ R ⦘ y ⇒ x ⦗ S ⦘ y ) | 3 |
| 未编号 · 858f00 | fst after swap-× | Theorem | fst (swap-× p) = snd p | 5 |
| 未编号 · 8665d0 | Definition of `swap-×` | Axiom | swap-× ⟨x, y⟩ = ⟨y, x⟩ | 5 |
| 未编号 · 86a35c | Abbreviated replacement in ∧；别名：Abbreviated replacement | Theorem | P ∧ x = E ≡ P[x ≔ E] ∧ x = E | 8 |
| 未编号 · 870e03 | Membership in `Dom` | Axiom | x ∈ Dom R ≡ (∃ y • x ⦗ R ⦘ y ) | 3 |
| 未编号 · 8876d6 | Case shuffling | Theorem | (p ∨ q) ∧ (¬ p ∨ r) ≡ (p ∧ r) ∨ (¬ p ∧ q) | 8 |
| 未编号 · 88e9cd | Two-sided ≤-Monotonicity of +；别名：≤-Monotonicity of + | Theorem | a ≤ b ∧ c ≤ d ⇒ a + c ≤ b + d | 1 |
| 未编号 · 8b8c1e | Singleton relation | Lemma | a₁ ⦗ { ⟨a₂, b₂⟩ } ⦘ b₁ ≡ a₁ = a₂ ∧ b₁ = b₂ | 3 |
| 未编号 · 8bea72 | Universal relation；别名：Relationship via `𝐔` | Theorem | a ⦗ 𝐔 ⦘ b | 3 |
| 未编号 · 8d781b | Universal set is greatest；别名：Top set | Theorem | X ⊆ 𝐔 | 6 |
| 未编号 · 8f45e9 | Monotonicity of ·；别名：≤-Isotonicity of · | Theorem | 0 < d ⇒ (a ≤ b ≡ a · d ≤ b · d) | 1 |
| 未编号 · 90956c | ⇒-Introduction | Primitive inference rule | ( p ⊦ q ) ⊦ p ⇒ q | 8 |
| 未编号 · 930ae9 | Universal set | Axiom | 𝐔 = { x ❙ true } | 6 |
| 未编号 · 94d527 | Weakening；别名：Strengthening | Theorem | (p ∨ q) ∧ r ⇒ p ∨ (q ∧ r) | 8 |
| 未编号 · 94e8f6 | Definition of ↔ | Axiom | t₁ ↔ t₂ = set ❰ t₁, t₂ ❱ | 3 |
| 未编号 · 94f30a | ∧₇-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ (u ⇒ (v ⇒ p ∧ (q ∧ (r ∧ (s ∧ (t ∧ (u ∧ v))))))))))) | 8 |
| 未编号 · 9941d0 | ∧₃-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ p ∧ (q ∧ r))) | 8 |
| 未编号 · 9b02ef | Relationship via × | Theorem | a ⦗ Y × Z ⦘ b ≡ a ∈ Y ∧ b ∈ Z | 3 |
| 未编号 · 9cb45b | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 8 |
| 未编号 · 9cd73a | Definition of ≠ | Axiom | x ≠ y ≡ ¬ (x = y) | 8 |
| 未编号 · 9dff39 | <-Monotonicity of + | Theorem | a < b ⇒ a + d < b + d | 1 |
| 未编号 · 9eb4a8 | Body weakening for ∀；别名：Body strengthening for ∀ | Theorem | (∀ x ❙ R • P ) ⇒ (∀ x ❙ R • P ∨ Q ) | 8 |
| 未编号 · a001f2 | Relation intersection | Theorem | a ⦗ R ∩ S ⦘ b ≡ a ⦗ R ⦘ b ∧ a ⦗ S ⦘ b | 3 |
| 未编号 · a1d54b | Definition of ⌞_⌟ | Axiom | ⌞ t ⌟ = { x : t • x } | 6 |
| 未编号 · a2a32a | Disjunction as implication | Lemma | p ∨ q ≡ ¬ p ⇒ q | 8 |
| 未编号 · a31008 | Pair dummy splitting for ∀ | Theorem | (∀ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∀ x : t₁; y : t₂ ❙ R[p ≔ ⟨x, y⟩] • E[p ≔ ⟨x, y⟩] ) | 8 |
| 未编号 · a3194e | Empty set | Theorem | x ∈ {} ≡ false | 6 |
| 未编号 · a3a8c5 | Weakening of ∩ within ∪ | Theorem | Q ∪ (S ∩ T) ⊆ Q ∪ S | 1 |
| 未编号 · a56b54 | Fresh ∀ | Theorem | P ≡ (∀ x • P ) | 8 |
| 未编号 · a73795 | Relation converse；别名：Relationship via ˘ | Axiom | y ⦗ R ˘ ⦘ x ≡ x ⦗ R ⦘ y | 3 |
| 未编号 · a8733b | Pair dummy joining for ∀ | Theorem | (∀ x : t₁ • (∀ y : t₂ ❙ R • E ) ) = (∀ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 8 |
| 未编号 · a967ba | Irreflexivity of < | Theorem | ¬ (a < a) | 1 |
| 未编号 · a9ba81 | Irreflexivity of < | Theorem | a = b ⇒ ¬ (a < b) | 1 |
| 未编号 · ad7fe9 | Generalised one-point rule for ∃ | Theorem | R[x ≔ e] ⇒ (∃ x ❙ R ∧ x = e • E ) = E[x ≔ e] | 8 |
| 未编号 · adbb13 | Split-off bottom | Theorem | m ≤ n ⇒ (m ≤ i < n + 1 ≡ m + 1 ≤ i < n + 1 ∨ i = m) | 1 |
| 未编号 · ae38b2 | Subset membership；别名：Casting | Theorem | X ⊆ Y ⇒ (x ∈ X ⇒ x ∈ Y) | 1 |
| 未编号 · affdb1 | Membership in × | Axiom | p ∈ S × T ≡ fst p ∈ S ∧ snd p ∈ T | 5 |
| 未编号 · b02619 | Trichotomy；别名：Trichotomy — ∨ | Theorem | a < b ∨ (a = b ∨ a > b) | 1 |
| 未编号 · b103d7 | Right-distributivity of ⇒ over ∧₄ | Theorem | p ⇒ q ∧ (r ∧ (s ∧ t)) ≡ (p ⇒ q) ∧ ((p ⇒ r) ∧ ((p ⇒ s) ∧ (p ⇒ t))) | 8 |
| 未编号 · b322bf | Relationship via ⌜_⌝ | Axiom | a ⦗ ⌜ f ⌝ ⦘ b ≡ (f a) b | 3 |
| 未编号 · b77dec | Abbreviated replacement in ⇒；别名：Abbreviated replacement | Theorem | x = E ⇒ P ≡ x = E ⇒ P[x ≔ E] | 8 |
| 未编号 · b86f5e | Irreflexivity of > | Theorem | ¬ (a > a) | 1 |
| 未编号 · b8a06d | Exclusive or implies inclusive | Theorem | (p ≢ q) ⇒ p ∨ q | 8 |
| 未编号 · ba79d6 | Successor greater | Theorem | a + 1 > b ≡ a ≥ b | 1 |
| 未编号 · bb97a0 | Negation of ≠ | Theorem | ¬ (x ≠ y) ≡ x = y | 8 |
| 未编号 · bdf087 | Antitonicity of ¬ | Theorem | (p ⇒ q) ⇒ (¬ q ⇒ ¬ p) | 8 |
| 未编号 · be1be4 | Pair dummy splitting for ∃ | Theorem | (∃ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∃ a : t₁ • (∃ b : t₂ ❙ R[p ≔ ⟨a, b⟩] • E[p ≔ ⟨a, b⟩] ) ) | 8 |
| 未编号 · bf36b8 | Golden rule for ∩ and ∪ | Theorem | S ∩ T = S ≡ T = S ∪ T | 1 |
| 未编号 · bf62e0 | Antitonicity of unary minus；别名：≤-Antitonicity of unary minus | Theorem | a ≤ b ⇒ - b ≤ - a | 1 |
| 未编号 · c0390b | Distributivity of ⇒ over ∀ | Theorem | P ⇒ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ⇒ Q ) | 8 |
| 未编号 · c0e057 | Leibniz for ∀ body | Theorem | (∀ x • P₁ ≡ P₂ ) ⇒ ((∀ x ❙ R • P₁ ) ≡ (∀ x ❙ R • P₂ )) | 8 |
| 未编号 · c11d51 | <-Monotonicity of + | Theorem | a < b ⇒ (c < d ⇒ a + c < b + d) | 1 |
| 未编号 · c1b248 | Relationship via `id` | Corollary | x ⦗ id S ⦘ y ≡ y = x ∈ S | 3 |
| 未编号 · c486b0 | Relationship via `id` | Axiom | x ⦗ id S ⦘ y ≡ x = y ∈ S | 3 |
| 未编号 · c4eac8 | Range weakening for ∀；别名：Range strengthening for ∀ | Theorem | (∀ x ❙ Q • P ) ⇒ (∀ x ❙ Q ∧ R • P ) | 8 |
| 未编号 · c506fd | Leibniz for ∀ body | Theorem | (∀ x ❙ R • P₁ ≡ P₂ ) ⇒ ((∀ x ❙ R • P₁ ) ≡ (∀ x ❙ R • P₂ )) | 8 |
| 未编号 · c8301e | Simple body-monotonicity of ∀ | Theorem | (∀ x • P ⇒ Q ) ⇒ ((∀ x ❙ R • P ) ⇒ (∀ x ❙ R • Q )) | 8 |
| 未编号 · c8e678 | <-Antitonicity of unary minus | Theorem | a < b ⇒ - b < - a | 1 |
| 未编号 · cb3ad2 | Relation pseudocomplement | Theorem | a ⦗ R ➩ S ⦘ b ≡ a ⦗ R ⦘ b ⇒ a ⦗ S ⦘ b | 3 |
| 未编号 · cc3374 | Antisymmetry of ≤ | Theorem | a ≤ b ⇒ (b ≤ a ⇒ a = b) | 1 |
| 未编号 · cc8feb | Trichotomy — A | Theorem | a < b ≡ (a = b ≡ a > b) | 1 |
| 未编号 · cdba4a | Asymmetry of < | Theorem | ¬ (a < b ∧ b < a) | 1 |
| 未编号 · ce5ae3 | Residual of ∧ | Theorem | x ∧ p ⇒ q ≡ x ⇒ (p ⇒ q) | 8 |
| 未编号 · d13235 | Relation composition | Axiom | a ⦗ R ⨾ S ⦘ c ≡ (∃ b • a ⦗ R ⦘ b ∧ b ⦗ S ⦘ c ) | 3 |
| 未编号 · d79ed2 | Relation difference | Theorem | a ⦗ R - S ⦘ b ≡ a ⦗ R ⦘ b ∧ ¬ (a ⦗ S ⦘ b) | 3 |
| 未编号 · de8a1e | Antitonicity of -；别名：≤-Antitonicity of - | Theorem | c ≤ b ⇒ a - b ≤ a - c | 1 |
| 未编号 · e13186 | Infix relationship；别名：Definition of `_⦗_⦘_` | Axiom | a ⦗ R ⦘ b ≡ ⟨a, b⟩ ∈ R | 3 |
| 未编号 · e18e5f | Irreflexivity of ≠ | Theorem | x ≠ x ≡ false | 8 |
| 未编号 · e2dbad | One-point rule for ∀₂² | Theorem | (∀ x, y ❙ y = B ∧ R • P ) ≡ (∀ x ❙ R[y ≔ B] • P[y ≔ B] ) | 8 |
| 未编号 · e364a1 | Antitonicity of ⇒；别名：Left-antitonicity of ⇒ | Theorem | (p ⇒ q) ⇒ ((q ⇒ r) ⇒ (p ⇒ r)) | 8 |
| 未编号 · e5bad3 | Least positive | Axiom | pos a ≡ 1 ≤ a | 1 |
| 未编号 · e72dae | Union | Axiom | e ∈ S ∪ T ≡ e ∈ S ∨ e ∈ T | 1 |
| 未编号 · eb923d | Boring disjoint range split for ∃ | Theorem | (R ∧ S ≡ false) ⇒ ((∃ x ❙ R ∨ S • P ) ≡ (∃ x ❙ R • P ) ∨ (∃ x ❙ S • P )) | 8 |
| 未编号 · f0fb23 | Relation inclusion | Theorem | R ⊆ S ≡ (∀ x • (∀ y • x ⦗ R ⦘ y ⇒ x ⦗ S ⦘ y ) ) | 3 |
| 未编号 · f1d779 | Cancellation of ¬ | Theorem | (¬ p ≡ ¬ q) = (p ≡ q) | 8 |
| 未编号 · f226ab | Transitivity of ≤ | Theorem | a ≤ b ⇒ (b ≤ c ⇒ a ≤ c) | 1 |
| 未编号 · f245f4 | One-point rule for ∀₂¹ | Theorem | (∀ x, y ❙ x = A ∧ R • P ) ≡ (∀ y ❙ R • P )[x ≔ A] | 8 |
| 未编号 · f32877 | Relation extensionality | Theorem | R = S ≡ (∀ x • (∀ y • x ⦗ R ⦘ y ≡ x ⦗ S ⦘ y ) ) | 3 |
| 未编号 · f4948f | Case shuffling | Theorem | (p ⇒ q) ∧ (¬ p ⇒ r) ≡ (p ∧ q) ∨ (¬ p ∧ r) | 8 |
| 未编号 · f651fd | Converse of < | Theorem | a > b ≡ b < a | 1 |
| 未编号 · f6b61a | Intersection | Axiom | e ∈ S ∩ T ≡ e ∈ S ∧ e ∈ T | 1 |
| 未编号 · f8a195 | Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ ((r ⇒ s) ⇒ (p ∨ r ⇒ q ∨ s)) | 16 |
| 未编号 · f93139 | Irreflexivity of ≠ | Theorem | ¬ (x ≠ x) | 8 |
| 未编号 · fa5564 | Cancellation of unary minus | Theorem | - a = - b ≡ a = b | 1 |
| 未编号 · fc3ef2 | Relationship via `𝐔 × 𝐔` | Theorem | a ⦗ 𝐔 × 𝐔 ⦘ b | 3 |
| 未编号 · fd7261 | Anti-isotonicity of -；别名：≤-Anti-isotonicity of - | Theorem | c ≤ b ≡ a - b ≤ a - c | 1 |
| 未编号 · fdb8c0 | Pair dummy splitting for ∀ | Theorem | (∀ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∀ a : t₁ • (∀ b : t₂ ❙ R[p ≔ ⟨a, b⟩] • E[p ≔ ⟨a, b⟩] ) ) | 8 |
| 未编号 · fe9fa0 | Complement of < | Theorem | a < b ≢ a ≥ b | 1 |

## 2025 · Week 8

对应 notebook：[2025i Exercise 8.2: Operators Combining Sets and Relations · 预载列表](http://130.113.68.214:15071/), [HW17 · CalcCheck preloaded theorem list](http://130.113.68.214:15069/)

| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |
|---|---|---|---|---:|
| (1.2) | Reflexivity of = | Axiom | x = x | 2 |
| (1.3) | Symmetry of = | Axiom | (x = y) = (y = x) | 2 |
| (1.4) | Transitivity of = | Derived inference rule | X = Y , Y = Z ⊦ X = Z | 2 |
| (1.5) | Leibniz | Derived inference rule | X = Y ⊦ E[z ≔ X] = E[z ≔ Y] | 2 |
| (11.101) | Singleton set membership | Lemma | x ∈ { y } ≡ x = y | 2 |
| (11.102) | Singleton set inclusion | Lemma | { x } ⊆ S ≡ x ∈ S | 2 |
| (11.103) | Lower ~ connection for ⊆ | Theorem | ~ X ⊆ Y ≡ ~ Y ⊆ X | 2 |
| (11.104) | Upper ~ connection for ⊆ | Theorem | X ⊆ ~ Y ≡ Y ⊆ ~ X | 2 |
| (11.105) | Golden rule for ∩ and ∪ | Theorem | S ∩ T = S ≡ T = S ∪ T | 2 |
| (11.106) | Anti-isotonicity of ~ | Theorem | R ⊆ S ≡ ~ S ⊆ ~ R | 2 |
| (11.107) | Antitonicity of ~ | Theorem | R ⊆ S ⇒ ~ S ⊆ ~ R | 2 |
| (11.108) | Monotonicity of set difference | Theorem | R ⊆ S ⇒ R - T ⊆ S - T | 2 |
| (11.109) | Antitonicity of set difference | Theorem | S ⊆ T ⇒ R - T ⊆ R - S | 2 |
| (11.111) | Characterisation of ➩ | Axiom | S ⊆ A ➩ B ≡ S ∩ A ⊆ B | 2 |
| (11.112) | Membership in ➩ | Theorem | x ∈ A ➩ B ≡ x ∈ A ⇒ x ∈ B | 2 |
| (11.113) | Definition of ➩ | Theorem | A ➩ B = ~ A ∪ B | 2 |
| (11.114) | Pseudocomplement of union | Theorem | (A ∪ B) ➩ C = (A ➩ C) ∩ (B ➩ C) | 2 |
| (11.115) | Monotonicity of ➩ | Theorem | B ⊆ C ⇒ A ➩ B ⊆ A ➩ C | 2 |
| (11.13) | Set inclusion；别名：Subset、Definition of ⊆ | Axiom | S ⊆ T ≡ (∀ e ❙ e ∈ S • e ∈ T ) | 2 |
| (11.13b) | Set inclusion；别名：Subset、Definition of ⊆ | Theorem | S ⊆ T ≡ (∀ e • e ∈ S ⇒ e ∈ T ) | 2 |
| (11.13c) | Subset membership；别名：Casting | Theorem | X ⊆ Y ⇒ (x ∈ X ⇒ x ∈ Y) | 2 |
| (11.13d) | Superset membership | Theorem | x ∈ X ⇒ (X ⊆ Y ⇒ x ∈ Y) | 2 |
| (11.14) | Proper subset；别名：Definition of ⊂ | Axiom | S ⊂ T ≡ S ⊆ T ∧ S ≠ T | 2 |
| (11.15) | Superset；别名：Definition of ⊇ | Axiom | T ⊇ S ≡ S ⊆ T | 2 |
| (11.16) | Proper superset；别名：Definition of ⊃ | Axiom | T ⊃ S ≡ S ⊂ T | 2 |
| (11.18) | Set complement；别名：Complement | Axiom | v ∈ ~ S ≡ ¬ (v ∈ S) | 2 |
| (11.19) | Self-inverse of ~ | Theorem | ~ (~ S) = S | 2 |
| (11.20) | Set union；别名：Union | Axiom | v ∈ S ∪ T ≡ v ∈ S ∨ v ∈ T | 2 |
| (11.21) | Set intersection；别名：Intersection | Axiom | v ∈ S ∩ T ≡ v ∈ S ∧ v ∈ T | 2 |
| (11.22) | Set difference | Axiom | v ∈ S - T ≡ v ∈ S ∧ ¬ (v ∈ T) | 2 |
| (11.23) | Membership in ℙ；别名：Power set | Axiom | v ∈ ℙ S ≡ v ⊆ S | 2 |
| (11.26) | Symmetry of ∪ | Theorem | S ∪ T = T ∪ S | 2 |
| (11.27) | Associativity of ∪ | Theorem | S ∪ (T ∪ W) = (S ∪ T) ∪ W | 2 |
| (11.28) | Idempotency of ∪ | Theorem | S ∪ S = S | 2 |
| (11.29) | Zero of ∪ | Theorem | S ∪ 𝐔 = 𝐔 | 2 |
| (11.3) | Set membership | Axiom | F ∈ { x ❙ R • E } ≡ (∃ x ❙ R • F = E ) | 2 |
| (11.30) | Identity of ∪ | Theorem | S ∪ {} = S | 2 |
| (11.31) | Weakening of ∪ | Theorem | S ⊆ S ∪ T | 2 |
| (11.32) | Excluded middle for ∪；别名：Union with complement | Theorem | S ∪ ~ S = 𝐔 | 2 |
| (11.33) | Symmetry of ∩ | Theorem | S ∩ T = T ∩ S | 2 |
| (11.34) | Associativity of ∩ | Theorem | S ∩ (T ∩ W) = (S ∩ T) ∩ W | 2 |
| (11.35) | Idempotency of ∩ | Theorem | S ∩ S = S | 2 |
| (11.36) | Zero of ∩ | Theorem | S ∩ {} = {} | 2 |
| (11.37) | Identity of ∩ | Theorem | S ∩ 𝐔 = S | 2 |
| (11.38) | Weakening of ∩ | Theorem | S ∩ T ⊆ S | 2 |
| (11.39) | Contradiction for ∩；别名：Intersection with complement | Theorem | S ∩ ~ S = {} | 2 |
| (11.4) | Set extensionality | Axiom | S = T ≡ (∀ e • e ∈ S ≡ e ∈ T ) | 2 |
| (11.40) | Distributivity of ∪ over ∩ | Theorem | S ∪ (T ∩ W) = (S ∪ T) ∩ (S ∪ W) | 2 |
| (11.41) | Distributivity of ∩ over ∪ | Theorem | S ∩ (T ∪ W) = (S ∩ T) ∪ (S ∩ W) | 2 |
| (11.42a) | De Morgan for ∪；别名：Complement of ∪ | Theorem | ~ (S ∪ T) = ~ S ∩ ~ T | 2 |
| (11.42b) | De Morgan for ∩；别名：Complement of ∩ | Theorem | ~ (S ∩ T) = ~ S ∪ ~ T | 2 |
| (11.43) | Monotonicity of ∪ | Theorem | S ⊆ T ∧ V ⊆ W ⇒ S ∪ V ⊆ T ∪ W | 2 |
| (11.43b) | Monotonicity of ∪ | Theorem | S ⊆ T ⇒ S ∪ W ⊆ T ∪ W | 2 |
| (11.44) | Monotonicity of ∩ | Theorem | S ⊆ T ∧ V ⊆ W ⇒ S ∩ V ⊆ T ∩ W | 2 |
| (11.44b) | Monotonicity of ∩ | Theorem | S ⊆ T ⇒ S ∩ W ⊆ T ∩ W | 2 |
| (11.45) | Set inclusion via ∪ | Theorem | S ⊆ T ≡ S ∪ T = T | 2 |
| (11.46) | Set inclusion via ∩ | Theorem | S ⊆ T ≡ S ∩ T = S | 2 |
| (11.47) | 原文未命名 | Theorem | S ∪ T = 𝐔 ≡ (∀ x • ¬ (x ∈ S) ⇒ x ∈ T ) | 2 |
| (11.48) | 原文未命名 | Theorem | S ∩ T = {} ≡ (∀ x • x ∈ S ⇒ ¬ (x ∈ T) ) | 2 |
| (11.49) | Set difference via ∩ | Theorem | S - T = S ∩ ~ T | 2 |
| (11.5) | Set comprehension expansion | Theorem | S = { x ❙ x ∈ S • x } | 2 |
| (11.50) | Weakening for set difference | Theorem | S - T ⊆ S | 2 |
| (11.51) | Right-identity of set difference | Theorem | S - {} = S | 2 |
| (11.52) | 原文未命名 | Theorem | S ∩ (T - S) = {} | 2 |
| (11.53) | Union cancels difference | Theorem | S ∪ (T - S) = S ∪ T | 2 |
| (11.54) | Subtracting union | Theorem | S - (T ∪ W) = (S - T) ∩ (S - W) | 2 |
| (11.55) | Subtracting intersection | Theorem | S - (T ∩ W) = (S - T) ∪ (S - W) | 2 |
| (11.55.1) | Set complement via difference | Theorem | ~ S = 𝐔 - S | 2 |
| (11.56) | Simple set comprehension inclusion | Theorem | { x ❙ P } ⊆ { x ❙ Q } ≡ (∀ x • P ⇒ Q ) | 2 |
| (11.56.99) | Antisymmetry of ⊆ | Theorem | X ⊆ Y ∧ Y ⊆ X ⇒ X = Y | 2 |
| (11.57) | Mutual inclusion | Theorem | X ⊆ Y ∧ Y ⊆ X ≡ X = Y | 2 |
| (11.58) | Reflexivity of ⊆ | Theorem | X ⊆ X | 2 |
| (11.58b) | Reflexivity of ⊆ | Theorem | S = T ⇒ S ⊆ T | 2 |
| (11.59) | Transitivity of ⊆ | Theorem | X ⊆ Y ∧ Y ⊆ Z ⇒ X ⊆ Z | 2 |
| (11.59b) | Transitivity of ⊆；别名：Antitonicity of ⊆ | Theorem | X ⊆ Y ⇒ (Y ⊆ Z ⇒ X ⊆ Z) | 2 |
| (11.59c) | Flipped transitivity of ⊆；别名：Monotonicity of ⊆ | Theorem | Y ⊆ Z ⇒ (X ⊆ Y ⇒ X ⊆ Z) | 2 |
| (11.6) | Mathematical formulation of set comprehension | Theorem | { x ❙ P • E } = { y ❙ (∃ x ❙ P • y = E ) } | 2 |
| (11.60) | Empty set is least；别名：Bottom set | Theorem | {} ⊆ X | 2 |
| (11.61) | 原文未命名 | Theorem | S ⊂ T ≡ S ⊆ T ∧ ¬ (T ⊆ S) | 2 |
| (11.62) | 原文未命名 | Theorem | S ⊂ T ≡ S ⊆ T ∧ (∃ x ❙ x ∈ T • ¬ (x ∈ S) ) | 2 |
| (11.63) | Inclusion in terms of ⊂ | Theorem | S ⊆ T ≡ S ⊂ T ∨ S = T | 2 |
| (11.64) | Irreflexivity of ⊂ | Theorem | ¬ (S ⊂ S) | 2 |
| (11.65) | Inclusion of ⊂ in ⊆ | Theorem | S ⊂ T ⇒ S ⊆ T | 2 |
| (11.66) | 原文未命名 | Theorem | S ⊂ T ⇒ ¬ (T ⊆ S) | 2 |
| (11.67) | 原文未命名 | Theorem | S ⊆ T ⇒ ¬ (T ⊂ S) | 2 |
| (11.68) | 原文未命名 | Theorem | S ⊆ T ∧ ¬ (W ⊆ T) ⇒ ¬ (W ⊆ S) | 2 |
| (11.69) | 原文未命名 | Theorem | (∃ x ❙ x ∈ S • ¬ (x ∈ T) ) ⇒ S ≠ T | 2 |
| (11.70a) | Transitivity of ⊆ with ⊂ | Theorem | X ⊆ Y ∧ Y ⊂ Z ⇒ X ⊂ Z | 2 |
| (11.70b) | Transitivity of ⊂ with ⊆ | Theorem | X ⊂ Y ∧ Y ⊆ Z ⇒ X ⊂ Z | 2 |
| (11.70c) | Transitivity of ⊂ with ⊂ | Theorem | X ⊂ Y ∧ Y ⊂ Z ⇒ X ⊂ Z | 2 |
| (11.71) | Power set of {} | Theorem | ℙ {} = { {} } | 2 |
| (11.72) | 原文未命名 | Theorem | S ∈ ℙ S | 2 |
| (11.72.1) | Definition of ℙ | Theorem | ℙ S = { s ❙ s ⊆ S } | 2 |
| (11.7b) | Simple membership | Theorem | e ∈ { x ❙ P } ≡ P[x ≔ e] | 2 |
| (11.7x) | 原文未命名 | Theorem | x ∈ { x ❙ P } ≡ P | 2 |
| (11.7∀) | Simple membership | Theorem | (∀ x • x ∈ { x ❙ P } ≡ P ) | 2 |
| (11.9) | Simple set comprehension equality | Theorem | { x ❙ Q } = { x ❙ R } ≡ (∀ x • Q ≡ R ) | 2 |
| (14.101) | Domain of union | Theorem | Dom  (R ∪ S) = Dom  R ∪ Dom  S | 1 |
| (14.102) | Range of union | Theorem | Ran  (R ∪ S) = Ran  R ∪ Ran  S | 1 |
| (14.103) | Domain of intersection | Theorem | Dom  (R ∩ S) ⊆ Dom  R ∩ Dom  S | 1 |
| (14.104) | Range of intersection | Theorem | Ran  (R ∩ S) ⊆ Ran  R ∩ Ran  S | 1 |
| (14.19a) | Domain of converse | Theorem | Dom  (R ˘) = Ran  R | 1 |
| (14.19b) | Range of converse | Theorem | Ran  (R ˘) = Dom  R | 1 |
| (14.2) | Pair equality | Axiom | ⟨b, c⟩ = ⟨b', c'⟩ ≡ b = b' ∧ c = c' | 2 |
| (14.201) | Definition of ◁ | Axiom | A ◁ R = R ∩ (A × 𝐔) | 1 |
| (14.202) | Definition of ▷ | Axiom | R ▷ B = R ∩ (𝐔 × B) | 1 |
| (14.203) | Definition of ⩤ | Axiom | A ⩤ R = R ∩ (~ A × 𝐔) | 1 |
| (14.204) | Definition of ⩥ | Axiom | R ⩥ B = R ∩ (𝐔 × ~ B) | 1 |
| (14.205) | Definition of ⩤ via ◁ | Lemma | A ⩤ R = ~ A ◁ R | 1 |
| (14.206) | Definition of ⩥ via ▷ | Lemma | R ⩥ B = R ▷ ~ B | 1 |
| (14.207) | Distributivity of ◁ over relation intersection | Theorem | A ◁ (R ∩ S) = (A ◁ R) ∩ (A ◁ S) | 1 |
| (14.208) | Distributivity of ◁ over set intersection | Theorem | (A ∩ B) ◁ R = (A ◁ R) ∩ (B ◁ R) | 1 |
| (14.209) | Distributivity of ◁ over relation union | Theorem | A ◁ (R ∪ S) = (A ◁ R) ∪ (A ◁ S) | 1 |
| (14.210) | Distributivity of ◁ over set union | Theorem | (A ∪ B) ◁ R = (A ◁ R) ∪ (B ◁ R) | 1 |
| (14.211) | Definition of ▷ via ◁ | Theorem | R ▷ B = (B ◁ R ˘) ˘ | 1 |
| (14.212) | Definition of ◁ via ▷ | Theorem | A ◁ R = (R ˘ ▷ A) ˘ | 1 |
| (14.213) | Distributivity of ▷ over relation intersection | Theorem | (R ∩ S) ▷ B = (R ▷ B) ∩ (S ▷ B) | 1 |
| (14.214) | Distributivity of ▷ over set intersection | Theorem | R ▷ (B ∩ C) = (R ▷ B) ∩ (R ▷ C) | 1 |
| (14.215) | Distributivity of ▷ over relation union | Theorem | (R ∪ S) ▷ B = (R ▷ B) ∪ (S ▷ B) | 1 |
| (14.216) | Distributivity of ▷ over set union | Theorem | R ▷ (B ∪ C) = (R ▷ B) ∪ (R ▷ C) | 1 |
| (14.217) | Definition of ⩥ via ⩤ | Theorem | R ⩥ B = (B ⩤ R ˘) ˘ | 1 |
| (14.218) | Definition of ⩤ via ⩥ | Theorem | A ⩤ R = (R ˘ ⩥ A) ˘ | 1 |
| (14.219) | Distributivity of ⩤ over relation intersection | Theorem | A ⩤ (R ∩ S) = (A ⩤ R) ∩ (A ⩤ S) | 1 |
| (14.220) | Distributivity of ⩤ over relation union | Theorem | A ⩤ (R ∪ S) = (A ⩤ R) ∪ (A ⩤ S) | 1 |
| (14.221) | Distributivity of ⩥ over relation intersection | Theorem | (R ∩ S) ⩥ B = (R ⩥ B) ∩ (S ⩥ B) | 1 |
| (14.222) | Distributivity of ⩥ over relation union | Theorem | (R ∪ S) ⩥ B = (R ⩥ B) ∪ (S ⩥ B) | 1 |
| (14.223) | Co-distributivity of ⩤ over set intersection | Theorem | (A ∩ B) ⩤ R = (A ⩤ R) ∪ (B ⩤ R) | 1 |
| (14.224) | Co-distributivity of ⩤ over set union | Theorem | (A ∪ B) ⩤ R = (A ⩤ R) ∩ (B ⩤ R) | 1 |
| (14.225) | Co-distributivity of ⩥ over set intersection | Theorem | R ⩥ (B ∩ C) = (R ⩥ B) ∪ (R ⩥ C) | 1 |
| (14.226) | Co-distributivity of ⩥ over set union | Theorem | R ⩥ (B ∪ C) = (R ⩥ B) ∩ (R ⩥ C) | 1 |
| (14.227) | Relationship via ◁；别名：Domain restriction | Theorem | x ⦗ A ◁ R ⦘ y ≡ x ∈ A ∧ x ⦗ R ⦘ y | 1 |
| (14.228) | Relationship via ▷；别名：Range restriction | Theorem | x ⦗ R ▷ B ⦘ y ≡ x ⦗ R ⦘ y ∈ B | 1 |
| (14.229) | Relationship via ⩤；别名：Domain antirestriction | Theorem | x ⦗ A ⩤ R ⦘ y ≡ ¬ (x ∈ A) ∧ x ⦗ R ⦘ y | 1 |
| (14.230) | Relationship via ⩥；别名：Range antirestriction | Theorem | x ⦗ R ⩥ B ⦘ y ≡ x ⦗ R ⦘ y ∧ ¬ (y ∈ B) | 1 |
| (14.231) | Domain of ◁ | Theorem | Dom  (A ◁ R) = A ∩ Dom  R | 1 |
| (14.232) | Range of ▷ | Theorem | Ran  (R ▷ B) = Ran  R ∩ B | 1 |
| (14.233) | Domain of ⩤ | Theorem | Dom  (A ⩤ R) = Dom  R - A | 1 |
| (14.234) | Range of ⩥ | Theorem | Ran  (R ⩥ B) = Ran  R - B | 1 |
| (14.235) | Domain restriction by `Dom` | Theorem | Dom  S ◁ S = S | 1 |
| (14.236) | Range restriction by `Ran` | Theorem | S ▷ Ran  S = S | 1 |
| (14.237) | Domain restriction via ⨾ | Theorem | A ◁ R = id A ⨾ R | 1 |
| (14.238) | Domain antirestriction via ⨾ | Theorem | A ⩤ R = id (~ A) ⨾ R | 1 |
| (14.239) | Range restriction via ⨾ | Theorem | R ▷ B = R ⨾ id B | 1 |
| (14.240) | Range antirestriction via ⨾ | Theorem | R ⩥ B = R ⨾ id (~ B) | 1 |
| (14.241) | Switching ▷ and ◁ in ⨾ | Theorem | (R ▷ B) ⨾ S = R ⨾ (B ◁ S) | 1 |
| (14.242) | Switching ⩥ and ⩤ in ⨾ | Theorem | (R ⩥ B) ⨾ S = R ⨾ (B ⩤ S) | 1 |
| (14.243) | Mutual associativity of ◁ with ⨾ | Theorem | (A ◁ R) ⨾ S = A ◁ R ⨾ S | 1 |
| (14.244) | Mutual associativity of ⩤ with ⨾ | Theorem | (A ⩤ R) ⨾ S = A ⩤ R ⨾ S | 1 |
| (14.245) | Mutual associativity of ⨾ with ▷ | Theorem | R ⨾ S ▷ C = R ⨾ (S ▷ C) | 1 |
| (14.246) | Mutual associativity of ⨾ with ⩥ | Theorem | R ⨾ S ⩥ C = R ⨾ (S ⩥ C) | 1 |
| (14.247) | Nested ◁ | Theorem | A ◁ (B ◁ R) = (A ∩ B) ◁ R | 1 |
| (14.248) | Nested ⩤ | Theorem | A ⩤ (B ⩤ R) = (A ∪ B) ⩤ R | 1 |
| (14.249) | Nested ▷ | Theorem | (R ▷ A) ▷ B = R ▷ (A ∩ B) | 1 |
| (14.250) | Nested ⩥ | Theorem | (R ⩥ A) ⩥ B = R ⩥ (A ∪ B) | 1 |
| (14.251) | Monotonicity of ◁ | Theorem | A ⊆ B ⇒ A ◁ R ⊆ B ◁ R | 1 |
| (14.252) | Monotonicity of ◁ | Theorem | R ⊆ S ⇒ A ◁ R ⊆ A ◁ S | 1 |
| (14.253) | Monotonicity of ◁ | Theorem | A ⊆ B ∧ R ⊆ S ⇒ A ◁ R ⊆ B ◁ S | 1 |
| (14.254) | Monotonicity of ▷ | Theorem | A ⊆ B ⇒ R ▷ A ⊆ R ▷ B | 1 |
| (14.255) | Monotonicity of ▷ | Theorem | R ⊆ S ⇒ R ▷ A ⊆ S ▷ A | 1 |
| (14.256) | Monotonicity of ▷ | Theorem | R ⊆ S ∧ A ⊆ B ⇒ R ▷ A ⊆ S ▷ B | 1 |
| (14.257) | Antitonicity of ⩤ | Theorem | A ⊆ B ⇒ B ⩤ R ⊆ A ⩤ R | 1 |
| (14.258) | Monotonicity of ⩤ | Theorem | R ⊆ S ⇒ A ⩤ R ⊆ A ⩤ S | 1 |
| (14.259) | Antitonicity of ⩥ | Theorem | A ⊆ B ⇒ R ⩥ B ⊆ R ⩥ A | 1 |
| (14.260) | Monotonicity of ⩥ | Theorem | R ⊆ S ⇒ R ⩥ A ⊆ S ⩥ A | 1 |
| (14.301) | Definition of ⦇_⦈；别名：Range of ◁ | Axiom | R ⦇ A ⦈ = Ran  (A ◁ R) | 1 |
| (14.302) | Relational image | Theorem | y ∈ R ⦇ A ⦈ ≡ (∃ x ❙ x ∈ A • x ⦗ R ⦘ y ) | 1 |
| (14.303) | Relational image under ⨾；别名：Relational image of ⨾ | Theorem | (R ⨾ S) ⦇ A ⦈ = S ⦇ (R ⦇ A ⦈) ⦈ | 1 |
| (14.304) | Relational image under converse；别名：Domain of ▷ | Theorem | Dom  (R ▷ B) = (R ˘) ⦇ B ⦈ | 1 |
| (14.305) | Range of ⩤ | Theorem | Ran  (A ⩤ R) = R ⦇ (~ A) ⦈ | 1 |
| (14.306) | Domain of ⩥ | Theorem | Dom  (R ⩥ B) = (R ˘) ⦇ (~ B) ⦈ | 1 |
| (14.4) | Membership in × | Theorem | ⟨x, y⟩ ∈ S × T ≡ x ∈ S ∧ y ∈ T | 2 |
| (14.401) | Definition of ⊕ | Axiom | R ⊕ S = (Dom  S ⩤ R) ∪ S | 1 |
| (14.402) | Relation override | Theorem | x ⦗ R ⊕ S ⦘ y ≡ (¬ (x ∈ Dom  S) ∧ x ⦗ R ⦘ y) ∨ x ⦗ S ⦘ y | 1 |
| (14.403) | Left-distributivity of ⊕ over ∪ | Theorem | (Q ∪ R) ⊕ S = (Q ⊕ S) ∪ (R ⊕ S) | 1 |
| (14.404) | Domain of ⊕ | Theorem | Dom  (R ⊕ S) = Dom  R ∪ Dom  S | 1 |
| (14.405) | Associativity of ⊕ | Theorem | (Q ⊕ R) ⊕ S = Q ⊕ (R ⊕ S) | 1 |
| (14.406) | Range of ⊕ | Theorem | Ran  (R ⊕ S) = R ⦇ (~ Dom  S) ⦈ ∪ Ran  S | 1 |
| (14.5) | Membership in swapped × | Theorem | ⟨x, y⟩ ∈ S × T ≡ ⟨y, x⟩ ∈ T × S | 2 |
| (14.6) | Empty factor in × | Theorem | S = {} ⇒ S × T = {} | 2 |
| (14.8) | Distributivity of × over ∪ | Theorem | S × (T ∪ U) = (S × T) ∪ (S × U) | 2 |
| (14.8) | Distributivity of × over ∪ | Theorem | (S ∪ T) × U = (S × U) ∪ (T × U) | 2 |
| (14.9) | Distributivity of × over ∩ | Theorem | S × (T ∩ U) = (S × T) ∩ (S × U) | 2 |
| (14.9) | Distributivity of × over ∩ | Theorem | (S ∩ T) × U = (S × U) ∩ (T × U) | 2 |
| (3.1) | Associativity of ≡ | Axiom | ((p ≡ q) ≡ r) ≡ (p ≡ (q ≡ r)) | 2 |
| (3.10) | Definition of ≢ | Axiom | (p ≢ q) ≡ ¬ (p ≡ q) | 2 |
| (3.11) | ¬ connection | Theorem | ¬ p ≡ (q ≡ (p ≡ ¬ q)) | 2 |
| (3.12) | Double negation | Theorem | ¬ (¬ p) ≡ p | 2 |
| (3.13) | Negation of `false` | Theorem | ¬ false ≡ true | 2 |
| (3.14) | 原文未命名 | Theorem | (p ≢ q) ≡ (¬ p ≡ q) | 2 |
| (3.15) | Definition of ¬ from ≡ | Theorem | ¬ p ≡ (p ≡ false) | 2 |
| (3.16) | Symmetry of ≢ | Theorem | (p ≢ q) ≡ (q ≢ p) | 2 |
| (3.17) | Associativity of ≢ | Theorem | ((p ≢ q) ≢ r) ≡ (p ≢ (q ≢ r)) | 2 |
| (3.18) | Mutual associativity of ≡ with ≢ | Theorem | ((p ≢ q) ≡ r) ≡ (p ≢ (q ≡ r)) | 2 |
| (3.19) | Mutual interchangeability of ≡ with ≢ | Theorem | (p ≢ (q ≡ r)) ≡ (p ≡ (q ≢ r)) | 2 |
| (3.2) | Symmetry of ≡ | Axiom | (p ≡ q) ≡ (q ≡ p) | 2 |
| (3.24) | Symmetry of ∨ | Axiom | p ∨ q ≡ q ∨ p | 2 |
| (3.25) | Associativity of ∨ | Axiom | (p ∨ q) ∨ r ≡ p ∨ (q ∨ r) | 2 |
| (3.26) | Idempotency of ∨ | Axiom | p ∨ p ≡ p | 2 |
| (3.27) | Distributivity of ∨ over ≡ | Axiom | p ∨ (q ≡ r) ≡ (p ∨ q ≡ p ∨ r) | 2 |
| (3.28) | Excluded middle；别名：LEM | Axiom | p ∨ ¬ p | 2 |
| (3.29) | Zero of ∨ | Theorem | p ∨ true ≡ true | 2 |
| (3.3) | Identity of ≡ | Axiom | true ≡ (q ≡ q) | 2 |
| (3.30) | Identity of ∨ | Theorem | p ∨ false ≡ p | 2 |
| (3.31) | Distributivity of ∨ over ∨ | Theorem | p ∨ (q ∨ r) ≡ (p ∨ q) ∨ (p ∨ r) | 2 |
| (3.32) | 原文未命名 | Theorem | p ∨ q ≡ (p ∨ ¬ q ≡ p) | 2 |
| (3.35) | Golden rule | Axiom | p ∧ q ≡ (p ≡ (q ≡ p ∨ q)) | 2 |
| (3.36) | Symmetry of ∧ | Theorem | p ∧ q ≡ q ∧ p | 2 |
| (3.37) | Associativity of ∧ | Theorem | (p ∧ q) ∧ r ≡ p ∧ (q ∧ r) | 2 |
| (3.38) | Idempotency of ∧ | Theorem | p ∧ p ≡ p | 2 |
| (3.39) | Identity of ∧ | Theorem | p ∧ true ≡ p | 2 |
| (3.4) | 原文未命名 | Theorem | true | 2 |
| (3.40) | Zero of ∧ | Theorem | p ∧ false ≡ false | 2 |
| (3.41) | Distributivity of ∧ over ∧ | Theorem | p ∧ (q ∧ r) ≡ (p ∧ q) ∧ (p ∧ r) | 2 |
| (3.42) | Contradiction | Theorem | p ∧ ¬ p ≡ false | 2 |
| (3.43a) | Absorption | Theorem | p ∧ (p ∨ q) ≡ p | 2 |
| (3.43b) | Absorption | Theorem | p ∨ (p ∧ q) ≡ p | 2 |
| (3.44a) | Absorption | Theorem | p ∧ (¬ p ∨ q) ≡ p ∧ q | 2 |
| (3.44b) | Absorption | Theorem | p ∨ (¬ p ∧ q) ≡ p ∨ q | 2 |
| (3.44c) | Absorption | Theorem | ¬ p ∧ (p ∨ q) ≡ ¬ p ∧ q | 2 |
| (3.44d) | Absorption | Theorem | ¬ p ∨ (p ∧ q) ≡ ¬ p ∨ q | 2 |
| (3.45) | Distributivity of ∨ over ∧ | Theorem | p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r) | 2 |
| (3.46) | Distributivity of ∧ over ∨ | Theorem | p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r) | 2 |
| (3.47a) | De Morgan | Theorem | ¬ (p ∧ q) ≡ ¬ p ∨ ¬ q | 2 |
| (3.47b) | De Morgan | Theorem | ¬ (p ∨ q) ≡ ¬ p ∧ ¬ q | 2 |
| (3.47c) | De Morgan | Theorem | ¬ (¬ p ∧ q) ≡ p ∨ ¬ q | 2 |
| (3.47d) | De Morgan | Theorem | ¬ (¬ p ∨ q) ≡ p ∧ ¬ q | 2 |
| (3.47e) | De Morgan dual of ∧ | Theorem | ¬ (¬ p ∧ ¬ q) ≡ p ∨ q | 2 |
| (3.47f) | De Morgan dual of ∨ | Theorem | ¬ (¬ p ∨ ¬ q) ≡ p ∧ q | 2 |
| (3.48) | 原文未命名 | Theorem | p ∧ q ≡ (p ∧ ¬ q ≡ ¬ p) | 2 |
| (3.49) | Semi-distributivity of ∧ over ≡ | Theorem | p ∧ (q ≡ r) ≡ (p ∧ q ≡ (p ∧ r ≡ p)) | 2 |
| (3.5) | Reflexivity of ≡ | Theorem | p ≡ p | 2 |
| (3.50) | Strong modus ponens for ≡ | Theorem | p ∧ (q ≡ p) ≡ p ∧ q | 2 |
| (3.51) | Replacement | Theorem | (p ≡ q) ∧ (r ≡ p) ≡ (p ≡ q) ∧ (r ≡ q) | 2 |
| (3.52) | Alternative definition of ≡ | Theorem | p ≡ (q ≡ (p ∧ q) ∨ (¬ p ∧ ¬ q)) | 2 |
| (3.53) | Exclusive or；别名：Alternative definition of ≢ | Theorem | (p ≢ q) ≡ (¬ p ∧ q) ∨ (p ∧ ¬ q) | 2 |
| (3.55) | 原文未命名 | Theorem | (p ∧ q) ∧ r ≡ (p ≡ (q ≡ (r ≡ (p ∨ q ≡ (q ∨ r ≡ (r ∨ p ≡ p ∨ (q ∨ r))))))) | 2 |
| (3.57) | Definition of ⇒ via ∨；别名：Definition of ⇒ from ∨、Definition of ⇒、Definition of implication | Axiom | p ⇒ q ≡ (p ∨ q ≡ q) | 2 |
| (3.57=) | Implication via ∨ | Lemma | (p ⇒ q) = (p ∨ q ≡ q) | 2 |
| (3.58) | Definition of ⇐；别名：Consequence | Axiom | p ⇐ q ≡ q ⇒ p | 2 |
| (3.59) | Material implication；别名：Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ ¬ p ∨ q | 2 |
| (3.60) | Definition of ⇒ via ∧；别名：Definition of ⇒ from ∧、Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ (p ∧ q ≡ p) | 2 |
| (3.60=) | Implication via ∧ | Lemma | (p ⇒ q) = (p ∧ q ≡ p) | 2 |
| (3.61) | Contrapositive | Theorem | p ⇒ q ≡ ¬ q ⇒ ¬ p | 2 |
| (3.61.1) | ¬-connection for ⇒ | Theorem | p ⇒ ¬ q ≡ q ⇒ ¬ p | 2 |
| (3.61.2) | ¬-connection for ⇒ | Theorem | ¬ p ⇒ q ≡ ¬ q ⇒ p | 2 |
| (3.62) | 原文未命名 | Theorem | p ⇒ (q ≡ r) ≡ (p ∧ q ≡ p ∧ r) | 2 |
| (3.63) | Distributivity of ⇒ over ≡ | Theorem | p ⇒ (q ≡ r) ≡ (p ⇒ q ≡ p ⇒ r) | 2 |
| (3.64) | Self-distributivity of ⇒ | Theorem | p ⇒ (q ⇒ r) ≡ (p ⇒ q) ⇒ (p ⇒ r) | 2 |
| (3.65) | Shunting | Theorem | p ∧ q ⇒ r ≡ p ⇒ (q ⇒ r) | 2 |
| (3.66) | Strong modus ponens | Theorem | p ∧ (p ⇒ q) ≡ p ∧ q | 2 |
| (3.67) | 原文未命名 | Theorem | p ∧ (q ⇒ p) ≡ p | 2 |
| (3.68) | 原文未命名 | Theorem | p ∨ (p ⇒ q) ≡ true | 2 |
| (3.69) | 原文未命名 | Theorem | p ∨ (q ⇒ p) ≡ q ⇒ p | 2 |
| (3.70) | 原文未命名 | Theorem | p ∨ q ⇒ p ∧ q ≡ (p ≡ q) | 2 |
| (3.71) | Reflexivity of ⇒ | Theorem | p ⇒ p | 2 |
| (3.72) | Right-zero of ⇒；别名：ex quodlibet verum | Theorem | p ⇒ true | 2 |
| (3.73) | Left-identity of ⇒ | Theorem | true ⇒ p ≡ p | 2 |
| (3.74) | Definition of ¬ from ⇒ | Theorem | p ⇒ false ≡ ¬ p | 2 |
| (3.75) | ex falso quodlibet | Theorem | false ⇒ p | 2 |
| (3.76a) | Weakening；别名：Strengthening | Theorem | p ⇒ p ∨ q | 2 |
| (3.76b) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p | 2 |
| (3.76c) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∨ q | 2 |
| (3.76d) | Weakening；别名：Strengthening | Theorem | p ∨ (q ∧ r) ⇒ p ∨ q | 2 |
| (3.76e) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∧ (q ∨ r) | 2 |
| (3.77) | Modus ponens | Theorem | p ∧ (p ⇒ q) ⇒ q | 2 |
| (3.78) | Case analysis | Theorem | (p ⇒ r) ∧ (q ⇒ r) ≡ p ∨ q ⇒ r | 2 |
| (3.79) | Case analysis | Theorem | (p ⇒ r) ∧ (¬ p ⇒ r) ≡ r | 2 |
| (3.8) | Definition of `false` | Axiom | false ≡ ¬ true | 2 |
| (3.80) | Mutual implication | Theorem | (p ⇒ q) ∧ (q ⇒ p) ≡ (p ≡ q) | 2 |
| (3.80.1) | Reflexivity of ⇒ wrt. ≡；别名：Reflexivity of ⇒ | Theorem | (p ≡ q) ⇒ (p ⇒ q) | 2 |
| (3.81) | Antisymmetry of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ p) ⇒ (p ≡ q) | 2 |
| (3.82.4) | Implication strengthening | Theorem | p ⇒ q ≡ p ⇒ p ∧ q | 2 |
| (3.82.5) | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 2 |
| (3.82a) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 2 |
| (3.82b) | Transitivity of ⇒ | Theorem | (p ≡ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 2 |
| (3.82c) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ≡ r) ⇒ (p ⇒ r) | 2 |
| (3.83) | Leibniz | Axiom | e = f ⇒ E[z ≔ e] = E[z ≔ f] | 2 |
| (3.83.1) | Leibniz | Corollary | d = e ⇒ f d = f e | 2 |
| (3.83.2) | Leibniz | Corollary | d = e ⇒ (p d ≡ p e) | 2 |
| (3.83.3) | Leibniz | Corollary | (d ≡ e) ⇒ (p d ≡ p e) | 2 |
| (3.83.4) | Leibniz | Corollary | (d ≡ e) ⇒ f d = f e | 2 |
| (3.84a) | Replacement | Theorem | e = f ∧ E[z ≔ e] ≡ e = f ∧ E[z ≔ f] | 2 |
| (3.84a≡) | Replacement | Theorem | (e ≡ f) ∧ E[z ≔ e] ≡ (e ≡ f) ∧ E[z ≔ f] | 2 |
| (3.84b) | Replacement | Theorem | e = f ⇒ E[z ≔ e] ≡ e = f ⇒ E[z ≔ f] | 2 |
| (3.84b≡) | Replacement | Theorem | (e ≡ f) ⇒ E[z ≔ e] ≡ (e ≡ f) ⇒ E[z ≔ f] | 2 |
| (3.84c) | Replacement | Theorem | q ∧ (e ≡ f) ⇒ E[z ≔ e] ≡ q ∧ (e ≡ f) ⇒ E[z ≔ f] | 2 |
| (3.84c) | Replacement | Theorem | q ∧ e = f ⇒ E[z ≔ e] ≡ q ∧ e = f ⇒ E[z ≔ f] | 2 |
| (3.85a) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] ≡ p ⇒ E[z ≔ true] | 2 |
| (3.85b) | Replace by `true` | Theorem | q ∧ p ⇒ E[z ≔ p] ≡ q ∧ p ⇒ E[z ≔ true] | 2 |
| (3.85c) | Replace by `false` | Theorem | ¬ p ⇒ E[z ≔ p] ≡ ¬ p ⇒ E[z ≔ false] | 2 |
| (3.85d) | Replace by `false` | Theorem | q ∧ ¬ p ⇒ E[z ≔ p] ≡ q ∧ ¬ p ⇒ E[z ≔ false] | 2 |
| (3.85e) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] = E[z ≔ true] | 2 |
| (3.86a) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ≡ E[z ≔ false] ⇒ p | 2 |
| (3.86b) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ∨ q ≡ E[z ≔ false] ⇒ p ∨ q | 2 |
| (3.87) | Replace by `true` | Theorem | p ∧ E[z ≔ p] ≡ p ∧ E[z ≔ true] | 2 |
| (3.87.1) | Abbreviated replace by `false` | Theorem | ¬ p ∧ E ≡ ¬ p ∧ E[p ≔ false] | 2 |
| (3.87.1) | Abbreviated replace by `true` | Theorem | p ∧ E ≡ p ∧ E[p ≔ true] | 2 |
| (3.88) | Replace by `false` | Theorem | p ∨ E[z ≔ p] ≡ p ∨ E[z ≔ false] | 2 |
| (3.89) | Shannon | Theorem | E[z ≔ p] ≡ (p ∧ E[z ≔ true]) ∨ (¬ p ∧ E[z ≔ false]) | 2 |
| (3.9) | Commutativity of ¬ with ≡ | Axiom | ¬ (p ≡ q) ≡ (¬ p ≡ q) | 2 |
| (4.3) | Left-monotonicity of ∧；别名：Monotonicity of ∧ | Theorem | (p ⇒ q) ⇒ (p ∧ r ⇒ q ∧ r) | 2 |
| (8.11) | Substitution into ∀ | Axiom | (∀ y ❙ R • P )[x ≔ F] ≡ (∀ y ❙ R[x ≔ F] • P[x ≔ F] ) | 2 |
| (8.11) | Substitution into ∃ | Axiom | (∃ y ❙ R • P )[x ≔ F] ≡ (∃ y ❙ R[x ≔ F] • P[x ≔ F] ) | 2 |
| (8.12.1) | Leibniz for ∀ range | Axiom | (∀ x • R₁ ≡ R₂ ) ⇒ ((∀ x ❙ R₁ • P ) ≡ (∀ x ❙ R₂ • P )) | 2 |
| (8.12.1) | Leibniz for ∃ range | Axiom | (∀ x • R₁ ≡ R₂ ) ⇒ ((∃ x ❙ R₁ • P ) ≡ (∃ x ❙ R₂ • P )) | 2 |
| (8.12.1₂) | Leibniz for ∀₂ range | Axiom | (∀ x, y • R₁ ≡ R₂ ) ⇒ ((∀ x, y ❙ R₁ • P ) ≡ (∀ x, y ❙ R₂ • P )) | 2 |
| (8.12.1₂) | Leibniz for ∃₂ range | Axiom | (∀ x, y • R₁ ≡ R₂ ) ⇒ ((∃ x, y ❙ R₁ • P ) ≡ (∃ x, y ❙ R₂ • P )) | 2 |
| (8.12.1₃) | Leibniz for ∀₃ range | Axiom | (∀ x, y, z • R₁ ≡ R₂ ) ⇒ ((∀ x, y, z ❙ R₁ • P ) ≡ (∀ x, y, z ❙ R₂ • P )) | 2 |
| (8.12.1₃) | Leibniz for ∃₃ range | Axiom | (∀ x, y, z • R₁ ≡ R₂ ) ⇒ ((∃ x, y, z ❙ R₁ • P ) ≡ (∃ x, y, z ❙ R₂ • P )) | 2 |
| (8.12.2) | Leibniz for ∀ body | Axiom | (∀ x • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∀ x ❙ R • P₁ ) ≡ (∀ x ❙ R • P₂ )) | 2 |
| (8.12.2) | Leibniz for ∃ body | Corollary | (∀ x ❙ R • P₁ ≡ P₂ ) ⇒ ((∃ x ❙ R • P₁ ) ≡ (∃ x ❙ R • P₂ )) | 2 |
| (8.12.2) | Leibniz for ∃ body | Axiom | (∀ x • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∃ x ❙ R • P₁ ) ≡ (∃ x ❙ R • P₂ )) | 2 |
| (8.12.2₂) | Leibniz for ∀₂ body | Axiom | (∀ x, y • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∀ x, y ❙ R • P₁ ) ≡ (∀ x, y ❙ R • P₂ )) | 2 |
| (8.12.2₂) | Leibniz for ∃₂ body | Axiom | (∀ x, y • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∃ x, y ❙ R • P₁ ) ≡ (∃ x, y ❙ R • P₂ )) | 2 |
| (8.12.2₃) | Leibniz for ∀₃ body | Axiom | (∀ x, y, z • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∀ x, y, z ❙ R • P₁ ) ≡ (∀ x, y, z ❙ R • P₂ )) | 2 |
| (8.12.2₃) | Leibniz for ∃₃ body | Axiom | (∀ x, y, z • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∃ x, y, z ❙ R • P₁ ) ≡ (∃ x, y, z ❙ R • P₂ )) | 2 |
| (8.13) | Empty range for ∀ | Axiom | (∀ x ❙ false • P ) ≡ true | 2 |
| (8.13) | Empty range for ∃ | Axiom | (∃ x ❙ false • P ) ≡ false | 2 |
| (8.14) | One-point rule for ∀ | Axiom | (∀ x ❙ x = E • P ) ≡ P[x ≔ E] | 2 |
| (8.14) | One-point rule for ∃ | Axiom | (∃ x ❙ x = E • P ) ≡ P[x ≔ E] | 2 |
| (8.15) | Distributivity of ∀ over ∧ | Axiom | (∀ x ❙ R • P ) ∧ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∧ Q ) | 2 |
| (8.15) | Distributivity of ∃ over ∨ | Axiom | (∃ x ❙ R • P ) ∨ (∃ x ❙ R • Q ) ≡ (∃ x ❙ R • P ∨ Q ) | 2 |
| (8.16) | Disjoint range split for ∀ | Theorem | (∀ x • R ∧ S ≡ false ) ⇒ ((∀ x ❙ R ∨ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P )) | 2 |
| (8.16) | Disjoint range split for ∃ | Theorem | (∀ x • R ∧ S ≡ false ) ⇒ ((∃ x ❙ R ∨ S • P ) ≡ (∃ x ❙ R • P ) ∨ (∃ x ❙ S • P )) | 2 |
| (8.16.1) | Alternative range split for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x ❙ R ∧ S • P ) ∧ (∀ x ❙ R ∧ ¬ S • P ) | 2 |
| (8.16.1) | Alternative range split for ∃ | Theorem | (∃ x ❙ R • P ) ≡ (∃ x ❙ R ∧ S • P ) ∨ (∃ x ❙ R ∧ ¬ S • P ) | 2 |
| (8.17) | General range split for ∀ | Axiom | (∀ x ❙ R ∨ S • P ) ∧ (∀ x ❙ R ∧ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P ) | 2 |
| (8.17) | General range split for ∃ | Axiom | (∃ x ❙ R ∨ S • P ) ∨ (∃ x ❙ R ∧ S • P ) ≡ (∃ x ❙ R • P ) ∨ (∃ x ❙ S • P ) | 2 |
| (8.18) | Range split for ∀ | Theorem | (∀ x ❙ R ∨ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P ) | 4 |
| (8.18) | Range split for ∀₂ | Theorem | (∀ x, y ❙ R ∨ S • P ) ≡ (∀ x, y ❙ R • P ) ∧ (∀ x, y ❙ S • P ) | 2 |
| (8.18) | Range split for ∃ | Theorem | (∃ x ❙ R ∨ S • P ) ≡ (∃ x ❙ R • P ) ∨ (∃ x ❙ S • P ) | 2 |
| (8.19) | Interchange of dummies for ∀ | Theorem | (∀ x ❙ R • (∀ y ❙ S • P ) ) ≡ (∀ y ❙ S • (∀ x ❙ R • P ) ) | 2 |
| (8.19) | Interchange of dummies for ∃ | Theorem | (∃ x ❙ R • (∃ y ❙ S • P ) ) ≡ (∃ y ❙ S • (∃ x ❙ R • P ) ) | 2 |
| (8.19.1) | Dummy list permutation for ∀ | Axiom | (∀ x, y ❙ R • P ) ≡ (∀ y, x ❙ R • P ) | 2 |
| (8.19.1) | Dummy list permutation for ∃ | Axiom | (∃ x, y ❙ R • P ) ≡ (∃ y, x ❙ R • P ) | 2 |
| (8.19.1) | Dummy list permutation₁+₂ for ∀ | Axiom | (∀ x, y, z ❙ R • P ) ≡ (∀ y, z, x ❙ R • P ) | 2 |
| (8.19.1) | Dummy list permutation₁+₂ for ∃ | Axiom | (∃ x, y, z ❙ R • P ) ≡ (∃ y, z, x ❙ R • P ) | 2 |
| (8.20) | Nesting for ∀ | Axiom | (∀ x, y ❙ R ∧ S • P ) ≡ (∀ x ❙ R • (∀ y ❙ S • P ) ) | 2 |
| (8.20) | Nesting for ∃ | Axiom | (∃ x, y ❙ R ∧ S • P ) ≡ (∃ x ❙ R • (∃ y ❙ S • P ) ) | 2 |
| (8.20) | Nesting₁+₂ for ∀ | Axiom | (∀ x, y, z ❙ R ∧ S • P ) ≡ (∀ x ❙ R • (∀ y, z ❙ S • P ) ) | 2 |
| (8.20) | Nesting₁+₂ for ∃ | Axiom | (∃ x, y, z ❙ R ∧ S • P ) ≡ (∃ x ❙ R • (∃ y, z ❙ S • P ) ) | 2 |
| (8.20) | Nesting₂+₁ for ∀ | Axiom | (∀ x, y, z ❙ R ∧ S • P ) ≡ (∀ x, y ❙ R • (∀ z ❙ S • P ) ) | 2 |
| (8.20) | Nesting₂+₁ for ∃ | Axiom | (∃ x, y, z ❙ R ∧ S • P ) ≡ (∃ x, y ❙ R • (∃ z ❙ S • P ) ) | 2 |
| (8.20.1) | Nesting for ∀ | Theorem | (∀ x, y ❙ S • P ) ≡ (∀ x • (∀ y ❙ S • P ) ) | 2 |
| (8.20.1) | Nesting for ∃ | Theorem | (∃ x, y ❙ S • P ) ≡ (∃ x • (∃ y ❙ S • P ) ) | 2 |
| (8.20.1) | Nesting₁+₂ for ∀ | Theorem | (∀ x, y, z ❙ S • P ) ≡ (∀ x • (∀ y, z ❙ S • P ) ) | 2 |
| (8.20.1) | Nesting₁+₂ for ∃ | Theorem | (∃ x, y, z ❙ S • P ) ≡ (∃ x • (∃ y, z ❙ S • P ) ) | 2 |
| (8.20.1) | Nesting₂+₁ for ∀ | Theorem | (∀ x, y, z ❙ S • P ) ≡ (∀ x, y • (∀ z ❙ S • P ) ) | 2 |
| (8.20.1) | Nesting₂+₁ for ∃ | Theorem | (∃ x, y, z ❙ S • P ) ≡ (∃ x, y • (∃ z ❙ S • P ) ) | 2 |
| (8.20.2) | Nesting for ∀ | Theorem | (∀ x, y ❙ R • P ) ≡ (∀ x ❙ R • (∀ y • P ) ) | 2 |
| (8.20.2) | Nesting for ∃ | Theorem | (∃ x, y ❙ R • P ) ≡ (∃ x ❙ R • (∃ y • P ) ) | 2 |
| (8.20.2) | Nesting₁+₂ for ∀ | Theorem | (∀ x, y, z ❙ R • P ) ≡ (∀ x ❙ R • (∀ y, z • P ) ) | 2 |
| (8.20.2) | Nesting₁+₂ for ∃ | Theorem | (∃ x, y, z ❙ R • P ) ≡ (∃ x ❙ R • (∃ y, z • P ) ) | 2 |
| (8.20.2) | Nesting₂+₁ for ∀ | Theorem | (∀ x, y, z ❙ R • P ) ≡ (∀ x, y ❙ R • (∀ z • P ) ) | 2 |
| (8.20.2) | Nesting₂+₁ for ∃ | Theorem | (∃ x, y, z ❙ R • P ) ≡ (∃ x, y ❙ R • (∃ z • P ) ) | 2 |
| (8.20.3) | Replacement in ∀ | Theorem | (∀ y ❙ R ∧ e = f • P[x ≔ e] ) ≡ (∀ y ❙ R ∧ e = f • P[x ≔ f] ) | 2 |
| (8.20.3) | Replacement in ∃ | Theorem | (∃ y ❙ R ∧ e = f • P[x ≔ e] ) ≡ (∃ y ❙ R ∧ e = f • P[x ≔ f] ) | 2 |
| (8.21) | Dummy renaming for ∀；别名：α-conversion | Theorem | (∀ x ❙ R • P ) ≡ (∀ y ❙ R[x ≔ y] • P[x ≔ y] ) | 2 |
| (8.21) | Dummy renaming for ∃；别名：α-conversion | Theorem | (∃ x ❙ R • P ) ≡ (∃ y ❙ R[x ≔ y] • P[x ≔ y] ) | 2 |
| (8.22) | Change of dummy in ∀ | Theorem | (∀ f • (∀ g • (∀ x • (∀ y • x = f y ≡ y = g x ) ) ⇒ ((∀ x ❙ R • P ) ≡ (∀ y ❙ R[x ≔ f y] • P[x ≔ f y] )) ) ) | 2 |
| (8.22) | Change of dummy in ∃ | Theorem | (∀ f • (∀ g • (∀ x • (∀ y • x = f y ≡ y = g x ) ) ⇒ ((∃ x ❙ R • P ) ≡ (∃ y ❙ R[x ≔ f y] • P[x ≔ f y] )) ) ) | 2 |
| (8.22.1) | Change of dummy in ∀ — variant | Theorem | (∀ x • (∀ y • x = f y ⇒ y = g x ) ) ⇒ ((∀ x ❙ R ∧ x = f (g x) • P ) ≡ (∀ y ❙ R[x ≔ f y] • P[x ≔ f y] )) | 2 |
| (8.22.1) | Change of dummy in ∃ — variant | Theorem | (∀ x • (∀ y • x = f y ⇒ y = g x ) ) ⇒ ((∃ x ❙ R ∧ x = f (g x) • P ) ≡ (∃ y ❙ R[x ≔ f y] • P[x ≔ f y] )) | 2 |
| (8.22.2) | Range replacement in nested ∀ | Lemma | (∀ x ❙ R • (∀ y • Q₁ ≡ Q₂ ) ) ⇒ ((∀ x ❙ R • (∀ y ❙ Q₁ • P ) ) ≡ (∀ x ❙ R • (∀ y ❙ Q₂ • P ) )) | 2 |
| (8.22.2) | Range replacement in nested ∃ | Lemma | (∀ x ❙ R • (∀ y • Q₁ ≡ Q₂ ) ) ⇒ ((∃ x ❙ R • (∃ y ❙ Q₁ • P ) ) ≡ (∃ x ❙ R • (∃ y ❙ Q₂ • P ) )) | 2 |
| (8.22.3) | Change of restricted dummy in ∀ | Theorem | (∀ f • (∀ g • (∀ x ❙ R • (∀ y • x = f y ≡ y = g x ) ) ⇒ ((∀ x ❙ R • P ) ≡ (∀ y ❙ R[x ≔ f y] • P[x ≔ f y] )) ) ) | 2 |
| (8.22.3) | Change of restricted dummy in ∃ | Theorem | (∀ f • (∀ g • (∀ x ❙ R • (∀ y • x = f y ≡ y = g x ) ) ⇒ ((∃ x ❙ R • P ) ≡ (∃ y ❙ R[x ≔ f y] • P[x ≔ f y] )) ) ) | 2 |
| (9.10) | Range weakening for ∀；别名：Range strengthening for ∀ | Theorem | (∀ x ❙ Q ∨ R • P ) ⇒ (∀ x ❙ Q • P ) | 2 |
| (9.11) | Body weakening for ∀；别名：Body strengthening for ∀ | Theorem | (∀ x ❙ R • P ∧ Q ) ⇒ (∀ x ❙ R • P ) | 2 |
| (9.12) | Monotonicity of ∀；别名：Body monotonicity of ∀ | Theorem | (∀ x ❙ R • Q ⇒ P ) ⇒ ((∀ x ❙ R • Q ) ⇒ (∀ x ❙ R • P )) | 2 |
| (9.12a) | Range antitonicity of ∀ | Theorem | (∀ x ❙ ¬ P • Q ⇒ R ) ⇒ ((∀ x ❙ R • P ) ⇒ (∀ x ❙ Q • P )) | 2 |
| (9.12a) | Range antitonicity of ∀ | Theorem | (∀ x • Q ⇒ R ) ⇒ ((∀ x ❙ R • P ) ⇒ (∀ x ❙ Q • P )) | 2 |
| (9.13) | Instantiation | Theorem | (∀ x • P ) ⇒ P[x ≔ E] | 2 |
| (9.13.1) | Instantiation | Theorem | (∀ x • P ) ⇒ P[x ≔ x] | 2 |
| (9.13.2) | Instantiation | Theorem | (∀ x ❙ R • P ) ⇒ (R ⇒ P)[x ≔ E] | 2 |
| (9.17) | Generalised De Morgan；别名：Definition of ∃ | Axiom | (∃ x ❙ R • P ) ≡ ¬ (∀ x ❙ R • ¬ P ) | 2 |
| (9.18a) | Generalised De Morgan | Theorem | ¬ (∃ x ❙ R • ¬ P ) ≡ (∀ x ❙ R • P ) | 2 |
| (9.18b) | Generalised De Morgan | Theorem | ¬ (∃ x ❙ R • P ) ≡ (∀ x ❙ R • ¬ P ) | 2 |
| (9.18c) | Generalised De Morgan | Theorem | (∃ x ❙ R • ¬ P ) ≡ ¬ (∀ x ❙ R • P ) | 2 |
| (9.19) | Trading for ∃ | Theorem | (∃ x ❙ R • P ) ≡ (∃ x • R ∧ P ) | 2 |
| (9.2) | Trading for ∀ | Axiom | (∀ x ❙ R • P ) ≡ (∀ x • R ⇒ P ) | 2 |
| (9.20) | Trading for ∃ | Theorem | (∃ x ❙ Q ∧ R • P ) ≡ (∃ x ❙ Q • R ∧ P ) | 2 |
| (9.21) | Distributivity of ∧ over ∃ | Theorem | P ∧ (∃ x ❙ R • Q ) ≡ (∃ x ❙ R • P ∧ Q ) | 2 |
| (9.22) | 原文未命名 | Theorem | P ∧ (∃ x • R ) ≡ (∃ x ❙ R • P ) | 2 |
| (9.22.1) | Distributivity of ∧ over ∀ | Theorem | (∃ x • R ) ⇒ (P ∧ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∧ Q )) | 2 |
| (9.23) | Distributivity of ∨ over ∃ | Theorem | (∃ x • R ) ⇒ (P ∨ (∃ x ❙ R • Q ) ≡ (∃ x ❙ R • P ∨ Q )) | 2 |
| (9.24) | False ∃ body | Theorem | (∃ x ❙ R • false ) ≡ false | 2 |
| (9.25) | Range weakening for ∃；别名：Range strengthening for ∃ | Theorem | (∃ x ❙ R • P ) ⇒ (∃ x ❙ Q ∨ R • P ) | 2 |
| (9.25.1) | Range weakening for ∃；别名：Range strengthening for ∃ | Theorem | (∃ x ❙ Q ∧ R • P ) ⇒ (∃ x ❙ R • P ) | 2 |
| (9.26) | Body weakening for ∃；别名：Body strengthening for ∃ | Theorem | (∃ x ❙ R • P ) ⇒ (∃ x ❙ R • P ∨ Q ) | 2 |
| (9.26.1) | Body weakening for ∃；别名：Body strengthening for ∃ | Theorem | (∃ x ❙ R • P ∧ Q ) ⇒ (∃ x ❙ R • P ) | 2 |
| (9.27) | Monotonicity of ∃；别名：Body monotonicity of ∃ | Theorem | (∀ x ❙ R • Q ⇒ P ) ⇒ ((∃ x ❙ R • Q ) ⇒ (∃ x ❙ R • P )) | 2 |
| (9.27.1) | Simple body-monotonicity of ∃ | Theorem | (∀ x • P ⇒ Q ) ⇒ ((∃ x ❙ R • P ) ⇒ (∃ x ❙ R • Q )) | 2 |
| (9.27.2) | Range monotonicity of ∃ | Theorem | (∀ x • Q ⇒ R ) ⇒ ((∃ x ❙ Q • P ) ⇒ (∃ x ❙ R • P )) | 2 |
| (9.27.3) | Range monotonicity of ∃ | Theorem | (∀ x ❙ P • Q ⇒ R ) ⇒ ((∃ x ❙ Q • P ) ⇒ (∃ x ❙ R • P )) | 2 |
| (9.28) | ∃-Introduction | Theorem | P[x ≔ E] ⇒ (∃ x • P ) | 2 |
| (9.28.1) | ∃-Introduction | Theorem | (R ∧ P)[x ≔ E] ⇒ (∃ x ❙ R • P ) | 2 |
| (9.29) | Interchange of quantifications | Theorem | (∃ x ❙ R • (∀ y ❙ Q • P ) ) ⇒ (∀ y ❙ Q • (∃ x ❙ R • P ) ) | 2 |
| (9.29.1) | Interchange of quantifications | Theorem | (∃ x • (∀ y • P ) ) ⇒ (∀ y • (∃ x • P ) ) | 2 |
| (9.30.1) | Witness | Theorem | (∃ x ❙ R • P ) ⇒ Q ≡ (∀ x • R ∧ P ⇒ Q ) | 2 |
| (9.30.2) | Witness | Theorem | (∃ x • P ) ⇒ Q ≡ (∀ x • P ⇒ Q ) | 2 |
| (9.3a) | Trading for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x • ¬ R ∨ P ) | 2 |
| (9.3b) | Trading for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x • R ∧ P ≡ R ) | 2 |
| (9.3c) | Trading for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x • R ∨ P ≡ P ) | 2 |
| (9.4a) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • R ⇒ P ) | 2 |
| (9.4b) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • ¬ R ∨ P ) | 2 |
| (9.4c) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • R ∧ P ≡ R ) | 2 |
| (9.4d) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • R ∨ P ≡ P ) | 2 |
| (9.5) | Distributivity of ∨ over ∀ | Axiom | P ∨ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∨ Q ) | 2 |
| (9.6) | 原文未命名 | Theorem | P ∨ (∀ x • ¬ R ) ≡ (∀ x ❙ R • P ) | 2 |
| (9.7) | Distributivity of ∧ over ∀ | Theorem | ¬ (∀ x • ¬ R ) ⇒ (P ∧ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∧ Q )) | 2 |
| (9.8) | True ∀ body | Theorem | (∀ x ❙ R • true ) | 2 |
| (9.9) | Sub-distributivity of ∀ over ≡ | Theorem | (∀ x ❙ R • P ≡ Q ) ⇒ ((∀ x ❙ R • P ) ≡ (∀ x ❙ R • Q )) | 2 |
| 未编号 · 00099d | ∧₆-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ (u ⇒ p ∧ (q ∧ (r ∧ (s ∧ (t ∧ u))))))))) | 2 |
| 未编号 · 0102c0 | Identity of ≢ | Theorem | (p ≢ false) ≡ p | 2 |
| 未编号 · 021cd3 | snd after swap-× | Theorem | snd (swap-× p) = fst p | 2 |
| 未编号 · 035aaa | Pair equality | Axiom | p = q ≡ fst p = fst q ∧ snd p = snd q | 2 |
| 未编号 · 0440d9 | Equivalence enrichment | Theorem | (p ≡ q) ⇒ ((p ⇒ r) ⇒ (p ⇒ q ∧ r)) | 2 |
| 未编号 · 08e6b7 | Monotonicity of ∧ | Theorem | (p ⇒ p') ⇒ ((q ⇒ q') ⇒ (p ∧ q ⇒ p' ∧ q')) | 2 |
| 未编号 · 0a2238 | Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ (p ∨ r ⇒ q ∨ r) | 2 |
| 未编号 · 0eea75 | Zero of ⨾ | Theorem | {} ⨾ R = {} | 2 |
| 未编号 · 0f2ed1 | Contributing conjunct to ≡ | Theorem | (p ∧ q ≡ r) ∧ p ⇒ (q ≡ r) | 2 |
| 未编号 · 11c8af | Relation union | Theorem | a ⦗ R ∪ S ⦘ b ≡ a ⦗ R ⦘ b ∨ a ⦗ S ⦘ b | 2 |
| 未编号 · 15c06f | Transitivity of = | Theorem | e = f ∧ f = g ⇒ e = g | 2 |
| 未编号 · 1c60bd | Monotonicity of × | Theorem | A ⊆ B ∧ C ⊆ D ⇒ A × C ⊆ B × D | 2 |
| 未编号 · 1da292 | Membership in two-element set enumeration | Lemma | x ∈ { x, y } | 2 |
| 未编号 · 1e7608 | Inclusion in {} | Theorem | S ⊆ {} ≡ S = {} | 2 |
| 未编号 · 23785d | Adding consequent to ∧ | Theorem | (p ⇒ q) ⇒ (p ∧ r ⇒ p ∧ (q ∧ r)) | 2 |
| 未编号 · 24a375 | Definition of ≡ | Axiom | (p ≡ q) = (p = q) | 2 |
| 未编号 · 25737b | Co-residual of ∨ | Theorem | q ⇒ x ∨ p ≡ ¬ p ∧ q ⇒ x | 2 |
| 未编号 · 258db7 | Relation inclusion | Corollary | R ⊆ S ≡ (∀ x, y ❙ x ⦗ R ⦘ y • x ⦗ S ⦘ y ) | 2 |
| 未编号 · 266568 | Generalised one-point rule for ∀ | Theorem | R[x ≔ e] ⇒ (∀ x ❙ R ∧ x = e • E ) = E[x ≔ e] | 2 |
| 未编号 · 267c2e | Pair dummy joining for ∀ | Theorem | (∀ x : t₁; y : t₂ ❙ R • E ) = (∀ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 2 |
| 未编号 · 2977f6 | Proof by contradiction | Theorem | ¬ p ⇒ false ≡ p | 2 |
| 未编号 · 29a570 | ∧₅-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ p ∧ (q ∧ (r ∧ (s ∧ t))))))) | 4 |
| 未编号 · 2b72bc | Definition of ∧ | Lemma | (p ∧ q) = (p ≡ (q ≡ p ∨ q)) | 2 |
| 未编号 · 2bba4a | Modal rule | Theorem | Q ⨾ R ∩ S ⊆ (Q ∩ S ⨾ R ˘) ⨾ R | 2 |
| 未编号 · 2ee652 | Associativity of ⨾ | Theorem | (Q ⨾ R) ⨾ S = Q ⨾ (R ⨾ S) | 2 |
| 未编号 · 3017b9 | Relationship via ＼；别名：Relationship via right residual | Theorem | b ⦗ R ＼ S ⦘ c ≡ (∀ a • a ⦗ R ⦘ b ⇒ a ⦗ S ⦘ c ) | 2 |
| 未编号 · 302939 | Relation inclusion | Corollary | R ⊆ S ≡ (∀ x • (∀ y ❙ x ⦗ R ⦘ y • x ⦗ S ⦘ y ) ) | 2 |
| 未编号 · 309d0d | One-point rule for ∀₂；别名：Two-point rule for ∀ | Theorem | (∀ x, y ❙ x = A ∧ y = B • P ) ≡ P[x, y ≔ A, B] | 2 |
| 未编号 · 31d3fa | Preserving conjunct after ⇒ | Theorem | p ∧ q ⇒ r ≡ p ∧ q ⇒ p ∧ r | 2 |
| 未编号 · 3656ea | Membership in ⌞_⌟ | Theorem | (∀ x : t • x ∈ ⌞ t ⌟ ) | 2 |
| 未编号 · 3659af | Converse of ∪ | Theorem | (R ∪ S) ˘ = R ˘ ∪ S ˘ | 2 |
| 未编号 · 3742d7 | Converse of {} | Theorem | {} ˘ = {} | 2 |
| 未编号 · 38133d | Body weakening for ∀；别名：Body strengthening for ∀ | Theorem | (∀ x ❙ R • P ) ⇒ (∀ x ❙ R • Q ⇒ P ) | 2 |
| 未编号 · 38c228 | Empty relation | Theorem | a ⦗ {} ⦘ b ≡ false | 2 |
| 未编号 · 3a29bc | Set abbreviation | Theorem | { x ❙ P } = { x ❙ P • x } | 2 |
| 未编号 · 3aa5d0 | Monotonicity of ⇒；别名：Right-monotonicity of ⇒ | Theorem | (p ⇒ q) ⇒ ((r ⇒ p) ⇒ (r ⇒ q)) | 2 |
| 未编号 · 3c3941 | Introducing fresh ∀ | Theorem | P ⇒ (∀ x ❙ R • P ) | 2 |
| 未编号 · 3cdb84 | Pair dummy splitting for ∃ | Theorem | (∃ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∃ x : t₁; y : t₂ ❙ R[p ≔ ⟨x, y⟩] • E[p ≔ ⟨x, y⟩] ) | 2 |
| 未编号 · 3e0f4b | Cartesian product of universal sets | Theorem | 𝐔 × 𝐔 = 𝐔 | 2 |
| 未编号 · 400475 | Monotonicity of × | Theorem | A ⊆ B ⇒ A × C ⊆ B × C | 2 |
| 未编号 · 430a99 | Relation extensionality | Corollary | R = S ≡ (∀ x, y • x ⦗ R ⦘ y ≡ x ⦗ S ⦘ y ) | 2 |
| 未编号 · 434d76 | Self-inverse of ˘ | Theorem | (R ˘) ˘ = R | 2 |
| 未编号 · 44bb82 | Boring disjoint range split for ∀ | Theorem | (R ∧ S ≡ false) ⇒ ((∀ x ❙ R ∨ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P )) | 2 |
| 未编号 · 47412a | Isotonicity of ˘ | Theorem | R ⊆ S ≡ R ˘ ⊆ S ˘ | 2 |
| 未编号 · 478166 | Right-distributivity of ⇒ over ∧₃ | Theorem | p ⇒ q ∧ (r ∧ s) ≡ (p ⇒ q) ∧ ((p ⇒ r) ∧ (p ⇒ s)) | 2 |
| 未编号 · 4a98c7 | Pair extensionality | Theorem | p = ⟨fst p, snd p⟩ | 2 |
| 未编号 · 4f50fa | Empty set | Theorem | {} = { x ❙ false } | 2 |
| 未编号 · 512e5b | Definition of `snd` | Axiom | snd ⟨x, y⟩ = y | 2 |
| 未编号 · 538ae9 | Definition of 𝕀 via `id` | Axiom | 𝕀 = id 𝐔 | 2 |
| 未编号 · 54dc6e | Relation complement | Theorem | a ⦗ ~ R ⦘ b ≡ ¬ (a ⦗ R ⦘ b) | 2 |
| 未编号 · 577081 | Pair dummy joining for ∃ | Theorem | (∃ x : t₁; y : t₂ ❙ R • E ) = (∃ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 2 |
| 未编号 · 57c1d9 | Membership in set enumeration | Lemma | x ∈ { u ❙ u = x ∨ R } | 2 |
| 未编号 · 59ca14 | Subset of ⌞_⌟ | Theorem | (∀ S : set t • S ⊆ ⌞ t ⌟ ) | 2 |
| 未编号 · 5aae8c | Definition of ≠ | Theorem | x ≠ y ≡ (x = y ≡ false) | 2 |
| 未编号 · 5cb6cb | Pair dummy joining for ∃ | Theorem | (∃ x : t₁ • (∃ y : t₂ ❙ R • E ) ) = (∃ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 2 |
| 未编号 · 5f6c2d | Symmetry of ≠ | Theorem | x ≠ y ≡ y ≠ x | 2 |
| 未编号 · 62eea8 | Sub-distributivity of ⨾ over ∩ | Theorem | Q ⨾ (R ∩ S) ⊆ Q ⨾ R ∩ Q ⨾ S | 2 |
| 未编号 · 68f09d | Characterisation of right residual；别名：Characterisation of ＼ | Axiom | X ⊆ R ＼ S ≡ R ⨾ X ⊆ S | 2 |
| 未编号 · 697e4a | Singleton relation inclusion | Lemma | { ⟨a, b⟩ } ⊆ R ≡ a ⦗ R ⦘ b | 2 |
| 未编号 · 6ab39c | Universal set | Theorem | x ∈ 𝐔 | 2 |
| 未编号 · 6d3941 | ／ 𝕀 | Theorem | R ／ 𝕀 = R | 2 |
| 未编号 · 70f478 | ∧-Introduction | Theorem | p ⇒ (q ⇒ p ∧ q) | 2 |
| 未编号 · 741e9f | Membership in `Ran` | Axiom | y ∈ Ran R ≡ (∃ x • x ⦗ R ⦘ y ) | 2 |
| 未编号 · 758033 | Monotonicity of ⨾ | Theorem | P ⊆ Q ⇒ (R ⊆ S ⇒ P ⨾ R ⊆ Q ⨾ S) | 2 |
| 未编号 · 771122 | ∧₄-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ p ∧ (q ∧ (r ∧ s))))) | 2 |
| 未编号 · 788acc | Relationship via 𝕀；别名：Identity relation | Theorem | x ⦗ 𝕀 ⦘ y ≡ x = y | 2 |
| 未编号 · 79d90c | Left-monotonicity of ∨；别名：Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ (p ∨ r ⇒ q ∨ r) | 2 |
| 未编号 · 7cec6b | Definition of `fst` | Axiom | fst ⟨x, y⟩ = x | 2 |
| 未编号 · 81eeed | Zero of ⨾ | Theorem | R ⨾ {} = {} | 2 |
| 未编号 · 81fb75 | Relation inclusion | Corollary | R ⊆ S ≡ (∀ x, y • x ⦗ R ⦘ y ⇒ x ⦗ S ⦘ y ) | 2 |
| 未编号 · 82a874 | Monotonicity of ˘ | Theorem | R ⊆ S ⇒ R ˘ ⊆ S ˘ | 2 |
| 未编号 · 82ba90 | Cancellation of ＼ | Theorem | R ⨾ (R ＼ S) ⊆ S | 2 |
| 未编号 · 82bbcb | Identity of ⨾ | Theorem | R ⨾ 𝕀 = R | 2 |
| 未编号 · 854589 | Converse of ⨾ | Theorem | (R ⨾ S) ˘ = S ˘ ⨾ R ˘ | 2 |
| 未编号 · 858f00 | fst after swap-× | Theorem | fst (swap-× p) = snd p | 2 |
| 未编号 · 864884 | Monotonicity of × | Theorem | B ⊆ C ⇒ A × B ⊆ A × C | 2 |
| 未编号 · 8665d0 | Definition of `swap-×` | Axiom | swap-× ⟨x, y⟩ = ⟨y, x⟩ | 2 |
| 未编号 · 86a35c | Abbreviated replacement in ∧；别名：Abbreviated replacement | Theorem | P ∧ x = E ≡ P[x ≔ E] ∧ x = E | 2 |
| 未编号 · 87032e | Schröder | Theorem | Q ⨾ R ⊆ S ≡ ~ S ⨾ R ˘ ⊆ ~ Q | 2 |
| 未编号 · 870e03 | Membership in `Dom` | Axiom | x ∈ Dom R ≡ (∃ y • x ⦗ R ⦘ y ) | 2 |
| 未编号 · 87d2bd | Converse of ~；别名：Complement of ˘ | Theorem | (~ R) ˘ = ~ R ˘ | 2 |
| 未编号 · 8876d6 | Case shuffling | Theorem | (p ∨ q) ∧ (¬ p ∨ r) ≡ (p ∧ r) ∨ (¬ p ∧ q) | 2 |
| 未编号 · 8b8c1e | Singleton relation | Lemma | a₁ ⦗ { ⟨a₂, b₂⟩ } ⦘ b₁ ≡ a₁ = a₂ ∧ b₁ = b₂ | 2 |
| 未编号 · 8bea72 | Universal relation；别名：Relationship via `𝐔` | Theorem | a ⦗ 𝐔 ⦘ b | 2 |
| 未编号 · 8c3c6e | Dedekind rule | Theorem | Q ⨾ R ∩ S ⊆ (Q ∩ S ⨾ R ˘) ⨾ (R ∩ Q ˘ ⨾ S) | 2 |
| 未编号 · 8cc226 | Relationship via ／；别名：Relationship via left residual | Theorem | a ⦗ S ／ R ⦘ b ≡ (∀ c • b ⦗ R ⦘ c ⇒ a ⦗ S ⦘ c ) | 2 |
| 未编号 · 8d781b | Universal set is greatest；别名：Top set | Theorem | X ⊆ 𝐔 | 2 |
| 未编号 · 8f73d4 | Co-difunctionality；别名：Hesitation | Theorem | R ⊆ R ⨾ (R ˘ ⨾ R) | 2 |
| 未编号 · 90956c | ⇒-Introduction | Primitive inference rule | ( p ⊦ q ) ⊦ p ⇒ q | 2 |
| 未编号 · 90ec10 | Identity of ⨾ | Theorem | 𝕀 ⨾ R = R | 2 |
| 未编号 · 930ae9 | Universal set | Axiom | 𝐔 = { x ❙ true } | 2 |
| 未编号 · 94d527 | Weakening；别名：Strengthening | Theorem | (p ∨ q) ∧ r ⇒ p ∨ (q ∧ r) | 2 |
| 未编号 · 94e8f6 | Definition of ↔ | Axiom | t₁ ↔ t₂ = set ❰ t₁, t₂ ❱ | 2 |
| 未编号 · 94f30a | ∧₇-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ (u ⇒ (v ⇒ p ∧ (q ∧ (r ∧ (s ∧ (t ∧ (u ∧ v))))))))))) | 2 |
| 未编号 · 953f24 | Relationship chaining | Theorem | a ⦗ R ⦘ b ⦗ S ⦘ c ⇒ a ⦗ R ⨾ S ⦘ c | 2 |
| 未编号 · 9941d0 | ∧₃-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ p ∧ (q ∧ r))) | 2 |
| 未编号 · 9b02ef | Relationship via × | Theorem | a ⦗ Y × Z ⦘ b ≡ a ∈ Y ∧ b ∈ Z | 2 |
| 未编号 · 9cb45b | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 2 |
| 未编号 · 9cd73a | Definition of ≠ | Axiom | x ≠ y ≡ ¬ (x = y) | 2 |
| 未编号 · 9ceb89 | Cancellation of ／ | Theorem | (S ／ R) ⨾ R ⊆ S | 2 |
| 未编号 · 9cfabc | Distributivity of ⨾ over ∪ | Theorem | (Q ∪ R) ⨾ S = Q ⨾ S ∪ R ⨾ S | 2 |
| 未编号 · 9eb4a8 | Body weakening for ∀；别名：Body strengthening for ∀ | Theorem | (∀ x ❙ R • P ) ⇒ (∀ x ❙ R • P ∨ Q ) | 2 |
| 未编号 · a001f2 | Relation intersection | Theorem | a ⦗ R ∩ S ⦘ b ≡ a ⦗ R ⦘ b ∧ a ⦗ S ⦘ b | 2 |
| 未编号 · a1d54b | Definition of ⌞_⌟ | Axiom | ⌞ t ⌟ = { x : t • x } | 2 |
| 未编号 · a2a32a | Disjunction as implication | Lemma | p ∨ q ≡ ¬ p ⇒ q | 2 |
| 未编号 · a31008 | Pair dummy splitting for ∀ | Theorem | (∀ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∀ x : t₁; y : t₂ ❙ R[p ≔ ⟨x, y⟩] • E[p ≔ ⟨x, y⟩] ) | 2 |
| 未编号 · a3194e | Empty set | Theorem | x ∈ {} ≡ false | 2 |
| 未编号 · a56b54 | Fresh ∀ | Theorem | P ≡ (∀ x • P ) | 2 |
| 未编号 · a73795 | Relation converse；别名：Relationship via ˘ | Axiom | y ⦗ R ˘ ⦘ x ≡ x ⦗ R ⦘ y | 2 |
| 未编号 · a8733b | Pair dummy joining for ∀ | Theorem | (∀ x : t₁ • (∀ y : t₂ ❙ R • E ) ) = (∀ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 2 |
| 未编号 · ad7fe9 | Generalised one-point rule for ∃ | Theorem | R[x ≔ e] ⇒ (∃ x ❙ R ∧ x = e • E ) = E[x ≔ e] | 2 |
| 未编号 · affdb1 | Membership in × | Axiom | p ∈ S × T ≡ fst p ∈ S ∧ snd p ∈ T | 2 |
| 未编号 · b08a0f | Converse of 𝕀 | Theorem | 𝕀 ˘ = 𝕀 | 2 |
| 未编号 · b103d7 | Right-distributivity of ⇒ over ∧₄ | Theorem | p ⇒ q ∧ (r ∧ (s ∧ t)) ≡ (p ⇒ q) ∧ ((p ⇒ r) ∧ ((p ⇒ s) ∧ (p ⇒ t))) | 2 |
| 未编号 · b322bf | Relationship via ⌜_⌝ | Axiom | a ⦗ ⌜ f ⌝ ⦘ b ≡ (f a) b | 2 |
| 未编号 · b77dec | Abbreviated replacement in ⇒；别名：Abbreviated replacement | Theorem | x = E ⇒ P ≡ x = E ⇒ P[x ≔ E] | 2 |
| 未编号 · b8a06d | Exclusive or implies inclusive | Theorem | (p ≢ q) ⇒ p ∨ q | 2 |
| 未编号 · bb97a0 | Negation of ≠ | Theorem | ¬ (x ≠ y) ≡ x = y | 2 |
| 未编号 · bdf087 | Antitonicity of ¬ | Theorem | (p ⇒ q) ⇒ (¬ q ⇒ ¬ p) | 2 |
| 未编号 · be1be4 | Pair dummy splitting for ∃ | Theorem | (∃ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∃ a : t₁ • (∃ b : t₂ ❙ R[p ≔ ⟨a, b⟩] • E[p ≔ ⟨a, b⟩] ) ) | 2 |
| 未编号 · c0390b | Distributivity of ⇒ over ∀ | Theorem | P ⇒ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ⇒ Q ) | 2 |
| 未编号 · c0e057 | Leibniz for ∀ body | Theorem | (∀ x • P₁ ≡ P₂ ) ⇒ ((∀ x ❙ R • P₁ ) ≡ (∀ x ❙ R • P₂ )) | 2 |
| 未编号 · c189b4 | Distributivity of ⨾ over ∪ | Theorem | Q ⨾ (R ∪ S) = Q ⨾ R ∪ Q ⨾ S | 2 |
| 未编号 · c1b248 | Relationship via `id` | Corollary | x ⦗ id S ⦘ y ≡ y = x ∈ S | 2 |
| 未编号 · c486b0 | Relationship via `id` | Axiom | x ⦗ id S ⦘ y ≡ x = y ∈ S | 2 |
| 未编号 · c4eac8 | Range weakening for ∀；别名：Range strengthening for ∀ | Theorem | (∀ x ❙ Q • P ) ⇒ (∀ x ❙ Q ∧ R • P ) | 2 |
| 未编号 · c506fd | Leibniz for ∀ body | Theorem | (∀ x ❙ R • P₁ ≡ P₂ ) ⇒ ((∀ x ❙ R • P₁ ) ≡ (∀ x ❙ R • P₂ )) | 2 |
| 未编号 · c8301e | Simple body-monotonicity of ∀ | Theorem | (∀ x • P ⇒ Q ) ⇒ ((∀ x ❙ R • P ) ⇒ (∀ x ❙ R • Q )) | 2 |
| 未编号 · c97154 | Modal rule | Theorem | Q ⨾ R ∩ S ⊆ Q ⨾ (R ∩ Q ˘ ⨾ S) | 2 |
| 未编号 · cb3ad2 | Relation pseudocomplement | Theorem | a ⦗ R ➩ S ⦘ b ≡ a ⦗ R ⦘ b ⇒ a ⦗ S ⦘ b | 2 |
| 未编号 · ce5ae3 | Residual of ∧ | Theorem | x ∧ p ⇒ q ≡ x ⇒ (p ⇒ q) | 2 |
| 未编号 · ce764c | Characterisation of left residual；别名：Characterisation of ／ | Axiom | X ⊆ S ／ R ≡ X ⨾ R ⊆ S | 2 |
| 未编号 · d064f0 | Monotonicity of relationship | Lemma | R ⊆ S ⇒ (x ⦗ R ⦘ y ⇒ x ⦗ S ⦘ y) | 2 |
| 未编号 · d13235 | Relation composition | Axiom | a ⦗ R ⨾ S ⦘ c ≡ (∃ b • a ⦗ R ⦘ b ∧ b ⦗ S ⦘ c ) | 2 |
| 未编号 · d145de | Monotonicity of ⨾ | Theorem | Q ⊆ R ⇒ Q ⨾ S ⊆ R ⨾ S | 2 |
| 未编号 · d44cb7 | Monotonicity of ⨾ | Theorem | R ⊆ S ⇒ Q ⨾ R ⊆ Q ⨾ S | 2 |
| 未编号 · d51182 | Converse of × | Theorem | (A × B) ˘ = B × A | 2 |
| 未编号 · d79ed2 | Relation difference | Theorem | a ⦗ R - S ⦘ b ≡ a ⦗ R ⦘ b ∧ ¬ (a ⦗ S ⦘ b) | 2 |
| 未编号 · d93d5e | Converse of ∩ | Theorem | (R ∩ S) ˘ = R ˘ ∩ S ˘ | 2 |
| 未编号 · e13186 | Infix relationship；别名：Definition of `_⦗_⦘_` | Axiom | a ⦗ R ⦘ b ≡ ⟨a, b⟩ ∈ R | 2 |
| 未编号 · e18e5f | Irreflexivity of ≠ | Theorem | x ≠ x ≡ false | 2 |
| 未编号 · e2dbad | One-point rule for ∀₂² | Theorem | (∀ x, y ❙ y = B ∧ R • P ) ≡ (∀ x ❙ R[y ≔ B] • P[y ≔ B] ) | 2 |
| 未编号 · e364a1 | Antitonicity of ⇒；别名：Left-antitonicity of ⇒ | Theorem | (p ⇒ q) ⇒ ((q ⇒ r) ⇒ (p ⇒ r)) | 2 |
| 未编号 · e90a50 | 𝕀 ＼ | Theorem | 𝕀 ＼ R = R | 2 |
| 未编号 · eb923d | Boring disjoint range split for ∃ | Theorem | (R ∧ S ≡ false) ⇒ ((∃ x ❙ R ∨ S • P ) ≡ (∃ x ❙ R • P ) ∨ (∃ x ❙ S • P )) | 2 |
| 未编号 · f0fb23 | Relation inclusion | Theorem | R ⊆ S ≡ (∀ x • (∀ y • x ⦗ R ⦘ y ⇒ x ⦗ S ⦘ y ) ) | 2 |
| 未编号 · f1d779 | Cancellation of ¬ | Theorem | (¬ p ≡ ¬ q) = (p ≡ q) | 2 |
| 未编号 · f245f4 | One-point rule for ∀₂¹ | Theorem | (∀ x, y ❙ x = A ∧ R • P ) ≡ (∀ y ❙ R • P )[x ≔ A] | 2 |
| 未编号 · f2f787 | Sub-distributivity of ⨾ over ∩ | Theorem | (Q ∩ R) ⨾ S ⊆ Q ⨾ S ∩ R ⨾ S | 2 |
| 未编号 · f32877 | Relation extensionality | Theorem | R = S ≡ (∀ x • (∀ y • x ⦗ R ⦘ y ≡ x ⦗ S ⦘ y ) ) | 2 |
| 未编号 · f4948f | Case shuffling | Theorem | (p ⇒ q) ∧ (¬ p ⇒ r) ≡ (p ∧ q) ∨ (¬ p ∧ r) | 2 |
| 未编号 · f8a195 | Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ ((r ⇒ s) ⇒ (p ∨ r ⇒ q ∨ s)) | 4 |
| 未编号 · f93139 | Irreflexivity of ≠ | Theorem | ¬ (x ≠ x) | 2 |
| 未编号 · fbab53 | Schröder | Theorem | Q ⨾ R ⊆ S ≡ Q ˘ ⨾ ~ S ⊆ ~ R | 2 |
| 未编号 · fc3ef2 | Relationship via `𝐔 × 𝐔` | Theorem | a ⦗ 𝐔 × 𝐔 ⦘ b | 2 |
| 未编号 · fdb8c0 | Pair dummy splitting for ∀ | Theorem | (∀ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∀ a : t₁ • (∀ b : t₂ ❙ R[p ≔ ⟨a, b⟩] • E[p ≔ ⟨a, b⟩] ) ) | 2 |

## 2025 · Week 9

对应 notebook：[2025i Exercise 9.1: Multiplication on ℕ Using Explicit Induction Principle · 预载列表](http://130.113.68.214:15075/), [2025i Exercise 9.2: Binary Trees · 预载列表](http://130.113.68.214:15076/), [2025i Exercise 9.2 (variant): Binary Trees · 预载列表](http://130.113.68.214:15077/), [2025i Exercise 9.3: Sequences Misc. · 预载列表](http://130.113.68.214:15085/), [2025i Exercise 9.4: Sum Quantification Misc. · 预载列表](http://130.113.68.214:15086/), [HW18 · CalcCheck preloaded theorem list](http://130.113.68.214:15072/), [HW19 · CalcCheck preloaded theorem list](http://130.113.68.214:15073/), [HW19-2 · CalcCheck preloaded theorem list](http://130.113.68.214:15074/)

| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |
|---|---|---|---|---:|
| (1.2) | Reflexivity of = | Axiom | x = x | 8 |
| (1.3) | Symmetry of = | Axiom | (x = y) = (y = x) | 8 |
| (1.4) | Transitivity of = | Derived inference rule | X = Y , Y = Z ⊦ X = Z | 8 |
| (1.5) | Leibniz | Derived inference rule | X = Y ⊦ E[z ≔ X] = E[z ≔ Y] | 8 |
| (13.10) | Membership in 𝜖 | Axiom | x ∈ 𝜖 ≡ false | 5 |
| (13.11) | Membership in ◃ | Axiom | x ∈ y ◃ ys ≡ x = y ∨ x ∈ ys | 5 |
| (13.12) | Definition of ▹ for 𝜖 | Axiom | 𝜖 ▹ a = a ◃ 𝜖 | 5 |
| (13.13) | Definition of ▹ for ◃ | Axiom | (a ◃ s) ▹ b = a ◃ (s ▹ b) | 5 |
| (13.14) | Snoc is not empty | Theorem | xs ▹ x ≠ 𝜖 | 5 |
| (13.16) | Membership in ▹ | Theorem | x ∈ ys ▹ z ≡ x ∈ ys ∨ x = z | 5 |
| (13.17) | Left-identity of ⌢；别名：Definition of ⌢ for 𝜖 | Axiom | 𝜖 ⌢ ys = ys | 5 |
| (13.18) | Mutual associativity of ◃ with ⌢；别名：Definition of ⌢ for ◃ | Axiom | (x ◃ xs) ⌢ ys = x ◃ (xs ⌢ ys) | 5 |
| (13.19) | Right-identity of ⌢ | Theorem | xs ⌢ 𝜖 = xs | 5 |
| (13.20) | Associativity of ⌢ | Theorem | (xs ⌢ ys) ⌢ zs = xs ⌢ (ys ⌢ zs) | 5 |
| (13.21) | Membership in ⌢ | Theorem | x ∈ ys ⌢ zs ≡ x ∈ ys ∨ x ∈ zs | 5 |
| (13.23) | Empty concatenation | Theorem | xs ⌢ ys = 𝜖 ≡ xs = 𝜖 ∧ ys = 𝜖 | 5 |
| (13.3) | Cons is not empty | Axiom | x ◃ xs ≠ 𝜖 | 5 |
| (13.4) | Cancellation of ◃ | Axiom | x ◃ xs = y ◃ ys ≡ x = y ∧ xs = ys | 5 |
| (13.6) | Cons decomposition | Theorem | xs = 𝜖 ∨ (∃ y • (∃ ys • xs = y ◃ ys ) ) | 5 |
| (13.7) | Tail is different | Theorem | (∀ xs : Seq  A • (∀ x : A • x ◃ xs = xs ≡ false ) ) | 1 |
| (13.7) | Tail is different | Theorem | (∀ xs : Seq A • (∀ x : A • x ◃ xs ≠ xs ) ) | 5 |
| (13.7.1) | Tail is different | Theorem | x ◃ xs ≠ xs | 5 |
| (15.13) | Unary minus | Axiom | a + - a = 0 | 2 |
| (15.14) | Subtraction | Axiom | a - b = a + - b | 2 |
| (15.17) | Self-inverse of unary minus | Theorem | - (- a) = a | 2 |
| (15.18) | Fixpoint of unary minus | Theorem | - 0 = 0 | 2 |
| (15.19) | Distributivity of unary minus over + | Theorem | - (a + b) = - a + - b | 2 |
| (15.1a) | Associativity of + | Axiom | (a + b) + c = a + (b + c) | 2 |
| (15.1b) | Associativity of · | Axiom | (a · b) · c = a · (b · c) | 2 |
| (15.20) | Negation as multiplication | Theorem | - a = - 1 · a | 2 |
| (15.21) | 原文未命名 | Theorem | - a · b = a · - b | 2 |
| (15.22) | Commutativity of unary minus with · | Theorem | a · - b = - (a · b) | 2 |
| (15.23) | 原文未命名 | Theorem | - a · - b = a · b | 2 |
| (15.24) | Right-identity of - | Theorem | a - 0 = a | 2 |
| (15.24a) | Subtraction of subtraction | Theorem | a - (b - c) = (a - b) + c | 2 |
| (15.25) | 原文未命名 | Theorem | (a - b) + (c - d) = (a + c) - (b + d) | 2 |
| (15.25a) | Mutual associativity of + and - | Theorem | a + (b - c) = (a + b) - c | 2 |
| (15.25b) | Subtraction of addition | Theorem | a - (b + c) = (a - b) - c | 2 |
| (15.25c) | Cancellation across added subtractions | Theorem | (a - b) + (b - c) = a - c | 2 |
| (15.26) | 原文未命名 | Theorem | (a - b) - (c - d) = (a + d) - (b + c) | 2 |
| (15.27) | 原文未命名 | Theorem | (a - b) · (c - d) = (a · c + b · d) - (a · d + b · c) | 2 |
| (15.29) | Distributivity of · over - | Theorem | (a - b) · c = a · c - b · c | 2 |
| (15.2a) | Symmetry of + | Axiom | a + b = b + a | 2 |
| (15.2b) | Symmetry of · | Axiom | a · b = b · a | 2 |
| (15.3) | Additive identity；别名：Identity of + | Axiom | 0 + a = a | 2 |
| (15.30) | Positivity under + | Axiom | pos a ∧ pos b ⇒ pos (a + b) | 2 |
| (15.30a) | Positivity under + | Theorem | pos a ⇒ (pos b ⇒ pos (a + b)) | 2 |
| (15.31) | Positivity under · | Axiom | pos a ∧ pos b ⇒ pos (a · b) | 2 |
| (15.31a) | Positivity under · | Theorem | pos a ⇒ (pos b ⇒ pos (a · b)) | 2 |
| (15.32) | Non-positivity of 0 | Axiom | ¬ pos 0 | 2 |
| (15.33) | Positivity under unary minus | Axiom | b ≠ 0 ⇒ (pos b ≡ ¬ pos (- b)) | 2 |
| (15.33a) | Positivity under unary minus | Theorem | b ≠ 0 ⇒ (pos b ≢ pos (- b)) | 2 |
| (15.33b) | Positivity under unary minus | Theorem | b ≠ 0 ⇒ (pos (- b) ≡ ¬ pos b) | 2 |
| (15.33c) | Positivity under unary minus | Theorem | (pos (- b) ≡ pos b) ⇒ b = 0 | 2 |
| (15.34) | Positivity of squares | Theorem | b ≠ 0 ⇒ pos (b · b) | 2 |
| (15.35) | Positivity under positive · | Theorem | pos a ⇒ (pos b ≡ pos (a · b)) | 2 |
| (15.36) | Less；别名：Definition of < | Axiom | a < b ≡ pos (b - a) | 2 |
| (15.37) | Greater；别名：Definition of > | Axiom | a > b ≡ pos (a - b) | 2 |
| (15.38) | At most；别名：Definition of ≤ | Axiom | a ≤ b ≡ a < b ∨ a = b | 2 |
| (15.39) | At least；别名：Definition of ≥ | Axiom | a ≥ b ≡ a > b ∨ a = b | 2 |
| (15.4) | Multiplicative identity；别名：Identity of · | Axiom | 1 · a = a | 2 |
| (15.40) | Positive elements | Theorem | pos b ≡ 0 < b | 2 |
| (15.41a) | Transitivity；别名：Transitivity of < | Theorem | a < b ∧ b < c ⇒ a < c | 2 |
| (15.41b) | Transitivity；别名：Transitivity of ≤ with < | Theorem | a ≤ b ∧ b < c ⇒ a < c | 2 |
| (15.41c) | Transitivity；别名：Transitivity of < with ≤ | Theorem | a < b ∧ b ≤ c ⇒ a < c | 2 |
| (15.41d) | Transitivity；别名：Transitivity of ≤ | Theorem | a ≤ b ∧ b ≤ c ⇒ a ≤ c | 2 |
| (15.42) | <-Isotonicity of + | Theorem | a < b ≡ a + d < b + d | 2 |
| (15.42) | Monotonicity of ·；别名：<-Isotonicity of · | Theorem | 0 < d ⇒ (a < b ≡ a · d < b · d) | 2 |
| (15.44) | Trichotomy | Theorem | (a < b ≡ (a = b ≡ a > b)) ∧ ¬ (a < b ∧ (a = b ∧ a > b)) | 2 |
| (15.45) | Antisymmetry of ≤ | Theorem | a ≤ b ∧ b ≤ a ≡ a = b | 2 |
| (15.46) | Reflexivity of ≤ | Theorem | a ≤ a | 2 |
| (15.5) | Distributivity of · over + | Axiom | a · (b + c) = a · b + a · c | 2 |
| (15.7) | Cancellation of · | Axiom | c ≠ 0 ⇒ (c · a = c · b ≡ a = b) | 4 |
| (15.8) | Cancellation of + | Axiom | a + b = a + c ≡ b = c | 4 |
| (15.9) | Zero of · | Axiom | a · 0 = 0 | 2 |
| (3.1) | Associativity of ≡ | Axiom | ((p ≡ q) ≡ r) ≡ (p ≡ (q ≡ r)) | 8 |
| (3.10) | Definition of ≢ | Axiom | (p ≢ q) ≡ ¬ (p ≡ q) | 8 |
| (3.11) | ¬ connection | Theorem | ¬ p ≡ (q ≡ (p ≡ ¬ q)) | 8 |
| (3.12) | Double negation | Theorem | ¬ (¬ p) ≡ p | 8 |
| (3.13) | Negation of `false` | Theorem | ¬ false ≡ true | 8 |
| (3.14) | 原文未命名 | Theorem | (p ≢ q) ≡ (¬ p ≡ q) | 8 |
| (3.15) | Definition of ¬ from ≡ | Theorem | ¬ p ≡ (p ≡ false) | 8 |
| (3.16) | Symmetry of ≢ | Theorem | (p ≢ q) ≡ (q ≢ p) | 8 |
| (3.17) | Associativity of ≢ | Theorem | ((p ≢ q) ≢ r) ≡ (p ≢ (q ≢ r)) | 8 |
| (3.18) | Mutual associativity of ≡ with ≢ | Theorem | ((p ≢ q) ≡ r) ≡ (p ≢ (q ≡ r)) | 8 |
| (3.19) | Mutual interchangeability of ≡ with ≢ | Theorem | (p ≢ (q ≡ r)) ≡ (p ≡ (q ≢ r)) | 8 |
| (3.2) | Symmetry of ≡ | Axiom | (p ≡ q) ≡ (q ≡ p) | 8 |
| (3.24) | Symmetry of ∨ | Axiom | p ∨ q ≡ q ∨ p | 8 |
| (3.25) | Associativity of ∨ | Axiom | (p ∨ q) ∨ r ≡ p ∨ (q ∨ r) | 8 |
| (3.26) | Idempotency of ∨ | Axiom | p ∨ p ≡ p | 8 |
| (3.27) | Distributivity of ∨ over ≡ | Axiom | p ∨ (q ≡ r) ≡ (p ∨ q ≡ p ∨ r) | 8 |
| (3.28) | Excluded middle；别名：LEM | Axiom | p ∨ ¬ p | 8 |
| (3.29) | Zero of ∨ | Theorem | p ∨ true ≡ true | 8 |
| (3.3) | Identity of ≡ | Axiom | true ≡ (q ≡ q) | 8 |
| (3.30) | Identity of ∨ | Theorem | p ∨ false ≡ p | 8 |
| (3.31) | Distributivity of ∨ over ∨ | Theorem | p ∨ (q ∨ r) ≡ (p ∨ q) ∨ (p ∨ r) | 8 |
| (3.32) | 原文未命名 | Theorem | p ∨ q ≡ (p ∨ ¬ q ≡ p) | 8 |
| (3.35) | Golden rule | Axiom | p ∧ q ≡ (p ≡ (q ≡ p ∨ q)) | 8 |
| (3.36) | Symmetry of ∧ | Theorem | p ∧ q ≡ q ∧ p | 8 |
| (3.37) | Associativity of ∧ | Theorem | (p ∧ q) ∧ r ≡ p ∧ (q ∧ r) | 8 |
| (3.38) | Idempotency of ∧ | Theorem | p ∧ p ≡ p | 8 |
| (3.39) | Identity of ∧ | Theorem | p ∧ true ≡ p | 8 |
| (3.4) | 原文未命名 | Theorem | true | 8 |
| (3.40) | Zero of ∧ | Theorem | p ∧ false ≡ false | 8 |
| (3.41) | Distributivity of ∧ over ∧ | Theorem | p ∧ (q ∧ r) ≡ (p ∧ q) ∧ (p ∧ r) | 8 |
| (3.42) | Contradiction | Theorem | p ∧ ¬ p ≡ false | 8 |
| (3.43a) | Absorption | Theorem | p ∧ (p ∨ q) ≡ p | 8 |
| (3.43b) | Absorption | Theorem | p ∨ (p ∧ q) ≡ p | 8 |
| (3.44a) | Absorption | Theorem | p ∧ (¬ p ∨ q) ≡ p ∧ q | 8 |
| (3.44b) | Absorption | Theorem | p ∨ (¬ p ∧ q) ≡ p ∨ q | 8 |
| (3.44c) | Absorption | Theorem | ¬ p ∧ (p ∨ q) ≡ ¬ p ∧ q | 8 |
| (3.44d) | Absorption | Theorem | ¬ p ∨ (p ∧ q) ≡ ¬ p ∨ q | 8 |
| (3.45) | Distributivity of ∨ over ∧ | Theorem | p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r) | 8 |
| (3.46) | Distributivity of ∧ over ∨ | Theorem | p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r) | 8 |
| (3.47a) | De Morgan | Theorem | ¬ (p ∧ q) ≡ ¬ p ∨ ¬ q | 8 |
| (3.47b) | De Morgan | Theorem | ¬ (p ∨ q) ≡ ¬ p ∧ ¬ q | 8 |
| (3.47c) | De Morgan | Theorem | ¬ (¬ p ∧ q) ≡ p ∨ ¬ q | 8 |
| (3.47d) | De Morgan | Theorem | ¬ (¬ p ∨ q) ≡ p ∧ ¬ q | 8 |
| (3.47e) | De Morgan dual of ∧ | Theorem | ¬ (¬ p ∧ ¬ q) ≡ p ∨ q | 8 |
| (3.47f) | De Morgan dual of ∨ | Theorem | ¬ (¬ p ∨ ¬ q) ≡ p ∧ q | 8 |
| (3.48) | 原文未命名 | Theorem | p ∧ q ≡ (p ∧ ¬ q ≡ ¬ p) | 8 |
| (3.49) | Semi-distributivity of ∧ over ≡ | Theorem | p ∧ (q ≡ r) ≡ (p ∧ q ≡ (p ∧ r ≡ p)) | 8 |
| (3.5) | Reflexivity of ≡ | Theorem | p ≡ p | 8 |
| (3.50) | Strong modus ponens for ≡ | Theorem | p ∧ (q ≡ p) ≡ p ∧ q | 8 |
| (3.51) | Replacement | Theorem | (p ≡ q) ∧ (r ≡ p) ≡ (p ≡ q) ∧ (r ≡ q) | 8 |
| (3.52) | Alternative definition of ≡ | Theorem | p ≡ (q ≡ (p ∧ q) ∨ (¬ p ∧ ¬ q)) | 8 |
| (3.53) | Exclusive or；别名：Alternative definition of ≢ | Theorem | (p ≢ q) ≡ (¬ p ∧ q) ∨ (p ∧ ¬ q) | 8 |
| (3.55) | 原文未命名 | Theorem | (p ∧ q) ∧ r ≡ (p ≡ (q ≡ (r ≡ (p ∨ q ≡ (q ∨ r ≡ (r ∨ p ≡ p ∨ (q ∨ r))))))) | 8 |
| (3.57) | Definition of ⇒ via ∨；别名：Definition of ⇒ from ∨、Definition of ⇒、Definition of implication | Axiom | p ⇒ q ≡ (p ∨ q ≡ q) | 8 |
| (3.57=) | Implication via ∨ | Lemma | (p ⇒ q) = (p ∨ q ≡ q) | 8 |
| (3.58) | Definition of ⇐；别名：Consequence | Axiom | p ⇐ q ≡ q ⇒ p | 8 |
| (3.59) | Material implication；别名：Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ ¬ p ∨ q | 8 |
| (3.60) | Definition of ⇒ via ∧；别名：Definition of ⇒ from ∧、Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ (p ∧ q ≡ p) | 8 |
| (3.60=) | Implication via ∧ | Lemma | (p ⇒ q) = (p ∧ q ≡ p) | 8 |
| (3.61) | Contrapositive | Theorem | p ⇒ q ≡ ¬ q ⇒ ¬ p | 8 |
| (3.61.1) | ¬-connection for ⇒ | Theorem | p ⇒ ¬ q ≡ q ⇒ ¬ p | 8 |
| (3.61.2) | ¬-connection for ⇒ | Theorem | ¬ p ⇒ q ≡ ¬ q ⇒ p | 8 |
| (3.62) | 原文未命名 | Theorem | p ⇒ (q ≡ r) ≡ (p ∧ q ≡ p ∧ r) | 8 |
| (3.63) | Distributivity of ⇒ over ≡ | Theorem | p ⇒ (q ≡ r) ≡ (p ⇒ q ≡ p ⇒ r) | 8 |
| (3.64) | Self-distributivity of ⇒ | Theorem | p ⇒ (q ⇒ r) ≡ (p ⇒ q) ⇒ (p ⇒ r) | 8 |
| (3.65) | Shunting | Theorem | p ∧ q ⇒ r ≡ p ⇒ (q ⇒ r) | 8 |
| (3.66) | Strong modus ponens | Theorem | p ∧ (p ⇒ q) ≡ p ∧ q | 8 |
| (3.67) | 原文未命名 | Theorem | p ∧ (q ⇒ p) ≡ p | 8 |
| (3.68) | 原文未命名 | Theorem | p ∨ (p ⇒ q) ≡ true | 8 |
| (3.69) | 原文未命名 | Theorem | p ∨ (q ⇒ p) ≡ q ⇒ p | 8 |
| (3.70) | 原文未命名 | Theorem | p ∨ q ⇒ p ∧ q ≡ (p ≡ q) | 8 |
| (3.71) | Reflexivity of ⇒ | Theorem | p ⇒ p | 8 |
| (3.72) | Right-zero of ⇒；别名：ex quodlibet verum | Theorem | p ⇒ true | 8 |
| (3.73) | Left-identity of ⇒ | Theorem | true ⇒ p ≡ p | 8 |
| (3.74) | Definition of ¬ from ⇒ | Theorem | p ⇒ false ≡ ¬ p | 8 |
| (3.75) | ex falso quodlibet | Theorem | false ⇒ p | 8 |
| (3.76a) | Weakening；别名：Strengthening | Theorem | p ⇒ p ∨ q | 8 |
| (3.76b) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p | 8 |
| (3.76c) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∨ q | 8 |
| (3.76d) | Weakening；别名：Strengthening | Theorem | p ∨ (q ∧ r) ⇒ p ∨ q | 8 |
| (3.76e) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∧ (q ∨ r) | 8 |
| (3.77) | Modus ponens | Theorem | p ∧ (p ⇒ q) ⇒ q | 8 |
| (3.78) | Case analysis | Theorem | (p ⇒ r) ∧ (q ⇒ r) ≡ p ∨ q ⇒ r | 8 |
| (3.79) | Case analysis | Theorem | (p ⇒ r) ∧ (¬ p ⇒ r) ≡ r | 8 |
| (3.8) | Definition of `false` | Axiom | false ≡ ¬ true | 8 |
| (3.80) | Mutual implication | Theorem | (p ⇒ q) ∧ (q ⇒ p) ≡ (p ≡ q) | 8 |
| (3.80.1) | Reflexivity of ⇒ wrt. ≡；别名：Reflexivity of ⇒ | Theorem | (p ≡ q) ⇒ (p ⇒ q) | 8 |
| (3.81) | Antisymmetry of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ p) ⇒ (p ≡ q) | 8 |
| (3.82.4) | Implication strengthening | Theorem | p ⇒ q ≡ p ⇒ p ∧ q | 8 |
| (3.82.5) | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 8 |
| (3.82a) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 8 |
| (3.82b) | Transitivity of ⇒ | Theorem | (p ≡ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 8 |
| (3.82c) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ≡ r) ⇒ (p ⇒ r) | 8 |
| (3.83) | Leibniz | Axiom | e = f ⇒ E[z ≔ e] = E[z ≔ f] | 8 |
| (3.83.1) | Leibniz | Corollary | d = e ⇒ f d = f e | 8 |
| (3.83.2) | Leibniz | Corollary | d = e ⇒ (p d ≡ p e) | 8 |
| (3.83.3) | Leibniz | Corollary | (d ≡ e) ⇒ (p d ≡ p e) | 8 |
| (3.83.4) | Leibniz | Corollary | (d ≡ e) ⇒ f d = f e | 8 |
| (3.84a) | Replacement | Theorem | e = f ∧ E[z ≔ e] ≡ e = f ∧ E[z ≔ f] | 8 |
| (3.84a≡) | Replacement | Theorem | (e ≡ f) ∧ E[z ≔ e] ≡ (e ≡ f) ∧ E[z ≔ f] | 8 |
| (3.84b) | Replacement | Theorem | e = f ⇒ E[z ≔ e] ≡ e = f ⇒ E[z ≔ f] | 8 |
| (3.84b≡) | Replacement | Theorem | (e ≡ f) ⇒ E[z ≔ e] ≡ (e ≡ f) ⇒ E[z ≔ f] | 8 |
| (3.84c) | Replacement | Theorem | q ∧ (e ≡ f) ⇒ E[z ≔ e] ≡ q ∧ (e ≡ f) ⇒ E[z ≔ f] | 8 |
| (3.84c) | Replacement | Theorem | q ∧ e = f ⇒ E[z ≔ e] ≡ q ∧ e = f ⇒ E[z ≔ f] | 8 |
| (3.85a) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] ≡ p ⇒ E[z ≔ true] | 8 |
| (3.85b) | Replace by `true` | Theorem | q ∧ p ⇒ E[z ≔ p] ≡ q ∧ p ⇒ E[z ≔ true] | 8 |
| (3.85c) | Replace by `false` | Theorem | ¬ p ⇒ E[z ≔ p] ≡ ¬ p ⇒ E[z ≔ false] | 8 |
| (3.85d) | Replace by `false` | Theorem | q ∧ ¬ p ⇒ E[z ≔ p] ≡ q ∧ ¬ p ⇒ E[z ≔ false] | 8 |
| (3.85e) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] = E[z ≔ true] | 8 |
| (3.86a) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ≡ E[z ≔ false] ⇒ p | 8 |
| (3.86b) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ∨ q ≡ E[z ≔ false] ⇒ p ∨ q | 8 |
| (3.87) | Replace by `true` | Theorem | p ∧ E[z ≔ p] ≡ p ∧ E[z ≔ true] | 8 |
| (3.87.1) | Abbreviated replace by `false` | Theorem | ¬ p ∧ E ≡ ¬ p ∧ E[p ≔ false] | 8 |
| (3.87.1) | Abbreviated replace by `true` | Theorem | p ∧ E ≡ p ∧ E[p ≔ true] | 8 |
| (3.88) | Replace by `false` | Theorem | p ∨ E[z ≔ p] ≡ p ∨ E[z ≔ false] | 8 |
| (3.89) | Shannon | Theorem | E[z ≔ p] ≡ (p ∧ E[z ≔ true]) ∨ (¬ p ∧ E[z ≔ false]) | 8 |
| (3.9) | Commutativity of ¬ with ≡ | Axiom | ¬ (p ≡ q) ≡ (¬ p ≡ q) | 8 |
| (4.3) | Left-monotonicity of ∧；别名：Monotonicity of ∧ | Theorem | (p ⇒ q) ⇒ (p ∧ r ⇒ q ∧ r) | 8 |
| (8.11) | Substitution into ∀ | Axiom | (∀ y ❙ R • P )[x ≔ F] ≡ (∀ y ❙ R[x ≔ F] • P[x ≔ F] ) | 8 |
| (8.11) | Substitution into ∃ | Axiom | (∃ y ❙ R • P )[x ≔ F] ≡ (∃ y ❙ R[x ≔ F] • P[x ≔ F] ) | 8 |
| (8.11) | Substitution into ∏ | Axiom | (∏ y ❙ R • P )[x ≔ F] = (∏ y ❙ R[x ≔ F] • P[x ≔ F] ) | 4 |
| (8.11) | Substitution into ∑ | Axiom | (∑ y ❙ R • P )[x ≔ F] = (∑ y ❙ R[x ≔ F] • P[x ≔ F] ) | 5 |
| (8.12.1) | Leibniz for ∀ range | Axiom | (∀ x • R₁ ≡ R₂ ) ⇒ ((∀ x ❙ R₁ • P ) ≡ (∀ x ❙ R₂ • P )) | 8 |
| (8.12.1) | Leibniz for ∃ range | Axiom | (∀ x • R₁ ≡ R₂ ) ⇒ ((∃ x ❙ R₁ • P ) ≡ (∃ x ❙ R₂ • P )) | 8 |
| (8.12.1) | Leibniz for ∏ range | Axiom | (∀ x • R₁ ≡ R₂ ) ⇒ (∏ x ❙ R₁ • P ) = (∏ x ❙ R₂ • P ) | 4 |
| (8.12.1) | Leibniz for ∑ range | Axiom | (∀ x • R₁ ≡ R₂ ) ⇒ (∑ x ❙ R₁ • P ) = (∑ x ❙ R₂ • P ) | 5 |
| (8.12.1₂) | Leibniz for ∀₂ range | Axiom | (∀ x, y • R₁ ≡ R₂ ) ⇒ ((∀ x, y ❙ R₁ • P ) ≡ (∀ x, y ❙ R₂ • P )) | 8 |
| (8.12.1₂) | Leibniz for ∃₂ range | Axiom | (∀ x, y • R₁ ≡ R₂ ) ⇒ ((∃ x, y ❙ R₁ • P ) ≡ (∃ x, y ❙ R₂ • P )) | 8 |
| (8.12.1₂) | Leibniz for ∏₂ range | Axiom | (∀ x, y • R₁ ≡ R₂ ) ⇒ (∏ x, y ❙ R₁ • P ) = (∏ x, y ❙ R₂ • P ) | 4 |
| (8.12.1₂) | Leibniz for ∑₂ range | Axiom | (∀ x, y • R₁ ≡ R₂ ) ⇒ (∑ x, y ❙ R₁ • P ) = (∑ x, y ❙ R₂ • P ) | 5 |
| (8.12.1₃) | Leibniz for ∀₃ range | Axiom | (∀ x, y, z • R₁ ≡ R₂ ) ⇒ ((∀ x, y, z ❙ R₁ • P ) ≡ (∀ x, y, z ❙ R₂ • P )) | 8 |
| (8.12.1₃) | Leibniz for ∃₃ range | Axiom | (∀ x, y, z • R₁ ≡ R₂ ) ⇒ ((∃ x, y, z ❙ R₁ • P ) ≡ (∃ x, y, z ❙ R₂ • P )) | 8 |
| (8.12.1₃) | Leibniz for ∏₃ range | Axiom | (∀ x, y, z • R₁ ≡ R₂ ) ⇒ (∏ x, y, z ❙ R₁ • P ) = (∏ x, y, z ❙ R₂ • P ) | 4 |
| (8.12.1₃) | Leibniz for ∑₃ range | Axiom | (∀ x, y, z • R₁ ≡ R₂ ) ⇒ (∑ x, y, z ❙ R₁ • P ) = (∑ x, y, z ❙ R₂ • P ) | 5 |
| (8.12.2) | Leibniz for ∀ body | Axiom | (∀ x • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∀ x ❙ R • P₁ ) ≡ (∀ x ❙ R • P₂ )) | 8 |
| (8.12.2) | Leibniz for ∃ body | Corollary | (∀ x ❙ R • P₁ ≡ P₂ ) ⇒ ((∃ x ❙ R • P₁ ) ≡ (∃ x ❙ R • P₂ )) | 8 |
| (8.12.2) | Leibniz for ∃ body | Axiom | (∀ x • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∃ x ❙ R • P₁ ) ≡ (∃ x ❙ R • P₂ )) | 8 |
| (8.12.2) | Leibniz for ∏ body | Axiom | (∀ x • R ⇒ P₁ = P₂ ) ⇒ (∏ x ❙ R • P₁ ) = (∏ x ❙ R • P₂ ) | 4 |
| (8.12.2) | Leibniz for ∏ body | Corollary | (∀ x ❙ R • E₁ = E₂ ) ⇒ (∏ x ❙ R • E₁ ) = (∏ x ❙ R • E₂ ) | 4 |
| (8.12.2) | Leibniz for ∑ body | Corollary | (∀ x ❙ R • E₁ = E₂ ) ⇒ (∑ x ❙ R • E₁ ) = (∑ x ❙ R • E₂ ) | 5 |
| (8.12.2) | Leibniz for ∑ body | Axiom | (∀ x • R ⇒ P₁ = P₂ ) ⇒ (∑ x ❙ R • P₁ ) = (∑ x ❙ R • P₂ ) | 5 |
| (8.12.2₂) | Leibniz for ∀₂ body | Axiom | (∀ x, y • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∀ x, y ❙ R • P₁ ) ≡ (∀ x, y ❙ R • P₂ )) | 8 |
| (8.12.2₂) | Leibniz for ∃₂ body | Axiom | (∀ x, y • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∃ x, y ❙ R • P₁ ) ≡ (∃ x, y ❙ R • P₂ )) | 8 |
| (8.12.2₂) | Leibniz for ∏₂ body | Axiom | (∀ x, y • R ⇒ P₁ = P₂ ) ⇒ (∏ x, y ❙ R • P₁ ) = (∏ x, y ❙ R • P₂ ) | 4 |
| (8.12.2₂) | Leibniz for ∑₂ body | Axiom | (∀ x, y • R ⇒ P₁ = P₂ ) ⇒ (∑ x, y ❙ R • P₁ ) = (∑ x, y ❙ R • P₂ ) | 5 |
| (8.12.2₃) | Leibniz for ∀₃ body | Axiom | (∀ x, y, z • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∀ x, y, z ❙ R • P₁ ) ≡ (∀ x, y, z ❙ R • P₂ )) | 8 |
| (8.12.2₃) | Leibniz for ∃₃ body | Axiom | (∀ x, y, z • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∃ x, y, z ❙ R • P₁ ) ≡ (∃ x, y, z ❙ R • P₂ )) | 8 |
| (8.12.2₃) | Leibniz for ∏₃ body | Axiom | (∀ x, y, z • R ⇒ P₁ = P₂ ) ⇒ (∏ x, y, z ❙ R • P₁ ) = (∏ x, y, z ❙ R • P₂ ) | 4 |
| (8.12.2₃) | Leibniz for ∑₃ body | Axiom | (∀ x, y, z • R ⇒ P₁ = P₂ ) ⇒ (∑ x, y, z ❙ R • P₁ ) = (∑ x, y, z ❙ R • P₂ ) | 5 |
| (8.13) | Empty range for ∀ | Axiom | (∀ x ❙ false • P ) ≡ true | 8 |
| (8.13) | Empty range for ∃ | Axiom | (∃ x ❙ false • P ) ≡ false | 8 |
| (8.13) | Empty range for ∏ | Axiom | (∏ x ❙ false • P ) = 1 | 4 |
| (8.13) | Empty range for ∑ | Axiom | (∑ x ❙ false • P ) = 0 | 5 |
| (8.14) | One-point rule for ∀ | Axiom | (∀ x ❙ x = E • P ) ≡ P[x ≔ E] | 8 |
| (8.14) | One-point rule for ∃ | Axiom | (∃ x ❙ x = E • P ) ≡ P[x ≔ E] | 8 |
| (8.14) | One-point rule for ∏ | Axiom | (∏ x ❙ x = E • P ) = P[x ≔ E] | 4 |
| (8.14) | One-point rule for ∑ | Axiom | (∑ x ❙ x = E • P ) = P[x ≔ E] | 5 |
| (8.15) | Distributivity of ∀ over ∧ | Axiom | (∀ x ❙ R • P ) ∧ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∧ Q ) | 8 |
| (8.15) | Distributivity of ∃ over ∨ | Axiom | (∃ x ❙ R • P ) ∨ (∃ x ❙ R • Q ) ≡ (∃ x ❙ R • P ∨ Q ) | 8 |
| (8.15) | Distributivity of ∏ quantification over `_·_` | Axiom | (∏ x ❙ R • P ) · (∏ x ❙ R • Q ) = (∏ x ❙ R • P · Q ) | 4 |
| (8.15) | Distributivity of ∑ quantification over `_+_` | Axiom | (∑ x ❙ R • P ) + (∑ x ❙ R • Q ) = (∑ x ❙ R • P + Q ) | 5 |
| (8.16) | Disjoint range split for ∀ | Theorem | (∀ x • R ∧ S ≡ false ) ⇒ ((∀ x ❙ R ∨ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P )) | 8 |
| (8.16) | Disjoint range split for ∃ | Theorem | (∀ x • R ∧ S ≡ false ) ⇒ ((∃ x ❙ R ∨ S • P ) ≡ (∃ x ❙ R • P ) ∨ (∃ x ❙ S • P )) | 8 |
| (8.16) | Disjoint range split for ∏ | Theorem | (∀ x • R ∧ S ≡ false ) ⇒ (∏ x ❙ R ∨ S • P ) = (∏ x ❙ R • P ) · (∏ x ❙ S • P ) | 4 |
| (8.16) | Disjoint range split for ∑ | Theorem | (∀ x • R ∧ S ≡ false ) ⇒ (∑ x ❙ R ∨ S • P ) = (∑ x ❙ R • P ) + (∑ x ❙ S • P ) | 5 |
| (8.16.1) | Alternative range split for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x ❙ R ∧ S • P ) ∧ (∀ x ❙ R ∧ ¬ S • P ) | 8 |
| (8.16.1) | Alternative range split for ∃ | Theorem | (∃ x ❙ R • P ) ≡ (∃ x ❙ R ∧ S • P ) ∨ (∃ x ❙ R ∧ ¬ S • P ) | 8 |
| (8.16.1) | Alternative range split for ∏ | Theorem | (∏ x ❙ R • P ) = (∏ x ❙ R ∧ S • P ) · (∏ x ❙ R ∧ ¬ S • P ) | 4 |
| (8.16.1) | Alternative range split for ∑ | Theorem | (∑ x ❙ R • P ) = (∑ x ❙ R ∧ S • P ) + (∑ x ❙ R ∧ ¬ S • P ) | 5 |
| (8.17) | General range split for ∀ | Axiom | (∀ x ❙ R ∨ S • P ) ∧ (∀ x ❙ R ∧ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P ) | 8 |
| (8.17) | General range split for ∃ | Axiom | (∃ x ❙ R ∨ S • P ) ∨ (∃ x ❙ R ∧ S • P ) ≡ (∃ x ❙ R • P ) ∨ (∃ x ❙ S • P ) | 8 |
| (8.17) | General range split for ∏ | Axiom | (∏ x ❙ R ∨ S • P ) · (∏ x ❙ R ∧ S • P ) = (∏ x ❙ R • P ) · (∏ x ❙ S • P ) | 4 |
| (8.17) | General range split for ∑ | Axiom | (∑ x ❙ R ∨ S • P ) + (∑ x ❙ R ∧ S • P ) = (∑ x ❙ R • P ) + (∑ x ❙ S • P ) | 5 |
| (8.18) | Range split for ∀ | Theorem | (∀ x ❙ R ∨ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P ) | 16 |
| (8.18) | Range split for ∀₂ | Theorem | (∀ x, y ❙ R ∨ S • P ) ≡ (∀ x, y ❙ R • P ) ∧ (∀ x, y ❙ S • P ) | 8 |
| (8.18) | Range split for ∃ | Theorem | (∃ x ❙ R ∨ S • P ) ≡ (∃ x ❙ R • P ) ∨ (∃ x ❙ S • P ) | 8 |
| (8.19) | Interchange of dummies for ∀ | Theorem | (∀ x ❙ R • (∀ y ❙ S • P ) ) ≡ (∀ y ❙ S • (∀ x ❙ R • P ) ) | 8 |
| (8.19) | Interchange of dummies for ∃ | Theorem | (∃ x ❙ R • (∃ y ❙ S • P ) ) ≡ (∃ y ❙ S • (∃ x ❙ R • P ) ) | 8 |
| (8.19) | Interchange of dummies for ∏ | Theorem | (∏ x ❙ R • (∏ y ❙ S • P ) ) = (∏ y ❙ S • (∏ x ❙ R • P ) ) | 4 |
| (8.19) | Interchange of dummies for ∑ | Theorem | (∑ x ❙ R • (∑ y ❙ S • P ) ) = (∑ y ❙ S • (∑ x ❙ R • P ) ) | 5 |
| (8.19.1) | Dummy list permutation for ∀ | Axiom | (∀ x, y ❙ R • P ) ≡ (∀ y, x ❙ R • P ) | 8 |
| (8.19.1) | Dummy list permutation for ∃ | Axiom | (∃ x, y ❙ R • P ) ≡ (∃ y, x ❙ R • P ) | 8 |
| (8.19.1) | Dummy list permutation for ∏ | Axiom | (∏ x, y ❙ R • P ) = (∏ y, x ❙ R • P ) | 4 |
| (8.19.1) | Dummy list permutation for ∑ | Axiom | (∑ x, y ❙ R • P ) = (∑ y, x ❙ R • P ) | 5 |
| (8.19.1) | Dummy list permutation₁+₂ for ∀ | Axiom | (∀ x, y, z ❙ R • P ) ≡ (∀ y, z, x ❙ R • P ) | 8 |
| (8.19.1) | Dummy list permutation₁+₂ for ∃ | Axiom | (∃ x, y, z ❙ R • P ) ≡ (∃ y, z, x ❙ R • P ) | 8 |
| (8.19.1) | Dummy list permutation₁+₂ for ∏ | Axiom | (∏ x, y, z ❙ R • P ) = (∏ y, z, x ❙ R • P ) | 4 |
| (8.19.1) | Dummy list permutation₁+₂ for ∑ | Axiom | (∑ x, y, z ❙ R • P ) = (∑ y, z, x ❙ R • P ) | 5 |
| (8.20) | Nesting for ∀ | Axiom | (∀ x, y ❙ R ∧ S • P ) ≡ (∀ x ❙ R • (∀ y ❙ S • P ) ) | 8 |
| (8.20) | Nesting for ∃ | Axiom | (∃ x, y ❙ R ∧ S • P ) ≡ (∃ x ❙ R • (∃ y ❙ S • P ) ) | 8 |
| (8.20) | Nesting for ∏ | Axiom | (∏ x, y ❙ R ∧ S • P ) = (∏ x ❙ R • (∏ y ❙ S • P ) ) | 4 |
| (8.20) | Nesting for ∑ | Axiom | (∑ x, y ❙ R ∧ S • P ) = (∑ x ❙ R • (∑ y ❙ S • P ) ) | 5 |
| (8.20) | Nesting₁+₂ for ∀ | Axiom | (∀ x, y, z ❙ R ∧ S • P ) ≡ (∀ x ❙ R • (∀ y, z ❙ S • P ) ) | 8 |
| (8.20) | Nesting₁+₂ for ∃ | Axiom | (∃ x, y, z ❙ R ∧ S • P ) ≡ (∃ x ❙ R • (∃ y, z ❙ S • P ) ) | 8 |
| (8.20) | Nesting₁+₂ for ∏ | Axiom | (∏ x, y, z ❙ R ∧ S • P ) = (∏ x ❙ R • (∏ y, z ❙ S • P ) ) | 4 |
| (8.20) | Nesting₁+₂ for ∑ | Axiom | (∑ x, y, z ❙ R ∧ S • P ) = (∑ x ❙ R • (∑ y, z ❙ S • P ) ) | 5 |
| (8.20) | Nesting₂+₁ for ∀ | Axiom | (∀ x, y, z ❙ R ∧ S • P ) ≡ (∀ x, y ❙ R • (∀ z ❙ S • P ) ) | 8 |
| (8.20) | Nesting₂+₁ for ∃ | Axiom | (∃ x, y, z ❙ R ∧ S • P ) ≡ (∃ x, y ❙ R • (∃ z ❙ S • P ) ) | 8 |
| (8.20) | Nesting₂+₁ for ∏ | Axiom | (∏ x, y, z ❙ R ∧ S • P ) = (∏ x, y ❙ R • (∏ z ❙ S • P ) ) | 4 |
| (8.20) | Nesting₂+₁ for ∑ | Axiom | (∑ x, y, z ❙ R ∧ S • P ) = (∑ x, y ❙ R • (∑ z ❙ S • P ) ) | 5 |
| (8.20.1) | Nesting for ∀ | Theorem | (∀ x, y ❙ S • P ) ≡ (∀ x • (∀ y ❙ S • P ) ) | 8 |
| (8.20.1) | Nesting for ∃ | Theorem | (∃ x, y ❙ S • P ) ≡ (∃ x • (∃ y ❙ S • P ) ) | 8 |
| (8.20.1) | Nesting for ∏ | Theorem | (∏ x, y ❙ S • P ) = (∏ x • (∏ y ❙ S • P ) ) | 4 |
| (8.20.1) | Nesting for ∑ | Theorem | (∑ x, y ❙ S • P ) = (∑ x • (∑ y ❙ S • P ) ) | 5 |
| (8.20.1) | Nesting₁+₂ for ∀ | Theorem | (∀ x, y, z ❙ S • P ) ≡ (∀ x • (∀ y, z ❙ S • P ) ) | 8 |
| (8.20.1) | Nesting₁+₂ for ∃ | Theorem | (∃ x, y, z ❙ S • P ) ≡ (∃ x • (∃ y, z ❙ S • P ) ) | 8 |
| (8.20.1) | Nesting₁+₂ for ∏ | Theorem | (∏ x, y, z ❙ S • P ) = (∏ x • (∏ y, z ❙ S • P ) ) | 4 |
| (8.20.1) | Nesting₁+₂ for ∑ | Theorem | (∑ x, y, z ❙ S • P ) = (∑ x • (∑ y, z ❙ S • P ) ) | 5 |
| (8.20.1) | Nesting₂+₁ for ∀ | Theorem | (∀ x, y, z ❙ S • P ) ≡ (∀ x, y • (∀ z ❙ S • P ) ) | 8 |
| (8.20.1) | Nesting₂+₁ for ∃ | Theorem | (∃ x, y, z ❙ S • P ) ≡ (∃ x, y • (∃ z ❙ S • P ) ) | 8 |
| (8.20.1) | Nesting₂+₁ for ∏ | Theorem | (∏ x, y, z ❙ S • P ) = (∏ x, y • (∏ z ❙ S • P ) ) | 4 |
| (8.20.1) | Nesting₂+₁ for ∑ | Theorem | (∑ x, y, z ❙ S • P ) = (∑ x, y • (∑ z ❙ S • P ) ) | 5 |
| (8.20.2) | Nesting for ∀ | Theorem | (∀ x, y ❙ R • P ) ≡ (∀ x ❙ R • (∀ y • P ) ) | 8 |
| (8.20.2) | Nesting for ∃ | Theorem | (∃ x, y ❙ R • P ) ≡ (∃ x ❙ R • (∃ y • P ) ) | 8 |
| (8.20.2) | Nesting for ∏ | Theorem | (∏ x, y ❙ R • P ) = (∏ x ❙ R • (∏ y • P ) ) | 4 |
| (8.20.2) | Nesting for ∑ | Theorem | (∑ x, y ❙ R • P ) = (∑ x ❙ R • (∑ y • P ) ) | 5 |
| (8.20.2) | Nesting₁+₂ for ∀ | Theorem | (∀ x, y, z ❙ R • P ) ≡ (∀ x ❙ R • (∀ y, z • P ) ) | 8 |
| (8.20.2) | Nesting₁+₂ for ∃ | Theorem | (∃ x, y, z ❙ R • P ) ≡ (∃ x ❙ R • (∃ y, z • P ) ) | 8 |
| (8.20.2) | Nesting₁+₂ for ∏ | Theorem | (∏ x, y, z ❙ R • P ) = (∏ x ❙ R • (∏ y, z • P ) ) | 4 |
| (8.20.2) | Nesting₁+₂ for ∑ | Theorem | (∑ x, y, z ❙ R • P ) = (∑ x ❙ R • (∑ y, z • P ) ) | 5 |
| (8.20.2) | Nesting₂+₁ for ∀ | Theorem | (∀ x, y, z ❙ R • P ) ≡ (∀ x, y ❙ R • (∀ z • P ) ) | 8 |
| (8.20.2) | Nesting₂+₁ for ∃ | Theorem | (∃ x, y, z ❙ R • P ) ≡ (∃ x, y ❙ R • (∃ z • P ) ) | 8 |
| (8.20.2) | Nesting₂+₁ for ∏ | Theorem | (∏ x, y, z ❙ R • P ) = (∏ x, y ❙ R • (∏ z • P ) ) | 4 |
| (8.20.2) | Nesting₂+₁ for ∑ | Theorem | (∑ x, y, z ❙ R • P ) = (∑ x, y ❙ R • (∑ z • P ) ) | 5 |
| (8.20.3) | Replacement in ∀ | Theorem | (∀ y ❙ R ∧ e = f • P[x ≔ e] ) ≡ (∀ y ❙ R ∧ e = f • P[x ≔ f] ) | 8 |
| (8.20.3) | Replacement in ∃ | Theorem | (∃ y ❙ R ∧ e = f • P[x ≔ e] ) ≡ (∃ y ❙ R ∧ e = f • P[x ≔ f] ) | 8 |
| (8.20.3) | Replacement in ∏ | Theorem | (∏ y ❙ R ∧ e = f • P[x ≔ e] ) = (∏ y ❙ R ∧ e = f • P[x ≔ f] ) | 4 |
| (8.20.3) | Replacement in ∑ | Theorem | (∑ y ❙ R ∧ e = f • P[x ≔ e] ) = (∑ y ❙ R ∧ e = f • P[x ≔ f] ) | 5 |
| (8.21) | Dummy renaming for ∀；别名：α-conversion | Theorem | (∀ x ❙ R • P ) ≡ (∀ y ❙ R[x ≔ y] • P[x ≔ y] ) | 8 |
| (8.21) | Dummy renaming for ∃；别名：α-conversion | Theorem | (∃ x ❙ R • P ) ≡ (∃ y ❙ R[x ≔ y] • P[x ≔ y] ) | 8 |
| (8.21) | Dummy renaming for ∏；别名：α-conversion | Theorem | (∏ x ❙ R • P ) = (∏ y ❙ R[x ≔ y] • P[x ≔ y] ) | 4 |
| (8.21) | Dummy renaming for ∑；别名：α-conversion | Theorem | (∑ x ❙ R • P ) = (∑ y ❙ R[x ≔ y] • P[x ≔ y] ) | 5 |
| (8.22) | Change of dummy in ∀ | Theorem | (∀ f • (∀ g • (∀ x • (∀ y • x = f y ≡ y = g x ) ) ⇒ ((∀ x ❙ R • P ) ≡ (∀ y ❙ R[x ≔ f y] • P[x ≔ f y] )) ) ) | 8 |
| (8.22) | Change of dummy in ∃ | Theorem | (∀ f • (∀ g • (∀ x • (∀ y • x = f y ≡ y = g x ) ) ⇒ ((∃ x ❙ R • P ) ≡ (∃ y ❙ R[x ≔ f y] • P[x ≔ f y] )) ) ) | 8 |
| (8.22) | Change of dummy in ∏ | Theorem | (∀ f • (∀ g • (∀ x • (∀ y • x = f y ≡ y = g x ) ) ⇒ (∏ x ❙ R • P ) = (∏ y ❙ R[x ≔ f y] • P[x ≔ f y] ) ) ) | 4 |
| (8.22) | Change of dummy in ∑ | Theorem | (∀ f • (∀ g • (∀ x • (∀ y • x = f y ≡ y = g x ) ) ⇒ (∑ x ❙ R • P ) = (∑ y ❙ R[x ≔ f y] • P[x ≔ f y] ) ) ) | 5 |
| (8.22.1) | Change of dummy in ∀ — variant | Theorem | (∀ x • (∀ y • x = f y ⇒ y = g x ) ) ⇒ ((∀ x ❙ R ∧ x = f (g x) • P ) ≡ (∀ y ❙ R[x ≔ f y] • P[x ≔ f y] )) | 8 |
| (8.22.1) | Change of dummy in ∃ — variant | Theorem | (∀ x • (∀ y • x = f y ⇒ y = g x ) ) ⇒ ((∃ x ❙ R ∧ x = f (g x) • P ) ≡ (∃ y ❙ R[x ≔ f y] • P[x ≔ f y] )) | 8 |
| (8.22.1) | Change of dummy in ∏ — variant | Theorem | (∀ x • (∀ y • x = f y ⇒ y = g x ) ) ⇒ (∏ x ❙ R ∧ x = f (g x) • P ) = (∏ y ❙ R[x ≔ f y] • P[x ≔ f y] ) | 4 |
| (8.22.1) | Change of dummy in ∑ — variant | Theorem | (∀ x • (∀ y • x = f y ⇒ y = g x ) ) ⇒ (∑ x ❙ R ∧ x = f (g x) • P ) = (∑ y ❙ R[x ≔ f y] • P[x ≔ f y] ) | 5 |
| (8.22.2) | Range replacement in nested ∀ | Lemma | (∀ x ❙ R • (∀ y • Q₁ ≡ Q₂ ) ) ⇒ ((∀ x ❙ R • (∀ y ❙ Q₁ • P ) ) ≡ (∀ x ❙ R • (∀ y ❙ Q₂ • P ) )) | 8 |
| (8.22.2) | Range replacement in nested ∃ | Lemma | (∀ x ❙ R • (∀ y • Q₁ ≡ Q₂ ) ) ⇒ ((∃ x ❙ R • (∃ y ❙ Q₁ • P ) ) ≡ (∃ x ❙ R • (∃ y ❙ Q₂ • P ) )) | 8 |
| (8.22.2) | Range replacement in nested ∏ | Lemma | (∀ x ❙ R • (∀ y • Q₁ ≡ Q₂ ) ) ⇒ (∏ x ❙ R • (∏ y ❙ Q₁ • P ) ) = (∏ x ❙ R • (∏ y ❙ Q₂ • P ) ) | 4 |
| (8.22.2) | Range replacement in nested ∑ | Lemma | (∀ x ❙ R • (∀ y • Q₁ ≡ Q₂ ) ) ⇒ (∑ x ❙ R • (∑ y ❙ Q₁ • P ) ) = (∑ x ❙ R • (∑ y ❙ Q₂ • P ) ) | 5 |
| (8.22.3) | Change of restricted dummy in ∀ | Theorem | (∀ f • (∀ g • (∀ x ❙ R • (∀ y • x = f y ≡ y = g x ) ) ⇒ ((∀ x ❙ R • P ) ≡ (∀ y ❙ R[x ≔ f y] • P[x ≔ f y] )) ) ) | 8 |
| (8.22.3) | Change of restricted dummy in ∃ | Theorem | (∀ f • (∀ g • (∀ x ❙ R • (∀ y • x = f y ≡ y = g x ) ) ⇒ ((∃ x ❙ R • P ) ≡ (∃ y ❙ R[x ≔ f y] • P[x ≔ f y] )) ) ) | 8 |
| (8.22.3) | Change of restricted dummy in ∏ | Theorem | (∀ f • (∀ g • (∀ x ❙ R • (∀ y • x = f y ≡ y = g x ) ) ⇒ (∏ x ❙ R • P ) = (∏ y ❙ R[x ≔ f y] • P[x ≔ f y] ) ) ) | 4 |
| (8.22.3) | Change of restricted dummy in ∑ | Theorem | (∀ f • (∀ g • (∀ x ❙ R • (∀ y • x = f y ≡ y = g x ) ) ⇒ (∑ x ❙ R • P ) = (∑ y ❙ R[x ≔ f y] • P[x ≔ f y] ) ) ) | 5 |
| (9.10) | Range weakening for ∀；别名：Range strengthening for ∀ | Theorem | (∀ x ❙ Q ∨ R • P ) ⇒ (∀ x ❙ Q • P ) | 8 |
| (9.11) | Body weakening for ∀；别名：Body strengthening for ∀ | Theorem | (∀ x ❙ R • P ∧ Q ) ⇒ (∀ x ❙ R • P ) | 8 |
| (9.12) | Monotonicity of ∀；别名：Body monotonicity of ∀ | Theorem | (∀ x ❙ R • Q ⇒ P ) ⇒ ((∀ x ❙ R • Q ) ⇒ (∀ x ❙ R • P )) | 8 |
| (9.12a) | Range antitonicity of ∀ | Theorem | (∀ x ❙ ¬ P • Q ⇒ R ) ⇒ ((∀ x ❙ R • P ) ⇒ (∀ x ❙ Q • P )) | 8 |
| (9.12a) | Range antitonicity of ∀ | Theorem | (∀ x • Q ⇒ R ) ⇒ ((∀ x ❙ R • P ) ⇒ (∀ x ❙ Q • P )) | 8 |
| (9.13) | Instantiation | Theorem | (∀ x • P ) ⇒ P[x ≔ E] | 8 |
| (9.13.1) | Instantiation | Theorem | (∀ x • P ) ⇒ P[x ≔ x] | 8 |
| (9.13.2) | Instantiation | Theorem | (∀ x ❙ R • P ) ⇒ (R ⇒ P)[x ≔ E] | 8 |
| (9.17) | Generalised De Morgan；别名：Definition of ∃ | Axiom | (∃ x ❙ R • P ) ≡ ¬ (∀ x ❙ R • ¬ P ) | 8 |
| (9.18a) | Generalised De Morgan | Theorem | ¬ (∃ x ❙ R • ¬ P ) ≡ (∀ x ❙ R • P ) | 8 |
| (9.18b) | Generalised De Morgan | Theorem | ¬ (∃ x ❙ R • P ) ≡ (∀ x ❙ R • ¬ P ) | 8 |
| (9.18c) | Generalised De Morgan | Theorem | (∃ x ❙ R • ¬ P ) ≡ ¬ (∀ x ❙ R • P ) | 8 |
| (9.19) | Trading for ∃ | Theorem | (∃ x ❙ R • P ) ≡ (∃ x • R ∧ P ) | 8 |
| (9.2) | Trading for ∀ | Axiom | (∀ x ❙ R • P ) ≡ (∀ x • R ⇒ P ) | 8 |
| (9.20) | Trading for ∃ | Theorem | (∃ x ❙ Q ∧ R • P ) ≡ (∃ x ❙ Q • R ∧ P ) | 8 |
| (9.21) | Distributivity of ∧ over ∃ | Theorem | P ∧ (∃ x ❙ R • Q ) ≡ (∃ x ❙ R • P ∧ Q ) | 8 |
| (9.22) | 原文未命名 | Theorem | P ∧ (∃ x • R ) ≡ (∃ x ❙ R • P ) | 8 |
| (9.22.1) | Distributivity of ∧ over ∀ | Theorem | (∃ x • R ) ⇒ (P ∧ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∧ Q )) | 8 |
| (9.23) | Distributivity of ∨ over ∃ | Theorem | (∃ x • R ) ⇒ (P ∨ (∃ x ❙ R • Q ) ≡ (∃ x ❙ R • P ∨ Q )) | 8 |
| (9.24) | False ∃ body | Theorem | (∃ x ❙ R • false ) ≡ false | 8 |
| (9.25) | Range weakening for ∃；别名：Range strengthening for ∃ | Theorem | (∃ x ❙ R • P ) ⇒ (∃ x ❙ Q ∨ R • P ) | 8 |
| (9.25.1) | Range weakening for ∃；别名：Range strengthening for ∃ | Theorem | (∃ x ❙ Q ∧ R • P ) ⇒ (∃ x ❙ R • P ) | 8 |
| (9.26) | Body weakening for ∃；别名：Body strengthening for ∃ | Theorem | (∃ x ❙ R • P ) ⇒ (∃ x ❙ R • P ∨ Q ) | 8 |
| (9.26.1) | Body weakening for ∃；别名：Body strengthening for ∃ | Theorem | (∃ x ❙ R • P ∧ Q ) ⇒ (∃ x ❙ R • P ) | 8 |
| (9.27) | Monotonicity of ∃；别名：Body monotonicity of ∃ | Theorem | (∀ x ❙ R • Q ⇒ P ) ⇒ ((∃ x ❙ R • Q ) ⇒ (∃ x ❙ R • P )) | 8 |
| (9.27.1) | Simple body-monotonicity of ∃ | Theorem | (∀ x • P ⇒ Q ) ⇒ ((∃ x ❙ R • P ) ⇒ (∃ x ❙ R • Q )) | 8 |
| (9.27.2) | Range monotonicity of ∃ | Theorem | (∀ x • Q ⇒ R ) ⇒ ((∃ x ❙ Q • P ) ⇒ (∃ x ❙ R • P )) | 8 |
| (9.27.3) | Range monotonicity of ∃ | Theorem | (∀ x ❙ P • Q ⇒ R ) ⇒ ((∃ x ❙ Q • P ) ⇒ (∃ x ❙ R • P )) | 8 |
| (9.28) | ∃-Introduction | Theorem | P[x ≔ E] ⇒ (∃ x • P ) | 8 |
| (9.28.1) | ∃-Introduction | Theorem | (R ∧ P)[x ≔ E] ⇒ (∃ x ❙ R • P ) | 8 |
| (9.29) | Interchange of quantifications | Theorem | (∃ x ❙ R • (∀ y ❙ Q • P ) ) ⇒ (∀ y ❙ Q • (∃ x ❙ R • P ) ) | 8 |
| (9.29.1) | Interchange of quantifications | Theorem | (∃ x • (∀ y • P ) ) ⇒ (∀ y • (∃ x • P ) ) | 8 |
| (9.30.1) | Witness | Theorem | (∃ x ❙ R • P ) ⇒ Q ≡ (∀ x • R ∧ P ⇒ Q ) | 8 |
| (9.30.2) | Witness | Theorem | (∃ x • P ) ⇒ Q ≡ (∀ x • P ⇒ Q ) | 8 |
| (9.3a) | Trading for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x • ¬ R ∨ P ) | 8 |
| (9.3b) | Trading for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x • R ∧ P ≡ R ) | 8 |
| (9.3c) | Trading for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x • R ∨ P ≡ P ) | 8 |
| (9.4a) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • R ⇒ P ) | 8 |
| (9.4b) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • ¬ R ∨ P ) | 8 |
| (9.4c) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • R ∧ P ≡ R ) | 8 |
| (9.4d) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • R ∨ P ≡ P ) | 8 |
| (9.5) | Distributivity of ∨ over ∀ | Axiom | P ∨ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∨ Q ) | 8 |
| (9.6) | 原文未命名 | Theorem | P ∨ (∀ x • ¬ R ) ≡ (∀ x ❙ R • P ) | 8 |
| (9.7) | Distributivity of ∧ over ∀ | Theorem | ¬ (∀ x • ¬ R ) ⇒ (P ∧ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∧ Q )) | 8 |
| (9.8) | True ∀ body | Theorem | (∀ x ❙ R • true ) | 8 |
| (9.9) | Sub-distributivity of ∀ over ≡ | Theorem | (∀ x ❙ R • P ≡ Q ) ⇒ ((∀ x ❙ R • P ) ≡ (∀ x ❙ R • Q )) | 8 |
| (Ex5.2a) | 原文未命名 | Fact | isSorted (1 ◃ (3 ◃ (4 ◃ (7 ◃ 𝜖)))) | 5 |
| (Ex5.2b) | 原文未命名 | Fact | (insert 5) (1 ◃ (3 ◃ (4 ◃ (7 ◃ 𝜖)))) = 1 ◃ (3 ◃ (4 ◃ (5 ◃ (7 ◃ 𝜖)))) | 5 |
| (H13a) | 原文未命名 | Fact | (7 ◃ (1 ◃ (9 ◃ 𝜖))) ▹ 5 = 7 ◃ (1 ◃ (9 ◃ (5 ◃ 𝜖))) | 5 |
| (H13b) | 原文未命名 | Fact | (4 ◃ (1 ◃ 𝜖)) ⌢ (8 ◃ (5 ◃ (2 ◃ 𝜖))) = 4 ◃ (1 ◃ (8 ◃ (5 ◃ (2 ◃ 𝜖)))) | 5 |
| 未编号 · 00099d | ∧₆-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ (u ⇒ p ∧ (q ∧ (r ∧ (s ∧ (t ∧ u))))))))) | 8 |
| 未编号 · 00bbcc | Less than successor | Theorem | a < suc a | 4 |
| 未编号 · 0102c0 | Identity of ≢ | Theorem | (p ≢ false) ≡ p | 8 |
| 未编号 · 02c33b | Zero is not successor | Theorem | 0 ≠ n + 1 | 1 |
| 未编号 · 02e97a | Symmetry of + | Theorem | (∀ m • (∀ n • m + n = n + m ) ) | 1 |
| 未编号 · 03c7aa | Associativity of + | Theorem | (a + b) + c = a + (b + c) | 4 |
| 未编号 · 042fcf | Predecessor | Theorem | pred n = n - 1 | 4 |
| 未编号 · 0440d9 | Equivalence enrichment | Theorem | (p ≡ q) ⇒ ((p ⇒ r) ⇒ (p ⇒ q ∧ r)) | 8 |
| 未编号 · 04a037 | Sortedness | Axiom | isSorted (k ◃ (m ◃ ns)) ≡ k ≤ m ∧ isSorted (m ◃ ns) | 5 |
| 未编号 · 04c190 | Right-identity of ↑；别名：Definition of ↑ for 0 | Axiom | m ↑ 0 = m | 2 |
| 未编号 · 053d26 | Snoc-induction over sequences | Axiom | P[xs ≔ 𝜖] ⇒ ((∀ xs : Seq  A ❙ P • (∀ x : A • P[xs ≔ xs ▹ x] ) ) ⇒ (∀ xs : Seq  A • P )) | 1 |
| 未编号 · 05e01d | Associativity of · | Theorem | (k · m) · n = k · (m · n) | 4 |
| 未编号 · 0656e9 | Definition of `map` for ▹ | Theorem | (map f) (xs ▹ x) = (map f) xs ▹ f x | 5 |
| 未编号 · 087b09 | Definition of `double` | Axiom | double n = 2 · n | 5 |
| 未编号 · 08e6b7 | Monotonicity of ∧ | Theorem | (p ⇒ p') ⇒ ((q ⇒ q') ⇒ (p ∧ q ⇒ p' ∧ q')) | 8 |
| 未编号 · 092d73 | Pair dummy splitting for ∏ | Theorem | (∏ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∏ x : t₁; y : t₂ ❙ R[p ≔ ⟨x, y⟩] • E[p ≔ ⟨x, y⟩] ) | 4 |
| 未编号 · 0a2238 | Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ (p ∨ r ⇒ q ∨ r) | 8 |
| 未编号 · 0a4bd6 | Positivity | Theorem | pos a ≡ a ≠ 0 ∧ ¬ pos (- a) | 2 |
| 未编号 · 0b9e6e | Distributivity of `suc` over ↓；别名：Definition of ↓ for `suc` | Axiom | suc m ↓ suc n = suc (m ↓ n) | 2 |
| 未编号 · 0c5cda | Symmetry of ↑ | Theorem | m ↑ n = n ↑ m | 2 |
| 未编号 · 0c7c25 | Transitivity；别名：Transitivity of > | Theorem | a > b ∧ b > c ⇒ a > c | 2 |
| 未编号 · 0cd245 | Weakening for ↑；别名：Strengthening for ↑ | Theorem | x ≤ x ↑ y | 2 |
| 未编号 · 0ce927 | Split off ∑-term from top of ≤-<-suc range | Theorem | m ≤ n ⇒ (∑ i : ℤ ❙ m ≤ i < n + 1 • E ) = (∑ i : ℤ ❙ m ≤ i < n • E ) + E[i ≔ n] | 1 |
| 未编号 · 0db673 | Pair dummy joining for ∑ | Theorem | (∑ x : t₁ • (∑ y : t₂ ❙ R • E ) ) = (∑ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 5 |
| 未编号 · 0f2ed1 | Contributing conjunct to ≡ | Theorem | (p ∧ q ≡ r) ∧ p ⇒ (q ≡ r) | 8 |
| 未编号 · 0f9cba | Definition of < in terms of `suc` and ≤ | Theorem | a < b ≡ suc a ≤ b | 4 |
| 未编号 · 115bc4 | Greater than zero implies successor | Theorem | 0 < n ⇒ n = suc pred n | 4 |
| 未编号 · 119736 | Triangle with new base | Axiom | triangleArea (suc n) = suc n + triangleArea n | 4 |
| 未编号 · 123557 | Alternative definition of `t1` | Fact | t1 = (｢ 2 ｣ ◿ 3 ◺ ｢ 5 ｣) ◿ 7 ◺ (◬ ◿ 10 ◺ ｢ 11 ｣) | 1 |
| 未编号 · 123d6e | At least successor | Theorem | a > b ≡ a ≥ b + 1 | 2 |
| 未编号 · 12cef0 | Monotonicity of -；别名：≤-Monotonicity of - | Theorem | a ≤ b ⇒ a - d ≤ b - d | 2 |
| 未编号 · 1448dd | Less than successor | Theorem | a < suc b ≡ a < b ∨ a = b | 4 |
| 未编号 · 147a53 | <-Isotonicity of `suc` | Axiom | suc a < suc b ≡ a < b | 4 |
| 未编号 · 14ca91 | Conditional cancellation of subtraction | Theorem | k ≤ m ⇒ (m - k) + k = m | 4 |
| 未编号 · 157179 | Anti-isotonicity of unary minus；别名：≤-Anti-isotonicity of unary minus | Theorem | a ≤ b ≡ - b ≤ - a | 2 |
| 未编号 · 15a04b | ≤-Monotonicity of + | Corollary | a ≤ b ∧ c ≤ d ⇒ a + c ≤ b + d | 4 |
| 未编号 · 15c06f | Transitivity of = | Theorem | e = f ∧ f = g ⇒ e = g | 8 |
| 未编号 · 15fcc4 | Subtracting maximum | Theorem | k - (m ↑ n) = k - m ↓ k - n | 4 |
| 未编号 · 163ce1 | ≤ via ↓；别名：At most via minimum | Theorem | m ≤ n ≡ m ↓ n = m | 2 |
| 未编号 · 16ec30 | Split off ∑-term from bottom of ≤-<-suc range | Theorem | m ≤ n ⇒ (∑ i : ℤ ❙ m ≤ i < n + 1 • E ) = (∑ i : ℤ ❙ m + 1 ≤ i < n + 1 • E ) + E[i ≔ m] | 1 |
| 未编号 · 175e98 | Split off ∑-term from bottom of ≤-< range | Theorem | m < n ⇒ (∑ i : ℤ ❙ m ≤ i < n • E ) = (∑ i : ℤ ❙ m + 1 ≤ i < n • E ) + E[i ≔ m] | 1 |
| 未编号 · 18588d | Distributivity of ↓ over ↑ | Theorem | k ↓ (m ↑ n) = (k ↓ m) ↑ (k ↓ n) | 2 |
| 未编号 · 191b3e | Zero is least element | Axiom | 0 ≤ a | 4 |
| 未编号 · 19df80 | Zero is not one | Theorem | 0 = 1 ≡ false | 4 |
| 未编号 · 1a94c2 | <-Anti-isotonicity of unary minus | Theorem | a < b ≡ - b < - a | 2 |
| 未编号 · 1c184f | Split off ∑-term from bottom of ≤-≤ range | Theorem | m ≤ n ⇒ (∑ i : ℤ ❙ m ≤ i ≤ n • E ) = (∑ i : ℤ ❙ m + 1 ≤ i ≤ n • E ) + E[i ≔ m] | 1 |
| 未编号 · 1e153f | Mirroring singleton trees | Theorem | ｢ x ｣ ˘ = ｢ x ｣ | 1 |
| 未编号 · 1e9614 | Zero of ↓ | Theorem | 0 ↓ n = 0 | 2 |
| 未编号 · 1f5c61 | ≤-Monotonicity of `pred` | Theorem | a ≤ b ⇒ pred a ≤ pred b | 4 |
| 未编号 · 2001b7 | Strengthening ⇒⁅⁆；别名：Strengthening the precondition、⇒_⇒⁅⁆ | Primitive inference rule | P₁ ⇒ P₂ , P₂ ⇒⁅ C ⁆ Q ⊦ P₁ ⇒⁅ C ⁆ Q | 2 |
| 未编号 · 21290d | Multiplying the successor | Theorem | m · suc n = m · n + m | 4 |
| 未编号 · 2186fb | Identity of ↑ | Theorem | 0 ↑ n = n | 2 |
| 未编号 · 22c029 | Split-off top | Theorem | m ≤ n ⇒ (m ≤ i < n + 1 ≡ m ≤ i < n ∨ i = n) | 2 |
| 未编号 · 231c87 | Least greater element；别名：Successor at most、Definition of < via successor and ≤ | Theorem | a < b ≡ a + 1 ≤ b | 5 |
| 未编号 · 23785d | Adding consequent to ∧ | Theorem | (p ⇒ q) ⇒ (p ∧ r ⇒ p ∧ (q ∧ r)) | 8 |
| 未编号 · 23fe3b | Predecessor of zero | Axiom | pred 0 = 0 | 4 |
| 未编号 · 240cc5 | Minimum with addition | Theorem | k ↓ k + n = k | 2 |
| 未编号 · 243af9 | Cancellation of `suc` | Axiom | suc m = suc n ≡ m = n | 4 |
| 未编号 · 24a375 | Definition of ≡ | Axiom | (p ≡ q) = (p = q) | 8 |
| 未编号 · 24abc7 | Definition of ◃ | Axiom | x ◃ 𝜖 = 𝜖 ▹ x | 1 |
| 未编号 · 25615d | Split off ∑-term from bottom of <-≤-suc range | Theorem | m ≤ n ⇒ (∑ i : ℤ ❙ m < i ≤ n + 1 • E ) = (∑ i : ℤ ❙ m + 1 < i ≤ n + 1 • E ) + E[i ≔ m + 1] | 1 |
| 未编号 · 25737b | Co-residual of ∨ | Theorem | q ⇒ x ∨ p ≡ ¬ p ∧ q ⇒ x | 8 |
| 未编号 · 25a975 | Super Small Triangle | Axiom | triangleArea 0 = 0 | 4 |
| 未编号 · 266568 | Generalised one-point rule for ∀ | Theorem | R[x ≔ e] ⇒ (∀ x ❙ R ∧ x = e • E ) = E[x ≔ e] | 8 |
| 未编号 · 267c2e | Pair dummy joining for ∀ | Theorem | (∀ x : t₁; y : t₂ ❙ R • E ) = (∀ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 8 |
| 未编号 · 28ac42 | ≤-Isotonicity of - | Theorem | a ≤ b ≡ a - d ≤ b - d | 2 |
| 未编号 · 2977f6 | Proof by contradiction | Theorem | ¬ p ⇒ false ≡ p | 8 |
| 未编号 · 2989a8 | ≤-Monotonicity of + | Theorem | a ≤ b ⇒ a + d ≤ b + d | 2 |
| 未编号 · 29a570 | ∧₅-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ p ∧ (q ∧ (r ∧ (s ∧ t))))))) | 16 |
| 未编号 · 29b28d | Absorption of ↓ by ↑ | Theorem | m ↑ (m ↓ n) = m | 2 |
| 未编号 · 2a12e7 | Split off <-≤-suc range at top | Corollary | m ≤ n ⇒ (m < i ≤ suc n ≡ m < i ≤ n ∨ i = suc n) | 4 |
| 未编号 · 2b72bc | Definition of ∧ | Lemma | (p ∧ q) = (p ≡ (q ≡ p ∨ q)) | 8 |
| 未编号 · 2b77ed | Successor greater；别名：Definition of ≥ via successor and > | Theorem | a + 1 > b ≡ a ≥ b | 5 |
| 未编号 · 2bdb6a | Mirror | Axiom | EmptyT ˘ = EmptyT | 1 |
| 未编号 · 2d46e5 | Boring disjoint range split for ∑ | Theorem | (R ∧ S ≡ false) ⇒ (∑ x ❙ R ∨ S • P ) = (∑ x ❙ R • P ) + (∑ x ❙ S • P ) | 5 |
| 未编号 · 2f6803 | Split off ∑-term from top of <-≤ range | Theorem | m < n ⇒ (∑ i : ℤ ❙ m < i ≤ n • E ) = (∑ i : ℤ ❙ m < i < n • E ) + E[i ≔ n] | 1 |
| 未编号 · 2f7ec4 | Empty tree height | Axiom | height  ◬ = 0 | 1 |
| 未编号 · 2fb1bf | Mirroring singleton trees | Theorem | singleton  x ˘ = singleton  x | 1 |
| 未编号 · 2fd619 | Empty tree height | Axiom | height  EmptyT = 0 | 1 |
| 未编号 · 303cfc | Complement of > | Theorem | a > b ≢ a ≤ b | 2 |
| 未编号 · 309d0d | One-point rule for ∀₂；别名：Two-point rule for ∀ | Theorem | (∀ x, y ❙ x = A ∧ y = B • P ) ≡ P[x, y ≔ A, B] | 8 |
| 未编号 · 30ad60 | Trichotomy — B | Theorem | ¬ (a < b ∧ (a = b ∧ a > b)) | 2 |
| 未编号 · 3160d4 | insert preserves membership | Theorem | m ∈ ns ⇒ m ∈ (insert k) ns | 5 |
| 未编号 · 31d3fa | Preserving conjunct after ⇒ | Theorem | p ∧ q ⇒ r ≡ p ∧ q ⇒ p ∧ r | 8 |
| 未编号 · 33c144 | Complement of > | Theorem | ¬ (a > b) ≡ a ≤ b | 4 |
| 未编号 · 33cf6d | Definition of ≥ | Axiom | a ≥ b ≡ b ≤ a | 4 |
| 未编号 · 351d59 | Addition is non-decreasing | Theorem | b ≤ a + b | 4 |
| 未编号 · 35a9f8 | <-Isotonicity of + | Theorem | b < c ≡ a + b < a + c | 4 |
| 未编号 · 35e920 | Split off <-≤ range at top | Theorem | m < n ⇒ (m < i ≤ n ≡ m < i < n ∨ i = n) | 1 |
| 未编号 · 36550b | Associativity of ↓ | Theorem | (k ↓ m) ↓ n = k ↓ (m ↓ n) | 2 |
| 未编号 · 3683b4 | <-Monotonicity of `pred` | Theorem | suc a < b ⇒ pred (suc a) < pred b | 4 |
| 未编号 · 37d49b | Distributivity of `map` over ⌢ | Theorem | (map f) (xs ⌢ ys) = (map f) xs ⌢ (map f) ys | 5 |
| 未编号 · 38133d | Body weakening for ∀；别名：Body strengthening for ∀ | Theorem | (∀ x ❙ R • P ) ⇒ (∀ x ❙ R • Q ⇒ P ) | 8 |
| 未编号 · 38cc7d | Split off ∑-term from top of ≤-≤ range | Theorem | m ≤ n ⇒ (∑ i : ℤ ❙ m ≤ i ≤ n • E ) = (∑ i : ℤ ❙ m ≤ i < n • E ) + E[i ≔ n] | 1 |
| 未编号 · 397724 | Weakening ⇒⁅⁆；别名：Weakening the postcondition、⇒⁅⁆_⇒ | Primitive inference rule | P ⇒⁅ C ⁆ Q₁ , Q₁ ⇒ Q₂ ⊦ P ⇒⁅ C ⁆ Q₂ | 2 |
| 未编号 · 3aa5d0 | Monotonicity of ⇒；别名：Right-monotonicity of ⇒ | Theorem | (p ⇒ q) ⇒ ((r ⇒ p) ⇒ (r ⇒ q)) | 8 |
| 未编号 · 3bc8d4 | Zero sum | Theorem | 0 = a + b ≡ 0 = a ∧ 0 = b | 4 |
| 未编号 · 3bfbc2 | Definition of `t1` | Axiom | t1 = ((Branch  (((Branch  (((Branch  EmptyT)  2)  EmptyT))  3)  (((Branch  EmptyT)  5)  EmptyT)))  7)  (((Branch  EmptyT)  10)  (((Branch  EmptyT)  11)  EmptyT)) | 1 |
| 未编号 · 3c3941 | Introducing fresh ∀ | Theorem | P ⇒ (∀ x ❙ R • P ) | 8 |
| 未编号 · 3ca479 | Positive implies non-zero | Theorem | pos a ⇒ a ≠ 0 | 2 |
| 未编号 · 3cdb84 | Pair dummy splitting for ∃ | Theorem | (∃ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∃ x : t₁; y : t₂ ❙ R[p ≔ ⟨x, y⟩] • E[p ≔ ⟨x, y⟩] ) | 8 |
| 未编号 · 3d1bd1 | Successor is non-decreasing | Theorem | a ≤ suc a | 4 |
| 未编号 · 3eb300 | Height of `t1` | Fact | height  t1 = 3 | 2 |
| 未编号 · 3fb235 | Monus exchange | Theorem | m + (n - m) = n + (m - n) | 4 |
| 未编号 · 42cf57 | Left-identity of · | Theorem | 1 · n = n | 4 |
| 未编号 · 4315c0 | Transitivity of < | Theorem | a < b ⇒ (b < c ⇒ a < c) | 4 |
| 未编号 · 4364d7 | Irreflexivity of > | Theorem | a = b ⇒ ¬ (a > b) | 2 |
| 未编号 · 438c2a | Only zero is less than one | Theorem | a < 1 ≡ a = 0 | 4 |
| 未编号 · 4394e6 | Induction over ℕ | Axiom | P[n ≔ 0] ⇒ ((∀ n : ℕ ❙ P • P[n ≔ n + 1] ) ⇒ (∀ n : ℕ • P )) | 1 |
| 未编号 · 43f5ee | Pair dummy splitting for ∏ | Theorem | (∏ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∏ a : t₁ • (∏ b : t₂ ❙ R[p ≔ ⟨a, b⟩] • E[p ≔ ⟨a, b⟩] ) ) | 4 |
| 未编号 · 44bb82 | Boring disjoint range split for ∀ | Theorem | (R ∧ S ≡ false) ⇒ ((∀ x ❙ R ∨ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P )) | 8 |
| 未编号 · 47596d | Left-identity of ↑；别名：Definition of ↑ for 0 | Axiom | 0 ↑ n = n | 2 |
| 未编号 · 475b6e | Definition of ◃ | Axiom | x ◃ (xs ▹ y) = (x ◃ xs) ▹ y | 1 |
| 未编号 · 478166 | Right-distributivity of ⇒ over ∧₃ | Theorem | p ⇒ q ∧ (r ∧ s) ≡ (p ⇒ q) ∧ ((p ⇒ r) ∧ (p ⇒ s)) | 8 |
| 未编号 · 48118f | Split off ≤-≤ range at top | Theorem | m ≤ n ⇒ (m ≤ i ≤ n ≡ m ≤ i < n ∨ i = n) | 1 |
| 未编号 · 4881c6 | Definition of < in term of ≤ and `pred` | Theorem | suc a < b ≡ suc a ≤ pred b | 4 |
| 未编号 · 4a1e98 | Boring disjoint range split for ∏ | Theorem | (R ∧ S ≡ false) ⇒ (∏ x ❙ R ∨ S • P ) = (∏ x ❙ R • P ) · (∏ x ❙ S • P ) | 4 |
| 未编号 · 4a62c3 | Irreflexivity of < | Theorem | ¬ (a < b ∧ a = b) | 2 |
| 未编号 · 4aaf6e | Tree induction | Axiom | P[t ≔ ◬] ∧ (∀ l : Tree  A; r : Tree  A; x : A • P[t ≔ l] ∧ P[t ≔ r] ⇒ P[t ≔ l ◿ x ◺ r] ) ⇒ (∀ t : Tree  A • P ) | 1 |
| 未编号 · 4adf37 | <-Monotonicity of + | Theorem | a < b ∧ c < d ⇒ a + c < b + d | 2 |
| 未编号 · 4b60c2 | ≤-Isotonicity of + | Theorem | a ≤ b ≡ a + d ≤ b + d | 2 |
| 未编号 · 4c14b2 | Trichotomy — ∨ | Theorem | a < b ∨ (a = b ∨ a > b) | 5 |
| 未编号 · 4c677f | Identity of · | Theorem | 1 · m = m | 4 |
| 未编号 · 4d059f | 𝜖 is sorted | Axiom | isSorted 𝜖 | 5 |
| 未编号 · 4d0f55 | Definition of + | Axiom | 0 + n = n | 1 |
| 未编号 · 4e9496 | Reflexivity of ≤ | Theorem | a ≤ a | 4 |
| 未编号 · 515cec | <-Monotonicity of + | Theorem | b < c ⇒ a + b < a + c | 4 |
| 未编号 · 525492 | Sequence cases | Corollary | xs = 𝜖 ∨ xs = head xs ◃ tail xs | 5 |
| 未编号 · 53a471 | Triangle Solution | Theorem | 2 · triangleArea n = n · suc n | 4 |
| 未编号 · 54e64f | insert after ◃ | Axiom | k > m ⇒ (insert k) (m ◃ ns) = m ◃ (insert k) ns | 5 |
| 未编号 · 55608a | Split off ≤-≤ range at bottom | Theorem | m ≤ n ⇒ (m ≤ i ≤ n ≡ i = m ∨ suc m ≤ i ≤ n) | 4 |
| 未编号 · 56906f | Converse of ≤ | Theorem | a ≥ b ≡ b ≤ a | 2 |
| 未编号 · 56ec04 | Identity of + | Theorem | 0 + a = a | 4 |
| 未编号 · 577081 | Pair dummy joining for ∃ | Theorem | (∃ x : t₁; y : t₂ ❙ R • E ) = (∃ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 8 |
| 未编号 · 5a04f6 | ≤-Monotonicity of · | Theorem | b ≤ c ⇒ a · b ≤ a · c | 4 |
| 未编号 · 5aae8c | Definition of ≠ | Theorem | x ≠ y ≡ (x = y ≡ false) | 8 |
| 未编号 · 5c98a9 | Irreflexivity of > | Theorem | a > b ⇒ ¬ (a = b) | 2 |
| 未编号 · 5cb6cb | Pair dummy joining for ∃ | Theorem | (∃ x : t₁ • (∃ y : t₂ ❙ R • E ) ) = (∃ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 8 |
| 未编号 · 5e420e | Maximum with subtraction | Theorem | k - n ↑ k = k | 2 |
| 未编号 · 5ef251 | Subtracting minimum | Theorem | k - (m ↓ n) = k - m ↑ k - n | 2 |
| 未编号 · 5f6c2d | Symmetry of ≠ | Theorem | x ≠ y ≡ y ≠ x | 8 |
| 未编号 · 6127a3 | Mirror | Axiom | ◬ ˘ = ◬ | 1 |
| 未编号 · 617d8f | Zero is not one | Theorem | 0 ≠ 1 | 4 |
| 未编号 · 620131 | Distributivity of `suc` over ↑；别名：Definition of ↑ for `suc` | Axiom | suc m ↑ suc n = suc (m ↑ n) | 2 |
| 未编号 · 635d6b | Irreflexivity of < | Theorem | a < b ⇒ ¬ (a = b) | 6 |
| 未编号 · 642a29 | Split off <-≤ range at bottom | Theorem | m < n ⇒ (m < i ≤ n ≡ m + 1 < i ≤ n ∨ i = m + 1) | 1 |
| 未编号 · 648d61 | Assignment | Axiom | P[x ≔ E] ⇒⁅ (x := E) ⁆ P | 2 |
| 未编号 · 65abc8 | Split off ≤-<-suc range at top | Theorem | m ≤ n ⇒ (m ≤ i < n + 1 ≡ m ≤ i < n ∨ i = n) | 5 |
| 未编号 · 662e98 | Split off <-≤-suc range at bottom | Corollary | m ≤ n ⇒ (m < i ≤ suc n ≡ suc m < i ≤ suc n ∨ i = suc m) | 4 |
| 未编号 · 667d5b | Shifting `suc` over + | Theorem | suc m + n = m + suc n | 4 |
| 未编号 · 67761d | Least greater element | Theorem | a < b ≡ a + 1 ≤ b | 2 |
| 未编号 · 679f57 | Converse of < | Axiom | a > b ≡ b < a | 4 |
| 未编号 · 680791 | Split off <-≤-suc range at bottom | Theorem | m ≤ n ⇒ (m < i ≤ n + 1 ≡ m + 1 < i ≤ n + 1 ∨ i = m + 1) | 5 |
| 未编号 · 686663 | Irreflexivity of < | Corollary | a < b ⇒ a ≠ b | 4 |
| 未编号 · 68f8b8 | Definition of · for `suc`；别名：Definition of · | Axiom | suc m · n = n + m · n | 4 |
| 未编号 · 69579f | Symmetry of ↓ | Theorem | m ↓ n = n ↓ m | 2 |
| 未编号 · 69866c | Predecessor of successor | Axiom | pred (suc n) = n | 4 |
| 未编号 · 6e6534 | While | Primitive inference rule | B ∧ Q ⇒⁅ C ⁆ Q ⊦ Q ⇒⁅ while B do C od ⁆ ¬ B ∧ Q | 2 |
| 未编号 · 6f6725 | Empty range | Theorem | suc a ≤ b ≤ a ≡ false | 4 |
| 未编号 · 702635 | Subtraction from multiplication with successor | Theorem | m · suc n - m = m · n | 4 |
| 未编号 · 70f478 | ∧-Introduction | Theorem | p ⇒ (q ⇒ p ∧ q) | 8 |
| 未编号 · 71e2a4 | insert into 𝜖 | Axiom | (insert k) 𝜖 = k ◃ 𝜖 | 5 |
| 未编号 · 7247e9 | Zero is not successor | Axiom | 0 = n + 1 ≡ false | 1 |
| 未编号 · 7640dd | Cancellation of · | Theorem | c ≠ 0 ⇒ (c · a = c · b ≡ a = b) | 4 |
| 未编号 · 767b3e | insert preserves sortedness | Theorem | isSorted ns ⇒ isSorted ((insert k) ns) | 5 |
| 未编号 · 771122 | ∧₄-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ p ∧ (q ∧ (r ∧ s))))) | 8 |
| 未编号 · 77332f | Generalised one-point rule for ∑ | Theorem | R[x ≔ e] ⇒ (∑ x ❙ R ∧ x = e • E ) = E[x ≔ e] | 5 |
| 未编号 · 786c2e | Right-identity of + (v1) | Theorem | (∀ m : ℕ • m + 0 = m ) | 1 |
| 未编号 · 78d2c4 | Irreflexivity of > | Theorem | ¬ (a > b ∧ a = b) | 2 |
| 未编号 · 7907b0 | Less than successor | Theorem | a < b + 1 ≡ a ≤ b | 2 |
| 未编号 · 79adc5 | Right-zero of · | Theorem | m · 0 = 0 | 4 |
| 未编号 · 79d90c | Left-monotonicity of ∨；别名：Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ (p ∨ r ⇒ q ∨ r) | 8 |
| 未编号 · 79e5c6 | Cancellation of + | Theorem | k + m = k + n ≡ m = n | 4 |
| 未编号 · 7ba011 | Branch height | Axiom | height  (l ◿ x ◺ r) = suc (height  l ↑ height  r) | 1 |
| 未编号 · 7d8ebb | Distributivity of · over subtraction | Theorem | k · (m - n) = k · m - k · n | 4 |
| 未编号 · 7df813 | ≤-Monotonicity of + | Theorem | a ≤ b ⇒ (c ≤ d ⇒ a + c ≤ b + d) | 4 |
| 未编号 · 7fb685 | Singleton tree height | Lemma | height  (singleton  x) = 1 | 1 |
| 未编号 · 80d993 | Cancellation of multiplication with successor | Theorem | suc c · a = suc c · b ≡ a = b | 4 |
| 未编号 · 825cc6 | Split-off ≤-<-suc range at bottom | Theorem | m ≤ n ⇒ (m ≤ i < n + 1 ≡ m + 1 ≤ i < n + 1 ∨ i = m) | 4 |
| 未编号 · 831dfd | Split off ≤-≤ range at bottom | Theorem | m ≤ n ⇒ (m ≤ i ≤ n ≡ i = m ∨ m + 1 ≤ i ≤ n) | 1 |
| 未编号 · 833547 | Subtraction of zero from successor | Axiom | suc m - 0 = suc m | 4 |
| 未编号 · 8654fd | Definition of ≤ in terms of < | Theorem | a ≤ b ≡ a < b ∨ a = b | 4 |
| 未编号 · 86a35c | Abbreviated replacement in ∧；别名：Abbreviated replacement | Theorem | P ∧ x = E ≡ P[x ≔ E] ∧ x = E | 8 |
| 未编号 · 874365 | Empty range <_< | Theorem | a < b < a ≡ false | 5 |
| 未编号 · 87be40 | Pair dummy splitting for ∑ | Theorem | (∑ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∑ a : t₁ • (∑ b : t₂ ❙ R[p ≔ ⟨a, b⟩] • E[p ≔ ⟨a, b⟩] ) ) | 5 |
| 未编号 · 886e8b | Definition of `t1` | Axiom | t1 = ((◬ ◿ 2 ◺ ◬) ◿ 3 ◺ (◬ ◿ 5 ◺ ◬)) ◿ 7 ◺ (◬ ◿ 10 ◺ (◬ ◿ 11 ◺ ◬)) | 1 |
| 未编号 · 8876d6 | Case shuffling | Theorem | (p ∨ q) ∧ (¬ p ∨ r) ≡ (p ∧ r) ∨ (¬ p ∧ q) | 8 |
| 未编号 · 88e9cd | Two-sided ≤-Monotonicity of +；别名：≤-Monotonicity of + | Theorem | a ≤ b ∧ c ≤ d ⇒ a + c ≤ b + d | 2 |
| 未编号 · 896ef9 | ≤-Isotonicity of + | Theorem | a + b ≤ a + c ≡ b ≤ c | 4 |
| 未编号 · 89a5cf | Irreflexivity of < | Corollary | ¬ (a < a) | 4 |
| 未编号 · 8aaaae | Equality of ▹；别名：Injectivity of ▹、Cancellation of ▹ | Axiom | xs ▹ x = ys ▹ y ≡ xs = ys ∧ x = y | 1 |
| 未编号 · 8b363f | Singleton tree | Axiom | singleton  x = ((Branch  EmptyT)  x)  EmptyT | 1 |
| 未编号 · 8c6666 | Snoc is not empty | Axiom | (∀ xs • (∀ x • xs ▹ x = 𝜖 ≡ false ) ) | 1 |
| 未编号 · 8c8ad4 | Self-cancellation of subtraction | Theorem | m - m = 0 | 4 |
| 未编号 · 8d2697 | Subtraction is non-increasing | Theorem | a - b ≤ a | 4 |
| 未编号 · 8d539f | Right-identity of + (v2) | Theorem | (∀ m : ℕ • m + 0 = m ) | 1 |
| 未编号 · 8e6a06 | Maximum with addition | Theorem | k ↑ k + n = k + n | 2 |
| 未编号 · 8f45e9 | Monotonicity of ·；别名：≤-Isotonicity of · | Theorem | 0 < d ⇒ (a ≤ b ≡ a · d ≤ b · d) | 2 |
| 未编号 · 90956c | ⇒-Introduction | Primitive inference rule | ( p ⊦ q ) ⊦ p ⇒ q | 8 |
| 未编号 · 9285e7 | <-≤-Transitivity；别名：Transitivity of < with ≤ | Theorem | k < m ≤ n ⇒ k < n | 4 |
| 未编号 · 94927a | Singleton tree height | Lemma | height  ｢ x ｣ = 1 | 1 |
| 未编号 · 94d527 | Weakening；别名：Strengthening | Theorem | (p ∨ q) ∧ r ⇒ p ∨ (q ∧ r) | 8 |
| 未编号 · 94f30a | ∧₇-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ (u ⇒ (v ⇒ p ∧ (q ∧ (r ∧ (s ∧ (t ∧ (u ∧ v))))))))))) | 8 |
| 未编号 · 957cfc | Sequence | Primitive inference rule | P ⇒⁅ C₁ ⁆ Q , Q ⇒⁅ C₂ ⁆ R ⊦ P ⇒⁅ (C₁ ⍮ C₂) ⁆ R | 2 |
| 未编号 · 95e67e | Successor is not at most zero | Axiom | suc a ≤ 0 ≡ false | 4 |
| 未编号 · 97f231 | Cons is not empty | Corollary | x ◃ xs = 𝜖 ≡ false | 5 |
| 未编号 · 98ac7b | Definition of +；别名：Left-identity of +、Definition of + for 0 | Axiom | 0 + n = n | 4 |
| 未编号 · 9941d0 | ∧₃-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ p ∧ (q ∧ r))) | 8 |
| 未编号 · 9afd85 | Zero product | Theorem | 0 = a · b ≡ 0 = a ∨ 0 = b | 4 |
| 未编号 · 9b24b5 | ≤ cases | Theorem | a ≤ b ≡ a = b ∨ suc a ≤ b | 4 |
| 未编号 · 9cb45b | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 8 |
| 未编号 · 9cd73a | Definition of ≠ | Axiom | x ≠ y ≡ ¬ (x = y) | 8 |
| 未编号 · 9dff39 | <-Monotonicity of + | Theorem | a < b ⇒ a + d < b + d | 2 |
| 未编号 · 9e9e3d | Pair dummy joining for ∏ | Theorem | (∏ x : t₁ • (∏ y : t₂ ❙ R • E ) ) = (∏ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 4 |
| 未编号 · 9eb4a8 | Body weakening for ∀；别名：Body strengthening for ∀ | Theorem | (∀ x ❙ R • P ) ⇒ (∀ x ❙ R • P ∨ Q ) | 8 |
| 未编号 · a132b2 | Split off ≤-<-suc range at top | Corollary | m ≤ n ⇒ (m ≤ i < suc n ≡ m ≤ i < n ∨ i = n) | 4 |
| 未编号 · a13a80 | Split off <-≤-suc range at top | Theorem | m ≤ n ⇒ (m < i ≤ n + 1 ≡ m < i ≤ n ∨ i = n + 1) | 5 |
| 未编号 · a2a32a | Disjunction as implication | Lemma | p ∨ q ≡ ¬ p ⇒ q | 8 |
| 未编号 · a31008 | Pair dummy splitting for ∀ | Theorem | (∀ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∀ x : t₁; y : t₂ ❙ R[p ≔ ⟨x, y⟩] • E[p ≔ ⟨x, y⟩] ) | 8 |
| 未编号 · a34a19 | Definition of +；别名：Addition of successor、Definition of + for `suc` | Axiom | suc m + n = suc (m + n) | 4 |
| 未编号 · a4cf4d | Idempotency of ↓ | Theorem | n ↓ n = n | 2 |
| 未编号 · a56b54 | Fresh ∀ | Theorem | P ≡ (∀ x • P ) | 8 |
| 未编号 · a67f50 | Definition of · for 0；别名：Definition of ·、Left-zero of · | Axiom | 0 · n = 0 | 4 |
| 未编号 · a7321a | Predecessor is non-increasing | Theorem | pred a ≤ a | 4 |
| 未编号 · a7f85c | Definition of `head` | Axiom | head (x ◃ xs) = x | 5 |
| 未编号 · a8733b | Pair dummy joining for ∀ | Theorem | (∀ x : t₁ • (∀ y : t₂ ❙ R • E ) ) = (∀ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 8 |
| 未编号 · a967ba | Irreflexivity of < | Theorem | ¬ (a < a) | 2 |
| 未编号 · a9a77a | Minimum with subtraction | Theorem | k ↓ k - n = k - n | 2 |
| 未编号 · a9ba81 | Irreflexivity of < | Theorem | a = b ⇒ ¬ (a < b) | 2 |
| 未编号 · aa1bee | Pair dummy joining for ∑ | Theorem | (∑ x : t₁; y : t₂ ❙ R • E ) = (∑ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 5 |
| 未编号 · ad4220 | Snoc is not empty | Corollary | xs ▹ x = 𝜖 ≡ false | 5 |
| 未编号 · ad7fe9 | Generalised one-point rule for ∃ | Theorem | R[x ≔ e] ⇒ (∃ x ❙ R ∧ x = e • E ) = E[x ≔ e] | 8 |
| 未编号 · adbb13 | Split-off bottom | Theorem | m ≤ n ⇒ (m ≤ i < n + 1 ≡ m + 1 ≤ i < n + 1 ∨ i = m) | 2 |
| 未编号 · afc42a | Predecessor of non-zero | Theorem | n ≠ 0 ⇒ suc pred n = n | 4 |
| 未编号 · b02619 | Trichotomy；别名：Trichotomy — ∨ | Theorem | a < b ∨ (a = b ∨ a > b) | 2 |
| 未编号 · b103d7 | Right-distributivity of ⇒ over ∧₄ | Theorem | p ⇒ q ∧ (r ∧ (s ∧ t)) ≡ (p ⇒ q) ∧ ((p ⇒ r) ∧ ((p ⇒ s) ∧ (p ⇒ t))) | 8 |
| 未编号 · b201e0 | Strict sequence cases | Theorem | xs = 𝜖 ≢ xs = head xs ◃ tail xs | 5 |
| 未编号 · b24ac7 | Right-identity of subtraction | Theorem | m - 0 = m | 4 |
| 未编号 · b24db9 | Alternative definition of `t1` | Fact | t1 = ((Branch  (((Branch  (singleton  2))  3)  (singleton  5)))  7)  (((Branch  EmptyT)  10)  (singleton  11)) | 1 |
| 未编号 · b27a0c | Empty range ≤_< | Theorem | a ≤ b < a ≡ false | 5 |
| 未编号 · b30260 | ≤-Isotonicity of `suc` | Axiom | suc a ≤ suc b ≡ a ≤ b | 4 |
| 未编号 · b77dec | Abbreviated replacement in ⇒；别名：Abbreviated replacement | Theorem | x = E ⇒ P ≡ x = E ⇒ P[x ≔ E] | 8 |
| 未编号 · b86f5e | Irreflexivity of > | Theorem | ¬ (a > a) | 2 |
| 未编号 · b8a06d | Exclusive or implies inclusive | Theorem | (p ≢ q) ⇒ p ∨ q | 8 |
| 未编号 · b8d351 | Split off ≤-≤ range at bottom | Theorem | m ≤ n ⇒ (m ≤ i ≤ n ≡ i = m ∨ m < i ≤ n) | 1 |
| 未编号 · b9254e | ≤ preserves non-zero | Theorem | a ≤ b ⇒ (a ≠ 0 ⇒ b ≠ 0) | 8 |
| 未编号 · b9d13e | Subtraction from zero | Axiom | 0 - n = 0 | 4 |
| 未编号 · b9ec30 | At most via maximum | Theorem | k ≤ n ⇒ k ↑ n = n | 2 |
| 未编号 · ba79d6 | Successor greater | Theorem | a + 1 > b ≡ a ≥ b | 2 |
| 未编号 · bab4cf | Definition of `tail` | Axiom | tail (x ◃ xs) = xs | 5 |
| 未编号 · bac8f9 | Right-identity of + | Theorem | m + 0 = m | 5 |
| 未编号 · bb17de | Less than successor；别名：Definition of ≤ via < and successor | Theorem | a < b + 1 ≡ a ≤ b | 5 |
| 未编号 · bb8c8b | Asymmetry of < | Theorem | a < b ⇒ ¬ (b < a) | 4 |
| 未编号 · bb97a0 | Negation of ≠ | Theorem | ¬ (x ≠ y) ≡ x = y | 8 |
| 未编号 · bbdeac | Self-inverse of tree mirror | Theorem | (∀ t : Tree  A • (t ˘) ˘ = t ) | 2 |
| 未编号 · bc2dc2 | Split off ∑-term from top of <-≤-suc range | Theorem | m ≤ n ⇒ (∑ i : ℤ ❙ m < i ≤ n + 1 • E ) = (∑ i : ℤ ❙ m < i ≤ n • E ) + E[i ≔ n + 1] | 1 |
| 未编号 · bdf087 | Antitonicity of ¬ | Theorem | (p ⇒ q) ⇒ (¬ q ⇒ ¬ p) | 8 |
| 未编号 · be1be4 | Pair dummy splitting for ∃ | Theorem | (∃ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∃ a : t₁ • (∃ b : t₂ ❙ R[p ≔ ⟨a, b⟩] • E[p ≔ ⟨a, b⟩] ) ) | 8 |
| 未编号 · be4928 | Definition of `map` for 𝜖 | Axiom | (map f) 𝜖 = 𝜖 | 5 |
| 未编号 · bea6de | Zero of · | Theorem | m · 0 = 0 | 4 |
| 未编号 · bf397f | Empty range <_< | Theorem | a < b < a ⇒ false | 5 |
| 未编号 · bf49ff | ≤-Antitonicity of - | Theorem | b ≤ c ⇒ a - c ≤ a - b | 4 |
| 未编号 · bf62e0 | Antitonicity of unary minus；别名：≤-Antitonicity of unary minus | Theorem | a ≤ b ⇒ - b ≤ - a | 2 |
| 未编号 · c0390b | Distributivity of ⇒ over ∀ | Theorem | P ⇒ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ⇒ Q ) | 8 |
| 未编号 · c04c76 | Definition of + | Axiom | (m + 1) + n = (m + n) + 1 | 1 |
| 未编号 · c0e057 | Leibniz for ∀ body | Theorem | (∀ x • P₁ ≡ P₂ ) ⇒ ((∀ x ❙ R • P₁ ) ≡ (∀ x ❙ R • P₂ )) | 8 |
| 未编号 · c11d51 | <-Monotonicity of + | Theorem | a < b ⇒ (c < d ⇒ a + c < b + d) | 2 |
| 未编号 · c28972 | Nothing is less than zero | Axiom | a < 0 ≡ false | 4 |
| 未编号 · c4eac8 | Range weakening for ∀；别名：Range strengthening for ∀ | Theorem | (∀ x ❙ Q • P ) ⇒ (∀ x ❙ Q ∧ R • P ) | 8 |
| 未编号 · c506fd | Leibniz for ∀ body | Theorem | (∀ x ❙ R • P₁ ≡ P₂ ) ⇒ ((∀ x ❙ R • P₁ ) ≡ (∀ x ❙ R • P₂ )) | 8 |
| 未编号 · c54066 | Irreflexivity of < | Theorem | a < a ≡ false | 4 |
| 未编号 · c5d450 | Complement of < | Theorem | ¬ (a < b) ≡ a ≥ b | 4 |
| 未编号 · c6e548 | Singletons are sorted | Axiom | isSorted (k ◃ 𝜖) | 5 |
| 未编号 · c72004 | Split off ∑-term from top of _<-suc range | Theorem | (∑ i : ℕ ❙ i < suc n • E ) = (∑ i : ℕ ❙ i < n • E ) + E[i ≔ n] | 4 |
| 未编号 · c772da | Pair dummy splitting for ∑ | Theorem | (∑ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∑ x : t₁; y : t₂ ❙ R[p ≔ ⟨x, y⟩] • E[p ≔ ⟨x, y⟩] ) | 5 |
| 未编号 · c793cd | Empty range <_≤ | Theorem | a < b ≤ a ≡ false | 5 |
| 未编号 · c81239 | insert before ◃ | Axiom | k ≤ m ⇒ (insert k) (m ◃ ns) = k ◃ (m ◃ ns) | 5 |
| 未编号 · c8301e | Simple body-monotonicity of ∀ | Theorem | (∀ x • P ⇒ Q ) ⇒ ((∀ x ❙ R • P ) ⇒ (∀ x ❙ R • Q )) | 8 |
| 未编号 · c850cc | Absorption of ↑ by ↓ | Theorem | m ↓ (m ↑ n) = m | 2 |
| 未编号 · c8e678 | <-Antitonicity of unary minus | Theorem | a < b ⇒ - b < - a | 2 |
| 未编号 · ca6a4d | Cons is not empty | Theorem | (∀ xs • (∀ x • x ◃ xs = 𝜖 ≡ false ) ) | 1 |
| 未编号 · cac6ec | Positivity of 1 | Corollary | pos 1 | 2 |
| 未编号 · cb0d24 | Weakening for ↓；别名：Strengthening for ↓ | Theorem | x ↓ y ≤ x | 2 |
| 未编号 · cbd6b0 | Zero is not product of successors | Lemma | suc a · suc b = 0 ≡ false | 4 |
| 未编号 · cc3374 | Antisymmetry of ≤ | Theorem | a ≤ b ⇒ (b ≤ a ⇒ a = b) | 10 |
| 未编号 · cc8feb | Trichotomy — A | Theorem | a < b ≡ (a = b ≡ a > b) | 2 |
| 未编号 · cd3ffc | Inclusion of < in ≤ | Theorem | a < b ⇒ a ≤ b | 4 |
| 未编号 · cd7d15 | Adding the successor | Theorem | m + suc n = suc (m + n) | 4 |
| 未编号 · cdba4a | Asymmetry of < | Theorem | ¬ (a < b ∧ b < a) | 2 |
| 未编号 · ce5ae3 | Residual of ∧ | Theorem | x ∧ p ⇒ q ≡ x ⇒ (p ⇒ q) | 8 |
| 未编号 · cee7e6 | Split-off ≤-<-suc range at bottom | Corollary | m ≤ n ⇒ (m ≤ i < suc n ≡ suc m ≤ i < suc n ∨ i = m) | 4 |
| 未编号 · cf483e | Right-identity of + (v0) | Theorem | (∀ m : ℕ • m + 0 = m ) | 1 |
| 未编号 · d14899 | Subtraction of successor from successor | Axiom | suc m - suc n = m - n | 4 |
| 未编号 · d18f46 | Definition of ≤ in terms of `suc` and < | Theorem | a ≤ b ≡ a < suc b | 4 |
| 未编号 · d19257 | Non-empty-sequence decomposition | Theorem | xs ≠ 𝜖 ⇒ xs = head xs ◃ tail xs | 5 |
| 未编号 · d2a822 | Left-zero of ↓；别名：Definition of ↓ for 0 | Axiom | 0 ↓ n = 0 | 2 |
| 未编号 · d2c2dc | Distributivity of · over + | Theorem | k · (m + n) = k · m + k · n | 4 |
| 未编号 · d33fa5 | Mirror | Axiom | ((Branch  l)  x)  r ˘ = ((Branch  (r ˘))  x)  (l ˘) | 1 |
| 未编号 · d43091 | Shifting successor over + | Theorem | (∀ m • (∀ n • (m + 1) + n = m + (n + 1) ) ) | 1 |
| 未编号 · d46e7c | Zero is unique least element | Theorem | a ≤ 0 ≡ a = 0 | 4 |
| 未编号 · d4f7e7 | Mirror | Axiom | (l ◿ x ◺ r) ˘ = r ˘ ◿ x ◺ l ˘ | 1 |
| 未编号 · d5bcf4 | Generalised one-point rule for ∏ | Theorem | R[x ≔ e] ⇒ (∏ x ❙ R ∧ x = e • E ) = E[x ≔ e] | 4 |
| 未编号 · d64a69 | Zero is not successor | Theorem | 0 ≠ suc n | 4 |
| 未编号 · d67a9f | Subtraction after addition | Theorem | (m + n) - n = m | 4 |
| 未编号 · d74161 | Greater zero via ≠ | Theorem | 0 < n ≡ n ≠ 0 | 4 |
| 未编号 · d80818 | At least successor；别名：Definition of > via ≥ and successor | Theorem | a > b ≡ a ≥ b + 1 | 5 |
| 未编号 · d8b322 | Indirect irreflexivity of < | Theorem | a = b ⇒ (a < b ≡ false) | 4 |
| 未编号 · da39d1 | Height of mirrored tree | Theorem | (∀ t : Tree  A • height  (t ˘) = height  t ) | 2 |
| 未编号 · db781a | Definition of `map` for ◃ | Axiom | (map f) (x ◃ xs) = f x ◃ (map f) xs | 5 |
| 未编号 · dc6849 | Adding equations | Theorem | a₁ = b₁ ∧ a₂ = b₂ ⇒ a₁ + a₂ = b₁ + b₂ | 4 |
| 未编号 · dce9b2 | Distributivity of + over ↑ | Theorem | k + (m ↑ n) = k + m ↑ k + n | 2 |
| 未编号 · dd496d | Zero is <-least element | Theorem | 0 < a ∨ 0 = a | 4 |
| 未编号 · dd8beb | Singleton tree | Axiom | ｢ x ｣ = ◬ ◿ x ◺ ◬ | 1 |
| 未编号 · de8a1e | Antitonicity of -；别名：≤-Antitonicity of - | Theorem | c ≤ b ⇒ a - b ≤ a - c | 2 |
| 未编号 · e18e5f | Irreflexivity of ≠ | Theorem | x ≠ x ≡ false | 8 |
| 未编号 · e1f012 | Zero is not successor | Axiom | 0 = suc n ≡ false | 4 |
| 未编号 · e2dbad | One-point rule for ∀₂² | Theorem | (∀ x, y ❙ y = B ∧ R • P ) ≡ (∀ x ❙ R[y ≔ B] • P[y ≔ B] ) | 8 |
| 未编号 · e364a1 | Antitonicity of ⇒；别名：Left-antitonicity of ⇒ | Theorem | (p ⇒ q) ⇒ ((q ⇒ r) ⇒ (p ⇒ r)) | 8 |
| 未编号 · e44908 | Successor | Theorem | suc n = n + 1 | 4 |
| 未编号 · e4ace3 | Zero or successor of predecessor | Theorem | n = 0 ∨ n = suc pred n | 4 |
| 未编号 · e5bad3 | Least positive | Axiom | pos a ≡ 1 ≤ a | 3 |
| 未编号 · e76f05 | Indirect irreflexivity of < | Corollary | a = b ⇒ ¬ (a < b) | 4 |
| 未编号 · e81b8f | Subtraction of sum | Theorem | k - (m + n) = (k - m) - n | 4 |
| 未编号 · e85030 | Idempotency of ↑ | Theorem | n ↑ n = n | 2 |
| 未编号 · e887d4 | Non-zero multiplication | Theorem | a ≠ 0 ⇒ (b ≠ 0 ⇒ a · b ≠ 0) | 14 |
| 未编号 · e9fe3f | Definition of 1 | Theorem | 1 = suc 0 | 4 |
| 未编号 · eaa9f3 | Membership in `insert` | Theorem | m ∈ (insert k) ns ≡ m = k ∨ m ∈ ns | 5 |
| 未编号 · eb923d | Boring disjoint range split for ∃ | Theorem | (R ∧ S ≡ false) ⇒ ((∃ x ❙ R ∨ S • P ) ≡ (∃ x ❙ R • P ) ∨ (∃ x ❙ S • P )) | 8 |
| 未编号 · ebd499 | Split off ∑-term from top of _≤-suc range | Theorem | (∑ i ❙ i ≤ suc n • E ) = (∑ i ❙ i ≤ n • E ) + E[i ≔ suc n] | 4 |
| 未编号 · ec42a2 | Greater than zero means successor | Theorem | 0 < n ≡ n = suc pred n | 4 |
| 未编号 · ec8ec7 | Split off ≤-<-suc range at bottom | Theorem | m ≤ n ⇒ (m ≤ i < n + 1 ≡ m + 1 ≤ i < n + 1 ∨ i = m) | 1 |
| 未编号 · ed759b | Monotonicity of ↓ | Theorem | k ≤ m ⇒ k ↓ n ≤ m ↓ n | 2 |
| 未编号 · ef0d0c | Zero is less than successor | Axiom | 0 < suc a | 4 |
| 未编号 · ef374b | Symmetry of · | Theorem | m · n = n · m | 4 |
| 未编号 · ef8cd6 | Assignment | Derived inference rule | Φ ≡ Ψ[x ≔ E] ⊦ Φ ⇒⁅ (x := E) ⁆ Ψ | 2 |
| 未编号 · efb2f4 | Symmetry of + | Theorem | m + n = n + m | 4 |
| 未编号 · f05a12 | Split off ∑-term from bottom of <-≤ range | Theorem | m < n ⇒ (∑ i : ℤ ❙ m < i ≤ n • E ) = (∑ i : ℤ ❙ m + 1 < i ≤ n • E ) + E[i ≔ m + 1] | 1 |
| 未编号 · f1d779 | Cancellation of ¬ | Theorem | (¬ p ≡ ¬ q) = (p ≡ q) | 8 |
| 未编号 · f226ab | Transitivity of ≤ | Theorem | a ≤ b ⇒ (b ≤ c ⇒ a ≤ c) | 6 |
| 未编号 · f245f4 | One-point rule for ∀₂¹ | Theorem | (∀ x, y ❙ x = A ∧ R • P ) ≡ (∀ y ❙ R • P )[x ≔ A] | 8 |
| 未编号 · f2bb9d | ≤-<-Transitivity；别名：Transitivity of ≤ with < | Lemma | a ≤ b ∧ b < c ⇒ a < c | 4 |
| 未编号 · f46207 | Pair dummy joining for ∏ | Theorem | (∏ x : t₁; y : t₂ ❙ R • E ) = (∏ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 4 |
| 未编号 · f4948f | Case shuffling | Theorem | (p ⇒ q) ∧ (¬ p ⇒ r) ≡ (p ∧ q) ∨ (¬ p ∧ r) | 8 |
| 未编号 · f55b13 | Nothing is less than zero | Corollary | ¬ (a < 0) | 4 |
| 未编号 · f651fd | Converse of < | Theorem | a > b ≡ b < a | 2 |
| 未编号 · f695b0 | Associativity of ⍮ | Axiom | ((S₁ ⍮ S₂) ⍮ S₃) = (S₁ ⍮ (S₂ ⍮ S₃)) | 2 |
| 未编号 · f6c4f5 | Cancellation of subtraction by addition | Theorem | m ≤ n ≡ (n - m) + m = n | 4 |
| 未编号 · f8a195 | Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ ((r ⇒ s) ⇒ (p ∨ r ⇒ q ∨ s)) | 16 |
| 未编号 · f93139 | Irreflexivity of ≠ | Theorem | ¬ (x ≠ x) | 8 |
| 未编号 · fa5564 | Cancellation of unary minus | Theorem | - a = - b ≡ a = b | 2 |
| 未编号 · fa81de | Branch height | Axiom | height  (((Branch  l)  x)  r) = suc (height  l ↑ height  r) | 1 |
| 未编号 · fb0aea | Right-zero of ↓；别名：Definition of ↓ for 0 | Axiom | m ↓ 0 = 0 | 2 |
| 未编号 · fb7322 | Split off ≤-< range at bottom | Theorem | m < n ⇒ (m ≤ i < n ≡ m + 1 ≤ i < n ∨ i = m) | 1 |
| 未编号 · fbdca6 | Split off ∑-term from top of ≤-<-suc range | Theorem | m ≤ n ⇒ (∑ i ❙ m ≤ i < suc n • E ) = (∑ i ❙ m ≤ i < n • E ) + E[i ≔ n] | 4 |
| 未编号 · fbf6ed | ≤-Monotonicity of - | Theorem | a ≤ b ⇒ a - c ≤ b - c | 4 |
| 未编号 · fd3294 | Associativity of ↑ | Theorem | (k ↑ m) ↑ n = k ↑ (m ↑ n) | 2 |
| 未编号 · fd7261 | Anti-isotonicity of -；别名：≤-Anti-isotonicity of - | Theorem | c ≤ b ≡ a - b ≤ a - c | 2 |
| 未编号 · fdb8c0 | Pair dummy splitting for ∀ | Theorem | (∀ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∀ a : t₁ • (∀ b : t₂ ❙ R[p ≔ ⟨a, b⟩] • E[p ≔ ⟨a, b⟩] ) ) | 8 |
| 未编号 · fe9fa0 | Complement of < | Theorem | a < b ≢ a ≥ b | 7 |
| 未编号 · fef379 | Tree induction | Axiom | P[t ≔ EmptyT] ∧ (∀ l : Tree  A; r : Tree  A; x : A • P[t ≔ l] ∧ P[t ≔ r] ⇒ P[t ≔ ((Branch  l)  x)  r] ) ⇒ (∀ t : Tree  A • P ) | 1 |

## 2025 · Week 10

对应 notebook：[2025i Exercise 10.2: Bags · 预载列表](http://130.113.68.214:15088/), [HW20 · CalcCheck preloaded theorem list](http://130.113.68.214:15087/)

| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |
|---|---|---|---|---:|
| (1.2) | Reflexivity of = | Axiom | x = x | 2 |
| (1.3) | Symmetry of = | Axiom | (x = y) = (y = x) | 2 |
| (1.4) | Transitivity of = | Derived inference rule | X = Y , Y = Z ⊦ X = Z | 2 |
| (1.5) | Leibniz | Derived inference rule | X = Y ⊦ E[z ≔ X] = E[z ≔ Y] | 2 |
| (11.4) | Bag extensionality | Axiom | B = C ≡ (∀ e • e # B = e # C ) | 1 |
| (11.79) | Bag membership | Axiom | F ⋿ ⟅ x ❙ R • E ⟆ ≡ (∃ x ❙ R • F = E ) | 1 |
| (11.79) | Bag membership | Axiom | F ⋿ ⟅ x, y ❙ R • E ⟆ ≡ (∃ x, y ❙ R • F = E ) | 1 |
| (11.80) | Bag comprehension size | Axiom | # ⟅ x ❙ R • E ⟆ = (∑ x ❙ R • 1 ) | 1 |
| (11.80) | Bag comprehension size | Axiom | # ⟅ x, y ❙ R • E ⟆ = (∑ x, y ❙ R • 1 ) | 1 |
| (11.81) | Bag occurrences | Axiom | a # ⟅ x : t; y : u ❙ R • E ⟆ = (∑ x : t; y : u ❙ R ∧ a = E • 1 ) | 1 |
| (11.81) | Bag occurrences | Axiom | a # ⟅ x : t ❙ R • E ⟆ = (∑ x : t ❙ R ∧ a = E • 1 ) | 1 |
| (11.83) | Subbag；别名：Definition of ⊆、Bag inclusion | Axiom | B ⊆ C ≡ (∀ e • e # B ≤ e # C ) | 1 |
| (3.1) | Associativity of ≡ | Axiom | ((p ≡ q) ≡ r) ≡ (p ≡ (q ≡ r)) | 2 |
| (3.10) | Definition of ≢ | Axiom | (p ≢ q) ≡ ¬ (p ≡ q) | 2 |
| (3.11) | ¬ connection | Theorem | ¬ p ≡ (q ≡ (p ≡ ¬ q)) | 2 |
| (3.12) | Double negation | Theorem | ¬ (¬ p) ≡ p | 2 |
| (3.13) | Negation of `false` | Theorem | ¬ false ≡ true | 2 |
| (3.14) | 原文未命名 | Theorem | (p ≢ q) ≡ (¬ p ≡ q) | 2 |
| (3.15) | Definition of ¬ from ≡ | Theorem | ¬ p ≡ (p ≡ false) | 2 |
| (3.16) | Symmetry of ≢ | Theorem | (p ≢ q) ≡ (q ≢ p) | 2 |
| (3.17) | Associativity of ≢ | Theorem | ((p ≢ q) ≢ r) ≡ (p ≢ (q ≢ r)) | 2 |
| (3.18) | Mutual associativity of ≡ with ≢ | Theorem | ((p ≢ q) ≡ r) ≡ (p ≢ (q ≡ r)) | 2 |
| (3.19) | Mutual interchangeability of ≡ with ≢ | Theorem | (p ≢ (q ≡ r)) ≡ (p ≡ (q ≢ r)) | 2 |
| (3.2) | Symmetry of ≡ | Axiom | (p ≡ q) ≡ (q ≡ p) | 2 |
| (3.24) | Symmetry of ∨ | Axiom | p ∨ q ≡ q ∨ p | 2 |
| (3.25) | Associativity of ∨ | Axiom | (p ∨ q) ∨ r ≡ p ∨ (q ∨ r) | 2 |
| (3.26) | Idempotency of ∨ | Axiom | p ∨ p ≡ p | 2 |
| (3.27) | Distributivity of ∨ over ≡ | Axiom | p ∨ (q ≡ r) ≡ (p ∨ q ≡ p ∨ r) | 2 |
| (3.28) | Excluded middle；别名：LEM | Axiom | p ∨ ¬ p | 2 |
| (3.29) | Zero of ∨ | Theorem | p ∨ true ≡ true | 2 |
| (3.3) | Identity of ≡ | Axiom | true ≡ (q ≡ q) | 2 |
| (3.30) | Identity of ∨ | Theorem | p ∨ false ≡ p | 2 |
| (3.31) | Distributivity of ∨ over ∨ | Theorem | p ∨ (q ∨ r) ≡ (p ∨ q) ∨ (p ∨ r) | 2 |
| (3.32) | 原文未命名 | Theorem | p ∨ q ≡ (p ∨ ¬ q ≡ p) | 2 |
| (3.35) | Golden rule | Axiom | p ∧ q ≡ (p ≡ (q ≡ p ∨ q)) | 2 |
| (3.36) | Symmetry of ∧ | Theorem | p ∧ q ≡ q ∧ p | 2 |
| (3.37) | Associativity of ∧ | Theorem | (p ∧ q) ∧ r ≡ p ∧ (q ∧ r) | 2 |
| (3.38) | Idempotency of ∧ | Theorem | p ∧ p ≡ p | 2 |
| (3.39) | Identity of ∧ | Theorem | p ∧ true ≡ p | 2 |
| (3.4) | 原文未命名 | Theorem | true | 2 |
| (3.40) | Zero of ∧ | Theorem | p ∧ false ≡ false | 2 |
| (3.41) | Distributivity of ∧ over ∧ | Theorem | p ∧ (q ∧ r) ≡ (p ∧ q) ∧ (p ∧ r) | 2 |
| (3.42) | Contradiction | Theorem | p ∧ ¬ p ≡ false | 2 |
| (3.43a) | Absorption | Theorem | p ∧ (p ∨ q) ≡ p | 2 |
| (3.43b) | Absorption | Theorem | p ∨ (p ∧ q) ≡ p | 2 |
| (3.44a) | Absorption | Theorem | p ∧ (¬ p ∨ q) ≡ p ∧ q | 2 |
| (3.44b) | Absorption | Theorem | p ∨ (¬ p ∧ q) ≡ p ∨ q | 2 |
| (3.44c) | Absorption | Theorem | ¬ p ∧ (p ∨ q) ≡ ¬ p ∧ q | 2 |
| (3.44d) | Absorption | Theorem | ¬ p ∨ (p ∧ q) ≡ ¬ p ∨ q | 2 |
| (3.45) | Distributivity of ∨ over ∧ | Theorem | p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r) | 2 |
| (3.46) | Distributivity of ∧ over ∨ | Theorem | p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r) | 2 |
| (3.47a) | De Morgan | Theorem | ¬ (p ∧ q) ≡ ¬ p ∨ ¬ q | 2 |
| (3.47b) | De Morgan | Theorem | ¬ (p ∨ q) ≡ ¬ p ∧ ¬ q | 2 |
| (3.47c) | De Morgan | Theorem | ¬ (¬ p ∧ q) ≡ p ∨ ¬ q | 2 |
| (3.47d) | De Morgan | Theorem | ¬ (¬ p ∨ q) ≡ p ∧ ¬ q | 2 |
| (3.47e) | De Morgan dual of ∧ | Theorem | ¬ (¬ p ∧ ¬ q) ≡ p ∨ q | 2 |
| (3.47f) | De Morgan dual of ∨ | Theorem | ¬ (¬ p ∨ ¬ q) ≡ p ∧ q | 2 |
| (3.48) | 原文未命名 | Theorem | p ∧ q ≡ (p ∧ ¬ q ≡ ¬ p) | 2 |
| (3.49) | Semi-distributivity of ∧ over ≡ | Theorem | p ∧ (q ≡ r) ≡ (p ∧ q ≡ (p ∧ r ≡ p)) | 2 |
| (3.5) | Reflexivity of ≡ | Theorem | p ≡ p | 2 |
| (3.50) | Strong modus ponens for ≡ | Theorem | p ∧ (q ≡ p) ≡ p ∧ q | 2 |
| (3.51) | Replacement | Theorem | (p ≡ q) ∧ (r ≡ p) ≡ (p ≡ q) ∧ (r ≡ q) | 2 |
| (3.52) | Alternative definition of ≡ | Theorem | p ≡ (q ≡ (p ∧ q) ∨ (¬ p ∧ ¬ q)) | 2 |
| (3.53) | Exclusive or；别名：Alternative definition of ≢ | Theorem | (p ≢ q) ≡ (¬ p ∧ q) ∨ (p ∧ ¬ q) | 2 |
| (3.55) | 原文未命名 | Theorem | (p ∧ q) ∧ r ≡ (p ≡ (q ≡ (r ≡ (p ∨ q ≡ (q ∨ r ≡ (r ∨ p ≡ p ∨ (q ∨ r))))))) | 2 |
| (3.57) | Definition of ⇒ via ∨；别名：Definition of ⇒ from ∨、Definition of ⇒、Definition of implication | Axiom | p ⇒ q ≡ (p ∨ q ≡ q) | 2 |
| (3.57=) | Implication via ∨ | Lemma | (p ⇒ q) = (p ∨ q ≡ q) | 2 |
| (3.58) | Definition of ⇐；别名：Consequence | Axiom | p ⇐ q ≡ q ⇒ p | 2 |
| (3.59) | Material implication；别名：Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ ¬ p ∨ q | 2 |
| (3.60) | Definition of ⇒ via ∧；别名：Definition of ⇒ from ∧、Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ (p ∧ q ≡ p) | 2 |
| (3.60=) | Implication via ∧ | Lemma | (p ⇒ q) = (p ∧ q ≡ p) | 2 |
| (3.61) | Contrapositive | Theorem | p ⇒ q ≡ ¬ q ⇒ ¬ p | 2 |
| (3.61.1) | ¬-connection for ⇒ | Theorem | p ⇒ ¬ q ≡ q ⇒ ¬ p | 2 |
| (3.61.2) | ¬-connection for ⇒ | Theorem | ¬ p ⇒ q ≡ ¬ q ⇒ p | 2 |
| (3.62) | 原文未命名 | Theorem | p ⇒ (q ≡ r) ≡ (p ∧ q ≡ p ∧ r) | 2 |
| (3.63) | Distributivity of ⇒ over ≡ | Theorem | p ⇒ (q ≡ r) ≡ (p ⇒ q ≡ p ⇒ r) | 2 |
| (3.64) | Self-distributivity of ⇒ | Theorem | p ⇒ (q ⇒ r) ≡ (p ⇒ q) ⇒ (p ⇒ r) | 2 |
| (3.65) | Shunting | Theorem | p ∧ q ⇒ r ≡ p ⇒ (q ⇒ r) | 2 |
| (3.66) | Strong modus ponens | Theorem | p ∧ (p ⇒ q) ≡ p ∧ q | 2 |
| (3.67) | 原文未命名 | Theorem | p ∧ (q ⇒ p) ≡ p | 2 |
| (3.68) | 原文未命名 | Theorem | p ∨ (p ⇒ q) ≡ true | 2 |
| (3.69) | 原文未命名 | Theorem | p ∨ (q ⇒ p) ≡ q ⇒ p | 2 |
| (3.70) | 原文未命名 | Theorem | p ∨ q ⇒ p ∧ q ≡ (p ≡ q) | 2 |
| (3.71) | Reflexivity of ⇒ | Theorem | p ⇒ p | 2 |
| (3.72) | Right-zero of ⇒；别名：ex quodlibet verum | Theorem | p ⇒ true | 2 |
| (3.73) | Left-identity of ⇒ | Theorem | true ⇒ p ≡ p | 2 |
| (3.74) | Definition of ¬ from ⇒ | Theorem | p ⇒ false ≡ ¬ p | 2 |
| (3.75) | ex falso quodlibet | Theorem | false ⇒ p | 2 |
| (3.76a) | Weakening；别名：Strengthening | Theorem | p ⇒ p ∨ q | 2 |
| (3.76b) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p | 2 |
| (3.76c) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∨ q | 2 |
| (3.76d) | Weakening；别名：Strengthening | Theorem | p ∨ (q ∧ r) ⇒ p ∨ q | 2 |
| (3.76e) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∧ (q ∨ r) | 2 |
| (3.77) | Modus ponens | Theorem | p ∧ (p ⇒ q) ⇒ q | 2 |
| (3.78) | Case analysis | Theorem | (p ⇒ r) ∧ (q ⇒ r) ≡ p ∨ q ⇒ r | 2 |
| (3.79) | Case analysis | Theorem | (p ⇒ r) ∧ (¬ p ⇒ r) ≡ r | 2 |
| (3.8) | Definition of `false` | Axiom | false ≡ ¬ true | 2 |
| (3.80) | Mutual implication | Theorem | (p ⇒ q) ∧ (q ⇒ p) ≡ (p ≡ q) | 2 |
| (3.80.1) | Reflexivity of ⇒ wrt. ≡；别名：Reflexivity of ⇒ | Theorem | (p ≡ q) ⇒ (p ⇒ q) | 2 |
| (3.81) | Antisymmetry of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ p) ⇒ (p ≡ q) | 2 |
| (3.82.4) | Implication strengthening | Theorem | p ⇒ q ≡ p ⇒ p ∧ q | 2 |
| (3.82.5) | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 2 |
| (3.82a) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 2 |
| (3.82b) | Transitivity of ⇒ | Theorem | (p ≡ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 2 |
| (3.82c) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ≡ r) ⇒ (p ⇒ r) | 2 |
| (3.83) | Leibniz | Axiom | e = f ⇒ E[z ≔ e] = E[z ≔ f] | 2 |
| (3.83.1) | Leibniz | Corollary | d = e ⇒ f d = f e | 2 |
| (3.83.2) | Leibniz | Corollary | d = e ⇒ (p d ≡ p e) | 2 |
| (3.83.3) | Leibniz | Corollary | (d ≡ e) ⇒ (p d ≡ p e) | 2 |
| (3.83.4) | Leibniz | Corollary | (d ≡ e) ⇒ f d = f e | 2 |
| (3.84a) | Replacement | Theorem | e = f ∧ E[z ≔ e] ≡ e = f ∧ E[z ≔ f] | 2 |
| (3.84a≡) | Replacement | Theorem | (e ≡ f) ∧ E[z ≔ e] ≡ (e ≡ f) ∧ E[z ≔ f] | 2 |
| (3.84b) | Replacement | Theorem | e = f ⇒ E[z ≔ e] ≡ e = f ⇒ E[z ≔ f] | 2 |
| (3.84b≡) | Replacement | Theorem | (e ≡ f) ⇒ E[z ≔ e] ≡ (e ≡ f) ⇒ E[z ≔ f] | 2 |
| (3.84c) | Replacement | Theorem | q ∧ (e ≡ f) ⇒ E[z ≔ e] ≡ q ∧ (e ≡ f) ⇒ E[z ≔ f] | 2 |
| (3.84c) | Replacement | Theorem | q ∧ e = f ⇒ E[z ≔ e] ≡ q ∧ e = f ⇒ E[z ≔ f] | 2 |
| (3.85a) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] ≡ p ⇒ E[z ≔ true] | 2 |
| (3.85b) | Replace by `true` | Theorem | q ∧ p ⇒ E[z ≔ p] ≡ q ∧ p ⇒ E[z ≔ true] | 2 |
| (3.85c) | Replace by `false` | Theorem | ¬ p ⇒ E[z ≔ p] ≡ ¬ p ⇒ E[z ≔ false] | 2 |
| (3.85d) | Replace by `false` | Theorem | q ∧ ¬ p ⇒ E[z ≔ p] ≡ q ∧ ¬ p ⇒ E[z ≔ false] | 2 |
| (3.85e) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] = E[z ≔ true] | 2 |
| (3.86a) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ≡ E[z ≔ false] ⇒ p | 2 |
| (3.86b) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ∨ q ≡ E[z ≔ false] ⇒ p ∨ q | 2 |
| (3.87) | Replace by `true` | Theorem | p ∧ E[z ≔ p] ≡ p ∧ E[z ≔ true] | 2 |
| (3.87.1) | Abbreviated replace by `false` | Theorem | ¬ p ∧ E ≡ ¬ p ∧ E[p ≔ false] | 2 |
| (3.87.1) | Abbreviated replace by `true` | Theorem | p ∧ E ≡ p ∧ E[p ≔ true] | 2 |
| (3.88) | Replace by `false` | Theorem | p ∨ E[z ≔ p] ≡ p ∨ E[z ≔ false] | 2 |
| (3.89) | Shannon | Theorem | E[z ≔ p] ≡ (p ∧ E[z ≔ true]) ∨ (¬ p ∧ E[z ≔ false]) | 2 |
| (3.9) | Commutativity of ¬ with ≡ | Axiom | ¬ (p ≡ q) ≡ (¬ p ≡ q) | 2 |
| (4.3) | Left-monotonicity of ∧；别名：Monotonicity of ∧ | Theorem | (p ⇒ q) ⇒ (p ∧ r ⇒ q ∧ r) | 2 |
| (8.11) | Substitution into ∀ | Axiom | (∀ y ❙ R • P )[x ≔ F] ≡ (∀ y ❙ R[x ≔ F] • P[x ≔ F] ) | 2 |
| (8.11) | Substitution into ∃ | Axiom | (∃ y ❙ R • P )[x ≔ F] ≡ (∃ y ❙ R[x ≔ F] • P[x ≔ F] ) | 2 |
| (8.11) | Substitution into ∏ | Axiom | (∏ y ❙ R • P )[x ≔ F] = (∏ y ❙ R[x ≔ F] • P[x ≔ F] ) | 1 |
| (8.11) | Substitution into ∑ | Axiom | (∑ y ❙ R • P )[x ≔ F] = (∑ y ❙ R[x ≔ F] • P[x ≔ F] ) | 2 |
| (8.12.1) | Leibniz for ∀ range | Axiom | (∀ x • R₁ ≡ R₂ ) ⇒ ((∀ x ❙ R₁ • P ) ≡ (∀ x ❙ R₂ • P )) | 2 |
| (8.12.1) | Leibniz for ∃ range | Axiom | (∀ x • R₁ ≡ R₂ ) ⇒ ((∃ x ❙ R₁ • P ) ≡ (∃ x ❙ R₂ • P )) | 2 |
| (8.12.1) | Leibniz for ∏ range | Axiom | (∀ x • R₁ ≡ R₂ ) ⇒ (∏ x ❙ R₁ • P ) = (∏ x ❙ R₂ • P ) | 1 |
| (8.12.1) | Leibniz for ∑ range | Axiom | (∀ x • R₁ ≡ R₂ ) ⇒ (∑ x ❙ R₁ • P ) = (∑ x ❙ R₂ • P ) | 2 |
| (8.12.1₂) | Leibniz for ∀₂ range | Axiom | (∀ x, y • R₁ ≡ R₂ ) ⇒ ((∀ x, y ❙ R₁ • P ) ≡ (∀ x, y ❙ R₂ • P )) | 2 |
| (8.12.1₂) | Leibniz for ∃₂ range | Axiom | (∀ x, y • R₁ ≡ R₂ ) ⇒ ((∃ x, y ❙ R₁ • P ) ≡ (∃ x, y ❙ R₂ • P )) | 2 |
| (8.12.1₂) | Leibniz for ∏₂ range | Axiom | (∀ x, y • R₁ ≡ R₂ ) ⇒ (∏ x, y ❙ R₁ • P ) = (∏ x, y ❙ R₂ • P ) | 1 |
| (8.12.1₂) | Leibniz for ∑₂ range | Axiom | (∀ x, y • R₁ ≡ R₂ ) ⇒ (∑ x, y ❙ R₁ • P ) = (∑ x, y ❙ R₂ • P ) | 2 |
| (8.12.1₃) | Leibniz for ∀₃ range | Axiom | (∀ x, y, z • R₁ ≡ R₂ ) ⇒ ((∀ x, y, z ❙ R₁ • P ) ≡ (∀ x, y, z ❙ R₂ • P )) | 2 |
| (8.12.1₃) | Leibniz for ∃₃ range | Axiom | (∀ x, y, z • R₁ ≡ R₂ ) ⇒ ((∃ x, y, z ❙ R₁ • P ) ≡ (∃ x, y, z ❙ R₂ • P )) | 2 |
| (8.12.1₃) | Leibniz for ∏₃ range | Axiom | (∀ x, y, z • R₁ ≡ R₂ ) ⇒ (∏ x, y, z ❙ R₁ • P ) = (∏ x, y, z ❙ R₂ • P ) | 1 |
| (8.12.1₃) | Leibniz for ∑₃ range | Axiom | (∀ x, y, z • R₁ ≡ R₂ ) ⇒ (∑ x, y, z ❙ R₁ • P ) = (∑ x, y, z ❙ R₂ • P ) | 2 |
| (8.12.2) | Leibniz for ∀ body | Axiom | (∀ x • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∀ x ❙ R • P₁ ) ≡ (∀ x ❙ R • P₂ )) | 2 |
| (8.12.2) | Leibniz for ∃ body | Corollary | (∀ x ❙ R • P₁ ≡ P₂ ) ⇒ ((∃ x ❙ R • P₁ ) ≡ (∃ x ❙ R • P₂ )) | 2 |
| (8.12.2) | Leibniz for ∃ body | Axiom | (∀ x • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∃ x ❙ R • P₁ ) ≡ (∃ x ❙ R • P₂ )) | 2 |
| (8.12.2) | Leibniz for ∏ body | Axiom | (∀ x • R ⇒ P₁ = P₂ ) ⇒ (∏ x ❙ R • P₁ ) = (∏ x ❙ R • P₂ ) | 1 |
| (8.12.2) | Leibniz for ∏ body | Corollary | (∀ x ❙ R • E₁ = E₂ ) ⇒ (∏ x ❙ R • E₁ ) = (∏ x ❙ R • E₂ ) | 1 |
| (8.12.2) | Leibniz for ∑ body | Corollary | (∀ x ❙ R • E₁ = E₂ ) ⇒ (∑ x ❙ R • E₁ ) = (∑ x ❙ R • E₂ ) | 2 |
| (8.12.2) | Leibniz for ∑ body | Axiom | (∀ x • R ⇒ P₁ = P₂ ) ⇒ (∑ x ❙ R • P₁ ) = (∑ x ❙ R • P₂ ) | 2 |
| (8.12.2₂) | Leibniz for ∀₂ body | Axiom | (∀ x, y • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∀ x, y ❙ R • P₁ ) ≡ (∀ x, y ❙ R • P₂ )) | 2 |
| (8.12.2₂) | Leibniz for ∃₂ body | Axiom | (∀ x, y • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∃ x, y ❙ R • P₁ ) ≡ (∃ x, y ❙ R • P₂ )) | 2 |
| (8.12.2₂) | Leibniz for ∏₂ body | Axiom | (∀ x, y • R ⇒ P₁ = P₂ ) ⇒ (∏ x, y ❙ R • P₁ ) = (∏ x, y ❙ R • P₂ ) | 1 |
| (8.12.2₂) | Leibniz for ∑₂ body | Axiom | (∀ x, y • R ⇒ P₁ = P₂ ) ⇒ (∑ x, y ❙ R • P₁ ) = (∑ x, y ❙ R • P₂ ) | 2 |
| (8.12.2₃) | Leibniz for ∀₃ body | Axiom | (∀ x, y, z • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∀ x, y, z ❙ R • P₁ ) ≡ (∀ x, y, z ❙ R • P₂ )) | 2 |
| (8.12.2₃) | Leibniz for ∃₃ body | Axiom | (∀ x, y, z • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∃ x, y, z ❙ R • P₁ ) ≡ (∃ x, y, z ❙ R • P₂ )) | 2 |
| (8.12.2₃) | Leibniz for ∏₃ body | Axiom | (∀ x, y, z • R ⇒ P₁ = P₂ ) ⇒ (∏ x, y, z ❙ R • P₁ ) = (∏ x, y, z ❙ R • P₂ ) | 1 |
| (8.12.2₃) | Leibniz for ∑₃ body | Axiom | (∀ x, y, z • R ⇒ P₁ = P₂ ) ⇒ (∑ x, y, z ❙ R • P₁ ) = (∑ x, y, z ❙ R • P₂ ) | 2 |
| (8.13) | Empty range for ∀ | Axiom | (∀ x ❙ false • P ) ≡ true | 2 |
| (8.13) | Empty range for ∃ | Axiom | (∃ x ❙ false • P ) ≡ false | 2 |
| (8.13) | Empty range for ∏ | Axiom | (∏ x ❙ false • P ) = 1 | 1 |
| (8.13) | Empty range for ∑ | Axiom | (∑ x ❙ false • P ) = 0 | 2 |
| (8.14) | One-point rule for ∀ | Axiom | (∀ x ❙ x = E • P ) ≡ P[x ≔ E] | 2 |
| (8.14) | One-point rule for ∃ | Axiom | (∃ x ❙ x = E • P ) ≡ P[x ≔ E] | 2 |
| (8.14) | One-point rule for ∏ | Axiom | (∏ x ❙ x = E • P ) = P[x ≔ E] | 1 |
| (8.14) | One-point rule for ∑ | Axiom | (∑ x ❙ x = E • P ) = P[x ≔ E] | 2 |
| (8.15) | Distributivity of ∀ over ∧ | Axiom | (∀ x ❙ R • P ) ∧ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∧ Q ) | 2 |
| (8.15) | Distributivity of ∃ over ∨ | Axiom | (∃ x ❙ R • P ) ∨ (∃ x ❙ R • Q ) ≡ (∃ x ❙ R • P ∨ Q ) | 2 |
| (8.15) | Distributivity of ∏ quantification over `_·_` | Axiom | (∏ x ❙ R • P ) · (∏ x ❙ R • Q ) = (∏ x ❙ R • P · Q ) | 1 |
| (8.15) | Distributivity of ∑ quantification over `_+_` | Axiom | (∑ x ❙ R • P ) + (∑ x ❙ R • Q ) = (∑ x ❙ R • P + Q ) | 2 |
| (8.16) | Disjoint range split for ∀ | Theorem | (∀ x • R ∧ S ≡ false ) ⇒ ((∀ x ❙ R ∨ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P )) | 2 |
| (8.16) | Disjoint range split for ∃ | Theorem | (∀ x • R ∧ S ≡ false ) ⇒ ((∃ x ❙ R ∨ S • P ) ≡ (∃ x ❙ R • P ) ∨ (∃ x ❙ S • P )) | 2 |
| (8.16) | Disjoint range split for ∏ | Theorem | (∀ x • R ∧ S ≡ false ) ⇒ (∏ x ❙ R ∨ S • P ) = (∏ x ❙ R • P ) · (∏ x ❙ S • P ) | 1 |
| (8.16) | Disjoint range split for ∑ | Theorem | (∀ x • R ∧ S ≡ false ) ⇒ (∑ x ❙ R ∨ S • P ) = (∑ x ❙ R • P ) + (∑ x ❙ S • P ) | 2 |
| (8.16.1) | Alternative range split for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x ❙ R ∧ S • P ) ∧ (∀ x ❙ R ∧ ¬ S • P ) | 2 |
| (8.16.1) | Alternative range split for ∃ | Theorem | (∃ x ❙ R • P ) ≡ (∃ x ❙ R ∧ S • P ) ∨ (∃ x ❙ R ∧ ¬ S • P ) | 2 |
| (8.16.1) | Alternative range split for ∏ | Theorem | (∏ x ❙ R • P ) = (∏ x ❙ R ∧ S • P ) · (∏ x ❙ R ∧ ¬ S • P ) | 1 |
| (8.16.1) | Alternative range split for ∑ | Theorem | (∑ x ❙ R • P ) = (∑ x ❙ R ∧ S • P ) + (∑ x ❙ R ∧ ¬ S • P ) | 2 |
| (8.17) | General range split for ∀ | Axiom | (∀ x ❙ R ∨ S • P ) ∧ (∀ x ❙ R ∧ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P ) | 2 |
| (8.17) | General range split for ∃ | Axiom | (∃ x ❙ R ∨ S • P ) ∨ (∃ x ❙ R ∧ S • P ) ≡ (∃ x ❙ R • P ) ∨ (∃ x ❙ S • P ) | 2 |
| (8.17) | General range split for ∏ | Axiom | (∏ x ❙ R ∨ S • P ) · (∏ x ❙ R ∧ S • P ) = (∏ x ❙ R • P ) · (∏ x ❙ S • P ) | 1 |
| (8.17) | General range split for ∑ | Axiom | (∑ x ❙ R ∨ S • P ) + (∑ x ❙ R ∧ S • P ) = (∑ x ❙ R • P ) + (∑ x ❙ S • P ) | 2 |
| (8.18) | Range split for ∀ | Theorem | (∀ x ❙ R ∨ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P ) | 4 |
| (8.18) | Range split for ∀₂ | Theorem | (∀ x, y ❙ R ∨ S • P ) ≡ (∀ x, y ❙ R • P ) ∧ (∀ x, y ❙ S • P ) | 2 |
| (8.18) | Range split for ∃ | Theorem | (∃ x ❙ R ∨ S • P ) ≡ (∃ x ❙ R • P ) ∨ (∃ x ❙ S • P ) | 2 |
| (8.19) | Interchange of dummies for ∀ | Theorem | (∀ x ❙ R • (∀ y ❙ S • P ) ) ≡ (∀ y ❙ S • (∀ x ❙ R • P ) ) | 2 |
| (8.19) | Interchange of dummies for ∃ | Theorem | (∃ x ❙ R • (∃ y ❙ S • P ) ) ≡ (∃ y ❙ S • (∃ x ❙ R • P ) ) | 2 |
| (8.19) | Interchange of dummies for ∏ | Theorem | (∏ x ❙ R • (∏ y ❙ S • P ) ) = (∏ y ❙ S • (∏ x ❙ R • P ) ) | 1 |
| (8.19) | Interchange of dummies for ∑ | Theorem | (∑ x ❙ R • (∑ y ❙ S • P ) ) = (∑ y ❙ S • (∑ x ❙ R • P ) ) | 2 |
| (8.19.1) | Dummy list permutation for ∀ | Axiom | (∀ x, y ❙ R • P ) ≡ (∀ y, x ❙ R • P ) | 2 |
| (8.19.1) | Dummy list permutation for ∃ | Axiom | (∃ x, y ❙ R • P ) ≡ (∃ y, x ❙ R • P ) | 2 |
| (8.19.1) | Dummy list permutation for ∏ | Axiom | (∏ x, y ❙ R • P ) = (∏ y, x ❙ R • P ) | 1 |
| (8.19.1) | Dummy list permutation for ∑ | Axiom | (∑ x, y ❙ R • P ) = (∑ y, x ❙ R • P ) | 2 |
| (8.19.1) | Dummy list permutation₁+₂ for ∀ | Axiom | (∀ x, y, z ❙ R • P ) ≡ (∀ y, z, x ❙ R • P ) | 2 |
| (8.19.1) | Dummy list permutation₁+₂ for ∃ | Axiom | (∃ x, y, z ❙ R • P ) ≡ (∃ y, z, x ❙ R • P ) | 2 |
| (8.19.1) | Dummy list permutation₁+₂ for ∏ | Axiom | (∏ x, y, z ❙ R • P ) = (∏ y, z, x ❙ R • P ) | 1 |
| (8.19.1) | Dummy list permutation₁+₂ for ∑ | Axiom | (∑ x, y, z ❙ R • P ) = (∑ y, z, x ❙ R • P ) | 2 |
| (8.20) | Nesting for ∀ | Axiom | (∀ x, y ❙ R ∧ S • P ) ≡ (∀ x ❙ R • (∀ y ❙ S • P ) ) | 2 |
| (8.20) | Nesting for ∃ | Axiom | (∃ x, y ❙ R ∧ S • P ) ≡ (∃ x ❙ R • (∃ y ❙ S • P ) ) | 2 |
| (8.20) | Nesting for ∏ | Axiom | (∏ x, y ❙ R ∧ S • P ) = (∏ x ❙ R • (∏ y ❙ S • P ) ) | 1 |
| (8.20) | Nesting for ∑ | Axiom | (∑ x, y ❙ R ∧ S • P ) = (∑ x ❙ R • (∑ y ❙ S • P ) ) | 2 |
| (8.20) | Nesting₁+₂ for ∀ | Axiom | (∀ x, y, z ❙ R ∧ S • P ) ≡ (∀ x ❙ R • (∀ y, z ❙ S • P ) ) | 2 |
| (8.20) | Nesting₁+₂ for ∃ | Axiom | (∃ x, y, z ❙ R ∧ S • P ) ≡ (∃ x ❙ R • (∃ y, z ❙ S • P ) ) | 2 |
| (8.20) | Nesting₁+₂ for ∏ | Axiom | (∏ x, y, z ❙ R ∧ S • P ) = (∏ x ❙ R • (∏ y, z ❙ S • P ) ) | 1 |
| (8.20) | Nesting₁+₂ for ∑ | Axiom | (∑ x, y, z ❙ R ∧ S • P ) = (∑ x ❙ R • (∑ y, z ❙ S • P ) ) | 2 |
| (8.20) | Nesting₂+₁ for ∀ | Axiom | (∀ x, y, z ❙ R ∧ S • P ) ≡ (∀ x, y ❙ R • (∀ z ❙ S • P ) ) | 2 |
| (8.20) | Nesting₂+₁ for ∃ | Axiom | (∃ x, y, z ❙ R ∧ S • P ) ≡ (∃ x, y ❙ R • (∃ z ❙ S • P ) ) | 2 |
| (8.20) | Nesting₂+₁ for ∏ | Axiom | (∏ x, y, z ❙ R ∧ S • P ) = (∏ x, y ❙ R • (∏ z ❙ S • P ) ) | 1 |
| (8.20) | Nesting₂+₁ for ∑ | Axiom | (∑ x, y, z ❙ R ∧ S • P ) = (∑ x, y ❙ R • (∑ z ❙ S • P ) ) | 2 |
| (8.20.1) | Nesting for ∀ | Theorem | (∀ x, y ❙ S • P ) ≡ (∀ x • (∀ y ❙ S • P ) ) | 2 |
| (8.20.1) | Nesting for ∃ | Theorem | (∃ x, y ❙ S • P ) ≡ (∃ x • (∃ y ❙ S • P ) ) | 2 |
| (8.20.1) | Nesting for ∏ | Theorem | (∏ x, y ❙ S • P ) = (∏ x • (∏ y ❙ S • P ) ) | 1 |
| (8.20.1) | Nesting for ∑ | Theorem | (∑ x, y ❙ S • P ) = (∑ x • (∑ y ❙ S • P ) ) | 2 |
| (8.20.1) | Nesting₁+₂ for ∀ | Theorem | (∀ x, y, z ❙ S • P ) ≡ (∀ x • (∀ y, z ❙ S • P ) ) | 2 |
| (8.20.1) | Nesting₁+₂ for ∃ | Theorem | (∃ x, y, z ❙ S • P ) ≡ (∃ x • (∃ y, z ❙ S • P ) ) | 2 |
| (8.20.1) | Nesting₁+₂ for ∏ | Theorem | (∏ x, y, z ❙ S • P ) = (∏ x • (∏ y, z ❙ S • P ) ) | 1 |
| (8.20.1) | Nesting₁+₂ for ∑ | Theorem | (∑ x, y, z ❙ S • P ) = (∑ x • (∑ y, z ❙ S • P ) ) | 2 |
| (8.20.1) | Nesting₂+₁ for ∀ | Theorem | (∀ x, y, z ❙ S • P ) ≡ (∀ x, y • (∀ z ❙ S • P ) ) | 2 |
| (8.20.1) | Nesting₂+₁ for ∃ | Theorem | (∃ x, y, z ❙ S • P ) ≡ (∃ x, y • (∃ z ❙ S • P ) ) | 2 |
| (8.20.1) | Nesting₂+₁ for ∏ | Theorem | (∏ x, y, z ❙ S • P ) = (∏ x, y • (∏ z ❙ S • P ) ) | 1 |
| (8.20.1) | Nesting₂+₁ for ∑ | Theorem | (∑ x, y, z ❙ S • P ) = (∑ x, y • (∑ z ❙ S • P ) ) | 2 |
| (8.20.2) | Nesting for ∀ | Theorem | (∀ x, y ❙ R • P ) ≡ (∀ x ❙ R • (∀ y • P ) ) | 2 |
| (8.20.2) | Nesting for ∃ | Theorem | (∃ x, y ❙ R • P ) ≡ (∃ x ❙ R • (∃ y • P ) ) | 2 |
| (8.20.2) | Nesting for ∏ | Theorem | (∏ x, y ❙ R • P ) = (∏ x ❙ R • (∏ y • P ) ) | 1 |
| (8.20.2) | Nesting for ∑ | Theorem | (∑ x, y ❙ R • P ) = (∑ x ❙ R • (∑ y • P ) ) | 2 |
| (8.20.2) | Nesting₁+₂ for ∀ | Theorem | (∀ x, y, z ❙ R • P ) ≡ (∀ x ❙ R • (∀ y, z • P ) ) | 2 |
| (8.20.2) | Nesting₁+₂ for ∃ | Theorem | (∃ x, y, z ❙ R • P ) ≡ (∃ x ❙ R • (∃ y, z • P ) ) | 2 |
| (8.20.2) | Nesting₁+₂ for ∏ | Theorem | (∏ x, y, z ❙ R • P ) = (∏ x ❙ R • (∏ y, z • P ) ) | 1 |
| (8.20.2) | Nesting₁+₂ for ∑ | Theorem | (∑ x, y, z ❙ R • P ) = (∑ x ❙ R • (∑ y, z • P ) ) | 2 |
| (8.20.2) | Nesting₂+₁ for ∀ | Theorem | (∀ x, y, z ❙ R • P ) ≡ (∀ x, y ❙ R • (∀ z • P ) ) | 2 |
| (8.20.2) | Nesting₂+₁ for ∃ | Theorem | (∃ x, y, z ❙ R • P ) ≡ (∃ x, y ❙ R • (∃ z • P ) ) | 2 |
| (8.20.2) | Nesting₂+₁ for ∏ | Theorem | (∏ x, y, z ❙ R • P ) = (∏ x, y ❙ R • (∏ z • P ) ) | 1 |
| (8.20.2) | Nesting₂+₁ for ∑ | Theorem | (∑ x, y, z ❙ R • P ) = (∑ x, y ❙ R • (∑ z • P ) ) | 2 |
| (8.20.3) | Replacement in ∀ | Theorem | (∀ y ❙ R ∧ e = f • P[x ≔ e] ) ≡ (∀ y ❙ R ∧ e = f • P[x ≔ f] ) | 2 |
| (8.20.3) | Replacement in ∃ | Theorem | (∃ y ❙ R ∧ e = f • P[x ≔ e] ) ≡ (∃ y ❙ R ∧ e = f • P[x ≔ f] ) | 2 |
| (8.20.3) | Replacement in ∏ | Theorem | (∏ y ❙ R ∧ e = f • P[x ≔ e] ) = (∏ y ❙ R ∧ e = f • P[x ≔ f] ) | 1 |
| (8.20.3) | Replacement in ∑ | Theorem | (∑ y ❙ R ∧ e = f • P[x ≔ e] ) = (∑ y ❙ R ∧ e = f • P[x ≔ f] ) | 2 |
| (8.21) | Dummy renaming for ∀；别名：α-conversion | Theorem | (∀ x ❙ R • P ) ≡ (∀ y ❙ R[x ≔ y] • P[x ≔ y] ) | 2 |
| (8.21) | Dummy renaming for ∃；别名：α-conversion | Theorem | (∃ x ❙ R • P ) ≡ (∃ y ❙ R[x ≔ y] • P[x ≔ y] ) | 2 |
| (8.21) | Dummy renaming for ∏；别名：α-conversion | Theorem | (∏ x ❙ R • P ) = (∏ y ❙ R[x ≔ y] • P[x ≔ y] ) | 1 |
| (8.21) | Dummy renaming for ∑；别名：α-conversion | Theorem | (∑ x ❙ R • P ) = (∑ y ❙ R[x ≔ y] • P[x ≔ y] ) | 2 |
| (8.22) | Change of dummy in ∀ | Theorem | (∀ f • (∀ g • (∀ x • (∀ y • x = f y ≡ y = g x ) ) ⇒ ((∀ x ❙ R • P ) ≡ (∀ y ❙ R[x ≔ f y] • P[x ≔ f y] )) ) ) | 2 |
| (8.22) | Change of dummy in ∃ | Theorem | (∀ f • (∀ g • (∀ x • (∀ y • x = f y ≡ y = g x ) ) ⇒ ((∃ x ❙ R • P ) ≡ (∃ y ❙ R[x ≔ f y] • P[x ≔ f y] )) ) ) | 2 |
| (8.22) | Change of dummy in ∏ | Theorem | (∀ f • (∀ g • (∀ x • (∀ y • x = f y ≡ y = g x ) ) ⇒ (∏ x ❙ R • P ) = (∏ y ❙ R[x ≔ f y] • P[x ≔ f y] ) ) ) | 1 |
| (8.22) | Change of dummy in ∑ | Theorem | (∀ f • (∀ g • (∀ x • (∀ y • x = f y ≡ y = g x ) ) ⇒ (∑ x ❙ R • P ) = (∑ y ❙ R[x ≔ f y] • P[x ≔ f y] ) ) ) | 2 |
| (8.22.1) | Change of dummy in ∀ — variant | Theorem | (∀ x • (∀ y • x = f y ⇒ y = g x ) ) ⇒ ((∀ x ❙ R ∧ x = f (g x) • P ) ≡ (∀ y ❙ R[x ≔ f y] • P[x ≔ f y] )) | 2 |
| (8.22.1) | Change of dummy in ∃ — variant | Theorem | (∀ x • (∀ y • x = f y ⇒ y = g x ) ) ⇒ ((∃ x ❙ R ∧ x = f (g x) • P ) ≡ (∃ y ❙ R[x ≔ f y] • P[x ≔ f y] )) | 2 |
| (8.22.1) | Change of dummy in ∏ — variant | Theorem | (∀ x • (∀ y • x = f y ⇒ y = g x ) ) ⇒ (∏ x ❙ R ∧ x = f (g x) • P ) = (∏ y ❙ R[x ≔ f y] • P[x ≔ f y] ) | 1 |
| (8.22.1) | Change of dummy in ∑ — variant | Theorem | (∀ x • (∀ y • x = f y ⇒ y = g x ) ) ⇒ (∑ x ❙ R ∧ x = f (g x) • P ) = (∑ y ❙ R[x ≔ f y] • P[x ≔ f y] ) | 2 |
| (8.22.2) | Range replacement in nested ∀ | Lemma | (∀ x ❙ R • (∀ y • Q₁ ≡ Q₂ ) ) ⇒ ((∀ x ❙ R • (∀ y ❙ Q₁ • P ) ) ≡ (∀ x ❙ R • (∀ y ❙ Q₂ • P ) )) | 2 |
| (8.22.2) | Range replacement in nested ∃ | Lemma | (∀ x ❙ R • (∀ y • Q₁ ≡ Q₂ ) ) ⇒ ((∃ x ❙ R • (∃ y ❙ Q₁ • P ) ) ≡ (∃ x ❙ R • (∃ y ❙ Q₂ • P ) )) | 2 |
| (8.22.2) | Range replacement in nested ∏ | Lemma | (∀ x ❙ R • (∀ y • Q₁ ≡ Q₂ ) ) ⇒ (∏ x ❙ R • (∏ y ❙ Q₁ • P ) ) = (∏ x ❙ R • (∏ y ❙ Q₂ • P ) ) | 1 |
| (8.22.2) | Range replacement in nested ∑ | Lemma | (∀ x ❙ R • (∀ y • Q₁ ≡ Q₂ ) ) ⇒ (∑ x ❙ R • (∑ y ❙ Q₁ • P ) ) = (∑ x ❙ R • (∑ y ❙ Q₂ • P ) ) | 2 |
| (8.22.3) | Change of restricted dummy in ∀ | Theorem | (∀ f • (∀ g • (∀ x ❙ R • (∀ y • x = f y ≡ y = g x ) ) ⇒ ((∀ x ❙ R • P ) ≡ (∀ y ❙ R[x ≔ f y] • P[x ≔ f y] )) ) ) | 2 |
| (8.22.3) | Change of restricted dummy in ∃ | Theorem | (∀ f • (∀ g • (∀ x ❙ R • (∀ y • x = f y ≡ y = g x ) ) ⇒ ((∃ x ❙ R • P ) ≡ (∃ y ❙ R[x ≔ f y] • P[x ≔ f y] )) ) ) | 2 |
| (8.22.3) | Change of restricted dummy in ∏ | Theorem | (∀ f • (∀ g • (∀ x ❙ R • (∀ y • x = f y ≡ y = g x ) ) ⇒ (∏ x ❙ R • P ) = (∏ y ❙ R[x ≔ f y] • P[x ≔ f y] ) ) ) | 1 |
| (8.22.3) | Change of restricted dummy in ∑ | Theorem | (∀ f • (∀ g • (∀ x ❙ R • (∀ y • x = f y ≡ y = g x ) ) ⇒ (∑ x ❙ R • P ) = (∑ y ❙ R[x ≔ f y] • P[x ≔ f y] ) ) ) | 2 |
| (9.10) | Range weakening for ∀；别名：Range strengthening for ∀ | Theorem | (∀ x ❙ Q ∨ R • P ) ⇒ (∀ x ❙ Q • P ) | 2 |
| (9.11) | Body weakening for ∀；别名：Body strengthening for ∀ | Theorem | (∀ x ❙ R • P ∧ Q ) ⇒ (∀ x ❙ R • P ) | 2 |
| (9.12) | Monotonicity of ∀；别名：Body monotonicity of ∀ | Theorem | (∀ x ❙ R • Q ⇒ P ) ⇒ ((∀ x ❙ R • Q ) ⇒ (∀ x ❙ R • P )) | 2 |
| (9.12a) | Range antitonicity of ∀ | Theorem | (∀ x ❙ ¬ P • Q ⇒ R ) ⇒ ((∀ x ❙ R • P ) ⇒ (∀ x ❙ Q • P )) | 2 |
| (9.12a) | Range antitonicity of ∀ | Theorem | (∀ x • Q ⇒ R ) ⇒ ((∀ x ❙ R • P ) ⇒ (∀ x ❙ Q • P )) | 2 |
| (9.13) | Instantiation | Theorem | (∀ x • P ) ⇒ P[x ≔ E] | 2 |
| (9.13.1) | Instantiation | Theorem | (∀ x • P ) ⇒ P[x ≔ x] | 2 |
| (9.13.2) | Instantiation | Theorem | (∀ x ❙ R • P ) ⇒ (R ⇒ P)[x ≔ E] | 2 |
| (9.17) | Generalised De Morgan；别名：Definition of ∃ | Axiom | (∃ x ❙ R • P ) ≡ ¬ (∀ x ❙ R • ¬ P ) | 2 |
| (9.18a) | Generalised De Morgan | Theorem | ¬ (∃ x ❙ R • ¬ P ) ≡ (∀ x ❙ R • P ) | 2 |
| (9.18b) | Generalised De Morgan | Theorem | ¬ (∃ x ❙ R • P ) ≡ (∀ x ❙ R • ¬ P ) | 2 |
| (9.18c) | Generalised De Morgan | Theorem | (∃ x ❙ R • ¬ P ) ≡ ¬ (∀ x ❙ R • P ) | 2 |
| (9.19) | Trading for ∃ | Theorem | (∃ x ❙ R • P ) ≡ (∃ x • R ∧ P ) | 2 |
| (9.2) | Trading for ∀ | Axiom | (∀ x ❙ R • P ) ≡ (∀ x • R ⇒ P ) | 2 |
| (9.20) | Trading for ∃ | Theorem | (∃ x ❙ Q ∧ R • P ) ≡ (∃ x ❙ Q • R ∧ P ) | 2 |
| (9.21) | Distributivity of ∧ over ∃ | Theorem | P ∧ (∃ x ❙ R • Q ) ≡ (∃ x ❙ R • P ∧ Q ) | 2 |
| (9.22) | 原文未命名 | Theorem | P ∧ (∃ x • R ) ≡ (∃ x ❙ R • P ) | 2 |
| (9.22.1) | Distributivity of ∧ over ∀ | Theorem | (∃ x • R ) ⇒ (P ∧ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∧ Q )) | 2 |
| (9.23) | Distributivity of ∨ over ∃ | Theorem | (∃ x • R ) ⇒ (P ∨ (∃ x ❙ R • Q ) ≡ (∃ x ❙ R • P ∨ Q )) | 2 |
| (9.24) | False ∃ body | Theorem | (∃ x ❙ R • false ) ≡ false | 2 |
| (9.25) | Range weakening for ∃；别名：Range strengthening for ∃ | Theorem | (∃ x ❙ R • P ) ⇒ (∃ x ❙ Q ∨ R • P ) | 2 |
| (9.25.1) | Range weakening for ∃；别名：Range strengthening for ∃ | Theorem | (∃ x ❙ Q ∧ R • P ) ⇒ (∃ x ❙ R • P ) | 2 |
| (9.26) | Body weakening for ∃；别名：Body strengthening for ∃ | Theorem | (∃ x ❙ R • P ) ⇒ (∃ x ❙ R • P ∨ Q ) | 2 |
| (9.26.1) | Body weakening for ∃；别名：Body strengthening for ∃ | Theorem | (∃ x ❙ R • P ∧ Q ) ⇒ (∃ x ❙ R • P ) | 2 |
| (9.27) | Monotonicity of ∃；别名：Body monotonicity of ∃ | Theorem | (∀ x ❙ R • Q ⇒ P ) ⇒ ((∃ x ❙ R • Q ) ⇒ (∃ x ❙ R • P )) | 2 |
| (9.27.1) | Simple body-monotonicity of ∃ | Theorem | (∀ x • P ⇒ Q ) ⇒ ((∃ x ❙ R • P ) ⇒ (∃ x ❙ R • Q )) | 2 |
| (9.27.2) | Range monotonicity of ∃ | Theorem | (∀ x • Q ⇒ R ) ⇒ ((∃ x ❙ Q • P ) ⇒ (∃ x ❙ R • P )) | 2 |
| (9.27.3) | Range monotonicity of ∃ | Theorem | (∀ x ❙ P • Q ⇒ R ) ⇒ ((∃ x ❙ Q • P ) ⇒ (∃ x ❙ R • P )) | 2 |
| (9.28) | ∃-Introduction | Theorem | P[x ≔ E] ⇒ (∃ x • P ) | 2 |
| (9.28.1) | ∃-Introduction | Theorem | (R ∧ P)[x ≔ E] ⇒ (∃ x ❙ R • P ) | 2 |
| (9.29) | Interchange of quantifications | Theorem | (∃ x ❙ R • (∀ y ❙ Q • P ) ) ⇒ (∀ y ❙ Q • (∃ x ❙ R • P ) ) | 2 |
| (9.29.1) | Interchange of quantifications | Theorem | (∃ x • (∀ y • P ) ) ⇒ (∀ y • (∃ x • P ) ) | 2 |
| (9.30.1) | Witness | Theorem | (∃ x ❙ R • P ) ⇒ Q ≡ (∀ x • R ∧ P ⇒ Q ) | 2 |
| (9.30.2) | Witness | Theorem | (∃ x • P ) ⇒ Q ≡ (∀ x • P ⇒ Q ) | 2 |
| (9.3a) | Trading for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x • ¬ R ∨ P ) | 2 |
| (9.3b) | Trading for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x • R ∧ P ≡ R ) | 2 |
| (9.3c) | Trading for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x • R ∨ P ≡ P ) | 2 |
| (9.4a) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • R ⇒ P ) | 2 |
| (9.4b) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • ¬ R ∨ P ) | 2 |
| (9.4c) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • R ∧ P ≡ R ) | 2 |
| (9.4d) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • R ∨ P ≡ P ) | 2 |
| (9.5) | Distributivity of ∨ over ∀ | Axiom | P ∨ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∨ Q ) | 2 |
| (9.6) | 原文未命名 | Theorem | P ∨ (∀ x • ¬ R ) ≡ (∀ x ❙ R • P ) | 2 |
| (9.7) | Distributivity of ∧ over ∀ | Theorem | ¬ (∀ x • ¬ R ) ⇒ (P ∧ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∧ Q )) | 2 |
| (9.8) | True ∀ body | Theorem | (∀ x ❙ R • true ) | 2 |
| (9.9) | Sub-distributivity of ∀ over ≡ | Theorem | (∀ x ❙ R • P ≡ Q ) ⇒ ((∀ x ❙ R • P ) ≡ (∀ x ❙ R • Q )) | 2 |
| 未编号 · 00099d | ∧₆-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ (u ⇒ p ∧ (q ∧ (r ∧ (s ∧ (t ∧ u))))))))) | 2 |
| 未编号 · 00bbcc | Less than successor | Theorem | a < suc a | 2 |
| 未编号 · 0102c0 | Identity of ≢ | Theorem | (p ≢ false) ≡ p | 2 |
| 未编号 · 03c7aa | Associativity of + | Theorem | (a + b) + c = a + (b + c) | 2 |
| 未编号 · 042fcf | Predecessor | Theorem | pred n = n - 1 | 2 |
| 未编号 · 0440d9 | Equivalence enrichment | Theorem | (p ≡ q) ⇒ ((p ⇒ r) ⇒ (p ⇒ q ∧ r)) | 2 |
| 未编号 · 04c190 | Right-identity of ↑；别名：Definition of ↑ for 0 | Axiom | m ↑ 0 = m | 2 |
| 未编号 · 04e9d3 | Bag abbreviation | Theorem | ⟅ x, y ❙ P ⟆ = ⟅ x, y ❙ P • ⟨x, y⟩ ⟆ | 1 |
| 未编号 · 05e01d | Associativity of · | Theorem | (k · m) · n = k · (m · n) | 2 |
| 未编号 · 08e6b7 | Monotonicity of ∧ | Theorem | (p ⇒ p') ⇒ ((q ⇒ q') ⇒ (p ∧ q ⇒ p' ∧ q')) | 2 |
| 未编号 · 092d73 | Pair dummy splitting for ∏ | Theorem | (∏ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∏ x : t₁; y : t₂ ❙ R[p ≔ ⟨x, y⟩] • E[p ≔ ⟨x, y⟩] ) | 1 |
| 未编号 · 0a2238 | Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ (p ∨ r ⇒ q ∨ r) | 2 |
| 未编号 · 0b9e6e | Distributivity of `suc` over ↓；别名：Definition of ↓ for `suc` | Axiom | suc m ↓ suc n = suc (m ↓ n) | 2 |
| 未编号 · 0c5cda | Symmetry of ↑ | Theorem | m ↑ n = n ↑ m | 2 |
| 未编号 · 0cd245 | Weakening for ↑；别名：Strengthening for ↑ | Theorem | x ≤ x ↑ y | 2 |
| 未编号 · 0db673 | Pair dummy joining for ∑ | Theorem | (∑ x : t₁ • (∑ y : t₂ ❙ R • E ) ) = (∑ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 2 |
| 未编号 · 0f2ed1 | Contributing conjunct to ≡ | Theorem | (p ∧ q ≡ r) ∧ p ⇒ (q ≡ r) | 2 |
| 未编号 · 0f9cba | Definition of < in terms of `suc` and ≤ | Theorem | a < b ≡ suc a ≤ b | 2 |
| 未编号 · 115bc4 | Greater than zero implies successor | Theorem | 0 < n ⇒ n = suc pred n | 2 |
| 未编号 · 119736 | Triangle with new base | Axiom | triangleArea (suc n) = suc n + triangleArea n | 2 |
| 未编号 · 1448dd | Less than successor | Theorem | a < suc b ≡ a < b ∨ a = b | 2 |
| 未编号 · 147a53 | <-Isotonicity of `suc` | Axiom | suc a < suc b ≡ a < b | 2 |
| 未编号 · 14ca91 | Conditional cancellation of subtraction | Theorem | k ≤ m ⇒ (m - k) + k = m | 2 |
| 未编号 · 15a04b | ≤-Monotonicity of + | Corollary | a ≤ b ∧ c ≤ d ⇒ a + c ≤ b + d | 2 |
| 未编号 · 15c06f | Transitivity of = | Theorem | e = f ∧ f = g ⇒ e = g | 2 |
| 未编号 · 15fcc4 | Subtracting maximum | Theorem | k - (m ↑ n) = k - m ↓ k - n | 4 |
| 未编号 · 163ce1 | ≤ via ↓；别名：At most via minimum | Theorem | m ≤ n ≡ m ↓ n = m | 2 |
| 未编号 · 18588d | Distributivity of ↓ over ↑ | Theorem | k ↓ (m ↑ n) = (k ↓ m) ↑ (k ↓ n) | 2 |
| 未编号 · 18614a | Simple bag membership | Theorem | e ⋿ ⟅ x ❙ P ⟆ ≡ P[x ≔ e] | 1 |
| 未编号 · 191b3e | Zero is least element | Axiom | 0 ≤ a | 2 |
| 未编号 · 19df80 | Zero is not one | Theorem | 0 = 1 ≡ false | 2 |
| 未编号 · 1e9614 | Zero of ↓ | Theorem | 0 ↓ n = 0 | 2 |
| 未编号 · 1f5c61 | ≤-Monotonicity of `pred` | Theorem | a ≤ b ⇒ pred a ≤ pred b | 2 |
| 未编号 · 209236 | Powers of 1 | Theorem | 1 ** k = 1 | 1 |
| 未编号 · 21290d | Multiplying the successor | Theorem | m · suc n = m · n + m | 2 |
| 未编号 · 2186fb | Identity of ↑ | Theorem | 0 ↑ n = n | 2 |
| 未编号 · 231c87 | Least greater element；别名：Successor at most、Definition of < via successor and ≤ | Theorem | a < b ≡ a + 1 ≤ b | 2 |
| 未编号 · 23785d | Adding consequent to ∧ | Theorem | (p ⇒ q) ⇒ (p ∧ r ⇒ p ∧ (q ∧ r)) | 2 |
| 未编号 · 23fe3b | Predecessor of zero | Axiom | pred 0 = 0 | 2 |
| 未编号 · 240cc5 | Minimum with addition | Theorem | k ↓ k + n = k | 2 |
| 未编号 · 243af9 | Cancellation of `suc` | Axiom | suc m = suc n ≡ m = n | 2 |
| 未编号 · 24a375 | Definition of ≡ | Axiom | (p ≡ q) = (p = q) | 2 |
| 未编号 · 25737b | Co-residual of ∨ | Theorem | q ⇒ x ∨ p ≡ ¬ p ∧ q ⇒ x | 2 |
| 未编号 · 25a975 | Super Small Triangle | Axiom | triangleArea 0 = 0 | 2 |
| 未编号 · 266568 | Generalised one-point rule for ∀ | Theorem | R[x ≔ e] ⇒ (∀ x ❙ R ∧ x = e • E ) = E[x ≔ e] | 2 |
| 未编号 · 267c2e | Pair dummy joining for ∀ | Theorem | (∀ x : t₁; y : t₂ ❙ R • E ) = (∀ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 2 |
| 未编号 · 2977f6 | Proof by contradiction | Theorem | ¬ p ⇒ false ≡ p | 2 |
| 未编号 · 29a570 | ∧₅-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ p ∧ (q ∧ (r ∧ (s ∧ t))))))) | 4 |
| 未编号 · 29b28d | Absorption of ↓ by ↑ | Theorem | m ↑ (m ↓ n) = m | 2 |
| 未编号 · 2a12e7 | Split off <-≤-suc range at top | Corollary | m ≤ n ⇒ (m < i ≤ suc n ≡ m < i ≤ n ∨ i = suc n) | 2 |
| 未编号 · 2b72bc | Definition of ∧ | Lemma | (p ∧ q) = (p ≡ (q ≡ p ∨ q)) | 2 |
| 未编号 · 2b77ed | Successor greater；别名：Definition of ≥ via successor and > | Theorem | a + 1 > b ≡ a ≥ b | 2 |
| 未编号 · 2d46e5 | Boring disjoint range split for ∑ | Theorem | (R ∧ S ≡ false) ⇒ (∑ x ❙ R ∨ S • P ) = (∑ x ❙ R • P ) + (∑ x ❙ S • P ) | 2 |
| 未编号 · 309d0d | One-point rule for ∀₂；别名：Two-point rule for ∀ | Theorem | (∀ x, y ❙ x = A ∧ y = B • P ) ≡ P[x, y ≔ A, B] | 2 |
| 未编号 · 31d3fa | Preserving conjunct after ⇒ | Theorem | p ∧ q ⇒ r ≡ p ∧ q ⇒ p ∧ r | 2 |
| 未编号 · 33c144 | Complement of > | Theorem | ¬ (a > b) ≡ a ≤ b | 2 |
| 未编号 · 33cf6d | Definition of ≥ | Axiom | a ≥ b ≡ b ≤ a | 2 |
| 未编号 · 351d59 | Addition is non-decreasing | Theorem | b ≤ a + b | 2 |
| 未编号 · 35a9f8 | <-Isotonicity of + | Theorem | b < c ≡ a + b < a + c | 2 |
| 未编号 · 36550b | Associativity of ↓ | Theorem | (k ↓ m) ↓ n = k ↓ (m ↓ n) | 2 |
| 未编号 · 3683b4 | <-Monotonicity of `pred` | Theorem | suc a < b ⇒ pred (suc a) < pred b | 2 |
| 未编号 · 38133d | Body weakening for ∀；别名：Body strengthening for ∀ | Theorem | (∀ x ❙ R • P ) ⇒ (∀ x ❙ R • Q ⇒ P ) | 2 |
| 未编号 · 3a5de3 | Bag inclusion via ∪ | Theorem | S ⊆ T ≡ S ∪ (T - S) = T | 1 |
| 未编号 · 3aa5d0 | Monotonicity of ⇒；别名：Right-monotonicity of ⇒ | Theorem | (p ⇒ q) ⇒ ((r ⇒ p) ⇒ (r ⇒ q)) | 2 |
| 未编号 · 3bc8d4 | Zero sum | Theorem | 0 = a + b ≡ 0 = a ∧ 0 = b | 2 |
| 未编号 · 3c3941 | Introducing fresh ∀ | Theorem | P ⇒ (∀ x ❙ R • P ) | 2 |
| 未编号 · 3cdb84 | Pair dummy splitting for ∃ | Theorem | (∃ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∃ x : t₁; y : t₂ ❙ R[p ≔ ⟨x, y⟩] • E[p ≔ ⟨x, y⟩] ) | 2 |
| 未编号 · 3d1bd1 | Successor is non-decreasing | Theorem | a ≤ suc a | 2 |
| 未编号 · 3d5144 | Bag difference | Axiom | v # S - T = (v # S) - (v # T) | 1 |
| 未编号 · 3fb235 | Monus exchange | Theorem | m + (n - m) = n + (m - n) | 2 |
| 未编号 · 42cf57 | Left-identity of · | Theorem | 1 · n = n | 2 |
| 未编号 · 4315c0 | Transitivity of < | Theorem | a < b ⇒ (b < c ⇒ a < c) | 2 |
| 未编号 · 437e92 | Bag intersection | Axiom | e # S ∩ T = (e # S) ↓ (e # T) | 1 |
| 未编号 · 438c2a | Only zero is less than one | Theorem | a < 1 ≡ a = 0 | 2 |
| 未编号 · 43f5ee | Pair dummy splitting for ∏ | Theorem | (∏ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∏ a : t₁ • (∏ b : t₂ ❙ R[p ≔ ⟨a, b⟩] • E[p ≔ ⟨a, b⟩] ) ) | 1 |
| 未编号 · 43f867 | Bag size | Theorem | # B = (∑ x, i ❙ i < x # B • 1 ) | 1 |
| 未编号 · 44bb82 | Boring disjoint range split for ∀ | Theorem | (R ∧ S ≡ false) ⇒ ((∀ x ❙ R ∨ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P )) | 2 |
| 未编号 · 47596d | Left-identity of ↑；别名：Definition of ↑ for 0 | Axiom | 0 ↑ n = n | 2 |
| 未编号 · 478166 | Right-distributivity of ⇒ over ∧₃ | Theorem | p ⇒ q ∧ (r ∧ s) ≡ (p ⇒ q) ∧ ((p ⇒ r) ∧ (p ⇒ s)) | 2 |
| 未编号 · 4881c6 | Definition of < in term of ≤ and `pred` | Theorem | suc a < b ≡ suc a ≤ pred b | 2 |
| 未编号 · 4a1e98 | Boring disjoint range split for ∏ | Theorem | (R ∧ S ≡ false) ⇒ (∏ x ❙ R ∨ S • P ) = (∏ x ❙ R • P ) · (∏ x ❙ S • P ) | 1 |
| 未编号 · 4c677f | Identity of · | Theorem | 1 · m = m | 2 |
| 未编号 · 4e9496 | Reflexivity of ≤ | Theorem | a ≤ a | 2 |
| 未编号 · 515cec | <-Monotonicity of + | Theorem | b < c ⇒ a + b < a + c | 2 |
| 未编号 · 529cf6 | Associativity of bag union | Theorem | S ∪ (T ∪ W) = (S ∪ T) ∪ W | 1 |
| 未编号 · 53a471 | Triangle Solution | Theorem | 2 · triangleArea n = n · suc n | 2 |
| 未编号 · 55608a | Split off ≤-≤ range at bottom | Theorem | m ≤ n ⇒ (m ≤ i ≤ n ≡ i = m ∨ suc m ≤ i ≤ n) | 2 |
| 未编号 · 56ec04 | Identity of + | Theorem | 0 + a = a | 2 |
| 未编号 · 577081 | Pair dummy joining for ∃ | Theorem | (∃ x : t₁; y : t₂ ❙ R • E ) = (∃ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 2 |
| 未编号 · 5a04f6 | ≤-Monotonicity of · | Theorem | b ≤ c ⇒ a · b ≤ a · c | 2 |
| 未编号 · 5aae8c | Definition of ≠ | Theorem | x ≠ y ≡ (x = y ≡ false) | 2 |
| 未编号 · 5cb6cb | Pair dummy joining for ∃ | Theorem | (∃ x : t₁ • (∃ y : t₂ ❙ R • E ) ) = (∃ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 2 |
| 未编号 · 5e420e | Maximum with subtraction | Theorem | k - n ↑ k = k | 2 |
| 未编号 · 5ef251 | Subtracting minimum | Theorem | k - (m ↓ n) = k - m ↑ k - n | 2 |
| 未编号 · 5f378e | Definition of ** for 0 | Axiom | n ** 0 = 1 | 1 |
| 未编号 · 5f6c2d | Symmetry of ≠ | Theorem | x ≠ y ≡ y ≠ x | 2 |
| 未编号 · 617d8f | Zero is not one | Theorem | 0 ≠ 1 | 2 |
| 未编号 · 620131 | Distributivity of `suc` over ↑；别名：Definition of ↑ for `suc` | Axiom | suc m ↑ suc n = suc (m ↑ n) | 2 |
| 未编号 · 635d6b | Irreflexivity of < | Theorem | a < b ⇒ ¬ (a = b) | 2 |
| 未编号 · 65abc8 | Split off ≤-<-suc range at top | Theorem | m ≤ n ⇒ (m ≤ i < n + 1 ≡ m ≤ i < n ∨ i = n) | 2 |
| 未编号 · 662e98 | Split off <-≤-suc range at bottom | Corollary | m ≤ n ⇒ (m < i ≤ suc n ≡ suc m < i ≤ suc n ∨ i = suc m) | 2 |
| 未编号 · 667d5b | Shifting `suc` over + | Theorem | suc m + n = m + suc n | 2 |
| 未编号 · 668095 | Occurrences in simple bag comprehension | Theorem | a # ⟅ x : t ❙ P ⟆ ≤ 1 | 1 |
| 未编号 · 66dc70 | Bag reconstruction | Theorem | B = ⟅ x, i ❙ i < x # B • x ⟆ | 1 |
| 未编号 · 679f57 | Converse of < | Axiom | a > b ≡ b < a | 2 |
| 未编号 · 680791 | Split off <-≤-suc range at bottom | Theorem | m ≤ n ⇒ (m < i ≤ n + 1 ≡ m + 1 < i ≤ n + 1 ∨ i = m + 1) | 2 |
| 未编号 · 686663 | Irreflexivity of < | Corollary | a < b ⇒ a ≠ b | 2 |
| 未编号 · 68f8b8 | Definition of · for `suc`；别名：Definition of · | Axiom | suc m · n = n + m · n | 2 |
| 未编号 · 69579f | Symmetry of ↓ | Theorem | m ↓ n = n ↓ m | 2 |
| 未编号 · 69866c | Predecessor of successor | Axiom | pred (suc n) = n | 2 |
| 未编号 · 6f6725 | Empty range | Theorem | suc a ≤ b ≤ a ≡ false | 2 |
| 未编号 · 702635 | Subtraction from multiplication with successor | Theorem | m · suc n - m = m · n | 2 |
| 未编号 · 70f478 | ∧-Introduction | Theorem | p ⇒ (q ⇒ p ∧ q) | 2 |
| 未编号 · 7640dd | Cancellation of · | Theorem | c ≠ 0 ⇒ (c · a = c · b ≡ a = b) | 2 |
| 未编号 · 771122 | ∧₄-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ p ∧ (q ∧ (r ∧ s))))) | 2 |
| 未编号 · 77332f | Generalised one-point rule for ∑ | Theorem | R[x ≔ e] ⇒ (∑ x ❙ R ∧ x = e • E ) = E[x ≔ e] | 2 |
| 未编号 · 79adc5 | Right-zero of · | Theorem | m · 0 = 0 | 2 |
| 未编号 · 79d90c | Left-monotonicity of ∨；别名：Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ (p ∨ r ⇒ q ∨ r) | 2 |
| 未编号 · 79e5c6 | Cancellation of + | Theorem | k + m = k + n ≡ m = n | 2 |
| 未编号 · 7d8ebb | Distributivity of · over subtraction | Theorem | k · (m - n) = k · m - k · n | 2 |
| 未编号 · 7df813 | ≤-Monotonicity of + | Theorem | a ≤ b ⇒ (c ≤ d ⇒ a + c ≤ b + d) | 2 |
| 未编号 · 80d993 | Cancellation of multiplication with successor | Theorem | suc c · a = suc c · b ≡ a = b | 2 |
| 未编号 · 825cc6 | Split-off ≤-<-suc range at bottom | Theorem | m ≤ n ⇒ (m ≤ i < n + 1 ≡ m + 1 ≤ i < n + 1 ∨ i = m) | 2 |
| 未编号 · 833547 | Subtraction of zero from successor | Axiom | suc m - 0 = suc m | 2 |
| 未编号 · 845e49 | Bag abbreviation | Theorem | ⟅ x ❙ P ⟆ = ⟅ x ❙ P • x ⟆ | 1 |
| 未编号 · 8654fd | Definition of ≤ in terms of < | Theorem | a ≤ b ≡ a < b ∨ a = b | 2 |
| 未编号 · 86a35c | Abbreviated replacement in ∧；别名：Abbreviated replacement | Theorem | P ∧ x = E ≡ P[x ≔ E] ∧ x = E | 2 |
| 未编号 · 874365 | Empty range <_< | Theorem | a < b < a ≡ false | 2 |
| 未编号 · 87be40 | Pair dummy splitting for ∑ | Theorem | (∑ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∑ a : t₁ • (∑ b : t₂ ❙ R[p ≔ ⟨a, b⟩] • E[p ≔ ⟨a, b⟩] ) ) | 2 |
| 未编号 · 8876d6 | Case shuffling | Theorem | (p ∨ q) ∧ (¬ p ∨ r) ≡ (p ∧ r) ∨ (¬ p ∧ q) | 2 |
| 未编号 · 896ef9 | ≤-Isotonicity of + | Theorem | a + b ≤ a + c ≡ b ≤ c | 2 |
| 未编号 · 89a5cf | Irreflexivity of < | Corollary | ¬ (a < a) | 2 |
| 未编号 · 8c8ad4 | Self-cancellation of subtraction | Theorem | m - m = 0 | 2 |
| 未编号 · 8c907e | Bag union | Axiom | e # S ∪ T = (e # S) + (e # T) | 1 |
| 未编号 · 8d2697 | Subtraction is non-increasing | Theorem | a - b ≤ a | 2 |
| 未编号 · 8e6a06 | Maximum with addition | Theorem | k ↑ k + n = k + n | 2 |
| 未编号 · 90956c | ⇒-Introduction | Primitive inference rule | ( p ⊦ q ) ⊦ p ⇒ q | 2 |
| 未编号 · 91a85d | ** via ∏ | Theorem | n ** k = (∏ i ❙ i < k • n ) | 1 |
| 未编号 · 9285e7 | <-≤-Transitivity；别名：Transitivity of < with ≤ | Theorem | k < m ≤ n ⇒ k < n | 2 |
| 未编号 · 94d527 | Weakening；别名：Strengthening | Theorem | (p ∨ q) ∧ r ⇒ p ∨ (q ∧ r) | 2 |
| 未编号 · 94f30a | ∧₇-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ (u ⇒ (v ⇒ p ∧ (q ∧ (r ∧ (s ∧ (t ∧ (u ∧ v))))))))))) | 2 |
| 未编号 · 95e67e | Successor is not at most zero | Axiom | suc a ≤ 0 ≡ false | 2 |
| 未编号 · 98ac7b | Definition of +；别名：Left-identity of +、Definition of + for 0 | Axiom | 0 + n = n | 2 |
| 未编号 · 9941d0 | ∧₃-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ p ∧ (q ∧ r))) | 2 |
| 未编号 · 9afd85 | Zero product | Theorem | 0 = a · b ≡ 0 = a ∨ 0 = b | 2 |
| 未编号 · 9b24b5 | ≤ cases | Theorem | a ≤ b ≡ a = b ∨ suc a ≤ b | 2 |
| 未编号 · 9cb45b | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 2 |
| 未编号 · 9cd73a | Definition of ≠ | Axiom | x ≠ y ≡ ¬ (x = y) | 2 |
| 未编号 · 9e9e3d | Pair dummy joining for ∏ | Theorem | (∏ x : t₁ • (∏ y : t₂ ❙ R • E ) ) = (∏ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 1 |
| 未编号 · 9eb4a8 | Body weakening for ∀；别名：Body strengthening for ∀ | Theorem | (∀ x ❙ R • P ) ⇒ (∀ x ❙ R • P ∨ Q ) | 2 |
| 未编号 · a132b2 | Split off ≤-<-suc range at top | Corollary | m ≤ n ⇒ (m ≤ i < suc n ≡ m ≤ i < n ∨ i = n) | 2 |
| 未编号 · a13a80 | Split off <-≤-suc range at top | Theorem | m ≤ n ⇒ (m < i ≤ n + 1 ≡ m < i ≤ n ∨ i = n + 1) | 2 |
| 未编号 · a2a32a | Disjunction as implication | Lemma | p ∨ q ≡ ¬ p ⇒ q | 2 |
| 未编号 · a31008 | Pair dummy splitting for ∀ | Theorem | (∀ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∀ x : t₁; y : t₂ ❙ R[p ≔ ⟨x, y⟩] • E[p ≔ ⟨x, y⟩] ) | 2 |
| 未编号 · a34a19 | Definition of +；别名：Addition of successor、Definition of + for `suc` | Axiom | suc m + n = suc (m + n) | 2 |
| 未编号 · a4cf4d | Idempotency of ↓ | Theorem | n ↓ n = n | 2 |
| 未编号 · a566db | Definition of ** for `suc` | Axiom | n ** suc k = n · n ** k | 1 |
| 未编号 · a56b54 | Fresh ∀ | Theorem | P ≡ (∀ x • P ) | 2 |
| 未编号 · a67f50 | Definition of · for 0；别名：Definition of ·、Left-zero of · | Axiom | 0 · n = 0 | 2 |
| 未编号 · a7321a | Predecessor is non-increasing | Theorem | pred a ≤ a | 2 |
| 未编号 · a8733b | Pair dummy joining for ∀ | Theorem | (∀ x : t₁ • (∀ y : t₂ ❙ R • E ) ) = (∀ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 2 |
| 未编号 · a9a77a | Minimum with subtraction | Theorem | k ↓ k - n = k - n | 2 |
| 未编号 · aa1bee | Pair dummy joining for ∑ | Theorem | (∑ x : t₁; y : t₂ ❙ R • E ) = (∑ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 2 |
| 未编号 · ad7fe9 | Generalised one-point rule for ∃ | Theorem | R[x ≔ e] ⇒ (∃ x ❙ R ∧ x = e • E ) = E[x ≔ e] | 2 |
| 未编号 · afc42a | Predecessor of non-zero | Theorem | n ≠ 0 ⇒ suc pred n = n | 2 |
| 未编号 · b103d7 | Right-distributivity of ⇒ over ∧₄ | Theorem | p ⇒ q ∧ (r ∧ (s ∧ t)) ≡ (p ⇒ q) ∧ ((p ⇒ r) ∧ ((p ⇒ s) ∧ (p ⇒ t))) | 2 |
| 未编号 · b24ac7 | Right-identity of subtraction | Theorem | m - 0 = m | 2 |
| 未编号 · b27a0c | Empty range ≤_< | Theorem | a ≤ b < a ≡ false | 2 |
| 未编号 · b30260 | ≤-Isotonicity of `suc` | Axiom | suc a ≤ suc b ≡ a ≤ b | 2 |
| 未编号 · b77dec | Abbreviated replacement in ⇒；别名：Abbreviated replacement | Theorem | x = E ⇒ P ≡ x = E ⇒ P[x ≔ E] | 2 |
| 未编号 · b80b07 | Symmetry of bag union | Theorem | S ∪ T = T ∪ S | 1 |
| 未编号 · b8a06d | Exclusive or implies inclusive | Theorem | (p ≢ q) ⇒ p ∨ q | 2 |
| 未编号 · b9254e | ≤ preserves non-zero | Theorem | a ≤ b ⇒ (a ≠ 0 ⇒ b ≠ 0) | 4 |
| 未编号 · b9d13e | Subtraction from zero | Axiom | 0 - n = 0 | 2 |
| 未编号 · b9ec30 | At most via maximum | Theorem | k ≤ n ⇒ k ↑ n = n | 2 |
| 未编号 · bac8f9 | Right-identity of + | Theorem | m + 0 = m | 2 |
| 未编号 · bb17de | Less than successor；别名：Definition of ≤ via < and successor | Theorem | a < b + 1 ≡ a ≤ b | 2 |
| 未编号 · bb8c8b | Asymmetry of < | Theorem | a < b ⇒ ¬ (b < a) | 2 |
| 未编号 · bb97a0 | Negation of ≠ | Theorem | ¬ (x ≠ y) ≡ x = y | 2 |
| 未编号 · bdf087 | Antitonicity of ¬ | Theorem | (p ⇒ q) ⇒ (¬ q ⇒ ¬ p) | 2 |
| 未编号 · be1be4 | Pair dummy splitting for ∃ | Theorem | (∃ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∃ a : t₁ • (∃ b : t₂ ❙ R[p ≔ ⟨a, b⟩] • E[p ≔ ⟨a, b⟩] ) ) | 2 |
| 未编号 · bea6de | Zero of · | Theorem | m · 0 = 0 | 2 |
| 未编号 · bf397f | Empty range <_< | Theorem | a < b < a ⇒ false | 2 |
| 未编号 · bf49ff | ≤-Antitonicity of - | Theorem | b ≤ c ⇒ a - c ≤ a - b | 2 |
| 未编号 · c0390b | Distributivity of ⇒ over ∀ | Theorem | P ⇒ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ⇒ Q ) | 2 |
| 未编号 · c0e057 | Leibniz for ∀ body | Theorem | (∀ x • P₁ ≡ P₂ ) ⇒ ((∀ x ❙ R • P₁ ) ≡ (∀ x ❙ R • P₂ )) | 2 |
| 未编号 · c28972 | Nothing is less than zero | Axiom | a < 0 ≡ false | 2 |
| 未编号 · c4eac8 | Range weakening for ∀；别名：Range strengthening for ∀ | Theorem | (∀ x ❙ Q • P ) ⇒ (∀ x ❙ Q ∧ R • P ) | 2 |
| 未编号 · c506fd | Leibniz for ∀ body | Theorem | (∀ x ❙ R • P₁ ≡ P₂ ) ⇒ ((∀ x ❙ R • P₁ ) ≡ (∀ x ❙ R • P₂ )) | 2 |
| 未编号 · c54066 | Irreflexivity of < | Theorem | a < a ≡ false | 2 |
| 未编号 · c5d450 | Complement of < | Theorem | ¬ (a < b) ≡ a ≥ b | 2 |
| 未编号 · c72004 | Split off ∑-term from top of _<-suc range | Theorem | (∑ i : ℕ ❙ i < suc n • E ) = (∑ i : ℕ ❙ i < n • E ) + E[i ≔ n] | 2 |
| 未编号 · c7678e | Monotonicity of # | Theorem | B ⊆ C ⇒ e # B ≤ e # C | 1 |
| 未编号 · c772da | Pair dummy splitting for ∑ | Theorem | (∑ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∑ x : t₁; y : t₂ ❙ R[p ≔ ⟨x, y⟩] • E[p ≔ ⟨x, y⟩] ) | 2 |
| 未编号 · c793cd | Empty range <_≤ | Theorem | a < b ≤ a ≡ false | 2 |
| 未编号 · c8301e | Simple body-monotonicity of ∀ | Theorem | (∀ x • P ⇒ Q ) ⇒ ((∀ x ❙ R • P ) ⇒ (∀ x ❙ R • Q )) | 2 |
| 未编号 · c850cc | Absorption of ↑ by ↓ | Theorem | m ↓ (m ↑ n) = m | 2 |
| 未编号 · cb0d24 | Weakening for ↓；别名：Strengthening for ↓ | Theorem | x ↓ y ≤ x | 2 |
| 未编号 · cbd6b0 | Zero is not product of successors | Lemma | suc a · suc b = 0 ≡ false | 2 |
| 未编号 · cc3374 | Antisymmetry of ≤ | Theorem | a ≤ b ⇒ (b ≤ a ⇒ a = b) | 4 |
| 未编号 · cd3ffc | Inclusion of < in ≤ | Theorem | a < b ⇒ a ≤ b | 2 |
| 未编号 · cd7d15 | Adding the successor | Theorem | m + suc n = suc (m + n) | 2 |
| 未编号 · ce5ae3 | Residual of ∧ | Theorem | x ∧ p ⇒ q ≡ x ⇒ (p ⇒ q) | 2 |
| 未编号 · cee7e6 | Split-off ≤-<-suc range at bottom | Corollary | m ≤ n ⇒ (m ≤ i < suc n ≡ suc m ≤ i < suc n ∨ i = m) | 2 |
| 未编号 · d14899 | Subtraction of successor from successor | Axiom | suc m - suc n = m - n | 2 |
| 未编号 · d18f46 | Definition of ≤ in terms of `suc` and < | Theorem | a ≤ b ≡ a < suc b | 2 |
| 未编号 · d2a822 | Left-zero of ↓；别名：Definition of ↓ for 0 | Axiom | 0 ↓ n = 0 | 2 |
| 未编号 · d2c2dc | Distributivity of · over + | Theorem | k · (m + n) = k · m + k · n | 2 |
| 未编号 · d46e7c | Zero is unique least element | Theorem | a ≤ 0 ≡ a = 0 | 2 |
| 未编号 · d5bcf4 | Generalised one-point rule for ∏ | Theorem | R[x ≔ e] ⇒ (∏ x ❙ R ∧ x = e • E ) = E[x ≔ e] | 1 |
| 未编号 · d64a69 | Zero is not successor | Theorem | 0 ≠ suc n | 2 |
| 未编号 · d67a9f | Subtraction after addition | Theorem | (m + n) - n = m | 2 |
| 未编号 · d74161 | Greater zero via ≠ | Theorem | 0 < n ≡ n ≠ 0 | 2 |
| 未编号 · d80818 | At least successor；别名：Definition of > via ≥ and successor | Theorem | a > b ≡ a ≥ b + 1 | 2 |
| 未编号 · d8b322 | Indirect irreflexivity of < | Theorem | a = b ⇒ (a < b ≡ false) | 2 |
| 未编号 · da48ff | Bag difference with union | Theorem | S - (T ∪ U) = (S - T) - U | 1 |
| 未编号 · dc6849 | Adding equations | Theorem | a₁ = b₁ ∧ a₂ = b₂ ⇒ a₁ + a₂ = b₁ + b₂ | 2 |
| 未编号 · dce9b2 | Distributivity of + over ↑ | Theorem | k + (m ↑ n) = k + m ↑ k + n | 2 |
| 未编号 · dd496d | Zero is <-least element | Theorem | 0 < a ∨ 0 = a | 2 |
| 未编号 · e18e5f | Irreflexivity of ≠ | Theorem | x ≠ x ≡ false | 2 |
| 未编号 · e1f012 | Zero is not successor | Axiom | 0 = suc n ≡ false | 2 |
| 未编号 · e2dbad | One-point rule for ∀₂² | Theorem | (∀ x, y ❙ y = B ∧ R • P ) ≡ (∀ x ❙ R[y ≔ B] • P[y ≔ B] ) | 2 |
| 未编号 · e364a1 | Antitonicity of ⇒；别名：Left-antitonicity of ⇒ | Theorem | (p ⇒ q) ⇒ ((q ⇒ r) ⇒ (p ⇒ r)) | 2 |
| 未编号 · e44908 | Successor | Theorem | suc n = n + 1 | 2 |
| 未编号 · e4ace3 | Zero or successor of predecessor | Theorem | n = 0 ∨ n = suc pred n | 2 |
| 未编号 · e76f05 | Indirect irreflexivity of < | Corollary | a = b ⇒ ¬ (a < b) | 2 |
| 未编号 · e81b8f | Subtraction of sum | Theorem | k - (m + n) = (k - m) - n | 2 |
| 未编号 · e85030 | Idempotency of ↑ | Theorem | n ↑ n = n | 2 |
| 未编号 · e887d4 | Non-zero multiplication | Theorem | a ≠ 0 ⇒ (b ≠ 0 ⇒ a · b ≠ 0) | 6 |
| 未编号 · e9fe3f | Definition of 1 | Theorem | 1 = suc 0 | 2 |
| 未编号 · eb923d | Boring disjoint range split for ∃ | Theorem | (R ∧ S ≡ false) ⇒ ((∃ x ❙ R ∨ S • P ) ≡ (∃ x ❙ R • P ) ∨ (∃ x ❙ S • P )) | 2 |
| 未编号 · ebd499 | Split off ∑-term from top of _≤-suc range | Theorem | (∑ i ❙ i ≤ suc n • E ) = (∑ i ❙ i ≤ n • E ) + E[i ≔ suc n] | 2 |
| 未编号 · ec42a2 | Greater than zero means successor | Theorem | 0 < n ≡ n = suc pred n | 2 |
| 未编号 · ed759b | Monotonicity of ↓ | Theorem | k ≤ m ⇒ k ↓ n ≤ m ↓ n | 2 |
| 未编号 · ef0d0c | Zero is less than successor | Axiom | 0 < suc a | 2 |
| 未编号 · ef374b | Symmetry of · | Theorem | m · n = n · m | 2 |
| 未编号 · efb2f4 | Symmetry of + | Theorem | m + n = n + m | 2 |
| 未编号 · f1d779 | Cancellation of ¬ | Theorem | (¬ p ≡ ¬ q) = (p ≡ q) | 2 |
| 未编号 · f226ab | Transitivity of ≤ | Theorem | a ≤ b ⇒ (b ≤ c ⇒ a ≤ c) | 2 |
| 未编号 · f245f4 | One-point rule for ∀₂¹ | Theorem | (∀ x, y ❙ x = A ∧ R • P ) ≡ (∀ y ❙ R • P )[x ≔ A] | 2 |
| 未编号 · f2bb9d | ≤-<-Transitivity；别名：Transitivity of ≤ with < | Lemma | a ≤ b ∧ b < c ⇒ a < c | 2 |
| 未编号 · f46207 | Pair dummy joining for ∏ | Theorem | (∏ x : t₁; y : t₂ ❙ R • E ) = (∏ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 1 |
| 未编号 · f4948f | Case shuffling | Theorem | (p ⇒ q) ∧ (¬ p ⇒ r) ≡ (p ∧ q) ∨ (¬ p ∧ r) | 2 |
| 未编号 · f55b13 | Nothing is less than zero | Corollary | ¬ (a < 0) | 2 |
| 未编号 · f6c4f5 | Cancellation of subtraction by addition | Theorem | m ≤ n ≡ (n - m) + m = n | 2 |
| 未编号 · f8a195 | Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ ((r ⇒ s) ⇒ (p ∨ r ⇒ q ∨ s)) | 4 |
| 未编号 · f93139 | Irreflexivity of ≠ | Theorem | ¬ (x ≠ x) | 2 |
| 未编号 · fb0aea | Right-zero of ↓；别名：Definition of ↓ for 0 | Axiom | m ↓ 0 = 0 | 2 |
| 未编号 · fb9650 | Direct bag comprehension membership | Theorem | (∀ x • x ⋿ ⟅ x ❙ P ⟆ ≡ P ) | 1 |
| 未编号 · fbdca6 | Split off ∑-term from top of ≤-<-suc range | Theorem | m ≤ n ⇒ (∑ i ❙ m ≤ i < suc n • E ) = (∑ i ❙ m ≤ i < n • E ) + E[i ≔ n] | 2 |
| 未编号 · fbf6ed | ≤-Monotonicity of - | Theorem | a ≤ b ⇒ a - c ≤ b - c | 2 |
| 未编号 · fd3294 | Associativity of ↑ | Theorem | (k ↑ m) ↑ n = k ↑ (m ↑ n) | 2 |
| 未编号 · fd7df5 | Adding exponents | Theorem | n ** (k + m) = n ** k · n ** m | 1 |
| 未编号 · fdb8c0 | Pair dummy splitting for ∀ | Theorem | (∀ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∀ a : t₁ • (∀ b : t₂ ❙ R[p ≔ ⟨a, b⟩] • E[p ≔ ⟨a, b⟩] ) ) | 2 |
| 未编号 · fe79fd | Multiplying exponents | Theorem | n ** (k · m) = (n ** k) ** m | 1 |
| 未编号 · feb8bb | Distributivity of ** over base multiplication | Theorem | (m · n) ** k = m ** k · n ** k | 1 |
| 未编号 · ffaed4 | Squaring | Theorem | n ** 2 = n · n | 1 |

## 2025 · Week 11

对应 notebook：[HW21 · CalcCheck preloaded theorem list](http://130.113.68.214:15095/), [HW22 · CalcCheck preloaded theorem list](http://130.113.68.214:15108/)

| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |
|---|---|---|---|---:|
| (1.2) | Reflexivity of = | Axiom | x = x | 2 |
| (1.3) | Symmetry of = | Axiom | (x = y) = (y = x) | 2 |
| (1.4) | Transitivity of = | Derived inference rule | X = Y , Y = Z ⊦ X = Z | 2 |
| (1.5) | Leibniz | Derived inference rule | X = Y ⊦ E[z ≔ X] = E[z ≔ Y] | 2 |
| (3.1) | Associativity of ≡ | Axiom | ((p ≡ q) ≡ r) ≡ (p ≡ (q ≡ r)) | 2 |
| (3.10) | Definition of ≢ | Axiom | (p ≢ q) ≡ ¬ (p ≡ q) | 2 |
| (3.11) | ¬ connection | Theorem | ¬ p ≡ (q ≡ (p ≡ ¬ q)) | 2 |
| (3.12) | Double negation | Theorem | ¬ (¬ p) ≡ p | 2 |
| (3.13) | Negation of `false` | Theorem | ¬ false ≡ true | 2 |
| (3.14) | 原文未命名 | Theorem | (p ≢ q) ≡ (¬ p ≡ q) | 2 |
| (3.15) | Definition of ¬ from ≡ | Theorem | ¬ p ≡ (p ≡ false) | 2 |
| (3.16) | Symmetry of ≢ | Theorem | (p ≢ q) ≡ (q ≢ p) | 2 |
| (3.17) | Associativity of ≢ | Theorem | ((p ≢ q) ≢ r) ≡ (p ≢ (q ≢ r)) | 2 |
| (3.18) | Mutual associativity of ≡ with ≢ | Theorem | ((p ≢ q) ≡ r) ≡ (p ≢ (q ≡ r)) | 2 |
| (3.19) | Mutual interchangeability of ≡ with ≢ | Theorem | (p ≢ (q ≡ r)) ≡ (p ≡ (q ≢ r)) | 2 |
| (3.2) | Symmetry of ≡ | Axiom | (p ≡ q) ≡ (q ≡ p) | 2 |
| (3.24) | Symmetry of ∨ | Axiom | p ∨ q ≡ q ∨ p | 2 |
| (3.25) | Associativity of ∨ | Axiom | (p ∨ q) ∨ r ≡ p ∨ (q ∨ r) | 2 |
| (3.26) | Idempotency of ∨ | Axiom | p ∨ p ≡ p | 2 |
| (3.27) | Distributivity of ∨ over ≡ | Axiom | p ∨ (q ≡ r) ≡ (p ∨ q ≡ p ∨ r) | 2 |
| (3.28) | Excluded middle；别名：LEM | Axiom | p ∨ ¬ p | 2 |
| (3.29) | Zero of ∨ | Theorem | p ∨ true ≡ true | 2 |
| (3.3) | Identity of ≡ | Axiom | true ≡ (q ≡ q) | 2 |
| (3.30) | Identity of ∨ | Theorem | p ∨ false ≡ p | 2 |
| (3.31) | Distributivity of ∨ over ∨ | Theorem | p ∨ (q ∨ r) ≡ (p ∨ q) ∨ (p ∨ r) | 2 |
| (3.32) | 原文未命名 | Theorem | p ∨ q ≡ (p ∨ ¬ q ≡ p) | 2 |
| (3.35) | Golden rule | Axiom | p ∧ q ≡ (p ≡ (q ≡ p ∨ q)) | 2 |
| (3.36) | Symmetry of ∧ | Theorem | p ∧ q ≡ q ∧ p | 2 |
| (3.37) | Associativity of ∧ | Theorem | (p ∧ q) ∧ r ≡ p ∧ (q ∧ r) | 2 |
| (3.38) | Idempotency of ∧ | Theorem | p ∧ p ≡ p | 2 |
| (3.39) | Identity of ∧ | Theorem | p ∧ true ≡ p | 2 |
| (3.4) | 原文未命名 | Theorem | true | 2 |
| (3.40) | Zero of ∧ | Theorem | p ∧ false ≡ false | 2 |
| (3.41) | Distributivity of ∧ over ∧ | Theorem | p ∧ (q ∧ r) ≡ (p ∧ q) ∧ (p ∧ r) | 2 |
| (3.42) | Contradiction | Theorem | p ∧ ¬ p ≡ false | 2 |
| (3.43a) | Absorption | Theorem | p ∧ (p ∨ q) ≡ p | 2 |
| (3.43b) | Absorption | Theorem | p ∨ (p ∧ q) ≡ p | 2 |
| (3.44a) | Absorption | Theorem | p ∧ (¬ p ∨ q) ≡ p ∧ q | 2 |
| (3.44b) | Absorption | Theorem | p ∨ (¬ p ∧ q) ≡ p ∨ q | 2 |
| (3.44c) | Absorption | Theorem | ¬ p ∧ (p ∨ q) ≡ ¬ p ∧ q | 2 |
| (3.44d) | Absorption | Theorem | ¬ p ∨ (p ∧ q) ≡ ¬ p ∨ q | 2 |
| (3.45) | Distributivity of ∨ over ∧ | Theorem | p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r) | 2 |
| (3.46) | Distributivity of ∧ over ∨ | Theorem | p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r) | 2 |
| (3.47a) | De Morgan | Theorem | ¬ (p ∧ q) ≡ ¬ p ∨ ¬ q | 2 |
| (3.47b) | De Morgan | Theorem | ¬ (p ∨ q) ≡ ¬ p ∧ ¬ q | 2 |
| (3.47c) | De Morgan | Theorem | ¬ (¬ p ∧ q) ≡ p ∨ ¬ q | 2 |
| (3.47d) | De Morgan | Theorem | ¬ (¬ p ∨ q) ≡ p ∧ ¬ q | 2 |
| (3.47e) | De Morgan dual of ∧ | Theorem | ¬ (¬ p ∧ ¬ q) ≡ p ∨ q | 2 |
| (3.47f) | De Morgan dual of ∨ | Theorem | ¬ (¬ p ∨ ¬ q) ≡ p ∧ q | 2 |
| (3.48) | 原文未命名 | Theorem | p ∧ q ≡ (p ∧ ¬ q ≡ ¬ p) | 2 |
| (3.49) | Semi-distributivity of ∧ over ≡ | Theorem | p ∧ (q ≡ r) ≡ (p ∧ q ≡ (p ∧ r ≡ p)) | 2 |
| (3.5) | Reflexivity of ≡ | Theorem | p ≡ p | 2 |
| (3.50) | Strong modus ponens for ≡ | Theorem | p ∧ (q ≡ p) ≡ p ∧ q | 2 |
| (3.51) | Replacement | Theorem | (p ≡ q) ∧ (r ≡ p) ≡ (p ≡ q) ∧ (r ≡ q) | 2 |
| (3.52) | Alternative definition of ≡ | Theorem | p ≡ (q ≡ (p ∧ q) ∨ (¬ p ∧ ¬ q)) | 2 |
| (3.53) | Exclusive or；别名：Alternative definition of ≢ | Theorem | (p ≢ q) ≡ (¬ p ∧ q) ∨ (p ∧ ¬ q) | 2 |
| (3.55) | 原文未命名 | Theorem | (p ∧ q) ∧ r ≡ (p ≡ (q ≡ (r ≡ (p ∨ q ≡ (q ∨ r ≡ (r ∨ p ≡ p ∨ (q ∨ r))))))) | 2 |
| (3.57) | Definition of ⇒ via ∨；别名：Definition of ⇒ from ∨、Definition of ⇒、Definition of implication | Axiom | p ⇒ q ≡ (p ∨ q ≡ q) | 2 |
| (3.57=) | Implication via ∨ | Lemma | (p ⇒ q) = (p ∨ q ≡ q) | 2 |
| (3.58) | Definition of ⇐；别名：Consequence | Axiom | p ⇐ q ≡ q ⇒ p | 2 |
| (3.59) | Material implication；别名：Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ ¬ p ∨ q | 2 |
| (3.60) | Definition of ⇒ via ∧；别名：Definition of ⇒ from ∧、Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ (p ∧ q ≡ p) | 2 |
| (3.60=) | Implication via ∧ | Lemma | (p ⇒ q) = (p ∧ q ≡ p) | 2 |
| (3.61) | Contrapositive | Theorem | p ⇒ q ≡ ¬ q ⇒ ¬ p | 2 |
| (3.61.1) | ¬-connection for ⇒ | Theorem | p ⇒ ¬ q ≡ q ⇒ ¬ p | 2 |
| (3.61.2) | ¬-connection for ⇒ | Theorem | ¬ p ⇒ q ≡ ¬ q ⇒ p | 2 |
| (3.62) | 原文未命名 | Theorem | p ⇒ (q ≡ r) ≡ (p ∧ q ≡ p ∧ r) | 2 |
| (3.63) | Distributivity of ⇒ over ≡ | Theorem | p ⇒ (q ≡ r) ≡ (p ⇒ q ≡ p ⇒ r) | 2 |
| (3.64) | Self-distributivity of ⇒ | Theorem | p ⇒ (q ⇒ r) ≡ (p ⇒ q) ⇒ (p ⇒ r) | 2 |
| (3.65) | Shunting | Theorem | p ∧ q ⇒ r ≡ p ⇒ (q ⇒ r) | 2 |
| (3.66) | Strong modus ponens | Theorem | p ∧ (p ⇒ q) ≡ p ∧ q | 2 |
| (3.67) | 原文未命名 | Theorem | p ∧ (q ⇒ p) ≡ p | 2 |
| (3.68) | 原文未命名 | Theorem | p ∨ (p ⇒ q) ≡ true | 2 |
| (3.69) | 原文未命名 | Theorem | p ∨ (q ⇒ p) ≡ q ⇒ p | 2 |
| (3.70) | 原文未命名 | Theorem | p ∨ q ⇒ p ∧ q ≡ (p ≡ q) | 2 |
| (3.71) | Reflexivity of ⇒ | Theorem | p ⇒ p | 2 |
| (3.72) | Right-zero of ⇒；别名：ex quodlibet verum | Theorem | p ⇒ true | 2 |
| (3.73) | Left-identity of ⇒ | Theorem | true ⇒ p ≡ p | 2 |
| (3.74) | Definition of ¬ from ⇒ | Theorem | p ⇒ false ≡ ¬ p | 2 |
| (3.75) | ex falso quodlibet | Theorem | false ⇒ p | 2 |
| (3.76a) | Weakening；别名：Strengthening | Theorem | p ⇒ p ∨ q | 2 |
| (3.76b) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p | 2 |
| (3.76c) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∨ q | 2 |
| (3.76d) | Weakening；别名：Strengthening | Theorem | p ∨ (q ∧ r) ⇒ p ∨ q | 2 |
| (3.76e) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∧ (q ∨ r) | 2 |
| (3.77) | Modus ponens | Theorem | p ∧ (p ⇒ q) ⇒ q | 2 |
| (3.78) | Case analysis | Theorem | (p ⇒ r) ∧ (q ⇒ r) ≡ p ∨ q ⇒ r | 2 |
| (3.79) | Case analysis | Theorem | (p ⇒ r) ∧ (¬ p ⇒ r) ≡ r | 2 |
| (3.8) | Definition of `false` | Axiom | false ≡ ¬ true | 2 |
| (3.80) | Mutual implication | Theorem | (p ⇒ q) ∧ (q ⇒ p) ≡ (p ≡ q) | 2 |
| (3.80.1) | Reflexivity of ⇒ wrt. ≡；别名：Reflexivity of ⇒ | Theorem | (p ≡ q) ⇒ (p ⇒ q) | 2 |
| (3.81) | Antisymmetry of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ p) ⇒ (p ≡ q) | 2 |
| (3.82.4) | Implication strengthening | Theorem | p ⇒ q ≡ p ⇒ p ∧ q | 2 |
| (3.82.5) | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 2 |
| (3.82a) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 2 |
| (3.82b) | Transitivity of ⇒ | Theorem | (p ≡ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 2 |
| (3.82c) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ≡ r) ⇒ (p ⇒ r) | 2 |
| (3.83) | Leibniz | Axiom | e = f ⇒ E[z ≔ e] = E[z ≔ f] | 2 |
| (3.83.1) | Leibniz | Corollary | d = e ⇒ f d = f e | 2 |
| (3.83.2) | Leibniz | Corollary | d = e ⇒ (p d ≡ p e) | 2 |
| (3.83.3) | Leibniz | Corollary | (d ≡ e) ⇒ (p d ≡ p e) | 2 |
| (3.83.4) | Leibniz | Corollary | (d ≡ e) ⇒ f d = f e | 2 |
| (3.84a) | Replacement | Theorem | e = f ∧ E[z ≔ e] ≡ e = f ∧ E[z ≔ f] | 2 |
| (3.84a≡) | Replacement | Theorem | (e ≡ f) ∧ E[z ≔ e] ≡ (e ≡ f) ∧ E[z ≔ f] | 2 |
| (3.84b) | Replacement | Theorem | e = f ⇒ E[z ≔ e] ≡ e = f ⇒ E[z ≔ f] | 2 |
| (3.84b≡) | Replacement | Theorem | (e ≡ f) ⇒ E[z ≔ e] ≡ (e ≡ f) ⇒ E[z ≔ f] | 2 |
| (3.84c) | Replacement | Theorem | q ∧ (e ≡ f) ⇒ E[z ≔ e] ≡ q ∧ (e ≡ f) ⇒ E[z ≔ f] | 2 |
| (3.84c) | Replacement | Theorem | q ∧ e = f ⇒ E[z ≔ e] ≡ q ∧ e = f ⇒ E[z ≔ f] | 2 |
| (3.85a) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] ≡ p ⇒ E[z ≔ true] | 2 |
| (3.85b) | Replace by `true` | Theorem | q ∧ p ⇒ E[z ≔ p] ≡ q ∧ p ⇒ E[z ≔ true] | 2 |
| (3.85c) | Replace by `false` | Theorem | ¬ p ⇒ E[z ≔ p] ≡ ¬ p ⇒ E[z ≔ false] | 2 |
| (3.85d) | Replace by `false` | Theorem | q ∧ ¬ p ⇒ E[z ≔ p] ≡ q ∧ ¬ p ⇒ E[z ≔ false] | 2 |
| (3.85e) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] = E[z ≔ true] | 2 |
| (3.86a) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ≡ E[z ≔ false] ⇒ p | 2 |
| (3.86b) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ∨ q ≡ E[z ≔ false] ⇒ p ∨ q | 2 |
| (3.87) | Replace by `true` | Theorem | p ∧ E[z ≔ p] ≡ p ∧ E[z ≔ true] | 2 |
| (3.87.1) | Abbreviated replace by `false` | Theorem | ¬ p ∧ E ≡ ¬ p ∧ E[p ≔ false] | 2 |
| (3.87.1) | Abbreviated replace by `true` | Theorem | p ∧ E ≡ p ∧ E[p ≔ true] | 2 |
| (3.88) | Replace by `false` | Theorem | p ∨ E[z ≔ p] ≡ p ∨ E[z ≔ false] | 2 |
| (3.89) | Shannon | Theorem | E[z ≔ p] ≡ (p ∧ E[z ≔ true]) ∨ (¬ p ∧ E[z ≔ false]) | 2 |
| (3.9) | Commutativity of ¬ with ≡ | Axiom | ¬ (p ≡ q) ≡ (¬ p ≡ q) | 2 |
| (4.3) | Left-monotonicity of ∧；别名：Monotonicity of ∧ | Theorem | (p ⇒ q) ⇒ (p ∧ r ⇒ q ∧ r) | 2 |
| (8.11) | Substitution into ∀ | Axiom | (∀ y ❙ R • P )[x ≔ F] ≡ (∀ y ❙ R[x ≔ F] • P[x ≔ F] ) | 1 |
| (8.12.1) | Leibniz for ∀ range | Axiom | (∀ x • R₁ ≡ R₂ ) ⇒ ((∀ x ❙ R₁ • P ) ≡ (∀ x ❙ R₂ • P )) | 1 |
| (8.12.1₂) | Leibniz for ∀₂ range | Axiom | (∀ x, y • R₁ ≡ R₂ ) ⇒ ((∀ x, y ❙ R₁ • P ) ≡ (∀ x, y ❙ R₂ • P )) | 1 |
| (8.12.1₃) | Leibniz for ∀₃ range | Axiom | (∀ x, y, z • R₁ ≡ R₂ ) ⇒ ((∀ x, y, z ❙ R₁ • P ) ≡ (∀ x, y, z ❙ R₂ • P )) | 1 |
| (8.12.2) | Leibniz for ∀ body | Axiom | (∀ x • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∀ x ❙ R • P₁ ) ≡ (∀ x ❙ R • P₂ )) | 1 |
| (8.12.2₂) | Leibniz for ∀₂ body | Axiom | (∀ x, y • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∀ x, y ❙ R • P₁ ) ≡ (∀ x, y ❙ R • P₂ )) | 1 |
| (8.12.2₃) | Leibniz for ∀₃ body | Axiom | (∀ x, y, z • R ⇒ (P₁ ≡ P₂) ) ⇒ ((∀ x, y, z ❙ R • P₁ ) ≡ (∀ x, y, z ❙ R • P₂ )) | 1 |
| (8.13) | Empty range for ∀ | Axiom | (∀ x ❙ false • P ) ≡ true | 1 |
| (8.14) | One-point rule for ∀ | Axiom | (∀ x ❙ x = E • P ) ≡ P[x ≔ E] | 1 |
| (8.15) | Distributivity of ∀ over ∧ | Axiom | (∀ x ❙ R • P ) ∧ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∧ Q ) | 1 |
| (8.16) | Disjoint range split for ∀ | Theorem | (∀ x • R ∧ S ≡ false ) ⇒ ((∀ x ❙ R ∨ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P )) | 1 |
| (8.16.1) | Alternative range split for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x ❙ R ∧ S • P ) ∧ (∀ x ❙ R ∧ ¬ S • P ) | 1 |
| (8.17) | General range split for ∀ | Axiom | (∀ x ❙ R ∨ S • P ) ∧ (∀ x ❙ R ∧ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P ) | 1 |
| (8.18) | Range split for ∀ | Theorem | (∀ x ❙ R ∨ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P ) | 2 |
| (8.18) | Range split for ∀₂ | Theorem | (∀ x, y ❙ R ∨ S • P ) ≡ (∀ x, y ❙ R • P ) ∧ (∀ x, y ❙ S • P ) | 1 |
| (8.19) | Interchange of dummies for ∀ | Theorem | (∀ x ❙ R • (∀ y ❙ S • P ) ) ≡ (∀ y ❙ S • (∀ x ❙ R • P ) ) | 1 |
| (8.19.1) | Dummy list permutation for ∀ | Axiom | (∀ x, y ❙ R • P ) ≡ (∀ y, x ❙ R • P ) | 1 |
| (8.19.1) | Dummy list permutation₁+₂ for ∀ | Axiom | (∀ x, y, z ❙ R • P ) ≡ (∀ y, z, x ❙ R • P ) | 1 |
| (8.20) | Nesting for ∀ | Axiom | (∀ x, y ❙ R ∧ S • P ) ≡ (∀ x ❙ R • (∀ y ❙ S • P ) ) | 1 |
| (8.20) | Nesting₁+₂ for ∀ | Axiom | (∀ x, y, z ❙ R ∧ S • P ) ≡ (∀ x ❙ R • (∀ y, z ❙ S • P ) ) | 1 |
| (8.20) | Nesting₂+₁ for ∀ | Axiom | (∀ x, y, z ❙ R ∧ S • P ) ≡ (∀ x, y ❙ R • (∀ z ❙ S • P ) ) | 1 |
| (8.20.1) | Nesting for ∀ | Theorem | (∀ x, y ❙ S • P ) ≡ (∀ x • (∀ y ❙ S • P ) ) | 1 |
| (8.20.1) | Nesting₁+₂ for ∀ | Theorem | (∀ x, y, z ❙ S • P ) ≡ (∀ x • (∀ y, z ❙ S • P ) ) | 1 |
| (8.20.1) | Nesting₂+₁ for ∀ | Theorem | (∀ x, y, z ❙ S • P ) ≡ (∀ x, y • (∀ z ❙ S • P ) ) | 1 |
| (8.20.2) | Nesting for ∀ | Theorem | (∀ x, y ❙ R • P ) ≡ (∀ x ❙ R • (∀ y • P ) ) | 1 |
| (8.20.2) | Nesting₁+₂ for ∀ | Theorem | (∀ x, y, z ❙ R • P ) ≡ (∀ x ❙ R • (∀ y, z • P ) ) | 1 |
| (8.20.2) | Nesting₂+₁ for ∀ | Theorem | (∀ x, y, z ❙ R • P ) ≡ (∀ x, y ❙ R • (∀ z • P ) ) | 1 |
| (8.20.3) | Replacement in ∀ | Theorem | (∀ y ❙ R ∧ e = f • P[x ≔ e] ) ≡ (∀ y ❙ R ∧ e = f • P[x ≔ f] ) | 1 |
| (8.21) | Dummy renaming for ∀；别名：α-conversion | Theorem | (∀ x ❙ R • P ) ≡ (∀ y ❙ R[x ≔ y] • P[x ≔ y] ) | 1 |
| (8.22) | Change of dummy in ∀ | Theorem | (∀ f • (∀ g • (∀ x • (∀ y • x = f y ≡ y = g x ) ) ⇒ ((∀ x ❙ R • P ) ≡ (∀ y ❙ R[x ≔ f y] • P[x ≔ f y] )) ) ) | 1 |
| (8.22.1) | Change of dummy in ∀ — variant | Theorem | (∀ x • (∀ y • x = f y ⇒ y = g x ) ) ⇒ ((∀ x ❙ R ∧ x = f (g x) • P ) ≡ (∀ y ❙ R[x ≔ f y] • P[x ≔ f y] )) | 1 |
| (8.22.2) | Range replacement in nested ∀ | Lemma | (∀ x ❙ R • (∀ y • Q₁ ≡ Q₂ ) ) ⇒ ((∀ x ❙ R • (∀ y ❙ Q₁ • P ) ) ≡ (∀ x ❙ R • (∀ y ❙ Q₂ • P ) )) | 1 |
| (8.22.3) | Change of restricted dummy in ∀ | Theorem | (∀ f • (∀ g • (∀ x ❙ R • (∀ y • x = f y ≡ y = g x ) ) ⇒ ((∀ x ❙ R • P ) ≡ (∀ y ❙ R[x ≔ f y] • P[x ≔ f y] )) ) ) | 1 |
| (9.10) | Range weakening for ∀；别名：Range strengthening for ∀ | Theorem | (∀ x ❙ Q ∨ R • P ) ⇒ (∀ x ❙ Q • P ) | 1 |
| (9.11) | Body weakening for ∀；别名：Body strengthening for ∀ | Theorem | (∀ x ❙ R • P ∧ Q ) ⇒ (∀ x ❙ R • P ) | 1 |
| (9.12) | Monotonicity of ∀；别名：Body monotonicity of ∀ | Theorem | (∀ x ❙ R • Q ⇒ P ) ⇒ ((∀ x ❙ R • Q ) ⇒ (∀ x ❙ R • P )) | 1 |
| (9.12a) | Range antitonicity of ∀ | Theorem | (∀ x ❙ ¬ P • Q ⇒ R ) ⇒ ((∀ x ❙ R • P ) ⇒ (∀ x ❙ Q • P )) | 1 |
| (9.12a) | Range antitonicity of ∀ | Theorem | (∀ x • Q ⇒ R ) ⇒ ((∀ x ❙ R • P ) ⇒ (∀ x ❙ Q • P )) | 1 |
| (9.13) | Instantiation | Theorem | (∀ x • P ) ⇒ P[x ≔ E] | 1 |
| (9.13.1) | Instantiation | Theorem | (∀ x • P ) ⇒ P[x ≔ x] | 1 |
| (9.13.2) | Instantiation | Theorem | (∀ x ❙ R • P ) ⇒ (R ⇒ P)[x ≔ E] | 1 |
| (9.2) | Trading for ∀ | Axiom | (∀ x ❙ R • P ) ≡ (∀ x • R ⇒ P ) | 1 |
| (9.3a) | Trading for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x • ¬ R ∨ P ) | 1 |
| (9.3b) | Trading for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x • R ∧ P ≡ R ) | 1 |
| (9.3c) | Trading for ∀ | Theorem | (∀ x ❙ R • P ) ≡ (∀ x • R ∨ P ≡ P ) | 1 |
| (9.4a) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • R ⇒ P ) | 1 |
| (9.4b) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • ¬ R ∨ P ) | 1 |
| (9.4c) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • R ∧ P ≡ R ) | 1 |
| (9.4d) | Trading for ∀ | Theorem | (∀ x ❙ Q ∧ R • P ) ≡ (∀ x ❙ Q • R ∨ P ≡ P ) | 1 |
| (9.5) | Distributivity of ∨ over ∀ | Axiom | P ∨ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∨ Q ) | 1 |
| (9.6) | 原文未命名 | Theorem | P ∨ (∀ x • ¬ R ) ≡ (∀ x ❙ R • P ) | 1 |
| (9.7) | Distributivity of ∧ over ∀ | Theorem | ¬ (∀ x • ¬ R ) ⇒ (P ∧ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ∧ Q )) | 1 |
| (9.8) | True ∀ body | Theorem | (∀ x ❙ R • true ) | 1 |
| (9.9) | Sub-distributivity of ∀ over ≡ | Theorem | (∀ x ❙ R • P ≡ Q ) ⇒ ((∀ x ❙ R • P ) ≡ (∀ x ❙ R • Q )) | 1 |
| (dom.100) | Converse of subidentity | Theorem | q ⊆ 𝕀 ⇒ q ˘ ⊆ 𝕀 | 1 |
| (dom.101) | Subidentity included in ˘ | Theorem | q ⊆ 𝕀 ⇒ q ⊆ q ˘ | 1 |
| (dom.102) | Symmetry of subidentity | Theorem | q ⊆ 𝕀 ⇒ q ˘ = q | 1 |
| (dom.103) | Idempotency of subidentity | Theorem | q ⊆ 𝕀 ⇒ q ⨾ q = q | 1 |
| (dom.104) | Univalence of subidentity | Theorem | q ⊆ 𝕀 ⇒ univalent q | 1 |
| (dom.105) | Injectivity of subidentity | Theorem | q ⊆ 𝕀 ⇒ injective q | 1 |
| (dom.106) | Composition of subidentities | Theorem | p ⊆ 𝕀 ∧ q ⊆ 𝕀 ⇒ p ⨾ q ⊆ 𝕀 | 1 |
| (dom.107) | Sub-commutativity of subidentities | Theorem | p ⊆ 𝕀 ∧ q ⊆ 𝕀 ⇒ p ⨾ q ⊆ q ⨾ p | 1 |
| (dom.108) | Commutativity of subidentities | Theorem | p ⊆ 𝕀 ∧ q ⊆ 𝕀 ⇒ p ⨾ q = q ⨾ p | 1 |
| (dom.109) | Modal rule with injective | Theorem | injective Q ⇒ Q ⨾ R ∩ S = Q ⨾ (R ∩ Q ˘ ⨾ S) | 1 |
| (dom.110) | Modal rule with univalent | Theorem | univalent R ⇒ Q ⨾ R ∩ S = (Q ∩ S ⨾ R ˘) ⨾ R | 1 |
| (dom.111) | Subidentity ∩ | Theorem | p ⊆ 𝕀 ∧ q ⊆ 𝕀 ⇒ p ∩ q = p ⨾ q | 1 |
| (dom.200) | `dom` via ∩；别名：Relation-algebraic definition of `dom` | Axiom | dom R = R ⨾ R ˘ ∩ 𝕀 | 1 |
| (dom.201) | `ran` via ∩；别名：Relation-algebraic definition of `ran` | Axiom | ran R = R ˘ ⨾ R ∩ 𝕀 | 1 |
| (dom.202) | `dom` of converse；别名：`ran` via `dom` | Theorem | dom (R ˘) = ran R | 1 |
| (dom.203) | `ran` of converse；别名：`dom` via `ran` | Theorem | ran (R ˘) = dom R | 1 |
| (dom.204) | Subidentity `dom` | Theorem | dom R ⊆ 𝕀 | 1 |
| (dom.205) | Subidentity `ran` | Theorem | ran R ⊆ 𝕀 | 1 |
| (dom.206) | Symmetry of `dom`；别名：Converse of `dom` | Theorem | dom R ˘ = dom R | 1 |
| (dom.207) | Symmetry of `ran`；别名：Converse of `ran` | Theorem | ran R ˘ = ran R | 1 |
| (dom.208) | Univalence of `dom` | Theorem | univalent (dom R) | 1 |
| (dom.209) | Univalence of `ran` | Theorem | univalent (ran R) | 1 |
| (dom.210) | Injectivity of `dom` | Theorem | injective (dom R) | 1 |
| (dom.211) | Injectivity of `ran` | Theorem | injective (ran R) | 1 |
| (dom.212) | Absorption of `dom` | Theorem | dom R ⨾ R = R | 1 |
| (dom.213) | Absorption of `ran` | Theorem | R ⨾ ran R = R | 1 |
| (dom.214) | Idempotency wrt. ⨾ of `dom` | Theorem | dom R ⨾ dom R = dom R | 1 |
| (dom.215) | Idempotency wrt. ⨾ of `ran` | Theorem | ran R ⨾ ran R = ran R | 1 |
| (dom.216) | Monotonicity of `dom` | Theorem | Q ⊆ R ⇒ dom Q ⊆ dom R | 1 |
| (dom.217) | Monotonicity of `ran` | Theorem | Q ⊆ R ⇒ ran Q ⊆ ran R | 1 |
| (dom.218) | Absorption of `dom` of greater | Theorem | Q ⊆ R ⇒ Q = dom R ⨾ Q | 1 |
| (dom.219) | Absorption of `ran` of greater | Theorem | Q ⊆ R ⇒ Q = Q ⨾ ran R | 1 |
| (dom.220) | Least left-preserver is `dom` | Theorem | d ⊆ 𝕀 ∧ R ⊆ d ⨾ R ⇒ dom R ⊆ d | 1 |
| (dom.221) | Least right-preserver is `ran` | Theorem | d ⊆ 𝕀 ∧ R ⊆ R ⨾ d ⇒ ran R ⊆ d | 1 |
| (dom.222) | Locality of `dom` | Theorem | dom (R ⨾ S) = dom (R ⨾ dom S) | 1 |
| (dom.223) | Locality of `ran` | Theorem | ran (R ⨾ S) = ran (ran R ⨾ S) | 1 |
| (dom.224) | Commuting `dom-⨾` with `dom` | Theorem | dom (dom R ⨾ S) = dom R ⨾ dom S | 1 |
| (dom.225) | Commuting `⨾-ran` with `ran` | Theorem | ran (R ⨾ ran S) = ran S ⨾ ran R | 1 |
| (dom.226) | Commuting `dom-⨾-dom` | Theorem | dom R ⨾ dom S = dom S ⨾ dom R | 1 |
| (dom.227) | Commuting `ran-⨾-ran` | Theorem | ran R ⨾ ran S = ran S ⨾ ran R | 1 |
| (dom.228) | `dom-⨾-dom` to ∩ | Theorem | dom R ⨾ dom S = dom R ∩ dom S | 1 |
| (dom.229) | `ran-⨾-ran` to ∩ | Theorem | ran R ⨾ ran S = ran R ∩ ran S | 1 |
| 未编号 · 00099d | ∧₆-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ (u ⇒ p ∧ (q ∧ (r ∧ (s ∧ (t ∧ u))))))))) | 2 |
| 未编号 · 004c79 | Transitivity of converse | Theorem | transitive R ≡ transitive (R ˘) | 1 |
| 未编号 · 00a536 | Definition of preorder | Axiom | preorder R ≡ reflexive R ∧ transitive R | 1 |
| 未编号 · 00f91c | Reflexive implies total | Theorem | reflexive R ⇒ total R | 1 |
| 未编号 · 0102c0 | Identity of ≢ | Theorem | (p ≢ false) ≡ p | 2 |
| 未编号 · 0440d9 | Equivalence enrichment | Theorem | (p ≡ q) ⇒ ((p ⇒ r) ⇒ (p ⇒ q ∧ r)) | 2 |
| 未编号 · 059a7c | Flip `⊆-⨾-univalent˘` | Theorem | univalent F ⇒ (Q ⊆ R ⨾ F ˘ ⇒ Q ⨾ F ⊆ R) | 1 |
| 未编号 · 061ed1 | Definition of coreflexivity | Axiom | coreflexive R ≡ R ⊆ 𝕀 | 1 |
| 未编号 · 06525f | Order is idempotent | Theorem | order E ⇒ idempotent E | 1 |
| 未编号 · 07cffc | Inverse of 𝕀 | Theorem | 𝕀 is-inverse-of 𝕀 | 1 |
| 未编号 · 08e6b7 | Monotonicity of ∧ | Theorem | (p ⇒ p') ⇒ ((q ⇒ q') ⇒ (p ∧ q ⇒ p' ∧ q')) | 2 |
| 未编号 · 0a2238 | Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ (p ∨ r ⇒ q ∨ r) | 2 |
| 未编号 · 0a7917 | Cancellation of ˘ | Lemma | R ˘ = S ˘ ≡ R = S | 1 |
| 未编号 · 0c26c6 | Flip `⨾-total-⊆` | Theorem | total F ⇒ (Q ⨾ F ⊆ R ⇒ Q ⊆ R ⨾ F ˘) | 1 |
| 未编号 · 0d8d56 | Definition of bijectivity | Axiom | bijective R ≡ injective R ∧ surjective R | 1 |
| 未编号 · 0dd51e | Definition of bijectivity | Lemma | bijective R ≡ R ⨾ R ˘ ⊆ 𝕀 ∧ 𝕀 ⊆ R ˘ ⨾ R | 1 |
| 未编号 · 0f2ed1 | Contributing conjunct to ≡ | Theorem | (p ∧ q ≡ r) ∧ p ⇒ (q ≡ r) | 2 |
| 未编号 · 126968 | Monotonicity of ˘ | Axiom | R ⊆ S ⇒ R ˘ ⊆ S ˘ | 1 |
| 未编号 · 14f06b | Equivalence induced by preorder | Theorem | preorder E ⇒ equivalence (E ∩ E ˘) | 1 |
| 未编号 · 15c06f | Transitivity of = | Theorem | e = f ∧ f = g ⇒ e = g | 2 |
| 未编号 · 17d106 | Definition of transitivity | Axiom | transitive R ≡ R ⨾ R ⊆ R | 1 |
| 未编号 · 18e5f1 | Definition of equivalence | Lemma | equivalence R ≡ 𝕀 ⊆ R ∧ (R ˘ ⊆ R ∧ R ⨾ R ⊆ R) | 1 |
| 未编号 · 1c584c | Converse of an equivalence | Theorem | equivalence R ≡ equivalence (R ˘) | 1 |
| 未编号 · 1f4e4d | Definition of preorder | Lemma | preorder R ≡ 𝕀 ⊆ R ∧ R ⨾ R ⊆ R | 1 |
| 未编号 · 2180e0 | Definition of injectivity | Axiom | injective R ≡ R ⨾ R ˘ ⊆ 𝕀 | 1 |
| 未编号 · 23785d | Adding consequent to ∧ | Theorem | (p ⇒ q) ⇒ (p ∧ r ⇒ p ∧ (q ∧ r)) | 2 |
| 未编号 · 24a375 | Definition of ≡ | Axiom | (p ≡ q) = (p = q) | 2 |
| 未编号 · 25737b | Co-residual of ∨ | Theorem | q ⇒ x ∨ p ≡ ¬ p ∧ q ⇒ x | 2 |
| 未编号 · 266568 | Generalised one-point rule for ∀ | Theorem | R[x ≔ e] ⇒ (∀ x ❙ R ∧ x = e • E ) = E[x ≔ e] | 1 |
| 未编号 · 267c2e | Pair dummy joining for ∀ | Theorem | (∀ x : t₁; y : t₂ ❙ R • E ) = (∀ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 1 |
| 未编号 · 2977f6 | Proof by contradiction | Theorem | ¬ p ⇒ false ≡ p | 2 |
| 未编号 · 29a570 | ∧₅-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ p ∧ (q ∧ (r ∧ (s ∧ t))))))) | 4 |
| 未编号 · 2b72bc | Definition of ∧ | Lemma | (p ∧ q) = (p ≡ (q ≡ p ∨ q)) | 2 |
| 未编号 · 2bba4a | Modal rule | Theorem | Q ⨾ R ∩ S ⊆ (Q ∩ S ⨾ R ˘) ⨾ R | 1 |
| 未编号 · 2d00b3 | Flip `mapping˘-⨾-⊆` | Theorem | mapping F ⇒ (F ˘ ⨾ Q ⊆ R ≡ Q ⊆ F ⨾ R) | 1 |
| 未编号 · 2f2e65 | Uniqueness of bottom relation | Theorem | is-bottom R ∧ is-bottom S ⇒ R = S | 1 |
| 未编号 · 2f972c | Hesitation | Theorem | R ⊆ R ⨾ (R ˘ ⨾ R) | 1 |
| 未编号 · 309d0d | One-point rule for ∀₂；别名：Two-point rule for ∀ | Theorem | (∀ x, y ❙ x = A ∧ y = B • P ) ≡ P[x, y ≔ A, B] | 1 |
| 未编号 · 31d3fa | Preserving conjunct after ⇒ | Theorem | p ∧ q ⇒ r ≡ p ∧ q ⇒ p ∧ r | 2 |
| 未编号 · 32ed0f | Reflexivity of 𝕀 | Theorem | reflexive 𝕀 | 1 |
| 未编号 · 34dc22 | Flip `⊆-⨾-injective` | Theorem | injective F ⇒ (Q ⊆ R ⨾ F ⇒ Q ⨾ F ˘ ⊆ R) | 1 |
| 未编号 · 38133d | Body weakening for ∀；别名：Body strengthening for ∀ | Theorem | (∀ x ❙ R • P ) ⇒ (∀ x ❙ R • Q ⇒ P ) | 1 |
| 未编号 · 3aa5d0 | Monotonicity of ⇒；别名：Right-monotonicity of ⇒ | Theorem | (p ⇒ q) ⇒ ((r ⇒ p) ⇒ (r ⇒ q)) | 2 |
| 未编号 · 3c3941 | Introducing fresh ∀ | Theorem | P ⇒ (∀ x ❙ R • P ) | 1 |
| 未编号 · 3d5c7b | Definition of PER | Axiom | is-PER R ≡ symmetric R ∧ transitive R | 1 |
| 未编号 · 3ebc7a | Order is preorder | Theorem | order E ⇒ preorder E | 1 |
| 未编号 · 3f556a | Kernel of mappings | Theorem | mapping F ⇒ equivalence (F ⨾ F ˘) | 1 |
| 未编号 · 400d69 | Swapping mapping across ⊆ | Theorem | mapping F ⇒ (R ⨾ F ⊆ S ≡ R ⊆ S ⨾ F ˘) | 1 |
| 未编号 · 4100a4 | Definition of surjectivity | Axiom | surjective R ≡ 𝕀 ⊆ R ˘ ⨾ R | 1 |
| 未编号 · 417d07 | Indirect Relation Inclusion；别名：Indirect Relation Inclusion from below | Theorem | Q ⊆ R ≡ (∀ S • S ⊆ Q ⇒ S ⊆ R ) | 1 |
| 未编号 · 44ad64 | Right-distributivity of ⨾ with univalent over ∩ | Theorem | univalent F ⇒ F ⨾ (R ∩ S) = F ⨾ R ∩ F ⨾ S | 1 |
| 未编号 · 44bb82 | Boring disjoint range split for ∀ | Theorem | (R ∧ S ≡ false) ⇒ ((∀ x ❙ R ∨ S • P ) ≡ (∀ x ❙ R • P ) ∧ (∀ x ❙ S • P )) | 1 |
| 未编号 · 47412a | Isotonicity of ˘ | Theorem | R ⊆ S ≡ R ˘ ⊆ S ˘ | 1 |
| 未编号 · 478166 | Right-distributivity of ⇒ over ∧₃ | Theorem | p ⇒ q ∧ (r ∧ s) ≡ (p ⇒ q) ∧ ((p ⇒ r) ∧ (p ⇒ s)) | 2 |
| 未编号 · 4babda | Transitivity of ⊆ | Theorem | Q ⊆ R ∧ R ⊆ S ⇒ Q ⊆ S | 1 |
| 未编号 · 4c529d | Reflexivity of ⨾ | Theorem | reflexive R ⇒ (reflexive S ⇒ reflexive (R ⨾ S)) | 1 |
| 未编号 · 4c5916 | Definition of `is-bottom` | Axiom | is-bottom R ≡ (∀ S • R ⊆ S ) | 1 |
| 未编号 · 4ef33d | Transitivity of 𝕀 | Theorem | transitive 𝕀 | 1 |
| 未编号 · 4f5971 | Left-monotonicity of ⨾；别名：Monotonicity of ⨾ | Theorem | Q ⊆ R ⇒ Q ⨾ S ⊆ R ⨾ S | 1 |
| 未编号 · 525dd4 | 𝕀 is surjective | Theorem | surjective 𝕀 | 1 |
| 未编号 · 5352f0 | Flip `total˘-⨾-⊆` | Theorem | total F ⇒ (F ˘ ⨾ Q ⊆ R ⇒ Q ⊆ F ⨾ R) | 1 |
| 未编号 · 53f3d3 | 𝕀 is mapping | Theorem | mapping 𝕀 | 1 |
| 未编号 · 56d9a0 | Definition of order | Axiom | order R ≡ reflexive R ∧ (antisymmetric R ∧ transitive R) | 1 |
| 未编号 · 56f1ca | Definition of mappings | Axiom | mapping R ≡ univalent R ∧ total R | 1 |
| 未编号 · 58f411 | Indirect Relation Equality；别名：Indirect Relation Equality from below | Theorem | Q = R ≡ (∀ S • S ⊆ Q ≡ S ⊆ R ) | 1 |
| 未编号 · 5aae8c | Definition of ≠ | Theorem | x ≠ y ≡ (x = y ≡ false) | 2 |
| 未编号 · 5bc8f7 | Converse of ∩ | Theorem | (R ∩ S) ˘ ⊆ R ˘ ∩ S ˘ | 1 |
| 未编号 · 5e7a26 | Flip `⨾-mapping-⊆` | Theorem | mapping F ⇒ (Q ⨾ F ⊆ R ≡ Q ⊆ R ⨾ F ˘) | 1 |
| 未编号 · 5e9ac3 | Inverse of ⨾ | Theorem | S₁ is-inverse-of R₁ ∧ S₂ is-inverse-of R₂ ⇒ S₂ ⨾ S₁ is-inverse-of R₁ ⨾ R₂ | 1 |
| 未编号 · 5f6c2d | Symmetry of ≠ | Theorem | x ≠ y ≡ y ≠ x | 2 |
| 未编号 · 62eea8 | Sub-distributivity of ⨾ over ∩ | Theorem | Q ⨾ (R ∩ S) ⊆ Q ⨾ R ∩ Q ⨾ S | 1 |
| 未编号 · 690a06 | Converse of top relations | Theorem | is-top R ≡ is-top (R ˘) | 1 |
| 未编号 · 6afde2 | Reflexivity of ⊆ | Lemma | R = S ⇒ R ⊆ S | 1 |
| 未编号 · 6b68ae | Monotonicity of ∩ | Theorem | Q ⊆ R ⇒ (S ⊆ T ⇒ Q ∩ S ⊆ R ∩ T) | 1 |
| 未编号 · 6e4da9 | Symmetry of ∩ | Theorem | Q ∩ R ⊆ R ∩ Q | 1 |
| 未编号 · 70f478 | ∧-Introduction | Theorem | p ⇒ (q ⇒ p ∧ q) | 2 |
| 未编号 · 743334 | Definition of PER | Lemma | is-PER R ≡ R ˘ ⊆ R ∧ R ⨾ R ⊆ R | 1 |
| 未编号 · 74b3fa | Self-inverse of ˘ | Axiom | (R ˘) ˘ = R | 1 |
| 未编号 · 757eab | Definition of order | Theorem | order E ≡ 𝕀 ⊆ E ∧ (E ∩ E ˘ ⊆ 𝕀 ∧ (E ⨾ E ⊆ E ∧ E ⨾ E = E)) | 1 |
| 未编号 · 771122 | ∧₄-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ p ∧ (q ∧ (r ∧ s))))) | 2 |
| 未编号 · 79d90c | Left-monotonicity of ∨；别名：Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ (p ∨ r ⇒ q ∨ r) | 2 |
| 未编号 · 80449b | 𝕀 is injective | Theorem | injective 𝕀 | 1 |
| 未编号 · 86228f | Definition of antisymmetry | Axiom | antisymmetric R ≡ R ∩ R ˘ ⊆ 𝕀 | 1 |
| 未编号 · 86a35c | Abbreviated replacement in ∧；别名：Abbreviated replacement | Theorem | P ∧ x = E ≡ P[x ≔ E] ∧ x = E | 2 |
| 未编号 · 8876d6 | Case shuffling | Theorem | (p ∨ q) ∧ (¬ p ∨ r) ≡ (p ∧ r) ∨ (¬ p ∧ q) | 2 |
| 未编号 · 8929a6 | Symmetry of converse | Theorem | symmetric R ≡ symmetric (R ˘) | 1 |
| 未编号 · 8a4486 | Indirect Relation Inclusion；别名：Indirect Relation Inclusion from above | Theorem | Q ⊆ R ≡ (∀ S • R ⊆ S ⇒ Q ⊆ S ) | 1 |
| 未编号 · 8b9a7d | Converse of an order | Theorem | order E ≡ order (E ˘) | 1 |
| 未编号 · 8d7134 | Definition of equivalence | Axiom | equivalence R ≡ reflexive R ∧ (symmetric R ∧ transitive R) | 1 |
| 未编号 · 8fda69 | Weaker definition of symmetry | Lemma | R ˘ ⊆ R ⇒ R ˘ = R | 1 |
| 未编号 · 90956c | ⇒-Introduction | Primitive inference rule | ( p ⊦ q ) ⊦ p ⇒ q | 2 |
| 未编号 · 9305f3 | Reflexivity of ⊆ | Axiom | R ⊆ R | 1 |
| 未编号 · 9332ae | Mutual inclusion | Theorem | R = S ≡ R ⊆ S ∧ S ⊆ R | 1 |
| 未编号 · 94d527 | Weakening；别名：Strengthening | Theorem | (p ∨ q) ∧ r ⇒ p ∨ (q ∧ r) | 2 |
| 未编号 · 94f30a | ∧₇-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ (u ⇒ (v ⇒ p ∧ (q ∧ (r ∧ (s ∧ (t ∧ (u ∧ v))))))))))) | 2 |
| 未编号 · 96b329 | Definition of idempotency | Axiom | idempotent R ≡ R ⨾ R = R | 1 |
| 未编号 · 9710b8 | ˘ connection | Theorem | R ⊆ S ˘ ≡ R ˘ ⊆ S | 1 |
| 未编号 · 9941d0 | ∧₃-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ p ∧ (q ∧ r))) | 2 |
| 未编号 · 9b5a45 | Idempotency of 𝕀 | Theorem | idempotent 𝕀 | 1 |
| 未编号 · 9bf58d | Definition of symmetry | Lemma | symmetric R ≡ R ˘ = R | 1 |
| 未编号 · 9cb45b | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 2 |
| 未编号 · 9cd73a | Definition of ≠ | Axiom | x ≠ y ≡ ¬ (x = y) | 2 |
| 未编号 · 9e3c05 | Inclusion via ∩ | Theorem | Q ⊆ R ≡ Q ∩ R = Q | 1 |
| 未编号 · 9eb4a8 | Body weakening for ∀；别名：Body strengthening for ∀ | Theorem | (∀ x ❙ R • P ) ⇒ (∀ x ❙ R • P ∨ Q ) | 1 |
| 未编号 · 9f0235 | Dedekind rule | Axiom | Q ⨾ R ∩ S ⊆ (Q ∩ S ⨾ R ˘) ⨾ (R ∩ Q ˘ ⨾ S) | 1 |
| 未编号 · a1c41d | Associativity of ∩ | Corollary | (Q ∩ R) ∩ S = Q ∩ (R ∩ S) | 1 |
| 未编号 · a2a32a | Disjunction as implication | Lemma | p ∨ q ≡ ¬ p ⇒ q | 2 |
| 未编号 · a31008 | Pair dummy splitting for ∀ | Theorem | (∀ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∀ x : t₁; y : t₂ ❙ R[p ≔ ⟨x, y⟩] • E[p ≔ ⟨x, y⟩] ) | 1 |
| 未编号 · a3c830 | Idempotency of converse | Theorem | idempotent R ≡ idempotent (R ˘) | 1 |
| 未编号 · a56b54 | Fresh ∀ | Theorem | P ≡ (∀ x • P ) | 1 |
| 未编号 · a63644 | total in univalent | Theorem | total R ⇒ (univalent S ⇒ (R ⊆ S ⇒ R = S)) | 3 |
| 未编号 · a683d5 | Idempotency from reflexive and transitive | Theorem | reflexive R ⇒ (transitive R ⇒ idempotent R) | 1 |
| 未编号 · a6ad2a | Identity of ⨾ | Axiom | R ⨾ 𝕀 = R | 1 |
| 未编号 · a86336 | Idempotency from symmetric and transitive | Theorem | symmetric R ⇒ (transitive R ⇒ idempotent R) | 1 |
| 未编号 · a8733b | Pair dummy joining for ∀ | Theorem | (∀ x : t₁ • (∀ y : t₂ ❙ R • E ) ) = (∀ p : ❰ t₁, t₂ ❱ ❙ R[x, y ≔ fst p, snd p] • E[x, y ≔ fst p, snd p] ) | 1 |
| 未编号 · a8d9a0 | Associativity of ⨾ | Axiom | (Q ⨾ R) ⨾ S = Q ⨾ (R ⨾ S) | 1 |
| 未编号 · ab1fb6 | Definition of symmetry | Axiom | symmetric R ≡ R ˘ ⊆ R | 1 |
| 未编号 · ad1afc | Transitivity of ⊆ | Axiom | Q ⊆ R ⇒ (R ⊆ S ⇒ Q ⊆ S) | 1 |
| 未编号 · afcd3e | Definition of totality | Axiom | total R ≡ 𝕀 ⊆ R ⨾ R ˘ | 1 |
| 未编号 · b065d8 | 𝕀 is bijective | Theorem | bijective 𝕀 | 1 |
| 未编号 · b103d7 | Right-distributivity of ⇒ over ∧₄ | Theorem | p ⇒ q ∧ (r ∧ (s ∧ t)) ≡ (p ⇒ q) ∧ ((p ⇒ r) ∧ ((p ⇒ s) ∧ (p ⇒ t))) | 2 |
| 未编号 · b1f3fd | 𝕀 is univalent | Theorem | univalent 𝕀 | 1 |
| 未编号 · b2ca22 | 𝕀 is total | Theorem | total 𝕀 | 1 |
| 未编号 · b77dec | Abbreviated replacement in ⇒；别名：Abbreviated replacement | Theorem | x = E ⇒ P ≡ x = E ⇒ P[x ≔ E] | 2 |
| 未编号 · b8a06d | Exclusive or implies inclusive | Theorem | (p ≢ q) ⇒ p ∨ q | 2 |
| 未编号 · b9c5ff | Definition of univalence | Axiom | univalent R ≡ R ˘ ⨾ R ⊆ 𝕀 | 1 |
| 未编号 · ba984c | Definition of inverse | Axiom | S is-inverse-of R ≡ S ⨾ R = 𝕀 ∧ R ⨾ S = 𝕀 | 1 |
| 未编号 · bb97a0 | Negation of ≠ | Theorem | ¬ (x ≠ y) ≡ x = y | 2 |
| 未编号 · bdf087 | Antitonicity of ¬ | Theorem | (p ⇒ q) ⇒ (¬ q ⇒ ¬ p) | 2 |
| 未编号 · bfc28e | Flip `⊆-univalent-⨾` | Theorem | univalent F ⇒ (Q ⊆ F ⨾ R ⇒ F ˘ ⨾ Q ⊆ R) | 1 |
| 未编号 · c0390b | Distributivity of ⇒ over ∀ | Theorem | P ⇒ (∀ x ❙ R • Q ) ≡ (∀ x ❙ R • P ⇒ Q ) | 1 |
| 未编号 · c0e057 | Leibniz for ∀ body | Theorem | (∀ x • P₁ ≡ P₂ ) ⇒ ((∀ x ❙ R • P₁ ) ≡ (∀ x ❙ R • P₂ )) | 1 |
| 未编号 · c1ac75 | Identity of ⨾ | Axiom | 𝕀 ⨾ R = R | 1 |
| 未编号 · c28fa8 | Inverse of mapping | Theorem | mapping f ⇒ (g is-inverse-of f ⇒ g = f ˘) | 1 |
| 未编号 · c35aa4 | Idempotency of preorders | Corollary | preorder R ⇒ idempotent R | 1 |
| 未编号 · c4eac8 | Range weakening for ∀；别名：Range strengthening for ∀ | Theorem | (∀ x ❙ Q • P ) ⇒ (∀ x ❙ Q ∧ R • P ) | 1 |
| 未编号 · c506fd | Leibniz for ∀ body | Theorem | (∀ x ❙ R • P₁ ≡ P₂ ) ⇒ ((∀ x ❙ R • P₁ ) ≡ (∀ x ❙ R • P₂ )) | 1 |
| 未编号 · c535f4 | Composition of mappings | Theorem | mapping F ∧ mapping G ⇒ mapping (F ⨾ G) | 1 |
| 未编号 · c8301e | Simple body-monotonicity of ∀ | Theorem | (∀ x • P ⇒ Q ) ⇒ ((∀ x ❙ R • P ) ⇒ (∀ x ❙ R • Q )) | 1 |
| 未编号 · c929ec | Converse of bottom relations | Theorem | is-bottom R ≡ is-bottom (R ˘) | 1 |
| 未编号 · c97154 | Modal rule | Theorem | Q ⨾ R ∩ S ⊆ Q ⨾ (R ∩ Q ˘ ⨾ S) | 1 |
| 未编号 · ca96f5 | PER factoring | Theorem | symmetric Q ⇒ (transitive Q ⇒ Q ⨾ R ∩ Q = Q ⨾ (R ∩ Q)) | 1 |
| 未编号 · cac09f | Monotonicity of ⨾ | Axiom | P ⊆ Q ⇒ (R ⊆ S ⇒ P ⨾ R ⊆ Q ⨾ S) | 1 |
| 未编号 · cd0823 | Idempotency of ∩ | Theorem | R ∩ R = R | 1 |
| 未编号 · cd41db | Weakening for ∩ | Theorem | Q ∩ R ⊆ Q ∧ Q ∩ R ⊆ R | 1 |
| 未编号 · ce5ae3 | Residual of ∧ | Theorem | x ∧ p ⇒ q ≡ x ⇒ (p ⇒ q) | 2 |
| 未编号 · cf0bbd | Monotonicity of ∩ | Theorem | Q ⊆ R ⇒ Q ∩ S ⊆ R ∩ S | 1 |
| 未编号 · cff528 | Definition of PER | Lemma | is-PER R ≡ R ˘ = R ∧ R ⨾ R ⊆ R | 1 |
| 未编号 · d18431 | Definition of reflexivity | Axiom | reflexive R ≡ 𝕀 ⊆ R | 1 |
| 未编号 · d39078 | Converse of 𝕀 | Axiom | 𝕀 ˘ = 𝕀 | 1 |
| 未编号 · d49743 | Flipped transitivity of ⊆；别名：Flipped Transitivity of ⊆ | Lemma | R ⊆ S ⇒ (Q ⊆ R ⇒ Q ⊆ S) | 1 |
| 未编号 · d51410 | Flip `surj-⨾-⊆` | Theorem | surjective F ⇒ (F ⨾ Q ⊆ R ⇒ Q ⊆ F ˘ ⨾ R) | 1 |
| 未编号 · d93d5e | Converse of ∩ | Theorem | (R ∩ S) ˘ = R ˘ ∩ S ˘ | 1 |
| 未编号 · dacf73 | Indirect Relation Equality；别名：Indirect Relation Equality from above | Theorem | Q = R ≡ (∀ S • Q ⊆ S ≡ R ⊆ S ) | 1 |
| 未编号 · db90aa | Antisymmetry of converse | Theorem | antisymmetric R ≡ antisymmetric (R ˘) | 1 |
| 未编号 · dca16f | Definition of mappings | Lemma | mapping R ≡ R ˘ ⨾ R ⊆ 𝕀 ∧ 𝕀 ⊆ R ⨾ R ˘ | 1 |
| 未编号 · de09d3 | Characterisation of ∩ | Axiom | Q ⊆ R ∩ S ≡ Q ⊆ R ∧ Q ⊆ S | 1 |
| 未编号 · dee7bb | Coreflexivity of 𝕀 | Theorem | coreflexive 𝕀 | 1 |
| 未编号 · df1432 | Coreflexivity of ⨾ | Theorem | coreflexive R ⇒ (coreflexive S ⇒ coreflexive (R ⨾ S)) | 1 |
| 未编号 · dff25e | Identity preorder | Theorem | preorder 𝕀 | 1 |
| 未编号 · e18e5f | Irreflexivity of ≠ | Theorem | x ≠ x ≡ false | 2 |
| 未编号 · e2dbad | One-point rule for ∀₂² | Theorem | (∀ x, y ❙ y = B ∧ R • P ) ≡ (∀ x ❙ R[y ≔ B] • P[y ≔ B] ) | 1 |
| 未编号 · e364a1 | Antitonicity of ⇒；别名：Left-antitonicity of ⇒ | Theorem | (p ⇒ q) ⇒ ((q ⇒ r) ⇒ (p ⇒ r)) | 2 |
| 未编号 · edd6eb | Symmetry of ∩ | Corollary | Q ∩ R = R ∩ Q | 1 |
| 未编号 · ee8711 | Associativity of ∩ | Theorem | (Q ∩ R) ∩ S ⊆ Q ∩ (R ∩ S) | 1 |
| 未编号 · ee8eb3 | Right-monotonicity of ⨾；别名：Monotonicity of ⨾ | Theorem | R ⊆ S ⇒ Q ⨾ R ⊆ Q ⨾ S | 1 |
| 未编号 · eeb37f | Converse of ⨾ | Axiom | (R ⨾ S) ˘ = S ˘ ⨾ R ˘ | 1 |
| 未编号 · f0fab6 | Antisymmetry of ⊆ | Axiom | R ⊆ S ⇒ (S ⊆ R ⇒ R = S) | 1 |
| 未编号 · f1d779 | Cancellation of ¬ | Theorem | (¬ p ≡ ¬ q) = (p ≡ q) | 2 |
| 未编号 · f245f4 | One-point rule for ∀₂¹ | Theorem | (∀ x, y ❙ x = A ∧ R • P ) ≡ (∀ y ❙ R • P )[x ≔ A] | 1 |
| 未编号 · f2f787 | Sub-distributivity of ⨾ over ∩ | Theorem | (Q ∩ R) ⨾ S ⊆ Q ⨾ S ∩ R ⨾ S | 1 |
| 未编号 · f4948f | Case shuffling | Theorem | (p ⇒ q) ∧ (¬ p ⇒ r) ≡ (p ∧ q) ∨ (¬ p ∧ r) | 2 |
| 未编号 · f63804 | Reflexivity of converse | Theorem | reflexive R ≡ reflexive (R ˘) | 1 |
| 未编号 · f8a195 | Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ ((r ⇒ s) ⇒ (p ∨ r ⇒ q ∨ s)) | 4 |
| 未编号 · f91134 | Opposite inclusion | Axiom | R ⊇ S ≡ S ⊆ R | 1 |
| 未编号 · f93139 | Irreflexivity of ≠ | Theorem | ¬ (x ≠ x) | 2 |
| 未编号 · fac161 | Definition of `is-top` | Axiom | is-top R ≡ (∀ Q • Q ⊆ R ) | 1 |
| 未编号 · fb619a | Uniqueness of top relation | Theorem | is-top R ∧ is-top S ⇒ R = S | 1 |
| 未编号 · fdb8c0 | Pair dummy splitting for ∀ | Theorem | (∀ p : ❰ t₁, t₂ ❱ ❙ R • E ) = (∀ a : t₁ • (∀ b : t₂ ❙ R[p ≔ ⟨a, b⟩] • E[p ≔ ⟨a, b⟩] ) ) | 1 |

## 2026 · Week 1

对应 notebook：[2026 H1 · 入门与 CalcCheck · 预载列表](http://130.113.68.214:16001/), [2026 Ex1.1 · 简单计算 · 预载列表](http://130.113.68.214:16002/), [2026 Ex1.2 · 整数等式 · 预载列表](http://130.113.68.214:16003/), [2026 Ex1.3 · 替换 · 预载列表](http://130.113.68.214:16004/), [2026 Ex1.4 · 严格匹配 · 预载列表](http://130.113.68.214:16005/), [2026 Ex1.5 · 不自动使用结合与对称 · 预载列表](http://130.113.68.214:16006/), [2026 Ex1.6 · 高难度练习 · 预载列表](http://130.113.68.214:16007/), [2026 Ex1.7 · 赋值命令正确性 · 预载列表](http://130.113.68.214:16008/), [2026 H2 · 表达式与计算 · 预载列表](http://130.113.68.214:16009/), [2026 H3 · 赋值命令正确性 · 预载列表](http://130.113.68.214:16010/)

| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |
|---|---|---|---|---:|
| (1.2) | Reflexivity of = | Axiom | x = x | 11 |
| (1.3) | Symmetry of = | Axiom | (x = y) = (y = x) | 11 |
| (1.4) | Transitivity of = | Derived inference rule | X = Y , Y = Z ⊦ X = Z | 11 |
| (1.5) | Leibniz | Derived inference rule | X = Y ⊦ E[z ≔ X] = E[z ≔ Y] | 11 |
| (15.13) | Unary minus | Axiom | a + - a = 0 | 6 |
| (15.14) | Subtraction | Axiom | a - b = a + - b | 6 |
| (15.17) | Self-inverse of unary minus | Theorem | - (- a) = a | 5 |
| (15.18) | Fixpoint of unary minus | Theorem | - 0 = 0 | 5 |
| (15.19) | Distributivity of unary minus over + | Theorem | - (a + b) = - a + - b | 5 |
| (15.1a) | Associativity of + | Axiom | (a + b) + c = a + (b + c) | 6 |
| (15.1b) | Associativity of · | Axiom | (a · b) · c = a · (b · c) | 6 |
| (15.20) | Negation as multiplication | Theorem | - a = - 1 · a | 5 |
| (15.21) | 原文未命名 | Theorem | - a · b = a · - b | 5 |
| (15.22) | Commutativity of unary minus with · | Theorem | a · - b = - (a · b) | 5 |
| (15.23) | 原文未命名 | Theorem | - a · - b = a · b | 5 |
| (15.24) | Right-identity of - | Theorem | a - 0 = a | 5 |
| (15.24a) | Subtraction of subtraction | Theorem | a - (b - c) = (a - b) + c | 5 |
| (15.25) | 原文未命名 | Theorem | (a - b) + (c - d) = (a + c) - (b + d) | 5 |
| (15.25a) | Mutual associativity of + and - | Theorem | a + (b - c) = (a + b) - c | 5 |
| (15.25b) | Subtraction of addition | Theorem | a - (b + c) = (a - b) - c | 5 |
| (15.25c) | Cancellation across added subtractions | Theorem | (a - b) + (b - c) = a - c | 5 |
| (15.26) | 原文未命名 | Theorem | (a - b) - (c - d) = (a + d) - (b + c) | 5 |
| (15.27) | 原文未命名 | Theorem | (a - b) · (c - d) = (a · c + b · d) - (a · d + b · c) | 5 |
| (15.29) | Distributivity of · over - | Theorem | (a - b) · c = a · c - b · c | 5 |
| (15.2a) | Symmetry of + | Axiom | a + b = b + a | 6 |
| (15.2b) | Symmetry of · | Axiom | a · b = b · a | 6 |
| (15.3) | Additive identity；别名：Identity of + | Axiom | 0 + a = a | 6 |
| (15.4) | Multiplicative identity；别名：Identity of · | Axiom | 1 · a = a | 6 |
| (15.5) | Distributivity of · over + | Axiom | a · (b + c) = a · b + a · c | 6 |
| (15.7) | Cancellation of · | Axiom | c ≠ 0 ⇒ (c · a = c · b ≡ a = b) | 3 |
| (15.8) | Cancellation of + | Axiom | a + b = a + c ≡ b = c | 3 |
| (15.9) | Zero of · | Axiom | a · 0 = 0 | 6 |
| (3.1) | Associativity of ≡ | Axiom | ((p ≡ q) ≡ r) ≡ (p ≡ (q ≡ r)) | 3 |
| (3.10) | Definition of ≢ | Axiom | (p ≢ q) ≡ ¬ (p ≡ q) | 1 |
| (3.11) | ¬ connection | Theorem | ¬ p ≡ (q ≡ (p ≡ ¬ q)) | 1 |
| (3.12) | Double negation | Theorem | ¬ (¬ p) ≡ p | 1 |
| (3.13) | Negation of `false` | Theorem | ¬ false ≡ true | 1 |
| (3.14) | 原文未命名 | Theorem | (p ≢ q) ≡ (¬ p ≡ q) | 1 |
| (3.15) | Definition of ¬ from ≡ | Theorem | ¬ p ≡ (p ≡ false) | 1 |
| (3.16) | Symmetry of ≢ | Theorem | (p ≢ q) ≡ (q ≢ p) | 1 |
| (3.17) | Associativity of ≢ | Theorem | ((p ≢ q) ≢ r) ≡ (p ≢ (q ≢ r)) | 1 |
| (3.18) | Mutual associativity of ≡ with ≢ | Theorem | ((p ≢ q) ≡ r) ≡ (p ≢ (q ≡ r)) | 1 |
| (3.19) | Mutual interchangeability of ≡ with ≢ | Theorem | (p ≢ (q ≡ r)) ≡ (p ≡ (q ≢ r)) | 1 |
| (3.2) | Symmetry of ≡ | Axiom | (p ≡ q) ≡ (q ≡ p) | 3 |
| (3.24) | Symmetry of ∨ | Axiom | p ∨ q ≡ q ∨ p | 1 |
| (3.25) | Associativity of ∨ | Axiom | (p ∨ q) ∨ r ≡ p ∨ (q ∨ r) | 1 |
| (3.26) | Idempotency of ∨ | Axiom | p ∨ p ≡ p | 1 |
| (3.27) | Distributivity of ∨ over ≡ | Axiom | p ∨ (q ≡ r) ≡ (p ∨ q ≡ p ∨ r) | 1 |
| (3.28) | Excluded middle；别名：LEM | Axiom | p ∨ ¬ p | 1 |
| (3.29) | Zero of ∨ | Theorem | p ∨ true ≡ true | 1 |
| (3.3) | Identity of ≡ | Axiom | true ≡ (q ≡ q) | 3 |
| (3.30) | Identity of ∨ | Theorem | p ∨ false ≡ p | 1 |
| (3.31) | Distributivity of ∨ over ∨ | Theorem | p ∨ (q ∨ r) ≡ (p ∨ q) ∨ (p ∨ r) | 1 |
| (3.32) | 原文未命名 | Theorem | p ∨ q ≡ (p ∨ ¬ q ≡ p) | 1 |
| (3.35) | Golden rule | Axiom | p ∧ q ≡ (p ≡ (q ≡ p ∨ q)) | 1 |
| (3.36) | Symmetry of ∧ | Theorem | p ∧ q ≡ q ∧ p | 1 |
| (3.37) | Associativity of ∧ | Theorem | (p ∧ q) ∧ r ≡ p ∧ (q ∧ r) | 1 |
| (3.38) | Idempotency of ∧ | Theorem | p ∧ p ≡ p | 1 |
| (3.39) | Identity of ∧ | Theorem | p ∧ true ≡ p | 1 |
| (3.4) | 原文未命名 | Theorem | true | 3 |
| (3.40) | Zero of ∧ | Theorem | p ∧ false ≡ false | 1 |
| (3.41) | Distributivity of ∧ over ∧ | Theorem | p ∧ (q ∧ r) ≡ (p ∧ q) ∧ (p ∧ r) | 1 |
| (3.42) | Contradiction | Theorem | p ∧ ¬ p ≡ false | 1 |
| (3.43a) | Absorption | Theorem | p ∧ (p ∨ q) ≡ p | 1 |
| (3.43b) | Absorption | Theorem | p ∨ (p ∧ q) ≡ p | 1 |
| (3.44a) | Absorption | Theorem | p ∧ (¬ p ∨ q) ≡ p ∧ q | 1 |
| (3.44b) | Absorption | Theorem | p ∨ (¬ p ∧ q) ≡ p ∨ q | 1 |
| (3.44c) | Absorption | Theorem | ¬ p ∧ (p ∨ q) ≡ ¬ p ∧ q | 1 |
| (3.44d) | Absorption | Theorem | ¬ p ∨ (p ∧ q) ≡ ¬ p ∨ q | 1 |
| (3.45) | Distributivity of ∨ over ∧ | Theorem | p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r) | 1 |
| (3.46) | Distributivity of ∧ over ∨ | Theorem | p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r) | 1 |
| (3.47a) | De Morgan | Theorem | ¬ (p ∧ q) ≡ ¬ p ∨ ¬ q | 1 |
| (3.47b) | De Morgan | Theorem | ¬ (p ∨ q) ≡ ¬ p ∧ ¬ q | 1 |
| (3.47c) | De Morgan | Theorem | ¬ (¬ p ∧ q) ≡ p ∨ ¬ q | 1 |
| (3.47d) | De Morgan | Theorem | ¬ (¬ p ∨ q) ≡ p ∧ ¬ q | 1 |
| (3.47e) | De Morgan dual of ∧ | Theorem | ¬ (¬ p ∧ ¬ q) ≡ p ∨ q | 1 |
| (3.47f) | De Morgan dual of ∨ | Theorem | ¬ (¬ p ∨ ¬ q) ≡ p ∧ q | 1 |
| (3.48) | 原文未命名 | Theorem | p ∧ q ≡ (p ∧ ¬ q ≡ ¬ p) | 1 |
| (3.49) | Semi-distributivity of ∧ over ≡ | Theorem | p ∧ (q ≡ r) ≡ (p ∧ q ≡ (p ∧ r ≡ p)) | 1 |
| (3.5) | Reflexivity of ≡ | Theorem | p ≡ p | 3 |
| (3.50) | Strong modus ponens for ≡ | Theorem | p ∧ (q ≡ p) ≡ p ∧ q | 1 |
| (3.51) | Replacement | Theorem | (p ≡ q) ∧ (r ≡ p) ≡ (p ≡ q) ∧ (r ≡ q) | 1 |
| (3.52) | Alternative definition of ≡ | Theorem | p ≡ (q ≡ (p ∧ q) ∨ (¬ p ∧ ¬ q)) | 1 |
| (3.53) | Exclusive or；别名：Alternative definition of ≢ | Theorem | (p ≢ q) ≡ (¬ p ∧ q) ∨ (p ∧ ¬ q) | 1 |
| (3.55) | 原文未命名 | Theorem | (p ∧ q) ∧ r ≡ (p ≡ (q ≡ (r ≡ (p ∨ q ≡ (q ∨ r ≡ (r ∨ p ≡ p ∨ (q ∨ r))))))) | 1 |
| (3.57) | Definition of ⇒ via ∨；别名：Definition of ⇒ from ∨、Definition of ⇒、Definition of implication | Axiom | p ⇒ q ≡ (p ∨ q ≡ q) | 1 |
| (3.57=) | Implication via ∨ | Lemma | (p ⇒ q) = (p ∨ q ≡ q) | 1 |
| (3.58) | Definition of ⇐；别名：Consequence | Axiom | p ⇐ q ≡ q ⇒ p | 1 |
| (3.59) | Material implication；别名：Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ ¬ p ∨ q | 1 |
| (3.60) | Definition of ⇒ via ∧；别名：Definition of ⇒ from ∧、Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ (p ∧ q ≡ p) | 1 |
| (3.60=) | Implication via ∧ | Lemma | (p ⇒ q) = (p ∧ q ≡ p) | 1 |
| (3.61) | Contrapositive | Theorem | p ⇒ q ≡ ¬ q ⇒ ¬ p | 1 |
| (3.61.1) | ¬-connection for ⇒ | Theorem | p ⇒ ¬ q ≡ q ⇒ ¬ p | 1 |
| (3.61.2) | ¬-connection for ⇒ | Theorem | ¬ p ⇒ q ≡ ¬ q ⇒ p | 1 |
| (3.62) | 原文未命名 | Theorem | p ⇒ (q ≡ r) ≡ (p ∧ q ≡ p ∧ r) | 1 |
| (3.63) | Distributivity of ⇒ over ≡ | Theorem | p ⇒ (q ≡ r) ≡ (p ⇒ q ≡ p ⇒ r) | 1 |
| (3.64) | Self-distributivity of ⇒ | Theorem | p ⇒ (q ⇒ r) ≡ (p ⇒ q) ⇒ (p ⇒ r) | 1 |
| (3.65) | Shunting | Theorem | p ∧ q ⇒ r ≡ p ⇒ (q ⇒ r) | 1 |
| (3.66) | Strong modus ponens | Theorem | p ∧ (p ⇒ q) ≡ p ∧ q | 1 |
| (3.67) | 原文未命名 | Theorem | p ∧ (q ⇒ p) ≡ p | 1 |
| (3.68) | 原文未命名 | Theorem | p ∨ (p ⇒ q) ≡ true | 1 |
| (3.69) | 原文未命名 | Theorem | p ∨ (q ⇒ p) ≡ q ⇒ p | 1 |
| (3.70) | 原文未命名 | Theorem | p ∨ q ⇒ p ∧ q ≡ (p ≡ q) | 1 |
| (3.71) | Reflexivity of ⇒ | Theorem | p ⇒ p | 1 |
| (3.72) | Right-zero of ⇒；别名：ex quodlibet verum | Theorem | p ⇒ true | 1 |
| (3.73) | Left-identity of ⇒ | Theorem | true ⇒ p ≡ p | 1 |
| (3.74) | Definition of ¬ from ⇒ | Theorem | p ⇒ false ≡ ¬ p | 1 |
| (3.75) | ex falso quodlibet | Theorem | false ⇒ p | 1 |
| (3.76a) | Weakening；别名：Strengthening | Theorem | p ⇒ p ∨ q | 1 |
| (3.76b) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p | 1 |
| (3.76c) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∨ q | 1 |
| (3.76d) | Weakening；别名：Strengthening | Theorem | p ∨ (q ∧ r) ⇒ p ∨ q | 1 |
| (3.76e) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∧ (q ∨ r) | 1 |
| (3.77) | Modus ponens | Theorem | p ∧ (p ⇒ q) ⇒ q | 1 |
| (3.78) | Case analysis | Theorem | (p ⇒ r) ∧ (q ⇒ r) ≡ p ∨ q ⇒ r | 1 |
| (3.79) | Case analysis | Theorem | (p ⇒ r) ∧ (¬ p ⇒ r) ≡ r | 1 |
| (3.8) | Definition of `false` | Axiom | false ≡ ¬ true | 1 |
| (3.80) | Mutual implication | Theorem | (p ⇒ q) ∧ (q ⇒ p) ≡ (p ≡ q) | 1 |
| (3.80.1) | Reflexivity of ⇒ wrt. ≡；别名：Reflexivity of ⇒ | Theorem | (p ≡ q) ⇒ (p ⇒ q) | 1 |
| (3.81) | Antisymmetry of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ p) ⇒ (p ≡ q) | 1 |
| (3.82.4) | Implication strengthening | Theorem | p ⇒ q ≡ p ⇒ p ∧ q | 1 |
| (3.82.5) | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 1 |
| (3.82a) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 1 |
| (3.82b) | Transitivity of ⇒ | Theorem | (p ≡ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 1 |
| (3.82c) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ≡ r) ⇒ (p ⇒ r) | 1 |
| (3.83) | Leibniz | Axiom | e = f ⇒ E[z ≔ e] = E[z ≔ f] | 1 |
| (3.83.1) | Leibniz | Corollary | d = e ⇒ f d = f e | 1 |
| (3.83.2) | Leibniz | Corollary | d = e ⇒ (p d ≡ p e) | 1 |
| (3.83.3) | Leibniz | Corollary | (d ≡ e) ⇒ (p d ≡ p e) | 1 |
| (3.83.4) | Leibniz | Corollary | (d ≡ e) ⇒ f d = f e | 1 |
| (3.84a) | Replacement | Theorem | e = f ∧ E[z ≔ e] ≡ e = f ∧ E[z ≔ f] | 1 |
| (3.84a≡) | Replacement | Theorem | (e ≡ f) ∧ E[z ≔ e] ≡ (e ≡ f) ∧ E[z ≔ f] | 1 |
| (3.84b) | Replacement | Theorem | e = f ⇒ E[z ≔ e] ≡ e = f ⇒ E[z ≔ f] | 1 |
| (3.84b≡) | Replacement | Theorem | (e ≡ f) ⇒ E[z ≔ e] ≡ (e ≡ f) ⇒ E[z ≔ f] | 1 |
| (3.84c) | Replacement | Theorem | q ∧ (e ≡ f) ⇒ E[z ≔ e] ≡ q ∧ (e ≡ f) ⇒ E[z ≔ f] | 1 |
| (3.84c) | Replacement | Theorem | q ∧ e = f ⇒ E[z ≔ e] ≡ q ∧ e = f ⇒ E[z ≔ f] | 1 |
| (3.85a) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] ≡ p ⇒ E[z ≔ true] | 1 |
| (3.85b) | Replace by `true` | Theorem | q ∧ p ⇒ E[z ≔ p] ≡ q ∧ p ⇒ E[z ≔ true] | 1 |
| (3.85c) | Replace by `false` | Theorem | ¬ p ⇒ E[z ≔ p] ≡ ¬ p ⇒ E[z ≔ false] | 1 |
| (3.85d) | Replace by `false` | Theorem | q ∧ ¬ p ⇒ E[z ≔ p] ≡ q ∧ ¬ p ⇒ E[z ≔ false] | 1 |
| (3.85e) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] = E[z ≔ true] | 1 |
| (3.86a) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ≡ E[z ≔ false] ⇒ p | 1 |
| (3.86b) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ∨ q ≡ E[z ≔ false] ⇒ p ∨ q | 1 |
| (3.87) | Replace by `true` | Theorem | p ∧ E[z ≔ p] ≡ p ∧ E[z ≔ true] | 1 |
| (3.87.1) | Abbreviated replace by `false` | Theorem | ¬ p ∧ E ≡ ¬ p ∧ E[p ≔ false] | 1 |
| (3.87.1) | Abbreviated replace by `true` | Theorem | p ∧ E ≡ p ∧ E[p ≔ true] | 1 |
| (3.88) | Replace by `false` | Theorem | p ∨ E[z ≔ p] ≡ p ∨ E[z ≔ false] | 1 |
| (3.89) | Shannon | Theorem | E[z ≔ p] ≡ (p ∧ E[z ≔ true]) ∨ (¬ p ∧ E[z ≔ false]) | 1 |
| (3.9) | Commutativity of ¬ with ≡ | Axiom | ¬ (p ≡ q) ≡ (¬ p ≡ q) | 1 |
| (4.3) | Left-monotonicity of ∧；别名：Monotonicity of ∧ | Theorem | (p ⇒ q) ⇒ (p ∧ r ⇒ q ∧ r) | 1 |
| 未编号 · 00099d | ∧₆-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ (u ⇒ p ∧ (q ∧ (r ∧ (s ∧ (t ∧ u))))))))) | 1 |
| 未编号 · 0102c0 | Identity of ≢ | Theorem | (p ≢ false) ≡ p | 1 |
| 未编号 · 0440d9 | Equivalence enrichment | Theorem | (p ≡ q) ⇒ ((p ⇒ r) ⇒ (p ⇒ q ∧ r)) | 1 |
| 未编号 · 08e6b7 | Monotonicity of ∧ | Theorem | (p ⇒ p') ⇒ ((q ⇒ q') ⇒ (p ∧ q ⇒ p' ∧ q')) | 1 |
| 未编号 · 0a2238 | Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ (p ∨ r ⇒ q ∨ r) | 1 |
| 未编号 · 0f2ed1 | Contributing conjunct to ≡ | Theorem | (p ∧ q ≡ r) ∧ p ⇒ (q ≡ r) | 1 |
| 未编号 · 15c06f | Transitivity of = | Theorem | e = f ∧ f = g ⇒ e = g | 1 |
| 未编号 · 23785d | Adding consequent to ∧ | Theorem | (p ⇒ q) ⇒ (p ∧ r ⇒ p ∧ (q ∧ r)) | 1 |
| 未编号 · 24a375 | Definition of ≡ | Axiom | (p ≡ q) = (p = q) | 3 |
| 未编号 · 25737b | Co-residual of ∨ | Theorem | q ⇒ x ∨ p ≡ ¬ p ∧ q ⇒ x | 1 |
| 未编号 · 2977f6 | Proof by contradiction | Theorem | ¬ p ⇒ false ≡ p | 1 |
| 未编号 · 29a570 | ∧₅-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ p ∧ (q ∧ (r ∧ (s ∧ t))))))) | 2 |
| 未编号 · 2b72bc | Definition of ∧ | Lemma | (p ∧ q) = (p ≡ (q ≡ p ∨ q)) | 1 |
| 未编号 · 31d3fa | Preserving conjunct after ⇒ | Theorem | p ∧ q ⇒ r ≡ p ∧ q ⇒ p ∧ r | 1 |
| 未编号 · 3aa5d0 | Monotonicity of ⇒；别名：Right-monotonicity of ⇒ | Theorem | (p ⇒ q) ⇒ ((r ⇒ p) ⇒ (r ⇒ q)) | 1 |
| 未编号 · 478166 | Right-distributivity of ⇒ over ∧₃ | Theorem | p ⇒ q ∧ (r ∧ s) ≡ (p ⇒ q) ∧ ((p ⇒ r) ∧ (p ⇒ s)) | 1 |
| 未编号 · 5aae8c | Definition of ≠ | Theorem | x ≠ y ≡ (x = y ≡ false) | 3 |
| 未编号 · 5f6c2d | Symmetry of ≠ | Theorem | x ≠ y ≡ y ≠ x | 3 |
| 未编号 · 648d61 | Assignment | Axiom | P[x ≔ E] ⇒⁅ (x := E) ⁆ P | 2 |
| 未编号 · 70f478 | ∧-Introduction | Theorem | p ⇒ (q ⇒ p ∧ q) | 1 |
| 未编号 · 771122 | ∧₄-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ p ∧ (q ∧ (r ∧ s))))) | 1 |
| 未编号 · 79d90c | Left-monotonicity of ∨；别名：Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ (p ∨ r ⇒ q ∨ r) | 1 |
| 未编号 · 86a35c | Abbreviated replacement in ∧；别名：Abbreviated replacement | Theorem | P ∧ x = E ≡ P[x ≔ E] ∧ x = E | 1 |
| 未编号 · 8876d6 | Case shuffling | Theorem | (p ∨ q) ∧ (¬ p ∨ r) ≡ (p ∧ r) ∨ (¬ p ∧ q) | 1 |
| 未编号 · 8a90bd | Replace variable by `true` | Theorem | p ⇒ E ≡ p ⇒ E[p ≔ true] | 1 |
| 未编号 · 90956c | ⇒-Introduction | Primitive inference rule | ( p ⊦ q ) ⊦ p ⇒ q | 1 |
| 未编号 · 94d527 | Weakening；别名：Strengthening | Theorem | (p ∨ q) ∧ r ⇒ p ∨ (q ∧ r) | 1 |
| 未编号 · 94f30a | ∧₇-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ (u ⇒ (v ⇒ p ∧ (q ∧ (r ∧ (s ∧ (t ∧ (u ∧ v))))))))))) | 1 |
| 未编号 · 957cfc | Sequence | Primitive inference rule | P ⇒⁅ C₁ ⁆ Q , Q ⇒⁅ C₂ ⁆ R ⊦ P ⇒⁅ (C₁ ⍮ C₂) ⁆ R | 2 |
| 未编号 · 9941d0 | ∧₃-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ p ∧ (q ∧ r))) | 1 |
| 未编号 · 9cb45b | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 1 |
| 未编号 · 9cd73a | Definition of ≠ | Axiom | x ≠ y ≡ ¬ (x = y) | 3 |
| 未编号 · 9f0ebf | Replace variable by `false` | Theorem | ¬ p ⇒ E ≡ ¬ p ⇒ E[p ≔ false] | 1 |
| 未编号 · a2a32a | Disjunction as implication | Lemma | p ∨ q ≡ ¬ p ⇒ q | 1 |
| 未编号 · a3c539 | Associativity of ∧ | Axiom | (p ∧ q) ∧ r ≡ p ∧ (q ∧ r) | 2 |
| 未编号 · b103d7 | Right-distributivity of ⇒ over ∧₄ | Theorem | p ⇒ q ∧ (r ∧ (s ∧ t)) ≡ (p ⇒ q) ∧ ((p ⇒ r) ∧ ((p ⇒ s) ∧ (p ⇒ t))) | 1 |
| 未编号 · b77dec | Abbreviated replacement in ⇒；别名：Abbreviated replacement | Theorem | x = E ⇒ P ≡ x = E ⇒ P[x ≔ E] | 1 |
| 未编号 · b8a06d | Exclusive or implies inclusive | Theorem | (p ≢ q) ⇒ p ∨ q | 1 |
| 未编号 · bb97a0 | Negation of ≠ | Theorem | ¬ (x ≠ y) ≡ x = y | 3 |
| 未编号 · bdf087 | Antitonicity of ¬ | Theorem | (p ⇒ q) ⇒ (¬ q ⇒ ¬ p) | 1 |
| 未编号 · ce5ae3 | Residual of ∧ | Theorem | x ∧ p ⇒ q ≡ x ⇒ (p ⇒ q) | 1 |
| 未编号 · e18e5f | Irreflexivity of ≠ | Theorem | x ≠ x ≡ false | 3 |
| 未编号 · e364a1 | Antitonicity of ⇒；别名：Left-antitonicity of ⇒ | Theorem | (p ⇒ q) ⇒ ((q ⇒ r) ⇒ (p ⇒ r)) | 1 |
| 未编号 · f1d779 | Cancellation of ¬ | Theorem | (¬ p ≡ ¬ q) = (p ≡ q) | 1 |
| 未编号 · f40d7f | Symmetry of ∧ | Axiom | p ∧ q ≡ q ∧ p | 2 |
| 未编号 · f4948f | Case shuffling | Theorem | (p ⇒ q) ∧ (¬ p ⇒ r) ≡ (p ∧ q) ∨ (¬ p ∧ r) | 1 |
| 未编号 · f695b0 | Associativity of ⍮ | Axiom | ((S₁ ⍮ S₂) ⍮ S₃) = (S₁ ⍮ (S₂ ⍮ S₃)) | 2 |
| 未编号 · f8a195 | Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ ((r ⇒ s) ⇒ (p ∨ r ⇒ q ∨ s)) | 2 |
| 未编号 · f93139 | Irreflexivity of ≠ | Theorem | ¬ (x ≠ x) | 3 |

## 2026 · Week 2

对应 notebook：[2026 Ex2.1 · 命题演算入门 · 预载列表](http://130.113.68.214:16011/), [2026 Ex2.2 · 析取 · 预载列表](http://130.113.68.214:16012/), [2026 Ex2.3 · 合取 · 预载列表](http://130.113.68.214:16013/), [2026 Ex2.4 · 命题演算：蕴含 · 预载列表](http://130.113.68.214:16014/), [2026 Ex2.5 · 骑士与骗子 · 预载列表](http://130.113.68.214:16015/), [2026 Ex2.6 · 布尔变量赋值命令 · 预载列表](http://130.113.68.214:16016/), [2026 H4 · 命题演算入门 · 预载列表](http://130.113.68.214:16017/), [2026 H5 · 命题演算 · 预载列表](http://130.113.68.214:16018/)

| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |
|---|---|---|---|---:|
| (1.2) | Reflexivity of = | Axiom | x = x | 9 |
| (1.3) | Symmetry of = | Axiom | (x = y) = (y = x) | 9 |
| (1.4) | Transitivity of = | Derived inference rule | X = Y , Y = Z ⊦ X = Z | 9 |
| (1.5) | Leibniz | Derived inference rule | X = Y ⊦ E[z ≔ X] = E[z ≔ Y] | 9 |
| (15.13) | Unary minus | Axiom | a + - a = 0 | 1 |
| (15.14) | Subtraction | Axiom | a - b = a + - b | 1 |
| (15.17) | Self-inverse of unary minus | Theorem | - (- a) = a | 1 |
| (15.18) | Fixpoint of unary minus | Theorem | - 0 = 0 | 1 |
| (15.19) | Distributivity of unary minus over + | Theorem | - (a + b) = - a + - b | 1 |
| (15.1a) | Associativity of + | Axiom | (a + b) + c = a + (b + c) | 1 |
| (15.1b) | Associativity of · | Axiom | (a · b) · c = a · (b · c) | 1 |
| (15.20) | Negation as multiplication | Theorem | - a = - 1 · a | 1 |
| (15.21) | 原文未命名 | Theorem | - a · b = a · - b | 1 |
| (15.22) | Commutativity of unary minus with · | Theorem | a · - b = - (a · b) | 1 |
| (15.23) | 原文未命名 | Theorem | - a · - b = a · b | 1 |
| (15.24) | Right-identity of - | Theorem | a - 0 = a | 1 |
| (15.24a) | Subtraction of subtraction | Theorem | a - (b - c) = (a - b) + c | 1 |
| (15.25) | 原文未命名 | Theorem | (a - b) + (c - d) = (a + c) - (b + d) | 1 |
| (15.25a) | Mutual associativity of + and - | Theorem | a + (b - c) = (a + b) - c | 1 |
| (15.25b) | Subtraction of addition | Theorem | a - (b + c) = (a - b) - c | 1 |
| (15.25c) | Cancellation across added subtractions | Theorem | (a - b) + (b - c) = a - c | 1 |
| (15.26) | 原文未命名 | Theorem | (a - b) - (c - d) = (a + d) - (b + c) | 1 |
| (15.27) | 原文未命名 | Theorem | (a - b) · (c - d) = (a · c + b · d) - (a · d + b · c) | 1 |
| (15.29) | Distributivity of · over - | Theorem | (a - b) · c = a · c - b · c | 1 |
| (15.2a) | Symmetry of + | Axiom | a + b = b + a | 1 |
| (15.2b) | Symmetry of · | Axiom | a · b = b · a | 1 |
| (15.3) | Additive identity；别名：Identity of + | Axiom | 0 + a = a | 1 |
| (15.4) | Multiplicative identity；别名：Identity of · | Axiom | 1 · a = a | 1 |
| (15.5) | Distributivity of · over + | Axiom | a · (b + c) = a · b + a · c | 1 |
| (15.7) | Cancellation of · | Axiom | c ≠ 0 ⇒ (c · a = c · b ≡ a = b) | 1 |
| (15.8) | Cancellation of + | Axiom | a + b = a + c ≡ b = c | 1 |
| (15.9) | Zero of · | Axiom | a · 0 = 0 | 1 |
| (3.1) | Associativity of ≡ | Axiom | ((p ≡ q) ≡ r) ≡ (p ≡ (q ≡ r)) | 6 |
| (3.10) | Definition of ≢ | Axiom | (p ≢ q) ≡ ¬ (p ≡ q) | 6 |
| (3.11) | ¬ connection | Theorem | ¬ p ≡ (q ≡ (p ≡ ¬ q)) | 6 |
| (3.12) | Double negation | Theorem | ¬ (¬ p) ≡ p | 6 |
| (3.13) | Negation of `false` | Theorem | ¬ false ≡ true | 6 |
| (3.14) | 原文未命名 | Theorem | (p ≢ q) ≡ (¬ p ≡ q) | 6 |
| (3.15) | Definition of ¬ from ≡ | Theorem | ¬ p ≡ (p ≡ false) | 6 |
| (3.16) | Symmetry of ≢ | Theorem | (p ≢ q) ≡ (q ≢ p) | 6 |
| (3.17) | Associativity of ≢ | Theorem | ((p ≢ q) ≢ r) ≡ (p ≢ (q ≢ r)) | 6 |
| (3.18) | Mutual associativity of ≡ with ≢ | Theorem | ((p ≢ q) ≡ r) ≡ (p ≢ (q ≡ r)) | 6 |
| (3.19) | Mutual interchangeability of ≡ with ≢ | Theorem | (p ≢ (q ≡ r)) ≡ (p ≡ (q ≢ r)) | 6 |
| (3.2) | Symmetry of ≡ | Axiom | (p ≡ q) ≡ (q ≡ p) | 6 |
| (3.24) | Symmetry of ∨ | Axiom | p ∨ q ≡ q ∨ p | 5 |
| (3.25) | Associativity of ∨ | Axiom | (p ∨ q) ∨ r ≡ p ∨ (q ∨ r) | 5 |
| (3.26) | Idempotency of ∨ | Axiom | p ∨ p ≡ p | 5 |
| (3.27) | Distributivity of ∨ over ≡ | Axiom | p ∨ (q ≡ r) ≡ (p ∨ q ≡ p ∨ r) | 5 |
| (3.28) | Excluded middle；别名：LEM | Axiom | p ∨ ¬ p | 5 |
| (3.29) | Zero of ∨ | Theorem | p ∨ true ≡ true | 5 |
| (3.3) | Identity of ≡ | Axiom | true ≡ (q ≡ q) | 6 |
| (3.30) | Identity of ∨ | Theorem | p ∨ false ≡ p | 5 |
| (3.31) | Distributivity of ∨ over ∨ | Theorem | p ∨ (q ∨ r) ≡ (p ∨ q) ∨ (p ∨ r) | 5 |
| (3.32) | 原文未命名 | Theorem | p ∨ q ≡ (p ∨ ¬ q ≡ p) | 5 |
| (3.35) | Golden rule | Axiom | p ∧ q ≡ (p ≡ (q ≡ p ∨ q)) | 4 |
| (3.36) | Symmetry of ∧ | Theorem | p ∧ q ≡ q ∧ p | 4 |
| (3.37) | Associativity of ∧ | Theorem | (p ∧ q) ∧ r ≡ p ∧ (q ∧ r) | 4 |
| (3.38) | Idempotency of ∧ | Theorem | p ∧ p ≡ p | 4 |
| (3.39) | Identity of ∧ | Theorem | p ∧ true ≡ p | 4 |
| (3.4) | 原文未命名 | Theorem | true | 6 |
| (3.40) | Zero of ∧ | Theorem | p ∧ false ≡ false | 4 |
| (3.41) | Distributivity of ∧ over ∧ | Theorem | p ∧ (q ∧ r) ≡ (p ∧ q) ∧ (p ∧ r) | 4 |
| (3.42) | Contradiction | Theorem | p ∧ ¬ p ≡ false | 4 |
| (3.43a) | Absorption | Theorem | p ∧ (p ∨ q) ≡ p | 4 |
| (3.43b) | Absorption | Theorem | p ∨ (p ∧ q) ≡ p | 4 |
| (3.44a) | Absorption | Theorem | p ∧ (¬ p ∨ q) ≡ p ∧ q | 4 |
| (3.44b) | Absorption | Theorem | p ∨ (¬ p ∧ q) ≡ p ∨ q | 4 |
| (3.44c) | Absorption | Theorem | ¬ p ∧ (p ∨ q) ≡ ¬ p ∧ q | 4 |
| (3.44d) | Absorption | Theorem | ¬ p ∨ (p ∧ q) ≡ ¬ p ∨ q | 4 |
| (3.45) | Distributivity of ∨ over ∧ | Theorem | p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r) | 4 |
| (3.46) | Distributivity of ∧ over ∨ | Theorem | p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r) | 4 |
| (3.47a) | De Morgan | Theorem | ¬ (p ∧ q) ≡ ¬ p ∨ ¬ q | 4 |
| (3.47b) | De Morgan | Theorem | ¬ (p ∨ q) ≡ ¬ p ∧ ¬ q | 4 |
| (3.47c) | De Morgan | Theorem | ¬ (¬ p ∧ q) ≡ p ∨ ¬ q | 4 |
| (3.47d) | De Morgan | Theorem | ¬ (¬ p ∨ q) ≡ p ∧ ¬ q | 4 |
| (3.47e) | De Morgan dual of ∧ | Theorem | ¬ (¬ p ∧ ¬ q) ≡ p ∨ q | 4 |
| (3.47f) | De Morgan dual of ∨ | Theorem | ¬ (¬ p ∨ ¬ q) ≡ p ∧ q | 4 |
| (3.48) | 原文未命名 | Theorem | p ∧ q ≡ (p ∧ ¬ q ≡ ¬ p) | 4 |
| (3.49) | Semi-distributivity of ∧ over ≡ | Theorem | p ∧ (q ≡ r) ≡ (p ∧ q ≡ (p ∧ r ≡ p)) | 4 |
| (3.5) | Reflexivity of ≡ | Theorem | p ≡ p | 6 |
| (3.50) | Strong modus ponens for ≡ | Theorem | p ∧ (q ≡ p) ≡ p ∧ q | 4 |
| (3.51) | Replacement | Theorem | (p ≡ q) ∧ (r ≡ p) ≡ (p ≡ q) ∧ (r ≡ q) | 4 |
| (3.52) | Alternative definition of ≡ | Theorem | p ≡ (q ≡ (p ∧ q) ∨ (¬ p ∧ ¬ q)) | 4 |
| (3.53) | Exclusive or；别名：Alternative definition of ≢ | Theorem | (p ≢ q) ≡ (¬ p ∧ q) ∨ (p ∧ ¬ q) | 4 |
| (3.55) | 原文未命名 | Theorem | (p ∧ q) ∧ r ≡ (p ≡ (q ≡ (r ≡ (p ∨ q ≡ (q ∨ r ≡ (r ∨ p ≡ p ∨ (q ∨ r))))))) | 4 |
| (3.57) | Definition of ⇒ via ∨；别名：Definition of ⇒ from ∨、Definition of ⇒、Definition of implication | Axiom | p ⇒ q ≡ (p ∨ q ≡ q) | 2 |
| (3.57=) | Implication via ∨ | Lemma | (p ⇒ q) = (p ∨ q ≡ q) | 2 |
| (3.58) | Definition of ⇐；别名：Consequence | Axiom | p ⇐ q ≡ q ⇒ p | 2 |
| (3.59) | Material implication；别名：Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ ¬ p ∨ q | 2 |
| (3.60) | Definition of ⇒ via ∧；别名：Definition of ⇒ from ∧、Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ (p ∧ q ≡ p) | 2 |
| (3.60=) | Implication via ∧ | Lemma | (p ⇒ q) = (p ∧ q ≡ p) | 2 |
| (3.61) | Contrapositive | Theorem | p ⇒ q ≡ ¬ q ⇒ ¬ p | 2 |
| (3.61.1) | ¬-connection for ⇒ | Theorem | p ⇒ ¬ q ≡ q ⇒ ¬ p | 2 |
| (3.61.2) | ¬-connection for ⇒ | Theorem | ¬ p ⇒ q ≡ ¬ q ⇒ p | 2 |
| (3.62) | 原文未命名 | Theorem | p ⇒ (q ≡ r) ≡ (p ∧ q ≡ p ∧ r) | 2 |
| (3.63) | Distributivity of ⇒ over ≡ | Theorem | p ⇒ (q ≡ r) ≡ (p ⇒ q ≡ p ⇒ r) | 2 |
| (3.64) | Self-distributivity of ⇒ | Theorem | p ⇒ (q ⇒ r) ≡ (p ⇒ q) ⇒ (p ⇒ r) | 2 |
| (3.65) | Shunting | Theorem | p ∧ q ⇒ r ≡ p ⇒ (q ⇒ r) | 2 |
| (3.66) | Strong modus ponens | Theorem | p ∧ (p ⇒ q) ≡ p ∧ q | 2 |
| (3.67) | 原文未命名 | Theorem | p ∧ (q ⇒ p) ≡ p | 2 |
| (3.68) | 原文未命名 | Theorem | p ∨ (p ⇒ q) ≡ true | 2 |
| (3.69) | 原文未命名 | Theorem | p ∨ (q ⇒ p) ≡ q ⇒ p | 2 |
| (3.70) | 原文未命名 | Theorem | p ∨ q ⇒ p ∧ q ≡ (p ≡ q) | 2 |
| (3.71) | Reflexivity of ⇒ | Theorem | p ⇒ p | 2 |
| (3.72) | Right-zero of ⇒；别名：ex quodlibet verum | Theorem | p ⇒ true | 2 |
| (3.73) | Left-identity of ⇒ | Theorem | true ⇒ p ≡ p | 2 |
| (3.74) | Definition of ¬ from ⇒ | Theorem | p ⇒ false ≡ ¬ p | 2 |
| (3.75) | ex falso quodlibet | Theorem | false ⇒ p | 2 |
| (3.76a) | Weakening；别名：Strengthening | Theorem | p ⇒ p ∨ q | 2 |
| (3.76b) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p | 2 |
| (3.76c) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∨ q | 2 |
| (3.76d) | Weakening；别名：Strengthening | Theorem | p ∨ (q ∧ r) ⇒ p ∨ q | 2 |
| (3.76e) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∧ (q ∨ r) | 2 |
| (3.77) | Modus ponens | Theorem | p ∧ (p ⇒ q) ⇒ q | 2 |
| (3.78) | Case analysis | Theorem | (p ⇒ r) ∧ (q ⇒ r) ≡ p ∨ q ⇒ r | 2 |
| (3.79) | Case analysis | Theorem | (p ⇒ r) ∧ (¬ p ⇒ r) ≡ r | 2 |
| (3.8) | Definition of `false` | Axiom | false ≡ ¬ true | 6 |
| (3.80) | Mutual implication | Theorem | (p ⇒ q) ∧ (q ⇒ p) ≡ (p ≡ q) | 2 |
| (3.80.1) | Reflexivity of ⇒ wrt. ≡；别名：Reflexivity of ⇒ | Theorem | (p ≡ q) ⇒ (p ⇒ q) | 2 |
| (3.81) | Antisymmetry of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ p) ⇒ (p ≡ q) | 2 |
| (3.82.4) | Implication strengthening | Theorem | p ⇒ q ≡ p ⇒ p ∧ q | 2 |
| (3.82.5) | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 2 |
| (3.82a) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 2 |
| (3.82b) | Transitivity of ⇒ | Theorem | (p ≡ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 2 |
| (3.82c) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ≡ r) ⇒ (p ⇒ r) | 2 |
| (3.83) | Leibniz | Axiom | e = f ⇒ E[z ≔ e] = E[z ≔ f] | 1 |
| (3.83.1) | Leibniz | Corollary | d = e ⇒ f d = f e | 1 |
| (3.83.2) | Leibniz | Corollary | d = e ⇒ (p d ≡ p e) | 1 |
| (3.83.3) | Leibniz | Corollary | (d ≡ e) ⇒ (p d ≡ p e) | 1 |
| (3.83.4) | Leibniz | Corollary | (d ≡ e) ⇒ f d = f e | 1 |
| (3.84a) | Replacement | Theorem | e = f ∧ E[z ≔ e] ≡ e = f ∧ E[z ≔ f] | 1 |
| (3.84a≡) | Replacement | Theorem | (e ≡ f) ∧ E[z ≔ e] ≡ (e ≡ f) ∧ E[z ≔ f] | 1 |
| (3.84b) | Replacement | Theorem | e = f ⇒ E[z ≔ e] ≡ e = f ⇒ E[z ≔ f] | 1 |
| (3.84b≡) | Replacement | Theorem | (e ≡ f) ⇒ E[z ≔ e] ≡ (e ≡ f) ⇒ E[z ≔ f] | 1 |
| (3.84c) | Replacement | Theorem | q ∧ (e ≡ f) ⇒ E[z ≔ e] ≡ q ∧ (e ≡ f) ⇒ E[z ≔ f] | 1 |
| (3.84c) | Replacement | Theorem | q ∧ e = f ⇒ E[z ≔ e] ≡ q ∧ e = f ⇒ E[z ≔ f] | 1 |
| (3.85a) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] ≡ p ⇒ E[z ≔ true] | 1 |
| (3.85b) | Replace by `true` | Theorem | q ∧ p ⇒ E[z ≔ p] ≡ q ∧ p ⇒ E[z ≔ true] | 1 |
| (3.85c) | Replace by `false` | Theorem | ¬ p ⇒ E[z ≔ p] ≡ ¬ p ⇒ E[z ≔ false] | 1 |
| (3.85d) | Replace by `false` | Theorem | q ∧ ¬ p ⇒ E[z ≔ p] ≡ q ∧ ¬ p ⇒ E[z ≔ false] | 1 |
| (3.85e) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] = E[z ≔ true] | 1 |
| (3.86a) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ≡ E[z ≔ false] ⇒ p | 1 |
| (3.86b) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ∨ q ≡ E[z ≔ false] ⇒ p ∨ q | 1 |
| (3.87) | Replace by `true` | Theorem | p ∧ E[z ≔ p] ≡ p ∧ E[z ≔ true] | 1 |
| (3.87.1) | Abbreviated replace by `false` | Theorem | ¬ p ∧ E ≡ ¬ p ∧ E[p ≔ false] | 1 |
| (3.87.1) | Abbreviated replace by `true` | Theorem | p ∧ E ≡ p ∧ E[p ≔ true] | 1 |
| (3.88) | Replace by `false` | Theorem | p ∨ E[z ≔ p] ≡ p ∨ E[z ≔ false] | 1 |
| (3.89) | Shannon | Theorem | E[z ≔ p] ≡ (p ∧ E[z ≔ true]) ∨ (¬ p ∧ E[z ≔ false]) | 1 |
| (3.9) | Commutativity of ¬ with ≡ | Axiom | ¬ (p ≡ q) ≡ (¬ p ≡ q) | 6 |
| 未编号 · 0102c0 | Identity of ≢ | Theorem | (p ≢ false) ≡ p | 6 |
| 未编号 · 15c06f | Transitivity of = | Theorem | e = f ∧ f = g ⇒ e = g | 1 |
| 未编号 · 24a375 | Definition of ≡ | Axiom | (p ≡ q) = (p = q) | 6 |
| 未编号 · 2b72bc | Definition of ∧ | Lemma | (p ∧ q) = (p ≡ (q ≡ p ∨ q)) | 4 |
| 未编号 · 648d61 | Assignment | Axiom | P[x ≔ E] ⇒⁅ (x := E) ⁆ P | 1 |
| 未编号 · 86a35c | Abbreviated replacement in ∧；别名：Abbreviated replacement | Theorem | P ∧ x = E ≡ P[x ≔ E] ∧ x = E | 1 |
| 未编号 · 8a90bd | Replace variable by `true` | Theorem | p ⇒ E ≡ p ⇒ E[p ≔ true] | 1 |
| 未编号 · 957cfc | Sequence | Primitive inference rule | P ⇒⁅ C₁ ⁆ Q , Q ⇒⁅ C₂ ⁆ R ⊦ P ⇒⁅ (C₁ ⍮ C₂) ⁆ R | 1 |
| 未编号 · 9f0ebf | Replace variable by `false` | Theorem | ¬ p ⇒ E ≡ ¬ p ⇒ E[p ≔ false] | 1 |
| 未编号 · b77dec | Abbreviated replacement in ⇒；别名：Abbreviated replacement | Theorem | x = E ⇒ P ≡ x = E ⇒ P[x ≔ E] | 1 |
| 未编号 · f1d779 | Cancellation of ¬ | Theorem | (¬ p ≡ ¬ q) = (p ≡ q) | 6 |
| 未编号 · f695b0 | Associativity of ⍮ | Axiom | ((S₁ ⍮ S₂) ⍮ S₃) = (S₁ ⍮ (S₂ ⍮ S₃)) | 1 |

## 2026 · Week 3

对应 notebook：[2026 H6 · 自然数与归纳 · 预载列表](http://130.113.68.214:16021/), [2026 Ex3.1 · 自然数归纳：加法与乘法 · 预载列表](http://130.113.68.214:16022/), [2026 Ex3.2 · 自然数截断减法 · 预载列表](http://130.113.68.214:16023/), [2026 Ex3.3 · 自然数的相等与前驱 · 预载列表](http://130.113.68.214:16024/), [2026 Ex3.4 · 自然数分类证明 · 预载列表](http://130.113.68.214:16025/), [2026 H8.1 · Leibniz 与替换 · 预载列表](http://130.113.68.214:16028/), [2026 H8.2 · 结构化证明 · 预载列表](http://130.113.68.214:16029/), [2026 H6 · proved notebook theorems](http://130.113.68.214:16021/), [2026 Ex3.1 · proved notebook theorems](http://130.113.68.214:16022/), [2026 Ex3.2 · proved notebook theorems](http://130.113.68.214:16023/), [2026 Ex3.3 · proved notebook theorems](http://130.113.68.214:16024/), [2026 Ex3.4 · proved notebook theorems](http://130.113.68.214:16025/)

| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |
|---|---|---|---|---:|
| (1.2) | Reflexivity of = | Axiom | x = x | 8 |
| (1.3) | Symmetry of = | Axiom | (x = y) = (y = x) | 8 |
| (1.4) | Transitivity of = | Derived inference rule | X = Y , Y = Z ⊦ X = Z | 8 |
| (1.5) | Leibniz | Derived inference rule | X = Y ⊦ E[z ≔ X] = E[z ≔ Y] | 8 |
| (15.13) | Unary minus | Axiom | a + - a = 0 | 1 |
| (15.14) | Subtraction | Axiom | a - b = a + - b | 1 |
| (15.17) | Self-inverse of unary minus | Theorem | - (- a) = a | 1 |
| (15.18) | Fixpoint of unary minus | Theorem | - 0 = 0 | 1 |
| (15.19) | Distributivity of unary minus over + | Theorem | - (a + b) = - a + - b | 1 |
| (15.1a) | Associativity of + | Axiom | (a + b) + c = a + (b + c) | 1 |
| (15.1b) | Associativity of · | Axiom | (a · b) · c = a · (b · c) | 1 |
| (15.20) | Negation as multiplication | Theorem | - a = - 1 · a | 1 |
| (15.21) | 原文未命名 | Theorem | - a · b = a · - b | 1 |
| (15.22) | Commutativity of unary minus with · | Theorem | a · - b = - (a · b) | 1 |
| (15.23) | 原文未命名 | Theorem | - a · - b = a · b | 1 |
| (15.24) | Right-identity of - | Theorem | a - 0 = a | 1 |
| (15.24a) | Subtraction of subtraction | Theorem | a - (b - c) = (a - b) + c | 1 |
| (15.25) | 原文未命名 | Theorem | (a - b) + (c - d) = (a + c) - (b + d) | 1 |
| (15.25a) | Mutual associativity of + and - | Theorem | a + (b - c) = (a + b) - c | 1 |
| (15.25b) | Subtraction of addition | Theorem | a - (b + c) = (a - b) - c | 1 |
| (15.25c) | Cancellation across added subtractions | Theorem | (a - b) + (b - c) = a - c | 1 |
| (15.26) | 原文未命名 | Theorem | (a - b) - (c - d) = (a + d) - (b + c) | 1 |
| (15.27) | 原文未命名 | Theorem | (a - b) · (c - d) = (a · c + b · d) - (a · d + b · c) | 1 |
| (15.29) | Distributivity of · over - | Theorem | (a - b) · c = a · c - b · c | 1 |
| (15.2a) | Symmetry of + | Axiom | a + b = b + a | 1 |
| (15.2b) | Symmetry of · | Axiom | a · b = b · a | 1 |
| (15.3) | Additive identity；别名：Identity of + | Axiom | 0 + a = a | 1 |
| (15.4) | Multiplicative identity；别名：Identity of · | Axiom | 1 · a = a | 1 |
| (15.5) | Distributivity of · over + | Axiom | a · (b + c) = a · b + a · c | 1 |
| (15.7) | Cancellation of · | Axiom | c ≠ 0 ⇒ (c · a = c · b ≡ a = b) | 1 |
| (15.8) | Cancellation of + | Axiom | a + b = a + c ≡ b = c | 1 |
| (15.9) | Zero of · | Axiom | a · 0 = 0 | 1 |
| (3.1) | Associativity of ≡ | Axiom | ((p ≡ q) ≡ r) ≡ (p ≡ (q ≡ r)) | 4 |
| (3.10) | Definition of ≢ | Axiom | (p ≢ q) ≡ ¬ (p ≡ q) | 4 |
| (3.11) | ¬ connection | Theorem | ¬ p ≡ (q ≡ (p ≡ ¬ q)) | 4 |
| (3.12) | Double negation | Theorem | ¬ (¬ p) ≡ p | 4 |
| (3.13) | Negation of `false` | Theorem | ¬ false ≡ true | 4 |
| (3.14) | 原文未命名 | Theorem | (p ≢ q) ≡ (¬ p ≡ q) | 4 |
| (3.15) | Definition of ¬ from ≡ | Theorem | ¬ p ≡ (p ≡ false) | 4 |
| (3.16) | Symmetry of ≢ | Theorem | (p ≢ q) ≡ (q ≢ p) | 4 |
| (3.17) | Associativity of ≢ | Theorem | ((p ≢ q) ≢ r) ≡ (p ≢ (q ≢ r)) | 4 |
| (3.18) | Mutual associativity of ≡ with ≢ | Theorem | ((p ≢ q) ≡ r) ≡ (p ≢ (q ≡ r)) | 4 |
| (3.19) | Mutual interchangeability of ≡ with ≢ | Theorem | (p ≢ (q ≡ r)) ≡ (p ≡ (q ≢ r)) | 4 |
| (3.2) | Symmetry of ≡ | Axiom | (p ≡ q) ≡ (q ≡ p) | 4 |
| (3.24) | Symmetry of ∨ | Axiom | p ∨ q ≡ q ∨ p | 4 |
| (3.25) | Associativity of ∨ | Axiom | (p ∨ q) ∨ r ≡ p ∨ (q ∨ r) | 4 |
| (3.26) | Idempotency of ∨ | Axiom | p ∨ p ≡ p | 4 |
| (3.27) | Distributivity of ∨ over ≡ | Axiom | p ∨ (q ≡ r) ≡ (p ∨ q ≡ p ∨ r) | 4 |
| (3.28) | Excluded middle；别名：LEM | Axiom | p ∨ ¬ p | 4 |
| (3.29) | Zero of ∨ | Theorem | p ∨ true ≡ true | 4 |
| (3.3) | Identity of ≡ | Axiom | true ≡ (q ≡ q) | 4 |
| (3.30) | Identity of ∨ | Theorem | p ∨ false ≡ p | 4 |
| (3.31) | Distributivity of ∨ over ∨ | Theorem | p ∨ (q ∨ r) ≡ (p ∨ q) ∨ (p ∨ r) | 4 |
| (3.32) | 原文未命名 | Theorem | p ∨ q ≡ (p ∨ ¬ q ≡ p) | 4 |
| (3.35) | Golden rule | Axiom | p ∧ q ≡ (p ≡ (q ≡ p ∨ q)) | 4 |
| (3.36) | Symmetry of ∧ | Theorem | p ∧ q ≡ q ∧ p | 4 |
| (3.37) | Associativity of ∧ | Theorem | (p ∧ q) ∧ r ≡ p ∧ (q ∧ r) | 4 |
| (3.38) | Idempotency of ∧ | Theorem | p ∧ p ≡ p | 4 |
| (3.39) | Identity of ∧ | Theorem | p ∧ true ≡ p | 4 |
| (3.4) | 原文未命名 | Theorem | true | 4 |
| (3.40) | Zero of ∧ | Theorem | p ∧ false ≡ false | 4 |
| (3.41) | Distributivity of ∧ over ∧ | Theorem | p ∧ (q ∧ r) ≡ (p ∧ q) ∧ (p ∧ r) | 4 |
| (3.42) | Contradiction | Theorem | p ∧ ¬ p ≡ false | 4 |
| (3.43a) | Absorption | Theorem | p ∧ (p ∨ q) ≡ p | 4 |
| (3.43b) | Absorption | Theorem | p ∨ (p ∧ q) ≡ p | 4 |
| (3.44a) | Absorption | Theorem | p ∧ (¬ p ∨ q) ≡ p ∧ q | 4 |
| (3.44b) | Absorption | Theorem | p ∨ (¬ p ∧ q) ≡ p ∨ q | 4 |
| (3.44c) | Absorption | Theorem | ¬ p ∧ (p ∨ q) ≡ ¬ p ∧ q | 4 |
| (3.44d) | Absorption | Theorem | ¬ p ∨ (p ∧ q) ≡ ¬ p ∨ q | 4 |
| (3.45) | Distributivity of ∨ over ∧ | Theorem | p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r) | 4 |
| (3.46) | Distributivity of ∧ over ∨ | Theorem | p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r) | 4 |
| (3.47a) | De Morgan | Theorem | ¬ (p ∧ q) ≡ ¬ p ∨ ¬ q | 4 |
| (3.47b) | De Morgan | Theorem | ¬ (p ∨ q) ≡ ¬ p ∧ ¬ q | 4 |
| (3.47c) | De Morgan | Theorem | ¬ (¬ p ∧ q) ≡ p ∨ ¬ q | 4 |
| (3.47d) | De Morgan | Theorem | ¬ (¬ p ∨ q) ≡ p ∧ ¬ q | 4 |
| (3.47e) | De Morgan dual of ∧ | Theorem | ¬ (¬ p ∧ ¬ q) ≡ p ∨ q | 4 |
| (3.47f) | De Morgan dual of ∨ | Theorem | ¬ (¬ p ∨ ¬ q) ≡ p ∧ q | 4 |
| (3.48) | 原文未命名 | Theorem | p ∧ q ≡ (p ∧ ¬ q ≡ ¬ p) | 4 |
| (3.49) | Semi-distributivity of ∧ over ≡ | Theorem | p ∧ (q ≡ r) ≡ (p ∧ q ≡ (p ∧ r ≡ p)) | 4 |
| (3.5) | Reflexivity of ≡ | Theorem | p ≡ p | 4 |
| (3.50) | Strong modus ponens for ≡ | Theorem | p ∧ (q ≡ p) ≡ p ∧ q | 4 |
| (3.51) | Replacement | Theorem | (p ≡ q) ∧ (r ≡ p) ≡ (p ≡ q) ∧ (r ≡ q) | 4 |
| (3.52) | Alternative definition of ≡ | Theorem | p ≡ (q ≡ (p ∧ q) ∨ (¬ p ∧ ¬ q)) | 4 |
| (3.53) | Exclusive or；别名：Alternative definition of ≢ | Theorem | (p ≢ q) ≡ (¬ p ∧ q) ∨ (p ∧ ¬ q) | 4 |
| (3.55) | 原文未命名 | Theorem | (p ∧ q) ∧ r ≡ (p ≡ (q ≡ (r ≡ (p ∨ q ≡ (q ∨ r ≡ (r ∨ p ≡ p ∨ (q ∨ r))))))) | 4 |
| (3.57) | Definition of ⇒ via ∨；别名：Definition of ⇒ from ∨、Definition of ⇒、Definition of implication | Axiom | p ⇒ q ≡ (p ∨ q ≡ q) | 3 |
| (3.57=) | Implication via ∨ | Lemma | (p ⇒ q) = (p ∨ q ≡ q) | 3 |
| (3.58) | Definition of ⇐；别名：Consequence | Axiom | p ⇐ q ≡ q ⇒ p | 3 |
| (3.59) | Material implication；别名：Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ ¬ p ∨ q | 3 |
| (3.60) | Definition of ⇒ via ∧；别名：Definition of ⇒ from ∧、Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ (p ∧ q ≡ p) | 3 |
| (3.60=) | Implication via ∧ | Lemma | (p ⇒ q) = (p ∧ q ≡ p) | 3 |
| (3.61) | Contrapositive | Theorem | p ⇒ q ≡ ¬ q ⇒ ¬ p | 3 |
| (3.61.1) | ¬-connection for ⇒ | Theorem | p ⇒ ¬ q ≡ q ⇒ ¬ p | 3 |
| (3.61.2) | ¬-connection for ⇒ | Theorem | ¬ p ⇒ q ≡ ¬ q ⇒ p | 3 |
| (3.62) | 原文未命名 | Theorem | p ⇒ (q ≡ r) ≡ (p ∧ q ≡ p ∧ r) | 3 |
| (3.63) | Distributivity of ⇒ over ≡ | Theorem | p ⇒ (q ≡ r) ≡ (p ⇒ q ≡ p ⇒ r) | 3 |
| (3.64) | Self-distributivity of ⇒ | Theorem | p ⇒ (q ⇒ r) ≡ (p ⇒ q) ⇒ (p ⇒ r) | 3 |
| (3.65) | Shunting | Theorem | p ∧ q ⇒ r ≡ p ⇒ (q ⇒ r) | 3 |
| (3.66) | Strong modus ponens | Theorem | p ∧ (p ⇒ q) ≡ p ∧ q | 3 |
| (3.67) | 原文未命名 | Theorem | p ∧ (q ⇒ p) ≡ p | 3 |
| (3.68) | 原文未命名 | Theorem | p ∨ (p ⇒ q) ≡ true | 3 |
| (3.69) | 原文未命名 | Theorem | p ∨ (q ⇒ p) ≡ q ⇒ p | 3 |
| (3.70) | 原文未命名 | Theorem | p ∨ q ⇒ p ∧ q ≡ (p ≡ q) | 3 |
| (3.71) | Reflexivity of ⇒ | Theorem | p ⇒ p | 3 |
| (3.72) | Right-zero of ⇒；别名：ex quodlibet verum | Theorem | p ⇒ true | 3 |
| (3.73) | Left-identity of ⇒ | Theorem | true ⇒ p ≡ p | 3 |
| (3.74) | Definition of ¬ from ⇒ | Theorem | p ⇒ false ≡ ¬ p | 3 |
| (3.75) | ex falso quodlibet | Theorem | false ⇒ p | 3 |
| (3.76a) | Weakening；别名：Strengthening | Theorem | p ⇒ p ∨ q | 3 |
| (3.76b) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p | 3 |
| (3.76c) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∨ q | 3 |
| (3.76d) | Weakening；别名：Strengthening | Theorem | p ∨ (q ∧ r) ⇒ p ∨ q | 3 |
| (3.76e) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∧ (q ∨ r) | 3 |
| (3.77) | Modus ponens | Theorem | p ∧ (p ⇒ q) ⇒ q | 3 |
| (3.78) | Case analysis | Theorem | (p ⇒ r) ∧ (q ⇒ r) ≡ p ∨ q ⇒ r | 3 |
| (3.79) | Case analysis | Theorem | (p ⇒ r) ∧ (¬ p ⇒ r) ≡ r | 3 |
| (3.8) | Definition of `false` | Axiom | false ≡ ¬ true | 4 |
| (3.80) | Mutual implication | Theorem | (p ⇒ q) ∧ (q ⇒ p) ≡ (p ≡ q) | 3 |
| (3.80.1) | Reflexivity of ⇒ wrt. ≡；别名：Reflexivity of ⇒ | Theorem | (p ≡ q) ⇒ (p ⇒ q) | 3 |
| (3.81) | Antisymmetry of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ p) ⇒ (p ≡ q) | 3 |
| (3.82.4) | Implication strengthening | Theorem | p ⇒ q ≡ p ⇒ p ∧ q | 3 |
| (3.82.5) | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 3 |
| (3.82a) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 3 |
| (3.82b) | Transitivity of ⇒ | Theorem | (p ≡ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 3 |
| (3.82c) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ≡ r) ⇒ (p ⇒ r) | 3 |
| (3.83) | Leibniz | Axiom | e = f ⇒ E[z ≔ e] = E[z ≔ f] | 1 |
| (3.83.1) | Leibniz | Corollary | d = e ⇒ f d = f e | 1 |
| (3.83.2) | Leibniz | Corollary | d = e ⇒ (p d ≡ p e) | 1 |
| (3.83.3) | Leibniz | Corollary | (d ≡ e) ⇒ (p d ≡ p e) | 1 |
| (3.83.4) | Leibniz | Corollary | (d ≡ e) ⇒ f d = f e | 1 |
| (3.84a) | Replacement | Theorem | e = f ∧ E[z ≔ e] ≡ e = f ∧ E[z ≔ f] | 1 |
| (3.84a≡) | Replacement | Theorem | (e ≡ f) ∧ E[z ≔ e] ≡ (e ≡ f) ∧ E[z ≔ f] | 1 |
| (3.84b) | Replacement | Theorem | e = f ⇒ E[z ≔ e] ≡ e = f ⇒ E[z ≔ f] | 1 |
| (3.84b≡) | Replacement | Theorem | (e ≡ f) ⇒ E[z ≔ e] ≡ (e ≡ f) ⇒ E[z ≔ f] | 1 |
| (3.84c) | Replacement | Theorem | q ∧ (e ≡ f) ⇒ E[z ≔ e] ≡ q ∧ (e ≡ f) ⇒ E[z ≔ f] | 1 |
| (3.84c) | Replacement | Theorem | q ∧ e = f ⇒ E[z ≔ e] ≡ q ∧ e = f ⇒ E[z ≔ f] | 1 |
| (3.85a) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] ≡ p ⇒ E[z ≔ true] | 1 |
| (3.85b) | Replace by `true` | Theorem | q ∧ p ⇒ E[z ≔ p] ≡ q ∧ p ⇒ E[z ≔ true] | 1 |
| (3.85c) | Replace by `false` | Theorem | ¬ p ⇒ E[z ≔ p] ≡ ¬ p ⇒ E[z ≔ false] | 1 |
| (3.85d) | Replace by `false` | Theorem | q ∧ ¬ p ⇒ E[z ≔ p] ≡ q ∧ ¬ p ⇒ E[z ≔ false] | 1 |
| (3.85e) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] = E[z ≔ true] | 1 |
| (3.86a) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ≡ E[z ≔ false] ⇒ p | 1 |
| (3.86b) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ∨ q ≡ E[z ≔ false] ⇒ p ∨ q | 1 |
| (3.87) | Replace by `true` | Theorem | p ∧ E[z ≔ p] ≡ p ∧ E[z ≔ true] | 1 |
| (3.87.1) | Abbreviated replace by `false` | Theorem | ¬ p ∧ E ≡ ¬ p ∧ E[p ≔ false] | 1 |
| (3.87.1) | Abbreviated replace by `true` | Theorem | p ∧ E ≡ p ∧ E[p ≔ true] | 1 |
| (3.88) | Replace by `false` | Theorem | p ∨ E[z ≔ p] ≡ p ∨ E[z ≔ false] | 1 |
| (3.89) | Shannon | Theorem | E[z ≔ p] ≡ (p ∧ E[z ≔ true]) ∨ (¬ p ∧ E[z ≔ false]) | 1 |
| (3.9) | Commutativity of ¬ with ≡ | Axiom | ¬ (p ≡ q) ≡ (¬ p ≡ q) | 4 |
| (4.3) | Left-monotonicity of ∧；别名：Monotonicity of ∧ | Theorem | (p ⇒ q) ⇒ (p ∧ r ⇒ q ∧ r) | 1 |
| 未编号 · 00099d | ∧₆-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ (u ⇒ p ∧ (q ∧ (r ∧ (s ∧ (t ∧ u))))))))) | 1 |
| 未编号 · 0102c0 | Identity of ≢ | Theorem | (p ≢ false) ≡ p | 4 |
| 未编号 · 03c7aa | Associativity of + | Theorem | (a + b) + c = a + (b + c) | 4 |
| 未编号 · 042fcf | Predecessor | Theorem | pred n = n - 1 | 2 |
| 未编号 · 0440d9 | Equivalence enrichment | Theorem | (p ≡ q) ⇒ ((p ⇒ r) ⇒ (p ⇒ q ∧ r)) | 1 |
| 未编号 · 05e01d | Associativity of · | Theorem | (k · m) · n = k · (m · n) | 4 |
| 未编号 · 0743d7 | Identity of · | Corollary | 1 · a = a | 2 |
| 未编号 · 08e6b7 | Monotonicity of ∧ | Theorem | (p ⇒ p') ⇒ ((q ⇒ q') ⇒ (p ∧ q ⇒ p' ∧ q')) | 1 |
| 未编号 · 0a2238 | Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ (p ∨ r ⇒ q ∨ r) | 1 |
| 未编号 · 0f2ed1 | Contributing conjunct to ≡ | Theorem | (p ∧ q ≡ r) ∧ p ⇒ (q ≡ r) | 1 |
| 未编号 · 15c06f | Transitivity of = | Theorem | e = f ∧ f = g ⇒ e = g | 1 |
| 未编号 · 19df80 | Zero is not one | Theorem | 0 = 1 ≡ false | 2 |
| 未编号 · 23785d | Adding consequent to ∧ | Theorem | (p ⇒ q) ⇒ (p ∧ r ⇒ p ∧ (q ∧ r)) | 1 |
| 未编号 · 23fe3b | Predecessor of zero | Axiom | pred 0 = 0 | 1 |
| 未编号 · 243af9 | Cancellation of `suc` | Axiom | suc m = suc n ≡ m = n | 1 |
| 未编号 · 24a375 | Definition of ≡ | Axiom | (p ≡ q) = (p = q) | 4 |
| 未编号 · 25737b | Co-residual of ∨ | Theorem | q ⇒ x ∨ p ≡ ¬ p ∧ q ⇒ x | 1 |
| 未编号 · 2977f6 | Proof by contradiction | Theorem | ¬ p ⇒ false ≡ p | 1 |
| 未编号 · 29a570 | ∧₅-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ p ∧ (q ∧ (r ∧ (s ∧ t))))))) | 2 |
| 未编号 · 2b72bc | Definition of ∧ | Lemma | (p ∧ q) = (p ≡ (q ≡ p ∨ q)) | 4 |
| 未编号 · 31d3fa | Preserving conjunct after ⇒ | Theorem | p ∧ q ⇒ r ≡ p ∧ q ⇒ p ∧ r | 1 |
| 未编号 · 3aa5d0 | Monotonicity of ⇒；别名：Right-monotonicity of ⇒ | Theorem | (p ⇒ q) ⇒ ((r ⇒ p) ⇒ (r ⇒ q)) | 1 |
| 未编号 · 3bc8d4 | Zero sum | Theorem | 0 = a + b ≡ 0 = a ∧ 0 = b | 3 |
| 未编号 · 3fb235 | Monus exchange | Theorem | m + (n - m) = n + (m - n) | 3 |
| 未编号 · 4163b2 | Identity of + | Corollary | 0 + a = a | 2 |
| 未编号 · 42cf57 | Left-identity of · | Theorem | 1 · n = n | 4 |
| 未编号 · 478166 | Right-distributivity of ⇒ over ∧₃ | Theorem | p ⇒ q ∧ (r ∧ s) ≡ (p ⇒ q) ∧ ((p ⇒ r) ∧ (p ⇒ s)) | 1 |
| 未编号 · 5aae8c | Definition of ≠ | Theorem | x ≠ y ≡ (x = y ≡ false) | 3 |
| 未编号 · 5f6c2d | Symmetry of ≠ | Theorem | x ≠ y ≡ y ≠ x | 3 |
| 未编号 · 617d8f | Zero is not one | Theorem | 0 ≠ 1 | 2 |
| 未编号 · 63a396 | Definition of + for `suc` | Axiom | suc m + n = suc (m + n) | 4 |
| 未编号 · 664fa2 | Multiplying the successor | Theorem | m · suc n = m + m · n | 4 |
| 未编号 · 667d5b | Shifting `suc` over + | Theorem | suc m + n = m + suc n | 5 |
| 未编号 · 69866c | Predecessor of successor | Axiom | pred (suc n) = n | 1 |
| 未编号 · 702635 | Subtraction from multiplication with successor | Theorem | m · suc n - m = m · n | 4 |
| 未编号 · 70f478 | ∧-Introduction | Theorem | p ⇒ (q ⇒ p ∧ q) | 1 |
| 未编号 · 7640dd | Cancellation of · | Theorem | c ≠ 0 ⇒ (c · a = c · b ≡ a = b) | 2 |
| 未编号 · 771122 | ∧₄-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ p ∧ (q ∧ (r ∧ s))))) | 1 |
| 未编号 · 794d96 | Definition of `double` | Axiom | double 0 = 0 | 4 |
| 未编号 · 79adc5 | Right-zero of · | Theorem | m · 0 = 0 | 4 |
| 未编号 · 79d90c | Left-monotonicity of ∨；别名：Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ (p ∨ r ⇒ q ∨ r) | 1 |
| 未编号 · 79e5c6 | Cancellation of + | Theorem | k + m = k + n ≡ m = n | 2 |
| 未编号 · 7d8ebb | Distributivity of · over subtraction | Theorem | k · (m - n) = k · m - k · n | 3 |
| 未编号 · 81f366 | Definition of + for 0；别名：Left-identity of + | Axiom | 0 + n = n | 4 |
| 未编号 · 833547 | Subtraction of zero from successor | Axiom | suc m - 0 = suc m | 2 |
| 未编号 · 857ba4 | Predecessor of non-zero | Theorem | n ≠ 0 ≡ suc pred  n = n | 2 |
| 未编号 · 86a35c | Abbreviated replacement in ∧；别名：Abbreviated replacement | Theorem | P ∧ x = E ≡ P[x ≔ E] ∧ x = E | 1 |
| 未编号 · 8876d6 | Case shuffling | Theorem | (p ∨ q) ∧ (¬ p ∨ r) ≡ (p ∧ r) ∨ (¬ p ∧ q) | 1 |
| 未编号 · 8a20aa | Definition of · for 0 | Axiom | 0 · n = 0 | 3 |
| 未编号 · 8a90bd | Replace variable by `true` | Theorem | p ⇒ E ≡ p ⇒ E[p ≔ true] | 1 |
| 未编号 · 8c8ad4 | Self-cancellation of subtraction | Theorem | m - m = 0 | 3 |
| 未编号 · 90956c | ⇒-Introduction | Primitive inference rule | ( p ⊦ q ) ⊦ p ⇒ q | 1 |
| 未编号 · 94d527 | Weakening；别名：Strengthening | Theorem | (p ∨ q) ∧ r ⇒ p ∨ (q ∧ r) | 1 |
| 未编号 · 94f30a | ∧₇-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ (u ⇒ (v ⇒ p ∧ (q ∧ (r ∧ (s ∧ (t ∧ (u ∧ v))))))))))) | 1 |
| 未编号 · 9941d0 | ∧₃-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ p ∧ (q ∧ r))) | 1 |
| 未编号 · 9afd85 | Zero product | Theorem | 0 = a · b ≡ 0 = a ∨ 0 = b | 2 |
| 未编号 · 9cb45b | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 1 |
| 未编号 · 9cd73a | Definition of ≠ | Axiom | x ≠ y ≡ ¬ (x = y) | 3 |
| 未编号 · 9f0ebf | Replace variable by `false` | Theorem | ¬ p ⇒ E ≡ ¬ p ⇒ E[p ≔ false] | 1 |
| 未编号 · a2a32a | Disjunction as implication | Lemma | p ∨ q ≡ ¬ p ⇒ q | 1 |
| 未编号 · b103d7 | Right-distributivity of ⇒ over ∧₄ | Theorem | p ⇒ q ∧ (r ∧ (s ∧ t)) ≡ (p ⇒ q) ∧ ((p ⇒ r) ∧ ((p ⇒ s) ∧ (p ⇒ t))) | 1 |
| 未编号 · b24ac7 | Right-identity of subtraction | Theorem | m - 0 = m | 4 |
| 未编号 · b5dc15 | Distributivity of · over + | Theorem | (k + m) · n = k · n + m · n | 4 |
| 未编号 · b6edc9 | Cancellation of multiplication with successor | Lemma | suc c · a = suc c · b ≡ a = b | 1 |
| 未编号 · b77dec | Abbreviated replacement in ⇒；别名：Abbreviated replacement | Theorem | x = E ⇒ P ≡ x = E ⇒ P[x ≔ E] | 1 |
| 未编号 · b8a06d | Exclusive or implies inclusive | Theorem | (p ≢ q) ⇒ p ∨ q | 1 |
| 未编号 · b9d13e | Subtraction from zero | Axiom | 0 - n = 0 | 2 |
| 未编号 · bac8f9 | Right-identity of + | Theorem | m + 0 = m | 5 |
| 未编号 · bb97a0 | Negation of ≠ | Theorem | ¬ (x ≠ y) ≡ x = y | 3 |
| 未编号 · bdf087 | Antitonicity of ¬ | Theorem | (p ⇒ q) ⇒ (¬ q ⇒ ¬ p) | 1 |
| 未编号 · c5667b | Definition of `double` | Axiom | double (suc n) = 2 + double n | 4 |
| 未编号 · cab2ec | Doubling | Theorem | double n = n + n | 5 |
| 未编号 · cbd6b0 | Zero is not product of successors | Lemma | suc a · suc b = 0 ≡ false | 1 |
| 未编号 · ce5ae3 | Residual of ∧ | Theorem | x ∧ p ⇒ q ≡ x ⇒ (p ⇒ q) | 1 |
| 未编号 · d0a211 | Definition of · for `suc` | Axiom | suc m · n = n + m · n | 3 |
| 未编号 · d14899 | Subtraction of successor from successor | Axiom | suc m - suc n = m - n | 2 |
| 未编号 · d64a69 | Zero is not successor | Theorem | 0 ≠ suc n | 2 |
| 未编号 · d67a9f | Subtraction after addition | Theorem | (m + n) - n = m | 3 |
| 未编号 · df7705 | Zero of · | Corollary | 0 · a = 0 | 2 |
| 未编号 · e18e5f | Irreflexivity of ≠ | Theorem | x ≠ x ≡ false | 3 |
| 未编号 · e1f012 | Zero is not successor | Axiom | 0 = suc n ≡ false | 1 |
| 未编号 · e364a1 | Antitonicity of ⇒；别名：Left-antitonicity of ⇒ | Theorem | (p ⇒ q) ⇒ ((q ⇒ r) ⇒ (p ⇒ r)) | 1 |
| 未编号 · e44908 | Successor | Theorem | suc n = n + 1 | 6 |
| 未编号 · e4ace3 | Zero or successor of predecessor | Theorem | n = 0 ∨ n = suc pred n | 1 |
| 未编号 · e81b8f | Subtraction of sum | Theorem | k - (m + n) = (k - m) - n | 3 |
| 未编号 · ef374b | Symmetry of · | Theorem | m · n = n · m | 4 |
| 未编号 · efb2f4 | Symmetry of + | Theorem | m + n = n + m | 5 |
| 未编号 · f1d779 | Cancellation of ¬ | Theorem | (¬ p ≡ ¬ q) = (p ≡ q) | 4 |
| 未编号 · f4948f | Case shuffling | Theorem | (p ⇒ q) ∧ (¬ p ⇒ r) ≡ (p ∧ q) ∨ (¬ p ∧ r) | 1 |
| 未编号 · f8a195 | Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ ((r ⇒ s) ⇒ (p ∨ r ⇒ q ∨ s)) | 2 |
| 未编号 · f93139 | Irreflexivity of ≠ | Theorem | ¬ (x ≠ x) | 3 |

## 2026 · Week 4

对应 notebook：[2026 H7.1 · 单调性与反单调性 · 预载列表](http://130.113.68.214:16026/), [2026 H7.2 · 自然数的序 · 预载列表](http://130.113.68.214:16027/), [2026 H7.2 · proved notebook theorems](http://130.113.68.214:16027/)

| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |
|---|---|---|---|---:|
| (1.2) | Reflexivity of = | Axiom | x = x | 2 |
| (1.3) | Symmetry of = | Axiom | (x = y) = (y = x) | 2 |
| (1.4) | Transitivity of = | Derived inference rule | X = Y , Y = Z ⊦ X = Z | 2 |
| (1.5) | Leibniz | Derived inference rule | X = Y ⊦ E[z ≔ X] = E[z ≔ Y] | 2 |
| (15.13) | Unary minus | Axiom | a + - a = 0 | 1 |
| (15.14) | Subtraction | Axiom | a - b = a + - b | 1 |
| (15.17) | Self-inverse of unary minus | Theorem | - (- a) = a | 1 |
| (15.18) | Fixpoint of unary minus | Theorem | - 0 = 0 | 1 |
| (15.19) | Distributivity of unary minus over + | Theorem | - (a + b) = - a + - b | 1 |
| (15.1a) | Associativity of + | Axiom | (a + b) + c = a + (b + c) | 1 |
| (15.1b) | Associativity of · | Axiom | (a · b) · c = a · (b · c) | 1 |
| (15.20) | Negation as multiplication | Theorem | - a = - 1 · a | 1 |
| (15.21) | 原文未命名 | Theorem | - a · b = a · - b | 1 |
| (15.22) | Commutativity of unary minus with · | Theorem | a · - b = - (a · b) | 1 |
| (15.22b) | 原文未命名 | Theorem | - a · b = - (a · b) | 1 |
| (15.23) | 原文未命名 | Theorem | - a · - b = a · b | 1 |
| (15.24) | Right-identity of - | Theorem | a - 0 = a | 1 |
| (15.25) | 原文未命名 | Theorem | (a - b) + (c - d) = (a + c) - (b + d) | 1 |
| (15.25a) | Mutual associativity of + and - | Theorem | a + (b - c) = (a + b) - c | 1 |
| (15.25b) | Subtraction of addition | Theorem | a - (b + c) = (a - b) - c | 1 |
| (15.25c) | Cancellation across added subtractions | Theorem | (a - b) + (b - c) = a - c | 1 |
| (15.26) | 原文未命名 | Theorem | (a - b) - (c - d) = (a + d) - (b + c) | 1 |
| (15.27) | 原文未命名 | Theorem | (a - b) · (c - d) = (a · c + b · d) - (a · d + b · c) | 1 |
| (15.29a) | Distributivity of · over - | Theorem | (a - b) · c = a · c - b · c | 1 |
| (15.29b) | Distributivity of · over - | Theorem | c · (a - b) = c · a - c · b | 1 |
| (15.2a) | Symmetry of + | Axiom | a + b = b + a | 1 |
| (15.2b) | Symmetry of · | Axiom | a · b = b · a | 1 |
| (15.3a) | Additive identity；别名：Identity of + | Axiom | 0 + a = a | 1 |
| (15.3b) | Additive identity；别名：Identity of + | Axiom | a + 0 = a | 1 |
| (15.4a) | Multiplicative identity；别名：Identity of · | Axiom | 1 · a = a | 1 |
| (15.4b) | Multiplicative identity；别名：Identity of · | Axiom | a · 1 = a | 1 |
| (15.5a) | Distributivity of · over + | Axiom | a · (b + c) = a · b + a · c | 1 |
| (15.5b) | Distributivity of · over + | Axiom | (b + c) · a = b · a + c · a | 1 |
| (15.9) | Zero of · | Axiom | a · 0 = 0 | 1 |
| (3.1) | Associativity of ≡ | Axiom | ((p ≡ q) ≡ r) ≡ (p ≡ (q ≡ r)) | 2 |
| (3.10) | Definition of ≢ | Axiom | (p ≢ q) ≡ ¬ (p ≡ q) | 2 |
| (3.11) | ¬ connection | Theorem | ¬ p ≡ (q ≡ (p ≡ ¬ q)) | 2 |
| (3.12) | Double negation | Theorem | ¬ (¬ p) ≡ p | 2 |
| (3.13) | Negation of `false` | Theorem | ¬ false ≡ true | 2 |
| (3.14) | 原文未命名 | Theorem | (p ≢ q) ≡ (¬ p ≡ q) | 2 |
| (3.15) | Definition of ¬ from ≡ | Theorem | ¬ p ≡ (p ≡ false) | 2 |
| (3.16) | Symmetry of ≢ | Theorem | (p ≢ q) ≡ (q ≢ p) | 2 |
| (3.17) | Associativity of ≢ | Theorem | ((p ≢ q) ≢ r) ≡ (p ≢ (q ≢ r)) | 2 |
| (3.18) | Mutual associativity of ≡ with ≢ | Theorem | ((p ≢ q) ≡ r) ≡ (p ≢ (q ≡ r)) | 2 |
| (3.19) | Mutual interchangeability of ≡ with ≢ | Theorem | (p ≢ (q ≡ r)) ≡ (p ≡ (q ≢ r)) | 2 |
| (3.2) | Symmetry of ≡ | Axiom | (p ≡ q) ≡ (q ≡ p) | 2 |
| (3.24) | Symmetry of ∨ | Axiom | p ∨ q ≡ q ∨ p | 2 |
| (3.25) | Associativity of ∨ | Axiom | (p ∨ q) ∨ r ≡ p ∨ (q ∨ r) | 2 |
| (3.26) | Idempotency of ∨ | Axiom | p ∨ p ≡ p | 2 |
| (3.27) | Distributivity of ∨ over ≡ | Axiom | p ∨ (q ≡ r) ≡ (p ∨ q ≡ p ∨ r) | 2 |
| (3.28) | Excluded middle；别名：LEM | Axiom | p ∨ ¬ p | 2 |
| (3.29) | Zero of ∨ | Theorem | p ∨ true ≡ true | 2 |
| (3.3) | Identity of ≡ | Axiom | true ≡ (q ≡ q) | 2 |
| (3.30) | Identity of ∨ | Theorem | p ∨ false ≡ p | 2 |
| (3.31) | Distributivity of ∨ over ∨ | Theorem | p ∨ (q ∨ r) ≡ (p ∨ q) ∨ (p ∨ r) | 2 |
| (3.32) | 原文未命名 | Theorem | p ∨ q ≡ (p ∨ ¬ q ≡ p) | 2 |
| (3.35) | Golden rule | Axiom | p ∧ q ≡ (p ≡ (q ≡ p ∨ q)) | 2 |
| (3.36) | Symmetry of ∧ | Theorem | p ∧ q ≡ q ∧ p | 2 |
| (3.37) | Associativity of ∧ | Theorem | (p ∧ q) ∧ r ≡ p ∧ (q ∧ r) | 2 |
| (3.38) | Idempotency of ∧ | Theorem | p ∧ p ≡ p | 2 |
| (3.39) | Identity of ∧ | Theorem | p ∧ true ≡ p | 2 |
| (3.4) | 原文未命名 | Theorem | true | 2 |
| (3.40) | Zero of ∧ | Theorem | p ∧ false ≡ false | 2 |
| (3.41) | Distributivity of ∧ over ∧ | Theorem | p ∧ (q ∧ r) ≡ (p ∧ q) ∧ (p ∧ r) | 2 |
| (3.42) | Contradiction | Theorem | p ∧ ¬ p ≡ false | 2 |
| (3.43a) | Absorption | Theorem | p ∧ (p ∨ q) ≡ p | 2 |
| (3.43b) | Absorption | Theorem | p ∨ (p ∧ q) ≡ p | 2 |
| (3.44a) | Absorption | Theorem | p ∧ (¬ p ∨ q) ≡ p ∧ q | 2 |
| (3.44b) | Absorption | Theorem | p ∨ (¬ p ∧ q) ≡ p ∨ q | 2 |
| (3.44c) | Absorption | Theorem | ¬ p ∧ (p ∨ q) ≡ ¬ p ∧ q | 2 |
| (3.44d) | Absorption | Theorem | ¬ p ∨ (p ∧ q) ≡ ¬ p ∨ q | 2 |
| (3.45) | Distributivity of ∨ over ∧ | Theorem | p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r) | 2 |
| (3.46) | Distributivity of ∧ over ∨ | Theorem | p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r) | 2 |
| (3.47a) | De Morgan | Theorem | ¬ (p ∧ q) ≡ ¬ p ∨ ¬ q | 2 |
| (3.47b) | De Morgan | Theorem | ¬ (p ∨ q) ≡ ¬ p ∧ ¬ q | 2 |
| (3.47c) | De Morgan | Theorem | ¬ (¬ p ∧ q) ≡ p ∨ ¬ q | 2 |
| (3.47d) | De Morgan | Theorem | ¬ (¬ p ∨ q) ≡ p ∧ ¬ q | 2 |
| (3.47e) | De Morgan dual of ∧ | Theorem | ¬ (¬ p ∧ ¬ q) ≡ p ∨ q | 2 |
| (3.47f) | De Morgan dual of ∨ | Theorem | ¬ (¬ p ∨ ¬ q) ≡ p ∧ q | 2 |
| (3.48) | 原文未命名 | Theorem | p ∧ q ≡ (p ∧ ¬ q ≡ ¬ p) | 2 |
| (3.49) | Semi-distributivity of ∧ over ≡ | Theorem | p ∧ (q ≡ r) ≡ (p ∧ q ≡ (p ∧ r ≡ p)) | 2 |
| (3.5) | Reflexivity of ≡ | Theorem | p ≡ p | 2 |
| (3.50) | Strong modus ponens for ≡ | Theorem | p ∧ (q ≡ p) ≡ p ∧ q | 2 |
| (3.51) | Replacement | Theorem | (p ≡ q) ∧ (r ≡ p) ≡ (p ≡ q) ∧ (r ≡ q) | 2 |
| (3.52) | Alternative definition of ≡ | Theorem | p ≡ (q ≡ (p ∧ q) ∨ (¬ p ∧ ¬ q)) | 2 |
| (3.53) | Exclusive or；别名：Alternative definition of ≢ | Theorem | (p ≢ q) ≡ (¬ p ∧ q) ∨ (p ∧ ¬ q) | 2 |
| (3.55) | 原文未命名 | Theorem | (p ∧ q) ∧ r ≡ (p ≡ (q ≡ (r ≡ (p ∨ q ≡ (q ∨ r ≡ (r ∨ p ≡ p ∨ (q ∨ r))))))) | 2 |
| (3.57) | Definition of ⇒ via ∨；别名：Definition of ⇒ from ∨、Definition of ⇒、Definition of implication | Axiom | p ⇒ q ≡ (p ∨ q ≡ q) | 2 |
| (3.57=) | Implication via ∨ | Lemma | (p ⇒ q) = (p ∨ q ≡ q) | 2 |
| (3.58) | Definition of ⇐；别名：Consequence | Axiom | p ⇐ q ≡ q ⇒ p | 2 |
| (3.59) | Material implication；别名：Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ ¬ p ∨ q | 2 |
| (3.60) | Definition of ⇒ via ∧；别名：Definition of ⇒ from ∧、Definition of ⇒、Definition of implication | Theorem | p ⇒ q ≡ (p ∧ q ≡ p) | 2 |
| (3.60=) | Implication via ∧ | Lemma | (p ⇒ q) = (p ∧ q ≡ p) | 2 |
| (3.61) | Contrapositive | Theorem | p ⇒ q ≡ ¬ q ⇒ ¬ p | 2 |
| (3.61.1) | ¬-connection for ⇒ | Theorem | p ⇒ ¬ q ≡ q ⇒ ¬ p | 2 |
| (3.61.2) | ¬-connection for ⇒ | Theorem | ¬ p ⇒ q ≡ ¬ q ⇒ p | 2 |
| (3.62) | 原文未命名 | Theorem | p ⇒ (q ≡ r) ≡ (p ∧ q ≡ p ∧ r) | 2 |
| (3.63) | Distributivity of ⇒ over ≡ | Theorem | p ⇒ (q ≡ r) ≡ (p ⇒ q ≡ p ⇒ r) | 2 |
| (3.64) | Self-distributivity of ⇒ | Theorem | p ⇒ (q ⇒ r) ≡ (p ⇒ q) ⇒ (p ⇒ r) | 2 |
| (3.65) | Shunting | Theorem | p ∧ q ⇒ r ≡ p ⇒ (q ⇒ r) | 2 |
| (3.66) | Strong modus ponens | Theorem | p ∧ (p ⇒ q) ≡ p ∧ q | 2 |
| (3.67) | 原文未命名 | Theorem | p ∧ (q ⇒ p) ≡ p | 2 |
| (3.68) | 原文未命名 | Theorem | p ∨ (p ⇒ q) ≡ true | 2 |
| (3.69) | 原文未命名 | Theorem | p ∨ (q ⇒ p) ≡ q ⇒ p | 2 |
| (3.70) | 原文未命名 | Theorem | p ∨ q ⇒ p ∧ q ≡ (p ≡ q) | 2 |
| (3.71) | Reflexivity of ⇒ | Theorem | p ⇒ p | 2 |
| (3.72) | Right-zero of ⇒；别名：ex quodlibet verum | Theorem | p ⇒ true | 2 |
| (3.73) | Left-identity of ⇒ | Theorem | true ⇒ p ≡ p | 2 |
| (3.74) | Definition of ¬ from ⇒ | Theorem | p ⇒ false ≡ ¬ p | 2 |
| (3.75) | ex falso quodlibet | Theorem | false ⇒ p | 2 |
| (3.76a) | Weakening；别名：Strengthening | Theorem | p ⇒ p ∨ q | 2 |
| (3.76b) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p | 2 |
| (3.76c) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∨ q | 2 |
| (3.76d) | Weakening；别名：Strengthening | Theorem | p ∨ (q ∧ r) ⇒ p ∨ q | 2 |
| (3.76e) | Weakening；别名：Strengthening | Theorem | p ∧ q ⇒ p ∧ (q ∨ r) | 2 |
| (3.77) | Modus ponens | Theorem | p ∧ (p ⇒ q) ⇒ q | 2 |
| (3.78) | Case analysis | Theorem | (p ⇒ r) ∧ (q ⇒ r) ≡ p ∨ q ⇒ r | 2 |
| (3.79) | Case analysis | Theorem | (p ⇒ r) ∧ (¬ p ⇒ r) ≡ r | 2 |
| (3.8) | Definition of `false` | Axiom | false ≡ ¬ true | 2 |
| (3.80) | Mutual implication | Theorem | (p ⇒ q) ∧ (q ⇒ p) ≡ (p ≡ q) | 2 |
| (3.80.1) | Reflexivity of ⇒ wrt. ≡；别名：Reflexivity of ⇒ | Theorem | (p ≡ q) ⇒ (p ⇒ q) | 2 |
| (3.81) | Antisymmetry of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ p) ⇒ (p ≡ q) | 2 |
| (3.82.4) | Implication strengthening | Theorem | p ⇒ q ≡ p ⇒ p ∧ q | 2 |
| (3.82.5) | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 2 |
| (3.82a) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 2 |
| (3.82b) | Transitivity of ⇒ | Theorem | (p ≡ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) | 2 |
| (3.82c) | Transitivity of ⇒ | Theorem | (p ⇒ q) ∧ (q ≡ r) ⇒ (p ⇒ r) | 2 |
| (3.83) | Leibniz | Axiom | e = f ⇒ E[z ≔ e] = E[z ≔ f] | 2 |
| (3.83.1) | Leibniz | Corollary | d = e ⇒ f d = f e | 2 |
| (3.83.2) | Leibniz | Corollary | d = e ⇒ (p d ≡ p e) | 2 |
| (3.83.3) | Leibniz | Corollary | (d ≡ e) ⇒ (p d ≡ p e) | 2 |
| (3.83.4) | Leibniz | Corollary | (d ≡ e) ⇒ f d = f e | 2 |
| (3.84a) | Replacement | Theorem | e = f ∧ E[z ≔ e] ≡ e = f ∧ E[z ≔ f] | 2 |
| (3.84a≡) | Replacement | Theorem | (e ≡ f) ∧ E[z ≔ e] ≡ (e ≡ f) ∧ E[z ≔ f] | 2 |
| (3.84b) | Replacement | Theorem | e = f ⇒ E[z ≔ e] ≡ e = f ⇒ E[z ≔ f] | 2 |
| (3.84b≡) | Replacement | Theorem | (e ≡ f) ⇒ E[z ≔ e] ≡ (e ≡ f) ⇒ E[z ≔ f] | 2 |
| (3.84c) | Replacement | Theorem | q ∧ (e ≡ f) ⇒ E[z ≔ e] ≡ q ∧ (e ≡ f) ⇒ E[z ≔ f] | 2 |
| (3.84c) | Replacement | Theorem | q ∧ e = f ⇒ E[z ≔ e] ≡ q ∧ e = f ⇒ E[z ≔ f] | 2 |
| (3.85a) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] ≡ p ⇒ E[z ≔ true] | 2 |
| (3.85b) | Replace by `true` | Theorem | q ∧ p ⇒ E[z ≔ p] ≡ q ∧ p ⇒ E[z ≔ true] | 2 |
| (3.85c) | Replace by `false` | Theorem | ¬ p ⇒ E[z ≔ p] ≡ ¬ p ⇒ E[z ≔ false] | 2 |
| (3.85d) | Replace by `false` | Theorem | q ∧ ¬ p ⇒ E[z ≔ p] ≡ q ∧ ¬ p ⇒ E[z ≔ false] | 2 |
| (3.85e) | Replace by `true` | Theorem | p ⇒ E[z ≔ p] = E[z ≔ true] | 2 |
| (3.86a) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ≡ E[z ≔ false] ⇒ p | 2 |
| (3.86b) | Replace by `false` | Theorem | E[z ≔ p] ⇒ p ∨ q ≡ E[z ≔ false] ⇒ p ∨ q | 2 |
| (3.87) | Replace by `true` | Theorem | p ∧ E[z ≔ p] ≡ p ∧ E[z ≔ true] | 2 |
| (3.87.1) | Abbreviated replace by `false` | Theorem | ¬ p ∧ E ≡ ¬ p ∧ E[p ≔ false] | 2 |
| (3.87.1) | Abbreviated replace by `true` | Theorem | p ∧ E ≡ p ∧ E[p ≔ true] | 2 |
| (3.88) | Replace by `false` | Theorem | p ∨ E[z ≔ p] ≡ p ∨ E[z ≔ false] | 2 |
| (3.89) | Shannon | Theorem | E[z ≔ p] ≡ (p ∧ E[z ≔ true]) ∨ (¬ p ∧ E[z ≔ false]) | 2 |
| (3.9) | Commutativity of ¬ with ≡ | Axiom | ¬ (p ≡ q) ≡ (¬ p ≡ q) | 2 |
| (4.3) | Left-monotonicity of ∧；别名：Monotonicity of ∧ | Theorem | (p ⇒ q) ⇒ (p ∧ r ⇒ q ∧ r) | 2 |
| 未编号 · 00099d | ∧₆-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ (u ⇒ p ∧ (q ∧ (r ∧ (s ∧ (t ∧ u))))))))) | 2 |
| 未编号 · 0102c0 | Identity of ≢ | Theorem | (p ≢ false) ≡ p | 2 |
| 未编号 · 03c7aa | Associativity of + | Theorem | (a + b) + c = a + (b + c) | 1 |
| 未编号 · 042fcf | Predecessor | Theorem | pred n = n - 1 | 1 |
| 未编号 · 0440d9 | Equivalence enrichment | Theorem | (p ≡ q) ⇒ ((p ⇒ r) ⇒ (p ⇒ q ∧ r)) | 2 |
| 未编号 · 05e01d | Associativity of · | Theorem | (k · m) · n = k · (m · n) | 1 |
| 未编号 · 0743d7 | Identity of · | Corollary | 1 · a = a | 1 |
| 未编号 · 08e6b7 | Monotonicity of ∧ | Theorem | (p ⇒ p') ⇒ ((q ⇒ q') ⇒ (p ∧ q ⇒ p' ∧ q')) | 2 |
| 未编号 · 0a2238 | Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ (p ∨ r ⇒ q ∨ r) | 2 |
| 未编号 · 0f2ed1 | Contributing conjunct to ≡ | Theorem | (p ∧ q ≡ r) ∧ p ⇒ (q ≡ r) | 2 |
| 未编号 · 15a04b | ≤-Monotonicity of + | Corollary | a ≤ b ∧ c ≤ d ⇒ a + c ≤ b + d | 1 |
| 未编号 · 15c06f | Transitivity of = | Theorem | e = f ∧ f = g ⇒ e = g | 2 |
| 未编号 · 19df80 | Zero is not one | Theorem | 0 = 1 ≡ false | 1 |
| 未编号 · 1f5c61 | ≤-Monotonicity of `pred` | Theorem | a ≤ b ⇒ pred a ≤ pred b | 1 |
| 未编号 · 23785d | Adding consequent to ∧ | Theorem | (p ⇒ q) ⇒ (p ∧ r ⇒ p ∧ (q ∧ r)) | 2 |
| 未编号 · 23fe3b | Predecessor of zero | Axiom | pred 0 = 0 | 1 |
| 未编号 · 243af9 | Cancellation of `suc` | Axiom | suc m = suc n ≡ m = n | 1 |
| 未编号 · 24a375 | Definition of ≡ | Axiom | (p ≡ q) = (p = q) | 2 |
| 未编号 · 25737b | Co-residual of ∨ | Theorem | q ⇒ x ∨ p ≡ ¬ p ∧ q ⇒ x | 2 |
| 未编号 · 2977f6 | Proof by contradiction | Theorem | ¬ p ⇒ false ≡ p | 2 |
| 未编号 · 29a570 | ∧₅-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ p ∧ (q ∧ (r ∧ (s ∧ t))))))) | 4 |
| 未编号 · 2b72bc | Definition of ∧ | Lemma | (p ∧ q) = (p ≡ (q ≡ p ∨ q)) | 2 |
| 未编号 · 31d3fa | Preserving conjunct after ⇒ | Theorem | p ∧ q ⇒ r ≡ p ∧ q ⇒ p ∧ r | 2 |
| 未编号 · 3aa5d0 | Monotonicity of ⇒；别名：Right-monotonicity of ⇒ | Theorem | (p ⇒ q) ⇒ ((r ⇒ p) ⇒ (r ⇒ q)) | 2 |
| 未编号 · 3bc8d4 | Zero sum | Theorem | 0 = a + b ≡ 0 = a ∧ 0 = b | 1 |
| 未编号 · 3fb235 | Monus exchange | Theorem | m + (n - m) = n + (m - n) | 1 |
| 未编号 · 4163b2 | Identity of + | Corollary | 0 + a = a | 1 |
| 未编号 · 42cf57 | Left-identity of · | Theorem | 1 · n = n | 1 |
| 未编号 · 478166 | Right-distributivity of ⇒ over ∧₃ | Theorem | p ⇒ q ∧ (r ∧ s) ≡ (p ⇒ q) ∧ ((p ⇒ r) ∧ (p ⇒ s)) | 2 |
| 未编号 · 5aae8c | Definition of ≠ | Theorem | x ≠ y ≡ (x = y ≡ false) | 1 |
| 未编号 · 5f6c2d | Symmetry of ≠ | Theorem | x ≠ y ≡ y ≠ x | 1 |
| 未编号 · 617d8f | Zero is not one | Theorem | 0 ≠ 1 | 1 |
| 未编号 · 63a396 | Definition of + for `suc` | Axiom | suc m + n = suc (m + n) | 1 |
| 未编号 · 664fa2 | Multiplying the successor | Theorem | m · suc n = m + m · n | 1 |
| 未编号 · 667d5b | Shifting `suc` over + | Theorem | suc m + n = m + suc n | 1 |
| 未编号 · 69866c | Predecessor of successor | Axiom | pred (suc n) = n | 1 |
| 未编号 · 702635 | Subtraction from multiplication with successor | Theorem | m · suc n - m = m · n | 1 |
| 未编号 · 70f478 | ∧-Introduction | Theorem | p ⇒ (q ⇒ p ∧ q) | 2 |
| 未编号 · 771122 | ∧₄-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ p ∧ (q ∧ (r ∧ s))))) | 2 |
| 未编号 · 794d96 | Definition of `double` | Axiom | double 0 = 0 | 1 |
| 未编号 · 79adc5 | Right-zero of · | Theorem | m · 0 = 0 | 1 |
| 未编号 · 79d90c | Left-monotonicity of ∨；别名：Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ (p ∨ r ⇒ q ∨ r) | 2 |
| 未编号 · 79e5c6 | Cancellation of + | Theorem | k + m = k + n ≡ m = n | 1 |
| 未编号 · 7d8ebb | Distributivity of · over subtraction | Theorem | k · (m - n) = k · m - k · n | 1 |
| 未编号 · 7df813 | ≤-Monotonicity of + | Theorem | a ≤ b ⇒ (c ≤ d ⇒ a + c ≤ b + d) | 1 |
| 未编号 · 81f366 | Definition of + for 0；别名：Left-identity of + | Axiom | 0 + n = n | 1 |
| 未编号 · 833547 | Subtraction of zero from successor | Axiom | suc m - 0 = suc m | 1 |
| 未编号 · 857ba4 | Predecessor of non-zero | Theorem | n ≠ 0 ≡ suc pred  n = n | 1 |
| 未编号 · 86a35c | Abbreviated replacement in ∧；别名：Abbreviated replacement | Theorem | P ∧ x = E ≡ P[x ≔ E] ∧ x = E | 2 |
| 未编号 · 8876d6 | Case shuffling | Theorem | (p ∨ q) ∧ (¬ p ∨ r) ≡ (p ∧ r) ∨ (¬ p ∧ q) | 2 |
| 未编号 · 896ef9 | ≤-Isotonicity of + | Theorem | a + b ≤ a + c ≡ b ≤ c | 1 |
| 未编号 · 8a20aa | Definition of · for 0 | Axiom | 0 · n = 0 | 1 |
| 未编号 · 8a90bd | Replace variable by `true` | Theorem | p ⇒ E ≡ p ⇒ E[p ≔ true] | 2 |
| 未编号 · 8c8ad4 | Self-cancellation of subtraction | Theorem | m - m = 0 | 1 |
| 未编号 · 90956c | ⇒-Introduction | Primitive inference rule | ( p ⊦ q ) ⊦ p ⇒ q | 2 |
| 未编号 · 94d527 | Weakening；别名：Strengthening | Theorem | (p ∨ q) ∧ r ⇒ p ∨ (q ∧ r) | 2 |
| 未编号 · 94f30a | ∧₇-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ (s ⇒ (t ⇒ (u ⇒ (v ⇒ p ∧ (q ∧ (r ∧ (s ∧ (t ∧ (u ∧ v))))))))))) | 2 |
| 未编号 · 9941d0 | ∧₃-Introduction | Theorem | p ⇒ (q ⇒ (r ⇒ p ∧ (q ∧ r))) | 2 |
| 未编号 · 9afd85 | Zero product | Theorem | 0 = a · b ≡ 0 = a ∨ 0 = b | 1 |
| 未编号 · 9cb45b | Right-distributivity of ⇒ over ∧ | Theorem | p ⇒ q ∧ r ≡ (p ⇒ q) ∧ (p ⇒ r) | 2 |
| 未编号 · 9cd73a | Definition of ≠ | Axiom | x ≠ y ≡ ¬ (x = y) | 1 |
| 未编号 · 9f0ebf | Replace variable by `false` | Theorem | ¬ p ⇒ E ≡ ¬ p ⇒ E[p ≔ false] | 2 |
| 未编号 · a2a32a | Disjunction as implication | Lemma | p ∨ q ≡ ¬ p ⇒ q | 2 |
| 未编号 · b103d7 | Right-distributivity of ⇒ over ∧₄ | Theorem | p ⇒ q ∧ (r ∧ (s ∧ t)) ≡ (p ⇒ q) ∧ ((p ⇒ r) ∧ ((p ⇒ s) ∧ (p ⇒ t))) | 2 |
| 未编号 · b24ac7 | Right-identity of subtraction | Theorem | m - 0 = m | 1 |
| 未编号 · b5dc15 | Distributivity of · over + | Theorem | (k + m) · n = k · n + m · n | 1 |
| 未编号 · b77dec | Abbreviated replacement in ⇒；别名：Abbreviated replacement | Theorem | x = E ⇒ P ≡ x = E ⇒ P[x ≔ E] | 2 |
| 未编号 · b8a06d | Exclusive or implies inclusive | Theorem | (p ≢ q) ⇒ p ∨ q | 2 |
| 未编号 · b9d13e | Subtraction from zero | Axiom | 0 - n = 0 | 1 |
| 未编号 · bac8f9 | Right-identity of + | Theorem | m + 0 = m | 1 |
| 未编号 · bb97a0 | Negation of ≠ | Theorem | ¬ (x ≠ y) ≡ x = y | 1 |
| 未编号 · bdf087 | Antitonicity of ¬ | Theorem | (p ⇒ q) ⇒ (¬ q ⇒ ¬ p) | 2 |
| 未编号 · c5667b | Definition of `double` | Axiom | double (suc n) = 2 + double n | 1 |
| 未编号 · cab2ec | Doubling | Theorem | double n = n + n | 1 |
| 未编号 · cc3374 | Antisymmetry of ≤ | Theorem | a ≤ b ⇒ (b ≤ a ⇒ a = b) | 1 |
| 未编号 · ce5ae3 | Residual of ∧ | Theorem | x ∧ p ⇒ q ≡ x ⇒ (p ⇒ q) | 2 |
| 未编号 · d0a211 | Definition of · for `suc` | Axiom | suc m · n = n + m · n | 1 |
| 未编号 · d14899 | Subtraction of successor from successor | Axiom | suc m - suc n = m - n | 1 |
| 未编号 · d46e7c | Zero is unique least element | Theorem | a ≤ 0 ≡ a = 0 | 1 |
| 未编号 · d64a69 | Zero is not successor | Theorem | 0 ≠ suc n | 1 |
| 未编号 · d67a9f | Subtraction after addition | Theorem | (m + n) - n = m | 1 |
| 未编号 · d7073b | Reflexivity of ≤ | Theorem | a ≤ a | 1 |
| 未编号 · df7705 | Zero of · | Corollary | 0 · a = 0 | 1 |
| 未编号 · e18e5f | Irreflexivity of ≠ | Theorem | x ≠ x ≡ false | 1 |
| 未编号 · e1f012 | Zero is not successor | Axiom | 0 = suc n ≡ false | 1 |
| 未编号 · e364a1 | Antitonicity of ⇒；别名：Left-antitonicity of ⇒ | Theorem | (p ⇒ q) ⇒ ((q ⇒ r) ⇒ (p ⇒ r)) | 2 |
| 未编号 · e44908 | Successor | Theorem | suc n = n + 1 | 1 |
| 未编号 · e81b8f | Subtraction of sum | Theorem | k - (m + n) = (k - m) - n | 1 |
| 未编号 · e8f3dc | Flipped transitivity of ≤ | Corollary | b ≤ c ⇒ (a ≤ b ⇒ a ≤ c) | 1 |
| 未编号 · ef374b | Symmetry of · | Theorem | m · n = n · m | 1 |
| 未编号 · efb2f4 | Symmetry of + | Theorem | m + n = n + m | 1 |
| 未编号 · f1d779 | Cancellation of ¬ | Theorem | (¬ p ≡ ¬ q) = (p ≡ q) | 2 |
| 未编号 · f226ab | Transitivity of ≤ | Theorem | a ≤ b ⇒ (b ≤ c ⇒ a ≤ c) | 1 |
| 未编号 · f4948f | Case shuffling | Theorem | (p ⇒ q) ∧ (¬ p ⇒ r) ≡ (p ∧ q) ∨ (¬ p ∧ r) | 2 |
| 未编号 · f8a195 | Monotonicity of ∨ | Theorem | (p ⇒ q) ⇒ ((r ⇒ s) ⇒ (p ∨ r ⇒ q ∨ s)) | 4 |
| 未编号 · f93139 | Irreflexivity of ≠ | Theorem | ¬ (x ≠ x) | 1 |

## 弹窗原文中的 WeekN 模块

这里按预载列表的模块名整理，与上面的 Exercise Week 分类独立。

| notebook 年份 | 模块 Week | 声明出现次数 | 不同卡片 |
|---|---:|---:|---:|
| 2025 | 3 | 111 | 28 |
| 2025 | 4 | 168 | 28 |
| 2025 | 5 | 127 | 51 |
| 2025 | 6 | 265 | 57 |
| 2025 | 7 | 446 | 53 |
| 2025 | 8 | 45 | 15 |
| 2025 | 9 | 67 | 64 |
| 2025 | 11 | 9 | 9 |
| 2026 | 3 | 141 | 43 |

## 2025 notebook · 模块 Week 3

出现于 notebook：[2025i Exercise 3.2: Natural Numbers and Induction: Addition and Multiplication · 预载列表](http://130.113.68.214:15025/), [2025i Exercise 3.3: Monus Subtraction · 预载列表](http://130.113.68.214:15026/), [2025i Exercise 5.2: Equality and Predecessors in ℕ · 预载列表](http://130.113.68.214:15047/), [2025i Exercise 5.3: Simple Proofs `By cases` on ℕ · 预载列表](http://130.113.68.214:15048/), [HW11 · CalcCheck preloaded theorem list](http://130.113.68.214:15037/)

| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |
|---|---|---|---|---:|
| 未编号 · 03c7aa | Associativity of + | Theorem | (a + b) + c = a + (b + c) | 4 |
| 未编号 · 05e01d | Associativity of · | Theorem | (k · m) · n = k · (m · n) | 4 |
| 未编号 · 3fb235 | Monus exchange | Theorem | m + (n - m) = n + (m - n) | 3 |
| 未编号 · 42cf57 | Left-identity of · | Theorem | 1 · n = n | 4 |
| 未编号 · 63a396 | Definition of + for `suc` | Axiom | suc m + n = suc (m + n) | 5 |
| 未编号 · 664fa2 | Multiplying the successor | Theorem | m · suc n = m + m · n | 4 |
| 未编号 · 667d5b | Shifting `suc` over + | Theorem | suc m + n = m + suc n | 5 |
| 未编号 · 702635 | Subtraction from multiplication with successor | Theorem | m · suc n - m = m · n | 3 |
| 未编号 · 794d96 | Definition of `double` | Axiom | double 0 = 0 | 5 |
| 未编号 · 79adc5 | Right-zero of · | Theorem | m · 0 = 0 | 4 |
| 未编号 · 7d8ebb | Distributivity of · over subtraction | Theorem | k · (m - n) = k · m - k · n | 3 |
| 未编号 · 81f366 | Definition of + for 0；别名：Left-identity of + | Axiom | 0 + n = n | 5 |
| 未编号 · 833547 | Subtraction of zero from successor | Axiom | suc m - 0 = suc m | 3 |
| 未编号 · 8a20aa | Definition of · for 0 | Axiom | 0 · n = 0 | 4 |
| 未编号 · 8c8ad4 | Self-cancellation of subtraction | Theorem | m - m = 0 | 3 |
| 未编号 · b24ac7 | Right-identity of subtraction | Theorem | m - 0 = m | 3 |
| 未编号 · b5dc15 | Distributivity of · over + | Theorem | (k + m) · n = k · n + m · n | 4 |
| 未编号 · b9d13e | Subtraction from zero | Axiom | 0 - n = 0 | 3 |
| 未编号 · bac8f9 | Right-identity of + | Theorem | m + 0 = m | 5 |
| 未编号 · c5667b | Definition of `double` | Axiom | double (suc n) = 2 + double n | 5 |
| 未编号 · cab2ec | Doubling | Theorem | double n = n + n | 5 |
| 未编号 · d0a211 | Definition of · for `suc` | Axiom | suc m · n = n + m · n | 4 |
| 未编号 · d14899 | Subtraction of successor from successor | Axiom | suc m - suc n = m - n | 3 |
| 未编号 · d67a9f | Subtraction after addition | Theorem | (m + n) - n = m | 3 |
| 未编号 · e44908 | Successor | Theorem | suc n = n + 1 | 5 |
| 未编号 · e81b8f | Subtraction of sum | Theorem | k - (m + n) = (k - m) - n | 3 |
| 未编号 · ef374b | Symmetry of · | Theorem | m · n = n · m | 4 |
| 未编号 · efb2f4 | Symmetry of + | Theorem | m + n = n + m | 5 |

## 2025 notebook · 模块 Week 4

出现于 notebook：[2025i Exercise 5.4: Manipulating Ranges in ℤ · 预载列表](http://130.113.68.214:15049/), [2025i Exercise 5.5: Sum Quantification in ℤ · 预载列表](http://130.113.68.214:15050/), [2025i Exercise 6.1: Introduction to Sequences · 预载列表](http://130.113.68.214:15052/), [2025i Exercise 6.2: Sequences Continued · 预载列表](http://130.113.68.214:15053/), [2025i Exercise 6.3: Practice with ∀ and ∃ · 预载列表](http://130.113.68.214:15054/), [HW13 · CalcCheck preloaded theorem list](http://130.113.68.214:15051/)

| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |
|---|---|---|---|---:|
| (15.36) | Less；别名：Definition of < | Axiom | a < b ≡ pos (b - a) | 6 |
| (15.37) | Greater；别名：Definition of > | Axiom | a > b ≡ pos (a - b) | 6 |
| (15.38) | At most；别名：Definition of ≤ | Axiom | a ≤ b ≡ a < b ∨ a = b | 6 |
| (15.39) | At least；别名：Definition of ≥ | Axiom | a ≥ b ≡ a > b ∨ a = b | 6 |
| (15.40) | Positive elements | Theorem | pos b ≡ 0 < b | 6 |
| (15.41a) | Transitivity；别名：Transitivity of < | Theorem | a < b ∧ b < c ⇒ a < c | 6 |
| (15.41b) | Transitivity；别名：Transitivity of ≤ with < | Theorem | a ≤ b ∧ b < c ⇒ a < c | 6 |
| (15.41c) | Transitivity；别名：Transitivity of < with ≤ | Theorem | a < b ∧ b ≤ c ⇒ a < c | 6 |
| (15.41d) | Transitivity；别名：Transitivity of ≤ | Theorem | a ≤ b ∧ b ≤ c ⇒ a ≤ c | 6 |
| (15.42) | <-Isotonicity of + | Theorem | a < b ≡ a + d < b + d | 6 |
| (15.44) | Trichotomy | Theorem | (a < b ≡ (a = b ≡ a > b)) ∧ ¬ (a < b ∧ (a = b ∧ a > b)) | 6 |
| (15.44A) | Trichotomy — A | Theorem | a < b ≡ (a = b ≡ a > b) | 6 |
| (15.44B) | Trichotomy — B | Theorem | ¬ (a < b ∧ (a = b ∧ a > b)) | 6 |
| 未编号 · 22473d | Transitivity of > | Theorem | a > b ∧ b > c ⇒ a > c | 6 |
| 未编号 · 2989a8 | ≤-Monotonicity of + | Theorem | a ≤ b ⇒ a + d ≤ b + d | 6 |
| 未编号 · 4a62c3 | Irreflexivity of < | Theorem | ¬ (a < b ∧ a = b) | 6 |
| 未编号 · 4b60c2 | ≤-Isotonicity of + | Theorem | a ≤ b ≡ a + d ≤ b + d | 6 |
| 未编号 · 56906f | Converse of ≤ | Theorem | a ≥ b ≡ b ≤ a | 6 |
| 未编号 · 635d6b | Irreflexivity of < | Theorem | a < b ⇒ ¬ (a = b) | 6 |
| 未编号 · 9dff39 | <-Monotonicity of + | Theorem | a < b ⇒ a + d < b + d | 6 |
| 未编号 · a967ba | Irreflexivity of < | Theorem | ¬ (a < a) | 6 |
| 未编号 · a9ba81 | Irreflexivity of < | Theorem | a = b ⇒ ¬ (a < b) | 6 |
| 未编号 · b86f5e | Irreflexivity of > | Theorem | ¬ (a > a) | 6 |
| 未编号 · c11d51 | <-Monotonicity of + | Theorem | a < b ⇒ (c < d ⇒ a + c < b + d) | 6 |
| 未编号 · cdba4a | Asymmetry of < | Theorem | ¬ (a < b ∧ b < a) | 6 |
| 未编号 · f226ab | Transitivity of ≤ | Theorem | a ≤ b ⇒ (b ≤ c ⇒ a ≤ c) | 6 |
| 未编号 · f651fd | Converse of < | Theorem | a > b ≡ b < a | 6 |
| 未编号 · fa5564 | Cancellation of unary minus | Theorem | - a = - b ≡ a = b | 6 |

## 2025 notebook · 模块 Week 5

出现于 notebook：[2025i Exercise 5.3: Simple Proofs `By cases` on ℕ · 预载列表](http://130.113.68.214:15048/), [2025i Exercise 5.5: Sum Quantification in ℤ · 预载列表](http://130.113.68.214:15050/), [2025i Exercise 6.1: Introduction to Sequences · 预载列表](http://130.113.68.214:15052/), [2025i Exercise 6.2: Sequences Continued · 预载列表](http://130.113.68.214:15053/), [2025i Exercise 6.6: Correctness of `while` Loops · 预载列表](http://130.113.68.214:15057/), [2025i Exercise 9.4: Sum Quantification Misc. · 预载列表](http://130.113.68.214:15086/)

| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |
|---|---|---|---|---:|
| 未编号 · 042fcf | Predecessor | Theorem | pred n = n - 1 | 1 |
| 未编号 · 0743d7 | Identity of · | Corollary | 1 · a = a | 1 |
| 未编号 · 07c61f | Distributivity of ∑ over + | Axiom | (∑ x ❙ R • E₁ + E₂ ) = (∑ x ❙ R • E₁ ) + (∑ x ❙ R • E₂ ) | 1 |
| 未编号 · 153663 | Dummy renaming for ∑；别名：α-conversion for ∑ | Axiom | (∑ x ❙ R • E ) = (∑ y ❙ R[x ≔ y] • E[x ≔ y] ) | 1 |
| 未编号 · 185ca9 | Empty range for ∑ | Axiom | (∑ x ❙ false • E ) = 0 | 1 |
| 未编号 · 1960cd | Split off ∑-term from bottom of ≤-<-suc range | Theorem | m ≤ n ⇒ (∑ i ❙ m ≤ i < n + 1 • E ) = E[i ≔ m] + (∑ i ❙ m + 1 ≤ i < n + 1 • E ) | 1 |
| 未编号 · 19df80 | Zero is not one | Theorem | 0 = 1 ≡ false | 1 |
| 未编号 · 231c87 | Least greater element；别名：Successor at most、Definition of < via successor and ≤ | Theorem | a < b ≡ a + 1 ≤ b | 5 |
| 未编号 · 23fe3b | Predecessor of zero | Axiom | pred 0 = 0 | 1 |
| 未编号 · 243af9 | Cancellation of `suc` | Axiom | suc m = suc n ≡ m = n | 1 |
| 未编号 · 29ef84 | Split off ∑-term from bottom of ≤-< range | Theorem | m < n ⇒ (∑ i ❙ m ≤ i < n • E ) = E[i ≔ m] + (∑ i ❙ m + 1 ≤ i < n • E ) | 1 |
| 未编号 · 2b77ed | Successor greater；别名：Definition of ≥ via successor and > | Theorem | a + 1 > b ≡ a ≥ b | 5 |
| 未编号 · 35e920 | Split off <-≤ range at top | Theorem | m < n ⇒ (m < i ≤ n ≡ m < i < n ∨ i = n) | 5 |
| 未编号 · 39bf4c | Zero ∑ body | Theorem | (∑ x ❙ R • 0 ) = 0 | 1 |
| 未编号 · 3bc8d4 | Zero sum | Theorem | 0 = a + b ≡ 0 = a ∧ 0 = b | 1 |
| 未编号 · 4163b2 | Identity of + | Corollary | 0 + a = a | 1 |
| 未编号 · 48118f | Split off ≤-≤ range at top | Theorem | m ≤ n ⇒ (m ≤ i ≤ n ≡ m ≤ i < n ∨ i = n) | 5 |
| 未编号 · 504508 | One-point rule for ∑ | Axiom | (∑ x ❙ x = D • E ) = E[x ≔ D] | 1 |
| 未编号 · 5a9a26 | Interchange of dummies for ∑ | Theorem | (∑ x ❙ Q • (∑ y ❙ R • P ) ) = (∑ y ❙ R • (∑ x ❙ Q • P ) ) | 1 |
| 未编号 · 617d8f | Zero is not one | Theorem | 0 ≠ 1 | 1 |
| 未编号 · 642a29 | Split off <-≤ range at bottom | Theorem | m < n ⇒ (m < i ≤ n ≡ m + 1 < i ≤ n ∨ i = m + 1) | 5 |
| 未编号 · 64c114 | Distributivity of · over ∑ | Axiom | a · (∑ x ❙ R • E ) = (∑ x ❙ R • a · E ) | 1 |
| 未编号 · 65abc8 | Split off ≤-<-suc range at top | Theorem | m ≤ n ⇒ (m ≤ i < n + 1 ≡ m ≤ i < n ∨ i = n) | 5 |
| 未编号 · 680791 | Split off <-≤-suc range at bottom | Theorem | m ≤ n ⇒ (m < i ≤ n + 1 ≡ m + 1 < i ≤ n + 1 ∨ i = m + 1) | 5 |
| 未编号 · 69866c | Predecessor of successor | Axiom | pred (suc n) = n | 1 |
| 未编号 · 79e5c6 | Cancellation of + | Theorem | k + m = k + n ≡ m = n | 1 |
| 未编号 · 831dfd | Split off ≤-≤ range at bottom | Theorem | m ≤ n ⇒ (m ≤ i ≤ n ≡ i = m ∨ m + 1 ≤ i ≤ n) | 5 |
| 未编号 · 857ba4 | Predecessor of non-zero | Theorem | n ≠ 0 ≡ suc pred  n = n | 1 |
| 未编号 · 874365 | Empty range <_< | Theorem | a < b < a ≡ false | 5 |
| 未编号 · 94c723 | Leibniz for ∑ range | Axiom | (∀ x • R₁ ≡ R₂ ) ⇒ (∑ x ❙ R₁ • E ) = (∑ x ❙ R₂ • E ) | 1 |
| 未编号 · 97f8db | Disjoint range split for ∑ | Theorem | (∀ x • Q ∧ R ≡ false ) ⇒ (∑ x ❙ Q ∨ R • E ) = (∑ x ❙ Q • E ) + (∑ x ❙ R • E ) | 1 |
| 未编号 · 9afd85 | Zero product | Theorem | 0 = a · b ≡ 0 = a ∨ 0 = b | 1 |
| 未编号 · a13a80 | Split off <-≤-suc range at top | Theorem | m ≤ n ⇒ (m < i ≤ n + 1 ≡ m < i ≤ n ∨ i = n + 1) | 5 |
| 未编号 · b27a0c | Empty range ≤_< | Theorem | a ≤ b < a ≡ false | 5 |
| 未编号 · b8d351 | Split off ≤-≤ range at bottom | Theorem | m ≤ n ⇒ (m ≤ i ≤ n ≡ i = m ∨ m < i ≤ n) | 5 |
| 未编号 · bb17de | Less than successor；别名：Definition of ≤ via < and successor | Theorem | a < b + 1 ≡ a ≤ b | 5 |
| 未编号 · bf397f | Empty range <_< | Theorem | a < b < a ⇒ false | 5 |
| 未编号 · c1d724 | Dummy list permutation for ∑ | Axiom | (∑ x, y ❙ R • E ) = (∑ y, x ❙ R • E ) | 1 |
| 未编号 · c3117c | Replacement in ∑ | Theorem | (∑ x ❙ R ∧ e = f • E[y ≔ e] ) = (∑ x ❙ R ∧ e = f • E[y ≔ f] ) | 1 |
| 未编号 · c508e2 | Nesting for ∑ | Axiom | (∑ x ❙ Q • (∑ y ❙ R • E ) ) = (∑ x, y ❙ Q ∧ R • E ) | 1 |
| 未编号 · c793cd | Empty range <_≤ | Theorem | a < b ≤ a ≡ false | 5 |
| 未编号 · cbf866 | Leibniz for ∑ body | Axiom | (∀ x • R ⇒ E₁ = E₂ ) ⇒ (∑ x ❙ R • E₁ ) = (∑ x ❙ R • E₂ ) | 1 |
| 未编号 · d64a69 | Zero is not successor | Theorem | 0 ≠ suc n | 1 |
| 未编号 · d80818 | At least successor；别名：Definition of > via ≥ and successor | Theorem | a > b ≡ a ≥ b + 1 | 5 |
| 未编号 · df7705 | Zero of · | Corollary | 0 · a = 0 | 1 |
| 未编号 · e1f012 | Zero is not successor | Axiom | 0 = suc n ≡ false | 1 |
| 未编号 · e5bad3 | Least positive | Axiom | pos a ≡ 1 ≤ a | 5 |
| 未编号 · ec8ec7 | Split off ≤-<-suc range at bottom | Theorem | m ≤ n ⇒ (m ≤ i < n + 1 ≡ m + 1 ≤ i < n + 1 ∨ i = m) | 5 |
| 未编号 · f4bf83 | Split off ∑-term from top of ≤-<-suc range | Theorem | m ≤ n ⇒ (∑ i ❙ m ≤ i < n + 1 • E ) = (∑ i ❙ m ≤ i < n • E ) + E[i ≔ n] | 1 |
| 未编号 · fb7322 | Split off ≤-< range at bottom | Theorem | m < n ⇒ (m ≤ i < n ≡ m + 1 ≤ i < n ∨ i = m) | 5 |
| 未编号 · feb464 | Range split for ∑ | Axiom | (∑ x ❙ Q ∨ R • E ) + (∑ x ❙ Q ∧ R • E ) = (∑ x ❙ Q • E ) + (∑ x ❙ R • E ) | 1 |

## 2025 notebook · 模块 Week 6

出现于 notebook：[2025i Exercise 6.2: Sequences Continued · 预载列表](http://130.113.68.214:15053/), [2025i Exercise 6.6: Correctness of `while` Loops · 预载列表](http://130.113.68.214:15057/), [2025i Exercise 9.2: Binary Trees · 预载列表](http://130.113.68.214:15076/), [2025i Exercise 9.2 (variant): Binary Trees · 预载列表](http://130.113.68.214:15077/), [2025i Assignment 2 Notebook 2: Conditional Commands · 预载列表](http://130.113.68.214:15082/), [2025i Exercise 9.3: Sequences Misc. · 预载列表](http://130.113.68.214:15085/), [HW19 · CalcCheck preloaded theorem list](http://130.113.68.214:15073/), [HW19-2 · CalcCheck preloaded theorem list](http://130.113.68.214:15074/)

| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |
|---|---|---|---|---:|
| (13.10) | Membership in 𝜖 | Axiom | x ∈ 𝜖 ≡ false | 5 |
| (13.11) | Membership in ◃ | Axiom | x ∈ y ◃ ys ≡ x = y ∨ x ∈ ys | 5 |
| (13.12) | Definition of ▹ for 𝜖 | Axiom | 𝜖 ▹ a = a ◃ 𝜖 | 6 |
| (13.13) | Definition of ▹ for ◃ | Axiom | (a ◃ s) ▹ b = a ◃ (s ▹ b) | 6 |
| (13.14) | Snoc is not empty | Theorem | xs ▹ x ≠ 𝜖 | 6 |
| (13.16) | Membership in ▹ | Theorem | x ∈ ys ▹ z ≡ x ∈ ys ∨ x = z | 5 |
| (13.17) | Left-identity of ⌢；别名：Definition of ⌢ for 𝜖 | Axiom | 𝜖 ⌢ ys = ys | 6 |
| (13.18) | Mutual associativity of ◃ with ⌢；别名：Definition of ⌢ for ◃ | Axiom | (x ◃ xs) ⌢ ys = x ◃ (xs ⌢ ys) | 6 |
| (13.19) | Right-identity of ⌢ | Theorem | xs ⌢ 𝜖 = xs | 6 |
| (13.20) | Associativity of ⌢ | Theorem | (xs ⌢ ys) ⌢ zs = xs ⌢ (ys ⌢ zs) | 6 |
| (13.21) | Membership in ⌢ | Theorem | x ∈ ys ⌢ zs ≡ x ∈ ys ∨ x ∈ zs | 5 |
| (13.23) | Empty concatenation | Theorem | xs ⌢ ys = 𝜖 ≡ xs = 𝜖 ∧ ys = 𝜖 | 6 |
| (13.3) | Cons is not empty | Axiom | x ◃ xs ≠ 𝜖 | 6 |
| (13.4) | Cancellation of ◃ | Axiom | x ◃ xs = y ◃ ys ≡ x = y ∧ xs = ys | 6 |
| (13.6) | Cons decomposition | Theorem | xs = 𝜖 ∨ (∃ y • (∃ ys • xs = y ◃ ys ) ) | 5 |
| (13.7) | Tail is different | Theorem | (∀ xs : Seq A • (∀ x : A • x ◃ xs ≠ xs ) ) | 5 |
| (13.7.1) | Tail is different | Theorem | x ◃ xs ≠ xs | 5 |
| (Ex5.2a) | 原文未命名 | Fact | isSorted (1 ◃ (3 ◃ (4 ◃ (7 ◃ 𝜖)))) | 5 |
| (Ex5.2b) | 原文未命名 | Fact | (insert 5) (1 ◃ (3 ◃ (4 ◃ (7 ◃ 𝜖)))) = 1 ◃ (3 ◃ (4 ◃ (5 ◃ (7 ◃ 𝜖)))) | 5 |
| (Ex6.5.1) | 原文未命名 | Theorem | x < 2 ∧ 5 < y ⇒ x < 3 < y | 2 |
| (Ex6.5.2) | 原文未命名 | Theorem | (x < 2 ⇒ 5 ≤ y) ⇒ (x < 1 ⇒ 4 ≤ y) | 2 |
| (Ex6.5.3) | 原文未命名 | Theorem | x ≤ y ⇒ 2 · x ≤ 2 · y | 2 |
| (Ex6.5.4) | 原文未命名 | Theorem | x ≤ y ≤ z ⇒ (¬ (y ≤ 2 · y) ⇒ ¬ (z ≤ 2 · x)) | 2 |
| (Ex6.5.5) | 原文未命名 | Theorem | x ≤ 5 ∧ (∀ y ❙ 3 ≤ y • x < y ) ⇒ x ≤ 7 ∧ (∀ y ❙ 9 ≤ y • x < y ) | 2 |
| (H13a) | 原文未命名 | Fact | (7 ◃ (1 ◃ (9 ◃ 𝜖))) ▹ 5 = 7 ◃ (1 ◃ (9 ◃ (5 ◃ 𝜖))) | 6 |
| (H13b) | 原文未命名 | Fact | (4 ◃ (1 ◃ 𝜖)) ⌢ (8 ◃ (5 ◃ (2 ◃ 𝜖))) = 4 ◃ (1 ◃ (8 ◃ (5 ◃ (2 ◃ 𝜖)))) | 6 |
| 未编号 · 026e7f | Left-antitonicity of < | Theorem | p ≤ q ⇒ (q < r ⇒ p < r) | 2 |
| 未编号 · 04a037 | Sortedness | Axiom | isSorted (k ◃ (m ◃ ns)) ≡ k ≤ m ∧ isSorted (m ◃ ns) | 5 |
| 未编号 · 0656e9 | Definition of `map` for ▹ | Theorem | (map f) (xs ▹ x) = (map f) xs ▹ f x | 5 |
| 未编号 · 087b09 | Definition of `double` | Axiom | double n = 2 · n | 5 |
| 未编号 · 3160d4 | insert preserves membership | Theorem | m ∈ ns ⇒ m ∈ (insert k) ns | 5 |
| 未编号 · 37d49b | Distributivity of `map` over ⌢ | Theorem | (map f) (xs ⌢ ys) = (map f) xs ⌢ (map f) ys | 5 |
| 未编号 · 3d2d0a | Weak left-antitonicity of < | Theorem | p < q ⇒ (q < r ⇒ p < r) | 2 |
| 未编号 · 4c14b2 | Trichotomy — ∨ | Theorem | a < b ∨ (a = b ∨ a > b) | 5 |
| 未编号 · 4d059f | 𝜖 is sorted | Axiom | isSorted 𝜖 | 5 |
| 未编号 · 525492 | Sequence cases | Corollary | xs = 𝜖 ∨ xs = head xs ◃ tail xs | 6 |
| 未编号 · 54e64f | insert after ◃ | Axiom | k > m ⇒ (insert k) (m ◃ ns) = m ◃ (insert k) ns | 5 |
| 未编号 · 71e2a4 | insert into 𝜖 | Axiom | (insert k) 𝜖 = k ◃ 𝜖 | 5 |
| 未编号 · 767b3e | insert preserves sortedness | Theorem | isSorted ns ⇒ isSorted ((insert k) ns) | 5 |
| 未编号 · 7b97e3 | Right-monotonicity of < | Theorem | p ≤ q ⇒ (r < p ⇒ r < q) | 2 |
| 未编号 · 8ad9cb | Left-antitonicity of ≤ | Theorem | p ≤ q ⇒ (q ≤ r ⇒ p ≤ r) | 2 |
| 未编号 · 97f231 | Cons is not empty | Corollary | x ◃ xs = 𝜖 ≡ false | 6 |
| 未编号 · a7f85c | Definition of `head` | Axiom | head (x ◃ xs) = x | 6 |
| 未编号 · a7fbef | Multiplying by 3 | Theorem | 3 · x = (x + x) + x | 2 |
| 未编号 · ad4220 | Snoc is not empty | Corollary | xs ▹ x = 𝜖 ≡ false | 6 |
| 未编号 · b201e0 | Strict sequence cases | Theorem | xs = 𝜖 ≢ xs = head xs ◃ tail xs | 6 |
| 未编号 · bab4cf | Definition of `tail` | Axiom | tail (x ◃ xs) = xs | 6 |
| 未编号 · bb884d | Weak right-monotonicity of < | Theorem | p < q ⇒ (r < p ⇒ r < q) | 2 |
| 未编号 · be4928 | Definition of `map` for 𝜖 | Axiom | (map f) 𝜖 = 𝜖 | 5 |
| 未编号 · c6e548 | Singletons are sorted | Axiom | isSorted (k ◃ 𝜖) | 5 |
| 未编号 · c81239 | insert before ◃ | Axiom | k ≤ m ⇒ (insert k) (m ◃ ns) = k ◃ (m ◃ ns) | 5 |
| 未编号 · cd096c | Right-monotonicity of ≤ | Theorem | p ≤ q ⇒ (r ≤ p ⇒ r ≤ q) | 2 |
| 未编号 · d19257 | Non-empty-sequence decomposition | Theorem | xs ≠ 𝜖 ⇒ xs = head xs ◃ tail xs | 6 |
| 未编号 · d63816 | Multiplying by 2 | Theorem | 2 · x = x + x | 2 |
| 未编号 · db781a | Definition of `map` for ◃ | Axiom | (map f) (x ◃ xs) = f x ◃ (map f) xs | 5 |
| 未编号 · eaa9f3 | Membership in `insert` | Theorem | m ∈ (insert k) ns ≡ m = k ∨ m ∈ ns | 5 |
| 未编号 · fe9fa0 | Complement of < | Theorem | a < b ≢ a ≥ b | 5 |

## 2025 notebook · 模块 Week 7

出现于 notebook：[2025i Exercise 7.1: Set Theory · 预载列表](http://130.113.68.214:15060/), [2025i Exercise 7.3: Typed Universal Sets · 预载列表](http://130.113.68.214:15064/), [2025i Exercise 7.4: Relations via Set Theory: More Properties · 预载列表](http://130.113.68.214:15066/), [2025i Reference Notebook “Basic Relation Operation Properties” · 预载列表](http://130.113.68.214:15067/), [2025i Reference Notebook “Operators Combining Sets and Relations” · 预载列表](http://130.113.68.214:15070/), [2025i Exercise 8.2: Operators Combining Sets and Relations · 预载列表](http://130.113.68.214:15071/), [2025i Reference Notebook “Subidentity Relations in Set Theory” · 预载列表](http://130.113.68.214:15080/), [2025i Assignment 2 Notebook 1: Partial-Function Application · 预载列表](http://130.113.68.214:15081/), [2025i Reference Notebook “Z Arrows” · 预载列表](http://130.113.68.214:15084/), [HW15-1 · CalcCheck preloaded theorem list](http://130.113.68.214:15062/), [HW15-2 · CalcCheck preloaded theorem list](http://130.113.68.214:15063/), [HW16 · CalcCheck preloaded theorem list](http://130.113.68.214:15065/), [HW17 · CalcCheck preloaded theorem list](http://130.113.68.214:15069/)

| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |
|---|---|---|---|---:|
| (11.13) | Set inclusion；别名：Subset、Definition of ⊆ | Axiom | S ⊆ T ≡ (∀ e • e ∈ S ⇒ e ∈ T ) | 1 |
| (11.26) | Symmetry of ∪ | Theorem | S ∪ T = T ∪ S | 1 |
| (11.27) | Associativity of ∪ | Theorem | S ∪ (T ∪ W) = (S ∪ T) ∪ W | 1 |
| (11.28) | Idempotency of ∪ | Theorem | S ∪ S = S | 1 |
| (11.31) | Weakening of ∪ | Theorem | S ⊆ S ∪ T | 1 |
| (11.4) | Set extensionality | Axiom | S = T ≡ (∀ e • e ∈ S ≡ e ∈ T ) | 1 |
| (11.59) | Transitivity of ⊆ | Theorem | X ⊆ Y ⇒ (Y ⊆ Z ⇒ X ⊆ Z) | 1 |
| (14.2) | Pair equality | Axiom | ⟨b, c⟩ = ⟨b', c'⟩ ≡ b = b' ∧ c = c' | 12 |
| (14.4) | Membership in × | Theorem | ⟨x, y⟩ ∈ S × T ≡ x ∈ S ∧ y ∈ T | 12 |
| (14.5) | Membership in swapped × | Theorem | ⟨x, y⟩ ∈ S × T ≡ ⟨y, x⟩ ∈ T × S | 12 |
| (14.6) | Empty factor in × | Theorem | S = {} ⇒ S × T = {} | 12 |
| 未编号 · 021cd3 | snd after swap-× | Theorem | snd (swap-× p) = fst p | 12 |
| 未编号 · 035aaa | Pair equality | Axiom | p = q ≡ fst p = fst q ∧ snd p = snd q | 12 |
| 未编号 · 11c8af | Relation union | Theorem | a ⦗ R ∪ S ⦘ b ≡ a ⦗ R ⦘ b ∨ a ⦗ S ⦘ b | 10 |
| 未编号 · 258db7 | Relation inclusion | Corollary | R ⊆ S ≡ (∀ x, y ❙ x ⦗ R ⦘ y • x ⦗ S ⦘ y ) | 10 |
| 未编号 · 302939 | Relation inclusion | Corollary | R ⊆ S ≡ (∀ x • (∀ y ❙ x ⦗ R ⦘ y • x ⦗ S ⦘ y ) ) | 10 |
| 未编号 · 38c228 | Empty relation | Theorem | a ⦗ {} ⦘ b ≡ false | 10 |
| 未编号 · 3e0f4b | Cartesian product of universal sets | Theorem | 𝐔 × 𝐔 = 𝐔 | 10 |
| 未编号 · 430a99 | Relation extensionality | Corollary | R = S ≡ (∀ x, y • x ⦗ R ⦘ y ≡ x ⦗ S ⦘ y ) | 10 |
| 未编号 · 4a98c7 | Pair extensionality | Theorem | p = ⟨fst p, snd p⟩ | 12 |
| 未编号 · 512e5b | Definition of `snd` | Axiom | snd ⟨x, y⟩ = y | 12 |
| 未编号 · 538ae9 | Definition of 𝕀 via `id` | Axiom | 𝕀 = id 𝐔 | 10 |
| 未编号 · 54dc6e | Relation complement | Theorem | a ⦗ ~ R ⦘ b ≡ ¬ (a ⦗ R ⦘ b) | 10 |
| 未编号 · 697e4a | Singleton relation inclusion | Lemma | { ⟨a, b⟩ } ⊆ R ≡ a ⦗ R ⦘ b | 10 |
| 未编号 · 741e9f | Membership in `Ran` | Axiom | y ∈ Ran R ≡ (∃ x • x ⦗ R ⦘ y ) | 10 |
| 未编号 · 788acc | Relationship via 𝕀；别名：Identity relation | Theorem | x ⦗ 𝕀 ⦘ y ≡ x = y | 10 |
| 未编号 · 7cec6b | Definition of `fst` | Axiom | fst ⟨x, y⟩ = x | 12 |
| 未编号 · 81fb75 | Relation inclusion | Corollary | R ⊆ S ≡ (∀ x, y • x ⦗ R ⦘ y ⇒ x ⦗ S ⦘ y ) | 10 |
| 未编号 · 858f00 | fst after swap-× | Theorem | fst (swap-× p) = snd p | 12 |
| 未编号 · 8665d0 | Definition of `swap-×` | Axiom | swap-× ⟨x, y⟩ = ⟨y, x⟩ | 12 |
| 未编号 · 870e03 | Membership in `Dom` | Axiom | x ∈ Dom R ≡ (∃ y • x ⦗ R ⦘ y ) | 10 |
| 未编号 · 8b8c1e | Singleton relation | Lemma | a₁ ⦗ { ⟨a₂, b₂⟩ } ⦘ b₁ ≡ a₁ = a₂ ∧ b₁ = b₂ | 10 |
| 未编号 · 8bea72 | Universal relation；别名：Relationship via `𝐔` | Theorem | a ⦗ 𝐔 ⦘ b | 10 |
| 未编号 · 94e8f6 | Definition of ↔ | Axiom | t₁ ↔ t₂ = set ❰ t₁, t₂ ❱ | 10 |
| 未编号 · 9b02ef | Relationship via × | Theorem | a ⦗ Y × Z ⦘ b ≡ a ∈ Y ∧ b ∈ Z | 10 |
| 未编号 · a001f2 | Relation intersection | Theorem | a ⦗ R ∩ S ⦘ b ≡ a ⦗ R ⦘ b ∧ a ⦗ S ⦘ b | 10 |
| 未编号 · a3a8c5 | Weakening of ∩ within ∪ | Theorem | Q ∪ (S ∩ T) ⊆ Q ∪ S | 1 |
| 未编号 · a73795 | Relation converse；别名：Relationship via ˘ | Axiom | y ⦗ R ˘ ⦘ x ≡ x ⦗ R ⦘ y | 10 |
| 未编号 · ae38b2 | Subset membership；别名：Casting | Theorem | X ⊆ Y ⇒ (x ∈ X ⇒ x ∈ Y) | 1 |
| 未编号 · affdb1 | Membership in × | Axiom | p ∈ S × T ≡ fst p ∈ S ∧ snd p ∈ T | 12 |
| 未编号 · b322bf | Relationship via ⌜_⌝ | Axiom | a ⦗ ⌜ f ⌝ ⦘ b ≡ (f a) b | 10 |
| 未编号 · bf36b8 | Golden rule for ∩ and ∪ | Theorem | S ∩ T = S ≡ T = S ∪ T | 1 |
| 未编号 · c1b248 | Relationship via `id` | Corollary | x ⦗ id S ⦘ y ≡ y = x ∈ S | 10 |
| 未编号 · c486b0 | Relationship via `id` | Axiom | x ⦗ id S ⦘ y ≡ x = y ∈ S | 10 |
| 未编号 · cb3ad2 | Relation pseudocomplement | Theorem | a ⦗ R ➩ S ⦘ b ≡ a ⦗ R ⦘ b ⇒ a ⦗ S ⦘ b | 10 |
| 未编号 · d13235 | Relation composition | Axiom | a ⦗ R ⨾ S ⦘ c ≡ (∃ b • a ⦗ R ⦘ b ∧ b ⦗ S ⦘ c ) | 10 |
| 未编号 · d79ed2 | Relation difference | Theorem | a ⦗ R - S ⦘ b ≡ a ⦗ R ⦘ b ∧ ¬ (a ⦗ S ⦘ b) | 10 |
| 未编号 · e13186 | Infix relationship；别名：Definition of `_⦗_⦘_` | Axiom | a ⦗ R ⦘ b ≡ ⟨a, b⟩ ∈ R | 10 |
| 未编号 · e72dae | Union | Axiom | e ∈ S ∪ T ≡ e ∈ S ∨ e ∈ T | 1 |
| 未编号 · f0fb23 | Relation inclusion | Theorem | R ⊆ S ≡ (∀ x • (∀ y • x ⦗ R ⦘ y ⇒ x ⦗ S ⦘ y ) ) | 10 |
| 未编号 · f32877 | Relation extensionality | Theorem | R = S ≡ (∀ x • (∀ y • x ⦗ R ⦘ y ≡ x ⦗ S ⦘ y ) ) | 10 |
| 未编号 · f6b61a | Intersection | Axiom | e ∈ S ∩ T ≡ e ∈ S ∧ e ∈ T | 1 |
| 未编号 · fc3ef2 | Relationship via `𝐔 × 𝐔` | Theorem | a ⦗ 𝐔 × 𝐔 ⦘ b | 10 |

## 2025 notebook · 模块 Week 8

出现于 notebook：[2025i Reference Notebook “Subidentity Relations in Set Theory” · 预载列表](http://130.113.68.214:15080/), [2025i Assignment 2 Notebook 1: Partial-Function Application · 预载列表](http://130.113.68.214:15081/), [2025i Reference Notebook “Z Arrows” · 预载列表](http://130.113.68.214:15084/)

| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |
|---|---|---|---|---:|
| 未编号 · 13fe79 | Injectivity of converse | Theorem | injective  (R ˘) ≡ univalent  R | 3 |
| 未编号 · 2180e0 | Definition of injectivity | Axiom | injective R ≡ R ⨾ R ˘ ⊆ 𝕀 | 3 |
| 未编号 · 4100a4 | Definition of surjectivity | Axiom | surjective R ≡ 𝕀 ⊆ R ˘ ⨾ R | 3 |
| 未编号 · 4aa839 | Univalence | Theorem | univalent  R ≡ (∀ b₁ • (∀ b₂ • (∀ a • a ⦗ R ⦘ b₁ ∧ a ⦗ R ⦘ b₂ ⇒ b₁ = b₂ ) ) ) | 3 |
| 未编号 · 5118ae | Univalence of composition | Theorem | univalent  R ⇒ (univalent  S ⇒ univalent  (R ⨾ S)) | 3 |
| 未编号 · 5b575b | Totality of union | Theorem | total  R ⇒ (total  S ⇒ total  (R ∪ S)) | 3 |
| 未编号 · 611b00 | Injectivity | Theorem | injective  R ≡ (∀ a₁ • (∀ a₂ • (∀ b • a₁ ⦗ R ⦘ b ∧ a₂ ⦗ R ⦘ b ⇒ a₁ = a₂ ) ) ) | 3 |
| 未编号 · 845d6a | Univalence of converse | Theorem | univalent  (R ˘) ≡ injective  R | 3 |
| 未编号 · afcd3e | Definition of totality | Axiom | total R ≡ 𝕀 ⊆ R ⨾ R ˘ | 3 |
| 未编号 · b1607a | Domain of total relations | Theorem | total  R ≡ Dom  R = 𝐔 | 3 |
| 未编号 · b9c5ff | Definition of univalence | Axiom | univalent R ≡ R ˘ ⨾ R ⊆ 𝕀 | 3 |
| 未编号 · c11e24 | Totality of converse | Theorem | total  (R ˘) ≡ surjective  R | 3 |
| 未编号 · cec7e1 | Domain of total relations | Theorem | total  R ≡ 𝐔 ⊆ Dom  R | 3 |
| 未编号 · d1f880 | Surjectivity | Theorem | surjective  R ≡ (∀ b • (∃ a • a ⦗ R ⦘ b ) ) | 3 |
| 未编号 · d48b85 | Totality | Theorem | total  R ≡ (∀ a • (∃ b • a ⦗ R ⦘ b ) ) | 3 |

## 2025 notebook · 模块 Week 9

出现于 notebook：[2025i Exercise 9.1: Multiplication on ℕ Using Explicit Induction Principle · 预载列表](http://130.113.68.214:15075/), [2025i Exercise 9.2: Binary Trees · 预载列表](http://130.113.68.214:15076/), [2025i Exercise 9.2 (variant): Binary Trees · 预载列表](http://130.113.68.214:15077/), [2025i Exercise 10.2: Bags · 预载列表](http://130.113.68.214:15088/)

| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |
|---|---|---|---|---:|
| (11.4) | Bag extensionality | Axiom | B = C ≡ (∀ e • e # B = e # C ) | 1 |
| (11.79) | Bag membership | Axiom | F ⋿ ⟅ x ❙ R • E ⟆ ≡ (∃ x ❙ R • F = E ) | 1 |
| (11.79) | Bag membership | Axiom | F ⋿ ⟅ x, y ❙ R • E ⟆ ≡ (∃ x, y ❙ R • F = E ) | 1 |
| (11.80) | Bag comprehension size | Axiom | # ⟅ x ❙ R • E ⟆ = (∑ x ❙ R • 1 ) | 1 |
| (11.80) | Bag comprehension size | Axiom | # ⟅ x, y ❙ R • E ⟆ = (∑ x, y ❙ R • 1 ) | 1 |
| (11.81) | Bag occurrences | Axiom | a # ⟅ x : t; y : u ❙ R • E ⟆ = (∑ x : t; y : u ❙ R ∧ a = E • 1 ) | 1 |
| (11.81) | Bag occurrences | Axiom | a # ⟅ x : t ❙ R • E ⟆ = (∑ x : t ❙ R ∧ a = E • 1 ) | 1 |
| (11.83) | Subbag；别名：Definition of ⊆、Bag inclusion | Axiom | B ⊆ C ≡ (∀ e • e # B ≤ e # C ) | 1 |
| (13.7) | Tail is different | Theorem | (∀ xs : Seq  A • (∀ x : A • x ◃ xs = xs ≡ false ) ) | 1 |
| 未编号 · 02c33b | Zero is not successor | Theorem | 0 ≠ n + 1 | 1 |
| 未编号 · 02e97a | Symmetry of + | Theorem | (∀ m • (∀ n • m + n = n + m ) ) | 1 |
| 未编号 · 04e9d3 | Bag abbreviation | Theorem | ⟅ x, y ❙ P ⟆ = ⟅ x, y ❙ P • ⟨x, y⟩ ⟆ | 1 |
| 未编号 · 053d26 | Snoc-induction over sequences | Axiom | P[xs ≔ 𝜖] ⇒ ((∀ xs : Seq  A ❙ P • (∀ x : A • P[xs ≔ xs ▹ x] ) ) ⇒ (∀ xs : Seq  A • P )) | 1 |
| 未编号 · 123557 | Alternative definition of `t1` | Fact | t1 = (｢ 2 ｣ ◿ 3 ◺ ｢ 5 ｣) ◿ 7 ◺ (◬ ◿ 10 ◺ ｢ 11 ｣) | 1 |
| 未编号 · 18614a | Simple bag membership | Theorem | e ⋿ ⟅ x ❙ P ⟆ ≡ P[x ≔ e] | 1 |
| 未编号 · 1e153f | Mirroring singleton trees | Theorem | ｢ x ｣ ˘ = ｢ x ｣ | 1 |
| 未编号 · 24abc7 | Definition of ◃ | Axiom | x ◃ 𝜖 = 𝜖 ▹ x | 1 |
| 未编号 · 2bdb6a | Mirror | Axiom | EmptyT ˘ = EmptyT | 1 |
| 未编号 · 2f7ec4 | Empty tree height | Axiom | height  ◬ = 0 | 1 |
| 未编号 · 2fb1bf | Mirroring singleton trees | Theorem | singleton  x ˘ = singleton  x | 1 |
| 未编号 · 2fd619 | Empty tree height | Axiom | height  EmptyT = 0 | 1 |
| 未编号 · 3a5de3 | Bag inclusion via ∪ | Theorem | S ⊆ T ≡ S ∪ (T - S) = T | 1 |
| 未编号 · 3bfbc2 | Definition of `t1` | Axiom | t1 = ((Branch  (((Branch  (((Branch  EmptyT)  2)  EmptyT))  3)  (((Branch  EmptyT)  5)  EmptyT)))  7)  (((Branch  EmptyT)  10)  (((Branch  EmptyT)  11)  EmptyT)) | 1 |
| 未编号 · 3d5144 | Bag difference | Axiom | v # S - T = (v # S) - (v # T) | 1 |
| 未编号 · 3eb300 | Height of `t1` | Fact | height  t1 = 3 | 2 |
| 未编号 · 437e92 | Bag intersection | Axiom | e # S ∩ T = (e # S) ↓ (e # T) | 1 |
| 未编号 · 4394e6 | Induction over ℕ | Axiom | P[n ≔ 0] ⇒ ((∀ n : ℕ ❙ P • P[n ≔ n + 1] ) ⇒ (∀ n : ℕ • P )) | 1 |
| 未编号 · 43f867 | Bag size | Theorem | # B = (∑ x, i ❙ i < x # B • 1 ) | 1 |
| 未编号 · 475b6e | Definition of ◃ | Axiom | x ◃ (xs ▹ y) = (x ◃ xs) ▹ y | 1 |
| 未编号 · 4aaf6e | Tree induction | Axiom | P[t ≔ ◬] ∧ (∀ l : Tree  A; r : Tree  A; x : A • P[t ≔ l] ∧ P[t ≔ r] ⇒ P[t ≔ l ◿ x ◺ r] ) ⇒ (∀ t : Tree  A • P ) | 1 |
| 未编号 · 4d0f55 | Definition of + | Axiom | 0 + n = n | 1 |
| 未编号 · 529cf6 | Associativity of bag union | Theorem | S ∪ (T ∪ W) = (S ∪ T) ∪ W | 1 |
| 未编号 · 6127a3 | Mirror | Axiom | ◬ ˘ = ◬ | 1 |
| 未编号 · 668095 | Occurrences in simple bag comprehension | Theorem | a # ⟅ x : t ❙ P ⟆ ≤ 1 | 1 |
| 未编号 · 66dc70 | Bag reconstruction | Theorem | B = ⟅ x, i ❙ i < x # B • x ⟆ | 1 |
| 未编号 · 7247e9 | Zero is not successor | Axiom | 0 = n + 1 ≡ false | 1 |
| 未编号 · 786c2e | Right-identity of + (v1) | Theorem | (∀ m : ℕ • m + 0 = m ) | 1 |
| 未编号 · 7ba011 | Branch height | Axiom | height  (l ◿ x ◺ r) = suc (height  l ↑ height  r) | 1 |
| 未编号 · 7fb685 | Singleton tree height | Lemma | height  (singleton  x) = 1 | 1 |
| 未编号 · 845e49 | Bag abbreviation | Theorem | ⟅ x ❙ P ⟆ = ⟅ x ❙ P • x ⟆ | 1 |
| 未编号 · 886e8b | Definition of `t1` | Axiom | t1 = ((◬ ◿ 2 ◺ ◬) ◿ 3 ◺ (◬ ◿ 5 ◺ ◬)) ◿ 7 ◺ (◬ ◿ 10 ◺ (◬ ◿ 11 ◺ ◬)) | 1 |
| 未编号 · 8aaaae | Equality of ▹；别名：Injectivity of ▹、Cancellation of ▹ | Axiom | xs ▹ x = ys ▹ y ≡ xs = ys ∧ x = y | 1 |
| 未编号 · 8b363f | Singleton tree | Axiom | singleton  x = ((Branch  EmptyT)  x)  EmptyT | 1 |
| 未编号 · 8c6666 | Snoc is not empty | Axiom | (∀ xs • (∀ x • xs ▹ x = 𝜖 ≡ false ) ) | 1 |
| 未编号 · 8c907e | Bag union | Axiom | e # S ∪ T = (e # S) + (e # T) | 1 |
| 未编号 · 8d539f | Right-identity of + (v2) | Theorem | (∀ m : ℕ • m + 0 = m ) | 1 |
| 未编号 · 94927a | Singleton tree height | Lemma | height  ｢ x ｣ = 1 | 1 |
| 未编号 · b24db9 | Alternative definition of `t1` | Fact | t1 = ((Branch  (((Branch  (singleton  2))  3)  (singleton  5)))  7)  (((Branch  EmptyT)  10)  (singleton  11)) | 1 |
| 未编号 · b80b07 | Symmetry of bag union | Theorem | S ∪ T = T ∪ S | 1 |
| 未编号 · bac8f9 | Right-identity of + | Theorem | m + 0 = m | 1 |
| 未编号 · bbdeac | Self-inverse of tree mirror | Theorem | (∀ t : Tree  A • (t ˘) ˘ = t ) | 2 |
| 未编号 · c04c76 | Definition of + | Axiom | (m + 1) + n = (m + n) + 1 | 1 |
| 未编号 · c7678e | Monotonicity of # | Theorem | B ⊆ C ⇒ e # B ≤ e # C | 1 |
| 未编号 · ca6a4d | Cons is not empty | Theorem | (∀ xs • (∀ x • x ◃ xs = 𝜖 ≡ false ) ) | 1 |
| 未编号 · cf483e | Right-identity of + (v0) | Theorem | (∀ m : ℕ • m + 0 = m ) | 1 |
| 未编号 · d33fa5 | Mirror | Axiom | ((Branch  l)  x)  r ˘ = ((Branch  (r ˘))  x)  (l ˘) | 1 |
| 未编号 · d43091 | Shifting successor over + | Theorem | (∀ m • (∀ n • (m + 1) + n = m + (n + 1) ) ) | 1 |
| 未编号 · d4f7e7 | Mirror | Axiom | (l ◿ x ◺ r) ˘ = r ˘ ◿ x ◺ l ˘ | 1 |
| 未编号 · da39d1 | Height of mirrored tree | Theorem | (∀ t : Tree  A • height  (t ˘) = height  t ) | 2 |
| 未编号 · da48ff | Bag difference with union | Theorem | S - (T ∪ U) = (S - T) - U | 1 |
| 未编号 · dd8beb | Singleton tree | Axiom | ｢ x ｣ = ◬ ◿ x ◺ ◬ | 1 |
| 未编号 · fa81de | Branch height | Axiom | height  (((Branch  l)  x)  r) = suc (height  l ↑ height  r) | 1 |
| 未编号 · fb9650 | Direct bag comprehension membership | Theorem | (∀ x • x ⋿ ⟅ x ❙ P ⟆ ≡ P ) | 1 |
| 未编号 · fef379 | Tree induction | Axiom | P[t ≔ EmptyT] ∧ (∀ l : Tree  A; r : Tree  A; x : A • P[t ≔ l] ∧ P[t ≔ r] ⇒ P[t ≔ ((Branch  l)  x)  r] ) ⇒ (∀ t : Tree  A • P ) | 1 |

## 2025 notebook · 模块 Week 11

出现于 notebook：[HW22 · CalcCheck preloaded theorem list](http://130.113.68.214:15108/)

| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |
|---|---|---|---|---:|
| 未编号 · 00f91c | Reflexive implies total | Theorem | reflexive R ⇒ total R | 1 |
| 未编号 · 2bba4a | Modal rule | Theorem | Q ⨾ R ∩ S ⊆ (Q ∩ S ⨾ R ˘) ⨾ R | 1 |
| 未编号 · 2f972c | Hesitation | Theorem | R ⊆ R ⨾ (R ˘ ⨾ R) | 1 |
| 未编号 · 400d69 | Swapping mapping across ⊆ | Theorem | mapping F ⇒ (R ⨾ F ⊆ S ≡ R ⊆ S ⨾ F ˘) | 1 |
| 未编号 · 44ad64 | Right-distributivity of ⨾ with univalent over ∩ | Theorem | univalent F ⇒ F ⨾ (R ∩ S) = F ⨾ R ∩ F ⨾ S | 1 |
| 未编号 · 9f0235 | Dedekind rule | Axiom | Q ⨾ R ∩ S ⊆ (Q ∩ S ⨾ R ˘) ⨾ (R ∩ Q ˘ ⨾ S) | 1 |
| 未编号 · a86336 | Idempotency from symmetric and transitive | Theorem | symmetric R ⇒ (transitive R ⇒ idempotent R) | 1 |
| 未编号 · c97154 | Modal rule | Theorem | Q ⨾ R ∩ S ⊆ Q ⨾ (R ∩ Q ˘ ⨾ S) | 1 |
| 未编号 · ca96f5 | PER factoring | Theorem | symmetric Q ⇒ (transitive Q ⇒ Q ⨾ R ∩ Q = Q ⨾ (R ∩ Q)) | 1 |

## 2026 notebook · 模块 Week 3

出现于 notebook：[2026 Ex3.1 · 自然数归纳：加法与乘法 · 预载列表](http://130.113.68.214:16022/), [2026 Ex3.2 · 自然数截断减法 · 预载列表](http://130.113.68.214:16023/), [2026 Ex3.3 · 自然数的相等与前驱 · 预载列表](http://130.113.68.214:16024/), [2026 Ex3.4 · 自然数分类证明 · 预载列表](http://130.113.68.214:16025/), [2026 H7.2 · 自然数的序 · 预载列表](http://130.113.68.214:16027/)

| 编号 | 名称（别名） | 类型 | 公式 | 来源出现次数 |
|---|---|---|---|---:|
| 未编号 · 03c7aa | Associativity of + | Theorem | (a + b) + c = a + (b + c) | 4 |
| 未编号 · 042fcf | Predecessor | Theorem | pred n = n - 1 | 2 |
| 未编号 · 05e01d | Associativity of · | Theorem | (k · m) · n = k · (m · n) | 4 |
| 未编号 · 0743d7 | Identity of · | Corollary | 1 · a = a | 2 |
| 未编号 · 19df80 | Zero is not one | Theorem | 0 = 1 ≡ false | 2 |
| 未编号 · 23fe3b | Predecessor of zero | Axiom | pred 0 = 0 | 2 |
| 未编号 · 243af9 | Cancellation of `suc` | Axiom | suc m = suc n ≡ m = n | 2 |
| 未编号 · 3bc8d4 | Zero sum | Theorem | 0 = a + b ≡ 0 = a ∧ 0 = b | 2 |
| 未编号 · 3fb235 | Monus exchange | Theorem | m + (n - m) = n + (m - n) | 3 |
| 未编号 · 4163b2 | Identity of + | Corollary | 0 + a = a | 2 |
| 未编号 · 42cf57 | Left-identity of · | Theorem | 1 · n = n | 4 |
| 未编号 · 617d8f | Zero is not one | Theorem | 0 ≠ 1 | 2 |
| 未编号 · 63a396 | Definition of + for `suc` | Axiom | suc m + n = suc (m + n) | 5 |
| 未编号 · 664fa2 | Multiplying the successor | Theorem | m · suc n = m + m · n | 4 |
| 未编号 · 667d5b | Shifting `suc` over + | Theorem | suc m + n = m + suc n | 5 |
| 未编号 · 69866c | Predecessor of successor | Axiom | pred (suc n) = n | 2 |
| 未编号 · 702635 | Subtraction from multiplication with successor | Theorem | m · suc n - m = m · n | 3 |
| 未编号 · 794d96 | Definition of `double` | Axiom | double 0 = 0 | 5 |
| 未编号 · 79adc5 | Right-zero of · | Theorem | m · 0 = 0 | 4 |
| 未编号 · 79e5c6 | Cancellation of + | Theorem | k + m = k + n ≡ m = n | 2 |
| 未编号 · 7d8ebb | Distributivity of · over subtraction | Theorem | k · (m - n) = k · m - k · n | 3 |
| 未编号 · 81f366 | Definition of + for 0；别名：Left-identity of + | Axiom | 0 + n = n | 5 |
| 未编号 · 833547 | Subtraction of zero from successor | Axiom | suc m - 0 = suc m | 3 |
| 未编号 · 857ba4 | Predecessor of non-zero | Theorem | n ≠ 0 ≡ suc pred  n = n | 2 |
| 未编号 · 8a20aa | Definition of · for 0 | Axiom | 0 · n = 0 | 4 |
| 未编号 · 8c8ad4 | Self-cancellation of subtraction | Theorem | m - m = 0 | 3 |
| 未编号 · 9afd85 | Zero product | Theorem | 0 = a · b ≡ 0 = a ∨ 0 = b | 2 |
| 未编号 · b24ac7 | Right-identity of subtraction | Theorem | m - 0 = m | 3 |
| 未编号 · b5dc15 | Distributivity of · over + | Theorem | (k + m) · n = k · n + m · n | 4 |
| 未编号 · b9d13e | Subtraction from zero | Axiom | 0 - n = 0 | 3 |
| 未编号 · bac8f9 | Right-identity of + | Theorem | m + 0 = m | 5 |
| 未编号 · c5667b | Definition of `double` | Axiom | double (suc n) = 2 + double n | 5 |
| 未编号 · cab2ec | Doubling | Theorem | double n = n + n | 5 |
| 未编号 · d0a211 | Definition of · for `suc` | Axiom | suc m · n = n + m · n | 4 |
| 未编号 · d14899 | Subtraction of successor from successor | Axiom | suc m - suc n = m - n | 3 |
| 未编号 · d64a69 | Zero is not successor | Theorem | 0 ≠ suc n | 2 |
| 未编号 · d67a9f | Subtraction after addition | Theorem | (m + n) - n = m | 3 |
| 未编号 · df7705 | Zero of · | Corollary | 0 · a = 0 | 2 |
| 未编号 · e1f012 | Zero is not successor | Axiom | 0 = suc n ≡ false | 2 |
| 未编号 · e44908 | Successor | Theorem | suc n = n + 1 | 5 |
| 未编号 · e81b8f | Subtraction of sum | Theorem | k - (m + n) = (k - m) - n | 3 |
| 未编号 · ef374b | Symmetry of · | Theorem | m · n = n · m | 4 |
| 未编号 · efb2f4 | Symmetry of + | Theorem | m + n = n + m | 5 |
