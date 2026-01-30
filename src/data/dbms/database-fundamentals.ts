import { LearningModule } from "@/types/learning";

export const databaseFundamentalsModule: LearningModule = {
  id: "database-fundamentals",
  title: "Database Fundamentals & ER Model",
  description:
    "Introduction to DBMS, ER diagrams, relational model, and schema design",
  status: "in-progress",
  detailedContent: `# Database Fundamentals & ER Model

Databases are organized collections of data that allow efficient storage, retrieval, and management of information. This module covers foundational concepts essential for CUET PG and data engineering roles.

## What You'll Learn

| # | Topic | Skill |
|:--|:------|:------|
| 1 | **Database Concepts** | DBMS vs File System, data independence |
| 2 | **ER Model** | Entities, attributes, relationships |
| 3 | **EER Model** | Generalization, specialization, aggregation |
| 4 | **Relational Model** | Tables, keys, constraints |
| 5 | **Schema Design** | ER to Relational mapping |

---

## 1. Introduction to Databases

**What is a Database?**
A database is an organized collection of structured data stored electronically. A **Database Management System (DBMS)** is software that manages this data.

**DBMS vs File System:**

| Aspect | File System | DBMS |
|:-------|:------------|:-----|
| Data Redundancy | High | Minimal (controlled) |
| Data Integrity | Manual enforcement | Automatic constraints |
| Concurrency | No support | Built-in support |
| Security | OS-level | Fine-grained access control |
| Data Independence | None | Logical & Physical |
| Recovery | Manual backups | Automatic crash recovery |

**Three-Schema Architecture:**

\`\`\`text path=null start=null
External Level (View Schema)
    ↓ Logical Data Independence
Conceptual Level (Logical Schema)
    ↓ Physical Data Independence  
Internal Level (Physical Schema)
\`\`\`

- **External Schema**: User views, customized for different users
- **Conceptual Schema**: Logical structure of entire database
- **Internal Schema**: Physical storage structure

**Data Independence:**
- **Logical**: Changes to conceptual schema don't affect external views
- **Physical**: Changes to physical storage don't affect logical schema

---

## 2. Entity-Relationship (ER) Model

**ER Model** is a high-level conceptual data model used to describe the database structure graphically.

**Core Components:**

\`\`\`text path=null start=null
┌─────────────────────────────────────────────────┐
│               ER DIAGRAM SYMBOLS                │
├─────────────────────────────────────────────────┤
│  ┌───────┐                                      │
│  │       │  Rectangle = Entity                  │
│  └───────┘                                      │
│                                                 │
│     ○      Ellipse = Attribute                  │
│                                                 │
│     ◇      Diamond = Relationship               │
│                                                 │
│    ___     Underline = Primary Key              │
│                                                 │
│    (-)     Dashed Ellipse = Derived Attribute   │
│                                                 │
│   {  }     Double Ellipse = Multivalued Attr    │
└─────────────────────────────────────────────────┘
\`\`\`

**Attribute Types:**

| Type | Description | Example |
|:-----|:------------|:--------|
| Simple | Atomic, cannot be divided | First Name |
| Composite | Can be divided | Full Name (First + Last) |
| Single-valued | One value per entity | Date of Birth |
| Multi-valued | Multiple values | Phone Numbers |
| Derived | Calculated from other attributes | Age (from DOB) |
| Key | Uniquely identifies entity | Employee ID |

**Example: University Database ER**

\`\`\`python path=null start=null
# Entity: STUDENT
# Attributes: student_id (PK), name, email, dob, age (derived)

# Entity: COURSE  
# Attributes: course_id (PK), course_name, credits

# Relationship: ENROLLS
# Student <--(enrolls)--> Course
# Cardinality: Many-to-Many (M:N)
# A student can enroll in many courses
# A course can have many students

# Relationship Attributes:
# enrollment_date, grade
\`\`\`

**Relationship Types:**

\`\`\`text path=null start=null
1:1 (One-to-One)
┌───────┐      ┌───────┐
│ Person │──────│ Passport│
└───────┘      └───────┘
One person has exactly one passport

1:N (One-to-Many)
┌───────┐      ┌───────┐
│ Dept  │──────<│ Employee│
└───────┘      └───────┘
One department has many employees

M:N (Many-to-Many)
┌───────┐>─────<┌───────┐
│Student│      │ Course │
└───────┘      └───────┘
Many students enroll in many courses
\`\`\`

**Participation Constraints:**
- **Total (Mandatory)**: Every entity must participate (double line)
- **Partial (Optional)**: Participation is optional (single line)

---

## 3. Enhanced ER (EER) Model

**Generalization:**
Bottom-up approach - combine similar entities into a higher-level entity.

\`\`\`text path=null start=null
        ┌─────────┐
        │ VEHICLE │  ← Generalized Entity
        └────┬────┘
             │
    ┌────────┼────────┐
    ↓        ↓        ↓
┌─────┐  ┌─────┐  ┌─────┐
│ Car │  │ Truck│  │ Bike │
└─────┘  └─────┘  └─────┘
\`\`\`

**Specialization:**
Top-down approach - create specialized sub-entities from general entity.

\`\`\`text path=null start=null
        ┌──────────┐
        │ EMPLOYEE │  ← Superclass
        └────┬─────┘
             │ is-a
    ┌────────┼────────┐
    ↓        ↓        ↓
┌───────┐ ┌───────┐ ┌───────┐
│ Manager│ │Engineer│ │ Intern │
└───────┘ └───────┘ └───────┘
            ↑ Subclasses
\`\`\`

**Aggregation:**
Treating a relationship as a higher-level entity.

\`\`\`python path=null start=null
# Example: Project Management
# Relationship "Works_On" between Employee and Project
# This relationship itself participates in "Manages" relationship

# Employee ---(works_on)--- Project
#               |
#               | (aggregation)
#               ↓
#           [Monitors]
#               ↑
#           Manager
\`\`\`

---

## 4. Relational Model

**Core Concepts:**

| Term | Definition |
|:-----|:-----------|
| Relation | A table with rows and columns |
| Tuple | A row (record) in a table |
| Attribute | A column (field) in a table |
| Domain | Set of allowed values for an attribute |
| Degree | Number of attributes (columns) |
| Cardinality | Number of tuples (rows) |
| Schema | Structure definition (column names & types) |
| Instance | Actual data at a given time |

**Keys in Relational Model:**

\`\`\`sql path=null start=null
-- STUDENT Table Example
CREATE TABLE Student (
    student_id INT PRIMARY KEY,      -- Primary Key
    email VARCHAR(100) UNIQUE,       -- Candidate Key
    name VARCHAR(50) NOT NULL,
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES Department(dept_id)
);

-- Key Types:
-- Super Key: Any set of attributes that uniquely identifies tuples
--   {student_id}, {student_id, name}, {email}, {email, name}

-- Candidate Key: Minimal super key (no redundant attributes)
--   {student_id}, {email}

-- Primary Key: Chosen candidate key for identification
--   student_id

-- Foreign Key: References primary key of another table
--   dept_id references Department(dept_id)

-- Alternate Key: Candidate keys not chosen as primary key
--   email
\`\`\`

**Integrity Constraints:**

| Constraint | Description |
|:-----------|:------------|
| Domain | Values must be from attribute's domain |
| Key | Primary key must be unique and NOT NULL |
| Entity Integrity | No part of primary key can be NULL |
| Referential Integrity | Foreign key must reference valid primary key or be NULL |

---

## 5. ER to Relational Mapping

**Step-by-Step Mapping Algorithm:**

\`\`\`python path=null start=null
# Step 1: Map Regular Entities
# Each entity → Table
# Simple attributes → Columns
# Composite attributes → Component attributes as columns
# Multivalued attributes → Separate table with FK

# Step 2: Map Weak Entities
# Include partial key + owner's PK as composite primary key

# Step 3: Map Binary 1:1 Relationships
# Add FK to either side (preferably total participation side)
# Or create separate relationship table

# Step 4: Map Binary 1:N Relationships
# Add FK to "many" side (N-side entity)
# Relationship attributes go with FK

# Step 5: Map Binary M:N Relationships
# Create new relationship table
# Include PKs of both entities as composite PK
# Add relationship attributes to this table

# Step 6: Map Multivalued Attributes
# Separate table with attribute + foreign key to owner

# EXAMPLE:
# Student (M) --- enrolls --- (N) Course
# Creates: Enrollment(student_id, course_id, grade, date)
\`\`\`

**Mapping Example:**

\`\`\`sql path=null start=null
-- Original ER: Student --enrolls-- Course (M:N)

-- Resulting Tables:
CREATE TABLE Student (
    student_id INT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100)
);

CREATE TABLE Course (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100),
    credits INT
);

-- Relationship becomes a table
CREATE TABLE Enrollment (
    student_id INT,
    course_id INT,
    enrollment_date DATE,
    grade CHAR(1),
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (course_id) REFERENCES Course(course_id)
);
\`\`\`

---

## TL;DR - Quick Reference

| Concept | Key Point |
|:--------|:----------|
| DBMS Advantage | Data independence, integrity, concurrency, security |
| Three Schema | External (views) → Conceptual (logical) → Internal (physical) |
| ER Entity | Rectangle, has attributes |
| ER Relationship | Diamond, connects entities with cardinality |
| EER Generalization | Combine similar entities (bottom-up) |
| EER Specialization | Create sub-entities (top-down) |
| Candidate Key | Minimal set of attributes uniquely identifying tuples |
| Referential Integrity | FK must match valid PK or be NULL |
| 1:N Mapping | FK goes to N-side entity |
| M:N Mapping | Create separate relationship table |

---

## Resources

- [Database System Concepts - Silberschatz](https://www.db-book.com/) - Standard textbook
- [ER Diagram Tutorial](https://www.lucidchart.com/pages/er-diagrams) - Visual guide
- [GATE DBMS Notes](https://www.geeksforgeeks.org/dbms/) - Practice problems
    `,
  subModules: [],
  practiceQuiz: [
    {
      id: "dbms-f-q1",
      question:
        "Which of the following is NOT an advantage of DBMS over file systems?",
      options: [
        "Data Independence",
        "Reduced Redundancy",
        "Faster Read Speed",
        "Concurrent Access",
      ],
      correctAnswer: 2,
      explanation:
        "DBMS may actually be slower for simple read operations due to overhead.\\n\\nAdvantages of DBMS:\\n• Data independence\\n• Reduced redundancy\\n• Concurrent access\\n• Better security\\n• Crash recovery",
      difficulty: "easy",
    },
    {
      id: "dbms-f-q2",
      question: "In ER model, a multivalued attribute is represented by:",
      options: ["Rectangle", "Double Ellipse", "Dashed Ellipse", "Diamond"],
      correctAnswer: 1,
      explanation:
        "ER Diagram Symbols:\\n• Rectangle → Entity\\n• Ellipse → Simple Attribute\\n• Double Ellipse → Multivalued\\n• Dashed Ellipse → Derived\\n• Diamond → Relationship",
      difficulty: "easy",
    },
    {
      id: "dbms-f-q3",
      question:
        "Which constraint ensures that a foreign key value must exist as a primary key in the referenced table?",
      options: [
        "Entity Integrity",
        "Domain Constraint",
        "Referential Integrity",
        "Key Constraint",
      ],
      correctAnswer: 2,
      explanation:
        "Referential Integrity Constraint:\\n\\n• Foreign key must reference a valid primary key\\n• OR be NULL (if allowed)\\n\\nEntity Integrity: Primary key cannot be NULL",
      difficulty: "medium",
    },
    {
      id: "dbms-f-q4",
      question: "In a 1:N relationship, where is the foreign key placed?",
      options: [
        "On the 1 side",
        "On the N side",
        "In a new table",
        "On both sides",
      ],
      correctAnswer: 1,
      explanation:
        "For 1:N (One-to-Many) relationships:\\n\\n• FK goes to N-side (many side)\\n• Example: Department (1) → Employee (N)\\n• Employee table gets dept_id as FK\\n\\nM:N needs a separate junction table.",
      difficulty: "medium",
    },
    {
      id: "dbms-f-q5",
      question:
        "Which EER concept represents 'is-a' hierarchy from subclass to superclass?",
      options: [
        "Aggregation",
        "Generalization",
        "Specialization",
        "Composition",
      ],
      correctAnswer: 1,
      explanation:
        "EER Concepts:\\n\\n• Generalization: Bottom-up (combine similar)\\n  Car, Truck, Bike → Vehicle\\n\\n• Specialization: Top-down (create sub-entities)\\n  Employee → Manager, Engineer\\n\\nBoth represent 'is-a' hierarchy!",
      difficulty: "medium",
    },
    {
      id: "dbms-f-q6",
      question: "The degree of a relation refers to:",
      options: [
        "Number of rows",
        "Number of columns",
        "Number of foreign keys",
        "Number of tables",
      ],
      correctAnswer: 1,
      explanation:
        "Relational Model Terms:\\n\\n• Degree = Number of columns (attributes)\\n• Cardinality = Number of rows (tuples)\\n\\nDegree is fixed by schema, cardinality changes with data.",
      difficulty: "easy",
    },
    {
      id: "dbms-f-q7",
      question: "A weak entity MUST have:",
      options: [
        "Composite primary key",
        "Foreign key only",
        "No key at all",
        "Partial key + owner's key",
      ],
      correctAnswer: 3,
      explanation:
        "Weak Entity Characteristics:\\n\\n• Cannot exist independently\\n• Has partial key (discriminator)\\n• Needs owner entity's PK for full identification\\n• Total participation in identifying relationship\\n\\nExample: Dependent (weak) of Employee (owner)",
      difficulty: "medium",
    },
    {
      id: "dbms-f-q8",
      question: "Physical data independence means:",
      options: [
        "Changing views doesn't affect schema",
        "Changing storage doesn't affect logical schema",
        "Changing data types freely",
        "No index dependency",
      ],
      correctAnswer: 1,
      explanation:
        "Three-Schema Architecture Independence:\\n\\n• Physical: Change storage (index, file org) without affecting logical schema\\n\\n• Logical: Change conceptual schema without affecting external views",
      difficulty: "hard",
    },
    {
      id: "dbms-f-q9",
      question:
        "Which is a valid candidate key for the relation R(A, B, C, D) if {A, B} and {C} both uniquely identify tuples?",
      options: ["{A, B, C}", "{A, B} only", "{A, B} and {C}", "{A} and {B}"],
      correctAnswer: 2,
      explanation:
        "Candidate Key = Minimal Super Key\\n\\n• {A, B} uniquely identifies → candidate key\\n• {C} uniquely identifies → candidate key\\n• {A, B, C} is a super key but NOT minimal\\n\\nMultiple candidate keys are allowed!",
      difficulty: "medium",
    },
    {
      id: "dbms-f-q10",
      question: "Aggregation in EER is used when:",
      options: [
        "Combining entities",
        "Creating subclasses",
        "Treating a relationship as an entity",
        "Defining constraints",
      ],
      correctAnswer: 2,
      explanation:
        'Aggregation:\\n\\n• Treats a relationship as a higher-level entity\\n• Used when a relationship participates in another relationship\\n\\nExample: "Works_on" relationship aggregated for "Monitors" relationship',
      difficulty: "hard",
    },
  ],
};
