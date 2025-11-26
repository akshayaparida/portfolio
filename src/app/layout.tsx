import type { Metadata } from "next";
import { Eczar, Grenze } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const eczar = Eczar({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-eczar",
});

const grenze = Grenze({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grenze",
});

export const metadata: Metadata = {
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
    canonical: "https://akshayaparida.github.io/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://akshayaparida.github.io/",
    title: "Akshaya Parida - AI Engineer Portfolio",
    description:
      "AI Engineering Portfolio - Currently hands-on learning in AI engineering. Building innovative solutions with Next.js, TypeScript, and AI technologies.",
    siteName: "Akshaya Parida Portfolio",
    images: [
      {
        url: "/og-image.jpg", // You'll want to create this
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
    images: ["/og-image.jpg"], // You'll want to create this
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
    google: "google-site-verification-code", // You'll want to add your actual verification code
    yandex: "yandex-verification-code", // You'll want to add your actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={`${eczar.variable} ${grenze.variable}`}>
        <StructuredData />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
