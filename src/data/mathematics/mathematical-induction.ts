import { LearningModule } from "@/types/learning";

export const mathematicalInductionModule: LearningModule = {
  id: "mathematical-induction",
  title: "Mathematical Induction & Well-Ordering",
  description:
    "Weak and strong mathematical induction, the Well-Ordering Principle (WOP), induction proofs for summations, divisibility, inequalities, Golomb's deficient chessboard tromino tiling, structural induction on trees, loop invariants for algorithmic correctness, and common induction fallacies.",
  status: "in-progress",
  detailedContent: `# Mathematical Induction & Well-Ordering

In discrete mathematics and theoretical computer science, **Mathematical Induction** is the bedrock proof technique for establishing that a statement or algorithm is correct for infinitely many discrete cases. While empirical science relies on inductive reasoning (observing patterns to hypothesize general rules), **Mathematical Induction is a rigorous form of deductive reasoning** that guarantees universal mathematical truth across the natural numbers $\\mathbb{N}$.

This module covers the **Essence and Intuition of Induction, Weak (Standard) Induction, Series and Summation Proofs, Divisibility Theorems, Inequality Bounds with Shifted Bases, Geometric and Combinatorial Induction (Golomb's L-Tromino Deficient Chessboard Tiling), Strong Induction (Complete Induction), the Well-Ordering Principle (WOP) and Minimal Counterexamples, Structural Induction on Trees, Algorithmic Loop Invariants, and Common Induction Fallacies (Pólya's Horse Color Paradox)**.

---

## What You'll Learn

By the end of this module, you will be able to:

| # | Topic | Skill |
|:--|:------|:------|
| 1 | **Essence & Intuition of Induction** | Master the Domino Effect and Ladder analogies, Peano's 5th Axiom, and distinguish deductive mathematical induction from empirical inductive reasoning |
| 2 | **Weak Mathematical Induction** | Execute the formal 4-step proof template: Base Step, Inductive Hypothesis $P(k)$, Inductive Step $P(k) \\implies P(k+1)$, and Universal Conclusion |
| 3 | **Summation & Series Proofs** | Rigorously prove closed-form identities for $\\sum i$, odd sums $\\sum (2i-1) = n^2$, powers of 2 $\\sum 2^i = 2^{n+1}-1$, and sums of squares |
| 4 | **Divisibility Proofs** | Establish divisibility properties including $3 \\mid (n^3 - n)$, $8 \\mid (3^{2n} - 1)$, and algebraic binomial factors $(a - b) \\mid (a^n - b^n)$ |
| 5 | **Inequalities & Shifted Bases** | Prove exponential-polynomial bounds ($2^n > n^2$ for $n \\ge 5$, $n! > 2^n$ for $n \\ge 4$) and Bernoulli's Inequality with shifted base cases $n_0 > 1$ |
| 6 | **Geometric & Combinatorial Induction** | Master Golomb's L-Tromino Tiling for $2^n \\times 2^n$ deficient chessboards and graph tree edge invariants ($|E| = |V| - 1$) |
| 7 | **Strong Mathematical Induction** | Apply Complete Induction when $P(k+1)$ depends on earlier ancestors, resolve multiple base cases, and prove the Fundamental Theorem of Arithmetic |
| 8 | **The Postage Stamp / Frobenius Problem** | Solve coin/stamp reachability problems (e.g. postage $\\ge 8¢$ with 3¢ and 5¢ stamps) using multi-base strong induction |
| 9 | **The Well-Ordering Principle (WOP)** | Formulate the least-element axiom for $\\mathbb{N}$, execute the Method of Infinite Descent / Minimal Counterexamples, and prove equivalence (WOP $\\iff$ PMI $\\iff$ Strong Induction) |
| 10 | **Structural Induction & Loop Invariants** | Prove properties of recursive data structures (Full Binary Tree Leaf Theorem: $L = I + 1$) and verify algorithmic correctness using loop invariants |

---

## Math Notation & Pronunciation Guide

**Induction & Logic Symbols:**
- **$P(n)$** — A propositional function (predicate) parameterized by integer $n$
- **$n_0$** — The base case value (frequently $0$ or $1$, but can be any integer like $4$ or $5$)
- **$P(k) \\implies P(k+1)$** — The inductive step ("if property holds for arbitrary $k$, then it holds for $k+1$")
- **$\\mathbb{N}$** — The set of natural numbers $\\{0, 1, 2, 3, \\dots\\}$ (or $\\mathbb{Z}^+ = \\{1, 2, 3, \\dots\\}$)
- **$a \\mid b$** — pronounced "$a$ divides $b$" (meaning $b = a \\cdot c$ for some integer $c$)
- **$a \\nmid b$** — pronounced "$a$ does not divide $b$"
- **$\\text{WOP}$** — Well-Ordering Principle: every non-empty subset $S \\subseteq \\mathbb{N}$ contains a least element
- **$F_n$** — The $n$-th Fibonacci number ($F_0 = 0, F_1 = 1, F_n = F_{n-1} + F_{n-2}$)
- **$L(T), I(T)$** — Number of leaf nodes and internal nodes in tree $T$
- **Golomb's Tromino** — An L-shaped polyomino formed by 3 unit squares

---

## Key Concepts

### 1. The Essence & Intuition of Mathematical Induction

In the empirical natural sciences, **inductive reasoning** means observing many specific instances (e.g., "every swan I have seen is white") and conjecturing a general principle ("all swans are white"). This cannot guarantee absolute truth, because a single counterexample (a black swan) refutes it.

In mathematics and computer science, **Mathematical Induction is a purely DEDUCTIVE proof technique**. It does not guess from samples; it guarantees truth for an infinite sequence of cases through an unbroken chain of logical implication.

\`\`\`text
The Domino Metaphor:
Imagine an infinite row of dominoes labeled 1, 2, 3, ..., k, k+1, ...
1. Base Step:        You knock down the first domino (Domino 1 falls).
2. Inductive Step:   The dominoes are placed such that IF any domino k falls, 
                     it is guaranteed to knock down domino k+1.
3. Universal Truth:  Every domino in the infinite chain will eventually fall!
\`\`\`

\`\`\`text
The Infinite Ladder Metaphor:
To climb an infinitely tall ladder:
1. Base Step:        You can step onto the first rung (Rung 1).
2. Inductive Step:   From any rung k, your reach allows you to climb to rung k+1.
3. Conclusion:       You can climb to any arbitrary rung n on the ladder!
\`\`\`

#### Peano's 5th Axiom:
Giuseppe Peano formulated modern arithmetic on the foundations of natural numbers. The 5th Peano Axiom states:
> If $S \\subseteq \\mathbb{N}$ such that $0 \\in S$, and for every $k \\in \\mathbb{N}$, $(k \\in S \\implies k+1 \\in S)$, then $S = \\mathbb{N}$.

---

### 2. Weak / Standard Mathematical Induction (PMI)

The **First Principle of Mathematical Induction** (Weak Induction) is stated formally in First-Order Logic as:

$$\\big[ P(n_0) \\;\\land\\; \\forall k \\ge n_0 \\,(P(k) \\implies P(k+1)) \\big] \\implies \\forall n \\ge n_0 \\, P(n)$$

#### The Rigorous 4-Step Proof Template:

\`\`\`text
Step 1: State the Predicate P(n) clearly.
        Define precisely what mathematical assertion you are proving for integer n >= n_0.

Step 2: Base Step (Anchor).
        Evaluate P(n_0) directly and prove that it evaluates to TRUE.
        (Without the base step, the inductive chain has no anchor and collapses!)

Step 3: Inductive Hypothesis (IH).
        Explicitly state: "Assume P(k) is true for an arbitrary integer k >= n_0."
        Write down the exact expression that P(k) provides.

Step 4: Inductive Step & Conclusion.
        Under the assumption of the Inductive Hypothesis, PROVE that P(k+1) must be TRUE.
        Highlight precisely where the Inductive Hypothesis was substituted!
        Conclude: "By the Principle of Mathematical Induction, P(n) holds for all n >= n_0."
\`\`\`

---

### 3. Classic Summation & Series Proofs

#### Example 3.1: Sum of First $n$ Natural Numbers
Prove that for all integers $n \\ge 1$:

$$\\sum_{i=1}^n i = 1 + 2 + 3 + \\dots + n = \\frac{n(n+1)}{2}$$

**Proof:**
- **Predicate:** Let $P(n)$ be the proposition that $\\sum_{i=1}^n i = \\frac{n(n+1)}{2}$.
- **Base Step ($n = 1$):**
  $$\\text{LHS} = 1, \\quad \\text{RHS} = \\frac{1(1+1)}{2} = \\frac{2}{2} = 1$$
  Since $\\text{LHS} = \\text{RHS} = 1$, $P(1)$ is true.
- **Inductive Hypothesis:** Assume $P(k)$ is true for an arbitrary integer $k \\ge 1$, i.e.:
  $$\\sum_{i=1}^k i = 1 + 2 + \\dots + k = \\frac{k(k+1)}{2}$$
- **Inductive Step ($n = k + 1$):** We must prove $P(k+1)$, which asserts:
  $$\\sum_{i=1}^{k+1} i = \\frac{(k+1)((k+1)+1)}{2} = \\frac{(k+1)(k+2)}{2}$$
  Starting from the LHS of $P(k+1)$:
  $$\\sum_{i=1}^{k+1} i = \\left(\\sum_{i=1}^k i\\right) + (k+1)$$
  Substituting the Inductive Hypothesis for the first $k$ terms:
  $$= \\frac{k(k+1)}{2} + (k+1) = (k+1)\\left(\\frac{k}{2} + 1\\right) = (k+1)\\left(\\frac{k+2}{2}\\right) = \\frac{(k+1)(k+2)}{2}$$
  This matches the target RHS. Thus $P(k) \\implies P(k+1)$ is true.
- **Conclusion:** By the Principle of Mathematical Induction, $P(n)$ holds for all integers $n \\ge 1$. $\\blacksquare$

---

#### Example 3.2: Sum of the First $n$ Odd Integers
Prove that for all $n \\ge 1$:

$$\\sum_{i=1}^n (2i - 1) = 1 + 3 + 5 + \\dots + (2n - 1) = n^2$$

**Geometric Intuition (Connecting the Dots):**
A square of size $n \\times n$ containing $n^2$ dots can be expanded to size $(n+1) \\times (n+1)$ by wrapping an "L-shaped" gnomon of $2n+1$ dots around two of its borders. $n^2 + (2n+1) = (n+1)^2$!

\`\`\`text
n = 1:  ● (1 dot = 1²)
n = 2:  ● ○  (1 + 3 = 4 dots = 2²)
        ○ ○
n = 3:  ● ○ ✦ (1 + 3 + 5 = 9 dots = 3²)
        ○ ○ ✦
        ✦ ✦ ✦
\`\`\`

**Formal Induction Proof:**
- **Base Step ($n = 1$):** $\\text{LHS} = 2(1) - 1 = 1$; $\\text{RHS} = 1^2 = 1$. $P(1)$ is true.
- **Inductive Hypothesis:** Assume $\\sum_{i=1}^k (2i - 1) = k^2$ for arbitrary $k \\ge 1$.
- **Inductive Step:** Show $\\sum_{i=1}^{k+1} (2i - 1) = (k+1)^2$.
  $$\\sum_{i=1}^{k+1} (2i - 1) = \\sum_{i=1}^k (2i - 1) + [2(k+1) - 1]$$
  $$= k^2 + (2k + 2 - 1) = k^2 + 2k + 1 = (k+1)^2$$
  Thus $P(k+1)$ holds. By PMI, $\\sum_{i=1}^n (2i-1) = n^2$ for all $n \\ge 1$. $\\blacksquare$

---

#### Example 3.3: Sum of Powers of 2
Prove that for all integers $n \\ge 0$:

$$\\sum_{i=0}^n 2^i = 1 + 2 + 4 + 8 + \\dots + 2^n = 2^{n+1} - 1$$

- **Base Step ($n = 0$):** $\\text{LHS} = 2^0 = 1$; $\\text{RHS} = 2^{0+1} - 1 = 2 - 1 = 1$. True!
- **Inductive Step:** Assuming $\\sum_{i=0}^k 2^i = 2^{k+1} - 1$:
  $$\\sum_{i=0}^{k+1} 2^i = \\left(\\sum_{i=0}^k 2^i\\right) + 2^{k+1} = (2^{k+1} - 1) + 2^{k+1} = 2 \\cdot 2^{k+1} - 1 = 2^{k+2} - 1$$
  This completes the step. This theorem proves why a full binary tree of height $h$ has $2^{h+1} - 1$ total nodes! $\\blacksquare$

---

### 4. Divisibility Proofs

In divisibility induction, we prove that an expression is a multiple of an integer $d$.

#### Theorem 4.1: $n^3 - n$ is divisible by 3 for all integers $n \\ge 1$
Prove $3 \\mid (n^3 - n)$ for all $n \\in \\mathbb{Z}^+$.

**Proof:**
- **Base Step ($n = 1$):** $1^3 - 1 = 0$. Since $0 = 3 \\cdot 0$, $3 \\mid 0$. $P(1)$ is true.
- **Inductive Hypothesis:** Assume $3 \\mid (k^3 - k)$ for arbitrary $k \\ge 1$.
  This means there exists an integer $m$ such that:
  $$k^3 - k = 3m$$
- **Inductive Step:** We must show $3 \\mid ((k+1)^3 - (k+1))$.
  Expand the target expression algebraically:
  $$(k+1)^3 - (k+1) = (k^3 + 3k^2 + 3k + 1) - (k + 1)$$
  $$= (k^3 - k) + 3k^2 + 3k$$
  Now substitute the Inductive Hypothesis $k^3 - k = 3m$:
  $$= 3m + 3k^2 + 3k = 3(m + k^2 + k)$$
  Since $m, k \\in \\mathbb{Z}$, the quantity $(m + k^2 + k)$ is an integer $q$.
  Therefore, $(k+1)^3 - (k+1) = 3q$, meaning $3 \\mid ((k+1)^3 - (k+1))$.
- **Conclusion:** By PMI, $3 \\mid (n^3 - n)$ for all $n \\ge 1$. $\\blacksquare$

*(Bonus insight: Because $n^3 - n = (n-1)n(n+1)$ is the product of three consecutive integers, it is always divisible by both $2$ and $3$, and hence divisible by $6$!)*

---

#### Theorem 4.2: $8 \\mid (3^{2n} - 1)$ for all $n \\ge 1$
- **Base Step ($n = 1$):** $3^{2(1)} - 1 = 9 - 1 = 8$. Since $8 = 8(1)$, $8 \\mid 8$. True!
- **Inductive Hypothesis:** Assume $8 \\mid (3^{2k} - 1)$, meaning $3^{2k} - 1 = 8m$ for some integer $m$, so $3^{2k} = 8m + 1$.
- **Inductive Step:** Evaluate for $k+1$:
  $$3^{2(k+1)} - 1 = 3^{2k + 2} - 1 = 3^2 \\cdot 3^{2k} - 1 = 9 \\cdot 3^{2k} - 1$$
  Rewrite $9$ as $(8 + 1)$:
  $$= (8 + 1) \\cdot 3^{2k} - 1 = 8 \\cdot 3^{2k} + 3^{2k} - 1 = 8 \\cdot 3^{2k} + (3^{2k} - 1)$$
  By Inductive Hypothesis, $(3^{2k} - 1) = 8m$:
  $$= 8 \\cdot 3^{2k} + 8m = 8(3^{2k} + m)$$
  Since $(3^{2k} + m)$ is an integer, $8 \\mid (3^{2(k+1)} - 1)$. Proved! $\\blacksquare$

---

### 5. Inequality Proofs & Shifted Bases ($n_0 > 1$)

Induction does not always start at $n = 0$ or $n = 1$. The base step must be anchored at the smallest integer $n_0$ for which the inequality becomes true.

#### Example 5.1: Prove $2^n > n^2$ for all integers $n \\ge 5$

Let us test initial values:
- $n = 1: 2^1 > 1^2 \\implies 2 > 1$ (True, but isolated)
- $n = 2: 2^2 > 2^2 \\implies 4 > 4$ (FALSE)
- $n = 3: 2^3 > 3^2 \\implies 8 > 9$ (FALSE)
- $n = 4: 2^4 > 4^2 \\implies 16 > 16$ (FALSE)
- $n = 5: 2^5 > 5^2 \\implies 32 > 25$ (TRUE — our Base Case $n_0 = 5$!)

**Proof:**
- **Base Step ($n = 5$):** $2^5 = 32$ and $5^2 = 25$. Since $32 > 25$, $P(5)$ is true.
- **Inductive Hypothesis:** Assume $2^k > k^2$ for an arbitrary integer $k \\ge 5$.
- **Inductive Step:** Show $2^{k+1} > (k+1)^2 = k^2 + 2k + 1$.
  Starting with $2^{k+1}$:
  $$2^{k+1} = 2 \\cdot 2^k$$
  By the Inductive Hypothesis ($2^k > k^2$):
  $$2 \\cdot 2^k > 2k^2 = k^2 + k^2$$
  We need to establish that $k^2 + k^2 > k^2 + 2k + 1$, which requires $k^2 > 2k + 1$.
  For $k \\ge 5$:
  $$k^2 = k \\cdot k \\ge 5k = 2k + 3k > 2k + 1 \\quad (\\text{since } 3k > 15 > 1)$$
  Therefore:
  $$2^{k+1} = 2k^2 = k^2 + k^2 > k^2 + 2k + 1 = (k+1)^2$$
  Hence $P(k+1)$ is true.
- **Conclusion:** By PMI, $2^n > n^2$ for all integers $n \\ge 5$. $\\blacksquare$

---

#### Example 5.2: Bernoulli's Inequality
For any real number $x > -1$ and any integer $n \\ge 1$:

$$(1 + x)^n \\ge 1 + nx$$

- **Base Step ($n = 1$):** $(1 + x)^1 = 1 + x = 1 + (1)x$. True with equality.
- **Inductive Hypothesis:** Assume $(1 + x)^k \\ge 1 + kx$ for $k \\ge 1$.
- **Inductive Step:** Since $x > -1$, $(1 + x) > 0$. We can multiply both sides of the IH by $(1 + x)$ without flipping the inequality:
  $$(1 + x)^{k+1} = (1 + x)^k (1 + x) \\ge (1 + kx)(1 + x)$$
  $$= 1 + x + kx + kx^2 = 1 + (k+1)x + kx^2$$
  Since $kx^2 \\ge 0$ (as $k \\ge 1$ and $x^2 \\ge 0$):
  $$1 + (k+1)x + kx^2 \\ge 1 + (k+1)x$$
  Therefore, $(1 + x)^{k+1} \\ge 1 + (k+1)x$. Proved! $\\blacksquare$

---

### 6. Geometric & Combinatorial Induction (IIT Ropar Signature)

#### 6.1 Golomb's Deficient Chessboard Tromino Tiling Theorem

A classic lecture in Prof. Sudarshan Iyengar's NPTEL course is **Solomon Golomb's Tromino Theorem (1954)**:
> **Theorem:** Any $2^n \\times 2^n$ chessboard missing **any single arbitrary square** (a *deficient board*) can be completely tiled without overlaps using L-shaped trominoes (each made of 3 squares).

\`\`\`text
The L-Tromino:
[ ■ ]
[ ■ ][ ■ ]  (3 unit squares)

Arithmetic Feasibility Check:
Total squares on 2ⁿ x 2ⁿ board = (2ⁿ)² = 4ⁿ squares.
Squares remaining after removing 1 = 4ⁿ - 1.
Notice that 4ⁿ - 1 is always divisible by 3 because:
4 ≡ 1 (mod 3) ⟹ 4ⁿ ≡ 1ⁿ ≡ 1 (mod 3) ⟹ 4ⁿ - 1 ≡ 0 (mod 3).
Arithmetic confirms the square count is a multiple of 3, but can they tile it?
\`\`\`

\`\`\`text
Visual Inductive Step for 2ᵏ⁺¹ x 2ᵏ⁺¹ board:

+-------------------+-------------------+
|                   |                   |
|    Quadrant 1     |    Quadrant 2     |
|   (Contains the   |   (All intact)    |
|   missing square  |                   |
|       [ X ] )     |        [■]        |
+-------------------+---------+---------+
|                   |   [■]   |         |
|   (All intact)    |   [■]   |         |
|                   | (Place 1 L-Tromino|
|    Quadrant 3     | at the center!)   |
|                   |    Quadrant 4     |
+-------------------+-------------------+

By placing one L-tromino in the center spanning Quadrants 2, 3, and 4:
Every single one of the 4 quadrants now has EXACTLY ONE square occupied/missing!
By the Inductive Hypothesis, all four 2ᵏ x 2ᵏ quadrants can be completely tiled!
\`\`\`

**Formal Inductive Proof:**
1. **Base Step ($n = 1$):** A $2^1 \\times 2^1 = 2 \\times 2$ board has 4 squares. Removing 1 square leaves 3 adjacent squares forming an exact L-tromino shape. One L-tromino tiles it perfectly.
2. **Inductive Hypothesis:** Assume that any $2^k \\times 2^k$ deficient board can be tiled by L-trominoes.
3. **Inductive Step:** Consider a $2^{k+1} \\times 2^{k+1}$ board with 1 missing square.
   - Divide the board along its horizontal and vertical midlines into four $2^k \\times 2^k$ quadrants.
   - Exactly one quadrant contains the original missing square.
   - The other three quadrants are completely intact.
   - **The Brilliant Move:** Place **one L-tromino** at the very center of the board such that it covers exactly one corner square from each of the three intact quadrants.
   - Now, each of the four $2^k \\times 2^k$ quadrants has exactly one missing (or pre-covered) square!
   - By the Inductive Hypothesis, each of the four quadrants can be completely tiled with L-trominoes.
4. **Conclusion:** By induction, any $2^n \\times 2^n$ deficient board can be tiled for all $n \\ge 1$. $\\blacksquare$

---

#### 6.2 Tree Edge Formula in Graph Theory
> **Theorem:** Every tree $T = (V, E)$ with $n$ vertices has exactly $n - 1$ edges.

**Proof by Induction on $|V| = n$:**
- **Base Step ($n = 1$):** A tree with 1 vertex has 0 edges ($1 - 1 = 0$). True.
- **Inductive Hypothesis:** Assume every tree with $k$ vertices has $k - 1$ edges ($k \\ge 1$).
- **Inductive Step ($n = k + 1$):** Let $T$ be a tree with $k + 1$ vertices.
  - A fundamental graph property is that every tree with $\\ge 2$ vertices contains at least two leaves (vertices of degree 1).
  - Select a leaf $v$ and its single incident edge $e = (u, v)$.
  - Remove $v$ and $e$ to form $T' = T \\setminus \\{v\\}$.
  - $T'$ is connected and acyclic, so $T'$ is a tree with $(k+1) - 1 = k$ vertices.
  - By the Inductive Hypothesis, $|E(T')| = k - 1$.
  - Restoring $v$ and $e$ gives $|E(T)| = |E(T')| + 1 = (k - 1) + 1 = k = (k + 1) - 1$.
- **Conclusion:** By induction, any tree with $n$ vertices has $n - 1$ edges. $\\blacksquare$

---

### 7. Strong Mathematical Induction (Complete Induction)

In **Weak Induction**, the inductive step proves $P(k) \\implies P(k+1)$. You only look back **one step**.
However, in many algorithms (like Merge Sort or tree recursion) and number theoretic proofs, a subproblem of size $k+1$ is broken into pieces of size $k/2$ or $k-2$, rather than $k$.

In **Strong Induction** (also called the **Second Principle of Mathematical Induction**), we assume that the property holds for **all preceding integers** from the base case up to $k$:

$$\\big[ P(n_0) \\;\\land\\; \\forall k \\ge n_0 \\,(\\forall n_0 \\le j \\le k \\, P(j) \\implies P(k+1)) \\big] \\implies \\forall n \\ge n_0 \\, P(n)$$

\`\`\`text
Weak vs Strong Induction:
Weak Induction:   P(k) -----------------------------------> P(k+1)
Strong Induction: [ P(n_0) ∧ P(n_0+1) ∧ ... ∧ P(k) ] ------> P(k+1)
\`\`\`

> [!NOTE]
> **Equivalence of Weak and Strong Induction:**
> Weak and Strong Induction are mathematically equivalent in deductive power. Any proof in weak induction is trivially a strong induction proof. Conversely, defining $Q(k) = P(n_0) \\land P(n_0+1) \\land \\dots \\land P(k)$ converts any strong induction proof into a weak induction proof on $Q(k)$.

---

#### Example 7.1: Fundamental Theorem of Arithmetic (Existence of Prime Factorization)
Prove that every integer $n \\ge 2$ can be written as a product of one or more prime numbers.

**Proof by Strong Induction:**
- **Base Step ($n = 2$):** $2$ is prime, so it is a product of a single prime (itself). True.
- **Inductive Hypothesis:** Assume that for an arbitrary integer $k \\ge 2$, **every** integer $j$ with $2 \\le j \\le k$ can be written as a product of primes.
- **Inductive Step ($n = k + 1$):**
  - **Case 1:** If $k + 1$ is prime, then it is already a product of primes.
  - **Case 2:** If $k + 1$ is composite, then by definition there exist integers $a$ and $b$ such that:
    $$k + 1 = a \\cdot b, \\quad \\text{where } 2 \\le a \\le k \\text{ and } 2 \\le b \\le k$$
    Since both $a \\le k$ and $b \\le k$, the Strong Inductive Hypothesis applies to both $a$ and $b$!
    Therefore, $a = p_1 p_2 \\dots p_r$ and $b = q_1 q_2 \\dots q_s$ where all $p_i, q_j$ are primes.
    Then:
    $$k + 1 = a \\cdot b = (p_1 p_2 \\dots p_r)(q_1 q_2 \\dots q_s)$$
    which is a product of primes!
- **Conclusion:** By strong induction, every integer $n \\ge 2$ has a prime factorization. $\\blacksquare$

*(Notice: Weak induction would have failed here, because knowing how to factor $k$ tells us nothing about the factors of $k+1$!)*

---

#### Example 7.2: The Postage Stamp / Frobenius Coin Problem
Prove that any postage amount of $n \\ge 8$ cents can be formed using only **3-cent** and **5-cent** stamps.

\`\`\`text
Why Weak Induction is Awkward:
If you have 8 cents (3 + 5), adding 1 cent to get 9 cents cannot be done by replacing
a single stamp simply without knowing earlier stamp states.
However, (k + 1) - 3 = k - 2.
If we know how to make (k - 2) cents, we just ADD ONE 3¢ STAMP to get (k + 1) cents!
This looks back 3 steps, so we need THREE base cases!
\`\`\`

**Proof by Strong Induction:**
- **Base Cases (3 needed because step looks back by 3):**
  - $n = 8$: $8 = 3 + 5$ (One 3¢, One 5¢ stamp) — TRUE
  - $n = 9$: $9 = 3 + 3 + 3$ (Three 3¢ stamps) — TRUE
  - $n = 10$: $10 = 5 + 5$ (Two 5¢ stamps) — TRUE
- **Inductive Hypothesis:** Assume that for an arbitrary integer $k \\ge 10$, any postage $j$ where $8 \\le j \\le k$ can be formed using 3¢ and 5¢ stamps.
- **Inductive Step:** Consider postage $k + 1$.
  Since $k \\ge 10$, $(k + 1) \\ge 11$, which means $(k + 1) - 3 = k - 2 \\ge 8$.
  Also, $k - 2 < k + 1 \\le k$.
  Thus, $8 \\le k - 2 \\le k$.
  By the Strong Inductive Hypothesis, $(k - 2)$ cents can be formed with 3¢ and 5¢ stamps.
  Take the stamp combination for $(k - 2)$ cents and **add one 3¢ stamp**.
  The resulting total is $(k - 2) + 3 = k + 1$ cents.
- **Conclusion:** By strong induction, any postage $n \\ge 8$ cents can be paid with 3¢ and 5¢ stamps. $\\blacksquare$

---

### 8. The Well-Ordering Principle (WOP) & Minimal Counterexamples

#### The Well-Ordering Principle (WOP) Axiom:
> **Every non-empty subset $S$ of non-negative integers $\\mathbb{N}$ contains a least (smallest) element.**
> Formally: If $S \\subseteq \\mathbb{N}$ and $S \\neq \\emptyset$, then $\\exists m \\in S$ such that $\\forall x \\in S, m \\le x$.

*(Note: $\\mathbb{Z}$ is NOT well-ordered, because $\\{\\dots, -3, -2, -1\\}$ has no least element. $\\mathbb{R}^+$ is NOT well-ordered, because $(0, 1)$ has no minimum.)*

#### The Equivalence Triad:
In standard axiomatic set theory (ZFC / Peano arithmetic):
$$\\text{Principle of Mathematical Induction} \\iff \\text{Strong Induction} \\iff \\text{Well-Ordering Principle}$$

#### Proof Method: The Method of Minimal Counterexample (Infinite Descent)
To prove $\\forall n \\in \\mathbb{N}, P(n)$:
1. Assume for contradiction that the statement is false.
2. Define the set of counterexamples: $C = \\{n \\in \\mathbb{N} \\mid P(n) \\text{ is FALSE}\\}$.
3. By our assumption, $C \\neq \\emptyset$.
4. By the **Well-Ordering Principle**, $C$ must contain a **least element** $m$ (the *minimal counterexample*).
5. Since $m$ is the smallest counterexample:
   - $m > n_0$ (because the base case $P(n_0)$ is verified true).
   - For all $k < m$, $P(k)$ must be TRUE.
6. Use the fact that $P(m-1)$ (or earlier values) is true to show that $P(m)$ must actually be TRUE!
7. This contradicts $m \\in C$.
8. Hence, $C = \\emptyset$, proving $P(n)$ is true for all $n$.

---

### 9. Structural Induction in Computer Science

In Computer Science, many data structures (strings, binary trees, arithmetic expressions, JSON documents) are defined **recursively**. **Structural Induction** is induction applied directly over the recursive definition of the data type.

#### Recursive Definition of a Full (Proper) Binary Tree:
- **Basis Step:** A single isolated node is a full binary tree $T$ (with 1 leaf and 0 internal nodes).
- **Recursive Step:** If $T_1$ and $T_2$ are disjoint full binary trees, then joining their roots as left and right children to a new root $r$ creates a new full binary tree $T$.

#### Theorem: In every full binary tree $T$, Leaves $L(T) = I(T) + 1$
where $L(T)$ is the number of leaf nodes and $I(T)$ is the number of internal (non-leaf) nodes.

**Proof by Structural Induction:**
- **Basis Step:** Let $T$ be a single node.
  - Number of leaves: $L(T) = 1$.
  - Number of internal nodes: $I(T) = 0$.
  - Formula check: $1 = 0 + 1$. True!
- **Recursive Step:** Let $T_1$ and $T_2$ be full binary trees.
  Assume the hypothesis holds for both:
  $$L(T_1) = I(T_1) + 1 \\quad \\text{and} \\quad L(T_2) = I(T_2) + 1$$
  Now construct tree $T$ by creating a new root node $r$ and attaching $T_1$ and $T_2$ as subtrees.
  - The leaves of $T$ are simply the leaves of $T_1$ plus the leaves of $T_2$:
    $$L(T) = L(T_1) + L(T_2)$$
  - The internal nodes of $T$ are the internal nodes of $T_1$ plus those of $T_2$, **plus the new root $r$**:
    $$I(T) = I(T_1) + I(T_2) + 1$$
  - Substitute the induction hypotheses into $L(T)$:
    $$L(T) = (I(T_1) + 1) + (I(T_2) + 1) = [I(T_1) + I(T_2) + 1] + 1 = I(T) + 1$$
- **Conclusion:** By structural induction, $L(T) = I(T) + 1$ for all full binary trees. $\\blacksquare$

---

### 10. Algorithmic Correctness & Loop Invariants

In software engineering, computer scientists use **Loop Invariants** to formally verify that algorithms terminate with correct results. A Loop Invariant is an inductive predicate that holds across loop iterations:

| Induction Concept | Loop Invariant Concept | Meaning in Code |
|:------------------|:-----------------------|:----------------|
| **Base Step** | **Initialization** | The invariant holds true prior to the first iteration of the loop. |
| **Inductive Step** | **Maintenance** | If the invariant is true before iteration $k$, it remains true before iteration $k+1$. |
| **Conclusion** | **Termination** | When the loop terminates, the invariant combined with the termination condition guarantees algorithm correctness. |

#### Case Study: Loop Invariant for Insertion Sort
To sort array $A[1 \\dots n]$:
\`\`\`python
for j in range(1, len(A)):
    key = A[j]
    i = j - 1
    while i >= 0 and A[i] > key:
        A[i + 1] = A[i]
        i -= 1
    A[i + 1] = key
\`\`\`

- **Loop Invariant:** At the start of each iteration of the outer loop, subarray $A[0 \\dots j-1]$ consists of the elements originally in $A[0 \\dots j-1]$, but in sorted order.
  - **Initialization ($j = 1$):** Subarray $A[0 \\dots 0]$ has 1 element, which is trivially sorted. Base case holds!
  - **Maintenance ($j = k \\to k+1$):** The inner while loop shifts elements $A[k-1], A[k-2], \\dots$ that are greater than \`key\` to the right by one position, then inserts \`key\` at the correct location. Thus $A[0 \\dots k]$ is now sorted.
  - **Termination ($j = n$):** The loop terminates when $j = n$. By the invariant, subarray $A[0 \\dots n-1]$ consists of all original elements in sorted order. The algorithm is verified correct!

---

### 11. Induction Fallacies & "AIR 1 Traps"

#### 11.1 George Pólya's "All Horses Are the Same Color" Paradox
Renowned mathematician George Pólya introduced this famous false proof to demonstrate how subtle flaws in the inductive step can lead to absurd conclusions.

> **False Claim:** All horses have the same color.
>
> **"Proof":**
> - Let $P(n)$ be the proposition: "In any set of $n$ horses, all horses have the same color."
> - **Base Step ($n = 1$):** In any set of 1 horse, there is only one horse, so all horses in the set trivially have the same color. $P(1)$ is true.
> - **"Inductive Step":** Assume $P(k)$ is true for all sets of $k$ horses.
>   Now consider a set of $k+1$ horses: $H = \\{h_1, h_2, \\dots, h_k, h_{k+1}\\}$.
>   Consider two subsets of size $k$:
>   $$S_1 = \\{h_1, h_2, \\dots, h_k\\} \\quad \\text{and} \\quad S_2 = \\{h_2, h_3, \\dots, h_{k+1}\\}$$
>   By the Inductive Hypothesis $P(k)$:
>   - All horses in $S_1$ have the same color (say, Color C).
>   - All horses in $S_2$ have the same color.
>   Since the two sets overlap at $\\{h_2, \\dots, h_k\\}$, $h_2$ belongs to both sets and must have Color C. Therefore, all horses in $S_2$ also have Color C.
>   Thus, all $k+1$ horses have Color C. $P(k) \\implies P(k+1)$!
>   Therefore, by PMI, all horses in the world have the same color!

\`\`\`text
WHERE IS THE CRITICAL FLAW?
Examine the transition from k = 1 to k = 2!
For k = 1 (proving k+1 = 2 horses {h₁, h₂}):
Subset S₁ = {h₁}
Subset S₂ = {h₂}
What is the overlap? S₁ ∩ S₂ = {h₁} ∩ {h₂} = ∅ (EMPTY SET!)
There is NO shared horse to transfer the color property between h₁ and h₂!
The inductive step P(k) ⟹ P(k+1) is ONLY valid for k >= 2, but P(1) ⟹ P(2) FAILS!
Because the chain breaks at the very first step (1 to 2), the entire proof collapses.
\`\`\`

---

### 12. Executable Python Demonstrations

\`\`\`python
"""
Demonstrations for Week 6: Mathematical Induction
1. Golomb's L-Tromino Deficient Chessboard Tiler
2. Frobenius Postage Stamp Solver (3¢ and 5¢ stamps)
3. Strong Induction Prime Factorization
4. Loop Invariant Verification for Insertion Sort
"""

# 1. Golomb's L-Tromino Deficient Chessboard Tiler
def tile_deficient_board(n: int, missing_r: int, missing_c: int):
    size = 2 ** n
    board = [[0] * size for _ in range(size)]
    board[missing_r][missing_c] = -1  # -1 represents the missing square
    tromino_id = 1

    def solve(top_r: int, top_c: int, missing_row: int, missing_col: int, sub_size: int):
        nonlocal tromino_id
        if sub_size == 1:
            return

        current_id = tromino_id
        tromino_id += 1
        half = sub_size // 2
        mid_r = top_r + half
        mid_c = top_c + half

        # Check which of the 4 quadrants contains the missing square
        # Top-Left quadrant
        if missing_row < mid_r and missing_col < mid_c:
            solve(top_r, top_c, missing_row, missing_col, half)
        else:
            board[mid_r - 1][mid_c - 1] = current_id
            solve(top_r, top_c, mid_r - 1, mid_c - 1, half)

        # Top-Right quadrant
        if missing_row < mid_r and missing_col >= mid_c:
            solve(top_r, mid_c, missing_row, missing_col, half)
        else:
            board[mid_r - 1][mid_c] = current_id
            solve(top_r, mid_c, mid_r - 1, mid_c, half)

        # Bottom-Left quadrant
        if missing_row >= mid_r and missing_col < mid_c:
            solve(mid_r, top_c, missing_row, missing_col, half)
        else:
            board[mid_r][mid_c - 1] = current_id
            solve(mid_r, top_c, mid_r, mid_c - 1, half)

        # Bottom-Right quadrant
        if missing_row >= mid_r and missing_col >= mid_c:
            solve(mid_r, mid_c, missing_row, missing_col, half)
        else:
            board[mid_r][mid_c] = current_id
            solve(mid_r, mid_c, mid_r, mid_c, half)

    solve(0, 0, missing_r, missing_c, size)
    return board

# 2. Postage Stamp Frobenius Combinations (3¢ and 5¢ stamps)
def make_postage(n: int) -> tuple[int, int]:
    """Returns (count_3c, count_5c) for any n >= 8 via strong induction recurrence."""
    assert n >= 8, "Postage must be at least 8 cents."
    if n == 8:
        return (1, 1)  # 3(1) + 5(1) = 8
    if n == 9:
        return (3, 0)  # 3(3) + 5(0) = 9
    if n == 10:
        return (0, 2)  # 3(0) + 5(2) = 10
    
    # Strong induction step: postage(n) = postage(n-3) + one 3-cent stamp
    c3, c5 = make_postage(n - 3)
    return (c3 + 1, c5)

# 3. Prime Factorization via Strong Induction
def prime_factors(n: int) -> list[int]:
    """Every integer n >= 2 is either prime or product of primes."""
    assert n >= 2
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return prime_factors(i) + prime_factors(n // i)
    return [n]  # n is prime

# 4. Loop Invariant Runtime Assertion Tracker
def insertion_sort_verified(arr: list[int]) -> list[int]:
    a = arr.copy()
    for j in range(1, len(a)):
        # Loop Invariant check prior to iteration: a[0...j-1] is sorted
        assert all(a[k] <= a[k + 1] for k in range(j - 1)), f"Invariant failed at j={j}"
        
        key = a[j]
        i = j - 1
        while i >= 0 and a[i] > key:
            a[i + 1] = a[i]
            i -= 1
        a[i + 1] = key
    return a

if __name__ == "__main__":
    # Test Tromino Tiling on 4x4 board with missing square at (1, 2)
    tiled_grid = tile_deficient_board(2, 1, 2)
    print("4x4 Deficient Board Tiled Grid (missing at (1,2) marked as -1):")
    for row in tiled_grid:
        print(" ".join(f"{val:2d}" for val in row))

    # Verify postage stamps for 8 through 20
    print("\nPostage Stamp Solver (3¢ and 5¢ stamps):")
    for cents in range(8, 16):
        s3, s5 = make_postage(cents)
        print(f"{cents}¢ = {s3}x(3¢) + {s5}x(5¢) -> {3*s3 + 5*s5}¢")

    # Prime factor test
    print(f"\nPrime factors of 84: {prime_factors(84)}")
\`\`\`

---

## Additional Resources

**Academic References:**
- *NPTEL Discrete Mathematics* by Prof. Sudarshan Iyengar (IIT Ropar — Week 6: Mathematical Induction)
- *Discrete Mathematics and Its Applications* by Kenneth H. Rosen (Chapter 5: Induction and Recursion)
- *Mathematics for Computer Science* by Eric Lehman, F. Thomson Leighton, and Albert R. Meyer (MIT OCW)
`,
  subModules: [],
  practiceQuiz: [
    {
      id: "mi-q1",
      question:
        "In George Pólya's famous 'All horses have the same color' fallacious induction proof, exactly where does the logical implication break down?",
      options: [
        "The base case P(1) is false because a single horse can have multiple colors (e.g. spots)",
        "The inductive step P(k) ⟹ P(k+1) fails specifically at k = 1, because the two subsets of size 1 do not share any common horse to bridge the colors",
        "Mathematical induction cannot be applied to biological sets like horses",
        "The inductive hypothesis is circular because it assumes all horses have the same color before proving it",
      ],
      correctAnswer: 1,
      explanation:
        "Pólya's false proof divides a set of k+1 horses into two subsets of size k: S₁ = {h₁, ..., hₖ} and S₂ = {h₂, ..., hₖ₊₁}. The proof claims these subsets overlap at {h₂, ..., hₖ}, so all horses share one color. However, when k = 1 (transitioning from 1 horse to 2 horses {h₁, h₂}), S₁ = {h₁} and S₂ = {h₂}. Their intersection S₁ ∩ S₂ is the EMPTY SET! Without an overlapping element, the color property cannot transfer between h₁ and h₂. Thus P(1) ⟹ P(2) is false, and the inductive chain never starts.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Mathematical Induction",
    },
    {
      id: "mi-q2",
      question:
        "According to Golomb's Deficient Chessboard Tromino Theorem, exactly how many L-shaped trominoes (each of area 3) are needed to completely tile a 2ⁿ × 2ⁿ chessboard with one square removed?",
      options: ["(4ⁿ - 1) / 3", "(2ⁿ - 1) / 3", "4ⁿ / 3", "(2²ⁿ - 2) / 3"],
      correctAnswer: 0,
      explanation:
        "The total area of a 2ⁿ × 2ⁿ chessboard is (2ⁿ)² = 2²ⁿ = 4ⁿ unit squares. Removing exactly one square leaves 4ⁿ - 1 squares. Since each L-tromino covers exactly 3 squares and there are no overlaps or gaps, the total number of trominoes required is (4ⁿ - 1) / 3.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Mathematical Induction",
    },
    {
      id: "mi-q3",
      question:
        "When proving by Strong Induction that any postage n ≥ 8 cents can be formed using only 3-cent and 5-cent stamps via the recurrence postage(n) = postage(n - 3) + 3¢, what is the MINIMUM number of base cases that must be verified before the inductive step is valid?",
      options: [
        "1 base case (n = 8)",
        "2 base cases (n = 8, 9)",
        "3 base cases (n = 8, 9, 10)",
        "5 base cases (n = 8, 9, 10, 11, 12)",
      ],
      correctAnswer: 2,
      explanation:
        "Because the inductive step derives postage for (k + 1) by looking back 3 units to (k + 1) - 3 = (k - 2), the induction step requires that (k - 2) ≥ 8. For the inductive step to be active at (k + 1) = 11, we must have verified k = 10, k = 9, and k = 8. Thus, exactly 3 consecutive base cases (n = 8, 9, and 10) must be verified directly: 8 = 3 + 5; 9 = 3 + 3 + 3; 10 = 5 + 5.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Mathematical Induction",
    },
    {
      id: "mi-q4",
      question:
        "Which of the following subsets of numbers is NOT well-ordered under the standard '≤' relation?",
      options: [
        "The set of all prime numbers {2, 3, 5, 7, 11, ...}",
        "The set of non-negative even integers {0, 2, 4, 6, ...}",
        "The set of negative integers {-1, -2, -3, -4, ...}",
        "Any non-empty finite set of real numbers",
      ],
      correctAnswer: 2,
      explanation:
        "By definition, a set S is well-ordered under ≤ if every non-empty subset of S has a least (smallest) element. The set of negative integers {-1, -2, -3, ...} does NOT have a least element (for any negative integer -m, -(m+1) is strictly smaller). Hence, negative integers are not well-ordered. All subsets of natural numbers (like primes or evens) and all finite sets of reals are well-ordered.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Mathematical Induction",
    },
    {
      id: "mi-q5",
      question:
        "Consider proving that 2ⁿ > n² for integers n ≥ n₀. What is the smallest positive integer n₀ for which this inequality is true and can serve as the valid base case for mathematical induction?",
      options: ["n₀ = 1", "n₀ = 2", "n₀ = 4", "n₀ = 5"],
      correctAnswer: 3,
      explanation:
        "Testing small integer values: For n = 1: 2¹ > 1² (2 > 1, true, but the inequality immediately fails afterwards). For n = 2: 2² > 2² (4 > 4, False). For n = 3: 2³ > 3² (8 > 9, False). For n = 4: 2⁴ > 4² (16 > 16, False). For n = 5: 2⁵ > 5² (32 > 25, True). For all n ≥ 5, 2ⁿ > n² holds unconditionally. Thus n₀ = 5 is the correct starting base case.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Mathematical Induction",
    },
    {
      id: "mi-q6",
      question:
        "A full (proper) binary tree is defined as a binary tree where every internal node has exactly 2 children. Using structural induction, if a full binary tree has 15 internal nodes, how many leaf nodes must it contain?",
      options: ["14", "15", "16", "30"],
      correctAnswer: 2,
      explanation:
        "By the Full Binary Tree Leaf Theorem proved via structural induction: L(T) = I(T) + 1, where L is the number of leaf nodes and I is the number of internal nodes. Here I = 15, so L = 15 + 1 = 16 leaf nodes.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Mathematical Induction",
    },
  ],
};
