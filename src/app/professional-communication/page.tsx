"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BlogPageHeader from "@/components/BlogPageHeader";
import PageFooter from "@/components/PageFooter";
import { curajAssessments } from "@/data/curaj-msc-cs/assessments";

export default function ProfessionalCommunicationPage() {
  const [activeTab, setActiveTab] = useState<
    "predicted" | "syllabus" | "cia" | "nptel" | "books"
  >("predicted");
  const [expandedAnswerId, setExpandedAnswerId] = useState<string | null>(
    "comm-pred-q1",
  );
  const [predictedFilter, setPredictedFilter] = useState<
    "all" | "core" | "backup"
  >("all");

  const predictedAssessment = curajAssessments.find(
    (a) => a.id === "sem1-comm-predicted-cia1",
  );
  const predictedQuestions = predictedAssessment?.questions || [];
  const [expandedUnit, setExpandedUnit] = useState<number | null>(null);
  const [allUnitsExpanded, setAllUnitsExpanded] = useState(false);
  const [openVideoQuestionId, setOpenVideoQuestionId] = useState<string | null>(
    null,
  );
  const [showPaperSheet, setShowPaperSheet] = useState(false);
  const [assignmentFilter, setAssignmentFilter] = useState<"all" | "a1" | "a2">(
    "all",
  );

  const questionVideos: Record<
    string,
    {
      id: string;
      title: string;
      channel: string;
      duration: string;
      speed: string;
      relevance: string;
      takeaway: string;
    }
  > = {
    "a1-q1": {
      id: "-ZRombUgRs4",
      title: "Report Writing: Format, Structure & Model Examples",
      channel: "Dear Sir (Academic English)",
      duration: "14:28",
      speed: "1.25x",
      relevance:
        "Q.01: Master standard formal technical report architecture (Front Matter, Main Body, Methodology, Findings, Conclusions, and Recommendations with sample format).",
      takeaway:
        "Organize reports logically with standard headings, objective voice, and clear separation between findings and actionable recommendations.",
    },
    "a1-q2": {
      id: "3HPDFtZQ9ao",
      title: "Types of Phrases in English Grammar (5 Core Types with Examples)",
      channel: "Nihir Shah",
      duration: "11:45",
      speed: "1.25x",
      relevance:
        "Q.02: Clarifies why phrases lack subject-predicate pairs and breaks down Noun, Verb, Adjective, Adverbial, and Prepositional phrases.",
      takeaway:
        "A phrase operates as a unified single part of speech within a clause, never containing a finite verb acting on a subject.",
    },
    "a1-q3": {
      id: "3w32jIsRlsw",
      title: "Group Discussion Techniques, PREP Framework & Placement Tips",
      channel: "Simplilearn",
      duration: "10:15",
      speed: "1.25x",
      relevance:
        "Q.03: Demonstrates initiation tactics, constructive intervention, handling conflicting viewpoints, and applying the PREP / REP structured argument technique.",
      takeaway:
        "In GD evaluation, active listening and facilitating consensus score significantly higher than dominating speaking time.",
    },
    "a1-q4": {
      id: "HNlV48JhUAo",
      title:
        "Creative Writing: Definition, Types, Features & Literary Qualities",
      channel: "Muhammad Ullah (English Literature)",
      duration: "10:45",
      speed: "1.25x",
      relevance:
        "Q.04: Explores the core distinction between technical and creative writing, showing how sensory details, originality, and figurative devices evoke emotional resonance.",
      takeaway:
        "Creative writing prioritizes 'showing over telling' through evocative imagery, sensory anchors, and metaphoric nuance.",
    },
    "a1-q5": {
      id: "aDMtx5ivKK0",
      title: "The Art of Active Listening & Overcoming Cognitive Barriers",
      channel: "Harvard Business Review",
      duration: "6:50",
      speed: "1.0x",
      relevance:
        "Q.05: Breaks down the active listening cognitive process (Receiving, Evaluating, Responding, Remembering) and overcoming internal/external listening barriers.",
      takeaway:
        "Active listening requires intentional cognitive engagement, non-verbal feedback (SOLER), and reflective paraphrasing.",
    },
    "a2-q1": {
      id: "zwsBcic8GZ4",
      title:
        "English Clauses Explained: Independent vs Dependent (Noun, Adjective & Adverb Clauses)",
      channel: "English with Ananya",
      duration: "10:15",
      speed: "1.25x",
      relevance:
        "Q.01: Defines the grammatical criteria of clauses (Subject + Predicate) and classifies Independent vs Subordinate (Noun, Relative, Adverbial) clauses.",
      takeaway:
        "Independent clauses can stand alone as complete thoughts; dependent clauses require a subordinating conjunction or relative pronoun.",
    },
    "a2-q2": {
      id: "0J8iHJKOKlY",
      title:
        "Barriers of Communication & Speaking: Semantic, Psychological, Physical & Physiological",
      channel: "Study Lovers Kapil Gangwani",
      duration: "11:20",
      speed: "1.25x",
      relevance:
        "Q.02: Analyzes psychological glossophobia, physiological speech tension, Mother Tongue Influence (MTI), and cognitive reframing techniques.",
      takeaway:
        "Overcoming speaking barriers requires structured speech preparation, phonetic practice to neutralize MTI, and cognitive reframing.",
    },
    "a2-q3": {
      id: "vbMtBjoBalQ",
      title: "Paragraph Writing in English: Paragraph Unity and Coherence",
      channel: "Writing Better",
      duration: "8:15",
      speed: "1.25x",
      relevance:
        "Q.03: Teaches the foundational principles of academic paragraph construction: Topic Sentence, Supporting Elaboration, Clincher, and Unity/Coherence transitions.",
      takeaway:
        "A well-crafted paragraph maintains single-idea thematic unity, reinforced by logical bridges and transitional signposts.",
    },
    "a2-q4": {
      id: "PhSoh9aOdA4",
      title:
        "Types of Writing: Expository, Descriptive, Persuasive, Narrative & Technical",
      channel: "Muhammad Ullah (English Literature)",
      duration: "9:15",
      speed: "1.25x",
      relevance:
        "Q.04: Compares the 4 primary writing modes (Expository, Descriptive, Persuasive, Narrative) alongside Technical documentation.",
      takeaway:
        "Selecting the proper writing style depends on authorial objective, intended audience, and communicative context.",
    },
    "a2-q5": {
      id: "Iwpi1Lm6dFo",
      title: "How to Avoid Death By PowerPoint: Slide Design & Delivery",
      channel: "David JP Phillips (TEDx)",
      duration: "16:53",
      speed: "1.25x",
      relevance:
        "Q.05: Illustrates cognitive load theory in slides, 6x6 rule, contrast principles, vocal pacing, and professional body language.",
      takeaway:
        "Slides are visual anchors for the audience, not teleprompters for the speaker; limit one core message per slide.",
    },
  };

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

  const assignment1Questions = [
    {
      key: "a1-q1",
      num: "Q.01",
      title: "Report Writing Format:",
      desc: "Format of a formal report with structural components and a concrete technical report example.",
    },
    {
      key: "a1-q2",
      num: "Q.02",
      title: "Phrase & Its Types:",
      desc: "Definition of phrases, structural difference from clauses, and 5 major types (Noun, Verb, Adj, Adv, Prep).",
    },
    {
      key: "a1-q3",
      num: "Q.03",
      title: "Group Discussion Techniques:",
      desc: "Dynamics of GD, non-verbal indicators, and application of the PREP and REP techniques.",
    },
    {
      key: "a1-q4",
      num: "Q.04",
      title: "Creative Writing:",
      desc: "Definition, distinction from technical writing, and 5 essential literary qualities.",
    },
    {
      key: "a1-q5",
      num: "Q.05",
      title: "Active Listening & Barriers:",
      desc: "5-stage active listening model and comprehensive barriers (physical, psychological, semantic, physiological).",
    },
  ];

  const assignment2Questions = [
    {
      key: "a2-q1",
      num: "Q.01",
      title: "Clause & Its Types:",
      desc: "Syntactic definition of clause; Independent vs Dependent (Noun, Adjective, Adverbial clauses) with examples.",
    },
    {
      key: "a2-q2",
      num: "Q.02",
      title: "Barriers of Speaking:",
      desc: "Psychological glossophobia, Mother Tongue Influence (MTI), physiological constraints & remedies.",
    },
    {
      key: "a2-q3",
      num: "Q.03",
      title: "Paragraph Writing Principles:",
      desc: "Topic sentence, supporting elaboration, clincher, and principles: Unity, Coherence, Order, and Completeness.",
    },
    {
      key: "a2-q4",
      num: "Q.04",
      title: "Writing Skills Taxonomy:",
      desc: "Writing stages (Pre-writing, drafting, editing) and 5 major modes: Expository, Descriptive, Persuasive, Narrative, Technical.",
    },
    {
      key: "a2-q5",
      num: "Q.05",
      title: "Planning Successful Presentations:",
      desc: "Audience analysis, the 3-act structure, Rule of 6x6 slide design, vocal pacing, and Q&A management.",
    },
  ];

  const renderQuestionList = (
    questions: typeof assignment1Questions,
    assignId: "sem1-comm-cia1" | "sem1-comm-cia2",
    assignTitle: string,
    badgeText: string,
  ) => (
    <div className="assignment-box">
      <div className="assignment-header">
        <div>
          <h4>{assignTitle}</h4>
          <span className="criteria-pill">{badgeText}</span>
        </div>
        <Link
          href={`/curaj-msc-cs/assessments?course=6.0CSC04&id=${assignId}`}
          className="header-direct-link"
          title="Open in full exam reader"
        >
          <i className="fa-solid fa-arrow-up-right-from-square"></i>
          <span>Full Solutions</span>
        </Link>
      </div>

      <ul className="assignment-q-list">
        {questions.map((item) => {
          const video = questionVideos[item.key];
          const isOpen = openVideoQuestionId === item.key;
          return (
            <li key={item.key} className={isOpen ? "video-open" : ""}>
              <div className="q-item-header">
                <div className="q-item-main">
                  <span className="q-badge">{item.num}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.desc}</p>
                  </div>
                </div>
                {video && (
                  <button
                    type="button"
                    onClick={() =>
                      setOpenVideoQuestionId(isOpen ? null : item.key)
                    }
                    className={`q-video-toggle-btn ${isOpen ? "active" : ""}`}
                    title={`Toggle video lecture for ${item.num}`}
                  >
                    <i className="fa-brands fa-youtube"></i>
                    <span>{isOpen ? "Hide Video" : "Watch Lecture"}</span>
                  </button>
                )}
              </div>

              {isOpen && video && (
                <div className="inline-q-video-box">
                  <div className="inline-q-video-meta">
                    <span className="meta-channel">
                      <i className="fa-solid fa-graduation-cap"></i>{" "}
                      {video.channel}
                    </span>
                    <span className="meta-duration">
                      <i className="fa-regular fa-clock"></i> {video.duration}
                    </span>
                    <span className="meta-speed">
                      <i className="fa-solid fa-gauge-high"></i> Speed:{" "}
                      {video.speed}
                    </span>
                  </div>
                  <h5 className="inline-q-video-title">{video.title}</h5>
                  <div className="inline-q-video-frame-wrap">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                      title={video.title}
                      className="inline-q-video-iframe"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <div className="inline-q-video-footer">
                    <p className="inline-q-video-relevance">
                      <strong>Exam Relevance:</strong> {video.relevance}
                    </p>
                    {video.takeaway && (
                      <p className="inline-q-video-takeaway">
                        <strong>Key Takeaway:</strong> {video.takeaway}
                      </p>
                    )}
                    <div className="inline-q-video-actions">
                      <a
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-q-video-link"
                      >
                        <i className="fa-brands fa-youtube"></i>
                        <span>Watch on YouTube (HD)</span>
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <Link
        href={`/curaj-msc-cs/assessments?course=6.0CSC04&id=${assignId}`}
        className="view-solutions-btn"
      >
        <span>View All 5 Full Model Solutions</span>
        <i className="fa-solid fa-arrow-right"></i>
      </Link>
    </div>
  );

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
            <div className="hero-meta-strip">
              <span className="meta-pill">
                <i className="fa-solid fa-code"></i> CSC-406 / 6.0CSC04
              </span>
              <span className="meta-pill">
                <i className="fa-solid fa-layer-group"></i> AEC • Semester I
              </span>
              <span className="meta-pill">
                <i className="fa-solid fa-clock"></i> 2 Credits
              </span>
              <span className="meta-pill">
                <i className="fa-solid fa-building-columns"></i> CURAJ MSc CS
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab("cia")}
              className="cia-quick-link"
            >
              <i className="fa-solid fa-file-lines"></i>
              <span>Assignments 01 & 02</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          <h1 className="hero-title">
            <i className="fa-solid fa-comments"></i> Professional Communication
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

        {/* Featured Callout: CIA-1 Predicted Paper & Reader */}
        <section className="predicted-hero-callout">
          <div className="callout-glass-card">
            <div className="callout-content-side">
              <div className="callout-meta-row">
                <span className="callout-badge">
                  <i className="fa-solid fa-graduation-cap"></i> CIA-1 2026
                  Predicted Paper
                </span>
                <span className="callout-dot">•</span>
                <span className="callout-meta-text">12 Questions</span>
                <span className="callout-dot">•</span>
                <span className="callout-meta-text">
                  300–400 Words / Answer
                </span>
                <span className="callout-dot">•</span>
                <span className="callout-meta-text">5 Marks Each</span>
              </div>
              <h3 className="callout-main-title">
                CSC-406 Professional Communication — Predicted Paper & In-Depth
                Solutions
              </h3>
              <p className="callout-desc">
                Full academic model solutions covering Phrases, Clauses,
                Creative Writing, Active Listening, Barriers of Speaking,
                Adjectives, Adverbs, Tenses, Descriptive Writing, Sentences,
                Empathy, and Prejudgment. Read inline or experience our study
                reader with Text-to-Speech audio and interactive quiz.
              </p>
            </div>
            <div className="callout-actions-side">
              <Link
                href="/professional-communication/cia1-predicted-paper"
                className="callout-btn primary"
              >
                <i className="fa-solid fa-headphones"></i>
                <span>Study Reader & Audio</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <button
                type="button"
                onClick={() => setActiveTab("predicted")}
                className="callout-btn secondary"
              >
                <i className="fa-solid fa-list-check"></i>
                <span>Browse 12 Model Answers</span>
              </button>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="tab-bar-wrapper">
          <div className="tab-bar">
            <button
              className={`tab-btn ${activeTab === "predicted" ? "active" : ""}`}
              onClick={() => setActiveTab("predicted")}
            >
              <i className="fa-solid fa-graduation-cap"></i>
              <span>CIA-1 Predicted Paper</span>
              <span className="tab-count-badge">12 Qs</span>
            </button>
            <button
              className={`tab-btn ${activeTab === "syllabus" ? "active" : ""}`}
              onClick={() => setActiveTab("syllabus")}
            >
              <i className="fa-solid fa-list-check"></i>
              <span>6-Unit Syllabus</span>
            </button>
            <button
              className={`tab-btn ${activeTab === "cia" ? "active" : ""}`}
              onClick={() => setActiveTab("cia")}
            >
              <i className="fa-solid fa-file-invoice"></i>
              <span>Assignments 01 & 02</span>
              <span className="tab-count-badge">10 Qs</span>
            </button>
            <button
              className={`tab-btn ${activeTab === "books" ? "active" : ""}`}
              onClick={() => setActiveTab("books")}
            >
              <i className="fa-solid fa-book"></i>
              <span>Prescribed Books</span>
            </button>
            <button
              className={`tab-btn ${activeTab === "nptel" ? "active" : ""}`}
              onClick={() => setActiveTab("nptel")}
            >
              <i className="fa-solid fa-chalkboard-user"></i>
              <span>NPTEL Courses</span>
            </button>
          </div>
        </div>

        {/* TAB 0: CIA-1 PREDICTED QUESTION PAPER & IN-DEPTH MODEL ANSWERS */}
        {activeTab === "predicted" && (
          <section className="tab-content-section predicted-section">
            <div className="predicted-paper-header-box">
              <div className="paper-top-info">
                <div className="dept-tag">
                  <i className="fa-solid fa-building-columns"></i>
                  <span>
                    Central University of Rajasthan — Department of Computer
                    Science
                  </span>
                </div>
                <div className="paper-status-pills">
                  <span className="exam-pill">
                    <i className="fa-solid fa-award"></i> CSC-406 / 6.0CSC04
                  </span>
                  <span className="session-pill">
                    <i className="fa-regular fa-calendar-check"></i> 2025–2026
                    Session
                  </span>
                </div>
              </div>

              <div className="paper-title-block">
                <span className="sub-title-tag">
                  CONTINUOUS INTERNAL ASSESSMENT 1 (CIA-1)
                </span>
                <h2 className="predicted-title">
                  Predicted Examination Question Paper & In-Depth Model
                  Solutions
                </h2>
                <p className="predicted-meta-desc">
                  Long Answer Type Questions • <strong>Attempt any 3</strong> •
                  Word Limit: <strong>300–400 Words per question</strong> •
                  Maximum Marks: <strong>15 [5 × 3 = 15]</strong>
                </p>
              </div>

              <div className="reader-quick-strip">
                <div className="quick-strip-left">
                  <i className="fa-solid fa-headphones"></i>
                  <span>
                    Prefer listening? Open the{" "}
                    <strong>Text-to-Speech Audio Reader</strong> with chapter
                    tracking and self-assessment quiz.
                  </span>
                </div>
                <Link
                  href="/professional-communication/cia1-predicted-paper"
                  className="quick-strip-link"
                >
                  <span>Open Audio Reader</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>

              {/* Filter pills for Q1-Q5 vs Q6-Q12 */}
              <div className="predicted-filter-bar">
                <div className="filter-pill-label">
                  <i className="fa-solid fa-filter"></i> Filter Questions:
                </div>
                <div className="filter-pill-buttons">
                  <button
                    onClick={() => setPredictedFilter("all")}
                    className={`filter-pill-btn ${predictedFilter === "all" ? "active" : ""}`}
                  >
                    All 12 Questions (100% Complete)
                  </button>
                  <button
                    onClick={() => setPredictedFilter("core")}
                    className={`filter-pill-btn ${predictedFilter === "core" ? "active" : ""}`}
                  >
                    Core Questions (Q1–Q5)
                  </button>
                  <button
                    onClick={() => setPredictedFilter("backup")}
                    className={`filter-pill-btn ${predictedFilter === "backup" ? "active" : ""}`}
                  >
                    Alternative / Backup (Q6–Q12)
                  </button>
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="predicted-questions-stack">
              {predictedQuestions
                .filter((q, idx) => {
                  if (predictedFilter === "core") return idx < 5;
                  if (predictedFilter === "backup") return idx >= 5;
                  return true;
                })
                .map((q) => {
                  const isCore = parseInt(q.qNumber.replace("Q", ""), 10) <= 5;
                  const isExpanded = expandedAnswerId === q.id;
                  const video = q.solution.video;
                  const isVideoOpen = openVideoQuestionId === q.id;

                  return (
                    <article
                      key={q.id}
                      className={`predicted-q-card ${isExpanded ? "expanded" : ""}`}
                    >
                      <header className="predicted-q-header">
                        <div className="q-meta-line">
                          <span className="q-number-badge">{q.qNumber}</span>
                          <span className="q-category-tag">
                            {isCore ? "Primary (Attempt Any 3)" : "Alternative"}
                          </span>
                          <span className="q-meta-dot">•</span>
                          <span className="q-meta-text">{q.marks} Marks</span>
                          <span className="q-meta-dot">•</span>
                          <span className="q-meta-text">300–400 Words</span>
                        </div>
                        <h3 className="predicted-q-text">{q.question}</h3>
                        <p className="predicted-q-summary">
                          <strong>Core Concept:</strong> {q.solution.summary}
                        </p>
                      </header>

                      {/* Card Control Buttons */}
                      <div className="predicted-q-actions">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedAnswerId(isExpanded ? null : q.id)
                          }
                          className={`ans-toggle-btn ${isExpanded ? "active" : ""}`}
                        >
                          <i
                            className={`fa-solid ${isExpanded ? "fa-compress" : "fa-file-lines"}`}
                          ></i>
                          <span>
                            {isExpanded
                              ? "Hide Model Answer"
                              : "Read Model Answer (350+ Words)"}
                          </span>
                        </button>

                        <Link
                          href={`/professional-communication/cia1-predicted-paper#question-${q.qNumber.toLowerCase().replace("q", "")}`}
                          className="ans-listen-link"
                          title="Listen with Text-to-Speech Audio Reader"
                        >
                          <i className="fa-solid fa-headphones"></i>
                          <span>Listen Aloud</span>
                        </Link>

                        {video && (
                          <button
                            type="button"
                            onClick={() =>
                              setOpenVideoQuestionId(isVideoOpen ? null : q.id)
                            }
                            className={`ans-video-btn ${isVideoOpen ? "active" : ""}`}
                          >
                            <i className="fa-solid fa-play"></i>
                            <span>
                              {isVideoOpen ? "Hide Video" : "Video Lecture"}
                            </span>
                          </button>
                        )}
                      </div>

                      {/* Inline Video Player */}
                      {isVideoOpen && video && (
                        <div className="inline-video-wrap">
                          <div className="video-meta-top">
                            <span>
                              <i className="fa-solid fa-graduation-cap"></i>{" "}
                              {video.channel}
                            </span>
                            {video.duration && (
                              <span>
                                <i className="fa-regular fa-clock"></i>{" "}
                                {video.duration}
                              </span>
                            )}
                            {video.speed && (
                              <span>
                                <i className="fa-solid fa-gauge-high"></i>{" "}
                                Speed: {video.speed}
                              </span>
                            )}
                          </div>
                          <h5>{video.title}</h5>
                          <div className="iframe-box">
                            <iframe
                              src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                              title={video.title}
                              className="video-iframe"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              loading="lazy"
                            />
                          </div>
                          {video.takeaway && (
                            <p className="video-takeaway">
                              <i className="fa-solid fa-lightbulb"></i>{" "}
                              <strong>Takeaway:</strong> {video.takeaway}
                            </p>
                          )}
                        </div>
                      )}

                      {/* In-Depth Model Answer Body */}
                      {isExpanded && (
                        <div className="predicted-solution-box">
                          {q.solution.keyPoints &&
                            q.solution.keyPoints.length > 0 && (
                              <div className="solution-key-points">
                                <h4>
                                  <i className="fa-solid fa-check-double"></i>{" "}
                                  Key Academic Points (Marking Criteria):
                                </h4>
                                <ul>
                                  {q.solution.keyPoints.map((pt, pIdx) => (
                                    <li key={pIdx}>
                                      <span className="bullet-arrow">›</span>{" "}
                                      {pt}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                          {q.solution.explanation &&
                            q.solution.explanation.length > 0 && (
                              <div className="solution-detailed-text">
                                <h4>
                                  <i className="fa-solid fa-pen-nib"></i>{" "}
                                  Verified Academic Model Solution (300–400
                                  Words):
                                </h4>
                                <div className="text-paragraphs">
                                  {q.solution.explanation.map((line, lIdx) => {
                                    if (!line.trim()) {
                                      return (
                                        <div
                                          key={lIdx}
                                          className="paragraph-spacer"
                                        />
                                      );
                                    }
                                    if (
                                      line.startsWith("1.") ||
                                      line.startsWith("2.") ||
                                      line.startsWith("3.") ||
                                      line.startsWith("a)") ||
                                      line.startsWith("b)") ||
                                      line.startsWith("c)") ||
                                      line.startsWith("d)") ||
                                      line.startsWith("e)")
                                    ) {
                                      return (
                                        <h5
                                          key={lIdx}
                                          className="sol-subheading"
                                        >
                                          {line}
                                        </h5>
                                      );
                                    }
                                    return (
                                      <p key={lIdx} className="sol-paragraph">
                                        {line}
                                      </p>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                          <div className="solution-footer-bar">
                            <span className="exam-compliance-tag">
                              <i className="fa-solid fa-shield-check"></i>{" "}
                              Standard CURAJ Academic Model Answer Format
                            </span>
                            <Link
                              href="/professional-communication/cia1-predicted-paper"
                              className="launch-full-reader-btn"
                            >
                              <span>Open in Distraction-Free Audio Reader</span>
                              <i className="fa-solid fa-arrow-up-right-from-square"></i>
                            </Link>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
            </div>
          </section>
        )}

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
              <div className="section-controls">
                <button
                  type="button"
                  className="btn-outline-sm"
                  onClick={() => {
                    if (allUnitsExpanded) {
                      setExpandedUnit(null);
                      setAllUnitsExpanded(false);
                    } else {
                      setAllUnitsExpanded(true);
                      setExpandedUnit(-1);
                    }
                  }}
                >
                  <i
                    className={`fa-solid ${allUnitsExpanded ? "fa-compress" : "fa-expand"}`}
                  ></i>
                  <span>
                    {allUnitsExpanded
                      ? "Collapse All Units"
                      : "Expand All Units"}
                  </span>
                </button>
              </div>
            </div>

            <div className="units-container">
              {syllabusUnits.map((u) => {
                const isExpanded =
                  allUnitsExpanded || expandedUnit === u.unitNumber;
                return (
                  <div
                    key={u.unitNumber}
                    className={`unit-card ${isExpanded ? "expanded" : ""}`}
                  >
                    <div
                      className="unit-header"
                      onClick={() => {
                        if (allUnitsExpanded) {
                          setAllUnitsExpanded(false);
                          setExpandedUnit(
                            expandedUnit === u.unitNumber ? null : u.unitNumber,
                          );
                        } else {
                          setExpandedUnit(
                            expandedUnit === u.unitNumber ? null : u.unitNumber,
                          );
                        }
                      }}
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

                    {isExpanded && (
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
                    )}
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
                    verified model solutions and synchronized high-definition
                    video lectures for every question.
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
                </div>
              </div>

              {/* Scanned Image Preview with Toggle */}
              <div className="paper-preview-container">
                <div className="paper-preview-header">
                  <div className="paper-header-left">
                    <span className="paper-header-badge">
                      <i className="fa-solid fa-file-lines"></i> Original
                      Question Sheet
                    </span>
                    <span className="paper-session-text">
                      CURAJ Semester I • Session 2025–2026
                    </span>
                  </div>
                  <div className="paper-header-actions">
                    <button
                      type="button"
                      onClick={() => setShowPaperSheet(!showPaperSheet)}
                      className="paper-toggle-btn"
                    >
                      <i
                        className={`fa-solid ${showPaperSheet ? "fa-eye-slash" : "fa-eye"}`}
                      ></i>
                      <span>
                        {showPaperSheet
                          ? "Hide Question Sheet"
                          : "Preview Question Sheet"}
                      </span>
                    </button>
                    <a
                      href="/pccia2025.png"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="paper-action-btn"
                      title="Open full resolution PNG in new tab"
                    >
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      <span>Full Res</span>
                    </a>
                    <a
                      href="/pccia2025.png"
                      download="CURAJ-Professional-Communication-CIA.png"
                      className="paper-action-btn download"
                    >
                      <i className="fa-solid fa-download"></i>
                      <span>Download PNG</span>
                    </a>
                  </div>
                </div>

                {showPaperSheet && (
                  <div className="image-wrapper">
                    <div className="image-wrapper-bar">
                      <span>Click image to open high-resolution view</span>
                      <button
                        type="button"
                        onClick={() => setShowPaperSheet(false)}
                        className="image-close-btn"
                      >
                        <i className="fa-solid fa-xmark"></i> Close Preview
                      </button>
                    </div>
                    <a
                      href="/pccia2025.png"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="image-clickable-link"
                    >
                      <Image
                        src="/pccia2025.png"
                        alt="CURAJ Professional Communication Assignment Question Paper"
                        width={900}
                        height={700}
                        className="paper-image"
                        priority
                      />
                    </a>
                  </div>
                )}
              </div>

              {/* Assignment Filter Switcher */}
              <div className="assignment-filter-bar">
                <span className="filter-label">
                  <i className="fa-solid fa-filter"></i> Filter View:
                </span>
                <button
                  type="button"
                  className={`filter-btn ${assignmentFilter === "all" ? "active" : ""}`}
                  onClick={() => setAssignmentFilter("all")}
                >
                  <i className="fa-solid fa-table-columns"></i>
                  <span>Both Assignments</span>
                  <span className="count-pill">10 Questions</span>
                </button>
                <button
                  type="button"
                  className={`filter-btn ${assignmentFilter === "a1" ? "active" : ""}`}
                  onClick={() => setAssignmentFilter("a1")}
                >
                  <i className="fa-solid fa-file-pen"></i>
                  <span>Assignment 01 Only</span>
                  <span className="count-pill">5 Qs</span>
                </button>
                <button
                  type="button"
                  className={`filter-btn ${assignmentFilter === "a2" ? "active" : ""}`}
                  onClick={() => setAssignmentFilter("a2")}
                >
                  <i className="fa-solid fa-file-lines"></i>
                  <span>Assignment 02 Only</span>
                  <span className="count-pill">5 Qs</span>
                </button>
              </div>

              {/* Questions Overview Table */}
              <div
                className={`assignments-dual-grid ${
                  assignmentFilter !== "all" ? "single-column" : ""
                }`}
              >
                {(assignmentFilter === "all" || assignmentFilter === "a1") &&
                  renderQuestionList(
                    assignment1Questions,
                    "sem1-comm-cia1",
                    "Assignment: 01 (Max Marks: 15)",
                    "Attempt any 3 • 300-400 words",
                  )}

                {(assignmentFilter === "all" || assignmentFilter === "a2") &&
                  renderQuestionList(
                    assignment2Questions,
                    "sem1-comm-cia2",
                    "Assignment: 02 (Max Marks: 15)",
                    "Attempt any 3 • 300-400 words",
                  )}
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
          max-width: 1240px;
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
          border-radius: 14px;
          padding: 1.75rem 2rem;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        :global(html.dark) .course-hero-card {
          background: #16181d;
          border-color: #272c35;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        }

        .hero-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .hero-meta-strip {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .meta-pill {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          background: #f1f5f9;
          color: #475569;
          border: 1px solid #e2e8f0;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        :global(html.dark) .meta-pill {
          background: #1e293b;
          color: #94a3b8;
          border-color: #334155;
        }

        .cia-quick-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: #2563eb;
          background: rgba(37, 99, 235, 0.05);
          border: 1px solid rgba(37, 99, 235, 0.2);
          padding: 0.35rem 0.75rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .cia-quick-link:hover {
          background: rgba(37, 99, 235, 0.1);
        }

        :global(html.dark) .cia-quick-link {
          background: rgba(37, 99, 235, 0.12);
          color: #60a5fa;
          border-color: rgba(37, 99, 235, 0.3);
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
          color: #2563eb;
        }

        :global(html.dark) .hero-title i {
          color: #60a5fa;
        }

        .hero-subtitle {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin: -0.5rem 0 0 0;
          line-height: 1.5;
        }

        .outline-box {
          background: #f8fafc;
          border-left: 3px solid #2563eb;
          padding: 0.85rem 1.15rem;
          border-radius: 0 8px 8px 0;
        }

        :global(html.dark) .outline-box {
          background: #111317;
          border-left-color: #3b82f6;
        }

        .outline-header {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          color: #1e293b;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        :global(html.dark) .outline-header {
          color: #f1f5f9;
        }

        .outline-box p {
          margin: 0;
          font-size: 0.88rem;
          line-height: 1.55;
          color: var(--text-primary);
        }

        .objectives-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 0.85rem;
          margin-top: 0.35rem;
        }

        .obj-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 0.85rem 1rem;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          transition: border-color 0.15s;
        }

        :global(html.dark) .obj-card {
          background: #16181d;
          border-color: #272c35;
        }

        .obj-card:hover {
          border-color: #94a3b8;
        }

        :global(html.dark) .obj-card:hover {
          border-color: #475569;
        }

        .obj-card.full-width {
          grid-column: 1 / -1;
        }

        .obj-card i {
          color: #64748b;
          font-size: 1rem;
          margin-top: 0.15rem;
          flex-shrink: 0;
        }

        :global(html.dark) .obj-card i {
          color: #94a3b8;
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
        .tab-bar-wrapper {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .tab-bar-wrapper::-webkit-scrollbar {
          display: none;
        }

        .tab-bar {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          padding: 0.35rem;
          border-radius: 10px;
          min-width: max-content;
        }

        :global(html.dark) .tab-bar {
          background: #0f172a;
          border-color: #242933;
        }

        .tab-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          padding: 0.55rem 0.95rem;
          border-radius: 7px;
          font-size: 0.825rem;
          font-weight: 600;
          background: transparent;
          color: #64748b;
          border: none;
          cursor: pointer;
          transition: all 0.15s ease;
          white-space: nowrap;
        }

        .tab-btn:hover {
          color: #0f172a;
          background: rgba(0, 0, 0, 0.04);
        }

        :global(html.dark) .tab-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #f1f5f9;
        }

        .tab-btn.active {
          color: #0f172a;
          background: #ffffff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
          font-weight: 700;
        }

        :global(html.dark) .tab-btn.active {
          background: #1e293b;
          color: #f8fafc;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        }

        .tab-count-badge {
          display: inline-flex;
          align-items: center;
          font-size: 0.7rem;
          font-weight: 700;
          background: #e2e8f0;
          color: #475569;
          padding: 0.1rem 0.45rem;
          border-radius: 9999px;
        }

        :global(html.dark) .tab-count-badge {
          background: #334155;
          color: #94a3b8;
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
          color: #2563eb;
        }

        :global(html.dark) .section-title i {
          color: #60a5fa;
        }

        .section-desc {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .btn-outline-sm {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.85rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-outline-sm:hover {
          border-color: #94a3b8;
          color: #2563eb;
          background: rgba(37, 99, 235, 0.04);
        }

        :global(html.dark) .btn-outline-sm {
          background: #181b22;
          border-color: #2a313d;
          color: #e5e7eb;
        }

        :global(html.dark) .btn-outline-sm:hover {
          color: #60a5fa;
          border-color: #3b82f6;
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
            border-color 0.15s ease,
            box-shadow 0.15s ease;
        }

        :global(html.dark) .unit-card {
          background: #16181d;
          border-color: #272c35;
        }

        .unit-card:hover {
          border-color: #94a3b8;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
        }

        :global(html.dark) .unit-card:hover {
          border-color: #475569;
        }

        .unit-header {
          padding: 1.15rem 1.35rem;
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
          gap: 0.85rem;
        }

        .unit-number-pill {
          font-size: 0.72rem;
          font-weight: 700;
          background: #f1f5f9;
          color: #475569;
          border: 1px solid #e2e8f0;
          padding: 0.25rem 0.55rem;
          border-radius: 6px;
          white-space: nowrap;
        }

        :global(html.dark) .unit-number-pill {
          background: #1e293b;
          color: #94a3b8;
          border-color: #334155;
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
          color: #2563eb;
        }

        :global(html.dark) .unit-title i {
          color: #60a5fa;
        }

        .unit-subtitle {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .unit-header-right {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .exam-tag {
          font-size: 0.75rem;
          font-weight: 600;
          color: #2563eb;
          background: rgba(37, 99, 235, 0.06);
          border: 1px solid rgba(37, 99, 235, 0.18);
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        :global(html.dark) .exam-tag {
          background: rgba(37, 99, 235, 0.12);
          color: #60a5fa;
          border-color: rgba(37, 99, 235, 0.28);
        }

        .toggle-icon {
          color: var(--text-muted);
          transition: transform 0.2s ease;
        }

        .toggle-icon.open {
          transform: rotate(180deg);
        }

        .unit-body {
          padding: 0.75rem 1.35rem 1.35rem 1.35rem;
          border-top: 1px solid var(--border);
          background: var(--bg-light);
        }

        :global(html.dark) .unit-body {
          background: #111317;
          border-color: #242933;
        }

        .topics-heading {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--heading-color);
          margin: 0.75rem 0 0.75rem 0;
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .topics-heading i {
          color: #2563eb;
        }

        :global(html.dark) .topics-heading i {
          color: #60a5fa;
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
          font-size: 0.85rem;
          color: var(--text-primary);
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          line-height: 1.45;
        }

        .topics-list li i {
          color: #64748b;
          font-size: 0.75rem;
          margin-top: 0.25rem;
          flex-shrink: 0;
        }

        :global(html.dark) .topics-list li i {
          color: #94a3b8;
        }

        .outcomes-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 1.25rem 1.5rem;
          border-left: 3px solid #2563eb;
        }

        :global(html.dark) .outcomes-card {
          background: #16181d;
          border-color: #272c35;
          border-left-color: #3b82f6;
        }

        .outcomes-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: #2563eb;
          margin-bottom: 0.4rem;
        }

        :global(html.dark) .outcomes-header {
          color: #60a5fa;
        }

        .outcomes-header h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 700;
        }

        .outcomes-card p {
          margin: 0;
          font-size: 0.88rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        /* CIA Showcase Card */
        .cia-showcase-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.75rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);
        }

        :global(html.dark) .cia-showcase-card {
          background: #16181d;
          border-color: #272c35;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        }

        .cia-showcase-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1.25rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 1.25rem;
        }

        .available-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          font-weight: 600;
          color: #475569;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          margin-bottom: 0.4rem;
        }

        :global(html.dark) .available-badge {
          background: #1e293b;
          color: #94a3b8;
          border-color: #334155;
        }

        .cia-showcase-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--heading-color);
          margin: 0 0 0.35rem 0;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .cia-showcase-title i {
          color: #2563eb;
        }

        :global(html.dark) .cia-showcase-title i {
          color: #60a5fa;
        }

        .cia-showcase-desc {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
          max-width: 750px;
          line-height: 1.55;
        }

        .cia-action-buttons {
          display: flex;
          gap: 0.65rem;
          flex-wrap: wrap;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.15rem;
          background: #2563eb;
          border: 1px solid #2563eb;
          color: #ffffff;
          font-weight: 600;
          font-size: 0.85rem;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .btn-primary:hover {
          background: #1d4ed8;
          border-color: #1d4ed8;
        }

        :global(html.dark) .btn-primary {
          background: #2563eb;
          border-color: #2563eb;
        }

        :global(html.dark) .btn-primary:hover {
          background: #3b82f6;
          border-color: #3b82f6;
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.15rem;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          color: #334155;
          font-weight: 600;
          font-size: 0.85rem;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .btn-secondary:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        :global(html.dark) .btn-secondary {
          background: #1e293b;
          color: #e2e8f0;
          border-color: #334155;
        }

        :global(html.dark) .btn-secondary:hover {
          background: #334155;
          color: #ffffff;
        }

        /* Scanned Paper Preview Container */
        .paper-preview-container {
          background: var(--bg-light);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 0.85rem 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        :global(html.dark) .paper-preview-container {
          background: #111317;
          border-color: #242933;
        }

        .paper-preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .paper-preview-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--heading-color);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .paper-preview-title i {
          color: #2563eb;
        }

        :global(html.dark) .paper-preview-title i {
          color: #60a5fa;
        }

        .paper-preview-actions {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .preview-toggle-btn {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-primary);
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.35rem 0.75rem;
          border-radius: 6px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          transition: all 0.15s ease;
        }

        .preview-toggle-btn:hover {
          border-color: #94a3b8;
          color: #2563eb;
        }

        .paper-download-link {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.35rem 0.75rem;
          border-radius: 6px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          transition: all 0.15s ease;
        }

        .paper-download-link:hover {
          color: var(--text-primary);
          border-color: #94a3b8;
        }

        .paper-images-viewer {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-top: 0.5rem;
        }

        .paper-page-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 0.85rem;
        }

        :global(html.dark) .paper-page-card {
          background: #16181d;
          border-color: #272c35;
        }

        .page-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.65rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border);
        }

        .page-indicator {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--heading-color);
        }

        .image-close-btn {
          background: none;
          border: none;
          color: #64748b;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }

        .image-close-btn:hover {
          color: #0f172a;
        }

        :global(html.dark) .image-close-btn:hover {
          color: #f1f5f9;
        }

        .image-clickable-link {
          display: block;
          max-width: 100%;
          cursor: zoom-in;
        }

        .scanned-img {
          width: 100%;
          height: auto;
          border-radius: 6px;
          display: block;
          border: 1px solid var(--border);
        }

        .image-caption {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-align: center;
          margin: 0.5rem 0 0 0;
        }

        /* Assignments Dual Grid */
        .assignments-dual-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 1.5rem;
          align-items: start;
        }

        .assignments-dual-grid.single-column {
          grid-template-columns: 1fr;
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

        :global(html.dark) .assignment-box {
          background: #111317;
          border-color: #242933;
        }

        .assignment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border);
          padding-bottom: 0.75rem;
          gap: 0.75rem;
        }

        .assignment-header h4 {
          margin: 0;
          font-size: 1rem;
          font-weight: 800;
          color: var(--heading-color);
        }

        .header-direct-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #2563eb;
          text-decoration: none;
          padding: 0.25rem 0.55rem;
          border-radius: 5px;
          background: rgba(37, 99, 235, 0.06);
          border: 1px solid rgba(37, 99, 235, 0.18);
          transition: all 0.15s ease;
        }

        .header-direct-link:hover {
          background: rgba(37, 99, 235, 0.12);
        }

        :global(html.dark) .header-direct-link {
          background: rgba(37, 99, 235, 0.12);
          color: #60a5fa;
          border-color: rgba(37, 99, 235, 0.28);
        }

        .criteria-pill {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 600;
          background: #f1f5f9;
          color: #475569;
          border: 1px solid #e2e8f0;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          margin-top: 0.25rem;
        }

        :global(html.dark) .criteria-pill {
          background: #1e293b;
          color: #94a3b8;
          border-color: #334155;
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
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 0.85rem;
          transition:
            border-color 0.15s ease,
            box-shadow 0.15s ease;
        }

        :global(html.dark) .assignment-q-list li {
          background: #16181d;
          border-color: #272c35;
        }

        .assignment-q-list li:hover {
          border-color: #94a3b8;
        }

        :global(html.dark) .assignment-q-list li:hover {
          border-color: #475569;
        }

        .assignment-q-list li.video-open {
          border-color: #2563eb;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.08);
        }

        :global(html.dark) .assignment-q-list li.video-open {
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .q-item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .q-item-main {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          flex: 1;
        }

        .q-item-main strong {
          display: block;
          font-size: 0.875rem;
          color: var(--heading-color);
          margin-bottom: 0.2rem;
          line-height: 1.35;
        }

        .q-item-main p {
          margin: 0;
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        .q-badge {
          font-size: 0.72rem;
          font-weight: 700;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          color: #334155;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          flex-shrink: 0;
        }

        :global(html.dark) .q-badge {
          background: #1e293b;
          border-color: #334155;
          color: #94a3b8;
        }

        .q-video-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.3rem 0.65rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #475569;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.15s ease;
        }

        .q-video-toggle-btn i {
          color: #dc2626;
        }

        .q-video-toggle-btn:hover {
          background: #f1f5f9;
          color: #0f172a;
          border-color: #cbd5e1;
        }

        .q-video-toggle-btn.active {
          background: #1e293b;
          color: #ffffff;
          border-color: #1e293b;
        }

        .q-video-toggle-btn.active i {
          color: #f87171;
        }

        :global(html.dark) .q-video-toggle-btn {
          background: #16181d;
          color: #94a3b8;
          border-color: #334155;
        }

        :global(html.dark) .q-video-toggle-btn:hover {
          background: #242933;
          color: #f1f5f9;
          border-color: #475569;
        }

        :global(html.dark) .q-video-toggle-btn.active {
          background: #3b82f6;
          color: #ffffff;
          border-color: #3b82f6;
        }

        /* Inline Video Player Box */
        .inline-q-video-box {
          width: 100%;
          margin: 0.75rem auto 0;
          background: var(--bg-light);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 0.85rem;
          box-sizing: border-box;
        }

        :global(html.dark) .inline-q-video-box {
          background: #0f172a;
          border-color: #272c35;
        }

        .inline-q-video-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
          gap: 0.5rem;
        }

        .inline-q-video-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--heading-color);
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .inline-q-video-title i {
          color: #dc2626;
        }

        .inline-q-video-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.74rem;
          font-weight: 600;
          color: #475569;
          text-decoration: none;
          padding: 0.3rem 0.65rem;
          border-radius: 6px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          transition: all 0.15s ease;
          white-space: nowrap;
        }

        .inline-q-video-link i {
          color: #dc2626;
        }

        .inline-q-video-link:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        :global(html.dark) .inline-q-video-link {
          background: #1e293b;
          color: #94a3b8;
          border-color: #334155;
        }

        :global(html.dark) .inline-q-video-link:hover {
          background: #334155;
          color: #f1f5f9;
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
          border-radius: 10px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          transition:
            border-color 0.15s,
            transform 0.15s;
        }

        :global(html.dark) .book-card {
          background: #16181d;
          border-color: #272c35;
        }

        .book-card:hover {
          border-color: #94a3b8;
          transform: translateY(-1px);
        }

        :global(html.dark) .book-card:hover {
          border-color: #475569;
        }

        .book-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.25rem;
        }

        .book-category {
          font-size: 0.7rem;
          font-weight: 600;
          color: #475569;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
        }

        :global(html.dark) .book-category {
          background: #1e293b;
          color: #94a3b8;
          border-color: #334155;
        }

        .book-num {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .book-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--heading-color);
          margin: 0;
          line-height: 1.35;
        }

        .book-author {
          font-size: 0.825rem;
          color: var(--text-primary);
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .book-author i {
          color: #64748b;
          font-size: 0.75rem;
        }

        :global(html.dark) .book-author i {
          color: #94a3b8;
        }

        .book-publisher {
          font-size: 0.78rem;
          color: var(--text-muted);
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .book-publisher i {
          color: var(--text-muted);
          font-size: 0.75rem;
        }

        /* NPTEL Grid */
        .nptel-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        .nptel-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 1.35rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1.25rem;
          transition:
            border-color 0.15s,
            transform 0.15s;
        }

        :global(html.dark) .nptel-card {
          background: #16181d;
          border-color: #272c35;
        }

        .nptel-card:hover {
          border-color: #94a3b8;
          transform: translateY(-1px);
        }

        :global(html.dark) .nptel-card:hover {
          border-color: #475569;
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
          color: #475569;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        :global(html.dark) .nptel-badge-inst {
          background: #1e293b;
          border-color: #334155;
          color: #94a3b8;
        }

        .nptel-badge-inst i {
          color: #2563eb;
        }

        :global(html.dark) .nptel-badge-inst i {
          color: #60a5fa;
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

        :global(html.dark) .nptel-badge-weeks {
          background: #111317;
          border-color: #242933;
        }

        .nptel-course-title {
          font-size: 1.05rem;
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
          color: #64748b;
          font-size: 0.7rem;
          margin-top: 0.2rem;
          flex-shrink: 0;
        }

        :global(html.dark) .nptel-topics-list li i {
          color: #94a3b8;
        }

        .nptel-link-btn {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 1rem;
          background: #2563eb;
          color: #ffffff;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.825rem;
          transition: all 0.15s ease;
        }

        .nptel-link-btn:hover {
          background: #1d4ed8;
        }

        :global(html.dark) .nptel-link-btn {
          background: #2563eb;
        }

        :global(html.dark) .nptel-link-btn:hover {
          background: #3b82f6;
        }

        /* Predicted Paper Hero Callout */
        .predicted-hero-callout {
          margin-bottom: 0.5rem;
        }

        .callout-glass-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-top: 3px solid #2563eb;
          border-radius: 12px;
          padding: 1.35rem 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }

        :global(html.dark) .callout-glass-card {
          background: #16181d;
          border-color: #272c35;
          border-top-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .callout-content-side {
          flex: 1;
        }

        .callout-meta-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 0.4rem;
        }

        .callout-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: #2563eb;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        :global(html.dark) .callout-badge {
          color: #60a5fa;
        }

        .callout-dot {
          color: #cbd5e1;
          font-size: 0.75rem;
        }

        :global(html.dark) .callout-dot {
          color: #475569;
        }

        .callout-meta-text {
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 600;
        }

        :global(html.dark) .callout-meta-text {
          color: #94a3b8;
        }

        .callout-main-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.35rem;
          line-height: 1.35;
        }

        :global(html.dark) .callout-main-title {
          color: #f8fafc;
        }

        .callout-desc {
          font-size: 0.88rem;
          color: #475569;
          line-height: 1.5;
          margin: 0;
        }

        :global(html.dark) .callout-desc {
          color: #94a3b8;
        }

        .callout-actions-side {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          min-width: 220px;
          flex-shrink: 0;
        }

        .callout-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          padding: 0.65rem 1.15rem;
          border-radius: 8px;
          font-size: 0.84rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .callout-btn.primary {
          background: #2563eb;
          color: #ffffff;
          border: 1px solid #2563eb;
        }

        .callout-btn.primary:hover {
          background: #1d4ed8;
          border-color: #1d4ed8;
        }

        .callout-btn.secondary {
          background: transparent;
          color: #334155;
          border: 1px solid #cbd5e1;
        }

        :global(html.dark) .callout-btn.secondary {
          color: #cbd5e1;
          border-color: #334155;
        }

        .callout-btn.secondary:hover {
          background: #f1f5f9;
        }

        :global(html.dark) .callout-btn.secondary:hover {
          background: #334155;
        }

        /* Predicted Tab Content */
        .predicted-paper-header-box {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.5rem 1.75rem;
          margin-bottom: 1.5rem;
        }

        :global(html.dark) .predicted-paper-header-box {
          background: #16181d;
          border-color: #272c35;
        }

        .paper-top-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #f1f5f9;
        }

        :global(html.dark) .paper-top-info {
          border-bottom-color: #242933;
        }

        .dept-tag {
          font-size: 0.8rem;
          font-weight: 600;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        :global(html.dark) .dept-tag {
          color: #94a3b8;
        }

        .paper-status-pills {
          display: flex;
          gap: 0.4rem;
        }

        .exam-pill,
        .session-pill {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          background: #f1f5f9;
          color: #475569;
          border: 1px solid #e2e8f0;
        }

        :global(html.dark) .exam-pill,
        :global(html.dark) .session-pill {
          background: #0f172a;
          color: #94a3b8;
          border-color: #334155;
        }

        .sub-title-tag {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #2563eb;
          margin-bottom: 0.2rem;
        }

        :global(html.dark) .sub-title-tag {
          color: #60a5fa;
        }

        .predicted-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 0.35rem 0;
          line-height: 1.3;
        }

        :global(html.dark) .predicted-title {
          color: #f8fafc;
        }

        .predicted-meta-desc {
          font-size: 0.88rem;
          color: #64748b;
          margin: 0 0 1rem 0;
        }

        :global(html.dark) .predicted-meta-desc {
          color: #94a3b8;
        }

        .reader-quick-strip {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        :global(html.dark) .reader-quick-strip {
          background: #0f172a;
          border-color: #272c35;
        }

        .quick-strip-left {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: #475569;
        }

        :global(html.dark) .quick-strip-left {
          color: #cbd5e1;
        }

        .quick-strip-left i {
          color: #2563eb;
        }

        :global(html.dark) .quick-strip-left i {
          color: #60a5fa;
        }

        .quick-strip-link {
          font-size: 0.8rem;
          font-weight: 600;
          color: #2563eb;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          transition: gap 0.15s;
        }

        :global(html.dark) .quick-strip-link {
          color: #60a5fa;
        }

        .quick-strip-link:hover {
          gap: 0.5rem;
        }

        .predicted-filter-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          padding-top: 0.75rem;
          border-top: 1px solid #f1f5f9;
        }

        :global(html.dark) .predicted-filter-bar {
          border-top-color: #242933;
        }

        .filter-pill-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #64748b;
        }

        :global(html.dark) .filter-pill-label {
          color: #94a3b8;
        }

        .filter-pill-buttons {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .filter-pill-btn {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          color: #475569;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.35rem 0.75rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s;
        }

        :global(html.dark) .filter-pill-btn {
          background: #0f172a;
          border-color: #334155;
          color: #94a3b8;
        }

        .filter-pill-btn.active {
          background: #1e293b;
          border-color: #1e293b;
          color: #ffffff;
        }

        :global(html.dark) .filter-pill-btn.active {
          background: #3b82f6;
          border-color: #3b82f6;
          color: #ffffff;
        }

        /* Question Cards Stack */
        .predicted-questions-stack {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .predicted-q-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 1.35rem 1.5rem;
          transition: border-color 0.15s;
        }

        :global(html.dark) .predicted-q-card {
          background: #16181d;
          border-color: #272c35;
        }

        .predicted-q-card.expanded {
          border-color: #94a3b8;
        }

        :global(html.dark) .predicted-q-card.expanded {
          border-color: #475569;
        }

        .q-meta-line {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.45rem;
          margin-bottom: 0.5rem;
        }

        .q-number-badge {
          background: #1e293b;
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }

        :global(html.dark) .q-number-badge {
          background: #3b82f6;
        }

        .q-category-tag {
          font-size: 0.72rem;
          font-weight: 600;
          color: #475569;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }

        :global(html.dark) .q-category-tag {
          background: #0f172a;
          color: #94a3b8;
          border-color: #334155;
        }

        .q-meta-dot {
          color: #cbd5e1;
          font-size: 0.75rem;
        }

        :global(html.dark) .q-meta-dot {
          color: #475569;
        }

        .q-meta-text {
          font-size: 0.72rem;
          color: #64748b;
          font-weight: 600;
        }

        :global(html.dark) .q-meta-text {
          color: #94a3b8;
        }

        .predicted-q-text {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 0.35rem 0;
          line-height: 1.4;
        }

        :global(html.dark) .predicted-q-text {
          color: #f8fafc;
        }

        .predicted-q-summary {
          font-size: 0.875rem;
          color: #475569;
          line-height: 1.5;
          margin: 0 0 0.85rem 0;
        }

        :global(html.dark) .predicted-q-summary {
          color: #94a3b8;
        }

        .predicted-q-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .ans-toggle-btn {
          background: #f8fafc;
          color: #1e293b;
          border: 1px solid #cbd5e1;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.45rem 0.85rem;
          border-radius: 6px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          transition: all 0.15s;
        }

        :global(html.dark) .ans-toggle-btn {
          background: #0f172a;
          color: #e2e8f0;
          border-color: #334155;
        }

        .ans-toggle-btn:hover {
          background: #e2e8f0;
        }

        :global(html.dark) .ans-toggle-btn:hover {
          background: #1e293b;
        }

        .ans-toggle-btn.active {
          background: #1e293b;
          color: #ffffff;
          border-color: #1e293b;
        }

        :global(html.dark) .ans-toggle-btn.active {
          background: #3b82f6;
          color: #ffffff;
          border-color: #3b82f6;
        }

        .ans-listen-link {
          background: transparent;
          color: #475569;
          border: 1px solid #e2e8f0;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.45rem 0.75rem;
          border-radius: 6px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          transition: all 0.15s;
        }

        :global(html.dark) .ans-listen-link {
          color: #94a3b8;
          border-color: #334155;
        }

        .ans-listen-link:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        :global(html.dark) .ans-listen-link:hover {
          background: #0f172a;
          color: #f1f5f9;
        }

        .ans-video-btn {
          background: transparent;
          color: #475569;
          border: 1px solid #e2e8f0;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.45rem 0.75rem;
          border-radius: 6px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          transition: all 0.15s;
        }

        .ans-video-btn i {
          color: #dc2626;
        }

        :global(html.dark) .ans-video-btn {
          color: #94a3b8;
          border-color: #334155;
        }

        .ans-video-btn:hover,
        .ans-video-btn.active {
          background: #f1f5f9;
          color: #0f172a;
        }

        :global(html.dark) .ans-video-btn:hover,
        :global(html.dark) .ans-video-btn.active {
          background: #0f172a;
          color: #f1f5f9;
        }

        /* Inline Video Player */
        .inline-video-wrap {
          margin-top: 1rem;
          padding: 1rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
        }

        :global(html.dark) .inline-video-wrap {
          background: #0f172a;
          border-color: #272c35;
        }

        .video-meta-top {
          display: flex;
          gap: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          margin-bottom: 0.4rem;
        }

        :global(html.dark) .video-meta-top {
          color: #94a3b8;
        }

        .inline-video-wrap h5 {
          font-size: 0.92rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 0.75rem 0;
        }

        :global(html.dark) .inline-video-wrap h5 {
          color: #f1f5f9;
        }

        .iframe-box {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          border-radius: 6px;
        }

        .video-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        .video-takeaway {
          font-size: 0.825rem;
          color: #475569;
          margin: 0.75rem 0 0 0;
          background: rgba(0, 0, 0, 0.03);
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
        }

        :global(html.dark) .video-takeaway {
          color: #cbd5e1;
          background: rgba(255, 255, 255, 0.05);
        }

        /* In-Depth Model Solution Body */
        .predicted-solution-box {
          margin-top: 1.25rem;
          padding-top: 1.25rem;
          border-top: 1px dashed #cbd5e1;
          animation: fadeIn 0.2s ease-out;
        }

        :global(html.dark) .predicted-solution-box {
          border-top-color: #334155;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .solution-key-points {
          background: #f8fafc;
          border-left: 3px solid #2563eb;
          padding: 0.85rem 1.15rem;
          border-radius: 0 8px 8px 0;
          margin-bottom: 1.25rem;
        }

        :global(html.dark) .solution-key-points {
          background: #0f172a;
          border-left-color: #3b82f6;
        }

        .solution-key-points h4 {
          font-size: 0.88rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 0.45rem 0;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        :global(html.dark) .solution-key-points h4 {
          color: #f1f5f9;
        }

        .solution-key-points ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .solution-key-points li {
          font-size: 0.85rem;
          color: #334155;
          line-height: 1.45;
          display: flex;
          gap: 0.4rem;
        }

        :global(html.dark) .solution-key-points li {
          color: #cbd5e1;
        }

        .bullet-arrow {
          color: #2563eb;
          font-weight: bold;
        }

        :global(html.dark) .bullet-arrow {
          color: #60a5fa;
        }

        .solution-detailed-text {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 1.15rem 1.35rem;
          margin-bottom: 1.25rem;
        }

        :global(html.dark) .solution-detailed-text {
          background: #0f172a;
          border-color: #272c35;
        }

        .solution-detailed-text h4 {
          font-size: 0.9rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 0.75rem 0;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding-bottom: 0.45rem;
          border-bottom: 1px solid #e2e8f0;
        }

        :global(html.dark) .solution-detailed-text h4 {
          color: #f1f5f9;
          border-bottom-color: #272c35;
        }

        .text-paragraphs {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .paragraph-spacer {
          height: 0.35rem;
        }

        .sol-subheading {
          font-size: 0.88rem;
          font-weight: 700;
          color: #2563eb;
          margin: 0.35rem 0 0.1rem 0;
        }

        :global(html.dark) .sol-subheading {
          color: #60a5fa;
        }

        .sol-paragraph {
          font-size: 0.86rem;
          color: #334155;
          line-height: 1.55;
          margin: 0;
        }

        :global(html.dark) .sol-paragraph {
          color: #cbd5e1;
        }

        .solution-footer-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          padding-top: 0.5rem;
        }

        .exam-compliance-tag {
          font-size: 0.78rem;
          font-weight: 600;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        :global(html.dark) .exam-compliance-tag {
          color: #94a3b8;
        }

        .launch-full-reader-btn {
          font-size: 0.8rem;
          font-weight: 600;
          color: #2563eb;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          transition: gap 0.15s;
        }

        :global(html.dark) .launch-full-reader-btn {
          color: #60a5fa;
        }

        .launch-full-reader-btn:hover {
          gap: 0.5rem;
        }

        /* Responsive Breakpoints */
        @media (max-width: 768px) {
          .content-wrapper {
            padding: 1rem 0.85rem;
            gap: 1.25rem;
          }
          .hero-title {
            font-size: 1.45rem;
          }
          .course-hero-card {
            padding: 1.25rem 1rem;
            gap: 1rem;
          }
          .hero-top-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }
          .hero-meta-strip {
            width: 100%;
          }
          .cia-quick-link {
            width: 100%;
            justify-content: center;
          }
          .callout-glass-card {
            flex-direction: column;
            align-items: stretch;
            gap: 1.15rem;
            padding: 1.25rem;
          }
          .callout-actions-side {
            width: 100%;
            min-width: 0;
          }
          .callout-btn {
            width: 100%;
          }
          .tab-bar-wrapper {
            margin: 0 -0.85rem;
            padding: 0 0.85rem;
          }
          .cia-showcase-card {
            padding: 1.25rem 1rem;
          }
          .cia-action-buttons {
            width: 100%;
          }
          .btn-primary,
          .btn-secondary {
            width: 100%;
            justify-content: center;
            text-align: center;
          }
          .predicted-paper-header-box {
            padding: 1.15rem;
          }
          .reader-quick-strip {
            flex-direction: column;
            align-items: flex-start;
          }
          .quick-strip-link {
            width: 100%;
            justify-content: flex-start;
          }
          .predicted-q-card {
            padding: 1.15rem 1rem;
          }
          .predicted-q-actions {
            width: 100%;
          }
          .ans-toggle-btn {
            width: 100%;
            justify-content: center;
          }
          .ans-listen-link,
          .ans-video-btn {
            flex: 1;
            justify-content: center;
          }
          .objectives-grid {
            grid-template-columns: 1fr;
          }
          .topics-list {
            grid-template-columns: 1fr;
          }
          .assignments-dual-grid {
            grid-template-columns: 1fr;
          }
          .paper-preview-actions {
            flex-direction: column;
            width: 100%;
          }
          .paper-preview-actions button,
          .paper-preview-actions a {
            width: 100%;
            justify-content: center;
          }
          .q-item-header {
            flex-direction: column;
          }
          .q-video-toggle-btn {
            align-self: flex-start;
            margin-top: 0.35rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.3rem;
          }
          .predicted-title {
            font-size: 1.15rem;
          }
          .callout-main-title {
            font-size: 1.05rem;
          }
          .callout-meta-row {
            font-size: 0.72rem;
          }
          .predicted-q-text {
            font-size: 0.98rem;
          }
          .tab-btn {
            font-size: 0.78rem;
            padding: 0.5rem 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
