"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import { mlopsModules } from "@/data/mlops";
import CodeBlock from "@/components/CodeBlock";
import ErrorBoundary from "@/components/ErrorBoundary";
import MathErrorFallback from "@/components/MathErrorFallback";
import BlogPageHeader from "@/components/BlogPageHeader";
import gitMetadata from "@/data/git-metadata.json";

// Module icons for MLOps
function MLOpsModuleIcon({ moduleId }: { moduleId: string }) {
  const iconProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (moduleId) {
    case "data-exploration":
      return (
        <svg {...iconProps}>
          <path
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            strokeWidth="2"
          />
          <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.3" />
        </svg>
      );
    case "data-validation":
      return (
        <svg {...iconProps}>
          <path
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeWidth="2"
          />
        </svg>
      );
    case "feature-engineering":
      return (
        <svg {...iconProps}>
          <path
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            strokeWidth="2"
          />
          <circle cx="12" cy="12" r="3" strokeWidth="2" />
        </svg>
      );
    case "model-deployment":
      return (
        <svg {...iconProps}>
          <path
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            strokeWidth="2"
          />
        </svg>
      );
    default:
      return (
        <svg {...iconProps}>
          <path
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            strokeWidth="2"
          />
        </svg>
      );
  }
}

export default function MLOpsPage() {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const activeModule = mlopsModules[activeModuleIndex];

  // Handle module change and scroll to top
  const handleModuleChange = (index: number) => {
    setActiveModuleIndex(index);
    // Scroll to top of page when switching modules
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mlops-container">
      {/* Header */}
      <BlogPageHeader
        title="MLOps & Production AI"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div className="main-layout">
        {/* Sidebar Navigation */}
        <aside className="sidebar">
          <h3 className="sidebar-title">Modules</h3>
          <nav className="module-nav">
            {mlopsModules.map((module, index) => (
              <button
                key={module.id}
                onClick={() => handleModuleChange(index)}
                className={`nav-item ${index === activeModuleIndex ? "active" : ""}`}
              >
                <span className="nav-icon">
                  <MLOpsModuleIcon moduleId={module.id} />
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

            {/* Resources */}
            {activeModule.subModules && activeModule.subModules.length > 0 && (
              <div className="interactive-section">
                <div className="section-header">
                  <span className="interactive-badge">Resources</span>
                  <p className="section-subtitle">Further learning materials</p>
                </div>

                {activeModule.subModules.map((subModule) => (
                  <div key={subModule.id} className="demo-block">
                    <h3 className="demo-title">{subModule.title}</h3>
                    <p className="demo-description">{subModule.description}</p>
                    {subModule.resources && (
                      <ul className="resource-list">
                        {subModule.resources.map((resource, idx) => (
                          <li key={idx}>
                            <a
                              href={resource.url}
                              target={
                                resource.url.startsWith("/")
                                  ? "_self"
                                  : "_blank"
                              }
                              rel="noopener noreferrer"
                              className="resource-link"
                            >
                              {resource.title}
                              <span className="resource-type">
                                {resource.type}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </article>
        </main>
      </div>

      {/* Footer */}
      <footer className="mlops-footer">
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
          color: #2563eb;
          font-weight: 700;
        }

        .markdown-content strong {
          font-weight: 700;
          color: #111827;
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
          background: #f9fafb;
          font-weight: 600;
        }

        .markdown-content hr {
          border: none;
          border-top: 2px solid #e5e7eb;
          margin: 2rem 0;
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
        .mlops-container {
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

        /* Interactive Section (Resources) */
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

        .resource-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .resource-list li {
          margin: 0.5rem 0;
        }

        .resource-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0.75rem;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          color: #2563eb;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .resource-link:hover {
          background: #eff6ff;
          border-color: #2563eb;
        }

        .resource-type {
          font-size: 0.65rem;
          color: #9ca3af;
          text-transform: uppercase;
          padding: 0.15rem 0.35rem;
          background: #f3f4f6;
          border-radius: 4px;
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
        .mlops-footer {
          text-align: center;
          padding: 1.5rem 2rem;
          border-top: 1px solid #e5e7eb;
          margin-top: auto;
        }

        .mlops-footer p {
          color: #9ca3af;
          font-size: 0.85rem;
          margin: 0;
        }

        .mlops-footer a {
          color: #2563eb;
          text-decoration: underline;
        }

        .mlops-footer a:hover {
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
            min-width: 140px;
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
