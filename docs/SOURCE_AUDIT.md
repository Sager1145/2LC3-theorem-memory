# 2LC3 预载定理来源审计

核对日期：2026-09-29。题库白名单是 [2025 课程 CalcCheck 实例索引](https://www.cas.mcmaster.ca/~kahl/CS2LC3/2025/2LC3-2025-instances_2025-11-07.html)所列的 **26 份 Homework notebook** 中，Cell Actions → **Display list of preloaded theorems** 弹窗内实际展开的声明。notebook 正文中要求证明的定理、课件中出现的公式、其他课程或学期的列表，都不能单独作为入库依据。

| 指标 | 结果 |
|---|---:|
| 已打开并复制的 Homework 弹窗 | 26 / 26 |
| 弹窗声明出现次数 | 7,156 |
| 按完整原文和侧条件去重后的卡片 | 1,052 |
| 与旧版 360 张卡精确对应、保留原学习 ID | 301 |
| 旧版未精确对应、已移出答题库 | 59 |
| PDF 提取待核对候选进入答题 | 0 |

每份弹窗的原始文本在 `research/preloaded/raw/hw*.txt`，逐份 URL 与声明数量在 `data/sources.json`。例如 `hw07.txt` 只列出 Equality 的 4 条声明；该 notebook 中后续要证明的自然数公式未因此进入题库。H19 与 H19v 两个变体均已复制，内容除了弹窗标题外相同。

## 导入规则

`tools/import_preloaded.py` 只扫描上述原始弹窗文本中以 Axiom、Theorem、Lemma、Corollary、Fact、Derived inference rule 或 Primitive inference rule 开头的声明。多行推理规则及 CalcCheck proviso 与其标题合并；模块名称、Homework 和弹窗行号作为来源定位。相同的完整声明与侧条件跨 notebook 去重，名称和编号按弹窗原文保留，缺失的名称或编号明确标记为未命名或未编号。不会从课件、学生笔记或证明任务推测编号。

旧题库和来源另存于 `research/preloaded/legacy-*`，59 张未精确对应的旧卡列于 `research/preloaded/excluded-existing.json`。精确匹配是保守处理：其中可能有变量改名后与预载声明等价的公式，但未凭推测保留。旧版 128 条 PDF 提取候选也已移出当前网站审计数据。

`↻` 现在表示同一声明在多少份 Homework 的预载弹窗中出现；H19 和 H19v 分别计数。它不是课堂引用频率，也不是教师标注的重要度。旧资料中有明确 Important 证据、且精确匹配预载声明的卡保留该证据；其他卡不新增 Important 标记。

这份清单对应 **2025 课程提供的 Homework 实例**，不表示 2026 教师今年已经讲过或将在本学期预载全部这些内容。每份 notebook 的预载范围不同；网站提供 Homework 来源筛选。

## 外部资料的用途

[2025 课程页](https://www.cas.mcmaster.ca/~kahl/CS2LC3/2025/)、[2024 完整课件](https://www.cas.mcmaster.ca/~kahl/CS2LC3/2024/CompSci2LC3-2024_AllSlides_3up-letter.pdf)、[2023 课件](https://www.cas.mcmaster.ca/~kahl/CS2LC3/2023/COMPSCI_2LC3_Fall2023_Lecture_Slides_3up-letter.pdf)、[2DM3 的旧定理表](https://www.cas.mcmaster.ca/~kahl/CS2DM3/2018/2DM3-2018-Final-ThmList-Filled.pdf)，以及公开的 [mac-egirls/oscs](https://github.com/mac-egirls/oscs)、[minniecutie/2lc3_exercises](https://github.com/minniecutie/2lc3_exercises)、[DFPOV/2LC3-Materials](https://github.com/DFPOV/2LC3-Materials)、[HardikGera/2LC3](https://github.com/HardikGera/2LC3)、[Yangk116/2LC3](https://github.com/Yangk116/2LC3) 只作编号、写法与课程背景的交叉参考；它们都不能覆盖或扩张本版预载白名单。检索记录见 `docs/PRELOADED_THEOREM_RESEARCH.md`。

## 再现与验证

```bash
python3 tools/import_preloaded.py
npm test
npm run build
```

导入脚本输出 26 / 7,156 / 1,052 的核对统计；自动测试检查来源定位、ID 唯一、公式自匹配、填空改名和纯命题逻辑真值。原始弹窗文本不包含完整课件、学生姓名、成绩或私人提交，静态构建只发布题库和必要的来源定位。
