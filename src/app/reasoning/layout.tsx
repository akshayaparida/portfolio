import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import PageFooter from "@/components/PageFooter";
import { reasoningModules } from "@/data/reasoning";
import "@/styles/module-page.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logical Reasoning & Quantitative Aptitude | Akshaya Parida",
  description:
    "Comprehensive guides and practice questions for Logical Reasoning and Quantitative Aptitude: Number Series, Coding-Decoding, Analogies, Syllogisms, Blood Relations, and Direction Sense.",
  keywords: [
    "Logical Reasoning",
    "Quantitative Aptitude",
    "Number Series",
    "Coding Decoding",
    "Syllogisms",
    "GATE General Aptitude",
    "UGC NET Paper 1",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/reasoning",
  },
  openGraph: {
    title: "Logical Reasoning & Quantitative Aptitude | Akshaya Parida",
    description:
      "Comprehensive guides and practice questions for Logical Reasoning and Quantitative Aptitude.",
    url: "https://akshayaparida.vercel.app/reasoning",
    type: "website",
  },
};

export default function ReasoningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="Reasoning & Aptitude"
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
