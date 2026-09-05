import { LearningModule } from "@/types/learning";

export const memoryArraysModule: LearningModule = {
  id: "01-memory-arrays",
  title: "1. Memory Layout & Arrays",
  description:
    "Physical memory organization, 1D/2D address calculation (Row/Column Major), pointer arithmetic, and array operations across C, C++, and Python",
  status: "completed",
  tags: ["Data Structure", "GATE CS", "UGC NET", "NPTEL"],
  detailedContent: `# Memory Layout & Array Operations

> **NPTEL / GATE CS / UGC NET Foundation Module**
> Exam Weightage: 1–2 Questions directly on 1D/2D address calculation, pointer dereferencing, and row-major vs column-major indexing.

---

## 1. Prerequisites & What You Should Know

Before studying arrays and memory layout, you should be comfortable with:
- **Number Systems**: Binary (base-2) and hexadecimal (base-16) representation — memory addresses are displayed in hex (e.g., \`0x7FFF5C00\`).
- **Basic Arithmetic**: Multiplication and modular arithmetic for address calculations.
- **Variables & Data Types**: Understanding that \`int\` occupies 4 bytes, \`char\` occupies 1 byte, \`double\` occupies 8 bytes, etc.
- **What is a "byte"?**: The smallest addressable unit of memory. 1 byte = 8 bits. Each byte in RAM has a unique **address** (like a house number on a street).

---

## 2. What is Memory? (Conceptual Foundation)

### 2.1 The Bookshelf Analogy

Imagine your computer's **RAM (Random Access Memory)** as a very long row of **numbered lockers** or a giant bookshelf with millions of slots:

\`\`\`
Memory (RAM) — Think of it as a long row of numbered boxes:

Address:  | 0x1000 | 0x1001 | 0x1002 | 0x1003 | 0x1004 | 0x1005 | ...
Content:  |  0x4A  |  0x00  |  0xFF  |  0x12  |  0x00  |  0x00  | ...
          ←— Each box is 1 BYTE (8 bits) —→
\`\`\`

- **Every box has a unique address** (like a street address for a house).
- **Every box stores exactly 1 byte** (8 bits, values 0–255).
- The CPU can jump to **any address instantly** — this is why it's called "Random Access" Memory.

### 2.2 How the CPU Reads Memory

When your program says \`int x = 42;\`, here's what happens behind the scenes:

1. **The compiler assigns an address** (say \`0x1000\`) to store \`x\`.
2. Since \`int\` is 4 bytes, it occupies addresses \`0x1000\` through \`0x1003\`.
3. The value \`42\` is stored across those 4 bytes in binary.
4. When you later read \`x\`, the CPU goes directly to address \`0x1000\` and reads 4 bytes.

\`\`\`
Variable x (int = 4 bytes) stored starting at address 0x1000:

Address:  | 0x1000 | 0x1001 | 0x1002 | 0x1003 |
Content:  |  0x2A  |  0x00  |  0x00  |  0x00  |
          ←———— These 4 bytes = integer 42 ————→
\`\`\`

### 2.3 Stack Memory vs Heap Memory

Programs use two main regions of memory:

| Feature | **Stack Memory** | **Heap Memory** |
|:---|:---|:---|
| **What goes here?** | Local variables, function parameters, return addresses | Dynamically allocated data (\`malloc\`, \`new\`, Python objects) |
| **Who manages it?** | Compiler (automatic) | Programmer (manual in C/C++) or Garbage Collector (Python/Java) |
| **Speed** | Very fast (pointer just moves up/down) | Slower (OS must find free blocks) |
| **Size** | Small & fixed (typically 1–8 MB) | Large (limited by total RAM) |
| **Lifetime** | Dies when function returns | Lives until explicitly freed (or GC collects it) |
| **Growth Direction** | Grows downward (high → low addresses) | Grows upward (low → high addresses) |

\`\`\`
Process Memory Layout (Simplified):

+———————————————————+  ← High Address (e.g., 0xFFFF)
|      STACK         |  ← Local variables, function calls
|    (grows ↓)       |     int arr[10]; goes HERE
+———————————————————+
|        ↓           |
|    Free Space      |
|        ↑           |
+———————————————————+
|      HEAP          |  ← malloc(), new, Python objects
|    (grows ↑)       |     int* arr = malloc(40); goes HERE
+———————————————————+
|   Global/Static    |  ← Global variables, constants
+———————————————————+
|   Code (Text)      |  ← Your compiled program instructions
+———————————————————+  ← Low Address (e.g., 0x0000)
\`\`\`

> [!NOTE]
> **Why does this matter for Data Structures?**
> When you create an array with \`int arr[100];\` in C, it goes on the **Stack** (fast, but limited size). When you use \`malloc(100 * sizeof(int))\`, it goes on the **Heap** (slower, but can be much larger). Understanding this helps you choose the right approach!

---

## 3. What is an Array? (Conceptual Explanation)

### 3.1 The Apartment Building Analogy

Think of an array as an **apartment building** where:
- All apartments are **the same size** (homogeneous elements).
- Apartments are **numbered consecutively** (index 0, 1, 2, 3...).
- They are **right next to each other** (contiguous in memory).
- If you know the building's starting address and the apartment size, you can calculate **any apartment's address instantly**.

\`\`\`
Array A[5] = {10, 20, 30, 40, 50} stored at base address 1000 (int = 4 bytes):

Index:    [0]       [1]       [2]       [3]       [4]
Address:  1000      1004      1008      1012      1016
Value:    | 10 |    | 20 |    | 30 |    | 40 |    | 50 |
          ←4B→      ←4B→      ←4B→      ←4B→      ←4B→

To find A[3]: Address = 1000 + (3 × 4) = 1012  →  Value = 40  ✓
\`\`\`

This is why array access is **$O(1)$** — it's just one multiplication and one addition!

### 3.2 Why Do We Need Arrays?

Without arrays, to store 100 student marks, you'd need 100 separate variables (\`marks1\`, \`marks2\`, ..., \`marks100\`). This is:
- **Tedious**: You can't loop through them.
- **Error-prone**: You might misspell one variable name.
- **Inefficient**: No way to pass all of them to a function easily.

Arrays solve this by giving you a **single name** with an **index** to access any element.

---

## 4. How Does It Work Internally? (Cache & Performance)

### 4.1 CPU Cache Lines and Spatial Locality

Modern CPUs don't read one byte at a time from RAM. They read in chunks called **cache lines** (typically 64 bytes):

\`\`\`
When you access A[0], the CPU loads a full cache line:

RAM → CPU Cache Line (64 bytes):
+——+——+——+——+——+——+——+——+——+——+——+——+——+——+——+——+
|A0|A1|A2|A3|A4|A5|A6|A7|A8|A9|A10|A11|A12|A13|A14|A15|
+——+——+——+——+——+——+——+——+——+——+——+——+——+——+——+——+
 ↑ You asked for this one
   ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ CPU loaded these FOR FREE!
\`\`\`

- **Spatial Locality**: Because array elements are contiguous, reading \`A[0]\` automatically pre-loads \`A[1]\` through \`A[15]\` into the cache.
- **Cache Hit**: Subsequent accesses to \`A[1]\`, \`A[2]\`, etc. are served from the cache (≈1 nanosecond) instead of RAM (≈100 nanoseconds) — **100× faster**!
- **This is why arrays are faster than linked lists** for sequential access, even though both are $O(n)$ for traversal.

### 4.2 Static vs Dynamic Arrays

| Feature | Static Array | Dynamic Array |
|:---|:---|:---|
| **Size** | Fixed at compile-time | Grows/shrinks at runtime |
| **Declaration** | \`int arr[100];\` (C) | \`int* arr = malloc(n * sizeof(int));\` (C) |
| **Memory** | Stack (usually) | Heap |
| **Resize?** | No (Fixed capacity) | Yes (Doubles capacity when full) |
| **Use when** | Size is known in advance | Size is unknown or changes |

---

## 5. Key Architectural Invariants

1. **Contiguous Allocation**: If an element $A[i]$ starts at byte $B$, $A[i+1]$ starts immediately at $B + W$, where $W$ is the size (in bytes) of the data type.
2. **Random Access ($O(1)$)**: Because memory addresses are calculated through simple arithmetic, any element can be reached in constant time without traversing preceding elements.
3. **Cache Locality**: Contiguous storage provides optimal spatial locality. When $A[i]$ is loaded into the CPU cache line (typically 64 bytes), subsequent elements $A[i+1], A[i+2]$ are automatically prefetched, dramatically accelerating sequential processing.

---

## 6. Address Calculation Formulas (GATE & NET Core)

### 6.1 One-Dimensional (1D) Array
Given an array $A[LB \\dots UB]$ with:
- $LB$ = Lower Bound (starting index, often $0$ or $1$)
- $UB$ = Upper Bound (ending index)
- $Base$ = Base memory address of the first element ($LOC(A[LB])$)
- $W$ = Width (size in bytes of each element)

$$\\text{Length of Array} = UB - LB + 1$$
$$LOC(A[k]) = Base + (k - LB) \\times W$$

#### Worked Example (GATE-style)
> **Q**: An array $A[5 \\dots 20]$ of integers (each 4 bytes) has base address $2000$. Find $LOC(A[12])$.
>
> **Solution**:
> - $LB = 5$, $W = 4$, $Base = 2000$, $k = 12$
> - $LOC(A[12]) = 2000 + (12 - 5) \\times 4 = 2000 + 28 = \\mathbf{2028}$

### 6.2 Two-Dimensional (2D) Array: Row-Major vs Column-Major
Consider a 2D matrix $A[RLB \\dots RUB, CLB \\dots CUB]$ with $M$ rows and $N$ columns:
$$M = RUB - RLB + 1, \\quad N = CUB - CLB + 1$$

#### A. Row-Major Order (Used by C, C++, Python, Java)
Elements are stored row by row in linear memory:
$$LOC(A[i, j]) = Base + W \\times \\Big[ (i - RLB) \\times N + (j - CLB) \\Big]$$

\`\`\`
2D Array A[3][4] stored in Row-Major (row by row):

Logical View:           Linear Memory:
   C0  C1  C2  C3
R0 [1] [2] [3] [4]     | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |10 |11 |12 |
R1 [5] [6] [7] [8]       R0 elements    R1 elements    R2 elements
R2 [9] [10][11][12]
\`\`\`

*Explanation*: To reach element $(i, j)$, you skip $(i - RLB)$ complete rows (each row contains $N$ elements) plus $(j - CLB)$ elements in the current row.

#### B. Column-Major Order (Used by Fortran, MATLAB, R)
Elements are stored column by column in linear memory:
$$LOC(A[i, j]) = Base + W \\times \\Big[ (j - CLB) \\times M + (i - RLB) \\Big]$$

\`\`\`
Same 2D Array A[3][4] stored in Column-Major (column by column):

Logical View:           Linear Memory:
   C0  C1  C2  C3
R0 [1] [2] [3] [4]     | 1 | 5 | 9 | 2 | 6 |10 | 3 | 7 |11 | 4 | 8 |12 |
R1 [5] [6] [7] [8]       C0 elems    C1 elems    C2 elems    C3 elems
R2 [9] [10][11][12]
\`\`\`

*Explanation*: To reach element $(i, j)$, you skip $(j - CLB)$ complete columns (each column contains $M$ elements) plus $(i - RLB)$ elements in the current column.

#### Worked Example (GATE-style 2D)
> **Q**: A 2D array $A[1 \\dots 5, 1 \\dots 4]$ of \`float\` (4 bytes each) is stored in **Row-Major** order starting at address $1000$. Find $LOC(A[3, 2])$.
>
> **Solution**:
> - $RLB=1, CLB=1, M=5, N=4, W=4, Base=1000$
> - $LOC(A[3,2]) = 1000 + 4 \\times [(3-1) \\times 4 + (2-1)]$
> - $= 1000 + 4 \\times [8 + 1] = 1000 + 36 = \\mathbf{1036}$

---

## 7. Array Operations: Step-by-Step Walkthrough

### 7.1 Insertion at Index (O(n))

\`\`\`
Insert value 25 at index 2 in array [10, 20, 30, 40, 50]:

Step 1: Starting state
Index:   [0]  [1]  [2]  [3]  [4]
Value:   |10| |20| |30| |40| |50|

Step 2: Shift elements RIGHT from index 2 onwards (from back to front!)
Index:   [0]  [1]  [2]  [3]  [4]  [5]
Value:   |10| |20| |30| |30| |40| |50|  ← A[5]=A[4], A[4]=A[3], A[3]=A[2]

Step 3: Place new value at index 2
Index:   [0]  [1]  [2]  [3]  [4]  [5]
Value:   |10| |20| |25| |30| |40| |50|  ✓ Done!
\`\`\`

**Why O(n)?** In the worst case (inserting at index 0), every existing element must shift one position right.

### 7.2 Deletion at Index (O(n))

\`\`\`
Delete element at index 1 from array [10, 20, 30, 40, 50]:

Step 1: Starting state
Index:   [0]  [1]  [2]  [3]  [4]
Value:   |10| |20| |30| |40| |50|

Step 2: Shift elements LEFT from index 2 onwards (from front to back!)
Index:   [0]  [1]  [2]  [3]  [4]
Value:   |10| |30| |40| |50| |50|  ← A[1]=A[2], A[2]=A[3], A[3]=A[4]

Step 3: Reduce size by 1 (logically ignore last element)
Index:   [0]  [1]  [2]  [3]
Value:   |10| |30| |40| |50|  ✓ Done!
\`\`\`

### 7.3 Dynamic Array Resizing (Amortized O(1) Append)

\`\`\`
Dynamic array with capacity 4, currently full:

Before (capacity=4, size=4):
Index:  [0] [1] [2] [3]
Value:  |5| |8| |3| |7|

→ Append 9: No room! Double the capacity to 8.

Step 1: Allocate new buffer of size 8
Step 2: Copy all 4 elements to new buffer
Step 3: Free old buffer
Step 4: Insert 9 at index 4

After (capacity=8, size=5):
Index:  [0] [1] [2] [3] [4] [5] [6] [7]
Value:  |5| |8| |3| |7| |9| |  | |  | |  |
\`\`\`

---

## 8. When to Use Arrays vs Other Data Structures

| Scenario | Best Choice | Why? |
|:---|:---|:---|
| Need frequent random access by index | **Array** | $O(1)$ access |
| Size is known and fixed | **Static Array** | Minimal overhead |
| Size changes frequently (many inserts/deletes) | **Linked List** | Avoids $O(n)$ array element shifting |
| Need frequent insertions at the beginning | **Linked List** | $O(1)$ head insertion vs $O(n)$ array shift |
| Memory is limited and predictable | **Array** | No pointer memory overhead |
| Need sequential (cache-friendly) traversal | **Array** | Optimal spatial cache locality |

---

## 9. Implementation & Syntax Analysis in C, C++, and Python

Below is the complete implementation of fundamental array operations: **insertion**, **deletion**, **linear search**, and **2D row-major addressing**, with line-by-line pedagogical syntax notes.

### C Implementation (Low-Level Pointers & Manual Memory)

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

/**
 * C Syntax Logic Note:
 * 1. Pointers & Manual Memory: C requires explicit allocation via malloc().
 *    malloc(size_t bytes) allocates raw heap bytes and returns a void* pointer,
 *    which we cast or assign to an integer pointer (int*).
 * 2. Bounds Checking: C arrays DO NOT have built-in boundary checks; accessing
 *    out-of-bounds indices leads to undefined behavior (memory corruption or segmentation faults).
 * 3. Passing by Reference: To modify array size in calling function, we pass int* size.
 */

// Structure representing a Dynamic Array
typedef struct {
    int* data;      // Pointer to contiguous heap buffer
    int capacity;   // Total allocated elements
    int size;       // Current number of elements stored
} DynamicArray;

// Initialize array with initial capacity
DynamicArray createArray(int initialCapacity) {
    DynamicArray arr;
    arr.capacity = initialCapacity;
    arr.size = 0;
    // malloc: allocate initialCapacity * sizeof(int) contiguous bytes
    arr.data = (int*)malloc(arr.capacity * sizeof(int));
    return arr;
}

// Insert at specific index: O(n) worst case because of shifting
void insertAt(DynamicArray* arr, int index, int value) {
    // Syntax check: Validate index bounds
    if (index < 0 || index > arr->size) {
        printf("Error: Index %d out of bounds.\\n", index);
        return;
    }
    
    // Dynamic resizing: If capacity is full, double the buffer
    if (arr->size >= arr->capacity) {
        arr->capacity *= 2;
        // realloc safely moves existing elements to larger block
        arr->data = (int*)realloc(arr->data, arr->capacity * sizeof(int));
    }
    
    // Logic: Shift elements from the right towards index to create a slot
    for (int i = arr->size; i > index; i--) {
        arr->data[i] = arr->data[i - 1];
    }
    
    // Assign value to newly freed slot
    arr->data[index] = value;
    arr->size++;
}

// Delete at specific index: O(n) because remaining elements shift left
void deleteAt(DynamicArray* arr, int index) {
    if (index < 0 || index >= arr->size) {
        printf("Error: Index %d out of bounds.\\n", index);
        return;
    }
    
    // Logic: Overwrite by shifting following elements left by 1 position
    for (int i = index; i < arr->size - 1; i++) {
        arr->data[i] = arr->data[i + 1];
    }
    arr->size--;
}

// Memory Cleanup: Free heap memory to prevent memory leaks!
void freeArray(DynamicArray* arr) {
    // free() returns allocated heap block back to the OS
    free(arr->data);
    arr->data = NULL; // Defensive programming: eliminate dangling pointer
    arr->size = 0;
    arr->capacity = 0;
}
\`\`\`

---

### C++ Implementation (OOP, RAII & STL Vector)

\`\`\`cpp
#include <iostream>
#include <vector>
#include <stdexcept>

/**
 * C++ Syntax Logic Note:
 * 1. RAII (Resource Acquisition Is Initialization): Modern C++ uses classes with
 *    constructors/destructors so heap memory is freed automatically when out of scope.
 * 2. std::vector<T>: Built-in dynamic array managing exponential reallocation automatically.
 * 3. Pass-by-Reference (&): Passing "const std::vector<int>&" avoids expensive deep copies.
 */

template <typename T>
class SafeArray {
private:
    std::vector<T> elements;

public:
    // Append to end: Amortized O(1)
    void pushBack(const T& val) {
        elements.push_back(val);
    }

    // Insert at index: O(n)
    void insert(size_t index, const T& val) {
        if (index > elements.size()) {
            throw std::out_of_range("Index out of bounds for insertion");
        }
        // std::vector::insert takes an iterator: elements.begin() + index
        elements.insert(elements.begin() + index, val);
    }

    // Delete at index: O(n)
    void removeAt(size_t index) {
        if (index >= elements.size()) {
            throw std::out_of_range("Index out of bounds for deletion");
        }
        elements.erase(elements.begin() + index);
    }

    // Direct access with bounds check: at() throws out_of_range
    T get(size_t index) const {
        return elements.at(index); // Safer than operator[]
    }

    size_t size() const { return elements.size(); }
};
\`\`\`

---

### Python Implementation (Dynamic Typing, References & Slicing)

\`\`\`python
"""
Python Syntax Logic Note:
1. Python lists are dynamic arrays of OBJECT REFERENCES (pointers to Python objects).
2. Heterogeneous: Lists can store multiple types because each entry is a reference.
3. Slicing: list[start:end:step] creates a new list via shallow copying.
4. Python handles memory allocation and garbage collection automatically via reference counting.
"""

class CustomArray:
    def __init__(self, initial_elements=None):
        # Internally wraps Python's native list (over-allocated C array)
        self._data = list(initial_elements) if initial_elements else []

    def insert_at(self, index: int, value):
        """
        O(n) time complexity:
        Python shifts all internal pointer references right from 'index'.
        """
        if index < 0 or index > len(self._data):
            raise IndexError(f"Index {index} out of range [0, {len(self._data)}]")
        self._data.insert(index, value)

    def delete_at(self, index: int):
        """
        O(n) time complexity:
        Removes reference and shifts remaining pointers left.
        """
        if index < 0 or index >= len(self._data):
            raise IndexError(f"Index {index} out of range [0, {len(self._data) - 1}]")
        return self._data.pop(index)

    def access(self, index: int):
        """O(1) direct pointer dereference."""
        return self._data[index]

    def __len__(self):
        # Enables standard len(arr) syntax
        return len(self._data)

    def __repr__(self):
        return f"CustomArray({self._data})"
\`\`\`

---

## 10. GATE & UGC NET Exam Shortcuts & Traps

> [!WARNING]
> **Trap 1: 0-Based vs 1-Based Indexing in Exam Questions!**
> Always verify whether the question specifies $A[1 \\dots M, 1 \\dots N]$ or $A[0 \\dots M-1, 0 \\dots N-1]$.
> - If 1-based, $RLB = 1, CLB = 1$.
> - If 0-based, $RLB = 0, CLB = 0$.

> [!NOTE]
> **Amortized Analysis of Dynamic Array Expansion**:
> When a dynamic array doubles its capacity upon filling:
> - Cost of $N$ insertions = $O(N)$ copies + $N$ inserts = $3N$ operations.
> - **Amortized time per insertion = $\\frac{3N}{N} = O(1)$**.
`,
};
