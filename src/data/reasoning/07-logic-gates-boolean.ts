import { LearningModule } from "@/types/learning";

export const logicGatesBooleanModule: LearningModule = {
  id: "logic-gates-boolean",
  title: "7. Logic Gates & Boolean Algebra",
  description: "AND, OR, NOT gates, Boolean expressions, simplification",
  status: "in-progress",
  tags: ["Digital"],
  detailedContent: `# Logic Gates & Boolean Algebra

> **Digital Fundamentals** - Building blocks of digital circuits

---

## What You'll Learn

1. Understand basic logic gates
2. Build truth tables
3. Simplify Boolean expressions
4. Apply De Morgan's laws

---

## 1. Basic Logic Gates

### AND Gate

\`\`\`text
Symbol: A · B or A ∧ B or AB

A  B | Output
0  0 |   0
0  1 |   0
1  0 |   0
1  1 |   1

Output is 1 only when ALL inputs are 1
\`\`\`

### OR Gate

\`\`\`text
Symbol: A + B or A ∨ B

A  B | Output
0  0 |   0
0  1 |   1
1  0 |   1
1  1 |   1

Output is 1 when ANY input is 1
\`\`\`

### NOT Gate (Inverter)

\`\`\`text
Symbol: A' or Ā or ¬A

A | Output
0 |   1
1 |   0

Flips the input
\`\`\`

---

## 2. Universal Gates

### NAND Gate (NOT + AND)

\`\`\`text
Symbol: (A · B)'

A  B | Output
0  0 |   1
0  1 |   1
1  0 |   1
1  1 |   0

Universal: Can build any gate using only NAND
\`\`\`

### NOR Gate (NOT + OR)

\`\`\`text
Symbol: (A + B)'

A  B | Output
0  0 |   1
0  1 |   0
1  0 |   0
1  1 |   0

Universal: Can build any gate using only NOR
\`\`\`

---

## 3. Other Gates

### XOR (Exclusive OR)

\`\`\`text
Symbol: A ⊕ B

A  B | Output
0  0 |   0
0  1 |   1
1  0 |   1
1  1 |   0

Output is 1 when inputs are DIFFERENT
\`\`\`

### XNOR (Exclusive NOR)

\`\`\`text
Symbol: (A ⊕ B)'

A  B | Output
0  0 |   1
0  1 |   0
1  0 |   0
1  1 |   1

Output is 1 when inputs are SAME
\`\`\`

---

## 4. Boolean Laws

### Basic Laws

\`\`\`text
Identity:     A + 0 = A       A · 1 = A
Null:         A + 1 = 1       A · 0 = 0
Idempotent:   A + A = A       A · A = A
Complement:   A + A' = 1      A · A' = 0
Double Neg:   (A')' = A
\`\`\`

### De Morgan's Laws

\`\`\`text
(A + B)' = A' · B'
(A · B)' = A' + B'

"Break the bar, change the sign"
\`\`\`

### Other Laws

\`\`\`text
Commutative:   A + B = B + A       A · B = B · A
Associative:   (A+B)+C = A+(B+C)   (AB)C = A(BC)
Distributive:  A(B+C) = AB + AC
               A+BC = (A+B)(A+C)

Absorption:    A + AB = A
               A(A + B) = A
\`\`\`

---

## 5. Boolean Simplification

### Example 1

\`\`\`text
Simplify: AB + AB'

= A(B + B')     [Factor out A]
= A(1)          [Complement law]
= A             [Identity law]
\`\`\`

### Example 2

\`\`\`text
Simplify: (A + B)(A + B')

= A + BB'       [Distributive]
= A + 0         [Complement]
= A             [Identity]
\`\`\`

---

## 6. Gate Summary

| Gate | Symbol | Output = 1 when |
|:-----|:-------|:---------------|
| AND | A·B | Both inputs 1 |
| OR | A+B | Any input 1 |
| NOT | A' | Input is 0 |
| NAND | (A·B)' | NOT all 1s |
| NOR | (A+B)' | All inputs 0 |
| XOR | A⊕B | Inputs different |
| XNOR | (A⊕B)' | Inputs same |

---

## Key Points

- **NAND and NOR** are universal gates
- **XOR** is useful for addition circuits
- **De Morgan's** helps convert between AND/OR
- **Simplify** before building circuits!
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "lg-q1",
      question: "The output of AND gate is 1 when:",
      options: [
        "Any input is 1",
        "All inputs are 1",
        "All inputs are 0",
        "No input is 1",
      ],
      correctAnswer: 1,
      explanation: "AND gate: Output = 1 only when ALL inputs are 1.",
      difficulty: "easy",
    },
    {
      id: "lg-q2",
      question: "Which are universal gates?",
      options: ["AND, OR", "NAND, NOR", "XOR, XNOR", "NOT, AND"],
      correctAnswer: 1,
      explanation:
        "NAND and NOR are universal - any logic circuit can be built using just one of them.",
      difficulty: "easy",
    },
    {
      id: "lg-q3",
      question: "XOR gate gives output 1 when:",
      options: [
        "Inputs are same",
        "Inputs are different",
        "All inputs are 1",
        "All inputs are 0",
      ],
      correctAnswer: 1,
      explanation: "XOR (Exclusive OR): Output = 1 when inputs are different.",
      difficulty: "easy",
    },
    {
      id: "lg-q4",
      question: "De Morgan's law states (A + B)' equals:",
      options: ["A' + B'", "A' · B'", "(A · B)'", "A + B"],
      correctAnswer: 1,
      explanation: "De Morgan: (A+B)' = A'·B'. Break the bar, change the sign.",
      difficulty: "easy",
    },
    {
      id: "lg-q5",
      question: "Simplify: A + A·B",
      options: ["A", "B", "AB", "A + B"],
      correctAnswer: 0,
      explanation: "Absorption law: A + AB = A(1 + B) = A·1 = A",
      difficulty: "medium",
    },
    {
      id: "lg-q6",
      question: "A · A' equals:",
      options: ["A", "1", "0", "A'"],
      correctAnswer: 2,
      explanation: "Complement law: A · A' = 0 (AND of opposites is always 0)",
      difficulty: "easy",
    },
    {
      id: "lg-q7",
      question: "The output of NOR gate with inputs A=1, B=0 is:",
      options: ["0", "1", "Undefined", "Depends"],
      correctAnswer: 0,
      explanation: "NOR = NOT(OR). OR(1,0)=1. NOT(1)=0.",
      difficulty: "easy",
    },
    {
      id: "lg-q8",
      question: "NAND gate is equivalent to:",
      options: [
        "AND followed by NOT",
        "OR followed by NOT",
        "NOT followed by AND",
        "XOR followed by NOT",
      ],
      correctAnswer: 0,
      explanation: "NAND = NOT(AND). Perform AND first, then invert.",
      difficulty: "easy",
    },
    {
      id: "lg-q9",
      question: "Simplify: (A')' ",
      options: ["0", "1", "A", "A'"],
      correctAnswer: 2,
      explanation: "Double negation: (A')' = A. NOT of NOT returns original.",
      difficulty: "easy",
    },
    {
      id: "lg-q10",
      question: "For XNOR gate, output is 1 when A=1, B=1:",
      options: ["True", "False", "Cannot determine", "Depends on other inputs"],
      correctAnswer: 0,
      explanation: "XNOR gives 1 when inputs are SAME. 1=1, so output = 1.",
      difficulty: "easy",
    },
  ],
};
