# 资料覆盖与来源审计

构建基准：2026-09-29。状态：**已交付可运行游戏；尚未证明完整覆盖 Project。**

## 当前题库

| 项目 | 数量与含义 |
|---|---|
| 可练习卡片 | 360 张，包含定理、公理、引理、推理规则与来源明确的练习声明 |
| 近期笔记 / 提供材料 | 282 张；是来源归类，不是 2026 课程已讲进度认证 |
| 额外核对的 2025 扩展内容 | 78 张，默认不混入“当前”范围 |
| 保存的不同原文写法 | 377 种；同条目可保留多个公式写法 |
| 明确原文 Important | 11 张 |
| 检测为重复引用 | 275 张，按名称/编号家族统计，不代表精确变体使用次数 |
| 待核对候选 | 128 条片段；可能不是完整定理，全部排除于判题队列 |
| 原始文件及归档内条目 | 168 个，包含 5 个 ZIP 与重复输出，不等于 168 份独立原稿 |
| 索引 / 对话补充来源 | 2 个：Week 2 索引中的语句与 9 月 29 日 Disjoint case analysis 声明 |
| PDF 物理页处理量 | 933 页，包含整套课件的不同拼版，不能当成独立内容页数 |

原始来源类型统计：conversation: 1, csv: 3, hs: 1, html: 14, json: 5, md: 8, pdf: 45, tex: 15, txt: 73, zip: 5。

## 读取了什么

读取可取得的 9 月 29 日课程导出 ZIP、Week 1 初版与修订包、实数笔记包、Week 3＋Midterm 包、多个 theorem catalogue / study notes TEX、Week 1 主笔记与附录、两版 Week 3 Midterm 笔记、H1/H2/Ex1.7 与定理总表 Markdown、两份 2025 Midterm HTML。归档内 PDF、TEX、HTML 和其他文本也逐项处理；复制品按哈希标记，不计作独立来源。

课程 ZIP 文件名包含 2026 下载日期，内容却是 **2025 全学期课件**。历史档并非所有 theorem 都已逐式转录：仅与已知完整式对应或人工核对过的声明进入题库，其余保持待核对。原始 PDF 并非每页都做视觉阅读；主要使用内嵌文本读取，涉及人工恢复符号的关键页面另外渲染并目视核对。没有使用 OCR，也没有从公共网页替换私人 Project 内容。

## 无法完整取得的材料

**Archive.zip**：Project 原始字节未获授权，索引无可读正文；无法保证其中独有条目已收录。

**Week1_Rebuilt_LaTeX_Package_v4.zip**：修订 ZIP 原始字节不可取得；早期 Week 1 两套 ZIP、笔记与附录已读取。

**Week2_Revised_Source_Bundle.zip / Week2_Source_Bundle.zip**：前者原始字节不可取得；后者只发现元数据。Week 2 Full Notebook 的索引 814 行已读取，但不是完整原始归档。

**Week1_Proof_Theorem_Notebook.tex**：原始字节不可取得；索引读取到 1050/1120 行，最后 70 行的后续读取未返回正文。

**A1_Full_Notebook.tex / A1_Lecture_Crosswalk.tex**：Full Notebook 原始字节不可取得且索引未返回正文；Crosswalk 只发现元数据。

**Week1_Lectures_Reconstructed / Week1_Slides_Proof_Companion**：发现修订文件元数据，未取得全文；可读的早期 Week 1 版本已纳入。

**Week2_Lecture_Notes / Week2_Slide_Companion**：Lecture Notes 索引未返回正文；Slide Companion 只发现元数据。

**Week3_Full_Notebook / Week3_Lecture_Companion**：这两个版本只发现元数据；可读的两个更新版 Week 3 + Midterm 笔记与 ZIP 已纳入。

因此不能把 360 张卡片称为“Project 全部 theorem 的已核验全集”。部分独有内容仍可能缺失；仅看文件名、空索引或者旧生成笔记，不能证明缺失文件里没有额外条目。

## 从来源到卡片

TEX 的 theorem/axiom 宏、文字代码块、定理索引表以及保存完整的 HTML 声明优先提取。跨行声明与列表续行合并时不能把证明体吞进去。占位表达式和独立的证明中间步骤不入库。保留教材编号的子项与原名；无名、无号必须标明。部分笔记是先前生成的二手整理资料，来源标记只证明该笔记含有此式，不等于重新获得原始课堂代码单元或通过在线 CalcCheck。

