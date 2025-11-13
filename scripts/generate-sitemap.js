// scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');

async function generateSitemap() {
  const hostname = 'https://akshayaparida.github.io';
  
  // Define your routes
  const routes = [
    { path: '/', priority: '1.0', changeFreq: 'daily' },
    { path: '/learning-journey', priority: '0.8', changeFreq: 'weekly' },
    { path: '/mathematics', priority: '0.7', changeFreq: 'weekly' },
    { path: '/blog', priority: '0.9', changeFreq: 'daily' }, // Future blog route
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  routes.forEach(route => {
    sitemap += `  <url>
    <loc>${hostname}${route.path}</loc>
    <priority>${route.priority}</priority>
    <changefreq>${route.changeFreq}</changefreq>
  </url>
`;
  });

  sitemap += '</urlset>';

  fs.writeFileSync(path.resolve(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
}

generateSitemap().catch(console.error);