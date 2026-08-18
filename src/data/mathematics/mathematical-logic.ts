import { LearningModule } from "@/types/learning";

export const mathematicalLogicModule: LearningModule = {
  id: "mathematical-logic",
  title: "Mathematical Logic & Propositional Calculus",
  description:
    "Propositions, truth tables, logical connectives, conditionals, De Morgan's laws, quantifiers, proof techniques, and Boolean satisfiability (SAT).",
  status: "in-progress",
  detailedContent: `# Mathematical Logic & Propositional Calculus

**Mathematical Logic** is the formal language of reasoning in mathematics and computer science. It provides the rigorous syntactic and semantic rules that underpin digital circuit design, compiler construction, formal verification, algorithm correctness proofs, database query optimization, and artificial intelligence knowledge representation.

This module covers **Propositional Logic, Truth Tables, Logical Connectives, Quantifiers (First-Order Logic), and Proof Techniques**.

---

## What You'll Learn

By the end of this module, you will be able to:

| # | Topic | Skill |
|:--|:------|:------|
| 1 | **Propositions & Truth Values** | Distinguish valid propositions from non-propositions (T vs. F) |
| 2 | **Logical Connectives** | Master NOT (¬), AND (∧), OR (∨), XOR (⊕), Implication (⟹), and Biconditional (⟺) |
| 3 | **Conditionals & Equivalences** | Construct Converse (q ⟹ p), Inverse (¬p ⟹ ¬q), and Contrapositive (¬q ⟹ ¬p) |
| 4 | **Truth Tables & Classification** | Classify compound statements as **Tautologies**, **Contradictions**, or **Contingencies** |
| 5 | **Laws of Logical Equivalence** | Simplify complex boolean formulas using De Morgan's, Distributive, and Absorption laws |
| 6 | **Predicates & Quantifiers** | Translate natural language into First-Order Logic using ∀x (Universal) and ∃x (Existential) |
| 7 | **Negating Quantified Statements** | Correctly negate complex assertions using generalized De Morgan's laws for quantifiers |
| 8 | **Proof Techniques** | Construct Direct Proofs, Proof by Contraposition, Proof by Contradiction, and Counterexamples |
| 9 | **Digital Logic & Circuit Gates** | Map boolean formulas to hardware logic gates (AND, OR, NOT, NAND, NOR, XOR, XNOR) |
| 10 | **Boolean Satisfiability (SAT)** | Understand CNF/DNF normal forms and the foundational role of SAT in P vs. NP complexity |

---

## Math Notation & Pronunciation Guide

**Propositional Connectives:**
- **¬** or **~** — pronounced "not" or "negation" — inverts truth value (¬p)
- **∧** — pronounced "and" or "conjunction" — true only when both are true (p ∧ q)
- **∨** — pronounced "or" or "disjunction" — true when at least one is true (p ∨ q)
- **⊕** — pronounced "xor" or "exclusive or" — true when exactly one is true (p ⊕ q)
- **⟹** or **→** — pronounced "implies" or "if-then" — conditional statement (p ⟹ q)
- **⟺** or **↔** — pronounced "if and only if" (iff) — biconditional statement (p ⟺ q)
- **≡** — pronounced "is logically equivalent to" — identical truth table columns (p ≡ q)
- **⊤** (or **T**) — pronounced "tautology" or "true"
- **⊥** (or **F**) — pronounced "contradiction" or "false"

**First-Order Logic Quantifiers:**
- **∀** — pronounced "for all" or "for every" — Universal Quantifier (∀x P(x))
- **∃** — pronounced "there exists" or "for some" — Existential Quantifier (∃x P(x))
- **∃!** — pronounced "there exists uniquely" or "there is exactly one" (∃!x P(x))

---

## Key Concepts

### 1. Propositions & Truth Values

**What is a Proposition?**
A **proposition** (or statement) is a declarative sentence that is either **strictly True (T)** or **strictly False (F)**, but **not both simultaneously**.

\`\`\`text
Sentence                                      | Proposition? | Truth Value
----------------------------------------------|--------------|-------------
"Paris is the capital of France."             | YES          | True (T)
"2 + 3 = 7"                                   | YES          | False (F)
"Python is an interpreted programming lang."  | YES          | True (T)
"What time is it?"                            | NO (Question)| N/A
"Please submit your assignment."              | NO (Command) | N/A
"x + 5 = 12"                                  | NO (Open eq) | Depends on x
"This statement is false."                    | NO (Paradox) | Neither T nor F
\`\`\`

> [!NOTE]
> **Open Sentences vs. Propositions:** The equation *x + 5 = 12* is an **open sentence (predicate)**. It becomes a proposition only when a specific value is assigned to variable *x* or when bound by a quantifier (∃x (x + 5 = 12)).

---

### 2. Logical Connectives & Compound Statements

Compound propositions are formed by combining atomic propositions using **logical operators (connectives)**.

\`\`\`text
                Master Truth Table for Basic Connectives
+-------+-------+----------+---------------+--------------+----------------+
|   p   |   q   | Negation |  Conjunction  | Disjunction  |  Exclusive OR  |
|       |       |  (¬ p)   |    (p ∧ q)    |   (p ∨ q)    |    (p ⊕ q)     |
+-------+-------+----------+---------------+--------------+----------------+
|   T   |   T   |    F     |       T       |      T       |       F        |
|   T   |   F   |    F     |       F       |      T       |       T        |
|   F   |   T   |    T     |       F       |      T       |       T        |
|   F   |   F   |    T     |       F       |      F       |       F        |
+-------+-------+----------+---------------+--------------+----------------+
\`\`\`

1. **Negation (¬p)**: Flips T ↔ F.
2. **Conjunction (p ∧ q)**: True if and only if **BOTH** p and q are true. (Analogous to Set Intersection ∩).
3. **Disjunction (p ∨ q)**: True if **AT LEAST ONE** of p or q is true. (Analogous to Set Union ∪).
4. **Exclusive OR (p ⊕ q)**: True if **EXACTLY ONE** is true, but false if both are true. (Analogous to Symmetric Difference △).

\`\`\`python
# Boolean logic in Python
p = True
q = False

print("NOT p (¬p):", not p)          # False
print("p AND q (p ∧ q):", p and q)   # False
print("p OR q (p ∨ q):", p or q)     # True
print("p XOR q (p ⊕ q):", p ^ q)     # True
\`\`\`

---

### 3. Conditional (p ⟹ q) & Biconditional (p ⟺ q)

#### 3.1 The Conditional (Implication: p ⟹ q)
In the implication **p ⟹ q**:
- **p** is called the **Hypothesis / Antecedent / Premise**.
- **q** is called the **Conclusion / Consequent**.

> [!IMPORTANT]
> **The Golden Rule of Implication:**
> **p ⟹ q** is **FALSE in ONLY ONE CASE**: When the hypothesis **p is True** and the conclusion **q is False** (T ⟹ F).
> In all other cases, **p ⟹ q is True** (even when p is False — known as **Vacuous Truth**).

\`\`\`text
       Truth Table for Conditional and Biconditional
+-------+-------+-------------------------+-------------------------+
|   p   |   q   | Conditional (p ⟹ q)     | Biconditional (p ⟺ q)   |
+-------+-------+-------------------------+-------------------------+
|   T   |   T   |            T            |            T            |
|   T   |   F   |            F  (Violation)|           F            |
|   F   |   T   |            T  (Vacuous) |            F            |
|   F   |   F   |            T  (Vacuous) |            T            |
+-------+-------+-------------------------+-------------------------+
\`\`\`

**Common Natural Language Phrasings for p ⟹ q:**
- *"If p, then q"*
- *"q if p"*
- *"p is sufficient for q"*
- *"q is necessary for p"*
- *"p only if q"*
- *"q whenever p"*

**Fundamental Equivalence of Implication:**
$$p \\implies q \\equiv \\neg p \\lor q$$
> **In Plain Text:** \`p ⟹ q  ≡  ¬p ∨ q\`

#### 3.2 The Biconditional (p ⟺ q)
**p ⟺ q** states *"p if and only if q"* (often written **iff**).
It is True whenever p and q share the **exact same truth value** (T ⟺ T and F ⟺ F).
$$p \\iff q \\equiv (p \\implies q) \\land (q \\implies p)$$
> **In Plain Text:** \`p ⟺ q  ≡  (p ⟹ q) ∧ (q ⟹ p)\`

---

### 4. Converse, Inverse, and Contrapositive

Given any conditional statement **p ⟹ q**, three related conditional statements can be formed:

| Form | Symbolic Expression | Relationship to Original |
|:-----|:--------------------|:-------------------------|
| **Original Implication** | \`p ⟹ q\` | Baseline statement |
| **Converse** | \`q ⟹ p\` | Reverse direction (NOT equivalent to original) |
| **Inverse** | \`¬p ⟹ ¬q\` | Negate both terms (NOT equivalent to original) |
| **Contrapositive** | \`¬q ⟹ ¬p\` | Reverse and negate (**LOGICALLY EQUIVALENT** to original) |

\`\`\`text
        Comparison of Truth Tables for Related Conditionals
+---+---+---------------+---------------+-----------------+--------------------+
| p | q | p ⟹ q (Orig)  | q ⟹ p (Conv)  | ¬p ⟹ ¬q (Inv)  | ¬q ⟹ ¬p (Contra)   |
+---+---+---------------+---------------+-----------------+--------------------+
| T | T |       T       |       T       |        T        |         T          |
| T | F |       F       |       T       |        T        |         F          |
| F | T |       T       |       F       |        F        |         T          |
| F | F |       T       |       T       |        T        |         T          |
+---+---+---------------+---------------+-----------------+--------------------+
\`\`\`

> [!TIP]
> **Key Insights:**
> 1. **(p ⟹ q) ≡ (¬q ⟹ ¬p)** — An implication and its contrapositive **always** have identical truth values.
> 2. **(q ⟹ p) ≡ (¬p ⟹ ¬q)** — The converse is logically equivalent to the inverse.

---

### 5. Truth Tables, Tautologies, Contradictions & Contingencies

Compound propositions are classified based on the truth values in their final column:

1. **Tautology (⊤ or T)**: A compound proposition that is **True for every possible truth assignment** of its variables (e.g., \`p ∨ ¬p\`, \`p ⟹ p\`).
2. **Contradiction (⊥ or F)**: A compound proposition that is **False for every possible truth assignment** (e.g., \`p ∧ ¬p\`).
3. **Contingency**: A compound proposition that is neither a tautology nor a contradiction (it is True for some assignments and False for others).

\`\`\`python
# Truth Table Generator in Python
def truth_table_3var():
    print(" p | q | r | (p ∧ q) → r | (p → r) ∨ (q → r)")
    print("-" * 46)
    for p in [True, False]:
        for q in [True, False]:
            for r in [True, False]:
                lhs = (not (p and q)) or r
                rhs = ((not p) or r) or ((not q) or r)
                print(f" {int(p)} | {int(q)} | {int(r)} |      {int(lhs)}      |        {int(rhs)}       | Equivalent: {lhs == rhs}")

truth_table_3var()
\`\`\`

---

### 6. Laws of Logical Equivalence

Two propositions P and Q are **logically equivalent** (P ≡ Q) if and only if P ⟺ Q is a tautology.

| Law Name | Equivalence 1 | Equivalence 2 |
|:---------|:--------------|:--------------|
| **Identity Laws** | \`p ∧ T ≡ p\` | \`p ∨ F ≡ p\` |
| **Domination Laws** | \`p ∨ T ≡ T\` | \`p ∧ F ≡ F\` |
| **Idempotent Laws** | \`p ∨ p ≡ p\` | \`p ∧ p ≡ p\` |
| **Double Negation** | \`¬(¬p) ≡ p\` | — |
| **Commutative Laws** | \`p ∨ q ≡ q ∨ p\` | \`p ∧ q ≡ q ∧ p\` |
| **Associative Laws** | \`(p ∨ q) ∨ r ≡ p ∨ (q ∨ r)\` | \`(p ∧ q) ∧ r ≡ p ∧ (q ∧ r)\` |
| **Distributive Laws** | \`p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r)\` | \`p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)\` |
| **De Morgan's Laws** | \`¬(p ∧ q) ≡ ¬p ∨ ¬q\` | \`¬(p ∨ q) ≡ ¬p ∧ ¬q\` |
| **Absorption Laws** | \`p ∨ (p ∧ q) ≡ p\` | \`p ∧ (p ∨ q) ≡ p\` |
| **Negation (Complement)** | \`p ∨ ¬p ≡ T\` | \`p ∧ ¬p ≡ F\` |

---

### 7. Predicates & Quantifiers (First-Order Logic)

A **predicate** P(x) is a statement containing variable x. Once a domain of discourse D is specified, quantifiers turn predicates into complete propositions.

#### 7.1 Universal Quantifier (∀x P(x))
- **Meaning**: *"P(x) is true for ALL x in domain D."*
- **Condition for True**: P(x) is true for every element in D.
- **Condition for False**: Finding a **single counterexample** c in D where P(c) is false.

#### 7.2 Existential Quantifier (∃x P(x))
- **Meaning**: *"There EXISTS at least one x in domain D such that P(x) is true."*
- **Condition for True**: Finding at least one witness c in D where P(c) is true.
- **Condition for False**: P(x) is false for every element in D.

\`\`\`text
Statement                         | Symbolic Logic (Domain: All Animals)
----------------------------------|---------------------------------------
"Every dog has four legs."        | ∀x (Dog(x) ⟹ FourLegged(x))
"Some birds cannot fly."          | ∃x (Bird(x) ∧ ¬CanFly(x))
"No fish can breathe air."        | ∀x (Fish(x) ⟹ ¬BreathesAir(x))
"There is a smart student."       | ∃x (Student(x) ∧ Smart(x))
\`\`\`

---

### 8. Negating Quantified Statements

To negate quantified statements, we use **De Morgan's Laws for Quantifiers**:

- **¬(∀x P(x))  ≡  ∃x ¬P(x)**
- **¬(∃x P(x))  ≡  ∀x ¬P(x)**

\`\`\`text
Original Statement                | Symbolic Form    | Negated Form      | English Negation
----------------------------------|------------------|-------------------|-----------------------------
"All students passed the exam."   | ∀x Passed(x)     | ∃x ¬Passed(x)     | "Some student did not pass."
"Some integers are negative."     | ∃x Negative(x)   | ∀x ¬Negative(x)   | "All integers are non-neg."
"Every prime number is odd."      | ∀x Odd(x)        | ∃x ¬Odd(x)        | "There is an even prime (2)."
\`\`\`

---

### 9. Methods of Mathematical Proof in Computer Science

Proof techniques form the foundation for proving algorithm termination, time complexity lower bounds, and software correctness.

#### 9.1 Direct Proof (p ⟹ q)
Assume hypothesis p is true, apply definitions and algebraic steps, and show that conclusion q must be true.
- *Example:* Prove that if n is odd, then n² is odd.
  - *Proof:* \`n = 2k + 1  ⟹  n² = (2k+1)² = 4k² + 4k + 1 = 2(2k² + 2k) + 1\`, which is odd. ∎

#### 9.2 Proof by Contraposition (¬q ⟹ ¬p)
Instead of proving p ⟹ q, prove the logically equivalent contrapositive ¬q ⟹ ¬p.
- *Example:* Prove that if 3n + 2 is odd, then n is odd.
  - *Contrapositive:* If n is even (n = 2k), then \`3n + 2 = 3(2k) + 2 = 6k + 2 = 2(3k + 1)\` is even. Thus ¬q ⟹ ¬p is proven. ∎

#### 9.3 Proof by Contradiction (Reductio ad Absurdum)
To prove proposition p, assume ¬p is true. Derive a logical impossibility or contradiction (such as 1 = 0 or k is both even and odd). Hence, ¬p must be false, so p is true.
- *Example:* Proof that √2 is irrational, or Euclid's proof of the infinitude of primes.

#### 9.4 Proof by Counterexample
To disprove a universal statement ∀x P(x), it suffices to construct **one concrete instance c** where P(c) is false.
- *Example:* *"All prime numbers are odd."* Counterexample: n = 2 is prime and even.

---

### 10. Boolean Satisfiability (SAT) & Logic Gates

#### 10.1 Logic Gates in Hardware Architecture
Digital computers implement propositional logic directly using transistors:
- **AND Gate (∧)**: Output 1 only if all inputs are 1.
- **OR Gate (∨)**: Output 1 if any input is 1.
- **NOT Gate / Inverter (¬)**: Inverts input (0 ↔ 1).
- **NAND / NOR Gates**: Universal gates that can implement any boolean function.

#### 10.2 Conjunctive Normal Form (CNF) & SAT
- **Literal**: A variable x or its negation ¬x.
- **Clause**: A disjunction (OR) of literals: \`(x₁ ∨ ¬x₂ ∨ x₃)\`.
- **CNF (Conjunctive Normal Form)**: An AND of OR clauses:
  \`(x₁ ∨ x₂) ∧ (¬x₁ ∨ x₃) ∧ (¬x₂ ∨ ¬x₃)\`

> [!IMPORTANT]
> **Cook-Levin Theorem (1971):**
> The **Boolean Satisfiability Problem (SAT)** was the first problem proven to be **NP-Complete**. Determining whether a boolean formula in CNF has a satisfying truth assignment is the central benchmark problem in theoretical computer science.

---

## TL;DR — Quick Recall Reference

| Concept | Symbolic Expression | Essential Rule |
|:--------|:--------------------|:---------------|
| **Negation** | \`¬p\` | Flips T ↔ F |
| **Conjunction** | \`p ∧ q\` | True only when BOTH are True |
| **Disjunction** | \`p ∨ q\` | True when AT LEAST ONE is True |
| **Implication** | \`p ⟹ q ≡ ¬p ∨ q\` | False ONLY when T ⟹ F |
| **Contrapositive** | \`¬q ⟹ ¬p\` | Equivalent to original implication p ⟹ q |
| **Converse** | \`q ⟹ p\` | NOT equivalent to p ⟹ q |
| **Tautology** | \`⊤\` or \`T\` | Always True under all assignments |
| **Contradiction** | \`⊥\` or \`F\` | Always False under all assignments |
| **De Morgan's (Logic)** | \`¬(p ∧ q) ≡ ¬p ∨ ¬q\` | \`¬(p ∨ q) ≡ ¬p ∧ ¬q\` |
| **Universal Quantifier** | \`∀x P(x)\` | True if holds for all elements |
| **Existential Quantifier**| \`∃x P(x)\` | True if holds for at least one element |
| **Quantifier Negation** | \`¬(∀x P(x)) ≡ ∃x ¬P(x)\` | \`¬(∃x P(x)) ≡ ∀x ¬P(x)\` |

---

## Additional Resources

**Interactive:**
- [Truth Table Generator & Evaluator](https://web.stanford.edu/class/cs103/tools/truth-table-tool/)
- [Logic Gate Simulator](https://logic.ly/demo/)

**Academic References:**
- *Discrete Mathematics and Its Applications* by Kenneth H. Rosen (Chapter 1: The Foundations: Logic and Proofs)
- *NPTEL Discrete Mathematics* by Prof. Sudarshan Iyengar (IIT Ropar — Week 3: Logic)
`,
  subModules: [],
  practiceQuiz: [
    {
      id: "logic-q1",
      question:
        "Which of the following sentences is a valid proposition in mathematical logic?",
      options: [
        "What a beautiful sunset!",
        "x + 5 = 10",
        "17 is a prime number.",
        "Please turn off the lights.",
      ],
      correctAnswer: 2,
      explanation:
        "A proposition must be a declarative statement that is strictly True or False. '17 is a prime number' is declarative and True. Questions, commands, and open sentences with unbound variables are not propositions.",
      difficulty: "easy",
    },
    {
      id: "logic-q2",
      question:
        "Under what condition is the conditional statement p ⟹ q FALSE?",
      options: [
        "When p is False and q is False",
        "When p is True and q is False",
        "When p is False and q is True",
        "When p is True and q is True",
      ],
      correctAnswer: 1,
      explanation:
        "An implication p ⟹ q is False in only one circumstance: when the premise p is True and the conclusion q is False (T ⟹ F). If p is False, the statement is vacuously True.",
      difficulty: "easy",
    },
    {
      id: "logic-q3",
      question:
        "What is the contrapositive of the conditional statement: 'If it rains, then the ground is wet'?",
      options: [
        "If the ground is wet, then it rains.",
        "If it does not rain, then the ground is not wet.",
        "If the ground is not wet, then it does not rain.",
        "The ground is wet or it rains.",
      ],
      correctAnswer: 2,
      explanation:
        "For p ⟹ q, the contrapositive is ¬q ⟹ ¬p: 'If the ground is not wet, then it does not rain.' The contrapositive is always logically equivalent to the original statement.",
      difficulty: "easy",
    },
    {
      id: "logic-q4",
      question:
        "According to De Morgan's Laws of Propositional Logic, ¬(p ∧ q) is logically equivalent to:",
      options: [
        "\u00acp \u2227 \u00acq",
        "\u00acp \u2228 \u00acq",
        "p \u2228 q",
        "\u00acp \u27f9 q",
      ],
      correctAnswer: 1,
      explanation:
        "De Morgan's law states that the negation of a conjunction is the disjunction of negations: ¬(p ∧ q) ≡ ¬p ∨ ¬q.",
      difficulty: "easy",
    },
    {
      id: "logic-q5",
      question: "Which of the following compound propositions is a TAUTOLOGY?",
      options: [
        "p \u2227 \u00acp",
        "p \u2228 \u00acp",
        "p \u27f9 \u00acp",
        "p \u2295 p",
      ],
      correctAnswer: 1,
      explanation:
        "p ∨ ¬p is always True regardless of whether p is True or False (Law of Excluded Middle), making it a tautology.",
      difficulty: "easy",
    },
    {
      id: "logic-q6",
      question:
        "What is the logical negation of the quantified statement: 'All software engineers write tests'?",
      options: [
        "No software engineers write tests.",
        "All software engineers do not write tests.",
        "There exists a software engineer who does not write tests.",
        "Some software engineers write tests.",
      ],
      correctAnswer: 2,
      explanation:
        "Negating ∀x P(x) yields ∃x ¬P(x): 'There exists at least one software engineer who does not write tests.'",
      difficulty: "medium",
    },
    {
      id: "logic-q7",
      question:
        "What is the equivalent disjunctive form of the implication p ⟹ q?",
      options: [
        "p \u2228 q",
        "\u00acp \u2228 q",
        "p \u2227 \u00acq",
        "\u00acp \u2227 q",
      ],
      correctAnswer: 1,
      explanation:
        "The fundamental equivalence of implication is p ⟹ q ≡ ¬p ∨ q.",
      difficulty: "easy",
    },
    {
      id: "logic-q8",
      question:
        "Which proof method establishes p ⟹ q by assuming ¬q is True and proving that ¬p must follow?",
      options: [
        "Direct Proof",
        "Proof by Contraposition",
        "Proof by Contradiction",
        "Proof by Exhaustion",
      ],
      correctAnswer: 1,
      explanation:
        "Proof by Contraposition relies on the logical equivalence (p ⟹ q) ≡ (¬q ⟹ ¬p), assuming ¬q and showing ¬p.",
      difficulty: "medium",
    },
    {
      id: "logic-q9",
      question:
        "How many rows are in the truth table for a compound proposition with 4 independent propositional variables (p, q, r, s)?",
      options: ["8", "16", "32", "64"],
      correctAnswer: 1,
      explanation:
        "Each propositional variable has 2 possible truth values (T/F). For n variables, there are 2^n rows: 2^4 = 16 rows.",
      difficulty: "easy",
    },
    {
      id: "logic-q10",
      question: "If p ⊕ q is True, which of the following MUST be true?",
      options: [
        "p and q have the same truth value",
        "p and q have different truth values",
        "Both p and q are True",
        "Both p and q are False",
      ],
      correctAnswer: 1,
      explanation:
        "Exclusive OR (XOR) evaluates to True if and only if exactly one operand is True and the other is False.",
      difficulty: "easy",
    },
    {
      id: "logic-q11",
      question: "Which of the following is the Converse of p ⟹ q?",
      options: [
        "\u00acp \u27f9 \u00acq",
        "q \u27f9 p",
        "\u00acq \u27f9 \u00acp",
        "q \u2227 p",
      ],
      correctAnswer: 1,
      explanation:
        "The Converse of p ⟹ q is obtained by reversing hypothesis and conclusion: q ⟹ p.",
      difficulty: "easy",
    },
    {
      id: "logic-q12",
      question: "Which of the following is the Inverse of p ⟹ q?",
      options: [
        "\u00acp \u27f9 \u00acq",
        "q \u27f9 p",
        "\u00acq \u27f9 \u00acp",
        "\u00acp \u2228 q",
      ],
      correctAnswer: 0,
      explanation:
        "The Inverse of p ⟹ q is obtained by negating both hypothesis and conclusion: ¬p ⟹ ¬q.",
      difficulty: "easy",
    },
    {
      id: "logic-q13",
      question: "What is the absorption law in propositional logic?",
      options: [
        "p \u2228 (p \u2227 q) \u2261 p",
        "p \u2228 \u00acp \u2261 T",
        "p \u2227 T \u2261 p",
        "\u00ac(p \u2227 q) \u2261 \u00acp \u2228 \u00acq",
      ],
      correctAnswer: 0,
      explanation:
        "The Absorption Law states that p ∨ (p ∧ q) ≡ p and p ∧ (p ∨ q) ≡ p.",
      difficulty: "medium",
    },
    {
      id: "logic-q14",
      question: "In First-Order Logic, what does ∃!x P(x) denote?",
      options: [
        "There does not exist any x such that P(x)",
        "P(x) is true for all x except one",
        "There exists EXACTLY ONE unique x such that P(x)",
        "There exists at least two x such that P(x)",
      ],
      correctAnswer: 2,
      explanation:
        "The notation ∃!x P(x) (Uniqueness Quantifier) means there is one and only one element x in the domain satisfying P(x).",
      difficulty: "medium",
    },
    {
      id: "logic-q15",
      question:
        "What is the negation of the proposition: 'If x > 0, then x² > 0'?",
      options: [
        "If x \u2264 0, then x\u00b2 \u2264 0.",
        "x > 0 and x\u00b2 \u2264 0.",
        "If x\u00b2 \u2264 0, then x \u2264 0.",
        "x \u2264 0 or x\u00b2 > 0.",
      ],
      correctAnswer: 1,
      explanation:
        "Since ¬(p ⟹ q) ≡ ¬(¬p ∨ q) ≡ p ∧ ¬q, the negation is: 'x > 0 AND x² ≤ 0'.",
      difficulty: "medium",
    },
    {
      id: "logic-q16",
      question:
        "Which problem was proven to be the first NP-Complete problem by the Cook-Levin theorem?",
      options: [
        "Travelling Salesperson Problem",
        "Boolean Satisfiability Problem (SAT)",
        "Graph Coloring Problem",
        "Knapsack Problem",
      ],
      correctAnswer: 1,
      explanation:
        "Stephen Cook (1971) and Leonid Levin proved that the Boolean Satisfiability (SAT) problem is NP-Complete.",
      difficulty: "medium",
    },
    {
      id: "logic-q17",
      question:
        "Which universal digital logic gates can be used to construct any arbitrary boolean logic function?",
      options: ["AND and OR", "NAND and NOR", "XOR and XNOR", "NOT and BUFFER"],
      correctAnswer: 1,
      explanation:
        "NAND and NOR gates are functionally complete (universal) gates; any logical circuit can be constructed entirely using only NAND or only NOR gates.",
      difficulty: "medium",
    },
    {
      id: "logic-q18",
      question:
        "If proposition p is False, q is True, and r is False, what is the truth value of (p ∨ q) ⟹ (q ∧ r)?",
      options: ["True", "False", "Cannot be determined", "Contradiction"],
      correctAnswer: 1,
      explanation:
        "p ∨ q = F ∨ T = True. q ∧ r = T ∧ F = False. Therefore, True ⟹ False = False.",
      difficulty: "easy",
    },
    {
      id: "logic-q19",
      question:
        "What is the logical formula representing a Conjunctive Normal Form (CNF)?",
      options: [
        "A disjunction (OR) of conjunctions (ANDs)",
        "A conjunction (AND) of disjunctions (ORs)",
        "A sequence of nested implications",
        "A single negated quantifier",
      ],
      correctAnswer: 1,
      explanation:
        "Conjunctive Normal Form (CNF) is a conjunction (AND) of one or more clauses, where each clause is a disjunction (OR) of literals: (A ∨ B) ∧ (¬A ∨ C).",
      difficulty: "medium",
    },
    {
      id: "logic-q20",
      question:
        "Which proof technique assumes ¬p is true to show that it leads to a logical contradiction, thereby proving p?",
      options: [
        "Direct Proof",
        "Proof by Contradiction (Reductio ad Absurdum)",
        "Proof by Mathematical Induction",
        "Constructive Proof",
      ],
      correctAnswer: 1,
      explanation:
        "Proof by Contradiction (Reductio ad Absurdum) assumes the negation of the proposition and derives an impossibility (such as p ∧ ¬p or 1 = 0), proving that the original proposition must be True.",
      difficulty: "easy",
    },
  ],
};
