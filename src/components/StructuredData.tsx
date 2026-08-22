"use client";

import Script from "next/script";

export default function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Akshaya Parida",
    jobTitle: "AI Engineer",
    description:
      "AI Engineer focused on building intelligent systems and open-source tools. Bridging machine learning, software engineering, and real-world problem solving.",
    url: "https://akshayaparida.vercel.app",
    sameAs: [
      "https://github.com/akshayaparida",
      "https://www.linkedin.com/in/akshaya-parida-7036a426a/",
      "https://x.com/akshaya_parida_",
      "https://huggingface.co/akshayaparida",
    ],
    image: "https://akshayaparida.vercel.app/akparidadp.jpeg",
    worksFor: {
      "@type": "Organization",
      name: "Self-Employed",
    },
    knowsAbout: [
      "AI Engineering",
      "Next.js",
      "TypeScript",
      "Machine Learning",
      "Web Development",
      "Full Stack Development",
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Akshaya Parida Portfolio",
    description:
      "AI Engineering Portfolio showcasing innovative solutions with Next.js, TypeScript, and AI technologies.",
    url: "https://akshayaparida.vercel.app",
    logo: "https://akshayaparida.vercel.app/akparidadp.jpeg",
    sameAs: [
      "https://github.com/akshayaparida",
      "https://www.linkedin.com/in/akshaya-parida-7036a426a/",
      "https://x.com/akshaya_parida_",
      "https://huggingface.co/akshayaparida",
    ],
  };

  // WebSite schema for the overall site
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Akshaya Parida Portfolio",
    url: "https://akshayaparida.vercel.app",
    description:
      "AI Engineer focused on building intelligent systems and open-source tools. Bridging machine learning, software engineering, and real-world problem solving.",
    publisher: {
      "@type": "Person",
      name: "Akshaya Parida",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://akshayaparida.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  // BreadcrumbList schema for navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://akshayaparida.vercel.app/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://akshayaparida.vercel.app/blog",
      },
    ],
  };

  // Course schema for Educational SEO indexing
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Discrete Mathematics & Computer Science Engineering for GATE & UGC NET",
    description:
      "Comprehensive Computer Science engineering tutorials, interactive visualizations, and AIR 1 previous year question walkthroughs covering Mathematical Logic, Set Theory, Algorithms, DBMS, and Operating Systems.",
    provider: {
      "@type": "Person",
      name: "Akshaya Parida",
      url: "https://akshayaparida.vercel.app",
    },
    educationalLevel: "Advanced",
    about: [
      "Discrete Mathematics",
      "Mathematical Logic",
      "First-Order Predicate Logic",
      "GATE CSE",
      "Data Structures and Algorithms",
      "Database Management Systems",
      "Operating Systems",
    ],
  };

  return (
    <>
      <Script
        id="structured-data-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Script
        id="structured-data-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="structured-data-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="structured-data-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="structured-data-course"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
    </>
  );
}
