import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import PageFooter from "@/components/PageFooter";
import { digitalFundamentalsModules } from "@/data/digital-fundamentals";
import "@/styles/module-page.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Logic & Computer Fundamentals | Akshaya Parida",
  description:
    "Foundational concepts in Digital Electronics and Computer Architecture: Number Systems (Binary, Octal, Hex, 2's Complement), Logic Gates, Boolean Algebra, and Minimization.",
  keywords: [
    "Digital Fundamentals",
    "Number Systems",
    "Logic Gates",
    "Boolean Algebra",
    "K-Maps",
    "Computer Arithmetic",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/digital-fundamentals",
  },
  openGraph: {
    title: "Digital Logic & Computer Fundamentals | Akshaya Parida",
    description:
      "Foundational concepts in Digital Electronics, Number Systems, and Logic Gates.",
    url: "https://akshayaparida.vercel.app/digital-fundamentals",
    type: "website",
  },
};

export default function DigitalFundamentalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="Digital Fundamentals"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div className="module-page-layout">
        <ModuleSidebar
          modules={digitalFundamentalsModules}
          basePath="/digital-fundamentals"
        />
        <main className="module-content-area">{children}</main>
      </div>

      <PageFooter
        moduleName="Digital Fundamentals"
        issueLabel="digital-fundamentals"
      />
    </div>
  );
}
