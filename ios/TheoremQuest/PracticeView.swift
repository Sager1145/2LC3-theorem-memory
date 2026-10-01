import SafariServices
import SwiftUI

struct PracticeView: View {
    let library: LibraryStore
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var scope: StudyScope
    @State private var focus: TheoremFocus
    @State private var questionCount = 10
    @State private var practiceMode: PracticeQuestion.Mode?
    @State private var answerIsCorrect = false
    @AppStorage("practice.multipleChoiceDifficulty") private var difficulty = PracticeDifficulty.standard
    @State private var questions: [PracticeQuestion] = []
    @State private var index = 0
    @State private var selectedAnswer: String?
    @State private var hintShown = false
    @State private var correctInSession = 0
    @State private var showAdvancedPractice = false

    init(library: LibraryStore, initialFocus: TheoremFocus = .all,
         initialScope: StudyScope = StudyScope()) {
        self.library = library
        _focus = State(initialValue: initialFocus)
        _scope = State(initialValue: initialScope)
    }

    private var pool: [Theorem] {
        let sources = Dictionary(uniqueKeysWithValues: library.sources.map { ($0.id, $0) })
        let records = practiceMode == nil
            ? PracticeEngine.eligibleRecords(from: library.theorems, difficulty: difficulty)
            : library.theorems.filter(\.isPracticeCard)
        #if DEBUG
        if ProcessInfo.processInfo.arguments.contains("-ui-testing-fill-fixture") {
            let ids = ProcessInfo.processInfo.arguments.contains("-ui-testing-fill-multiple")
                ? ["t-077f95896e0f", "t-f26a74bc6a0b"] : ["t-077f95896e0f"]
            return records.filter { ids.contains($0.id) && focus.matches($0) && scope.matches($0, sources: sources) }
        }
        #endif
        return records.filter { focus.matches($0) && scope.matches($0, sources: sources) }
    }

    private var eligiblePool: [Theorem] {
        switch practiceMode {
        case .blanks: pool.filter { PracticeEngine.tokenize($0.formula).contains(where: PracticeEngine.isVariable) }
        case .cloze: pool.filter { PracticeEngine.hasClozeSymbol(in: $0.formula) }
        default: pool
        }
    }

    var body: some View {
        Group {
            if library.isLoading {
                ProgressView("正在准备练习…")
            } else if questions.isEmpty {
                setupView
            } else if index >= questions.count {
                completionView
                    .transition(reduceMotion ? .opacity : .scale(scale: 0.94).combined(with: .opacity))
            } else {
                questionView(questions[index])
                    .id(index)
                    .transition(reduceMotion ? .opacity : .asymmetric(
                        insertion: .offset(x: 24).combined(with: .opacity),
                        removal: .offset(x: -16).combined(with: .opacity)
                    ))
            }
        }
        .navigationTitle("练习")
        .navigationBarTitleDisplayMode(.large)
        .sheet(isPresented: $showAdvancedPractice) {
            WebPracticeView(url: LibraryStore.siteURL)
        }
    }

    private var setupView: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                HStack(alignment: .top, spacing: 18) {
                    VStack(alignment: .leading, spacing: 9) {
                        Text("今日练习")
                            .font(QuestFont.text(.caption, bold: true))
                            .tracking(1.2)
                            .foregroundStyle(QuestStyle.darkGreen)
                        Text("每天一点，记住定理")
                            .font(QuestFont.text(.title2, bold: true))
                        Text("选择题、字母填空或符号填空。题目从当前范围随机抽取。")
                            .font(QuestFont.text(.subheadline))
                            .foregroundStyle(QuestStyle.secondary)
                    }
                    Spacer(minLength: 0)
                    QuestMark(size: 58)
                }
                .padding(20)
                .frame(maxWidth: .infinity, alignment: .leading)
                .questCard(tint: QuestStyle.green.opacity(0.4), fill: QuestStyle.hero)

