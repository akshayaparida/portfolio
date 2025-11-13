import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // This enables static export for GitHub Pages
  trailingSlash: true, // This adds trailing slashes to URLs
  images: {
    unoptimized: true, // This is required for GitHub Pages since there's no Image Optimization API
  },
};

export default nextConfig;
