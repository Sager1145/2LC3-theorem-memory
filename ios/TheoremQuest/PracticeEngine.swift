import Foundation

struct PracticeQuestion: Identifiable {
    enum Mode: String, CaseIterable, Hashable { case name, formula, blanks, cloze }
    let theorem: Theorem
    let mode: Mode
    let options: [String]
    let correctOption: String
    let answerVariants: [Theorem]
    let tokens: [String]
    let blankIndices: [Int]
    let keyboardOptions: [String]
    var id: String { theorem.id }

    init(theorem: Theorem, mode: Mode, options: [String], correctOption: String,
         answerVariants: [Theorem], tokens: [String] = [], blankIndices: [Int] = [],
         keyboardOptions: [String] = []) {
        self.theorem = theorem
        self.mode = mode
        self.options = options
        self.correctOption = correctOption
        self.answerVariants = answerVariants
        self.tokens = tokens
        self.blankIndices = blankIndices
        self.keyboardOptions = keyboardOptions
    }
}

enum PracticeDifficulty: String, CaseIterable, Identifiable {
    case easy, standard, hard
    var id: String { rawValue }
    var title: String {
        switch self {
        case .easy: "简单"
        case .standard: "标准"
        case .hard: "困难"
        }
    }
    var explanation: String {
        switch self {
        case .easy: "干扰项差异较大，适合初次记忆。"
        case .standard: "干扰项相似度适中，适合日常复习。"
        case .hard: "排除结合律、对称性、自反性等基础定理；优先选择同名不同编号、公式结构或符号相近、主题相同的干扰项。"
        }
    }
}

enum PracticeEngine {
    struct HintLocation: Identifiable {
        let id: String
        let title: String
        let detail: String
        let url: URL?
    }

    struct Hint {
        let text: String
        let locations: [HintLocation]
    }

    static func hint(for question: PracticeQuestion, sources: [TheoremSource]) -> Hint {
        let theorem = question.theorem
        let name = theorem.name.trimmingCharacters(in: .whitespacesAndNewlines)
        let unnumbered = !(theorem.numbers ?? []).contains {
            !$0.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
        }
        if name.isEmpty || name == "原文未命名" || unnumbered {
            let sourceMap = Dictionary(uniqueKeysWithValues: sources.map { ($0.id, $0) })
            let locations = theorem.sources.map { occurrence in
                let source = sourceMap[occurrence.sourceId]
                let weeks = source?.studyWeeks ?? []
                let weekLabel = weeks.isEmpty ? "Week 未归类" :
                    weeks.sorted().map { "Week \($0)" }.joined(separator: "、")
                var details = [weekLabel]
                if let year = source?.studyYear { details.append(String(year)) }
                if let port = source?.url?.port { details.append("port \(port)") }
                if let section = occurrence.locator.section, !section.isEmpty { details.append(section) }
                if let line = occurrence.locator.line { details.append("第 \(line) 行") }
                return HintLocation(id: occurrence.id, title: source?.name ?? occurrence.sourceId,
                                    detail: details.joined(separator: " · "), url: source?.url)
            }
            return Hint(text: locations.isEmpty ? "这条定理没有已记录的 Notebook 出现位置。" :
                        "回想这条定理在以下 Week 和 Notebook 中出现的位置：", locations: locations)
        }
        let text: String
        switch question.mode {
        case .name:
            // A short prefix gives a recall cue without disclosing the full name.
            let prefix = name.count > 3 ? "名称以「\(name.prefix(3))…」开头；" : ""
            text = "\(prefix)主题：\(theorem.topic)。"
        case .formula, .blanks, .cloze:
            let variables = Set(tokenize(theorem.formula).filter(isVariable)).count
            text = "主题：\(theorem.topic)。公式有 \(variables) 个不同变量；留意相同变量在各处的对应关系。"
        }
        return Hint(text: text, locations: [])
    }

