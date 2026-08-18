import { LearningModule } from "@/types/learning";

export const setTheoryModule: LearningModule = {
  id: "set-theory",
  title: "Set Theory & Combinatorics",
  description:
    "Discrete foundations: sets, Venn diagrams, power sets, Russell's paradox, bit vectors, permutations, combinations, and algebraic identities.",
  status: "in-progress",
  detailedContent: `# Set Theory & Combinatorics

Set theory and combinatorics form the discrete mathematical bedrock essential for computer science, database query engines, algorithm complexity analysis, cryptography, and modern programming languages.

This module covers **Set Theory (Foundations, Operations, Axioms, and Bit-Level Computer Representations)** alongside **Combinatorial Permutations & Selections**.

## What You'll Learn

By the end of this module, you will be able to:

| # | Topic | Skill |
|:--|:------|:------|
| 1 | **Sets & Notation** | Read and write roster and set-builder notation ($\in, \notin, \subseteq, \subset, \emptyset$) |
| 2 | **Subsets & Power Sets** | Compute and construct $P(A)$, proving cardinality $2^n$ via binary characteristic vectors |
| 3 | **Set Operations & Venn Diagrams** | Compute Union, Intersection, Difference, Symmetric Difference, and Complements |
| 4 | **Cardinality & Inclusion-Exclusion** | Apply 2-set, 3-set, and generalized $n$-set Principle of Inclusion-Exclusion (PIE) |
| 5 | **Set Identities & De Morgan's Laws** | Formally prove set equivalences using the Double Inclusion method ($A \subseteq B \land B \subseteq A$) |
| 6 | **Russell's Paradox & Axiomatic Sets** | Understand why Naive Set Theory failed and how modern axioms resolve self-referential paradoxes |
| 7 | **Computer Representation of Sets** | Implement set operations using Bit Vectors and bitwise CPU operations (\`&\`, \`\|\`, \`^\`, \`~\`) |
| 8 | **Permutations & Combinations** | Master permutations ($n!$, circular, multiset) and combinations ($C(n, r)$, gap method, polygons) |
| 9 | **Pascal's Triangle & Binomials** | Leverage Pascal's identity $C(n, r) = C(n-1, r-1) + C(n-1, r)$ and symmetry properties |
| 10 | **CS Applications & Database Queries** | Map relational algebra and SQL (\`UNION\`, \`INTERSECT\`, \`EXCEPT\`) to set theory |

---

## Math Notation & Pronunciation Guide

**Set Notation:**
- $\in$ — pronounced "element of" or "in" — membership ($x \in A$ means $x$ is in set $A$)
- $\notin$ — pronounced "not element of" — non-membership
- $\subseteq$ — pronounced "subset of or equal to" — every element of $A$ is in $B$
- $\subset$ — pronounced "proper subset of" — $A \subseteq B$ and $A \neq B$
- $\cup$ — pronounced "union" — elements in $A$ OR $B$
- $\cap$ — pronounced "intersection" — elements in $A$ AND $B$
- $\setminus$ or $-$ — pronounced "set difference" or "minus" — elements in $A$ but NOT in $B$
- $\Delta$ — pronounced "symmetric difference" — elements in $A$ OR $B$, but NOT both
- $\emptyset$ or $\{\}$ — pronounced "empty set" or "null set"
- $|A|$ or $n(A)$ — pronounced "cardinality of $A$" — total number of elements in $A$
- $P(A)$ — pronounced "power set of $A$" — set of all subsets of $A$
- $A \times B$ — pronounced "Cartesian product" — set of all ordered pairs $(a, b)$

**Combinatorics:**
- $n!$ — pronounced "n factorial" — $n \times (n-1) \times \dots \times 1$
- $P(n, r)$ or $^nP_r$ — pronounced "n permute r" — ordered arrangements
- $C(n, r)$ or $\binom{n}{r}$ or $^nC_r$ — pronounced "n choose r" — unordered selections

---

## Key Concepts

### 1. Sets — Fundamental Definitions & Notation

**What is a Set?**
A set is an **unordered collection of distinct, well-defined objects** (called elements or members).

**Two Standard Representations:**
1. **Roster / Tabular Form**: Explicitly listing all elements enclosed in curly braces:
   $$A = \{2, 4, 6, 8, 10\}$$
2. **Set-Builder Form**: Describing the characteristic property satisfied by all elements:
   $$A = \{x \in \mathbb{N} \mid x \text{ is even and } x \le 10\}$$

\`\`\`python
# Python sets mirror mathematical sets
A = {1, 2, 3, 4, 5}
B = {4, 5, 6, 7, 8}

# Set builder notation equivalent in Python:
C = {x for x in range(1, 10) if x % 2 == 0}  # {2, 4, 6, 8}

# Empty set in Python (note: {} creates a dict, set() creates empty set)
empty_set = set()
\`\`\`

**Standard Number Sets in Mathematics & CS:**
- $\mathbb{N}$ (Natural Numbers): $\{0, 1, 2, 3, \dots\}$ or $\{1, 2, 3, \dots\}$
- $\mathbb{Z}$ (Integers): $\{\dots, -2, -1, 0, 1, 2, \dots\}$
- $\mathbb{Q}$ (Rational Numbers): $\{p/q \mid p, q \in \mathbb{Z}, q \neq 0\}$
- $\mathbb{R}$ (Real Numbers): All points on the continuous number line
- $\mathbb{C}$ (Complex Numbers): $\{a + bi \mid a, b \in \mathbb{R}, i = \sqrt{-1}\}$
- $U$ (Universal Set): The overarching context containing all objects under consideration

**Classification of Sets:**

| Type | Definition | Mathematical Example |
|:-----|:-----------|:---------------------|
| **Finite Set** | Countable elements with $|A| \in \mathbb{N}$ | $A = \{1, 2, 3\} \implies |A| = 3$ |
| **Infinite Set** | Contains infinitely many elements | $\mathbb{N}, \mathbb{Z}, \mathbb{Q}, \mathbb{R}$ |
| **Empty / Null Set ($\emptyset$)** | Contains zero elements | $A = \{x \in \mathbb{R} \mid x^2 + 1 = 0\} = \emptyset$ |
| **Singleton Set** | Contains exactly one element | $A = \{5\} \implies |A| = 1$ |
| **Equal Sets ($A = B$)** | Contain exact same elements ($A \subseteq B \land B \subseteq A$) | $\{1, 2, 3\} = \{3, 1, 2\}$ |
| **Equivalent Sets** | Same cardinality ($|A| = |B|$) | $\{1, 2, 3\} \sim \{a, b, c\}$ |
| **Disjoint Sets** | Zero common elements ($A \cap B = \emptyset$) | $\{1, 2\} \cap \{3, 4\} = \emptyset$ |

> [!IMPORTANT]
> **Equal vs. Equivalent:** Equal sets are always equivalent ($|A| = |B|$), but equivalent sets are **NOT necessarily equal** (e.g. $\{1, 2, 3\}$ and $\{a, b, c\}$ both have size 3, but different elements).

---

### 2. Subsets, Supersets & Proper Subsets

**Formal Definition of Subset:**
Set $A$ is a subset of $B$ (written $A \subseteq B$) if every element of $A$ is also in $B$:
$$A \subseteq B \iff \forall x \, (x \in A \implies x \in B)$$

**Proper Subset ($A \subset B$):**
$A$ is a proper subset of $B$ if $A \subseteq B$ and $A \neq B$ (there is at least one element in $B$ not in $A$).

**Fundamental Subset Axioms & Theorems:**
1. **Empty Set Axiom:** The empty set is a subset of every set:
   $$\emptyset \subseteq A \quad \forall A$$
   *(Vacuous Truth: There are no elements in $\emptyset$ to violate $x \in \emptyset \implies x \in A$.)*
2. **Reflexivity:** Every set is a subset of itself:
   $$A \subseteq A \quad \forall A$$
3. **Transitivity:** If $A \subseteq B$ and $B \subseteq C$, then $A \subseteq C$.
4. **Set Equality Criterion:**
   $$A = B \iff (A \subseteq B \land B \subseteq A)$$
5. **Subset Equivalences:**
   $$A \subseteq B \iff A \cap B = A \iff A \cup B = B \iff A - B = \emptyset$$

---

### 3. Power Sets & Characteristic Vectors

The **Power Set** $P(A)$ (or $2^A$) is the set of all possible subsets of $A$, including $\emptyset$ and $A$ itself.

**Cardinality Formula:**
$$\text{If } |A| = n, \text{ then } |P(A)| = 2^n$$

\`\`\`text
Let A = {a, b, c}  (|A| = 3)
Subsets can be represented as binary characteristic vectors (0 = exclude, 1 = include):

Bitstring (a,b,c) | Subset
-------------------|----------------
      0 0 0        | ∅ (empty set)
      1 0 0        | {a}
      0 1 0        | {b}
      0 0 1        | {c}
      1 1 0        | {a, b}
      1 0 1        | {a, c}
      0 1 1        | {b, c}
      1 1 1        | {a, b, c} (A itself)

Total Subsets = 2³ = 8
\`\`\`

\`\`\`python
from itertools import chain, combinations

def generate_power_set(s):
    # Generates power set as list of frozensets
    s_list = list(s)
    return [
        set(combo) for r in range(len(s_list) + 1)
        for combo in combinations(s_list, r)
    ]

A = {'x', 'y', 'z'}
p_set = generate_power_set(A)
print(f"Power set size |P(A)| = 2^{len(A)} = {len(p_set)}")
for subset in p_set:
    print(f"  {subset if subset else '∅'}")
\`\`\`

> [!NOTE]
> **Power Set Traps in Exams:**
> - $P(\emptyset) = \{\emptyset\} \implies |P(\emptyset)| = 2^0 = 1$ (Not 0!).
> - $|P(P(\emptyset))| = 2^1 = 2 \implies P(P(\emptyset)) = \{\emptyset, \{\emptyset\}\}$.
> - $|P(P(A))| = 2^{2^n}$. For $|A| = 3$, $|P(P(A))| = 2^8 = 256$.

---

### 4. Venn Diagrams & Set Operations

Let Universal Set $U = \{1, 2, 3, 4, 5, 6, 7, 8, 9, 10\}$, $A = \{1, 2, 3, 4, 5\}$, and $B = \{4, 5, 6, 7, 8\}$.

\`\`\`text
               Universal Set U (1 to 10)
    +-----------------------------------------------+
    |    Set A                 Set B                |
    |  +-----------+     +-----------+              |
    |  |  Only A   | A∩B |  Only B   |              |
    |  |  {1,2,3}  |{4,5}|  {6,7,8}  |              |
    |  +-----------+     +-----------+              |
    |                                               |
    |            Neither: {9, 10}                   |
    +-----------------------------------------------+
\`\`\`

| Operation | Mathematical Definition | Set-Theoretic Result | Python Syntax |
|:----------|:------------------------|:---------------------|:--------------|
| **Union ($A \cup B$)** | $\{x \mid x \in A \lor x \in B\}$ | $\{1, 2, 3, 4, 5, 6, 7, 8\}$ | \`A \| B\` |
| **Intersection ($A \cap B$)** | $\{x \mid x \in A \land x \in B\}$ | $\{4, 5\}$ | \`A & B\` |
| **Difference ($A - B$)** | $\{x \mid x \in A \land x \notin B\}$ | $\{1, 2, 3\}$ | \`A - B\` |
| **Difference ($B - A$)** | $\{x \mid x \in B \land x \notin A\}$ | $\{6, 7, 8\}$ | \`B - A\` |
| **Symmetric Difference ($A \Delta B$)** | $(A - B) \cup (B - A) = (A \cup B) - (A \cap B)$ | $\{1, 2, 3, 6, 7, 8\}$ | \`A ^ B\` |
| **Complement ($A'$)** | $U - A = \{x \in U \mid x \notin A\}$ | $\{6, 7, 8, 9, 10\}$ | \`U - A\` |

\`\`\`python
U = set(range(1, 11))
A = {1, 2, 3, 4, 5}
B = {4, 5, 6, 7, 8}

print("A ∪ B:", A | B)
print("A ∩ B:", A & B)
print("A - B:", A - B)
print("A △ B:", A ^ B)
print("A':", U - A)
\`\`\`

---

### 5. Cardinality & Principle of Inclusion-Exclusion (PIE)

**Cardinality ($|A|$)** is the measure of the number of elements in set $A$.

#### 5.1 Two-Set Inclusion-Exclusion
$$|A \cup B| = |A| + |B| - |A \cap B|$$

**Why Subtract?** When adding $|A| + |B|$, elements in the overlap $A \cap B$ are counted twice. Subtracting $|A \cap B|$ once restores exact single counting.

#### 5.2 Three-Set Inclusion-Exclusion
$$|A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |A \cap C| - |B \cap C| + |A \cap B \cap C|$$

**Worked Example:**
In a batch of 100 CS students:
- 45 code in Python, 40 code in Java, 35 code in C++
- 20 code in Python & Java, 15 in Python & C++, 12 in Java & C++
- 8 code in all three languages

$$|P \cup J \cup C| = 45 + 40 + 35 - 20 - 15 - 12 + 8 = 81\text{ students code in at least one}$$
$$\text{Students coding in NONE} = 100 - 81 = 19\text{ students}$$

---

### 6. De Morgan's Laws & Set Algebra Identities (with Formal Proofs)

**De Morgan's Laws:**
1. $(A \cup B)' = A' \cap B'$ (Complement of union is intersection of complements)
2. $(A \cap B)' = A' \cup B'$ (Complement of intersection is union of complements)

#### Formal Element-Wise Proof of $(A \cup B)' = A' \cap B'$:
We prove mutual subset containment $LHS \subseteq RHS$ and $RHS \subseteq LHS$:

1. **Let $x \in (A \cup B)'$**:
   $$\iff x \notin (A \cup B)$$
   $$\iff \neg (x \in A \lor x \in B)$$
   $$\iff x \notin A \land x \notin B \quad (\text{by De Morgan's law in propositional logic})$$
   $$\iff x \in A' \land x \in B'$$
   $$\iff x \in (A' \cap B')$$
2. Therefore, $(A \cup B)' \subseteq A' \cap B'$ and $A' \cap B' \subseteq (A \cup B)'$, proving $(A \cup B)' = A' \cap B'$. $\blacksquare$

**Core Set Identities Summary:**

| Law Name | Identity 1 | Identity 2 |
|:---------|:-----------|:-----------|
| **Identity Laws** | $A \cup \emptyset = A$ | $A \cap U = A$ |
| **Domination Laws** | $A \cup U = U$ | $A \cap \emptyset = \emptyset$ |
| **Idempotent Laws** | $A \cup A = A$ | $A \cap A = A$ |
| **Double Complement** | $(A')' = A$ | — |
| **Commutative Laws** | $A \cup B = B \cup A$ | $A \cap B = B \cap A$ |
| **Associative Laws** | $(A \cup B) \cup C = A \cup (B \cup C)$ | $(A \cap B) \cap C = A \cap (B \cap C)$ |
| **Distributive Laws** | $A \cup (B \cap C) = (A \cup B) \cap (A \cup C)$ | $A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$ |
| **Absorption Laws** | $A \cup (A \cap B) = A$ | $A \cap (A \cup B) = A$ |
| **Complement Laws** | $A \cup A' = U$ | $A \cap A' = \emptyset$ |

---

### 7. Russell's Paradox & Foundations of Modern Set Theory

In the late 19th century, **Georg Cantor** created **Naive Set Theory**, assuming that *any* well-defined predicate $P(x)$ could define a valid set: $S = \{x \mid P(x)\}$.

In 1901, **Bertrand Russell** discovered a fatal contradiction in unrestricted set comprehension:

> **Russell's Paradox:** Consider the set $R$ of all sets that are not members of themselves:
> $$R = \{x \mid x \notin x\}$$
> **Question:** Is $R \in R$?
> - **Case 1:** If $R \in R$, then by definition of $R$, $R$ must NOT contain itself ($R \notin R$) $\implies$ Contradiction!
> - **Case 2:** If $R \notin R$, then by definition of $R$, $R$ MUST contain itself ($R \in R$) $\implies$ Contradiction!
>
> $$R \in R \iff R \notin R$$

**The Barber Paradox (Analogy):**
A barber in a town shaves all men, and *only* those men, who do not shave themselves. Who shaves the barber? If he shaves himself, he shouldn't. If he doesn't shave himself, he must.

> [!IMPORTANT]
> **Resolution in Computer Science & Math:**
> Russell's paradox proved that Naive Set Theory was inconsistent. This led to **Zermelo-Fraenkel Set Theory with Choice (ZFC)** and Type Theory, ensuring collections cannot self-reference without strict universe hierarchical stratification.

---

### 8. Computer Representation of Sets (Bit Vectors & Bitwise Logic)

In modern computer architecture, sets over a finite universal set $U = \{u_0, u_1, \dots, u_{n-1}\}$ are represented with extreme efficiency as **Bit Vectors (Bitmasks)**.

Let $U = \{0, 1, 2, 3, 4, 5, 6, 7\}$ (ordered index 0 to 7):
- $A = \{1, 3, 4, 7\} \implies \text{Bitmask: } 10011010_2 = 154_{10}$
- $B = \{3, 4, 5\} \implies \text{Bitmask: } 00111000_2 = 56_{10}$

\`\`\`text
Set Operation        | Bitwise Operator | Bitwise Computation         | Set Result
---------------------|------------------|-----------------------------|---------------
Union (A ∪ B)        | OR (|)           | 10011010 | 00111000 = 10111010 | {1, 3, 4, 5, 7}
Intersection (A ∩ B) | AND (&)          | 10011010 & 00111000 = 00011000 | {3, 4}
Difference (A - B)   | AND NOT (& ~)    | 10011010 & ~00111000 = 10000010| {1, 7}
Symm. Diff (A △ B)   | XOR (^)          | 10011010 ^ 00111000 = 10100010 | {1, 5, 7}
Complement (A')      | NOT (~)          | ~10011010 & 11111111 = 01100101| {0, 2, 5, 6}
\`\`\`

\`\`\`python
class BitSet:
    def __init__(self, elements, universe):
        self.universe = list(universe)
        self.mask = 0
        for x in elements:
            if x in self.universe:
                self.mask |= (1 << self.universe.index(x))
                
    def to_set(self):
        return {self.universe[i] for i in range(len(self.universe)) if (self.mask & (1 << i))}

U = ['a', 'b', 'c', 'd', 'e']
A = BitSet(['a', 'c', 'd'], U)
B = BitSet(['c', 'd', 'e'], U)

union_mask = A.mask | B.mask
inter_mask = A.mask & B.mask
diff_mask = A.mask & ~B.mask

print("Bitwise Union:", {U[i] for i in range(len(U)) if union_mask & (1 << i)})
print("Bitwise Intersect:", {U[i] for i in range(len(U)) if inter_mask & (1 << i)})
print("Bitwise Difference:", {U[i] for i in range(len(U)) if diff_mask & (1 << i)})
\`\`\`

---

### 9. Permutations & Combinatorial Arrangements

A **Permutation** is an ordered arrangement of $r$ elements from $n$ distinct elements.

$$\text{Formula: } P(n, r) = \frac{n!}{(n-r)!}$$

#### 9.1 Permutations with Repetition & Identical Elements
- **Repetition Allowed**: $n^r$ (e.g. 4-digit PIN $= 10^4 = 10,000$).
- **Multiset Permutations (Identical Elements)**:
  $$\text{Arrangements of MISSISSIPPI (11 letters: 1 M, 4 I, 4 S, 2 P)} = \frac{11!}{1! \times 4! \times 4! \times 2!} = 34,650$$

#### 9.2 Grouping & Complementary Methods
- **Must Be Together (Grouping Method)**: Treat the constrained group as 1 single block, arrange the total blocks, then multiply by internal arrangements.
- **Never Together (Complementary Method)**:
  $$\text{Never Together} = \text{Total Unrestricted} - \text{Always Together}$$
- **Circular Permutations**: Seating $n$ people around a circular table $= (n-1)!$ (fixing 1 person eliminates rotational symmetry).

---

### 10. Combinations & Constrained Selections

A **Combination** is an unordered selection of $r$ elements from $n$ distinct elements.

$$\text{Formula: } C(n, r) = \binom{n}{r} = \frac{n!}{r!(n-r)!}$$
$$\text{Fundamental Connection: } P(n, r) = r! \times C(n, r)$$

#### 10.1 Key Properties & Exam Identities
1. **Symmetry**: $\binom{n}{r} = \binom{n}{n-r}$ (e.g. $\binom{10}{8} = \binom{10}{2} = 45$).
2. **Equivalence Property**: If $\binom{n}{x} = \binom{n}{y}$, then either $x = y$ or $x + y = n$.
3. **Diagonals of an $n$-gon**: Total lines joining vertices minus $n$ sides:
   $$\text{Diagonals} = \binom{n}{2} - n = \frac{n(n-3)}{2}$$
4. **Gap Method (No Two Adjacent)**: Place $n$ unrestricted items first (forming $n+1$ gaps), then select gaps for the restricted items.

---

### 11. Pascal's Triangle & Binomial Coefficient Identities

Pascal's Triangle visually computes combinatorial coefficients $\binom{n}{r}$:

\`\`\`text
Row 0:                1                     -- C(0,0) = 1
Row 1:              1   1                   -- C(1,0)=1, C(1,1)=1
Row 2:            1   2   1                 -- C(2,0)=1, C(2,1)=2, C(2,2)=1
Row 3:          1   3   3   1               -- C(3,0)=1, C(3,1)=3, C(3,2)=3, C(3,3)=1
Row 4:        1   4   6   4   1             -- C(4,0)=1, C(4,1)=4, C(4,2)=6, ...
Row 5:      1   5  10  10   5   1           -- C(5,0)=1, C(5,1)=5, C(5,2)=10, ...
\`\`\`

**Pascal's Identity:**
$$\binom{n}{r} = \binom{n-1}{r-1} + \binom{n-1}{r}$$

**Row Sum Theorem:**
$$\sum_{k=0}^n \binom{n}{k} = \binom{n}{0} + \binom{n}{1} + \dots + \binom{n}{n} = 2^n = |P(A)|$$

---

### 12. Applications in Computer Science & Databases

1. **Relational Databases & SQL**:
   - \`UNION\` $\implies A \cup B$ (deduplicated result set)
   - \`INTERSECT\` $\implies A \cap B$ (common rows)
   - \`EXCEPT\` / \`MINUS\` $\implies A - B$ (rows unique to first query)
2. **Algorithm Analysis & Search Trees**:
   - State space search of all subsets requires $O(2^n)$ time without pruning.
3. **Information Theory & Cryptographic Key Spaces**:
   - Total possible $k$-subsets and bitstrings dictate password entropy and brute-force resistance.

---

## TL;DR — Quick Recall Reference

| Concept | Mathematical Formula | Core Intuition |
|:--------|:---------------------|:---------------|
| **Union** | $A \cup B = \{x \mid x \in A \lor x \in B\}$ | Combine all unique elements |
| **Intersection** | $A \cap B = \{x \mid x \in A \land x \in B\}$ | Shared elements only |
| **Difference** | $A - B = \{x \mid x \in A \land x \notin B\}$ | Elements in $A$ outside $B$ |
| **Symmetric Difference** | $A \Delta B = (A \cup B) - (A \cap B)$ | In exactly one set |
| **De Morgan's Laws** | $(A \cup B)' = A' \cap B'$, $(A \cap B)' = A' \cup B'$ | Complement flips $\cup \leftrightarrow \cap$ |
| **Power Set Size** | $|P(A)| = 2^n$ | Binary choices (include/exclude) |
| **Inclusion-Exclusion** | $|A \cup B| = |A| + |B| - |A \cap B|$ | Add singles, subtract overlaps |
| **Russell's Paradox** | $R = \{x \mid x \notin x\} \implies R \in R \iff R \notin R$ | Naive set comprehension flaw |
| **Permutation** | $P(n, r) = \frac{n!}{(n-r)!}$ | Order matters |
| **Combination** | $C(n, r) = \frac{n!}{r!(n-r)!}$ | Order does not matter |

---

## Additional Resources

**Interactive & Visual:**
- [Venn Diagram & Set Operations Interactive Sandbox](https://www.mathsisfun.com/sets/venn-diagrams.html)
- [Pascal's Triangle Explorer](https://www.mathsisfun.com/pascals-triangle.html)

**Academic References:**
- *Discrete Mathematics and Its Applications* by Kenneth H. Rosen
- *NPTEL Discrete Mathematics* by Prof. Sudarshan Iyengar (IIT Ropar)
- *Naive Set Theory* by Paul Halmos
`,
  subModules: [],
  practiceQuiz: [
    {
      id: "set-q1",
      question:
        "If Set A has 4 elements, how many subsets does the Power Set P(A) have?",
      options: ["4", "8", "15", "16"],
      correctAnswer: 3,
      explanation:
        "Formula: |P(A)| = 2^n where n = number of elements.\n\nFor n = 4: |P(A)| = 2^4 = 16 subsets (including ∅ and A itself).",
      difficulty: "easy",
    },
    {
      id: "set-q2",
      question:
        "In a group of 60 students, 25 play Cricket, 30 play Football, and 24 play neither. How many play BOTH?",
      options: ["10", "15", "19", "20"],
      correctAnswer: 2,
      explanation:
        "Students playing at least one sport: |C ∪ F| = 60 - 24 = 36.\n\nBy Inclusion-Exclusion: 36 = 25 + 30 - |C ∩ F| ⟹ |C ∩ F| = 55 - 36 = 19.",
      difficulty: "medium",
    },
    {
      id: "set-q3",
      question:
        "Which of the following represents the symmetric difference (A △ B)?",
      options: [
        "(A - B) ∩ (B - A)",
        "(A ∪ B) - (A ∩ B)",
        "(A ∩ B) - (A ∪ B)",
        "A' ∩ B'",
      ],
      correctAnswer: 1,
      explanation:
        "Symmetric difference is defined as elements in A OR B but not both: A △ B = (A ∪ B) - (A ∩ B) = (A - B) ∪ (B - A).",
      difficulty: "medium",
    },
    {
      id: "set-q4",
      question:
        "If A = {1, 2} and B = {a, b, c}, what is the cardinality of the Cartesian Product A × B?",
      options: ["5", "6", "8", "9"],
      correctAnswer: 1,
      explanation: "|A × B| = |A| × |B| = 2 × 3 = 6 ordered pairs.",
      difficulty: "easy",
    },
    {
      id: "set-q5",
      question: "According to De Morgan's Laws, what is (A ∪ B)' equal to?",
      options: ["A' ∪ B'", "A' ∩ B'", "A ∩ B", "A' ∪ B"],
      correctAnswer: 1,
      explanation:
        "De Morgan's first law states that the complement of a union is the intersection of complements: (A ∪ B)' = A' ∩ B'.",
      difficulty: "easy",
    },
    {
      id: "set-q6",
      question: "How many ways can 5 people be arranged in a line?",
      options: ["25", "60", "120", "125"],
      correctAnswer: 2,
      explanation:
        "Arranging n distinct objects in a linear sequence is n! = 5! = 5 × 4 × 3 × 2 × 1 = 120.",
      difficulty: "easy",
    },
    {
      id: "set-q7",
      question:
        "From 8 students, how many ways can we select a committee of 3?",
      options: ["24", "56", "336", "512"],
      correctAnswer: 1,
      explanation:
        "Since order in a committee does not matter, this is a combination: C(8, 3) = 8! / (3! × 5!) = (8 × 7 × 6) / 6 = 56.",
      difficulty: "medium",
    },
    {
      id: "set-q8",
      question: "A relation R on set A is called reflexive if:",
      options: [
        "(a,b) ∈ R implies (b,a) ∈ R",
        "(a,a) ∈ R for all a ∈ A",
        "(a,b) ∈ R and (b,c) ∈ R implies (a,c) ∈ R",
        "R = R⁻¹",
      ],
      correctAnswer: 1,
      explanation:
        "A relation R is reflexive if every element in A relates to itself: (a, a) ∈ R for all a ∈ A.",
      difficulty: "medium",
    },
    {
      id: "set-q9",
      question:
        "If |A| = 3 and |B| = 4, how many distinct functions f: A → B are possible?",
      options: ["7", "12", "64", "81"],
      correctAnswer: 2,
      explanation:
        "Each of the 3 domain elements in A has 4 independent choices in codomain B: Total functions = |B|^|A| = 4^3 = 64.",
      difficulty: "medium",
    },
    {
      id: "set-q10",
      question:
        "If there are 4 routes from A to B and 3 routes from B to C, how many routes are there from A to C via B?",
      options: ["7", "12", "1", "24"],
      correctAnswer: 1,
      explanation:
        "By the Rule of Product (Multiplication Principle): 4 × 3 = 12 total routes.",
      difficulty: "easy",
    },
    {
      id: "set-q11",
      question:
        "In a survey of 600 students, 150 take tea and 225 take coffee. If 100 take both, how many take neither?",
      options: ["275", "325", "375", "425"],
      correctAnswer: 1,
      explanation:
        "|T ∪ C| = 150 + 225 - 100 = 275. Neither = Total - |T ∪ C| = 600 - 275 = 325.",
      difficulty: "medium",
    },
    {
      id: "set-q12",
      question:
        "How many distinct permutations can be made from the letters of the word MISSISSIPPI?",
      options: ["11!", "34650", "39916800", "7920"],
      correctAnswer: 1,
      explanation:
        "11 letters with repeats (1 M, 4 I, 4 S, 2 P): 11! / (4! × 4! × 2!) = 39,916,800 / 1152 = 34,650.",
      difficulty: "medium",
    },
    {
      id: "set-q13",
      question:
        "In how many ways can 6 people be seated around a circular table?",
      options: ["720", "120", "360", "60"],
      correctAnswer: 1,
      explanation:
        "Circular permutation formula: (n - 1)! = (6 - 1)! = 5! = 120.",
      difficulty: "easy",
    },
    {
      id: "set-q14",
      question: "How many diagonals does a decagon (10-sided polygon) have?",
      options: ["20", "35", "45", "25"],
      correctAnswer: 1,
      explanation: "Diagonals = C(n, 2) - n = C(10, 2) - 10 = 45 - 10 = 35.",
      difficulty: "medium",
    },
    {
      id: "set-q15",
      question: "If ⁿC₇ = ⁿC₄, what is the value of n?",
      options: ["3", "7", "11", "28"],
      correctAnswer: 2,
      explanation:
        "By combination symmetry: C(n, x) = C(n, y) ⟹ x + y = n. Therefore, n = 7 + 4 = 11.",
      difficulty: "easy",
    },
    {
      id: "set-q16",
      question:
        "In how many ways can a cricket team of 11 be chosen from 17 players with exactly 2 bowlers out of 5 available bowlers?",
      options: ["1320", "2200", "4400", "3300"],
      correctAnswer: 1,
      explanation:
        "Choose 2 bowlers from 5 (C(5, 2) = 10) and 9 non-bowlers from 12 (C(12, 9) = 220). Total = 10 × 220 = 2200.",
      difficulty: "medium",
    },
    {
      id: "set-q17",
      question:
        "How many words of 3 vowels and 2 consonants can be formed from INVOLUTE?",
      options: ["120", "2880", "720", "1440"],
      correctAnswer: 1,
      explanation:
        "INVOLUTE has 4 vowels (I, O, U, E) and 4 consonants (N, V, L, T). Select: C(4, 3) × C(4, 2) = 4 × 6 = 24. Arrange: 24 × 5! = 24 × 120 = 2880.",
      difficulty: "hard",
    },
    {
      id: "set-q18",
      question:
        "The word SACHIN is arranged alphabetically in a dictionary. What is its rank?",
      options: ["600", "601", "602", "720"],
      correctAnswer: 1,
      explanation:
        "Alphabetical letters: A, C, H, I, N, S. Words starting with A, C, H, I, N = 5 × 5! = 600 words. SACHIN is the first word starting with S, so rank = 600 + 1 = 601.",
      difficulty: "hard",
    },
    {
      id: "set-q19",
      question:
        "What is the cardinality of the power set of the power set of the empty set, |P(P(∅))|?",
      options: ["0", "1", "2", "4"],
      correctAnswer: 2,
      explanation:
        "|∅| = 0 ⟹ |P(∅)| = 2^0 = 1 ⟹ |P(P(∅))| = 2^1 = 2. Specifically, P(P(∅)) = {∅, {∅}}.",
      difficulty: "medium",
    },
    {
      id: "set-q20",
      question:
        "What paradox exposed the inconsistency of Naive Set Theory by considering the set R = {x | x ∉ x}?",
      options: [
        "Zeno's Paradox",
        "Russell's Paradox",
        "Birthday Paradox",
        "Fermi Paradox",
      ],
      correctAnswer: 1,
      explanation:
        "Bertrand Russell discovered Russell's Paradox in 1901 by showing that R ∈ R ⟺ R ∉ R, proving that unrestricted set comprehension is mathematically contradictory.",
      difficulty: "easy",
    },
    {
      id: "set-q21",
      question:
        "In computer memory, if Set A and Set B are stored as bitmasks, which bitwise CPU operation computes the symmetric difference A △ B?",
      options: [
        "Bitwise AND (&)",
        "Bitwise OR (|)",
        "Bitwise XOR (^)",
        "Bitwise NOT (~)",
      ],
      correctAnswer: 2,
      explanation:
        "Bitwise XOR (^) returns 1 if and only if exactly one of the bits is 1, matching the exact definition of Symmetric Difference (elements in A OR B, but not both).",
      difficulty: "easy",
    },
    {
      id: "set-q22",
      question:
        "Which of the following is equivalent to the set expression A ∩ (A ∪ B)?",
      options: ["A", "B", "A ∪ B", "∅"],
      correctAnswer: 0,
      explanation: "By the Absorption Law of set algebra: A ∩ (A ∪ B) = A.",
      difficulty: "easy",
    },
    {
      id: "set-q23",
      question:
        "If A and B are subsets of universal set U, which of the following is equal to A - B?",
      options: ["A ∩ B'", "A' ∩ B", "A ∪ B'", "(A ∩ B)'"],
      correctAnswer: 0,
      explanation:
        "A - B is defined as all elements in A and not in B, which is precisely A ∩ B'.",
      difficulty: "medium",
    },
    {
      id: "set-q24",
      question:
        "Let A and B be finite sets. If |A| = 10, |B| = 15, what is the MAXIMUM possible value of |A ∪ B| and the MINIMUM possible value of |A ∩ B|?",
      options: [
        "Max union = 25, Min intersection = 0",
        "Max union = 15, Min intersection = 10",
        "Max union = 25, Min intersection = 10",
        "Max union = 15, Min intersection = 0",
      ],
      correctAnswer: 0,
      explanation:
        "When A and B are disjoint (A ∩ B = ∅), the intersection is minimized at 0, and the union is maximized at |A| + |B| = 10 + 15 = 25.",
      difficulty: "medium",
    },
    {
      id: "set-q25",
      question:
        "What is the sum of the coefficients in Row n of Pascal's Triangle, Σ(k=0 to n) C(n, k)?",
      options: ["n!", "2^n", "n(n+1)/2", "2^(n-1)"],
      correctAnswer: 1,
      explanation:
        "By the Binomial Theorem, (1 + 1)^n = Σ C(n, k) 1^k 1^(n-k) = 2^n, which also equals the cardinality of the power set of an n-element set.",
      difficulty: "easy",
    },
  ],
};
