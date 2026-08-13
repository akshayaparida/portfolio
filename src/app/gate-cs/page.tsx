"use client";

import { useState } from "react";
import Link from "next/link";

interface Subject {
  name: string;
  weightage: string;
  topics: string;
  description: string;
  nptelTitle: string;
  nptelUrl: string;
}

export default function GateCsPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const subjects: Subject[] = [
    {
      name: "Engineering Mathematics & Discrete Math",
      weightage: "~13%",
      topics: "Propositional Logic, Sets, Relations, Functions, Graph Theory, Matrix Algebra, Calculus, Probability & Statistics.",
      description: "Mathematical logic, recurrence relations, combinatorics, graph theory (trees, planarity), linear algebra (eigenvalues), and probability distributions.",
      nptelTitle: "NPTEL: Discrete Mathematics (IIT Ropar)",
      nptelUrl: "https://nptel.ac.in/courses/106106183",
    },
    {
      name: "Digital Logic",
      weightage: "~5%",
      topics: "Boolean Algebra, Combinational & Sequential Circuits, Minimization, Number Representations & Computer Arithmetic.",
      description: "K-maps, multiplexers, decoders, flip-flops, counters, registers, state machines, and IEEE floating point representation.",
      nptelTitle: "NPTEL: Digital Circuits (IIT Kharagpur)",
      nptelUrl: "https://nptel.ac.in/courses/106105185",
    },
    {
      name: "Computer Organization & Architecture",
      weightage: "~8%",
      topics: "Machine Instructions, Addressing Modes, ALU, Data Path & Control Unit, Pipelining, Memory Hierarchy & Cache.",
      description: "Pipeline speedup, hazards (data, control, structural), cache mapping (direct, set-associative), cache misses, and I/O interrupts.",
      nptelTitle: "NPTEL: Computer Organization & Architecture (IIT Madras)",
      nptelUrl: "https://nptel.ac.in/courses/106106092",
    },
    {
      name: "Data Structures & Algorithms",
      weightage: "~16%",
      topics: "Arrays, Stacks, Queues, Linked Lists, Trees, BSTs, Binary Heaps, Graphs, Divide-and-Conquer, Dynamic Programming, Greedy.",
      description: "Asymptotic complexity (Big-O), tree traversals, AVL trees, Dijkstra's algorithm, Kruskal/Prim MST, Floyd-Warshall, and NP-completeness.",
      nptelTitle: "NPTEL: Programming, Data Structures & Algorithms (CMI)",
      nptelUrl: "https://nptel.ac.in/courses/106106145",
    },
    {
      name: "Theory of Computation",
      weightage: "~9%",
      topics: "Regular Languages & Finite Automata, Context-Free Languages & Pushdown Automata, Turing Machines, Undecidability.",
      description: "DFA/NFA equivalence, regular expressions, pumping lemma, CFG parsing ambiguity, Turing Machines, Halting Problem, and Rice's Theorem.",
      nptelTitle: "NPTEL: Theory of Computation (IIT Kanpur)",
      nptelUrl: "https://nptel.ac.in/courses/106104148",
    },
    {
      name: "Compiler Design",
      weightage: "~5%",
      topics: "Lexical Analysis, Parsing, Syntax-Directed Translation, Runtime Environments, Intermediate Code Generation & Code Optimization.",
      description: "Lexer tokens, LL(1) FIRST and FOLLOW sets, LR(0)/SLR(1)/LALR(1) parsing, 3-address code, activation records, and DAG optimization.",
      nptelTitle: "NPTEL: Compiler Design (IIT Kharagpur)",
      nptelUrl: "https://nptel.ac.in/courses/106105190",
    },
    {
      name: "Operating Systems",
      weightage: "~10%",
      topics: "Processes, Threads, IPC, Synchronization, Deadlocks, CPU Scheduling, Memory Management, File Systems.",
      description: "Preemptive scheduling, Peterson's solution, semaphores, Banker's deadlock avoidance, page replacement algorithms (LRU, FIFO, Optimal), and disk scheduling.",
      nptelTitle: "NPTEL: Operating Systems (IIT Bombay)",
      nptelUrl: "https://nptel.ac.in/courses/106106144",
    },
    {
      name: "Databases",
      weightage: "~8%",
      topics: "ER-Model, Relational Model, Relational Algebra, Tuple Calculus, SQL, Integrity Constraints, Normal Forms, Transactions & Concurrency.",
      description: "Relational algebra queries, 3NF/BCNF normalization, B+ tree indexing order/height, serializability, 2-phase locking (2PL), and ACID properties.",
      nptelTitle: "NPTEL: Database Management System (IIT Kharagpur)",
      nptelUrl: "https://nptel.ac.in/courses/106105175",
    },
    {
      name: "Computer Networks",
      weightage: "~10%",
      topics: "OSI & TCP/IP Stack, Data Link Layer (Ethernet, Flow Control), Network Layer (IPv4/IPv6, Routing), Transport Layer (TCP/UDP, Sockets).",
      description: "Sliding window protocols (Go-Back-N, Selective Repeat), IPv4 subnetting & CIDR, Distance Vector vs Link State, TCP handshake/flow control, and Socket API.",
      nptelTitle: "NPTEL: Computer Networks and Internet Protocol (IIT Kharagpur)",
      nptelUrl: "https://nptel.ac.in/courses/106105183",
    },
    {
      name: "General Aptitude",
      weightage: "15%",
      topics: "Verbal Ability, Quantitative Aptitude, Analytical Aptitude, Spatial Aptitude.",
      description: "Grammar, vocabulary, numerical estimation, data interpretation, logical reasoning, and spatial paper folding / pattern matching.",
      nptelTitle: "NPTEL: Soft Skills and Aptitude Development (IIT Kanpur)",
      nptelUrl: "https://nptel.ac.in/courses/109104031",
    },
  ];

  const filteredSubjects = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.topics.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-container">
      {/* Header */}
      <header className="page-header">
        <Link href="/" className="back-btn" title="Back to Portfolio">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <div className="header-titles">
          <div className="badge-row">
            <span className="badge">Graduate Aptitude Test in Engineering</span>
            <span className="badge badge-accent">GATE CS & IT</span>
          </div>
          <h1 className="main-title">GATE CS — Subject Syllabus & NPTEL Study Guide</h1>
        </div>
      </header>

      <main className="content-wrapper">
        {/* Intro */}
        <section className="intro-card">
          <div className="intro-content">
            <h2>Complete GATE Computer Science Syllabus Breakdown</h2>
            <p>
              Subject-wise weightage and core topic breakdown for GATE CS 2026 / 2027. Each subject is linked directly to <strong>official NPTEL video lectures and course materials</strong> from top IIT professors.
            </p>
          </div>
        </section>

        {/* Search */}
        <section className="controls-bar">
          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input
              type="text"
              placeholder="Search subjects, algorithms, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </section>

        {/* Grid */}
        <section className="subjects-grid">
          {filteredSubjects.map((sub, idx) => (
            <div key={idx} className="subject-card">
              <div className="card-top">
                <h3 className="subject-name">{sub.name}</h3>
                <span className="weightage-badge">{sub.weightage}</span>
              </div>

              <p className="subject-desc">{sub.description}</p>

              <div className="topics-box">
                <h4 className="topics-heading">
                  <i className="fa-solid fa-book-bookmark"></i> Core GATE Topics
                </h4>
                <p className="topics-text">{sub.topics}</p>
              </div>

              {/* NPTEL Link Button */}
              <div className="card-action">
                <a
                  href={sub.nptelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nptel-btn"
                >
                  <i className="fa-solid fa-graduation-cap"></i>
                  <span>Study {sub.nptelTitle}</span>
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
            Practice with previous year GATE papers and free mock tests to maximize your score.
          </p>
          <div className="resources-grid">
            {[
              { name: "NPTEL GATE Portal — Mock Tests", desc: "Official NPTEL GATE mock tests in exam-like environment.", url: "https://gate.nptel.ac.in/", icon: "fa-solid fa-graduation-cap", color: "#2563eb" },
              { name: "MargDarshan — GATE PYQs", desc: "Curated PYQs with no login required. Practice online or PDF.", url: "https://margdarshanprep.com/", icon: "fa-solid fa-file-circle-check", color: "#7c3aed" },
              { name: "PracticePaper — GATE CS", desc: "Free topic-wise PYQs, mock tests, and handwritten notes.", url: "https://practicepaper.in/gate-cse", icon: "fa-solid fa-pen-to-square", color: "#0891b2" },
              { name: "Testbook — GATE CS Mock Tests", desc: "Full-length mock tests with performance analytics & solutions.", url: "https://testbook.com/gate", icon: "fa-solid fa-chart-line", color: "#ea580c" },
              { name: "KnowledgeGate — Pariksha Mocks", desc: "Free GATE CS mock tests and learning programs from experts.", url: "https://knowledgegate.in/gate-cse", icon: "fa-solid fa-brain", color: "#dc2626" },
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
          color: #7c3aed;
          background: #f5f3ff;
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
          border-color: #7c3aed;
        }

        .subjects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .subject-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .subject-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
        }

        .card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .subject-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
          line-height: 1.35;
        }

        .weightage-badge {
          font-size: 0.75rem;
          font-weight: 800;
          color: #7c3aed;
          background: #f5f3ff;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          white-space: nowrap;
        }

        .subject-desc {
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
          background: #5b21b6;
          color: #fff;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.82rem;
          transition: background 0.2s;
        }

        .nptel-btn:hover {
          background: #4c1d95;
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
          .subjects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
