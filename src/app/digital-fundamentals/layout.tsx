"use client";

import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import PageFooter from "@/components/PageFooter";
import { digitalFundamentalsModules } from "@/data/digital-fundamentals";
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
        />
        <main className="module-content-area">{children}</main>
      </div>

      <PageFooter
        moduleName="Digital Fundamentals"
        issueLabel="digital-fundamentals"
      />
    </div>
  );
}
