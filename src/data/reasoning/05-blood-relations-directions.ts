import { LearningModule } from "@/types/learning";

export const bloodRelationsDirectionsModule: LearningModule = {
  id: "blood-relations-directions",
  title: "5. Blood Relations & Directions",
  description: "Family relationships and direction sense problems",
  status: "in-progress",
  tags: ["Reasoning"],
  detailedContent: `# Blood Relations & Directions

> **Relationship Mapping** - Trace family trees and navigate directions

---

## Part A: Blood Relations

---

## 1. Basic Family Relationships

| Relation | Meaning |
|:---------|:--------|
| Father's/Mother's father | Grandfather |
| Father's/Mother's mother | Grandmother |
| Father's brother | Uncle |
| Father's sister | Aunt |
| Mother's brother | Maternal Uncle |
| Mother's sister | Maternal Aunt |
| Brother's/Sister's son | Nephew |
| Brother's/Sister's daughter | Niece |
| Uncle/Aunt's child | Cousin |

---

## 2. Coded Relationships

\`\`\`text
Common Symbols:
+ = Male
- = Female
× = Married to
| = Child of

Example: A × B means A is married to B
A | B means A is parent of B
\`\`\`

---

## 3. Solving Tips

\`\`\`text
Step 1: Draw a family tree
Step 2: Use + for male, - for female
Step 3: Connect generations vertically
Step 4: Connect spouses horizontally

Example:
"A is B's father. B is C's brother."

    A(+)
    |
  ┌─┴─┐
  B(+) C
\`\`\`

---

## 4. Tricky Phrases

| Statement | Meaning |
|:----------|:--------|
| "Only son" | No brothers/sisters |
| "Only daughter" | No sisters (may have brothers) |
| "Only child" | No siblings at all |
| "A is father of B's son" | A is B's husband |
| "A's mother's husband" | A's father |

---

## Part B: Direction Sense

---

## 5. Basic Directions

\`\`\`text
          N
          |
    W ----+---- E
          |
          S

Clockwise: N → E → S → W → N
Anti-clockwise: N → W → S → E → N
\`\`\`

### Diagonal Directions

\`\`\`text
    NW  N  NE
      \\ | /
    W--+--E
      / | \\
    SW  S  SE
\`\`\`

---

## 6. Direction Changes

| Turn | Change |
|:-----|:-------|
| Right | 90° clockwise |
| Left | 90° anti-clockwise |
| About turn | 180° |

\`\`\`text
Facing North + Turn Right = Facing East
Facing East + Turn Right = Facing South
Facing North + Turn Left = Facing West
\`\`\`

---

## 7. Solving Direction Problems

\`\`\`text
Draw step by step on paper!

Example:
"Start at A, go 5km North, then 3km East,
then 5km South. How far from A?"

        5km N
    A ──┐
       │ 3km E
       B

Final position B is 3km East of A.
\`\`\`

---

## 8. Shadow-Based Time

\`\`\`text
Morning (6 AM): Sun in East, shadow points West
Noon (12 PM): Sun overhead, no shadow/short
Evening (6 PM): Sun in West, shadow points East

If shadow is on right and it's morning:
Sun is on left (East), so you face South
\`\`\`

---

## Quick Tips

**Blood Relations:**
1. Draw family tree for complex problems
2. Mark gender clearly
3. Work step by step through relationships

**Directions:**
1. Always draw on paper
2. Mark North at top
3. Track position after each movement
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "br-q1",
      question: "A is B's father. B is C's sister. How is A related to C?",
      options: ["Uncle", "Father", "Grandfather", "Brother"],
      correctAnswer: 1,
      explanation: "B is C's sister means C is child of A. So A is C's father.",
      difficulty: "easy",
    },
    {
      id: "br-q2",
      question:
        "Pointing to a man, a woman said 'His mother is my mother's daughter.' How is the man related to the woman?",
      options: ["Son", "Brother", "Nephew", "Uncle"],
      correctAnswer: 0,
      explanation:
        "My mother's daughter = myself or sister. If his mother = me, he's my son.",
      difficulty: "medium",
    },
    {
      id: "br-q3",
      question: "If you face North and turn right twice, you will face:",
      options: ["North", "South", "East", "West"],
      correctAnswer: 1,
      explanation: "North → (right) East → (right) South",
      difficulty: "easy",
    },
    {
      id: "br-q4",
      question:
        "A walks 10m North, then 10m East, then 10m South. How far is A from start?",
      options: ["10m", "20m", "30m", "0m"],
      correctAnswer: 0,
      explanation: "North and South cancel (10-10=0). Only 10m East remains.",
      difficulty: "easy",
    },
    {
      id: "br-q5",
      question: "A's father's only brother's wife is related to A as:",
      options: ["Mother", "Aunt", "Grandmother", "Sister"],
      correctAnswer: 1,
      explanation: "Father's only brother = Uncle. Uncle's wife = Aunt.",
      difficulty: "easy",
    },
    {
      id: "br-q6",
      question: "If South-East becomes North, then North-East becomes:",
      options: ["South", "West", "South-West", "North-West"],
      correctAnswer: 1,
      explanation: "SE→N is 135° anti-clockwise. Apply same to NE: NE → West.",
      difficulty: "hard",
    },
    {
      id: "br-q7",
      question:
        "Rahul's mother is sister of Suresh. Suresh has a daughter Meena. How is Meena related to Rahul?",
      options: ["Sister", "Cousin", "Niece", "Aunt"],
      correctAnswer: 1,
      explanation:
        "Rahul's mother is Suresh's sister. So Suresh is Rahul's maternal uncle. Meena is cousin.",
      difficulty: "medium",
    },
    {
      id: "br-q8",
      question:
        "In morning, if your shadow falls to your right, you are facing:",
      options: ["North", "South", "East", "West"],
      correctAnswer: 1,
      explanation:
        "Morning sun in East. Shadow opposite (West). If shadow on right, West is right, so facing South.",
      difficulty: "medium",
    },
    {
      id: "br-q9",
      question:
        "A man pointing to a photograph says 'The lady is the daughter of my grandmother's only son.' How is the lady related to the man?",
      options: ["Mother", "Sister", "Aunt", "Daughter"],
      correctAnswer: 1,
      explanation:
        "Grandmother's only son = father. Father's daughter = sister.",
      difficulty: "medium",
    },
    {
      id: "br-q10",
      question:
        "A walks 5km West, turns left, walks 3km, turns left, walks 5km. Where is A now?",
      options: [
        "3km North of start",
        "3km South of start",
        "At start",
        "5km East",
      ],
      correctAnswer: 1,
      explanation:
        "West 5km → Left(South) 3km → Left(East) 5km. Net: 3km South.",
      difficulty: "medium",
    },
  ],
};