                VStack(alignment: .leading, spacing: 17) {
                    Text("本次练习")
                        .font(QuestFont.text(.headline))
                    Picker("定理分组", selection: $focus) {
                        ForEach(TheoremFocus.allCases) { group in
                            Text(group.title).tag(group)
                        }
                    }
                    .pickerStyle(.menu)
                    .accessibilityIdentifier("practice.focus")
                    Text(focus.explanation)
                        .font(QuestFont.text(.footnote))
                        .foregroundStyle(QuestStyle.secondary)
                    StudyScopePicker(scope: $scope, sources: library.sources)
                    Picker("题型", selection: $practiceMode) {
                        Text("名称与公式选择").tag(PracticeQuestion.Mode?.none)
                        Text("字母填空").tag(PracticeQuestion.Mode?.some(.blanks))
                        Text("符号填空").tag(PracticeQuestion.Mode?.some(.cloze))
                    }
                    .accessibilityIdentifier("practice.mode")
                    Picker("题数", selection: $questionCount) {
                        ForEach([5, 10, 15, 20], id: \.self) { count in Text("\(count) 题").tag(count) }
                    }
                    if practiceMode == nil {
                    Picker("选择题难度", selection: $difficulty) {
                        ForEach(PracticeDifficulty.allCases) { level in
                            Text(level.title).tag(level)
                        }
                    }
                    .pickerStyle(.segmented)
                    .accessibilityIdentifier("practice.difficulty")
                    Text(difficulty.explanation)
                        .font(QuestFont.text(.footnote))
                        .foregroundStyle(QuestStyle.secondary)
                    }
                    Text("当前可练 \(eligiblePool.count) 条")
                        .font(QuestFont.text(.subheadline))
                        .foregroundStyle(QuestStyle.secondary)
                    if eligiblePool.isEmpty {
                        Text("当前分组、学习范围与题型没有可练定理，请调整筛选。")
                            .font(QuestFont.text(.footnote))
                            .foregroundStyle(QuestStyle.secondary)
                    }
                    Button("开始练习", action: start)
                        .font(QuestFont.text(.body, bold: true))
                        .frame(maxWidth: .infinity)
                        .buttonStyle(QuestActionStyle())
                        .controlSize(.large)
                    .disabled(eligiblePool.isEmpty)
                }
                .padding(20)
                .questCard()

                Button {
                    showAdvancedPractice = true
                } label: {
                    Label("更多题型与公式输入", systemImage: "safari")
                        .frame(maxWidth: .infinity, alignment: .leading)
                }
                .buttonStyle(.bordered)
                Text("打开完整网页练习。网页中的学习记录由 Safari 网站数据单独保存。")
                    .font(QuestFont.text(.footnote))
                    .foregroundStyle(QuestStyle.secondary)

