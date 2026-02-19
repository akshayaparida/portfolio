"use client";

import { mathematicsModules } from "@/data/mathematics";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import CodeBlock from "@/components/CodeBlock";
import ErrorBoundary from "@/components/ErrorBoundary";
import MathErrorFallback from "@/components/MathErrorFallback";
import VectorSpace2D from "@/components/math-visualizations/VectorSpace2D";
import MatrixMultiplication from "@/components/math-visualizations/MatrixMultiplication";
import PCAVisualization from "@/components/math-visualizations/PCAVisualization";
import GradientDescentPlayground from "@/components/math-visualizations/GradientDescentPlayground";
import ActivationFunctions from "@/components/math-visualizations/ActivationFunctions";
import ScalarMultiplication from "@/components/math-visualizations/ScalarMultiplication";
import PracticeQuiz from "@/components/PracticeQuiz";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation"; // Correct hook for client component? Actually page props receive params. But checking if we need useParams.
import React from "react";

// For Client Components in App Router, params are passed as props to the Page component.
// However, since we defined "use client" at top, we receive params as prop.
// Type definition for Page props in App Router:
// interface PageProps { params: { moduleId: string } }

const demoComponents: Record<string, React.ComponentType> = {
  vectors: VectorSpace2D,
  matrices: MatrixMultiplication,
  pca: PCAVisualization,
  "gradient-descent": GradientDescentPlayground,
  activations: ActivationFunctions,
  "scalar-mult": ScalarMultiplication,
};

const Pre = ({ children }: { children?: React.ReactNode }) => <>{children}</>;

export default function ModulePage() {
  const { moduleId } = useParams() as { moduleId: string };

  const currentModule = mathematicsModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    return notFound();
  }

  // Calculate index for display (1-based)
  const index = mathematicsModules.findIndex((m) => m.id === moduleId);

  return (
    <article className="module-card">
      <div className="module-header">
        <span className="module-number">Module {index + 1}</span>
        <h2 className="module-title">{currentModule.title}</h2>
        <p className="module-description">{currentModule.description}</p>
      </div>

      {currentModule.detailedContent && (
        <div className="theory-section">
          <div className="section-header">
            <span className="theory-badge">Theory</span>
          </div>
          <div className="markdown-content">
            <ErrorBoundary fallback={MathErrorFallback}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeSanitize]}
                components={{
                  code: CodeBlock,
                  pre: Pre,
                }}
              >
                {currentModule.detailedContent}
              </ReactMarkdown>
            </ErrorBoundary>
          </div>
        </div>
      )}

      {currentModule.subModules && currentModule.subModules.length > 0 && (
        <div className="interactive-section">
          <div className="section-header">
            <span className="interactive-badge">Interactive Demos</span>
            <p className="section-subtitle">Learn by doing</p>
          </div>

          {currentModule.subModules.map((subModule) => {
            const DemoComponent = demoComponents[subModule.id];
            return DemoComponent ? (
              <div key={subModule.id} className="demo-block">
                <h3 className="demo-title">{subModule.title}</h3>
                <p className="demo-description">{subModule.description}</p>
                <div className="demo-content">
                  <ErrorBoundary fallback={MathErrorFallback}>
                    <DemoComponent />
                  </ErrorBoundary>
                </div>
              </div>
            ) : null;
          })}
        </div>
      )}

      {currentModule.practiceQuiz && currentModule.practiceQuiz.length > 0 && (
        <div className="practice-section">
          <div className="section-header">
            <span className="practice-badge">Practice</span>
            <p className="section-subtitle">Test your understanding</p>
          </div>
          <ErrorBoundary fallback={MathErrorFallback}>
            <PracticeQuiz questions={currentModule.practiceQuiz} />
          </ErrorBoundary>
        </div>
      )}
    </article>
  );
}
