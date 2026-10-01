import CryptoKit
import Foundation
import Testing
@testable import TheoremQuest

private enum Fixture {
    static let seedTheorems = Data("""
    [{"id":"seed","name":"Seed theorem","formula":"p ≡ p","kind":"Theorem","topic":"Logic",\
    "displayRef":"(1.1)","important":false,"current":true,"documentCount":1,\
    "preloaded2026":[16001],"preloadedSections":["Logic"],\
    "sources":[{"sourceId":"source","locator":{"line":3,"section":"Logic"},"excerpt":"Theorem"}]}]
    """.utf8)
    static let newTheorems = Data("""
    [{"id":"new","name":"New theorem","formula":"q ≡ q","kind":"Theorem","topic":"Logic",\
    "displayRef":"(2.1)","important":true,"current":true,"documentCount":1,\
    "preloaded2026":[16002],"preloadedSections":["Logic"],"sources":[]}]
    """.utf8)
    static let sources = Data("""
    [{"id":"source","name":"Notebook","year":2026,"url":"https://example.org/notebook"}]
    """.utf8)

    static func hash(_ data: Data) -> String {
        SHA256.hash(data: data).map { String(format: "%02x", $0) }.joined()
    }

    static func manifest(theorems: Data = newTheorems, sources: Data = sources,
                         schema: Int = 1, count: Int = 1, corruptHash: Bool = false,
                         upperHashes: Bool = false, study: Data? = nil) -> Data {
        let theoremHash = hash(theorems)
        let sourceHash = hash(sources)
        let hashes = [theoremHash, sourceHash] + (study.map { [hash($0)] } ?? [])
        let revision = hash(Data(hashes.joined(separator: ":").utf8))
        var object: [String: Any] = [
            "schemaVersion": schema, "revision": revision, "theoremCount": count,
            "builtAt": "2026-09-30T12:00:00Z",
            "files": [
                "theorems": ["path": "data/theorems.json", "sha256": corruptHash ? String(repeating: "0", count: 64) : (upperHashes ? theoremHash.uppercased() : theoremHash)],
                "sources": ["path": "data/sources.json", "sha256": upperHashes ? sourceHash.uppercased() : sourceHash]
            ]
        ]
        if let study {
            var files = object["files"] as! [String: Any]
            files["study"] = ["path": "data/study.json", "sha256": hash(study)]
            object["files"] = files
        }
        return try! JSONSerialization.data(withJSONObject: object)
    }

    static func responses(manifest: Data = manifest(), theorems: Data = newTheorems,
                          sources: Data = sources) -> [String: Data] {
        ["/data/version.json": manifest, "/data/theorems.json": theorems, "/data/sources.json": sources]
    }
}

private actor RequestLog {
    private var paths: [String] = []
    func add(_ path: String) { paths.append(path) }
    func all() -> [String] { paths }
    private var requests: [URLRequest] = []
    func record(_ request: URLRequest) { requests.append(request) }
    func allRequests() -> [URLRequest] { requests }
}

@Suite("Local library and Pages updates", .serialized)
@MainActor
struct LibraryStoreTests {
    @Test func mergedCardsKeepFavoritesAndMistakes() {
        var progress = PracticeProgress()
        progress.favoriteIDs = ["p-b1df9f7082d5"]
        progress.incorrectIDs = ["p-2d263565f9b0"]
        progress.migrateMergedCardIDs()
        #expect(progress.favoriteIDs == ["t-d212aba8ab10"])
        #expect(progress.incorrectIDs == ["t-e06bc0f878a5"])
    }

    private func environment(_ responses: [String: Data] = [:], status: Int = 200,
                             log: RequestLog = RequestLog()) -> (LibraryStore, URL, UserDefaults) {
        let directory = FileManager.default.temporaryDirectory
            .appendingPathComponent("TheoremQuestTests-\(UUID().uuidString)", isDirectory: true)
        let defaults = UserDefaults(suiteName: "TheoremQuestTests.\(UUID().uuidString)")!
        let store = LibraryStore(
            storageDirectory: directory,
            seedData: (Fixture.seedTheorems, Fixture.sources),
            defaults: defaults,
            fetchData: { request in
                let path = request.url!.path.replacingOccurrences(of: "/2LC3-theorem-memory", with: "")
                await log.add(path)
                await log.record(request)
                if path == "/data/version.json", responses[path] == nil, status == 404 {
                    return (Data(), HTTPURLResponse(url: request.url!, statusCode: 404, httpVersion: nil, headerFields: nil)!)
                }
                guard let data = responses[path] else { throw LibraryError.invalidResponse }
                let response = HTTPURLResponse(url: request.url!, statusCode: status == 404 ? 200 : status, httpVersion: nil, headerFields: nil)!
                return (data, response)
            }
        )
        return (store, directory, defaults)
    }

    @Test func bundledDataAndProgressSurviveReload() async throws {
        let (store, directory, defaults) = environment()
        defer { try? FileManager.default.removeItem(at: directory) }
        await store.load()
        #expect(store.theorems.count == 1)
        #expect(store.source(for: "source")?.name == "Notebook")
        store.toggleFavorite("seed")
        store.recordAnswer(id: "seed", correct: false)
        #expect(store.progress.incorrectIDs.contains("seed"))
        store.recordAnswer(id: "seed", correct: true)
        #expect(store.progress.correctAnswers == 1)
        #expect(store.progress.completedQuestions == 2)
        #expect(store.progress.incorrectIDs.isEmpty)

        let restored = LibraryStore(storageDirectory: directory,
                                    seedData: (Fixture.seedTheorems, Fixture.sources), defaults: defaults)
        await restored.load()
        #expect(restored.progress.favoriteIDs.contains("seed"))
        #expect(restored.progress.completedQuestions == 2)
        restored.toggleFavorite("seed")
        #expect(restored.progress.favoriteIDs.isEmpty)
    }

