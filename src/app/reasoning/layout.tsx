"use client";

import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import PageFooter from "@/components/PageFooter";
import { reasoningModules } from "@/data/reasoning";
import "@/styles/module-page.css";

export default function ReasoningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="Thinking & Decision Making"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div className="module-page-layout">
        <ModuleSidebar modules={reasoningModules} basePath="/reasoning" />
        <main className="module-content-area">{children}</main>
      </div>

      <PageFooter moduleName="Reasoning" issueLabel="reasoning" />
    </div>
  );
}
