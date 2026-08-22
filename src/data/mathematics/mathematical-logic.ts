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
> \`p ⟹ q  ≡  ¬p ∨ q\`

#### 3.2 The Biconditional (p ⟺ q)
**p ⟺ q** states *"p if and only if q"* (often written **iff**).
It is True whenever p and q share the **exact same truth value** (T ⟺ T and F ⟺ F).
> \`p ⟺ q  ≡  (p ⟹ q) ∧ (q ⟹ p)\`

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

#### 7.3 Multi-Variable Predicates & Translation Patterns (GATE AIR 1 Core Rules)

In GATE, questions frequently involve binary relational predicates P(x, y) (e.g., M(x, y): *"x knows y"*, L(x, y): *"x loves y"*, D(x, y): *"x divides y"*) over a domain D.

\`\`\`text
╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                 THE GOLDEN QUANTIFIER RULE                                        ║
║  1. Universal Quantifier (∀x) naturally pairs with IMPLICATION (→)                               ║
║     "Every student who studies passes"  ⟹  ∀x (Student(x) ∧ Studies(x) → Passes(x))              ║
║     [Trap: Using ∧ with ∀ makes it assert EVERY object in the universe is a student!]            ║
║                                                                                                  ║
║  2. Existential Quantifier (∃x) naturally pairs with CONJUNCTION (∧)                             ║
║     "There is a student who passes"     ⟹  ∃x (Student(x) ∧ Passes(x))                           ║
║     [Trap: Using → with ∃ is vacuously True if any non-student exists in the universe!]          ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
\`\`\`

##### 🌟 The Celebrity / Master Problem Pattern:
Consider predicate M(x, y) meaning *"x knows y"*:

1. **"Person y is known by everyone else (excluding themselves)":**
   > \`∀x ((x ≠ y) ⟹ M(x, y))\`
2. **"Person y knows nobody else (excluding themselves)":**
   > \`∀x ((x ≠ y) ⟹ ¬M(y, x))\`
3. **"There exists a person y who knows nobody else, but is known by everyone else":**
   Combining the two properties with an existential witness y:
   > \`(∃y)(∀x)((x ≠ y) ⟹ (M(x, y) ∧ ¬M(y, x)))\`

> [!IMPORTANT]
> **Order of Quantifiers Matters:**
> - \`∃y ∀x P(x, y)\` asserts **ONE single person y** works for all x simultaneously (Strong statement).
> - \`∀x ∃y P(x, y)\` allows each x to have their own different y (Weaker statement).
> - **Implication:** \`∃y ∀x P(x, y) ⟹ ∀x ∃y P(x, y)\`, but the converse is FALSE!

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

#### 9.5 Principle of Mathematical Induction (PMI in First-Order Logic)

Mathematical induction is a fundamental proof technique for establishing that a predicate P(x) holds for all natural numbers ℕ = {0, 1, 2, ...}.

##### 🌟 The Formal Axiom of Induction:
> \`(P(0) ∧ ∀x [P(x) ⟹ P(x+1)]) ⟹ ∀x P(x)\`

- **Base Case (P(0)):** Proves that the property holds for the minimal starting element x = 0.
- **Inductive Step (∀x [P(x) ⟹ P(x+1)]):** Proves that truth transfers from any number x to its immediate successor x + 1 (the "domino effect").
- **Universal Conclusion (∀x P(x)):** Because 0 holds, 1 holds; because 1 holds, 2 holds; and so forth, guaranteeing P(x) for all x ∈ ℕ.

> [!WARNING]
> **GATE Common Induction Fallacies (AIR 1 Traps):**
> 1. **Backward Step Fallacy:** \`(P(0) ∧ ∀x [P(x) ⟹ P(x-1)])\` DOES NOT imply \`∀x P(x)\`  
>    *Flaw:* From 0, going backward (x - 1) cannot prove truth for positive numbers 1, 2, 3, ...
> 2. **Truncated Base Fallacy:** \`(P(1000) ∧ ∀x [P(x) ⟹ P(x+1)])\` DOES NOT imply \`∀x P(x)\`  
>    *Flaw:* Only proves truth for x ≥ 1000; it leaves 0, 1, ..., 999 unverified.
> 3. **Strong Induction:** \`(P(0) ∧ ∀x [(∀k ≤ x P(k)) ⟹ P(x+1)]) ⟹ ∀x P(x)\`.

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
| **Mathematical Induction**| \`[P(0) ∧ ∀x(P(x)⇒P(x+1))] ⇒ ∀xP(x)\` | Proves universal validity over ℕ |

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
      id: "logic-gate-2026-set2",
      gateYear: "GATE CSE 2026 Set-2",
      topicTag: "First-Order Predicate Logic",
      question:
        "For two different persons x and y, the predicate M(x, y) denotes that x knows y. Which expression represents: 'There is a person who does not know anyone else, but that person is known by everyone else'?",
      options: [
        "(∃y)(∀x)((x ≠ y) → (M(x, y) ∧ ¬M(y, x)))",
        "(∀y)(∃x)((x ≠ y) → (M(x, y) ∧ ¬M(y, x)))",
        "(∃y)(∃x)((x ≠ y) → (M(x, y) ∧ ¬M(y, x)))",
        "(∀y)(∀x)((x ≠ y) → (M(x, y) ∧ ¬M(y, x)))",
      ],
      correctAnswer: 0,
      explanation:
        "AIR 1 Analysis:\n1) 'There is a person' asserts existence of a single individual y → (∃y).\n2) 'everyone else' asserts a condition for all other individuals x (x ≠ y) → (∀x).\n3) For all other x: 'known by x' is M(x, y) and 'does not know x' is ¬M(y, x).\n4) Combining under the domain filter (x ≠ y) gives (x ≠ y) → (M(x, y) ∧ ¬M(y, x)).\n\nOverall formula: (∃y)(∀x)((x ≠ y) → (M(x, y) ∧ ¬M(y, x))).",
      difficulty: "hard",
    },
    {
      id: "logic-gate-2025-set2",
      gateYear: "GATE CSE 2025 Set-2",
      topicTag: "Mathematical Induction & Predicates",
      question:
        "Let P(x) be an arbitrary predicate over the domain of natural numbers. Which ONE of the following statements is TRUE?",
      options: [
        "(P(0) ∧ (∀x[P(x) ⇒ P(x+1)])) ⇒ (∀xP(x))",
        "(P(0) ∧ (∀x[P(x) ⇒ P(x-1)])) ⇒ (∀xP(x))",
        "(P(1000) ∧ (∀x[P(x) ⇒ P(x-1)])) ⇒ (∀xP(x))",
        "(P(1000) ∧ (∀x[P(x) ⇒ P(x+1)])) ⇒ (∀xP(x))",
      ],
      correctAnswer: 0,
      explanation:
        "AIR 1 Analysis:\n1) Option A is the exact First-Order Logic formal statement of the Principle of Mathematical Induction (Peano Axiom 5).\n2) Base Step: P(0) is True.\n3) Inductive Step: ∀x [P(x) ⇒ P(x+1)] guarantees the truth cascades forward to 1, 2, 3, ... to all natural numbers.\n4) Options B & C fail because backward implication P(x) ⇒ P(x-1) cannot reach numbers greater than the base.\n5) Option D fails because starting at P(1000) leaves all numbers from 0 to 999 unproven.",
      difficulty: "medium",
    },
  ],
};
