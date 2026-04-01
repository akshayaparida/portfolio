import { LearningModule } from "@/types/learning";

export const setTheoryModule: LearningModule = {
  id: "set-theory",
  title: "Set Theory & Combinatorics",
  description:
    "Discrete foundations for data structures, algorithms, and logical reasoning",
  status: "in-progress",
  detailedContent: `# Set Theory & Combinatorics

Set theory and combinatorics form the discrete mathematical foundation essential for computer science, data structures, algorithm analysis, and probability theory.

## What You'll Learn

By the end of this module, you will be able to:

| # | Topic | Skill |
|:--|:------|:------|
| 1 | **Sets & Notation** | Read and write set notation (∈, ∪, ∩, ⊆) |
| 2 | **Venn Diagrams** | Visualize Union, Intersection, Difference operations |
| 3 | **Cardinality** | Calculate set sizes using Inclusion-Exclusion |
| 4 | **Power Set** | Find all subsets of a set (2^n formula) |
| 5 | **Permutations** | Count ordered arrangements (n!) |
| 6 | **Combinations** | Count unordered selections C(n,r) |
| 7 | **Relations** | Identify Reflexive, Symmetric, Transitive properties |
| 8 | **Functions** | Count mappings between sets |
| 9 | **De Morgan's Laws** | Simplify complement expressions |
| 10 | **Problem Solving** | Apply these concepts to CUET PG style MCQs |

## Math Notation & Pronunciation Guide

**Set Notation:**
- ∈ - pronounced "element of" or "in" - membership (x ∈ A means x is in set A)
- ∉ - pronounced "not element of" - non-membership
- ⊂ - pronounced "subset of" - A ⊂ B means all of A is in B
- ⊆ - pronounced "subset or equal to" - includes equality
- ∪ - pronounced "union" - combines sets
- ∩ - pronounced "intersection" - common elements
- ∅ - pronounced "empty set" or "null set"
- |A| - pronounced "cardinality of A" - number of elements

**Combinatorics:**
- n! - pronounced "n factorial" - product of 1 to n
- P(n,r) or ⁿPᵣ - pronounced "n permute r" - ordered arrangements
- C(n,r) or ⁿCᵣ or (n choose r) - pronounced "n choose r" - unordered selections

**Greek Letters:**
- Σ (sigma) - summation
- Π (pi) - product notation

## Key Concepts

### 1. Sets - Fundamental Definitions

**What is a Set?**
A set is an unordered collection of distinct objects (called elements or members).

**Common Set Notations:**
\`\`\`python path=null start=null
# Python sets mirror mathematical sets
A = {1, 2, 3, 4, 5}
B = {4, 5, 6, 7, 8}

# Set builder notation (math): {x | x > 0 and x < 10}
# Python equivalent:
C = {x for x in range(1, 10)}  # {1, 2, 3, 4, 5, 6, 7, 8, 9}

# Empty set
empty = set()  # or ∅ in math notation
\`\`\`

**Special Sets:**
- **Natural Numbers (ℕ)**: {0, 1, 2, 3, ...} or {1, 2, 3, ...}
- **Integers (ℤ)**: {..., -2, -1, 0, 1, 2, ...}
- **Rational Numbers (ℚ)**: All fractions p/q
- **Real Numbers (ℝ)**: All numbers on the number line
- **Universal Set (U)**: Contains all elements under consideration

**Types of Sets:**

| Type | Definition | Example |
|:-----|:-----------|:--------|
| **Finite Set** | Contains a countable number of elements | A = {1, 2, 3} → \|A\| = 3 |
| **Infinite Set** | Contains uncountably many elements | ℕ = {1, 2, 3, ...}, ℤ, ℚ, ℝ |
| **Empty/Null/Void Set** | Contains no elements, denoted ∅ or {} | A = {} → \|A\| = 0 |
| **Singleton Set** | Contains exactly one element | A = {5} → \|A\| = 1 |
| **Equal Sets** | Same elements (A = B) | {1,2,3} = {3,1,2} (order doesn't matter) |
| **Equivalent Sets** | Same cardinality but not necessarily same elements | {1,2,3} and {a,b,c} (both have 3 elements) |
| **Disjoint Sets** | No common elements (A ∩ B = ∅) | {1,2} and {3,4} are disjoint |

> NOTE: **MCQ Trap:** Equal sets are always equivalent, but equivalent sets are NOT always equal!
> {1,2,3} and {a,b,c} are equivalent (both size 3) but NOT equal (different elements).

> TIP: **Subset Relationships:**
> - A ⊆ B means every element of A is in B (A is a **subset** of B)
> - A ⊂ B means A ⊆ B but A ≠ B (A is a **proper subset** of B)
> - ∅ is a subset of every set: ∅ ⊆ A for all A
> - Every set is a subset of itself: A ⊆ A
> - A ⊆ B **if and only if** A ∩ B = A **if and only if** A ∪ B = B


### 2. Venn Diagrams - Visual Representation

**What is a Venn Diagram?**
A Venn diagram uses overlapping circles to show relationships between sets visually.

![Set Operations Venn Diagrams](/mathset.png)

**Set Operations Summary:**

| Operation | Symbol | Shaded Region | Meaning |
|:----------|:-------|:--------------|:--------|
| **Union** | A ∪ B | Both circles | Elements in A OR B (or both) |
| **Intersection** | A ∩ B | Overlap only | Elements in A AND B |
| **Difference** | A - B | Left crescent | Elements in A but NOT in B |
| **Symmetric Diff** | A △ B | Both crescents | Elements in A OR B, but NOT both |
| **Complement** | A' | Outside A | Everything NOT in A |

**Practical Problem-Solving with Venn Diagrams:**

**Problem:** In a class of 50 students, 30 play cricket, 25 play football, and 10 play both. Find students who play only cricket, only football, at least one sport, and neither sport.

**Step 1: Define the Sets**

Let's formally define our sets first:
- **U** = Universal Set = All 50 students in the class
- **C** = Set of Cricket players → |C| = 30
- **F** = Set of Football players → |F| = 25
- **C ∩ F** = Students who play BOTH → |C ∩ F| = 10

**Step 2: Identify the 4 Regions of the Venn Diagram**

Think of two overlapping circles (C and F) inside a rectangle (U):

| Region | Description | Count |
|:-------|:------------|:------|
| Only Cricket | Left circle only (C - F) | 20 |
| Both Sports | Overlap area (C ∩ F) | 10 |
| Only Football | Right circle only (F - C) | 15 |
| Neither | Outside both circles | 5 |
| **Total (U)** | **All students** | **50** |

**Step 3: Calculate Each Region**

**Region 1 — Only Cricket (C - F):**
These students play cricket but NOT football.
Formula: |C - F| = |C| - |C ∩ F| = 30 - 10 = **20 students**

> Why subtract? Because |C| = 30 includes BOTH the "only cricket" AND "both sports" students. Removing the overlap gives us only-cricket.

**Region 2 — Only Football (F - C):**
These students play football but NOT cricket.
Formula: |F - C| = |F| - |C ∩ F| = 25 - 10 = **15 students**

**Region 3 — Both Sports (C ∩ F):**
Already given: |C ∩ F| = **10 students**

**Region 4 — At Least One Sport (C ∪ F) — Inclusion-Exclusion:**
Formula: |C ∪ F| = |C| + |F| - |C ∩ F|

> NOTE: **Why subtract |C ∩ F|?** This is the KEY insight!
> When you add |C| + |F|, the 10 students who play BOTH sports get counted TWICE — once in cricket's 30, and once in football's 25. Subtracting once removes the double-counting.

|C ∪ F| = 30 + 25 - 10 = **45 students**

**Region 5 — Neither Sport (C ∪ F)':**
Students outside both circles = Total - At least one
Formula: |(C ∪ F)'| = |U| - |C ∪ F| = 50 - 45 = **5 students**

**Step 4: Verify (all regions must add up to |U|)**
Only Cricket + Only Football + Both + Neither = 20 + 15 + 10 + 5 = **50** (verified)

\`\`\`python path=null start=null
# Step 1: Define known values
total_students = 50  # |U| = Universal Set
cricket = 30         # |C| = Cricket players
football = 25        # |F| = Football players
both = 10            # |C ∩ F| = Play both sports

# Step 2: Apply Inclusion-Exclusion for Union
# |C ∪ F| = |C| + |F| - |C ∩ F|
# WHY subtract? Adding C + F double-counts the 10 students
# who play BOTH. Subtracting removes the duplicate.
either = cricket + football - both
print(f"At least one sport (C ∪ F): {either}")  # 45

# Step 3: Find Only Cricket = C - F (set difference)
# |C| includes both "only cricket" AND "both" students
# So: Only Cricket = |C| - |C ∩ F|
only_cricket = cricket - both
print(f"Only cricket (C - F): {only_cricket}")  # 20

# Step 4: Find Only Football = F - C (set difference)
only_football = football - both
print(f"Only football (F - C): {only_football}")  # 15

# Step 5: Find Neither = Complement of Union
# Students outside both circles = |U| - |C ∪ F|
neither = total_students - either
print(f"Neither sport (C ∪ F)': {neither}")  # 5

# Step 6: Verify — all regions must equal total
assert only_cricket + only_football + both + neither == total_students
print(f"Verification: {only_cricket} + {only_football} + {both} + {neither} = {total_students} OK")
\`\`\`

> **MCQ Shortcut:** In exams, if they give you "neither", work backwards!
> |C ∪ F| = Total - Neither, then use |C ∩ F| = |C| + |F| - |C ∪ F|

### 3. Set Operations

Let A = {1, 2, 3, 4} and B = {3, 4, 5, 6}. We will use these two sets to demonstrate every operation.


---

**Union (A ∪ B) — "OR"**

**Definition:** A ∪ B = {x | x ∈ A **or** x ∈ B} — collect ALL elements from both sets, no duplicates.

**Step-by-step — check each element:**

| Element | In A? | In B? | In A ∪ B? (A or B) |
|:--------|:------|:------|:-------------------|
| 1 | Yes | No | Yes (in A) |
| 2 | Yes | No | Yes (in A) |
| 3 | Yes | Yes | Yes (in both) |
| 4 | Yes | Yes | Yes (in both) |
| 5 | No | Yes | Yes (in B) |
| 6 | No | Yes | Yes (in B) |

**Result:** A ∪ B = {1, 2, 3, 4, 5, 6}

> TIP: **Key insight:** Elements 3 and 4 appear in BOTH sets, but in the union they appear only ONCE. Sets never have duplicates!

\`\`\`python path=null start=null
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

# Union: Python uses | operator (or .union() method)
# Math: A ∪ B — collect all unique elements from both
A_union_B = A | B
print(f"A ∪ B = {A_union_B}")  # {1, 2, 3, 4, 5, 6}
print(f"|A ∪ B| = {len(A_union_B)}")  # 6 (not 8, because 3,4 aren't counted twice)
\`\`\`

---

**Intersection (A ∩ B) — "AND"**

**Definition:** A ∩ B = {x | x ∈ A **and** x ∈ B} — only elements that appear in BOTH sets.

**Step-by-step — check each element:**

| Element | In A? | In B? | In A ∩ B? (A and B) |
|:--------|:------|:------|:--------------------|
| 1 | Yes | No | No (not in B) |
| 2 | Yes | No | No (not in B) |
| 3 | Yes | Yes | Yes (in both!) |
| 4 | Yes | Yes | Yes (in both!) |
| 5 | No | Yes | No (not in A) |
| 6 | No | Yes | No (not in A) |

**Result:** A ∩ B = {3, 4}

> TIP: **MCQ Trap:** If A ∩ B = ∅ (empty set), the sets are called **disjoint** — they share NO elements.

\`\`\`python path=null start=null
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

# Intersection: Python uses & operator (or .intersection() method)
# Math: A ∩ B — only elements in BOTH sets
A_intersect_B = A & B
print(f"A ∩ B = {A_intersect_B}")  # {3, 4}
print(f"|A ∩ B| = {len(A_intersect_B)}")  # 2

# Check if sets are disjoint (no common elements)
C = {7, 8, 9}
print(f"A and C disjoint? {A.isdisjoint(C)}")  # True (A ∩ C = ∅)
\`\`\`

---

**Difference (A - B) — "In A but NOT in B"**

**Definition:** A - B = {x | x ∈ A **and** x ∉ B} — remove B's elements from A.

**Step-by-step — check each element of A:**

| Element of A | Also in B? | In A - B? |
|:-------------|:-----------|:----------|
| 1 | No | Yes (keep — not in B) |
| 2 | No | Yes (keep — not in B) |
| 3 | Yes | No (remove — it's in B) |
| 4 | Yes | No (remove — it's in B) |

**Result:** A - B = {1, 2}

> NOTE: **A - B ≠ B - A!** Order matters in set difference!
> B - A = {5, 6} (elements in B but not in A)

\`\`\`python path=null start=null
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

# Set Difference: Python uses - operator (or .difference() method)
# Math: A - B — elements in A that are NOT in B
A_minus_B = A - B
B_minus_A = B - A
print(f"A - B = {A_minus_B}")  # {1, 2}
print(f"B - A = {B_minus_A}")  # {5, 6}

# IMPORTANT: A - B ≠ B - A (set difference is NOT commutative!)
print(f"A - B == B - A? {A_minus_B == B_minus_A}")  # False
\`\`\`

---

**Complement (A') — "Everything NOT in A"**

**Definition:** A' = U - A = {x | x ∈ U and x ∉ A}

The complement depends on the **Universal Set U** — the "universe" of all possible elements.

**Example:** Let U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10} and A = {1, 2, 3, 4}

| Element | In U? | In A? | In A'? (in U but not A) |
|:--------|:------|:------|:------------------------|
| 1 | Yes | Yes | No |
| 2 | Yes | Yes | No |
| 3 | Yes | Yes | No |
| 4 | Yes | Yes | No |
| 5 | Yes | No | Yes |
| 6 | Yes | No | Yes |
| 7-10 | Yes | No | Yes |

**Result:** A' = {5, 6, 7, 8, 9, 10}

> TIP: **Important Properties:**
> - A ∪ A' = U (a set and its complement cover everything)
> - A ∩ A' = ∅ (a set and its complement share nothing)
> - (A')' = A (double complement gives back the original)

\`\`\`python path=null start=null
U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}  # Universal set
A = {1, 2, 3, 4}

# Complement: A' = U - A (everything in universe NOT in A)
A_complement = U - A
print(f"A' = {A_complement}")  # {5, 6, 7, 8, 9, 10}

# Verify properties
print(f"A ∪ A' = U? {(A | A_complement) == U}")  # True
print(f"A ∩ A' = ∅? {len(A & A_complement) == 0}")  # True
\`\`\`

---

**Symmetric Difference (A △ B) — "In one OR the other, but NOT both"**

**Definition:** A △ B = (A ∪ B) - (A ∩ B) = (A - B) ∪ (B - A)

This gives you elements that are in EXACTLY ONE of the two sets.

**Step-by-step:**

| Element | In A? | In B? | In exactly one? | In A △ B? |
|:--------|:------|:------|:----------------|:----------|
| 1 | Yes | No | Yes (only A) | Yes |
| 2 | Yes | No | Yes (only A) | Yes |
| 3 | Yes | Yes | No (in both!) | No |
| 4 | Yes | Yes | No (in both!) | No |
| 5 | No | Yes | Yes (only B) | Yes |
| 6 | No | Yes | Yes (only B) | Yes |

**Result:** A △ B = {1, 2, 5, 6}

> TIP: **Two equivalent ways to calculate:**
> - Method 1: (A ∪ B) - (A ∩ B) = {1,2,3,4,5,6} - {3,4} = {1,2,5,6}
> - Method 2: (A - B) ∪ (B - A) = {1,2} ∪ {5,6} = {1,2,5,6}

\`\`\`python path=null start=null
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

# Symmetric Difference: Python uses ^ operator
# Math: A △ B — elements in EXACTLY ONE set
symmetric = A ^ B
print(f"A △ B = {symmetric}")  # {1, 2, 5, 6}

# Verify both methods give same result
method1 = (A | B) - (A & B)  # Union minus Intersection
method2 = (A - B) | (B - A)  # Only-A plus Only-B
print(f"Method 1 (A∪B)-(A∩B) = {method1}")  # {1, 2, 5, 6}
print(f"Method 2 (A-B)∪(B-A) = {method2}")  # {1, 2, 5, 6}
print(f"All methods equal? {symmetric == method1 == method2}")  # True
\`\`\`

---

**Key Set Identities (Exam-Critical):**

| Identity | Formula | Intuition |
|:---------|:--------|:----------|
| **Difference via Complement** | A ∩ B' = A - B | Elements in A that are outside B |
| **Cardinality of Difference** | n(A - B) = n(A) - n(A ∩ B) | Remove the overlap from A |
| **Complement of Complement** | (A')' = A | Double negation cancels out |
| **Union with Complement** | A ∪ A' = U | A set and its complement cover everything |
| **Intersection with Complement** | A ∩ A' = ∅ | A set and its complement share nothing |
| **Absorption Law** | A ∪ (A ∩ B) = A | Union with a subset adds nothing |
| **Absorption Law** | A ∩ (A ∪ B) = A | Intersection with a superset keeps everything |

> TIP: **A ∩ B' = A - B** is a very common MCQ identity. If a question asks "what is A ∩ B'?", the answer is "only A" — the part of A that doesn't overlap with B. Visualize it on a Venn diagram: shade A, then remove everything inside B.

### 3. Cardinality

**Cardinality** = how many elements are in the set. Written as |A|.

**Basic Examples:**

| Set | Elements | \\|Set\\| (Cardinality) |
|:----|:---------|:--------------------|
| A = {1, 2, 3, 4, 5} | 1, 2, 3, 4, 5 | **\\|A\\| = 5** |
| B = {a, b} | a, b | **\\|B\\| = 2** |
| ∅ (empty set) | (nothing) | **\\|∅\\| = 0** |
| {∅} | ∅ itself | **\\|{∅}\\| = 1** (the empty set IS an element!) |

> NOTE: **MCQ Trap:** \\|{∅}\\| = 1, NOT 0! The set contains one element (which happens to be the empty set).

\`\`\`python path=null start=null
A = {1, 2, 3, 4, 5}
print(f"|A| = {len(A)}")  # 5

# Empty set cardinality
empty = set()
print(f"|∅| = {len(empty)}")  # 0

# CAUTION: {∅} has 1 element (the empty set itself)
# In Python, we can't directly nest sets, but conceptually:
# |{∅}| = 1, NOT 0!
\`\`\`

---

**Cardinality of Union — Inclusion-Exclusion Principle:**

This is the MOST IMPORTANT formula for MCQs. It tells us how many elements are in a union.

**For 2 sets:**
|A ∪ B| = |A| + |B| - |A ∩ B|

**For 3 sets (extended formula):**
|A ∪ B ∪ C| = |A| + |B| + |C| - |A ∩ B| - |A ∩ C| - |B ∩ C| + |A ∩ B ∩ C|

> TIP: **Why does this work?**
> - Adding all three counts elements in multiple sets MORE THAN ONCE
> - Subtracting pairwise intersections corrects the over-counting
> - But elements in ALL THREE sets get subtracted too many times, so add them back

**For 4 sets (generalized formula):**
n(A ∪ B ∪ C ∪ D) = n(A) + n(B) + n(C) + n(D)
  − n(A∩B) − n(A∩C) − n(A∩D) − n(B∩C) − n(B∩D) − n(C∩D)
  + n(A∩B∩C) + n(A∩B∩D) + n(A∩C∩D) + n(B∩C∩D)
  − n(A∩B∩C∩D)

> TIP: **Pattern:** Add singles, subtract pairs, add triples, subtract quadruples. The sign alternates with each level — this is the Inclusion-Exclusion principle generalized to any number of sets.

**Worked Example:** In a survey of 100 students:
- 40 like Math, 35 like Science, 30 like English
- 15 like Math & Science, 10 like Math & English, 12 like Science & English
- 5 like all three

|M ∪ S ∪ E| = 40 + 35 + 30 - 15 - 10 - 12 + 5 = **73 students like at least one subject**
Students who like NONE = 100 - 73 = **27 students**

\`\`\`python path=null start=null
# Two-set Inclusion-Exclusion
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

# Why subtract? Because |A| + |B| = 4 + 4 = 8, but elements
# 3 and 4 are counted TWICE. Subtracting |A ∩ B| = 2 fixes this.
union_size = len(A | B)  # Actual: 6
calculated = len(A) + len(B) - len(A & B)  # 4 + 4 - 2 = 6
print(f"|A ∪ B| = {union_size}")  # 6
print(f"|A| + |B| - |A ∩ B| = {calculated}")  # 6 (verified)

# Three-set Inclusion-Exclusion
math_students = 40
science_students = 35
english_students = 30
math_science = 15
math_english = 10
science_english = 12
all_three = 5

at_least_one = (math_students + science_students + english_students
                - math_science - math_english - science_english
                + all_three)
print(f"Like at least one subject: {at_least_one}")  # 73
print(f"Like none: {100 - at_least_one}")  # 27
\`\`\`

### 4. Power Set

The **power set** P(A) is the set of ALL possible subsets of A, including ∅ and A itself.

**Formula:** If |A| = n, then |P(A)| = 2ⁿ

> TIP: **Why 2ⁿ?** Each element has exactly 2 choices: either it's IN the subset or NOT. So for n elements, there are 2 × 2 × ... × 2 (n times) = 2ⁿ possible subsets.

**Example:** Let A = {1, 2, 3}. List ALL subsets:

| Element 1 | Element 2 | Element 3 | Subset |
|:----------|:----------|:----------|:-------|
| No | No | No | {} (empty set ∅) |
| Yes | No | No | {1} |
| No | Yes | No | {2} |
| No | No | Yes | {3} |
| Yes | Yes | No | {1, 2} |
| Yes | No | Yes | {1, 3} |
| No | Yes | Yes | {2, 3} |
| Yes | Yes | Yes | {1, 2, 3} |

Total = 2³ = **8 subsets**

P(A) = {∅, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}}

> NOTE: **MCQ Traps:**
> - P(A) ALWAYS includes ∅ (the empty set is a subset of every set)
> - P(A) ALWAYS includes A itself
> - P(∅) = {∅}, so |P(∅)| = 2⁰ = **1** (not 0!)

\`\`\`python path=null start=null
from itertools import chain, combinations

def power_set(s):
    """Generate all subsets of a set"""
    s = list(s)
    return list(chain.from_iterable(
        combinations(s, r) for r in range(len(s) + 1)
    ))

A = {1, 2, 3}
P_A = power_set(A)
print(f"Power set of {A}:")
for subset in P_A:
    print(f"  {set(subset) if subset else '∅'}")

# Verify the formula: |P(A)| = 2^|A|
print(f"|P(A)| = {len(P_A)}")  # 8
print(f"2^|A| = 2^{len(A)} = {2**len(A)}")  # 8 (verified)

# Quick exam calculations:
# |A| = 0 → |P(A)| = 1
# |A| = 3 → |P(A)| = 8
# |A| = 5 → |P(A)| = 32
# |A| = 10 → |P(A)| = 1024
\`\`\`

### 5. Permutations

**Permutation** = an ORDERED arrangement. The KEY word is **order matters**.

**Formula:** P(n, r) = n! / (n-r)!

Where n = total items, r = items to arrange, and n! = n × (n-1) × (n-2) × ... × 1

> TIP: **Think of it as filling slots:** You have r empty slots to fill from n items.

**Example:** How many 3-letter codes from {A, B, C, D, E}? (n=5, r=3)

| Slot | Choices Left | Why? |
|:-----|:-------------|:-----|
| 1st letter | **5** choices | All 5 letters available |
| 2nd letter | **4** choices | 1 letter already used |
| 3rd letter | **3** choices | 2 letters already used |

Total = 5 × 4 × 3 = **60** arrangements

Using the formula: P(5,3) = 5! / (5-3)! = 120 / 2 = **60** (verified)

> NOTE: **ABC ≠ BAC ≠ CAB** — these are THREE different permutations because order matters!

**Common MCQ patterns:**
- "How many ways to ARRANGE" → Permutation
- "How many PASSWORDS of length r" → Permutation
- "How many ways can n people LINE UP" → n! (special case: P(n,n))
- "RANKINGS / positions" → Permutation

\`\`\`python path=null start=null
import math
from itertools import permutations

# Factorial: n! = n × (n-1) × ... × 1
print(f"5! = 5×4×3×2×1 = {math.factorial(5)}")  # 120
print(f"0! = {math.factorial(0)}")  # 1 (by definition!)

# Permutation formula: P(n, r) = n! / (n-r)!
def P(n, r):
    return math.factorial(n) // math.factorial(n - r)

# 3-letter codes from 5 letters
n, r = 5, 3
print(f"P({n},{r}) = {n}!/({n}-{r})! = {math.factorial(n)}/{math.factorial(n-r)} = {P(n,r)}")  # 60

# Special case: arrange ALL items → P(n,n) = n!
people = 4
print(f"4 people in a line: P(4,4) = 4! = {P(people, people)}")  # 24
\`\`\`

> **Exam Shortcut:** For "arrange r from n", just multiply: n × (n-1) × ... down to r numbers.
> P(5,3) = 5 × 4 × 3 = 60. No need to compute full factorials!

---

#### 5.1 Fundamental Theorem of Counting

The fundamental theorem helps find the total number of ways to perform a task consisting of multiple independent steps.

> TIP: **Rule:** If a task has k steps, where step 1 can be done in n₁ ways, step 2 in n₂ ways, ..., step k in nₖ ways, then total ways = n₁ × n₂ × ... × nₖ

**Example:** Place 3 letters (a, b, c) into 3 distinct slots without repetition:
- Slot 1: 3 options → Slot 2: 2 options → Slot 3: 1 option
- Total = 3 × 2 × 1 = **6 ways**

**Example:** A hall has 3 entry gates and 2 exit gates. A person enters and then exits:
- Ways to enter: 3 → Ways to exit: 2
- Total = 3 × 2 = **6 ways**

---

#### 5.2 Factorial Properties & Expansions

**Key Properties:**

| Property | Value |
|:---------|:------|
| 0! | 1 (by convention) |
| 1! | 1 |
| n! | n × (n-1)! |
| n! | n × (n-1) × (n-2)! |

**General Expansion Patterns:**
- (n+3)! = (n+3)(n+2)(n+1) × n!
- (2n)! = 2n × (2n-1) × (2n-2) × ...
- (3n)! = 3n × (3n-1) × (3n-2) × ...

**Solved Examples:**

| Problem | Simplification | Answer |
|:--------|:---------------|:-------|
| 11!/8! | 11 × 10 × 9 × 8!/8! | **990** |
| 6!/(4! × 2!) | (6 × 5 × 4!)/(4! × 2) | **15** |
| (n+3)!/n! | (n+3)(n+2)(n+1) × n!/n! | **(n+3)(n+2)(n+1)** |
| 15!/(12! × 3!) | (15 × 14 × 13)/(3 × 2 × 1) | **455** |

**Factorial Equation:** Find x if 1/9! + 1/10! = x/11!

Multiply entire equation by 11!:
- 11!/9! + 11!/10! = x
- (11 × 10) + 11 = x
- x = **121**

**Telescoping Sum:** Evaluate Σ(r=1 to 10) r·r!

Trick: r·r! = (r+1-1)·r! = (r+1)! - r!

So the sum telescopes: (2!-1!) + (3!-2!) + ... + (11!-10!) = 11! - 1

**Answer:** 11! - 1

**Important Proof:**

(n-1)!/(n-r-1)! + r × (n-1)!/(n-r)! = n!/(n-r)!

Derivation: Factor out (n-1)!/(n-r-1)!, simplify the bracket using (n-r+r)/(n-r) = n/(n-r), and multiply back to get n!/(n-r)!.

---

#### 5.3 Permutations with Repetition

When repetition IS allowed, each position has n choices independently.

| Condition | Formula | Example |
|:----------|:--------|:--------|
| No repetition | P(n,r) = n!/(n-r)! | 3-letter codes from 5 letters = 60 |
| Repetition allowed | nʳ | 3-letter codes from 5 letters = 5³ = 125 |
| All items arranged | n! | 5 people in a line = 120 |

**Example:** 4 parcels distributed across 5 post offices:
- Each parcel → 5 choices (independently)
- Total = 5⁴ = **625 ways**

**Example:** 5-digit numbers from {1,2,3,4,5}:
- With repetition: 5⁵ = **3125**
- Without repetition: 5! = **120**

---

#### 5.4 Permutations with Identical/Repeated Elements

If n objects include p identical of one kind, q of another, r of another:

**Formula:** Total arrangements = n! / (p! × q! × r! × ...)

| Word | Repeated Letters | Calculation | Answer |
|:-----|:----------------|:------------|:-------|
| APPLE | P×2 | 5!/2! | **60** |
| BANANA | A×3, N×2 | 6!/(3!×2!) | **60** |
| COMMITTEE | M×2, T×2, E×2 | 9!/(2!)³ | **45360** |
| MISSISSIPPI | I×4, S×4, P×2 | 11!/(4!×4!×2!) | **34650** |
| EQUATION | All distinct (8) | 8! | **40320** |

> TIP: **Mnemonic:** "Divide by the factorials of repeats." Each group of identical items would be over-counted n! ways if treated as distinct — dividing by p! removes those duplicates.

---

#### 5.5 Grouping Method — Objects Always Together

**Strategy:** Treat the "must-together" objects as a single block, then arrange.

**Step-by-step Template:**
1. Group the constrained items into ONE block
2. Count total entities = remaining items + 1 block
3. Arrange entities: (total entities)!
4. Multiply by internal arrangements of the block

**Example 1:** Arrange {A, B, C, D} where A and B must be together:
1. Block [AB], C, D → 3 entities
2. Arrange 3 entities: 3! = 6
3. Internal arrangement of A,B: 2! = 2 (AB or BA)
4. **Total = 3! × 2! = 12**

**Example 2 (PENCIL):** N must be next to E:
1. Block [NE], P, C, I, L → 5 entities
2. Arrange: 5! = 120
3. Internal: 2! = 2
4. **Total = 5! × 2! = 240**

**Example 3 (DAUGHTER):** Vowels (A,U,E) always together:
1. Block [AUE], D, G, H, T, R → 6 entities
2. Arrange: 6! = 720
3. Internal vowel arrangement: 3! = 6
4. **Total = 6! × 3! = 4320**

**Example 4 (Books):** 5 Math, 4 Physics, 2 Chemistry — same subject together:
1. Groups: 3 subject blocks → 3! arrangements
2. Internal: Math 5! × Physics 4! × Chemistry 2!
3. **Total = 3! × 5! × 4! × 2!**

---

#### 5.6 Complementary Approach — Never Together

**Formula:** Never Together = Total (unrestricted) − Always Together

> TIP: **When to use:** Whenever a problem says "never together" or "no two X are adjacent", calculate Total − Together. It's almost always easier than direct counting.

**DAUGHTER — Vowels Never Together:**
= 8! − (6! × 3!) = 40320 − 4320 = **36000**

**MISSISSIPPI — Four I's NOT Together:**
- Total = 11!/(4!×4!×2!) = 34650
- I's together: treat [IIII] as a block → 8 entities with S×4, P×2
- Together = 8!/(4!×2!) = 840
- **Not together = 34650 − 840 = 33810**

---

#### 5.7 Circular Permutations

In circular arrangements, one position is fixed to avoid counting rotations.

**Formula:** (n − 1)!

**Example:** 8 friends around a circular table:
= (8−1)! = 7! = **5040**

> NOTE: **Why (n-1)!?** In a line, ABCD and BCDA are different arrangements. In a circle, they represent the same seating. Fixing one person removes rotational symmetry, leaving (n-1)! distinct arrangements.

---

#### 5.8 Dictionary Rank of a Word

To find the rank of a word when all permutations are arranged alphabetically, count how many words come before it.

**Example:** Rank of SACHIN

Alphabetical order of letters: A, C, H, I, N, S

| Starting Letter | Count | Running Total |
|:---------------|:------|:--------------|
| A_ _ _ _ _ | 5! = 120 | 120 |
| C_ _ _ _ _ | 5! = 120 | 240 |
| H_ _ _ _ _ | 5! = 120 | 360 |
| I_ _ _ _ _ | 5! = 120 | 480 |
| N_ _ _ _ _ | 5! = 120 | 600 |
| S-A-C-H-I-N | This IS the word! | 601 |

**Rank of SACHIN = 601**

---

#### 5.9 More Solved Permutation Problems

**Q: Vowels in Even Places (ARTICLE)**

Word: ARTICLE (7 letters). Vowels: A, I, E (3). Consonants: R, T, C, L (4).
- Even positions (2, 4, 6): 3 places for 3 vowels → 3! = 6
- Odd positions (1, 3, 5, 7): 4 places for 4 consonants → 4! = 24
- **Total = 3! × 4! = 144**

**Q: Numbers > 100, Divisible by 5, from {3,4,5,6}**

Unit digit must be 5 (for divisibility). No repetition.
- 3-digit numbers: _ _ 5 → 3 × 2 × 1 = 6
- 4-digit numbers: _ _ _ 5 → 3 × 2 × 1 × 1 = 6
- **Total = 12**

**Q: Total 9-digit numbers with all different digits**

Digits: {0,1,2,...,9}. First digit cannot be 0.
- First digit: 9 choices (1-9)
- Remaining 8 digits from 9 left: ⁹P₈ = 9!
- **Total = 9 × 9!**

**Q: 3-digit numbers from {0,2,3,4,5} (no repetition)**

- Hundred's place: 4 choices (cannot be 0)
- Ten's place: 4 choices (remaining digits including 0)
- Unit's place: 3 choices
- **Total = 4 × 4 × 3 = 48**

**Q: Permutation Equation**

If a = ⁽ˣ⁺²⁾P₍ₓ₊₂₎ = (x+2)!, b = ˣP₁₁, c = ⁽ˣ⁻¹¹⁾P₍ₓ₋₁₁₎ = (x-11)!, and a = 182bc:
- (x+2)! = 182 × x!
- (x+2)(x+1) = 182
- x² + 3x − 180 = 0 → (x+15)(x-12) = 0
- **x = 12**

### 6. Combinations

**Combination** = an UNORDERED selection. The KEY word is **order doesn't matter**.

**Formula:** C(n, r) = n! / (r! × (n-r)!)

Also written as "n choose r" or ⁿCᵣ

> TIP: **Why divide by r!?** Because a permutation counts ABC, BAC, CAB as 3 different results. But in a combination, they're all the SAME team {A, B, C}. So we divide by r! to remove the duplicate orderings.

**Example:** Select 3 team members from {Alice, Bob, Charlie, Dave, Eve}. (n=5, r=3)

Step 1: Permutations = P(5,3) = 60 (ordered arrangements)
Step 2: Each group of 3 people can be ordered in r! = 3! = 6 ways
Step 3: Combinations = 60 / 6 = **10 unique teams**

**The 10 teams are:**

| # | Team |
|:--|:-----|
| 1 | {Alice, Bob, Charlie} |
| 2 | {Alice, Bob, Dave} |
| 3 | {Alice, Bob, Eve} |
| 4 | {Alice, Charlie, Dave} |
| 5 | {Alice, Charlie, Eve} |
| 6 | {Alice, Dave, Eve} |
| 7 | {Bob, Charlie, Dave} |
| 8 | {Bob, Charlie, Eve} |
| 9 | {Bob, Dave, Eve} |
| 10 | {Charlie, Dave, Eve} |

> NOTE: Notice that **ABC = BAC = CAB**. In combinations, these are all the SAME team!

**Common MCQ patterns:**
- "How many ways to SELECT / CHOOSE" → Combination
- "How many COMMITTEES / TEAMS" → Combination
- "How many HANDSHAKES in a group" → C(n, 2)
- "How many SUBSETS of size r" → C(n, r)

\`\`\`python path=null start=null
import math
from itertools import combinations

# Combination formula: C(n,r) = n! / (r! × (n-r)!)
def C(n, r):
    return math.factorial(n) // (math.factorial(r) * math.factorial(n - r))

# Or use Python's built-in (cleaner)
print(f"C(5, 3) = {math.comb(5, 3)}")  # 10

# List all combinations to see they're unordered
candidates = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve']
teams = list(combinations(candidates, 3))
print(f"All {len(teams)} possible teams:")
for i, team in enumerate(teams, 1):
    print(f"  Team {i}: {team}")
\`\`\`

---

**Permutation vs Combination — The Ultimate Comparison:**

| | Permutation P(n,r) | Combination C(n,r) |
|:------|:-------------------|:-------------------|
| **Order** | Matters (ABC ≠ BAC) | Doesn't matter (ABC = BAC) |
| **Formula** | n!/(n-r)! | n!/(r!(n-r)!) |
| **Keywords** | arrange, line up, rank, password | select, choose, committee, team |
| **P(5,3)** | 60 | 10 |
| **Always** | P(n,r) ≥ C(n,r) | C(n,r) ≤ P(n,r) |

**Relationship:** P(n, r) = C(n, r) × r!

> TIP: **Why?** Permutations = (number of groups) × (ways to arrange each group)
> 60 = 10 × 6. Each of the 10 teams can be arranged in 3! = 6 ways.

\`\`\`python path=null start=null
# Verify: P(n,r) = C(n,r) × r!
n, r = 5, 3
P_nr = P(n, r)   # 60 (ordered arrangements)
C_nr = C(n, r)   # 10 (unordered selections)
r_fact = math.factorial(r)  # 3! = 6

print(f"P({n},{r}) = C({n},{r}) × {r}!")
print(f"{P_nr} = {C_nr} × {r_fact} = {C_nr * r_fact}")  # 60 = 10 × 6 (verified)
\`\`\`

---

#### 6.1 Additional Combination Properties

**Property:** If ⁿCₓ = ⁿCᵧ, then either x = y OR x + y = n

| Problem | Solution |
|:--------|:---------|
| ⁿC₇ = ⁿC₄, find n | 7 + 4 = **n = 11** |
| ⁴³C₍ᵣ₋₆₎ = ⁴³C₍₃ᵣ₊₁₎, find r | (r-6) + (3r+1) = 43 → 4r = 48 → **r = 12** |
| ²⁰C₂ = ²⁰C₁₈ | Verification: 2 + 18 = 20 ✓ |

**Summation Property:** Σ(k=0 to n) ⁿCₖ = 2ⁿ

So Σ(k=1 to 5) ⁵Cₖ = 2⁵ − ⁵C₀ = 32 − 1 = **31**

---

#### 6.2 Gap Method — No Two Objects Together

**Strategy:** Arrange the unrestricted objects first, then place constrained objects in the gaps between them.

**Example:** 4 White balls and 6 Yellow balls in a row, no two White balls together:

1. Place 6 Yellow balls first: Y Y Y Y Y Y
2. This creates 7 gaps: _ Y _ Y _ Y _ Y _ Y _ Y _
3. Choose 4 gaps for White balls: ⁷C₄ = ⁷C₃ = (7×6×5)/(3×2×1) = **35 ways**

> TIP: **General Rule:** n objects in a row create (n+1) gaps. Place the restricted objects in these gaps to guarantee they are never adjacent.

---

#### 6.3 Diagonals of a Polygon

**Formula:** Diagonals = ⁿC₂ − n = n(n−3)/2

**Example:** Octagon (n = 8):
- Total lines joining any 2 vertices: ⁸C₂ = (8×7)/2 = 28
- Subtract the 8 sides: 28 − 8 = **20 diagonals**

> TIP: **ⁿC₂ counts ALL possible line segments** (sides + diagonals). Subtracting n sides gives only diagonals.

---

#### 6.4 Constrained Selection Problems

**Committee Selection:**

| Problem | Method | Answer |
|:--------|:-------|:-------|
| 3 men from 6, 2 women from 5 | ⁶C₃ × ⁵C₂ = 20 × 10 | **200** |
| 3 men from 7, 2 women from 5 | ⁷C₃ × ⁵C₂ = 35 × 10 | **350** |

**Cricket Team with Constraints:**

| Constraint | Calculation | Answer |
|:-----------|:------------|:-------|
| No restriction: 11 from 15 | ¹⁵C₁₁ = ¹⁵C₄ | **1365** |
| Player X always chosen | 10 more from 14: ¹⁴C₁₀ | **1001** |
| Player X never chosen | 11 from 14: ¹⁴C₁₁ = ¹⁴C₃ | **364** |
| Exactly 2 bowlers from 5 (17 total) | ⁵C₂ × ¹²C₉ = 10 × 220 | **2200** |

**Question Paper with Minimum Constraints:**

Choose 10 questions: at least 4 from Part A (6 qs), at least 4 from Part B (7 qs):

| Distribution (A, B) | Calculation | Ways |
|:--------------------|:------------|:-----|
| (4, 6) | ⁶C₄ × ⁷C₆ = 15 × 7 | 105 |
| (5, 5) | ⁶C₅ × ⁷C₅ = 6 × 21 | 126 |
| (6, 4) | ⁶C₆ × ⁷C₄ = 1 × 35 | 35 |
| **Total** | | **266** |

**Finding (n, r) from ⁿPᵣ and ⁿCᵣ:**

If ⁿPᵣ = 1320 and ⁿCᵣ = 220:
- r! = ⁿPᵣ / ⁿCᵣ = 1320/220 = 6 → **r = 3**
- n(n-1)(n-2) = 1320 = 12 × 11 × 10 → **n = 12**
- Answer: **(n, r) = (12, 3)**

**Similarly:** If ⁿPᵣ = 840, ⁿCᵣ = 35:
- r! = 840/35 = 24 → **r = 4**

---

#### 6.5 Word Formation (Select then Arrange)

**Template:** Total = (selections) × (arrangements of selected items)

**INVOLUTE:** Form 5-letter words using 3 vowels + 2 consonants

Vowels: I, O, U, E (4). Consonants: N, V, L, T (4).
- Select 3 vowels: ⁴C₃ = 4
- Select 2 consonants: ⁴C₂ = 6
- Arrange 5 letters: 5! = 120
- **Total = 4 × 6 × 120 = 2880**

**Captain & Vice-Captain:**

Choose 8 players from 12, then assign captain + vice-captain:
- Select team: ¹²C₈ = ¹²C₄ = 495
- Assign captain and vice-captain (order matters): ⁸P₂ = 56
- **Total = 495 × 56 = 27720**

**n-digit Numbers from {2, 5, 7}:**

3 choices per digit, n digits: Total = 3ⁿ
Smallest n where 3ⁿ > 900: 3⁶ = 729 (not enough), 3⁷ = 2187 ✓ → **n = 7**

### 7. Pascal's Triangle & Properties

Pascal's Triangle is a visual arrangement where each number equals C(n, r).

**The Triangle with actual values:**

\`\`\`
Row 0:              1                    -- C(0,0)
Row 1:            1   1                  -- C(1,0) C(1,1)
Row 2:          1   2   1                -- C(2,0) C(2,1) C(2,2)
Row 3:        1   3   3   1              -- C(3,0) C(3,1) C(3,2) C(3,3)
Row 4:      1   4   6   4   1            -- C(4,0) ... C(4,4)
Row 5:    1   5  10  10   5   1          -- C(5,0) ... C(5,5)
\`\`\`

> TIP: **How to build it:** Each number = sum of the two numbers directly above it.
> Example: 6 = 3 + 3, 10 = 4 + 6, 10 = 6 + 4

**3 Key Properties (MCQ favorites):**

| Property | Formula | Example |
|:---------|:--------|:--------|
| **Edges are always 1** | C(n, 0) = C(n, n) = 1 | C(5,0) = C(5,5) = 1 |
| **Symmetry** | C(n, r) = C(n, n-r) | C(5,2) = C(5,3) = 10 |
| **Pascal's Identity** | C(n,r) = C(n-1,r-1) + C(n-1,r) | C(4,2) = C(3,1) + C(3,2) = 3+3 = 6 |

> TIP: **Row Sum:** Each row sums to 2ⁿ. Row 3: 1+3+3+1 = 8 = 2³
> This makes sense because the total subsets of an n-element set = 2ⁿ!

**Exam Shortcuts using Pascal's Triangle:**
- Need C(4,2)? Go to Row 4, position 2 → **6**
- Need C(5,3)? Row 5, position 3 → **10**
- Don't want to calculate? Use symmetry: C(10,8) = C(10,2) = 45 (much easier!)

\`\`\`python path=null start=null
import math

def pascals_triangle(rows):
    """Generate Pascal's triangle — each entry is C(n, r)"""
    triangle = []
    for n in range(rows):
        row = [math.comb(n, r) for r in range(n + 1)]
        triangle.append(row)
    return triangle

# Display the triangle
for i, row in enumerate(pascals_triangle(6)):
    padding = "  " * (5 - i)
    values = "  ".join(str(x).center(4) for x in row)
    print(f"Row {i}: {padding}{values}")

# Verify properties:
print(f"\nProperty 1: C(5,0) = C(5,5) = {math.comb(5,0)}")  # 1
print(f"Property 2: C(5,2) = C(5,3) = {math.comb(5,2)}")  # 10 (symmetry)
print(f"Property 3: C(4,2) = C(3,1) + C(3,2) = {math.comb(3,1)} + {math.comb(3,2)} = {math.comb(4,2)}")  # 6
print(f"Row 5 sum: {sum(math.comb(5, r) for r in range(6))} = 2^5 = {2**5}")  # 32
\`\`\`

### 8. Applications in Computer Science

Set theory and combinatorics appear EVERYWHERE in CS. Here are the top connections:

**1. Algorithm Analysis — Why O(2ⁿ) is Bad:**

The brute-force approach to many problems involves checking ALL subsets → 2ⁿ possibilities.

| n (items) | 2ⁿ (subsets) | Time at 1M ops/sec |
|:----------|:-------------|:-------------------|
| 10 | 1,024 | < 1ms |
| 20 | 1,048,576 | ~1 second |
| 30 | 1,073,741,824 | ~18 minutes |
| 50 | ~10¹⁵ | ~31 years! |

> This is WHY we need dynamic programming and greedy algorithms — to avoid 2ⁿ brute force!

\`\`\`python path=null start=null
# Power set → brute force subset sum
items = [1, 2, 3, 4, 5]
n = len(items)
total_subsets = 2 ** n  # Each item: include or exclude
print(f"n={n} items → {total_subsets} subsets to check")
print(f"n=20 items → {2**20:,} subsets")  # Over 1 million!
print(f"n=30 items → {2**30:,} subsets")  # Over 1 billion!
\`\`\`

---

**2. Database Queries — SQL uses Set Operations!**

| SQL Operation | Set Operation | Symbol |
|:-------------|:--------------|:-------|
| UNION | A ∪ B | Merge results |
| INTERSECT | A ∩ B | Common results |
| EXCEPT | A - B | Rows in A not in B |
| INNER JOIN | A ∩ B (conceptually) | Matching rows |

\`\`\`python path=null start=null
# SQL-like operations using Python sets
users_usa = {'u1', 'u2', 'u3'}       # WHERE country = 'USA'
premium_users = {'u2', 'u3', 'u4'}   # WHERE plan = 'premium'

# INTERSECT: USA users who are premium
usa_premium = users_usa & premium_users
print(f"SELECT * FROM users WHERE country='USA' INTERSECT premium")
print(f"Result: {usa_premium}")  # {'u2', 'u3'}

# UNION: All users from either group
all_users = users_usa | premium_users
print(f"SELECT * FROM usa_users UNION premium_users")
print(f"Result: {all_users}")  # {'u1', 'u2', 'u3', 'u4'}

# EXCEPT: USA users who are NOT premium
usa_free = users_usa - premium_users
print(f"SELECT * FROM usa_users EXCEPT premium_users")
print(f"Result: {usa_free}")  # {'u1'}
\`\`\`

---

**3. Probability — Combinations in Action:**

Probability = (favorable outcomes) / (total outcomes)

Combinations help count both!

**Example:** Probability of exactly 3 heads in 5 coin flips:
- Step 1: How many ways to choose WHICH 3 flips are heads? → C(5,3) = 10
- Step 2: Total possible outcomes = 2⁵ = 32
- Step 3: P = 10/32 = **0.3125** (31.25%)

\`\`\`python path=null start=null
import math

# P(exactly k heads in n flips)
n_flips = 5
k_heads = 3

# Step 1: Choose which flips are heads
favorable = math.comb(n_flips, k_heads)  # C(5,3) = 10

# Step 2: Total outcomes
total = 2 ** n_flips  # 32

# Step 3: Probability
probability = favorable / total
print(f"Ways to get exactly {k_heads} heads: C({n_flips},{k_heads}) = {favorable}")
print(f"Total outcomes: 2^{n_flips} = {total}")
print(f"P({k_heads} heads in {n_flips} flips) = {favorable}/{total} = {probability:.4f}")
\`\`\`

---

## TL;DR - Quick Recall

| Concept | Formula/Key Point |
|:--------|:------------------|
| **Union (∪)** | A ∪ B = elements in A OR B |
| **Intersection (∩)** | A ∩ B = elements in A AND B |
| **Difference (-)** | A - B = elements in A but not B |
| **Symmetric Diff (△)** | A △ B = (A ∪ B) - (A ∩ B) |
| **Complement** | A' = U - A |
| **De Morgan's 1** | (A ∪ B)' = A' ∩ B' |
| **De Morgan's 2** | (A ∩ B)' = A' ∪ B' |
| **Cardinality** | n(A) = number of elements in A |
| **Inclusion-Exclusion** | n(A ∪ B) = n(A) + n(B) - n(A ∩ B) |
| **Power Set** | Size of P(A) = 2^n |
| **Factorial** | n! = n × (n-1) × ... × 1 |
| **Permutation** | P(n,r) = n!/(n-r)! — order matters |
| **Combination** | C(n,r) = n!/(r!(n-r)!) — order doesn't matter |
| **P vs C** | P(n,r) = C(n,r) × r! |
| **Cartesian Product** | n(A × B) = n(A) × n(B) |
| **Functions A→B** | Total = n(B)^n(A) |
| **Reflexive** | (a,a) ∈ R for all a ∈ A |
| **Symmetric** | (a,b) ∈ R → (b,a) ∈ R |
| **Transitive** | (a,b),(b,c) ∈ R → (a,c) ∈ R |

**Python Set Operations:**
\`\`\`python
A | B   # Union
A & B   # Intersection
A - B   # Difference
A ^ B   # Symmetric difference
len(A)  # Cardinality
\`\`\`

---

## Additional Resources

**Interactive:**
- [Set Theory Visualizer](https://www.mathsisfun.com/sets/venn-diagrams.html)
- [Permutation/Combination Calculator](https://www.calculatorsoup.com/calculators/discretemathematics/permutations.php)

**Books:**
- "Discrete Mathematics and Its Applications" by Kenneth Rosen
- "Concrete Mathematics" by Graham, Knuth, Patashnik

**Videos:**
- [3Blue1Brown - Counting](https://www.youtube.com/watch?v=8idr1WZ1A7Q)
- [MIT OpenCourseWare - Mathematics for Computer Science](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/)
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
        "Formula: |P(A)| = 2^n where n = number of elements.\n\nStep-by-step:\n• Given: n = 4 elements\n• Apply formula: |P(A)| = 2^4\n• Calculate: 2 × 2 × 2 × 2 = 16\n\nWhy 2^n? Each element has 2 choices: include or exclude. For 4 elements, that's 2×2×2×2 = 16 possible subsets (including ∅ and A itself).",
      difficulty: "easy",
    },
    {
      id: "set-q2",
      question:
        "In a group of 60 students, 25 play Cricket, 30 play Football, and 24 play neither. How many play BOTH?",
      options: ["10", "15", "19", "20"],
      correctAnswer: 2,
      explanation:
        "Formula: n(C ∪ F) = n(C) + n(F) - n(C ∩ F)\n\nStep-by-step:\n• Total students = 60, Neither = 24\n• Students playing at least one sport: n(C ∪ F) = 60 - 24 = 36\n• Apply Inclusion-Exclusion:\n  36 = 25 + 30 - n(C ∩ F)\n  36 = 55 - n(C ∩ F)\n  n(C ∩ F) = 55 - 36 = 19\n\nWhy subtract intersection? When adding C + F, we count the overlap twice. So we subtract it once to get the correct union count.",
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
        "Formula: A △ B = (A ∪ B) - (A ∩ B) = (A - B) ∪ (B - A)\n\nStep-by-step:\n• Symmetric difference = elements in A OR B, but NOT both\n• Method 1: Take union (everything) minus intersection (overlap)\n• Method 2: Take only-A plus only-B (both crescents)\n\nOption A is wrong because it uses ∩ instead of ∪ for combining the differences.\nOption B is correct: Union minus Intersection.",
      difficulty: "medium",
    },
    {
      id: "set-q4",
      question:
        "If A = {1, 2} and B = {a, b, c}, what is the cardinality of A × B?",
      options: ["5", "6", "8", "9"],
      correctAnswer: 1,
      explanation:
        "Formula: |A × B| = |A| × |B|\n\nStep-by-step:\n• |A| = 2 elements: {1, 2}\n• |B| = 3 elements: {a, b, c}\n• |A × B| = 2 × 3 = 6\n\nCartesian Product creates all ordered pairs:\nA × B = {(1,a), (1,b), (1,c), (2,a), (2,b), (2,c)}\nThat's 6 pairs total.",
      difficulty: "easy",
    },
    {
      id: "set-q5",
      question: "According to De Morgan's Laws, what is (A ∪ B)' equal to?",
      options: ["A' ∪ B'", "A' ∩ B'", "A ∩ B", "A' ∪ B"],
      correctAnswer: 1,
      explanation:
        "De Morgan's Laws:\n• (A ∪ B)' = A' ∩ B' (complement of union = intersection of complements)\n• (A ∩ B)' = A' ∪ B' (complement of intersection = union of complements)\n\nIntuition:\n• NOT (in A OR in B) = NOT in A AND NOT in B\n• If you're outside the union, you must be outside BOTH sets simultaneously.\n\nMemory trick: When you take complement, ∪ becomes ∩ and vice versa.",
      difficulty: "easy",
    },
    {
      id: "set-q6",
      question: "How many ways can 5 people be arranged in a line?",
      options: ["25", "60", "120", "125"],
      correctAnswer: 2,
      explanation:
        "Formula: n! (n factorial) for arranging n distinct objects in a line.\n\nStep-by-step:\n• n = 5 people\n• Arrangements = 5! = 5 × 4 × 3 × 2 × 1 = 120\n\nWhy factorial? First position has 5 choices, second has 4 remaining, third has 3, and so on.",
      difficulty: "easy",
    },
    {
      id: "set-q7",
      question:
        "From 8 students, how many ways can we select a committee of 3?",
      options: ["24", "56", "336", "512"],
      correctAnswer: 1,
      explanation:
        "Formula: C(n,r) = n! / [r!(n-r)!] (Combinations - order doesn't matter)\n\nStep-by-step:\n• n = 8, r = 3\n• C(8,3) = 8! / (3! × 5!)\n• = (8 × 7 × 6) / (3 × 2 × 1)\n• = 336 / 6 = 56\n\nWhy divide by r!? Because selecting {A,B,C} is same as {B,A,C}, we remove duplicate orderings.",
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
        "Properties of Relations:\n• Reflexive: (a,a) ∈ R for ALL a ∈ A (every element relates to itself)\n• Symmetric: (a,b) ∈ R ⟹ (b,a) ∈ R (Option A)\n• Transitive: (a,b) ∈ R and (b,c) ∈ R ⟹ (a,c) ∈ R (Option C)\n\nExample: '≤' on integers is reflexive because a ≤ a for all a.",
      difficulty: "medium",
    },
    {
      id: "set-q9",
      question:
        "If |A| = 3 and |B| = 4, how many functions f: A → B are possible?",
      options: ["7", "12", "64", "81"],
      correctAnswer: 2,
      explanation:
        "Formula: |B|^|A| = number of functions from A to B\n\nStep-by-step:\n• |A| = 3 (domain has 3 elements)\n• |B| = 4 (codomain has 4 elements)\n• Each element in A can map to ANY of 4 elements in B\n• Total functions = 4 × 4 × 4 = 4³ = 64\n\nWhy 4³? Each of the 3 elements in A independently chooses from 4 options.",
      difficulty: "medium",
    },
    {
      id: "set-q10",
      question:
        "Using the multiplication principle: If there are 4 routes from A to B and 3 routes from B to C, how many routes are there from A to C via B?",
      options: ["7", "12", "1", "24"],
      correctAnswer: 1,
      explanation:
        "Multiplication Principle: If task 1 can be done in m ways AND task 2 can be done in n ways, then both tasks can be done in m × n ways.\n\nStep-by-step:\n• Routes A → B = 4 ways\n• Routes B → C = 3 ways\n• Routes A → C via B = 4 × 3 = 12 ways\n\nWhy multiply? For EACH of the 4 choices from A to B, there are 3 choices from B to C.",
      difficulty: "easy",
    },
    {
      id: "set-q11",
      question:
        "In a survey of 600 students, 150 take tea and 225 take coffee. If 100 take both, how many take neither?",
      options: ["275", "325", "375", "425"],
      correctAnswer: 1,
      explanation:
        "Inclusion-Exclusion + Complement approach:\n\nStep-by-step:\n• n(T) = 150, n(C) = 225, n(T ∩ C) = 100\n• n(T ∪ C) = n(T) + n(C) − n(T ∩ C) = 150 + 225 − 100 = 275\n• Neither = n(U) − n(T ∪ C) = 600 − 275 = 325\n\nThis uses: n(A' ∩ B') = n((A ∪ B)') = n(U) − n(A ∪ B) — De Morgan's Law applied to cardinality.",
      difficulty: "medium",
    },
    {
      id: "set-q12",
      question:
        "How many distinct permutations can be made from the letters of the word MISSISSIPPI?",
      options: ["11!", "34650", "39916800", "7920"],
      correctAnswer: 1,
      explanation:
        "Formula: n!/(p!×q!×r!) for repeated elements.\n\nMISSISSIPPI has 11 letters:\n• M=1, I=4, S=4, P=2\n• Total = 11!/(4!×4!×2!)\n• = 39916800/(24×24×2)\n• = 39916800/1152 = 34650",
      difficulty: "medium",
    },
    {
      id: "set-q13",
      question:
        "In how many ways can 6 people be seated around a circular table?",
      options: ["720", "120", "360", "60"],
      correctAnswer: 1,
      explanation:
        "Circular permutation formula: (n-1)!\n\n• n = 6 people\n• Arrangements = (6-1)! = 5! = 120\n\nWhy (n-1)!? In a circle, rotations of the same arrangement are identical. Fixing one person's position removes rotational symmetry.",
      difficulty: "easy",
    },
    {
      id: "set-q14",
      question: "How many diagonals does a decagon (10-sided polygon) have?",
      options: ["20", "35", "45", "25"],
      correctAnswer: 1,
      explanation:
        "Formula: Diagonals = ⁿC₂ − n = n(n−3)/2\n\n• n = 10\n• Total lines = ¹⁰C₂ = 45\n• Subtract sides: 45 − 10 = 35\n• Or directly: 10(10−3)/2 = 10×7/2 = 35",
      difficulty: "medium",
    },
    {
      id: "set-q15",
      question: "If ⁿC₇ = ⁿC₄, what is the value of n?",
      options: ["3", "7", "11", "28"],
      correctAnswer: 2,
      explanation:
        "Property: If ⁿCₓ = ⁿCᵧ, then x = y OR x + y = n.\n\nSince 7 ≠ 4, we use x + y = n:\n7 + 4 = n → n = 11",
      difficulty: "easy",
    },
    {
      id: "set-q16",
      question:
        "In how many ways can a cricket team of 11 be chosen from 17 players with exactly 2 bowlers out of 5 available bowlers?",
      options: ["1320", "2200", "4400", "3300"],
      correctAnswer: 1,
      explanation:
        "Select bowlers and non-bowlers separately:\n\n• Choose 2 bowlers from 5: ⁵C₂ = 10\n• Choose remaining 9 from 12 non-bowlers: ¹²C₉ = ¹²C₃ = 220\n• Total = 10 × 220 = 2200",
      difficulty: "medium",
    },
    {
      id: "set-q17",
      question:
        "How many words (with or without meaning) of 3 vowels and 2 consonants can be formed from INVOLUTE?",
      options: ["120", "2880", "720", "1440"],
      correctAnswer: 1,
      explanation:
        "INVOLUTE: Vowels = {I,O,U,E} (4), Consonants = {N,V,L,T} (4).\n\n• Select 3 vowels from 4: ⁴C₃ = 4\n• Select 2 consonants from 4: ⁴C₂ = 6\n• Arrange 5 selected letters: 5! = 120\n• Total = 4 × 6 × 120 = 2880",
      difficulty: "hard",
    },
    {
      id: "set-q18",
      question:
        "The word SACHIN is arranged alphabetically. What is its rank/serial number?",
      options: ["600", "601", "602", "720"],
      correctAnswer: 1,
      explanation:
        "Letters in order: A, C, H, I, N, S\n\n• Words before S: each of A,C,H,I,N starts 5! = 120 words\n• Total before S: 5 × 120 = 600\n• First word starting with S in alphabetical order: S-A-C-H-I-N = SACHIN\n• Rank = 600 + 1 = 601",
      difficulty: "hard",
    },
  ],
};
