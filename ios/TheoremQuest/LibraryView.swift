import SwiftUI

private enum LibraryFilter: String, CaseIterable, Identifiable {
    case all = "全部", important = "Important", repeated = "多次出现", priority = "重点与高频"
    case favorites = "收藏", mistakes = "错题"
    var focus: TheoremFocus? {
        switch self {
        case .all: .all
        case .important: .important
        case .repeated: .repeated
        case .priority: .priority
        case .favorites, .mistakes: nil
        }
    }
    var id: String { rawValue }
}

struct LibraryView: View {
    let library: LibraryStore
    @State private var searchText = ""
    @State private var filter: LibraryFilter = .all
    @State private var scope = StudyScope(year: nil)

    private var filtered: [Theorem] {
        let sources = Dictionary(uniqueKeysWithValues: library.sources.map { ($0.id, $0) })
        return library.theorems.filter { theorem in
            let inScope: Bool
            switch filter {
            case .all, .important, .repeated, .priority:
                inScope = filter.focus?.matches(theorem) ?? true
            case .favorites: inScope = library.progress.favoriteIDs.contains(theorem.id)
            case .mistakes: inScope = library.progress.incorrectIDs.contains(theorem.id)
            }
            return inScope && scope.matches(theorem, sources: sources)
                && (searchText.isEmpty || theorem.searchableText.localizedStandardContains(searchText))
        }
    }

    var body: some View {
        Group {
            if library.isLoading {
                ProgressView("正在加载题库…")
            } else if library.theorems.isEmpty {
                ContentUnavailableView("题库不可用", systemImage: "books.vertical", description: Text(library.statusMessage))
            } else {
                List {
                    Section {
                        HStack(alignment: .top, spacing: 16) {
                            VStack(alignment: .leading, spacing: 8) {
                                Text("COMPSCI 2LC3")
                                    .font(QuestFont.text(.caption, bold: true))
                                    .tracking(1.2)
                                    .foregroundStyle(QuestStyle.darkGreen)
                                Text("随时复习，稳稳记住")
                                    .font(QuestFont.text(.title3, bold: true))
                                Text("搜索课程定理、查看公式与来源，收藏后随时回顾。")
                                    .font(QuestFont.text(.subheadline))
                                    .foregroundStyle(QuestStyle.secondary)
                            }
                            Spacer(minLength: 0)
                            QuestMark(size: 50)
                        }
                        .padding(18)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .questCard(tint: QuestStyle.green.opacity(0.4), fill: QuestStyle.hero)
                        .listRowInsets(EdgeInsets(top: 10, leading: 16, bottom: 8, trailing: 16))
                        .listRowBackground(Color.clear)
                        .listRowSeparator(.hidden)

                        Picker("范围", selection: $filter) {
                            ForEach(LibraryFilter.allCases) { item in Text(item.rawValue).tag(item) }
                        }
                        .pickerStyle(.menu)
                        .accessibilityIdentifier("library.filter")
                        .listRowInsets(EdgeInsets(top: 8, leading: 16, bottom: 8, trailing: 16))
                        .listRowBackground(Color.clear)
                        .listRowSeparator(.hidden)
                    }
                    if let focus = filter.focus, focus != .all {
                        Section {
                            Text(focus.explanation)
                                .font(QuestFont.text(.footnote))
                                .foregroundStyle(QuestStyle.secondary)
                            NavigationLink {
                                PracticeView(library: library, initialFocus: focus, initialScope: scope)
                            } label: {
                                Label("练习此学习范围 · \(focus.title)", systemImage: "play.circle.fill")
                            }
                            .accessibilityIdentifier("library.focusPractice")
                        }
                    }
                    StudyScopePicker(scope: $scope, sources: library.sources)
                    Section("\(filtered.count) 条定理") {
                        ForEach(filtered) { theorem in
                            NavigationLink(value: theorem.id) {
                                TheoremRow(theorem: theorem, favorite: library.progress.favoriteIDs.contains(theorem.id))
                            }
                            .padding(14)
                            .questCard()
                            .listRowInsets(EdgeInsets(top: 5, leading: 16, bottom: 5, trailing: 16))
                            .listRowBackground(Color.clear)
                            .listRowSeparator(.hidden)
                        }
                    }
                }
                .listStyle(.plain)
                .scrollContentBackground(.hidden)
                .background(QuestStyle.page)
                .navigationDestination(for: String.self) { id in
                    if let theorem = library.theorems.first(where: { $0.id == id }) {
                        TheoremDetailView(theorem: theorem, library: library)
                    }
                }
                .searchable(text: $searchText, placement: .navigationBarDrawer(displayMode: .always),
                            prompt: "名称、编号、公式或模块")
                .overlay {
                    if filtered.isEmpty {
                        ContentUnavailableView(searchText.isEmpty ? "当前范围没有定理" : "没有搜索结果",
                                               systemImage: "books.vertical",
                                               description: Text("请调整年份、Notebook、Week 或搜索词。"))
                    }
                }
            }
        }
        .navigationTitle("定理库")
    }
}