    @Test func validUpdateDownloadsVerifiesAndRestoresSnapshot() async throws {
        let log = RequestLog()
        let (store, directory, defaults) = environment(Fixture.responses(), log: log)
        defer { try? FileManager.default.removeItem(at: directory) }
        await store.load()
        let obsolete = directory.appendingPathComponent("snapshots/obsolete", isDirectory: true)
        try FileManager.default.createDirectory(at: obsolete, withIntermediateDirectories: true)
        await store.checkForUpdates()
        #expect(store.theorems.map(\.id) == ["new"])
        #expect(store.manifest != nil)
        #expect(store.statusMessage.contains("已更新"))
        #expect(await log.all() == ["/data/version.json", "/data/theorems.json", "/data/sources.json"])
        let revision = try #require(store.manifest?.revision)
        #expect(FileManager.default.fileExists(atPath: directory.appendingPathComponent("snapshots/\(revision)/theorems.json").path))
        #expect(!FileManager.default.fileExists(atPath: obsolete.path))

        let restored = LibraryStore(storageDirectory: directory,
                                    seedData: (Fixture.seedTheorems, Fixture.sources), defaults: defaults)
        await restored.load()
        #expect(restored.theorems.map(\.id) == ["new"])
        #expect(restored.manifest?.revision == revision)
    }

    @Test func studyOnlyChangeInstallsAndRestoresWithUnchangedTheorems() async throws {
        let study = Data("""
        {"schemaVersion":1,"bank":{"coverage":{"current2026PracticeCount":1},"weekBySource":{}},"proofQuestions":[],"proofSources":[],"notebookHints":{"notebooks":[],"groups":[]}}
        """.utf8)
        let manifest = Fixture.manifest(theorems: Fixture.seedTheorems, study: study)
        var responses = Fixture.responses(manifest: manifest, theorems: Fixture.seedTheorems)
        responses["/data/study.json"] = study
        let log = RequestLog()
        let (store, directory, defaults) = environment(responses, log: log)
        defer { try? FileManager.default.removeItem(at: directory) }
        await store.load()
        await store.checkForUpdates(force: true)
        #expect(store.theorems.map(\.id) == ["seed"])
        #expect(store.webStudySnapshot == study)
        #expect(store.statusMessage.contains("已更新"))
        #expect(await log.all().last == "/data/study.json")
        let restored = LibraryStore(storageDirectory: directory,
                                    seedData: (Fixture.seedTheorems, Fixture.sources), defaults: defaults)
        await restored.load()
        #expect(restored.webStudySnapshot == study)
        #expect(restored.manifest?.revision == store.manifest?.revision)
    }

    @Test func badStudyChecksumPreservesPreviouslyInstalledSnapshot() async throws {
        let study = Data("""
        {"schemaVersion":1,"bank":{"coverage":{},"weekBySource":{}},"proofQuestions":[],"proofSources":[],"notebookHints":{"notebooks":[],"groups":[]}}
        """.utf8)
        let expected = Data("""
        {"schemaVersion":1,"bank":{"coverage":{},"weekBySource":{},"revisionLabel":"next"},"proofQuestions":[],"proofSources":[],"notebookHints":{"notebooks":[],"groups":[]}}
        """.utf8)
        var initialResponses = Fixture.responses(manifest: Fixture.manifest(study: study))
        initialResponses["/data/study.json"] = study
        let (installed, directory, defaults) = environment(initialResponses)
        defer { try? FileManager.default.removeItem(at: directory) }
        await installed.load()
        await installed.checkForUpdates(force: true)
        let oldRevision = installed.manifest?.revision
        let manifest = Fixture.manifest(study: expected)
        var responses = Fixture.responses(manifest: manifest)
        responses["/data/study.json"] = study
        let failedResponses = responses
        let updating = LibraryStore(storageDirectory: directory,
                                   seedData: (Fixture.seedTheorems, Fixture.sources), defaults: defaults,
                                   fetchData: { request in
            let path = request.url!.path.replacingOccurrences(of: "/2LC3-theorem-memory", with: "")
            let response = HTTPURLResponse(url: request.url!, statusCode: 200, httpVersion: nil, headerFields: nil)!
            return (failedResponses[path]!, response)
        })
        await updating.load()
        await updating.checkForUpdates(force: true)
        #expect(updating.manifest?.revision == oldRevision)
        #expect(updating.theorems.map(\.id) == ["new"])
        #expect(updating.webStudySnapshot == study)
        #expect(updating.statusMessage.contains("完整性校验"))
        let restored = LibraryStore(storageDirectory: directory,
                                    seedData: (Fixture.seedTheorems, Fixture.sources), defaults: defaults)
        await restored.load()
        #expect(restored.manifest?.revision == oldRevision)
        #expect(restored.webStudySnapshot == study)
    }

    @Test func invalidStudyStructureCannotReplaceBank() async {
        let study = Data("{\"schemaVersion\":1,\"bank\":{},\"proofQuestions\":[]}".utf8)
        let manifest = Fixture.manifest(study: study)
        var responses = Fixture.responses(manifest: manifest)
        responses["/data/study.json"] = study
        let (store, directory, _) = environment(responses)
        defer { try? FileManager.default.removeItem(at: directory) }
        await store.load()
        await store.checkForUpdates(force: true)
        #expect(store.theorems.map(\.id) == ["seed"])
        #expect(store.manifest == nil)
        #expect(store.webStudySnapshot == nil)
        #expect(store.statusMessage.contains("更新失败"))
    }

    @Test func unchangedVersionAndDailyLimitAvoidDownloads() async {
        let log = RequestLog()
        let (store, directory, _) = environment(Fixture.responses(), log: log)
        defer { try? FileManager.default.removeItem(at: directory) }
        await store.load()
        await store.checkForUpdates()
        await store.checkForUpdates()
        #expect(await log.all().count == 3)
        await store.checkForUpdates(force: true)
        #expect(await log.all().count == 4)
        #expect(store.statusMessage.contains("最新版本"))
    }

