import { LearningModule } from "@/types/learning";

export const pyqRevisionModule: LearningModule = {
  id: "11-pyq-revision",
  title: "11. PYQs & Rapid-Fire Revision",
  description: "Exam Traps, Recurrence Matching, MSTs, and Rapid-Fire MCQs",
  status: "completed",
  tags: ["Data Structure", "Algorithm", "Revision"],
  detailedContent: `# PYQs & Rapid-Fire Revision

> **Revision Module** — Let’s see if you *actually* understand everything.

This module is not about learning new concepts. It is about **pattern recognition, exam traps, and response speed.** If you can spot the trap, you save minutes on the exam.

---

## 1. Minimum Spanning Tree (MST) Rules

An MST exists only in **connected, undirected graphs**.

**Core Properties:**
- Connects **all vertices** (V).
- Contains exactly **V - 1 edges**.
- Has **NO cycles**.
- Minimizes the total edge weight among all possible spanning trees.

**The Big Two Algorithms:**
1. **Kruskal's:** Greedy approach. Sorts edges by weight. Uses Union-Find (Disjoint Set) to avoid cycles. Great for sparse graphs.
2. **Prim's:** Greedy approach. Grows the tree from a single starting node using a Min-Heap (Priority Queue). Great for dense graphs.

---

## 2. The Heap Index Trap (0-based vs 1-based)

Exams love to test your array mathematics for heaps. Do not memorize just one formula!

If the question specifies **1-based indexing** (Root is at index 1):
- ~~~python
  Parent(i) = ⌊i/2⌋
  Left(i) = 2i
  Right(i) = 2i + 1
  ~~~

If the question specifies **0-based indexing** (Root is at index 0):
- ~~~python
  Parent(i) = ⌊(i - 1) / 2⌋
  Left(i) = 2i + 1
  Right(i) = 2i + 2
  ~~~

> **Crucial Trap:** You **CANNOT** compute the total "Heap Size" just by knowing the index \`i\` of a single node. An index only tells you position/geography, not how many elements actually exist in the background array!

---

## 3. Recurrence Matching (Instant Recognition)

You must recognize recurrence relations instantly without applying the full Master Theorem every time:

| Algorithm | Recurrence | Complexity | Why? |
|:----------|:-----------|:-----------|:-----|
| **Binary Search** | \`T(n) = T(n/2) + c\` | **$O(\\log n)$** | Divide search space in half (1 branch). |
| **Merge Sort** | \`T(n) = 2T(n/2) + \\Theta(n)\` | **$O(n \\log n)$** | Divide in half (2 branches) + linear scan to merge. |
| **Quick Sort (Worst)** | \`T(n) = T(n-1) + \\Theta(n)\` | **$O(n^2)$** | Pivot is extreme, dividing array into sizes 0 and n-1. |
| **Linear Search** | \`T(n) = T(n-1) + c\` | **$O(n)$** | Check one item, recursively check the rest. |

---

## 4. The Shortest Path Trap (BFS vs DFS)

If a question asks for the **"Shortest path in an UNWEIGHTED graph"**:
- **BFS (Breadth-First Search):** ✔️ YES! It guarantees the shortest path because it explores radially, layer by layer.
- **DFS (Depth-First Search):** ❌ NO! It plunges deep immediately and might find a ridiculously long, winding path first.

> **Mindset:** "Minimum distance" + "Unweighted graph" = **Brain screams BFS**.

---

## 5. Binary Search Tree (BST) Running Times

A BST's efficiency is entirely controlled by its **height (h)**.

| Operation | Time Complexity | Reason |
|:----------|:----------------|:-------|
| Successor | **$O(h)$** | May need to walk down the tree. |
| Minimum | **$O(h)$** | Walk as far left as possible. |
| Maximum | **$O(h)$** | Walk as far right as possible. |
| Insert / Delete | **$O(h)$** | Walk down to the correct insertion spot. |
| **Inorder Traversal**| **$O(n)$** | **Must visit every single node!** |

**Worst Case Trap:**
What if the tree is completely skewed (e.g. elements inserted in sorted order)?
- Height $h$ becomes equal to $n$.
- Insert, Delete, and Search drop from $O(\\log n)$ to **$O(n)$**.

---

## 6. Sorting & Searching Lightning Facts

**Time Complexity Ordering:**
You must know the order of complexities instantly from fastest to slowest:
\`O(1) < O(log n) < O(n) < O(n log n) < O(n²)\`

**Hashing vs Search:**
- **Hashing Avg Case:** **$O(1)$** (Search time is completely independent of \`n\`). *Assumes a good hash function and low collisions!*
- **Hashing Worst Case:** **$O(n)$** (All items collide into one linked list chain).
- **Binary Search:** **$O(\\log n)$** (Requires sorted data).
- **Linear Search:** **$O(n)$** (Works on anything).

**Quick Sort vs Randomized Quick Sort:**
- What's the exact difference? **Pivot selection.**
- Standard Quick Sort: Deterministic (first, last, or middle).
- Randomized Quick Sort: Picks pivot completely randomly.
- **Why?** It heavily reduces the absolute mathematical probability of hitting the catastrophic $O(n^2)$ worst-case. The output is exactly the same, but the expected time is safely $O(n \\log n)$.

---

## 7. Data Structure Application Match-Up

If you see the algorithm/problem, you must instantly know the underlying Data Structure:

| Algorithm / Problem | Corresponding Data Structure |
|:--------------------|:-----------------------------|
| **BFS** | **Queue** |
| **DFS** | **Stack** (Or Recursion Call Stack) |
| **Dijkstra / Prim** | **Priority Queue / Min-Heap** |
| **Heap Sort** | **Priority Queue / Max-Heap** |
| **Secondary Storage (Hard Disk)** | **B-Trees** (Optimized for large block reads) |

---

## 8. Threaded Binary Trees

Normal trees have a lot of wasted \`NULL\` pointers at the leaves.
**Threaded Binary Trees** utilize these naturally empty pointers to point to their **inorder predecessor or successor**.

- **Single Threaded:** Points in one direction (usually towards the successor).
- **Double Threaded:** Points in both directions.
- **Massive Advantage:** Allows for **$O(n)$ Inorder Traversal WITHOUT a recursion stack!** This saves memory and prevents stack overflow deeper down.

---

## 9. The Ecosystem View

Data structures are not isolated islands. They form a deeply connected ecosystem. Do not memorize facts—understand the connections:
- A Priority Queue is literally just a Heap.
- Dijkstra's Algorithm is literally just BFS using a Min-Heap.
- A Stack implies DFS; A Queue implies BFS.
- Trees and Logs ($O(\\log n)$) go hand in hand because cutting things in half builds trees.

*Proceed to the Practice Quiz to test your response speed against actual exam traps.*
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "pyq-q1",
      question:
        "Which of the following guarantees finding the shortest path between two nodes in an unweighted graph?",
      options: ["DFS", "Kruskal's", "BFS", "Prim's"],
      correctAnswer: 2,
      explanation:
        "BFS explores layer by layer. The first time you reach a destination node via BFS, it is mathematically guaranteed to be the shortest path in an unweighted graph.",
      difficulty: "easy",
    },
    {
      id: "pyq-q2",
      question:
        "For a 1-based index heap, what is the correct formula to find the Left Child of a node at index i?",
      options: ["2i + 1", "2i", "⌊i/2⌋", "2i + 2"],
      correctAnswer: 1,
      explanation:
        "For 1-based indexing, Left is 2i, Right is 2i+1, Parent is ⌊i/2⌋. (For 0-based, Left is 2i+1).",
      difficulty: "medium",
    },
    {
      id: "pyq-q3",
      question:
        "Which of the following operations on a Binary Search Tree (BST) takes O(n) time unconditionally?",
      options: [
        "Finding the Minimum",
        "Finding the Successor",
        "Insertion",
        "Inorder Traversal",
      ],
      correctAnswer: 3,
      explanation:
        "Min, Successor, and Insertion take O(h) time, which is O(log n) if balanced and O(n) worst-case. Inorder Traversal ALWAYS takes exactly O(n) because by definition it must visit and print every single node.",
      difficulty: "easy",
    },
    {
      id: "pyq-q4",
      question:
        "The recurrence T(n) = T(n/2) + c evaluates to which complexity?",
      options: ["O(log n)", "O(n)", "O(n log n)", "O(n²)"],
      correctAnswer: 0,
      explanation:
        "This is the recurrence for Binary Search. You cut the whole search space in half with only 1 branch of execution recursively, resulting in O(log n) time.",
      difficulty: "easy",
    },
    {
      id: "pyq-q5",
      question:
        "What is the primary operational advantage of a Threaded Binary Tree?",
      options: [
        "To balance the tree automatically during insertion",
        "To reduce the physical height of the tree",
        "To allow inorder traversal without using recursion or an explicit memory stack",
        "To simulate a hash table using a tree structure",
      ],
      correctAnswer: 2,
      explanation:
        "Threaded binary trees utilize wasted NULL leaf pointers to point directly to the inorder successor/predecessor, completely eliminating the O(h) memory overhead needed for a stack during inorder traversal.",
      difficulty: "hard",
    },
    {
      id: "pyq-q6",
      question:
        "In the context of algorithm running times, which of the following orderings is mathematically correct (from fastest to slowest)?",
      options: [
        "O(n log n) < O(n) < O(1)",
        "O(n²) < O(n log n) < O(n)",
        "O(1) < O(log n) < O(n log n) < O(n²)",
        "O(log n) < O(1) < O(n log n)",
      ],
      correctAnswer: 2,
      explanation:
        "Constant O(1) is fastest, followed by Logarithmic O(log n), Linearithmic O(n log n), and Quadratic O(n²) being the slowest among these options.",
      difficulty: "easy",
    },
    {
      id: "pyq-q7",
      question:
        "Which data structure is typically optimized precisely for secondary storage indexing (like reading databases from hard disks)?",
      options: ["AVL Trees", "B-Trees", "Min-Heaps", "Red-Black Trees"],
      correctAnswer: 1,
      explanation:
        "B-Trees are extremely fat, shallow trees natively designed to minimize disk I/O operations by reading large contiguous blocks of data (nodes with many keys) at once.",
      difficulty: "medium",
    },
    {
      id: "pyq-q8",
      question:
        "What is the expected average case search time for a hash table (assuming a well-distributed hash function)?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      correctAnswer: 2,
      explanation:
        "Hashing maps keys directly to specific array indices using math, theoretically achieving an average lookup time of O(1), making its speed completely independent of n in the average case.",
      difficulty: "easy",
    },
    {
      id: "pyq-q9",
      question:
        "Why do systems implement Randomized Quick Sort instead of a standard deterministic Quick Sort?",
      options: [
        "It sorts the underlying array backwards natively",
        "It mathematically guarantees a strictly O(n log n) worst-case time bound",
        "It heavily reduces the probability of encountering the disastrous O(n²) worst-case configuration",
        "It requires O(1) less space than standard partitioning",
      ],
      correctAnswer: 2,
      explanation:
        "By picking pivots totally randomly, you avoid deterministic worst-case scenarios (like feeding a fully sorted array into a Quick Sort that always picks the first element as a pivot). The worst case is technically still O(n²), but the probability drops to near zero.",
      difficulty: "medium",
    },
    {
      id: "pyq-q10",
      question:
        "When a BST is completely skewed (acts like a linked list), what is the exact time complexity of a Delete operation?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 2,
      explanation:
        "Delete inherently takes bounded O(h) time. In a totally skewed tree, the height h equals the number of nodes n. Thus, the operation degrades purely to O(n).",
      difficulty: "easy",
    },
    {
      id: "pyq-q11",
      question:
        "The algorithmic recurrence T(n) = 2T(n/2) + Θ(n) is intrinsically associated with which algorithm?",
      options: [
        "Heap Sort",
        "Merge Sort",
        "Insertion Sort",
        "Worst-case Quick Sort",
      ],
      correctAnswer: 1,
      explanation:
        "Merge sort recursively halves the array creating exactly 2 branches (2T(n/2)), and then spends linear time (Θ(n)) merging the left and right halves back together.",
      difficulty: "easy",
    },
    {
      id: "pyq-q12",
      question:
        "You are given the index of a node in a standard heap. Which of the following CANNOT be computed mathematically from this single index?",
      options: [
        "The index of its left child",
        "The index of its parent",
        "The total dimension/size of the heap",
        "The index of its right child",
      ],
      correctAnswer: 2,
      explanation:
        "An index strictly defines geographical position in the tree structure using bounded formulas. It contains zero metadata regarding how many total items actually exist in the background physical array.",
      difficulty: "medium",
    },
    {
      id: "pyq-q13",
      question:
        "Which of the following classical algorithms CANNOT be natively executed using Depth-First Search (DFS)?",
      options: [
        "Topological Sorting",
        "Finding Strongly Connected Components",
        "Solving a Maze",
        "Finding the shortest path in an Unweighted Social Network graph",
      ],
      correctAnswer: 3,
      explanation:
        "Finding the shortest path in unweighted networks relies heavily on radial, level-by-level expansion to guarantee optimality, which is exclusively the behavioral domain of Breadth-First Search (BFS).",
      difficulty: "hard",
    },
    {
      id: "pyq-q14",
      question:
        "In Kruskal's MST algorithm, what underlying data structure naturally prevents the formation of illegal cycles as edges are added?",
      options: ["Stack", "Hash Table", "Union-Find (Disjoint Set)", "Min-Heap"],
      correctAnswer: 2,
      explanation:
        "Kruskal's algorithm relies on Union-Find (with Path Compression and Union by Rank) to check if two vertices are already organically part of the same connected component in near O(1) mathematical time.",
      difficulty: "medium",
    },
    {
      id: "pyq-q15",
      question:
        "In addition to strictly possessing exactly V - 1 edges and no cycles, a Minimum Spanning Tree MUST simultaneously:",
      options: [
        "Be derived exclusively from a directed graph",
        "Minimize the total edge weight among all valid spanning trees",
        "Always include the single edge with the maximum absolute weight",
        "Form a completely balanced binary tree structure",
      ],
      correctAnswer: 1,
      explanation:
        "The core definition of an MST specifies that out of all valid spanning trees for a connected undirected graph, the chosen MST tree objectively possesses the lowest possible sum of global edge weights.",
      difficulty: "easy",
    },
  ],
};
