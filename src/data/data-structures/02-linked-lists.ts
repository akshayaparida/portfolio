import { LearningModule } from "@/types/learning";

export const linkedListsModule: LearningModule = {
  id: "02-linked-lists",
  title: "2. Linked Lists (Singly, Doubly, Circular)",
  description:
    "Dynamic non-contiguous memory, pointer rewiring, singly/doubly/circular variants, Floyd's cycle detection, and reversal in C, C++, and Python",
  status: "completed",
  tags: ["Data Structure", "GATE CS", "UGC NET", "NPTEL"],
  detailedContent: `# Linked Lists: Architectural Mechanics & Traversals

> **NPTEL / GATE CS / UGC NET Core Subject**
> Key Exam Questions: Pointer manipulation in $O(1)$ without head loss, reversing a linked list, detecting cycles (Floyd's Tortoise and Hare), and polynomial addition.

---

## 1. Prerequisites & What You Should Know

Before studying linked lists, ensure you understand:
- **Pointers / References**: What a memory address is, and how one variable can "point to" another's location in memory.
- **Dynamic Memory Allocation**: \`malloc()\`/\`free()\` in C, \`new\`/\`delete\` in C++, and how Python manages objects on the heap.
- **Arrays**: Understand arrays first (Module 1) so you can appreciate *why* linked lists exist as an alternative.
- **Structs / Classes**: How to group data and pointers into a single unit (\`struct\` in C, \`class\` in C++/Python).

---

## 2. What is a Linked List? (Conceptual Explanation)

### 2.1 The Train Analogy

Think of a linked list as a **train**:
- Each **coach (node)** carries passengers (data) and has a **coupling (pointer)** connecting it to the next coach.
- Coaches are NOT necessarily next to each other in the train yard — they can be parked anywhere. The coupling is what keeps the sequence.
- To add a new coach, you just re-connect the couplings. No need to shift every other coach!
- To remove a coach, unhook it and reconnect the neighbors.

\`\`\`
A Singly Linked List in Memory:

Node A          Node B          Node C          Node D
(at addr 200)   (at addr 500)   (at addr 100)   (at addr 800)
+——————+——+    +——————+——+    +——————+——+    +——————+——+
| data |  |→→→| data |  |→→→| data |  |→→→| data |  |→→→ NULL
|  10  |next   |  20  |next   |  30  |next   |  40  |next
+——————+——+    +——————+——+    +——————+——+    +——————+——+

Notice: Addresses are 200, 500, 100, 800 — NOT contiguous!
The 'next' pointer in each node stores the address of the following node.
\`\`\`

### 2.2 Key Insight: Non-Contiguous Memory

Unlike arrays where elements sit side-by-side in memory, linked list nodes are scattered across the heap. Each node is independently allocated and can be at any random memory address. The **only connection** between them is the pointer stored inside each node.

---

## 3. Why Do We Need Linked Lists? (Motivation)

### 3.1 Problems with Arrays that Linked Lists Solve

| Problem with Arrays | How Linked Lists Solve It |
|:---|:---|
| **Fixed size** (static arrays can't grow) | Linked lists grow/shrink dynamically — just create/delete nodes |
| **Expensive insertion at beginning** ($O(n)$ shift) | Insert at head is $O(1)$ — just rewire one pointer |
| **Expensive deletion** ($O(n)$ shift) | Delete any node in $O(1)$ if you have a pointer to it |
| **Wasted memory** (allocated but unused capacity) | Each node uses exactly the memory it needs |
| **Contiguous block required** (may fail for large allocations) | Nodes are scattered — no large contiguous block needed |

### 3.2 Real-World Applications

1. **Operating Systems**: Process scheduling queues, memory allocation free lists.
2. **Browsers**: Forward/backward navigation history (Doubly Linked List).
3. **Music Players**: Playlist — next/previous song (Doubly Linked List), repeat mode (Circular).
4. **Polynomial Arithmetic**: Each term (coefficient + exponent) is a node.
5. **Hash Tables**: Chaining collision resolution uses linked lists at each bucket.
6. **Undo/Redo**: Each state is a node in a doubly linked list.

---

## 4. How Does It Work Internally?

### 4.1 Node Structure

Every linked list node contains two parts:

\`\`\`
A Single Node:
+————————————+————————————+
|   DATA     |   POINTER  |
| (the value |  (address  |
|  stored)   |  of next   |
|            |  node)     |
+————————————+————————————+
   4 bytes      4 or 8 bytes
              (depends on 32/64-bit system)
\`\`\`

**Memory Overhead**: Each node uses extra 4–8 bytes for the pointer. For a doubly linked list, that's 8–16 extra bytes per node (two pointers: \`prev\` and \`next\`).

### 4.2 How Insertion at Head Works (Step-by-Step)

\`\`\`
Insert 5 at the head of list: 10 → 20 → 30 → NULL

Step 1: Create new node with data = 5
         +——+——+
   new → | 5|  |
         +——+——+
   
   head → [10|→] → [20|→] → [30|→] → NULL

Step 2: Point new node's 'next' to current head
         +——+——+
   new → | 5| →|————→ [10|→] → [20|→] → [30|→] → NULL
         +——+——+

Step 3: Update head to point to new node
   head → [5|→] → [10|→] → [20|→] → [30|→] → NULL
   
   Done! Total operations: 2 pointer assignments = O(1)
\`\`\`

### 4.3 How Deletion Works (Step-by-Step)

\`\`\`
Delete node with value 20 from list: 10 → 20 → 30 → NULL

Step 1: Traverse to find node BEFORE the target (node with 10)
   head → [10|→] → [20|→] → [30|→] → NULL
            ↑ prev    ↑ target

Step 2: Bypass target by connecting prev.next to target.next
   head → [10|→]————————→ [30|→] → NULL
                  [20|→] (orphaned — needs to be freed!)

Step 3: Free the deleted node's memory
   head → [10|→] → [30|→] → NULL  ✓ Done!
\`\`\`

### 4.4 How In-Place Reversal Works (Step-by-Step)

\`\`\`
Reverse list: 1 → 2 → 3 → NULL

Initial:  prev=NULL, curr=1, next=?

Iteration 1:
  next = curr.next = 2          Save next before overwriting
  curr.next = prev = NULL       Reverse the pointer!
  prev = curr = 1               Advance prev
  curr = next = 2               Advance curr
  
  NULL ← 1    2 → 3 → NULL
         ↑prev ↑curr

Iteration 2:
  next = curr.next = 3
  curr.next = prev = 1          Reverse!
  prev = curr = 2
  curr = next = 3
  
  NULL ← 1 ← 2    3 → NULL
              ↑prev ↑curr

Iteration 3:
  next = curr.next = NULL
  curr.next = prev = 2          Reverse!
  prev = curr = 3
  curr = next = NULL             Stop! curr is NULL
  
  NULL ← 1 ← 2 ← 3
                   ↑prev = new head!

Result: 3 → 2 → 1 → NULL  ✓
\`\`\`

---

## 5. Core Variants

### 5.1 Singly Linked List
Each node contains a single pointer to \`next\`. Last node points to \`NULL\`.
- **Traversal**: Forward only (head → tail).
- **Use case**: Simple LIFO stacks, hash table chains.

### 5.2 Doubly Linked List
Each node contains \`prev\` and \`next\` pointers. Allows bidirectional traversal.
- **Advantage**: $O(1)$ deletion when given a direct pointer to the node (no need to find predecessor).
- **Use case**: Browser history, LRU Cache, undo/redo.

\`\`\`
Doubly Linked List:

NULL ←prev[10|next]→ ←prev[20|next]→ ←prev[30|next]→ NULL
\`\`\`

### 5.3 Circular Linked List
Last node points back to \`head\` instead of \`NULL\`. Ideal for round-robin scheduling.

\`\`\`
Circular Singly Linked List:

   +→ [10|→] → [20|→] → [30|→] —+
   |                              |
   +——————————————————————————————+
         (last node points back to first)
\`\`\`

---

## 6. Arrays vs Linked Lists: Architectural Trade-Offs

| Metric | Array | Linked List |
|:---|:---|:---|
| **Memory Layout** | Contiguous chunk | Dispersed nodes linked by memory pointers |
| **Random Access** | $O(1)$ direct arithmetic | $O(n)$ linear traversal required |
| **Insertion at Head** | $O(n)$ due to shifting | $O(1)$ by rewiring head pointer |
| **Insertion at End** | $O(1)$ amortized (dynamic) | $O(n)$ unless tail pointer maintained |
| **Deletion (given pointer)** | $O(n)$ shifting | $O(1)$ pointer rewiring |
| **Memory Overhead** | Zero pointer overhead | Extra pointer per node ($4$ or $8$ bytes on 64-bit systems) |
| **Cache Locality** | High (pre-fetched into CPU cache lines) | Poor (pointer chasing causes frequent cache misses) |
| **Memory Fragmentation** | Requires one large contiguous block | No fragmentation — nodes are independent |

### When to Use Which?

- **Use Arrays when**: You need fast random access, know the size, or iterate sequentially.
- **Use Linked Lists when**: You frequently insert/delete at the beginning, size is unpredictable, or you can't allocate a large contiguous block.

---

## 7. Floyd's Cycle Detection: The Tortoise & Hare Algorithm

### 7.1 The Concept

Imagine two runners on a circular track:
- **Tortoise** (slow): moves 1 step at a time.
- **Hare** (fast): moves 2 steps at a time.

If the track is circular (cycle exists), the hare will eventually "lap" the tortoise and they'll meet. If the track is straight (no cycle), the hare reaches the end (NULL) first.

\`\`\`
List with a cycle:
1 → 2 → 3 → 4 → 5
              ↑       ↓
              8 ← 7 ← 6

Slow and Fast start at node 1:
Step 1: Slow=2, Fast=3
Step 2: Slow=3, Fast=5
Step 3: Slow=4, Fast=7
Step 4: Slow=5, Fast=4   (fast lapped around!)
Step 5: Slow=6, Fast=6   ← THEY MEET! Cycle detected.
\`\`\`

- **Time Complexity**: $O(n)$ — the hare covers at most $2n$ nodes.
- **Space Complexity**: $O(1)$ — only two pointers, no extra data structure.

---

## 8. Implementation in C, C++, and Python with Syntax Logic

Below is the complete implementation of:
1. Node declaration and creation
2. Insertion at Beginning ($O(1)$) and End ($O(n)$)
3. In-place List Reversal ($O(n)$ time, $O(1)$ space)
4. Floyd's Cycle Detection ($O(n)$ time, $O(1)$ space)

### C Implementation (Pointers, Memory Lifecycle & Double Pointers)

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

/**
 * C Syntax Logic Note:
 * 1. struct Node*: Self-referential structure. Because Node contains a pointer
 *    to another struct Node, we declare "struct Node* next;".
 * 2. Double Pointer (Node** head_ref): In C, function arguments are passed by VALUE.
 *    If we pass "Node* head" and change head inside the function, the caller's head
 *    pointer DOES NOT change! To modify the caller's pointer, we must pass its memory
 *    address: Node** (a pointer to a pointer).
 * 3. Freeing: Every node created with malloc() MUST be released using free() to prevent leaks.
 */

typedef struct Node {
    int data;
    struct Node* next;
} Node;

// Create a new heap-allocated node
Node* createNode(int value) {
    // malloc dynamically reserves sizeof(Node) bytes (typically 16 bytes on 64-bit OS: 4 data + 4 padding + 8 pointer)
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = value;
    newNode->next = NULL; // Explicitly nullify to prevent garbage pointer bugs
    return newNode;
}

// Insert at front: O(1) time
void insertAtHead(Node** head_ref, int value) {
    Node* newNode = createNode(value);
    // Point new node's next to the current first node
    newNode->next = *head_ref;
    // Update the caller's head pointer to point to the new node
    *head_ref = newNode;
}

// Reverse Linked List in-place: O(n) time, O(1) auxiliary space
Node* reverseList(Node* head) {
    Node* prev = NULL;
    Node* current = head;
    Node* next = NULL;

    while (current != NULL) {
        // Save the next node before overwriting current->next
        next = current->next;
        // Reverse the pointer direction
        current->next = prev;
        // Advance prev and current one step forward
        prev = current;
        current = next;
    }
    // prev is the new head of the reversed list
    return prev;
}

// Floyd's Cycle Detection Algorithm (Tortoise and Hare)
bool hasCycle(Node* head) {
    Node* slow = head;
    Node* fast = head;

    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;          // Moves 1 step at a time
        fast = fast->next->next;    // Moves 2 steps at a time

        // If slow and fast pointers meet, a cycle exists
        if (slow == fast) {
            return true;
        }
    }
    return false; // Reached NULL, hence acyclic
}
\`\`\`

---

### C++ Implementation (Encapsulation, RAII & Smart Clean Destructors)

\`\`\`cpp
#include <iostream>

/**
 * C++ Syntax Logic Note:
 * 1. Constructor: Initializes node members using constructor initializer list (: data(val), next(nullptr)).
 * 2. Destructor (~LinkedList): Recursively or iteratively frees all heap-allocated nodes,
 *    guaranteeing no memory leak occurs when the list object falls out of scope.
 * 3. nullptr: C++11 strongly-typed null pointer (type-safe compared to C NULL / 0).
 */

class LinkedList {
private:
    struct Node {
        int data;
        Node* next;
        Node(int val) : data(val), next(nullptr) {}
    };
    Node* head;

public:
    LinkedList() : head(nullptr) {}

    // Destructor: Automatic cleanup (RAII)
    ~LinkedList() {
        Node* current = head;
        while (current != nullptr) {
            Node* nextNode = current->next;
            delete current; // delete calls destructor and deallocates memory
            current = nextNode;
        }
    }

    void insertHead(int val) {
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
    }

    void reverse() {
        Node* prev = nullptr;
        Node* current = head;
        while (current != nullptr) {
            Node* next = current->next;
            current->next = prev;
            prev = current;
            current = next;
        }
        head = prev;
    }

    void print() const {
        Node* curr = head;
        while (curr != nullptr) {
            std::cout << curr->data << " -> ";
            curr = curr->next;
        }
        std::cout << "nullptr\\n";
    }
};
\`\`\`

---

### Python Implementation (Clean Object Model & Reference Semantics)

\`\`\`python
"""
Python Syntax Logic Note:
1. Object References: In Python, variables are references. Assigning "node.next = prev"
   re-binds the reference; no pointer arithmetic or manual dereferencing needed.
2. Automatic Garbage Collection: When a node's reference count drops to 0,
   Python's cyclic garbage collector cleans it up automatically.
"""

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class SinglyLinkedList:
    def __init__(self):
        self.head = None

    def insert_at_head(self, val: int) -> None:
        """O(1) insertion at beginning."""
        new_node = ListNode(val, self.head)
        self.head = new_node

    def reverse(self) -> None:
        """
        O(n) in-place reversal:
        Tracks prev, current, and reassigns pointers sequentially.
        """
        prev = None
        current = self.head
        while current:
            next_node = current.next  # Preserve remaining chain
            current.next = prev       # Point backwards
            prev = current            # Shift prev forward
            current = next_node       # Shift current forward
        self.head = prev

    def has_cycle(self) -> bool:
        """Floyd's Tortoise and Hare cycle detection algorithm."""
        slow = fast = self.head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow is fast:
                return True
        return False
\`\`\`

---

## 9. GATE & UGC NET Key Theorems & Formulas

> [!NOTE]
> **GATE Formula: Reversing Singly Linked List with Minimal Pointers**
> - In-place reversal of a singly linked list requires a minimum of **3 pointers** (\`prev\`, \`curr\`, \`next\`) in iterative form.
> - Time Complexity: $\\Theta(n)$
> - Space Complexity: $O(1)$

> [!IMPORTANT]
> **GATE Classic: Deleting a Node Given only its Pointer (Without Head)**
> If given pointer \`P\` to the node to be deleted (where \`P->next != NULL\`):
> \`\`\`c
> P->data = P->next->data; // Copy next node's value into current node
> Node* temp = P->next;
> P->next = P->next->next; // Bypass next node
> free(temp);              // Free bypassed node
> \`\`\`
> Time Complexity: $O(1)$! (Common GATE 1-mark question).
`,
};