    @Test func bundledRevisionSkipsMatchingRemotePayloads() async {
        let log = RequestLog()
        let manifest = Fixture.manifest(theorems: Fixture.seedTheorems)
        let (store, directory, _) = environment(["/data/version.json": manifest], log: log)
        defer { try? FileManager.default.removeItem(at: directory) }
        await store.load()
        await store.checkForUpdates(force: true)
        #expect(await log.all() == ["/data/version.json"])
        #expect(store.theorems.map(\.id) == ["seed"])
        #expect(store.statusMessage.contains("最新版本"))
        #expect(store.manifest != nil)
    }

    @Test func oldPagesWithoutManifestUpdatesAndPreservesProgress() async throws {
        let log = RequestLog()
        let (store, directory, defaults) = environment([
            "/data/theorems.json": Fixture.newTheorems, "/data/sources.json": Fixture.sources
        ], status: 404, log: log)
        defer { try? FileManager.default.removeItem(at: directory) }
        await store.load()
        store.toggleFavorite("seed")
        store.recordAnswer(id: "seed", correct: false)
        await store.checkForUpdates(force: true)
        #expect(store.theorems.map(\.id) == ["new"])
        #expect(store.progress.favoriteIDs.contains("seed"))
        #expect(store.progress.incorrectIDs.contains("seed"))
        #expect(store.webSnapshot?.theorems == Fixture.newTheorems)
        #expect(await log.all() == ["/data/version.json", "/data/theorems.json", "/data/sources.json"])
        let restored = LibraryStore(storageDirectory: directory,
                                    seedData: (Fixture.seedTheorems, Fixture.sources), defaults: defaults)
        await restored.load()
        #expect(restored.theorems.map(\.id) == ["new"])
        #expect(restored.progress.completedQuestions == 1)
    }

    @Test func updateRequestsBypassCachedPagesResponses() async {
        let log = RequestLog()
        let (store, directory, _) = environment(Fixture.responses(), log: log)
        defer { try? FileManager.default.removeItem(at: directory) }
        await store.load()
        await store.checkForUpdates(force: true)
        for request in await log.allRequests() {
            #expect(request.cachePolicy == .reloadIgnoringLocalCacheData)
            #expect(request.value(forHTTPHeaderField: "Cache-Control") == "no-cache, no-store")
            #expect(request.url?.query?.contains("tq-update=") == true)
        }
    }

    @Test func invalidLegacyPagesKeepInstalledBank() async {
        let (store, directory, _) = environment([
            "/data/theorems.json": Data("[]".utf8), "/data/sources.json": Fixture.sources
        ], status: 404)
        defer { try? FileManager.default.removeItem(at: directory) }
        await store.load()
        await store.checkForUpdates(force: true)
        #expect(store.theorems.map(\.id) == ["seed"])
        #expect(store.statusMessage.contains("更新失败"))
        #expect(store.lastCheckedAt == nil)
    }

    @Test func uppercaseHashesRestoreOnRelaunch() async {
        let manifest = Fixture.manifest(upperHashes: true)
        let (store, directory, defaults) = environment(Fixture.responses(manifest: manifest))
        defer { try? FileManager.default.removeItem(at: directory) }
        await store.load()
        await store.checkForUpdates(force: true)
        let restored = LibraryStore(storageDirectory: directory,
                                    seedData: (Fixture.seedTheorems, Fixture.sources), defaults: defaults)
        await restored.load()
        #expect(restored.theorems.map(\.id) == ["new"])
    }

    @Test func rejectedUpdatesKeepOfflineData() async {
        for (manifestData, message) in [
            (Fixture.manifest(corruptHash: true), "完整性校验"),
            (Fixture.manifest(schema: 2), "暂不受"),
            (Fixture.manifest(count: 2), "数量")
        ] {
            let (store, directory, _) = environment(Fixture.responses(manifest: manifestData))
            await store.load()
            await store.checkForUpdates(force: true)
            #expect(store.theorems.map(\.id) == ["seed"])
            #expect(store.manifest == nil)
            #expect(store.lastCheckedAt == nil)
            #expect(store.statusMessage.contains(message))
            try? FileManager.default.removeItem(at: directory)
        }
    }

    @Test func duplicateIDsCannotInstallAnUpdate() async {
        let duplicateSources = Data("""
        [{"id":"source","name":"First","year":2026,"url":"https://example.org/one"},
         {"id":"source","name":"Second","year":2026,"url":"https://example.org/two"}]
        """.utf8)
        let duplicateTheorems = Data("[\(String(decoding: Fixture.newTheorems.dropFirst().dropLast(), as: UTF8.self)),\(String(decoding: Fixture.newTheorems.dropFirst().dropLast(), as: UTF8.self))]".utf8)
        for (theorems, sources, count) in [
            (Fixture.newTheorems, duplicateSources, 1),
            (duplicateTheorems, Fixture.sources, 2)
        ] {
            let manifest = Fixture.manifest(theorems: theorems, sources: sources, count: count)
            let (store, directory, _) = environment(Fixture.responses(manifest: manifest, theorems: theorems, sources: sources))
            await store.load()
            await store.checkForUpdates(force: true)
            #expect(store.theorems.map(\.id) == ["seed"])
            #expect(store.manifest == nil)
            #expect(store.statusMessage.contains("重复 ID"))
            try? FileManager.default.removeItem(at: directory)
        }
    }

    @Test func failedHTTPResponsePreservesOfflineData() async {
        let (store, directory, _) = environment(Fixture.responses(), status: 503)
        defer { try? FileManager.default.removeItem(at: directory) }
        await store.load()
        await store.checkForUpdates(force: true)
        #expect(store.theorems.map(\.id) == ["seed"])
        #expect(store.lastCheckedAt == nil)
    }

    @Test func corruptSavedSnapshotFallsBackToBundledData() async {
        let (store, directory, defaults) = environment(Fixture.responses())
        defer { try? FileManager.default.removeItem(at: directory) }
        await store.load()
        await store.checkForUpdates(force: true)
        let revision = store.manifest!.revision
        try? Data("corrupt".utf8).write(to: directory.appendingPathComponent("snapshots/\(revision)/theorems.json"))
        let restored = LibraryStore(storageDirectory: directory,
                                    seedData: (Fixture.seedTheorems, Fixture.sources), defaults: defaults)
        await restored.load()
        #expect(restored.theorems.map(\.id) == ["seed"])
        #expect(restored.manifest == nil)
    }

