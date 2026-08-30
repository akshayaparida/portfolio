import { MetadataRoute } from "next";
import { mathematicsModules } from "@/data/mathematics";
import { dbmsModules } from "@/data/dbms";
import { osModules } from "@/data/os";
import { dsaModules } from "@/data/dsa";
import { networksModules } from "@/data/networks";
import { awsModules } from "@/data/aws";
import { mlopsModules } from "@/data/mlops";
import { digitalFundamentalsModules } from "@/data/digital-fundamentals";
import { reasoningModules } from "@/data/reasoning";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://akshayaparida.vercel.app";
  const now = new Date().toISOString();

  // Core Static Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/learning-journey`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mathematics`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gate-cs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ugc-net-jrf`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/curaj-msc-cs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/dsa`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/dbms`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/os`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/networks`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ai-engineering`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/engineering-blogs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/politics-and-geopolitics`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/mlops`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/aws`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/digital-fundamentals`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reasoning`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/professional-communication`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic Module Pages for Mathematics
  const mathPages: MetadataRoute.Sitemap = (mathematicsModules || []).map(
    (m) => ({
      url: `${baseUrl}/mathematics/${m.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }),
  );

  // Dynamic Module Pages for DBMS
  const dbmsPages: MetadataRoute.Sitemap = (dbmsModules || []).map((m) => ({
    url: `${baseUrl}/dbms/${m.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic Module Pages for OS
  const osPages: MetadataRoute.Sitemap = (osModules || []).map((m) => ({
    url: `${baseUrl}/os/${m.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic Module Pages for DSA
  const dsaPages: MetadataRoute.Sitemap = (dsaModules || []).map((m) => ({
    url: `${baseUrl}/dsa/${m.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic Module Pages for Networks
  const networkPages: MetadataRoute.Sitemap = (networksModules || []).map(
    (m) => ({
      url: `${baseUrl}/networks/${m.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }),
  );

  // Dynamic Module Pages for AWS
  const awsPages: MetadataRoute.Sitemap = (awsModules || []).map((m) => ({
    url: `${baseUrl}/aws/${m.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic Module Pages for MLOps
  const mlopsPages: MetadataRoute.Sitemap = (mlopsModules || []).map((m) => ({
    url: `${baseUrl}/mlops/${m.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic Module Pages for Digital Fundamentals
  const digitalPages: MetadataRoute.Sitemap = (
    digitalFundamentalsModules || []
  ).map((m) => ({
    url: `${baseUrl}/digital-fundamentals/${m.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic Module Pages for Reasoning
  const reasoningPages: MetadataRoute.Sitemap = (reasoningModules || []).map(
    (m) => ({
      url: `${baseUrl}/reasoning/${m.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }),
  );

  return [
    ...staticPages,
    ...mathPages,
    ...dbmsPages,
    ...osPages,
    ...dsaPages,
    ...networkPages,
    ...awsPages,
    ...mlopsPages,
    ...digitalPages,
    ...reasoningPages,
  ];
}
