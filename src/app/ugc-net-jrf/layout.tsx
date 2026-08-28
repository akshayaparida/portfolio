import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UGC NET JRF 2026 — Complete Computer Science Syllabus & Unit Notes",
  description:
    "Complete UGC NET JRF 2026 (June & December cycles) Paper 1 and Paper 2 Computer Science syllabus breakdown, unit-wise notes, teaching & research aptitude concepts, and official exam portal links.",
  keywords: [
    "UGC NET 2026",
    "UGC NET JRF 2026",
    "UGC NET Computer Science 2026",
    "Paper 1 Aptitude 2026",
    "Paper 2 Computer Science",
    "Assistant Professor",
    "JRF Preparation 2026",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/ugc-net-jrf",
  },
  openGraph: {
    title:
      "UGC NET JRF 2026 Computer Science Syllabus & Official Portals | Akshaya Parida",
    description:
      "Complete UGC NET JRF 2026 Paper 1 & Paper 2 Computer Science syllabus breakdown, unit notes, and official exam resources.",
    url: "https://akshayaparida.vercel.app/ugc-net-jrf",
    type: "website",
  },
};

export default function UgcNetJrfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
