import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Verified Internships & Jobs Hub — Academic Fellowships, AI Startups & Tech Roles",
  description:
    "Curated, verified portals for finding software engineering, AI/ML, and data science internships and jobs. Features IASc-INSA-NASI SRFP, IIT Fellowships, GSoC, Wellfound, Y Combinator, cold outreach templates, and ATS resume strategies.",
  keywords: [
    "AI Internships",
    "Machine Learning Internships",
    "Software Engineering Jobs",
    "IIT Summer Fellowships",
    "IASc SRFP 2026",
    "GSoC 2026",
    "Wellfound AI Startups",
    "Y Combinator Jobs",
    "Cold Email Professors",
    "ATS Resume Checklist",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/internships-and-jobs",
  },
  openGraph: {
    title: "Verified Internships & Jobs Hub | Akshaya Parida",
    description:
      "Curated, verified portals for finding software engineering, AI/ML, and data science internships and jobs.",
    url: "https://akshayaparida.vercel.app/internships-and-jobs",
    type: "website",
  },
};

export default function InternshipsAndJobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
