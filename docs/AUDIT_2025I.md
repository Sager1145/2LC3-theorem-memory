# 2025i CalcCheck notebook 预载定理全量审计

核对日期：2026-09-30。官方来源：[Fall 2025 CalcCheck 实例索引（截至 2025-11-07）](https://www.cas.mcmaster.ca/~kahl/CS2LC3/2025/2LC3-2025-instances_2025-11-07.html)。此索引列出端口 15001–15088 的 88 份 notebook；仓库原有 `data/sources.json` 另记录 H21 (15095) 与 H22 (15108)，两者已单独复核，但未出现在该日期的官方索引。

**结果：**90 个已知 notebook 均可打开；87 个的预载定理弹窗可读，且逐个点击并确认所有折叠项已展开，共 23,530 个弹窗声明出现次数（同一声明可在不同 notebook 或同一模块重复）。15021 与 15046 的菜单明确显示 “Not available.”；15068 没有可见代码单元，无法调用该菜单。仅在 2025-11-07 索引及两个已知晚期 Homework 范围内可称完成；无法据此排除未列出的后续实例。

已存的 26 份 Homework 弹窗共有 1,052 条按声明全文去重的内容。其余可读弹窗包含 284 条按空白归一后未见于这 26 份 Homework 的完整声明；此为文本差集，不是数学等价去重。逐条明细在 [`research/preloaded/audit-2025i-new.txt`](../research/preloaded/audit-2025i-new.txt)。所有可读弹窗的模块与声明位于 [`research/preloaded/audit-2025i.json`](../research/preloaded/audit-2025i.json) 的 `library` 中，`records[].moduleVariants` 精确保留每份 notebook 的模块顺序、URL 和声明数。61 份非 Homework 原文另存于 `research/preloaded/raw2025i-extra/port*.txt`；26 份 Homework 沿用 `research/preloaded/raw/hw*.txt`。

## 核对方法与计数口径

从官方索引逐一打开 notebook，选代码单元左侧编号（若只选中则再点一次），依次选 **Cell Actions → Display list of preloaded theorems**。记录展开前的 `<details>` 数、已展开数、模块数和完整模块标题；逐个实际点击所有尚未展开的 disclosure triangle，再重新读取展开后的同一组字段及声明总数。87 个可读弹窗的最终未展开项数均为零，展开后声明数与存档一致。每页的操作和结果在 [`research/preloaded/audit-2025i-verification.json`](../research/preloaded/audit-2025i-verification.json)，并嵌入主审计 JSON 的 `records[].expansionVerification`。不可读的三页以空标题列表及 `null` 计数明确标示。

仅读取弹窗中除 Symbol Entry Codes、Operator Precedences 以外的定理模块及其 `<li>` 声明。每个 `<li>` 计一次，推理规则的多行前提和 CalcCheck proviso 附在同一条。保留弹窗中的重复声明。存档文件是从弹窗 DOM 提取并统一空白与换行的文本，不是 notebook 正文，也不把正文的 `Theorem`、`Axiom` 练习题当成预载。15005 的首次手工捕获在两条推理规则中多出空行；展开核对确认声明文字、模块和数量均一致，现已修正这两条的空白并在核对记录中标明。

原始弹窗中确有带非标准编号的声明，例如 [H1 的 `(3.57=)`](../research/preloaded/raw/hw01.txt)、[H12 的 `(8.12.1₂)`](../research/preloaded/raw/hw12.txt)、[H13 的 `(15.44A)`](../research/preloaded/raw/hw13.txt) 和 [H22 的 `(dom.100)`](../research/preloaded/raw/hw22.txt)。它们是有编号的原文，不应因旧版导入器的编号格式限制而归入“无编号”。

## 按原 notebook 归属逐份清单

每行链接即该 notebook 的实例 URL。`弹窗数` 是该页的声明出现次数；模块名称及每模块数量详见 JSON 的对应端口记录。

### Introduction to Calculational Proofs

| 端口 / 来源 | 原 notebook | 弹窗 | 声明数 | 原文 |
|---|---|---|---:|---|
| [15001](http://130.113.68.214:15001/) | Homework 1: Getting Started with CalcCheck | H1 Theorem List | 178 | [hw01.txt](../research/preloaded/raw/hw01.txt) |
| [15002](http://130.113.68.214:15002/) | Example 1.1: Universal and Existential Quantification | Exmp1.1 Theorem List | 301 | [port15002.txt](../research/preloaded/raw2025i-extra/port15002.txt) |
| [15003](http://130.113.68.214:15003/) | Example 1.2: The Answer | Exa1.2 Theorem List | 34 | [port15003.txt](../research/preloaded/raw2025i-extra/port15003.txt) |
| [15004](http://130.113.68.214:15004/) | Homework 2: Expressions and Calculations | H2 Theorem List | 30 | [hw02.txt](../research/preloaded/raw/hw02.txt) |
| [15005](http://130.113.68.214:15005/) | Exercise 1.1: Simple Calculations in CalcCheck | Ex1.1 Theorem List | 30 | [port15005.txt](../research/preloaded/raw2025i-extra/port15005.txt) |
| [15006](http://130.113.68.214:15006/) | Exercise 1.2: An Equational Theory of Integers | Ex1.2 Theorem List | 4 | [port15006.txt](../research/preloaded/raw2025i-extra/port15006.txt) |
| [15007](http://130.113.68.214:15007/) | Exercise 1.3: Substitution | Ex1.3 Theorem List | 34 | [port15007.txt](../research/preloaded/raw2025i-extra/port15007.txt) |
| [15008](http://130.113.68.214:15008/) | Exercise 1.4: Re-Proving the Equational Theory of Integers with Rigid Matching | Ex1.4 Theorem List | 4 | [port15008.txt](../research/preloaded/raw2025i-extra/port15008.txt) |
| [15009](http://130.113.68.214:15009/) | Exercise 1.5: Re-Proving the Integer Theorems without Automatic Associativity and Symmetry | Ex1.5 Theorem List | 4 | [port15009.txt](../research/preloaded/raw2025i-extra/port15009.txt) |
| [15010](http://130.113.68.214:15010/) | Exercise 1.6: Re-Proving the Integer Theorems for Masochists | Ex1.6 Theorem List | 4 | [port15010.txt](../research/preloaded/raw2025i-extra/port15010.txt) |

### Propositional Calculus / Induction / Commands

| 端口 / 来源 | 原 notebook | 弹窗 | 声明数 | 原文 |
|---|---|---|---:|---|
| [15011](http://130.113.68.214:15011/) | Homework 3: Correctness of Assignment Commands | H3 Theorem List | 49 | [hw03.txt](../research/preloaded/raw/hw03.txt) |
| [15012](http://130.113.68.214:15012/) | Homework 4: First Steps in Propositional Calculus following LADM Chapter 3 | H4 Theorem List | 4 | [hw04.txt](../research/preloaded/raw/hw04.txt) |
| [15013](http://130.113.68.214:15013/) | Exercise 2.1: Propositional Calculus: From Equivalence to Inequivalence | Ex2.1 Theorem List | 4 | [port15013.txt](../research/preloaded/raw2025i-extra/port15013.txt) |
| [15014](http://130.113.68.214:15014/) | Exercise 2.2: Propositional Calculus: Disjunction | Ex2.2 Theorem List | 24 | [port15014.txt](../research/preloaded/raw2025i-extra/port15014.txt) |
| [15015](http://130.113.68.214:15015/) | Exercise 2.3: Propositional Calculus: Conjunction | Ex2.3 Theorem List | 33 | [port15015.txt](../research/preloaded/raw2025i-extra/port15015.txt) |
| [15016](http://130.113.68.214:15016/) | Exercise 2.4: Implication | Ex2.4 Theorem List | 63 | [port15016.txt](../research/preloaded/raw2025i-extra/port15016.txt) |
| [15017](http://130.113.68.214:15017/) | Extra Exercise 2.5: Knights and Knaves | Ex2.5 Theorem List | 128 | [port15017.txt](../research/preloaded/raw2025i-extra/port15017.txt) |
| [15018](http://130.113.68.214:15018/) | Exercise 2.6: Assignment Commands with Boolean Variables | Ex2.6 Theorem List | 94 | [port15018.txt](../research/preloaded/raw2025i-extra/port15018.txt) |
| [15019](http://130.113.68.214:15019/) | Homework 5: Leibniz as Axiom, Replacement | H5 Theorem List | 136 | [hw05.txt](../research/preloaded/raw/hw05.txt) |
| [15020](http://130.113.68.214:15020/) | Homework 6: Structured Proofs in the Propositional Calculus | H6 Theorem List | 106 | [hw06.txt](../research/preloaded/raw/hw06.txt) |
| [15021](http://130.113.68.214:15021/) | Assignment 1 Notebook 1: Propositional Calculus | 不可用 | — | — |
| [15022](http://130.113.68.214:15022/) | Assignment 1 Notebook 2: Assignment Commands with Boolean Variables | A1.2 Theorem List | 94 | [port15022.txt](../research/preloaded/raw2025i-extra/port15022.txt) |
| [15023](http://130.113.68.214:15023/) | Homework 7: Natural Numbers and Induction | H7 Theorem List | 4 | [hw07.txt](../research/preloaded/raw/hw07.txt) |
| [15024](http://130.113.68.214:15024/) | Exercise 3.1: Leibniz as Axiom, Replacement | Ex3.1 Theorem List | 142 | [port15024.txt](../research/preloaded/raw2025i-extra/port15024.txt) |
| [15025](http://130.113.68.214:15025/) | Exercise 3.2: Natural Numbers and Induction: Addition and Multiplication | Ex3.2 Theorem List | 12 | [port15025.txt](../research/preloaded/raw2025i-extra/port15025.txt) |
| [15026](http://130.113.68.214:15026/) | Exercise 3.3: Monus Subtraction | Ex3.3 Theorem List | 22 | [port15026.txt](../research/preloaded/raw2025i-extra/port15026.txt) |
| [15027](http://130.113.68.214:15027/) | Homework 8: Calculations with Monotonicity and Antitonicity | H8 Theorem List | 190 | [hw08.txt](../research/preloaded/raw/hw08.txt) |
| [15028](http://130.113.68.214:15028/) | Homework 9: Correctness of `while` Loops | H9 Theorem List | 204 | [hw09.txt](../research/preloaded/raw/hw09.txt) |
| [15029](http://130.113.68.214:15029/) | Exercise 4.1: Calculations with Monotonicity and Antitonicity | Ex4.1 Theorem List | 132 | [port15029.txt](../research/preloaded/raw2025i-extra/port15029.txt) |
| [15030](http://130.113.68.214:15030/) | Reference Notebook Inequality | Ref≠ Theorem List | 24 | [port15030.txt](../research/preloaded/raw2025i-extra/port15030.txt) |
| [15031](http://130.113.68.214:15031/) | Exercise 4.2: Positivity | Ex4.2 Theorem List | 192 | [port15031.txt](../research/preloaded/raw2025i-extra/port15031.txt) |
| [15032](http://130.113.68.214:15032/) | Exercise 4.3: Partial Solutions to Exercise 4.2: Positivity | Ex4.3 Theorem List | 192 | [port15032.txt](../research/preloaded/raw2025i-extra/port15032.txt) |
| [15033](http://130.113.68.214:15033/) | Exercise 4.4: Order on Integers | Ex4.4 Theorem List | 209 | [port15033.txt](../research/preloaded/raw2025i-extra/port15033.txt) |
| [15034](http://130.113.68.214:15034/) | Homework 10 Notebook 1: Quantification Expansion 1 | H10.1 Theorem List | 290 | [hw10-1.txt](../research/preloaded/raw/hw10-1.txt) |
| [15035](http://130.113.68.214:15035/) | Homework 10 Notebook 2: Quantification Expansion 2 | H10.2 Theorem List | 290 | [hw10-2.txt](../research/preloaded/raw/hw10-2.txt) |
| [15036](http://130.113.68.214:15036/) | Homework 10 Notebook 3: Quantification Expansion 3 | H10.3 Theorem List | 290 | [hw10-3.txt](../research/preloaded/raw/hw10-3.txt) |
| [15037](http://130.113.68.214:15037/) | Homework 11: Substituting into Quantifications | H11 Theorem List | 32 | [hw11.txt](../research/preloaded/raw/hw11.txt) |

### Quantification and Predicate Logic

| 端口 / 来源 | 原 notebook | 弹窗 | 声明数 | 原文 |
|---|---|---|---:|---|
| [15038](http://130.113.68.214:15038/) | Reference Notebook: General Quantification Following LADM Chapter 8 | RefGQ Theorem List | 237 | [port15038.txt](../research/preloaded/raw2025i-extra/port15038.txt) |
| [15039](http://130.113.68.214:15039/) | Reference Notebook: General Quantification Instantiated for ∀ | RefGQ∀ Theorem List | 164 | [port15039.txt](../research/preloaded/raw2025i-extra/port15039.txt) |
| [15040](http://130.113.68.214:15040/) | Reference Notebook: General Quantification Instantiated for ∃ | RefGQ∃ Theorem List | 237 | [port15040.txt](../research/preloaded/raw2025i-extra/port15040.txt) |
| [15041](http://130.113.68.214:15041/) | Reference Notebook: General Quantification Instantiated for ∑ on ℕ | RefGQΣℕ Theorem List | 280 | [port15041.txt](../research/preloaded/raw2025i-extra/port15041.txt) |
| [15042](http://130.113.68.214:15042/) | Reference Notebook: General Quantification Instantiated for ∏ on ℕ | RefGQ∏ℕ Theorem List | 280 | [port15042.txt](../research/preloaded/raw2025i-extra/port15042.txt) |
| [15043](http://130.113.68.214:15043/) | Reference Notebook: Universal Quantification (LADM 9.1) | Ref∀ Theorem List | 200 | [port15043.txt](../research/preloaded/raw2025i-extra/port15043.txt) |
| [15044](http://130.113.68.214:15044/) | Reference Notebook: Existential Quantification (LADM 9.2) | Ref∃ Theorem List | 276 | [port15044.txt](../research/preloaded/raw2025i-extra/port15044.txt) |
| [15045](http://130.113.68.214:15045/) | Homework 12: Introduction to Instantiation | H12 Theorem List | 338 | [hw12.txt](../research/preloaded/raw/hw12.txt) |
| [15046](http://130.113.68.214:15046/) | Exercise 5.1: Oddities | 不可用 | — | — |
| [15047](http://130.113.68.214:15047/) | Exercise 5.2: Equality and Predecessors in ℕ | Ex5.2 Theorem List | 98 | [port15047.txt](../research/preloaded/raw2025i-extra/port15047.txt) |
| [15048](http://130.113.68.214:15048/) | Exercise 5.3: Simple Proofs `By cases` on ℕ | Ex5.3 Theorem List | 209 | [port15048.txt](../research/preloaded/raw2025i-extra/port15048.txt) |
| [15049](http://130.113.68.214:15049/) | Exercise 5.4: Manipulating Ranges in ℤ | Ex5.4 Theorem List | 251 | [port15049.txt](../research/preloaded/raw2025i-extra/port15049.txt) |
| [15050](http://130.113.68.214:15050/) | Exercise 5.5: Sum Quantification in ℤ | Ex5.5 Theorem List | 337 | [port15050.txt](../research/preloaded/raw2025i-extra/port15050.txt) |
| [15051](http://130.113.68.214:15051/) | Homework 13: Practice with Universal and Existential Quantification | H13 Theorem List | 388 | [hw13.txt](../research/preloaded/raw/hw13.txt) |
| [15052](http://130.113.68.214:15052/) | Exercise 6.1: Introduction to Sequences | Ex6.1 Theorem List | 395 | [port15052.txt](../research/preloaded/raw2025i-extra/port15052.txt) |
| [15053](http://130.113.68.214:15053/) | Exercise 6.2: Sequences Continued | Ex6.2 Theorem List | 414 | [port15053.txt](../research/preloaded/raw2025i-extra/port15053.txt) |
| [15054](http://130.113.68.214:15054/) | Exercise 6.3: Practice with ∀ and ∃ | Ex6.3 Theorem List | 379 | [port15054.txt](../research/preloaded/raw2025i-extra/port15054.txt) |
| [15055](http://130.113.68.214:15055/) | Exercise 6.4: Indirect Equality, Maximum, and Minimum on ℤ | Ex6.4 Theorem List | 317 | [port15055.txt](../research/preloaded/raw2025i-extra/port15055.txt) |
| [15056](http://130.113.68.214:15056/) | Exercise 6.5: “Mixed Monotonicity” | Ex6.5 Theorem List | 402 | [port15056.txt](../research/preloaded/raw2025i-extra/port15056.txt) |
| [15057](http://130.113.68.214:15057/) | Exercise 6.6: Correctness of `while` Loops | Ex6.6 Theorem List | 326 | [port15057.txt](../research/preloaded/raw2025i-extra/port15057.txt) |

### Sets and Relations

| 端口 / 来源 | 原 notebook | 弹窗 | 声明数 | 原文 |
|---|---|---|---:|---|
| [15058](http://130.113.68.214:15058/) | Reference Notebook “Set Theory” | RefSet Theorem List | 303 | [port15058.txt](../research/preloaded/raw2025i-extra/port15058.txt) |
| [15059](http://130.113.68.214:15059/) | Homework 14: Set Theory Basics | H14 Theorem List | 303 | [hw14.txt](../research/preloaded/raw/hw14.txt) |
| [15060](http://130.113.68.214:15060/) | Exercise 7.1: Set Theory | Ex7.1 Theorem List | 397 | [port15060.txt](../research/preloaded/raw2025i-extra/port15060.txt) |
| [15061](http://130.113.68.214:15061/) | Exercise 7.2: Pairs and Cartesian Products | Ex7.2 Theorem List | 408 | [port15061.txt](../research/preloaded/raw2025i-extra/port15061.txt) |
| [15062](http://130.113.68.214:15062/) | Homework 15 Notebook 1: Cartesian Products of Sets | H15.1 Theorem List | 420 | [hw15-1.txt](../research/preloaded/raw/hw15-1.txt) |
| [15063](http://130.113.68.214:15063/) | Homework 15 Notebook 2: Relations via Set Theory: Definitions | H15.2 Theorem List | 420 | [hw15-2.txt](../research/preloaded/raw/hw15-2.txt) |
| [15064](http://130.113.68.214:15064/) | Exercise 7.3: Typed Universal Sets | Ex7.3 Theorem List | 449 | [port15064.txt](../research/preloaded/raw2025i-extra/port15064.txt) |
| [15065](http://130.113.68.214:15065/) | Homework 16: Some Properties of Relation Operations in Set Theory | H16 Theorem List | 449 | [hw16.txt](../research/preloaded/raw/hw16.txt) |
| [15066](http://130.113.68.214:15066/) | Exercise 7.4: Relations via Set Theory: More Properties | Ex7.4 Theorem List | 449 | [port15066.txt](../research/preloaded/raw2025i-extra/port15066.txt) |
| [15067](http://130.113.68.214:15067/) | Reference Notebook “Basic Relation Operation Properties” | RefRelOp Theorem List | 449 | [port15067.txt](../research/preloaded/raw2025i-extra/port15067.txt) |
| [15068](http://130.113.68.214:15068/) | Exercise 8.1: Properties of Relations Shown as Simple Graphs | 无代码单元 | — | — |
| [15069](http://130.113.68.214:15069/) | Homework 17: Heterogeneous Relation Properties | H17 Theorem List | 494 | [hw17.txt](../research/preloaded/raw/hw17.txt) |
| [15070](http://130.113.68.214:15070/) | Reference Notebook “Operators Combining Sets and Relations” | RefSetRelOps Theorem List | 494 | [port15070.txt](../research/preloaded/raw2025i-extra/port15070.txt) |
| [15071](http://130.113.68.214:15071/) | Exercise 8.2: Operators Combining Sets and Relations | Ex8.2 Theorem List | 572 | [port15071.txt](../research/preloaded/raw2025i-extra/port15071.txt) |
| [15072](http://130.113.68.214:15072/) | Homework 18: Using Explicit Induction Principles | H18 Theorem List | 303 | [hw18.txt](../research/preloaded/raw/hw18.txt) |
| [15073](http://130.113.68.214:15073/) | Homework 19: Binary Trees | H19 Theorem List | 584 | [hw19.txt](../research/preloaded/raw/hw19.txt) |
| [15074](http://130.113.68.214:15074/) | Homework 19 (variant): Binary Trees | H19v Theorem List | 584 | [hw19-2.txt](../research/preloaded/raw/hw19-2.txt) |
| [15075](http://130.113.68.214:15075/) | Exercise 9.1: Multiplication on ℕ Using Explicit Induction Principle | Ex9.1 Theorem List | 321 | [port15075.txt](../research/preloaded/raw2025i-extra/port15075.txt) |
| [15076](http://130.113.68.214:15076/) | Exercise 9.2: Binary Trees | Ex9.2 Theorem List | 567 | [port15076.txt](../research/preloaded/raw2025i-extra/port15076.txt) |
| [15077](http://130.113.68.214:15077/) | Exercise 9.2 (variant): Binary Trees | Ex9.2v Theorem List | 567 | [port15077.txt](../research/preloaded/raw2025i-extra/port15077.txt) |
| [15078](http://130.113.68.214:15078/) | Reference Notebook “Induction Principles for ℕ” | RefℕInd Theorem List | 451 | [port15078.txt](../research/preloaded/raw2025i-extra/port15078.txt) |
| [15079](http://130.113.68.214:15079/) | Reference Notebook “Well-foundedness of ℕ” | RefℕWF Theorem List | 420 | [port15079.txt](../research/preloaded/raw2025i-extra/port15079.txt) |
| [15080](http://130.113.68.214:15080/) | Reference Notebook “Subidentity Relations in Set Theory” | RefSetSubid Theorem List | 542 | [port15080.txt](../research/preloaded/raw2025i-extra/port15080.txt) |
| [15081](http://130.113.68.214:15081/) | Assignment 2 Notebook 1: Partial-Function Application | A2.1 Theorem List | 587 | [port15081.txt](../research/preloaded/raw2025i-extra/port15081.txt) |
| [15082](http://130.113.68.214:15082/) | Assignment 2 Notebook 2: Conditional Commands | A2.2 Theorem List | 272 | [port15082.txt](../research/preloaded/raw2025i-extra/port15082.txt) |
| [15083](http://130.113.68.214:15083/) | Assignment 2 Notebook 3: Proofs about Sum Quantification on ℕ | A2.3 Theorem List | 403 | [port15083.txt](../research/preloaded/raw2025i-extra/port15083.txt) |
| [15084](http://130.113.68.214:15084/) | Reference Notebook “Z Arrows” | RefZ Theorem List | 638 | [port15084.txt](../research/preloaded/raw2025i-extra/port15084.txt) |
| [15085](http://130.113.68.214:15085/) | Exercise 9.3: Sequences Misc. | Ex9.3 Theorem List | 455 | [port15085.txt](../research/preloaded/raw2025i-extra/port15085.txt) |
| [15086](http://130.113.68.214:15086/) | Exercise 9.4: Sum Quantification Misc. | Ex9.4 Theorem List | 477 | [port15086.txt](../research/preloaded/raw2025i-extra/port15086.txt) |
| [15087](http://130.113.68.214:15087/) | Homework 20: Bags | H20 Theorem List | 502 | [hw20.txt](../research/preloaded/raw/hw20.txt) |
| [15088](http://130.113.68.214:15088/) | Exercise 10.2: Bags | Ex10.2 Theorem List | 571 | [port15088.txt](../research/preloaded/raw2025i-extra/port15088.txt) |

### 已知但不在 11 月 7 日索引中的 Homework

| 端口 / 来源 | 原 notebook | 弹窗 | 声明数 | 原文 |
|---|---|---|---:|---|
| [15095](http://130.113.68.214:15095/) | Homework 21 | H21 Theorem List | 239 | [hw21.txt](../research/preloaded/raw/hw21.txt) |
| [15108](http://130.113.68.214:15108/) | Homework 22 | H22 Theorem List | 329 | [hw22.txt](../research/preloaded/raw/hw22.txt) |

## 按弹窗模块标记的 Week 归属

下表的“原 notebook”由模块名称中的 Homework/Exercise 编号对应到官方索引；它说明该模块的原始归属，不能把原 notebook 正文中的待证命题反推成预载。`首次弹窗` 是本次观察到该模块首次出现在其他 notebook 预载列表的端口。`新增` 相对原 26 份 Homework 的完整声明文本集合。

| Week / 弹窗模块 | 原 notebook 端口 | 首次弹窗 | 模块声明数 | 新增 |
|---|---:|---:|---:|---:|
| `Week3.Exercise-3-2_NatInd_SOL` | [15025](http://130.113.68.214:15025/) | [15026](http://130.113.68.214:15026/) | 10 | 0 |
| `Week3.Exercise-3-3_MonusSubtraction_SOL` | [15026](http://130.113.68.214:15026/) | [15037](http://130.113.68.214:15037/) | 10 | 0 |
| `Week3.Homework-7_Nat-sucInd_SOL` | [15023](http://130.113.68.214:15023/) | [15025](http://130.113.68.214:15025/) | 8/9 | 0 |
| `Week4.Exercise-4-4_IntegerOrder_SOL` | [15033](http://130.113.68.214:15033/) | [15049](http://130.113.68.214:15049/) | 28 | 0 |
| `Week5.Exercise-5-2_NatPred_SOL` | [15047](http://130.113.68.214:15047/) | [15048](http://130.113.68.214:15048/) | 15 | 4 |
| `Week5.Exercise-5-4_IntRanges_SOL` | [15049](http://130.113.68.214:15049/) | [15050](http://130.113.68.214:15050/) | 19 | 7 |
| `Week5.Exercise-5-5_SumQuantificationInt_SOL` | [15050](http://130.113.68.214:15050/) | [15057](http://130.113.68.214:15057/) | 17 | 17 |
| `Week6.Exercise-6-1_Sequences1_SOL` | [15052](http://130.113.68.214:15052/) | [15053](http://130.113.68.214:15053/) | 19 | 0 |
| `Week6.Exercise-6-2_Sequences2_SOL` | [15053](http://130.113.68.214:15053/) | [15073](http://130.113.68.214:15073/) | 25 | 0 |
| `Week6.Exercise-6-5_MixedMonotonicity_SOL` | [15056](http://130.113.68.214:15056/) | [15057](http://130.113.68.214:15057/) | 13 | 13 |
| `Week7.Exercise-7-2_CartesianProducts_SOL` | [15061](http://130.113.68.214:15061/) | [15062](http://130.113.68.214:15062/) | 12 | 0 |
| `Week7.Homework-14_Sets1_SOL` | [15059](http://130.113.68.214:15059/) | [15060](http://130.113.68.214:15060/) | 12 | 7 |
| `Week7.Homework-15-2_Relations_SOL` | [15063](http://130.113.68.214:15063/) | [15064](http://130.113.68.214:15064/) | 29 | 0 |
| `Week8.Homework-17_HetRelProps_SOL` | [15069](http://130.113.68.214:15069/) | [15080](http://130.113.68.214:15080/) | 15 | 11 |
| `Week9.Homework-18_InductionPrinciples_SOL` | [15072](http://130.113.68.214:15072/) | [15075](http://130.113.68.214:15075/) | 18 | 17 |
| `Week9.Homework-19_BinTree_SOL` | [15073](http://130.113.68.214:15073/) | [15076](http://130.113.68.214:15076/) | 13 | 13 |
| `Week9.Homework-19v_BinTree_SOL` | [15074](http://130.113.68.214:15074/) | [15077](http://130.113.68.214:15077/) | 13 | 13 |
| `Week9.Homework-20_Bags_SOL` | [15087](http://130.113.68.214:15087/) | [15088](http://130.113.68.214:15088/) | 23 | 23 |
| `Week11.Exercise-11-4_Allegory_SOL` | 未列于已知索引 | [15108](http://130.113.68.214:15108/) | 9 | 0 |

其中 Week11.Exercise-11-4_Allegory_SOL 只在 H22 (15108) 的可读弹窗中出现；原 Exercise 11.4 的 URL 不在 11 月 7 日索引或现有来源表，故没有推测端口。

## 相关 Reference 模块

| 弹窗模块 | 观察到的声明数 | 可追溯原 notebook | 首次预载弹窗 | 新增 |
|---|---:|---|---:|---:|
| `Reference.Ref_InductionPrinciples_Nat_SOL` | 7 | [15078](http://130.113.68.214:15078/) | [15079](http://130.113.68.214:15079/) | 6 |
| `Reference.Ref_RA_AllegoryDom_SOL` | 42 | 原 Reference 未列于已知索引 | [15108](http://130.113.68.214:15108/) | 0 |
| `Reference.Ref_RA_LSLCC_SOL` | 22 | 原 Reference 未列于已知索引 | [15108](http://130.113.68.214:15108/) | 0 |
| `Reference.Ref_RA_OCC_SOL` | 50 | 原 Reference 未列于已知索引 | [15108](http://130.113.68.214:15108/) | 0 |
| `Reference.Ref_RA_OrdCat_SOL` | 40 | 原 Reference 未列于已知索引 | [15108](http://130.113.68.214:15108/) | 0 |
| `Reference.Ref_SetSubidRel_SOL` | 51 | [15080](http://130.113.68.214:15080/) | [15084](http://130.113.68.214:15084/) | 47 |
| `Reference.ReferenceNotebook_SetRelOps_SOL` | 78 | [15070](http://130.113.68.214:15070/) | [15071](http://130.113.68.214:15071/) | 78 |
| `Reference.ReferenceNotebook_SetTheory_SOL` | 105 | [15058](http://130.113.68.214:15058/) | [15061](http://130.113.68.214:15061/) | 0 |
| `Reference.ReferenceNotebook_SetTheory_SOL_activatedACTrans` | 105 | [15058](http://130.113.68.214:15058/) | [15065](http://130.113.68.214:15065/) | 0 |
| `Reference/ReferenceNotebook_BasicRelProps_SOL` | 45 | [15067](http://130.113.68.214:15067/) | [15069](http://130.113.68.214:15069/) | 0 |

`Reference.ReferenceNotebook_SetTheory_SOL_activatedACTrans` 与不带后缀的版本各有 105 条弹窗声明；后缀说明激活设置，不能据此多算 105 条新公式。H22 的四个 `Reference.Ref_RA_*` 模块来自未列出的关系代数参考材料，只有 H22 弹窗可直接核实其预载内容。

## 不可列出声明的实例与范围缺口

- [15021](http://130.113.68.214:15021/) Assignment 1 Notebook 1：代码单元菜单存在，但选择定理列表后显示 **Not available.**；正文也说明为模拟考试不提供预载列表。
- [15046](http://130.113.68.214:15046/) Exercise 5.1 Oddities：代码单元菜单存在，但选择后显示 **Not available.**。
- [15068](http://130.113.68.214:15068/) Exercise 8.1：页面可打开，但无可见代码单元，故没有该单元菜单或可复制弹窗。
- 官方公开索引标题注明截至 2025-11-07，止于 15088。H21/H22 的端口来自仓库原有来源表并已打开核实；其间或之后如有其他未列 notebook，本审计没有可验证的官方链接，不能声称已穷尽。

复现计数：读取 JSON 中各 `records[].moduleVariants` 指向的 `library[].items`；每份求条数之和。按完整文本删除空白后跨端口去重得到本审计的 1,336 条；从非 Homework 集合扣除 26 份 Homework 集合得到上文 284 条。对 87 个可读页，原文文件中以 `Axiom`、`Theorem`、`Lemma`、`Corollary`、`Fact` 或两类 inference rule 开头的行数均与 JSON 声明数一致。
