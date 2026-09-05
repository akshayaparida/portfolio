import { LearningModule } from "@/types/learning";

export const divideAndConquerModule: LearningModule = {
  id: "04-divide-and-conquer",
  title: "4. Divide and Conquer Paradigm",
  description:
    "Divide and Conquer recurrence relations, Inversion Count problem, Maximum Subarray Sum, Karatsuba Multiplication, and Strassen's Matrix Multiplication across C, C++, and Python",
  status: "completed",
  tags: ["Algorithm", "GATE CS", "UGC NET", "NPTEL"],
  detailedContent: `# Divide and Conquer Algorithmic Paradigm

> **NPTEL / GATE CS / UGC NET Core Subject**
> Key Exam Questions: Counting Inversions in an array via modified Merge Sort, Maximum Subarray Sum recurrence, Karatsuba integer multiplication ($O(n^{1.585})$), and Strassen's Matrix Multiplication equations ($T(n) = 7T(n/2) + O(n^2) \\implies O(n^{2.81})$).

---

## 1. Prerequisites & What You Should Know

Before mastering Divide and Conquer, ensure familiarity with:
- **Recursive function traces**: Unwinding the recursion stack and evaluating base cases.
- **Master Theorem**: Solving recurrences of the form $T(n) = aT(n/b) + f(n)$.
- **Subproblem independence**: Divide and conquer relies on subproblems being completely disjoint, with no shared memory or overlapping computations.
- **Merge step mechanics**: Merging two sorted lists in linear $O(n)$ time.

---

## 2. Conceptual Intuition: The 3 Canonical Phases

\`\`\`
                          [ Original Problem: Size N ]
                                       |
                     +-----------------+-----------------+
                     |                                   |
                  DIVIDE                              DIVIDE
                     v                                   v
             [ Subproblem N/2 ]                  [ Subproblem N/2 ]
                     |                                   |
                 CONQUER                             CONQUER
               (Recursion)                         (Recursion)
                     v                                   v
             [ Solution N/2 ]                    [ Solution N/2 ]
                     |                                   |
                     +-----------------+-----------------+
                                       |
                                    COMBINE
                                       v
                        [ Final Solution for Size N ]
\`\`\`

1. **Divide**: Partition the problem instance into two or more smaller subproblems of the exact same type.
2. **Conquer**: Solve the subproblems recursively. When the subproblem size is sufficiently small ($N \\le 1$ or base case), solve it directly without recursion.
3. **Combine**: Merge and synthesize the subproblem solutions into the global solution for the original input.

---

## 3. Divide & Conquer vs Dynamic Programming

| Characteristic | Divide and Conquer | Dynamic Programming |
|:---|:---|:---|
| **Subproblem Relationship** | **Disjoint & Independent** | **Overlapping & Shared** |
| **Repeated Work** | Subproblems do not repeat; each is unique | Without caching, subproblems are recomputed exponentially |
| **Memory Strategy** | Recursion call stack $O(\\log n)$ | Memoization table / Tabulation grid $O(n)$ to $O(n^2)$ |
| **Classic Examples** | MergeSort, QuickSort, Strassen's, Inversion Count | 0/1 Knapsack, LCS, Matrix Chain Multiplication |

---

## 4. Benchmark Recurrences in Divide and Conquer

| Algorithm | Recurrence $T(n)$ | Master Case | Time Complexity | Naive Comparison |
|:---|:---|:---|:---|:---|
| **Binary Search** | $T(n) = T(n/2) + O(1)$ | Case 2 ($a=1, b=2, k=0$) | $O(\\log n)$ | $O(n)$ linear |
| **Merge Sort** | $T(n) = 2T(n/2) + O(n)$ | Case 2 ($a=2, b=2, k=1$) | $O(n \\log n)$ | $O(n^2)$ bubble/selection |
| **Karatsuba Multiplication**| $T(n) = 3T(n/2) + O(n)$ | Case 1 ($a=3, b=2, k=1$) | $O(n^{\\log_2 3}) \\approx O(n^{1.585})$ | $O(n^2)$ grade-school |
| **Strassen's Matrix**| $T(n) = 7T(n/2) + O(n^2)$ | Case 1 ($a=7, b=2, k=2$) | $O(n^{\\log_2 7}) \\approx O(n^{2.807})$ | $O(n^3)$ standard dot-product |
| **Closest Pair of Points** | $T(n) = 2T(n/2) + O(n)$ | Case 2 ($a=2, b=2, k=1$) | $O(n \\log n)$ | $O(n^2)$ all-pairs distance |

---

## 5. Inversion Count: Measuring Disarray

An **Inversion** occurs when two indices $i < j$ have $A[i] > A[j]$.
- Completely sorted array ($[1, 2, 3, 4]$): $0$ inversions.
- Completely reversed array ($[4, 3, 2, 1]$): $\\frac{n(n-1)}{2}$ inversions.
- **The Core D&C Insight**:
  During the merge step of Merge Sort, if an element $R[j]$ from the right subarray is smaller than $L[i]$ from the left subarray, then because $L$ is already sorted:
  $$\\text{Every remaining element from } L[i] \\text{ to } L[mid] \\text{ is ALSO strictly greater than } R[j]!$$
  Therefore, we instantly count:
  $$\\Delta_{\\text{inversions}} = (mid - i + 1)$$
  without checking them individually! This reduces total runtime from $O(n^2)$ to $O(n \\log n)$.

---

## 6. Real-World Applications

1. **Fast Fourier Transform (FFT - Cooley-Tukey Algorithm)**: Decomposes a signal of size $N$ into two signals of size $N/2$ (even and odd indices), reducing polynomial multiplication and audio frequency processing from $O(N^2)$ to $O(N \\log N)$. Used in MP3 compression, 5G wireless decoding, and MRI imaging.
2. **Computational Geometry (Collision Detection)**: Fast closest-pair algorithms use divide-and-conquer to prune distant bounding boxes in 3D physics engines and robotics motion planning.
3. **Distributed Big Data (MapReduce / Apache Spark)**: The "Map" phase divides terabytes of input chunks across worker nodes; the "Reduce" phase combines partial results.
4. **RSA Cryptography**: Fast multiplication of 4096-bit prime integers uses Karatsuba and Toom-Cook divide-and-conquer multiplication.

---

## 7. Implementation in C, C++, and Python with Syntax Logic

### C Implementation (Inversion Count via Modified Merge Sort in O(n log n))

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

/**
 * C Syntax Logic Note:
 * 1. Long long int: Inversion count can reach n(n-1)/2 = ~5 * 10^9 for n=100,000,
 *    which overflows standard 32-bit signed int (max 2.14 * 10^9).
 * 2. Crucial Inversion Formula: If L[i] > R[j], then because the left subarray is
 *    sorted, all remaining elements from i to mid ALSO form inversions with R[j]!
 *    Inversion count addition: inv_count += (mid - i + 1).
 * 3. temp buffer: Passed to avoid re-allocating memory in each recursive frame.
 */

long long mergeAndCount(int arr[], int temp[], int left, int mid, int right) {
    int i = left;    // Index for left subarray
    int j = mid + 1; // Index for right subarray
    int k = left;    // Index for merged output buffer
    long long inv_count = 0;

    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            // Found inversions!
            temp[k++] = arr[j++];
            inv_count += (mid - i + 1); // Key mathematical deduction!
        }
    }

    // Copy remaining elements
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];

    // Copy back to original array
    for (i = left; i <= right; i++) {
        arr[i] = temp[i];
    }
    return inv_count;
}

long long mergeSortAndCount(int arr[], int temp[], int left, int right) {
    long long inv_count = 0;
    if (left < right) {
        int mid = left + (right - left) / 2;

        inv_count += mergeSortAndCount(arr, temp, left, mid);
        inv_count += mergeSortAndCount(arr, temp, mid + 1, right);
        inv_count += mergeAndCount(arr, temp, left, mid, right);
    }
    return inv_count;
}
\`\`\`

---

### C++ Implementation (Maximum Subarray Sum: Divide & Conquer vs Kadane)

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>

/**
 * C++ Syntax Logic Note:
 * 1. Crossing Subarray: In D&C maximum subarray, the maximum sum either lies
 *    entirely in left half, entirely in right half, or CROSSES the midpoint.
 * 2. Crossing calculation is O(n), giving recurrence T(n) = 2T(n/2) + O(n) => O(n log n).
 * 3. Kadane's Algorithm: Dynamic programming alternative that solves it in O(n) linear time.
 */

// Crossing sum helper for Divide & Conquer: O(n)
int maxCrossingSum(const std::vector<int>& arr, int l, int m, int h) {
    int sum = 0;
    int left_sum = INT_MIN;
    for (int i = m; i >= l; i--) {
        sum += arr[i];
        if (sum > left_sum) left_sum = sum;
    }

    sum = 0;
    int right_sum = INT_MIN;
    for (int i = m + 1; i <= h; i++) {
        sum += arr[i];
        if (sum > right_sum) right_sum = sum;
    }

    return left_sum + right_sum;
}

// Divide and Conquer Max Subarray: T(n) = 2T(n/2) + O(n) => O(n log n)
int maxSubArraySumDC(const std::vector<int>& arr, int l, int h) {
    if (l == h) return arr[l];

    int m = l + (h - l) / 2;
    return std::max({
        maxSubArraySumDC(arr, l, m),
        maxSubArraySumDC(arr, m + 1, h),
        maxCrossingSum(arr, l, m, h)
    });
}
\`\`\`

---

### Python Implementation (Inversion Count & Kadane's Linear Algorithm)

\`\`\`python
"""
Python Syntax Logic Note:
1. Kadane's Algorithm: Computes max subarray sum in O(n) time and O(1) space
   by maintaining running max ending at current index.
2. Dynamic Programming transition:
   current_max = max(x, current_max + x)
   Decides whether to append x to existing running subarray or start fresh from x.
"""

from typing import List

def kadane_max_subarray(nums: List[int]) -> int:
    """
    O(n) Kadane's Algorithm:
    At each element, choose whether to extend existing subarray or start fresh.
    """
    if not nums:
        return 0

    max_so_far = nums[0]
    current_max = nums[0]

    for x in nums[1:]:
        current_max = max(x, current_max + x)
        max_so_far = max(max_so_far, current_max)

    return max_so_far
\`\`\`
`,
};
