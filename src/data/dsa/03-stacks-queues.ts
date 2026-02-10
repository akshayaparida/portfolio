import { LearningModule } from "@/types/learning";

export const stacksQueuesModule: LearningModule = {
  id: "03-stacks-queues",
  title: "3. Stacks & Queues",
  description: "LIFO and FIFO operations - fundamental for algorithms",
  status: "in-progress",
  tags: ["Data Structure"],
  detailedContent: `# Stacks & Queues

> **Data Structure Module** - Learn restricted-access data structures

---

## What You'll Learn

1. Understand LIFO (Stack) and FIFO (Queue) principles
2. Implement Stack and Queue from scratch
3. Know real-world use cases for each
4. Use Python's built-in implementations

---

## 1. Stacks - Last In, First Out (LIFO)

### Simple Explanation

Think of a **stack of plates**:
- You can only add plates on TOP
- You can only remove plates from TOP
- The last plate you put is the first one you take

\`\`\`
Adding plates:      Removing plates:
    [3] ← Top         [3] ← Remove this first!
    [2]               [2]
    [1]               [1]
    ---               ---
\`\`\`

### Real-World Examples

- **Undo button** in Word - Last action undone first
- **Browser back button** - Last page you visited
- **Function calls** - Last function called, first to finish
- **Reversing things** - Put items on stack, pop in reverse order

### Stack Implementation

\`\`\`python path=null start=null
class Stack:
    def __init__(self):
        self.items = []  # Using a list internally
    
    def push(self, item):
        """Add item to TOP - O(1)"""
        self.items.append(item)
    
    def pop(self):
        """Remove and return TOP item - O(1)"""
        if self.is_empty():
            return None
        return self.items.pop()
    
    def peek(self):
        """Look at TOP without removing - O(1)"""
        if self.is_empty():
            return None
        return self.items[-1]
    
    def is_empty(self):
        """Check if stack has no items"""
        return len(self.items) == 0
    
    def size(self):
        """How many items in stack"""
        return len(self.items)

# Let's use it!
stack = Stack()
stack.push(10)  # Stack: [10]
stack.push(20)  # Stack: [10, 20]
stack.push(30)  # Stack: [10, 20, 30]

print(stack.peek())  # 30 (just looking, not removing)
print(stack.pop())   # 30 (removed!)
print(stack.pop())   # 20
print(stack.peek())  # 10
\`\`\`

### Classic Stack Problem: Balanced Parentheses

\`\`\`python path=null start=null
def is_balanced(expression):
    """Check if parentheses are balanced"""
    stack = []
    
    for char in expression:
        if char == '(':
            stack.append(char)  # Push opening
        elif char == ')':
            if not stack:       # Nothing to match!
                return False
            stack.pop()         # Pop matching opening
    
    return len(stack) == 0      # Stack should be empty

# Examples
print(is_balanced("(())"))     # True
print(is_balanced("((())"))    # False - unmatched (
print(is_balanced("())"))      # False - unmatched )
\`\`\`

---

## 2. Queues - First In, First Out (FIFO)

### Simple Explanation

Think of a **line at a ticket counter**:
- New people join at the BACK
- People are served from the FRONT
- First person in line is served first

\`\`\`
Adding to queue:        Removing from queue:
Front                   Front
  ↓                       ↓
[1] [2] [3] ← Back      [1] leaves first!
\`\`\`

### Real-World Examples

- **Print queue** - First document sent, first to print
- **Customer service** - First caller, first served
- **BFS algorithm** - Explore nodes in order
- **Task scheduling** - Process tasks in order received

### Queue Implementation

\`\`\`python path=null start=null
from collections import deque  # Double-ended queue

class Queue:
    def __init__(self):
        self.items = deque()  # More efficient than list
    
    def enqueue(self, item):
        """Add item to BACK - O(1)"""
        self.items.append(item)
    
    def dequeue(self):
        """Remove and return FRONT item - O(1)"""
        if self.is_empty():
            return None
        return self.items.popleft()  # Remove from left
    
    def front(self):
        """Look at FRONT without removing - O(1)"""
        if self.is_empty():
            return None
        return self.items[0]
    
    def is_empty(self):
        return len(self.items) == 0

# Let's use it!
queue = Queue()
queue.enqueue("Alice")   # Queue: [Alice]
queue.enqueue("Bob")     # Queue: [Alice, Bob]
queue.enqueue("Charlie") # Queue: [Alice, Bob, Charlie]

print(queue.front())    # Alice (first in line)
print(queue.dequeue())  # Alice (served first!)
print(queue.dequeue())  # Bob
print(queue.front())    # Charlie (now first)
\`\`\`

---

## 3. Deque - Double-Ended Queue

Can add/remove from BOTH ends! Best of both worlds.

\`\`\`python path=null start=null
from collections import deque

dq = deque()

# Add from both ends
dq.append(3)       # Right: [3]
dq.appendleft(1)   # Left:  [1, 3]
dq.append(5)       # Right: [1, 3, 5]

# Remove from both ends
dq.pop()           # Remove 5 from right
dq.popleft()       # Remove 1 from left
# Result: [3]
\`\`\`

---

## 4. Priority Queue (Bonus)

Items have priorities. Highest priority served first!

\`\`\`python path=null start=null
import heapq

# Min heap - smallest value = highest priority
pq = []
heapq.heappush(pq, 30)  # Add 30
heapq.heappush(pq, 10)  # Add 10
heapq.heappush(pq, 20)  # Add 20

print(heapq.heappop(pq))  # 10 (smallest first!)
print(heapq.heappop(pq))  # 20
print(heapq.heappop(pq))  # 30
\`\`\`

---

## Key Takeaways

| Feature | Stack | Queue | Deque |
|:--------|:------|:------|:------|
| Add | Top only | Back only | Both ends |
| Remove | Top only | Front only | Both ends |
| Order | LIFO | FIFO | Either |
| All ops | O(1) | O(1) | O(1) |

**Remember:**
- **Stack** = Pile of dishes (top only)
- **Queue** = Line at store (back in, front out)
- **Deque** = VIP line (either end)
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "sq-q1",
      question: "Which data structure follows LIFO principle?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      correctAnswer: 1,
      explanation:
        "Stack = LIFO (Last In, First Out). Like a stack of plates - last plate placed on top is first to be removed.",
      difficulty: "easy",
    },
    {
      id: "sq-q2",
      question: "Deque allows insertion/deletion at:",
      options: ["Front only", "Rear only", "Both ends", "Middle only"],
      correctAnswer: 2,
      explanation:
        "Deque = Double-Ended Queue. Can add/remove from both front and rear. All operations are O(1).",
      difficulty: "easy",
    },
    {
      id: "sq-q3",
      question:
        "Which data structure would you use for the browser Back button?",
      options: ["Queue", "Stack", "Array", "Heap"],
      correctAnswer: 1,
      explanation:
        "Stack is perfect for browser history. Push visited pages, pop to go back. LIFO order matches navigation.",
      difficulty: "easy",
    },
    {
      id: "sq-q4",
      question:
        "In a queue, elements are added at _____ and removed from _____.",
      options: ["Front, Rear", "Rear, Front", "Top, Bottom", "Bottom, Top"],
      correctAnswer: 1,
      explanation:
        "Queue: Add at Rear (enqueue), Remove from Front (dequeue). Like a line at ticket counter - join at back, served from front.",
      difficulty: "easy",
    },
    {
      id: "sq-q5",
      question:
        "What is the time complexity of push and pop operations in a stack?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      correctAnswer: 2,
      explanation:
        "Both push and pop are O(1). Stack only operates on top element - no traversal needed.",
      difficulty: "easy",
    },
    {
      id: "sq-q6",
      question: "Which problem is best solved using a stack?",
      options: [
        "BFS traversal",
        "Balanced parentheses check",
        "Finding shortest path",
        "Level order traversal",
      ],
      correctAnswer: 1,
      explanation:
        "Balanced parentheses uses stack. Push opening brackets, pop for closing. If stack empty at end and no mismatch = balanced.",
      difficulty: "easy",
    },
    {
      id: "sq-q7",
      question: "Which algorithm uses a queue?",
      options: ["DFS", "Binary Search", "BFS", "Quick Sort"],
      correctAnswer: 2,
      explanation:
        "BFS (Breadth-First Search) uses queue. Process nodes level by level - FIFO order ensures level-wise traversal.",
      difficulty: "easy",
    },
    {
      id: "sq-q8",
      question: "A queue can be implemented using:",
      options: [
        "Only arrays",
        "Only linked lists",
        "Both arrays and linked lists",
        "Neither",
      ],
      correctAnswer: 2,
      explanation:
        "Queue can use both. Array-based queue may need resizing. Linked list provides O(1) operations but more memory per element.",
      difficulty: "easy",
    },
    {
      id: "sq-q9",
      question: "What happens when you pop from an empty stack?",
      options: [
        "Returns 0",
        "Returns null/None",
        "Stack underflow error",
        "Depends on implementation",
      ],
      correctAnswer: 3,
      explanation:
        "Depends on implementation. May throw exception (stack underflow), return null, or return special value. Good code checks isEmpty() first.",
      difficulty: "medium",
    },
    {
      id: "sq-q10",
      question:
        "In a circular queue of size n, if front=3 and rear=3, the queue is:",
      options: ["Empty", "Full", "Has one element", "Cannot determine"],
      correctAnswer: 3,
      explanation:
        "Cannot determine with just front=rear. Could be empty (initial state) or full (after n insertions). Need additional flag or counter.",
      difficulty: "medium",
    },
  ],
};
