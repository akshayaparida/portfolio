import { LearningModule } from "@/types/learning";

export const asymptoticAnalysisModule: LearningModule = {
  id: "01-asymptotic-analysis",
  title: "1. Asymptotic Complexity & Recurrences",
  description:
    "Big-O, Big-Ω, Big-Θ, small-o/ω notations, Master Theorem (all cases & logarithmic extensions), Substitution Method, and Recursion Trees across C, C++, and Python",
  status: "completed",
  tags: ["Algorithm", "GATE CS", "UGC NET", "NPTEL"],
  detailedContent: `# Asymptotic Complexity & Recurrence Relations

> **NPTEL / GATE CS / UGC NET Foundation Module**
> Exam Weightage: 2–3 Direct Questions on Master Theorem cases, comparing growth rates of functions, and recursion trees.

---

## 1. Prerequisites & What You Should Know

Before studying asymptotic analysis, ensure you understand:
- **Basic Mathematics**: Logarithms ($\\log_2 n$), exponents, summations ($\\sum$), and limits.
- **Loops & Recursion**: How to count the number of operations a loop or recursive call executes.
- **Functions**: What a mathematical function is — input goes in, output comes out.

---

## 2. What is Asymptotic Analysis? (Conceptual Explanation)

### 2.1 The "How Fast Does It Grow?" Question

When you write an algorithm, you need to ask: **"As my input grows larger and larger, how does the time (or memory) my algorithm uses grow?"**

Think of it like comparing **commute speeds**:
- Walking: Time grows **linearly** with distance — 2× distance = 2× time.
- Driving: Time grows more slowly (highways) — 2× distance ≠ 2× time.
- Teleporting: Time is constant — 1 mile or 1000 miles, same time.

Asymptotic analysis measures the **growth rate** of algorithms, not the exact time.

### 2.2 Why Not Just Time It with a Stopwatch?

| Factor | Problem with Wall Clock Timing |
|:---|:---|
| **Hardware** | A faster CPU gives shorter times for the SAME algorithm |
| **Other Programs** | Background apps steal CPU time, giving inconsistent measurements |
| **Input Size** | Algorithm A may be faster on small inputs but slower on large ones |
| **Language** | C is faster than Python for the same algorithm |

**Asymptotic analysis is hardware-independent, language-independent, and focuses on the fundamental growth rate!**

### 2.3 Counting Operations: The Key Idea

\`\`\`
// How many times does the innermost operation execute?

// Example 1: O(n) — Linear
for (int i = 0; i < n; i++) {    ← loop runs n times
    sum += arr[i];                ← 1 operation per iteration
}
// Total: n operations → O(n)

// Example 2: O(n²) — Quadratic
for (int i = 0; i < n; i++) {        ← outer runs n times
    for (int j = 0; j < n; j++) {    ← inner runs n times FOR EACH i
        count++;                      ← 1 operation
    }
}
// Total: n × n = n² operations → O(n²)

// Example 3: O(log n) — Logarithmic
while (n > 1) {      ← how many times can you halve n?
    n = n / 2;        ← halving each time
}
// n → n/2 → n/4 → ... → 1 takes log₂(n) steps → O(log n)
\`\`\`

### 2.4 While Loop Condition Testing vs. Body Execution (NPTEL Week 1 Quiz & GATE Trap)

A classic conceptual pitfall in algorithmic analysis (frequently tested in **NPTEL Week 1 Quizzes** and **GATE CS**) is the subtle distinction between:
1. **How many times the loop body executes** (the statements inside \`{ ... }\`)
2. **How many times the loop condition is tested / evaluated** (the boolean expression in \`while (...)\`)

#### The Fundamental Rule of Loop Condition Testing
For any standard pre-tested loop (\`while (condition)\` or \`for (; condition; )\`), the condition must be evaluated **one extra time** beyond the iterations that succeed, in order to evaluate to \`false\` and terminate the loop:

$$\text{Total Condition Evaluations} = (\text{Number of Successful Iterations}) + 1$$

---

#### Case Study: NPTEL Week 1 Quiz Problem
Consider the following function called with arguments $m = 165$ and $n = 15$:

\`\`\`python
def f(m, n):
    ans = 1
    while m >= 0:
        ans = ans * (ans + 1)
        m = m - n
    return ans
\`\`\`

**Problem:** *How many times is the \`while\` condition tested if $f(165, 15)$ is called?*

#### Step-by-Step Execution Trace Table

| Test # | Current $m$ | Condition ($m \\ge 0$) | Evaluation | Next $m$ ($m - 15$) | Loop Body Runs? |
|:---:|:---:|:---:|:---:|:---:|:---:|
| **1** | $165$ | $165 \\ge 0$ | **True** | $150$ | Yes (Iteration 1) |
| **2** | $150$ | $150 \\ge 0$ | **True** | $135$ | Yes (Iteration 2) |
| **3** | $135$ | $135 \\ge 0$ | **True** | $120$ | Yes (Iteration 3) |
| **4** | $120$ | $120 \\ge 0$ | **True** | $105$ | Yes (Iteration 4) |
| **5** | $105$ | $105 \\ge 0$ | **True** | $90$ | Yes (Iteration 5) |
| **6** | $90$ | $90 \\ge 0$ | **True** | $75$ | Yes (Iteration 6) |
| **7** | $75$ | $75 \\ge 0$ | **True** | $60$ | Yes (Iteration 7) |
| **8** | $60$ | $60 \\ge 0$ | **True** | $45$ | Yes (Iteration 8) |
| **9** | $45$ | $45 \\ge 0$ | **True** | $30$ | Yes (Iteration 9) |
| **10** | $30$ | $30 \\ge 0$ | **True** | $15$ | Yes (Iteration 10) |
| **11** | $15$ | $15 \\ge 0$ | **True** | $0$ | Yes (Iteration 11) |
| **12** | $0$ | $0 \\ge 0$ | **True** | $-15$ | Yes (Iteration 12) |
| **13** | $-15$ | $-15 \\ge 0$ | **False** | *(loop terminates)* | **No (Exit)** |

#### Mathematical Derivation
1. The sequence of values tested for $m$ forms an **Arithmetic Progression (AP)**:
   $$m_k = 165 - 15k, \\quad \\text{for } k = 0, 1, 2, \\dots$$
2. The loop condition is $m_k \\ge 0$:
   $$165 - 15k \\ge 0 \\implies 15k \\le 165 \\implies k \\le 11$$
3. Since $k$ starts at $0$ and goes up to $11$, there are $11 - 0 + 1 = 12$ iterations where the condition is **True** (the loop body executes **12 times**).
4. For $k = 12$, $m_{12} = 165 - 15(12) = -15$. The condition $-15 \\ge 0$ is tested a 13th time and returns **False**.
5. **Final Answer:** The condition is tested **$12 + 1 = 13$ times**!

> [!WARNING]
> **Why Students Lose Points on This (The Two Traps)**:
> - **Trap 1: Writing 11.** Calculating $165 / 15 = 11$ forgets that $m \\ge 0$ is inclusive of $0$. When $m=0$, the condition is still True.
> - **Trap 2: Writing 12.** Counting loop body executions ($12$) forgets that the while loop must evaluate the condition one final time to evaluate to False and break out of the loop.

### 2.5 Loop Invariants: Program State & Correctness Analysis (NPTEL Week 1 Quiz Q5)

A **Loop Invariant** is a formal condition or mathematical relation about program variables that is guaranteed to remain **True** before and after each iteration:
1. **Initialization:** True prior to the first iteration.
2. **Maintenance:** If True before iteration $k$, it remains True before iteration $k+1$.
3. **Termination:** When the loop terminates, the invariant holds and provides a guarantee about the final computed output.

#### Case Study: NPTEL Loop Invariant Question
Consider the following program tracking integers partitioned into prime vs. composite accumulators:

\`\`\`c
i = 0; j = 0; k = 0;
for (m = last; m >= first; m = m - 1) {
    k = k - m;
    if (composite(m)) {
        i = i - m;
    } else {
        j = j - m;
    }
}
\`\`\`

**Question:** *Which condition \`(...)\` can replace \`if (...)\` at the end to guarantee it prints \`"True"\`?*

#### Invariant Proof
- **Before Loop:** $i = 0, j = 0, k = 0 \\implies k = i + j = 0$ holds.
- **In Each Iteration:**
  - $k$ changes by $\\Delta k = -m$.
  - Exactly one branch executes:
    - If \`composite(m)\` is True: $\\Delta i = -m$, $\\Delta j = 0 \\implies \\Delta(i + j) = -m + 0 = -m = \\Delta k$.
    - If \`composite(m)\` is False: $\\Delta i = 0$, $\\Delta j = -m \\implies \\Delta(i + j) = 0 - m = -m = \\Delta k$.
- **At Loop Termination:** Since $\\Delta k = \\Delta(i + j)$ on every single step regardless of $m$, the equality **\`k == i + j\`** is a universal loop invariant that holds for ANY values of \`first\` and \`last\`!

---

## 3. Asymptotic Notations: Mathematical Definitions

### 3.1 Big-O Notation (Asymptotic Upper Bound)
$$f(n) = O(g(n)) \\iff \\exists \\, c > 0, n_0 > 0 \\text{ such that } 0 \\le f(n) \\le c \\cdot g(n) \\quad \\forall \\, n \\ge n_0$$
*Meaning*: $f(n)$ grows **at most as fast as** $g(n)$ (Worst-Case rate).

> [!NOTE]
> **Understanding Worst-Case Big-O: Upper Bound vs. Exact Requirement (NPTEL Week 1 Quiz Q2)**:
> If an algorithm for finding a path in an $n$-dimensional maze (e.g. *AmazeMe*) has worst-case complexity $O(n^4 \\log n)$:
> - **Correct Interpretation:** For every sufficiently large $n$, *every* input maze of dimension $n$ can be solved **within time proportional to $n^4 \\log n$**.
> - **Common Misconception:** It does **not** mean every input *requires* $n^4 \\log n$ time (that would be lower bound $\\Omega$). Big-O only guarantees that runtime will never exceed this asymptotic upper ceiling!

### 3.2 Big-$\\Omega$ Notation (Asymptotic Lower Bound)
$$f(n) = \\Omega(g(n)) \\iff \\exists \\, c > 0, n_0 > 0 \\text{ such that } 0 \\le c \\cdot g(n) \\le f(n) \\quad \\forall \\, n \\ge n_0$$
*Meaning*: $f(n)$ grows **at least as fast as** $g(n)$ (Best-Case rate).

### 3.3 Big-$\\Theta$ Notation (Asymptotically Tight Bound)
$$f(n) = \\Theta(g(n)) \\iff f(n) = O(g(n)) \\text{ and } f(n) = \\Omega(g(n))$$

### 3.4 Strict Bounds: Little-o and Little-$\\omega$
- **$f(n) = o(g(n))$**: $\\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} = 0$ (Strictly slower growth).
- **$f(n) = \\omega(g(n))$**: $\\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} = \\infty$ (Strictly faster growth).

### 3.5 Quick Analogy

| Notation | Analogy | Meaning |
|:---|:---|:---|
| $f = O(g)$ | $f \\le g$ | $f$ grows no faster than $g$ |
| $f = \\Omega(g)$ | $f \\ge g$ | $f$ grows no slower than $g$ |
| $f = \\Theta(g)$ | $f = g$ | $f$ grows at the same rate as $g$ |
| $f = o(g)$ | $f < g$ | $f$ grows strictly slower than $g$ |
| $f = \\omega(g)$ | $f > g$ | $f$ grows strictly faster than $g$ |

---

## 4. Master Theorem for Divide-and-Conquer Recurrences

For recurrences of the form:
$$T(n) = a \\, T\\left(\\frac{n}{b}\\right) + f(n) = a \\, T\\left(\\frac{n}{b}\\right) + \\Theta(n^k \\log^p n)$$
where $a \\ge 1$, $b > 1$, $k \\ge 0$, and $p$ is a real number:

| Case | Condition | Solution $T(n)$ | Example |
|:---|:---|:---|:---|
| **Case 1** | $\\log_b a > k$ | $\\Theta\\left(n^{\\log_b a}\\right)$ | $T(n) = 4T(n/2) + n \\implies \\Theta(n^2)$ |
| **Case 2a** | $\\log_b a = k$ and $p > -1$ | $\\Theta\\left(n^k \\log^{p+1} n\\right)$ | $T(n) = 2T(n/2) + n \\implies \\Theta(n \\log n)$ |
| **Case 2b** | $\\log_b a = k$ and $p = -1$ | $\\Theta\\left(n^k \\log \\log n\\right)$ | |
| **Case 2c** | $\\log_b a = k$ and $p < -1$ | $\\Theta\\left(n^k\\right)$ | |
| **Case 3** | $\\log_b a < k$ ($a f(n/b) \\le c f(n)$) | $\\Theta\\left(f(n)\\right)$ | $T(n) = 2T(n/2) + n^2 \\implies \\Theta(n^2)$ |

### Master Theorem: Step-by-Step Example

\`\`\`
Solve: T(n) = 4T(n/2) + n

Step 1: Identify a=4, b=2, f(n)=n, so k=1, p=0
Step 2: Compute log_b(a) = log_2(4) = 2
Step 3: Compare log_b(a) with k:  2 > 1 → Case 1!
Step 4: Solution: T(n) = Θ(n^(log_2 4)) = Θ(n²)

Another: T(n) = 2T(n/2) + n
  a=2, b=2, k=1, log_2(2)=1, 1==1, p=0>-1 → Case 2a
  T(n) = Θ(n¹ · log^(0+1) n) = Θ(n log n) ← This is Merge Sort!
\`\`\`

---

## 5. Hierarchy of Growth Rates

$$O(1) < O(\\log \\log n) < O(\\log n) < O(\\sqrt{n}) < O(n) < O(n \\log n) < O(n^2) < O(n^3) < O(2^n) < O(n!) < O(n^n)$$

\`\`\`
For n = 1,000,000 (one million):

O(1)        → 1 operation              (instant)
O(log n)    → ~20 operations           (instant)
O(n)        → 1,000,000 operations     (~1 ms)
O(n log n)  → ~20,000,000 operations   (~20 ms)
O(n²)       → 1,000,000,000,000 ops    (~16 minutes!)
O(2^n)      → 2^1000000 operations     (longer than universe age)
\`\`\`

### 5.1 Estimating Wall-Clock Runtime on Modern CPUs (NPTEL Week 1 Quiz Q3)

Modern CPUs execute roughly $10^9$ basic operations per second ($1\\text{ GHz}$ baseline):

$$\\text{Estimated Time (seconds)} = \\frac{\\text{Total Operations } T(n)}{\\text{Processor Operations/sec}}$$

#### Worked Example: $O(n^3)$ with $n = 30,000$
- **Total Operations:** $T(n) = n^3 = (30,000)^3 = (3 \\times 10^4)^3 = 27 \\times 10^{12}$ operations.
- **CPU Speed:** $10^9$ ops/sec.
- **Execution Time:**
  $$\\text{Time} = \\frac{27 \\times 10^{12}}{10^9} = 27,000\\text{ seconds}$$
  $$\\text{In Minutes:} \\quad \\frac{27,000}{60} = 450\\text{ minutes}$$
  $$\\text{In Hours:} \\quad \\frac{450}{60} = 7.5\\text{ hours}$$
- **Conclusion:** $7.5\\text{ hours}$ is strictly **Under 8 hours** (eliminating options *Under 8 minutes*, while *Under 8 hours* is the tightest valid bound).

### 5.2 Comparing Growth Rates & Upper Bounds for Fractional Powers (NPTEL Week 1 Quiz Q4)

Consider $f(n) = n\\sqrt{n} = n^{1.5}$:
- **Versus $n \\log n$:** $\\lim_{n \\to \\infty} \\frac{n^{1.5}}{n \\log n} = \\lim_{n \\to \\infty} \\frac{\\sqrt{n}}{\\log n} = \\infty$. Thus $n\\sqrt{n}$ grows strictly faster than $n \\log n$, so $f(n) \\ne O(n \\log n)$ (Statement A is False).
- **Versus $n^2$:** $n^{1.5} \\le n^2$ for $n \\ge 1$. Hence $f(n) = O(n^2)$ is **True** (Statement B is True).
- **Versus $n^4$:** $n^{1.5} \\le n^4$ for $n \\ge 1$. Because Big-O is an upper bound, $f(n) = O(n^4)$ is also **True** (Statement C is True).
- **Takeaway:** (B) and (C) are true, but (A) is false!

---

## 6. Implementation in C, C++, and Python with Syntax Logic

### C Implementation (Clock Cycles & Recurrence Simulators)

\`\`\`c
#include <stdio.h>
#include <time.h>

/**
 * C Syntax Logic Note:
 * 1. clock_t & clock(): Provided by <time.h> to measure processor execution time.
 * 2. CLOCKS_PER_SEC: Macro defining processor clock ticks per second (typically 1,000,000).
 * 3. Double casting: (double)(end - start) / CLOCKS_PER_SEC converts CPU ticks into seconds.
 */

// O(log n): Recursive division
int binarySearchSteps(int n) {
    if (n <= 1) return 1;
    return 1 + binarySearchSteps(n / 2); // Recurrence: T(n) = T(n/2) + O(1)
}

// O(n^2): Nested loops
long long quadraticWork(int n) {
    long long count = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            count++;
        }
    }
    return count;
}

void benchmark(int n) {
    clock_t start = clock();
    long long ops = quadraticWork(n);
    clock_t end = clock();

    double cpu_time = ((double)(end - start)) / CLOCKS_PER_SEC;
    printf("N = %d -> Operations = %lld, Elapsed = %f seconds\\n", n, ops, cpu_time);
}
\`\`\`

---

### C++ Implementation (std::chrono High-Resolution Timing)

\`\`\`cpp
#include <iostream>
#include <chrono>

/**
 * C++ Syntax Logic Note:
 * 1. std::chrono::high_resolution_clock: Platform-independent nanosecond-accurate timer.
 * 2. auto duration: std::chrono::duration_cast<std::chrono::microseconds> converts ticks.
 */

void measureAlgorithm() {
    auto start = std::chrono::high_resolution_clock::now();

    // Simulated Workload
    long long total = 0;
    for (int i = 0; i < 1000000; ++i) {
        total += i;
    }

    auto end = std::chrono::high_resolution_clock::now();
    auto duration = std::chrono::duration_cast<std::chrono::microseconds>(end - start);

    std::cout << "Sum: " << total << " computed in " << duration.count() << " microseconds.\\n";
}
\`\`\`

---

### Python Implementation (time.perf_counter & Asymptotic Growth)

\`\`\`python
"""
Python Syntax Logic Note:
1. time.perf_counter(): Highest resolution monotonic clock for benchmarking in Python.
2. Exponential doubling test (n, 2n, 4n): If runtime multiplies by ~4, algorithm is O(n^2).
   If runtime doubles, algorithm is O(n).
"""

import time

def verify_complexity():
    for n in [1000, 2000, 4000]:
        start = time.perf_counter()
        
        # O(n^2) nested list comprehension
        _ = sum(i * j for i in range(n) for j in range(100))
        
        elapsed = time.perf_counter() - start
        print(f"n = {n}: {elapsed:.4f}s")
\`\`\`

---

## 7. GATE, UGC NET & NPTEL Key Exam Insights

> [!IMPORTANT]
> **GATE Trap: Big-O is NOT "exact complexity"!**
> $O(n^2)$ means "at most $n^2$ growth". So $O(n)$ is technically also $O(n^2)$ — it's just not a tight bound.
> For tight bound, use $\Theta$. Most algorithms are described with $\Theta$ in GATE solutions.

> [!TIP]
> **NPTEL / GATE Rule of Thumb for Loop Counting**:
> - For \`while (i < n); i++\` starting at $0$: Condition tested $n + 1$ times; body executes $n$ times.
> - For \`while (i <= n); i++\` starting at $0$: Condition tested $n + 2$ times; body executes $n + 1$ times.
> - For step size $s$ starting at $m$ down to $\\ge 0$: Body executes $\\lfloor m/s \\rfloor + 1$ times; Condition tested $\\lfloor m/s \\rfloor + 2$ times.

> [!NOTE]
> **Common Exam Question Patterns**:
> 1. "How many times is the condition evaluated?" (NPTEL Week 1 / GATE CS)
> 2. "Arrange functions in increasing order of asymptotic growth" (GATE CS)
> 3. "Apply Master Theorem or state why it does not apply" (GATE CS & UGC NET)
> 4. "Compute exact closed-form using substitution method"
`,
  subModules: [],
  practiceQuiz: [
    {
      id: "asymp-nptel-q1",
      question:
        "How many times is the while condition tested if the following function is called as f(165, 15)?\n\nf(m, n) {\n  ans = 1;\n  while (m >= 0) {\n    ans = ans * (ans + 1);\n    m = m - n;\n  }\n  return(ans);\n}",
      options: ["11", "12", "13", "14"],
      correctAnswer: 2,
      explanation:
        "The while condition (m >= 0) is tested 13 times in total:\n\n1. Values of m where condition is True (12 times): 165, 150, 135, 120, 105, 90, 75, 60, 45, 30, 15, 0.\n2. In the 12th iteration, m becomes 0 - 15 = -15.\n3. The condition is evaluated a 13th time: (-15 >= 0) evaluates to False, terminating the loop.\n\nUniversal Rule: Total Condition Tests = Loop Body Iterations + 1 = 12 + 1 = 13.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "NPTEL Week 1 Quiz",
    },
    {
      id: "asymp-nptel-q2",
      question:
        "A new game in the appstore called AmazeMe involves finding a path out of an n-dimensional maze. The authors of the game claim there is a solution with worst case complexity O(n⁴ log n), where n is the number of dimensions.\n\nFrom this, we can conclude that:",
      options: [
        "For every sufficiently large n, every input maze of dimension n requires time proportional to n⁴ log n.",
        "For every sufficiently large n, every input maze of dimension n can be solved within time proportional to n⁴ log n.",
        "For every sufficiently large n, there is an input maze of size n that requires time proportional to n⁴ log n.",
        "For some n, every input maze of size n requires time proportional to n⁴ log n.",
      ],
      correctAnswer: 1,
      explanation:
        "By definition, Big-O notation O(g(n)) represents an asymptotic UPPER bound on runtime.\n\nStating that an algorithm has worst-case complexity O(n⁴ log n) means that for all sufficiently large n, the running time on ANY input of dimension n is AT MOST proportional to n⁴ log n.\n\n- Option A is incorrect: It uses 'requires time proportional to...', which implies a lower bound (Ω).\n- Option C is incorrect: It assumes there must exist a worst-case input requiring Θ(n⁴ log n). However, O is not necessarily a tight bound (an algorithm that runs in O(n) also technically satisfies O(n⁴ log n)).\n- Option D is incorrect: Asymptotic bounds apply for all sufficiently large n, not just 'some n'.\n\nTherefore, every input maze of dimension n can be solved WITHIN time proportional to n⁴ log n.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "NPTEL Week 1 Quiz",
    },
    {
      id: "asymp-nptel-q3",
      question:
        "You are executing an algorithm with worst-case time complexity O(n³) on a CPU that can perform 10⁹ operations per second. What is the most accurate bound for the time required to solve a worst case input of size 30,000?",
      options: [
        "Under 8 minutes",
        "Under 8 hours",
        "Under 8 days",
        "Under 8 months",
      ],
      correctAnswer: 1,
      explanation:
        "Step-by-step calculation:\n\n1. Total operations required: T(n) = n³ = (30,000)³ = (3 × 10⁴)³ = 27 × 10¹² operations.\n2. CPU processing rate: 10⁹ operations per second.\n3. Time in seconds: (27 × 10¹²) / 10⁹ = 27,000 seconds.\n4. Convert to minutes: 27,000 / 60 = 450 minutes.\n5. Convert to hours: 450 / 60 = 7.5 hours.\n\nComparing with the options:\n- 7.5 hours is greater than 8 minutes.\n- 7.5 hours is strictly under 8 hours (7.5h < 8h).\n\nHence, the most accurate (tightest) upper bound among the choices is 'Under 8 hours'.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "NPTEL Week 1 Quiz",
    },
    {
      id: "asymp-nptel-q4",
      question:
        "Suppose f(n) is n√n. Consider the following statements:\n\n• (A) f(n) is O(n log n)\n• (B) f(n) is O(n²)\n• (C) f(n) is O(n⁴)\n\nWhich of the following is true?",
      options: [
        "(A) is true but (B) and (C) are not true.",
        "(A) and (B) are true but (C) is not true.",
        "(B) is true but (A) and (C) are not true.",
        "(B) and (C) are true but (A) is not true.",
      ],
      correctAnswer: 3,
      explanation:
        "Given f(n) = n√n = n¹ · n^(0.5) = n^(1.5).\n\n1. Statement (A): f(n) is O(n log n)\n   Compare growth: lim (n^1.5) / (n log n) = lim (n^0.5) / log n = ∞ (by L'Hôpital's rule).\n   Since n^1.5 grows strictly faster than n log n, f(n) ≠ O(n log n). So (A) is FALSE.\n\n2. Statement (B): f(n) is O(n²)\n   n^1.5 ≤ n² for all n ≥ 1. Since n^1.5 grows slower than n², f(n) = O(n²) is TRUE.\n\n3. Statement (C): f(n) is O(n⁴)\n   n^1.5 ≤ n⁴ for all n ≥ 1. Because Big-O is an upper bound, any polynomial with higher exponent is a valid upper bound. Thus f(n) = O(n⁴) is TRUE.\n\nConclusion: (B) and (C) are true but (A) is not true.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "NPTEL Week 1 Quiz",
    },
    {
      id: "asymp-nptel-q5",
      question:
        'In the code fragment below, first and last are integer values and composite(x) is a function that returns true if x is not a prime number and false otherwise.\n\ni = 0; j = 0; k = 0;\nfor (m = last; m >= first; m = m - 1){\n  k = k - m;\n  if (composite(m)){\n    i = i - m;\n  }else{\n    j = j - m;\n  }\n}\n\nif (...) {\n  print("True");\n}else{\n  print("False");\n}\n\nWhich of the following expressions can we put in place of the missing if condition (...) to ensure that the program prints "True"?',
      options: [
        "k < i + j",
        "k == i + j",
        "k > i + j",
        "None of the other options is universally true. The expression depends on the values of first and last.",
      ],
      correctAnswer: 1,
      explanation:
        "Analysis via Loop Invariants:\n\n1. Initialization:\n   Initially i = 0, j = 0, k = 0. Notice k = i + j holds initially (0 = 0 + 0).\n\n2. Maintenance in each iteration:\n   - k decreases by m: Δk = -m.\n   - If composite(m) is True: i decreases by m (Δi = -m), while j remains unchanged (Δj = 0). Thus Δ(i + j) = -m + 0 = -m = Δk.\n   - If composite(m) is False: j decreases by m (Δj = -m), while i remains unchanged (Δi = 0). Thus Δ(i + j) = 0 + (-m) = -m = Δk.\n\n3. Conclusion:\n   In EVERY iteration, regardless of whether m is prime or composite, Δk = Δ(i + j). Therefore the equality k = i + j is a universal loop invariant that holds before, during, and after the loop terminates for ANY values of first and last.\n\nHence, the condition that always prints 'True' is k == i + j.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "NPTEL Week 1 Quiz",
    },
    {
      id: "asymp-q6",
      question:
        "What is the asymptotic time complexity of the recurrence relation T(n) = 4T(n/2) + n²?",
      options: ["Θ(n²)", "Θ(n² log n)", "Θ(n³)", "Θ(n log n)"],
      correctAnswer: 1,
      explanation:
        "Using Master Theorem: T(n) = aT(n/b) + f(n) where a = 4, b = 2, f(n) = n².\nlog_b(a) = log_2(4) = 2.\nHere f(n) = Θ(n^k log^p n) with k = 2, p = 0.\nSince log_b(a) = k = 2 and p = 0 > -1, this falls into Case 2a: T(n) = Θ(n^k log^(p+1) n) = Θ(n² log n).",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Master Theorem",
    },
    {
      id: "asymp-q7",
      question: "If f(n) = O(g(n)), does it imply that 2^(f(n)) = O(2^(g(n)))?",
      options: [
        "Yes, exponentiation always preserves asymptotic upper bounds",
        "No, for example f(n) = 2n and g(n) = n satisfies f(n) = O(g(n)), but 2^(2n) = 4^n ≠ O(2^n)",
        "Yes, provided g(n) ≥ 1 for all n",
        "No, only when f(n) and g(n) are logarithmic functions",
      ],
      correctAnswer: 1,
      explanation:
        "Counterexample: Let f(n) = 2n and g(n) = n. Here 2n = O(n) (with c=2). However, 2^(f(n)) = 2^(2n) = 4^n, while 2^(g(n)) = 2^n. The ratio 4^n / 2^n = 2^n → ∞ as n → ∞, so 4^n ≠ O(2^n). Exponentiation does NOT preserve Big-O!",
      difficulty: "hard",
      type: "MCQ",
      topicTag: "GATE CS Property",
    },
  ],
};
