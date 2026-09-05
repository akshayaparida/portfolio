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

---

## 3. Asymptotic Notations: Mathematical Definitions

### 3.1 Big-O Notation (Asymptotic Upper Bound)
$$f(n) = O(g(n)) \\iff \\exists \\, c > 0, n_0 > 0 \\text{ such that } 0 \\le f(n) \\le c \\cdot g(n) \\quad \\forall \\, n \\ge n_0$$
*Meaning*: $f(n)$ grows **at most as fast as** $g(n)$ (Worst-Case rate).

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

## 7. GATE & UGC NET Key Exam Insights

> [!IMPORTANT]
> **GATE Trap: Big-O is NOT "exact complexity"!**
> $O(n^2)$ means "at most $n^2$ growth". So $O(n)$ is technically also $O(n^2)$ — it's just not a tight bound.
> For tight bound, use $\\Theta$. Most algorithms are described with $\\Theta$ in GATE solutions.

> [!NOTE]
> **Common GATE Question Types**:
> 1. "Arrange in increasing order of asymptotic growth"
> 2. "Apply Master Theorem to solve T(n) = ..."
> 3. "What is the time complexity of this code snippet?"
`,
};
