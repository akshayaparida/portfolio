"use client";

import React, { useState, useMemo } from "react";
import BlogPageHeader from "@/components/BlogPageHeader";
import PageFooter from "@/components/PageFooter";
import {
  verifiedPortals,
  internshipCategories,
  outreachTemplates,
  atsResumeChecklist,
} from "@/data/internshipsAndJobs";
import "@/styles/internships-and-jobs.css";

type ViewSection = "portals" | "outreach" | "resume";

export default function InternshipsAndJobsPage() {
  const [activeView, setActiveView] = useState<ViewSection>("portals");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPortals = useMemo(() => {
    return verifiedPortals.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.targetAudience.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="internships-page-container">
      <BlogPageHeader
        title="Verified Internships & Jobs Hub"
        backLink="/"
        backTitle="Home"
      />

      <div className="internships-content-wrapper">
        {/* Hero Banner */}
        <section className="internships-hero-card">
          <div className="internships-badge-pill">
            <i className="fa-solid fa-shield-halved"></i>
            100% Verified & Scam-Free Programs
          </div>
          <h1 className="internships-hero-title">
            Top Tier Internships, Fellowships & Tech Careers
          </h1>
          <p className="internships-hero-subtitle">
            A battle-tested portal to discover prestigious academic research
            fellowships (IITs, IASc, DAAD, Mitacs), global open-source programs
            (GSoC, LFX), direct founder hiring pipelines (Wellfound, Y
            Combinator), and high-converting outreach blueprints.
          </p>

          <div className="internships-stats-row">
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Verified Programs</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">₹10K – $7K</span>
              <span className="stat-label">Monthly Stipends</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">Direct Links</span>
              <span className="stat-label">Zero Middlemen</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">India & Global</span>
              <span className="stat-label">On-Campus & Remote</span>
            </div>
          </div>
        </section>

        {/* View Navigation Tabs */}
        <div
          className="filter-tabs-row"
          style={{
            borderBottom: "1px solid var(--border)",
            paddingBottom: "1rem",
          }}
        >
          <button
            className={`filter-tab-btn ${activeView === "portals" ? "active" : ""}`}
            onClick={() => setActiveView("portals")}
          >
            <i className="fa-solid fa-briefcase"></i>
            Verified Opportunities ({verifiedPortals.length})
          </button>
          <button
            className={`filter-tab-btn ${activeView === "outreach" ? "active" : ""}`}
            onClick={() => setActiveView("outreach")}
          >
            <i className="fa-solid fa-paper-plane"></i>
            Cold Outreach Blueprints
          </button>
          <button
            className={`filter-tab-btn ${activeView === "resume" ? "active" : ""}`}
            onClick={() => setActiveView("resume")}
          >
            <i className="fa-solid fa-file-lines"></i>
            ATS Resume Strategy
          </button>
        </div>

        {/* Main Content Area */}
        {activeView === "portals" && (
          <div className="internships-controls">
            {/* Category Chips and Search Box */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div className="filter-tabs-row">
                {internshipCategories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`filter-tab-btn ${selectedCategory === cat.id ? "active" : ""}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="search-box-row">
                <i className="fa-solid fa-magnifying-glass search-input-icon"></i>
                <input
                  type="text"
                  className="internship-search-input"
                  placeholder="Filter by keyword (e.g. IIT, GSoC, Remote, PyTorch)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Opportunities Grid */}
            <div className="portals-grid" style={{ marginTop: "1rem" }}>
              {filteredPortals.map((portal) => (
                <article key={portal.id} className="portal-card">
                  <div className="portal-card-top">
                    <div className="portal-meta-header">
                      <span className="category-tag">
                        {portal.categoryLabel}
                      </span>
                      {portal.verified && (
                        <span className="verified-badge">
                          <i className="fa-solid fa-circle-check"></i> Verified
                        </span>
                      )}
                    </div>

                    <h3 className="portal-name">{portal.name}</h3>
                    <p className="portal-desc">{portal.description}</p>

                    <div className="portal-info-list">
                      <div className="portal-info-item">
                        <i className="fa-solid fa-user-graduate"></i>
                        <span>
                          <strong>Eligibility:</strong> {portal.targetAudience}
                        </span>
                      </div>
                      <div className="portal-info-item">
                        <i className="fa-solid fa-money-bill-wave"></i>
                        <span>
                          <strong>Stipend:</strong> {portal.stipendRange}
                        </span>
                      </div>
                      <div className="portal-info-item">
                        <i className="fa-solid fa-calendar-check"></i>
                        <span>
                          <strong>Window:</strong> {portal.applicationWindow}
                        </span>
                      </div>
                      <div className="portal-info-item">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>
                          <strong>Location:</strong> {portal.location}
                        </span>
                      </div>
                    </div>

                    <div className="portal-tags-row">
                      {portal.tags.map((tag) => (
                        <span key={tag} className="portal-tag-chip">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <details className="portal-tips-details">
                      <summary>
                        <i className="fa-solid fa-lightbulb"></i> View
                        Application Tips
                      </summary>
                      <ul className="portal-tips-list">
                        {portal.keyTips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </details>
                  </div>

                  <a
                    href={portal.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portal-action-btn"
                  >
                    <span>Visit Official Portal</span>
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                </article>
              ))}

              {filteredPortals.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "3rem",
                    gridColumn: "1 / -1",
                    color: "var(--text-secondary)",
                  }}
                >
                  <i
                    className="fa-solid fa-filter-circle-xmark"
                    style={{
                      fontSize: "2.5rem",
                      marginBottom: "1rem",
                      color: "#9ca3af",
                    }}
                  ></i>
                  <p>
                    No verified opportunities match your search query: &ldquo;
                    {searchQuery}&rdquo;
                  </p>
                  <button
                    className="filter-tab-btn"
                    style={{ margin: "1rem auto 0 auto" }}
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Outreach Templates View */}
        {activeView === "outreach" && (
          <section className="templates-section">
            <div className="section-heading-group">
              <h2 className="section-heading">
                High-Conversion Cold Outreach Blueprints
              </h2>
              <p className="section-subtext">
                Tested cold email and messaging templates designed specifically
                for research labs, professors, and tech startup founders.
              </p>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              {outreachTemplates.map((template) => (
                <article key={template.id} className="template-card">
                  <div className="template-header">
                    <div>
                      <h3 className="template-title">{template.title}</h3>
                      <p className="template-purpose">
                        <strong>Target:</strong> {template.targetRecipient}{" "}
                        &bull; {template.purpose}
                      </p>
                    </div>

                    <button
                      className={`copy-btn ${copiedId === template.id ? "copied" : ""}`}
                      onClick={() => handleCopy(template.id, template.body)}
                      aria-label="Copy template"
                    >
                      <i
                        className={
                          copiedId === template.id
                            ? "fa-solid fa-check"
                            : "fa-regular fa-copy"
                        }
                      ></i>
                      {copiedId === template.id
                        ? "Copied to Clipboard!"
                        : "Copy Template"}
                    </button>
                  </div>

                  <div className="template-subject-box">
                    <strong>Subject Line:</strong> {template.subjectLine}
                  </div>

                  <pre className="template-pre">{template.body}</pre>

                  <div className="template-guidelines-box">
                    <span className="template-guidelines-title">
                      <i
                        className="fa-solid fa-circle-exclamation"
                        style={{ color: "#2563eb" }}
                      ></i>
                      Rules for High Response Rates
                    </span>
                    <ul className="template-guidelines-list">
                      {template.guidelines.map((rule, idx) => (
                        <li key={idx}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ATS Resume Strategy View */}
        {activeView === "resume" && (
          <section className="templates-section">
            <div className="section-heading-group">
              <h2 className="section-heading">
                AI/ML & SWE Resume Architecture
              </h2>
              <p className="section-subtext">
                How to format your resume to score in the 99th percentile of
                automated ATS parsers and engineering hiring managers.
              </p>
            </div>

            <div className="ats-grid">
              {atsResumeChecklist.map((item) => (
                <div key={item.step} className="ats-card">
                  <div className="ats-step-number">{item.step}</div>
                  <h3 className="ats-title">{item.title}</h3>
                  <p className="ats-summary">{item.summary}</p>
                  <ul className="ats-items-list">
                    {item.checklist.map((point, idx) => (
                      <li key={idx}>
                        <i className="fa-solid fa-check"></i>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <PageFooter moduleName="Internships & Jobs Hub" />
    </div>
  );
}
