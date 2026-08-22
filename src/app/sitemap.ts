import { MetadataRoute } from "next";
import { mathematicsModules } from "@/data/mathematics";
import { dbmsModules } from "@/data/dbms";
import { osModules } from "@/data/os";
import { dsaModules } from "@/data/dsa";
import { networksModules } from "@/data/networks";

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

  return [
    ...staticPages,
    ...mathPages,
    ...dbmsPages,
    ...osPages,
    ...dsaPages,
    ...networkPages,
  ];
}
