import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import PageFooter from "@/components/PageFooter";
import { osModules } from "@/data/os";
import "@/styles/module-page.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Operating Systems Notes & Concepts | Akshaya Parida",
  description:
    "In-depth Operating Systems tutorials and GATE CS concepts: Process Management, CPU Scheduling, Synchronization & Deadlocks, Memory Management, and Disk & File Systems.",
  keywords: [
    "Operating Systems",
    "OS Notes",
    "Process Synchronization",
    "Deadlock Avoidance",
    "Banker's Algorithm",
    "Virtual Memory",
    "GATE OS",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/os",
  },
  openGraph: {
    title: "Operating Systems Notes & Concepts | Akshaya Parida",
    description:
      "In-depth Operating Systems tutorials covering Process Management, Deadlocks, and Memory.",
    url: "https://akshayaparida.vercel.app/os",
    type: "website",
  },
};

export default function OSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="Operating Systems"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div className="module-page-layout">
        <ModuleSidebar modules={osModules} basePath="/os" />
        <main className="module-content-area">{children}</main>
      </div>

      <PageFooter moduleName="Operating Systems" issueLabel="os" />
    </div>
  );
}
