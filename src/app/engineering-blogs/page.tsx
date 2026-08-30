"use client";

import { useState, useMemo } from "react";
import BlogPageHeader from "@/components/BlogPageHeader";
import PageFooter from "@/components/PageFooter";
import { engineeringBlogs } from "@/data/engineeringBlogs";
import { BlogCategory, EngineeringBlog } from "@/types/engineeringBlogs";

export default function EngineeringBlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | BlogCategory
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [onlyIndiaTech, setOnlyIndiaTech] = useState(false);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: engineeringBlogs.length,
      "ai-engineering": 0,
      "ethical-hacking": 0,
      "cyber-security": 0,
      "deep-tech": 0,
      india: 0,
    };
    engineeringBlogs.forEach((blog) => {
      counts[blog.category] = (counts[blog.category] || 0) + 1;
      if (blog.isIndiaTech) counts.india++;
    });
    return counts;
  }, []);

  // Compute available topics based on selected category or all
  const availableTopics = useMemo(() => {
    const topicsSet = new Set<string>();
    const baseList =
      selectedCategory === "all"
        ? engineeringBlogs
        : engineeringBlogs.filter((b) => b.category === selectedCategory);

    baseList.forEach((b) => {
      b.tags.forEach((t) => topicsSet.add(t));
    });

    return Array.from(topicsSet).slice(0, 14);
  }, [selectedCategory]);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return engineeringBlogs.filter((blog: EngineeringBlog) => {
      // Category filter
      if (selectedCategory !== "all" && blog.category !== selectedCategory) {
        return false;
      }

      // India Tech filter
      if (onlyIndiaTech && !blog.isIndiaTech) {
        return false;
      }

      // Topic tag filter
      if (selectedTopic !== "all" && !blog.tags.includes(selectedTopic)) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = blog.title.toLowerCase().includes(query);
        const matchesOrg = blog.organization.toLowerCase().includes(query);
        const matchesDesc = blog.description.toLowerCase().includes(query);
        const matchesTags = blog.tags.some((t) =>
          t.toLowerCase().includes(query),
        );
        const matchesArticles = blog.featuredArticles?.some((a) =>
          a.title.toLowerCase().includes(query),
        );
        return (
          matchesTitle ||
          matchesOrg ||
          matchesDesc ||
          matchesTags ||
          matchesArticles
        );
      }

      return true;
    });
  }, [selectedCategory, onlyIndiaTech, selectedTopic, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSelectedTopic("all");
    setOnlyIndiaTech(false);
  };

  const getCategoryBadgeClass = (category: BlogCategory) => {
    switch (category) {
      case "ai-engineering":
        return "eng-badge-ai";
      case "ethical-hacking":
        return "eng-badge-ethical";
      case "cyber-security":
        return "eng-badge-cyber";
      case "deep-tech":
        return "eng-badge-deep";
      default:
        return "";
    }
  };

  return (
    <div className="eng-blogs-container">
      {/* Blog/Page Navigation Header */}
      <BlogPageHeader
        title="Engineering Blogs & Deep Tech"
        backLink="/"
        backTitle="Home"
      />

      <main className="eng-blogs-main">
        {/* Hero Section */}
        <section className="eng-hero">
          <div className="eng-hero-badge-wrap">
            <i className="fa-solid fa-compass"></i>
            <span>Curated Engineering Hub</span>
          </div>

          <h1 className="eng-hero-title">Engineering Blogs &amp; Deep Tech</h1>

          <p className="eng-hero-desc">
            Curated engineering blogs, vulnerability research labs, hardware
            teardowns, and national tech missions strictly in{" "}
            <strong>AI Engineering</strong>, <strong>Ethical Hacking</strong>,{" "}
            <strong>Cyber Security</strong>, and <strong>Deep Tech</strong>{" "}
            (Semiconductors, Quantum, Space, Defense &amp; Robotics).
          </p>

          {/* Quick Metrics */}
          <div className="eng-stats-grid">
            <div className="eng-stat-pill">
              <i className="fa-solid fa-layer-group"></i>
              <span>Total Blogs:</span>
              <span className="eng-stat-count">{engineeringBlogs.length}</span>
            </div>
            <div className="eng-stat-pill">
              <i className="fa-solid fa-brain"></i>
              <span>AI Engineering:</span>
              <span className="eng-stat-count">
                {categoryCounts["ai-engineering"]}
              </span>
            </div>
            <div className="eng-stat-pill">
              <i className="fa-solid fa-bug"></i>
              <span>Ethical Hacking:</span>
              <span className="eng-stat-count">
                {categoryCounts["ethical-hacking"]}
              </span>
            </div>
            <div className="eng-stat-pill">
              <i className="fa-solid fa-shield-halved"></i>
              <span>Cyber Security:</span>
              <span className="eng-stat-count">
                {categoryCounts["cyber-security"]}
              </span>
            </div>
            <div className="eng-stat-pill">
              <i className="fa-solid fa-microchip"></i>
              <span>Deep Tech:</span>
              <span className="eng-stat-count">
                {categoryCounts["deep-tech"]}
              </span>
            </div>
            <div className="eng-stat-pill">
              <i className="fa-solid fa-flag"></i>
              <span>India Tech &amp; Missions:</span>
              <span className="eng-stat-count">{categoryCounts.india}</span>
            </div>
          </div>
        </section>

        {/* Controls Card */}
        <div className="eng-controls-card">
          {/* Live Search Input */}
          <div className="eng-search-box">
            <i className="fa-solid fa-magnifying-glass eng-search-icon"></i>
            <input
              type="text"
              placeholder="Search blogs by title, organization, or topic (e.g., OpenAI, 0-Day, RISC-V, ISRO)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="eng-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="eng-search-clear"
                title="Clear search"
                aria-label="Clear search"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          {/* Primary Category Filter Tabs */}
          <div className="eng-category-tabs" role="tablist">
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedTopic("all");
              }}
              className={`eng-cat-btn ${selectedCategory === "all" ? "active" : ""}`}
            >
              <i className="fa-solid fa-border-all"></i>
              <span>All Blogs</span>
              <span className="eng-cat-count">{categoryCounts.all}</span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory("ai-engineering");
                setSelectedTopic("all");
              }}
              className={`eng-cat-btn ${selectedCategory === "ai-engineering" ? "active" : ""}`}
            >
              <i className="fa-solid fa-brain"></i>
              <span>AI Engineering</span>
              <span className="eng-cat-count">
                {categoryCounts["ai-engineering"]}
              </span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory("ethical-hacking");
                setSelectedTopic("all");
              }}
              className={`eng-cat-btn ${selectedCategory === "ethical-hacking" ? "active" : ""}`}
            >
              <i className="fa-solid fa-bug"></i>
              <span>Ethical Hacking</span>
              <span className="eng-cat-count">
                {categoryCounts["ethical-hacking"]}
              </span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory("cyber-security");
                setSelectedTopic("all");
              }}
              className={`eng-cat-btn ${selectedCategory === "cyber-security" ? "active" : ""}`}
            >
              <i className="fa-solid fa-shield-halved"></i>
              <span>Cyber Security</span>
              <span className="eng-cat-count">
                {categoryCounts["cyber-security"]}
              </span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory("deep-tech");
                setSelectedTopic("all");
              }}
              className={`eng-cat-btn ${selectedCategory === "deep-tech" ? "active" : ""}`}
            >
              <i className="fa-solid fa-microchip"></i>
              <span>Deep Tech</span>
              <span className="eng-cat-count">
                {categoryCounts["deep-tech"]}
              </span>
            </button>
          </div>

          {/* Secondary Subfilters & India Toggle */}
          <div className="eng-subfilters-row">
            {/* India High Tech Toggle */}
            <button
              onClick={() => setOnlyIndiaTech(!onlyIndiaTech)}
              className={`eng-india-toggle-btn ${onlyIndiaTech ? "active" : ""}`}
              title="Filter Indian high-tech pioneers, defense labs & national missions"
            >
              <i className="fa-solid fa-flag"></i>
              <span>🇮🇳 India Tech &amp; Missions ({categoryCounts.india})</span>
              {onlyIndiaTech && <i className="fa-solid fa-check ml-1"></i>}
            </button>

            {/* Topic Filter Pills */}
            <div className="eng-topic-pills">
              <span className="eng-topic-label">Topic:</span>
              <button
                onClick={() => setSelectedTopic("all")}
                className={`eng-topic-btn ${selectedTopic === "all" ? "active" : ""}`}
              >
                All
              </button>
              {availableTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() =>
                    setSelectedTopic(selectedTopic === topic ? "all" : topic)
                  }
                  className={`eng-topic-btn ${selectedTopic === topic ? "active" : ""}`}
                >
                  #{topic}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="mb-4 flex items-center justify-between text-sm text-[var(--text-muted)]">
          <span>
            Showing <strong>{filteredBlogs.length}</strong> of{" "}
            {engineeringBlogs.length} publications
          </span>
          {(selectedCategory !== "all" ||
            selectedTopic !== "all" ||
            searchQuery ||
            onlyIndiaTech) && (
            <button
              onClick={resetFilters}
              className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 font-medium cursor-pointer"
            >
              <i className="fa-solid fa-rotate-left"></i>
              Reset all filters
            </button>
          )}
        </div>

        {/* Cards Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="eng-cards-grid">
            {filteredBlogs.map((blog) => (
              <article key={blog.id} className="eng-card">
                <div>
                  {/* Card Header */}
                  <div className="eng-card-top">
                    <div className="eng-card-meta">
                      <div className="eng-card-icon-wrap">
                        <i className={blog.icon || "fa-solid fa-newspaper"}></i>
                      </div>
                      <div className="eng-card-org-info">
                        <span className="eng-card-org">
                          {blog.organization}
                        </span>
                        <div className="eng-card-badges">
                          <span
                            className={`eng-badge ${getCategoryBadgeClass(blog.category)}`}
                          >
                            {blog.categoryLabel}
                          </span>
                          {blog.badge && (
                            <span className="eng-badge bg-[var(--bg-light)] text-[var(--text-secondary)] border border-[var(--border)]">
                              {blog.badge}
                            </span>
                          )}
                          {blog.isIndiaTech && (
                            <span className="eng-badge eng-badge-india">
                              🇮🇳 India
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h2 className="eng-card-title">
                    <a
                      href={blog.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Visit ${blog.title}`}
                    >
                      {blog.title}
                    </a>
                  </h2>

                  <p className="eng-card-desc">{blog.description}</p>

                  {/* Tags */}
                  <div className="eng-card-tags">
                    {blog.tags.map((tag) => (
                      <span key={tag} className="eng-tag-item">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Featured Must-Read Articles */}
                  {blog.featuredArticles &&
                    blog.featuredArticles.length > 0 && (
                      <div className="eng-featured-articles">
                        <div className="eng-featured-header">
                          <i className="fa-solid fa-star text-amber-500"></i>
                          <span>Must-Read Articles</span>
                        </div>
                        {blog.featuredArticles.map((article, i) => (
                          <a
                            key={i}
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="eng-article-link"
                          >
                            <span className="line-clamp-1">
                              • {article.title}
                            </span>
                            {article.readTime && (
                              <span className="eng-article-time">
                                {article.readTime}
                              </span>
                            )}
                          </a>
                        ))}
                      </div>
                    )}
                </div>

                {/* Footer Action */}
                <div className="eng-card-footer">
                  <span className="eng-card-cat-label">
                    {blog.tier || "Industry Standard"}
                  </span>
                  <a
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="eng-visit-btn"
                  >
                    <span>Visit Blog</span>
                    <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="eng-empty-state">
            <i className="fa-solid fa-magnifying-glass-chart eng-empty-icon"></i>
            <h3 className="eng-empty-title">No Engineering Blogs Found</h3>
            <p className="eng-empty-text">
              No publications matched your current filter criteria or search
              term.
            </p>
            <button onClick={resetFilters} className="eng-reset-btn">
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Consistent Page Footer */}
      <PageFooter
        moduleName="Engineering Blogs Hub"
        issueLabel="engineering-blogs"
      />
    </div>
  );
}
