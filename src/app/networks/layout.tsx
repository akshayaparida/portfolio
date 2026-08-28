import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import PageFooter from "@/components/PageFooter";
import { networksModules } from "@/data/networks";
import "@/styles/module-page.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Computer Networks & Protocols | Akshaya Parida",
  description:
    "Complete breakdown of Computer Networks: OSI & TCP/IP models, Data Link Layer, IPv4/IPv6 Addressing, Routing Algorithms, TCP 3-Way Handshake, Congestion Control, and Application Protocols (HTTP, DNS).",
  keywords: [
    "Computer Networks",
    "TCP/IP",
    "OSI Model",
    "Routing Algorithms",
    "TCP Congestion Control",
    "DNS HTTP",
    "GATE Networks",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/networks",
  },
  openGraph: {
    title: "Computer Networks & Protocols | Akshaya Parida",
    description:
      "Complete breakdown of Computer Networks: OSI, TCP/IP, IP addressing, and routing.",
    url: "https://akshayaparida.vercel.app/networks",
    type: "website",
  },
};

export default function NetworksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="module-page-container">
      <BlogPageHeader
        title="Computer Networks"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div className="module-page-layout">
        <ModuleSidebar modules={networksModules} basePath="/networks" />
        <main className="module-content-area">{children}</main>
      </div>

      <PageFooter moduleName="Computer Networks" issueLabel="networks" />
    </div>
  );
}
