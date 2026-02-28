import { LearningModule } from "@/types/learning";

export const hashingModule: LearningModule = {
  id: "04-hashing",
  title: "4. Hashing",
  description:
    "O(1) average lookup - Hash Tables, Collision Handling, Probing Techniques",
  status: "completed",
  tags: ["Data Structure"],
  detailedContent: `# Hashing

> **Data Structure Module (CUET PG Lecture 9)** — Master the art of O(1) searching

---

## What You'll Learn

| # | Topic | Why It Matters |
|:--|:------|:---------------|
| 1 | Hash Table concept | Foundation of constant-time lookup |
| 2 | Hash Functions | How keys are mapped to indices |
| 3 | Chaining (Closed Addressing) | Collision handling with linked lists |
| 4 | Open Addressing | Collision handling within the array |
| 5 | Linear Probing | Simplest open addressing technique |
| 6 | Quadratic Probing | Reducing primary clustering |
| 7 | Double Hashing | Best open addressing method |

---

## 1. What is Hashing?

Hashing = A searching technique that tries to make search **O(1)** on average.

Instead of searching sequentially, we:
1. Take a key
2. Apply a **hash function**
3. Jump **directly** to a position in an array

\`\`\`text
  Traditional Search:
  ┌───┬───┬───┬───┬───┬───┬───┬───┐
  │ 5 │ 8 │ 2 │ 9 │ 1 │ 7 │ 3 │ 6 │  → Search for 7: check each → O(n)
  └───┴───┴───┴───┴───┴───┴───┴───┘

  Hashing:
  Key 7 → h(7) = 7 mod 10 = 7 → Go directly to index 7 → O(1)!
\`\`\`

> **The Big Idea:** Binary search needs sorted data. Linear search needs patience. Hashing says: "I'll compute where you live." It's mathematical teleportation.

---

## 2. Hash Table Concept

A Hash Table is simply an **array** where we use a **hash function** to map keys to indices.

\`\`\`text
  Hash Function:  h(k) → index

  Key k ──→ [ Hash Function h(k) ] ──→ Index in array
                                          ↓
                                    ┌───┬───┬───┬───┬───┬───┬───┐
                                    │   │   │   │ k │   │   │   │
                                    └───┴───┴───┴───┴───┴───┴───┘
                                     0   1   2   3   4   5   6

  Access time ≈ O(1) average case
\`\`\`

### Common Hash Functions

| Method | Formula | Example |
|:-------|:--------|:--------|
| **Division Method** | h(k) = k mod m | h(25) = 25 mod 10 = 5 |
| **Multiplication Method** | h(k) = ⌊m × (k × A mod 1)⌋, 0 < A < 1 | Knuth suggests A ≈ 0.6180 |
| **Mid-Square Method** | Square the key, extract middle digits | 25² = 625 → extract 2 → index 2 |
| **Folding Method** | Split key into parts, add them | 123456 → 12+34+56 = 102 → index 2 |

> **For CUET PG:** Division method (mod) is the most commonly tested. Master \`k mod m\` thoroughly.

### The Real Problem: Collisions

\`\`\`text
  h(25) = 25 mod 10 = 5
  h(35) = 35 mod 10 = 5   ← SAME INDEX!

  Two keys → same slot = COLLISION

  Index:  0   1   2   3   4   5   6   7   8   9
        [   |   |   |   |   | ? |   |   |   |   ]
                                  ↑
                         Both 25 and 35 want this slot!
\`\`\`

Two major families of solutions:
1. **Chaining** (Closed Addressing) — use linked lists
2. **Open Addressing** — find another slot in the same array

---

## 3. Chaining (Closed Addressing)

If multiple keys hash to the same slot, we store them in a **linked list** at that slot.

\`\`\`text
  Hash Table with Chaining (m = 7):

  Insert keys: 50, 700, 76, 85, 92, 73, 101

  h(k) = k mod 7

  h(50)  = 50 mod 7  = 1
  h(700) = 700 mod 7 = 0
  h(76)  = 76 mod 7  = 6
  h(85)  = 85 mod 7  = 1   ← collision with 50!
  h(92)  = 92 mod 7  = 1   ← collision with 50, 85!
  h(73)  = 73 mod 7  = 3
  h(101) = 101 mod 7 = 3   ← collision with 73!

  Result:
  ┌───┐
  │ 0 │ → [700] → NULL
  ├───┤
  │ 1 │ → [50] → [85] → [92] → NULL    ← chain of 3!
  ├───┤
  │ 2 │ → NULL
  ├───┤
  │ 3 │ → [73] → [101] → NULL
  ├───┤
  │ 4 │ → NULL
  ├───┤
  │ 5 │ → NULL
  ├───┤
  │ 6 │ → [76] → NULL
  └───┘
\`\`\`

### Load Factor

\`\`\`text
  Load Factor:  α = n / m

  Where:
    n = number of keys stored
    m = number of slots (table size)

  Example above: α = 7 / 7 = 1.0

  Average search time in chaining: O(1 + α)

  If α is small → fast (short chains)
  If α is large → slow (long chains)
\`\`\`

> **Key Insight:** In chaining, α CAN exceed 1 (chains can grow without limit). Performance degrades gracefully but never fails.

\`\`\`python path=null start=null
# Chaining Implementation
class HashTableChaining:
    def __init__(self, size):
        self.size = size
        self.table = [[] for _ in range(size)]   # Array of empty lists

    def hash(self, key):
        return key % self.size

    def insert(self, key):
        index = self.hash(key)
        self.table[index].append(key)            # Append to chain

    def search(self, key):
        index = self.hash(key)
        return key in self.table[index]          # Search in chain

    def delete(self, key):
        index = self.hash(key)
        if key in self.table[index]:
            self.table[index].remove(key)

# Usage
ht = HashTableChaining(7)
for k in [50, 700, 76, 85, 92, 73, 101]:
    ht.insert(k)

print(ht.search(85))   # True
print(ht.search(99))   # False
\`\`\`

---

## 4. Open Addressing

No linked lists. Everything stays **inside the array**.

If collision happens, we **probe** (search for) the next available slot based on a formula.

\`\`\`text
  Key Rule: Load factor α CANNOT exceed 1

  Because every element must fit inside the array itself.
  No external storage allowed!

  If table has m slots → can store at most m elements.
\`\`\`

Three probing strategies:

---

## 5. Linear Probing

**Formula:**

\`\`\`text
  h(k, i) = (h'(k) + i) mod m

  Where:
    h'(k) = initial hash value (e.g., k mod m)
    i     = probe number (0, 1, 2, 3, ...)
    m     = table size
\`\`\`

If collision: try next slot, then next, then next...

\`\`\`text
  Example: m = 10, h(k) = k mod 10
  Insert: 25, 35, 45, 15

  Insert 25: h(25) = 5         → slot 5 ✓
  Insert 35: h(35) = 5 (taken!)
             try i=1: (5+1) mod 10 = 6 → slot 6 ✓
  Insert 45: h(45) = 5 (taken!)
             try i=1: 6 (taken!)
             try i=2: (5+2) mod 10 = 7 → slot 7 ✓
  Insert 15: h(15) = 5 (taken!)
             try i=1: 6 (taken!)
             try i=2: 7 (taken!)
             try i=3: (5+3) mod 10 = 8 → slot 8 ✓

  Table:
  Index: 0   1   2   3   4   5   6   7   8   9
       [   |   |   |   |   |25 |35 |45 |15 |   ]
                               ↑───────────↑
                               PRIMARY CLUSTER!
\`\`\`

### Problem: Primary Clustering

Elements **group together** in long runs → searching becomes slow.

\`\`\`text
  Cluster:  [__|__|__|__|25|35|45|15|__|__]
                         ↑──────────↑
                         Once a cluster forms,
                         NEW keys that hash to
                         ANY slot in this range
                         must probe through the
                         ENTIRE cluster!

  Cluster grows → more collisions → cluster grows more!
  This is PRIMARY CLUSTERING.
\`\`\`

---

## 6. Quadratic Probing

**Formula:**

\`\`\`text
  h(k, i) = (h'(k) + c₁·i + c₂·i²) mod m

  Common simplified form (c₁ = 0, c₂ = 1):
  h(k, i) = (h'(k) + i²) mod m

  Probe sequence: +0, +1, +4, +9, +16, +25, ...
\`\`\`

Better spread than linear probing. **Reduces primary clustering.**

\`\`\`text
  Example: m = 10, h(k) = k mod 10
  Insert: 25, 35, 45

  Insert 25: h(25,0) = 5         → slot 5 ✓
  Insert 35: h(35,0) = 5 (taken!)
             h(35,1) = (5 + 1²) mod 10 = 6 → slot 6 ✓
  Insert 45: h(45,0) = 5 (taken!)
             h(45,1) = (5 + 1²) = 6 (taken!)
             h(45,2) = (5 + 2²) mod 10 = 9 → slot 9 ✓  ← JUMPED!

  Table:
  Index: 0   1   2   3   4   5   6   7   8   9
       [   |   |   |   |   |25 |35 |   |   |45 ]
                                               ↑
                                  Quadratic jump avoids clustering!

  Compare with linear: 25 at 5, 35 at 6, 45 at 7 (cluster!)
  Quadratic:           25 at 5, 35 at 6, 45 at 9 (spread out!)
\`\`\`

> **Drawback:** Quadratic probing can suffer from **secondary clustering** — keys with same initial hash follow the same probe sequence. Also, it may not visit all slots (guaranteed only if m is prime and α ≤ 0.5).

---

## 7. Double Hashing (Best Open Addressing)

**Formula:**

\`\`\`text
  h(k, i) = (h₁(k) + i · h₂(k)) mod m

  Where:
    h₁(k) = primary hash function (e.g., k mod m)
    h₂(k) = secondary hash function (e.g., 1 + (k mod (m-1)))

  The step size VARIES based on the key!
  Different keys that collide will probe DIFFERENTLY.
\`\`\`

\`\`\`text
  Example: m = 7
  h₁(k) = k mod 7
  h₂(k) = 1 + (k mod 5)

  Insert 10: h₁(10) = 3                         → slot 3 ✓
  Insert 17: h₁(17) = 3 (taken!)
             h₂(17) = 1 + (17 mod 5) = 1 + 2 = 3
             i=1: (3 + 1×3) mod 7 = 6           → slot 6 ✓
  Insert 24: h₁(24) = 3 (taken!)
             h₂(24) = 1 + (24 mod 5) = 1 + 4 = 5
             i=1: (3 + 1×5) mod 7 = 1           → slot 1 ✓

  Table:
  Index: 0   1   2   3   4   5   6
       [   |24 |   |10 |   |   |17 ]

  Notice: 10, 17, 24 all hash to 3 but end up at 3, 6, 1
  Each uses a DIFFERENT step size! Much better distribution.
\`\`\`

> **Why Double Hashing is the best:** It produces probe sequences that are **closer to uniform hashing** (ideal). Unlike linear (step=1) or quadratic (step=i²), the step size depends on the key itself.

\`\`\`python path=null start=null
# Double Hashing Implementation
class HashTableDoubleHashing:
    def __init__(self, size):
        self.size = size
        self.table = [None] * size

    def h1(self, key):
        return key % self.size

    def h2(self, key):
        return 1 + (key % (self.size - 1))

    def insert(self, key):
        index = self.h1(key)
        if self.table[index] is None:
            self.table[index] = key
            return

        # Collision! Use double hashing
        step = self.h2(key)
        for i in range(1, self.size):
            new_index = (index + i * step) % self.size
            if self.table[new_index] is None:
                self.table[new_index] = key
                return

        print("Table is full!")

    def search(self, key):
        index = self.h1(key)
        step = self.h2(key)
        for i in range(self.size):
            probe = (index + i * step) % self.size
            if self.table[probe] is None:
                return False
            if self.table[probe] == key:
                return True
        return False

# Usage
ht = HashTableDoubleHashing(7)
for k in [10, 17, 24]:
    ht.insert(k)

print(ht.search(17))  # True
print(ht.search(5))   # False
\`\`\`

---

## 8. Comparison: Chaining vs Open Addressing

| Feature | Chaining | Open Addressing |
|:--------|:---------|:----------------|
| **Storage** | Array + linked lists | Array only |
| **Load factor α** | Can exceed 1 | Must be ≤ 1 |
| **Memory** | Extra space for pointers | No extra space |
| **Clustering** | No clustering | Possible (linear, quadratic) |
| **Deletion** | Easy (remove from list) | Tricky (need tombstones) |
| **Cache performance** | Poor (pointer chasing) | Better (data in array) |
| **Best for** | Unknown # of elements | Known upper bound |

### Open Addressing Methods Compared

| Method | Probe Sequence | Clustering | Performance |
|:-------|:---------------|:-----------|:------------|
| **Linear** | +1, +2, +3, ... | Primary clustering | Worst |
| **Quadratic** | +1², +2², +3², ... | Secondary clustering | Better |
| **Double Hashing** | +h₂, +2h₂, +3h₂, ... | Minimal clustering | Best |

---

## 9. Time Complexity Summary

| Operation | Chaining (avg) | Chaining (worst) | Open Addressing (avg) | Open Addressing (worst) |
|:----------|:---------------|:-----------------|:---------------------|:-----------------------|
| Search    | O(1 + α)       | O(n)             | O(1/(1-α))           | O(n)                   |
| Insert    | O(1)           | O(1)             | O(1/(1-α))           | O(n)                   |
| Delete    | O(1 + α)       | O(n)             | O(1/(1-α))           | O(n)                   |

\`\`\`text
  Open Addressing average probes:

  Unsuccessful search: ≈ 1 / (1 − α)
  Successful search:   ≈ (1/α) × ln(1 / (1 − α))

  Example with α = 0.5 (half full):
    Unsuccessful: 1 / (1 - 0.5) = 2 probes
    Successful:   (1/0.5) × ln(2) ≈ 1.39 probes

  Example with α = 0.9 (90% full):
    Unsuccessful: 1 / (1 - 0.9) = 10 probes!
    Successful:   ≈ 2.56 probes

  Lesson: Keep α low. α > 0.7 → performance degrades rapidly.
\`\`\`

---

## Key Takeaways

| Operation | Hash Table (avg) | Array (unsorted) | Array (sorted) | BST (balanced) |
|:----------|:-----------------|:-----------------|:---------------|:---------------|
| Search    | **O(1)**         | O(n)             | O(log n)       | O(log n)       |
| Insert    | **O(1)**         | O(1)             | O(n)           | O(log n)       |
| Delete    | **O(1)**         | O(n)             | O(n)           | O(log n)       |

---

## TL;DR - Quick Recall

**One-liner for each concept:**

| Concept | Key Takeaway |
|:--------|:-------------|
| **Hash Table** | Array + hash function = O(1) average lookup. |
| **Collision** | Two keys → same index. Solved by Chaining or Open Addressing. |
| **Chaining** | Store colliding keys in linked lists. α can exceed 1. Search: O(1 + α). |
| **Linear Probing** | \`(h'(k) + i) mod m\` — simple but causes PRIMARY CLUSTERING. |
| **Quadratic Probing** | \`(h'(k) + i²) mod m\` — better spread, reduces clustering. |
| **Double Hashing** | \`(h₁(k) + i·h₂(k)) mod m\` — best distribution, step depends on key. |
| **Load Factor** | α = n/m. Keep α low for good performance. |

**Formula Sheet (Quick Revision):**

\`\`\`text
  Load Factor:        α = n / m

  Linear Probing:     h(k, i) = (h'(k) + i) mod m
  Quadratic Probing:  h(k, i) = (h'(k) + c₁·i + c₂·i²) mod m
  Double Hashing:     h(k, i) = (h₁(k) + i·h₂(k)) mod m

  Chaining avg search:   O(1 + α)
  Open Addr avg search:  O(1 / (1 − α))
\`\`\`

---

## Additional Resources

**Video Courses:**
- [Abdul Bari - Hashing Technique Simplified](https://youtu.be/mFY0J5W8Udk) - Deep dive into collision theory
- [NeetCode - Hashing Basics](https://youtu.be/KLlXCFG5TnA) - Python-specific hashing tricks

**Articles & Visualizations:**
- [VisuAlgo - Hash Table](https://visualgo.net/en/hashtable) - Interactive collision animations

**Practice Problems:**
- LeetCode 1: Two Sum
- LeetCode 217: Contains Duplicate
- LeetCode 49: Group Anagrams
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "hash-q1",
      question:
        "What is the average time complexity for search in a hash table using chaining with load factor α?",
      options: ["O(n)", "O(log n)", "O(1 + α)", "O(α²)"],
      correctAnswer: 2,
      explanation:
        "In chaining, average search time is O(1 + α) where α = n/m. The 1 is for computing hash, α is the average chain length.",
      difficulty: "easy" as const,
    },
    {
      id: "hash-q2",
      question:
        "In a hash table of size 10 using linear probing, keys 25, 35, 45 are inserted (h(k) = k mod 10). Where is 45 stored?",
      options: ["Index 5", "Index 6", "Index 7", "Index 8"],
      correctAnswer: 2,
      explanation:
        "h(25)=5 ✓, h(35)=5 (taken), try 6 ✓, h(45)=5 (taken), try 6 (taken), try 7 ✓. Linear probing: (5+2) mod 10 = 7.",
      difficulty: "medium" as const,
    },
    {
      id: "hash-q3",
      question:
        "What is the load factor if 15 keys are stored in a hash table of size 20?",
      options: ["0.5", "0.75", "1.0", "1.5"],
      correctAnswer: 1,
      explanation:
        "Load factor α = n/m = 15/20 = 0.75. This means 75% of the table is occupied.",
      difficulty: "easy" as const,
    },
    {
      id: "hash-q4",
      question: "Which open addressing method suffers from PRIMARY clustering?",
      options: [
        "Quadratic probing",
        "Double hashing",
        "Linear probing",
        "Chaining",
      ],
      correctAnswer: 2,
      explanation:
        "Linear probing suffers from primary clustering. Consecutive occupied slots form clusters, and any new key hashing into the cluster must probe through the entire cluster.",
      difficulty: "medium" as const,
    },
    {
      id: "hash-q5",
      question:
        "In double hashing, h(k,i) = (h₁(k) + i·h₂(k)) mod m. If h₁(10)=3 and h₂(10)=5 with m=7, what is the probe sequence?",
      options: [
        "3, 4, 5, 6, 0, 1, 2",
        "3, 1, 6, 4, 2, 0, 5",
        "3, 8, 13, 18",
        "3, 6, 2, 5, 1, 4, 0",
      ],
      correctAnswer: 1,
      explanation:
        "Probe: i=0: 3, i=1: (3+5)%7=1, i=2: (3+10)%7=6, i=3: (3+15)%7=4, i=4: (3+20)%7=2, i=5: (3+25)%7=0, i=6: (3+30)%7=5.",
      difficulty: "hard" as const,
    },
    {
      id: "hash-q6",
      question:
        "In open addressing, the load factor α must satisfy which constraint?",
      options: ["α > 1", "α ≤ 1", "α = 0", "No constraint"],
      correctAnswer: 1,
      explanation:
        "In open addressing, all elements must fit inside the array itself. If n > m, there's no space. So α = n/m must be ≤ 1. (In chaining, α can exceed 1.)",
      difficulty: "easy" as const,
    },
    {
      id: "hash-q7",
      question:
        "Using quadratic probing with h(k,i) = (h'(k) + i²) mod 10, if h'(k)=3, what are the first 4 probe positions?",
      options: ["3, 4, 7, 2", "3, 4, 5, 6", "3, 6, 9, 2", "3, 13, 23, 33"],
      correctAnswer: 0,
      explanation:
        "i=0: 3, i=1: (3+1)%10=4, i=2: (3+4)%10=7, i=3: (3+9)%10=2. Quadratic jumps spread out to avoid clustering.",
      difficulty: "medium" as const,
    },
    {
      id: "hash-q8",
      question:
        "Which collision handling method allows the load factor to exceed 1?",
      options: [
        "Linear probing",
        "Quadratic probing",
        "Double hashing",
        "Chaining",
      ],
      correctAnswer: 3,
      explanation:
        "Chaining uses linked lists for overflow, so there's no limit on the number of elements. All open addressing methods require α ≤ 1.",
      difficulty: "easy" as const,
    },
    {
      id: "hash-q9",
      question:
        "If a hash table with open addressing is 90% full (α = 0.9), approximately how many probes are needed for an unsuccessful search?",
      options: ["1", "2", "5", "10"],
      correctAnswer: 3,
      explanation:
        "Average probes for unsuccessful search ≈ 1/(1-α) = 1/(1-0.9) = 1/0.1 = 10 probes. This shows why keeping α low is critical!",
      difficulty: "hard" as const,
    },
    {
      id: "hash-q10",
      question:
        "Which of the following is the BEST open addressing method in terms of minimizing clustering?",
      options: [
        "Linear probing",
        "Quadratic probing",
        "Double hashing",
        "All are equally good",
      ],
      correctAnswer: 2,
      explanation:
        "Double hashing is best because the step size depends on the key itself (via h₂), producing different probe sequences for different keys. This closely approximates uniform hashing.",
      difficulty: "medium" as const,
    },
  ],
};
