import { LearningModule } from "@/types/learning";

export const treesBinaryTreesModule: LearningModule = {
  id: "05-trees-binary-trees",
  title: "5. Trees & Binary Tree Properties",
  description:
    "Mathematical tree theorems, strictly binary vs complete vs full binary trees, traversals (Pre, In, Post, Level-order), recursive and iterative forms across C, C++, and Python",
  status: "completed",
  tags: ["Data Structure", "GATE CS", "UGC NET", "NPTEL"],
  detailedContent: `# Binary Trees: Structural Invariants & Traversals

> **NPTEL / GATE CS / UGC NET Core Subject**
> Key Exam Questions: Leaf node relation $n_0 = n_2 + 1$, maximum/minimum height formulas, reconstructing tree from Inorder + Preorder, and iterative traversals.

---

## 1. Prerequisites & What You Should Know

Before studying trees, make sure you understand:
- **Recursion**: Trees are inherently recursive structures. Most tree algorithms use recursion.
- **Stacks & Queues**: Iterative tree traversals use stacks (DFS) and queues (BFS).
- **Pointers/References**: Each tree node has pointers to child nodes.
- **Linked Lists**: A tree is a generalization of a linked list — instead of one \`next\` pointer, each node has multiple child pointers.

---

## 2. What is a Tree? (Conceptual Explanation)

### 2.1 The Family Tree / File System Analogy

A **tree** is a **hierarchical** data structure — unlike arrays, linked lists, stacks, and queues which are all **linear**:

\`\`\`
Your Computer's File System IS a Tree:

        /  (root)
       / \\
    home   etc
    / \\      \\
  user1 user2  config
  / \\
docs  pics
\`\`\`

- **Root**: The topmost node (like \`/\` in file systems, or CEO in an org chart).
- **Parent**: A node connected to nodes below it.
- **Children**: Nodes directly connected below a parent.
- **Leaf**: A node with NO children (like a file with no subdirectories).
- **Edge**: A connection between parent and child.
- **Height**: The longest path from root to any leaf.
- **Depth**: The number of edges from the root to a specific node.

### 2.2 Why Trees Instead of Linear Structures?

| Operation | Array | Linked List | Binary Search Tree |
|:---|:---|:---|:---|
| **Search** | $O(n)$ or $O(\\log n)$ sorted | $O(n)$ | $O(\\log n)$ balanced |
| **Insert** | $O(n)$ shifting | $O(1)$ at head | $O(\\log n)$ balanced |
| **Delete** | $O(n)$ shifting | $O(n)$ find + $O(1)$ remove | $O(\\log n)$ balanced |
| **Hierarchy** | Flat linear only | Flat linear only | Natural hierarchy |

**Key insight**: Trees give us the best of both worlds — fast search (like sorted arrays) AND fast insertion/deletion (like linked lists), as long as the tree stays balanced.

---

## 3. Why Do We Need Trees? (Real-World Applications)

1. **File Systems**: Every OS uses trees (directories contain files and subdirectories).
2. **Database Indexing**: B-Trees and B+ Trees power database indexes (MySQL, PostgreSQL).
3. **Compilers**: Abstract Syntax Trees (ASTs) represent the structure of source code.
4. **Decision Making**: Decision trees in AI/ML classify data by branching on features.
5. **Network Routing**: Spanning trees prevent loops in network switches.
6. **Compression**: Huffman coding trees compress data optimally.
7. **HTML/XML Parsing**: The DOM (Document Object Model) is a tree structure.

---

## 4. How Does a Binary Tree Work?

### 4.1 Binary Tree — Definition

A **Binary Tree** is a tree where every node has **at most two children**: a **left child** and a **right child**.

\`\`\`
A Binary Tree:

         1          ← Root (depth 0)
        / \\
       2   3        ← Depth 1
      / \\   \\
     4   5   6      ← Depth 2 (nodes 4, 5, 6 are leaves)

Height = 2 (longest path: 1→2→4 or 1→2→5 or 1→3→6)
Edges = 5 (always = number of nodes - 1)
Leaves = 3 (nodes 4, 5, 6)
Internal nodes = 3 (nodes 1, 2, 3)
\`\`\`

### 4.2 Types of Binary Trees (GATE Favorite!)

\`\`\`
1. Full (Strict) Binary Tree:     2. Complete Binary Tree:
   Every node has 0 or 2 children    All levels full except last,
                                      which is filled LEFT to RIGHT
         1                                 1
        / \\                              / \\
       2   3                            2   3
      / \\                              / \\  /
     4   5                            4  5  6

3. Perfect Binary Tree:           4. Degenerate (Skewed) Tree:
   All internal nodes have 2         Every node has exactly 1 child
   children, all leaves same depth   (behaves like a linked list!)
         1                            1
        / \\                            \\
       2   3                            2
      / \\ / \\                            \\
     4  5 6  7                            3
                                           \\
                                            4
\`\`\`

---

## 5. GATE & UGC NET Key Mathematical Theorems

### Theorem 1: Relationship Between Leaves and Degree-2 Nodes
In any non-empty binary tree where every node has 0, 1, or 2 children:
$$n_0 = n_2 + 1$$
*Where*:
- $n_0$ = number of leaf nodes (degree 0)
- $n_2$ = number of nodes with exactly 2 children (degree 2)
*(Notice: Degree-1 nodes $n_1$ do not affect the count of leaves!)*

#### Worked Example
> **Q**: A binary tree has 10 nodes with exactly 2 children. How many leaf nodes?
> **A**: $n_0 = n_2 + 1 = 10 + 1 = \\mathbf{11}$ leaf nodes.

### Theorem 2: Maximum Nodes at Height $h$ (Root at height 0)
- Maximum nodes at depth $d = 2^d$
- Total maximum nodes in tree of height $h$:
$$N_{\\max} = \\sum_{d=0}^{h} 2^d = 2^{h+1} - 1$$
- Minimum height for $N$ nodes:
$$h_{\\min} = \\lfloor \\log_2 N \\rfloor$$
- Maximum height for $N$ nodes (skewed):
$$h_{\\max} = N - 1$$

#### Quick Reference Table

| Nodes $N$ | Min Height ($\\lfloor \\log_2 N \\rfloor$) | Max Height ($N-1$) |
|:---|:---|:---|
| 7 | 2 (perfect tree) | 6 (skewed) |
| 15 | 3 (perfect tree) | 14 (skewed) |
| 31 | 4 (perfect tree) | 30 (skewed) |

---

## 6. Tree Traversals: The Four Walks

### 6.1 Understanding Traversal Intuitively

\`\`\`
Consider this tree:
         A
        / \\
       B   C
      / \\   \\
     D   E   F

Preorder  (Root, Left, Right): A → B → D → E → C → F
  "Visit root FIRST, then explore children"
  Think: "I announce each room as I enter it"

Inorder   (Left, Root, Right): D → B → E → A → C → F
  "Go left as far as possible, then visit, then go right"
  In a BST, this gives SORTED order!

Postorder (Left, Right, Root): D → E → B → F → C → A
  "Visit root LAST, after both children done"
  Think: "I clean up a room only after cleaning all rooms inside it"
  Used for: deleting trees, evaluating expression trees

Level-Order (BFS):             A → B → C → D → E → F
  "Visit level by level, left to right"
  Uses a QUEUE!
\`\`\`

### 6.2 Step-by-Step Inorder Traversal (Recursive)

\`\`\`
Tree:     1
         / \\
        2   3
       / \\
      4   5

Call stack trace for Inorder(1):

Inorder(1)
  → Inorder(2)           Go left
    → Inorder(4)         Go left
      → Inorder(NULL)    Base case: return
      → PRINT 4          ✓ Visit
      → Inorder(NULL)    Base case: return
    → PRINT 2            ✓ Visit
    → Inorder(5)         Go right
      → Inorder(NULL)    Base case: return
      → PRINT 5          ✓ Visit
      → Inorder(NULL)    Base case: return
  → PRINT 1              ✓ Visit
  → Inorder(3)           Go right
    → Inorder(NULL)      Base case: return
    → PRINT 3            ✓ Visit
    → Inorder(NULL)      Base case: return

Output: 4, 2, 5, 1, 3  ✓
\`\`\`

### 6.3 Level-Order Traversal using Queue

\`\`\`
Tree:     1
         / \\
        2   3
       / \\   \\
      4   5   6

Step 1: Enqueue root (1)
        Queue: [1]          Output: []

Step 2: Dequeue 1, enqueue children 2, 3
        Queue: [2, 3]       Output: [1]

Step 3: Dequeue 2, enqueue children 4, 5
        Queue: [3, 4, 5]    Output: [1, 2]

Step 4: Dequeue 3, enqueue child 6
        Queue: [4, 5, 6]    Output: [1, 2, 3]

Step 5: Dequeue 4 (no children)
        Queue: [5, 6]       Output: [1, 2, 3, 4]

Step 6: Dequeue 5 (no children)
        Queue: [6]          Output: [1, 2, 3, 4, 5]

Step 7: Dequeue 6 (no children)
        Queue: []           Output: [1, 2, 3, 4, 5, 6]  ✓
\`\`\`

---

## 7. Array vs Linked Representation of Binary Trees

### 7.1 Array Representation (Used for Complete Binary Trees / Heaps)

For a node at index $i$ (0-indexed):
- **Left child**: $2i + 1$
- **Right child**: $2i + 2$
- **Parent**: $\\lfloor (i-1)/2 \\rfloor$

\`\`\`
Tree:     10
         / \\
        20  30
       / \\
      40  50

Array: [10, 20, 30, 40, 50]
Index:  [0]  [1]  [2]  [3]  [4]

Node 20 (index 1):
  Left child = 2(1)+1 = index 3 → 40  ✓
  Right child = 2(1)+2 = index 4 → 50  ✓
  Parent = (1-1)/2 = index 0 → 10  ✓
\`\`\`

**Best for**: Complete binary trees (heaps) — no wasted space.
**Bad for**: Skewed trees — most array slots would be empty!

### 7.2 Linked Representation (General Purpose)

Each node is a struct/object with \`data\`, \`left\`, and \`right\` pointers. Can represent any shape of tree without wasting memory.

---

## 8. Implementation in C, C++, and Python with Syntax Logic

### C Implementation (Pointers, Recursive & Queue-Based Level-Order)

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

/**
 * C Syntax Logic Note:
 * 1. TreeNode struct: Contains data and two self-referential pointers (left, right).
 * 2. Recursion in C: Natural fit for trees because a tree is inherently recursive.
 *    Each recursive call pushes a stack frame containing node pointer.
 * 3. Level-Order: Requires an auxiliary queue of TreeNode* pointers.
 */

typedef struct TreeNode {
    int val;
    struct TreeNode* left;
    struct TreeNode* right;
} TreeNode;

TreeNode* createTreeNode(int val) {
    TreeNode* node = (TreeNode*)malloc(sizeof(TreeNode));
    node->val = val;
    node->left = NULL;
    node->right = NULL;
    return node;
}

// Inorder Traversal: Left -> Root -> Right
void inorderTraversal(TreeNode* root) {
    if (root == NULL) return; // Base case: leaf child reaches NULL

    inorderTraversal(root->left);  // Traverse left subtree
    printf("%d ", root->val);      // Process root
    inorderTraversal(root->right); // Traverse right subtree
}

// Postorder Traversal (Bottom-Up): Safe for tree deletion
void freeTree(TreeNode* root) {
    if (root == NULL) return;
    freeTree(root->left);
    freeTree(root->right);
    free(root); // Free root only after both children are freed!
}
\`\`\`

---

### C++ Implementation (Iterative Inorder using std::stack & OOP)

\`\`\`cpp
#include <iostream>
#include <vector>
#include <stack>

/**
 * C++ Syntax Logic Note:
 * 1. Iterative Traversal: Avoids call-stack overflow on deep/skewed trees (depth > 10,000).
 * 2. std::stack<TreeNode*>: Simulates the OS recursion call stack explicitly in heap memory.
 */

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

std::vector<int> iterativeInorder(TreeNode* root) {
    std::vector<int> result;
    std::stack<TreeNode*> st;
    TreeNode* curr = root;

    while (curr != nullptr || !st.empty()) {
        // Reach the leftmost node of current node
        while (curr != nullptr) {
            st.push(curr);
            curr = curr->left;
        }

        // Current must be NULL at this point, pop from stack
        curr = st.top();
        st.pop();
        result.push_back(curr->val); // Visit node

        // Now move to right subtree
        curr = curr->right;
    }
    return result;
}
\`\`\`

---

### Python Implementation (Level-Order BFS & Python Generators)

\`\`\`python
"""
Python Syntax Logic Note:
1. Generator functions (yield): Allow memory-efficient streaming of node values.
2. collections.deque: Used for Breadth-First Search (Level-Order) with O(1) pops.
"""

from collections import deque
from typing import Optional, List, Generator

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def level_order(root: Optional[TreeNode]) -> List[List[int]]:
    """
    Returns level-by-level groupings of node values.
    Time Complexity: O(n), Space Complexity: O(w) where w is max width.
    """
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)
        current_level = []

        for _ in range(level_size):
            node = queue.popleft()
            current_level.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(current_level)

    return result
\`\`\`

---

## 9. Tree Reconstruction Rules (GATE Classic)

> [!IMPORTANT]
> **GATE Classic: Tree Reconstruction Rule**
> - You **CANNOT** reconstruct a unique binary tree from Preorder + Postorder traversals alone! (Ambiguous left vs right child).
> - You **CAN** uniquely reconstruct any binary tree if given:
>   1. **Inorder + Preorder**, OR
>   2. **Inorder + Postorder**, OR
>   3. **Inorder + Level-Order**.
> *(Inorder is mandatory because it delineates the left subtree from the right subtree!)*

> [!NOTE]
> **GATE Shortcut: Counting Binary Trees with $n$ Nodes**
> The number of structurally distinct binary trees with $n$ nodes is the **$n$-th Catalan Number**:
> $$C_n = \\frac{1}{n+1}\\binom{2n}{n}$$
> For $n = 3$: $C_3 = 5$ distinct tree shapes.
`,
};
