"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import CodeBlock from "@/components/CodeBlock";
import ErrorBoundary from "@/components/ErrorBoundary";
import MathErrorFallback from "@/components/MathErrorFallback";
import PracticeQuiz from "@/components/PracticeQuiz";
import { LearningModule } from "@/types/learning";

interface ModuleViewerProps {
  module: LearningModule;
  index: number;
  demoComponents?: Record<string, React.ComponentType>;
}

const Pre = ({ children }: { children?: React.ReactNode }) => <>{children}</>;

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    a: [...(defaultSchema.attributes?.a || []), "target", "rel"],
  },
};

const ExternalLink = ({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
    {children}
  </a>
);

export default function ModuleViewer({
  module,
  index,
  demoComponents = {},
}: ModuleViewerProps) {
  return (
    <article className="module-card">
      <div className="module-header">
        <span className="module-number">Module {index + 1}</span>
        <h2 className="module-title">{module.title}</h2>
        <p className="module-description">{module.description}</p>
      </div>

      {module.detailedContent && (
        <div className="theory-section">
          <div className="section-header">
            <span className="theory-badge">Theory</span>
          </div>
          <div className="markdown-content">
            <ErrorBoundary fallback={MathErrorFallback}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, [rehypeSanitize, sanitizeSchema]]}
                components={{
                  code: CodeBlock,
                  pre: Pre,
                  a: ExternalLink,
                }}
              >
                {module.detailedContent}
              </ReactMarkdown>
            </ErrorBoundary>
          </div>
        </div>
      )}

      {module.subModules && module.subModules.length > 0 && (
        <div className="interactive-section">
          <div className="section-header">
            <span className="interactive-badge">Interactive Demos</span>
            <p className="section-subtitle">Learn by doing</p>
          </div>

          {module.subModules.map((subModule) => {
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

      {module.practiceQuiz && module.practiceQuiz.length > 0 && (
        <div className="practice-section">
          <div className="section-header">
            <span className="practice-badge">Practice</span>
            <p className="section-subtitle">Test your understanding</p>
          </div>
          <ErrorBoundary fallback={MathErrorFallback}>
            <PracticeQuiz questions={module.practiceQuiz} />
          </ErrorBoundary>
        </div>
      )}
    </article>
  );
}
