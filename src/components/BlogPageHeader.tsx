import React from "react";
import Link from "next/link";

type BlogPageHeaderProps = {
  title: string;
  backLink: string;
  backTitle?: string;
};

/**
 * Reusable header component for blog-style pages.
 * Provides consistent navigation with back arrow, title, and home link.
 */
export default function BlogPageHeader({
  title,
  backLink,
  backTitle = "Back",
}: BlogPageHeaderProps) {
  return (
    <header className="blog-page-header">
      <Link href={backLink} className="back-link" title={backTitle}>
        <i className="fa-solid fa-arrow-left"></i>
      </Link>
      <h1 className="header-title">{title}</h1>
      <Link href="/" className="home-link" title="Home">
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
          background: rgba(250, 250, 250, 0.95);
          backdrop-filter: blur(10px);
          z-index: 100;
          border-bottom: 1px solid #e5e7eb;
        }

        .header-title {
          flex: 1;
          font-size: 1.1rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        @media (max-width: 600px) {
          .blog-page-header {
            padding: 1rem;
          }

          .header-title {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </header>
  );
}
