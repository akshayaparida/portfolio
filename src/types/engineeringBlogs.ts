export type BlogCategory =
  | "ai-engineering"
  | "ethical-hacking"
  | "cyber-security"
  | "deep-tech";

export interface FeaturedArticle {
  title: string;
  url: string;
  readTime?: string;
  summary?: string;
}

export interface EngineeringBlog {
  id: string;
  title: string;
  organization: string;
  url: string;
  category: BlogCategory;
  categoryLabel: string;
  description: string;
  tags: string[];
  featuredArticles?: FeaturedArticle[];
  badge?: string; // e.g. "Frontier AI", "Elite Red Team", "Hard Tech", "Sovereign Mission", "0-Day Research"
  isIndiaTech?: boolean; // Flag for Indian pioneers & missions
  isGovtScheme?: boolean; // Flag for National Missions / Govt initiatives
  tier?:
    | "Must Read"
    | "Industry Standard"
    | "Research Lab"
    | "National Mission";
  icon?: string; // FontAwesome icon class
  rssUrl?: string;
}
