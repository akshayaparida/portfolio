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
import TableOfContents, { slugify } from "@/components/TableOfContents";
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
    "*": [
      ...(defaultSchema.attributes?.["*"] || []),
      "className",
      "id",
      "style",
    ],
    a: [...(defaultSchema.attributes?.a || []), "target", "rel", "href"],
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

// Helper to extract plain text string from React children nodes
function getNodeText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) {
    return children.map(getNodeText).join("");
  }
  if (React.isValidElement<{ children?: React.ReactNode }>(children)) {
    if (children.props?.children) {
      return getNodeText(children.props.children);
    }
  }
  return "";
}

// Suppress duplicate markdown h1 that repeats the module title
const Heading1 = () => null;

// Custom Headings with Auto-Generated IDs & Clean Hover Anchors
const Heading2 = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  const text = getNodeText(children);
  const id = slugify(text);
  return (
    <h2 id={id} className="heading-with-anchor heading-h2 group" {...props}>
      <span className="heading-text">{children}</span>
      <a
        href={`#${id}`}
        className="heading-anchor-link"
        aria-label={`Link to section: ${text}`}
        title="Direct section link"
      >
        #
      </a>
    </h2>
  );
};

const Heading3 = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  const text = getNodeText(children);
  const id = slugify(text);
  return (
    <h3 id={id} className="heading-with-anchor heading-h3 group" {...props}>
      <span className="heading-text">{children}</span>
      <a
        href={`#${id}`}
        className="heading-anchor-link"
        aria-label={`Link to subtopic: ${text}`}
        title="Direct section link"
      >
        #
      </a>
    </h3>
  );
};

const Heading4 = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  const text = getNodeText(children);
  const id = slugify(text);
  return (
    <h4 id={id} className="heading-with-anchor heading-h4 group" {...props}>
      <span className="heading-text">{children}</span>
      <a
        href={`#${id}`}
        className="heading-anchor-link"
        aria-label={`Link to subtopic: ${text}`}
        title="Direct section link"
      >
        #
      </a>
    </h4>
  );
};

// Custom Blockquote Renderer for Rich Alert Callouts
const Blockquote = ({
  children,
  ...props
}: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => {
  const text = getNodeText(children);
  let type = "default";
  let icon = "fa-quote-left";
  let label = "Note";

  if (/^(TIP|Tip):/i.test(text.trim())) {
    type = "tip";
    icon = "fa-lightbulb";
    label = "Tip";
  } else if (/^(NOTE|Note):/i.test(text.trim())) {
    type = "note";
    icon = "fa-circle-info";
    label = "Note";
  } else if (/^(WARNING|Warning|CAUTION|Caution):/i.test(text.trim())) {
    type = "warning";
    icon = "fa-triangle-exclamation";
    label = "Warning";
  } else if (/^(IMPORTANT|Important):/i.test(text.trim())) {
    type = "important";
    icon = "fa-star";
    label = "Important";
  } else if (/^(Exam Shortcut|EXAM SHORTCUT|Exam Tip):/i.test(text.trim())) {
    type = "exam";
    icon = "fa-bolt";
    label = "Exam Shortcut";
  }

  if (type !== "default") {
    return (
      <div className={`callout-box callout-${type}`}>
        <div className="callout-header-bar">
          <i className={`fa-solid ${icon} callout-icon-glyph`}></i>
          <span className="callout-badge-title">{label}</span>
        </div>
        <div className="callout-content-body">{children}</div>
      </div>
    );
  }

  return (
    <blockquote className="custom-standard-blockquote" {...props}>
      {children}
    </blockquote>
  );
};

// Estimate reading time based on word count
function getReadingTime(text?: string): number {
  if (!text) return 3;
  const words = text.trim().split(/\s+/).length;
  return Math.max(2, Math.ceil(words / 180));
}

export default function ModuleViewer({
  module,
  index,
  demoComponents = {},
}: ModuleViewerProps) {
  const readingTime = getReadingTime(module.detailedContent);
  const quizCount = module.practiceQuiz?.length || 0;
  const hasDemos = Boolean(module.subModules && module.subModules.length > 0);
  const hasQuiz = quizCount > 0;

  return (
    <div className="module-viewer-layout">
      {/* Center Main Content Card */}
      <article className="module-card">
        {/* Module Header with Clean Minimal Metadata */}
        <header className="module-header">
          <div className="module-meta-line">
            <span className="module-number">Module {index + 1}</span>
            <span className="meta-dot">·</span>
            <span className="module-meta-text">
              <i className="fa-regular fa-clock"></i> {readingTime} min read
            </span>
            {hasQuiz && (
              <>
                <span className="meta-dot">·</span>
                <span className="module-meta-text">
                  <i className="fa-solid fa-list-check"></i> {quizCount}{" "}
                  Questions
                </span>
              </>
            )}
            {module.status && (
              <>
                <span className="meta-dot">·</span>
                <span className="module-meta-text status-text">
                  {module.status === "in-progress"
                    ? "In Progress"
                    : module.status}
                </span>
              </>
            )}
          </div>

          <h2 className="module-title">{module.title}</h2>
          <p className="module-description">{module.description}</p>
        </header>

        {/* Theory & Markdown Content */}
        {module.detailedContent && (
          <section className="theory-section">
            <div className="markdown-content">
              <ErrorBoundary fallback={MathErrorFallback}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[
                    rehypeHighlight,
                    [rehypeSanitize, sanitizeSchema],
                  ]}
                  components={{
                    code: CodeBlock,
                    pre: Pre,
                    a: ExternalLink,
                    h1: Heading1,
                    h2: Heading2,
                    h3: Heading3,
                    h4: Heading4,
                    blockquote: Blockquote,
                  }}
                >
                  {module.detailedContent}
                </ReactMarkdown>
              </ErrorBoundary>
            </div>
          </section>
        )}

        {/* Interactive Demos */}
        {hasDemos && (
          <section id="interactive-demos" className="interactive-section">
            <div className="section-header">
              <h3 className="section-title">
                <i className="fa-solid fa-cube"></i> Interactive Demos
              </h3>
              <p className="section-subtitle">
                Experiment with dynamic visualizations and live controls
              </p>
            </div>

            {module.subModules?.map((subModule) => {
              const DemoComponent = demoComponents[subModule.id];
              return DemoComponent ? (
                <div key={subModule.id} className="demo-block">
                  <h4 className="demo-title">{subModule.title}</h4>
                  <p className="demo-description">{subModule.description}</p>
                  <div className="demo-content">
                    <ErrorBoundary fallback={MathErrorFallback}>
                      <DemoComponent />
                    </ErrorBoundary>
                  </div>
                </div>
              ) : null;
            })}
          </section>
        )}

        {/* Practice Quiz */}
        {module.practiceQuiz && module.practiceQuiz.length > 0 && (
          <section id="practice-quiz" className="practice-section">
            <div className="section-header">
              <h3 className="section-title">
                <i className="fa-solid fa-circle-question"></i> Practice Quiz
              </h3>
              <p className="section-subtitle">
                Test your understanding with step-by-step solutions
              </p>
            </div>
            <ErrorBoundary fallback={MathErrorFallback}>
              <PracticeQuiz questions={module.practiceQuiz} />
            </ErrorBoundary>
          </section>
        )}
      </article>

      {/* Right Column: Table of Contents & Subtopic Navigator */}
      <aside className="module-toc-column">
        <TableOfContents
          content={module.detailedContent}
          hasDemos={hasDemos}
          hasQuiz={hasQuiz}
          quizCount={quizCount}
        />
      </aside>
    </div>
  );
}
