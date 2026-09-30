# 2LC3 预载定理来源审计

核对日期：2026-09-30。唯一入库依据是 CalcCheck 代码单元菜单 **Cell Actions → Display list of preloaded theorems** 的弹窗声明。Notebook 正文中的证明任务不入库。

| 范围 | 可打开预载弹窗 | 声明出现次数 | 精确不同声明 |
|---|---:|---:|---:|
| 2025i | 87 | 23,530 | 1,336 |
| 2026 | 28 | 1,932 | 255 |
| 合计 | 115 | 25,462 | 跨年归并后 1,335 张网站卡片 |

每次出现都保留弹窗原文、notebook、模块、端口和行号。2025i 的逐份清单见 [2025i 审计](AUDIT_2025I.md)，2026 的逐份清单见 [2026 审计](AUDIT_2026.md)。[分类清单](WEEKLY_INVENTORY.md) 以 `Exercise N.x` 的 N 定 Week，再依据预载定理和正文证明重合核对 Homework；弹窗中的 `WeekN.*` 模块单独列出。所有声明仍在 [逐 notebook 清单](../data/weekly-inventory.json) 中。

2025i 的[课程实例索引](https://www.cas.mcmaster.ca/~kahl/CS2LC3/2025/2LC3-2025-instances_2025-11-07.html)及另两份 Homework 合计列出 90 份 notebook。87 份的预载列表可打开；15021、15046 的菜单报告 “Not available”，15068 没有可打开该菜单的代码单元。这三份未凭正文补录定理。2026 已发现 16001–16029 的 29 个可访问页面，28 份预载列表可打开；16019 的列表项报告 “Not available”。这些数字是核对当日的可访问范围，不是对整个学期未来资料的预测。

## 导入与题卡

`tools/import_preloaded.py` 读取 2025i 捕获，`tools/enrich_2026.py` 再归并 2026 捕获。原文保存在 `research/preloaded/raw/`、`raw2025i-extra/`、`raw2026/` 和 `raw2026-extra/`。完整声明及多行侧条件用来判别条目；同名但不同编号、不同结果均保留精确来源。题卡保留多名称、多个编号及每次出现位置。原文未命名的 41 张卡中，3 张与同编号、同公式且有原文名称的卡重复，已合并并保留全部来源；其余 38 张仍标为“原文未命名”，不补造名称。11 条推理规则保留来源，但不作为答题卡。旧题库中不能对应预载声明的 56 张卡已移出练习范围，见 `research/preloaded/excluded-existing.json`。

网站的 `↻` 表示同一条目在多少份 notebook 的预载列表中出现；同一弹窗内重复出现时，各行号仍独立保留。它不表示教师标注的重要度。只有旧资料明确给出 Important 依据且该条也出现在预载列表中，才保留 Important 标记。

## 再现与验证

```bash
python3 tools/import_preloaded.py
python3 tools/enrich_2026.py
python3 tools/build_weekly_inventory.py
python3 tools/preloaded_ledger.py --fail-on-audit
npm test
npm run build
```

逐次出现的账本会比较原始捕获与网站来源定位；当前核对为 25,462 次均覆盖，未覆盖、无来源定位和字段不一致均为 0。两年现场展开记录保存在各年的审计索引。2026 的额外[展开控件记录](../research/preloaded/audit-2026-popup-verification.json)逐份记录最终折叠数为 0。
