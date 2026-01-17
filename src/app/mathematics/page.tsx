"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
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
                onClick={() => setActiveModuleIndex(index)}
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
                      rehypePlugins={[rehypeHighlight, rehypeSanitize]}
                      components={{
                        code: CodeBlock,
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
          font-weight: 700;
          color: #111827;
          margin: 2rem 0 1rem 0;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid #e5e7eb;
        }

        .markdown-content h2 {
          font-size: 1.35rem;
          font-weight: 700;
          color: #111827;
          margin: 1.75rem 0 0.75rem 0;
        }

        .markdown-content h3 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #2563eb;
          margin: 1.25rem 0 0.5rem 0;
        }

        .markdown-content p {
          font-size: 0.95rem;
          line-height: 1.8;
          color: #374151;
          margin: 0.75rem 0;
        }

        .markdown-content ul {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }

        .markdown-content li {
          font-size: 0.95rem;
          line-height: 1.7;
          color: #374151;
          margin: 0.5rem 0;
        }

        .markdown-content li::marker {
          color: #2563eb;
          font-weight: 700;
        }

        .markdown-content strong {
          font-weight: 700;
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

        .markdown-content pre {
          background: #1f2937;
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1rem 0;
        }

        .markdown-content pre code {
          background: transparent;
          border: none;
          color: #f8f8f2;
          padding: 0;
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

        /* Syntax highlighting */
        .hljs-comment,
        .hljs-quote {
          color: #8292a2;
          font-style: italic;
        }

        .hljs-keyword,
        .hljs-selector-tag,
        .hljs-subst {
          color: #f92672;
          font-weight: bold;
        }

        .hljs-number,
        .hljs-literal,
        .hljs-variable,
        .hljs-template-variable,
        .hljs-tag .hljs-attr {
          color: #ae81ff;
        }

        .hljs-string,
        .hljs-doctag {
          color: #e6db74;
        }

        .hljs-title,
        .hljs-section,
        .hljs-selector-id {
          color: #a6e22e;
          font-weight: bold;
        }

        .hljs-type,
        .hljs-class .hljs-title {
          color: #a6e22e;
        }

        .hljs-tag,
        .hljs-name,
        .hljs-attribute {
          color: #f92672;
        }

        .hljs-regexp,
        .hljs-link {
          color: #fd971f;
        }

        .hljs-symbol,
        .hljs-bullet {
          color: #ae81ff;
        }

        .hljs-built_in,
        .hljs-builtin-name {
          color: #66d9ef;
        }

        .hljs-meta {
          color: #fd971f;
          font-weight: bold;
        }
      `}</style>

      <style jsx>{`
        .math-container {
          min-height: 100vh;
          background: #fafafa;
          display: flex;
          flex-direction: column;
          overflow-y: scroll;
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
        .interactive-section {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #f3f4f6;
        }

        .interactive-badge {
          display: inline-block;
          padding: 0.35rem 0.75rem;
          background: #2563eb;
          color: #fff;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-radius: 4px;
        }

        .demo-block {
          margin-top: 1.5rem;
          padding: 1.5rem;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 8px;
        }

        .demo-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #111827;
          margin: 0 0 0.5rem 0;
        }

        .demo-description {
          font-size: 0.85rem;
          color: #6b7280;
          margin: 0 0 1rem 0;
        }

        .demo-content {
          margin-top: 1rem;
        }

        /* Sidebar */
        .sidebar {
          position: sticky;
          top: 80px;
          height: fit-content;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.25rem;
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
