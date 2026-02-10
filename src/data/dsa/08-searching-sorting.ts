import { LearningModule } from "@/types/learning";

export const searchingSortingModule: LearningModule = {
  id: "08-searching-sorting",
  title: "8. Searching & Sorting",
  description: "Core algorithms - Linear, Binary, Bubble, Merge, Quick Sort",
  status: "in-progress",
  tags: ["Algorithm"],
  detailedContent: `# Searching & Sorting

> **Algorithm Module** - Learn essential problem-solving techniques

---

## What You'll Learn

1. Analyze time complexity (Big O notation)
2. Master Linear and Binary Search
3. Implement common sorting algorithms
4. Know which algorithm to use when

---

## 1. Time Complexity Made Simple

**Big O** tells us how runtime grows with input size.

### Common Complexities (Ranked by Speed)

| Big O | Name | Example | 1000 items |
|:------|:-----|:--------|:-----------|
| O(1) | Constant | Array access | 1 step |
| O(log n) | Logarithmic | Binary search | 10 steps |
| O(n) | Linear | Linear search | 1000 steps |
| O(n log n) | Linearithmic | Merge sort | 10,000 steps |
| O(n²) | Quadratic | Bubble sort | 1,000,000 steps |

**Simple rules:**
1. Drop constants: O(2n) → O(n)
2. Keep highest term: O(n² + n) → O(n²)
3. Different inputs: O(n + m), not O(2n)

---

## 2. Searching Algorithms

### Linear Search - O(n)

**Check every item one by one** - works on ANY list!

\`\`\`python path=null start=null
def linear_search(arr, target):
    """Check each element until found"""
    for i, val in enumerate(arr):
        if val == target:
            return i  # Found! Return index
    return -1  # Not found

# Works on unsorted arrays!
nums = [5, 2, 8, 1, 9]
print(linear_search(nums, 8))  # 2 (found at index 2)
print(linear_search(nums, 7))  # -1 (not found)
\`\`\`

**When to use:** Unsorted data, small arrays

### Binary Search - O(log n)

**Divide in half each time** - REQUIRES SORTED array!

\`\`\`python path=null start=null
def binary_search(arr, target):
    """
    Array MUST be sorted!
    Halve search space each step
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2  # Find middle
        
        if arr[mid] == target:
            return mid  # Found!
        elif arr[mid] < target:
            left = mid + 1   # Target is in right half
        else:
            right = mid - 1  # Target is in left half
    
    return -1  # Not found

# Must be sorted!
nums = [1, 2, 5, 8, 9, 12, 15]
print(binary_search(nums, 8))   # 3
print(binary_search(nums, 10))  # -1
\`\`\`

**Why O(log n)?**
\`\`\`
Start: [1, 2, 5, 8, 9, 12, 15]  (7 elements)
Step 1: search [9, 12, 15]      (3 elements)
Step 2: search [9]              (1 element)

7 → 3 → 1 = only 3 steps for 7 items!
For 1000 items: only ~10 steps!
\`\`\`

---

## 3. Sorting Algorithms

### Bubble Sort - O(n²)

**Bubble up largest to end, repeat**

\`\`\`python path=null start=null
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        # Compare adjacent pairs
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:  # Already sorted!
            break
    return arr

print(bubble_sort([64, 34, 25, 12, 22]))
# [12, 22, 25, 34, 64]
\`\`\`

**Visual:**
\`\`\`
[5, 3, 8, 1]
 ↓
[3, 5, 8, 1] → [3, 5, 1, 8] → 8 bubbled up!
 ↓
[3, 5, 1, 8] → [3, 1, 5, 8] → 5 bubbled up!
 ↓
[1, 3, 5, 8] → Done!
\`\`\`

### Selection Sort - O(n²)

**Find minimum, put at front, repeat**

\`\`\`python path=null start=null
def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        # Find minimum in remaining array
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        # Swap minimum to current position
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr
\`\`\`

### Merge Sort - O(n log n) ⭐

**Divide, sort halves, merge** - Most reliable!

\`\`\`python path=null start=null
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    # Divide
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # Merge sorted halves
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    # Compare and pick smaller
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # Add remaining
    result.extend(left[i:])
    result.extend(right[j:])
    return result
\`\`\`

### Quick Sort - O(n log n) average ⭐

**Pick pivot, partition around it**

\`\`\`python path=null start=null
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]  # Pick middle as pivot
    left = [x for x in arr if x < pivot]   # Smaller
    middle = [x for x in arr if x == pivot] # Equal
    right = [x for x in arr if x > pivot]  # Larger
    
    return quick_sort(left) + middle + quick_sort(right)
\`\`\`

---

## 4. Sorting Comparison

| Algorithm | Best | Average | Worst | Stable? | Space |
|:----------|:-----|:--------|:------|:--------|:------|
| Bubble | O(n) | O(n²) | O(n²) | ✅ | O(1) |
| Selection | O(n²) | O(n²) | O(n²) | ❌ | O(1) |
| Merge | O(n log n) | O(n log n) | O(n log n) | ✅ | O(n) |
| Quick | O(n log n) | O(n log n) | O(n²) | ❌ | O(log n) |

**Stable** = equal elements keep original order
**Python's built-in sort** = Timsort (Merge + Insertion hybrid)

---

## Key Takeaways

| Need | Use |
|:-----|:----|
| Search unsorted | Linear O(n) |
| Search sorted | Binary O(log n) |
| Sort small array | Any works |
| Sort large array | Merge/Quick O(n log n) |
| Stable sort needed | Merge Sort |

**Remember:**
- Binary search = **sorted array only**
- Merge sort = **guaranteed O(n log n)**
- Quick sort = **fast average, O(n²) worst**
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "ss-q1",
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
      correctAnswer: 2,
      explanation:
        "Binary search is O(log n). Each comparison halves the search space. For 1000 items, only ~10 steps needed.",
      difficulty: "easy",
    },
    {
      id: "ss-q2",
      question: "Which sorting algorithm is NOT stable?",
      options: ["Merge Sort", "Bubble Sort", "Quick Sort", "Insertion Sort"],
      correctAnswer: 2,
      explanation:
        "Quick Sort is NOT stable. Equal elements may change relative order during partitioning. Merge Sort preserves order.",
      difficulty: "medium",
    },
    {
      id: "ss-q3",
      question: "Binary search requires the array to be:",
      options: ["Empty", "Sorted", "Reversed", "Of unique elements"],
      correctAnswer: 1,
      explanation:
        "Binary search REQUIRES sorted array. The algorithm decides 'go left or right' based on comparison, which only works if sorted.",
      difficulty: "easy",
    },
    {
      id: "ss-q4",
      question: "What is the worst case time complexity of Quick Sort?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
      correctAnswer: 2,
      explanation:
        "Quick Sort worst case is O(n²). Happens when pivot is always smallest/largest (already sorted array with bad pivot choice).",
      difficulty: "medium",
    },
    {
      id: "ss-q5",
      question:
        "Which sorting algorithm has O(n log n) time in ALL cases (best, average, worst)?",
      options: ["Quick Sort", "Merge Sort", "Bubble Sort", "Selection Sort"],
      correctAnswer: 1,
      explanation:
        "Merge Sort is always O(n log n). Divide-and-conquer ensures consistent performance. Quick Sort can be O(n²) worst case.",
      difficulty: "easy",
    },
    {
      id: "ss-q6",
      question: "Linear search has time complexity:",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      explanation:
        "Linear search is O(n). Checks each element one by one. Works on unsorted arrays unlike binary search.",
      difficulty: "easy",
    },
    {
      id: "ss-q7",
      question: "Space complexity of Merge Sort is:",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      explanation:
        "Merge Sort uses O(n) extra space for temporary arrays during merging. Quick Sort uses O(log n) for recursion stack.",
      difficulty: "medium",
    },
    {
      id: "ss-q8",
      question: "Which sorting algorithm is best for nearly sorted arrays?",
      options: ["Merge Sort", "Quick Sort", "Insertion Sort", "Selection Sort"],
      correctAnswer: 2,
      explanation:
        "Insertion Sort is O(n) for nearly sorted arrays. Only needs to move a few elements. Other algorithms don't adapt.",
      difficulty: "medium",
    },
    {
      id: "ss-q9",
      question: "In Bubble Sort, after first pass:",
      options: [
        "Array is sorted",
        "Smallest is at front",
        "Largest is at end",
        "Nothing changes",
      ],
      correctAnswer: 2,
      explanation:
        "After first pass, largest element 'bubbles up' to the end. Each pass places next largest in correct position.",
      difficulty: "easy",
    },
    {
      id: "ss-q10",
      question: "Python's built-in sort uses:",
      options: ["Quick Sort", "Merge Sort", "Timsort", "Heap Sort"],
      correctAnswer: 2,
      explanation:
        "Python uses Timsort (hybrid of Merge Sort and Insertion Sort). Optimized for real-world data with runs of sorted elements.",
      difficulty: "medium",
    },
  ],
};
