"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { mathematicsModules } from "@/data/mathematics";
import CodeBlock from "@/components/CodeBlock";
import ErrorBoundary from "@/components/ErrorBoundary";
import MathErrorFallback from "@/components/MathErrorFallback";
import BlogPageHeader from "@/components/BlogPageHeader";
import MathModuleIcon from "@/components/MathModuleIcon";
import VectorSpace2D from "@/components/math-visualizations/VectorSpace2D";
import MatrixMultiplication from "@/components/math-visualizations/MatrixMultiplication";
import PCAVisualization from "@/components/math-visualizations/PCAVisualization";
import GradientDescentPlayground from "@/components/math-visualizations/GradientDescentPlayground";
import ActivationFunctions from "@/components/math-visualizations/ActivationFunctions";
import ScalarMultiplication from "@/components/math-visualizations/ScalarMultiplication";
import PracticeQuiz from "@/components/PracticeQuiz";
import gitMetadata from "@/data/git-metadata.json";
import "@/styles/module-page.css";

const demoComponents: Record<string, React.ComponentType> = {
  vectors: VectorSpace2D,
  matrices: MatrixMultiplication,
  pca: PCAVisualization,
  "gradient-descent": GradientDescentPlayground,
  activations: ActivationFunctions,
  "scalar-mult": ScalarMultiplication,
};

export default function MathematicsPage() {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const activeModule = mathematicsModules[activeModuleIndex];

  const handleModuleChange = (index: number) => {
    setActiveModuleIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const Pre = ({ children }: { children?: React.ReactNode }) => <>{children}</>;

  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="Mathematics for AI Engineers"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div className="module-page-layout">
        <aside className="module-sidebar">
          <h3 className="sidebar-title">Modules</h3>
          <nav className="module-nav">
            {mathematicsModules.map((module, index) => (
              <button
                key={module.id}
                onClick={() => handleModuleChange(index)}
                className={`nav-item ${index === activeModuleIndex ? "active" : ""}`}
              >
                <span className="nav-icon">
                  <MathModuleIcon moduleId={module.id} />
                </span>
                <span className="nav-text">{module.title}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="module-content-area">
          <article className="module-card">
            <div className="module-header">
              <span className="module-number">
                Module {activeModuleIndex + 1}
              </span>
              <h2 className="module-title">{activeModule.title}</h2>
              <p className="module-description">{activeModule.description}</p>
            </div>

            {activeModule.detailedContent && (
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
                      {activeModule.detailedContent}
                    </ReactMarkdown>
                  </ErrorBoundary>
                </div>
              </div>
            )}

            {activeModule.subModules && activeModule.subModules.length > 0 && (
              <div className="interactive-section">
                <div className="section-header">
                  <span className="interactive-badge">Interactive Demos</span>
                  <p className="section-subtitle">Learn by doing</p>
                </div>

                {activeModule.subModules.map((subModule) => {
                  const DemoComponent = demoComponents[subModule.id];
                  return DemoComponent ? (
                    <div key={subModule.id} className="demo-block">
                      <h3 className="demo-title">{subModule.title}</h3>
                      <p className="demo-description">
                        {subModule.description}
                      </p>
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

            {activeModule.practiceQuiz &&
              activeModule.practiceQuiz.length > 0 && (
                <div className="practice-section">
                  <div className="section-header">
                    <span className="practice-badge">Practice</span>
                    <p className="section-subtitle">Test your understanding</p>
                  </div>
                  <ErrorBoundary fallback={MathErrorFallback}>
                    <PracticeQuiz questions={activeModule.practiceQuiz} />
                  </ErrorBoundary>
                </div>
              )}
          </article>
        </main>
      </div>

      <footer className="module-footer">
        <p>
          Last updated:{" "}
          <a
            href={gitMetadata.commitUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {gitMetadata.commitDate}
          </a>
          {" · "}
          <a
            href="https://github.com/akshayaparida/portfolio/issues/new?title=Mathematics%20Module%20Error&labels=bug,mathematics&body=%23%23%20Error%20Description%0A%0A%3C!--%20Describe%20the%20error%20you%20found%20--%3E%0A%0A%23%23%20Location%0A%0A-%20**Module%3A**%20Mathematics%0A-%20**Section%3A**%20%0A%0A%23%23%20Expected%20Behavior%0A%0A%3C!--%20What%20should%20happen%3F%20--%3E%0A%0A%23%23%20Actual%20Behavior%0A%0A%3C!--%20What%20actually%20happens%3F%20--%3E%0A%0A%23%23%20Steps%20to%20Reproduce%0A%0A1.%20%0A2.%20%0A3.%20%0A%0A%23%23%20Screenshot%20%28optional%29%0A%0A"
            target="_blank"
            rel="noopener noreferrer"
          >
            Report an error
          </a>
        </p>
      </footer>

      <style jsx>{`
        .demo-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #111827;
          margin: 0 0 0.5rem 0;
        }

        .demo-description {
          font-size: 0.9rem;
          color: #6b7280;
          margin: 0 0 1rem 0;
        }

        .demo-content {
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}
