import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import PageFooter from "@/components/PageFooter";
import { dataStructuresModules } from "@/data/data-structures";
import "@/styles/module-page.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Data Structures (C, C++, Python) | NPTEL, GATE & UGC NET | Akshaya Parida",
  description:
    "Comprehensive Data Structures aligned with NPTEL, GATE CS, and UGC NET JRF syllabus: Memory Layout, Linked Lists, Stacks, Queues, Trees, Heaps, Hashing, Graphs, and Tries with complete C, C++, and Python implementations.",
  keywords: [
    "Data Structures",
    "Data Structures in C",
    "Data Structures in C++",
    "Data Structures in Python",
    "NPTEL Data Structures",
    "GATE CS Data Structures",
    "UGC NET CS Data Structures",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/data-structures",
  },
  openGraph: {
    title: "Data Structures | C, C++, Python | Akshaya Parida",
    description:
      "Comprehensive Data Structures with annotated C, C++, and Python code implementations.",
    url: "https://akshayaparida.vercel.app/data-structures",
    type: "website",
  },
};

export default function DataStructuresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="Data Structures"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div className="module-page-layout">
        <ModuleSidebar
          modules={dataStructuresModules}
          basePath="/data-structures"
        />
        <main className="module-content-area">{children}</main>
      </div>

      <PageFooter moduleName="Data Structures" issueLabel="data-structures" />
    </div>
  );
}
