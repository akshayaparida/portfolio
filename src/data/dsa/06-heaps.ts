import { LearningModule } from "@/types/learning";

export const heapsModule: LearningModule = {
  id: "06-heaps",
  title: "6. Heaps",
  description:
    "Priority-based operations - Min Heap, Max Heap, Heap Sort, Heapify",
  status: "completed",
  tags: ["Data Structure"],
  detailedContent: `# Heaps

> **Data Structure Module** — Maintaining order dynamically

---

## What You'll Learn

| # | Topic | Why It Matters |
|:--|:------|:---------------|
| 1 | Heap Definition | Complete binary tree + Heap property |
| 2 | Height of Heap | ⌊log₂ n⌋ — the secret to O(log n) operations |
| 3 | Heapify | Restoring order in O(log n) time |
| 4 | Build Heap | The famous O(n) exam trap |
| 5 | Heap Sort | Reliable, in-place, O(n log n) sorting |

---

## 1. What is a Heap?

A heap is NOT just any binary tree. It must satisfy **two strict rules**:

### Rule 1: Shape Property (Complete Binary Tree)

A heap must be a **Complete Binary Tree**.
This means the tree is filled **level by level, from left to right**. The last level may be incomplete, but it must be filled starting from the leftmost position.

### Rule 2: Heap Property (Order)

- **Max-Heap:** Parent ≥ Children (Largest element at the root)
- **Min-Heap:** Parent ≤ Children (Smallest element at the root)

~~~text
  Max Heap:                    Min Heap:
       [90]                         [10]
      /    \\                       /    \\
   [70]    [50]                 [30]    [20]
   /  \\    /                    /  \\    /
 [30] [10][40]                [70] [50][40]

  Parent ≥ Children            Parent ≤ Children
~~~

> **Crucial insight:** A heap is partially ordered, not fully sorted! Siblings have NO guaranteed relationship. You only know the parent is $\\ge$ or $\\le$ the children.

---

## 2. The Power of Height

Why are heap operations so fast? It's all about the **height** of the tree.

~~~text
  Height of a heap = ⌊log₂ n⌋
~~~

Because a heap is a *complete binary tree*, it is always perfectly balanced.
- 1,000 nodes → Height ≈ 10
- 1,000,000 nodes → Height ≈ 20

**Any operation that travels from the root to a leaf takes $O(\\log n)$ time.**
The structure naturally bounds the worst-case performance!

---

## 3. Heapify

**Heapify** is the process of restoring the heap property when a single node violates it.

Imagine a max-heap where the root is suddenly replaced by a very small number. To fix the heap, that small number must "float down" (swap with its largest child) until it reaches a valid position.

~~~text
  Heapify Down (Max-Heap example):
  The root [10] violates the property.

       [10]  ← violation!
      /    \\
   [70]    [50]
   /  \\
 [30] [20]

  Step 1: Swap 10 with the larger child (70)
       [70]
      /    \\
   [10]    [50]
   /  \\
 [30] [20]

  Step 2: 10 still violates property. Swap with larger child (30)
       [70]
      /    \\
   [30]    [50]
   /  \\
 [10] [20]   ← Heap restored!
~~~

### Complexity of Heapify:

- **Worst case:** Element floats down the entire height of the tree.
- **Height:** $\\approx \\log n$
- **Time Complexity:** $O(\\log n)$

Because heapify is $O(\\log n)$:
- **Insert in heap** (append to end, bubble up) = $O(\\log n)$
- **Delete in heap** (swap root with last, remove last, heapify root down) = $O(\\log n)$

---

## 4. Building a Heap from an Array

How do we take an unsorted array and turn it into a valid heap?
We call \`heapify()\` on all non-leaf nodes, starting from the last non-leaf node up to the root.

### The Exam Trap: Complexity of Build Heap

If \`heapify\` takes $O(\\log n)$, and we call it $n/2$ times, the complexity must be $O(n \\log n)$, right?
**WRONG.**

~~~text
  Build Heap from Array = O(n)
~~~

**Why?**
Most of the nodes in a complete binary tree are at the bottom (leaves).
- Leaves don't need to be heapified (they have no children).
- Nodes one level above leaves only travel 1 step.
- Only the single root node travels the full $\\log n$ steps.

When you sum the mathematical series: $\\sum (h \\times \\text{nodes at height } h)$, it tightly converges to $O(n)$.

> **Exam Gold:** Never say building a heap is $O(n \\log n)$. It is strictly $O(n)$.

---

## 5. Heap Sort

Heap Sort leverages the max-heap to sort an array in place.

### The Algorithm:
1. **Build Max Heap** from the unsorted array ($O(n)$).
2. The largest element is now at the root.
3. **Swap** the root with the last element in the heap.
4. **Reduce** the heap size by 1 (the last element is now sorted at the end of the array!).
5. **Heapify** the new root down to restore the max-heap property ($O(\\log n)$).
6. Repeat steps 3-5 until the heap is empty.

~~~text
  Step-by-step logic:
  Array: [30, 10, 50, 20, 40]

  1. Build Max Heap: [50, 40, 30, 20, 10]
  2. Swap 50 (root) with 10 (last): [10, 40, 30, 20 | 50(sorted)]
  3. Heapify root (10): [40, 20, 30, 10 | 50(sorted)]
  4. Swap 40 with 10: [10, 20, 30 | 40, 50(sorted)]
  5. Heapify root (10): [30, 20, 10 | 40, 50(sorted)]
  ... and so on.
~~~

### Complexity Profile:
| Metric | Value | Reason |
|:-------|:------|:-------|
| Time Complexity | **O(n log n)** | $O(n)$ to build + $n \\times O(\\log n)$ extractions |
| Space Complexity | **O(1)** | Sorts entirely in-place! |
| Stable? | **No** | Equal elements can jump around during heapify. |

> Heap sort is disciplined and reliable. It **never** degrades to $O(n^2)$ like Quick Sort can. However, it is often slower than Quick Sort in practice due to poor cache locality (jumping around array indices).

---

## 6. Array Implementation of Heaps

Heaps are beautifully mapped to arrays without needing node objects or pointers.

For any element at index $i$ (using 0-based indexing):
- **Left Child:** $2i + 1$
- **Right Child:** $2i + 2$
- **Parent:** $\\lfloor(i - 1) / 2\\rfloor$

~~~python
# Python uses heapq (Min-Heap by default)
import heapq

# Start with unsorted list
arr = [30, 10, 50, 20, 40]

# Convert to heap IN-PLACE - O(n)
heapq.heapify(arr)
print(arr)  # [10, 20, 50, 30, 40] -> Root is 10

# Push - O(log n)
heapq.heappush(arr, 5)

# Pop min - O(log n)
smallest = heapq.heappop(arr)
~~~

---

## Key Takeaways

| Metric / Concept | Details |
|:-----------------|:--------|
| **Height** | $\\lfloor\\log_2 n\\rfloor$ |
| **Heapify** | $O(\\log n)$ |
| **Build Heap** | **O(n)** (Exam favourite!) |
| **Heap Sort** | $O(n \\log n)$, $O(1)$ space, NOT stable |
| **Min-Heap Root** | Always the smallest element |
| **Max-Heap Root** | Always the largest element |

---

## TL;DR - Quick Recall

**One-liner for each concept:**

| Concept | Key Takeaway |
|:--------|:-------------|
| **Heap Structure** | Complete binary tree. Filled left to right, level by level. |
| **Heap Property** | Max-heap = Parent $\\ge$ Children. Min-heap = Parent $\\le$ Children. |
| **Height** | $\\log n$. This keeps all traversal bounds tight to $O(\\log n)$. |
| **Build Heap** | Converts unsorted array to heap. Takes **$O(n)$** time. |
| **Heapify** | Bubbles a node down to restore property. Takes **$O(\\log n)$** time. |
| **Heap Sort** | In-place! $O(n \\log n)$ time, $O(1)$ space. Unstable. |
| **Array Maths** | Parent: $(i-1)/2$, Left: $2i+1$, Right: $2i+2$. |

**The Golden Rules:**
1. A Heap is NOT a full sorted structure; it only guarantees the root is the extreme value.
2. Python only implements Min-Heaps. To use a Max-Heap naturally, multiply all numbers by \`-1\` before pushing, and multiply by \`-1\` when popping.
3. If an exam asks for sorting with $O(1)$ space and guaranteed $O(n \\log n)$ time, the answer is always **Heap Sort**.

---

## Additional Resources

**Video Courses:**
- [Abdul Bari - Heap Sort](https://youtu.be/HqPJF2L5h9U) - Detailed algorithm breakdown
- [NeetCode - Priority Queue / Heap](https://youtu.be/HqPJF2L5h9U) - Great visual explanations

**Practice Problems:**
- LeetCode 215: Kth Largest Element in an Array (Classic Heap Problem)
- LeetCode 1046: Last Stone Weight
- LeetCode 347: Top K Frequent Elements
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "heap-q1",
      question: "What is the height of a heap with n elements?",
      options: ["O(n)", "O(n log n)", "⌊log₂ n⌋", "O(1)"],
      correctAnswer: 2,
      explanation:
        "A heap is a complete binary tree, which means it is always perfectly balanced. Its height is bounded by ⌊log₂ n⌋, ensuring logarithmic bounds for travel from root to leaf.",
      difficulty: "easy" as const,
    },
    {
      id: "heap-q2",
      question:
        "What is the time complexity of building a heap from an unsorted array of n elements?",
      options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
      correctAnswer: 2,
      explanation:
        "Building a heap is O(n), not O(n log n). This is a classic exam trap! Most nodes are near the bottom of the tree and travel 0 or 1 steps during the heapify process.",
      difficulty: "medium" as const,
    },
    {
      id: "heap-q3",
      question: "In Heap Sort, what is the space complexity?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      correctAnswer: 3,
      explanation:
        "Heap Sort sorts entirely in-place within the array. It has O(1) auxiliary space, giving it a memory advantage over Merge Sort (O(n)) and Quick Sort (O(log n) stack).",
      difficulty: "easy" as const,
    },
    {
      id: "heap-q4",
      question:
        "Which of the following describes the Heap Sort algorithm steps?",
      options: [
        "Partition around a pivot, recursively sort",
        "Divide array in half, recursively sort, merge",
        "Build max-heap, repeatedly swap root with last item, reduce heap size, heapify root",
        "Build min-heap, repeatedly bubble adjacent elements",
      ],
      correctAnswer: 2,
      explanation:
        "Heap sort builds a max-heap, puts the maximum (root) at the end of the array, reduces the heap boundary by 1, and calls heapify(0) to restore the heap. Repeated n times, this sorts the array ascending.",
      difficulty: "medium" as const,
    },
    {
      id: "heap-q5",
      question: "Is Heap Sort stable?",
      options: [
        "Yes, always",
        "No, never",
        "Depends on implementation",
        "Only for integer arrays",
      ],
      correctAnswer: 1,
      explanation:
        "Heap sort is NOT stable. The process of swapping the root with the last element of the heap and bubbling down destroys the relative ordering of equal elements.",
      difficulty: "easy" as const,
    },
    {
      id: "heap-q6",
      question:
        "If a node is at index i (0-based) in an array representation of a heap, its left child is at:",
      options: ["i/2", "2i + 1", "2i + 2", "2i"],
      correctAnswer: 1,
      explanation:
        "For 0-based arrays, Left Child is 2i + 1, Right Child is 2i + 2, and Parent is ⌊(i-1)/2⌋. For 1-based arrays, Left is 2i, Right is 2i+1.",
      difficulty: "medium" as const,
    },
    {
      id: "heap-q7",
      question:
        "What is the worst-case time complexity of the Heapify operation on a single node?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
      correctAnswer: 2,
      explanation:
        "In the worst case, a node violates the heap property and must 'float down' all the way to a leaf. It travels the full height of the tree, which is O(log n).",
      difficulty: "easy" as const,
    },
    {
      id: "heap-q8",
      question:
        "A tree is legally a heap ONLY IF it satisfies the heap property AND what other property?",
      options: [
        "It is a binary search tree",
        "It is a strictly full binary tree",
        "It is a complete binary tree",
        "It contains no duplicate values",
      ],
      correctAnswer: 2,
      explanation:
        "A heap must be a Complete Binary Tree (filled level by level, left to right). This guarantees its shape can be perfectly mapped to an array without gaps.",
      difficulty: "medium" as const,
    },
    {
      id: "heap-q9",
      question:
        "Why might Quick Sort be faster than Heap Sort in practice, even though Heap Sort has a better worst-case time bound?",
      options: [
        "Heap sort does more comparisons on average",
        "Heap sort has poor cache locality because it jumps around array indices",
        "Quick sort uses less memory",
        "Quick sort doesn't require recursion",
      ],
      correctAnswer: 1,
      explanation:
        "Heap Sort constantly compares elements at index i, 2i+1, and 2i+2. In large arrays, these are far apart in memory, causing frequent CPU cache misses. Quick Sort processes arrays sequentially, which is highly cache-friendly.",
      difficulty: "hard" as const,
    },
    {
      id: "heap-q10",
      question:
        "In a min-heap with 100 distinct elements, where could the second smallest element be?",
      options: [
        "Only at the root",
        "MUST be the left child of the root",
        "Either the left or right child of the root",
        "Any leaf node",
      ],
      correctAnswer: 2,
      explanation:
        "The absolute minimum is at the root. The children of the root (indices 1 and 2) must be larger than the root. One of them MUST be the second smallest element overall, because if a deeper node was smaller, it would violate the property against its parent.",
      difficulty: "hard" as const,
    },
  ],
};
