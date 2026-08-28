import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GATE Computer Science (GATE CS) Syllabus & Key Notes",
  description:
    "Comprehensive GATE Computer Science syllabus breakdown, subject-wise weightages (Algorithms, OS, DBMS, Networks, Digital Logic, TOC, CD, Math), key exam concepts, and NPTEL course links.",
  keywords: [
    "GATE CS",
    "GATE Computer Science",
    "GATE CSE Syllabus",
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
    title: "GATE Computer Science Syllabus & Key Notes | Akshaya Parida",
    description:
      "Comprehensive GATE Computer Science syllabus breakdown, subject-wise weightages, key exam concepts, and NPTEL course links.",
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
