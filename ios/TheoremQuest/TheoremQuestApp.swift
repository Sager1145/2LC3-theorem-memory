import BackgroundTasks
import SwiftUI

// Shared with the web experience: warm paper, teal actions, and slate text.
// Dynamic variants keep dark mode readable without using a pure black surface.
enum QuestStyle {
    static func adaptive(_ light: UInt32, _ dark: UInt32) -> Color {
        Color(uiColor: adaptiveUIColor(light, dark))
    }

    static func adaptiveUIColor(_ light: UInt32, _ dark: UInt32) -> UIColor {
        UIColor { traits in
            let hex = traits.userInterfaceStyle == .dark ? dark : light
            return UIColor(red: CGFloat((hex >> 16) & 0xff) / 255,
                           green: CGFloat((hex >> 8) & 0xff) / 255,
                           blue: CGFloat(hex & 0xff) / 255, alpha: 1)
        }
    }

    static let green = adaptive(0x237C70, 0x67C8B5)
    static let darkGreen = adaptive(0x1E6B60, 0x80D8C5)
    static let blue = adaptive(0x346E98, 0x92BEE1)
    static let gold = adaptive(0x94621B, 0xE6BC70)
    static let red = adaptive(0xB54853, 0xF29A9E)
    static let ink = adaptive(0x283C47, 0xE1EAF1)
    static let secondary = adaptive(0x5D6D76, 0xACBBC8)
    static let line = adaptive(0xD9E2DD, 0x394C5C)
    static let page = adaptive(0xF7F6F0, 0x192B3A)
    static let paper = adaptive(0xFFFFFF, 0x243949)
    static let hero = adaptive(0xE5F3EC, 0x24483F)
    static let button = adaptive(0x237C70, 0x286E64)
    static let buttonEdge = adaptive(0x195B52, 0x1A4A43)
}

enum QuestFont {
    static func text(_ style: Font.TextStyle = .body, bold: Bool = false) -> Font {
        .system(style, design: .rounded, weight: bold ? .bold : .regular)
    }

    static func theorem(_ style: Font.TextStyle = .body) -> Font {
        .system(style, design: .monospaced)
    }

    @MainActor static func configureSystemChrome() {
        let ink = QuestStyle.adaptiveUIColor(0x283C47, 0xE1EAF1)
        let secondary = QuestStyle.adaptiveUIColor(0x5D6D76, 0xACBBC8)
        let paper = QuestStyle.adaptiveUIColor(0xF7F6F0, 0x192B3A)
        let title = UIFont.systemFont(ofSize: 17, weight: .bold)
        let largeTitle = UIFont.systemFont(ofSize: 34, weight: .bold)
        let navigation = UINavigationBarAppearance()
        navigation.configureWithOpaqueBackground()
        navigation.backgroundColor = paper
        navigation.shadowColor = .clear
        navigation.titleTextAttributes = [.font: UIFontMetrics(forTextStyle: .headline).scaledFont(for: title), .foregroundColor: ink]
        navigation.largeTitleTextAttributes = [.font: UIFontMetrics(forTextStyle: .largeTitle).scaledFont(for: largeTitle), .foregroundColor: ink]
        UINavigationBar.appearance().standardAppearance = navigation
        UINavigationBar.appearance().scrollEdgeAppearance = navigation
        UINavigationBar.appearance().compactAppearance = navigation

        let tabs = UITabBarAppearance()
        tabs.configureWithOpaqueBackground()
        tabs.backgroundColor = paper
        tabs.stackedLayoutAppearance.normal.iconColor = secondary
        tabs.stackedLayoutAppearance.normal.titleTextAttributes = [.foregroundColor: secondary]
        UITabBar.appearance().standardAppearance = tabs
        UITabBar.appearance().scrollEdgeAppearance = tabs
    }
}

