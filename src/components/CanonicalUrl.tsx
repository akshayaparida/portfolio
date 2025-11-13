"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function CanonicalUrl() {
  const pathname = usePathname();
  const baseUrl = 'https://akshayaparida.github.io';

  useEffect(() => {
    // Remove any existing canonical link
    const existingLink = document.querySelector('link[rel="canonical"]');
    if (existingLink) {
      existingLink.remove();
    }

    // Create new canonical link
    const canonicalUrl = `${baseUrl}${pathname}`;
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = canonicalUrl;
    document.head.appendChild(link);

    // Clean up function
    return () => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, [pathname]);

  return null;
}