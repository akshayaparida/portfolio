export type SearchItemCategory =
  | "module"
  | "section"
  | "project"
  | "skill"
  | "curriculum"
  | "quiz"
  | "page";

export interface SearchIndexItem {
  id: string;
  title: string;
  description: string;
  content: string; // Plain text snippet or body content for deep search
  category: SearchItemCategory;
  categoryLabel: string;
  domain: string; // e.g. "OS", "DSA", "DBMS", "Mathematics", "AWS", "MLOps", "Projects"
  icon: string; // FontAwesome icon class
  url: string; // Target URL path + optional #hash
  breadcrumb: string; // e.g. "OS > Synchronization & Deadlocks > Banker's Algorithm"
  keywords?: string[];
  tags?: string[];
}

export interface SearchResultItem extends SearchIndexItem {
  score: number;
  matchSnippet?: string;
  highlightIndices?: [number, number][];
}

export type SearchFilterOption = "all" | SearchItemCategory;
