import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import PageFooter from "@/components/PageFooter";
import {
  advancedAlgorithmsModules,
  sidebarAdvancedAlgorithmsModules,
} from "@/data/curaj-msc-cs/advanced-algorithms";
import "@/styles/module-page.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "CURAJ M.Sc. CS — Advanced Algorithms (6.0CSC02 / CSC-404) Notes & CIA-1 Solutions | Akshaya Parida",
  description:
    "Official syllabus-aligned study notes and examination solutions for CURAJ M.Sc. Computer Science Core 2 (6.0CSC02 / CSC-404): Unit 1 Asymptotic Analysis, Master Theorem, Divide-and-Conquer in C, CIA-1 September 2026 official paper (algocia126.jpeg) verified solutions, and practice quiz.",
  keywords: [
    "CURAJ Advanced Algorithms Notes",
    "6.0CSC02",
    "CSC-404",
    "algocia126",
    "algocia126.jpeg",
    "MSc Computer Science CURAJ",
    "CIA-1 September 2026",
    "Huffman Coding",
    "QuickSort Best Case Recurrence",
    "Decision vs Counting Problems",
    "Nondeterministic Linear Search",
    "Asymptotic Complexity",
    "Big-O",
    "Master Theorem",
    "Divide and Conquer in C",
    "Binary Search C",
    "Merge Sort C",
    "Strassen Matrix Multiplication",
    "CIA-1 Exam Notes",
    "UGC NET CS Algorithms",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/curaj-msc-cs/advanced-algorithms",
  },
  openGraph: {
    title:
      "CURAJ MSc CS — Advanced Algorithms (6.0CSC02) Notes & CIA-1 Solutions (algocia126) | Akshaya Parida",
    description:
      "Official syllabus-aligned study notes for CURAJ MSc CS: Unit 1 Analysis & Divide-Conquer in C, CIA-1 September 2026 official paper (algocia126) verified model answers, and practice quiz.",
    url: "https://akshayaparida.vercel.app/curaj-msc-cs/advanced-algorithms",
    type: "website",
  },
};

export default function CurajAdvancedAlgorithmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="CURAJ MSc CS — Advanced Algorithms (6.0CSC02 / CSC-404)"
        backLink="/curaj-msc-cs"
        backTitle="CURAJ Syllabus"
      />

      <div className="module-page-layout">
        <ModuleSidebar
          modules={sidebarAdvancedAlgorithmsModules}
          basePath="/curaj-msc-cs/advanced-algorithms"
        />
        <main className="module-content-area">{children}</main>
      </div>

      <PageFooter
        moduleName="CURAJ Advanced Algorithms (6.0CSC02)"
        issueLabel="curaj-msc-cs"
      />
    </div>
  );
}
