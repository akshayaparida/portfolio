import { LearningModule } from "@/types/learning";

export const treesModule: LearningModule = {
  id: "05-trees",
  title: "5. Trees",
  description: "Hierarchical data structures - Binary Trees, BST, AVL, B-Trees",
  status: "completed",
  tags: ["Data Structure"],
  detailedContent: `# Trees

> **Data Structure Module** - Learn hierarchical data organization

---

## What You'll Learn

1. Understand tree terminology and Forests
2. Implement Binary Trees, BSTs, and Threaded Binary Trees
3. Master all 4 tree traversal methods
4. Know when to use balanced trees (AVL) and database indexing (B-Trees, B+ Trees)

---

## 1. What is a Tree? (Simple Explanation)

Think of a **family tree** or **file folder structure**:
- One item at the top (root)
- Each item can have children below it
- No loops - you can't go back up and circle around

\`\`\`
         [ROOT]
         /    \\
      [A]      [B]
     /   \\       \\
   [C]   [D]     [E]
   
   Terminology:
   - ROOT: Top node (no parent)
   - LEAF: Bottom nodes (no children) - C, D, E
   - PARENT: A is parent of C, D
   - CHILD: C, D are children of A
   - HEIGHT: Longest path from root to leaf = 2
\`\`\`

---

## 2. Binary Tree

A Binary Tree is a **hierarchical (non-linear)** data structure where each node has **at most 2 children** — Left Child and Right Child.

> **Key Shift:** All previous structures (Array, Stack, Queue, Linked List) were **linear** (one path). Binary Tree is **non-linear** — branching paths! This is a fundamental upgrade in structural thinking.

\`\`\`python path=null start=null
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None   # Left child
        self.right = None  # Right child

# Creating a tree manually
#       1
#      / \\
#     2   3
#    / \\
#   4   5

root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)
\`\`\`

### Types of Binary Trees

#### 1. Full Binary Tree (Proper Binary Tree)

Every node has **either 0 or 2 children**. No node has just 1 child.

\`\`\`text
  Full Binary Tree:        NOT Full:
       [1]                   [1]
      /   \\                 /   \\
    [2]   [3]             [2]   [3]
   /   \\                 /
  [4]  [5]             [4]

  Every internal node     Node 2 has only
  has exactly 2 children  1 child → NOT full
\`\`\`

#### 2. Complete Binary Tree

All levels are **completely filled except possibly the last level**, and the last level is filled **from left to right**.

\`\`\`text
  Complete:             NOT Complete:
       [1]                  [1]
      /   \\                /   \\
    [2]   [3]            [2]   [3]
   /   \\                       \\
  [4]  [5]                     [5]

  Last level fills      Last level has gap
  from LEFT to RIGHT    on the left → NOT complete
\`\`\`

> A complete binary tree does **NOT** have to be a full binary tree.

#### 3. Perfect Binary Tree

All internal nodes have **exactly 2 children** AND all leaf nodes are at the **same level**.

\`\`\`text
  Perfect Binary Tree:
          [1]           Level 0: 1 node
         /   \\
       [2]   [3]        Level 1: 2 nodes
      /  \\  /  \\
    [4] [5][6] [7]      Level 2: 4 nodes

  Every level is completely filled!
  A Perfect Binary Tree is BOTH Full AND Complete.
\`\`\`

### Important Binary Tree Formulas

| Formula | Description |
|:--------|:------------|
| Min nodes = **h + 1** | Minimum nodes in a binary tree of height h |
| Max nodes = **2^(h+1) − 1** | Maximum nodes in a binary tree of height h |
| Max nodes at level L = **2^L** | Maximum nodes at any given level |
| Leaf nodes = **n₂ + 1** | Leaf nodes = (nodes with degree 2) + 1 |
| Height of complete tree = **⌊log₂n⌋** | Height grows logarithmically |

\`\`\`text
Example: Height h = 3

  Min nodes = 3 + 1 = 4       (one node per level)
  Max nodes = 2^(3+1) − 1 = 15 (perfect binary tree)

  Level 0: max 2^0 = 1 node
  Level 1: max 2^1 = 2 nodes
  Level 2: max 2^2 = 4 nodes
  Level 3: max 2^3 = 8 nodes
\`\`\`

### Number of Distinct Binary Trees (Catalan Number)

The number of **structurally different** binary trees that can be formed with **n** nodes:

\`\`\`text
  Formula: (2n C n) / (n + 1)

  This is called the CATALAN NUMBER.

  Example 1: n = 3
    = (6 C 3) / (3 + 1)
    = 20 / 4
    = 5 distinct binary trees

  Example 2: n = 6
    = (12 C 6) / (6 + 1)
    = 924 / 7
    = 132 distinct binary trees

  The 5 distinct binary trees for n = 3:

    [R]    [R]    [R]      [R]      [R]
    /      /        \\      / \\        \\
   /      /          \\    /   \\        \\
  /      [A]       [A]  [A]  [B]     [A]
  |        \\      /                  /
  [A]     [B]   [B]                [B]
   \\
   [B]
\`\`\`

### Perfect Binary Tree Properties

| Property | Formula |
|:---------|:--------|
| Leaf nodes (L) | L = Internal nodes (I) + 1 |
| Total nodes | 2^(h+1) − 1 |
| Internal nodes | 2^h − 1 |
| Leaf nodes | 2^h |

> **Height convention:** Height = number of **edges** in longest path from root to leaf. Root alone has height 0.

---

## 3. Tree Traversals (THE MOST IMPORTANT PART!)

There are 4 ways to visit every node. Memorize these!

### Inorder: Left → Root → Right
\`\`\`python path=null start=null
def inorder(root):
    if root:
        inorder(root.left)     # 1. Go left
        print(root.val, end=" ") # 2. Visit node
        inorder(root.right)    # 3. Go right

# For tree:    1
#             / \\
#            2   3
#           / \\
#          4   5
# Output: 4 2 5 1 3
\`\`\`

### Preorder: Root → Left → Right
\`\`\`python path=null start=null
def preorder(root):
    if root:
        print(root.val, end=" ") # 1. Visit node FIRST
        preorder(root.left)    # 2. Go left
        preorder(root.right)   # 3. Go right

# Output: 1 2 4 5 3
\`\`\`

### Postorder: Left → Right → Root
\`\`\`python path=null start=null
def postorder(root):
    if root:
        postorder(root.left)   # 1. Go left
        postorder(root.right)  # 2. Go right
        print(root.val, end=" ") # 3. Visit node LAST

# Output: 4 5 2 3 1
\`\`\`

### Level Order (BFS): Level by Level
\`\`\`python path=null start=null
from collections import deque

def level_order(root):
    if not root:
        return
    
    queue = deque([root])
    
    while queue:
        node = queue.popleft()
        print(node.val, end=" ")
        
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)

# Output: 1 2 3 4 5 (level by level!)
\`\`\`

---

## 4. Binary Search Tree (BST)

**The Golden Rule:** Left < Root < Right

Every node in left subtree is SMALLER than root.
Every node in right subtree is LARGER than root.

\`\`\`
        50
       /  \\
     30    70
    /  \\  /  \\
   20  40 60  80

   - All values left of 50 are < 50
   - All values right of 50 are > 50
   - This makes searching FAST!
\`\`\`

### BST Implementation

\`\`\`python path=null start=null
class BST:
    def __init__(self):
        self.root = None
    
    def insert(self, val):
        self.root = self._insert(self.root, val)
    
    def _insert(self, node, val):
        # Base case: empty spot found!
        if not node:
            return TreeNode(val)
        
        # Decide: go left or right?
        if val < node.val:
            node.left = self._insert(node.left, val)
        else:
            node.right = self._insert(node.right, val)
        
        return node
    
    def search(self, val):
        return self._search(self.root, val)
    
    def _search(self, node, val):
        # Base cases
        if not node:
            return False  # Not found
        if node.val == val:
            return True   # Found!
        
        # Decide: go left or right?
        if val < node.val:
            return self._search(node.left, val)
        else:
            return self._search(node.right, val)

# Usage
bst = BST()
for num in [50, 30, 70, 20, 40, 60, 80]:
    bst.insert(num)

print(bst.search(40))  # True
print(bst.search(45))  # False
\`\`\`

### Why BST is Fast

Each comparison **eliminates half** the remaining nodes!
- Similar to binary search
- O(log n) average case

**BUT** if you insert sorted data (1,2,3,4,5), it becomes a "linked list" and O(n)!

---

## 5. Balanced Trees (AVL, Red-Black)

Automatically rebalance to prevent worst-case O(n).

**AVL Rule:** Height difference between left and right subtrees ≤ 1

All operations stay O(log n) guaranteed!

---

## Key Takeaways

| Operation | BST Average | BST Worst | AVL |
|:----------|:------------|:----------|:----|
| Search | O(log n) | O(n) | O(log n) |
| Insert | O(log n) | O(n) | O(log n) |
| Delete | O(log n) | O(n) | O(log n) |

**Traversal Mnemonics:**
- **In**order: L-**N**-R (Node in middle)
- **Pre**order: **N**-L-R (Node first, like PRE-fix)
- **Post**order: L-R-**N** (Node last, like POST-script)

---

## TL;DR - Quick Recall

**One-liner for each concept:**

| Concept | Key Takeaway |
|:--------|:-------------|
| **Tree** | Hierarchical data structure; root at top, leaves at bottom. |
| **Traversal** | **Inorder** (sorted output for BST), **Preorder** (copying), **Postorder** (deleting). |
| **BST** | binary search tree; left < root < right. \`O(log n)\` search *if balanced*. |
| **AVL / Red-Black** | Self-balancing trees; guarantee \`O(log n)\` operations. |
| **B-Trees** | Fat nodes (multiple keys/children); optimized for disk access (databases). |
| **Trie** | Prefix tree; extremely fast for string matching/auto-complete. |

**Essential Code Snippets:**

\`\`\`python
# Typical Tree Node
class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None

# DFS: Inorder Traversal
def inorder(root):
    if not root: return []
    return inorder(root.left) + [root.val] + inorder(root.right)

# BFS: Level Order Traversal (using Queue)
from collections import deque
def bfs(root):
    if not root: return
    queue = deque([root])
    while queue:
        node = queue.popleft()
        print(node.val)
        if node.left: queue.append(node.left)
        if node.right: queue.append(node.right)
\`\`\`

**The Golden Rules:**
1. A Tree is just a specialized Graph without cycles. Recursive solutions (DFS) are usually the cleanest.
2. If the problem asks for level-by-level processing, use BFS with a Queue.
3. If the problem asks for searching/sorting properties, it's likely a BST problem (Inorder traversal yields sorted elements).

---

## Additional Resources

**Video Courses:**
- [NeetCode - Trees](https://youtu.be/OnSn2XEQ4MY) - Best LeetCode problem breakdowns
- [HackerRank - Data Structures: Trees](https://youtu.be/oSWTXtMglKE) - Deep dive into theory

**Articles & Visualizations:**
- [VisuAlgo - BST](https://visualgo.net/en/bst) - See rotations in action!

**Practice Problems:**
- LeetCode 104: Maximum Depth of Binary Tree
- LeetCode 226: Invert Binary Tree
- LeetCode 102: Binary Tree Level Order Traversal
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "tree-q1",
      question: "In a Binary Search Tree, where is the smallest element?",
      options: ["Root", "Leftmost node", "Rightmost node", "Any leaf"],
      correctAnswer: 1,
      explanation:
        "Leftmost node has the smallest value. BST Property: Left < Root < Right. Keep going left from root until no more left child.",
      difficulty: "easy",
    },
    {
      id: "tree-q2",
      question: "Which traversal of BST gives sorted output?",
      options: ["Preorder", "Inorder", "Postorder", "Level order"],
      correctAnswer: 1,
      explanation:
        "Inorder traversal (Left → Root → Right) visits BST nodes in sorted order. First all smaller values, then current, then larger.",
      difficulty: "easy",
    },
    {
      id: "tree-q3",
      question: "What is the time complexity of searching in a balanced BST?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correctAnswer: 1,
      explanation:
        "Balanced BST search is O(log n). Each comparison eliminates half the tree, like binary search. Unbalanced can be O(n).",
      difficulty: "easy",
    },
    {
      id: "tree-q4",
      question: "The maximum number of nodes at level k of a binary tree is:",
      options: ["k", "2k", "2^k", "k²"],
      correctAnswer: 2,
      explanation:
        "Level k has at most 2^k nodes. Level 0 (root) = 1 = 2^0. Level 1 = 2 = 2^1. Level 2 = 4 = 2^2. And so on.",
      difficulty: "medium",
    },
    {
      id: "tree-q5",
      question: "In preorder traversal, the root is visited:",
      options: ["First", "In the middle", "Last", "Randomly"],
      correctAnswer: 0,
      explanation:
        "Preorder: Root → Left → Right. Root is visited FIRST (PRE means before). Useful for copying trees.",
      difficulty: "easy",
    },
    {
      id: "tree-q6",
      question: "A complete binary tree with n nodes has height:",
      options: ["n", "log₂n", "n/2", "sqrt(n)"],
      correctAnswer: 1,
      explanation:
        "Complete binary tree height = floor(log₂n). Because it's filled level by level, height grows logarithmically with nodes.",
      difficulty: "medium",
    },
    {
      id: "tree-q7",
      question: "Which of the following is NOT a valid BST?",
      options: [
        "Root 10 with left child 5 and right child 15",
        "Root 10 with left child 5 and right child 8",
        "Root 10 with left child 3 and right child 20",
        "All are valid",
      ],
      correctAnswer: 1,
      explanation:
        "Root 10 with right child 8 violates BST property (Right must be > Root). 8 < 10 so it cannot be right child.",
      difficulty: "easy",
    },
    {
      id: "tree-q8",
      question: "The worst case time complexity of BST operations occurs when:",
      options: [
        "Tree is complete",
        "Tree is balanced",
        "Tree becomes a linked list (skewed)",
        "Tree has maximum nodes",
      ],
      correctAnswer: 2,
      explanation:
        "Worst case is skewed tree (like linked list). Inserting 1,2,3,4,5 creates right-skewed tree. All operations become O(n).",
      difficulty: "medium",
    },
    {
      id: "tree-q9",
      question: "Level order traversal uses which data structure?",
      options: ["Stack", "Queue", "Linked List", "Array only"],
      correctAnswer: 1,
      explanation:
        "Level order uses Queue (BFS). Process current level, add children to queue. FIFO ensures level-by-level visiting.",
      difficulty: "easy",
    },
    {
      id: "tree-q10",
      question: "AVL tree ensures operations to be O(log n) by:",
      options: [
        "Limiting tree to 10 nodes",
        "Keeping balance factor ≤ 1",
        "Using only left children",
        "Sorting nodes",
      ],
      correctAnswer: 1,
      explanation:
        "AVL maintains balance factor (height difference) ≤ 1 for all nodes. Rotations (LL, RR, LR, RL) restore balance after insert/delete.",
      difficulty: "medium",
    },
    {
      id: "tree-q11",
      question:
        "Which tree data structure is most heavily used for database indexing?",
      options: [
        "Binary Search Tree",
        "AVL Tree",
        "B+ Tree",
        "Threaded Binary Tree",
      ],
      correctAnswer: 2,
      explanation:
        "B+ Trees are ideal for databases because they store all data at the leaf level and link leaves together, making disk reads and range queries extremely fast.",
      difficulty: "medium",
    },
    {
      id: "tree-q12",
      question: "What is the primary purpose of a Threaded Binary Tree?",
      options: [
        "To balance the tree automatically",
        "To allow faster insertion of new nodes",
        "To make inorder traversal faster without recursion or stack",
        "To store more data per node",
      ],
      correctAnswer: 2,
      explanation:
        "Threaded binary trees utilize wasted null pointers to point to inorder predecessors or successors, allowing for fast, stackless inorder traversal.",
      difficulty: "easy",
    },
    {
      id: "tree-q13",
      question: "A Full Binary Tree is one in which every node has:",
      options: [
        "Exactly 2 children",
        "0 or 2 children",
        "At most 1 child",
        "At least 1 child",
      ],
      correctAnswer: 1,
      explanation:
        "In a Full (Proper) Binary Tree, every node has either 0 children (leaf) or exactly 2 children. No node has just 1 child.",
      difficulty: "easy" as const,
    },
    {
      id: "tree-q14",
      question: "The minimum number of nodes in a binary tree of height 4 is:",
      options: ["4", "5", "15", "31"],
      correctAnswer: 1,
      explanation:
        "Min nodes = h + 1 = 4 + 1 = 5. This is a skewed tree with one node per level (like a linked list).",
      difficulty: "easy" as const,
    },
    {
      id: "tree-q15",
      question: "The maximum number of nodes in a binary tree of height 3 is:",
      options: ["7", "8", "15", "16"],
      correctAnswer: 2,
      explanation:
        "Max nodes = 2^(h+1) − 1 = 2^4 − 1 = 15. This is a perfect binary tree where every level is completely filled.",
      difficulty: "easy" as const,
    },
    {
      id: "tree-q16",
      question:
        "The number of distinct binary trees that can be formed with 3 nodes is:",
      options: ["3", "4", "5", "6"],
      correctAnswer: 2,
      explanation:
        "Using Catalan Number: (2×3 C 3) / (3+1) = (6C3)/4 = 20/4 = 5 distinct binary trees.",
      difficulty: "medium" as const,
    },
    {
      id: "tree-q17",
      question:
        "In a binary tree, if there are 5 nodes with degree 2, the number of leaf nodes is:",
      options: ["4", "5", "6", "10"],
      correctAnswer: 2,
      explanation:
        "Leaf nodes = (nodes with degree 2) + 1 = 5 + 1 = 6. This is a fundamental property of binary trees.",
      difficulty: "medium" as const,
    },
    {
      id: "tree-q18",
      question: "A Complete Binary Tree requires:",
      options: [
        "All nodes have 2 children",
        "All levels filled, last level left-to-right",
        "All leaves at same level",
        "Maximum nodes at every level",
      ],
      correctAnswer: 1,
      explanation:
        "Complete binary tree: all levels completely filled except possibly the last, which fills from left to right. It need NOT be a full binary tree.",
      difficulty: "easy" as const,
    },
    {
      id: "tree-q19",
      question:
        "In a perfect binary tree of height 3, number of leaf nodes is:",
      options: ["4", "7", "8", "15"],
      correctAnswer: 2,
      explanation:
        "In a perfect binary tree, leaf nodes = 2^h = 2^3 = 8. All leaves are at the same level (level 3).",
      difficulty: "medium" as const,
    },
    {
      id: "tree-q20",
      question: "Which statement about a Perfect Binary Tree is TRUE?",
      options: [
        "It is Full but not Complete",
        "It is Complete but not Full",
        "It is both Full and Complete",
        "It is neither Full nor Complete",
      ],
      correctAnswer: 2,
      explanation:
        "A Perfect Binary Tree is BOTH Full (every node has 0 or 2 children) AND Complete (all levels filled). It's the most constrained binary tree type.",
      difficulty: "easy" as const,
    },
  ],
};
