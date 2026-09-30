import SafariServices
import SwiftUI
import WebKit

/// The same offline game and grading engine as the website, with native storage
/// and file sharing. There is one learning record across all five destinations.
struct CompleteQuestView: View {
    let library: LibraryStore
    @State private var showUpdates = false
    @State private var updateRevision: String?
    @State private var sharedFile: QuestSharedFile?
    @State private var externalPage: QuestExternalPage?
    @State private var loadError: String?
    @State private var reloadID = UUID()
    @ScaledMetric(relativeTo: .body) private var webTextSize = 16

    var body: some View {
        ZStack {
            QuestStyle.page.ignoresSafeArea()
            if library.isLoading {
                ProgressView("正在准备关卡…")
            } else {
                QuestWebView(library: library, textScale: webTextSize / 16, onUpdates: { updateRevision = library.manifest?.revision; showUpdates = true },
                             onExport: export, onExternal: { externalPage = QuestExternalPage(url: $0) },
                             onError: { loadError = $0 })
                    .id(reloadID)
                    .ignoresSafeArea(.container, edges: .bottom)
            }
            if let loadError {
                VStack(spacing: 16) {
                    Image(systemName: "exclamationmark.triangle").font(.largeTitle)
                    Text("学习界面暂时无法打开").font(.headline)
                    Text(loadError).font(.footnote).multilineTextAlignment(.center)
                    Button("重新载入") { self.loadError = nil; reloadID = UUID() }
                        .buttonStyle(.borderedProminent)
                }
                .padding(24)
                .background(QuestStyle.paper, in: RoundedRectangle(cornerRadius: 24))
                .padding(20)
            }
        }
        .foregroundStyle(QuestStyle.ink)
        .onChange(of: library.manifest?.revision) { oldRevision, newRevision in
            // Automatic/background installs must also reach the running game;
            // the WKUserScript snapshot is fixed when its web view is created.
            if oldRevision != newRevision, !showUpdates { reloadID = UUID() }
        }
        .sheet(isPresented: $showUpdates, onDismiss: {
            if updateRevision != library.manifest?.revision { reloadID = UUID() }
        }) {
            NavigationStack {
                SyncView(library: library)
                    .toolbar { ToolbarItem(placement: .confirmationAction) { Button("完成") { showUpdates = false } } }
            }
        }
        .sheet(item: $sharedFile, onDismiss: removeSharedFile) { item in
            QuestShareSheet(url: item.url)
        }
        .sheet(item: $externalPage) { item in
            QuestSourceBrowser(url: item.url)
        }
    }

    private func export(name: String, content: String) {
        do {
            let directory = FileManager.default.temporaryDirectory.appendingPathComponent("QuestExports", isDirectory: true)
            try FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
            let filename = URL(fileURLWithPath: name).lastPathComponent
            let url = directory.appendingPathComponent(filename)
            try Data(content.utf8).write(to: url, options: .atomic)
            sharedFile = QuestSharedFile(url: url)
        } catch { loadError = "备份文件无法保存：\(error.localizedDescription)" }
    }

    private func removeSharedFile() {
        let directory = FileManager.default.temporaryDirectory.appendingPathComponent("QuestExports", isDirectory: true)
        try? FileManager.default.removeItem(at: directory)
    }
}

private struct QuestSharedFile: Identifiable { let id = UUID(); let url: URL }
private struct QuestExternalPage: Identifiable { let id = UUID(); let url: URL }

private struct QuestShareSheet: UIViewControllerRepresentable {
    let url: URL
    func makeUIViewController(context: Context) -> UIActivityViewController {
        UIActivityViewController(activityItems: [url], applicationActivities: nil)
    }
    func updateUIViewController(_ controller: UIActivityViewController, context: Context) {}
}

private struct QuestSourceBrowser: UIViewControllerRepresentable {
    let url: URL
    func makeUIViewController(context: Context) -> SFSafariViewController { SFSafariViewController(url: url) }
    func updateUIViewController(_ controller: SFSafariViewController, context: Context) {}
}