private struct TheoremRow: View {
    let theorem: Theorem
    let favorite: Bool

    var body: some View {
        VStack(alignment: .leading, spacing: 9) {
            HStack(alignment: .firstTextBaseline) {
                Text(theorem.name.isEmpty ? "原文未命名" : theorem.name)
                    .font(QuestFont.text(.headline, bold: true))
                    .foregroundStyle(QuestStyle.ink)
                Spacer(minLength: 8)
                if favorite { Image(systemName: "star.fill").foregroundStyle(QuestStyle.gold).accessibilityLabel("已收藏") }
            }
            Text(theorem.displayRef)
                .font(QuestFont.text(.caption, bold: true))
                .foregroundStyle(QuestStyle.blue)
            Text(theorem.formula)
                .font(QuestFont.theorem())
                .foregroundStyle(QuestStyle.secondary)
                .lineLimit(2)
            HStack(spacing: 8) {
                badge(theorem.topic, color: QuestStyle.blue)
                if theorem.isImportantForStudy { badge("Important", color: QuestStyle.gold) }
                if theorem.isRepeated { badge("多次出现", color: QuestStyle.darkGreen) }
                if !theorem.preloaded2026.isEmpty { badge("2026", color: QuestStyle.darkGreen) }
            }
            .lineLimit(1)
        }
    }

    private func badge(_ title: String, color: Color) -> some View {
        Text(title)
            .font(QuestFont.text(.caption2, bold: true))
            .foregroundStyle(color)
            .padding(.horizontal, 7)
            .padding(.vertical, 4)
            .background(color.opacity(0.11), in: RoundedRectangle(cornerRadius: 6))
    }
}

private struct TheoremDetailView: View {
    let theorem: Theorem
    let library: LibraryStore
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    private var isFavorite: Bool {
        library.progress.favoriteIDs.contains(theorem.id)
    }

