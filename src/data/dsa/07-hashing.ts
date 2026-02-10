import { LearningModule } from "@/types/learning";

export const hashingModule: LearningModule = {
  id: "07-hashing",
  title: "7. Hashing",
  description: "O(1) average lookup - Hash Tables, Collision Handling",
  status: "in-progress",
  tags: ["Data Structure"],
  detailedContent: `# Hashing

> **Data Structure Module** - Learn constant-time data lookup

---

## What You'll Learn

1. Understand how hash functions work
2. Use Python dictionaries (hash tables)
3. Handle collisions
4. Know when to use sets vs dictionaries

---

## 1. What is Hashing? (Simple Explanation)

Hashing is like a **library catalog system**:

Instead of searching every book (O(n)), you:
1. Look up the category code (hash the key)
2. Go directly to that shelf (O(1)!)

**Hash function:** Converts any key → index number

\`\`\`
"apple" → hash() → 3
"banana" → hash() → 7

array[3] = "apple's data"
array[7] = "banana's data"

To find "apple": hash("apple") = 3, look at array[3]. Done!
\`\`\`

---

## 2. Python Dictionary = Hash Table

Python's dict IS a hash table!

\`\`\`python path=null start=null
# Create dictionary
student = {}

# INSERT - O(1) average
student["name"] = "Alice"
student["age"] = 21
student["major"] = "Computer Science"

# ACCESS - O(1) average
print(student["name"])  # Alice

# UPDATE - O(1)
student["age"] = 22

# CHECK EXISTS - O(1)
if "major" in student:
    print("Has major:", student["major"])

# DELETE - O(1)
del student["age"]

# GET with default (safe access)
print(student.get("gpa", 0.0))  # 0.0 (key doesn't exist)
\`\`\`

---

## 3. Python Set = Hash Set

For storing UNIQUE items only (no key-value pairs)

\`\`\`python path=null start=null
# Create set
visited = set()

# ADD - O(1)
visited.add("page1")
visited.add("page2")
visited.add("page1")  # Duplicate ignored!

print(len(visited))  # 2 (not 3!)

# CHECK MEMBERSHIP - O(1)
print("page1" in visited)  # True
print("page3" in visited)  # False

# REMOVE - O(1)
visited.remove("page1")

# Common operations
a = {1, 2, 3}
b = {2, 3, 4}

print(a | b)  # Union: {1, 2, 3, 4}
print(a & b)  # Intersection: {2, 3}
print(a - b)  # Difference: {1}
\`\`\`

---

## 4. Collision Handling

**Problem:** Two different keys hash to same index!

\`\`\`
"cat" → hash() → 5
"act" → hash() → 5  (Same index! Collision!)
\`\`\`

### Solution 1: Chaining
Store multiple items at same index using a list:

\`\`\`
index 5: [("cat", data1), ("act", data2)]
\`\`\`

### Solution 2: Open Addressing
Find next empty slot:

\`\`\`
index 5: "cat"
index 6: "act"  (5 was taken, try 6)
\`\`\`

**Python uses a combination of both techniques!**

---

## 5. Common Hash Table Patterns

### Counting Frequency
\`\`\`python path=null start=null
def count_chars(s):
    freq = {}
    for char in s:
        freq[char] = freq.get(char, 0) + 1
    return freq

print(count_chars("hello"))
# {'h': 1, 'e': 1, 'l': 2, 'o': 1}
\`\`\`

### Using Counter (Built-in)
\`\`\`python path=null start=null
from collections import Counter

word = "mississippi"
count = Counter(word)
print(count)  # Counter({'i': 4, 's': 4, 'p': 2, 'm': 1})
print(count.most_common(2))  # [('i', 4), ('s', 4)]
\`\`\`

### Detecting Duplicates
\`\`\`python path=null start=null
def has_duplicates(arr):
    seen = set()
    for item in arr:
        if item in seen:  # O(1) check!
            return True
        seen.add(item)
    return False

print(has_duplicates([1, 2, 3, 4]))  # False
print(has_duplicates([1, 2, 3, 2]))  # True
\`\`\`

### Two Sum Problem
\`\`\`python path=null start=null
def two_sum(nums, target):
    """Find indices of two numbers that add to target"""
    seen = {}  # value -> index
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    
    return []

print(two_sum([2, 7, 11, 15], 9))  # [0, 1] (2 + 7 = 9)
\`\`\`

---

## Key Takeaways

| Operation | Dict/Set | List |
|:----------|:---------|:-----|
| Search | O(1) avg | O(n) |
| Insert | O(1) avg | O(1) or O(n) |
| Delete | O(1) avg | O(n) |
| Access by index | N/A | O(1) |

**Remember:**
- Dict = Key-value pairs (like phone book)
- Set = Unique values only (like attendance list)
- Both use O(1) average for most operations
- Worst case O(n) when all keys collide
  `,
  subModules: [],
  practiceQuiz: [
    {
      id: "hash-q1",
      question:
        "What is the average time complexity for search in a hash table?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
      correctAnswer: 2,
      explanation:
        "Hash table search is O(1) average. Compute hash(key) → index, go directly. Worst case O(n) when all keys collide.",
      difficulty: "easy",
    },
    {
      id: "hash-q2",
      question: "Which collision handling technique uses linked lists?",
      options: [
        "Linear probing",
        "Quadratic probing",
        "Chaining",
        "Double hashing",
      ],
      correctAnswer: 2,
      explanation:
        "Chaining uses linked lists. Each bucket stores a list. Colliding keys append to that list.",
      difficulty: "medium",
    },
    {
      id: "hash-q3",
      question: "To check if an element exists in a Python set:",
      options: [
        "set.find(item)",
        "set.contains(item)",
        "item in set",
        "set.exists(item)",
      ],
      correctAnswer: 2,
      explanation:
        "'item in set' is correct. Uses hash lookup for O(1) average time.",
      difficulty: "easy",
    },
    {
      id: "hash-q4",
      question:
        "What is the worst case time complexity of hash table operations?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      explanation:
        "Worst case is O(n) when all keys hash to same index (all collide). Rare with good hash function.",
      difficulty: "medium",
    },
    {
      id: "hash-q5",
      question:
        "Which data structure is ideal for detecting duplicates in O(n) time?",
      options: ["Array", "Linked List", "Hash Set", "Binary Tree"],
      correctAnswer: 2,
      explanation:
        "Hash Set gives O(1) lookup. Iterate array once, check/add to set. Total O(n) time.",
      difficulty: "easy",
    },
    {
      id: "hash-q6",
      question: "In linear probing, when a collision occurs:",
      options: [
        "Use linked list",
        "Check next slot sequentially",
        "Rehash with different function",
        "Throw error",
      ],
      correctAnswer: 1,
      explanation:
        "Linear probing checks next slot (+1, +2, +3...) until empty slot found. Simple but can cause clustering.",
      difficulty: "medium",
    },
    {
      id: "hash-q7",
      question: "What is the load factor in hashing?",
      options: [
        "Number of elements",
        "Table size",
        "Elements / Table size",
        "Hash function efficiency",
      ],
      correctAnswer: 2,
      explanation:
        "Load factor = n/m (elements/table size). High load factor means more collisions. Rehashing when load factor exceeds threshold.",
      difficulty: "medium",
    },
    {
      id: "hash-q8",
      question: "Python dictionary keys must be:",
      options: [
        "Strings only",
        "Integers only",
        "Hashable (immutable)",
        "Any type",
      ],
      correctAnswer: 2,
      explanation:
        "Keys must be hashable (immutable). Strings, numbers, tuples work. Lists and dicts don't work as keys.",
      difficulty: "easy",
    },
    {
      id: "hash-q9",
      question: "Which problem is commonly solved using hash tables?",
      options: [
        "Finding maximum",
        "Two Sum problem",
        "Sorting array",
        "Finding median",
      ],
      correctAnswer: 1,
      explanation:
        "Two Sum uses hash table. Store complement values, check if current number's complement exists. O(n) solution.",
      difficulty: "easy",
    },
    {
      id: "hash-q10",
      question:
        "Set intersection in Python (a & b) uses which underlying operation?",
      options: ["Nested loops", "Hash lookups", "Sorting", "Binary search"],
      correctAnswer: 1,
      explanation:
        "Set intersection uses hash lookups. For each element in smaller set, check if in larger set. O(min(m,n)) average.",
      difficulty: "medium",
    },
  ],
};
