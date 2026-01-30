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

Example: In a class of 50 students:
- 30 play cricket
- 25 play football  
- 10 play both

\`\`\`python path=null start=null
# Using inclusion-exclusion
cricket = 30
football = 25
both = 10

# Students playing at least one sport
either = cricket + football - both
print(f"Play at least one sport: {either}")  # 45

# Students playing only cricket
only_cricket = cricket - both
print(f"Only cricket: {only_cricket}")  # 20

# Students playing only football
only_football = football - both
print(f"Only football: {only_football}")  # 15

# Students playing neither
neither = 50 - either
print(f"Neither sport: {neither}")  # 5
\`\`\`

### 3. Set Operations

**Union (∪):**
All elements in either A or B (or both).

A ∪ B = {x | x ∈ A or x ∈ B}

\`\`\`python path=null start=null
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

# Union
A_union_B = A | B  # or A.union(B)
print(f"A ∪ B = {A_union_B}")  # {1, 2, 3, 4, 5, 6}

# Practical: Merge user permissions from multiple roles
admin_permissions = {'read', 'write', 'delete', 'admin'}
editor_permissions = {'read', 'write'}
all_permissions = admin_permissions | editor_permissions
\`\`\`

**Intersection (∩):**
Only elements in both A and B.

A ∩ B = {x | x ∈ A and x ∈ B}

\`\`\`python path=null start=null
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

# Intersection
A_intersect_B = A & B  # or A.intersection(B)
print(f"A ∩ B = {A_intersect_B}")  # {3, 4}

# Practical: Find common friends between two users
user1_friends = {'alice', 'bob', 'charlie'}
user2_friends = {'bob', 'charlie', 'dave'}
common_friends = user1_friends & user2_friends  # {'bob', 'charlie'}
\`\`\`

**Difference (A - B):**
Elements in A but not in B.

A - B = {x | x ∈ A and x ∉ B}

\`\`\`python path=null start=null
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

# Set difference
A_minus_B = A - B  # or A.difference(B)
print(f"A - B = {A_minus_B}")  # {1, 2}

# Practical: Find items to remove from cache
cached_items = {'item1', 'item2', 'item3'}
valid_items = {'item2', 'item3', 'item4'}
items_to_remove = cached_items - valid_items  # {'item1'}
\`\`\`

**Complement (A'):**
All elements in universal set U but not in A.

A' = U - A = {x | x ∈ U and x ∉ A}

**Symmetric Difference (A △ B):**
Elements in either A or B, but not both.

\`\`\`python path=null start=null
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

# Symmetric difference
symmetric = A ^ B  # or A.symmetric_difference(B)
print(f"A △ B = {symmetric}")  # {1, 2, 5, 6}
\`\`\`

### 3. Cardinality

**Cardinality** is the number of elements in a set.

|A| = number of elements in A

\`\`\`python path=null start=null
A = {1, 2, 3, 4, 5}
print(f"|A| = {len(A)}")  # 5

# Empty set cardinality
print(f"|∅| = {len(set())}")  # 0
\`\`\`

**Cardinality of Union (Inclusion-Exclusion Principle):**

For two sets:
|A ∪ B| = |A| + |B| - |A ∩ B|

For three sets:
|A ∪ B ∪ C| = |A| + |B| + |C| - |A ∩ B| - |A ∩ C| - |B ∩ C| + |A ∩ B ∩ C|

\`\`\`python path=null start=null
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

# Verify inclusion-exclusion
union_size = len(A | B)
calculated = len(A) + len(B) - len(A & B)
print(f"|A ∪ B| = {union_size}")  # 6
print(f"|A| + |B| - |A ∩ B| = {calculated}")  # 6

# Practical: Count unique visitors across platforms
mobile_users = 5000
web_users = 8000
both_platforms = 2000
total_unique = mobile_users + web_users - both_platforms  # 11000
\`\`\`

### 4. Power Set

The **power set** P(A) is the set of all subsets of A.

If |A| = n, then |P(A)| = 2ⁿ

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
    print(f"  {set(subset) if subset else '{}'}")

print(f"|P(A)| = {len(P_A)}")  # 8 = 2³
\`\`\`

### 5. Permutations

**Permutation** is an ordered arrangement of objects.

**Formula:** P(n, r) = n! / (n-r)!

Where n! = n × (n-1) × (n-2) × ... × 2 × 1

\`\`\`python path=null start=null
import math
from itertools import permutations

# Factorial
n = 5
print(f"{n}! = {math.factorial(n)}")  # 120

# Permutations: P(n, r) = n!/(n-r)!
def P(n, r):
    return math.factorial(n) // math.factorial(n - r)

# Example: How many 3-letter codes from 5 letters (A, B, C, D, E)?
n, r = 5, 3
print(f"P({n}, {r}) = {P(n, r)}")  # 60

# List all permutations
letters = ['A', 'B', 'C', 'D', 'E']
all_perms = list(permutations(letters, 3))
print(f"First 5 permutations: {all_perms[:5]}")
print(f"Total: {len(all_perms)}")  # 60
\`\`\`

**Practical Applications:**
- Password possibilities (character arrangements)
- Task scheduling (order of operations)
- Tournament rankings

### 6. Combinations

**Combination** is an unordered selection of objects.

**Formula:** C(n, r) = n! / (r! × (n-r)!)

Also written as (n choose r) or ⁿCᵣ

\`\`\`python path=null start=null
import math
from itertools import combinations

# Combination formula
def C(n, r):
    return math.factorial(n) // (math.factorial(r) * math.factorial(n - r))

# Or use math.comb (Python 3.8+)
print(f"C(5, 3) = {math.comb(5, 3)}")  # 10

# Example: Select 3 team members from 5 candidates
candidates = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve']
teams = list(combinations(candidates, 3))
print(f"Possible teams ({len(teams)} total):")
for team in teams:
    print(f"  {team}")
\`\`\`

**Key Difference from Permutations:**
- Permutation: Order matters (ABC ≠ BAC)
- Combination: Order doesn't matter (ABC = BAC = CAB)

**Relationship:** P(n, r) = C(n, r) × r!

\`\`\`python path=null start=null
# Verify relationship
n, r = 5, 3
P_nr = P(n, r)  # 60
C_nr = C(n, r)  # 10
r_factorial = math.factorial(r)  # 6

print(f"P({n},{r}) = C({n},{r}) × {r}!")
print(f"{P_nr} = {C_nr} × {r_factorial} = {C_nr * r_factorial}")  # 60 = 10 × 6
\`\`\`

### 7. Pascal's Triangle & Properties

Pascal's Triangle gives combination values:

\`\`\`
         C(0,0)
       C(1,0) C(1,1)
     C(2,0) C(2,1) C(2,2)
   C(3,0) C(3,1) C(3,2) C(3,3)
\`\`\`

**Properties:**
1. C(n, 0) = C(n, n) = 1
2. C(n, r) = C(n, n-r) (symmetry)
3. C(n, r) = C(n-1, r-1) + C(n-1, r) (Pascal's identity)

\`\`\`python path=null start=null
def pascals_triangle(rows):
    """Generate Pascal's triangle"""
    triangle = []
    for n in range(rows):
        row = [math.comb(n, r) for r in range(n + 1)]
        triangle.append(row)
    return triangle

# Display
for i, row in enumerate(pascals_triangle(6)):
    padding = "  " * (5 - i)
    values = "  ".join(str(x).center(4) for x in row)
    print(padding + values)
\`\`\`

### 8. Applications in Computer Science

**1. Algorithm Analysis:**
\`\`\`python path=null start=null
# Counting subsets for subset sum problem
items = [1, 2, 3, 4, 5]
n = len(items)
total_subsets = 2 ** n  # 32

# Time complexity: O(2^n) for brute force
print(f"Brute force checks {total_subsets} subsets")
\`\`\`

**2. Database Queries:**
\`\`\`python path=null start=null
# Set operations in SQL-like queries
users_usa = {'u1', 'u2', 'u3'}
premium_users = {'u2', 'u3', 'u4'}

# Users in USA who are premium (INNER JOIN analogy)
usa_premium = users_usa & premium_users

# All unique users (UNION)
all_users = users_usa | premium_users

print(f"USA Premium: {usa_premium}")
print(f"All users: {all_users}")
\`\`\`

**3. Probability Calculations:**
\`\`\`python path=null start=null
# Probability of getting exactly 3 heads in 5 coin flips
# This is C(5,3) × (0.5)^3 × (0.5)^2

n_flips = 5
k_heads = 3
ways = math.comb(n_flips, k_heads)  # 10 ways
probability = ways * (0.5 ** n_flips)
print(f"P(3 heads in 5 flips) = {probability:.4f}")  # 0.3125
\`\`\`

---

## TL;DR - Quick Recall

| Concept | Formula/Key Point |
|:--------|:------------------|
| **Union (∪)** | A ∪ B = elements in A OR B |
| **Intersection (∩)** | A ∩ B = elements in A AND B |
| **Difference (-)** | A - B = elements in A but not B |
| **Cardinality** | |A| = number of elements |
| **Inclusion-Exclusion** | |A ∪ B| = |A| + |B| - |A ∩ B| |
| **Power Set** | |P(A)| = 2^|A| |
| **Factorial** | n! = n × (n-1) × ... × 1 |
| **Permutation** | P(n,r) = n!/(n-r)! (order matters) |
| **Combination** | C(n,r) = n!/(r!(n-r)!) (order doesn't matter) |

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
  ],
};
