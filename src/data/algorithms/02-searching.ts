import { LearningModule } from "@/types/learning";

export const searchingAlgorithmsModule: LearningModule = {
  id: "02-searching",
  title: "2. Searching & Binary Search Variations",
  description:
    "Linear Search, Binary Search, First/Last Occurrence, Search in Rotated Sorted Arrays, Peak Element finding, and Binary Search on Answer across C, C++, and Python",
  status: "completed",
  tags: ["Algorithm", "GATE CS", "UGC NET", "NPTEL"],
  detailedContent: `# Searching Algorithms & Binary Search Variations

> **NPTEL / GATE CS / UGC NET Core Subject**
> Key Exam Questions: Overflow-safe midpoint calculation, lower/upper bounds, searching in rotated sorted arrays in $O(\\log n)$ time, and binary search on monotonic answer spaces.

---

## 1. Prerequisites & What You Should Know

Before diving into searching algorithms, you should understand:
- **Array indexing & random access**: $O(1)$ constant-time lookup by index ($A[i]$).
- **Monotonicity**: A sequence is monotonically increasing if $A[i] \\le A[i+1]$ for all $i$.
- **Logarithms**: $\\log_2(n)$ represents how many times you can halve $n$ until you reach $1$. For $n = 1{,}000{,}000$, $\\log_2(n) \\approx 20$ comparisons.
- **Loop Invariants**: State conditions that hold true before and after each loop iteration (e.g., "if target exists, it is strictly within the subrange $[low, high]$").

---

## 2. Conceptual Intuition: The Phonebook Analogy

### 2.1 Why Linear Search is Like Reading Every Page
Imagine searching for "Newton, Isaac" in an unsorted pile of $1{,}000{,}000$ loose paper resumes:
- You have no choice but to inspect each resume one by one from top to bottom.
- If the resume is at the very bottom (worst case), you check all $1{,}000{,}000$ pages ($O(n)$).
- If it doesn't exist, you still check all $1{,}000{,}000$ pages.

### 2.2 The Binary Search Superpower: Halving the Universe
Now imagine looking for "Newton, Isaac" in a sorted physical dictionary:
1. You open to the middle (letter **M**).
2. "Newton" comes after **M**, so you instantly **rip away and discard the entire first half** (A through M).
3. In one single comparison, $500{,}000$ pages are eliminated!
4. Repeat: $250{,}000 \\to 125{,}000 \\to 62{,}500 \\dots \\to 1$.
5. Within at most $\\lceil \\log_2(1{,}000{,}000) \\rceil = 20$ page checks, you find the exact page or conclude it does not exist.

\`\`\`
Step 0 (Size N):   [----------------------- N -----------------------]
Step 1 (Size N/2): [----------- Discarded -----------][----- N/2 -----]
Step 2 (Size N/4):                                    [ N/4 ][ Discard ]
...
Step k:            [ 1 ] -> Found or Absent!
Total Steps: k = ceil(log2(N)) + 1
\`\`\`

---

## 3. Linear vs Binary Search Mechanics

| Metric | Linear Search | Binary Search |
|:---|:---|:---|
| **Prerequisite** | None (works on unsorted arrays / linked lists) | **Array must be sorted (monotonic)!** |
| **Data Structure** | Array or Singly Linked List | **Array with $O(1)$ random access** (NOT linked list!) |
| **Recurrence** | $T(n) = T(n-1) + O(1)$ | $T(n) = T(n/2) + O(1)$ |
| **Time Complexity** | Best $O(1)$, Worst $O(n)$, Avg $O(n/2)$ | Best $O(1)$, Worst $O(\\log n)$, Avg $O(\\log n)$ |
| **Space Complexity**| $O(1)$ auxiliary space | $O(1)$ iterative, $O(\\log n)$ recursive call stack |
| **Comparisons** | At most $n$ comparisons | At most $\\lfloor \\log_2 n \\rfloor + 1$ comparisons |

### 3.1 The Classic Overflow-Safe Midpoint Formula
> [!WARNING]
> \`mid = (low + high) / 2\` can **OVERFLOW** 32-bit signed integer limits ($2^{31} - 1 = 2{,}147{,}483{,}647$) when $low + high > 2^{31} - 1$, causing \`mid\` to wrap around to a negative number!
> 
> **Overflow-Safe Equation**:
> $$\\text{mid} = low + \\frac{high - low}{2}$$
> Bitwise equivalent: \`mid = low + ((high - low) >> 1)\`

---

## 4. Key Binary Search Variations in GATE / Technical Interviews

\`\`\`
Target = 4 in Array: [1, 2, 4, 4, 4, 7, 9]
                      0  1  2  3  4  5  6

1. Exact Match:          Returns index 2, 3, or 4 (any match)
2. First Occurrence:     Returns index 2 (lower boundary of 4)
3. Last Occurrence:      Returns index 4 (upper boundary of 4)
4. Lower Bound (>= 4):   Returns index 2 (first element >= 4)
5. Upper Bound (> 4):    Returns index 5 (first element > 4, which is 7)
6. Count of Duplicates:  upper_bound - lower_bound = 5 - 2 = 3 occurrences!
\`\`\`

### 4.1 Search in a Rotated Sorted Array
When a sorted array is rotated (e.g., $[4, 5, 6, 7, 0, 1, 2]$):
- **Core Invariant**: If you divide the array at \`mid\`, **at least one half is guaranteed to be strictly sorted**!
- If $A[low] \\le A[mid]$: Left half is normally sorted. Test if target lies in $[A[low], A[mid])$. If so, search left; else search right.
- Otherwise: Right half is normally sorted. Test if target lies in $(A[mid], A[high]]$. If so, search right; else search left.
- Time Complexity: Still $O(\\log n)$!

### 4.2 Finding Peak Element (Binary Search on Slopes)
A peak element satisfies $A[i] > A[i+1]$. Can we find a peak in an **unsorted** array in $O(\\log n)$?
- **Yes!** If $A[mid] < A[mid+1]$, we are on an ascending slope $\\nearrow$. A peak is guaranteed to exist in the right half.
- If $A[mid] > A[mid+1]$, we are on a descending slope $\\searrow$. A peak exists at \`mid\` or in the left half.
- This demonstrates that Binary Search does **not strictly require sorted data**, but rather a **monotonic decision property**!

---

## 5. Real-World Applications

1. **Database B+ Tree Leaf Indexing**: Once the database descends the tree pages to a target leaf block containing 512 keys, it performs in-memory binary search to locate the tuple in $O(\\log 512) = 9$ comparisons.
2. **Git Bisect (\`git bisect\`)**: Automates finding which commit introduced a regression bug out of 10,000 commits using binary search over the commit DAG in ~14 test builds.
3. **IP Routing (Longest Prefix Match)**: Hardware routing tables search sorted CIDR blocks using binary search on prefix lengths.
4. **Binary Search on Answer (Capacity Planning)**: Finding the minimum shipping container capacity to ship packages within $D$ days by binary searching the feasible answer range $[\\max(weights), \\sum weights]$.

---

## 6. Implementation in C, C++, and Python with Syntax Logic

### C Implementation (Binary Search & First/Last Occurrence)

\`\`\`c
#include <stdio.h>

/**
 * C Syntax Logic Note:
 * 1. Low + (High - Low) / 2: Prevents 32-bit signed integer overflow.
 * 2. Iterative over Recursive: Iterative binary search takes O(1) auxiliary space,
 *    avoiding stack frame overhead.
 * 3. const int arr[]: Declares read-only array to prevent unintentional mutation.
 */

// Classic Binary Search: Returns index or -1
int binarySearch(const int arr[], int n, int target) {
    int low = 0, high = n - 1;

    while (low <= high) {
        // Safe midpoint to prevent integer overflow
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            return mid; // Target found
        } else if (arr[mid] < target) {
            low = mid + 1; // Discard left half
        } else {
            high = mid - 1; // Discard right half
        }
    }
    return -1; // Target does not exist in array
}

// Find First Occurrence of Target in sorted array with duplicates: O(log n)
int findFirstOccurrence(const int arr[], int n, int target) {
    int low = 0, high = n - 1;
    int result = -1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            result = mid;       // Candidate found!
            high = mid - 1;     // Keep searching leftward for an earlier occurrence
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return result;
}

// Find Last Occurrence of Target in sorted array: O(log n)
int findLastOccurrence(const int arr[], int n, int target) {
    int low = 0, high = n - 1;
    int result = -1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            result = mid;       // Candidate found!
            low = mid + 1;      // Keep searching rightward for a later occurrence
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return result;
}
\`\`\`

---

### C++ Implementation (Search in Rotated Sorted Array & std::lower_bound)

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>

/**
 * C++ Syntax Logic Note:
 * 1. std::lower_bound(beg, end, val): Returns iterator to first element >= val in O(log n).
 * 2. std::upper_bound(beg, end, val): Returns iterator to first element > val in O(log n).
 * 3. Rotated Search: In any rotated sorted array, AT LEAST ONE HALF is always sorted!
 * 4. Pass by const reference (const std::vector<int>&): Eliminates full-vector copy overhead.
 */

int searchRotatedArray(const std::vector<int>& nums, int target) {
    int low = 0, high = static_cast<int>(nums.size()) - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (nums[mid] == target) return mid;

        // Check if left half is normally sorted
        if (nums[low] <= nums[mid]) {
            // Is target within this sorted left half?
            if (target >= nums[low] && target < nums[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        } 
        // Otherwise, right half MUST be sorted
        else {
            // Is target within this sorted right half?
            if (target > nums[mid] && target <= nums[high]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
    }
    return -1;
}

// Demonstrating C++ STL bounds
void demoSTLBounds() {
    std::vector<int> sortedArr = {1, 2, 4, 4, 4, 7, 9};
    
    // std::lower_bound -> first position where 4 can be inserted without violating sort order
    auto lb = std::lower_bound(sortedArr.begin(), sortedArr.end(), 4);
    // std::upper_bound -> last position where 4 can be inserted
    auto ub = std::upper_bound(sortedArr.begin(), sortedArr.end(), 4);

    int firstIdx = std::distance(sortedArr.begin(), lb); // Index 2
    int count = std::distance(lb, ub);                   // 3 occurrences of 4
    (void)firstIdx;
    (void)count;
}
\`\`\`

---

### Python Implementation (Peak Element Finding & bisect Module)

\`\`\`python
"""
Python Syntax Logic Note:
1. bisect_left / bisect_right: Python standard library implementing binary search bounds.
2. Finding Peak Element (nums[i] >= neighbors): Can be solved in O(log n) even in unsorted
   arrays using binary search slope detection!
3. Floor division //: Automatically handles integer conversion in Python 3.
"""

from typing import List
import bisect

def find_peak_element(nums: List[int]) -> int:
    """
    Finds a peak element index where nums[mid] > nums[mid+1].
    Guaranteed O(log n) time complexity.
    """
    low, high = 0, len(nums) - 1

    while low < high:
        mid = low + (high - low) // 2
        # If descending slope, peak lies in left half (including mid)
        if nums[mid] > nums[mid + 1]:
            high = mid
        # If ascending slope, peak lies strictly in right half
        else:
            low = mid + 1

    return low

def python_bisect_demo():
    arr = [1, 2, 4, 4, 4, 7, 9]
    # bisect_left returns leftmost insertion point (lower bound)
    idx_first = bisect.bisect_left(arr, 4)   # 2
    # bisect_right returns rightmost insertion point (upper bound)
    idx_after = bisect.bisect_right(arr, 4)  # 5
    occurrence_count = idx_after - idx_first # 3
    return idx_first, occurrence_count
\`\`\`
`,
};
