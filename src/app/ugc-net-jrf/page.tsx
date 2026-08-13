"use client";

import { useState } from "react";
import Link from "next/link";

interface Unit {
  id: number;
  paper: "Paper 1" | "Paper 2";
  unit: string;
  topics: string;
  description: string;
  nptelTitle: string;
  nptelUrl: string;
}

export default function UgcNetJrfPage() {
  const [selectedPaper, setSelectedPaper] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const units: Unit[] = [
    // --- PAPER 1: General Paper on Teaching & Research Aptitude ---
    {
      id: 1,
      paper: "Paper 1",
      unit: "Paper I - Unit 1: Teaching Aptitude",
      topics: "Concepts, Objectives, Levels of Teaching (Memory, Understanding, Reflective), Learner Characteristics, Factors Affecting Teaching, Support Systems, Evaluation Systems.",
      description: "Teaching methods, offline vs online methods (SWAYAM, SWAYAMPRABHA, MOOCs), Choice Based Credit System (CBCS), and Computer Based Testing (CBT).",
      nptelTitle: "Kumar Bharat: Teaching Aptitude — Foundation Course",
      nptelUrl: "https://www.youtube.com/@KumarBharat/playlists",
    },
    {
      id: 2,
      paper: "Paper 1",
      unit: "Paper I - Unit 2: Research Aptitude",
      topics: "Meaning, Types & Characteristics of Research, Positivism & Post-positivistic approach, Experimental/Descriptive/Qualitative Methods, Thesis Writing, ICT in Research, Ethics.",
      description: "Formulating research problems, hypotheses, sampling techniques, APA/MLA referencing, plagiarism, and application of ICT tools in data collection.",
      nptelTitle: "NPTEL: Research Methodology (IIT Madras / IIT Kanpur)",
      nptelUrl: "https://nptel.ac.in/courses/121106007",
    },
    {
      id: 3,
      paper: "Paper 1",
      unit: "Paper I - Unit 3: Comprehension",
      topics: "Reading Comprehension Passages, Analytical Questions, Contextual Vocabulary, Critical Passage Inference.",
      description: "Techniques for rapid reading, extracting central arguments, answering fact-based and inference-based comprehension questions.",
      nptelTitle: "Kumar Bharat: Reading Comprehension — Foundation Course",
      nptelUrl: "https://www.youtube.com/@KumarBharat/playlists",
    },
    {
      id: 4,
      paper: "Paper 1",
      unit: "Paper I - Unit 4: Communication",
      topics: "Meaning, Types & Characteristics of Communication, Verbal & Non-verbal, Classroom Communication, Barriers to Communication, Mass-Media & Society.",
      description: "Effective interpersonal and intercultural communication, overcoming psychological/physical barriers, and media impact.",
      nptelTitle: "Kumar Bharat: Communication — Foundation Course",
      nptelUrl: "https://www.youtube.com/@KumarBharat/playlists",
    },
    {
      id: 5,
      paper: "Paper 1",
      unit: "Paper I - Unit 5: Mathematical Reasoning & Aptitude",
      topics: "Types of Reasoning, Number Series, Code-Decoding, Relationships, Fractions, Time & Distance, Ratio, Percentage, Profit & Loss, Simple/Compound Interest, Averages.",
      description: "Shortcuts for speed math, quantitative problem solving, seating arrangement, blood relations, and distance-speed problems.",
      nptelTitle: "Kumar Bharat: Maths, Reasoning & DI — Foundation Course",
      nptelUrl: "https://www.youtube.com/@KumarBharat/playlists",
    },
    {
      id: 6,
      paper: "Paper 1",
      unit: "Paper I - Unit 6: Logical Reasoning",
      topics: "Structure of Arguments, Deductive & Inductive Reasoning, Venn Diagrams, Indian Logic (Pramanas: Pratyaksha, Anumana, Upamana, Shabda, Arthapatti, Anupalabdhi), Hetvabhasa.",
      description: "Categorical propositions, formal and informal fallacies, classical square of opposition, and Indian Epistemology.",
      nptelTitle: "NPTEL: Symbolic Logic & Mathematical Logic (IIT Kharagpur)",
      nptelUrl: "https://nptel.ac.in/courses/109105121",
    },
    {
      id: 7,
      paper: "Paper 1",
      unit: "Paper I - Unit 7: Data Interpretation (DI)",
      topics: "Sources & Classification of Data, Bar-Charts, Histograms, Pie-Charts, Table-Charts, Line-Charts, Data & Governance.",
      description: "Calculations based on data sets, percentage growth, ratio comparisons, data visualization analysis, and tabular interpretation.",
      nptelTitle: "Kumar Bharat: Data Interpretation — Complete Lecture",
      nptelUrl: "https://www.youtube.com/@KumarBharat/playlists",
    },
    {
      id: 8,
      paper: "Paper 1",
      unit: "Paper I - Unit 8: Information & Communication Technology (ICT)",
      topics: "ICT Terminology & Abbreviations, Basics of Internet/Intranet, E-mail, Audio/Video Conferencing, Digital Initiatives in Higher Education, ICT & Governance.",
      description: "Computer memory (RAM/ROM), IP/MAC addresses, malware/phishing threats, digital initiatives (SWAYAM, e-PG Pathshala, National Digital Library), and e-governance.",
      nptelTitle: "Kumar Bharat: ICT — Foundation Course",
      nptelUrl: "https://www.youtube.com/@KumarBharat/playlists",
    },
    {
      id: 9,
      paper: "Paper 1",
      unit: "Paper I - Unit 9: People, Development & Environment",
      topics: "Millennium & Sustainable Development Goals (MDGs & SDGs), Human-Environment Interaction, Environmental Pollution, Climate Change, Natural Disasters, Environmental Protection Act.",
      description: "Air, water, noise pollution, renewable energy sources (Solar, Wind, Hydro), Paris Agreement, Montreal Protocol, and Rio Summit.",
      nptelTitle: "NPTEL: Ecology and Environment (IIT Madras)",
      nptelUrl: "https://nptel.ac.in/courses/109106137",
    },
    {
      id: 10,
      paper: "Paper 1",
      unit: "Paper I - Unit 10: Higher Education System",
      topics: "Institutions of Higher Learning in Ancient India (Takshashila, Nalanda), Post-Independence Evolution, Value & Environmental Education, Policies, Governance & Administration.",
      description: "UGC, AICTE, NAAC accreditation, NIRF rankings, National Education Policy (NEP 2020), and higher education governance framework.",
      nptelTitle: "Kumar Bharat: Higher Education — Foundation Course",
      nptelUrl: "https://www.youtube.com/@KumarBharat/playlists",
    },

    // --- PAPER 2: Computer Science & Applications ---
    {
      id: 11,
      paper: "Paper 2",
      unit: "Paper II - Unit 1: Discrete Structures & Optimization",
      topics: "Mathematical Logic, Sets, Relations, Functions, Group Theory, Graph Theory, Optimization & Linear Programming.",
      description: "Foundational logic, counting principles, posets, lattices, Boolean algebra, graph coloring, and simplex method optimization.",
      nptelTitle: "NPTEL: Discrete Mathematics (IIT Ropar)",
      nptelUrl: "https://nptel.ac.in/courses/106106183",
    },
    {
      id: 12,
      paper: "Paper 2",
      unit: "Paper II - Unit 2: Computer System Architecture",
      topics: "Digital Logic Circuits, Data Representation, Register Transfer, Microoperations, Pipeline & Vector Processing.",
      description: "K-map minimization, instruction cycle, memory hierarchy, cache mapping, hazard handling, and multiprocessors.",
      nptelTitle: "NPTEL: Computer Architecture (IIT Delhi)",
      nptelUrl: "https://nptel.ac.in/courses/106102062",
    },
    {
      id: 13,
      paper: "Paper 2",
      unit: "Paper II - Unit 3: Programming Languages & Computer Graphics",
      topics: "Language Design, OOP (C++, Java), Web Programming, 2D/3D Transformations, Rendering & Clipping.",
      description: "Grammars, storage management, parameter passing, graphics pipelines, Bresenham's algorithms, and 3D projections.",
      nptelTitle: "NPTEL: Computer Graphics (IIT Madras)",
      nptelUrl: "https://nptel.ac.in/courses/106106090",
    },
    {
      id: 14,
      paper: "Paper 2",
      unit: "Paper II - Unit 4: Database Management Systems",
      topics: "ER Model, Relational Algebra, SQL, Normalization, Transaction & Concurrency Control, NoSQL Databases.",
      description: "Functional dependencies, 1NF to 5NF, B/B+ trees, serializability, 2PL, deadlock handling, and NoSQL concepts.",
      nptelTitle: "NPTEL: Database Management System (IIT Kharagpur)",
      nptelUrl: "https://nptel.ac.in/courses/106105175",
    },
    {
      id: 15,
      paper: "Paper 2",
      unit: "Paper II - Unit 5: System Software & Operating Systems",
      topics: "Process Management, Deadlocks, Memory Management, File Systems, Unix/Linux Commands & Virtualization.",
      description: "Process synchronization, semaphores, Banker's algorithm, paging/segmentation, page replacement, and shell scripts.",
      nptelTitle: "NPTEL: Operating Systems (IIT Kharagpur)",
      nptelUrl: "https://nptel.ac.in/courses/106105214",
    },
    {
      id: 16,
      paper: "Paper 2",
      unit: "Paper II - Unit 6: Software Engineering",
      topics: "Software Process Models, Requirements Engineering, Software Design, Testing & Quality Assurance, Agile & DevOps.",
      description: "Waterfall, Spiral, Agile Scrum, SRS, COCOMO model, Cyclomatic complexity, black/white box testing, and DevOps CI/CD.",
      nptelTitle: "NPTEL: Software Engineering (IIT Kharagpur)",
      nptelUrl: "https://nptel.ac.in/courses/106105182",
    },
    {
      id: 17,
      paper: "Paper 2",
      unit: "Paper II - Unit 7: Data Structures & Algorithms",
      topics: "Arrays, Trees, Graphs, Sorting & Searching, Asymptotic Notation, Greedy, Dynamic Programming, NP-Completeness.",
      description: "Time/space complexity analysis, BSTs, AVL, Heaps, Dijkstra, Floyd-Warshall, Kruskal, Prim, and NP-hard reductions.",
      nptelTitle: "NPTEL: Programming, Data Structures & Algorithms (CMI)",
      nptelUrl: "https://nptel.ac.in/courses/106106145",
    },
    {
      id: 18,
      paper: "Paper 2",
      unit: "Paper II - Unit 8: Theory of Computation & Compilers",
      topics: "Regular Expressions, Finite Automata, Context-Free Grammars, Turing Machines, Lexical Analysis, Parsing & Code Generation.",
      description: "DFA/NFA, Pumping Lemma, PDA, Turing Machine halting problem, LL(1), LR parsing, syntax-directed translation, and DAG.",
      nptelTitle: "NPTEL: Theory of Computation (IIT Kanpur)",
      nptelUrl: "https://nptel.ac.in/courses/106104148",
    },
    {
      id: 19,
      paper: "Paper 2",
      unit: "Paper II - Unit 9: Data Communication & Networks",
      topics: "OSI & TCP/IP Reference Models, Routing Algorithms, IP Addressing (IPv4/IPv6), Network Security & Cryptography.",
      description: "Framing, error control, distance vector/link state routing, subnetting, CIDR, TCP congestion control, RSA, and firewalls.",
      nptelTitle: "NPTEL: Computer Networks and Internet Protocol (IIT Kharagpur)",
      nptelUrl: "https://nptel.ac.in/courses/106105183",
    },
    {
      id: 20,
      paper: "Paper 2",
      unit: "Paper II - Unit 10: Artificial Intelligence (AI)",
      topics: "Search Strategies, Knowledge Representation, Fuzzy Logic, Artificial Neural Networks, Natural Language Processing.",
      description: "A* search, alpha-beta pruning, propositional/predicate logic, membership functions, perceptrons, backpropagation, and NLP POS tagging.",
      nptelTitle: "NPTEL: An Introduction to Artificial Intelligence (IIT Madras)",
      nptelUrl: "https://nptel.ac.in/courses/106106126",
    },
  ];

  const filteredUnits = units.filter((u) => {
    const matchesPaper = selectedPaper === "All" || u.paper === selectedPaper;
    const matchesSearch =
      u.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.topics.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPaper && matchesSearch;
  });

  return (
    <div className="page-container">
      {/* Top Header */}
      <header className="page-header">
        <Link href="/" className="back-btn" title="Back to Portfolio">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <div className="header-titles">
          <div className="badge-row">
            <span className="badge">National Eligibility Test</span>
            <span className="badge badge-accent">Paper I & Paper II</span>
          </div>
          <h1 className="main-title">UGC NET JRF — Complete Syllabus & NPTEL Study Guide</h1>
        </div>
      </header>

      <main className="content-wrapper">
        {/* Intro Card */}
        <section className="intro-card">
          <div className="intro-content">
            <h2>Complete UGC NET JRF Preparation Hub (Paper 1 + Paper 2)</h2>
            <p>
              Comprehensive syllabus coverage for both <strong>Paper I (General Teaching & Research Aptitude)</strong> and <strong>Paper II (Computer Science & Applications)</strong>. Paper I units link to <strong>Kumar Bharat&apos;s YouTube Foundation Courses</strong> (best free resource for Paper 1). Paper II units link to <strong>NPTEL / SWAYAM video courses</strong> from top IITs.
            </p>
          </div>
        </section>

        {/* Paper Tabs & Search */}
        <section className="controls-bar">
          <div className="tabs">
            {["All", "Paper 1", "Paper 2"].map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPaper(p)}
                className={`tab-btn ${selectedPaper === p ? "active" : ""}`}
              >
                {p === "All"
                  ? "All Units (20 Units)"
                  : p === "Paper 1"
                  ? "Paper I: General Aptitude (10 Units)"
                  : "Paper II: Computer Science (10 Units)"}
              </button>
            ))}
          </div>

          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input
              type="text"
              placeholder="Search Paper I or Paper II topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </section>

        {/* Units Grid */}
        <section className="units-grid">
          {filteredUnits.map((u) => (
            <div key={u.id} className="unit-card">
              <div className="card-top">
                <span className={`paper-badge ${u.paper === "Paper 1" ? "p1-badge" : "p2-badge"}`}>
                  {u.paper}
                </span>
                <span className="exam-tag">UGC NET JRF</span>
              </div>

              <h3 className="unit-title">{u.unit}</h3>
              <p className="unit-desc">{u.description}</p>

              <div className="topics-box">
                <h4 className="topics-heading">
                  <i className="fa-solid fa-book-open"></i> Key Syllabus Topics
                </h4>
                <p className="topics-text">{u.topics}</p>
              </div>

              {/* Study Resource Link Button */}
              <div className="card-action">
                <a
                  href={u.nptelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`nptel-btn ${u.paper === "Paper 1" ? "p1-btn" : "p2-btn"}`}
                >
                  <i className={u.nptelUrl.includes("youtube.com") ? "fa-brands fa-youtube" : "fa-solid fa-graduation-cap"}></i>
                  <span>Study {u.nptelTitle}</span>
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              </div>
            </div>
          ))}
        </section>

        {/* PYQ & Mock Test Resources */}
        <section className="resources-section">
          <h2 className="resources-title">
            <i className="fa-solid fa-clipboard-question"></i> PYQ & Mock Tests
          </h2>
          <p className="resources-subtitle">
            Practice with previous year papers and free mock tests to boost your exam readiness.
          </p>
          <div className="resources-grid">
            {[
              { name: "Kumar Bharat — PYQs with Explanation", desc: "Video solutions for Paper 1 & Paper 2 previous year questions.", url: "https://www.youtube.com/@KumarBharat/playlists", icon: "fa-brands fa-youtube", color: "#dc2626" },
              { name: "Testbook — Mock Tests", desc: "Free full-length CBT mock tests with performance analysis.", url: "https://testbook.com/ugc-net", icon: "fa-solid fa-file-circle-check", color: "#2563eb" },
              { name: "NTA Official — Previous Year Papers", desc: "Download official NTA question papers and answer keys.", url: "https://ugcnet.nta.ac.in/", icon: "fa-solid fa-landmark", color: "#7c3aed" },
              { name: "Adda247 — Free Mock Series", desc: "Memory-based and unit-wise practice sets with analytics.", url: "https://www.adda247.com/teaching-jobs-exam/ugc-net/", icon: "fa-solid fa-chart-line", color: "#ea580c" },
              { name: "BYJU'S Exam Prep — UGC NET CS", desc: "Unit-wise practice sets, mock tests, and previous year papers.", url: "https://byjusexamprep.com/ugc-net-exam/computer-science", icon: "fa-solid fa-graduation-cap", color: "#0891b2" },
            ].map((r, idx) => (
              <a key={idx} href={r.url} target="_blank" rel="noopener noreferrer" className="resource-card">
                <div className="resource-icon" style={{ background: r.color }}>
                  <i className={r.icon}></i>
                </div>
                <div className="resource-info">
                  <h4 className="resource-name">{r.name}</h4>
                  <p className="resource-desc-text">{r.desc}</p>
                </div>
                <i className="fa-solid fa-arrow-up-right-from-square resource-arrow"></i>
              </a>
            ))}
          </div>
        </section>
      </main>

      <style jsx>{`
        .page-container {
          min-height: 100vh;
          background: #fafafa;
          padding: 2rem;
          max-width: 1240px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .back-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #fff;
          border: 1px solid #e5e7eb;
          color: #374151;
          text-decoration: none;
          transition: all 0.2s;
        }
        .back-btn:hover {
          background: #f3f4f6;
          color: #111827;
        }

        .badge-row {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.35rem;
        }

        .badge {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #059669;
          background: #ecfdf5;
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
        }

        .badge-accent {
          color: #2563eb;
          background: #eff6ff;
        }

        .main-title {
          font-size: 1.65rem;
          font-weight: 800;
          color: #111827;
          margin: 0;
        }

        .content-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .intro-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 2rem;
        }

        .intro-content h2 {
          font-size: 1.35rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 0.5rem 0;
        }

        .intro-content p {
          color: #4b5563;
          line-height: 1.6;
          margin: 0;
          font-size: 0.95rem;
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
        }

        .tab-btn {
          padding: 0.55rem 1rem;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          background: #fff;
          color: #4b5563;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab-btn:hover {
          background: #f3f4f6;
          color: #111827;
        }

        .tab-btn.active {
          background: #059669;
          color: #fff;
          border-color: #059669;
        }

        .search-box {
          position: relative;
          min-width: 280px;
        }

        .search-icon {
          position: absolute;
          left: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          font-size: 0.85rem;
        }

        .search-input {
          width: 100%;
          padding: 0.55rem 0.85rem 0.55rem 2.25rem;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          background: #fff;
          font-size: 0.85rem;
          outline: none;
        }
        .search-input:focus {
          border-color: #059669;
        }

        .units-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .unit-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .unit-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
        }

        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .paper-badge {
          font-size: 0.75rem;
          font-weight: 800;
          padding: 0.2rem 0.6rem;
          border-radius: 5px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .p1-badge {
          color: #d97706;
          background: #fffbeb;
        }

        .p2-badge {
          color: #059669;
          background: #ecfdf5;
        }

        .exam-tag {
          font-size: 0.7rem;
          font-weight: 700;
          color: #6b7280;
          background: #f3f4f6;
          padding: 0.2rem 0.55rem;
          border-radius: 5px;
        }

        .unit-title {
          font-size: 1.12rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 0.5rem 0;
          line-height: 1.35;
        }

        .unit-desc {
          font-size: 0.88rem;
          color: #4b5563;
          line-height: 1.55;
          margin: 0 0 1.25rem 0;
        }

        .topics-box {
          background: #fafafa;
          border: 1px solid #f3f4f6;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.25rem;
          flex: 1;
        }

        .topics-heading {
          font-size: 0.75rem;
          font-weight: 700;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0 0 0.4rem 0;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .topics-text {
          font-size: 0.85rem;
          color: #374151;
          line-height: 1.5;
          margin: 0;
        }

        .card-action {
          margin-top: auto;
        }

        .nptel-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 1rem;
          color: #fff;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.82rem;
          transition: background 0.2s;
        }

        .p1-btn {
          background: #b45309;
        }
        .p1-btn:hover {
          background: #92400e;
        }

        .p2-btn {
          background: #065f46;
        }
        .p2-btn:hover {
          background: #047857;
        }

        .nptel-btn span {
          flex: 1;
          margin-left: 0.6rem;
        }

        .resources-section {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 2rem;
        }
        .resources-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 0.35rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .resources-subtitle {
          color: #6b7280;
          font-size: 0.9rem;
          margin: 0 0 1.25rem 0;
        }
        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1rem;
        }
        .resource-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.15rem;
          background: #fafafa;
          border: 1px solid #f3f4f6;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.2s;
        }
        .resource-card:hover {
          background: #f3f4f6;
          border-color: #d1d5db;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .resource-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1rem;
          flex-shrink: 0;
        }
        .resource-info { flex: 1; min-width: 0; }
        .resource-name {
          font-size: 0.88rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 0.2rem 0;
        }
        .resource-desc-text {
          font-size: 0.78rem;
          color: #6b7280;
          margin: 0;
          line-height: 1.4;
        }
        .resource-arrow {
          color: #9ca3af;
          font-size: 0.75rem;
          flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .page-container {
            padding: 1rem;
          }
          .units-grid {
            grid-template-columns: 1fr;
          }
          .controls-bar {
            flex-direction: column;
            align-items: stretch;
          }
          .search-box {
            min-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
