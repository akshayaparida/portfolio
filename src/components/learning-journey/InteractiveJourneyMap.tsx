"use client";

import React, { useState, useEffect, useRef } from "react";

export interface JourneyLocation {
  id: string;
  stepNumber: number;
  city: string;
  state: string;
  institutionOrEra: string;
  title: string;
  timeline: string;
  phase: string;
  icon: string;
  tagline: string;
  story: string;
  keyTakeaways: string[];
  skillsAndTech: string[];
  x: number; // coordinate in SVG viewBox (950 x 850)
  y: number;
  isCurrent?: boolean;
}

export const journeyLocations: JourneyLocation[] = [
  {
    id: "haridwar-dsvv",
    stepNumber: 1,
    city: "DSVV in Haridwar",
    state: "Uttarakhand",
    institutionOrEra: "Dev Sanskriti Vishwavidyalaya (DSVV)",
    title: "The Undergraduate Foundation & Discipline",
    timeline: "Undergraduate Years",
    phase: "Phase 1: Foundation",
    icon: "fa-solid fa-graduation-cap",
    tagline:
      "From shy student to discovering the power of disciplined learning at DSVV in Haridwar.",
    story:
      "Began my academic voyage at DSVV in Haridwar in the serene foothills of the Himalayas. Overcame early introversion, adapted to new environments, built foundational skills in computer science, programming fundamentals (C/C++, Java, JavaScript), and internalized Life Management, moral discipline, and reflective values that continue to anchor my work ethics.",
    keyTakeaways: [
      "Built strong foundational skills in programming and web basics with JavaScript",
      "Studied Life Management, holistic wellness, and self-discipline",
      "Overcame severe hesitation and started communicating actively",
      "Internalized structured daily routines, ethics, and reflective habits",
    ],
    skillsAndTech: [
      "C / C++",
      "Core Java",
      "JavaScript",
      "Life Management",
      "Database Basics",
      "Vedic Computing",
    ],
    x: 350,
    y: 195,
  },
  {
    id: "bhikapada-covid",
    stepNumber: 2,
    city: "Khallikote Village (Bhikapada), Ganjam",
    state: "Odisha",
    institutionOrEra: "COVID-19 Lockdown & Self-Directed Awakening",
    title: "The 'High Agency' Mindset Shift & Deep Self-Study",
    timeline: "COVID Lockdown Era",
    phase: "Phase 2: The Awakening",
    icon: "fa-solid fa-laptop-code",
    tagline:
      "COVID lockdown in Khallikote village sparked the realization: real learning is understanding deeply.",
    story:
      "During the global pandemic lockdown in my hometown Khallikote village (Bhikapada, Ganjam, Odisha), I shifted from passive coursework to relentless, self-driven mastery. Inspired by intense curiosity, I broke away from rote learning, dove deep into Data Structures & Algorithms, full-stack web architecture, and built high-agency problem-solving habits using open internet resources.",
    keyTakeaways: [
      "Transformed from rote memorization to first-principles thinking",
      "Mastered Data Structures & Algorithms from foundational ground up",
      "Engineered full-stack applications and explored modern developer tools",
      "Developed high agency — learning any complex topic autonomously",
    ],
    skillsAndTech: [
      "DSA Mastery",
      "JavaScript / React",
      "Full-Stack Dev",
      "Git & GitHub",
      "Self-Taught Systems",
    ],
    x: 585,
    y: 470,
  },
  {
    id: "bangalore-tech",
    stepNumber: 3,
    city: "Bengaluru (Bangalore) Workplace",
    state: "Karnataka",
    institutionOrEra: "The Silicon Valley of India — Workplace",
    title: "The Leap, Real-World Hustle & Communication Mastery",
    timeline: "Professional Growth Phase",
    phase: "Phase 3: Real-World Grit",
    icon: "fa-solid fa-city",
    tagline:
      "Stepping into India's tech capital — converting workplace challenges into growth.",
    story:
      "Took a bold leap to Bengaluru, working at my corporate workplace in India's buzzing startup and technology capital. Worked in fast-paced e-commerce operations and software workflows, communicating daily with cross-functional stakeholders. This intensive real-world experience transformed my hesitant English into confident, articulate professional fluency and instilled a builder's velocity.",
    keyTakeaways: [
      "Achieved professional English fluency and confident client communication",
      "Navigated real-world business operations, software delivery, and deadlines",
      "Immersed in India's leading startup ecosystem and engineering culture",
      "Solidified financial independence and resilient problem solving",
    ],
    skillsAndTech: [
      "E-Commerce Systems",
      "System Workflows",
      "Professional Communication",
      "Cross-Functional Ops",
      "Cloud Basics",
    ],
    x: 390,
    y: 645,
  },
  {
    id: "curaj-ajmer",
    stepNumber: 4,
    city: "Bandarsindri (CURAJ), Ajmer",
    state: "Rajasthan",
    institutionOrEra: "Central University of Rajasthan (CURAJ), Bandarsindri",
    title: "MSc in Computer Science & Advanced Deep Tech",
    timeline: "2026 – Present (Current)",
    phase: "Phase 4: Advanced Systems & AI",
    icon: "fa-solid fa-brain",
    tagline:
      "Master's research, AI Engineering, MLOps, and building production systems at CURAJ.",
    story:
      "Currently pursuing an MSc in Computer Science specifically at CURAJ (Bandarsindri, Ajmer). Engaging deeply in advanced distributed operating systems, database internals, theoretical computer science, machine learning pipelines, and agentic AI architectures. Actively building comprehensive open-source knowledge bases, interactive visualization engines, and preparing for GATE CS and UGC NET JRF.",
    keyTakeaways: [
      "Advanced coursework in Operating Systems, DBMS internals, Computer Networks, and AI",
      "Building full-stack interactive learning platforms and algorithmic visualizers",
      "Hands-on with MLOps pipelines (DVC, MLflow, Docker), PyTorch, and AI Agent workflows",
      "Consistently building in public and contributing to open research",
    ],
    skillsAndTech: [
      "MSc Computer Science",
      "AI Engineering & MLOps",
      "Distributed Systems",
      "Next.js / TypeScript",
      "GATE / NET Research",
    ],
    x: 290,
    y: 295,
    isCurrent: true,
  },
];

