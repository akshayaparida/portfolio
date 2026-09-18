"use client";

import { useState } from "react";
import Link from "next/link";
import BlogPageHeader from "@/components/BlogPageHeader";
import PageFooter from "@/components/PageFooter";
import { curajCourses } from "@/data/curaj-msc-cs/courses";
import { curajAssessments } from "@/data/curaj-msc-cs/assessments";

export default function CurajMscCsPage() {
  const [selectedSem, setSelectedSem] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCourses = curajCourses.filter((course) => {
    const matchesSem = selectedSem === "All" || course.semester === selectedSem;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSem && matchesSearch;
  });

  return (
    <div className="page-container">
      {/* Consistent Header */}
      <BlogPageHeader
        title="M.Sc. Computer Science — Syllabus & Study Guide"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <main className="content-wrapper">
        {/* Program Highlights Banner */}
        <section className="intro-card">
          <div className="intro-content">
            <div className="badge-row">
              <span className="badge">Central University of Rajasthan</span>
              <span className="badge badge-accent">NEP 2020 Scheme</span>
              <span className="badge badge-cia">
                <i className="fa-solid fa-file-circle-check"></i> CIA-1 Papers &
                Solutions
              </span>
            </div>
            <h2>2-Year M.Sc. (Computer Science) Curriculum</h2>
            <p>
              Academic syllabus for Central University of Rajasthan (CURAJ).
              Each course is structured with syllabus units, curated{" "}
              <strong>NPTEL / SWAYAM lectures</strong>, and direct links to{" "}
              <strong>
                Continuous Internal Assessment (CIA-1 & CIA-2) question papers
                with model solutions
              </strong>
              .
            </p>
          </div>
          <div className="banner-actions">
            <Link href="/curaj-msc-cs/assessments" className="cia-portal-btn">
              <i className="fa-solid fa-file-pen"></i> View CIA Assessments Hub
            </Link>
            <a
              href="https://drive.google.com/file/d/1B7TmMHPivoDZptiCfI21Ho3tOt9vFfHu/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="pdf-btn"
            >
              <i className="fa-solid fa-file-pdf"></i> Download Official PDF
            </a>
          </div>
        </section>

        {/* Filter Controls */}
        <section className="controls-bar">
          <div className="tabs">
            {[
              "All",
              "Semester I",
              "Semester II",
              "Semester III",
              "Semester IV",
            ].map((sem) => (
              <button
                key={sem}
                onClick={() => setSelectedSem(sem)}
                className={`tab-btn ${selectedSem === sem ? "active" : ""}`}
              >
                {sem}
              </button>
            ))}
            <Link
              href="/curaj-msc-cs/assessments"
              className="tab-btn assessments-quick-tab"
            >
              <i className="fa-solid fa-file-lines"></i> CIA Exam Papers
            </Link>
          </div>

          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input
              type="text"
              placeholder="Search subject or course code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </section>

        {/* Courses Grid */}
        <section className="courses-grid">
          {filteredCourses.map((c) => {
            const courseAssessments = curajAssessments.filter(
              (a) => a.courseCode === c.code,
            );
            const availableAssessments = courseAssessments.filter(
              (a) => a.status === "available",
            );

            return (
              <div key={c.code} className="course-card">
                <div className="card-top">
                  <span className="course-code">{c.code}</span>
                  <span className={`type-tag type-${c.type.toLowerCase()}`}>
                    {c.type} ({c.credits} Credits)
                  </span>
                </div>

                <h3 className="course-title">{c.title}</h3>
                <p className="course-desc">{c.description}</p>

                <div className="units-section">
                  <h4 className="units-heading">
                    <i className="fa-solid fa-layer-group"></i> Key Units in PDF
                  </h4>
                  <ul className="units-list">
                    {c.units.map((unit, uIdx) => (
                      <li key={uIdx}>
                        <span className="bullet">•</span> {unit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Continuous Internal Assessment Section */}
                <div className="card-assessment-box">
                  <div className="assessment-label-row">
                    <span className="asm-label">
                      <i className="fa-solid fa-pen-ruler"></i> Internal
                      Assessments:
                    </span>
                    {availableAssessments.length > 0 ? (
                      <span className="asm-badge available">
                        <i className="fa-solid fa-circle-check"></i> CIA-1
                        Available
                      </span>
                    ) : (
                      <span className="asm-badge upcoming">
                        <i className="fa-regular fa-clock"></i> CIA-1 & CIA-2
                        Upcoming
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/curaj-msc-cs/assessments?course=${c.code}`}
                    className={`asm-link-btn ${
                      availableAssessments.length > 0 ? "highlight" : ""
                    }`}
                  >
                    {availableAssessments.length > 0 ? (
                      <>
                        <span className="btn-left">
                          <i className="fa-solid fa-file-circle-check"></i>
                          <span>View CIA-1 Paper & Solutions</span>
                        </span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </>
                    ) : (
                      <>
                        <span className="btn-left">
                          <i className="fa-solid fa-calendar-check"></i>
                          <span>View Assessment Info</span>
                        </span>
                        <i className="fa-solid fa-chevron-right"></i>
                      </>
                    )}
                  </Link>
                </div>

                {/* NPTEL Resource Link Button */}
                <div className="card-action">
                  <a
                    href={c.nptelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nptel-btn"
                  >
                    <i className="fa-solid fa-graduation-cap"></i>
                    <span>Study on NPTEL</span>
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                </div>
              </div>
            );
          })}
        </section>
      </main>

      {/* Consistent Footer */}
      <PageFooter moduleName="CURAJ MSc CS" issueLabel="curaj-msc-cs" />

      <style jsx>{`
        .page-container {
          min-height: 100vh;
          background: var(--bg-light);
          color: var(--text-primary);
          display: flex;
          flex-direction: column;
          transition:
            background-color 0.3s ease,
            color 0.3s ease;
        }

        .content-wrapper {
          max-width: 1240px;
          width: 100%;
          margin: 0 auto;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          box-sizing: border-box;
          flex: 1;
        }

        .badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.65rem;
        }

        .badge {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #10b981;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
          padding: 0.25rem 0.65rem;
          border-radius: 6px;
        }

        .badge-accent {
          color: #10b981;
        }

        .badge-cia {
          color: #3b82f6;
          background: rgba(59, 130, 246, 0.08);
          border-color: rgba(59, 130, 246, 0.25);
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .intro-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .intro-content {
          flex: 1;
          min-width: 300px;
        }

        .intro-content h2 {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--heading-color);
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.01em;
        }

        .intro-content p {
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0;
          font-size: 0.95rem;
        }

        .banner-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .cia-portal-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.75rem 1.25rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #fff;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.9rem;
          transition:
            filter 0.2s,
            transform 0.15s;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.25);
        }

        .cia-portal-btn:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }

        .pdf-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.65rem 1.25rem;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-primary);
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.88rem;
          transition: all 0.2s;
        }

        .pdf-btn:hover {
          border-color: #10b981;
          color: #10b981;
          background: var(--bg-light);
          transform: translateY(-1px);
        }

        .controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .tabs {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .tab-btn {
          padding: 0.55rem 1rem;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .tab-btn:hover {
          background: var(--bg-light);
          color: var(--heading-color);
        }

        .tab-btn.active {
          background: #10b981;
          color: #fff;
          border-color: #10b981;
        }

        .assessments-quick-tab {
          background: rgba(16, 185, 129, 0.08);
          color: #10b981;
          border-color: rgba(16, 185, 129, 0.3);
          font-weight: 700;
        }

        .assessments-quick-tab:hover {
          background: #10b981;
          color: #ffffff;
        }

        .search-box {
          position: relative;
          min-width: 260px;
        }

        .search-icon {
          position: absolute;
          left: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .search-input {
          width: 100%;
          padding: 0.6rem 0.85rem 0.6rem 2.25rem;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--heading-color);
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .search-input:focus {
          border-color: #10b981;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .course-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          transition:
            transform 0.2s,
            box-shadow 0.2s,
            border-color 0.2s;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .course-card:hover {
          transform: translateY(-3px);
          border-color: #10b981;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
        }

        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .course-code {
          font-size: 0.75rem;
          font-weight: 800;
          color: #10b981;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
          padding: 0.2rem 0.5rem;
          border-radius: 5px;
          letter-spacing: 0.5px;
        }

        .type-tag {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.2rem 0.55rem;
          border-radius: 5px;
          text-transform: uppercase;
          color: #10b981;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
        }
        .type-major,
        .type-minor,
        .type-elective,
        .type-aec,
        .type-project {
          color: #10b981;
        }

        .course-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--heading-color);
          margin: 0 0 0.5rem 0;
          line-height: 1.35;
        }

        .course-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin: 0 0 1.25rem 0;
        }

        .units-section {
          background: var(--bg-light);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.25rem;
          flex: 1;
        }

        .units-heading {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0 0 0.6rem 0;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .units-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .units-list li {
          font-size: 0.82rem;
          color: var(--text-primary);
          line-height: 1.45;
        }

        .bullet {
          color: #10b981;
          font-weight: 800;
          margin-right: 0.25rem;
        }

        /* Assessment Card Box */
        .card-assessment-box {
          background: var(--bg-light);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 0.85rem 1rem;
          margin-bottom: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .assessment-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .asm-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .asm-badge {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }

        .asm-badge.available {
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .asm-badge.upcoming {
          background: rgba(148, 163, 184, 0.1);
          color: var(--text-muted);
          border: 1px solid rgba(148, 163, 184, 0.2);
        }

        .asm-link-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0.8rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text-primary);
          transition: all 0.2s;
        }

        .asm-link-btn .btn-left {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .asm-link-btn:hover {
          border-color: #10b981;
          background: var(--bg-light);
          color: #10b981;
        }

        .asm-link-btn.highlight {
          border-color: rgba(16, 185, 129, 0.4);
          background: rgba(16, 185, 129, 0.08);
          color: #059669;
          font-weight: 700;
        }

        .asm-link-btn.highlight:hover {
          background: #10b981;
          color: #ffffff;
        }

        .card-action {
          margin-top: auto;
        }

        .nptel-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 1rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.85rem;
          transition:
            filter 0.2s,
            transform 0.15s;
        }

        .nptel-btn:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }

        .nptel-btn span {
          flex: 1;
          margin-left: 0.6rem;
        }

        @media (max-width: 640px) {
          .content-wrapper {
            padding: 1rem;
          }
          .courses-grid {
            grid-template-columns: 1fr;
          }
          .intro-card {
            flex-direction: column;
            align-items: flex-start;
          }
          .banner-actions {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
