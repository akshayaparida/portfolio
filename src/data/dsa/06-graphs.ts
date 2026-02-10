import { LearningModule } from "@/types/learning";

export const graphsModule: LearningModule = {
  id: "06-graphs",
  title: "6. Graphs",
  description: "Network representations - Adjacency List, BFS, DFS",
  status: "in-progress",
  tags: ["Data Structure"],
  detailedContent: `# Graphs

> **Data Structure Module** - Learn network and relationship modeling

---

## What You'll Learn

1. Understand graph terminology (vertex, edge, directed, weighted)
2. Represent graphs using adjacency list and matrix
3. Traverse graphs with BFS and DFS
4. Recognize common graph problems

---

## 1. What is a Graph? (Simple Explanation)

A graph is a collection of **nodes** (vertices) connected by **edges**.

Think of real-world examples:
- **Social network:** People (nodes) connected by friendships (edges)
- **Road map:** Cities (nodes) connected by roads (edges)
- **Internet:** Websites (nodes) connected by links (edges)

\`\`\`
     A --- B
     |     |
     |     |
     C --- D --- E

Nodes: A, B, C, D, E
Edges: A-B, A-C, B-D, C-D, D-E
\`\`\`

---

## 2. Graph Types

### Directed vs Undirected

\`\`\`
Undirected: A --- B  (can go both ways)
Directed:   A --> B  (one way only, like Twitter follow)
\`\`\`

### Weighted vs Unweighted

\`\`\`
Unweighted: A --- B  (just connected)
Weighted:   A --5-- B  (5 = cost/distance)
\`\`\`

---

## 3. Graph Representation

### Adjacency List (Most Common)

Store neighbors for each node:

\`\`\`python path=null start=null
# Using dictionary
graph = {
    'A': ['B', 'C'],      # A connects to B and C
    'B': ['A', 'D'],      # B connects to A and D
    'C': ['A', 'D'],
    'D': ['B', 'C', 'E'],
    'E': ['D']
}

# Check neighbors of A
print(graph['A'])  # ['B', 'C']

# Check if edge exists
print('B' in graph['A'])  # True (A-B exists)
\`\`\`

**Pros:** Memory efficient for sparse graphs (few edges)
**Cons:** Checking if edge exists takes O(degree) time

### Adjacency Matrix

2D array where matrix[i][j] = 1 if edge exists:

\`\`\`python path=null start=null
# For nodes A=0, B=1, C=2, D=3, E=4
#     A  B  C  D  E
matrix = [
    [0, 1, 1, 0, 0],  # A: connects to B, C
    [1, 0, 0, 1, 0],  # B: connects to A, D
    [1, 0, 0, 1, 0],  # C
    [0, 1, 1, 0, 1],  # D
    [0, 0, 0, 1, 0]   # E
]

# Check if A-B edge exists
print(matrix[0][1] == 1)  # True (O(1) lookup!)
\`\`\`

**Pros:** O(1) edge lookup
**Cons:** O(V²) memory even for sparse graphs

---

## 4. BFS (Breadth-First Search)

**Explore level by level** - like ripples in water

Uses a **QUEUE** (FIFO)

\`\`\`python path=null start=null
from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    
    while queue:
        node = queue.popleft()  # Remove from front
        print(node, end=" ")    # Process node
        
        # Add unvisited neighbors to queue
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

# Example
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

bfs(graph, 'A')  # A B C D E F (level by level)
\`\`\`

**Why BFS is useful:**
- Shortest path in UNWEIGHTED graphs
- Level-order traversal
- Finding nearest matches

---

## 5. DFS (Depth-First Search)

**Go as deep as possible first** - like exploring a maze

Uses a **STACK** (or recursion)

\`\`\`python path=null start=null
def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(node)
    print(node, end=" ")  # Process node
    
    # Recursively visit unvisited neighbors
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

dfs(graph, 'A')  # A B D E F C (goes deep first)
\`\`\`

**Why DFS is useful:**
- Detecting cycles
- Finding connected components
- Topological sorting
- Maze solving

---

## 6. BFS vs DFS Comparison

| Feature | BFS | DFS |
|:--------|:----|:----|
| Data structure | Queue | Stack/Recursion |
| Explores | Level by level | Deep first |
| Shortest path | Yes (unweighted) | No |
| Memory | More (stores level) | Less |
| Use case | Nearest, shortest | Paths, cycles |

---

## Key Takeaways

| Representation | Space | Edge Check | Add Edge |
|:---------------|:------|:-----------|:---------|
| Adjacency List | O(V+E) | O(degree) | O(1) |
| Adjacency Matrix | O(V²) | O(1) | O(1) |

**Remember:**
- BFS = Queue = Level by level = Shortest path
- DFS = Stack = Go deep = Explore all paths
- Adjacency List = Good for sparse graphs
- Adjacency Matrix = Good for dense graphs
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "graph-q1",
      question: "Which graph traversal uses a queue?",
      options: ["DFS", "BFS", "Both", "Neither"],
      correctAnswer: 1,
      explanation:
        "BFS uses a Queue (FIFO). Explore level by level. DFS uses Stack or recursion (LIFO).",
      difficulty: "easy",
    },
    {
      id: "graph-q2",
      question:
        "What is the space complexity of adjacency list for a graph with V vertices and E edges?",
      options: ["O(V)", "O(E)", "O(V+E)", "O(V²)"],
      correctAnswer: 2,
      explanation:
        "Adjacency List uses O(V+E) space. V entries plus total E edge references. Matrix uses O(V²).",
      difficulty: "medium",
    },
    {
      id: "graph-q3",
      question:
        "Which algorithm finds the shortest path in an unweighted graph?",
      options: ["DFS", "BFS", "Both equally", "Neither"],
      correctAnswer: 1,
      explanation:
        "BFS finds shortest path in unweighted graphs. First time reaching a node = shortest path. For weighted graphs, use Dijkstra.",
      difficulty: "easy",
    },
    {
      id: "graph-q4",
      question:
        "Time complexity of BFS/DFS for a graph with V vertices and E edges is:",
      options: ["O(V)", "O(E)", "O(V+E)", "O(V×E)"],
      correctAnswer: 2,
      explanation:
        "BFS and DFS are O(V+E). Visit each vertex once (V) and explore each edge once (E).",
      difficulty: "easy",
    },
    {
      id: "graph-q5",
      question: "In a directed graph, if there's an edge from A to B, then:",
      options: [
        "You can go from B to A",
        "You can go from A to B only",
        "You can go both ways",
        "No traversal possible",
      ],
      correctAnswer: 1,
      explanation:
        "Directed edge A→B means one-way only. Like Twitter follow - A follows B doesn't mean B follows A.",
      difficulty: "easy",
    },
    {
      id: "graph-q6",
      question: "Checking if an edge exists between two vertices is O(1) in:",
      options: ["Adjacency List", "Adjacency Matrix", "Both", "Neither"],
      correctAnswer: 1,
      explanation:
        "Adjacency Matrix gives O(1) edge lookup: just check matrix[i][j]. Adjacency List needs O(degree) to search neighbors.",
      difficulty: "easy",
    },
    {
      id: "graph-q7",
      question: "DFS can be implemented using:",
      options: [
        "Queue only",
        "Stack or recursion",
        "Hash table only",
        "Priority queue",
      ],
      correctAnswer: 1,
      explanation:
        "DFS uses Stack or recursion (implicit stack). Go deep first, backtrack when stuck.",
      difficulty: "easy",
    },
    {
      id: "graph-q8",
      question: "A graph with no cycles is called:",
      options: [
        "Complete graph",
        "Acyclic graph",
        "Connected graph",
        "Dense graph",
      ],
      correctAnswer: 1,
      explanation:
        "Acyclic = no cycles. A tree is an acyclic connected graph. DAG = Directed Acyclic Graph.",
      difficulty: "easy",
    },
    {
      id: "graph-q9",
      question:
        "For sparse graphs (few edges), which representation is more memory efficient?",
      options: ["Adjacency Matrix", "Adjacency List", "Both same", "Neither"],
      correctAnswer: 1,
      explanation:
        "Adjacency List uses O(V+E). For sparse graphs E << V². Matrix always uses O(V²) regardless of edges.",
      difficulty: "medium",
    },
    {
      id: "graph-q10",
      question: "Topological sorting is possible only for:",
      options: [
        "Any graph",
        "Directed Acyclic Graphs (DAG)",
        "Undirected graphs",
        "Cyclic graphs",
      ],
      correctAnswer: 1,
      explanation:
        "Topological sort requires DAG (Directed Acyclic Graph). Orders vertices so all edges go one direction. Cycles make this impossible.",
      difficulty: "medium",
    },
  ],
};
