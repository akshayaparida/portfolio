"use client";

import React, { useState } from "react";
import BlogPageHeader from "@/components/BlogPageHeader";
import PageFooter from "@/components/PageFooter";
import {
  researchMethodologyStages,
  topicStarters,
  freeResearchTools,
  topConferences,
} from "@/data/researchHub";
import "@/styles/research-hub.css";

type ResearchViewTab = "methodology" | "topics" | "tools" | "conferences";

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState<ResearchViewTab>("methodology");
  const [selectedToolCategory, setSelectedToolCategory] =
    useState<string>("all");

  const filteredTools = freeResearchTools.filter((tool) => {
    return (
      selectedToolCategory === "all" || tool.category === selectedToolCategory
    );
  });

  return (
    <div className="research-page-container">
      <BlogPageHeader
        title="AI & ML Research Hub"
        backLink="/"
        backTitle="Home"
      />

      <div className="research-content-wrapper">
        {/* Hero Section */}
        <section className="research-hero-card">
          <div className="research-badge-pill">
            <i className="fa-solid fa-microscope"></i>
            Open Science & Research Roadmap
          </div>
          <h1 className="research-hero-title">
            Learn AI & ML Research from Scratch
          </h1>
          <p className="research-hero-subtitle">
            A comprehensive, rigorous guide designed for computer science
            students, engineers, and independent researchers to transition from
            passive paper reading to formulating novel hypotheses, running
            disciplined ablation experiments, and publishing at top-tier
            peer-reviewed venues.
          </p>

          <div className="research-stats-row">
            <div className="stat-item">
              <span className="stat-number">4-Stage</span>
              <span className="stat-label">Scientific Roadmap</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4 Domains</span>
              <span className="stat-label">Deep-Dive Topic Starters</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100% Free</span>
              <span className="stat-label">Cloud GPUs & Tooling</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">A* Venues</span>
              <span className="stat-label">NeurIPS / ICML / ICLR / CVPR</span>
            </div>
          </div>
        </section>

        {/* Tab Controls */}
        <nav className="research-nav-tabs">
          <button
            className={`research-tab-btn ${activeTab === "methodology" ? "active" : ""}`}
            onClick={() => setActiveTab("methodology")}
          >
            <i className="fa-solid fa-route"></i>
            Research Methodology (From Scratch)
          </button>
          <button
            className={`research-tab-btn ${activeTab === "topics" ? "active" : ""}`}
            onClick={() => setActiveTab("topics")}
          >
            <i className="fa-solid fa-brain"></i>
            Topic Research Starters
          </button>
          <button
            className={`research-tab-btn ${activeTab === "tools" ? "active" : ""}`}
            onClick={() => setActiveTab("tools")}
          >
            <i className="fa-solid fa-toolbox"></i>
            Free Research Tools & GPUs
          </button>
          <button
            className={`research-tab-btn ${activeTab === "conferences" ? "active" : ""}`}
            onClick={() => setActiveTab("conferences")}
          >
            <i className="fa-solid fa-award"></i>
            Top Conferences & Journals
          </button>
        </nav>

        {/* Tab 1: Methodology Roadmap */}
        {activeTab === "methodology" && (
          <div className="methodology-container">
            {researchMethodologyStages.map((stage) => (
              <article key={stage.stage} className="stage-card">
                <div className="stage-header">
                  <div className="stage-badge-circle">
                    <i className={stage.icon}></i>
                  </div>
                  <div className="stage-title-wrap">
                    <span className="stage-number-tag">
                      Stage 0{stage.stage}
                    </span>
                    <h2 className="stage-main-title">{stage.title}</h2>
                    <span className="stage-subtitle">{stage.subtitle}</span>
                  </div>
                </div>

                <div className="stage-summary-box">{stage.summary}</div>

                <div className="stage-principles-box">
                  <span className="stage-principles-heading">
                    <i
                      className="fa-solid fa-circle-check"
                      style={{ color: "#10b981", marginRight: "0.4rem" }}
                    ></i>
                    Guiding Scientific Principles
                  </span>
                  <ul className="principles-list">
                    {stage.keyPrinciples.map((principle, idx) => (
                      <li key={idx}>
                        <i className="fa-solid fa-arrow-right"></i>
                        <span>{principle}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="action-steps-grid">
                  {stage.actionSteps.map((step, idx) => (
                    <div key={idx} className="action-step-item">
                      <h4 className="step-item-title">{step.title}</h4>
                      <p className="step-item-desc">{step.description}</p>
                      {step.proTip && (
                        <div className="step-item-protip">
                          <strong>Pro Tip:</strong> {step.proTip}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Tab 2: Topic Research Starters */}
        {activeTab === "topics" && (
          <div className="topic-starters-grid">
            {topicStarters.map((topic) => (
              <article key={topic.id} className="topic-card">
                <div className="topic-header">
                  <h2 className="topic-title">{topic.topic}</h2>
                  <span className="topic-tagline">{topic.tagline}</span>
                </div>

                <div className="portal-tags-row">
                  <strong
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                      alignSelf: "center",
                    }}
                  >
                    Prerequisites:
                  </strong>
                  {topic.prerequisites.map((p) => (
                    <span key={p} className="portal-tag-chip">
                      {p}
                    </span>
                  ))}
                </div>

                <div className="topic-intuition-box">
                  <strong>Core Mathematical Intuition: </strong>
                  {topic.coreIntuition}
                </div>

                <div>
                  <h4
                    style={{
                      margin: "0.5rem 0",
                      fontSize: "0.95rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    <i
                      className="fa-solid fa-file-pdf"
                      style={{ color: "#ef4444", marginRight: "0.4rem" }}
                    ></i>
                    Seminal Must-Read Papers (Download & Study)
                  </h4>
                  <table className="topic-papers-table">
                    <thead>
                      <tr>
                        <th>Paper Title</th>
                        <th>Year & Authors</th>
                        <th>Why It Matters</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topic.mustReadPapers.map((paper, idx) => (
                        <tr key={idx}>
                          <td>
                            <a
                              href={paper.arxivUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="arxiv-link"
                            >
                              <span>{paper.title}</span>
                              <i
                                className="fa-solid fa-arrow-up-right-from-square"
                                style={{ fontSize: "0.75rem" }}
                              ></i>
                            </a>
                          </td>
                          <td>
                            <span style={{ fontWeight: 600 }}>
                              {paper.year}
                            </span>
                            <br />
                            <small style={{ color: "var(--text-secondary)" }}>
                              {paper.authors}
                            </small>
                          </td>
                          <td>{paper.significance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "1rem",
                  }}
                >
                  <div className="portal-info-list">
                    <strong>
                      <i
                        className="fa-solid fa-chart-line"
                        style={{ color: "#2563eb", marginRight: "0.4rem" }}
                      ></i>
                      Standard Benchmarks:
                    </strong>
                    <ul
                      style={{
                        margin: "0.25rem 0 0 0",
                        paddingLeft: "1.2rem",
                        fontSize: "0.825rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {topic.standardBenchmarks.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="portal-info-list">
                    <strong>
                      <i
                        className="fa-solid fa-compass"
                        style={{ color: "#7c3aed", marginRight: "0.4rem" }}
                      ></i>
                      Open Research Directions:
                    </strong>
                    <ul
                      style={{
                        margin: "0.25rem 0 0 0",
                        paddingLeft: "1.2rem",
                        fontSize: "0.825rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {topic.openResearchDirections.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Tab 3: Free Tools & Cloud GPUs */}
        {activeTab === "tools" && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div className="filter-tabs-row">
              <button
                className={`filter-tab-btn ${selectedToolCategory === "all" ? "active" : ""}`}
                onClick={() => setSelectedToolCategory("all")}
              >
                All Tools
              </button>
              <button
                className={`filter-tab-btn ${selectedToolCategory === "discovery" ? "active" : ""}`}
                onClick={() => setSelectedToolCategory("discovery")}
              >
                Paper Discovery & Citations
              </button>
              <button
                className={`filter-tab-btn ${selectedToolCategory === "compute" ? "active" : ""}`}
                onClick={() => setSelectedToolCategory("compute")}
              >
                Free Cloud GPUs & Compute
              </button>
              <button
                className={`filter-tab-btn ${selectedToolCategory === "writing" ? "active" : ""}`}
                onClick={() => setSelectedToolCategory("writing")}
              >
                Writing & Citation Managers
              </button>
              <button
                className={`filter-tab-btn ${selectedToolCategory === "experimentation" ? "active" : ""}`}
                onClick={() => setSelectedToolCategory("experimentation")}
              >
                Experiment Tracking
              </button>
            </div>

            <div className="tools-grid">
              {filteredTools.map((tool) => (
                <article key={tool.id} className="tool-card">
                  <div className="tool-card-top">
                    <div className="tool-badge-row">
                      <span className="tool-category-badge">
                        {tool.categoryLabel}
                      </span>
                      <span className="tool-highlight-badge">{tool.badge}</span>
                    </div>

                    <h3 className="tool-title">{tool.name}</h3>
                    <p className="tool-desc">{tool.description}</p>

                    <div className="tool-freetier-box">
                      <strong>Free Tier: </strong>
                      {tool.freeTierDetails}
                    </div>
                  </div>

                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tool-launch-btn"
                  >
                    <span>Launch Resource</span>
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Conferences Directory */}
        {activeTab === "conferences" && (
          <div className="conferences-grid">
            {topConferences.map((conf) => (
              <article key={conf.id} className="conf-card">
                <div className="conf-top">
                  <div className="conf-meta-row">
                    <span className="conf-tier-badge">{conf.tier}</span>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {conf.domain}
                    </span>
                  </div>

                  <h3 className="conf-abbr">{conf.abbreviation}</h3>
                  <p className="conf-full-name">{conf.name}</p>

                  <div className="conf-details-list">
                    <div className="conf-detail-item">
                      <strong>Submission Window:</strong>{" "}
                      {conf.submissionCycles}
                    </div>
                    <div className="conf-detail-item">
                      <strong>Review Protocol:</strong> {conf.reviewStyle}
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {conf.description}
                  </p>
                </div>

                <a
                  href={conf.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portal-action-btn"
                >
                  <span>Official Venue Portal</span>
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              </article>
            ))}
          </div>
        )}
      </div>

      <PageFooter moduleName="AI & ML Research Hub" />
    </div>
  );
}
