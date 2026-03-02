import React from "react";
import { render, screen } from "@testing-library/react";
import ModulePage from "@/app/mathematics/[moduleId]/page";
import ModuleSidebar from "@/components/ModuleSidebar";
import { mathematicsModules } from "@/data/mathematics";
import * as navigation from "next/navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  usePathname: jest.fn(),
  notFound: jest.fn(),
}));

// Mock React Markdown and other heavy components
jest.mock("react-markdown", () => {
  const MockReactMarkdown = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="react-markdown">{children}</div>
  );
  MockReactMarkdown.displayName = "MockReactMarkdown";
  return MockReactMarkdown;
});

jest.mock("rehype-highlight", () => ({}));
jest.mock("rehype-sanitize", () => ({
  __esModule: true,
  default: jest.fn(),
  defaultSchema: { attributes: { a: ["href"] } },
}));
jest.mock("remark-gfm", () => ({}));

// Mock math visualizations
jest.mock("@/components/math-visualizations/VectorSpace2D", () => {
  const MockVectorSpace2D = () => <div data-testid="vector-space" />;
  MockVectorSpace2D.displayName = "MockVectorSpace2D";
  return MockVectorSpace2D;
});
jest.mock("@/components/math-visualizations/MatrixMultiplication", () => {
  const MockMatrixMultiplication = () => <div data-testid="matrix-mult" />;
  MockMatrixMultiplication.displayName = "MockMatrixMultiplication";
  return MockMatrixMultiplication;
});
jest.mock("@/components/math-visualizations/PCAVisualization", () => {
  const MockPCAVisualization = () => <div data-testid="pca" />;
  MockPCAVisualization.displayName = "MockPCAVisualization";
  return MockPCAVisualization;
});
jest.mock("@/components/math-visualizations/GradientDescentPlayground", () => {
  const MockGradientDescentPlayground = () => <div data-testid="gradient" />;
  MockGradientDescentPlayground.displayName = "MockGradientDescentPlayground";
  return MockGradientDescentPlayground;
});
jest.mock("@/components/math-visualizations/ActivationFunctions", () => {
  const MockActivationFunctions = () => <div data-testid="activation" />;
  MockActivationFunctions.displayName = "MockActivationFunctions";
  return MockActivationFunctions;
});
jest.mock("@/components/math-visualizations/ScalarMultiplication", () => {
  const MockScalarMultiplication = () => <div data-testid="scalar" />;
  MockScalarMultiplication.displayName = "MockScalarMultiplication";
  return MockScalarMultiplication;
});

// Mock other components
jest.mock("@/components/ErrorBoundary", () => {
  const MockErrorBoundary = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="error-boundary">{children}</div>
  );
  MockErrorBoundary.displayName = "MockErrorBoundary";
  return MockErrorBoundary;
});

jest.mock("@/components/MathErrorFallback", () => {
  const MockMathErrorFallback = () => <div>Error</div>;
  MockMathErrorFallback.displayName = "MockMathErrorFallback";
  return MockMathErrorFallback;
});

jest.mock("@/components/PracticeQuiz", () => {
  const MockPracticeQuiz = () => <div data-testid="practice-quiz">Quiz</div>;
  MockPracticeQuiz.displayName = "MockPracticeQuiz";
  return MockPracticeQuiz;
});

jest.mock("@/components/CodeBlock", () => {
  const MockCodeBlock = ({ children }: { children: React.ReactNode }) => (
    <pre>{children}</pre>
  );
  MockCodeBlock.displayName = "MockCodeBlock";
  return MockCodeBlock;
});

jest.mock("@/components/MathModuleIcon", () => {
  const MockMathModuleIcon = () => <svg data-testid="module-icon" />;
  MockMathModuleIcon.displayName = "MockMathModuleIcon";
  return MockMathModuleIcon;
});

describe("Mathematics Dynamic Routes", () => {
  const mockUseParams = navigation.useParams as jest.Mock;
  const mockUsePathname = navigation.usePathname as jest.Mock;
  const mockNotFound = navigation.notFound as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("ModuleSidebar", () => {
    it("renders all module links", () => {
      mockUsePathname.mockReturnValue("/mathematics/set-theory");
      render(
        <ModuleSidebar
          modules={mathematicsModules}
          basePath="/mathematics"
          renderIcon={() => <div />}
        />,
      );

      mathematicsModules.forEach((mathModule) => {
        expect(screen.getByText(mathModule.title)).toBeInTheDocument();
      });
    });

    it("highlights the active module based on pathname", () => {
      const activeId = mathematicsModules[1].id; // algebra
      mockUsePathname.mockReturnValue(`/mathematics/${activeId}`);

      render(
        <ModuleSidebar
          modules={mathematicsModules}
          basePath="/mathematics"
          renderIcon={() => <div />}
        />,
      );

      const activeLink = screen
        .getByText(mathematicsModules[1].title)
        .closest("a");
      expect(activeLink).toHaveClass("active");

      const inactiveLink = screen
        .getByText(mathematicsModules[0].title)
        .closest("a");
      expect(inactiveLink).not.toHaveClass("active");
    });
  });

  describe("ModulePage", () => {
    it("renders content for a valid module ID", () => {
      const mathModule = mathematicsModules[0]; // set-theory
      mockUseParams.mockReturnValue({ moduleId: mathModule.id });

      render(<ModulePage />);

      expect(screen.getByText(mathModule.title)).toBeInTheDocument();
      expect(screen.getByText(mathModule.description)).toBeInTheDocument();
      expect(screen.getByText("Module 1")).toBeInTheDocument();

      if (mathModule.detailedContent) {
        expect(screen.getByTestId("react-markdown")).toBeInTheDocument();
      }
    });

    it("calls notFound for invalid module ID", () => {
      mockUseParams.mockReturnValue({ moduleId: "invalid-id" });

      render(<ModulePage />);

      expect(mockNotFound).toHaveBeenCalled();
    });

    it("renders interactive demos if present", () => {
      // Find a module with submodules (e.g. algebra has demos?)
      const moduleWithDemos = mathematicsModules.find(
        (m) => m.subModules && m.subModules.length > 0,
      );
      if (moduleWithDemos) {
        mockUseParams.mockReturnValue({ moduleId: moduleWithDemos.id });
        render(<ModulePage />);
        expect(screen.getByText("Interactive Demos")).toBeInTheDocument();
      }
    });

    it("renders practice quiz if present", () => {
      // Find a module with quiz
      const moduleWithQuiz = mathematicsModules.find(
        (m) => m.practiceQuiz && m.practiceQuiz.length > 0,
      );
      if (moduleWithQuiz) {
        mockUseParams.mockReturnValue({ moduleId: moduleWithQuiz.id });
        render(<ModulePage />);
        expect(screen.getByTestId("practice-quiz")).toBeInTheDocument();
      }
    });
  });
});
