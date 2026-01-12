"use client";

import gitMetadata from "@/data/git-metadata.json";
import { useEffect, useState } from "react";

export default function Footer() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => {
        if (data?.visitors?.total) {
          setVisitorCount(data.visitors.total);
        }
      })
      .catch((err) => console.error("Failed to load visitor count:", err));
  }, []);

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
        {visitorCount !== null && (
          <>Total Visitors: {visitorCount.toLocaleString()} • </>
        )}
        Last updated:{" "}
        <a
          href={gitMetadata.commitUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="footer-meta"
        >
          {gitMetadata.commitDate}
        </a>
      </p>
    </footer>
  );
}
