import type { Metadata } from "next";
import { Eczar, Grenze } from "next/font/google";
import "./globals.css";

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
  title: "Akshaya Parida Portfolio",
  description: "AI Engineering Portfolio - Currently hands-on learning in AI engineering",
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
        {children}
      </body>
    </html>
  );
}
