"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { dbmsModules } from "@/data/dbms";
import CodeBlock from "@/components/CodeBlock";
import ErrorBoundary from "@/components/ErrorBoundary";
import MathErrorFallback from "@/components/MathErrorFallback";
import BlogPageHeader from "@/components/BlogPageHeader";
import PracticeQuiz from "@/components/PracticeQuiz";
import gitMetadata from "@/data/git-metadata.json";
import "@/styles/module-page.css";

// Module icons for DBMS
function DBMSModuleIcon({ moduleId }: { moduleId: string }) {
  const iconProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (moduleId) {
    case "database-fundamentals":
      return (
        <svg {...iconProps}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case "sql-queries":
      return (
        <svg {...iconProps}>
          <path d="M4 7V4h16v3" strokeWidth="2" />
          <path d="M9 20h6" strokeWidth="2" />
          <path d="M12 4v16" strokeWidth="2" />
        </svg>
      );
    case "normalization":
      return (
        <svg {...iconProps}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "transactions-concurrency":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 10v6M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24M1 12h6m10 0h6M4.22 19.78l4.24-4.24m7.08-7.08l4.24-4.24" />
        </svg>
      );
    case "indexing-storage":
      return (
        <svg {...iconProps}>
          <path d="M4 6h16M4 10h16M4 14h16M4 18h16" strokeWidth="2" />
          <path d="M8 6v12" strokeWidth="2" />
        </svg>
      );
    default:
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

export default function DBMSPage() {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const activeModule = dbmsModules[activeModuleIndex];

  const handleModuleChange = (index: number) => {
    setActiveModuleIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const Pre = ({ children }: { children?: React.ReactNode }) => <>{children}</>;

  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="Database Management Systems"
        backLink="/dbms"
        backTitle="DBMS"
      />

      <div className="module-page-layout">
        <aside className="module-sidebar">
          <h3 className="sidebar-title">Modules</h3>
          <nav className="module-nav">
            {dbmsModules.map((module, index) => (
              <button
                key={module.id}
                onClick={() => handleModuleChange(index)}
                className={`nav-item ${index === activeModuleIndex ? "active" : ""}`}
              >
                <span className="nav-icon">
                  <DBMSModuleIcon moduleId={module.id} />
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
        </p>
      </footer>
    </div>
  );
}
