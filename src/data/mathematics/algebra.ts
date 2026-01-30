import { LearningModule } from "@/types/learning";

export const algebraModule: LearningModule = {
  id: "algebra",
  title: "Algebra Foundations",
  description:
    "Algebraic building blocks for computational thinking and problem solving",
  status: "in-progress",
  detailedContent: `# Algebra Foundations

Algebra provides the fundamental language for expressing mathematical relationships, solving equations, and analyzing patterns - essential skills for algorithms, data analysis, and machine learning.

## What You'll Learn

| # | Topic | Skill |
|:--|:------|:------|
| 1 | **Indices & Powers** | Simplify expressions with exponents |
| 2 | **Logarithms** | Convert between log and exponential form |
| 3 | **Polynomials** | Factor and solve polynomial equations |
| 4 | **Quadratic Equations** | Use quadratic formula and factoring |
| 5 | **Arithmetic Progression** | Find nth term and sum of AP |
| 6 | **Geometric Progression** | Calculate GP terms and infinite sums |
| 7 | **Inequalities** | Solve linear and quadratic inequalities |
| 8 | **Absolute Value** | Handle modulus in equations |

## Math Notation & Pronunciation Guide

**Basic Operations:**
- × or · - pronounced "times" - multiplication
- ÷ or / - pronounced "divided by" - division
- √ - pronounced "square root of"
- ⁿ - pronounced "to the power n" - exponentiation
- |x| - pronounced "absolute value of x"

**Equations:**
- = - pronounced "equals"
- ≠ - pronounced "not equal to"
- ≈ - pronounced "approximately equal to"
- ≥, ≤ - "greater/less than or equal to"

**Logarithms:**
- log₁₀(x) - pronounced "log base 10 of x" - common logarithm
- ln(x) - pronounced "natural log of x" - log base e
- logₐ(x) - pronounced "log base a of x"

**Summation:**
- Σ - pronounced "sigma" or "sum" - summation symbol
- Π - pronounced "pi" or "product" - product symbol

## Key Concepts

### 1. Fundamental Operations & Properties

**Order of Operations (PEMDAS/BODMAS):**
1. Parentheses/Brackets
2. Exponents/Orders
3. Multiplication & Division (left to right)
4. Addition & Subtraction (left to right)

\`\`\`python path=null start=null
# Python follows order of operations
result = 2 + 3 * 4 ** 2  # = 2 + 3 * 16 = 2 + 48 = 50
print(f"2 + 3 * 4² = {result}")

# Use parentheses to change order
result_with_parens = (2 + 3) * 4 ** 2  # = 5 * 16 = 80
print(f"(2 + 3) * 4² = {result_with_parens}")
\`\`\`

**Algebraic Properties:**

| Property | Addition | Multiplication |
|:---------|:---------|:---------------|
| Commutative | a + b = b + a | a × b = b × a |
| Associative | (a + b) + c = a + (b + c) | (a × b) × c = a × (b × c) |
| Identity | a + 0 = a | a × 1 = a |
| Inverse | a + (-a) = 0 | a × (1/a) = 1 |
| Distributive | a(b + c) = ab + ac | |

### 2. Expansions & Factorization

**Common Algebraic Identities:**

\`\`\`python path=null start=null
import sympy as sp

a, b = sp.symbols('a b')

# Perfect square expansions
print("(a + b)² =", sp.expand((a + b)**2))  # a² + 2ab + b²
print("(a - b)² =", sp.expand((a - b)**2))  # a² - 2ab + b²

# Difference of squares
print("(a + b)(a - b) =", sp.expand((a + b)*(a - b)))  # a² - b²

# Cube expansions
print("(a + b)³ =", sp.expand((a + b)**3))  # a³ + 3a²b + 3ab² + b³
\`\`\`

**Key Identities:**
- (a + b)² = a² + 2ab + b²
- (a - b)² = a² - 2ab + b²
- (a + b)(a - b) = a² - b²
- (a + b)³ = a³ + 3a²b + 3ab² + b³

**Factorization Techniques:**

\`\`\`python path=null start=null
import sympy as sp

x = sp.Symbol('x')

# Common factor
expr1 = 6*x**2 + 9*x
print(f"{expr1} = {sp.factor(expr1)}")  # 3x(2x + 3)

# Quadratic
expr2 = x**2 + 5*x + 6
print(f"{expr2} = {sp.factor(expr2)}")  # (x + 2)(x + 3)

# Difference of squares
expr3 = x**2 - 9
print(f"{expr3} = {sp.factor(expr3)}")  # (x - 3)(x + 3)

# Perfect square
expr4 = x**2 + 6*x + 9
print(f"{expr4} = {sp.factor(expr4)}")  # (x + 3)²
\`\`\`

### 3. Linear Equations

**Standard Form:** ax + b = 0

**Solution:** x = -b/a

\`\`\`python path=null start=null
def solve_linear(a, b):
    """Solve ax + b = 0"""
    if a == 0:
        return None if b != 0 else "All x"
    return -b / a

# Example: 3x + 6 = 0
x = solve_linear(3, 6)
print(f"3x + 6 = 0  →  x = {x}")  # x = -2

# Verify
print(f"Check: 3({x}) + 6 = {3*x + 6}")  # 0
\`\`\`

**System of Linear Equations:**

\`\`\`python path=null start=null
import numpy as np

# System: 2x + 3y = 8
#         x - y = 1
# In matrix form: Ax = b

A = np.array([[2, 3], [1, -1]])
b = np.array([8, 1])

# Solve using NumPy
solution = np.linalg.solve(A, b)
x, y = solution
print(f"x = {x}, y = {y}")  # x = 2.2, y = 1.2

# Verify
print(f"2({x}) + 3({y}) = {2*x + 3*y}")  # 8
print(f"({x}) - ({y}) = {x - y}")  # 1
\`\`\`

### 4. Quadratic Equations

**Standard Form:** ax² + bx + c = 0

**Quadratic Formula:**
x = (-b ± √(b² - 4ac)) / 2a

**Discriminant:** Δ = b² - 4ac
- Δ > 0: Two real distinct roots
- Δ = 0: One real repeated root
- Δ < 0: Two complex conjugate roots

\`\`\`python path=null start=null
import numpy as np

def solve_quadratic(a, b, c):
    """Solve ax² + bx + c = 0 using quadratic formula"""
    discriminant = b**2 - 4*a*c
    
    if discriminant > 0:
        x1 = (-b + np.sqrt(discriminant)) / (2*a)
        x2 = (-b - np.sqrt(discriminant)) / (2*a)
        return x1, x2, "Two real roots"
    elif discriminant == 0:
        x = -b / (2*a)
        return x, x, "One repeated root"
    else:
        real = -b / (2*a)
        imag = np.sqrt(-discriminant) / (2*a)
        return complex(real, imag), complex(real, -imag), "Complex roots"

# Example 1: x² - 5x + 6 = 0
x1, x2, nature = solve_quadratic(1, -5, 6)
print(f"x² - 5x + 6 = 0: x = {x1}, {x2} ({nature})")  # x = 3, 2

# Example 2: x² - 4x + 4 = 0
x1, x2, nature = solve_quadratic(1, -4, 4)
print(f"x² - 4x + 4 = 0: x = {x1} ({nature})")  # x = 2 (repeated)

# Example 3: x² + x + 1 = 0
x1, x2, nature = solve_quadratic(1, 1, 1)
print(f"x² + x + 1 = 0: x = {x1}, {x2} ({nature})")  # Complex
\`\`\`

**Vertex Form:** y = a(x - h)² + k
- Vertex at (h, k)
- h = -b/(2a), k = c - b²/(4a)

### 5. Indices (Exponents)

**Laws of Indices:**

| Law | Example |
|:----|:--------|
| aᵐ × aⁿ = aᵐ⁺ⁿ | 2³ × 2⁴ = 2⁷ = 128 |
| aᵐ ÷ aⁿ = aᵐ⁻ⁿ | 2⁵ ÷ 2² = 2³ = 8 |
| (aᵐ)ⁿ = aᵐⁿ | (2²)³ = 2⁶ = 64 |
| a⁰ = 1 | 5⁰ = 1 |
| a⁻ⁿ = 1/aⁿ | 2⁻³ = 1/8 |
| a^(1/n) = ⁿ√a | 8^(1/3) = 2 |
| (ab)ⁿ = aⁿbⁿ | (2×3)² = 4×9 = 36 |

\`\`\`python path=null start=null
# Index laws in Python
print(f"2³ × 2⁴ = {2**3 * 2**4} = 2⁷ = {2**7}")
print(f"2⁵ ÷ 2² = {2**5 / 2**2} = 2³ = {2**3}")
print(f"(2²)³ = {(2**2)**3} = 2⁶ = {2**6}")
print(f"2⁰ = {2**0}")
print(f"2⁻³ = {2**-3}")
print(f"8^(1/3) = {8**(1/3)}")

# Scientific notation uses indices
avogadro = 6.022e23  # 6.022 × 10²³
print(f"Avogadro's number: {avogadro:.3e}")
\`\`\`

### 6. Logarithms

**Definition:** If aˣ = b, then logₐ(b) = x

**Properties:**

| Property | Formula |
|:---------|:--------|
| Product | log(ab) = log(a) + log(b) |
| Quotient | log(a/b) = log(a) - log(b) |
| Power | log(aⁿ) = n·log(a) |
| Change of Base | logₐ(b) = log(b)/log(a) |
| logₐ(a) = 1 | log₁₀(10) = 1 |
| logₐ(1) = 0 | ln(1) = 0 |

\`\`\`python path=null start=null
import numpy as np

# Common logarithms
print(f"log₁₀(100) = {np.log10(100)}")  # 2
print(f"log₁₀(1000) = {np.log10(1000)}")  # 3

# Natural logarithm (base e)
print(f"ln(e) = {np.log(np.e)}")  # 1
print(f"ln(1) = {np.log(1)}")  # 0

# Logarithm properties
a, b = 10, 100
print(f"log(10 × 100) = {np.log10(1000)}")  # 3
print(f"log(10) + log(100) = {np.log10(10) + np.log10(100)}")  # 3

# Change of base
def log_base(x, base):
    return np.log(x) / np.log(base)

print(f"log₂(8) = {log_base(8, 2)}")  # 3
print(f"log₅(125) = {log_base(125, 5)}")  # 3
\`\`\`

**Applications in CS:**
- Time complexity: O(log n) for binary search
- Information theory: bits = log₂(possibilities)
- Decibels: dB = 10·log₁₀(power ratio)

### 7. Progressions (Sequences)

**Arithmetic Progression (AP):**
Each term differs by constant d.

- Terms: a, a+d, a+2d, a+3d, ...
- nth term: aₙ = a + (n-1)d
- Sum: Sₙ = n/2 × (2a + (n-1)d) = n/2 × (first + last)

\`\`\`python path=null start=null
def arithmetic_progression(a, d, n):
    """Generate AP and calculate properties"""
    terms = [a + i*d for i in range(n)]
    nth_term = a + (n-1)*d
    sum_n = n * (2*a + (n-1)*d) / 2
    return terms, nth_term, sum_n

# AP: 2, 5, 8, 11, ... (a=2, d=3)
terms, nth, total = arithmetic_progression(2, 3, 10)
print(f"First 10 terms: {terms}")
print(f"10th term: {nth}")  # 29
print(f"Sum of 10 terms: {total}")  # 155
\`\`\`

**Geometric Progression (GP):**
Each term is multiplied by constant r.

- Terms: a, ar, ar², ar³, ...
- nth term: aₙ = a × r^(n-1)
- Sum: Sₙ = a(rⁿ - 1)/(r - 1) if r ≠ 1
- Infinite sum (|r| < 1): S∞ = a/(1 - r)

\`\`\`python path=null start=null
def geometric_progression(a, r, n):
    """Generate GP and calculate properties"""
    terms = [a * (r**i) for i in range(n)]
    nth_term = a * (r**(n-1))
    if r == 1:
        sum_n = a * n
    else:
        sum_n = a * (r**n - 1) / (r - 1)
    return terms, nth_term, sum_n

# GP: 2, 6, 18, 54, ... (a=2, r=3)
terms, nth, total = geometric_progression(2, 3, 6)
print(f"First 6 terms: {terms}")
print(f"6th term: {nth}")  # 486
print(f"Sum of 6 terms: {total}")  # 728

# Infinite GP (|r| < 1): 1, 0.5, 0.25, ...
a, r = 1, 0.5
infinite_sum = a / (1 - r)
print(f"1 + 0.5 + 0.25 + ... = {infinite_sum}")  # 2
\`\`\`

### 8. Determinants & Matrices

**2×2 Determinant:**

|a  b|
|c  d| = ad - bc

**3×3 Determinant (Sarrus/Cofactor):**

\`\`\`python path=null start=null
import numpy as np

# 2x2 determinant
A_2x2 = np.array([[3, 4], [2, 5]])
det_2x2 = np.linalg.det(A_2x2)
print(f"det([[3,4],[2,5]]) = 3×5 - 4×2 = {det_2x2:.0f}")  # 7

# 3x3 determinant
A_3x3 = np.array([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
])
det_3x3 = np.linalg.det(A_3x3)
print(f"det(3×3 matrix) = {det_3x3:.6f}")  # ~0 (singular)

# Non-singular 3x3
B_3x3 = np.array([
    [1, 2, 3],
    [0, 1, 4],
    [5, 6, 0]
])
det_B = np.linalg.det(B_3x3)
print(f"det(B) = {det_B:.0f}")  # 1
\`\`\`

**Properties of Determinants:**
- det(AB) = det(A) × det(B)
- det(Aᵀ) = det(A)
- det(A) = 0 ⟹ A is singular (no inverse)
- Swapping rows multiplies det by -1

**Matrix Operations:**

\`\`\`python path=null start=null
import numpy as np

A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Addition
print("A + B =")
print(A + B)

# Multiplication
print("A × B =")
print(A @ B)  # or np.matmul(A, B)

# Transpose
print("Aᵀ =")
print(A.T)

# Inverse (if det ≠ 0)
A_inv = np.linalg.inv(A)
print("A⁻¹ =")
print(A_inv)

# Verify: A × A⁻¹ = I
print("A × A⁻¹ =")
print(A @ A_inv)
\`\`\`

---

## TL;DR - Quick Recall

| Concept | Key Formula |
|:--------|:------------|
| **Quadratic Formula** | x = (-b ± √(b²-4ac)) / 2a |
| **Discriminant** | Δ = b² - 4ac |
| **Index Laws** | aᵐ × aⁿ = aᵐ⁺ⁿ, (aᵐ)ⁿ = aᵐⁿ |
| **Log Properties** | log(ab) = log(a) + log(b) |
| **AP nth term** | aₙ = a + (n-1)d |
| **AP Sum** | Sₙ = n/2 × (first + last) |
| **GP nth term** | aₙ = a × r^(n-1) |
| **GP Sum** | Sₙ = a(rⁿ-1)/(r-1) |
| **2×2 Determinant** | ad - bc |

**Key Identities:**
- (a + b)² = a² + 2ab + b²
- (a - b)² = a² - 2ab + b²
- a² - b² = (a+b)(a-b)

---

## Additional Resources

**Interactive:**
- [Desmos Graphing Calculator](https://www.desmos.com/calculator)
- [Symbolab Step-by-Step Solver](https://www.symbolab.com/)

**Videos:**
- [Khan Academy - Algebra](https://www.khanacademy.org/math/algebra)
- [Professor Leonard - College Algebra](https://www.youtube.com/playlist?list=PLDesaqWTN6ESsmwELdrzhcGiRhk5DjwLP)
    `,
  subModules: [],
  practiceQuiz: [
    {
      id: "alg-q1",
      question: "Simplify: 2³ × 2⁴",
      options: ["2⁷", "2¹²", "4⁷", "8"],
      correctAnswer: 0,
      explanation:
        "Rule: aᵐ × aⁿ = aᵐ⁺ⁿ\n\nStep-by-step:\n• Same base (2), so add exponents\n• 2³ × 2⁴ = 2³⁺⁴ = 2⁷\n\nWhy add? You're multiplying (2×2×2) × (2×2×2×2) = 2⁷",
      difficulty: "easy",
    },
    {
      id: "alg-q2",
      question: "If log₁₀(x) = 3, what is x?",
      options: ["30", "100", "1000", "10000"],
      correctAnswer: 2,
      explanation:
        "Definition: logₐ(x) = n means aⁿ = x\n\nStep-by-step:\n• log₁₀(x) = 3\n• Convert to exponential: 10³ = x\n• x = 1000\n\nMemory trick: The log asks 'What power of 10 gives x?'",
      difficulty: "easy",
    },
    {
      id: "alg-q3",
      question: "Find the 10th term of AP: 3, 7, 11, 15, ...",
      options: ["39", "40", "43", "47"],
      correctAnswer: 0,
      explanation:
        "Formula: aₙ = a + (n-1)d\n\nStep-by-step:\n• First term a = 3\n• Common difference d = 7 - 3 = 4\n• n = 10\n• a₁₀ = 3 + (10-1) × 4 = 3 + 36 = 39\n\nWhy (n-1)? Because we add d starting from the 2nd term.",
      difficulty: "medium",
    },
    {
      id: "alg-q4",
      question: "Sum of infinite GP: 1 + 1/2 + 1/4 + 1/8 + ...",
      options: ["1.5", "2", "3", "∞"],
      correctAnswer: 1,
      explanation:
        "Formula: S∞ = a / (1 - r) when |r| < 1\n\nStep-by-step:\n• First term a = 1\n• Common ratio r = 1/2\n• S∞ = 1 / (1 - 1/2) = 1 / (1/2) = 2\n\nWhy does this work? As terms get smaller, they approach but never exceed 2.",
      difficulty: "medium",
    },
    {
      id: "alg-q5",
      question: "Solve: x² - 5x + 6 = 0",
      options: ["x = 2, 3", "x = -2, -3", "x = 1, 6", "x = -1, 6"],
      correctAnswer: 0,
      explanation:
        "Method: Factor the quadratic\n\nStep-by-step:\n• Find two numbers that multiply to 6 and add to -5\n• Numbers: -2 and -3\n• x² - 5x + 6 = (x - 2)(x - 3) = 0\n• x = 2 or x = 3\n\nVerify: 2² - 5(2) + 6 = 4 - 10 + 6 = 0",
      difficulty: "easy",
    },
    {
      id: "alg-q6",
      question: "Simplify: (a²)³",
      options: ["a⁵", "a⁶", "a⁸", "a⁹"],
      correctAnswer: 1,
      explanation:
        "Rule: (aᵐ)ⁿ = aᵐˣⁿ\n\nStep-by-step:\n• (a²)³ = a²ˣ³ = a⁶\n\nWhy multiply? You're raising a² to power 3, so (a²)(a²)(a²) = a⁶",
      difficulty: "easy",
    },
    {
      id: "alg-q7",
      question: "If log₂(8) = x, what is x?",
      options: ["2", "3", "4", "8"],
      correctAnswer: 1,
      explanation:
        "Definition: log₂(8) = x means 2ˣ = 8\n\nStep-by-step:\n• 2¹ = 2\n• 2² = 4\n• 2³ = 8\n\nSo x = 3",
      difficulty: "easy",
    },
    {
      id: "alg-q8",
      question: "Sum of first 10 terms of AP: 2, 5, 8, 11, ...",
      options: ["155", "145", "165", "135"],
      correctAnswer: 0,
      explanation:
        "Formula: Sₙ = n/2 × [2a + (n-1)d]\n\nStep-by-step:\n• a = 2, d = 3, n = 10\n• S₁₀ = 10/2 × [2(2) + (10-1)(3)]\n• = 5 × [4 + 27] = 5 × 31 = 155",
      difficulty: "medium",
    },
    {
      id: "alg-q9",
      question: "Find the 5th term of GP: 3, 6, 12, 24, ...",
      options: ["36", "48", "96", "192"],
      correctAnswer: 1,
      explanation:
        "Formula: aₙ = a × rⁿ⁻¹\n\nStep-by-step:\n• a = 3, r = 6/3 = 2\n• a₅ = 3 × 2⁵⁻¹ = 3 × 2⁴ = 3 × 16 = 48",
      difficulty: "easy",
    },
    {
      id: "alg-q10",
      question: "Solve: |x - 3| = 5",
      options: [
        "x = 8 only",
        "x = -2 only",
        "x = 8 or x = -2",
        "x = 2 or x = 8",
      ],
      correctAnswer: 2,
      explanation:
        "Absolute value: |a| = b means a = b OR a = -b\n\nStep-by-step:\n• x - 3 = 5 → x = 8\n• x - 3 = -5 → x = -2\n\nBoth solutions are valid!",
      difficulty: "easy",
    },
  ],
};
