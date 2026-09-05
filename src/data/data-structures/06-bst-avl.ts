import { LearningModule } from "@/types/learning";

export const bstAvlModule: LearningModule = {
  id: "06-bst-avl",
  title: "6. Binary Search Trees & AVL Trees",
  description:
    "BST invariants, insertion, search, deletion with 0/1/2 children, Inorder Successor/Predecessor, AVL rotations (LL, RR, LR, RL), and balancing factor across C, C++, and Python",
  status: "completed",
  tags: ["Data Structure", "GATE CS", "UGC NET", "NPTEL"],
  detailedContent: `# Binary Search Trees (BST) & Self-Balancing AVL Trees

> **NPTEL / GATE CS / UGC NET Core Subject**
> Key Exam Questions: BST node deletion logic (case of 2 children), sequence of AVL rotations after insertions, height bounds ($1.44 \\log_2 N$), and B-Tree orders.

---

## 1. Prerequisites & What You Should Know

Before studying BSTs and AVL trees, ensure you understand:
- **Binary Trees (Module 5)**: Tree terminology, traversals (especially Inorder), and recursive structure.
- **Recursion**: BST operations are naturally recursive.
- **Binary Search**: The BST property is essentially binary search embedded in a tree structure.
- **Comparison Operators**: How \`<\`, \`>\`, \`==\` work for ordering elements.

---

## 2. What is a Binary Search Tree? (Conceptual Explanation)

### 2.1 The Dictionary Analogy

Think of a BST like a **physical dictionary**:
- You open the dictionary somewhere in the middle.
- If the word you're looking for comes **before** the current page alphabetically, you go **left** (earlier pages).
- If it comes **after**, you go **right** (later pages).
- You keep narrowing down until you find the word.

This is exactly how a BST works — at every node, you decide **left** or **right** based on comparison!

### 2.2 The BST Invariant (The One Rule)

For **every** node $X$ in a BST:
- ALL keys in the **left subtree** are **less than** $X$.
- ALL keys in the **right subtree** are **greater than** $X$.

$$\\text{key}(Y) < \\text{key}(X) \\quad \\forall \\, Y \\in \\text{left\\_subtree}(X)$$
$$\\text{key}(Z) > \\text{key}(X) \\quad \\forall \\, Z \\in \\text{right\\_subtree}(X)$$

\`\`\`
Valid BST:                  NOT a valid BST:

       50                         50
      / \\                        / \\
    30   70                    30   70
   / \\   / \\                  / \\   / \\
  20 40 60  80               20 60 40  80
                                   ↑
All left < parent < all right    60 is in the RIGHT subtree of 50 ✓
                                 but 40 is in the RIGHT subtree of 50,
                                 yet 40 < 50. VIOLATION! ✗
\`\`\`

### 2.3 The Golden Property: Inorder = Sorted!

If you perform an **Inorder traversal** (Left → Root → Right) of any valid BST, you get elements in **sorted ascending order**:

\`\`\`
BST:        50
           / \\
         30   70
        / \\   / \\
       20 40 60  80

Inorder: 20, 30, 40, 50, 60, 70, 80  ← SORTED!
\`\`\`

This property is used in many GATE questions to verify if a tree is a valid BST.

---

## 3. Why Do We Need BSTs?

### 3.1 The Problem BSTs Solve

| Data Structure | Search | Insert | Delete |
|:---|:---|:---|:---|
| Unsorted Array | $O(n)$ | $O(1)$ | $O(n)$ |
| Sorted Array | $O(\\log n)$ | $O(n)$ (shifting!) | $O(n)$ (shifting!) |
| Linked List | $O(n)$ | $O(1)$ | $O(n)$ find |
| **BST (balanced)** | **$O(\\log n)$** | **$O(\\log n)$** | **$O(\\log n)$** |

BSTs give us $O(\\log n)$ for **all three operations** — when balanced!

### 3.2 The Skew Problem

If you insert sorted data (1, 2, 3, 4, 5) into a BST, it degenerates into a linked list:

\`\`\`
Insert 1, 2, 3, 4, 5 in order:

  1
   \\
    2
     \\
      3       ← This is a SKEWED tree!
       \\        All operations become O(n).
        4       This is why we need AVL trees!
         \\
          5
\`\`\`

**This is why self-balancing trees (AVL, Red-Black) exist!**

---

## 4. BST Operations: Step-by-Step Walkthroughs

### 4.1 Search in BST

\`\`\`
Search for key 40 in BST:

       50          Compare: 40 < 50 → go LEFT
      / \\
    30   70        Compare: 40 > 30 → go RIGHT
   / \\
  20  40           Compare: 40 == 40 → FOUND! ✓

Total comparisons: 3 (height of the node)
Time: O(h) where h is the height
\`\`\`

### 4.2 Insertion in BST

\`\`\`
Insert 45 into BST:

       50          45 < 50 → go LEFT
      / \\
    30   70        45 > 30 → go RIGHT
   / \\
  20  40           45 > 40 → go RIGHT (NULL → create node!)
       \\
       45  ← NEW NODE inserted as right child of 40

The new node is ALWAYS inserted as a leaf!
\`\`\`

### 4.3 Deletion in BST (The Three Cases)

\`\`\`
CASE 1: Delete a LEAF node (no children)
Delete 20:
       50              50
      / \\    →        / \\
    30   70         30   70
   / \\             / \\
  20  40            40
Simply remove it. Easy!

CASE 2: Delete a node with ONE child
Delete 30 (has right child 40):
       50              50
      / \\    →        / \\
    30   70         40   70
      \\
       40
Connect parent (50) directly to child (40). Bypass 30.

CASE 3: Delete a node with TWO children
Delete 50:
       50              55       (or use predecessor 40)
      / \\    →        / \\
    30   70         30   70
   / \\   /         / \\   /
  20 40 55        20 40 60
         \\
         60

Step 1: Find Inorder Successor = smallest in right subtree = 55
Step 2: Copy 55 into position of 50
Step 3: Delete the original 55 node (falls into Case 1 or 2)
\`\`\`

### 4.4 Inorder Successor & Predecessor

- **Inorder Successor** of node $X$ = smallest key **greater than** $X$ = leftmost node in right subtree.
- **Inorder Predecessor** of node $X$ = largest key **less than** $X$ = rightmost node in left subtree.

\`\`\`
BST:        50
           / \\
         30   70
        / \\   / \\
       20 40 60  80

Inorder Successor of 50 = leftmost of right subtree = 60
Inorder Predecessor of 50 = rightmost of left subtree = 40
\`\`\`

---

## 5. AVL Trees: Why Balance Matters

### 5.1 What is an AVL Tree?

An **AVL Tree** (named after Adelson-Velsky and Landis, 1962) is a **self-balancing BST** that maintains a **Balance Factor ($BF$)** on every node:
$$BF(node) = \\text{Height}(\\text{left\\_subtree}) - \\text{Height}(\\text{right\\_subtree})$$

- **Allowed values**: $BF \\in \\{-1, 0, +1\\}$
- If $|BF| > 1$ after an insertion or deletion, the tree is **rebalanced** using **rotations**.

### 5.2 The 4 Rotation Cases (Visual)

\`\`\`
CASE 1: LL (Left-Left) — Fix with Single RIGHT Rotation

  Before (BF=+2):        After Right Rotation:
        z                      y
       / \\                   /   \\
      y   T4       →       x     z
     / \\                  / \\   / \\
    x   T3               T1 T2 T3 T4
   / \\
  T1  T2

CASE 2: RR (Right-Right) — Fix with Single LEFT Rotation

  Before (BF=-2):        After Left Rotation:
    z                          y
   / \\                       /   \\
  T1  y          →          z     x
     / \\                  / \\   / \\
    T2  x                T1 T2 T3 T4
       / \\
      T3  T4

CASE 3: LR (Left-Right) — Fix with LEFT rotation on child, then RIGHT rotation

  Before (BF=+2):  After Left(y):   After Right(z):
        z               z                x
       / \\             / \\             /   \\
      y   T4   →      x   T4   →     y     z
     / \\             / \\             / \\   / \\
    T1  x           y   T3         T1 T2 T3 T4
       / \\         / \\
      T2  T3      T1  T2

CASE 4: RL (Right-Left) — Fix with RIGHT rotation on child, then LEFT rotation
  (Mirror of LR)
\`\`\`

### 5.3 AVL Insertion: Step-by-Step Example

\`\`\`
Insert 30, 20, 10 into empty AVL tree:

Step 1: Insert 30
  30 (BF=0)

Step 2: Insert 20
    30 (BF=+1)
   /
  20

Step 3: Insert 10
      30 (BF=+2!)   ← LL Imbalance!
     /
    20 (BF=+1)
   /
  10

Fix: RIGHT ROTATE at 30:
    20 (BF=0)  ✓ Balanced!
   / \\
  10  30
\`\`\`

---

## 6. BST vs AVL: When to Use Which?

| Feature | BST | AVL |
|:---|:---|:---|
| **Guaranteed O(log n)?** | No (can degenerate to O(n)) | Yes (strictly balanced) |
| **Insertion overhead** | None | Rotation cost (constant per insertion) |
| **Best for** | Data inserted in random order | Frequent searches, read-heavy workloads |
| **Height** | Up to $n-1$ (worst case) | At most $1.44 \\log_2 N$ |

---

## 7. Implementation in C, C++, and Python with Syntax Logic

### C Implementation (BST Insertion, Search & 3-Case Deletion)

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

/**
 * C Syntax Logic Note:
 * 1. Recursive Pointer Returns: "Node* insert(Node* root, int key)" returns the
 *    root of the modified subtree. This elegant idiom connects parents to newly
 *    allocated children without needing double pointers (Node**).
 * 2. Inorder Successor Finding: Moves to right child once, then traverses left
 *    until curr->left == NULL.
 */

typedef struct Node {
    int key;
    struct Node* left;
    struct Node* right;
} Node;

Node* createBSTNode(int key) {
    Node* node = (Node*)malloc(sizeof(Node));
    node->key = key;
    node->left = node->right = NULL;
    return node;
}

// Insert: O(h) time
Node* insertBST(Node* root, int key) {
    if (root == NULL) return createBSTNode(key);

    if (key < root->key) {
        root->left = insertBST(root->left, key);
    } else if (key > root->key) {
        root->right = insertBST(root->right, key);
    }
    return root; // Return unchanged pointer
}

// Find minimum value node (Inorder Successor)
Node* findMin(Node* node) {
    Node* curr = node;
    while (curr && curr->left != NULL) {
        curr = curr->left;
    }
    return curr;
}

// Delete Node: Handles 0, 1, and 2 children cases
Node* deleteBST(Node* root, int key) {
    if (root == NULL) return root;

    if (key < root->key) {
        root->left = deleteBST(root->left, key);
    } else if (key > root->key) {
        root->right = deleteBST(root->right, key);
    } else {
        // Node to delete found!

        // Case 1 & 2: 0 or 1 child
        if (root->left == NULL) {
            Node* temp = root->right;
            free(root);
            return temp;
        } else if (root->right == NULL) {
            Node* temp = root->left;
            free(root);
            return temp;
        }

        // Case 3: 2 children
        // Get inorder successor (smallest in right subtree)
        Node* temp = findMin(root->right);
        // Copy successor data to root
        root->key = temp->key;
        // Delete the successor from right subtree
        root->right = deleteBST(root->right, temp->key);
    }
    return root;
}
\`\`\`

---

### C++ Implementation (AVL Rotations & Height Tracking)

\`\`\`cpp
#include <iostream>
#include <algorithm>

/**
 * C++ Syntax Logic Note:
 * 1. Height Field: Stored directly in the Node struct to allow O(1) balance factor evaluation.
 * 2. std::max: Used to compute new height: 1 + std::max(height(left), height(right)).
 */

struct AVLNode {
    int key;
    int height;
    AVLNode* left;
    AVLNode* right;
    AVLNode(int k) : key(k), height(1), left(nullptr), right(nullptr) {}
};

int getHeight(AVLNode* n) {
    return n ? n->height : 0;
}

int getBalance(AVLNode* n) {
    return n ? getHeight(n->left) - getHeight(n->right) : 0;
}

// Right Rotation (for LL imbalance)
AVLNode* rightRotate(AVLNode* y) {
    AVLNode* x = y->left;
    AVLNode* T2 = x->right;

    // Perform rotation
    x->right = y;
    y->left = T2;

    // Update heights (bottom-up: y first, then x)
    y->height = 1 + std::max(getHeight(y->left), getHeight(y->right));
    x->height = 1 + std::max(getHeight(x->left), getHeight(x->right));

    return x; // New root
}

// Left Rotation (for RR imbalance)
AVLNode* leftRotate(AVLNode* x) {
    AVLNode* y = x->right;
    AVLNode* T2 = y->left;

    y->left = x;
    x->right = T2;

    x->height = 1 + std::max(getHeight(x->left), getHeight(x->right));
    y->height = 1 + std::max(getHeight(y->left), getHeight(y->right));

    return y; // New root
}
\`\`\`

---

### Python Implementation (BST Class & Inorder Iterator)

\`\`\`python
"""
Python Syntax Logic Note:
1. Generator Inorder: Uses "yield from" to yield elements in sorted order effortlessly.
2. Optional types: Node | None for clean type safety.
"""

from typing import Optional, Generator

class BSTNode:
    def __init__(self, key: int):
        self.key = key
        self.left: Optional['BSTNode'] = None
        self.right: Optional['BSTNode'] = None

class BST:
    def __init__(self):
        self.root: Optional[BSTNode] = None

    def insert(self, key: int) -> None:
        def _insert(node: Optional[BSTNode], val: int) -> BSTNode:
            if not node:
                return BSTNode(val)
            if val < node.key:
                node.left = _insert(node.left, val)
            elif val > node.key:
                node.right = _insert(node.right, val)
            return node

        self.root = _insert(self.root, key)

    def inorder(self) -> Generator[int, None, None]:
        """Generator yielding keys in ascending sorted order: O(n)."""
        def _inorder(node: Optional[BSTNode]):
            if node:
                yield from _inorder(node.left)
                yield node.key
                yield from _inorder(node.right)

        yield from _inorder(self.root)
\`\`\`

---

## 8. GATE & UGC NET Key Exam Insights

> [!NOTE]
> **AVL Maximum Height Formula**:
> The maximum height of an AVL tree with $N$ nodes is bounded by:
> $$h < 1.44 \\log_2(N + 2) - 0.328$$
> *Rule of thumb*: AVL trees are at most $44\\%$ taller than a perfectly balanced binary tree.

> [!IMPORTANT]
> **GATE Tip: Number of BSTs with $n$ Keys**
> The number of structurally distinct BSTs with $n$ keys is the **Catalan Number**:
> $$C_n = \\frac{1}{n+1}\\binom{2n}{n}$$
> For $n=3$ keys: $C_3 = 5$ distinct BSTs. Same as number of distinct binary trees!

> [!WARNING]
> **GATE Trap: BST Deletion Order Matters!**
> Deleting node $A$ then $B$ from a BST may produce a different tree than deleting $B$ then $A$!
> This is frequently tested — be careful with the order.
`,
};
