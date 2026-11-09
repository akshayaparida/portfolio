import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import PageFooter from "@/components/PageFooter";
import { openSourceModules } from "@/data/open-source";
import "@/styles/module-page.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Building Global Open Source Software | Akshaya Parida",
  description:
    "An end-to-end masterclass on engineering, governing, and scaling world-class open-source software: from GitHub Organization setup and licensing to Git plumbing, zero-loss migrations, CI/CD, and global distribution.",
  keywords: [
    "Open Source Software",
    "GitHub Organizations",
    "Git Plumbing",
    "Open Source Licensing",
    "CI/CD GitHub Actions",
    "Semantic Versioning",
    "Community Governance",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/open-source",
  },
  openGraph: {
    title: "Building Global Open Source Software | Akshaya Parida",
    description:
      "A complete technical blueprint covering architecture, governance, licensing, Git plumbing, CI/CD, and scaling open-source projects.",
    url: "https://akshayaparida.vercel.app/open-source",
    type: "website",
  },
};

export default function OpenSourceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="Open Source Engineering"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div className="module-page-layout">
        <ModuleSidebar modules={openSourceModules} basePath="/open-source" />
        <main className="module-content-area">{children}</main>
      </div>

      <PageFooter moduleName="Open Source" issueLabel="open-source" />
    </div>
  );
}
