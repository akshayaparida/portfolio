"use client";

import React, { useEffect, useState } from "react";
import { useSearch } from "./SearchContext";

interface SearchTriggerProps {
  compact?: boolean;
  placeholder?: string;
  className?: string;
}

export default function SearchTrigger({
  compact = false,
  placeholder = "Search topics...",
  className = "",
}: SearchTriggerProps) {
  const { openSearch } = useSearch();
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || ""));
    }
  }, []);

  return (
    <button
      type="button"
      onClick={() => openSearch()}
      className={`search-trigger-btn ${compact ? "search-trigger-compact" : ""} ${className}`}
      aria-label="Open search dialog"
      title="Search topics across portfolio (⌘K or Ctrl+K)"
    >
      <i
        className="fa-solid fa-magnifying-glass search-trigger-icon"
        aria-hidden="true"
      ></i>
      <span className="search-trigger-text">{placeholder}</span>
      <kbd className="search-trigger-shortcut">{isMac ? "⌘K" : "Ctrl+K"}</kbd>
    </button>
  );
}