    var body: some View {
        List {
            Section {
                VStack(alignment: .leading, spacing: 16) {
                    Text(theorem.displayRef).font(QuestFont.text(.subheadline, bold: true)).foregroundStyle(QuestStyle.blue)
                    Text(theorem.formula)
                        .font(QuestFont.theorem(.title3))
                        .textSelection(.enabled)
                    Text(theorem.kind + " · " + theorem.topic)
                        .font(QuestFont.text(.subheadline)).foregroundStyle(QuestStyle.secondary)
                }
                .padding(16)
            }
            .listRowBackground(QuestStyle.hero)
            if theorem.isImportantForStudy || theorem.isRepeated {
                Section("重点与出现频次") {
                    if theorem.isImportantForStudy {
                        Label("Important · 课程重点", systemImage: "exclamationmark.circle")
                        if let evidence = theorem.documentStudy?.importantEvidence ?? theorem.importantEvidence, !evidence.isEmpty {
                            ForEach(Array(evidence.enumerated()), id: \.offset) { _, item in
                                VStack(alignment: .leading, spacing: 5) {
                                    Text(item.sourceName ?? library.source(for: item.sourceId)?.name ?? item.sourceId)
                                        .font(QuestFont.text(.caption, bold: true))
                                    Text(item.label).textSelection(.enabled)
                                    if let excerpt = item.excerpt { Text(excerpt).textSelection(.enabled) }
                                    if let page = item.locator?.page {
                                        Text("第 \(page) 页").font(QuestFont.text(.caption))
                                    }
                                    if let references = item.references, !references.isEmpty {
                                        Text("关联编号：" + references.joined(separator: "、"))
                                            .font(QuestFont.text(.caption))
                                    }
                                }
                            }
                        } else {
                            Text("题库标记为 Important；具体上下文请查看下方原文来源。")
                        }
                    }
                    if let study = theorem.documentStudy {
                        Text("课程文档：\(study.documentCount) 个资料组 · \(study.occurrences) 次引用")
                        Text("证明中引用：\(study.proofMentions) 次")
                            .font(QuestFont.text(.caption))
                        ForEach(Array(study.evidence.enumerated()), id: \.offset) { _, item in
                            VStack(alignment: .leading, spacing: 5) {
                                Text(item.sourceName ?? library.source(for: item.sourceId)?.name ?? item.sourceId)
                                    .font(QuestFont.text(.caption, bold: true))
                                Text(item.label).textSelection(.enabled)
                                if let excerpt = item.excerpt { Text(excerpt).textSelection(.enabled) }
                                if let page = item.locator.page {
                                    Text("第 \(page) 页 · \(item.occurrences) 次引用 · 证明中 \(item.proofMentions) 次")
                                        .font(QuestFont.text(.caption))
                                }
                            }
                        }
                    } else {
                        Text("旧版题库：收录于 \(theorem.documentCount) 份不同 Notebook；更新后可查看课程文档 频次。")
                    }
                    if theorem.isRepeated {
                        Text(TheoremFocus.repeated.explanation)
                            .font(QuestFont.text(.footnote))
                            .foregroundStyle(QuestStyle.secondary)
                    }
                }
            }
            Section("学习") {
                Button {
                    withAnimation(reduceMotion ? nil : .spring(response: 0.3, dampingFraction: 0.7)) {
                        library.toggleFavorite(theorem.id)
                    }
                } label: {
                    Label {
                        Text(isFavorite ? "取消收藏" : "加入收藏")
                    } icon: {
                        Image(systemName: isFavorite ? "star.fill" : "star")
                            .foregroundStyle(isFavorite ? QuestStyle.gold : QuestStyle.green)
                            .contentTransition(reduceMotion ? .identity : .symbolEffect(.replace))
                            .symbolEffect(.bounce, value: reduceMotion ? false : isFavorite)
                    }
                }
            }
            .listRowBackground(QuestStyle.paper)
            Section("来源 · \(theorem.documentCount) 份 notebook") {
                ForEach(theorem.sources.prefix(30)) { occurrence in
                    if let source = library.source(for: occurrence.sourceId) {
                        VStack(alignment: .leading, spacing: 5) {
                            if let url = source.url, ["http", "https"].contains(url.scheme ?? "") {
                                Link(source.name, destination: url)
                            } else {
                                Text(source.name).font(QuestFont.text(.headline))
                            }
                            Text("\(source.studyYear) · \(source.studyWeeks.isEmpty ? "Week 未分类" : source.studyWeeks.map { "Week \($0)" }.joined(separator: "、"))")
                                .font(QuestFont.text(.caption)).foregroundStyle(QuestStyle.secondary)
                            Text("\(occurrence.locator.section ?? "原文") · 第 \(occurrence.locator.line ?? 0) 行")
                                .font(QuestFont.text(.caption)).foregroundStyle(QuestStyle.secondary)
                            Text(occurrence.excerpt)
                                .font(QuestFont.text(.caption)).textSelection(.enabled)
                        }
                        .padding(.vertical, 3)
                    }
                }
                if theorem.sources.count > 30 {
                    Text("另有 \(theorem.sources.count - 30) 处来源记录")
                        .foregroundStyle(QuestStyle.secondary)
                }
            }
            .listRowBackground(QuestStyle.paper)
        }
        .scrollContentBackground(.hidden)
        .background(QuestStyle.page)
        .navigationTitle(theorem.name.isEmpty ? "原文未命名" : theorem.name)
        .navigationBarTitleDisplayMode(.inline)
    }
}
