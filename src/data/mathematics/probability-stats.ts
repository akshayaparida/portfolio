import { LearningModule } from '@/types/learning';

export const probabilityStatsModule: LearningModule = {
    id: 'probability-stats',
    title: 'Probability & Statistics',
    description: 'Uncertainty and inference - foundation of machine learning',
    status: 'in-progress',
    detailedContent: `# Probability & Statistics for AI Engineers

Probability and statistics form the foundation of machine learning. Every algorithm deals with uncertainty, noise, and inference from limited data. This module covers essential concepts for AI engineers.

## Math Notation & Pronunciation Guide

Before we dive in, let&apos;s decode the symbols you&apos;ll see:

**Probability:**
- P(A) - pronounced "probability of A" - probability of event A
- P(A|B) - pronounced "probability of A given B" - conditional probability
- A ⊥ B - pronounced "A independent of B" - A and B are independent
- ~ - pronounced "distributed as" - follows a distribution

**Random Variables:**
- X, Y - random variables (upper case)
- x, y - specific values (lower case)
- X ~ N(μ, σ²) - "X is distributed as Normal with mean μ and variance σ²"

**Statistics:**
- x̄ - pronounced "x bar" - sample mean
- σ² - pronounced "sigma squared" - variance
- μ - pronounced "mu" - population mean
- ρ² - pronounced "chi squared" - chi-squared distribution

**Greek Letters:**
- α (alpha) - significance level, learning rate
- β (beta) - regression coefficients, Type II error rate
- λ (lambda) - regularization parameter, Poisson rate
- θ (theta) - generic parameter
- σ (sigma) - standard deviation
- ρ (chi) - chi in chi-squared

**Special Symbols:**
- ∈ - pronounced "element of" or "in" - set membership
- ∑ - pronounced "sum" - summation
- ∫ - pronounced "integral" - continuous sum
- ∝ - pronounced "proportional to"
- ≈ - pronounced "approximately equal"
- ≠ - pronounced "not equal to"
- ≥, ≤ - pronounced "greater/less than or equal to"

## Key Jargon Definitions

- **Random Variable**: A variable whose value depends on outcomes of random phenomena
- **Probability Distribution**: Function describing likelihood of different outcomes
- **Conditional Probability**: Probability of A given that B has occurred: P(A|B)
- **Independence**: Two events don't affect each other's probability
- **Expected Value**: Long-run average value of a random variable
- **Variance**: Measure of how spread out values are
- **Standard Deviation**: Square root of variance
- **Covariance**: Measure of how two variables change together
- **Correlation**: Normalized measure of linear relationship (-1 to +1)
- **Bayes' Theorem**: Formula to update beliefs based on evidence
- **Maximum Likelihood**: Method to estimate parameters that make data most likely
- **Central Limit Theorem**: Sample means approach normal distribution
- **Confidence Interval**: Range where true parameter likely lies
- **p-value**: Probability of observing data if null hypothesis is true
- **Significance Level (α)**: Threshold for rejecting null hypothesis

## Why Probability & Statistics Matter

In AI, we constantly deal with:
- **Uncertainty**: Noise in data, incomplete information
- **Inference**: Drawing conclusions from limited samples
- **Decision Making**: Choosing actions with uncertain outcomes
- **Model Evaluation**: Assessing if results are meaningful
- **Risk Assessment**: Understanding potential errors

## What You&apos;ll Master

### 1. Probability Fundamentals

**Sample Space (S)**: Set of all possible outcomes
Example: For dice roll, S = {1, 2, 3, 4, 5, 6}

**Events**: Subsets of sample space
Example: Even number event E = {2, 4, 6}

**Probability Axioms:**
1. 0 ≤ P(A) ≤ 1 for any event A
2. P(S) = 1 (something must happen)
3. P(A ∪ B) = P(A) + P(B) if A and B are mutually exclusive

**Example Calculation:**
What's the probability of rolling an even number on a fair die?
- S = {1, 2, 3, 4, 5, 6}
- E = {2, 4, 6}
- P(E) = |E|/|S| = 3/6 = 0.5

**Code Example:**
\`\`\`python path=null start=null
import numpy as np
from scipy import stats

# Simulate rolling a fair die 1000 times
rolls = np.random.randint(1, 7, size=1000)
even_count = np.sum(rolls % 2 == 0)
empirical_prob = even_count / len(rolls)

print(f"Empirical probability: {empirical_prob:.3f}")
print(f"Theoretical probability: 0.500")
\`\`\`

### 2. Conditional Probability & Bayes' Theorem

**Conditional Probability:**
P(A|B) = P(A ∩ B) / P(B)

Read as "probability of A given B equals probability of both A and B divided by probability of B"

**Example:** Medical testing
- Disease D affects 1% of population: P(D) = 0.01
- Test is 95% accurate if you have disease: P(T+|D) = 0.95
- Test gives false positive 10% of time: P(T+|¬D) = 0.10

What's probability you have disease if test is positive?

**Bayes' Theorem:**
P(D|T+) = P(T+|D) × P(D) / P(T+)

Where P(T+) = P(T+|D)×P(D) + P(T+|¬D)×P(¬D)
P(T+) = 0.95×0.01 + 0.10×0.99 = 0.0095 + 0.099 = 0.1085

So: P(D|T+) = (0.95 × 0.01) / 0.1085 = 0.0876

**Bayes' Theorem Code:**
\`\`\`python path=null start=null
def bayes_theorem(likelihood, prior, marginal_likelihood):
    """
    Calculate posterior probability using Bayes' theorem
    P(H|D) = P(D|H) * P(H) / P(D)
    """
    return (likelihood * prior) / marginal_likelihood

# Medical testing example
prior_disease = 0.01  # P(D)
likelihood_test_given_disease = 0.95  # P(T+|D)
false_positive_rate = 0.10  # P(T+|¬D)

# Calculate P(T+)
marginal_likelihood = (likelihood_test_given_disease * prior_disease + 
                      false_positive_rate * (1 - prior_disease))

posterior_disease = bayes_theorem(likelihood_test_given_disease, 
                                 prior_disease, 
                                 marginal_likelihood)

print(f"Posterior probability of disease: {posterior_disease:.3f}")
\`\`\`

**Chain Rule of Probability:**
P(A, B) = P(A|B) × P(B)
P(A, B, C) = P(A|B,C) × P(B|C) × P(C)

Useful for breaking down complex joint probabilities.

### 3. Probability Distributions

**Discrete Distributions:**
For countable outcomes (integers).

**Bernoulli Distribution:** Single trial with success probability p
- X ~ Bernoulli(p)
- P(X=1) = p, P(X=0) = 1-p
- E[X] = p, Var(X) = p(1-p)

**Binomial Distribution:** Number of successes in n independent Bernoulli trials
- X ~ Binomial(n, p)  
- P(X=k) = C(n,k) × p^k × (1-p)^(n-k)
- E[X] = np, Var(X) = np(1-p)

**Poisson Distribution:** Number of events in fixed time period
- X ~ Poisson(λ) where λ is rate parameter
- P(X=k) = (λ^k × e^(-λ)) / k!
- E[X] = λ, Var(X) = λ

**Code Example - Discrete Distributions:**
\`\`\`python path=null start=null
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

# Parameters
n = 10  # number of trials
p = 0.3  # success probability
λ = 2.5  # Poisson rate

# Generate samples
n_samples = 10000
binomial_samples = np.random.binomial(n, p, n_samples)
poisson_samples = np.random.poisson(λ, n_samples)

# Plot histograms
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

ax1.hist(binomial_samples, bins=np.arange(0, n+2)-0.5, density=True, alpha=0.7)
ax1.set_title(f'Binomial Distribution (n={n}, p={p})')
ax1.set_xlabel('Number of Successes')
ax1.set_ylabel('Probability')

ax2.hist(poisson_samples, bins=np.arange(0, max(poisson_samples)+2)-0.5, density=True, alpha=0.7)
ax2.set_title(f'Poisson Distribution (λ={λ})')
ax2.set_xlabel('Number of Events')
ax2.set_ylabel('Probability')

plt.tight_layout()
plt.show()

# Theoretical vs Empirical means
print(f"Binomial: Theoretical E[X] = {n*p}, Empirical E[X] = {binomial_samples.mean():.2f}")
print(f"Poisson: Theoretical E[X] = {λ}, Empirical E[X] = {poisson_samples.mean():.2f}")
\`\`\`

**Continuous Distributions:**
For uncountable outcomes (real numbers).

**Uniform Distribution:** All values in range equally likely
- X ~ Uniform(a, b)
- f(x) = 1/(b-a) for a ≤ x ≤ b
- E[X] = (a+b)/2, Var(X) = (b-a)²/12

**Normal (Gaussian) Distribution:** Bell curve
- X ~ N(μ, σ²)
- f(x) = (1/√(2πσ²)) × exp(-½((x-μ)/σ)²)
- E[X] = μ, Var(X) = σ²

**Exponential Distribution:** Time between events in Poisson process
- X ~ Exponential(λ)
- f(x) = λe^(-λx) for x ≥ 0
- E[X] = 1/λ, Var(X) = 1/λ²

**Normal Distribution Code:**
\`\`\`python path=null start=null
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

# Parameters for normal distribution
μ = 5  # mean
σ = 2  # standard deviation

# Generate samples
n_samples = 10000
normal_samples = np.random.normal(μ, σ, n_samples)

# Plot histogram with theoretical curve
x = np.linspace(μ - 4*σ, μ + 4*σ, 1000)
theoretical_pdf = stats.norm.pdf(x, μ, σ)

plt.figure(figsize=(10, 6))
plt.hist(normal_samples, bins=100, density=True, alpha=0.7, label='Empirical')
plt.plot(x, theoretical_pdf, 'r-', linewidth=2, label='Theoretical')
plt.title(f'Normal Distribution (μ={μ}, σ²={σ**2})')
plt.xlabel('Value')
plt.ylabel('Density')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()

print(f"Theoretical mean: {μ}, Empirical mean: {normal_samples.mean():.2f}")
print(f"Theoretical variance: {σ**2}, Empirical variance: {normal_samples.var():.2f}")
\`\`\`

### 4. Joint, Marginal, and Conditional Distributions

**Joint Distribution:** P(X, Y) - probability of both X and Y occurring
**Marginal Distribution:** P(X) = Σ_y P(X, y) - probability of X regardless of Y
**Conditional Distribution:** P(X|Y) = P(X, Y) / P(Y) - probability of X given Y

**Independence:** X and Y are independent if P(X, Y) = P(X) × P(Y)
This means P(X|Y) = P(X) - knowing Y doesn't change probability of X.

**Covariance:**
Cov(X, Y) = E[(X - μₓ)(Y - μᵧ)] = E[XY] - E[X]E[Y]

Measures linear relationship:
- Positive: Variables tend to increase together
- Negative: Variables move in opposite directions
- Zero: No linear relationship (doesn't mean independent!)

**Correlation Coefficient:**
ρ = Cov(X, Y) / (σₓ × σᵧ)

Normalized covariance between -1 and +1:
- +1: Perfect positive linear relationship
- 0: No linear relationship
- -1: Perfect negative linear relationship

**Code Example - Covariance and Correlation:**
\`\`\`python path=null start=null
import numpy as np
import matplotlib.pyplot as plt

# Generate correlated data
n = 1000
mean = [0, 0]
cov = [[1, 0.8], [0.8, 1]]  # Correlation of 0.8
data = np.random.multivariate_normal(mean, cov, n)

X, Y = data[:, 0], data[:, 1]

# Calculate covariance and correlation
sample_cov = np.cov(X, Y)[0, 1]
sample_corr = np.corrcoef(X, Y)[0, 1]

print(f"Sample covariance: {sample_cov:.3f}")
print(f"Sample correlation: {sample_corr:.3f}")
print(f"True correlation: 0.800")

# Plot the data
plt.figure(figsize=(8, 6))
plt.scatter(X, Y, alpha=0.5)
plt.xlabel('X')
plt.ylabel('Y')
plt.title(f'Scatter Plot (ρ = {sample_corr:.3f})')
plt.grid(True, alpha=0.3)
plt.show()
\`\`\`

### 5. Bayes' Theorem Applications

**Bayesian Inference:**
P(Parameter | Data) = P(Data | Parameter) × P(Parameter) / P(Data)

- Prior: P(Parameter) - beliefs before seeing data
- Likelihood: P(Data | Parameter) - probability of data given parameter
- Posterior: P(Parameter | Data) - updated beliefs after seeing data

**Conjugate Priors:** Mathematical convenience where posterior has same form as prior
- Beta prior + Binomial likelihood → Beta posterior
- Normal prior + Normal likelihood → Normal posterior

**Example: Updating beliefs about coin fairness**
- Prior belief: Coin is fair (Beta(10,10))
- Observe: 70 heads out of 100 flips
- Posterior: Updated belief about bias

**Bayesian Updating Code:**
\`\`\`python path=null start=null
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

# Prior: Beta(10, 10) - slightly favors fair coin
a_prior, b_prior = 10, 10

# Data: 70 heads, 30 tails
heads, tails = 70, 30

# Posterior: Beta(a + heads, b + tails)
a_posterior = a_prior + heads
b_posterior = b_prior + tails

# Plot prior vs posterior
θ = np.linspace(0, 1, 1000)
prior = stats.beta.pdf(θ, a_prior, b_prior)
posterior = stats.beta.pdf(θ, a_posterior, b_posterior)

plt.figure(figsize=(10, 6))
plt.plot(θ, prior, label=f'Prior: Beta({a_prior}, {b_prior})', linewidth=2)
plt.plot(θ, posterior, label=f'Posterior: Beta({a_posterior}, {b_posterior})', linewidth=2)
plt.xlabel('Coin Bias (θ)')
plt.ylabel('Density')
plt.title('Bayesian Updating: Prior vs Posterior')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()

print(f"Prior mean: {a_prior / (a_prior + b_prior):.3f}")
print(f"Posterior mean: {a_posterior / (a_posterior + b_posterior):.3f}")
print(f"Data proportion: {heads / (heads + tails):.3f}")
\`\`\`

### 6. Central Limit Theorem (CLT)

**Theorem Statement:**
For independent and identically distributed random variables X₁, X₂, ..., Xₙ with mean μ and variance σ²:

As n → ∞: (X̄ - μ) / (σ/√n) ~ N(0, 1)

In other words, sample mean approaches normal distribution as sample size increases.

**Why CLT is Important for AI:**
- Justifies normal approximations even when population isn't normal
- Foundation for confidence intervals and hypothesis tests
- Explains why many statistics are approximately normal

**CLT Demonstration Code:**
\`\`\`python path=null start=null
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

# Distribution to sample from (non-normal)
def sample_distribution():
    # Mixture of two normals - definitely not normal
    if np.random.random() < 0.5:
        return np.random.normal(0, 1)
    else:
        return np.random.normal(3, 1.5)

# Sample means of different sample sizes
sample_sizes = [1, 5, 30, 100]
n_samples = 10000

fig, axes = plt.subplots(2, 2, figsize=(12, 10))
axes = axes.ravel()

for i, n in enumerate(sample_sizes):
    sample_means = []
    for _ in range(n_samples):
        sample = [sample_distribution() for _ in range(n)]
        sample_means.append(np.mean(sample))
    
    axes[i].hist(sample_means, bins=100, density=True, alpha=0.7)
    axes[i].set_title(f'Sample size n={n}')
    axes[i].set_xlabel('Sample Mean')
    axes[i].set_ylabel('Density')
    axes[i].grid(True, alpha=0.3)

    # Overlay normal approximation for large n
    if n >= 30:
        mean_sample_means = np.mean(sample_means)
        std_sample_means = np.std(sample_means)
        x = np.linspace(np.min(sample_means), np.max(sample_means), 200)
        normal_approx = stats.norm.pdf(x, mean_sample_means, std_sample_means)
        axes[i].plot(x, normal_approx, 'r-', linewidth=2, label='Normal Approximation')
        axes[i].legend()

plt.tight_layout()
plt.show()
\`\`\`

### 7. Statistical Inference

**Point Estimation:** Single value estimate of parameter
- Sample mean x̄ estimates population mean μ
- Sample variance s² estimates population variance σ²

**Properties of Good Estimators:**
- Unbiased: E[estimate] = true parameter
- Consistent: Gets closer to true value as sample size increases
- Efficient: Has lowest possible variance among unbiased estimators

**Confidence Intervals:** Range where true parameter likely lies
- 95% CI means interval contains true value 95% of the time
- For normal distribution: x̄ ± 1.96 × (σ/√n)

**Hypothesis Testing:**
- Null hypothesis (H₀): Default assumption (often "no effect")
- Alternative hypothesis (H₁): What we want to prove
- p-value: Probability of seeing data or more extreme if H₀ is true
- If p-value < α (significance level), reject H₀

**Common Tests:**
- t-test: Compare means when variance unknown
- Chi-squared test: Compare categorical variables
- ANOVA: Compare means of multiple groups

**Hypothesis Testing Code:**
\`\`\`python path=null start=null
import numpy as np
from scipy import stats

# Example: A/B test for conversion rates
# A: control, B: treatment
n_A = 1000
n_B = 1000
conversions_A = 120  # 12% conversion
conversions_B = 145  # 14.5% conversion

p_A = conversions_A / n_A
p_B = conversions_B / n_B

# Two-proportion z-test
p_pooled = (conversions_A + conversions_B) / (n_A + n_B)
se = np.sqrt(p_pooled * (1 - p_pooled) * (1/n_A + 1/n_B))
z_stat = (p_B - p_A) / se
p_value = 2 * (1 - stats.norm.cdf(abs(z_stat)))  # Two-tailed test

print(f"Conversion rate A: {p_A:.3f}")
print(f"Conversion rate B: {p_B:.3f}")
print(f"Difference: {p_B - p_A:.3f}")
print(f"Z-statistic: {z_stat:.3f}")
print(f"P-value: {p_value:.3f}")

if p_value < 0.05:
    print("Result is statistically significant (reject H₀)")
else:
    print("Result is not statistically significant (fail to reject H₀)")
\`\`\`

### 8. Maximum Likelihood Estimation (MLE)

**Core Idea:** Choose parameters that make observed data most probable

For data x₁, x₂, ..., xₙ with parameter θ:
- Likelihood: L(θ) = P(data | θ) = ∏ᵢ P(xᵢ | θ)
- Log-likelihood: l(θ) = Σᵢ log P(xᵢ | θ)
- MLE: θ̂ = argmax_θ l(θ)

**Example: MLE for normal distribution**
X₁, X₂, ..., Xₙ ~ N(μ, σ²)

Log-likelihood: l(μ, σ²) = -n/2 log(2πσ²) - Σᵢ(xᵢ-μ)²/(2σ²)

MLE estimates:
- μ̂ = x̄ (sample mean)
- σ̂² = (1/n) Σᵢ(xᵢ-x̄)² (biased sample variance)

**MLE Code Example:**
\`\`\`python path=null start=null
import numpy as np
from scipy.optimize import minimize

# Generate data from normal distribution
np.random.seed(42)
true_mean = 5
true_var = 2
data = np.random.normal(true_mean, np.sqrt(true_var), 100)

# Log-likelihood function for normal distribution
def neg_log_likelihood(params, data):
    mu, var = params
    if var <= 0:  # Ensure positive variance
        return np.inf
    
    n = len(data)
    log_likelihood = -n/2 * np.log(2*np.pi*var) - np.sum((data - mu)**2) / (2*var)
    return -log_likelihood  # Minimize negative = maximize positive

# Find MLE
result = minimize(neg_log_likelihood, x0=[0, 1], args=(data,), method='BFGS')
mle_mean, mle_var = result.x

print(f"True mean: {true_mean}, MLE mean: {mle_mean:.3f}")
print(f"True variance: {true_var}, MLE variance: {mle_var:.3f}")
print(f"Sample mean: {np.mean(data):.3f}, Sample var: {np.var(data):.3f}")
\`\`\`

### 9. Statistical Modeling for Machine Learning

**Linear Regression:** Model relationship between variables
Y = β₀ + β₁X + ε, where ε ~ N(0, σ²)

From probabilistic perspective: P(Y|X) ~ N(β₀ + β₁X, σ²)

**Logistic Regression:** For binary classification
P(Y=1|X) = σ(β₀ + β₁X), where σ is sigmoid function

**Maximum Likelihood Interpretation:**
Linear regression minimizes sum of squared errors (MLE with Gaussian noise)
Logistic regression maximizes data likelihood (MLE with Bernoulli output)

**Regularization from Bayesian Perspective:**
- Ridge regression = Maximum a posteriori (MAP) with Gaussian prior on weights
- Lasso regression = MAP with Laplace prior on weights

**Model Evaluation:**
- AIC/BIC: Trade off model fit with complexity
- Cross-validation: Estimate performance on new data
- Likelihood ratio tests: Compare nested models

**Regression Code Example:**
\`\`\`python path=null start=null
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

# Generate data with linear relationship + noise
np.random.seed(42)
n = 100
true_slope = 2.5
true_intercept = 1
x = np.random.uniform(0, 10, n)
y = true_slope * x + true_intercept + np.random.normal(0, 2, n)

# Simple linear regression (MLE solution)
x_mean = np.mean(x)
y_mean = np.mean(y)
slope_mle = np.sum((x - x_mean) * (y - y_mean)) / np.sum((x - x_mean)**2)
intercept_mle = y_mean - slope_mle * x_mean

# Predictions
y_pred = slope_mle * x + intercept_mle
mse = np.mean((y - y_pred)**2)

print(f"True slope: {true_slope}, MLE slope: {slope_mle:.3f}")
print(f"True intercept: {true_intercept}, MLE intercept: {intercept_mle:.3f}")
print(f"Mean squared error: {mse:.3f}")

# Plot results
plt.figure(figsize=(10, 6))
plt.scatter(x, y, alpha=0.6, label='Data')
plt.plot(x, y_pred, 'r-', linewidth=2, label='MLE Fit')
plt.plot(x, true_slope * x + true_intercept, 'g--', linewidth=2, label='True Relationship')
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Linear Regression - Maximum Likelihood Estimation')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
\`\`\`

### 10. Common Statistical Pitfalls

**P-hacking:** Trying multiple analyses until finding significant result
- Solution: Pre-specify hypotheses and analysis plan
- Solution: Adjust for multiple comparisons

**Overfitting:** Model fits training data too well
- Solution: Cross-validation, regularization, hold-out test set
- Solution: Occam's razor - prefer simpler models

**Confusing Correlation with Causation**
- Correlation doesn't imply causation
- Look for confounding variables
- Use randomized experiments when possible

**Sample Size Issues**
- Too small: High variance, low power
- Too large: Detect trivial differences as "significant"
- Use power analysis to choose appropriate sample size

**Non-independent Data**
- Many statistical methods assume independence
- Spatial/temporal correlation requires special methods
- Cluster sampling affects variance estimates

**Gambler's Fallacy:** Believing random events are "due"
- Each coin flip is independent (if fair)
- Past results don't affect future outcomes

### 11. Key Takeaways

- Probability quantifies uncertainty in data and models
- Bayes' theorem updates beliefs based on evidence
- Distributions model different types of random phenomena
- Statistical inference draws conclusions from limited data
- Central Limit Theorem justifies many normal approximations
- Maximum Likelihood finds parameters that maximize data probability
- Statistical thinking is crucial for AI model evaluation
- Avoid common pitfalls like p-hacking and confusing correlation with causation

---

## TL;DR - Quick Recall

**One-liner for each concept:**

| Concept | Key Takeaway |
|:--------|:-------------|
| **Probability** | P(A) = favorable outcomes / total outcomes |
| **Conditional** | P(A\\|B) = probability of A given B occurred |
| **Bayes' Theorem** | P(H\\|D) = P(D\\|H)×P(H) / P(D) - update beliefs with evidence |
| **Normal Dist** | Bell curve, 68% within 1σ, 95% within 2σ |
| **Expected Value** | Long-run average: E[X] = Σ x·P(X=x) |
| **Variance** | Spread: Var(X) = E[(X-μ)²] |
| **Covariance** | How variables move together (sign matters) |
| **Correlation** | Normalized covariance: -1 to +1 |
| **CLT** | Sample means → normal as n → ∞ |
| **MLE** | Find θ that maximizes P(data\\|θ) |
| **p-value** | Probability of data if null is true; < 0.05 = significant |
| **CI** | 95% CI = we're 95% confident true value is in range |

**Essential Formulas:**

| Formula | Use |
|:--------|:----|
| P(A\\|B) = P(A∩B)/P(B) | Conditional probability |
| Bayes: P(H\\|D) ∝ P(D\\|H)×P(H) | Update prior with data |
| ρ = Cov(X,Y)/(σₓσᵧ) | Correlation coefficient |
| CI: x̄ ± 1.96×(σ/√n) | 95% confidence interval |

**Quick Code:**

\`\`\`python path=null start=null
# Probability basics
from scipy import stats
stats.binom.pmf(k, n, p)        # Binomial probability
stats.norm.pdf(x, mu, sigma)    # Normal density

# Statistical tests
stats.ttest_ind(group1, group2)  # t-test
np.corrcoef(x, y)[0,1]           # Correlation

# Bayesian update
posterior = (likelihood * prior) / marginal
\`\`\`

**The Statistics Mantra:**
> "All models are wrong, but some are useful." - George Box

---

## Additional Resources

**Textbooks:**
- "All of Statistics" by Larry Wasserman - Comprehensive mathematical statistics
- "Pattern Recognition and Machine Learning" by Christopher Bishop - Statistical ML focus
- "Think Stats" by Allen Downey - Statistics for programmers using Python

**Online Courses:**
- [MIT 18.05 Introduction to Probability and Statistics](https://ocw.mit.edu/courses/mathematics/18-05-introduction-to-probability-and-statistics-spring-2014/)
- [Khan Academy Statistics](https://www.khanacademy.org/math/statistics-probability) - Interactive lessons
- [StatQuest with Josh Starmer](https://www.youtube.com/c/joshstarmer) - YouTube channel with clear explanations

**Interactive Tools:**
- [Seeing Theory](https://students.brown.edu/seeing-theory/) - Visual explanations of statistics concepts
- [Distribution Fitting Tool](https://keisan.casio.com/exec/system/1180573188) - Interactive distribution calculator
- [Stat Trek](https://stattrek.com/) - Statistics tutorial with calculators

**Advanced Topics:**
- [Bayesian Statistics](https://www.coursera.org/learn/bayesian-statistics) - Coursera course
- [Statistical Learning](https://www.statlearning.com/) - Book with R labs
- [Probability Cheatsheet](https://static1.squarespace.com/static/54bf3241e4b0f0d81bf7ff12/t/55e9494fe4b011aed10e48e5/1441352015247/probability_cheatsheet.pdf) - Comprehensive reference

**Practice:**
- [Kaggle Learn](https://www.kaggle.com/learn) - Statistics and probability courses
- [OpenIntro Statistics](https://www.openintro.org/book/os/) - Free textbook with exercises
- [Cross Validated](https://stats.stackexchange.com/) - Statistics Q&A community
    `,
    subModules: []
};