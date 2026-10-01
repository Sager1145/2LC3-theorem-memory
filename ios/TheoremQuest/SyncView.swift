import SwiftUI

struct SyncView: View {
    let library: LibraryStore
    var language = "zh-CN"
    private func copy(_ chinese: String, _ english: String) -> String { language == "en" ? english : chinese }

    private var localizedStatus: String {
        let message = library.statusMessage
        guard language == "en" else { return message }
        if message == "题库已是最新版本。" { return "Your bank is up to date." }
        if message.hasPrefix("题库已更新，共 ") { return "Bank updated: \(library.theorems.count) cards (GitHub Pages)." }
        return message.replacingOccurrences(of: "更新失败，继续使用本地题库：", with: "Update failed; using the local bank: ")
            .replacingOccurrences(of: "学习进度保存失败：", with: "Unable to save study progress: ")
            .replacingOccurrences(of: "学习记录无法读取；原文件已保留以便恢复。", with: "Unable to read study records; the original file was kept for recovery.")
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                HStack(spacing: 14) {
                    QuestMark(size: 48)
                    VStack(alignment: .leading, spacing: 4) {
                        Text(copy("题库更新", "Bank updates"))
                            .font(QuestFont.text(.title2, bold: true))
                        Text(copy("随时获取最新课程定理", "Get the latest course theorems"))
                            .font(QuestFont.text(.subheadline))
                            .foregroundStyle(QuestStyle.secondary)
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(18)
                .questCard(tint: QuestStyle.green.opacity(0.4), fill: QuestStyle.hero)

                VStack(alignment: .leading, spacing: 14) {
                    Text(copy("题库", "Theorem bank"))
                        .font(QuestFont.text(.headline))
                LabeledContent(copy("本地条目", "Local cards"), value: "\(library.theorems.count)")
                LabeledContent(copy("版本", "Version"), value: library.manifest.map { String($0.revision.prefix(12)) } ?? copy("App 内置版本", "Bundled version"))
                if let manifest = library.manifest {
                    LabeledContent(copy("版本时间", "Published"), value: manifest.builtAt)
                }
                if let date = library.lastCheckedAt {
                    LabeledContent(copy("上次检查", "Last checked"), value: date.formatted(date: .abbreviated, time: .shortened))
                }
                }
                .padding(20)
                .questCard()

                VStack(alignment: .leading, spacing: 12) {
                Button {
                    Task { await library.checkForUpdates(force: true) }
                } label: {
                    HStack {
                        Label(copy("立即检查更新", "Check for updates"), systemImage: "arrow.clockwise")
                        if library.isChecking { Spacer(); ProgressView() }
                    }
                    .frame(maxWidth: .infinity)
                }
                .buttonStyle(QuestActionStyle())
                .controlSize(.large)
                .disabled(library.isChecking)
                .accessibilityIdentifier("sync.checkUpdates")
                if !library.statusMessage.isEmpty {
                    Text(localizedStatus).font(QuestFont.text(.footnote)).foregroundStyle(QuestStyle.secondary)
                }
                Text(copy("从 GitHub Pages 网站下载最新题库，更新后保留收藏、错题与学习记录。打开 App 时至多每天检查一次；离线时继续使用本地题库。", "Download the latest bank from GitHub Pages while keeping favorites, mistakes and study records. The app checks at most once daily on launch and uses the local bank offline."))
                    .font(QuestFont.text(.footnote))
                    .foregroundStyle(QuestStyle.secondary)
                }
                .padding(20)
                .questCard()

                VStack(alignment: .leading, spacing: 12) {
                    Text(copy("数据来源", "Sources"))
                        .font(QuestFont.text(.headline))
                Link(destination: LibraryStore.siteURL) {
                    Label(copy("打开 GitHub Pages 网站", "Open GitHub Pages"), systemImage: "safari")
                }
                Text(copy("题卡来自课程 notebook 的预载定理列表，保留来源信息。学习记录仅保存在此设备。", "Cards retain their course notebook sources. Study records stay on this device."))
                    .font(QuestFont.text(.footnote))
                    .foregroundStyle(QuestStyle.secondary)
                }
                .padding(20)
                .questCard()
            }
            .padding(16)
            .frame(maxWidth: 680)
            .frame(maxWidth: .infinity)
        }
        .background(QuestStyle.page)
        .navigationTitle(copy("更新与说明", "Updates & details"))
    }
}
