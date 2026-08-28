import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Engineering Foundations & Real-World Tooling",
  description:
    "Foundational tools and methodologies for professional AI engineering: Git version control, Docker containerization, uv environment management, DVC data versioning, and MLflow experiment tracking.",
  keywords: [
    "AI Engineering",
    "MLOps",
    "Docker for AI",
    "DVC",
    "MLflow",
    "uv Python",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/ai-engineering",
  },
  openGraph: {
    title: "AI Engineering Foundations & Real-World Tooling | Akshaya Parida",
    description:
      "Essential tools and environment setup for professional AI engineering.",
    url: "https://akshayaparida.vercel.app/ai-engineering",
    type: "website",
  },
};

export default function AIEngineeringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
