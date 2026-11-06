import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "AI & ML Research Hub — Learn Research From Scratch, Papers, Tools & Venues",
  description:
    "Free, structured roadmap to learn artificial intelligence and machine learning research from scratch. Includes Keshav's 3-pass paper reading method, hypothesis formulation, ablation studies, LaTeX writing, free GPUs (Colab, Kaggle), and top A* conference directories.",
  keywords: [
    "AI Research From Scratch",
    "Machine Learning Research",
    "How to Read AI Papers",
    "How to Write Research Paper",
    "LaTeX Overleaf Templates",
    "NeurIPS ICML ICLR Conferences",
    "Hugging Face Papers",
    "Free Cloud GPUs Colab Kaggle",
    "Ablation Studies ML",
    "Akshaya Parida",
  ],
  alternates: {
    canonical: "/research",
  },
  openGraph: {
    title:
      "AI & ML Research Hub | Learn Research From Scratch | Akshaya Parida",
    description:
      "Free structured roadmap to learn artificial intelligence and machine learning research from scratch.",
    url: "https://akshayaparida.vercel.app/research",
    type: "website",
  },
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
