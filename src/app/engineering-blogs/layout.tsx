import type { Metadata } from "next";
import "@/styles/engineering-blogs.css";

export const metadata: Metadata = {
  title:
    "Engineering Blogs & Deep Tech Hub | AI, Security, Systems & Hard Tech",
  description:
    "Curated directory of world-class engineering blogs and research publications strictly in AI Engineering, Ethical Hacking, Cyber Security, Deep Tech, Indian high-tech innovators, and national technology missions.",
  keywords: [
    "Engineering Blogs",
    "AI Engineering",
    "Ethical Hacking",
    "Cyber Security",
    "Deep Tech",
    "Semiconductors",
    "Space Tech",
    "Defense Tech",
    "Quantum Computing",
    "Robotics",
    "ISRO",
    "India Semiconductor Mission",
    "IndiaAI Mission",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/engineering-blogs",
  },
  openGraph: {
    title: "Engineering Blogs & Deep Tech Hub | Akshaya Parida",
    description:
      "Curated engineering blogs and frontier research publications in AI Engineering, Ethical Hacking, Cyber Security, and Deep Tech.",
    url: "https://akshayaparida.vercel.app/engineering-blogs",
    type: "website",
  },
};

export default function EngineeringBlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
