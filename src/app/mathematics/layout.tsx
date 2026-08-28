import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import PageFooter from "@/components/PageFooter";
import { mathematicsModules } from "@/data/mathematics";
import "@/styles/module-page.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mathematics for AI Engineers | Akshaya Parida",
  description:
    "Foundational mathematics for machine learning and AI: Linear Algebra, Calculus, Probability & Statistics, Abstract Algebra, Set Theory, and Linear Models with interactive visualizations.",
  keywords: [
    "Mathematics for AI",
    "Linear Algebra",
    "Calculus for ML",
    "Probability and Statistics",
    "Discrete Mathematics",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/mathematics",
  },
  openGraph: {
    title: "Mathematics for AI Engineers | Akshaya Parida",
    description:
      "Foundational mathematics for machine learning and AI with interactive visualizations.",
    url: "https://akshayaparida.vercel.app/mathematics",
    type: "website",
  },
};

export default function MathematicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="Mathematics for AI Engineers"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div className="module-page-layout">
        <ModuleSidebar modules={mathematicsModules} basePath="/mathematics" />
        <main className="module-content-area">{children}</main>
      </div>

      <PageFooter moduleName="Mathematics" issueLabel="mathematics" />
    </div>
  );
}
