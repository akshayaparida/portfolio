import { LearningModule } from "@/types/learning";

export const numberSeriesModule: LearningModule = {
  id: "number-series",
  title: "1. Number & Letter Series",
  description: "Pattern recognition in number and letter sequences",
  status: "in-progress",
  tags: ["Reasoning"],
  detailedContent: `# Number & Letter Series

> **Pattern Recognition** - Find the hidden rule in sequences

---

## What You'll Learn

1. Identify patterns in number series
2. Solve letter series problems
3. Handle mixed (alphanumeric) series
4. Apply quick tricks for exams

---

## 1. Number Series Patterns

### Addition/Subtraction Series

\`\`\`text
Pattern: Add or subtract a constant

Example 1: 2, 5, 8, 11, ?
Difference: +3, +3, +3, +3
Answer: 14

Example 2: 100, 90, 80, 70, ?
Difference: -10, -10, -10, -10
Answer: 60
\`\`\`

### Multiplication/Division Series

\`\`\`text
Pattern: Multiply or divide by a constant

Example: 3, 6, 12, 24, ?
Ratio: ×2, ×2, ×2, ×2
Answer: 48

Example: 256, 64, 16, 4, ?
Ratio: ÷4, ÷4, ÷4, ÷4
Answer: 1
\`\`\`

### Square/Cube Series

\`\`\`text
Pattern: Perfect squares or cubes

Squares: 1, 4, 9, 16, 25, ? = 36 (1², 2², 3², 4², 5², 6²)
Cubes: 1, 8, 27, 64, ? = 125 (1³, 2³, 3³, 4³, 5³)
\`\`\`

### Alternate/Mixed Series

\`\`\`text
Two patterns alternating

Example: 2, 5, 3, 6, 4, ?
Pattern 1: 2, 3, 4 (position 1, 3, 5: +1)
Pattern 2: 5, 6, ? (position 2, 4, 6: +1)
Answer: 7
\`\`\`

### Fibonacci-like Series

\`\`\`text
Each term = sum of previous two terms

Example: 1, 1, 2, 3, 5, 8, ?
1+1=2, 1+2=3, 2+3=5, 3+5=8, 5+8=13
Answer: 13
\`\`\`

---

## 2. Letter Series

### Position Values

\`\`\`text
A=1, B=2, C=3, ... Z=26

Trick: L=12 (middle), M=13
Quick: A=1, E=5, I=9, O=15
\`\`\`

### Skip Pattern

\`\`\`text
Example: A, C, E, G, ?
Skip: +2 letters each time
Answer: I

Example: Z, X, V, T, ?
Skip: -2 letters each time
Answer: R
\`\`\`

### Opposite Letters

\`\`\`text
A↔Z (1+26=27), B↔Y, C↔X, D↔W...
Sum of positions = 27

Example: If A→Z, then M→?
M=13, so opposite = 27-13 = 14 = N
\`\`\`

---

## 3. Mixed Series

\`\`\`text
Example: A1, B2, C3, D4, ?
Pattern: Letter advances +1, Number advances +1
Answer: E5

Example: Z1, Y2, X3, W4, ?
Pattern: Letter goes backward, Number goes forward
Answer: V5
\`\`\`

---

## Key Tricks

| Pattern Type | How to Identify |
|:-------------|:----------------|
| Arithmetic | Constant difference |
| Geometric | Constant ratio |
| Squares | 1, 4, 9, 16... check if n² |
| Fibonacci | Sum of previous two |
| Alternate | Check odd/even positions separately |

---

## Quick Solving Steps

1. **Find differences** between consecutive terms
2. **If differences are constant** → arithmetic
3. **If differences increase/decrease** → check ratios or squares
4. **If no pattern** → check alternate positions
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "ns-q1",
      question: "Find the next: 2, 6, 18, 54, ?",
      options: ["108", "162", "180", "216"],
      correctAnswer: 1,
      explanation: "Multiply by 3 each time: 2×3=6, 6×3=18, 18×3=54, 54×3=162",
      difficulty: "easy",
    },
    {
      id: "ns-q2",
      question: "Find the next: 1, 4, 9, 16, 25, ?",
      options: ["30", "36", "49", "64"],
      correctAnswer: 1,
      explanation: "Perfect squares: 1², 2², 3², 4², 5², 6²=36",
      difficulty: "easy",
    },
    {
      id: "ns-q3",
      question: "Find the next: A, D, G, J, ?",
      options: ["K", "L", "M", "N"],
      correctAnswer: 2,
      explanation: "Skip 2 letters: A+3=D, D+3=G, G+3=J, J+3=M",
      difficulty: "easy",
    },
    {
      id: "ns-q4",
      question: "Find the next: 3, 5, 9, 15, 23, ?",
      options: ["31", "33", "35", "37"],
      correctAnswer: 1,
      explanation: "Differences: +2, +4, +6, +8, +10. So 23+10=33",
      difficulty: "medium",
    },
    {
      id: "ns-q5",
      question: "The opposite letter of M is:",
      options: ["L", "N", "O", "P"],
      correctAnswer: 1,
      explanation: "M=13, Opposite=27-13=14=N. Sum of letter pairs = 27",
      difficulty: "easy",
    },
    {
      id: "ns-q6",
      question: "Find the next: 2, 3, 5, 7, 11, ?",
      options: ["12", "13", "14", "15"],
      correctAnswer: 1,
      explanation: "Prime numbers: 2, 3, 5, 7, 11, 13 (next prime)",
      difficulty: "medium",
    },
    {
      id: "ns-q7",
      question: "Find the next: 1, 1, 2, 3, 5, 8, ?",
      options: ["11", "12", "13", "14"],
      correctAnswer: 2,
      explanation: "Fibonacci: Each = sum of previous two. 5+8=13",
      difficulty: "easy",
    },
    {
      id: "ns-q8",
      question: "Find the missing: 2, 5, 4, 7, 6, 9, ?, 11",
      options: ["7", "8", "10", "12"],
      correctAnswer: 1,
      explanation: "Two series: 2,4,6,? (+2) and 5,7,9,11 (+2). Missing=8",
      difficulty: "medium",
    },
    {
      id: "ns-q9",
      question: "Position of letter L in alphabet is:",
      options: ["10", "11", "12", "13"],
      correctAnswer: 2,
      explanation: "L = 12th letter. Remember: J=10, K=11, L=12, M=13",
      difficulty: "easy",
    },
    {
      id: "ns-q10",
      question: "Find the next: 1, 8, 27, 64, ?",
      options: ["100", "125", "216", "343"],
      correctAnswer: 1,
      explanation: "Perfect cubes: 1³, 2³, 3³, 4³, 5³=125",
      difficulty: "easy",
    },
  ],
};
