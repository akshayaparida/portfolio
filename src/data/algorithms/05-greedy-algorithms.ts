import { LearningModule } from "@/types/learning";

export const greedyAlgorithmsModule: LearningModule = {
  id: "05-greedy-algorithms",
  title: "5. Greedy Algorithms",
  description:
    "Greedy choice property, optimal substructure, exchange argument proofs, Fractional Knapsack, Activity Selection, Huffman Coding, and Job Sequencing with Deadlines across C, C++, and Python",
  status: "completed",
  tags: ["Algorithm", "GATE CS", "UGC NET", "NPTEL"],
  detailedContent: `# Greedy Algorithmic Paradigm

> **NPTEL / GATE CS / UGC NET Core Subject**
> Key Exam Questions: Fractional Knapsack value/weight ratio sorting, Activity Selection finish-time sorting (and counterexamples for start-time/duration), Huffman tree prefix code length derivation, and the Exchange Argument proof technique.

---

## 1. Prerequisites & What You Should Know

Before studying greedy algorithms, ensure you understand:
- **Optimization Problems**: Problems where we seek to maximize (profit, activities, bandwidth) or minimize (cost, latency, weight).
- **Sorting as a Preprocessing Step**: Almost all greedy algorithms begin with sorting by a specific metric ($O(n \\log n)$).
- **Priority Queues / Heaps**: Used to dynamically extract the locally optimal choice in $O(\\log n)$ time.
- **Local vs Global Optima**: Understanding why picking the best immediate step does not always guarantee the best overall final outcome.

---

## 2. Conceptual Intuition: The Cashier & When Greedy Fails

\`\`\`
The Cashier Analogy (US Currency: 25c, 10c, 5c, 1c):
Goal: Give 43c using the fewest coins possible.
1. Take largest coin <= 43c:  Take 25c (Remainder: 18c)
2. Take largest coin <= 18c:  Take 10c (Remainder: 8c)
3. Take largest coin <= 8c:   Take 5c  (Remainder: 3c)
4. Take largest coin <= 3c:   Take 1c, 1c, 1c
Total Coins = 1 + 1 + 1 + 3 = 6 coins. (Globally Optimal!)

WHEN GREEDY FAILS (Custom Currency: 25c, 20c, 10c, 5c, 1c):
Goal: Give 40c change.
Greedy Choice: Takes 25c -> Remainder 15c -> Takes 10c -> Remainder 5c -> Takes 5c.
Total: 25 + 10 + 5 = 3 coins.

Optimal Non-Greedy Choice:
Takes 20c + 20c = 2 COINS!
Greedy made a short-sighted choice (25c) that locked it out of the global optimum (two 20c coins).
\`\`\`

> [!IMPORTANT]
> Because greedy algorithms are "myopic" (short-sighted), **every greedy algorithm requires a formal mathematical proof of correctness** (usually via an Exchange Argument) before you can trust it!

---

## 3. The Two Pillars of Greedy Algorithms

An optimization problem can be solved correctly by a Greedy algorithm if and only if it exhibits:

1. **Greedy-Choice Property**:
   A globally optimal solution can be assembled by making a series of locally optimal (greedy) choices without ever reconsidering or backtracking on prior decisions.
2. **Optimal Substructure**:
   An optimal solution to the original problem contains within it optimal solutions to its subproblems. If you strip away the first greedy choice, the remaining choices must form an optimal solution to the remaining subproblem.

### Greedy vs Dynamic Programming (DP) vs Divide and Conquer

| Paradigm | Choice Strategy | Subproblem Overlap | Backtracking / Memory |
|:---|:---|:---|:---|
| **Greedy** | Makes best immediate choice **before** solving subproblems | None; only 1 active branch | **No backtracking**; $O(1)$ state memory |
| **Dynamic Programming** | Explores choices, evaluates subproblem values **after** solving | Extensive overlapping subproblems | Caches all subproblems in table ($O(n)$ or $O(n^2)$) |
| **Divide & Conquer** | Breaks into independent subproblems | Subproblems are disjoint | Combines independent recursion branches |

---

## 4. The Exchange Argument: How to Prove Greedy Correctness

In GATE / academic exams, you must be able to prove why a greedy strategy is optimal:
1. Let $G = \\{g_1, g_2, \\dots, g_k\\}$ be the greedy solution.
2. Assume an arbitrary optimal solution $OPT = \\{o_1, o_2, \\dots, o_m\\}$ exists.
3. If $G = OPT$, the proof is complete.
4. If $G \\ne OPT$, find the first position $i$ where $g_i \\ne o_i$.
5. **The Exchange Step**: Show that swapping $o_i$ with $g_i$ in $OPT$ produces a new solution $OPT'$ that is:
   - Valid (satisfies all constraints).
   - At least as good as $OPT$ (cost $\\le$ or value $\\ge$).
6. By induction, we can transform $OPT$ into $G$ without degrading quality. Therefore, $G$ is optimal!

---

## 5. Classical Greedy Problems Deconstructed

### 5.1 Fractional Knapsack ($O(n \\log n)$) vs 0/1 Knapsack (DP)
- **Problem**: Given capacity $W$, and $n$ items with value $v_i$ and weight $w_i$.
- **Greedy Strategy**: Sort items by **density / ratio** $r_i = \\frac{v_i}{w_i}$ in descending order. Take as much of the highest-density item as fits; take a fraction if it overflows.
- **Why 0/1 Knapsack Fails Greedily**: When items cannot be broken into fractions, taking a high-ratio item might leave empty space that cannot be filled, whereas two lower-ratio items might fill the knapsack completely with higher total value.

### 5.2 Activity Selection / Interval Scheduling
- **Goal**: Select maximum number of mutually compatible non-overlapping activities.
- **Greedy Metric**: Always pick the activity that **finishes earliest** ($f_i$)!
- **Why NOT Shortest Duration?** Counterexample: Activity A ($[1, 9]$), B ($[8, 11]$), C ($[10, 20]$). Shortest duration B ($length=3$) blocks both A and C, yielding only 1 activity instead of 2 ($\\{A, C\\}$).
- **Why NOT Earliest Start Time?** An activity starting at time 1 could run until time 1000, blocking 50 other activities.

### 5.3 Huffman Coding (Lossless Data Compression)
Lossless prefix-free coding algorithm:
- Characters with high frequencies receive short binary bitstrings; rare characters receive long bitstrings.
- **Prefix Property**: No character's bitcode is a prefix of another's (e.g. if 'A' is \`0\`, no other code starts with \`0\`).
- Constructed using a **Min-Heap**: repeatedly extract the two lowest-frequency trees, combine them with a dummy parent, and insert back into the heap.

\`\`\`
Example Frequencies: A: 45, B: 13, C: 12, D: 16, E: 9, F: 5
Resulting Huffman Tree:
                  [100]
                 /     \\
             0 /         \\ 1
             A (45)      [55]
                        /    \\
                    0 /        \\ 1
                   [25]        [30]
                  /    \\      /    \\
                0/     1\\   0/     1\\
              C(12)   B(13) D(16)   [14]
                                   /    \\
                                 0/     1\\
                                F(5)    E(9)

Code for A = "0" (1 bit!)
Code for F = "1100" (4 bits)
\`\`\`

---

## 6. Real-World Applications

1. **Network Routing (Dijkstra's Algorithm)**: Greedily selects the unvisited router node with the smallest known tentative distance to guarantee shortest path routing in Internet OSPF protocols.
2. **Telecommunications (Minimum Spanning Trees - Kruskal & Prim)**: Connecting $n$ cities with fiber-optic cables using the minimum total trenching distance.
3. **Data Compression (GZIP, JPEG, MP3)**: All employ Huffman coding during their entropy-encoding final phase.
4. **Operating System Scheduling (Shortest Job First - SJF)**: Greedily scheduling the CPU job with the shortest execution time provably minimizes average waiting time across all processes.

---

## 7. Implementation in C, C++, and Python with Syntax Logic

### C Implementation (Fractional Knapsack with Ratio Sorting via qsort)

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

/**
 * C Syntax Logic Note:
 * 1. qsort() comparator: In C, qsort takes an int (*)(const void*, const void*).
 *    To sort descending by ratio, we compare (double) ratioB - ratioA.
 * 2. Fractional taking: (double)remain / items[i].weight calculates fractional value.
 * 3. Struct alignment: Packing value and weight into an Item structure maintains
 *    cache locality when iterating through sorted items.
 */

typedef struct {
    int value;
    int weight;
} Item;

int compareItems(const void* a, const void* b) {
    Item* itemA = (Item*)a;
    Item* itemB = (Item*)b;
    double r1 = (double)itemA->value / itemA->weight;
    double r2 = (double)itemB->value / itemB->weight;

    if (r2 > r1) return 1;
    if (r2 < r1) return -1;
    return 0;
}

double fractionalKnapsack(int capacity, Item items[], int n) {
    // Sort items by value/weight ratio descending
    qsort(items, n, sizeof(Item), compareItems);

    double totalValue = 0.0;
    int curWeight = 0;

    for (int i = 0; i < n; i++) {
        if (curWeight + items[i].weight <= capacity) {
            // Take whole item
            curWeight += items[i].weight;
            totalValue += items[i].value;
        } else {
            // Take fraction of remaining capacity
            int remain = capacity - curWeight;
            totalValue += items[i].value * ((double)remain / items[i].weight);
            break; // Knapsack full!
        }
    }
    return totalValue;
}
\`\`\`

---

### C++ Implementation (Activity Selection with std::sort & Lambdas)

\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>

/**
 * C++ Syntax Logic Note:
 * 1. Lambda Expressions: [](const Activity& a, const Activity& b) { return a.finish < b.finish; }
 *    provides an inline, zero-cost comparator for std::sort.
 * 2. Pass by reference: std::vector<Activity>& acts modifies in place without copy overhead.
 */

struct Activity {
    int start;
    int finish;
};

int maxActivities(std::vector<Activity>& acts) {
    if (acts.empty()) return 0;

    // Greedy Choice: Sort by finish time ascending
    std::sort(acts.begin(), acts.end(), [](const Activity& a, const Activity& b) {
        return a.finish < b.finish;
    });

    int count = 1;
    int lastFinish = acts[0].finish;

    for (size_t i = 1; i < acts.size(); ++i) {
        // If start time is greater than or equal to last activity's finish
        if (acts[i].start >= lastFinish) {
            count++;
            lastFinish = acts[i].finish;
        }
    }
    return count;
}
\`\`\`

---

### Python Implementation (Huffman Coding using heapq)

\`\`\`python
"""
Python Syntax Logic Note:
1. heapq with custom class: Defining __lt__ allows heapq to compare nodes
   based solely on frequency.
2. Prefix code tree generation: Recursive depth-first traversal appends
   '0' for left edge, '1' for right edge.
"""

import heapq
from typing import Dict

class HuffmanNode:
    def __init__(self, char: str, freq: int):
        self.char = char
        self.freq = freq
        self.left = None
        self.right = None

    def __lt__(self, other):
        return self.freq < other.freq

def build_huffman_codes(frequencies: Dict[str, int]) -> Dict[str, str]:
    """
    Builds optimal variable-length prefix codes.
    Time Complexity: O(n log n).
    """
    heap = [HuffmanNode(char, freq) for char, freq in frequencies.items()]
    heapq.heapify(heap)

    # Combine two lowest frequency trees iteratively
    while len(heap) > 1:
        left = heapq.heappop(heap)
        right = heapq.heappop(heap)

        parent = HuffmanNode(None, left.freq + right.freq)
        parent.left = left
        parent.right = right
        heapq.heappush(heap, parent)

    root = heap[0]
    codes = {}

    def generate_codes(node, current_code):
        if not node:
            return
        if node.char is not None:
            codes[node.char] = current_code
            return
        generate_codes(node.left, current_code + "0")
        generate_codes(node.right, current_code + "1")

    generate_codes(root, "")
    return codes
\`\`\`
`,
};
