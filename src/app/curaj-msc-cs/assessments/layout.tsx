import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CURAJ MSc CS Continuous Internal Assessments (CIA) & Solutions",
  description:
    "Official question papers, exam details, and step-by-step model solutions for MSc Computer Science at Central University of Rajasthan (CURAJ). Includes AI (6.0CSC01) CIA-1, Python (6.0CSC03) CIA-1, and semester assessments.",
  keywords: [
    "CURAJ MSc CS CIA 1",
    "CURAJ AI CIA 1 Question Paper",
    "CURAJ Python CIA 1 Question Paper",
    "Central University of Rajasthan Computer Science",
    "6.0CSC01 Introduction to Artificial Intelligence",
    "Advanced Python Programming CIA Solutions",
    "CURAJ Internal Assessments",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/curaj-msc-cs/assessments",
  },
  openGraph: {
    title: "CURAJ MSc CS Assessments & CIA Solutions | Akshaya Parida",
    description:
      "Question papers and verified model solutions for CURAJ MSc Computer Science Continuous Internal Assessments.",
    url: "https://akshayaparida.vercel.app/curaj-msc-cs/assessments",
    type: "website",
  },
};

export default function CurajAssessmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
