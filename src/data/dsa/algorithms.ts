import { LearningModule } from "@/types/learning";

export const algorithmsModule: LearningModule = {
  id: "algorithms",
  title: "Algorithms",
  description: "Problem-solving techniques - Sorting, Searching, DP, Graphs",
  status: "in-progress",
  detailedContent: `# Algorithms

Algorithms are step-by-step procedures to solve problems. Understanding algorithmic paradigms helps you tackle any coding challenge.

## 🎯 What You'll Learn

| # | Topic | Skill |
|:--|:------|:------|
| 1 | **Time Complexity** | Analyze Big O notation |
| 2 | **Searching** | Linear and Binary search |
| 3 | **Sorting** | Bubble, Selection, Merge, Quick |
| 4 | **Recursion** | Base case and recursive calls |
| 5 | **Divide & Conquer** | Break problems into subproblems |
| 6 | **Greedy** | Local optimal choices |
| 7 | **Dynamic Programming** | Overlapping subproblems |
| 8 | **Graph Algorithms** | BFS, DFS, Shortest path |
| 9 | **Backtracking** | Try all possibilities |

---

## 1. Time Complexity (Big O)

**Common Complexities (Best to Worst):**

| Big O | Name | Example |
|:------|:-----|:--------|
| O(1) | Constant | Array access |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Linear search |
| O(n log n) | Linearithmic | Merge sort |
| O(n²) | Quadratic | Bubble sort |
| O(2ⁿ) | Exponential | Recursive Fibonacci |
| O(n!) | Factorial | Permutations |

\`\`\`python path=null start=null
# O(1) - Constant
def get_first(arr):
    return arr[0]  # Always 1 operation

# O(n) - Linear
def find_max(arr):
    max_val = arr[0]
    for x in arr:  # n iterations
        if x > max_val:
            max_val = x
    return max_val

# O(n²) - Quadratic
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):        # n times
        for j in range(n-1):  # n times
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]

# O(log n) - Logarithmic
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:  # halves each time
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
\`\`\`

**Rules for Big O:**
1. Drop constants: O(2n) → O(n)
2. Drop lower terms: O(n² + n) → O(n²)
3. Different inputs: O(n + m), not O(n)

---

## 2. Searching Algorithms

**Linear Search - O(n):**

\`\`\`python path=null start=null
def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1

# Works on unsorted arrays
arr = [5, 2, 8, 1, 9]
print(linear_search(arr, 8))  # 2
\`\`\`

**Binary Search - O(log n):**

\`\`\`python path=null start=null
def binary_search(arr, target):
    """Array MUST be sorted"""
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1  # Search right half
        else:
            right = mid - 1  # Search left half
    
    return -1

# Sorted array required!
arr = [1, 2, 5, 8, 9]
print(binary_search(arr, 8))  # 3
\`\`\`

**Binary Search Variants:**
- Find first occurrence
- Find last occurrence
- Find insertion position

---

## 3. Sorting Algorithms

**Bubble Sort - O(n²):**

\`\`\`python path=null start=null
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:  # Optimization
            break
    return arr
\`\`\`

**Selection Sort - O(n²):**

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

**Merge Sort - O(n log n):**

\`\`\`python path=null start=null
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result
\`\`\`

**Quick Sort - O(n log n) average:**

\`\`\`python path=null start=null
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)
\`\`\`

**Sorting Comparison:**

| Algorithm | Best | Average | Worst | Stable? |
|:----------|:-----|:--------|:------|:--------|
| Bubble | O(n) | O(n²) | O(n²) | Yes |
| Selection | O(n²) | O(n²) | O(n²) | No |
| Insertion | O(n) | O(n²) | O(n²) | Yes |
| Merge | O(n log n) | O(n log n) | O(n log n) | Yes |
| Quick | O(n log n) | O(n log n) | O(n²) | No |

---

## 4. Recursion

**Key Components:**
1. Base case (stopping condition)
2. Recursive case (calls itself)

\`\`\`python path=null start=null
# Factorial: n! = n × (n-1)!
def factorial(n):
    if n <= 1:  # Base case
        return 1
    return n * factorial(n - 1)  # Recursive case

print(factorial(5))  # 120

# Fibonacci: F(n) = F(n-1) + F(n-2)
def fibonacci(n):
    if n <= 1:  # Base case
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))  # 55

# Sum of array
def array_sum(arr):
    if len(arr) == 0:
        return 0
    return arr[0] + array_sum(arr[1:])
\`\`\`

**Recursion vs Iteration:**
- Recursion: Cleaner code, uses call stack
- Iteration: More memory efficient
- Every recursion can be converted to iteration

---

## 5. Divide and Conquer

**Pattern:**
1. **Divide**: Break into smaller subproblems
2. **Conquer**: Solve subproblems recursively
3. **Combine**: Merge solutions

\`\`\`python path=null start=null
# Binary Search - Divide and Conquer
def binary_search_recursive(arr, target, left, right):
    if left > right:
        return -1
    
    mid = (left + right) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)

# Maximum subarray (Kadane's Algorithm)
def max_subarray(arr):
    max_ending = max_so_far = arr[0]
    for x in arr[1:]:
        max_ending = max(x, max_ending + x)
        max_so_far = max(max_so_far, max_ending)
    return max_so_far

print(max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))  # 6
\`\`\`

---

## 6. Greedy Algorithms

**Principle:** Make locally optimal choice at each step.

\`\`\`python path=null start=null
# Activity Selection (Interval Scheduling)
def activity_selection(activities):
    """
    activities = [(start, end), ...]
    Select max non-overlapping activities
    """
    # Sort by end time
    activities.sort(key=lambda x: x[1])
    
    selected = [activities[0]]
    last_end = activities[0][1]
    
    for start, end in activities[1:]:
        if start >= last_end:  # Non-overlapping
            selected.append((start, end))
            last_end = end
    
    return selected

activities = [(1, 4), (3, 5), (0, 6), (5, 7), (8, 9), (5, 9)]
print(activity_selection(activities))
# [(1, 4), (5, 7), (8, 9)]

# Coin Change (Greedy - works for standard denominations)
def coin_change_greedy(amount, coins):
    coins.sort(reverse=True)
    result = []
    for coin in coins:
        while amount >= coin:
            result.append(coin)
            amount -= coin
    return result

print(coin_change_greedy(36, [1, 5, 10, 25]))  # [25, 10, 1]
\`\`\`

---

## 7. Dynamic Programming

**When to use DP:**
1. Overlapping subproblems
2. Optimal substructure

**Two Approaches:**
- Top-down: Memoization (cache)
- Bottom-up: Tabulation (table)

\`\`\`python path=null start=null
# Fibonacci - Memoization (Top-Down)
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]

# Fibonacci - Tabulation (Bottom-Up)
def fib_tab(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]

# 0/1 Knapsack
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if weights[i - 1] <= w:
                dp[i][w] = max(
                    dp[i - 1][w],  # Don't take item
                    values[i - 1] + dp[i - 1][w - weights[i - 1]]  # Take item
                )
            else:
                dp[i][w] = dp[i - 1][w]
    
    return dp[n][capacity]

weights = [1, 2, 3]
values = [6, 10, 12]
print(knapsack(weights, values, 5))  # 22
\`\`\`

**Classic DP Problems:**
- Longest Common Subsequence
- Coin Change
- Edit Distance
- Matrix Chain Multiplication

---

## 8. Graph Algorithms

**BFS - Shortest Path (Unweighted):**

\`\`\`python path=null start=null
from collections import deque

def bfs_shortest_path(graph, start, end):
    queue = deque([(start, [start])])
    visited = {start}
    
    while queue:
        node, path = queue.popleft()
        
        if node == end:
            return path
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    
    return None
\`\`\`

**DFS - Cycle Detection:**

\`\`\`python path=null start=null
def has_cycle(graph, n):
    """Detect cycle in directed graph"""
    WHITE, GRAY, BLACK = 0, 1, 2
    color = [WHITE] * n
    
    def dfs(node):
        color[node] = GRAY
        
        for neighbor in graph[node]:
            if color[neighbor] == GRAY:  # Back edge
                return True
            if color[neighbor] == WHITE and dfs(neighbor):
                return True
        
        color[node] = BLACK
        return False
    
    for i in range(n):
        if color[i] == WHITE and dfs(i):
            return True
    return False
\`\`\`

**Dijkstra's Algorithm - Shortest Path (Weighted):**

\`\`\`python path=null start=null
import heapq

def dijkstra(graph, start):
    """
    graph = {node: [(neighbor, weight), ...]}
    """
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    
    while pq:
        current_dist, node = heapq.heappop(pq)
        
        if current_dist > distances[node]:
            continue
        
        for neighbor, weight in graph[node]:
            distance = current_dist + weight
            
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    
    return distances
\`\`\`

---

## 9. Backtracking

**Pattern:** Try → Check → Undo if wrong

\`\`\`python path=null start=null
# Generate all permutations
def permutations(arr):
    result = []
    
    def backtrack(start):
        if start == len(arr):
            result.append(arr[:])
            return
        
        for i in range(start, len(arr)):
            arr[start], arr[i] = arr[i], arr[start]  # Try
            backtrack(start + 1)
            arr[start], arr[i] = arr[i], arr[start]  # Undo
    
    backtrack(0)
    return result

print(permutations([1, 2, 3]))

# N-Queens
def solve_n_queens(n):
    solutions = []
    
    def is_safe(board, row, col):
        # Check column
        for i in range(row):
            if board[i] == col:
                return False
            # Check diagonals
            if abs(board[i] - col) == row - i:
                return False
        return True
    
    def backtrack(board, row):
        if row == n:
            solutions.append(board[:])
            return
        
        for col in range(n):
            if is_safe(board, row, col):
                board[row] = col
                backtrack(board, row + 1)
                board[row] = -1
    
    backtrack([-1] * n, 0)
    return solutions
\`\`\`

---

## TL;DR - Algorithm Selection Guide

| Problem Type | Best Algorithm |
|:-------------|:---------------|
| Search unsorted | Linear Search O(n) |
| Search sorted | Binary Search O(log n) |
| Sort (stable) | Merge Sort O(n log n) |
| Sort (in-place) | Quick Sort O(n log n) |
| Shortest path (unweighted) | BFS O(V+E) |
| Shortest path (weighted) | Dijkstra O(E log V) |
| All possibilities | Backtracking |
| Overlapping subproblems | Dynamic Programming |
| Local optimal → Global | Greedy |
    `,
  subModules: [],
  practiceQuiz: [
    {
      id: "algo-q1",
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
      correctAnswer: 2,
      explanation:
        "Binary search is O(log n).\n\nWhy? Each comparison halves the search space:\n• n → n/2 → n/4 → ... → 1\n• Number of steps = log₂(n)",
      difficulty: "easy",
    },
    {
      id: "algo-q2",
      question: "Which sorting algorithm is NOT stable?",
      options: ["Merge Sort", "Bubble Sort", "Quick Sort", "Insertion Sort"],
      correctAnswer: 2,
      explanation:
        "Quick Sort is NOT stable.\n\nStable = equal elements keep original order\n\n• Stable: Merge, Bubble, Insertion\n• Unstable: Quick, Selection, Heap",
      difficulty: "medium",
    },
    {
      id: "algo-q3",
      question: "What is the base case in Fibonacci recursion?",
      options: [
        "F(0) = 1, F(1) = 1",
        "F(0) = 0, F(1) = 1",
        "F(1) = 1, F(2) = 1",
        "F(n) = F(n-1)",
      ],
      correctAnswer: 1,
      explanation:
        "Fibonacci base case: F(0) = 0, F(1) = 1\n\nSequence: 0, 1, 1, 2, 3, 5, 8, 13...\n\nF(n) = F(n-1) + F(n-2) for n > 1",
      difficulty: "easy",
    },
    {
      id: "algo-q4",
      question: "Greedy algorithms always give optimal solution:",
      options: [
        "True for all problems",
        "False for all problems",
        "Only for specific problems",
        "Never",
      ],
      correctAnswer: 2,
      explanation:
        "Greedy works only for specific problems:\n\n✓ Works: Activity selection, Huffman, MST\n✗ Fails: 0/1 Knapsack, Coin change (some cases)\n\nNeed to prove 'greedy choice property' first.",
      difficulty: "medium",
    },
    {
      id: "algo-q5",
      question: "Dynamic Programming requires:",
      options: [
        "Random subproblems",
        "Overlapping subproblems",
        "No subproblems",
        "Unique subproblems",
      ],
      correctAnswer: 1,
      explanation:
        "DP needs:\n1. Overlapping subproblems (same subproblem solved multiple times)\n2. Optimal substructure (optimal solution uses optimal subsolutions)\n\nExample: Fibonacci recalculates F(3) many times.",
      difficulty: "easy",
    },
    {
      id: "algo-q6",
      question: "Merge Sort's space complexity is:",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      explanation:
        "Merge Sort uses O(n) extra space.\n\nWhy?\n• Needs temporary array for merging\n• Cannot merge in-place efficiently\n\nQuick Sort uses O(log n) for recursion stack.",
      difficulty: "medium",
    },
    {
      id: "algo-q7",
      question: "BFS uses which data structure?",
      options: ["Stack", "Queue", "Heap", "Hash Table"],
      correctAnswer: 1,
      explanation:
        "BFS uses Queue (FIFO)\n\n• Process nodes level by level\n• First discovered = first processed\n\nDFS uses Stack (LIFO) or recursion.",
      difficulty: "easy",
    },
    {
      id: "algo-q8",
      question: "Worst case of Quick Sort occurs when:",
      options: [
        "Array is random",
        "Array is already sorted",
        "Array has duplicates",
        "Array size is odd",
      ],
      correctAnswer: 1,
      explanation:
        "Quick Sort worst case: O(n²)\n\nOccurs when pivot is always min or max:\n• Already sorted array\n• Reverse sorted array\n\nFix: Random pivot or median-of-three.",
      difficulty: "medium",
    },
    {
      id: "algo-q9",
      question: "Dijkstra's algorithm does NOT work with:",
      options: [
        "Undirected graphs",
        "Weighted graphs",
        "Negative edge weights",
        "Sparse graphs",
      ],
      correctAnswer: 2,
      explanation:
        "Dijkstra fails with negative weights!\n\nWhy? It assumes shortest path found is final.\nNegative edges can make a longer path shorter.\n\nUse Bellman-Ford for negative weights.",
      difficulty: "medium",
    },
    {
      id: "algo-q10",
      question: "Backtracking is best for:",
      options: [
        "Sorting",
        "Searching",
        "Constraint satisfaction problems",
        "Graph traversal",
      ],
      correctAnswer: 2,
      explanation:
        "Backtracking solves constraint problems:\n\n• N-Queens\n• Sudoku\n• Permutations/Combinations\n• Maze solving\n\nPattern: Try → Validate → Undo if invalid",
      difficulty: "easy",
    },
  ],
};
