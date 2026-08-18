"use client";

import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import PageFooter from "@/components/PageFooter";
import { dbmsModules } from "@/data/dbms";
import "@/styles/module-page.css";

export default function DBMSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="Database Management Systems"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div className="module-page-layout">
        <ModuleSidebar modules={dbmsModules} basePath="/dbms" />
        <main className="module-content-area">{children}</main>
      </div>

      <PageFooter moduleName="Database Management Systems" issueLabel="dbms" />
    </div>
  );
}