    @Test func unreadableProgressIsPreservedForRecovery() async throws {
        let (store, directory, _) = environment()
        defer { try? FileManager.default.removeItem(at: directory) }
        try FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
        let bytes = Data("invalid progress".utf8)
        try bytes.write(to: directory.appendingPathComponent("progress.json"))
        await store.load()
        #expect(store.statusMessage.contains("无法读取"))
        #expect(try Data(contentsOf: directory.appendingPathComponent("progress-unreadable.json")) == bytes)
    }
}

@Suite("Practice question generation")
struct PracticeEngineTests {
    @Test func locationHintsUseEachNotebookWeeksForUnnamedOrUnnumberedCards() throws {
        var object = try #require(JSONSerialization.jsonObject(with: Fixture.seedTheorems) as? [[String: Any]]).first!
        object["sources"] = [
            ["sourceId": "early", "locator": ["line": 3, "section": "Logic"], "excerpt": "one"],
            ["sourceId": "late", "locator": ["line": 12], "excerpt": "two"],
            ["sourceId": "unassigned", "locator": [:], "excerpt": "three"],
            ["sourceId": "unknown", "locator": [:], "excerpt": "four"]
        ]
        let sources = try JSONDecoder().decode([TheoremSource].self, from: Data("""
        [{"id":"early","name":"Early Notebook","year":2026,"weeks":[2,3],"url":"http://example.org:16001/"},
         {"id":"late","name":"Late Notebook","year":2025,"weeks":[8],"url":"https://example.org/late"},
         {"id":"unassigned","name":"Unassigned Notebook","year":2026,"weeks":[],"url":"https://example.org/unassigned"}]
        """.utf8))
        for (name, numbers) in [("原文未命名", ["1.1"]), ("", ["1.1"]), ("Seed theorem", [])] {
            object["name"] = name
            object["numbers"] = numbers
            let theorem = try JSONDecoder().decode(Theorem.self, from: JSONSerialization.data(withJSONObject: object))
            let question = PracticeQuestion(theorem: theorem, mode: .name, options: [], correctOption: "",
                                            answerVariants: [theorem])
            let hint = PracticeEngine.hint(for: question, sources: sources)
            #expect(hint.locations.count == 4)
            #expect(hint.locations[0].title == "Early Notebook")
            #expect(hint.locations[0].detail == "Week 2、Week 3 · 2026 · port 16001 · Logic · 第 3 行")
            #expect(hint.locations[1].detail == "Week 8 · 2025 · 第 12 行")
            #expect(hint.locations[2].title == "Unassigned Notebook")
            #expect(hint.locations[2].detail == "Week 未归类 · 2026")
            #expect(hint.locations[3].detail == "Week 未归类")
            #expect(hint.locations[3].url == nil)
        }
    }

    @Test func numberedNamedHintDoesNotRevealCompleteAnswer() throws {
        var object = try #require(JSONSerialization.jsonObject(with: Fixture.seedTheorems) as? [[String: Any]]).first!
        object["numbers"] = ["1.1"]
        let theorem = try JSONDecoder().decode(Theorem.self, from: JSONSerialization.data(withJSONObject: object))
        for mode in PracticeQuestion.Mode.allCases {
            let question = PracticeQuestion(theorem: theorem, mode: mode, options: [], correctOption: "",
                                            answerVariants: [theorem])
            let hint = PracticeEngine.hint(for: question, sources: [])
            #expect(hint.locations.isEmpty)
            #expect(hint.text.contains("Logic"))
            #expect(!hint.text.contains(theorem.name))
            #expect(!hint.text.contains(theorem.formula))
        }
    }

    @Test func legacyMetadataFallsBackToCanonicalAnswers() throws {
        let theorem = try #require(JSONDecoder().decode([Theorem].self, from: Fixture.seedTheorems).first)
        #expect(theorem.answerNames == ["Seed theorem"])
        #expect(theorem.answerFormulas == ["p ≡ p"])
        #expect(theorem.answerReferences == ["(1.1)"])
        #expect(PracticeEngine.answerVariants(for: theorem, in: [theorem]) == [theorem])
    }

    @Test func feedbackIncludesAllNamesFormulasAndNumberedVariantsBeyondScope() throws {
        func card(_ id: String, name: String = "Seed theorem", numbers: [String] = ["1.1"]) throws -> Theorem {
            var object = try #require(JSONSerialization.jsonObject(with: Fixture.seedTheorems) as? [[String: Any]]).first!
            object["id"] = id
            object["name"] = name
            object["numbers"] = numbers
            object["aliases"] = [name, "Alias one", "Alias two", "Alias one"]
            object["formulaVariants"] = ["q ≡ q", "p ≡ p", "q ≡ q", "r ≡ r"]
            return try JSONDecoder().decode(Theorem.self, from: JSONSerialization.data(withJSONObject: object))
        }
        let target = try card("target")
        let related = try card("related", name: "“SEED   theorem”", numbers: ["1.2"])
        let unnumbered = try card("unnumbered", numbers: [])
        let unrelated = try card("unrelated", name: "Other theorem")
        let questions = PracticeEngine.makeQuestions(from: [target], count: 1,
                                                     answerRecords: [related, unnumbered, unrelated, target])
        let question = try #require(questions.first)
        #expect(question.answerVariants.map(\.id) == ["target", "related"])
        #expect(target.answerNames == ["Seed theorem", "Alias one", "Alias two"])
        #expect(target.answerFormulas == ["p ≡ p", "q ≡ q", "r ≡ r"])
        #expect(related.answerReferences == ["(1.1)", "(1.2)"])
        #expect(PracticeEngine.answerVariants(for: unnumbered, in: [target, related, unnumbered]) == [unnumbered])
    }

