"use client";

import Link from "next/link";
import gitMetadata from "@/data/git-metadata.json";

interface JourneyMilestone {
  id: string;
  phase: string;
  title: string;
  description: string;
  icon: string;
  highlights: string[];
  color: string;
}

const journeyMilestones: JourneyMilestone[] = [
  {
    id: "university",
    phase: "The Beginning",
    title: "University Days at DSVV, Haridwar",
    description:
      "Started my journey as an introverted student with limited skills and struggling with English communication. The traditional education system felt constraining.",
    icon: "fa-solid fa-graduation-cap",
    highlights: [
      "Introverted and shy personality",
      "Limited technical skills",
      "Struggling with English",
      "Traditional rote learning approach",
    ],
    color: "#6b7280",
  },
  {
    id: "mindset-shift",
    phase: "The Awakening",
    title: "The Big Bang Theory Effect",
    description:
      "COVID lockdown became a turning point. Watching The Big Bang Theory sparked a realization - real learning is about understanding deeply, not cramming. Embraced the 'high agency' mindset.",
    icon: "fa-solid fa-lightbulb",
    highlights: [
      "Discovered high agency learning",
      "Understanding > Cramming",
      "Mindset transformation",
      "Self-directed learning began",
    ],
    color: "#6b7280",
  },
  {
    id: "bangalore",
    phase: "The Leap",
    title: "Moving to Bangalore",
    description:
      "Made a bold decision to move to the tech capital of India. Couldn't pursue a master's degree due to family financial constraints, but chose action over waiting.",
    icon: "fa-solid fa-plane",
    highlights: [
      "Left comfort zone",
      "Financial constraints → Motivation",
      "Chose real-world experience",
      "The startup city calling",
    ],
    color: "#6b7280",
  },
  {
    id: "ecommerce",
    phase: "The Grind",
    title: "The Communication Bootcamp",
    description:
      "Worked in e-commerce operations. This wasn't just a job - it was a transformation. Daily client interactions turned my hesitant English into confident fluency.",
    icon: "fa-solid fa-briefcase",
    highlights: [
      "Professional experience gained",
      "English fluency achieved",
      "Client communication mastery",
      "Business operations understanding",
    ],
    color: "#6b7280",
  },
  {
    id: "ai-journey",
    phase: "The Evolution",
    title: "The AI Revolution & Upskilling",
    description:
      "As AI transformed the tech landscape, I made a decisive move to upskill. Now building with AI, contributing to open source, and matching the current tech industry demands.",
    icon: "fa-solid fa-rocket",
    highlights: [
      "AI Engineering focus",
      "Open source contributions",
      "Building real projects",
      "Continuous learning mindset",
    ],
    color: "#6b7280",
  },
  {
    id: "present",
    phase: "Now",
    title: "Building in Public",
    description:
      "Today, I'm a high agency guy who learns by building. Hands-on with AI Engineering, MLOps, and Agentic AI. The journey from an introvert to a builder continues.",
    icon: "fa-solid fa-bolt",
    highlights: [
      "AI Engineering",
      "MLOps & Agentic AI",
      "Open Source Contributor",
      "Forever Learning",
    ],
    color: "#10b981",
  },
];

