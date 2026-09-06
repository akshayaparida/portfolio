import { LearningModule } from "@/types/learning";

export const pointersArraysDecayModule: LearningModule = {
  id: "03-pointers-arrays-decay",
  title: "3. Pointers, Pointer Arithmetic & Array Decay",
  description:
    "Memory model, pointer scaling, array decay rules (arr vs &arr), 2D subscript equivalence, complex declarations via Right-Left rule, and string literal pitfalls",
  status: "completed",
  tags: ["C Programming", "GATE CS", "UGC NET", "Pointers"],
  detailedContent: `# Pointers, Pointer Arithmetic, Array Decay & Complex Declarations

> **GATE CS & UGC NET JRF Core Subject**
> Exam Weightage: 3–4 Questions every year on pointer arithmetic scaling, \`arr\` vs \`&arr\` type differences, 2D array dereferencing (\`*(*(p + i) + j)\`), and decoding complex type declarations.

---

## 1. Technical Jargon & The Pointer Memory Model

A pointer is not a mysterious entity; it is a variable whose stored value is a **memory address** pointing into the process's virtual address space.

\`\`\`
Variable: x (int)             Pointer: p (int*)
Address:  0x1000              Address:  0x2000
Value:    42                  Value:    0x1000 (Stores address of x)
          ┌────────┐                    ┌────────────┐
0x1000    │   42   │ <————————————————─ │   0x1000   │  0x2000
          └────────┘                    └────────────┘
\`\`\`

1. **Dereferencing (\`*\`)**: Accessing the data stored at the memory location pointed to by the address.
2. **Address-Of (\`&\`)**: Retrieving the physical RAM address of an l-value object.
3. **Pointer Scaling**: In pointer arithmetic, adding an integer $k$ does not add $k$ bytes; it adds $k \\times \\text{sizeof}(*p)$ bytes.
4. **\`ptrdiff_t\`**: The signed integer type returned when subtracting two pointers of the same type.
5. **Array Decay**: The automatic implicit conversion of an array name into a pointer to its first element in most expression contexts.
6. **Generic Pointer (\`void*\`)**: A pointer with no associated data type. Can hold the address of any object, but cannot be directly dereferenced or used in standard pointer arithmetic without a type cast.
7. **Dangling Pointer**: A pointer holding the address of memory that has already been deallocated or gone out of scope.
8. **Wild Pointer**: An uninitialized pointer holding arbitrary garbage memory addresses.

---

## 2. Pointer Arithmetic & Scaling

### 2.1 The Pointer Arithmetic Rule

Given pointer \`T *p\` pointing to base address \`Addr\`:

$$\\text{Address}(p + k) = \\text{Addr} + k \\times \\text{sizeof}(T)$$
$$\\text{Address}(p - k) = \\text{Addr} - k \\times \\text{sizeof}(T)$$

\`\`\`c
int *pi = (int *)1000;    // Assume sizeof(int) = 4
double *pd = (double *)1000; // Assume sizeof(double) = 8

pi + 2  ==>  1000 + (2 * 4) = 1008
pd + 2  ==>  1000 + (2 * 8) = 1016
\`\`\`

### 2.2 Pointer Subtraction (\`p2 - p1\`)

Subtracting two pointers that point to elements of the **same array**:

$$p_2 - p_1 = \\frac{\\text{Numeric Address}(p_2) - \\text{Numeric Address}(p_1)}{\\text{sizeof}(T)}$$

The result is the number of **elements** between them, not bytes!

> [!WARNING]
> **Pointer Subtraction Precondition**:
> Subtracting two pointers that do NOT point into the same array (or one past the end) is **UNDEFINED BEHAVIOR** in ISO C.

---

## 3. Array Decay Rules: \`arr\` vs. \`&arr\`

In C, an array name decays to a pointer to its first element in almost all expressions:

\`\`\`c
int a[5] = {10, 20, 30, 40, 50};
\`\`\`

### The 3 Exceptions Where Array Does NOT Decay:
1. **\`sizeof(a)\`**: Returns total size of the array in bytes ($5 \\times 4 = 20$), NOT pointer size!
2. **\`&a\`**: Yields a pointer to the **entire array** of type \`int (*)[5]\`, NOT \`int*\`.
3. **String literal initializing an array**: \`char s[] = "hello";\` copies the characters into stack storage.

### The Big GATE Trap: What is the difference between \`a\`, \`&a[0]\`, and \`&a\`?

| Expression | Numeric Address Value | C Data Type | What does \`+ 1\` advance by? |
|:---|:---|:---|:---|
| **\`a\`** | 0x1000 | \`int*\` (pointer to int) | **4 bytes** (\`sizeof(int)\`) |
| **\`&a[0]\`**| 0x1000 | \`int*\` (pointer to int) | **4 bytes** (\`sizeof(int)\`) |
| **\`&a\`** | 0x1000 | **\`int (*)[5]\` (pointer to array of 5 ints)** | **20 bytes** (\`5 * sizeof(int)\`) |

\`\`\`c
#include <stdio.h>

int main(void) {
    int a[5] = {1, 2, 3, 4, 5};

    printf("a     = %p, a + 1     = %p\\n", (void*)a, (void*)(a + 1));
    // a + 1 advances by 4 bytes (next integer)

    printf("&a    = %p, &a + 1    = %p\\n", (void*)&a, (void*)(&a + 1));
    // &a + 1 advances by 20 bytes (skips the ENTIRE array of 5 integers!)

    // Classic GATE Exam Trick:
    int *ptr = (int *)(&a + 1);
    printf("%d\\n", *(ptr - 1)); // Points to last element! Prints 5!
    return 0;
}
\`\`\`

---

## 4. Multi-Dimensional Arrays & Subscript Equivalence

### 4.1 Subscript Equivalence Principle

In C, array subscript notation is syntactic sugar for pointer arithmetic:

$$a[i] \\equiv *(a + i) \\equiv *(i + a) \\equiv i[a]$$

For 2D Arrays:

$$a[i][j] \\equiv *(*(a + i) + j)$$

> [!NOTE]
> **Why is \`i[a]\` valid C?**
> Because addition is commutative: \`a[i]\` is defined as \`*(a + i)\`, which is identical to \`*(i + a)\`, which by definition equals \`i[a]\`!
> \`3[arr]\` is completely legal and accesses \`arr[3]\`.

### 4.2 Pointer to Array vs. Array of Pointers

\`\`\`c
// 1. Pointer to an Array of 5 Integers:
int (*p)[5]; // 'p' is ONE pointer. sizeof(p) is 8 bytes (on 64-bit).
             // p + 1 skips 5 * 4 = 20 bytes.

// 2. Array of 5 Pointers to Integer:
int *p[5];   // 'p' is an ARRAY of 5 pointers.
             // sizeof(p) is 5 * 8 = 40 bytes (on 64-bit).
\`\`\`

---

## 5. Decoding Complex Declarations: The Right-Left / Spiral Rule

In GATE and UGC NET, you will encounter declarations like \`int *(*(*foo)())[10]\`. You decode any complex C declaration using the **Right-Left (Clockwise Spiral) Rule**:

\`\`\`
1. Start at the identifier name.
2. Look RIGHT: If you see '()', it's a function; if you see '[]', it's an array.
3. Look LEFT: If you see '*', it's a pointer to...
4. When parentheses are encountered, resolve everything inside them before moving outside.
\`\`\`

\`\`\`
Example: void (*bsd_signal(int sig, void (*func)(int)))(int);

1. Start at identifier: bsd_signal
2. Look Right: (int sig, void (*func)(int))  --> is a function taking an int and a function pointer...
3. Look Left: *                            --> returning a pointer to...
4. Move Outside Right: (int)               --> a function taking an int...
5. Move Outside Left: void                 --> returning void.
\`\`\`

### Common Complex Declarations Reference Table:

| Declaration | Human Readable Meaning |
|:---|:---|
| \`int *p[10]\` | Array of 10 pointers to \`int\` |
| \`int (*p)[10]\` | Pointer to an array of 10 \`int\`s |
| \`int (*p)(void)\` | Pointer to a function taking \`void\` and returning \`int\` |
| \`int *(*p)(void)\` | Pointer to a function taking \`void\` and returning pointer to \`int\` |
| \`int (*p[10])(int)\`| Array of 10 pointers to functions taking \`int\` and returning \`int\` |
| \`int (*(*p)[10])(void)\`| Pointer to an array of 10 function pointers returning \`int\` |

---

## 6. String Literals: Read-Only Segment vs. Stack Arrays

\`\`\`c
// Case 1: Pointer to String Literal
char *str1 = "Hello";
str1[0] = 'M'; // UNDEFINED BEHAVIOR! Segfault on modern OS (stored in read-only .rodata)

// Case 2: Character Array initialized with String Literal
char str2[] = "Hello";
str2[0] = 'M'; // FULLY LEGAL! Array is allocated on the Stack and mutable ("Mello")
\`\`\`

---

## 7. Best Practices & Defensive Pointer Habits

1. **Initialize All Pointers Immediately**:
   If a pointer has no target yet, assign \`NULL\`: \`int *p = NULL;\`.
2. **Zero Out Freed Pointers**:
   After calling \`free(p)\`, immediately set \`p = NULL;\` to prevent accidental dangling pointer dereferencing.
3. **Use \`sizeof(*ptr)\` in Allocation**:
   Write \`p = malloc(n * sizeof(*p));\` instead of \`malloc(n * sizeof(int));\`. If the type of \`p\` changes, the allocation remains automatically correct!
4. **Const Correctness for Read-Only Buffers**:
   If a function only reads a buffer, mark parameter as \`const int *buf\`.
`,
  practiceQuiz: [
    {
      id: "c-t3-q1",
      question:
        'Consider the following code on a system where sizeof(int) = 4:\n\nint arr[5] = {10, 20, 30, 40, 50};\nint *ptr = (int *)(&arr + 1);\nprintf("%d %d\\n", *(arr + 1), *(ptr - 1));\n\nWhat is the output?',
      options: ["20 50", "10 50", "20 40", "Undefined Behavior / Crash"],
      correctAnswer: 0,
      explanation:
        "1. 'arr + 1' points to arr[1], so *(arr + 1) = 20.\n2. '&arr' is a pointer to the entire array of 5 ints. Therefore '&arr + 1' skips all 5 integers (20 bytes) to point directly past the end of the array.\n3. 'ptr' receives this address. 'ptr - 1' steps back by sizeof(int) (4 bytes) to point to the last element arr[4] (50). *(ptr - 1) = 50. Output is '20 50'.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Array Decay and Pointer Arithmetic",
    },
    {
      id: "c-t3-q2",
      question:
        "Which of the following correctly describes the declaration:\n\nint (*foo[5])(int, int);",
      options: [
        "A pointer to an array of 5 functions taking two ints and returning int",
        "An array of 5 pointers to functions taking two ints and returning int",
        "A function taking two ints and returning an array of 5 pointers",
        "A pointer to a function taking an array of 5 ints",
      ],
      correctAnswer: 1,
      explanation:
        "Using the Right-Left rule: Start with identifier 'foo'. Look right: '[5]' (foo is an array of 5...). Look left: '*' (...pointers to...). Look outside right: '(int, int)' (...functions taking two ints...). Look outside left: 'int' (...and returning int).",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Right-Left Rule",
    },
    {
      id: "c-t3-q3",
      question:
        'What is the output of the following C code snippet?\n\nint a[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};\nprintf("%d\\n", *(*(a + 1) + 2));',
      options: ["4", "5", "6", "8"],
      correctAnswer: 2,
      explanation:
        "By subscript equivalence: *(*(a + i) + j) is equivalent to a[i][j]. Here i = 1 and j = 2, which corresponds to a[1][2]. The element at row 1, column 2 is 6.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "2D Array Subscripts",
    },
    {
      id: "c-t3-q4",
      question:
        'What will happen when the following code executes on a modern virtual-memory OS?\n\nchar *str = "Antigravity";\nstr[0] = \'B\';\nprintf("%s\\n", str);',
      options: [
        "It prints 'Bntigravity'",
        "It prints 'Antigravity'",
        "Runtime error / Segmentation fault due to writing to read-only memory segment",
        "Compilation error",
      ],
      correctAnswer: 2,
      explanation:
        "In C, string literals like \"Antigravity\" are stored in the read-only data/text segment (.rodata). A pointer 'char *str' points directly to this read-only memory. Attempting to modify read-only memory results in Undefined Behavior, which typically triggers a segmentation fault (SIGSEGV).",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "String Literals",
    },
    {
      id: "c-t3-q5",
      question:
        "Given 'int arr[10];', which of the following expressions is syntactically INVALID in C?",
      options: ["arr[2]", "2[arr]", "*(arr + 2)", "arr++"],
      correctAnswer: 3,
      explanation:
        "An array name 'arr' is a constant pointer / non-modifiable l-value representing the address of the allocated array memory. You cannot modify an array name with increment 'arr++' or assignment 'arr = ptr'. In contrast, 2[arr] is valid syntactic sugar for *(2 + arr).",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Array L-Value",
    },
    {
      id: "c-t3-q6",
      question:
        "What is the value of 'diff' in the following code, assuming sizeof(int) = 4?\n\nint arr[10];\nint *p1 = &arr[2];\nint *p2 = &arr[7];\nptrdiff_t diff = p2 - p1;",
      options: ["20", "5", "4", "28"],
      correctAnswer: 1,
      explanation:
        "Subtracting two pointers of the same type yields the number of elements between them, NOT bytes. (Numeric address of arr[7] - Numeric address of arr[2]) / sizeof(int) = (7 - 2) = 5.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Pointer Difference",
    },
    {
      id: "c-t3-q7",
      question:
        "What is the difference between 'int (*p)[5]' and 'int *p[5]' on a 64-bit system?",
      options: [
        "sizeof(int (*p)[5]) is 8 bytes, while sizeof(int *p[5]) is 40 bytes",
        "Both have sizeof equal to 40 bytes",
        "Both have sizeof equal to 8 bytes",
        "int (*p)[5] is illegal C syntax",
      ],
      correctAnswer: 0,
      explanation:
        "'int (*p)[5]' is a single pointer pointing to an array of 5 integers. On a 64-bit machine, any pointer occupies 8 bytes. 'int *p[5]' is an array of 5 pointers to int. Its size is 5 * sizeof(pointer) = 5 * 8 = 40 bytes.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Pointer to Array",
    },
    {
      id: "c-t3-q8",
      question:
        'What is printed by the following C program?\n\n#include <stdio.h>\nint main(void) {\n    char s[] = "GATE2027";\n    char *p = s;\n    printf("%c %c\\n", *p++, *(p++));\n    return 0;\n}',
      options: [
        "G A",
        "A G",
        "Undefined or Unspecified Behavior due to unsequenced modifications of p in printf arguments",
        "G G",
      ],
      correctAnswer: 2,
      explanation:
        "In ISO C, the order of evaluation of function arguments is unspecified, and modifying variable 'p' multiple times without an intervening sequence point across argument expressions invokes Undefined Behavior.",
      difficulty: "hard",
      type: "MCQ",
      topicTag: "Evaluation Order & Sequence Points",
    },
    {
      id: "c-t3-q9",
      question:
        "Which of the following is true about a generic pointer 'void *ptr' in standard ISO C?",
      options: [
        "It can be directly dereferenced using '*ptr'",
        "Pointer arithmetic like 'ptr + 1' advances the pointer by 1 byte in strict ISO C without compiler extensions",
        "It can point to any object type, but must be explicitly cast before dereferencing",
        "It can only hold the address of functions",
      ],
      correctAnswer: 2,
      explanation:
        "In standard ISO C, void has an incomplete type that cannot be completed. Thus, void* cannot be directly dereferenced. Additionally, standard C does not permit arithmetic on void* (GCC allows it as a GNU extension treating sizeof(void) as 1, but it is non-standard).",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "void Pointers",
    },
    {
      id: "c-t3-q10",
      question:
        'What does the following function return when passed the string "Hello"?\n\nint mystery(char *s) {\n    char *p = s;\n    while (*p)\n        p++;\n    return p - s;\n}',
      options: [
        "4",
        "5 (the length of the string)",
        "6 (including null terminator)",
        "Memory address of the string",
      ],
      correctAnswer: 1,
      explanation:
        "The pointer p advances until *p is the null terminator '\\0'. The pointer difference (p - s) computes the number of characters between the start of the string and the null terminator, which is the exact definition of strlen(\"Hello\") = 5.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Pointer Traversal",
    },
  ],
};
