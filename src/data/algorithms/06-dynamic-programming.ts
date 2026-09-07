import { LearningModule } from "@/types/learning";

export const dynamicProgrammingModule: LearningModule = {
  id: "06-dynamic-programming",
  title: "6. Dynamic Programming (DP)",
  description:
    "Overlapping subproblems, optimal substructure, Memoization vs Tabulation, space optimization, 0/1 Knapsack, Longest Common Subsequence (LCS), Matrix Chain Multiplication (MCM), and Coin Change across C, C++, and Python",
  status: "completed",
  tags: ["Algorithm", "GATE CS", "UGC NET", "NPTEL"],
  detailedContent: `# Dynamic Programming (DP) Paradigm

> **NPTEL / GATE CS / UGC NET Core Subject**
> Key Exam Questions: 0/1 Knapsack recurrence and table filling, LCS length recurrence ($O(mn)$), Matrix Chain Multiplication parenthesization ($O(n^3)$), Coin Change variations, and Space Optimization techniques.

---

## 1. Prerequisites & What You Should Know

Before mastering Dynamic Programming, ensure you understand:
- **Recursion Trees & Redundant Work**: Being able to trace a recursive call stack and spot repeated subproblem evaluations.
- **DAG (Directed Acyclic Graph) Topological Ordering**: Every DP problem represents a topological sort over a DAG of dependent states!
- **State Representation**: Defining what parameters uniquely identify a subproblem (e.g., \`dp[i][w]\` = max value using first $i$ items with capacity $w$).
- **Mathematical Induction**: Showing that if smaller states are optimal, the transition function preserves optimality for larger states.

---

## 2. Conceptual Intuition: The Fibonacci Tragedy & The Sticky Note

\`\`\`
Naive Recursive Fibonacci: fib(5)
                           fib(5)
                       /           \\
                  fib(4)            fib(3)
                 /      \\          /      \\
             fib(3)    fib(2)    fib(2)   fib(1)
            /     \\     /   \\     /   \\
        fib(2)  fib(1) f(1) f(0) f(1) f(0)
        /   \\
      f(1)  f(0)

Notice: fib(3) is recomputed 2 times!
        fib(2) is recomputed 3 times!
Total calls grow exponentially as O(2^n) = O(1.618^n)!
For n = 50, naive recursion takes ~1.12 * 10^15 operations (years of compute).
\`\`\`

### The Sticky Note (Memoization) Principle
> *"Those who cannot remember the past are condemned to repeat it."*
> — George Santayana (Adapted by Richard Bellman)

Whenever you compute an answer to a subproblem for the first time, write it down on a **sticky note (lookup table / array)**. Before performing any recursive calculation, first check if you already have a sticky note for that exact input. If so, return it in **$O(1)$ constant time**!

This collapses the entire exponential tree down into a linear chain of $n$ unique states: $O(n)$ time!

---

## 3. The Two Golden Rules of Dynamic Programming

A problem can be solved using Dynamic Programming if and only if it satisfies:

1. **Overlapping Subproblems**:
   A recursive algorithm visits the **exact same subproblems over and over**, rather than generating brand-new subproblems at every step (which occurs in Divide & Conquer).
2. **Optimal Substructure**:
   An optimal solution to the global problem can be constructed by combining the **optimal solutions of its subproblems**.

---

## 4. Memoization (Top-Down) vs Tabulation (Bottom-Up)

\`\`\`
Top-Down (Memoization):
[Main Problem] -> Needs Subproblem A & B -> Recurse downwards -> Base cases reached -> Store in cache & return up

Bottom-Up (Tabulation):
[Base Cases: dp[0], dp[1]] -> Iteratively compute dp[2] -> dp[3] -> ... -> [dp[N]: Final Answer]
\`\`\`

| Feature | Top-Down (Memoization) | Bottom-Up (Tabulation) |
|:---|:---|:---|
| **Formulation** | Recursive with cache dictionary/array | Iterative table filling via nested loops |
| **Call Stack Overhead**| Incurs function call stack depth $O(N)$ (risk of stack overflow) | **Zero call-stack overhead** ($O(1)$ auxiliary stack) |
| **State Exploration** | Computes only states strictly reachable from root | Systematically computes all states in topological order |
| **Space Optimization** | Difficult to discard old states | **Easy to optimize** (e.g. keep only previous row or previous 2 numbers) |

---

## 5. Classic DP Formulations Deconstructed

### 5.1 0/1 Knapsack Recurrence
Given $n$ items with weights $wt[i]$ and values $val[i]$, and knapsack capacity $W$:

$$
DP[i][w] = \\begin{cases} 
DP[i-1][w] & \\text{if } wt[i-1] > w \\\\
\\max(DP[i-1][w], \\, val[i-1] + DP[i-1][w - wt[i-1]]) & \\text{if } wt[i-1] \\le w 
\\end{cases}
$$

- **Time Complexity**: $\\Theta(n W)$
- **Why is it Pseudo-Polynomial?** $W$ is an integer value, not the number of inputs. The input size of $W$ in bits is $\\log_2 W$. Hence runtime is exponential in terms of input bit length ($O(n \\cdot 2^b)$)!
- **1D Space Optimization**: By looping capacity $w$ in **reverse order** (from $W$ down to $wt[i]$), we ensure each item is used at most once while reducing memory from $O(nW)$ to $O(W)$!

### 5.2 Longest Common Subsequence (LCS)
For strings $X[0 \\dots m-1]$ and $Y[0 \\dots n-1]$:

$$
LCS[i][j] = \\begin{cases}
0 & \\text{if } i=0 \\text{ or } j=0 \\\\
1 + LCS[i-1][j-1] & \\text{if } X[i-1] == Y[j-1] \\\\
\\max(LCS[i-1][j], \\, LCS[i][j-1]) & \\text{if } X[i-1] \\ne Y[j-1]
\\end{cases}
$$

- Computes the longest sequence of characters that appear in both strings in the same relative order (not necessarily contiguous).
- Backtracking from $DP[m][n]$ reconstructs the exact subsequence string in $O(m + n)$ time.

### 5.3 Matrix Chain Multiplication (MCM)
Given matrices $A_1, A_2, \\dots, A_n$ where $A_i$ has dimension $p_{i-1} \\times p_i$:
- Matrix multiplication is associative: $(A_1 A_2) A_3 = A_1 (A_2 A_3)$.
- But the number of scalar multiplications depends drastically on the order:
  - Multiplying $A_{10 \\times 100} \\times B_{100 \\times 5} \\times C_{5 \\times 50}$:
    - Order $(AB)C$: $(10 \\times 100 \\times 5) + (10 \\times 5 \\times 50) = 5{,}000 + 2{,}500 = 7{,}500$ operations.
    - Order $A(BC)$: $(100 \\times 5 \\times 50) + (10 \\times 100 \\times 50) = 25{,}000 + 50{,}000 = 75{,}000$ operations! (10× slower!)
- **Recurrence**:

$$
m[i, j] = \\begin{cases}
0 & \\text{if } i = j \\\\
\\min_{i \\le k < j} \\{ m[i, k] + m[k+1, j] + p_{i-1} p_k p_j \\} & \\text{if } i < j
\\end{cases}
$$

- Time Complexity: $\\Theta(n^3)$, Space Complexity: $\\Theta(n^2)$.

---

## 6. Real-World Applications

1. **Bioinformatics & Genomics**: Needleman-Wunsch (global alignment) and Smith-Waterman (local alignment) algorithms align DNA and amino-acid sequences using 2D DP matrices.
2. **Version Control (\`git diff\`)**: Myers diff algorithm finds the shortest edit script (LCS) between two file revisions.
3. **Speech Recognition & Telecom**: The **Viterbi Algorithm** decodes hidden states in Hidden Markov Models (HMMs) for natural speech and CDMA mobile phone error-correcting codes.
4. **Natural Language Processing**: Spell checkers, autocomplete suggestions, and search engines compute Levenshtein Minimum Edit Distance via DP.

---

## 7. Implementation in C, C++, and Python with Syntax Logic

### C Implementation (0/1 Knapsack: 1D Space Optimized O(W))

\`\`\`c
#include <stdio.h>
#include <string.h>

/**
 * C Syntax Logic Note:
 * 1. 1D Array Optimization: Notice dp[w] depends only on previous row dp[w - wt[i]].
 *    Traversing w BACKWARDS from W down to wt[i] prevents overwriting values from
 *    the current item, shrinking space from O(nW) to O(W)!
 * 2. memset(): Rapidly zeroes the buffer in contiguous memory.
 */

int knapsack01(int W, int wt[], int val[], int n) {
    int dp[W + 1];
    memset(dp, 0, sizeof(dp));

    for (int i = 0; i < n; i++) {
        // Iterate backwards to ensure 0/1 (single item usage) constraint!
        for (int w = W; w >= wt[i]; w--) {
            int take = val[i] + dp[w - wt[i]];
            if (take > dp[w]) {
                dp[w] = take;
            }
        }
    }
    return dp[W];
}
\`\`\`

---

### C++ Implementation (Longest Common Subsequence - LCS Table & Backtracking)

\`\`\`cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

/**
 * C++ Syntax Logic Note:
 * 1. std::vector<std::vector<int>> dp(m+1, std::vector<int>(n+1, 0)):
 *    Dynamically allocates (m+1) x (n+1) 2D table initialized with 0s.
 * 2. Reconstruction: Backtracks from dp[m][n] to reconstruct the actual LCS string.
 * 3. std::reverse: Inverts the reconstructed string since backtracking starts from the end.
 */

std::string getLCS(const std::string& X, const std::string& Y) {
    int m = static_cast<int>(X.size());
    int n = static_cast<int>(Y.size());
    std::vector<std::vector<int>> dp(m + 1, std::vector<int>(n + 1, 0));

    // Fill DP table iteratively
    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            if (X[i - 1] == Y[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = std::max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Backtrack from bottom-right to build the actual string
    std::string lcs = "";
    int i = m, j = n;
    while (i > 0 && j > 0) {
        if (X[i - 1] == Y[j - 1]) {
            lcs.push_back(X[i - 1]);
            i--; j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    std::reverse(lcs.begin(), lcs.end());
    return lcs;
}
\`\`\`

---

### Python Implementation (Coin Change Problem & functools.lru_cache)

\`\`\`python
"""
Python Syntax Logic Note:
1. @functools.lru_cache(None): Automatically memoizes recursive function calls,
   turning exponential O(2^n) recursion into polynomial O(n * amount) top-down DP!
2. Tabulation: dp[a] = min(dp[a], 1 + dp[a - c]).
3. float('inf'): Represents unreachable states during dynamic table initialization.
"""

from functools import lru_cache
from typing import List

def coin_change(coins: List[int], amount: int) -> int:
    """
    Finds minimum coins to make target amount.
    Time Complexity: O(amount * len(coins)), Space: O(amount).
    """
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0

    for a in range(1, amount + 1):
        for coin in coins:
            if a - coin >= 0:
                dp[a] = min(dp[a], 1 + dp[a - coin])

    return dp[amount] if dp[amount] != float('inf') else -1
\`\`\`
`,
  subModules: [],
  practiceQuiz: [
    {
      id: "dp-gate-q1",
      question:
        "The 0/1 Knapsack problem can be solved using dynamic programming in $\\Theta(n W)$ time, where $n$ is the number of items and $W$ is the maximum weight capacity. Why is this algorithm classified as pseudo-polynomial rather than strictly polynomial time?",
      options: [
        "Because $W$ is a numeric value whose input representation requires $\\log_2 W$ bits; runtime is exponential ($2^b$) in terms of input bit length.",
        "Because it only produces an approximate solution to the knapsack problem.",
        "Because the time complexity depends on fractional values of item weights.",
        "Because it requires backtracking through a 2D table rather than computing the answer in a single pass.",
      ],
      correctAnswer: 0,
      explanation:
        "An algorithm is strictly polynomial if its running time is bounded by a polynomial function of the INPUT SIZE in bits (length of input string).\n\n1. In 0/1 Knapsack, the capacity $W$ is an integer encoded in $b = \\lfloor \\log_2 W \\rfloor + 1$ bits.\n2. The algorithm's running time is proportional to $n \\times W = n \\times 2^b$.\n3. Because the runtime is exponential with respect to the number of input bits $b$, it is classified as PSEUDO-POLYNOMIAL time (polynomial in the numerical value of the input, but exponential in the representation length).",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "GATE CS / Knapsack",
    },
    {
      id: "dp-gate-q2",
      question:
        "Given three matrices $A_{10 \\times 20}$, $B_{20 \\times 30}$, and $C_{30 \\times 40}$, what is the MINIMUM number of scalar multiplications required to compute the product $ABC$ via optimal Matrix Chain parenthesization?",
      options: ["18,000", "24,000", "32,000", "12,000"],
      correctAnswer: 0,
      explanation:
        "For product $ABC$ with dimension array $p = [10, 20, 30, 40]$, there are two possible parenthesizations:\n\n1. Order $(AB)C$:\n   - Multiplying $A(10 \\times 20) \\times B(20 \\times 30)$ costs $10 \\times 20 \\times 30 = 6{,}000$ multiplications, producing matrix of dimension $10 \\times 30$.\n   - Multiplying $(AB)(10 \\times 30) \\times C(30 \\times 40)$ costs $10 \\times 30 \\times 40 = 12{,}000$ multiplications.\n   - Total cost = $6{,}000 + 12{,}000 = 18{,}000$.\n\n2. Order $A(BC)$:\n   - Multiplying $B(20 \\times 30) \\times C(30 \\times 40)$ costs $20 \\times 30 \\times 40 = 24{,}000$ multiplications, producing matrix of dimension $20 \\times 40$.\n   - Multiplying $A(10 \\times 20) \\times (BC)(20 \\times 40)$ costs $10 \\times 20 \\times 40 = 8{,}000$ multiplications.\n   - Total cost = $24{,}000 + 8{,}000 = 32{,}000$.\n\nMinimum scalar multiplications = $\\min(18{,}000, 32{,}000) = 18{,}000$.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "GATE CS / MCM",
    },
    {
      id: "dp-gate-q3",
      question:
        "What is the length of the Longest Common Subsequence (LCS) between strings $X = \\text{'AGGTAB'}$ and $Y = \\text{'GXTXAYB'}$?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1,
      explanation:
        "Step-by-step LCS analysis for $X = \\text{'AGGTAB'}$ and $Y = \\text{'GXTXAYB'}$:\n\n- Looking for common ordered characters:\n  - 'G' (index 1 in X, index 0 in Y)\n  - 'T' (index 3 in X, index 2 in Y)\n  - 'A' (index 4 in X, index 4 in Y)\n  - 'B' (index 5 in X, index 6 in Y)\n\nThe actual longest common subsequence is 'GTAB', which has a length of 4.\n\nNo common subsequence of length 5 exists.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "GATE CS / LCS",
    },
    {
      id: "dp-gate-q4",
      question:
        "When optimizing 0/1 Knapsack from a 2D table $DP[n+1][W+1]$ down to a 1D array $dp[W+1]$, why is it MANDATORY to iterate the capacity $w$ in decreasing order (from $W$ down to $wt[i]$)?",
      options: [
        "To ensure each item $i$ is included at most once, since computing $dp[w]$ requires values from the previous row $dp[w - wt[i]]$.",
        "Because descending loops have lower branching overhead in modern compilers.",
        "To reduce the time complexity from $O(nW)$ to $O(W)$.",
        "To guarantee that the knapsack capacity remains strictly non-negative.",
      ],
      correctAnswer: 0,
      explanation:
        "In 0/1 Knapsack, each item can be selected at most once.\n\n- If we iterate FORWARD ($w = wt[i] \\dots W$), updating $dp[w]$ overwrites earlier indices with values that already include item $i$. When computing later states like $dp[w + wt[i]]$, the same item would be included multiple times (which solves Unbounded Knapsack, not 0/1 Knapsack!).\n- By iterating BACKWARD ($w = W \\dots wt[i]$), when computing $dp[w] = \\max(dp[w], val[i] + dp[w - wt[i]])$, the term $dp[w - wt[i]]$ still preserves the value from the PREVIOUS item $(i-1)$. Thus, item $i$ is used at most once.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "NPTEL / Space Optimization",
    },
    {
      id: "dp-gate-q5",
      question:
        "Dynamic Programming relies fundamentally on the Principle of Optimality (Optimal Substructure). Which of the following problems does NOT exhibit optimal substructure, meaning Dynamic Programming cannot be applied directly?",
      options: [
        "Longest Simple Path between two vertices in an unweighted general directed graph",
        "Shortest Path between two vertices in a directed graph without negative weight cycles",
        "Matrix Chain Multiplication minimum cost parenthesization",
        "Longest Increasing Subsequence (LIS)",
      ],
      correctAnswer: 0,
      explanation:
        "Optimal substructure states that an optimal solution to a problem contains optimal solutions to subproblems.\n\n- Shortest Path has optimal substructure: any subpath of a shortest path is also a shortest path between its endpoints.\n- Matrix Chain Multiplication and LIS both clearly satisfy optimal substructure.\n- Longest Simple Path (path without repeating vertices) DOES NOT have optimal substructure! If the longest simple path from $u$ to $v$ passes through $w$, decomposing it into $u \\to w$ and $w \\to v$ requires both subpaths to be independent and simple. However, the longest simple path from $u$ to $w$ and from $w$ to $v$ might share intermediate vertices, resulting in a non-simple path (cycles). In fact, finding the longest simple path in a general graph is NP-hard!",
      difficulty: "hard",
      type: "MCQ",
      topicTag: "GATE CS / Optimal Substructure",
    },
  ],
};
