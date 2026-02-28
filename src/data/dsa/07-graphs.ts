import { LearningModule } from "@/types/learning";

export const graphsModule: LearningModule = {
  id: "07-graphs",
  title: "7. Graphs",
  description:
    "Graph Theory - Types, Degree Theorems, Special Graphs, Coloring, BFS & DFS",
  status: "completed",
  tags: ["Data Structure"],
  detailedContent: `# Graph Theory

> **Data Structure Module (CUET PG Lecture 10)** — The mathematics of relationships

---

## What You'll Learn

| # | Topic | Why It Matters |
|:--|:------|:---------------|
| 1 | Graph definition & terminology | Foundation of all graph problems |
| 2 | Directed vs Undirected graphs | In-degree, out-degree, digraphs |
| 3 | Degree theorems | Handshake lemma — exam favourite |
| 4 | Special graphs | Complete, Regular, Cycle, Wheel, N-Cube, Bipartite |
| 5 | Walk, Path, Cycle | Precise definitions that exams test |
| 6 | Graph coloring | Chromatic number — deep equivalence results |
| 7 | Representations | Adjacency list & matrix |
| 8 | BFS & DFS | Traversal algorithms |

---

## 1. What is a Graph?

A graph **G = (V, E)** where:
- **V** → set of vertices (nodes)
- **E** → set of edges (connections between vertices)

\`\`\`text
  Real-world examples:

  Cities ←→ Roads           (undirected, weighted)
  People ←→ Friendships     (undirected)
  Web pages ←→ Hyperlinks   (directed)
  States ←→ Transitions     (directed)

  Example Graph:
       A ─── B
       │     │
       │     │
       C ─── D ─── E

  V = {A, B, C, D, E}
  E = {(A,B), (A,C), (B,D), (C,D), (D,E)}
  |V| = 5,  |E| = 5
\`\`\`

> **Graph theory is mathematics studying relationships.** Every social network, neural network, compiler dependency, and internet routing table is a graph.

---

## 2. Types of Graphs

### Directed vs Undirected

\`\`\`text
  Undirected Graph:              Directed Graph (Digraph):
       A ─── B                        A ───→ B
       │     │                        ↑       │
       │     │                        │       ↓
       C ─── D                        C ←─── D

  Edge (u,v) = Edge (v,u)       Edge (u,v) ≠ Edge (v,u)
  No direction                  u → v is one-way
\`\`\`

### Degree in Undirected Graphs

\`\`\`text
  Degree of a vertex = number of edges connected to it

       A ─── B ─── E
       │     │
       C ─── D

  deg(A) = 2   (edges to B, C)
  deg(B) = 3   (edges to A, D, E)
  deg(C) = 2   (edges to A, D)
  deg(D) = 2   (edges to B, C)
  deg(E) = 1   (edge to B)
\`\`\`

### In-Degree & Out-Degree (Directed Graphs)

\`\`\`text
  In-degree  = number of INCOMING edges
  Out-degree = number of OUTGOING edges

       A ───→ B
       ↑       │
       │       ↓
       C ←─── D

  Vertex │ In-degree │ Out-degree
  ───────┼───────────┼───────────
    A    │     1     │     1        (C→A in, A→B out)
    B    │     1     │     1        (A→B in, B→D out)
    C    │     1     │     1        (D→C in, C→A out)
    D    │     1     │     1        (B→D in, D→C out)
\`\`\`

> **Key theorem:** Sum of in-degrees = Sum of out-degrees = |E| (number of edges)

---

## 3. Degree Theorems (EXAM FAVOURITES!)

### Handshake Lemma (Undirected Graphs)

\`\`\`text
  ┌────────────────────────────────────────────────┐
  │  Sum of degrees of ALL vertices = 2 × |E|     │
  │                                                │
  │       Σ deg(v) = 2|E|                          │
  │                                                │
  │  WHY? Every edge contributes 2 to total        │
  │  degree (one for each endpoint).               │
  └────────────────────────────────────────────────┘

  Example:
       A ─── B ─── E        |E| = 5
       │     │
       C ─── D

  deg(A) + deg(B) + deg(C) + deg(D) + deg(E)
  = 2 + 3 + 2 + 2 + 1
  = 10
  = 2 × 5 ✓
\`\`\`

### Corollary: Odd-Degree Vertices

\`\`\`text
  ┌──────────────────────────────────────────────────┐
  │  The number of ODD-degree vertices is            │
  │  ALWAYS EVEN.                                    │
  │                                                  │
  │  (Because 2E is even, and sum of even-degree     │
  │   vertices is even, so sum of odd-degree         │
  │   vertices must also be even.)                   │
  └──────────────────────────────────────────────────┘

  This means:
  ✗ Impossible: graph with exactly 1 odd-degree vertex
  ✗ Impossible: graph with exactly 3 odd-degree vertices
  ✓ Possible:   graph with 0, 2, 4, 6... odd-degree vertices
\`\`\`

### Directed Graph Theorem

\`\`\`text
  Σ in-degree = Σ out-degree = |E|

  Every directed edge contributes:
    +1 to out-degree of source
    +1 to in-degree of destination
\`\`\`

---

## 4. Graph Classifications

### Simple Graph
No **self-loops**, no **parallel edges** (multiple edges between same pair).

### Multigraph
**Parallel edges** allowed, but no self-loops.

### Pseudograph
Both **self-loops** and **parallel edges** allowed.

\`\`\`text
  Simple:         Multigraph:       Pseudograph:
  A ─── B         A ═══ B          A ═══ B
  │     │         │                │   ╭─╮
  C ─── D         C                C   ╰─╯  ← self-loop

  No loops,       Parallel edges   Loops AND
  no parallels    allowed          parallels allowed
\`\`\`

> **Exam detail:** A self-loop contributes **2** to the degree of that vertex (not 1!).

---

## 5. Special Graphs

### Null Graph (Edgeless Graph)

Only **isolated vertices**, no edges.

\`\`\`text
  A     B     C     D

  |V| = 4,  |E| = 0
  Every vertex has degree 0.
\`\`\`

### Complete Graph Kₙ

**Every vertex** connected to **every other vertex**.

\`\`\`text
  K₃:           K₄:                K₅:
   A               A                  A
  / \\\\           / │ \\\\             / │ X │ \\\\
 B───C         B──┼──C           B──┼─X─┼──C
               │  │  │           │  │ X │  │
               └──D──┘           D──┼───┼──E
                                  \\\\ │   │ /
                                   \\\\│   │/

  ┌─────────────────────────────────────────────┐
  │  Number of edges = n(n − 1) / 2             │
  │  Degree of each vertex = n − 1              │
  │                                             │
  │  K₃: edges = 3(2)/2 = 3                    │
  │  K₄: edges = 4(3)/2 = 6                    │
  │  K₅: edges = 5(4)/2 = 10                   │
  └─────────────────────────────────────────────┘
\`\`\`

### Regular Graph

**All vertices** have the **same degree r**.

\`\`\`text
  r-regular graph on n vertices:

  ┌────────────────────────────────────────────┐
  │  Number of edges = (n × r) / 2            │
  │                                            │
  │  Constraint: n × r must be EVEN            │
  │  (because edges are whole numbers)         │
  └────────────────────────────────────────────┘

  Examples:
  • 0-regular: isolated vertices (null graph)
  • 1-regular: perfect matching
  • 2-regular: disjoint union of cycles
  • (n-1)-regular on n vertices: complete graph Kₙ

  3-regular graph on 4 vertices:
  edges = (4 × 3) / 2 = 6 = K₄ (complete graph!)
\`\`\`

### Cycle Graph Cₙ

Each vertex has **degree 2**. Looks like a polygon.

\`\`\`text
  C₃:       C₄:        C₅:         C₆:
   A        A───B       A───B       A───B
  / \\\\      │   │      / │   \\\\     │     │
 B───C     D───C     E   │    C    F     C
                      \\\\ │   /     │     │
                       D───┘      E───D

  Each vertex: degree = 2
  Edges = n (same as vertices)
  Cₙ is 2-regular

  CHROMATIC NUMBER:
  ┌───────────────────────────────────┐
  │  χ(Cₙ) = 2  if n is EVEN        │
  │  χ(Cₙ) = 3  if n is ODD         │
  │                                   │
  │  Odd cycle breaks 2-coloring!    │
  └───────────────────────────────────┘
\`\`\`

### Wheel Graph Wₙ

Take Cₙ₋₁ + add a **center vertex** connected to all outer vertices.

\`\`\`text
  W₄ (C₃ + center):        W₅ (C₄ + center):
       A                        A───B
      /│\\\\                     / │╲  │
     / │ \\\\                   /  │  ╲│
    B──D──C                 E───D───C
      hub                      hub = D

  Center vertex: degree = n − 1
  Outer vertices: degree = 3
  Edges = 2(n − 1)
\`\`\`

### N-Cube Graph Qₙ (Hypercube)

Vertices = **binary strings of length n**.
Two vertices connected if they differ in **exactly one bit**.

\`\`\`text
  Q₁:  0 ─── 1               (2 vertices, 1 edge)

  Q₂:  00 ── 01              (4 vertices, 4 edges)
        │     │
       10 ── 11

  Q₃:  000──001              (8 vertices, 12 edges)
        │╲    │╲
       010──011 │
        │  100──101
        │╱    │╱
       110──111

  ┌──────────────────────────────────────┐
  │  Qₙ has:                            │
  │  • 2ⁿ vertices                      │
  │  • n × 2⁽ⁿ⁻¹⁾ edges               │
  │  • Each vertex has degree = n       │
  │  (Qₙ is n-regular!)                │
  └──────────────────────────────────────┘

  Q₃: 2³ = 8 vertices, 3 × 2² = 12 edges, degree = 3
\`\`\`

---

## 6. Bipartite Graph

Vertices divided into **two disjoint sets** V₁ and V₂.
Edges **only go between** sets (never within a set).

\`\`\`text
  Bipartite:                  NOT Bipartite:
  V₁ = {A, B}                   A ─── B
  V₂ = {C, D, E}                │     │
                                 C ────┘
  A ─── C                       (triangle = odd cycle!)
  A ─── D
  B ─── D
  B ─── E

  ┌─────────────────────────────────────────────┐
  │  Key property: No ODD-LENGTH cycles!        │
  │                                             │
  │  A graph is bipartite ⟺ it has no odd       │
  │  cycles (this is a theorem!)                │
  │                                             │
  │  Chromatic number: χ = 2                    │
  │  (if graph has at least one edge)           │
  └─────────────────────────────────────────────┘
\`\`\`

### Complete Bipartite Graph Kₘ,ₙ

Every vertex in V₁ connects to **every** vertex in V₂.

\`\`\`text
  K₂,₃:
  V₁: A ──╲──╲── C
       ╲   ╲  ╲
  V₂:  D    E    F

  A connects to D, E, F
  B connects to D, E, F

  ┌──────────────────────────────────────┐
  │  Number of edges = m × n            │
  │                                      │
  │  K₂,₃: edges = 2 × 3 = 6           │
  │  K₃,₃: edges = 3 × 3 = 9           │
  │  K₁,ₙ: edges = n (star graph!)      │
  └──────────────────────────────────────┘
\`\`\`

---

## 7. Walk, Trail, Path, Cycle

These have **precise definitions**. Exams trap people here!

\`\`\`text
  ┌────────────┬──────────────────┬──────────────────┐
  │ Term       │ Vertices repeat? │ Edges repeat?    │
  ├────────────┼──────────────────┼──────────────────┤
  │ Walk       │ YES              │ YES              │
  │ Trail      │ YES              │ NO               │
  │ Path       │ NO               │ NO               │
  │ Cycle      │ Closed path      │ NO               │
  └────────────┴──────────────────┴──────────────────┘

  Example graph:
       A ─── B ─── C
       │           │
       D ─── E ─── F

  Walk:    A → B → C → B → A          (vertices & edges repeat)
  Trail:   A → B → C → F → E → D → A (no edge repeats)
  Path:    A → B → C → F              (no vertex repeats)
  Cycle:   A → B → C → F → E → D → A (closed, no vertex repeats except start=end)
\`\`\`

---

## 8. Subgraphs & Isomorphism

### Subgraph

H is a **subgraph** of G if H's vertices and edges are subsets of G's.

\`\`\`text
  G:                H (subgraph of G):
  A ─── B           A ─── B
  │     │           │
  C ─── D           C

  V(H) ⊆ V(G)  and  E(H) ⊆ E(G)

  Spanning subgraph: includes ALL vertices of G.
  (edges may be a subset)
\`\`\`

### Isomorphic Graphs

Two graphs are **isomorphic** if there exists a **bijection** between vertices that preserves adjacency.

\`\`\`text
  Graph 1:          Graph 2:
  A ─── B           1 ─── 2
  │     │           │     │
  C ─── D           3 ─── 4

  Mapping: A↔1, B↔2, C↔3, D↔4

  Same structure, different labels = ISOMORPHIC
  "Twins wearing different clothes"

  Quick checks (necessary but NOT sufficient):
  • Same number of vertices
  • Same number of edges
  • Same degree sequence
\`\`\`

---

## 9. Cut Vertex (Articulation Point)

A vertex whose removal **disconnects** the graph.

\`\`\`text
       A ─── B ─── C
             │
             D ─── E

  Remove B: A is disconnected from {C, D, E}
  → B is a CUT VERTEX (articulation point)

  Remove D: {A, B, C} disconnected from E
  → D is also a cut vertex

  Remove A: graph stays connected
  → A is NOT a cut vertex
\`\`\`

> Cut vertices are critical in **connectivity analysis** — removing them breaks the network.

---

## 10. Graph Coloring

**Proper coloring:** Adjacent vertices must have **different colors**.

**Chromatic number χ(G):** Minimum number of colors needed.

\`\`\`text
  Example:
       A ─── B           Color assignment:
       │     │           A = Red
       C ─── D           B = Blue
                         C = Blue
  A-B adjacent → different colors ✓      D = Red
  A-C adjacent → different colors ✓
  B-D adjacent → different colors ✓      χ(G) = 2 (two colors suffice)
  C-D adjacent → different colors ✓
\`\`\`

### Key Chromatic Number Results

\`\`\`text
  ┌───────────────────────────────────────────────┐
  │  Graph              │  χ (Chromatic Number)   │
  ├─────────────────────┼─────────────────────────┤
  │  Null graph         │  1                      │
  │  Tree (any tree)    │  2                      │
  │  Bipartite graph    │  2                      │
  │  Complete graph Kₙ  │  n                      │
  │  Cycle Cₙ (even n) │  2                      │
  │  Cycle Cₙ (odd n)  │  3                      │
  │  Wheel Wₙ          │  3 (even n) or 4 (odd n)│
  └───────────────────────────────────────────────┘
\`\`\`

### The Deep Equivalence

\`\`\`text
  ┌──────────────────────────────────────────────────┐
  │  THEOREM: A graph is 2-chromatic (χ = 2)         │
  │           if and only if it is BIPARTITE.         │
  │                                                  │
  │  2-colorable ⟺ bipartite ⟺ no odd cycles        │
  │                                                  │
  │  This links coloring, structure, and cycles       │
  │  into one beautiful equivalence.                  │
  └──────────────────────────────────────────────────┘
\`\`\`

---

## 11. Graph Representation

### Adjacency List (Space: O(V + E))

\`\`\`python path=null start=null
# Using dictionary
graph = {
    'A': ['B', 'C'],      # A connects to B and C
    'B': ['A', 'D'],      # B connects to A and D
    'C': ['A', 'D'],
    'D': ['B', 'C', 'E'],
    'E': ['D']
}

# Check neighbors
print(graph['A'])  # ['B', 'C']

# Check edge exists
print('B' in graph['A'])  # True  — O(degree)
\`\`\`

### Adjacency Matrix (Space: O(V²))

\`\`\`python path=null start=null
# For nodes A=0, B=1, C=2, D=3, E=4
matrix = [
    [0, 1, 1, 0, 0],  # A: connects to B, C
    [1, 0, 0, 1, 0],  # B: connects to A, D
    [1, 0, 0, 1, 0],  # C: connects to A, D
    [0, 1, 1, 0, 1],  # D: connects to B, C, E
    [0, 0, 0, 1, 0]   # E: connects to D
]

# Check edge A-B exists
print(matrix[0][1] == 1)  # True  — O(1)
\`\`\`

| Feature | Adjacency List | Adjacency Matrix |
|:--------|:---------------|:-----------------|
| Space | O(V + E) | O(V²) |
| Edge check | O(degree) | **O(1)** |
| Add edge | O(1) | O(1) |
| Best for | **Sparse graphs** | Dense graphs |

---

## 12. BFS & DFS

### BFS (Breadth-First Search) — Level by Level

Uses a **Queue** (FIFO).

\`\`\`python path=null start=null
from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)

    while queue:
        node = queue.popleft()       # Remove from front
        print(node, end=" ")

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

# Output: A B C D E (level by level)
\`\`\`

### DFS (Depth-First Search) — Go Deep First

Uses a **Stack** (or recursion).

\`\`\`python path=null start=null
def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()

    visited.add(node)
    print(node, end=" ")

    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

# Output: A B D C E (goes deep first)
\`\`\`

### BFS vs DFS

| Feature | BFS | DFS |
|:--------|:----|:----|
| Data structure | Queue | Stack / Recursion |
| Explores | Level by level | Deep first |
| Shortest path (unweighted) | **Yes** | No |
| Memory | More | Less |
| Time complexity | O(V + E) | O(V + E) |
| Use case | Nearest, shortest | All paths, cycles |

---

## Key Takeaways

| Formula / Fact | Value |
|:---------------|:------|
| Handshake lemma | Σ deg(v) = 2|E| |
| Directed graph | Σ in-deg = Σ out-deg = |E| |
| Odd-degree vertices | Count is always EVEN |
| Kₙ edges | n(n−1)/2 |
| Regular graph edges | (n × r) / 2 |
| Kₘ,ₙ edges | m × n |
| Qₙ vertices | 2ⁿ |
| Qₙ edges | n × 2⁽ⁿ⁻¹⁾ |
| Self-loop | Contributes **2** to degree |
| Bipartite ⟺ | No odd cycles ⟺ χ = 2 |

---

## TL;DR - Quick Recall

**One-liner for each concept:**

| Concept | Key Takeaway |
|:--------|:-------------|
| **Graph G=(V,E)** | Vertices + Edges. Directed or Undirected. |
| **Handshake Lemma** | Sum of all degrees = 2 × edges. Odd-degree vertices count is ALWAYS even. |
| **Complete Kₙ** | Every pair connected. Edges = n(n−1)/2. Degree = n−1. |
| **Regular Graph** | All vertices same degree r. Edges = nr/2. |
| **Bipartite** | Two sets, edges only between sets. No odd cycles. χ = 2. |
| **Cycle Cₙ** | χ = 2 (even n), χ = 3 (odd n). Polygon shape. |
| **N-Cube Qₙ** | 2ⁿ vertices, n·2⁽ⁿ⁻¹⁾ edges, n-regular. |
| **Cut Vertex** | Removing it disconnects the graph. Articulation point. |
| **Chromatic Number** | Min colors for proper coloring. Tree=2, Kₙ=n. |
| **BFS** | Queue. Level-by-level. Shortest path in unweighted graphs. |
| **DFS** | Stack/recursion. Go deep. Cycle detection, all paths. |

**The Golden Rules:**
1. A **Tree** is a connected acyclic graph. χ = 2.
2. **Handshake lemma** solves most degree-counting problems instantly.
3. If they ask "is this graph bipartite?" — check for odd cycles.
4. **BFS** = shortest path (unweighted). **DFS** = explore all paths / detect cycles.

---

## Additional Resources

**Video Courses:**
- [Abdul Bari - Graph Theory](https://youtu.be/pcKY4hjDrxk) - University-style deep dive
- [NeetCode - Graphs Introduction](https://youtu.be/cWNEl4HE2OE) - Essential foundation

**Articles & Visualizations:**
- [VisuAlgo - Graph Traversal](https://visualgo.net/en/graphds) - Interactive DFS/BFS

**Practice Problems:**
- LeetCode 200: Number of Islands
- LeetCode 785: Is Graph Bipartite?
- LeetCode 133: Clone Graph
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "graph-q1",
      question:
        "In an undirected graph with 7 edges, what is the sum of degrees of all vertices?",
      options: ["7", "14", "21", "Depends on vertices"],
      correctAnswer: 1,
      explanation:
        "Handshake Lemma: Σ deg(v) = 2|E| = 2 × 7 = 14. Every edge contributes 2 to total degree (one for each endpoint).",
      difficulty: "easy" as const,
    },
    {
      id: "graph-q2",
      question: "How many edges does the complete graph K₆ have?",
      options: ["6", "12", "15", "30"],
      correctAnswer: 2,
      explanation:
        "Kₙ has n(n−1)/2 edges. K₆ = 6(5)/2 = 15 edges. Every vertex connects to every other vertex.",
      difficulty: "easy" as const,
    },
    {
      id: "graph-q3",
      question:
        "A graph has 5 vertices with degrees 2, 3, 3, 4, and x. What is x?",
      options: ["2", "3", "4", "Cannot determine"],
      correctAnswer: 0,
      explanation:
        "Σ degrees = 2|E| must be even. 2+3+3+4+x = 12+x must be even. So x must be even. Also, number of odd-degree vertices must be even. We have two odd (3,3), so x must be even. x = 2 gives sum = 14, meaning 7 edges.",
      difficulty: "medium" as const,
    },
    {
      id: "graph-q4",
      question: "Can a graph have exactly 3 vertices with odd degree?",
      options: [
        "Yes, always possible",
        "No, never possible",
        "Only in directed graphs",
        "Only in multigraphs",
      ],
      correctAnswer: 1,
      explanation:
        "By the Handshake Lemma corollary, the number of odd-degree vertices is always EVEN. So 3 (odd number) is impossible. You can have 0, 2, 4, 6... odd-degree vertices.",
      difficulty: "medium" as const,
    },
    {
      id: "graph-q5",
      question: "What is the chromatic number of C₅ (cycle of length 5)?",
      options: ["1", "2", "3", "5"],
      correctAnswer: 2,
      explanation:
        "Cycle Cₙ: χ = 2 if n is even, χ = 3 if n is odd. C₅ has odd length (5), so χ = 3. Odd cycles cannot be 2-colored.",
      difficulty: "medium" as const,
    },
    {
      id: "graph-q6",
      question: "How many vertices and edges does the hypercube Q₄ have?",
      options: [
        "8 vertices, 16 edges",
        "16 vertices, 32 edges",
        "16 vertices, 24 edges",
        "8 vertices, 12 edges",
      ],
      correctAnswer: 1,
      explanation:
        "Qₙ: vertices = 2ⁿ, edges = n × 2⁽ⁿ⁻¹⁾. Q₄: vertices = 2⁴ = 16, edges = 4 × 2³ = 4 × 8 = 32. Each vertex has degree 4.",
      difficulty: "hard" as const,
    },
    {
      id: "graph-q7",
      question: "A complete bipartite graph K₃,₄ has how many edges?",
      options: ["7", "12", "6", "24"],
      correctAnswer: 1,
      explanation:
        "Kₘ,ₙ has m × n edges. K₃,₄ = 3 × 4 = 12 edges. Every vertex in set 1 connects to every vertex in set 2.",
      difficulty: "easy" as const,
    },
    {
      id: "graph-q8",
      question: "A self-loop at vertex v contributes how much to deg(v)?",
      options: ["0", "1", "2", "Depends on the graph"],
      correctAnswer: 2,
      explanation:
        "A self-loop contributes 2 to the degree (both endpoints are the same vertex). This is a frequently tested exam detail!",
      difficulty: "medium" as const,
    },
    {
      id: "graph-q9",
      question: "A graph is bipartite if and only if:",
      options: [
        "It has no cycles",
        "It has no odd-length cycles",
        "It has no even-length cycles",
        "All vertices have even degree",
      ],
      correctAnswer: 1,
      explanation:
        "A graph is bipartite ⟺ it contains no odd-length cycles. Equivalently, it is 2-colorable (χ = 2). This is one of the deepest equivalences in graph theory.",
      difficulty: "medium" as const,
    },
    {
      id: "graph-q10",
      question:
        "In a 3-regular graph with 8 vertices, how many edges are there?",
      options: ["8", "12", "16", "24"],
      correctAnswer: 1,
      explanation:
        "r-regular graph on n vertices: edges = (n × r) / 2 = (8 × 3) / 2 = 12 edges. Check: n × r = 24 is even ✓.",
      difficulty: "medium" as const,
    },
  ],
};
