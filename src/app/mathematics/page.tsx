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

  // Handle module change and scroll to top
  const handleModuleChange = (index: number) => {
    setActiveModuleIndex(index);
    // Scroll to top of page when switching modules
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const Pre = ({ children }: { children?: React.ReactNode }) => <>{children}</>;

  return (
    <div className="math-container">
      {/* Header */}
      <BlogPageHeader
        title="Mathematics for AI Engineers"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div className="main-layout">
        {/* Sidebar Navigation - Left Side */}
        <aside className="sidebar">
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

        {/* Content Area */}
        <main className="content-area">
          <article className="module-card">
            <div className="module-header">
              <span className="module-number">
                Module {activeModuleIndex + 1}
              </span>
              <h2 className="module-title">{activeModule.title}</h2>
              <p className="module-description">{activeModule.description}</p>
            </div>

            {/* Theory Content */}
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

            {/* Interactive Demos */}
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

            {/* Practice Quiz */}
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

      {/* Footer */}
      <footer className="math-footer">
        <p>
          Last updated:{" "}
          <a
            href={gitMetadata.commitUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {gitMetadata.commitDate}
          </a>
        </p>
      </footer>

      <style jsx global>{`
        .markdown-content h1 {
          font-size: 1.75rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 1.5rem;
          margin-top: 2rem;
          line-height: 1.3;
        }

        .markdown-content h1:first-child {
          margin-top: 0;
        }

        .markdown-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .markdown-content h2:first-of-type {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Make book emoji grayscale */
        .markdown-content h2:first-of-type::before {
          content: "";
        }

        .markdown-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #374151;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }

        .markdown-content p {
          margin-bottom: 1.25rem;
          line-height: 1.75;
          color: #374151;
        }

        .markdown-content ul,
        .markdown-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }

        .markdown-content li {
          margin-bottom: 0.5rem;
          line-height: 1.7;
          color: #374151;
        }

        .markdown-content strong {
          font-weight: 600;
          color: #111827;
        }

        .markdown-content code {
          background: #f3f4f6;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          font-family: "Courier New", monospace;
          font-size: 0.875rem;
          color: #111827;
          border: 1px solid #e5e7eb;
        }

        /* Override inline code style inside pre blocks */
        .markdown-content pre code {
          background: transparent;
          padding: 0;
          border-radius: 0;
          font-family: "Consolas", "Monaco", "Courier New", monospace;
          font-size: 0.875rem;
          color: #d4d4d4;
          border: none;
        }

        /* Target the pre tag inside CodeBlock */
        .markdown-content pre {
          background: #1e1e1e !important;
          padding: 1rem;
          border-radius: 0 0 8px 8px; /* Rounded only at bottom because of header */
          overflow-x: auto;
          margin: 0 0 1.5rem 0;
          border: 1px solid #333;
          border-top: none; /* Merged with header */
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          color: #d4d4d4;
        }

        .markdown-content a {
          color: #2563eb;
          text-decoration: underline;
          font-weight: 500;
          transition: color 0.2s;
        }

        .markdown-content a:hover {
          color: #1d4ed8;
        }

        .markdown-content img {
          max-width: 400px;
          height: auto;
          display: block;
          margin: 1rem auto;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }

        /* Table styling for TL;DR sections */
        .markdown-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
          font-size: 0.9rem;
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
        }

        .markdown-content thead {
          background: #f3f4f6;
        }

        .markdown-content th {
          padding: 0.75rem 1rem;
          text-align: left;
          font-weight: 700;
          color: #111827;
          border-bottom: 2px solid #e5e7eb;
        }

        .markdown-content td {
          padding: 0.75rem 1rem;
          color: #374151;
          border-bottom: 1px solid #f3f4f6;
        }

        .markdown-content tbody tr:hover {
          background: #f9fafb;
        }

        .markdown-content tbody tr:last-child td {
          border-bottom: none;
        }

        /* VS Code Dark+ Theme Syntax Highlighting */
        .hljs-comment,
        .hljs-quote {
          color: #6a9955;
          font-style: italic;
        }

        .hljs-keyword,
        .hljs-selector-tag {
          color: #569cd6;
        }

        .hljs-subst {
          color: #d4d4d4;
        }

        .hljs-number,
        .hljs-literal {
          color: #b5cea8;
        }

        .hljs-variable,
        .hljs-template-variable {
          color: #9cdcfe;
        }

        .hljs-string,
        .hljs-doctag {
          color: #ce9178;
        }

        .hljs-title,
        .hljs-section,
        .hljs-selector-id {
          color: #dcdcaa;
        }

        .hljs-type,
        .hljs-class .hljs-title {
          color: #4ec9b0;
        }

        .hljs-tag,
        .hljs-name,
        .hljs-attribute {
          color: #569cd6;
        }

        .hljs-regexp,
        .hljs-link {
          color: #d16969;
        }

        .hljs-symbol,
        .hljs-bullet {
          color: #b5cea8;
        }

        .hljs-built_in,
        .hljs-builtin-name {
          color: #4ec9b0;
        }

        .hljs-meta {
          color: #c586c0;
        }

        .hljs-params {
          color: #9cdcfe;
        }

        .hljs-function {
          color: #dcdcaa;
        }

        .hljs-attr {
          color: #9cdcfe;
        }
      `}</style>

      <style jsx>{`
        .math-container {
          min-height: 100vh;
          background: #fafafa;
          display: flex;
          flex-direction: column;
        }

        .math-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 2rem;
          position: sticky;
          top: 0;
          background: rgba(250, 250, 250, 0.95);
          backdrop-filter: blur(10px);
          z-index: 100;
          border-bottom: 1px solid #e5e7eb;
        }

        .header-title {
          flex: 1;
          font-size: 1.1rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .back-link,
        .home-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          color: #374151;
          text-decoration: none;
          transition: all 0.2s;
          background: #fff;
          border: 1px solid #e5e7eb;
        }

        .back-link:hover,
        .home-link:hover {
          background: #f3f4f6;
          color: #111827;
        }

        .main-layout {
          display: grid;
          grid-template-columns: 250px minmax(0, 1fr);
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          flex: 1;
          align-items: start;
          width: 100%;
        }

        .content-area {
          min-width: 0;
          min-height: 100vh;
          width: 100%;
          max-width: 100%;
        }

        .module-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 2rem;
          width: 100%;
          box-sizing: border-box;
        }

        .module-header {
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #f3f4f6;
        }

        .module-number {
          font-size: 0.75rem;
          font-weight: 700;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .module-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin: 0.5rem 0;
        }

        .module-description {
          font-size: 0.95rem;
          color: #6b7280;
          line-height: 1.6;
          margin: 0;
        }

        /* Theory Section */
        .theory-section {
          margin-bottom: 2rem;
        }

        .section-header {
          margin-bottom: 1rem;
        }

        .theory-badge {
          display: inline-block;
          padding: 0.35rem 0.75rem;
          background: #111827;
          color: #fff;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-radius: 4px;
        }

        .section-subtitle {
          font-size: 0.85rem;
          color: #6b7280;
          margin: 0.5rem 0 0 0;
        }

        .markdown-content {
          background: #fafafa;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid #f3f4f6;
        }

        /* Interactive Section */
        /* Interactive Section */
        .interactive-section {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #f3f4f6;
        }

        .section-header {
          margin-bottom: 1.5rem;
          border-bottom: 2px solid #f3f4f6;
          padding-bottom: 1rem;
        }

        .theory-badge,
        .interactive-badge,
        .practice-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
          margin-bottom: 0.5rem;
        }

        .theory-badge {
          background: #eff6ff;
          color: #2563eb;
        }

        .interactive-badge {
          background: #ecfdf5;
          color: #059669;
        }

        .practice-badge {
          background: #fffbeb;
          color: #d97706;
        }

        .section-subtitle {
          font-size: 0.95rem;
          color: #6b7280;
          margin: 0;
        }

        .demo-block {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .practice-section {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px dashed #e5e7eb;
        }
        /* Sidebar */
        .sidebar {
          position: sticky;
          top: 100px;
          height: fit-content;
          max-height: calc(100vh - 120px);
          overflow-y: auto;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.25rem;
          align-self: start;
        }

        .sidebar-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0 0 1rem 0;
        }

        .module-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: #fff;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .nav-item:hover {
          background: #fafafa;
        }

        .nav-item.active {
          background: #fafafa;
          border-color: #9ca3af;
        }

        .nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          color: #9ca3af;
        }

        .nav-icon svg {
          width: 100%;
          height: 100%;
        }

        .nav-item.active .nav-icon {
          color: #2563eb;
        }

        .nav-text {
          flex: 1;
          font-size: 0.85rem;
          font-weight: 500;
          color: #6b7280;
          line-height: 1.3;
        }

        .nav-item.active .nav-text {
          color: #111827;
        }

        /* Footer */
        .math-footer {
          text-align: center;
          padding: 1.5rem 2rem;
          border-top: 1px solid #e5e7eb;
          margin-top: auto;
        }

        .math-footer p {
          color: #9ca3af;
          font-size: 0.85rem;
          margin: 0;
        }

        .math-footer a {
          color: #2563eb;
          text-decoration: underline;
        }

        .math-footer a:hover {
          color: #1d4ed8;
        }

        /* Mobile */
        @media (max-width: 900px) {
          .main-layout {
            display: flex;
            flex-direction: column;
            padding: 1rem;
          }

          .sidebar {
            position: static;
            order: -1;
            display: block !important;
            margin-bottom: 1rem;
          }

          .module-nav {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .nav-item {
            flex: 1;
            min-width: 120px;
            padding: 0.5rem 0.75rem;
          }

          .nav-text {
            font-size: 0.75rem;
          }

          .module-card {
            min-height: auto;
          }
        }

        @media (max-width: 600px) {
          .math-header {
            padding: 1rem;
          }

          .header-title {
            font-size: 0.95rem;
          }

          .module-card {
            padding: 1.25rem;
            min-height: auto;
          }

          .module-title {
            font-size: 1.25rem;
          }

          .nav-item {
            min-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
