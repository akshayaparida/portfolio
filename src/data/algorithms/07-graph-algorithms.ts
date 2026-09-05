import { LearningModule } from "@/types/learning";

export const graphAlgorithmsModule: LearningModule = {
  id: "07-graph-algorithms",
  title: "7. Graph Algorithms & Traversals",
  description:
    "BFS, DFS (edge classification & cycle detection), Topological Sort (Kahn & DFS), Minimum Spanning Trees (Kruskal & Prim), and Shortest Paths (Dijkstra, Bellman-Ford, Floyd-Warshall) across C, C++, and Python",
  status: "completed",
  tags: ["Algorithm", "GATE CS", "UGC NET", "NPTEL"],
  detailedContent: `# Graph Algorithms: Traversals, Spanning Trees & Shortest Paths

> **NPTEL / GATE CS / UGC NET Core Subject**
> Key Exam Questions: DFS Edge Classification (Back Edge $\\iff$ Cycle!), Topological Sort validity conditions (DAG only), Dijkstra vs Bellman-Ford for negative weights, and Kruskal vs Prim MST cut properties.

---

## 1. Prerequisites & What You Should Know

Before analyzing graph algorithms, ensure you understand:
- **Graph Representations**: Adjacency Matrix ($O(V^2)$ space) vs Adjacency List ($O(V + E)$ space).
- **Visited States**: Tracking visited vertices via boolean array or three-color states (White = Unvisited, Gray = Active in recursion stack, Black = Fully processed).
- **FIFO Queues & LIFO Stacks**: BFS uses a FIFO queue; DFS uses a LIFO call stack.
- **Priority Queues (Heaps)**: Used by Prim's and Dijkstra's algorithms for efficient minimum extraction in $O(\\log V)$ time.

---

## 2. Intuition & Real-World Mental Models

\`\`\`
1. Breadth-First Search (BFS): Ripples in a Pond
   - Drop a stone in water: ripples expand outward concentrically.
   - Level 0: Source node
   - Level 1: Immediate neighbors (distance = 1)
   - Level 2: Friends of friends (distance = 2)
   - Guarantees SHORTEST PATH in unweighted graphs!

2. Depth-First Search (DFS): Navigating a Labyrinth
   - Follow one path until you hit a dead end.
   - Unwind your ball of string (backtrack) to the last fork in the road.
   - Try the next unvisited corridor.

3. Topological Sort: College Course Prerequisites
   - CS101 -> Data Structures -> Algorithms -> Machine Learning.
   - You cannot take Machine Learning until its prerequisites are completed.
   - Only possible on Directed Acyclic Graphs (DAGs)!
\`\`\`

---

## 3. Graph Traversals: BFS vs DFS

### 3.1 Breadth-First Search (BFS)
- Traverses level-by-level using a **FIFO Queue**.
- Time Complexity: $\\Theta(V + E)$, Space Complexity: $O(V)$.
- Finds **shortest path** in unweighted graphs.

### 3.2 Depth-First Search (DFS) & Edge Classification
Explores deeply along branches using a **LIFO Stack / Recursion**.
Tracks **Discovery Time $d[u]$** and **Finish Time $f[u]$**.

#### The 4 Edge Types in Directed DFS (GATE Favorite):
\`\`\`
Tree Edge:    u ---------> v (Discovers unvisited vertex v)
Back Edge:    u <--------- v (Points to an active ancestor on call stack -> CYCLE!)
Forward Edge: u ---------> v (Points to an already completed descendant)
Cross Edge:   u ---------> v (Points between unrelated subtrees)
\`\`\`

> [!IMPORTANT]
> **GATE Fundamental Theorem**:
> A directed graph contains a **cycle** IF AND ONLY IF its DFS traversal produces at least one **Back Edge**!
> In terms of timestamps: A directed edge $(u, v)$ is a **Back Edge** if $d[v] < d[u] < f[u] < f[v]$ ($v$ is still active when $u$ is discovered).

---

## 4. Topological Sorting (DAGs Only)

A **Topological Sort** of a directed graph is a linear ordering of its vertices such that for every directed edge $u \\to v$, vertex $u$ comes before $v$ in the ordering.

\`\`\`
Two Standard Approaches:
1. Kahn's Algorithm (BFS with In-Degrees):
   - Compute in-degree for every vertex.
   - Enqueue all vertices with in-degree = 0.
   - While queue not empty: dequeue u, add to topo order, decrement in-degree of all neighbors.
   - If neighbor's in-degree reaches 0, enqueue it.
   - CYCLE DETECTION: If processed nodes < V, graph has a cycle!

2. DFS-Based Topological Sort:
   - Run DFS on all unvisited nodes.
   - As each node FINISHES (f[u]), push it onto a stack.
   - Pop stack from top to bottom -> Valid topological order!
\`\`\`

---

## 5. Minimum Spanning Trees & Shortest Path Comparison

| Problem | Algorithm | Paradigm | Time Complexity | Negative Weights? | Key Data Structure |
|:---|:---|:---|:---|:---|:---|
| **MST** | **Kruskal's** | Greedy (Edge-centric) | $O(E \\log E)$ | N/A (Undirected) | Disjoint Set Union (DSU) |
| **MST** | **Prim's** | Greedy (Vertex-growing) | $O((V + E) \\log V)$| N/A (Undirected) | Min-Heap / Priority Queue |
| **Single-Source SP**| **Dijkstra's** | Greedy (Distance relaxation) | $O((V + E) \\log V)$| **NO** (Greedy fails!) | Min-Heap / Priority Queue |
| **Single-Source SP**| **Bellman-Ford**| DP (Relax all edges $V-1$ times) | $O(V \\cdot E)$ | **YES** (Detects neg cycles) | Edge List array |
| **All-Pairs SP** | **Floyd-Warshall**| DP ($k$-th intermediate vertex) | $O(V^3)$ | **YES** (No neg cycles) | 2D Adjacency Matrix |

### 5.1 Why Dijkstra Fails on Negative Edge Weights
Dijkstra greedily marks a vertex as "visited / finalized" once it is popped from the min-heap, assuming no future path can ever reduce its distance. However, a negative-weight edge downstream can retroactively decrease the total path cost!
*Solution*: Use **Bellman-Ford**, which relaxes all $|E|$ edges $|V|-1$ times. If an edge can still be relaxed on the $|V|$-th pass, a **negative weight cycle** exists!

---

## 6. Real-World Applications

1. **GPS Navigation (Google Maps, Apple Maps)**: Uses bidirectional Dijkstra / A* search with contraction hierarchies to compute driving routes in milliseconds over millions of road intersections.
2. **Build Systems & Package Managers (npm, Cargo, Makefile)**: Constructs a DAG of library dependencies and executes builds via Topological Sort.
3. **Garbage Collection (Java JVM, V8 Engine)**: Mark-and-sweep tracing garbage collectors perform BFS/DFS starting from Root references to discover live reachable objects on the heap.
4. **Internet Routing (BGP & OSPF Protocols)**: The Open Shortest Path First (OSPF) routing protocol runs Dijkstra's algorithm inside every core Internet router.

---

## 7. Implementation in C, C++, and Python with Syntax Logic

### C Implementation (Dijkstra's Algorithm via Adjacency Matrix & Distance Array)

\`\`\`c
#include <stdio.h>
#include <limits.h>
#include <stdbool.h>

/**
 * C Syntax Logic Note:
 * 1. INT_MAX: Represents infinity for initial distance states.
 * 2. Relaxation: If dist[u] != INT_MAX and dist[u] + graph[u][v] < dist[v], update dist[v].
 * 3. O(V^2) implementation: Suitable for dense graphs where E ≈ V^2.
 */

#define V 5

int minDistance(int dist[], bool sptSet[]) {
    int min = INT_MAX, min_index = -1;
    for (int v = 0; v < V; v++) {
        if (!sptSet[v] && dist[v] <= min) {
            min = dist[v];
            min_index = v;
        }
    }
    return min_index;
}

void dijkstra(int graph[V][V], int src) {
    int dist[V];
    bool sptSet[V];

    for (int i = 0; i < V; i++) {
        dist[i] = INT_MAX;
        sptSet[i] = false;
    }

    dist[src] = 0; // Distance to self is 0

    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, sptSet);
        if (u == -1) break;

        sptSet[u] = true;

        for (int v = 0; v < V; v++) {
            // Relaxation condition
            if (!sptSet[v] && graph[u][v] && dist[u] != INT_MAX
                && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
}
\`\`\`

---

### C++ Implementation (Topological Sort: Kahn's In-Degree Algorithm using Queue)

\`\`\`cpp
#include <iostream>
#include <vector>
#include <queue>

/**
 * C++ Syntax Logic Note:
 * 1. Kahn's Algorithm: Computes in-degree for all vertices.
 * 2. Enqueues all vertices with in-degree 0.
 * 3. If processed count < V, the graph has a CYCLE (Topological sort impossible!).
 */

std::vector<int> topologicalSortKahn(int V, const std::vector<std::vector<int>>& adj) {
    std::vector<int> inDegree(V, 0);
    for (int u = 0; u < V; ++u) {
        for (int v : adj[u]) {
            inDegree[v]++;
        }
    }

    std::queue<int> q;
    for (int i = 0; i < V; ++i) {
        if (inDegree[i] == 0) q.push(i);
    }

    std::vector<int> topoOrder;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        topoOrder.push_back(u);

        for (int v : adj[u]) {
            inDegree[v]--;
            if (inDegree[v] == 0) q.push(v);
        }
    }

    if (static_cast<int>(topoOrder.size()) != V) {
        std::cerr << "Graph contains a cycle! No valid topological order.\\n";
        return {};
    }
    return topoOrder;
}
\`\`\`

---

### Python Implementation (Dijkstra's Algorithm using heapq)

\`\`\`python
"""
Python Syntax Logic Note:
1. Min-Heap of Tuples: heapq stores (distance, vertex). heapq sorts by first element (distance).
2. Lazy Deletion: When a shorter distance is found, push new tuple into heap. If popped
   distance > dist[u], simply discard (it's an outdated entry).
3. Adjacency list: Uses Dict[int, List[Tuple[int, int]]] for O(V + E log V) complexity.
"""

import heapq
from typing import Dict, List, Tuple

def dijkstra_heap(V: int, adj: Dict[int, List[Tuple[int, int]]], src: int) -> List[int]:
    """
    Computes single-source shortest path.
    Time Complexity: O((V + E) log V).
    """
    dist = [float('inf')] * V
    dist[src] = 0
    min_heap = [(0, src)] # (distance, node)

    while min_heap:
        d, u = heapq.heappop(min_heap)

        if d > dist[u]:
            continue # Outdated heap entry

        for v, weight in adj.get(u, []):
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(min_heap, (dist[v], v))

    return dist
\`\`\`
`,
};
