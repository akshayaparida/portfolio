import { LearningModule } from '@/types/learning';

export const learningModules: LearningModule[] = [
  {
    id: 'module-1',
    title: 'AI Engineering Foundations',
    description: 'Master the essential tools and environment setup for professional AI development',
    status: 'in-progress',
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
        id: 'module-1-1',
        title: 'The Command-Line Toolkit',
        description: 'Install Git and Docker for version control and reproducible environments',
        status: 'in-progress',
        resources: [
          {
            title: 'Git Official Documentation',
            url: 'https://git-scm.com/doc',
            type: 'documentation'
          },
          {
            title: 'Docker Get Started Guide',
            url: 'https://docs.docker.com/get-started/',
            type: 'documentation'
          },
          {
            title: 'Learn Git Branching (Interactive)',
            url: 'https://learngitbranching.js.org/',
            type: 'tutorial'
          }
        ]
      },
      {
        id: 'module-1-2',
        title: 'Python and Project Initialization',
        description: 'Set up uv, DVC, and MLflow for professional Python project management',
        status: 'in-progress',
        resources: [
          {
            title: 'uv Documentation',
            url: 'https://docs.astral.sh/uv/',
            type: 'documentation'
          },
          {
            title: 'DVC Get Started',
            url: 'https://dvc.org/doc/start',
            type: 'tutorial'
          },
          {
            title: 'MLflow Quickstart',
            url: 'https://mlflow.org/docs/latest/getting-started/intro-quickstart/index.html',
            type: 'tutorial'
          }
        ]
      },
      {
        id: 'module-1-3',
        title: 'IDE and Environment Verification',
        description: 'Configure VS Code/Cursor and verify your complete development toolchain',
        status: 'not-started',
        resources: [
          {
            title: 'VS Code Python Tutorial',
            url: 'https://code.visualstudio.com/docs/python/python-tutorial',
            type: 'tutorial'
          },
          {
            title: 'Cursor Documentation',
            url: 'https://cursor.sh/docs',
            type: 'documentation'
          }
        ]
      }
    ]
  },
  {
    id: 'module-2',
    title: 'AI/ML Foundations',
    description: 'Build core Python and mathematical foundations for AI engineering',
    status: 'in-progress',
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
        id: 'module-2-1',
        title: 'Python Essentials for AI Engineering',
        description: 'Master Python data structures, functional tricks, typing, JSON, pathlib, NumPy, and Pandas - all distilled for machine-learning engineers',
        status: 'in-progress',
        resources: [
          {
            title: 'Python Essentials for AI Engineering - Interactive Tutorial',
            url: 'https://scrimba.com/learn/python',
            type: 'tutorial'
          }
          {
            title: 'Python Official Documentation',
            url: 'https://docs.python.org/3/',
            type: 'documentation'
          },
          {
            title: 'NumPy Quickstart',
            url: 'https://numpy.org/doc/stable/user/quickstart.html',
            type: 'tutorial'
          },
          {
            title: 'Pandas Getting Started',
            url: 'https://pandas.pydata.org/docs/getting_started/index.html',
            type: 'tutorial'
          }
        ]
      }
    ]
  }
];

// Calculate overall progress
export const calculateProgress = (modules: LearningModule[]) => {
  const completed = modules.filter(m => m.status === 'completed').length;
  const inProgress = modules.filter(m => m.status === 'in-progress').length;
  const total = modules.length;
  
  // Each module contributes to progress: completed = 100%, in-progress = 50%
  const progress = ((completed * 100) + (inProgress * 50)) / total;
  
  return Math.round(progress);
};

export const getTotalHours = (modules: LearningModule[]) => {
  return modules.reduce((sum, m) => sum + (m.estimatedHours || 0), 0);
};

export const getCompletedHours = (modules: LearningModule[]) => {
  return modules
    .filter(m => m.status === 'completed')
    .reduce((sum, m) => sum + (m.estimatedHours || 0), 0);
};
