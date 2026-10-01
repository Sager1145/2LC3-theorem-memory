import Foundation

struct Theorem: Decodable, Identifiable, Hashable, Sendable {
    let id: String
    let name: String
    let formula: String
    let kind: String
    let topic: String
    let displayRef: String
    let important: Bool
    let current: Bool
    let documentCount: Int
    let preloaded2026: [Int]
    let preloadedSections: [String]
    let sources: [TheoremOccurrence]
    let aliases: [String]?
    let numbers: [String]?
    let formulaVariants: [String]?
    let variantLabel: String?
    let sideCondition: String?
    let repeated: Bool?
    let occurrences: Int?
    let importantEvidence: [ImportantEvidence]?

    let documentStudy: DocumentStudy?

    var isImportantForStudy: Bool { documentStudy?.important ?? false }
    var isRepeated: Bool { documentStudy?.repeated ?? false }

    var answerNames: [String] { uniqueAnswers([name] + (aliases ?? [])) }
    var answerFormulas: [String] { uniqueAnswers([formula] + (formulaVariants ?? [])) }
    var answerReferences: [String] { uniqueAnswers([displayRef] + (numbers ?? []).map { "(\($0))" }) }

    private func uniqueAnswers(_ values: [String]) -> [String] {
        var seen = Set<String>()
        return values.filter { !$0.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty && seen.insert($0).inserted }
    }

    var isPracticeCard: Bool { !kind.localizedCaseInsensitiveContains("inference rule") }
    var searchableText: String { "\(name) \(formula) \(displayRef) \(topic)" }

    static func == (lhs: Self, rhs: Self) -> Bool { lhs.id == rhs.id }
    func hash(into hasher: inout Hasher) { hasher.combine(id) }
}

enum TheoremFocus: String, CaseIterable, Identifiable {
    case all, important, repeated, priority
    var id: String { rawValue }
    var title: String {
        switch self {
        case .all: "全部"
        case .important: "Important"
        case .repeated: "多次出现"
        case .priority: "重点与高频"
        }
    }
    var explanation: String {
        switch self {
        case .all: "练习所选学习范围内的全部定理。"
        case .important: "课程文档中明确标注 Important 的定理；不等同于个人收藏。"
        case .repeated: "课程文档中累计至少 2 次编号或定理名称引用；重复版本按文档组去重。次数按整个题库统计，再与学习范围取交集。"
        case .priority: "课程文档 中标注 Important 或累计至少 2 次引用的定理，合并后不重复出题。"
        }
    }
    func matches(_ theorem: Theorem) -> Bool {
        switch self {
        case .all: true
        case .important: theorem.isImportantForStudy
        case .repeated: theorem.isRepeated
        case .priority: theorem.isImportantForStudy || theorem.isRepeated
        }
    }
}

struct DocumentStudy: Decodable, Sendable {
    let important: Bool
    let repeated: Bool
    let documentCount: Int
    let occurrences: Int
    let proofMentions: Int
    let importantEvidence: [ImportantEvidence]
    let evidence: [DocumentStudyEvidence]
}

struct DocumentStudyEvidence: Decodable, Sendable {
    let sourceId: String
    let sourceName: String?
    let excerpt: String?
    let label: String
    let locator: SourceLocator
    let occurrences: Int
    let proofMentions: Int
}

struct ImportantEvidence: Decodable, Sendable {
    let sourceId: String
    let sourceName: String?
    let excerpt: String?
    let label: String
    let references: [String]?
    let locator: SourceLocator?
}

struct TheoremOccurrence: Decodable, Identifiable, Sendable {
    let sourceId: String
    let locator: SourceLocator
    let excerpt: String
    var id: String { "\(sourceId):\(locator.line ?? -1):\(excerpt)" }
}

struct SourceLocator: Decodable, Sendable {
    let line: Int?
    let page: Int?
    let section: String?
}

struct TheoremSource: Decodable, Identifiable, Sendable {
    let id: String
    let name: String
    let year: Int?
    let weeks: [Int]?
    let url: URL?

    var studyYear: Int { year ?? (id.hasPrefix("calc-2026-") ? 2026 : 2025) }
    var studyWeeks: [Int] { weeks ?? [] }
}

struct DataManifest: Codable, Sendable {
    struct FileEntry: Codable, Sendable {
        let path: String
        let sha256: String
    }
    struct Files: Codable, Sendable {
        let theorems: FileEntry
        let sources: FileEntry
        let study: FileEntry?

        init(theorems: FileEntry, sources: FileEntry, study: FileEntry? = nil) {
            self.theorems = theorems
            self.sources = sources
            self.study = study
        }
    }
    let schemaVersion: Int
    let revision: String
    let theoremCount: Int
    let builtAt: String
    let files: Files
}

struct PracticeProgress: Codable, Sendable {
    var favoriteIDs: Set<String> = []
    var incorrectIDs: Set<String> = []
    var correctAnswers = 0
    var completedQuestions = 0
    var dailyAnswers: [String: Int] = [:]

    mutating func migrateMergedCardIDs() {
        let replacements = [
            "p-b1df9f7082d5": "t-d212aba8ab10",
            "p-2d263565f9b0": "t-e06bc0f878a5",
            "p-ac9634bfb530": "t-5edb0ccb8b07"
        ]
        favoriteIDs = Set(favoriteIDs.map { replacements[$0] ?? $0 })
        incorrectIDs = Set(incorrectIDs.map { replacements[$0] ?? $0 })
    }
}

enum LibraryError: LocalizedError {
    case httpStatus(Int)
    case invalidResponse
    case unsupportedVersion
    case invalidPath
    case checksumMismatch
    case countMismatch
    case duplicateID
    case noBundledData

    var errorDescription: String? {
        switch self {
        case .httpStatus(let status): "题库服务器返回 HTTP \(status)。"
        case .invalidResponse: "服务器没有返回有效数据。"
        case .unsupportedVersion: "题库版本暂不受此 App 支持。"
        case .invalidPath: "更新清单包含无效文件路径。"
        case .checksumMismatch: "下载内容未通过完整性校验。"
        case .countMismatch: "题库条目数量与版本清单不一致。"
        case .duplicateID: "题库或来源包含重复 ID。"
        case .noBundledData: "App 内置题库缺失。"
        }
    }
}
