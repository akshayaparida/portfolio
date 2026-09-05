import { LearningModule } from "@/types/learning";

export const heapsPriorityQueuesModule: LearningModule = {
  id: "07-heaps-priority-queues",
  title: "7. Binary Heaps & Priority Queues",
  description:
    "Complete binary tree array mapping, Min/Max Heap property, O(n) Build-Heap mathematical proof, sift-up/down, and Priority Queues in C, C++, and Python",
  status: "completed",
  tags: ["Data Structure", "GATE CS", "UGC NET", "NPTEL"],
  detailedContent: `# Binary Heaps & Priority Queues

> **NPTEL / GATE CS / UGC NET Core Subject**
> Key Exam Questions: Array index mapping (0-based vs 1-based), mathematical derivation of $O(n)$ Build-Heap, and priority queue operations.

---

## 1. Prerequisites & What You Should Know

Before studying heaps, ensure you understand:
- **Complete Binary Trees (Module 5)**: A heap IS a complete binary tree stored as an array.
- **Arrays**: Heaps use array indexing to navigate parent-child relationships.
- **Recursion**: Sift-down (heapify) is naturally recursive.
- **Logarithms**: The height of a heap is $\\lfloor \\log_2 n \\rfloor$, which determines operation time.

---

## 2. What is a Heap? (Conceptual Explanation)

### 2.1 The Hospital Emergency Room Analogy

Think of a **hospital emergency room (ER)**:
- Patients don't wait in arrival order (that would be a queue).
- Instead, the patient with the **most critical condition** (highest priority) is treated first.
- When a new patient arrives, they're placed according to their severity level.
- The doctor always treats the most urgent case next.

This is exactly what a **Priority Queue** does, and a **Binary Heap** is the most efficient way to implement it!

### 2.2 What Makes a Heap Special?

A **Binary Heap** combines two properties:
1. **Shape Property**: It's a **Complete Binary Tree** — all levels are filled except possibly the last, which is filled from left to right.
2. **Heap Property**: Every parent is "better" than its children (Max-Heap: parent ≥ children; Min-Heap: parent ≤ children).

\`\`\`
Max-Heap:                    Min-Heap:
      90                          5
     / \\                        / \\
   70   80                     10  15
  / \\   /                    / \\  /
 30 50 60                   20 30 25

Rule: Every parent ≥ children    Rule: Every parent ≤ children
Root = Maximum element          Root = Minimum element
\`\`\`

### 2.3 The Brilliant Trick: Storing a Tree in an Array!

Since a heap is a *complete* binary tree, we can store it in a flat array with **zero pointers** — saving massive memory:

\`\`\`
Heap Tree:          Array Representation:
      90            Index: [0]  [1]  [2]  [3]  [4]  [5]
     / \\            Value: [90] [70] [80] [30] [50] [60]
   70   80
  / \\   /           Parent of i  = (i-1)/2
 30 50 60           Left child   = 2i + 1
                    Right child  = 2i + 2

Node 70 at index 1:
  Parent = (1-1)/2 = 0 → 90  ✓
  Left   = 2(1)+1 = 3  → 30  ✓
  Right  = 2(1)+2 = 4  → 50  ✓
\`\`\`

---

## 3. Why Do We Need Heaps?

### 3.1 The Problem Heaps Solve

Without heaps, finding the maximum or minimum element efficiently while also supporting insertions is hard:

| Data Structure | Find Min/Max | Insert | Extract Min/Max |
|:---|:---|:---|:---|
| Unsorted Array | $O(n)$ scan | $O(1)$ | $O(n)$ scan + shift |
| Sorted Array | $O(1)$ | $O(n)$ shifting | $O(1)$ or $O(n)$ |
| **Binary Heap** | **$O(1)$** | **$O(\\log n)$** | **$O(\\log n)$** |

### 3.2 Real-World Applications

1. **Priority Scheduling (OS)**: Process with highest priority runs next.
2. **Dijkstra's Shortest Path**: Min-heap extracts the closest unvisited node.
3. **Huffman Coding**: Build optimal prefix codes using a min-heap.
4. **Heap Sort**: In-place $O(n \\log n)$ sorting.
5. **K Largest/Smallest Elements**: Maintain a heap of size $k$.
6. **Merge K Sorted Lists**: Min-heap efficiently merges multiple streams.
7. **Median Maintenance**: Two heaps (max-heap + min-heap) track running median.

---

## 4. How Heap Operations Work

### 4.1 Sift-Up (Used in Insert)

When you insert a new element, place it at the end and "bubble it up" by swapping with its parent until the heap property is restored:

\`\`\`
Insert 85 into Max-Heap [90, 70, 80, 30, 50, 60]:

Step 1: Place 85 at the end (index 6)
[90, 70, 80, 30, 50, 60, 85]
                           ↑ new element

Step 2: Compare with parent (index (6-1)/2 = 2 → 80)
85 > 80 → SWAP!
[90, 70, 85, 30, 50, 60, 80]
          ↑                 ↑ swapped

Step 3: Compare with parent (index (2-1)/2 = 0 → 90)
85 < 90 → STOP! Heap property restored.

Result: [90, 70, 85, 30, 50, 60, 80]  ✓
\`\`\`

### 4.2 Sift-Down (Used in Extract-Min/Max)

When you extract the root (min or max), move the last element to the root and "push it down" by swapping with its larger/smaller child:

\`\`\`
Extract-Max from Max-Heap [90, 70, 85, 30, 50, 60, 80]:

Step 1: Save root (90). Move last element (80) to root.
[80, 70, 85, 30, 50, 60]
 ↑ new root

Step 2: Compare 80 with children (70, 85). 85 > 80 → SWAP with 85!
[85, 70, 80, 30, 50, 60]
          ↑             ↑ swapped

Step 3: Compare 80 with children (60). 80 > 60 → STOP!

Result: [85, 70, 80, 30, 50, 60]  ✓
Extracted: 90
\`\`\`

### 4.3 Build-Heap: Why O(n) and NOT O(n log n)?

\`\`\`
Intuition: Most nodes are near the BOTTOM of the tree!

Height 0 (leaves):     ~n/2 nodes  ×  0 swaps each  =  0
Height 1:              ~n/4 nodes  ×  1 swap each   =  n/4
Height 2:              ~n/8 nodes  ×  2 swaps each  =  n/4
Height 3:              ~n/16 nodes ×  3 swaps each  =  3n/16
...

Total = n/4 + n/4 + 3n/16 + ... ≈ n × (sum of h/2^h)

Since Σ(h/2^h) for h=0 to ∞ = 2, Total ≤ 2n = O(n)

Half the nodes (leaves) do ZERO work! That's why it's O(n), not O(n log n).
\`\`\`

---

## 5. Index Arithmetic (GATE Formula Sheet)

### 0-Based Indexing
For any node at index $i$:
- **Parent**: $\\lfloor \\frac{i - 1}{2} \\rfloor$
- **Left Child**: $2i + 1$
- **Right Child**: $2i + 2$
- **Last Non-Leaf Node**: $\\lfloor \\frac{n}{2} \\rfloor - 1$

### 1-Based Indexing
- **Parent**: $\\lfloor i/2 \\rfloor$
- **Left Child**: $2i$
- **Right Child**: $2i+1$
- **Last Internal Node**: $\\lfloor n/2 \\rfloor$

---

## 6. Implementation in C, C++, and Python with Syntax Logic

### C Implementation (Array Heap with Sift-Up and Sift-Down)

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

/**
 * C Syntax Logic Note:
 * 1. Flat Array Storage: No pointers per node, saving 16 bytes per node on 64-bit systems!
 * 2. Swapping by Reference: Helper swap(int* a, int* b) uses dereferenced pointers.
 */

typedef struct {
    int* data;
    int size;
    int capacity;
} MinHeap;

MinHeap* createMinHeap(int capacity) {
    MinHeap* h = (MinHeap*)malloc(sizeof(MinHeap));
    h->data = (int*)malloc(capacity * sizeof(int));
    h->size = 0;
    h->capacity = capacity;
    return h;
}

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// Sift-Down (Heapify down): O(log n)
void minHeapify(MinHeap* h, int i) {
    int smallest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < h->size && h->data[left] < h->data[smallest])
        smallest = left;

    if (right < h->size && h->data[right] < h->data[smallest])
        smallest = right;

    if (smallest != i) {
        swap(&h->data[i], &h->data[smallest]);
        minHeapify(h, smallest); // Recursively heapify the affected subtree
    }
}

// Extract Minimum (Root): O(log n)
int extractMin(MinHeap* h) {
    if (h->size <= 0) return -1;
    if (h->size == 1) return h->data[--(h->size)];

    int root = h->data[0];
    // Move last element to root, decrement size
    h->data[0] = h->data[--(h->size)];
    // Sift down new root to restore heap property
    minHeapify(h, 0);

    return root;
}

// Insert Key: O(log n) via Sift-Up
void insertHeap(MinHeap* h, int key) {
    if (h->size == h->capacity) return; // Overflow

    int i = h->size++;
    h->data[i] = key;

    // Sift-Up: Swap with parent while parent is greater
    while (i != 0 && h->data[(i - 1) / 2] > h->data[i]) {
        swap(&h->data[i], &h->data[(i - 1) / 2]);
        i = (i - 1) / 2;
    }
}
\`\`\`

---

### C++ Implementation (std::priority_queue & Custom Comparator)

\`\`\`cpp
#include <iostream>
#include <queue>
#include <vector>

/**
 * C++ Syntax Logic Note:
 * 1. std::priority_queue<T> is a MAX-HEAP by default.
 * 2. To create a MIN-HEAP in C++, pass std::greater<T>:
 *    std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;
 * 3. Container Adapter: Uses std::vector underneath with make_heap(), push_heap(), pop_heap().
 */

void demonstrateHeaps() {
    // Default Max-Heap
    std::priority_queue<int> maxHeap;
    maxHeap.push(10);
    maxHeap.push(30);
    maxHeap.push(20);
    std::cout << "Max Heap Top: " << maxHeap.top() << "\\n"; // 30

    // Custom Min-Heap using std::greater
    std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;
    minHeap.push(10);
    minHeap.push(30);
    minHeap.push(20);
    std::cout << "Min Heap Top: " << minHeap.top() << "\\n"; // 10
}
\`\`\`

---

### Python Implementation (heapq Module & Max-Heap Inversion)

\`\`\`python
"""
Python Syntax Logic Note:
1. Python's built-in "heapq" module implements a MIN-HEAP directly on standard lists.
2. heapq.heapify(lst) converts list into a min-heap IN-PLACE in O(n) time.
3. Max-Heap in Python: Since heapq has no max-heap parameter, standard idiom is
   multiplying values by -1 when pushing, and negating upon pop!
"""

import heapq

def k_largest_elements(nums: list[int], k: int) -> list[int]:
    """
    Finds k largest elements using a min-heap of size k.
    Time Complexity: O(n log k), Space Complexity: O(k).
    """
    min_heap = []
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap) # Evict smallest
            
    return sorted(min_heap, reverse=True)
\`\`\`

---

## 7. GATE & UGC NET Key Summary

| Operation | Time Complexity | Space Complexity |
|:---|:---|:---|
| **Build-Heap** | $O(n)$ | $O(1)$ in-place |
| **Insert** | $O(\\log n)$ | $O(1)$ |
| **Extract-Min / Max** | $O(\\log n)$ | $O(1)$ |
| **Find-Min / Max** | $O(1)$ | $O(1)$ |
| **Heap Sort** | $O(n \\log n)$ | $O(1)$ |

> [!IMPORTANT]
> **GATE Classic: Build-Heap is O(n), NOT O(n log n)!**
> Many students assume inserting $n$ elements one-by-one ($O(n \\log n)$) is the same as Build-Heap. It's not! Build-Heap works bottom-up, and since most nodes are near the leaves (where sift-down does little work), the total cost is only $O(n)$.
`,
};