第一次原始提取得到 328 条；补入 81 条已目视核对课件页/索引声明，以及一条明确的对话声明；去除 50 条同编号/同别名的结构重复后得到 360 张卡。合并不删除原写法，`formulaVariants` 保留其差别。人工校核记录在 `tools/curations.json`，提取合并日志在 `data/extraction-audit.json`。每张卡的 `sources` 包含来源 ID、行/物理页定位与必要的声明片段。

## 原文重要性与频率

11 个 Important 标记对应 2025-09-15 Implication/Replacement 课件物理第 3 页明确列出的性质：3.71、3.72、3.73、3.74、3.15、3.75、3.65、3.77、3.66、3.78、3.79。这里没有把“经典”“常用”或人工推荐冒充原文 Important。原文感叹号强调是另一个字段；个人星标也不改变来源评级。

同一笔记的多个修订、同字节副本、PDF/TeX 输出不重复相加。同一来源家族取一次出现统计的最大值，再跨家族求和。同名定理家族（如多个 Absorption）可能共享名称计数；这些数字只能解释为引用线索。`proofMentions` 专门保留在证明提示括号里看到的名称引用。人工补入历史条目的次数是已核对声明位置的下界，不是全篇检索精确频率。任何未读文件都不参与次数统计。

## 不随网站发布的内容

没有完整原课件、课程 ZIP、生成笔记 PDF、私人提交 HTML、学生姓名、学生编号、成绩、字体二进制或浏览器学习备份。保留必要的公式声明、来源定位和哈希。发布前仍应检查你对课程材料的使用与公开发布权限；网站公开访问权限不等于原稿的再分发许可。

## 文件读取清单

状态 `read` 表示字节或文本已处理；`expanded` 为已展开归档；`duplicate-bytes` 不重复处理；`read-duplicate-compilation` 是已读整套课件拼版但不重复计数；`indexed-partial-read` 仅有索引；`provided-declaration` 是对话给出的定理式。

