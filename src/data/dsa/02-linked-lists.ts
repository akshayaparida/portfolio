import { LearningModule } from "@/types/learning";

export const linkedListsModule: LearningModule = {
  id: "02-linked-lists",
  title: "2. Linked Lists",
  description: "Pointer-based dynamic storage - Singly, Doubly, Circular",
  status: "in-progress",
  tags: ["Data Structure"],
  detailedContent: `# Linked Lists

> **Data Structure Module** - Learn how nodes connect through pointers

---

## What You'll Learn

1. Understand how linked lists differ from arrays
2. Implement singly and doubly linked lists
3. Master insert, delete, and traverse operations
4. Know when to use linked lists vs arrays

---

## 1. What is a Linked List? (Simple Explanation)

Think of a linked list like a **treasure hunt**:
- Each clue (node) has: the **treasure** (data) + **next location** (pointer)
- You can only find the next clue by reading the current one
- Unlike arrays, items are NOT stored side by side

**Visual:**
\`\`\`
Array:     [10] [20] [30] [40]  ← All in a row, numbered boxes

Linked:    [10|→] → [20|→] → [30|→] → [40|X]
           Each box points to the next
           X means "end" (null/None)
\`\`\`

### Why Use Linked Lists?

| Situation | Winner |
|:----------|:-------|
| Need random access (arr[5]) | Array ✅ |
| Frequent insertions at start | Linked List ✅ |
| Known size, rarely changes | Array ✅ |
| Size changes frequently | Linked List ✅ |

---

## 2. Singly Linked List

Each node has: **data** + **next pointer**

\`\`\`python path=null start=null
# Step 1: Create a Node class
class Node:
    def __init__(self, data):
        self.data = data    # The value we store
        self.next = None    # Pointer to next node (starts as nothing)

# Step 2: Create the Linked List class
class LinkedList:
    def __init__(self):
        self.head = None    # Points to first node
    
    # Add to the END - O(n) because we traverse entire list
    def append(self, data):
        new_node = Node(data)
        
        # If list is empty, new node becomes head
        if not self.head:
            self.head = new_node
            return
        
        # Otherwise, travel to the end
        current = self.head
        while current.next:      # Keep going until no next
            current = current.next
        current.next = new_node  # Link last node to new node
    
    # Add to the BEGINNING - O(1) Super fast!
    def prepend(self, data):
        new_node = Node(data)
        new_node.next = self.head  # New node points to old head
        self.head = new_node       # New node becomes new head
    
    # Print all values
    def display(self):
        elements = []
        current = self.head
        while current:
            elements.append(str(current.data))
            current = current.next
        print(" → ".join(elements))

# Let's use it!
my_list = LinkedList()
my_list.append(10)
my_list.append(20)
my_list.append(30)
my_list.display()  # Output: 10 → 20 → 30

my_list.prepend(5)
my_list.display()  # Output: 5 → 10 → 20 → 30
\`\`\`

### How Insertion at Head Works (O(1))

\`\`\`
Before:  HEAD → [10] → [20] → [30] → X

Step 1: Create new node [5]
Step 2: Point [5] → HEAD (which is [10])
Step 3: Update HEAD → [5]

After:   HEAD → [5] → [10] → [20] → [30] → X

Only 3 operations! Always O(1)!
\`\`\`

### Deleting a Node

\`\`\`python path=null start=null
def delete(self, data):
    # Special case: deleting head
    if self.head and self.head.data == data:
        self.head = self.head.next  # Skip the head
        return
    
    # Find the node BEFORE the one to delete
    current = self.head
    while current.next:
        if current.next.data == data:
            current.next = current.next.next  # Skip over it!
            return
        current = current.next
\`\`\`

**Visual of Delete:**
\`\`\`
Before:  [10] → [20] → [30] → X
Delete 20:
         [10] → [30] → X  (20 is skipped!)
\`\`\`

---

## 3. Doubly Linked List

Each node has: **prev pointer** + **data** + **next pointer**

Can traverse BOTH directions!

\`\`\`python path=null start=null
class DoublyNode:
    def __init__(self, data):
        self.data = data
        self.prev = None  # Points backward
        self.next = None  # Points forward

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None  # Also track the end!
    
    def append(self, data):
        new_node = DoublyNode(data)
        if not self.head:
            self.head = self.tail = new_node
            return
        
        new_node.prev = self.tail  # New node points back to old tail
        self.tail.next = new_node  # Old tail points forward to new
        self.tail = new_node       # Update tail
\`\`\`

**Advantages of Doubly Linked:**
- Go backwards (prev pointer)
- Delete node without finding previous
- Append to end is O(1) with tail pointer

**Disadvantage:**
- Uses more memory (extra pointer per node)

---

## 4. Time Complexity Comparison

| Operation | Array | Singly Linked | Doubly Linked |
|:----------|:------|:--------------|:--------------|
| Access by index | O(1) ✅ | O(n) | O(n) |
| Insert at head | O(n) | O(1) ✅ | O(1) ✅ |
| Insert at tail | O(1) | O(n) | O(1) ✅ |
| Delete (known node) | O(n) | O(n)* | O(1) ✅ |

*Need to find previous node first

---

## Key Takeaways

1. **No random access** - Must traverse from head
2. **O(1) insert at head** - Just update pointers
3. **Dynamic size** - No need to pre-allocate
4. **Extra memory** - Each node stores pointer(s)

**When to use Linked List:**
- Frequent insertions/deletions at start
## TL;DR - Quick Recall

**One-liner for each concept:**

| Concept | Key Takeaway |
|:--------|:-------------|
| **Singly Linked** | Nodes point to **next**; \`O(1)\` insert at head, but \`O(n)\` access/search. |
| **Doubly Linked** | Nodes point to **next** AND **prev**; allows backward traversal. |
| **Circular Linked** | Last node points back to the head; useful for round-robin scheduling. |
| **Head Pointer** | The gateway to the list; lose this, and you lose the whole list! |
| **Tail Pointer** | Optional pointer to the last node; makes appending to the end \`O(1)\`. |

**Essential Code Snippets:**

\`\`\`python
# Reversing a Singly Linked List (Classic Question)
def reverse_list(head):
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev

# Finding Middle of a Linked List (Slow/Fast Pointer)
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
\`\`\`

**The Golden Rules:**
1. Always check for edge cases: Empty list (\`head is None\`), Single node list.
2. In interviews, two pointers (Slow & Fast / Tortoise & Hare) is the #1 linked list pattern.
3. Be careful not to lose nodes when modifying pointers! Always save \`curr.next\` before changing it.

---

## Additional Resources

**Video Courses:**
- [NeetCode - Linked Lists](https://youtu.be/G0_I-ZF0S38) - Essential patterns and solutions
- [Abdul Bari - Linked List Algorithms](https://youtu.be/NobHlGUjV3g) - Comprehensive breakdown

**Articles & Visualizations:**
- [VisuAlgo - Linked List](https://visualgo.net/en/list) - See exactly how pointers change!

**Practice Problems:**
- LeetCode 206: Reverse Linked List
- LeetCode 141: Linked List Cycle
- LeetCode 21: Merge Two Sorted Lists
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "ll-q1",
      question: "Inserting at the head of a singly linked list takes:",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      correctAnswer: 0,
      explanation:
        "Insert at head is O(1). Just create new node, point it to current head, update head pointer. Only 3 operations regardless of list size.",
      difficulty: "easy",
    },
    {
      id: "ll-q2",
      question:
        "What is the main advantage of doubly linked list over singly linked list?",
      options: [
        "Less memory",
        "Faster access",
        "Backward traversal",
        "Simpler code",
      ],
      correctAnswer: 2,
      explanation:
        "Doubly linked lists allow backward traversal using the prev pointer. Useful for browser history, undo/redo operations.",
      difficulty: "easy",
    },
    {
      id: "ll-q3",
      question: "To access the 5th element in a singly linked list, you must:",
      options: [
        "Use index arr[5]",
        "Traverse from head 4 times",
        "Jump directly to it",
        "Use the tail pointer",
      ],
      correctAnswer: 1,
      explanation:
        "Must traverse from head. Unlike arrays, linked lists don't have indexes. Follow next pointer 4 times from head to reach 5th element.",
      difficulty: "easy",
    },
    {
      id: "ll-q4",
      question:
        "What is the time complexity of deleting a node from the middle of a singly linked list (assuming you have pointer to the node)?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      correctAnswer: 1,
      explanation:
        "O(n) for singly linked list. You need to find the PREVIOUS node first, which requires traversal. In doubly linked list, it's O(1).",
      difficulty: "medium",
    },
    {
      id: "ll-q5",
      question:
        "How much extra memory does a doubly linked list use compared to singly linked list?",
      options: [
        "Same",
        "One extra pointer per node",
        "Twice as much total",
        "Depends on data",
      ],
      correctAnswer: 1,
      explanation:
        "Each node in doubly linked list has one extra pointer (prev). So for n nodes, extra memory = n pointers.",
      difficulty: "easy",
    },
    {
      id: "ll-q6",
      question:
        "Which operation is O(1) in a singly linked list with only head pointer?",
      options: [
        "Insert at tail",
        "Delete from tail",
        "Insert at head",
        "Access by index",
      ],
      correctAnswer: 2,
      explanation:
        "Insert at head is O(1) - just update pointers. Insert/delete at tail requires traversing to the end = O(n).",
      difficulty: "easy",
    },
    {
      id: "ll-q7",
      question: "A circular linked list is characterized by:",
      options: [
        "Having two pointers per node",
        "Last node points to head",
        "Nodes arranged in circle",
        "Having a tail pointer",
      ],
      correctAnswer: 1,
      explanation:
        "In circular linked list, the last node's next pointer points back to the head, forming a loop. Useful for round-robin scheduling.",
      difficulty: "easy",
    },
    {
      id: "ll-q8",
      question: "What is the space complexity of a linked list with n nodes?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      explanation:
        "O(n) space. Each of the n nodes stores data plus pointer(s). Total space grows linearly with number of nodes.",
      difficulty: "easy",
    },
    {
      id: "ll-q9",
      question: "To reverse a singly linked list, the time complexity is:",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      explanation:
        "O(n) time. Must visit each node once to reverse the pointers. Can be done iteratively with O(1) extra space.",
      difficulty: "medium",
    },
    {
      id: "ll-q10",
      question: "Which data structure is best for implementing LRU Cache?",
      options: [
        "Array",
        "Singly Linked List",
        "Doubly Linked List + HashMap",
        "Binary Tree",
      ],
      correctAnswer: 2,
      explanation:
        "Doubly Linked List + HashMap gives O(1) access and O(1) removal. DLL allows quick removal from middle, HashMap gives quick lookup.",
      difficulty: "medium",
    },
  ],
};
