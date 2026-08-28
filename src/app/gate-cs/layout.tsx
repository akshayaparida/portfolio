import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GATE CS 2027 / 2026 — Complete Computer Science Syllabus & Key Notes",
  description:
    "Comprehensive GATE Computer Science (GATE CS 2027 / 2026) syllabus breakdown, subject-wise weightages (Algorithms, OS, DBMS, Networks, Digital Logic, TOC, CD, Math), key exam concepts, and official NPTEL course links.",
  keywords: [
    "GATE CS 2027",
    "GATE CS 2026",
    "GATE Computer Science",
    "GATE CSE Syllabus 2027",
    "Computer Science Engineering",
    "GATE Weightage",
    "NPTEL Computer Science",
    "GATE Notes",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/gate-cs",
  },
  openGraph: {
    title:
      "GATE CS 2027 / 2026 Syllabus & Official Exam Portals | Akshaya Parida",
    description:
      "Comprehensive GATE Computer Science (GATE CS 2027 / 2026) syllabus breakdown, subject-wise weightages, key exam concepts, and official portal links.",
    url: "https://akshayaparida.vercel.app/gate-cs",
    type: "website",
  },
};

export default function GateCsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
