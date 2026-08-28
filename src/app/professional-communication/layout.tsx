import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Communication & Workplace Skills",
  description:
    "Practical guides and frameworks for workplace communication, technical writing, resume building, presentation techniques, and collaborative teamwork for software engineers.",
  keywords: [
    "Professional Communication",
    "Technical Writing",
    "Workplace Skills",
    "Engineering Soft Skills",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/professional-communication",
  },
  openGraph: {
    title: "Professional Communication & Workplace Skills | Akshaya Parida",
    description:
      "Practical guides and frameworks for workplace communication and technical writing.",
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