    private func card(_ id: String, name: String, formula: String, topic: String = "Logic",
                      variants: [String] = []) throws -> Theorem {
        let object: [String: Any] = [
            "id": id, "name": name, "formula": formula, "kind": "Theorem", "topic": topic,
            "displayRef": id, "important": false, "current": true, "documentCount": 1,
            "preloaded2026": [], "preloadedSections": [], "sources": [], "formulaVariants": variants
        ]
        return try JSONDecoder().decode(Theorem.self, from: JSONSerialization.data(withJSONObject: object))
    }

    @Test func difficultySelectsIncreasinglySimilarDistractors() throws {
        let target = try card("target", name: "Conjunction identity", formula: "p ∧ true ≡ p")
        let records = try [
            card("same name", name: "Conjunction identity", formula: "p ∧ false ≡ false"),
            card("similar name", name: "Conjunction zero", formula: "q ∧ false ≡ false"),
            card("similar structure", name: "Disjunction identity", formula: "p ∨ false ≡ p"),
            card("mid", name: "Negation", formula: "¬¬p ≡ p"),
            card("middle", name: "Implication", formula: "p ⇒ q"),
            card("low", name: "Integer order", formula: "a ≤ b", topic: "Arithmetic"),
            card("lowest", name: "Set inclusion", formula: "A ⊆ B", topic: "Sets")
        ]
        func average(_ difficulty: PracticeDifficulty) -> Double {
            let options = PracticeEngine.distractors(for: target, mode: .name, in: records, difficulty: difficulty).prefix(3)
            return options.map { PracticeEngine.similarity($0, to: target) }.reduce(0, +) / Double(options.count)
        }
        for _ in 0..<10 {
            #expect(average(.easy) < average(.standard))
            #expect(average(.standard) < average(.hard))
            #expect(PracticeEngine.distractors(for: target, mode: .name, in: records, difficulty: .hard).first?.id == "same name")
        }
    }

    @Test func normalizedEquivalentVariantsAndDuplicateAnswersAreExcludedAtEveryDifficulty() throws {
        let target = try card("target", name: "Target", formula: "p ∧ q", variants: ["q ∧ p"])
        let records = try [target,
            card("whitespace", name: "Equivalent", formula: "p∧q"),
            card("variant", name: "Variant", formula: "q ∧ p"),
            card("overlap", name: "Overlap", formula: "p ∨ q", variants: ["p ∧ q"]),
            card("safe", name: "Safe", formula: "p ⇒ q"),
            card("duplicate", name: "Duplicate", formula: "p⇒q")
        ]
        for difficulty in PracticeDifficulty.allCases {
            for mode in [PracticeQuestion.Mode.name, .formula] {
                let options = PracticeEngine.distractors(for: target, mode: mode, in: records, difficulty: difficulty)
                #expect(options.allSatisfy { ["safe", "duplicate"].contains($0.id) })
                #expect(options.count == (mode == .formula ? 1 : 2))
            }
            let questions = PracticeEngine.makeQuestions(from: records, count: 100, difficulty: difficulty)
            #expect(questions.count == records.count)
            for question in questions {
                #expect(question.options.contains(question.correctOption))
                #expect(Set(question.options).count == question.options.count)
                #expect(question.options.count <= 4)
            }
        }
    }

    @Test func hardDifficultyExcludesBasicNamesAndAliasesFromQuestionsAndDistractors() throws {
        let basicNames = ["Associativity", "Associative law", "asso", "Symmetry", "Symmetric equality",
                          "Reflexivity", "Reflexive relation", "结合律", "对称性", "自反性"]
        var basics = try basicNames.enumerated().map { offset, name in
            try card("basic-\(offset)", name: name, formula: "p \(offset) q")
        }
        let aliasObject: [String: Any] = [
            "id": "aliased-basic", "name": "Equivalent names", "aliases": ["Associativity"],
            "formula": "x ∧ y", "kind": "Theorem", "topic": "Logic", "displayRef": "(2)",
            "important": false, "current": true, "documentCount": 1,
            "preloaded2026": [], "preloadedSections": [], "sources": []
        ]
        basics.append(try JSONDecoder().decode(Theorem.self, from: JSONSerialization.data(withJSONObject: aliasObject)))
        let advanced = try card("advanced", name: "Distributivity", formula: "p ∧ (q ∨ r)")
        let records = basics + [advanced]
        #expect(PracticeEngine.eligibleRecords(from: records, difficulty: .easy).count == records.count)
        #expect(PracticeEngine.eligibleRecords(from: records, difficulty: .standard).count == records.count)
        #expect(PracticeEngine.eligibleRecords(from: records, difficulty: .hard).map(\.id) == ["advanced"])
        let question = try #require(PracticeEngine.makeQuestions(from: records, count: 100, difficulty: .hard).first)
        #expect(question.theorem.id == "advanced")
        #expect(question.options == [question.correctOption])
        #expect(PracticeEngine.makeQuestions(from: basics, count: 100, difficulty: .hard).isEmpty)
        #expect(!PracticeEngine.makeQuestions(from: basics, count: 100, mode: .blanks, difficulty: .hard).isEmpty)
        #expect(PracticeEngine.distractors(for: advanced, mode: .formula, in: records, difficulty: .hard).isEmpty)
    }

    @Test func emptyAndSingleCardPoolsRemainUsableAtEveryDifficulty() throws {
        let target = try card("target", name: "Target", formula: "p ∧ q")
        for difficulty in PracticeDifficulty.allCases {
            #expect(PracticeEngine.makeQuestions(from: [], count: 10, difficulty: difficulty).isEmpty)
            #expect(PracticeEngine.makeQuestions(from: [target], count: -1, difficulty: difficulty).isEmpty)
            let question = try #require(PracticeEngine.makeQuestions(from: [target], count: 10, difficulty: difficulty).first)
            #expect(question.options == [question.correctOption])
        }
    }