export default function LearningJourneyPage() {
  return (
    <div className="journey-container">
      {/* Header */}
      <header className="journey-header">
        <Link href="/" className="back-link" title="Home">
          <i className="fa-solid fa-house"></i>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="journey-hero">
        <h1 className="journey-title">
          <span className="title-emoji">
            <i className="fa-solid fa-seedling"></i>
          </span>
          My Journey
        </h1>
        <p className="journey-subtitle">
          From an introverted student to a high agency builder — here&apos;s my
          story.
        </p>
      </section>

      {/* Timeline */}
      <section className="timeline-section">
        <div className="timeline">
          {journeyMilestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
            >
              <div
                className="timeline-marker"
                style={{ background: milestone.color }}
              >
                <span className="marker-icon">
                  <i className={milestone.icon}></i>
                </span>
              </div>

              <div className="timeline-content">
                <div
                  className="phase-badge"
                  style={{
                    background: `${milestone.color}20`,
                    color: milestone.color,
                  }}
                >
                  {milestone.phase}
                </div>
                <h3 className="milestone-title">{milestone.title}</h3>
                <p className="milestone-description">{milestone.description}</p>

                <div className="highlights">
                  {milestone.highlights.map((highlight, idx) => (
                    <span key={idx} className="highlight-tag">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote-section">
        <blockquote className="journey-quote">
          &quot;The best time to plant a tree was 20 years ago. The second best
          time is now.&quot;
        </blockquote>
      </section>

      {/* AI Engineering Link */}
      <section className="explore-section">
        <Link href="/ai-engineering" className="explore-link">
          <div className="explore-content">
            <span className="explore-icon">
              <i className="fa-solid fa-brain"></i>
            </span>
            <div className="explore-text">
              <h3>AI Engineering Resources</h3>
              <p>Explore my curated learning materials and resources</p>
            </div>
            <span className="explore-arrow">
              <i className="fa-solid fa-chevron-right"></i>
            </span>
          </div>
        </Link>
      </section>

      {/* Footer */}
      <footer className="journey-footer">
        <p>
          Last updated:{" "}
          <a
            href={gitMetadata.commitUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {gitMetadata.commitDate}
          </a>
          {" · "}
          <a
            href="https://github.com/akshayaparida/portfolio/issues/new?title=Learning%20Journey%20Error&labels=bug&body=%23%23%20Error%20Description%0A%0A%3C!--%20Describe%20the%20error%20you%20found%20--%3E%0A%0A%23%23%20Location%0A%0A-%20**Page%3A**%20Learning%20Journey%0A-%20**Section%3A**%20%0A%0A%23%23%20Expected%20Behavior%0A%0A%3C!--%20What%20should%20happen%3F%20--%3E%0A%0A%23%23%20Actual%20Behavior%0A%0A%3C!--%20What%20actually%20happens%3F%20--%3E%0A%0A%23%23%20Screenshot%20%28optional%29%0A%0A"
            target="_blank"
            rel="noopener noreferrer"
          >
            Report an error
          </a>
        </p>
      </footer>

      <style jsx>{`
        .journey-container {
          min-height: 100vh;
          background: #fafafa;
          padding: 0;
        }

        .journey-header {
          padding: 1.5rem 2rem;
          position: sticky;
          top: 0;
          background: rgba(250, 250, 250, 0.9);
          backdrop-filter: blur(10px);
          z-index: 100;
          border-bottom: 1px solid #e5e7eb;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #374151;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .back-link:hover {
          background: #f3f4f6;
          color: #111827;
        }

        .journey-hero {
          text-align: center;
          padding: 4rem 2rem 3rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .journey-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .title-emoji {
          font-size: 2.5rem;
        }

        .journey-subtitle {
          font-size: 1.125rem;
          color: #6b7280;
          line-height: 1.7;
          max-width: 600px;
          margin: 0 auto;
        }

        .timeline-section {
          padding: 2rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .timeline {
          position: relative;
          padding: 2rem 0;
        }

        .timeline::before {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 100%;
          background: #e5e7eb;
          border-radius: 4px;
        }

        .timeline-item {
          position: relative;
          width: 50%;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .timeline-item.left {
          left: 0;
          padding-right: 3rem;
        }

        .timeline-item.right {
          left: 50%;
          padding-left: 3rem;
        }

        .timeline-marker {
          position: absolute;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
          z-index: 10;
        }

        .timeline-item.left .timeline-marker {
          right: -25px;
        }

        .timeline-item.right .timeline-marker {
          left: -25px;
        }

        .marker-icon {
          font-size: 1.25rem;
          color: #fff;
        }

        .timeline-content {
          background: #ffffff;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
        }

        .timeline-content:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .phase-badge {
          display: inline-block;
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.75rem;
        }

        .milestone-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }

        .milestone-description {
          font-size: 0.9rem;
          color: #4b5563;
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        .highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .highlight-tag {
          display: inline-block;
          padding: 0.25rem 0.6rem;
          background: #f3f4f6;
          color: #374151;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .quote-section {
          padding: 3rem 2rem;
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
        }

        .journey-quote {
          font-size: 1.25rem;
          font-style: italic;
          color: #6b7280;
          line-height: 1.8;
          border-left: 4px solid #10b981;
          padding-left: 1.5rem;
          margin: 0;
          text-align: left;
        }

        .explore-section {
          max-width: 600px;
          margin: 0 auto;
          padding: 0 2rem 2rem;
        }

        .explore-link {
          display: block;
          text-decoration: none;
        }

        .explore-content {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          transition: all 0.2s;
        }

        .explore-content:hover {
          border-color: #d1d5db;
          background: #fafafa;
        }

        .explore-icon {
          font-size: 1.5rem;
        }

        .explore-text {
          flex: 1;
        }

        .explore-text h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #111827;
          margin: 0 0 0.25rem 0;
        }

        .explore-text p {
          font-size: 0.85rem;
          color: #6b7280;
          margin: 0;
        }

        .explore-arrow {
          font-size: 1.25rem;
          color: #9ca3af;
          transition: transform 0.2s;
        }

        .explore-content:hover .explore-arrow {
          transform: translateX(4px);
          color: #6b7280;
        }

        .journey-footer {
          text-align: center;
          padding: 2rem;
          border-top: 1px solid #e5e7eb;
          margin-top: 2rem;
        }

        .journey-footer p {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .journey-footer a {
          color: #3b82f6;
          text-decoration: underline;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .journey-title {
            font-size: 1.75rem;
          }

          .journey-subtitle {
            font-size: 1rem;
          }

          .timeline::before {
            left: 20px;
          }

          .timeline-item {
            width: 100%;
            padding-left: 60px !important;
            padding-right: 1rem !important;
            left: 0 !important;
          }

          .timeline-marker {
            left: -5px !important;
            right: auto !important;
            width: 40px;
            height: 40px;
          }

          .marker-icon {
            font-size: 1.2rem;
          }

          .milestone-title {
            font-size: 1.1rem;
          }

          .milestone-description {
            font-size: 0.85rem;
          }

          .highlight-tag {
            font-size: 0.7rem;
          }
        }

        @media (max-width: 480px) {
          .journey-hero {
            padding: 2.5rem 1rem 2rem;
          }

          .journey-title {
            font-size: 1.5rem;
            flex-direction: column;
            gap: 0.5rem;
          }

          .title-emoji {
            font-size: 2rem;
          }

          .timeline-section {
            padding: 1rem;
          }

          .timeline-content {
            padding: 1rem;
          }

          .journey-quote {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
