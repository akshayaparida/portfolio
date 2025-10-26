import { LearningModule } from '@/types/learning';

export const mathematicsModules: LearningModule[] = [
  {
    id: 'linear-algebra',
    title: 'Linear Algebra',
    description: 'Vectors, matrices, and transformations - the language of neural networks',
    status: 'in-progress',
    detailedContent: `# Linear Algebra for AI Engineers

Linear algebra is the mathematical foundation of all machine learning. Every neural network, every transformation, every data representation relies on vectors and matrices.

## Why Linear Algebra Matters

In AI, everything is a vector or matrix:
- Text embeddings (word2vec, BERT) are vectors in high-dimensional space
- Images are matrices of pixel values
- Neural network weights are matrices
- Transformations between layers are matrix multiplications

## What You'll Master

### 1. Vectors and Vector Spaces

**What is a Vector?**
A vector is an ordered list of numbers representing a point or direction in space. In AI, a 300-dimensional word embedding is a vector with 300 numbers.

Example: v = [0.2, -0.5, 0.8] is a 3D vector

**Vector Operations:**
- **Addition**: [1, 2] + [3, 4] = [4, 6] - combine vectors
- **Scalar Multiplication**: 2 × [1, 2] = [2, 4] - scale a vector
- **Dot Product**: [1, 2] · [3, 4] = 1×3 + 2×4 = 11 - measures alignment

**Vector Magnitude (Length):**
||v|| = √(v₁² + v₂² + ... + vₙ²)

For [3, 4]: √(3² + 4²) = √25 = 5

**Unit Vectors (Normalization):**
Divide by magnitude to get length 1: v̂ = v / ||v||

Why normalize? When comparing semantic similarity, we care about direction (meaning), not magnitude.

**Cosine Similarity:**
cos(θ) = (A · B) / (||A|| × ||B||)

Range: -1 (opposite) to +1 (same direction)
- 1.0 = identical meaning
- 0.0 = unrelated
- -1.0 = opposite meaning

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
- v = eigenvector (direction)
- λ = eigenvalue (scale factor)

Used in PCA to find principal components (directions of maximum variance).

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

### 5. Key Takeaways

- Vectors represent data points in multi-dimensional space
- Dot products measure similarity (cosine similarity in RAG)
- Matrix multiplication is the fundamental neural network operation
- Transformations are matrices, data flows through matrix multiplication
- Dimensionality matters: higher dims = more capacity, but harder to train
- GPU acceleration comes from parallelized matrix operations

## Additional Resources

**Video Courses:**
- [3Blue1Brown - Essence of Linear Algebra](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab) - Best visual intuition
- [Gilbert Strang's MIT 18.06](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/) - Comprehensive lectures

**Books:**
- "Linear Algebra and Its Applications" by Gilbert Strang - Classic textbook
- "Mathematics for Machine Learning" (Free PDF) - ML-focused approach

**Interactive:**
- [Immersive Math](http://immersivemath.com/ila/index.html) - Interactive linear algebra book
- [Matrix Multiplication Visualizer](http://matrixmultiplication.xyz/) - See it step-by-step

**Papers:**
- [Deep Learning Book - Chapter 2](https://www.deeplearningbook.org/contents/linear_algebra.html) - Goodfellow et al.
    `,
    subModules: [
      {
        id: 'vectors',
        title: 'Interactive: Vector Operations',
        description: 'Drag vectors to explore dot products and cosine similarity',
        status: 'in-progress'
      },
      {
        id: 'matrices',
        title: 'Interactive: Matrix Multiplication',
        description: 'Watch step-by-step how matrices multiply in neural networks',
        status: 'in-progress'
      }
    ]
  },
  {
    id: 'calculus',
    title: 'Calculus',
    description: 'Derivatives and optimization - how neural networks learn',
    status: 'in-progress',
    detailedContent: `# Calculus for AI Engineers

Calculus is the mathematics of change and optimization. Without calculus, neural networks couldn't learn - there would be no backpropagation, no gradient descent, no training.

## Why Calculus Matters

Neural networks learn by minimizing loss functions. Calculus tells us:
- Which direction to move weights (gradient)
- How fast to move (learning rate × gradient)
- When we've reached a minimum (gradient ≈ 0)

## What You'll Master

### 1. Derivatives - Measuring Change

**What is a Derivative?**
The derivative measures how a function changes when its input changes. It's the slope of the tangent line.

Definition: f'(x) = limit as h→0 of [f(x+h) - f(x)] / h

**Common Derivative Rules:**

- Power rule: d/dx(xⁿ) = n·xⁿ⁻¹
  Example: d/dx(x³) = 3x²

- Constant rule: d/dx(c) = 0

- Sum rule: d/dx(f + g) = f' + g'

- Product rule: d/dx(f·g) = f'g + fg'

- Quotient rule: d/dx(f/g) = (f'g - fg') / g²

- Chain rule: d/dx(f(g(x))) = f'(g(x)) · g'(x)

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
6. ∂L/∂z₁ = ∂L/∂a₁ · ReLU'(z₁) where ReLU'(z) = 1 if z>0 else 0
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
- [Seeing Theory](https://seeing-theory.brown.edu/) - Visual calculus
- [Distill.pub - Momentum](https://distill.pub/2017/momentum/) - Optimizer comparison

**Papers:**
- [Adam Optimizer](https://arxiv.org/abs/1412.6980) - Kingma & Ba, 2014
- [Batch Normalization](https://arxiv.org/abs/1502.03167) - Ioffe & Szegedy, 2015
    `,
    subModules: [
      {
        id: 'gradient-descent',
        title: 'Interactive: Gradient Descent',
        description: 'Control learning rate and watch optimization converge',
        status: 'in-progress'
      },
      {
        id: 'activations',
        title: 'Interactive: Activation Functions',
        description: 'See how non-linearity enables deep learning',
        status: 'in-progress'
      }
    ]
  },
  {
    id: 'probability-stats',
    title: 'Probability & Statistics',
    description: 'Distributions and uncertainty - the foundation of probabilistic ML',
    status: 'not-started',
    detailedContent: `# Probability & Statistics for AI Engineers

AI systems don't give certain answers - they give probability distributions. Understanding probability is essential for working with modern ML, especially generative models and Bayesian methods.

## Why Probability Matters

AI deals with uncertainty:
- Classification outputs are probability distributions over classes
- Language models sample from probability distributions over tokens
- Bayesian optimization explores parameter space probabilistically
- Uncertainty estimation tells us when the model is confident

## What You'll Master

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

### 4. Bayes' Theorem

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

Question: If test positive, what's probability of disease?

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

We're 95% confident true mean is in this interval.

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
- [Bayesian Methods for Hackers](http://camdavidsonpilon.github.io/Probabilistic-Programming-and-Bayesian-Methods-for-Hackers/) - PyMC tutorials

**Papers:**
- [Variational Autoencoders](https://arxiv.org/abs/1312.6114) - Kingma & Welling, 2013
- [Dropout as Bayesian Approximation](https://arxiv.org/abs/1506.02142) - Gal & Ghahramani, 2016
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
