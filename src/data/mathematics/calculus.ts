import { LearningModule } from "@/types/learning";

export const calculusModule: LearningModule = {
  id: "calculus",
  title: "Calculus",
  description: "Derivatives and optimization - how neural networks learn",
  status: "in-progress",
  detailedContent: `# Calculus for AI Engineers

Calculus is the mathematics of change and optimization. Without calculus, neural networks couldn&apos;t learn - there would be no backpropagation, no gradient descent, no training.

## 🎯 What You'll Learn

| # | Topic | Skill |
|:--|:------|:------|
| 1 | **Limits** | Calculate limits and understand continuity |
| 2 | **Derivatives** | Find derivatives using rules (chain, product, quotient) |
| 3 | **Partial Derivatives** | Compute gradients for multivariable functions |
| 4 | **Gradient Descent** | Understand how neural networks optimize |
| 5 | **Integration** | Calculate areas and cumulative distributions |
| 6 | **Applications** | Apply calculus to ML loss functions |

## Math Notation & Pronunciation Guide

Before we dive in, let&apos;s decode the symbols you&apos;ll see:

**Derivatives:**
- f'(x) - pronounced "f prime of x" - derivative of f with respect to x
- df/dx - pronounced "d f d x" - derivative of f with respect to x
- ∂f/∂x - pronounced "partial f partial x" or "del f del x" - partial derivative
- d²f/dx² - pronounced "d squared f d x squared" - second derivative
- ∇f - pronounced "nabla f" or "del f" or "gradient of f" - gradient vector

**Greek Letters:**
- α (alpha) - learning rate
- β (beta) - momentum parameter
- γ (gamma) - discount factor (RL), learning rate decay
- η (eta) - learning rate (alternative)
- ε (epsilon) - small constant (e.g., 1e-8)
- θ (theta) - parameters/weights
- λ (lambda) - regularization parameter

**Special Symbols:**
- ≈ - pronounced "approximately equal"
- → - pronounced "approaches" or "goes to"
- ∞ - pronounced "infinity"
- Σ - pronounced "sigma" or "sum"
- ∫ - pronounced "integral"
- lim - pronounced "limit"
- argmin - pronounced "arg min" - argument that minimizes
- argmax - pronounced "arg max" - argument that maximizes

## Key Jargon Definitions

- **Derivative**: Rate of change of a function; slope at a point
- **Gradient**: Vector of all partial derivatives; points in direction of steepest increase
- **Partial Derivative**: Derivative with respect to one variable, holding others constant
- **Chain Rule**: Method to compute derivative of composite functions
- **Gradient Descent**: Iterative optimization algorithm that follows negative gradient
- **Learning Rate**: Step size in gradient descent; how fast we update weights
- **Epoch**: One complete pass through the entire training dataset
- **Batch**: Subset of training data used to compute gradient
- **Loss Function**: Measures how wrong the model&apos;s predictions are
- **Optimizer**: Algorithm that updates weights (SGD, Adam, RMSprop)
- **Momentum**: Technique that accelerates gradient descent using past gradients
- **Backpropagation**: Algorithm to compute gradients in neural networks using chain rule
- **Vanishing Gradient**: Problem where gradients become too small in deep networks
- **Exploding Gradient**: Problem where gradients become too large, causing instability
- **Convergence**: When optimization reaches a minimum (gradient ≈ 0)

## Why Calculus Matters

Calculus is the mathematics of change and optimization. It forms the foundation for physics, engineering, and machine learning. Neural networks learn through calculus - backpropagation relies on derivatives and the chain rule.

## What You&apos;ll Master

### 1. Limits - The Foundation

**What is a Limit?**
A limit describes what value a function approaches as the input approaches some value.

lim(x→a) f(x) = L means "as x gets closer to a, f(x) gets closer to L"

**Evaluating Limits:**

\`\`\`python path=null start=null
import numpy as np

# Numerical limit evaluation
def evaluate_limit(f, a, epsilon=1e-10):
    """Evaluate limit of f(x) as x approaches a"""
    left = f(a - epsilon)
    right = f(a + epsilon)
    if abs(left - right) < 1e-6:
        return (left + right) / 2
    return None  # Limit doesn't exist

# Example: lim(x→2) (x² - 4)/(x - 2)
f = lambda x: (x**2 - 4) / (x - 2) if x != 2 else np.nan
limit = evaluate_limit(f, 2)
print(f"lim(x→2) (x² - 4)/(x - 2) = {limit}")  # = 4

# Algebraically: (x² - 4)/(x - 2) = (x+2)(x-2)/(x-2) = x+2
# At x = 2: limit = 2 + 2 = 4
\`\`\`

**Important Limit Rules:**
- lim(x→a)[f(x) + g(x)] = lim f(x) + lim g(x)
- lim(x→a)[f(x) × g(x)] = lim f(x) × lim g(x)
- lim(x→a)[f(x)/g(x)] = lim f(x) / lim g(x), if lim g(x) ≠ 0

**Standard Limits:**
- lim(x→0) (sin x)/x = 1
- lim(x→0) (1 + x)^(1/x) = e ≈ 2.718
- lim(x→∞) (1 + 1/n)^n = e

### 2. Continuity

**Definition:**
A function f is continuous at point a if:
1. f(a) is defined
2. lim(x→a) f(x) exists
3. lim(x→a) f(x) = f(a)

**Types of Discontinuities:**
- **Removable**: Limit exists but ≠ f(a) or f(a) undefined
- **Jump**: Left and right limits both exist but differ
- **Infinite**: Function approaches ±∞

\`\`\`python path=null start=null
import numpy as np
import matplotlib.pyplot as plt

# Continuous function
def continuous_f(x):
    return x**2

# Function with removable discontinuity
def removable_discontinuity(x):
    if x == 0:
        return np.nan  # Undefined at 0
    return np.sin(x) / x

# Function with jump discontinuity
def jump_discontinuity(x):
    return np.where(x < 0, -1, 1)

x = np.linspace(-3, 3, 500)

fig, axes = plt.subplots(1, 3, figsize=(15, 4))

axes[0].plot(x, continuous_f(x))
axes[0].set_title('Continuous: f(x) = x²')

x_nz = x[x != 0]
axes[1].plot(x_nz, np.sin(x_nz)/x_nz)
axes[1].scatter([0], [1], color='red', zorder=5)
axes[1].set_title('Removable: f(x) = sin(x)/x')

axes[2].plot(x[x<0], [-1]*len(x[x<0]), 'b-')
axes[2].plot(x[x>=0], [1]*len(x[x>=0]), 'b-')
axes[2].scatter([0, 0], [-1, 1], color='red', zorder=5)
axes[2].set_title('Jump: sign function')

plt.tight_layout()
plt.show()
\`\`\`

### 3. Derivatives - Measuring Change

**What is a Derivative?**
The derivative measures how a function changes when its input changes. It&apos;s the slope of the tangent line.

Definition: f&apos;(x) = limit as h→0 of [f(x+h) - f(x)] / h

**Common Derivative Rules:**

- Power rule: d/dx(xⁿ) = n·xⁿ⁻¹
  Example: d/dx(x³) = 3x²

- Constant rule: d/dx(c) = 0

- Sum rule: d/dx(f + g) = f&apos; + g&apos;

- Product rule: d/dx(f·g) = f&apos;g + fg&apos;

- Quotient rule: d/dx(f/g) = (f&apos;g - fg&apos;) / g²

- Chain rule: d/dx(f(g(x))) = f&apos;(g(x)) · g&apos;(x)

**Important Function Derivatives:**
- d/dx(eˣ) = eˣ
- d/dx(ln(x)) = 1/x
- d/dx(sin(x)) = cos(x)
- d/dx(cos(x)) = -sin(x)
- d/dx(tan(x)) = sec²(x)
- d/dx(1/(1+e⁻ˣ)) = sigmoid(x)·(1-sigmoid(x))

### 4. Maxima and Minima

**Finding Extrema:**
1. Find f&apos;(x) = 0 (critical points)
2. Use second derivative test:
   - f&apos;&apos;(x) > 0 → Local minimum
   - f&apos;&apos;(x) < 0 → Local maximum
   - f&apos;&apos;(x) = 0 → Inconclusive (use other methods)

\`\`\`python path=null start=null
import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import minimize_scalar

# Example: f(x) = x³ - 6x² + 9x + 1
def f(x):
    return x**3 - 6*x**2 + 9*x + 1

def f_prime(x):
    return 3*x**2 - 12*x + 9

def f_double_prime(x):
    return 6*x - 12

# Find critical points: f'(x) = 0
# 3x² - 12x + 9 = 0 → x² - 4x + 3 = 0 → (x-1)(x-3) = 0
critical_points = [1, 3]

for cp in critical_points:
    second_deriv = f_double_prime(cp)
    if second_deriv > 0:
        print(f"x = {cp}: Local MINIMUM, f({cp}) = {f(cp)}")
    elif second_deriv < 0:
        print(f"x = {cp}: Local MAXIMUM, f({cp}) = {f(cp)}")
    else:
        print(f"x = {cp}: Inconclusive")

# Plot
x = np.linspace(-1, 5, 200)
plt.figure(figsize=(10, 6))
plt.plot(x, f(x), 'b-', linewidth=2, label='f(x)')
plt.scatter(critical_points, [f(cp) for cp in critical_points], 
            color='red', s=100, zorder=5, label='Critical points')
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title('f(x) = x³ - 6x² + 9x + 1')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
\`\`\`

**Applications:**
- Machine Learning: Finding minimum of loss function
- Economics: Maximizing profit, minimizing cost
- Physics: Finding equilibrium points

### 5. Integration

**What is Integration?**
Integration is the reverse of differentiation. It finds the area under a curve.

∫f(x)dx = F(x) + C, where F&apos;(x) = f(x)

**Basic Integration Rules:**

| Function | Integral |
|----------|----------|
| xⁿ | xⁿ⁺¹/(n+1) + C |
| 1/x | ln|x| + C |
| eˣ | eˣ + C |
| sin(x) | -cos(x) + C |
| cos(x) | sin(x) + C |

**Integration by Substitution:**
For ∫f(g(x))·g&apos;(x)dx, let u = g(x), then:
∫f(u)du

\`\`\`python path=null start=null
import numpy as np
from scipy import integrate

# Example: ∫2x·cos(x²)dx
# Let u = x², du = 2x·dx
# ∫cos(u)du = sin(u) + C = sin(x²) + C

# Verify numerically
f = lambda x: 2*x * np.cos(x**2)
antiderivative = lambda x: np.sin(x**2)

# Check: integral from 0 to 2
numerical, _ = integrate.quad(f, 0, 2)
analytical = antiderivative(2) - antiderivative(0)

print(f"Numerical integral: {numerical:.6f}")
print(f"Analytical result: {analytical:.6f}")
\`\`\`

**Integration by Parts:**
∫u·dv = uv - ∫v·du

Choose u and dv using LIATE rule:
- **L**ogarithmic
- **I**nverse trig
- **A**lgebraic
- **T**rigonometric
- **E**xponential

\`\`\`python path=null start=null
# Example: ∫x·eˣdx
# u = x, dv = eˣdx
# du = dx, v = eˣ
# ∫x·eˣdx = x·eˣ - ∫eˣdx = x·eˣ - eˣ + C = eˣ(x-1) + C

import numpy as np
from scipy import integrate

f = lambda x: x * np.exp(x)
antiderivative = lambda x: np.exp(x) * (x - 1)

# Verify from 0 to 2
numerical, _ = integrate.quad(f, 0, 2)
analytical = antiderivative(2) - antiderivative(0)

print(f"∫x·eˣdx from 0 to 2:")
print(f"Numerical: {numerical:.6f}")
print(f"Analytical: {analytical:.6f}")
\`\`\`

### 6. Definite Integrals and Area

**Definite Integral:**
∫[a to b] f(x)dx = F(b) - F(a)

**Area Between Curves:**
Area = ∫[a to b] |f(x) - g(x)|dx

\`\`\`python path=null start=null
import numpy as np
import matplotlib.pyplot as plt
from scipy import integrate

# Area between y = x² and y = x from 0 to 1
f = lambda x: x
g = lambda x: x**2

# Area = ∫(x - x²)dx from 0 to 1
area_func = lambda x: x - x**2
area, _ = integrate.quad(area_func, 0, 1)

print(f"Area between y=x and y=x² from 0 to 1: {area:.4f}")
# Analytically: [x²/2 - x³/3] from 0 to 1 = 1/2 - 1/3 = 1/6 ≈ 0.1667

# Visualize
x = np.linspace(0, 1, 100)
plt.figure(figsize=(8, 6))
plt.plot(x, f(x), 'b-', label='y = x')
plt.plot(x, g(x), 'r-', label='y = x²')
plt.fill_between(x, f(x), g(x), alpha=0.3, color='green', label=f'Area = {area:.4f}')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Area Between Curves')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
\`\`\`

### 7. Partial Derivatives and Gradients

**What is a Derivative?**
The derivative measures how a function changes when its input changes. It&apos;s the slope of the tangent line.

Definition: f'(x) = limit as h→0 of [f(x+h) - f(x)] / h

**Common Derivative Rules:**

- Power rule: d/dx(xⁿ) = n·xⁿ⁻¹
  Example: d/dx(x³) = 3x²

- Constant rule: d/dx(c) = 0

- Sum rule: d/dx(f + g) = f&apos; + g&apos;

- Product rule: d/dx(f·g) = f&apos;g + fg&apos;

- Quotient rule: d/dx(f/g) = (f&apos;g - fg&apos;) / g²

- Chain rule: d/dx(f(g(x))) = f&apos;(g(x)) · g&apos;(x)

**Important Function Derivatives:**
- d/dx(eˣ) = eˣ
- d/dx(ln(x)) = 1/x
- d/dx(sin(x)) = cos(x)
- d/dx(cos(x)) = -sin(x)
- d/dx(1/(1+e⁻ˣ)) = sigmoid(x)·(1-sigmoid(x))

**Partial Derivatives:**
For functions of multiple variables f(x, y), we compute derivatives with respect to each variable separately:

∂f/∂x = derivative treating y as constant
∂f/∂y = derivative treating x as constant

Example: f(x, y) = x² + 3xy + y²
- ∂f/∂x = 2x + 3y
- ∂f/∂y = 3x + 2y

**Gradient Vector:**
The gradient is a vector of all partial derivatives:

∇f = [∂f/∂x₁, ∂f/∂x₂, ..., ∂f/∂xₙ]

The gradient points in the direction of steepest increase. To minimize, go opposite direction: -∇f

**Practical Code Examples:**

\`\`\`python path=null start=null
import numpy as np

# Computing derivatives numerically
def derivative(f, x, h=1e-5):
    """Approximate derivative using finite differences"""
    return (f(x + h) - f(x - h)) / (2 * h)

# Example: f(x) = x²
f = lambda x: x**2
x = 3.0
derivative_value = derivative(f, x)
print(f"Derivative of x² at x={x}: {derivative_value}")  # Should be 2*3 = 6

# Computing gradient for multi-variable function
def gradient(f, x, h=1e-5):
    """Compute gradient vector numerically"""
    grad = np.zeros_like(x)
    for i in range(len(x)):
        x_plus = x.copy()
        x_minus = x.copy()
        x_plus[i] += h
        x_minus[i] -= h
        grad[i] = (f(x_plus) - f(x_minus)) / (2 * h)
    return grad

# Example: f(x, y) = x² + 3xy + y²
f_multi = lambda x: x[0]**2 + 3*x[0]*x[1] + x[1]**2
point = np.array([2.0, 3.0])
grad = gradient(f_multi, point)
print(f"Gradient at [{point[0]}, {point[1]}]: {grad}")  # [2*2 + 3*3, 3*2 + 2*3] = [13, 12]
\`\`\`

### 2. Chain Rule - Heart of Backpropagation

**Single Variable Chain Rule:**
If y = f(g(x)), then: dy/dx = (df/dg) · (dg/dx)

Example: y = (x² + 1)³
- Let u = x² + 1, then y = u³
- dy/du = 3u², du/dx = 2x
- dy/dx = 3u² · 2x = 3(x² + 1)² · 2x = 6x(x² + 1)²

**Multivariable Chain Rule:**
For z = f(x, y) where x = g(t) and y = h(t):

dz/dt = (∂z/∂x)(dx/dt) + (∂z/∂y)(dy/dt)

**Why This Matters for Neural Networks:**

Consider a 3-layer network:
Input → Layer1 → Layer2 → Output → Loss
  x   →   h₁   →   h₂   →   y    →  L

To update weights in Layer1, we need:
∂L/∂w₁ = (∂L/∂y) · (∂y/∂h₂) · (∂h₂/∂h₁) · (∂h₁/∂w₁)

This is the chain rule! Gradients flow backward multiplying partial derivatives.

### 3. Gradient Descent Algorithm

**Core Update Rule:**
w_new = w_old - α · ∇L(w)

Where:
- w = parameters/weights
- α = learning rate (typically 0.001 to 0.1)
- ∇L(w) = gradient of loss with respect to weights

**Types of Gradient Descent:**

**Batch Gradient Descent:**
Compute gradient using entire dataset:
w = w - α · (1/N) · Σᵢ ∇L(xᵢ, yᵢ; w)

Pros: Stable, convergence guaranteed
Cons: Slow for large datasets, memory intensive

**Stochastic Gradient Descent (SGD):**
Compute gradient using one sample at a time:
w = w - α · ∇L(xᵢ, yᵢ; w)

Pros: Fast, can escape local minima
Cons: Noisy updates, oscillates around minimum

**Mini-batch Gradient Descent:**
Compute gradient using small batches (32-256 samples):
w = w - α · (1/B) · Σⱼ ∇L(xⱼ, yⱼ; w)

Pros: Balance of speed and stability
Cons: Need to choose batch size

This is the standard in practice!

**Code Example - Gradient Descent from Scratch:**

\`\`\`python path=null start=null
import numpy as np
import matplotlib.pyplot as plt

# Simple gradient descent to minimize f(x) = x²
def gradient_descent_1d():
    f = lambda x: x**2
    df = lambda x: 2*x  # Derivative

    x = 10.0  # Starting point
    learning_rate = 0.1
    history = [x]

    for i in range(50):
        gradient = df(x)
        x = x - learning_rate * gradient
        history.append(x)

    return x, history

# Run the optimization
minimum, history = gradient_descent_1d()
print(f"Minimum found at x = {minimum:.4f}")
print(f"True minimum is at x = 0")

# Plot the optimization path
plt.figure(figsize=(10, 6))
plt.plot(history, 'o-', label='Optimization Path')
plt.axhline(y=0, color='r', linestyle='--', label='True Minimum')
plt.xlabel('Iteration')
plt.ylabel('x Value')
plt.title('Gradient Descent: Minimizing f(x) = x²')
plt.legend()
plt.grid(True)
plt.show()
\`\`\`

### 4. Backpropagation - Neural Network Learning

**What is Backpropagation?**
Backpropagation computes gradients of the loss function with respect to each weight in the network using the chain rule. It&apos;s the algorithm that makes neural networks learn.

**Forward Pass:**
Input → Layer1 → Layer2 → ... → Output
- Compute activations layer by layer
- Store intermediate values for backprop

**Backward Pass:**
∂L/∂Output → ... → ∂L/∂Layer2 → ∂L/∂Layer1 → ∂L/∂Input
- Compute gradients layer by layer (backwards)
- Apply chain rule at each step

**Mathematical Foundation:**

For a single layer: y = σ(Wx + b)
Where σ is the activation function (e.g., sigmoid, ReLU).

The gradients are:
- ∂L/∂W = ∂L/∂y · ∂y/∂W  (using chain rule)
- ∂L/∂b = ∂L/∂y · ∂y/∂b
- ∂L/∂x = ∂L/∂y · ∂y/∂x  (pass gradient to previous layer)

**Backpropagation Example:**
\`\`\`python path=null start=null
import numpy as np

def sigmoid(x):
    # Clip x to prevent overflow
    x = np.clip(x, -500, 500)
    return 1 / (1 + np.exp(-x))

def sigmoid_derivative(x):
    s = sigmoid(x)
    return s * (1 - s)

class SimpleNeuralNetwork:
    def __init__(self, input_size, hidden_size, output_size):
        # Initialize weights with small random values
        self.W1 = np.random.randn(input_size, hidden_size) * 0.5
        self.b1 = np.zeros((1, hidden_size))
        self.W2 = np.random.randn(hidden_size, output_size) * 0.5
        self.b2 = np.zeros((1, output_size))
    
    def forward(self, X):
        # Forward pass
        self.z1 = np.dot(X, self.W1) + self.b1
        self.a1 = sigmoid(self.z1)
        self.z2 = np.dot(self.a1, self.W2) + self.b2
        self.a2 = sigmoid(self.z2)
        return self.a2
    
    def backward(self, X, y, output):
        # Number of samples
        m = X.shape[0]
        
        # Calculate gradients using chain rule
        # Output layer gradients
        self.dz2 = output - y  # Derivative of loss w.r.t. output
        self.dW2 = (1/m) * np.dot(self.a1.T, self.dz2)
        self.db2 = (1/m) * np.sum(self.dz2, axis=0, keepdims=True)
        
        # Hidden layer gradients
        self.dz1 = np.dot(self.dz2, self.W2.T) * sigmoid_derivative(self.z1)
        self.dW1 = (1/m) * np.dot(X.T, self.dz1)
        self.db1 = (1/m) * np.sum(self.dz1, axis=0, keepdims=True)
    
    def update_parameters(self, learning_rate):
        # Update weights and biases
        self.W2 -= learning_rate * self.dW2
        self.b2 -= learning_rate * self.db2
        self.W1 -= learning_rate * self.dW1
        self.b1 -= learning_rate * self.db1
    
    def train(self, X, y, epochs, learning_rate):
        costs = []
        for i in range(epochs):
            # Forward pass
            output = self.forward(X)
            
            # Calculate cost
            cost = np.mean((output - y) ** 2)  # Mean squared error
            costs.append(cost)
            
            # Backward pass
            self.backward(X, y, output)
            
            # Update parameters
            self.update_parameters(learning_rate)
            
            if i % 100 == 0:
                print(f"Epoch {i}, Cost: {cost:.6f}")
        
        return costs

# Example: XOR problem
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y = np.array([[0], [1], [1], [0]])  # XOR truth table

# Create and train network
nn = SimpleNeuralNetwork(input_size=2, hidden_size=4, output_size=1)
costs = nn.train(X, y, epochs=1000, learning_rate=1.0)

# Test the trained network
predictions = nn.forward(X)
print("\nPredictions after training:")
for i in range(len(X)):
    print(f"Input: {X[i]}, Target: {y[i][0]}, Prediction: {predictions[i][0]:.4f}")
\`\`\`

### 5. Common Optimizers

**SGD (Stochastic Gradient Descent):**
Basic algorithm: w = w - α · ∇L(w)
Simple but can be slow and oscillate.

**Momentum:**
Adds velocity based on past gradients:
v = β·v + α·∇L(w)
w = w - v
Helps accelerate in relevant directions, dampen oscillations.

**Adam (Adaptive Moment Estimation):**
Combines momentum with adaptive learning rates:
- Tracks running average of gradients (first moment)
- Tracks running average of squared gradients (second moment)
- Normalizes the gradient updates
Most popular optimizer in practice.

**Adam Example:**
\`\`\`python path=null start=null
class AdamOptimizer:
    def __init__(self, learning_rate=0.001, beta1=0.9, beta2=0.999, epsilon=1e-8):
        self.learning_rate = learning_rate
        self.beta1 = beta1
        self.beta2 = beta2
        self.epsilon = epsilon
        self.m = {}  # First moment (momentum)
        self.v = {}  # Second moment (RMSprop)
        self.t = 0   # Timestep
    
    def update(self, params, grads):
        self.t += 1
        
        for key in params.keys():
            # Initialize moment vectors
            if key not in self.m:
                self.m[key] = np.zeros_like(params[key])
                self.v[key] = np.zeros_like(params[key])
            
            # Get gradient
            grad = grads[key]
            
            # Update biased first moment estimate
            self.m[key] = self.beta1 * self.m[key] + (1 - self.beta1) * grad
            
            # Update biased second raw moment estimate
            self.v[key] = self.beta2 * self.v[key] + (1 - self.beta2) * (grad ** 2)
            
            # Compute bias-corrected first moment estimate
            m_corrected = self.m[key] / (1 - self.beta1 ** self.t)
            
            # Compute bias-corrected second raw moment estimate
            v_corrected = self.v[key] / (1 - self.beta2 ** self.t)
            
            # Update parameters
            params[key] -= self.learning_rate * m_corrected / (np.sqrt(v_corrected) + self.epsilon)

# Usage in neural network training
optimizer = AdamOptimizer(learning_rate=0.001)
# In training loop:
# optimizer.update(network_params, gradients)
\`\`\`

### 6. Vanishing & Exploding Gradients

**Vanishing Gradients:**
Problem: Gradients become extremely small in early layers.
Cause: Activation functions like sigmoid saturate (derivative ≈ 0).
Effect: Early layers learn extremely slowly.
Solution: Use ReLU activations, batch normalization, residual connections.

**Exploding Gradients:**
Problem: Gradients become extremely large.
Cause: Accumulation of large gradients during backprop.
Effect: Weights become huge, model becomes unstable.
Solution: Gradient clipping, careful weight initialization.

**Gradient Clipping Example:**
\`\`\`python path=null start=null
def clip_gradients(gradients, threshold=1.0):
    """Clip gradients that exceed threshold"""
    clipped_gradients = {}
    
    total_norm = 0
    for grad in gradients.values():
        total_norm += np.sum(grad ** 2)
    total_norm = np.sqrt(total_norm)
    
    clip_coef = threshold / (total_norm + 1e-6)  # Prevent division by zero
    if clip_coef < 1:
        for key in gradients.keys():
            gradients[key] *= clip_coef
    
    return gradients

# Usage during training
if total_gradient_norm > threshold:
    gradients = clip_gradients(gradients)
\`\`\`

### 7. Computational Graphs

**What is a Computational Graph?**
A graph representation of operations in a neural network.
- Nodes: Variables (inputs, weights, activations, loss)
- Edges: Operations (matrix multiply, activation functions)

**Why Computational Graphs Matter:**
- Enable automatic differentiation (autodiff)
- Critical for backpropagation
- Foundation of deep learning frameworks

**Example Graph for y = ReLU(Wx + b):**
Input x → [Linear: Wx+b] → [ReLU] → Output y
Gradients: ∂L/∂x ← [∂/∂x] ← [∂/∂z] ← ∂L/∂y

### 8. Higher-Order Derivatives

**Second Derivatives:**
Used in second-order optimization methods like Newton&apos;s method.
Newton: w = w - [∇²L(w)]⁻¹ · ∇L(w)
More complex but can converge faster.

**Hessian Matrix:**
Matrix of second partial derivatives.
For function f(x₁, x₂, ..., xₙ):
Hᵢⱼ = ∂²f/∂xᵢ∂xⱼ
Tells us about the "curvature" of the function.

**Practical Use:**
Hessian-based methods are too expensive for deep networks (O(n²) storage, O(n³) computation), so first-order methods (SGD, Adam) are used instead.

### 9. Numerical Stability

**Gradient Clipping:** Prevent gradients from becoming too large
**Gradient Scaling:** Scale gradients to reasonable ranges
**Activation Function Selection:** Use ReLU instead of sigmoid/tanh to avoid vanishing gradients
**Weight Initialization:** Proper initialization prevents gradient issues
**Batch Normalization:** Normalizes layer inputs to maintain stable gradients

**Gradient Scaling Example:**
\`\`\`python path=null start=null
def scale_gradients(gradients, target_norm=1.0):
    """Scale gradients to have a target norm"""
    total_norm = 0
    for grad in gradients.values():
        total_norm += np.sum(grad ** 2)
    total_norm = np.sqrt(total_norm)
    
    scale = target_norm / (total_norm + 1e-6)
    scaled_gradients = {key: grad * scale for key, grad in gradients.items()}
    
    return scaled_gradients, total_norm
\`\`\`

### 10. Key Takeaways

- Derivatives measure how functions change (slopes)
- Chain rule multiplies derivatives along paths (backpropagation)
- Gradient descent moves in direction of steepest decrease
- Backpropagation efficiently computes gradients with chain rule
- Optimizers modify gradient steps (SGD, Momentum, Adam)
- Vanishing/exploding gradients are common problems
- Computational graphs enable automatic differentiation
- Numerical stability is crucial for training

---

## TL;DR - Quick Recall

**One-liner for each concept:**

| Concept | Key Takeaway |
|:--------|:-------------|
| **Derivative** | Rate of change; slope of function at a point |
| **Gradient** | Vector of all partial derivatives; points to steepest ascent |
| **Chain Rule** | Multiply derivatives along path: (∂L/∂y)·(∂y/∂x) |
| **Gradient Descent** | w = w - α·∇L(w); move opposite to gradient |
| **Learning Rate (α)** | Step size; too big = overshoot, too small = slow |
| **Backpropagation** | Chain rule applied backwards through network layers |
| **SGD** | Use one sample at a time - noisy but fast |
| **Mini-batch** | Use 32-256 samples - best balance (standard in practice) |
| **Adam** | Adaptive learning rate + momentum - most popular optimizer |
| **Vanishing Gradient** | Gradients → 0 in deep nets; use ReLU, BatchNorm |
| **Exploding Gradient** | Gradients → ∞; use gradient clipping |

**Essential Formulas:**

| Formula | Use |
|:--------|:----|
| w = w - α·∇L | Gradient descent update |
| ∂L/∂w = (∂L/∂y)·(∂y/∂w) | Chain rule for backprop |
| Power rule: d/dx(xⁿ) = n·xⁿ⁻¹ | Basic derivative |

**Quick Code:**

\`\`\`python path=null start=null
# Gradient descent step
w = w - learning_rate * gradient

# Numerical gradient (for checking)
grad = (f(x + h) - f(x - h)) / (2 * h)

# Clip gradients (prevent exploding)
torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
\`\`\`

**The Optimization Mantra:**
> "Gradients tell you which way is up. Go down to minimize loss."

---

## Additional Resources

**Books:**
- "Deep Learning" by Goodfellow, Bengio, and Courville - Chapters 6 and 8 (especially 8.3 on gradient descent)
- "Mathematics for Machine Learning" - Calculus chapter
- "The Matrix Calculus You Need For Deep Learning" - Terence Parr and Jeremy Howard

**Interactive Tutorials:**
- [Computational Graphs and Backpropagation](https://cs231n.github.io/optimization-2/) - Stanford CS231n
- [Calculus For Deep Learning](https://explained.ai/matrix-calculus/index.html) - Visual explanations
- [Neural Network and Calculus](https://www.youtube.com/playlist?list=PLWKotBjTDoLj3rXBL_MrP6WHiZB007c5h) - 3Blue1Brown calculus series

**Deep Learning Frameworks:**
- TensorFlow: [Automatic Differentiation](https://www.tensorflow.org/api_guides/python/tf.gradients)
- PyTorch: [Autograd](http://pytorch.org/tutorials/beginner/blitz/autograd_tutorial.html)

**Practice Problems:**
- [Calculus for Machine Learning](https://www.khanacademy.org/math/differential-calculus) - Khan Academy
- [MIT 18.06 - Calculus of Several Variables](https://ocw.mit.edu/courses/mathematics/18-02sc-multivariable-calculus-fall-2010/)
    `,
  subModules: [],
  practiceQuiz: [
    {
      id: "calc-q1",
      question: "What is the derivative of x³?",
      options: ["x²", "3x²", "3x³", "x⁴/4"],
      correctAnswer: 1,
      explanation:
        "Power Rule: d/dx[xⁿ] = n·xⁿ⁻¹\n\nStep-by-step:\n• d/dx[x³] = 3·x³⁻¹ = 3x²\n\nBring the power down, reduce it by 1.",
      difficulty: "easy",
    },
    {
      id: "calc-q2",
      question: "∫ 2x dx = ?",
      options: ["x²", "x² + C", "2x² + C", "x + C"],
      correctAnswer: 1,
      explanation:
        "Integration reverses differentiation:\n\nStep-by-step:\n• ∫ 2x dx = 2 · (x²/2) + C = x² + C\n\nAlways add + C for indefinite integrals!",
      difficulty: "easy",
    },
    {
      id: "calc-q3",
      question: "lim(x→0) sin(x)/x = ?",
      options: ["0", "1", "∞", "undefined"],
      correctAnswer: 1,
      explanation:
        "Famous limit in calculus!\n\nStep-by-step:\n• Direct substitution gives 0/0 (indeterminate)\n• Using L'Hôpital's Rule: lim = cos(x)/1 = cos(0) = 1\n• Or geometric proof shows it equals 1\n\nThis is the foundation of derivative of sin(x) = cos(x).",
      difficulty: "medium",
    },
    {
      id: "calc-q4",
      question: "If f(x) = e^(2x), what is f'(x)?",
      options: ["e^(2x)", "2e^(2x)", "e^x", "2e^x"],
      correctAnswer: 1,
      explanation:
        "Chain Rule: d/dx[e^(u)] = e^(u) · u'\n\nStep-by-step:\n• u = 2x, so u' = 2\n• f'(x) = e^(2x) · 2 = 2e^(2x)\n\nDerivative of e^x is e^x, but chain rule adds the inner derivative.",
      difficulty: "medium",
    },
    {
      id: "calc-q5",
      question: "At a local minimum, the first derivative is:",
      options: ["Positive", "Negative", "Zero", "Undefined"],
      correctAnswer: 2,
      explanation:
        "Critical points occur where f'(x) = 0\n\nAt minimum:\n• Before: f'(x) < 0 (decreasing)\n• At min: f'(x) = 0 (flat)\n• After: f'(x) > 0 (increasing)\n\nTo confirm it's a min, check f''(x) > 0.",
      difficulty: "easy",
    },
    {
      id: "calc-q6",
      question: "d/dx[sin(x)] = ?",
      options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
      correctAnswer: 0,
      explanation:
        "Basic derivative:\n\n• d/dx[sin(x)] = cos(x)\n• d/dx[cos(x)] = -sin(x)\n\nRemember: sin → cos → -sin → -cos → sin",
      difficulty: "easy",
    },
    {
      id: "calc-q7",
      question: "∫ cos(x) dx = ?",
      options: ["sin(x) + C", "-sin(x) + C", "cos(x) + C", "tan(x) + C"],
      correctAnswer: 0,
      explanation:
        "Integration is reverse of differentiation:\n\n• Since d/dx[sin(x)] = cos(x)\n• ∫ cos(x) dx = sin(x) + C\n\nAlways add + C for indefinite integrals!",
      difficulty: "easy",
    },
    {
      id: "calc-q8",
      question: "The gradient of f(x,y) = x² + y² at (1, 1) is:",
      options: ["(1, 1)", "(2, 2)", "(0, 0)", "(1, 2)"],
      correctAnswer: 1,
      explanation:
        "Gradient: ∇f = (∂f/∂x, ∂f/∂y)\n\nStep-by-step:\n• ∂f/∂x = 2x → at (1,1): 2(1) = 2\n• ∂f/∂y = 2y → at (1,1): 2(1) = 2\n• ∇f = (2, 2)",
      difficulty: "medium",
    },
    {
      id: "calc-q9",
      question: "If f''(x) > 0 at a critical point, the point is a:",
      options: ["Maximum", "Minimum", "Inflection point", "Saddle point"],
      correctAnswer: 1,
      explanation:
        "Second derivative test:\n\n• f''(x) > 0 → Concave up → Minimum\n• f''(x) < 0 → Concave down → Maximum\n• f''(x) = 0 → Need more tests",
      difficulty: "easy",
    },
    {
      id: "calc-q10",
      question: "The product rule states d/dx[uv] = ?",
      options: ["u'v'", "uv' + u'v", "u'v - uv'", "(u/v)'"],
      correctAnswer: 1,
      explanation:
        "Product Rule: d/dx[uv] = u'v + uv'\n\n'First times derivative of second, plus second times derivative of first'\n\nExample: d/dx[x²·sin(x)] = 2x·sin(x) + x²·cos(x)",
      difficulty: "easy",
    },
  ],
};
