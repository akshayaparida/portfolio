import { LearningModule } from "@/types/learning";

export const dataExplorationModule: LearningModule = {
  id: "data-exploration",
  title: "Module 1: Data Exploration & EDA",
  description:
    "Understanding your data - the foundation of reliable ML systems",
  status: "in-progress",
  detailedContent: `# Data Exploration for Machine Learning

Exploratory Data Analysis (EDA) is the critical first step in any ML project. Before writing preprocessing code or training models, you need to understand what you're working with.

## What You'll Learn

| # | Topic | Skill |
|:--|:------|:------|
| 1 | **Data Inspection** | Use df.shape, df.info(), df.head() |
| 2 | **Descriptive Stats** | Interpret mean, median, std |
| 3 | **Missing Values** | Identify and handle NaN patterns |
| 4 | **Outliers** | Detect using IQR and Z-score |
| 5 | **Distributions** | Analyze skewness and transformations |
| 6 | **Target Balance** | Check class imbalance |
| 7 | **Correlations** | Find feature relationships |
| 8 | **Memory Optimization** | Reduce dataframe memory usage |

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

**Why This Matters:**

Before any analysis, you need to understand what you're working with. Think of it like opening a box you've never seen before - you need to know what's inside before you can use it.

**Key Questions to Answer:**
- How much data do we have? (rows = samples, columns = features)
- What does each row represent? (a customer? a transaction? a day?)
- What information is captured in each column?
- Is the data complete or are there gaps?

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

**Why This Matters:**

Descriptive statistics summarize your data in a few numbers. They help you quickly spot potential issues:
- Is the data in a reasonable range?
- How spread out are the values?
- Are there extreme values that need attention?

**Central Tendency vs Spread:**

- **Central Tendency** (mean, median): Where is the "center" of the data?
- **Spread** (std, IQR): How much do values vary from the center?

For example, if average customer age is 35 with std of 5, most customers are 30-40. But if std is 20, customers range from teens to seniors - very different business implications!

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

**Why This Matters:**

Missing data is one of the most common data quality issues. But not all missing data is the same - understanding WHY data is missing is crucial for handling it correctly.

**The Three Types of Missing Data:**

1. **MCAR (Missing Completely At Random)**
   - The missingness has NO relationship to any data
   - Example: Survey responses lost due to random server error
   - Safe to: Drop rows or impute with mean/median

2. **MAR (Missing At Random)**
   - Missingness is related to OTHER observed variables
   - Example: Older people less likely to fill online forms (age is observed)
   - Safe to: Impute using other features, or use models that handle missing data

3. **MNAR (Missing Not At Random)**
   - Missingness is related to the MISSING VALUE ITSELF
   - Example: High-income people refusing to report income
   - Dangerous: Simple imputation will bias your model!

**Real-World Impact:**

If 30% of "income" is missing and you fill with median, you're assuming those people have average income. But if rich people hide income (MNAR), you've just biased your model to underestimate wealth!

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

**Why This Matters:**

Outliers are values that are "far" from the rest of the data. But "far" is relative - what matters is understanding whether outliers are:

1. **Data Errors**: Typos, sensor malfunctions, data entry mistakes
   - Example: Age = 999, Height = -50cm
   - Action: Fix or remove

2. **Legitimate Rare Events**: Real but unusual occurrences
   - Example: A billionaire in customer data, a viral tweet
   - Action: Often keep, but may need special handling

3. **Different Population**: Data from a different group mixed in
   - Example: Business customers in consumer dataset
   - Action: Separate and analyze differently

**Why Outliers Matter for ML:**

- **Linear Regression**: Outliers can drastically change the line of best fit
- **Mean/Std Scaling**: One large outlier skews the entire scale
- **Distance-based models (KNN)**: Outliers dominate distance calculations
- **Tree-based models**: Most robust to outliers (split on rank, not value)

**The 1.5×IQR Rule Explained:**

The IQR (Interquartile Range) contains the middle 50% of data. We define outliers as values more than 1.5×IQR away from Q1 or Q3. Why 1.5? For normal distributions, this captures about 99.3% of data - anything outside is rare.

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

**Why This Matters:**

The shape of your data's distribution determines which algorithms work best and what preprocessing is needed.

**Why Distribution Shape Matters:**

1. **Many ML algorithms assume normal distribution**
   - Linear regression, logistic regression, LDA
   - If data is skewed, these assumptions are violated

2. **Skewed data causes problems with scaling**
   - StandardScaler uses mean and std (both affected by skew)
   - A few large values can compress most of your data near zero

3. **Distribution affects model interpretation**
   - "1 unit increase" means different things for different distributions

**Understanding Skewness:**

- **Skewness = 0**: Symmetric (normal) distribution
- **Positive skew (> 0)**: Long tail on the right (common: income, prices, counts)
- **Negative skew (< 0)**: Long tail on the left (rare: test scores with ceiling effects)

**Rule of Thumb:**
- |Skewness| < 0.5: Approximately symmetric
- |Skewness| 0.5-1: Moderately skewed
- |Skewness| > 1: Highly skewed (consider transformation)

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

**Why This Matters:**

The target variable is what you're trying to predict. Understanding its distribution is CRITICAL because it affects:

1. **Choice of metrics**: Accuracy is misleading for imbalanced data
2. **Model training**: Most algorithms assume balanced classes
3. **Business decisions**: Rare events may be the most important ones!

**The Class Imbalance Problem:**

Imagine detecting credit card fraud where 99.9% of transactions are legitimate:
- A model that ALWAYS predicts "not fraud" is 99.9% accurate
- But it catches 0% of actual fraud - completely useless!

**Imbalance Levels:**

| Ratio | Severity | Example |
|:------|:---------|:--------|
| 60:40 | Mild | Customer churn |
| 80:20 | Moderate | Disease diagnosis |
| 95:5 | Severe | Fraud detection |
| 99:1 | Extreme | Rare disease, cyber attacks |

**Solutions for Imbalanced Data:**

1. **Use proper metrics**: F1-score, Precision-Recall, ROC-AUC
2. **Class weights**: Tell the model to penalize minority class errors more
3. **Resampling**: Oversample minority (SMOTE) or undersample majority
4. **Threshold tuning**: Adjust prediction threshold for better recall

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

**Why This Matters:**

Correlation measures how features move together. Understanding correlations helps you:

1. **Identify redundant features**: If two features are highly correlated (>0.9), they provide similar information - you may only need one

2. **Spot potential predictors**: Features correlated with the target are likely useful

3. **Detect multicollinearity**: A problem for linear models where correlated features make coefficients unstable

**Understanding Correlation Values:**

| Value | Meaning | Interpretation |
|:------|:--------|:---------------|
| +1.0 | Perfect positive | As X increases, Y always increases |
| +0.7 to +0.9 | Strong positive | As X increases, Y usually increases |
| +0.4 to +0.7 | Moderate positive | Some relationship |
| -0.4 to +0.4 | Weak/None | Little to no linear relationship |
| -0.7 to -0.4 | Moderate negative | As X increases, Y usually decreases |
| -1.0 | Perfect negative | As X increases, Y always decreases |

**Important Limitations:**

- Correlation measures LINEAR relationships only
- Correlation ≠ Causation (ice cream sales correlate with drownings - both increase in summer)
- Strong correlation doesn't mean useful for prediction

**Multicollinearity in Detail:**

When features are highly correlated, linear models struggle to determine which feature is actually important. Example:
- If "height in cm" and "height in inches" are both features (correlation = 1.0)
- The model can't tell which one matters - coefficients become arbitrary

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

**Why This Matters:**

Before building models, you want to understand which features are likely to be predictive. This helps you:

1. **Prioritize features**: Focus engineering efforts on promising features
2. **Spot data leakage**: Features too correlated with target may be leaking information
3. **Understand the problem**: Learn what actually drives the outcome

**Different Feature Types Need Different Analysis:**

| Feature Type | Target Type | Analysis Method |
|:-------------|:------------|:----------------|
| Numerical | Binary | Box plots by class, t-test |
| Numerical | Continuous | Scatter plot, Pearson correlation |
| Categorical | Binary | Cross-tabulation, Chi-square test |
| Categorical | Continuous | Box plots by category, ANOVA |

**What Makes a Good Predictor:**

- **Separation**: Different target classes should have different feature distributions
- **Consistency**: The relationship should make logical sense
- **No leakage**: Feature should be available at prediction time

**Example of Good vs Bad Features:**

- **Good**: "Number of previous purchases" to predict churn (available before churn, logical relationship)
- **Bad**: "Reason for cancellation" to predict churn (only available AFTER churn - leakage!)

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

### 9. Temporal Patterns (If Applicable)

Time is one of the most powerful features in machine learning. Many real-world datasets have a time component that reveals hidden patterns.

**Why Temporal Analysis Matters:**

Time-based data often contains three key components:

1. **Trend**: Long-term increase or decrease in the data
   - Example: E-commerce sales growing year over year
   - Important for: Understanding business growth or decline

2. **Seasonality**: Regular patterns that repeat at fixed intervals
   - Example: Ice cream sales peak in summer, drop in winter
   - Important for: Planning inventory, staffing, marketing

3. **Noise**: Random variations that don't follow a pattern
   - Example: Unexpected spikes due to viral social media posts
   - Important for: Identifying anomalies vs normal behavior

**Time-Based Train/Test Split Warning:**

Never randomly split time-series data! Use chronological splits:
- Training: Past data (e.g., Jan-Oct)
- Testing: Future data (e.g., Nov-Dec)

Random splitting causes **data leakage** because the model sees future patterns during training.

**Basic DateTime Inspection:**

\`\`\`python
# Convert to datetime type
df['date'] = pd.to_datetime(df['date'])

# Extract useful features
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['day_of_week'] = df['date'].dt.dayofweek  # 0=Monday, 6=Sunday
df['hour'] = df['date'].dt.hour
df['is_weekend'] = df['day_of_week'].isin([5, 6]).astype(int)

# Check date range
print(f"Date range: {df['date'].min()} to {df['date'].max()}")
print(f"Total days covered: {(df['date'].max() - df['date'].min()).days}")
\`\`\`

**Checking for Time Gaps:**

\`\`\`python
# Find missing dates in daily data
all_dates = pd.date_range(start=df['date'].min(), end=df['date'].max(), freq='D')
missing_dates = all_dates[~all_dates.isin(df['date'])]
print(f"Missing {len(missing_dates)} dates")
\`\`\`

**Time-Based Distribution:**

\`\`\`python
# Events by month - reveals seasonality
df['month'].value_counts().sort_index().plot(kind='bar')
plt.title('Events by Month')
plt.xlabel('Month (1=Jan, 12=Dec)')
plt.show()

# Events by day of week - reveals weekly patterns
df['day_of_week'].value_counts().sort_index().plot(kind='bar')
plt.title('Events by Day of Week')
plt.xlabel('Day (0=Mon, 6=Sun)')
plt.show()

# Events over time - reveals trends
df.set_index('date').resample('M').size().plot()
plt.title('Events per Month Over Time')
plt.show()
\`\`\`

**Key Questions to Answer:**
- Is there a clear upward/downward **trend**?
- Are there weekly or monthly **seasonal patterns**?
- Are there any **gaps** in the data collection?
- Do weekends/holidays behave differently from weekdays?

### 10. Memory Optimization

When working with large datasets (millions of rows), memory becomes a critical constraint. Understanding data types helps you work with data that might otherwise crash your system.

**Why Memory Matters:**

- **RAM Limits**: A 16GB laptop can't load a 20GB dataset
- **Speed**: Smaller data types = faster computations
- **Cloud Costs**: More memory = higher compute costs
- **Production**: Deployed models need efficient memory usage

**How Pandas Stores Data:**

Pandas uses NumPy arrays under the hood. Each data type uses a fixed amount of memory:

| Data Type | Bits | Range | Best For |
|:----------|:-----|:------|:---------|
| int8 | 8 | -128 to 127 | Small counts, flags |
| int16 | 16 | -32,768 to 32,767 | Age, small counts |
| int32 | 32 | ±2.1 billion | Most integers |
| int64 | 64 | Huge range | IDs, timestamps |
| float32 | 32 | 7 decimal precision | Most measurements |
| float64 | 64 | 15 decimal precision | High-precision science |

**The Problem with Defaults:**

Pandas defaults to the largest types (int64, float64) even when unnecessary:
- Age column (0-100): Uses int64 (8 bytes) but only needs int8 (1 byte)
- Category with 5 options: Uses object (50+ bytes) but could use category (1-4 bytes)

**Check Memory Usage:**

\`\`\`python
# Total memory usage
print(f"Total memory: {df.memory_usage(deep=True).sum() / 1024**2:.2f} MB")

# Detailed memory usage
print(df.info(memory_usage='deep'))

# Memory per column (sorted largest first)
mem_usage = df.memory_usage(deep=True) / 1024**2  # Convert to MB
print(mem_usage.sort_values(ascending=False))
\`\`\`

**Downcast Numeric Types:**

Downcasting means converting to the smallest type that can hold your data:

\`\`\`python
# Before: Check current types
print(df.dtypes)
print(f"Memory before: {df.memory_usage(deep=True).sum() / 1024**2:.2f} MB")

# Downcast integers (int64 → int8/16/32)
for col in df.select_dtypes(include=['int64']).columns:
    df[col] = pd.to_numeric(df[col], downcast='integer')

# Downcast floats (float64 → float32)
for col in df.select_dtypes(include=['float64']).columns:
    df[col] = pd.to_numeric(df[col], downcast='float')

# After: Check savings
print(f"Memory after: {df.memory_usage(deep=True).sum() / 1024**2:.2f} MB")
\`\`\`

**Convert Object to Category:**

The **category** dtype is perfect for columns with few unique values (low cardinality):

\`\`\`python
# Check cardinality first
for col in df.select_dtypes(include=['object']).columns:
    cardinality = df[col].nunique()
    print(f"{col}: {cardinality} unique values")

# Convert low-cardinality columns to category
for col in df.select_dtypes(include=['object']).columns:
    if df[col].nunique() / len(df) < 0.5:  # Less than 50% unique
        df[col] = df[col].astype('category')
\`\`\`

**Why Category is Efficient:**
- Stores each unique value once, then uses integer codes
- "Male", "Female" stored once → rows just store 0 or 1
- Can reduce memory by 90%+ for low-cardinality columns

**Typical Memory Savings:**
| Data Type | Memory per Value | Example Column |
|:----------|:-----------------|:---------------|
| int64 | 8 bytes | → Downcast to int8: 1 byte |
| float64 | 8 bytes | → Downcast to float32: 4 bytes |
| object (string) | 50+ bytes | → Category: 1-4 bytes |

**Pro Tip**: A 1GB dataset can often be reduced to 100-200MB with proper typing!

### 11. Data Quality Checklist

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

---

## TL;DR - Quick Recall

**One-liner for each topic:**

| # | Topic | Key Takeaway |
|:--|:------|:-------------|
| 1 | **Data Inspection** | Use \`df.shape\`, \`df.info()\`, \`df.head()\` to understand what you have |
| 2 | **Descriptive Stats** | \`df.describe()\` - check if mean ≠ median (skewed) and min/max make sense |
| 3 | **Missing Values** | Know WHY data is missing (MCAR/MAR/MNAR) before deciding how to handle |
| 4 | **Outliers** | Not all outliers are errors - decide: remove, cap, transform, or keep |
| 5 | **Distributions** | Skewness > 1? Consider log transform before scaling |
| 6 | **Target Balance** | Imbalanced classes? Use F1-score, not accuracy |
| 7 | **Correlations** | Correlation > 0.9 between features = multicollinearity (drop one) |
| 8 | **Feature vs Target** | Good predictor = separates classes + available at prediction time |
| 9 | **Temporal Patterns** | Never random split time data - use chronological split |
| 10 | **Memory** | Downcast dtypes + use category for low-cardinality = 80% memory savings |

**Quick Commands Reference:**

\\\`\\\`\\\`python
# Shape & Info
df.shape                          # (rows, columns)
df.info()                         # dtypes, memory, non-null counts
df.describe()                     # statistics for numeric columns

# Missing Values
df.isnull().sum()                 # count missing per column
(df.isnull().sum() / len(df)) * 100  # percentage missing

# Outliers (IQR method)
Q1, Q3 = df['col'].quantile([0.25, 0.75])
IQR = Q3 - Q1
outliers = df[(df['col'] < Q1 - 1.5*IQR) | (df['col'] > Q3 + 1.5*IQR)]

# Distribution
df['col'].skew()                  # > 1 or < -1 = highly skewed
df['col_log'] = np.log1p(df['col'])  # log transform

# Target Balance
df['target'].value_counts(normalize=True)  # class percentages

# Correlation
df.corr()                         # correlation matrix
df.corr()['target'].sort_values() # correlation with target

# Memory Optimization
df.memory_usage(deep=True).sum() / 1024**2  # total MB
df['col'] = df['col'].astype('category')    # convert to category
\\\`\\\`\\\`

**The EDA Mantra:**
> "Understand your data before you model it. 80% of ML success is data quality."

---

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
  practiceQuiz: [
    {
      id: "mlops-q1",
      question: "Which pandas method shows data types and non-null counts?",
      options: ["df.head()", "df.describe()", "df.info()", "df.shape"],
      correctAnswer: 2,
      explanation:
        "df.info() displays:\n\n• Column names\n• Non-null counts\n• Data types (dtype)\n• Memory usage\n\ndf.describe() shows statistics, df.head() shows first rows.",
      difficulty: "easy",
    },
    {
      id: "mlops-q2",
      question: "IQR (Interquartile Range) is calculated as:",
      options: ["Q3 - Q1", "Q2 - Q1", "Max - Min", "Mean - Median"],
      correctAnswer: 0,
      explanation:
        "IQR = Q3 - Q1 (75th percentile - 25th percentile)\n\nUsed for outlier detection:\n• Lower bound: Q1 - 1.5×IQR\n• Upper bound: Q3 + 1.5×IQR\n\nValues outside these bounds are potential outliers.",
      difficulty: "easy",
    },
    {
      id: "mlops-q3",
      question:
        "For a highly imbalanced dataset (95% class A, 5% class B), accuracy is:",
      options: ["A good metric", "A poor metric", "Always 50%", "Undefined"],
      correctAnswer: 1,
      explanation:
        "Accuracy is misleading for imbalanced data:\n\n• A model predicting 'A' always gets 95% accuracy\n• But it never detects class B!\n\nBetter metrics: Precision, Recall, F1-score, AUC-ROC",
      difficulty: "medium",
    },
    {
      id: "mlops-q4",
      question: "Missing values in pandas are represented as:",
      options: ["None", "0", "NaN", "'missing'"],
      correctAnswer: 2,
      explanation:
        "NaN (Not a Number) represents missing values in pandas.\n\nDetection methods:\n• df.isna() or df.isnull()\n• df.isna().sum() for counts\n\nNone is converted to NaN when in a numeric column.",
      difficulty: "easy",
    },
    {
      id: "mlops-q5",
      question: "Positive skewness means the distribution has:",
      options: ["Long left tail", "Long right tail", "Equal tails", "No tail"],
      correctAnswer: 1,
      explanation:
        "Skewness indicates tail direction:\n\n• Positive skew: Long RIGHT tail (mean > median)\n• Negative skew: Long LEFT tail (mean < median)\n• Zero skew: Symmetric (normal distribution)\n\nLog transform can reduce positive skewness.",
      difficulty: "easy",
    },
    {
      id: "mlops-q6",
      question: "df.describe() shows statistics for:",
      options: [
        "All columns",
        "Numeric columns only",
        "Categorical columns only",
        "First 5 rows",
      ],
      correctAnswer: 1,
      explanation:
        "df.describe() by default:\n\n• Shows stats for numeric columns\n• Includes: count, mean, std, min, 25%, 50%, 75%, max\n\nFor all columns: df.describe(include='all')",
      difficulty: "easy",
    },
    {
      id: "mlops-q7",
      question: "To find correlation between all numeric features, use:",
      options: ["df.info()", "df.corr()", "df.value_counts()", "df.unique()"],
      correctAnswer: 1,
      explanation:
        "df.corr() computes:\n\n• Pairwise correlation matrix\n• Values from -1 to +1\n• Helps identify multicollinearity\n\nVisualize with: sns.heatmap(df.corr())",
      difficulty: "easy",
    },
    {
      id: "mlops-q8",
      question: "High cardinality in a categorical column means:",
      options: [
        "Few unique values",
        "Many unique values",
        "Many missing values",
        "Column is numeric",
      ],
      correctAnswer: 1,
      explanation:
        "Cardinality = number of unique values\n\n• Low cardinality: Gender (2-3 values)\n• High cardinality: UserID (millions of values)\n\nHigh cardinality can cause issues with one-hot encoding.",
      difficulty: "easy",
    },
    {
      id: "mlops-q9",
      question: "Z-score outlier detection flags values where |z| > :",
      options: ["1", "2", "3", "5"],
      correctAnswer: 2,
      explanation:
        "Z-score: z = (x - μ) / σ\n\nTypical threshold: |z| > 3\n• 99.7% of normal data falls within 3σ\n• Values beyond are potential outliers\n\nAlternative: IQR method (1.5 × IQR)",
      difficulty: "medium",
    },
    {
      id: "mlops-q10",
      question: "SMOTE is used to handle:",
      options: [
        "Missing values",
        "Outliers",
        "Class imbalance",
        "High cardinality",
      ],
      correctAnswer: 2,
      explanation:
        "SMOTE = Synthetic Minority Over-sampling Technique\n\n• Creates synthetic samples of minority class\n• Interpolates between existing minority samples\n• Helps balance class distribution\n\nUse with imbalanced-learn library.",
      difficulty: "medium",
    },
  ],
};