    static func answerVariants(for theorem: Theorem, in records: [Theorem]) -> [Theorem] {
        guard !(theorem.numbers ?? []).isEmpty, !theorem.name.isEmpty,
              theorem.name != "原文未命名" else { return [theorem] }
        let name = normalizedName(theorem.name)
        return [theorem] + records.filter {
            $0.id != theorem.id && !($0.numbers ?? []).isEmpty && normalizedName($0.name) == name
        }
    }

    private static func normalizedName(_ value: String) -> String {
        value.lowercased()
            .replacingOccurrences(of: "[‘’“”\"'`]", with: "", options: .regularExpression)
            .replacingOccurrences(of: "\\s+", with: " ", options: .regularExpression)
            .trimmingCharacters(in: .whitespacesAndNewlines)
    }

    static func eligibleRecords(from records: [Theorem], difficulty: PracticeDifficulty) -> [Theorem] {
        records.filter { theorem in
            guard theorem.isPracticeCard else { return false }
            guard difficulty == .hard else { return true }
            let names = theorem.answerNames.map(normalizedName).joined(separator: " ")
            let basicNames = ["associativ", "assosiativ", "associtiv", "symmetr", "symetry", "symmetery",
                              "reflexiv", "reflexity", "结合律", "对称性", "自反性"]
            return !basicNames.contains(where: names.contains)
                && names.range(of: "\\basso\\b", options: .regularExpression) == nil
        }
    }

    private static func normalizedFormula(_ value: String) -> String {
        normalizeInput(value).replacingOccurrences(of: "\\s+", with: "", options: .regularExpression)
    }

    private static func grams(_ value: String) -> Set<String> {
        let characters = Array(value)
        guard characters.count > 1 else { return Set(characters.map(String.init)) }
        return Set(zip(characters, characters.dropFirst()).map { String([$0, $1]) })
    }

    private static func overlap(_ lhs: Set<String>, _ rhs: Set<String>) -> Double {
        guard !lhs.isEmpty || !rhs.isEmpty else { return 0 }
        return Double(lhs.intersection(rhs).count) / Double(lhs.union(rhs).count)
    }

    static func similarity(_ candidate: Theorem, to target: Theorem) -> Double {
        let name = normalizedName(target.name)
        let candidateName = normalizedName(candidate.name)
        let named = !name.isEmpty && name != "原文未命名"
        let sameName = named && name == candidateName ? 8.0 : 0
        let nameSimilarity = named ? overlap(grams(name), grams(candidateName)) * 3 : 0
        func shape(_ formula: String) -> String {
            normalizedFormula(formula).replacingOccurrences(
                of: "[A-Za-zα-ωΑ-Ω]+[₀-₉0-9]*", with: "v", options: .regularExpression)
        }
        let structure = overlap(grams(shape(target.formula)), grams(shape(candidate.formula))) * 4
        let operators = Set("¬∧∨≡⇒⇐⇔=≠≤≥<>+-×÷∈∉⊆⊂∪∩∀∃ΣΠ")
        let symbols = overlap(Set(target.formula.filter { operators.contains($0) }.map(String.init)),
                              Set(candidate.formula.filter { operators.contains($0) }.map(String.init))) * 2
        let topic = !target.topic.isEmpty && candidate.topic == target.topic ? 1.0 : 0
        return sameName + nameSimilarity + structure + symbols + topic
    }

