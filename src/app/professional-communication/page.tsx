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
            <div className="hero-badges">
              <span className="badge code">Course: CSC-406 / 6.0CSC04</span>
              <span className="badge category">AEC • Semester I</span>
              <span className="badge credits">2 Credits</span>
              <span className="badge univ">CURAJ M.Sc. Computer Science</span>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab("cia")}
              className="cia-quick-link"
            >
              <i className="fa-solid fa-file-circle-check"></i>
              <span>CIA-1 & CIA-2 Verified Solutions</span>
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

        {/* Hero Featured Callout: CIA-1 Predicted Paper & Reader */}
        <section className="predicted-hero-callout">
          <div className="callout-glass-card">
            <div className="callout-content-side">
              <div className="callout-tags-row">
                <span className="featured-pill">
                  <i className="fa-solid fa-star"></i> CIA-1 2026 Predicted
                  Paper
                </span>
                <span className="academic-pill">
                  <i className="fa-solid fa-pen-nib"></i> 300–400 Words Per
                  Answer
                </span>
                <span className="marks-pill">
                  <i className="fa-solid fa-award"></i> 5 Marks × 3 Questions
                </span>
              </div>
              <h3 className="callout-main-title">
                CSC-406 Professional Communication — Predicted Paper & In-Depth
                Solutions
              </h3>
              <p className="callout-desc">
                Complete university-standard model solutions for all 12
                questions (Phrases, Clauses, Creative Writing, Active Listening,
                Barriers of Speaking, Adjectives, Adverbs, Tenses, Descriptive
                Writing, Sentences, Empathy, Prejudgment). Read inline below or
                experience our dedicated study reader with text-to-speech audio
                and self-assessment quiz.
              </p>
            </div>
            <div className="callout-actions-side">
              <Link
                href="/professional-communication/cia1-predicted-paper"
                className="callout-btn primary"
              >
                <i className="fa-solid fa-headphones"></i>
                <span>Launch Audio Reader</span>
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
        <div className="tab-bar">
          <button
            className={`tab-btn ${activeTab === "predicted" ? "active" : ""}`}
            onClick={() => setActiveTab("predicted")}
          >
            <i className="fa-solid fa-graduation-cap"></i>
            <span>CIA-1 Predicted Paper</span>
            <span className="tab-pill hot-pill">12 Qs + Audio</span>
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
            <span>CIA Questions & Solutions</span>
            <span className="tab-pill">Assignments 01 & 02</span>
          </button>
          <button
            className={`tab-btn ${activeTab === "books" ? "active" : ""}`}
            onClick={() => setActiveTab("books")}
          >
            <i className="fa-solid fa-book"></i>
            <span>Prescribed Books (15)</span>
          </button>
          <button
            className={`tab-btn ${activeTab === "nptel" ? "active" : ""}`}
            onClick={() => setActiveTab("nptel")}
          >
            <i className="fa-solid fa-graduation-cap"></i>
            <span>Curated NPTEL Courses</span>
          </button>
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

              <div className="reader-cta-banner">
                <div className="reader-cta-text">
                  <div className="reader-cta-badge">
                    <i className="fa-solid fa-headphones"></i> Full Audio &
                    Study Experience
                  </div>
                  <h4>
                    Read with Interactive Audio Reader & Self-Assessment Quiz
                  </h4>
                  <p>
                    Experience all 12 model answers in our dedicated university
                    study reader featuring text-to-speech voice narration,
                    sticky table of contents, speed control, and an 8-question
                    practice quiz.
                  </p>
                </div>
                <div className="reader-cta-buttons">
                  <Link
                    href="/professional-communication/cia1-predicted-paper"
                    className="cta-primary-btn"
                  >
                    <i className="fa-solid fa-book-open-reader"></i>
                    <span>Launch Study Reader & Audio</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                  <Link
                    href="/curaj-msc-cs/assessments?course=6.0CSC04&id=sem1-comm-predicted-cia1"
                    className="cta-secondary-btn"
                  >
                    <i className="fa-solid fa-graduation-cap"></i>
                    <span>Open in Exam Solver</span>
                  </Link>
                </div>
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
                        <div className="q-badge-row">
                          <span className="q-num-pill">{q.qNumber}</span>
                          <span
                            className={`q-category-pill ${isCore ? "core" : "backup"}`}
                          >
                            {isCore
                              ? "Primary Question (Attempt Any 3)"
                              : "Alternative / Backup"}
                          </span>
                          <span className="q-marks-pill">{q.marks} Marks</span>
                          <span className="q-words-pill">300–400 Words</span>
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
                              : "Read In-Depth Model Answer (350+ Words)"}
                          </span>
                        </button>

                        <Link
                          href={`/professional-communication/cia1-predicted-paper#question-${q.qNumber.toLowerCase().replace("q", "")}`}
                          className="ans-listen-link"
                          title="Listen with Text-to-Speech Audio Reader"
                        >
                          <i className="fa-solid fa-volume-high"></i>
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
                            <i className="fa-brands fa-youtube"></i>
                            <span>
                              {isVideoOpen ? "Hide Video" : "Watch Lecture"}
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
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        :global(html.dark) .course-hero-card {
          background: #16181d;
          border-color: #272c35;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
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
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cia-quick-link:hover {
          background: rgba(16, 185, 129, 0.18);
          transform: translateY(-1px);
        }

        :global(html.dark) .cia-quick-link {
          background: rgba(16, 185, 129, 0.14);
          color: #34d399;
          border-color: rgba(16, 185, 129, 0.35);
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

        :global(html.dark) .outline-box {
          background: rgba(16, 185, 129, 0.08);
          border-left-color: #059669;
        }

        .outline-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #059669;
          font-size: 0.9rem;
          margin-bottom: 0.35rem;
        }

        :global(html.dark) .outline-header {
          color: #34d399;
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
          transition:
            border-color 0.2s,
            transform 0.15s;
        }

        .obj-card:hover {
          border-color: #10b981;
          transform: translateY(-1px);
        }

        :global(html.dark) .obj-card {
          background: #111317;
          border-color: #242933;
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
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.5rem;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 0.45rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }

        :global(html.dark) .tab-bar {
          background: #16181d;
          border-color: #272c35;
        }

        .tab-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          padding: 0.75rem 0.85rem;
          border-radius: 8px;
          font-size: 0.84rem;
          font-weight: 650;
          background: transparent;
          color: var(--text-secondary);
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
          line-height: 1.3;
        }

        .tab-btn:hover {
          color: var(--heading-color);
          background: var(--bg-light);
        }

        :global(html.dark) .tab-btn:hover {
          background: #20242c;
          color: #f3f4f6;
        }

        .tab-btn.active {
          color: #ffffff;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
        }

        .tab-pill {
          display: inline-flex;
          align-items: center;
          font-size: 0.68rem;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.22);
          color: #ffffff;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          white-space: nowrap;
          flex-shrink: 0;
          letter-spacing: 0.02em;
        }

        :global(html:not(.dark)) .tab-btn:not(.active) .tab-pill {
          background: rgba(16, 185, 129, 0.12);
          color: #059669;
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

        .btn-outline-sm {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.85rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 650;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-outline-sm:hover {
          border-color: #10b981;
          color: #059669;
          background: rgba(16, 185, 129, 0.05);
        }

        :global(html.dark) .btn-outline-sm {
          background: #181b22;
          border-color: #2a313d;
          color: #e5e7eb;
        }

        :global(html.dark) .btn-outline-sm:hover {
          color: #34d399;
          border-color: #10b981;
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

        :global(html.dark) .unit-card {
          background: #16181d;
          border-color: #272c35;
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

        :global(html.dark) .unit-number-pill {
          background: rgba(16, 185, 129, 0.16);
          color: #34d399;
          border-color: rgba(16, 185, 129, 0.3);
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

        :global(html.dark) .exam-tag {
          background: rgba(59, 130, 246, 0.15);
          color: #60a5fa;
          border-color: rgba(59, 130, 246, 0.3);
        }

        .toggle-icon {
          color: var(--text-muted);
          transition: transform 0.2s ease;
        }

        .toggle-icon.open {
          transform: rotate(180deg);
        }

        .unit-body {
          padding: 0.75rem 1.5rem 1.5rem 1.5rem;
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
          font-size: 0.85rem;
          color: var(--text-primary);
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          line-height: 1.45;
        }

        .topics-list li i {
          color: #10b981;
          font-size: 0.75rem;
          margin-top: 0.25rem;
          flex-shrink: 0;
        }

        .outcomes-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
          border-left: 4px solid #3b82f6;
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
          color: #3b82f6;
          margin-bottom: 0.5rem;
        }

        .outcomes-header h3 {
          margin: 0;
          font-size: 1.05rem;
          font-weight: 700;
        }

        .outcomes-card p {
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        /* CIA Showcase Card */
        .cia-showcase-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        }

        :global(html.dark) .cia-showcase-card {
          background: #16181d;
          border-color: #272c35;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
        }

        .cia-showcase-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1.5rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 1.5rem;
        }

        .available-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: #059669;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          margin-bottom: 0.5rem;
        }

        :global(html.dark) .available-badge {
          background: rgba(16, 185, 129, 0.16);
          color: #34d399;
          border-color: rgba(16, 185, 129, 0.35);
        }

        .cia-showcase-title {
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--heading-color);
          margin: 0 0 0.5rem 0;
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
          font-size: 0.925rem;
          max-width: 750px;
          line-height: 1.55;
        }

        .cia-action-buttons {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.15rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          font-weight: 600;
          font-size: 0.85rem;
          border-radius: 8px;
          text-decoration: none;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.25);
          transition: all 0.2s ease;
        }

        .btn-primary:hover {
          filter: brightness(1.08);
          transform: translateY(-1px);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.15rem;
          background: var(--surface);
          border: 1px solid #10b981;
          color: #059669;
          font-weight: 600;
          font-size: 0.85rem;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        :global(html.dark) .btn-secondary {
          background: #1e222a;
          color: #34d399;
          border-color: #059669;
        }

        .btn-secondary:hover {
          background: rgba(16, 185, 129, 0.1);
          transform: translateY(-1px);
        }

        /* Scanned Paper Preview Container */
        .paper-preview-container {
          background: var(--bg-light);
          border: 1px solid var(--border);
          border-radius: 12px;
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

        .paper-header-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .paper-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.825rem;
          font-weight: 700;
          color: var(--heading-color);
        }

        .paper-header-badge i {
          color: #10b981;
        }

        .paper-session-text {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 550;
        }

        .paper-header-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .paper-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.8rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 650;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .paper-toggle-btn:hover {
          border-color: #10b981;
          color: #059669;
          background: rgba(16, 185, 129, 0.05);
        }

        :global(html.dark) .paper-toggle-btn {
          background: #191c24;
          border-color: #29313d;
          color: #e5e7eb;
        }

        :global(html.dark) .paper-toggle-btn:hover {
          color: #34d399;
          border-color: #10b981;
        }

        .paper-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.4rem 0.75rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 650;
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .paper-action-btn:hover {
          border-color: var(--text-secondary);
          color: var(--heading-color);
        }

        :global(html.dark) .paper-action-btn {
          background: #191c24;
          border-color: #29313d;
          color: #9ca3af;
        }

        .paper-action-btn.download {
          color: #059669;
          border-color: rgba(16, 185, 129, 0.3);
          background: rgba(16, 185, 129, 0.08);
        }

        .paper-action-btn.download:hover {
          background: rgba(16, 185, 129, 0.16);
          border-color: #059669;
        }

        :global(html.dark) .paper-action-btn.download {
          color: #34d399;
          background: rgba(16, 185, 129, 0.14);
          border-color: rgba(16, 185, 129, 0.35);
        }

        .image-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #ffffff;
          border-radius: 8px;
          padding: 1rem;
          border: 1px solid var(--border);
          margin-top: 0.25rem;
        }

        :global(html.dark) .image-wrapper {
          background: #0f1013;
          border-color: #242933;
        }

        .image-wrapper-bar {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border);
        }

        .image-close-btn {
          background: none;
          border: none;
          color: #ef4444;
          font-size: 0.75rem;
          font-weight: 650;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }

        .image-clickable-link {
          display: block;
          max-width: 100%;
          cursor: zoom-in;
        }

        .paper-image {
          max-width: 100%;
          height: auto;
          object-fit: contain;
          border-radius: 4px;
        }

        /* Filter Switcher */
        .assignment-filter-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          padding: 0.35rem 0.5rem;
          background: var(--bg-light);
          border: 1px solid var(--border);
          border-radius: 10px;
        }

        :global(html.dark) .assignment-filter-bar {
          background: #111317;
          border-color: #242933;
        }

        .filter-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-muted);
          margin-right: 0.25rem;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.75rem;
          border-radius: 6px;
          border: 1px solid transparent;
          background: transparent;
          color: var(--text-secondary);
          font-size: 0.78rem;
          font-weight: 650;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-btn:hover {
          background: var(--surface);
          color: var(--heading-color);
        }

        :global(html.dark) .filter-btn:hover {
          background: #1a1e27;
          color: #f3f4f6;
        }

        .filter-btn.active {
          background: var(--surface);
          border-color: #10b981;
          color: #059669;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
        }

        :global(html.dark) .filter-btn.active {
          background: #1a1e27;
          color: #34d399;
          border-color: #10b981;
        }

        .count-pill {
          font-size: 0.68rem;
          font-weight: 700;
          padding: 0.1rem 0.4rem;
          border-radius: 9999px;
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
        }

        :global(html.dark) .count-pill {
          background: rgba(16, 185, 129, 0.2);
          color: #34d399;
        }

        /* Dual Grid - CRITICAL ALIGN-ITEMS FIX */
        .assignments-dual-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 1.5rem;
          align-items: start; /* Prevents empty dead space stretching when one column opens a video! */
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
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
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
          font-weight: 700;
          color: #3b82f6;
          text-decoration: none;
          padding: 0.25rem 0.55rem;
          border-radius: 5px;
          background: rgba(59, 130, 246, 0.08);
          border: 1px solid rgba(59, 130, 246, 0.2);
          transition: all 0.2s ease;
        }

        .header-direct-link:hover {
          background: rgba(59, 130, 246, 0.16);
          border-color: #3b82f6;
        }

        :global(html.dark) .header-direct-link {
          background: rgba(59, 130, 246, 0.14);
          color: #60a5fa;
          border-color: rgba(59, 130, 246, 0.3);
        }

        .criteria-pill {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 600;
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          margin-top: 0.25rem;
        }

        :global(html.dark) .criteria-pill {
          background: rgba(16, 185, 129, 0.16);
          color: #34d399;
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
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        :global(html.dark) .assignment-q-list li {
          background: #16181d;
          border-color: #272c35;
        }

        .assignment-q-list li:hover {
          border-color: #10b981;
        }

        .assignment-q-list li.video-open {
          border-color: #ef4444;
          box-shadow: 0 4px 16px rgba(239, 68, 68, 0.08);
        }

        :global(html.dark) .assignment-q-list li.video-open {
          border-color: #dc2626;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
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
          font-weight: 800;
          background: var(--surface);
          border: 1px solid var(--border);
          color: #10b981;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          flex-shrink: 0;
        }

        :global(html.dark) .q-badge {
          background: #1d212a;
          border-color: #2a313d;
          color: #34d399;
        }

        .q-video-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.28rem 0.65rem;
          font-size: 0.72rem;
          font-weight: 700;
          color: #ef4444;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.25);
          border-radius: 6px;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .q-video-toggle-btn:hover,
        .q-video-toggle-btn.active {
          background: #ef4444;
          color: #ffffff;
          border-color: #ef4444;
        }

        /* Inline Video Player Box */
        .inline-q-video-box {
          width: 100%;
          margin: 0.75rem auto 0;
          background: var(--bg-light);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 0.85rem;
          box-sizing: border-box;
        }

        :global(html.dark) .inline-q-video-box {
          background: #111317;
          border-color: #262c37;
        }

        .inline-q-video-meta {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          flex-wrap: wrap;
          margin-bottom: 0.4rem;
        }

        .meta-channel {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.7rem;
          font-weight: 650;
          color: #3b82f6;
          background: rgba(59, 130, 246, 0.1);
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }

        :global(html.dark) .meta-channel {
          background: rgba(59, 130, 246, 0.18);
          color: #60a5fa;
        }

        .meta-duration {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.7rem;
          font-weight: 550;
          color: var(--text-secondary);
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }

        :global(html.dark) .meta-duration {
          background: #1a1e27;
          border-color: #2a313d;
          color: #9ca3af;
        }

        .meta-speed {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.7rem;
          font-weight: 600;
          color: #d97706;
          background: rgba(245, 158, 11, 0.1);
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }

        :global(html.dark) .meta-speed {
          color: #fbbf24;
          background: rgba(245, 158, 11, 0.16);
        }

        .inline-q-video-title {
          font-size: 0.92rem;
          font-weight: 750;
          color: var(--heading-color);
          margin: 0 0 0.55rem;
          line-height: 1.35;
        }

        .inline-q-video-frame-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #000;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          margin-bottom: 0.55rem;
        }

        .inline-q-video-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .inline-q-video-footer {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          margin-top: 0.25rem;
        }

        .inline-q-video-relevance {
          font-size: 0.75rem;
          line-height: 1.4;
          color: var(--text-secondary);
          margin: 0;
        }

        .inline-q-video-relevance strong {
          color: #10b981;
        }

        .inline-q-video-takeaway {
          font-size: 0.75rem;
          line-height: 1.4;
          color: var(--text-muted);
          margin: 0;
        }

        .inline-q-video-takeaway strong {
          color: #3b82f6;
        }

        :global(html.dark) .inline-q-video-takeaway strong {
          color: #60a5fa;
        }

        .inline-q-video-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 0.35rem;
        }

        .inline-q-video-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.74rem;
          font-weight: 700;
          color: #ef4444;
          text-decoration: none;
          padding: 0.3rem 0.65rem;
          border-radius: 6px;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .inline-q-video-link:hover {
          background: rgba(239, 68, 68, 0.16);
          border-color: #ef4444;
        }

        :global(html.dark) .inline-q-video-link {
          background: rgba(239, 68, 68, 0.14);
          color: #f87171;
          border-color: rgba(239, 68, 68, 0.3);
        }

        .view-solutions-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.65rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--heading-color);
          font-size: 0.8rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .view-solutions-btn:hover {
          border-color: #10b981;
          color: #059669;
          background: rgba(16, 185, 129, 0.05);
        }

        :global(html.dark) .view-solutions-btn {
          background: #16181d;
          border-color: #272c35;
          color: #e5e7eb;
        }

        :global(html.dark) .view-solutions-btn:hover {
          border-color: #10b981;
          color: #34d399;
          background: rgba(16, 185, 129, 0.1);
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
            border-color 0.2s,
            transform 0.15s,
            box-shadow 0.2s;
        }

        :global(html.dark) .book-card {
          background: #16181d;
          border-color: #272c35;
        }

        .book-card:hover {
          border-color: #10b981;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
        }

        .book-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.25rem;
        }

        .book-category {
          font-size: 0.7rem;
          font-weight: 700;
          color: #8b5cf6;
          background: rgba(139, 92, 246, 0.1);
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
        }

        :global(html.dark) .book-category {
          background: rgba(139, 92, 246, 0.18);
          color: #a78bfa;
        }

        .book-num {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .book-title {
          font-size: 1rem;
          font-weight: 750;
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
          color: #10b981;
          font-size: 0.75rem;
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
          gap: 1.5rem;
        }

        .nptel-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1.25rem;
          transition:
            border-color 0.2s,
            transform 0.15s,
            box-shadow 0.2s;
        }

        :global(html.dark) .nptel-card {
          background: #16181d;
          border-color: #272c35;
        }

        .nptel-card:hover {
          border-color: #10b981;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
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

        :global(html.dark) .nptel-badge-inst {
          background: #111317;
          border-color: #242933;
          color: #9ca3af;
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

        :global(html.dark) .nptel-badge-weeks {
          background: #111317;
          border-color: #242933;
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

        /* Predicted Paper Hero Callout */
        .predicted-hero-callout {
          margin-bottom: 2rem;
        }

        .callout-glass-card {
          background: linear-gradient(
            135deg,
            rgba(37, 99, 235, 0.08) 0%,
            rgba(124, 58, 237, 0.08) 100%
          );
          border: 1px solid rgba(59, 130, 246, 0.25);
          border-radius: 16px;
          padding: 1.75rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.1);
        }

        :global(html.dark) .callout-glass-card {
          background: linear-gradient(
            135deg,
            rgba(30, 58, 138, 0.3) 0%,
            rgba(88, 28, 135, 0.3) 100%
          );
          border-color: rgba(96, 165, 250, 0.3);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
        }

        .callout-content-side {
          flex: 1;
        }

        .callout-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .featured-pill {
          background: #2563eb;
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .academic-pill {
          background: rgba(16, 185, 129, 0.15);
          color: #059669;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        :global(html.dark) .academic-pill {
          background: rgba(16, 185, 129, 0.25);
          color: #34d399;
        }

        .marks-pill {
          background: rgba(245, 158, 11, 0.15);
          color: #d97706;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        :global(html.dark) .marks-pill {
          background: rgba(245, 158, 11, 0.25);
          color: #fbbf24;
        }

        .callout-main-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        :global(html.dark) .callout-main-title {
          color: #f8fafc;
        }

        .callout-desc {
          font-size: 0.92rem;
          color: #475569;
          line-height: 1.5;
          margin: 0;
        }

        :global(html.dark) .callout-desc {
          color: #cbd5e1;
        }

        .callout-actions-side {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          min-width: 240px;
        }

        .callout-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: 10px;
          font-size: 0.88rem;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .callout-btn.primary {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: #ffffff;
          border: none;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        .callout-btn.primary:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }

        .callout-btn.secondary {
          background: #ffffff;
          color: #1e293b;
          border: 1px solid #cbd5e1;
        }

        :global(html.dark) .callout-btn.secondary {
          background: #1e293b;
          color: #f1f5f9;
          border-color: #334155;
        }

        .callout-btn.secondary:hover {
          background: #f8fafc;
          border-color: #94a3b8;
        }

        :global(html.dark) .callout-btn.secondary:hover {
          background: #334155;
        }

        .hot-pill {
          background: #ef4444 !important;
          color: #ffffff !important;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.75;
          }
        }

        /* Predicted Tab Content */
        .predicted-paper-header-box {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        :global(html.dark) .predicted-paper-header-box {
          background: #1e293b;
          border-color: #334155;
        }

        .paper-top-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }

        :global(html.dark) .paper-top-info {
          border-bottom-color: #334155;
        }

        .dept-tag {
          font-size: 0.85rem;
          font-weight: 700;
          color: #475569;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        :global(html.dark) .dept-tag {
          color: #94a3b8;
        }

        .paper-status-pills {
          display: flex;
          gap: 0.5rem;
        }

        .exam-pill,
        .session-pill {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
        }

        .exam-pill {
          background: rgba(37, 99, 235, 0.1);
          color: #2563eb;
        }

        :global(html.dark) .exam-pill {
          background: rgba(37, 99, 235, 0.25);
          color: #60a5fa;
        }

        .session-pill {
          background: rgba(100, 116, 139, 0.1);
          color: #475569;
        }

        :global(html.dark) .session-pill {
          background: rgba(100, 116, 139, 0.25);
          color: #cbd5e1;
        }

        .sub-title-tag {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #2563eb;
          margin-bottom: 0.25rem;
        }

        :global(html.dark) .sub-title-tag {
          color: #60a5fa;
        }

        .predicted-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.5rem;
          line-height: 1.25;
        }

        :global(html.dark) .predicted-title {
          color: #f8fafc;
        }

        .predicted-meta-desc {
          font-size: 0.95rem;
          color: #475569;
          margin-bottom: 1.5rem;
        }

        :global(html.dark) .predicted-meta-desc {
          color: #94a3b8;
        }

        .reader-cta-banner {
          background: linear-gradient(
            135deg,
            rgba(37, 99, 235, 0.06) 0%,
            rgba(16, 185, 129, 0.06) 100%
          );
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        :global(html.dark) .reader-cta-banner {
          background: linear-gradient(
            135deg,
            rgba(30, 58, 138, 0.2) 0%,
            rgba(6, 78, 59, 0.2) 100%
          );
          border-color: rgba(96, 165, 250, 0.2);
        }

        .reader-cta-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          font-weight: 800;
          color: #2563eb;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        :global(html.dark) .reader-cta-badge {
          color: #60a5fa;
        }

        .reader-cta-text h4 {
          font-size: 1.1rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }

        :global(html.dark) .reader-cta-text h4 {
          color: #f1f5f9;
        }

        .reader-cta-text p {
          font-size: 0.88rem;
          color: #64748b;
          margin: 0;
          line-height: 1.45;
        }

        :global(html.dark) .reader-cta-text p {
          color: #94a3b8;
        }

        .reader-cta-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          min-width: 220px;
        }

        .cta-primary-btn {
          background: #2563eb;
          color: #ffffff;
          padding: 0.65rem 1.1rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          transition: all 0.2s;
        }

        .cta-primary-btn:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
        }

        .cta-secondary-btn {
          background: #ffffff;
          color: #334155;
          border: 1px solid #cbd5e1;
          padding: 0.6rem 1.1rem;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          transition: all 0.2s;
        }

        :global(html.dark) .cta-secondary-btn {
          background: #1e293b;
          color: #cbd5e1;
          border-color: #334155;
        }

        .cta-secondary-btn:hover {
          background: #f1f5f9;
        }

        :global(html.dark) .cta-secondary-btn:hover {
          background: #334155;
        }

        .predicted-filter-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
        }

        :global(html.dark) .predicted-filter-bar {
          border-top-color: #334155;
        }

        .filter-pill-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        :global(html.dark) .filter-pill-label {
          color: #94a3b8;
        }

        .filter-pill-buttons {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .filter-pill-btn {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          color: #475569;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.4rem 0.85rem;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.15s;
        }

        :global(html.dark) .filter-pill-btn {
          background: #0f172a;
          border-color: #334155;
          color: #94a3b8;
        }

        .filter-pill-btn.active {
          background: #2563eb;
          border-color: #2563eb;
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
          gap: 1.5rem;
        }

        .predicted-q-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 1.5rem 1.75rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
          transition: border-color 0.2s;
        }

        :global(html.dark) .predicted-q-card {
          background: #1e293b;
          border-color: #334155;
        }

        .predicted-q-card.expanded {
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
        }

        .q-badge-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .q-num-pill {
          background: #2563eb;
          color: #ffffff;
          font-size: 0.78rem;
          font-weight: 800;
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
        }

        .q-category-pill {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
        }

        .q-category-pill.core {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
        }

        :global(html.dark) .q-category-pill.core {
          background: rgba(16, 185, 129, 0.25);
          color: #34d399;
        }

        .q-category-pill.backup {
          background: rgba(100, 116, 139, 0.1);
          color: #475569;
        }

        :global(html.dark) .q-category-pill.backup {
          background: rgba(100, 116, 139, 0.25);
          color: #cbd5e1;
        }

        .q-marks-pill {
          background: rgba(245, 158, 11, 0.1);
          color: #d97706;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
        }

        :global(html.dark) .q-marks-pill {
          background: rgba(245, 158, 11, 0.25);
          color: #fbbf24;
        }

        .q-words-pill {
          background: rgba(99, 102, 241, 0.1);
          color: #4f46e5;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
        }

        :global(html.dark) .q-words-pill {
          background: rgba(99, 102, 241, 0.25);
          color: #a5b4fc;
        }

        .predicted-q-text {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }

        :global(html.dark) .predicted-q-text {
          color: #f8fafc;
        }

        .predicted-q-summary {
          font-size: 0.9rem;
          color: #475569;
          line-height: 1.5;
          margin: 0 0 1rem 0;
        }

        :global(html.dark) .predicted-q-summary {
          color: #cbd5e1;
        }

        .predicted-q-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .ans-toggle-btn {
          background: #2563eb;
          color: #ffffff;
          border: none;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          transition: all 0.15s;
        }

        .ans-toggle-btn:hover {
          background: #1d4ed8;
        }

        .ans-toggle-btn.active {
          background: #0f172a;
        }

        :global(html.dark) .ans-toggle-btn.active {
          background: #334155;
        }

        .ans-listen-link {
          background: rgba(37, 99, 235, 0.1);
          color: #2563eb;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 0.5rem 0.9rem;
          border-radius: 8px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          transition: all 0.15s;
        }

        :global(html.dark) .ans-listen-link {
          background: rgba(37, 99, 235, 0.25);
          color: #60a5fa;
        }

        .ans-listen-link:hover {
          background: #2563eb;
          color: #ffffff;
        }

        .ans-video-btn {
          background: #fee2e2;
          color: #dc2626;
          border: none;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 0.5rem 0.9rem;
          border-radius: 8px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          transition: all 0.15s;
        }

        :global(html.dark) .ans-video-btn {
          background: rgba(220, 38, 38, 0.25);
          color: #f87171;
        }

        .ans-video-btn:hover,
        .ans-video-btn.active {
          background: #dc2626;
          color: #ffffff;
        }

        /* Inline Video Player */
        .inline-video-wrap {
          margin-top: 1rem;
          padding: 1rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
        }

        :global(html.dark) .inline-video-wrap {
          background: #0f172a;
          border-color: #334155;
        }

        .video-meta-top {
          display: flex;
          gap: 1rem;
          font-size: 0.78rem;
          font-weight: 700;
          color: #64748b;
          margin-bottom: 0.4rem;
        }

        :global(html.dark) .video-meta-top {
          color: #94a3b8;
        }

        .inline-video-wrap h5 {
          font-size: 0.95rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.75rem;
        }

        :global(html.dark) .inline-video-wrap h5 {
          color: #f1f5f9;
        }

        .iframe-box {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          border-radius: 8px;
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
          font-size: 0.85rem;
          color: #334155;
          margin: 0.75rem 0 0 0;
          background: rgba(59, 130, 246, 0.08);
          padding: 0.6rem 0.85rem;
          border-radius: 6px;
        }

        :global(html.dark) .video-takeaway {
          color: #cbd5e1;
          background: rgba(59, 130, 246, 0.15);
        }

        /* In-Depth Model Solution Body */
        .predicted-solution-box {
          margin-top: 1.25rem;
          padding-top: 1.25rem;
          border-top: 1px dashed #cbd5e1;
          animation: fadeIn 0.25s ease-out;
        }

        :global(html.dark) .predicted-solution-box {
          border-top-color: #475569;
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
          background: rgba(16, 185, 129, 0.06);
          border-left: 4px solid #10b981;
          padding: 1rem 1.25rem;
          border-radius: 0 8px 8px 0;
          margin-bottom: 1.25rem;
        }

        :global(html.dark) .solution-key-points {
          background: rgba(16, 185, 129, 0.12);
        }

        .solution-key-points h4 {
          font-size: 0.92rem;
          font-weight: 800;
          color: #065f46;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        :global(html.dark) .solution-key-points h4 {
          color: #34d399;
        }

        .solution-key-points ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .solution-key-points li {
          font-size: 0.88rem;
          color: #1e293b;
          line-height: 1.45;
          display: flex;
          gap: 0.4rem;
        }

        :global(html.dark) .solution-key-points li {
          color: #e2e8f0;
        }

        .bullet-arrow {
          color: #10b981;
          font-weight: bold;
        }

        .solution-detailed-text {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1.25rem;
        }

        :global(html.dark) .solution-detailed-text {
          background: #0f172a;
          border-color: #334155;
        }

        .solution-detailed-text h4 {
          font-size: 0.95rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        :global(html.dark) .solution-detailed-text h4 {
          color: #f1f5f9;
          border-bottom-color: #334155;
        }

        .text-paragraphs {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .paragraph-spacer {
          height: 0.4rem;
        }

        .sol-subheading {
          font-size: 0.92rem;
          font-weight: 800;
          color: #2563eb;
          margin-top: 0.4rem;
          margin-bottom: 0.15rem;
        }

        :global(html.dark) .sol-subheading {
          color: #60a5fa;
        }

        .sol-paragraph {
          font-size: 0.88rem;
          color: #334155;
          line-height: 1.6;
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
          gap: 1rem;
          padding-top: 0.75rem;
        }

        .exam-compliance-tag {
          font-size: 0.8rem;
          font-weight: 700;
          color: #059669;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        :global(html.dark) .exam-compliance-tag {
          color: #34d399;
        }

        .launch-full-reader-btn {
          font-size: 0.82rem;
          font-weight: 700;
          color: #2563eb;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          transition: color 0.15s;
        }

        :global(html.dark) .launch-full-reader-btn {
          color: #60a5fa;
        }

        .launch-full-reader-btn:hover {
          color: #1d4ed8;
          text-decoration: underline;
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
            font-size: 0.78rem;
            padding: 0.65rem 0.5rem;
          }
          .cia-showcase-card {
            padding: 1.25rem;
          }
          .cia-action-buttons {
            width: 100%;
          }
          .btn-primary,
          .btn-secondary {
            flex: 1;
            justify-content: center;
            text-align: center;
          }
          .q-item-header {
            flex-direction: column;
          }
          .q-video-toggle-btn {
            align-self: flex-start;
            margin-top: 0.35rem;
          }
        }
      `}</style>
    </div>
  );
}
