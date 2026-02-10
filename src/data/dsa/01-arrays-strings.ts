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
| Search for value | O(n) | Must check each element |
| Add at end | O(1) | Just add after last item |
| Add at beginning | O(n) | Shift all elements right |
| Delete | O(n) | Shift all elements left |

---

## 2. 2D Arrays (Matrices)

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

## 3. Strings - Array of Characters

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

## Common Interview Patterns

1. **Two Pointers** - Use left and right pointers
2. **Sliding Window** - Move a window through array
3. **Frequency Count** - Count occurrences using dict
4. **Reverse** - Swap from both ends
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
