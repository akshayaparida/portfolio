"use client";

import { useState } from "react";
import Link from "next/link";

interface Course {
  code: string;
  title: string;
  semester: string;
  type: "Major" | "Minor" | "Elective" | "AEC" | "Project";
  credits: number;
  description: string;
  units: string[];
  nptelTitle: string;
  nptelUrl: string;
}

export default function CurajMscCsPage() {
  const [selectedSem, setSelectedSem] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const courses: Course[] = [
    // Semester 1
    {
      code: "6.0CSC01",
      title: "Introduction to Artificial Intelligence",
      semester: "Semester I",
      type: "Major",
      credits: 4,
      description: "State-space search, heuristic search (A*, IDA*), adversarial search, constraint satisfaction (CSPs), PDDL planning, and probabilistic reasoning.",
      units: [
        "Uninformed Search (BFS, DFS, Uniform Cost Search)",
        "Informed Search (Best-First, A*, Simulated Annealing, Genetic Algorithms)",
        "Adversarial Search (Min-Max, Alpha-Beta Pruning)",
        "Constraint Satisfaction Problems (CSPs)",
        "AI Planning (PDDL, GraphPlan)",
        "Probabilistic Reasoning (Bayesian Networks, HMMs)",
      ],
      nptelTitle: "NPTEL: An Introduction to Artificial Intelligence (IIT Madras)",
      nptelUrl: "https://nptel.ac.in/courses/106106126",
    },
    {
      code: "6.0CSC02",
      title: "Advanced Algorithms",
      semester: "Semester I",
      type: "Major",
      credits: 4,
      description: "Design paradigms, amortized analysis, randomized & parallel algorithms, approximation algorithms, NP-completeness, and Indian Knowledge Systems.",
      units: [
        "Divide & Conquer, Greedy, Dynamic Programming",
        "Backtracking, Branch & Bound, Max Flow, String Matching",
        "Amortized Analysis, B-Trees, Fibonacci Heaps, Disjoint Sets",
        "Randomized Algorithms (Las Vegas, Monte Carlo, Primality Testing)",
        "Approximation Algorithms (Vertex Cover, Set Cover, TSP)",
        "Indian Knowledge Systems (Kaprekar Constants, Bhadra Ganita, Meru Prastara)",
      ],
      nptelTitle: "NPTEL: Design and Analysis of Algorithms (CMI)",
      nptelUrl: "https://nptel.ac.in/courses/106106131",
    },
    {
      code: "6.0CSC03",
      title: "Advanced Python Programming",
      semester: "Semester I",
      type: "Major",
      credits: 4,
      description: "In-depth Python programming, OOPs design, Exception handling, File I/O, SQLite database integration, and Data Analysis with NumPy, Pandas & Scikit-Learn.",
      units: [
        "Python Fundamentals & Data Structures (Lists, Tuples, Dicts)",
        "Object-Oriented Programming (Classes, Inheritance, Polymorphism)",
        "File Handling, Exception Hierarchy & I/O Streams",
        "Modules, Packages, Namespace & Scoping",
        "Relational Databases & GUI Programming (SQLite, Event Handling)",
        "Data Analysis & ML Libraries (NumPy, Pandas, Matplotlib, Scikit-Learn)",
      ],
      nptelTitle: "NPTEL: Programming & Data Structures using Python (CMI)",
      nptelUrl: "https://nptel.ac.in/courses/106106145",
    },
    {
      code: "6.0CSC04",
      title: "Professional Communication",
      semester: "Semester I",
      type: "AEC",
      credits: 2,
      description: "Technical writing, research presentation skills, corporate communication, and academic paper drafting.",
      units: [
        "Technical & Academic Report Writing",
        "Research Paper Formatting & Presentation Skills",
        "Professional & Business Communication",
      ],
      nptelTitle: "NPTEL: Soft Skills and Personality Development (IIT Kanpur)",
      nptelUrl: "https://nptel.ac.in/courses/109104031",
    },

    // Semester 2
    {
      code: "6.0CSC05",
      title: "Natural Language Processing",
      semester: "Semester II",
      type: "Major",
      credits: 4,
      description: "Levels of NLU analysis, formal grammars, morphological parsing, WordNet/IndoNet integration, POS tagging, and statistical ambiguity resolution.",
      units: [
        "Introduction to NLU & Levels of Language Analysis",
        "Linguistic Background & English Syntax Outline",
        "Grammars & Parsing (Top-Down, Bottom-Up, Morphological Analysis)",
        "Feature Parsing, ATNs, WordNet & IndoNet Knowledge Sources",
        "Grammars for NL (POS Taggers, Stemming, ATN Hold Mechanisms)",
        "Ambiguity Resolution (Probabilistic CFGs, Semantics, Pragmatic Analysis)",
      ],
      nptelTitle: "NPTEL: Natural Language Processing (IIT Kharagpur)",
      nptelUrl: "https://nptel.ac.in/courses/106105158",
    },
    {
      code: "6.0CSC06",
      title: "Machine Learning",
      semester: "Semester II",
      type: "Major",
      credits: 4,
      description: "Supervised and unsupervised learning, linear/logistic regression, SVMs, Decision Trees, Neural Networks, Ensembles, Clustering, and Reinforcement Learning.",
      units: [
        "Basics & Regression (Linear, Ridge, Lasso, Bayesian Regression)",
        "Classification (LDA, Logistic Regression, SVMs, Decision Trees)",
        "Neural Networks (MLPs, Backpropagation, Deep Learning)",
        "Graphical Models & Ensembles (HMM, Bayes Nets, Boosting, Random Forest)",
        "Clustering (K-Means, Hierarchical, DBSCAN, Spectral Clustering)",
        "Dimensionality Reduction (PCA, ICA) & Reinforcement Learning (Q-Learning)",
      ],
      nptelTitle: "NPTEL: Introduction to Machine Learning (IIT Madras)",
      nptelUrl: "https://nptel.ac.in/courses/106106139",
    },
    {
      code: "6.0CSC07",
      title: "Big Data Analytics",
      semester: "Semester II",
      type: "Minor",
      credits: 4,
      description: "Big data storage architectures, Hadoop HDFS, MapReduce programming, Hadoop Ecosystem (HBase, Hive, Pig, Zookeeper), and Apache Spark/GraphX.",
      units: [
        "Big Data Fundamentals, Storage & Analytical Architectures",
        "Hadoop Framework, HDFS Architecture & MapReduce Programming",
        "Hadoop Ecosystem (AVRO, Zookeeper, HBase, Hive, Pig, Flink)",
        "MapReduce Workflows, YARN Architecture & Job Scheduling",
        "Apache Spark Framework (Scala, Python, PySpark, R)",
        "Spark SQL, DataFrames & GraphX Algorithms",
      ],
      nptelTitle: "NPTEL: Big Data Computing (IIT Patna)",
      nptelUrl: "https://nptel.ac.in/courses/106104189",
    },

    // Semester 3
    {
      code: "6.5CSC01",
      title: "Image Processing & Computer Vision",
      semester: "Semester III",
      type: "Major",
      credits: 4,
      description: "Digital image representation, contrast enhancement, 2D Fourier transforms, morphological filtering, SIFT/HOG feature extraction, CNNs, and motion tracking.",
      units: [
        "Image Formation, Perception & Digital Quantization",
        "Contrast Enhancement, Histogram Equalization & 2D Fourier Transforms",
        "Spatial Linear Filtering, Edge Detection & DFT Filtering",
        "Morphological Filtering, Color Models & Image Resizing",
        "Segmentation, SIFT/HOG Features & Multi-view Geometry",
        "Deep Learning in Vision (CNN Classification, Object Detection, Motion Tracking)",
      ],
      nptelTitle: "NPTEL: Digital Image Processing (IIT Kharagpur)",
      nptelUrl: "https://nptel.ac.in/courses/106105032",
    },
    {
      code: "6.5CSC02",
      title: "Data Mining and Warehousing",
      semester: "Semester III",
      type: "Major",
      credits: 4,
      description: "KDD process, OLAP vs OLTP, Data Preprocessing, Association Rules (Apriori, FP-Growth), Classification, Clustering, and Vector Space Information Retrieval.",
      units: [
        "Data Mining Fundamentals, Strategies & KDD Process",
        "Data Preprocessing, Warehousing, Cleaning & OLAP Technology",
        "Association Rule Mining (Apriori, FP-Growth Algorithms)",
        "Classification Models (Decision Trees, Random Forests, Naive Bayes, SVM)",
        "Clustering Techniques (K-Means, Hierarchical, DBSCAN, SOM)",
        "Information Retrieval (TF-IDF, Vector Space Model, Search Dictionaries)",
      ],
      nptelTitle: "NPTEL: Data Mining (IIT Kharagpur)",
      nptelUrl: "https://nptel.ac.in/courses/106105174",
    },
    {
      code: "6.5CSC03",
      title: "Neural Networks & Deep Learning",
      semester: "Semester III",
      type: "Elective",
      credits: 4,
      description: "Biological vs artificial neurons, Perceptron learning rules, Multi-layer feedforward networks, Backpropagation, SOM, Hopfield networks, CNNs, and LSTMs.",
      units: [
        "Biological Neurons & ANN Models (Hebb, Perceptron, Delta Rule)",
        "Single-layer Perceptron Classifier & Linear Separability",
        "Multi-layer Feedforward Networks & Backpropagation Training",
        "Self-Organizing Maps (SOM) & Adaptive Resonance Theory (ART)",
        "Associative Memories (Recurrent Auto-associative, BAM)",
        "Deep Learning Architectures (CNNs, RNNs, LSTMs, BiLSTMs)",
      ],
      nptelTitle: "NPTEL: Deep Learning (IIT Madras)",
      nptelUrl: "https://nptel.ac.in/courses/106106184",
    },

    // Electives
    {
      code: "6.0CSC08",
      title: "Parallel Processing",
      semester: "Semester III",
      type: "Elective",
      credits: 4,
      description: "Pipelining, SIMD/MIMD architectures, Flynn's classification, PRAM models, multiprocessor topologies, speedup metrics, and parallel scheduling.",
      units: [
        "Pipeline & Vector Processing (Linear/Nonlinear Pipelining)",
        "Parallel Computing Paradigms (SIMD, MIMD, Flynn's Taxonomy, PRAM)",
        "Parallel Processors Topology & Shared/Distributed Memory Networks",
        "Processor Organization & Interconnection Embeddings",
        "Parallel Performance Metrics (Amdahl's Law, Speedup, Efficiency)",
        "Parallel Program Scheduling & Loop Parallelization",
      ],
      nptelTitle: "NPTEL: Parallel Computer Architecture (IIT Kanpur)",
      nptelUrl: "https://nptel.ac.in/courses/106104024",
    },
    {
      code: "6.0CSC10",
      title: "High Performance Computing",
      semester: "Semester III",
      type: "Elective",
      credits: 4,
      description: "Multicore architectures, HPC linear algebra, parallel dense/sparse matrix operations, PDE solvers, molecular dynamics, and Monte Carlo methods.",
      units: [
        "Von Neumann vs Modern Multicore Architectures & Memory Hierarchy",
        "Parallel Computing Architectures & Floating Point Arithmetic",
        "Numerical Linear Algebra & LU Factorization",
        "High Performance Matrix-Vector Products & PDE Parallel Solvers",
        "Parallel FFT, Molecular Dynamics & Parallel Graph Algorithms",
        "N-body Barnes-Hut Algorithm & Parallel Monte Carlo Methods",
      ],
      nptelTitle: "NPTEL: High Performance Computer Architecture (IIT Kharagpur)",
      nptelUrl: "https://nptel.ac.in/courses/106105033",
    },
    {
      code: "6.0CSC11",
      title: "Internet of Things (IoT)",
      semester: "Semester III",
      type: "Elective",
      credits: 4,
      description: "Wireless sensor networks, MAC/Routing protocols, IoT communication stacks (Zigbee, Z-Wave, RPL, MQTT), and Raspberry Pi IoT applications.",
      units: [
        "Wireless Sensor Networks Overview & Characteristics",
        "MAC Protocols for WSN (Energy Efficiency, Demand Assignment)",
        "Routing & Transport Protocols for Sensor Networks",
        "IoT Components & Communication Protocols",
        "Physical & Data Link IoT Protocols (ZigBee, Z-Wave, RPL)",
        "IoT Application Layer Protocols (MQTT, CoAP) & Raspberry Pi",
      ],
      nptelTitle: "NPTEL: Introduction to Internet of Things (IIT Kharagpur)",
      nptelUrl: "https://nptel.ac.in/courses/106105166",
    },
    {
      code: "6.0CSC13",
      title: "Advanced Database Systems (ADBMS)",
      semester: "Semester III",
      type: "Elective",
      credits: 4,
      description: "Distributed database architecture, distribution design, query processing, distributed concurrency control, object databases, and spatial/deductive databases.",
      units: [
        "Distributed DBMS Architecture & Models",
        "Distributed DB Design (Fragmentation, Allocation, Semantic Control)",
        "Query Processing & Distributed Transaction Management",
        "Distributed Concurrency Control & Locking Algorithms",
        "Parallel Database Systems & Database Interoperability",
        "Distributed Object DBs, Spatial & Deductive Databases",
      ],
      nptelTitle: "NPTEL: Fundamentals of Database Systems (IIT Kanpur)",
      nptelUrl: "https://nptel.ac.in/courses/106104135",
    },
    {
      code: "6.0CSC17",
      title: "Cyber Security & Cryptography",
      semester: "Semester III",
      type: "Elective",
      credits: 4,
      description: "Symmetric/Asymmetric encryption, RSA, Diffie-Hellman, SHA hashing, digital signatures, PKI, network firewalls, and critical infrastructure protection.",
      units: [
        "Cryptography Fundamentals (Symmetric/Asymmetric, DES, Ciphers)",
        "Public Key Cryptosystems (RSA Algorithm, Key Management, Diffie-Hellman)",
        "Message Authentication, Hashing & Digital Signatures (El Gamal, RSA)",
        "Network Security Controls (Firewalls, Intrusion Detection Systems)",
        "Cyber Security Threat Landscape & Vulnerability Exploitation",
        "Cyber Terrorism & Critical Infrastructure Defense",
      ],
      nptelTitle: "NPTEL: Cryptography and Network Security (IIT Kharagpur)",
      nptelUrl: "https://nptel.ac.in/courses/106105031",
    },
    {
      code: "6.0CSC19",
      title: "Cloud Computing",
      semester: "Semester III",
      type: "Elective",
      credits: 4,
      description: "Distributed computing roots, cloud deployment models, IaaS/PaaS/SaaS architectures, virtual machine provisioning/migration, and cloud security.",
      units: [
        "Roots of Cloud Computing (Distributed, Grid & Cluster Systems)",
        "Cloud Service Models (IaaS, PaaS, SaaS) & Deployment Models",
        "Cloud Platforms (Google App Engine, Azure, Salesforce)",
        "VM Provisioning, Migration & Resource Scheduling",
        "Economic Models & Heuristic Schedulers for Cloud Tasks",
        "Cloud Applications, Security, Privacy & Wireless Integration",
      ],
      nptelTitle: "NPTEL: Cloud Computing (IIT Kharagpur)",
      nptelUrl: "https://nptel.ac.in/courses/106105167",
    },
    {
      code: "6.5CSC06",
      title: "Compiler Design",
      semester: "Semester III",
      type: "Elective",
      credits: 4,
      description: "Lexical analysis (LEX), top-down/bottom-up parsing (LL, LR, LALR, YACC), syntax-directed translation, symbol tables, DAG optimization, and code generation.",
      units: [
        "Phases of Compilation & LEX Lexical Analyzer",
        "Top-down Parsing (Context-Free Grammars, LL(1), Recursive Descent)",
        "Bottom-up Parsing (Shift-Reduce, LR, LALR, YACC Generator)",
        "Syntax Directed Translation & Intermediate Code Forms (AST, 3-Address Code)",
        "Symbol Table Organization & Memory Allocation (Stack/Heap)",
        "Code Optimization (DAG, Data Flow Analysis, Register Allocation)",
      ],
      nptelTitle: "NPTEL: Compiler Design (IIT Kharagpur)",
      nptelUrl: "https://nptel.ac.in/courses/106105190",
    },
    {
      code: "6.5CSC11",
      title: "Blockchain & Cybersecurity",
      semester: "Semester III",
      type: "Elective",
      credits: 4,
      description: "Distributed ledger technology, consensus algorithms, PKI, Bitcoin cryptoeconomics, Ethereum smart contracts, and blockchain security.",
      units: [
        "Digital Trust, Ledgers, Consensus & Smart Contracts",
        "Symmetric/Asymmetric Cryptography, Hash Functions & DES",
        "PKI, Digital Signatures, RSA & Diffie-Hellman Key Exchange",
        "Cryptocurrency Economics (Bitcoin, Ethereum, Limited Supply)",
        "Blockchain Application Development & Smart Contract Tokens",
        "Use Cases in Finance/Gov & Blockchain Security (DDoS, AI Integration)",
      ],
      nptelTitle: "NPTEL: Blockchain and its Applications (IIT Kharagpur)",
      nptelUrl: "https://nptel.ac.in/courses/106105184",
    },
    {
      code: "6.5CSC14",
      title: "Quantum Computing",
      semester: "Semester III",
      type: "Elective",
      credits: 4,
      description: "Complex Hilbert spaces, Qubits, Quantum gates (Hadamard, CNOT), Deutsch-Jozsa algorithm, Grover's search, Shor's factoring, and IBMQ simulators.",
      units: [
        "Complex Vector Spaces, Hilbert Spaces & Unitary Matrices",
        "Dirac Formalism, Qubits & Quantum Gates (Hadamard, CNOT)",
        "Quantum Algorithms I (Deutsch-Jozsa, Simon's Algorithm)",
        "Quantum Algorithms II (Grover's Search, Shor's Factoring)",
        "Quantum Programming Languages & Cryptography Theory",
        "Quantum Circuits, IBMQ & Quantum Simulator Measurement",
      ],
      nptelTitle: "NPTEL: Quantum Computing (IIT Kanpur)",
      nptelUrl: "https://nptel.ac.in/courses/104104085",
    },
    {
      code: "6.5CSC15",
      title: "Soft Computing",
      semester: "Semester III",
      type: "Elective",
      credits: 4,
      description: "Fuzzy logic, membership functions, Fuzzy Inference Systems (FIS), Genetic Algorithms (crossover/mutation), Particle Swarm Optimization (PSO), and ACO.",
      units: [
        "Hard vs Soft Computing, Neural Nets & Evolutionary Algorithms",
        "Fuzzy Sets & 1D/2D Membership Functions",
        "Fuzzy Relations, Rules & Reasoning Systems",
        "Fuzzy Inference Systems (FIS) & Defuzzification",
        "Evolutionary Computation & Genetic Algorithms (GA)",
        "Swarm Intelligence (PSO, Ant Colony Optimization)",
      ],
      nptelTitle: "NPTEL: Soft Computing (IIT Kharagpur)",
      nptelUrl: "https://nptel.ac.in/courses/106105173",
    },

    // Semester 4
    {
      code: "6.5CSC05",
      title: "Master's Research Project / Dissertation",
      semester: "Semester IV",
      type: "Project",
      credits: 20,
      description: "Full-semester major research project or industrial internship under faculty mentorship, ending with thesis submission, presentation, and defense.",
      units: [
        "Problem Formulation & Literature Survey",
        "System Architecture & Algorithm Design",
        "Implementation, Experimental Setup & Benchmarking",
        "Thesis Writing, Publication & Comprehensive Viva-Voce",
      ],
      nptelTitle: "NPTEL: Research Methodology in Science and Engineering",
      nptelUrl: "https://nptel.ac.in/courses/121106007",
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSem = selectedSem === "All" || course.semester === selectedSem;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSem && matchesSearch;
  });

  return (
    <div className="page-container">
      {/* Top Bar Navigation */}
      <header className="page-header">
        <Link href="/" className="back-btn" title="Back to Portfolio">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <div className="header-titles">
          <div className="badge-row">
            <span className="badge">Central University of Rajasthan</span>
            <span className="badge badge-accent">NEP 2020 Scheme</span>
          </div>
          <h1 className="main-title">M.Sc. Computer Science Syllabus & NPTEL Study Guide</h1>
        </div>
      </header>

      <main className="content-wrapper">
        {/* Program Highlights Banner */}
        <section className="intro-card">
          <div className="intro-content">
            <h2>2-Year M.Sc. (Computer Science) Curriculum</h2>
            <p>
              Syllabus for Central University of Rajasthan (CURAJ). Each course below is matched with curated <strong>NPTEL / SWAYAM video lectures and study resources</strong> from top IITs and IISc.
            </p>
          </div>
          <div className="pdf-action">
            <a
              href="file:///home/akshayaparida/Desktop/CURAJ%20MSC%20CS/M.Sc.%20(2%20Year)%20Computer%20Science.pdf"
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
            {["All", "Semester I", "Semester II", "Semester III", "Semester IV"].map(
              (sem) => (
                <button
                  key={sem}
                  onClick={() => setSelectedSem(sem)}
                  className={`tab-btn ${selectedSem === sem ? "active" : ""}`}
                >
                  {sem}
                </button>
              )
            )}
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
          {filteredCourses.map((c) => (
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
          font-family: inherit;
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
          color: #2563eb;
          background: #eff6ff;
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
        }

        .badge-accent {
          color: #059669;
          background: #ecfdf5;
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
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .intro-content {
          flex: 1;
          min-width: 300px;
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

        .pdf-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1.25rem;
          background: #dc2626;
          color: #fff;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: background 0.2s;
        }
        .pdf-btn:hover {
          background: #b91c1c;
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
          background: #2563eb;
          color: #fff;
          border-color: #2563eb;
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
          border-color: #2563eb;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .course-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .course-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
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
          color: #6b7280;
          background: #f3f4f6;
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
        }
        .type-major {
          color: #2563eb;
          background: #eff6ff;
        }
        .type-minor {
          color: #d97706;
          background: #fffbeb;
        }
        .type-elective {
          color: #7c3aed;
          background: #f5f3ff;
        }
        .type-aec {
          color: #059669;
          background: #ecfdf5;
        }
        .type-project {
          color: #dc2626;
          background: #fef2f2;
        }

        .course-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 0.5rem 0;
          line-height: 1.35;
        }

        .course-desc {
          font-size: 0.88rem;
          color: #4b5563;
          line-height: 1.55;
          margin: 0 0 1.25rem 0;
        }

        .units-section {
          background: #fafafa;
          border: 1px solid #f3f4f6;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1.25rem;
          flex: 1;
        }

        .units-heading {
          font-size: 0.75rem;
          font-weight: 700;
          color: #6b7280;
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
          color: #374151;
          line-height: 1.45;
        }

        .bullet {
          color: #2563eb;
          font-weight: 800;
          margin-right: 0.25rem;
        }

        .card-action {
          margin-top: auto;
        }

        .nptel-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 1rem;
          background: #1e293b;
          color: #fff;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.85rem;
          transition: background 0.2s;
        }

        .nptel-btn:hover {
          background: #0f172a;
        }

        .nptel-btn span {
          flex: 1;
          margin-left: 0.6rem;
        }

        @media (max-width: 640px) {
          .page-container {
            padding: 1rem;
          }
          .courses-grid {
            grid-template-columns: 1fr;
          }
          .intro-card {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
