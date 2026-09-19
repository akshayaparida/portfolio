"use client";

import { useState, useMemo } from "react";
import hljs from "highlight.js/lib/core";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import python from "highlight.js/lib/languages/python";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import bash from "highlight.js/lib/languages/bash";
import java from "highlight.js/lib/languages/java";
import go from "highlight.js/lib/languages/go";
import rust from "highlight.js/lib/languages/rust";
import sql from "highlight.js/lib/languages/sql";

// Register languages once
hljs.registerLanguage("c", c);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("python", python);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("java", java);
hljs.registerLanguage("go", go);
hljs.registerLanguage("rust", rust);
hljs.registerLanguage("sql", sql);

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children?: React.ReactNode;
  node?: object; // react-markdown may pass additional properties like node
  inline?: boolean; // react-markdown may pass inline prop
  isBlockCode?: boolean;
}

interface MultiLangTab {
  lang: string;
  label: string;
  title: string;
  code: string;
}

const getLanguageIcon = (lang: string) => {
  switch (lang.toLowerCase()) {
    case "c":
      return "fa-solid fa-code";
    case "cpp":
    case "c++":
      return "fa-solid fa-code";
    case "python":
    case "py":
      return "fa-brands fa-python";
    case "javascript":
    case "js":
      return "fa-brands fa-js";
    case "typescript":
    case "ts":
      return "fa-solid fa-code";
    case "bash":
    case "sh":
    case "shell":
      return "fa-solid fa-terminal";
    case "java":
      return "fa-brands fa-java";
    case "go":
    case "rust":
      return "fa-solid fa-code";
    case "text":
    case "txt":
    case "plain":
      return "fa-solid fa-terminal";
    default:
      return "fa-solid fa-code";
  }
};

const getLanguageDisplayName = (lang: string) => {
  switch (lang.toLowerCase()) {
    case "c":
      return "C";
    case "cpp":
    case "c++":
      return "C++";
    case "python":
    case "py":
      return "Python";
    case "javascript":
    case "js":
      return "JS";
    case "typescript":
    case "ts":
      return "TS";
    case "bash":
    case "sh":
    case "shell":
      return "Bash";
    case "java":
      return "Java";
    case "go":
      return "Go";
    case "rust":
      return "Rust";
    case "sql":
      return "SQL";
    case "text":
    case "txt":
    case "plain":
      return "Diagram / Text";
    default:
      return lang.toUpperCase();
  }
};

function highlightCode(code: string, lang: string): string {
  try {
    if (hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang, ignoreIllegals: true })
        .value;
    }
  } catch {
    /* fallback to plain text */
  }
  return hljs.highlightAuto(code).value;
}

// Properly extract the text content for copying
const getTextContent = (nodes: React.ReactNode): string => {
  if (typeof nodes === "string") {
    return nodes;
  } else if (Array.isArray(nodes)) {
    return nodes.map(getTextContent).join("");
  } else if (nodes && typeof nodes === "object") {
    const element = nodes as { props?: { children?: React.ReactNode } };
    if (element.props?.children) {
      return getTextContent(element.props.children);
    }
  }
  return "";
};

/* ─────────────── Multi-Language Tabbed Code Block ─────────────── */

