import XCTest

@MainActor
final class TheoremQuestUITests: XCTestCase {
    private func launch(reset: Bool = true, mode: String? = nil, failure: Bool = false) -> XCUIApplication {
        let app = XCUIApplication()
        app.launchArguments = ["-ui-testing-offline"]
        if reset { app.launchArguments += ["-ui-testing-reset"] }
        if let mode { app.launchArguments += ["-ui-testing-web-mode", mode] }
        if failure { app.launchArguments += ["-ui-testing-sync-failure"] }
        app.launch()
        XCTAssertTrue(app.buttons["配置练习"].waitForExistence(timeout: 30), app.debugDescription)
        return app
    }

    private func tap(_ label: String, in app: XCUIApplication) {
        let button = app.buttons[label].firstMatch
        XCTAssertTrue(button.waitForExistence(timeout: 10), app.debugDescription)
        // WebKit sometimes reports a fixed bottom tab's activation point in
        // document coordinates. Use its visible position on this iPhone UI.
        if ["闯关", "定理库", "专项复习", "证明引用", "错题本", "资料审计", "设置"].contains(label) {
            button.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.5)).tap()
            return
        }
        for _ in 0..<8 {
            let navigation = app.buttons["闯关"].firstMatch
            let frame = button.frame
            let coveredByNavigation = navigation.exists && navigation.isHittable && app.frame.intersects(navigation.frame) && frame.maxY >= navigation.frame.minY - 8
            if button.isHittable && !coveredByNavigation && frame.minY >= app.frame.minY + 24 { break }
            let origin = app.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.5))
            let destination = app.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: frame.minY < app.frame.minY + 24 ? 0.7 : 0.3))
            origin.press(forDuration: 0.05, thenDragTo: destination)
        }
        XCTAssertTrue(button.isHittable, app.debugDescription)
        let frame = button.frame
        app.coordinate(withNormalizedOffset: .zero)
            .withOffset(CGVector(dx: frame.midX - app.frame.minX, dy: frame.midY - app.frame.minY)).tap()
    }

    func testAllDestinationsAndOfflineHome() {
        let app = launch()
        for label in ["定理库", "错题本", "资料审计", "设置", "闯关"] { tap(label, in: app) }
        XCTAssertTrue(app.buttons["配置练习"].exists)
        let attachment = XCTAttachment(screenshot: app.screenshot())
        attachment.name = "Complete offline game home"
        attachment.lifetime = .keepAlways
        add(attachment)
    }

    func testDocumentImportantFocusStartsOfflinePractice() {
        let app = launch(mode: "choice")
        tap("专项复习", in: app)
        XCTAssertTrue(app.staticTexts["Important"].firstMatch.waitForExistence(timeout: 10), app.debugDescription)
        XCTAssertTrue(app.staticTexts["多次出现"].firstMatch.exists, app.debugDescription)
        XCTAssertTrue(app.staticTexts["重点与高频"].firstMatch.exists, app.debugDescription)
        let list = app.switches["查看列表"].firstMatch
        XCTAssertTrue(list.waitForExistence(timeout: 10), app.debugDescription)
        list.tap()
        let focusAttachment = XCTAttachment(screenshot: app.screenshot())
        focusAttachment.name = "Offline Important focus list"
        focusAttachment.lifetime = .keepAlways
        add(focusAttachment)
        let start = app.buttons["复习当前列表"].firstMatch
        XCTAssertTrue(start.waitForExistence(timeout: 10), app.debugDescription)
        start.tap()
        XCTAssertTrue(app.buttons["检查答案"].waitForExistence(timeout: 10), app.debugDescription)
        XCTAssertTrue(app.staticTexts["Important · 专项复习"].exists, app.debugDescription)
        XCTAssertTrue(app.staticTexts["★ IMPORTANT"].exists, app.debugDescription)
        let attachment = XCTAttachment(screenshot: app.screenshot())
        attachment.name = "Offline Important focused practice"
        attachment.lifetime = .keepAlways
        add(attachment)
    }

    func testNotebookHintUsedAndRepeatedListsStartOfflinePractice() {
        let app = launch(mode: "choice")
        let navigation = app.buttons["证明引用"].firstMatch
        XCTAssertTrue(navigation.waitForExistence(timeout: 10), app.debugDescription)
        navigation.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.5)).tap()
        XCTAssertTrue(app.staticTexts["证明 Hint 定理"].waitForExistence(timeout: 10), app.debugDescription)
        XCTAssertTrue(app.buttons["Notebook 正文"].exists, app.debugDescription)
        let usedCount = app.staticTexts.matching(NSPredicate(format: "label MATCHES %@", "Hint 中用到的定理 · [1-9][0-9]* 条")).firstMatch
        XCTAssertTrue(usedCount.waitForExistence(timeout: 10), app.debugDescription)
        let repeated = app.buttons["重复 Hint 定理"].firstMatch
        XCTAssertTrue(repeated.waitForExistence(timeout: 10), app.debugDescription)
        repeated.tap()
        let repeatedCount = app.staticTexts.matching(NSPredicate(format: "label MATCHES %@", "Hint 多次出现的定理 · [1-9][0-9]* 条")).firstMatch
        XCTAssertTrue(repeatedCount.waitForExistence(timeout: 10), app.debugDescription)
        let listAttachment = XCTAttachment(screenshot: app.screenshot())
        listAttachment.name = "Offline repeated Notebook Hint list"
        listAttachment.lifetime = .keepAlways
        add(listAttachment)
        let start = app.buttons["复习 Hint 定理"].firstMatch
        XCTAssertTrue(start.waitForExistence(timeout: 10), app.debugDescription)
        XCTAssertTrue(start.isEnabled, app.debugDescription)
        tap("复习 Hint 定理", in: app)
        XCTAssertTrue(app.buttons["检查答案"].waitForExistence(timeout: 10), app.debugDescription)
        XCTAssertTrue(app.staticTexts["重复 Hint 定理 · 专项复习"].exists, app.debugDescription)
        let practiceAttachment = XCTAttachment(screenshot: app.screenshot())
        practiceAttachment.name = "Offline repeated Notebook Hint practice"
        practiceAttachment.lifetime = .keepAlways
        add(practiceAttachment)
    }

    func testSevenPracticeModesAreEmbedded() {
        let app = launch()
        tap("闯关", in: app)
        tap("配置练习", in: app)
        for label in ["名称回忆", "名称选择", "字母填空", "符号填空", "公式拼写", "反斜线符号", "Proof 定理填空"] {
            XCTAssertTrue(app.switches.matching(NSPredicate(format: "label CONTAINS %@", label)).firstMatch.exists, app.debugDescription)
        }
    }

    func testEachModeCanStartOffline() {
        for mode in ["name", "choice", "blanks", "cloze", "formula", "symbol", "proof"] {
            let app = launch(mode: mode)
            tap("开始 1 题挑战", in: app)
            XCTAssertTrue(app.buttons["检查答案"].waitForExistence(timeout: 10), "Missing mode \(mode): \(app.debugDescription)")
            let attachment = XCTAttachment(screenshot: app.screenshot())
            attachment.name = "Practice \(mode)"
            attachment.lifetime = .keepAlways
            add(attachment)
            app.terminate()
        }
    }

    func testSessionSurvivesRelaunch() {
        let app = launch(mode: "choice")
        tap("开始 1 题挑战", in: app)
        XCTAssertTrue(app.buttons["检查答案"].waitForExistence(timeout: 10))
        app.terminate()
        app.launchArguments = ["-ui-testing-offline"]
        app.launch()
        XCTAssertTrue(app.buttons["继续上次关卡"].waitForExistence(timeout: 30))
        tap("继续上次关卡", in: app)
        XCTAssertTrue(app.buttons["检查答案"].waitForExistence(timeout: 10))
    }

    func testNativeExportAndImportEntrances() {
        let app = launch()
        tap("设置", in: app)
        tap("导出学习备份", in: app)
        XCTAssertTrue(app.buttons["Close"].waitForExistence(timeout: 10) || app.buttons["关闭"].exists || app.navigationBars.count > 0, app.debugDescription)
        let attachment = XCTAttachment(screenshot: app.screenshot())
        attachment.name = "Native JSON share"
        attachment.lifetime = .keepAlways
        add(attachment)
    }

    func testUpdateFailureKeepsOfflineLibrary() {
        let app = launch(failure: true)
        tap("设置", in: app)
        tap("管理题库更新", in: app)
        tap("立即检查更新", in: app)
        XCTAssertTrue(app.staticTexts.matching(NSPredicate(format: "label CONTAINS %@", "更新失败")).firstMatch.waitForExistence(timeout: 10))
        tap("完成", in: app)
        XCTAssertTrue(app.buttons["管理题库更新"].waitForExistence(timeout: 30))
    }
}