// A tactile action shares the raised-button language of the web app.
struct QuestActionStyle: ButtonStyle {
    @Environment(\.isEnabled) private var isEnabled
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(QuestFont.text(.body, bold: true))
            .foregroundStyle(.white)
            .frame(maxWidth: .infinity, minHeight: 48)
            .padding(.horizontal, 16)
            .background(QuestStyle.button, in: RoundedRectangle(cornerRadius: 16))
            .overlay {
                RoundedRectangle(cornerRadius: 16)
                    .strokeBorder(QuestStyle.buttonEdge, lineWidth: 1)
            }
            .shadow(color: QuestStyle.buttonEdge, radius: 0, y: configuration.isPressed ? 0 : 4)
            .offset(y: configuration.isPressed ? 3 : 0)
            .opacity(isEnabled ? 1 : 0.45)
            .animation(reduceMotion ? nil : .easeOut(duration: 0.12), value: configuration.isPressed)
    }
}

struct QuestCard: ViewModifier {
    var tint: Color = QuestStyle.line
    var fill: Color = QuestStyle.paper

    func body(content: Content) -> some View {
        content
            .background(fill, in: RoundedRectangle(cornerRadius: 22))
            .overlay {
                RoundedRectangle(cornerRadius: 22)
                    .strokeBorder(tint.opacity(0.85), lineWidth: 1.5)
            }
            .shadow(color: tint.opacity(0.35), radius: 0, y: 3)
    }
}

extension View {
    func questCard(tint: Color = QuestStyle.line, fill: Color = QuestStyle.paper) -> some View {
        modifier(QuestCard(tint: tint, fill: fill))
    }
}

struct QuestMark: View {
    var size: CGFloat = 46

    var body: some View {
        Text("∴")
            .font(.custom("TimesNewRomanPS-BoldMT", fixedSize: size * 0.76))
            .foregroundStyle(.white)
            .frame(width: size, height: size)
            .background(QuestStyle.button, in: RoundedRectangle(cornerRadius: size * 0.29))
            .overlay {
                RoundedRectangle(cornerRadius: size * 0.29).strokeBorder(QuestStyle.buttonEdge, lineWidth: 1.5)
            }
            .shadow(color: QuestStyle.buttonEdge, radius: 0, y: 4)
            .rotationEffect(.degrees(-6))
            .accessibilityHidden(true)
    }
}

@main
struct TheoremQuestApp: App {
    static let refreshID = "io.github.sager1145.TheoremQuest.refresh"
    @State private var library: LibraryStore

    init() {
        QuestFont.configureSystemChrome()
        #if DEBUG
        if ProcessInfo.processInfo.arguments.contains("-ui-testing-sync-failure") {
            _library = State(initialValue: LibraryStore(fetchData: { request in
                let response = HTTPURLResponse(url: request.url!, statusCode: 503, httpVersion: nil, headerFields: nil)!
                return (Data(), response)
            }))
            return
        }
        #endif
        _library = State(initialValue: LibraryStore())
    }

    var body: some Scene {
        WindowGroup {
            RootView(library: library)
                .task {
                    #if DEBUG
                    if ProcessInfo.processInfo.arguments.contains("-ui-testing-reset") {
                        let directory = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0]
                            .appendingPathComponent("TheoremQuest", isDirectory: true)
                        try? FileManager.default.removeItem(at: directory)
                        UserDefaults.standard.removeObject(forKey: "library.lastSuccessfulCheck")
                        UserDefaults.standard.removeObject(forKey: "quest.web.storage.v1")
                    }
                    #endif
                    await library.load()
                    if !ProcessInfo.processInfo.arguments.contains("-ui-testing-offline") {
                        await library.checkForUpdates()
                    }
                    scheduleRefresh()
                }
        }
        .backgroundTask(.appRefresh(Self.refreshID)) {
            await library.checkForUpdates(force: true)
            await MainActor.run { scheduleRefresh() }
        }
    }

    private func scheduleRefresh() {
        let request = BGAppRefreshTaskRequest(identifier: Self.refreshID)
        request.earliestBeginDate = Date(timeIntervalSinceNow: 24 * 60 * 60)
        try? BGTaskScheduler.shared.submit(request)
    }
}

private struct RootView: View {
    let library: LibraryStore

    var body: some View {
        CompleteQuestView(library: library)
        .preferredColorScheme(.light)
        .tint(QuestStyle.green)
        .font(QuestFont.text())
        .foregroundStyle(QuestStyle.ink)
        .background(QuestStyle.page)
    }
}
