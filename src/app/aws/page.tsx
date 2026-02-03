"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import { awsModules } from "@/data/aws";
import CodeBlock from "@/components/CodeBlock";
import ErrorBoundary from "@/components/ErrorBoundary";
import MathErrorFallback from "@/components/MathErrorFallback";
import BlogPageHeader from "@/components/BlogPageHeader";
import PracticeQuiz from "@/components/PracticeQuiz";
import gitMetadata from "@/data/git-metadata.json";

// Module icons for AWS
function AWSModuleIcon({ moduleId }: { moduleId: string }) {
  const iconProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (moduleId) {
    case "aws-fundamentals":
      return (
        <svg {...iconProps}>
          <path
            d="M2 15.5l6.5 3.5 8.5-6-3.5-2M2 15.5v-5l6.5-4 8.5 6v5l-8.5 6-6.5-4v-3M15 13.5l7-4.5-7-4.5M15 13.5V9"
            strokeWidth="2"
          />
        </svg>
      );
    default:
      return (
        <svg {...iconProps}>
          <path
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
            strokeWidth="2"
          />
        </svg>
      );
  }
}

export default function AWSPage() {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const activeModule = awsModules[activeModuleIndex];

  // Handle module change and scroll to top
  const handleModuleChange = (index: number) => {
    setActiveModuleIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show placeholder if no modules yet
  if (awsModules.length === 0) {
    return (
      <div className="aws-container">
        <BlogPageHeader
          title="AWS Cloud"
          backLink="/learning-journey"
          backTitle="My Journey"
        />
        <div className="empty-state">
          <div className="empty-icon">☁️</div>
          <h2>Coming Soon</h2>
          <p>AWS modules will be added here.</p>
        </div>
        <style jsx>{`
          .aws-container {
            min-height: 100vh;
            background: #fafafa;
          }
          .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 4rem 2rem;
            text-align: center;
          }
          .empty-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
          }
          .empty-state h2 {
            font-size: 1.5rem;
            color: #111827;
            margin: 0 0 0.5rem 0;
          }
          .empty-state p {
            color: #6b7280;
            font-size: 1rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="aws-container">
      <BlogPageHeader
        title="AWS Cloud"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div className="main-layout">
        <aside className="sidebar">
          <h3 className="sidebar-title">Modules</h3>
          <nav className="module-nav">
            {awsModules.map((module, index) => (
              <button
                key={module.id}
                onClick={() => handleModuleChange(index)}
                className={`nav-item ${index === activeModuleIndex ? "active" : ""}`}
              >
                <span className="nav-icon">
                  <AWSModuleIcon moduleId={module.id} />
                </span>
                <span className="nav-text">{module.title}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="content-area">
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
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {activeModule.detailedContent}
                    </ReactMarkdown>
                  </ErrorBoundary>
                </div>
              </div>
            )}

            {activeModule.practiceQuiz &&
              activeModule.practiceQuiz.length > 0 && (
                <div className="interactive-section">
                  <div className="section-header">
                    <span className="practice-badge">Practice</span>
                    <p className="section-subtitle">Test your understanding</p>
                  </div>
                  <PracticeQuiz questions={activeModule.practiceQuiz} />
                </div>
              )}
          </article>
        </main>
      </div>

      <footer className="aws-footer">
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
          color: #ff9900;
          margin: 1.25rem 0 0.5rem 0;
        }
        .markdown-content p {
          font-size: 0.95rem;
          line-height: 1.8;
          color: #374151;
          margin: 0.75rem 0;
        }
        .markdown-content ul,
        .markdown-content ol {
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
          color: #ff9900;
          font-weight: 700;
        }
        .markdown-content strong {
          font-weight: 700;
          color: #111827;
        }
        .markdown-content a {
          color: #ff9900;
          text-decoration: underline;
          font-weight: 500;
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
        .markdown-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
          font-size: 0.9rem;
        }
        .markdown-content th,
        .markdown-content td {
          border: 1px solid #e5e7eb;
          padding: 0.75rem;
          text-align: left;
        }
        .markdown-content th {
          background: #fff8e6;
          font-weight: 600;
        }
        .markdown-content blockquote {
          margin: 1rem 0;
          padding: 0.75rem 1rem;
          border-left: 4px solid #ef4444;
          background: #fef2f2;
          border-radius: 0 8px 8px 0;
        }
        .markdown-content blockquote p {
          margin: 0;
          color: #991b1b;
          font-weight: 500;
        }
        .markdown-content blockquote strong {
          color: #7f1d1d;
        }
      `}</style>

      <style jsx>{`
        .aws-container {
          min-height: 100vh;
          background: #fafafa;
          display: flex;
          flex-direction: column;
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
        .sidebar {
          position: sticky;
          top: 100px;
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
          background: #fff8e6;
          border-color: #ff9900;
        }
        .nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          color: #9ca3af;
        }
        .nav-item.active .nav-icon {
          color: #ff9900;
        }
        .nav-text {
          flex: 1;
          font-size: 0.85rem;
          font-weight: 500;
          color: #6b7280;
        }
        .nav-item.active .nav-text {
          color: #111827;
        }
        .content-area {
          min-width: 0;
          width: 100%;
        }
        .module-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 2rem;
        }
        .module-header {
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #f3f4f6;
        }
        .module-number {
          font-size: 0.75rem;
          font-weight: 700;
          color: #ff9900;
          text-transform: uppercase;
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
          margin: 0;
        }
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
          border-radius: 4px;
        }
        .practice-badge {
          display: inline-block;
          padding: 0.35rem 0.75rem;
          background: #ff9900;
          color: #fff;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
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
        .interactive-section {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #f3f4f6;
        }
        .aws-footer {
          text-align: center;
          padding: 1.5rem 2rem;
          border-top: 1px solid #e5e7eb;
        }
        .aws-footer p {
          color: #9ca3af;
          font-size: 0.85rem;
          margin: 0;
        }
        .aws-footer a {
          color: #ff9900;
          text-decoration: underline;
        }
        @media (max-width: 900px) {
          .main-layout {
            display: flex;
            flex-direction: column;
            padding: 1rem;
          }
          .sidebar {
            position: static;
            order: -1;
            margin-bottom: 1rem;
          }
          .module-nav {
            flex-direction: row;
            flex-wrap: wrap;
          }
          .nav-item {
            flex: 1;
            min-width: 140px;
          }
        }
      `}</style>
    </div>
  );
}
