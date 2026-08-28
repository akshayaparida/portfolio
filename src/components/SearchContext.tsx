"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface SearchContextType {
  isOpen: boolean;
  query: string;
  setQuery: (q: string) => void;
  openSearch: (initialQuery?: string) => void;
  closeSearch: () => void;
  toggleSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const openSearch = useCallback((initialQuery = "") => {
    setQuery(initialQuery);
    setIsOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Global Keyboard shortcuts: Cmd+K / Ctrl+K and /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInput =
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement ||
        (document.activeElement as HTMLElement)?.isContentEditable;

      // Cmd+K or Ctrl+K opens/toggles search anywhere
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggleSearch();
        return;
      }

      // '/' key opens search when not actively typing in an input
      if (e.key === "/" && !isInput && !isOpen) {
        e.preventDefault();
        openSearch();
        return;
      }

      // Escape closes search
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        closeSearch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, toggleSearch, openSearch, closeSearch]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <SearchContext.Provider
      value={{
        isOpen,
        query,
        setQuery,
        openSearch,
        closeSearch,
        toggleSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch(): SearchContextType {
  const context = useContext(SearchContext);
  if (!context) {
    return {
      isOpen: false,
      query: "",
      setQuery: () => {},
      openSearch: () => {},
      closeSearch: () => {},
      toggleSearch: () => {},
    };
  }
  return context;
}
