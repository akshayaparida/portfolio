import { LearningModule } from "@/types/learning";

export const setTheoryModule: LearningModule = {
  id: "set-theory",
  title: "Set Theory & Combinatorics",
  description:
    "Discrete foundations for data structures, algorithms, and logical reasoning",
  status: "in-progress",
  detailedContent: `# Set Theory & Combinatorics

Set theory and combinatorics form the discrete mathematical foundation essential for computer science, data structures, algorithm analysis, and probability theory.

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
};
