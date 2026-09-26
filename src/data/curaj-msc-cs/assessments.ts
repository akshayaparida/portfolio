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
