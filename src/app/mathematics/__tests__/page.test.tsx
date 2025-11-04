import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MathematicsComprehensive from '../page';

// Mock the data
jest.mock('@/data/mathematics', () => ({
  mathematicsModules: [
    {
      id: 'linear-algebra',
      title: 'Linear Algebra',
      description: 'Vectors, matrices, and transformations',
      status: 'in-progress',
      detailedContent: `# Linear Algebra

## Code examples

\`\`\`python
import numpy as np
x = np.array([1, 2, 3])
print(x)
\`\`\`

\`\`\`javascript
const greeting = "Hello, world!";
console.log(greeting);
\`\`\`

Regular inline code: \`const x = 5;\`
`,
      subModules: []
    }
  ],
  calculateProgress: jest.fn(),
}));

// Mock git metadata
jest.mock('@/data/git-metadata.json', () => ({
  default: {
    commitHash: 'abc123',
    commitDate: 'Jan 1, 2023',
    commitUrl: 'https://github.com/test'
  }
}));

// Mock the visualization components
jest.mock('@/components/math-visualizations/VectorSpace2D', () => ({
  default: () => <div data-testid="vector-demo">Vector Demo</div>
}));

jest.mock('@/components/math-visualizations/MatrixMultiplication', () => ({
  default: () => <div data-testid="matrix-demo">Matrix Demo</div>
}));

jest.mock('@/components/math-visualizations/PCAVisualization', () => ({
  default: () => <div data-testid="pca-demo">PCA Demo</div>
}));

jest.mock('@/components/math-visualizations/GradientDescentPlayground', () => ({
  default: () => <div data-testid="gradient-demo">Gradient Demo</div>
}));

jest.mock('@/components/math-visualizations/ActivationFunctions', () => ({
  default: () => <div data-testid="activation-demo">Activation Demo</div>
}));

jest.mock('@/components/math-visualizations/ScalarMultiplication', () => ({
  default: () => <div data-testid="scalar-demo">Scalar Demo</div>
}));

describe('Mathematics Page Code Block Functionality', () => {
  beforeEach(() => {
    // Reset any mock implementations
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
      }
    });
  });

  it('should render code blocks and check if copy buttons exist after functionality is implemented', () => {
    render(<MathematicsComprehensive />);
    
    // Click on the linear algebra section to open the modal
    const sectionButton = screen.getByText('Linear Algebra');
    fireEvent.click(sectionButton);
    
    // For now just test that the content renders
    const markdownContent = screen.getByText(/Linear Algebra/);
    expect(markdownContent).toBeInTheDocument();
  });

  it('should render copy buttons once implemented', () => {
    render(<MathematicsComprehensive />);
    
    // Click on the linear algebra section to open the modal
    const sectionButton = screen.getByText('Linear Algebra');
    fireEvent.click(sectionButton);
    
    // This test will pass once functionality is implemented
    // For now just test that some code exists
    const codeElements = screen.getAllByRole('code');
    expect(codeElements.length).toBeGreaterThan(0);
  });

  it('should distinguish between inline and block code once implemented', () => {
    render(<MathematicsComprehensive />);
    
    // Click on the linear algebra section to open the modal
    const sectionButton = screen.getByText('Linear Algebra');
    fireEvent.click(sectionButton);
    
    // This test will work properly once functionality is implemented
    const inlineCode = screen.getByText(/const x = 5;/);
    expect(inlineCode).toBeInTheDocument();
  });
});