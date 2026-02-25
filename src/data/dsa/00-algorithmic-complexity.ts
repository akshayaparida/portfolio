import { LearningModule } from "@/types/learning";

export const algorithmicComplexityModule: LearningModule = {
  id: "00-algorithmic-complexity",
  title: "0. Algorithmic Complexity",
  description: "Big-O, Big-Θ, Big-Ω — Measuring algorithm efficiency",
  status: "in-progress",
  tags: ["Foundation"],
  detailedContent: `# Algorithmic Complexity

> **Foundation Module** - Understand HOW to measure algorithm efficiency before learning algorithms

---

## What You'll Learn

1. What is an Algorithm?
2. Time Complexity vs Space Complexity
3. Big-O, Big-Θ, Big-Ω Notation
4. How to calculate complexity step-by-step
5. Common complexity classes

---

## 1. What is an Algorithm?

An **algorithm** is a step-by-step procedure to solve a problem.

\`\`\`text
Problem: Find the largest number in a list

Algorithm:
1. Assume first element is largest
2. Compare with each remaining element
3. If current element is bigger, update largest
4. After checking all, return largest

This is O(n) — we look at each element once
\`\`\`

**Two key questions about any algorithm:**
1. **How FAST is it?** → Time Complexity
2. **How much MEMORY does it use?** → Space Complexity

---

## 2. Time Complexity vs Space Complexity

| Aspect | Time Complexity | Space Complexity |
|:-------|:----------------|:-----------------|
| **Measures** | Number of operations | Memory used |
| **Depends on** | Input size (n) | Input size (n) |
| **Trade-off** | Often can trade space for time | Caching, memoization |

\`\`\`python path=null start=null
# Example: Two approaches to find duplicates

# Approach 1: Brute Force — O(n²) time, O(1) space
def has_duplicate_v1(arr):
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] == arr[j]:
                return True
    return False

# Approach 2: Hash Set — O(n) time, O(n) space
def has_duplicate_v2(arr):
    seen = set()
    for num in arr:
        if num in seen:
            return True
        seen.add(num)
    return False

# V2 is FASTER but uses MORE MEMORY — classic trade-off!
\`\`\`

---

## 3. Asymptotic Notation

We describe algorithm performance using three notations:

| Notation | Meaning | Analogy |
|:---------|:--------|:--------|
| **Big-O (O)** | Upper bound (worst case) | "At MOST this slow" |
| **Big-Ω (Ω)** | Lower bound (best case) | "At LEAST this fast" |
| **Big-Θ (Θ)** | Tight bound (exact) | "EXACTLY this fast" |

\`\`\`text
Example: Linear Search

Best case:  Ω(1)      — Found at index 0
Worst case: O(n)      — Found at last index (or not found)
Average:    Θ(n/2) = Θ(n)  — Found somewhere in the middle

When we say "Linear Search is O(n)" we mean:
→ In the WORST case, it checks all n elements
\`\`\`

> **Interview Tip:** When someone asks "What is the complexity?", they almost always mean **Big-O (worst case)**.

---

## 4. Common Complexity Classes

\`\`\`text
FAST ────────────────────────────────────── SLOW

O(1)  O(log n)  O(n)  O(n log n)  O(n²)  O(2^n)  O(n!)
 │       │       │       │          │       │       │
 ▼       ▼       ▼       ▼          ▼       ▼       ▼
Const  Logarith Linear Linearith Quadra  Expon  Factor
\`\`\`

| Complexity | Name | n=10 | n=100 | n=1000 | Example |
|:-----------|:-----|:-----|:------|:-------|:--------|
| O(1) | Constant | 1 | 1 | 1 | Array index access |
| O(log n) | Logarithmic | 3 | 7 | 10 | Binary Search |
| O(n) | Linear | 10 | 100 | 1000 | Linear Search |
| O(n log n) | Linearithmic | 33 | 664 | 9966 | Merge Sort |
| O(n²) | Quadratic | 100 | 10,000 | 1,000,000 | Bubble Sort |
| O(2^n) | Exponential | 1,024 | 1.26×10³⁰ | ∞ | Naive Fibonacci |
| O(n!) | Factorial | 3.6M | ∞ | ∞ | Brute-force permutations |

---

## 5. How to Calculate Complexity

### Rule 1: Drop Constants

\`\`\`python path=null start=null
# This is O(n), NOT O(3n)
for i in range(n):     # n operations
    print(i)
for i in range(n):     # + n operations
    print(i)
for i in range(n):     # + n operations
    print(i)
# Total: 3n → O(n)
\`\`\`

### Rule 2: Drop Lower-Order Terms

\`\`\`python path=null start=null
# This is O(n²), NOT O(n² + n)
for i in range(n):           # O(n²)
    for j in range(n):
        print(i, j)

for k in range(n):           # + O(n)
    print(k)

# Total: n² + n → O(n²)  (n² dominates)
\`\`\`

### Rule 3: Nested Loops Multiply

\`\`\`python path=null start=null
for i in range(n):       # n ×
    for j in range(n):   # n ×
        for k in range(n): # n
            print(i, j, k)
# Total: n × n × n = O(n³)
\`\`\`

### Rule 4: Sequential Code Adds

\`\`\`python path=null start=null
def example(n):
    # Block 1: O(n)
    for i in range(n):
        print(i)
    
    # Block 2: O(n²)
    for i in range(n):
        for j in range(n):
            print(i, j)
    
    # Total: O(n) + O(n²) = O(n²)
\`\`\`

### Rule 5: Log n — Halving

\`\`\`python path=null start=null
# Each step halves the input → O(log n)
i = n
while i > 1:
    i = i // 2  # Halving each time!
    print(i)

# For n = 1000: only ~10 steps (log₂ 1000 ≈ 10)
\`\`\`

---

## 6. Space Complexity

\`\`\`python path=null start=null
# O(1) space — uses fixed variables
def sum_array(arr):
    total = 0
    for num in arr:
        total += num
    return total

# O(n) space — creates a new array of size n
def double_array(arr):
    result = []
    for num in arr:
        result.append(num * 2)
    return result

# O(n) space — recursion uses call stack
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)  # n stack frames!
\`\`\`

**Key insight:** Recursion uses **O(depth)** space on the call stack!

---

## 7. Amortized Analysis (Brief)

Some operations are slow occasionally but fast on average.

**Example: Dynamic Array (Python list)**

| Operation | Amortized | Worst Case |
|:----------|:----------|:-----------|
| \`append()\` | **O(1)** | O(n) when resizing |
| \`pop()\` | O(1) | O(1) |
| \`insert(0, x)\` | O(n) | O(n) |

When the array is full, Python doubles its size (O(n) copy), but this happens rarely. Over many appends, it averages out to **O(1)** per append.

---

## Key Takeaways

| Concept | Key Point |
|:--------|:----------|
| Big-O | Worst case upper bound (most commonly used) |
| Big-Ω | Best case lower bound |
| Big-Θ | Tight/exact bound |
| Drop constants | O(3n) = O(n) |
| Drop lower terms | O(n² + n) = O(n²) |
| Nested loops | Multiply: O(n) × O(n) = O(n²) |
| Halving | O(log n) |
| Recursion space | O(depth of recursion) |

---

## TL;DR - Quick Recall

**One-liner for each concept:**

| Concept | Key Takeaway |
|:--------|:-------------|
| **Big-O** | Upper bound. Worst case scenario. "At most this slow." |
| **Big-Ω** | Lower bound. Best case scenario. "At least this fast." |
| **Big-Θ** | Tight bound. Exact growth rate. |
| **O(1)** | Constant. Doesn't depend on input size. Array index access. |
| **O(log n)** | Logarithmic. Halving each step. Binary Search. |
| **O(n)** | Linear. Visit each element once. Linear Search. |
| **O(n log n)** | Linearithmic. Best comparison-based sorting (Merge/Quick). |
| **O(n²)** | Quadratic. Nested loops over same input. Bubble Sort. |

**Essential Code Snippets:**

\`\`\`python
# O(1) — Constant
x = arr[5]

# O(log n) — Halving
while n > 1: n //= 2

# O(n) — Single loop
for x in arr: print(x)

# O(n²) — Nested loop
for i in arr:
    for j in arr: print(i, j)
\`\`\`

**The Golden Rules:**
1. Always think about the **WORST CASE** unless asked otherwise.
2. When you see a loop that **halves** the input, it's **O(log n)**.
3. Two nested loops over the same input = **O(n²)**. Three nested = **O(n³)**.

---

## Additional Resources

**Video Courses:**
- [CS Dojo - Big-O Notation](https://youtu.be/Z0bH0cMY0E8) - Best visual explanation
- [Abdul Bari - Time Complexity](https://youtu.be/9TlHvipP5yA) - Deep dive for university exams

**Articles & Visualizations:**
- [Big-O Cheat Sheet](https://www.bigocheatsheet.com/) - The ultimate reference card
- [VisuAlgo](https://visualgo.net/) - Watch algorithms run step by step

**Practice Problems:**
- Analyze the time complexity of any code snippet you write
- LeetCode: Sort problems by difficulty and analyze each solution's complexity
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "ac-q1",
      question: "What does Big-O notation represent?",
      options: [
        "Best case performance",
        "Average case performance",
        "Worst case upper bound",
        "Exact running time",
      ],
      correctAnswer: 2,
      explanation:
        "Big-O represents the worst case upper bound. It tells us the maximum number of operations as input grows.",
      difficulty: "easy",
    },
    {
      id: "ac-q2",
      question:
        "What is the time complexity of accessing an element by index in an array?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      correctAnswer: 2,
      explanation:
        "Array index access is O(1) constant time. The memory address is calculated directly: base + index × size.",
      difficulty: "easy",
    },
    {
      id: "ac-q3",
      question: "O(3n² + 5n + 100) simplifies to:",
      options: ["O(3n²)", "O(n² + n)", "O(n²)", "O(100)"],
      correctAnswer: 2,
      explanation:
        "Drop constants (3) and lower-order terms (5n, 100). The dominant term n² determines the complexity.",
      difficulty: "easy",
    },
    {
      id: "ac-q4",
      question: "A loop that divides n by 2 in each iteration has complexity:",
      options: ["O(n)", "O(n/2)", "O(log n)", "O(√n)"],
      correctAnswer: 2,
      explanation:
        "Halving the input each step = O(log n). For n=1000, only ~10 steps needed (log₂ 1000 ≈ 10).",
      difficulty: "medium",
    },
    {
      id: "ac-q5",
      question: "Two nested loops each running n times gives:",
      options: ["O(n)", "O(2n)", "O(n²)", "O(n log n)"],
      correctAnswer: 2,
      explanation:
        "Nested loops multiply: n × n = n². Each iteration of outer loop runs the entire inner loop.",
      difficulty: "easy",
    },
    {
      id: "ac-q6",
      question:
        "What is the space complexity of a recursive function with depth n?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      explanation:
        "Each recursive call adds a frame to the call stack. Depth n = O(n) stack frames = O(n) space.",
      difficulty: "medium",
    },
    {
      id: "ac-q7",
      question: "Which is faster for large n: O(n log n) or O(n²)?",
      options: [
        "O(n²) is faster",
        "O(n log n) is faster",
        "They are the same",
        "Depends on the constant",
      ],
      correctAnswer: 1,
      explanation:
        "O(n log n) grows much slower than O(n²). For n=1000: n log n ≈ 10,000 vs n² = 1,000,000.",
      difficulty: "easy",
    },
    {
      id: "ac-q8",
      question: "Amortized O(1) for dynamic array append means:",
      options: [
        "Every append is O(1)",
        "Most appends are O(1), rare ones are O(n) for resizing",
        "Append is always O(n)",
        "Append is O(log n)",
      ],
      correctAnswer: 1,
      explanation:
        "Amortized O(1) means averaged over many operations it's O(1). Occasionally the array resizes (O(n)), but this is rare.",
      difficulty: "medium",
    },
    {
      id: "ac-q9",
      question: "Big-Ω (Omega) notation represents:",
      options: [
        "Worst case",
        "Best case lower bound",
        "Average case",
        "Amortized case",
      ],
      correctAnswer: 1,
      explanation:
        "Big-Ω represents the best case lower bound. The algorithm will take AT LEAST this many operations.",
      difficulty: "medium",
    },
    {
      id: "ac-q10",
      question:
        "What is the time complexity of: for i in range(n): for j in range(i): print(i,j)?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(n³)"],
      correctAnswer: 2,
      explanation:
        "Inner loop runs 0+1+2+...+(n-1) = n(n-1)/2 times total. That's O(n²/2) = O(n²).",
      difficulty: "medium",
    },
  ],
};
