"use client";

import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import PageFooter from "@/components/PageFooter";
import { osModules } from "@/data/os";
import "@/styles/module-page.css";

export default function OSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="Operating Systems"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div className="module-page-layout">
        <ModuleSidebar modules={osModules} basePath="/os" />
        <main className="module-content-area">{children}</main>
      </div>

      <PageFooter moduleName="Operating Systems" issueLabel="os" />
    </div>
  );
}
