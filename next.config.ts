import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV !== "production",
});

const nextConfig: NextConfig = {
  turbopack: {},
  // output: 'export', // This enables static export for GitHub Pages
  // trailingSlash: true, // This adds trailing slashes to URLs
  // images: {
  //   unoptimized: true, // This is required for GitHub Pages since there's no Image Optimization API
  // },
};

export default withSerwist(nextConfig);
