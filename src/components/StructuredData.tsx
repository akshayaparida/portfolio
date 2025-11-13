"use client";

import Script from 'next/script';

export default function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Akshaya Parida",
    "jobTitle": "AI Engineer",
    "description": "AI Engineering Portfolio - Currently hands-on learning in AI engineering. Building innovative solutions with Next.js, TypeScript, and AI technologies.",
    "url": "https://akshayaparida.github.io",
    "sameAs": [
      "https://github.com/akshayaparida",
      "https://www.linkedin.com/in/akshaya-parida-7036a426a/",
      "https://x.com/akshaya_parida_",
      "https://huggingface.co/akshayaparida"
    ],
    "image": "https://akshayaparida.github.io/_next/static/media/profile-image-placeholder.1234567.jpg", // You'll want to replace this with your actual profile image
    "worksFor": {
      "@type": "Organization",
      "name": "Self-Employed"
    },
    "knowsAbout": [
      "AI Engineering",
      "Next.js",
      "TypeScript",
      "Machine Learning",
      "Web Development",
      "Full Stack Development"
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Akshaya Parida Portfolio",
    "description": "AI Engineering Portfolio showcasing innovative solutions with Next.js, TypeScript, and AI technologies.",
    "url": "https://akshayaparida.github.io",
    "logo": "https://akshayaparida.github.io/_next/static/media/profile-image-placeholder.1234567.jpg", // You'll want to replace this
    "sameAs": [
      "https://github.com/akshayaparida",
      "https://www.linkedin.com/in/akshaya-parida-7036a426a/",
      "https://x.com/akshaya_parida_",
      "https://huggingface.co/akshayaparida"
    ]
  };

  // WebSite schema for the overall site
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Akshaya Parida Portfolio",
    "url": "https://akshayaparida.github.io",
    "description": "AI Engineering Portfolio - Currently hands-on learning in AI engineering. Building innovative solutions with Next.js, TypeScript, and AI technologies.",
    "publisher": {
      "@type": "Person",
      "name": "Akshaya Parida"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://akshayaparida.github.io/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // BreadcrumbList schema for navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://akshayaparida.github.io/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://akshayaparida.github.io/blog"
      }
    ]
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
    </>
  );
}