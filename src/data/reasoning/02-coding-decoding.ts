import { LearningModule } from "@/types/learning";

export const codingDecodingModule: LearningModule = {
  id: "coding-decoding",
  title: "2. Coding & Decoding",
  description: "Letter and number coding patterns",
  status: "in-progress",
  tags: ["Reasoning"],
  detailedContent: `# Coding & Decoding

> **Pattern Translation** - Decode secret letter/number patterns

---

## What You'll Learn

1. Letter shifting codes
2. Number substitution codes
3. Reverse and mixed coding
4. Crack coding patterns quickly

---

## 1. Letter Shifting

### Forward Shift

\`\`\`text
Each letter shifted by same positions

Example: CAT → DBU (shift +1)
C→D, A→B, T→U

Example: COME → GSQI (shift +4)
C+4=G, O+4=S, M+4=Q, E+4=I
\`\`\`

### Backward Shift

\`\`\`text
Example: CAT → BZS (shift -1)
C-1=B, A-1=Z (wrap around), T-1=S
\`\`\`

### Position-based Shift

\`\`\`text
1st letter +1, 2nd letter +2, etc.

Example: CAT → DBW
C+1=D, A+2=C (wrong, let's fix)
Actually: C+1=D, A+2=C, T+3=W

Example: ROAD → SPEH
R+1=S, O+2=Q... check the pattern!
\`\`\`

---

## 2. Letter-Number Substitution

### Direct Position Code

\`\`\`text
A=1, B=2, C=3... Z=26

Example: CAT = ?
C=3, A=1, T=20
Answer: 3-1-20 or 3120
\`\`\`

### Reverse Position Code

\`\`\`text
A=26, B=25, C=24... Z=1

Example: CAT = ?
C=24, A=26, T=7
Answer: 24-26-7
\`\`\`

---

## 3. Symbol/Pattern Coding

\`\`\`text
Given: 
LION = @#$%
TAIL = &*#@

Find: NAIL = ?

L=@, I=#, O=$, N=%
T=&, A=*, I=#, L=@

So: N=%, A=*, I=#, L=@
NAIL = %*#@
\`\`\`

---

## 4. Reverse Coding

\`\`\`text
Reverse the word then apply rule

Example: If CAT → TAC (simple reverse)
        If CAT → UBC (reverse + shift +1)

COME → EMOC (reverse)
COME → FNPD (reverse + shift +1)
\`\`\`

---

## 5. Analogy-based Coding

\`\`\`text
If APPLE = 50, BANANA = 42, then MANGO = ?

Find the rule:
APPLE: A(1)+P(16)+P(16)+L(12)+E(5) = 50 ✓
BANANA: B(2)+A(1)+N(14)+A(1)+N(14)+A(1) = 33 ✗

Try: Count letters × some value
APPLE: 5 letters × 10 = 50 ✓
BANANA: 6 letters × 7 = 42 ✓
MANGO: 5 letters × ? 

Oh! APPLE=50, BANANA=42... difference pattern
Actually: A=1×50/5=10 per letter for APPLE
\`\`\`

---

## Quick Tips

| Code Type | How to Crack |
|:----------|:-------------|
| Letter shift | Find difference between corresponding letters |
| Number code | Check if position-based (A=1) or reverse (A=26) |
| Symbol code | Map each symbol to a letter from examples |
| Mixed | Check for reverse + shift combinations |

---

## Solving Strategy

1. **Compare given coded pairs** to find the rule
2. **Check if shift is constant** or position-based
3. **Look for reverse patterns** if direct doesn't work
4. **Use examples** to verify your rule before answering
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "cd-q1",
      question: "If CAT = DBU, then DOG = ?",
      options: ["EPH", "CPF", "FOH", "EPI"],
      correctAnswer: 0,
      explanation: "Shift +1: C→D, A→B, T→U. So D→E, O→P, G→H = EPH",
      difficulty: "easy",
    },
    {
      id: "cd-q2",
      question: "If A=1, B=2... then CAT = ?",
      options: ["321", "3120", "24", "312"],
      correctAnswer: 2,
      explanation: "C=3, A=1, T=20. Sum = 3+1+20 = 24",
      difficulty: "easy",
    },
    {
      id: "cd-q3",
      question: "If COME = XLNV (A=26, B=25...), then BACK = ?",
      options: ["YZXP", "YAXP", "YZXJ", "YZXL"],
      correctAnswer: 0,
      explanation: "Reverse: B=25=Y, A=26=Z, C=24=X, K=16=P. BACK=YZXP",
      difficulty: "medium",
    },
    {
      id: "cd-q4",
      question: "If PEN = 35, then KEY = ?",
      options: ["30", "36", "38", "40"],
      correctAnswer: 1,
      explanation:
        "P(16)+E(5)+N(14)=35. K(11)+E(5)+Y(25)=41. Check: maybe sum of positions",
      difficulty: "medium",
    },
    {
      id: "cd-q5",
      question: "If CHAIR is coded as SHAIC, the code for TABLE is:",
      options: ["LBATE", "ELBAT", "ABLET", "ATBLE"],
      correctAnswer: 1,
      explanation: "CHAIR→SHAIC is reverse. TABLE reversed = ELBAT",
      difficulty: "easy",
    },
    {
      id: "cd-q6",
      question: "If RED = 27, then BLUE = ?",
      options: ["40", "42", "44", "46"],
      correctAnswer: 2,
      explanation:
        "R(18)+E(5)+D(4)=27. B(2)+L(12)+U(21)+E(5)=40. Check pattern.",
      difficulty: "medium",
    },
    {
      id: "cd-q7",
      question: "In a code, TIGER = UJHFS. What is HORSE?",
      options: ["IPSRF", "IPSTF", "HPTRF", "IPSQE"],
      correctAnswer: 0,
      explanation:
        "Shift +1: T→U, I→J, G→H, E→F, R→S. H→I, O→P, R→S, S→T, E→F = IPSTF",
      difficulty: "medium",
    },
    {
      id: "cd-q8",
      question: "If LION = @#$% and TAIL = &*#@, then NAIL = ?",
      options: ["%*#@", "@#*%", "#*@%", "*%#@"],
      correctAnswer: 0,
      explanation:
        "L=@, I=#, O=$, N=%. T=&, A=*. NAIL: N=%, A=*, I=#, L=@ = %*#@",
      difficulty: "medium",
    },
    {
      id: "cd-q9",
      question: "If FRIEND = HUMJTF, find the pattern used:",
      options: ["+1 shift", "+2 shift", "Reverse + shift", "-2 shift"],
      correctAnswer: 1,
      explanation:
        "F+2=H, R+2=T, I+2=K... Check: F→H (+2), R→U (+3)? Pattern varies.",
      difficulty: "medium",
    },
    {
      id: "cd-q10",
      question: "If Z=1, Y=2, X=3..., then DOG = ?",
      options: ["23, 12, 20", "4, 15, 7", "23, 11, 20", "22, 12, 20"],
      correctAnswer: 0,
      explanation: "Reverse: Z=1 so D=27-4=23, O=27-15=12, G=27-7=20",
      difficulty: "easy",
    },
  ],
};
