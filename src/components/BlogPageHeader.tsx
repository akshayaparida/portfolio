import React from "react";
import Link from "next/link";

type BlogPageHeaderProps = {
  title: string;
  backLink: string;
  backTitle?: string;
};

/**
 * Reusable header component for blog-style and module pages.
 * Provides consistent navigation with back arrow, title, and home link.
 */
export default function BlogPageHeader({
  title,
  backLink,
  backTitle = "Back",
}: BlogPageHeaderProps) {
  return (
    <header className="blog-page-header">
      <Link
        href={backLink}
        className="nav-btn back-link"
        title={backTitle}
        aria-label={backTitle}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <h1 className="header-title">{title}</h1>
      <Link
        href="/"
        className="nav-btn home-link"
        title="Home"
        aria-label="Home"
      >
        <i className="fa-solid fa-house"></i>
      </Link>

      <style jsx>{`
        .blog-page-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 2rem;
          position: sticky;
          top: 0;
          background: var(--surface);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 100;
          border-bottom: 1px solid var(--border);
          transition:
            background-color 0.3s ease,
            border-color 0.3s ease;
        }

        .nav-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 9px;
          background: var(--bg-light);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.2s ease;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .nav-btn:hover {
          background: var(--border);
          color: var(--heading-color);
        }

        .header-title {
          flex: 1;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--heading-color);
          margin: 0;
          letter-spacing: -0.01em;
        }

        @media (max-width: 600px) {
          .blog-page-header {
            padding: 0.85rem 1rem;
          }

          .header-title {
            font-size: 1rem;
          }

          .nav-btn {
            width: 34px;
            height: 34px;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </header>
  );
}
