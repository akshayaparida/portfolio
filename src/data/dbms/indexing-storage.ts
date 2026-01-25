import { LearningModule } from "@/types/learning";

export const indexingStorageModule: LearningModule = {
  id: "indexing-storage",
  title: "Indexing & File Organization",
  description:
    "B+ Trees, hashing, file organization, and query optimization for data engineering",
  status: "in-progress",
  detailedContent: `# Indexing & File Organization

Efficient data storage and retrieval are crucial for database performance. This module covers indexing techniques, file organization methods, and query optimization—essential skills for data engineering roles.

## 🎯 What You'll Learn

| # | Topic | Skill |
|:--|:------|:------|
| 1 | **File Organization** | Heap, Sequential, Hashed |
| 2 | **Indexing Basics** | Dense vs Sparse, Primary vs Secondary |
| 3 | **B+ Trees** | Structure, insertion, deletion, range queries |
| 4 | **Hashing** | Static vs Dynamic, Extendible Hashing |
| 5 | **Query Optimization** | Cost models, join algorithms |

---

## 1. File Organization

**How data is physically stored on disk affects performance.**

\`\`\`text path=null start=null
Storage Hierarchy:
                    Speed      Capacity
CPU Registers       ~1 ns      ~KB
L1/L2/L3 Cache     ~10 ns     ~MB
Main Memory (RAM)   ~100 ns    ~GB
SSD                 ~100 μs    ~TB
HDD                 ~10 ms     ~TB

Database files live on disk → Minimize disk I/O!
\`\`\`

**File Organization Types:**

| Type | Description | Best For |
|:-----|:------------|:---------|
| Heap | Records placed anywhere with space | Insert-heavy, full scans |
| Sequential | Records sorted by key | Range queries |
| Hashed | Records placed by hash function | Equality lookups |
| Clustered | Related records stored together | Join operations |

\`\`\`python path=null start=null
# Heap File Organization
# + Fast inserts (append anywhere)
# + Good for small tables
# - Slow search O(n) - must scan all

# Sequential File Organization
# + Fast range queries (sorted)
# + Binary search O(log n)
# - Slow inserts (must maintain order)

# Hash File Organization
# + O(1) average for equality lookup
# - No range queries
# - May need rehashing as data grows
\`\`\`

---

## 2. Indexing Fundamentals

**Index:** A data structure that speeds up data retrieval at the cost of additional storage and write overhead.

\`\`\`text path=null start=null
Without Index:
┌──────────────────────────────────────┐
│  Full Table Scan: O(n)               │
│  Check every row to find matches     │
└──────────────────────────────────────┘

With Index:
┌──────────────────────────────────────┐
│  Index Lookup: O(log n)              │
│  Go directly to matching rows        │
└──────────────────────────────────────┘
\`\`\`

**Index Classifications:**

| Classification | Types |
|:---------------|:------|
| By Structure | B+ Tree, Hash, Bitmap |
| By Density | Dense (all keys), Sparse (some keys) |
| By Key | Primary (on PK), Secondary (on other cols) |
| By Clustering | Clustered (sorted by index), Non-clustered |

**Dense vs Sparse Index:**

\`\`\`text path=null start=null
DENSE INDEX:
Entry for EVERY search key value
┌───────────┐     ┌───────────────────┐
│ 10 → #1   │     │ #1: {10, Alice}   │
│ 20 → #2   │ ──→ │ #2: {20, Bob}     │
│ 30 → #3   │     │ #3: {30, Charlie} │
│ 40 → #4   │     │ #4: {40, Diana}   │
└───────────┘     └───────────────────┘
  Index              Data File

SPARSE INDEX:
Entry for FIRST key in each block (requires sorted data)
┌───────────┐     ┌───────────────────┐
│ 10 → Block1│     │ Block1: 10,11,12  │
│ 40 → Block2│ ──→ │ Block2: 40,41,42  │
│ 70 → Block3│     │ Block3: 70,71,72  │
└───────────┘     └───────────────────┘
\`\`\`

**Primary vs Secondary Index:**

\`\`\`text path=null start=null
PRIMARY INDEX:
• On ordering key (data file sorted by this key)
• Usually sparse
• One per table

SECONDARY INDEX:
• On non-ordering field
• Always dense (data not sorted by this key)
• Multiple allowed per table

Example:
Employee table sorted by emp_id
• Primary index on emp_id (sparse OK)
• Secondary index on dept_id (must be dense)
\`\`\`

---

## 3. B+ Tree Index

**Most important index structure in databases!**

\`\`\`text path=null start=null
B+ Tree Properties:
• Self-balancing tree
• All data in leaf nodes (internal = navigation only)
• Leaf nodes linked (for range queries)
• High fanout → short height → few disk I/Os

Order = m (max children per node)
• Each node: ceil(m/2) to m children
• Root: 2 to m children
• Leaf: ceil((m-1)/2) to (m-1) keys
\`\`\`

**B+ Tree Structure:**

\`\`\`text path=null start=null
                    [30 | 70]                 ← Internal (root)
                   /    |    \\ 
                 /      |      \\
          [10|20]    [40|50|60]   [80|90]     ← Internal
          /  |  \\      / | | \\      / | \\
         /   |   \\    /  | |  \\    /  |  \\
        ↓    ↓    ↓  ↓   ↓ ↓   ↓  ↓   ↓   ↓
       [Leaf nodes with actual data, linked together]
       
       Leaf: [5|10] ↔ [15|20|25] ↔ [30|35] ↔ ... 
\`\`\`

**B+ Tree Operations:**

\`\`\`python path=null start=null
# SEARCH (key = 45):
# 1. Start at root [30|70]
# 2. 30 < 45 < 70, go middle child [40|50|60]
# 3. 40 < 45 < 50, go second child
# 4. Reach leaf, search for 45
# Time: O(log_m n) where m = fanout

# INSERT (key = 55):
# 1. Find correct leaf
# 2. If space: insert in sorted order
# 3. If full: SPLIT leaf
#    - Move half keys to new leaf
#    - Insert separator key to parent
#    - If parent full: split propagates up

# DELETE (key = 45):
# 1. Find and remove from leaf
# 2. If node underflows (< ceil((m-1)/2) keys):
#    - Try to borrow from sibling
#    - Or merge with sibling
# 3. Merge may propagate to parent
\`\`\`

**B+ Tree Example:**

\`\`\`sql path=null start=null
-- Creating B+ Tree index
CREATE INDEX idx_salary ON Employee(salary);

-- Query using index
SELECT * FROM Employee WHERE salary = 50000;
-- Uses index: O(log n) instead of O(n)

-- Range query (uses linked leaves)
SELECT * FROM Employee WHERE salary BETWEEN 40000 AND 60000;
-- Find 40000 in tree, then scan linked leaves until 60000
\`\`\`

**Why B+ Tree over Binary Tree?**

| Aspect | Binary Tree | B+ Tree |
|:-------|:------------|:--------|
| Fanout | 2 | 100-1000 |
| Height for 1M rows | ~20 | ~3-4 |
| Disk I/O per search | ~20 | ~3-4 |
| Range queries | Hard | Easy (linked leaves) |

---

## 4. Hash-Based Indexing

**Excellent for equality queries, not for range queries.**

**Static Hashing:**

\`\`\`text path=null start=null
hash(key) = key mod num_buckets

Example: 5 buckets
hash(12) = 12 mod 5 = 2  → Bucket 2
hash(47) = 47 mod 5 = 2  → Bucket 2 (collision!)
hash(35) = 35 mod 5 = 0  → Bucket 0

Bucket 0: [35, ...]
Bucket 1: []
Bucket 2: [12, 47, ...]  ← Overflow chain
Bucket 3: []
Bucket 4: []

Problem: Fixed buckets don't scale well!
\`\`\`

**Extendible Hashing:**

\`\`\`text path=null start=null
Dynamic hashing - grows/shrinks as needed

Components:
• Global Depth (d): Bits used from hash to index
• Local Depth: Bits used by each bucket
• Directory: Points to buckets (size = 2^d)

Example: Global depth = 2 (4 directory entries)
Hash(key) → Binary → Use last 2 bits

Directory:        Buckets:
  00 ──────→ [A, B]  local depth = 2
  01 ──────→ [C, D]  local depth = 2  
  10 ─┐
  11 ─┴────→ [E, F]  local depth = 1

When bucket overflows:
1. If local depth < global depth: Just split bucket
2. If local depth = global depth: Double directory first
\`\`\`

**Linear Hashing:**

\`\`\`text path=null start=null
Grows one bucket at a time (no directory)

• Split pointer (p) indicates next bucket to split
• Two hash functions: h0 and h1
• When p reaches end, increment level

Growth: Triggered by overflow or load factor
Advantage: No directory, gradual growth
\`\`\`

---

## 5. Query Optimization

**Query Processing Pipeline:**

\`\`\`text path=null start=null
SQL Query
    ↓
Parser (Syntax check)
    ↓
Optimizer (Generate plan)
    ↓
Execution Engine
    ↓
Results

Optimizer considers:
• Available indexes
• Table statistics
• Join order
• Algorithm choices
\`\`\`

**Cost Estimation:**

\`\`\`text path=null start=null
Cost = # of disk I/Os (primary factor)

Key Statistics:
• n(R) = Number of tuples in R
• b(R) = Number of blocks/pages
• V(A,R) = Number of distinct values of A in R

Selection Selectivity:
σ_{A=v}(R) ≈ n(R) / V(A,R) tuples

Example:
Employee has 10,000 rows, 100 departments
SELECT * WHERE dept_id = 5
Estimated: 10,000/100 = 100 rows
\`\`\`

**Join Algorithms:**

\`\`\`python path=null start=null
# 1. NESTED LOOP JOIN
# For each tuple r in R:
#     For each tuple s in S:
#         if r.A = s.A: output (r, s)
# Cost: O(n * m) comparisons
# Disk I/O: b(R) + n(R) * b(S)

# 2. BLOCK NESTED LOOP
# For each BLOCK of R:
#     For each BLOCK of S:
#         For each tuple r in R-block:
#             For each tuple s in S-block:
#                 ...
# Cost: b(R) + b(R) * b(S) (better!)

# 3. INDEX NESTED LOOP
# For each tuple r in R:
#     Use index to find matching s in S
# Cost: b(R) + n(R) * (index lookup cost)

# 4. SORT-MERGE JOIN
# Sort both R and S on join attribute
# Merge sorted relations
# Cost: Sort + Merge = O(n log n + m log m)

# 5. HASH JOIN
# Build hash table on smaller relation
# Probe with tuples from larger relation
# Cost: O(n + m) if fits in memory
\`\`\`

**Join Order Optimization:**

\`\`\`sql path=null start=null
-- Query: SELECT * FROM A, B, C WHERE A.x = B.x AND B.y = C.y

-- Possible join orders:
-- (A ⋈ B) ⋈ C
-- (B ⋈ C) ⋈ A  
-- (A ⋈ C) ⋈ B
-- A ⋈ (B ⋈ C)
-- ... and more!

-- Optimizer picks order with lowest estimated cost
-- Uses dynamic programming or heuristics
-- Principle: Do selective operations first
\`\`\`

**EXPLAIN to View Query Plan:**

\`\`\`sql path=null start=null
EXPLAIN ANALYZE SELECT * FROM Employee WHERE salary > 50000;

-- Output shows:
-- - Access method (index scan vs sequential scan)
-- - Estimated rows
-- - Actual time
-- - Join methods used
\`\`\`

---

## TL;DR - Quick Reference

| Concept | Key Point |
|:--------|:----------|
| Heap File | Unordered, fast insert, slow search |
| Sequential | Sorted, good for ranges |
| Dense Index | Entry for every key |
| Sparse Index | Entry for first key per block |
| B+ Tree | Balanced, data in leaves, linked leaves |
| B+ Height | O(log_m n), typically 3-4 for millions of rows |
| Hash Index | O(1) equality, no ranges |
| Extendible Hash | Dynamic growth with directory |
| Query Cost | Minimize disk I/Os |
| Hash Join | Build on smaller, probe with larger |

---

## 📚 Resources

- [Use The Index, Luke!](https://use-the-index-luke.com/) - SQL Indexing tutorial
- [B+ Tree Visualization](https://www.cs.usfca.edu/~galles/visualization/BPlusTree.html) - Interactive
- [PostgreSQL EXPLAIN Guide](https://www.postgresql.org/docs/current/using-explain.html)
    `,
  subModules: [],
  practiceQuiz: [
    {
      id: "idx-q1",
      question: "B+ Trees store all data records in:",
      options: ["Root nodes", "Internal nodes", "Leaf nodes", "All nodes"],
      correctAnswer: 2,
      explanation:
        "B+ Tree Structure:\\n\\n• Internal nodes: Only keys for navigation\\n• Leaf nodes: All data records + linked for range queries\\n\\nThis differs from B-Trees which store data in all nodes.",
      difficulty: "easy",
    },
    {
      id: "idx-q2",
      question: "Which index type is best for range queries?",
      options: [
        "Hash Index",
        "Bitmap Index",
        "B+ Tree Index",
        "All equally good",
      ],
      correctAnswer: 2,
      explanation:
        "Index Types for Ranges:\\n\\n• B+ Tree: Excellent! Linked leaves allow sequential scan\\n• Hash: Poor - designed for equality only\\n• Bitmap: Good for low-cardinality columns\\n\\nB+ Tree is the default for most queries.",
      difficulty: "easy",
    },
    {
      id: "idx-q3",
      question: "A sparse index requires the data file to be:",
      options: [
        "Hashed",
        "Sorted on index key",
        "Clustered",
        "In heap organization",
      ],
      correctAnswer: 1,
      explanation:
        "Sparse vs Dense:\\n\\n• Sparse: One entry per block (first key only)\\n  Requires SORTED data to work!\\n\\n• Dense: Entry for every key value\\n  Works with unsorted data too.",
      difficulty: "medium",
    },
    {
      id: "idx-q4",
      question:
        "In extendible hashing, when a bucket overflows and local depth equals global depth:",
      options: [
        "Bucket is deleted",
        "Directory is doubled",
        "Linear probing starts",
        "Overflow chain created",
      ],
      correctAnswer: 1,
      explanation:
        "Extendible Hashing Overflow:\\n\\n• If local depth < global depth: Just split bucket\\n• If local depth = global depth: DOUBLE directory first, then split\\n\\nDirectory doubles in size (2^d → 2^(d+1))",
      difficulty: "hard",
    },
    {
      id: "idx-q5",
      question:
        "The primary advantage of B+ trees over binary trees for disk-based indexing is:",
      options: [
        "Simpler implementation",
        "Higher fanout reducing disk I/O",
        "No need for balancing",
        "Smaller memory footprint",
      ],
      correctAnswer: 1,
      explanation:
        "B+ Tree Advantage:\\n\\n• High fanout (100-1000 children)\\n• Tree height of 3-4 for millions of rows\\n• Each level = one disk I/O\\n• Binary tree: Height ~20 = ~20 disk I/Os!",
      difficulty: "medium",
    },
    {
      id: "idx-q6",
      question: "Hash join is most efficient when:",
      options: [
        "Both tables are large",
        "Building hash table on smaller relation fits in memory",
        "Tables are sorted",
        "Using clustered index",
      ],
      correctAnswer: 1,
      explanation:
        "Hash Join Strategy:\\n\\n• BUILD phase: Create hash table on smaller relation\\n• PROBE phase: Scan larger relation, lookup in hash table\\n\\nBest when smaller table fits in memory!\\nCost: O(n + m) - linear in both sizes",
      difficulty: "medium",
    },
    {
      id: "idx-q7",
      question: "A secondary index must always be:",
      options: ["Sparse", "Dense", "Clustered", "On primary key"],
      correctAnswer: 1,
      explanation:
        "Index Density:\\n\\n• Primary index: Can be sparse (data sorted by key)\\n• Secondary index: MUST be dense\\n\\nWhy? Data not sorted by secondary key, so we need pointer to every matching row!",
      difficulty: "medium",
    },
    {
      id: "idx-q8",
      question: "In query optimization, the main cost factor is:",
      options: ["CPU cycles", "Memory usage", "Disk I/O", "Network latency"],
      correctAnswer: 2,
      explanation:
        "Database Cost Model:\\n\\nDisk I/O is orders of magnitude slower than memory:\\n• Disk access: ~10ms\\n• Memory access: ~100ns\\n\\nOptimizer minimizes disk block accesses!",
      difficulty: "easy",
    },
    {
      id: "idx-q9",
      question: "Nested loop join has worst-case complexity of:",
      options: ["O(n)", "O(n log n)", "O(n * m)", "O(n + m)"],
      correctAnswer: 2,
      explanation:
        "Join Complexities:\\n\\n• Nested Loop: O(n * m) - compare every pair\\n• Hash Join: O(n + m) - linear if fits in memory\\n• Sort-Merge: O(n log n + m log m)\\n\\nNested loop is simple but expensive for large tables!",
      difficulty: "easy",
    },
    {
      id: "idx-q10",
      question: "A clustered index means:",
      options: [
        "Multiple indexes on same column",
        "Data stored in index order",
        "B+ tree structure",
        "Index on primary key",
      ],
      correctAnswer: 1,
      explanation:
        "Clustered vs Non-clustered:\\n\\n• Clustered: Data PHYSICALLY sorted by index key\\n  Only ONE clustered index per table!\\n\\n• Non-clustered: Index separate from data\\n  Multiple allowed",
      difficulty: "medium",
    },
  ],
};
