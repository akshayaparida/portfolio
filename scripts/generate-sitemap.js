// scripts/generate-sitemap.js
const fs = require("fs");
const path = require("path");

async function generateSitemap() {
  const hostname = "https://akshayaparida.vercel.app";

  // Define your routes
  const routes = [
    { path: "/", priority: "1.0", changeFreq: "weekly" },
    { path: "/learning-journey", priority: "0.9", changeFreq: "weekly" },
    { path: "/mathematics", priority: "0.8", changeFreq: "weekly" },
    { path: "/mlops", priority: "0.8", changeFreq: "weekly" },
    { path: "/dbms", priority: "0.8", changeFreq: "weekly" },
    { path: "/dsa", priority: "0.8", changeFreq: "weekly" },
    { path: "/networks", priority: "0.8", changeFreq: "weekly" },
    { path: "/os", priority: "0.8", changeFreq: "weekly" },
    { path: "/reasoning", priority: "0.8", changeFreq: "weekly" },
    { path: "/ai-engineering", priority: "0.8", changeFreq: "weekly" },
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  routes.forEach((route) => {
    sitemap += `  <url>
    <loc>${hostname}${route.path}</loc>
    <priority>${route.priority}</priority>
    <changefreq>${route.changeFreq}</changefreq>
  </url>
`;
  });

  sitemap += "</urlset>";

  fs.writeFileSync(
    path.resolve(process.cwd(), "public", "sitemap.xml"),
    sitemap,
  );
  console.log("Sitemap generated successfully!");
}

generateSitemap().catch(console.error);
