import { LearningModule } from '@/types/learning';

export const linearAlgebraModule: LearningModule = {
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

print(f"Customer shape: {customer.shape}")  # (3,)
print(f"Embedding shape: {word_embedding.shape}")  # (5,)
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

print(f"Data shape: {data.shape}")      # (3, 4)
print(f"Weights shape: {weights.shape}")  # (4, 8)
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

print(f"All equal: {output1} = {output2} = {output3}")  # 1.7
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

print(f"Input shape: {input_data.shape}")      # (32, 512)
print(f"Weights shape: {layer_weights.shape}")  # (512, 256)
print(f"Output shape: {layer_output.shape}")    # (32, 256)
\`\`\`

**Transpose - Backpropagation:**

\`\`\`python path=null start=null
A = np.array([[1, 2], [3, 4]])

# Transpose using .T
A_T = A.T

print(f"Original:
{A}")
print(f"Transposed:
{A_T}")

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
print(f"v + w = {v_plus_w}")  # [4, 6]

# Scalar multiplication
scaled = 2 * v
print(f"2 * v = {scaled}")  # [6, 8]

# Dot product
dot = v @ w
print(f"v · w = {dot}")  # 11

# Magnitude (L2 norm)
magnitude = np.linalg.norm(v)
print(f"||v|| = {magnitude}")  # 5.0

# Normalization
unit_v = v / np.linalg.norm(v)
print(f"v̂ = {unit_v}")  # [0.6, 0.8]
print(f"||v̂|| = {np.linalg.norm(unit_v)}")  # 1.0
\`\`\`

**Cosine Similarity - Text/Embedding Comparison:**

\`\`\`python path=null start=null
def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# Word embeddings (simplified)
king = np.array([0.5, 0.8, 0.2])
queen = np.array([0.6, 0.7, 0.3])
dog = np.array([-0.3, 0.1, 0.9])

print(f"king-queen similarity: {cosine_similarity(king, queen):.3f}")  # ~0.97
print(f"king-dog similarity: {cosine_similarity(king, dog):.3f}")    # ~0.12
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
    print(f"Error: {e}")

# ALWAYS check shapes first
print(f"A shape: {A.shape}, B shape: {B.shape}")
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

print(f"Element-wise (A * B):
{element_wise}")
print(f"Matrix mult (A @ B):
{matrix_mult}")

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
print(f"Covariance shape: {cov_matrix.shape}")  # (5, 5) ✓
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
};