"use client";

import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import PageFooter from "@/components/PageFooter";
import { mlopsModules } from "@/data/mlops";
import "@/styles/module-page.css";

export default function MLOpsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="MLOps & Production AI"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div className="module-page-layout">
        <ModuleSidebar modules={mlopsModules} basePath="/mlops" />
        <main className="module-content-area">{children}</main>
      </div>

      <PageFooter moduleName="MLOps" issueLabel="mlops" />
    </div>
  );
}
