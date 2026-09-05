import { LearningModule } from "@/types/learning";

export const graphsRepresentationModule: LearningModule = {
  id: "09-graphs-representation",
  title: "9. Graph Representations & Memory Layout",
  description:
    "Adjacency Matrix vs Adjacency List, sparse vs dense trade-offs, Handshaking Lemma, and degree calculations in C, C++, and Python",
  status: "completed",
  tags: ["Data Structure", "GATE CS", "UGC NET", "NPTEL"],
  detailedContent: `# Graph Representations & Memory Layouts

> **NPTEL / GATE CS / UGC NET Core Subject**
> Key Exam Questions: Space complexity comparison ($O(V^2)$ vs $O(V + E)$), Handshaking Lemma calculation, and detecting edge existence in $O(1)$.

---

## 1. Prerequisites & What You Should Know

Before studying graphs, ensure you understand:
- **Arrays & 2D Arrays**: Adjacency matrix is a 2D array.
- **Linked Lists**: Adjacency list uses linked lists (or dynamic arrays).
- **Sets & Dictionaries**: Python graphs often use \`defaultdict\` or sets.
- **Basic Discrete Math**: Vertices, edges, paths, cycles.

---

## 2. What is a Graph? (Conceptual Explanation)

### 2.1 The Social Network Analogy

Think of a **social network** like Instagram or LinkedIn:
- **People** are **vertices** (nodes).
- **Friendships / Connections** are **edges**.
- If friendship is mutual (both follow each other) → **Undirected graph**.
- If one person follows another without reciprocation → **Directed graph**.

\`\`\`
Social Network as a Graph:

Undirected:                Directed:
  Alice ——— Bob              Alice → Bob
   |  \\    |                  ↑       ↓
   |   Charlie                Charlie ← Dan
   |  /    |
   Dan ——— Eve
\`\`\`

### 2.2 Graph Terminology (Essential Vocabulary)

\`\`\`
Graph G = (V, E) where V = {vertices}, E = {edges}

       A ——— B        V = {A, B, C, D, E}
      / \\   |         E = {(A,B), (A,C), (A,D), (B,E), (C,D)}
     C   D  |         
          \\ |         Degree of A = 3 (connected to B, C, D)
            E         Degree of E = 2 (connected to B, D)
\`\`\`

| Term | Definition |
|:---|:---|
| **Vertex (Node)** | A point/entity in the graph |
| **Edge** | A connection between two vertices |
| **Degree** | Number of edges connected to a vertex |
| **Path** | A sequence of edges connecting two vertices |
| **Cycle** | A path that starts and ends at the same vertex |
| **Connected Graph** | Every vertex can reach every other vertex |
| **Weighted Graph** | Edges have associated costs/distances |
| **DAG** | Directed Acyclic Graph (no directed cycles) |

---

## 3. Why Do We Need Graphs?

Graphs model **relationships** between entities — the most general data structure:

| Application | Vertices | Edges |
|:---|:---|:---|
| **Social Networks** | People | Friendships/Follows |
| **Road Maps (GPS)** | Intersections | Roads |
| **Internet** | Routers/Servers | Connections |
| **Dependencies** | Tasks/Packages | "Depends on" |
| **Web Pages (Google)** | Pages | Hyperlinks |
| **Neural Networks** | Neurons | Synapses |
| **Airline Routes** | Cities | Flights |

> [!NOTE]
> Arrays, linked lists, trees, and graphs form a hierarchy:
> **Array** → special case of **Linked List** → special case of **Tree** → special case of **Graph**.
> A tree is a connected acyclic graph. A linked list is a tree with one child per node.

---

## 4. How to Store a Graph in Memory?

### 4.1 Adjacency Matrix

A 2D array where \`matrix[i][j] = 1\` if edge $(i,j)$ exists, else \`0\`:

\`\`\`
Graph:          Adjacency Matrix:
  0 — 1           0  1  2  3
  | \\ |        0 [ 0  1  1  1 ]
  2   3        1 [ 1  0  0  1 ]
               2 [ 1  0  0  0 ]
               3 [ 1  1  0  0 ]

Edge (0,1) exists? → matrix[0][1] = 1  ✓  O(1) lookup!
All neighbors of 0? → scan row 0: [0,1,1,1] → neighbors are 1,2,3  O(V) scan
\`\`\`

### 4.2 Adjacency List

Each vertex stores a list of its neighbors:

\`\`\`
Same Graph:     Adjacency List:
  0 — 1         0: [1, 2, 3]
  | \\ |         1: [0, 3]
  2   3         2: [0]
                3: [0, 1]

All neighbors of 0? → list[0] = [1, 2, 3]  O(deg(0)) = O(3) — fast!
Edge (0,1) exists? → search list[0] for 1  O(deg(0)) — slower than matrix
\`\`\`

### 4.3 Head-to-Head Comparison

| Feature | Adjacency Matrix | Adjacency List |
|:---|:---|:---|
| **Storage Structure** | 2D Array $V \\times V$ | Array of $V$ Linked Lists / Dynamic Arrays |
| **Space Complexity** | $\\Theta(V^2)$ | $\\Theta(V + E)$ |
| **Edge Existence Query $(u, v)$** | $O(1)$ | $O(\\text{deg}(u))$ |
| **Finding all Neighbors of $u$** | $\\Theta(V)$ | $\\Theta(\\text{deg}(u))$ |
| **Best Used When** | **Dense Graph** ($E \\approx V^2$) | **Sparse Graph** ($E \\ll V^2$) |
| **Adding an Edge** | $O(1)$ | $O(1)$ |
| **Deleting an Edge** | $O(1)$ | $O(\\text{deg}(u))$ |

### When to Use Which?

- **Adjacency Matrix**: Dense graphs (social networks where everyone knows everyone), or when you need $O(1)$ edge-existence checks frequently.
- **Adjacency List**: Sparse graphs (road networks — each intersection connects to ~4 roads, not 10,000), which is the vast majority of real-world graphs.

> [!IMPORTANT]
> **GATE Tip**: Most graph algorithms (BFS, DFS, Dijkstra, Prim) work on adjacency lists because they iterate over neighbors, which is $O(\\text{deg}(u))$ instead of $O(V)$.

---

## 5. The Handshaking Lemma (GATE Favorite)

### Euler's First Theorem
For any undirected graph $G = (V, E)$:
$$\\sum_{v \\in V} \\text{deg}(v) = 2 |E|$$

**Intuition**: Every edge contributes to the degree of exactly 2 vertices.

**Corollary**: The number of vertices with **odd degree** must be **even**!

### For Directed Graphs
$$\\sum_{v \\in V} \\text{in-deg}(v) = \\sum_{v \\in V} \\text{out-deg}(v) = |E|$$

#### Worked Example
> **Q**: An undirected graph has 6 vertices with degrees 2, 3, 3, 4, 4, 2. How many edges?
> **A**: $\\sum \\text{deg} = 2+3+3+4+4+2 = 18$. Edges $= 18/2 = \\mathbf{9}$.

---

## 6. Implementation in C, C++, and Python with Syntax Logic

### C Implementation (Adjacency List using Array of Pointer Chains)

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

/**
 * C Syntax Logic Note:
 * 1. Array of Heads: "AdjList* array" contains V pointers, where array[i].head
 *    points to the first neighbor of vertex i.
 * 2. Unweighted Graph: If undirected, edge (u, v) is added twice: once to u's list,
 *    once to v's list.
 */

typedef struct AdjListNode {
    int dest;
    struct AdjListNode* next;
} AdjListNode;

typedef struct {
    int V;
    AdjListNode** adjLists; // Array of pointers to linked list heads
} Graph;

Graph* createGraph(int V) {
    Graph* g = (Graph*)malloc(sizeof(Graph));
    g->V = V;
    g->adjLists = (AdjListNode**)malloc(V * sizeof(AdjListNode*));
    for (int i = 0; i < V; i++) {
        g->adjLists[i] = NULL;
    }
    return g;
}

void addEdge(Graph* g, int src, int dest) {
    // Add edge src -> dest
    AdjListNode* newNode = (AdjListNode*)malloc(sizeof(AdjListNode));
    newNode->dest = dest;
    newNode->next = g->adjLists[src];
    g->adjLists[src] = newNode;

    // For undirected graph, add dest -> src
    newNode = (AdjListNode*)malloc(sizeof(AdjListNode));
    newNode->dest = src;
    newNode->next = g->adjLists[dest];
    g->adjLists[dest] = newNode;
}
\`\`\`

---

### C++ Implementation (vector of vectors: vector<vector<int>>)

\`\`\`cpp
#include <iostream>
#include <vector>

/**
 * C++ Syntax Logic Note:
 * 1. std::vector<std::vector<int>>: 2D dynamic vector provides cache-friendly
 *    contiguous rows while maintaining variable-length neighbor lists.
 * 2. const auto&: Range-based for loop avoiding deep copies.
 */

class Graph {
private:
    int V;
    std::vector<std::vector<int>> adj;

public:
    Graph(int vertices) : V(vertices), adj(vertices) {}

    void addEdge(int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u); // Undirected
    }

    void printNeighbors(int u) const {
        std::cout << "Neighbors of " << u << ": ";
        for (const auto& neighbor : adj[u]) {
            std::cout << neighbor << " ";
        }
        std::cout << "\\n";
    }
};
\`\`\`

---

### Python Implementation (collections.defaultdict for Expressive Graphs)

\`\`\`python
"""
Python Syntax Logic Note:
1. collections.defaultdict(list): Automatically initializes a new empty list []
   whenever an unseen vertex key is accessed, avoiding tedious "if u not in adj" checks!
"""

from collections import defaultdict

class Graph:
    def __init__(self):
        self.adj = defaultdict(list)

    def add_edge(self, u: int, v: int, bidirectional: bool = True):
        self.adj[u].append(v)
        if bidirectional:
            self.adj[v].append(u)

    def get_neighbors(self, u: int) -> list[int]:
        return self.adj[u]
\`\`\`

---

## 7. GATE & UGC NET Key Exam Insights

> [!WARNING]
> **GATE Trap: Complete Graph Edge Count**
> A complete graph $K_n$ has $\\binom{n}{2} = \\frac{n(n-1)}{2}$ edges.
> For $K_5$: $\\frac{5 \\times 4}{2} = 10$ edges.
> For $K_{10}$: $\\frac{10 \\times 9}{2} = 45$ edges.

> [!NOTE]
> **Tree Properties (GATE Standard)**
> A tree with $n$ vertices always has exactly $n-1$ edges.
> A connected graph with $n$ vertices and $n-1$ edges is necessarily a tree.
`,
};