                HStack(spacing: 10) {
                    metric("已回答", value: library.progress.completedQuestions, color: QuestStyle.blue)
                    metric("答对", value: library.progress.correctAnswers, color: QuestStyle.darkGreen)
                    metric("待复练", value: library.progress.incorrectIDs.count, color: QuestStyle.red)
                }
            }
            .padding(16)
            .frame(maxWidth: 680)
            .frame(maxWidth: .infinity)
        }
        .background(QuestStyle.page)
    }

    private func metric(_ label: String, value: Int, color: Color) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(value.formatted())
                .accessibilityIdentifier("practice.metric.\(label)")
                .font(QuestFont.text(.title2, bold: true))
                .foregroundStyle(color)
            Text(label)
                .font(QuestFont.text(.caption))
                .foregroundStyle(QuestStyle.secondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(13)
        .questCard()
    }

    private func questionView(_ question: PracticeQuestion) -> some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                ProgressView(value: Double(index + 1), total: Double(questions.count))
                    .tint(QuestStyle.green)
                    .animation(reduceMotion ? nil : .easeInOut(duration: 0.3), value: index)
                    .accessibilityLabel("第 \(index + 1) 题，共 \(questions.count) 题")
                HStack(spacing: 8) {
                    QuestMark(size: 34)
                    Text("第 \(index + 1) / \(questions.count) 题")
                        .font(QuestFont.text(.subheadline, bold: true))
                        .foregroundStyle(QuestStyle.darkGreen)
                }
                Text(prompt(for: question.mode))
                    .font(QuestFont.text(.title2, bold: true))
                Text(question.mode == .name ? question.theorem.formula : "\(question.theorem.displayRef) · \(question.theorem.name)")
                    .font(question.mode == .name ? QuestFont.theorem(.title3) : QuestFont.text(.title3))
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(20)
                    .questCard(tint: QuestStyle.blue, fill: QuestStyle.blue.opacity(0.07))
                if selectedAnswer == nil {
                    Button {
                        hintShown = true
                    } label: {
                        Label(hintShown ? "已使用提示" : "提示", systemImage: "lightbulb")
                    }
                    .buttonStyle(.bordered)
                    .disabled(hintShown)
                    .accessibilityIdentifier("practice.hint")
                }
                if hintShown {
                    PracticeHintView(hint: PracticeEngine.hint(for: question, sources: library.sources))
                }
                if question.mode == .blanks || question.mode == .cloze {
                    FillAnswerView(question: question, checked: selectedAnswer != nil) { answer, correct in
                        submitAnswer(answer, correct: correct, question: question)
                    }
                } else {
                ForEach(question.options, id: \.self) { option in
                    Button {
                        submitAnswer(option, correct: option == question.correctOption, question: question)
                    } label: {
                        HStack {
                            Text(option)
                                .font(question.mode == .name ? QuestFont.text() : QuestFont.theorem())
                                .multilineTextAlignment(.leading)
                            Spacer()
                            if selectedAnswer != nil && option == question.correctOption {
                                Image(systemName: "checkmark.circle.fill")
                                    .foregroundStyle(QuestStyle.green)
                                    .symbolEffect(.bounce, value: reduceMotion ? false : selectedAnswer != nil)
                            } else if selectedAnswer == option {
                                Image(systemName: "xmark.circle.fill").foregroundStyle(QuestStyle.red)
                            }
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(15)
                        .questCard(
                            tint: selectedAnswer == nil ? QuestStyle.line :
                                option == question.correctOption ? QuestStyle.green :
                                option == selectedAnswer ? QuestStyle.red : QuestStyle.line,
                            fill: selectedAnswer == nil ? QuestStyle.paper :
                                option == question.correctOption ? QuestStyle.green.opacity(0.10) :
                                option == selectedAnswer ? QuestStyle.red.opacity(0.10) : QuestStyle.paper
                        )
                    }
                    .buttonStyle(.plain)
                    .accessibilityIdentifier("practice.answerOption")
                    .accessibilityValue(selectedAnswer == nil ? "未作答" :
                        option == question.correctOption ? "正确答案" :
                        option == selectedAnswer ? "已选，回答错误" : "未选")
                    .disabled(selectedAnswer != nil)
                }
                }
                if selectedAnswer != nil {
                    if answerIsCorrect {
                        Text(hintShown ? "答案正确；本题使用了提示，留待无提示时再练" : "答对了")
                            .font(QuestFont.text(.headline, bold: true))
                            .foregroundStyle(QuestStyle.darkGreen)
                    } else {
                        VStack(alignment: .leading, spacing: 6) {
                            Text("正确答案：")
                                .font(QuestFont.text(.headline, bold: true))
                            Text(question.correctOption)
                                .font(question.mode == .name ? QuestFont.text(.headline, bold: true) : QuestFont.theorem())
                                .textSelection(.enabled)
                        }
                        .foregroundStyle(QuestStyle.red)
                    }
                    answerFeedback(question)
                    Button(index + 1 == questions.count ? "查看结果" : "下一题") {
                        withAnimation(reduceMotion ? nil : .easeInOut(duration: 0.3)) {
                            index += 1
                            selectedAnswer = nil
                            hintShown = false
                        }
                    }
                    .buttonStyle(QuestActionStyle())
                    .controlSize(.large)
                    .transition(reduceMotion ? .opacity : .move(edge: .bottom).combined(with: .opacity))
                }
            }
            .padding()
            .frame(maxWidth: 680)
            .frame(maxWidth: .infinity)
        }
        .background(QuestStyle.page)
        .toolbar {
            Button("退出") {
                withAnimation(reduceMotion ? nil : .easeInOut(duration: 0.25)) {
                    questions = []
                    index = 0
                    hintShown = false
                }
            }
        }
    }

    private func answerFeedback(_ question: PracticeQuestion) -> some View {
        VStack(alignment: .leading, spacing: 14) {
            Text("全部答案与变体")
                .font(QuestFont.text(.headline, bold: true))
            ForEach(question.answerVariants) { theorem in
                VStack(alignment: .leading, spacing: 8) {
                    Text("\(theorem.answerReferences.joined(separator: "、")) · \(theorem.answerNames.joined(separator: " · "))")
                        .font(QuestFont.text(.headline, bold: true))
                    if let label = theorem.variantLabel, !label.isEmpty {
                        Text(label).font(QuestFont.text(.caption)).foregroundStyle(QuestStyle.secondary)
                    }
                    ForEach(theorem.answerFormulas, id: \.self) { formula in
                        Text(formula)
                            .font(QuestFont.theorem())
                            .frame(maxWidth: .infinity, alignment: .leading)
                    }
                    if let condition = theorem.sideCondition, !condition.isEmpty {
                        Text("适用条件：\(condition)").font(QuestFont.text(.footnote))
                    }
                }
            }
        }
        .textSelection(.enabled)
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(18)
        .questCard(tint: QuestStyle.blue, fill: QuestStyle.blue.opacity(0.07))
        .accessibilityIdentifier("practice.answerVariants")
    }

    private var completionView: some View {
        ScrollView {
            VStack(spacing: 20) {
                Image(systemName: "checkmark.seal.fill")
                    .font(.system(size: 64))
                    .foregroundStyle(QuestStyle.gold)
                    .padding(22)
                    .background(QuestStyle.gold.opacity(0.12), in: RoundedRectangle(cornerRadius: 30))
                Text("本轮完成")
                    .font(QuestFont.text(.largeTitle, bold: true))
                Text("无提示答对 \(correctInSession) / \(questions.count) 题。错题与使用提示的题目已进入定理库的「错题」范围。")
                    .multilineTextAlignment(.center)
                    .foregroundStyle(QuestStyle.secondary)
                HStack(spacing: 12) {
                    metric("答对", value: correctInSession, color: QuestStyle.darkGreen)
                    metric("题目", value: questions.count, color: QuestStyle.blue)
                }
                Button("再练一轮") { start() }
                    .buttonStyle(QuestActionStyle())
                    .controlSize(.large)
                Button("返回设置") { questions = []; index = 0 }
            }
            .padding(24)
            .frame(maxWidth: 580)
            .frame(maxWidth: .infinity)
        }
        .background(QuestStyle.page)
    }

    private func prompt(for mode: PracticeQuestion.Mode) -> String {
        switch mode {
        case .name: "这条公式叫什么？"
        case .formula: "哪条公式符合这个名称？"
        case .blanks: "补上字母，还原这条定理"
        case .cloze: "补上符号，还原这条定理"
        }
    }

    private func submitAnswer(_ answer: String, correct: Bool, question: PracticeQuestion) {
        guard selectedAnswer == nil else { return }
        withAnimation(reduceMotion ? nil : .spring(response: 0.28, dampingFraction: 0.82)) {
            selectedAnswer = answer
            answerIsCorrect = correct
        }
        let unassistedCorrect = correct && !hintShown
        if unassistedCorrect { correctInSession += 1 }
        library.recordAnswer(id: question.theorem.id, correct: unassistedCorrect)
    }

    private func start() {
        let nextQuestions = PracticeEngine.makeQuestions(from: pool, count: questionCount, answerRecords: library.theorems, mode: practiceMode, difficulty: difficulty)
        withAnimation(reduceMotion ? nil : .easeInOut(duration: 0.3)) {
            questions = nextQuestions
            index = 0
            selectedAnswer = nil
            hintShown = false
            correctInSession = 0
        }
    }
}

