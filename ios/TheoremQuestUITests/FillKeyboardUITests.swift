import XCTest

@MainActor
final class FillKeyboardUITests: XCTestCase {
    private let keyboardControls = ["Shift", "Backspace", "Tab", "Space", "Return", "Cursor left", "Cursor right", "Done"]

    private func start(_ mode: String, card: String? = nil, difficulty: Int = 2, fullKeyboard: Bool = true) -> XCUIApplication {
        let app = XCUIApplication()
        app.launchArguments = ["-ui-testing-reset", "-ui-testing-offline", "-ui-testing-keyboard-mode", mode]
        app.launchArguments += ["-ui-testing-keyboard-difficulty", String(difficulty)]
        if fullKeyboard { app.launchArguments += ["-ui-testing-full-keyboard"] }
        if let card { app.launchArguments += ["-ui-testing-keyboard-card", card] }
        app.launch()
        let start = app.buttons.matching(NSPredicate(format: "label BEGINSWITH %@", "开始 1 题挑战")).firstMatch
        XCTAssertTrue(start.waitForExistence(timeout: 30), app.debugDescription)
        tap(start.label, app: app)
        XCTAssertTrue(app.buttons["退出并保存本关"].waitForExistence(timeout: 10), app.debugDescription)
        assertNoSystemKeyboard(app)
        return app
    }

    private func assertNoSystemKeyboard(_ app: XCUIApplication, file: StaticString = #filePath, line: UInt = #line) {
        XCTAssertEqual(app.keyboards.count, 0, "Only the app's QWERTY keyboard should be present.\n\(app.debugDescription)", file: file, line: line)
    }

    private func key(_ label: String, app: XCUIApplication) -> XCUIElement {
        // WebKit exposes the aria-pressed Shift key as a switch. Restrict
        // character keys to buttons so theorem text cannot match a hidden key.
        let predicate = NSPredicate(format: "label == %@", label)
        if label == "Shift" { return app.switches.matching(predicate).firstMatch }
        return app.buttons.matching(predicate).firstMatch
    }

    private func tapKey(_ label: String, app: XCUIApplication) {
        let button = key(label, app: app)
        XCTAssertTrue(button.waitForExistence(timeout: 5), app.debugDescription)
        let frame = button.frame
        XCTAssertGreaterThan(frame.width, 0, app.debugDescription)
        XCTAssertGreaterThan(frame.height, 0, app.debugDescription)
        XCTAssertGreaterThanOrEqual(frame.minX, app.frame.minX - 1, app.debugDescription)
        XCTAssertLessThanOrEqual(frame.maxX, app.frame.maxX + 1, app.debugDescription)
        XCTAssertGreaterThanOrEqual(frame.minY, app.frame.minY, app.debugDescription)
        XCTAssertLessThanOrEqual(frame.maxY, app.frame.maxY + 1, app.debugDescription)
        tapObservedFrame(button, app: app)
        assertNoSystemKeyboard(app)
    }

    private func tapObservedFrame(_ element: XCUIElement, app: XCUIApplication) {
        let frame = element.frame
        let point = CGPoint(x: frame.midX, y: frame.midY)
        XCTAssertGreaterThan(frame.width, 0, app.debugDescription)
        XCTAssertGreaterThan(frame.height, 0, app.debugDescription)
        XCTAssertTrue(app.frame.contains(point), app.debugDescription)
        // Visible WebKit controls can report isHittable == false and a {-1,-1}
        // hit point. The observed screen frame avoids XCUI's automatic scroll.
        app.coordinate(withNormalizedOffset: .zero)
            .withOffset(CGVector(dx: point.x - app.frame.minX, dy: point.y - app.frame.minY)).tap()
    }

    private func quizFooterTop(_ app: XCUIApplication) -> CGFloat {
        guard app.buttons["检查答案"].exists else { return app.frame.maxY }
        // Large text wraps the footer into two rows. Skip/Hint can cover a
        // keyboard key above Check, so use the top of the entire control area.
        return ["检查答案", "暂时不会", "提示"].compactMap { label -> CGFloat? in
            let control = app.buttons[label]
            return control.exists ? control.frame.minY : nil
        }.min() ?? app.frame.maxY
    }

