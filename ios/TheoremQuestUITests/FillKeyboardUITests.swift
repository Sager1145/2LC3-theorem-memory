import XCTest

@MainActor
final class FillKeyboardUITests: XCTestCase {
    private func start(_ mode: String) -> XCUIApplication {
        let app = XCUIApplication()
        app.launchArguments = ["-ui-testing-reset", "-ui-testing-offline", "-ui-testing-keyboard-mode", mode]
        app.launch()
        let start = app.buttons.matching(NSPredicate(format: "label BEGINSWITH %@", "开始 1 题挑战")).firstMatch
        XCTAssertTrue(start.waitForExistence(timeout: 30), app.debugDescription)
        start.tap()
        XCTAssertTrue(app.buttons["检查答案"].waitForExistence(timeout: 10), app.debugDescription)
        return app
    }

    private func tap(_ label: String, app: XCUIApplication) {
        let button = app.descendants(matching: .any).matching(NSPredicate(format: "label == %@", label)).firstMatch
        XCTAssertTrue(button.waitForExistence(timeout: 5), app.debugDescription)
        for _ in 0..<8 {
            let check = app.buttons["检查答案"]
            let coveredByFooter = label != "检查答案" && check.exists && button.frame.maxY >= check.frame.minY - 8
            if button.isHittable && !coveredByFooter && button.frame.minY >= 30 { break }
            let origin = app.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.5))
            let destination = app.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: button.frame.minY < 30 ? 0.7 : 0.25))
            origin.press(forDuration: 0.05, thenDragTo: destination)
        }
        XCTAssertTrue(button.isHittable, app.debugDescription)
        button.tap()
    }

    func testEmbeddedLetterKeyboardCompletesAndRestarts() {
        let app = start("blanks")
        XCTAssertFalse(app.buttons["检查答案"].isEnabled)
        XCTAssertFalse(app.keyboards.firstMatch.exists)
        tap("输入 q", app: app)
        tap("输入 q", app: app)
        XCTAssertTrue(app.buttons["检查答案"].isEnabled)
        XCTAssertFalse(app.keyboards.firstMatch.exists)
        tap("检查答案", app: app)
        XCTAssertTrue(app.staticTexts["答对了！"].waitForExistence(timeout: 5), app.debugDescription)
        XCTAssertFalse(app.buttons["输入 q"].isEnabled)
        tap("查看本关成果", app: app)
        XCTAssertTrue(app.staticTexts["100%"].waitForExistence(timeout: 5))
        tap("回到闯关", app: app)
        tap("开始 1 题挑战", app: app)
        XCTAssertTrue(app.buttons["检查答案"].waitForExistence(timeout: 5))
        XCTAssertFalse(app.buttons["检查答案"].isEnabled)
    }

    func testEmbeddedSymbolKeyboardCanChangeAndGradeSelection() {
        let app = start("cloze")
        XCTAssertFalse(app.buttons["检查答案"].isEnabled)
        app.swipeUp()
        let keys = app.descendants(matching: .any).matching(NSPredicate(format: "label BEGINSWITH %@", "填入 "))
        XCTAssertTrue(keys.firstMatch.waitForExistence(timeout: 5), app.debugDescription)
        guard let wrong = keys.allElementsBoundByIndex.first(where: { $0.label != "填入 ≡" }) else {
            XCTFail("缺少符号候选")
            return
        }
        tap(wrong.label, app: app)
        XCTAssertTrue(app.buttons["检查答案"].isEnabled)
        tap("填入 ≡", app: app)
        tap("检查答案", app: app)
        XCTAssertTrue(app.staticTexts["答对了！"].waitForExistence(timeout: 5), app.debugDescription)
        XCTAssertFalse(app.descendants(matching: .any).matching(NSPredicate(format: "label == %@", "填入 ≡")).firstMatch.isEnabled)
        XCTAssertFalse(app.keyboards.firstMatch.exists)
        tap("查看本关成果", app: app)
        XCTAssertTrue(app.staticTexts["100%"].waitForExistence(timeout: 5))
    }
}
