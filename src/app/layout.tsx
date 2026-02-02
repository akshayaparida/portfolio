import type { Metadata, Viewport } from "next";
import { Eczar } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const eczar = Eczar({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-eczar",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fafafa",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://akshayaparida.vercel.app"),
  title: {
    default: "Akshaya Parida - AI Engineer Portfolio",
    template: "%s | Akshaya Parida",
  },
  description:
    "AI Engineering Portfolio - Currently hands-on learning in AI engineering. Building innovative solutions with Next.js, TypeScript, and AI technologies.",
  keywords: [
    "AI Engineer",
    "Portfolio",
    "Next.js",
    "TypeScript",
    "Machine Learning",
    "Web Development",
    "Software Engineer",
    "AI Engineering",
    "Full Stack Developer",
  ],
  authors: [
    { name: "Akshaya Parida", url: "https://github.com/akshayaparida" },
  ],
  creator: "Akshaya Parida",
  publisher: "Akshaya Parida",
  alternates: {
    canonical: "https://akshayaparida.vercel.app/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://akshayaparida.vercel.app/",
    title: "Akshaya Parida - AI Engineer Portfolio",
    description:
      "AI Engineering Portfolio - Currently hands-on learning in AI engineering. Building innovative solutions with Next.js, TypeScript, and AI technologies.",
    siteName: "Akshaya Parida Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Akshaya Parida Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akshaya Parida - AI Engineer Portfolio",
    description:
      "AI Engineering Portfolio - Currently hands-on learning in AI engineering. Building innovative solutions with Next.js, TypeScript, and AI technologies.",
    images: ["/og-image.jpg"],
    creator: "@akshaya_parida_",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "zuI8RIRSltBbPN6GylhQSxA4mTxjT05V-BQUnwYzIPQ",
    yandex: "yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={eczar.variable}>
        <StructuredData />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
