import { LearningModule } from "@/types/learning";

export const typesOperatorsPrecedenceModule: LearningModule = {
  id: "01-types-operators-precedence",
  title: "1. Types, Operators & Precedence Traps",
  description:
    "Integer promotion, 2's complement, signed/unsigned comparisons, sequence points, evaluation order, operator precedence hierarchy, and bitwise manipulation in C",
  status: "completed",
  tags: ["C Programming", "GATE CS", "UGC NET", "Syntax Awareness"],
  detailedContent: `# Types, Operators, Evaluation Order & Precedence Traps

> **GATE CS & UGC NET JRF Core Subject**
> Exam Weightage: 2–3 Direct Questions on operator precedence/associativity, tricky increment/decrement side-effects, signed vs unsigned implicit promotions, and sequence point evaluation.

---

## 1. Technical Jargon & ISO C Standards Taxonomy

In competitive exams like GATE and UGC NET, precise technical terminology is essential. ISO C categorizes behavior into four distinct tiers:

\`\`\`
                                  C Execution Behaviors
                                            │
        ┌───────────────────┬───────────────┴───────────────┬───────────────────┐
        ▼                   ▼                               ▼                   ▼
    Well-Defined     Implementation-Defined            Unspecified          Undefined (UB)
  Guaranteed by C    Compiler must document           Compiler chooses       ANYTHING can happen
  Standard across    (e.g., sizeof(int),              valid options          (Crash, corrupt data,
  all platforms      sign of integer div)             (e.g., arg order)      wrong output, pass)
\`\`\`

1. **L-Value vs. R-Value**:
   - **L-Value (Locator Value)**: An expression that designates an addressable memory location (e.g., variable identifier \`x\`, dereferenced pointer \`*p\`, array element \`a[i]\`). An l-value can appear on the left side of an assignment operator (\`=\`).
   - **R-Value (Read Value)**: A transient data value without a persistent addressable storage location (e.g., literals \`42\`, expressions \`a + b\`). It cannot appear on the left side of an assignment.
2. **Undefined Behavior (UB)**: Behavior upon use of a nonportable or erroneous program construct (e.g., signed integer overflow, division by zero, reading uninitialized memory, modifying a variable twice between sequence points like \`i = i++\`). The compiler is free to do anything.
3. **Unspecified Behavior**: Behavior where the standard provides two or more possibilities and imposes no requirement on which is chosen in any instance (e.g., order of evaluation of function arguments: in \`f(g(), h())\`, either \`g()\` or \`h()\` may run first).
4. **Implementation-Defined Behavior**: Unspecified behavior where the compiler author is required to document the choice (e.g., whether \`char\` is signed or unsigned by default, size of \`int\`, behavior of right-shifting negative integers).
5. **Sequence Point**: A point in the program's execution sequence at which all previous side-effects are guaranteed to have completed and no subsequent side-effects have yet taken place (pre-C11 terminology; C11 uses the relation *"sequenced before"*).
6. **Side Effect**: A change in the state of the execution environment (e.g., modifying an object in memory, accessing a volatile object, modifying a file).

---

## 2. Integer Representation, Limits & Promotion Rules

### 2.1 Two's Complement Range & Overflow

Most modern systems represent signed integers using **Two's Complement**:

$$\\text{Range for } n\\text{-bit signed integer: } [-2^{n-1}, 2^{n-1} - 1]$$
$$\\text{Range for } n\\text{-bit unsigned integer: } [0, 2^n - 1]$$

For an 8-bit integer (\`char\`):
- Signed: $[-128, +127]$
- Unsigned: $[0, 255]$

> [!CRITICAL]
> **GATE Trap: Signed vs. Unsigned Overflow!**
> - **Unsigned integer overflow is WELL-DEFINED**: It wraps around modulo $2^n$ (e.g., in 8-bit unsigned: $255 + 1 = 0$).
> - **Signed integer overflow is UNDEFINED BEHAVIOR (UB)**: Compilers can optimize away loops assuming signed integers never overflow!

### 2.2 Integer Promotion Rules (The Usual Arithmetic Conversions)

Before executing any binary arithmetic or bitwise operator, C applies **Integer Promotion**:

1. Any integer type smaller than \`int\` (such as \`char\`, \`signed char\`, \`unsigned char\`, \`short\`, \`unsigned short\`, and bitfields) is automatically promoted to \`int\` if \`int\` can represent all values of the original type; otherwise, it is promoted to \`unsigned int\`.
2. Once promoted, if operands still differ in type, the **Usual Arithmetic Conversions** hierarchy applies:
   $$\\text{long double} > \\text{double} > \\text{float} > \\text{unsigned long long} > \\text{long long} > \\text{unsigned long} > \\text{long} > \\text{unsigned int} > \\text{int}$$

\`\`\`c
// Tricky GATE Example:
char a = 100;
char b = 50;
char c = a * b / b; // a * b promotes to int (5000), does NOT overflow char!
// Result: 100
\`\`\`

### 2.3 The Classic Signed vs. Unsigned Comparison Trap

When a signed integer and an unsigned integer of the same rank are compared:
- The **signed operand is implicitly converted to unsigned**!
- Negative numbers become huge positive numbers!

\`\`\`c
#include <stdio.h>

int main(void) {
    int a = -1;
    unsigned int b = 1;

    // sizeof operator returns type size_t (which is an unsigned integer type!)
    if (a < sizeof(int)) {
        printf("True\\n");
    } else {
        printf("False\\n"); // PRINTS "False"!
    }

    if (a < b) {
        printf("Less\\n");
    } else {
        printf("Greater or Equal\\n"); // PRINTS "Greater or Equal"!
    }
    return 0;
}
\`\`\`

> [!WARNING]
> **Why does \`-1 < sizeof(int)\` evaluate to FALSE?**
> \`sizeof(int)\` has type \`size_t\` (unsigned integer, typically 32-bit or 64-bit).
> When evaluating \`-1 < sizeof(int)\`, \`-1\` is converted to \`unsigned int\`.
> In two's complement, \`-1\` converted to unsigned becomes $2^{32} - 1 = 4,294,967,295$.
> Thus, the comparison becomes $4,294,967,295 < 4$, which is **FALSE**!

---

## 3. Operator Precedence & Associativity Hierarchy

C features 15 precedence levels. Memorizing the relative priorities of unary, arithmetic, shift, relational, equality, bitwise, logical, conditional, and assignment operators is tested every year in GATE.

| Level | Category | Operators | Associativity | Key Trap / Notes |
|:---|:---|:---|:---|:---|
| **1 (Highest)** | Postfix | \`()\` \`[]\` \`->\` \`.\` \`++\` \`--\` (postfix) | Left to Right | Postfix increment has higher precedence than unary dereference \`*\` |
| **2** | Unary (Prefix) | \`+\` \`-\` \`!\` \`~\` \`++\` \`--\` (prefix) \`*\` \`&\` \`sizeof\` \`(type)\` | **Right to Left** | Grouped right-to-left: \`*p++\` parses as \`*(p++)\` |
| **3** | Multiplicative | \`*\` \`/\` \`%\` | Left to Right | Division truncation toward zero in C99/C11 |
| **4** | Additive | \`+\` \`-\` | Left to Right | Pointer arithmetic scales by \`sizeof(*ptr)\` |
| **5** | Shift | \`<<\` \`>>\` | Left to Right | Precedence is LOWER than additive (\`a + b << 2\` is \`(a + b) << 2\`) |
| **6** | Relational | \`<\` \`<=\` \`>\` \`>=\` | Left to Right | \`1 < x < 5\` evaluates as \`(1 < x) < 5\` (evaluates to 1 or 0 < 5, always 1!) |
| **7** | Equality | \`==\` \`!=\` | Left to Right | Lower precedence than relational operators |
| **8** | Bitwise AND | \`&\` | Left to Right | Lower precedence than equality: \`if (x & 1 == 0)\` parses as \`x & (1 == 0)\`! |
| **9** | Bitwise XOR | \`^\` | Left to Right | |
| **10** | Bitwise OR | \`\|\` | Left to Right | Lower precedence than \`&\` and \`^\` |
| **11** | Logical AND | \`&&\` | Left to Right | Short-circuit evaluation; introduces sequence point |
| **12** | Logical OR | \`\|\|\` | Left to Right | Short-circuit evaluation; introduces sequence point |
| **13** | Conditional | \`? :\` | **Right to Left** | Right-associative: \`a ? b : c ? d : e\` parses as \`a ? b : (c ? d : e)\` |
| **14** | Assignment | \`=\` \`+=\` \`-=\` \`*=\` \`/=\` etc. | **Right to Left** | \`a = b = c = 10\` assigns \`c=10\`, then \`b=10\`, then \`a=10\` |
| **15 (Lowest)**| Comma | \`,\` | Left to Right | Discards left operand, returns right operand; introduces sequence point |

---

## 4. Syntax Awareness: Pointer Dereference & Increment Traps

The interaction between unary \`*\` (dereference) and \`++\` / \`--\` is the single most tested syntax construct in C.

\`\`\`
Four Combinations with Pointer p:

Expression  | Precedence Parse | Meaning / Effect
------------+------------------+-------------------------------------------------------------
*p++        | *(p++)           | Yields *p (current value), THEN increments pointer p itself
(*p)++      | (*p)++           | Yields *p, THEN increments the integer value stored at *p
*++p        | *(++p)           | Increments pointer p first, THEN dereferences new address
++*p        | ++(*p)           | Increments integer value stored at *p, yields incremented value
\`\`\`

### Detailed Code Walkthrough

\`\`\`c
#include <stdio.h>

int main(void) {
    int arr[] = {10, 20, 30, 40, 50};
    int *p = arr;

    printf("%d\\n", *p++);   // Prints 10. p now points to arr[1] (address of 20).
    printf("%d\\n", (*p)++); // Prints 20. arr[1] becomes 21. p still points to arr[1].
    printf("%d\\n", *++p);   // p moves to arr[2] (30), then dereferences. Prints 30.
    printf("%d\\n", ++*p);   // arr[2] (30) is incremented to 31, then prints 31.

    // Final array state: {10, 21, 31, 40, 50}
    return 0;
}
\`\`\`

---

## 5. Sequence Points & Undefined Evaluation Order

### 5.1 The Rule of Sequence Points

Between the previous and next sequence point:
1. An object's stored value shall be modified at most once by the evaluation of an expression.
2. The prior value shall be accessed only to determine the value to be stored.

**Violating either condition results in UNDEFINED BEHAVIOR (UB)!**

\`\`\`c
// ILLEGAL: Undefined Behavior Examples
i = i++;            // UB: modified twice without sequence point
i = ++i;            // UB: modified twice without sequence point
a[i] = i++;         // UB: i accessed to determine address AND modified without sequence point
func(i++, i++);     // UB: order of argument evaluation is unspecified, modified without seq point
printf("%d %d", ++i, i++); // UB: modifies and reads i without sequence point
\`\`\`

### 5.2 Guaranteed Sequence Points in C

A sequence point occurs at:
1. **End of a full expression**: The semicolon (\`;\`) ending a statement.
2. **The Logical AND operator (\`&&\`)**: Evaluates left operand. If false, stops immediately. Sequence point occurs after left operand.
3. **The Logical OR operator (\`||\`)**: Evaluates left operand. If true, stops immediately. Sequence point occurs after left operand.
4. **The Ternary Conditional operator (\`? :\`)**: Evaluates first operand before \`?\`. Sequence point occurs after condition.
5. **The Comma operator (\`,\`)**: Evaluates left expression, performs all side effects, then evaluates right expression.
6. **Function Call**: Evaluates all argument expressions, then a sequence point occurs before entering the function body.

\`\`\`c
// Tricky GATE Question on Short-Circuiting:
#include <stdio.h>

int main(void) {
    int a = 0, b = 1, c = 2;

    // In a && (++b), since a is 0 (false), (++b) is NEVER EVALUATED!
    // b remains 1.
    int res = a && (++b);
    printf("res=%d, b=%d\\n", res, b); // res=0, b=1

    // In (b || ++c), since b is 1 (true), (++c) is NEVER EVALUATED!
    // c remains 2.
    int res2 = b || (++c);
    printf("res2=%d, c=%d\\n", res2, c); // res2=1, c=2

    return 0;
}
\`\`\`

---

## 6. Bitwise Manipulation Formulas & Idioms

Bitwise operations operate directly on binary representations and are heavily tested in GATE CS:

| Idiom / Formula | Expression in C | Explanation / Why it works |
|:---|:---|:---|
| **Check if Odd** | \`(n & 1) != 0\` | Tests the least significant bit (LSB) |
| **Check Power of 2** | \`n > 0 && (n & (n - 1)) == 0\` | $n$ has exactly one bit set; $n-1$ flips that bit and all bits below |
| **Clear Lowest Set Bit** | \`n = n & (n - 1)\` | Clears the rightmost set 1-bit (Kernighan's bit count algorithm) |
| **Extract Lowest Set Bit**| \`n & (-n)\` | In 2's complement, $-n = \\sim n + 1$, isolating the lowest 1-bit |
| **Set $k$-th bit** | \`n \| (1U << k)\` | Creates a mask with only $k$-th bit set, then ORs |
| **Clear $k$-th bit** | \`n & ~(1U << k)\` | Inverts mask to have 0 at $k$, then ANDs |
| **Toggle $k$-th bit** | \`n ^ (1U << k)\` | XOR with 1 flips the bit |
| **Multiply by $2^k$** | \`n << k\` | Left shift moves bits to higher powers of 2 |
| **Divide by $2^k$** | \`n >> k\` | Right shift moves bits down (floor division for positive numbers) |

> [!WARNING]
> **Shift Count Constraints in ISO C**:
> If the shift count is negative or greater than or equal to the width of the promoted left operand, the behavior is **UNDEFINED**!
> Example: For a 32-bit \`int\`, \`1 << 32\` and \`1 << -1\` are **Undefined Behavior**.

---

## 7. Best Practices & Defensive Coding in C

1. **Explicit Parentheses for Bitwise Operators**:
   Always write \`if ((x & MASK) == 0)\` instead of \`if (x & MASK == 0)\`. Precedence of \`==\` is higher than \`&\`!
2. **Never Mutate a Variable Multiple Times in One Statement**:
   Avoid code like \`i = ++i + 2\`. Keep assignments atomic and sequential.
3. **Use Unsigned Constants for Bitwise Shifts**:
   Write \`1U << 31\` rather than \`1 << 31\`. Shifting into the sign bit of a signed integer causes signed overflow (UB in C99/C11).
4. **Guard Comparisons against Signed-Unsigned Pitfalls**:
   Cast or explicitly ensure both sides share matching signedness before comparing.
`,
  practiceQuiz: [
    {
      id: "c-t1-q1",
      question:
        'Consider the following C code snippet:\n\nint x = -1;\nif (x < sizeof(int))\n    printf("GATE\\n");\nelse\n    printf("NET\\n");\n\nWhat is the output on a standard 32-bit/64-bit architecture?',
      options: ["GATE", "NET", "Compilation error", "Runtime exception"],
      correctAnswer: 1,
      explanation:
        "sizeof(int) returns type size_t, which is an unsigned integer. When comparing signed int (-1) with unsigned int, the signed int is promoted to unsigned int. In two's complement, -1 becomes 0xFFFFFFFF (4,294,967,295), which is strictly greater than sizeof(int) (4 or 8). Thus, the condition evaluates to false and 'NET' is printed.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Integer Promotion",
    },
    {
      id: "c-t1-q2",
      question: "What is the value of expression (1 < x < 5) in C when x = 10?",
      options: ["0 (false)", "1 (true)", "5", "Undefined Behavior"],
      correctAnswer: 1,
      explanation:
        "Relational operators '<' associate from left to right. The expression parses as ((1 < x) < 5). When x = 10, (1 < 10) evaluates to 1. The expression then becomes (1 < 5), which evaluates to 1 (true). Hence, regardless of whether x is 10 or 100, the result is 1.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Precedence & Associativity",
    },
    {
      id: "c-t1-q3",
      question:
        "Given the array definition:\n\nint a[] = {10, 20, 30};\nint *p = a;\nint val = *p++;\n\nWhat are the values of 'val' and '*p' after this statement executes?",
      options: [
        "val = 11, *p = 10",
        "val = 10, *p = 20",
        "val = 20, *p = 20",
        "val = 10, *p = 10",
      ],
      correctAnswer: 1,
      explanation:
        "Postfix '++' has higher precedence than unary '*'. The expression parses as *(p++). The value of the postfix increment expression is the original pointer p (pointing to a[0]=10), so val receives 10. As a side effect, p is incremented to point to a[1], so *p is 20.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Pointer Precedence",
    },
    {
      id: "c-t1-q4",
      question:
        "Which of the following code fragments results in Undefined Behavior according to the ISO C standard?",
      options: [
        "int a = (b = 5, b + 2);",
        "int x = a && b++;",
        "i = ++i + 1;",
        "int c = a ? b : d;",
      ],
      correctAnswer: 2,
      explanation:
        "In 'i = ++i + 1;', variable 'i' is modified twice without an intervening sequence point (both in the prefix increment and in the assignment). Under ISO C, modifying an object more than once between sequence points invokes Undefined Behavior.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Undefined Behavior",
    },
    {
      id: "c-t1-q5",
      question:
        'What is the output of the following C program?\n\n#include <stdio.h>\nint main(void) {\n    int a = 1, b = 0, c = 5;\n    int res = (a || ++b) && ++c;\n    printf("%d %d %d %d\\n", res, a, b, c);\n    return 0;\n}',
      options: ["1 1 0 6", "1 1 1 6", "0 1 0 5", "1 1 1 5"],
      correctAnswer: 0,
      explanation:
        "Due to short-circuit evaluation of '||', in (a || ++b), since 'a' is 1 (true), the right operand '++b' is NOT evaluated. Thus 'b' remains 0, and the left side of '&&' evaluates to 1. Then the right operand '++c' is evaluated, incrementing 'c' to 6 and yielding 1 for res. Thus output is 1 1 0 6.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Short-Circuiting",
    },
    {
      id: "c-t1-q6",
      question:
        "What does the expression (n & (n - 1)) evaluate to when n is a positive integer?",
      options: [
        "It sets the least significant 0-bit to 1",
        "It clears the least significant (rightmost) set 1-bit of n",
        "It isolates the highest power of 2 less than n",
        "It computes the bitwise inverse of n",
      ],
      correctAnswer: 1,
      explanation:
        "Subtracting 1 from n flips all bits up to and including the rightmost set 1-bit. Performing bitwise AND with the original n zeroes out that rightmost set 1-bit while leaving all higher bits unchanged.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Bitwise Manipulation",
    },
    {
      id: "c-t1-q7",
      question:
        "What is the result of evaluating the expression (x = (1, 2, 3)) in C?",
      options: [
        "1",
        "2",
        "3",
        "Compilation error because comma operator cannot be used inside assignment",
      ],
      correctAnswer: 2,
      explanation:
        "The comma operator evaluates each expression from left to right, discards intermediate values, and produces the value of the rightmost operand. Thus (1, 2, 3) evaluates to 3, which is then assigned to x.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Comma Operator",
    },
    {
      id: "c-t1-q8",
      question:
        "In ISO C, what is the classification of behavior when right-shifting a negative signed integer (e.g., -8 >> 2)?",
      options: [
        "Well-defined (always performs arithmetic right shift)",
        "Implementation-defined (compiler determines arithmetic vs logical shift)",
        "Unspecified behavior",
        "Undefined behavior",
      ],
      correctAnswer: 1,
      explanation:
        "ISO C standard explicitly defines right shift of a negative signed integer as Implementation-Defined Behavior. Most modern compilers (GCC, Clang) perform an arithmetic right shift (preserving sign bit), but the compiler author is required to document this choice.",
      difficulty: "hard",
      type: "MCQ",
      topicTag: "ISO C Classification",
    },
    {
      id: "c-t1-q9",
      question:
        'Consider the statement:\n\nint x = 5;\nint y = sizeof(x++);\nprintf("%d %d\\n", x, y);\n\nAssuming sizeof(int) == 4, what is printed?',
      options: ["6 4", "5 4", "5 2", "Undefined Behavior"],
      correctAnswer: 1,
      explanation:
        "The sizeof operator is a compile-time operator (except for variable-length arrays in C99). Expressions inside sizeof are NOT evaluated at runtime. Therefore, 'x++' is never executed, and x remains 5. The output is '5 4'.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "sizeof Operator",
    },
    {
      id: "c-t1-q10",
      question:
        "What is the value of 'a' after evaluating: a = 2 + 3 * 4 << 1 in C?",
      options: ["28", "26", "20", "40"],
      correctAnswer: 0,
      explanation:
        "Multiplication '*' has precedence 3, addition '+' has precedence 4, and left shift '<<' has precedence 5. First: 3 * 4 = 12. Next: 2 + 12 = 14. Finally: 14 << 1 = 28. Hence a = 28.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Precedence Hierarchy",
    },
  ],
};
