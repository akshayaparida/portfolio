import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MathematicsComprehensive from '@/app/mathematics/page';
import { mathematicsModules } from '@/data/mathematics';

// Mock the external dependencies to avoid parsing issues
jest.mock('react-markdown', () => {
  const Component = ({ children }: { children: React.ReactNode }) => <div data-testid="react-markdown">{children}</div>;
  Component.displayName = 'MockReactMarkdown';
  return Component;
});

jest.mock('rehype-highlight', () => {
  return {};
});

jest.mock('rehype-sanitize', () => {
  return {};
});

// Mock the demo components
jest.mock('@/components/math-visualizations/VectorSpace2D', () => {
  const Component = () => <div data-testid="vector-space-2d">Vector Space 2D Visualization</div>;
  Component.displayName = 'MockVectorSpace2D';
  return Component;
});

jest.mock('@/components/math-visualizations/MatrixMultiplication', () => {
  const Component = () => <div data-testid="matrix-multiplication">Matrix Multiplication Visualization</div>;
  Component.displayName = 'MockMatrixMultiplication';
  return Component;
});

jest.mock('@/components/math-visualizations/PCAVisualization', () => {
  const Component = () => <div data-testid="pca-visualization">PCA Visualization</div>;
  Component.displayName = 'MockPCAVisualization';
  return Component;
});

jest.mock('@/components/math-visualizations/GradientDescentPlayground', () => {
  const Component = () => <div data-testid="gradient-descent">Gradient Descent Playground</div>;
  Component.displayName = 'MockGradientDescentPlayground';
  return Component;
});

jest.mock('@/components/math-visualizations/ActivationFunctions', () => {
  const Component = () => <div data-testid="activation-functions">Activation Functions Visualization</div>;
  Component.displayName = 'MockActivationFunctions';
  return Component;
});

jest.mock('@/components/math-visualizations/ScalarMultiplication', () => {
  const Component = () => <div data-testid="scalar-multiplication">Scalar Multiplication Visualization</div>;
  Component.displayName = 'MockScalarMultiplication';
  return Component;
});

// Mock ErrorBoundary and fallbacks
jest.mock('@/components/ErrorBoundary', () => {
  const Component = ({ children }: { children: React.ReactNode }) => <div data-testid="error-boundary">{children}</div>;
  Component.displayName = 'MockErrorBoundary';
  return Component;
});

jest.mock('@/components/MathErrorFallback', () => {
  const Component = () => <div data-testid="math-error-fallback">Error occurred</div>;
  Component.displayName = 'MockMathErrorFallback';
  return Component;
});

// Mock the git metadata
jest.mock('@/data/git-metadata.json', () => ({
  commitHash: 'abc123',
  commitDate: 'January 1, 2023',
  commitUrl: 'https://github.com/test/test/commit/abc123'
}));

// Mock the components used in the page
jest.mock('@/components/CodeBlock', () => {
  const Component = ({ children }: { children: React.ReactNode }) => <code data-testid="code-block">{children}</code>;
  Component.displayName = 'MockCodeBlock';
  return Component;
});

