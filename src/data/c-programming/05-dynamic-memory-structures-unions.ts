import { LearningModule } from "@/types/learning";

export const dynamicMemoryStructuresUnionsModule: LearningModule = {
  id: "05-dynamic-memory-structures-unions",
  title: "5. Memory Management, Structs & Unions",
  description:
    "Heap allocation (malloc, calloc, realloc, free), structure padding and alignment rules, self-referential structures, unions for endianness detection, and bitfields",
  status: "completed",
  tags: ["C Programming", "GATE CS", "UGC NET", "Memory Management"],
  detailedContent: `# Dynamic Memory Management, Structure Alignment, Unions & Bitfields

> **GATE CS & UGC NET JRF Core Subject**
> Exam Weightage: 2–3 Direct Questions on calculating \`sizeof(struct)\` with alignment padding, pointer realloc traps, and memory leak / dangling pointer identification.

---

## 1. Technical Jargon & The Heap Architecture

While stack memory is managed automatically by function call frames, **Heap Memory** is dynamically requested by the programmer at runtime.

\`\`\`
Process Heap Architecture:
Low Heap Address  ──> [ Block A (Allocated) ] [ Block B (Free) ] [ Block C (Allocated) ] ──> High Heap Address
                      ↑                      ↑
                      malloc(100)            free(ptr)
\`\`\`

1. **Natural Alignment**: The CPU requirement that data types of size $k$ bytes must reside at physical memory addresses divisible by $k$ (e.g., a 4-byte \`int\` at an address ending in \`0x0\`, \`0x4\`, \`0x8\`, \`0xC\`). Unaligned access causes hardware penalties or bus errors.
2. **Structure Padding**: Extra unused bytes inserted by the compiler between structure members to preserve natural alignment.
3. **Internal vs. External Fragmentation**:
   - *Internal Fragmentation*: Unused space within an allocated memory block (e.g., structure padding or allocator chunk rounding).
   - *External Fragmentation*: Free memory scattered in small disjoint chunks where no single chunk is large enough to satisfy an allocation request.
4. **Dangling Pointer**: A pointer that continues referencing a heap memory address after \`free()\` has already deallocated that block.
5. **Memory Leak**: Heap memory allocated via \`malloc\`/\`calloc\` that is never released with \`free()\`, and for which all pointer references have been lost.
6. **Double Free**: Calling \`free()\` twice on the exact same memory address, which corrupts the heap allocator's internal metadata and invites severe security vulnerabilities.

---

## 2. Dynamic Memory Functions: \`malloc\`, \`calloc\`, \`realloc\`, \`free\`

### 2.1 The Standard Allocator Family (\`<stdlib.h>\`)

\`\`\`c
void* malloc(size_t size);
void* calloc(size_t num, size_t size);
void* realloc(void* ptr, size_t new_size);
void  free(void* ptr);
\`\`\`

| Function | Initialization | Overflow Guard | Key Behavior on Failure |
|:---|:---|:---|:---|
| **\`malloc(n)\`** | **Uninitialized** (contains garbage bits) | None | Returns \`NULL\`. Leaves errno unchanged or sets \`ENOMEM\` |
| **\`calloc(n, sz)\`** | **Zeroed out** (all bits set to 0) | Guards against \`n * sz\` integer overflow | Returns \`NULL\` if memory exhausted or multiplication overflows |
| **\`realloc(ptr, sz)\`** | Preserves existing data up to \`min(old, new)\` | None | Returns \`NULL\` on failure, **ORIGINAL BLOCK REMAINS VALID!** |
| **\`free(ptr)\`** | Deallocates block back to heap | N/A | If \`ptr == NULL\`, safely performs NO operation |

---

### 2.2 The Notorious \`realloc\` Memory Leak Trap

\`\`\`c
// THE DANGEROUS WAY (Common bug in GATE and production):
int *p = malloc(100 * sizeof(int));
p = realloc(p, 200 * sizeof(int)); // BUG! If realloc fails and returns NULL,
                                   // the pointer to the original 100 ints is LOST forever!
                                   // Result: Silent Memory Leak.

// THE SAFE WAY:
int *new_p = realloc(p, 200 * sizeof(int));
if (new_p == NULL) {
    // Handle allocation failure gracefully:
    // 'p' is STILL valid and can be freed or used!
    free(p);
    exit(1);
}
p = new_p;
\`\`\`

---

## 3. Structure Padding & Memory Alignment Rules

Why is \`sizeof(struct)\` almost always larger than the sum of its constituent members?

### 3.1 The Alignment Algorithm
1. Every primitive member must be placed at an offset that is a multiple of its own alignment requirement (\`sizeof(member)\`).
2. Padding bytes are inserted before any member whose natural alignment is not yet satisfied.
3. The **total size of the structure** must be an integer multiple of the **largest alignment requirement among all its members** (tail padding).

\`\`\`
Example:
struct Example {
    char a;    // 1 byte
               // 3 bytes PADDING inserted here!
    int b;     // 4 bytes (must align to multiple of 4)
    char c;    // 1 byte
               // 3 bytes TAIL PADDING to round up to multiple of 4!
};

Memory Layout (Total Size = 12 bytes, NOT 6 bytes!):
[ a ] [pad] [pad] [pad] [ b0 ] [ b1 ] [ b2 ] [ b3 ] [ c ] [pad] [pad] [pad]
  0     1     2     3     4      5      6      7      8     9     10    11
\`\`\`

### 3.2 Optimization: Member Reordering to Minimize Padding

By arranging structure members in descending order of size, you eliminate internal padding:

\`\`\`c
// Suboptimal (12 bytes):
struct Bad {
    char a;  // 1B + 3B padding
    int b;   // 4B
    char c;  // 1B + 3B tail padding
}; // Total: 12 bytes

// Optimized (8 bytes - 33% memory savings!):
struct Good {
    int b;   // 4B
    char a;  // 1B
    char c;  // 1B
             // 2B tail padding (rounds to multiple of 4)
}; // Total: 8 bytes
\`\`\`

---

## 4. Self-Referential Structures: Foundation of Linked Data Structures

A structure that contains a pointer to an instance of its own type is called a **Self-Referential Structure**:

\`\`\`c
// Singly Linked List Node:
struct Node {
    int data;           // 4 bytes
    struct Node *next;  // 8 bytes (pointer to next node on heap)
};

// Binary Tree Node:
struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};
\`\`\`

> [!WARNING]
> **GATE Trap: Direct Embedding vs. Pointer!**
> \`struct Node { int data; struct Node next; };\` is a **COMPILE-TIME ERROR**.
> A structure cannot contain an instance of itself because its size would be infinite! It can only contain a **pointer** to itself (\`struct Node *next\`), which has a fixed, known pointer size (4 or 8 bytes).

---

## 5. Unions & Hardware Endianness Detection

A **\`union\`** is a user-defined type where all members share the **exact same memory location**. The total size of the union is determined by the size of its largest member.

\`\`\`c
#include <stdio.h>

// Using a union to inspect CPU Endianness (Byte Order):
union EndianChecker {
    unsigned int value;
    unsigned char bytes[sizeof(unsigned int)];
};

int main(void) {
    union EndianChecker test;
    test.value = 0x01020304;

    // In Little-Endian: Least significant byte (0x04) is stored at lowest address
    // In Big-Endian:    Most significant byte (0x01) is stored at lowest address
    if (test.bytes[0] == 0x04) {
        printf("Architecture: Little-Endian\\n"); // x86, ARM (usually)
    } else if (test.bytes[0] == 0x01) {
        printf("Architecture: Big-Endian\\n");    // Network byte order, SPARC
    }
    return 0;
}
\`\`\`

---

## 6. Bitfields: Syntax & Hardware Register Mapping

Bitfields allow packing integer values into specific bit lengths to map directly onto hardware control registers or save memory:

\`\`\`c
struct Register {
    unsigned int enable  : 1;  // Exactly 1 bit (0 or 1)
    unsigned int mode    : 3;  // Exactly 3 bits (0 to 7)
    unsigned int channel : 4;  // Exactly 4 bits (0 to 15)
};
\`\`\`

> [!CRITICAL]
> **GATE Bitfield Rules**:
> 1. You **CANNOT** apply the address-of operator \`&\` to a bitfield member (\`&reg.enable\` is a **COMPILE-TIME ERROR**) because CPU addresses point to bytes, not individual bits!
> 2. A bitfield cannot be declared as an array.
> 3. Bitfield signedness without explicit \`signed\`/\`unsigned\` is implementation-defined. Always specify \`unsigned int\` or \`signed int\`.

---

## 7. Best Practices & Defensive Memory Management

1. **Free What You Allocate**:
   Every \`malloc\` / \`calloc\` call must correspond to a single, guaranteed \`free\` along every execution branch.
2. **Prevent Dangling Pointers with the Macro Pattern**:
   \`\`\`c
   #define SAFE_FREE(ptr) do { free(ptr); (ptr) = NULL; } while(0)
   \`\`\`
3. **Prefer \`calloc\` When Zero Initialization is Required**:
   Avoid manual \`malloc\` + \`memset(p, 0, size)\`. \`calloc\` is optimized and includes internal overflow multiplication checks.
`,
  practiceQuiz: [
    {
      id: "c-t5-q1",
      question:
        "Consider the following structure on a 32-bit architecture where sizeof(char)=1, sizeof(short)=2, sizeof(int)=4, and natural alignment is enforced:\n\nstruct Data {\n    char a;\n    int b;\n    short c;\n};\n\nWhat is sizeof(struct Data)?",
      options: ["7 bytes", "8 bytes", "12 bytes", "16 bytes"],
      correctAnswer: 2,
      explanation:
        "1. 'char a' is at offset 0 (1 byte).\n2. 'int b' requires 4-byte alignment, so 3 bytes of padding are added at offsets 1-3. 'b' occupies offsets 4-7 (4 bytes).\n3. 'short c' requires 2-byte alignment; offset 8 is a multiple of 2, occupying offsets 8-9 (2 bytes).\n4. Total accumulated bytes = 10.\n5. The largest member is int (4 bytes), so the total structure size must be a multiple of 4. Tail padding of 2 bytes is added (offsets 10-11).\nTotal size = 12 bytes.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Structure Padding",
    },
    {
      id: "c-t5-q2",
      question:
        'What is the output or behavior of the following C code?\n\n#include <stdio.h>\n#include <stdlib.h>\nint main(void) {\n    int *ptr = (int *)malloc(sizeof(int));\n    *ptr = 100;\n    free(ptr);\n    printf("%d\\n", *ptr);\n    return 0;\n}',
      options: [
        "Guaranteed to print 100",
        "Guaranteed to print 0",
        "Undefined Behavior (accessing memory through a dangling pointer)",
        "Compilation error",
      ],
      correctAnswer: 2,
      explanation:
        "After calling free(ptr), the memory is deallocated back to the heap manager. The pointer 'ptr' becomes a Dangling Pointer. Dereferencing a dangling pointer is Undefined Behavior. It may print 100, print garbage, or crash with a segmentation fault.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Dangling Pointers",
    },
    {
      id: "c-t5-q3",
      question: "Which of the following statements about C bitfields is FALSE?",
      options: [
        "A bitfield cannot be an array member",
        "The address-of operator '&' cannot be applied to a bitfield",
        "A bitfield can have a width greater than the bit width of its declared underlying type",
        "Unsigned bitfields of width 1 can only hold values 0 and 1",
      ],
      correctAnswer: 2,
      explanation:
        "In ISO C, a bitfield's width cannot exceed the number of bits in its underlying declared type (e.g., you cannot declare an unsigned char bitfield of width 9). Applying the address-of operator '&' to a bitfield is also strictly illegal.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Bitfields",
    },
    {
      id: "c-t5-q4",
      question:
        "What happens if 'realloc(ptr, new_size)' fails due to insufficient heap memory?",
      options: [
        "The original memory block at 'ptr' is automatically freed and NULL is returned",
        "NULL is returned, and the original memory block at 'ptr' remains completely valid and untouched",
        "The program immediately terminates with SIGABRT",
        "The original memory block is truncated to 0 bytes",
      ],
      correctAnswer: 1,
      explanation:
        "According to the ISO C standard, if realloc cannot allocate the requested memory block, it returns NULL, and the original block remains intact and valid. Reassigning directly 'ptr = realloc(ptr, size)' without a temporary pointer causes a memory leak.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "realloc Mechanics",
    },
    {
      id: "c-t5-q5",
      question:
        "Consider the union definition on a 32-bit system:\n\nunion Test {\n    char str[10];\n    int val;\n};\n\nAssuming sizeof(int) = 4, what is sizeof(union Test)?",
      options: ["10 bytes", "12 bytes", "14 bytes", "4 bytes"],
      correctAnswer: 1,
      explanation:
        "The size of a union must be at least as large as its largest member ('str' takes 10 bytes). Furthermore, the total size must be a multiple of the largest member's alignment requirement (int requires 4-byte alignment). The smallest multiple of 4 that is >= 10 is 12. Thus, sizeof(union Test) = 12 bytes.",
      difficulty: "hard",
      type: "MCQ",
      topicTag: "Union Alignment",
    },
    {
      id: "c-t5-q6",
      question:
        "Why is the following structure definition INVALID in C?\n\nstruct Element {\n    int data;\n    struct Element next;\n};",
      options: [
        "A structure cannot contain an integer data field",
        "A structure cannot contain an instance of itself by value because its size would be infinite",
        "The semicolon after the closing brace is illegal",
        "Self-referential structures are not permitted in C",
      ],
      correctAnswer: 1,
      explanation:
        "Embedding 'struct Element next;' directly inside 'struct Element' requires the compiler to know the size of struct Element before it has finished defining it, creating infinite recursion in size computation. A self-referential structure must contain a pointer: 'struct Element *next;'.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Self-Referential Structures",
    },
    {
      id: "c-t5-q7",
      question: "What is the difference between malloc(n) and calloc(1, n)?",
      options: [
        "malloc allocates on the stack, calloc allocates on the heap",
        "malloc does not clear memory (leaves garbage), whereas calloc zeroes out all allocated memory",
        "calloc returns a typed pointer, malloc returns void*",
        "There is no difference",
      ],
      correctAnswer: 1,
      explanation:
        "malloc(n) allocates uninitialized memory containing whatever garbage bit patterns previously resided at those memory addresses. calloc(1, n) initializes all allocated bytes to zero.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "malloc vs calloc",
    },
    {
      id: "c-t5-q8",
      question: "What does calling free(NULL) in C do?",
      options: [
        "Causes a segmentation fault (Null pointer dereference)",
        "Causes undefined behavior",
        "Safely performs no action and returns immediately",
        "Throws a runtime exception",
      ],
      correctAnswer: 2,
      explanation:
        "ISO C explicitly specifies that if the pointer passed to free() is a NULL pointer, the function does nothing and returns safely.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "free Safety",
    },
    {
      id: "c-t5-q9",
      question:
        "On a Little-Endian computer, if a 32-bit integer holds 0xAABBCCDD, which byte is stored at the lowest memory address?",
      options: ["0xAA", "0xBB", "0xCC", "0xDD"],
      correctAnswer: 3,
      explanation:
        "Little-Endian architectures store the least significant byte (LSB) at the lowest memory address (smallest address). For 0xAABBCCDD, the LSB is 0xDD, so it is placed at the lowest byte address.",
      difficulty: "medium",
      type: "MCQ",
      topicTag: "Endianness",
    },
    {
      id: "c-t5-q10",
      question: "What is a Memory Leak in C?",
      options: [
        "A pointer pointing to deallocated memory",
        "Dynamically allocated heap memory that has no remaining pointer references and can never be freed",
        "Writing beyond array bounds",
        "Reading uninitialized stack variables",
      ],
      correctAnswer: 1,
      explanation:
        "A memory leak occurs when heap memory is allocated dynamically, but the program loses all pointer references to that memory without freeing it, permanently consuming virtual address space until process exit.",
      difficulty: "easy",
      type: "MCQ",
      topicTag: "Memory Leaks",
    },
  ],
};