    @Test func sharedNameAndReferenceDoNotBecomeWrongFormulaOptions() throws {
        let seed = String(decoding: Fixture.seedTheorems, as: UTF8.self)
        let variant = seed.replacingOccurrences(of: "\"seed\"", with: "\"variant\"")
            .replacingOccurrences(of: "p ≡ p", with: "q ≡ q")
        let records = try JSONDecoder().decode([Theorem].self, from: Fixture.seedTheorems)
            + JSONDecoder().decode([Theorem].self, from: Data(variant.utf8))
        let question = try #require(PracticeEngine.makeQuestions(from: records, count: 2).last)
        #expect(question.mode == .formula)
        #expect(question.options == [question.correctOption])
    }

    @Test func equivalentFormulasDoNotBecomeWrongNameOptions() throws {
        let seed = String(decoding: Fixture.seedTheorems, as: UTF8.self)
        let alias = seed.replacingOccurrences(of: "\"seed\"", with: "\"alias\"")
            .replacingOccurrences(of: "Seed theorem", with: "Equivalent theorem")
            .replacingOccurrences(of: "(1.1)", with: "(1.2)")
        let records = try JSONDecoder().decode([Theorem].self, from: Fixture.seedTheorems)
            + JSONDecoder().decode([Theorem].self, from: Data(alias.utf8))
        let question = try #require(PracticeEngine.makeQuestions(from: records, count: 1).first)
        #expect(question.mode == .name)
        #expect(question.options == [question.correctOption])
    }

    @Test func choicesAlwaysContainCorrectAnswerAndAlternateModes() throws {
        let records = try JSONDecoder().decode([Theorem].self, from: Fixture.seedTheorems)
            + JSONDecoder().decode([Theorem].self, from: Fixture.newTheorems)
        let questions = PracticeEngine.makeQuestions(from: records, count: 2)
        #expect(questions.count == 2)
        #expect(questions[0].mode == .name)
        #expect(questions[1].mode == .formula)
        for question in questions {
            #expect(question.options.contains(question.correctOption))
            #expect(Set(question.options).count == question.options.count)
            #expect(question.options.count <= 4)
        }
    }
}

@Suite("Study scope")
struct StudyScopeTests {
    @Test func weekMembershipCanOverlapAndAccumulateWithinYear() throws {
        let sourceData = Data("""
        [{"id":"first","name":"Week 1 notebook","year":2026,"weeks":[1]},
         {"id":"second","name":"Week 2 notebook","year":2026,"weeks":[2]},
         {"id":"archive","name":"2025 notebook","year":2025,"weeks":[1]}]
        """.utf8)
        let sources = try Dictionary(uniqueKeysWithValues:
            JSONDecoder().decode([TheoremSource].self, from: sourceData).map { ($0.id, $0) })
        func card(_ id: String, _ sourceIDs: [String]) throws -> Theorem {
            let object: [String: Any] = [
                "id": id, "name": id, "formula": "p ≡ p", "kind": "Theorem",
                "topic": "Logic", "displayRef": id, "important": false, "current": true,
                "documentCount": sourceIDs.count, "preloaded2026": [], "preloadedSections": [],
                "sources": sourceIDs.map { ["sourceId": $0, "locator": ["line": 1], "excerpt": id] }
            ]
            return try JSONDecoder().decode(Theorem.self, from: JSONSerialization.data(withJSONObject: object))
        }
        let first = try card("first card", ["first"])
        let second = try card("second card", ["second"])
        let repeated = try card("repeated", ["first", "second", "archive"])
        let archiveOnly = try card("archive only", ["archive"])
        var scope = StudyScope(year: 2026, week: 2)
        #expect(!scope.matches(first, sources: sources))
        #expect(scope.matches(second, sources: sources))
        #expect(scope.matches(repeated, sources: sources))
        #expect(!scope.matches(archiveOnly, sources: sources))
        scope.includesPreviousWeeks = true
        #expect(scope.matches(first, sources: sources))
        #expect(scope.matches(repeated, sources: sources))
        #expect(!scope.matches(archiveOnly, sources: sources))
        scope.selectNotebook("second")
        #expect(scope.week == nil)
        #expect(!scope.includesPreviousWeeks)
        #expect(!scope.matches(first, sources: sources))
        #expect(scope.matches(repeated, sources: sources))
    }
}

@Suite("App configuration")
struct AppConfigurationTests {
    @Test @MainActor func backgroundRefreshIdentifierIsDeclared() {
        let permitted = Bundle.main.object(forInfoDictionaryKey: "BGTaskSchedulerPermittedIdentifiers") as? [String]
        #expect(permitted?.contains(TheoremQuestApp.refreshID) == true)
        #expect(Bundle.main.object(forInfoDictionaryKey: "UIDeviceFamily") as? [Int] == [1])
    }
}


@Suite("Letter blanks and symbol cloze")
struct FillPracticeEngineTests {
    private func card(_ formula: String, id: String = "fill", kind: String = "Theorem", name: String = "Seed theorem") throws -> Theorem {
        var object = try #require(JSONSerialization.jsonObject(with: Fixture.seedTheorems) as? [[String: Any]]).first!
        object["id"] = id
        object["formula"] = formula
        object["kind"] = kind
        object["name"] = name
        return try JSONDecoder().decode(Theorem.self, from: JSONSerialization.data(withJSONObject: object))
    }

