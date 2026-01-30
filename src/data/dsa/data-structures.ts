import { LearningModule } from "@/types/learning";

export const dataStructuresModule: LearningModule = {
  id: "data-structures",
  title: "Data Structures",
  description:
    "Foundation of efficient programming - Arrays, Lists, Trees, Graphs",
  status: "in-progress",
  detailedContent: `# Data Structures

Data structures are ways to organize and store data efficiently. Choosing the right data structure is crucial for writing efficient algorithms.

## What You'll Learn

| # | Topic | Skill |
|:--|:------|:------|
| 1 | **Arrays** | Access, insert, delete operations |
| 2 | **Strings** | String manipulation and patterns |
| 3 | **Linked Lists** | Pointer-based dynamic storage |
| 4 | **Stacks** | LIFO operations and applications |
| 5 | **Queues** | FIFO and priority queues |
| 6 | **Trees** | Hierarchical data and traversals |
| 7 | **Heaps** | Priority-based operations |
| 8 | **Graphs** | Network representations |
| 9 | **Hashing** | O(1) average lookup |

---

## 1. Arrays

**What is an Array?**
A contiguous block of memory storing elements of the same type.

\`\`\`python path=null start=null
# Python arrays (lists)
arr = [10, 20, 30, 40, 50]

# Access by index - O(1)
print(arr[2])  # 30

# Modify element - O(1)
arr[2] = 35

# Append - O(1) amortized
arr.append(60)

# Insert at position - O(n)
arr.insert(1, 15)  # [10, 15, 20, 35, 40, 50, 60]

# Delete by index - O(n)
del arr[1]

# Delete by value - O(n)
arr.remove(35)

# Length - O(1)
print(len(arr))
\`\`\`

**Time Complexity:**

| Operation | Time | Notes |
|:----------|:-----|:------|
| Access | O(1) | Direct index access |
| Search | O(n) | Linear scan |
| Insert at end | O(1) | Amortized |
| Insert at middle | O(n) | Shift elements |
| Delete | O(n) | Shift elements |

**2D Arrays (Matrices):**

\`\`\`python path=null start=null
# 2D array
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Access element at row 1, col 2
print(matrix[1][2])  # 6

# Traverse all elements
for i in range(len(matrix)):
    for j in range(len(matrix[0])):
        print(matrix[i][j], end=" ")
    print()
\`\`\`

---

## 2. Strings

**String Operations in Python:**

\`\`\`python path=null start=null
s = "hello world"

# Length - O(1) in Python
print(len(s))  # 11

# Access character - O(1)
print(s[0])  # 'h'

# Slicing - O(k) where k is slice length
print(s[0:5])  # 'hello'

# Concatenation - O(n+m)
s2 = s + "!"

# Find substring - O(n*m)
print(s.find("world"))  # 6

# Replace - O(n)
s3 = s.replace("world", "python")

# Split - O(n)
words = s.split(" ")  # ['hello', 'world']

# Join - O(n)
joined = "-".join(words)  # 'hello-world'
\`\`\`

**Common String Problems:**
- Reverse a string
- Check palindrome
- Anagram detection
- Pattern matching

---

## 3. Linked Lists

**Singly Linked List:**

\`\`\`python path=null start=null
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node
    
    def prepend(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
    
    def delete(self, data):
        if self.head and self.head.data == data:
            self.head = self.head.next
            return
        current = self.head
        while current and current.next:
            if current.next.data == data:
                current.next = current.next.next
                return
            current = current.next
    
    def display(self):
        elements = []
        current = self.head
        while current:
            elements.append(current.data)
            current = current.next
        print(" -> ".join(map(str, elements)))

# Usage
ll = LinkedList()
ll.append(1)
ll.append(2)
ll.append(3)
ll.display()  # 1 -> 2 -> 3
\`\`\`

**Time Complexity:**

| Operation | Array | Linked List |
|:----------|:------|:------------|
| Access | O(1) | O(n) |
| Search | O(n) | O(n) |
| Insert at head | O(n) | O(1) |
| Insert at tail | O(1) | O(n)* |
| Delete | O(n) | O(1)** |

*O(1) with tail pointer
**After finding the node

---

## 4. Stacks

**Stack = LIFO (Last In, First Out)**

\`\`\`python path=null start=null
class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, item):
        self.items.append(item)
    
    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        return None
    
    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        return None
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)

# Usage
stack = Stack()
stack.push(10)
stack.push(20)
stack.push(30)
print(stack.pop())   # 30
print(stack.peek())  # 20
\`\`\`

**Applications:**
- Function call stack (recursion)
- Undo/Redo operations
- Balanced parentheses check
- Expression evaluation (postfix)
- Browser back button

---

## 5. Queues

**Queue = FIFO (First In, First Out)**

\`\`\`python path=null start=null
from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()
    
    def enqueue(self, item):
        self.items.append(item)
    
    def dequeue(self):
        if not self.is_empty():
            return self.items.popleft()
        return None
    
    def front(self):
        if not self.is_empty():
            return self.items[0]
        return None
    
    def is_empty(self):
        return len(self.items) == 0

# Usage
queue = Queue()
queue.enqueue(10)
queue.enqueue(20)
queue.enqueue(30)
print(queue.dequeue())  # 10
print(queue.front())    # 20
\`\`\`

**Priority Queue (using heapq):**

\`\`\`python path=null start=null
import heapq

# Min heap (smallest first)
pq = []
heapq.heappush(pq, 30)
heapq.heappush(pq, 10)
heapq.heappush(pq, 20)

print(heapq.heappop(pq))  # 10 (smallest)
print(heapq.heappop(pq))  # 20
\`\`\`

---

## 6. Trees

**Binary Tree:**

\`\`\`python path=null start=null
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

# Tree Traversals
def inorder(root):
    """Left -> Root -> Right"""
    if root:
        inorder(root.left)
        print(root.val, end=" ")
        inorder(root.right)

def preorder(root):
    """Root -> Left -> Right"""
    if root:
        print(root.val, end=" ")
        preorder(root.left)
        preorder(root.right)

def postorder(root):
    """Left -> Right -> Root"""
    if root:
        postorder(root.left)
        postorder(root.right)
        print(root.val, end=" ")

# Level order (BFS)
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
\`\`\`

**Binary Search Tree (BST):**

\`\`\`python path=null start=null
class BST:
    def __init__(self):
        self.root = None
    
    def insert(self, val):
        self.root = self._insert(self.root, val)
    
    def _insert(self, node, val):
        if not node:
            return TreeNode(val)
        if val < node.val:
            node.left = self._insert(node.left, val)
        else:
            node.right = self._insert(node.right, val)
        return node
    
    def search(self, val):
        return self._search(self.root, val)
    
    def _search(self, node, val):
        if not node or node.val == val:
            return node
        if val < node.val:
            return self._search(node.left, val)
        return self._search(node.right, val)

# BST property: left < root < right
# Search/Insert/Delete: O(log n) average, O(n) worst
\`\`\`

---

## 7. Heaps

**Min Heap Properties:**
- Parent ≤ Children
- Complete binary tree
- Root is minimum

\`\`\`python path=null start=null
import heapq

# Min Heap
min_heap = []
heapq.heappush(min_heap, 5)
heapq.heappush(min_heap, 3)
heapq.heappush(min_heap, 7)
heapq.heappush(min_heap, 1)

print(heapq.heappop(min_heap))  # 1
print(heapq.heappop(min_heap))  # 3

# Max Heap (negate values)
max_heap = []
heapq.heappush(max_heap, -5)
heapq.heappush(max_heap, -3)
heapq.heappush(max_heap, -7)

print(-heapq.heappop(max_heap))  # 7 (largest)

# Heapify existing list - O(n)
arr = [5, 3, 7, 1, 9]
heapq.heapify(arr)  # Now arr is a valid min-heap
\`\`\`

**Time Complexity:**
- Insert: O(log n)
- Extract min/max: O(log n)
- Peek min/max: O(1)
- Heapify: O(n)

---

## 8. Graphs

**Graph Representations:**

\`\`\`python path=null start=null
# Adjacency List (most common)
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

# Adjacency Matrix
#     A  B  C  D  E  F
# A [[0, 1, 1, 0, 0, 0],
# B  [1, 0, 0, 1, 1, 0],
# C  [1, 0, 0, 0, 0, 1],
# D  [0, 1, 0, 0, 0, 0],
# E  [0, 1, 0, 0, 0, 1],
# F  [0, 0, 1, 0, 1, 0]]

# BFS Traversal
from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    
    while queue:
        node = queue.popleft()
        print(node, end=" ")
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

# DFS Traversal
def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(node)
    print(node, end=" ")
    
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

bfs(graph, 'A')  # A B C D E F
print()
dfs(graph, 'A')  # A B D E F C
\`\`\`

---

## 9. Hashing

**Hash Table (Dictionary in Python):**

\`\`\`python path=null start=null
# Python dict is a hash table
hash_map = {}

# Insert - O(1) average
hash_map["name"] = "Alice"
hash_map["age"] = 25
hash_map["city"] = "NYC"

# Access - O(1) average
print(hash_map["name"])  # Alice

# Check key exists - O(1)
if "age" in hash_map:
    print("Age exists")

# Delete - O(1)
del hash_map["city"]

# Get with default - O(1)
print(hash_map.get("country", "Unknown"))  # Unknown
\`\`\`

**Collision Handling:**
1. **Chaining**: Store multiple items at same index using list
2. **Open Addressing**: Find next empty slot (linear/quadratic probing)

**Hash Set:**

\`\`\`python path=null start=null
# Set for unique elements
seen = set()

# Add - O(1)
seen.add(10)
seen.add(20)
seen.add(10)  # Duplicate ignored

print(len(seen))  # 2

# Check membership - O(1)
print(10 in seen)  # True
print(30 in seen)  # False

# Remove - O(1)
seen.remove(10)
\`\`\`

---

## TL;DR - Quick Reference

| Structure | Access | Search | Insert | Delete | Use Case |
|:----------|:-------|:-------|:-------|:-------|:---------|
| Array | O(1) | O(n) | O(n) | O(n) | Random access |
| Linked List | O(n) | O(n) | O(1)* | O(1)* | Frequent inserts |
| Stack | O(n) | O(n) | O(1) | O(1) | LIFO operations |
| Queue | O(n) | O(n) | O(1) | O(1) | FIFO operations |
| Hash Table | O(1) | O(1) | O(1) | O(1) | Key-value lookup |
| BST | O(log n) | O(log n) | O(log n) | O(log n) | Sorted data |
| Heap | O(1)** | O(n) | O(log n) | O(log n) | Priority queue |

*At known position
**Min/max only
    `,
  subModules: [],
  practiceQuiz: [
    {
      id: "ds-q1",
      question:
        "What is the time complexity of accessing an element in an array by index?",
      options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
      correctAnswer: 1,
      explanation:
        "Array access by index is O(1).\n\nWhy? Arrays store elements in contiguous memory. Given index i:\n• Memory address = base + (i × element_size)\n• Direct calculation = constant time",
      difficulty: "easy",
    },
    {
      id: "ds-q2",
      question: "Which data structure follows LIFO principle?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      correctAnswer: 1,
      explanation:
        "Stack = LIFO (Last In, First Out)\n\n• Last element pushed is first to be popped\n• Like a stack of plates\n\nQueue = FIFO (First In, First Out)",
      difficulty: "easy",
    },
    {
      id: "ds-q3",
      question: "In a Binary Search Tree, where is the smallest element?",
      options: ["Root", "Leftmost node", "Rightmost node", "Any leaf"],
      correctAnswer: 1,
      explanation:
        "BST Property: left < root < right\n\n• Keep going left from root\n• Leftmost node has smallest value\n• Similarly, rightmost has largest",
      difficulty: "easy",
    },
    {
      id: "ds-q4",
      question:
        "What is the average time complexity for search in a hash table?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
      correctAnswer: 2,
      explanation:
        "Hash table search is O(1) average.\n\nStep-by-step:\n• Compute hash(key) → index\n• Access array[index] directly\n\nWorst case O(n) when all keys collide.",
      difficulty: "easy",
    },
    {
      id: "ds-q5",
      question: "Which traversal of BST gives sorted output?",
      options: ["Preorder", "Inorder", "Postorder", "Level order"],
      correctAnswer: 1,
      explanation:
        "Inorder traversal: Left → Root → Right\n\nFor BST:\n• Visit all smaller elements (left) first\n• Then current node\n• Then larger elements (right)\n\nResult: sorted ascending order!",
      difficulty: "easy",
    },
    {
      id: "ds-q6",
      question: "Inserting at the head of a singly linked list takes:",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      correctAnswer: 0,
      explanation:
        "Insert at head is O(1):\n\n• Create new node\n• Point new_node.next to current head\n• Update head to new_node\n\nNo traversal needed!",
      difficulty: "easy",
    },
    {
      id: "ds-q7",
      question: "A min-heap guarantees that:",
      options: [
        "Left child < Right child",
        "Parent ≤ Children",
        "Tree is sorted",
        "All leaves are equal",
      ],
      correctAnswer: 1,
      explanation:
        "Min-heap property: Parent ≤ Children\n\n• Root is always minimum\n• Each subtree is also a min-heap\n• No ordering between siblings\n\nMax-heap: Parent ≥ Children",
      difficulty: "medium",
    },
    {
      id: "ds-q8",
      question: "Which graph traversal uses a queue?",
      options: ["DFS", "BFS", "Both", "Neither"],
      correctAnswer: 1,
      explanation:
        "BFS uses Queue, DFS uses Stack\n\nBFS (Breadth-First):\n• Visit level by level\n• Queue: FIFO maintains level order\n\nDFS (Depth-First):\n• Go deep before wide\n• Stack (or recursion call stack)",
      difficulty: "easy",
    },
    {
      id: "ds-q9",
      question: "Heapify an array of n elements takes:",
      options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
      correctAnswer: 2,
      explanation:
        "Heapify is O(n), not O(n log n)!\n\nMath proof:\n• Bottom-up approach\n• Most nodes are near leaves (cheap to heapify)\n• Sum of work converges to O(n)",
      difficulty: "medium",
    },
    {
      id: "ds-q10",
      question: "Deque allows insertion/deletion at:",
      options: ["Front only", "Rear only", "Both ends", "Middle only"],
      correctAnswer: 2,
      explanation:
        "Deque = Double-Ended Queue\n\nOperations:\n• append() - add at rear\n• appendleft() - add at front\n• pop() - remove from rear\n• popleft() - remove from front\n\nAll O(1) time!",
      difficulty: "easy",
    },
  ],
};
