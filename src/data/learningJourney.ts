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
          },
          {
            title: 'Python Official Documentation',
            url: 'https://docs.python.org/3/',
            type: 'documentation'
          },
          {
            title: 'Lists: Your Go-To for Sequences',
            url: 'https://docs.python.org/3/tutorial/datastructures.html#more-on-lists',
            type: 'documentation'
          },
          {
            title: 'Tuples: Immutable Data Collections',
            url: 'https://realpython.com/python-tuples/',
            type: 'article'
          },
          {
            title: 'Sets: Unique Elements and Set Operations',
            url: 'https://realpython.com/python-sets/',
            type: 'article'
          },
          {
            title: 'Dictionaries: Fast Key-Value Lookups',
            url: 'https://realpython.com/python-dicts/',
            type: 'article'
          },
          {
            title: 'List Comprehensions Explained',
            url: 'https://realpython.com/list-comprehension-python/',
            type: 'article'
          },
          {
            title: 'Python Type Hints and Typing Module',
            url: 'https://realpython.com/python-type-checking/',
            type: 'article'
          },
          {
            title: 'Type Hints Cheat Sheet (mypy)',
            url: 'https://mypy.readthedocs.io/en/stable/cheat_sheet_py3.html',
            type: 'documentation'
          },
          {
            title: 'Python Typing Module - Official Docs',
            url: 'https://docs.python.org/3/library/typing.html',
            type: 'documentation'
          },
          {
            title: 'Type Hints for Busy Programmers',
            url: 'https://inventwithpython.com/blog/2019/11/24/type-hints-for-busy-python-programmers/',
            type: 'article'
          },
          {
            title: 'Working with JSON in Python',
            url: 'https://realpython.com/python-json/',
            type: 'article'
          },
          {
            title: 'JSON Module - Official Documentation',
            url: 'https://docs.python.org/3/library/json.html',
            type: 'documentation'
          },
          {
            title: 'JSON Encoding and Decoding in Python',
            url: 'https://www.geeksforgeeks.org/json-load-in-python/',
            type: 'tutorial'
          },
          {
            title: 'Pathlib: Modern Path Handling',
            url: 'https://realpython.com/python-pathlib/',
            type: 'article'
          },
          {
            title: 'NumPy Quickstart',
            url: 'https://numpy.org/doc/stable/user/quickstart.html',
            type: 'tutorial'
          },
          {
            title: 'NumPy for Absolute Beginners',
            url: 'https://numpy.org/doc/stable/user/absolute_beginners.html',
            type: 'tutorial'
          },
          {
            title: 'Pandas Getting Started',
            url: 'https://pandas.pydata.org/docs/getting_started/index.html',
            type: 'tutorial'
          },
          {
            title: 'Pandas 10 Minutes to Pandas',
            url: 'https://pandas.pydata.org/docs/user_guide/10min.html',
            type: 'tutorial'
          },
          {
            title: 'Functional Programming in Python',
            url: 'https://realpython.com/python-functional-programming/',
            type: 'article'
          },
          {
            title: 'Python Lambda Functions',
            url: 'https://realpython.com/python-lambda/',
            type: 'article'
          },
          {
            title: 'Python map() Function',
            url: 'https://realpython.com/python-map-function/',
            type: 'article'
          },
          {
            title: 'Python filter() Function',
            url: 'https://realpython.com/python-filter-function/',
            type: 'article'
          },
          {
            title: 'Lambda, Map, Filter in Python (GeeksforGeeks)',
            url: 'https://www.geeksforgeeks.org/python-lambda-anonymous-functions-filter-map-reduce/',
            type: 'tutorial'
          },
          {
            title: 'Python Lambda Functions - Official Docs',
            url: 'https://docs.python.org/3/tutorial/controlflow.html#lambda-expressions',
            type: 'documentation'
          },
          {
            title: 'Python Dataclasses Guide',
            url: 'https://realpython.com/python-data-classes/',
            type: 'article'
          },
          {
            title: 'Dataclasses - Official Documentation',
            url: 'https://docs.python.org/3/library/dataclasses.html',
            type: 'documentation'
          },
          {
            title: 'Python Dataclasses: When and How to Use',
            url: 'https://www.datacamp.com/tutorial/python-data-classes',
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
