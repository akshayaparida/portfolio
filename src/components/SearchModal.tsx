"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { useSearch } from "./SearchContext";
import { searchItems } from "@/lib/searchIndex";
import { SearchFilterOption, SearchResultItem } from "@/types/search";

const FILTER_TABS: {
  label: string;
  value: SearchFilterOption;
  icon: string;
}[] = [
  { label: "All", value: "all", icon: "fa-solid fa-layer-group" },
  { label: "Modules", value: "module", icon: "fa-solid fa-book" },
  { label: "Sections", value: "section", icon: "fa-solid fa-file-lines" },
  { label: "Projects", value: "project", icon: "fa-solid fa-folder" },
  { label: "Skills", value: "skill", icon: "fa-solid fa-wand-magic-sparkles" },
  {
    label: "Curriculum",
    value: "curriculum",
    icon: "fa-solid fa-graduation-cap",
  },
  { label: "Quizzes", value: "quiz", icon: "fa-solid fa-circle-question" },
];

const SUGGESTED_SEARCHES = [
  "Linear Algebra",
  "Banker's Algorithm",
  "Normalization",
  "TCP Handshake",
  "Docker",
  "GATE CS",
  "PyTorch",
  "Bengaluru Infra",
  "Calculus",
  "Process Management",
];

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim() || !text) return <span>{text}</span>;

  const tokens = query.trim().split(/\s+/).filter(Boolean);
  const regexPattern = tokens
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  if (!regexPattern) return <span>{text}</span>;

  const regex = new RegExp(`(${regexPattern})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={`hl-${i}`} className="search-highlight">
            {part}
          </mark>
        ) : (
          <React.Fragment key={`text-${i}`}>{part}</React.Fragment>
        ),
      )}
    </span>
  );
}

export default function SearchModal() {
  const { isOpen, query, setQuery, closeSearch } = useSearch();
  const router = useRouter();

  const [activeFilter, setActiveFilter] = useState<SearchFilterOption>("all");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Compute search results
  const results: SearchResultItem[] = useMemo(() => {
    if (!query.trim()) return [];
    return searchItems(query, activeFilter, 25);
  }, [query, activeFilter]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Reset selected index when query or filter changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeFilter]);

  // Scroll selected item into view in results list
  useEffect(() => {
    if (resultsRef.current && results.length > 0) {
      const selectedEl = resultsRef.current.querySelector(
        ".search-result-item.selected",
      );
      if (selectedEl && typeof selectedEl.scrollIntoView === "function") {
        selectedEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex, results.length]);

  const handleNavigate = useCallback(
    (targetUrl: string) => {
      closeSearch();

      // Check if target URL is internal or has hash
      if (targetUrl.startsWith("/")) {
        router.push(targetUrl);

        // If target has a hash, handle smooth scrolling after push
        const hashIndex = targetUrl.indexOf("#");
        if (hashIndex !== -1) {
          const hash = targetUrl.slice(hashIndex + 1);
          setTimeout(() => {
            const targetEl = document.getElementById(hash);
            if (targetEl) {
              const topOffset = 80;
              const elementPosition = targetEl.getBoundingClientRect().top;
              const offsetPosition =
                elementPosition + window.pageYOffset - topOffset;
              window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
          }, 150);
        }
      } else {
        window.location.href = targetUrl;
      }
    },
    [closeSearch, router],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        results.length > 0 ? (prev + 1) % results.length : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        results.length > 0 ? (prev - 1 + results.length) % results.length : 0,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results.length > 0 && results[selectedIndex]) {
        handleNavigate(results[selectedIndex].url);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeSearch();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="search-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeSearch();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Search portfolio"
    >
      <div className="search-modal-card" onKeyDown={handleKeyDown}>
        {/* Search Input Bar */}
        <div className="search-input-wrapper">
          <i
            className="fa-solid fa-magnifying-glass search-input-icon"
            aria-hidden="true"
          ></i>
          <input
            ref={inputRef}
            type="text"
            className="search-input-field"
            placeholder="Search topics, concepts, notes, projects, skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-autocomplete="list"
            aria-controls="search-results-list"
          />

          <div className="search-input-actions">
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="search-clear-btn"
                aria-label="Clear search input"
                title="Clear"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
            <kbd
              className="search-close-key"
              onClick={closeSearch}
              style={{ cursor: "pointer" }}
            >
              ESC
            </kbd>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="search-filters-bar">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveFilter(tab.value)}
              className={`search-filter-chip ${activeFilter === tab.value ? "active" : ""}`}
            >
              <i className={tab.icon}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Results / Empty States List */}
        <div
          ref={resultsRef}
          id="search-results-list"
          className="search-results-container"
          role="listbox"
        >
          {query.trim() === "" ? (
            <div className="search-empty-state">
              <i className="fa-solid fa-magnifying-glass search-empty-icon"></i>
              <h3 className="search-empty-title">Search Portfolio</h3>
              <p className="search-empty-text">
                Type any topic, concept, project, or exam module to jump
                directly to that page.
              </p>

              <div className="search-suggestions-box">
                <span className="search-suggestions-label">
                  Popular Searches
                </span>
                <div className="search-suggestions-list">
                  {SUGGESTED_SEARCHES.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => {
                        setQuery(suggestion);
                        inputRef.current?.focus();
                      }}
                      className="search-suggestion-btn"
                    >
                      <i className="fa-solid fa-arrow-trend-up"></i>
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="search-empty-state">
              <i className="fa-solid fa-circle-exclamation search-empty-icon"></i>
              <h3 className="search-empty-title">No results found</h3>
              <p className="search-empty-text">
                No matching topics found for &ldquo;<strong>{query}</strong>
                &rdquo; in the selected filter. Try searching for a broader term
                or switching category.
              </p>
            </div>
          ) : (
            results.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  role="option"
                  aria-selected={isSelected}
                  className={`search-result-item ${isSelected ? "selected" : ""}`}
                  onClick={() => handleNavigate(item.url)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="search-result-top">
                    <span className="search-result-breadcrumb">
                      {item.breadcrumb}
                    </span>
                    <span className="search-result-badge">
                      <i className={item.icon}></i>
                      <span>{item.categoryLabel}</span>
                    </span>
                  </div>

                  <h4 className="search-result-title">
                    <i className={item.icon}></i>
                    <HighlightedText text={item.title} query={query} />
                  </h4>

                  {item.matchSnippet ? (
                    <p className="search-result-snippet">
                      <HighlightedText text={item.matchSnippet} query={query} />
                    </p>
                  ) : item.description ? (
                    <p className="search-result-snippet">
                      <HighlightedText text={item.description} query={query} />
                    </p>
                  ) : null}
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer with Keyboard Shortcuts */}
        <div className="search-modal-footer">
          <div className="search-shortcut-hints">
            <span className="search-shortcut-item">
              <kbd className="search-key-badge">↑</kbd>
              <kbd className="search-key-badge">↓</kbd>
              <span>navigate</span>
            </span>
            <span className="search-shortcut-item">
              <kbd className="search-key-badge">↵</kbd>
              <span>select</span>
            </span>
            <span className="search-shortcut-item">
              <kbd className="search-key-badge">esc</kbd>
              <span>close</span>
            </span>
          </div>

          {results.length > 0 && (
            <span>
              {results.length} {results.length === 1 ? "result" : "results"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
