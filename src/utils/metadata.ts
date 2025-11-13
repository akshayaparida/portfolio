// utils/metadata.ts
import { Metadata } from 'next';

interface PageMetadata {
  title: string;
  description: string;
  pathname: string;
}

export function generateMetadataWithCanonical({ title, description, pathname }: PageMetadata): Metadata {
  const baseUrl = 'https://akshayaparida.github.io';
  const fullUrl = `${baseUrl}${pathname}`;
  
  return {
    title: `${title} | Akshaya Parida`,
    description,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: `${title} | Akshaya Parida`,
      description,
      url: fullUrl,
      type: 'website',
      siteName: 'Akshaya Parida Portfolio',
    },
    twitter: {
      title: `${title} | Akshaya Parida`,
      description,
      card: 'summary_large_image',
    },
  };
}