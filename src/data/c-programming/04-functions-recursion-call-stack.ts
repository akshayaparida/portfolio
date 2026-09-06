import { LearningModule } from "@/types/learning";

export const functionsRecursionCallStackModule: LearningModule = {
  id: "04-functions-recursion-call-stack",
  title: "4. Functions, Call Stack & Recursion",
  description:
    "Activation records, stack frame layout, pass-by-value vs pointer simulation, recursive tree tracing with static state, and function pointer jump tables in C",
  status: "completed",
  tags: ["C Programming", "GATE CS", "UGC NET", "Recursion"],
  detailedContent: `# Functions, Call Stack Mechanics, Recursion & Function Pointers

> **GATE CS & UGC NET JRF Core Subject**
> Exam Weightage: 2–3 Questions every year tracing recursive function calls with \`static\` variables, stack frame allocation, and function pointer signatures.

---

## 1. Technical Jargon & The Activation Record

Every time a function is invoked in C, a contiguous block of memory called an **Activation Record (Stack Frame)** is pushed onto the runtime **Call Stack**.

\`\`\`
Process Virtual Memory Map:
High Addresses (0xFFFF...)
┌────────────────────────────────────────────────────────┐
│                   Kernel Space                         │
├────────────────────────────────────────────────────────┤
│                   STACK (grows downward ↓)             │
│   ┌────────────────────────────────────────────────┐   │
│   │ [main's frame]                                 │   │
│   │   - Local vars                                 │   │
│   ├────────────────────────────────────────────────┤   │
│   │ [foo's frame]                                  │   │
│   │   - Parameters passed by caller                │   │
│   │   - Return Address (where to resume in caller) │   │
│   │   - Saved Frame Pointer (EBP/RBP)              │   │
│   │   - Local variables of foo                     │   │
│   └────────────────────────────────────────────────┘   │
│                            ↓                           │
│                     (Free Memory)                      │
│                            ↑                           │
│                   HEAP (grows upward ↑)                │
│                   (malloc / free)                      │
├────────────────────────────────────────────────────────┤
│                   BSS Segment (Uninitialized Static)   │
├────────────────────────────────────────────────────────┤
│                   Data Segment (Initialized Static)    │
├────────────────────────────────────────────────────────┤
│                   Text Segment (Machine Code Instructions│
└────────────────────────────────────────────────────────┘
Low Addresses (0x0000...)
\`\`\`

1. **Stack Frame / Activation Record**: The private memory block containing function parameters, local automatic variables, temporary values, saved registers, and the return address.
2. **Stack Pointer (\`SP\` / \`RSP\`)**: Register pointing to the current top of the stack.
3. **Frame / Base Pointer (\`BP\` / \`RBP\`)**: Fixed reference register used to calculate offsets for parameters (positive offset) and local variables (negative offset).
4. **Call by Value**: In C, **ALL arguments are passed strictly by value**. The parameter receives a copy of the caller's argument. Modifying the formal parameter has zero effect on the caller.
5. **Call by Reference Simulation**: C has no native reference type (unlike C++). Simulated call-by-reference is achieved by passing the **memory address (pointer)** by value, enabling the callee to dereference and modify caller memory.
6. **Tail Call**: A function call performed as the final action within a function. A compiler can optimize tail recursion into a jump loop without allocating new stack frames (Tail Call Optimization).

---

## 2. Parameter Passing: Passing Values vs. Passing Pointers

\`\`\`c
#include <stdio.h>

// 1. FAILS: Pass-by-value makes copies. Caller's variables are UNCHANGED.
void swap_wrong(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}

// 2. SUCCEEDS: Addresses are passed. Dereferencing modifies caller's variables directly.
void swap_correct(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    int x = 10, y = 20;
    swap_wrong(x, y);
    printf("%d %d\\n", x, y); // Still 10 20

    swap_correct(&x, &y);
    printf("%d %d\\n", x, y); // Now 20 10
    return 0;
}
\`\`\`

---

## 3. Recursion Mechanics & Stack Unwinding

Recursion consists of two phases:
1. **Winding Phase**: Successive stack frames are allocated on the stack until the **Base Case** condition is satisfied.
2. **Unwinding Phase**: Functions complete their work, return computed values to their callers, and have their stack frames deallocated.

\`\`\`
Tracing factorial(3):
Winding:   main() --> push factorial(3) --> push factorial(2) --> push factorial(1) [Base case: returns 1]
Unwinding: factorial(2) receives 1, returns 2*1=2 --> factorial(3) receives 2, returns 3*2=6 --> main() receives 6
\`\`\`

---

## 4. GATE Exam Focus: Recursion with \`static\` and Global State

The #1 most frequent C programming question pattern in GATE CS involves recursive functions containing \`static\` variables.

### The Critical Rule:
- Normal local variables have independent copies in **every stack frame**.
- \`static\` variables have **ONLY ONE COPY IN THE ENTIRE PROGRAM** (stored in the data segment). Any modification in any frame permanently alters the value seen by ALL frames during both winding and unwinding!

\`\`\`c
#include <stdio.h>

int f(int n) {
    static int i = 1;
    if (n >= 5)
        return n;
    n = n + i;
    i++;
    return f(n);
}

int main(void) {
    printf("%d\\n", f(1));
    return 0;
}
\`\`\`

### Step-by-Step Execution Trace:
- **Iteration 1**: \`f(1)\`
  - \`static int i = 1\`
  - \`n >= 5\` is false ($1 < 5$).
  - \`n = n + i\` $\\implies n = 1 + 1 = 2$.
  - \`i++\` $\\implies i = 2$.
  - Calls \`f(2)\`.
- **Iteration 2**: \`f(2)\`
  - \`n = 2\`, \`i = 2\`.
  - \`n >= 5\` is false ($2 < 5$).
  - \`n = n + i\` $\\implies n = 2 + 2 = 4$.
  - \`i++\` $\\implies i = 3$.
  - Calls \`f(4)\`.
- **Iteration 3**: \`f(4)\`
  - \`n = 4\`, \`i = 3\`.
  - \`n >= 5\` is false ($4 < 5$).
  - \`n = n + i\` $\\implies n = 4 + 3 = 7$.
  - \`i++\` $\\implies i = 4$.
  - Calls \`f(7)\`.
- **Iteration 4**: \`f(7)\`
  - \`n = 7\`, \`i = 4\`.
  - \`n >= 5\` is true ($7 \\ge 5$).
  - Returns \`7\`.
- Output: **7**.

---

## 5. Function Pointers: Syntax & Jump Tables

A function in C resides in the text (code) segment and has a memory entry point address. A **Function Pointer** holds this code address.

### 5.1 Function Pointer Syntax

\`\`\`c
// Declaration of a function pointer 'fp' that takes two ints and returns an int:
int (*fp)(int, int);

// Concrete functions:
int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }

int main(void) {
    fp = add; // Or fp = &add (both are equivalent in C)
    printf("Add: %d\\n", fp(10, 5)); // Prints 15 (or (*fp)(10, 5))

    fp = mul;
    printf("Mul: %d\\n", fp(10, 5)); // Prints 50
    return 0;
}
\`\`\`

### 5.2 Jump Tables (Array of Function Pointers)

Instead of huge \`switch\` or chained \`if-else\` blocks, high-performance systems and OS kernels use **Jump Tables**:

\`\`\`c
typedef int (*Operation)(int, int);

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }

int main(void) {
    // Array of function pointers:
    Operation jump_table[] = {add, sub, mul};

    int op_code = 2; // 0=add, 1=sub, 2=mul
    int result = jump_table[op_code](10, 4); // Calls mul(10, 4) in O(1) time
    printf("Result = %d\\n", result); // 40
    return 0;
}
\`\`\`

---

## 6. Best Practices & Defensive Function Design

1. **Always Establish a Base Case First in Recursion**:
   Verify that recursive arguments strictly advance towards the base condition to prevent Stack Overflow (\`SIGSEGV\`).
2. **Favor Iteration for Simple Loops**:
   Recursion carries stack frame overhead (register saving, parameter copying). Use iteration unless the underlying data structure is recursive (trees, divide & conquer).
3. **Use \`typedef\` for Function Pointer Readability**:
   Writing \`void (*cb)(int)\` everywhere is prone to bugs. Write \`typedef void (*Callback)(int);\` instead.
`,
  practiceQuiz: [
    {
      id: "c-t4-q1",
      question:
        "Consider the C function:\n\nint f(int n) {\n    static int r = 0;\n    if (n <= 0) return 1;\n    if (n > 3) {\n        r = n;\n        return f(n - 2) + 2;\n    }\n    return f(n - 1) + r;\n}\n\nWhat is the return value of f(5)?",
      options: ["18", "16", "14", "12"],
      correctAnswer: 0,
      explanation:
        "Trace:\n1. f(5): n=5 > 3. Sets static r = 5. Calls f(3) + 2.\n2. f(3): n=3 (not > 3). Calls f(2) + r.\n3. f(2): n=2. Calls f(1) + r.\n4. f(1): n=1. Calls f(0) + r.\n5. f(0): n=0 <= 0. Base case returns 1.\nNow unwinding with r = 5:\n- f(1) = f(0) + r = 1 + 5 = 6.\n- f(2) = f(1) + r = 6 + 5 = 11.\n- f(3) = f(2) + r = 11 + 5 = 16.\n- f(5) = f(3) + 2 = 16 + 2 = 18.\nOutput is 18.",
      difficulty: "hard",
      type: "MCQ",
      topicTag: "Recursion with Static State",
    },
    {
      id: "c-t4-q2",
      question:
        "Which information is NOT stored inside a function's activation record (stack frame)?",
      options: [
        "Return address to the calling function",
        "Local automatic variables",
        "Global variables declared with external linkage",
        "Saved machine registers",
      ],
      correctAnswer: 2,
      explanation:
        "Global variables with external linkage reside permanently in the Data Segment (.data for initialized, .bss for uninitialized) of the process address space. They are never placed inside dynamic activation records on the call stack.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Activation Records",
    },
    {
      id: "c-t4-q3",
      question: "In C, how are parameters passed to functions by default?",
      options: [
        "Call by reference for primitives, call by value for arrays",
        "Strictly call by value for all types",
        "Call by reference for all types",
        "Call by name",
      ],
      correctAnswer: 1,
      explanation:
        "ISO C is strictly a call-by-value language. Even when passing an array, the array decays to a pointer, and that pointer value itself is copied and passed by value into the function parameter.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Parameter Passing",
    },
    {
      id: "c-t4-q4",
      question:
        'What is printed by the following code?\n\n#include <stdio.h>\nvoid func(int *p) {\n    static int q = 100;\n    p = &q;\n}\nint main(void) {\n    int a = 10;\n    int *ptr = &a;\n    func(ptr);\n    printf("%d\\n", *ptr);\n    return 0;\n}',
      options: ["100", "10", "0", "Runtime error"],
      correctAnswer: 1,
      explanation:
        "The pointer 'ptr' is passed by value to 'func(int *p)'. Inside 'func', modifying 'p = &q;' only updates the local parameter copy 'p'. The caller's pointer 'ptr' in main() remains pointing to 'a'. Thus *ptr prints 10.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Pointer Pass by Value",
    },
    {
      id: "c-t4-q5",
      question:
        "What is the output of the recursive function call mystery(4, 3)?\n\nint mystery(int a, int b) {\n    if (b == 0) return 0;\n    if (b % 2 == 0) return mystery(a + a, b / 2);\n    return mystery(a + a, b / 2) + a;\n}",
      options: ["7", "12", "64", "0"],
      correctAnswer: 1,
      explanation:
        "This is Russian Peasant / Binary Multiplication computing a * b:\nmystery(4, 3) = mystery(8, 1) + 4\nmystery(8, 1) = mystery(16, 0) + 8\nmystery(16, 0) = 0\nUnwinding: 0 + 8 = 8; 8 + 4 = 12.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Recursive Computation",
    },
    {
      id: "c-t4-q6",
      question:
        "Which of the following defines a pointer to a function that takes an integer and returns a pointer to a double?",
      options: [
        "double (*fp)(int*);",
        "double *(*fp)(int);",
        "double *fp(int);",
        "(*double) fp(int);",
      ],
      correctAnswer: 1,
      explanation:
        "Using the Right-Left rule: 'double *(*fp)(int);' -> fp is a pointer to a function taking int and returning pointer to double. Note that 'double *fp(int);' is a regular function declaration returning double*.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Function Pointers",
    },
    {
      id: "c-t4-q7",
      question:
        "What causes a Stack Overflow error during deep or infinite recursion in C?",
      options: [
        "The Heap memory runs out of space for malloc()",
        "The Call Stack grows downward and exceeds the stack segment memory limit allocated by the OS",
        "The CPU instruction cache overflows",
        "Static variables exceed their maximum limit",
      ],
      correctAnswer: 1,
      explanation:
        "Each recursive function call creates a new activation record on the stack. Infinite or excessively deep recursion exhausts the fixed stack segment size (typically 1MB to 8MB), causing a stack overflow exception (SIGSEGV).",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Call Stack Mechanics",
    },
    {
      id: "c-t4-q8",
      question: "What is a Tail-Recursive function?",
      options: [
        "A function where the recursive call is the very first statement",
        "A function where the recursive call is the absolute final operation, with no pending computations after the call returns",
        "A function that calls itself multiple times in a loop",
        "A function that returns a pointer to a linked list tail",
      ],
      correctAnswer: 1,
      explanation:
        "A function is tail-recursive if the recursive call is the final action performed before returning, meaning the caller performs no further work on the return value. This allows compilers to reuse the current stack frame.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Tail Recursion",
    },
    {
      id: "c-t4-q9",
      question:
        'What is printed by the program?\n\n#include <stdio.h>\nvoid foo(int n) {\n    if (n <= 0) return;\n    printf("%d ", n);\n    foo(n - 2);\n    printf("%d ", n);\n}\nint main(void) {\n    foo(4);\n    return 0;\n}',
      options: ["4 2 2 4", "4 2 0 2 4", "4 2 4 2", "2 4 2 4"],
      correctAnswer: 0,
      explanation:
        "Winding: foo(4) prints '4 ', calls foo(2). foo(2) prints '2 ', calls foo(0). foo(0) returns immediately (n<=0). Unwinding: foo(2) resumes and prints '2 '. foo(4) resumes and prints '4 '. Output: '4 2 2 4 '.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Recursive Winding & Unwinding",
    },
    {
      id: "c-t4-q10",
      question:
        "If 'void f(void)' is a function, which of the following statements correctly invokes it through a function pointer 'fp'?",
      options: [
        "fp = &f; (*fp)();",
        "fp = f; fp();",
        "Both fp = &f; (*fp)(); and fp = f; fp(); are fully legal in standard C",
        "Neither is legal",
      ],
      correctAnswer: 2,
      explanation:
        "In ISO C, function designators automatically decay to pointers to functions, and calling a function pointer with 'fp()' is syntactically valid shorthand for '(*fp)()'. Both forms are completely legal and equivalent.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Function Pointer Invocation",
    },
  ],
};
