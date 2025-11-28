import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import MathematicsPage from "../page";

// Mock external markdown dependencies to avoid ESM issues in Jest
jest.mock('react-markdown', () => (props: any) => {
  return <div data-testid="react-markdown">{props.children}</div>;
});

jest.mock('rehype-highlight', () => () => {});

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

describe('Mathematics Page Integration', () => {
  it('renders the page title and home link', () => {
    render(<MathematicsPage />);
    expect(screen.getByText('Mathematics for AI Engineers')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('opens modal when a module is clicked', () => {
    render(<MathematicsPage />);
    
    // Find the Linear Algebra card button
    const sectionButton = screen.getByText('Linear Algebra').closest('button');
    expect(sectionButton).toBeInTheDocument();
    
    if (sectionButton) {
      fireEvent.click(sectionButton);
    }
    
    // Check if modal content appears
    // We might have multiple "Linear Algebra" texts (button and modal title)
    const titles = screen.getAllByText('Linear Algebra');
    expect(titles.length).toBeGreaterThan(1);
    
    // Check for modal specific elements
    expect(screen.getByText('Theory')).toBeInTheDocument();
    expect(screen.getByTestId('react-markdown')).toBeInTheDocument();
  });

  it('closes modal when close button is clicked', () => {
    render(<MathematicsPage />);
    
    // Open modal
    const sectionButton = screen.getByText('Linear Algebra').closest('button');
    if (sectionButton) {
      fireEvent.click(sectionButton);
    }
    
    // Find close button (usually has text '×' or we can find by class/role)
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    
    // Modal content should disappear
    expect(screen.queryByText('Theory')).not.toBeInTheDocument();
  });
});