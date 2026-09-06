import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import PageFooter from "@/components/PageFooter";
import { cProgrammingModules } from "@/data/c-programming";
import "@/styles/module-page.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "C Programming | GATE CS & UGC NET JRF | Akshaya Parida",
  description:
    "Comprehensive C Programming aligned with GATE CS and UGC NET JRF syllabus: Types & Promotions, Operator Precedence, Scope & Storage Classes, Pointers & Array Decay, Call Stack & Recursion, Dynamic Memory & Struct Padding, Preprocessor Macros, and Canonical Algorithms in C.",
  keywords: [
    "C Programming",
    "C Programming for GATE CS",
    "UGC NET CS C Programming",
    "Pointers in C",
    "Array Decay in C",
    "C Precedence Traps",
    "Structure Padding in C",
    "Dynamic Memory C",
    "GATE CS",
    "UGC NET JRF",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/c-programming",
  },
  openGraph: {
    title: "C Programming | GATE CS & UGC NET JRF | Akshaya Parida",
    description:
      "Deep technical C programming with syntax awareness, compiler quirks, technical jargon, and best practices for competitive exams and systems programming.",
    url: "https://akshayaparida.vercel.app/c-programming",
    type: "website",
  },
};

export default function CProgrammingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="C Programming"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div className="module-page-layout">
        <ModuleSidebar
          modules={cProgrammingModules}
          basePath="/c-programming"
        />
        <main className="module-content-area">{children}</main>
      </div>

      <PageFooter moduleName="C Programming" issueLabel="c-programming" />
    </div>
  );
}
