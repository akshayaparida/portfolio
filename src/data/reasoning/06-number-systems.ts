import { LearningModule } from "@/types/learning";

export const numberSystemsModule: LearningModule = {
  id: "number-systems",
  title: "6. Number Systems",
  description: "Binary, Octal, Decimal, Hexadecimal conversions",
  status: "in-progress",
  tags: ["Digital"],
  detailedContent: `# Number Systems

> **Digital Fundamentals** - How computers represent numbers

---

## What You'll Learn

1. Convert between number systems
2. Understand binary arithmetic
3. Handle signed numbers (1's and 2's complement)
4. Recognize common bit patterns

---

## 1. Number System Basics

| System | Base | Digits |
|:-------|:-----|:-------|
| Binary | 2 | 0, 1 |
| Octal | 8 | 0-7 |
| Decimal | 10 | 0-9 |
| Hexadecimal | 16 | 0-9, A-F |

### Notation

\`\`\`text
(1010)₂ = Binary
(12)₈ = Octal
(10)₁₀ = Decimal
(A)₁₆ = Hexadecimal

Also written as: 0b1010, 012, 10, 0xA
\`\`\`

---

## 2. Decimal to Binary Conversion

### Divide by 2 Method

\`\`\`text
Convert 25 to binary:
25 ÷ 2 = 12 remainder 1
12 ÷ 2 = 6  remainder 0
6  ÷ 2 = 3  remainder 0
3  ÷ 2 = 1  remainder 1
1  ÷ 2 = 0  remainder 1

Read remainders bottom-up: 11001
(25)₁₀ = (11001)₂
\`\`\`

---

## 3. Binary to Decimal Conversion

### Positional Value Method

\`\`\`text
(1101)₂ = ?

Position:  3   2   1   0
Binary:    1   1   0   1
Value:     2³  2²  2¹  2⁰
         = 8 + 4 + 0 + 1 = 13

(1101)₂ = (13)₁₀
\`\`\`

---

## 4. Binary ↔ Octal ↔ Hex

### Binary to Octal (Group by 3)

\`\`\`text
Binary: 110101
Group: 110 | 101
Octal:  6  |  5
Answer: (65)₈
\`\`\`

### Binary to Hex (Group by 4)

\`\`\`text
Binary: 11010101
Group: 1101 | 0101
Hex:    D   |  5
Answer: (D5)₁₆

Hex values: A=10, B=11, C=12, D=13, E=14, F=15
\`\`\`

---

## 5. Quick Reference Table

| Decimal | Binary | Octal | Hex |
|:--------|:-------|:------|:----|
| 0 | 0000 | 0 | 0 |
| 1 | 0001 | 1 | 1 |
| 2 | 0010 | 2 | 2 |
| 3 | 0011 | 3 | 3 |
| 4 | 0100 | 4 | 4 |
| 5 | 0101 | 5 | 5 |
| 6 | 0110 | 6 | 6 |
| 7 | 0111 | 7 | 7 |
| 8 | 1000 | 10 | 8 |
| 9 | 1001 | 11 | 9 |
| 10 | 1010 | 12 | A |
| 15 | 1111 | 17 | F |

---

## 6. Binary Arithmetic

### Addition

\`\`\`text
  0 + 0 = 0
  0 + 1 = 1
  1 + 0 = 1
  1 + 1 = 10 (0, carry 1)

Example:
  1011 (11)
+ 0110 (6)
------
 10001 (17)
\`\`\`

### Subtraction

\`\`\`text
Use 2's complement!
A - B = A + (2's complement of B)
\`\`\`

---

## 7. Signed Numbers

### 1's Complement

\`\`\`text
Flip all bits
5 = 0101
1's complement = 1010 = -5
\`\`\`

### 2's Complement (Most Common)

\`\`\`text
1's complement + 1
5 = 0101
2's complement = 1010 + 1 = 1011 = -5

To subtract: Add 2's complement
7 - 5 = 7 + (-5)
= 0111 + 1011 = 10010
Discard overflow: 0010 = 2 ✓
\`\`\`

---

## Key Formulas

| Conversion | Method |
|:-----------|:-------|
| Dec → Bin | Divide by 2, collect remainders |
| Bin → Dec | Sum of (bit × 2^position) |
| Bin → Oct | Group by 3 bits |
| Bin → Hex | Group by 4 bits |
| 2's Comp | Flip bits + 1 |
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "ns-d-q1",
      question: "(1010)₂ in decimal is:",
      options: ["8", "10", "12", "20"],
      correctAnswer: 1,
      explanation: "1×8 + 0×4 + 1×2 + 0×1 = 8+2 = 10",
      difficulty: "easy",
    },
    {
      id: "ns-d-q2",
      question: "(25)₁₀ in binary is:",
      options: ["10101", "11001", "11101", "10011"],
      correctAnswer: 1,
      explanation: "25 = 16+8+1 = 2⁴+2³+2⁰ = 11001",
      difficulty: "easy",
    },
    {
      id: "ns-d-q3",
      question: "(F)₁₆ in decimal is:",
      options: ["14", "15", "16", "17"],
      correctAnswer: 1,
      explanation: "Hex F = 15. Hex values: A=10, B=11, C=12, D=13, E=14, F=15",
      difficulty: "easy",
    },
    {
      id: "ns-d-q4",
      question: "(110101)₂ in octal is:",
      options: ["63", "65", "53", "35"],
      correctAnswer: 1,
      explanation: "Group by 3: 110|101 = 6|5 = (65)₈",
      difficulty: "easy",
    },
    {
      id: "ns-d-q5",
      question: "2's complement of 0101 (4 bits) is:",
      options: ["1010", "1011", "0101", "1100"],
      correctAnswer: 1,
      explanation: "1's complement of 0101 = 1010. Add 1: 1010+1 = 1011",
      difficulty: "medium",
    },
    {
      id: "ns-d-q6",
      question: "(1011)₂ + (0110)₂ = ?",
      options: ["10001", "10010", "10101", "10011"],
      correctAnswer: 0,
      explanation: "1011 (11) + 0110 (6) = 10001 (17)",
      difficulty: "easy",
    },
    {
      id: "ns-d-q7",
      question: "(255)₁₀ in hexadecimal is:",
      options: ["FE", "FF", "EF", "100"],
      correctAnswer: 1,
      explanation: "255 = 15×16 + 15 = F×16 + F = (FF)₁₆",
      difficulty: "easy",
    },
    {
      id: "ns-d-q8",
      question: "In 8-bit representation, the range of unsigned integers is:",
      options: ["0 to 127", "0 to 255", "-128 to 127", "1 to 256"],
      correctAnswer: 1,
      explanation: "8 bits unsigned: 0 to 2⁸-1 = 0 to 255",
      difficulty: "medium",
    },
    {
      id: "ns-d-q9",
      question: "(17)₈ in binary is:",
      options: ["1111", "10111", "1110", "001111"],
      correctAnswer: 0,
      explanation: "Expand each octal digit: 1=001, 7=111 → 001111 or 1111",
      difficulty: "easy",
    },
    {
      id: "ns-d-q10",
      question: "Which is the largest: (1111)₂, (15)₈, (16)₁₀, (F)₁₆?",
      options: ["(1111)₂", "(15)₈", "(16)₁₀", "All equal"],
      correctAnswer: 2,
      explanation: "(1111)₂=15, (15)₈=13, (16)₁₀=16, (F)₁₆=15. 16 is largest.",
      difficulty: "medium",
    },
  ],
};
