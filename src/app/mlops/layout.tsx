"use client";

import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import { mlopsModules } from "@/data/mlops";
import gitMetadata from "@/data/git-metadata.json";

export default function MLOpsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mlops-container">
      {/* Header */}
      <BlogPageHeader
        title="MLOps & Production AI"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div
        className="main-layout"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="module-page-layout">
          <ModuleSidebar modules={mlopsModules} basePath="/mlops" />
          <main className="module-content-area">{children}</main>
        </div>
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
          {" · "}
          <a
            href="https://github.com/akshayaparida/portfolio/issues/new?title=MLOps%20Module%20Error&labels=bug,mlops&body=%23%23%20Error%20Description%0A%0A%3C!--%20Describe%20the%20error%20you%20found%20--%3E%0A%0A%23%23%20Location%0A%0A-%20**Module%3A**%20MLOps%0A-%20**Section%3A**%20%0A%0A%23%23%20Expected%20Behavior%0A%0A%3C!--%20What%20should%20happen%3F%20--%3E%0A%0A%23%23%20Actual%20Behavior%0A%0A%3C!--%20What%20actually%20happens%3F%20--%3E%0A%0A%23%23%20Steps%20to%20Reproduce%0A%0A1.%20%0A2.%20%0A3.%20%0A%0A%23%23%20Screenshot%20%28optional%29%0A%0A"
            target="_blank"
            rel="noopener noreferrer"
          >
            Report an error
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
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          flex: 1;
          width: 100%;
          box-sizing: border-box;
        }

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

        @media (max-width: 900px) {
          .main-layout {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
