import { LearningModule } from "@/types/learning";

export const hashingModule: LearningModule = {
  id: "08-hashing",
  title: "8. Hashing & Collision Resolution",
  description:
    "Hash functions, collision resolution: Separate Chaining vs Open Addressing (Linear, Quadratic, Double Hashing), load factor, and primary/secondary clustering across C, C++, and Python",
  status: "completed",
  tags: ["Data Structure", "GATE CS", "UGC NET", "NPTEL"],
  detailedContent: `# Hashing & Collision Resolution Strategies

> **NPTEL / GATE CS / UGC NET Core Subject**
> Key Exam Questions: Probe sequence calculations in Linear/Quadratic/Double Hashing, Expected search lengths under Chaining $1 + \\alpha$, and Primary vs Secondary Clustering.

---

## 1. Prerequisites & What You Should Know

Before studying hashing, ensure you understand:
- **Arrays**: Hash tables use arrays as the underlying storage.
- **Linked Lists**: Separate chaining uses linked lists at each bucket.
- **Modular Arithmetic**: The \`%\` operator is the heart of most hash functions.
- **Division & Remainder**: Understanding $k \\% m$ (remainder when $k$ is divided by $m$).

---

## 2. What is Hashing? (Conceptual Explanation)

### 2.1 The Phone Book Analogy

Imagine you have a **phone book** and want to look up someone's number:
- **Without hashing** (linear search): Start from page 1 and check every name until you find it. This is $O(n)$.
- **With hashing**: You know that "Akshay" starts with "A", so you directly jump to the "A" section. You've narrowed down from 1000 pages to ~40 pages in one step!

A **hash function** is like the rule "first letter determines the section." It converts a key (name) directly into a location (page section).

### 2.2 How Hash Tables Work

\`\`\`
Key → Hash Function → Index → Value

Example: Hash function h(k) = k % 7

Insert keys: 10, 22, 31, 4, 15, 28

h(10) = 10 % 7 = 3
h(22) = 22 % 7 = 1
h(31) = 31 % 7 = 3  ← COLLISION with 10!
h(4)  = 4 % 7  = 4
h(15) = 15 % 7 = 1  ← COLLISION with 22!
h(28) = 28 % 7 = 0

Index:  [0]    [1]    [2]    [3]    [4]    [5]    [6]
Value:  [28]   [22]   [  ]   [10]   [4]    [  ]   [  ]
              ↑ 15?         ↑ 31?
        Where do 15 and 31 go? → COLLISION RESOLUTION!
\`\`\`

### 2.3 Why Collisions Are Inevitable (Pigeonhole Principle)

If you have more keys than table slots ($|U| > m$), at least two keys MUST map to the same slot. Even with a perfect hash function, the **Birthday Paradox** shows that collisions happen much sooner than expected — with just 23 people, there's a 50% chance two share a birthday!

---

## 3. Why Do We Need Hash Tables?

| Operation | Array (unsorted) | Sorted Array | BST (balanced) | **Hash Table** |
|:---|:---|:---|:---|:---|
| **Search** | $O(n)$ | $O(\\log n)$ | $O(\\log n)$ | **$O(1)$ avg** |
| **Insert** | $O(1)$ | $O(n)$ | $O(\\log n)$ | **$O(1)$ avg** |
| **Delete** | $O(n)$ | $O(n)$ | $O(\\log n)$ | **$O(1)$ avg** |

Hash tables provide **$O(1)$ average-case** for all three operations — the fastest possible!

### Real-World Applications
1. **Database Indexing**: Hash indexes for exact-match queries.
2. **Compilers**: Symbol tables mapping variable names to memory locations.
3. **Caches**: LRU caches, web caches, DNS caches.
4. **Spell Checkers**: Check if a word exists in the dictionary.
5. **Blockchain**: Cryptographic hash functions verify data integrity.
6. **Python Dictionaries**: \`dict\` is a hash table! So is \`set\`.

---

## 4. Hash Functions

### 4.1 Division Method
$$h(k) = k \\% m$$
- **Best $m$**: A prime number not close to powers of 2 (e.g., 7, 11, 97, 997).
- **Why prime?** Distributes keys more uniformly, reducing clustering.

### 4.2 Multiplication Method
$$h(k) = \\lfloor m \\cdot (k \\cdot A \\% 1) \\rfloor$$
where $A \\approx 0.6180339887$ (golden ratio conjugate). Less sensitive to $m$.

### 4.3 Mid-Square Method
Square the key, extract the middle digits as the hash.

---

## 5. Collision Resolution: Step-by-Step

### 5.1 Separate Chaining (Open Hashing)

Each table slot contains a **linked list** of all elements that hash to that slot:

\`\`\`
Insert 10, 22, 31, 4, 15, 28 with h(k) = k % 7:

Index [0]: 28 → NULL
Index [1]: 22 → 15 → NULL     (both hash to 1)
Index [2]: NULL
Index [3]: 10 → 31 → NULL     (both hash to 3)
Index [4]: 4 → NULL
Index [5]: NULL
Index [6]: NULL

Search for 31:
  h(31) = 3 → go to index 3 → traverse chain: 10 (no) → 31 (found!) ✓
\`\`\`

**Load Factor**: $\\alpha = n/m$ (can exceed 1.0 since chains grow).
- Expected time for successful search: $1 + \\alpha/2$
- Expected time for unsuccessful search: $1 + \\alpha$

### 5.2 Open Addressing (Closed Hashing)

All elements stored directly in the table. On collision, **probe** for the next empty slot:

#### Linear Probing: $h(k, i) = (h'(k) + i) \\% m$

\`\`\`
Insert 10, 22, 31, 4, 15 with h(k) = k % 7, Linear Probing:

h(10) = 3 → slot 3 empty → insert
Index: [  ] [  ] [  ] [10] [  ] [  ] [  ]

h(22) = 1 → slot 1 empty → insert
Index: [  ] [22] [  ] [10] [  ] [  ] [  ]

h(31) = 3 → slot 3 TAKEN! Probe: (3+1)%7 = 4 → empty → insert
Index: [  ] [22] [  ] [10] [31] [  ] [  ]

h(4) = 4 → slot 4 TAKEN! Probe: (4+1)%7 = 5 → empty → insert
Index: [  ] [22] [  ] [10] [31] [4 ] [  ]

h(15) = 1 → TAKEN! Probe: 2 → empty → insert
Index: [  ] [22] [15] [10] [31] [4 ] [  ]

Notice: PRIMARY CLUSTERING — slots 3,4,5 form a cluster!
\`\`\`

#### Quadratic Probing: $h(k, i) = (h'(k) + c_1 i + c_2 i^2) \\% m$

Jumps in increasing quadratic steps (1, 4, 9, 16...) to spread elements.
- Eliminates primary clustering
- Creates **secondary clustering**: same initial hash → same probe sequence.

#### Double Hashing: $h(k, i) = (h_1(k) + i \\cdot h_2(k)) \\% m$

Uses a second hash function to determine probe step size.
- **No clustering** at all!
- $h_2(k)$ must be coprime to $m$ (e.g., $h_2(k) = 1 + (k \\% (m-1))$ when $m$ is prime).

### 5.3 Comparison of Collision Strategies

| Strategy | Clustering | Load Factor | Cache Performance | Deletion |
|:---|:---|:---|:---|:---|
| **Chaining** | None | $\\alpha$ can exceed 1 | Poor (pointer chasing) | Easy |
| **Linear Probing** | Primary clustering | $\\alpha < 1$ | Excellent (contiguous) | Hard (lazy delete) |
| **Quadratic** | Secondary clustering | $\\alpha < 1$ | Good | Hard |
| **Double Hashing** | No clustering | $\\alpha < 1$ | Moderate | Hard |

---

## 6. Implementation in C, C++, and Python with Syntax Logic

### C Implementation (Separate Chaining with Linked Lists)

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

/**
 * C Syntax Logic Note:
 * 1. Array of Pointers: "Node* table[TABLE_SIZE]" holds head pointers for each bucket.
 * 2. Hash function: k % TABLE_SIZE (Division Method). Table size should be a prime number.
 * 3. Chaining: Inserts new items at head of bucket list in O(1) time.
 */

#define TABLE_SIZE 7

typedef struct HashNode {
    int key;
    int val;
    struct HashNode* next;
} HashNode;

typedef struct {
    HashNode* buckets[TABLE_SIZE];
} HashTable;

HashTable* createHashTable() {
    HashTable* ht = (HashTable*)malloc(sizeof(HashTable));
    for (int i = 0; i < TABLE_SIZE; i++) {
        ht->buckets[i] = NULL;
    }
    return ht;
}

int hash(int key) {
    return abs(key) % TABLE_SIZE;
}

// Insert with O(1) head insertion in bucket
void insertHash(HashTable* ht, int key, int val) {
    int idx = hash(key);

    // Check if key already exists in bucket (update value)
    HashNode* curr = ht->buckets[idx];
    while (curr) {
        if (curr->key == key) {
            curr->val = val;
            return;
        }
        curr = curr->next;
    }

    // Allocate new node and prepend to bucket list
    HashNode* newNode = (HashNode*)malloc(sizeof(HashNode));
    newNode->key = key;
    newNode->val = val;
    newNode->next = ht->buckets[idx];
    ht->buckets[idx] = newNode;
}

int searchHash(HashTable* ht, int key, int* found) {
    int idx = hash(key);
    HashNode* curr = ht->buckets[idx];
    while (curr) {
        if (curr->key == key) {
            *found = 1;
            return curr->val;
        }
        curr = curr->next;
    }
    *found = 0;
    return -1;
}
\`\`\`

---

### C++ Implementation (std::unordered_map & Custom Hash Function)

\`\`\`cpp
#include <iostream>
#include <unordered_map>
#include <string>

/**
 * C++ Syntax Logic Note:
 * 1. std::unordered_map: Hash table implemented via separate chaining with bucket arrays.
 * 2. Average Time Complexity: O(1) for insert, lookup, delete. Worst case O(n) during high collision.
 * 3. max_load_factor: Triggers automatic rehashing when size / bucket_count exceeds threshold (typically 1.0).
 */

void demonstrateMap() {
    std::unordered_map<std::string, int> freq;
    
    std::string text = "gate exam cs it gate cs";
    // Subscript operator freq[key] inserts key with default value (0) if absent, then increments!
    freq["gate"]++;
    freq["cs"]++;
    freq["exam"]++;

    // Check existence using find() without accidentally inserting key
    auto it = freq.find("gate");
    if (it != freq.end()) {
        std::cout << "Count for 'gate': " << it->second << "\\n";
    }
}
\`\`\`

---

### Python Implementation (Dictionary Internals & Open Addressing)

\`\`\`python
"""
Python Syntax Logic Note:
1. Python dictionaries use OPEN ADDRESSING with perturbation-based pseudo-random probing.
2. Compact Dict (Python 3.6+): Maintains insertion order by using a sparse index table
   and a dense array of entries (key, value, hash).
"""

class OpenAddressingHashTable:
    def __init__(self, size=11):
        self.size = size
        self.keys = [None] * size
        self.values = [None] * size

    def _hash(self, key: int) -> int:
        return key % self.size

    def put(self, key: int, val):
        idx = self._hash(key)
        start_idx = idx

        # Linear probing
        while self.keys[idx] is not None and self.keys[idx] != key:
            idx = (idx + 1) % self.size
            if idx == start_idx:
                raise OverflowError("Hash table is full")

        self.keys[idx] = key
        self.values[idx] = val

    def get(self, key: int):
        idx = self._hash(key)
        start_idx = idx

        while self.keys[idx] is not None:
            if self.keys[idx] == key:
                return self.values[idx]
            idx = (idx + 1) % self.size
            if idx == start_idx:
                break
        return None
\`\`\`

---

## 7. GATE & UGC NET Key Exam Insights

> [!WARNING]
> **GATE Trap: Linear Probing Deletion**
> You CANNOT simply mark a slot as empty after deletion in open addressing! Other probed keys that passed through that slot would become unreachable. Use **lazy deletion** (mark as DELETED) instead.

> [!IMPORTANT]
> **GATE Formula: Expected Probes in Open Addressing**
> For load factor $\\alpha = n/m$:
> - **Unsuccessful search** (Linear Probing): $\\frac{1}{2}\\left(1 + \\frac{1}{(1-\\alpha)^2}\\right)$
> - **Successful search** (Linear Probing): $\\frac{1}{2}\\left(1 + \\frac{1}{1-\\alpha}\\right)$
> - **Uniform Hashing** (ideal): Unsuccessful = $\\frac{1}{1-\\alpha}$, Successful = $\\frac{1}{\\alpha}\\ln\\frac{1}{1-\\alpha}$
`,
};
