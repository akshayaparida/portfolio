import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import PageFooter from "@/components/PageFooter";
import { awsModules } from "@/data/aws";
import "@/styles/module-page.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AWS Cloud Engineering & Architecture | Akshaya Parida",
  description:
    "Comprehensive guides and hands-on tutorials for AWS Cloud Engineering: IAM security deep dive, EC2 architecture, VPC networking, S3 storage, and serverless architectures.",
  keywords: [
    "AWS",
    "Amazon Web Services",
    "Cloud Engineering",
    "AWS IAM",
    "EC2 Deep Dive",
    "Cloud Architecture",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/aws",
  },
  openGraph: {
    title: "AWS Cloud Engineering & Architecture | Akshaya Parida",
    description:
      "Comprehensive guides and tutorials for AWS Cloud Engineering.",
    url: "https://akshayaparida.vercel.app/aws",
    type: "website",
  },
};

export default function AWSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="AWS Cloud Engineering"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div className="module-page-layout">
        <ModuleSidebar modules={awsModules} basePath="/aws" />
        <main className="module-content-area">{children}</main>
      </div>

      <PageFooter moduleName="AWS" issueLabel="aws" />
    </div>
  );
}
