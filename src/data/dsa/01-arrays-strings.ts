import { LearningModule } from "@/types/learning";

export const arraysStringsModule: LearningModule = {
  id: "01-arrays-strings",
  title: "1. Arrays & Strings",
  description:
    "Foundation data structures - contiguous memory and character sequences",
  status: "in-progress",
  tags: ["Data Structure"],
  detailedContent: `# Arrays & Strings

> **Data Structure Module** - Learn how data is stored and organized

Arrays and Strings are the building blocks of programming. Every other data structure builds on these concepts!

---

## What You'll Learn

By the end of this module, you will be able to:
1. Understand how arrays store data in memory
2. Perform common array operations (access, insert, delete)
3. Work with 2D arrays (matrices)
4. Manipulate strings efficiently

---

## 1. Arrays - The Foundation

### What is an Array? (Simple Explanation)

Think of an array like a **row of lockers** in a school:
- Each locker has a **number** (index) - 0, 1, 2, 3...
- Each locker can hold **one item** (value)
- All lockers are **side by side** (contiguous memory)
- You can go directly to locker #5 without checking lockers 0-4

**Real-world examples:**
- Your contacts list on phone
- A row of seats in a movie theater
- Shopping cart items

### Creating and Using Arrays

\`\`\`python path=null start=null
# Creating an array (list in Python)
fruits = ["apple", "banana", "cherry", "date"]
#         index 0   index 1   index 2   index 3

# ACCESS: Get item at index 2 - Super fast! O(1)
print(fruits[2])  # Output: "cherry"

# MODIFY: Change item at index 1
fruits[1] = "blueberry"
print(fruits)  # ["apple", "blueberry", "cherry", "date"]

# ADD: Append to end - Fast! O(1)
fruits.append("elderberry")

# INSERT: Add at specific position - Slow! O(n)
# Why slow? All elements after must shift right
fruits.insert(0, "avocado")  # Add at beginning

# DELETE: Remove by value - Slow! O(n)
fruits.remove("cherry")

# LENGTH: How many items? - Fast! O(1)
print(len(fruits))  # 5
\`\`\`

### Why Some Operations Are Slow?

**Inserting at the beginning (O(n)):**
Imagine inserting a person at the front of a queue - everyone must step back!

\`\`\`
Before: [10, 20, 30, 40]
Insert 5 at position 0:
Step 1: [10, 20, 30, 40, _]  ← Make space
Step 2: [_, 10, 20, 30, 40]  ← Shift all right
Step 3: [5, 10, 20, 30, 40]  ← Insert 5
\`\`\`

### Time Complexity Summary

| Operation | Time | Why? |
|:----------|:-----|:-----|
| Access by index | O(1) | Direct jump to location |
| Search (unsorted) | O(n) | Must check each element (Linear Search) |
| Search (sorted) | O(log n) | Binary Search halves search space each step |
| Add at end | O(1) | Just add after last item |
| Add at beginning | O(n) | Shift all elements right |
| Delete | O(n) | Shift all elements left |

### Array Properties

1. **Homogeneous Elements** — All elements must be of the same data type
2. **Zero-based Indexing** — First element is at index 0 (in most languages)
3. **Contiguous Memory** — Elements are stored adjacent to each other in memory
4. **Fixed Size** — Classic arrays have a fixed size declared at creation (dynamic arrays resize automatically)

### Applications of Arrays

- Implementing **sorting algorithms** (Bubble Sort, Quick Sort, Merge Sort, etc.)
- Building other data structures: **Stacks, Queues, Heaps, Hash Tables**
- **CPU scheduling** algorithms
- Storing **image pixels** (2D arrays)
- **Lookup tables** for constant-time data retrieval

---

## 2. Memory Representation of Arrays

### 1D Array — Address Calculation

If an array starts at a base address, we can compute the memory location of any element:

\`\`\`
Formula: LOC(A[k]) = Base + (k − LowerBound) × W

Where:
  Base  = base address of the array
  k     = index of the element
  W     = width (size in bytes) of each element
\`\`\`

**Example:**

\`\`\`
Base Address = 2000, Width = 4 bytes, Lower Bound = 0

LOC(A[3]) = 2000 + (3 − 0) × 4
          = 2000 + 12
          = 2012
\`\`\`

**Length of Array:**

\`\`\`
Length = Upper Bound − Lower Bound + 1
\`\`\`

### 2D Array — Row Major vs Column Major

Two ways to store a 2D array in linear memory:

**Row Major Order** (row by row — C, C++, Python, Java):

\`\`\`
LOC(A[R,C]) = Base + W × ((R − RLB) × (CUB − CLB + 1) + (C − CLB))

Where:
  RLB = Row Lower Bound    CLB = Column Lower Bound
  CUB = Column Upper Bound  W = Width of each element
\`\`\`

**Column Major Order** (column by column — Fortran, MATLAB):

\`\`\`
LOC(A[R,C]) = Base + W × ((C − CLB) × (RUB − RLB + 1) + (R − RLB))
\`\`\`

> These formulas are frequently asked in CUET PG and GATE exams!

---

## 3. Array Declaration (C Language)

\`\`\`c path=null start=null
// Declaration
int a[100];        // Array of 100 integers

// Memory = sizeof(data_type) × length
// For int a[100]: Memory = 4 × 100 = 400 bytes

// Initialization at declaration
int a[4] = {34, 60, 93, 2};
int b[] = {2, 3, 4, 5};      // Size is optional if initialized
float c[] = {-4, 6.8, 60};

// Important:
// 1. If initialized at declaration, dimension is optional
// 2. If not initialized, elements contain garbage values
\`\`\`

---

## 4. 2D Arrays (Matrices)

A 2D array is like a **table with rows and columns** - think of Excel spreadsheet!

\`\`\`python path=null start=null
# Creating a 3x3 matrix
matrix = [
    [1, 2, 3],    # Row 0
    [4, 5, 6],    # Row 1
    [7, 8, 9]     # Row 2
]
#   Col0 Col1 Col2

# Access element at row 1, column 2
print(matrix[1][2])  # Output: 6 (row 1, col 2)

# Traverse all elements (row by row)
for row in range(3):
    for col in range(3):
        print(matrix[row][col], end=" ")
    print()  # New line after each row

# Output:
# 1 2 3
# 4 5 6
# 7 8 9
\`\`\`

**Common uses:**
- Game boards (chess, tic-tac-toe)
- Image pixels
- Maps and grids

---

## 5. Strings - Array of Characters

A string is essentially an **array of characters**!

\`\`\`python path=null start=null
# Strings in Python
name = "Hello World"

# Access character (just like array!)
print(name[0])    # 'H'
print(name[6])    # 'W'

# Get length
print(len(name))  # 11 (includes space)

# Slicing - Get part of string
print(name[0:5])   # "Hello"
print(name[6:])    # "World"

# IMPORTANT: Strings are IMMUTABLE in Python
# This means you can't modify them directly
# name[0] = 'h'  ← This would cause ERROR!

# Instead, create a new string:
name_lower = name.lower()  # "hello world"
\`\`\`

### Common String Operations

\`\`\`python path=null start=null
text = "hello world"

# Find position of substring
position = text.find("world")  # Returns 6

# Replace text
new_text = text.replace("world", "python")  # "hello python"

# Split into list
words = text.split(" ")  # ["hello", "world"]

# Join list into string
joined = "-".join(words)  # "hello-world"

# Check start/end
text.startswith("hello")  # True
text.endswith("world")    # True
\`\`\`

---

## Key Takeaways

| Concept | Array | String |
|:--------|:------|:-------|
| Access | O(1) - Instant | O(1) - Instant |
| Modify | O(1) - Can change | O(n) - Create new |
| Insert | O(n) - Shift needed | O(n) - Create new |
| Search | O(n) - Check each | O(n) - Check each |

**Remember:**
- Arrays = Mutable (can change)
- Strings = Immutable (cannot change in Python)

---

## TL;DR - Quick Recall

**One-liner for each concept:**

| Concept | Key Takeaway |
|:--------|:-------------|
| **Array** | Contiguous memory for O(1) index access, but O(n) insertion/deletion. |
| **Sparse Matrix** | Mostly zeros; saved memory by storing as (Row, Column, Value) triplets. |
| **String** | An array of characters; **immutable** in languages like Python/Java. |
| **Matrices** | 2D Arrays (rows and columns); used for maps, boards, and mathematical representations. |
| **Memory** | Arrays have a fixed size natively; Dynamic Arrays resize automatically under the hood (amortized O(1) append). |

**Essential Code Snippets:**

\`\`\`python
# Finding in an array
has_five = 5 in my_array  # O(n) search

# Sparse Matrix (Triplet)
sparse = [
    (0, 2, 15),  # Row 0, Col 2 = 15
    (1, 1, 22)   # Row 1, Col 1 = 22
]

# String tricks
reversed_str = my_str[::-1]
words = my_str.split(" ")
\`\`\`

**The Golden Rules:**
1. Remember that Array insertion at the beginning is **O(n)** because every element shifts!
2. Two pointers and Sliding Window are the most common array patterns.
3. Because Strings are immutable (Python/Java), string concatenation inside a loop is often **O(n²)** unless using \`.join()\`.

---

## Additional Resources

**Video Courses:**
- [NeetCode - Arrays & Hashing](https://youtu.be/3OamzN90kPg) - Excellent LeetCode preparations
- [Introduction to Data Structures & Algorithms](https://youtu.be/5_5oE5lgrhw) - Deep dive for university exams

**Articles & Visualizations:**
- [VisuAlgo - Array](https://visualgo.net/en/array) - Interactive array operations
- [GeeksforGeeks - Sparse Matrix](https://www.geeksforgeeks.org/sparse-matrix-representation/) - Great for exam theory

**Practice Problems:**
- LeetCode 1: Two Sum
- LeetCode 217: Contains Duplicate
- LeetCode 242: Valid Anagram
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "arr-q1",
      question:
        "What is the time complexity of accessing an element in an array by index?",
      options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
      correctAnswer: 1,
      explanation:
        "Array access by index is O(1). Arrays store elements in contiguous memory, so address = base + (i × element_size). Direct calculation = constant time.",
      difficulty: "easy",
    },
    {
      id: "arr-q2",
      question: "Inserting at the beginning of an array takes:",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      correctAnswer: 1,
      explanation:
        "Insert at beginning is O(n). All existing elements must shift right. If array has n elements, we shift n elements.",
      difficulty: "easy",
    },
    {
      id: "arr-q3",
      question:
        "In Python, what happens when you try to modify a character in a string directly?",
      options: [
        "It works fine",
        "TypeError - strings are immutable",
        "The string gets longer",
        "Nothing happens",
      ],
      correctAnswer: 1,
      explanation:
        "Python strings are IMMUTABLE. s[0] = 'H' causes TypeError. To modify, create a new string: s = 'H' + s[1:]",
      difficulty: "easy",
    },
    {
      id: "arr-q4",
      question:
        "What is the time complexity of appending an element to the end of a Python list?",
      options: ["O(n)", "O(1) amortized", "O(log n)", "O(n²)"],
      correctAnswer: 1,
      explanation:
        "Appending to end is O(1) amortized. Python lists over-allocate space, so most appends are O(1). Occasionally resizing takes O(n), but averaged out it's O(1).",
      difficulty: "easy",
    },
    {
      id: "arr-q5",
      question:
        "Which operation is FASTER in a linked list compared to an array?",
      options: [
        "Access by index",
        "Insert at beginning",
        "Binary search",
        "Random access",
      ],
      correctAnswer: 1,
      explanation:
        "Insert at beginning is O(1) for linked list vs O(n) for array. Linked list just updates pointers, while array must shift all elements.",
      difficulty: "easy",
    },
    {
      id: "arr-q6",
      question:
        "What is the space complexity of a 2D array with m rows and n columns?",
      options: ["O(m)", "O(n)", "O(m + n)", "O(m × n)"],
      correctAnswer: 3,
      explanation:
        "A 2D array with m rows and n columns stores m × n elements, so space complexity is O(m × n).",
      difficulty: "easy",
    },
    {
      id: "arr-q7",
      question: "Which of the following is TRUE about arrays?",
      options: [
        "Elements can be of different types",
        "Size can change dynamically in C",
        "Elements are stored contiguously",
        "Access time depends on array size",
      ],
      correctAnswer: 2,
      explanation:
        "Arrays store elements in contiguous (adjacent) memory locations. This is why index-based access is O(1) - we can calculate exact memory address.",
      difficulty: "easy",
    },
    {
      id: "arr-q8",
      question:
        "The time complexity of searching for an element in an unsorted array is:",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 2,
      explanation:
        "In unsorted array, we must check each element one by one (linear search). Worst case: element is last or not present = O(n).",
      difficulty: "easy",
    },
    {
      id: "arr-q9",
      question:
        "What does the slice operation s[1:4] return for string s = 'HELLO'?",
      options: ["'HEL'", "'ELL'", "'ELLO'", "'LLO'"],
      correctAnswer: 1,
      explanation:
        "Slicing is [start:end) - includes start index, excludes end. s[1:4] = characters at index 1, 2, 3 = 'ELL'. Remember: indexing starts at 0!",
      difficulty: "easy",
    },
    {
      id: "arr-q10",
      question:
        "Which data structure is best for implementing a dynamic array?",
      options: ["Linked List", "ArrayList/Vector", "Stack", "Queue"],
      correctAnswer: 1,
      explanation:
        "ArrayList (Java) / Vector (C++) / Python list are dynamic arrays. They automatically resize when full, providing O(1) amortized insertion at end.",
      difficulty: "medium",
    },
    {
      id: "arr-q11",
      question:
        "Deleting an element from the middle of an array of size n takes:",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      explanation:
        "Deleting from middle requires shifting all elements after the deleted one to fill the gap. In worst case (delete first element), shift n-1 elements = O(n).",
      difficulty: "easy",
    },
    {
      id: "arr-q12",
      question:
        "Which string operation has O(n+m) time complexity where n and m are string lengths?",
      options: [
        "Access character",
        "Find length",
        "Concatenation",
        "Check if empty",
      ],
      correctAnswer: 2,
      explanation:
        "String concatenation s1 + s2 creates a new string by copying both. Must copy n characters from s1 and m from s2 = O(n+m).",
      difficulty: "medium",
    },
  ],
};
