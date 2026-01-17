import { LearningModule } from "@/types/learning";

export const dataExplorationModule: LearningModule = {
  id: "data-exploration",
  title: "Data Exploration & EDA",
  description:
    "Understanding your data before building pipelines - the foundation of reliable ML systems",
  status: "in-progress",
  detailedContent: `# Data Exploration for Machine Learning

Exploratory Data Analysis (EDA) is the critical first step in any ML project. Before writing preprocessing code or training models, you need to understand what you're working with.

## Key Terms & Definitions

Before diving in, let's define the key terminology:

**Data Quality Terms:**
- **Missing Value (NaN)**: A cell with no data - could be random or systematic
- **Outlier**: A data point significantly different from other observations
- **Duplicate**: Identical rows that may indicate data collection issues
- **Cardinality**: Number of unique values in a categorical column

**Statistical Terms:**
- **Mean (μ)**: Average value - sum of all values divided by count
- **Median**: Middle value when sorted - robust to outliers
- **Standard Deviation (σ)**: Measure of spread around the mean
- **Quartiles (Q1, Q2, Q3)**: Values that divide data into four equal parts
- **IQR**: Interquartile Range = Q3 - Q1

**Distribution Terms:**
- **Skewness**: Asymmetry of distribution (right-skewed = long tail on right)
- **Kurtosis**: "Tailedness" of distribution (heavy tails = more outliers)
- **Multimodal**: Distribution with multiple peaks
- **Normal Distribution**: Bell-shaped, symmetric around mean

**ML-Specific Terms:**
- **Feature**: Input variable used for prediction
- **Target**: Output variable we want to predict
- **Class Imbalance**: Unequal distribution of target classes
- **Data Leakage**: Using information that wouldn't be available at prediction time

## Why EDA Matters in Production

In production ML, data issues cause more failures than model issues:
- 80% of ML time is spent on data preparation
- Silent data drift breaks models without warning
- Missing value patterns often indicate business logic issues
- Understanding distributions informs preprocessing decisions

## What You'll Master

### 1. Initial Data Inspection

**Loading and First Look:**

The first step is understanding the shape and structure of your data.

\`\`\`python
import pandas as pd
import numpy as np

# Load your dataset
df = pd.read_csv("data.csv")

# Basic shape information
print(f"Rows: {df.shape[0]}, Columns: {df.shape[1]}")

# Preview first and last rows
df.head()  # First 5 rows
df.tail()  # Last 5 rows
df.sample(5)  # Random 5 rows
\`\`\`

**Understanding Data Types:**

Data types determine what operations are valid and what preprocessing is needed.

\`\`\`python
# Get comprehensive info
df.info()

# This shows:
# - Column names
# - Non-null counts (missing values = total - non-null)
# - Data types (int64, float64, object, datetime64)
# - Memory usage
\`\`\`

**Key data types in Pandas:**
- **int64**: Whole numbers (age, count, id)
- **float64**: Decimal numbers (price, percentage, measurement)
- **object**: Text/strings (name, category, mixed data)
- **bool**: True/False values
- **datetime64**: Date and time values

### 2. Descriptive Statistics

**Numerical Summary:**

The describe() method gives a statistical snapshot.

\`\`\`python
# Summary statistics for numerical columns
df.describe()

# Returns: count, mean, std, min, 25%, 50%, 75%, max
\`\`\`

**What to look for:**
- **count**: Different counts per column = missing values
- **mean vs median (50%)**: Large difference = skewed distribution
- **min/max**: Unreasonable values = data entry errors or outliers
- **std**: Large std relative to mean = high variability

**Categorical Summary:**

\`\`\`python
# For categorical columns
df.describe(include='object')

# Or check value counts for each column
df['category_column'].value_counts()
\`\`\`

### 3. Missing Value Analysis

**Detection:**

\`\`\`python
# Count missing values per column
df.isnull().sum()

# Calculate percentage missing
missing_pct = (df.isnull().sum() / len(df)) * 100
missing_pct[missing_pct > 0].sort_values(ascending=False)
\`\`\`

**Understanding Missing Patterns:**
- **MCAR (Missing Completely At Random)**: No pattern, safe to drop
- **MAR (Missing At Random)**: Related to other columns, impute carefully
- **MNAR (Missing Not At Random)**: Missingness is meaningful

**Common Handling Strategies:**

\`\`\`python
# Option 1: Drop rows with missing values
df_clean = df.dropna()

# Option 2: Drop columns with too many missing
df_clean = df.dropna(axis=1, thresh=0.8*len(df))  # Keep if 80%+ non-null

# Option 3: Fill with constant
df['column'].fillna(0, inplace=True)

# Option 4: Fill with statistics
df['column'].fillna(df['column'].median(), inplace=True)

# Option 5: Replace placeholder values with NaN first
df = df.replace("unknown", np.nan)
df = df.replace(-999, np.nan)
\`\`\`

### 4. Outlier Detection

Outliers can significantly impact model training and should be understood.

**Visual Detection with Box Plots:**

\`\`\`python
import matplotlib.pyplot as plt
import seaborn as sns

# Box plot shows median, quartiles, and outliers
plt.figure(figsize=(10, 6))
df.boxplot(column=['age', 'income', 'score'])
plt.title('Distribution of Numerical Features')
plt.show()
\`\`\`

**Statistical Detection - IQR Method:**

\`\`\`python
def detect_outliers_iqr(series):
    Q1 = series.quantile(0.25)
    Q3 = series.quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    outliers = series[(series < lower_bound) | (series > upper_bound)]
    return outliers

# Find outliers in a column
outliers = detect_outliers_iqr(df['income'])
print(f"Found {len(outliers)} outliers")
\`\`\`

**Statistical Detection - Z-Score Method:**

\`\`\`python
from scipy import stats

# Z-score > 3 is typically considered an outlier
z_scores = np.abs(stats.zscore(df['column']))
outliers = df[z_scores > 3]
\`\`\`

**Handling Strategies:**
- **Remove**: When outliers are data errors
- **Cap (Winsorize)**: Replace with threshold values
- **Transform**: Log transform reduces outlier impact
- **Keep**: When outliers are valid but rare events

### 5. Distribution Analysis

Understanding distributions informs preprocessing decisions.

**Visualizing Distributions:**

\`\`\`python
# Histogram for single variable
plt.figure(figsize=(10, 6))
df['income'].hist(bins=50, edgecolor='black')
plt.xlabel('Income')
plt.ylabel('Frequency')
plt.title('Distribution of Income')
plt.show()

# Check skewness numerically
print(f"Skewness: {df['income'].skew():.2f}")
# Skewness > 1 or < -1 indicates significant skew
\`\`\`

**Common Distribution Shapes:**

| Shape | Skewness | Example | Action |
|:------|:---------|:--------|:-------|
| Normal | Around 0 | Height, IQ | StandardScaler |
| Right-skewed | Positive | Income, Duration | Log transform |
| Left-skewed | Negative | Customer age at churn | Reflect + log |
| Bimodal | Varies | Mixed populations | Investigate segments |


**Transformations for Skewed Data:**

\`\`\`python
# Log transform (for right-skewed, positive data)
df['income_log'] = np.log1p(df['income'])  # log1p handles zeros

# Square root transform (gentler than log)
df['income_sqrt'] = np.sqrt(df['income'])

# Box-Cox transform (finds optimal power transform)
from scipy.stats import boxcox
df['income_boxcox'], lambda_val = boxcox(df['income'] + 1)
\`\`\`

### 6. Target Variable Analysis

For classification, understanding target distribution is critical.

**Checking Class Balance:**

\`\`\`python
# Value counts and percentages
target_dist = df['target'].value_counts()
target_pct = df['target'].value_counts(normalize=True) * 100

print("Class Distribution:")
print(target_dist)
print(f"\\nImbalance Ratio: {target_dist.max() / target_dist.min():.1f}:1")
\`\`\`

**Why Imbalance Matters:**
- With 95% negative, 5% positive:
  - Predicting all negative = 95% accuracy (useless!)
  - Use F1-score, Precision, Recall instead
  - Consider class weights or resampling

**Visualizing Target Distribution:**

\`\`\`python
plt.figure(figsize=(8, 5))
sns.countplot(data=df, x='target')
plt.title('Target Variable Distribution')
plt.show()
\`\`\`

### 7. Correlation Analysis

Identify relationships between features.

**Correlation Matrix:**

\`\`\`python
# Compute correlation matrix
correlation_matrix = df.select_dtypes(include=[np.number]).corr()

# Visualize with heatmap
plt.figure(figsize=(12, 10))
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', 
            center=0, fmt='.2f', square=True)
plt.title('Feature Correlation Matrix')
plt.tight_layout()
plt.show()
\`\`\`

**Multicollinearity Warning:**
- Correlation > 0.8 between features = multicollinearity
- Causes unstable coefficients in linear models
- Solutions: Drop one feature, use PCA, or use tree-based models

**Finding Highly Correlated Pairs:**

\`\`\`python
# Find pairs with correlation > threshold
threshold = 0.8
high_corr = []
for i in range(len(correlation_matrix.columns)):
    for j in range(i+1, len(correlation_matrix.columns)):
        if abs(correlation_matrix.iloc[i, j]) > threshold:
            high_corr.append((
                correlation_matrix.columns[i],
                correlation_matrix.columns[j],
                correlation_matrix.iloc[i, j]
            ))
print("Highly correlated pairs:", high_corr)
\`\`\`

### 8. Feature vs Target Analysis

Understanding which features relate to the target.

**Numerical Features:**

\`\`\`python
# Box plot of feature by target class
plt.figure(figsize=(10, 6))
sns.boxplot(data=df, x='target', y='feature_name')
plt.title('Feature Distribution by Target Class')
plt.show()
\`\`\`

**Categorical Features:**

\`\`\`python
# Cross-tabulation
ct = pd.crosstab(df['category'], df['target'], normalize='index')
print(ct)

# Stacked bar chart
ct.plot(kind='bar', stacked=True, figsize=(10, 6))
plt.title('Target Distribution by Category')
plt.ylabel('Proportion')
plt.show()
\`\`\`

### 9. Data Quality Checklist

Before moving to preprocessing, verify:

- [ ] **Shape**: Reasonable number of rows and columns
- [ ] **Types**: Columns have appropriate data types
- [ ] **Missing Values**: Identified and understood patterns
- [ ] **Duplicates**: Checked and handled appropriately
- [ ] **Outliers**: Detected and strategy decided
- [ ] **Target Balance**: Understood imbalance implications
- [ ] **Correlations**: Multicollinearity addressed
- [ ] **Leakage**: No features that leak target information

## Common Pitfalls to Avoid

**1. Data Leakage:**
- Don't use features only available after prediction time
- Example: Call duration to predict if someone will answer

**2. Ignoring Domain Context:**
- Sentinel values like 999 or -1 often have special meaning
- "Unknown" or "N/A" strings should be converted to NaN

**3. Fitting on Test Data:**
- Calculate statistics (mean, std) only on training data
- Apply same transformation to test data

**4. Over-cleaning:**
- Removing too many outliers can bias your model
- Some "outliers" are rare but valid events

## Additional Resources

**Documentation:**
- [Pandas User Guide](https://pandas.pydata.org/docs/user_guide/index.html) - Complete data wrangling reference
- [Seaborn Tutorial Gallery](https://seaborn.pydata.org/tutorial.html) - Statistical visualization examples
- [Matplotlib Tutorials](https://matplotlib.org/stable/tutorials/index.html) - Comprehensive plotting guide
- [SciPy Statistics Module](https://docs.scipy.org/doc/scipy/reference/stats.html) - Statistical functions

**Video Courses:**
- [StatQuest - Statistics Fundamentals](https://www.youtube.com/c/joshstarmer) - Best visual explanations
- [Corey Schafer - Pandas Tutorial](https://www.youtube.com/playlist?list=PL-osiE80TeTsWmV9i9c58mdDCSskIFdDS) - Practical Pandas
- [Data School - Pandas Q&A](https://www.youtube.com/playlist?list=PL5-da3qGB5ICCsgW1MxlZ0Hq8LL5U3u9y) - Common problems solved

**Books:**
- "Python for Data Analysis" by Wes McKinney - Pandas creator's book
- "Data Science from Scratch" by Joel Grus - Fundamentals explained

**Interactive Tools:**
- [ydata-profiling](https://github.com/ydataai/ydata-profiling) - Automated EDA reports
- [Great Expectations](https://greatexpectations.io/) - Data validation framework
- [Sweetviz](https://github.com/fbdesignpro/sweetviz) - EDA visualization library
    `,
  subModules: [],
};
