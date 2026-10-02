import { LearningModule } from "@/types/learning";

export const discreteMathWeek1Module: LearningModule = {
  id: "discrete-math-week-1",
  title: "Discrete Math: Week 1 Assignment",
  description:
    "Rapid recall cheatsheet for NPTEL Discrete Mathematics Week 1: Counting principles, permutations, combinations, grid paths, Catalan numbers, Dyck paths, polygon triangulation, stack permutations (LIFO), adjacent/non-adjacent arrangements, circular permutations, and growth rates.",
  status: "completed",
  tags: [
    "Discrete Mathematics",
    "NPTEL",
    "Combinatorics",
    "Catalan Numbers",
    "Permutations",
    "Combinations",
    "Dyck Paths",
    "LIFO Stack",
  ],
  detailedContent: `# Discrete Mathematics: Week 1 Assignment Cheatsheet

Welcome to the **NPTEL Discrete Mathematics: Week 1 Assignment Quick Recall Cheatsheet**. This reference guide condenses the entire week's combinatorial foundations into high-yield formulas, mental shortcuts, assignment problem-solving patterns, and common exam traps.

Whether you are revising before submitting **Assignment 1**, preparing for NPTEL proctored exams, or studying for GATE CS, use this page for rapid 10-second formula lookup and deep conceptual clarity.

---

## ⚡ 10-Second Quick Recall Formula Card

| # | Topic | Primary Formula | Rapid Trick / Memory Hook |
|:--|:------|:----------------|:--------------------------|
| 1 | **Fundamental Counting** | Sum: $m + n$ (disjoint)<br>Product: $m \\times n$ (sequential) | "OR" means **ADD**; "AND" means **MULTIPLY**. Use complement: $\\text{Valid} = \\text{Total} - \\text{Invalid}$. |
| 2 | **Permutations** | $^n P_r = \\frac{n!}{(n - r)!}$ | **Order MATTERS** (rankings, codes, sequences). Fill $r$ slots sequentially. |
| 3 | **Combinations** | $^n C_r = \\binom{n}{r} = \\frac{n!}{r!(n - r)!}$ | **Order DOES NOT matter** (teams, subsets, hands). Divide $^n P_r$ by $r!$. |
| 4 | **Grid Path Counting** | Square Grid: $\\binom{2n}{n}$<br>Rect Grid: $\\binom{m+n}{m}$ | Paths from $(0,0)$ to $(m,n)$ moving only Right & Up. Anagram of $m$ 'R's and $n$ 'U's. |
| 5 | **Catalan Numbers** | $C_n = \\frac{1}{n+1}\\binom{2n}{n} = \\frac{(2n)!}{(n+1)!\\,n!}$ | Sequence: **1, 1, 2, 5, 14, 42, 132, 429**. Mental trick: $C_n = \\frac{4n-2}{n+1}C_{n-1}$. |
| 6 | **Dyck Paths** | $\\text{Count} = C_n$ | Paths on $n \\times n$ grid from $(0,0)$ to $(n,n)$ staying $\\le$ diagonal $y = x$. Reflection principle: $\\binom{2n}{n} - \\binom{2n}{n+1}$. |
| 7 | **Non-Crossing Pairings** | $\\text{Count} = C_n$ | $2n$ points on circle joined in pairs without intersecting chords. Divides circle into independent even components. |
| 8 | **Polygon Triangulation** | $\\text{Count} = C_{n - 2}$ | Partitioning convex $n$-gon into triangles with $n-3$ diagonals. **Watch the shift:** $n$ vertices $\\implies C_{n-2}$! |
| 9 | **Stack Permutations (LIFO)** | $\\text{Count} = C_n$ | Permutations achievable with push/pop on input $(1, 2, \\dots, n)$. **Forbidden pattern:** Avoids **231** (e.g. $[3, 1, 2]$ is invalid). |
| 10 | **Consecutive / Adjacent** | $2(n - 1)!$ (for 2 items) | **Block / Glue Method:** Treat 2 items as 1 single super-object $\\implies (n-1)! \\times 2!$. |
| 11 | **Non-Adjacent Arrangements** | $n! - 2(n - 1)!$ (for 2 items) | **Complement Rule:** $\\text{Total} - \\text{Together}$. For 3+ items: **Gap Method** (place items in empty slots). |
| 12 | **Repeated Objects** | $\\frac{n!}{n_1!\\,n_2!\\cdots n_k!}$ | Divide total $n!$ by factorial of counts of identical items (e.g., "MISSISSIPPI": $\\frac{11!}{1!\\,4!\\,4!\\,2!}$). |
| 13 | **Circular Permutations** | Circle: $(n - 1)!$<br>Necklace: $\\frac{(n - 1)!}{2}$ | Fix 1 person to break rotational symmetry. If reversible (necklaces/keyrings), divide by 2. |
| 14 | **Growth Rates** | $n! > 2^n \\quad (\\forall n \\ge 4)$ | Factorial crushes exponential: $1 < \\log n < n < n^2 < 2^n < n! < n^n$. Base transition at $n=4$ ($24 > 16$). |

---

## What You'll Learn & Recall

| # | Topic | Core Competency |
|:--|:------|:----------------|
| 1 | **Fundamental Counting Principle** | Distinguish addition vs multiplication rules and apply the complement counting principle |
| 2 | **Permutations ($^n P_r$)** | Compute ordered arrangements and solve sequential slot-filling constraints |
| 3 | **Combinations ($^n C_r$)** | Select unordered subsets and exploit symmetry identities ($\\binom{n}{r} = \\binom{n}{n-r}$) |
| 4 | **Grid Path Counting** | Map lattice paths to word anagrams and calculate paths through or avoiding intermediate points |
| 5 | **Catalan Numbers ($C_n$)** | Derive $C_n$ using closed forms, recurrence relations, and fast mental multiplication |
| 6 | **Dyck Paths & Balanced Strings** | Apply André's reflection principle and convert Dyck paths to balanced parenthesis expressions |
| 7 | **Non-Crossing Pairings** | Solve circular chord pairing problems and understand recursive partition boundaries |
| 8 | **Polygon Triangulations** | Triangulate convex polygons with non-crossing diagonals without confusing $C_n$ vs $C_{n-2}$ |
| 9 | **Stack Permutations & LIFO** | Identify stack-sortable permutations and detect forbidden 231 patterns |
| 10 | **Adjacent Arrangements** | Group consecutive objects using the string/block method |
| 11 | **Non-Adjacent Arrangements** | Solve non-consecutive arrangements using complement rules and the gap method |
| 12 | **Multiset Permutations** | Eliminate overcounting for words and collections with duplicate elements |
| 13 | **Circular Permutations** | Eliminate rotational and reflective symmetries for round tables and necklaces |
| 14 | **Growth Rates & Factorials** | Compare asymptotic hierarchies ($n!$ vs $2^n$ vs $n^k$) and estimate large factorials via Stirling's formula |

---

## Detailed Topic Breakdown & Assignment Tricks

### 1. Fundamental Counting Principle

The foundation of all discrete counting rests on two elementary principles:

#### A. The Rule of Sum (Addition Principle)
If task 1 can be performed in $m$ distinct ways, task 2 in $n$ distinct ways, and both tasks **cannot occur simultaneously** (mutually exclusive / disjoint, $A \\cap B = \\emptyset$):
$$\\text{Total Ways} = m + n$$

If events have an overlap ($A \\cap B \\neq \\emptyset$), apply the **Inclusion-Exclusion Principle**:
$$|A \\cup B| = |A| + |B| - |A \\cap B|$$

#### B. The Rule of Product (Multiplication Principle)
If a procedure consists of a sequence of two independent stages, where Stage 1 has $m$ possible outcomes and Stage 2 has $n$ possible outcomes regardless of the choice in Stage 1:
$$\\text{Total Ways} = m \\times n$$

Extended to $k$ sequential choices:
$$\\text{Total Ways} = n_1 \\times n_2 \\times n_3 \\times \\cdots \\times n_k$$

> [!TIP]
> **Assignment Shortcut — Complement Counting**:
> Whenever an assignment question contains phrases like **"at least one"**, **"not all identical"**, or **"no two adjacent"**, calculate the complement!
> $$\\text{Ways with condition} = \\text{Total Unconstrained Ways} - \\text{Unwanted Ways}$$
> This replaces complex multi-case additions with a single subtraction.

---

### 2. Permutations (ⁿPᵣ)

A **permutation** is an ordered arrangement of $r$ objects selected from a set of $n$ distinct objects. **Order matters!**

$$^n P_r = P(n, r) = \\frac{n!}{(n - r)!} = n(n - 1)(n - 2)\\cdots(n - r + 1)$$

#### Critical Identities & Edge Cases:
- $^n P_n = n!$ (arranging all $n$ items in a line)
- $^n P_0 = 1$ (exactly 1 way to arrange 0 items: the empty sequence)
- $^n P_1 = n$
- $0! = 1$ (by definition)

#### Worked Example:
*In how many ways can a President, Vice-President, and Treasurer be chosen from a committee of 10 people?*
- Since roles are distinct, order matters:
$$^{10}P_3 = \\frac{10!}{(10 - 3)!} = 10 \\times 9 \\times 8 = 720 \\text{ ways}$$

---

### 3. Combinations (ⁿCᵣ)

A **combination** is a selection of $r$ objects from a set of $n$ distinct objects where **order does NOT matter**.

$$^n C_r = C(n, r) = \\binom{n}{r} = \\frac{n!}{r!(n - r)!} = \\frac{^n P_r}{r!}$$

#### Essential Algebraic Properties:
1. **Symmetry Identity**: $\\binom{n}{r} = \\binom{n}{n - r}$ (Choosing $r$ items to include is identical to choosing $n - r$ items to exclude).
2. **Pascal's Identity**: $\\binom{n}{r} = \\binom{n - 1}{r - 1} + \\binom{n - 1}{r}$
3. **Power Set Sum**: $\\sum_{r=0}^n \\binom{n}{r} = 2^n$ (Total number of subsets of a set with $n$ elements).

#### Fast Calculation Trick:
Always cancel the largest factorial in the denominator before multiplying:
$$\\binom{10}{3} = \\frac{10 \\times 9 \\times 8}{3 \\times 2 \\times 1} = 10 \\times \\left(\\frac{9}{3}\\right) \\times \\left(\\frac{8}{2}\\right) = 10 \\times 3 \\times 4 = 120$$

---

### 4. Grid Path Counting

A classic discrete math question asks for the number of paths between coordinates on a grid moving only **Right (R)** and **Up (U)**.

#### A. From $(0,0)$ to $(m,n)$ on a Rectangular Grid
To reach $(m, n)$, any valid monotonic path requires exactly $m$ Right steps and $n$ Up steps in some order (total $m + n$ steps).
$$\\text{Total Paths} = \\binom{m + n}{m} = \\binom{m + n}{n} = \\frac{(m + n)!}{m!\\,n!}$$

#### B. From $(0,0)$ to $(n,n)$ on an $n \\times n$ Square Grid
$$\\text{Total Unrestricted Paths} = \\binom{2n}{n} = \\frac{(2n)!}{n!\\,n!}$$

\`\`\`text
(0,2) +---+---+ (2,2)
      |   |   |
(0,1) +---+---+ (2,1)
      |   |   |
(0,0) +---+---+ (2,0)
Path = R -> U -> R -> U (Anagram of {R, R, U, U} => 4! / (2! 2!) = 6 paths)
\`\`\`

#### C. Path Passing Through an Intermediate Point $(a, b)$:
If you must pass through intermediate junction $(a, b)$ on your way from $(0,0)$ to $(m,n)$ where $0 \\le a \\le m$ and $0 \\le b \\le n$:
$$\\text{Paths via } (a,b) = \\binom{a + b}{a} \\times \\binom{(m - a) + (n - b)}{m - a}$$

#### D. Path Avoiding an Obstacle Point $(a, b)$:
$$\\text{Paths Avoiding } (a,b) = \\binom{m + n}{m} - \\left[\\binom{a + b}{a} \\times \\binom{(m - a) + (n - b)}{m - a}\\right]$$

---

### 5. Catalan Numbers (Cₙ)

The **Catalan numbers** form one of the most prolific integer sequences in combinatorics, appearing in over 60 distinct combinatorial structures.

#### The Sequence:
$$C_0 = 1,\\; C_1 = 1,\\; C_2 = 2,\\; C_3 = 5,\\; C_4 = 14,\\; C_5 = 42,\\; C_6 = 132,\\; C_7 = 429,\\; C_8 = 1430$$

#### Closed-Form Formulas:
$$C_n = \\frac{1}{n + 1}\\binom{2n}{n} = \\frac{(2n)!}{(n + 1)!\\,n!} = \\binom{2n}{n} - \\binom{2n}{n + 1}$$

#### Recurrence Relations:
1. **Convolution / Multiplicative Recurrence**:
   $$C_0 = 1,\\quad C_{n+1} = \\sum_{i=0}^n C_i C_{n-i} = C_0 C_n + C_1 C_{n-1} + \\cdots + C_n C_0$$
2. **Linear Step-by-Step Recurrence (Fast Mental Trick)**:
   $$C_n = \\frac{4n - 2}{n + 1} C_{n-1} = \\frac{2(2n - 1)}{n + 1} C_{n-1}$$

> [!TIP]
> **5-Second Mental Calculation of Catalan Numbers**:
> - $C_1 = 1$
> - $C_2 = \\frac{6}{3} \\times 1 = 2$
> - $C_3 = \\frac{10}{4} \\times 2 = 5$
> - $C_4 = \\frac{14}{5} \\times 5 = 14$
> - $C_5 = \\frac{18}{6} \\times 14 = 3 \\times 14 = 42$
> - $C_6 = \\frac{22}{7} \\times 42 = 22 \\times 6 = 132$
> You never need to calculate $(2n)!$ from scratch!

---

### 6. Dyck Paths

A **Dyck Path** of semilength $n$ is a lattice path from $(0, 0)$ to $(n, n)$ with steps $(1, 0)$ [Right] and $(0, 1)$ [Up] that **never rises strictly above the main diagonal $y = x$**.

$$\\text{Total Dyck Paths} = C_n = \\frac{1}{n + 1}\\binom{2n}{n}$$

\`\`\`text
y ^
  |       (n,n)
  |      /  |
  |    /    |
  |  /  Path stays on or below diagonal y = x
  |/
--+-------------> x
 (0,0)
\`\`\`

#### André's Reflection Principle (The Elegance of the Proof):
1. Total unconstrained paths from $(0,0)$ to $(n,n) = \\binom{2n}{n}$.
2. A path is "bad" if it touches the forbidden line $y = x + 1$.
3. Let the path first touch $y = x + 1$ at point $(k, k+1)$. If we reflect the remaining portion of the path across the line $y = x + 1$, the endpoint $(n, n)$ reflects to $(n - 1, n + 1)$.
4. The number of paths from $(0,0)$ to $(n-1, n+1)$ is $\\binom{2n}{n-1} = \\binom{2n}{n+1}$.
5. Therefore:
$$\\text{Valid Dyck Paths} = \\binom{2n}{n} - \\binom{2n}{n+1} = \\frac{1}{n+1}\\binom{2n}{n} = C_n$$

#### Bijection to Balanced Parentheses (Dyck Words):
Every Dyck path corresponds 1-to-1 with a balanced string of $n$ pairs of parentheses:
- Step Right (R) $\\longleftrightarrow$ Opening parenthesis \`(\`
- Step Up (U) $\\longleftrightarrow$ Closing parenthesis \`)\`
- Condition "never above diagonal" $\\longleftrightarrow$ at no prefix do closing parentheses exceed opening parentheses!

For $n = 3$, $C_3 = 5$ strings:
1. \`((()))\`
2. \`(()())\`
3. \`(())()\`
4. \`()(())\`
5. \`()()()\`

---

### 7. Non-Crossing Pairings

Consider $2n$ points labeled $1, 2, 3, \\dots, 2n$ placed in order on the circumference of a circle. We wish to connect these $2n$ points in $n$ pairs using straight chords such that **no two chords intersect**.

$$\\text{Number of Non-Crossing Pairings} = C_n$$

\`\`\`text
       1 --- 2
     /         \\
    6           3   (No chords cross inside circle!)
     \\         /
       5 --- 4
\`\`\`

#### Why does this equal $C_n$?
If point $1$ connects to point $2k$, it partitions the remaining circle into two disjoint sets:
- One side has $2k - 2$ points (paired in $C_{k-1}$ non-crossing ways).
- The other side has $2n - 2k$ points (paired in $C_{n-k}$ non-crossing ways).
- Summing over all valid connection endpoints $k = 1, \\dots, n$:
$$\\sum_{k=1}^n C_{k-1} C_{n-k} = C_n$$
This is precisely the Catalan convolution recurrence!

---

### 8. Polygon Triangulation

A convex polygon with $n$ vertices ($n$-gon) can be partitioned into triangles by drawing non-intersecting internal diagonals between its vertices.

$$\\text{Number of Triangulations} = C_{n - 2} = \\frac{1}{n - 1}\\binom{2(n - 2)}{n - 2}$$

> [!WARNING]
> **The #1 Assignment Trap — The Index Shift!**:
> Do NOT use $C_n$ for an $n$-gon! The index is shifted by 2:
> - **Triangle ($n = 3$ vertices)**: $C_{3-2} = C_1 = 1$ way ($0$ diagonals needed).
> - **Quadrilateral ($n = 4$ vertices)**: $C_{4-2} = C_2 = 2$ ways (choose diagonal AC or BD).
> - **Pentagon ($n = 5$ vertices)**: $C_{5-2} = C_3 = 5$ ways.
> - **Hexagon ($n = 6$ vertices)**: $C_{6-2} = C_4 = 14$ ways.
> - **Heptagon ($n = 7$ vertices)**: $C_{7-2} = C_5 = 42$ ways.
> - **Octagon ($n = 8$ vertices)**: $C_{8-2} = C_6 = 132$ ways.

An $n$-gon requires drawing **$n - 3$ diagonals**, which partition the interior into **$n - 2$ triangles**.

---

### 9. Stack Permutations & LIFO Principle

A **Stack** operates on the **LIFO (Last In, First Out)** principle. Suppose integers $1, 2, \\dots, n$ arrive sequentially in increasing order. At each step, we can either:
1. **Push** the next incoming number onto the stack.
2. **Pop** the top element from the stack to the output stream.

#### Key Facts:
1. **Total Distinct Output Permutations**: Exactly equal to the $n$-th Catalan number:
   $$\\text{Valid Stack Permutations} = C_n$$
2. **Total Possible Permutations**: $n!$
3. **Invalid / Impossible Permutations**: $n! - C_n$

#### Knuth's Forbidden Pattern Theorem:
> A permutation is stack-sortable (or stack-generable) if and only if it **avoids the 231 pattern**.
> That is, there do NOT exist three indices $i < j < k$ whose values satisfy:
> $$\\pi(k) < \\pi(i) < \\pi(j)$$

#### Why $[3, 1, 2]$ is IMPOSSIBLE for $n = 3$:
- Total permutations for $n = 3$ is $3! = 6$.
- Catalan count $C_3 = 5$.
- Exactly $6 - 5 = 1$ permutation is impossible: **$[3, 1, 2]$**!
- **Proof:** To output $3$ first, we must push $1$, push $2$, push $3$, and pop $3$. Now the stack contains $2$ on top of $1$. The next popped element **MUST be 2**, never $1$! Hence $[3, 1, 2]$ can never be produced.

---

### 10. Consecutive / Adjacent Arrangements (The Block Method)

To arrange $n$ distinct objects in a straight line such that **two specified distinct objects (say $A$ and $B$) must ALWAYS be adjacent (together)**:

$$\\text{Ways} = 2! \\times (n - 1)! = 2(n - 1)!$$

#### The Tie-Together / Block Method:
1. "Tie" $A$ and $B$ together into a single composite block $[AB]$.
2. Now we have $(n - 2)$ other objects plus $1$ block $= (n - 1)$ entities to arrange in a line $\\implies (n - 1)!$ ways.
3. Within the block, $A$ and $B$ can arrange themselves in $2! = 2$ internal orders ($[AB]$ or $[BA]$).
4. By the Rule of Product:
$$\\text{Total Ways} = 2! \\times (n - 1)! = 2(n - 1)!$$

#### Generalization ($k$ Specified Objects Together):
If $k$ specified objects must always stay together:
$$\\text{Ways} = k! \\times (n - k + 1)!$$

---

### 11. Non-Adjacent Arrangements (Complement & Gap Methods)

#### Case A: Two Specified Objects Must NOT Be Together
Use the **Complement Rule (Total $-$ Together)**:
$$\\text{Ways} = n! - 2(n - 1)! = n(n - 1)! - 2(n - 1)! = (n - 2)(n - 1)!$$

*Example ($n = 5$ people, Alice and Bob not together):*
$$\\text{Ways} = 5! - 2(4!) = 120 - 48 = 72 \\text{ ways}$$
Or using the formula: $(5 - 2) \\times 4! = 3 \\times 24 = 72$.

#### Case B: $k$ Objects with NO Two Adjacent (The Gap Method)
When 3 or more objects must be separated (no two adjacent), the simple subtraction rule fails! You **must use the Gap / Insertion Method**:
1. Arrange the other $n - k$ unconstrained items in a row: $(n - k)!$ ways.
2. This creates $(n - k) + 1$ available "gaps" (including both ends).
3. Choose $k$ of these gaps and assign the $k$ constrained items to them:
$$\\text{Ways} = (n - k)! \\times \\binom{(n - k) + 1}{k} \\times k! = (n - k)! \\times P(n - k + 1, k)$$

---

### 12. Permutations with Repeated Objects (Multisets)

When arranging $n$ total objects where some objects are indistinguishable:
- $n_1$ items are identical of type 1
- $n_2$ items are identical of type 2
- $\\dots$
- $n_k$ items are identical of type $k$
where $n_1 + n_2 + \\dots + n_k = n$.

$$\\text{Distinct Permutations} = \\frac{n!}{n_1!\\,n_2!\\cdots n_k!}$$

#### Worked Examples:
1. **"STATISTICS"** (10 letters: 3 S, 3 T, 1 A, 2 I, 1 C):
   $$\\frac{10!}{3!\\,3!\\,1!\\,2!\\,1!} = \\frac{3,628,800}{6 \\times 6 \\times 2} = 50,400$$
2. **"MISSISSIPPI"** (11 letters: 1 M, 4 I, 4 S, 2 P):
   $$\\frac{11!}{1!\\,4!\\,4!\\,2!} = \\frac{39,916,800}{24 \\times 24 \\times 2} = 34,650$$

---

### 13. Circular Permutations

Arranging $n$ distinct objects along a closed loop differs from linear arrangements because **rotational shifts do not create new arrangements**.

#### A. Standard Round Table (Directional: Clockwise $\\neq$ Counter-Clockwise):
$$\\text{Ways} = (n - 1)!$$
- **Mental Hook (Anchor Trick):** Fix $1$ person in a designated seat to break circular symmetry. Now, the remaining $n - 1$ seats are linearly distinguishable relative to the anchor person. Hence $(n - 1)!$.

#### B. Necklaces, Garlands & Keyrings (Flip-Symmetric):
When the arrangement can be flipped over in 3D space, clockwise and counter-clockwise views become identical:
$$\\text{Ways} = \\frac{(n - 1)!}{2}$$

#### C. Circular Arrangements with Constraints:
- **Two specific people together in a circle:**
  Treat the pair as 1 block $\\implies$ arranging $(n - 1)$ entities in a circle in $((n - 1) - 1)! = (n - 2)!$ ways. Multiply by $2!$ internal swaps:
  $$\\text{Ways Together} = 2(n - 2)!$$
- **Two specific people NOT together in a circle:**
  $$\\text{Ways Apart} = (n - 1)! - 2(n - 2)! = (n - 1)(n - 2)! - 2(n - 2)! = (n - 3)(n - 2)!$$

---

### 14. Growth Rates & Factorial Explosion (n! > 2ⁿ)

Understanding algorithmic complexity and asymptotic growth rates is critical for Week 1 assignment questions on brute-force search vs tractability.

#### The Fundamental Growth Inequality:
$$n! > 2^n \\quad \\text{for all } n \\ge 4$$

#### Proof by Inspection & Induction:
- $n = 1$: $1! = 1$, $2^1 = 2$ ($1 < 2$)
- $n = 2$: $2! = 2$, $2^2 = 4$ ($2 < 4$)
- $n = 3$: $3! = 6$, $2^3 = 8$ ($6 < 8$)
- $n = 4$: $4! = 24$, $2^4 = 16$ ($24 > 16$) $\\implies$ **Tipping Point!**
- For $n \\ge 4$:
  $$n! = 4! \\times 5 \\times 6 \\times \\cdots \\times n = 24 \\times \\prod_{i=5}^n i > 16 \\times \\prod_{i=5}^n 2 = 2^4 \\times 2^{n-4} = 2^n$$

#### Complete Asymptotic Hierarchy:
$$O(1) < O(\\log \\log n) < O(\\log n) < O(\\sqrt{n}) < O(n) < O(n \\log n) < O(n^2) < O(n^3) < O(2^n) < O(e^n) < O(n!) < O(n^n)$$

#### Stirling's Approximation (Rapid Large-$n$ Estimation):
$$n! \\approx \\sqrt{2\\pi n} \\left(\\frac{n}{e}\\right)^n$$
$$\\ln(n!) \\approx n \\ln n - n$$

---

## 🐍 Python & C++ Rapid Solvers

### Python Implementation
\`\`\`python
import math
from itertools import permutations

def nPr(n: int, r: int) -> int:
    """Compute permutations P(n, r)"""
    return math.perm(n, r)

def nCr(n: int, r: int) -> int:
    """Compute combinations C(n, r)"""
    return math.comb(n, r)

def catalan_number(n: int) -> int:
    """Compute n-th Catalan number C_n"""
    return math.comb(2 * n, n) // (n + 1)

def is_stack_sortable(perm: list[int]) -> bool:
    """Check if permutation is achievable with LIFO stack (avoids 231)"""
    stack = []
    curr = 1
    for val in perm:
        while curr <= len(perm) and (not stack or stack[-1] != val):
            stack.append(curr)
            curr += 1
        if stack and stack[-1] == val:
            stack.pop()
        else:
            return False
    return len(stack) == 0

# Verification Demos
print("C_5 (Catalan 5):", catalan_number(5)) # Output: 42
print("Is [2, 3, 1] stack-sortable?", is_stack_sortable([2, 3, 1])) # True
print("Is [3, 1, 2] stack-sortable?", is_stack_sortable([3, 1, 2])) # False (231 pattern)
\`\`\`

### C++ Implementation
\`\`\`cpp
#include <iostream>
#include <vector>
#include <stack>

// Compute Catalan number using O(n) iterative recurrence: C_n = ((4n - 2) / (n + 1)) * C_{n-1}
long long getCatalan(int n) {
    if (n <= 1) return 1;
    long long c = 1;
    for (int i = 2; i <= n; ++i) {
        c = c * (4 * i - 2) / (i + 1);
    }
    return c;
}

// Check LIFO stack sortability in O(n)
bool isStackSortable(const std::vector<int>& target) {
    std::stack<int> s;
    int nextInput = 1;
    int n = target.size();

    for (int val : target) {
        while (nextInput <= n && (s.empty() || s.top() != val)) {
            s.push(nextInput++);
        }
        if (!s.empty() && s.top() == val) {
            s.pop();
        } else {
            return false;
        }
    }
    return s.empty();
}

int main() {
    std::cout << "C_5 = " << getCatalan(5) << std::endl; // 42
    std::cout << "Stack [3, 1, 2] valid: " << isStackSortable({3, 1, 2}) << std::endl; // 0 (false)
    return 0;
}
\`\`\`
`,
  subModules: [
    {
      id: "discrete-math-week1-lab",
      title: "Interactive Combinatorics, Catalan & Stack Lab",
      description:
        "Live interactive calculator for P(n,r), C(n,r), Catalan numbers, LIFO stack permutation validator (testing 231 patterns), and growth rates comparison.",
      status: "completed",
    },
  ],
  resources: [
    {
      title: "NPTEL: Discrete Mathematics (Prof. Sudarshan Iyengar, IIT Ropar)",
      url: "https://nptel.ac.in/courses/106106183",
      type: "course",
    },
    {
      title: "Catalan Numbers: Catalan's Original Sequence (OEIS A000108)",
      url: "https://oeis.org/A000108",
      type: "documentation",
    },
    {
      title:
        "MIT OCW 6.042J: Mathematics for Computer Science (Counting & Combinatorics)",
      url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/",
      type: "course",
    },
  ],
  practiceQuiz: [
    {
      id: "dm-w1-q1",
      question:
        "A student wants to travel on a 4 × 4 grid from coordinate (0, 0) to (4, 4) taking only Right (R) and Up (U) steps. What is the total number of distinct paths possible?",
      options: ["16", "70", "256", "14"],
      correctAnswer: 1,
      difficulty: "easy",
      topicTag: "Grid Path Counting",
      explanation:
        "Any path from (0,0) to (4,4) requires exactly 4 Right steps and 4 Up steps (total 8 steps). The number of paths is given by the binomial coefficient: \\binom{2n}{n} = \\binom{8}{4} = \\frac{8 \\times 7 \\times 6 \\times 5}{4 \\times 3 \\times 2 \\times 1} = 70.",
    },
    {
      id: "dm-w1-q2",
      question:
        "What is the 5th Catalan number, C₅ (where C₀ = 1, C₁ = 1, C₂ = 2)?",
      options: ["14", "28", "42", "132"],
      correctAnswer: 2,
      difficulty: "easy",
      topicTag: "Catalan Numbers",
      explanation:
        "Using the closed-form formula: C₅ = \\frac{1}{6}\\binom{10}{5} = \\frac{1}{6} \\times \\frac{10 \\times 9 \\times 8 \\times 7 \\times 6}{5 \\times 4 \\times 3 \\times 2 \\times 1} = \\frac{252}{6} = 42. Alternatively, using the recurrence: C₅ = \\frac{4(5) - 2}{5 + 1} C₄ = \\frac{18}{6} \\times 14 = 3 \\times 14 = 42.",
    },
    {
      id: "dm-w1-q3",
      question:
        "In how many ways can a convex heptagon (a 7-sided polygon) be triangulated by drawing non-intersecting internal diagonals between its vertices?",
      options: ["429", "132", "42", "14"],
      correctAnswer: 2,
      difficulty: "medium",
      topicTag: "Polygon Triangulation",
      explanation:
        "The number of triangulations of an n-sided convex polygon is given by C_{n-2}. For a heptagon, n = 7, so we evaluate C_{7-2} = C₅ = 42. (Remember not to compute C₇ = 429!).",
    },
    {
      id: "dm-w1-q4",
      question:
        "The sequence of numbers (1, 2, 3) is pushed in order into a LIFO stack. Which of the following permutations CANNOT be generated as an output sequence by any sequence of push and pop operations?",
      options: ["[2, 3, 1]", "[1, 3, 2]", "[3, 1, 2]", "[3, 2, 1]"],
      correctAnswer: 2,
      difficulty: "medium",
      topicTag: "Stack Permutations (LIFO)",
      explanation:
        "[3, 1, 2] is impossible because to output 3 first, elements 1, 2, and 3 must have all been pushed. The stack now holds [1, 2] with 2 on top of 1. By the LIFO principle, 2 MUST be popped before 1, making the output sequence [3, 1, 2] physically impossible. It exhibits the forbidden 231 pattern.",
    },
    {
      id: "dm-w1-q5",
      question:
        "In how many ways can 6 people sit in a straight line if two particular people, Alice and Bob, must ALWAYS sit together?",
      options: ["120", "240", "480", "720"],
      correctAnswer: 1,
      difficulty: "easy",
      topicTag: "Adjacent Arrangements",
      explanation:
        "Use the block method: tie Alice and Bob together as 1 single block [AB]. Now we have 4 other people + 1 block = 5 entities to arrange, which gives 5! = 120 ways. Within the block, Alice and Bob can arrange in 2! = 2 ways ([AB] or [BA]). Total ways = 2! × 5! = 2 × 120 = 240.",
    },
    {
      id: "dm-w1-q6",
      question:
        "In how many ways can 6 people sit in a straight line if Alice and Bob must NEVER sit together?",
      options: ["240", "360", "480", "720"],
      correctAnswer: 2,
      difficulty: "easy",
      topicTag: "Non-Adjacent Arrangements",
      explanation:
        "Use the complement rule: Total unconstrained arrangements − arrangements where they sit together = 6! − 2(5!) = 720 − 240 = 480 ways. Alternatively: (n − 2)(n − 1)! = (6 − 2)(5!) = 4 × 120 = 480.",
    },
    {
      id: "dm-w1-q7",
      question:
        "In how many ways can 7 distinct keys be arranged on a circular keyring?",
      options: ["5040", "720", "360", "2520"],
      correctAnswer: 2,
      difficulty: "medium",
      topicTag: "Circular Permutations",
      explanation:
        "For circular arrangements where clockwise and counter-clockwise views are identical (such as beads on a necklace or keys on a keyring), the formula is \\frac{(n - 1)!}{2}. For n = 7 keys: \\frac{(7 - 1)!}{2} = \\frac{6!}{2} = \\frac{720}{2} = 360.",
    },
    {
      id: "dm-w1-q8",
      question:
        "What is the smallest positive integer n for which n! > 2ⁿ strictly holds?",
      options: ["n = 3", "n = 4", "n = 5", "n = 6"],
      correctAnswer: 1,
      difficulty: "easy",
      topicTag: "Growth Rates",
      explanation:
        "Test small values: For n = 3: 3! = 6 and 2³ = 8 (6 < 8). For n = 4: 4! = 24 and 2⁴ = 16 (24 > 16). Thus, n = 4 is the smallest integer where factorial strictly overtakes exponential growth.",
    },
    {
      id: "dm-w1-q9",
      question:
        "How many distinct Dyck paths exist on a 4 × 4 grid from (0, 0) to (4, 4)?",
      options: ["70", "14", "42", "24"],
      correctAnswer: 1,
      difficulty: "medium",
      topicTag: "Dyck Paths",
      explanation:
        "Dyck paths of semilength n that do not cross above the diagonal y = x are enumerated by the n-th Catalan number: C₄ = \\frac{1}{5}\\binom{8}{4} = \\frac{70}{5} = 14. (Note that total unconstrained paths is 70, but only 14 never cross the diagonal).",
    },
    {
      id: "dm-w1-q10",
      question:
        "If 8 points are placed in order along the circumference of a circle, in how many ways can they be connected in 4 pairs by non-intersecting chords?",
      options: ["14", "42", "70", "105"],
      correctAnswer: 0,
      difficulty: "hard",
      topicTag: "Non-Crossing Pairings",
      explanation:
        "Connecting 2n points on a circle in n non-crossing pairs is given by C_n. Here total points = 8 = 2n, so n = 4. The number of non-crossing pairings is C₄ = 14.",
    },
  ],
};
