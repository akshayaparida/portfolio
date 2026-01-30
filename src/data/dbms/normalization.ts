import { LearningModule } from "@/types/learning";

export const normalizationModule: LearningModule = {
  id: "normalization",
  title: "Normalization & Functional Dependencies",
  description:
    "1NF to BCNF, functional dependencies, decomposition, and database design",
  status: "in-progress",
  detailedContent: `# Normalization & Functional Dependencies

Normalization is the process of organizing data to reduce redundancy and improve data integrity. Understanding functional dependencies is key to mastering normalization.

## What You'll Learn

| # | Topic | Skill |
|:--|:------|:------|
| 1 | **Functional Dependencies** | Identify FDs, Armstrong's Axioms |
| 2 | **Keys** | Candidate keys, super keys from FDs |
| 3 | **Normal Forms** | 1NF → 2NF → 3NF → BCNF |
| 4 | **Decomposition** | Lossless join, dependency preservation |
| 5 | **Higher Normal Forms** | 4NF, 5NF (overview) |

---

## 1. Functional Dependencies

**Definition:** A functional dependency X → Y means that the value of X uniquely determines the value of Y.

\`\`\`text path=null start=null
X → Y (X determines Y)
"If two tuples have the same value for X, 
 they MUST have the same value for Y"

Example: Student table
student_id → name, email, dept_id
(student_id determines all other attributes)

email → student_id, name
(email also uniquely identifies a student)
\`\`\`

**Types of Functional Dependencies:**

| Type | Definition | Example |
|:-----|:-----------|:--------|
| Trivial | Y ⊆ X (RHS is subset of LHS) | {A, B} → A |
| Non-trivial | Y ⊄ X | A → B |
| Fully Functional | No proper subset of X determines Y | {A, B} → C (neither A→C nor B→C) |
| Partial Dependency | Proper subset of X determines Y | {A, B} → C where A→C |
| Transitive | X→Y and Y→Z implies X→Z | |

**Armstrong's Axioms:**

\`\`\`text path=null start=null
Primary Axioms (Sound and Complete):

1. Reflexivity: If Y ⊆ X, then X → Y
   Example: {A, B} → A

2. Augmentation: If X → Y, then XZ → YZ
   Example: If A → B, then AC → BC

3. Transitivity: If X → Y and Y → Z, then X → Z
   Example: If A → B and B → C, then A → C

Derived Rules:

4. Union: If X → Y and X → Z, then X → YZ
5. Decomposition: If X → YZ, then X → Y and X → Z
6. Pseudotransitivity: If X → Y and WY → Z, then WX → Z
\`\`\`

**Finding Closure of Attributes:**

\`\`\`python path=null start=null
# Closure of X (denoted X+) = All attributes determined by X

def closure(X, FDs):
    """
    Find closure of attribute set X given functional dependencies
    """
    result = set(X)
    changed = True
    
    while changed:
        changed = False
        for lhs, rhs in FDs:
            if lhs.issubset(result) and not rhs.issubset(result):
                result = result.union(rhs)
                changed = True
    
    return result

# Example:
# R(A, B, C, D, E)
# FDs: A → BC, B → D, CD → E

# Find A+:
# A+ = {A}           (start)
# A+ = {A, B, C}     (apply A → BC)
# A+ = {A, B, C, D}  (apply B → D)
# A+ = {A, B, C, D, E} (apply CD → E)

# A+ contains all attributes → A is a candidate key!
\`\`\`

---

## 2. Finding Candidate Keys

**Algorithm to Find Candidate Keys:**

\`\`\`python path=null start=null
# Step 1: Categorize attributes
# - L: Appears only on LEFT side of FDs → MUST be in every key
# - R: Appears only on RIGHT side → NEVER in any key
# - LR: Appears on both sides → MAY be in key
# - N: Appears in neither → MUST be in every key

# Step 2: Start with L ∪ N attributes
# Step 3: If closure = all attributes → candidate key found
# Step 4: If not, add LR attributes one by one

# Example:
# R(A, B, C, D, E)
# FDs: A → BC, CD → E, B → D

# Categorize:
# L = {A, C} (only on left)
# R = {E} (only on right)
# LR = {B, D} (both sides)

# Start with L = {A, C}
# (AC)+ = {A, C, B, D, E} = All attributes
# AC is a candidate key!

# Continue to find more keys...
# Try replacing C with other combinations
\`\`\`

**Key Terminology:**

| Term | Definition |
|:-----|:-----------|
| Super Key | Any set of attributes that determines all attributes |
| Candidate Key | Minimal super key (no proper subset is a super key) |
| Primary Key | Chosen candidate key |
| Prime Attribute | Attribute that is part of ANY candidate key |
| Non-prime Attribute | Attribute not part of any candidate key |

---

## 3. Normal Forms

### First Normal Form (1NF)

**Rule:** All attributes must be atomic (no multi-valued or composite attributes).

\`\`\`sql path=null start=null
-- NOT in 1NF (multi-valued attribute)
| student_id | name  | phone_numbers      |
|------------|-------|-------------------|
| 1          | Alice | 1234567, 9876543  |  ← Violates 1NF

-- Converted to 1NF
| student_id | name  | phone_number |
|------------|-------|--------------|
| 1          | Alice | 1234567      |
| 1          | Alice | 9876543      |

-- Or better: separate table
Student(student_id, name)
StudentPhone(student_id, phone_number)  -- FK to Student
\`\`\`

---

### Second Normal Form (2NF)

**Rule:** 1NF + No partial dependencies (non-prime attributes fully depend on entire candidate key).

\`\`\`text path=null start=null
Partial Dependency: Part of candidate key determines non-prime attribute

Example NOT in 2NF:
Enrollment(student_id, course_id, student_name, course_name, grade)
Candidate Key: {student_id, course_id}

FDs:
student_id → student_name        ← PARTIAL (violates 2NF)
course_id → course_name          ← PARTIAL (violates 2NF)
student_id, course_id → grade    ← OK (full dependency)

Decomposition to 2NF:
Student(student_id, student_name)
Course(course_id, course_name)
Enrollment(student_id, course_id, grade)
\`\`\`

---

### Third Normal Form (3NF)

**Rule:** 2NF + No transitive dependencies (non-prime → non-prime).

\`\`\`text path=null start=null
Transitive Dependency: X → Y → Z where Y is not a candidate key

Example NOT in 3NF:
Student(student_id, name, dept_id, dept_name)
Candidate Key: {student_id}

FDs:
student_id → dept_id     ← OK
dept_id → dept_name      ← TRANSITIVE (violates 3NF)
(student_id → dept_id → dept_name)

Decomposition to 3NF:
Student(student_id, name, dept_id)
Department(dept_id, dept_name)
\`\`\`

**Formal 3NF Definition:**
For every non-trivial FD X → A:
- X is a superkey, OR
- A is a prime attribute

---

### Boyce-Codd Normal Form (BCNF)

**Rule:** For every non-trivial FD X → Y, X must be a superkey.

\`\`\`text path=null start=null
BCNF is stricter than 3NF:
- 3NF: X is superkey OR A is prime
- BCNF: X MUST be superkey (no exception)

Example in 3NF but NOT in BCNF:
Teaches(student_id, subject, teacher)
Candidate Keys: {student_id, subject}

FDs:
student_id, subject → teacher    ← OK
teacher → subject                ← Violates BCNF (teacher not superkey)

But it's in 3NF because 'subject' is a prime attribute!

Decomposition to BCNF:
TeacherSubject(teacher, subject)
StudentTeacher(student_id, teacher)
\`\`\`

**3NF vs BCNF Example:**

\`\`\`python path=null start=null
# R(A, B, C)
# FDs: AB → C, C → B

# Candidate Keys: AB, AC

# Check 3NF:
# AB → C: AB is superkey
# C → B: C not superkey, but B is prime
# Result: In 3NF

# Check BCNF:
# AB → C: AB is superkey
# C → B: C is NOT superkey
# Result: NOT in BCNF

# BCNF Decomposition:
# R1(C, B)  - from C → B
# R2(A, C)  - remaining
\`\`\`

---

## 4. Decomposition Properties

**Lossless Join Decomposition:**
No information is lost when decomposing.

\`\`\`text path=null start=null
R decomposed into R1 and R2 is lossless if:
R1 ∩ R2 → R1  OR  R1 ∩ R2 → R2

In other words: Common attributes must be a key in at least one table.

Example:
R(A, B, C) with A → B
Decompose to: R1(A, B), R2(A, C)
Common: A
A → B means A is key of R1
Lossless!
\`\`\`

**Dependency Preservation:**
All original FDs can be checked using the decomposed tables.

\`\`\`text path=null start=null
FDs are preserved if:
Union of FDs in each sub-relation = Original FDs (or covers them)

Sometimes BCNF decomposition loses dependency preservation!

Example:
R(A, B, C) with FDs: AB → C, C → B
BCNF decomposition: R1(C, B), R2(A, C)
FD AB → C cannot be verified from R1 or R2 alone!
\`\`\`

---

## 5. Higher Normal Forms (Overview)

### Fourth Normal Form (4NF)

**Deals with Multi-valued Dependencies (MVD):**

\`\`\`text path=null start=null
Multi-valued Dependency: X →→ Y
"X multi-determines Y independently of other attributes"

Example NOT in 4NF:
Employee(emp_id, skill, hobby)
emp_id →→ skill (employee has many skills)
emp_id →→ hobby (employee has many hobbies)

These are independent! Creates redundancy:
| emp_id | skill  | hobby     |
|--------|--------|-----------|
| 1      | Java   | Reading   |
| 1      | Java   | Chess     |
| 1      | Python | Reading   |
| 1      | Python | Chess     |

4NF Decomposition:
EmpSkill(emp_id, skill)
EmpHobby(emp_id, hobby)
\`\`\`

### Fifth Normal Form (5NF)

Deals with Join Dependencies. Very rare in practice.

---

## Summary Table

| NF | Requirement | Fixes |
|:---|:------------|:------|
| 1NF | Atomic values | Multi-valued attributes |
| 2NF | 1NF + No partial dependencies | Partial key → non-prime |
| 3NF | 2NF + No transitive dependencies | Non-prime → non-prime |
| BCNF | Every determinant is superkey | All anomalies from FDs |
| 4NF | BCNF + No multi-valued dependencies | Independent MVDs |

---

## TL;DR - Quick Reference

| Concept | Key Point |
|:--------|:----------|
| X → Y | X determines Y (same X = same Y) |
| Closure X+ | All attributes determined by X |
| Candidate Key | Minimal set whose closure = all attrs |
| 1NF | No multi-valued/composite attributes |
| 2NF | No partial dependencies |
| 3NF | No transitive dependencies |
| BCNF | Every LHS of FD is superkey |
| Lossless | R1 ∩ R2 is key of R1 or R2 |

---

## Resources

- [Normalization Tutorial - GeeksforGeeks](https://www.geeksforgeeks.org/normal-forms-in-dbms/)
- [Database Normalization Explained](https://www.essentialsql.com/get-ready-to-learn-sql-database-normalization-explained-in-simple-english/)
- [GATE DBMS Previous Year Questions](https://www.geeksforgeeks.org/dbms-gq/)
    `,
  subModules: [],
  practiceQuiz: [
    {
      id: "norm-q1",
      question: "A relation is in 2NF if it is in 1NF and has no:",
      options: [
        "Transitive dependencies",
        "Partial dependencies",
        "Multi-valued dependencies",
        "Join dependencies",
      ],
      correctAnswer: 1,
      explanation:
        "Normal Form Requirements:\\n\\n• 1NF: Atomic values\\n• 2NF: 1NF + No partial dependencies\\n• 3NF: 2NF + No transitive dependencies\\n\\nPartial = Part of key determines non-prime attribute",
      difficulty: "easy",
    },
    {
      id: "norm-q2",
      question: "In BCNF, for every FD X → Y:",
      options: [
        "Y must be prime",
        "X must be superkey",
        "Both X and Y must be prime",
        "X must be candidate key",
      ],
      correctAnswer: 1,
      explanation:
        "BCNF Rule:\\n\\nFor every non-trivial FD X → Y:\\n• X MUST be a superkey\\n\\n3NF allows: X is superkey OR Y is prime\\nBCNF is stricter - no exception for prime attributes",
      difficulty: "medium",
    },
    {
      id: "norm-q3",
      question: "Given R(A,B,C,D) with FDs: A→B, B→C. The candidate key is:",
      options: ["{A, D}", "{A}", "{A, B}", "{B, D}"],
      correctAnswer: 0,
      explanation:
        "Finding Candidate Key:\\n\\n• A→B, B→C (so A→B→C)\\n• A determines B, C but NOT D\\n• D appears nowhere on RHS\\n• Must include D\\n\\n{A, D}+ = {A, D, B, C} = All attributes",
      difficulty: "medium",
    },
    {
      id: "norm-q4",
      question:
        "Which decomposition property ensures no data loss when rejoining tables?",
      options: [
        "Dependency Preservation",
        "Lossless Join",
        "Minimal Cover",
        "Canonical Form",
      ],
      correctAnswer: 1,
      explanation:
        "Decomposition Properties:\\n\\n• Lossless Join: Original table can be reconstructed exactly by natural join\\n\\n• Dependency Preservation: All FDs can be checked locally\\n\\nBCNF may sacrifice dependency preservation for lossless join.",
      difficulty: "easy",
    },
    {
      id: "norm-q5",
      question: "If R1 ∩ R2 is a key of R1, the decomposition is:",
      options: ["Dependency Preserving", "Lossless", "In BCNF", "In 3NF"],
      correctAnswer: 1,
      explanation:
        "Lossless Join Test:\\n\\nFor R → R1, R2:\\n• Find common attributes: R1 ∩ R2\\n• If (R1 ∩ R2) → R1 or (R1 ∩ R2) → R2\\n• Then decomposition is LOSSLESS\\n\\nCommon must be key of at least one table!",
      difficulty: "hard",
    },
    {
      id: "norm-q6",
      question: "A table with composite primary key violates 2NF when:",
      options: [
        "Any attribute depends on full key",
        "Part of key determines non-key attribute",
        "Key determines all attributes",
        "Table has null values",
      ],
      correctAnswer: 1,
      explanation:
        "2NF Violation = Partial Dependency\\n\\n• Key = {A, B}\\n• If A → C (where C is non-prime)\\n• This is partial dependency!\\n\\nFix: Move A, C to separate table.",
      difficulty: "medium",
    },
    {
      id: "norm-q7",
      question: "Transitive dependency X→Y→Z violates which normal form?",
      options: ["1NF", "2NF", "3NF", "BCNF only"],
      correctAnswer: 2,
      explanation:
        "Transitive Dependency:\\n\\n• X → Y → Z (where Y is not a candidate key)\\n• Violates 3NF (and therefore BCNF)\\n\\nExample: student_id → dept_id → dept_name\\nFix: Create separate Department table.",
      difficulty: "easy",
    },
    {
      id: "norm-q8",
      question: "Armstrong's augmentation axiom states:",
      options: [
        "If X→Y, then X→XY",
        "If X→Y, then XZ→YZ",
        "If X→Y and Y→Z, then X→Z",
        "If X→YZ, then X→Y",
      ],
      correctAnswer: 1,
      explanation:
        "Armstrong's Axioms:\\n\\n• Reflexivity: If Y⊆X, then X→Y\\n• Augmentation: If X→Y, then XZ→YZ\\n• Transitivity: If X→Y and Y→Z, then X→Z\\n\\nDerived: Union, Decomposition, Pseudotransitivity",
      difficulty: "medium",
    },
    {
      id: "norm-q9",
      question: "A relation in 3NF but not in BCNF exists when:",
      options: [
        "Key has multiple attributes",
        "Prime attribute depends on non-superkey",
        "No transitive dependencies exist",
        "All determinants are candidate keys",
      ],
      correctAnswer: 1,
      explanation:
        "3NF vs BCNF Gap:\\n\\n• 3NF allows: A (prime attr) depends on X (non-superkey)\\n• BCNF doesn't allow this!\\n\\nExample: R(A,B,C), Keys: AB, AC\\nFD: C→B violates BCNF but not 3NF (B is prime)",
      difficulty: "hard",
    },
    {
      id: "norm-q10",
      question: "4NF deals with:",
      options: [
        "Functional dependencies",
        "Multi-valued dependencies",
        "Join dependencies",
        "Transitive dependencies",
      ],
      correctAnswer: 1,
      explanation:
        "Higher Normal Forms:\\n\\n• 4NF: Handles multi-valued dependencies (MVD)\\n  X →→ Y means X multi-determines Y independently\\n\\n• 5NF: Handles join dependencies\\n\\nMost practical databases aim for 3NF or BCNF.",
      difficulty: "medium",
    },
  ],
};