function MultiLangCodeBlock({ tabs }: { tabs: MultiLangTab[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeTab = tabs[activeIndex];

  const highlightedCode = useMemo(
    () => highlightCode(activeTab.code, activeTab.lang),
    [activeTab.code, activeTab.lang],
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="multilang-code-wrapper">
      <div className="multilang-header">
        <div className="multilang-tabs">
          {tabs.map((tab, idx) => (
            <button
              key={tab.lang + idx}
              className={`multilang-tab-btn ${idx === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(idx)}
              title={tab.title || `Switch to ${tab.label}`}
              aria-label={`Switch to ${tab.label} implementation`}
            >
              <i
                className={`${getLanguageIcon(tab.lang)} multilang-tab-icon`}
              />
              <span>{getLanguageDisplayName(tab.lang)}</span>
            </button>
          ))}
        </div>

        {activeTab.title && (
          <span className="multilang-subtitle visible">{activeTab.title}</span>
        )}

        <button
          className={`multilang-copy-btn ${copied ? "copied" : ""}`}
          onClick={handleCopy}
          title="Copy code to clipboard"
          aria-label={copied ? "Copied to clipboard" : "Copy code"}
        >
          <i
            className={`fa-solid ${copied ? "fa-check" : "fa-copy"}`}
            style={{ fontSize: 12 }}
          />
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>

      <div className="multilang-code-body">
        <pre>
          <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        </pre>
      </div>
    </div>
  );
}

/* ─────────────── Section Video Player Block ─────────────── */

interface SectionVideoData {
  id: string;
  title: string;
  channel: string;
  duration?: string;
  speed?: string;
  relevance: string;
  takeaway?: string;
}

function SectionVideoBlock({ video }: { video: SectionVideoData }) {
  const youtubeUrl = `https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1`;
  const directUrl = `https://www.youtube.com/watch?v=${video.id}`;

  return (
    <div
      className="section-video-card"
      role="region"
      aria-label={`Video: ${video.title}`}
    >
      <div className="section-video-top-bar">
        <div className="section-video-badge">
          <i className="fa-brands fa-youtube section-video-icon"></i>
          <span>Watch First (Intuition)</span>
        </div>
        <div className="section-video-meta-pills">
          <span className="section-video-channel">
            <i className="fa-solid fa-graduation-cap"></i> {video.channel}
          </span>
          {video.duration && (
            <span className="section-video-duration">
              <i className="fa-regular fa-clock"></i> {video.duration}
            </span>
          )}
          {video.speed && (
            <span
              className="section-video-speed"
              title="Recommended speed for efficient studying"
            >
              <i className="fa-solid fa-gauge-high"></i> Speed: {video.speed}
            </span>
          )}
        </div>
      </div>

      <h4 className="section-video-title">{video.title}</h4>

      <div className="section-video-player-wrapper">
        <iframe
          src={youtubeUrl}
          title={video.title}
          className="section-video-iframe"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>

      <div className="section-video-footer">
        <div className="section-video-relevance-box">
          <div className="section-video-relevance-label">
            <i className="fa-solid fa-award"></i>
            <span>Exam Relevance</span>
          </div>
          <p className="section-video-relevance-text">{video.relevance}</p>
        </div>
        {video.takeaway && (
          <p className="section-video-takeaway">{video.takeaway}</p>
        )}
        <div className="section-video-action-row">
          <a
            href={directUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="section-video-external-btn"
            title="Open in YouTube app for mobile offline view or 2x speed"
          >
            <span>Watch on YouTube</span>
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Single Code Block (existing behavior) ─────────────── */

const CodeBlock: React.FunctionComponent<CodeBlockProps> = ({
  className,
  children,
  inline,
  ...props
}) => {
  const [copied, setCopied] = useState(false);

  const codeString = getTextContent(children);
  const match = /language-(\w+)/.exec(className || "");
  const language = match?.[1] || "text";

  // Syntax-highlight single-language code blocks unconditionally (Rules of Hooks)
  const highlighted = useMemo(
    () => highlightCode(codeString, language),
    [codeString, language],
  );

  // Determine if this is inline vs block based on:
  // 1. isBlockCode prop passed from parent Pre
  // 2. inline === false explicitly passed by parser
  // 3. presence of language-xxx in className
  // 4. codeString contains multiple lines (newlines '\n')
  const isBlock =
    (props as { isBlockCode?: boolean }).isBlockCode === true ||
    inline === false ||
    Boolean(match) ||
    codeString.includes("\n");

  if (!isBlock) {
    return <code className={className}>{children}</code>;
  }

  // Section Video Player block
  if (language === "video" || language === "youtube") {
    try {
      const videoData: SectionVideoData = JSON.parse(codeString);
      if (videoData && videoData.id) {
        return <SectionVideoBlock video={videoData} />;
      }
    } catch {
      /* fall through to standard code block */
    }
  }

  // Multi-language tabbed block
  if (language === "multilang") {
    try {
      const tabs: MultiLangTab[] = JSON.parse(codeString);
      if (Array.isArray(tabs) && tabs.length >= 2) {
        return <MultiLangCodeBlock tabs={tabs} />;
      }
    } catch {
      /* fall through to single block */
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-header">
        <div className="code-lang-badge">
          <i className={`${getLanguageIcon(language)} lang-icon`} />
          <span className="code-language">
            {getLanguageDisplayName(language)}
          </span>
        </div>
        <button
          className={`copy-button ${copied ? "copied" : ""}`}
          onClick={handleCopy}
          title="Copy code to clipboard"
          aria-label={copied ? "Copied to clipboard" : "Copy code"}
        >
          <i
            className={`fa-solid ${copied ? "fa-check" : "fa-copy"} copy-icon`}
          />
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <pre className={className || "language-text"}>
        <code
          className={className || "language-text"}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
      <style jsx>{`
        .code-block-wrapper {
          position: relative;
          margin: 1.25rem 0 1.5rem 0;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--border, #30363d);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .code-block-wrapper pre {
          margin: 0 !important;
          padding: 1rem 1.25rem !important;
          background: #0d1117 !important;
          border: none !important;
          border-radius: 0 0 10px 10px !important;
          box-shadow: none !important;
          overflow-x: auto !important;
          font-family: var(--font-mono, "Fira Code", monospace) !important;
          font-size: 0.85rem !important;
          line-height: 1.5 !important;
          color: #e6edf3 !important;
        }

        .code-block-wrapper pre code {
          background: transparent !important;
          padding: 0 !important;
          border: none !important;
          border-radius: 0 !important;
          font-size: inherit !important;
          color: inherit !important;
          white-space: pre !important;
          word-break: normal !important;
          word-wrap: normal !important;
          display: block !important;
        }

        .code-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #161b22;
          color: #e6edf3;
          padding: 8px 14px;
          border-bottom: 1px solid #30363d;
          font-size: 12px;
          font-family: var(--font-mono, "Fira Code", monospace);
        }

        .code-lang-badge {
          display: flex;
          align-items: center;
          gap: 7px;
          background: rgba(255, 255, 255, 0.07);
          padding: 3px 9px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .lang-icon {
          font-size: 13px;
          color: #10b981;
        }

        .code-language {
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #58a6ff;
        }

        .copy-button {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #21262d;
          color: #c9d1d9;
          border: 1px solid #30363d;
          padding: 4px 10px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .copy-button:hover {
          background: #30363d;
          color: #ffffff;
          border-color: #8b949e;
        }

        .copy-button.copied {
          background: #0f533a;
          color: #3fb950;
          border-color: #238636;
        }

        .copy-icon {
          font-size: 12px;
        }
      `}</style>
    </div>
  );
};

export default CodeBlock;
