"use client";

import React, { useEffect, useState, useMemo } from "react";

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  content?: string;
  hasDemos?: boolean;
  hasQuiz?: boolean;
  quizCount?: number;
}

// Generate URL/anchor-friendly slugs from markdown headings
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove special punctuation
    .trim()
    .replace(/\s+/g, "-");
}

export function extractHeadings(
  content?: string,
  hasDemos?: boolean,
  hasQuiz?: boolean,
): TocItem[] {
  if (!content) return [];

  const items: TocItem[] = [];
  const lines = content.split("\n");
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const h2Match = line.match(/^##\s+(.+)$/);
    const h3Match = line.match(/^###\s+(.+)$/);
    const h4Match = line.match(/^####\s+(.+)$/);

    if (h2Match) {
      const rawTitle = h2Match[1].trim();
      const cleanTitle = rawTitle.replace(/[*_`]/g, "");
      items.push({
        id: slugify(cleanTitle),
        title: cleanTitle,
        level: 2,
      });
    } else if (h3Match) {
      const rawTitle = h3Match[1].trim();
      const cleanTitle = rawTitle.replace(/[*_`]/g, "");
      items.push({
        id: slugify(cleanTitle),
        title: cleanTitle,
        level: 3,
      });
    } else if (h4Match) {
      const rawTitle = h4Match[1].trim();
      const cleanTitle = rawTitle.replace(/[*_`]/g, "");
      items.push({
        id: slugify(cleanTitle),
        title: cleanTitle,
        level: 4,
      });
    }
  }

  if (hasDemos) {
    items.push({
      id: "interactive-demos",
      title: "Interactive Demos",
      level: 2,
    });
  }

  if (hasQuiz) {
    items.push({
      id: "practice-quiz",
      title: "Practice Quiz",
      level: 2,
    });
  }

  return items;
}

export default function TableOfContents({
  content,
  hasDemos = false,
  hasQuiz = false,
  quizCount = 0,
}: TableOfContentsProps) {
  const headings = useMemo(
    () => extractHeadings(content, hasDemos, hasQuiz),
    [content, hasDemos, hasQuiz],
  );

  const [activeId, setActiveId] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(
          Math.min(100, Math.max(0, Math.round(currentProgress))),
        );
      }

      if (headings.length === 0) return;

      const headingElements = headings
        .map((h) => ({ id: h.id, element: document.getElementById(h.id) }))
        .filter((h) => h.element !== null);

      if (headingElements.length === 0) return;

      const scrollPos = window.scrollY + 120;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const { id, element } = headingElements[i];
        if (element && element.offsetTop <= scrollPos) {
          setActiveId(id);
          return;
        }
      }

      setActiveId(headingElements[0].id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyPageLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="toc-container" aria-label="Table of Contents">
      <div className="toc-card">
        {/* Header & Progress Bar */}
        <div className="toc-header">
          <div className="toc-title-row">
            <span className="toc-badge">
              <i className="fa-solid fa-list-ul"></i> On This Page
            </span>
            <span className="toc-progress-text">{scrollProgress}% read</span>
          </div>

          <div
            className="toc-progress-bar-bg"
            title={`${scrollProgress}% completed`}
          >
            <div
              className="toc-progress-bar-fill"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>

        {/* Headings List */}
        <div className="toc-list-wrapper">
          <ul className="toc-list">
            {headings.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li
                  key={item.id}
                  className={`toc-item toc-level-${item.level} ${
                    isActive ? "toc-active" : ""
                  }`}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className="toc-link"
                  >
                    <span className="toc-dot" />
                    <span className="toc-text">{item.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="toc-actions">
          {hasQuiz && (
            <a
              href="#practice-quiz"
              onClick={(e) => scrollToSection(e, "practice-quiz")}
              className="toc-quick-btn quiz-btn"
            >
              <i className="fa-solid fa-circle-question"></i>
              <span>Practice Quiz ({quizCount > 0 ? quizCount : "MCQs"})</span>
            </a>
          )}

          {hasDemos && (
            <a
              href="#interactive-demos"
              onClick={(e) => scrollToSection(e, "interactive-demos")}
              className="toc-quick-btn demo-btn"
            >
              <i className="fa-solid fa-cube"></i>
              <span>Interactive Demos</span>
            </a>
          )}

          <div className="toc-btn-row">
            <button
              onClick={copyPageLink}
              className="toc-icon-btn"
              title="Copy module link"
            >
              <i
                className={`fa-solid ${copied ? "fa-check text-green-500" : "fa-link"}`}
              ></i>
              <span>{copied ? "Copied" : "Share"}</span>
            </button>

            <button
              onClick={scrollToTop}
              className="toc-icon-btn"
              title="Back to top"
            >
              <i className="fa-solid fa-arrow-up"></i>
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
