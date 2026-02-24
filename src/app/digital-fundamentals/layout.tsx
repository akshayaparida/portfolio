"use client";

import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import DigitalFundamentalsModuleIcon from "@/components/DigitalFundamentalsModuleIcon";
import { digitalFundamentalsModules } from "@/data/digital-fundamentals";
import gitMetadata from "@/data/git-metadata.json";
import "@/styles/module-page.css";

export default function DigitalFundamentalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="Digital Fundamentals"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div className="module-page-layout">
        <ModuleSidebar
          modules={digitalFundamentalsModules}
          basePath="/digital-fundamentals"
          renderIcon={(moduleId: string) => (
            <DigitalFundamentalsModuleIcon moduleId={moduleId} />
          )}
        />
        <main className="module-content-area">{children}</main>
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
            href="https://github.com/akshayaparida/portfolio/issues/new?title=Digital%20Fundamentals%20Error&labels=bug,digital-fundamentals&body=%23%23%20Error%20Description%0A%0A%3C!--%20Describe%20the%20error%20--%3E"
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
