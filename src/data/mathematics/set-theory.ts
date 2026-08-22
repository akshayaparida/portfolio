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
| 1 | **Sets & Notation** | Read and write roster and set-builder notation (∈, ∉, ⊆, ⊂, ∅) |
| 2 | **Subsets & Power Sets** | Compute and construct P(A), proving cardinality 2ⁿ via binary characteristic vectors |
| 3 | **Set Operations & Venn Diagrams** | Compute Union, Intersection, Difference, Symmetric Difference, and Complements |
| 4 | **Cardinality & Inclusion-Exclusion** | Apply 2-set, 3-set, and generalized n-set Principle of Inclusion-Exclusion (PIE) |
| 5 | **Set Identities & De Morgan's Laws** | Formally prove set equivalences using the Double Inclusion method (A ⊆ B ∧ B ⊆ A) |
| 6 | **Russell's Paradox & Axiomatic Sets** | Understand why Naive Set Theory failed and how modern axioms resolve self-referential paradoxes |
| 7 | **Computer Representation of Sets** | Implement set operations using Bit Vectors and bitwise CPU operations (\`&\`, \`\|\`, \`^\`, \`~\`) |
| 8 | **Permutations & Combinations** | Master permutations (n!, circular, multiset) and combinations (C(n, r), gap method, polygons) |
| 9 | **Pascal's Triangle & Binomials** | Leverage Pascal's identity C(n, r) = C(n-1, r-1) + C(n-1, r) and symmetry properties |
| 10 | **CS Applications & Database Queries** | Map relational algebra and SQL (\`UNION\`, \`INTERSECT\`, \`EXCEPT\`) to set theory |

---

## Math Notation & Pronunciation Guide

**Set Notation:**
- ∈ — pronounced "element of" or "in" — membership (x ∈ A means x is in set A)
- ∉ — pronounced "not element of" — non-membership
- ⊆ — pronounced "subset of or equal to" — every element of A is in B
- ⊂ — pronounced "proper subset of" — A ⊆ B and A ≠ B
- ∪ — pronounced "union" — elements in A OR B
- ∩ — pronounced "intersection" — elements in A AND B
- − or - — pronounced "set difference" or "minus" — elements in A but NOT in B
- △ — pronounced "symmetric difference" — elements in A OR B, but NOT both
- ∅ or \{\} — pronounced "empty set" or "null set"
- |A| or n(A) — pronounced "cardinality of A" — total number of elements in A
- P(A) — pronounced "power set of A" — set of all subsets of A
- A × B — pronounced "Cartesian product" — set of all ordered pairs (a, b)

**Combinatorics:**
- n! — pronounced "n factorial" — n × (n-1) × ... × 1
- P(n, r) or ^nP_r — pronounced "n permute r" — ordered arrangements
- C(n, r) or \binom{n}{r} or ^nC_r — pronounced "n choose r" — unordered selections

---

## Key Concepts

### 1. Sets — Fundamental Definitions & Notation

**What is a Set?**
A set is an **unordered collection of distinct, well-defined objects** (called elements or members).

**Two Standard Representations:**
1. **Roster / Tabular Form**: Explicitly listing all elements enclosed in curly braces:
   
A = \{2, 4, 6, 8, 10\}

2. **Set-Builder Form**: Describing the characteristic property satisfied by all elements:
   
A = \{x ∈ ℕ \mid x  is even and } x ≤ 10\}


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
- ℕ (Natural Numbers): \{0, 1, 2, 3, ...\} or \{1, 2, 3, ...\}
- ℤ (Integers): \{..., -2, -1, 0, 1, 2, ...\}
- ℚ (Rational Numbers): \{p/q \mid p, q ∈ ℤ, q ≠ 0\}
- ℝ (Real Numbers): All points on the continuous number line
- ℂ (Complex Numbers): \{a + bi \mid a, b ∈ ℝ, i = \sqrt{-1}\}
- U (Universal Set): The overarching context containing all objects under consideration

**Classification of Sets:**

| Type | Definition | Mathematical Example |
|:-----|:-----------|:---------------------|
| **Finite Set** | Countable elements with |A| ∈ ℕ | A = \{1, 2, 3\} ⟹ |A| = 3 |
| **Infinite Set** | Contains infinitely many elements | ℕ, ℤ, ℚ, ℝ |
| **Empty / Null Set (∅)** | Contains zero elements | A = \{x ∈ ℝ \mid x^2 + 1 = 0\} = ∅ |
| **Singleton Set** | Contains exactly one element | A = \{5\} ⟹ |A| = 1 |
| **Equal Sets (A = B)** | Contain exact same elements (A ⊆ B ∧ B ⊆ A) | \{1, 2, 3\} = \{3, 1, 2\} |
| **Equivalent Sets** | Same cardinality (|A| = |B|) | \{1, 2, 3\} \sim \{a, b, c\} |
| **Disjoint Sets** | Zero common elements (A ∩ B = ∅) | \{1, 2\} ∩ \{3, 4\} = ∅ |

> [!IMPORTANT]
> **Equal vs. Equivalent:** Equal sets are always equivalent (|A| = |B|), but equivalent sets are **NOT necessarily equal** (e.g. \{1, 2, 3\} and \{a, b, c\} both have size 3, but different elements).

---

### 2. Subsets, Supersets & Proper Subsets

**Formal Definition of Subset:**
Set A is a subset of B (written A ⊆ B) if every element of A is also in B:

A ⊆ B ⟺ ∀ x \, (x ∈ A ⟹ x ∈ B)


**Proper Subset (A ⊂ B):**
A is a proper subset of B if A ⊆ B and A ≠ B (there is at least one element in B not in A).

**Fundamental Subset Axioms & Theorems:**
1. **Empty Set Axiom:** The empty set is a subset of every set:
   
∅ ⊆ A   ∀ A

   *(Vacuous Truth: There are no elements in ∅ to violate x ∈ ∅ ⟹ x ∈ A.)*
2. **Reflexivity:** Every set is a subset of itself:
   
A ⊆ A   ∀ A

3. **Transitivity:** If A ⊆ B and B ⊆ C, then A ⊆ C.
4. **Set Equality Criterion:**
   
A = B ⟺ (A ⊆ B ∧ B ⊆ A)

5. **Subset Equivalences:**
   
A ⊆ B ⟺ A ∩ B = A ⟺ A ∪ B = B ⟺ A - B = ∅


---

### 3. Power Sets & Characteristic Vectors

The **Power Set** P(A) (or 2^A) is the set of all possible subsets of A, including ∅ and A itself.

**Cardinality Formula:**

If } |A| = n,  then } |P(A)| = 2^n


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
> - P(∅) = \{∅\} ⟹ |P(∅)| = 2^0 = 1 (Not 0!).
> - |P(P(∅))| = 2^1 = 2 ⟹ P(P(∅)) = \{∅, \{∅\}\}.
> - |P(P(A))| = 2^{2^n}. For |A| = 3, |P(P(A))| = 2^8 = 256.

---

### 4. Venn Diagrams & Set Operations

Let Universal Set U = \{1, 2, 3, 4, 5, 6, 7, 8, 9, 10\}, A = \{1, 2, 3, 4, 5\}, and B = \{4, 5, 6, 7, 8\}.

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
| **Union (A ∪ B)** | \{x \mid x ∈ A ∨ x ∈ B\} | \{1, 2, 3, 4, 5, 6, 7, 8\} | \`A \| B\` |
| **Intersection (A ∩ B)** | \{x \mid x ∈ A ∧ x ∈ B\} | \{4, 5\} | \`A & B\` |
| **Difference (A - B)** | \{x \mid x ∈ A ∧ x ∉ B\} | \{1, 2, 3\} | \`A - B\` |
| **Difference (B - A)** | \{x \mid x ∈ B ∧ x ∉ A\} | \{6, 7, 8\} | \`B - A\` |
| **Symmetric Difference (A △ B)** | (A - B) ∪ (B - A) = (A ∪ B) - (A ∩ B) | \{1, 2, 3, 6, 7, 8\} | \`A ^ B\` |
| **Complement (A')** | U - A = \{x ∈ U \mid x ∉ A\} | \{6, 7, 8, 9, 10\} | \`U - A\` |

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

**Cardinality (|A|)** is the measure of the number of elements in set A.

#### 5.1 Two-Set Inclusion-Exclusion

|A ∪ B| = |A| + |B| - |A ∩ B|


**Why Subtract?** When adding |A| + |B|, elements in the overlap A ∩ B are counted twice. Subtracting |A ∩ B| once restores exact single counting.

#### 5.2 Three-Set Inclusion-Exclusion

|A ∪ B ∪ C| = |A| + |B| + |C| - |A ∩ B| - |A ∩ C| - |B ∩ C| + |A ∩ B ∩ C|


**Worked Example:**
In a batch of 100 CS students:
- 45 code in Python, 40 code in Java, 35 code in C++
- 20 code in Python & Java, 15 in Python & C++, 12 in Java & C++
- 8 code in all three languages


|P ∪ J ∪ C| = 45 + 40 + 35 - 20 - 15 - 12 + 8 = 81 students code in at least one}


Students coding in NONE} = 100 - 81 = 19 students}


---

### 6. De Morgan's Laws & Set Algebra Identities (with Formal Proofs)

**De Morgan's Laws:**
1. (A ∪ B)' = A' ∩ B' (Complement of union is intersection of complements)
2. (A ∩ B)' = A' ∪ B' (Complement of intersection is union of complements)

#### Formal Element-Wise Proof of (A ∪ B)' = A' ∩ B':
We prove mutual subset containment LHS ⊆ RHS and RHS ⊆ LHS:

1. **Let x ∈ (A ∪ B)'**:
   
⟺ x ∉ (A ∪ B)

   
⟺ ¬ (x ∈ A ∨ x ∈ B)

   
⟺ x ∉ A ∧ x ∉ B   (by De Morgan's law in propositional logic})

   
⟺ x ∈ A' ∧ x ∈ B'

   
⟺ x ∈ (A' ∩ B')

2. Therefore, (A ∪ B)' ⊆ A' ∩ B' and A' ∩ B' ⊆ (A ∪ B)', proving (A ∪ B)' = A' ∩ B'. ∎

**Core Set Identities Summary:**

| Law Name | Identity 1 | Identity 2 |
|:---------|:-----------|:-----------|
| **Identity Laws** | A ∪ ∅ = A | A ∩ U = A |
| **Domination Laws** | A ∪ U = U | A ∩ ∅ = ∅ |
| **Idempotent Laws** | A ∪ A = A | A ∩ A = A |
| **Double Complement** | (A')' = A | — |
| **Commutative Laws** | A ∪ B = B ∪ A | A ∩ B = B ∩ A |
| **Associative Laws** | (A ∪ B) ∪ C = A ∪ (B ∪ C) | (A ∩ B) ∩ C = A ∩ (B ∩ C) |
| **Distributive Laws** | A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C) | A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C) |
| **Absorption Laws** | A ∪ (A ∩ B) = A | A ∩ (A ∪ B) = A |
| **Complement Laws** | A ∪ A' = U | A ∩ A' = ∅ |

---

### 7. Russell's Paradox & Foundations of Modern Set Theory

In the late 19th century, **Georg Cantor** created **Naive Set Theory**, assuming that *any* well-defined predicate P(x) could define a valid set: S = \{x \mid P(x)\}.

In 1901, **Bertrand Russell** discovered a fatal contradiction in unrestricted set comprehension:

> **Russell's Paradox:** Consider the set R of all sets that are not members of themselves:
> 
R = \{x \mid x ∉ x\}

> **Question:** Is R ∈ R?
> - **Case 1:** If R ∈ R, then by definition of R, R must NOT contain itself (R ∉ R) ⟹ Contradiction!
> - **Case 2:** If R ∉ R, then by definition of R, R MUST contain itself (R ∈ R) ⟹ Contradiction!
>
> 
R ∈ R ⟺ R ∉ R


**The Barber Paradox (Analogy):**
A barber in a town shaves all men, and *only* those men, who do not shave themselves. Who shaves the barber? If he shaves himself, he shouldn't. If he doesn't shave himself, he must.

> [!IMPORTANT]
> **Resolution in Computer Science & Math:**
> Russell's paradox proved that Naive Set Theory was inconsistent. This led to **Zermelo-Fraenkel Set Theory with Choice (ZFC)** and Type Theory, ensuring collections cannot self-reference without strict universe hierarchical stratification.

---

### 8. Computer Representation of Sets (Bit Vectors & Bitwise Logic)

In modern computer architecture, sets over a finite universal set U = \{u_0, u_1, ..., u_{n-1}\} are represented with extreme efficiency as **Bit Vectors (Bitmasks)**.

Let U = \{0, 1, 2, 3, 4, 5, 6, 7\} (ordered index 0 to 7):
- A = \{1, 3, 4, 7\} ⟹ Bitmask: } 10011010_2 = 154_{10}
- B = \{3, 4, 5\} ⟹ Bitmask: } 00111000_2 = 56_{10}

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

A **Permutation** is an ordered arrangement of r elements from n distinct elements.


Formula: } P(n, r) = \frac{n!}{(n-r)!}


#### 9.1 Permutations with Repetition & Identical Elements
- **Repetition Allowed**: n^r (e.g. 4-digit PIN = 10^4 = 10,000).
- **Multiset Permutations (Identical Elements)**:
  
Arrangements of MISSISSIPPI (11 letters: 1 M, 4 I, 4 S, 2 P)} = \frac{11!}{1! × 4! × 4! × 2!} = 34,650


#### 9.2 Grouping & Complementary Methods
- **Must Be Together (Grouping Method)**: Treat the constrained group as 1 single block, arrange the total blocks, then multiply by internal arrangements.
- **Never Together (Complementary Method)**:
  
Never Together} = Total Unrestricted} - Always Together}

- **Circular Permutations**: Seating n people around a circular table = (n-1)! (fixing 1 person eliminates rotational symmetry).

---

### 10. Combinations & Constrained Selections

A **Combination** is an unordered selection of r elements from n distinct elements.


Formula: } C(n, r) = \binom{n}{r} = \frac{n!}{r!(n-r)!}


Fundamental Connection: } P(n, r) = r! × C(n, r)


#### 10.1 Key Properties & Exam Identities
1. **Symmetry**: \binom{n}{r} = \binom{n}{n-r} (e.g. \binom{10}{8} = \binom{10}{2} = 45).
2. **Equivalence Property**: If \binom{n}{x} = \binom{n}{y}, then either x = y or x + y = n.
3. **Diagonals of an n-gon**: Total lines joining vertices minus n sides:
   
Diagonals} = \binom{n}{2} - n = \frac{n(n-3)}{2}

4. **Gap Method (No Two Adjacent)**: Place n unrestricted items first (forming n+1 gaps), then select gaps for the restricted items.

---

### 11. Pascal's Triangle & Binomial Coefficient Identities

Pascal's Triangle visually computes combinatorial coefficients \binom{n}{r}:

\`\`\`text
Row 0:                1                     -- C(0,0) = 1
Row 1:              1   1                   -- C(1,0)=1, C(1,1)=1
Row 2:            1   2   1                 -- C(2,0)=1, C(2,1)=2, C(2,2)=1
Row 3:          1   3   3   1               -- C(3,0)=1, C(3,1)=3, C(3,2)=3, C(3,3)=1
Row 4:        1   4   6   4   1             -- C(4,0)=1, C(4,1)=4, C(4,2)=6, ...
Row 5:      1   5  10  10   5   1           -- C(5,0)=1, C(5,1)=5, C(5,2)=10, ...
\`\`\`

**Pascal's Identity:**

\binom{n}{r} = \binom{n-1}{r-1} + \binom{n-1}{r}


**Row Sum Theorem:**

\sum_{k=0}^n \binom{n}{k} = \binom{n}{0} + \binom{n}{1} + ... + \binom{n}{n} = 2^n = |P(A)|


---

### 12. Applications in Computer Science & Databases

1. **Relational Databases & SQL**:
   - \`UNION\` ⟹ A ∪ B (deduplicated result set)
   - \`INTERSECT\` ⟹ A ∩ B (common rows)
   - \`EXCEPT\` / \`MINUS\` ⟹ A - B (rows unique to first query)
2. **Algorithm Analysis & Search Trees**:
   - State space search of all subsets requires O(2^n) time without pruning.
3. **Information Theory & Cryptographic Key Spaces**:
   - Total possible k-subsets and bitstrings dictate password entropy and brute-force resistance.

---

## TL;DR — Quick Recall Reference

| Concept | Mathematical Formula | Core Intuition |
|:--------|:---------------------|:---------------|
| **Union** | A ∪ B = \{x \mid x ∈ A ∨ x ∈ B\} | Combine all unique elements |
| **Intersection** | A ∩ B = \{x \mid x ∈ A ∧ x ∈ B\} | Shared elements only |
| **Difference** | A - B = \{x \mid x ∈ A ∧ x ∉ B\} | Elements in A outside B |
| **Symmetric Difference** | A △ B = (A ∪ B) - (A ∩ B) | In exactly one set |
| **De Morgan's Laws** | (A ∪ B)' = A' ∩ B', (A ∩ B)' = A' ∪ B' | Complement flips ∪ ≤ftrightarrow ∩ |
| **Power Set Size** | |P(A)| = 2^n | Binary choices (include/exclude) |
| **Inclusion-Exclusion** | |A ∪ B| = |A| + |B| - |A ∩ B| | Add singles, subtract overlaps |
| **Russell's Paradox** | R = \{x \mid x ∉ x\} ⟹ R ∈ R ⟺ R ∉ R | Naive set comprehension flaw |
| **Permutation** | P(n, r) = \frac{n!}{(n-r)!} | Order matters |
| **Combination** | C(n, r) = \frac{n!}{r!(n-r)!} | Order does not matter |

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
  practiceQuiz: [],
};
