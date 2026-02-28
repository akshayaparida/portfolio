import { LearningModule } from "@/types/learning";

export const searchingSortingModule: LearningModule = {
  id: "08-searching-sorting",
  title: "8. Searching & Sorting",
  description:
    "Comparison & Non-Comparison Algorithms, Lower Bounds, Stability, Complexities",
  status: "completed",
  tags: ["Algorithm"],
  detailedContent: `# Searching & Sorting Algorithms

> **Algorithm Module (CUET PG Lectures 11 & 12)** — Beating the comparison barrier

---

## What You'll Learn

| # | Topic | Why It Matters |
|:--|:------|:---------------|
| 1 | Two complexity classes | O(n²) vs O(n log n) — the fundamental divide |
| 2 | Searching algorithms | Linear & Binary search |
| 3 | O(n²) sorts | Bubble, Selection, Insertion, Shell |
| 4 | O(n log n) sorts | Merge, Quick, Heap |
| 5 | Stability & lower bounds | What comparison sorts can and cannot do |
| 6 | Breaking the Barrier | Non-comparison sorts: Counting, Radix, Bucket |

---

## 1. The Two Complexity Classes

~~~text
  ┌─────────────────────────────────────────────────────────┐
  │  O(n²)        →  Bubble, Selection, Insertion, Shell    │
  │  O(n log n)   →  Merge, Quick, Heap                    │
  └─────────────────────────────────────────────────────────┘

  If n = 10,000:
    n²       = 100,000,000  (one hundred million operations)
    n log n  ≈ 132,877      (one hundred thirty-three thousand)

  That's the difference between "runs instantly"
  and "why is my laptop crying?"
~~~

---

## 2. Searching Algorithms

### Linear Search — O(n)

Check every item one by one. Works on **any** list.

~~~python
def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i      # Found
    return -1
~~~

### Binary Search — O(log n)

Divide search space in half. **Requires sorted array!**
Each comparison removes half the search space (exponential reduction).

~~~python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
~~~

---

## 3. Comparison Sorts: O(n²)

### Bubble Sort

Repeatedly compare adjacent elements. Largest bubbles to the end.

- **Comparisons:** $n(n - 1) / 2$
- **Worst Case:** $O(n^2)$
- **Best Case:** $O(n)$ (already sorted)
- **Stable:** Yes

### Selection Sort

Find smallest element, swap with first position. Repeat.

- **Exam Trap:** It ALWAYS performs $n(n - 1) / 2$ comparisons, regardless of whether input is sorted or reverse sorted.
- **Worst/Best:** $O(n^2)$ always!
- **Swaps:** At most $n$.
- **Stable:** No.

### Insertion Sort

Build sorted left portion. Highly underrated.

- **Worst Case:** $O(n^2)$
- **Best Case:** $O(n)$
- **Stable:** Yes
- **Usage:** Real systems (Java, Python) switch to insertion sort for tiny arrays (e.g., $n < 47$) inside Quick/Merge sort because low overhead makes it very fast in practice.

### Shell Sort

Insertion sort but jumping using gaps that shrink over time.
- **Time:** $O(n \\log^2 n)$ to $O(n^{1.5})$. Unstable.

---

## 4. Comparison Sorts: O(n log n)

### Merge Sort ⭐

Divide into halves, recursively sort, and merge back.

~~~text
  Recurrence: T(n) = 2T(n/2) + Θ(n)
  By Master Theorem → T(n) = Θ(n log n)
~~~

- **Time:** $O(n \\log n)$ Always guaranteed.
- **Space:** $O(n)$ (Needs extra array!)
- **Stable:** Yes.

### Quick Sort ⭐

Pick a pivot, position elements less than pivot left, greater right. Recursively sort halves.

- **Average Time:** $O(n \\log n)$
- **Worst Case:** $O(n^2)$ — Happens when array is sorted AND you pick extreme pivots. (Pivot strategy is critical).
- **Space:** $O(\\log n)$ stack space.
- **Stable:** No.
- **Why use it?** Good cache behavior makes it the fastest in actual hardware practice.

### Heap Sort

Build max-heap ($O(n)$). Continually pop root and heapify ($O(\\log n)$).

- **Time:** $O(n \\log n)$ Guaranteed.
- **Space:** $O(1)$ — Entirely in-place!
- **Stable:** No.
- **Usage:** Reliable, no worst-case $O(n^2)$ trap like Quick Sort, no $O(n)$ space requirement like Merge Sort.

---

## 5. The Comparison Limit

**Stable vs Unstable Sorting:**
- Stable: Equal elements keep their original relative order. (Important for multi-key database sorts).
- Stable: Insertion, Merge, Bubble.
- Unstable: Quick, Heap, Selection.

**The Comparison Bound Theorem:**
~~~text
  No comparison-based sort can beat Ω(n log n) in the worst case.
~~~
Every algorithm above compares $A < B$. The mathematics of decision trees proves they can never be faster than $\\Omega(n \\log n)$.

So, how do we go faster? We stop comparing!

---

## 6. Breaking the Barrier: Non-Comparison Sorts

Non-comparison algorithms beat $n \\log n$ time by making strict assumptions about the data.

### Counting Sort

**Assumption:** Elements are integers in a small range $[0 \\dots k]$.

**Idea:**
1. Count occurrences of each value in a \`count[]\` array.
2. Convert counts to prefix sums (to determine exact final array indices).
3. Place elements directly in correct positions (working backwards to maintain stability).

~~~text
  Time: O(n + k)
  Space: O(n + k)
  Stable: YES
~~~

> **Exam Trick:** If $k = O(n)$, then Counting Sort is strictly $O(n)$.
>
> **Drawback:** It is terrible if the range is huge. Sorting 5 phone numbers requires an array size of 9,999,999,999! Great for exam marks (0-100), bad for large ranges.

### Radix Sort

Sort digit by digit, from Least Significant Digit (LSD) up to the Most Significant Digit.
Each digit pass MUST use a **stable** sort (like counting sort under the hood).

**Idea:** Why sort whole numbers when you can sort by the 1s place, then the 10s place, then 100s?

~~~text
  Time: O(d(n + k))   Where 'd' is the number of digits.
  Space: O(n + k)
  Stable: YES
~~~

> **Real-world Example:** Sorting standard dates. Day $\\rightarrow$ Month $\\rightarrow$ Year. By sorting year last, the stability keeps the months/days ordered! Radix is clever engineering layered on Counting Sort.

### Bucket Sort

**Assumption:** Input data is uniformly distributed randomly over a range (like $[0, 1)$).

**Idea:**
1. Create $n$ empty buckets.
2. Scatter elements into buckets based on value.
3. Sort each bucket individually (often using insertion sort).
4. Concatenate the buckets.

~~~text
  Average Time: O(n)
  Worst Case Time: O(n log n)  OR  O(n²)
~~~

> **The Trap:** If the data isn't uniformly distributed, all elements might fall into a single bucket. Then Bucket Sort degrades to whatever algorithm was used to sort the individual bucket!

---

## 7. The Master Summary Table

| Algorithm | Best | Average | Worst | Stable? | Space | Idea / Limits |
|:----------|:-----|:--------|:------|:--------|:------|:--------------|
| **Bubble** | $O(n)$ | $O(n^2)$ | $O(n^2)$ | ✅ | $O(1)$ | $n(n-1)/2$ comps |
| **Selection**| $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | ❌ | $O(1)$ | Consistently slow |
| **Insertion**| **$O(n)$** | $O(n^2)$ | $O(n^2)$ | ✅ | $O(1)$ | Great for small $n$ |
| **Merge** | $O(n \\log n)$| $O(n \\log n)$| $O(n \\log n)$| ✅ | **$O(n)$** | Reliable D&C |
| **Quick** | $O(n \\log n)$| $O(n \\log n)$| **$O(n^2)$** | ❌ | $O(\\log n)$| Fastest hardware avg |
| **Heap** | $O(n \\log n)$| $O(n \\log n)$| $O(n \\log n)$| ❌ | **$O(1)$** | In-place tree order |
| **Counting** | $O(n+k)$ | $O(n+k)$ | $O(n+k)$ | ✅ | $O(n+k)$ | Range bounded data |
| **Radix** | $O(dn)$ | $O(dn)$ | $O(dn)$ | ✅ | $O(n+k)$ | Digit-by-digit |
| **Bucket** | $O(n)$ | **$O(n)$** | $O(n^2)$ | ✅ | $O(n)$ | Uniform distribution |

---

## TL;DR - Formula Sheet

**Recurrences & Complexity:**
- **Merge Sort Recurrence:** $T(n) = 2T(n/2) + n$
- **Comparison Lower Bound:** $\\Omega(n \\log n)$
- **Counting Sort Time:** $O(n + k)$
- **Radix Sort Time:** $O(d(n + k))$

**Golden Rules:**
1. **Quick Sort Worst Case** occurs when array is already sorted and pivot is extreme.
2. **Selection Sort** makes $n(n-1)/2$ comparisons no matter what the input is.
3. **Counting Sort** requires memory proportional to the maximum value ($k$), making it fail for huge data ranges.
4. **Radix Sort** MUST use a stable sorting sub-routine (like Counting Sort) to work.

---

## Additional Resources

**Video Courses:**
- [Abdul Bari - Sorting Algorithms](https://youtu.be/pkkFqlG0Hds)
- [MIT 6.006 - Linear Sorting (Counting/Radix)](https://youtu.be/Nz1KZXbghj8)

**Practice Problems:**
- LeetCode 912: Sort an Array
- LeetCode 75: Sort Colors (Dutch National Flag)
- LeetCode 164: Maximum Gap (Radix Sort / Bucket Sort Application)
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "ss-q1",
      question: "Which of the following is NOT true about Counting Sort?",
      options: [
        "It operates in O(n + k) time.",
        "It uses comparison between elements to sort.",
        "It is a stable sorting algorithm.",
        "It is highly inefficient if the range k is significantly larger than n.",
      ],
      correctAnswer: 1,
      explanation:
        "Counting Sort is a NON-comparison sort. It does not compare items against each other (A < B); instead, it counts occurrences of elements and maps them directly to positions.",
      difficulty: "easy" as const,
    },
    {
      id: "ss-q2",
      question:
        "In Radix Sort, a fundamental requirement for the sub-sorting algorithm (applied to each digit) is that it must be:",
      options: [
        "In-place",
        "An O(n log n) comparison sort",
        "Stable",
        "Recursive",
      ],
      correctAnswer: 2,
      explanation:
        "Radix sort processes from the Least Significant Digit upwards. It relies entirely on the sub-sort being STABLE so that sorting by a more significant digit preserves the ordering established by the previous, lesser significant digits.",
      difficulty: "medium" as const,
    },
    {
      id: "ss-q3",
      question: "What happens to Bucket Sort in the worst case, and why?",
      options: [
        "It becomes O(n) because buckets naturally balance.",
        "It degrades to O(n log n) or O(n²) because all elements might fall into the exact same bucket.",
        "It becomes O(n log n) because it is bounded by the comparison limit.",
        "It throws an out-of-memory error.",
      ],
      correctAnswer: 1,
      explanation:
        "Bucket Sort assumes a uniform distribution of elements. If the items are severely clustered, they could all drop into a single bucket. In that worst-case scenario, the performance drops to the speed of the underlying sorting algorithm used for that one bucket (usually Insertion Sort O(n²) or Merge/Quick O(n log n)).",
      difficulty: "medium" as const,
    },
    {
      id: "ss-q4",
      question:
        "Why can non-comparison sorts (like Radix and Counting) beat the Ω(n log n) theoretical barrier for sorting?",
      options: [
        "They use binary trees internally.",
        "They use extra memory which makes hardware run faster.",
        "They do not rely on a binary decision tree of comparisons, but instead use mathematical mapping and memory indexing.",
        "The Ω(n log n) barrier is a myth.",
      ],
      correctAnswer: 2,
      explanation:
        "The Ω(n log n) lower bound mathematically applies specifically to comparison-based models (where you only know if A < B). By utilizing properties of the values themselves as array indices (mathematical mapping), non-comparison algorithms bypass that specific theoretical limit.",
      difficulty: "hard" as const,
    },
    {
      id: "ss-q5",
      question:
        "The recurrence T(n) = 2T(n/2) + Θ(n) heavily defines which algorithm, and evaluates to what complexity?",
      options: [
        "Binary Search / Θ(O log n)",
        "Quick Sort / Θ(n²)",
        "Merge Sort / Θ(n log n)",
        "Heap Sort / Θ(n log n)",
      ],
      correctAnswer: 2,
      explanation:
        "This is the famous Merge Sort recurrence: Two recursive calls on half the array size (2T(n/2)), plus a linear scan to merge the results (Θ(n)). Following the Master Theorem, this solves to Θ(n log n).",
      difficulty: "easy" as const,
    },
    {
      id: "ss-q6",
      question: "Selection Sort is often an exam trap because:",
      options: [
        "It is faster than Quick Sort.",
        "It uses O(n log n) memory.",
        "It performs exactly the same number of comparisons n(n-1)/2 regardless of the initial ordering of the array.",
        "It is the only stable O(n²) algorithm.",
      ],
      correctAnswer: 2,
      explanation:
        "Selection sort mindlessly scans the entire remaining unsorted section to find the minimum value in every pass. There is no break condition, meaning best, average, and worst cases all take exactly O(n²) comparisons.",
      difficulty: "medium" as const,
    },
    {
      id: "ss-q7",
      question:
        "Which hybrid approach is famously used by both Python's sorted() and Java's Collections.sort() for maximum practical efficiency?",
      options: [
        "Utilizing Counting Sort internally",
        "Falling back to basic Bubble Sort to save memory",
        "Switching to Insertion Sort for very small partitions / sub-arrays",
        "Avoiding recursion entirely to stick to O(1) space",
      ],
      correctAnswer: 2,
      explanation:
        "Both Timsort (Python) and Java's implementations switch to Insertion Sort for sorting tiny arrays (often sizes < 32 or 47). Though mathematically O(n²), Insertion Sort has so little overhead that the constant factors beat O(n log n) algorithms on microscopic scales.",
      difficulty: "hard" as const,
    },
    {
      id: "ss-q8",
      question:
        "Assume you need to sort elements with guaranteed O(n log n) time complexity, and you are strictly limited to O(1) extra space. Which algorithm MUST you choose?",
      options: ["Merge Sort", "Heap Sort", "Quick Sort", "Radix Sort"],
      correctAnswer: 1,
      explanation:
        "Heap Sort operates entirely in-place (O(1) space) and possesses a strict mathematical upper bound of O(n log n) in all worst-case scenarios. Merge Sort needs O(n) space, and Quick Sort needs O(log n) stack space and risks an O(n²) worst-case runtime.",
      difficulty: "medium" as const,
    },
    {
      id: "ss-q9",
      question:
        "If sorting a database table of student records first by Name, then by Grades, using an 'unstable' sorting algorithm for the Grades will result in:",
      options: [
        "An immediate O(n²) degradation",
        "The Names losing their originally sorted alphabetical positioning amongst students with identical Grades",
        "A stack overflow",
        "Flawless results",
      ],
      correctAnswer: 1,
      explanation:
        "Stability means equal keys maintain their initial relative order. If the algorithm is unstable, sorting the secondary key (Grade) jumbles up the primary key (Name) for rows where the Grades are exactly the same.",
      difficulty: "medium" as const,
    },
    {
      id: "ss-q10",
      question:
        "We have numbers ranging from 1 to 999,999,999, but we only have 50 total elements in our array. Why shouldn't we use Counting Sort?",
      options: [
        "Because it is comparison-based.",
        "Because the time and space complexity O(n + k) would require an astronomical amount of memory (size k = 1 billion) just to sort 50 elements.",
        "Counting sort only works on floating point values.",
        "Because the average case diverges from the worst case.",
      ],
      correctAnswer: 1,
      explanation:
        "Counting Sort demands initializing an array covering the full range of values. Allocating an array spanning index 0 to index 999,999,999 requires entirely disproportionate memory overhead, making it catastrophically bad for high-variance, sparsely populated data sets.",
      difficulty: "easy" as const,
    },
  ],
};
