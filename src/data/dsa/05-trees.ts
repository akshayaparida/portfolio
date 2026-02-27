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

A Binary Search Tree is a node-based binary tree with the following properties:

1. The **left subtree** of a node contains only nodes with keys **less than** the node's key.
2. The **right subtree** of a node contains only nodes with keys **greater than** the node's key.
3. Both left and right subtrees must **themselves be BSTs**.

**The Golden Rule:** Left < Root < Right

This ordering allows efficient **searching**, **insertion**, and **deletion**.

\`\`\`text
        50
       /  \\
     30    70
    /  \\  /  \\
   20  40 60  80

   - All values left of 50 are < 50
   - All values right of 50 are > 50
   - This makes searching FAST!
\`\`\`

| Operation | Average Case | Worst Case (Skewed) |
|:----------|:-------------|:--------------------|
| Search    | O(log n)     | O(n)                |
| Insert    | O(log n)     | O(n)                |
| Delete    | O(log n)     | O(n)                |

> All operations depend on **height h** of the tree → O(h). Balanced = O(log n), Skewed = O(n).

### BST Insertion

**Algorithm Steps:**
1. Start from root.
2. Compare value X with current node.
   - If X < node → move to **left** subtree.
   - If X > node → move to **right** subtree.
3. Continue until reaching a **NULL** (leaf position).
4. Insert the new node there.

> **Key insight:** New keys are **always inserted at a leaf position** while maintaining BST property.

\`\`\`python path=null start=null
class BST:
    def __init__(self):
        self.root = None
    
    def insert(self, val):
        self.root = self._insert(self.root, val)
    
    def _insert(self, node, val):
        # Base case: empty spot found! Insert here.
        if not node:
            return TreeNode(val)
        
        # Decide: go left or right?
        if val < node.val:
            node.left = self._insert(node.left, val)
        elif val > node.val:
            node.right = self._insert(node.right, val)
        
        return node
    
    def search(self, val):
        return self._search(self.root, val)
    
    def _search(self, node, val):
        if not node:
            return False  # Not found
        if node.val == val:
            return True   # Found!
        
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

### BST Deletion (3 Cases)

Deletion is the trickiest BST operation. There are **3 cases**:

#### Case 1: Deleting a Leaf Node
Simply **remove** the node. No children to worry about.

\`\`\`text
  Delete 20:
      30              30
     /  \\            /  \\
   20    40   →    [X]   40

  Node 20 is a leaf → just remove it!
\`\`\`

#### Case 2: Deleting a Node with One Child
**Replace** the node with its child.

\`\`\`text
  Delete 20 (has one child 10):
      30              30
     /  \\            /  \\
   20    40   →    10    40
   /
  10

  Node 20 replaced by its only child 10.
\`\`\`

#### Case 3: Deleting a Node with Two Children
1. Find the **inorder successor** (minimum value in right subtree).
2. **Copy** its value into the node to be deleted.
3. **Delete** the inorder successor node (which is now a duplicate).

\`\`\`text
  Delete 30 (has two children):
      30                 35
     /  \\               /  \\
   20    40    →      20    40
        /  \\              /  \\
      35    50           37    50
        \\
        37

  Step 1: Inorder successor of 30 = 35 (min in right subtree)
  Step 2: Copy 35 into node 30's position
  Step 3: Delete original 35 (Case 2: has one child 37)
\`\`\`

> **Note:** Inorder **predecessor** (maximum in left subtree) can also be used instead of inorder successor.

### Inorder Successor

The **inorder successor** of a node is the node with the **smallest value greater** than the given node. It is found by going to the **right subtree** and then going **left as far as possible**.

\`\`\`python path=null start=null
def find_min(node):
    """Find minimum value node (leftmost node)"""
    current = node
    while current.left:
        current = current.left
    return current

# Inorder successor of node X = find_min(X.right)
\`\`\`

### BST Deletion Implementation

\`\`\`python path=null start=null
def delete(self, val):
    self.root = self._delete(self.root, val)

def _delete(self, node, val):
    if not node:
        return node
    
    # Step 1: Find the node
    if val < node.val:
        node.left = self._delete(node.left, val)
    elif val > node.val:
        node.right = self._delete(node.right, val)
    else:
        # Found the node to delete!

        # Case 1 & 2: No child or one child
        if not node.left:
            return node.right
        elif not node.right:
            return node.left
        
        # Case 3: Two children
        # Find inorder successor (min in right subtree)
        successor = find_min(node.right)
        node.val = successor.val
        # Delete the inorder successor
        node.right = self._delete(node.right, successor.val)
    
    return node
\`\`\`

### BST Construction Example

Insert: **30, 20, 10, 15, 25, 23, 39, 35, 42**

\`\`\`text
  Step-by-step:
  Insert 30 → root
  Insert 20 → left of 30
  Insert 10 → left of 20
  Insert 15 → right of 10
  Insert 25 → right of 20
  Insert 23 → left of 25
  Insert 39 → right of 30
  Insert 35 → left of 39
  Insert 42 → right of 39

  Final BST:
              30
            /    \\
          20      39
         /  \\   /   \\
       10   25  35   42
         \\  /
         15 23
\`\`\`

> **IMPORTANT FACT:** Inorder traversal of this BST gives **sorted order**:
> 10, 15, 20, 23, 25, 30, 35, 39, 42

### Why BST is Fast

Each comparison **eliminates half** the remaining nodes!
- Similar to binary search
- O(log n) average case

**BUT** if you insert sorted data (1,2,3,4,5), it becomes a "linked list" and O(n)!

\`\`\`text
  Balanced BST:        Skewed BST (sorted insert):
       30                  1
      /  \\                  \\
    20    40                 2
   /  \\                      \\
  10   25                     3
                               \\
  Height = 2                    4
  Search = O(log n)              \\
                                  5
                             Height = 4
                             Search = O(n) ← disaster!
\`\`\`

> **Next intellectual jump:** AVL Trees (self-balancing BST) solve this skewing problem. That's where trees stop misbehaving!

---

## 5. AVL Tree (Self-Balancing BST)

AVL Tree = **Self-Balanced BST** (named after inventors Adelson-Velsky and Landis)

> BST adds **order**. AVL adds **discipline**. BST says "keep values sorted." AVL says "also keep the tree **short**." Short trees = fast searches.

A binary tree is an AVL tree if:
1. Left and right subtrees are **themselves AVL trees**.
2. **| hL − hR | ≤ 1** for every node (height difference at most 1).

### Balance Factor

\`\`\`text
Balance Factor = Height of Left Subtree − Height of Right Subtree

Allowed values: -1, 0, +1

  +1 → Left heavy (left subtree is taller)
   0 → Perfectly balanced
  -1 → Right heavy (right subtree is taller)

If any node has BF outside {-1, 0, +1} → TREE IS UNBALANCED!
\`\`\`

\`\`\`text
  AVL Tree (balanced):        NOT AVL (unbalanced):
       [30] BF=0                  [30] BF=+2  ← violation!
      /    \\                     /
   [20]    [40]              [20] BF=+1
   BF=0    BF=0             /
                          [10] BF=0

  All BFs are -1, 0, +1      Node 30 has BF = 2 → needs rotation!
\`\`\`

### Rotations (To Rebalance)

When imbalance occurs, **rotations** are performed at the nearest ancestor whose balance factor becomes **±2**. There are **4 types**:

#### 1. LL Rotation (Left-Left Case)

**When:** New node inserted in **left subtree of left child**.
**Fix:** Single **Right Rotation** (clockwise).

\`\`\`text
  Before (LL case):        After (Right Rotation):
       [30] BF=+2              [20] BF=0
      /                       /    \\
   [20] BF=+1              [10]   [30]
   /                        BF=0   BF=0
  [10] BF=0

  Node 20 becomes the new root of this subtree.
\`\`\`

#### 2. RR Rotation (Right-Right Case)

**When:** New node inserted in **right subtree of right child**.
**Fix:** Single **Left Rotation** (anticlockwise).

\`\`\`text
  Before (RR case):        After (Left Rotation):
  [10] BF=-2                   [20] BF=0
     \\                        /    \\
    [20] BF=-1              [10]   [30]
       \\                    BF=0   BF=0
      [30] BF=0

  Node 20 becomes the new root of this subtree.
\`\`\`

#### 3. LR Rotation (Left-Right Case)

**When:** New node inserted in **right subtree of left child**.
**Fix:** Two rotations:
1. **Left rotation** on the left child
2. **Right rotation** on the unbalanced node

\`\`\`text
  Before (LR case):       After Step 1:          After Step 2:
       [30] BF=+2           [30] BF=+2             [20] BF=0
      /                    /                       /    \\
   [10] BF=-1           [20] BF=+1              [10]   [30]
      \\                 /                        BF=0   BF=0
     [20] BF=0        [10] BF=0

  Step 1: Left rotate at 10    Step 2: Right rotate at 30
\`\`\`

#### 4. RL Rotation (Right-Left Case)

**When:** New node inserted in **left subtree of right child**.
**Fix:** Two rotations:
1. **Right rotation** on the right child
2. **Left rotation** on the unbalanced node

\`\`\`text
  Before (RL case):       After Step 1:          After Step 2:
  [10] BF=-2              [10] BF=-2               [20] BF=0
     \\                       \\                     /    \\
    [30] BF=+1              [20] BF=-1           [10]   [30]
    /                          \\                  BF=0   BF=0
  [20] BF=0                  [30] BF=0

  Step 1: Right rotate at 30   Step 2: Left rotate at 10
\`\`\`

### Quick Rotation Detection (for MCQs!)

\`\`\`text
  How to detect which rotation is needed:

  1. Find the first unbalanced ancestor (BF = ±2)
  2. Check the PATH from that ancestor to the new node:

     Path goes Left  → Left  = LL → Single Right Rotation
     Path goes Right → Right = RR → Single Left Rotation
     Path goes Left  → Right = LR → Left then Right Rotation
     Path goes Right → Left  = RL → Right then Left Rotation
\`\`\`

### Insertion in AVL Tree

\`\`\`text
  Steps:
  1. Insert node as in normal BST (at leaf position)
  2. Walk back up to root, updating heights of ancestors
  3. Compute balance factor at each ancestor
  4. If any node has BF = ±2 → perform the appropriate rotation
  5. Done! Tree is balanced again.
\`\`\`

### Time Complexity

| Operation | BST (worst) | AVL (always) |
|:----------|:------------|:-------------|
| Search    | O(n)        | **O(log n)** |
| Insert    | O(n)        | **O(log n)** |
| Delete    | O(n)        | **O(log n)** |

> **The guarantee:** BST can degrade to O(n) with skewed input. AVL **guarantees** O(log n) for ALL operations. That guarantee is the entire reason AVL exists.

> **Next upgrade:** Red-Black Trees — same self-balancing idea, different balancing philosophy (less strict, fewer rotations).

---

## 6. B-Tree (m-way Search Tree)

B-Trees are extended Binary Search Trees specialized in **m-way searching**. Instead of 2 children (binary), each node can have up to **m children** and store multiple keys.

> **The deeper insight:** AVL optimized height in **RAM**. B-Tree optimizes height for **disk**. When datasets are huge and RAM is small compared to disk, B-Trees become kings.

### Properties of B-Tree (Order = m)

1. Every node can have at most **m children** and **(m − 1) keys**.
2. Every node (except root and leaf) must have at least **⌈m/2⌉ children**.
3. Root must have at least **2 children** (if not a leaf).
4. **All leaves** must be at the **same level**.
5. Data is always stored in **sorted order**.

### Key Formulas

\`\`\`text
For a B-Tree of order m:

  Maximum keys per node   = m − 1
  Minimum keys per node   = ⌈m/2⌉ − 1
  Maximum children        = m
  Minimum children        = ⌈m/2⌉

  Example: Order m = 4
  ┌──────────────────┬───────┐
  │ Property         │ Value │
  ├──────────────────┼───────┤
  │ Max keys         │ 3     │
  │ Min keys         │ 1     │
  │ Max children     │ 4     │
  │ Min children     │ 2     │
  └──────────────────┴───────┘
\`\`\`

\`\`\`text
  B-Tree of order 3 (2-3 Tree):

       [20 | 40]            ← root has 2 keys, 3 children
      /    |    \\
  [10]  [25|30]  [50|60]    ← leaves at same level

  Each internal node: 1 to 2 keys, 2 to 3 children
  All leaves at level 1
  Keys sorted within each node
\`\`\`

### Why B-Tree? (Disk Access)

\`\`\`text
  Problem: Disk access is SLOW compared to RAM

  Binary tree (height ~20 for 1M nodes) = 20 disk reads
  B-Tree (order 100, same 1M nodes)     = ~3 disk reads!

  Fewer levels = fewer disk accesses = MUCH faster!
\`\`\`

### Operations

| Operation | Time Complexity |
|:----------|:---------------|
| Search    | O(log n)       |
| Insert    | O(log n)       |
| Delete    | O(log n)       |

---

## 7. B+ Tree

B+ Trees are extensions of B-Trees designed for even more efficient **sequential access**.

### Key Difference: B-Tree vs B+ Tree

\`\`\`text
  B-Tree:                    B+ Tree:
  ┌────────┐                 ┌────────┐
  │ 20|40  │ ← has data     │ 20|40  │ ← keys ONLY (no data)
  ├────────┤                 ├────────┤
  │ 10|30  │ ← has data     │ 10|30  │ ← keys ONLY
  └────────┘                 └────────┘
                                  ↓
                             ┌────────────────────┐
                             │ Leaf nodes have ALL │
                             │ data + linked list  │
                             └────────────────────┘

  B-Tree:  Data in internal + leaf nodes
  B+ Tree: Data ONLY in leaf nodes
           Leaves connected as LINKED LIST
\`\`\`

### Properties of B+ Tree

1. Every node (except root): max **m children** and **(m − 1) keys**, min **⌈m/2⌉ children**.
2. Root has at least **2 children** and at least **1 search key**.
3. All leaves at the **same level**.
4. **Sorted order** maintained.
5. **Leaf nodes linked** to next leaf node (linked list).

### Why B+ Tree?

\`\`\`text
  When main memory is limited:
  • Internal nodes → stored in main memory (small, keys only)
  • Leaf nodes     → stored in secondary storage (large, has data)

  Benefits:
  1. Internal nodes are SMALLER (no data) → more keys fit in RAM
  2. Linked leaves → efficient RANGE QUERIES (scan left to right)
  3. All searches end at leaf level → uniform access time
\`\`\`

### B-Tree vs B+ Tree Summary

| Feature | B-Tree | B+ Tree |
|:--------|:-------|:--------|
| Data storage | Internal + Leaf nodes | **Leaf nodes only** |
| Leaf linking | No | **Yes (linked list)** |
| Range queries | Slower | **Faster** |
| Search path | May end at any level | **Always ends at leaf** |
| Internal node size | Larger (has data) | **Smaller (keys only)** |
| Used in | File systems | **Databases (MySQL, PostgreSQL)** |

| Operation | Time Complexity |
|:----------|:---------------|
| Search    | O(log n)       |
| Insert    | O(log n)       |
| Delete    | O(log n)       |

> **The evolution:** BST → AVL (balanced in RAM) → B-Tree (balanced for disk) → B+ Tree (optimized sequential disk access + databases)

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
    {
      id: "tree-q21",
      question:
        "When deleting a node with TWO children from a BST, we replace it with its:",
      options: [
        "Left child",
        "Right child",
        "Inorder successor or predecessor",
        "Parent node",
      ],
      correctAnswer: 2,
      explanation:
        "For a node with two children, we find its inorder successor (min in right subtree) or inorder predecessor (max in left subtree), copy the value, then delete the successor/predecessor.",
      difficulty: "easy" as const,
    },
    {
      id: "tree-q22",
      question: "The inorder successor of a node in a BST is:",
      options: [
        "The parent of the node",
        "The maximum value in the left subtree",
        "The minimum value in the right subtree",
        "The root of the tree",
      ],
      correctAnswer: 2,
      explanation:
        "Inorder successor = smallest value greater than the node = minimum value in the right subtree. Found by going right once, then left as far as possible.",
      difficulty: "easy" as const,
    },
    {
      id: "tree-q23",
      question:
        "If we insert keys 30, 20, 10 into an empty BST, the resulting tree is:",
      options: [
        "Balanced with 30 as root",
        "Right-skewed",
        "Left-skewed",
        "A perfect binary tree",
      ],
      correctAnswer: 2,
      explanation:
        "Inserting in decreasing order (30, 20, 10) creates a left-skewed tree: 30 → 20 → 10. Each new key is smaller, so it always goes left.",
      difficulty: "easy" as const,
    },
    {
      id: "tree-q24",
      question: "Deleting a leaf node from a BST requires:",
      options: [
        "Finding the inorder successor",
        "Replacing it with its child",
        "Simply removing the node",
        "Rebalancing the entire tree",
      ],
      correctAnswer: 2,
      explanation:
        "A leaf node has no children. Deletion is simplest — just remove it (set parent's pointer to NULL). No restructuring needed.",
      difficulty: "easy" as const,
    },
    {
      id: "tree-q25",
      question:
        "The inorder traversal of a BST with nodes {50, 30, 70, 20, 40} gives:",
      options: [
        "50 30 70 20 40",
        "20 30 40 50 70",
        "70 50 40 30 20",
        "30 20 50 40 70",
      ],
      correctAnswer: 1,
      explanation:
        "Inorder traversal of a BST ALWAYS produces sorted (ascending) output. So the answer is: 20, 30, 40, 50, 70.",
      difficulty: "easy" as const,
    },
    {
      id: "tree-q26",
      question:
        "If a BST becomes completely right-skewed, searching for the largest element takes:",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 2,
      explanation:
        "In a right-skewed BST (like a linked list), the largest element is at the bottom. You must traverse all n nodes sequentially, making it O(n).",
      difficulty: "medium" as const,
    },
    {
      id: "tree-q27",
      question:
        "When deleting a node with ONE child from a BST, the correct approach is:",
      options: [
        "Replace the node with its inorder successor",
        "Replace the node with its child",
        "Delete the child first, then the node",
        "Rotate the subtree",
      ],
      correctAnswer: 1,
      explanation:
        "For a node with one child, simply replace the node with its only child. The child takes over the node's position, maintaining BST property.",
      difficulty: "easy" as const,
    },
    {
      id: "tree-q28",
      question:
        "After inserting 30, 20, 10, 15, 25, 23, 39, 35, 42 into an empty BST, what is the right child of 20?",
      options: ["10", "23", "25", "30"],
      correctAnswer: 2,
      explanation:
        "Building the BST: 30 is root, 20 goes left of 30. Then 10 goes left of 20, 15 right of 10, 25 right of 20. So the right child of 20 is 25.",
      difficulty: "medium" as const,
    },
    {
      id: "tree-q29",
      question: "The balance factor of an AVL tree node is defined as:",
      options: [
        "Height of right subtree − Height of left subtree",
        "Height of left subtree − Height of right subtree",
        "Number of nodes in left − Number of nodes in right",
        "Depth of left subtree + Depth of right subtree",
      ],
      correctAnswer: 1,
      explanation:
        "Balance Factor = Height of Left Subtree − Height of Right Subtree. Allowed values are -1, 0, +1. Any other value means the tree needs rebalancing.",
      difficulty: "easy" as const,
    },
    {
      id: "tree-q30",
      question:
        "If nodes 10, 20, 30 are inserted into an empty AVL tree, which rotation is needed?",
      options: [
        "LL Rotation",
        "RR Rotation",
        "LR Rotation",
        "No rotation needed",
      ],
      correctAnswer: 1,
      explanation:
        "Inserting 10, 20, 30 in order creates a right-skewed path (Right→Right). Node 10 gets BF = -2. Path is Right-Right → RR case → Single Left Rotation. Result: 20 becomes root with 10 left, 30 right.",
      difficulty: "medium" as const,
    },
    {
      id: "tree-q31",
      question: "An LR rotation in AVL tree is a combination of:",
      options: [
        "Two right rotations",
        "Two left rotations",
        "Left rotation on left child, then right rotation on root",
        "Right rotation on right child, then left rotation on root",
      ],
      correctAnswer: 2,
      explanation:
        "LR (Left-Right) case: the new node is in the right subtree of the left child. Fix: first Left rotate the left child (to convert to LL), then Right rotate the unbalanced node.",
      difficulty: "medium" as const,
    },
    {
      id: "tree-q32",
      question: "The main advantage of AVL tree over BST is:",
      options: [
        "AVL uses less memory",
        "AVL guarantees O(log n) for all operations",
        "AVL supports more data types",
        "AVL does not need comparisons",
      ],
      correctAnswer: 1,
      explanation:
        "BST can degrade to O(n) with skewed input. AVL guarantees O(log n) for search, insert, and delete by maintaining balance factor ≤ 1 at every node through rotations.",
      difficulty: "easy" as const,
    },
    {
      id: "tree-q33",
      question:
        "Which of the following balance factor values indicates an unbalanced AVL node?",
      options: ["-1", "0", "+1", "+2"],
      correctAnswer: 3,
      explanation:
        "AVL allows only -1, 0, +1 as balance factors. A value of +2 (or -2) means the node is unbalanced and a rotation is required to restore balance.",
      difficulty: "easy" as const,
    },
    {
      id: "tree-q34",
      question:
        "Inserting keys 30, 10, 20 into an empty AVL tree requires which rotation?",
      options: ["LL Rotation", "RR Rotation", "LR Rotation", "RL Rotation"],
      correctAnswer: 2,
      explanation:
        "30 is root, 10 goes left, 20 goes right of 10. Node 30 gets BF = +2. Path from 30 to new node: Left (to 10) → Right (to 20) = LR case. Fix: Left rotate at 10, then Right rotate at 30. Result: 20 is root.",
      difficulty: "medium" as const,
    },
    {
      id: "tree-q35",
      question:
        "In a B-Tree of order 5, the maximum number of keys a node can have is:",
      options: ["4", "5", "6", "3"],
      correctAnswer: 0,
      explanation:
        "Maximum keys = m − 1 = 5 − 1 = 4. A B-Tree of order m can store at most (m − 1) keys per node.",
      difficulty: "easy" as const,
    },
    {
      id: "tree-q36",
      question:
        "In a B-Tree of order 6, the minimum number of children a non-root internal node must have is:",
      options: ["2", "3", "4", "6"],
      correctAnswer: 1,
      explanation:
        "Minimum children = ⌈m/2⌉ = ⌈6/2⌉ = 3. Non-root, non-leaf nodes must have at least ⌈m/2⌉ children.",
      difficulty: "medium" as const,
    },
    {
      id: "tree-q37",
      question: "The primary reason B-Trees are used in databases is:",
      options: [
        "They use less memory than BST",
        "They minimize disk accesses due to low height",
        "They are easier to implement than AVL",
        "They support only integer keys",
      ],
      correctAnswer: 1,
      explanation:
        "B-Trees have very low height because each node stores multiple keys and has many children. Low height = fewer disk reads, which is critical for database performance.",
      difficulty: "easy" as const,
    },
    {
      id: "tree-q38",
      question: "In a B+ Tree, data records are stored in:",
      options: [
        "Root node only",
        "Internal nodes only",
        "Leaf nodes only",
        "All nodes",
      ],
      correctAnswer: 2,
      explanation:
        "In B+ Trees, internal nodes store only keys (for searching). All actual data records are stored in leaf nodes, which are connected as a linked list.",
      difficulty: "easy" as const,
    },
    {
      id: "tree-q39",
      question: "What makes B+ Tree better than B-Tree for range queries?",
      options: [
        "B+ Tree has fewer nodes",
        "B+ Tree leaf nodes are connected as a linked list",
        "B+ Tree has smaller height",
        "B+ Tree stores data in root",
      ],
      correctAnswer: 1,
      explanation:
        "B+ Tree leaf nodes are linked together. For range queries (e.g., 'find all values between 10 and 50'), you just find the start leaf and scan sequentially through the linked list.",
      difficulty: "easy" as const,
    },
    {
      id: "tree-q40",
      question: "Which property is TRUE for B-Trees but NOT for B+ Trees?",
      options: [
        "All leaves are at the same level",
        "Data can be found in internal nodes",
        "Keys are stored in sorted order",
        "All operations are O(log n)",
      ],
      correctAnswer: 1,
      explanation:
        "In B-Trees, data is stored in BOTH internal and leaf nodes. In B+ Trees, data is stored ONLY in leaf nodes. Internal nodes in B+ Trees contain only keys for navigation.",
      difficulty: "medium" as const,
    },
  ],
};
