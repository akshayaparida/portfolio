import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Journey & Roadmap | Akshaya Parida",
  description:
    "Explore the technical learning journey, engineering milestones, completed roadmaps, and continuous growth of Akshaya Parida in AI & Software Engineering.",
  keywords: [
    "Learning Journey",
    "Engineering Roadmap",
    "AI Engineering Roadmap",
    "Career Milestones",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/learning-journey",
  },
  openGraph: {
    title: "Learning Journey & Roadmap | Akshaya Parida",
    description:
      "Explore the technical learning journey and milestones of Akshaya Parida.",
    url: "https://akshayaparida.vercel.app/learning-journey",
    type: "website",
  },
};

export default function LearningJourneyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
