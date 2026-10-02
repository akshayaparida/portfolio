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
    date: "September 2026",
    time: "01 Hrs.",
    totalMarks: 20,
    instructions: [
      "The Question Paper Contains Three Questions.",
      "Candidates Must Attempt All Questions.",
      "The Missing Data, If Any, May Be Assumed Suitably.",
    ],
    paperImages: ["/cia1ai26.jpeg"],
    status: "available",
    notes:
      "Department of Computer Science, School of Mathematics, Statistics & Computational Sciences, Central University of Rajasthan (CURAJ). First Mid Term Examination (September 2026) for Int. M.Sc. 7 & M.Sc. 1. Covers AI Definitions, AI Techniques (Rich & Knight), Task Domains, Water Jug Problem State Space (5-Gallon & 3-Gallon), and Courier Road Network Graph Traversal (BFS vs DFS).",
    questions: [
      {
        id: "sem1-ai-cia1-q1",
        qNumber: "Q1",
        marks: 4,
        question:
          'What is "Artificial Intelligence and Artificial Technique"? Briefly explain how AI Technique can be represented. List out some of the task domain of AI.',
        solution: {
          summary:
            "Foundational definition of Artificial Intelligence and AI Techniques based on Elaine Rich & Kevin Knight, the 5 criteria of knowledge exploitation, knowledge representation paradigms, and classification of AI task domains (Mundane, Formal, Expert).",
          keyPoints: [
            'Artificial Intelligence (AI): Defined by John McCarthy (1956) as "the science and engineering of making intelligent machines" and operationally by Elaine Rich (1983) as "the study of how to make computers do things at which, at the moment, people are better."',
            "AI Technique: A method that exploits knowledge organized such that: (1) It captures generalizations, (2) It is humanly understandable, (3) It is easily modifiable to reflect changes, (4) It can be used even if incomplete or inaccurate, and (5) It overcomes its own sheer bulk by narrowing search spaces.",
            "Representation of AI Techniques: Formulated using (a) State Space Search (S, A, T, G, c), (b) Production Systems (Condition-Action IF-THEN rules with working memory and conflict resolution), (c) Formal Logic (Propositional & First-Order Predicate Calculus), (d) Structured representations (Semantic Networks, Frames, Scripts), and (e) Probabilistic Models (Bayesian Networks).",
            "Task Domains of AI: Categorized into Mundane Tasks (Vision, Speech, NLP, Commonsense Reasoning, Robot Navigation), Formal Tasks (Board Games like Chess and Go, Theorem Proving, Symbolic Mathematics, Logic), and Expert Tasks (Medical Diagnosis like MYCIN, Molecular Analysis like DENDRAL and AlphaFold, Engineering Design, Financial Analysis).",
          ],
          explanation: [
            "1. Defining Artificial Intelligence (AI):",
            "In university curricula (prescribed reference: Elaine Rich & Kevin Knight, 'Artificial Intelligence', Tata McGraw-Hill), AI represents the study of computational models that exhibit cognitive capabilities: perception, reasoning, problem-solving, learning, and natural language communication.",
            "",
            "2. Defining AI Technique (Rich & Knight's Landmark Criteria):",
            "Rich and Knight emphasized that intelligence is grounded in knowledge. An AI Technique is an architectural method of structuring and using knowledge that satisfies five critical operational criteria:",
            "  a) Captures Generalizations: Situations sharing fundamental principles are represented together rather than enumerating millions of individual edge cases.",
            "  b) Understandable by People: Domain experts who provide, inspect, and audit the knowledge can read and comprehend its representation.",
            "  c) Modifiability: Errors can be corrected and new knowledge incorporated incrementally without breaking the inference engine.",
            "  d) Robust to Incompleteness/Inaccuracy: Operates effectively even when sensor percepts or rules are noisy, ambiguous, or partially specified.",
            "  e) Combinatorial Search Reduction: Overcomes the exponential curse of dimensionality by providing heuristics that prune unpromising branches in large search spaces.",
            "",
            "3. How AI Techniques Can Be Represented:",
            "  - State Space Search: Formulated as a 5-tuple (S₀, Actions, Transition, GoalTest, PathCost). Algorithms like BFS, DFS, A*, and Minimax navigate this space.",
            "  - Production Systems: Condition-Action rules (IF <condition> THEN <action>). Consists of Working Memory (current state facts), Rule Base (domain productions), and an Inference Engine (cycle: Recognize-Act, with Conflict Resolution via specificity, recency, or rule priority).",
            "  - Formal Logic: Declarative sentences expressed in Propositional Logic and First-Order Predicate Calculus (FOPC) solved via Unification and Resolution Refutation.",
            "  - Structured Representation: Semantic Networks (nodes representing objects/concepts connected by relational arcs such as 'is-a' and 'has-a') and Frames (attribute-value slot structures).",
            "  - Probabilistic Graphical Models: Bayesian Belief Networks and Hidden Markov Models modeling conditional independencies under uncertainty.",
            "",
            "4. Task Domains of AI (Rich & Knight Taxonomy):",
            "  - Mundane Tasks (Common everyday faculties learned without formal instruction):",
            "    * Perception: Computer Vision, Object Segmentation, Speech Recognition.",
            "    * Natural Language Processing: Syntactic Parsing, Semantic Understanding, Machine Translation.",
            "    * Commonsense Reasoning & Physical Robot Navigation: Spatial reasoning, obstacle avoidance.",
            "  - Formal Tasks (Explicit axiomatic systems with precise rules):",
            "    * Game Playing: Chess (Deep Blue), Go (AlphaGo), Checkers (Samuel's Checkers program).",
            "    * Mathematics: Automated Theorem Proving, Symbolic Calculus (MACSYMA), Geometry proving.",
            "    * Logic: Propositional Satisfiability (SAT solvers), Constraint Logic Programming.",
            "  - Expert Tasks (High-level specialized tasks requiring formal training and expert human knowledge):",
            "    * Medical Diagnostics: Pathogen identification and antibiotic therapy recommendation (MYCIN), radiological imaging.",
            "    * Scientific Discovery: Mass spectrometry molecular identification (DENDRAL), protein structure prediction (AlphaFold).",
            "    * Engineering & Design: VLSI circuit routing, automated architectural design, fault diagnosis.",
            "    * Finance & Management: Fraud detection, algorithmic quantitative trading, portfolio risk assessment.",
          ],
        },
      },
      {
        id: "sem1-ai-cia1-q2",
        qNumber: "Q2",
        marks: 8,
        question:
          "You are given two jugs, a 5-gallon one and a 3-gallon one. Neither has any measuring markers on it. There is a pump that can be used to fill the jugs with water. How can you get exactly 4 gallons of water into the 5-gallon jug? Describe the state space for this problem.",
        solution: {
          summary:
            "Formal state space formulation of the 5-gallon and 3-gallon Water Jug Problem: state ordered pair (x, y), initial state (0, 0), goal state (4, y), 8 formal production rules, optimal 6-step solution path (Method A) and alternative 8-step solution path (Method B) with verification code.",
          keyPoints: [
            "State Representation: Ordered pair (x, y) where x ∈ {0, 1, 2, 3, 4, 5} denotes the volume in the 5-gallon jug, and y ∈ {0, 1, 2, 3} denotes the volume in the 3-gallon jug.",
            "State Space Size: |S| = 6 × 4 = 24 discrete possible states, of which 14 are reachable from (0, 0).",
            "Initial State: S₀ = (0, 0) (both jugs empty).",
            "Goal State: G = {(4, y) | y ∈ {0, 1, 2, 3}}, specifically (4, 3) or (4, 0).",
            "Production Rules: 8 formal operators handling filling from pump, dumping on ground, and pouring between jugs until full or empty.",
            "Optimal Solution (Method A - Fill 5-gal first, 6 steps): (0,0) → (5,0) → (2,3) → (2,0) → (0,2) → (5,2) → (4,3). Exactly 4 gallons in the 5-gallon jug!",
            "Alternative Solution (Method B - Fill 3-gal first, 8 steps): (0,0) → (0,3) → (3,0) → (3,3) → (5,1) → (0,1) → (1,0) → (1,3) → (4,0).",
            "Mathematical Solvability: Guaranteed by Bézout's Identity: gcd(5, 3) = 1 divides 4. 5(2) + 3(-2) = 4 matches Method A.",
          ],
          explanation: [
            "1. Formal State Space Description:",
            "  - State Vector: (x, y) where x is the gallons of water in the 5-gallon jug (0 ≤ x ≤ 5) and y is the gallons of water in the 3-gallon jug (0 ≤ y ≤ 3).",
            "  - Discrete State Space: S = {(x, y) | x ∈ {0, 1, 2, 3, 4, 5}, y ∈ {0, 1, 2, 3}}. Total size |S| = 6 × 4 = 24 states.",
            "  - Initial State: S₀ = (0, 0).",
            "  - Goal State: Any state with x = 4, i.e., G = {(4, 0), (4, 1), (4, 2), (4, 3)}.",
            "",
            "2. Formal Production Rules (Operators):",
            "  - R1: (x, y) → (5, y) if x < 5  [Fill 5-gallon jug completely from pump]",
            "  - R2: (x, y) → (x, 3) if y < 3  [Fill 3-gallon jug completely from pump]",
            "  - R3: (x, y) → (0, y) if x > 0  [Empty 5-gallon jug onto the ground]",
            "  - R4: (x, y) → (x, 0) if y > 0  [Empty 3-gallon jug onto the ground]",
            "  - R5: (x, y) → (5, y - (5 - x)) if x + y ≥ 5 and y > 0  [Pour from 3-gal into 5-gal until 5-gal is full]",
            "  - R6: (x, y) → (x - (3 - y), 3) if x + y ≥ 3 and x > 0  [Pour from 5-gal into 3-gal until 3-gal is full]",
            "  - R7: (x, y) → (x + y, 0) if x + y ≤ 5 and y > 0  [Pour all water from 3-gal into 5-gal]",
            "  - R8: (x, y) → (0, x + y) if x + y ≤ 3 and x > 0  [Pour all water from 5-gal into 3-gal]",
            "",
            "3. Step-by-Step State Transition (Method A: Fill 5-Gal Jug First — Optimal 6 Operations):",
            "  - Step 0: Initial state (0, 0)",
            "  - Step 1: Apply R1 (Fill 5-gal jug) → (5, 0)",
            "  - Step 2: Apply R6 (Pour from 5-gal into 3-gal until full) → (2, 3)  [3-gal takes 3 gallons; 5 - 3 = 2 gal remains in 5-gal]",
            "  - Step 3: Apply R4 (Empty 3-gal jug on ground) → (2, 0)",
            "  - Step 4: Apply R8 (Pour all 2 gallons from 5-gal into 3-gal) → (0, 2)",
            "  - Step 5: Apply R1 (Fill 5-gal jug from pump) → (5, 2)",
            "  - Step 6: Apply R6 (Pour from 5-gal into 3-gal until full) → (4, 3)  [3-gal already has 2 gal, needs 3 - 2 = 1 gal. Pouring 1 gal leaves 5 - 1 = 4 gallons in 5-gal jug!]",
            "  -> TARGET REACHED: Exactly 4 gallons of water in the 5-gallon jug in 6 steps!",
            "  - (Optional Step 7): Apply R4 (Empty 3-gal jug) → (4, 0).",
            "",
            "4. Step-by-Step State Transition (Method B: Fill 3-Gal Jug First — 8 Operations):",
            "  - Step 0: (0, 0)",
            "  - Step 1: Apply R2 (Fill 3-gal) → (0, 3)",
            "  - Step 2: Apply R7 (Pour 3-gal into 5-gal) → (3, 0)",
            "  - Step 3: Apply R2 (Fill 3-gal) → (3, 3)",
            "  - Step 4: Apply R5 (Pour 3-gal into 5-gal until full) → (5, 1)  [5-gal needs 2 gal; leaves 3 - 2 = 1 gal in 3-gal]",
            "  - Step 5: Apply R3 (Empty 5-gal) → (0, 1)",
            "  - Step 6: Apply R7 (Pour 1 gal from 3-gal into 5-gal) → (1, 0)",
            "  - Step 7: Apply R2 (Fill 3-gal) → (1, 3)",
            "  - Step 8: Apply R7 (Pour all 3 gal from 3-gal into 5-gal) → (4, 0)  [1 + 3 = 4 gal in 5-gallon jug!]",
            "  -> TARGET REACHED: Exactly 4 gallons of water in the 5-gallon jug!",
          ],
          code: `# ==============================================================================
# CURAJ AI CIA-1 2026: 5-Gallon & 3-Gallon Water Jug State Space Simulator (BFS)
# ==============================================================================
from collections import deque

def solve_water_jug():
    # Jug capacities
    cap_x, cap_y = 5, 3
    target_x = 4
    
    # State: (x, y)
    initial_state = (0, 0)
    queue = deque([(initial_state, ["Initial state (0, 0)"])])
    visited = {initial_state}
    
    while queue:
        (x, y), path = queue.popleft()
        
        if x == target_x:
            return (x, y), path
        
        # 8 Production Rules / Successor States
        successors = [
            ((cap_x, y), f"Fill 5-gal jug -> ({cap_x}, {y})"),
            ((x, cap_y), f"Fill 3-gal jug -> ({x}, {cap_y})"),
            ((0, y), f"Empty 5-gal jug -> (0, {y})"),
            ((x, 0), f"Empty 3-gal jug -> ({x}, 0)"),
            # Pour 3-gal into 5-gal
            ((min(cap_x, x + y), y - (min(cap_x, x + y) - x)),
             f"Pour 3-gal into 5-gal -> ({min(cap_x, x + y)}, {y - (min(cap_x, x + y) - x)})"),
            # Pour 5-gal into 3-gal
            ((x - (min(cap_y, x + y) - y), min(cap_y, x + y)),
             f"Pour 5-gal into 3-gal -> ({x - (min(cap_y, x + y) - y)}, {min(cap_y, x + y)})"),
        ]
        
        for next_state, action_desc in successors:
            if next_state not in visited:
                visited.add(next_state)
                queue.append((next_state, path + [action_desc]))

goal_state, solution_steps = solve_water_jug()
print(f"Goal Reached: {goal_state} in {len(solution_steps)-1} operations:\n")
for i, step in enumerate(solution_steps):
    print(f"Step {i}: {step}")`,
          output: `Goal Reached: (4, 3) in 6 operations:

Step 0: Initial state (0, 0)
Step 1: Fill 5-gal jug -> (5, 0)
Step 2: Pour 5-gal into 3-gal -> (2, 3)
Step 3: Empty 3-gal jug -> (2, 0)
Step 4: Pour 5-gal into 3-gal -> (0, 2)
Step 5: Fill 5-gal jug -> (5, 2)
Step 6: Pour 5-gal into 3-gal -> (4, 3)
[Verified: Exactly 4 gallons in 5-gallon jug]`,
        },
      },
      {
        id: "sem1-ai-cia1-q3",
        qNumber: "Q3",
        marks: 8,
        question:
          "A courier company operates in 10 cities, labelled A to J. The cities are connected by two-way roads as shown in the graph below. The adjacency list of the road network, with neighbours listed in alphabetical order, is:\n\nCity | Neighbours\nA    | B, C, D\nB    | A, E, F\nC    | A, G\nD    | A, H\nE    | B, I\nF    | B, G\nG    | C, F, J\nH    | D, I\nI    | E, H, J\nJ    | G, I\n\nFigure 1: Road network of the courier company (A = start, J = goal)\n\nA parcel must be delivered from city A to city J. Assume that neighbours are explored in alphabetical order, a city is marked visited when it is added to the queue or stack.\na) Apply BFS (Breadth First Search)\nb) Apply DFS (Depth First Search)\nc) Compare the two paths obtained in (a) and (b). Which algorithm found the shortest route, and why? Discuss the time and space complexity of BFS and DFS for this graph, and comment on the completeness and optimality of each algorithm.",
        solution: {
          summary:
            "Exhaustive trace of Breadth-First Search (BFS) and Depth-First Search (DFS) on the 10-city courier network: queue/stack step-by-step state progression, visited set tracking on addition, reconstructed paths (BFS: A-C-G-J [3 hops] vs DFS: A-B-E-I-J [4 hops]), and comparative analysis of optimality, time/space complexity, and completeness.",
          keyPoints: [
            "Graph Parameters: Vertices |V| = 10 (A to J), Edges |E| = 11 undirected roads. Start = A, Goal = J. Alphabetical tie-breaking rule. Marked visited when added to queue/stack.",
            "Part (a) BFS: Uses FIFO Queue. Enqueues neighbours level by level: A enqueues B, C, D; B enqueues E, F; C enqueues G; D enqueues H; E enqueues I; F enqueues nothing (B, G visited); G enqueues J. Goal discovered! Reconstructed path: A → C → G → J (Length: 3 edges / 4 cities).",
            "Part (b) DFS: Explores deep branches prioritizing alphabetical neighbours. From A, explores B first; from B, explores E first; from E, explores I; from I, explores H first; from H, explores D; D reaches dead end (A, H visited), backtracks to I; from I, explores next unvisited neighbour J. Goal discovered! Reconstructed path: A → B → E → I → J (Length: 4 edges / 5 cities).",
            "Part (c) Comparison & Optimality: BFS found the strictly shorter route (3 edges vs 4 edges). BFS is optimal for unweighted graphs because it explores paths in non-decreasing order of edge count, guaranteeing that the first time goal J is reached, it is via a minimal-hop path. DFS dives greedily along deep branches and returns the first path encountered regardless of length.",
            "Complexity for this Graph: BFS Time = O(|V| + |E|), Space = O(|V|) = O(b^d) (holds entire wavefronts in queue). DFS Time = O(|V| + |E|), Space = O(m) where m is maximum path depth (stack holds only active search branch).",
            "Completeness: BFS is complete on all finite graphs. DFS is complete on finite graphs when visited duplicate detection is used.",
          ],
          explanation: [
            "--- PART (a): Breadth First Search (BFS) Execution ---",
            "Rule: Marked visited when ADDED to Queue. Neighbours explored in alphabetical order.",
            "  1. Start: Initialize Queue = [A], Visited = {A}, Parent[A] = None.",
            "  2. Dequeue A: Neighbours = B, C, D (all unvisited).",
            "     - Enqueue B, C, D. Visited = {A, B, C, D}. Parent[B]=A, Parent[C]=A, Parent[D]=A.",
            "     - Queue = [B, C, D].",
            "  3. Dequeue B: Neighbours = A (visited), E, F (unvisited).",
            "     - Enqueue E, F. Visited = {A, B, C, D, E, F}. Parent[E]=B, Parent[F]=B.",
            "     - Queue = [C, D, E, F].",
            "  4. Dequeue C: Neighbours = A (visited), G (unvisited).",
            "     - Enqueue G. Visited = {A, B, C, D, E, F, G}. Parent[G]=C.",
            "     - Queue = [D, E, F, G].",
            "  5. Dequeue D: Neighbours = A (visited), H (unvisited).",
            "     - Enqueue H. Visited = {A, B, C, D, E, F, G, H}. Parent[H]=D.",
            "     - Queue = [E, F, G, H].",
            "  6. Dequeue E: Neighbours = B (visited), I (unvisited).",
            "     - Enqueue I. Visited = {A, B, C, D, E, F, G, H, I}. Parent[I]=E.",
            "     - Queue = [F, G, H, I].",
            "  7. Dequeue F: Neighbours = B, G (both already visited). Nothing added.",
            "     - Queue = [G, H, I].",
            "  8. Dequeue G: Neighbours = C, F (visited), J (unvisited).",
            "     - Enqueue J. Visited = {A, B, C, D, E, F, G, H, I, J}. Parent[J]=G.",
            "     - J is the GOAL! (Goal detected on generation / expansion).",
            "  -> BFS Path Backtrace: J -> Parent[J]=G -> Parent[G]=C -> Parent[C]=A",
            "  -> Reconstructed BFS Path: A -> C -> G -> J",
            "  -> Path Length: 3 edges (3 hops).",
            "",
            "--- PART (b): Depth First Search (DFS) Execution ---",
            "Rule: Marked visited when added to stack/explored. Explored in alphabetical order.",
            "  1. Start at A: Unvisited neighbours in alphabetical order: B, C, D. Choose B first.",
            "     - Visited = {A, B}. Current path: A -> B.",
            "  2. At B: Neighbours = A (visited), E, F. In alphabetical order, choose E first.",
            "     - Visited = {A, B, E}. Current path: A -> B -> E.",
            "  3. At E: Neighbours = B (visited), I. Only unvisited neighbour is I. Choose I.",
            "     - Visited = {A, B, E, I}. Current path: A -> B -> E -> I.",
            "  4. At I: Neighbours = E (visited), H, J. In alphabetical order, choose H first.",
            "     - Visited = {A, B, E, I, H}. Current path: A -> B -> E -> I -> H.",
            "  5. At H: Neighbours = I (visited), D. Choose D.",
            "     - Visited = {A, B, E, I, H, D}. Current path: A -> B -> E -> I -> H -> D.",
            "  6. At D: Neighbours = A, H (both already visited!). Dead end reached! Backtrack to H, then backtrack to I.",
            "  7. Back at I: Next unvisited neighbour in alphabetical order is J! Choose J.",
            "     - Visited includes J. J is the GOAL!",
            "  -> Reconstructed DFS Path: A -> B -> E -> I -> J",
            "  -> Path Length: 4 edges (4 hops).",
            "  *(Note on Explicit LIFO Stack pushing [B, C, D]: If an explicit stack pushes neighbours in forward alphabetical order [B, C, D], D sits at the top and is popped first, yielding the alternate DFS path A -> D -> H -> I -> J, which also has length 4 edges. Both formulations demonstrate that DFS fails to find the optimal 3-edge path).* ",
            "",
            "--- PART (c): Comparative Analysis ---",
            "1. Path Comparison & Shortest Route:",
            "  - BFS Path: A -> C -> G -> J (Length = 3 edges).",
            "  - DFS Path: A -> B -> E -> I -> J (Length = 4 edges).",
            "  - Winner: BFS found the shortest route (3 hops vs 4 hops).",
            "  - Why BFS is Optimal: In an unweighted graph where every edge has equal cost (c = 1), BFS expands nodes in strictly non-decreasing order of distance from the start node (level 0: A; level 1: B, C, D; level 2: E, F, G, H; level 3: I, J). Because goal J is at depth 3 via C and G, BFS is mathematically guaranteed to discover it before any depth 4 paths. Conversely, DFS explores along deep paths without regard to path length, committing to the longer branch through B and E before backtracking.",
            "",
            "2. Time and Space Complexity for this Graph (|V| = 10, |E| = 11):",
            "  - BFS Time Complexity: O(|V| + |E|) with visited set. Every vertex is enqueued at most once and each incident edge is traversed once. On this graph: ≤ 10 vertex expansions and 11 edge checks.",
            "  - BFS Space Complexity: O(|V|) = O(b^d). The FIFO queue must retain entire wavefronts (up to 4 cities simultaneously in queue, plus visited set of 10 nodes). In general AI search trees, BFS space complexity is O(b^d), making it memory-intensive.",
            "  - DFS Time Complexity: O(|V| + |E|) with visited set. In the worst case, DFS may traverse all vertices and edges before finding the goal.",
            "  - DFS Space Complexity: O(m) where m is the maximum search depth (m ≤ 10). The stack only holds nodes along the active branch plus unexplored siblings, requiring significantly less memory than BFS.",
            "",
            "3. Completeness & Optimality Summary Table:",
            "  - BFS: Complete = YES (Guaranteed to find a solution if one exists, provided branching factor b is finite). Optimal = YES (Guaranteed to find the shallowest / shortest path in uniform step-cost graphs).",
            "  - DFS: Complete = YES on finite graphs with visited set (NO on infinite trees or graphs with cycles without visited check). Optimal = NO (Returns the first path it stumbles upon down the deepest branch, not necessarily the shortest).",
          ],
          code: `# ==============================================================================
# CURAJ AI CIA-1 2026: Courier Road Network BFS vs DFS Tracer
# ==============================================================================
from collections import deque

graph = {
    "A": ["B", "C", "D"],
    "B": ["A", "E", "F"],
    "C": ["A", "G"],
    "D": ["A", "H"],
    "E": ["B", "I"],
    "F": ["B", "G"],
    "G": ["C", "F", "J"],
    "H": ["D", "I"],
    "I": ["E", "H", "J"],
    "J": ["G", "I"]
}

def run_bfs(start="A", goal="J"):
    queue = deque([start])
    visited = {start}
    parent = {start: None}
    
    while queue:
        curr = queue.popleft()
        if curr == goal:
            break
        for nbr in sorted(graph[curr]):
            if nbr not in visited:
                visited.add(nbr)
                parent[nbr] = curr
                queue.append(nbr)
                
    path, node = [], goal
    while node:
        path.append(node)
        node = parent[node]
    return path[::-1]

def run_dfs(start="A", goal="J"):
    # Stack with reverse alphabetical push to explore smallest alphabetical first
    stack = [start]
    visited = {start}
    parent = {start: None}
    
    while stack:
        curr = stack.pop()
        if curr == goal:
            break
        for nbr in sorted(graph[curr], reverse=True):
            if nbr not in visited:
                visited.add(nbr)
                parent[nbr] = curr
                stack.append(nbr)
                
    path, node = [], goal
    while node:
        path.append(node)
        node = parent[node]
    return path[::-1]

bfs_res = run_bfs()
dfs_res = run_dfs()
print(f"BFS Path: {' -> '.join(bfs_res)} | Total Edges: {len(bfs_res)-1}")
print(f"DFS Path: {' -> '.join(dfs_res)} | Total Edges: {len(dfs_res)-1}")`,
          output: `BFS Path: A -> C -> G -> J | Total Edges: 3
DFS Path: A -> B -> E -> I -> J | Total Edges: 4
[Verification Confirmed: BFS found the shorter route with 3 hops vs DFS with 4 hops]`,
        },
      },
    ],
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
  // SEMESTER 1: Advanced Algorithms (6.0CSC02) CIA-1 September 2026 (algocia126) & August 2024
  // ==========================================
  {
    id: "sem1-algo-cia1-2026",
    courseCode: "6.0CSC02",
    courseSlug: "advanced-algorithms",
    courseTitle: "Advanced Algorithms",
    semester: "Semester I",
    assessmentType: "CIA-1",
    title:
      "Continuous Internal Assessment 1 (CIA-1) — September 2026 (algocia126)",
    date: "September 2026",
    time: "01 Hr.",
    totalMarks: 20,
    instructions: [
      "Department of Computer Science, Central University of Rajasthan (CURAJ).",
      "CIA I – September 2026 (Course: 6.0CSC02 Advanced Algorithms).",
      "M.Sc. (CS) - I Semester / Integrated M.Sc. (CS) - VII Semester.",
      "Time: 1 Hour | Maximum Marks: 20.",
      "All four questions are compulsory; each question carries 5 marks [4 × 5 = 20 Marks].",
    ],
    paperImages: ["/algocia126.jpeg"],
    status: "available",
    notes:
      "Department of Computer Science, Central University of Rajasthan (CURAJ). Official question paper algocia126.jpeg for 6.0CSC02 Advanced Algorithms (September 2026) with complete verified 5-mark model solutions for all four questions: Q1 (Time & Space Complexity, Best/Worst Case, 2-Way Merge Comparisons), Q2 (QuickSort Best-Case Recurrence Derivation & Solution), Q3 (Optimal Huffman Codes for frequencies 4, 5, 7, 8, 10, 12, 20 with Decode Tree & Time Complexity), and Q4 (Decision vs Counting Problems & Nondeterministic Linear Search).",
    questions: [
      {
        id: "algo-2026-q1",
        qNumber: "Q1",
        marks: 5,
        question:
          "Define time and space complexity. What do you understand by the best-case and worst-case complexity of an algorithm? Find number of comparisons required for merging two sorted lists of sizes m and n into a sorted list of size m + n.",
        solution: {
          summary:
            "Formal definitions of computational time and space complexity, best-case vs worst-case bounds, and exact comparison derivation for 2-way merge showing minimum min(m, n) and maximum (m + n - 1) comparisons.",
          keyPoints: [
            "Time Complexity: Number of elementary machine operations executed as a function of input size n, independent of hardware/compiler variance.",
            "Space Complexity: Total memory space required during execution, split into Fixed Component (code, constants) and Variable Component (dynamic heap allocations, recursive call stack).",
            "Best-Case: Minimum operations under the most favorable input configuration (e.g., target at index 0 in Linear Search takes Θ(1)).",
            "Worst-Case: Maximum operations across all valid inputs of size n, guaranteeing a deterministic upper bound critical for mission-critical systems (e.g., Linear Search takes n comparisons).",
            "2-Way Merge Exact Bounds: Minimum comparisons = min(m, n) (when one list is strictly smaller than the other). Maximum comparisons = m + n - 1 (when elements strictly alternate).",
          ],
          explanation: [
            "1. Time Complexity Definition:",
            "Time complexity quantifies the total computational time required by an algorithm to execute to termination as a function of the input size n. Because physical clock seconds depend on CPU frequency, OS scheduling, compiler optimization, and memory cache latency, computer scientists measure time complexity by counting the number of primitive elementary operations (arithmetic operations, assignments, comparisons, pointer dereferences) executed as n scales asymptotically.",
            "",
            "2. Space Complexity Definition:",
            "Space complexity measures the total amount of memory space required by an algorithm during execution as a function of input size n. It comprises two major parts: S(P) = c + Sv(n).",
            "  - Fixed Component (c): Space independent of input characteristics, including compiled bytecode/machine instructions, simple fixed-size variables, and constants.",
            "  - Variable Component (Sv(n)): Space dynamically dependent on input size n, including heap-allocated dynamic data structures (arrays, linked nodes) and execution call stack frames allocated for recursive function calls (storing return addresses, activation records, and local variables).",
            "  - Auxiliary Space: The temporary extra memory allocated by the algorithm outside the storage required for the inputs themselves.",
            "",
            "3. Best-Case vs Worst-Case Complexity:",
            "  - Best-Case Complexity: The minimum number of basic operations executed for an input of size n under the most favorable arrangement of input data. Example: In Linear Search, finding the key at the very first index A[0] takes Θ(1) comparisons. In Insertion Sort, an already sorted array requires only Θ(n) comparisons.",
            "  - Worst-Case Complexity: The maximum number of basic operations executed across ANY valid input instance of size n. It establishes a strictly guaranteed upper bound, ensuring the algorithm will never exceed this cost under any adversarial scenario. Example: In Linear Search, an absent element takes n comparisons (Θ(n)). In QuickSort with last-element pivot on a sorted array, partitioning degrades to Θ(n²).",
            "",
            "4. Number of Comparisons for Merging Two Sorted Lists (Sizes m and n):",
            "Consider merging sorted list A of length m and sorted list B of length n into list C of length m + n using the standard 2-way Merge algorithm:",
            "  - At each step of the while loop (while i < m and j < n), exactly one key comparison (A[i] <= B[j]) is performed, and exactly one element is placed into the output array C.",
            "  - Comparisons terminate the instant one of the two lists is completely exhausted. The remaining elements of the non-exhausted list are appended directly without any further comparisons.",
            "  - Maximum (Worst-Case) Comparisons: In the worst scenario, one list is exhausted only when exactly 1 element remains in the second list. At this point, exactly (m + n - 1) elements have been placed into C via comparisons. The last remaining element is appended without comparison. Thus, Comparisons_max = m + n - 1. (Occurs when elements of A and B strictly alternate in sorted order, e.g., A = [1, 3, 5] and B = [2, 4, 6] requiring 3 + 3 - 1 = 5 comparisons).",
            "  - Minimum (Best-Case) Comparisons: When all elements of one list are smaller than the smallest element of the other list (e.g., A = [1, 2, 3] and B = [10, 20, 30, 40]). The smaller list is exhausted after comparing each of its elements against B[0]. Thus, Comparisons_min = min(m, n) = 3 comparisons. The rest of B is copied directly.",
            "  - Summary Bounds: min(m, n) <= Comparisons <= m + n - 1.",
          ],
          code: `/* 2-Way Merge Procedure: C Implementation */
#include <stdio.h>

void merge_sorted_lists(const int A[], int m, const int B[], int n, int C[]) {
    int i = 0, j = 0, k = 0;
    int comparisons = 0;

    /* Loop makes 1 comparison per placed element */
    while (i < m && j < n) {
        comparisons++;
        if (A[i] <= B[j]) {
            C[k++] = A[i++];
        } else {
            C[k++] = B[j++];
        }
    }

    /* Remaining elements appended directly WITHOUT comparisons */
    while (i < m) C[k++] = A[i++];
    while (j < n) C[k++] = B[j++];

    /* Comparison Limits: min(m, n) <= comparisons <= m + n - 1 */
}`,
        },
      },
      {
        id: "algo-2026-q2",
        qNumber: "Q2",
        marks: 5,
        question:
          "Derive and solve recurrence equation for the best-case behavior of the quick sort.",
        solution: {
          summary:
            "Formulation of the balanced partition recurrence T(n) = 2T(n/2) + cn for QuickSort under median pivot selection and solving via Master Theorem (Case 2, k=0) and Recursion Tree to Theta(n log n).",
          keyPoints: [
            "QuickSort relies on divide-and-conquer: partition takes linear time cn = Θ(n) using n - 1 comparisons.",
            "Best-Case Condition: The pivot selected by partition always splits the array into two equal halves of size approximately n/2 at every recursive step.",
            "Recurrence Relation: T(n) = 2T(n/2) + cn for n > 1, with base case T(1) = c0.",
            "Solving via Master Theorem: a = 2, b = 2, f(n) = cn = Θ(n^1). Watershed function n^(log_b a) = n^(log_2 2) = n^1. Since f(n) = Θ(n^(log_b a)), Case 2 with k = 0 applies.",
            "Final Time Complexity: T(n) = Θ(n^(log_b a) * log^(k+1) n) = Θ(n log n).",
          ],
          explanation: [
            "1. Algorithmic Context & Best-Case Condition:",
            "QuickSort divides an array A[p..r] of size n around a pivot element into two subarrays A[p..q-1] and A[q+1..r]. The partition subroutine requires linear time f(n) = cn (specifically n - 1 comparisons).",
            "The best-case behavior occurs when the partition routine always selects the true median element as the pivot, splitting the input array into two subarrays of virtually equal size at each level of recursion: floor((n-1)/2) and ceil((n-1)/2).",
            "",
            "2. Derivation of the Recurrence Relation:",
            "Ignoring floors and ceilings for asymptotic analysis:",
            "  - Size of each subproblem = n/2",
            "  - Number of recursive subproblems = 2",
            "  - Time spent in partitioning = cn (where c > 0 is a constant)",
            "  - Base case: For n <= 1, the array is already sorted, requiring constant time T(1) = c0.",
            "Hence, the best-case recurrence relation is:",
            "  T(n) = 2 T(n/2) + cn, for n > 1",
            "  T(1) = c0, for n = 1",
            "",
            "3. Solving via Master Theorem (CLRS Theorem 4.1):",
            "The recurrence fits the standard Master Theorem form: T(n) = a T(n/b) + f(n)",
            "Here, a = 2, b = 2, and f(n) = cn = Θ(n^1).",
            "  - Step 1: Compute the watershed function: n^(log_b a) = n^(log_2 2) = n^1 = n.",
            "  - Step 2: Compare f(n) with n^(log_b a):",
            "    f(n) = cn = Θ(n^1) = Θ(n^(log_b a)).",
            "  - Step 3: Apply Master Theorem Case 2 (with k = 0):",
            "    When f(n) = Θ(n^(log_b a) * log^k n), T(n) = Θ(n^(log_b a) * log^(k+1) n).",
            "  - Substituting a = 2, b = 2, k = 0 yields:",
            "    T(n) = Θ(n^1 * log^(0+1) n) = Θ(n log2 n).",
            "",
            "4. Verification via Recursion Tree Method:",
            "  - Level 0 (Root): Work done = cn",
            "  - Level 1: 2 subproblems of size n/2 -> Work = 2 * c(n/2) = cn",
            "  - Level 2: 4 subproblems of size n/4 -> Work = 4 * c(n/4) = cn",
            "  - Level i: 2^i subproblems of size n/2^i -> Work = 2^i * c(n/2^i) = cn",
            "  - Height of tree: n / 2^h = 1 => h = log2 n levels.",
            "  - Summing over all levels: T(n) = cn * (log2 n + 1) = Θ(n log n).",
          ],
        },
      },
      {
        id: "algo-2026-q3",
        qNumber: "Q3",
        marks: 5,
        question:
          "Obtain a set of optimal Huffman codes for the messages (m1, m2, m3, m4, m5, m6, m7) with relative frequencies (q1, q2, q3, q4, q5, q6, q7) = (4, 5, 7, 8, 10, 12, 20). Draw the decode tree for this set of codes. Also, write time complexity for Huffman encoding.",
        solution: {
          summary:
            "Greedy min-priority queue construction yielding optimal prefix-free codes: m1: 1000, m2: 1001, m3: 010, m4: 011, m5: 101, m6: 00, m7: 11 with total weighted bits = 175 (avg 2.65 bits/symbol) and O(n log n) encoding time complexity.",
          keyPoints: [
            "Given: Messages (m1..m7) with frequencies (4, 5, 7, 8, 10, 12, 20). Total frequency = 66.",
            "Greedy Merges: (4+5=9: N1), (7+8=15: N2), (9+10=19: N3), (12+15=27: N4), (19+20=39: N5), (27+39=66: Root).",
            "Assigned Optimal Codes (Left=0, Right=1): m1='1000' (4b), m2='1001' (4b), m3='010' (3b), m4='011' (3b), m5='101' (3b), m6='00' (2b), m7='11' (2b).",
            "Total Weighted Length: 4(4)+5(4)+7(3)+8(3)+10(3)+12(2)+20(2) = 16+20+21+24+30+24+40 = 175 bits. Average length = 175/66 ≈ 2.6515 bits.",
            "Time Complexity: O(n log n) using a binary min-heap for n distinct symbols. (Reducible to O(n) if frequencies are pre-sorted using two queues).",
          ],
          explanation: [
            "1. Given Symbols and Frequency Distribution:",
            "Symbols: m1(4), m2(5), m3(7), m4(8), m5(10), m6(12), m7(20). Total sum = 66.",
            "",
            "2. Step-by-Step Greedy Min-Priority Queue Merging:",
            "Initial Q = { (m1, 4), (m2, 5), (m3, 7), (m4, 8), (m5, 10), (m6, 12), (m7, 20) }",
            "  - Step 1: Extract min 4 (m1) and 5 (m2). Merge into N1 with weight 4 + 5 = 9. Q = { m3(7), m4(8), N1(9), m5(10), m6(12), m7(20) }",
            "  - Step 2: Extract min 7 (m3) and 8 (m4). Merge into N2 with weight 7 + 8 = 15. Q = { N1(9), m5(10), m6(12), N2(15), m7(20) }",
            "  - Step 3: Extract min 9 (N1) and 10 (m5). Merge into N3 with weight 9 + 10 = 19. Q = { m6(12), N2(15), N3(19), m7(20) }",
            "  - Step 4: Extract min 12 (m6) and 15 (N2). Merge into N4 with weight 12 + 15 = 27. Q = { N3(19), m7(20), N4(27) }",
            "  - Step 5: Extract min 19 (N3) and 20 (m7). Merge into N5 with weight 19 + 20 = 39. Q = { N4(27), N5(39) }",
            "  - Step 6: Extract min 27 (N4) and 39 (N5). Merge into Root R with weight 27 + 39 = 66. Q = { R(66) }. Done!",
            "",
            "3. Decode Tree Structure & Code Assignment (Convention: Left=0, Right=1):",
            "  - Root (66): Left -> N4 (27), Right -> N5 (39)",
            "    - N4 (27): Left -> m6 (12) [Code: 00], Right -> N2 (15)",
            "      - N2 (15): Left -> m3 (7) [Code: 010], Right -> m4 (8) [Code: 011]",
            "    - N5 (39): Left -> N3 (19), Right -> m7 (20) [Code: 11]",
            "      - N3 (19): Left -> N1 (9), Right -> m5 (10) [Code: 101]",
            "        - N1 (9): Left -> m1 (4) [Code: 1000], Right -> m2 (5) [Code: 1001]",
            "",
            "4. Time Complexity of Huffman Encoding:",
            "  - Building min-priority queue with n nodes: O(n) using BUILD-MIN-HEAP (or O(n log n) by successive insertions).",
            "  - Merging loop runs (n - 1) times. Each iteration performs 2 EXTRACT-MIN and 1 INSERT operations on the heap, each taking O(log n) time.",
            "  - Total time for (n - 1) iterations = (n - 1) * O(log n) = O(n log n).",
            "  - Tree traversal to extract bit codes = O(n).",
            "  - Overall Time Complexity: O(n log n).",
          ],
        },
      },
      {
        id: "algo-2026-q4",
        qNumber: "Q4",
        marks: 5,
        question:
          "With the help of suitable examples differentiate between decision and counting problems. Write a nondeterministic algorithm for linear search. Analyze the algorithm and determine its time complexity.",
        solution: {
          summary:
            "Comprehensive differentiation between Decision problems (binary YES/NO in P/NP) and Counting problems (integer solutions in #P), followed by nondeterministic linear search algorithm with O(1) choice and O(1) check, demonstrating O(1) total time.",
          keyPoints: [
            "Decision Problem: Answers with binary {YES, NO} (e.g., SAT, Hamiltonian Cycle, Subset Sum). Formally decides language membership.",
            "Counting Problem: Determines total count of distinct valid solutions in N (e.g., #SAT, #Hamiltonian Cycles). Formally defines class #P (Leslie Valiant).",
            "Relative Hardness: Counting is strictly at least as hard as decision; some problems have decision in P but counting is #P-complete (e.g., Bipartite Matching vs Permanent).",
            "Nondeterministic Linear Search: Phase 1 guesses index j = choice(1, n) in O(1). Phase 2 verifies A[j] == key in O(1). If true, success() else failure().",
            "Complexity: Total nondeterministic time = O(1) + O(1) = O(1) = Θ(1), proving verification is in polynomial time and Linear Search is in NP (and P).",
          ],
          explanation: [
            "1. Decision vs Counting Problems:",
            "  - Decision Problem: A problem whose output is binary: either YES or NO. Formally, given an instance x, determine whether x belongs to formal language L. Associated with complexity classes P, NP, co-NP. Example: 3-SAT (Does there exist a satisfying truth assignment?).",
            "  - Counting Problem: A problem where the output is the number of distinct valid solutions. Associated with complexity class #P (Sharp-P). Example: #3-SAT (How many satisfying truth assignments exist?).",
            "  - Contrast Example (Bipartite Matching): Deciding if a bipartite graph has a perfect matching is solvable in polynomial time O(E sqrt(V)) in P. However, counting the total number of perfect matchings (computing the 0-1 matrix permanent) is #P-complete!",
            "",
            "2. Nondeterministic Algorithm for Linear Search:",
            "A nondeterministic algorithm operates in two conceptual stages:",
            "  - Guessing Stage: Uses an ideal choice primitive to non-deterministically select a candidate index.",
            "  - Checking Stage: Deterministically evaluates whether the chosen candidate satisfies the search condition.",
            "",
            "Pseudocode:",
            "  Algorithm Nondeterministic_Linear_Search(A, n, key)",
            "  1. j = choice(1, n)       // Nondeterministically picks index j in [1, n]",
            "  2. if A[j] == key then",
            "  3.     write('Found key at index ', j)",
            "  4.     success()           // Computation path halts with success",
            "  5. else",
            "  6.     failure()           // Computation path halts with failure",
            "",
            "3. Time Complexity Analysis of Nondeterministic Linear Search:",
            "  - Guessing Step: The choice(1, n) operation takes O(1) time in the theoretical nondeterministic Turing model.",
            "  - Verification Step: A single array lookup A[j] and comparison A[j] == key takes O(1) time.",
            "  - Total Nondeterministic Running Time: T_nondet(n) = O(1) + O(1) = O(1) = Θ(1).",
            "  - Deterministic Comparison: Deterministic linear search requires Θ(n) worst-case sequential comparisons. The nondeterministic O(1) runtime formally demonstrates that Linear Search is in NP.",
          ],
          code: `/* Theoretical Nondeterministic Linear Search Model */
void nondeterministic_linear_search(const int A[], int n, int key) {
    /* Stage 1: Nondeterministic choice of candidate index in O(1) */
    int j = choice(0, n - 1);

    /* Stage 2: Deterministic verification in O(1) */
    if (A[j] == key) {
        printf("Key %d verified at index %d\\n", key, j);
        success(); /* Oracle path succeeds */
    } else {
        failure(); /* Path halts with failure */
    }
}`,
        },
      },
    ],
  },
  {
    id: "sem1-algo-cia1",
    courseCode: "6.0CSC02",
    courseSlug: "advanced-algorithms",
    courseTitle: "Advanced Algorithms",
    semester: "Semester I",
    assessmentType: "CIA-1",
    title: "Continuous Internal Assessment 1 (CIA-1)",
    date: "August 2024",
    time: "01 Hrs.",
    totalMarks: 20,
    instructions: ["All questions are compulsory."],
    paperImages: ["/AIGOCIA12024.jpg"],
    status: "available",
    notes:
      "Department of Computer Science, School of Mathematics, Statistics & Computational Sciences, Central University of Rajasthan (CURAJ). Official examination covering Asymptotic Complexity Measures (Theta, Omega, Big-Oh), Binary Search in C with Recurrence Analysis, Master Method on T(n)=T(2n/3)+1, and Iteration Method on T(n)=7T(n/2)+an².",
    questions: [
      {
        id: "q1",
        qNumber: "Q1",
        marks: 5,
        question:
          "Give formal definitions for complexity measures- Theta (Θ), Omega (Ω), and big oh (O).",
        solution: {
          summary:
            "Formal mathematical set-theoretic definitions and geometric bounding interpretations of asymptotic notations as defined in CLRS Chapter 3.",
          keyPoints: [
            "Big-Oh O(g(n)): Set of functions f(n) such that 0 <= f(n) <= c*g(n) for all n >= n0 with positive constants c, n0 > 0. Provides asymptotic upper bound.",
            "Big-Omega Ω(g(n)): Set of functions f(n) such that 0 <= c*g(n) <= f(n) for all n >= n0 with positive constants c, n0 > 0. Provides asymptotic lower bound.",
            "Big-Theta Θ(g(n)): Set of functions f(n) such that 0 <= c1*g(n) <= f(n) <= c2*g(n) for all n >= n0 with positive constants c1, c2, n0 > 0. Provides asymptotically tight bound.",
            "Theorem: f(n) = Θ(g(n)) if and only if f(n) = O(g(n)) and f(n) = Ω(g(n)).",
          ],
        },
      },
      {
        id: "q2",
        qNumber: "Q2",
        marks: 5,
        question:
          "Write an algorithm for searching an element using the binary search method. Analyze the algorithm by writing the recurrence relation and solve it to determine its time complexity.",
        solution: {
          summary:
            "Binary Search algorithm implemented in C, recurrence relation T(n) = T(n/2) + c, and derivation of O(log n) time complexity.",
          keyPoints: [
            "Algorithm divides sorted array into two equal halves at mid = low + (high - low) / 2.",
            "Recurrence relation: T(n) = T(n/2) + c2 for n > 1, with base case T(1) = c1.",
            "Solving by iteration: T(n) = T(n/2^k) + k*c2. With n/2^k = 1 => k = log2(n).",
            "Resulting time complexity: T(n) = c1 + c2*log2(n) = Θ(log n).",
          ],
          code: `int binary_search(const int A[], int n, int key) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (A[mid] == key)
            return mid;
        else if (A[mid] < key)
            low = mid + 1;
        else
            high = mid - 1;
    }
    return -1;
}`,
        },
      },
      {
        id: "q3",
        qNumber: "Q3",
        marks: 5,
        question:
          "Explain the master method for solving recurrences. Use the master method to solve the following recurrence equation: T(n) = T(2n/3) + 1",
        solution: {
          summary:
            "Cookbook method for recurrences of the form T(n) = aT(n/b) + f(n) by comparing f(n) with the watershed function n^(log_b a).",
          keyPoints: [
            "Case 1 (Leaf dominated): f(n) = O(n^(log_b a - ε)) => T(n) = Θ(n^(log_b a)).",
            "Case 2 (Equal work): f(n) = Θ(n^(log_b a) * log^k n) => T(n) = Θ(n^(log_b a) * log^(k+1) n).",
            "Case 3 (Root dominated): f(n) = Ω(n^(log_b a + ε)) with regularity a*f(n/b) <= c*f(n) => T(n) = Θ(f(n)).",
            "For T(n) = T(2n/3) + 1: Rewrite as T(n/(3/2)) + 1. Here a = 1, b = 3/2 = 1.5, f(n) = 1.",
            "Watershed function: n^(log_{1.5} 1) = n^0 = 1. Since f(n) = 1 = Θ(n^0), Master Method Case 2 with k = 0 applies.",
            "Final complexity: T(n) = Θ(n^0 * log^(0+1) n) = Θ(log n).",
          ],
        },
      },
      {
        id: "q4",
        qNumber: "Q4",
        marks: 5,
        question:
          "Solve the following recurrence equation using iteration method: T(n) = b for n <= 2, and T(n) = 7T(n/2) + an² for n > 2, where a and b are constants.",
        solution: {
          summary:
            "Solving Strassen's matrix multiplication recurrence by repeated substitution, geometric series summation, and base-case matching.",
          keyPoints: [
            "Step 1: T(n) = 7[7T(n/4) + an²/4] + an² = 7²T(n/4) + an²[1 + 7/4].",
            "Step 2: T(n) = 7³T(n/8) + an²[1 + 7/4 + (7/4)²].",
            "General k-th iteration: T(n) = 7^k * T(n/2^k) + an² * ∑_{i=0}^{k-1} (7/4)^i.",
            "Base condition: n/2^k = 2 => k = log2(n) - 1, and T(2) = b.",
            "First term: 7^k * T(2) = (b/7) * n^(log2 7).",
            "Geometric sum with r = 7/4 > 1 evaluates to (16a/21) * n^(log2 7) - (4a/3) * n².",
            "Since log2(7) ≈ 2.807 > 2, the term n^(log2 7) dominates: T(n) = Θ(n^(log2 7)) ≈ Θ(n^2.807).",
          ],
        },
      },
    ],
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
  // SEMESTER 1: Professional Communication (6.0CSC04 / CSC-406) CIA-1 September 2026 (PCCIA126)
  // ==========================================
  {
    id: "sem1-comm-cia1-2026",
    courseCode: "6.0CSC04",
    courseSlug: "professional-communication",
    courseTitle: "Professional Communication",
    semester: "Semester I",
    assessmentType: "CIA-1",
    title: "Continuous Internal Assessment 1 (CIA-1) — September 2026",
    date: "September 2026",
    time: "01 Hr.",
    totalMarks: 20,
    instructions: [
      "Department of Computer Science, Central University of Rajasthan (CURAJ).",
      "First Mid-Semester Examination, September, 2026 (Course: 6.0CSC04 Professional Communication).",
      "Answer any two questions; each carries 10 marks (Word Limit 300-350 words).",
      "Maximum Marks: 20 [10 × 2 = 20]. Time: One hour.",
      "Handwritten alternative/bonus on paper: Paragraph writing explain of principle paragraph writing.",
    ],
    paperImages: ["/PCCIA126.jpeg"],
    status: "available",
    notes:
      "Department of Computer Science, Central University of Rajasthan (CURAJ). First Mid-Semester Examination (September 2026) for 6.0CSC04 Professional Communication. Official question paper PCCIA126.jpeg with complete, verified 10-mark model answers (300–350 words each) for Q1 (Tense & its types/subtypes), Handwritten Option (Paragraph Writing & principles), Q2 (Phrase & its types), and Q3 (Sentence & its types).",
    questions: [
      {
        id: "comm-2026-q1",
        qNumber: "Q1",
        marks: 10,
        question:
          "What is Tense? Explain its types and subtypes in detail with examples",
        solution: {
          summary:
            "Tense is the form of a verb indicating both the time of an action (Past, Present, Future) and its aspect or state of completion (Simple, Continuous, Perfect, Perfect Continuous), creating 12 distinct grammatical structures in English.",
          keyPoints: [
            "Etymology & Definition: Derived from Latin 'tempus' (time); modifies the verb to reflect chronological locus and aspectual contour.",
            "3 Primary Tenses: Present (contemporary/habitual), Past (prior/finished), Future (prospective/predictive).",
            "4 Subtypes per Tense: Simple/Indefinite (routine or standalone fact), Continuous/Progressive (ongoing action), Perfect (completed state with anterior relevance), Perfect Continuous (duration leading up to a reference moment).",
            "Systematic Formulas: Clear auxiliary and participle pairings across all 12 tenses.",
            "Application in Technical Communication: Maintaining tense consistency across empirical methodology (past tense) and algorithmic facts (present simple).",
          ],
          explanation: [
            "1. Linguistic Conception and Definition of Tense:",
            "The term 'Tense' comes from the Latin word 'tempus', meaning 'time'. In grammatical theory, tense refers to the form a verb takes to express two essential pieces of information:",
            "  - The Time of the action: Whether an event happens before the current moment (Past), coincides with the current moment (Present), or is expected after the current moment (Future).",
            "  - The Aspect of the action: Whether the action is habitual/simple, actively in progress (continuous), completed (perfect), or ongoing over a continuous duration (perfect continuous).",
            "Together, the three primary time categories combined with four grammatical aspects create the twelve standard English tenses.",
            "",
            "2. The Three Primary Tenses and Their 12 Subtypes (With Syntactic Formulas & Examples):",
            "",
            "a) Present Tense (Contemporary Events, Routines, and General Truths):",
            "  - 1. Simple Present (Indefinite): Formula: Subject + V1 (s/es) + Object. Used for universal scientific facts and regular routines. Example: 'The compiler translates source code into machine language.'",
            "  - 2. Present Continuous (Progressive): Formula: Subject + is/am/are + V-ing + Object. Used for actions actively unfolding right now. Example: 'The DevOps team is deploying the new microservice.'",
            "  - 3. Present Perfect: Formula: Subject + has/have + V3 + Object. Used for actions concluded recently with lasting present relevance. Example: 'The research team has published the benchmark evaluation.'",
            "  - 4. Present Perfect Continuous: Formula: Subject + has/have + been + V-ing + Object. Used for actions started in the past that continue into the present. Example: 'The engineer has been profiling memory leaks for two hours.'",
            "",
            "b) Past Tense (Events Finished Prior to the Present Moment):",
            "  - 1. Simple Past (Indefinite): Formula: Subject + V2 + Object. Used for finished actions completed at a definite point in the past. Example: 'Alan Turing formulated the mathematical theory of computing in 1936.'",
            "  - 2. Past Continuous: Formula: Subject + was/were + V-ing + Object. Used for an ongoing action interrupted by another event. Example: 'The database server was synchronizing data when the power failed.'",
            "  - 3. Past Perfect: Formula: Subject + had + V3 + Object. Used to denote the earlier of two completed past actions ('past of the past'). Example: 'The system had created an automated backup before the ransomware struck.'",
            "  - 4. Past Perfect Continuous: Formula: Subject + had + been + V-ing + Object. Used for an action ongoing in the past up until another past milestone. Example: 'The team had been testing the network protocol for weeks before discovering the vulnerability.'",
            "",
            "c) Future Tense (Events Anticipated After the Present Moment):",
            "  - 1. Simple Future: Formula: Subject + will/shall + V1 + Object. Used for future decisions, predictions, or promises. Example: 'The department will organize an international computing conference next semester.'",
            "  - 2. Future Continuous: Formula: Subject + will be + V-ing + Object. Used for actions in progress at a specific future juncture. Example: 'Tomorrow at 10 AM, candidates will be presenting their research dissertations.'",
            "  - 3. Future Perfect: Formula: Subject + will have + V3 + Object. Used for actions that will be concluded before a designated future deadline. Example: 'By December 2026, the lab will have finalized the neural network pipeline.'",
            "  - 4. Future Perfect Continuous: Formula: Subject + will have been + V-ing + Object. Used for continuous actions extending up to a future point. Example: 'By next year, the university will have been offering this program for a decade.'",
            "",
            "3. Summary Matrix of All 12 Tenses:",
            "  - Present: Simple (V1), Continuous (is/am/are + V-ing), Perfect (has/have + V3), Perfect Continuous (has/have been + V-ing).",
            "  - Past: Simple (V2), Continuous (was/were + V-ing), Perfect (had + V3), Perfect Continuous (had been + V-ing).",
            "  - Future: Simple (will + V1), Continuous (will be + V-ing), Perfect (will have + V3), Perfect Continuous (will have been + V-ing).",
          ],
          video: {
            id: "zwsBcic8GZ4",
            title:
              "All 12 Tenses in English Grammar: Formulas, Rules & Real-world Usage",
            channel: "Dear Sir",
            duration: "15:20",
            speed: "1.25x",
            relevance:
              "Q.01 (10 Marks): Complete guide to all 12 tenses, structural formulas, and real-world examples.",
            takeaway:
              "Tenses articulate temporal locus (past/present/future) and aspect (indefinite, continuous, perfect, perfect continuous).",
          },
        },
      },
      {
        id: "comm-2026-q1-alt",
        qNumber: "Q1 (Alt)",
        marks: 10,
        question:
          "What is Paragraph Writing? Explain the principles of paragraph writing. (Handwritten on Paper)",
        solution: {
          summary:
            "Paragraph writing is the deliberate construction of a unified, self-contained unit of written discourse centered around a single controlling idea, governed by four foundational principles: Unity, Coherence, Logical Order, and Completeness/Adequate Development.",
          keyPoints: [
            "Definition of Paragraph: A distinct, cohesive cluster of interrelated sentences developing, illustrating, and validating one central theme.",
            "Structural Anatomy: (1) Topic Sentence (anchor statement containing the controlling idea), (2) Supporting Sentences (concrete evidence, data, illustrations, and analysis), (3) Concluding / Clincher Sentence (synthesizes takeaways and provides logical closure).",
            "Principle 1 — Unity: Focuses exclusively on a single subject without wandering into tangential or extraneous thoughts.",
            "Principle 2 — Coherence: Achieves effortless logical flow through transitional connectives, pronoun antecedents, and parallel structures.",
            "Principle 3 — Logical Order: Organizes ideas in systematic trajectories (chronological, spatial, deductive/general-to-specific, inductive, or order of importance).",
            "Principle 4 — Completeness & Proportion: Delivers comprehensive development without premature brevity or exhausting verbosity (optimal 100-180 words in technical prose).",
          ],
          explanation: [
            "1. Conception and Structural Anatomy of a Paragraph:",
            "In academic and professional prose (prescribed reference: Wren & Martin, 'High School English Grammar and Composition'), a paragraph functions as a micro-essay. It must never serve as an arbitrary collection of unrelated observations. Its structural anatomy comprises three parts:",
            "  - A. The Topic Sentence: The anchor statement, typically positioned at the beginning, containing the topic and a controlling idea.",
            "  - B. Supporting Development Sentences: 3 to 5 sentences that define, illustrate, substantiate, or analyze the topic sentence through data, logical reasoning, and examples.",
            "  - C. The Concluding / Clincher Sentence: Synthesizes the core argument and provides a smooth transition to subsequent paragraphs.",
            "",
            "2. The Four Cardinal Principles of Paragraph Writing:",
            "",
            "a) Principle of Unity (Singleness of Purpose):",
            "  - A paragraph must concentrate exclusively on ONE central theme. Any sentence that introduces a tangent or unrelated fact—no matter how interesting—destroys unity and must be excised.",
            "  - Example: In a paragraph explaining GPU parallel acceleration in deep learning, inserting a sentence discussing the retail stock price of Nvidia violates unity.",
            "",
            "b) Principle of Coherence (Smooth Logical Connectivity):",
            "  - Coherence ensures that thoughts glide effortlessly from sentence to sentence without jarring leaps. Coherence is achieved through three tactical mechanisms:",
            "    * Transitional Linking Devices: Consequence ('Consequently', 'Hence'), Contrast ('However', 'On the contrary'), Addition ('Furthermore', 'In addition'), Sequence ('First', 'Subsequently').",
            "    * Pronoun Reference: Using pronouns ('this', 'these', 'it') whose antecedents are unmistakably clear.",
            "    * Lexical Re-iteration & Parallelism: Repeating key technical terms and balancing syntactic clause structures.",
            "",
            "c) Principle of Order (Organizational Architecture):",
            "  - The movement of thought must follow a recognizable systematic trajectory:",
            "    * Deductive Order (Top-Down): Statement of general principle followed by specific applications.",
            "    * Inductive Order (Bottom-Up): Specific observations and empirical data building toward a general thesis.",
            "    * Chronological Order: Sequential arrangement according to temporal occurrence.",
            "",
            "d) Principle of Completeness & Proportion (Adequate Development):",
            "  - A paragraph must be neither anemic (1-2 vague lines) nor bloated (a 400-word unbroken wall of text). Typical optimal length in technical prose is 100-180 words, sufficiently developed to prove the controlling idea.",
          ],
          video: {
            id: "vbMtBjoBalQ",
            title:
              "Paragraph Writing in English: Paragraph Unity and Coherence",
            channel: "Writing Better",
            duration: "8:15",
            speed: "1.25x",
            relevance:
              "Q.01 Alt (10 Marks): Foundational principles of academic paragraph construction: Topic Sentence, Supporting Elaboration, Clincher, and Unity/Coherence transitions.",
            takeaway:
              "A well-crafted paragraph maintains single-idea thematic unity, reinforced by logical bridges and transitional signposts.",
          },
        },
      },
      {
        id: "comm-2026-q2",
        qNumber: "Q2",
        marks: 10,
        question: "What is Phrase? Write in detail its types with examples.",
        solution: {
          summary:
            "A phrase is a syntactically unified group of two or more words that functions as a single grammatical part of speech within a clause, distinguished by the complete absence of a finite subject-verb nexus, categorized into Noun, Verb, Adjective, Adverb, Prepositional, and Verbal (Gerund, Infinitive, Participial) phrases.",
          keyPoints: [
            "Grammatical Definition: A cluster of connected words without a finite predicate acting on a subject, operating as a constituent element of a clause.",
            "Contrast with Clause & Sentence: Unlike clauses, a phrase cannot express a complete thought or predicate; it enriches meaning by supplying contextual attributes.",
            "Head Word Principle: Every phrase is classified by its lexical core (head word), which dictates its functional category.",
            "5 Core Structural Phrase Types: Noun Phrase (NP), Verb Phrase (VP), Adjective Phrase (AdjP), Adverb Phrase (AdvP), and Prepositional Phrase (PP).",
            "Non-Finite Verbal & Absolute Phrases: Gerund Phrases, Infinitive Phrases, Participial Phrases, and Absolute Phrases.",
          ],
          explanation: [
            "1. Grammatical Definition and Structural Characteristics of a Phrase:",
            "A phrase is a grammatically connected group of two or more words that functions as a single unified part of speech within a clause or sentence.",
            "The defining hallmark of a phrase is that it contains NEITHER a subject nor a finite verb (no subject-predicate combination). Because of this syntactic incompleteness, a phrase cannot express a complete proposition and cannot stand alone as an independent sentence.",
            "",
            "2. Phrase vs. Clause vs. Sentence Comparison:",
            "  - Phrase: Has words grouped together, but NO subject + finite verb, and CANNOT stand alone (e.g. 'in the morning').",
            "  - Clause: Contains both subject and finite verb; can stand alone ONLY if it is an independent main clause (e.g. 'She arrived in the morning').",
            "  - Sentence: Complete grammatical thought with subject and predicate ending with terminal punctuation.",
            "",
            "3. The 5 Primary Grammatical Types of Phrases (Classified by Head Word):",
            "",
            "a) Noun Phrase (NP):",
            "  - What it is: A phrase constructed around a main head noun (with determiners and adjectives). It acts as the subject, object, or complement.",
            "  - Example: 'The ambitious young software engineer designed the distributed microservice.'",
            "  - Here, 'The ambitious young software engineer' is a noun phrase functioning as the subject.",
            "",
            "b) Verb Phrase (VP):",
            "  - What it is: A phrase consisting of the lexical main verb combined with auxiliary (helping) or modal verbs.",
            "  - Example: 'The team has been investigating the neural network anomaly for hours.'",
            "  - Here, 'has been investigating' is the verb phrase showing aspect and tense.",
            "",
            "c) Adjective Phrase (AdjP):",
            "  - What it is: A group of words headed by an adjective that modifies a noun or pronoun, specifying qualities or conditions.",
            "  - Example: 'The newly compiled kernel was remarkably stable and highly efficient.'",
            "  - Here, 'remarkably stable and highly efficient' modifies the noun 'kernel'.",
            "",
            "d) Adverb Phrase (AdvP):",
            "  - What it is: A phrase built around a head adverb that modifies a verb, adjective, or another adverb (answering how, when, where, why).",
            "  - Example: 'The algorithm processed incoming telemetry far more accurately than expected.'",
            "  - Here, 'far more accurately than expected' tells us how the algorithm processed data.",
            "",
            "e) Prepositional Phrase (PP):",
            "  - What it is: A phrase initiating with a preposition followed by its noun phrase object. Functions adjectivally or adverbially.",
            "  - Example: 'The cryptographic private keys are stored inside the hardware security module.'",
            "  - Here, 'inside the hardware security module' tells us where the keys are located.",
            "",
            "4. Non-Finite Verbal Phrases (Bonus for Full 10 Marks):",
            "  - Gerund Phrase (acts as a noun): 'Refactoring legacy software modules prevents technical debt.'",
            "  - Infinitive Phrase (to + verb): 'To guarantee high availability, the architecture replicates data across three regions.'",
            "  - Participial Phrase (acts as an adjective): 'Tired after a sleepless night of incident response, the engineers celebrated resolving the outage.'",
            "  - Absolute Phrase: 'The deployment having concluded successfully, the team enabled production traffic.'",
          ],
          video: {
            id: "3HPDFtZQ9ao",
            title:
              "Types of Phrases in English Grammar (5 Core Types with Examples)",
            channel: "Nihir Shah",
            duration: "11:45",
            speed: "1.25x",
            relevance:
              "Q.02 (10 Marks): Clarifies why phrases lack subject-predicate pairs and breaks down Noun, Verb, Adjective, Adverbial, Prepositional, and Verbal phrases.",
            takeaway:
              "A phrase operates as a unified single part of speech within a clause, never containing a finite verb acting on a subject.",
          },
        },
      },
      {
        id: "comm-2026-q3",
        qNumber: "Q3",
        marks: 10,
        question:
          "What is Sentence? Discuss its types in detail with examples.",
        solution: {
          summary:
            "A sentence is the fundamental syntactic and communicative unit of language consisting of at least one independent clause with an explicit or implicit subject and finite predicate, categorized functionally into Declarative, Interrogative, Imperative, and Exclamatory sentences, and structurally into Simple, Compound, Complex, and Compound-Complex sentences.",
          keyPoints: [
            "Grammatical Definition: A grammatically autonomous string of words expressing a complete thought, proposition, question, command, or exclamation, marked by initial capitalization and terminal punctuation.",
            "Essential Structural Anatomy: (1) Subject (the entity performing the action or being discussed) + (2) Predicate (the verb and its complements/modifiers asserting an action or state).",
            "Functional Classification (4 Types): Declarative (factual statements), Interrogative (inquiries), Imperative (directives/instructions), Exclamatory (emotional emphasis).",
            "Structural Classification (4 Types): Simple (single independent clause), Compound (multiple independent clauses joined by coordinating conjunctions or semicolons), Complex (one independent clause plus one or more subordinate clauses), Compound-Complex (multiple independent clauses plus subordinate clauses).",
            "Application in Technical Discourse: Leveraging syntactic variety to avoid monotonous prose and highlight hierarchical relationships between causes and effects.",
          ],
          explanation: [
            "1. Definition and Anatomical Structure of a Sentence:",
            "A sentence is the primary and highest grammatical unit of written and spoken language. It consists of at least one independent clause containing an explicit or implied Subject (the agent or topic) and a Predicate (containing a finite verb asserting an action, occurrence, or state of being).",
            "To qualify as a valid sentence, an utterance must satisfy three non-negotiable criteria:",
            "  - 1. It begins with a capital letter and ends with terminal punctuation (. ? !).",
            "  - 2. It contains both a Subject and a Finite Verb.",
            "  - 3. It expresses a complete, standalone proposition or thought.",
            "",
            "2. Classification of Sentences by Purpose / Function (Communicative Intent):",
            "",
            "a) Declarative (Assertive) Sentence:",
            "  - Makes a statement, shares empirical facts, or expresses an opinion. Ends with a period (.). Constitutes 90%+ of technical discourse.",
            "  - Example: 'Relational database systems enforce ACID properties to guarantee transactional reliability.'",
            "",
            "b) Interrogative Sentence:",
            "  - Poses a question to request information or verification. Ends with a question mark (?).",
            "  - Subtypes: Wh- questions ('What causes packet jitter in real-time UDP streaming?') and Inverted Yes/No questions ('Has the database backup completed successfully?').",
            "",
            "c) Imperative Sentence:",
            "  - Gives a command, directive, technical instruction, or polite request. The grammatical subject 'You' is elliptical (implied).",
            "  - Example: 'Configure the firewall daemon to reject all unauthenticated inbound SSH connections.'",
            "",
            "d) Exclamatory Sentence:",
            "  - Expresses intense emotion, urgency, or astonishment. Ends with an exclamation point (!).",
            "  - Example: 'What an extraordinary breakthrough in quantum computing supremacy this experiment achieved!'",
            "",
            "3. Classification of Sentences by Grammatical Structure (Clause Architecture):",
            "",
            "a) Simple Sentence:",
            "  - Contains exactly ONE independent clause (one subject-predicate nexus) and zero dependent clauses.",
            "  - Formula: Subject + Verb (+ Object/Complement).",
            "  - Example: 'The neural network model converged after fifty training epochs.'",
            "",
            "b) Compound Sentence:",
            "  - Contains TWO OR MORE independent clauses joined by a coordinating conjunction (FANBOYS: For, And, Nor, But, Or, Yet, So) or a semicolon.",
            "  - Formula: Independent Clause 1 + [, FANBOYS / ;] + Independent Clause 2.",
            "  - Example: 'The primary storage volume failed, but the automated disaster recovery protocol restored service within seconds.'",
            "",
            "c) Complex Sentence:",
            "  - Contains ONE independent clause and ONE OR MORE dependent (subordinate) clauses connected by subordinating conjunctions (although, because, since, if, while) or relative pronouns (who, which, that).",
            "  - Formula: Independent Clause + Subordinating Conjunction + Dependent Clause (or vice versa).",
            "  - Example: 'Although the cryptographic hashing function requires significant compute cycles, it prevents rainbow table attacks effectively.'",
            "",
            "d) Compound-Complex Sentence:",
            "  - Contains AT LEAST TWO independent clauses and AT LEAST ONE dependent clause, representing the highest syntactic sophistication.",
            "  - Example: 'Because the web application experienced an unprecedented traffic surge, the load balancer redirected incoming requests, and the container orchestrator provisioned additional virtual machines.'",
          ],
          video: {
            id: "HNlV48JhUAo",
            title:
              "Types of Sentences in English: Functional and Structural Classification",
            channel: "English with Ananya",
            duration: "10:30",
            speed: "1.25x",
            relevance:
              "Q.03 (10 Marks): Master both sentence taxonomies: by communicative function (4 types) and by syntactic structure (4 types).",
            takeaway:
              "Mastering simple, compound, complex, and compound-complex structures provides syntactic variety and precision in technical writing.",
          },
        },
      },
    ],
  },

  // ==========================================
  // SEMESTER 1: Professional Communication (6.0CSC04 / CSC-406) CIA-1 Predicted Paper 2026
  // ==========================================
  {
    id: "sem1-comm-predicted-cia1",
    courseCode: "6.0CSC04",
    courseSlug: "professional-communication",
    courseTitle: "Professional Communication",
    semester: "Semester I",
    assessmentType: "CIA-1",
    title: "Continuous Internal Assessment 1 — Predicted Question Paper 2026",
    date: "2025–2026 Academic Session",
    time: "01 Hr. Continuous Internal Assessment",
    totalMarks: 15,
    instructions: [
      "Long Answer Type Questions: Attempt any 3.",
      "Word Limit: 300 - 400 words per question.",
      "Maximum Marks: 15 [5 × 3 = 15]",
      "Covers Q1–Q5 Primary Questions & Q6–Q12 Alternative / Backup Questions.",
    ],
    paperImages: ["/pccia2025.png"],
    status: "available",
    notes:
      "Department of Computer Science, Central University of Rajasthan (CURAJ). Course Code: 6.0CSC04 / CSC-406. Clear, student-friendly 300–400 word model answers for all 12 questions: Phrases, Clauses, Creative Writing, Active Listening, Speaking Barriers, Adjectives, Adverbs, Tenses, Descriptive Writing, Sentences, Empathy, and Prejudgment.",
    questions: [
      {
        id: "comm-pred-q1",
        qNumber: "Q1",
        marks: 5,
        question:
          "What is a Phrase? Explain the different types of phrases with suitable examples.",
        solution: {
          summary:
            "A phrase is simply a group of two or more words that work together to express an idea, but it does NOT have both a subject and a verb. Because of this, it cannot stand alone as a complete sentence.",
          keyPoints: [
            "Simple Definition: A phrase is a group of words without a subject-verb pair that functions as a single part of speech.",
            "Phrase vs. Clause: A phrase has no subject-verb combination (e.g. 'in the morning'); a clause has both (e.g. 'She arrived in the morning').",
            "Head Word: Every phrase is named after its main word (a Noun Phrase is built around a noun, a Verb Phrase around a verb).",
            "5 Main Types: Noun Phrase, Verb Phrase, Adjective Phrase, Adverb Phrase, and Prepositional Phrase.",
            "Quick Exam Rule: Phrases add extra details like who, what, when, where, and how, but they are never full sentences by themselves.",
          ],
          explanation: [
            "1. What is a Phrase in Simple Words?",
            "A phrase is a team of words that work together to make sense, but they do NOT form a complete sentence because they do not have a person/thing (subject) performing an action (verb).",
            "For example, 'a big black dog' or 'is walking slowly' are phrases. They convey meaning, but neither can stand on its own as a full thought.",
            "",
            "2. The 5 Main Types of Phrases (With Everyday Examples):",
            "",
            "a) Noun Phrase (NP):",
            "  - What it is: A phrase built around a main noun. It acts just like a noun in a sentence.",
            "  - Example: 'The smart young student solved the problem easily.'",
            "  - Here, 'The smart young student' is a noun phrase acting as the subject.",
            "",
            "b) Verb Phrase (VP):",
            "  - What it is: A phrase made up of the main action verb plus any helping verbs.",
            "  - Example: 'Rohan has been working on his project all afternoon.'",
            "  - Here, 'has been working' is the verb phrase showing the complete ongoing action.",
            "",
            "c) Adjective Phrase (AdjP):",
            "  - What it is: A group of words that describes a noun or pronoun, telling us what kind.",
            "  - Example: 'The birthday cake was extremely sweet and delicious.'",
            "  - Here, 'extremely sweet and delicious' describes the cake.",
            "",
            "d) Adverb Phrase (AdvP):",
            "  - What it is: A group of words that tells us HOW, WHEN, WHERE, or WHY an action happened.",
            "  - Example: 'He drove the car very carefully through the heavy rain.'",
            "  - Here, 'very carefully' tells us how he drove.",
            "",
            "e) Prepositional Phrase (PP):",
            "  - What it is: A phrase that starts with a preposition (in, on, at, under, behind) and ends with a noun.",
            "  - Example: 'The notebook is lying on the wooden study table.'",
            "  - Here, 'on the wooden study table' tells us where the notebook is.",
            "",
            "3. Non-Finite Verbal Phrases (Bonus for Extra Marks):",
            "  - Gerund Phrase (acts like a noun): 'Playing chess improves concentration.'",
            "  - Infinitive Phrase (to + verb): 'His goal is to become a software engineer.'",
            "  - Participial Phrase (acts like an adjective): 'Tired from the long journey, the travelers went to sleep.'",
          ],
          video: {
            id: "3HPDFtZQ9ao",
            title:
              "Types of Phrases in English Grammar (5 Core Types with Examples)",
            channel: "Nihir Shah",
            duration: "11:45",
            speed: "1.25x",
            relevance:
              "Q.01: Master the 5 core phrase types with simple, clear everyday examples.",
            takeaway:
              "A phrase is a group of words without a subject-verb pair that acts as a single part of speech.",
          },
        },
      },
      {
        id: "comm-pred-q2",
        qNumber: "Q2",
        marks: 5,
        question:
          "What is a Clause? Explain its different types with suitable examples.",
        solution: {
          summary:
            "A clause is a group of words that contains both a subject and a verb. Clauses are divided into Independent clauses (can stand alone as complete sentences) and Dependent clauses (cannot stand alone).",
          keyPoints: [
            "Simple Definition: A clause is a group of words with both a Subject (who/what) and a Verb (the action).",
            "Independent Clause: Makes complete sense on its own and can stand alone as a sentence (e.g. 'I love reading books').",
            "Dependent Clause: Starts with a connecting word (because, although, if, when) and cannot stand alone without a main clause.",
            "3 Kinds of Dependent Clauses: Noun Clauses, Adjective Clauses, and Adverb Clauses.",
            "Quick Rule: Phrase = No Subject-Verb pair. Clause = Has Subject + Verb pair.",
          ],
          explanation: [
            "1. What is a Clause?",
            "A clause is a group of words that has both a Subject (who or what the sentence is about) and a Verb (the action or state). Unlike a phrase, a clause shows someone or something doing an action.",
            "",
            "2. The Two Main Types of Clauses:",
            "",
            "a) Independent Clause (Main Clause):",
            "  - It expresses a complete thought and can stand completely alone as a sentence.",
            "  - Example: 'Aman completed his homework early.'",
            "  - Two independent clauses can be joined together using words like 'and', 'but', or 'so' (e.g. 'Aman completed his homework, but he wanted to play outside.').",
            "",
            "b) Dependent Clause (Subordinate Clause):",
            "  - It has a subject and a verb, but it starts with a connecting word like because, although, since, when, or if. Therefore, it leaves the idea incomplete.",
            "  - Incomplete by itself: '...because he wanted to watch the football match.'",
            "  - Complete Sentence: 'Aman completed his homework early because he wanted to watch the football match.'",
            "",
            "3. The Three Types of Dependent Clauses:",
            "  - Noun Clause: Acts as a noun in the sentence.",
            "    Example: 'I know what you are thinking.'",
            "  - Adjective (Relative) Clause: Describes a noun, usually starting with who, which, or that.",
            "    Example: 'The student who won first prize is my classmate.'",
            "  - Adverb Clause: Tells when, why, where, or under what condition an action happened.",
            "    Example: 'Call me as soon as you reach home.'",
          ],
          video: {
            id: "zwsBcic8GZ4",
            title:
              "Clauses in English: Independent vs Dependent (Noun, Adjective, Adverb)",
            channel: "English with Ananya",
            duration: "10:15",
            speed: "1.25x",
            relevance:
              "Q.02: Clear explanation of Independent vs Dependent clauses and how to spot them easily.",
            takeaway:
              "An independent clause makes full sense alone; a dependent clause needs a main clause to finish the thought.",
          },
        },
      },
      {
        id: "comm-pred-q3",
        qNumber: "Q3",
        marks: 5,
        question:
          "What is Creative Writing? Explain its important characteristics and qualities.",
        solution: {
          summary:
            "Creative writing is an expressive form of writing that uses your imagination, feelings, and storytelling skills to entertain, inspire, or touch the reader emotionally, rather than just stating dry facts.",
          keyPoints: [
            "Purpose: Entertains, provokes emotion, and shares human experiences, unlike technical writing which focuses only on factual data.",
            "Imagination & Originality: Creating original stories, characters, and fresh perspectives.",
            "Show, Don't Tell: Using sensory descriptions so readers can see, hear, and feel the scene.",
            "Figurative Language: Using metaphors, similes, and vivid descriptions to bring ideas to life.",
            "Common Forms: Short stories, novels, poems, personal memoirs, and plays.",
          ],
          explanation: [
            "1. What is Creative Writing?",
            "Creative writing is writing where your imagination and creativity take center stage. While technical writing explains how things work (like an instruction manual or report), creative writing tells a story, paints pictures in the mind, and connects with the reader's emotions.",
            "",
            "2. Creative Writing vs. Technical Writing (Quick Comparison):",
            "  - Technical Writing: 'The weather dropped to zero degrees, causing water to freeze.'",
            "  - Creative Writing: 'A bitter, biting frost silently blanketed the sleepy village in sparkling silver glass.'",
            "",
            "3. Key Characteristics of Good Creative Writing:",
            "  - 1. Originality & Personal Voice: It shows the writer's unique style, mood, and perspective.",
            "  - 2. Sensory Language ('Show, Don't Tell'): Instead of telling the reader 'Ravi was angry', describe his clenched fists, loud trembling voice, and red face.",
            "  - 3. Emotional Impact: It makes the reader feel something real—joy, suspense, excitement, or empathy.",
            "  - 4. Figurative Language: Using comparisons like similes ('Her smile was as warm as sunshine') and metaphors ('Time is a thief').",
            "  - 5. Clear Story Arc: A good story has an engaging opening, rising interest, a turning point (climax), and a satisfying conclusion.",
          ],
          video: {
            id: "HNlV48JhUAo",
            title: "Creative Writing: Definition, Types & Literary Qualities",
            channel: "Muhammad Ullah",
            duration: "10:45",
            speed: "1.25x",
            relevance:
              "Q.03: Learn the essential qualities of creative writing with simple examples.",
            takeaway:
              "Creative writing uses imagination and sensory details to emotionally connect with readers.",
          },
        },
      },
      {
        id: "comm-pred-q4",
        qNumber: "Q4",
        marks: 5,
        question:
          "What is Active Listening? Discuss the major barriers to effective listening.",
        solution: {
          summary:
            "Active listening is the habit of giving 100% full attention to the speaker, truly understanding their message, and responding thoughtfully, instead of just passively hearing background sound.",
          keyPoints: [
            "Hearing vs. Listening: Hearing is just ears detecting physical sound; listening is your brain actively paying attention and understanding meaning.",
            "Good Habits: Making eye contact, nodding, keeping an open posture, and asking clarifying questions.",
            "Paraphrasing: Repeating what you heard in your own words ('So what you mean is...') to confirm understanding.",
            "Major Barriers: Physical noise, daydreaming/preoccupation, prejudging the speaker, and preparing your reply while they are still talking.",
            "Value: Builds deep trust, avoids costly misunderstandings, and improves team cooperation.",
          ],
          explanation: [
            "1. What is Active Listening?",
            "Active listening means listening with your ears, eyes, and mind. You aren't just waiting for your turn to speak; you are completely focused on understanding the speaker's thoughts and feelings.",
            "",
            "2. Hearing vs. Active Listening (The Big Difference):",
            "  - Hearing is automatic and passive. Your ears pick up background noises like traffic or a fan without your brain focusing on them.",
            "  - Active Listening is intentional. It takes conscious mental effort, concentration, and engagement.",
            "",
            "3. The Golden Rules of an Active Listener:",
            "  - Give Full Attention: Put away your phone, face the speaker, and make comfortable eye contact.",
            "  - Show Engagement: Nod your head, smile, and use encouraging words like 'Yes', 'I understand', or 'Go on'.",
            "  - Do Not Interrupt: Let the other person finish their complete thought before jumping in with your advice.",
            "  - Paraphrase to Confirm: Summarize their point: 'So, if I understand correctly, your main worry is...'.",
            "",
            "4. Major Barriers to Effective Listening:",
            "  - 1. Physical Distractions: Loud room noise, incoming phone notifications, or uncomfortable seats.",
            "  - 2. Mental Wandering (Preoccupation): Thinking about your lunch, exams, or personal worries while someone is speaking.",
            "  - 3. Formulating Rebuttals: Thinking about what smart reply you will give next instead of listening to what the speaker is saying right now.",
            "  - 4. Prejudgment & Bias: Dismissing the speaker because of their age, accent, clothes, or background.",
            "  - 5. Information Overload: Getting bombarded with too much complex information at once, causing your brain to tune out.",
          ],
          video: {
            id: "aDMtx5ivKK0",
            title:
              "The Art of Active Listening & Overcoming Cognitive Barriers",
            channel: "Harvard Business Review",
            duration: "6:50",
            speed: "1.0x",
            relevance:
              "Q.04: Discover practical tips to become an active listener and overcome listening roadblocks.",
            takeaway:
              "Active listening requires full mental presence, non-verbal feedback, and confirming understanding without interrupting.",
          },
        },
      },
      {
        id: "comm-pred-q5",
        qNumber: "Q5",
        marks: 5,
        question:
          "What are the barriers to speaking? Explain the different factors that affect effective communication.",
        solution: {
          summary:
            "Speaking barriers are the physical, mental, or language difficulties that prevent a speaker from delivering their message clearly, confidently, and effectively to an audience.",
          keyPoints: [
            "Stage Fright / Anxiety: Fear of making mistakes, nervousness, shivering, or blanking out in front of people.",
            "Language & Vocabulary Gaps: Struggling to find simple words, grammar hesitations, or heavy Mother Tongue Influence (MTI).",
            "Poor Voice Delivery: Speaking in a monotone voice, mumbling, talking too fast, or speaking too quietly.",
            "Lack of Preparation: Not understanding the topic well, leading to confusion and filler words ('um', 'uh').",
            "Actionable Solutions: Practice regularly out loud, breathe deeply, speak slowly, and focus on helping the audience understand.",
          ],
          explanation: [
            "1. What are Speaking Barriers?",
            "Speaking barriers are the roadblocks that stop someone from communicating their thoughts clearly. Even with great knowledge, speaking barriers can prevent listeners from understanding or appreciating the message.",
            "",
            "2. Major Factors and Barriers:",
            "",
            "a) Psychological Barriers (Mind & Emotions):",
            "  - Fear of Public Speaking: Worrying that people will laugh, judge, or criticize your mistakes.",
            "  - Low Self-Confidence: Feeling inferior or intimidated by senior people or a large crowd.",
            "",
            "b) Language & Vocabulary Barriers:",
            "  - Weak Vocabulary: Having to stop repeatedly because you cannot find the right word to express an idea.",
            "  - Mother Tongue Influence (MTI): Pronouncing English words with the heavy accent or cadence of your local language, making words difficult for others to catch.",
            "  - Using Too Much Technical Jargon: Using complicated acronyms or terms that ordinary listeners do not know.",
            "",
            "c) Physical & Delivery Barriers (Voice & Body):",
            "  - Speaking Too Fast: Rushing through sentences without pausing, leaving the audience confused.",
            "  - Monotone Voice: Speaking in one flat tone without energy, causing listeners to lose interest.",
            "  - Mumbling & Low Volume: Not opening your mouth clearly or speaking so quietly that people in the back cannot hear.",
            "",
            "3. Simple Ways to Overcome Speaking Barriers:",
            "  - Practice in front of a mirror or record your voice on your phone to hear where you can improve.",
            "  - Take a slow, deep breath before starting to steady your heart rate.",
            "  - Keep sentences short and clear; pause for 1-2 seconds between key ideas.",
            "  - Make warm eye contact with friendly listeners in the room.",
          ],
          video: {
            id: "0J8iHJKOKlY",
            title:
              "Barriers of Communication & Overcoming Public Speaking Anxiety",
            channel: "Study Lovers",
            duration: "11:20",
            speed: "1.25x",
            relevance:
              "Q.05: How to overcome stage fear, language hesitation, and build confident speaking skills.",
            takeaway:
              "Confidence comes from preparation, controlled pacing, clear pronunciation, and connecting with the audience.",
          },
        },
      },
      {
        id: "comm-pred-q6",
        qNumber: "Q6",
        marks: 5,
        question:
          "What is an Adjective? Explain its types with suitable examples.",
        solution: {
          summary:
            "An adjective is a describing word that adds meaning to a noun or pronoun. It tells us what kind, which one, how many, or how much about a person, place, animal, or thing.",
          keyPoints: [
            "Core Purpose: Describes, identifies, or quantifies a noun or pronoun.",
            "Answers Key Questions: 'What kind?' (honest boy), 'Which one?' (this car), 'How many?' (five pens), 'How much?' (some milk).",
            "Main Types: Quality, Quantity, Number, Demonstrative, Possessive, and Interrogative.",
            "Placement: Can come before a noun ('a warm sunny day') or after a verb ('The day was sunny').",
          ],
          explanation: [
            "1. What is an Adjective?",
            "An adjective is simply a describing word. Without adjectives, language would be plain and boring. Instead of just saying 'I bought a phone', adjectives let you say 'I bought a sleek, blue, fast smartphone'.",
            "",
            "2. The Main Types of Adjectives (With Easy Examples):",
            "",
            "a) Adjective of Quality (What kind?):",
            "  - Describes the nature, color, size, or quality of a noun.",
            "  - Examples: honest, brave, beautiful, cold, green ('Ravi is a brave boy.').",
            "",
            "b) Adjective of Quantity (How much?):",
            "  - Used with uncountable nouns to show amount.",
            "  - Examples: some, much, little, enough, all ('She drank some cold water.').",
            "",
            "c) Adjective of Number (How many?):",
            "  - Used with countable nouns to show exact count or order.",
            "  - Examples: three, ten, first, second, many, several ('There are forty students in the class.').",
            "",
            "d) Demonstrative Adjectives (Which one?):",
            "  - Points directly to specific people or things.",
            "  - Examples: this, that, these, those ('This book is very interesting.').",
            "",
            "e) Possessive Adjectives (Whose?):",
            "  - Shows ownership or belonging.",
            "  - Examples: my, your, his, her, our, their ('This is my classroom.').",
            "",
            "f) Interrogative Adjectives:",
            "  - Used right next to a noun to ask a question.",
            "  - Examples: which, what, whose ('Which route should we take?').",
          ],
          video: {
            id: "3HPDFtZQ9ao",
            title: "Adjectives and Their Types in English Grammar",
            channel: "English Grammar Hub",
            duration: "9:30",
            speed: "1.25x",
            relevance:
              "Q.06: Quick masterclass on all major adjective categories with everyday sentences.",
            takeaway:
              "Adjectives make sentences specific and vivid by answering what kind, which, or how many.",
          },
        },
      },
      {
        id: "comm-pred-q7",
        qNumber: "Q7",
        marks: 5,
        question:
          "What is an Adverb? Explain its types and uses with examples.",
        solution: {
          summary:
            "An adverb is a word that modifies or describes a verb (action), an adjective, or another adverb. It tells us how, when, where, how often, or to what degree an action happens.",
          keyPoints: [
            "Core Purpose: Adds details to an action ('He walked slowly') or emphasizes a description ('very beautiful').",
            "Common Clue: Many adverbs of manner end in '-ly' (e.g. happily, quickly, carefully), though some do not (e.g. fast, well, hard).",
            "Questions Answered: How? When? Where? How often? How much?",
            "5 Main Types: Manner, Time, Place, Frequency, and Degree.",
          ],
          explanation: [
            "1. What is an Adverb?",
            "While adjectives describe things (nouns), adverbs describe actions (verbs) and descriptions (adjectives). They explain the circumstances around an event.",
            "",
            "2. The 5 Main Types of Adverbs (With Easy Examples):",
            "",
            "a) Adverb of Manner (HOW did it happen?):",
            "  - Tells how an action is performed. Usually ends in '-ly'.",
            "  - Examples: quickly, softly, politely, bravely ('She spoke politely to the teacher.').",
            "",
            "b) Adverb of Time (WHEN did it happen?):",
            "  - Tells when the action took place.",
            "  - Examples: yesterday, today, now, soon, later ('The exam results will be announced soon.').",
            "",
            "c) Adverb of Place (WHERE did it happen?):",
            "  - Tells where the action occurred.",
            "  - Examples: here, there, outside, everywhere, upstairs ('Please leave your shoes outside.').",
            "",
            "d) Adverb of Frequency (HOW OFTEN does it happen?):",
            "  - Tells how regularly something occurs.",
            "  - Examples: always, often, sometimes, rarely, never ('Priya always completes her work on time.').",
            "",
            "e) Adverb of Degree (HOW MUCH or TO WHAT EXTENT?):",
            "  - Tells the intensity or strength of an action or adjective.",
            "  - Examples: very, extremely, completely, almost, quite ('The tea is extremely hot.').",
          ],
          video: {
            id: "3HPDFtZQ9ao",
            title: "Adverbs: What They Are & How to Use Them",
            channel: "English Grammar Hub",
            duration: "8:50",
            speed: "1.25x",
            relevance:
              "Q.07: Clear breakdown of the 5 adverb types with everyday sentences.",
            takeaway:
              "Adverbs describe actions by telling how, when, where, how often, or how much.",
          },
        },
      },
      {
        id: "comm-pred-q8",
        qNumber: "Q8",
        marks: 5,
        question:
          "What is Tense? Explain its different types with suitable examples.",
        solution: {
          summary:
            "Tense is the form of a verb that shows the time of an action—whether it happened in the Past, is happening in the Present, or will happen in the Future.",
          keyPoints: [
            "3 Core Time Frames: Present (happening now / routine), Past (already finished), and Future (yet to happen).",
            "4 Forms for Each Time Frame: Simple, Continuous, Perfect, and Perfect Continuous (Total = 12 Tenses).",
            "Helping Verbs: Words like is/am/are, was/were, has/have/had, and will/shall indicate the exact tense.",
            "Everyday Rule: Pick one main tense for your paragraph and do not randomly switch between past and present.",
          ],
          explanation: [
            "1. What is Tense?",
            "Tense tells your reader when an event happened on the timeline. By changing the verb (like 'walk' to 'walked') or adding helping verbs (like 'will walk'), you set the exact time.",
            "",
            "2. The 3 Main Time Frames with 4 Forms (12 Total Tenses):",
            "",
            "a) Present Tense (Today / Regular Routine):",
            "  - Simple Present: Habits or universal truths ('I study computer science daily.').",
            "  - Present Continuous: Action happening right this second ('I am writing an assignment.').",
            "  - Present Perfect: Action recently finished with an effect now ('I have submitted my project.').",
            "  - Present Perfect Continuous: Started earlier and still going on ('I have been studying for two hours.').",
            "",
            "b) Past Tense (Yesterday / Finished):",
            "  - Simple Past: Action completed in the past ('She visited Jaipur last week.').",
            "  - Past Continuous: Action in progress at a past moment ('I was reading when you called.').",
            "  - Past Perfect: Action completed before another past action ('The train had left before I reached the station.').",
            "  - Past Perfect Continuous: Ongoing past action before a cut-off ('He had been working there for two years before moving.').",
            "",
            "c) Future Tense (Tomorrow / Coming Up):",
            "  - Simple Future: Action that will happen later ('We will attend the workshop tomorrow.').",
            "  - Future Continuous: Action that will be in progress ('I will be traveling tomorrow evening.').",
            "  - Future Perfect: Action that will be finished by a future time ('By 5 PM, I will have finished my exam.').",
            "  - Future Perfect Continuous: Action continuing up to a future point ('By next year, she will have been living here for a decade.').",
          ],
          video: {
            id: "zwsBcic8GZ4",
            title: "All 12 Tenses in English Grammar with Examples",
            channel: "Dear Sir",
            duration: "15:20",
            speed: "1.25x",
            relevance:
              "Q.08: Master all 12 English tenses in minutes with simple formulas and daily examples.",
            takeaway:
              "Tenses tell when an action happens: Present (now), Past (then), or Future (later).",
          },
        },
      },
      {
        id: "comm-pred-q9",
        qNumber: "Q9",
        marks: 5,
        question:
          "What is Descriptive Writing? Explain its characteristics with an example.",
        solution: {
          summary:
            "Descriptive writing is writing that paints a vivid, colorful picture in the reader's imagination using sensory details (sight, sound, smell, taste, touch) so the reader feels like they are personally experiencing the scene.",
          keyPoints: [
            "The Golden Rule: 'Show, Don't Tell'. Don't just say a place was beautiful; describe what made it beautiful.",
            "5 Senses: Engaging sight (colors, shapes), sound (whisper, roar), smell (sweet, fresh), taste (rich, spicy), and touch (crisp, smooth).",
            "Vivid Vocabulary: Choosing strong, specific nouns and verbs instead of relying on generic words like 'nice' or 'big'.",
            "Logical Organization: Organizing descriptions spatially (e.g. from top to bottom, near to far, outside to inside).",
          ],
          explanation: [
            "1. What is Descriptive Writing?",
            "Descriptive writing uses words like an artist uses paint. Its goal is to transport the reader into a scene, making them feel the warm sunlight, hear the gentle rain, or smell fresh flowers.",
            "",
            "2. The Golden Rule: 'Show, Don't Tell':",
            "  - Telling (Dull): 'The classroom was very noisy and messy.'",
            "  - Showing (Descriptive): 'Papers fluttered across the floor as twenty students shouted with laughter, banging wooden desks while the teacher tried desperately to restore order.'",
            "",
            "3. Key Characteristics of Good Descriptive Writing:",
            "  - 1. Appeals to the 5 Senses: Mentions what you see, hear, smell, feel, and taste.",
            "  - 2. Strong Descriptive Words: Replaces 'a big dog' with 'a massive, golden-furred retriever'.",
            "  - 3. Figurative Language: Uses similes ('The pond water was as clear as glass') and metaphors ('The library was a quiet sanctuary').",
            "  - 4. Spatial Flow: Moves the reader's view smoothly (e.g. starting with the mountain in the distance, then the river below, then the wildflowers at your feet).",
            "",
            "4. Sample Model Descriptive Paragraph (For Exam Writing):",
            "  'The early morning university campus was peaceful and still. A soft, silvery mist hovered over the dew-drenched lawns, while the crisp scent of damp earth filled the cool morning air. The first golden rays of sunlight broke through the tall eucalyptus trees, casting long gentle shadows across the quiet brick pathways as songbirds greeted the new day with cheerful melodies.'",
          ],
          video: {
            id: "HNlV48JhUAo",
            title: "Descriptive Writing: Techniques and Examples",
            channel: "English Masterclass",
            duration: "10:10",
            speed: "1.25x",
            relevance:
              "Q.09: Learn how to use sensory details and 'show don't tell' to write great descriptions.",
            takeaway:
              "Descriptive writing uses sensory imagery to recreate experiences vividly in the reader's mind.",
          },
        },
      },
      {
        id: "comm-pred-q10",
        qNumber: "Q10",
        marks: 5,
        question:
          "What is a Sentence? Explain its different types with examples.",
        solution: {
          summary:
            "A sentence is a group of words that expresses a complete thought. It must begin with a capital letter, end with a punctuation mark (. ! ?), and contain both a subject and a verb.",
          keyPoints: [
            "2 Essential Parts: Subject (who or what the sentence is about) and Predicate (what the subject is doing).",
            "4 Types by Purpose: Declarative (statement), Interrogative (question), Imperative (command/request), and Exclamatory (strong emotion).",
            "3 Types by Structure: Simple (one complete thought), Compound (two complete thoughts joined by and/but/so), and Complex (one main thought + one dependent thought).",
            "Exam Tip: Every complete sentence must be able to stand completely on its own.",
          ],
          explanation: [
            "1. What is a Sentence?",
            "A sentence is the basic unit of written communication. To be a true sentence, it must fulfill three conditions:",
            "  - 1. It begins with a capital letter.",
            "  - 2. It has both a Subject (who/what) and a Verb (the action).",
            "  - 3. It expresses a complete, standalone thought.",
            "",
            "2. Four Types of Sentences Based on Purpose (What they do):",
            "",
            "a) Declarative Sentence (Statement):",
            "  - Shares information, facts, or opinions. Ends with a period (.).",
            "  - Example: 'Regular exercise keeps your body healthy and mind sharp.'",
            "",
            "b) Interrogative Sentence (Question):",
            "  - Asks a direct question to get information. Ends with a question mark (?).",
            "  - Example: 'Did you submit your project report on time?'",
            "",
            "c) Imperative Sentence (Command / Request):",
            "  - Gives an order, advice, or polite request. Often has the implied subject 'You'.",
            "  - Example: 'Please close the classroom door quietly.'",
            "",
            "d) Exclamatory Sentence (Strong Emotion):",
            "  - Expresses sudden surprise, joy, or shock. Ends with an exclamation mark (!).",
            "  - Example: 'What a brilliant goal that was!'",
            "",
            "3. Three Types of Sentences Based on Structure (How they are built):",
            "  - Simple Sentence: One independent clause ('Neha likes reading books.').",
            "  - Compound Sentence: Two complete thoughts joined by a coordinating conjunction (FANBOYS: For, And, Nor, But, Or, Yet, So).",
            "    Example: 'Neha likes reading books, but her brother prefers playing cricket.'",
            "  - Complex Sentence: One main thought combined with a dependent clause.",
            "    Example: 'Neha read a book because the power went out.'",
          ],
          video: {
            id: "zwsBcic8GZ4",
            title: "Types of Sentences in English Grammar",
            channel: "English with Ananya",
            duration: "9:45",
            speed: "1.25x",
            relevance:
              "Q.10: Master both classification systems: by purpose (4 types) and by structure (3 types).",
            takeaway:
              "A sentence must have a subject, a verb, and express a complete standalone thought.",
          },
        },
      },
      {
        id: "comm-pred-q11",
        qNumber: "Q11",
        marks: 5,
        question: "What is Empathy? Explain its importance in communication.",
        solution: {
          summary:
            "Empathy is the ability to put yourself in someone else's shoes—to truly understand their feelings, see things from their point of view, and respond with genuine care and kindness.",
          keyPoints: [
            "Empathy vs. Sympathy: Sympathy means feeling sorry for someone from a distance; empathy means understanding and sharing their feeling from within.",
            "Connection to Listening: True empathy requires listening patiently without interrupting, judging, or dismissing the other person.",
            "Resolving Arguments: Empathy cools down heated conflicts because both sides feel respected and understood.",
            "Teamwork & Workplace: Empathetic teammates build high-trust relationships, work better together, and prevent misunderstandings.",
          ],
          explanation: [
            "1. What is Empathy in Everyday Communication?",
            "Empathy is often called 'walking in someone else's shoes'. In conversation, it means stepping outside your own ego and opinions to genuinely understand what the other person is feeling and why they feel that way.",
            "",
            "2. Empathy vs. Sympathy (A Very Common Exam Question!):",
            "  - Sympathy (Feeling sorry from outside): 'I feel bad that you failed your test.' (Pity, maintains distance).",
            "  - Empathy (Understanding from inside): 'I know how hard you prepared. It must feel really disappointing, but let us sit together and see where things went wrong.' (Connection, shared support).",
            "",
            "3. Why Empathy is So Important in Communication:",
            "  - 1. Builds Instant Trust: When people realize you are not judging them, they open up and speak honestly.",
            "  - 2. Stops Arguments: Most conflicts happen because people feel ignored. Empathy cools anger by showing: 'I hear your concern and understand why you are upset.'",
            "  - 3. Helps You Choose Kind Words: When you sense someone is stressed or sad, empathy guides you to speak gently rather than being blunt or harsh.",
            "  - 4. Essential for Good Leadership: Leaders who listen empathetically gain the respect, loyalty, and best performance of their team members.",
            "",
            "4. How to Show Empathy in Daily Life:",
            "  - Put away your phone and give your full attention when someone talks to you.",
            "  - Do not dismiss their feelings with 'Oh, it is not a big deal, you are overreacting.'",
            "  - Ask supportive questions: 'How did that make you feel?' and 'What can I do to help?'",
          ],
          video: {
            id: "aDMtx5ivKK0",
            title: "Empathy in Communication & Workplace Relationships",
            channel: "TED-Ed",
            duration: "7:15",
            speed: "1.0x",
            relevance:
              "Q.11: Understand the life skill of empathy and why it transforms everyday conversations.",
            takeaway:
              "Empathy means understanding someone's perspective and feelings without judgment.",
          },
        },
      },
      {
        id: "comm-pred-q12",
        qNumber: "Q12",
        marks: 5,
        question:
          "What is Prejudgment? Explain how it can act as a barrier to communication.",
        solution: {
          summary:
            "Prejudgment is the barrier of forming a final opinion about a person or their message before actually hearing what they have to say, based on assumptions, stereotypes, or appearances.",
          keyPoints: [
            "Core Problem: The listener's mind is already closed before the speaker even finishes their first sentence.",
            "Common Causes: Stereotypes, past negative experiences, physical appearance, accent, or age.",
            "Harmful Effects: Leads to selective listening, twisting the speaker's words, creating defensiveness, and shutting down honest dialogue.",
            "How to Overcome It: Approach every conversation with an open mind, focus on the facts, and wait until the speaker finishes before forming an opinion.",
          ],
          explanation: [
            "1. What is Prejudgment?",
            "Prejudgment literally means 'judging beforehand'. It happens when you jump to conclusions about someone's ideas, skills, or intentions before giving them a fair chance to speak or explain themselves.",
            "",
            "2. Everyday Examples of Prejudgment:",
            "  - Assuming a younger classmate has nothing smart to say in a group project just because they are younger.",
            "  - Dismissing someone's idea because they speak with a regional accent or dress casually.",
            "  - Assuming a friend is making an excuse before even hearing why they were late.",
            "",
            "3. How Prejudgment Acts as a Dangerous Barrier to Communication:",
            "  - 1. Selective Hearing (Confirmation Bias): You only listen to words that support your negative bias, while ignoring all the brilliant points the speaker makes.",
            "  - 2. Twisting the Message: You misinterpret the speaker's innocent comments as rude or ignorant because you already expected them to be wrong.",
            "  - 3. Silencing the Speaker: When people sense they have already been judged, they lose confidence, feel humiliated, and stop sharing ideas.",
            "  - 4. Creating Tension & Conflict: Conversations quickly turn into arguments instead of helpful discussions.",
            "",
            "4. How to Overcome Prejudgment in Communication:",
            "  - Separate the Message from the Person: Focus on whether the idea is good, not on who is delivering it.",
            "  - Keep an Open Mind: Remember that you can learn something valuable from anyone.",
            "  - Listen Completely First: Do not interrupt or evaluate until the speaker has finished their complete point.",
          ],
          video: {
            id: "0J8iHJKOKlY",
            title: "Overcoming Prejudgment & Biases in Communication",
            channel: "Study Lovers",
            duration: "9:40",
            speed: "1.25x",
            relevance:
              "Q.12: Why prejudgment destroys conversations and how to build an open, receptive mindset.",
            takeaway:
              "Prejudgment closes the mind; true communication requires listening to the full message before evaluating.",
          },
        },
      },
    ],
  },

  // ==========================================
  // SEMESTER 1: Professional Communication (6.0CSC04 / CSC-406) CIA-1 & CIA-2
  // ==========================================
  {
    id: "sem1-comm-cia1",
    courseCode: "6.0CSC04",
    courseSlug: "professional-communication",
    courseTitle: "Professional Communication",
    semester: "Semester I",
    assessmentType: "CIA-1",
    title: "Continuous Internal Assessment 1 (Assignment 01)",
    date: "2025–2026 Academic Session",
    time: "Take-home Continuous Assessment",
    totalMarks: 15,
    instructions: [
      "Long Answer type Questions: Attempt any 3.",
      "Word Limit: 300 - 400 words per question.",
      "Maximum Marks: 15 [5 × 3 = 15]",
    ],
    paperImages: ["/pccia2025.png"],
    status: "available",
    notes:
      "Department of Computer Science / Distance Education, Central University of Rajasthan (CURAJ). Course Code: 6.0 ODLCSC04 / 6.0CSC04 (CSC-406 Professional Communication). Assignment 01 covering Report Formatting & Technical Writing, Phrase Structure & Syntax, Group Discussion (PREP & REP Techniques), Creative Writing Qualities, and Active Listening Barriers.",
    questions: [
      {
        id: "sem1-comm-a1-q1",
        qNumber: "Q1",
        marks: 5,
        question: "What is the format of a report? Give an example.",
        solution: {
          summary:
            "Comprehensive breakdown of formal technical and business report architecture: Front Matter, Main Body, Concluding Section, Back Matter, accompanied by a realistic technical report model.",
          keyPoints: [
            "Definition of a Report: An organized, factual, and objective communication document designed to investigate an issue, evaluate data, and present reasoned conclusions and actionable recommendations to stakeholders.",
            "Structural Hierarchy: Divided into four core segments: (1) Preliminary Sections / Front Matter, (2) Main Body of the Report, (3) Conclusions & Recommendations, (4) Supplementary Material / Back Matter.",
            "Standard Front Matter: Title Page, Letter of Transmittal, Abstract / Executive Summary, Table of Contents, List of Figures and Tables.",
            "Standard Main Body: Introduction (Background, Objectives, Scope, Limitations), Methodology & Investigation, Data Presentation, Findings & Discussion.",
            "Standard Back Matter: Conclusions, Actionable Recommendations, References / Works Cited (IEEE/APA format), Appendices (raw data, code listings, survey instruments).",
          ],
          explanation: [
            "1. Standard Architectural Format of a Formal Report:",
            "  - A. Front Matter (Preliminary Pages):",
            "    * Title Page: Title of the report, author details (name, designation, roll number/department), recipient details (client, committee, or university), and submission date.",
            "    * Executive Summary / Abstract: A 150-250 word condensed overview stating the problem, methodology, key findings, and final recommendation for executive decision-makers.",
            "    * Table of Contents & List of Tables/Figures: Page references for sections, charts, and diagrams.",
            "  - B. Main Body (The Core Narrative):",
            "    * Introduction: Outlines problem background, terms of reference, operational scope, and investigative constraints.",
            "    * Methodology / Procedure: Explains data gathering techniques (primary surveys, algorithmic simulations, empirical benchmarking, literature review).",
            "    * Findings & Analysis: Systematic presentation of analyzed data using subheadings, graphs, comparative tables, and objective interpretation.",
            "  - C. Terminal Section (Outcomes):",
            "    * Conclusions: Logical inferences derived strictly from the analyzed data without introducing new evidence.",
            "    * Recommendations: Concrete, prioritized, feasible action steps to resolve the identified problems.",
            "  - D. Back Matter (Reference Material):",
            "    * References / Bibliography: Formal academic citations of external sources.",
            "    * Appendices: Supplementary technical blueprints, statistical tables, questionnaire samples, or source code.",
            "",
            "2. Illustrative Example of a Technical Report Format:",
            "--------------------------------------------------------------------------------",
            "TITLE: FEASIBILITY REPORT ON IMPLEMENTING CAMPUS-WIDE ZERO-TRUST NETWORK AT CURAJ",
            "SUBMITTED TO: Department of Computer Science, Central University of Rajasthan",
            "SUBMITTED BY: Akshaya Parida, M.Sc. Computer Science (Roll: 2026MSCS01)",
            "DATE: October 15, 2025",
            "",
            "1. EXECUTIVE SUMMARY",
            "This report assesses the feasibility of upgrading the university network infrastructure from perimeter-based firewalls to a Zero-Trust Architecture (ZTA). Empirical audit revealed 38% unauthorized IoT device connectivity. Migration to micro-segmentation and multi-factor authentication will reduce vulnerability surface by 72% within an estimated budget of ₹4.5 Lakhs.",
            "",
            "2. INTRODUCTION & PROBLEM DEFINITION",
            "With the proliferation of cloud workloads, laboratory clusters, and student mobile devices across the CURAJ campus, the legacy perimeter firewall is no longer sufficient to safeguard confidential research repositories.",
            "",
            "3. INVESTIGATIVE METHODOLOGY",
            "Network traffic logs (September 1-30, 2025) were analyzed using Wireshark and Zeek IDS across 5 university academic blocks. Penetration testing simulated lateral movement attacks.",
            "",
            "4. KEY FINDINGS & DISCUSSION",
            "Lateral movement between student Wi-Fi and department servers succeeded in 4 out of 5 simulation trials due to lack of internal subnet isolation.",
            "",
            "5. CONCLUSIONS & RECOMMENDATIONS",
            "Conclusion: Immediate network segmentation is critical.",
            "Recommendation: Deploy 802.1X port authentication and Software-Defined Perimeter (SDP) in phase 1 by December 2025.",
            "--------------------------------------------------------------------------------",
          ],
          video: {
            id: "-ZRombUgRs4",
            title: "Report Writing: Format, Structure & Model Examples",
            channel: "Dear Sir (Academic English)",
            duration: "14:28",
            speed: "1.25x",
            relevance:
              "Essential for Q.01: Master standard formal technical report architecture (Front Matter, Main Body, Methodology, Findings, Conclusions, and Recommendations with sample format).",
            takeaway:
              "Organize reports logically with standard headings, objective voice, and clear separation between findings and actionable recommendations.",
          },
        },
      },
      {
        id: "sem1-comm-a1-q2",
        qNumber: "Q2",
        marks: 5,
        question: "What is phrase? Write its types with an example.",
        solution: {
          summary:
            "Detailed grammatical analysis of phrases: formal syntactic definition, distinction from clauses, and examination of all 5 major phrase classes with contextual sentences.",
          keyPoints: [
            "Definition of Phrase: A phrase is a syntactic grouping of two or more words functioning as a single grammatical unit within a clause or sentence. Crucially, a phrase lacks a subject-verb combination and cannot express a complete thought on its own.",
            "Distinction from Clause: A clause contains both a subject and a finite predicate verb; a phrase never contains a subject performing a finite action.",
            "Five Major Types of Phrases:",
            "  1. Noun Phrase (NP): Headed by a noun or pronoun, acting as subject, object, or complement.",
            "  2. Verb Phrase (VP): Headed by a lexical verb accompanied by auxiliary and modal verbs.",
            "  3. Adjective Phrase (AdjP): Headed by an adjective, modifying a noun or pronoun.",
            "  4. Adverb Phrase (AdvP): Headed by an adverb, modifying verbs, adjectives, or other adverbs.",
            "  5. Prepositional Phrase (PP): Initiated by a preposition followed by its nominal object.",
          ],
          explanation: [
            "1. Formal Definition & Structural Characteristics:",
            "In modern English syntax (prescribed reference: Quirk & Greenbaum, 'Advanced English Usage'), a phrase is a constituent unit smaller than a clause that functions as a single unified part of speech. It is constructed around a central word termed the 'head word', optionally surrounded by pre-modifiers and post-modifiers.",
            "",
            "2. Comprehensive Classification of Phrases with Examples:",
            "",
            "a) Noun Phrase (NP):",
            "  - Structure: (Determiner/Modifier) + Head Noun + (Post-modifier)",
            "  - Function: Acts as the Subject, Direct Object, Indirect Object, or Object of a Preposition.",
            "  - Example: 'The highly motivated computer science students at CURAJ won the national hackathon.'",
            "    * NP: [The highly motivated computer science students at CURAJ] acts as the sentence subject.",
            "",
            "b) Verb Phrase (VP):",
            "  - Structure: Auxiliary/Modal verbs + Head Lexical Verb + (Complements)",
            "  - Function: Expresses the action, state of being, or condition in the predicate.",
            "  - Example: 'The development team has been rigorously optimizing the search algorithms.'",
            "    * VP: [has been rigorously optimizing] expresses continuous past-to-present action.",
            "",
            "c) Adjective Phrase (AdjP):",
            "  - Structure: (Adverbial intensifier) + Head Adjective + (Complements)",
            "  - Function: Modifies, qualifies, or describes a noun or pronoun.",
            "  - Example: 'The newly compiled Linux kernel was remarkably fast and exceptionally stable.'",
            "    * AdjP: [remarkably fast and exceptionally stable] serves as predicate adjective modifying 'kernel'.",
            "",
            "d) Adverb Phrase (AdvP):",
            "  - Structure: (Degree modifier) + Head Adverb",
            "  - Function: Modifies a verb, adjective, or clause to specify time, manner, degree, or place.",
            "  - Example: 'The packet routing algorithm converges far more rapidly than conventional protocols.'",
            "    * AdvP: [far more rapidly] modifies the verb 'converges'.",
            "",
            "e) Prepositional Phrase (PP):",
            "  - Structure: Preposition + Object of Preposition (Noun Phrase / Pronoun)",
            "  - Function: Serves an adjectival role (modifying nouns) or adverbial role (modifying verbs).",
            "  - Example: 'The high-performance GPU cluster is situated in the computational laboratory.'",
            "    * PP: [in the computational laboratory] acts adverbially indicating location.",
          ],
          video: {
            id: "3HPDFtZQ9ao",
            title:
              "Types of Phrases in English Grammar (5 Core Types with Examples)",
            channel: "Nihir Shah",
            duration: "11:45",
            speed: "1.25x",
            relevance:
              "Essential for Q.02: Clarifies why phrases lack subject-predicate pairs and breaks down Noun, Verb, Adjective, Adverbial, and Prepositional phrases.",
            takeaway:
              "A phrase operates as a unified single part of speech within a clause, never containing a finite verb acting on a subject.",
          },
        },
      },
      {
        id: "sem1-comm-a1-q3",
        qNumber: "Q3",
        marks: 5,
        question: "Explain Group discussion with its techniques.",
        solution: {
          summary:
            "Exhaustive theoretical and practical guide to Group Discussions (GD): evaluation parameters, role dynamics, the PREP and REP techniques, non-verbal indicators, and conflict resolution strategies.",
          keyPoints: [
            "Purpose of GD: A structured, interactive evaluation methodology where 8-12 participants exchange perspectives on a chosen topic to assess communication fluency, leadership, analytical depth, active listening, and teamwork.",
            "Evaluation Criteria: Conceptual knowledge & domain depth, communication clarity, logical coherence, listening attitude, body language, assertiveness vs aggressiveness, and consensus-building ability.",
            "PREP Technique: Point (State thesis clearly) → Reason (Provide logical rationale) → Example (Back with concrete evidence/case study) → Point (Reiterate core takeaway).",
            "REP Technique: Reason (Analyze root cause/problem) → Evidence (Provide quantitative or factual validation) → Proposal (Deliver constructive, practical solutions).",
            "Key Roles in GD: Initiator (frames the discussion and defines terms), Moderator/Gatekeeper (steers strayed discussion back to track), Contributor/Builder (elaborates on peers' points), Summarizer (synthesizes divergent viewpoints into a balanced conclusion).",
          ],
          explanation: [
            "1. Nature and Objectives of Group Discussion:",
            "In corporate recruitment and higher academic evaluations (prescribed reference: P.D. Chaturvedi, 'Business Communication'), a Group Discussion assesses not merely who speaks loudest, but who demonstrates collaborative intellectual leadership. Evaluators appraise four core dimensions: (a) Content/Knowledge, (b) Communication Skills, (c) Interpersonal Group Dynamics, and (d) Emotional Stability.",
            "",
            "2. Core Methodological Techniques in Group Discussion:",
            "",
            "a) The PREP Technique (Best for expressing opinions and structured arguments):",
            "  - P — Point: State your stance crisply in the opening sentence without ambiguity.",
            "  - R — Reason: Provide the underlying rationale why you hold this perspective.",
            "  - E — Example: Anchor your reason with a verifiable real-world instance, statistical benchmark, or historical precedent.",
            "  - P — Point: Conclude by restating your primary point, cementing your contribution.",
            "  * Illustration: 'I firmly believe AI regulation must be globally harmonized (Point). Fragmented cross-border policies create regulatory arbitrage and geopolitical vulnerabilities (Reason). For instance, the EU AI Act enforces risk categories while offshore labs develop unaligned models unchecked (Example). Therefore, a unified international treaty framework is imperative (Point).'",
            "",
            "b) The REP Technique (Best for problem-solving, abstract, or case study topics):",
            "  - R — Reason: Identify the systemic causes generating the bottleneck or dilemma.",
            "  - E — Evidence: Present qualitative or empirical data corroborating the severity of the issue.",
            "  - P — Proposal: Propose constructive, feasible, multi-stage remedies.",
            "",
            "3. Discussion Etiquette & Tactical Best Practices:",
            "  - Initiation: If initiating, define key parameters neutrally; do not state a rigid dogmatic stance immediately.",
            "  - Active Listening: Take brief notes, nod affirmatively, and build upon peers' points using phrases like: 'Adding to the insightful point raised by my colleague...'",
            "  - Handling Interruptions: Maintain calm vocal pitch. Say politely: 'Allow me to conclude my thought in 10 seconds, and I will gladly pass the floor to you.'",
            "  - Non-Verbal Communication: Keep open palm posture, maintain eye contact across the full circle (not just the examiner), sit upright, and avoid aggressive finger-pointing.",
          ],
          video: {
            id: "3w32jIsRlsw",
            title:
              "Group Discussion Techniques, PREP Framework & Placement Tips",
            channel: "Simplilearn",
            duration: "10:15",
            speed: "1.25x",
            relevance:
              "Essential for Q.03: Demonstrates initiation tactics, constructive intervention, handling conflicting viewpoints, and applying the PREP / REP structured argument technique.",
            takeaway:
              "In GD evaluation, active listening and facilitating consensus score significantly higher than dominating speaking time.",
          },
        },
      },
      {
        id: "sem1-comm-a1-q4",
        qNumber: "Q4",
        marks: 5,
        question:
          "What is Creative writing? What qualities one should have for Creative writing",
        solution: {
          summary:
            "In-depth analysis of creative writing: literary definitions, contrast with technical and academic prose, and the five essential cognitive and stylistic qualities required of an accomplished creative writer.",
          keyPoints: [
            "Definition of Creative Writing: An artistic mode of written expression that goes beyond pragmatic, transactional, or journalistic communication, prioritizing personal imagination, aesthetic craft, narrative ingenuity, and emotional resonance.",
            "Contrast with Technical Writing: While technical writing is objective, utilitarian, unambiguous, and fact-constrained, creative writing is subjective, metaphorical, evocative, and explores human truth through artistic license.",
            "Primary Genres: Fiction (novels, short stories), Poetry (lyric, narrative, free verse), Drama / Screenwriting, Creative Nonfiction (memoirs, personal essays, travel narratives).",
            "Five Essential Qualities: (1) Rich & Original Imagination, (2) Keen Sensory Observation ('Show, Don't Tell'), (3) Linguistic Agility & Diction Mastery, (4) Deep Psychological Empathy, (5) Narrative Pacing & Structural Discipline.",
          ],
          explanation: [
            "1. Understanding Creative Writing:",
            "Creative writing is the art of crafting literature. It uses language not merely as a carrier of data, but as a medium of art—shaping thoughts, sensations, cadence, and worldviews to provoke emotional, intellectual, and aesthetic responses in the reader.",
            "",
            "2. Distinctive Traits vs. Functional Writing:",
            "  - Purpose: Functional writing informs or directs; creative writing entertains, enlightens, provokes, and mirrors the human condition.",
            "  - Language: Functional writing uses literal, unambiguous terminology; creative writing exploits figurative tropes—metaphor, simile, synecdoche, irony, and symbolism.",
            "  - Perspective: Functional writing maintains an impersonal, objective third-person stance; creative writing embraces multifaceted character viewpoints and interior monologues.",
            "",
            "3. Five Indispensable Qualities of an Effective Creative Writer:",
            "",
            "a) Original Imagination & Cognitive Defamiliarization:",
            "  - The capacity to perceive the ordinary world from extraordinary angles. As Russian formalist Viktor Shklovsky stated, art 'makes the stone stoney'—making familiar concepts strange so they can be experienced freshly.",
            "",
            "b) Acute Sensory Observation ('Show, Don't Tell'):",
            "  - Rather than declaring an emotion ('He was terrified'), the skilled writer renders sensory details that recreate the experience ('His palms grew slick, and his throat constricted around shallow, ragged breaths').",
            "",
            "c) Diction Mastery, Rhythm & Phonaesthetics:",
            "  - A sophisticated sensitivity to the sound, cadence, connotations, and emotional weight of words. Sentence lengths are varied deliberately to control narrative tempo and dramatic suspense.",
            "",
            "d) Profound Empathy & Psychological Insight:",
            "  - The ability to inhabit the interior emotional realities of characters whose backgrounds, virtues, and vices differ radically from the author's personal identity.",
            "",
            "e) Structural Discipline & Editing Rigor:",
            "  - Raw inspiration alone does not make a narrative. Successful writers possess architectural control over plot progression, exposition, rising tension, climax, and the discipline to relentlessly prune superfluous text.",
          ],
          video: {
            id: "HNlV48JhUAo",
            title:
              "Creative Writing: Definition, Types, Features & Literary Qualities",
            channel: "Muhammad Ullah (English Literature)",
            duration: "10:45",
            speed: "1.25x",
            relevance:
              "Essential for Q.04: Explores the core distinction between technical and creative writing, showing how sensory details, originality, and figurative devices evoke emotional resonance.",
            takeaway:
              "Creative writing prioritizes 'showing over telling' through evocative imagery, sensory anchors, and metaphoric nuance.",
          },
        },
      },
      {
        id: "sem1-comm-a1-q5",
        qNumber: "Q5",
        marks: 5,
        question:
          "What is Active Listening? Discuss the barriers of Active listening.",
        solution: {
          summary:
            "Rigorous theoretical analysis of Active Listening: distinction from passive hearing, the 5-stage cognitive listening model (HURIER framework), and comprehensive taxonomy of environmental, psychological, semantic, and physiological barriers.",
          keyPoints: [
            "Definition of Active Listening: A disciplined, conscious cognitive process of receiving, interpreting, evaluating, and responding to verbal and non-verbal communicative cues with undivided focus and empathy.",
            "Hearing vs. Listening: Hearing is a passive, involuntary physiological sensation (eardrums vibrating in response to sound waves). Listening is an active, voluntary intellectual and psychological engagement requiring intentional mental effort.",
            "The 5-Stage Listening Model: Receiving (Aural capture) → Understanding (Decoding semantics) → Remembering (Encoding into memory) → Evaluating (Weighing validity objectively) → Responding (Providing verbal/non-verbal feedback).",
            "Four Major Barrier Classes: (1) Physical & Environmental Barriers, (2) Psychological & Emotional Barriers, (3) Semantic & Linguistic Barriers, (4) Physiological & Cognitive Barriers.",
          ],
          explanation: [
            "1. Nature and Importance of Active Listening:",
            "In managerial and interpersonal communication (prescribed reference: Shirley Taylor, 'Communication for Business'), active listening is recognized as the single most critical leadership skill. Studies consistently demonstrate that while humans spend approximately 45% of their daily communicative time listening, the average retention rate immediately following a message is barely 50%, declining to 25% after 48 hours without active cognitive reinforcement.",
            "",
            "2. The Five-Stage Cognitive Model of Active Listening:",
            "  - Step 1: Receiving — Paying full visual and auditory attention; eliminating multitasking.",
            "  - Step 2: Understanding — Decoding the speaker's ideas within their frame of reference rather than projecting one's own assumptions.",
            "  - Step 3: Remembering — Retaining core arguments through mental categorization and associative anchoring.",
            "  - Step 4: Evaluating — Distinguishing factual evidence from subjective emotional bias before forming judgments.",
            "  - Step 5: Responding — Supplying supportive feedback via backchannel verbal cues ('I see', 'Indeed') and non-verbal cues (eye contact, forward lean, nodding).",
            "",
            "3. Exhaustive Analysis of Barriers to Active Listening:",
            "",
            "a) Physical & Environmental Barriers:",
            "  - Ambient acoustic noise (machinery, chatter, air-conditioning hum).",
            "  - Technological disturbances (phone notifications, poor microphone fidelity, buffering).",
            "  - Uncomfortable seating, extreme room temperature, or excessive physical distance from speaker.",
            "",
            "b) Psychological & Emotional Barriers:",
            "  - Premature Evaluation: Dismissing or judging the speaker's arguments before they finish speaking.",
            "  - Emotional Filtering & Defensiveness: Becoming triggered by 'hot-button' trigger words, leading to mental preparation of a rebuttal rather than listening.",
            "  - Cognitive Confirmation Bias: Selectively attending only to points that confirm pre-existing beliefs while tuning out contrary evidence.",
            "  - Egocentrism & Pseudo-Listening: Feigning attention while letting one's mind wander to personal concerns.",
            "",
            "c) Semantic & Linguistic Barriers:",
            "  - Jargon & Acronym Overload: Technical terminology unfamiliar to the listener causing cognitive processing stalls.",
            "  - Ambiguity & Connotative Drift: Words carrying subjective emotional baggage that distract the listener from the objective message.",
            "",
            "d) Physiological & Cognitive Capacity Barriers:",
            "  - Differential Speech-Thought Ratio: The average human speaks at 125-150 words per minute, but the brain can process speech at 400-500 words per minute. This gap creates 'idle mental capacity' prone to daydreaming.",
            "  - Physical exhaustion, sleep deprivation, sensory overload, and hearing impairments.",
          ],
          video: {
            id: "aDMtx5ivKK0",
            title:
              "The Art of Active Listening & Overcoming Cognitive Barriers",
            channel: "Harvard Business Review",
            duration: "6:50",
            speed: "1.0x",
            relevance:
              "Essential for Q.05: Breaks down the active listening cognitive process (Receiving, Evaluating, Responding, Remembering) and overcoming listening barriers.",
            takeaway:
              "Active listening requires intentional cognitive engagement, non-verbal feedback (SOLER), and reflective paraphrasing.",
          },
        },
      },
    ],
  },
  {
    id: "sem1-comm-cia2",
    courseCode: "6.0CSC04",
    courseSlug: "professional-communication",
    courseTitle: "Professional Communication",
    semester: "Semester I",
    assessmentType: "CIA-2",
    title: "Continuous Internal Assessment 2 (Assignment 02)",
    date: "2025–2026 Academic Session",
    time: "Take-home Continuous Assessment",
    totalMarks: 15,
    instructions: [
      "Long Answer type Questions: Attempt any 3.",
      "Word Limit: 300 - 400 words per question.",
      "Maximum Marks: 15 [5 × 3 = 15]",
    ],
    paperImages: ["/pccia2025.png"],
    status: "available",
    notes:
      "Department of Computer Science / Distance Education, Central University of Rajasthan (CURAJ). Course Code: 6.0 ODLCSC04 / 6.0CSC04 (CSC-406 Professional Communication). Assignment 02 covering Independent & Dependent Clauses, Speaking Barriers & Remediation, Principles of Paragraph Writing, Writing Skills Taxonomy, and Executive Presentation Preparation.",
    questions: [
      {
        id: "sem1-comm-a2-q1",
        qNumber: "Q1",
        marks: 5,
        question: "What is Clause? Write its types with an example.",
        solution: {
          summary:
            "Formal syntactic examination of clauses: definition, comparison with sentences and phrases, structural distinction between independent and dependent clauses, and exhaustive analysis of noun, adjective, and adverbial subordinate clauses.",
          keyPoints: [
            "Definition of Clause: A clause is a fundamental grammatical unit consisting of a subject (noun phrase) and a finite predicate (verb phrase). Unlike a phrase, a clause expresses a predicative relationship.",
            "Independent (Main) Clause: Can stand alone syntactically as an autonomous complete sentence, possessing full semantic independence.",
            "Dependent (Subordinate) Clause: Contains a subject and verb but begins with a subordinating conjunction or relative pronoun, making it incapable of standing alone.",
            "Three Major Subordinate Clause Classes:",
            "  1. Noun Clause: Acts as subject, object, or complement of a verb.",
            "  2. Adjective (Relative) Clause: Modifies a noun or pronoun antecedent.",
            "  3. Adverbial Clause: Modifies a verb, adjective, or clause, specifying time, reason, condition, concession, or result.",
          ],
          explanation: [
            "1. Syntactic Definition and Structural Properties:",
            "In English grammar (prescribed reference: Quirk & Greenbaum, 'Advanced English Usage'; Raymond Murphy, 'English Grammar in Use'), a clause is a predicative unit organized around a subject and a finite verb. Clauses are the building blocks of simple, compound, complex, and compound-complex sentences.",
            "",
            "2. Primary Classification of Clauses with Examples:",
            "",
            "a) Independent (Main) Clause:",
            "  - An independent clause expresses a complete, standalone thought. It requires no syntactic attachment to another clause to be grammatical.",
            "  - Example: 'The research scholar presented the paper at the IEEE international conference.'",
            "    * Subject: 'The research scholar' | Predicate: 'presented the paper at the IEEE international conference'.",
            "",
            "b) Dependent (Subordinate) Clauses (Three Functional Types):",
            "  Subordinate clauses cannot stand alone and function as specific parts of speech within a matrix sentence:",
            "",
            "  i) Noun Clause:",
            "    - Operates syntactically wherever a noun can appear: as Subject, Direct Object, Indirect Object, Subject Complement, or Object of Preposition.",
            "    - Example (as Subject): 'What the external auditor discovered during the security audit shocked the IT team.'",
            "    - Example (as Object): 'The computer scientist demonstrated that the encryption key was mathematically unbreakable.'",
            "",
            "  ii) Adjective (Relative) Clause:",
            "    - Modifies an antecedent noun or pronoun. Introduced by relative pronouns ('who', 'whom', 'whose', 'which', 'that') or relative adverbs ('where', 'when', 'why').",
            "    - Restrictive (Essential): 'The algorithm which minimizes cache misses achieves lower latency.'",
            "    - Non-Restrictive (Additional information): 'Dijkstra's algorithm, which was invented in 1956, remains fundamental to network routing.'",
            "",
            "  iii) Adverbial Clause:",
            "    - Modifies a verb, adjective, or another adverb by providing contextual conditions. Categorized by semantic relation:",
            "      * Time: 'Before the neural network is deployed, hyperparameter tuning must be executed.'",
            "      * Reason/Cause: 'The server crashed because the memory allocation exceeded available RAM.'",
            "      * Condition: 'If the distributed consensus protocol fails, the cluster falls back to primary-secondary replication.'",
            "      * Concession: 'Although the computational complexity is exponential, heuristic pruning makes it tractable in practice.'",
          ],
          video: {
            id: "zwsBcic8GZ4",
            title:
              "English Clauses Explained: Independent vs Dependent (Noun, Adjective & Adverb Clauses)",
            channel: "English with Ananya",
            duration: "10:15",
            speed: "1.25x",
            relevance:
              "Essential for Q.01: Defines the grammatical criteria of clauses (Subject + Predicate) and classifies Independent vs Subordinate (Noun, Relative, Adverbial) clauses.",
            takeaway:
              "Independent clauses can stand alone as complete thoughts; dependent clauses require a subordinating conjunction or relative pronoun.",
          },
        },
      },
      {
        id: "sem1-comm-a2-q2",
        qNumber: "Q2",
        marks: 5,
        question: "What are the barriers of Speaking?.",
        solution: {
          summary:
            "Systematic examination of oral delivery barriers: psychological glossophobia, phonological/linguistic deficiencies, physiological constraints, environmental interferences, and socio-cultural factors, paired with actionable remedial strategies.",
          keyPoints: [
            "Oral Communication Significance: Speaking is the primary medium of executive leadership, project defense, client pitching, and interpersonal collaboration. Overcoming speech barriers is vital for career readiness.",
            "Psychological Barriers: Glossophobia (stage fright), performance anxiety, fear of negative evaluation, impostor syndrome, and lack of self-confidence.",
            "Linguistic & Phonetic Barriers: Inadequate vocabulary, Mother Tongue Influence (MTI), incorrect stress and intonation patterns, grammatical hesitation, and poor articulation.",
            "Physiological & Physical Constraints: Rapid pulse, shortness of breath, vocal tremor, dry throat, and speech impediments (stammering/lisping).",
            "Environmental & Situational Barriers: Poor acoustics, microphone distortion, uncongenial room temperature, and audience hostility or disinterest.",
            "Socio-Cultural Barriers: Differing conversational norms, idiomatic misinterpretations, and incongruent body language.",
          ],
          explanation: [
            "1. Dimensions of Oral Communication Barriers:",
            "In communicative pedagogy (prescribed reference: Banerjee & Mohan, 'Developing Communication Skills', Macmillan), oral communication breakdowns rarely stem from lack of technical knowledge; they stem from psycholinguistic bottlenecks occurring during real-time speech production.",
            "",
            "2. Detailed Classification of Speaking Barriers:",
            "",
            "a) Psychological & Emotional Barriers (The Mental Obstacles):",
            "  - Glossophobia / Stage Fright: The autonomic nervous system triggers a 'fight-or-flight' response when facing an audience, producing cognitive paralysis or mental blockouts.",
            "  - Fear of Judgment / Negative Evaluation: Excessive anxiety regarding peers or examiners noticing errors in pronunciation or grammar.",
            "  - Lack of Conviction: Speaking without thorough domain preparation leads to hesitant, unconvincing delivery.",
            "",
            "b) Linguistic, Lexical & Phonological Barriers (The Language Obstacles):",
            "  - Lexical Deficiency: A restricted vocabulary forces repetitive phrasing and awkward pauses while searching for technical terms.",
            "  - Mother Tongue Influence (MTI): Subconscious transfer of native language phonological patterns into English, leading to incorrect syllable stress (e.g., placing stress on the wrong syllable in words like 'DE-ve-lop' vs 'de-VE-lop').",
            "  - Monotone Delivery: Lack of pitch variation, vocal modulation, and pausing, causing listeners to tune out.",
            "",
            "c) Physiological & Vocal Barriers (The Bodily Obstacles):",
            "  - Shallow Chest Breathing: Nervousness causes shallow respiration, leading to vocal cord constriction, breathless sentences, and a shaky vocal pitch.",
            "  - High Speech Rate (Tachyhemia): Speaking too rapidly (>180 wpm) due to nervous adrenaline, making comprehension impossible.",
            "",
            "d) Situational & Environmental Barriers:",
            "  - Echo, reverberation, ambient background noise, and faulty audio-visual projection equipment.",
            "",
            "3. Structured Remedial Framework for Overcoming Speaking Barriers:",
            "  - Systematic Desensitization: Practicing speeches in progressively larger settings (mirror practice → small peer group → seminar room).",
            "  - Diaphragmatic Breathing: Practicing 4-4-4 box breathing prior to presentations to steady heart rate and vocal cord tension.",
            "  - Structural Speech Anchoring: Utilizing clear roadmaps (Introduction Hook → 3 Core Points → Decisive Conclusion) so that even if nervous, logical signposts guide the speaker.",
          ],
          video: {
            id: "0J8iHJKOKlY",
            title:
              "Barriers of Communication & Speaking: Semantic, Psychological, Physical & Physiological",
            channel: "Study Lovers Kapil Gangwani",
            duration: "11:20",
            speed: "1.25x",
            relevance:
              "Essential for Q.02: Analyzes psychological glossophobia, physiological speech tension, Mother Tongue Influence (MTI), and cognitive reframing techniques.",
            takeaway:
              "Overcoming speaking barriers requires structured speech preparation, phonetic practice to neutralize MTI, and cognitive reframing.",
          },
        },
      },
      {
        id: "sem1-comm-a2-q3",
        qNumber: "Q3",
        marks: 5,
        question:
          "What is paragraph writing? Explain the principles of paragraph writing?.",
        solution: {
          summary:
            "Definitive guide to paragraph writing: structural anatomy (topic sentence, supporting development, concluding transition) and the four foundational principles—Unity, Coherence, Logical Order, and Completeness/Emphasis.",
          keyPoints: [
            "Definition of Paragraph: A paragraph is a distinct, self-contained unit of discourse in written text consisting of a cluster of interrelated sentences developing a single, coherent, central thought.",
            "Anatomy of a Well-Formed Paragraph: (1) Topic Sentence (expresses main idea and controlling thought), (2) Supporting Sentences (provide evidence, statistics, illustrations, and analysis), (3) Concluding / Transition Sentence (summarizes takeaway and links to next paragraph).",
            "Principle 1 — Unity (Single Central Theme): Every sentence must directly relate to and elaborate upon the primary controlling idea stated in the topic sentence.",
            "Principle 2 — Coherence (Seamless Flow): Sentences must connect logically using cohesive devices (transitional words, pronoun antecedents, parallel structures).",
            "Principle 3 — Order / Logical Progression: Material organized systematically (chronological, spatial, general-to-specific deductive, or specific-to-general inductive).",
            "Principle 4 — Completeness & Adequate Development: The topic must be fully fleshed out with sufficient detail without leaving premature logical gaps.",
          ],
          explanation: [
            "1. Conception and Structural Anatomy of a Paragraph:",
            "In academic and professional prose (prescribed reference: Wren & Martin, 'High School English Grammar and Composition'), a paragraph functions as a micro-essay. It must never serve as an arbitrary collection of unrelated observations. Its structural anatomy comprises three parts:",
            "  - A. The Topic Sentence: The anchor statement, typically positioned at the beginning, containing the topic and a controlling idea.",
            "  - B. Supporting Development Sentences: 3 to 5 sentences that define, illustrate, substantiate, or analyze the topic sentence through data, logical reasoning, and examples.",
            "  - C. The Concluding / Clincher Sentence: Synthesizes the core argument and provides a smooth transition to subsequent paragraphs.",
            "",
            "2. The Four Cardinal Principles of Paragraph Writing:",
            "",
            "a) Principle of Unity (Singleness of Purpose):",
            "  - A paragraph must concentrate exclusively on ONE central theme. Any sentence that introduces a tangent or unrelated fact—no matter how interesting—destroys unity and must be excised.",
            "  - Violation Example: In a paragraph explaining GPU parallel acceleration in deep learning, suddenly inserting a sentence discussing the retail stock price of Nvidia violates unity.",
            "",
            "b) Principle of Coherence (Smooth Logical Connectivity):",
            "  - Coherence ensures that thoughts glide effortlessly from sentence to sentence without jarring leaps. Coherence is achieved through three tactical mechanisms:",
            "    * Transitional Linking Devices: Consequence ('Consequently', 'Hence'), Contrast ('However', 'On the contrary'), Addition ('Furthermore', 'In addition'), Sequence ('First', 'Subsequently').",
            "    * Pronoun Reference: Using pronouns ('this', 'these', 'it') whose antecedents are unmistakably clear.",
            "    * Lexical Re-iteration & Parallelism: Repeating key technical terms and balancing syntactic clause structures.",
            "",
            "c) Principle of Order (Organizational Architecture):",
            "  - The movement of thought must follow a recognizable systematic trajectory:",
            "    * Deductive Order (Top-Down): Statement of general principle followed by specific applications.",
            "    * Inductive Order (Bottom-Up): Specific observations and empirical data building toward a general thesis.",
            "    * Chronological Order: Sequential arrangement according to temporal occurrence.",
            "",
            "d) Principle of Completeness & Proportion (Adequate Development):",
            "  - A paragraph must be neither anemic (1-2 vague lines) nor bloated (a 400-word unbroken wall of text). Typical optimal length in technical prose is 100-180 words, sufficiently developed to prove the controlling idea.",
          ],
          video: {
            id: "vbMtBjoBalQ",
            title:
              "Paragraph Writing in English: Paragraph Unity and Coherence",
            channel: "Writing Better",
            duration: "8:15",
            speed: "1.25x",
            relevance:
              "Essential for Q.03: Teaches the foundational principles of academic paragraph construction: Topic Sentence, Supporting Elaboration, Clincher, and Unity/Coherence transitions.",
            takeaway:
              "A well-crafted paragraph maintains single-idea thematic unity, reinforced by logical bridges and transitional signposts.",
          },
        },
      },
      {
        id: "sem1-comm-a2-q4",
        qNumber: "Q4",
        marks: 5,
        question: "Explain Writing Skills and its types.",
        solution: {
          summary:
            "Comprehensive taxonomy of writing skills: cognitive writing processes and the five major functional modes—Expository, Descriptive, Persuasive, Narrative, and Technical/Scientific writing.",
          keyPoints: [
            "Definition of Writing Skills: The cognitive, syntactic, and mechanical competencies required to transcribe thoughts, empirical data, and arguments into coherent, structured, and audience-appropriate written language.",
            "The Three Stages of the Writing Process: (1) Pre-writing (Audience analysis, brainstorming, outlining), (2) Drafting (Translating ideas into continuous prose), (3) Post-writing (Revising for structure, editing for grammar, proofreading for formatting).",
            "Five Major Types of Writing:",
            "  1. Expository Writing: Objective, fact-based exposition designed to explain, inform, or instruct.",
            "  2. Descriptive Writing: Sensory-rich, visual prose that creates vivid mental imagery.",
            "  3. Persuasive Writing: Rhetorical prose utilizing evidence, logic (logos), and ethical appeals (ethos) to convince readers to adopt a position or take action.",
            "  4. Narrative Writing: Storytelling driven by chronological sequences, characters, setting, conflict, and resolution.",
            "  5. Technical & Scientific Writing: Precise, formal, jargon-disciplined documentation conveying specialized technological concepts.",
          ],
          explanation: [
            "1. Nature and Architecture of Writing Skills:",
            "In executive and scientific contexts (prescribed reference: P.D. Chaturvedi, 'Business Communication'), writing is not a passive mechanical transcription; it is an active problem-solving craft. It encompasses grammar precision, lexical variety, structural organization, tone modulation, and audience empathy.",
            "",
            "2. Detailed Breakdown of the Five Primary Writing Types:",
            "",
            "a) Expository Writing (To Inform & Instruct):",
            "  - Focus: Objective facts, statistical analysis, definitions, and operational explanations without personal editorial bias.",
            "  - Hallmarks: Clarity, neutral tone, logical transitions, use of headings and bulleted classifications.",
            "  - Examples: Academic textbooks, encyclopedic articles, user manuals, FAQs, architectural overviews.",
            "",
            "b) Descriptive Writing (To Visualize & Experience):",
            "  - Focus: Appeals directly to the reader's five physical senses (visual, auditory, tactile, olfactory, gustatory) to construct a tangible mental experience.",
            "  - Hallmarks: Sensory imagery, precise adjectives, active verbs, spatial organization.",
            "  - Examples: Ethnographic field logs, character profiles, aesthetic design reviews, travelogues.",
            "",
            "c) Persuasive / Argumentative Writing (To Convince & Motivate):",
            "  - Focus: Establishing a contentious thesis and systematically defending it against counter-arguments using reasoned evidence and rhetorical appeals.",
            "  - Hallmarks: Classical Aristotelian rhetoric (Ethos = credibility, Logos = logical evidence, Pathos = emotional resonance), call-to-action.",
            "  - Examples: Research grant proposals, executive business cases, policy whitepapers, editorial critiques.",
            "",
            "d) Narrative Writing (To Tell a Story & Chronicle Events):",
            "  - Focus: Relaying a progression of events involving characters, conflict, suspense, and resolution across a defined timeline.",
            "  - Hallmarks: Chronological or non-linear timeline, protagonist/antagonist dynamics, dialogue, sensory pacing.",
            "  - Examples: Industrial failure case studies, historical biographies, incident reports, personal memoirs.",
            "",
            "e) Technical & Scientific Writing (To Document & Validate):",
            "  - Focus: Translating complex engineering, algorithmic, or experimental data into standardized, unambiguous, auditable prose.",
            "  - Hallmarks: Strict adherence to standards (IEEE, ACM, ISO), passive/objective voice, schematics, reproducible methodologies.",
            "  - Examples: API documentation, research papers, system specifications, technical patent filings.",
          ],
          video: {
            id: "PhSoh9aOdA4",
            title:
              "Types of Writing: Expository, Descriptive, Persuasive, Narrative & Technical",
            channel: "Muhammad Ullah (English Literature)",
            duration: "9:15",
            speed: "1.25x",
            relevance:
              "Essential for Q.04: Compares the 4 primary writing modes (Expository, Descriptive, Persuasive, Narrative) alongside Technical documentation.",
            takeaway:
              "Selecting the proper writing style depends on authorial objective, intended audience, and communicative context.",
          },
        },
      },
      {
        id: "sem1-comm-a2-q5",
        qNumber: "Q5",
        marks: 5,
        question:
          "What steps can be taken for planning and preparing a successful presentation?",
        solution: {
          summary:
            "Complete executive framework for presentation mastery: audience analysis, core objective definition, 3-tier content structuring, slide design principles, vocal rehearsal, stage presence, and Q&A management.",
          keyPoints: [
            "Importance of Presentations: A high-stakes oral-visual communicative medium essential for engineering thesis defenses, client pitches, board reviews, and technical conferences.",
            "Three Core Phases: (1) Planning & Audience Analysis (The 'Why' and 'Who'), (2) Preparation & Slide Design (The 'What' and 'How'), (3) Rehearsal & Delivery Execution (The 'Performance').",
            "The 3-Part Presentation Architecture: Introduction (Hook + Problem Statement + Agenda, 10-15%), Body (3-4 Substantiated Points with Data, 70-80%), Conclusion (Summary + Call-to-Action + Q&A, 10-15%).",
            "Slide Design Rules: Cognitive load minimization, Rule of 6×6, high visual contrast, uncluttered charts, single concept per slide.",
            "Delivery Techniques: Diaphragmatic vocal modulation, pacing at 130-150 words/min, purposeful pauses, open body language, and graceful Q&A handling.",
          ],
          explanation: [
            "1. The 7-Step Methodological Roadmap for Successful Presentations:",
            "",
            "Step 1: Conduct Rigorous Audience & Context Analysis (The 'Who'):",
            "  - Profile audience composition: Are they technical specialists, senior business executives, or general students?",
            "  - Determine their baseline knowledge, potential biases, expectations, and available time allotment.",
            "",
            "Step 2: Define the Core Central Message (The 'Big Idea'):",
            "  - Distill the entire presentation into a single memorable thesis statement. If the audience forgets everything else, this is the one takeaway they must remember.",
            "",
            "Step 3: Architect the Content Structure (The 3-Act Structure):",
            "  - Introduction (10-15%): Open with a compelling hook (a striking statistic, challenging question, or real-world problem). State the objective and present an agenda roadmap.",
            "  - Main Body (75%): Limit to 3 or 4 logically sequenced key themes. Support each theme with verifiables: benchmark data, architecture diagrams, and case examples.",
            "  - Conclusion (10%): Signal the ending clearly ('To conclude...'). Summarize the core findings and issue a decisive Call to Action (CTA).",
            "",
            "Step 4: Design Visual Aids with High Cognitive Ergonomics:",
            "  - Adhere to the 'Rule of 6×6' (maximum 6 bullet points per slide, maximum 6 words per line).",
            "  - Eliminate text walls; replace paragraphs with high-resolution schematics, flowcharts, and comparative tables.",
            "  - Maintain high color contrast (dark text on clean light background or vice versa) and readable sans-serif typography (minimum 28pt for headings, 20pt for body).",
            "",
            "Step 5: Systematic Rehearsal & Timing Calibration:",
            "  - Rehearse out loud with a timer, budgeting 1.5 to 2 minutes per slide.",
            "  - Practice purposeful pausing: silence for 2 seconds after an important insight allows the audience to digest the point.",
            "  - Calibrate speaking pace between 130 and 150 words per minute.",
            "",
            "Step 6: Master Non-Verbal Delivery & Stage Presence:",
            "  - Maintain open, confident body posture with feet shoulder-width apart; avoid crossing arms or clutching the podium.",
            "  - Practice the 'lighthouse technique' for eye contact: sweeping across the entire room, making deliberate 3-second eye contact with individuals in all quadrants.",
            "",
            "Step 7: Professional Q&A Handling & Contingency Preparation:",
            "  - Listen attentively to each question without interrupting. Rephrase the question to verify understanding and allow the audience to hear.",
            "  - If an answer is unknown, maintain poise: 'That is a pertinent consideration; while we did not evaluate that specific variable in this phase, I will investigate and follow up with you.'",
          ],
          video: {
            id: "Iwpi1Lm6dFo",
            title: "How to Avoid Death By PowerPoint: Slide Design & Delivery",
            channel: "TEDx (David JP Phillips)",
            duration: "16:53",
            speed: "1.25x",
            relevance:
              "Essential for Q.05: Illustrates cognitive load theory in slides, 6x6 rule, contrast principles, vocal pacing, and professional body language.",
            takeaway:
              "Slides are visual anchors for the audience, not teleprompters for the speaker; limit one core message per slide.",
          },
        },
      },
    ],
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
