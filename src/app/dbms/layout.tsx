import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import PageFooter from "@/components/PageFooter";
import { dbmsModules } from "@/data/dbms";
import "@/styles/module-page.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Database Management Systems (DBMS) | Akshaya Parida",
  description:
    "Comprehensive guides to Database Management Systems: Relational Algebra, SQL Queries, Functional Dependencies, Normalization (1NF to BCNF), Transactions & Concurrency, and Indexing.",
  keywords: [
    "DBMS",
    "Database Management Systems",
    "SQL Queries",
    "Normalization",
    "ACID Properties",
    "B-Trees",
    "GATE DBMS",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/dbms",
  },
  openGraph: {
    title: "Database Management Systems (DBMS) | Akshaya Parida",
    description:
      "Comprehensive guides to DBMS: SQL, Normalization, Transactions, and Indexing.",
    url: "https://akshayaparida.vercel.app/dbms",
    type: "website",
  },
};

export default function DBMSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="Database Management Systems"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div className="module-page-layout">
        <ModuleSidebar modules={dbmsModules} basePath="/dbms" />
        <main className="module-content-area">{children}</main>
      </div>

      <PageFooter moduleName="DBMS" issueLabel="dbms" />
    </div>
  );
}
