import { LearningModule } from "@/types/learning";

export const analogiesClassificationModule: LearningModule = {
  id: "analogies-classification",
  title: "3. Analogies & Classification",
  description: "Word relationships and odd-one-out problems",
  status: "in-progress",
  tags: ["Reasoning"],
  detailedContent: `# Analogies & Classification

> **Relationship Patterns** - Find connections between words/concepts

---

## What You'll Learn

1. Identify word relationships (analogies)
2. Solve odd-one-out (classification)
3. Recognize common analogy types
4. Apply elimination techniques

---

## 1. Word Analogies

### Format: A : B :: C : ?
"A is to B as C is to ?"

### Common Relationship Types

| Type | Example |
|:-----|:--------|
| Synonym | Happy : Joyful :: Sad : Unhappy |
| Antonym | Hot : Cold :: Big : Small |
| Part-Whole | Wheel : Car :: Key : Keyboard |
| Category | Apple : Fruit :: Carrot : Vegetable |
| Function | Pen : Write :: Knife : Cut |
| Degree | Warm : Hot :: Cool : Cold |
| Worker-Tool | Carpenter : Hammer :: Surgeon : Scalpel |
| Product | Cow : Milk :: Bee : Honey |

---

## 2. Number Analogies

\`\`\`text
Example: 4 : 16 :: 5 : ?
Relationship: 4² = 16
Answer: 5² = 25

Example: 8 : 27 :: 64 : ?
Pattern: 2³ : 3³ :: 4³ : 5³
Answer: 125
\`\`\`

---

## 3. Letter Analogies

\`\`\`text
Example: AB : CD :: EF : ?
Pattern: Skip 1 pair
Answer: GH

Example: AZ : BY :: CX : ?
Pattern: A(1)+Z(26), B(2)+Y(25), C(3)+X(24)
Answer: DW (D+W = 4+23 = 27 ✓)
\`\`\`

---

## 4. Classification (Odd One Out)

### Find the item that doesn't belong

\`\`\`text
Example: Apple, Mango, Potato, Orange
Odd: Potato (vegetable, others are fruits)

Example: 2, 3, 5, 9, 11
Odd: 9 (not prime, others are primes)

Example: Square, Rectangle, Triangle, Circle
Odd: Circle (no straight sides, others have)
\`\`\`

### Classification Bases

| Based On | Example |
|:---------|:--------|
| Category | Fruits vs Vegetables |
| Property | Even vs Odd |
| Shape | Curved vs Straight |
| Size | Relative sizes |
| Function | What they do |

---

## 5. Figure Analogies

\`\`\`text
Look for:
- Rotation (90°, 180°)
- Reflection (mirror)
- Size change (bigger/smaller)
- Color change (fill/outline)
- Addition/removal of elements
\`\`\`

---

## Quick Tips

1. **Identify the relationship** in the given pair first
2. **Apply same relationship** to find the answer
3. **Verify your answer** fits the pattern
4. **In classification**, find the common property of 4, then find the different one
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "ac-q1",
      question: "Pen : Write :: Knife : ?",
      options: ["Sharp", "Cut", "Steel", "Handle"],
      correctAnswer: 1,
      explanation:
        "Function relationship: Pen is used to Write, Knife is used to Cut",
      difficulty: "easy",
    },
    {
      id: "ac-q2",
      question: "Find odd one: Apple, Orange, Mango, Carrot",
      options: ["Apple", "Orange", "Mango", "Carrot"],
      correctAnswer: 3,
      explanation: "Carrot is a vegetable, others are fruits",
      difficulty: "easy",
    },
    {
      id: "ac-q3",
      question: "4 : 16 :: 7 : ?",
      options: ["28", "49", "14", "21"],
      correctAnswer: 1,
      explanation: "Square relationship: 4²=16, so 7²=49",
      difficulty: "easy",
    },
    {
      id: "ac-q4",
      question: "Doctor : Hospital :: Teacher : ?",
      options: ["Student", "School", "Books", "Classroom"],
      correctAnswer: 1,
      explanation:
        "Workplace relationship: Doctor works in Hospital, Teacher works in School",
      difficulty: "easy",
    },
    {
      id: "ac-q5",
      question: "Find odd one: 2, 3, 5, 9, 11",
      options: ["2", "3", "9", "11"],
      correctAnswer: 2,
      explanation:
        "9 is not prime (9=3×3). Others (2,3,5,11) are prime numbers",
      difficulty: "easy",
    },
    {
      id: "ac-q6",
      question: "Cow : Calf :: Cat : ?",
      options: ["Puppy", "Kitten", "Cub", "Baby"],
      correctAnswer: 1,
      explanation:
        "Young one relationship: Baby of cow is calf, baby of cat is kitten",
      difficulty: "easy",
    },
    {
      id: "ac-q7",
      question: "ACE : BDF :: GIK : ?",
      options: ["HJL", "IKM", "GIL", "HKM"],
      correctAnswer: 0,
      explanation: "Each letter +1: A→B, C→D, E→F. So G→H, I→J, K→L = HJL",
      difficulty: "medium",
    },
    {
      id: "ac-q8",
      question: "Find odd one: Square, Rectangle, Circle, Triangle",
      options: ["Square", "Rectangle", "Circle", "Triangle"],
      correctAnswer: 2,
      explanation:
        "Circle has no straight sides or angles, others are polygons",
      difficulty: "easy",
    },
    {
      id: "ac-q9",
      question: "Bird : Nest :: Bee : ?",
      options: ["Honey", "Flower", "Hive", "Swarm"],
      correctAnswer: 2,
      explanation: "Home relationship: Bird lives in Nest, Bee lives in Hive",
      difficulty: "easy",
    },
    {
      id: "ac-q10",
      question: "Find odd one: January, March, June, August",
      options: ["January", "March", "June", "August"],
      correctAnswer: 2,
      explanation: "June has 30 days, others have 31 days",
      difficulty: "medium",
    },
  ],
};