    @Test func tokenizerMatchesCorpusNotationAndFixedWords() {
        #expect(PracticeEngine.tokenize("⟨b, c⟩ = ⟨b′, c′⟩ ≡ b = b′ ∧ c = c′") ==
                ["⟨", "b", ",", "c", "⟩", "=", "⟨", "b'", ",", "c'", "⟩", "≡", "b", "=", "b'", "∧", "c", "=", "c'"])
        #expect(PracticeEngine.tokenize("P₁ ⇒⁅ C₂ ⁆ Q") == ["P₁", "⇒", "⁅", "C₂", "⁆", "Q"])
        #expect(PracticeEngine.tokenize(#"is-knight x \land p /≡ q′ AND x <= 1.5 \in \NN"#) ==
                ["is-knight", "x", "∧", "p", "≢", "q'", "∧", "x", "≤", "1.5", "∈", "ℕ"])
        for token in ["true", "false", "suc", "fst", "Nat", "Bool", "ℕ", "𝜖", "is-knight", "while", "nil", "length"] {
            #expect(!PracticeEngine.isVariable(token))
        }
        for token in ["p", "C₁", "α", "Q'", "Ab", "n_2"] {
            #expect(PracticeEngine.isVariable(token))
        }
        for token in ["", "pq", "x + y", "3", "∧", " p "] {
            #expect(!PracticeEngine.isVariable(token))
        }
    }

    @Test func blanksHideEveryOccurrenceAndAcceptOnlyBijectiveRenaming() throws {
        let theorem = try card("p ∧ q ≡ q ∧ p ∧ true ∧ suc n = n")
        let question = try #require(PracticeEngine.makeQuestions(from: [theorem], count: 1, mode: .blanks).first)
        #expect(question.blankIndices.map { question.tokens[$0] } == ["p", "q", "q", "p", "n", "n"])
        #expect(question.keyboardOptions.contains("n"))
        #expect(PracticeEngine.gradeBlanks(question: question, values: ["x", "y", "y", "x", "z", "z"]))
        #expect(PracticeEngine.gradeBlanks(question: question, values: [" α ", "Q₁", "Q₁", "α", "x′", "x'"]))
        #expect(!PracticeEngine.gradeBlanks(question: question, values: ["x", "y", "z", "x", "n", "n"]))
        #expect(!PracticeEngine.gradeBlanks(question: question, values: ["x", "x", "x", "x", "n", "n"]))
        #expect(!PracticeEngine.gradeBlanks(question: question, values: ["true", "y", "y", "true", "n", "n"]))
        #expect(!PracticeEngine.gradeBlanks(question: question, values: ["x + y", "y", "y", "x + y", "n", "n"]))
        #expect(!PracticeEngine.gradeBlanks(question: question, values: ["x", "y"]))
        #expect(!PracticeEngine.gradeBlanks(question: question, values: []))
    }

    @Test func requestedModesFilterIneligibleCardsWithoutFallback() throws {
        let records = try [card("true", id: "constant"), card("p", id: "variable", name: "Reflexivity"),
                           card("true ≡ false ≡ true", id: "symbol", name: "Associativity"),
                           card("true ≡ false", id: "single-symbol"), card("p ≡ q", id: "rule", kind: "Inference rule")]
        let blanks = PracticeEngine.makeQuestions(from: records, count: 10, mode: .blanks)
        #expect(blanks.map(\.theorem.id) == ["variable"])
        #expect(blanks.allSatisfy { $0.mode == .blanks })
        let cloze = PracticeEngine.makeQuestions(from: records, count: 10, mode: .cloze)
        #expect(cloze.map(\.theorem.id) == ["symbol"])
        #expect(cloze.allSatisfy { $0.mode == .cloze })
        #expect(PracticeEngine.makeQuestions(from: records, count: 10, mode: .blanks, difficulty: .hard).map(\.theorem.id) == ["variable"])
        #expect(PracticeEngine.makeQuestions(from: records, count: 10, mode: .cloze, difficulty: .hard).map(\.theorem.id) == ["symbol"])
        #expect(PracticeEngine.makeQuestions(from: [records[0]], count: 10, mode: .blanks).isEmpty)
        #expect(PracticeEngine.makeQuestions(from: [records[1]], count: 10, mode: .cloze).isEmpty)
        let question = try #require(cloze.first)
        #expect(question.blankIndices == [1, 3])
        #expect(question.correctOption == "true ≡ false ≡ true")
        #expect(Set(question.keyboardOptions) == Set(["≡", "≢", "⇒", "⇐"]))
        #expect(question.options == question.keyboardOptions)
        #expect(!PracticeEngine.gradeBlanks(question: question, values: ["x"]))
    }

    @Test func symbolClozeHidesEveryOperatorAndGradesEachPosition() throws {
        let theorem = try card("p ∧ q ≡ q ∨ p ∧ true")
        let question = try #require(PracticeEngine.makeQuestions(from: [theorem], count: 1, mode: .cloze).first)
        #expect(question.blankIndices == [1, 3, 5, 7])
        #expect(Set(question.keyboardOptions) == Set(["∧", "∨", "¬", "≡", "≢", "⇒", "⇐"]))
        #expect(question.keyboardOptions.count == Set(question.keyboardOptions).count)
        #expect(PracticeEngine.gradeCloze(question: question, values: ["∧", "≡", "∨", "∧"]))
        #expect(PracticeEngine.gradeCloze(question: question, values: [" AND ", #"\equiv"#, "OR", "∧"]))
        #expect(!PracticeEngine.gradeCloze(question: question, values: ["∨", "≡", "∧", "∧"]))
        #expect(!PracticeEngine.gradeCloze(question: question, values: ["∧"]))
        #expect(!PracticeEngine.gradeCloze(question: question, values: ["∧", "≡", "∨", ""]))
        #expect(!PracticeEngine.gradeCloze(question: question, values: []))
        #expect(!PracticeEngine.hasClozeSymbol(in: "p ≡ q"))
        #expect(PracticeEngine.hasClozeSymbol(in: "p ≡ q ≡ p"))
    }

    @Test func bundledCorpusSupportsBothFillModes() throws {
        let url = try #require(Bundle.main.url(forResource: "theorems", withExtension: "json"))
        let records = try JSONDecoder().decode([Theorem].self, from: Data(contentsOf: url))
        let practiceCards = records.filter(\.isPracticeCard)
        let blanks = PracticeEngine.makeQuestions(from: records, count: records.count, mode: .blanks)
        let cloze = PracticeEngine.makeQuestions(from: records, count: records.count, mode: .cloze)
        #expect(!blanks.isEmpty && !cloze.isEmpty)
        #expect(Set(blanks.map(\.theorem.id)) == Set(practiceCards.filter {
            PracticeEngine.tokenize($0.formula).contains(where: PracticeEngine.isVariable)
        }.map(\.id)))
        #expect(Set(cloze.map(\.theorem.id)) == Set(practiceCards.filter {
            PracticeEngine.hasClozeSymbol(in: $0.formula)
        }.map(\.id)))
        for question in blanks {
            #expect(question.blankIndices == question.tokens.indices.filter { PracticeEngine.isVariable(question.tokens[$0]) })
            #expect(PracticeEngine.gradeBlanks(question: question, values: question.blankIndices.map { question.tokens[$0] }))
        }
        for question in cloze {
            #expect(question.blankIndices.count >= 2)
            let answers = question.blankIndices.map { question.tokens[$0] }
            #expect(answers.allSatisfy { question.keyboardOptions.contains($0) })
            #expect(PracticeEngine.gradeCloze(question: question, values: answers))
            #expect(Set(question.keyboardOptions).count == question.keyboardOptions.count)
            #expect(question.keyboardOptions.count >= 3)
        }
    }
}

