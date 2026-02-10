import { LearningModule } from "@/types/learning";

export const treesModule: LearningModule = {
  id: "04-trees",
  title: "4. Trees",
  description: "Hierarchical data structures - Binary Trees, BST, AVL, B-Trees",
  status: "in-progress",
  tags: ["Data Structure"],
  detailedContent: `# Trees

> **Data Structure Module** - Learn hierarchical data organization

---

## What You'll Learn

1. Understand tree terminology (root, leaf, height, depth)
2. Implement Binary Trees and Binary Search Trees
3. Master all 4 tree traversal methods
4. Know when to use balanced trees (AVL)

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

**Rule:** Each node has AT MOST 2 children (left and right)

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
  ],
};
