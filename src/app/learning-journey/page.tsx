import React from "react";
import Link from "next/link";
import BlogPageHeader from "@/components/BlogPageHeader";
import PageFooter from "@/components/PageFooter";
import InteractiveJourneyMap from "@/components/learning-journey/InteractiveJourneyMap";
import "@/styles/learning-journey.css";

export default function LearningJourneyPage() {
  return (
    <div className="journey-container">
      {/* Header */}
      <BlogPageHeader
        title="My Learning Journey"
        backLink="/"
        backTitle="Home"
      />

      <main className="journey-main">
        {/* Hero Section */}
        <section className="journey-hero">
          <div className="journey-badge-wrap">
            <i className="fa-solid fa-seedling text-emerald-500"></i>
            <span>Transformational Voyage &amp; High-Agency Evolution</span>
          </div>

          <h1 className="journey-title">
            My Learning &amp; Geo-Trajectory Journey
          </h1>

          <p className="journey-subtitle">
            From an introverted undergraduate at DSVV in Haridwar, through
            self-directed COVID lockdowns in Khallikote village (Bhikapada,
            Odisha) and corporate workplace hustle in Bengaluru, to advanced
            Computer Science research specifically at CURAJ (Bandarsindri,
            Ajmer).
          </p>

          {/* Metrics Pill Row */}
          <div className="journey-stats-row">
            <div className="journey-stat-pill">
              <i className="fa-solid fa-route text-sky-500"></i>
              <span>Milestones:</span>
              <span className="journey-stat-val">4 Major Hubs</span>
            </div>
            <div className="journey-stat-pill">
              <i className="fa-solid fa-location-dot text-emerald-500"></i>
              <span>Current Base:</span>
              <span className="journey-stat-val">
                CURAJ, Bandarsindri (MSc CS)
              </span>
            </div>
            <div className="journey-stat-pill">
              <i className="fa-solid fa-graduation-cap text-purple-500"></i>
              <span>Origins:</span>
              <span className="journey-stat-val">DSVV in Haridwar (BSc)</span>
            </div>
            <div className="journey-stat-pill">
              <i className="fa-solid fa-house-laptop text-amber-500"></i>
              <span>Awakening:</span>
              <span className="journey-stat-val">
                Bhikapada, Khallikote Village, Odisha
              </span>
            </div>
          </div>
        </section>

        {/* Interactive Trajectory & Geo-Journey Map Section */}
        <section aria-label="Interactive Learning Journey Map">
          <InteractiveJourneyMap />
        </section>

        {/* Quote Box */}
        <section className="journey-quote-box">
          <blockquote className="journey-quote-text">
            &quot;The best time to plant a tree was 20 years ago. The second
            best time is now. True agency is looking at an impossible gap in
            knowledge and deciding to bridge it one project at a time.&quot;
          </blockquote>
        </section>

        {/* Navigation / Next Exploration Links */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <Link href="/curaj-msc-cs" className="journey-explore-card">
            <div className="journey-explore-left">
              <div className="journey-explore-icon">
                <i className="fa-solid fa-university"></i>
              </div>
              <div>
                <h4 className="journey-explore-title">CURAJ MSc CS Portal</h4>
                <p className="journey-explore-desc">
                  Explore Semester curricula, research, and lab notes
                </p>
              </div>
            </div>
            <span className="journey-explore-arrow">
              <i className="fa-solid fa-arrow-right"></i>
            </span>
          </Link>

          <Link href="/ai-engineering" className="journey-explore-card">
            <div className="journey-explore-left">
              <div className="journey-explore-icon">
                <i className="fa-solid fa-brain"></i>
              </div>
              <div>
                <h4 className="journey-explore-title">AI Engineering Hub</h4>
                <p className="journey-explore-desc">
                  Deep dive into MLOps, PyTorch, and Agentic AI
                </p>
              </div>
            </div>
            <span className="journey-explore-arrow">
              <i className="fa-solid fa-arrow-right"></i>
            </span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <PageFooter moduleName="Learning Journey" issueLabel="journey" />
    </div>
  );
}
