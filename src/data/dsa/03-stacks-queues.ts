import { LearningModule } from "@/types/learning";

export const stacksQueuesModule: LearningModule = {
  id: "03-stacks-queues",
  title: "3. Stacks & Queues",
  description: "LIFO and FIFO operations - fundamental for algorithms",
  status: "completed",
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

## 2. Stack Overflow & Underflow

When implementing a stack using a **fixed-size array**, two critical conditions arise:

\`\`\`text
Overflow  → Trying to PUSH when stack is FULL
Underflow → Trying to POP when stack is EMPTY
\`\`\`

### Push Algorithm (with Overflow check)

\`\`\`text
PUSH(stack, item):
  Step 1: if TOP == MAX_SIZE - 1
            Print "Stack Overflow"
            Return
  Step 2: TOP = TOP + 1
  Step 3: stack[TOP] = item
\`\`\`

### Pop Algorithm (with Underflow check)

\`\`\`text
POP(stack):
  Step 1: if TOP == -1
            Print "Stack Underflow"
            Return
  Step 2: item = stack[TOP]
  Step 3: TOP = TOP - 1
  Step 4: Return item
\`\`\`

---

## 3. Array-Based Stack Implementation

A stack can be implemented using a **fixed-size array** with a **TOP variable** tracking the topmost element.

\`\`\`text
  Array Implementation:

  Index:  [0] [1] [2] [3] [4]    MAX_SIZE = 5
  Values: [10][20][30][ ][ ]
                    ↑
                   TOP = 2

  Push 40:  [10][20][30][40][ ]   TOP = 3
  Pop:      [10][20][30][ ][ ]   TOP = 2, returns 40
\`\`\`

**C Implementation:**

\`\`\`c path=null start=null
#define MAX_SIZE 100
int stack[MAX_SIZE];
int top = -1;  // Empty stack

void push(int item) {
    if (top == MAX_SIZE - 1) {
        printf("Stack Overflow!\\n");
        return;
    }
    stack[++top] = item;
}

int pop() {
    if (top == -1) {
        printf("Stack Underflow!\\n");
        return -1;
    }
    return stack[top--];
}

int peek() {
    if (top == -1) return -1;
    return stack[top];
}
\`\`\`

**Trade-off:**

| Feature | Array-based Stack | Linked List-based Stack |
|:--------|:-----------------|:-----------------------|
| Size | Fixed (must declare beforehand) | Dynamic (grows as needed) |
| Overflow | Possible | Not possible (until memory exhausted) |
| Memory | No extra pointer overhead | Extra pointer per node |
| Cache | Better (contiguous memory) | Worse (scattered nodes) |

---

## 4. Arithmetic Expression Types

Arithmetic expressions can be written in three **notations**:

| Notation | Operator Position | Example | Invented By |
|:---------|:-----------------|:--------|:------------|
| **Infix** | Between operands | A + B | Standard math |
| **Prefix** (Polish) | Before operands | + A B | Jan Łukasiewicz |
| **Postfix** (RPN) | After operands | A B + | Reverse Polish |

### More Examples

| Infix | Prefix | Postfix |
|:------|:-------|:--------|
| A + B | + A B | A B + |
| A + B * C | + A * B C | A B C * + |
| (A + B) * C | * + A B C | A B + C * |
| A + B - C | - + A B C | A B + C - |
| A * (B + C) | * A + B C | A B C + * |

---

## 5. Operator Precedence

| Priority | Operator | Associativity |
|:---------|:---------|:--------------|
| Highest | ( ) Parentheses | — |
| 2nd | ^ Exponentiation | Right to Left |
| 3rd | \`*\` \`/\` Multiply, Divide | Left to Right |
| Lowest | \`+\` \`-\` Add, Subtract | Left to Right |

> **Note:** Exponentiation is **right-associative**: \`2^3^2 = 2^(3^2) = 512\`, NOT \`(2^3)^2 = 64\`.

---

## 6. Postfix Evaluation (Using Stack)

### Algorithm

\`\`\`text
EVALUATE_POSTFIX(expression):
  Step 1: Scan expression LEFT to RIGHT
  Step 2: If OPERAND → Push to stack
  Step 3: If OPERATOR →
            Pop two operands (B = pop, A = pop)
            Compute result = A operator B
            Push result back to stack
  Step 4: Final value in stack = ANSWER
\`\`\`

### Worked Example

**Infix:** \`1 + 2 - 3 * (4 / 2)\`
**Postfix:** \`1 2 + 3 4 2 / * -\`

\`\`\`text
Step-by-step evaluation of: 1 2 + 3 4 2 / * -

Token  | Action              | Stack
-------|---------------------|----------
  1    | Push 1              | [1]
  2    | Push 2              | [1, 2]
  +    | Pop 2,1 → 1+2=3     | [3]
  3    | Push 3              | [3, 3]
  4    | Push 4              | [3, 3, 4]
  2    | Push 2              | [3, 3, 4, 2]
  /    | Pop 2,4 → 4/2=2     | [3, 3, 2]
  *    | Pop 2,3 → 3*2=6     | [3, 6]
  -    | Pop 6,3 → 3-6=-3    | [-3]

Result = -3  ✓
\`\`\`

---

## 7. Infix to Postfix Conversion (Using Stack)

### Algorithm

\`\`\`text
INFIX_TO_POSTFIX(expression):
  Create empty stack (for operators)
  Create empty output string

  Scan expression LEFT to RIGHT:
    If OPERAND → Add to output
    If '(' → Push to stack
    If ')' → Pop and add to output until '(' found
    If OPERATOR →
      While stack top has HIGHER or EQUAL precedence:
        Pop and add to output
      Push current operator to stack

  Pop remaining operators from stack → Add to output
\`\`\`

### Worked Example

**Infix:** \`A + (B - C * (D / E ^ F))\`

\`\`\`text
Step-by-step conversion:

Token  | Action                          | Stack      | Output
-------|---------------------------------|------------|-------------------
  A    | Operand → output                |            | A
  +    | Push operator                   | [+]        | A
  (    | Push (                          | [+, (]     | A
  B    | Operand → output                | [+, (]     | A B
  -    | Push operator                   | [+, (, -]  | A B
  C    | Operand → output                | [+, (, -]  | A B C
  *    | * > - → Push                    | [+,(,-,*]  | A B C
  (    | Push (                          | [+,(,-,*,(]| A B C
  D    | Operand → output                | [+,(,-,*,(]| A B C D
  /    | Push operator                   | [+,(,-,*,(,/]| A B C D
  E    | Operand → output                | [+,(,-,*,(,/]| A B C D E
  ^    | ^ > / → Push                   | [+,(,-,*,(,/,^]| A B C D E
  F    | Operand → output                | [+,(,-,*,(,/,^]| A B C D E F
  )    | Pop until ( → ^, /              | [+,(,-,*]  | A B C D E F ^ /
  )    | Pop until ( → *, -              | [+]        | A B C D E F ^ / * -
  END  | Pop remaining → +               |            | A B C D E F ^ / * - +

Postfix: A B C D E F ^ / * - +  ✓
\`\`\`

---

## 8. Properties of Polish Notation

**Key Property:** Prefix and Postfix notations **do NOT need parentheses**.

The order of operations is determined entirely by the **position of operators**.

\`\`\`text
Infix (needs parentheses):    (A + B) * C   vs   A + (B * C)
Prefix (no parentheses):      * + A B C     vs   + A * B C
Postfix (no parentheses):     A B + C *     vs   A B C * +

Each expression is UNAMBIGUOUS without parentheses!
\`\`\`

**Why this matters:**
- Computers evaluate postfix/prefix expressions **much more efficiently**
- No need to handle operator precedence during evaluation
- Stack-based evaluation is simple and fast
- Compilers convert infix → postfix before generating machine code

---

## 9. Queues - First In, First Out (FIFO)

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

## 4. Priority Queue

Items have priorities. Highest priority served first, regardless of when they entered the queue!

**Key Concepts:**
- Typically implemented using **Heaps** (which we will cover in a later module).
- Can be a **Min-Priority Queue** (smallest value first) or **Max-Priority Queue** (largest value first).
- **Applications:** CPU scheduling, Dijkstra's Shortest Path Algorithm, A* Search.

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

---

## TL;DR - Quick Recall

**One-liner for each concept:**

| Concept | Key Takeaway |
|:--------|:-------------|
| **Stack** | LIFO (Last In, First Out); \`push\` and \`pop\` in \`O(1)\`. |
| **Queue** | FIFO (First In, First Out); \`enqueue\` (back) and \`dequeue\` (front) in \`O(1)\`. |
| **Deque** | Double-ended queue; add/remove from both ends in \`O(1)\`. |
| **Priority Queue**| Items served by priority (via Heaps), not insertion order; \`O(log n)\` operations. |
| **Applications** | **Stacks**: Undo/Redo, Valid Parentheses, DFS. **Queues**: Print Jobs, BFS. |

**Essential Code Snippets:**

\`\`\`python
# Stack (using list)
stack = []
stack.append(1)  # Push (O(1))
stack.pop()      # Pop (O(1))

# Queue (using deque - NEVER use list for queues)
from collections import deque
q = deque()
q.append(1)    # Enqueue (O(1))
q.popleft()    # Dequeue (O(1))

# Priority Queue / Min-Heap
import heapq
pq = []
heapq.heappush(pq, 5) # O(log n)
lowest = heapq.heappop(pq) # O(log n)
\`\`\`

**The Golden Rules:**
1. **Never** use a standard Python \`list\` as a Queue (using \`list.pop(0)\` is \`O(n)\`). Always import \`collections.deque\`.
2. Stack is the foundation of **Depth-First Search (DFS)** & Recursion.
3. Queue is the foundation of **Breadth-First Search (BFS)**.

---

## Additional Resources

**Video Courses:**
- [NeetCode - Valid Parentheses](https://youtu.be/WTzjTskDFMg) - Classic stack problem walkthrough
- [Abdul Bari - Stacks and Queues](https://youtu.be/sFVxsglODoo) - Deep dive for university exams

**Articles & Visualizations:**
- [VisuAlgo - Stack/Queue](https://visualgo.net/en/list) - Interactive array operations

**Practice Problems:**
- LeetCode 20: Valid Parentheses
- LeetCode 155: Min Stack
- LeetCode 225: Implement Stack using Queues
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
      difficulty: "easy" as const,
    },
    {
      id: "sq-q2",
      question: "Deque allows insertion/deletion at:",
      options: ["Front only", "Rear only", "Both ends", "Middle only"],
      correctAnswer: 2,
      explanation:
        "Deque = Double-Ended Queue. Can add/remove from both front and rear. All operations are O(1).",
      difficulty: "easy" as const,
    },
    {
      id: "sq-q3",
      question:
        "Which data structure would you use for the browser Back button?",
      options: ["Queue", "Stack", "Array", "Heap"],
      correctAnswer: 1,
      explanation:
        "Stack is perfect for browser history. Push visited pages, pop to go back. LIFO order matches navigation.",
      difficulty: "easy" as const,
    },
    {
      id: "sq-q4",
      question:
        "In a queue, elements are added at _____ and removed from _____.",
      options: ["Front, Rear", "Rear, Front", "Top, Bottom", "Bottom, Top"],
      correctAnswer: 1,
      explanation:
        "Queue: Add at Rear (enqueue), Remove from Front (dequeue). Like a line at ticket counter - join at back, served from front.",
      difficulty: "easy" as const,
    },
    {
      id: "sq-q5",
      question:
        "What is the time complexity of push and pop operations in a stack?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      correctAnswer: 2,
      explanation:
        "Both push and pop are O(1). Stack only operates on top element - no traversal needed.",
      difficulty: "easy" as const,
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
      difficulty: "easy" as const,
    },
    {
      id: "sq-q7",
      question: "Which algorithm uses a queue?",
      options: ["DFS", "Binary Search", "BFS", "Quick Sort"],
      correctAnswer: 2,
      explanation:
        "BFS (Breadth-First Search) uses queue. Process nodes level by level - FIFO order ensures level-wise traversal.",
      difficulty: "easy" as const,
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
      difficulty: "easy" as const,
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
      difficulty: "medium" as const,
    },
    {
      id: "sq-q10",
      question:
        "In a circular queue of size n, if front=3 and rear=3, the queue is:",
      options: ["Empty", "Full", "Has one element", "Cannot determine"],
      correctAnswer: 3,
      explanation:
        "Cannot determine with just front=rear. Could be empty (initial state) or full (after n insertions). Need additional flag or counter.",
      difficulty: "medium" as const,
    },
    {
      id: "sq-q11",
      question:
        "What is the postfix expression for the infix expression A + B * C?",
      options: ["A B + C *", "A B C * +", "+ A * B C", "A B C + *"],
      correctAnswer: 1,
      explanation:
        "Multiplication has higher precedence than addition. B*C is evaluated first → postfix: A B C * +.",
      difficulty: "medium" as const,
    },
    {
      id: "sq-q12",
      question: "Evaluate the postfix expression: 5 3 + 8 2 - *",
      options: ["48", "16", "40", "24"],
      correctAnswer: 0,
      explanation:
        "5+3=8, 8-2=6, 8*6=48. Steps: push 5,3; pop and add=8; push 8,2; pop and subtract=6; pop 8,6 and multiply=48.",
      difficulty: "medium" as const,
    },
    {
      id: "sq-q13",
      question:
        "Which notation does NOT require parentheses to define order of operations?",
      options: [
        "Infix",
        "Prefix (Polish)",
        "Both Prefix and Postfix",
        "None of the above",
      ],
      correctAnswer: 2,
      explanation:
        "Both Prefix and Postfix notations are unambiguous without parentheses. Only Infix needs parentheses to override precedence.",
      difficulty: "easy" as const,
    },
    {
      id: "sq-q14",
      question:
        "In infix to postfix conversion, what happens when ')' is encountered?",
      options: [
        "Push ')' to stack",
        "Pop and output until '(' is found",
        "Ignore it",
        "Push all operators to output",
      ],
      correctAnswer: 1,
      explanation:
        "When ')' is encountered, pop operators from stack and add to output until matching '(' is found. The '(' is discarded.",
      difficulty: "medium" as const,
    },
    {
      id: "sq-q15",
      question: "What is the prefix notation for (A + B) * (C - D)?",
      options: [
        "* + A B - C D",
        "+ A B * - C D",
        "* A + B C - D",
        "+ * A B - C D",
      ],
      correctAnswer: 0,
      explanation:
        "Prefix places operator before operands. (A+B) → +AB, (C-D) → -CD, then multiply → *+AB-CD.",
      difficulty: "medium" as const,
    },
    {
      id: "sq-q16",
      question: "Trying to push an element onto a full stack causes:",
      options: ["Underflow", "Overflow", "Segmentation fault", "No error"],
      correctAnswer: 1,
      explanation:
        "Stack Overflow occurs when pushing to a full stack (TOP == MAX_SIZE - 1). Underflow occurs when popping from an empty stack.",
      difficulty: "easy" as const,
    },
    {
      id: "sq-q17",
      question:
        "In a stack implemented using an array, the initial value of TOP is:",
      options: ["0", "1", "-1", "MAX_SIZE"],
      correctAnswer: 2,
      explanation:
        "TOP = -1 indicates an empty stack. After the first push, TOP becomes 0 (first index of the array).",
      difficulty: "easy" as const,
    },
    {
      id: "sq-q18",
      question: "Which of the following is NOT an application of stacks?",
      options: [
        "Expression evaluation",
        "Recursion implementation",
        "BFS traversal",
        "Backtracking",
      ],
      correctAnswer: 2,
      explanation:
        "BFS uses a Queue, not a Stack. Stacks are used for DFS, recursion, expression evaluation, undo operations, and backtracking.",
      difficulty: "easy" as const,
    },
    {
      id: "sq-q19",
      question:
        "The operator with the highest precedence in arithmetic expressions is:",
      options: [
        "+ (Addition)",
        "* (Multiplication)",
        "^ (Exponentiation)",
        "/ (Division)",
      ],
      correctAnswer: 2,
      explanation:
        "Precedence order: Parentheses > Exponentiation (^) > Multiplication/Division (*,/) > Addition/Subtraction (+,-). Among the options, ^ is highest.",
      difficulty: "easy" as const,
    },
    {
      id: "sq-q20",
      question: "The postfix form of A + (B - C * (D / E ^ F)) is:",
      options: [
        "A B C D E F ^ / * - +",
        "A B C D E ^ F / * - +",
        "+ A - B * C / D ^ E F",
        "A B - C D * E F ^ / +",
      ],
      correctAnswer: 0,
      explanation:
        "Innermost first: E^F, then D/(E^F), then C*(D/E^F), then B-C*(D/E^F), finally A+result. Postfix: A B C D E F ^ / * - +",
      difficulty: "hard" as const,
    },
  ],
};
