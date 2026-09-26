import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Professional Communication (CSC-406 / 6.0CSC04) — CURAJ Syllabus & CIA Hub",
  description:
    "Official syllabus, 6-unit study guide, reference books, and verified Continuous Internal Assessment (CIA-1 & CIA-2) solutions for Professional Communication (CSC-406 / 6.0CSC04) at Central University of Rajasthan (CURAJ).",
  keywords: [
    "Professional Communication",
    "CSC-406",
    "6.0CSC04",
    "CURAJ Professional Communication",
    "CURAJ MSc CS",
    "Technical Writing",
    "Group Discussion PREP REP",
    "Active Listening Barriers",
    "Report Writing Format",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/professional-communication",
  },
  openGraph: {
    title:
      "Professional Communication (CSC-406 / 6.0CSC04) — CURAJ Syllabus & CIA Hub",
    description:
      "Official CURAJ syllabus, 6-unit study guide, reference books, and verified CIA assignment solutions for Professional Communication.",
    url: "https://akshayaparida.vercel.app/professional-communication",
    type: "website",
  },
};

export default function ProfessionalCommunicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
