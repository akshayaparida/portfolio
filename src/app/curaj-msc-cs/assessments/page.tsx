"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BlogPageHeader from "@/components/BlogPageHeader";
import PageFooter from "@/components/PageFooter";
import { curajCourses } from "@/data/curaj-msc-cs/courses";
import {
  curajAssessments,
  getAssessmentsForCourse,
} from "@/data/curaj-msc-cs/assessments";
import { Assessment, AssessmentQuestion } from "@/data/curaj-msc-cs/types";

function AssessmentsContent() {
  const searchParams = useSearchParams();
  const initialCourse = searchParams.get("course") || "6.0CSC03";
  const initialAssessmentId = searchParams.get("id") || "sem1-python-cia1";

  const [selectedSem, setSelectedSem] = useState<string>("Semester I");
  const [selectedCourseCode, setSelectedCourseCode] =
    useState<string>(initialCourse);
  const [selectedAssessmentId, setSelectedAssessmentId] =
    useState<string>(initialAssessmentId);
  const [selectedQuestionFilter, setSelectedQuestionFilter] =
    useState<string>("all");
  const [copiedQuestionId, setCopiedQuestionId] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Available courses for selected semester
  const semesterCourses = useMemo(() => {
    return curajCourses.filter((c) => c.semester === selectedSem);
  }, [selectedSem]);

  // If selected course is not in selected semester, auto-select first course in semester
  useEffect(() => {
    if (
      semesterCourses.length > 0 &&
      !semesterCourses.some((c) => c.code === selectedCourseCode)
    ) {
      setSelectedCourseCode(semesterCourses[0].code);
    }
  }, [selectedSem, semesterCourses, selectedCourseCode]);

  // Assessments for current course
  const currentCourseAssessments = useMemo(() => {
    return getAssessmentsForCourse(selectedCourseCode);
  }, [selectedCourseCode]);

  // Current active assessment
  const activeAssessment: Assessment | undefined = useMemo(() => {
    const found = currentCourseAssessments.find(
      (a) => a.id === selectedAssessmentId,
    );
    if (found) return found;
    return currentCourseAssessments[0] || undefined;
  }, [currentCourseAssessments, selectedAssessmentId]);

  // Update selectedAssessmentId when course changes
  useEffect(() => {
    if (
      currentCourseAssessments.length > 0 &&
      !currentCourseAssessments.some((a) => a.id === selectedAssessmentId)
    ) {
      setSelectedAssessmentId(currentCourseAssessments[0].id);
    }
  }, [currentCourseAssessments, selectedAssessmentId]);

  // Filter questions if a single question filter is selected
  const visibleQuestions: AssessmentQuestion[] = useMemo(() => {
    if (!activeAssessment || !activeAssessment.questions) return [];
    if (selectedQuestionFilter === "all") return activeAssessment.questions;
    return activeAssessment.questions.filter(
      (q) => q.qNumber.toLowerCase() === selectedQuestionFilter.toLowerCase(),
    );
  }, [activeAssessment, selectedQuestionFilter]);

  const activeCourse = curajCourses.find((c) => c.code === selectedCourseCode);

  const handleCopyCode = (qId: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedQuestionId(qId);
    setTimeout(() => setCopiedQuestionId(null), 2500);
  };

  const handleResetZoom = () => setZoomLevel(1);
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.3, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.3, 0.7));

  return (
    <div className="page-container">
      <BlogPageHeader
        title="CURAJ MSc CS — Continuous Assessments & CIA Hub"
        backLink="/curaj-msc-cs"
        backTitle="CURAJ Curriculum"
      />

      <main className="content-wrapper">
        {/* Hub Header & Status Bar */}
        <section className="hub-hero">
          <div className="hub-meta-pill-row">
            <span className="hub-pill highlight">
              Central University of Rajasthan
            </span>
            <span className="hub-pill">M.Sc. Computer Science</span>
            <span className="hub-pill accent">Internal Assessments (CIA)</span>
          </div>
          <h1 className="hub-title">Continuous Internal Assessment Portal</h1>
          <p className="hub-subtitle">
            Curated question papers, exam metadata, and academic-grade model
            solutions for Continuous Internal Assessments (CIA-1, CIA-2) across
            all semesters and subjects.
          </p>
        </section>

        {/* 3-Level Modular Filter Bar */}
        <section className="selection-card">
          {/* Level 1: Semester Selector */}
          <div className="filter-group">
            <label className="filter-label">
              <i className="fa-solid fa-calendar-days"></i> 1. Select Semester:
            </label>
            <div className="pill-group">
              {["Semester I", "Semester II", "Semester III", "Semester IV"].map(
                (sem) => (
                  <button
                    key={sem}
                    onClick={() => setSelectedSem(sem)}
                    className={`choice-btn ${selectedSem === sem ? "active" : ""}`}
                  >
                    {sem}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Level 2: Subject Selector */}
          <div className="filter-group">
            <label className="filter-label">
              <i className="fa-solid fa-book-open"></i> 2. Select Subject /
              Course:
            </label>
            <div className="subject-pills">
              {semesterCourses.map((c) => {
                const hasAssessments = curajAssessments.some(
                  (a) => a.courseCode === c.code && a.status === "available",
                );
                return (
                  <button
                    key={c.code}
                    onClick={() => setSelectedCourseCode(c.code)}
                    className={`subject-btn ${
                      selectedCourseCode === c.code ? "active" : ""
                    }`}
                  >
                    <span className="sub-code">{c.code}</span>
                    <span className="sub-title">{c.title}</span>
                    {hasAssessments && (
                      <span className="paper-badge">
                        <i className="fa-solid fa-file-circle-check"></i> Paper
                        & Solutions
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Level 3: Assessment Type Switcher */}
          {currentCourseAssessments.length > 0 && (
            <div className="filter-group">
              <label className="filter-label">
                <i className="fa-solid fa-list-check"></i> 3. Assessment Type:
              </label>
              <div className="assessment-pills">
                {currentCourseAssessments.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setSelectedAssessmentId(a.id)}
                    className={`assessment-btn ${
                      activeAssessment?.id === a.id ? "active" : ""
                    }`}
                  >
                    <span className="asm-type">{a.assessmentType}</span>
                    <span className="asm-status">
                      {a.status === "available" ? (
                        <span className="status-live">
                          <i className="fa-solid fa-circle"></i> Available
                        </span>
                      ) : (
                        <span className="status-upcoming">
                          <i className="fa-solid fa-clock"></i> Upcoming
                        </span>
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ACTIVE ASSESSMENT CONTAINER */}
        {activeAssessment ? (
          activeAssessment.status === "available" ? (
            /* AVAILABLE ASSESSMENT VIEW */
            <section className="assessment-active-view">
              {/* Paper Metadata Card */}
              <div className="paper-header-card">
                <div className="header-top-row">
                  <div className="dept-info">
                    <span className="inst-name">
                      Central University of Rajasthan
                    </span>
                    <span className="school-dept">
                      School of Mathematics, Statistics & Computational Sciences
                      — Department of Computer Science
                    </span>
                  </div>
                  <div className="exam-status-tag">
                    <i className="fa-solid fa-circle-check"></i> Official CIA-1
                    Paper
                  </div>
                </div>

                <div className="paper-title-area">
                  <h2 className="paper-subject-title">
                    {activeAssessment.courseCode} —{" "}
                    {activeAssessment.courseTitle}
                  </h2>
                  <h3 className="paper-assessment-name">
                    {activeAssessment.title}
                  </h3>
                </div>

                <div className="paper-stats-grid">
                  <div className="stat-box">
                    <span className="stat-label">Date of Exam</span>
                    <span className="stat-val">
                      <i className="fa-regular fa-calendar"></i>{" "}
                      {activeAssessment.date || "September 16, 2026"}
                    </span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-label">Duration</span>
                    <span className="stat-val">
                      <i className="fa-regular fa-clock"></i>{" "}
                      {activeAssessment.time || "01 Hrs."}
                    </span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-label">Maximum Marks</span>
                    <span className="stat-val">
                      <i className="fa-solid fa-award"></i>{" "}
                      {activeAssessment.totalMarks || 20} Marks
                    </span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-label">Questions</span>
                    <span className="stat-val">
                      <i className="fa-solid fa-list-ol"></i>{" "}
                      {activeAssessment.questions.length} Compulsory
                    </span>
                  </div>
                </div>

                {activeAssessment.instructions && (
                  <div className="instructions-banner">
                    <i className="fa-solid fa-circle-info"></i>
                    <span>
                      <strong>Exam Note:</strong>{" "}
                      {activeAssessment.instructions.join(" ")}
                    </span>
                  </div>
                )}
              </div>

              {/* Original Scanned Question Paper Section */}
              {activeAssessment.paperImages.length > 0 && (
                <div className="paper-scan-card">
                  <div className="scan-card-header">
                    <div>
                      <h3 className="scan-heading">
                        <i className="fa-solid fa-file-lines"></i> Original
                        Question Paper (Scanned)
                      </h3>
                      <p className="scan-subtext">
                        Scanned physical exam sheet from Central University of
                        Rajasthan. Click to zoom or preview in fullscreen.
                      </p>
                    </div>
                    <div className="scan-actions">
                      <button
                        onClick={() => setIsLightboxOpen(true)}
                        className="btn-action btn-preview"
                      >
                        <i className="fa-solid fa-expand"></i> Fullscreen Zoom
                      </button>
                      <a
                        href={activeAssessment.paperImages[0]}
                        download="CURAJ-Python-CIA1.jpg"
                        className="btn-action btn-download"
                      >
                        <i className="fa-solid fa-download"></i> Download Image
                      </a>
                    </div>
                  </div>

                  <div
                    className="scan-preview-wrapper"
                    onClick={() => setIsLightboxOpen(true)}
                    title="Click to zoom in fullscreen"
                  >
                    <Image
                      src={activeAssessment.paperImages[0]}
                      alt="CURAJ MSc CS CIA-1 Question Paper"
                      width={1200}
                      height={900}
                      className="scan-image"
                      priority
                    />
                    <div className="scan-overlay">
                      <span className="overlay-badge">
                        <i className="fa-solid fa-magnifying-glass-plus"></i>{" "}
                        Click to Open High-Res Fullscreen Viewer
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Question Navigation & Solutions Section */}
              <div className="solutions-container">
                <div className="solutions-header-bar">
                  <div>
                    <h3 className="solutions-title">
                      <i className="fa-solid fa-square-root-variable"></i>{" "}
                      Question Paper & Verified Model Solutions
                    </h3>
                    <p className="solutions-desc">
                      Detailed theoretical answers, step-by-step code
                      demonstrations, and execution outputs verified for
                      academic evaluation.
                    </p>
                  </div>

                  {/* Question Quick-Jump Filter */}
                  <div className="question-filter-pills">
                    <button
                      onClick={() => setSelectedQuestionFilter("all")}
                      className={`q-filter-btn ${
                        selectedQuestionFilter === "all" ? "active" : ""
                      }`}
                    >
                      All ({activeAssessment.questions.length})
                    </button>
                    {activeAssessment.questions.map((q) => (
                      <button
                        key={q.id}
                        onClick={() => setSelectedQuestionFilter(q.qNumber)}
                        className={`q-filter-btn ${
                          selectedQuestionFilter.toLowerCase() ===
                          q.qNumber.toLowerCase()
                            ? "active"
                            : ""
                        }`}
                      >
                        {q.qNumber} ({q.marks}m)
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question Cards List */}
                <div className="questions-stack">
                  {visibleQuestions.map((q) => (
                    <article key={q.id} className="question-solution-card">
                      {/* Question Header */}
                      <header className="question-card-top">
                        <div className="q-badge-row">
                          <span className="q-number-badge">{q.qNumber}</span>
                          <span className="q-marks-badge">{q.marks} Marks</span>
                        </div>
                        <h4 className="q-text">{q.question}</h4>
                      </header>

                      {/* Solution Content */}
                      <div className="solution-body">
                        {/* Summary */}
                        <div className="sol-summary">
                          <span className="sol-label">Core Concept:</span>{" "}
                          {q.solution.summary}
                        </div>

                        {/* Key Bullet Points */}
                        {q.solution.keyPoints &&
                          q.solution.keyPoints.length > 0 && (
                            <div className="sol-keypoints">
                              <h5 className="section-subhead">
                                <i className="fa-solid fa-check-double"></i> Key
                                Academic Points:
                              </h5>
                              <ul className="points-list">
                                {q.solution.keyPoints.map((pt, pIdx) => (
                                  <li key={pIdx}>
                                    <span className="point-bullet">›</span> {pt}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        {/* Code Implementation */}
                        {q.solution.code && (
                          <div className="sol-code-block">
                            <div className="code-header">
                              <div className="code-lang">
                                <i className="fa-brands fa-python"></i> Python 3
                                Solution
                              </div>
                              <button
                                onClick={() =>
                                  handleCopyCode(q.id, q.solution.code || "")
                                }
                                className="copy-btn"
                                title="Copy code snippet"
                              >
                                {copiedQuestionId === q.id ? (
                                  <>
                                    <i className="fa-solid fa-check"></i>{" "}
                                    Copied!
                                  </>
                                ) : (
                                  <>
                                    <i className="fa-regular fa-copy"></i> Copy
                                    Code
                                  </>
                                )}
                              </button>
                            </div>
                            <pre className="code-content">
                              <code>{q.solution.code}</code>
                            </pre>
                          </div>
                        )}

                        {/* Terminal Output */}
                        {q.solution.output && (
                          <div className="sol-output-block">
                            <div className="output-header">
                              <i className="fa-solid fa-terminal"></i> Terminal
                              Execution Output
                            </div>
                            <pre className="output-content">
                              <code>{q.solution.output}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            /* UPCOMING ASSESSMENT PLACEHOLDER */
            <section className="upcoming-placeholder-card">
              <div className="upcoming-icon-wrap">
                <i className="fa-solid fa-clock-rotate-left"></i>
              </div>
              <h3 className="upcoming-title">
                {activeAssessment.assessmentType} is Upcoming
              </h3>
              <p className="upcoming-course">
                {activeAssessment.courseCode}: {activeAssessment.courseTitle}
              </p>
              <p className="upcoming-desc">
                {activeAssessment.notes ||
                  "This Continuous Internal Assessment will be uploaded once the exam session concludes at CURAJ."}
              </p>

              {activeCourse && (
                <div className="upcoming-units">
                  <h4 className="units-title">
                    <i className="fa-solid fa-book"></i> Syllabus Units to
                    Prepare:
                  </h4>
                  <div className="units-grid">
                    {activeCourse.units.map((unit, uIdx) => (
                      <div key={uIdx} className="unit-item">
                        <span className="unit-dot">•</span> {unit}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="upcoming-actions">
                <Link
                  href={activeCourse?.nptelUrl || "/curaj-msc-cs"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-action btn-preview"
                >
                  <i className="fa-solid fa-graduation-cap"></i> Study Syllabus
                  on NPTEL
                </Link>
                <Link href="/curaj-msc-cs" className="btn-action btn-outline">
                  <i className="fa-solid fa-arrow-left"></i> Back to Course
                  Overview
                </Link>
              </div>
            </section>
          )
        ) : (
          /* NO ASSESSMENT REGISTERED FOR THIS COURSE YET */
          <section className="empty-assessments-card">
            <i className="fa-solid fa-folder-open empty-icon"></i>
            <h3>No Assessments Found</h3>
            <p>
              Assessments for this course have not been scheduled or uploaded
              yet.
            </p>
            <Link href="/curaj-msc-cs" className="btn-action btn-preview">
              Return to Curriculum
            </Link>
          </section>
        )}
      </main>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {isLightboxOpen && activeAssessment?.paperImages?.[0] && (
        <div
          className="lightbox-backdrop"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-toolbar">
              <div className="lightbox-title">
                {activeAssessment.courseTitle} — {activeAssessment.title}{" "}
                (Scanned Paper)
              </div>
              <div className="lightbox-controls">
                <button
                  onClick={handleZoomOut}
                  className="ctrl-btn"
                  title="Zoom Out"
                >
                  <i className="fa-solid fa-magnifying-glass-minus"></i>
                </button>
                <span className="zoom-indicator">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="ctrl-btn"
                  title="Zoom In"
                >
                  <i className="fa-solid fa-magnifying-glass-plus"></i>
                </button>
                <button
                  onClick={handleResetZoom}
                  className="ctrl-btn"
                  title="Reset Zoom"
                >
                  <i className="fa-solid fa-rotate-left"></i>
                </button>
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="ctrl-btn close-btn"
                  title="Close (Esc)"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>

            <div className="lightbox-image-viewport">
              <div
                className="zoomable-container"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: "center center",
                  transition: "transform 0.15s ease-out",
                }}
              >
                <Image
                  src={activeAssessment.paperImages[0]}
                  alt="Full Paper Preview"
                  width={1400}
                  height={1050}
                  className="lightbox-img"
                />
              </div>
            </div>
          </div>
        </div>
      )}

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

        /* Hero */
        .hub-hero {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2.2rem;
          box-shadow: var(--shadow-sm);
        }

        .hub-meta-pill-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 0.85rem;
        }

        .hub-pill {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          background: var(--bg-light);
          border: 1px solid var(--border);
          color: var(--text-secondary);
        }

        .hub-pill.highlight {
          color: var(--primary);
          background: rgba(16, 185, 129, 0.08);
          border-color: rgba(16, 185, 129, 0.25);
        }

        .hub-pill.accent {
          color: #3b82f6;
          background: rgba(59, 130, 246, 0.08);
          border-color: rgba(59, 130, 246, 0.25);
        }

        .hub-title {
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--heading-color);
          margin: 0 0 0.6rem 0;
          letter-spacing: -0.02em;
        }

        .hub-subtitle {
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
          max-width: 900px;
          font-size: 1rem;
        }

        /* 3-Level Selector */
        .selection-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.6rem;
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
          box-shadow: var(--shadow-sm);
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .filter-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .pill-group {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .choice-btn {
          padding: 0.55rem 1.1rem;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.88rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .choice-btn:hover {
          background: var(--bg-light);
          color: var(--heading-color);
        }

        .choice-btn.active {
          background: var(--primary);
          color: #ffffff;
          border-color: var(--primary);
        }

        .subject-pills {
          display: flex;
          gap: 0.65rem;
          flex-wrap: wrap;
        }

        .subject-btn {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.55rem 0.95rem;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text-primary);
          cursor: pointer;
          font-size: 0.86rem;
          transition: all 0.2s;
        }

        .subject-btn:hover {
          border-color: var(--primary);
          background: var(--bg-light);
        }

        .subject-btn.active {
          border-color: var(--primary);
          background: rgba(16, 185, 129, 0.08);
          color: var(--heading-color);
          font-weight: 600;
        }

        .sub-code {
          font-weight: 700;
          color: var(--primary);
          font-size: 0.8rem;
          background: rgba(16, 185, 129, 0.12);
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
        }

        .paper-badge {
          font-size: 0.7rem;
          font-weight: 700;
          background: #10b981;
          color: #ffffff;
          padding: 0.2rem 0.5rem;
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }

        .assessment-pills {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
        }

        .assessment-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.55rem 1.1rem;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text-primary);
          cursor: pointer;
          font-size: 0.88rem;
          transition: all 0.2s;
        }

        .assessment-btn.active {
          border-color: var(--primary);
          background: rgba(16, 185, 129, 0.08);
          font-weight: 700;
        }

        .status-live {
          color: #10b981;
          font-size: 0.76rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .status-live i {
          font-size: 0.55rem;
        }

        .status-upcoming {
          color: var(--text-muted);
          font-size: 0.76rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        /* Active Assessment View */
        .assessment-active-view {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .paper-header-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.8rem;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }

        .header-top-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .dept-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .inst-name {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--heading-color);
        }

        .school-dept {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .exam-status-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.85rem;
          border-radius: 20px;
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.25);
          font-size: 0.82rem;
          font-weight: 700;
        }

        .paper-title-area {
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 1rem 0;
        }

        .paper-subject-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--heading-color);
          margin: 0 0 0.3rem 0;
        }

        .paper-assessment-name {
          font-size: 1.05rem;
          color: var(--primary);
          font-weight: 600;
          margin: 0;
        }

        .paper-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
        }

        .stat-box {
          background: var(--bg-light);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 0.85rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .stat-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
          font-weight: 700;
        }

        .stat-val {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--heading-color);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .instructions-banner {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.25);
          color: #d97706;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.85rem;
        }

        /* Scanned Paper Card */
        .paper-scan-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.6rem;
          box-shadow: var(--shadow-sm);
        }

        .scan-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.2rem;
        }

        .scan-heading {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--heading-color);
          margin: 0 0 0.3rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .scan-subtext {
          font-size: 0.88rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .scan-actions {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
        }

        .btn-action {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid transparent;
        }

        .btn-preview {
          background: var(--primary);
          color: #ffffff;
        }

        .btn-preview:hover {
          filter: brightness(1.1);
        }

        .btn-download {
          background: var(--surface);
          border-color: var(--border);
          color: var(--text-primary);
        }

        .btn-download:hover {
          background: var(--bg-light);
          border-color: var(--primary);
        }

        .btn-outline {
          background: var(--surface);
          border-color: var(--border);
          color: var(--text-primary);
        }

        .scan-preview-wrapper {
          position: relative;
          width: 100%;
          max-height: 480px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border);
          cursor: pointer;
          display: flex;
          justify-content: center;
          background: #1e293b;
        }

        .scan-image {
          object-fit: contain;
          max-height: 480px;
          width: auto;
          transition: transform 0.3s;
        }

        .scan-preview-wrapper:hover .scan-image {
          transform: scale(1.02);
        }

        .scan-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          opacity: 0;
          transition: opacity 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .scan-preview-wrapper:hover .scan-overlay {
          opacity: 1;
        }

        .overlay-badge {
          background: rgba(16, 185, 129, 0.95);
          color: #ffffff;
          padding: 0.6rem 1.2rem;
          border-radius: 30px;
          font-size: 0.9rem;
          font-weight: 700;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Solutions Area */
        .solutions-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .solutions-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .solutions-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--heading-color);
          margin: 0 0 0.3rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .solutions-desc {
          color: var(--text-secondary);
          margin: 0;
          font-size: 0.9rem;
        }

        .question-filter-pills {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .q-filter-btn {
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .q-filter-btn:hover {
          background: var(--bg-light);
          color: var(--heading-color);
        }

        .q-filter-btn.active {
          background: var(--primary);
          color: #ffffff;
          border-color: var(--primary);
        }

        /* Question Stack */
        .questions-stack {
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
        }

        .question-solution-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: border-color 0.2s;
        }

        .question-solution-card:hover {
          border-color: var(--primary);
        }

        .question-card-top {
          padding: 1.5rem;
          background: var(--bg-light);
          border-bottom: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .q-badge-row {
          display: flex;
          gap: 0.6rem;
          align-items: center;
        }

        .q-number-badge {
          background: var(--primary);
          color: #ffffff;
          font-weight: 800;
          font-size: 0.85rem;
          padding: 0.2rem 0.7rem;
          border-radius: 6px;
        }

        .q-marks-badge {
          background: rgba(16, 185, 129, 0.12);
          color: var(--primary);
          border: 1px solid rgba(16, 185, 129, 0.25);
          font-weight: 700;
          font-size: 0.8rem;
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
        }

        .q-text {
          font-size: 1.05rem;
          line-height: 1.5;
          color: var(--heading-color);
          font-weight: 700;
          margin: 0;
        }

        .solution-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .sol-summary {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-primary);
        }

        .sol-label {
          font-weight: 800;
          color: var(--primary);
        }

        .section-subhead {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--heading-color);
          margin: 0 0 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .points-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .points-list li {
          font-size: 0.9rem;
          line-height: 1.55;
          color: var(--text-secondary);
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .point-bullet {
          color: var(--primary);
          font-weight: 800;
        }

        /* Code & Output Blocks */
        .sol-code-block,
        .sol-output-block {
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--border);
        }

        .code-header,
        .output-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 1rem;
          background: #1e293b;
          color: #94a3b8;
          font-size: 0.78rem;
          font-weight: 700;
        }

        .code-lang {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: #38bdf8;
        }

        .copy-btn {
          background: rgba(255, 255, 255, 0.1);
          color: #f1f5f9;
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 0.25rem 0.6rem;
          border-radius: 5px;
          cursor: pointer;
          font-size: 0.74rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          transition: all 0.2s;
        }

        .copy-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .code-content,
        .output-content {
          margin: 0;
          padding: 1rem 1.2rem;
          background: #0f172a;
          color: #e2e8f0;
          font-family:
            ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.85rem;
          line-height: 1.6;
          overflow-x: auto;
        }

        .output-header {
          background: #111827;
          color: #10b981;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .output-content {
          background: #030712;
          color: #a7f3d0;
        }

        /* Upcoming Placeholder */
        .upcoming-placeholder-card {
          background: var(--surface);
          border: 1px dashed var(--border);
          border-radius: 16px;
          padding: 3.5rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .upcoming-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.1);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
        }

        .upcoming-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--heading-color);
          margin: 0;
        }

        .upcoming-course {
          font-size: 1rem;
          font-weight: 700;
          color: var(--primary);
          margin: 0;
        }

        .upcoming-desc {
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0;
          line-height: 1.6;
        }

        .upcoming-units {
          width: 100%;
          max-width: 750px;
          background: var(--bg-light);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.2rem 1.5rem;
          text-align: left;
          margin-top: 1rem;
        }

        .units-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--heading-color);
          margin: 0 0 0.8rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .units-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 0.6rem;
        }

        .unit-item {
          font-size: 0.85rem;
          color: var(--text-secondary);
          display: flex;
          align-items: baseline;
          gap: 0.4rem;
        }

        .unit-dot {
          color: var(--primary);
          font-weight: 700;
        }

        .upcoming-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .empty-assessments-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 3rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .empty-icon {
          font-size: 2.5rem;
          color: var(--text-muted);
        }

        /* Lightbox Modal */
        .lightbox-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(6px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .lightbox-dialog {
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 16px;
          max-width: 1200px;
          width: 100%;
          max-height: 94vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
        }

        .lightbox-toolbar {
          padding: 0.85rem 1.4rem;
          background: #1e293b;
          border-bottom: 1px solid #334155;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .lightbox-title {
          color: #f8fafc;
          font-weight: 700;
          font-size: 0.95rem;
        }

        .lightbox-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .ctrl-btn {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.2s;
        }

        .ctrl-btn:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        .ctrl-btn.close-btn {
          background: #ef4444;
          border-color: #dc2626;
        }

        .ctrl-btn.close-btn:hover {
          background: #dc2626;
        }

        .zoom-indicator {
          color: #94a3b8;
          font-size: 0.8rem;
          font-weight: 700;
          min-width: 45px;
          text-align: center;
        }

        .lightbox-image-viewport {
          flex: 1;
          overflow: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          background: #020617;
        }

        .zoomable-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-img {
          max-width: 100%;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 6px;
        }

        @media (max-width: 768px) {
          .content-wrapper {
            padding: 1rem;
          }
          .hub-title {
            font-size: 1.45rem;
          }
          .header-top-row {
            flex-direction: column;
          }
          .scan-card-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .scan-actions {
            width: 100%;
          }
          .btn-action {
            flex: 1;
            justify-content: center;
          }
          .solutions-header-bar {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}

export default function CurajAssessmentsPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: "3rem", textAlign: "center" }}>
          Loading Continuous Assessments Portal...
        </div>
      }
    >
      <AssessmentsContent />
    </Suspense>
  );
}
