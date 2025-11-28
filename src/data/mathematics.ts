import { LearningModule } from '@/types/learning';

export const mathematicsModules: LearningModule[] = [
  {
    id: 'linear-algebra',
    title: 'Linear Algebra',
    description: 'Vectors, matrices, and transformations - the language of neural networks',
    status: 'in-progress',
    detailedContent: `# Linear Algebra for AI Engineers

Linear algebra is the mathematical foundation of all machine learning. Every neural network, every transformation, every data representation relies on vectors and matrices.

## Math Notation & Pronunciation Guide

Before we dive in, let&apos;s decode the symbols you&apos;ll see:

**Vectors and Scalars:**
- **v** (bold lowercase) - pronounced "vector v" or "bold v" - represents a vector
- **A** (bold uppercase) - pronounced "matrix A" or "bold capital A" - represents a matrix
- v̂ - pronounced "v hat" - unit vector (normalized to length 1)
- ||v|| - pronounced "norm of v" or "magnitude of v" - vector length

**Operations:**
- v · w - pronounced "v dot w" - dot product of vectors
- A × B - pronounced "A times B" - matrix multiplication
- Aᵀ - pronounced "A transpose" - flipped rows and columns
- A⁻¹ - pronounced "A inverse" - inverse matrix

**Greek Letters (commonly used):**
- λ (lambda) - eigenvalue
- θ (theta) - angle
- Σ (sigma) - summation symbol
- α (alpha) - learning rate, angles
- β (beta) - momentum parameter
- ε (epsilon) - small value

**Special Symbols:**
- √ - pronounced "square root" - root symbol
- ≈ - pronounced "approximately equal" - rough equality
- ∈ - pronounced "element of" or "in" - set membership
- ℝⁿ - pronounced "R n" or "n-dimensional real space" - n-dimensional space
- ∇ - pronounced "nabla" or "del" - gradient operator

## Key Jargon Definitions

- **Scalar**: A single number (e.g., 5, 0.001, -3.14)
- **Vector**: An ordered list of numbers; represents magnitude and direction
- **Matrix**: A 2D rectangular array of numbers arranged in rows and columns
- **Tensor**: Multi-dimensional array; generalization of vectors and matrices
- **Dimension**: Number of values in a vector or axes in a tensor
- **Magnitude**: The length or size of a vector
- **Normalization**: Scaling a vector to length 1 (unit vector)
- **Transpose**: Flipping a matrix so rows become columns
- **Dot Product**: Operation that multiplies corresponding elements and sums them
- **Broadcasting**: NumPy feature that allows operations on different shaped arrays
- **Element-wise**: Operation applied to each element independently (e.g., A * B)
- **Covariance**: Measure of how two variables change together
- **Eigenvalue**: Scalar that describes how much an eigenvector is scaled
- **Eigenvector**: Special vector that only gets scaled (not rotated) by a matrix

## Why Linear Algebra Matters

In AI, everything is a vector or matrix:
- Text embeddings (word2vec, BERT) are vectors in high-dimensional space
- Images are matrices of pixel values
- Neural network weights are matrices
- Transformations between layers are matrix multiplications

## What You&apos;ll Master

### 1. Vectors and Vector Spaces

**What is a Vector?**
A vector is an ordered list of numbers representing a point or direction in space. In AI, a 300-dimensional word embedding is a vector with 300 numbers.

Example: v = [0.2, -0.5, 0.8] is a 3D vector

**Vector Operations:**

- **Addition**: [1, 2] + [3, 4] = [4, 6] - combine vectors
  - Geometrically: Place vectors head-to-tail, result goes from start to final end
  - Try it: Add [3, 0] + [0, 4] = [3, 4] - you moved 3 right, then 4 up!

- **Scalar Multiplication**: 2 × [1, 2] = [2, 4] - scale a vector
  - Multiplying by 2 doubles the length, keeps same direction
  - Multiplying by -1 flips the direction
  - Try it: 3 × [1, 2] = [3, 6] - tripled in length!

- **Dot Product**: [1, 2] · [3, 4] = 1×3 + 2×4 = 11 - measures alignment
  - Result is a SCALAR (single number), not a vector
  - Positive = vectors point same general direction
  - Zero = perpendicular vectors
  - Negative = vectors point opposite directions
  - Try it: [1, 0] · [0, 1] = 0 - perpendicular x and y axes!

**Vector Magnitude (Length):**
||v|| = √(v₁² + v₂² + ... + vₙ²)

For [3, 4]: √(3² + 4²) = √25 = 5

**Unit Vectors (Normalization):**
Divide by magnitude to get length 1: v̂ = v / ||v||

Why normalize? When comparing semantic similarity, we care about direction (meaning), not magnitude.

**Cosine Similarity:**
cos(θ) = (A · B) / (||A|| × ||B||)

Range: -1 (opposite) to +1 (same direction)
- 1.0 = identical meaning (vectors point exactly same way)
- 0.0 = unrelated (perpendicular, 90° angle)
- -1.0 = opposite meaning (point opposite directions, 180°)

**Interactive Example:**
Compare word embeddings:
- "king" and "queen": cos(θ) ≈ 0.95 (very similar!)
- "king" and "table": cos(θ) ≈ 0.05 (barely related)
- "hot" and "cold": cos(θ) ≈ -0.3 (opposites)

This is why RAG systems use cosine similarity to find relevant documents!

**Vector Spaces and Dimensions:**
- 2D space: (x, y) coordinates on a plane
- 3D space: (x, y, z) coordinates in space
- High-dimensional space: BERT embeddings live in 768D space

Key insight: More dimensions = more information capacity

### 2. Matrices and Matrix Operations

**What is a Matrix?**
A rectangular array of numbers. In AI, matrices represent:
- Batches of data (each row is a data point)
- Transformations (rotation, scaling, projection)
- Neural network weights (learnable parameters)

Example: Matrix A is a 2x2 matrix with values [[1, 2], [3, 4]]

This is a 2×2 matrix (2 rows, 2 columns)

**Matrix Multiplication:**
The core operation in deep learning. To multiply A×B:
- Number of columns in A must equal number of rows in B
- Result has dimensions: (rows of A) × (columns of B)

Example: (2×3) × (3×2) → (2×2) result

**Step-by-Step Visual Example:**

A = [[1, 2, 3],    B = [[7, 8],     Result = [[?,  ?],
     [4, 5, 6]]         [9, 10],             [?,  ?]]
                        [11, 12]]

To get result[0,0] (first row, first column):
- Take row 0 from A: [1, 2, 3]
- Take column 0 from B: [7, 9, 11]
- Dot product: 1×7 + 2×9 + 3×11 = 7 + 18 + 33 = 58

To get result[0,1]:
- Take row 0 from A: [1, 2, 3]
- Take column 1 from B: [8, 10, 12]
- Dot product: 1×8 + 2×10 + 3×12 = 8 + 20 + 36 = 64

Final: [[58, 64], [139, 154]]

**The Pattern:** Each element = dot product of corresponding row and column!

**Why Matrix Multiplication Matters:**
Every neural network layer does: output = input × weights + bias

For a layer transforming 512D → 256D:
- Input: (batch_size, 512)
- Weights: (512, 256)
- Output: (batch_size, 256)

**Matrix Transpose:**
Flip rows and columns: Aᵀ

If A = [[1, 2], [3, 4]] then Aᵀ = [[1, 3], [2, 4]]

Used in backpropagation to reverse gradient flow.

**Identity Matrix (I):**
Diagonal 1s, rest 0s. Acts like multiplying by 1.

I = [[1, 0], [0, 1]]
A × I = I × A = A

**Matrix Inverse:**
Undo a transformation: A × A⁻¹ = I

Used in solving linear systems and some optimization algorithms.

### 3. Advanced Concepts for Deep Learning

**Eigenvalues and Eigenvectors:**
Special vectors that only get scaled (not rotated) by a matrix:
A × v = λ × v

Where:
- v = eigenvector (direction that doesn&apos;t change)
- λ = eigenvalue (how much it scales)

**Visual Intuition:**
Imagine stretching a rubber sheet:
- Most vectors change direction AND length
- Eigenvectors only change length (stay on same line)
- Eigenvalue tells you the stretch factor

**Real Example:**
Covariance matrix of data:
- Eigenvector 1: direction of maximum spread (principal component 1)
- Eigenvector 2: direction of second-most spread (principal component 2)
- Eigenvalues: how much variance in each direction

PCA uses this to reduce 1000 dimensions to 2 for visualization!

**Try It:**
Matrix [[3, 1], [0, 2]] has eigenvector [1, 0] with eigenvalue 3
- Apply: [[3, 1], [0, 2]] × [1, 0] = [3, 0] = 3 × [1, 0] ✓

**Matrix Rank:**
Number of linearly independent rows/columns.

Full rank = maximum information, no redundancy.
Low rank = compressed representation (useful in matrix factorization).

**Tensor Operations:**
Tensors are multi-dimensional arrays:
- 0D tensor: scalar (5)
- 1D tensor: vector ([1, 2, 3])
- 2D tensor: matrix
- 3D tensor: RGB image (height × width × 3 channels)
- 4D tensor: batch of images (batch × height × width × channels)

PyTorch and TensorFlow operate on tensors.

### 4. Real AI Applications

**Word Embeddings (Vector Arithmetic):**

king - man + woman ≈ queen

Because embeddings capture semantic relationships as geometric relationships in vector space.

**Neural Network Layers:**

Each layer is matrix multiplication: output = input @ weights + bias (@ is matrix multiplication in Python)

**Attention Mechanisms (Transformers):**

Attention(Q, K, V) = softmax(Q × Kᵀ / √d) × V

Where Q, K, V are matrices derived from input embeddings.

**Batch Processing:**
Process multiple inputs simultaneously using matrix operations:
- Input: (32, 512) - 32 samples, 512 features each
- Weights: (512, 256)
- Output: (32, 256) - all 32 outputs computed in parallel

This is why GPUs are fast - optimized for matrix multiplication.

**Dimensionality Reduction (PCA):**
1. Center data (subtract mean)
2. Compute covariance matrix
3. Find eigenvectors (principal components)
4. Project data onto top k eigenvectors

Reduces 10,000D features to 100D while keeping most information.

**Recommendation Systems:**
Matrix factorization: R ≈ U × Vᵀ
- R: user-item ratings matrix (sparse)
- U: user feature matrix
- V: item feature matrix

Finds latent features explaining preferences.

### 5. Practical Code Examples

Let&apos;s see how these concepts translate to Python code you&apos;ll write daily:

**Scalars - Simple Numbers:**

\`\`\`python path=null start=null
import numpy as np

# Scalars in AI
learning_rate = 0.001
model_accuracy = 0.95
loss_value = 2.34

# In Python, just regular float or int
print(type(learning_rate))  # <class &apos;float&apos;>
\`\`\`

**Vectors - 1D Arrays:**

\`\`\`python path=null start=null
# Customer features: [age, income, years_as_customer]
customer = np.array([35, 75000, 3])

# Word embedding (simplified)
word_embedding = np.array([0.2, -0.5, 0.8, 0.1, -0.3])

print(f&quot;Customer shape: {customer.shape}&quot;)  # (3,)
print(f&quot;Embedding shape: {word_embedding.shape}&quot;)  # (5,)
\`\`\`

**Matrices - 2D Arrays:**

\`\`\`python path=null start=null
# Dataset: 3 customers, 4 features each
data = np.array([
    [25, 50000, 1, 0],  # customer 1
    [35, 75000, 3, 1],  # customer 2
    [45, 90000, 5, 1]   # customer 3
])

# Neural network weights
weights = np.random.randn(4, 8)  # 4 inputs to 8 neurons

print(f&quot;Data shape: {data.shape}&quot;)      # (3, 4)
print(f&quot;Weights shape: {weights.shape}&quot;)  # (4, 8)
\`\`\`

**Dot Product - Core Calculation:**

\`\`\`python path=null start=null
# Features and weights
features = np.array([1.0, 2.0, 3.0])
weights = np.array([0.5, 0.3, 0.2])

# Method 1: Using np.dot
output1 = np.dot(features, weights)

# Method 2: Using @ operator (preferred)
output2 = features @ weights

# Method 3: Manual calculation
output3 = np.sum(features * weights)

print(f&quot;All equal: {output1} = {output2} = {output3}&quot;)  # 1.7
\`\`\`

**Matrix Multiplication - Neural Network Forward Pass:**

\`\`\`python path=null start=null
# Batch of 32 samples, each with 512 features
input_data = np.random.randn(32, 512)

# Layer weights: transform 512 -> 256 dimensions
layer_weights = np.random.randn(512, 256)
bias = np.random.randn(256)

# Forward pass through layer
layer_output = input_data @ layer_weights + bias

print(f&quot;Input shape: {input_data.shape}&quot;)      # (32, 512)
print(f&quot;Weights shape: {layer_weights.shape}&quot;)  # (512, 256)
print(f&quot;Output shape: {layer_output.shape}&quot;)    # (32, 256)
\`\`\`

**Transpose - Backpropagation:**

\`\`\`python path=null start=null
A = np.array([[1, 2], [3, 4]])

# Transpose using .T
A_T = A.T

print(f&quot;Original:\n{A}&quot;)
print(f&quot;Transposed:\n{A_T}&quot;)

# Common in backprop: gradient flows backward
gradient = np.random.randn(32, 256)
weights_gradient = input_data.T @ gradient  # (512, 32) @ (32, 256) = (512, 256)
\`\`\`

**Vector Operations - All at Once:**

\`\`\`python path=null start=null
v = np.array([3, 4])
w = np.array([1, 2])

# Addition
v_plus_w = v + w
print(f&quot;v + w = {v_plus_w}&quot;)  # [4, 6]

# Scalar multiplication
scaled = 2 * v
print(f&quot;2 * v = {scaled}&quot;)  # [6, 8]

# Dot product
dot = v @ w
print(f&quot;v · w = {dot}&quot;)  # 11

# Magnitude (L2 norm)
magnitude = np.linalg.norm(v)
print(f&quot;||v|| = {magnitude}&quot;)  # 5.0

# Normalization
unit_v = v / np.linalg.norm(v)
print(f&quot;v̂ = {unit_v}&quot;)  # [0.6, 0.8]
print(f&quot;||v̂|| = {np.linalg.norm(unit_v)}&quot;)  # 1.0
\`\`\`

**Cosine Similarity - Text/Embedding Comparison:**

\`\`\`python path=null start=null
def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# Word embeddings (simplified)
king = np.array([0.5, 0.8, 0.2])
queen = np.array([0.6, 0.7, 0.3])
dog = np.array([-0.3, 0.1, 0.9])

print(f&quot;king-queen similarity: {cosine_similarity(king, queen):.3f}&quot;)  # ~0.97
print(f&quot;king-dog similarity: {cosine_similarity(king, dog):.3f}&quot;)    # ~0.12
\`\`\`

### 6. Common Pitfalls & How to Avoid Them

**1. Dimension Mismatches:**

\`\`\`python path=null start=null
A = np.random.randn(3, 4)
B = np.random.randn(5, 3)

# This will ERROR: shapes (3,4) and (5,3) not aligned
try:
    result = A @ B
except ValueError as e:
    print(f&quot;Error: {e}&quot;)

# ALWAYS check shapes first
print(f&quot;A shape: {A.shape}, B shape: {B.shape}&quot;)
# Fix: transpose B so (5,3) -> (3,5), then (3,4) @ (4,3) works
B_correct = np.random.randn(4, 5)
result = A @ B_correct  # (3,4) @ (4,5) = (3,5) ✓
\`\`\`

**2. Element-wise vs Matrix Multiplication:**

\`\`\`python path=null start=null
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Element-wise multiplication (Hadamard product)
element_wise = A * B  # [[1*5, 2*6], [3*7, 4*8]] = [[5, 12], [21, 32]]

# Matrix multiplication
matrix_mult = A @ B   # [[1*5+2*7, 1*6+2*8], [3*5+4*7, 3*6+4*8]] = [[19, 22], [43, 50]]

print(f&quot;Element-wise (A * B):\n{element_wise}&quot;)
print(f&quot;Matrix mult (A @ B):\n{matrix_mult}&quot;)

# Use the RIGHT one for your math!
# Neural networks need @ (matrix mult), not * (element-wise)
\`\`\`

**3. Forgetting Transposes:**

\`\`\`python path=null start=null
# Computing covariance requires transpose
X = np.random.randn(100, 5)  # 100 samples, 5 features

# WRONG: X @ X gives (100,5) @ (100,5) - dimension error!
# RIGHT: X.T @ X gives (5,100) @ (100,5) = (5,5) covariance matrix
cov_matrix = X.T @ X / 100
print(f&quot;Covariance shape: {cov_matrix.shape}&quot;)  # (5, 5) ✓
\`\`\`

**4. Broadcasting Surprises:**

\`\`\`python path=null start=null
# Adding bias to network layer
output = np.random.randn(32, 10)  # 32 samples, 10 neurons
bias = np.random.randn(10)        # 10 bias values

# This works! NumPy broadcasts bias across all 32 samples
result = output + bias  # (32,10) + (10,) = (32,10) ✓

# But this might not do what you expect
wrong_bias = np.random.randn(32, 1)
result2 = output + wrong_bias  # (32,10) + (32,1) broadcasts to (32,10)
# Each sample gets DIFFERENT bias - usually not intended!
\`\`\`

**Pro Tips:**
- Always print array.shape when debugging
- Use @ for matrix multiplication, * for element-wise
- Remember: (m,n) @ (n,p) -> (m,p)
- Transpose swaps dimensions: (m,n).T -> (n,m)
- Keep shape comments in your code: # (batch, features)

### 7. Key Takeaways

- Vectors represent data points in multi-dimensional space
- Dot products measure similarity (cosine similarity in RAG)
- Matrix multiplication is the fundamental neural network operation
- Transformations are matrices, data flows through matrix multiplication
- Dimensionality matters: higher dims = more capacity, but harder to train
- GPU acceleration comes from parallelized matrix operations
- Always check array shapes to catch bugs early
- Use @ for matrix multiplication, * for element-wise operations

## Additional Resources

**Video Courses:**
- [3Blue1Brown - Essence of Linear Algebra](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab) - Best visual intuition
- [Gilbert Strang&apos;s MIT 18.06](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/) - Comprehensive lectures

**Books:**
- "Linear Algebra and Its Applications" by Gilbert Strang - Classic textbook
- "Mathematics for Machine Learning" (Free PDF) - ML-focused approach

**Interactive Visualizations:**
- [Immersive Math](http://immersivemath.com/ila/index.html) - Interactive linear algebra book with live demos
- [Matrix Calculus for Deep Learning](https://explained.ai/matrix-calculus/) - Visual step-by-step explanations
- [Seeing Spaces](http://www.3blue1brown.com/essence-of-linear-algebra-page) - 3Blue1Brown animated visual series
- [Matrix Multiplication Visualization](http://matrixmultiplication.xyz/) - See matrix mult step-by-step
- [Eigenvectors and Eigenvalues](https://setosa.io/ev/eigenvectors-and-eigenvalues/) - Interactive eigenvector demo
- [PCA Explained Visually](https://setosa.io/ev/principal-component-analysis/) - Visual PCA walkthrough

**GitHub Repositories:**
- [Mathematics for Machine Learning](https://github.com/mml-book/mml-book.github.io) - Complete book with code
- [NumPy Linear Algebra Examples](https://github.com/rougier/numpy-100) - 100 NumPy exercises
- [Linear Algebra Explained](https://github.com/fastai/numerical-linear-algebra) - Fast.ai course notebooks

**Papers:**
- [Deep Learning Book - Chapter 2](https://www.deeplearningbook.org/contents/linear_algebra.html) - Goodfellow et al.
    `, 
    subModules: []
  },
  {
    id: 'calculus',
    title: 'Calculus',
    description: 'Derivatives and optimization - how neural networks learn',
    status: 'in-progress',
    detailedContent: `# Calculus for AI Engineers

Calculus is the mathematics of change and optimization. Without calculus, neural networks couldn&apos;t learn - there would be no backpropagation, no gradient descent, no training.

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

Neural networks learn by minimizing loss functions. Calculus tells us:
- Which direction to move weights (gradient)
- How fast to move (learning rate × gradient)
- When we&apos;ve reached a minimum (gradient ≈ 0)

## What You&apos;ll Master

### 1. Derivatives - Measuring Change

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
        x = x - learning_rate * gradient  # Update rule
        history.append(x)
        if abs(gradient) < 1e-6:  # Convergence check
            break
    
    print(f"Converged to x = {x:.6f} (should be 0)")
    return history

# Linear regression with gradient descent
def linear_regression_gd():
    # Generate synthetic data: y = 3x + 2 + noise
    np.random.seed(42)
    X = np.random.randn(100, 1)
    y = 3 * X + 2 + 0.5 * np.random.randn(100, 1)
    
    # Initialize parameters
    w = np.random.randn(1, 1)  # weight
    b = np.random.randn(1)      # bias
    
    learning_rate = 0.01
    epochs = 100
    
    for epoch in range(epochs):
        # Forward pass
        y_pred = X @ w + b
        
        # Compute loss (MSE)
        loss = np.mean((y_pred - y)**2)
        
        # Compute gradients
        dw = (2/len(X)) * X.T @ (y_pred - y)
        db = (2/len(X)) * np.sum(y_pred - y)
        
        # Update parameters
        w = w - learning_rate * dw
        b = b - learning_rate * db
        
        if epoch % 20 == 0:
            print(f"Epoch {epoch}: Loss = {loss:.4f}, w = {w[0,0]:.2f}, b = {b[0]:.2f}")
    
    print(f"Final: w = {w[0,0]:.2f} (true: 3), b = {b[0]:.2f} (true: 2)")

linear_regression_gd()
\`\`\`

**Learning Rate Scheduling:**

- Step decay: α = α₀ · (0.5)^(epoch/10)
- Exponential decay: α = α₀ · e^(-kt)
- 1/t decay: α = α₀ / (1 + kt)
- Cosine annealing: follows cosine curve

### 4. Advanced Optimizers

**Momentum:**
Remembers previous gradients, builds velocity:

v = β·v + (1-β)·∇L
w = w - α·v

Typical β = 0.9. Helps escape local minima and smooth oscillations.

**RMSprop:**
Adapts learning rate per parameter:

s = β·s + (1-β)·(∇L)²
w = w - α·∇L / (√s + ε)

Divides by RMS of recent gradients.

**Adam (Adaptive Moment Estimation):**
Combines momentum + adaptive learning rates:

m = β₁·m + (1-β₁)·∇L          (first moment - momentum)
v = β₂·v + (1-β₂)·(∇L)²       (second moment - variance)
m̂ = m/(1-β₁ᵗ)                 (bias correction)
v̂ = v/(1-β₂ᵗ)
w = w - α·m̂/(√v̂ + ε)

Typical values: α=0.001, β₁=0.9, β₂=0.999, ε=10⁻⁸

Adam is the default choice for most deep learning!

**Code Example - Optimizer Comparison:**

\`\`\`python path=null start=null
import numpy as np

# SGD with Momentum
class SGDMomentum:
    def __init__(self, learning_rate=0.01, momentum=0.9):
        self.lr = learning_rate
        self.momentum = momentum
        self.velocity = None
    
    def update(self, params, grads):
        if self.velocity is None:
            self.velocity = np.zeros_like(params)
        
        self.velocity = self.momentum * self.velocity - self.lr * grads
        params += self.velocity
        return params

# Adam Optimizer
class Adam:
    def __init__(self, learning_rate=0.001, beta1=0.9, beta2=0.999, epsilon=1e-8):
        self.lr = learning_rate
        self.beta1 = beta1
        self.beta2 = beta2
        self.epsilon = epsilon
        self.m = None  # First moment
        self.v = None  # Second moment
        self.t = 0     # Time step
    
    def update(self, params, grads):
        if self.m is None:
            self.m = np.zeros_like(params)
            self.v = np.zeros_like(params)
        
        self.t += 1
        
        # Update biased first and second moments
        self.m = self.beta1 * self.m + (1 - self.beta1) * grads
        self.v = self.beta2 * self.v + (1 - self.beta2) * (grads ** 2)
        
        # Bias correction
        m_hat = self.m / (1 - self.beta1 ** self.t)
        v_hat = self.v / (1 - self.beta2 ** self.t)
        
        # Update parameters
        params -= self.lr * m_hat / (np.sqrt(v_hat) + self.epsilon)
        return params

# Example usage
params = np.array([5.0])
grads = np.array([2.0])

sgd = SGDMomentum(learning_rate=0.1)
adam = Adam(learning_rate=0.1)

params_sgd = sgd.update(params.copy(), grads)
params_adam = adam.update(params.copy(), grads)

print(f"SGD+Momentum: {params} -> {params_sgd}")
print(f"Adam: {params} -> {params_adam}")
\`\`\`

### 5. Loss Functions

**Mean Squared Error (MSE) - Regression:**
L = (1/N) · Σ(yᵢ - ŷᵢ)²

Gradient: ∂L/∂ŷ = (2/N)·(ŷ - y)

Use: Predicting continuous values

**Binary Cross-Entropy - Binary Classification:**
L = -(1/N) · Σ[yᵢ·log(ŷᵢ) + (1-yᵢ)·log(1-ŷᵢ)]

Gradient: ∂L/∂ŷ = -(y/ŷ - (1-y)/(1-ŷ))

Use: Two-class problems (spam/not spam)

**Categorical Cross-Entropy - Multi-class Classification:**
L = -(1/N) · Σᵢ Σⱼ yᵢⱼ·log(ŷᵢⱼ)

Where y is one-hot encoded, ŷ is softmax output

Use: Multiple classes (ImageNet with 1000 classes)

**Softmax Function:**
σ(zᵢ) = e^zᵢ / Σⱼ e^zⱼ

Converts logits to probabilities (sums to 1)

### 6. Backpropagation Step-by-Step

**Example: 2-Layer Network**

Architecture:
Input(x) → Linear(W1) → ReLU(σ) → Linear(W2) → Output(y) → Loss(L)

**Forward Pass:**
1. z₁ = W₁·x + b₁
2. a₁ = ReLU(z₁) = max(0, z₁)
3. z₂ = W₂·a₁ + b₂
4. ŷ = z₂
5. L = (ŷ - y)²

**Backward Pass (compute gradients):**
1. ∂L/∂ŷ = 2(ŷ - y)
2. ∂L/∂z₂ = ∂L/∂ŷ · ∂ŷ/∂z₂ = ∂L/∂ŷ · 1 = 2(ŷ - y)
3. ∂L/∂W₂ = ∂L/∂z₂ · a₁ᵀ
4. ∂L/∂b₂ = ∂L/∂z₂
5. ∂L/∂a₁ = W₂ᵀ · ∂L/∂z₂
6. ∂L/∂z₁ = ∂L/∂a₁ · ReLU&apos;(z₁) where ReLU&apos;(z) = 1 if z>0 else 0
7. ∂L/∂W₁ = ∂L/∂z₁ · xᵀ
8. ∂L/∂b₁ = ∂L/∂z₁

**Update Parameters:**
W₁ = W₁ - α·∂L/∂W₁
W₂ = W₂ - α·∂L/∂W₂
b₁ = b₁ - α·∂L/∂b₁
b₂ = b₂ - α·∂L/∂b₂

### 7. Vanishing and Exploding Gradients

**Vanishing Gradients:**
In deep networks, gradients can become very small as they multiply during backpropagation.

Problem: Early layers learn very slowly or not at all.

Causes:
- Sigmoid/tanh activations (derivatives < 1)
- Many layers multiplying small gradients

Solutions:
- Use ReLU activation (gradient = 1 for positive inputs)
- Batch normalization
- Residual connections (skip connections)
- Better initialization (Xavier, He)

**Exploding Gradients:**
Gradients become too large, causing unstable training.

Problem: Weights oscillate wildly, loss becomes NaN.

Causes:
- Poor weight initialization
- High learning rate
- Deep RNNs

Solutions:
- Gradient clipping: clip gradients to max norm
- Lower learning rate
- Batch normalization
- Better architecture (LSTM/GRU for RNNs)

### 8. Key Takeaways

- Derivatives measure instantaneous rate of change
- Chain rule enables backpropagation through network layers
- Gradient descent minimizes loss by following negative gradient
- Learning rate controls step size (critical hyperparameter)
- Adam optimizer is default choice (combines momentum + adaptive rates)
- Different loss functions for different tasks
- Vanishing/exploding gradients are real problems with solutions
- Automatic differentiation frameworks handle gradient computation

## Additional Resources

**Video Courses:**
- [3Blue1Brown - Essence of Calculus](https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr) - Best visual intuition
- [Khan Academy - Calculus](https://www.khanacademy.org/math/calculus-1) - Step-by-step basics
- [Stanford CS231n](http://cs231n.stanford.edu/) - Backprop lecture

**Books:**
- "Deep Learning" by Goodfellow et al. - Chapter 4 (Numerical Computation)
- "Pattern Recognition and Machine Learning" by Bishop - Appendix C

**Interactive:**
- [Distill.pub - Momentum](https://distill.pub/2017/momentum/) - Optimizer comparison
- [TensorFlow Playground](https://playground.tensorflow.org/) - Neural network visualization

**GitHub Repositories:**
- [nn-zero-to-hero](https://github.com/karpathy/nn-zero-to-hero) - Andrej Karpathy&apos;s neural networks from scratch (backprop, optimizers)
- [Autograd](https://github.com/HIPS/autograd) - Automatic differentiation for NumPy (PyTorch/TensorFlow core concept)
- [Neural Network Animations](https://github.com/rish-16/sight) - Visualize gradient descent and optimization

**Papers:**
- [Adam Optimizer](https://arxiv.org/abs/1412.6980) - Kingma & Ba, 2014
- [Batch Normalization](https://arxiv.org/abs/1502.03167) - Ioffe & Szegedy, 2015
    `, 
    subModules: []
  },
  {
    id: 'probability-stats',
    title: 'Probability & Statistics',
    description: 'Distributions and uncertainty - the foundation of probabilistic ML',
    status: 'not-started',
    detailedContent: `# Probability & Statistics for AI Engineers

AI systems don&apos;t give certain answers - they give probability distributions. Understanding probability is essential for working with modern ML, especially generative models and Bayesian methods.

## Math Notation & Pronunciation Guide

Before we dive in, let&apos;s decode the symbols you&apos;ll see:

**Probability Notation:**
- P(A) - pronounced "P of A" or "probability of A"
- P(A|B) - pronounced "P of A given B" - conditional probability
- P(A ∩ B) - pronounced "P of A and B" or "P of A intersect B" - joint probability
- P(A ∪ B) - pronounced "P of A or B" or "P of A union B" - union probability
- Aᶜ - pronounced "A complement" - not A
- E[X] - pronounced "expected value of X" or "expectation of X"
- Var(X) - pronounced "variance of X"
- σ (sigma) - standard deviation
- μ (mu) - mean
- θ (theta) - parameters

**Distributions:**
- X ~ N(μ, σ²) - pronounced "X follows normal distribution with mean mu and variance sigma squared"
- f(x) - probability density function (PDF)
- P(X = x) - probability mass function (PMF)
- F(x) - cumulative distribution function (CDF)

**Greek Letters:**
- μ (mu) - mean/expected value
- σ (sigma) - standard deviation
- σ² (sigma squared) - variance
- Σ (capital sigma) - summation
- π (pi) - 3.14159... or probability in some contexts
- λ (lambda) - rate parameter, eigenvalue
- ρ (rho) - correlation coefficient
- τ (tau) - time constant, precision (inverse variance)

**Special Symbols:**
- ∝ - pronounced "proportional to"
- ∫ - pronounced "integral"
- ∏ - pronounced "product" (like Σ but multiplication)
- ≈ - pronounced "approximately equal"
- ∼ - pronounced "distributed as" or "follows"
- ⊥ - pronounced "independent of"

## Key Jargon Definitions

- **Random Variable**: Variable whose value depends on random outcomes
- **Probability Distribution**: Function describing likelihood of different outcomes
- **Expected Value**: Average value if experiment repeated many times
- **Variance**: Measure of spread around the mean
- **Standard Deviation**: Square root of variance; same units as data
- **Conditional Probability**: Probability of A given B has occurred
- **Independence**: Events don&apos;t affect each other
- **Bayes&apos; Theorem**: Update probabilities given new evidence
- **Prior**: Initial belief before seeing data
- **Posterior**: Updated belief after seeing data
- **Likelihood**: Probability of data given hypothesis
- **PMF**: Probability Mass Function for discrete random variables
- **PDF**: Probability Density Function for continuous random variables
- **CDF**: Cumulative Distribution Function; P(X ≤ x)
- **Bernoulli**: Single binary trial (coin flip)
- **Binomial**: Multiple independent binary trials
- **Normal/Gaussian**: Bell curve distribution
- **Entropy**: Measure of uncertainty/information content
- **Cross-Entropy**: Loss function for classification
- **KL Divergence**: Measure of difference between distributions
- **MLE**: Maximum Likelihood Estimation; find parameters that best explain data

## Why Probability Matters

AI deals with uncertainty:
- Classification outputs are probability distributions over classes
- Language models sample from probability distributions over tokens
- Bayesian optimization explores parameter space probabilistically
- Uncertainty estimation tells us when the model is confident

## What You&apos;ll Master

### 1. Probability Fundamentals

**Probability Axioms:**
1. 0 ≤ P(A) ≤ 1 for any event A
2. P(Ω) = 1 where Ω is the sample space (all possible outcomes)
3. P(A ∪ B) = P(A) + P(B) if A and B are mutually exclusive

**Basic Rules:**

- Complement: P(Aᶜ) = 1 - P(A)
- Addition: P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
- Multiplication: P(A ∩ B) = P(A|B) · P(B)

**Conditional Probability:**
Probability of A given B has occurred:

P(A|B) = P(A ∩ B) / P(B)

Example: P(has disease | test positive)

**Independence:**
A and B are independent if:
P(A ∩ B) = P(A) · P(B)

Or equivalently: P(A|B) = P(A)

Example: Two coin flips are independent.

**Random Variables:**

- **Discrete**: Takes countable values (dice roll: 1,2,3,4,5,6)
- **Continuous**: Takes any value in range (height, weight, temperature)

**Probability Mass Function (PMF) - Discrete:**
P(X = x) for each value x

Example: Fair die P(X = k) = 1/6 for k ∈ {1,2,3,4,5,6}

**Probability Density Function (PDF) - Continuous:**
f(x) where P(a ≤ X ≤ b) = ∫ᵃᵇ f(x)dx

Example: Normal distribution PDF

**Cumulative Distribution Function (CDF):**
F(x) = P(X ≤ x)

For continuous: F(x) = ∫⁻∞ˣ f(t)dt

### 2. Expectation and Variance

**Expected Value (Mean):**

Discrete: E[X] = Σ x · P(X = x)
Continuous: E[X] = ∫ x · f(x)dx

Interpretation: Average value if we repeat experiment many times.

**Properties:**
- Linearity: E[aX + bY] = aE[X] + bE[Y]
- E[X + c] = E[X] + c
- E[cX] = c·E[X]

**Variance:**
Measures spread around the mean:

Var(X) = E[(X - μ)²] = E[X²] - (E[X])²

Where μ = E[X]

**Standard Deviation:**
σ = √Var(X)

Same units as X, easier to interpret.

**Properties:**
- Var(X + c) = Var(X)
- Var(cX) = c²·Var(X)
- If X, Y independent: Var(X + Y) = Var(X) + Var(Y)

### 3. Important Distributions

**Bernoulli Distribution:**
Single binary trial (success/failure):

P(X = 1) = p
P(X = 0) = 1 - p

E[X] = p
Var(X) = p(1-p)

Example: Single coin flip, click/no-click on ad

**Binomial Distribution:**
n independent Bernoulli trials:

P(X = k) = C(n,k) · pᵏ · (1-p)ⁿ⁻ᵏ

Where C(n,k) = n! / (k!(n-k)!)

E[X] = np
Var(X) = np(1-p)

Example: Number of heads in 10 coin flips

**Categorical Distribution:**
Single trial with k possible outcomes:

P(X = i) = pᵢ where Σpᵢ = 1

Example: Rolling a die (6 outcomes), predicting word in vocabulary

**Multinomial Distribution:**
n independent categorical trials

Example: Histogram of outcomes when rolling die n times

**Uniform Distribution:**
All values equally likely:

Continuous: f(x) = 1/(b-a) for x ∈ [a,b]

E[X] = (a+b)/2
Var(X) = (b-a)²/12

**Normal (Gaussian) Distribution:**
Bell curve, most important distribution:

f(x) = (1/(σ√(2π))) · e^(-(x-μ)²/(2σ²))

Notation: X ~ N(μ, σ²)

E[X] = μ
Var(X) = σ²

**Standard Normal:** N(0, 1)

**Central Limit Theorem:**
Sum of many independent random variables → Normal distribution

This is why Normal appears everywhere!

**Properties:**
- 68% of data within ±σ
- 95% of data within ±2σ
- 99.7% of data within ±3σ

**Code Example - Working with Distributions:**

\`\`\`python path=null start=null
import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

# Bernoulli: Single coin flip
print("=== Bernoulli Distribution ===")
p = 0.7  # Probability of success
bernoulli = stats.bernoulli(p)
print(f"P(X=1) = {bernoulli.pmf(1):.2f}")  # 0.70
print(f"P(X=0) = {bernoulli.pmf(0):.2f}")  # 0.30
print(f"Mean = {bernoulli.mean():.2f}, Var = {bernoulli.var():.2f}")

# Binomial: Multiple coin flips
print("\n=== Binomial Distribution ===")
n, p = 10, 0.5  # 10 flips, fair coin
binomial = stats.binom(n, p)
print(f"P(X=5) = {binomial.pmf(5):.3f}")  # Most likely outcome
print(f"P(X<=3) = {binomial.cdf(3):.3f}")  # Cumulative
print(f"Mean = {binomial.mean()}, Var = {binomial.var()}")

# Normal distribution
print("\n=== Normal Distribution ===")
mu, sigma = 0, 1  # Standard normal
normal = stats.norm(mu, sigma)
print(f"P(-1 < X < 1) = {normal.cdf(1) - normal.cdf(-1):.3f}")  # ~68%
print(f"P(-2 < X < 2) = {normal.cdf(2) - normal.cdf(-2):.3f}")  # ~95%

# Generate samples
samples = normal.rvs(size=1000)
print(f"Sample mean = {np.mean(samples):.3f}, std = {np.std(samples):.3f}")

# Categorical distribution (like softmax output)
print("\n=== Categorical Distribution ===")
probs = [0.1, 0.3, 0.4, 0.2]  # 4 classes
categorical = stats.rv_discrete(values=(range(len(probs)), probs))
samples = categorical.rvs(size=100)
print(f"Sampled classes: {np.bincount(samples)}")
print(f"Expected counts: {[p*100 for p in probs]}")
\`\`\`

### 4. Bayes&apos; Theorem

**Formula:**
P(A|B) = P(B|A) · P(A) / P(B)

Or in ML notation:
P(hypothesis|data) = P(data|hypothesis) · P(hypothesis) / P(data)

**Components:**
- **Posterior**: P(A|B) - updated belief after seeing data
- **Likelihood**: P(B|A) - how well hypothesis explains data
- **Prior**: P(A) - initial belief before data
- **Evidence**: P(B) - probability of observing data

**Example: Medical Diagnosis**

Given:
- Disease rate: P(D) = 0.01 (1% have disease)
- Test sensitivity: P(+|D) = 0.95 (95% true positive)
- False positive rate: P(+|Dᶜ) = 0.05 (5% false positive)

Question: If test positive, what&apos;s probability of disease?

P(D|+) = P(+|D) · P(D) / P(+)

Where P(+) = P(+|D)·P(D) + P(+|Dᶜ)·P(Dᶜ)
         = 0.95×0.01 + 0.05×0.99
         = 0.059

P(D|+) = (0.95 × 0.01) / 0.059 ≈ 0.16

Only 16% chance! Despite 95% accurate test.

**Naive Bayes Classifier:**
Assumes features are independent:

P(y|x₁,...,xₙ) ∝ P(y) · ∏ᵢ P(xᵢ|y)

Used in spam detection, text classification.

**Code Example - Bayes Theorem:**

\`\`\`python path=null start=null
import numpy as np

# Medical diagnosis example
def bayes_medical_test():
    # Given probabilities
    p_disease = 0.01  # 1% have disease
    p_positive_given_disease = 0.95  # 95% sensitivity
    p_positive_given_no_disease = 0.05  # 5% false positive
    
    # Compute P(+) using law of total probability
    p_no_disease = 1 - p_disease
    p_positive = (p_positive_given_disease * p_disease +
                  p_positive_given_no_disease * p_no_disease)
    
    # Bayes theorem: P(D|+)
    p_disease_given_positive = (p_positive_given_disease * p_disease) / p_positive
    
    print(f"P(disease) = {p_disease:.1%}")
    print(f"P(+|disease) = {p_positive_given_disease:.1%}")
    print(f"P(+|no disease) = {p_positive_given_no_disease:.1%}")
    print(f"P(disease|+) = {p_disease_given_positive:.1%}")
    print(f"\nOnly {p_disease_given_positive:.1%} chance despite 95% accurate test!")

bayes_medical_test()

# Naive Bayes for text classification
class NaiveBayesClassifier:
    def fit(self, X, y):
        """X: documents (list of word lists), y: labels"""
        self.classes = np.unique(y)
        self.class_priors = {}
        self.word_probs = {}
        
        for c in self.classes:
            # Class prior
            self.class_priors[c] = np.mean(y == c)
            
            # Word probabilities
            docs_c = [X[i] for i in range(len(X)) if y[i] == c]
            words_c = [word for doc in docs_c for word in doc]
            vocab = set([word for doc in X for word in doc])
            
            self.word_probs[c] = {}
            for word in vocab:
                # Laplace smoothing
                count = words_c.count(word)
                self.word_probs[c][word] = (count + 1) / (len(words_c) + len(vocab))
    
    def predict(self, doc):
        """Predict class for a document"""
        scores = {}
        for c in self.classes:
            # log P(c) + sum log P(word|c)
            score = np.log(self.class_priors[c])
            for word in doc:
                if word in self.word_probs[c]:
                    score += np.log(self.word_probs[c][word])
            scores[c] = score
        return max(scores, key=scores.get)

# Example usage
X_train = [["free", "money", "win"], ["hello", "meeting", "tomorrow"],
           ["buy", "now", "free"], ["schedule", "call", "monday"]]
y_train = np.array(["spam", "ham", "spam", "ham"])

nb = NaiveBayesClassifier()
nb.fit(X_train, y_train)

test_doc = ["free", "win"]
print(f"Document {test_doc} classified as: {nb.predict(test_doc)}")
\`\`\`

### 5. Maximum Likelihood Estimation (MLE)

**Goal:** Find parameters that maximize probability of observed data.

**Likelihood Function:**
L(θ|data) = P(data|θ)

For independent samples:
L(θ|x₁,...,xₙ) = ∏ᵢ P(xᵢ|θ)

**Log-Likelihood:**
log L(θ) = Σᵢ log P(xᵢ|θ)

Easier to work with (sum instead of product).

**MLE Estimate:**
θ̂ = argmaxᵧ L(θ|data)

Find θ that maximizes likelihood.

**Example: Estimating Coin Bias**

Data: 7 heads in 10 flips
Model: Bernoulli with parameter p

L(p) = C(10,7) · p⁷ · (1-p)³

log L(p) = const + 7log(p) + 3log(1-p)

Take derivative, set to 0:
d/dp log L(p) = 7/p - 3/(1-p) = 0

Solving: p̂ = 7/10 = 0.7

MLE estimate: 70% chance of heads.

### 6. Information Theory

**Entropy:**
Measures uncertainty/information content:

H(X) = -Σ P(x) · log₂ P(x)

Higher entropy = more uncertainty

Example:
- Fair coin: H = -[0.5log₂(0.5) + 0.5log₂(0.5)] = 1 bit
- Biased coin (p=0.9): H = -[0.9log₂(0.9) + 0.1log₂(0.1)] ≈ 0.47 bits

**Cross-Entropy:**
Expected bits when using distribution Q to encode data from P:

H(P, Q) = -Σ P(x) · log Q(x)

**Cross-Entropy Loss:**
Used in classification:

L = -Σ yᵢ log(ŷᵢ)

Where y is true distribution (one-hot), ŷ is predicted probabilities.

**KL Divergence:**
Measures difference between distributions:

Dₖₗ(P||Q) = Σ P(x) · log(P(x)/Q(x))

Properties:
- Always non-negative: Dₖₗ(P||Q) ≥ 0
- Zero iff P = Q
- NOT symmetric: Dₖₗ(P||Q) ≠ Dₖₗ(Q||P)

Used in VAEs, policy gradient methods.

### 7. Statistical Testing

**Hypothesis Testing:**

- **Null hypothesis (H₀)**: Default assumption (no effect)
- **Alternative hypothesis (H₁)**: What we want to prove

**P-value:**
Probability of seeing data this extreme if H₀ is true.

If p-value < 0.05: Reject H₀ (statistically significant)

**Type I Error:** False positive (reject H₀ when true)
**Type II Error:** False negative (fail to reject H₀ when false)

**Confidence Intervals:**
95% CI: [μ̂ - 1.96·σ/√n, μ̂ + 1.96·σ/√n]

We&apos;re 95% confident true mean is in this interval.

**A/B Testing:**
Compare two variants (e.g., website designs):

1. Split users randomly
2. Measure metric (click rate, conversion)
3. Test if difference is statistically significant
4. Choose better variant

Important: Account for multiple testing, sample size.

### 8. Statistical Concepts for ML

**Bias-Variance Tradeoff:**

Expected Test Error = Bias² + Variance + Irreducible Error

- **Bias**: How far off model predictions are on average
- **Variance**: How much predictions vary for different training sets

High bias = underfitting (too simple)
High variance = overfitting (too complex)

**Law of Large Numbers:**
As sample size increases, sample mean converges to true mean.

**Sampling:**
- **Simple random**: Each item equally likely
- **Stratified**: Sample from each subgroup
- **Bootstrap**: Resample with replacement

**Monte Carlo Methods:**
Use random sampling to estimate quantities:

Example: Estimate π by randomly throwing darts at circle inscribed in square.

Used in MCMC, reinforcement learning, Bayesian inference.

### 9. Real AI Applications

**Language Models:**
Model probability distribution over sequences:

P(w₁, w₂, ..., wₙ) = P(w₁) · P(w₂|w₁) · ... · P(wₙ|w₁...wₙ₋₁)

Sample next token from: P(wₙ₊₁|w₁...wₙ)

**Classification:**
Output probabilities via softmax:

P(class=k|x) = e^zₖ / Σⱼ e^zⱼ

Optimize using cross-entropy loss.

**Code Example - Softmax and Cross-Entropy:**

\`\`\`python path=null start=null
import numpy as np

# Softmax function
def softmax(logits):
    """Convert logits to probabilities"""
    exp_logits = np.exp(logits - np.max(logits))  # Subtract max for numerical stability
    return exp_logits / np.sum(exp_logits)

# Example: 3-class classification
logits = np.array([2.0, 1.0, 0.1])  # Raw network outputs
probs = softmax(logits)
print(f"Logits: {logits}")
print(f"Probabilities: {probs}")
print(f"Sum: {np.sum(probs):.1f}")  # Must be 1.0

# Cross-entropy loss
def cross_entropy_loss(y_true, y_pred):
    """y_true: one-hot, y_pred: probabilities"""
    return -np.sum(y_true * np.log(y_pred + 1e-10))  # Add epsilon for stability

# Example
y_true = np.array([0, 1, 0])  # True class is 1
y_pred = np.array([0.1, 0.7, 0.2])  # Predicted probabilities
loss = cross_entropy_loss(y_true, y_pred)
print(f"\nCross-entropy loss: {loss:.3f}")

# Lower loss = better predictions
y_pred_better = np.array([0.05, 0.9, 0.05])
loss_better = cross_entropy_loss(y_true, y_pred_better)
print(f"Better prediction loss: {loss_better:.3f}")  # Lower!

# Complete classification example
def classify_batch():
    # Batch of 4 samples, 3 classes
    logits = np.array([
        [2.0, 1.0, 0.1],
        [0.5, 2.5, 0.3],
        [1.0, 0.5, 2.0],
        [3.0, 0.1, 0.2]
    ])
    
    # Apply softmax to each sample
    probs = np.array([softmax(logit) for logit in logits])
    
    # Predicted classes (argmax)
    predictions = np.argmax(probs, axis=1)
    
    # True labels
    y_true = np.array([0, 1, 2, 0])
    
    # Compute accuracy
    accuracy = np.mean(predictions == y_true)
    
    print(f"\nBatch classification:")
    print(f"Probabilities:\n{probs}")
    print(f"Predictions: {predictions}")
    print(f"True labels: {y_true}")
    print(f"Accuracy: {accuracy:.1%}")
    
    # Compute average cross-entropy loss
    y_true_onehot = np.eye(3)[y_true]  # Convert to one-hot
    losses = [cross_entropy_loss(y_true_onehot[i], probs[i]) for i in range(len(y_true))]
    avg_loss = np.mean(losses)
    print(f"Average loss: {avg_loss:.3f}")

classify_batch()
\`\`\`

**Variational Autoencoders (VAEs):**
Learn probability distribution over latent space:

Maximize ELBO = E[log P(x|z)] - Dₖₗ(Q(z|x)||P(z))

Generate new samples by sampling from learned distribution.

**Bayesian Neural Networks:**
Place distributions over weights instead of point estimates:

P(w|data) ∝ P(data|w) · P(w)

Provides uncertainty estimates in predictions.

**Gaussian Processes:**
Non-parametric Bayesian method:

Define distribution over functions.
Make predictions with uncertainty bounds.

**Reinforcement Learning:**
Policy is distribution over actions:

π(a|s) = probability of action a in state s

Value functions are expectations over trajectories.

### 10. Key Takeaways

- Probability quantifies uncertainty in AI systems
- Bayes theorem updates beliefs given new evidence
- Maximum likelihood estimates parameters from data
- Entropy measures information content
- Cross-entropy is standard loss for classification
- Statistical testing validates model improvements
- Many ML algorithms have probabilistic interpretations
- Understanding distributions essential for generative models

## Additional Resources

**Video Courses:**
- [Khan Academy - Probability](https://www.khanacademy.org/math/statistics-probability) - From basics
- [Stanford CS109](http://web.stanford.edu/class/cs109/) - Probability for CS
- [3Blue1Brown - Bayes Theorem](https://www.youtube.com/watch?v=HZGCoVF3YvM) - Visual intuition

**Books:**
- "Pattern Recognition and Machine Learning" by Bishop - Chapters 1-2
- "Probabilistic Machine Learning" by Kevin Murphy - Comprehensive
- "Think Stats" by Allen Downey - Python-based intro

**Interactive:**
- [Seeing Theory](https://seeing-theory.brown.edu/) - Visual probability

**GitHub Repositories:**
- [Probability & Statistics for Data Science](https://github.com/unpingco/Python-for-Probability-Statistics-and-Machine-Learning) - Python examples
- [Think Stats](https://github.com/AllenDowney/ThinkStats2) - Exploratory data analysis with Python
- [Statistical Learning](https://github.com/hardikkamboj/An-Introduction-to-Statistical-Learning) - R and Python implementations

**Papers:**
- [Variational Autoencoders](https://arxiv.org/abs/1312.6114) - Kingma & Welling, 2013
- [Dropout as Bayesian Approximation](https://arxiv.org/abs/1506.02142) - Gal & Ghahramani, 2016
    `, 
    subModules: []
  },
  {
    id: 'linear-models',
    title: 'Linear Models',
    description: 'Ridge, Lasso, ElasticNet, and Logistic Regression - the core family',
    status: 'not-started',
    detailedContent: `# The Linear Family

Linear regression is just the beginning. Once you master it, you can explore the broader family of linear models used in production AI systems.

## Key Jargon Definitions

- **Regularization**: A technique to prevent overfitting by adding a penalty term to the loss function
- **L1 Penalty (Lasso)**: Penalty proportional to the absolute value of coefficients ($|\\beta|$)
- **L2 Penalty (Ridge)**: Penalty proportional to the square of coefficients ($\\beta^2$)
- **Hyperparameter ($\\lambda$ or $\\alpha$)**: Controls the strength of regularization
- **Sparsity**: When a model has many coefficients exactly equal to zero
- **Multicollinearity**: When features are highly correlated with each other
- **Sigmoid Function**: An S-shaped curve that maps any real number to a value between 0 and 1
- **Log-Odds**: The logarithm of the odds ratio ($p/(1-p)$), the linear part of logistic regression

## Why This Matters

In the real world, data is rarely clean and simple:
- You will have datasets with more columns (features) than rows (samples)
- Features will be correlated (e.g., "square footage" and "number of bedrooms")
- You will need to classify data (spam vs. not spam), not just predict numbers
- **Regularization is the secret sauce** that makes linear models robust enough for production.

## 1. Visualizing the Family

### The Foundation: Linear Regression
A straight line trying to fit through scattered data points.

\`\`\`text
      y
      ^
      |      *        /
      |            * /
      |       *     /   <-- The Model (Line)
      |          * /
      |      *    /
      |     *    /
      |         / *
      |________/___________ x
\`\`\`

### Ridge vs Lasso: The "Constraint" View
The core difference lies in how they constrain the model's "best guess" to prevent overfitting.

\`\`\`text
       Ridge (L2)                   Lasso (L1)
     "The Smooth Pull"           "The Sharp Selector"

          |
      _.-" "-._                    /\\
    ."    |    ".                /    \\
   /  ( ) |      \\              / ( )  \\
--|--( . )|-------|-- x1      -|--( . )--|- x1
   \\      |      /              \\      /  ^
    "._   |   _."                \\    /   |
       "-._.-"                    \\/      |
          |
                                     Hits the axis!
                                     (Feature x1 = 0)
\`\`\`

### Logistic Regression: The Sigmoid Squasher
Instead of a straight line fitting data, we fit a probability curve (S-curve) to classify data.

\`\`\`text
      Probability
          ^
      1.0 |__________       ___________
          |          \\     /
          |           \\   /
      0.5 |............\\./............. Decision Boundary
          |           /   \\
          |          /     \\
      0.0 |_________/       \\__________
          |
          -----------------------------> Input (z)
\`\`\`

## 🧠 Detailed Model Analysis

### 1. Ridge Regression (L2 Regularization) 🛡️
**"The Dampener" - Shrinking Coefficients Without Elimination**

**Core Concept:** Ridge assumes that *all* your features might be relevant, but some are just noisy. It doesn't delete information; it just turns down the volume on loud, erratic features to prevent them from dominating the prediction.

**Mathematical Foundation:**
*   **Loss Function:** $Loss = MSE + \\lambda \\sum \\beta^2$
*   **Constraint:** $\\sum \\beta_j^2 \\leq t$ (circular constraint in coefficient space)

**Key Characteristics:**
*   **Mechanism:** Squaring the coefficients penalizes large outliers heavily
*   **The Effect:** It shrinks coefficients towards zero but rarely hits zero exactly
*   **Bias-Variance Tradeoff:** Reduces variance at the cost of some bias
*   **Feature Handling:** Keeps all features but with reduced influence

**Optimal Use Cases:**
*   **Multicollinearity**: When two or more features are highly correlated, Ridge splits the weight equally between them
*   **All Features Relevant**: When you believe all features contain useful information
*   **Example Application**: **Stock Price Prediction** with 50 correlated moving averages - Ridge keeps them all but dampens noise

### 2. Lasso Regression (L1 Regularization) 🎯
**"The Feature Selector" - Eliminating Irrelevant Variables**

**Core Concept:** Lasso assumes that **most features are useless** and only a few are actual signals. It aggressively forces weak features to exactly zero, effectively performing automatic feature selection.

**Mathematical Foundation:**
*   **Loss Function:** $Loss = MSE + \\lambda \\sum |\\beta|$
*   **Constraint:** $\\sum |\\beta_j| \\leq t$ (diamond-shaped constraint in coefficient space)

**Key Characteristics:**
*   **Mechanism:** The absolute value constraint creates "corners" at zero, making it statistically likely for coefficients to be exactly zero
*   **The Effect:** Produces **Sparse Models** - many coefficients become exactly zero
*   **Feature Selection:** Automatically identifies and removes irrelevant features
*   **Computational Efficiency:** Results in simpler, faster models

**Optimal Use Cases:**
*   **High-Dimensional Data**: When you have many more features than samples
*   **Automatic Feature Selection**: When you want the model to identify the most important features
*   **Example Application**: **Genomics** with 20,000 gene features to find the 3 that are responsible for a specific disease

### 3. ElasticNet 🔄
**"The Balanced Approach" - Combining L1 and L2 Advantages**

**Core Concept:** Lasso has a limitation: when features are highly correlated (like twins), Lasso randomly selects one and eliminates the other. ElasticNet addresses this by combining both L1 and L2 penalties, allowing it to perform feature selection while maintaining group stability.

**Mathematical Foundation:**
*   **Loss Function:** $Loss = MSE + \\lambda_1 \\sum |\\beta| + \\lambda_2 \\sum \\beta^2$
*   **Balance Parameter:** The $\\alpha$ parameter controls the mix between Lasso (L1) and Ridge (L2) penalties

**Key Characteristics:**
*   **Mechanism:** Linearly combines L1 (Lasso) and L2 (Ridge) penalties to get the benefits of both
*   **The Effect:** Performs feature selection like Lasso while handling correlated features like Ridge
*   **Grouping Effect:** Correlated features tend to be selected or eliminated together
*   **Versatility:** More robust than either Lasso or Ridge alone

**Optimal Use Cases:**
*   **Grouped Features**: When you have sets of correlated features that should be selected together
*   **High-Dimensional Data with Correlations**: When you have many features that are internally correlated
*   **Example Application**: **Bioinformatics** for gene data or **text analysis** where words often appear in groups

### 4. Logistic Regression 📊
**"The Binary Classifier" - Converting Linear Output to Probabilities**

**Core Concept:** While the underlying computation is linear ($z = \\beta_0 + \\beta_1x_1 + ... + \\beta_nx_n$), the goal is classification rather than prediction. It transforms the linear output into a probability between 0 and 1 using the sigmoid function, enabling binary classification.

**Mathematical Foundation:**
*   **Linear Combination:** $z = \\beta_0 + \\beta_1x_1 + ... + \\beta_nx_n$
*   **Sigmoid Transformation:** $P(y=1) = \\frac{1}{1+e^{-z}}$ (maps any real number to [0,1])
*   **Log-Odds:** $log(\\frac{P(y=1)}{1-P(y=1)}) = z$ (linear in the parameters)

**Key Characteristics:**
*   **Output:** Probability estimates that can be thresholded for classification
*   **Interpretability:** Coefficients represent the log-odds change per unit feature change
*   **Multi-class Extension:** Can be extended to multi-class problems (One-vs-Rest, Softmax)
*   **Regularization Compatible:** Can be combined with L1/L2 penalties (Logistic with L1/L2)

**Optimal Use Cases:**
*   **Binary Classification**: When the outcome is yes/no, true/false, positive/negative
*   **Probability Estimation**: When you need estimated probabilities, not just classifications
*   **Example Applications**: **Spam Detection** (Spam vs Not Spam), **Credit Approval** (Default vs Pay), **Medical Diagnosis** (Disease vs Healthy)

## 3. Practical Code Examples

**Ridge and Lasso with Scikit-Learn:**

\`\`\`python path=null start=null
from sklearn.linear_model import Ridge, Lasso
import numpy as np

# Synthetic data: 100 samples, 10 features
X = np.random.randn(100, 10)
y = 3 * X[:, 0] + 2 * X[:, 1] + 0.5 * np.random.randn(100) # Only first 2 features matter

# Ridge Regression
ridge = Ridge(alpha=1.0) # Alpha is the regularization strength
ridge.fit(X, y)
print("Ridge Coeffs:", ridge.coef_)
# Result: All 10 coeffs are non-zero, but small ones are shrunk.

# Lasso Regression
lasso = Lasso(alpha=0.1)
lasso.fit(X, y)
print("Lasso Coeffs:", lasso.coef_)
# Result: Ideally, only indices 0 and 1 are non-zero. Others are 0.
\`\`\`

**Logistic Regression:**

\`\`\`python path=null start=null
from sklearn.linear_model import LogisticRegression

# Binary classification data
X = np.random.randn(100, 2)
y = (X[:, 0] + X[:, 1] > 0).astype(int) # Class 1 if sum > 0

model = LogisticRegression()
model.fit(X, y)

# Predict probability
sample = np.array([[0.5, 0.5]])
prob = model.predict_proba(sample)
print(f"Probability of Class 1: {prob[0][1]:.4f}")
\`\`\`

## Additional Resources

- **Video:** [StatQuest: Ridge vs Lasso Regression](https://www.youtube.com/watch?v=NGf0voTMlcs) - Essential for understanding regularization differences.
- **Video:** [StatQuest: Logistic Regression](https://www.youtube.com/watch?v=yIYKR4sgzI8) - Comprehensive introduction to classification.
- **Article:** [Regularization in Machine Learning](https://towardsdatascience.com/regularization-in-machine-learning-76441ddcf99a) - Detailed explanations of regularization concepts.
- **Documentation:** [Scikit-Learn Linear Models](https://scikit-learn.org/stable/modules/linear_model.html) - Your go-to for implementation details.
- **Book:** "The Elements of Statistical Learning" - For deeper mathematical understanding of regularization.
`,
    subModules: []
  }
];

export const calculateProgress = (modules: LearningModule[]) => {
  const completed = modules.filter(m => m.status === 'completed').length;
  const inProgress = modules.filter(m => m.status === 'in-progress').length;
  const total = modules.length;
  
  const progress = ((completed * 100) + (inProgress * 50)) / total;
  
  return Math.round(progress);
};
