"use client";

import { useState } from "react";
import Link from "next/link";
import BlogPageHeader from "@/components/BlogPageHeader";
import PageFooter from "@/components/PageFooter";
import { curajCourses } from "@/data/curaj-msc-cs/courses";
import { curajAssessments } from "@/data/curaj-msc-cs/assessments";
import "@/styles/curaj-curriculum.css";

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
    <div className="curaj-page-container">
      {/* Consistent Header */}
      <BlogPageHeader
        title="M.Sc. Computer Science — Syllabus & Study Guide"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <main className="curaj-content-wrapper">
        {/* Program Highlights Banner */}
        <section className="curaj-intro-card">
          <div className="curaj-intro-content">
            <div className="curaj-badge-row">
              <span className="curaj-badge">
                <i className="fa-solid fa-building-columns"></i> Central
                University of Rajasthan
              </span>
              <span className="curaj-badge curaj-badge-accent">
                <i className="fa-solid fa-graduation-cap"></i> NEP 2020 Scheme
              </span>
              <span className="curaj-badge curaj-badge-info">
                <i className="fa-solid fa-code-branch"></i> 2-Year M.Sc. CS
              </span>
              <span className="curaj-badge curaj-badge-outline">
                4 Semesters • 88 Credits
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

          {/* Clean, Unified Quick Study Hub */}
          <div className="curaj-quick-hub">
            <div className="curaj-hub-header">
              <span className="curaj-hub-title">
                <i className="fa-solid fa-bolt"></i> Quick Study Access
              </span>
              <span className="curaj-hub-badge">Live Modules</span>
            </div>

            {/* AI Unit 1 */}
            <Link
              href="/curaj-msc-cs/ai/unit-1-uninformed-search"
              className="curaj-action-item active-module"
            >
              <div className="curaj-action-left">
                <div className="curaj-action-icon icon-ai">
                  <i className="fa-solid fa-brain"></i>
                </div>
                <div className="curaj-action-text">
                  <span className="curaj-action-label">
                    AI Unit 1: Uninformed Search
                  </span>
                  <span className="curaj-action-desc">
                    Rich &amp; Knight Theory • Notes &amp; Quiz
                  </span>
                </div>
              </div>
              <i className="fa-solid fa-chevron-right curaj-action-arrow"></i>
            </Link>

            {/* Algo Unit 1 */}
            <Link
              href="/curaj-msc-cs/advanced-algorithms/unit-1-analysis-divide-conquer"
              className="curaj-action-item active-module"
            >
              <div className="curaj-action-left">
                <div className="curaj-action-icon icon-algo">
                  <i className="fa-solid fa-code"></i>
                </div>
                <div className="curaj-action-text">
                  <span className="curaj-action-label">
                    Algo Unit 1: Analysis &amp; Recurrences
                  </span>
                  <span className="curaj-action-desc">
                    Pure C Code • Master Theorem • CIA-1
                  </span>
                </div>
              </div>
              <i className="fa-solid fa-chevron-right curaj-action-arrow"></i>
            </Link>

            {/* CIA Assessments Hub */}
            <Link
              href="/curaj-msc-cs/assessments"
              className="curaj-action-item"
            >
              <div className="curaj-action-left">
                <div className="curaj-action-icon icon-cia">
                  <i className="fa-solid fa-file-circle-check"></i>
                </div>
                <div className="curaj-action-text">
                  <span className="curaj-action-label">
                    CIA Question Papers Hub
                  </span>
                  <span className="curaj-action-desc">
                    Official CIA-1 &amp; 2 Model Solutions
                  </span>
                </div>
              </div>
              <i className="fa-solid fa-chevron-right curaj-action-arrow"></i>
            </Link>

            {/* Download Official PDF */}
            <a
              href="https://drive.google.com/file/d/1B7TmMHPivoDZptiCfI21Ho3tOt9vFfHu/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="curaj-action-item"
            >
              <div className="curaj-action-left">
                <div className="curaj-action-icon icon-pdf">
                  <i className="fa-solid fa-file-pdf"></i>
                </div>
                <div className="curaj-action-text">
                  <span className="curaj-action-label">
                    Official Curriculum PDF
                  </span>
                  <span className="curaj-action-desc">
                    CURAJ Drive Download
                  </span>
                </div>
              </div>
              <i className="fa-solid fa-arrow-up-right-from-square curaj-action-arrow"></i>
            </a>
          </div>
        </section>

        {/* Filter Controls */}
        <section className="curaj-controls-bar">
          <div className="curaj-tabs">
            {[
              "All",
              "Semester I",
              "Semester II",
              "Semester III",
              "Semester IV",
            ].map((sem) => (
              <button
                key={sem}
                className={`curaj-tab-btn ${selectedSem === sem ? "active" : ""}`}
                onClick={() => setSelectedSem(sem)}
              >
                {sem}
              </button>
            ))}
            <Link
              href="/curaj-msc-cs/assessments"
              className="curaj-tab-btn curaj-assessments-quick-tab"
            >
              <i className="fa-solid fa-file-lines"></i> CIA Exam Papers
            </Link>
          </div>

          <div className="curaj-search-box">
            <i className="fa-solid fa-magnifying-glass curaj-search-icon"></i>
            <input
              type="text"
              placeholder="Search subject or course code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="curaj-search-input"
            />
          </div>
        </section>

        {/* Courses Grid */}
        <section className="curaj-courses-grid">
          {filteredCourses.map((c) => {
            const courseAssessments = curajAssessments.filter(
              (a) => a.courseCode === c.code,
            );
            const availableAssessments = courseAssessments.filter(
              (a) => a.status === "available",
            );

            return (
              <div key={c.code} className="curaj-course-card">
                <div className="curaj-card-top">
                  <span className="curaj-course-code">{c.code}</span>
                  <span
                    className={`curaj-type-tag curaj-type-${c.type.toLowerCase()}`}
                  >
                    {c.type} ({c.credits} Credits)
                  </span>
                </div>

                <h3 className="curaj-course-title">{c.title}</h3>
                <p className="curaj-course-desc">{c.description}</p>

                <div className="curaj-units-section">
                  <h4 className="curaj-units-heading">
                    <i className="fa-solid fa-layer-group"></i> Key Units in PDF
                  </h4>
                  <ul className="curaj-units-list">
                    {c.units.map((unit, uIdx) => {
                      const hasNotes =
                        c.availableNotesUnits &&
                        c.availableNotesUnits.includes(uIdx + 1) &&
                        c.notesUrl;

                      return (
                        <li
                          key={uIdx}
                          className={`curaj-unit-item ${hasNotes ? "unit-has-notes" : ""}`}
                        >
                          <div className="curaj-unit-content-row">
                            <span className="curaj-unit-text">
                              <span className="curaj-bullet">•</span> {unit}
                            </span>
                            {hasNotes && (
                              <Link
                                href={c.notesUrl!}
                                className="curaj-unit-notes-pill"
                                title="Study notes & take practice quiz"
                              >
                                <i className="fa-solid fa-book-open"></i>
                                <span>Notes & Quiz</span>
                                <i className="fa-solid fa-arrow-right"></i>
                              </Link>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Course Study Notes Section */}
                {c.notesUrl && (
                  <div className="curaj-card-notes-box">
                    <div className="curaj-notes-label-row">
                      <span className="curaj-notes-label">
                        <i className="fa-solid fa-graduation-cap"></i> Course
                        Notes & Quiz:
                      </span>
                      <span className="curaj-notes-badge available">
                        <i className="fa-solid fa-circle-check"></i> Unit 1
                        Available
                      </span>
                    </div>

                    <Link
                      href={c.notesUrl}
                      className="curaj-notes-link-btn highlight"
                    >
                      <span className="btn-left">
                        <i className="fa-solid fa-book-open-reader"></i>
                        <span>
                          {c.notesTitle || "Study Unit 1 Notes & Quiz"}
                        </span>
                      </span>
                      <span className="btn-tags">
                        <span className="curaj-exam-pill cia">CIA-1</span>
                        <span className="curaj-exam-pill jrf">UGC NET JRF</span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                )}

                {/* Assessments Box */}
                <div className="curaj-card-assessment-box">
                  <div className="curaj-assessment-label-row">
                    <span className="curaj-asm-label">
                      <i className="fa-solid fa-file-lines"></i> Internal
                      Assessments:
                    </span>
                    {availableAssessments.length > 0 ? (
                      <span className="curaj-asm-badge available">
                        <i className="fa-solid fa-circle-check"></i> CIA-1
                        Available
                      </span>
                    ) : (
                      <span className="curaj-asm-badge upcoming">
                        <i className="fa-regular fa-clock"></i> CIA-1 & CIA-2
                        Upcoming
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/curaj-msc-cs/assessments?course=${c.code}`}
                    className={`curaj-asm-link-btn ${
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
                <div className="curaj-card-action">
                  <a
                    href={c.nptelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="curaj-nptel-btn"
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
    </div>
  );
}
