import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import PageFooter from "@/components/PageFooter";
import { algorithmsModules } from "@/data/algorithms";
import "@/styles/module-page.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Algorithms (C, C++, Python) | NPTEL, GATE & UGC NET | Akshaya Parida",
  description:
    "Comprehensive Algorithms track aligned with NPTEL, GATE CS, and UGC NET JRF syllabus: Asymptotic Complexity, Searching, Sorting, Divide & Conquer, Greedy, Dynamic Programming, Graphs, Backtracking, and String Matching with problem-solving implementations in C, C++, and Python.",
  keywords: [
    "Algorithms",
    "Algorithms in C",
    "Algorithms in C++",
    "Algorithms in Python",
    "NPTEL Algorithms",
    "GATE CS Algorithms",
    "UGC NET CS Algorithms",
    "Problem Solving",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/algorithms",
  },
  openGraph: {
    title: "Algorithms | C, C++, Python | Akshaya Parida",
    description:
      "Comprehensive Algorithms with problem solving and annotated C, C++, and Python code implementations.",
    url: "https://akshayaparida.vercel.app/algorithms",
    type: "website",
  },
};

export default function AlgorithmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="Algorithms"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div className="module-page-layout">
        <ModuleSidebar modules={algorithmsModules} basePath="/algorithms" />
        <main className="module-content-area">{children}</main>
      </div>

      <PageFooter moduleName="Algorithms" issueLabel="algorithms" />
    </div>
  );
}
