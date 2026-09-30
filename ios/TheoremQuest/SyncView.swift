import SwiftUI

struct SyncView: View {
    let library: LibraryStore

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                HStack(spacing: 14) {
                    QuestMark(size: 48)
                    VStack(alignment: .leading, spacing: 4) {
                        Text("题库更新")
                            .font(QuestFont.text(.title2, bold: true))
                        Text("随时获取最新课程定理")
                            .font(QuestFont.text(.subheadline))
                            .foregroundStyle(QuestStyle.secondary)
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(18)
                .questCard(tint: QuestStyle.green.opacity(0.4), fill: QuestStyle.hero)

                VStack(alignment: .leading, spacing: 14) {
                    Text("题库")
                        .font(QuestFont.text(.headline))
                LabeledContent("本地条目", value: "\(library.theorems.count)")
                LabeledContent("版本", value: library.manifest.map { String($0.revision.prefix(12)) } ?? "App 内置版本")
                if let manifest = library.manifest {
                    LabeledContent("版本时间", value: manifest.builtAt)
                }
                if let date = library.lastCheckedAt {
                    LabeledContent("上次检查", value: date.formatted(date: .abbreviated, time: .shortened))
                }
                }
                .padding(20)
                .questCard()

                VStack(alignment: .leading, spacing: 12) {
                Button {
                    Task { await library.checkForUpdates(force: true) }
                } label: {
                    HStack {
                        Label("立即检查更新", systemImage: "arrow.clockwise")
                        if library.isChecking { Spacer(); ProgressView() }
                    }
                    .frame(maxWidth: .infinity)
                }
                .buttonStyle(QuestActionStyle())
                .controlSize(.large)
                .disabled(library.isChecking)
                .accessibilityIdentifier("sync.checkUpdates")
                if !library.statusMessage.isEmpty {
                    Text(library.statusMessage).font(QuestFont.text(.footnote)).foregroundStyle(QuestStyle.secondary)
                }
                Text("从 GitHub Pages 网站下载最新题库，更新后保留收藏、错题与学习记录。打开 App 时至多每天检查一次；离线时继续使用本地题库。")
                    .font(QuestFont.text(.footnote))
                    .foregroundStyle(QuestStyle.secondary)
                }
                .padding(20)
                .questCard()

                VStack(alignment: .leading, spacing: 12) {
                    Text("数据来源")
                        .font(QuestFont.text(.headline))
                Link(destination: LibraryStore.siteURL) {
                    Label("打开 GitHub Pages 网站", systemImage: "safari")
                }
                Text("题卡来自课程 notebook 的预载定理列表，保留来源信息。学习记录仅保存在此设备。")
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
        .navigationTitle("更新与说明")
    }
}
