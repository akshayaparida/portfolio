"use client";

import React from "react";
import gitMetadata from "@/data/git-metadata.json";

interface PageFooterProps {
  moduleName?: string;
  issueLabel?: string;
}

/**
 * Standard page footer used across all learning pages, study guides, and subject hubs.
 * Provides live git commit date link and error reporting.
 */
export default function PageFooter({
  moduleName = "Page",
  issueLabel = "feedback",
}: PageFooterProps) {
  const issueUrl = `https://github.com/akshayaparida/portfolio/issues/new?title=${encodeURIComponent(
    `${moduleName} Error / Feedback`,
  )}&labels=bug,${encodeURIComponent(issueLabel)}`;

  return (
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
        <a href={issueUrl} target="_blank" rel="noopener noreferrer">
          Report an error
        </a>
      </p>
    </footer>
  );
}
