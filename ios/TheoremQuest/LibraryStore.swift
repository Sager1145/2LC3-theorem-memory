import CryptoKit
import Foundation
import Observation

@MainActor @Observable
final class LibraryStore {
    static let siteURL = URL(string: "https://sager1145.github.io/2LC3-theorem-memory/")!
    private static let lastCheckKey = "library.lastSuccessfulCheck"

    private let endpoint: URL
    private let storageDirectory: URL?
    private let seedData: (theorems: Data, sources: Data)?
    private let defaults: UserDefaults
    private let fetchData: (@Sendable (URLRequest) async throws -> (Data, URLResponse))?

    init(
        endpoint: URL = LibraryStore.siteURL,
        storageDirectory: URL? = nil,
        seedData: (theorems: Data, sources: Data)? = nil,
        defaults: UserDefaults = .standard,
        fetchData: (@Sendable (URLRequest) async throws -> (Data, URLResponse))? = nil
    ) {
        self.endpoint = endpoint
        self.storageDirectory = storageDirectory
        self.seedData = seedData
        self.defaults = defaults
        self.fetchData = fetchData
    }

    private(set) var theorems: [Theorem] = []
    private(set) var sources: [TheoremSource] = []
    // Preserve every web-only field when handing a verified snapshot to the game.
    private(set) var webSnapshot: (theorems: Data, sources: Data)?
    private(set) var manifest: DataManifest?
    private(set) var progress = PracticeProgress()
    private(set) var isLoading = true
    private(set) var isChecking = false
    private(set) var lastCheckedAt: Date?
    private(set) var statusMessage = ""
    private var bundledRevision: String?

