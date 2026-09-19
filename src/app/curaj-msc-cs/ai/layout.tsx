import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import PageFooter from "@/components/PageFooter";
import { aiModules } from "@/data/curaj-msc-cs/ai";
import "@/styles/module-page.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "CURAJ M.Sc. CS — Artificial Intelligence (6.0CSC01) Notes | Akshaya Parida",
  description:
    "Official syllabus-aligned study notes for CURAJ M.Sc. Computer Science Core 1 (6.0CSC01): Unit 1 Uninformed Search, State Space vs Solution Space, State vs Node, BFS, DFS, IDS, UCS, CIA-1 model answers, and UGC NET / JRF quiz.",
  keywords: [
    "CURAJ AI Notes",
    "6.0CSC01",
    "MSc Computer Science CURAJ",
    "Uninformed Search",
    "State space search",
    "Breadth First Search",
    "Uniform Cost Search",
    "Iterative Deepening Search",
    "CIA-1 Exam Notes",
    "UGC NET CS AI",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/curaj-msc-cs/ai",
  },
  openGraph: {
    title:
      "CURAJ MSc CS — Artificial Intelligence (6.0CSC01) Notes | Akshaya Parida",
    description:
      "Official syllabus-aligned study notes for CURAJ MSc CS: Unit 1 Uninformed Search, CIA-1 model answers, and UGC NET / JRF practice quiz.",
    url: "https://akshayaparida.vercel.app/curaj-msc-cs/ai",
    type: "website",
  },
};

export default function CurajAILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="CURAJ MSc CS — Artificial Intelligence (6.0CSC01)"
        backLink="/curaj-msc-cs"
        backTitle="CURAJ Syllabus"
      />

      <div className="module-page-layout">
        <ModuleSidebar modules={aiModules} basePath="/curaj-msc-cs/ai" />
        <main className="module-content-area">{children}</main>
      </div>

      <PageFooter moduleName="CURAJ AI (6.0CSC01)" issueLabel="curaj-msc-cs" />
    </div>
  );
}
