import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politics, Internal Security & Geopolitics | Akshaya Parida",
  description:
    "Comprehensive knowledge hub covering India's recognized political parties, 18th Lok Sabha governance, student political wings, bilateral great power relations (USA, Russia, China, Europe), border security challenges (LAC, LoC, IOR, Myanmar), and internal security & foreign funding regulations.",
  keywords: [
    "Indian Politics",
    "Political Parties in India",
    "BJP Ideology",
    "Congress Ideology",
    "18th Lok Sabha",
    "NDA Government",
    "I.N.D.I.A Alliance",
    "Student Wings ABVP NSUI SFI",
    "India USA Relations",
    "India Russia Relations",
    "India China LAC Standoff",
    "Border Security India",
    "FCRA Regulations Foreign Funding",
    "PFI UAPA Ban",
    "Geopolitics India",
    "Indian Foreign Policy",
  ],
  authors: [{ name: "Akshaya Parida" }],
  creator: "Akshaya Parida",
  openGraph: {
    title: "Politics, Internal Security & Geopolitics Hub | Akshaya Parida",
    description:
      "Objective breakdown of Indian political parties, current ruling coalition, student political organizations, great power relations, border frontiers, and internal security threats.",
    url: "https://akshayaparida.com/politics-and-geopolitics",
    siteName: "Akshaya Parida Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Politics, Internal Security & Geopolitics | Akshaya Parida",
    description:
      "Curated dossiers on India's political system, 18th Lok Sabha governance, foreign relations with USA/Russia/China/Europe, and border security frontiers.",
  },
  alternates: {
    canonical: "https://akshayaparida.com/politics-and-geopolitics",
  },
};

export default function PoliticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
