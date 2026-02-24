import { LearningModule } from "@/types/learning";

export const dsIntroductionModule: LearningModule = {
  id: "00b-ds-introduction",
  title: "Introduction to Data Structures",
  description:
    "What are Data Structures? Types, Classification & Why they matter",
  status: "in-progress",
  tags: ["Foundation"],
  detailedContent: `# Introduction to Data Structures

> **Foundation Module** - Understand WHAT data structures are before learning them

---

## What You'll Learn

1. What is a Data Structure?
2. Why Data Structures matter
3. Classification of Data Structures
4. Abstract Data Types (ADT)
5. How to choose the right Data Structure

---

## 1. What is a Data Structure?

A **data structure** is a way of **organizing and storing data** so it can be accessed and modified efficiently.

Think of it like organizing a library:
- **Unsorted pile of books** = Data with no structure (slow to find anything)
- **Shelved by category, alphabetized** = Structured data (fast to find what you need)

\`\`\`text
Data Structure = Data + Organization + Operations

Example:
  Array  = Collection of items + Indexed storage + Insert/Delete/Access
  Stack  = Collection of items + LIFO order     + Push/Pop/Peek
  Queue  = Collection of items + FIFO order     + Enqueue/Dequeue/Peek
\`\`\`

---

## 2. Why Data Structures Matter

The right data structure can make your code **10x to 1000x faster**.

\`\`\`text
Problem: Find if a number exists in 1 million items

Unsorted Array: Check every item → O(n) = 1,000,000 checks
Sorted Array:   Binary Search   → O(log n) = ~20 checks
Hash Table:     Direct lookup   → O(1) = 1 check!

Same problem, different data structures, MASSIVE difference.
\`\`\`

### Real-World Impact

| Scenario | Bad Choice | Good Choice | Speedup |
|:---------|:-----------|:------------|:--------|
| Search contacts | Unsorted list O(n) | Hash Map O(1) | 1000x |
| Undo/Redo | Array copying O(n) | Stack O(1) | 100x |
| Task scheduling | Unsorted list O(n) | Priority Queue O(log n) | 50x |
| Autocomplete | Check all words O(n×m) | Trie O(m) | 100x |

---

## 3. Classification of Data Structures

\`\`\`text
                    Data Structures
                    /             \\
              Linear           Non-Linear
             /    \\             /       \\
         Static  Dynamic     Trees    Graphs
           |      |    \\
         Array  Linked  Stack
                List    Queue
\`\`\`

### Linear vs Non-Linear

| Type | Description | Examples |
|:-----|:------------|:---------|
| **Linear** | Elements in sequence, one after another | Array, Linked List, Stack, Queue |
| **Non-Linear** | Elements in hierarchical/network relationships | Trees, Graphs |

### Static vs Dynamic

| Type | Description | Examples |
|:-----|:------------|:---------|
| **Static** | Fixed size, allocated at compile time | Array |
| **Dynamic** | Size can grow/shrink at runtime | Linked List, Stack, Queue |

---

## 4. Overview of All Data Structures

### Linear Data Structures

| Data Structure | What It Is | Best For |
|:---------------|:-----------|:---------|
| **Array** | Fixed-size indexed collection | Fast access by index, simple lists |
| **Linked List** | Nodes connected by pointers | Frequent insertions/deletions |
| **Stack** | LIFO (Last In, First Out) | Undo, recursion, expression parsing |
| **Queue** | FIFO (First In, First Out) | Task scheduling, BFS, buffering |

### Non-Linear Data Structures

| Data Structure | What It Is | Best For |
|:---------------|:-----------|:---------|
| **Tree** | Hierarchical parent-child structure | File systems, databases, DOM |
| **Binary Search Tree** | Tree where left < root < right | Fast search/insert/delete O(log n) |
| **Heap** | Tree with min/max at root | Priority queues, scheduling |
| **Graph** | Nodes connected by edges (any pattern) | Social networks, maps, routing |
| **Hash Table** | Key-value pairs with hash function | O(1) lookup, dictionaries, caches |
| **Trie** | Tree where each node is a character | Autocomplete, spell check |

---

## 5. Abstract Data Type (ADT)

An **ADT** defines WHAT operations a data structure supports, not HOW it's implemented.

\`\`\`text
ADT: Stack
  Operations:
    - push(item)    → Add item to top
    - pop()         → Remove and return top item
    - peek()        → View top item without removing
    - isEmpty()     → Check if stack is empty

  Implementation options:
    - Array-based stack
    - Linked List-based stack

  The USER doesn't care how it's built, just that it works!
\`\`\`

### Common ADTs

| ADT | Key Operations | Possible Implementations |
|:----|:---------------|:-------------------------|
| **List** | add, remove, get, search | Array, Linked List |
| **Stack** | push, pop, peek | Array, Linked List |
| **Queue** | enqueue, dequeue, peek | Array, Linked List, Circular Buffer |
| **Map/Dictionary** | put, get, delete | Hash Table, BST |
| **Set** | add, remove, contains | Hash Table, BST |
| **Priority Queue** | insert, extractMin/Max | Heap, Sorted Array |

---

## 6. How to Choose the Right Data Structure

\`\`\`text
 What do you need?
       │
       ├── Fast access by INDEX? → Array
       │
       ├── Fast INSERT/DELETE? → Linked List
       │
       ├── LIFO (undo, backtrack)? → Stack
       │
       ├── FIFO (scheduling, BFS)? → Queue
       │
       ├── Fast SEARCH by key? → Hash Table
       │
       ├── Sorted data + search? → BST / AVL Tree
       │
       ├── Priority-based access? → Heap
       │
       ├── Relationships/connections? → Graph
       │
       └── Prefix matching? → Trie
\`\`\`

### Decision Table

| Requirement | Best Data Structure | Time Complexity |
|:------------|:-------------------|:----------------|
| Access by index | Array | O(1) |
| Insert at beginning | Linked List | O(1) |
| Last-in First-out | Stack | O(1) |
| First-in First-out | Queue | O(1) |
| Key-value lookup | Hash Table | O(1) average |
| Sorted order | BST | O(log n) |
| Min/Max element | Heap | O(1) peek, O(log n) extract |
| Connected data | Graph | Varies |

---

## Key Takeaways

| Concept | Key Point |
|:--------|:----------|
| Data Structure | A way to organize data for efficient operations |
| Linear | Sequential: Array, Linked List, Stack, Queue |
| Non-Linear | Hierarchical/Network: Tree, Graph |
| ADT | Defines WHAT (interface), not HOW (implementation) |
| Choosing | Match your most frequent operation to the right structure |

---

## TL;DR - Quick Recall

**One-liner for each concept:**

| Concept | Key Takeaway |
|:--------|:-------------|
| **Data Structure** | Organized storage for efficient data access and modification. |
| **Linear** | Elements in sequence. Array, Linked List, Stack, Queue. |
| **Non-Linear** | Hierarchical or network. Trees, Graphs. |
| **ADT** | Interface (what), not implementation (how). Stack ADT can use Array or Linked List. |
| **Array** | Random access O(1), but fixed size and slow insert/delete. |
| **Linked List** | Dynamic size, fast insert/delete O(1), but slow access O(n). |
| **Hash Table** | O(1) average lookup. The most useful DS for interviews. |
| **Tree/Graph** | For hierarchical or connected data. |

**The Golden Rules:**
1. **No single DS is best for everything** — choose based on your most frequent operation.
2. **Time-space trade-off** — Hash tables are fast but use more memory.
3. **Know the ADT** — understand the interface before worrying about implementation.

---

## Additional Resources

**Video Courses:**
- [NeetCode - Data Structures for Beginners](https://youtu.be/CBYHwZcbD-s) - Full overview in one video
- [Abdul Bari - Data Structures](https://youtu.be/2V1FtfBDsLU) - University-level deep dive

**Articles & Visualizations:**
- [VisuAlgo](https://visualgo.net/) - Watch every data structure in action
- [Big-O Cheat Sheet](https://www.bigocheatsheet.com/) - Time complexity of all DS operations

**Practice Problems:**
- LeetCode 1: Two Sum (Hash Map)
- LeetCode 20: Valid Parentheses (Stack)
- LeetCode 206: Reverse Linked List (Linked List)
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "dsi-q1",
      question: "What is a data structure?",
      options: [
        "A programming language",
        "A way to organize and store data efficiently",
        "A type of algorithm",
        "A database system",
      ],
      correctAnswer: 1,
      explanation:
        "A data structure is a way of organizing and storing data so it can be accessed and modified efficiently.",
      difficulty: "easy",
    },
    {
      id: "dsi-q2",
      question: "Which of the following is a linear data structure?",
      options: ["Tree", "Graph", "Stack", "Trie"],
      correctAnswer: 2,
      explanation:
        "Stack is a linear data structure (LIFO). Trees, Graphs, and Tries are non-linear.",
      difficulty: "easy",
    },
    {
      id: "dsi-q3",
      question: "What does ADT stand for?",
      options: [
        "Advanced Data Technology",
        "Abstract Data Type",
        "Automated Data Transfer",
        "Array Data Table",
      ],
      correctAnswer: 1,
      explanation:
        "ADT = Abstract Data Type. It defines WHAT operations a data structure supports, not HOW it's implemented.",
      difficulty: "easy",
    },
    {
      id: "dsi-q4",
      question: "Which data structure provides O(1) average lookup by key?",
      options: ["Array", "Linked List", "Hash Table", "Binary Search Tree"],
      correctAnswer: 2,
      explanation:
        "Hash Tables use a hash function to compute an index, giving O(1) average time for lookup, insert, and delete.",
      difficulty: "easy",
    },
    {
      id: "dsi-q5",
      question: "A Stack follows which principle?",
      options: ["FIFO", "LIFO", "Random Access", "Priority Order"],
      correctAnswer: 1,
      explanation:
        "Stack = LIFO (Last In, First Out). The last element added is the first one removed. Think of a stack of plates.",
      difficulty: "easy",
    },
    {
      id: "dsi-q6",
      question:
        "Which data structure is best for implementing an 'Undo' feature?",
      options: ["Queue", "Array", "Stack", "Graph"],
      correctAnswer: 2,
      explanation:
        "Stack (LIFO) is perfect for undo — the most recent action is undone first, just like popping from a stack.",
      difficulty: "easy",
    },
    {
      id: "dsi-q7",
      question:
        "What is the main difference between static and dynamic data structures?",
      options: [
        "Speed of operations",
        "Fixed vs growable size",
        "Linear vs non-linear",
        "Primitive vs complex",
      ],
      correctAnswer: 1,
      explanation:
        "Static DS (Array) has fixed size set at creation. Dynamic DS (Linked List) can grow/shrink during runtime.",
      difficulty: "easy",
    },
    {
      id: "dsi-q8",
      question: "Which data structure is best for BFS (Breadth-First Search)?",
      options: ["Stack", "Queue", "Array", "Hash Table"],
      correctAnswer: 1,
      explanation:
        "BFS uses a Queue (FIFO) to process nodes level by level. DFS uses a Stack.",
      difficulty: "medium",
    },
    {
      id: "dsi-q9",
      question: "Trees and Graphs are classified as:",
      options: [
        "Linear data structures",
        "Non-linear data structures",
        "Static data structures",
        "Primitive data structures",
      ],
      correctAnswer: 1,
      explanation:
        "Trees and Graphs are non-linear because elements have hierarchical or network relationships, not sequential.",
      difficulty: "easy",
    },
    {
      id: "dsi-q10",
      question:
        "For fast insertion at the beginning, which is better: Array or Linked List?",
      options: [
        "Array — O(1)",
        "Linked List — O(1)",
        "Both are O(1)",
        "Both are O(n)",
      ],
      correctAnswer: 1,
      explanation:
        "Linked List inserts at head in O(1). Array requires shifting all elements right, which is O(n).",
      difficulty: "medium",
    },
  ],
};
