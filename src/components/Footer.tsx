import gitMetadata from '@/data/git-metadata.json';

export default function Footer() {
  return (
    <footer>
      <p>
        By Akshaya Parida check the repo on{" "}
        <a
          target="_blank"
          href="https://github.com/akshayaparida/portfolio"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
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
    </footer>
  );
}
