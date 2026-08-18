import { LearningModule } from "@/types/learning";

export const basicMathModule: LearningModule = {
  id: "basic-math",
  title: "Foundations of Counting & Combinatorics (Week 1)",
  description:
    "IIT Ropar Discrete Mathematics (Week 1) — Counting principles, Rule of Sum & Product, Factorial explosion, Catalan numbers, and the Pigeonhole Principle.",
  status: "in-progress",
  detailedContent: `# Foundations of Counting & Combinatorics (Week 1)

Counting is the foundational heartbeat of **Discrete Mathematics** and **Computer Science**. From determining the computational complexity of an algorithm and analyzing state spaces in artificial intelligence to ensuring cryptographic security through massive key spaces, mastering rigorous counting principles is indispensable.

This module follows **Week 1 of Discrete Mathematics (IIT Ropar — Prof. Sudarshan Iyengar)** on NPTEL, exploring fundamental counting laws, exponential growth, combinatorial explosion, Catalan numbers, and the Pigeonhole Principle.

---

## What You'll Learn

| # | Topic | Key Skill / Outcome |
| :--- | :--- | :--- |
| 1 | **Motivation for Counting** | Understand why counting determines algorithmic feasibility, complexity, and security |
| 2 | **The Paper Folding Problem** | Comprehend explosive exponential growth ($2^n$) and physical scale limits |
| 3 | **Rubik's Cube State Space** | Quantify combinatorial permutations ($4.3 \times 10^{19}$ states) and God's Number |
| 4 | **Factorial Growth ($n!$)** | Analyze permutations, Stirling's approximation, and the Travelling Salesperson search space |
| 5 | **Counting in Computer Science** | Calculate password entropy ($A^L$), bitstrings ($2^n$), and network topologies |
| 6 | **Rule of Sum (Addition Principle)** | Count disjoint, mutually exclusive events and handle non-disjoint unions |
| 7 | **Rule of Product (Multiplication Principle)** | Count independent sequential stages and Cartesian product outcomes |
| 8 | **Permutations & Combinations** | Distinguish between ordered arrangements $P(n, r)$ and unordered selections $C(n, r)$ |
| 9 | **Motivation for Catalan Numbers** | Recognize recursive structures in parentheses matching, Dyck paths, and binary trees |
| 10 | **The Pigeonhole Principle** | Apply basic and generalized Dirichlet principles to guarantee collisions and bounds |

---

## 1. Motivation for Counting in Computer Science

Why do computer scientists care about counting?
In continuous mathematics (calculus), we measure smooth quantities like time, velocity, and area. In **computer science**, everything is digital, discrete, and finite.

Computers operate on discrete states:
- **Algorithm Analysis**: How many operations does an algorithm execute for an input of size $n$? (e.g., $O(n^2)$, $O(2^n)$, $O(n!)$).
- **Search Space Feasibility**: Can a computer brute-force search all possible solutions in polynomial time, or is the search space astronomically large?
- **Cryptography & Security**: How many attempts must an attacker make to guess an encryption key or crack a password?
- **Network Topologies & Memory**: How many distinct connections exist among $n$ distributed servers? ($C(n, 2) = \\frac{n(n-1)}{2}$).

> [!TIP]
> **Core Insight:** If you can count the number of states in a problem, you can immediately determine whether an exact solution can be computed in milliseconds, years, or millennia.

---

## 2. The Paper Folding Problem: Power of $2^n$

Consider a standard sheet of paper of thickness $0.1\\text{ mm}$ ($10^{-4}\\text{ m}$).
Every time you fold the paper in half, the thickness doubles.

| Number of Folds ($n$) | Number of Layers ($2^n$) | Total Thickness | Real-World Comparison |
| :--- | :--- | :--- | :--- |
| **0** | $2^0 = 1$ | $0.1\\text{ mm}$ | Single sheet of paper |
| **1** | $2^1 = 2$ | $0.2\\text{ mm}$ | Cardstock |
| **7** | $2^7 = 128$ | $1.28\\text{ cm}$ | Small notebook |
| **14** | $2^{14} = 16,384$ | $1.64\\text{ meters}$ | Height of an adult |
| **20** | $2^{20} = 1,048,576$ | $104.85\\text{ meters}$ | Height of Big Ben / 30-story building |
| **30** | $2^{30} \\approx 1.07 \\times 10^9$ | $107.37\\text{ km}$ | Crosses the Kármán Line into outer space |
| **42** | $2^{42} \\approx 4.40 \\times 10^{12}$ | $439,804\\text{ km}$ | **Reaches the Moon** (Moon distance: $\\approx 384,400\\text{ km}$) |
| **51** | $2^{51} \\approx 2.25 \\times 10^{15}$ | $225,179,981\\text{ km}$ | **Reaches the Sun** (Sun distance: $\\approx 149,600,000\\text{ km}$) |

\`\`\`python
def paper_fold_thickness(num_folds: int, base_thickness_mm: float = 0.1) -> float:
    """Calculates thickness in meters after n folds."""
    thickness_meters = (base_thickness_mm / 1000.0) * (2 ** num_folds)
    return thickness_meters

for folds in [10, 20, 30, 42, 51]:
    m = paper_fold_thickness(folds)
    km = m / 1000.0
    print(f"Folds: {folds:2d} | Layers: 2^{folds:<2d} | Thickness: {km:,.2f} km")
\`\`\`

> [!NOTE]
> **Takeaway:** Exponential functions ($2^n$) grow faster than any polynomial function ($n^k$). What begins deceptively small quickly eclipses astronomical scales.

---

## 3. Rubik's Cube Combinatorial State Space

A standard $3 \\times 3 \\times 3$ Rubik's cube has $6$ colored faces, $8$ corner pieces, and $12$ edge pieces. How many valid configurations can be reached by turning the faces?

### Calculation Breakdown:
1. **8 Corner Pieces**: Can be arranged in $8!$ ways. Each corner has $3$ possible orientations ($3^8$ ways). Because orientation of the last corner is fixed by the rest: $3^{8-1} = 3^7$ independent orientations.
2. **12 Edge Pieces**: Can be arranged in $12!$ ways. Each edge has $2$ possible orientations ($2^{12}$ ways). Because the orientation of the last edge is fixed: $2^{12-1} = 2^{11}$ independent orientations.
3. **Parity Constraint**: Half of all reachable permutations are unreachable without taking the cube apart (dividing by $2$).

$$\\text{Total Valid Configurations} = \\frac{8! \\times 3^7 \\times 12! \\times 2^{11}}{2} = 43,252,003,274,489,856,000 \\approx 4.33 \\times 10^{19}$$

$$\\text{43 Quintillion, 252 Quadrillion States}$$

> [!IMPORTANT]
> **God's Number:** In 2010, mathematicians and computer scientists proved using supercomputers that **every single one of these 43 quintillion states can be solved in 20 moves or fewer**.

---

## 4. Factorial Growth & Combinatorial Explosion ($n!$)

When arranging $n$ distinct objects in a line, the number of permutations is $n! = n \\times (n-1) \\times (n-2) \\times \\cdots \\times 1$.

| $n$ | $n!$ | Approximate Value | Computational Context |
| :--- | :--- | :--- | :--- |
| **5** | 120 | $1.2 \\times 10^2$ | Instantaneous |
| **10** | 3,628,800 | $3.63 \\times 10^6$ | $3.6$ million operations ($< 1\\text{ ms}$) |
| **15** | 1,307,674,368,000 | $1.31 \\times 10^{12}$ | $1.3$ trillion (few seconds on modern CPU) |
| **20** | 2,432,902,008,176,640,000 | $2.43 \\times 10^{18}$ | $\\approx 77$ years on a 1 GHz processor |
| **25** | $15,511,210,043,330,985,984,000,000$ | $1.55 \\times 10^{25}$ | Longer than the age of the Universe |
| **52** | $52!$ (Deck of cards) | $8.06 \\times 10^{67}$ | More than atoms in our Galaxy |

\`\`\`text
Standard 52-card deck:
52! ≈ 80,658,175,170,943,878,571,660,636,856,403,766,975,289,505,440,883,277,824,000,000,000,000
Every time you thoroughly shuffle a deck of cards, it is virtually 100% certain
that exact sequence of 52 cards has NEVER existed in human history.
\`\`\`

### Travelling Salesperson Problem (TSP):
Given $n$ cities, finding the shortest round-trip route by brute-force checking all $(n-1)! / 2$ routes becomes physically impossible for $n \\ge 30$, motivating the need for dynamic programming and approximation heuristics.

---

## 5. The Rule of Sum (Addition Principle)

If a first task can be performed in $m$ distinct ways, and a second task can be performed in $n$ distinct ways, and the two tasks **cannot be done simultaneously (they are mutually exclusive / disjoint)**, then performing either the first task or the second task can be done in:

$$\\text{Total Ways} = m + n$$

In set-theoretic terms:
$$|A \\cup B| = |A| + |B| \\quad \\text{when } A \\cap B = \\emptyset$$

### Non-Disjoint Sets (Inclusion-Exclusion Principle):
If the tasks or sets have common elements ($A \\cap B \\neq \\emptyset$):
$$|A \\cup B| = |A| + |B| - |A \\cap B|$$

### Example Problem:
*A university student can choose a computer science project from one of 3 lists: List A has 15 AI projects, List B has 12 Cybersecurity projects, and List C has 8 Web projects. No project appears in more than one list. How many choices does the student have?*

$$\\text{Total Choices} = 15 + 12 + 8 = 35\\text{ choices}$$

---

## 6. The Rule of Product (Multiplication Principle)

If a procedure can be broken down into a sequence of two independent stages, where Stage 1 has $m$ possible outcomes and Stage 2 has $n$ possible outcomes regardless of the choice in Stage 1, then the total number of ways to complete the procedure is:

$$\\text{Total Ways} = m \\times n$$

In set-theoretic terms:
$$|A \\times B| = |A| \\times |B|$$

Extended to $k$ sequential stages:
$$\\text{Total Ways} = n_1 \\times n_2 \\times n_3 \\times \\cdots \\times n_k$$

### Classic Examples:

1. **Bitstrings of Length $n$**:
   Each bit has 2 choices ($0$ or $1$).
   $$\\underbrace{2 \\times 2 \\times \\cdots \\times 2}_{n \\text{ times}} = 2^n$$
   A 32-bit integer can represent $2^{32} = 4,294,967,296$ unique values.

2. **Password Search Space**:
   A password of length 8 containing lowercase letters, uppercase letters, and digits ($26 + 26 + 10 = 62$ characters):
   $$\\text{Possible Passwords} = 62^8 = 218,340,105,584,896 \\approx 2.18 \\times 10^{14}$$

\`\`\`python
def calculate_search_space(charset_size: int, length: int) -> int:
    return charset_size ** length

lower_only = calculate_search_space(26, 8)      # 26^8
alphanumeric = calculate_search_space(62, 8)    # 62^8
full_ascii = calculate_search_space(94, 8)      # 94^8

print(f"Lowercase (26^8):    {lower_only:,}")
print(f"Alphanumeric (62^8): {alphanumeric:,}")
print(f"Full ASCII (94^8):   {full_ascii:,}")
\`\`\`

---

## 7. Permutations vs. Combinations

| Feature | Permutation $P(n, r)$ | Combination $C(n, r) = \\binom{n}{r}$ |
| :--- | :--- | :--- |
| **Core Question** | In how many ways can we **arrange** $r$ items from $n$? | In how many ways can we **select** $r$ items from $n$? |
| **Order Matters?** | **YES** (e.g. Password, Race Finishers: 1st, 2nd, 3rd) | **NO** (e.g. Committee, Hand of cards, Team roster) |
| **Formula** | $P(n, r) = \\frac{n!}{(n-r)!}$ | $C(n, r) = \\frac{n!}{r!(n-r)!} = \\frac{P(n, r)}{r!}$ |
| **Relationship** | $P(n, r) = r! \\times C(n, r)$ | $C(n, r) = C(n, n-r)$ |

### Multiset Permutations (Permutations with Repetitions):
If you have $n$ objects where $n_1$ are of type 1, $n_2$ of type 2, ..., and $n_k$ of type $k$:
$$\\text{Permutations} = \\frac{n!}{n_1! \\times n_2! \\times \\cdots \\times n_k!}$$

*Example: Arrangements of letters in "SUCCESS" (Total 7 letters: 3 S, 2 C, 1 U, 1 E):*
$$\\text{Arrangements} = \\frac{7!}{3! \\times 2! \\times 1! \\times 1!} = \\frac{5040}{6 \\times 2} = 420$$

---

## 8. Motivation for Catalan Numbers ($C_n$)

The **Catalan Numbers** form one of the most celebrated integer sequences in combinatorial mathematics, arising naturally across dozens of computer science structures.

The sequence begins:
$$C_0 = 1, \\quad C_1 = 1, \\quad C_2 = 2, \\quad C_3 = 5, \\quad C_4 = 14, \\quad C_5 = 42, \\quad C_6 = 132, \\quad C_7 = 429, \\dots$$

### Formula:
$$C_n = \\frac{1}{n+1} \\binom{2n}{n} = \\frac{(2n)!}{(n+1)! \\, n!}$$

### Prominent Appearances in Computer Science:

1. **Balanced Parentheses Strings (Dyck Words)**:
   Number of valid strings with $n$ pairs of opening and closing parentheses:
   - $n=1$: \`()\` $\\rightarrow C_1 = 1$
   - $n=2$: \`()()\`, \`(())\` $\\rightarrow C_2 = 2$
   - $n=3$: \`((()))\`, \`(()())\`, \`(())()\`, \`()(())\`, \`()()()\` $\\rightarrow C_3 = 5$

2. **Full Binary Trees with $n+1$ Leaves**:
   Number of structurally distinct binary trees with $n$ internal nodes is exactly $C_n$.

3. **Monotonic Lattice Grid Paths (Dyck Paths)**:
   Number of grid paths from $(0, 0)$ to $(n, n)$ moving only Right or Up that **never cross above the diagonal line $y = x$**.

4. **Polygon Triangulations**:
   Number of ways a convex polygon with $n+2$ sides can be cut into triangles by non-intersecting diagonals.

\`\`\`python
import math

def catalan_number(n: int) -> int:
    """Computes the n-th Catalan number C_n = (2n)! / ((n+1)! * n!)"""
    return math.comb(2 * n, n) // (n + 1)

print("First 10 Catalan Numbers:")
for i in range(10):
    print(f"C_{i} = {catalan_number(i)}")
\`\`\`

---

## 9. The Pigeonhole Principle (Dirichlet's Principle)

> **Basic Statement:** If $n+1$ or more pigeons are placed into $n$ pigeonholes, then at least one pigeonhole must contain **two or more pigeons**.

> **Generalized Statement:** If $N$ objects are placed into $k$ boxes, then at least one box must contain at least:
> $$\\left\\lceil \\frac{N}{k} \\right\\rceil = \\text{ceil}\\left(\\frac{N}{k}\\right) \\text{ objects}$$

### Classic Applications:
1. **Birthday Collision**: In any group of $367$ people, there must be at least $2$ people with the exact same birthday (since there are at most 366 possible birthdays).
2. **Hair Count**: Since human heads have at most 150,000 hairs, in a city with 1,000,000 residents, there are guaranteed to be at least $\\lceil 1,000,000 / 150,000 \\rceil = 7$ people with the exact same number of hairs.
3. **Lossless Data Compression**: It is mathematically impossible to build an algorithm that compresses *every* possible file of $N$ bits into a strictly smaller file without loss (since there are $2^N$ input files and fewer than $2^N$ smaller target files).

---

## 10. Python Code Demonstrations

\`\`\`python
import math
from itertools import permutations, combinations

# 1. Rule of Sum & Product Demo
departments = {"Engineering": 120, "Science": 85, "Arts": 60}
print("Total single reps (Rule of Sum):", sum(departments.values()))
print("Total committee pairs (Eng x Sci):", 120 * 85)

# 2. Permutations vs Combinations
items = ['A', 'B', 'C', 'D']
r = 2
perms = list(permutations(items, r))
combs = list(combinations(items, r))

print(f"\\nP({len(items)}, {r}) = {len(perms)} arrangements:")
print(perms)

print(f"\\nC({len(items)}, {r}) = {len(combs)} selections:")
print(combs)

# 3. Pigeonhole Principle Function
def min_pigeons_per_hole(total_items: int, total_holes: int) -> int:
    """Returns the guaranteed minimum items in the fullest container."""
    return math.ceil(total_items / total_holes)

print(f"\\n100 students distributed into 12 grades guarantees at least: {min_pigeons_per_hole(100, 12)} students in one grade.")
\`\`\`
`,
  practiceQuiz: [
    {
      id: "q1",
      question:
        "A student wants to choose a computer science elective. There are 8 AI courses, 6 Cybersecurity courses, and 4 Data Science courses available. None of the courses overlap. How many total choices does the student have?",
      options: ["18", "192", "24", "14"],
      correctAnswer: 0,
      explanation:
        "By the Rule of Sum (Addition Principle), since the course options are mutually exclusive and disjoint: Total = 8 + 6 + 4 = 18 choices.",
      difficulty: "easy",
    },
    {
      id: "q2",
      question:
        "How many distinct 8-bit binary strings (bytes) can be formed that either start with a '1' OR end with a '0'?",
      options: ["128", "192", "256", "64"],
      correctAnswer: 1,
      explanation:
        "Using the Principle of Inclusion-Exclusion: Total 8-bit strings = 2^8 = 256. Strings starting with '1' = 2^7 = 128. Strings ending with '0' = 2^7 = 128. Strings both starting with '1' and ending with '0' = 2^6 = 64. By PIE: |A ∪ B| = 128 + 128 - 64 = 192.",
      difficulty: "medium",
    },
    {
      id: "q3",
      question:
        "According to the Paper Folding Problem, why does folding a 0.1 mm sheet of paper 50 times reach past the Sun (distance ≈ 150 million km)?",
      options: [
        "Because paper stretches as it folds",
        "Because thickness doubles exponentially as 0.1 mm × 2^50 ≈ 1.125 × 10^11 meters",
        "Because the volume of paper increases with each fold",
        "Because the paper breaks down at the atomic level",
      ],
      correctAnswer: 1,
      explanation:
        "Every fold doubles the layers: thickness = 10^-4 m × 2^50 ≈ 1.125 × 10^11 m = 112.5 million km, which easily reaches astronomical scales due to exponential growth.",
      difficulty: "easy",
    },
    {
      id: "q4",
      question:
        "Approximately how many valid reachable configurations exist on a standard 3x3x3 Rubik's Cube?",
      options: [
        "43 million",
        "43 billion",
        "43 quintillion (4.3 × 10^19)",
        "Infinity",
      ],
      correctAnswer: 2,
      explanation:
        "A Rubik's cube has (8! × 3^7 × 12! × 2^11) / 2 = 43,252,003,274,489,856,000 ≈ 4.3 × 10^19 valid permutations.",
      difficulty: "medium",
    },
    {
      id: "q5",
      question:
        "What is the maximum number of moves required to solve ANY state of a Rubik's cube ('God's Number')?",
      options: ["10", "20", "50", "100"],
      correctAnswer: 1,
      explanation:
        "In 2010, computer scientists and mathematicians proved that God's Number for the Rubik's Cube in half-turn metric is exactly 20 moves.",
      difficulty: "easy",
    },
    {
      id: "q6",
      question:
        "How many distinct permutations can be made from the letters of the word 'SUCCESS'?",
      options: ["5040", "420", "840", "210"],
      correctAnswer: 1,
      explanation:
        "Word 'SUCCESS' has 7 letters: 3 'S', 2 'C', 1 'U', 1 'E'. Permutations = 7! / (3! × 2! × 1! × 1!) = 5040 / (6 × 2) = 5040 / 12 = 420.",
      difficulty: "medium",
    },
    {
      id: "q7",
      question:
        "What is the 4th Catalan number C_4, which counts the number of valid balanced parentheses strings of length 8?",
      options: ["5", "14", "42", "132"],
      correctAnswer: 1,
      explanation:
        "Using the Catalan formula C_n = 1/(n+1) * C(2n, n): C_4 = (1/5) * C(8, 4) = (1/5) * 70 = 14.",
      difficulty: "medium",
    },
    {
      id: "q8",
      question:
        "What is the minimum number of students needed in a classroom to guarantee that at least 4 of them were born in the same month?",
      options: ["36", "37", "48", "49"],
      correctAnswer: 1,
      explanation:
        "By Generalized Pigeonhole Principle: we have 12 months (holes). To guarantee ceil(N / 12) = 4, the minimum N is (3 × 12) + 1 = 37 students.",
      difficulty: "medium",
    },
    {
      id: "q9",
      question:
        "A committee of 3 members is to be formed from a group of 8 software engineers. In how many ways can this committee be selected?",
      options: ["336", "56", "24", "512"],
      correctAnswer: 1,
      explanation:
        "Since the order of members in a committee does not matter, this is a combination: C(8, 3) = 8! / (3! × 5!) = (8 × 7 × 6) / (3 × 2 × 1) = 56.",
      difficulty: "easy",
    },
    {
      id: "q10",
      question:
        "Why is it mathematically impossible to design a lossless compression algorithm that guarantees to shrink EVERY file?",
      options: [
        "Because hardware memory bandwidth is limited",
        "By the Pigeonhole Principle: There are 2^N possible files of size N, but strictly fewer than 2^N files of size less than N, forcing collisions",
        "Because binary encoding requires header bytes",
        "Because operating systems require minimum file block sizes",
      ],
      correctAnswer: 1,
      explanation:
        "The total number of files of size < N bits is 2^0 + 2^1 + ... + 2^(N-1) = 2^N - 1. Since there are 2^N distinct input files of size N, mapping them to 2^N - 1 smaller targets would require mapping at least two distinct inputs to the same output (pigeonhole principle), making lossless decompression impossible.",
      difficulty: "hard",
    },
  ],
};
