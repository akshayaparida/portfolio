import { LearningModule } from "@/types/learning";

export const basicMathModule: LearningModule = {
  id: "basic-math",
  title: "Basic Mathematics",
  description:
    "Number systems, arithmetic fundamentals, and essential building blocks for all mathematics",
  status: "in-progress",
  detailedContent: `# Basic Mathematics

Master the foundational concepts that underpin every branch of mathematics — from number classification and arithmetic rules to geometry essentials. This module ensures you have a rock-solid base before moving on to algebra, calculus, and beyond.

## What You'll Learn

| # | Topic | Skill |
|:--|:------|:------|
| 1 | **Number Systems** | Classify numbers (natural, integer, rational, real) |
| 2 | **Arithmetic & PEMDAS** | Apply order of operations correctly |
| 3 | **Fractions, Decimals & Percentages** | Convert and compute across formats |
| 4 | **Ratios & Proportions** | Solve direct and inverse proportion problems |
| 5 | **HCF & LCM** | Find HCF/LCM using prime factorization |
| 6 | **Divisibility Rules** | Quickly check divisibility by 2–11 |
| 7 | **Basic Geometry & Mensuration** | Calculate area, perimeter, and apply Pythagoras |
| 8 | **Inequalities** | Solve linear, quadratic, rational, and absolute value inequalities |

## Key Concepts

### 1. Number Systems

Every number you use fits into a hierarchy of number sets: **ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ**

| Set | Symbol | Examples | Description |
|:----|:-------|:---------|:------------|
| **Natural** | ℕ | 1, 2, 3, 4, ... | Counting numbers |
| **Whole** | W | 0, 1, 2, 3, ... | ℕ + zero |
| **Integers** | ℤ | ..., -2, -1, 0, 1, 2, ... | Whole + negatives |
| **Rational** | ℚ | 1/2, 0.75, 0.333... | p/q where q ≠ 0 |
| **Irrational** | — | √2, π, e | Non-terminating, non-repeating decimals |
| **Real** | ℝ | All of the above | Rational ∪ Irrational (entire number line) |

**Prime & Composite Numbers:**

| Type | Definition | Examples |
|:-----|:-----------|:---------|
| **Prime** | Exactly 2 factors (1 and itself) | 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 |
| **Composite** | More than 2 factors | 4, 6, 8, 9, 10, 12, 14, 15 |
| **Special** | 1 is **neither** prime nor composite | 1 |
| **Only even prime** | 2 is the only even prime number | 2 |

\`\`\`python path=null start=null
def classify_number(n):
    """Classify a number into its number system categories"""
    categories = []

    if isinstance(n, int) and n > 0:
        categories.append("Natural (ℕ)")
    if isinstance(n, int) and n >= 0:
        categories.append("Whole (W)")
    if isinstance(n, int):
        categories.append("Integer (ℤ)")

    # Check rational (all ints are rational, and finite decimals)
    try:
        from fractions import Fraction
        Fraction(n)
        categories.append("Rational (ℚ)")
    except (ValueError, TypeError):
        categories.append("Irrational")

    categories.append("Real (ℝ)")
    return categories

# Examples
for num in [5, -3, 0, 0.75]:
    print(f"{num}: {classify_number(num)}")
\`\`\`

### 2. Arithmetic & Order of Operations (PEMDAS / BODMAS)

**PEMDAS** (Parentheses, Exponents, Multiplication, Division, Addition, Subtraction) — also known as **BODMAS** (Brackets, Orders, Division, Multiplication, Addition, Subtraction).

| Priority | PEMDAS | BODMAS | Example |
|:---------|:-------|:-------|:--------|
| 1st | **P**arentheses | **B**rackets | (2 + 3) = 5 |
| 2nd | **E**xponents | **O**rders | 4² = 16 |
| 3rd | **M**ultiplication & **D**ivision | **D**ivision & **M**ultiplication | 6 × 3 = 18, 12 ÷ 4 = 3 |
| 4th | **A**ddition & **S**ubtraction | **A**ddition & **S**ubtraction | 5 + 3 = 8, 9 - 4 = 5 |

> NOTE: **Multiplication/Division** and **Addition/Subtraction** are evaluated **left to right** (not M before D or A before S).

\`\`\`python path=null start=null
# Python follows PEMDAS automatically
result1 = 2 + 3 * 4 ** 2     # = 2 + 3 * 16 = 2 + 48 = 50
result2 = (2 + 3) * 4 ** 2   # = 5 * 16 = 80
result3 = 12 / 4 * 3          # = 3 * 3 = 9 (left to right)
result4 = 10 - 3 + 2          # = 7 + 2 = 9 (left to right)

print(f"2 + 3 × 4² = {result1}")       # 50
print(f"(2 + 3) × 4² = {result2}")     # 80
print(f"12 ÷ 4 × 3 = {result3}")       # 9.0
print(f"10 - 3 + 2 = {result4}")       # 9
\`\`\`

**Algebraic Properties:**

| Property | Addition | Multiplication |
|:---------|:---------|:---------------|
| Commutative | a + b = b + a | a × b = b × a |
| Associative | (a + b) + c = a + (b + c) | (a × b) × c = a × (b × c) |
| Identity | a + 0 = a | a × 1 = a |
| Inverse | a + (-a) = 0 | a × (1/a) = 1 |
| Distributive | a(b + c) = ab + ac | |

### 3. Fractions, Decimals & Percentages

These three are just **different ways to represent the same value**:

| Fraction | Decimal | Percentage |
|:---------|:--------|:-----------|
| 1/2 | 0.5 | 50% |
| 1/4 | 0.25 | 25% |
| 3/4 | 0.75 | 75% |
| 1/5 | 0.2 | 20% |
| 1/3 | 0.333... | 33.33...% |

**Conversion Rules:**
- Fraction → Decimal: Divide numerator by denominator
- Decimal → Percentage: Multiply by 100
- Percentage → Fraction: Divide by 100, simplify

\`\`\`python path=null start=null
from fractions import Fraction

# Fraction operations
a = Fraction(3, 4)
b = Fraction(1, 6)

print(f"{a} + {b} = {a + b}")       # 3/4 + 1/6 = 11/12
print(f"{a} × {b} = {a * b}")       # 3/4 × 1/6 = 1/8
print(f"{a} ÷ {b} = {a / b}")       # 3/4 ÷ 1/6 = 9/2

# Conversions
frac = Fraction(3, 8)
decimal_val = float(frac)
percentage = decimal_val * 100

print(f"Fraction: {frac}")           # 3/8
print(f"Decimal:  {decimal_val}")     # 0.375
print(f"Percent:  {percentage}%")     # 37.5%

# Percentage problems
total = 800
discount_pct = 15
discount_amt = total * discount_pct / 100
print(f"{discount_pct}% of {total} = {discount_amt}")  # 120
print(f"Price after discount = {total - discount_amt}") # 680
\`\`\`

### 4. Ratios & Proportions

**Ratio** — compares two quantities: a : b = a/b

**Proportion** — states that two ratios are equal: a/b = c/d

| Type | Relationship | Example |
|:-----|:-------------|:--------|
| **Direct Proportion** | If x increases → y increases | More hours worked → more pay |
| **Inverse Proportion** | If x increases → y decreases | More workers → less time to finish |

**Direct:** y = kx (constant k = y/x)

**Inverse:** y = k/x (constant k = x × y)

\`\`\`python path=null start=null
# Direct proportion: cost ∝ quantity
price_per_kg = 50
quantities = [2, 5, 10]
for q in quantities:
    print(f"{q} kg costs ₹{price_per_kg * q}")

# Inverse proportion: workers × time = constant
# 6 workers take 12 days. How many days for 9 workers?
workers1, days1 = 6, 12
workers2 = 9
days2 = (workers1 * days1) / workers2
print(f"\\n{workers1} workers → {days1} days")
print(f"{workers2} workers → {days2:.0f} days")  # 8 days

# Dividing in a ratio
# Divide 120 in the ratio 3:5
total = 120
a, b = 3, 5
part_a = total * a / (a + b)
part_b = total * b / (a + b)
print(f"\\n120 in ratio 3:5 → {part_a:.0f} and {part_b:.0f}")  # 45 and 75
\`\`\`

### 5. HCF & LCM

**HCF (Highest Common Factor)** — largest number that divides both numbers.

**LCM (Lowest Common Multiple)** — smallest number divisible by both numbers.

**Key Relationship:** HCF(a, b) × LCM(a, b) = a × b

**Method — Prime Factorization:**

| Step | Number 36 | Number 48 |
|:-----|:----------|:----------|
| Factorize | 2² × 3² | 2⁴ × 3 |
| HCF | Take **minimum** powers: 2² × 3¹ = **12** | |
| LCM | Take **maximum** powers: 2⁴ × 3² = **144** | |

> TIP: **Verify:** HCF × LCM = 12 × 144 = 1728 = 36 × 48 ✓

\`\`\`python path=null start=null
import math

# Built-in HCF/GCD
a, b = 36, 48
hcf = math.gcd(a, b)
lcm = (a * b) // hcf  # or math.lcm(a, b) in Python 3.9+

print(f"HCF({a}, {b}) = {hcf}")    # 12
print(f"LCM({a}, {b}) = {lcm}")    # 144
print(f"Verify: {hcf} × {lcm} = {hcf * lcm} = {a} × {b} = {a * b}")

# Prime factorization
def prime_factors(n):
    factors = {}
    d = 2
    while d * d <= n:
        while n % d == 0:
            factors[d] = factors.get(d, 0) + 1
            n //= d
        d += 1
    if n > 1:
        factors[n] = factors.get(n, 0) + 1
    return factors

for num in [36, 48, 60]:
    pf = prime_factors(num)
    factored = " × ".join(f"{p}^{e}" if e > 1 else str(p) for p, e in sorted(pf.items()))
    print(f"{num} = {factored}")
\`\`\`

### 6. Divisibility Rules

Quick mental-math checks — no calculator needed:

| Divisor | Rule | Example |
|:--------|:-----|:--------|
| **2** | Last digit is even (0, 2, 4, 6, 8) | 128 → 8 is even ✓ |
| **3** | Sum of digits divisible by 3 | 123 → 1+2+3 = 6 ÷ 3 ✓ |
| **4** | Last two digits form a number divisible by 4 | 312 → 12 ÷ 4 ✓ |
| **5** | Last digit is 0 or 5 | 245 → ends in 5 ✓ |
| **6** | Divisible by BOTH 2 and 3 | 132 → even & 1+3+2=6 ✓ |
| **8** | Last three digits divisible by 8 | 1016 → 016 ÷ 8 ✓ |
| **9** | Sum of digits divisible by 9 | 729 → 7+2+9 = 18 ÷ 9 ✓ |
| **10** | Last digit is 0 | 350 → ends in 0 ✓ |
| **11** | Alternating sum of digits divisible by 11 | 121 → 1-2+1 = 0 ÷ 11 ✓ |

\`\`\`python path=null start=null
def check_divisibility(n):
    """Check divisibility by 2-11 with rule explanations"""
    results = []
    digits = [int(d) for d in str(abs(n))]

    # Rule for 2
    results.append(("2", n % 2 == 0, f"last digit {digits[-1]} {'is' if digits[-1] % 2 == 0 else 'is not'} even"))
    # Rule for 3
    digit_sum = sum(digits)
    results.append(("3", n % 3 == 0, f"digit sum = {digit_sum}"))
    # Rule for 5
    results.append(("5", n % 5 == 0, f"last digit is {digits[-1]}"))
    # Rule for 9
    results.append(("9", n % 9 == 0, f"digit sum = {digit_sum}"))
    # Rule for 11
    alt_sum = sum(d * (-1)**i for i, d in enumerate(digits))
    results.append(("11", n % 11 == 0, f"alternating sum = {alt_sum}"))

    print(f"Divisibility of {n}:")
    for divisor, is_div, reason in results:
        status = "✓" if is_div else "✗"
        print(f"  By {divisor}: {status} ({reason})")

check_divisibility(132)
print()
check_divisibility(729)
\`\`\`

### 7. Basic Geometry & Mensuration

**Angle Types:**

| Type | Range | Example |
|:-----|:------|:--------|
| **Acute** | 0° < θ < 90° | 45° |
| **Right** | θ = 90° | Corner of a page |
| **Obtuse** | 90° < θ < 180° | 120° |
| **Straight** | θ = 180° | A flat line |
| **Reflex** | 180° < θ < 360° | 270° |

**Triangle Classification:**

| By Sides | By Angles |
|:---------|:----------|
| **Equilateral** — all sides equal | **Acute** — all angles < 90° |
| **Isosceles** — two sides equal | **Right** — one angle = 90° |
| **Scalene** — no sides equal | **Obtuse** — one angle > 90° |

> NOTE: Sum of angles in any triangle = **180°**

**Essential Formulas:**

| Shape | Area | Perimeter |
|:------|:-----|:----------|
| **Rectangle** | length × width | 2(l + w) |
| **Square** | side² | 4 × side |
| **Triangle** | ½ × base × height | a + b + c |
| **Circle** | π × r² | 2 × π × r |
| **Parallelogram** | base × height | 2(a + b) |
| **Trapezium** | ½ × (a + b) × h | a + b + c + d |

**Pythagoras Theorem:**
In a right triangle: **a² + b² = c²** (where c is the hypotenuse)

Common Pythagorean triplets: (3,4,5), (5,12,13), (8,15,17), (7,24,25)

\`\`\`python path=null start=null
import math

# Area and perimeter calculations
def rectangle(l, w):
    return {"area": l * w, "perimeter": 2 * (l + w)}

def circle(r):
    return {"area": math.pi * r**2, "circumference": 2 * math.pi * r}

def triangle_area(base, height):
    return 0.5 * base * height

# Examples
rect = rectangle(8, 5)
print(f"Rectangle 8×5: Area = {rect['area']}, Perimeter = {rect['perimeter']}")

circ = circle(7)
print(f"Circle r=7: Area = {circ['area']:.2f}, Circumference = {circ['circumference']:.2f}")

print(f"Triangle (base=10, height=6): Area = {triangle_area(10, 6)}")

# Pythagoras theorem
a, b = 3, 4
c = math.sqrt(a**2 + b**2)
print(f"\\nPythagoras: {a}² + {b}² = {a**2} + {b**2} = {a**2 + b**2}")
print(f"Hypotenuse = √{a**2 + b**2} = {c}")

# Verify common triplets
triplets = [(3,4,5), (5,12,13), (8,15,17), (7,24,25)]
for a, b, c in triplets:
    valid = a**2 + b**2 == c**2
    print(f"({a},{b},{c}): {a}²+{b}²={a**2+b**2}, {c}²={c**2} → {'✓' if valid else '✗'}")
\`\`\`

### 8. Inequalities

Inequalities compare expressions using relational operators. This section covers solving techniques for various inequality types.

**Inequality Symbols:**

| Symbol | Meaning | Example |
|:-------|:--------|:--------|
| < | Less than | x < 5 (x is less than 5) |
| > | Greater than | x > 3 (x is greater than 3) |
| ≤ | Less than or equal to | x ≤ 7 (x is at most 7) |
| ≥ | Greater than or equal to | x ≥ 2 (x is at least 2) |

**Key Properties:**
- Adding/subtracting the same number to both sides preserves the inequality
- Multiplying/dividing by a **positive** number preserves the inequality
- Multiplying/dividing by a **negative** number **reverses** the inequality

\`\`\`python path=null start=null
# Solving linear inequality: 3x - 7 < 8
# Step 1: Add 7 to both sides
# 3x < 15
# Step 2: Divide by 3
# x < 5

def solve_linear_inequality(a, b, c, inequality_type='<'):
    """
    Solve ax + b < c (or >, <=, >=)
    Returns solution boundary and direction
    """
    boundary = (c - b) / a
    
    if a > 0:
        direction = '<' if inequality_type in ['<', '<='] else '>'
    else:
        direction = '>' if inequality_type in ['<', '<='] else '<'
    
    return f"x {direction} {boundary}"

print(f"3x - 7 < 8 → {solve_linear_inequality(3, -7, 8, '<')}")  # x < 5.0
print(f"-2x + 4 ≥ 10 → {solve_linear_inequality(-2, 4, 10, '>=')}")  # x <= -3.0
\`\`\`

#### 8.1 Interval Notation

Solutions to inequalities are often expressed using interval notation:

| Inequality | Interval | Number Line |
|:-----------|:---------|:------------|
| a < x < b | (a, b) | Open circles at both ends |
| a ≤ x ≤ b | [a, b] | Closed circles at both ends |
| a < x ≤ b | (a, b] | Open at a, closed at b |
| a ≤ x < b | [a, b) | Closed at a, open at b |
| x > a | (a, ∞) | Arrow to right |
| x < a | (-∞, a) | Arrow to left |
| x ≥ a | [a, ∞) | Closed circle, arrow right |
| x ≤ a | (-∞, a] | Closed circle, arrow left |

**Union of Intervals:** Use ∪ to combine disjoint intervals
- Example: x < -2 or x > 3 → (-∞, -2) ∪ (3, ∞)

\`\`\`python path=null start=null
def interval_to_set(interval_str):
    """Parse interval notation (simplified)"""
    examples = {
        "(2, 5)": "2 < x < 5",
        "[2, 5]": "2 ≤ x ≤ 5",
        "(2, 5]": "2 < x ≤ 5",
        "[2, 5)": "2 ≤ x < 5",
        "(-∞, 3)": "x < 3",
        "[3, ∞)": "x ≥ 3",
        "(-∞, -2) ∪ (3, ∞)": "x < -2 or x > 3"
    }
    return examples.get(interval_str, "Unknown format")

for interval in ["(2, 5)", "[-1, 4)", "(-∞, 0)"]:
    print(f"{interval} means: {interval_to_set(interval)}")
\`\`\`

#### 8.2 Quadratic Inequalities

To solve quadratic inequalities like ax² + bx + c > 0:

**Steps:**
1. Factor the quadratic (or use quadratic formula to find roots)
2. Find critical points (where expression = 0)
3. Use sign analysis (wavy curve method) on intervals
4. Select intervals based on inequality sign

\`\`\`python path=null start=null
import numpy as np

def solve_quadratic_inequality(a, b, c, inequality_type='>'):
    """
    Solve ax² + bx + c > 0 (or <, >=, <=)
    Returns intervals where inequality holds
    """
    # Find roots using quadratic formula
    discriminant = b**2 - 4*a*c
    
    if discriminant < 0:
        # No real roots - parabola doesn't cross x-axis
        if a > 0:
            return "All real numbers" if inequality_type in ['>', '>='] else "No solution"
        else:
            return "No solution" if inequality_type in ['>', '>='] else "All real numbers"
    
    sqrt_d = np.sqrt(discriminant)
    x1 = (-b - sqrt_d) / (2*a)
    x2 = (-b + sqrt_d) / (2*a)
    
    critical_points = sorted([x1, x2])
    return f"Critical points: x = {critical_points[0]}, {critical_points[1]}"

# Example: x² - 5x + 6 > 0
# Factors: (x - 2)(x - 3) > 0
print(f"x² - 5x + 6 > 0")
print(solve_quadratic_inequality(1, -5, 6, '>'))
print("Solution: x < 2 or x > 3, i.e., (-∞, 2) ∪ (3, ∞)")

# Example: x² - 4x + 4 ≤ 0
# Factors: (x - 2)² ≤ 0
print(f"\\nx² - 4x + 4 ≤ 0")
print("Solution: x = 2 only (single point)")
\`\`\`

**Sign Analysis:**
For (x - 2)(x - 3) > 0:

| Interval | (x - 2) | (x - 3) | Product | Satisfies > 0? |
|:---------|:--------|:--------|:--------|:---------------|
| x < 2 | Negative | Negative | Positive | ✓ |
| 2 < x < 3 | Positive | Negative | Negative | ✗ |
| x > 3 | Positive | Positive | Positive | ✓ |

**Solution:** x ∈ (-∞, 2) ∪ (3, ∞)

#### 8.3 Rational Inequalities (Wavy Curve Method)

Rational inequalities have the form P(x)/Q(x) < 0, > 0, ≤ 0, or ≥ 0.

**Critical Points:**
- **Numerator zeros:** Where P(x) = 0 (included in solution for ≤ or ≥)
- **Denominator zeros:** Where Q(x) = 0 (always excluded - undefined)

**Wavy Curve Method (Sign Chart Method):**

1. Factor numerator and denominator completely
2. Find all critical points
3. Mark critical points on number line
   - Open circle (○) for denominator zeros and strict inequalities
   - Closed circle (●) for numerator zeros with inclusive inequalities
4. Determine sign in rightmost interval (usually positive)
5. Alternate signs moving left (unless factor is squared - sign doesn't change)
6. Select intervals based on inequality

\`\`\`python path=null start=null
def analyze_rational_inequality():
    """
    Solve: (x - 1)(x + 2) / ((x - 3)(x + 1)) > 0
    
    Critical points:
    - Numerator zeros: x = 1, x = -2 (open circles since >)
    - Denominator zeros: x = 3, x = -1 (always open - undefined)
    
    Sign chart (right to left):
    Interval          | Sign | Satisfies > 0?
    x > 3             |  +   | ✓
    1 < x < 3         |  -   | ✗
    -1 < x < 1        |  +   | ✓
    -2 < x < -1       |  -   | ✗
    x < -2            |  +   | ✓
    """
    
    print("Solve: (x - 1)(x + 2) / ((x - 3)(x + 1)) > 0")
    print()
    print("Critical Points:")
    print("  Numerator zeros: x = -2, 1 (open circles)")
    print("  Denominator zeros: x = -1, 3 (undefined)")
    print()
    print("Sign Chart (right to left):")
    print("  x > 3:           +  ✓")
    print("  1 < x < 3:       -  ✗")
    print("  -1 < x < 1:      +  ✓")
    print("  -2 < x < -1:     -  ✗")
    print("  x < -2:          +  ✓")
    print()
    print("Solution: (-∞, -2) ∪ (-1, 1) ∪ (3, ∞)")

analyze_rational_inequality()
\`\`\`

**Example Problem:**

Solve: (x² - 4) / (x - 1) ≥ 0

**Solution:**
1. Factor: (x - 2)(x + 2) / (x - 1) ≥ 0
2. Critical points: x = -2, 1, 2
3. Sign analysis:
   - x > 2: (+) ✓
   - 1 < x < 2: (-) ✗
   - -2 < x < 1: (+) ✓
   - x < -2: (-) ✗
4. Include x = -2 and x = 2 (numerator zeros with ≥)
5. Exclude x = 1 (denominator zero)

**Solution:** [-2, 1) ∪ [2, ∞)

#### 8.4 Absolute Value Inequalities

**Type 1: |x| < a (or |x| ≤ a)**
- Solution: -a < x < a (or -a ≤ x ≤ a)
- Interpretation: x is within distance a from 0

**Type 2: |x| > a (or |x| ≥ a)**
- Solution: x < -a or x > a (or x ≤ -a or x ≥ a)
- Interpretation: x is more than distance a from 0

**General Form: |f(x)| < a**
- Rewrite as: -a < f(x) < a
- Solve the compound inequality

\`\`\`python path=null start=null
import numpy as np

def solve_abs_inequality(a, inequality_type='<'):
    """
    Solve |x| < a or |x| > a
    """
    if a <= 0:
        if inequality_type in ['<', '<=']:
            return "No solution" if a < 0 else "x = 0"
        else:
            return "All real numbers except 0" if a == 0 else "All real numbers"
    
    if inequality_type == '<':
        return f"-{a} < x < {a}, i.e., (-{a}, {a})"
    elif inequality_type == '<=':
        return f"-{a} ≤ x ≤ {a}, i.e., [-{a}, {a}]"
    elif inequality_type == '>':
        return f"x < -{a} or x > {a}, i.e., (-∞, -{a}) ∪ ({a}, ∞)"
    else:  # >=
        return f"x ≤ -{a} or x ≥ {a}, i.e., (-∞, -{a}] ∪ [{a}, ∞)"

print(f"|x| < 5 → {solve_abs_inequality(5, '<')}")
print(f"|x| ≥ 3 → {solve_abs_inequality(3, '>=')}")

# More complex: |x - 3| < 7
print(f"\\n|x - 3| < 7")
print("Rewrite: -7 < x - 3 < 7")
print("Add 3: -4 < x < 10")
print("Solution: (-4, 10)")
\`\`\`

**Special Cases:**

| Inequality | Solution | Reason |
|:-----------|:---------|:-------|
| &#124;x&#124; ≥ 0 | All real numbers | Absolute value is always non-negative |
| &#124;x&#124; < 0 | No solution | Absolute value cannot be negative |
| &#124;x&#124; > -5 | All real numbers | Absolute value is always ≥ 0 > -5 |

#### 8.5 Finding Integral Values

When asked to find integer solutions in an interval:

**Steps:**
1. Solve the inequality to find the solution interval
2. List all integers within that interval
3. Count or sum as required

\`\`\`python path=null start=null
def find_integral_solutions(inequality_solution, interval_type='open'):
    """
    Find integer solutions in a given interval
    """
    # Example: Find integers in (-2, 5]
    if interval_type == '(-2, 5]':
        integers = [-1, 0, 1, 2, 3, 4, 5]
    elif interval_type == '[-3, 4)':
        integers = [-3, -2, -1, 0, 1, 2, 3]
    elif interval_type == '(-∞, 3)':
        integers = "All integers < 3"
    else:
        integers = []
    
    return integers

print(f"Integers in (-2, 5]: {find_integral_solutions('ineq', '(-2, 5]')}")
print(f"Count: {len(find_integral_solutions('ineq', '(-2, 5]'))}")
print(f"Sum: {sum(find_integral_solutions('ineq', '(-2, 5]'))}")

# Example: Largest integer in (-∞, 7)
print(f"\\nLargest integer in (-∞, 7): 6")
print(f"Smallest integer in (2, ∞): 3")
\`\`\`

**Example:**
Find the sum of all integral values of x satisfying: -3 ≤ x < 5

**Solution:**
Integers: -3, -2, -1, 0, 1, 2, 3, 4
Sum = -3 + (-2) + (-1) + 0 + 1 + 2 + 3 + 4 = **4**

---

## TL;DR — Quick Recall

| Concept | Key Formula / Rule |
|:--------|:-------------------|
| **PEMDAS order** | Parentheses → Exponents → Mult/Div → Add/Sub |
| **Fraction → Decimal** | Divide numerator by denominator |
| **Percentage** | (part / whole) × 100 |
| **Direct Proportion** | y = kx (k is constant) |
| **Inverse Proportion** | y = k/x (xy = constant) |
| **HCF** | Product of **lowest** common prime powers |
| **LCM** | Product of **highest** prime powers |
| **HCF × LCM** | = a × b |
| **Triangle angle sum** | 180° |
| **Pythagoras** | a² + b² = c² |
| **Circle area** | πr² |
| **Rectangle area** | length × width |
| **Inequality reversal** | Multiply/divide by negative reverses sign |
| **Interval (a,b)** | a < x < b (open interval) |
| **Interval [a,b]** | a ≤ x ≤ b (closed interval) |
| **Interval (a,b]** | a < x ≤ b (half-open, open on left) |
| **Interval [a,b)** | a ≤ x < b (half-open, closed on left) |
| **&#124;x&#124; < a** | -a < x < a |
| **&#124;x&#124; > a** | x < -a or x > a |
| **Wavy Curve** | Factor → Critical points → Sign chart → Select intervals |

---

## Additional Resources

**Interactive:**
- [Khan Academy — Arithmetic](https://www.khanacademy.org/math/arithmetic)
- [Math is Fun — Number Types](https://www.mathsisfun.com/numbers/numbers-types.html)

**Videos:**
- [Khan Academy — Fractions](https://www.khanacademy.org/math/arithmetic/fraction-arithmetic)
- [Organic Chemistry Tutor — Basic Math](https://www.youtube.com/watch?v=jQ-fS2lsslU)
    `,
  subModules: [],
  practiceQuiz: [
    {
      id: "bm-q1",
      question: "Which of the following is an irrational number?",
      options: ["3/7", "0.25", "√2", "0.333..."],
      correctAnswer: 2,
      explanation:
        "√2 = 1.41421356... — it is non-terminating and non-repeating, which is the definition of irrational.\n\n• 3/7 is rational (fraction p/q)\n• 0.25 = 1/4 is rational (terminating decimal)\n• 0.333... = 1/3 is rational (repeating decimal)",
      difficulty: "easy",
    },
    {
      id: "bm-q2",
      question: "Evaluate: 8 + 2 × 5 - 3²",
      options: ["9", "41", "50", "12"],
      correctAnswer: 0,
      explanation:
        "Apply PEMDAS:\n\n1. Exponents: 3² = 9\n2. Multiplication: 2 × 5 = 10\n3. Left to right: 8 + 10 - 9 = 9\n\nCommon mistake: doing 8+2 first gives 50 — but multiplication comes before addition!",
      difficulty: "easy",
    },
    {
      id: "bm-q3",
      question: "What is 3/8 expressed as a percentage?",
      options: ["37.5%", "38%", "33.3%", "36%"],
      correctAnswer: 0,
      explanation:
        "Step 1: Convert to decimal → 3 ÷ 8 = 0.375\nStep 2: Multiply by 100 → 0.375 × 100 = 37.5%",
      difficulty: "easy",
    },
    {
      id: "bm-q4",
      question: "Find HCF of 36 and 48",
      options: ["6", "12", "18", "24"],
      correctAnswer: 1,
      explanation:
        "Prime factorization:\n• 36 = 2² × 3²\n• 48 = 2⁴ × 3¹\n\nHCF = product of lowest common powers = 2² × 3¹ = 4 × 3 = 12\n\nVerify: 36 ÷ 12 = 3 ✓ and 48 ÷ 12 = 4 ✓",
      difficulty: "medium",
    },
    {
      id: "bm-q5",
      question: "Find LCM of 12 and 18",
      options: ["36", "72", "6", "24"],
      correctAnswer: 0,
      explanation:
        "Prime factorization:\n• 12 = 2² × 3\n• 18 = 2 × 3²\n\nLCM = product of highest powers = 2² × 3² = 4 × 9 = 36\n\nVerify: 36 ÷ 12 = 3 ✓ and 36 ÷ 18 = 2 ✓",
      difficulty: "medium",
    },
    {
      id: "bm-q6",
      question: "Is 2781 divisible by 9?",
      options: [
        "Yes, digit sum = 18",
        "No, digit sum = 17",
        "Yes, digit sum = 27",
        "No, it's odd",
      ],
      correctAnswer: 0,
      explanation:
        "Divisibility rule for 9: sum of digits must be divisible by 9.\n\n2 + 7 + 8 + 1 = 18\n18 ÷ 9 = 2 ✓\n\nSo 2781 IS divisible by 9. (2781 ÷ 9 = 309)",
      difficulty: "easy",
    },
    {
      id: "bm-q7",
      question:
        "If 8 workers can build a wall in 15 days, how many days will 10 workers take?",
      options: ["12", "18", "10", "20"],
      correctAnswer: 0,
      explanation:
        "This is inverse proportion: more workers → fewer days.\n\nworkers × days = constant\n8 × 15 = 10 × d\n120 = 10d\nd = 12 days",
      difficulty: "medium",
    },
    {
      id: "bm-q8",
      question:
        "A right triangle has legs 5 cm and 12 cm. Find the hypotenuse.",
      options: ["13 cm", "17 cm", "15 cm", "11 cm"],
      correctAnswer: 0,
      explanation:
        "Pythagoras: a² + b² = c²\n\n5² + 12² = 25 + 144 = 169\nc = √169 = 13 cm\n\nThis is the famous (5, 12, 13) Pythagorean triplet!",
      difficulty: "easy",
    },
    {
      id: "bm-q9",
      question: "Find the area of a circle with radius 14 cm. (Use π ≈ 22/7)",
      options: ["616 cm²", "308 cm²", "154 cm²", "88 cm²"],
      correctAnswer: 0,
      explanation:
        "Area = πr² = (22/7) × 14² = (22/7) × 196 = 22 × 28 = 616 cm²\n\nTip: 22/7 simplifies nicely when r is a multiple of 7!",
      difficulty: "medium",
    },
    {
      id: "bm-q10",
      question: "Divide 240 in the ratio 3 : 5. What is the larger part?",
      options: ["150", "120", "160", "90"],
      correctAnswer: 0,
      explanation:
        "Total parts = 3 + 5 = 8\nEach part = 240 / 8 = 30\n\nSmaller part = 3 × 30 = 90\nLarger part = 5 × 30 = 150\n\nVerify: 90 + 150 = 240 ✓",
      difficulty: "easy",
    },
    {
      id: "bm-q11",
      question: "Solve: 3x - 7 < 8",
      options: ["x < 5", "x > 5", "x < 15", "x > 1/3"],
      correctAnswer: 0,
      explanation:
        "Step 1: Add 7 to both sides → 3x < 15\nStep 2: Divide by 3 → x < 5\n\nSolution: x < 5, or in interval notation: (-∞, 5)",
      difficulty: "easy",
    },
    {
      id: "bm-q12",
      question: "Solve: x² - 5x + 6 > 0",
      options: ["(2, 3)", "(-∞, 2) ∪ (3, ∞)", "[2, 3]", "(-∞, 2] ∪ [3, ∞)"],
      correctAnswer: 1,
      explanation:
        "Step 1: Factor → (x - 2)(x - 3) > 0\nStep 2: Critical points → x = 2, 3\nStep 3: Sign analysis:\n  • x < 2: (+) ✓\n  • 2 < x < 3: (-) ✗\n  • x > 3: (+) ✓\n\nSolution: (-∞, 2) ∪ (3, ∞)",
      difficulty: "medium",
    },
    {
      id: "bm-q13",
      question: "Solve: |x - 3| < 7",
      options: ["(-4, 10)", "(-10, 4)", "(-∞, -4) ∪ (10, ∞)", "[-4, 10]"],
      correctAnswer: 0,
      explanation:
        "|x - 3| < 7 means:\n-7 < x - 3 < 7\n\nAdd 3 to all parts:\n-7 + 3 < x < 7 + 3\n-4 < x < 10\n\nSolution: (-4, 10)",
      difficulty: "easy",
    },
    {
      id: "bm-q14",
      question: "Solve: (x - 2)/(x + 1) > 0",
      options: ["(-∞, -1) ∪ (2, ∞)", "(-1, 2)", "[-1, 2]", "(-∞, -1] ∪ [2, ∞)"],
      correctAnswer: 0,
      explanation:
        "Critical points:\n• Numerator zero: x = 2 (open circle, strict inequality)\n• Denominator zero: x = -1 (always open - undefined)\n\nSign chart (right to left):\n  • x > 2: (+) ✓\n  • -1 < x < 2: (-) ✗\n  • x < -1: (+) ✓\n\nSolution: (-∞, -1) ∪ (2, ∞)",
      difficulty: "medium",
    },
    {
      id: "bm-q15",
      question:
        "Find the number of integral values of x satisfying: -3 ≤ x < 5",
      options: ["7", "8", "9", "10"],
      correctAnswer: 1,
      explanation:
        "Integers in [-3, 5):\n-3, -2, -1, 0, 1, 2, 3, 4\n\nCount: 8 integers\n\nNote: -3 is included (≤), but 5 is excluded (<)",
      difficulty: "easy",
    },
    {
      id: "bm-q16",
      question:
        "What is the sum of all integral values of x satisfying: -2 < x ≤ 4?",
      options: ["6", "7", "8", "9"],
      correctAnswer: 3,
      explanation:
        "Integers in (-2, 4]:\n-1, 0, 1, 2, 3, 4\n\nSum = (-1) + 0 + 1 + 2 + 3 + 4 = 9\n\nAnswer: 9",
      difficulty: "medium",
    },
    {
      id: "bm-q17",
      question: "Solve: |x| ≥ 0",
      options: ["x = 0 only", "All real numbers", "No solution", "x > 0 only"],
      correctAnswer: 1,
      explanation:
        "Absolute value |x| is always non-negative for any real number x.\n\n|x| ≥ 0 is true for ALL real numbers.\n\nSolution: ℝ (all real numbers)",
      difficulty: "easy",
    },
    {
      id: "bm-q18",
      question: "Which interval represents: x < -2 or x > 3?",
      options: ["(-∞, -2) ∪ (3, ∞)", "(-2, 3)", "[-2, 3]", "(-∞, -2] ∪ [3, ∞)"],
      correctAnswer: 0,
      explanation:
        "x < -2 → (-∞, -2) (open interval, strict inequality)\nx > 3 → (3, ∞) (open interval, strict inequality)\n\nUnion: (-∞, -2) ∪ (3, ∞)",
      difficulty: "easy",
    },
    {
      id: "bm-q19",
      question: "Solve: (x² - 4)/(x - 1) ≥ 0",
      options: [
        "[-2, 1) ∪ [2, ∞)",
        "(-2, 1) ∪ (2, ∞)",
        "[-2, 1] ∪ [2, ∞)",
        "(-∞, -2] ∪ (1, 2]",
      ],
      correctAnswer: 0,
      explanation:
        "Step 1: Factor → (x-2)(x+2)/(x-1) ≥ 0\n\nCritical points:\n• Numerator zeros: x = -2, 2 (closed circles, ≥)\n• Denominator zero: x = 1 (always open)\n\nSign chart:\n  • x > 2: (+) ✓\n  • 1 < x < 2: (-) ✗\n  • -2 < x < 1: (+) ✓\n  • x < -2: (-) ✗\n\nSolution: [-2, 1) ∪ [2, ∞)",
      difficulty: "hard",
    },
    {
      id: "bm-q20",
      question: "Find the largest integral value of x satisfying: x < 7",
      options: ["7", "8", "6", "5"],
      correctAnswer: 2,
      explanation:
        "x < 7 means x can be any number less than 7, but NOT 7 itself.\n\nThe largest integer less than 7 is 6.\n\nAnswer: 6",
      difficulty: "easy",
    },
  ],
};
