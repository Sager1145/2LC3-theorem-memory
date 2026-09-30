import SwiftUI

struct StudyScope: Equatable {
    var year: Int? = 2026
    var notebookID: String?
    var week: Int?
    var includesPreviousWeeks = false

    mutating func selectNotebook(_ id: String?) {
        notebookID = id
        week = nil
        includesPreviousWeeks = false
    }

    func matches(_ theorem: Theorem, sources: [String: TheoremSource]) -> Bool {
        theorem.sources.contains { occurrence in
            guard let source = sources[occurrence.sourceId] else { return false }
            if let year, source.studyYear != year { return false }
            if let notebookID, source.id != notebookID { return false }
            if let week {
                return source.studyWeeks.contains {
                    $0 == week || (includesPreviousWeeks && $0 < week)
                }
            }
            return true
        }
    }
}

struct StudyScopePicker: View {
    @Binding var scope: StudyScope
    let sources: [TheoremSource]

    private var years: [Int] { Array(Set(sources.map(\.studyYear))).sorted(by: >) }
    private var notebooks: [TheoremSource] {
        sources.filter { scope.year == nil || $0.studyYear == scope.year }
            .sorted { $0.name.localizedStandardCompare($1.name) == .orderedAscending }
    }
    private var weeks: [Int] {
        Array(Set(notebooks.filter { scope.notebookID == nil || $0.id == scope.notebookID }
            .flatMap(\.studyWeeks))).sorted()
    }

    var body: some View {
        Section("学习范围") {
            Picker("年份", selection: $scope.year) {
                Text("全部年份").tag(Int?.none)
                ForEach(years, id: \.self) { year in
                    Text("\(year)").tag(Optional(year))
                }
            }
            .accessibilityIdentifier("scope.year")
            .onChange(of: scope.year) { _, _ in
                scope.notebookID = nil
                scope.week = nil
                scope.includesPreviousWeeks = false
            }

            Picker("Notebook", selection: $scope.notebookID) {
                Text("全部 Notebook").tag(String?.none)
                ForEach(notebooks) { source in
                    Text(source.name).tag(Optional(source.id))
                }
            }
            .accessibilityIdentifier("scope.notebook")
            .onChange(of: scope.notebookID) { _, id in scope.selectNotebook(id) }

            Picker("Week", selection: $scope.week) {
                Text("全部 Week").tag(Int?.none)
                ForEach(weeks, id: \.self) { week in
                    Text("Week \(week)").tag(Optional(week))
                }
            }
            .accessibilityIdentifier("scope.week")

            if scope.week != nil {
                Picker("周次范围", selection: $scope.includesPreviousWeeks) {
                    Text("仅当周").tag(false)
                    Text("含此前全部").tag(true)
                }
                .pickerStyle(.segmented)
                .accessibilityIdentifier("scope.weekRange")
                Text("每周收录对应 Notebook 的全部预载定理；跨周重复的定理在各周都可见。")
                    .font(.footnote)
                    .foregroundStyle(QuestStyle.secondary)
            }
        }
        .listRowBackground(QuestStyle.paper)
    }
}
