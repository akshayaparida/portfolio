import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import PageFooter from "@/components/PageFooter";
import { professionalCommunicationModules } from "@/data/curaj-msc-cs/professional-communication";
import "@/styles/module-page.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Professional Communication (CSC-406 / 6.0CSC04) Study Notes & CIA-1 Model Answers | Akshaya Parida",
  description:
    "Official syllabus-aligned study notes and in-depth model answers for CURAJ M.Sc. Computer Science Professional Communication (CSC-406 / 6.0CSC04): CIA-1 Predicted Paper, Grammar & Syntax, Active Listening, Speaking Barriers, and Practice Quiz.",
  keywords: [
    "CURAJ Professional Communication",
    "CSC-406",
    "6.0CSC04",
    "CIA-1 Exam Model Answers",
    "Phrases and Clauses",
    "Active Listening Barriers",
    "Speaking Barriers",
    "Creative Writing",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/professional-communication",
  },
  openGraph: {
    title:
      "Professional Communication (CSC-406 / 6.0CSC04) Study Notes & Model Answers | Akshaya Parida",
    description:
      "Official syllabus-aligned study notes, interactive audio reader, and in-depth CIA-1 model answers for Professional Communication at CURAJ.",
    url: "https://akshayaparida.vercel.app/professional-communication",
    type: "website",
  },
};

export default function ProfessionalCommunicationModuleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="Professional Communication (CSC-406 / 6.0CSC04)"
        backLink="/professional-communication"
        backTitle="Course Hub"
      />

      <div className="module-page-layout">
        <ModuleSidebar
          modules={professionalCommunicationModules}
          basePath="/professional-communication"
        />
        <main className="module-content-area">{children}</main>
      </div>

      <PageFooter
        moduleName="Professional Communication"
        issueLabel="professional-communication"
      />
    </div>
  );
}
