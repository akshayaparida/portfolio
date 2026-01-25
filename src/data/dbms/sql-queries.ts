import { LearningModule } from "@/types/learning";

export const sqlQueriesModule: LearningModule = {
  id: "sql-queries",
  title: "SQL & Relational Algebra",
  description:
    "DDL, DML, DCL commands, complex queries, joins, and relational algebra operations",
  status: "in-progress",
  detailedContent: `# SQL & Relational Algebra

SQL (Structured Query Language) is the standard language for interacting with relational databases. Relational Algebra provides the theoretical foundation for query operations.

## 🎯 What You'll Learn

| # | Topic | Skill |
|:--|:------|:------|
| 1 | **DDL Commands** | CREATE, ALTER, DROP, TRUNCATE |
| 2 | **DML Commands** | SELECT, INSERT, UPDATE, DELETE |
| 3 | **SQL Functions** | Aggregate, String, Date functions |
| 4 | **Joins** | INNER, LEFT, RIGHT, FULL, CROSS |
| 5 | **Subqueries** | Nested queries, correlated subqueries |
| 6 | **Relational Algebra** | Selection, Projection, Joins |

---

## 1. DDL (Data Definition Language)

**CREATE - Define Database Objects:**

\`\`\`sql path=null start=null
-- Create Database
CREATE DATABASE university;

-- Create Table
CREATE TABLE Student (
    student_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    dob DATE,
    dept_id INT,
    gpa DECIMAL(3,2) CHECK (gpa >= 0.0 AND gpa <= 4.0),
    FOREIGN KEY (dept_id) REFERENCES Department(dept_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- Create Index
CREATE INDEX idx_name ON Student(name);
CREATE UNIQUE INDEX idx_email ON Student(email);
\`\`\`

**ALTER - Modify Structure:**

\`\`\`sql path=null start=null
-- Add Column
ALTER TABLE Student ADD phone VARCHAR(15);

-- Modify Column
ALTER TABLE Student MODIFY phone VARCHAR(20);

-- Drop Column
ALTER TABLE Student DROP COLUMN phone;

-- Add Constraint
ALTER TABLE Student ADD CONSTRAINT chk_gpa CHECK (gpa <= 4.0);

-- Rename Table
ALTER TABLE Student RENAME TO Students;
\`\`\`

**DROP & TRUNCATE:**

\`\`\`sql path=null start=null
-- DROP: Remove entire object (structure + data)
DROP TABLE Student;           -- Delete table completely
DROP TABLE IF EXISTS Student; -- Safe drop
DROP INDEX idx_name;          -- Remove index

-- TRUNCATE: Remove all data, keep structure
TRUNCATE TABLE Student;
-- Faster than DELETE (no logging)
-- Cannot use WHERE clause
-- Resets auto-increment
\`\`\`

---

## 2. DML (Data Manipulation Language)

**INSERT - Add Data:**

\`\`\`sql path=null start=null
-- Single Row Insert
INSERT INTO Student (student_id, name, email, dept_id) 
VALUES (1, 'Alice', 'alice@mail.com', 101);

-- Multiple Rows
INSERT INTO Student (student_id, name, email, dept_id) VALUES
    (2, 'Bob', 'bob@mail.com', 102),
    (3, 'Charlie', 'charlie@mail.com', 101),
    (4, 'Diana', 'diana@mail.com', 103);

-- Insert from SELECT
INSERT INTO Archive_Student 
SELECT * FROM Student WHERE grad_year < 2020;
\`\`\`

**SELECT - Query Data:**

\`\`\`sql path=null start=null
-- Basic SELECT
SELECT * FROM Student;                    -- All columns
SELECT name, email FROM Student;          -- Specific columns
SELECT DISTINCT dept_id FROM Student;     -- Unique values

-- WHERE Clause (Filtering)
SELECT * FROM Student WHERE gpa > 3.5;
SELECT * FROM Student WHERE dept_id IN (101, 102);
SELECT * FROM Student WHERE name LIKE 'A%';      -- Starts with A
SELECT * FROM Student WHERE name LIKE '%son';    -- Ends with son
SELECT * FROM Student WHERE name LIKE '_a%';     -- 2nd char is 'a'
SELECT * FROM Student WHERE email IS NOT NULL;

-- Logical Operators
SELECT * FROM Student 
WHERE gpa > 3.0 AND dept_id = 101;

SELECT * FROM Student 
WHERE gpa > 3.5 OR dept_id = 102;

SELECT * FROM Student 
WHERE NOT dept_id = 103;

-- ORDER BY (Sorting)
SELECT * FROM Student ORDER BY name ASC;     -- Ascending
SELECT * FROM Student ORDER BY gpa DESC;     -- Descending
SELECT * FROM Student ORDER BY dept_id, gpa DESC;

-- LIMIT / TOP
SELECT * FROM Student LIMIT 5;              -- MySQL
SELECT TOP 5 * FROM Student;                -- SQL Server
\`\`\`

**UPDATE & DELETE:**

\`\`\`sql path=null start=null
-- UPDATE
UPDATE Student SET gpa = 3.8 WHERE student_id = 1;
UPDATE Student SET dept_id = 102, gpa = gpa + 0.1 
WHERE name = 'Alice';

-- DELETE
DELETE FROM Student WHERE student_id = 4;
DELETE FROM Student WHERE gpa < 2.0;
DELETE FROM Student;  -- Delete all rows (use TRUNCATE instead)
\`\`\`

---

## 3. Aggregate Functions & GROUP BY

\`\`\`sql path=null start=null
-- Aggregate Functions
SELECT COUNT(*) FROM Student;                -- Total rows
SELECT COUNT(DISTINCT dept_id) FROM Student; -- Unique departments
SELECT SUM(gpa) FROM Student;
SELECT AVG(gpa) FROM Student;
SELECT MAX(gpa), MIN(gpa) FROM Student;

-- GROUP BY - Aggregate per group
SELECT dept_id, COUNT(*) as student_count, AVG(gpa) as avg_gpa
FROM Student
GROUP BY dept_id;

-- Output:
-- dept_id | student_count | avg_gpa
-- 101     | 2             | 3.65
-- 102     | 1             | 3.80
-- 103     | 1             | 3.20

-- HAVING - Filter groups (WHERE for groups)
SELECT dept_id, AVG(gpa) as avg_gpa
FROM Student
GROUP BY dept_id
HAVING AVG(gpa) > 3.5;

-- Complete Query Order
SELECT dept_id, COUNT(*) as cnt
FROM Student
WHERE gpa > 2.0              -- 1. Filter rows
GROUP BY dept_id             -- 2. Group remaining
HAVING COUNT(*) > 1          -- 3. Filter groups
ORDER BY cnt DESC            -- 4. Sort
LIMIT 5;                     -- 5. Limit output
\`\`\`

**Execution Order:**
\`\`\`text path=null start=null
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
\`\`\`

---

## 4. SQL Joins

\`\`\`sql path=null start=null
-- Sample Tables
-- Student: student_id, name, dept_id
-- Department: dept_id, dept_name

-- INNER JOIN (Matching rows only)
SELECT s.name, d.dept_name
FROM Student s
INNER JOIN Department d ON s.dept_id = d.dept_id;

-- LEFT JOIN (All left + matching right)
SELECT s.name, d.dept_name
FROM Student s
LEFT JOIN Department d ON s.dept_id = d.dept_id;
-- Students without department get NULL for dept_name

-- RIGHT JOIN (All right + matching left)
SELECT s.name, d.dept_name
FROM Student s
RIGHT JOIN Department d ON s.dept_id = d.dept_id;
-- Departments without students get NULL for name

-- FULL OUTER JOIN (All rows from both)
SELECT s.name, d.dept_name
FROM Student s
FULL OUTER JOIN Department d ON s.dept_id = d.dept_id;

-- CROSS JOIN (Cartesian Product)
SELECT s.name, d.dept_name
FROM Student s
CROSS JOIN Department d;
-- Returns m × n rows

-- SELF JOIN (Table with itself)
SELECT e1.name as Employee, e2.name as Manager
FROM Employee e1
JOIN Employee e2 ON e1.manager_id = e2.emp_id;
\`\`\`

**Join Visualization:**

\`\`\`text path=null start=null
INNER JOIN:      A ∩ B       (intersection only)
LEFT JOIN:       A + (A ∩ B) (all of A + matching B)
RIGHT JOIN:      B + (A ∩ B) (all of B + matching A)
FULL OUTER:      A ∪ B       (everything)
CROSS JOIN:      A × B       (cartesian product)
\`\`\`

---

## 5. Subqueries

\`\`\`sql path=null start=null
-- Subquery in WHERE
SELECT name FROM Student
WHERE dept_id = (SELECT dept_id FROM Department WHERE dept_name = 'CS');

-- Subquery with IN
SELECT name FROM Student
WHERE dept_id IN (SELECT dept_id FROM Department WHERE location = 'Building A');

-- Subquery with EXISTS
SELECT name FROM Student s
WHERE EXISTS (
    SELECT 1 FROM Enrollment e WHERE e.student_id = s.student_id
);

-- Subquery with ANY/ALL
SELECT name FROM Student WHERE gpa > ALL (
    SELECT gpa FROM Student WHERE dept_id = 102
);

-- Subquery in FROM (Derived Table)
SELECT dept_name, avg_gpa
FROM (
    SELECT dept_id, AVG(gpa) as avg_gpa
    FROM Student
    GROUP BY dept_id
) AS dept_avg
JOIN Department d ON dept_avg.dept_id = d.dept_id
WHERE avg_gpa > 3.0;

-- Correlated Subquery (references outer query)
SELECT s.name, s.gpa
FROM Student s
WHERE s.gpa > (
    SELECT AVG(s2.gpa) 
    FROM Student s2 
    WHERE s2.dept_id = s.dept_id  -- References outer s
);
\`\`\`

---

## 6. DCL & TCL

**DCL (Data Control Language):**

\`\`\`sql path=null start=null
-- GRANT: Give permissions
GRANT SELECT, INSERT ON Student TO user1;
GRANT ALL PRIVILEGES ON university.* TO admin;

-- REVOKE: Remove permissions
REVOKE INSERT ON Student FROM user1;
REVOKE ALL PRIVILEGES ON university.* FROM user1;
\`\`\`

**TCL (Transaction Control Language):**

\`\`\`sql path=null start=null
-- Start Transaction
START TRANSACTION;  -- or BEGIN

-- Make changes
UPDATE Account SET balance = balance - 500 WHERE id = 1;
UPDATE Account SET balance = balance + 500 WHERE id = 2;

-- Commit if successful
COMMIT;

-- Or Rollback on error
ROLLBACK;

-- Savepoint for partial rollback
SAVEPOINT sp1;
UPDATE ...
ROLLBACK TO sp1;  -- Undo to savepoint
\`\`\`

---

## 7. Relational Algebra

**Fundamental Operations:**

| Symbol | Name | SQL Equivalent |
|:-------|:-----|:---------------|
| σ (sigma) | Selection | WHERE |
| π (pi) | Projection | SELECT columns |
| × | Cartesian Product | CROSS JOIN |
| ⋈ | Join | JOIN |
| ∪ | Union | UNION |
| − | Difference | EXCEPT |
| ∩ | Intersection | INTERSECT |
| ρ | Rename | AS |

**Examples:**

\`\`\`text path=null start=null
σ_gpa>3.5(Student)
→ SELECT * FROM Student WHERE gpa > 3.5

π_name,email(Student)
→ SELECT name, email FROM Student

σ_gpa>3.5(π_name,gpa(Student))
→ SELECT name, gpa FROM Student WHERE gpa > 3.5

Student × Course
→ SELECT * FROM Student CROSS JOIN Course

Student ⋈_dept_id=dept_id Department
→ SELECT * FROM Student JOIN Department ON Student.dept_id = Department.dept_id

π_name(Student) ∪ π_name(Faculty)
→ SELECT name FROM Student UNION SELECT name FROM Faculty

Student − Graduate_Student
→ SELECT * FROM Student EXCEPT SELECT * FROM Graduate_Student
\`\`\`

**Join Types in Relational Algebra:**

\`\`\`text path=null start=null
Natural Join (⋈):
R ⋈ S = Automatically joins on common attributes

Theta Join (⋈_θ):
R ⋈_θ S = Join with arbitrary condition θ

Equi-Join:
Theta join with only equality conditions

Semi-Join (⋉):
R ⋉ S = Tuples in R that have matching tuples in S
\`\`\`

---

## TL;DR - Quick Reference

| Command | Purpose |
|:--------|:--------|
| CREATE TABLE | Define new table structure |
| ALTER TABLE | Modify existing structure |
| DROP TABLE | Delete table completely |
| TRUNCATE TABLE | Remove all data, keep structure |
| SELECT ... WHERE | Query with filtering |
| GROUP BY ... HAVING | Aggregate with group filtering |
| INNER JOIN | Only matching rows |
| LEFT JOIN | All left + matching right |
| Subquery | Query within a query |
| σ (Selection) | Filter rows (WHERE) |
| π (Projection) | Select columns |

---

## 📚 Resources

- [W3Schools SQL Tutorial](https://www.w3schools.com/sql/) - Interactive practice
- [Mode SQL Tutorial](https://mode.com/sql-tutorial/) - Advanced queries
- [SQLBolt](https://sqlbolt.com/) - Learn SQL interactively
    `,
  subModules: [],
  practiceQuiz: [
    {
      id: "sql-q1",
      question: "Which SQL clause is used to filter groups?",
      options: ["WHERE", "HAVING", "GROUP BY", "FILTER"],
      correctAnswer: 1,
      explanation:
        "WHERE vs HAVING:\\n\\n• WHERE: Filters individual rows BEFORE grouping\\n• HAVING: Filters groups AFTER GROUP BY\\n\\nExecution Order: FROM → WHERE → GROUP BY → HAVING → SELECT",
      difficulty: "easy",
    },
    {
      id: "sql-q2",
      question: "What is the difference between DELETE and TRUNCATE?",
      options: [
        "No difference",
        "TRUNCATE is faster and resets auto-increment",
        "DELETE is faster",
        "TRUNCATE keeps data",
      ],
      correctAnswer: 1,
      explanation:
        "DELETE vs TRUNCATE:\\n\\n• DELETE: Row-by-row, logged, can use WHERE\\n• TRUNCATE: Bulk operation, minimal logging, resets auto-increment\\n• TRUNCATE is much faster for removing all rows",
      difficulty: "medium",
    },
    {
      id: "sql-q3",
      question:
        "Which JOIN returns all rows from both tables, matching where possible?",
      options: ["INNER JOIN", "LEFT JOIN", "FULL OUTER JOIN", "CROSS JOIN"],
      correctAnswer: 2,
      explanation:
        "Join Types:\\n\\n• INNER: Only matching\\n• LEFT: All left + matching right\\n• RIGHT: All right + matching left\\n• FULL OUTER: All from both (A ∪ B)\\n• CROSS: Cartesian product",
      difficulty: "easy",
    },
    {
      id: "sql-q4",
      question: "In relational algebra, π (Pi) represents:",
      options: ["Selection", "Projection", "Join", "Division"],
      correctAnswer: 1,
      explanation:
        "Relational Algebra Symbols:\\n\\n• σ (sigma) = Selection (WHERE)\\n• π (pi) = Projection (SELECT columns)\\n• × = Cartesian Product\\n• ⋈ = Join",
      difficulty: "easy",
    },
    {
      id: "sql-q5",
      question:
        "What does COUNT(*) return for a table with 5 rows where 2 rows have NULL in column 'age'?",
      options: ["3", "5", "2", "NULL"],
      correctAnswer: 1,
      explanation:
        "COUNT(*) vs COUNT(column):\\n\\n• COUNT(*) counts ALL rows = 5\\n• COUNT(age) counts non-NULL values = 3\\n\\nCOUNT(*) ignores NULLs, COUNT(column) excludes NULLs",
      difficulty: "medium",
    },
    {
      id: "sql-q6",
      question: "Which is NOT a valid aggregate function?",
      options: ["SUM()", "AVG()", "MEDIAN()", "MAX()"],
      correctAnswer: 2,
      explanation:
        "Standard SQL Aggregate Functions:\\n\\n• COUNT(), SUM(), AVG(), MIN(), MAX()\\n\\nMEDIAN() is NOT a standard SQL function (available in some databases like Oracle, not in MySQL/PostgreSQL standard)",
      difficulty: "medium",
    },
    {
      id: "sql-q7",
      question: "A correlated subquery is one that:",
      options: [
        "Runs once for entire query",
        "References the outer query",
        "Returns single value",
        "Uses EXISTS only",
      ],
      correctAnswer: 1,
      explanation:
        "Correlated Subquery:\\n\\n• References columns from outer query\\n• Executes once per row of outer query\\n• Less efficient than non-correlated\\n\\nExample: WHERE s.gpa > (SELECT AVG(gpa) FROM Student WHERE dept_id = s.dept_id)",
      difficulty: "hard",
    },
    {
      id: "sql-q8",
      question: "What does ON DELETE CASCADE mean?",
      options: [
        "Prevent deletion",
        "Delete child rows automatically",
        "Set to NULL on delete",
        "Throw error",
      ],
      correctAnswer: 1,
      explanation:
        "Foreign Key Actions:\\n\\n• CASCADE: Auto-delete children\\n• SET NULL: Set FK to NULL\\n• SET DEFAULT: Set FK to default value\\n• RESTRICT/NO ACTION: Prevent deletion",
      difficulty: "medium",
    },
    {
      id: "sql-q9",
      question:
        "CROSS JOIN of tables with 4 and 5 rows produces how many rows?",
      options: ["9", "20", "4", "5"],
      correctAnswer: 1,
      explanation:
        "CROSS JOIN = Cartesian Product\\n\\n• Combines every row from first table with every row from second\\n• Result: m × n rows\\n• 4 × 5 = 20 rows",
      difficulty: "easy",
    },
    {
      id: "sql-q10",
      question: "Which statement about UNION is correct?",
      options: [
        "Includes duplicates",
        "Requires same number of columns",
        "Combines columns horizontally",
        "Only works with JOIN",
      ],
      correctAnswer: 1,
      explanation:
        "UNION Rules:\\n\\n• Combines results vertically (rows)\\n• Must have same number of columns\\n• Columns must have compatible types\\n• UNION removes duplicates\\n• UNION ALL keeps duplicates",
      difficulty: "medium",
    },
  ],
};
