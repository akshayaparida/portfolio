import { LearningModule } from "@/types/learning";

export const syllogismsModule: LearningModule = {
  id: "syllogisms",
  title: "4. Syllogisms & Logical Deductions",
  description: "Statements and conclusions, Venn diagrams",
  status: "in-progress",
  tags: ["Reasoning"],
  detailedContent: `# Syllogisms & Logical Deductions

> **Logical Reasoning** - Draw valid conclusions from statements

---

## What You'll Learn

1. Understand syllogism structure
2. Use Venn diagrams to solve
3. Identify valid conclusions
4. Avoid common logical fallacies

---

## 1. Syllogism Basics

### Structure

\`\`\`text
Statement 1 (Major Premise): All A are B
Statement 2 (Minor Premise): All B are C
Conclusion: All A are C ✓
\`\`\`

### Four Types of Statements

| Type | Statement | Venn Diagram |
|:-----|:----------|:-------------|
| A (Universal Affirmative) | All A are B | A inside B |
| E (Universal Negative) | No A is B | A and B don't overlap |
| I (Particular Affirmative) | Some A are B | A and B overlap |
| O (Particular Negative) | Some A are not B | Part of A outside B |

---

## 2. Venn Diagram Method

### All A are B

\`\`\`text
┌─────────────────┐
│      B          │
│   ┌─────┐       │
│   │  A  │       │
│   └─────┘       │
└─────────────────┘
A is completely inside B
\`\`\`

### Some A are B

\`\`\`text
┌─────────┐
│    A    │
│      ┌──┼──────┐
│      │  │  B   │
└──────┼──┘      │
       └─────────┘
A and B overlap
\`\`\`

### No A is B

\`\`\`text
┌─────────┐     ┌─────────┐
│    A    │     │    B    │
└─────────┘     └─────────┘
Completely separate
\`\`\`

---

## 3. Common Valid Patterns

### Pattern 1: All-All = All

\`\`\`text
All A are B
All B are C
∴ All A are C ✓
\`\`\`

### Pattern 2: All-Some = Some

\`\`\`text
All A are B
Some B are C
∴ Some A may be C (not definite!)
\`\`\`

### Pattern 3: No-All = No

\`\`\`text
No A is B
All C are A
∴ No C is B ✓
\`\`\`

---

## 4. Invalid Conclusions (Avoid!)

\`\`\`text
❌ "All A are B" does NOT mean "All B are A"
   Example: All dogs are animals ≠ All animals are dogs

❌ "Some A are B" does NOT mean "Some A are not B"
   (They might all be B!)

❌ "Some A are not B" does NOT mean "Some A are B"
\`\`\`

---

## 5. "Either-Or" Conclusions

\`\`\`text
When neither conclusion follows individually,
check if EITHER...OR follows together.

Statement: Some A are B. All B are C.
Conclusion I: All A are C (Not definite)
Conclusion II: Some A are not C (Not definite)

But "Either I or II" might be valid if one must be true.
\`\`\`

---

## 6. Quick Rules

| If Given | You Can Conclude |
|:---------|:-----------------|
| All A are B | Some B are A |
| Some A are B | Some B are A |
| No A is B | No B is A |
| Some A are not B | Nothing about B and A |

---

## Solving Strategy

1. **Draw Venn diagrams** for all possible arrangements
2. **Check if conclusion holds** in ALL diagrams
3. **If it fails even once**, conclusion is invalid
4. **Be careful with "some"** - it means "at least one"
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "sy-q1",
      question:
        "All dogs are animals. All animals are living things. Conclusion: All dogs are living things.",
      options: ["Valid", "Invalid", "Can't determine", "Partially valid"],
      correctAnswer: 0,
      explanation:
        "All-All-All pattern is valid. Dogs ⊂ Animals ⊂ Living things.",
      difficulty: "easy",
    },
    {
      id: "sy-q2",
      question: "If 'All A are B', which follows?",
      options: ["All B are A", "Some B are A", "No B is A", "Some B are not A"],
      correctAnswer: 1,
      explanation:
        "All A are B means A⊂B. So at least some B are definitely A (the A portion).",
      difficulty: "easy",
    },
    {
      id: "sy-q3",
      question:
        "All cats are animals. Some animals are wild. Conclusion: Some cats are wild.",
      options: ["Valid", "Invalid", "Maybe", "Depends"],
      correctAnswer: 1,
      explanation:
        "Invalid. The 'wild' animals might be separate from cats. Not guaranteed overlap.",
      difficulty: "medium",
    },
    {
      id: "sy-q4",
      question:
        "No fish is a bird. All sparrows are birds. Conclusion: No sparrow is a fish.",
      options: ["Valid", "Invalid", "Can't say", "Partially valid"],
      correctAnswer: 0,
      explanation:
        "Valid. Sparrows ⊂ Birds, and Fish ∩ Birds = ∅. So Sparrows ∩ Fish = ∅.",
      difficulty: "medium",
    },
    {
      id: "sy-q5",
      question: "'Some A are B' means:",
      options: [
        "All A are B",
        "At least one A is B",
        "Exactly half A are B",
        "Most A are B",
      ],
      correctAnswer: 1,
      explanation:
        "'Some' in logic means 'at least one'. Could be one, many, or all!",
      difficulty: "easy",
    },
    {
      id: "sy-q6",
      question:
        "All roses are flowers. Some flowers are red. Conclusion: Some roses are red.",
      options: [
        "Definitely true",
        "Definitely false",
        "May or may not be true",
        "Cannot determine",
      ],
      correctAnswer: 2,
      explanation:
        "The red flowers might not include roses. We can't be certain.",
      difficulty: "medium",
    },
    {
      id: "sy-q7",
      question: "No A is B. No B is C. Conclusion: No A is C.",
      options: ["Valid", "Invalid", "Depends", "Maybe valid"],
      correctAnswer: 1,
      explanation:
        "Invalid. A and C might overlap even if neither overlaps with B.",
      difficulty: "hard",
    },
    {
      id: "sy-q8",
      question:
        "All men are mortal. Socrates is a man. Conclusion: Socrates is mortal.",
      options: ["Valid", "Invalid", "Cannot say", "Partly valid"],
      correctAnswer: 0,
      explanation: "Classic valid syllogism. Socrates ∈ Men ⊂ Mortal.",
      difficulty: "easy",
    },
    {
      id: "sy-q9",
      question:
        "Some doctors are engineers. All engineers are graduates. Conclusion:",
      options: [
        "All doctors are graduates",
        "Some doctors are graduates",
        "No doctor is graduate",
        "All graduates are doctors",
      ],
      correctAnswer: 1,
      explanation:
        "The doctors who are engineers must be graduates. So 'some doctors are graduates'.",
      difficulty: "medium",
    },
    {
      id: "sy-q10",
      question: "'All A are B' and 'All B are A' together means:",
      options: [
        "A and B are identical sets",
        "A is subset of B",
        "B is subset of A",
        "They don't overlap",
      ],
      correctAnswer: 0,
      explanation: "If A⊂B and B⊂A, then A=B. They are the same set.",
      difficulty: "easy",
    },
  ],
};