    private var appDirectory: URL {
        storageDirectory ?? FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0]
            .appendingPathComponent("TheoremQuest", isDirectory: true)
    }

    func load() async {
        defer { isLoading = false }
        do {
            let base = appDirectory
            let manifestURL = base.appendingPathComponent("version.json")
            var restored = false
            if let data = try? Data(contentsOf: manifestURL),
               let saved = try? JSONDecoder().decode(DataManifest.self, from: data),
               saved.revision.range(of: "^[0-9a-f]{64}$", options: .regularExpression) != nil {
                let snapshot = base.appendingPathComponent("snapshots", isDirectory: true)
                    .appendingPathComponent(saved.revision, isDirectory: true)
                if let theoremData = try? await Self.read(snapshot.appendingPathComponent("theorems.json")),
                   let sourceData = try? await Self.read(snapshot.appendingPathComponent("sources.json")),
                   Self.hash(theoremData) == saved.files.theorems.sha256.lowercased(),
                   Self.hash(sourceData) == saved.files.sources.sha256.lowercased(),
                   (try? await install(theoremData: theoremData, sourceData: sourceData)) != nil {
                    manifest = saved
                    restored = true
                }
            }
            if !restored {
                if let seedData {
                    try await install(theoremData: seedData.theorems, sourceData: seedData.sources)
                    bundledRevision = Self.revision(theorems: seedData.theorems, sources: seedData.sources)
                } else {
                    guard let theoremURL = Bundle.main.url(forResource: "theorems", withExtension: "json"),
                          let sourceURL = Bundle.main.url(forResource: "sources", withExtension: "json") else {
                        throw LibraryError.noBundledData
                    }
                    let theoremData = try await Self.read(theoremURL)
                    let sourceData = try await Self.read(sourceURL)
                    try await install(theoremData: theoremData, sourceData: sourceData)
                    bundledRevision = Self.revision(theorems: theoremData, sources: sourceData)
                }
            }
            let progressURL = base.appendingPathComponent("progress.json")
            if let data = try? Data(contentsOf: progressURL) {
                if let saved = try? JSONDecoder().decode(PracticeProgress.self, from: data) {
                    progress = saved
                    progress.migrateMergedCardIDs()
                } else {
                    let backup = base.appendingPathComponent("progress-unreadable.json")
                    try? data.write(to: backup, options: .atomic)
                    statusMessage = "学习记录无法读取；原文件已保留以便恢复。"
                }
            }
            lastCheckedAt = defaults.object(forKey: Self.lastCheckKey) as? Date
        } catch {
            statusMessage = error.localizedDescription
        }
    }

    func checkForUpdates(force: Bool = false) async {
        guard !isChecking else { return }
        if !force, let lastCheckedAt, Date().timeIntervalSince(lastCheckedAt) < 24 * 60 * 60 { return }
        isChecking = true
        defer { isChecking = false }
        do {
            var manifestData: Data
            let next: DataManifest
            var legacyPayload: (theorems: Data, sources: Data)?
            do {
                let downloadedManifest = try await download("data/version.json")
                next = try JSONDecoder().decode(DataManifest.self, from: downloadedManifest)
                manifestData = downloadedManifest
            } catch LibraryError.httpStatus(404) {
                // Older Pages deployments expose the public JSON without a
                // release manifest. Never parse or execute the website's JS.
                let theoremData = try await download("data/theorems.json")
                let sourceData = try await download("data/sources.json")
                let (decoded, _) = try await Self.decode(theoremData: theoremData, sourceData: sourceData)
                guard !decoded.isEmpty else { throw LibraryError.countMismatch }
                next = DataManifest(schemaVersion: 1,
                                    revision: Self.revision(theorems: theoremData, sources: sourceData),
                                    theoremCount: decoded.count,
                                    builtAt: "旧版网站，获取于 \(Date.now.formatted(.iso8601))",
                                    files: .init(theorems: .init(path: "data/theorems.json", sha256: Self.hash(theoremData)),
                                                 sources: .init(path: "data/sources.json", sha256: Self.hash(sourceData))))
                manifestData = try JSONEncoder().encode(next)
                legacyPayload = (theoremData, sourceData)
            }
            guard next.schemaVersion == 1 else { throw LibraryError.unsupportedVersion }
            guard next.revision.range(of: "^[0-9a-f]{64}$", options: .regularExpression) != nil,
                  next.files.theorems.path == "data/theorems.json",
                  next.files.sources.path == "data/sources.json" else { throw LibraryError.invalidPath }
            let theoremHash = next.files.theorems.sha256.lowercased()
            let sourceHash = next.files.sources.sha256.lowercased()
            guard theoremHash.range(of: "^[0-9a-f]{64}$", options: .regularExpression) != nil,
                  sourceHash.range(of: "^[0-9a-f]{64}$", options: .regularExpression) != nil,
                  Self.hash(Data("\(theoremHash):\(sourceHash)".utf8)) == next.revision else {
                throw LibraryError.checksumMismatch
            }
            if (manifest?.revision ?? bundledRevision) != next.revision {
                let theoremData: Data
                let sourceData: Data
                if let legacyPayload {
                    theoremData = legacyPayload.theorems
                    sourceData = legacyPayload.sources
                } else {
                    theoremData = try await download(next.files.theorems.path, revision: next.revision)
                    sourceData = try await download(next.files.sources.path, revision: next.revision)
                }
                guard Self.hash(theoremData) == next.files.theorems.sha256.lowercased(),
                      Self.hash(sourceData) == next.files.sources.sha256.lowercased() else {
                    throw LibraryError.checksumMismatch
                }
                let (decoded, decodedSources) = try await Self.decode(theoremData: theoremData, sourceData: sourceData)
                guard !decoded.isEmpty, decoded.count == next.theoremCount else { throw LibraryError.countMismatch }
                let base = appDirectory
                try await Self.saveSnapshot(theoremData: theoremData, sourceData: sourceData,
                                            manifestData: manifestData, revision: next.revision, to: base)
                theorems = decoded
                sources = decodedSources
                webSnapshot = (theoremData, sourceData)
                manifest = next
                statusMessage = "题库已更新，共 \(next.theoremCount) 条（GitHub Pages）。"
            } else {
                manifest = next
                statusMessage = "题库已是最新版本。"
            }
            let now = Date()
            lastCheckedAt = now
            defaults.set(now, forKey: Self.lastCheckKey)
        } catch {
            statusMessage = "更新失败，继续使用本地题库：\(error.localizedDescription)"
        }
    }

    func toggleFavorite(_ id: String) {
        if !progress.favoriteIDs.insert(id).inserted { progress.favoriteIDs.remove(id) }
        saveProgress()
    }

    func recordAnswer(id: String, correct: Bool) {
        progress.completedQuestions += 1
        if correct {
            progress.correctAnswers += 1
            progress.incorrectIDs.remove(id)
        } else {
            progress.incorrectIDs.insert(id)
        }
        let day = Date.now.formatted(.iso8601.year().month().day().dateSeparator(.dash))
        progress.dailyAnswers[day, default: 0] += 1
        saveProgress()
    }

    func source(for id: String) -> TheoremSource? { sources.first { $0.id == id } }

    private func install(theoremData: Data, sourceData: Data) async throws {
        let (decodedTheorems, decodedSources) = try await Self.decode(theoremData: theoremData, sourceData: sourceData)
        theorems = decodedTheorems
        sources = decodedSources
        webSnapshot = (theoremData, sourceData)
    }

    private nonisolated static func read(_ url: URL) async throws -> Data {
        try await Task.detached(priority: .userInitiated) { try Data(contentsOf: url) }.value
    }

    private nonisolated static func decode(theoremData: Data, sourceData: Data) async throws -> ([Theorem], [TheoremSource]) {
        try await Task.detached(priority: .userInitiated) {
            let decodedTheorems = try JSONDecoder().decode([Theorem].self, from: theoremData)
            let decodedSources = try JSONDecoder().decode([TheoremSource].self, from: sourceData)
            guard Set(decodedTheorems.map(\.id)).count == decodedTheorems.count,
                  Set(decodedSources.map(\.id)).count == decodedSources.count else {
                throw LibraryError.duplicateID
            }
            return (decodedTheorems, decodedSources)
        }.value
    }

    private nonisolated static func saveSnapshot(
        theoremData: Data, sourceData: Data, manifestData: Data, revision: String, to base: URL
    ) async throws {
        try await Task.detached(priority: .utility) {
            let snapshots = base.appendingPathComponent("snapshots", isDirectory: true)
            let snapshot = snapshots.appendingPathComponent(revision, isDirectory: true)
            try FileManager.default.createDirectory(at: snapshot, withIntermediateDirectories: true)
            try theoremData.write(to: snapshot.appendingPathComponent("theorems.json"), options: .atomic)
            try sourceData.write(to: snapshot.appendingPathComponent("sources.json"), options: .atomic)
            try manifestData.write(to: base.appendingPathComponent("version.json"), options: .atomic)
            let old = (try? FileManager.default.contentsOfDirectory(at: snapshots, includingPropertiesForKeys: nil)) ?? []
            for directory in old where directory.lastPathComponent != revision {
                try? FileManager.default.removeItem(at: directory)
            }
        }.value
    }

    private func saveProgress() {
        do {
            try FileManager.default.createDirectory(at: appDirectory, withIntermediateDirectories: true)
            try JSONEncoder().encode(progress).write(to: appDirectory.appendingPathComponent("progress.json"), options: .atomic)
        } catch {
            statusMessage = "学习进度保存失败：\(error.localizedDescription)"
        }
    }

    private func download(_ path: String, revision: String? = nil) async throws -> Data {
        guard !path.hasPrefix("/"), !path.contains(".."),
              let url = URL(string: path, relativeTo: endpoint)?.absoluteURL,
              url.scheme == "https", url.host == endpoint.host else { throw LibraryError.invalidPath }
        var components = URLComponents(url: url, resolvingAgainstBaseURL: false)!
        components.queryItems = [URLQueryItem(name: "tq-update", value: revision ?? UUID().uuidString)]
        var request = URLRequest(url: components.url!)
        request.cachePolicy = .reloadIgnoringLocalCacheData
        request.setValue("no-cache, no-store", forHTTPHeaderField: "Cache-Control")
        request.timeoutInterval = 30
        let data: Data
        let response: URLResponse
        if let fetchData {
            (data, response) = try await fetchData(request)
        } else {
            (data, response) = try await URLSession.shared.data(for: request)
        }
        guard let http = response as? HTTPURLResponse else { throw LibraryError.invalidResponse }
        guard http.statusCode == 200 else { throw LibraryError.httpStatus(http.statusCode) }
        return data
    }

    private nonisolated static func revision(theorems: Data, sources: Data) -> String {
        hash(Data("\(hash(theorems)):\(hash(sources))".utf8))
    }

    private nonisolated static func hash(_ data: Data) -> String {
        SHA256.hash(data: data).map { String(format: "%02x", $0) }.joined()
    }
}
