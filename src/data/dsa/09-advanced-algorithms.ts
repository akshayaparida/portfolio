import { LearningModule } from "@/types/learning";

export const advancedAlgorithmsModule: LearningModule = {
  id: "09-advanced-algorithms",
  title: "9. Advanced Algorithms",
  description:
    "Problem-solving paradigms - Recursion, DP, Greedy, Backtracking",
  status: "in-progress",
  tags: ["Algorithm"],
  detailedContent: `# Advanced Algorithms

> **Algorithm Module** - Master powerful problem-solving techniques

---

## What You'll Learn

1. Write recursive solutions with base cases
2. Apply Dynamic Programming for optimization
3. Use Greedy approach for local optima
4. Implement Backtracking for constraint problems

---

## 1. Recursion - Functions Calling Themselves

### Simple Explanation

Recursion = A function that calls itself with a smaller problem.

**Two essential parts:**
1. **Base case** - When to STOP (prevents infinite loop!)
2. **Recursive case** - Break problem into smaller version

### Factorial Example

\`\`\`python path=null start=null
def factorial(n):
    """
    5! = 5 × 4 × 3 × 2 × 1 = 120
    
    Notice: 5! = 5 × 4!
    So: factorial(5) = 5 × factorial(4)
    """
    # Base case: stop when n is 0 or 1
    if n <= 1:
        return 1
    
    # Recursive case: n × (n-1)!
    return n * factorial(n - 1)

print(factorial(5))  # 120

# How it works:
# factorial(5) = 5 × factorial(4)
# factorial(4) = 4 × factorial(3)
# factorial(3) = 3 × factorial(2)
# factorial(2) = 2 × factorial(1)
# factorial(1) = 1  ← BASE CASE reached!
# Unwind: 2×1=2, 3×2=6, 4×6=24, 5×24=120
\`\`\`

### Fibonacci Example

\`\`\`python path=null start=null
def fibonacci(n):
    """
    Sequence: 0, 1, 1, 2, 3, 5, 8, 13...
    Each number = sum of previous two
    """
    # Base cases
    if n == 0:
        return 0
    if n == 1:
        return 1
    
    # fib(n) = fib(n-1) + fib(n-2)
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(6))  # 8 (sequence: 0,1,1,2,3,5,8)
\`\`\`

**Warning:** This simple Fibonacci is O(2ⁿ) - very slow for large n!
That's why we need Dynamic Programming...

---

## 2. Dynamic Programming (DP) - Remember Past Work

### Simple Explanation

DP = **Don't solve the same problem twice!**

Store answers to subproblems, reuse them later.

### When to Use DP?

1. **Overlapping subproblems** - Same calculation happens many times
2. **Optimal substructure** - Best solution uses best sub-solutions

### Fibonacci with Memoization (Top-Down DP)

\`\`\`python path=null start=null
def fib_memo(n, memo={}):
    """
    Store results in 'memo' dictionary
    Before calculating, check if already done
    """
    if n in memo:
        return memo[n]  # Already calculated!
    
    if n <= 1:
        return n
    
    # Calculate and STORE before returning
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]

print(fib_memo(50))  # Now O(n) instead of O(2ⁿ)!
# Without memo: would take years
# With memo: instant!
\`\`\`

### Fibonacci with Tabulation (Bottom-Up DP)

\`\`\`python path=null start=null
def fib_tab(n):
    """
    Build up from base cases
    Fill a table from start to n
    """
    if n <= 1:
        return n
    
    # Create table
    dp = [0] * (n + 1)
    dp[0] = 0
    dp[1] = 1
    
    # Fill bottom-up
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    
    return dp[n]

print(fib_tab(50))  # Also O(n)!
\`\`\`

### Classic DP Problem: 0/1 Knapsack

\`\`\`python path=null start=null
def knapsack(weights, values, capacity):
    """
    Given items with weights and values,
    maximize value within weight capacity.
    Each item: take it or leave it (0/1)
    """
    n = len(weights)
    # dp[i][w] = max value using first i items with capacity w
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            # Option 1: Don't take item i
            dp[i][w] = dp[i - 1][w]
            
            # Option 2: Take item i (if it fits)
            if weights[i - 1] <= w:
                take = values[i - 1] + dp[i - 1][w - weights[i - 1]]
                dp[i][w] = max(dp[i][w], take)
    
    return dp[n][capacity]

weights = [1, 2, 3]
values = [6, 10, 12]
print(knapsack(weights, values, 5))  # 22
\`\`\`

---

## 3. Greedy Algorithms - Take the Best Now

### Simple Explanation

Greedy = **Always pick the locally best option**

Hope that local best choices lead to global best!

**Warning:** Doesn't always work! Only for specific problems.

### Activity Selection (Scheduling)

\`\`\`python path=null start=null
def activity_selection(activities):
    """
    activities = [(start, end), ...]
    Maximize non-overlapping activities
    
    Greedy: Always pick earliest ending activity
    """
    # Sort by end time
    activities.sort(key=lambda x: x[1])
    
    selected = [activities[0]]
    last_end = activities[0][1]
    
    for start, end in activities[1:]:
        if start >= last_end:  # Doesn't overlap!
            selected.append((start, end))
            last_end = end
    
    return selected

activities = [(1, 4), (3, 5), (0, 6), (5, 7), (8, 9)]
print(activity_selection(activities))
# [(1, 4), (5, 7), (8, 9)] - 3 activities!
\`\`\`

---

## 4. Backtracking - Try All, Undo Bad

### Simple Explanation

Backtracking = **Try → Validate → Undo if wrong**

Like solving a maze: try a path, hit dead end, go back, try another.

### Generate Permutations

\`\`\`python path=null start=null
def permutations(arr):
    result = []
    
    def backtrack(start):
        if start == len(arr):
            result.append(arr[:])  # Found one!
            return
        
        for i in range(start, len(arr)):
            arr[start], arr[i] = arr[i], arr[start]  # Try
            backtrack(start + 1)
            arr[start], arr[i] = arr[i], arr[start]  # Undo
    
    backtrack(0)
    return result

print(permutations([1, 2, 3]))
# [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,2,1], [3,1,2]]
\`\`\`

---

## 5. Graph Algorithms

### Dijkstra's Algorithm (Shortest Path)

Find shortest path from source to all vertices in weighted graph.

\`\`\`python path=null start=null
import heapq

def dijkstra(graph, start):
    """
    graph = {node: [(neighbor, weight), ...]}
    Returns shortest distance to each node
    """
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]  # (distance, node)
    
    while pq:
        dist, node = heapq.heappop(pq)
        
        if dist > distances[node]:
            continue
        
        for neighbor, weight in graph[node]:
            new_dist = dist + weight
            if new_dist < distances[neighbor]:
                distances[neighbor] = new_dist
                heapq.heappush(pq, (new_dist, neighbor))
    
    return distances

graph = {
    'A': [('B', 1), ('C', 4)],
    'B': [('A', 1), ('C', 2), ('D', 5)],
    'C': [('A', 4), ('B', 2), ('D', 1)],
    'D': [('B', 5), ('C', 1)]
}
print(dijkstra(graph, 'A'))  # {'A': 0, 'B': 1, 'C': 3, 'D': 4}
\`\`\`

**Time: O((V+E) log V)** with min-heap

### Prim's Algorithm (Minimum Spanning Tree)

Build MST by growing from a starting node.

\`\`\`python path=null start=null
import heapq

def prim(graph, start):
    """Returns edges in MST"""
    visited = set([start])
    edges = [(weight, start, neighbor) 
             for neighbor, weight in graph[start]]
    heapq.heapify(edges)
    mst = []
    
    while edges and len(visited) < len(graph):
        weight, u, v = heapq.heappop(edges)
        
        if v in visited:
            continue
            
        visited.add(v)
        mst.append((u, v, weight))
        
        for neighbor, w in graph[v]:
            if neighbor not in visited:
                heapq.heappush(edges, (w, v, neighbor))
    
    return mst
\`\`\`

### Kruskal's Algorithm (Minimum Spanning Tree)

Sort all edges, add if no cycle.

\`\`\`python path=null start=null
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px != py:
            self.parent[px] = py
            return True
        return False

def kruskal(n, edges):
    """
    edges = [(weight, u, v), ...]
    Returns MST edges
    """
    edges.sort()  # Sort by weight
    uf = UnionFind(n)
    mst = []
    
    for weight, u, v in edges:
        if uf.union(u, v):  # If no cycle
            mst.append((u, v, weight))
            if len(mst) == n - 1:
                break
    
    return mst
\`\`\`

**MST Summary:**
- **Prim's:** Grow from one vertex (good for dense graphs)
- **Kruskal's:** Sort edges, use Union-Find (good for sparse graphs)
- Both produce same total weight (optimal MST)

---

## Key Takeaways

| Technique | When to Use | Example |
|:----------|:------------|:--------|
| Recursion | Problem has smaller versions | Factorial, Trees |
| DP | Same subproblems repeat | Fibonacci, Knapsack |
| Greedy | Local best = Global best | Scheduling, Huffman |
| Backtracking | Try all possibilities | Sudoku, N-Queens |
| Dijkstra | Shortest path (weighted) | GPS navigation |
| Prim/Kruskal | Minimum Spanning Tree | Network design |

**Remember:**
- DP = Recursion + Memoization
- Greedy = Fast but doesn't always work
- Backtracking = Exhaustive but systematic
- Dijkstra = Greedy shortest path (non-negative weights)
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "adv-q1",
      question: "What is the base case in Fibonacci recursion?",
      options: [
        "F(0) = 1, F(1) = 1",
        "F(0) = 0, F(1) = 1",
        "F(1) = 1, F(2) = 1",
        "F(n) = F(n-1)",
      ],
      correctAnswer: 1,
      explanation:
        "Fibonacci base cases: F(0) = 0, F(1) = 1. The sequence starts: 0, 1, 1, 2, 3, 5, 8...",
      difficulty: "easy",
    },
    {
      id: "adv-q2",
      question: "Dynamic Programming requires:",
      options: [
        "Random subproblems",
        "Overlapping subproblems",
        "No subproblems",
        "Unique subproblems",
      ],
      correctAnswer: 1,
      explanation:
        "DP needs OVERLAPPING subproblems. Same subproblem solved multiple times. Memoization saves and reuses results.",
      difficulty: "easy",
    },
    {
      id: "adv-q3",
      question: "Greedy algorithms always give optimal solution:",
      options: [
        "True for all problems",
        "False for all problems",
        "Only for specific problems",
        "Never",
      ],
      correctAnswer: 2,
      explanation:
        "Greedy works ONLY for specific problems. Works for: Activity selection, MST. Fails for: 0/1 Knapsack.",
      difficulty: "medium",
    },
    {
      id: "adv-q4",
      question: "Backtracking is best for:",
      options: [
        "Sorting",
        "Searching",
        "Constraint satisfaction problems",
        "Graph traversal",
      ],
      correctAnswer: 2,
      explanation:
        "Backtracking solves constraint problems. Examples: N-Queens, Sudoku, Maze. Try → Check → Undo if invalid.",
      difficulty: "easy",
    },
    {
      id: "adv-q5",
      question: "Memoization is:",
      options: [
        "Sorting technique",
        "Storing computed results",
        "Graph algorithm",
        "Searching method",
      ],
      correctAnswer: 1,
      explanation:
        "Memoization stores computed results to avoid recalculation. Top-down DP approach. Use dictionary to cache.",
      difficulty: "easy",
    },
    {
      id: "adv-q6",
      question: "Dijkstra's algorithm finds:",
      options: [
        "Minimum spanning tree",
        "Shortest path from source",
        "Longest path",
        "All paths",
      ],
      correctAnswer: 1,
      explanation:
        "Dijkstra finds shortest path from source to all vertices. Works for weighted graphs with non-negative edges.",
      difficulty: "easy",
    },
    {
      id: "adv-q7",
      question: "Prim's algorithm is used for:",
      options: [
        "Shortest path",
        "Minimum Spanning Tree",
        "Topological sort",
        "Cycle detection",
      ],
      correctAnswer: 1,
      explanation:
        "Prim's builds Minimum Spanning Tree (MST). Grows tree by adding minimum weight edge from tree to non-tree vertex.",
      difficulty: "easy",
    },
    {
      id: "adv-q8",
      question: "Kruskal's algorithm sorts edges by:",
      options: [
        "Source vertex",
        "Destination vertex",
        "Weight (ascending)",
        "Weight (descending)",
      ],
      correctAnswer: 2,
      explanation:
        "Kruskal sorts edges by weight ascending. Adds edges that don't create cycle. Uses Union-Find for cycle detection.",
      difficulty: "medium",
    },
    {
      id: "adv-q9",
      question: "Time complexity of naive recursive Fibonacci is:",
      options: ["O(n)", "O(log n)", "O(2^n)", "O(n²)"],
      correctAnswer: 2,
      explanation:
        "Naive Fibonacci is O(2^n). Each call branches into two calls. With memoization, becomes O(n).",
      difficulty: "medium",
    },
    {
      id: "adv-q10",
      question: "0/1 Knapsack problem is solved using:",
      options: ["Greedy", "Dynamic Programming", "DFS", "Binary Search"],
      correctAnswer: 1,
      explanation:
        "0/1 Knapsack uses DP. Greedy fails (taking fraction not allowed). DP considers all combinations efficiently.",
      difficulty: "easy",
    },
    {
      id: "adv-q11",
      question:
        "Dijkstra's algorithm uses which data structure for efficiency?",
      options: ["Stack", "Queue", "Priority Queue (Min Heap)", "Array"],
      correctAnswer: 2,
      explanation:
        "Dijkstra uses Priority Queue/Min Heap. Always processes vertex with smallest distance. Achieves O((V+E)log V).",
      difficulty: "medium",
    },
    {
      id: "adv-q12",
      question: "Which is NOT a greedy algorithm?",
      options: [
        "Prim's MST",
        "Kruskal's MST",
        "Dijkstra's shortest path",
        "0/1 Knapsack",
      ],
      correctAnswer: 3,
      explanation:
        "0/1 Knapsack is NOT greedy (requires DP). Prim's, Kruskal's, and Dijkstra's all make locally optimal choices.",
      difficulty: "medium",
    },
  ],
};
