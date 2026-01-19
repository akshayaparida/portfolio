import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MathematicsPage from "@/app/mathematics/page";
import { mathematicsModules } from "@/data/mathematics";

// Mock the external dependencies
jest.mock("react-markdown", () => {
  const Component = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="react-markdown">{children}</div>
  );
  Component.displayName = "MockReactMarkdown";
  return Component;
});

jest.mock("rehype-highlight", () => ({}));
jest.mock("rehype-sanitize", () => ({}));
jest.mock("remark-gfm", () => ({}));

// Mock the demo components
jest.mock("@/components/math-visualizations/VectorSpace2D", () => {
  const Component = () => (
    <div data-testid="vector-space-2d">Vector Space 2D Visualization</div>
  );
  Component.displayName = "MockVectorSpace2D";
  return Component;
});

jest.mock("@/components/math-visualizations/MatrixMultiplication", () => {
  const Component = () => (
    <div data-testid="matrix-multiplication">
      Matrix Multiplication Visualization
    </div>
  );
  Component.displayName = "MockMatrixMultiplication";
  return Component;
});

jest.mock("@/components/math-visualizations/PCAVisualization", () => {
  const Component = () => (
    <div data-testid="pca-visualization">PCA Visualization</div>
  );
  Component.displayName = "MockPCAVisualization";
  return Component;
});

jest.mock("@/components/math-visualizations/GradientDescentPlayground", () => {
  const Component = () => (
    <div data-testid="gradient-descent">Gradient Descent Playground</div>
  );
  Component.displayName = "MockGradientDescentPlayground";
  return Component;
});

jest.mock("@/components/math-visualizations/ActivationFunctions", () => {
  const Component = () => (
    <div data-testid="activation-functions">
      Activation Functions Visualization
    </div>
  );
  Component.displayName = "MockActivationFunctions";
  return Component;
});

jest.mock("@/components/math-visualizations/ScalarMultiplication", () => {
  const Component = () => (
    <div data-testid="scalar-multiplication">
      Scalar Multiplication Visualization
    </div>
  );
  Component.displayName = "MockScalarMultiplication";
  return Component;
});

// Mock ErrorBoundary and fallbacks
jest.mock("@/components/ErrorBoundary", () => {
  const Component = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="error-boundary">{children}</div>
  );
  Component.displayName = "MockErrorBoundary";
  return Component;
});

jest.mock("@/components/MathErrorFallback", () => {
  const Component = () => (
    <div data-testid="math-error-fallback">Error occurred</div>
  );
  Component.displayName = "MockMathErrorFallback";
  return Component;
});

// Mock git metadata
jest.mock("@/data/git-metadata.json", () => ({
  commitHash: "abc123",
  commitDate: "January 1, 2023",
  commitUrl: "https://github.com/test/test/commit/abc123",
}));

// Mock CodeBlock
jest.mock("@/components/CodeBlock", () => {
  const Component = ({ children }: { children: React.ReactNode }) => (
    <code data-testid="code-block">{children}</code>
  );
  Component.displayName = "MockCodeBlock";
  return Component;
});

describe("MathematicsPage - Blog Style Layout", () => {
  it("renders the header with title", () => {
    render(<MathematicsPage />);
    expect(
      screen.getByRole("heading", { name: /Mathematics for AI Engineers/i }),
    ).toBeInTheDocument();
  });

  it("renders navigation links in header", () => {
    render(<MathematicsPage />);
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /my journey/i }),
    ).toBeInTheDocument();
  });

  it("renders sidebar with all module titles", () => {
    render(<MathematicsPage />);
    mathematicsModules.forEach((module) => {
      // Use getAllByText since module title appears in both sidebar and content area for active module
      const elements = screen.getAllByText(module.title);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it("shows first module content by default", () => {
    render(<MathematicsPage />);
    const firstModule = mathematicsModules[0];
    expect(screen.getByText(`Module 1`)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: firstModule.title }),
    ).toBeInTheDocument();
  });

  it("switches module content when sidebar button is clicked", async () => {
    render(<MathematicsPage />);
    const secondModule = mathematicsModules[1];

    // Find and click the second module button
    const moduleButtons = screen.getAllByRole("button");
    const secondModuleButton = moduleButtons.find((button) =>
      button.textContent?.includes(secondModule.title),
    );

    expect(secondModuleButton).toBeInTheDocument();
    fireEvent.click(secondModuleButton!);

    await waitFor(() => {
      expect(screen.getByText("Module 2")).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: secondModule.title }),
      ).toBeInTheDocument();
    });
  });

  it("displays theory section for modules with content", () => {
    render(<MathematicsPage />);
    const moduleWithContent = mathematicsModules.find(
      (m) => m.detailedContent && m.detailedContent.length > 0,
    );

    if (moduleWithContent) {
      expect(screen.getByText("Theory")).toBeInTheDocument();
      expect(screen.getByTestId("react-markdown")).toBeInTheDocument();
    }
  });

  it("displays interactive demos section when submodules exist", () => {
    render(<MathematicsPage />);
    const moduleWithSubModules = mathematicsModules.find(
      (m) => m.subModules && m.subModules.length > 0,
    );

    if (moduleWithSubModules) {
      expect(screen.getByText("Interactive Demos")).toBeInTheDocument();
    }
  });

  it("marks active module in sidebar", () => {
    render(<MathematicsPage />);
    const moduleButtons = screen.getAllByRole("button");
    const firstButton = moduleButtons[0];

    expect(firstButton).toHaveClass("active");
  });

  it("includes error boundary in component hierarchy", () => {
    render(<MathematicsPage />);
    const errorBoundaries = screen.getAllByTestId("error-boundary");
    expect(errorBoundaries.length).toBeGreaterThan(0);
  });

  it("renders footer with last updated info", () => {
    render(<MathematicsPage />);
    expect(screen.getByText(/last updated/i)).toBeInTheDocument();
  });
});
