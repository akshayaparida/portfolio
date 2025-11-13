// app/blog/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Blog | Akshaya Parida',
    template: '%s | Akshaya Parida Blog',
  },
  description: 'Thoughts, tutorials, and insights on AI engineering, web development, and technology.',
  keywords: ['Blog', 'AI Engineering', 'Web Development', 'Technology', 'Tutorials', 'Insights'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://akshayaparida.github.io/blog',
    title: 'Blog | Akshaya Parida',
    description: 'Thoughts, tutorials, and insights on AI engineering, web development, and technology.',
    siteName: 'Akshaya Parida Blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Akshaya Parida',
    description: 'Thoughts, tutorials, and insights on AI engineering, web development, and technology.',
  },
  alternates: {
    canonical: 'https://akshayaparida.github.io/blog/',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
}