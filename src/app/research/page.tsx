"use client";

import React, { useState } from "react";
import BlogPageHeader from "@/components/BlogPageHeader";
import PageFooter from "@/components/PageFooter";
import {
  researchMethodologyStages,
  topicStarters,
  freeResearchTools,
  topConferences,
  researchAcademies,
  nptelResearchCourses,
  howToStartResearchSteps,
} from "@/data/researchHub";
import "@/styles/research-hub.css";

type ResearchViewTab =
  | "methodology"
  | "academies-nptel"
  | "topics"
  | "tools"
  | "conferences";

type AcademySubFilter = "all" | "elsevier" | "nptel" | "roadmap";

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState<ResearchViewTab>("methodology");
  const [selectedToolCategory, setSelectedToolCategory] =
    useState<string>("all");
  const [academySubFilter, setAcademySubFilter] =
    useState<AcademySubFilter>("all");

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
            passive paper reading to formulating novel hypotheses, completing
            certified courses (Elsevier Academy & NPTEL), running disciplined
            ablation experiments, and publishing at top-tier peer-reviewed
            venues.
          </p>

          <div className="research-stats-row">
            <div className="stat-item">
              <span className="stat-number">4-Stage</span>
              <span className="stat-label">Scientific Roadmap</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">Elsevier & NPTEL</span>
              <span className="stat-label">Free Certified Courses</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4 AI Domains</span>
              <span className="stat-label">Deep-Dive Topic Starters</span>
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
            className={`research-tab-btn ${activeTab === "academies-nptel" ? "active" : ""}`}
            onClick={() => setActiveTab("academies-nptel")}
          >
            <i className="fa-solid fa-graduation-cap"></i>
            Elsevier Academy & NPTEL Courses
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
                      style={{ color: "var(--primary)", marginRight: "0.4rem" }}
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

        {/* Tab 2: Elsevier Academy & NPTEL Courses */}
        {activeTab === "academies-nptel" && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {/* Sub Filter Navigation */}
            <div className="filter-tabs-row">
              <button
                className={`filter-tab-btn ${academySubFilter === "all" ? "active" : ""}`}
                onClick={() => setAcademySubFilter("all")}
              >
                All Resources (
                {researchAcademies.length + nptelResearchCourses.length})
              </button>
              <button
                className={`filter-tab-btn ${academySubFilter === "roadmap" ? "active" : ""}`}
                onClick={() => setAcademySubFilter("roadmap")}
              >
                <i className="fa-solid fa-timeline"></i>
                12-Week Starter Roadmap
              </button>
              <button
                className={`filter-tab-btn ${academySubFilter === "elsevier" ? "active" : ""}`}
                onClick={() => setAcademySubFilter("elsevier")}
              >
                <i className="fa-solid fa-certificate"></i>
                Elsevier & Global Academies
              </button>
              <button
                className={`filter-tab-btn ${academySubFilter === "nptel" ? "active" : ""}`}
                onClick={() => setAcademySubFilter("nptel")}
              >
                <i className="fa-solid fa-building-columns"></i>
                Official NPTEL IIT Courses
              </button>
            </div>

            {/* 12-Week Starter Roadmap */}
            {(academySubFilter === "all" || academySubFilter === "roadmap") && (
              <section className="starter-timeline-container">
                <div className="section-heading-group">
                  <h2 className="section-heading">
                    <i
                      className="fa-solid fa-flag-checkered"
                      style={{ color: "var(--primary)", marginRight: "0.5rem" }}
                    ></i>
                    How to Start Research from Scratch (12-Week Blueprint)
                  </h2>
                  <p className="section-subtext">
                    Follow this step-by-step pipeline connecting Elsevier
                    e-learning, NPTEL IIT video lectures, and hands-on paper
                    replication.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  {howToStartResearchSteps.map((step) => (
                    <article key={step.step} className="starter-step-card">
                      <div className="starter-step-circle">{step.step}</div>
                      <div className="starter-step-body">
                        <div className="starter-step-meta">
                          <span className="starter-timeframe-tag">
                            {step.timeframe}
                          </span>
                          <h3 className="starter-step-title">{step.title}</h3>
                        </div>
                        <p className="starter-step-obj">{step.objective}</p>

                        <div className="starter-resources-row">
                          <strong
                            style={{
                              fontSize: "0.8rem",
                              color: "var(--text-secondary)",
                              alignSelf: "center",
                            }}
                          >
                            Assigned Resources:
                          </strong>
                          {step.recommendedResources.map((res, i) => (
                            <a
                              key={i}
                              href={res.url}
                              target={
                                res.url.startsWith("http")
                                  ? "_blank"
                                  : undefined
                              }
                              rel={
                                res.url.startsWith("http")
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className="starter-resource-link"
                            >
                              <span>{res.name}</span>
                              <i
                                className="fa-solid fa-arrow-up-right-from-square"
                                style={{ fontSize: "0.7rem" }}
                              ></i>
                            </a>
                          ))}
                        </div>

                        <div className="starter-deliverable-box">
                          <strong>Milestone Deliverable: </strong>
                          {step.milestoneDeliverable}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Elsevier & Publisher Academies */}
            {(academySubFilter === "all" ||
              academySubFilter === "elsevier") && (
              <section
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <div className="section-heading-group">
                  <h2 className="section-heading">
                    <i
                      className="fa-solid fa-award"
                      style={{ color: "var(--primary)", marginRight: "0.5rem" }}
                    ></i>
                    Publisher Research Academies (Free Certified E-Learning)
                  </h2>
                  <p className="section-subtext">
                    Free courses offered directly by global scientific
                    publishers (Elsevier, Nature, IEEE, Clarivate) teaching
                    scientific writing, peer review, and bibliometrics.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                  }}
                >
                  {researchAcademies.map((academy) => (
                    <article key={academy.id} className="academy-card">
                      <div className="academy-top-header">
                        <div className="academy-title-row">
                          <div>
                            <h3 className="academy-name">{academy.name}</h3>
                            <span className="academy-provider">
                              {academy.provider}
                            </span>
                          </div>
                          {academy.freeCertification && (
                            <span className="academy-cert-badge">
                              <i className="fa-solid fa-certificate"></i>{" "}
                              Verified Certificate of Completion
                            </span>
                          )}
                        </div>
                        <p className="academy-desc">{academy.description}</p>
                      </div>

                      <div className="academy-tracks-grid">
                        {academy.learningTracks.map((track, i) => (
                          <div key={i} className="academy-track-box">
                            <h4 className="track-title">{track.trackTitle}</h4>
                            <p className="track-desc">{track.description}</p>
                            <ul className="track-modules-list">
                              {track.modules.map((mod, j) => (
                                <li key={j}>{mod}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <div className="portal-info-list">
                        <strong>Key Highlights:</strong>
                        <ul
                          style={{
                            margin: "0.25rem 0 0 0",
                            paddingLeft: "1.2rem",
                            fontSize: "0.825rem",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {academy.keyHighlights.map((h, k) => (
                            <li key={k}>{h}</li>
                          ))}
                        </ul>
                      </div>

                      <a
                        href={academy.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portal-action-btn"
                      >
                        <span>Enroll Free in {academy.name}</span>
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Official NPTEL IIT Courses */}
            {(academySubFilter === "all" || academySubFilter === "nptel") && (
              <section
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <div className="section-heading-group">
                  <h2 className="section-heading">
                    <i
                      className="fa-solid fa-building-columns"
                      style={{ color: "var(--primary)", marginRight: "0.5rem" }}
                    ></i>
                    Official NPTEL & SWAYAM Research Courses (IIT Faculty)
                  </h2>
                  <p className="section-subtext">
                    Authoritative semester-length lecture series taught by
                    senior faculty at IIT Madras, IISER Kolkata, IIT Kharagpur,
                    and IIT Guwahati.
                  </p>
                </div>

                <div className="nptel-grid">
                  {nptelResearchCourses.map((course) => (
                    <article key={course.id} className="nptel-card">
                      <div className="nptel-card-top">
                        <div className="nptel-meta-header">
                          <span className="nptel-code-badge">
                            {course.courseCode}
                          </span>
                          <span className="nptel-duration-badge">
                            <i className="fa-regular fa-clock"></i>{" "}
                            {course.duration}
                          </span>
                        </div>

                        <h3 className="nptel-course-name">
                          {course.courseName}
                        </h3>
                        <p className="nptel-instructor-line">
                          <strong>{course.instructor}</strong> &bull;{" "}
                          {course.institute}
                        </p>
                        <p className="nptel-desc">{course.description}</p>

                        <div className="nptel-why-box">
                          <strong>Why Take This: </strong>
                          {course.whyTakeThis}
                        </div>

                        <div className="portal-info-list">
                          <strong>Key Syllabus Modules:</strong>
                          <ul
                            style={{
                              margin: "0.25rem 0 0 0",
                              paddingLeft: "1.2rem",
                              fontSize: "0.8rem",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {course.keyTopics.map((topic, idx) => (
                              <li key={idx}>{topic}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <a
                        href={course.courseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portal-action-btn"
                      >
                        <span>Access Course on NPTEL / SWAYAM</span>
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Tab 3: Topic Research Starters */}
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
                      style={{ color: "var(--primary)", marginRight: "0.4rem" }}
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
                        style={{
                          color: "var(--primary)",
                          marginRight: "0.4rem",
                        }}
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
                        style={{
                          color: "var(--primary)",
                          marginRight: "0.4rem",
                        }}
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

        {/* Tab 4: Free Tools & Cloud GPUs */}
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

        {/* Tab 5: Conferences Directory */}
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
