import { LearningModule } from "@/types/learning";

export const coordinateGeometryModule: LearningModule = {
  id: "coordinate-geometry",
  title: "Coordinate Geometry",
  description:
    "Geometric foundations for data visualization, computer graphics, and spatial computing",
  status: "in-progress",
  detailedContent: `# Coordinate Geometry

Coordinate geometry bridges algebra and geometry, enabling us to represent geometric shapes with equations - essential for computer graphics, data visualization, game development, and spatial algorithms.

## What You'll Learn

| # | Topic | Skill |
|:--|:------|:------|
| 1 | **Distance Formula** | Calculate distance between two points |
| 2 | **Midpoint** | Find center of line segment |
| 3 | **Slope** | Calculate gradient of a line |
| 4 | **Line Equations** | Convert between different forms |
| 5 | **Circles** | Write and interpret circle equations |
| 6 | **Parabola** | Find vertex and direction |
| 7 | **Ellipse & Hyperbola** | Identify conic sections |
| 8 | **Applications** | Apply to graphics and collision detection |

## Math Notation & Pronunciation Guide

**Coordinates:**
- (x, y) - pronounced "point x comma y"
- (x₁, y₁) - "x sub one, y sub one"
- O - "origin" - point (0, 0)

**Distances & Slopes:**
- d - "distance"
- m - "slope" or "gradient"
- Δ - "delta" - change in value

**Shapes:**
- r - "radius"
- a, b - "semi-major axis, semi-minor axis" (ellipse)
- e - "eccentricity"

## Key Concepts

### 1. Cartesian Coordinate System

**The Plane:**
- x-axis: horizontal (positive right)
- y-axis: vertical (positive up)
- Origin (0, 0): intersection point
- Quadrants: I (+,+), II (-,+), III (-,-), IV (+,-)

\`\`\`python path=null start=null
import matplotlib.pyplot as plt
import numpy as np

# Create coordinate system visualization
fig, ax = plt.subplots(figsize=(8, 8))

# Draw axes
ax.axhline(y=0, color='k', linewidth=0.5)
ax.axvline(x=0, color='k', linewidth=0.5)

# Plot points in each quadrant
points = {
    'Q1': (3, 4),
    'Q2': (-3, 4),
    'Q3': (-3, -4),
    'Q4': (3, -4)
}

for name, (x, y) in points.items():
    ax.plot(x, y, 'o', markersize=10)
    ax.annotate(f'{name}({x},{y})', (x, y), textcoords="offset points", 
                xytext=(5,5), fontsize=10)

ax.set_xlim(-6, 6)
ax.set_ylim(-6, 6)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3)
ax.set_title('Cartesian Coordinate System')
plt.show()
\`\`\`

### 2. Distance Formula

**Distance between two points:**

d = √[(x₂ - x₁)² + (y₂ - y₁)²]

This is the Pythagorean theorem in action!

\`\`\`python path=null start=null
import numpy as np

def distance(p1, p2):
    """Calculate Euclidean distance between two points"""
    x1, y1 = p1
    x2, y2 = p2
    return np.sqrt((x2 - x1)**2 + (y2 - y1)**2)

# Example: Distance from (1, 2) to (4, 6)
p1 = (1, 2)
p2 = (4, 6)
d = distance(p1, p2)
print(f"Distance from {p1} to {p2} = {d}")  # 5.0

# Verify: 3² + 4² = 9 + 16 = 25 → √25 = 5

# Using NumPy for arrays of points
points = np.array([[0, 0], [3, 4], [6, 8]])
# Pairwise distances
from scipy.spatial.distance import cdist
distances = cdist(points, points)
print("Distance matrix:")
print(distances)
\`\`\`

**Midpoint Formula:**

M = ((x₁ + x₂)/2, (y₁ + y₂)/2)

\`\`\`python path=null start=null
def midpoint(p1, p2):
    """Calculate midpoint of two points"""
    x1, y1 = p1
    x2, y2 = p2
    return ((x1 + x2) / 2, (y1 + y2) / 2)

# Example
p1 = (2, 4)
p2 = (8, 10)
mid = midpoint(p1, p2)
print(f"Midpoint of {p1} and {p2} = {mid}")  # (5.0, 7.0)
\`\`\`

\`\`\`
136: 
137: ### 3. Pair of Straight Lines
138: 
139: **Homogeneous Equation (Lines passing through origin):**
140: ax² + 2hxy + by² = 0
141: 
142: Represents two lines y = m₁x and y = m₂x where:
143: - m₁ + m₂ = -2h/b
144: - m₁m₂ = a/b
145: 
146: **Angle between lines (θ):**
147: tan θ = |(2√(h² - ab)) / (a + b)|
148: - Parallel/Coincident if h² = ab
149: - Perpendicular if a + b = 0
150: 
151: **General Equation (Lines not necessarily through origin):**
152: ax² + 2hxy + by² + 2gx + 2fy + c = 0
153: Represents a pair of straight lines if determinant Δ = 0:
154: Δ = abc + 2fgh - af² - bg² - ch² = 0
155: 
156: \`\`\`python path=null start=null
157: import numpy as np
158: 
159: def analyze_pair_of_lines(a, h, b):
160:     """Analyze ax² + 2hxy + by² = 0"""
161:     # Slopes m = (-h ± √(h²-ab))/b
162:     discriminant = h**2 - a*b
163:     
164:     if discriminant < 0:
165:         return "Imaginary lines (Point at origin)"
166:     elif discriminant == 0:
167:         return "Coincident lines"
168:     
169:     term = np.sqrt(discriminant)
170:     tan_theta = (2 * term) / abs(a + b) if (a + b) != 0 else float('inf')
171:     angle_deg = np.degrees(np.arctan(tan_theta))
172:     
173:     return f"Real lines, Angle: {angle_deg:.2f}°"
174: 
175: # Example: x² - 5xy + 6y² = 0
176: # Compare to ax² + 2hxy + by² = 0
177: # a=1, 2h=-5 -> h=-2.5, b=6
178: print(analyze_pair_of_lines(1, -2.5, 6))
179: \`\`\`
180: 
181: ### 4. Equations of Lines

**Slope (Gradient):**

m = (y₂ - y₁) / (x₂ - x₁) = Δy / Δx = rise / run

\`\`\`python path=null start=null
def slope(p1, p2):
    """Calculate slope between two points"""
    x1, y1 = p1
    x2, y2 = p2
    if x2 - x1 == 0:
        return float('inf')  # Vertical line
    return (y2 - y1) / (x2 - x1)

# Example
p1 = (1, 2)
p2 = (4, 8)
m = slope(p1, p2)
print(f"Slope = {m}")  # 2.0
\`\`\`

**Forms of Line Equation:**

| Form | Equation | Use Case |
|:-----|:---------|:---------|
| Slope-Intercept | y = mx + c | Know slope & y-intercept |
| Point-Slope | y - y₁ = m(x - x₁) | Know slope & one point |
| Two-Point | (y - y₁)/(y₂ - y₁) = (x - x₁)/(x₂ - x₁) | Know two points |
| General | ax + by + c = 0 | Standard form |
| Intercept | x/a + y/b = 1 | Know x & y intercepts |

\`\`\`python path=null start=null
import numpy as np
import matplotlib.pyplot as plt

# Slope-intercept form: y = mx + c
def line_slope_intercept(x, m, c):
    return m * x + c

# Point-slope form: y - y1 = m(x - x1)
def line_point_slope(x, m, x1, y1):
    return m * (x - x1) + y1

# Plot different lines
x = np.linspace(-5, 5, 100)

plt.figure(figsize=(10, 8))

# y = 2x + 1
plt.plot(x, line_slope_intercept(x, 2, 1), label='y = 2x + 1')

# Line through (1, 3) with slope 0.5
plt.plot(x, line_point_slope(x, 0.5, 1, 3), label='m=0.5 through (1,3)')

# Horizontal line: y = 2
plt.axhline(y=2, color='green', linestyle='--', label='y = 2 (horizontal)')

# Vertical line: x = 3
plt.axvline(x=3, color='red', linestyle='--', label='x = 3 (vertical)')

plt.grid(True, alpha=0.3)
plt.legend()
plt.xlim(-5, 5)
plt.ylim(-5, 10)
plt.title('Different Line Forms')
plt.show()
\`\`\`

**Parallel & Perpendicular Lines:**
- Parallel: m₁ = m₂ (same slope)
- Perpendicular: m₁ × m₂ = -1 (negative reciprocal)

\`\`\`python path=null start=null
# Check if lines are parallel or perpendicular
m1 = 2
m2 = 2
m3 = -0.5

print(f"Slopes {m1} and {m2}: {'Parallel' if m1 == m2 else 'Not parallel'}")
print(f"Slopes {m1} and {m3}: {m1 * m3 = }")
print(f"{'Perpendicular' if abs(m1 * m3 + 1) < 1e-10 else 'Not perpendicular'}")
\`\`\`

### 5. Circles

**Standard Form:**
(x - h)² + (y - k)² = r²

Where (h, k) is the center and r is the radius.

**General Form:**
x² + y² + 2gx + 2fy + c = 0

Center: (-g, -f), Radius: √(g² + f² - c)

\`\`\`python path=null start=null
import numpy as np
import matplotlib.pyplot as plt

def plot_circle(h, k, r, ax, label='', color='blue'):
    """Plot a circle with center (h,k) and radius r"""
    theta = np.linspace(0, 2*np.pi, 100)
    x = h + r * np.cos(theta)
    y = k + r * np.sin(theta)
    ax.plot(x, y, color=color, label=label)
    ax.plot(h, k, 'o', color=color)  # Center

fig, ax = plt.subplots(figsize=(8, 8))

# Circle centered at origin with radius 3
plot_circle(0, 0, 3, ax, 'Center (0,0), r=3', 'blue')

# Circle centered at (2, 3) with radius 2
plot_circle(2, 3, 2, ax, 'Center (2,3), r=2', 'red')

ax.set_xlim(-6, 6)
ax.set_ylim(-6, 8)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3)
ax.legend()
ax.set_title('Circles')
plt.show()

# Convert between forms
def general_to_standard(g, f, c):
    """Convert general form to standard form"""
    h, k = -g, -f
    r_squared = g**2 + f**2 - c
    if r_squared > 0:
        r = np.sqrt(r_squared)
        return h, k, r
    return None  # Not a real circle

# Example: x² + y² - 4x + 6y - 12 = 0
# Here: 2g = -4, 2f = 6, c = -12
g, f, c = -2, 3, -12
h, k, r = general_to_standard(g, f, c)
print(f"Center: ({h}, {k}), Radius: {r}")  # (2, -3), 5
\`\`\`

### 6. Parabola

**Standard Forms:**

| Form | Equation | Opens |
|:-----|:---------|:------|
| Vertical | y = ax² + bx + c | Up (a>0) or Down (a<0) |
| Vertical (vertex) | y = a(x-h)² + k | Vertex at (h,k) |
| Horizontal | x = ay² + by + c | Right (a>0) or Left (a<0) |

**Key Properties:**
- Vertex: Turning point
- Focus: Point inside parabola
- Directrix: Line outside parabola
- Distance to focus = Distance to directrix (definition)

\`\`\`python path=null start=null
import numpy as np
import matplotlib.pyplot as plt

# Standard parabola: y = x²
x = np.linspace(-3, 3, 100)
y = x**2

plt.figure(figsize=(12, 4))

# Subplot 1: y = x²
plt.subplot(1, 3, 1)
plt.plot(x, y, 'b-', linewidth=2)
plt.axhline(y=0, color='k', linewidth=0.5)
plt.axvline(x=0, color='k', linewidth=0.5)
plt.grid(True, alpha=0.3)
plt.title('y = x² (opens up)')

# Subplot 2: y = -x² (opens down)
plt.subplot(1, 3, 2)
plt.plot(x, -y, 'r-', linewidth=2)
plt.axhline(y=0, color='k', linewidth=0.5)
plt.axvline(x=0, color='k', linewidth=0.5)
plt.grid(True, alpha=0.3)
plt.title('y = -x² (opens down)')

# Subplot 3: Shifted parabola y = (x-2)² - 1
plt.subplot(1, 3, 3)
y_shifted = (x - 2)**2 - 1
plt.plot(x, y_shifted, 'g-', linewidth=2)
plt.plot(2, -1, 'ro', markersize=8, label='Vertex (2,-1)')
plt.axhline(y=0, color='k', linewidth=0.5)
plt.axvline(x=0, color='k', linewidth=0.5)
plt.grid(True, alpha=0.3)
plt.legend()
plt.title('y = (x-2)² - 1')

plt.tight_layout()
plt.show()
\`\`\`

**Finding Vertex from y = ax² + bx + c:**
- h = -b / (2a)
- k = c - b² / (4a)

### 7. Ellipse

**Standard Form (centered at origin):**

x²/a² + y²/b² = 1

Where:
- a = semi-major axis
- b = semi-minor axis
- If a > b: horizontal ellipse
- If b > a: vertical ellipse

**Key Properties:**
- Center: (0, 0) or (h, k) if shifted
- Foci: Located at distance c from center, where c² = |a² - b²|
- Eccentricity: e = c/a (0 ≤ e < 1)
  - e = 0: Circle
  - e close to 1: Very elongated

\`\`\`python path=null start=null
import numpy as np
import matplotlib.pyplot as plt

def plot_ellipse(a, b, h=0, k=0, ax=None, label=''):
    """Plot ellipse with semi-axes a, b centered at (h, k)"""
    theta = np.linspace(0, 2*np.pi, 100)
    x = h + a * np.cos(theta)
    y = k + b * np.sin(theta)
    if ax is None:
        plt.plot(x, y, label=label)
    else:
        ax.plot(x, y, label=label)
    return x, y

fig, ax = plt.subplots(figsize=(10, 8))

# Circle (a = b)
plot_ellipse(2, 2, ax=ax, label='Circle: a=b=2')

# Horizontal ellipse (a > b)
plot_ellipse(4, 2, ax=ax, label='Horizontal: a=4, b=2')

# Vertical ellipse (b > a)
plot_ellipse(2, 4, ax=ax, label='Vertical: a=2, b=4')

ax.set_xlim(-6, 6)
ax.set_ylim(-6, 6)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3)
ax.legend()
ax.set_title('Ellipses')
plt.show()

# Calculate properties
def ellipse_properties(a, b):
    c = np.sqrt(abs(a**2 - b**2))
    e = c / max(a, b)
    return {
        'semi_major': max(a, b),
        'semi_minor': min(a, b),
        'c (focal distance)': c,
        'eccentricity': e
    }

props = ellipse_properties(5, 3)
print("Ellipse x²/25 + y²/9 = 1:")
for key, val in props.items():
    print(f"  {key}: {val:.3f}")
\`\`\`

### 8. Hyperbola

**Standard Forms:**

Horizontal: x²/a² - y²/b² = 1
Vertical: y²/a² - x²/b² = 1

**Key Properties:**
- Two separate branches
- Asymptotes: y = ±(b/a)x
- Foci: c² = a² + b²
- Eccentricity: e = c/a (e > 1)

\`\`\`python path=null start=null
import numpy as np
import matplotlib.pyplot as plt

def plot_hyperbola(a, b, ax, horizontal=True):
    """Plot hyperbola"""
    # Parameter for hyperbola
    t = np.linspace(-2, 2, 100)
    
    if horizontal:  # x²/a² - y²/b² = 1
        # Right branch
        x_right = a * np.cosh(t)
        y = b * np.sinh(t)
        ax.plot(x_right, y, 'b-', linewidth=2)
        # Left branch
        ax.plot(-x_right, y, 'b-', linewidth=2)
        # Asymptotes
        x_line = np.linspace(-5, 5, 50)
        ax.plot(x_line, (b/a)*x_line, 'r--', alpha=0.5, label='Asymptotes')
        ax.plot(x_line, -(b/a)*x_line, 'r--', alpha=0.5)
    else:  # y²/a² - x²/b² = 1
        x = b * np.sinh(t)
        y_top = a * np.cosh(t)
        ax.plot(x, y_top, 'b-', linewidth=2)
        ax.plot(x, -y_top, 'b-', linewidth=2)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

# Horizontal hyperbola
plot_hyperbola(2, 1, ax1, horizontal=True)
ax1.set_xlim(-5, 5)
ax1.set_ylim(-4, 4)
ax1.set_aspect('equal')
ax1.grid(True, alpha=0.3)
ax1.set_title('x²/4 - y² = 1 (Horizontal)')
ax1.legend()

# Vertical hyperbola
plot_hyperbola(2, 1, ax2, horizontal=False)
ax2.set_xlim(-4, 4)
ax2.set_ylim(-5, 5)
ax2.set_aspect('equal')
ax2.grid(True, alpha=0.3)
ax2.set_title('y²/4 - x² = 1 (Vertical)')

plt.tight_layout()
plt.show()
\`\`\`

### 9. Applications in Computer Science

**1. Computer Graphics & Games:**
\`\`\`python path=null start=null
# Collision detection using distance
def circles_collide(c1_center, c1_radius, c2_center, c2_radius):
    """Check if two circles collide"""
    dist = distance(c1_center, c2_center)
    return dist < (c1_radius + c2_radius)

# Example: Game objects
player = {'pos': (100, 150), 'radius': 20}
enemy = {'pos': (120, 160), 'radius': 15}

if circles_collide(player['pos'], player['radius'], 
                   enemy['pos'], enemy['radius']):
    print("Collision detected!")
\`\`\`

**2. Data Visualization:**
\`\`\`python path=null start=null
# Mapping data to coordinates
import matplotlib.pyplot as plt

# 2D scatter plot of data
data_x = [1, 2, 3, 4, 5]
data_y = [2, 4, 5, 4, 5]

plt.figure(figsize=(8, 6))
plt.scatter(data_x, data_y, s=100)

# Add regression line
m, c = np.polyfit(data_x, data_y, 1)
x_line = np.linspace(0, 6, 50)
plt.plot(x_line, m*x_line + c, 'r--', label=f'y = {m:.2f}x + {c:.2f}')

plt.xlabel('X')
plt.ylabel('Y')
plt.legend()
plt.grid(True, alpha=0.3)
plt.title('Linear Regression')
plt.show()
\`\`\`

**3. Path Finding:**
\`\`\`python path=null start=null
# Heuristic for A* algorithm (Euclidean distance)
def heuristic(current, goal):
    return distance(current, goal)

# Manhattan distance (for grid-based movement)
def manhattan_distance(p1, p2):
    return abs(p1[0] - p2[0]) + abs(p1[1] - p2[1])
\`\`\`

---

## TL;DR - Quick Recall

| Concept | Formula |
|:--------|:--------|
| **Distance** | d = √[(x₂-x₁)² + (y₂-y₁)²] |
| **Midpoint** | M = ((x₁+x₂)/2, (y₁+y₂)/2) |
| **Slope** | m = (y₂-y₁)/(x₂-x₁) |
| **Line (slope-intercept)** | y = mx + c |
| **Circle** | (x-h)² + (y-k)² = r² |
| **Ellipse** | x²/a² + y²/b² = 1 |
| **Hyperbola** | x²/a² - y²/b² = 1 |
| **Parabola** | y = a(x-h)² + k |

**Parallel lines:** m₁ = m₂
**Perpendicular lines:** m₁ × m₂ = -1

---

## Additional Resources

**Interactive:**
- [Desmos Graphing Calculator](https://www.desmos.com/calculator)
- [GeoGebra](https://www.geogebra.org/)

**Videos:**
- [Khan Academy - Conic Sections](https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:conics)
- [3Blue1Brown - Essence of Linear Algebra](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab)
    `,
  subModules: [],
  practiceQuiz: [
    {
      id: "cg-q1",
      question: "Find the distance between points (1, 2) and (4, 6)",
      options: ["3", "4", "5", "7"],
      correctAnswer: 2,
      explanation:
        "Formula: d = √[(x₂-x₁)² + (y₂-y₁)²]\n\nStep-by-step:\n• d = √[(4-1)² + (6-2)²]\n• d = √[3² + 4²] = √[9 + 16]\n• d = √25 = 5\n\nThis is a 3-4-5 right triangle!",
      difficulty: "easy",
    },
    {
      id: "cg-q2",
      question:
        "What is the slope of the line passing through (2, 3) and (6, 11)?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 1,
      explanation:
        "Formula: m = (y₂ - y₁) / (x₂ - x₁)\n\nStep-by-step:\n• m = (11 - 3) / (6 - 2)\n• m = 8 / 4 = 2\n\nSlope = rise/run = how much y changes per unit x.",
      difficulty: "easy",
    },
    {
      id: "cg-q3",
      question: "Find the center of the circle: x² + y² - 6x + 4y - 12 = 0",
      options: ["(3, -2)", "(-3, 2)", "(6, -4)", "(-6, 4)"],
      correctAnswer: 0,
      explanation:
        "General form: x² + y² + 2gx + 2fy + c = 0\nCenter: (-g, -f)\n\nStep-by-step:\n• 2g = -6 → g = -3\n• 2f = 4 → f = 2\n• Center = (-(-3), -2) = (3, -2)\n\nAlways negate the coefficients!",
      difficulty: "medium",
    },
    {
      id: "cg-q4",
      question: "Two lines are perpendicular if their slopes multiply to:",
      options: ["0", "1", "-1", "undefined"],
      correctAnswer: 2,
      explanation:
        "Rule: Perpendicular lines have m₁ × m₂ = -1\n\nExample:\n• Line 1: slope = 2\n• Line 2: slope = -1/2\n• 2 × (-1/2) = -1\n\nThey're negative reciprocals of each other.",
      difficulty: "easy",
    },
    {
      id: "cg-q5",
      question: "The eccentricity of a circle is:",
      options: ["0", "1", "∞", "undefined"],
      correctAnswer: 0,
      explanation:
        "Eccentricity (e) measures how 'stretched' a conic is:\n\n• Circle: e = 0 (perfectly round)\n• Ellipse: 0 < e < 1\n• Parabola: e = 1\n• Hyperbola: e > 1\n\nCircle has e = 0 because foci coincide with center.",
      difficulty: "easy",
    },
    {
      id: "cg-q6",
      question: "Find the midpoint of (2, 4) and (8, 10)",
      options: ["(5, 7)", "(6, 14)", "(10, 14)", "(4, 6)"],
      correctAnswer: 0,
      explanation:
        "Formula: M = ((x₁+x₂)/2, (y₁+y₂)/2)\n\nStep-by-step:\n• x = (2+8)/2 = 5\n• y = (4+10)/2 = 7\n• Midpoint = (5, 7)",
      difficulty: "easy",
    },
    {
      id: "cg-q7",
      question: "The equation y = 2x + 3 has y-intercept:",
      options: ["2", "3", "-3", "-2"],
      correctAnswer: 1,
      explanation:
        "y = mx + c format:\n\n• m = slope = 2\n• c = y-intercept = 3\n\nThe line crosses y-axis at (0, 3)",
      difficulty: "easy",
    },
    {
      id: "cg-q8",
      question: "Distance of point (3, 4) from origin is:",
      options: ["3", "4", "5", "7"],
      correctAnswer: 2,
      explanation:
        "Origin is (0, 0).\n\nStep-by-step:\n• d = √[(3-0)² + (4-0)²]\n• d = √[9 + 16] = √25 = 5\n\nClassic 3-4-5 Pythagorean triple!",
      difficulty: "easy",
    },
    {
      id: "cg-q9",
      question: "The parabola y = x² - 4x + 3 has vertex at:",
      options: ["(2, -1)", "(2, 1)", "(-2, -1)", "(4, 3)"],
      correctAnswer: 0,
      explanation:
        "Vertex formula: h = -b/(2a), k = f(h)\n\nStep-by-step:\n• a=1, b=-4, c=3\n• h = -(-4)/(2×1) = 2\n• k = (2)² - 4(2) + 3 = 4 - 8 + 3 = -1\n• Vertex = (2, -1)",
      difficulty: "medium",
    },
    {
      id: "cg-q10",
      question: "Area of triangle with vertices (0,0), (4,0), (0,3) is:",
      options: ["6", "7", "12", "24"],
      correctAnswer: 0,
      explanation:
        "Formula: Area = ½ × base × height\n\nStep-by-step:\n• Base on x-axis = 4 units\n• Height on y-axis = 3 units\n• Area = ½ × 4 × 3 = 6 sq units",
      difficulty: "easy",
    },
  ],
};
