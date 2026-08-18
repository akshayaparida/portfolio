"use client";

import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import PageFooter from "@/components/PageFooter";
import { dsaModules } from "@/data/dsa";
import "@/styles/module-page.css";

export default function DSALayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="Data Structures & Algorithms"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div className="module-page-layout">
        <ModuleSidebar modules={dsaModules} basePath="/dsa" />
        <main className="module-content-area">{children}</main>
      </div>

      <PageFooter moduleName="Data Structures & Algorithms" issueLabel="dsa" />
    </div>
  );
}
