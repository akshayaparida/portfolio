"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BlogPageHeader from "@/components/BlogPageHeader";
import PageFooter from "@/components/PageFooter";

export default function ProfessionalCommunicationPage() {
  const [activeTab, setActiveTab] = useState<
    "syllabus" | "cia" | "nptel" | "books"
  >("syllabus");
  const [expandedUnit, setExpandedUnit] = useState<number | null>(null);

  const syllabusUnits = [
    {
      unitNumber: 1,
      title: "Grammar and Vocabulary",
      subtitle: "Syntactic Foundations & Word Mechanics",
      icon: "fa-solid fa-spell-check",
      topics: [
        "Tenses (Present, Past, Future — Simple, Continuous, Perfect, Perfect Continuous)",
        "Subject-Verb Agreement (Singular/Plural concord, compound subjects, collective nouns)",
        "Sentence Analysis: Simple, Compound, and Complex sentences",
        "Phrases: Adjective Phrase, Adverb Phrase, and Noun Phrase structure & usage",
        "Clauses: Noun Clause, Adjective (Relative) Clause, and Adverbial Clause analysis",
        "Active & Passive Voice transformation in technical and formal contexts",
        "Direct & Indirect Narration (Reported Speech conventions)",
        "Non-Finite Verbs: Gerunds, Infinitives, and Participles (Present, Past, Perfect)",
      ],
      examRelevance: "Assignment 01 (Q2 Phrases) & Assignment 02 (Q1 Clauses)",
    },
    {
      unitNumber: 2,
      title: "Oral Communication",
      subtitle: "Spoken Fluency, Phonetics & Dialogue Delivery",
      icon: "fa-solid fa-microphone-lines",
      topics: [
        "Fundamentals of Spoken English & Oral Interaction",
        "Phonetics, Articulation, and Consonant/Vowel Sound Clarification",
        "Intonation, Rhythm, and Sentence Melody in Formal Contexts",
        "Conversational Exchanges, Small Talk & Professional Dialogue Delivery",
        "Overcoming Pronunciation Inhibitions and Regional Accents (MTI Remediation)",
      ],
      examRelevance: "Oral Viva Voce & Laboratory Speaking Assessments",
    },
    {
      unitNumber: 3,
      title: "Listening & Speaking Skills",
      subtitle: "Active Aural Reception & Speech Execution",
      icon: "fa-solid fa-ear-listen",
      topics: [
        "Active Listening: Definition, Concept & Cognitive Processing Stages",
        "Barriers to Active Listening (Physical, Psychological, Semantic, Physiological)",
        "Speaking Skills: Stress Patterns in English (Word Stress & Sentence Stress)",
        "Questioning Skills: Open-ended, Probing, and Reflective Questioning Techniques",
        "Barriers in Speaking: Psychological (Glossophobia), Linguistic, Physiological & Environmental",
        "Actionable Remedial Strategies for Confident Speech Delivery",
      ],
      examRelevance:
        "Assignment 01 (Q5 Active Listening) & Assignment 02 (Q2 Speaking Barriers)",
    },
    {
      unitNumber: 4,
      title: "Reading Skills",
      subtitle: "Comprehension, Speed Reading & Discourse Analysis",
      icon: "fa-solid fa-book-open-reader",
      topics: [
        "Reading Strategies: Skimming (Gist acquisition) and Scanning (Specific data retrieval)",
        "Intensive Reading & Deep Technical Comprehension",
        "Cohesive Linking Devices in a Text (Conjunctions, Transitional markers, Anaphoric references)",
        "Discourse Analysis: Evaluating Different Versions of a Story or Incident",
        "Critical Reading: Fact vs. Opinion, Authorial Tone, and Implicit Inferences",
      ],
      examRelevance: "Reading Comprehension & Critical Analysis",
    },
    {
      unitNumber: 5,
      title: "Written Communication",
      subtitle: "Technical Writing, Paragraphs & Scientific Reports",
      icon: "fa-solid fa-pen-fancy",
      topics: [
        "The Writing Process: Pre-writing (Brainstorming), Drafting, Revising, Editing & Proofreading",
        "Paragraph Organization: Topic Sentence, Supporting Details, Cohesion & Clincher Transition",
        "Principles of Paragraph Writing: Unity, Coherence, Logical Order, and Completeness",
        "Writing Styles: Expository, Descriptive, Persuasive, and Narrative Writing",
        "Technical vs. Creative Writing: Contrasts in purpose, diction, audience, and objectivity",
        "Types of Technical Writing: System specifications, manuals, whitepapers, executive briefs",
        "Scientific Writing: Standard Format of a Scientific & Technical Report (Front Matter to Appendices)",
      ],
      examRelevance:
        "Assignment 01 (Q1 Report Format, Q4 Creative Writing) & Assignment 02 (Q3 Paragraphs, Q4 Writing Skills)",
    },
    {
      unitNumber: 6,
      title: "Soft Skills & Career Readiness",
      subtitle: "Body Language, GD, Presentations, Resumes & Interviews",
      icon: "fa-solid fa-user-tie",
      topics: [
        "Body Language & Kinesics: Gesture, Posture, Facial Expression, Eye Contact, Proxemics",
        "Group Discussion (GD): Dynamics, Roles (Initiator, Moderator, Summarizer), Do's & Don'ts",
        "GD Techniques: PREP Technique (Point, Reason, Example, Point) & REP Technique",
        "Presentation Skills: (i) PowerPoint slide architecture (Rule of 6x6) & (ii) Stage presence",
        "Resume Writing: Cover letters, Career Objective vs Summary, Tailor-made ATS resumes",
        "Interview Skills: Behavioral questions, Stress Management, Answering methodologies (STAR)",
      ],
      examRelevance:
        "Assignment 01 (Q3 Group Discussion) & Assignment 02 (Q5 Presentation Preparation)",
    },
  ];

  const referenceBooks = [
    {
      title: "Advanced English Usage",
      authors: "Quirk, Randolph & Greenbaum, Sidney",
      publisher: "Pearson Education",
      category: "Grammar & Syntax",
    },
    {
      title: "Developing Communication Skills",
      authors: "Banerjee, Meera & Mohan, Krishna",
      publisher: "Macmillan Publications, 1990",
      category: "Oral & Written Skills",
    },
    {
      title: "Business Communication",
      authors: "Chaturvedi, P.D. & Chaturvedi, Mukesh",
      publisher: "Pearson Publications",
      category: "Corporate Communication",
    },
    {
      title: "Business Communication",
      authors: "Mathew, M.J.",
      publisher: "RBSA Publications, 2005",
      category: "Business Correspondence",
    },
    {
      title: "Communication for Business",
      authors: "Taylor, Shirley",
      publisher: "Pearson Publications",
      category: "Executive Writing",
    },
    {
      title: "Soft Skills: Enhancing Employability",
      authors: "ICFAI University Press",
      publisher: "ICFAI Publication",
      category: "Soft Skills & Placement",
    },
    {
      title: "High School English Grammar and Composition",
      authors: "Wren, P.C. & Martin, H.",
      publisher: "S. Chand Publishing",
      category: "Foundational Grammar",
    },
    {
      title: "English Grammar in Use (4th Edition)",
      authors: "Murphy, Raymond",
      publisher: "Cambridge University Press",
      category: "Practical Usage",
    },
    {
      title: "Advanced Grammar in Use",
      authors: "Hewings, Martin",
      publisher: "Cambridge University Press",
      category: "Advanced Syntax",
    },
    {
      title: "Understanding and Using English Grammar",
      authors: "Schrampfer, Betty",
      publisher: "Pearson Education",
      category: "Sentence Mechanics",
    },
    {
      title: "Collins English Dictionary and Thesaurus",
      authors: "HarperCollins Editorial Board",
      publisher: "HarperCollins Publishers & Times",
      category: "Lexicon & Vocabulary",
    },
    {
      title: "Longman Dictionary of Contemporary English",
      authors: "Longman Editorial Team",
      publisher: "Pearson Longman",
      category: "Lexicon & Collocations",
    },
  ];

  const nptelCourses = [
    {
      title: "Professional Communication",
      instructor: "Prof. Binod Mishra",
      institution: "IIT Roorkee",
      duration: "12 Weeks",
      link: "https://onlinecourses.nptel.ac.in/noc24_hs127/preview",
      topics: [
        "Communication Process & Barriers",
        "Verbal & Non-Verbal Communication",
        "Business Writing & Correspondence",
        "Presentation & Interview Skills",
      ],
    },
    {
      title: "Enhancing Soft Skills & Personality",
      instructor: "Prof. T. Ravichandran",
      institution: "IIT Kanpur",
      duration: "8 Weeks",
      link: "https://onlinecourses.nptel.ac.in/noc24_hs128/preview",
      topics: [
        "Self-Awareness & Personality Development",
        "Emotional Intelligence",
        "Interpersonal & Leadership Skills",
        "Time & Conflict Management",
      ],
    },
    {
      title: "Technical English for Engineers",
      instructor: "Prof. Aysha Iqbal",
      institution: "IIT Madras",
      duration: "8 Weeks",
      link: "https://onlinecourses.nptel.ac.in/noc24_hs129/preview",
      topics: [
        "Grammar & Sentence Structure",
        "Technical Vocabulary Building",
        "Academic & Technical Writing",
        "Describing Processes & Mechanisms",
      ],
    },
    {
      title: "Effective Business Communication",
      instructor: "Prof. Uttam Kr. Sarkar",
      institution: "IIT Kharagpur",
      duration: "12 Weeks",
      link: "https://onlinecourses.nptel.ac.in/noc24_mg85/preview",
      topics: [
        "Business Communication Fundamentals",
        "Persuasive Communication & Pitching",
        "Negotiation & Meeting Skills",
        "Corporate Communication Strategy",
      ],
    },
  ];

  return (
    <div className="page-container">
      <BlogPageHeader
        title="Professional Communication (CSC-406 / 6.0CSC04)"
        backLink="/curaj-msc-cs"
        backTitle="CURAJ Curriculum"
      />

      <main className="content-wrapper">
        {/* Course Hero Card */}
        <section className="course-hero-card">
          <div className="hero-top-row">
            <div className="hero-badges">
              <span className="badge code">Course: CSC-406 / 6.0CSC04</span>
              <span className="badge category">AEC • Semester I</span>
              <span className="badge credits">2 Credits</span>
              <span className="badge univ">CURAJ M.Sc. Computer Science</span>
            </div>
            <Link
              href="/curaj-msc-cs/assessments?course=6.0CSC04&id=sem1-comm-cia1"
              className="cia-quick-link"
            >
              <i className="fa-solid fa-file-circle-check"></i>
              <span>CIA-1 & CIA-2 Verified Solutions</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>

          <h1 className="hero-title">
            <i className="fa-solid fa-comments-dollar"></i> Professional
            Communication
          </h1>
          <p className="hero-subtitle">
            School of Mathematics, Statistics & Computational Sciences —
            Department of Computer Science, Central University of Rajasthan
          </p>

          <div className="outline-box">
            <div className="outline-header">
              <i className="fa-solid fa-compass"></i>
              <strong>Course Outline & Industry Rationale:</strong>
            </div>
            <p>
              The course has been designed keeping in mind the communicative
              needs of the students, as lack of proficiency and fluency of
              students is one of the major barriers in getting employment in the
              competitive software and technical job market.
            </p>
          </div>

          <div className="objectives-grid">
            <div className="obj-card">
              <i className="fa-solid fa-bullhorn"></i>
              <div>
                <strong>Fluency in Speaking</strong>
                <p>
                  Make students proficient and articulate in spoken English
                  across formal settings.
                </p>
              </div>
            </div>
            <div className="obj-card">
              <i className="fa-solid fa-brain"></i>
              <div>
                <strong>Aural & Textual Comprehension</strong>
                <p>
                  Enable rigorous comprehension of spoken technical discourses
                  and complex written texts.
                </p>
              </div>
            </div>
            <div className="obj-card">
              <i className="fa-solid fa-gauge-high"></i>
              <div>
                <strong>Fast Reading Skills</strong>
                <p>
                  Equip students with skimming, scanning, and intensive
                  analytical speed-reading.
                </p>
              </div>
            </div>
            <div className="obj-card">
              <i className="fa-solid fa-envelope-open-text"></i>
              <div>
                <strong>Effective Correspondence</strong>
                <p>
                  Empower students to craft clear reports, technical memos,
                  resumes, and business letters.
                </p>
              </div>
            </div>
            <div className="obj-card full-width">
              <i className="fa-solid fa-spell-check"></i>
              <div>
                <strong>Enhanced Vocabulary & Lexical Precision</strong>
                <p>
                  Broaden active technical, corporate, and idiomatic vocabulary
                  for career placement readiness.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="tab-bar">
          <button
            className={`tab-btn ${activeTab === "syllabus" ? "active" : ""}`}
            onClick={() => setActiveTab("syllabus")}
          >
            <i className="fa-solid fa-list-check"></i>
            <span>6-Unit Syllabus Breakdown</span>
          </button>
          <button
            className={`tab-btn ${activeTab === "cia" ? "active" : ""}`}
            onClick={() => setActiveTab("cia")}
          >
            <i className="fa-solid fa-file-invoice"></i>
            <span>CIA Assessment Paper & Solutions</span>
            <span className="tab-pill">pccia2025</span>
          </button>
          <button
            className={`tab-btn ${activeTab === "books" ? "active" : ""}`}
            onClick={() => setActiveTab("books")}
          >
            <i className="fa-solid fa-book"></i>
            <span>Prescribed Reference Books (15)</span>
          </button>
          <button
            className={`tab-btn ${activeTab === "nptel" ? "active" : ""}`}
            onClick={() => setActiveTab("nptel")}
          >
            <i className="fa-solid fa-graduation-cap"></i>
            <span>Curated NPTEL Courses</span>
          </button>
        </div>

        {/* TAB 1: SYLLABUS BREAKDOWN */}
        {activeTab === "syllabus" && (
          <section className="tab-content-section">
            <div className="section-header-row">
              <div>
                <h2 className="section-title">
                  <i className="fa-solid fa-layer-group"></i> Official CURAJ
                  6-Unit Curriculum Structure
                </h2>
                <p className="section-desc">
                  Detailed syllabus topics strictly aligned with university exam
                  regulations and continuous internal evaluation.
                </p>
              </div>
            </div>

            <div className="units-container">
              {syllabusUnits.map((u) => {
                const isExpanded = expandedUnit === u.unitNumber;
                return (
                  <div
                    key={u.unitNumber}
                    className={`unit-card ${isExpanded ? "expanded" : ""}`}
                  >
                    <div
                      className="unit-header"
                      onClick={() =>
                        setExpandedUnit(isExpanded ? null : u.unitNumber)
                      }
                    >
                      <div className="unit-header-left">
                        <span className="unit-number-pill">
                          UNIT {u.unitNumber}
                        </span>
                        <div>
                          <h3 className="unit-title">
                            <i className={u.icon}></i> {u.title}
                          </h3>
                          <span className="unit-subtitle">{u.subtitle}</span>
                        </div>
                      </div>
                      <div className="unit-header-right">
                        <span className="exam-tag">
                          <i className="fa-solid fa-circle-check"></i>{" "}
                          {u.examRelevance}
                        </span>
                        <i
                          className={`fa-solid fa-chevron-down toggle-icon ${
                            isExpanded ? "open" : ""
                          }`}
                        ></i>
                      </div>
                    </div>

                    <div className="unit-body">
                      <h4 className="topics-heading">
                        <i className="fa-solid fa-list-ul"></i> Prescribed
                        Syllabus Topics:
                      </h4>
                      <ul className="topics-list">
                        {u.topics.map((t, idx) => (
                          <li key={idx}>
                            <i className="fa-solid fa-check-circle"></i>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Learning Outcomes Banner */}
            <div className="outcomes-card">
              <div className="outcomes-header">
                <i className="fa-solid fa-award"></i>
                <h3>Official Learning Outcomes</h3>
              </div>
              <p>
                After completion of the course students will become fluent
                speakers. Not only this, they will be able to comprehend the
                spoken and the written word in a better way. With enhanced
                vocabulary they will become confident users of English and be
                more market-ready to get a job in top IT and research firms.
              </p>
            </div>
          </section>
        )}

        {/* TAB 2: CIA ASSESSMENT & QUESTION PAPER */}
        {activeTab === "cia" && (
          <section className="tab-content-section">
            <div className="cia-showcase-card">
              <div className="cia-showcase-header">
                <div>
                  <span className="badge available-badge">
                    <i className="fa-solid fa-circle-check"></i> Question Paper
                    & Model Answers Available
                  </span>
                  <h2 className="cia-showcase-title">
                    <i className="fa-solid fa-file-invoice"></i> Continuous
                    Internal Assessment: Assignment 01 & 02
                  </h2>
                  <p className="cia-showcase-desc">
                    Official internal assessment question sheet (Course Code:
                    6.0 ODLCSC04 / 6.0CSC04) with comprehensive 300-400 word
                    verified model solutions for every question.
                  </p>
                </div>

                <div className="cia-action-buttons">
                  <Link
                    href="/curaj-msc-cs/assessments?course=6.0CSC04&id=sem1-comm-cia1"
                    className="btn-primary"
                  >
                    <i className="fa-solid fa-book-open"></i>
                    <span>Study Assignment 01 Solutions</span>
                  </Link>
                  <Link
                    href="/curaj-msc-cs/assessments?course=6.0CSC04&id=sem1-comm-cia2"
                    className="btn-secondary"
                  >
                    <i className="fa-solid fa-book-open"></i>
                    <span>Study Assignment 02 Solutions</span>
                  </Link>
                  <a
                    href="/pccia2025.png"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    <span>Open High-Res Sheet</span>
                  </a>
                </div>
              </div>

              {/* Scanned Image Preview */}
              <div className="paper-preview-container">
                <div className="paper-preview-header">
                  <span>
                    <i className="fa-solid fa-image"></i> Scanned Assessment
                    Sheet (public/pccia2025.png)
                  </span>
                  <a
                    href="/pccia2025.png"
                    download="CURAJ-Professional-Communication-CIA.png"
                    className="download-link"
                  >
                    <i className="fa-solid fa-download"></i> Download PNG
                  </a>
                </div>
                <div className="image-wrapper">
                  <Image
                    src="/pccia2025.png"
                    alt="CURAJ Professional Communication Assignment Question Paper"
                    width={900}
                    height={700}
                    className="paper-image"
                    priority
                  />
                </div>
              </div>

              {/* Questions Overview Table */}
              <div className="assignments-dual-grid">
                <div className="assignment-box">
                  <div className="assignment-header">
                    <h4>Assignment: 01 (Max Marks: 15)</h4>
                    <span className="criteria-pill">
                      Attempt any 3 • 300-400 words
                    </span>
                  </div>
                  <ul className="assignment-q-list">
                    <li>
                      <span className="q-badge">Q.01</span>
                      <div>
                        <strong>Report Writing Format:</strong>
                        <p>
                          Format of a formal report with structural components
                          and a concrete technical report example.
                        </p>
                      </div>
                    </li>
                    <li>
                      <span className="q-badge">Q.02</span>
                      <div>
                        <strong>Phrase & Its Types:</strong>
                        <p>
                          Definition of phrases, structural difference from
                          clauses, and 5 major types (Noun, Verb, Adj, Adv,
                          Prep).
                        </p>
                      </div>
                    </li>
                    <li>
                      <span className="q-badge">Q.03</span>
                      <div>
                        <strong>Group Discussion Techniques:</strong>
                        <p>
                          Dynamics of GD, non-verbal indicators, and application
                          of the PREP and REP techniques.
                        </p>
                      </div>
                    </li>
                    <li>
                      <span className="q-badge">Q.04</span>
                      <div>
                        <strong>Creative Writing:</strong>
                        <p>
                          Definition, distinction from technical writing, and 5
                          essential literary qualities.
                        </p>
                      </div>
                    </li>
                    <li>
                      <span className="q-badge">Q.05</span>
                      <div>
                        <strong>Active Listening & Barriers:</strong>
                        <p>
                          5-stage active listening model and comprehensive
                          barriers (physical, psychological, semantic,
                          physiological).
                        </p>
                      </div>
                    </li>
                  </ul>
                  <Link
                    href="/curaj-msc-cs/assessments?course=6.0CSC04&id=sem1-comm-cia1"
                    className="view-solutions-btn"
                  >
                    <span>View All 5 Full Model Solutions</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>

                <div className="assignment-box">
                  <div className="assignment-header">
                    <h4>Assignment: 02 (Max Marks: 15)</h4>
                    <span className="criteria-pill">
                      Attempt any 3 • 300-400 words
                    </span>
                  </div>
                  <ul className="assignment-q-list">
                    <li>
                      <span className="q-badge">Q.01</span>
                      <div>
                        <strong>Clause & Its Types:</strong>
                        <p>
                          Syntactic definition of clause; Independent vs
                          Dependent (Noun, Adjective, Adverbial clauses) with
                          examples.
                        </p>
                      </div>
                    </li>
                    <li>
                      <span className="q-badge">Q.02</span>
                      <div>
                        <strong>Barriers of Speaking:</strong>
                        <p>
                          Psychological glossophobia, Mother Tongue Influence
                          (MTI), physiological constraints & remedies.
                        </p>
                      </div>
                    </li>
                    <li>
                      <span className="q-badge">Q.03</span>
                      <div>
                        <strong>Paragraph Writing Principles:</strong>
                        <p>
                          Topic sentence, supporting elaboration, clincher, and
                          principles: Unity, Coherence, Order, and Completeness.
                        </p>
                      </div>
                    </li>
                    <li>
                      <span className="q-badge">Q.04</span>
                      <div>
                        <strong>Writing Skills Taxonomy:</strong>
                        <p>
                          Writing stages (Pre-writing, drafting, editing) and 5
                          major modes: Expository, Descriptive, Persuasive,
                          Narrative, Technical.
                        </p>
                      </div>
                    </li>
                    <li>
                      <span className="q-badge">Q.05</span>
                      <div>
                        <strong>Planning Successful Presentations:</strong>
                        <p>
                          Audience analysis, the 3-act structure, Rule of 6x6
                          slide design, vocal pacing, and Q&A management.
                        </p>
                      </div>
                    </li>
                  </ul>
                  <Link
                    href="/curaj-msc-cs/assessments?course=6.0CSC04&id=sem1-comm-cia2"
                    className="view-solutions-btn"
                  >
                    <span>View All 5 Full Model Solutions</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 3: REFERENCE BOOKS */}
        {activeTab === "books" && (
          <section className="tab-content-section">
            <div className="section-header-row">
              <div>
                <h2 className="section-title">
                  <i className="fa-solid fa-book-bookmark"></i> Prescribed
                  Reference Books & Dictionaries
                </h2>
                <p className="section-desc">
                  Official textbook references prescribed in the CURAJ CSC-406
                  syllabus for grammar, corporate communication, and vocabulary
                  building.
                </p>
              </div>
            </div>

            <div className="books-grid">
              {referenceBooks.map((b, idx) => (
                <div key={idx} className="book-card">
                  <div className="book-top">
                    <span className="book-category">{b.category}</span>
                    <span className="book-num">#{idx + 1}</span>
                  </div>
                  <h3 className="book-title">{b.title}</h3>
                  <p className="book-author">
                    <i className="fa-solid fa-feather-pointed"></i> {b.authors}
                  </p>
                  <p className="book-publisher">
                    <i className="fa-solid fa-building"></i> {b.publisher}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 4: NPTEL COURSES */}
        {activeTab === "nptel" && (
          <section className="tab-content-section">
            <div className="section-header-row">
              <div>
                <h2 className="section-title">
                  <i className="fa-solid fa-graduation-cap"></i> Curated NPTEL
                  Certification Courses
                </h2>
                <p className="section-desc">
                  Curated semester-aligned video lectures and certification
                  courses delivered by top IIT faculty.
                </p>
              </div>
            </div>

            <div className="nptel-grid">
              {nptelCourses.map((course, idx) => (
                <div key={idx} className="nptel-card">
                  <div className="nptel-card-top">
                    <div className="nptel-meta-row">
                      <span className="nptel-badge-inst">
                        <i className="fa-solid fa-building-columns"></i>{" "}
                        {course.institution}
                      </span>
                      <span className="nptel-badge-weeks">
                        <i className="fa-solid fa-clock"></i> {course.duration}
                      </span>
                    </div>
                    <h3 className="nptel-course-title">{course.title}</h3>
                    <p className="nptel-instructor-name">
                      <i className="fa-solid fa-user-tie"></i>{" "}
                      {course.instructor}
                    </p>
                    <ul className="nptel-topics-list">
                      {course.topics.map((topic, tIdx) => (
                        <li key={tIdx}>
                          <i className="fa-solid fa-check"></i> {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nptel-link-btn"
                  >
                    <span>View Course on NPTEL</span>
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <PageFooter
        moduleName="Professional Communication"
        issueLabel="communication"
      />

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
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          box-sizing: border-box;
          flex: 1;
        }

        /* Hero Card */
        .course-hero-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .hero-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .hero-badges {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .badge {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }

        .badge.code {
          color: #059669;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.25);
        }

        .badge.category {
          color: #3b82f6;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .badge.credits {
          color: #8b5cf6;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.2);
        }

        .badge.univ {
          color: #d97706;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.2);
        }

        .cia-quick-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.825rem;
          font-weight: 700;
          color: #059669;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.25);
          padding: 0.4rem 0.85rem;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .cia-quick-link:hover {
          background: rgba(16, 185, 129, 0.18);
          transform: translateY(-1px);
        }

        .hero-title {
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--heading-color);
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          letter-spacing: -0.02em;
        }

        .hero-title i {
          color: #10b981;
        }

        .hero-subtitle {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin: -0.5rem 0 0 0;
          line-height: 1.5;
        }

        .outline-box {
          background: rgba(16, 185, 129, 0.04);
          border-left: 4px solid #10b981;
          padding: 1rem 1.25rem;
          border-radius: 0 10px 10px 0;
        }

        .outline-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #059669;
          font-size: 0.9rem;
          margin-bottom: 0.35rem;
        }

        .outline-box p {
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--text-primary);
        }

        .objectives-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .obj-card {
          background: var(--bg-light);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 1rem;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .obj-card.full-width {
          grid-column: 1 / -1;
        }

        .obj-card i {
          color: #10b981;
          font-size: 1.1rem;
          margin-top: 0.15rem;
          flex-shrink: 0;
        }

        .obj-card strong {
          display: block;
          font-size: 0.875rem;
          color: var(--heading-color);
          margin-bottom: 0.2rem;
        }

        .obj-card p {
          margin: 0;
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        /* Tab Navigation Bar */
        .tab-bar {
          display: flex;
          gap: 0.5rem;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 0.4rem;
          border-radius: 12px;
          overflow-x: auto;
        }

        .tab-btn {
          flex: 1;
          min-width: 170px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          background: transparent;
          color: var(--text-secondary);
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .tab-btn:hover {
          color: var(--heading-color);
          background: var(--bg-light);
        }

        .tab-btn.active {
          color: #ffffff;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
        }

        .tab-pill {
          font-size: 0.7rem;
          background: rgba(255, 255, 255, 0.25);
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }

        /* Tab Content Section */
        .tab-content-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .section-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .section-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--heading-color);
          margin: 0 0 0.35rem 0;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .section-title i {
          color: #10b981;
        }

        .section-desc {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
        }

        /* Units Accordion */
        .units-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .unit-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .unit-card:hover {
          border-color: #10b981;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
        }

        .unit-header {
          padding: 1.25rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          user-select: none;
          gap: 1rem;
        }

        .unit-header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .unit-number-pill {
          font-size: 0.72rem;
          font-weight: 800;
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
          border: 1px solid rgba(16, 185, 129, 0.2);
          padding: 0.3rem 0.6rem;
          border-radius: 6px;
          white-space: nowrap;
        }

        .unit-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--heading-color);
          margin: 0 0 0.15rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .unit-title i {
          color: #10b981;
        }

        .unit-subtitle {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .unit-header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .exam-tag {
          font-size: 0.75rem;
          font-weight: 600;
          color: #3b82f6;
          background: rgba(59, 130, 246, 0.08);
          border: 1px solid rgba(59, 130, 246, 0.2);
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .toggle-icon {
          color: var(--text-muted);
          transition: transform 0.2s ease;
        }

        .toggle-icon.open {
          transform: rotate(180deg);
        }

        .unit-body {
          padding: 0 1.5rem 1.25rem 1.5rem;
          border-top: 1px solid var(--border);
          background: var(--bg-light);
          margin-top: 0.25rem;
        }

        .unit-card:not(.expanded) .unit-body {
          display: none;
        }

        .topics-heading {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--heading-color);
          margin: 1rem 0 0.75rem 0;
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .topics-heading i {
          color: #10b981;
        }

        .topics-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 0.6rem;
        }

        .topics-list li {
          font-size: 0.825rem;
          color: var(--text-primary);
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          line-height: 1.45;
        }

        .topics-list li i {
          color: #10b981;
          font-size: 0.75rem;
          margin-top: 0.2rem;
          flex-shrink: 0;
        }

        /* Outcomes Card */
        .outcomes-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-left: 4px solid #3b82f6;
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
        }

        .outcomes-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #3b82f6;
          margin-bottom: 0.4rem;
        }

        .outcomes-header h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 700;
        }

        .outcomes-card p {
          margin: 0;
          font-size: 0.875rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        /* CIA Showcase */
        .cia-showcase-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .cia-showcase-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1.25rem;
        }

        .available-badge {
          color: #059669;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          margin-bottom: 0.5rem;
          display: inline-block;
        }

        .cia-showcase-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--heading-color);
          margin: 0 0 0.4rem 0;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .cia-showcase-title i {
          color: #10b981;
        }

        .cia-showcase-desc {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.55;
          max-width: 650px;
        }

        .cia-action-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.1rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.85rem;
          border-radius: 8px;
          text-decoration: none;
          transition: transform 0.15s ease;
        }

        .btn-primary:hover {
          transform: translateY(-1px);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.1rem;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.85rem;
          border-radius: 8px;
          text-decoration: none;
          transition: transform 0.15s ease;
        }

        .btn-secondary:hover {
          transform: translateY(-1px);
        }

        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.1rem;
          background: var(--bg-light);
          border: 1px solid var(--border);
          color: var(--text-primary);
          font-weight: 600;
          font-size: 0.85rem;
          border-radius: 8px;
          text-decoration: none;
        }

        .paper-preview-container {
          background: var(--bg-light);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1rem;
        }

        .paper-preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.825rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
        }

        .download-link {
          color: #059669;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-weight: 700;
        }

        .image-wrapper {
          display: flex;
          justify-content: center;
          background: #ffffff;
          border-radius: 8px;
          padding: 1rem;
          border: 1px solid var(--border);
        }

        .paper-image {
          max-width: 100%;
          height: auto;
          object-fit: contain;
          border-radius: 4px;
        }

        .assignments-dual-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 1.5rem;
        }

        .assignment-box {
          background: var(--bg-light);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .assignment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border);
          padding-bottom: 0.75rem;
        }

        .assignment-header h4 {
          margin: 0;
          font-size: 1rem;
          font-weight: 800;
          color: var(--heading-color);
        }

        .criteria-pill {
          font-size: 0.7rem;
          font-weight: 600;
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }

        .assignment-q-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .assignment-q-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
        }

        .q-badge {
          font-size: 0.72rem;
          font-weight: 800;
          background: var(--surface);
          border: 1px solid var(--border);
          color: #10b981;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        .assignment-q-list strong {
          display: block;
          font-size: 0.85rem;
          color: var(--heading-color);
          margin-bottom: 0.15rem;
        }

        .assignment-q-list p {
          margin: 0;
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .view-solutions-btn {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 0.85rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          text-decoration: none;
          font-size: 0.825rem;
          font-weight: 700;
          color: #059669;
          transition: all 0.2s ease;
        }

        .view-solutions-btn:hover {
          border-color: #10b981;
          background: rgba(16, 185, 129, 0.05);
        }

        /* Books Grid */
        .books-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        .book-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          transition:
            transform 0.2s ease,
            border-color 0.2s ease;
        }

        .book-card:hover {
          border-color: #10b981;
          transform: translateY(-2px);
        }

        .book-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .book-category {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #059669;
          background: rgba(16, 185, 129, 0.08);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }

        .book-num {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 700;
        }

        .book-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--heading-color);
          margin: 0.2rem 0;
          line-height: 1.35;
        }

        .book-author,
        .book-publisher {
          margin: 0;
          font-size: 0.8rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .book-author i,
        .book-publisher i {
          color: #10b981;
          font-size: 0.75rem;
        }

        /* NPTEL Grid */
        .nptel-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.25rem;
        }

        .nptel-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            border-color 0.2s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .nptel-card:hover {
          border-color: #10b981;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
        }

        .nptel-card-top {
          display: flex;
          flex-direction: column;
        }

        .nptel-meta-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.6rem;
          flex-wrap: wrap;
        }

        .nptel-badge-inst {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: var(--bg-light);
          border: 1px solid var(--border);
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .nptel-badge-inst i {
          color: #10b981;
        }

        .nptel-badge-weeks {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-muted);
          background: var(--bg-light);
          border: 1px solid var(--border);
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }

        .nptel-course-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--heading-color);
          margin: 0.25rem 0 0.35rem 0;
          line-height: 1.35;
        }

        .nptel-instructor-name {
          font-size: 0.825rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin: 0 0 0.75rem 0;
        }

        .nptel-topics-list {
          list-style: none;
          padding: 0;
          margin: 0 0 1.25rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .nptel-topics-list li {
          font-size: 0.825rem;
          color: var(--text-primary);
          display: flex;
          align-items: flex-start;
          gap: 0.45rem;
          line-height: 1.4;
        }

        .nptel-topics-list li i {
          color: #10b981;
          font-size: 0.7rem;
          margin-top: 0.2rem;
          flex-shrink: 0;
        }

        .nptel-link-btn {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 1rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.825rem;
          transition:
            filter 0.2s,
            transform 0.15s;
        }

        .nptel-link-btn:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .content-wrapper {
            padding: 1.25rem 1rem;
          }
          .hero-title {
            font-size: 1.5rem;
          }
          .assignments-dual-grid {
            grid-template-columns: 1fr;
          }
          .tab-btn {
            min-width: 140px;
            font-size: 0.78rem;
          }
        }
      `}</style>
    </div>
  );
}
