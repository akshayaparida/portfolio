"use client";

import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import PageFooter from "@/components/PageFooter";
import { networksModules } from "@/data/networks";
import "@/styles/module-page.css";

export default function NetworksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="Computer Networks"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div className="module-page-layout">
        <ModuleSidebar modules={networksModules} basePath="/networks" />
        <main className="module-content-area">{children}</main>
      </div>

      <PageFooter moduleName="Computer Networks" issueLabel="networks" />
    </div>
  );
}