    // Keep only unambiguous, distinct answers before ranking, so duplicate rows never use option slots.
    static func distractors(for theorem: Theorem, mode: PracticeQuestion.Mode,
                            in records: [Theorem], difficulty: PracticeDifficulty) -> [Theorem] {
        let targetFormulas = Set(theorem.answerFormulas.map(normalizedFormula))
        var seen = Set<String>()
        let candidates = eligibleRecords(from: records, difficulty: difficulty).shuffled().filter { candidate in
            guard candidate.isPracticeCard, candidate.id != theorem.id else { return false }
            let candidateFormulas = Set(candidate.answerFormulas.map(normalizedFormula))
            guard targetFormulas.isDisjoint(with: candidateFormulas) else { return false }
            if mode == .formula && candidate.displayRef == theorem.displayRef && candidate.name == theorem.name {
                return false
            }
            let answer = mode == .name ? "\(candidate.displayRef) · \(candidate.name)" : normalizedFormula(candidate.formula)
            return seen.insert(answer).inserted
        }
        let ranked = candidates.map { (theorem: $0, score: similarity($0, to: theorem)) }
            .sorted { $0.score > $1.score }
        switch difficulty {
        case .hard: return ranked.map(\.theorem)
        case .easy: return ranked.reversed().map(\.theorem)
        case .standard:
            guard !ranked.isEmpty else { return [] }
            let midpoint = Double(ranked.count - 1) / 2
            return ranked.enumerated().sorted {
                abs(Double($0.offset) - midpoint) < abs(Double($1.offset) - midpoint)
            }.map { $0.element.theorem }
        }
    }

