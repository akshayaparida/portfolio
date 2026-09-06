import { LearningModule } from "@/types/learning";

export const controlFlowStorageClassesModule: LearningModule = {
  id: "02-control-flow-storage-classes",
  title: "2. Control Flow, Storage Classes & Scope",
  description:
    "Scope vs Visibility vs Lifetime, storage classes (auto, register, static, extern), internal vs external linkage, switch fallthrough mechanics, and loop control traps in C",
  status: "completed",
  tags: ["C Programming", "GATE CS", "UGC NET", "Storage Classes"],
  detailedContent: `# Control Flow, Storage Classes & Variable Scope Mechanics

> **GATE CS & UGC NET JRF Core Subject**
> Exam Weightage: 2–3 Direct Questions on static local variables inside nested loops/functions, switch fall-through quirks, and linkage differences between \`static\` and \`extern\`.

---

## 1. Technical Jargon & Core Concepts

Variable management in C is dictated by three orthogonal properties:

\`\`\`
+—————————————————————————————————————————————————————————————————————————+
| Scope:     WHERE in the code the variable identifier is recognized.     |
| Visibility:WHERE the identifier is accessible without being shadowed.   |
| Lifetime:  HOW LONG the allocated memory remains valid in execution.    |
| Linkage:   WHETHER the same identifier refers to the same object across |
|            different translation units (.c files).                      |
+—————————————————————————————————————————————————————————————————————————+
\`\`\`

1. **Scope Levels**:
   - **Block Scope**: Declared inside a block (\`{ ... }\`). Visible from declaration to closing brace.
   - **File Scope**: Declared outside all blocks. Visible from declaration point to end of the translation unit.
   - **Function Scope**: Applies exclusively to labels for \`goto\`. Labels are visible everywhere inside their enclosing function.
   - **Function Prototype Scope**: Parameter names in forward declarations; discarded immediately after the prototype ends.
2. **Linkage Types**:
   - **External Linkage**: Identifier can be referenced across multiple translation units (global variables without \`static\`, regular functions, \`extern\`).
   - **Internal Linkage**: Identifier can be accessed only within the translation unit where it is defined (file-scope \`static\` variables and functions).
   - **No Linkage**: Local variables, formal parameters, and \`typedef\` aliases; each declaration denotes a unique entity.
3. **Storage Duration (Lifetime)**:
   - **Automatic**: Allocated when the block is entered; deallocated when the block is exited. Stored on the runtime Call Stack.
   - **Static**: Allocated at program startup in the data segment; persists throughout the entire program execution until process termination.
   - **Allocated**: Dynamically allocated and freed via heap allocators (\`malloc\` / \`free\`).
   - **Thread**: Introduced in C11 (\`_Thread_local\`); persists for the duration of a thread.

---

## 2. Storage Classes in C

C defines four primary storage class specifiers: \`auto\`, \`register\`, \`static\`, and \`extern\`.

| Storage Class | Storage Region | Default Value | Lifetime | Scope | Linkage |
|:---|:---|:---|:---|:---|:---|
| **auto** | Stack | Garbage (indeterminate) | Block execution | Block | None |
| **register** | CPU Register (or Stack) | Garbage (indeterminate) | Block execution | Block | None |
| **static (local)** | Data Segment (.data / .bss) | **Zero (0)** | Entire program | Block | None |
| **static (global)**| Data Segment (.data / .bss) | **Zero (0)** | Entire program | File | **Internal** |
| **extern** | Data Segment (.data / .bss) | **Zero (0)** | Entire program | Global | **External** |

---

### 2.1 The \`register\` Storage Class & Address-of Restriction

The \`register\` keyword advises the compiler that the variable will be heavily accessed, requesting placement in a CPU register for speed.

> [!CRITICAL]
> **GATE Exam Trap: Address-of Operator \`&\` on Register Variables!**
> Because CPU registers do not have memory addresses in RAM, taking the address of a \`register\` variable using the address-of operator (\`&\`) is a **COMPILE-TIME ERROR**, even if the compiler placed it in RAM!
> \`\`\`c
> register int x = 10;
> int *p = &x; // COMPILE ERROR: address of register variable 'x' requested
> \`\`\`

---

### 2.2 The Dual Nature of \`static\`

The keyword \`static\` has two entirely different meanings depending on where it appears:

\`\`\`
                              Dual Meanings of 'static'
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 ▼                                               ▼
     Local Variable Scope                            File Scope (Global)
  Persists across function calls                  Restricts linkage to Internal
  Initialized exactly ONCE at compile-time        Hides variable/function from other
  Preserves previous mutated state                translation units (Encapsulation)
\`\`\`

#### Tricky GATE Question: Local Static in Recursive Functions

\`\`\`c
#include <stdio.h>

int f(int n) {
    static int x = 0; // Initialized ONCE before program starts
    if (n <= 0) return 1;
    x++;
    return f(n - 1) + x;
}

int main(void) {
    printf("%d\\n", f(3)); // What is the output?
    return 0;
}
\`\`\`

**Step-by-step Trace**:
1. \`f(3)\`: \`x\` becomes 1. Calls \`f(2) + x\`.
2. \`f(2)\`: \`x\` becomes 2. Calls \`f(1) + x\`.
3. \`f(1)\`: \`x\` becomes 3. Calls \`f(0) + x\`.
4. \`f(0)\`: Base case returns 1.
5. Notice: When returning and unwinding the call stack, what is the value of \`x\`?
   Since \`x\` is static and shared, its value is **3** across all stack frames!
   - \`f(1)\` returns $1 + 3 = 4$.
   - \`f(2)\` returns $4 + 3 = 7$.
   - \`f(3)\` returns $7 + 3 = 10$.
Output: **10**!

---

### 2.3 \`extern\`: Declaration vs. Definition

\`\`\`c
// File: module.h
extern int counter; // DECLARATION: informs compiler 'counter' exists elsewhere. No memory allocated!

// File: module.c
int counter = 0;    // DEFINITION: allocates memory in .bss/.data segment.
\`\`\`

> [!NOTE]
> **Tentative Definitions in C**:
> If a file-scope declaration has no storage class specifier or has \`static\`, and has no initializer, it is a **tentative definition**.
> \`\`\`c
> int x; // Tentative definition (valid C, initialized to 0 if no other definition exists)
> int x; // Legal in C! Redundant tentative definition merged into one object.
> \`\`\`

---

## 3. Control Flow Mechanics & Traps

### 3.1 The \`switch\` Statement & Fallthrough

The \`switch\` statement evaluates an integral control expression and jumps directly to the matching \`case\` label.

\`\`\`c
#include <stdio.h>

int main(void) {
    int x = 2;
    switch (x) {
        case 1: printf("1 ");
        case 2: printf("2 "); // Matches here!
        case 3: printf("3 "); // No break! Falls through!
        default: printf("D ");// Falls through into default!
    }
    return 0;
}
// Output: 2 3 D
\`\`\`

#### Key Syntax Constraints:
1. **Integer Types Only**: \`switch(expr)\` requires an integral type (\`int\`, \`char\`, \`short\`, \`long\`, \`enum\`). Floating-point numbers (\`float\`, \`double\`) and strings are **illegal**.
2. **Compile-Time Constant Case Expressions**: Every \`case\` value must be an integral constant expression (e.g., \`case 3:\` or \`case 'A':\` or \`case 2 + 3:\`). Variables like \`case x:\` are **illegal**.
3. **Labels as Jump Targets**: \`case\` labels are conceptually jump labels (similar to \`goto\`). This allows unusual but valid constructs like **Duff's Device**.

---

### 3.2 Duff's Device: Loop Unrolling via Switch

In 1983, Tom Duff created a famous loop-unrolling mechanism that illustrates the true nature of \`switch\` in C:

\`\`\`c
// Copy 'count' elements from 'from' to 'to' unrolled by a factor of 8
void send(int *to, int *from, int count) {
    int n = (count + 7) / 8;
    switch (count % 8) {
        case 0: do { *to = *from++;
        case 7:      *to = *from++;
        case 6:      *to = *from++;
        case 5:      *to = *from++;
        case 4:      *to = *from++;
        case 3:      *to = *from++;
        case 2:      *to = *from++;
        case 1:      *to = *from++;
                } while (--n > 0);
    }
}
\`\`\`

---

### 3.3 Loop Evaluation Quirks: \`break\` vs. \`continue\`

| Control Statement | Effect in \`for\` loop | Effect in \`while\` loop | Effect in \`switch\` |
|:---|:---|:---|:---|
| **break** | Terminates loop immediately, jumps past loop body | Terminates loop immediately, jumps past loop body | Exits \`switch\` block |
| **continue** | Skips remaining body, jumps to **increment expression** (\`step\`) | Skips remaining body, jumps directly to **condition check** | **ILLEGAL** unless enclosed within a loop |

\`\`\`c
// Classic Trap: Infinite loop caused by continue in while loop
int i = 0;
while (i < 5) {
    if (i == 3) {
        continue; // Jumps to 'while (i < 5)', SKIPPING 'i++'! Infinite loop!
    }
    printf("%d ", i);
    i++;
}
\`\`\`

---

## 4. Best Practices & Defensive Coding

1. **Always Annotate Intentional Fallthrough**:
   In modern C, annotate intentional fallthrough using \`/* fallthrough */\` comments or the C23 attribute \`[[fallthrough]]\` to silence compiler warnings.
2. **Every \`switch\` Must Have a \`default\` Clause**:
   Even if all expected cases are covered, a \`default: assert(0);\` protects against future enum expansions or corrupted state.
3. **Limit Variable Scope (Declare at Point of Use)**:
   Minimize the visibility lifetime of variables to reduce bug surface.
4. **Use \`static\` on Global Helper Functions**:
   Mark all functions that are private to a file as \`static\` to prevent global namespace pollution and allow link-time optimization (inlining).
`,
  practiceQuiz: [
    {
      id: "c-t2-q1",
      question:
        'What is the output of the following C program?\n\n#include <stdio.h>\nvoid count(void) {\n    static int c = 1;\n    printf("%d ", c);\n    c++;\n}\nint main(void) {\n    count();\n    count();\n    count();\n    return 0;\n}',
      options: [
        "1 1 1",
        "1 2 3",
        "Garbage Garbage Garbage",
        "Compilation error: static cannot be used inside functions",
      ],
      correctAnswer: 1,
      explanation:
        "A static local variable is initialized only once when the program loads and retains its value between function calls. In the first call, c=1 is printed and incremented to 2. In the second call, c=2 is printed and incremented to 3. In the third call, c=3 is printed. Output: '1 2 3 '.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Static Variables",
    },
    {
      id: "c-t2-q2",
      question:
        "Which of the following operations on a variable declared with the 'register' storage class will result in a compile-time error?",
      options: [
        "register int a = 5; a++;",
        "register int a = 5; int *p = &a;",
        "register int a = 5; if (a > 0) {}",
        "register int a = 5; int b = a + 10;",
      ],
      correctAnswer: 1,
      explanation:
        "According to ISO C, applying the unary address-of operator '&' to a variable with the 'register' storage class is strictly prohibited and causes a compile-time error, because registers do not possess a memory address in RAM.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Register Storage Class",
    },
    {
      id: "c-t2-q3",
      question:
        'Consider the C code:\n\nint x = 10;\nvoid foo(void) {\n    int x = 20;\n    {\n        extern int x;\n        printf("%d ", x);\n    }\n    printf("%d ", x);\n}\nint main(void) {\n    foo();\n    return 0;\n}\n\nWhat is printed?',
      options: [
        "20 20",
        "10 20",
        "10 10",
        "Compilation error: duplicate declaration of x",
      ],
      correctAnswer: 1,
      explanation:
        "Inside the inner block, 'extern int x;' refers to the global variable x (value 10). Thus, the inner printf prints 10. Once the inner block terminates, the local variable x (value 20) of foo() is in scope, so the second printf prints 20. Output: '10 20 '.",
      difficulty: "hard",
      type: "MCQ",
      topicTag: "Scope and Linkage",
    },
    {
      id: "c-t2-q4",
      question:
        "What happens when the 'continue' statement is executed inside the body of a 'switch' statement that is NOT inside any loop?",
      options: [
        "It jumps to the default label",
        "It exits the switch statement",
        "It causes a compile-time syntax error",
        "It restarts the switch evaluation",
      ],
      correctAnswer: 2,
      explanation:
        "The 'continue' statement is defined in ISO C strictly for use inside iteration statements (for, while, do-while). Using 'continue' inside a switch statement that is not enclosed within a loop causes a compile-time syntax error.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Control Flow Constraints",
    },
    {
      id: "c-t2-q5",
      question:
        "What is the output of the recursive function call f(4)?\n\nint f(int n) {\n    static int val = 0;\n    if (n <= 0) return 0;\n    val += n;\n    f(n - 1);\n    return val;\n}",
      options: ["4", "10", "0", "20"],
      correctAnswer: 1,
      explanation:
        "The static variable 'val' accumulates across all recursive frames: For n=4: val += 4 (val=4), calls f(3). For n=3: val += 3 (val=7), calls f(2). For n=2: val += 2 (val=9), calls f(1). For n=1: val += 1 (val=10), calls f(0). f(0) returns 0. As frames unwind, each returns the current value of static 'val', which is 10.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Recursion & Static State",
    },
    {
      id: "c-t2-q6",
      question:
        "Which of the following data types CANNOT be used as the controlling expression in a C 'switch' statement?",
      options: ["char", "enum Color", "short", "float"],
      correctAnswer: 3,
      explanation:
        "ISO C requires the controlling expression of a switch statement to have an integer type (or enum). Floating-point types (float, double) and pointer types are not permitted.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Switch Statement",
    },
    {
      id: "c-t2-q7",
      question:
        "What is the difference between a global variable declared as 'static int x = 0;' and one declared as 'int x = 0;' in file scope?",
      options: [
        "The static variable is placed on the stack, while the other is placed on the heap",
        "The static variable has internal linkage (private to the translation unit), while the other has external linkage (accessible from other files)",
        "The static variable is read-only, while the other is mutable",
        "There is no difference in modern C compilers",
      ],
      correctAnswer: 1,
      explanation:
        "A global variable with 'static' has internal linkage, meaning its name cannot be resolved or accessed by other object files during the link phase. Without 'static', it has external linkage and can be accessed across translation units using 'extern'.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Linkage",
    },
    {
      id: "c-t2-q8",
      question:
        'What is the output of the following C code?\n\n#include <stdio.h>\nint main(void) {\n    int i = 0;\n    for (; i < 5; i++) {\n        if (i == 2)\n            break;\n    }\n    printf("%d\\n", i);\n    return 0;\n}',
      options: ["2", "3", "4", "5"],
      correctAnswer: 0,
      explanation:
        "When i becomes 2, the condition (i == 2) evaluates to true, triggering 'break'. The break statement immediately exits the for loop without executing the increment (i++). Thus, the value of i outside the loop remains 2.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Loop Control",
    },
    {
      id: "c-t2-q9",
      question:
        'What is printed by the following program?\n\n#include <stdio.h>\nint main(void) {\n    int a = 1;\n    switch (a) {\n        default: printf("Def ");\n        case 2:  printf("Two ");\n                 break;\n        case 1:  printf("One ");\n        case 3:  printf("Three ");\n    }\n    return 0;\n}',
      options: ["One ", "One Three ", "Def One Three ", "One Two Three "],
      correctAnswer: 1,
      explanation:
        "The switch jumps directly to 'case 1:' and prints 'One '. Since there is no 'break' statement after 'case 1:', execution falls through to 'case 3:' and prints 'Three '. The default label is not executed because a matching case was found. Output is 'One Three '.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Switch Fallthrough",
    },
    {
      id: "c-t2-q10",
      question:
        "In C, what is the lifetime and default initial value of an uninitialized local variable declared as 'int x;' inside a function?",
      options: [
        "Lifetime: Program duration; Default value: 0",
        "Lifetime: Function execution (stack duration); Default value: Indeterminate (garbage)",
        "Lifetime: Program duration; Default value: Indeterminate",
        "Lifetime: Function execution; Default value: 0",
      ],
      correctAnswer: 1,
      explanation:
        "Local non-static variables have automatic storage duration (exist on the stack only during the execution of their enclosing block). If not explicitly initialized, their initial value is indeterminate (garbage bits).",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Storage Duration",
    },
  ],
};
