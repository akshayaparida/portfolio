import { LearningModule } from "@/types/learning";

export const searchingSortingModule: LearningModule = {
  id: "08-searching-sorting",
  title: "8. Searching & Sorting",
  description:
    "Core Algorithms - Bubble, Selection, Insertion, Shell, Merge, Quick, Heap Sort",
  status: "completed",
  tags: ["Algorithm"],
  detailedContent: `# Searching & Sorting Algorithms

> **Algorithm Module (CUET PG Lecture 11)** — Where time complexity becomes power

---

## What You'll Learn

| # | Topic | Why It Matters |
|:--|:------|:---------------|
| 1 | Two complexity classes | O(n²) vs O(n log n) — the fundamental divide |
| 2 | Searching algorithms | Linear & Binary search |
| 3 | O(n²) sorts | Bubble, Selection, Insertion, Shell |
| 4 | O(n log n) sorts | Merge, Quick, Heap |
| 5 | Stability & lower bounds | What comparison sorts can and cannot do |
| 6 | Recurrence relations | Master Theorem for divide & conquer |

---

## 1. The Two Complexity Classes

\`\`\`text
  ┌─────────────────────────────────────────────────────────┐
  │  O(n²)        →  Bubble, Selection, Insertion, Shell    │
  │  O(n log n)   →  Merge, Quick, Heap                    │
  └─────────────────────────────────────────────────────────┘

  If n = 10,000:
    n²       = 100,000,000  (one hundred million operations)
    n log n  ≈ 132,877      (one hundred thirty-three thousand)

  That's the difference between "runs instantly"
  and "why is my laptop crying?"
\`\`\`

> **First mental separation:** If someone says "O(n²) sort" — it's educational. If they say "O(n log n)" — it's production-ready.

---

## 2. Searching Algorithms

### Linear Search — O(n)

Check every item one by one. Works on **any** list (sorted or unsorted).

\`\`\`python path=null start=null
def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i      # Found at index i
    return -1             # Not found

nums = [5, 2, 8, 1, 9]
print(linear_search(nums, 8))   # 2
print(linear_search(nums, 7))   # -1
\`\`\`

### Binary Search — O(log n)

Divide search space in half each step. **Requires sorted array!**

\`\`\`python path=null start=null
def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1       # Target in right half
        else:
            right = mid - 1      # Target in left half

    return -1

nums = [1, 2, 5, 8, 9, 12, 15]
print(binary_search(nums, 8))    # 3
print(binary_search(nums, 10))   # -1
\`\`\`

\`\`\`text
  Why O(log n)?

  Start: [1, 2, 5, 8, 9, 12, 15]   7 elements
  Step 1: search [9, 12, 15]        3 elements
  Step 2: search [9]                1 element

  7 → 3 → 1 = only 3 steps!
  For 1,000 items: ~10 steps
  For 1,000,000 items: ~20 steps
\`\`\`

| Search | Time | Requires Sorted | Space |
|:-------|:-----|:----------------|:------|
| Linear | O(n) | No | O(1) |
| Binary | **O(log n)** | **Yes** | O(1) |

---

## 3. Bubble Sort — O(n²)

**Idea:** Repeatedly compare adjacent elements and swap if out of order. Largest element "bubbles" to the end each pass.

\`\`\`python path=null start=null
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(n - 1 - i):        # Last i elements already sorted
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:                    # Optimization: already sorted
            break
    return arr
\`\`\`

\`\`\`text
  Pass-by-pass trace: [5, 3, 8, 1]

  Pass 1: [3,5,8,1] → [3,5,8,1] → [3,5,1,8]   ← 8 bubbled to end
  Pass 2: [3,5,1,8] → [3,1,5,8]                 ← 5 in place
  Pass 3: [1,3,5,8]                              ← Done!

  ┌──────────────────────────────────────────────┐
  │  Number of comparisons = n(n − 1) / 2       │
  │                                              │
  │  n = 5: comparisons = 5(4)/2 = 10           │
  │  n = 100: comparisons = 100(99)/2 = 4950    │
  │                                              │
  │  Worst case: O(n²)                           │
  │  Best case (already sorted): O(n)            │
  │  Stable: YES                                 │
  │  Space: O(1)                                 │
  └──────────────────────────────────────────────┘
\`\`\`

---

## 4. Selection Sort — O(n²)

**Idea:** Find the smallest element, swap with first position. Repeat for remaining.

\`\`\`python path=null start=null
def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr
\`\`\`

\`\`\`text
  Trace: [29, 10, 14, 37, 13]

  Pass 1: min=10 at idx 1 → swap with idx 0 → [10, 29, 14, 37, 13]
  Pass 2: min=13 at idx 4 → swap with idx 1 → [10, 13, 14, 37, 29]
  Pass 3: min=14 at idx 2 → no swap needed   → [10, 13, 14, 37, 29]
  Pass 4: min=29 at idx 4 → swap with idx 3 → [10, 13, 14, 29, 37]

  ┌──────────────────────────────────────────────────┐
  │  Key property:                                   │
  │  Number of SWAPS = at most n (very few swaps!)   │
  │  Number of COMPARISONS = n(n−1)/2 (same always!) │
  │                                                  │
  │  EXAM TRAP: Selection sort ALWAYS performs the    │
  │  same number of comparisons regardless of input. │
  │                                                  │
  │  Best/Avg/Worst: ALL O(n²)                       │
  │  Stable: NO (generally)                          │
  │  Space: O(1)                                     │
  └──────────────────────────────────────────────────┘
\`\`\`

---

## 5. Insertion Sort — O(n²)

**Idea:** Take next element, insert into the already-sorted left portion.

\`\`\`python path=null start=null
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:    # Shift larger elements right
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key                  # Insert key at correct position
    return arr
\`\`\`

\`\`\`text
  Trace: [5, 3, 4, 1, 2]

  i=1: key=3, shift 5 right → [3, 5, 4, 1, 2]
  i=2: key=4, shift 5 right → [3, 4, 5, 1, 2]
  i=3: key=1, shift 5,4,3   → [1, 3, 4, 5, 2]
  i=4: key=2, shift 5,4,3   → [1, 2, 3, 4, 5]

  ┌──────────────────────────────────────────────────┐
  │  Worst case: O(n²)  — reverse sorted array      │
  │  Best case:  O(n)   — already sorted array!      │
  │  Stable: YES                                     │
  │  Space: O(1)                                     │
  │                                                  │
  │  VERY efficient for:                             │
  │  • Small arrays (n < 20)                         │
  │  • Nearly sorted arrays                          │
  │                                                  │
  │  Real systems (Java, Python) switch to insertion │
  │  sort for small partitions inside merge/quick.   │
  │  Professional code uses it more than textbooks   │
  │  admit.                                          │
  └──────────────────────────────────────────────────┘
\`\`\`

---

## 6. Shell Sort

**Generalization of insertion sort.** Instead of shifting one position at a time, it uses **gaps** that shrink over time.

\`\`\`python path=null start=null
def shell_sort(arr):
    n = len(arr)
    gap = n // 2                        # Start with large gap

    while gap > 0:
        for i in range(gap, n):         # Insertion sort with gap
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2                       # Reduce gap

    return arr
\`\`\`

\`\`\`text
  Example: [35, 33, 42, 10, 14, 19, 27, 44]

  Gap = 4: compare elements 4 apart
           [14, 19, 27, 10, 35, 33, 42, 44]

  Gap = 2: compare elements 2 apart
           [14, 10, 27, 19, 35, 33, 42, 44]

  Gap = 1: regular insertion sort (on nearly-sorted data!)
           [10, 14, 19, 27, 33, 35, 42, 44]

  ┌──────────────────────────────────────────────────┐
  │  Complexity: O(n log² n) to O(n^1.5)            │
  │  (depends on gap sequence)                       │
  │                                                  │
  │  Stable: NO                                      │
  │  Space: O(1)                                     │
  │                                                  │
  │  Not heavily tested in theory exams, but         │
  │  appears in competitive and practical contexts.  │
  └──────────────────────────────────────────────────┘
\`\`\`

---

## 7. Merge Sort — O(n log n) ⭐

**Divide and conquer masterpiece.**

Steps:
1. **Divide** → split into two halves
2. **Conquer** → recursively sort each half
3. **Combine** → merge the two sorted halves

\`\`\`python path=null start=null
def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])         # Sort left half
    right = merge_sort(arr[mid:])        # Sort right half

    return merge(left, right)            # Merge sorted halves

def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:          # <= makes it STABLE
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result
\`\`\`

\`\`\`text
  Visual trace: [38, 27, 43, 3, 9, 82, 10]

                  [38, 27, 43, 3, 9, 82, 10]
                 /                           \\
          [38, 27, 43, 3]            [9, 82, 10]
           /          \\               /        \\
      [38, 27]    [43, 3]        [9, 82]    [10]
       /    \\      /    \\         /    \\       |
     [38]  [27] [43]   [3]     [9]   [82]   [10]
       \\    /      \\    /         \\    /       |
      [27, 38]    [3, 43]        [9, 82]    [10]
           \\          /               \\        /
       [3, 27, 38, 43]           [9, 10, 82]
                 \\                     /
           [3, 9, 10, 27, 38, 43, 82]
\`\`\`

### Recurrence Relation & Master Theorem

\`\`\`text
  ┌───────────────────────────────────────────────────────┐
  │  Recurrence: T(n) = 2T(n/2) + Θ(n)                  │
  │                                                       │
  │  • 2T(n/2) → sort two halves                         │
  │  • Θ(n)    → merge step (linear scan)                │
  │                                                       │
  │  Using Master Theorem:                                │
  │  a = 2, b = 2, f(n) = n                             │
  │  log_b(a) = log₂(2) = 1                             │
  │  f(n) = Θ(n^1) = Θ(n^(log_b(a)))                    │
  │  → Case 2: T(n) = Θ(n log n)                        │
  │                                                       │
  │  This recurrence appears EVERYWHERE:                  │
  │  merge sort, binary divide problems, tree algorithms  │
  │  Master this, and half of algorithm questions         │
  │  become predictable.                                  │
  └───────────────────────────────────────────────────────┘

  Stable: YES
  Space: O(n) — needs extra arrays for merging
  Time: O(n log n) in ALL cases (best, average, worst)
\`\`\`

---

## 8. Quick Sort — O(n log n) average ⭐

**Also divide and conquer.** Choose pivot, partition array, recursively sort both sides.

\`\`\`python path=null start=null
def quick_sort(arr):
    if len(arr) <= 1:
        return arr

    pivot = arr[len(arr) // 2]                     # Pick middle as pivot
    left = [x for x in arr if x < pivot]           # Elements < pivot
    middle = [x for x in arr if x == pivot]         # Elements = pivot
    right = [x for x in arr if x > pivot]          # Elements > pivot

    return quick_sort(left) + middle + quick_sort(right)
\`\`\`

\`\`\`text
  Trace: [10, 80, 30, 90, 40, 50, 70]

  Pivot = 90 (middle element)
  Left:  [10, 80, 30, 40, 50, 70]
  Equal: [90]
  Right: []

  Recurse on left → eventually sorted!

  ┌──────────────────────────────────────────────────────┐
  │  Average case: O(n log n) — most of the time        │
  │  Worst case:   O(n²) — pathological!                │
  │                                                      │
  │  Worst case happens when:                            │
  │  • Array is already sorted AND                       │
  │  • You always pick extreme element as pivot          │
  │  (first or last element = bad pivot strategy)        │
  │                                                      │
  │  That's why PIVOT STRATEGY matters:                  │
  │  • Pick middle element                               │
  │  • Pick random element                               │
  │  • Median-of-three (first, middle, last)            │
  │                                                      │
  │  Stable: NO                                          │
  │  Space: O(log n) — recursion stack                   │
  │                                                      │
  │  KEY REALITY:                                        │
  │  Quick sort is usually FASTEST in practice           │
  │  (good cache behaviour, low constant factors)        │
  └──────────────────────────────────────────────────────┘
\`\`\`

---

## 9. Heap Sort — O(n log n)

Uses **max-heap** structure: parent ≥ children.

\`\`\`python path=null start=null
def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)

    # Build max heap: O(n)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    # Extract elements one by one: O(n log n)
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]    # Move max to end
        heapify(arr, i, 0)                  # Heapify reduced heap

    return arr
\`\`\`

\`\`\`text
  ┌──────────────────────────────────────────────────────┐
  │  Time: O(n log n) — GUARANTEED (no worst case trap)  │
  │  Space: O(1) — in-place!                             │
  │  Stable: NO                                          │
  │                                                      │
  │  Strength: No pathological worst case like quick     │
  │  sort. Very reliable. O(1) space unlike merge sort.  │
  │                                                      │
  │  Weakness: Poor cache performance (jumps around      │
  │  array), larger constant factors than quick sort.    │
  └──────────────────────────────────────────────────────┘
\`\`\`

---

## 10. Sorting Comparison — The Master Table

| Algorithm | Best | Average | Worst | Stable? | Space | Comparisons |
|:----------|:-----|:--------|:------|:--------|:------|:------------|
| **Bubble** | O(n) | O(n²) | O(n²) | ✅ | O(1) | n(n−1)/2 |
| **Selection** | O(n²) | O(n²) | O(n²) | ❌ | O(1) | n(n−1)/2 always |
| **Insertion** | **O(n)** | O(n²) | O(n²) | ✅ | O(1) | Best for small/sorted |
| **Shell** | O(n log n) | O(n^1.5) | O(n²) | ❌ | O(1) | Depends on gaps |
| **Merge** | O(n log n) | O(n log n) | O(n log n) | ✅ | **O(n)** | Always consistent |
| **Quick** | O(n log n) | O(n log n) | **O(n²)** | ❌ | O(log n) | Fastest in practice |
| **Heap** | O(n log n) | O(n log n) | O(n log n) | ❌ | **O(1)** | Guaranteed, no worst trap |

### Stable vs Unstable

\`\`\`text
  STABLE: Equal elements keep their original relative order.

  Example: Sort by grade
  Input:  [(Alice, B), (Bob, A), (Carol, B), (Dave, A)]

  Stable sort by grade:
  [(Bob, A), (Dave, A), (Alice, B), (Carol, B)]
   ↑ Bob before Dave ✓   ↑ Alice before Carol ✓ (original order preserved)

  Unstable sort might give:
  [(Dave, A), (Bob, A), (Carol, B), (Alice, B)]
   ↑ original order NOT preserved

  ┌────────────────────────────────────────┐
  │  Stable:   Insertion, Merge, Bubble    │
  │  Unstable: Quick, Heap, Selection      │
  └────────────────────────────────────────┘

  In databases, stability matters for multi-key sorting.
\`\`\`

---

## 11. Comparison-Based Lower Bound

\`\`\`text
  ┌──────────────────────────────────────────────────────┐
  │  THEOREM: No comparison-based sort can beat          │
  │           Ω(n log n) in the worst case.              │
  │                                                      │
  │  This is a PROVEN LOWER BOUND.                       │
  │  Bubble, selection, insertion → O(n²) ≥ Ω(n log n)  │
  │  Merge, quick, heap → O(n log n) = optimal!         │
  │                                                      │
  │  Proof idea: Decision tree has n! leaves             │
  │  Height ≥ log₂(n!) ≈ n log n                        │
  └──────────────────────────────────────────────────────┘

  Non-comparison sorts CAN beat this:
  • Counting Sort  → O(n + k)
  • Radix Sort     → O(d × (n + k))
  • Bucket Sort    → O(n) average

  But they only work for RESTRICTED data types
  (integers in small range, fixed-length strings, etc.)

  There's always a tradeoff.
\`\`\`

---

## 12. Practical System Reality

\`\`\`text
  Real-world sorting is HYBRID:

  Python:  Timsort (Merge Sort + Insertion Sort)
  Java:    Dual-pivot Quick Sort (switches to Insertion for n < 47)
  C++:     Introsort (Quick Sort + Heap Sort + Insertion Sort)

  Why hybrid?
  • Insertion Sort is fastest for tiny arrays (low overhead)
  • Quick Sort is fastest for medium-large arrays (cache-friendly)
  • Merge/Heap Sort provides worst-case guarantees

  Big-O is the map.
  Hardware behaviour (cache, branch prediction) is the terrain.
\`\`\`

---

## Key Takeaways

| Need | Use |
|:-----|:----|
| Search unsorted data | Linear Search O(n) |
| Search sorted data | **Binary Search O(log n)** |
| Sort small/nearly-sorted array | **Insertion Sort** |
| Guaranteed O(n log n) + stable | **Merge Sort** |
| Fastest in practice | **Quick Sort** (avg O(n log n)) |
| O(n log n) + O(1) space | **Heap Sort** |

---

## TL;DR - Quick Recall

**One-liner for each concept:**

| Concept | Key Takeaway |
|:--------|:-------------|
| **Binary Search** | Requires sorted array. Halves search space. O(log n). |
| **Bubble Sort** | Adjacent swaps, largest bubbles up. n(n−1)/2 comparisons. O(n²). Stable. |
| **Selection Sort** | Find min, swap to front. ALWAYS same comparisons regardless of input. O(n²). |
| **Insertion Sort** | Build sorted left portion. O(n) best case! Best for small/nearly-sorted. Stable. |
| **Shell Sort** | Insertion sort with shrinking gaps. O(n^1.5). Not stable. |
| **Merge Sort** | Divide & conquer. T(n)=2T(n/2)+n → O(n log n) always. Stable. O(n) space. |
| **Quick Sort** | Pivot & partition. O(n log n) avg, O(n²) worst (bad pivot). Fastest in practice. |
| **Heap Sort** | Max-heap extraction. O(n log n) guaranteed. O(1) space. No worst-case trap. |
| **Lower Bound** | No comparison sort beats Ω(n log n). Non-comparison sorts (counting, radix) can be O(n). |

**Formula Sheet:**

\`\`\`text
  Bubble Sort comparisons:  n(n − 1) / 2
  Merge Sort recurrence:    T(n) = 2T(n/2) + Θ(n) → Θ(n log n)
  Quick Sort worst case:    Already sorted + extreme pivot → O(n²)
  Insertion Sort best case: Already sorted → O(n)
  Lower bound:              Ω(n log n) for comparison-based sorts
\`\`\`

**The Golden Rules:**
1. If the array is **sorted** and you're searching → **Binary Search**.
2. If you need **stable** O(n log n) → **Merge Sort**.
3. If you need O(n log n) with **O(1) space** → **Heap Sort**.
4. If you want **fastest in practice** → **Quick Sort** (with good pivot strategy).
5. Selection Sort always does same comparisons — **input doesn't matter**.

---

## Additional Resources

**Video Courses:**
- [Abdul Bari - Sorting Algorithms](https://youtu.be/pkkFqlG0Hds) - Deep dive into all sorting methods
- [NeetCode - Binary Search](https://youtu.be/s4DPM8ct1pI) - Essential algorithm walkthrough

**Articles & Visualizations:**
- [VisuAlgo - Sorting](https://visualgo.net/en/sorting) - Watch the algorithms race!

**Practice Problems:**
- LeetCode 704: Binary Search
- LeetCode 33: Search in Rotated Sorted Array
- LeetCode 75: Sort Colors (Dutch National Flag problem)
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "ss-q1",
      question:
        "How many comparisons does Bubble Sort make on an array of 10 elements (worst case)?",
      options: ["10", "20", "45", "100"],
      correctAnswer: 2,
      explanation:
        "Bubble Sort comparisons = n(n−1)/2 = 10(9)/2 = 45. This formula counts all adjacent pair comparisons across all passes.",
      difficulty: "easy" as const,
    },
    {
      id: "ss-q2",
      question:
        "Which sorting algorithm performs the SAME number of comparisons regardless of input order?",
      options: [
        "Bubble Sort",
        "Insertion Sort",
        "Selection Sort",
        "Merge Sort",
      ],
      correctAnswer: 2,
      explanation:
        "Selection Sort always makes n(n−1)/2 comparisons to find the minimum in each pass, whether the array is sorted, reversed, or random. Input doesn't change its comparison count.",
      difficulty: "medium" as const,
    },
    {
      id: "ss-q3",
      question:
        "The recurrence T(n) = 2T(n/2) + Θ(n) represents which sorting algorithm?",
      options: ["Quick Sort", "Merge Sort", "Heap Sort", "Insertion Sort"],
      correctAnswer: 1,
      explanation:
        "Merge Sort: 2T(n/2) for sorting two halves + Θ(n) for merging. By Master Theorem (Case 2): T(n) = Θ(n log n).",
      difficulty: "medium" as const,
    },
    {
      id: "ss-q4",
      question: "What is the best-case time complexity of Insertion Sort?",
      options: ["O(n²)", "O(n log n)", "O(n)", "O(1)"],
      correctAnswer: 2,
      explanation:
        "When the array is already sorted, Insertion Sort only compares each element with its predecessor once (no shifts needed). Total: n−1 comparisons = O(n).",
      difficulty: "easy" as const,
    },
    {
      id: "ss-q5",
      question: "Quick Sort's worst case O(n²) occurs when:",
      options: [
        "Array has duplicates",
        "Array is already sorted and pivot is always the extreme element",
        "Array has negative numbers",
        "Array size is prime",
      ],
      correctAnswer: 1,
      explanation:
        "If the pivot is always the smallest or largest element (e.g., first element of a sorted array), one partition has n−1 elements and the other has 0. This gives T(n) = T(n−1) + n → O(n²).",
      difficulty: "medium" as const,
    },
    {
      id: "ss-q6",
      question:
        "Which sorting algorithm is both O(n log n) worst-case AND O(1) extra space?",
      options: ["Merge Sort", "Quick Sort", "Heap Sort", "Insertion Sort"],
      correctAnswer: 2,
      explanation:
        "Heap Sort: O(n log n) guaranteed (no worst-case trap), O(1) space (in-place). Merge Sort needs O(n) space. Quick Sort has O(n²) worst case.",
      difficulty: "medium" as const,
    },
    {
      id: "ss-q7",
      question: "Which of these sorting algorithms is STABLE?",
      options: ["Heap Sort", "Quick Sort", "Merge Sort", "Selection Sort"],
      correctAnswer: 2,
      explanation:
        "Merge Sort is stable — equal elements maintain their original relative order because the merge step uses ≤ (not <). Stable sorts: Insertion, Merge, Bubble. Unstable: Quick, Heap, Selection.",
      difficulty: "easy" as const,
    },
    {
      id: "ss-q8",
      question: "The lower bound for comparison-based sorting is:",
      options: ["O(n)", "O(n log n)", "Ω(n log n)", "Ω(n²)"],
      correctAnswer: 2,
      explanation:
        "No comparison-based sort can do better than Ω(n log n) in the worst case. Proved via decision tree argument: n! possible orderings → tree height ≥ log₂(n!) ≈ n log n.",
      difficulty: "hard" as const,
    },
    {
      id: "ss-q9",
      question: "Python's built-in sort (Timsort) is a hybrid of:",
      options: [
        "Quick Sort + Heap Sort",
        "Merge Sort + Insertion Sort",
        "Bubble Sort + Selection Sort",
        "Radix Sort + Counting Sort",
      ],
      correctAnswer: 1,
      explanation:
        "Timsort combines Merge Sort (for large arrays) with Insertion Sort (for small runs). It exploits naturally occurring sorted subsequences in real-world data.",
      difficulty: "medium" as const,
    },
    {
      id: "ss-q10",
      question: "Shell Sort is a generalization of which sorting algorithm?",
      options: [
        "Bubble Sort",
        "Selection Sort",
        "Insertion Sort",
        "Merge Sort",
      ],
      correctAnswer: 2,
      explanation:
        "Shell Sort generalizes Insertion Sort by comparing elements at a gap distance instead of adjacent elements. As the gap decreases to 1, it becomes regular Insertion Sort on a nearly-sorted array.",
      difficulty: "easy" as const,
    },
  ],
};
