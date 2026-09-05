import { LearningModule } from "@/types/learning";

export const stacksModule: LearningModule = {
  id: "03-stacks",
  title: "3. Stacks & Applications",
  description:
    "LIFO mechanics, array and pointer implementations, infix to postfix/prefix conversion, expression evaluation, and recursion simulation across C, C++, and Python",
  status: "completed",
  tags: ["Data Structure", "GATE CS", "UGC NET", "NPTEL"],
  detailedContent: `# Stacks: LIFO Architecture & Expression Parsing

> **NPTEL / GATE CS / UGC NET Core Subject**
> Key Exam Questions: Minimum stack size to avoid overflow, Infix to Postfix conversion using precedence tables, Evaluation of Postfix expressions, and Parentheses matching.

---

## 1. Prerequisites & What You Should Know

Before studying stacks, make sure you understand:
- **Arrays**: How to store and access elements at indices (used for array-based stack implementation).
- **Linked Lists**: How nodes link together (used for linked-list-based stack implementation).
- **Function Calls**: How functions call other functions — this maps directly to how the OS uses stacks internally.
- **Operator Precedence**: Basic math rules like multiplication before addition (needed for expression conversion).

---

## 2. What is a Stack? (Conceptual Explanation)

### 2.1 The Stack of Plates Analogy

Imagine a **stack of plates in a cafeteria**:
- You can only **add (push)** a new plate on **top** of the pile.
- You can only **remove (pop)** the plate from the **top**.
- You cannot pull a plate from the middle or bottom without toppling everything!

This is the **Last-In, First-Out (LIFO)** principle: the last plate you placed is the first one you take off.

\`\`\`
Push 10, Push 20, Push 30:

    +——+
    |30|  ← TOP (most recently pushed, first to be popped)
    +——+
    |20|
    +——+
    |10|  ← BOTTOM (first pushed, last to be popped)
    +——+

Pop → returns 30
Pop → returns 20
Pop → returns 10
\`\`\`

### 2.2 The Abstract Data Type (ADT)

A Stack is defined by these operations (regardless of how it's implemented):

| Operation | Description | Time Complexity |
|:---|:---|:---|
| **Push(x)** | Add element \`x\` to the top | $O(1)$ |
| **Pop()** | Remove and return the top element | $O(1)$ |
| **Peek() / Top()** | View the top element without removing it | $O(1)$ |
| **isEmpty()** | Check if the stack has no elements | $O(1)$ |
| **isFull()** | Check if stack is at maximum capacity (array-based) | $O(1)$ |

> [!NOTE]
> **All core stack operations are O(1)!** This is what makes stacks incredibly efficient for their use cases.

---

## 3. Why Do We Need Stacks? (Motivation & Real-World Uses)

### 3.1 Where Are Stacks Used?

Stacks are everywhere in computing — even if you don't see them:

1. **Undo/Redo in Text Editors**: Every action is pushed onto an undo stack. When you press Ctrl+Z, the last action is popped and reversed.
2. **Browser Back Button**: Each page you visit is pushed. Clicking "Back" pops the last page.
3. **Function Call Management (OS Call Stack)**: When function \`A\` calls function \`B\`, \`A\`'s context is pushed onto the call stack. When \`B\` returns, \`A\`'s context is popped and execution resumes.
4. **Expression Evaluation**: Calculators and compilers convert infix expressions (\`3 + 4 * 2\`) to postfix (\`3 4 2 * +\`) using stacks.
5. **Parentheses Matching**: IDEs check if brackets are balanced using a stack.
6. **Depth-First Search (DFS)**: Graph traversal uses a stack (either explicitly or via recursion).
7. **Backtracking**: Solving mazes, N-Queens, Sudoku — all use a stack to remember where to backtrack.

### 3.2 The CPU Call Stack — How Functions Actually Work

This is the most important real-world stack. Every time you call a function, the CPU:

\`\`\`
main() calls factorial(3), which calls factorial(2), which calls factorial(1):

CALL STACK (grows downward):
+————————————————————+
| factorial(1)       |  ← TOP (currently executing)
| n=1, return addr   |
+————————————————————+
| factorial(2)       |
| n=2, return addr   |
+————————————————————+
| factorial(3)       |
| n=3, return addr   |
+————————————————————+
| main()             |  ← BOTTOM
| local variables    |
+————————————————————+

When factorial(1) returns 1:
  → Pop factorial(1) frame
  → Resume factorial(2) with return value 1
  → factorial(2) computes 2 * 1 = 2, returns
  → Pop factorial(2) frame
  → Resume factorial(3) with return value 2
  → factorial(3) computes 3 * 2 = 6, returns
  → Pop factorial(3) frame
  → Resume main() with return value 6
\`\`\`

> [!WARNING]
> **Stack Overflow**: If recursion goes too deep (e.g., factorial(100000) without tail-call optimization), the call stack exceeds its size limit (typically 1-8 MB), causing a **Stack Overflow Error** — the program crashes!

---

## 4. How Does It Work Internally?

### 4.1 Array-Based Stack (Most Common)

Uses a fixed-size array with a \`top\` variable tracking the index of the topmost element:

\`\`\`
Array-based Stack (capacity = 5):

Empty:       After Push(10):    After Push(20):    After Push(30):
top = -1     top = 0            top = 1            top = 2

[  ][  ][  ][  ][  ]    [10][  ][  ][  ][  ]    [10][20][  ][  ][  ]    [10][20][30][  ][  ]
                          ↑ top                       ↑ top                       ↑ top

After Pop() → returns 30:    After Pop() → returns 20:
top = 1                      top = 0

[10][20][30][  ][  ]         [10][20][30][  ][  ]
      ↑ top                   ↑ top
     (30 still in memory     (20, 30 still there but
      but inaccessible)       logically removed)
\`\`\`

**Key insight**: \`Pop()\` doesn't erase data — it just decrements \`top\`. The old data remains in the array but is treated as garbage.

### 4.2 Linked-List-Based Stack

Uses a linked list where the head is the \`top\`:

\`\`\`
Push(10), Push(20), Push(30):

top → [30|→] → [20|→] → [10|→] → NULL

Pop(): Remove head node, update top to next
top → [20|→] → [10|→] → NULL  (node 30 freed)
\`\`\`

### 4.3 Array vs Linked-List Stack

| Feature | Array Stack | Linked-List Stack |
|:---|:---|:---|
| **Capacity** | Fixed (can overflow) | Dynamic (limited by heap memory) |
| **Memory** | Compact, cache-friendly | Extra pointer per node |
| **Push/Pop** | $O(1)$ | $O(1)$ |
| **Best for** | Known max size, performance-critical | Unknown size, no overflow risk |

---

## 5. Expression Notation: Infix, Prefix, and Postfix

### 5.1 Why Postfix and Prefix Exist

Infix notation (\`A + B * C\`) is natural for humans but **ambiguous** for computers because:
- It requires **operator precedence rules** (multiply before add).
- It requires **parentheses** to override precedence.
- It requires **associativity rules** (left-to-right or right-to-left).

**Postfix** and **Prefix** notations eliminate ALL ambiguity — no parentheses needed, no precedence rules needed!

| Notation Type | Format | Operator Position | Example |
|:---|:---|:---|:---|
| **Infix** | \`A + B\` | Between operands (requires parentheses & precedence) | \`(A + B) * C\` |
| **Postfix (RPN)** | \`A B +\` | After operands (NO parentheses needed) | \`A B + C *\` |
| **Prefix (Polish)** | \`+ A B\` | Before operands (NO parentheses needed) | \`* + A B C\` |

### 5.2 Operator Precedence & Associativity Table (GATE Essential)

| Operator | Precedence Rank | Associativity |
|:---|:---|:---|
| \`^\` (Exponentiation) | Highest (3) | **Right-to-Left** |
| \`*\`, \`/\`, \`%\` | Medium (2) | Left-to-Right |
| \`+\`, \`-\` | Lowest (1) | Left-to-Right |

### 5.3 Infix to Postfix Conversion: Step-by-Step Walkthrough

Convert \`A + B * C - D\` to Postfix using a stack:

\`\`\`
Rules:
1. Operand → output immediately
2. '(' → push to stack
3. ')' → pop until '(' found
4. Operator → pop operators with >= precedence, then push current

Token   Action                           Stack      Output
—————   ——————                           —————      ——————
  A     Operand → output                  []        A
  +     Push (stack empty)                [+]       A
  B     Operand → output                  [+]       A B
  *     * > + → push (higher precedence)  [+, *]    A B
  C     Operand → output                  [+, *]    A B C
  -     Pop * (≥ prec), Pop + (≥ prec)    [-]       A B C * +
        Then push -
  D     Operand → output                  [-]       A B C * + D
 END    Pop remaining                     []        A B C * + D -

Result: A B C * + D -  ✓
\`\`\`

### 5.4 Postfix Evaluation: Step-by-Step Walkthrough

Evaluate \`2 3 4 * + 5 -\`:

\`\`\`
Token   Action                     Stack
—————   ——————                     —————
  2     Push operand               [2]
  3     Push operand               [2, 3]
  4     Push operand               [2, 3, 4]
  *     Pop 4 and 3, compute 3*4=12, push   [2, 12]
  +     Pop 12 and 2, compute 2+12=14, push [14]
  5     Push operand               [14, 5]
  -     Pop 5 and 14, compute 14-5=9, push  [9]

Result: 9  ✓ (equivalent to infix: 2 + 3 * 4 - 5 = 9)
\`\`\`

---

## 6. Parentheses Matching: Step-by-Step

Check if \`{[()]}\` is balanced:

\`\`\`
Char    Action                      Stack       Valid?
————    ——————                      —————       ——————
 {      Opening → Push              [{]         ✓
 [      Opening → Push              [{, []      ✓
 (      Opening → Push              [{, [, (]   ✓
 )      Closing → Pop, check match  [{, []      ✓ ( matches )
 ]      Closing → Pop, check match  [{]         ✓ [ matches ]
 }      Closing → Pop, check match  []          ✓ { matches }
END     Stack empty?                []          ✓ BALANCED!
\`\`\`

For \`{[(])}\`:
\`\`\`
...
 ]      Closing → Pop, check match  [{, []      ✗ ( does NOT match ]
                                                 → UNBALANCED!
\`\`\`

---

## 7. Implementation in C, C++, and Python with Syntax Logic

### C Implementation (Array Stack & Postfix Evaluation)

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <stdbool.h>

/**
 * C Syntax Logic Note:
 * 1. Stack struct: Combines fixed array with integer top index (-1 indicates empty).
 * 2. Overflow/Underflow: C has no exceptions; we must explicitly guard against
 *    top == capacity - 1 (overflow) and top == -1 (underflow).
 * 3. ctype.h: isdigit(c) checks if a character is numeric ('0'-'9').
 */

#define MAX 100

typedef struct {
    int items[MAX];
    int top;
} Stack;

void initStack(Stack* s) {
    s->top = -1; // -1 means empty stack
}

bool isEmpty(Stack* s) {
    return s->top == -1;
}

bool isFull(Stack* s) {
    return s->top == MAX - 1;
}

void push(Stack* s, int val) {
    if (isFull(s)) {
        printf("Stack Overflow!\\n");
        return;
    }
    // Increment top first, then assign
    s->items[++(s->top)] = val;
}

int pop(Stack* s) {
    if (isEmpty(s)) {
        printf("Stack Underflow!\\n");
        return -1;
    }
    // Return current top, then decrement
    return s->items[(s->top)--];
}

int peek(Stack* s) {
    if (isEmpty(s)) return -1;
    return s->items[s->top];
}

// Evaluate Postfix Expression: O(n) Time, O(n) Space
int evaluatePostfix(const char* expr) {
    Stack s;
    initStack(&s);

    for (int i = 0; expr[i] != '\\0'; i++) {
        char ch = expr[i];

        // If operand, convert char digit to int by subtracting '0' (ASCII offset)
        if (isdigit(ch)) {
            push(&s, ch - '0');
        } else {
            // Operator encountered: pop two operands
            // Important: First popped is right operand (val2), second is left (val1)
            int val2 = pop(&s);
            int val1 = pop(&s);

            switch (ch) {
                case '+': push(&s, val1 + val2); break;
                case '-': push(&s, val1 - val2); break;
                case '*': push(&s, val1 * val2); break;
                case '/': push(&s, val1 / val2); break;
            }
        }
    }
    return pop(&s);
}
\`\`\`

---

### C++ Implementation (STL std::stack & Balanced Parentheses)

\`\`\`cpp
#include <iostream>
#include <stack>
#include <string>
#include <unordered_map>

/**
 * C++ Syntax Logic Note:
 * 1. std::stack<T>: Container adapter built on top of std::deque by default.
 *    push(), pop(), top(), empty(), and size() all execute in O(1).
 * 2. std::unordered_map: Hash map for bracket matching with O(1) lookups.
 */

bool isValidParentheses(const std::string& s) {
    std::stack<char> st;
    std::unordered_map<char, char> matching = {
        {')', '('},
        {'}', '{'},
        {']', '['}
    };

    for (char c : s) {
        // If it's a closing bracket
        if (matching.count(c)) {
            if (st.empty() || st.top() != matching[c]) {
                return false; // Mismatched or unbalanced
            }
            st.pop();
        } else {
            // Opening bracket: push to stack
            st.push(c);
        }
    }
    return st.empty(); // True if all opened brackets were closed
}
\`\`\`

---

### Python Implementation (List-based Stack & Monotonic Stack)

\`\`\`python
"""
Python Syntax Logic Note:
1. Python lists are optimized for append() and pop() from the right end (O(1)).
2. pop() without arguments removes and returns the last element.
3. Monotonic Stack Pattern: A stack maintained in strictly increasing or decreasing
   order to solve "Next Greater Element" problems in O(n) total time.
"""

def next_greater_element(arr: list[int]) -> list[int]:
    """
    Finds the next greater element for each item in arr.
    Uses a decreasing monotonic stack storing INDICES.
    Time Complexity: O(n), Space Complexity: O(n).
    """
    n = len(arr)
    result = [-1] * n
    stack = []  # Stores indices

    for i in range(n):
        # While current element is greater than stack's top element
        while stack and arr[i] > arr[stack[-1]]:
            smaller_idx = stack.pop()
            result[smaller_idx] = arr[i]
        stack.append(i)

    return result
\`\`\`

---

## 8. GATE & UGC NET Key Exam Insights

> [!IMPORTANT]
> **GATE Classic: Number of Permutations Obtainable using a Stack**
> For $n$ distinct inputs pushed in order $1, 2, 3, \\dots, n$, the number of valid output permutations is given by the **$n$-th Catalan Number**:
> $$C_n = \\frac{1}{n+1} \\binom{2n}{n} = \\frac{(2n)!}{(n+1)! \\, n!}$$
> *Example for $n = 3$*:
> $C_3 = \\frac{1}{4} \\binom{6}{3} = \\frac{20}{4} = 5$ valid permutations. (Out of $3! = 6$, only $(3, 1, 2)$ cannot be produced).
`,
};
