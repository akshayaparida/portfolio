import { LearningModule } from "@/types/learning";

export const queuesModule: LearningModule = {
  id: "04-queues",
  title: "4. Queues & Deques",
  description:
    "FIFO architecture, circular queues, modular arithmetic, Double-Ended Queues (Deque), and CPU scheduling queue simulations in C, C++, and Python",
  status: "completed",
  tags: ["Data Structure", "GATE CS", "UGC NET", "NPTEL"],
  detailedContent: `# Queues: FIFO Architecture & Circular Buffer Mechanics

> **NPTEL / GATE CS / UGC NET Core Subject**
> Key Exam Questions: Full and empty conditions of Circular Queues using $(rear + 1) \\% N == front$, Deque operations, and multi-queue scheduling.

---

## 1. Prerequisites & What You Should Know

Before studying queues, ensure you understand:
- **Stacks (Module 3)**: Queues are the "opposite" — FIFO vs LIFO. Understanding stacks helps you see the contrast.
- **Arrays**: Array-based queue implementation requires index manipulation.
- **Modular Arithmetic**: The \`%\` (modulo) operator is the key to making circular queues work.
- **Linked Lists**: Linked-list queues use pointer-based node creation.

---

## 2. What is a Queue? (Conceptual Explanation)

### 2.1 The Ticket Counter Analogy

Think of a **queue at a movie ticket counter**:
- The **first person** who arrives is the **first one served** (FIFO: First-In, First-Out).
- New people join at the **back (rear)** of the line.
- The person being served leaves from the **front**.
- No one is allowed to cut the line!

\`\`\`
A Queue in Real Life:

  FRONT                                         REAR
  (served first)                            (joins last)
    ↓                                            ↓
  +——+   +——+   +——+   +——+   +——+
  |P1|→→→|P2|→→→|P3|→→→|P4|→→→|P5|
  +——+   +——+   +——+   +——+   +——+
  
  Dequeue → P1 leaves (served)
  Enqueue → P6 joins at rear
\`\`\`

### 2.2 Stack vs Queue: The Key Difference

| Feature | Stack (LIFO) | Queue (FIFO) |
|:---|:---|:---|
| **Analogy** | Stack of plates | Line at ticket counter |
| **Insert** | Push at top | Enqueue at rear |
| **Remove** | Pop from top | Dequeue from front |
| **Access Order** | Last in, first out | First in, first out |
| **Use case** | Undo/redo, DFS, recursion | BFS, scheduling, buffering |

### 2.3 The Queue ADT (Abstract Data Type)

| Operation | Description | Time Complexity |
|:---|:---|:---|
| **Enqueue(x)** | Insert element \`x\` at the rear | $O(1)$ |
| **Dequeue()** | Remove and return element from the front | $O(1)$ |
| **Front() / Peek()** | View the front element without removing | $O(1)$ |
| **isEmpty()** | Check if the queue has no elements | $O(1)$ |
| **isFull()** | Check if queue is at capacity (array-based) | $O(1)$ |

---

## 3. Why Do We Need Queues? (Motivation & Real-World Uses)

1. **CPU Scheduling (Operating Systems)**: The OS maintains a **Ready Queue** of processes waiting for CPU time. Round-Robin scheduling processes each task for a fixed time slice, cycling through the queue.

2. **Breadth-First Search (BFS)**: Graph traversal explores nodes level-by-level using a queue to track which nodes to visit next.

3. **Print Spooler**: Documents sent to a printer are queued — first document sent is printed first.

4. **Web Server Request Handling**: Incoming HTTP requests are queued and processed in arrival order.

5. **Keyboard Input Buffer**: Keystrokes are buffered in a queue and processed in order.

6. **Sliding Window Problems**: Deques (double-ended queues) efficiently solve problems like "maximum in sliding window."

---

## 4. How Does It Work Internally?

### 4.1 The Linear Queue Problem (Why It's Broken)

\`\`\`text
Linear Array Queue (capacity = 5):

Step 1: Enqueue 10, 20, 30
        front=0                rear=2
          ↓                      ↓
        [10] [20] [30] [  ] [  ]

Step 2: Dequeue 10, Dequeue 20
              front=2    rear=2
                ↓          ↓
        [  ] [  ] [30] [  ] [  ]

Step 3: Enqueue 40, 50
              front=2              rear=4
                ↓                    ↓
        [  ] [  ] [30] [40] [50]

Step 4: Try to Enqueue 60...
        rear is at index 4 (last position). OVERFLOW!
        But slots [0] and [1] are EMPTY!
        
        This is the FALSE OVERFLOW problem.
        Slots are wasted because front moved forward.
\`\`\`

**Solution**: Circular Queue — when \`rear\` reaches the end, it wraps around to index 0!

### 4.2 Circular Queue: How the Wrap-Around Works

The key insight is **modular arithmetic**: \`next_index = (current_index + 1) % capacity\`

\`\`\`text
Circular Queue (capacity = 5):

Visualize it as a ring, not a straight line:

         [0]
       /     \\
     [4]     [1]
      |       |
     [3]     [2]
       \\     /
         ---

Step 1: Enqueue 10, 20, 30, 40
        front=0, rear=3
        [10] [20] [30] [40] [  ]
         ↑ F                 ↑ next rear = (3+1)%5 = 4

Step 2: Dequeue 10, Dequeue 20
        front=2, rear=3
        [  ] [  ] [30] [40] [  ]
                   ↑ F

Step 3: Enqueue 50, Enqueue 60
        front=2, rear=0  ← rear WRAPPED AROUND!
        [60] [  ] [30] [40] [50]
         ↑ R       ↑ F

        rear went: 3 → 4 → (4+1)%5 = 0  ✓ No false overflow!

Step 4: Is it full? (rear+1)%5 = (0+1)%5 = 1. Is 1 == front(2)? NO. 
        Room for 1 more!
        
Step 5: Enqueue 70 → rear = (0+1)%5 = 1
        [60] [70] [30] [40] [50]
              ↑ R  ↑ F
        
        Now: (rear+1)%5 = (1+1)%5 = 2 == front(2). FULL!
\`\`\`

### 4.3 Types of Queues

| Type | Description | Operations |
|:---|:---|:---|
| **Simple Queue** | FIFO, linear | Enqueue at rear, Dequeue at front |
| **Circular Queue** | FIFO, wraps around | Same as above, with modular arithmetic |
| **Deque (Double-Ended)** | Insert/Remove at BOTH ends | push_front, push_back, pop_front, pop_back |
| **Priority Queue** | Elements have priority, highest priority served first | Insert with priority, Extract-max/min |

### 4.4 Double-Ended Queue (Deque)

A Deque allows insertion and deletion at **both** front and rear:

\`\`\`
Deque Operations:

  push_front(x)                    push_back(x)
       ↓                               ↓
  +——+——+——+——+——+
  |  |  |30|40|  |
  +——+——+——+——+——+
       ↑                               ↑
  pop_front()                     pop_back()
\`\`\`

**Input-Restricted Deque**: Insertion only at rear, deletion at both ends.
**Output-Restricted Deque**: Deletion only at front, insertion at both ends.

---

## 5. Circular Queue Formulas (GATE Exam Standard)

For a circular queue of size $N$:
1. **Initial Empty State**: \`front = -1, rear = -1\` (or \`front = 0, rear = 0\` with count)
2. **Next Position**:
   $$\\text{next\\_rear} = (rear + 1) \\% N$$
   $$\\text{next\\_front} = (front + 1) \\% N$$
3. **Queue Full Condition**:
   $$(rear + 1) \\% N == front$$
4. **Number of Elements Currently Stored**:
   $$\\text{Count} = (rear - front + N) \\% N + 1 \\quad (\\text{when not empty})$$

> [!WARNING]
> **GATE Trap: Maximum elements in circular queue of size N**
> With the standard full condition $(rear + 1) \\% N == front$, the queue can hold at most **$N - 1$** elements, NOT $N$! One slot is intentionally wasted to distinguish "full" from "empty".
> To store all $N$ elements, use a separate \`count\` variable instead.

---

## 6. Queue Applications: Step-by-Step Examples

### 6.1 BFS Using a Queue (Level-Order Traversal)

\`\`\`
Graph:  1 → 2, 1 → 3, 2 → 4, 3 → 4, 3 → 5

BFS starting from node 1:

Step 1: Enqueue 1, mark visited
        Queue: [1]       Visited: {1}

Step 2: Dequeue 1. Process neighbors 2, 3.
        Queue: [2, 3]    Visited: {1, 2, 3}

Step 3: Dequeue 2. Process neighbor 4.
        Queue: [3, 4]    Visited: {1, 2, 3, 4}

Step 4: Dequeue 3. Neighbor 4 already visited. Process 5.
        Queue: [4, 5]    Visited: {1, 2, 3, 4, 5}

Step 5: Dequeue 4. All neighbors visited.
        Queue: [5]       Visited: {1, 2, 3, 4, 5}

Step 6: Dequeue 5. No unvisited neighbors.
        Queue: []        Done!

BFS Order: 1 → 2 → 3 → 4 → 5
\`\`\`

### 6.2 Round-Robin CPU Scheduling

\`\`\`
Processes: P1(burst=4), P2(burst=3), P3(burst=5)
Time Quantum = 2

Queue: [P1, P2, P3]

Time 0-2:  P1 runs for 2 units. Remaining: 2. Re-enqueue.
           Queue: [P2, P3, P1(2)]

Time 2-4:  P2 runs for 2 units. Remaining: 1. Re-enqueue.
           Queue: [P3, P1(2), P2(1)]

Time 4-6:  P3 runs for 2 units. Remaining: 3. Re-enqueue.
           Queue: [P1(2), P2(1), P3(3)]

Time 6-8:  P1 runs for 2 units. Remaining: 0. DONE!
           Queue: [P2(1), P3(3)]

Time 8-9:  P2 runs for 1 unit. Remaining: 0. DONE!
           Queue: [P3(3)]

Time 9-11: P3 runs for 2 units. Remaining: 1. Re-enqueue.
           Queue: [P3(1)]

Time 11-12: P3 runs for 1 unit. DONE!
\`\`\`

---

## 7. Implementation in C, C++, and Python with Syntax Logic

### C Implementation (Circular Queue with Modular Arithmetic)

\`\`\`c
#include <stdio.h>
#include <stdbool.h>

/**
 * C Syntax Logic Note:
 * 1. Modulo Operator (%): Wraps indices seamlessly from MAX_SIZE-1 back to 0.
 * 2. Sentinel Values: We set front = -1, rear = -1 to signal empty state.
 * 3. Array bounds: Fixed-size allocation avoids heap fragmentation in embedded/OS kernels.
 */

#define CAPACITY 5

typedef struct {
    int items[CAPACITY];
    int front;
    int rear;
} CircularQueue;

void initQueue(CircularQueue* q) {
    q->front = -1;
    q->rear = -1;
}

bool isEmpty(CircularQueue* q) {
    return q->front == -1;
}

bool isFull(CircularQueue* q) {
    // Condition: next rear position equals front
    return (q->rear + 1) % CAPACITY == q->front;
}

void enqueue(CircularQueue* q, int value) {
    if (isFull(q)) {
        printf("Circular Queue Overflow! Cannot insert %d\\n", value);
        return;
    }
    
    // First element insertion: both front and rear move to index 0
    if (isEmpty(q)) {
        q->front = 0;
        q->rear = 0;
    } else {
        // Modular wrap-around
        q->rear = (q->rear + 1) % CAPACITY;
    }
    q->items[q->rear] = value;
}

int dequeue(CircularQueue* q) {
    if (isEmpty(q)) {
        printf("Circular Queue Underflow!\\n");
        return -1;
    }
    
    int val = q->items[q->front];
    
    // If only one element was left, resetting to empty state
    if (q->front == q->rear) {
        q->front = -1;
        q->rear = -1;
    } else {
        // Modular wrap-around
        q->front = (q->front + 1) % CAPACITY;
    }
    return val;
}
\`\`\`

---

### C++ Implementation (Template Class & Double-Ended Queue - Deque)

\`\`\`cpp
#include <iostream>
#include <deque>

/**
 * C++ Syntax Logic Note:
 * 1. std::deque (Double-Ended Queue): Sequence container allowing O(1) random access
 *    AND O(1) insertions/deletions at BOTH ends (push_front, push_back, pop_front, pop_back).
 * 2. Chunk-based memory: Unlike std::vector, std::deque allocates memory in fixed-size blocks,
 *    avoiding contiguous reallocations.
 */

template <typename T>
class SlidingWindowMaxQueue {
private:
    std::deque<T> dq; // Stores indices or values

public:
    void pushBack(const T& val) {
        dq.push_back(val);
    }

    void pushFront(const T& val) {
        dq.push_front(val);
    }

    T popFront() {
        T val = dq.front();
        dq.pop_front();
        return val;
    }

    T popBack() {
        T val = dq.back();
        dq.pop_back();
        return val;
    }

    bool empty() const { return dq.empty(); }
    size_t size() const { return dq.size(); }
};
\`\`\`

---

### Python Implementation (collections.deque for True O(1) Performance)

\`\`\`python
"""
Python Syntax Logic Note:
1. NEVER use Python list for Queues: list.pop(0) is O(n) because all elements shift left!
2. collections.deque is implemented in C as a doubly-linked list of blocks.
   append(), appendleft(), pop(), popleft() are guaranteed O(1) time complexity.
"""

from collections import deque

class ProcessQueue:
    def __init__(self):
        # deque supports maximum length (maxlen) for circular buffers
        self._queue = deque()

    def enqueue(self, process_id: str):
        """O(1) insertion at rear."""
        self._queue.append(process_id)

    def dequeue(self) -> str:
        """
        O(1) removal from front.
        Raises IndexError if empty.
        """
        if not self._queue:
            raise IndexError("Dequeue from empty ProcessQueue")
        return self._queue.popleft()

    def peek(self) -> str:
        """O(1) inspection of front item."""
        if not self._queue:
            raise IndexError("Peek on empty ProcessQueue")
        return self._queue[0]

    def __len__(self):
        return len(self._queue)
\`\`\`

---

## 8. GATE & UGC NET Key Exam Insights

> [!WARNING]
> **GATE Classic: Array Space Waste in Circular Queue**
> If a circular queue of size $N$ is checked with the condition:
> $$(rear + 1) \\% N == front$$
> then at most **$N - 1$ elements** can be stored before it is declared full!
> One slot is intentionally left empty to distinguish "Queue Full" from "Queue Empty" (\`front == rear\`).

> [!IMPORTANT]
> **GATE Tip: Queue using Two Stacks**
> You can implement a queue using two stacks:
> - **Enqueue**: Push to Stack 1. $O(1)$.
> - **Dequeue**: If Stack 2 is empty, pop all from Stack 1 and push to Stack 2, then pop from Stack 2. **Amortized** $O(1)$.
> This is a frequently asked GATE question!
`,
};