private struct PracticeHintView: View {
    let hint: PracticeEngine.Hint

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("提示")
                .font(QuestFont.text(.headline, bold: true))
            Text(hint.text)
                .font(QuestFont.text(.subheadline))
            ForEach(hint.locations) { location in
                VStack(alignment: .leading, spacing: 4) {
                    if let url = location.url {
                        Link(location.title, destination: url)
                    } else {
                        Text(location.title)
                    }
                    Text(location.detail)
                        .foregroundStyle(QuestStyle.secondary)
                }
                .font(QuestFont.text(.footnote))
            }
            Text("本题将保留为待复练；下次不看提示答对后再移出错题。")
                .font(QuestFont.text(.footnote))
                .foregroundStyle(QuestStyle.secondary)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(18)
        .questCard(tint: QuestStyle.gold, fill: QuestStyle.gold.opacity(0.08))
        .accessibilityIdentifier("practice.hintContent")
    }
}

private struct FillAnswerView: View {
    let question: PracticeQuestion
    let checked: Bool
    let onSubmit: (String, Bool) -> Void
    @State private var values: [Int: String] = [:]
    @State private var activeSlot = 0

    private var isLetters: Bool { question.mode == .blanks }
    private var canSubmit: Bool {
        !checked && question.blankIndices.indices.allSatisfy {
            let value = values[$0, default: ""]
            return isLetters ? PracticeEngine.isVariable(value) : !value.isEmpty
        }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            FormulaFlow(spacing: 6) {
                ForEach(Array(question.tokens.enumerated()), id: \.offset) { item in
                    if let slot = question.blankIndices.firstIndex(of: item.offset) {
                        Button {
                            activeSlot = slot
                        } label: {
                            Text(values[slot, default: ""].isEmpty ? "？" : values[slot, default: ""])
                                .font(QuestFont.theorem(.title3))
                                .foregroundStyle(QuestStyle.darkGreen)
                                .padding(.horizontal, 10)
                                .frame(minWidth: 44, minHeight: 44)
                                .background(QuestStyle.green.opacity(activeSlot == slot && !checked ? 0.20 : 0.08),
                                            in: RoundedRectangle(cornerRadius: 9))
                                .overlay {
                                    RoundedRectangle(cornerRadius: 9)
                                        .strokeBorder(activeSlot == slot && !checked ? QuestStyle.darkGreen : QuestStyle.line)
                                }
                        }
                        .buttonStyle(.plain)
                        .accessibilityLabel("第 \(slot + 1) 个\(isLetters ? "字母" : "符号")空")
                        .accessibilityValue(values[slot, default: ""].isEmpty ? "未填写" : values[slot, default: ""])
                        .accessibilityIdentifier("practice.blank.\(slot)")
                        .accessibilityAddTraits(activeSlot == slot && !checked ? .isSelected : [])
                        .disabled(checked)
                    } else {
                        Text(item.element)
                            .font(QuestFont.theorem(.title3))
                            .padding(.vertical, 8)
                    }
                }
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(16)
            .questCard(tint: QuestStyle.blue, fill: QuestStyle.blue.opacity(0.07))

            if !checked {
                Text(isLetters ? "点空白可切换位置；点字母填入并前进。允许一致改名，不同变量不能合并。" : "共 \(question.blankIndices.count) 个符号空；点空白可切换位置，点符号填入并前进。填完全部空白后检查答案。")
                    .font(QuestFont.text(.footnote))
                    .foregroundStyle(QuestStyle.secondary)
                VStack(alignment: .leading, spacing: 12) {
                    Text("\(isLetters ? "字母" : "符号")键盘 · 第 \(activeSlot + 1) / \(question.blankIndices.count) 空")
                        .font(QuestFont.text(.headline, bold: true))
                    HStack {
                        Button("上一空", systemImage: "chevron.left") { activeSlot -= 1 }
                            .disabled(activeSlot == 0)
                        Button("下一空", systemImage: "chevron.right") { activeSlot += 1 }
                            .disabled(activeSlot + 1 >= question.blankIndices.count)
                        Spacer(minLength: 0)
                        Button("删除", systemImage: "delete.left") {
                            if values[activeSlot, default: ""].isEmpty && activeSlot > 0 { activeSlot -= 1 }
                            values[activeSlot] = ""
                        }
                        .accessibilityIdentifier("practice.delete")
                    }
                    .labelStyle(.iconOnly)
                    .buttonStyle(.bordered)
                    .controlSize(.large)
                    LazyVGrid(columns: [GridItem(.adaptive(minimum: 52))], spacing: 10) {
                        ForEach(question.keyboardOptions, id: \.self) { token in
                            Button {
                                values[activeSlot] = token
                                if activeSlot + 1 < question.blankIndices.count { activeSlot += 1 }
                            } label: {
                                Text(token)
                                    .font(QuestFont.theorem(.title3))
                                    .frame(maxWidth: .infinity, minHeight: 44)
                                    .background(QuestStyle.paper, in: RoundedRectangle(cornerRadius: 10))
                                    .overlay {
                                        RoundedRectangle(cornerRadius: 10).strokeBorder(QuestStyle.line)
                                    }
                            }
                            .buttonStyle(.plain)
                            .accessibilityLabel("填入 \(token)")
                            .accessibilityIdentifier("practice.key.\(token)")
                        }
                    }
                    Button("检查答案") {
                        guard canSubmit else { return }
                        let answers = question.blankIndices.indices.map { values[$0, default: ""] }
                        let correct = isLetters ? PracticeEngine.gradeBlanks(question: question, values: answers)
                            : PracticeEngine.gradeCloze(question: question, values: answers)
                        onSubmit(answers.joined(separator: " "), correct)
                    }
                    .font(QuestFont.text(.body, bold: true))
                    .frame(maxWidth: .infinity)
                    .buttonStyle(QuestActionStyle())
                    .controlSize(.large)
                    .disabled(!canSubmit)
                    .accessibilityIdentifier("practice.check")
                }
                .padding(16)
                .questCard()
            }
        }
    }
}