describe('MathematicsComprehensive Component', () => {
  it('renders the main page structure', () => {
    render(<MathematicsComprehensive />);

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Mathematics for AI Engineers/i })).toBeInTheDocument();
    expect(screen.getByText(/Complete guide with theory and interactive visualizations/i)).toBeInTheDocument();
  });

  it('displays all mathematics modules', () => {
    render(<MathematicsComprehensive />);

    mathematicsModules.forEach(module => {
      expect(screen.getByText(module.title)).toBeInTheDocument();
      expect(screen.getByText(module.description)).toBeInTheDocument();
    });
  });

  it('opens a module section when clicked', async () => {
    render(<MathematicsComprehensive />);

    const firstModule = mathematicsModules[0];
    // Find the button by title text since the full name is quite long
    const moduleButtons = screen.getAllByRole('button');
    const moduleButton = moduleButtons.find(button =>
      button.textContent?.includes(firstModule.title)
    );

    expect(moduleButton).toBeInTheDocument();
    fireEvent.click(moduleButton!);

    // Should show the modal with the selected module content
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: firstModule.title })).toBeInTheDocument();
      // Use getAllByText and take the first one to avoid multiple elements error
      const descriptionElements = screen.getAllByText(firstModule.description);
      expect(descriptionElements[0]).toBeInTheDocument();
    });
  });

  it('closes the modal when close button is clicked', async () => {
    render(<MathematicsComprehensive />);

    const firstModule = mathematicsModules[0];
    // Find the button by title text since the full name is quite long
    const moduleButtons = screen.getAllByRole('button');
    const moduleButton = moduleButtons.find(button =>
      button.textContent?.includes(firstModule.title)
    );

    expect(moduleButton).toBeInTheDocument();
    fireEvent.click(moduleButton!);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: firstModule.title })).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: /×/i });
    fireEvent.click(closeButton);

    // Should no longer show the modal content
    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: firstModule.title })).not.toBeInTheDocument();
    });
  });

  it('closes the modal when clicking the overlay', async () => {
    render(<MathematicsComprehensive />);

    const firstModule = mathematicsModules[0];
    // Find the button by title text since the full name is quite long
    const moduleButtons = screen.getAllByRole('button');
    const moduleButton = moduleButtons.find(button =>
      button.textContent?.includes(firstModule.title)
    );

    expect(moduleButton).toBeInTheDocument();
    fireEvent.click(moduleButton!);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: firstModule.title })).toBeInTheDocument();
    });

    // Wait for the content to be fully loaded
    await waitFor(() => {
      expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    });

    // Get the modal overlay element directly from the DOM and click it
    const overlayElement = document.querySelector('.modal-overlay');
    if (overlayElement) {
      fireEvent.click(overlayElement);
    }

    // Should no longer show the modal content
    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: firstModule.title })).not.toBeInTheDocument();
    });
  });

  it('renders theoretical content when a module is opened', async () => {
    render(<MathematicsComprehensive />);

    const moduleWithContent = mathematicsModules.find(m => m.detailedContent && m.detailedContent.length > 0);

    if (moduleWithContent) {
      // Find the button by title text since the full name is quite long
      const moduleButtons = screen.getAllByRole('button');
      const moduleButton = moduleButtons.find(button =>
        button.textContent?.includes(moduleWithContent.title)
      );

      expect(moduleButton).toBeInTheDocument();
      fireEvent.click(moduleButton!);

      await waitFor(() => {
        expect(screen.getByText('Theory')).toBeInTheDocument();
        expect(screen.getByTestId('react-markdown')).toBeInTheDocument();
      });
    }
  });

  it('renders interactive demo components when available', async () => {
    render(<MathematicsComprehensive />);

    // Find a module that has subModules
    const moduleWithSubModules = mathematicsModules.find(m =>
      m.subModules && m.subModules.length > 0
    );

    if (moduleWithSubModules) {
      // Find the button by title text since the full name is quite long
      const moduleButtons = screen.getAllByRole('button');
      const moduleButton = moduleButtons.find(button =>
        button.textContent?.includes(moduleWithSubModules.title)
      );

      expect(moduleButton).toBeInTheDocument();
      fireEvent.click(moduleButton!);

      await waitFor(() => {
        expect(screen.getByText('Interactive Demos')).toBeInTheDocument();
      });

      // Check if demo blocks are rendered
      moduleWithSubModules.subModules?.forEach(subModule => {
        expect(screen.getByText(subModule.title)).toBeInTheDocument();
        expect(screen.getByText(subModule.description)).toBeInTheDocument();
      });
    }
  });

  it('includes error boundary in component hierarchy when module is opened', async () => {
    render(<MathematicsComprehensive />);

    const firstModule = mathematicsModules[0];
    // Find the button by title text since the full name is quite long
    const moduleButtons = screen.getAllByRole('button');
    const moduleButton = moduleButtons.find(button =>
      button.textContent?.includes(firstModule.title)
    );

    expect(moduleButton).toBeInTheDocument();
    fireEvent.click(moduleButton!);

    // Wait for the module to open and the error boundary to render
    await waitFor(() => {
      expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
    });
  });
});