    private func scrollAndTap(_ element: XCUIElement, app: XCUIApplication, avoidCheckFooter: Bool = true) {
        XCTAssertTrue(element.waitForExistence(timeout: 5), app.debugDescription)
        for _ in 0..<8 {
            let frame = element.frame
            let check = app.buttons["检查答案"]
            let footerTop = quizFooterTop(app)
            let coveredByFooter = avoidCheckFooter && footerTop < app.frame.maxY && frame.midY >= footerTop - 4
            let centerVisible = frame.midY >= app.frame.minY + 30 && frame.midY <= app.frame.maxY - 20
            if centerVisible && !coveredByFooter { break }
            let origin = app.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.5))
            let destination = app.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: frame.midY < app.frame.minY + 30 ? 0.7 : 0.25))
            origin.press(forDuration: 0.05, thenDragTo: destination)
        }
        let frame = element.frame
        XCTAssertGreaterThanOrEqual(frame.midY, app.frame.minY + 30, app.debugDescription)
        XCTAssertLessThanOrEqual(frame.midY, app.frame.maxY - 20, app.debugDescription)
        let check = app.buttons["检查答案"]
        if avoidCheckFooter && check.exists && check.frame.minY < app.frame.maxY {
            XCTAssertLessThan(frame.midY, quizFooterTop(app) - 4, app.debugDescription)
        }
        tapObservedFrame(element, app: app)
        assertNoSystemKeyboard(app)
    }

    private func tap(_ label: String, app: XCUIApplication) {
        let button = app.descendants(matching: .any).matching(NSPredicate(format: "label == %@", label)).firstMatch
        scrollAndTap(button, app: app, avoidCheckFooter: label != "检查答案")
    }

    private func focusAnswer(_ field: XCUIElement, app: XCUIApplication) {
        XCTAssertTrue(field.waitForExistence(timeout: 5), app.debugDescription)
        // Quiz entry may already select a field; tapping it again can trigger
        // WebKit's scroll-to-visible while the fixed keyboard is opening.
        if !key("Done", app: app).waitForExistence(timeout: 3) {
            scrollAndTap(field, app: app)
        }
        XCTAssertTrue(key("Done", app: app).waitForExistence(timeout: 5), app.debugDescription)
        assertNoSystemKeyboard(app)
        let checkHidden = XCTNSPredicateExpectation(predicate: NSPredicate(format: "exists == false"), object: app.buttons["检查答案"])
        XCTAssertEqual(XCTWaiter.wait(for: [checkHidden], timeout: 5), .completed, app.debugDescription)
        XCTAssertFalse(app.buttons["暂时不会"].exists, app.debugDescription)
        for label in keyboardControls {
            XCTAssertTrue(key(label, app: app).exists, "Missing keyboard control: \(label)\n\(app.debugDescription)")
        }
    }

    private func typeOnKeyboard(_ text: String, app: XCUIApplication) {
        // Shift persists until toggled off, just like the desktop web keyboard.
        var shifted = false
        for character in text {
            let label = String(character)
            let uppercase = label != label.lowercased()
            if uppercase != shifted {
                tapKey("Shift", app: app)
                shifted = uppercase
            }
            tapKey(label == " " ? "Space" : label, app: app)
        }
        if shifted { tapKey("Shift", app: app) }
    }

    private func finishCorrectAnswer(_ app: XCUIApplication) {
        tapKey("Done", app: app)
        XCTAssertFalse(key("q", app: app).exists, app.debugDescription)
        tap("检查答案", app: app)
        XCTAssertTrue(app.staticTexts["答对了！"].waitForExistence(timeout: 5), app.debugDescription)
        tap("查看本关成果", app: app)
        XCTAssertTrue(app.staticTexts["100%"].waitForExistence(timeout: 5), app.debugDescription)
        assertNoSystemKeyboard(app)
    }

    private func readFieldValue(_ field: XCUIElement, app: XCUIApplication) -> String? {
        // A slot update keeps the question's scroll position. WebKit omits
        // offscreen fields from its accessibility snapshot, so reveal before reading.
        for _ in 0..<5 {
            if field.exists { break }
            let origin = app.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.45))
            let destination = app.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.8))
            origin.press(forDuration: 0.05, thenDragTo: destination)
        }
        XCTAssertTrue(field.waitForExistence(timeout: 5), app.debugDescription)
        return field.value as? String
    }

    private func assertEmptyField(_ field: XCUIElement, app: XCUIApplication) {
        guard let value = readFieldValue(field, app: app) else {
            XCTFail("Expected an accessible text field value.\n\(app.debugDescription)")
            return
        }
        // WebKit exposes the placeholder as the value of an empty input.
        XCTAssertTrue(value.isEmpty || value == field.placeholderValue, app.debugDescription)
    }

    private func assertButtonFillOnly(_ app: XCUIApplication) {
        assertNoSystemKeyboard(app)
        XCTAssertFalse(key("Done", app: app).exists, app.debugDescription)
        XCTAssertFalse(key("Shift", app: app).exists, app.debugDescription)
    }

    private func tapFillButton(_ label: String, app: XCUIApplication) {
        let button = app.descendants(matching: .any).matching(NSPredicate(format: "label == %@", label)).firstMatch
        XCTAssertTrue(button.waitForExistence(timeout: 5), app.debugDescription)
        XCTAssertGreaterThanOrEqual(button.frame.width, 48, app.debugDescription)
        XCTAssertGreaterThanOrEqual(button.frame.height, 48, app.debugDescription)
        tap(label, app: app)
        assertButtonFillOnly(app)
    }

    private func finishButtonFillAnswer(_ app: XCUIApplication) {
        XCTAssertTrue(app.buttons["检查答案"].isEnabled, app.debugDescription)
        tap("检查答案", app: app)
        XCTAssertTrue(app.staticTexts["答对了！"].waitForExistence(timeout: 5), app.debugDescription)
        assertButtonFillOnly(app)
        tap("查看本关成果", app: app)
        XCTAssertTrue(app.staticTexts["100%"].waitForExistence(timeout: 5), app.debugDescription)
        assertButtonFillOnly(app)
    }

    func testDefaultLetterButtonsAdvanceMoveDeleteAndGradeWithoutKeyboard() {
        let app = start("blanks", difficulty: 3, fullKeyboard: false)
        let first = app.textFields["第 1 个字母空"].firstMatch
        let second = app.textFields["第 2 个字母空"].firstMatch
        assertButtonFillOnly(app)
        scrollAndTap(first, app: app)
        assertButtonFillOnly(app)
        tapFillButton("输入 q", app: app)
        XCTAssertEqual(first.value as? String, "q", app.debugDescription)
        tapFillButton("光标左移", app: app)
        tapFillButton("光标右移", app: app)
        tapFillButton("输入 q", app: app)
        XCTAssertEqual(second.value as? String, "q", app.debugDescription)
        tapFillButton("退格", app: app)
        XCTAssertEqual(first.value as? String, "q", app.debugDescription)
        assertEmptyField(second, app: app)
        XCTAssertFalse(app.buttons["检查答案"].isEnabled, app.debugDescription)
        tapFillButton("输入 q", app: app)
        XCTAssertEqual(second.value as? String, "q", app.debugDescription)
        finishButtonFillAnswer(app)
    }

    func testDefaultSymbolButtonsAdvanceMoveDeleteAndGradeWithoutKeyboard() {
        let app = start("cloze", card: "t-fc730471e696", difficulty: 3, fullKeyboard: false)
        let field = app.textFields["当前符号空"].firstMatch
        assertButtonFillOnly(app)
        scrollAndTap(field, app: app)
        assertButtonFillOnly(app)
        tapFillButton("填入 ∧", app: app)
        // The first symbol key advances to the empty second slot.
        assertEmptyField(field, app: app)
        tapFillButton("上一空", app: app)
        XCTAssertEqual(readFieldValue(field, app: app), "∧", app.debugDescription)
        tapFillButton("下一空", app: app)
        tapFillButton("填入 ∧", app: app)
        XCTAssertEqual(readFieldValue(field, app: app), "∧", app.debugDescription)
        tapFillButton("删除当前符号", app: app)
        assertEmptyField(field, app: app)
        XCTAssertFalse(app.buttons["检查答案"].isEnabled, app.debugDescription)
        tapFillButton("填入 ∧", app: app)
        XCTAssertEqual(readFieldValue(field, app: app), "∧", app.debugDescription)
        finishButtonFillAnswer(app)
    }

    func testNameCompletionWithTouchTabGradesCorrectly() {
        let app = start("name")
        let field = app.textFields.firstMatch
        focusAnswer(field, app: app)
        typeOnKeyboard("Ref", app: app)
        tapKey("Tab", app: app)
        XCTAssertEqual(field.value as? String, "Reflexivity of ≡", app.debugDescription)
        finishCorrectAnswer(app)
    }

    func testNameCandidateTapKeepsKeyboardAndFillsOnlyName() {
        let app = start("name")
        let field = app.textFields.firstMatch
        focusAnswer(field, app: app)
        typeOnKeyboard("Ref", app: app)
        tap("Reflexivity of ≡", app: app)
        XCTAssertEqual(field.value as? String, "Reflexivity of ≡", app.debugDescription)
        XCTAssertTrue(key("Done", app: app).exists, app.debugDescription)
        finishCorrectAnswer(app)
    }

    func testFormulaCompletionWithTouchTabGradesCorrectly() {
        let app = start("formula")
        let field = app.textViews.firstMatch
        focusAnswer(field, app: app)
        typeOnKeyboard("p \\equ", app: app)
        tapKey("Tab", app: app)
        typeOnKeyboard(" p", app: app)
        XCTAssertEqual(field.value as? String, "p ≡ p", app.debugDescription)
        finishCorrectAnswer(app)
    }

    func testFormulaCandidateTapCompletesBackslashSymbol() {
        let app = start("formula")
        let field = app.textViews.firstMatch
        focusAnswer(field, app: app)
        typeOnKeyboard("p \\equ", app: app)
        // Candidate labels preserve the completion list's original contract.
        let candidate = app.descendants(matching: .any)
            .matching(NSPredicate(format: "label CONTAINS %@ AND label CONTAINS %@", "\\equiv", "≡")).firstMatch
        XCTAssertTrue(candidate.waitForExistence(timeout: 5), app.debugDescription)
        tap(candidate.label, app: app)
        typeOnKeyboard(" p", app: app)
        XCTAssertEqual(field.value as? String, "p ≡ p", app.debugDescription)
        XCTAssertTrue(key("Done", app: app).exists, app.debugDescription)
        finishCorrectAnswer(app)
    }

    func testSymbolCompletionKeepsBackslashCodeAndGradesCorrectly() {
        let app = start("symbol")
        let field = app.textFields.firstMatch
        focusAnswer(field, app: app)
        typeOnKeyboard("\\equ", app: app)
        tapKey("Tab", app: app)
        XCTAssertEqual(field.value as? String, "\\equiv", app.debugDescription)
        finishCorrectAnswer(app)
    }

    func testProofNameCompletionWithTouchTabGradesCorrectly() {
        let app = start("proof")
        let field = app.textFields.firstMatch
        focusAnswer(field, app: app)
        typeOnKeyboard("Definition of \\nequ", app: app)
        tapKey("Tab", app: app)
        tapKey("Tab", app: app)
        XCTAssertEqual(field.value as? String, "Definition of ≢", app.debugDescription)
        finishCorrectAnswer(app)
    }

    func testSymbolFillUsesQWERTYAndBackslashCompletion() {
        let app = start("cloze", card: "t-fc730471e696", difficulty: 3)
        let field = app.textFields["当前符号空"].firstMatch
        focusAnswer(field, app: app)
        for (index, item) in [("lan", "∧"), ("lan", "∧")].enumerated() {
            let (prefix, symbol) = item
            typeOnKeyboard("\\" + prefix, app: app)
            tapKey("Tab", app: app)
            XCTAssertEqual(field.value as? String, symbol, app.debugDescription)
            if index == 0 { tapKey("Tab", app: app) }
        }
        finishCorrectAnswer(app)
    }

    func testVariableBlanksCompleteGreekLettersOnQWERTY() {
        let app = start("blanks")
        focusAnswer(app.textFields["第 1 个字母空"].firstMatch, app: app)
        for slot in 1...2 {
            let field = app.textFields["第 \(slot) 个字母空"].firstMatch
            XCTAssertTrue(field.waitForExistence(timeout: 5), app.debugDescription)
            typeOnKeyboard("\\alp", app: app)
            tapKey("Tab", app: app)
            XCTAssertEqual(field.value as? String, "α", app.debugDescription)
            if slot == 1 { tapKey("Tab", app: app) }
        }
        finishCorrectAnswer(app)
    }

    func testChoiceCanSubmitAndFinishOffline() {
        let app = start("choice")
        let answer = app.descendants(matching: .any).matching(NSPredicate(format: "label CONTAINS %@", "Reflexivity of ≡")).firstMatch
        XCTAssertTrue(answer.waitForExistence(timeout: 5), app.debugDescription)
        tap(answer.label, app: app)
        tap("检查答案", app: app)
        XCTAssertTrue(app.staticTexts["答对了！"].waitForExistence(timeout: 5), app.debugDescription)
        tap("查看本关成果", app: app)
        XCTAssertTrue(app.staticTexts["100%"].waitForExistence(timeout: 5))
        assertNoSystemKeyboard(app)
    }

    func testLetterKeyboardCompletesAndRestartsWithoutSystemKeyboard() {
        let app = start("blanks")
        let first = app.textFields["第 1 个字母空"].firstMatch
        focusAnswer(first, app: app)
        typeOnKeyboard("q", app: app)
        tapKey("Tab", app: app)
        let second = app.textFields["第 2 个字母空"].firstMatch
        typeOnKeyboard("q", app: app)
        XCTAssertEqual(second.value as? String, "q", app.debugDescription)
        finishCorrectAnswer(app)
        tap("回到闯关", app: app)
        tap("开始 1 题挑战", app: app)
        focusAnswer(first, app: app)
        typeOnKeyboard("q", app: app)
        tapKey("Tab", app: app)
        typeOnKeyboard("q", app: app)
        finishCorrectAnswer(app)
        tap("回到闯关", app: app)
        tap("开始 1 题挑战", app: app)
        focusAnswer(first, app: app)
        tapKey("Done", app: app)
        XCTAssertTrue(app.buttons["检查答案"].waitForExistence(timeout: 5))
        XCTAssertFalse(app.buttons["检查答案"].isEnabled)
        assertNoSystemKeyboard(app)
    }

    func testSymbolKeyboardCanEditAndGradeSelectionWithoutOldSymbolButtons() {
        let app = start("cloze", card: "p-efb2f48bdf7e", difficulty: 3)
        let field = app.textFields["当前符号空"].firstMatch
        focusAnswer(field, app: app)
        XCTAssertFalse(app.buttons.matching(NSPredicate(format: "label BEGINSWITH %@", "填入 ")).firstMatch.exists)
        typeOnKeyboard("-", app: app)
        tapKey("Backspace", app: app)
        tapKey("Shift", app: app)
        tapKey("+", app: app)
        tapKey("Shift", app: app)
        XCTAssertEqual(field.value as? String, "+", app.debugDescription)
        tapKey("Tab", app: app)
        tapKey("Shift", app: app)
        tapKey("+", app: app)
        tapKey("Shift", app: app)
        XCTAssertEqual(field.value as? String, "+", app.debugDescription)
        tapKey("Backspace", app: app)
        assertEmptyField(field, app: app)
        tapKey("Shift", app: app)
        tapKey("+", app: app)
        tapKey("Shift", app: app)
        finishCorrectAnswer(app)
    }

    func testFullQWERTYLayoutAndPersistentShift() {
        let app = start("formula")
        let field = app.textViews.firstMatch
        focusAnswer(field, app: app)
        for character in "1234567890qwertyuiopasdfghjklzxcvbnm[]\\;',./-=`" {
            XCTAssertTrue(key(String(character), app: app).exists, "Missing key: \(character)")
        }
        XCTAssertFalse(app.buttons["输入反斜线"].exists)
        tapKey("Shift", app: app)
        tapKey("Q", app: app)
        tapKey("W", app: app)
        tapKey("!", app: app)
        XCTAssertEqual(field.value as? String, "QW!", app.debugDescription)
        XCTAssertTrue(key("Q", app: app).exists, "Shift must stay on after typing.")
        tapKey("Shift", app: app)
        typeOnKeyboard("q1[]\\;',./-=`", app: app)
        XCTAssertEqual(field.value as? String, "QW!q1[]\\;',./-=`", app.debugDescription)
        tapKey("Done", app: app)
        focusAnswer(field, app: app)
        XCTAssertEqual(field.value as? String, "QW!q1[]\\;',./-=`", app.debugDescription)
    }

    func testCursorBackspaceSpaceAndReturnEditFormula() {
        let app = start("formula")
        let field = app.textViews.firstMatch
        focusAnswer(field, app: app)
        typeOnKeyboard("pq", app: app)
        tapKey("Cursor left", app: app)
        tapKey("Backspace", app: app)
        tapKey("Space", app: app)
        tapKey("Cursor right", app: app)
        tapKey("Shift", app: app)
        tapKey("Return", app: app)
        tapKey("Shift", app: app)
        typeOnKeyboard("r", app: app)
        XCTAssertEqual(field.value as? String, " q\nr", app.debugDescription)
        XCTAssertTrue(key("Done", app: app).exists, app.debugDescription)
        tapKey("Done", app: app)
        assertNoSystemKeyboard(app)
    }
}
