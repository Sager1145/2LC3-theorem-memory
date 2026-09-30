# 2LC3 预载定理列表：公开来源核查

核查日期：2026-09-29。**入库条件：能在课程提供的预载 theorem list 中确认同一条声明。** 练习 notebook 中要求学生证明的定理，即使具有 LADM 编号，也不能仅凭该 notebook 加入题库。

## 已找到的公开资料

| 资料 | 用途 | 入库判断 |
|---|---|---|
| [2025 课程页](https://www.cas.mcmaster.ca/~kahl/CS2LC3/2025/)及[CalcCheck 实例索引](https://www.cas.mcmaster.ca/~kahl/CS2LC3/2025/2LC3-2025-instances_2025-11-07.html) | 定位当年参考与练习 notebook | 索引未列出预载前缀的全部定理 |
| [2024 课程页](https://www.cas.mcmaster.ca/~kahl/CS2LC3/2024/)及[完整课件](https://www.cas.mcmaster.ca/~kahl/CS2LC3/2024/CompSci2LC3-2024_AllSlides_3up-letter.pdf) | 交叉核对公式、名称和编号 | 课件中的证明任务不等于预载列表 |
| [2023 课程页](https://www.cas.mcmaster.ca/~kahl/CS2LC3/2023/)及[完整课件](https://www.cas.mcmaster.ca/~kahl/CS2LC3/2023/COMPSCI_2LC3_Fall2023_Lecture_Slides_3up-letter.pdf) | 核对旧版编号与写法 | 仅作历史对照 |
| [2DM3 2018 官方填好版定理表](https://www.cas.mcmaster.ca/~kahl/CS2DM3/2018/2DM3-2018-Final-ThmList-Filled.pdf)、[中期参考表](https://www.cas.mcmaster.ca/~kahl/CS2DM3/2018/2DM3-2018-Mid-November-ThmReference.html) | 较接近定理清单的公开资料 | 是前身课程，不能代替本课程预载列表 |
| [mac-egirls/oscs](https://github.com/mac-egirls/oscs)、[minniecutie/2lc3_exercises](https://github.com/minniecutie/2lc3_exercises)、[DFPOV/2LC3-Materials](https://github.com/DFPOV/2LC3-Materials)、[HardikGera/2LC3](https://github.com/HardikGera/2LC3)、[Yangk116/2LC3](https://github.com/Yangk116/2LC3) | 查找可能缺的编号和来源 | 学生笔记或作业，不证明某条属于预载列表 |
| [alhassy/CalcCheck 的 TheoremList.org](https://github.com/alhassy/CalcCheck/blob/master/TheoremList.org) | 了解 CalcCheck 的列表形式与旧版定理 | 2DM3 2020 资料，版本不同 |

2025 官方实例中还找到了[集合与关系运算](http://130.113.68.214:15070/)和[子恒等关系](http://130.113.68.214:15080/)参考 notebook。前者第 1、2 单元明确说明预载内容；随后的多条 `Theorem ... Proof:` 单元是待证明任务。这直接表明“出现在参考 notebook 中”不能充当“已经预载”的证据。此次不把这些待证明条目加入答题库。

## 已完成的逐份核对

使用浏览器打开课程实例索引列出的全部 26 份 Homework notebook，在每份的代码单元菜单里选择 **Display list of preloaded theorems**，展开所有定理模块后复制完整弹窗。原始文本在 `research/preloaded/raw/`，端口和逐份声明数在 `data/sources.json`。这是判断是否入库的直接证据；公开 repo 与笔记只用于交叉核对，不能让 notebook 的待证明题进入练习。

完整核对结果、导入规则、旧版卡片的处理见 `docs/SOURCE_AUDIT.md`。目前 26 份弹窗共 7,156 次声明，按完整原文和侧条件去重后有 1,052 张可练习卡；旧版 59 张未精确对应的卡已移出。