export default function InteractiveJourneyMap() {
  const [selectedLocation, setSelectedLocation] = useState<JourneyLocation>(
    journeyLocations[3], // Default to current location (CURAJ)
  );
  const [isPlayingTour, setIsPlayingTour] = useState(false);
  const tourTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Tour Auto-Play Effect
  useEffect(() => {
    if (isPlayingTour) {
      tourTimerRef.current = setInterval(() => {
        setSelectedLocation((prev) => {
          const nextIndex = prev.stepNumber % journeyLocations.length;
          return journeyLocations[nextIndex];
        });
      }, 4000);
    } else {
      if (tourTimerRef.current) {
        clearInterval(tourTimerRef.current);
      }
    }

    return () => {
      if (tourTimerRef.current) clearInterval(tourTimerRef.current);
    };
  }, [isPlayingTour]);

  const handleSelectLocation = (loc: JourneyLocation) => {
    setIsPlayingTour(false);
    setSelectedLocation(loc);
  };

  const handlePrev = () => {
    setIsPlayingTour(false);
    const currentIndex = journeyLocations.findIndex(
      (l) => l.id === selectedLocation.id,
    );
    const prevIndex =
      (currentIndex - 1 + journeyLocations.length) % journeyLocations.length;
    setSelectedLocation(journeyLocations[prevIndex]);
  };

  const handleNext = () => {
    setIsPlayingTour(false);
    const currentIndex = journeyLocations.findIndex(
      (l) => l.id === selectedLocation.id,
    );
    const nextIndex = (currentIndex + 1) % journeyLocations.length;
    setSelectedLocation(journeyLocations[nextIndex]);
  };

  return (
    <div className="journey-map-wrapper">
      {/* Top Header & Tour Controls */}
      <div className="journey-map-header">
        <div className="journey-map-title-row">
          <div className="journey-pulse-indicator">
            <span className="journey-pulse-dot"></span>
            <span className="journey-pulse-ring"></span>
          </div>
          <div>
            <h2 className="journey-map-title">
              Interactive Trajectory &amp; Geo-Journey Map
            </h2>
            <p className="journey-map-subtitle">
              Follow my transformation across India: from Himalayan discipline
              at DSVV in Haridwar, through rural deep-study in Khallikote
              Village (Bhikapada, Odisha), industry hustle at my Bengaluru
              workplace, to advanced CS research specifically at CURAJ
              (Bandarsindri).
            </p>
          </div>
        </div>

        {/* Step Selector Pills & Tour Toggle */}
        <div className="journey-controls-row">
          <div className="journey-step-pills">
            {journeyLocations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => handleSelectLocation(loc)}
                className={`journey-step-btn ${selectedLocation.id === loc.id ? "active" : ""} ${loc.isCurrent ? "current" : ""}`}
              >
                <span className="step-num">{loc.stepNumber}</span>
                <span className="step-city">{loc.city}</span>
                {loc.isCurrent && <span className="step-badge">NOW</span>}
              </button>
            ))}
          </div>

          <div className="journey-nav-actions">
            <button
              onClick={handlePrev}
              className="journey-nav-btn"
              title="Previous Phase"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              onClick={() => setIsPlayingTour(!isPlayingTour)}
              className={`journey-tour-btn ${isPlayingTour ? "playing" : ""}`}
            >
              <i
                className={`fa-solid ${isPlayingTour ? "fa-pause" : "fa-play"} mr-1.5`}
              ></i>
              {isPlayingTour ? "Pause Tour" : "Play Route Tour"}
            </button>
            <button
              onClick={handleNext}
              className="journey-nav-btn"
              title="Next Phase"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Main Split Grid: Interactive India Route Map + Active Phase Dossier Card */}
      <div className="journey-split-grid">
        {/* Left: Interactive Vector Map with Animated Curved Flight Paths */}
        <div className="journey-map-canvas-card">
          <div className="journey-map-canvas-inner">
            <svg
              viewBox="0 0 950 850"
              className="journey-svg-map"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Tactical Dot Grid */}
                <pattern
                  id="journeyGrid"
                  width="35"
                  height="35"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="17.5"
                    cy="17.5"
                    r="0.8"
                    fill="var(--border)"
                    opacity="0.8"
                  />
                </pattern>

                {/* Animated Flight Path Gradient */}
                <linearGradient
                  id="routeGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
                </linearGradient>

                {/* Marker Arrow for Flight Paths */}
                <marker
                  id="routeArrow"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#10b981" />
                </marker>
              </defs>

              {/* Background Grid */}
              <rect width="100%" height="100%" fill="url(#journeyGrid)" />

              {/* Sea Watermarks */}
              <text x="100" y="660" className="journey-watermark">
                ARABIAN SEA
              </text>
              <text x="580" y="580" className="journey-watermark">
                BAY OF BENGAL
              </text>
              <text x="380" y="790" className="journey-watermark">
                INDIAN OCEAN
              </text>

              {/* India Sovereign Map Silhouette */}
              <g className="journey-india-landmass">
                {/* Main Sovereign Landmass Outline (Constitutional Boundary of India) */}
                <path
                  d="M 285 45 
                     L 340 75 L 385 85 L 360 145 L 350 170 L 400 175 L 430 200 L 470 205 L 500 230 
                     L 540 235 L 580 230 L 600 260 L 650 250 L 710 240 L 760 230 L 800 250 L 840 280
                     L 850 320 L 830 360 L 810 390 L 780 370 L 760 340 L 730 350 L 700 370 L 660 360
                     L 630 380 L 600 420 L 590 460 L 550 490 L 530 530 L 500 580 L 470 630 L 430 680
                     L 400 730 L 375 755 L 350 720 L 330 670 L 300 620 L 270 560 L 240 500 L 200 460
                     L 150 450 L 130 420 L 160 380 L 180 340 L 170 300 L 200 260 L 220 220 L 210 180
                     L 240 140 L 210 100 L 230 65 Z"
                  className="journey-land-path"
                />

                {/* Subtle Frontier Demarcations for PoK & Aksai Chin */}
                {/* Pakistan Occupied Kashmir (PoK) & Gilgit-Baltistan */}
                <path
                  d="M 230 65 L 285 45 L 265 80 L 245 105 L 215 130 L 205 165 L 185 160 L 195 130 L 210 100 Z"
                  fill="rgba(245, 158, 11, 0.08)"
                  stroke="#f59e0b"
                  strokeWidth="0.8"
                  strokeDasharray="2,2"
                >
                  <title>
                    Pakistan-Occupied Kashmir (PoK) &amp; Gilgit-Baltistan
                  </title>
                </path>

                {/* Aksai Chin (Chinese Occupied Ladakh) */}
                <path
                  d="M 340 75 L 385 85 L 360 145 L 315 135 L 330 95 Z"
                  fill="rgba(239, 68, 68, 0.08)"
                  stroke="#ef4444"
                  strokeWidth="0.8"
                  strokeDasharray="2,2"
                >
                  <title>Aksai Chin (Chinese-Occupied Ladakh)</title>
                </path>

                {/* Shaksgam Valley (Ceded 1963) */}
                <path
                  d="M 285 45 L 340 75 L 305 70 L 265 80 Z"
                  fill="rgba(168, 85, 247, 0.08)"
                  stroke="#a855f7"
                  strokeWidth="0.8"
                  strokeDasharray="2,2"
                >
                  <title>Shaksgam Valley</title>
                </path>

                {/* Subtle Territory Region Tags */}
                <text x="150" y="85" className="journey-territory-tag">
                  PoK
                </text>
                <text x="360" y="70" className="journey-territory-tag">
                  Aksai Chin
                </text>
                <text x="730" y="245" className="journey-territory-tag">
                  Arunachal
                </text>

                {/* Andaman & Nicobar */}
                <ellipse
                  cx="770"
                  cy="650"
                  rx="9"
                  ry="20"
                  className="journey-island"
                />
                <ellipse
                  cx="775"
                  cy="700"
                  rx="7"
                  ry="14"
                  className="journey-island"
                />
                <ellipse
                  cx="780"
                  cy="740"
                  rx="10"
                  ry="16"
                  className="journey-island"
                />

                {/* Lakshadweep */}
                <ellipse
                  cx="230"
                  cy="650"
                  rx="6"
                  ry="10"
                  className="journey-island"
                />
                <ellipse
                  cx="225"
                  cy="680"
                  rx="5"
                  ry="8"
                  className="journey-island"
                />
                <ellipse
                  cx="215"
                  cy="730"
                  rx="6"
                  ry="10"
                  className="journey-island"
                />
              </g>

              {/* Trajectory Arcs (Flight Paths connecting chronological milestones) */}
              <g className="journey-routes">
                {/* Arc 1: Haridwar (350, 195) ➔ Bhikapada (585, 470) */}
                <path
                  d="M 350 195 Q 520 280 585 470"
                  className={`journey-route-line ${selectedLocation.stepNumber >= 2 ? "active" : ""}`}
                  markerEnd="url(#routeArrow)"
                />

                {/* Arc 2: Bhikapada (585, 470) ➔ Bangalore (390, 645) */}
                <path
                  d="M 585 470 Q 520 590 390 645"
                  className={`journey-route-line ${selectedLocation.stepNumber >= 3 ? "active" : ""}`}
                  markerEnd="url(#routeArrow)"
                />

                {/* Arc 3: Bangalore (390, 645) ➔ CURAJ Ajmer (290, 295) */}
                <path
                  d="M 390 645 Q 260 480 290 295"
                  className={`journey-route-line ${selectedLocation.stepNumber >= 4 ? "active" : ""}`}
                  markerEnd="url(#routeArrow)"
                />
              </g>

              {/* Milestone Location Pins */}
              {journeyLocations.map((loc) => {
                const isSelected = selectedLocation.id === loc.id;
                return (
                  <g
                    key={loc.id}
                    className={`journey-pin-group ${isSelected ? "selected" : ""} ${loc.isCurrent ? "current-node" : ""}`}
                    onClick={() => handleSelectLocation(loc)}
                    transform={`translate(${loc.x}, ${loc.y})`}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Pulsating Ring on Selected/Current */}
                    <circle
                      r={isSelected ? "22" : loc.isCurrent ? "18" : "12"}
                      className={`journey-pin-pulse ${loc.isCurrent ? "current" : ""}`}
                    />

                    {/* Outer Target Circle */}
                    <circle
                      r={isSelected ? "11" : "8"}
                      className={`journey-pin-outer ${isSelected ? "active" : ""}`}
                    />

                    {/* Inner Core Circle */}
                    <circle
                      r={isSelected ? "6" : "4.5"}
                      className={`journey-pin-core ${loc.isCurrent ? "current" : ""}`}
                    />

                    {/* Step Number Badge */}
                    <text
                      x="0"
                      y="3.5"
                      className="journey-pin-number"
                      textAnchor="middle"
                    >
                      {loc.stepNumber}
                    </text>

                    {/* Location Name Label */}
                    <text
                      x="16"
                      y="4"
                      className={`journey-pin-label ${isSelected ? "active" : ""}`}
                    >
                      {loc.city} {loc.isCurrent ? "★" : ""}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Tactical Legend Bar */}
            <div className="journey-map-legend">
              <div className="journey-legend-item">
                <span className="journey-legend-badge">1 ➔ 2 ➔ 3 ➔ 4</span>
                <span>Chronological Trajectory</span>
              </div>
              <div className="journey-legend-item">
                <span className="journey-legend-dot current"></span>
                <span>Bandarsindri, CURAJ (Current Base)</span>
              </div>
              <div className="journey-legend-item">
                <span className="journey-legend-dot visited"></span>
                <span>Transformational Phases</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Selected Phase Dossier & Story Card */}
        <div className="journey-dossier-card">
          <div className="journey-dossier-header">
            <div className="journey-dossier-badge-row">
              <span
                className={`journey-phase-pill ${selectedLocation.isCurrent ? "current" : ""}`}
              >
                <i className={`${selectedLocation.icon} mr-1.5`}></i>
                {selectedLocation.phase}
              </span>
              <span className="journey-timeline-badge">
                {selectedLocation.timeline}
              </span>
            </div>

            <h3 className="journey-dossier-title">{selectedLocation.title}</h3>

            <div className="journey-location-meta">
              <i className="fa-solid fa-location-dot text-emerald-500 mr-1.5"></i>
              <strong>{selectedLocation.institutionOrEra}</strong> •{" "}
              {selectedLocation.city}, {selectedLocation.state}
            </div>
          </div>

          <div className="journey-dossier-body">
            {/* Tagline Quote */}
            <div className="journey-tagline-box">
              <i className="fa-solid fa-quote-left mr-1.5 opacity-60"></i>
              {selectedLocation.tagline}
            </div>

            {/* Narrative Story */}
            <div className="journey-dossier-section">
              <span className="journey-section-label">
                <i className="fa-solid fa-book-open mr-1.5 text-sky-500"></i>
                The Story &amp; Mindset Shift
              </span>
              <p className="journey-story-text">{selectedLocation.story}</p>
            </div>

            {/* Key Takeaways */}
            <div className="journey-dossier-section">
              <span className="journey-section-label">
                <i className="fa-solid fa-bullseye mr-1.5 text-emerald-500"></i>
                Key Growth Milestones
              </span>
              <ul className="journey-takeaway-list">
                {selectedLocation.keyTakeaways.map((item, idx) => (
                  <li key={idx}>
                    <i className="fa-solid fa-check text-xs text-emerald-500 mr-2"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills & Focus Areas */}
            <div className="journey-dossier-section">
              <span className="journey-section-label">
                <i className="fa-solid fa-code mr-1.5 text-purple-500"></i>
                Core Competencies &amp; Focus
              </span>
              <div className="journey-skills-wrap">
                {selectedLocation.skillsAndTech.map((skill) => (
                  <span key={skill} className="journey-skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
