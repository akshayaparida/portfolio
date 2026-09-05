import { LearningModule } from "@/types/learning";

export const sortingAlgorithmsModule: LearningModule = {
  id: "03-sorting",
  title: "3. Sorting Algorithms & Lower Bounds",
  description:
    "Comparison sorts (Bubble, Selection, Insertion, Merge, Quick, Heap) vs Non-comparison sorts (Counting, Radix, Bucket), Stability, In-place properties, Lomuto vs Hoare partitions, and Ω(n log n) lower bound across C, C++, and Python",
  status: "completed",
  tags: ["Algorithm", "GATE CS", "UGC NET", "NPTEL"],
  detailedContent: `# Sorting Algorithms, Lower Bounds & Stability

> **NPTEL / GATE CS / UGC NET Core Subject**
> Key Exam Questions: Comparison sort lower bound $\\lceil \\log_2(n!) \\rceil \\approx n \\log_2 n$, Quick Sort partition schemes (Lomuto vs Hoare), Stability preservation, and best/worst case inputs.

---

## 1. Prerequisites & What You Should Know

Before analyzing sorting algorithms, ensure you understand:
- **Array swaps & in-place mutation**: Swapping $A[i]$ and $A[j]$ via temporary storage or pointers.
- **Loop invariants**: In Insertion Sort, the sub-array $A[0 \\dots i-1]$ is always sorted at the start of iteration $i$.
- **Recursion & Call Stacks**: How recursive calls (Merge Sort, Quick Sort) allocate stack frames of depth $O(\\log n)$ to $O(n)$.
- **Logarithms & Factorials**: Stirling's approximation $\\ln(n!) \\approx n \\ln n - n$.

---

## 2. Real-World Analogies & Mental Models

\`\`\`
1. Insertion Sort: Playing Cards in Hand
   - You hold sorted cards in your left hand.
   - You pick a new card with your right hand and slide it backward
     until you find its correct sorted slot.

2. Selection Sort: Picking the Smallest Apple
   - Scan an entire basket of apples to find the single smallest one.
   - Place it into box #1.
   - Scan remaining apples for the next smallest. Place into box #2.
   - Always makes exactly n(n-1)/2 comparisons, even if already sorted!

3. Bubble Sort: Carbonation in Soda
   - Heavy elements sink to the bottom.
   - Light elements bubble up to the top by adjacent pairwise swaps.

4. Merge Sort: Dividing Exam Grading
   - Split 1000 exam papers into two stacks of 500.
   - Give 500 to Assistant A, 500 to Assistant B.
   - Once both return sorted stacks, merge them into 1 stack by comparing top cards.

5. Quick Sort: Benchmarking against an Average
   - Pick a "pivot" student score (e.g., 65).
   - Divide everyone: students with score < 65 move to the left room;
     students with score >= 65 move to the right room.
   - Recursively repeat in each room!
\`\`\`

---

## 3. Key Properties: Stability, In-Place, and Adaptiveness

### 3.1 What is Stability and Why Does it Matter?
A sorting algorithm is **STABLE** if two records with equal keys appear in the output array in the **same relative order** as they appeared in the input array.

\`\`\`
Input List of Students (sorted by Name):
  [("Alice", Class 2), ("Bob", Class 1), ("Charlie", Class 2), ("David", Class 1)]

Now sort by Class:
  STABLE Result:
    [("Bob", Class 1), ("David", Class 1), ("Alice", Class 2), ("Charlie", Class 2)]
    Notice: Alice still comes before Charlie, and Bob before David!

  UNSTABLE Result:
    [("David", Class 1), ("Bob", Class 1), ("Charlie", Class 2), ("Alice", Class 2)]
    The alphabetical order within Class 1 and Class 2 was DESTROYED!
\`\`\`

- **Stable Sorts**: Insertion Sort, Bubble Sort, Merge Sort, Counting Sort, Radix Sort, TimSort.
- **Unstable Sorts**: Selection Sort (due to long-distance swaps), Quick Sort, Heap Sort.

### 3.2 In-Place vs Out-of-Place
- **In-Place**: Uses $O(1)$ auxiliary space beyond input (or $O(\\log n)$ stack space for recursion). Examples: QuickSort, HeapSort, InsertionSort.
- **Out-of-Place**: Requires $O(n)$ additional memory buffer. Example: MergeSort requires temporary arrays to merge.

---

## 4. Master Classification & Complexity Table

| Algorithm | Best Time | Average Time | Worst Time | Auxiliary Space | Stable? | In-Place? | Adaptive? |
|:---|:---|:---|:---|:---|:---|:---|:---|
| **Bubble Sort** | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | **Yes** | Yes | Yes (with flag) |
| **Selection Sort** | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | **No** | Yes | No |
| **Insertion Sort** | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | **Yes** | Yes | **Yes** |
| **Merge Sort** | $O(n \\log n)$ | $O(n \\log n)$ | $O(n \\log n)$ | $O(n)$ | **Yes** | No | No |
| **Quick Sort** | $O(n \\log n)$ | $O(n \\log n)$ | $O(n^2)$ | $O(\\log n)$ stack | **No** | Yes | No |
| **Heap Sort** | $O(n \\log n)$ | $O(n \\log n)$ | $O(n \\log n)$ | $O(1)$ | **No** | Yes | No |
| **Counting Sort** | $O(n + k)$ | $O(n + k)$ | $O(n + k)$ | $O(k)$ | **Yes** | No | No |
| **Radix Sort** | $O(d(n + k))$| $O(d(n + k))$| $O(d(n + k))$| $O(n + k)$ | **Yes** | No | No |

---

## 5. Theoretical Lower Bound of Comparison Sorting

> [!IMPORTANT]
> **GATE Proof: Why can no comparison-based sort beat $\\Omega(n \\log n)$?**
> - For $n$ distinct elements, there are $n!$ possible permutations.
> - Any comparison-based sorting algorithm can be modeled as a **Decision Tree** where each internal node represents a comparison ($A[i] \\le A[j]$) with at most 2 outcomes (Binary Decision Tree).
> - A binary tree of height $h$ has at most $2^h$ leaves.
> - To distinguish every possible permutation, the tree must have at least $n!$ leaves:
>   $$2^h \\ge n! \\implies h \\ge \\log_2(n!)$$
> - By Stirling's Approximation ($\ln n! \\approx n \\ln n - n$):
>   $$h \\ge \\sum_{i=1}^{n} \\log_2 i \\ge \\frac{n}{2} \\log_2\\left(\\frac{n}{2}\\right) = \\Omega(n \\log n)$$
> Hence, **every comparison sort requires at least $\\Omega(n \\log n)$ comparisons in the worst case**.
> 
> *Non-comparison sorts (Counting Sort, Radix Sort) break this bound because they DO NOT compare elements; they use direct indexing!*

---

## 6. QuickSort Partition Schemes: Lomuto vs Hoare

\`\`\`
Lomuto Partition Scheme:
- Pivot: arr[high] (rightmost)
- Pointer i tracks the boundary of elements <= pivot
- Pointer j scans from low to high - 1
- Number of Swaps: Higher (~n swaps)
- Simpler to implement and reason about

Hoare Partition Scheme:
- Pivot: arr[low] or arr[mid]
- Two pointers: i from left moving right, j from right moving left
- Pointers advance until arr[i] >= pivot and arr[j] <= pivot, then swap
- Number of Swaps: ~3x fewer swaps than Lomuto on average!
\`\`\`

### Worst Case Avoidance in QuickSort
- **Worst Case**: Occurs when partition is completely unbalanced ($0$ and $n-1$ elements).
  - For standard rightmost pivot: Already sorted or reverse-sorted input triggers $O(n^2)$ time!
  - **Remedies**:
    1. **Randomized QuickSort**: Select pivot uniformly at random ($O(n \\log n)$ expected).
    2. **Median-of-Three**: Choose pivot as median of $arr[low]$, $arr[mid]$, and $arr[high]$.

---

## 7. Real-World Engineering Decisions: What Do Production Systems Use?

1. **C++ STL (\`std::sort\`)**: Uses **Introsort** (Hybrid of QuickSort, switching to HeapSort if recursion depth exceeds $2\\log_2 n$ to guarantee $O(n \\log n)$ worst case, switching to InsertionSort for partitions $< 16$).
2. **Python (\`list.sort()\`) & Java (\`Arrays.sort(Object[])\`)**: Uses **TimSort** (Hybrid of Merge Sort and Insertion Sort that identifies natural pre-existing runs; stable and runs in $O(n)$ on sorted data).
3. **Linux Kernel (\`sort()\`)**: Uses non-recursive in-place HeapSort/QuickSort with custom comparison function pointers to prevent kernel stack overflow.
4. **External Sorting**: When sorting 10 TB of database logs on a machine with 16 GB RAM, **Multi-way External Merge Sort** is used with disk streaming.

---

## 8. Implementation in C, C++, and Python with Syntax Logic

### C Implementation (Quick Sort with Lomuto Partition Scheme)

\`\`\`c
#include <stdio.h>

/**
 * C Syntax Logic Note:
 * 1. Lomuto Partition Scheme: Chooses last element arr[high] as pivot.
 * 2. Swapping: Pointers used to modify array elements directly in place.
 * 3. QuickSort Recursion: Divides array into [low .. p-1] and [p+1 .. high].
 */

void swap(int* a, int* b) {
    int t = *a;
    *a = *b;
    *b = t;
}

int lomutoPartition(int arr[], int low, int high) {
    int pivot = arr[high]; // Select pivot as rightmost element
    int i = low - 1;       // Index of boundary of smaller elements

    for (int j = low; j < high; j++) {
        // If current element is smaller than or equal to pivot
        if (arr[j] <= pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    // Place pivot in correct sorted position between partitions
    swap(&arr[i + 1], &arr[high]);
    return i + 1; // Return finalized pivot index
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = lomutoPartition(arr, low, high);
        quickSort(arr, low, pi - 1);  // Recursively sort left partition
        quickSort(arr, pi + 1, high); // Recursively sort right partition
    }
}
\`\`\`

---

### C++ Implementation (Merge Sort with Buffer Allocation)

\`\`\`cpp
#include <iostream>
#include <vector>

/**
 * C++ Syntax Logic Note:
 * 1. std::vector: Temporary buffer allocates O(n) space during merge phase.
 * 2. Stable: Elements with equal values retain relative order because we use "<="
 *    in left[i] <= right[j].
 * 3. Mid calculation: left + (right - left) / 2 prevents overflow.
 */

void merge(std::vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    // Allocate temporary left and right buffers
    std::vector<int> L(arr.begin() + left, arr.begin() + mid + 1);
    std::vector<int> R(arr.begin() + mid + 1, arr.begin() + right + 1);

    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) { // "<=" ensures STABILITY!
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }

    // Drain remaining elements
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(std::vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}
\`\`\`

---

### Python Implementation (Counting Sort: Breaking the Comparison Barrier in O(n + k))

\`\`\`python
"""
Python Syntax Logic Note:
1. Non-Comparison Sort: Counts frequency of each integer key directly.
2. Stability Preservation: Traverses input backwards (from n-1 down to 0)
   when placing items into the output array using prefix sums!
3. Space complexity: O(n + k) where k is max(arr) - min(arr) + 1.
"""

from typing import List

def counting_sort(arr: List[int]) -> List[int]:
    """
    Stable Counting Sort for non-negative integers.
    Time Complexity: O(n + k), Space Complexity: O(n + k) where k = max(arr).
    """
    if not arr:
        return []

    max_val = max(arr)
    count = [0] * (max_val + 1)
    output = [0] * len(arr)

    # 1. Store frequencies
    for num in arr:
        count[num] += 1

    # 2. Compute cumulative frequencies (prefix sums)
    for i in range(1, len(count)):
        count[i] += count[i - 1]

    # 3. Build output array in reverse to ensure STABILITY
    for num in reversed(arr):
        output[count[num] - 1] = num
        count[num] -= 1

    return output
\`\`\`
`,
};
