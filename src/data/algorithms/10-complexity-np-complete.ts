import { LearningModule } from "@/types/learning";

export const complexityNpCompleteModule: LearningModule = {
  id: "10-complexity-np-complete",
  title: "10. NP-Completeness & Complexity Classes",
  description:
    "P, NP, NP-Complete, and NP-Hard classes, polynomial-time reductions, Cook-Levin Theorem, Karp's 21 problems, approximation strategies, and classic polynomial verifiers across C, C++, and Python",
  status: "completed",
  tags: ["Algorithm", "GATE CS", "UGC NET", "NPTEL"],
  detailedContent: `# NP-Completeness, Reductions & Intractability

> **NPTEL / GATE CS / UGC NET Advanced Subject**
> Key Exam Questions: Venn diagram relationships ($P \\subseteq NP$, $P \\ne NP$ conjecture), Cook-Levin theorem, Polynomial-time reduction direction ($A \\le_p B$), contrapositive deductions, and classic NP-Complete problem equivalences.

---

## 1. Prerequisites & What You Should Know

Before studying complexity theory, ensure you understand:
- **Decision vs Optimization Problems**:
  - *Optimization*: "Find the minimum-weight Hamiltonian cycle in $G$."
  - *Decision*: "Does there exist a Hamiltonian cycle in $G$ with weight $\\le k$?"
  - NP-Completeness is strictly formulated for **Decision Problems** (Yes/No answers). Any optimization problem can be cast as a decision problem via binary search over bound $k$.
- **Turing Machines**:
  - *Deterministic Turing Machine (DTM)*: Follows exactly one unique execution branch for each state and input symbol.
  - *Nondeterministic Turing Machine (NTM)*: Can evaluate multiple execution branches simultaneously ("magically" guessing the right branch).
- **Polynomial Time ($O(n^k)$)**: Runtimes like $O(n)$, $O(n^2)$, $O(n^3)$ considered "tractable" or "efficient". Runtimes like $O(2^n)$ or $O(n!)$ considered "intractable".

---

## 2. Conceptual Intuition: The Sudoku Analogy & The Millennium Prize

\`\`\`
The Sudoku / Jigsaw Puzzle Analogy:
- Finding a Solution from Scratch (SOLVING):
  Solving an expert 25x25 Sudoku or assembling a 2,000-piece white jigsaw puzzle
  requires agonizing trial, error, backtracking, and exponential time (NP Search).

- Checking a Proposed Solution (VERIFYING):
  If someone hands you a completed Sudoku board, checking that every row, column,
  and box contains digits 1-9 takes only a few seconds of simple scanning!
  Verification runs in fast POLYNOMIAL TIME (Class P)!
\`\`\`

### The $P$ vs $NP$ Question ($1,000,000 Clay Millennium Prize)
- **$P$**: Problems that are easy to **SOLVE** (in polynomial time).
- **$NP$**: Problems whose solutions are easy to **VERIFY** (in polynomial time).
- Does $P = NP$? If someone proves $P = NP$, it means *any problem that can be verified easily can also be solved easily*!
- Most computer scientists believe **$P \\ne NP$**.

---

## 3. The Four Fundamental Complexity Classes

\`\`\`
                  Complexity Universe (Assuming P != NP)
    +-------------------------------------------------------------+
    |                         NP-HARD                             |
    |  (Halting Problem, TSP Optimization, Circuit Minimization)  |
    |                                                             |
    |          +--------------------------------------+           |
    |          |                 NP                   |           |
    |          |    +---------------------------+     |           |
    |          |    |        NP-COMPLETE        |     |           |
    |          |    | (3-SAT, Clique, SubSetSum)|     |           |
    |          |    +---------------------------+     |           |
    |          |                                      |           |
    |          |         +---------------+            |           |
    |          |         |       P       |            |           |
    |          |         | (Sort, Short- |            |           |
    |          |         |  est Path,    |            |           |
    |          |         |  2-SAT, Prim) |            |           |
    |          |         +---------------+            |           |
    |          +--------------------------------------+           |
    +-------------------------------------------------------------+
\`\`\`

1. **Class P (Polynomial Time)**:
   Decision problems solvable by a Deterministic Turing Machine in $O(n^k)$ time.
2. **Class NP (Nondeterministic Polynomial Time)**:
   Decision problems verifiable in $O(n^k)$ time by a deterministic algorithm when supplied with a polynomial-sized certificate (witness).
3. **NP-Hard**:
   A problem $H$ is NP-Hard if **every problem in $NP$ can be polynomial-time reduced to $H$**:
   $$\\forall L \\in NP, \\quad L \\le_p H$$
   *(Note: $H$ does NOT need to be in $NP$. For example, the Halting Problem is NP-Hard, but is undecidable!)*
4. **NP-Complete (NPC)**:
   A problem $X$ is NP-Complete if:
   1. $X \\in NP$ (verifiable in polynomial time), AND
   2. $X \\in \\text{NP-Hard}$ (at least as hard as everything in NP).

---

## 4. Polynomial-Time Reductions ($A \\le_p B$)

If problem $A$ reduces to problem $B$ in polynomial time ($A \\le_p B$), it means:
**Problem $B$ is AT LEAST AS HARD AS problem $A$**.

\`\`\`
   Input for A ----> [ Poly-Time Transformer: f(x) ] ----> Input for B
                                                                 |
                                                          [ Solver for B ]
                                                                 |
   Answer for A <--------------------------------------- Answer for B
\`\`\`

### GATE Exam Deductive Rules:
- **Rule 1 (Easy implies Easy)**: If $A \\le_p B$ and $B \\in P$, then $A \\in P$.
- **Rule 2 (Hard implies Hard)**: If $A \\le_p B$ and $A$ is NP-Hard, then $B$ is NP-Hard!
- **GATE TRAP 1**: If $A \\le_p B$ and $A \\in P$, this tells us **NOTHING** about $B$ ($B$ could be easy or impossible).
- **GATE TRAP 2**: If $A \\le_p B$ and $B$ is NP-Complete, this tells us **NOTHING** about $A$.

---

## 5. Cook-Levin Theorem & Karp's 21 NP-Complete Problems

### The Cook-Levin Theorem (1971)
Stephen Cook and Leonid Levin proved that **Boolean Satisfiability (SAT)** is NP-Complete from first principles by simulating the transitions of any arbitrary Nondeterministic Turing Machine as a polynomial-sized boolean formula!

### Classic Reduction Chain:
$$\\text{Circuit-SAT} \\le_p \\text{3-SAT} \\le_p \\text{Clique} \\le_p \\text{Vertex Cover} \\le_p \\text{Hamiltonian Cycle} \\le_p \\text{TSP (Decision)}$$

| Problem | Description | Complexity Status |
|:---|:---|:---|
| **2-SAT** | Boolean formula with 2 literals per clause | **In P** ($O(V + E)$ via SCCs) |
| **3-SAT** | Boolean formula with 3 literals per clause | **NP-Complete** |
| **Eulerian Tour**| Traverse every edge exactly once | **In P** ($O(V + E)$ degree check) |
| **Hamiltonian Cycle**| Traverse every vertex exactly once | **NP-Complete** |
| **Shortest Path**| Path with minimum total weight | **In P** ($O((V+E)\\log V)$ Dijkstra) |
| **Longest Simple Path**| Simple path with maximum weight | **NP-Complete** |
| **Halting Problem**| Will a given program terminate? | **Undecidable** (Not in NP!) |

---

## 6. How Software Engineers Cope with NP-Completeness

When facing an NP-Complete problem in industry:
1. **Approximation Algorithms**: Settle for a provably near-optimal solution in polynomial time (e.g. 2-approximation for Vertex Cover).
2. **Pseudo-Polynomial Algorithms**: Use Dynamic Programming if numerical parameters are small (e.g., 0/1 Knapsack runs in $O(nW)$ time).
3. **Branch-and-Bound / SAT Solvers**: Exploit specialized pruning heuristics that solve most real-world instances in seconds despite worst-case exponential theory.
4. **Special Graph Classes**: Many NP-hard problems become solvable in $O(n)$ time on trees, planar graphs, or chordal graphs.

---

## 7. Polynomial-Time Verification in C, C++, and Python

While *solving* an NP-Complete problem takes exponential time, *verifying* a proposed certificate takes only polynomial time.

### C Implementation (Subset Sum Certificate Verifier: O(n) Verification)

\`\`\`c
#include <stdio.h>
#include <stdbool.h>

/**
 * C Syntax Logic Note:
 * 1. Polynomial Verifier: Takes candidate subset array and target sum.
 * 2. Checks validity in O(candSize * setSize) polynomial time:
 *    every candidate exists in original set AND sum(candidate) == target.
 */

bool verifySubsetSum(const int originalSet[], int setSize, const int candidate[], int candSize, int target) {
    long long sum = 0;

    for (int i = 0; i < candSize; i++) {
        // 1. Verify candidate element exists in original set
        bool exists = false;
        for (int j = 0; j < setSize; j++) {
            if (originalSet[j] == candidate[i]) {
                exists = true;
                break;
            }
        }
        if (!exists) return false;

        sum += candidate[i];
    }

    // 2. Verify sum equals target
    return sum == target;
}
\`\`\`

---

### C++ Implementation (Vertex Cover Verifier in O(V + E) Time)

\`\`\`cpp
#include <iostream>
#include <vector>
#include <unordered_set>

/**
 * C++ Syntax Logic Note:
 * 1. std::unordered_set: O(1) average hash lookup for proposed vertex cover.
 * 2. Verifier: Loops through every edge (u, v); if neither u nor v is in the set,
 *    the certificate is INVALID.
 * 3. Total verification time: O(k + E) which is strictly polynomial!
 */

bool verifyVertexCover(const std::vector<std::pair<int, int>>& edges,
                       const std::vector<int>& candidateCover,
                       int k) {
    // Check if candidate cover size does not exceed k
    if (static_cast<int>(candidateCover.size()) > k) return false;

    std::unordered_set<int> cover(candidateCover.begin(), candidateCover.end());

    // Every edge must have at least one endpoint in the cover
    for (const auto& edge : edges) {
        if (cover.find(edge.first) == cover.end() &&
            cover.find(edge.second) == cover.end()) {
            return false; // Edge is uncovered!
        }
    }
    return true; // Valid Vertex Cover!
}
\`\`\`

---

### Python Implementation (3-SAT Clause Verifier in O(m))

\`\`\`python
"""
Python Syntax Logic Note:
1. 3-SAT Verifier: Given boolean assignment certificate {var: True/False},
   verifies that every 3-literal clause evaluates to True in O(clauses) linear time.
2. abs(lit): Variable identifier; lit > 0 checks positive literal, lit < 0 checks negated literal.
"""

from typing import List, Dict

def verify_3sat(clauses: List[List[int]], assignment: Dict[int, bool]) -> bool:
    """
    Verifies if boolean assignment satisfies 3-CNF formula.
    Positive literal i means variable i; Negative -i means NOT variable i.
    """
    for clause in clauses:
        clause_satisfied = False
        for lit in clause:
            var = abs(lit)
            val = assignment.get(var, False)
            # If literal is negative, negate value
            literal_val = val if lit > 0 else not val

            if literal_val:
                clause_satisfied = True
                break

        if not clause_satisfied:
            return False # Unsatisfied clause

    return True
\`\`\`

---

## 8. GATE & UGC NET Key Exam Insights

> [!NOTE]
> **GATE Classic: Undecidable vs NP-Complete**
> - The **Halting Problem** is **NOT** NP-Complete! It is **Undecidable** (Unsolvable even with infinite time).
> - NP-Complete problems are strictly **Decidable** (they can be solved by brute force in exponential time $O(2^n)$).
> - If $P = NP$, all NP-Complete problems can be solved in polynomial time, but Undecidable problems remain unsolvable!
`,
};