    static func makeQuestions(from records: [Theorem], count: Int, answerRecords: [Theorem]? = nil,
                              mode requestedMode: PracticeQuestion.Mode? = nil,
                              difficulty: PracticeDifficulty = .standard) -> [PracticeQuestion] {
        let choiceDifficulty = requestedMode == .blanks || requestedMode == .cloze ? PracticeDifficulty.standard : difficulty
        let pool = eligibleRecords(from: records, difficulty: choiceDifficulty).filter { theorem in
            guard theorem.isPracticeCard else { return false }
            let tokens = tokenize(theorem.formula)
            switch requestedMode {
            case .blanks: return tokens.contains(where: isVariable)
            case .cloze: return tokens.contains { token in clozeGroups.contains { $0.contains(token) } }
            default: return true
            }
        }
        let sampled = Array(pool.shuffled().prefix(max(0, count)))
        return sampled.enumerated().map { offset, theorem in
            let mode = requestedMode ?? (offset.isMultiple(of: 2) ? .name : .formula)
            let variants = answerVariants(for: theorem, in: (answerRecords ?? records).filter(\.isPracticeCard))
            if mode == .blanks || mode == .cloze {
                let tokens = tokenize(theorem.formula)
                if mode == .blanks {
                    let indices = tokens.indices.filter { isVariable(tokens[$0]) }
                    var seen = Set<String>()
                    let keys = (indices.map { tokens[$0] } + ["p", "q", "r", "s", "x", "y", "z", "a", "b", "c", "n", "m"])
                        .filter { seen.insert($0).inserted }
                    return PracticeQuestion(theorem: theorem, mode: mode, options: [], correctOption: theorem.formula,
                                            answerVariants: variants, tokens: tokens, blankIndices: indices,
                                            keyboardOptions: keys)
                }
                let candidates = tokens.indices.filter { index in clozeGroups.contains { $0.contains(tokens[index]) } }
                let index = candidates.randomElement()!
                let correct = tokens[index]
                let group = clozeGroups.first { $0.contains(correct) }!
                let options = ([correct] + group.filter { $0 != correct }.shuffled().prefix(3)).shuffled()
                return PracticeQuestion(theorem: theorem, mode: mode, options: options, correctOption: correct,
                                        answerVariants: variants, tokens: tokens, blankIndices: [index],
                                        keyboardOptions: options)
            }
            let correct = mode == .name ? "\(theorem.displayRef) · \(theorem.name)" : theorem.formula
            let wrongOptions = distractors(for: theorem, mode: mode, in: pool, difficulty: difficulty)
                .prefix(3).map { mode == .name ? "\($0.displayRef) · \($0.name)" : $0.formula }
            let choices = ([correct] + wrongOptions).shuffled()
            return PracticeQuestion(theorem: theorem, mode: mode, options: choices, correctOption: correct,
                                    answerVariants: variants)
        }
    }
    // Match the web engine's variable vocabulary: named functions and constants stay visible.
    private static let fixedTokens = Set("true false suc pred double even odd mod div max min abs gcd lcm sqrt sin cos is-knight is-knave says skip abort while do od if then else fi fst snd head tail length ℕ ℤ ℚ ℝ ℙ 𝔹 𝐔 𝜖 eps emptyseq nil Nat Bool Int Real set bag seq rel dom ran domain range id inv pow card rev take drop concat map filter".split(separator: " ").map(String.init))
    private static let variablePattern = try! NSRegularExpression(pattern: "^(?:[a-zA-Zα-ωΑ-Ω][\\p{N}_'′]*|[A-Z][a-z]?[\\p{N}_'′]*)$")
    private static let tokenPattern = try! NSRegularExpression(
        pattern: "is-knight(?![a-zA-Z])|is-knave(?![a-zA-Z])|says(?![a-zA-Z])|[\\p{L}_][\\p{L}\\p{N}_'′]*|[0-9]+(?:\\.[0-9]+)?|:=|\\S")
    private static let clozeGroups = [
        ["≡", "≢", "⇒", "⇐"], ["∧", "∨", "¬"], ["=", "≠", "<", "≤", ">", "≥"],
        ["+", "-", "·", "/"], ["∈", "∉", "⊆", "⊂", "⊇", "⊃"], ["∪", "∩", "∖"], ["∀", "∃"]
    ]
    private static let shortcuts: [String: String] = [
        "\\equiv": "≡",
        "\\==": "≡",
        "\\nequiv": "≢",
        "\\neq": "≠",
        "\\ne": "≠",
        "\\land": "∧",
        "\\wedge": "∧",
        "\\and": "∧",
        "\\lor": "∨",
        "\\vee": "∨",
        "\\or": "∨",
        "\\lnot": "¬",
        "\\neg": "¬",
        "\\not": "¬",
        "\\implies": "⇒",
        "\\=>": "⇒",
        "\\Rightarrow": "⇒",
        "\\follows": "⇐",
        "\\<==": "⇐",
        "\\Leftarrow": "⇐",
        "\\cdot": "·",
        "\\.": "·",
        "\\leq": "≤",
        "\\le": "≤",
        "\\geq": "≥",
        "\\ge": "≥",
        "\\becomes": "≔",
        "\\:=": "≔",
        "\\forall": "∀",
        "\\exists": "∃",
        "\\sum": "∑",
        "\\product": "∏",
        "\\prod": "∏",
        "\\lambda": "λ",
        "\\Gl": "λ",
        "\\with": "❙",
        "\\spot": "•",
        "\\bullet": "•",
        "\\min": "↓",
        "\\max": "↑",
        "\\[-": "⁅",
        "\\]-": "⁆",
        "\\;_": "⍮",
        "\\langle": "⟨",
        "\\rangle": "⟩",
        "\\<": "⟨",
        "\\>": "⟩",
        "\\beginhint": "⟨",
        "\\endhint": "⟩",
        "\\<<": "⟪",
        "\\>>": "⟫",
        "\\in": "∈",
        "\\notin": "∉",
        "\\union": "∪",
        "\\cup": "∪",
        "\\intersection": "∩",
        "\\cap": "∩",
        "\\subseteq": "⊆",
        "\\subset": "⊂",
        "\\supseteq": "⊇",
        "\\supset": "⊃",
        "\\BB": "𝔹",
        "\\bool": "𝔹",
        "\\NN": "ℕ",
        "\\nat": "ℕ",
        "\\ZZ": "ℤ",
        "\\int": "ℤ",
        "\\RR": "ℝ",
        "\\real": "ℝ",
        "\\QQ": "ℚ",
        "\\rat": "ℚ",
        "\\PP": "ℙ",
        "\\powerset": "ℙ",
        "\\universe": "𝐔",
        "\\times": "×",
        "\\rel": "↔",
        "\\lrel": "⦗",
        "\\rrel": "⦘",
        "\\rcomp": "⨾",
        "\\fcomp": "⨾",
        "\\;;": "⨾",
        "\\converse": "˘",
        "\\lres": "／",
        "\\rres": "＼",
        "\\emptyseq": "𝜖",
        "\\eps": "𝜖",
        "\\cons": "◃",
        "\\snoc": "▹",
        "\\catenate": "⌢",
        "\\vdash": "⊦",
        "\\emptyset": "∅",
        "\\alpha": "α",
        "\\beta": "β",
        "\\gamma": "γ",
        "\\delta": "δ",
        "\\theta": "θ",
        "\\ldquo": "“",
        "\\rdquo": "”"
    ]

