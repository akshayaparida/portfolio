import { LearningModule } from "@/types/learning";

export const relationsModule: LearningModule = {
  id: "relations",
  title: "Relations, Equivalence & Partial Orders",
  description:
    "Binary relations, reflexive/symmetric/transitive properties, equivalence relations, partitions, closures, Warshall's algorithm, posets, Hasse diagrams, and lattices.",
  status: "in-progress",
  detailedContent: `# Relations, Equivalence & Partial Orders

A **relation** is a fundamental mathematical structure that defines connections or associations between elements of sets. In computer science and artificial intelligence, relations are everywhere: relational databases (SQL tables and foreign keys), graph theory and network topology, task scheduling (DAGs and topological sorting), type hierarchies in object-oriented programming, and orderings in sorting algorithms.

This module covers **Binary Relations, Reflexive/Symmetric/Transitive Properties, Closures & Warshall's Algorithm, Equivalence Relations & Partitions, and Posets & Hasse Diagrams**.

---

## What You'll Learn

By the end of this module, you will be able to:

| # | Topic | Skill |
|:--|:------|:------|
| 1 | **Binary Relations** | Define relations as subsets of Cartesian products (R ⊆ A × B) |
| 2 | **Representations** | Represent relations using directed graphs (digraphs) and boolean (0-1) adjacency matrices |
| 3 | **Relation Properties** | Test for Reflexivity, Irreflexivity, Symmetry, Antisymmetry, and Transitivity |
| 4 | **Composition & Powers** | Compute relation compositions (S ∘ R) and powers (Rⁿ) |
| 5 | **Closures of Relations** | Construct Reflexive, Symmetric, and Transitive closures |
| 6 | **Warshall's Algorithm** | Implement Warshall's algorithm to find transitive reachability in O(n³) time |
| 7 | **Equivalence Relations** | Identify relations that are Reflexive, Symmetric, and Transitive (e.g. modular congruence) |
| 8 | **Equivalence Classes & Partitions** | Partition a set into mutually disjoint equivalence classes [a] |
| 9 | **Partial Orders (Posets)** | Analyze relations that are Reflexive, Antisymmetric, and Transitive (≤, ⊆, divisibility) |
| 10 | **Hasse Diagrams & Lattices** | Construct Hasse diagrams, find Maximal/Minimal/LUB/GLB elements, and perform Topological Sorting |

---

## Math Notation & Pronunciation Guide

**Relation Symbols:**
- **R ⊆ A × B** — relation R from set A to set B (subset of Cartesian product)
- **a R b** or **(a, b) ∈ R** — pronounced "a is related to b under R"
- **a ⧸R b** or **(a, b) ∉ R** — pronounced "a is NOT related to b under R"
- **M_R** — boolean (0-1) adjacency matrix representation of relation R
- **R⁻¹** — converse (inverse) relation: \`R⁻¹ = {(b, a) | (a, b) ∈ R}\`
- **S ∘ R** — composition of relations: \`(a, c) ∈ S ∘ R ⟺ ∃b ((a, b) ∈ R ∧ (b, c) ∈ S)\`
- **R⁺** — transitive closure of R (reachability in 1 or more steps)
- **R\\*** — reflexive-transitive closure of R (reachability in 0 or more steps)
- **[a]** or **[a]_R** — equivalence class of element a: \`[a] = {x ∈ A | (a, x) ∈ R}\`
- **a ≡ b (mod m)** — modular congruence (a and b have the same remainder when divided by m)
- **(A, ⪯)** — partially ordered set (poset) with partial order relation ⪯
- **LUB / sup** — Least Upper Bound (Supremum or Join: a ∨ b)
- **GLB / inf** — Greatest Lower Bound (Infimum or Meet: a ∧ b)

---

## Key Concepts

### 1. Binary Relations — Definition & Foundations

Let A and B be two sets. A **binary relation R from A to B** is a subset of the Cartesian product A × B:
R ⊆ A × B

When A = B, R is simply called a **relation on set A** (R ⊆ A × A).

\`\`\`text
Let A = {1, 2, 3} and B = {a, b}.
Cartesian Product A × B = {(1, a), (1, b), (2, a), (2, b), (3, a), (3, b)}

Examples of Relations:
R₁ = {(1, a), (2, b), (3, a)}        (Valid relation)
R₂ = ∅                               (Empty relation)
R₃ = A × B                           (Universal relation)
\`\`\`

**Total Number of Possible Relations:**
If |A| = m and |B| = n, then |A × B| = m × n.
The total number of distinct binary relations from A to B is the number of subsets in the power set P(A × B):
**Total Relations = 2^(m × n)**
For a relation on a single set A with |A| = n:
**Total Relations on A = 2^(n²)**

---

### 2. Representations of Relations

A relation R on a finite set A = {a₁, a₂, ..., aₙ} can be represented in three equivalent ways:

\`\`\`text
1. Set of Ordered Pairs:
   R = {(1, 1), (1, 2), (2, 3), (3, 1), (3, 3)} on A = {1, 2, 3}

2. Directed Graph (Digraph):
   - Vertices = elements of A {1, 2, 3}
   - Directed edge (u → v) exists if and only if (u, v) ∈ R
   - Self-loop on vertex u if (u, u) ∈ R

3. Boolean Zero-One Matrix (M_R):
        1   2   3
   1 [  1   1   0  ]       Entry M_R[i][j] = 1 if (a_i, a_j) ∈ R
   2 [  0   0   1  ]       Entry M_R[i][j] = 0 if (a_i, a_j) ∉ R
   3 [  1   0   1  ]
\`\`\`

---

### 3. Fundamental Properties of Relations

Let R be a relation on set A. We characterize R by five foundational mathematical properties:

\`\`\`text
+-----------------+----------------------------------------+---------------------------------------+
| Property        | Formal Definition                      | Matrix / Digraph Characteristic       |
+-----------------+----------------------------------------+---------------------------------------+
| Reflexive       | ∀a ∈ A, (a, a) ∈ R                     | Main diagonal is ALL 1s; loops on all |
| Irreflexive     | ∀a ∈ A, (a, a) ∉ R                     | Main diagonal is ALL 0s; NO loops     |
| Symmetric       | ∀a, b, (a, b) ∈ R ⟹ (b, a) ∈ R         | Matrix is symmetric: M_R = M_Rᵀ       |
| Antisymmetric   | ∀a, b, (a, b) ∈ R ∧ (b, a) ∈ R ⟹ a = b | No opposing 1s off-diagonal (i ≠ j)   |
| Asymmetric      | ∀a, b, (a, b) ∈ R ⟹ (b, a) ∉ R        | Irreflexive + Antisymmetric           |
| Transitive      | ∀a, b, c, (a, b) ∈ R ∧ (b, c) ∈ R      | If path of length 2 exists, direct    |
|                 |           ⟹ (a, c) ∈ R                | edge must also exist                  |
+-----------------+----------------------------------------+---------------------------------------+
\`\`\`

#### Detailed Property Explanations:

1. **Reflexivity**: Every element relates to itself.
   - *Example on ℤ:* "a = b" is reflexive (a = a). "a ≤ b" is reflexive (a ≤ a).
   - *Non-example:* "a < b" is not reflexive (a ≮ a).

2. **Symmetry**: If a relates to b, then b must relate to a.
   - *Example:* "is a sibling of", "x + y = 10", "is connected by a bidirectional road to".
   - *Non-example:* "is a parent of" (if x is parent of y, y is not parent of x).

3. **Antisymmetry**: Two distinct elements can never relate in both directions. (If both (a, b) and (b, a) exist, it forces a = b).
   - *Example on ℝ:* "a ≤ b" (if a ≤ b and b ≤ a, then a = b).
   - *Example on Sets:* "A ⊆ B" (if A ⊆ B and B ⊆ A, then A = B).
   - *Example on ℤ⁺:* "a divides b" (a | b).

> [!IMPORTANT]
> **Symmetric vs. Antisymmetric are NOT Opposites!**
> A relation can be:
> - **Both Symmetric AND Antisymmetric**: e.g., Equality relation R = {(1, 1), (2, 2)} on {1, 2}.
> - **Neither Symmetric NOR Antisymmetric**: e.g., R = {(1, 2), (2, 1), (1, 3)} on {1, 2, 3}.
> - **Symmetric but NOT Antisymmetric**: e.g., R = {(1, 2), (2, 1)} on {1, 2}.
> - **Antisymmetric but NOT Symmetric**: e.g., R = {(1, 2)} on {1, 2}.

4. **Transitivity**: Whenever a relates to b and b relates to c, then a must relate to c.
   - *Example on ℝ:* "a < b" and "b < c" ⟹ "a < c" (Transitive).
   - *Example on ℤ:* "a divides b" (a | b) and "b divides c" (b | c) ⟹ "a divides c" (a | c).
   - *Example on Graphs:* "u can reach v" and "v can reach w" ⟹ "u can reach w".

---

### 4. Counting Special Relations on an n-Element Set

Given a set A with |A| = n, how many relations satisfy each property?

| Type of Relation | Exact Formula | For n = 3 | For n = 4 |
|:-----------------|:--------------|:----------|:----------|
| **Total Relations** | 2^(n²) | 2⁹ = 512 | 2¹⁶ = 65,536 |
| **Reflexive Relations** | 2^(n² − n) = 2^(n(n−1)) | 2⁶ = 64 | 2¹² = 4,096 |
| **Irreflexive Relations** | 2^(n² − n) | 2⁶ = 64 | 2¹² = 4,096 |
| **Symmetric Relations** | 2^(n(n+1)/2) | 2⁶ = 64 | 2¹⁰ = 1,024 |
| **Reflexive & Symmetric**| 2^(n(n−1)/2) | 2³ = 8 | 2⁶ = 64 |
| **Antisymmetric Relations**| 2ⁿ × 3^(n(n−1)/2) | 2³ × 3³ = 216 | 2⁴ × 3⁶ = 11,664 |
| **Asymmetric Relations** | 3^(n(n−1)/2) | 3³ = 27 | 3⁶ = 729 |

---

### 5. Composition of Relations

Let R ⊆ A × B and S ⊆ B × C. The **composition** S ∘ R (or S ○ R) is a relation from A to C defined by:
**S ∘ R = {(a, c) ∈ A × C | ∃b ∈ B ((a, b) ∈ R ∧ (b, c) ∈ S)}**

\`\`\`text
Let A = {1, 2, 3}, B = {p, q}, C = {x, y, z}
R = {(1, p), (2, q), (3, p)}
S = {(p, x), (p, z), (q, y)}

Composition S ∘ R:
- 1 → p → x  ⟹  (1, x)
- 1 → p → z  ⟹  (1, z)
- 2 → q → y  ⟹  (2, y)
- 3 → p → x  ⟹  (3, x)
- 3 → p → z  ⟹  (3, z)

Result: S ∘ R = {(1, x), (1, z), (2, y), (3, x), (3, z)}
\`\`\`

**Matrix Multiplication for Composition:**
The boolean matrix for composition is computed using boolean matrix product (AND/OR product):
**M_{S ∘ R} = M_R ⊙ M_S**
\\text{where } M_{S \\circ R}[i][j] = \\bigvee_{k=1}^m (M_R[i][k] \\land M_S[k][j])

---

### 6. Closures of Relations & Warshall's Algorithm

Given a relation R on set A, the **closure of R with respect to property P** is the smallest relation S containing R that satisfies property P.

1. **Reflexive Closure r(R)**: Add all missing diagonal elements (a, a):
   **r(R) = R ∪ Δ_A = R ∪ {(a, a) | a ∈ A}**

2. **Symmetric Closure s(R)**: Add reverse pairs for all existing pairs:
   **s(R) = R ∪ R⁻¹ = R ∪ {(b, a) | (a, b) ∈ R}**

3. **Transitive Closure t(R) (or R⁺)**: Add all indirect paths:
   **t(R) = R⁺ = R ∪ R² ∪ R³ ∪ ... ∪ Rⁿ**

#### Warshall's Algorithm for Transitive Closure:
Instead of computing n matrix multiplications (O(n⁴)), **Warshall's Algorithm** computes the transitive closure in-place in **O(n³) time** using dynamic programming:

\`\`\`python
def warshall_transitive_closure(adj_matrix):
    n = len(adj_matrix)
    # W[i][j] represents reachability
    W = [row[:] for row in adj_matrix]
    
    for k in range(n):          # Intermediate vertex
        for i in range(n):      # Source vertex
            for j in range(n):  # Destination vertex
                W[i][j] = W[i][j] or (W[i][k] and W[k][j])
                
    return W

# Example: Directed graph 0 -> 1 -> 2 -> 3
adj = [
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
    [0, 0, 0, 0]
]

reachability = warshall_transitive_closure(adj)
print("Transitive Reachability Matrix:")
for row in reachability:
    print(row)
\`\`\`

---

### 7. Equivalence Relations & Partitions

A relation R on set A is an **Equivalence Relation** if and only if it satisfies three conditions:
1. **Reflexive**: \\forall a \\in A, (a, a) \\in R
2. **Symmetric**: \\forall a, b \\in A, (a, b) \\in R \\implies (b, a) \\in R
3. **Transitive**: \\forall a, b, c \\in A, (a, b) \\in R \\land (b, c) \\in R \\implies (a, c) \\in R

#### Classic Examples of Equivalence Relations:
- **Modular Congruence on ℤ**: a ≡ b (mod m) ⟺ m | (a − b)
- **Similarity of Triangles** in Geometry
- **Same Length String Relation**: R = \\{(s_1, s_2) \\mid \\text{len}(s_1) = \\text{len}(s_2)\\}
- **File System Hard Links**: Inode equivalence

#### Equivalence Classes:
Let R be an equivalence relation on A. The **equivalence class** of element a \\in A, denoted [a] or [a]_R, is the set of all elements in A related to a:
**[a] = {x ∈ A | (a, x) ∈ R}**

\`\`\`text
Example: Modulo 3 Congruence on ℤ (a ≡ b mod 3):
[0] = {..., -6, -3, 0, 3, 6, 9, ...}
[1] = {..., -5, -2, 1, 4, 7, 10, ...}
[2] = {..., -4, -1, 2, 5, 8, 11, ...}

Notice:
1. [0] ∪ [1] ∪ [2] = ℤ (Union covers the entire set)
2. [0] ∩ [1] = ∅, [1] ∩ [2] = ∅, [0] ∩ [2] = ∅ (Mutually disjoint)
\`\`\`

> [!IMPORTANT]
> **Fundamental Theorem of Equivalence Relations:**
> 1. Any equivalence relation R on set A **partitions** A into pairwise disjoint, non-empty equivalence classes.
> 2. Conversely, any partition of set A defines a unique equivalence relation R on A.

---

### 8. Partial Order Relations (Posets)

A relation R on set A is a **Partial Order (or Partial Ordering)** if and only if it satisfies three conditions:
1. **Reflexive**: \\forall a \\in A, (a, a) \\in R
2. **Antisymmetric**: \\forall a, b \\in A, (a, b) \\in R \\land (b, a) \\in R \\implies a = b
3. **Transitive**: \\forall a, b, c \\in A, (a, b) \\in R \\land (b, c) \\in R \\implies (a, c) \\in R

A set A together with a partial order relation \\preceq is called a **Partially Ordered Set (Poset)**, denoted (A, ⪯).

#### Prototypical Posets:
1. **Standard Inequality on Numbers**: (ℝ, ≤)
2. **Subset Inclusion on Power Set**: (P(S), ⊆)
3. **Divisibility Relation on Positive Integers**: (ℤ⁺, |) where a | b means a divides b.

---

### 9. Hasse Diagrams

A **Hasse Diagram** is a simplified visual representation of a finite poset obtained by:
1. Omitting all self-loops (since reflexivity is assumed).
2. Omitting all redundant transitive edges (if a → b and b → c, omit a → c).
3. Drawing elements such that if a ⪯ b, b is placed **strictly above** a, with a line segment connecting them.

\`\`\`text
Example: Poset (D_12, |) where D_12 = {1, 2, 3, 4, 6, 12} (Divisors of 12)

                 12
               /    \\
              4      6
             / \\    /
            /    2 /
           |    /
           3   /
            \\ /
             1

Paths in Hasse Diagram:
1 divides 2 and 3.
2 divides 4 and 6.
3 divides 6.
4 and 6 divide 12.
\`\`\`

#### Extremal Elements in Posets:
- **Maximal Element**: An element m such that no element x satisfies m ≺ x (top of a branch).
- **Minimal Element**: An element m such that no element x satisfies x ≺ m (bottom of a branch).
- **Greatest Element (Maximum / Top / ⊤)**: A unique element g such that \\forall x \\in A, x \\preceq g.
- **Least Element (Minimum / Bottom / ⊥)**: A unique element l such that \\forall x \\in A, l \\preceq x.

> [!NOTE]
> A poset can have **multiple maximal elements**, but if a **greatest element** exists, it must be strictly **unique**.

#### Lattices:
A poset (L, ⪯) is called a **Lattice** if every pair of elements \\{a, b\\} has:
- A **Least Upper Bound (LUB / Supremum / Join a ∨ b)**
- A **Greatest Lower Bound (GLB / Infimum / Meet a ∧ b)**

*Example:* In (ℤ⁺, |), a \\lor b = \\text{LCM}(a, b) and a \\land b = \\text{GCD}(a, b), making positive integers under divisibility a lattice!

---

### 10. Topological Sorting (Linear Extensions of Posets)

In software build systems (e.g. \`make\`, \`npm\`, Webpack), database transaction scheduling, and university course prerequisites, tasks have partial dependency orders.

**Topological Sorting** converts a partial order (A, ⪯) into a **total (linear) order** compatible with all dependencies.

\`\`\`python
from collections import defaultdict, deque

def topological_sort(num_tasks, dependencies):
    # dependencies is list of (prerequisite, task)
    adj = defaultdict(list)
    in_degree = [0] * num_tasks
    
    for u, v in dependencies:
        adj[u].append(v)
        in_degree[v] += 1
        
    queue = deque([i for i in range(num_tasks) if in_degree[i] == 0])
    order = []
    
    while queue:
        u = queue.popleft()
        order.append(u)
        for neighbor in adj[u]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
                
    if len(order) == num_tasks:
        return order
    else:
        raise ValueError("Cycle detected! Not a valid poset.")

# Task dependencies: (0 -> 1), (0 -> 2), (1 -> 3), (2 -> 3)
deps = [(0, 1), (0, 2), (1, 3), (2, 3)]
build_order = topological_sort(4, deps)
print("Valid Build Order (Topological Sort):", build_order)
# Output: [0, 1, 2, 3] or [0, 2, 1, 3]
\`\`\`

---

## TL;DR — Quick Recall Reference

| Concept | Formal Definition | Key Insight |
|:--------|:------------------|:------------|
| **Binary Relation** | R ⊆ A × B | Subset of Cartesian product (2^{mn} total relations) |
| **Reflexive** | \\forall a, (a, a) \\in R | Diagonal is all 1s (2^{n(n-1)} reflexive relations) |
| **Symmetric** | (a, b) \\in R \\implies (b, a) \\in R | Matrix is symmetric (M_R = M_Rᵀ) |
| **Antisymmetric** | (a, b) \\in R \\land (b, a) \\in R \\implies a = b | No bidirectional cycles between distinct nodes |
| **Transitive** | (a, b) \\in R \\land (b, c) \\in R \\implies (a, c) \\in R | Indirect paths imply direct shortcuts |
| **Transitive Closure** | R^+ = \\bigcup_{i=1}^n R^i | Computed in O(n³) via Warshall's Algorithm |
| **Equivalence Relation** | Reflexive + Symmetric + Transitive | Partitions set into disjoint equivalence classes [a] |
| **Poset (Partial Order)** | Reflexive + Antisymmetric + Transitive | Visualized cleanly using Hasse Diagrams |
| **Lattice** | Poset where every pair has LUB and GLB | Join = LUB (\\lor), Meet = GLB (\\land) |
| **Topological Sort** | Linear extension of a DAG poset | Resolves build/task execution order without dependency conflicts |

---

## Additional Resources

**Academic References:**
- *Discrete Mathematics and Its Applications* by Kenneth H. Rosen (Chapter 9: Relations)
- *NPTEL Discrete Mathematics* by Prof. Sudarshan Iyengar (IIT Ropar — Week 4: Relations)
`,
  subModules: [],
  practiceQuiz: [
    {
      id: "rel-q1",
      question:
        "If set A has 4 elements and set B has 3 elements, what is the total number of distinct binary relations from A to B?",
      options: ["12", "64", "4096", "8192"],
      correctAnswer: 2,
      explanation:
        "|A × B| = 4 × 3 = 12. The total number of relations is 2^(|A × B|) = 2^12 = 4,096.",
      difficulty: "easy",
    },
    {
      id: "rel-q2",
      question: "A relation R on set A is reflexive if and only if:",
      options: [
        "For all a, b \u2208 A, if (a, b) \u2208 R then (b, a) \u2208 R",
        "For all a \u2208 A, (a, a) \u2208 R",
        "For all a \u2208 A, (a, a) \u2209 R",
        "For all a, b, c \u2208 A, (a, b) \u2208 R and (b, c) \u2208 R implies (a, c) \u2208 R",
      ],
      correctAnswer: 1,
      explanation:
        "A relation R on A is reflexive if every element in A relates to itself: (a, a) ∈ R for all a ∈ A. On a matrix, this means the main diagonal is all 1s.",
      difficulty: "easy",
    },
    {
      id: "rel-q3",
      question:
        "Which of the following properties must hold for a relation R to be an Equivalence Relation?",
      options: [
        "Reflexive, Symmetric, and Transitive",
        "Reflexive, Antisymmetric, and Transitive",
        "Irreflexive, Symmetric, and Transitive",
        "Reflexive, Symmetric, and Asymmetric",
      ],
      correctAnswer: 0,
      explanation:
        "An Equivalence Relation must be Reflexive, Symmetric, and Transitive (e.g. modular congruence a ≡ b mod m).",
      difficulty: "easy",
    },
    {
      id: "rel-q4",
      question:
        "Which of the following relations on the set of integers ℤ is an Equivalence Relation?",
      options: [
        "a R b if a < b",
        "a R b if a \u2264 b",
        "a R b if a \u2261 b (mod 5)",
        "a R b if a divides b",
      ],
      correctAnswer: 2,
      explanation:
        "Modular congruence a ≡ b (mod 5) is reflexive (a ≡ a), symmetric (a ≡ b ⟹ b ≡ a), and transitive (a ≡ b and b ≡ c ⟹ a ≡ c), making it an equivalence relation.",
      difficulty: "easy",
    },
    {
      id: "rel-q5",
      question:
        "A Partially Ordered Set (Poset) is defined by a relation that is:",
      options: [
        "Reflexive, Symmetric, and Transitive",
        "Reflexive, Antisymmetric, and Transitive",
        "Irreflexive, Symmetric, and Transitive",
        "Symmetric, Antisymmetric, and Transitive",
      ],
      correctAnswer: 1,
      explanation:
        "A Partial Order relation is Reflexive, Antisymmetric, and Transitive (e.g. (ℝ, ≤) or (P(S), ⊆)).",
      difficulty: "easy",
    },
    {
      id: "rel-q6",
      question:
        "How many reflexive relations exist on a set A with n elements?",
      options: ["2^(n\u00b2)", "2^(n(n\u22121))", "2^(n(n+1)/2)", "n!"],
      correctAnswer: 1,
      explanation:
        "In an n × n matrix, the n diagonal elements must be fixed to 1. The remaining n² − n = n(n−1) non-diagonal elements can each be 0 or 1, giving 2^(n(n−1)) relations.",
      difficulty: "medium",
    },
    {
      id: "rel-q7",
      question:
        "What is the time complexity of Warshall's Algorithm for finding the transitive closure of a relation on an n-element set?",
      options: ["O(n log n)", "O(n\u00b2)", "O(n\u00b3)", "O(2\u207f)"],
      correctAnswer: 2,
      explanation:
        "Warshall's algorithm uses 3 nested loops from 0 to n−1 to compute reachability via intermediate vertices, running in O(n³) time.",
      difficulty: "medium",
    },
    {
      id: "rel-q8",
      question:
        "Let A = {1, 2, 3} and R = {(1, 2), (2, 3)}. What is the Transitive Closure R⁺ of R?",
      options: [
        "{(1, 2), (2, 3)}",
        "{(1, 2), (2, 3), (1, 3)}",
        "{(1, 1), (2, 2), (3, 3), (1, 2), (2, 3)}",
        "{(1, 2), (2, 1), (2, 3), (3, 2)}",
      ],
      correctAnswer: 1,
      explanation:
        "Because (1, 2) ∈ R and (2, 3) ∈ R, transitivity requires adding (1, 3). Thus R⁺ = {(1, 2), (2, 3), (1, 3)}.",
      difficulty: "easy",
    },
    {
      id: "rel-q9",
      question:
        "What is the symmetric closure s(R) of the relation R = {(1, 2), (2, 3)} on {1, 2, 3}?",
      options: [
        "{(1, 2), (2, 3), (1, 3)}",
        "{(1, 2), (2, 1), (2, 3), (3, 2)}",
        "{(1, 1), (2, 2), (3, 3)}",
        "{(2, 1), (3, 2)}",
      ],
      correctAnswer: 1,
      explanation:
        "The symmetric closure is s(R) = R ∪ R⁻¹ = {(1, 2), (2, 3)} ∪ {(2, 1), (3, 2)} = {(1, 2), (2, 1), (2, 3), (3, 2)}.",
      difficulty: "easy",
    },
    {
      id: "rel-q10",
      question:
        "In a Hasse diagram, which of the following edges are explicitly omitted?",
      options: [
        "Self-loops and transitive edges",
        "Only reflexive loops",
        "Only cross-edges",
        "Antisymmetric edges",
      ],
      correctAnswer: 0,
      explanation:
        "Hasse diagrams simplify posets by omitting all self-loops (reflexivity) and all shortcut edges implied by transitivity.",
      difficulty: "easy",
    },
    {
      id: "rel-q11",
      question:
        "Can a relation be both Symmetric and Antisymmetric at the same time?",
      options: [
        "No, they are mutually exclusive opposites",
        "Yes, if it contains only diagonal elements (a, a)",
        "Yes, only for the empty relation on an empty set",
        "No, unless the relation is also transitive",
      ],
      correctAnswer: 1,
      explanation:
        "Yes! A relation consisting strictly of diagonal elements (such as R = {(1, 1), (2, 2)}) or the empty relation is vacuously both Symmetric and Antisymmetric.",
      difficulty: "medium",
    },
    {
      id: "rel-q12",
      question:
        "What does the Fundamental Theorem of Equivalence Relations state?",
      options: [
        "Every equivalence relation produces a unique topological sort",
        "An equivalence relation on set A partitions A into mutually disjoint equivalence classes",
        "Every finite relation has a unique transitive closure",
        "All posets are isomorphic to power sets",
      ],
      correctAnswer: 1,
      explanation:
        "The theorem establishes that any equivalence relation partitions set A into non-empty, pairwise disjoint equivalence classes whose union equals A.",
      difficulty: "medium",
    },
    {
      id: "rel-q13",
      question: "In a poset (A, ⪯), an element m is called MAXIMAL if:",
      options: [
        "For all x \u2208 A, x \u2aaf m",
        "For all x \u2208 A, m \u2aaf x",
        "There is no element x \u2208 A such that m \u227a x",
        "There is no element x \u2208 A such that x \u227a m",
      ],
      correctAnswer: 2,
      explanation:
        "An element m is maximal if no other element in the poset is strictly greater than m (there is no x such that m ≺ x).",
      difficulty: "medium",
    },
    {
      id: "rel-q14",
      question:
        "What is the difference between a Greatest Element and a Maximal Element in a poset?",
      options: [
        "They are identical terms",
        "A greatest element must be comparable to and greater than ALL elements; a maximal element simply has no elements above it",
        "A poset can have multiple greatest elements",
        "A maximal element is always unique, but greatest elements can be multiple",
      ],
      correctAnswer: 1,
      explanation:
        "A greatest element g satisfies x ⪯ g for EVERY x ∈ A (and must be unique). A maximal element m simply has no element strictly above it (a poset can have multiple maximal elements).",
      difficulty: "hard",
    },
    {
      id: "rel-q15",
      question: "A poset (L, ⪯) is a LATTICE if and only if:",
      options: [
        "It has a single root vertex",
        "Every pair of elements has a Least Upper Bound (LUB) and a Greatest Lower Bound (GLB)",
        "It is a totally ordered chain",
        "All equivalence classes have the same cardinality",
      ],
      correctAnswer: 1,
      explanation:
        "A Lattice is a poset in which every pair of elements has a unique Least Upper Bound (join a ∨ b) and Greatest Lower Bound (meet a ∧ b).",
      difficulty: "medium",
    },
    {
      id: "rel-q16",
      question:
        "If R ⊆ A × B and S ⊆ B × C, how is the composition S ∘ R defined?",
      options: [
        "{(a, c) | \u2203b \u2208 B such that (a, b) \u2208 R and (b, c) \u2208 S}",
        "{(a, c) | \u2203b \u2208 B such that (a, b) \u2208 S and (b, c) \u2208 R}",
        "{(a, c) | (a, b) \u2208 R and (c, b) \u2208 S}",
        "{(a, b) | (a, b) \u2208 R \u2229 S}",
      ],
      correctAnswer: 0,
      explanation:
        "(a, c) ∈ S ∘ R if there is an intermediate element b ∈ B such that a relates to b under R and b relates to c under S.",
      difficulty: "medium",
    },
    {
      id: "rel-q17",
      question:
        "Which algorithm is used to linearize task dependencies in a Directed Acyclic Graph (DAG) poset?",
      options: [
        "Dijkstra's Algorithm",
        "Topological Sorting (Kahn's Algorithm / DFS)",
        "Kruskal's Algorithm",
        "Floyd-Warshall Algorithm",
      ],
      correctAnswer: 1,
      explanation:
        "Topological Sorting constructs a valid linear execution order from a DAG / poset such that every dependency u ⪯ v is respected.",
      difficulty: "easy",
    },
    {
      id: "rel-q18",
      question: "How many symmetric relations exist on a set with n elements?",
      options: [
        "2\u207f",
        "2^(n(n+1)/2)",
        "2^(n(n\u22121)/2)",
        "3^(n(n\u22121)/2)",
      ],
      correctAnswer: 1,
      explanation:
        "In an n × n symmetric matrix, choosing the n diagonal elements and the n(n−1)/2 upper triangle elements uniquely fixes the whole matrix: 2^(n + n(n−1)/2) = 2^(n(n+1)/2).",
      difficulty: "medium",
    },
    {
      id: "rel-q19",
      question:
        "What are the equivalence classes for the relation 'same parity' (a R b iff a and b are both even or both odd) on the integers ℤ?",
      options: [
        "Three classes: positive, negative, zero",
        "Two classes: [0] = {All Even Integers} and [1] = {All Odd Integers}",
        "Infinitely many singleton classes",
        "One single class covering all of \u2124",
      ],
      correctAnswer: 1,
      explanation:
        "Parity partitions ℤ into exactly two disjoint equivalence classes: [0] (even integers) and [1] (odd integers).",
      difficulty: "easy",
    },
    {
      id: "rel-q20",
      question:
        "In the poset (ℤ⁺, |) of positive integers under divisibility, what are the LUB and GLB of {12, 18}?",
      options: [
        "LUB = 36 (LCM), GLB = 6 (GCD)",
        "LUB = 6 (GCD), GLB = 36 (LCM)",
        "LUB = 216, GLB = 1",
        "LUB = 18, GLB = 12",
      ],
      correctAnswer: 0,
      explanation:
        "Under the divisibility partial order: LUB(a, b) is the Least Common Multiple (LCM(12, 18) = 36), and GLB(a, b) is the Greatest Common Divisor (GCD(12, 18) = 6).",
      difficulty: "medium",
    },
  ],
};
