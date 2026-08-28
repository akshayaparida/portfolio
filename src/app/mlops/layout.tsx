import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import PageFooter from "@/components/PageFooter";
import { mlopsModules } from "@/data/mlops";
import "@/styles/module-page.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MLOps Engineering & Production Pipelines | Akshaya Parida",
  description:
    "End-to-end MLOps engineering workflows: Data Exploration, Automated Data Validation, Reproducible Model Training with DVC & MLflow, and Production Model Deployment on AWS.",
  keywords: [
    "MLOps",
    "Machine Learning Operations",
    "ML Pipelines",
    "Model Deployment",
    "DVC Data Versioning",
    "MLflow Experiment Tracking",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/mlops",
  },
  openGraph: {
    title: "MLOps Engineering & Production Pipelines | Akshaya Parida",
    description:
      "End-to-end MLOps engineering workflows: Data Validation, Reproducible Training, and Model Deployment.",
    url: "https://akshayaparida.vercel.app/mlops",
    type: "website",
  },
};

export default function MLOpsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="MLOps Engineering"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div className="module-page-layout">
        <ModuleSidebar modules={mlopsModules} basePath="/mlops" />
        <main className="module-content-area">{children}</main>
      </div>

      <PageFooter moduleName="MLOps" issueLabel="mlops" />
    </div>
  );
}
