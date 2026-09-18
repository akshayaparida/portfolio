import { Assessment } from "./types";

export const curajAssessments: Assessment[] = [
  // ==========================================
  // SEMESTER 1: Advanced Python Programming (6.0CSC03)
  // ==========================================
  {
    id: "sem1-python-cia1",
    courseCode: "6.0CSC03",
    courseSlug: "python",
    courseTitle: "Advanced Python Programming",
    semester: "Semester I",
    assessmentType: "CIA-1",
    title: "Continuous Internal Assessment 1 (CIA-1)",
    date: "September 16, 2026",
    time: "01 Hrs.",
    totalMarks: 20,
    instructions: ["All questions are compulsory."],
    paperImages: ["/curaj-msc-cs/sem1/python/python-cia1.jpg"],
    status: "available",
    notes:
      "Department of Computer Science, School of Mathematics, Statistics & Computational Sciences, Central University of Rajasthan (CURAJ). Covers Python Data Structures, Functions, Flow Control, OOP Basics, Slicing, and Inheritance.",
    questions: [
      {
        id: "q1",
        qNumber: "Q1",
        marks: 3,
        question:
          "Explain the difference between lists and tuples. Write a Python program to convert a tuple into a list and a list into a tuple.",
        solution: {
          summary:
            "Lists and tuples are sequence data structures in Python with differences in mutability, syntax, memory footprint, and usage semantics.",
          keyPoints: [
            "Mutability: Lists are mutable (elements can be added, removed, or modified in-place). Tuples are immutable (cannot be altered after definition).",
            "Syntax: Lists use square brackets `[]`, while tuples use parentheses `()` or comma-separated items.",
            "Performance: Tuples have smaller memory overhead and faster iteration/lookup speeds due to fixed sizing.",
            "Built-in Methods: Lists support `.append()`, `.extend()`, `.pop()`, `.remove()`, `.sort()`. Tuples only support `.count()` and `.index()`.",
            "Dictionary Keys: Tuples can serve as dictionary keys (since they are hashable if their elements are immutable); lists cannot be keys.",
          ],
          code: `# ==========================================
# Conversion between Lists and Tuples in Python
# ==========================================

# 1. Converting a Tuple to a List
original_tuple = ("Python", 3.12, "CURAJ", True, 2026)
print("Original Tuple :", original_tuple, "| Type:", type(original_tuple))

converted_list = list(original_tuple)
print("Converted List :", converted_list, "| Type:", type(converted_list))

# Demonstrating mutability of the resulting list
converted_list.append("Semester I")
print("Modified List  :", converted_list)

# 2. Converting a List to a Tuple
original_list = ["AI", "Advanced Algorithms", "Python Programming"]
print("\nOriginal List  :", original_list, "| Type:", type(original_list))

converted_tuple = tuple(original_list)
print("Converted Tuple:", converted_tuple, "| Type:", type(converted_tuple))`,
          output: `Original Tuple : ('Python', 3.12, 'CURAJ', True, 2026) | Type: <class 'tuple'>
Converted List : ['Python', 3.12, 'CURAJ', True, 2026] | Type: <class 'list'>
Modified List  : ['Python', 3.12, 'CURAJ', True, 2026, 'Semester I']

Original List  : ['AI', 'Advanced Algorithms', 'Python Programming'] | Type: <class 'list'>
Converted Tuple: ('AI', 'Advanced Algorithms', 'Python Programming') | Type: <class 'tuple'>`,
        },
      },
      {
        id: "q2",
        qNumber: "Q2",
        marks: 3,
        question:
          "Explain positional, default, and keyword arguments in a function with suitable examples.",
        solution: {
          summary:
            "Python function arguments can be passed via position, default fallbacks, or explicit keyword naming.",
          keyPoints: [
            "Positional Arguments: Values are passed based on their order in the function call. The first argument maps to the first parameter, second to second.",
            "Default Arguments: Parameters initialized with a fallback value in the function definition. If the caller does not pass a value, the default is used.",
            "Keyword Arguments: Values passed using the syntax `parameter_name=value`. The order does not matter because arguments are matched by name.",
          ],
          code: `# ========================================================
# Positional, Default, and Keyword Arguments in Python
# ========================================================

def student_record(name, course, semester="Semester I", university="CURAJ"):
    """
    'name' and 'course' are required parameters.
    'semester' and 'university' have default argument values.
    """
    print(f"Name: {name:10} | Course: {course:20} | Sem: {semester:11} | Uni: {university}")

# 1. Positional Arguments (Order matters!)
print("--- 1. Positional Arguments ---")
student_record("Akshaya", "MSc Computer Science")

# 2. Default Arguments (semester and university take defaults)
print("\n--- 2. Default Arguments in action ---")
student_record("Debiprasad", "MSc CS (AI & ML)")

# 3. Keyword Arguments (Explicitly named, order can be swapped)
print("\n--- 3. Keyword Arguments ---")
student_record(
    university="Central Univ of Rajasthan",
    course="Artificial Intelligence",
    name="Rahul",
    semester="Semester II"
)`,
          output: `--- 1. Positional Arguments ---
Name: Akshaya    | Course: MSc Computer Science | Sem: Semester I  | Uni: CURAJ

--- 2. Default Arguments in action ---
Name: Debiprasad | Course: MSc CS (AI & ML)     | Sem: Semester I  | Uni: CURAJ

--- 3. Keyword Arguments ---
Name: Rahul      | Course: Artificial Intelligence | Sem: Semester II | Uni: Central Univ of Rajasthan`,
        },
      },
      {
        id: "q3",
        qNumber: "Q3",
        marks: 3,
        question:
          "Explain the purpose of break, continue, and pass statements in Python. Give one suitable example for each.",
        solution: {
          summary:
            "`break`, `continue`, and `pass` alter the standard loop and block execution flows in Python.",
          keyPoints: [
            "`break`: Immediately halts and terminates the loop (for or while), passing execution to the first statement outside the loop block.",
            "`continue`: Skips the remaining code inside the current iteration of the loop and jumps directly to the evaluation of the next iteration.",
            "`pass`: A null statement used as a syntactic placeholder where code is required syntactically (e.g., empty function, class, or if-condition) without executing any operation.",
          ],
          code: `# ==========================================
# break, continue, and pass in Python
# ==========================================

# 1. break: Stop searching once target is found
print("--- 1. break Statement ---")
numbers = [10, 25, 42, 67, 99, 105]
target = 42

for num in numbers:
    if num == target:
        print(f"Target {target} located! Terminating loop.")
        break
    print(f"Checking number: {num}")

# 2. continue: Skip printing even numbers
print("\n--- 2. continue Statement ---")
for i in range(1, 7):
    if i % 2 == 0:
        continue  # Skip even numbers
    print(f"Odd number encountered: {i}")

# 3. pass: Syntactic placeholder
print("\n--- 3. pass Statement ---")
def future_evaluation_metric():
    pass  # To be implemented for CIA-2

for val in [1, 2, 3]:
    if val == 2:
        pass  # Do nothing for 2
    else:
        print(f"Item processed: {val}")`,
          output: `--- 1. break Statement ---
Checking number: 10
Checking number: 25
Target 42 located! Terminating loop.

--- 2. continue Statement ---
Odd number encountered: 1
Odd number encountered: 3
Odd number encountered: 5

--- 3. pass Statement ---
Item processed: 1
Item processed: 3`,
        },
      },
      {
        id: "q4",
        qNumber: "Q4",
        marks: 3,
        question:
          "What are classes and objects in Python? Explain the role of a constructor (__init__()) with a suitable example.",
        solution: {
          summary:
            "Classes are user-defined blueprints containing attributes and methods; objects are concrete instances. The `__init__()` constructor automatically initializes instance attributes upon creation.",
          keyPoints: [
            "Class: A blueprint or prototype for creating objects that encapsulate data (state) and functions (behavior).",
            "Object: An instance of a class allocated in memory with its own unique state.",
            "Constructor (`__init__()`): A dunder (double underscore) method automatically invoked by Python during object instantiation. Its primary role is to initialize instance variables using the `self` reference.",
          ],
          code: `# ==========================================
# Classes, Objects & Constructor in Python
# ==========================================

class CourseModule:
    # Constructor method: initializes instance attributes
    def __init__(self, code: str, title: str, credits: int):
        self.code = code          # Instance variable
        self.title = title        # Instance variable
        self.credits = credits    # Instance variable

    def get_summary(self) -> str:
        return f"[{self.code}] {self.title} — {self.credits} Credits"

# Creating Objects (Instances of CourseModule)
python_course = CourseModule("6.0CSC03", "Advanced Python Programming", 4)
ai_course = CourseModule("6.0CSC01", "Introduction to AI", 4)

# Calling instance methods
print("Object 1:", python_course.get_summary())
print("Object 2:", ai_course.get_summary())
print("Course Code check:", python_course.code)`,
          output: `Object 1: [6.0CSC03] Advanced Python Programming — 4 Credits
Object 2: [6.0CSC01] Introduction to AI — 4 Credits
Course Code check: 6.0CSC03`,
        },
      },
      {
        id: "q5",
        qNumber: "Q5",
        marks: 4,
        question:
          "Explain string indexing and slicing in Python with suitable examples. Write a Python program to check whether a given string is a palindrome.",
        solution: {
          summary:
            "String indexing accesses individual characters by integer position; slicing retrieves substrings via `[start:stop:step]`. A palindrome check verifies whether a string reads identically forwards and in reverse (`string == string[::-1]`).",
          keyPoints: [
            "Positive Indexing: Begins at `0` from the left (`string[0]` is the first character).",
            "Negative Indexing: Begins at `-1` from the right (`string[-1]` is the last character).",
            "Slicing Syntax: `string[start:stop:step]` returns elements from index `start` up to (but not including) `stop` with increment `step`.",
            "Reversing: `string[::-1]` produces the reverse of a string using a negative step.",
          ],
          code: `# ========================================================
# String Indexing, Slicing & Palindrome Check Program
# ========================================================

# 1. Indexing & Slicing Demonstrations
text = "CURAJ_PYTHON"
print("Full string       :", text)
print("Positive index [0]:", text[0])      # 'C'
print("Negative index[-1]:", text[-1])     # 'N'
print("Slice [0:5]       :", text[0:5])     # 'CURAJ'
print("Slice with step :2:", text[::2])     # 'CRJPT'
print("Reversed [::-1]   :", text[::-1])    # 'NOHTYP_JARUC'

# 2. Palindrome Checker Function
def check_palindrome(input_str: str) -> bool:
    """
    Normalizes case and filters non-alphanumeric characters,
    then compares the normalized string with its reverse slice.
    """
    # Clean: convert to lowercase and keep only alphanumeric chars
    normalized = "".join(ch.lower() for ch in input_str if ch.isalnum())
    # Slicing comparison for palindrome
    return normalized == normalized[::-1]

# Test cases
test_cases = [
    "radar",
    "Madam",
    "CURAJ Rajasthan",
    "A man, a plan, a canal: Panama",
    "12321"
]

print("\n--- Palindrome Test Results ---")
for word in test_cases:
    is_pal = check_palindrome(word)
    status = "✓ PALINDROME" if is_pal else "✗ NOT A PALINDROME"
    print(f"'{word}' -> {status}")`,
          output: `Full string       : CURAJ_PYTHON
Positive index [0]: C
Negative index[-1]: N
Slice [0:5]       : CURAJ
Slice with step :2: CRJPT
Reversed [::-1]   : NOHTYP_JARUC

--- Palindrome Test Results ---
'radar' -> ✓ PALINDROME
'Madam' -> ✓ PALINDROME
'CURAJ Rajasthan' -> ✗ NOT A PALINDROME
'A man, a plan, a canal: Panama' -> ✓ PALINDROME
'12321' -> ✓ PALINDROME`,
        },
      },
      {
        id: "q6",
        qNumber: "Q6",
        marks: 4,
        question:
          "Explain inheritance and method overriding in Python. Write a Python program with a base class Shape and a derived class Rectangle to demonstrate method overriding.",
        solution: {
          summary:
            "Inheritance allows a subclass to acquire attributes and behaviors from a superclass. Method overriding lets a derived class provide a specialized implementation for a method inherited from its parent.",
          keyPoints: [
            "Inheritance: Establishes an 'is-a' relationship (`class Child(Parent):`), maximizing code reuse and modularity.",
            "Method Overriding: Redefining a parent class method in the child class with the same name and signature to provide custom behavior.",
            "`super()`: Built-in function giving access to parent class methods from within the derived class.",
          ],
          code: `# ========================================================
# Inheritance & Method Overriding in Python
# Base class: Shape | Derived class: Rectangle
# ========================================================

class Shape:
    """Base class defining generic shape properties."""
    def __init__(self, name: str = "Generic Shape"):
        self.name = name

    def area(self) -> float:
        """Default base method to be overridden by subclasses."""
        print("Warning: Base Shape has no defined area.")
        return 0.0

    def describe(self) -> str:
        return f"[Shape]: {self.name}"

class Rectangle(Shape):
    """Derived class demonstrating method overriding."""
    def __init__(self, length: float, width: float):
        # Call base class constructor using super()
        super().__init__(name="Rectangle")
        self.length = length
        self.width = width

    # Overriding the base class area() method
    def area(self) -> float:
        return self.length * self.width

    # Overriding describe() to include dimensions and computed area
    def describe(self) -> str:
        base_desc = super().describe()
        return (
            f"{base_desc} | Dimensions: {self.length} x {self.width} "
            f"| Computed Area: {self.area():.2f}"
        )

# Demonstration
print("--- Base Class Shape ---")
generic_shape = Shape()
print(generic_shape.describe())
print("Base Area:", generic_shape.area())

print("\n--- Derived Class Rectangle (Overriding area & describe) ---")
rect = Rectangle(length=12.5, width=6.0)
print(rect.describe())
print(f"Explicit area() call: {rect.area():.2f} sq units")`,
          output: `--- Base Class Shape ---
[Shape]: Generic Shape
Warning: Base Shape has no defined area.
Base Area: 0.0

--- Derived Class Rectangle (Overriding area & describe) ---
[Shape]: Rectangle | Dimensions: 12.5 x 6.0 | Computed Area: 75.00
Explicit area() call: 75.00 sq units`,
        },
      },
    ],
  },

  // ==========================================
  // SEMESTER 1: Python CIA-2 (Upcoming Placeholder)
  // ==========================================
  {
    id: "sem1-python-cia2",
    courseCode: "6.0CSC03",
    courseSlug: "python",
    courseTitle: "Advanced Python Programming",
    semester: "Semester I",
    assessmentType: "CIA-2",
    title: "Continuous Internal Assessment 2 (CIA-2)",
    status: "upcoming",
    totalMarks: 20,
    time: "01 Hrs.",
    paperImages: [],
    notes:
      "Upcoming assessment for Advanced Python Programming covering File Handling, SQLite Database Integration, Exception Hierarchy, and NumPy/Pandas.",
    questions: [],
  },

  // ==========================================
  // SEMESTER 1: AI CIA-1 & CIA-2 (Upcoming Placeholders)
  // ==========================================
  {
    id: "sem1-ai-cia1",
    courseCode: "6.0CSC01",
    courseSlug: "ai",
    courseTitle: "Introduction to Artificial Intelligence",
    semester: "Semester I",
    assessmentType: "CIA-1",
    title: "Continuous Internal Assessment 1 (CIA-1)",
    status: "upcoming",
    totalMarks: 20,
    time: "01 Hrs.",
    paperImages: [],
    notes:
      "Upcoming CIA-1 for AI covering State Space Search, Heuristic Search (A*, IDA*), CSPs, and Minimax.",
    questions: [],
  },
  {
    id: "sem1-ai-cia2",
    courseCode: "6.0CSC01",
    courseSlug: "ai",
    courseTitle: "Introduction to Artificial Intelligence",
    semester: "Semester I",
    assessmentType: "CIA-2",
    title: "Continuous Internal Assessment 2 (CIA-2)",
    status: "upcoming",
    totalMarks: 20,
    time: "01 Hrs.",
    paperImages: [],
    notes:
      "Upcoming CIA-2 for AI covering PDDL Planning, Probabilistic Reasoning, Bayesian Networks, and HMMs.",
    questions: [],
  },

  // ==========================================
  // SEMESTER 1: Advanced Algorithms CIA-1 & CIA-2 (Upcoming)
  // ==========================================
  {
    id: "sem1-algo-cia1",
    courseCode: "6.0CSC02",
    courseSlug: "advanced-algorithms",
    courseTitle: "Advanced Algorithms",
    semester: "Semester I",
    assessmentType: "CIA-1",
    title: "Continuous Internal Assessment 1 (CIA-1)",
    status: "upcoming",
    totalMarks: 20,
    time: "01 Hrs.",
    paperImages: [],
    notes:
      "Upcoming CIA-1 for Advanced Algorithms covering Divide & Conquer, Greedy, DP, Backtracking, and Indian Knowledge Systems.",
    questions: [],
  },
  {
    id: "sem1-algo-cia2",
    courseCode: "6.0CSC02",
    courseSlug: "advanced-algorithms",
    courseTitle: "Advanced Algorithms",
    semester: "Semester I",
    assessmentType: "CIA-2",
    title: "Continuous Internal Assessment 2 (CIA-2)",
    status: "upcoming",
    totalMarks: 20,
    time: "01 Hrs.",
    paperImages: [],
    notes:
      "Upcoming CIA-2 covering Amortized Analysis, Randomized Algorithms, and Approximation Algorithms.",
    questions: [],
  },

  // ==========================================
  // SEMESTER 1: Professional Communication CIA-1 (Upcoming)
  // ==========================================
  {
    id: "sem1-comm-cia1",
    courseCode: "6.0CSC04",
    courseSlug: "professional-communication",
    courseTitle: "Professional Communication",
    semester: "Semester I",
    assessmentType: "CIA-1",
    title: "Continuous Internal Assessment 1 (CIA-1)",
    status: "upcoming",
    totalMarks: 20,
    time: "01 Hrs.",
    paperImages: [],
    notes:
      "Upcoming CIA-1 covering Technical Writing, Research Paper Formatting, and Presentation Skills.",
    questions: [],
  },
];

// Helper Utilities
export function getAllAssessments(): Assessment[] {
  return curajAssessments;
}

export function getAssessmentsForCourse(courseCode: string): Assessment[] {
  return curajAssessments.filter((a) => a.courseCode === courseCode);
}

export function getAssessmentById(id: string): Assessment | undefined {
  return curajAssessments.find((a) => a.id === id);
}

export function getAssessmentsBySemester(semester: string): Assessment[] {
  return curajAssessments.filter((a) => a.semester === semester);
}
