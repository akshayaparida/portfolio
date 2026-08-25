import { LearningModule } from "@/types/learning";

export const functionsModule: LearningModule = {
  id: "functions",
  title: "Functions, Inverses & Bijections",
  description:
    "Domain, codomain, range, injective (one-to-one), surjective (onto), bijective mappings, composition of functions, inverse functions, counting functions via Stirling numbers, and computer science applications.",
  status: "in-progress",
  detailedContent: `# Functions, Inverses & Bijections

In computer science, mathematics, and artificial intelligence, **functions** are the primary abstraction for transformation, computation, and mapping. From pure functions in functional programming and hash functions in cybersecurity to neural network layer transformations in deep learning, functions allow us to model deterministic processes with mathematical precision.

This module covers **Formal Function Definitions, Domain/Codomain/Range, Injections (One-to-One), Surjections (Onto), Bijections, Composition of Functions, Inverse Functions, Function Counting Formulas (via Stirling Numbers & PIE), and Computer Science Applications**.

---

## What You'll Learn

By the end of this module, you will be able to:

| # | Topic | Skill |
|:--|:------|:------|
| 1 | **Function Foundations** | Define a function as a single-valued relation (f: A → B) with domain, codomain, range, and pre-images |
| 2 | **Injective Functions (1-to-1)** | Prove or disprove injectivity algebraically (f(x₁) = f(x₂) ⟹ x₁ = x₂) and via the Horizontal Line Test |
| 3 | **Surjective Functions (Onto)** | Verify whether Range(f) = Codomain(f) and construct algebraic pre-image solutions |
| 4 | **Bijective Functions & Invertibility** | Identify bijections (one-to-one correspondences) and determine whether two sets have identical cardinality |
| 5 | **Special Discrete Functions** | Master identity (I_A), constant, floor (⌊x⌋), ceiling (⌈x⌉), fractional part, and characteristic indicator functions |
| 6 | **Function Composition (g ∘ f)** | Compose multi-stage transformations and evaluate component properties (if g ∘ f is injective ⟹ f is injective) |
| 7 | **Inverse Functions (f⁻¹)** | Derive inverse mappings, verify two-sided inverses, and apply the Shoes-and-Socks rule (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹ |
| 8 | **Function Counting & Combinatorics** | Calculate total (nᵐ), injective (P(n, m)), surjective (n! · S(m, n)), and bijective (n!) functions between finite sets |
| 9 | **Stirling Numbers & PIE** | Compute Stirling numbers of the second kind S(m, n) to partition sets and count onto functions |
| 10 | **CS & AI Implementations** | Implement discrete function checkers, composition pipelines, and hash collision analyzers in Python |

---

## Math Notation & Pronunciation Guide

**Function Symbols:**
- **f: A → B** — pronounced "f is a function from set A to set B"
- **a ↦ f(a)** — pronounced "a maps to f(a)" (the element mapping rule)
- **dom(f)** — Domain of f (source set A)
- **codom(f)** — Codomain of f (target set B)
- **ran(f) or f(A)** — Range or Image of f (actual outputs: {f(a) | a ∈ A} ⊆ B)
- **f⁻¹(b)** — Pre-image (fiber) of element b: {a ∈ A | f(a) = b}
- **g ∘ f** — Composition of g and f, pronounced "g circle f" or "g composed with f" — (g ∘ f)(x) = g(f(x))
- **f⁻¹** — Inverse function of f (maps B → A)
- **I_A** — Identity function on set A: I_A(x) = x
- **⌊x⌋** — Floor of x (greatest integer ≤ x)
- **⌈x⌉** — Ceiling of x (least integer ≥ x)
- **χ_S(x) or 𝟙_S(x)** — Characteristic / Indicator function of subset S
- **S(m, n)** — Stirling number of the second kind

---

## Key Concepts

### 1. Formal Definition of Functions & Foundations

Let A and B be two non-empty sets. A **function** (or **mapping**) f from A to B, denoted **f: A → B**, is a special binary relation f ⊆ A × B satisfying two fundamental conditions:

\`\`\`text
1. Total Domain Coverage:
   Every element in the domain A must be assigned an output in B.
   ∀a ∈ A, ∃b ∈ B such that (a, b) ∈ f.

2. Uniqueness (Single-Valuedness):
   No element in A can map to more than one distinct element in B.
   ∀a ∈ A, ∀b₁, b₂ ∈ B, ((a, b₁) ∈ f ∧ (a, b₂) ∈ f) ⟹ b₁ = b₂.
\`\`\`

\`\`\`text
Valid Function (Every input has exactly 1 output):
  Domain A          Codomain B
   [ 1 ] -----------> [ x ]
   [ 2 ] -----------> [ y ]
   [ 3 ] -----------> [ y ]    (Two inputs can share an output!)

INVALID Relations (NOT Functions):
Case A (Unassigned input):     Case B (Multiple outputs for 1 input):
   [ 1 ] ----> [ x ]              [ 1 ] ----> [ x ]
   [ 2 ] (no arrow!)              [ 1 ] ----> [ y ] (Ambiguous!)
   [ 3 ] ----> [ y ]              [ 2 ] ----> [ z ]
\`\`\`

#### Domain, Codomain, and Range:
- **Domain**: The set of all valid inputs, dom(f) = A.
- **Codomain**: The target set where outputs reside, codom(f) = B.
- **Range (or Image)**: The set of elements in B actually hit by f:
  **Range(f) = f(A) = {b ∈ B | ∃a ∈ A such that f(a) = b}**
  Note that Range(f) ⊆ Codomain(f).

---

### 2. Injective Functions (One-to-One / Injection)

A function f: A → B is **Injective** (or **One-to-One**) if distinct elements in the domain always map to distinct elements in the codomain.

\`\`\`text
Formal Definition:
∀a₁, a₂ ∈ A, a₁ ≠ a₂ ⟹ f(a₁) ≠ f(a₂)

Equivalent Contrapositive (Used for Direct Proofs):
∀a₁, a₂ ∈ A, f(a₁) = f(a₂) ⟹ a₁ = a₂
\`\`\`

\`\`\`text
   INJECTIVE (1-to-1):             NOT INJECTIVE:
  Domain A      Codomain B       Domain A      Codomain B
   [ 1 ] ---------> [ a ]         [ 1 ] -----\\
   [ 2 ] ---------> [ b ]         [ 2 ] -----> [ a ]  (Collision!)
   [ 3 ] ---------> [ c ]         [ 3 ] -----> [ b ]
                    [ d ]
\`\`\`

#### Proving Injectivity:
- **Example 1 (f: ℝ → ℝ, f(x) = 3x + 7):**
  Assume f(x₁) = f(x₂).
  3x₁ + 7 = 3x₂ + 7 ⟹ 3x₁ = 3x₂ ⟹ x₁ = x₂
  Therefore, f is **injective**.

- **Example 2 (g: ℝ → ℝ, g(x) = x²):**
  Let x₁ = 2 and x₂ = -2.
  g(2) = 4 and g(-2) = 4
  Since 2 ≠ -2 but g(2) = g(-2), g is **NOT injective** over ℝ.
  *(Note: If the domain is restricted to non-negative reals ℝ≥0, g becomes injective!)*

> [!IMPORTANT]
> **Pigeonhole Principle Constraint for Injections:**
> If A and B are finite sets and |A| > |B|, then **no injective function** f: A → B can exist. (At least two domain elements must share a codomain value).

---

### 3. Surjective Functions (Onto / Surjection)

A function f: A → B is **Surjective** (or **Onto**) if every element in the codomain has at least one pre-image in the domain.

\`\`\`text
Formal Definition:
∀b ∈ B, ∃a ∈ A such that f(a) = b

Range-Based Definition:
Range(f) = Codomain(B)
\`\`\`

\`\`\`text
   SURJECTIVE (Onto):              NOT SURJECTIVE:
  Domain A      Codomain B       Domain A      Codomain B
   [ 1 ] ---------> [ x ]         [ 1 ] ---------> [ x ]
   [ 2 ] ---------> [ y ]         [ 2 ] ---------> [ y ]
   [ 3 ] ---------/               [ 3 ] ---------/ [ z ] (Uncovered!)
   (All of B is covered!)                          (z has no pre-image)
\`\`\`

#### Proving Surjectivity:
- **Example 1 (f: ℝ → ℝ, f(x) = 2x - 5):**
  Let y ∈ ℝ be an arbitrary codomain element. We seek x ∈ ℝ such that y = 2x - 5.
  y = 2x - 5 ⟹ 2x = y + 5 ⟹ x = (y + 5)/2
  Since (y + 5)/2 ∈ ℝ for all y ∈ ℝ, a pre-image always exists. Hence, f is **surjective**.

- **Example 2 (g: ℤ → ℤ, g(x) = 2x):**
  The codomain is all integers ℤ.
  For y = 3 ∈ ℤ, solving 2x = 3 gives x = 1.5 ∉ ℤ.
  Odd integers have no integer pre-images, so g is **NOT surjective**.

> [!NOTE]
> **Cardinality Constraint for Surjections:**
> If A and B are finite sets and |A| < |B|, then **no surjective function** f: A → B can exist.

---

### 4. Bijective Functions (One-to-One Correspondence)

A function f: A → B is **Bijective** (or a **Bijection / One-to-One Correspondence**) if and only if it is **BOTH Injective AND Surjective**.

\`\`\`text
   BIJECTIVE (1-to-1 and Onto):
  Domain A             Codomain B
   [ a₁ ] -------------> [ b₁ ]
   [ a₂ ] -------------> [ b₂ ]
   [ a₃ ] -------------> [ b₃ ]
   [ a₄ ] -------------> [ b₄ ]
  - Every element in A maps to a unique element in B.
  - Every element in B is mapped to by exactly one element in A.
\`\`\`

#### Fundamental Properties of Bijections:
1. **Equal Cardinality**: For finite sets A and B, a bijection f: A → B exists if and only if **|A| = |B|**.
2. **Invertibility Guarantee**: A function f: A → B has a well-defined inverse function f⁻¹: B → A if and only if f is a **bijection**.
3. **Cardinality of Infinite Sets**: Two infinite sets A and B are defined to have the same cardinality (e.g. |ℕ| = |ℤ| = |ℚ|) if there exists a bijection between them.

---

### 5. Special Discrete & Real Functions

In computer science, algorithm analysis, and discrete mathematics, several special functions appear frequently:

\`\`\`text
+-----------------------+------------------------+---------------------------------------------+
| Function              | Notation / Formula     | Key Properties & CS Applications            |
+-----------------------+------------------------+---------------------------------------------+
| Identity Function     | I_A(x) = x             | Bijection; neutral element for composition  |
| Constant Function     | f(x) = c               | Non-injective (for |A| > 1); range is {c}   |
| Floor Function        | ⌊x⌋                    | Largest integer ≤ x (Array index, buckets)  |
| Ceiling Function      | ⌈x⌉                    | Smallest integer ≥ x (Tree height, packets) |
| Fractional Part       | {x} = x - ⌊x⌋          | Range [0, 1); PRNGs, hashing routines       |
| Indicator Function    | χ_S(x) ∈ {0, 1}        | Membership filter in databases & bitsets    |
| Modulo Function       | mod_m(n) = n mod m     | Periodic hash mapping into [0, m-1]         |
+-----------------------+------------------------+---------------------------------------------+
\`\`\`

#### Essential Floor and Ceiling Identities:
For any real number x and integer n ∈ ℤ:
- ⌊x + n⌋ = ⌊x⌋ + n
- ⌈x + n⌉ = ⌈x⌉ + n
- ⌈x⌉ - ⌊x⌋ = 0 if x ∈ ℤ, or 1 if x ∉ ℤ
- ⌊-x⌋ = -⌈x⌉ and ⌈-x⌉ = -⌊x⌋
- **Binary Search Tree Depth**: Maximum depth of a complete binary tree with n nodes is ⌊log₂ n⌋ + 1.

---

### 6. Composition of Functions (g ∘ f)

Let f: A → B and g: B → C be two functions. The **composition of g and f**, denoted g ∘ f, is a function from A to C defined by:
**(g ∘ f)(x) = g(f(x)) for all x ∈ A**

\`\`\`text
Domain A            Codomain B            Codomain C
 [ x ] ---- f ----> [ f(x) ] ---- g ----> [ g(f(x)) ]
   |                                            ^
   \\------------------ (g ∘ f) -----------------/
\`\`\`

> [!WARNING]
> **Order of Execution:**
> In g ∘ f, the function f is applied **FIRST**, and g is applied **SECOND** to the result f(x). The codomain of f must match (or be a subset of) the domain of g.

#### Algebraic Properties of Composition:
1. **Associative**: h ∘ (g ∘ f) = (h ∘ g) ∘ f
2. **Non-Commutative in General**: g ∘ f ≠ f ∘ g
3. **Identity Element**: f ∘ I_A = f and I_B ∘ f = f

#### Hereditary Theorems:
- If both f and g are **injective**, then g ∘ f is **injective**.
- If both f and g are **surjective**, then g ∘ f is **surjective**.
- If both f and g are **bijective**, then g ∘ f is **bijective**.

#### Component Deduction Theorems (High-Frequency Exam Pattern):
\`\`\`text
1. If (g ∘ f) is INJECTIVE ⟹ f MUST be INJECTIVE.
   (g is NOT required to be injective!)

2. If (g ∘ f) is SURJECTIVE ⟹ g MUST be SURJECTIVE.
   (f is NOT required to be surjective!)

3. If (g ∘ f) is BIJECTIVE ⟹ f is INJECTIVE and g is SURJECTIVE.
\`\`\`

---

### 7. Inverse Functions (f⁻¹)

Let f: A → B be a function. If f is a **bijection**, then there exists a unique function f⁻¹: B → A, called the **inverse of f**, such that:
**f⁻¹(b) = a ⟺ f(a) = b**

\`\`\`text
   Function f: A ⟶ B              Inverse Function f⁻¹: B ⟶ A
  Domain A      Codomain B       Domain B      Codomain A
   [ a₁ ] --------> [ b₁ ]        [ b₁ ] --------> [ a₁ ]
   [ a₂ ] --------> [ b₂ ]        [ b₂ ] --------> [ a₂ ]
   [ a₃ ] --------> [ b₃ ]        [ b₃ ] --------> [ a₃ ]
\`\`\`

#### Fundamental Inverse Identities:
- (f⁻¹ ∘ f)(x) = f⁻¹(f(x)) = x = I_A(x) for all x ∈ A
- (f ∘ f⁻¹)(y) = f(f⁻¹(y)) = y = I_B(y) for all y ∈ B
- (f⁻¹)⁻¹ = f

#### The Shoes-and-Socks Rule for Inverses:
If f: A → B and g: B → C are both bijections, then the inverse of their composition reverses the application order:
**(g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹**

\`\`\`text
Intuition:
Putting on socks (f), then putting on shoes (g):  (g ∘ f)
To undo: Take off shoes FIRST (g⁻¹), then take off socks (f⁻¹):  (f⁻¹ ∘ g⁻¹)
\`\`\`

---

### 8. Counting Functions Between Finite Sets

Let A and B be finite sets with |A| = m (domain elements) and |B| = n (codomain elements).

\`\`\`text
+------------------------------+---------------------------------------+-----------------------------+
| Type of Function             | General Formula                       | Condition                   |
+------------------------------+---------------------------------------+-----------------------------+
| Total Functions              | nᵐ                                   | Always valid                |
| Injective Functions (1-to-1) | P(n, m) = n! / (n - m)!               | m ≤ n (0 if m > n)          |
| Surjective Functions (Onto)  | n! × S(m, n)                          | m ≥ n (0 if m < n)          |
|                              | = ∑(k=0 to n) (-1)ᵏ C(n, k) (n-k)ᵐ   |                             |
| Bijective Functions          | n!                                    | m = n (0 if m ≠ n)          |
| Strictly Increasing (A ⊆ B)  | C(n, m)                               | Ordered sets, m ≤ n         |
| Non-Decreasing (A ⊆ B)       | C(n + m - 1, m)                       | Stars and bars allocation   |
+------------------------------+---------------------------------------+-----------------------------+
\`\`\`

#### Detailed Derivations:

1. **Total Functions (nᵐ):**
   Each of the m elements in domain A has n independent choices in codomain B.
   **n × n × ... × n (m times) = nᵐ**

2. **Injective Functions (P(n, m)):**
   The 1st element has n choices, the 2nd has (n-1), the mth has (n - m + 1):
   **n(n-1)(n-2)···(n-m+1) = n! / (n-m)!**

3. **Surjective Functions via Principle of Inclusion-Exclusion (PIE):**
   Let U be the set of all nᵐ functions. Let property Pᵢ denote that element bᵢ ∈ B is *omitted* from the range.
   By PIE, the number of functions that omit *no* elements is:
   **Onto(m, n) = ∑(k=0 to n) (-1)ᵏ × C(n, k) × (n - k)ᵐ**

   *Example: Counting onto functions from |A| = 4 to |B| = 3:*
   Onto(4, 3) = C(3,0)·3⁴ - C(3,1)·2⁴ + C(3,2)·1⁴ - C(3,3)·0⁴
   Onto(4, 3) = 1(81) - 3(16) + 3(1) - 0 = 81 - 48 + 3 = **36**

---

### 9. Stirling Numbers of the Second Kind

The **Stirling Number of the Second Kind**, denoted S(m, n), counts the number of ways to partition a set of m labeled objects into n unlabeled, non-empty subsets.

#### Recurrence Relation:
**S(m, n) = S(m - 1, n - 1) + n · S(m - 1, n)**

**Boundary Conditions:**
- S(m, 1) = 1 for all m ≥ 1
- S(m, m) = 1 for all m ≥ 1
- S(m, n) = 0 for n > m or n < 1

#### Connection to Surjective (Onto) Functions:
Since each onto function assigns m distinct inputs to n distinct labels, we simply partition the m inputs into n non-empty groups and assign the n distinct target labels in n! ways:
**Onto Functions(m, n) = n! × S(m, n)**

\`\`\`text
Stirling Numbers Triangle (Values of S(m, n)):
m \\ n |  1    2    3    4    5
------+------------------------
  1   |  1
  2   |  1    1
  3   |  1    3    1
  4   |  1    7    6    1
  5   |  1   15   25   10    1
  6   |  1   31   90   65   15    1
\`\`\`

---

### 10. Python Implementation: Function Inspector & Combinatorics

\`\`\`python
import math
from itertools import product
from typing import Set, Dict, Any, Tuple, Optional

class DiscreteFunction:
    """
    Represents and analyzes a discrete function f: domain -> codomain.
    """
    def __init__(self, domain: Set[Any], codomain: Set[Any], mapping: Dict[Any, Any]):
        self.domain = domain
        self.codomain = codomain
        self.mapping = mapping
        self._validate()

    def _validate(self):
        # 1. Every domain element must have an assignment
        if set(self.mapping.keys()) != self.domain:
            raise ValueError("Invalid function: Domain mismatch or unassigned inputs.")
        # 2. Every mapped value must belong to codomain
        for val in self.mapping.values():
            if val not in self.codomain:
                raise ValueError(f"Value {val} not in codomain {self.codomain}.")

    def range(self) -> Set[Any]:
        return set(self.mapping.values())

    def is_injective(self) -> bool:
        # Check if all output values are unique
        return len(self.mapping.values()) == len(set(self.mapping.values()))

    def is_surjective(self) -> bool:
        # Check if range equals codomain
        return self.range() == self.codomain

    def is_bijective(self) -> bool:
        return self.is_injective() and self.is_surjective()

    def inverse(self) -> Optional['DiscreteFunction']:
        if not self.is_bijective():
            return None
        inv_mapping = {v: k for k, v in self.mapping.items()}
        return DiscreteFunction(self.codomain, self.domain, inv_mapping)

    def compose(self, g: 'DiscreteFunction') -> 'DiscreteFunction':
        """Computes (g ∘ self), applying self first, then g."""
        if not self.range().issubset(g.domain):
            raise ValueError("Cannot compose: Range of f is not subset of domain of g.")
        comp_mapping = {x: g.mapping[self.mapping[x]] for x in self.domain}
        return DiscreteFunction(self.domain, g.codomain, comp_mapping)

# -------------------------------------------------------------
# Function Counting Formulas
# -------------------------------------------------------------
def stirling_second(m: int, n: int) -> int:
    """Calculates S(m, n) using dynamic programming."""
    if n == 0 or n > m:
        return 0
    if n == 1 or n == m:
        return 1
    
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, min(i, n) + 1):
            if j == 1 or j == i:
                dp[i][j] = 1
            else:
                dp[i][j] = dp[i-1][j-1] + j * dp[i-1][j]
    return dp[m][n]

def count_onto_functions(m: int, n: int) -> int:
    """Counts total surjective functions from m elements to n elements."""
    if m < n:
        return 0
    return math.factorial(n) * stirling_second(m, n)

# -------------------------------------------------------------
# Verification & Demonstration
# -------------------------------------------------------------
if __name__ == "__main__":
    A = {1, 2, 3}
    B = {'a', 'b', 'c'}
    f_map = {1: 'a', 2: 'b', 3: 'c'}
    f = DiscreteFunction(A, B, f_map)

    print(f"f is Injective:  {f.is_injective()}")   # True
    print(f"f is Surjective: {f.is_surjective()}")  # True
    print(f"f is Bijective:  {f.is_bijective()}")   # True

    inv_f = f.inverse()
    print(f"f⁻¹ mapping:     {inv_f.mapping}")       # {'a': 1, 'b': 2, 'c': 3}

    # Counting Example: m = 4, n = 3
    total_fns = 3 ** 4
    injective_fns = 0  # since 4 > 3
    onto_fns = count_onto_functions(4, 3)
    
    print(f"\\nCounting for |A|=4, |B|=3:")
    print(f"  Total Functions:     {total_fns}")      # 81
    print(f"  Injective Functions: {injective_fns}")  # 0
    print(f"  Surjective (Onto):   {onto_fns}")        # 36
\`\`\`

---

## TL;DR — Quick Recall Reference

| Concept | Formal Condition | Key Insight / Formula |
|:--------|:-----------------|:----------------------|
| **Function f: A → B** | ∀a ∈ A, ∃! b ∈ B s.t. f(a) = b | Every input has exactly 1 output (Single-valued) |
| **Injective (1-to-1)** | f(a₁) = f(a₂) ⟹ a₁ = a₂ | No two inputs share an output (|A| ≤ |B|) |
| **Surjective (Onto)** | Range(f) = Codomain(B) | Every codomain element is covered (|A| ≥ |B|) |
| **Bijective (1-1 & Onto)** | Injective ∧ Surjective | Guaranteed invertible; |A| = |B| for finite sets |
| **Inverse f⁻¹** | f⁻¹(b) = a ⟺ f(a) = b | Exists ⟺ f is Bijective; (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹ |
| **Composition g ∘ f** | (g ∘ f)(x) = g(f(x)) | Associative, non-commutative; g ∘ f inj ⟹ f inj |
| **Total Functions** | Any assignment | nᵐ (where |A|=m, |B|=n) |
| **Injective Functions** | m ≤ n | P(n, m) = n! / (n-m)! |
| **Surjective Functions** | m ≥ n | n! · S(m, n) = ∑(-1)ᵏ C(n,k)(n-k)ᵐ |
| **Bijective Functions** | m = n | n! |

---

## Additional Resources

**Academic References:**
- *Discrete Mathematics and Its Applications* by Kenneth H. Rosen (Chapter 2: Basic Structures: Sets, Functions, Sequences, Sums, and Matrices)
- *NPTEL Discrete Mathematics* by Prof. Sudarshan Iyengar (IIT Ropar — Week 5: Functions)
`,
  subModules: [],
  practiceQuiz: [
    {
      id: "func-q1",
      question:
        "Let f: A → B and g: B → C be two functions. If the composite function (g ∘ f): A → C is injective, which of the following assertions MUST be true?",
      options: [
        "Both f and g must be injective",
        "f must be injective, but g is not necessarily injective",
        "g must be injective, but f is not necessarily injective",
        "Neither f nor g needs to be injective",
      ],
      correctAnswer: 1,
      explanation:
        "If (g ∘ f) is injective, f must be injective. Proof: Suppose f(x₁) = f(x₂). Applying g to both sides gives g(f(x₁)) = g(f(x₂)), which is (g ∘ f)(x₁) = (g ∘ f)(x₂). Since (g ∘ f) is injective, this implies x₁ = x₂. Thus f is injective. However, g does not need to be injective on elements outside the range of f.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Functions",
    },
    {
      id: "func-q2",
      question:
        "How many surjective (onto) functions exist from a set A with 4 elements to a set B with 3 elements?",
      options: ["24", "36", "64", "81"],
      correctAnswer: 1,
      explanation:
        "Using the PIE / Stirling number formula: Onto(m, n) = n! × S(m, n). For m = 4, n = 3: S(4, 3) = 6. Total onto functions = 3! × 6 = 6 × 6 = 36. Alternatively via PIE: C(3,0)*3⁴ - C(3,1)*2⁴ + C(3,2)*1⁴ = 81 - 48 + 3 = 36.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Functions",
    },
    {
      id: "func-q3",
      question:
        "Consider the function f: ℝ → ℝ defined by f(x) = x³ - 3x. Which of the following statements is true?",
      options: [
        "f is both injective and surjective",
        "f is injective but not surjective",
        "f is surjective but not injective",
        "f is neither injective nor surjective",
      ],
      correctAnswer: 2,
      explanation:
        "f(x) is not injective because f(0) = 0 and f(√3) = (√3)³ - 3(√3) = 0 (distinct inputs map to 0). f(x) is surjective because f(x) is a continuous cubic polynomial with lim_{x→-∞} f(x) = -∞ and lim_{x→+∞} f(x) = +∞, so by the Intermediate Value Theorem its range is all of ℝ.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Functions",
    },
    {
      id: "func-q4",
      question:
        "Let f: A → B and g: B → C be invertible functions (bijections). What is the correct formula for the inverse of their composition (g ∘ f)⁻¹?",
      options: ["g⁻¹ ∘ f⁻¹", "f⁻¹ ∘ g⁻¹", "(f ∘ g)⁻¹", "f ∘ g⁻¹"],
      correctAnswer: 1,
      explanation:
        "By the Shoes-and-Socks property of function inversion, (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹. Verification: (f⁻¹ ∘ g⁻¹) ∘ (g ∘ f) = f⁻¹ ∘ (g⁻¹ ∘ g) ∘ f = f⁻¹ ∘ I_B ∘ f = f⁻¹ ∘ f = I_A.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Functions",
    },
    {
      id: "func-q5",
      question:
        "Let A be a set with 5 elements and B be a set with 3 elements. How many injective functions can be defined from A to B?",
      options: ["0", "60", "125", "243"],
      correctAnswer: 0,
      explanation:
        "By the Pigeonhole Principle, if |A| > |B| (here 5 > 3), any function mapping A to B must assign at least two elements of A to the same element in B. Thus, NO injective functions can exist (the number is 0).",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Functions",
    },
  ],
};
