import { LearningModule } from "@/types/learning";

export const trieAdvancedDSModule: LearningModule = {
  id: "10-trie-advanced-ds",
  title: "10. Trie & Advanced DS",
  description: "Prefix Trees, Union-Find — Specialized data structures",
  status: "in-progress",
  tags: ["Data Structure"],
  detailedContent: `# Trie & Advanced Data Structures

> **Advanced Module** - Specialized structures that solve specific problems efficiently

---

## What You'll Learn

1. Trie (Prefix Tree) — fast string operations
2. Disjoint Set (Union-Find) — grouping elements efficiently

---

## 1. Trie (Prefix Tree)

### What is a Trie?

A **Trie** is a tree-like data structure for storing strings. Each node represents a **character** in a word.

\`\`\`text
       root
      / | \\
     a  b  c
    /   |   \\
   p    a    a
   |    |    |
   p    t    t  ← "bat", "cat" end here
   |
   l    
   |
   e  ← "apple" ends here
\`\`\`

### Why Trie?

| Operation | Array/List | Hash Set | Trie |
|:----------|:-----------|:---------|:-----|
| Search word | O(n × m) | O(m) | O(m) |
| Prefix search | O(n × m) | O(n × m) | **O(m)** (Best) |
| Autocomplete | O(n × m) | O(n × m) | **O(m + k)** (Best) |

Where n = number of words, m = word length, k = results count

**Trie wins** when you need **prefix-based operations** (autocomplete, spell check, IP routing).

### Trie Implementation

\`\`\`python path=null start=null
class TrieNode:
    def __init__(self):
        self.children = {}  # char → TrieNode
        self.is_end = False  # Marks end of a word

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        """Add a word to the Trie — O(m)"""
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True
    
    def search(self, word):
        """Check if EXACT word exists — O(m)"""
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end  # Must be end of a word!
    
    def starts_with(self, prefix):
        """Check if any word starts with prefix — O(m)"""
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True  # Prefix found!

# Usage
trie = Trie()
trie.insert("apple")
trie.insert("app")
trie.insert("bat")

print(trie.search("app"))       # True
print(trie.search("ap"))        # False (not a complete word)
print(trie.starts_with("ap"))   # True (prefix exists)
\`\`\`

### When to Use Trie

| Use Case | Example |
|:---------|:--------|
| **Autocomplete** | Google search suggestions |
| **Spell checker** | Red underline in Word |
| **IP routing** | Longest prefix matching |
| **Word games** | Scrabble, Boggle |

---

## 2. Disjoint Set (Union-Find)

### What is Union-Find?

A data structure that tracks elements divided into **non-overlapping groups (sets)**.

Two operations:
- **Find(x)**: Which group does x belong to?
- **Union(x, y)**: Merge the groups of x and y

\`\`\`text
Initially: {0} {1} {2} {3} {4}  (each element is its own group)

Union(0, 1): {0, 1} {2} {3} {4}
Union(2, 3): {0, 1} {2, 3} {4}
Union(1, 3): {0, 1, 2, 3} {4}

Find(0) == Find(3)?  → Yes! (same group)
Find(0) == Find(4)?  → No!  (different groups)
\`\`\`

### Union-Find Implementation

\`\`\`python path=null start=null
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))  # Each element is its own parent
        self.rank = [0] * n           # For union by rank
    
    def find(self, x):
        """Find root of x's group — with Path Compression"""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Flatten tree!
        return self.parent[x]
    
    def union(self, x, y):
        """Merge groups of x and y — with Union by Rank"""
        px, py = self.find(x), self.find(y)
        
        if px == py:
            return False  # Already in same group
        
        # Attach smaller tree under larger tree
        if self.rank[px] < self.rank[py]:
            self.parent[px] = py
        elif self.rank[px] > self.rank[py]:
            self.parent[py] = px
        else:
            self.parent[py] = px
            self.rank[px] += 1
        
        return True
    
    def connected(self, x, y):
        """Check if x and y are in the same group"""
        return self.find(x) == self.find(y)

# Usage
uf = UnionFind(5)
uf.union(0, 1)
uf.union(2, 3)
uf.union(1, 3)

print(uf.connected(0, 3))  # True (same group)
print(uf.connected(0, 4))  # False (different groups)
\`\`\`

### Optimizations

| Technique | What it Does | Effect |
|:----------|:-------------|:-------|
| **Path Compression** | In \`find()\`, make every node point directly to root | Nearly O(1) per operation |
| **Union by Rank** | Attach shorter tree under taller tree | Keeps tree balanced |

With both optimizations: **O(α(n))** per operation, where α is the inverse Ackermann function (practically constant).

### When to Use Union-Find

| Use Case | Example |
|:---------|:--------|
| **Cycle detection** | Check if adding an edge creates a cycle |
| **Kruskal's MST** | Minimum Spanning Tree algorithm |
| **Connected components** | How many groups exist? |
| **Network connectivity** | Are two computers connected? |
| **LeetCode pattern** | "Number of Islands", "Accounts Merge" |

---

## Complexity Summary

| Data Structure | Insert | Search | Delete | Space |
|:---------------|:-------|:-------|:-------|:------|
| **Trie** | O(m) | O(m) | O(m) | O(ALPHABET × m × n) |
| **Union-Find** | — | O(α(n)) | — | O(n) |

Where m = word length, n = number of elements

---

## Key Takeaways

| Concept | Key Point |
|:--------|:----------|
| Trie | Tree for strings; each node = one character |
| Trie prefix search | O(m) — much faster than checking all words |
| Union-Find | Track groups; merge and query in near O(1) |
| Path Compression | Flatten tree in find() for speed |
| Union by Rank | Keep tree balanced in union() |

---

## TL;DR - Quick Recall

**One-liner for each concept:**

| Concept | Key Takeaway |
|:--------|:-------------|
| **Trie** | A tree where each node is a character. Best for prefix searching and autocomplete. |
| **Union-Find** | Track which elements belong to the same group. Near O(1) with optimizations. |
| **Path Compression** | In \`find()\`, point every node directly to root. Makes future lookups faster. |
| **Union by Rank** | Always attach the shorter tree under the taller one. Keeps operations fast. |

**Essential Code Snippets:**

\`\`\`python
# Trie — Insert and Search
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

# Union-Find — Core Pattern
def find(parent, x):
    if parent[x] != x:
        parent[x] = find(parent, parent[x])  # Path compression
    return parent[x]
\`\`\`

**The Golden Rules:**
1. If the problem involves **prefixes or autocomplete**, think **Trie**.
2. If the problem involves **grouping/merging** elements, think **Union-Find**.
3. Union-Find is the backbone of **Kruskal's MST** algorithm.

---

## Additional Resources

**Video Courses:**
- [NeetCode - Trie](https://youtu.be/oobqoCJlHA0) - Clear implementation guide
- [Abdul Bari - Disjoint Sets](https://youtu.be/wU6udHRIkcc) - Union by Rank & Path Compression

**Articles & Visualizations:**
- [VisuAlgo - Union-Find](https://visualgo.net/en/ufds) - Interactive Union-Find visualizer
- [Visualize Trie](https://www.cs.usfca.edu/~galles/visualization/Trie.html) - Watch Trie operations step by step

**Practice Problems:**
- LeetCode 208: Implement Trie (Prefix Tree)
- LeetCode 200: Number of Islands (Union-Find)
- LeetCode 721: Accounts Merge (Union-Find)
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "tads-q1",
      question: "What is a Trie best used for?",
      options: [
        "Sorting numbers",
        "Prefix-based string operations",
        "Graph traversal",
        "Hash table replacement",
      ],
      correctAnswer: 1,
      explanation:
        "Trie excels at prefix operations like autocomplete, spell check, and prefix search. Each node represents a character.",
      difficulty: "easy",
    },
    {
      id: "tads-q2",
      question: "Time complexity of searching a word of length m in a Trie is:",
      options: ["O(n)", "O(m)", "O(n × m)", "O(log n)"],
      correctAnswer: 1,
      explanation:
        "Trie search is O(m) where m is the word length. We follow one path from root, checking one character per level.",
      difficulty: "easy",
    },
    {
      id: "tads-q3",
      question: "Union-Find's find() with path compression achieves:",
      options: ["O(n)", "O(log n)", "Nearly O(1)", "O(n²)"],
      correctAnswer: 2,
      explanation:
        "With path compression and union by rank, find() is O(α(n)) — inverse Ackermann, practically constant.",
      difficulty: "medium",
    },
    {
      id: "tads-q4",
      question: "In a Trie, what does is_end = True signify?",
      options: [
        "The Trie is full",
        "A complete word ends at this node",
        "No more children",
        "The node should be deleted",
      ],
      correctAnswer: 1,
      explanation:
        "is_end marks that a valid word terminates at this node. Without it, we can't distinguish 'app' from the prefix 'app' in 'apple'.",
      difficulty: "easy",
    },
    {
      id: "tads-q5",
      question: "Which algorithm uses Union-Find as a key component?",
      options: [
        "Dijkstra's Algorithm",
        "Kruskal's MST",
        "Binary Search",
        "BFS",
      ],
      correctAnswer: 1,
      explanation:
        "Kruskal's MST uses Union-Find to check if adding an edge creates a cycle. If two nodes are already connected, skip the edge.",
      difficulty: "easy",
    },
    {
      id: "tads-q6",
      question: "Path compression in Union-Find means:",
      options: [
        "Removing duplicate paths",
        "Making every node point directly to root during find()",
        "Compressing the data",
        "Shortening the path in a graph",
      ],
      correctAnswer: 1,
      explanation:
        "Path compression flattens the tree by making every node visited during find() point directly to the root. Speeds up future queries.",
      difficulty: "medium",
    },
    {
      id: "tads-q7",
      question:
        "The space complexity of a Trie storing n words of max length m is:",
      options: ["O(n)", "O(m)", "O(n × m)", "O(ALPHABET × m × n)"],
      correctAnswer: 3,
      explanation:
        "Worst case: each node can have ALPHABET_SIZE children. With n words of length m, space is O(ALPHABET × m × n).",
      difficulty: "medium",
    },
    {
      id: "tads-q8",
      question: "Union by Rank means:",
      options: [
        "Union elements by value",
        "Attach shorter tree under taller tree",
        "Union in sorted order",
        "Rank elements before union",
      ],
      correctAnswer: 1,
      explanation:
        "Union by Rank attaches the shorter (lower rank) tree under the taller one. This keeps the tree balanced and operations fast.",
      difficulty: "medium",
    },
    {
      id: "tads-q9",
      question: "Trie.starts_with('ap') returns True when Trie contains:",
      options: ["Only 'bat'", "Only 'apple'", "Only 'banana'", "Only 'pa'"],
      correctAnswer: 1,
      explanation:
        "starts_with('ap') checks if any word has the prefix 'ap'. 'apple' starts with 'ap', so it returns True.",
      difficulty: "easy",
    },
    {
      id: "tads-q10",
      question: "Union-Find is NOT suitable for:",
      options: [
        "Cycle detection in undirected graphs",
        "Finding connected components",
        "Finding shortest path between two nodes",
        "Checking network connectivity",
      ],
      correctAnswer: 2,
      explanation:
        "Union-Find tracks connectivity, not distances. For shortest paths, use BFS (unweighted) or Dijkstra (weighted).",
      difficulty: "medium",
    },
  ],
};
