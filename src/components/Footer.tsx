import gitMetadata from '@/data/git-metadata.json';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div>
        <p>
          By Akshaya Parida check the repo on{" "}
          <a
            target="_blank"
            href="https://github.com/akshayaparida/portfolio"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          . View <Link href="/analytics" className="underline hover:text-gray-600">Site Analytics</Link>.
        </p>
        <p>
          Last updated: <a
            href={gitMetadata.commitUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            {gitMetadata.commitDate}
          </a>
        </p>
      </div>
    </footer>
  );
}
