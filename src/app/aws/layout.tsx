"use client";

import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import PageFooter from "@/components/PageFooter";
import { awsModules } from "@/data/aws";
import "@/styles/module-page.css";

export default function AWSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="AWS Cloud"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div className="module-page-layout">
        <ModuleSidebar modules={awsModules} basePath="/aws" />
        <main className="module-content-area">{children}</main>
      </div>

      <PageFooter moduleName="AWS Cloud" issueLabel="aws" />
    </div>
  );
}
