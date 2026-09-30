# 2LC3 预载定理来源审计

核对日期：2026-09-30。题库白名单是课程 CalcCheck notebook 的 Cell Actions → **Display list of preloaded theorems** 弹窗内实际展开的声明。2025 基础库来自[课程实例索引](https://www.cas.mcmaster.ca/~kahl/CS2LC3/2025/2LC3-2025-instances_2025-11-07.html)中的 26 份 Homework；2026 当前范围来自下述 28 份公开可访问实例。notebook 正文中要求证明的定理、课件中出现的公式、其他课程的列表，都不能单独作为入库依据。

| 指标 | 结果 |
|---|---:|
| 已打开并复制的 Homework 弹窗 | 26 / 26 |
| 弹窗声明出现次数 | 7,156 |
| 按完整原文和侧条件去重后的来源条目 | 1,052 |
| 其中不参与答题的推理规则 | 9 |
| 与旧版 360 张卡精确对应、保留原学习 ID | 301 |
| 旧版未精确对应、已移出答题库 | 59 |
| PDF 提取待核对候选进入答题 | 0 |

每份弹窗的原始文本在 `research/preloaded/raw/hw*.txt`，逐份 URL 与声明数量在 `data/sources.json`。例如 `hw07.txt` 只列出 Equality 的 4 条声明；该 notebook 中后续要证明的自然数公式未因此进入题库。H19 与 H19v 两个变体均已复制，内容除了弹窗标题外相同。

## 导入规则

`tools/import_preloaded.py` 只扫描上述原始弹窗文本中以 Axiom、Theorem、Lemma、Corollary、Fact、Derived inference rule 或 Primitive inference rule 开头的声明。多行推理规则及 CalcCheck proviso 与其标题合并；模块名称、Homework 和弹窗行号作为来源定位。相同的完整声明与侧条件跨 notebook 去重，名称和编号按弹窗原文保留，缺失的名称或编号明确标记为未命名或未编号。不会从课件、学生笔记或证明任务推测编号。

9 条推理规则保留在来源数据供审计，但不会出现在练习题、名称选择干扰项、错题复练或可练范围中；已有未完成关卡若包含这些规则，不再恢复。

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

## 2026 学期预载范围（2026-09-30）

从用户指定的 16001 起顺序打开 CalcCheck 实例，16001–16029 可访问，16030 首次连接失败，扫描于此停止。除 A1.1 页面明确禁用预载列表外，已逐份复制 **28 份 Homework、Assignment 和 Exercise 预载弹窗**，原文保存在 `research/preloaded/raw2026/`；其中共有 1,932 次声明。与 2025 题卡比对后新增 4 张独有卡，2026 已核对范围有 248 条来源记录，其中 4 条为推理规则；实际可练习 244 张卡片。A1.1 的正文证明任务未补录。练习默认使用此 2026 范围，可按具体 notebook 选择。

[2026 课程主页](https://www.cas.mcmaster.ca/~kahl/CS2LC3/2026/)未公开列出 PPT 或 notebook 发布日期；[课程大纲](https://www.cas.mcmaster.ca/~kahl/CS2LC3/2026/COMPSCI_2LC3_Fall-2026_Outline.pdf)说明资料主要位于 Avenue。因此“可访问”只证明当日实例存在，不证明学生实际已获开放。2026 弹窗实际带 Week 标签的只有四个 Week 3 模块，覆盖 43 张卡；筛选器据此提供 2026 Week 3 范围。2025 归档另有 Week 3/4/6/7/11 模块。所有 Week 标签均为原模块名，不代表 2026 发布周次；名称如 `Week6.Exercise-6-2_Sequences2_SOL` 显示为“Week 6 · 序列进阶”。

再现数据：先运行 `python3 tools/import_preloaded.py`，再运行 `python3 tools/enrich_2026.py`。后者保存 `research/preloaded/2026-match-audit.json`，并在题卡上标记 `preloaded2026` 所属端口。
