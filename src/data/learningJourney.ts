import { LearningModule } from "@/types/learning";

export const learningModules: LearningModule[] = [
  {
    id: "module-1",
    title: "AI Engineering Foundations",
    description:
      "Master the essential tools and environment setup for professional AI development",
    status: "in-progress",
    detailedContent: `
Why Study This Module:
Before building AI systems, you need a solid foundation of professional development tools. These tools are used by every AI engineer in the industry and form the backbone of modern software development.

What I Learned by Completing This:
• Version control workflows with Git for managing code changes
• Containerization with Docker for consistent environments across teams
• Python environment management with uv for fast, reliable dependency handling
• Data versioning with DVC to track large datasets without bloating repositories
• Experiment tracking with MLflow to compare model performance systematically
• Professional IDE setup for productive AI development

Real-World Importance:
In production AI systems at companies, these tools are non-negotiable:
- Git ensures team collaboration without code conflicts
- Docker eliminates "works on my machine" problems in deployment
- DVC manages terabytes of training data with version control
- MLflow tracks thousands of experiments to find the best models
- Proper tooling separates amateur projects from production-ready systems
    `,
    subModules: [
      {
        id: "module-1-1",
        title: "The Command-Line Toolkit",
        description:
          "Install Git and Docker for version control and reproducible environments",
        status: "in-progress",
        resources: [
          {
            title: "Git Official Documentation",
            url: "https://git-scm.com/doc",
            type: "documentation",
          },
          {
            title: "Docker Get Started Guide",
            url: "https://docs.docker.com/get-started/",
            type: "documentation",
          },
          {
            title: "Learn Git Branching (Interactive)",
            url: "https://learngitbranching.js.org/",
            type: "tutorial",
          },
        ],
      },
      {
        id: "module-1-2",
        title: "Python and Project Initialization",
        description:
          "Set up uv, DVC, and MLflow for professional Python project management",
        status: "in-progress",
        resources: [
          {
            title: "uv Documentation",
            url: "https://docs.astral.sh/uv/",
            type: "documentation",
          },
          {
            title: "DVC Get Started",
            url: "https://dvc.org/doc/start",
            type: "tutorial",
          },
          {
            title: "MLflow Quickstart",
            url: "https://mlflow.org/docs/latest/getting-started/intro-quickstart/index.html",
            type: "tutorial",
          },
        ],
      },
      {
        id: "module-1-3",
        title: "IDE and Environment Verification",
        description:
          "Configure VS Code/Cursor and verify your complete development toolchain",
        status: "not-started",
        resources: [
          {
            title: "VS Code Python Tutorial",
            url: "https://code.visualstudio.com/docs/python/python-tutorial",
            type: "tutorial",
          },
          {
            title: "Cursor Documentation",
            url: "https://cursor.sh/docs",
            type: "documentation",
          },
        ],
      },
    ],
  },
  {
    id: "module-2",
    title: "AI/ML Foundations",
    description:
      "Build core Python and mathematical foundations for AI engineering",
    status: "in-progress",
    detailedContent: `
Why Study This Module:
Before diving into neural networks and complex AI models, you need to master the Python tools and patterns that AI engineers use daily. This module focuses on practical skills that will make you more productive and your code more reliable.

What You'll Learn:
• Python data structures optimized for AI workloads
• Functional programming patterns for data processing
• Type-safe code for production AI systems
• NumPy and Pandas for numerical computing and data analysis
• Clean file handling and configuration management

Real-World Importance:
Every AI project starts with data wrangling, preprocessing, and pipeline building. The difference between hobby projects and production systems is clean, maintainable Python code. Master these foundations and you'll debug faster, build cleaner pipelines, and ship more reliable AI systems.
    `,
    subModules: [
      {
        id: "module-2-1",
        title: "Python Essentials for AI Engineering",
        description:
          "Master Python data structures, functional tricks, typing, JSON, pathlib, NumPy, and Pandas - all distilled for machine-learning engineers",
        status: "in-progress",
        resources: [
          {
            title: "Tuples: Immutable Data Collections",
            url: "https://realpython.com/python-tuples/",
            type: "article",
          },
          {
            title: "Sets: Unique Elements and Set Operations",
            url: "https://realpython.com/python-sets/",
            type: "article",
          },
          {
            title: "Dictionaries: Fast Key-Value Lookups",
            url: "https://realpython.com/python-dicts/",
            type: "article",
          },
          {
            title: "List Comprehensions Explained",
            url: "https://realpython.com/list-comprehension-python/",
            type: "article",
          },
          {
            title: "Python Type Hints and Typing Module",
            url: "https://realpython.com/python-type-checking/",
            type: "article",
          },
          {
            title: "Type Hints Cheat Sheet (mypy)",
            url: "https://mypy.readthedocs.io/en/stable/cheat_sheet_py3.html",
            type: "documentation",
          },
          {
            title: "Python Typing Module - Official Docs",
            url: "https://docs.python.org/3/library/typing.html",
            type: "documentation",
          },
          {
            title: "Working with JSON in Python",
            url: "https://realpython.com/python-json/",
            type: "article",
          },
          {
            title: "JSON Module - Official Documentation",
            url: "https://docs.python.org/3/library/json.html",
            type: "documentation",
          },
          {
            title: "Pathlib: Modern Path Handling",
            url: "https://realpython.com/python-pathlib/",
            type: "article",
          },
          {
            title: "pathlib - Official Documentation",
            url: "https://docs.python.org/3/library/pathlib.html",
            type: "documentation",
          },
          {
            title: "NumPy Quickstart",
            url: "https://numpy.org/doc/stable/user/quickstart.html",
            type: "tutorial",
          },
          {
            title: "Pandas 10 Minutes to Pandas",
            url: "https://pandas.pydata.org/docs/user_guide/10min.html",
            type: "tutorial",
          },
          {
            title: "Functional Programming in Python",
            url: "https://realpython.com/python-functional-programming/",
            type: "article",
          },
          {
            title: "Python Lambda Functions",
            url: "https://realpython.com/python-lambda/",
            type: "article",
          },
          {
            title: "Python map() Function",
            url: "https://realpython.com/python-map-function/",
            type: "article",
          },
          {
            title: "Python filter() Function",
            url: "https://realpython.com/python-filter-function/",
            type: "article",
          },
          {
            title: "Python Dataclasses Guide",
            url: "https://realpython.com/python-data-classes/",
            type: "article",
          },
          {
            title: "Dataclasses - Official Documentation",
            url: "https://docs.python.org/3/library/dataclasses.html",
            type: "documentation",
          },
        ],
      },
      {
        id: "module-2-2",
        title: "Mathematics is the Language of AI",
        description:
          "Build the mathematical foundation essential for understanding AI algorithms and models",
        status: "in-progress",
        resources: [
          {
            title: "Mathematics for AI - Complete Guide",
            url: "/mathematics",
            type: "course",
          },
        ],
      },
      {
        id: "module-2-3",
        title: "The Power of Linear Models",
        description:
          "Learn how and why to build strong, interpretable baselines: explore linear regression end-to-end, from feature scaling to evaluation, with hands-on notebooks and real data",
        status: "in-progress",
        resources: [
          {
            title: "Jupyter Notebook: An Introduction - Real Python",
            url: "https://realpython.com/jupyter-notebook-introduction/",
            type: "article",
          },
          {
            title: "Pandas DataFrame: Working with Data - Real Python",
            url: "https://realpython.com/pandas-dataframe/",
            type: "article",
          },
          {
            title: "Linear Regression in Python - Real Python",
            url: "https://realpython.com/linear-regression-in-python/",
            type: "article",
          },
          {
            title: "Train Test Split in Python - Real Python",
            url: "https://realpython.com/train-test-split-python-data/",
            type: "article",
          },
          {
            title:
              "Feature Scaling: StandardScaler, MinMaxScaler - Scikit-learn",
            url: "https://scikit-learn.org/stable/modules/preprocessing.html#standardization-or-mean-removal-and-variance-scaling",
            type: "documentation",
          },
          {
            title: "Model Evaluation: MSE, R² Score - Scikit-learn",
            url: "https://scikit-learn.org/stable/modules/model_evaluation.html#regression-metrics",
            type: "documentation",
          },
          {
            title: "Pipeline: Chaining Estimators - Scikit-learn",
            url: "https://scikit-learn.org/stable/modules/compose.html#pipeline",
            type: "documentation",
          },
          {
            title: "Interpreting Linear Regression Coefficients - Real Python",
            url: "https://realpython.com/linear-regression-in-python/#regression-performance",
            type: "article",
          },
          {
            title: "Google ML Crash Course: Linear Regression",
            url: "https://developers.google.com/machine-learning/crash-course/linear-regression",
            type: "course",
          },
          {
            title: "Build Your First ML Model: Linear Regression with Python",
            url: "https://superml.org/tutorials/linear-regression-beginner",
            type: "tutorial",
          },
          {
            title: "Sklearn Linear Regression: Complete Guide with Examples",
            url: "https://www.datacamp.com/tutorial/sklearn-linear-regression",
            type: "tutorial",
          },
          {
            title: "Feature Engineering in Machine Learning",
            url: "https://www.datacamp.com/tutorial/feature-engineering",
            type: "article",
          },
          {
            title: "StatQuest: Linear Regression, Clearly Explained",
            url: "https://www.youtube.com/watch?v=nk2CQITm_eo",
            type: "video",
          },
          {
            title: "StatQuest: Logistic Regression, Clearly Explained",
            url: "https://www.youtube.com/watch?v=yIYKR4sgzI8",
            type: "video",
          },
          {
            title: "StatQuest: Regularization Part 1: Ridge (L2) Regression",
            url: "https://www.youtube.com/watch?v=Q81RR3yKn30",
            type: "video",
          },
          {
            title: "StatQuest: Regularization Part 2: Lasso (L1) Regression",
            url: "https://www.youtube.com/watch?v=NGf0voTMlcs",
            type: "video",
          },
          {
            title: "StatQuest: Regularization Part 3: Elastic Net Regression",
            url: "https://www.youtube.com/watch?v=1dKRdX9bfIo",
            type: "video",
          },
          {
            title: "Scikit-Learn: Regularization Documentation",
            url: "https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification",
            type: "documentation",
          },
          {
            title: "Towards Data Science: Regularization in Machine Learning",
            url: "https://towardsdatascience.com/regularization-in-machine-learning-76441ddcf99a",
            type: "article",
          },
        ],
      },
      {
        id: "module-2-4",
        title: "PyTorch: Deep Learning Framework",
        description:
          "Master PyTorch, the go-to deep learning framework for research and production. Learn tensors, neural networks, and GPU acceleration.",
        status: "not-started",
        detailedContent: `# PyTorch

PyTorch is an open-source machine learning library developed by Meta AI. It provides tensor computation and deep neural networks with GPU acceleration. PyTorch is widely used in both research and production environments due to its flexibility and intuitive design.

### Key Concepts in PyTorch:
- **Tensors**: Multi-dimensional arrays that can be processed on CPU or GPU
- **Autograd**: Automatic differentiation for gradient computation
- **nn.Module**: Base class for neural network modules
- **Optimizers**: Algorithms for updating model parameters during training
- **DataLoader**: Efficient data loading and batching for training loops

### PyTorch Optimizers: The Engine of Learning

PyTorch optimizers automate the process of updating model weights to minimize the loss function. They take gradients computed by autograd and intelligently update parameters to improve model performance.

#### Essential Optimizer Workflow

The typical training loop follows this pattern:

\`\`\`python
# 1. Create optimizer with model parameters and learning rate
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

# 2. Training loop
for batch in dataloader:
    # Clear old gradients to prevent accumulation
    optimizer.zero_grad()

    # Forward pass
    outputs = model(inputs)
    loss = criterion(outputs, targets)

    # Compute gradients using autograd
    loss.backward()

    # Update model parameters
    optimizer.step()
\`\`\`

**Critical Rule**: Always call \`optimizer.zero_grad()\` before \`loss.backward()\` and \`optimizer.step()\`. Forgetting to call \`zero_grad()\` causes gradients to accumulate across batches, leading to incorrect updates - one of the most common bugs in PyTorch training loops.

#### Common PyTorch Optimizers

**SGD (Stochastic Gradient Descent)**:
- Basic optimizer that updates parameters in the direction opposite to the gradient
- Can include momentum for faster convergence
- Simple but can be slow for complex problems

**Adam (Adaptive Moment Estimation)**:
- The recommended default choice for most applications
- Adapts learning rates automatically for different parameter scales
- Combines benefits of momentum and adaptive learning rates
- Very effective and robust to hyperparameter choices

**RMSprop (Root Mean Square Propagation)**:
- Particularly effective for recurrent neural networks (RNNs) like LSTMs and GRUs
- Adapts learning rates based on recent gradient magnitudes
- Good for non-stationary objectives

**AdamW**:
- An improvement over Adam that decouples weight decay
- Better for large models like BERT and GPT
- Provides more stable regularization

#### Optimizer Selection Guide

- **Adam/AdamW**: Default choice for most deep learning tasks - robust and adaptive
- **SGD with momentum**: When you need fine control over training dynamics
- **RMSprop**: For RNNs and problems with non-stationary objectives
- **AdamW**: For large transformer models and when using weight decay
`,
        resources: [
          {
            title: "PyTorch Official Tutorial",
            url: "https://pytorch.org/tutorials/",
            type: "tutorial",
          },
          {
            title: "PyTorch Learn the Basics",
            url: "https://pytorch.org/tutorials/beginner/basics/quickstart_tutorial.html",
            type: "tutorial",
          },
          {
            title: "Deep Learning with PyTorch: A 60 Minute Blitz",
            url: "https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html",
            type: "tutorial",
          },
          {
            title: "PyTorch Tensors Documentation",
            url: "https://pytorch.org/docs/stable/tensors.html",
            type: "documentation",
          },
          {
            title: "PyTorch Neural Networks Tutorial",
            url: "https://pytorch.org/tutorials/beginner/blitz/neural_networks_tutorial.html",
            type: "tutorial",
          },
          {
            title: "What is torch.nn really?",
            url: "https://pytorch.org/tutorials/beginner/nn_tutorial.html",
            type: "tutorial",
          },
          {
            title: "Build the Neural Network - Official Tutorial",
            url: "https://pytorch.org/tutorials/beginner/basics/buildmodel_tutorial.html",
            type: "tutorial",
          },
          {
            title: "torch.nn.Module - Official Documentation",
            url: "https://pytorch.org/docs/stable/generated/torch.nn.Module.html",
            type: "documentation",
          },
          {
            title: "torch.nn.Linear - Official Documentation",
            url: "https://pytorch.org/docs/stable/generated/torch.nn.Linear.html",
            type: "documentation",
          },
          {
            title: "Model Parameters and Automatic Tracking",
            url: "https://pytorch.org/tutorials/beginner/basics/buildmodel_tutorial.html#model-parameters",
            type: "tutorial",
          },
          {
            title: "Moving Models Between CPU/GPU",
            url: "https://pytorch.org/docs/stable/generated/torch.nn.Module.html#torch.nn.Module.to",
            type: "documentation",
          },
          {
            title: "Train vs Eval Mode (Dropout & BatchNorm)",
            url: "https://pytorch.org/docs/stable/generated/torch.nn.Module.html#torch.nn.Module.train",
            type: "documentation",
          },
          {
            title: "Saving and Loading Models (state_dict)",
            url: "https://pytorch.org/tutorials/beginner/saving_loading_models.html",
            type: "tutorial",
          },
          {
            title: "Building Models with PyTorch",
            url: "https://pytorch.org/tutorials/beginner/pytorch_with_examples.html",
            type: "tutorial",
          },
          {
            title: "PyTorch 101 Crash Course For Beginners",
            url: "https://www.youtube.com/watch?v=LyJtbe__2i0",
            type: "video",
          },
          {
            title: "Automatic Differentiation (Dive into Deep Learning)",
            url: "https://d2l.ai/chapter_preliminaries/autograd.html",
            type: "tutorial",
          },
          {
            title: "Automatic Differentiation with torch.autograd",
            url: "https://pytorch.org/tutorials/beginner/blitz/autograd_tutorial.html",
            type: "tutorial",
          },
          {
            title: "Transfer Learning with PyTorch",
            url: "https://pytorch.org/tutorials/beginner/transfer_learning_tutorial.html",
            type: "tutorial",
          },
          {
            title: "PyTorch Performance Profiling",
            url: "https://pytorch.org/tutorials/intermediate/tensorboard_tutorial.html",
            type: "tutorial",
          },
          {
            title: "PyTorch Loss Functions: The Ultimate Guide",
            url: "https://neptune.ai/blog/pytorch-loss-functions",
            type: "article",
          },
          {
            title: "CrossEntropyLoss vs BCEWithLogitsLoss - When to Use Each",
            url: "https://discuss.pytorch.org/t/loss-function-crossentropyloss-vs-bcewithlogitsloss/16089",
            type: "article",
          },
          {
            title: "Understanding Cross-Entropy Loss in PyTorch",
            url: "https://www.educative.io/answers/what-is-cross-entropy-loss-in-pytorch",
            type: "article",
          },
          {
            title:
              "BCE, BCEWithLogits, CrossEntropy, and NLL Loss Functions Explained",
            url: "https://www.youtube.com/watch?v=3c4haTXsOAs",
            type: "video",
          },
          {
            title: "PyTorch Loss Functions Documentation",
            url: "https://pytorch.org/docs/stable/nn.html#loss-functions",
            type: "documentation",
          },
          {
            title: "PyTorch Optimizers Documentation",
            url: "https://pytorch.org/docs/stable/optim.html",
            type: "documentation",
          },
          {
            title: "Understanding Adam Optimizer",
            url: "https://towardsdatascience.com/understanding-optimizer-algorithms-adam-and-adamw-7fb948478709",
            type: "article",
          },
          {
            title: "PyTorch Optimization: A Complete Guide",
            url: "https://pytorch.org/tutorials/beginner/basics/optimization_tutorial.html",
            type: "tutorial",
          },
          {
            title: "Why You Need to Zero Gradients in PyTorch",
            url: "https://medium.com/@lazyprogrammerofficial/in-pytorch-why-do-we-need-to-call-optimizer-zero-grad-8e19fdc1ad2f",
            type: "article",
          },
          {
            title: "Gradient Descent Optimization Algorithms Explained",
            url: "https://ruder.io/optimizing-gradient-descent/",
            type: "article",
          },
        ],
      },
    ],
  },
];

// Calculate overall progress
export const calculateProgress = (modules: LearningModule[]) => {
  const completed = modules.filter((m) => m.status === "completed").length;
  const inProgress = modules.filter((m) => m.status === "in-progress").length;
  const total = modules.length;

  // Each module contributes to progress: completed = 100%, in-progress = 50%
  const progress = (completed * 100 + inProgress * 50) / total;

  return Math.round(progress);
};

export const getTotalHours = (modules: LearningModule[]) => {
  return modules.reduce((sum, m) => sum + (m.estimatedHours || 0), 0);
};

export const getCompletedHours = (modules: LearningModule[]) => {
  return modules
    .filter((m) => m.status === "completed")
    .reduce((sum, m) => sum + (m.estimatedHours || 0), 0);
};
