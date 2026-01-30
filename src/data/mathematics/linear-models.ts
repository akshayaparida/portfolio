import { LearningModule } from "@/types/learning";

export const linearModelsModule: LearningModule = {
  id: "linear-models",
  title: "Linear Models",
  description:
    "From linear regression to neural networks - the building blocks",
  status: "in-progress",
  detailedContent: `# Linear Models for AI Engineers

Linear models form the foundation of machine learning, from simple regression to the building blocks of neural networks. Understanding linear models is essential for mastering more complex algorithms.

## What You'll Learn

| # | Topic | Skill |
|:--|:------|:------|
| 1 | **Linear Regression** | Fit y = wx + b to data |
| 2 | **Logistic Regression** | Binary classification with sigmoid |
| 3 | **Loss Functions** | MSE, Cross-Entropy |
| 4 | **Gradient Descent** | Optimize model parameters |
| 5 | **Regularization** | L1 (Lasso) and L2 (Ridge) |
| 6 | **Cross-Validation** | Evaluate model generalization |
| 7 | **Scikit-Learn** | Implement models in Python |

## Math Notation & Pronunciation Guide

Before we dive in, let&apos;s decode the symbols you&apos;ll see:

**Linear Algebra in ML:**
- **y** - pronounced "vector y" or "bold y" - target/output vector
- **X** - pronounced "matrix X" or "bold capital X" - input/features matrix
- **β** - pronounced "beta" - coefficient vector
- **θ** - pronounced "theta" - parameter vector
- **w** - pronounced "w" - weights vector
- **b** - pronounced "b" - bias/intercept term

**Operations:**
- Xᵀ - pronounced "X transpose" - feature matrix transposed
- X⁻¹ - pronounced "X inverse" - matrix inverse
- X⁺ - pronounced "X pseudoinverse" - Moore-Penrose pseudoinverse
- ||β||₁ - pronounced "L1 norm of beta" - sum of absolute values
- ||β||₂ - pronounced "L2 norm of beta" - Euclidean norm

**Statistics in ML:**
- σ(·) - pronounced "sigma of" - sigmoid/activation function
- εᵢ - pronounced "epsilon i" - error term for observation i
- ŷ - pronounced "y hat" - predicted values
- R² - pronounced "R squared" - coefficient of determination
- χ² - pronounced "chi squared" - chi-squared statistic

**Greek Letters (in context):**
- α (alpha) - learning rate, regularization parameter, significance level
- λ (lambda) - regularization strength
- μ (mu) - mean, population parameter
- σ (sigma) - standard deviation, activation function
- ρ (chi) - chi in chi-squared tests

**Special Symbols:**
- ∂ - pronounced "partial" - partial derivative
- ∇ - pronounced "nabla" or "del" - gradient operator
- ∝ - pronounced "proportional to" - proportional relationship
- ≈ - pronounced "approximately equal" - close approximation
- ≠ - pronounced "not equal to" - inequality
- ≥, ≤ - pronounced "greater/less than or equal to"

## Key Jargon Definitions

- **Linear Model**: Model that assumes linear relationship between inputs and output
- **Linear Regression**: Supervised learning for continuous output prediction
- **Logistic Regression**: Linear model for binary classification with sigmoid activation
- **Generalized Linear Model (GLM)**: Extension to exponential family distributions
- **Regularization**: Technique to prevent overfitting by penalizing large coefficients
- **Gradient Descent**: Optimization algorithm to minimize loss function
- **Design Matrix (X)**: Matrix containing all feature vectors as rows
- **Feature Engineering**: Process of creating meaningful input variables
- **Overfitting**: Model fits training data too well, performs poorly on new data
- **Ridge Regression**: Linear regression with L2 regularization
- **Lasso Regression**: Linear regression with L1 regularization
- **Elastic Net**: Linear regression with L1 and L2 regularization
- **Maximum Likelihood**: Parameter estimation by maximizing data likelihood
- **Cross-Validation**: Technique to estimate model performance on new data
- **Coefficient**: Weight/parameter that multiplies a feature
- **Intercept**: Model output when all features are zero (bias term)
- **Loss Function**: Measures how wrong model predictions are
- **Residual**: Difference between actual and predicted values

## Why Linear Models Matter

Linear models are fundamental because:
- **Foundation**: Neural networks are stacks of linear transformations
- **Interpretability**: Easy to understand how features affect predictions
- **Efficiency**: Fast training and prediction
- **Baseline**: Essential for comparing more complex models
- **Scalability**: Handle large datasets well
- **Theory**: Rich mathematical foundation for understanding ML

## What You&apos;ll Master

### 1. Linear Regression - Core Concepts

**Simple Linear Regression (One Feature):**
y = β₀ + β₁x + ε

Where:
- y = target variable
- x = input feature
- β₀ = intercept (y-intercept)
- β₁ = slope coefficient
- ε = error term (residuals)

**Multiple Linear Regression (Multiple Features):**
y = β₀ + β₁x₁ + β₂x₂ + ... + βₚxₚ + ε

In matrix form: **y = Xβ + ε**

Where:
- **y** = [y₁, y₂, ..., yₙ]ᵀ (n×1 vector of targets)
- **X** = design matrix (n×(p+1) with column of 1s for intercept)
- **β** = [β₀, β₁, ..., βₚ]ᵀ (parameters to estimate)
- **ε** = [ε₁, ε₂, ..., εₙ]ᵀ (error vector)

**Matrix Notation Example:**
For 3 samples with 2 features each:
y₁ = β₀ + β₁x₁₁ + β₂x₁₂ + ε₁
y₂ = β₀ + β₁x₂₁ + β₂x₂₂ + ε₂  
y₃ = β₀ + β₁x₃₁ + β₂x₃₂ + ε₃

In matrix form:
[y₁]   [1 x₁₁ x₁₂] [β₀]
[y₂] = [1 x₂₁ x₂₂] [β₁]  + [ε₁]
[y₃]   [1 x₃₁ x₃₂] [β₂]    [ε₂]
                         [ε₃]

### 2. Ordinary Least Squares (OLS) - The Solution

**Goal**: Minimize sum of squared residuals
minimize: RSS = Σᵢ (yᵢ - ŷᵢ)² = ||y - Xβ||²

**Solution (Calculus approach):**
Take derivative with respect to β and set to zero:
∂RSS/∂β = -2Xᵀ(y - Xβ) = 0

Solving for β: **β̂ = (XᵀX)⁻¹Xᵀy**

**Geometric Interpretation:**
Xβ̂ is the orthogonal projection of y onto the column space of X.
Residuals (y - Xβ̂) are orthogonal to the column space of X.

**Key Properties:**
- Unbiased: E[β̂] = β (if assumptions hold)
- Minimum variance: Best Linear Unbiased Estimator (BLUE)
- Closed-form solution: No iterative optimization needed

**Code Example - OLS Implementation:**
\`\`\`python path=null start=null
import numpy as np
import matplotlib.pyplot as plt

def linear_regression_ols(X, y):
    """
    Solve linear regression using Ordinary Least Squares
    X: design matrix (n x p) with intercept column if needed
    y: target vector (n x 1)
    """
    # Add intercept column if not present
    if X.shape[1] == y.shape[0]:  # No intercept column
        X_with_intercept = np.column_stack([np.ones(X.shape[0]), X])
    else:
        X_with_intercept = X
    
    # OLS solution: β̂ = (XᵀX)⁻¹Xᵀy
    XtX_inv = np.linalg.inv(X_with_intercept.T @ X_with_intercept)
    beta_hat = XtX_inv @ X_with_intercept.T @ y
    
    return beta_hat

# Example: Simple linear regression
np.random.seed(42)
n_samples = 100
true_intercept = 1.0
true_slope = 2.5
noise_level = 1.0

# Generate data
X = np.random.randn(n_samples, 1)  # Single feature
y = true_intercept + true_slope * X.ravel() + np.random.randn(n_samples) * noise_level

# Solve with OLS
beta_hat = linear_regression_ols(X, y)
estimated_intercept, estimated_slope = beta_hat[0], beta_hat[1]

print(f"True intercept: {true_intercept}, Estimated: {estimated_intercept:.3f}")
print(f"True slope: {true_slope}, Estimated: {estimated_slope:.3f}")

# Plot results
plt.figure(figsize=(10, 6))
plt.scatter(X, y, alpha=0.6, label='Data')
X_plot = np.linspace(X.min(), X.max(), 100).reshape(-1, 1)
X_plot_with_intercept = np.column_stack([np.ones(X_plot.shape[0]), X_plot])
y_plot = X_plot_with_intercept @ beta_hat
plt.plot(X_plot, y_plot, 'r-', linewidth=2, label=f'Fitted: y = {estimated_intercept:.2f} + {estimated_slope:.2f}*x')
plt.xlabel('Feature X')
plt.ylabel('Target y')
plt.title('Linear Regression - OLS Solution')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
\`\`\`

### 3. Statistical Assumptions & Diagnostics

**Gauss-Markov Assumptions:**
1. **Linearity**: Relationship is truly linear
2. **Independence**: Errors εᵢ are independent
3. **Homoscedasticity**: Constant error variance (Var(εᵢ) = σ²)
4. **No Perfect Multicollinearity**: Features not perfectly correlated
5. **Zero Conditional Mean**: E[εᵢ | X] = 0

**Diagnostics to Check Assumptions:**

**Residual Plots:**
- Residuals vs Fitted: Check linearity and homoscedasticity
- Normal Q-Q Plot: Check normality of errors
- Scale-Location: Check homoscedasticity
- Residuals vs Leverage: Identify influential points

**Code for Residual Diagnostics:**
\`\`\`python path=null start=null
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

def diagnose_linear_model(X, y, y_pred):
    """
    Create diagnostic plots for linear regression
    """
    residuals = y - y_pred
    
    # 1. Residuals vs Fitted
    plt.figure(figsize=(15, 12))
    
    plt.subplot(2, 2, 1)
    plt.scatter(y_pred, residuals, alpha=0.6)
    plt.axhline(y=0, color='r', linestyle='--')
    plt.xlabel('Fitted Values')
    plt.ylabel('Residuals')
    plt.title('Residuals vs Fitted')
    plt.grid(True, alpha=0.3)
    
    # 2. Normal Q-Q plot
    plt.subplot(2, 2, 2)
    stats.probplot(residuals, dist="norm", plot=plt)
    plt.title('Normal Q-Q Plot')
    plt.grid(True, alpha=0.3)
    
    # 3. Scale-Location plot (sqrt of standardized residuals vs fitted)
    plt.subplot(2, 2, 3)
    standardized_residuals = residuals / np.std(residuals)
    plt.scatter(y_pred, np.sqrt(np.abs(standardized_residuals)), alpha=0.6)
    plt.xlabel('Fitted Values')
    plt.ylabel('√|Standardized Residuals|')
    plt.title('Scale-Location')
    plt.grid(True, alpha=0.3)
    
    # 4. Histogram of residuals
    plt.subplot(2, 2, 4)
    plt.hist(residuals, bins=30, density=True, alpha=0.7)
    # Overlay normal curve
    x_norm = np.linspace(residuals.min(), residuals.max(), 100)
    y_norm = stats.norm.pdf(x_norm, 0, np.std(residuals))
    plt.plot(x_norm, y_norm, 'r-', linewidth=2, label='Normal(0, σ)')
    plt.xlabel('Residuals')
    plt.ylabel('Density')
    plt.title('Histogram of Residuals')
    plt.legend()
    plt.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.show()
    
    return residuals

# Example usage with our OLS model
y_pred = X_with_intercept @ beta_hat
residuals = diagnose_linear_model(X, y, y_pred)

# Calculate some useful statistics
rss = np.sum(residuals**2)
tss = np.sum((y - np.mean(y))**2)
r_squared = 1 - (rss/tss)
rmse = np.sqrt(rss/len(y))

print(f"R-squared: {r_squared:.3f}")
print(f"RMSE: {rmse:.3f}")
\`\`\`

### 4. Multiple Linear Regression & Multicollinearity

**Matrix Form:**
y = Xβ + ε
Where X is n×(p+1) design matrix (with intercept column)

**Coefficient Interpretation:**
βⱼ represents change in y for 1-unit change in xⱼ, holding other features constant

**Multicollinearity Problem:**
When features are highly correlated, (XᵀX) becomes close to singular:
- Large variance in coefficient estimates
- Coefficients have wrong signs
- Model becomes unstable

**Detection Methods:**
- **Correlation Matrix**: Look for |r| > 0.8 between features
- **Variance Inflation Factor (VIF)**: VIF > 5 indicates problems
- **Condition Number**: sqrt(max_eigenvalue/min_eigenvalue) > 30 suggests issues

**VIF Calculation Code:**
\`\`\`python path=null start=null
def calculate_vif(X):
    """
    Calculate Variance Inflation Factor for each feature
    X: feature matrix (without intercept)
    """
    n_features = X.shape[1]
    vif_values = []
    
    for i in range(n_features):
        # Regress feature i on all other features
        other_features = np.delete(X, i, axis=1)
        if other_features.size == 0:
            vif_values.append(1.0)  # No other features
            continue
            
        # Fit model: X_i = other_features * beta + error
        beta = np.linalg.lstsq(other_features, X[:, i], rcond=None)[0]
        y_pred = other_features @ beta
        rss = np.sum((X[:, i] - y_pred)**2)
        tss = np.sum((X[:, i] - np.mean(X[:, i]))**2)
        
        r_squared = 1 - (rss/tss)
        vif = 1 / (1 - r_squared) if r_squared < 0.99999 else float('inf')
        vif_values.append(vif)
    
    return np.array(vif_values)

# Example with correlated features
np.random.seed(42)
n = 100
X_multi = np.random.randn(n, 3)
# Create correlation between features
X_multi[:, 1] = 0.9 * X_multi[:, 0] + 0.1 * np.random.randn(n)  # High correlation

vif_values = calculate_vif(X_multi)
feature_names = ['Feature 1', 'Feature 2', 'Feature 3']

print("Variance Inflation Factors (VIF):")
for name, vif in zip(feature_names, vif_values):
    status = "High" if vif > 5 else "OK"
    print(f"{name}: {vif:.3f} ({status})")
\`\`\`

### 5. Logistic Regression - Linear Classification

**Why Not Linear Regression for Classification?**
Linear regression can predict values outside [0,1], doesn't handle probability constraints.

**Logistic Regression Model:**
P(y=1|x) = σ(β₀ + β₁x₁ + ... + βₚxₚ)

Where σ(z) = 1/(1 + e⁻ᶻ) is the sigmoid function

**Matrix Form:**
P(y=1|X) = σ(Xβ)
Where σ is applied element-wise to the vector Xβ

**Why Sigmoid?**
- Maps any real number to (0,1)
- Differentiable (needed for gradient descent)
- Monotonic (preserves ordering)
- Natural link function for binomial distribution

**Maximum Likelihood Estimation:**
Log-likelihood: l(β) = Σᵢ [yᵢ log(pᵢ) + (1-yᵢ) log(1-pᵢ)]
Where pᵢ = σ(Xᵢβ)

No closed-form solution! Need iterative optimization (Newton-Raphson, gradient descent).

**Logistic Regression Code:**
\`\`\`python path=null start=null
import numpy as np
import matplotlib.pyplot as plt
from scipy.special import expit  # sigmoid function

def sigmoid(z):
    """Numerically stable sigmoid function"""
    return expit(z)  # scipy's numerically stable version

def logistic_regression_gradient_descent(X, y, learning_rate=0.01, max_iter=1000):
    """
    Logistic regression using gradient descent
    """
    # Add intercept column
    X_with_intercept = np.column_stack([np.ones(X.shape[0]), X])
    n_samples, n_features = X_with_intercept.shape
    
    # Initialize parameters
    beta = np.random.randn(n_features) * 0.01
    
    # Gradient descent
    for i in range(max_iter):
        # Forward pass - compute predictions
        z = X_with_intercept @ beta
        p = sigmoid(z)
        
        # Compute gradients
        gradients = X_with_intercept.T @ (p - y) / n_samples
        
        # Update parameters
        beta -= learning_rate * gradients
        
        # Check for convergence
        if np.linalg.norm(gradients) < 1e-6:
            print(f"Converged after {i+1} iterations")
            break
    
    return beta

# Generate binary classification data
np.random.seed(42)
n_samples = 200
X_logistic = np.random.randn(n_samples, 2)
# Create linearly separable data (with some noise)
true_beta = np.array([0.5, 1.0, -0.8])  # intercept, x1, x2
linear_combo = X_logistic @ true_beta[1:] + true_beta[0]
probabilities = sigmoid(linear_combo + 0.2 * np.random.randn(n_samples))  # Add noise
y_logistic = (np.random.rand(n_samples) < probabilities).astype(int)

# Fit logistic regression
beta_logistic = logistic_regression_gradient_descent(X_logistic, y_logistic)

print("True coefficients:", true_beta)
print("Estimated coefficients:", beta_logistic)
print("Class distribution:", np.bincount(y_logistic))

# Plot results
plt.figure(figsize=(12, 5))
plt.subplot(1, 2, 1)
scatter = plt.scatter(X_logistic[:, 0], X_logistic[:, 1], c=y_logistic, cmap='viridis', alpha=0.7)
plt.colorbar(scatter)
plt.xlabel('Feature 1')
plt.ylabel('Feature 2')
plt.title('Binary Classification Data')

# Plot decision boundary
x1_range = np.linspace(X_logistic[:, 0].min(), X_logistic[:, 0].max(), 100)
x2_range = np.linspace(X_logistic[:, 1].min(), X_logistic[:, 1].max(), 100)
xx1, xx2 = np.meshgrid(x1_range, x2_range)
X_mesh = np.column_stack([np.ones(xx1.ravel().shape[0]), xx1.ravel(), xx2.ravel()])
Z = sigmoid(X_mesh @ beta_logistic).reshape(xx1.shape)
plt.contour(xx1, xx2, Z, levels=[0.5], colors='red', linewidths=2)

plt.subplot(1, 2, 2)
# Show probability curve for one dimension
x1_1d = np.linspace(X_logistic[:, 0].min(), X_logistic[:, 0].max(), 100)
X_1d_with_intercept = np.column_stack([np.ones(100), x1_1d, np.zeros(100)])  # Hold x2=0
logits = X_1d_with_intercept @ beta_logistic
probs = sigmoid(logits)

plt.plot(x1_1d, probs, 'b-', linewidth=2, label='Logistic Regression')
plt.axhline(y=0.5, color='r', linestyle='--', label='Decision Boundary')
plt.xlabel('Feature 1 (X2=0)')
plt.ylabel('P(y=1|x)')
plt.title('Logistic Function')
plt.legend()
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
\`\`\`

### 6. Regularization - Addressing Overfitting

**The Overfitting Problem:**
- Complex models fit training data perfectly
- Poor generalization to new data
- High variance in predictions

**Regularization Principle:**
Add penalty term to prevent large coefficients:
minimize: Loss + λ × Penalty(β)

Where λ controls regularization strength.

**Ridge Regression (L2 Regularization):**
minimize: ||y - Xβ||² + λ||β||₂²

**Lasso Regression (L1 Regularization):**
minimize: ||y - Xβ||² + λ||β||₁

**Elastic Net (L1 + L2):**
minimize: ||y - Xβ||² + λ₁||β||₁ + λ₂||β||₂²

**Key Differences:**
- Ridge: Shrinks all coefficients toward 0
- Lasso: Sets some coefficients exactly to 0 (feature selection)
- Ridge: Better when all features are relevant
- Lasso: Better when only some features are relevant

**Ridge Regression Derivation:**
L(β) = ||y - Xβ||² + λ||β||₂²
∇L/∂β = -2Xᵀ(y - Xβ) + 2λβ = 0
β̂_ridge = (XᵀX + λI)⁻¹Xᵀy

Notice: Ridge solution adds λ to diagonal of XᵀX, making it more stable!

**Regularization Code Example:**
\`\`\`python path=null start=null
import numpy as np
import matplotlib.pyplot as plt

def ridge_regression(X, y, lambda_reg):
    """
    Ridge regression with closed-form solution
    """
    X_with_intercept = np.column_stack([np.ones(X.shape[0]), X])
    n_features = X_with_intercept.shape[1]
    
    # Ridge solution: β̂ = (XᵀX + λI)⁻¹Xᵀy
    XtX = X_with_intercept.T @ X_with_intercept
    # Add regularization term to diagonal (except intercept)
    ridge_matrix = XtX + lambda_reg * np.eye(n_features)
    ridge_matrix[0, 0] -= lambda_reg  # Don't regularize intercept
    
    beta_ridge = np.linalg.solve(ridge_matrix, X_with_intercept.T @ y)
    return beta_ridge

def lasso_regression_subgradient(X, y, lambda_reg, learning_rate=0.01, max_iter=1000):
    """
    Lasso regression using subgradient descent
    """
    X_with_intercept = np.column_stack([np.ones(X.shape[0]), X])
    n_samples, n_features = X_with_intercept.shape
    
    # Initialize parameters
    beta = np.random.randn(n_features) * 0.01
    
    for i in range(max_iter):
        # Predictions
        y_pred = X_with_intercept @ beta
        
        # Gradient of squared loss
        grad_squared_loss = -2 * X_with_intercept.T @ (y - y_pred) / n_samples
        
        # Subgradient of L1 penalty (use sign function)
        grad_l1 = np.zeros_like(beta)
        grad_l1[1:] = np.sign(beta[1:])  # Don't regularize intercept
        
        # Total gradient (subgradient for L1)
        total_grad = grad_squared_loss + lambda_reg * grad_l1
        
        # Update parameters
        beta -= learning_rate * total_grad
    
    return beta

# Example: High-dimensional problem where regularization helps
np.random.seed(42)
n_samples, n_features = 50, 100  # More features than samples
X_reg = np.random.randn(n_samples, n_features)
# Only first 10 features are truly relevant
true_beta = np.zeros(n_features)
true_beta[:10] = np.random.randn(10)
y_reg = X_reg @ true_beta + 0.1 * np.random.randn(n_samples)

# Compare different regularization strengths
lambda_values = [0.01, 0.1, 1.0, 10.0]
results = {}

for lambda_val in lambda_values:
    beta_ridge = ridge_regression(X_reg, y_reg, lambda_val)
    beta_lasso = lasso_regression_subgradient(X_reg, y_reg, lambda_val)
    
    results[lambda_val] = {
        'ridge': beta_ridge,
        'lasso': beta_lasso
    }

# Plot coefficient paths
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))

for lambda_val in lambda_values:
    ax1.plot(results[lambda_val]['ridge'][1:], label=f'λ={lambda_val}', marker='o')
    ax2.plot(results[lambda_val]['lasso'][1:], label=f'λ={lambda_val}', marker='s')

ax1.set_title('Ridge Regression - Coefficient Paths')
ax1.set_xlabel('Feature Index')
ax1.set_ylabel('Coefficient Value')
ax1.legend()
ax1.grid(True, alpha=0.3)

ax2.set_title('Lasso Regression - Coefficient Paths')
ax2.set_xlabel('Feature Index')
ax2.set_ylabel('Coefficient Value')
ax2.legend()
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Show sparsity (number of non-zero coefficients) in Lasso
print("Lasso sparsity (number of non-zero coefficients):")
for lambda_val in lambda_values:
    non_zero = np.sum(np.abs(results[lambda_val]['lasso'][1:]) > 1e-4)
    print(f"  λ={lambda_val}: {non_zero} non-zero coefficients out of {n_features}")
\`\`\`

### 7. Model Selection & Cross-Validation

**The Model Selection Problem:**
- Too simple: Underfit (high bias)
- Too complex: Overfit (high variance)
- Need to balance bias and variance

**Cross-Validation Process:**
1. Split data into k folds
2. For each fold: train on (k-1) folds, test on remaining fold
3. Average performance across all folds

**Common CV Methods:**
- **k-fold CV**: Split into k equal parts
- **Leave-one-out CV**: k=n (each sample as validation set)
- **Stratified CV**: Preserves class distribution in folds

**Code for Cross-Validation:**
\`\`\`python path=null start=null
import numpy as np
from sklearn.model_selection import KFold

def cross_validate(model_fn, X, y, k=5):
    """
    Generic cross-validation function
    model_fn: function that takes (X_train, y_train, X_val, y_val) and returns metric
    """
    kf = KFold(n_splits=k, shuffle=True, random_state=42)
    scores = []
    
    for train_idx, val_idx in kf.split(X):
        X_train, X_val = X[train_idx], X[val_idx]
        y_train, y_val = y[train_idx], y[val_idx]
        
        score = model_fn(X_train, y_train, X_val, y_val)
        scores.append(score)
    
    return np.array(scores)

def linear_regression_cv(X, y, k=5):
    """
    Cross-validation for linear regression (returns R² scores)
    """
    def model_fn(X_train, y_train, X_val, y_val):
        # Add intercept to training data
        X_train_int = np.column_stack([np.ones(X_train.shape[0]), X_train])
        X_val_int = np.column_stack([np.ones(X_val.shape[0]), X_val])
        
        # Fit model
        XtX_inv = np.linalg.inv(X_train_int.T @ X_train_int + 1e-8 * np.eye(X_train_int.shape[1]))
        beta = XtX_inv @ X_train_int.T @ y_train
        
        # Predict
        y_pred = X_val_int @ beta
        
        # Calculate R²
        ss_res = np.sum((y_val - y_pred)**2)
        ss_tot = np.sum((y_val - np.mean(y_val))**2)
        r2 = 1 - (ss_res / ss_tot)
        
        return r2
    
    return cross_validate(model_fn, X, y, k)

# Example: Compare models with different polynomial degrees
def polynomial_features(X, degree):
    """Create polynomial features up to given degree"""
    X_poly = X
    for d in range(2, degree + 1):
        X_poly = np.column_stack([X_poly, X**d])
    return X_poly

# Generate non-linear data
np.random.seed(42)
X_cv = np.random.uniform(-2, 2, 50).reshape(-1, 1)
y_cv = 2 * X_cv.ravel()**2 - 1.5 * X_cv.ravel() + 0.5 + 0.5 * np.random.randn(50)

# Test different polynomial degrees
degrees = [1, 2, 3, 5, 7, 10]
cv_results = {}

for degree in degrees:
    X_poly = polynomial_features(X_cv, degree)
    r2_scores = linear_regression_cv(X_poly, y_cv, k=5)
    cv_results[degree] = {
        'mean_r2': r2_scores.mean(),
        'std_r2': r2_scores.std(),
        'scores': r2_scores
    }

# Plot results
plt.figure(figsize=(12, 6))
degrees_plot = list(cv_results.keys())
mean_scores = [cv_results[d]['mean_r2'] for d in degrees_plot]
std_scores = [cv_results[d]['std_r2'] for d in degrees_plot]

plt.errorbar(degrees_plot, mean_scores, yerr=std_scores, marker='o', capsize=5)
plt.xlabel('Polynomial Degree')
plt.ylabel('Cross-Validated R²')
plt.title('Model Complexity vs Performance')
plt.grid(True, alpha=0.3)
plt.show()

print("Cross-validation results:")
for degree, results in cv_results.items():
    print(f"  Degree {degree}: R² = {results['mean_r2']:.3f} ± {results['std_r2']:.3f}")
\`\`\`

### 8. Advanced Topics - Connection to Neural Networks

**Linear Models as Neural Network Building Blocks:**
- Single neuron = linear model + activation function
- Forward pass: z = wᵀx + b, a = σ(z)
- Multiple layers build complex representations

**From Linear Models to Deep Learning:**
1. Linear regression: y = wᵀx + b
2. Logistic regression: y = σ(wᵀx + b)  
3. Neural network: y = σ₂(W₂ · σ₁(W₁x + b₁) + b₂)

**Generalized Linear Models (GLMs):**
Extends linear models to exponential family distributions:
- Linear: Normal distribution (identity link)
- Logistic: Bernoulli distribution (logit link)  
- Poisson: Count data (log link)
- Probit: Bernoulli with Gaussian CDF link

**Kernel Methods:**
Extend linearity to non-linearity:
- Linear: y = wᵀx + b
- Kernel trick: y = Σᵢ αᵢK(xᵢ, x) + b
- Allows complex decision boundaries

**Neural Networks as Non-linear Basis Functions:**
- Linear models: y = Σⱼ wⱼφⱼ(x) where φⱼ are fixed basis functions
- Neural networks: y = Σⱼ wⱼφⱼ(x) where φⱼ are learned basis functions

**Code: Linear Model as Single Neuron:**
\`\`\`python path=null start=null
import numpy as np
import matplotlib.pyplot as plt

class LinearNeuron:
    """
    Single neuron = linear model with activation function
    """
    def __init__(self, n_features, activation='sigmoid'):
        self.n_features = n_features
        self.activation_name = activation
        
        # Initialize weights and bias
        self.weights = np.random.randn(n_features) * 0.5
        self.bias = 0.0
        
    def activation(self, z):
        if self.activation_name == 'sigmoid':
            return 1 / (1 + np.exp(-np.clip(z, -250, 250)))  # Numerically stable
        elif self.activation_name == 'linear':
            return z
        elif self.activation_name == 'relu':
            return np.maximum(0, z)
        else:
            raise ValueError(f"Unknown activation: {self.activation_name}")
    
    def forward(self, X):
        # Linear transformation
        z = X @ self.weights + self.bias
        # Apply activation
        return self.activation(z)
    
    def train(self, X, y, learning_rate=0.01, epochs=1000):
        """
        Train using gradient descent
        """
        losses = []
        
        for epoch in range(epochs):
            # Forward pass
            y_pred = self.forward(X)
            
            # Compute loss (MSE for regression, log-likelihood for classification)
            if self.activation_name in ['sigmoid', 'relu']:  # Treat as regression
                loss = np.mean((y - y_pred)**2)
            else:
                loss = np.mean((y - y_pred)**2)
            losses.append(loss)
            
            # Gradients
            if self.activation_name == 'sigmoid':
                # Derivative of sigmoid: σ'(z) = σ(z)(1-σ(z))
                activation_deriv = y_pred * (1 - y_pred)
            elif self.activation_name == 'relu':
                activation_deriv = (y_pred > 0).astype(float)
            else:  # linear
                activation_deriv = 1
            
            # Chain rule: dL/dw = dL/d_pred * d_pred/dz * d_z/dw
            d_output = (y_pred - y)  # Derivative of MSE
            d_z = d_output * activation_deriv
            
            # Gradients
            grad_weights = X.T @ d_z / len(X)
            grad_bias = np.mean(d_z)
            
            # Update parameters
            self.weights -= learning_rate * grad_weights
            self.bias -= learning_rate * grad_bias
            
            if epoch % 200 == 0:
                print(f"Epoch {epoch}, Loss: {loss:.6f}")
        
        return losses

# Compare different activation functions
np.random.seed(42)
X_neuron = np.random.randn(100, 2)
y_neuron = 2*X_neuron[:, 0] - 1.5*X_neuron[:, 1] + 0.1*np.random.randn(100)

activations = ['linear', 'sigmoid']
neurons = {}

for act in activations:
    neuron = LinearNeuron(n_features=2, activation=act)
    losses = neuron.train(X_neuron, y_neuron, learning_rate=0.01, epochs=1000)
    neurons[act] = {'neuron': neuron, 'losses': losses}
    
    print(f"\n{act.upper()} Neuron Final Weights: {neuron.weights}, Bias: {neuron.bias:.3f}")

# Plot training curves
plt.figure(figsize=(12, 5))
for act in activations:
    plt.plot(neurons[act]['losses'], label=f'{act.title()} Activation', alpha=0.8)

plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.title('Training Curves for Different Activations')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
\`\`\`

### 9. Practical Considerations

**Feature Scaling:**
- Standardize features for stable optimization
- Especially important for regularization
- Linear models are sensitive to feature scales

**Feature Engineering:**
- Polynomial features for non-linear relationships
- Interaction terms between features
- Log transformations for exponential relationships
- Domain-specific transformations

**Model Validation:**
- Always use train/validation/test splits
- Cross-validation for model selection
- Check for data leakage
- Monitor performance on new data

**Interpretability:**
- Linear models are inherently interpretable
- Coefficients indicate feature importance and direction
- Use with care in sensitive applications
- Consider fairness and bias in your features

### 10. Key Takeaways

- Linear models are the building blocks of more complex algorithms
- OLS provides closed-form solution for linear regression
- Logistic regression extends linearity to binary classification
- Regularization prevents overfitting by penalizing large coefficients
- Cross-validation helps select appropriate model complexity
- Neural networks are stacks of linear models with activation functions
- Statistical assumptions must be checked for valid inference
- Feature scaling and engineering are crucial for performance
- Linear models offer excellent interpretability
- Understanding linear models is essential for AI engineering

---

## TL;DR - Quick Recall

**One-liner for each concept:**

| Concept | Key Takeaway |
|:--------|:-------------|
| **Linear Regression** | y = Xβ + ε; predict continuous values |
| **OLS Solution** | β̂ = (XᵀX)⁻¹Xᵀy - closed-form, minimizes squared error |
| **Logistic Regression** | P(y=1) = σ(Xβ); classification via sigmoid function |
| **Multicollinearity** | VIF > 5 = features are too correlated; drop one |
| **Ridge (L2)** | Add λ\\|\\|β\\|\\|² penalty; shrinks coefficients toward 0 |
| **Lasso (L1)** | Add λ\\|\\|β\\|\\|₁ penalty; can set coefficients exactly to 0 |
| **Elastic Net** | L1 + L2 combined; best of both worlds |
| **Overfitting** | Model too complex; use regularization or cross-validation |
| **Cross-Validation** | k-fold CV to estimate generalization performance |
| **Residuals** | y - ŷ; should be random with no pattern |

**Essential Formulas:**

| Formula | Use |
|:--------|:----|
| β̂ = (XᵀX)⁻¹Xᵀy | OLS solution |
| β̂_ridge = (XᵀX + λI)⁻¹Xᵀy | Ridge regression |
| σ(z) = 1/(1 + e⁻ᶻ) | Sigmoid function |
| R² = 1 - RSS/TSS | Coefficient of determination |

**Quick Code:**

\`\`\`python path=null start=null
# Linear regression (OLS)
beta = np.linalg.inv(X.T @ X) @ X.T @ y

# Ridge regression
beta_ridge = np.linalg.inv(X.T @ X + lambda_reg * np.eye(p)) @ X.T @ y

# Logistic sigmoid
sigmoid = lambda z: 1 / (1 + np.exp(-z))

# R-squared
r2 = 1 - np.sum((y - y_pred)**2) / np.sum((y - y.mean())**2)
\`\`\`

**The Linear Models Mantra:**
> "Start simple, add complexity only when needed."

---

## Additional Resources

**Textbooks:**
- "The Elements of Statistical Learning" by Hastie, Tibshirani, and Friedman - Comprehensive treatment
- "Introduction to Statistical Learning" by James, Witten, Hastie, and Tibshirani - More accessible
- "Pattern Recognition and Machine Learning" by Bishop - Bayesian perspective

**Courses:**
- [Stanford CS229 - Linear Models](https://cs229.stanford.edu/) - Lecture notes and assignments
- [MIT 18.650 Statistics for Applications](https://ocw.mit.edu/courses/mathematics/18-650-statistics-for-applications-fall-2016/) - Theoretical foundation
- [Andrew Ng's ML Course](https://www.coursera.org/learn/machine-learning) - Practical implementation

**Interactive Tutorials:**
- [Scikit-learn Linear Models Guide](https://scikit-learn.org/stable/modules/linear_model.html) - Implementation focus
- [Khan Academy Linear Regression](https://www.khanacademy.org/math/statistics-probability/describing-relationships-quantitative-data) - Visual explanations
- [StatQuest Linear Regression](https://www.youtube.com/watch?v=nk2CQITm_eo) - Clear explanation of concepts

**Advanced Topics:**
- [Generalized Linear Models](https://glm-tools.github.io/pyglmnet/) - Python implementation
- [Regularization Paths](https://web.stanford.edu/~hastie/glmnet/glmnet_alpha.html) - Advanced regularization
- [Bayesian Linear Regression](https://bayesiancomputationbook.com/markdown/ch_reg.html) - Probabilistic approach

**Practice:**
- [Kaggle Learn Linear Regression](https://www.kaggle.com/learn/intro-to-machine-learning) - Hands-on exercises
- [UCI Machine Learning Repository](https://archive.ics.uci.edu/ml/) - Datasets for practice
- [Cross Validated](https://stats.stackexchange.com/) - Statistics Q&A
    `,
  subModules: [],
  practiceQuiz: [
    {
      id: "lm-q1",
      question: "In linear regression y = wx + b, what does 'b' represent?",
      options: ["Slope", "Weight", "Bias/Intercept", "Learning rate"],
      correctAnswer: 2,
      explanation:
        "y = wx + b:\n\n• w = weight/slope (how much y changes per unit x)\n• b = bias/intercept (y value when x = 0)\n\nThe line crosses the y-axis at point (0, b).",
      difficulty: "easy",
    },
    {
      id: "lm-q2",
      question: "Mean Squared Error (MSE) formula is:",
      options: [
        "Σ|yᵢ - ŷᵢ|/n",
        "Σ(yᵢ - ŷᵢ)²/n",
        "Σ(yᵢ - ŷᵢ)/n",
        "max(yᵢ - ŷᵢ)",
      ],
      correctAnswer: 1,
      explanation:
        "MSE = (1/n) × Σ(yᵢ - ŷᵢ)²\n\nWhy squared?\n• Removes negative signs\n• Penalizes large errors more\n• Mathematically differentiable (for gradient descent)\n\nRMSE = √MSE for same units as y.",
      difficulty: "easy",
    },
    {
      id: "lm-q3",
      question: "Logistic regression outputs:",
      options: [
        "Any real number",
        "Probability between 0 and 1",
        "Only 0 or 1",
        "Integer class label",
      ],
      correctAnswer: 1,
      explanation:
        "Logistic regression uses sigmoid: σ(z) = 1/(1 + e^(-z))\n\nOutput is probability P(y=1|x):\n• Always between 0 and 1\n• Threshold (usually 0.5) converts to class\n\nUnlike linear regression which outputs any real number.",
      difficulty: "easy",
    },
    {
      id: "lm-q4",
      question: "L2 regularization adds what to the loss function?",
      options: ["λ × Σ|wᵢ|", "λ × Σwᵢ²", "λ × Σwᵢ", "λ × max(wᵢ)"],
      correctAnswer: 1,
      explanation:
        "L2 (Ridge) Regularization: Loss + λ × Σwᵢ²\n\n• Penalizes large weights\n• Prevents overfitting\n• λ controls regularization strength\n\nL1 (Lasso) uses Σ|wᵢ| instead, which can zero out weights.",
      difficulty: "medium",
    },
    {
      id: "lm-q5",
      question: "Gradient descent updates weights using:",
      options: ["w = w + α∇L", "w = w - α∇L", "w = w × α∇L", "w = w / α∇L"],
      correctAnswer: 1,
      explanation:
        "Update rule: w = w - α × ∇L\n\n• α = learning rate (step size)\n• ∇L = gradient of loss (direction of steepest increase)\n• Subtract because we want to minimize loss\n\nMove opposite to gradient direction to decrease loss.",
      difficulty: "easy",
    },
    {
      id: "lm-q6",
      question: "Cross-entropy loss is typically used for:",
      options: [
        "Regression",
        "Classification",
        "Clustering",
        "Dimensionality reduction",
      ],
      correctAnswer: 1,
      explanation:
        "Loss functions by task:\n\n• Regression: MSE, MAE\n• Classification: Cross-Entropy (Log Loss)\n\nCross-entropy measures difference between predicted probabilities and true labels.",
      difficulty: "easy",
    },
    {
      id: "lm-q7",
      question: "Overfitting occurs when:",
      options: [
        "Train error high, test error high",
        "Train error low, test error low",
        "Train error low, test error high",
        "Train error high, test error low",
      ],
      correctAnswer: 2,
      explanation:
        "Overfitting symptoms:\n\n• Model memorizes training data\n• Low training error\n• High test/validation error\n\nSolution: More data, regularization, simpler model, dropout",
      difficulty: "easy",
    },
    {
      id: "lm-q8",
      question: "Sigmoid function outputs values in range:",
      options: ["(-∞, +∞)", "(-1, 1)", "(0, 1)", "[0, +∞)"],
      correctAnswer: 2,
      explanation:
        "Sigmoid: σ(x) = 1 / (1 + e^(-x))\n\n• As x → -∞, σ(x) → 0\n• As x → +∞, σ(x) → 1\n• Always between 0 and 1\n\nPerfect for probabilities!",
      difficulty: "easy",
    },
    {
      id: "lm-q9",
      question:
        "In k-fold cross-validation with k=5, what fraction of data is used for testing in each fold?",
      options: ["1/5 = 20%", "4/5 = 80%", "1/2 = 50%", "1/10 = 10%"],
      correctAnswer: 0,
      explanation:
        "k-fold CV:\n\n• Data split into k equal parts\n• Each fold: 1 part for test, k-1 for train\n• k=5: Each fold uses 20% test, 80% train\n\nAll data gets tested exactly once.",
      difficulty: "easy",
    },
    {
      id: "lm-q10",
      question: "Which regularization can zero out coefficients?",
      options: ["L1 (Lasso)", "L2 (Ridge)", "Both equally", "Neither"],
      correctAnswer: 0,
      explanation:
        "L1 vs L2:\n\n• L1 (Lasso): Can make weights exactly 0 (sparse)\n• L2 (Ridge): Shrinks weights but rarely zeros them\n\nL1 is used for feature selection because it removes irrelevant features.",
      difficulty: "medium",
    },
  ],
};
