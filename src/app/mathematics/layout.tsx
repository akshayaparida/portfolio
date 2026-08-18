"use client";

import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import PageFooter from "@/components/PageFooter";
import { mathematicsModules } from "@/data/mathematics";
import "@/styles/module-page.css";

export default function MathematicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="Mathematics for AI Engineers"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div className="module-page-layout">
        <ModuleSidebar modules={mathematicsModules} basePath="/mathematics" />
        <main className="module-content-area">{children}</main>
      </div>

      <PageFooter moduleName="Mathematics" issueLabel="mathematics" />
    </div>
  );
}