| 来源 | 格式 | 状态 | 页数 |
|---|---|---|---:|
| COMPSCI 2LC3Logical Reasoning for Computer Science - 9292026 - 239 PM.zip | zip | expanded | 0 |
| COMPSCI_2LC3_Fall-2025_Outline_2025-08-28.pdf | pdf | read | 7 |
| Office_Hours_and_TAs.html | html | read | 0 |
| COMPSCI_2LC3_Fall2025_Lecture_Slides_3up-letter.pdf | pdf | read-duplicate-compilation | 275 |
| COMPSCI_2LC3_Fall2025_Lecture_Slides_10up-A4.pdf | pdf | read-duplicate-compilation | 83 |
| 2LC3-2025-instances.html | html | read | 0 |
| Lab_Seat_Plan_BSB-241.html | html | read | 0 |
| Lab_Seat_Plan_BSB-244.html | html | read | 0 |
| Lab_Seat_Plan_BSB-249.html | html | read | 0 |
| Lab_Seat_Plan_ETB-234.html | html | read | 0 |
| Lab_Seat_Plan_HSC-1B7.html | html | read | 0 |
| Lab_Seat_Plan_JHE-233.html | html | read | 0 |
| Lab_Seat_Plan_JHE-234.html | html | read | 0 |
| Lab_Seat_Plan_KTH-B121.html | html | read | 0 |
| Lab_Seat_Plan_KTH-B123.html | html | read | 0 |
| CompSci2LC3_2025-09-02_Introduction__slides-3up-letter - Copy.pdf | pdf | read | 14 |
| CompSci2LC3_2025-09-04_Expressions_Substitution__slides-3up-letter.pdf | pdf | read | 14 |
| CompSci2LC3_2025-09-08_Leibniz_AssignmentCommands__slides-3up-letter.pdf | pdf | read | 14 |
| CompSci2LC3_2025-09-09_AssignmentCommands_BoolExpr_PropCalc1__slides-3up-letter.pdf | pdf | read | 12 |
| CompSci2LC3_2025-09-11_PropCalc2__slides-3up-letter.pdf | pdf | read | 7 |
| CompSci2LC3_2025-09-15_Implication_Replacement__slides-3up-letter.pdf | pdf | read | 9 |
| CompSci2LC3_2025-09-16_ProofStructures__slides-3up-letter.pdf | pdf | read | 9 |
| CompSci2LC3_2025-09-18_Cases_Using_NatInd__slides-3up-letter.pdf | pdf | read | 10 |
| CompSci2LC3_2025-09-22_Monotonicity_StraightlineCommands__slides-3up-letter.pdf | pdf | read | 8 |
| CompSci2LC3_2025-09-23_CommandRules_Quantification__slides-3up-letter.pdf | pdf | read | 4 |
| CompSci2LC3_2025-09-25_GenQuant__slides-3up-letter.pdf | pdf | read | 6 |
| CompSci2LC3_2025-09-29_GenQuant2__slides-3up-letter.pdf | pdf | read | 6 |
| CompSci2LC3_2025-10-02_GenQuant3_PredLogic1__slides-3up-letter.pdf | pdf | read | 8 |
| CompSci2LC3_2025-10-06_PredLogic2__slides-3up-letter.pdf | pdf | read | 10 |
| CompSci2LC3_2025-10-07_Sequences__slides-3up-letter.pdf | pdf | read | 3 |
| CompSci2LC3_2025-10-09_While_Universe__slides-3up-letter.pdf | pdf | read | 9 |
| CompSci2LC3_2025-10-20_Sets__slides-3up-letter.pdf | pdf | read | 6 |
| CompSci2LC3_2025-10-21_Relations1__slides-3up-letter.pdf | pdf | read | 7 |
| CompSci2LC3_2025-10-23_Relations2__slides-3up-letter.pdf | pdf | read | 8 |
| CompSci2LC3_2025-10-27_Relations3_M1__slides-3up-letter.pdf | pdf | read | 9 |
| CompSci2LC3_2025-10-28_Relations4__slides-3up-letter.pdf | pdf | read | 13 |
| CompSci2LC3_2025-10-30_RelProps__slides-3up-letter.pdf | pdf | read | 8 |
| CompSci2LC3_2025-11-03and04_Equiv_Induction_BinTree__slides-3up-letter.pdf | pdf | read | 12 |
| CompSci2LC3_2025-11-06_GraphProps_Bags__slides-3up-letter.pdf | pdf | read | 8 |
| CompSci2LC3_2025-11-10_Ghosts_Arrays__slides-3up-letter.pdf | pdf | read | 8 |
| CompSci2LC3_2025-11-11_TotCorr_FramaC__slides-3up-letter.pdf | pdf | read | 7 |
| CompSci2LC3_2025-11-13_FramaC_LoopVariants1_RelAlg1__slides-3up-letter.pdf | pdf | read | 11 |
| CompSci2LC3_2025-11-17_RelAlg2__slides-3up-letter.pdf | pdf | read | 10 |
| CompSci2LC3_2025-11-18_RelAlg3__slides-3up-letter.pdf | pdf | read | 5 |
| CompSci2LC3_2025-11-20_KleeneAlg_SyntaxAndSemantics1__slides-3up-letter.pdf | pdf | read | 5 |
| CompSci2LC3_2025-11-24_SyntaxAndSemantics2__slides-3up-letter.pdf | pdf | read | 5 |
| ExprV_ExprB_Cmd_Interpreter.hs | hs | read | 0 |
| CompSci2LC3_2025-11-25_SyntaxAndSemantics3_Functions1__slides-3up-letter.pdf | pdf | read | 6 |
| CompSci2LC3_2025-11-27_Functions2_FormalLogic__slides-3up-letter.pdf | pdf | read | 6 |
| CompSci2LC3_2025-12-01_PLTL__slides-3up-letter.pdf | pdf | read | 8 |
| CompSci2LC3_2025-12-02_Temporal2_Graphs_Lattices__slides-3up-letter.pdf | pdf | read | 9 |
| CompSci2LC3_2025-12-04_Conclusion__slides-3up-letter.pdf | pdf | read | 15 |
| Table of Contents.html | html | read | 0 |
| COMPSCI_2LC3_Full_Theorem_List.tex | tex | read | 0 |
| COMPSCI_2LC3_Full_Theorem_List_Updated.tex | tex | read | 0 |
| COMPSCI_2LC3_Full_Theorem_List_with_Notebook_Notes.tex | tex | read | 0 |
| COMPSCI_2LC3_Real_Numbers_Notes_Bundle.zip | zip | expanded | 0 |
| COMPSCI_2LC3_Real_Numbers_Countability_Notes.tex | tex | read | 0 |
| COMPSCI_2LC3_Real_Numbers_Countability_Notes.pdf | pdf | read | 9 |
| COMPSCI_2LC3_Note_Schema.tex | tex | read | 0 |
| COMPSCI_2LC3_Theorems_and_Study_Notes_Final.tex | tex | read | 0 |
| COMPSCI_2LC3_Theorems_and_Study_Notes_Final_v2.tex | tex | read | 0 |
| COMPSCI_2LC3_Week1_Companion_Appendix.tex | tex | read | 0 |
| COMPSCI_2LC3_Week1_LaTeX_Project.zip | zip | expanded | 0 |
| COMPSCI_2LC3_Week1/COMPSCI_2LC3_Week1_Notes.pdf | pdf | read | 99 |
| COMPSCI_2LC3_Week1/COMPSCI_2LC3_Week1_Notes.tex | tex | read | 0 |
| COMPSCI_2LC3_Week1/README.md | md | read | 0 |
| COMPSCI_2LC3_Week1/source_coverage.csv | csv | read | 0 |
| COMPSCI_2LC3_Week1/source_inventory.json | json | read | 0 |
| COMPSCI_2LC3_Week1/validation_summary.json | json | read | 0 |
| COMPSCI_2LC3_Week1_Main_Notes.tex | tex | read | 0 |
| COMPSCI_2LC3_Week1_Revised_LaTeX_Project.zip | zip | expanded | 0 |
| COMPSCI_2LC3_Week1_Revised/COMPSCI_2LC3_Week1_Companion_Appendix.pdf | pdf | read | 21 |
| COMPSCI_2LC3_Week1_Revised/COMPSCI_2LC3_Week1_Companion_Appendix.tex | tex | duplicate-bytes | 0 |
| COMPSCI_2LC3_Week1_Revised/COMPSCI_2LC3_Week1_Main_Notes.pdf | pdf | read | 71 |
| COMPSCI_2LC3_Week1_Revised/COMPSCI_2LC3_Week1_Main_Notes.tex | tex | duplicate-bytes | 0 |
| COMPSCI_2LC3_Week1_Revised/FORMAT_AUDIT.md | md | read | 0 |
| COMPSCI_2LC3_Week1_Revised/README.md | md | read | 0 |
| COMPSCI_2LC3_Week1_Revised/block_inventory.json | json | read | 0 |
| COMPSCI_2LC3_Week1_Revised/format_audit.json | json | read | 0 |
| COMPSCI_2LC3_Week1_Revised/integration_map.json | json | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_index.csv | csv | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/appendix/A001.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/appendix/A002.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/appendix/A003.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/appendix/A004.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/appendix/A005.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/appendix/A006.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/appendix/A007.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/appendix/A008.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/appendix/A009.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/appendix/A010.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/appendix/A011.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/appendix/A012.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/appendix/A013.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/appendix/A014.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/appendix/A015.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/appendix/A016.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/appendix/A017.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/appendix/A018.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/appendix/A019.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/appendix/A020.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/appendix/A021.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/appendix/A022.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/appendix/A023.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/appendix/A024.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M001.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M002.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M003.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M004.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M005.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M006.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M007.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M008.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M009.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M010.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M011.txt | txt | duplicate-bytes | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M012.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M013.txt | txt | duplicate-bytes | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M014.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M015.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M016.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M017.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M018.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M019.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M020.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M021.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M022.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M023.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M024.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M025.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M026.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M027.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M028.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M029.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M030.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M031.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M032.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M033.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M034.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M035.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M036.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M037.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M038.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M039.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M040.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M041.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M042.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M043.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M044.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M045.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M046.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M047.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M048.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/proof_text/main/M049.txt | txt | read | 0 |
| COMPSCI_2LC3_Week1_Revised/source_coverage.csv | csv | read | 0 |
| COMPSCI_2LC3_Week3_Full_Notebook_With_Midterm1_Notebook2.tex | tex | read | 0 |
| COMPSCI_2LC3_Week3_Full_Notebook_With_Midterm_Practice.pdf | pdf | read | 59 |
| COMPSCI_2LC3_Week3_Full_Notebook_With_Midterm_Practice_bundle.zip | zip | expanded | 0 |
| COMPSCI_2LC3_Week3_Full_Notebook_With_Midterm_Practice.pdf | pdf | duplicate-bytes | 0 |
| COMPSCI_2LC3_Week3_Full_Notebook_With_Midterm_Practice_source.tex | tex | read | 0 |
| Midterm1_Notebook2_Integers_2025.html | html | read | 0 |
| Midterm1_Notebook1_Oddities_2025_marked.html | html | read | 0 |
| 貼上的 Markdown (1)(20260910-202407).md | md | read | 0 |
| 貼上的 Markdown (1)(20260911-165540).md | md | read | 0 |
| 貼上的 Markdown (1)(20260912-012447).md | md | read | 0 |
| 貼上的 Markdown (1)(20260912-012608).md | md | duplicate-bytes | 0 |
| 貼上的 Markdown (2)(1).md | md | read | 0 |
| COMPSCI_2LC3_Week2_Full_Notebook.tex [indexed text only] | tex | indexed-partial-read | 0 |
| 2026-09-29 · 用户提供的 Disjoint case analysis 定理声明 | conversation | provided-declaration | 0 |