@Suite("Focused theorem study")
struct TheoremFocusTests {
    private func card(_ id: String, important: Bool = false, documents: Int = 1,
                      repeated: Bool? = nil, study: [String: Any]? = nil,
                      name: String = "Distributivity") throws -> Theorem {
        var object: [String: Any] = [
            "id": id, "name": name, "formula": "p ∧ (q ∨ r)", "kind": "Theorem",
            "topic": "Logic", "displayRef": id, "important": important, "current": true,
            "documentCount": documents, "preloaded2026": [], "preloadedSections": [],
            "sources": [["sourceId": "current", "locator": ["line": 1], "excerpt": id]]
        ]
        if let repeated { object["repeated"] = repeated }
        if let study { object["documentStudy"] = study }
        return try JSONDecoder().decode(Theorem.self, from: JSONSerialization.data(withJSONObject: object))
    }

    private func study(important: Bool, occurrences: Int) -> [String: Any] {
        ["important": important, "repeated": occurrences >= 2, "documentCount": 1,
         "occurrences": occurrences, "proofMentions": 1,
         "importantEvidence": [["sourceId": "pdf", "label": "Important", "locator": ["page": 2], "references": ["3.1"]]],
         "evidence": [["sourceId": "pdf", "label": "Theorem (3.1)", "locator": ["page": 2], "occurrences": occurrences, "proofMentions": 1]]]
    }

    @Test func bundledDocumentEvidenceDecodesAndHasUsefulFocusPools() throws {
        let url = try #require(Bundle.main.url(forResource: "theorems", withExtension: "json"))
        let records = try JSONDecoder().decode([Theorem].self, from: Data(contentsOf: url))
        #expect(!records.isEmpty)
        #expect(records.allSatisfy { $0.documentStudy != nil })
        #expect(records.contains { TheoremFocus.important.matches($0) })
        #expect(records.contains { TheoremFocus.repeated.matches($0) })
        for record in records {
            let study = try #require(record.documentStudy)
            #expect(record.isImportantForStudy == study.important)
            #expect(record.isRepeated == (study.occurrences >= 2))
            #expect(study.evidence.allSatisfy { $0.sourceName != nil })
        }
    }

    @Test func legacyCardsDecodeWithoutNewMetadata() throws {
        let legacy = try card("legacy", important: true, documents: 2)
        #expect(legacy.documentStudy == nil)
        #expect(legacy.occurrences == nil)
        #expect(legacy.importantEvidence == nil)
        #expect(!TheoremFocus.important.matches(legacy))
        #expect(!TheoremFocus.repeated.matches(legacy))
        let explicit = try card("explicit", documents: 3, repeated: false)
        #expect(!TheoremFocus.repeated.matches(explicit))
    }

    @Test func documentMetadataOverridesPreloadedAvailabilityAndDecodesEvidence() throws {
        let preloadedOnly = try card("preloaded", important: true, documents: 20, repeated: true,
                                    study: study(important: false, occurrences: 0))
        #expect(!TheoremFocus.important.matches(preloadedOnly))
        #expect(!TheoremFocus.repeated.matches(preloadedOnly))
        #expect(!TheoremFocus.priority.matches(preloadedOnly))
        let mentionedTwice = try card("repeated", study: study(important: false, occurrences: 2))
        #expect(TheoremFocus.repeated.matches(mentionedTwice))
        #expect(mentionedTwice.documentStudy?.documentCount == 1)
        #expect(mentionedTwice.documentStudy?.evidence.first?.locator.page == 2)
        #expect(mentionedTwice.documentStudy?.importantEvidence.first?.references == ["3.1"])
    }

    @Test func unionDeduplicatesAndFocusIntersectsScopeAndPracticeEligibility() throws {
        let important = try card("important", study: study(important: true, occurrences: 1))
        let repeated = try card("repeated", study: study(important: false, occurrences: 2))
        let both = try card("both", study: study(important: true, occurrences: 3))
        let ordinary = try card("ordinary", study: study(important: false, occurrences: 1))
        let basic = try card("basic", study: study(important: true, occurrences: 3), name: "Reflexivity")
        let records = [important, repeated, both, ordinary, basic]
        let source = try JSONDecoder().decode(TheoremSource.self, from: Data("{\"id\":\"current\",\"name\":\"Current\",\"year\":2026,\"weeks\":[2]}".utf8))
        let sources = [source.id: source]
        let scope = StudyScope(year: 2026, week: 2)
        let focused = records.filter { TheoremFocus.priority.matches($0) && scope.matches($0, sources: sources) }
        #expect(focused.map(\.id) == ["important", "repeated", "both", "basic"])
        let questions = PracticeEngine.makeQuestions(from: focused, count: 100, difficulty: .hard)
        #expect(Set(questions.map { $0.theorem.id }) == ["important", "repeated", "both"])
        #expect(records.filter { TheoremFocus.priority.matches($0) && StudyScope(year: 2025).matches($0, sources: sources) }.isEmpty)
        #expect(PracticeEngine.makeQuestions(from: [], count: 10).isEmpty)
    }
}
