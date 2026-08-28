import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CURAJ MSc Computer Science (AI & ML) Curriculum",
  description:
    "Curriculum structure, semester-wise course breakdown (AI, Advanced Algorithms, Machine Learning, Cloud Computing), credits, and syllabus for MSc Computer Science at Central University of Rajasthan.",
  keywords: [
    "CURAJ",
    "Central University of Rajasthan",
    "MSc Computer Science",
    "AI and ML Curriculum",
    "Advanced Algorithms",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/curaj-msc-cs",
  },
  openGraph: {
    title: "CURAJ MSc CS (AI & ML) Curriculum | Akshaya Parida",
    description:
      "Curriculum structure and semester-wise course breakdown for MSc Computer Science at CURAJ.",
    url: "https://akshayaparida.vercel.app/curaj-msc-cs",
    type: "website",
  },
};

export default function CurajMscCsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
