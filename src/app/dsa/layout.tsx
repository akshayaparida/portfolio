import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import PageFooter from "@/components/PageFooter";
import { dsaModules } from "@/data/dsa";
import "@/styles/module-page.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Structures & Algorithms | Akshaya Parida",
  description:
    "Comprehensive guides, interactive visualizations, complexity analysis, and GATE CS previous year question walkthroughs for Core Data Structures and Algorithms.",
  keywords: [
    "Data Structures",
    "Algorithms",
    "DSA Notes",
    "Trees",
    "Graphs",
    "Dynamic Programming",
    "GATE CS DSA",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/dsa",
  },
  openGraph: {
    title: "Data Structures & Algorithms | Akshaya Parida",
    description:
      "Comprehensive guides and analysis for Data Structures and Algorithms.",
    url: "https://akshayaparida.vercel.app/dsa",
    type: "website",
  },
};

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
