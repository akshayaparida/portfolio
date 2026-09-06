import { LearningModule } from "@/types/learning";

export const preprocessorMacrosQualifiersModule: LearningModule = {
  id: "06-preprocessor-macros-qualifiers",
  title: "6. Preprocessor, Macros & Type Qualifiers",
  description:
    "Macro expansion traps, stringification (#), token pasting (##), include guards, do-while(0) idiom, const correctness variations, volatile, and restrict in C",
  status: "completed",
  tags: ["C Programming", "GATE CS", "UGC NET", "Preprocessor"],
  detailedContent: `# Preprocessor Directives, Macro Pitfalls & Type Qualifiers (const, volatile, restrict)

> **GATE CS & UGC NET JRF Core Subject**
> Exam Weightage: 2 Questions every year on macro argument precedence errors, multi-statement macro scoping, and the exact difference between \`const int *\`, \`int * const\`, and \`volatile\`.

---

## 1. Technical Jargon & The Compilation Pipeline

Before the C compiler compiles code into assembly, the source file passes through the **C Preprocessor (CPP)**, an automated textual substitution tool.

\`\`\`
Source File (.c) ──> [ Preprocessor ] ──> Preprocessed Source (.i)
                            │
                      - Expands #include headers
                      - Replaces #define macros
                      - Strips comments
                      - Evaluates #ifdef / #if conditionals
\`\`\`

1. **Tokenization**: Breaking the character stream into discrete syntactic lexical tokens.
2. **Macro Expansion**: Textually substituting a macro name with its replacement list.
3. **Stringification Operator (\`#\`)**: Converts a macro parameter into a string literal enclosed in double quotes.
4. **Token-Pasting / Concatenation Operator (\`##\`)**: Merges two separate lexical tokens into a single valid token during preprocessing.
5. **Include Guard**: Preprocessor idiom preventing a header file from being included multiple times within the same translation unit.
6. **Type Qualifier**: Keywords (\`const\`, \`volatile\`, \`restrict\`) that modify how the compiler accesses and optimizes memory.
7. **Strict Aliasing**: The ISO C optimization rule stating that two pointers of different incompatible types cannot point to the same memory object (with few exceptions like \`char*\`).

---

## 2. Macro Pitfalls & Syntax Traps

Macros are simple textual substitutions. They have no type checking, no scope, and no knowledge of C operator precedence!

### 2.1 The Missing Parentheses Trap

\`\`\`c
// NAIVE MACRO (Dangerous!):
#define SQUARE(x) x * x

int main(void) {
    int res = SQUARE(2 + 3);
    // Expands textually to: 2 + 3 * 2 + 3
    // By precedence: 2 + (3 * 2) + 3 = 2 + 6 + 3 = 11!
    // Expected: (2 + 3)^2 = 25!
    printf("%d\\n", res); // Prints 11
    return 0;
}
\`\`\`

\`\`\`c
// CORRECT DEFENSIVE MACRO:
#define SQUARE(x) ((x) * (x))
// SQUARE(2 + 3) expands to: ((2 + 3) * (2 + 3)) = 25
\`\`\`

---

### 2.2 The Side-Effect Argument Trap

Even fully parenthesized macros fail when passed arguments containing side-effects (\`++\`, \`--\`):

\`\`\`c
#define MAX(a, b) ((a) > (b) ? (a) : (b))

int x = 5, y = 10;
int z = MAX(x++, y++);
// Expands to: ((x++) > (y++) ? (x++) : (y++))
// Since 5 > 10 is FALSE:
// y++ is evaluated TWICE!
// y becomes 12, z becomes 11, x becomes 6!
\`\`\`

> [!CRITICAL]
> **GATE Rule**: Never pass expressions with side effects (\`i++\`, function calls) to macros.

---

### 2.3 The Multi-Statement Macro Trap & \`do { ... } while(0)\`

If a macro contains multiple statements, wrapping it in curly braces \`{ ... }\` breaks inside \`if-else\` statements:

\`\`\`c
// BROKEN MACRO:
#define SWAP(a, b) { int temp = a; a = b; b = temp; }

if (condition)
    SWAP(x, y); // The trailing semicolon causes: { ... }; else
else            // SYNTAX ERROR: 'else' without a previous 'if'!
    foo();
\`\`\`

\`\`\`c
// THE CANONICAL IDIOM: do { ... } while(0)
#define SWAP(a, b) do { int temp = a; a = b; b = temp; } while(0)

if (condition)
    SWAP(x, y); // Expands to: do { ... } while(0); else
else            // Syntactically PERFECT!
    foo();
\`\`\`

---

## 3. Stringification (\`#\`) and Token-Pasting (\`##\`)

\`\`\`c
#include <stdio.h>

// 1. Stringification (#): Converts parameter into "string literal"
#define PRINT_INT(x) printf(#x " = %d\\n", x)

// 2. Token-Pasting (##): Merges two tokens into one variable name
#define MAKE_VAR(prefix, id) prefix##_##id

int main(void) {
    int score = 95;
    PRINT_INT(score); // Expands to: printf("score" " = %d\n", score); Prints "score = 95"

    int MAKE_VAR(student, 101) = 42; // Expands to: int student_101 = 42;
    printf("%d\\n", student_101);
    return 0;
}
\`\`\`

---

## 4. Type Qualifiers: \`const\`, \`volatile\`, \`restrict\`

### 4.1 Decoding the 3 \`const\` Pointer Variations

Read the declaration **backwards (from right to left)** starting from the identifier:

\`\`\`
1. const int *p;
   Read: 'p is a pointer to an integer that is CONSTANT.'
   - The data (*p) is read-only: *p = 20; (ERROR)
   - The pointer (p) can change:   p = &other; (LEGAL)

2. int * const p = &x;
   Read: 'p is a CONSTANT pointer to an integer.'
   - The pointer (p) is locked:    p = &other; (ERROR)
   - The data (*p) is mutable:    *p = 20; (LEGAL)

3. const int * const p = &x;
   Read: 'p is a CONSTANT pointer to a CONSTANT integer.'
   - Neither the address nor the data can be modified.
\`\`\`

---

### 4.2 The \`volatile\` Qualifier

The \`volatile\` keyword tells the compiler: **"The value of this variable can change at any time through means outside the compiler's control."**

\`\`\`c
// Hardware Memory-Mapped Register Example:
volatile unsigned int *status_reg = (unsigned int *)0x40001000;

// Without 'volatile', the compiler sees no writes to *status_reg in the loop
// and optimizes this into an INFINITE LOOP reading the register ONCE!
while (*status_reg == 0) {
    // Wait for hardware to set bit
}
// With 'volatile', the compiler forces a fresh RAM/Bus read on EVERY iteration!
\`\`\`

#### When to Use \`volatile\`:
1. **Memory-mapped I/O peripheral registers** in embedded systems and device drivers.
2. **Global variables modified by Interrupt Service Routines (ISRs)**.
3. **Flags shared across threads in multithreading** (though atomic types are preferred in C11).

---

### 4.3 The \`restrict\` Qualifier (C99)

\`restrict\` is an optimization contract between the programmer and the compiler applying exclusively to pointers:

\`\`\`c
void vector_add(int * restrict a, int * restrict b, int * restrict c, int n) {
    for (int i = 0; i < n; i++) {
        a[i] = b[i] + c[i];
    }
}
\`\`\`

By declaring \`a\`, \`b\`, and \`c\` as \`restrict\`, you guarantee to the compiler that arrays \`a\`, \`b\`, and \`c\` **do not overlap in memory (no aliasing)**. This allows the compiler to aggressively vectorize loops and cache values in CPU registers without fear that writing to \`a[i]\` will overwrite \`b[i]\`.

---

## 5. Best Practices & Defensive Habits

1. **Prefer \`static inline\` Functions Over Complex Macros**:
   Inline functions provide the exact same zero-overhead performance as macros while offering strict type checking, clean debugging, and zero side-effect double-evaluation hazards.
2. **Always Wrap Macro Definitions in Parentheses**:
   Parenthesize both the whole expression \`((...))\` and each parameter usage \`((x))\`.
3. **Use Standard Include Guards**:
   \`\`\`c
   #ifndef MY_MODULE_H
   #define MY_MODULE_H
   // Declarations...
   #endif /* MY_MODULE_H */
   \`\`\`
`,
  practiceQuiz: [
    {
      id: "c-t6-q1",
      question:
        'Consider the macro:\n\n#define CUBE(x) x * x * x\n\nWhat is the output of the statement: printf("%d\\n", CUBE(1 + 2)); ?',
      options: ["27", "7", "9", "11"],
      correctAnswer: 1,
      explanation:
        "The preprocessor performs textual substitution: CUBE(1 + 2) expands to 1 + 2 * 1 + 2 * 1 + 2. Applying operator precedence (multiplication before addition): 1 + (2 * 1) + (2 * 1) + 2 = 1 + 2 + 2 + 2 = 7.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Macro Expansion",
    },
    {
      id: "c-t6-q2",
      question:
        "Given the declaration: const int *ptr;\nWhich of the following statements is legally permitted in C?",
      options: ["*ptr = 100;", "ptr++;", "(*ptr)++;", 'scanf("%d", ptr);'],
      correctAnswer: 1,
      explanation:
        "In 'const int *ptr', ptr is a pointer to a constant integer. The integer value pointed to cannot be modified through ptr (*ptr = 100 is illegal). However, the pointer variable 'ptr' itself is mutable, so 'ptr++' is completely legal.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "const Pointers",
    },
    {
      id: "c-t6-q3",
      question:
        "Why is the do { ... } while(0) construct standardly used in multi-statement C macro definitions?",
      options: [
        "To make the macro execute in an infinite loop",
        "To allow the macro to expand into a single syntactically safe compound statement that works properly before an 'else' branch",
        "To allocate stack memory for macro local variables",
        "To enable recursive macro calls",
      ],
      correctAnswer: 1,
      explanation:
        "Wrapping multi-statement macros in do { ... } while(0) ensures the macro acts like a single expression statement requiring a terminating semicolon, eliminating syntax errors when used in single-line 'if-else' structures.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "do-while(0) Idiom",
    },
    {
      id: "c-t6-q4",
      question:
        "What does the token-pasting operator (##) do in a C preprocessor macro?",
      options: [
        "Converts its argument into a string literal",
        "Concatenates two preprocessor tokens into a single token",
        "Comments out the rest of the line",
        "Calculates the bitwise XOR of two numbers",
      ],
      correctAnswer: 1,
      explanation:
        "The ## operator concatenates two separate tokens into a single token during macro expansion (e.g., COMMAND(quit) expanding to a_quit). In contrast, the # operator performs stringification.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Token Pasting",
    },
    {
      id: "c-t6-q5",
      question:
        "What is the primary purpose of the 'volatile' type qualifier in C?",
      options: [
        "To instruct the compiler to store the variable in a CPU register",
        "To prevent the compiler from optimizing away reads or writes to memory that may change outside the program's control",
        "To make a variable immutable (read-only)",
        "To allocate the variable on the dynamic heap",
      ],
      correctAnswer: 1,
      explanation:
        "The 'volatile' qualifier tells the compiler that the variable's value may be altered asynchronously by hardware, an interrupt handler, or another thread. The compiler is forbidden from caching the value in a register or optimizing away access loops.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "volatile Qualifier",
    },
    {
      id: "c-t6-q6",
      question:
        'What is printed by the following code?\n\n#define PRINT(x) #x\nprintf("%s\\n", PRINT(GATE 2027));',
      options: [
        "GATE 2027",
        '"GATE 2027"',
        "Compilation error",
        "Undefined Behavior",
      ],
      correctAnswer: 0,
      explanation:
        'The # operator stringifies the parameter. PRINT(GATE 2027) expands to the string literal "GATE 2027". The printf format %s prints the characters: GATE 2027.',
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Stringification",
    },
    {
      id: "c-t6-q7",
      question:
        "Which of the following correctly declares a constant pointer to a constant integer in C?",
      options: [
        "const int *ptr;",
        "int * const ptr;",
        "const int * const ptr;",
        "const (int *) ptr;",
      ],
      correctAnswer: 2,
      explanation:
        "Reading right-to-left: 'const int * const ptr;' -> ptr is a constant pointer (cannot point to another address) to a constant integer (the value pointed to cannot be altered).",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Type Qualifiers",
    },
    {
      id: "c-t6-q8",
      question:
        "What does the C99 'restrict' keyword signify when applied to a pointer parameter in a function?",
      options: [
        "The pointer cannot be freed",
        "The pointer is restricted to read-only access",
        "The object pointed to is accessed exclusively through this pointer, assuring the compiler that no aliasing occurs",
        "The function is restricted to single-threaded execution",
      ],
      correctAnswer: 2,
      explanation:
        "The restrict qualifier informs the compiler that for the lifetime of the pointer, no other pointer will alias the same memory block. This enables aggressive compiler optimizations such as register caching and auto-vectorization.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "restrict Qualifier",
    },
    {
      id: "c-t6-q9",
      question:
        "What happens when the macro MAX(a, b) defined as ((a) > (b) ? (a) : (b)) is called with: int x = 1; int m = MAX(x++, 0); ?",
      options: [
        "x becomes 2, m is 1",
        "x becomes 3, m is 2",
        "x becomes 3, m is 1",
        "Compilation error",
      ],
      correctAnswer: 1,
      explanation:
        "MAX(x++, 0) expands to: ((x++) > (0) ? (x++) : (0)).\n1. In the condition, (x++) evaluates to 1 (x becomes 2). Since 1 > 0 is TRUE, the true branch (x++) is evaluated.\n2. In the true branch, (x++) evaluates to 2 (x becomes 3).\n3. Result m receives 2, and x ends up with value 3.",
      difficulty: "hard",
      type: "MCQ",
      topicTag: "Macro Side Effects",
    },
    {
      id: "c-t6-q10",
      question:
        "What is the standard preprocessor mechanism to prevent multiple inclusions of header files?",
      options: [
        "#include_once",
        "#pragma compile",
        "#ifndef / #define / #endif include guards",
        "#static_header",
      ],
      correctAnswer: 2,
      explanation:
        "Standard ISO C uses include guards (#ifndef HEADER_H / #define HEADER_H / #endif) to ensure that the header file's contents are only processed once per translation unit, preventing duplicate definition errors.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Include Guards",
    },
  ],
};
