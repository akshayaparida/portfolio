import { LearningModule } from "@/types/learning";

export const dataValidationModule: LearningModule = {
  id: "data-validation",
  title: "Module 2: Data Validation & Pipelines",
  description:
    "Building robust production pipelines: Schema validation, reproducible feature engineering, and data versioning.",
  status: "in-progress",
  detailedContent: `# Fueling Production AI: Validation & Pipelines

Transitioning from a Jupyter notebook to a production system requires a fundamental shift in mindset. In a notebook, you can manually fix data errors. In production, your pipeline must handle them automatically.

## 🎯 What You'll Learn

| # | Topic | Skill |
|:--|:------|:------|
| 1 | **Data Validation** | Define strict schemas with Pandera |
| 2 | **Handling Errors** | Catch and report data quality issues early |
| 3 | **Reproducible Pipelines** | Encapsulate transformations with Scikit-learn |
| 4 | **Type Handling** | Manage numerical vs categorical workflows |
| 5 | **Leakage Prevention** | Prevent training-serving skew |
| 6 | **Data Versioning** | Track dataset evolution with DVC |

## Key Terms & Definitions

Before diving in, let's define the key terminology for production data systems:

**Validation Terms:**
- **Schema**: A formal contract defining expected column names, types, and value ranges.
- **Data Contract**: An agreement between data producers and consumers about data structure.
- **Drift**: When the statistical properties of data change over time (e.g., input distribution drift).

**Pipeline Terms:**
- **Pipeline**: A sequence of data processing steps (imputation -> scaling -> encoding -> modeling).
- **Transformer**: A class that modifies data (e.g., 
StandardScaler
, 
OneHotEncoder
).
- **Estimator**: A class that learns from data (e.g., 
RandomForestClassifier
).
- **Training-Serving Skew**: When the logic used to process training data differs from inference time.

**Versioning Terms:**
- **Artifact**: A file produced by the pipeline (e.g., 
model.pkl
, 
preprocessor.pkl
).
- **Pointer File**: A small file (e.g., 
.dvc
) that tracks a large dataset stored elsewhere.

## Why This Matters in Production

"Garbage in, Garbage out" is the cliché, but "Garbage in, Silent Failure" is the production reality. Without validation, a change in an upstream API (e.g., "age" becoming a string) can silently break your model's predictions.

- **Reliability**: Pipelines must handle unexpected data gracefully.
- **Reproducibility**: You must be able to recreate exact model versions from months ago.
- **Automation**: Manual cleaning steps don't scale to real-time inference.

## What You'll Master

### 1. Data Validation with Pandera

**Why This Matters:**

Pandas allows any data to pass through. **Pandera** provides a flexible and expressive way to define data "contracts" or schemas that catch errors *before* they crash your model.

**Defining a Schema (Class-based API):**

The class-based API (
DataFrameModel
) is clean and readable, ideal for complex datasets.

\`\`\`python
import pandas as pd
import pandera as pa
from pandera.typing import Series
from pandera import DataFrameModel, Field, check

# Define the expected schema for our Bank Marketing data
class BankDataSchema(DataFrameModel):
    # Core demographic columns
    age: Series[int] = Field(ge=18, le=120, description="Customer age")
    job: Series[str] = Field(isin=["admin.", "blue-collar", "technician", "management", "retired", "entrepreneur", "self-employed", "housemaid", "unemployed", "student", pd.NA])
    marital: Series[str] = Field(isin=["married", "single", "divorced", pd.NA])

    # Financial columns
    balance: Series[float] = Field(description="Average yearly balance", nullable=True)
    loan: Series[str] = Field(isin=["yes", "no", pd.NA], description="Has personal loan?")

    # Target variable (optional, as it might not exist in inference data)
    y: Series[str] = Field(isin=["yes", "no"], nullable=True)

    # Custom Validation Logic
    @check("balance")
    def check_balance_rationality(cls, series: Series[float]) -> Series[bool]:
        """Ensure balance is within 'reasonable' limits (e.g., > -10k)"""
        return series > -10000

    class Config:
        strict = True  # Reject columns not defined in the schema
        coerce = False  # Don't auto-convert types; be explicit about data types
\`\`\`

**Validating Data:**

\`\`\`python
# Simulating data load
data = {
    "age": [25, 40, 17],  # 17 will fail validation (ge=18)
    "job": ["admin.", "unknown", "technician"], # 'unknown' will be converted to pd.NA (allowed)
    "marital": ["single", "married", "single"],
    "balance": [500.0, 1200.50, -50000.0], # -50k will fail custom check
    "loan": ["yes", "no", "maybe"], # 'maybe' not in allowed list
    "y": ["yes", "no", "invalid"] # 'invalid' not in allowed list
}

df = pd.DataFrame(data).replace("unknown", pd.NA) # Convert 'unknown' to pd.NA

# Validate
try:
    validated_df = BankDataSchema.validate(df, lazy=True)
    print("Validation Passed!")
except pa.errors.SchemaErrors as err:
    print("Validation Failed:")
    print(err.failure_cases) # Returns a dataframe of all errors found
\`\`\`

**Key Concepts:**
- **\`lazy=True\`**: Crucial for production. It runs *all* checks and reports *all* errors, rather than stopping at the first failure.
- **\`coerce=False\`**: In our schema, we set this to False for explicit type handling, but it can be True for automatic conversion.

### 2. Reproducible Pipelines with Scikit-learn

**Why This Matters:**

A common anti-pattern is manual preprocessing:
\`\`\`python
# DON'T DO THIS IN PRODUCTION
df['age'] = df['age'].fillna(df['age'].mean()) # The mean is lost!
df['salary'] = (df['salary'] - mean) / std     # Hard to reproduce exactly
\`\`\`

This leads to **Training-Serving Skew**. The exact mean/std used during training must be saved and applied during inference. Scikit-learn's 
Pipeline
 and 
ColumnTransformer
 solve this.

**Building a Robust Pipeline:**

We need to handle different data types differently:
- **Numerical** (Age, Balance): Impute missing values (Median), then Scale (StandardScaler).
- **Categorical** (Job, Marital): Impute missing (Constant), then One-Hot Encode.

\`\`\`python
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer

# 1. Define feature groups
numeric_features = ["age", "balance", "duration"]
categorical_features = ["job", "marital", "education"]

# 2. Create transformers for each group
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='constant', fill_value='unknown')),
    ('onehot', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
])

# 3. Combine into a preprocessor
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('cat', categorical_transformer, categorical_features)
    ],
    remainder='drop' # Drop columns not explicitly transformed
)
**Usage in Production:**

\`\`\`python
# 4. Create the final pipeline (Preprocessor + Model)
from sklearn.ensemble import RandomForestClassifier
import pickle

model_pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', RandomForestClassifier())
])

# 5. Usage
# Fit ONLY on training data
model_pipeline.fit(X_train, y_train)

# Predict on test/production data
# (automatically applies learned mean/std/categories)
predictions = model_pipeline.predict(X_test)

# 6. Save the fitted pipeline for later use in production
with open('model_pipeline.pkl', 'wb') as f:
    pickle.dump(model_pipeline, f)

# 7. Load the pipeline in production for inference
with open('model_pipeline.pkl', 'rb') as f:
    loaded_pipeline = pickle.load(f)

# Use the loaded pipeline for predictions
production_predictions = loaded_pipeline.predict(production_data)
\`\`\`

**Why this works:**
- **Encapsulation**: The pipeline *is* the model. You save one object (
pickle.dump(model_pipeline)
), and it contains all the transformation logic and learned parameters.
- **Leakage Prevention**: By fitting only on
\`X_train\`
, you ensure test data statistics don't leak into the training process.
- **Production Safety**: The loaded pipeline contains the exact same fitted transformers (means, stds, categories) that were learned during training.
- **\`handle_unknown='ignore'\`**: Critical for production. If a new job title appears in live data that wasn't in training, the pipeline won't crash; it will just produce all-zero encodings for that category.

### 3. Data Versioning with DVC

**Why This Matters:**

Code is versioned with Git. Data is heavy, changes frequently, and shouldn't be in Git. **DVC (Data Version Control)** bridges this gap.

It replaces large files with small text "pointers" (
.dvc
 files) that Git can track, while storing the actual data in cheap object storage (S3, GCS, or a local folder).

**The Workflow:**

1.  **Initialize DVC**
    \`\`\`bash
    pip install dvc
    dvc init
    \`\`\`

2.  **Track a Dataset**
    Instead of 
\`git add data.csv\`
, you use DVC:
    \`\`\`bash
    dvc add data/bank_marketing.csv
    \`\`\`
    This creates 
\`data/bank_marketing.csv.dvc\`
 (small metadata file) and adds 
\`data/bank_marketing.csv\`
 to 
\`.gitignore\`
.

3.  **Version with Git**
    Commit the pointer file to Git.
    \`\`\`bash
    git add data/bank_marketing.csv.dvc .gitignore
    git commit -m "Add initial bank marketing dataset"
    \`\`\`

4.  **Push Data to Remote**
    Configure a storage backend (e.g., a local shared folder or S3 bucket).
    \`\`\`bash
    dvc remote add -d myremote s3://my-bucket/dvc-storage
    dvc push
    \`\`\`

**Reproducibility with
\`dvc.yaml\`
:**

DVC isn't just for storage; it tracks **pipelines**. You define stages in
\`dvc.yaml\`
:

\`\`\`yaml
stages:
  prepare_data:
    cmd: python src/data/prepare.py data/raw.csv
    deps:
      - data/raw.csv
      - src/data/prepare.py
      - src/data/validator.py  # Include validation script as dependency
    outs:
      - data/processed.csv
    params:
      - prepare.test_size
      - prepare.random_state

  train_model:
    cmd: python src/training/train.py data/processed.csv
    deps:
      - data/processed.csv
      - src/training/train.py
      - src/training/pipeline.py  # Include pipeline definition as dependency
    outs:
      - models/model.pkl
    metrics:
      - metrics.json:
          cache: false
    params:
      - train.learning_rate
      - train.max_depth
\`\`\`

Running **\`dvc repro\`** will:
1.  Check dependency hashes (code, data, parameters).
2.  Only re-run steps where code, data, or parameters changed.
3.  Guarantee that
\`models/model.pkl\`
 was produced by *exactly* that version of data, code, and parameters.
4.  Generate a
\`dvc.lock\`
 file that locks the exact versions of all dependencies and outputs.

--- 

## TL;DR - Quick Recall

**Key Takeaways:**

- **Pandera Schema**: Use \`DataFrameModel\` to enforce data contracts and prevent silent failures.
- **Lazy Validation**: Use \`lazy=True\` to catch *all* errors in a batch, not just the first one.
- **ColumnTransformer**: Split numerical (impute+scale) and categorical (impute+encode) logic safely.
- **Pipeline Object**: Save the entire \`Pipeline\`, not just the model, to prevent training-serving skew.
- **DVC Tracking**: Use \`dvc add data.csv\` to track large files; git tracks the \`.dvc\` pointer.
- **DVC Repro**: \`dvc repro\` ensures your model is always built from the correct data version.

<details>
<summary><strong>Quick Commands Reference (Click to Expand)</strong></summary>

\`\`\`python
# Pandera
import pandera as pa
from pandera import DataFrameModel, Field
from pandera.typing import Series

class Schema(DataFrameModel):
    age: Series[int] = Field(ge=18)

df_validated = Schema.validate(df, lazy=True)  # lazy=True catches all errors

# Scikit-learn Pipeline
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
import pickle

pipe = Pipeline([
    ('preprocessor', ColumnTransformer(...)),
    ('model', RandomForestClassifier())
])
pipe.fit(X_train, y_train)  # Fit on training data only

# Save and load the complete pipeline
with open('model.pkl', 'wb') as f:
    pickle.dump(pipe, f)

with open('model.pkl', 'rb') as f:
    loaded_pipe = pickle.load(f)

# DVC
dvc add data/dataset.csv      # Track large files with DVC
git add data/dataset.csv.dvc  # Commit the pointer file to Git
dvc push                      # Push actual data to remote storage
dvc repro                     # Reproduce the pipeline with exact versions
\`\`\`
</details>

**The Production Mantra:**
> "Your pipeline is your product. The model is just one artifact it produces."

--- 

## Additional Resources

**Documentation:**
- [Pandera Documentation](https://pandera.readthedocs.io/) - Full schema validation guide.
- [Scikit-learn Pipelines](https://scikit-learn.org/stable/modules/compose.html) - Official guide on pipelines and composite estimators.
- [DVC Documentation](https://dvc.org/doc) - Data Version Control for Machine Learning Projects.

**Tools:**
- **Great Expectations**: Alternative to Pandera for data quality.
- **MLflow**: Often used alongside DVC for experiment tracking.
- **Hydra**: Framework for elegant configuration management.
`,
  subModules: [],
  practiceQuiz: [
    {
      id: "dv-q1",
      question: "Why is 'lazy=True' important in Pandera validation?",
      options: [
        "It makes the validation run faster",
        "It reports ALL errors instead of stopping at the first one",
        "It automatically fixes errors",
        "It ignores missing values",
      ],
      correctAnswer: 1,
      explanation:
        "In a production or debugging context, seeing a full report of all schema violations is much more useful than fixing one error, re-running, and hitting the next one.",
      difficulty: "easy",
    },
    {
      id: "dv-q2",
      question:
        "Which Scikit-learn tool applies different transformations to different columns?",
      options: [
        "Pipeline",
        "StandardScaler",
        "ColumnTransformer",
        "FeatureUnion",
      ],
      correctAnswer: 2,
      explanation:
        "ColumnTransformer allows you to route specific columns to specific transformers (e.g., numerical cols -> scaler, categorical cols -> encoder).",
      difficulty: "easy",
    },
    {
      id: "dv-q3",
      question:
        "What happens when OneHotEncoder sees a category in production that wasn't in training (with handle_unknown='ignore')?",
      options: [
        "It throws an error",
        "It encodes it as the most frequent category",
        "It produces a row of all zeros for that feature",
        "It adds a new column dynamically",
      ],
      correctAnswer: 2,
      explanation:
        "It produces an all-zero vector for that feature's encoded columns. This 'ignores' the unknown category safely without crashing the system.",
      difficulty: "medium",
    },
    {
      id: "dv-q4",
      question: "What does \`dvc add data.csv\` do?",
      options: [
        "Uploads the file to GitHub",
        "Compresses the file",
        "Creates a pointer file (.dvc) and adds the original to .gitignore",
        "Deletes the file",
      ],
      correctAnswer: 2,
      explanation:
        "DVC takes control of the large file (adding it to .gitignore so Git ignores it) and creates a small metadata file (.dvc) for Git to track instead.",
      difficulty: "medium",
    },
    {
      id: "dv-q5",
      question:
        "In a Scikit-learn pipeline, why do we use \`fit\` on training data and only \`transform\` on test data?",
      options: [
        "To save time",
        "To prevent data leakage",
        "Because \`fit\` doesn't work on test data",
        "It doesn't matter, both work",
      ],
      correctAnswer: 1,
      explanation:
        "Data leakage occurs if information from the test set (like its mean or variance) influences the model training. We must learn parameters (mean, std) ONLY from training data.",
      difficulty: "hard",
    },
    {
      id: "dv-q6",
      question: "What is 'Drift' in the context of production data systems?",
      options: [
        "When the code changes but data stays the same",
        "When the statistical properties of data change over time",
        "When the model training takes longer than expected",
        "When data is lost during transmission",
      ],
      correctAnswer: 1,
      explanation:
        "Drift refers to changes in the statistical properties of the data (e.g., input distribution) over time, which can degrade model performance.",
      difficulty: "easy",
    },
    {
      id: "dv-q7",
      question: "In a Pandera schema, what does setting 'strict=True' ensure?",
      options: [
        "It automatically converts data types",
        "It forces all columns to be non-nullable",
        "It rejects any columns in the dataframe that are not defined in the schema",
        "It stops validation immediately upon finding an error",
      ],
      correctAnswer: 2,
      explanation:
        "Setting strict=True ensures that the dataframe contains ONLY the columns defined in the schema, rejecting any unexpected extra columns.",
      difficulty: "medium",
    },
    {
      id: "dv-q8",
      question: "What is the primary function of 'dvc repro'?",
      options: [
        "To upload data to S3",
        "To install missing Python packages",
        "To reproduce the pipeline using exact versions of data, code, and parameters",
        "To initialize a new DVC project",
      ],
      correctAnswer: 2,
      explanation:
        "'dvc repro' checks dependency hashes and re-runs only the steps that have changed, guaranteeing that outputs are produced by the tracked versions of inputs.",
      difficulty: "medium",
    },
    {
      id: "dv-q9",
      question: "What is a 'Data Contract'?",
      options: [
        "A formal agreement between data producers and consumers about the data structure",
        "A Python script that validates data types",
        "A legal document for purchasing data",
        "A file that stores model hyperparameters",
      ],
      correctAnswer: 0,
      explanation:
        "A Data Contract is an agreement (often enforced by schemas) that ensures upstream data producers don't break downstream consumers by changing data structures unexpectedly.",
      difficulty: "easy",
    },
    {
      id: "dv-q10",
      question: "Which practice helps prevent 'Training-Serving Skew'?",
      options: [
        "Manually copying preprocessing code to the production server",
        "Using different libraries for training and inference",
        "Encapsulating all preprocessing and modeling steps into a single Pipeline object",
        "Training on the entire dataset without a test split",
      ],
      correctAnswer: 2,
      explanation:
        "Encapsulating steps in a Pipeline ensures that the exact same transformations (imputation, scaling, encoding) and learned parameters are applied during both training and inference.",
      difficulty: "hard",
    },
  ],
};
