import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UGC NET JRF Computer Science Syllabus & Unit Notes",
  description:
    "Complete UGC NET JRF Paper 1 and Paper 2 Computer Science syllabus breakdown, unit-wise notes, teaching & research aptitude concepts, and standard study resources.",
  keywords: [
    "UGC NET JRF",
    "UGC NET Computer Science",
    "Paper 1 Aptitude",
    "Paper 2 Computer Science",
    "Assistant Professor",
    "JRF Preparation",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/ugc-net-jrf",
  },
  openGraph: {
    title: "UGC NET JRF Computer Science Syllabus & Notes | Akshaya Parida",
    description:
      "Complete UGC NET JRF Paper 1 & Paper 2 Computer Science syllabus breakdown and unit notes.",
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
