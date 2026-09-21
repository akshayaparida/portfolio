import { LearningModule } from "@/types/learning";

export const advancedDsModule: LearningModule = {
  id: "10-advanced-ds",
  title: "10. Disjoint Sets (DSU) & Tries",
  description:
    "Disjoint Set Union (DSU) with Path Compression and Union by Rank, Inverse Ackermann complexity α(n), and Trie prefix trees in C, C++, and Python",
  status: "completed",
  tags: ["Data Structure", "GATE CS", "UGC NET", "NPTEL"],
  detailedContent: `# Disjoint Set Union (DSU) & Trie Data Structures

> **NPTEL / GATE CS / UGC NET Advanced Subject**
> Key Exam Questions: Inverse Ackermann function $\\alpha(n) \\le 4$, Cycle detection in undirected graphs, Kruskal's MST support, and Trie space/time complexity.

---

## 1. Prerequisites & What You Should Know

Before studying these advanced data structures, ensure you understand:
- **Trees & Forests**: DSU internally maintains a forest of trees.
- **Graphs (Module 9)**: DSU is used in graph algorithms (Kruskal's MST, cycle detection).
- **Strings & Character Arrays**: Tries store strings character by character.
- **Hash Tables (Module 8)**: Tries can be compared to hash-based dictionary lookups.

---

## 2. What is Disjoint Set Union (DSU)? (Conceptual Explanation)

### 2.1 The Friend Groups Analogy

Imagine a classroom where students form **friend groups**:
- Initially, every student is their own group (no friendships yet).
- When Alice befriends Bob, their groups **merge** into one.
- To check if Alice and Charlie are friends (transitively), you ask: "Are they in the same group?"

\`\`\`
Initial state (everyone is alone):
{A}  {B}  {C}  {D}  {E}

Union(A, B):  {A, B}  {C}  {D}  {E}
Union(C, D):  {A, B}  {C, D}  {E}
Union(A, C):  {A, B, C, D}  {E}

Find(B) == Find(D)?  → Both return same root → YES, same group!
Find(B) == Find(E)?  → Different roots → NO, different groups!
\`\`\`

### 2.2 The Two Operations

| Operation | Description | Naive Time | Optimized Time |
|:---|:---|:---|:---|
| **Find(x)** | Return the root/representative of x's group | $O(n)$ worst | $O(\\alpha(n)) \\approx O(1)$ |
| **Union(x, y)** | Merge the groups containing x and y | $O(n)$ worst | $O(\\alpha(n)) \\approx O(1)$ |

---

## 3. Why Do We Need DSU?

1. **Kruskal's MST Algorithm**: Check if adding an edge creates a cycle. If \`Find(u) == Find(v)\`, the edge would create a cycle — skip it!
2. **Connected Components**: Dynamically track how many connected components exist as edges are added.
3. **Network Connectivity**: Check if two computers can communicate through a network.
4. **Image Processing**: Labeling connected regions in binary images.
5. **Equivalence Classes**: In compilers, DSU tracks which variables are equivalent.

---

## 4. How DSU Works Internally

### 4.1 Without Optimizations (Naive)

\`\`\`
parent[] array where parent[i] = parent of node i:

Initial: parent = [0, 1, 2, 3, 4]  (every node is its own parent)

Union(0, 1): Make 1's parent = 0
  parent = [0, 0, 2, 3, 4]
  Tree:  0←1  2  3  4

Union(2, 3): Make 3's parent = 2
  parent = [0, 0, 2, 2, 4]
  Tree:  0←1  2←3  4

Union(0, 2): Make 2's parent = 0
  parent = [0, 0, 0, 2, 4]
  Tree:    0
          / \\
         1   2
             |
             3

Find(3): 3→2→0 (took 2 hops)
\`\`\`

### 4.2 Path Compression (The Magic Optimization)

During \`Find(x)\`, make every node on the path point directly to the root:

\`\`\`
Before Path Compression:       After Find(3) with Path Compression:
    0                               0
   / \\                           / | \\ \\
  1   2                         1  2  3  4
      |
      3
      |
      4

Find(4): Traverses 4→3→2→0 (root found!)
Then sets: parent[4]=0, parent[3]=0, parent[2]=0
Next time Find(4) is called: 4→0 (just 1 hop!)
\`\`\`

### 4.3 Union by Rank

Always attach the **shallower** tree under the **deeper** tree's root:

\`\`\`
Union by Rank Example:

Tree A (rank 2):    Tree B (rank 1):
    A                   D
   / \\                  |
  B   C                 E

Union(A, D): rank(A)=2 > rank(D)=1, so D goes under A:
      A
    / | \\
   B  C  D
         |
         E

If ranks were equal, either can be root, and winner's rank increases by 1.
\`\`\`

### 4.4 Combined Complexity

With **both** Path Compression AND Union by Rank:
$$\\text{Amortized Time per Operation} = O(\\alpha(n))$$

Where $\\alpha(n)$ is the **Inverse Ackermann Function** — grows so incredibly slowly that for any practical input ($n < 10^{80}$, the number of atoms in the universe), $\\alpha(n) \\le 4$. **Effectively constant time!**

---

## 5. What is a Trie? (Conceptual Explanation)

### 5.1 The Autocomplete / Dictionary Analogy

When you type "prog" into Google search, it instantly suggests "program", "programming", "progress". How? A **Trie** (prefix tree)!

\`\`\`
Trie storing: "cat", "car", "card", "care", "dog"

         (root)
        /      \\
       c        d
       |        |
       a        o
      / \\       |
     t   r      g*
     *  / \\
       d   e
       *   *

* marks end of a complete word

Search "car": c→a→r → Found path, and 'r' is end-of-word → YES!
Search "ca":  c→a    → Found path, but 'a' is NOT end-of-word → NO!
Prefix "car": c→a→r  → Path exists → all words with prefix "car": car, card, care
\`\`\`

### 5.2 Why Tries Instead of Hash Tables?

| Feature | Hash Table | Trie |
|:---|:---|:---|
| **Exact Search** | $O(L)$ average | $O(L)$ guaranteed |
| **Prefix Search** | Inefficient ($O(N \\cdot L)$) | $O(L)$ to find all with prefix |
| **Autocomplete** | Requires full table scan | Natural — traverse subtree |
| **Sorted Order** | No ordering | DFS gives lexicographic order |
| **Space** | Compact per key | Can be large (26 pointers per node) |

### 5.3 Real-World Applications

1. **Autocomplete**: Google search, IDE code completion.
2. **Spell Checkers**: Check if a word exists in the dictionary.
3. **IP Routing**: Longest prefix match in routers.
4. **T9 Predictive Text**: Old phone keyboards.
5. **DNA Sequence Matching**: Searching genomic databases.

---

## 6. Implementation in C, C++, and Python with Syntax Logic

### C Implementation (DSU with Path Compression & Union by Rank)

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

/**
 * C Syntax Logic Note:
 * 1. Flat arrays parent[] and rank[] represent the disjoint forest.
 * 2. Path Compression idiom: parent[i] = find(parent[i]) flattens the tree
 *    during recursion unwind.
 */

typedef struct {
    int* parent;
    int* rank;
    int n;
} DSU;

DSU* createDSU(int n) {
    DSU* dsu = (DSU*)malloc(sizeof(DSU));
    dsu->n = n;
    dsu->parent = (int*)malloc(n * sizeof(int));
    dsu->rank = (int*)malloc(n * sizeof(int));

    for (int i = 0; i < n; i++) {
        dsu->parent[i] = i; // Every element is its own parent initially
        dsu->rank[i] = 0;   // Initial rank is 0
    }
    return dsu;
}

// Find with Path Compression: O(α(n))
int findDSU(DSU* dsu, int i) {
    if (dsu->parent[i] == i)
        return i;
    // Recursively point i directly to its root!
    return dsu->parent[i] = findDSU(dsu, dsu->parent[i]);
}

// Union by Rank: Attaches shallower tree under deeper tree
void unionDSU(DSU* dsu, int x, int y) {
    int rootX = findDSU(dsu, x);
    int rootY = findDSU(dsu, y);

    if (rootX != rootY) {
        if (dsu->rank[rootX] < dsu->rank[rootY]) {
            dsu->parent[rootX] = rootY;
        } else if (dsu->rank[rootX] > dsu->rank[rootY]) {
            dsu->parent[rootY] = rootX;
        } else {
            dsu->parent[rootY] = rootX;
            dsu->rank[rootX]++; // Rank increases only when merging equal rank trees
        }
    }
}
\`\`\`

---

### C++ Implementation (Trie Node Class & Insertion/Search)

\`\`\`cpp
#include <iostream>
#include <string>
#include <vector>

/**
 * C++ Syntax Logic Note:
 * 1. std::vector<TrieNode*> children: Size 26 for 'a' through 'z'.
 * 2. Index calculation: char - 'a' maps ASCII 'a'..'z' to 0..25.
 */

class Trie {
private:
    struct TrieNode {
        std::vector<TrieNode*> children;
        bool isEndOfWord;
        TrieNode() : children(26, nullptr), isEndOfWord(false) {}
    };
    TrieNode* root;

public:
    Trie() : root(new TrieNode()) {}

    // Insert word: O(L) time where L is word length
    void insert(const std::string& word) {
        TrieNode* curr = root;
        for (char ch : word) {
            int idx = ch - 'a';
            if (!curr->children[idx]) {
                curr->children[idx] = new TrieNode();
            }
            curr = curr->children[idx];
        }
        curr->isEndOfWord = true;
    }

    // Search exact word: O(L)
    bool search(const std::string& word) const {
        TrieNode* curr = root;
        for (char ch : word) {
            int idx = ch - 'a';
            if (!curr->children[idx]) return false;
            curr = curr->children[idx];
        }
        return curr->isEndOfWord;
    }

    // StartsWith prefix query: O(L)
    bool startsWith(const std::string& prefix) const {
        TrieNode* curr = root;
        for (char ch : prefix) {
            int idx = ch - 'a';
            if (!curr->children[idx]) return false;
            curr = curr->children[idx];
        }
        return true;
    }
};
\`\`\`

---

### Python Implementation (Dictionary-Based Pythonic Trie)

\`\`\`python
"""
Python Syntax Logic Note:
1. Nested dictionaries provide a sparse, elegant Trie without allocating fixed 26-element arrays!
2. Special symbol (e.g. '$' or '__end__') indicates word boundary.
"""

class Trie:
    def __init__(self):
        self.root = {}

    def insert(self, word: str) -> None:
        curr = self.root
        for char in word:
            # dict.setdefault(key, default) initializes sub-dict if not present
            curr = curr.setdefault(char, {})
        curr['__end__'] = True

    def search(self, word: str) -> bool:
        curr = self.root
        for char in word:
            if char not in curr:
                return False
            curr = curr[char]
        return '__end__' in curr

    def starts_with(self, prefix: str) -> bool:
        curr = self.root
        for char in prefix:
            if char not in curr:
                return False
            curr = curr[char]
        return True
\`\`\`

---

## 7. GATE & UGC NET Key Exam Insights

> [!IMPORTANT]
> **GATE Classic: DSU Cycle Detection in Undirected Graphs**
> For each edge $(u, v)$: if \`Find(u) == Find(v)\`, adding this edge creates a cycle!
> This is how **Kruskal's MST algorithm** avoids cycles while greedily adding minimum-weight edges.

> [!NOTE]
> **Trie Space Complexity**
> Worst case: $O(\\Sigma \\times L \\times N)$ where $\\Sigma$ = alphabet size (26), $L$ = average word length, $N$ = number of words.
> But in practice, shared prefixes significantly reduce memory usage.
`,
};
