import Link from 'next/link';
import { Metadata } from 'next';

// Add metadata for the blog page
export const metadata: Metadata = {
  title: 'Blog | Akshaya Parida',
  description: 'Thoughts, tutorials, and insights on AI engineering, web development, and technology.',
  alternates: {
    canonical: 'https://akshayaparida.github.io/blog/',
  },
};

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-gray-600">
          Thoughts, tutorials, and insights on AI engineering, web development, and technology.
        </p>
      </header>

      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">
            <Link href="/blog/welcome-to-my-blog" className="text-blue-600 hover:underline">
              Welcome to My Blog
            </Link>
          </h2>
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <time dateTime="2025-01-01">January 1, 2025</time>
            <span className="mx-2">•</span>
            <span>AI Engineering</span>
          </div>
          <p className="text-gray-700 mb-4">
            Welcome to my blog where I&apos;ll share insights on AI engineering, web development,
            and my journey in technology. This is the beginning of my content writing journey.
          </p>
          <Link href="/blog/welcome-to-my-blog" className="text-blue-600 font-medium hover:underline">
            Read more →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">
            <Link href="/blog/setting-up-nextjs-for-ai-projects" className="text-blue-600 hover:underline">
              Setting up Next.js for AI Projects
            </Link>
          </h2>
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <time dateTime="2025-01-05">January 5, 2025</time>
            <span className="mx-2">•</span>
            <span>Web Development</span>
          </div>
          <p className="text-gray-700 mb-4">
            A comprehensive guide on setting up Next.js for AI and machine learning projects,
            including best practices and common pitfalls to avoid.
          </p>
          <Link href="/blog/setting-up-nextjs-for-ai-projects" className="text-blue-600 font-medium hover:underline">
            Read more →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">
            <Link href="/blog/ai-tools-i-use-daily" className="text-blue-600 hover:underline">
              AI Tools I Use Daily in My Development Workflow
            </Link>
          </h2>
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <time dateTime="2025-01-10">January 10, 2025</time>
            <span className="mx-2">•</span>
            <span>AI Engineering</span>
          </div>
          <p className="text-gray-700 mb-4">
            An overview of the AI tools that enhance my productivity as an AI engineer and
            web developer, with practical examples and use cases.
          </p>
          <Link href="/blog/ai-tools-i-use-daily" className="text-blue-600 font-medium hover:underline">
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
}