private struct QuestWebView: UIViewRepresentable {
    static let storageKey = "quest.web.storage.v1"
    let library: LibraryStore
    let textScale: CGFloat
    let onUpdates: () -> Void
    let onExport: (String, String) -> Void
    let onExternal: (URL) -> Void
    let onError: (String) -> Void

    func makeCoordinator() -> Coordinator { Coordinator(parent: self) }

    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.websiteDataStore = .default()
        configuration.mediaTypesRequiringUserActionForPlayback = []
        let controller = configuration.userContentController
        controller.add(context.coordinator, name: "quest")
        controller.addUserScript(WKUserScript(source: bootstrap(), injectionTime: .atDocumentStart, forMainFrameOnly: true))
        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.navigationDelegate = context.coordinator
        webView.uiDelegate = context.coordinator
        webView.isOpaque = false
        webView.backgroundColor = UIColor(QuestStyle.page)
        webView.scrollView.backgroundColor = UIColor(QuestStyle.page)
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.accessibilityIdentifier = "quest.completeGame"
        guard let url = Bundle.main.url(forResource: "TheoremQuest", withExtension: "html") else {
            DispatchQueue.main.async { onError("App 内置学习界面缺失，请重新构建应用。") }
            return webView
        }
        webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        let previousScale = context.coordinator.parent.textScale
        context.coordinator.parent = self
        if previousScale != textScale {
            webView.evaluateJavaScript("window.TQSetTextScale?.(\(textScale))", completionHandler: nil)
        }
    }

    static func dismantleUIView(_ webView: WKWebView, coordinator: Coordinator) {
        webView.stopLoading()
        webView.configuration.userContentController.removeScriptMessageHandler(forName: "quest")
        webView.navigationDelegate = nil
        webView.uiDelegate = nil
    }

    private func bootstrap() -> String {
        var stored = UserDefaults.standard.dictionary(forKey: Self.storageKey) as? [String: String] ?? [:]
        #if DEBUG
        let arguments = ProcessInfo.processInfo.arguments
        if let modeIndex = arguments.firstIndex(of: "-ui-testing-keyboard-mode"), modeIndex + 1 < arguments.count {
            stored["tq.settings.v1"] = json([
                "modeDefaultsVersion": 2, "modes": [arguments[modeIndex + 1]], "count": 1, "retry": false,
                "sound": false, "scope": ["era": "all", "manual": true, "selected": ["t-077f95896e0f"]]
            ])
        }
        #endif
        // One-time migration of the old native app's actual favorites, pending
        // mistakes and daily counts. No attempt history or XP is fabricated.
        if stored["tq.native.migrated"] == nil {
            if stored["tq.progress.v1"] == nil {
                let records = Dictionary(uniqueKeysWithValues: library.progress.incorrectIDs.map {
                    ($0, ["attempts": 1, "correct": 0, "wrong": 1, "streak": 0,
                          "wrongModes": ["choice"], "modeWins": [:], "log": []] as [String: Any])
                })
                let progress: [String: Any] = ["schemaVersion": 1, "records": records, "stars": Array(library.progress.favoriteIDs),
                                               "days": library.progress.dailyAnswers, "history": [], "xp": 0]
                stored["tq.progress.v1"] = json(progress)
            }
            stored["tq.native.migrated"] = "true"
            UserDefaults.standard.set(stored, forKey: Self.storageKey)
        }
        #if DEBUG
        let webTestArguments = ProcessInfo.processInfo.arguments
        if let index = webTestArguments.firstIndex(of: "-ui-testing-web-mode"), index + 1 < webTestArguments.count {
            stored["tq.settings.v1"] = json(["modeDefaultsVersion": 2, "modes": [webTestArguments[index + 1]],
                                               "count": 1, "retry": false, "scope": ["era": "2026"]])
        }
        if let index = webTestArguments.firstIndex(of: "-ui-testing-keyboard-mode"), index + 1 < webTestArguments.count {
            stored["tq.settings.v1"] = json(["modeDefaultsVersion": 2, "modes": [webTestArguments[index + 1]],
                                               "count": 1, "retry": false,
                                               "scope": ["era": "all", "manual": true, "selected": ["t-077f95896e0f"]]])
        }
        #endif
        let snapshot: String
        if let raw = library.webSnapshot,
           let theorems = try? JSONSerialization.jsonObject(with: raw.theorems),
           let sources = try? JSONSerialization.jsonObject(with: raw.sources) {
            snapshot = json(["theorems": theorems, "sources": sources])
        } else { snapshot = "null" }
        return """
        window.TQ_NATIVE = true;
        window.TQNativeData = \(snapshot);
        window.TQSetTextScale = scale => {
          document.documentElement.style.fontSize = (16 * scale) + 'px';
          document.documentElement.classList.toggle('native-large-text', scale > 1.25);
        };
        document.addEventListener('DOMContentLoaded', () => window.TQSetTextScale(\(textScale)));
        (() => {
          const store = \(json(stored));
          const save = () => window.webkit.messageHandlers.quest.postMessage({action:'storage', values:store});
          const storage = {
            getItem(key) { key=String(key); return Object.hasOwn(store,key) ? store[key] : null; },
            setItem(key,value) { store[String(key)]=String(value); save(); },
            removeItem(key) { delete store[String(key)]; save(); },
            clear() { for (const key of Object.keys(store)) if (key.startsWith('tq.')) delete store[key]; save(); },
            key(index) { return Object.keys(store)[index] ?? null; },
            get length() { return Object.keys(store).length; }
          };
          Object.defineProperty(window,'localStorage',{value:storage,configurable:true});
        })();
        """
    }

    private func json(_ value: Any) -> String {
        guard let data = try? JSONSerialization.data(withJSONObject: value, options: [.sortedKeys]),
              let string = String(data: data, encoding: .utf8) else { return "{}" }
        return string
    }

    @MainActor final class Coordinator: NSObject, WKNavigationDelegate, WKUIDelegate, WKScriptMessageHandler {
        var parent: QuestWebView
        init(parent: QuestWebView) { self.parent = parent }

        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            guard message.frameInfo.isMainFrame, message.frameInfo.request.url?.isFileURL == true,
                  let body = message.body as? [String: Any], let action = body["action"] as? String else { return }
            switch action {
            case "storage":
                if let values = body["values"] as? [String: String] {
                    UserDefaults.standard.set(values.filter { $0.key.hasPrefix("tq.") }, forKey: QuestWebView.storageKey)
                }
            case "updates": parent.onUpdates()
            case "copy":
                if let text = body["text"] as? String { UIPasteboard.general.string = text }
            case "export":
                if let name = body["name"] as? String, let content = body["content"] as? String { parent.onExport(name, content) }
            default: break
            }
        }

        func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction) async -> WKNavigationActionPolicy {
            guard let url = navigationAction.request.url else { return .cancel }
            if url.isFileURL || url.absoluteString == "about:blank" { return .allow }
            if url.scheme == "https" || url.scheme == "http" { parent.onExternal(url) }
            return .cancel
        }
        func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration,
                     for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
            if let url = navigationAction.request.url, url.scheme == "https" || url.scheme == "http" {
                parent.onExternal(url)
            }
            return nil
        }
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            webView.evaluateJavaScript("window.TQSetTextScale?.(\(parent.textScale)); window.scrollTo(0, 0);", completionHandler: nil)
        }
        func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) { parent.onError(error.localizedDescription) }
        func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) { parent.onError(error.localizedDescription) }
        func webViewWebContentProcessDidTerminate(_ webView: WKWebView) { parent.onError("系统暂停了学习界面，重新载入即可继续上次关卡。") }
    }
}
