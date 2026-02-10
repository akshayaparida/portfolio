"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { osModules } from "@/data/os";
import CodeBlock from "@/components/CodeBlock";
import ErrorBoundary from "@/components/ErrorBoundary";
import MathErrorFallback from "@/components/MathErrorFallback";
import BlogPageHeader from "@/components/BlogPageHeader";
import PracticeQuiz from "@/components/PracticeQuiz";
import gitMetadata from "@/data/git-metadata.json";
import "@/styles/module-page.css";

// Module icons for OS
function OSModuleIcon({ moduleId }: { moduleId: string }) {
  const iconProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (moduleId) {
    case "process-management":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
        </svg>
      );
    case "synchronization-deadlocks":
      return (
        <svg {...iconProps}>
          <rect x="3" y="11" width="7" height="10" rx="1" />
          <rect x="14" y="3" width="7" height="10" rx="1" />
          <path d="M10 16h4M14 8h-4" />
        </svg>
      );
    case "memory-management":
      return (
        <svg {...iconProps}>
          <rect x="2" y="3" width="20" height="18" rx="2" />
          <path d="M2 9h20M2 15h20M8 3v18M16 3v18" />
        </svg>
      );
    case "disk-file-systems":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" />
          <circle cx="12" cy="12" r="6" />
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

export default function OSPage() {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const activeModule = osModules[activeModuleIndex];

  const handleModuleChange = (index: number) => {
    setActiveModuleIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const Pre = ({ children }: { children?: React.ReactNode }) => <>{children}</>;

  return (
    <div className="module-page-container">
      <BlogPageHeader title="Operating Systems" backLink="/os" backTitle="OS" />

      <div className="module-page-layout">
        <aside className="module-sidebar">
          <h3 className="sidebar-title">Modules</h3>
          <nav className="module-nav">
            {osModules.map((module, index) => (
              <button
                key={module.id}
                onClick={() => handleModuleChange(index)}
                className={`nav-item ${index === activeModuleIndex ? "active" : ""}`}
              >
                <span className="nav-icon">
                  <OSModuleIcon moduleId={module.id} />
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
          {" · "}
          <a
            href="https://github.com/akshayaparida/portfolio/issues/new?title=OS%20Module%20Error&labels=bug,os&body=%23%23%20Error%20Description%0A%0A%3C!--%20Describe%20the%20error%20you%20found%20--%3E%0A%0A%23%23%20Location%0A%0A-%20**Module%3A**%20OS%0A-%20**Section%3A**%20%0A%0A%23%23%20Expected%20Behavior%0A%0A%3C!--%20What%20should%20happen%3F%20--%3E%0A%0A%23%23%20Actual%20Behavior%0A%0A%3C!--%20What%20actually%20happens%3F%20--%3E%0A%0A%23%23%20Steps%20to%20Reproduce%0A%0A1.%20%0A2.%20%0A3.%20%0A%0A%23%23%20Screenshot%20%28optional%29%0A%0A"
            target="_blank"
            rel="noopener noreferrer"
          >
            Report an error
          </a>
        </p>
      </footer>
    </div>
  );
}
