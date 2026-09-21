import type { Metadata } from "next";
import { LearningModule } from "@/types/learning";

export const SITE_URL = "https://akshayaparida.vercel.app";

export interface ModuleMetaParams {
  module: LearningModule;
  subjectName: string;
  subjectSlug: string;
}

/**
 * Builds search-optimized metadata for any learning module page.
 */
export function createModuleMetadata({
  module,
  subjectName,
  subjectSlug,
}: ModuleMetaParams): Metadata {
  const url = `${SITE_URL}/${subjectSlug}/${module.id}`;

  const keywords: string[] = [
    module.title,
    `${module.title} notes`,
    `${module.title} tutorial`,
    `${module.title} practice questions`,
    subjectName,
    `${subjectName} notes`,
    `${subjectName} syllabus`,
    "GATE CS",
    "GATE Computer Science",
    "UGC NET Computer Science",
    "MSc Computer Science",
    "Computer Science Engineering",
    "Software Engineering Notes",
    "Akshaya Parida",
    ...(module.tags || []),
    ...(module.skills || []),
  ];

  const pageTitle = `${module.title} — ${subjectName} Notes | GATE CS & UGC NET`;
  const description = `${module.description} In-depth study notes, architectural diagrams, mathematical formulations, and step-by-step practice questions for ${subjectName}.`;

  return {
    title: pageTitle,
    description,
    keywords,
    authors: [{ name: "Akshaya Parida", url: SITE_URL }],
    creator: "Akshaya Parida",
    publisher: "Akshaya Parida",
    alternates: {
      canonical: `/${subjectSlug}/${module.id}`,
    },
    openGraph: {
      title: `${module.title} | ${subjectName} | Akshaya Parida`,
      description,
      url,
      siteName: "Akshaya Parida Portfolio",
      type: "article",
      locale: "en_US",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${module.title} - ${subjectName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${module.title} | ${subjectName}`,
      description,
      images: ["/og-image.jpg"],
      creator: "@akshaya_parida_",
    },
  };
}

/**
 * Generates Schema.org JSON-LD structured data (TechArticle, BreadcrumbList, FAQPage)
 * for enhanced Google Search rich snippets.
 */
export function createModuleJsonLd({
  module,
  subjectName,
  subjectSlug,
}: ModuleMetaParams) {
  const url = `${SITE_URL}/${subjectSlug}/${module.id}`;

  const schemas: Record<string, unknown>[] = [
    // 1. TechArticle Schema
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: module.title,
      description: module.description,
      url,
      mainEntityOfPage: url,
      inLanguage: "en-US",
      author: {
        "@type": "Person",
        name: "Akshaya Parida",
        url: SITE_URL,
      },
      publisher: {
        "@type": "Person",
        name: "Akshaya Parida",
        url: SITE_URL,
      },
      articleSection: subjectName,
      keywords: (module.tags || [subjectName, "Computer Science"]).join(", "),
      learningResourceType: "Study Guide",
      educationalLevel: "Advanced",
      about: [
        {
          "@type": "Thing",
          name: module.title,
        },
        {
          "@type": "Thing",
          name: subjectName,
        },
      ],
    },

    // 2. BreadcrumbList Schema
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: subjectName,
          item: `${SITE_URL}/${subjectSlug}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: module.title,
          item: url,
        },
      ],
    },
  ];

  // 3. FAQPage Schema for Practice Quiz Questions (Google Rich Results)
  if (module.practiceQuiz && module.practiceQuiz.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: module.practiceQuiz.map((q) => {
        let answerText = q.explanation || "";
        if (
          !answerText &&
          typeof q.correctAnswer === "number" &&
          q.options[q.correctAnswer]
        ) {
          answerText = `Correct answer: ${q.options[q.correctAnswer]}`;
        }
        return {
          "@type": "Question",
          name: q.question,
          acceptedAnswer: {
            "@type": "Answer",
            text:
              answerText ||
              "Refer to the module study guide for full solution details.",
          },
        };
      }),
    });
  }

  return schemas;
}