// Preserve formula order while wrapping long expressions to the available width.
private struct FormulaFlow: Layout {
    var spacing: CGFloat

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        arrange(subviews, width: proposal.width ?? 320).size
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        let layout = arrange(subviews, width: bounds.width)
        for (index, origin) in layout.origins.enumerated() {
            subviews[index].place(at: CGPoint(x: bounds.minX + origin.x, y: bounds.minY + origin.y),
                                 proposal: ProposedViewSize(layout.sizes[index]))
        }
    }

    private func arrange(_ subviews: Subviews, width: CGFloat) -> (size: CGSize, origins: [CGPoint], sizes: [CGSize]) {
        var origins: [CGPoint] = []
        var sizes: [CGSize] = []
        var x: CGFloat = 0
        var y: CGFloat = 0
        var rowHeight: CGFloat = 0
        var usedWidth: CGFloat = 0
        for view in subviews {
            let size = view.sizeThatFits(ProposedViewSize(width: width, height: nil))
            sizes.append(size)
            if x > 0 && x + size.width > width {
                x = 0
                y += rowHeight + spacing
                rowHeight = 0
            }
            origins.append(CGPoint(x: x, y: y))
            usedWidth = max(usedWidth, x + size.width)
            x += size.width + spacing
            rowHeight = max(rowHeight, size.height)
        }
        return (CGSize(width: min(width, usedWidth), height: y + rowHeight), origins, sizes)
    }
}

private struct WebPracticeView: UIViewControllerRepresentable {
    let url: URL

    func makeUIViewController(context: Context) -> SFSafariViewController {
        SFSafariViewController(url: url)
    }

    func updateUIViewController(_ controller: SFSafariViewController, context: Context) {}
}
