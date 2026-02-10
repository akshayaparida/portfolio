import { LearningModule } from "@/types/learning";

export const heapsModule: LearningModule = {
  id: "05-heaps",
  title: "5. Heaps",
  description: "Priority-based operations - Min Heap, Max Heap, Heapify",
  status: "in-progress",
  tags: ["Data Structure"],
  detailedContent: `# Heaps

> **Data Structure Module** - Learn priority-based data management

---

## What You'll Learn

1. Understand what makes a heap special
2. Differentiate Min Heap vs Max Heap
3. Use Python's heapq for priority queues
4. Know when to use heaps in algorithms

---

## 1. What is a Heap? (Simple Explanation)

A heap is a **special tree** with two rules:

1. **Complete binary tree** - Fill level by level, left to right
2. **Heap property** - Parent compares to children in a specific way

### Min Heap: Parent ≤ Children (Smallest on top)

\`\`\`
       1        ← Root is MINIMUM
      / \\
     3   5
    / \\
   7   9

Rule: Every parent ≤ both children
\`\`\`

### Max Heap: Parent ≥ Children (Largest on top)

\`\`\`
       9        ← Root is MAXIMUM  
      / \\
     7   5
    / \\
   3   1

Rule: Every parent ≥ both children
\`\`\`

**Key insight:** Only root is guaranteed min/max. Other nodes follow the property but aren't sorted!

---

## 2. Why Use Heaps?

They're perfect for "give me the smallest/largest" problems!

| Operation | Time |
|:----------|:-----|
| Get min/max | O(1) - Just look at root! |
| Insert | O(log n) - Bubble up |
| Remove min/max | O(log n) - Bubble down |
| Build heap | O(n) - Efficient! |

Real-world uses:
- **Priority Queue** - Hospital ER (highest priority first)
- **Task Scheduler** - Most urgent task first
- **Dijkstra's Algorithm** - Find shortest paths
- **K largest/smallest** - Top K problems

---

## 3. Using Python's heapq (Min Heap)

Python only has min heap built-in!

\`\`\`python path=null start=null
import heapq

# Create empty heap (just a list!)
min_heap = []

# Push items - O(log n) each
heapq.heappush(min_heap, 30)
heapq.heappush(min_heap, 10)
heapq.heappush(min_heap, 20)
heapq.heappush(min_heap, 5)

print(min_heap)  # [5, 10, 20, 30] - 5 is at front!

# Peek at minimum - O(1)
print(min_heap[0])  # 5 (smallest)

# Pop minimum - O(log n)
print(heapq.heappop(min_heap))  # 5
print(heapq.heappop(min_heap))  # 10
print(heapq.heappop(min_heap))  # 20
\`\`\`

---

## 4. Max Heap Trick (Negate Values!)

Python doesn't have max heap, so we trick it:

\`\`\`python path=null start=null
import heapq

# For MAX heap, negate values!
max_heap = []
heapq.heappush(max_heap, -30)  # Store as -30
heapq.heappush(max_heap, -10)  # Store as -10
heapq.heappush(max_heap, -20)

# Pop and negate back
print(-heapq.heappop(max_heap))  # 30 (largest!)
print(-heapq.heappop(max_heap))  # 20
print(-heapq.heappop(max_heap))  # 10
\`\`\`

**Why this works:** -30 < -20 < -10, so min heap gives us -30 first.
When we negate back, we get 30 (maximum)!

---

## 5. Heapify - Convert List to Heap

\`\`\`python path=null start=null
import heapq

# Start with unsorted list
arr = [30, 10, 50, 20, 40]

# Convert to heap IN-PLACE - O(n)
heapq.heapify(arr)

print(arr)  # [10, 20, 50, 30, 40]
#            10 is now at front (minimum)

# Now arr is a valid min heap!
print(heapq.heappop(arr))  # 10
print(heapq.heappop(arr))  # 20
\`\`\`

**Fun fact:** heapify is O(n), not O(n log n)! 
Most nodes are near the bottom (cheap to heapify).

---

## 6. Common Heap Problems

### Find K Largest Elements
\`\`\`python path=null start=null
import heapq

def k_largest(nums, k):
    # nlargest returns k largest in descending order
    return heapq.nlargest(k, nums)

print(k_largest([3, 1, 5, 12, 2, 11], 3))  # [12, 11, 5]
\`\`\`

### Find K Smallest Elements
\`\`\`python path=null start=null
import heapq

def k_smallest(nums, k):
    return heapq.nsmallest(k, nums)

print(k_smallest([3, 1, 5, 12, 2, 11], 3))  # [1, 2, 3]
\`\`\`

---

## Key Takeaways

| Operation | Time | Notes |
|:----------|:-----|:------|
| Peek min/max | O(1) | Just arr[0] |
| Push | O(log n) | Bubble up |
| Pop | O(log n) | Bubble down |
| Heapify | O(n) | Not O(n log n)! |

**Remember:**
- Min heap = Smallest on top
- Max heap = Largest on top (use negation in Python)
- Root is guaranteed min/max
- Rest is NOT fully sorted!
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "heap-q1",
      question: "A min-heap guarantees that:",
      options: [
        "Left child < Right child",
        "Parent ≤ Children",
        "Tree is fully sorted",
        "All leaves are equal",
      ],
      correctAnswer: 1,
      explanation:
        "Min-heap property: Parent ≤ Children. Root is always minimum. Siblings have no ordering guarantee.",
      difficulty: "easy",
    },
    {
      id: "heap-q2",
      question: "Heapify an array of n elements takes:",
      options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
      correctAnswer: 2,
      explanation:
        "Heapify is O(n), not O(n log n). Uses bottom-up approach. Most nodes near leaves need minimal work.",
      difficulty: "medium",
    },
    {
      id: "heap-q3",
      question: "To implement a max heap in Python using heapq, you should:",
      options: [
        "Use heapq.maxheap()",
        "Store negative values",
        "Set a flag",
        "It's not possible",
      ],
      correctAnswer: 1,
      explanation:
        "Store negative values. Python heapq is min-heap only. Push -value, pop and negate to get max behavior.",
      difficulty: "easy",
    },
    {
      id: "heap-q4",
      question: "The time complexity of extracting minimum from a min heap is:",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 1,
      explanation:
        "Extract min is O(log n). Remove root (O(1)), replace with last element, then bubble down to restore heap property.",
      difficulty: "easy",
    },
    {
      id: "heap-q5",
      question: "In a max heap with n elements, the maximum is found at:",
      options: [
        "Any position",
        "Last position",
        "Root (first position)",
        "Middle position",
      ],
      correctAnswer: 2,
      explanation:
        "Maximum is always at root (index 0) in max heap. That's the heap property - parent ≥ children recursively.",
      difficulty: "easy",
    },
    {
      id: "heap-q6",
      question: "A heap is typically implemented using:",
      options: ["Linked list", "Binary search tree", "Array", "Hash table"],
      correctAnswer: 2,
      explanation:
        "Array is most efficient. For node at index i: left child = 2i+1, right child = 2i+2, parent = (i-1)/2.",
      difficulty: "easy",
    },
    {
      id: "heap-q7",
      question: "Which algorithm commonly uses a min heap?",
      options: [
        "Bubble Sort",
        "Dijkstra's Shortest Path",
        "DFS",
        "Binary Search",
      ],
      correctAnswer: 1,
      explanation:
        "Dijkstra uses min heap to always process the closest unvisited vertex. Priority queue gives O((V+E)log V) complexity.",
      difficulty: "medium",
    },
    {
      id: "heap-q8",
      question: "The time complexity of inserting an element into a heap is:",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 1,
      explanation:
        "Insert is O(log n). Add at end (O(1)), then bubble up comparing with parents (at most log n levels).",
      difficulty: "easy",
    },
    {
      id: "heap-q9",
      question: "In heap sort, building the initial heap takes:",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
      correctAnswer: 0,
      explanation:
        "Building heap is O(n). Counter-intuitively not O(n log n) because most nodes are near bottom with small subtrees.",
      difficulty: "medium",
    },
    {
      id: "heap-q10",
      question: "Which is TRUE about a complete binary tree (heap structure)?",
      options: [
        "All leaves at same level",
        "Filled left to right, level by level",
        "Always perfectly balanced",
        "Has exactly 2^n nodes",
      ],
      correctAnswer: 1,
      explanation:
        "Complete binary tree fills left to right, level by level. Last level may be incomplete but fills from left.",
      difficulty: "easy",
    },
  ],
};
