"use client";

import { useState } from "react";
import Link from "next/link";

interface Unit {
  id: number;
  unit: string;
  topics: string;
  description: string;
  nptelTitle: string;
  nptelUrl: string;
}

export default function UgcNetJrfPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const units: Unit[] = [
    {
      id: 1,
      unit: "Unit 1: Discrete Structures & Optimization",
      topics: "Mathematical Logic, Sets, Relations, Functions, Group Theory, Graph Theory, Optimization & Linear Programming.",
      description: "Foundational logic, counting principles, posets, lattices, Boolean algebra, graph coloring, and simplex method optimization.",
      nptelTitle: "NPTEL: Discrete Mathematics (IIT Ropar)",
      nptelUrl: "https://nptel.ac.in/courses/106106183",
    },
    {
      id: 2,
      unit: "Unit 2: Computer System Architecture",
      topics: "Digital Logic Circuits, Data Representation, Register Transfer, Microoperations, Pipeline & Vector Processing.",
      description: "K-map minimization, instruction cycle, memory hierarchy, cache mapping, hazard handling, and multiprocessors.",
      nptelTitle: "NPTEL: Computer Architecture (IIT Delhi)",
      nptelUrl: "https://nptel.ac.in/courses/106102062",
    },
    {
      id: 3,
      unit: "Unit 3: Programming Languages & Computer Graphics",
      topics: "Language Design, OOP (C++, Java), Web Programming, 2D/3D Transformations, Rendering & Clipping.",
      description: "Grammars, storage management, parameter passing, graphics pipelines, Bresenham's algorithms, and 3D projections.",
      nptelTitle: "NPTEL: Computer Graphics (IIT Madras)",
      nptelUrl: "https://nptel.ac.in/courses/106106090",
    },
    {
      id: 4,
      unit: "Unit 4: Database Management Systems",
      topics: "ER Model, Relational Algebra, SQL, Normalization, Transaction & Concurrency Control, NoSQL Databases.",
      description: "Functional dependencies, 1NF to 5NF, B/B+ trees, serializability, 2PL, deadlock handling, and NoSQL concepts.",
      nptelTitle: "NPTEL: Database Management System (IIT Kharagpur)",
      nptelUrl: "https://nptel.ac.in/courses/106105175",
    },
    {
      id: 5,
      unit: "Unit 5: System Software & Operating Systems",
      topics: "Process Management, Deadlocks, Memory Management, File Systems, Unix/Linux Commands & Virtualization.",
      description: "Process synchronization, semaphores, Banker's algorithm, paging/segmentation, page replacement, and shell scripts.",
      nptelTitle: "NPTEL: Operating Systems (IIT Kharagpur)",
      nptelUrl: "https://nptel.ac.in/courses/106105214",
    },
    {
      id: 6,
      unit: "Unit 6: Software Engineering",
      topics: "Software Process Models, Requirements Engineering, Software Design, Testing & Quality Assurance, Agile & DevOps.",
      description: "Waterfall, Spiral, Agile Scrum, SRS, COCOMO model, Cyclomatic complexity, black/white box testing, and DevOps CI/CD.",
      nptelTitle: "NPTEL: Software Engineering (IIT Kharagpur)",
      nptelUrl: "https://nptel.ac.in/courses/106105182",
    },
    {
      id: 7,
      unit: "Unit 7: Data Structures & Algorithms",
      topics: "Arrays, Trees, Graphs, Sorting & Searching, Asymptotic Notation, Greedy, Dynamic Programming, NP-Completeness.",
      description: "Time/space complexity analysis, BSTs, AVL, Heaps, Dijkstra, Floyd-Warshall, Kruskal, Prim, and NP-hard reductions.",
      nptelTitle: "NPTEL: Programming, Data Structures & Algorithms (CMI)",
      nptelUrl: "https://nptel.ac.in/courses/106106145",
    },
    {
      id: 8,
      unit: "Unit 8: Theory of Computation & Compilers",
      topics: "Regular Expressions, Finite Automata, Context-Free Grammars, Turing Machines, Lexical Analysis, Parsing & Code Generation.",
      description: "DFA/NFA, Pumping Lemma, PDA, Turing Machine halting problem, LL(1), LR parsing, syntax-directed translation, and DAG.",
      nptelTitle: "NPTEL: Theory of Computation (IIT Kanpur)",
      nptelUrl: "https://nptel.ac.in/courses/106104148",
    },
    {
      id: 9,
      unit: "Unit 9: Data Communication & Networks",
      topics: "OSI & TCP/IP Reference Models, Routing Algorithms, IP Addressing (IPv4/IPv6), Network Security & Cryptography.",
      description: "Framing, error control, distance vector/link state routing, subnetting, CIDR, TCP congestion control, RSA, and firewalls.",
      nptelTitle: "NPTEL: Computer Networks and Internet Protocol (IIT Kharagpur)",
      nptelUrl: "https://nptel.ac.in/courses/106105183",
    },
    {
      id: 10,
      unit: "Unit 10: Artificial Intelligence (AI)",
      topics: "Search Strategies, Knowledge Representation, Fuzzy Logic, Artificial Neural Networks, Natural Language Processing.",
      description: "A* search, alpha-beta pruning, propositional/predicate logic, membership functions, perceptrons, backpropagation, and NLP POS tagging.",
      nptelTitle: "NPTEL: An Introduction to Artificial Intelligence (IIT Madras)",
      nptelUrl: "https://nptel.ac.in/courses/106106126",
    },
  ];

  const filteredUnits = units.filter(
    (u) =>
      u.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.topics.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <span className="badge badge-accent">Paper II: Computer Science</span>
          </div>
          <h1 className="main-title">UGC NET JRF — Syllabus & NPTEL Study Guide</h1>
        </div>
      </header>

      <main className="content-wrapper">
        {/* Intro Card */}
        <section className="intro-card">
          <div className="intro-content">
            <h2>Complete 10-Unit Preparation Roadmap</h2>
            <p>
              UGC NET JRF tests deep conceptual clarity across 10 official units. Every unit below is linked to top <strong>NPTEL / SWAYAM video lectures and course materials</strong> from IITs for structured self-study.
            </p>
          </div>
        </section>

        {/* Search Bar */}
        <section className="controls-bar">
          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input
              type="text"
              placeholder="Search units, topics, or keywords..."
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
                <span className="unit-number">Unit {u.id}</span>
                <span className="exam-badge">UGC NET JRF</span>
              </div>

              <h3 className="unit-title">{u.unit}</h3>
              <p className="unit-desc">{u.description}</p>

              <div className="topics-box">
                <h4 className="topics-heading">
                  <i className="fa-solid fa-book-open"></i> Key Syllabus Topics
                </h4>
                <p className="topics-text">{u.topics}</p>
              </div>

              {/* NPTEL Link Button */}
              <div className="card-action">
                <a
                  href={u.nptelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nptel-btn"
                >
                  <i className="fa-solid fa-graduation-cap"></i>
                  <span>Study {u.nptelTitle}</span>
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              </div>
            </div>
          ))}
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
          justify-content: flex-end;
        }

        .search-box {
          position: relative;
          width: 100%;
          max-width: 360px;
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

        .unit-number {
          font-size: 0.75rem;
          font-weight: 800;
          color: #059669;
          background: #ecfdf5;
          padding: 0.2rem 0.55rem;
          border-radius: 5px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .exam-badge {
          font-size: 0.7rem;
          font-weight: 700;
          color: #6b7280;
          background: #f3f4f6;
          padding: 0.2rem 0.55rem;
          border-radius: 5px;
        }

        .unit-title {
          font-size: 1.15rem;
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
          background: #065f46;
          color: #fff;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.82rem;
          transition: background 0.2s;
        }

        .nptel-btn:hover {
          background: #047857;
        }

        .nptel-btn span {
          flex: 1;
          margin-left: 0.6rem;
        }

        @media (max-width: 640px) {
          .page-container {
            padding: 1rem;
          }
          .units-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
