"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { networksModules } from "@/data/networks";
import CodeBlock from "@/components/CodeBlock";
import ErrorBoundary from "@/components/ErrorBoundary";
import MathErrorFallback from "@/components/MathErrorFallback";
import BlogPageHeader from "@/components/BlogPageHeader";
import PracticeQuiz from "@/components/PracticeQuiz";
import gitMetadata from "@/data/git-metadata.json";
import "@/styles/module-page.css";

// Module icons for Networks
function NetworksModuleIcon({ moduleId }: { moduleId: string }) {
  const iconProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (moduleId) {
    case "network-basics":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="3" />
          <circle cx="4" cy="6" r="2" />
          <circle cx="20" cy="6" r="2" />
          <circle cx="4" cy="18" r="2" />
          <circle cx="20" cy="18" r="2" />
          <path d="M6 6l4.5 4.5M14.5 10.5L18 6M6 18l4.5-4.5M14.5 13.5L18 18" />
        </svg>
      );
    case "data-link-layer":
      return (
        <svg {...iconProps}>
          <rect x="2" y="4" width="20" height="4" rx="1" />
          <rect x="2" y="10" width="20" height="4" rx="1" />
          <rect x="2" y="16" width="20" height="4" rx="1" />
          <path d="M6 4v16M18 4v16" />
        </svg>
      );
    case "network-layer":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="4" r="2" />
          <circle cx="6" cy="12" r="2" />
          <circle cx="18" cy="12" r="2" />
          <circle cx="4" cy="20" r="2" />
          <circle cx="12" cy="20" r="2" />
          <circle cx="20" cy="20" r="2" />
          <path d="M12 6v4M8 12l-2 6M16 12l2 6M10 12v6M14 12v6" />
        </svg>
      );
    case "transport-layer":
      return (
        <svg {...iconProps}>
          <path d="M4 4h16v16H4z" />
          <path d="M4 8h16M4 12h16M4 16h16" />
          <path d="M8 4v16M16 4v16" />
        </svg>
      );
    case "application-layer":
      return (
        <svg {...iconProps}>
          <rect x="3" y="3" width="18" height="14" rx="2" />
          <path d="M3 9h18" />
          <circle cx="6" cy="6" r="1" />
          <circle cx="9" cy="6" r="1" />
          <path d="M7 21h10M12 17v4" />
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

export default function NetworksPage() {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const activeModule = networksModules[activeModuleIndex];

  const handleModuleChange = (index: number) => {
    setActiveModuleIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const Pre = ({ children }: { children?: React.ReactNode }) => <>{children}</>;

  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="Computer Networks"
        backLink="/networks"
        backTitle="Networks"
      />

      <div className="module-page-layout">
        <aside className="module-sidebar">
          <h3 className="sidebar-title">Modules</h3>
          <nav className="module-nav">
            {networksModules.map((module, index) => (
              <button
                key={module.id}
                onClick={() => handleModuleChange(index)}
                className={`nav-item ${index === activeModuleIndex ? "active" : ""}`}
              >
                <span className="nav-icon">
                  <NetworksModuleIcon moduleId={module.id} />
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
            href="https://github.com/akshayaparida/portfolio/issues/new?title=Networks%20Module%20Error&labels=bug,networks&body=%23%23%20Error%20Description%0A%0A%3C!--%20Describe%20the%20error%20you%20found%20--%3E%0A%0A%23%23%20Location%0A%0A-%20**Module%3A**%20Networks%0A-%20**Section%3A**%20%0A%0A%23%23%20Expected%20Behavior%0A%0A%3C!--%20What%20should%20happen%3F%20--%3E%0A%0A%23%23%20Actual%20Behavior%0A%0A%3C!--%20What%20actually%20happens%3F%20--%3E%0A%0A%23%23%20Steps%20to%20Reproduce%0A%0A1.%20%0A2.%20%0A3.%20%0A%0A%23%23%20Screenshot%20%28optional%29%0A%0A"
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