    static func isVariable(_ token: String) -> Bool {
        let range = NSRange(token.startIndex..<token.endIndex, in: token)
        return !fixedTokens.contains(token) && variablePattern.firstMatch(in: token, range: range)?.range == range
    }

    static func normalizeInput(_ text: String) -> String {
        var value = text.precomposedStringWithCanonicalMapping
        for (from, to) in [("\u{00a0}", " "), ("\u{2007}", " "), ("\u{202f}", " "),
                           ("−", "-"), ("–", "-"), ("⋅", "·"), ("′", "'"), ("/≡", "≢"), ("/=", "≠")] {
            value = value.replacingOccurrences(of: from, with: to)
        }
        if value.contains("\\") {
            for key in shortcuts.keys.sorted(by: { $0.count > $1.count }) {
                let suffix = key.last?.isASCII == true && key.last?.isLetter == true ? "(?![a-zA-Z])" : ""
                value = value.replacingOccurrences(of: NSRegularExpression.escapedPattern(for: key) + suffix,
                                                  with: shortcuts[key]!, options: .regularExpression)
            }
        }
        for (from, to) in [("<==>", "≡"), ("<=>", "≡"), ("==>", "⇒"), ("=>", "⇒"), ("<==", "⇐"),
                           ("/\\", "∧"), ("\\/", "∨"), ("!=", "≠"), ("<=", "≤"), (">=", "≥"), ("&&", "∧"), ("||", "∨")] {
            value = value.replacingOccurrences(of: from, with: to)
        }
        for (word, symbol) in [("NOT", "¬"), ("AND", "∧"), ("OR", "∨")] {
            value = value.replacingOccurrences(of: "\\b" + word + "\\b", with: symbol, options: .regularExpression)
        }
        return value.replacingOccurrences(of: "\\s+", with: " ", options: .regularExpression)
            .trimmingCharacters(in: .whitespacesAndNewlines)
    }

    static func tokenize(_ formula: String) -> [String] {
        let text = normalizeInput(formula)
        let range = NSRange(text.startIndex..<text.endIndex, in: text)
        return tokenPattern.matches(in: text, range: range).compactMap { match in
            Range(match.range, in: text).map { String(text[$0]) }
        }
    }

    static func hasClozeSymbol(in formula: String) -> Bool {
        tokenize(formula).contains { token in clozeGroups.contains { $0.contains(token) } }
    }

    static func gradeBlanks(question: PracticeQuestion, values: [String]) -> Bool {
        guard question.mode == .blanks, !question.blankIndices.isEmpty,
              values.count == question.blankIndices.count else { return false }
        var mapping: [String: String] = [:]
        var reverseMapping: [String: String] = [:]
        for (index, rawValue) in zip(question.blankIndices, values) {
            guard question.tokens.indices.contains(index) else { return false }
            let expected = question.tokens[index]
            let answer = normalizeInput(rawValue)
            guard isVariable(expected), isVariable(answer),
                  mapping[expected] == nil || mapping[expected] == answer,
                  reverseMapping[answer] == nil || reverseMapping[answer] == expected else { return false }
            mapping[expected] = answer
            reverseMapping[answer] = expected
        }
        return true
    }

}
