import { LearningModule } from '@/types/learning';

// Define the specific module IDs for the mathematics page
export type MathematicsModuleId = 
  | 'linear-algebra'
  | 'calculus' 
  | 'probability-stats'
  | 'linear-models';

export type MathematicsModule = LearningModule & {
  id: MathematicsModuleId;
};

export const mathematicsModules: MathematicsModule[] = [
  {
    id: 'linear-algebra',
    title: 'Linear Algebra',
    description: 'Vectors, matrices, and transformations - the language of neural networks',
    status: 'in-progress',
    detailedContent: `# Linear Algebra for AI Engineers
...
`,
    subModules: []
  },
  {
    id: 'calculus',
    title: 'Calculus',
    description: 'Derivatives and optimization - how neural networks learn',
    status: 'in-progress',
    detailedContent: `# Calculus for AI Engineers
...
`,
    subModules: []
  },
  {
    id: 'probability-stats',
    title: 'Probability & Statistics',
    description: 'Uncertainty and inference - foundation of machine learning',
    status: 'in-progress',
    detailedContent: `# Probability & Statistics for AI Engineers
...
`,
    subModules: []
  },
  {
    id: 'linear-models',
    title: 'Linear Models',
    description: 'From linear regression to neural networks - the building blocks',
    status: 'in-progress',
    detailedContent: `# Linear Models for AI Engineers
...
`,
    subModules: []
  }
];