import { LearningModule } from "@/types/learning";

export const reproducibleTrainingModule: LearningModule = {
  id: "reproducible-training",
  title: "Module 3: Reproducible Training",
  description:
    "Master reproducible ML workflows: Build DVC-driven pipelines, track experiments with MLflow, and tune models for real-world impact.",
  status: "in-progress",
  detailedContent: `# Reproducible Training: ML Pipelines & Experiment Tracking

Building a model is easy. Building the *same* model six months later, or comparing it rigorously against 50 experiments, is hard. This module tackles the core challenges of production ML training.

## What You'll Learn

| # | Topic | Skill |
|:--|:------|:------|
| 1 | **Experiment Tracking** | Log parameters, metrics, and artifacts with MLflow |
| 2 | **DVC Pipelines** | Define multi-stage, reproducible ML workflows |
| 3 | **Model Training** | Configure and train LightGBM models |
| 4 | **Model Evaluation** | Precision, Recall, F1, and threshold tuning |
| 5 | **Model Persistence** | Serialize and version model artifacts |

## The Problem with Manual Training

Without systematic tracking and automation, ML training quickly becomes chaotic:

- **Lack of Reproducibility**: "What hyperparameters produced this model?" becomes unanswerable.
- **Experiment Chaos**: Comparing 50 training runs stored in scattered notebooks is impossible.
- **Dependency Hell**: Which exact version of preprocessed data trained this model?
- **Silent Failures**: A "successful" training run might use the wrong data version.

## Key Terms & Definitions

**Experiment Tracking:**
- **Run**: A single execution of a training script with specific parameters.
- **Experiment**: A collection of related runs (e.g., "LightGBM Hyperparameter Sweep").
- **Artifact**: Any file produced by a run (model weights, plots, logs).
- **Metric**: A numerical value measuring model performance (accuracy, loss).

**Pipeline Terms:**
- **Stage**: A single step in a pipeline (data prep, train, evaluate).
- **DAG**: Directed Acyclic Graph - the dependency structure of your pipeline.
- **Reproducibility**: Ability to recreate exact outputs from code + data + parameters.

---

## 1. Experiment Tracking with MLflow

**Why This Matters:**

Running a training script 100 times with different hyperparameters generates chaos without tracking. MLflow provides a centralized, queryable record of every training run.

### Setting Up MLflow

\`\`\`python
import mlflow

# Configure tracking server (local file or remote server)
mlflow.set_tracking_uri("file:///path/to/mlruns")  # Local
# mlflow.set_tracking_uri("http://mlflow-server:5000")  # Remote

# Create or set an experiment
mlflow.set_experiment("bank-marketing-classifier")
\`\`\`

### Logging Parameters, Metrics, and Artifacts

\`\`\`python
import mlflow
from dataclasses import dataclass, asdict

@dataclass
class TrainingParams:
    """Centralized hyperparameter configuration"""
    n_estimators: int = 150
    learning_rate: float = 0.1
    num_leaves: int = 31
    max_depth: int = -1  # No limit
    
    def to_dict(self):
        return asdict(self)

def train_model(X_train, y_train, params: TrainingParams):
    # Start an MLflow run (all logging happens within this context)
    with mlflow.start_run():
        # 1. Log hyperparameters
        mlflow.log_params(params.to_dict())
        
        # 2. Train model
        model = lgb.LGBMClassifier(
            random_state=42,
            **params.to_dict()
        )
        model.fit(X_train, y_train)
        
        # 3. Log metrics
        train_accuracy = model.score(X_train, y_train)
        mlflow.log_metric("train_accuracy", train_accuracy)
        
        # 4. Log model artifact
        mlflow.sklearn.log_model(model, "model")
        
        # 5. Log custom artifacts (plots, configs)
        mlflow.log_artifact("config.yaml")
        
        return model
\`\`\`

### Viewing Experiments

Launch the MLflow UI to compare experiments:

\`\`\`bash
mlflow server --host 127.0.0.1 --port 8080
\`\`\`

Navigate to \`http://localhost:8080\` to:
- Compare runs side-by-side
- Sort by metrics (accuracy, loss)
- Filter by parameters
- Download artifacts

**Key Insight:** The MLflow UI eliminates "which notebook had the best model?" confusion.

---

## 2. DVC Pipelines for Reproducibility

**Why This Matters:**

DVC (Data Version Control) defines your ML workflow as a **Directed Acyclic Graph (DAG)**. Each stage has explicit inputs, outputs, and dependencies. Running \`dvc repro\` guarantees exact reproducibility.

### Defining a Pipeline (\`dvc.yaml\`)

\`\`\`yaml
stages:
  # Stage 1: Data Processing
  prepare:
    cmd: python src/prepare.py data/raw.csv
    deps:
      - data/raw.csv
      - src/prepare.py
    outs:
      - data/processed/train.parquet
      - data/processed/test.parquet
    params:
      - prepare.test_size
      - prepare.random_state

  # Stage 2: Model Training
  train:
    cmd: python src/train.py
    deps:
      - data/processed/train.parquet
      - src/train.py
      - src/params.py
    outs:
      - models/model.pkl
    params:
      - train.n_estimators
      - train.learning_rate

  # Stage 3: Evaluation
  evaluate:
    cmd: python src/evaluate.py
    deps:
      - models/model.pkl
      - data/processed/test.parquet
      - src/evaluate.py
    outs:
      - reports/metrics.json
      - reports/confusion_matrix.png
    metrics:
      - reports/metrics.json:
          cache: false
\`\`\`

### Running the Pipeline

\`\`\`bash
# Reproduce the entire pipeline
dvc repro

# Only run if dependencies changed (smart caching)
dvc repro train  # Only runs train stage if deps changed

# Visualize the DAG
dvc dag
\`\`\`

**Output of \`dvc dag\`:**

\`\`\`
+---------+
| prepare |
+---------+
     *
     *
     *
 +-------+
 | train |
 +-------+
     *
     *
     *
+----------+
| evaluate |
+----------+
\`\`\`

### DVC Lock File

After \`dvc repro\`, DVC generates \`dvc.lock\` containing **hashes of all inputs and outputs**. This is your reproducibility guarantee:

\`\`\`yaml
# dvc.lock (auto-generated)
stages:
  train:
    cmd: python src/train.py
    deps:
    - path: data/processed/train.parquet
      hash: md5
      md5: a1b2c3d4e5f6...  # Exact data version
    - path: src/train.py
      hash: md5
      md5: 1a2b3c4d5e6f...  # Exact code version
    outs:
    - path: models/model.pkl
      hash: md5
      md5: deadbeef1234...  # Reproducible output
\`\`\`

---

## 3. Training with LightGBM

**Why LightGBM?**

LightGBM is a gradient boosting framework optimized for speed and efficiency:
- **Leaf-wise growth**: Finds the best split globally (vs. level-wise).
- **Histogram-based**: Bins continuous features for faster computation.
- **Native categorical support**: No need for one-hot encoding.

### Structured Training Code

\`\`\`python
import lightgbm as lgb
import joblib
from pathlib import Path
from dataclasses import dataclass, asdict

@dataclass
class LGBMParams:
    """Hyperparameters for LightGBM Classifier"""
    n_estimators: int = 200
    learning_rate: float = 0.05
    num_leaves: int = 31
    max_depth: int = -1
    min_child_samples: int = 20
    subsample: float = 0.8
    colsample_bytree: float = 0.8
    reg_alpha: float = 0.1  # L1 regularization
    reg_lambda: float = 0.1  # L2 regularization
    random_state: int = 42
    
    def to_dict(self):
        return asdict(self)


def train(data_dir: Path, models_dir: Path) -> lgb.LGBMClassifier:
    """Train LightGBM model with MLflow tracking"""
    import mlflow
    
    mlflow.set_experiment("bank-marketing")
    params = LGBMParams()
    
    with mlflow.start_run():
        # Log all hyperparameters
        mlflow.log_params(params.to_dict())
        
        # Load data
        train_df = pd.read_parquet(data_dir / "train.parquet")
        X_train = train_df.drop("target", axis=1)
        y_train = train_df["target"]
        
        # Initialize and train
        model = lgb.LGBMClassifier(**params.to_dict())
        model.fit(
            X_train, y_train,
            callbacks=[lgb.early_stopping(50, verbose=False)]
        )
        
        # Save model
        models_dir.mkdir(parents=True, exist_ok=True)
        model_path = models_dir / "model.pkl"
        joblib.dump(model, model_path)
        
        # Log artifact to MLflow
        mlflow.log_artifact(model_path)
        
    return model
\`\`\`

### Key Hyperparameters

| Parameter | Purpose | Typical Range |
|:----------|:--------|:--------------|
| \`n_estimators\` | Number of boosting rounds | 100-1000 |
| \`learning_rate\` | Step size shrinkage | 0.01-0.3 |
| \`num_leaves\` | Max leaves per tree | 20-100 |
| \`max_depth\` | Tree depth limit | 3-15 or -1 |
| \`subsample\` | Row sampling ratio | 0.5-1.0 |
| \`colsample_bytree\` | Feature sampling ratio | 0.5-1.0 |
| \`reg_alpha\` | L1 regularization | 0-1 |
| \`reg_lambda\` | L2 regularization | 0-1 |

**Overfitting Prevention:**
- Lower \`num_leaves\` and \`max_depth\`
- Increase \`min_child_samples\`
- Use \`subsample\` and \`colsample_bytree\` < 1.0
- Add regularization (\`reg_alpha\`, \`reg_lambda\`)
- Enable early stopping with validation data

---

## 4. Model Evaluation with Threshold Tuning

**Why Threshold Tuning?**

Classification models output probabilities. The default threshold (0.5) is often **suboptimal for imbalanced data** or when error costs are asymmetric.

### The Business Context

Consider a bank marketing prediction task:
- **False Positive (FP)**: Predict "subscribe" when customer won't → Wasted marketing cost
- **False Negative (FN)**: Predict "no subscribe" when customer would → Lost revenue

If missing a customer (FN) costs more than wasted outreach (FP), we should **lower the threshold** to catch more true positives.

### Metrics Refresher

| Metric | Formula | Interpretation |
|:-------|:--------|:---------------|
| **Precision** | TP / (TP + FP) | "Of predicted positives, how many are correct?" |
| **Recall** | TP / (TP + FN) | "Of actual positives, how many did we find?" |
| **F1 Score** | 2 × (P × R) / (P + R) | Harmonic mean of Precision and Recall |

### Finding Optimal Threshold

\`\`\`python
from sklearn.metrics import precision_recall_curve
import numpy as np

def find_optimal_threshold(y_true, y_proba):
    """Find threshold that maximizes F1 score"""
    precisions, recalls, thresholds = precision_recall_curve(y_true, y_proba)
    
    # Calculate F1 for each threshold
    f1_scores = np.where(
        (precisions[:-1] + recalls[:-1]) > 0,
        2 * (precisions[:-1] * recalls[:-1]) / (precisions[:-1] + recalls[:-1]),
        0
    )
    
    # Find optimal threshold
    optimal_idx = np.argmax(f1_scores)
    optimal_threshold = thresholds[optimal_idx]
    optimal_f1 = f1_scores[optimal_idx]
    
    print(f"Optimal Threshold: {optimal_threshold:.4f}")
    print(f"Maximum F1 Score: {optimal_f1:.4f}")
    
    return optimal_threshold
\`\`\`

### Applying Custom Threshold

\`\`\`python
from sklearn.calibration import FixedThresholdClassifier

def evaluate(model, X_test, y_test):
    """Evaluate model with optimized threshold"""
    import mlflow
    
    # Get probabilities for positive class
    y_proba = model.predict_proba(X_test)[:, 1]
    
    # Find optimal threshold
    optimal_threshold = find_optimal_threshold(y_test, y_proba)
    
    # Wrap model with fixed threshold
    calibrated_model = FixedThresholdClassifier(
        model, 
        threshold=optimal_threshold
    )
    
    # Predict with optimized threshold
    y_pred = (y_proba >= optimal_threshold).astype(int)
    
    # Calculate metrics
    from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
    
    metrics = {
        "optimal_threshold": optimal_threshold,
        "accuracy": accuracy_score(y_test, y_pred),
        "precision": precision_score(y_test, y_pred),
        "recall": recall_score(y_test, y_pred),
        "f1": f1_score(y_test, y_pred)
    }
    
    # Log to MLflow
    with mlflow.start_run():
        mlflow.log_metrics(metrics)
        
    return metrics, calibrated_model
\`\`\`

### Threshold Impact

| Threshold | Precision | Recall | Trade-off |
|:----------|:----------|:-------|:----------|
| 0.5 (default) | High | Low | Conservative - misses positives |
| 0.3 (lowered) | Lower | Higher | Aggressive - catches more positives |
| 0.7 (raised) | Higher | Lower | Very conservative |

---

## 5. Model Persistence with Joblib

**Why Joblib over Pickle?**

\`joblib\` is optimized for large NumPy arrays common in ML models:
- Faster serialization
- Memory mapping support
- Better compression

### Saving and Loading Models

\`\`\`python
import joblib
from pathlib import Path

def save_model(model, path: Path | str):
    """Persist model to disk"""
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(model, path)
    print(f"Model saved to {path}")

def load_model(path: Path | str):
    """Load model from disk"""
    return joblib.load(path)

# Usage
save_model(trained_model, "artifacts/models/model.pkl")
loaded_model = load_model("artifacts/models/model.pkl")
\`\`\`

### Reproducibility Considerations

**Critical for Production:**
1. **Pin versions**: Use exact library versions (\`scikit-learn==1.4.0\`)
2. **Same environment**: Train and inference environments must match
3. **Random seeds**: Set \`random_state\` in all components
4. **Track dependencies**: Include \`requirements.txt\` as DVC dependency

\`\`\`python
# Always set random seeds
import numpy as np
import random

def seed_everything(seed: int = 42):
    np.random.seed(seed)
    random.seed(seed)
    # For LightGBM, use random_state parameter
\`\`\`

---

## TL;DR - Quick Recall

**Key Takeaways:**

- **MLflow**: Use \`mlflow.log_params()\`, \`mlflow.log_metric()\`, and \`mlflow.log_artifact()\` within \`with mlflow.start_run():\`
- **DVC Pipelines**: Define stages in \`dvc.yaml\` with \`deps\`, \`outs\`, and \`params\`
- **Reproducibility**: \`dvc repro\` + \`dvc.lock\` guarantees exact recreation
- **LightGBM**: Use dataclasses for hyperparameters, early stopping for overfitting
- **Threshold Tuning**: Default 0.5 is rarely optimal for imbalanced data
- **Joblib**: Preferred over pickle for ML model serialization

<details>
<summary><strong>Quick Commands Reference (Click to Expand)</strong></summary>

\`\`\`python
# MLflow Tracking
import mlflow
mlflow.set_experiment("my-experiment")
with mlflow.start_run():
    mlflow.log_params({"lr": 0.01})
    mlflow.log_metric("accuracy", 0.95)
    mlflow.log_artifact("model.pkl")

# LightGBM Training
import lightgbm as lgb
model = lgb.LGBMClassifier(n_estimators=200, learning_rate=0.05)
model.fit(X_train, y_train)

# Model Persistence
import joblib
joblib.dump(model, "model.pkl")
model = joblib.load("model.pkl")

# Threshold Tuning
from sklearn.metrics import precision_recall_curve
precisions, recalls, thresholds = precision_recall_curve(y_true, y_proba)
\`\`\`

\`\`\`bash
# DVC Commands
dvc repro          # Run pipeline
dvc dag            # Visualize pipeline
dvc push           # Push data to remote
mlflow server      # Start MLflow UI
\`\`\`
</details>

**The Production Mantra:**
> "If you can't reproduce it, you can't deploy it."

---

## Additional Resources

**Documentation:**
- [MLflow Documentation](https://mlflow.org/docs/latest/index.html) - Comprehensive experiment tracking guide
- [DVC Documentation](https://dvc.org/doc) - Pipeline definition and data versioning
- [LightGBM Documentation](https://lightgbm.readthedocs.io/) - Parameters and tuning guide
- [Scikit-learn Model Persistence](https://scikit-learn.org/stable/model_persistence.html) - Official serialization guide

**Tools:**
- **Optuna**: Hyperparameter optimization framework
- **Weights & Biases**: Alternative to MLflow for experiment tracking
- **Hydra**: Configuration management for ML experiments
`,
  subModules: [],
  practiceQuiz: [
    {
      id: "rt-q1",
      question: "What is the primary purpose of MLflow in ML workflows?",
      options: [
        "To replace Git for code versioning",
        "To track experiments, parameters, metrics, and artifacts",
        "To train models faster",
        "To deploy models to production",
      ],
      correctAnswer: 1,
      explanation:
        "MLflow provides a centralized system to log and compare parameters, metrics, and artifacts across many training runs, making experiment management systematic.",
      difficulty: "easy",
    },
    {
      id: "rt-q2",
      question: "What does 'dvc repro' do?",
      options: [
        "Deletes all cached data",
        "Reproduces the pipeline by running stages with changed dependencies",
        "Uploads data to cloud storage",
        "Creates a new Git branch",
      ],
      correctAnswer: 1,
      explanation:
        "'dvc repro' checks dependency hashes and only re-runs stages where inputs (code, data, parameters) have changed, ensuring reproducible outputs.",
      difficulty: "medium",
    },
    {
      id: "rt-q3",
      question:
        "Why is threshold tuning important for imbalanced classification?",
      options: [
        "It makes the model train faster",
        "The default 0.5 threshold is often suboptimal when classes have different costs",
        "It increases the dataset size",
        "It's required by scikit-learn",
      ],
      correctAnswer: 1,
      explanation:
        "When error costs are asymmetric (e.g., missing a customer costs more than wasted outreach), adjusting the decision threshold can optimize for the business objective.",
      difficulty: "medium",
    },
    {
      id: "rt-q4",
      question: "What is the purpose of the 'dvc.lock' file?",
      options: [
        "To encrypt sensitive data",
        "To lock users out of the repository",
        "To store exact hashes of all pipeline inputs and outputs for reproducibility",
        "To prevent code changes",
      ],
      correctAnswer: 2,
      explanation:
        "dvc.lock contains MD5 hashes of all dependencies and outputs, providing a cryptographic guarantee that the exact same inputs produced the tracked outputs.",
      difficulty: "medium",
    },
    {
      id: "rt-q5",
      question:
        "Which LightGBM parameter controls the number of boosting iterations?",
      options: ["max_depth", "num_leaves", "n_estimators", "learning_rate"],
      correctAnswer: 2,
      explanation:
        "'n_estimators' (or 'num_iterations') sets the number of boosting rounds. More iterations can improve accuracy but risk overfitting.",
      difficulty: "easy",
    },
    {
      id: "rt-q6",
      question: "Why is joblib preferred over pickle for ML models?",
      options: [
        "It's more secure",
        "It's optimized for large NumPy arrays with faster serialization",
        "It's built into Python",
        "It compresses files to zero bytes",
      ],
      correctAnswer: 1,
      explanation:
        "Joblib is specifically optimized for objects containing large NumPy arrays (common in ML models), offering faster serialization and memory mapping support.",
      difficulty: "medium",
    },
    {
      id: "rt-q7",
      question: "What is a 'Run' in MLflow terminology?",
      options: [
        "A complete ML project",
        "A single execution of a training script with specific parameters",
        "A Git commit",
        "A deployment to production",
      ],
      correctAnswer: 1,
      explanation:
        "A Run represents one execution of your training code. Each run captures its parameters, metrics, and artifacts, allowing comparison across experiments.",
      difficulty: "easy",
    },
    {
      id: "rt-q8",
      question:
        "How does lowering the classification threshold affect metrics?",
      options: [
        "Increases precision, decreases recall",
        "Decreases precision, increases recall",
        "Increases both precision and recall",
        "Has no effect on metrics",
      ],
      correctAnswer: 1,
      explanation:
        "Lowering the threshold makes the model predict 'positive' more often, catching more true positives (higher recall) but also more false positives (lower precision).",
      difficulty: "hard",
    },
    {
      id: "rt-q9",
      question:
        "In a DVC pipeline, what does the 'deps' field in a stage specify?",
      options: [
        "The output files of the stage",
        "The deployment configuration",
        "The input files and scripts the stage depends on",
        "The Python dependencies to install",
      ],
      correctAnswer: 2,
      explanation:
        "'deps' lists files that the stage reads or uses. If any dependency changes (different hash), DVC knows to re-run that stage.",
      difficulty: "medium",
    },
    {
      id: "rt-q10",
      question:
        "What is the recommended practice for ensuring ML reproducibility across environments?",
      options: [
        "Using the latest library versions",
        "Pinning exact library versions and setting random seeds",
        "Avoiding version control",
        "Training on different machines each time",
      ],
      correctAnswer: 1,
      explanation:
        "Pinning exact versions (e.g., scikit-learn==1.4.0) and setting random_state ensures the same code produces the same results across different runs and machines.",
      difficulty: "hard",
    },
  ],
};
