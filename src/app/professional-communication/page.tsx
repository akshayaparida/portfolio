"use client";

import BlogPageHeader from "@/components/BlogPageHeader";
import PageFooter from "@/components/PageFooter";

export default function ProfessionalCommunicationPage() {
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
      {/* Consistent Header */}
      <BlogPageHeader
        title="Professional Communication — NPTEL Guide"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <main className="content-wrapper">
        <section className="intro-card">
          <div className="badge-row">
            <span className="badge">Study Resources</span>
          </div>
          <h2>
            <i className="fa-solid fa-comments"></i> Professional Communication
            Roadmap
          </h2>
          <p>
            Strong communication skills are essential for engineering and career
            growth. These curated NPTEL courses from top IITs cover technical
            writing, soft skills, and executive business communication.
          </p>
        </section>

        <section className="nptel-section">
          <h2 className="nptel-heading">
            <i className="fa-solid fa-graduation-cap"></i> Recommended NPTEL
            Courses
          </h2>
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
                    <i className="fa-solid fa-user-tie"></i> {course.instructor}
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
      </main>

      {/* Consistent Footer */}
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
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          box-sizing: border-box;
          flex: 1;
        }

        .badge-row {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .badge {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #10b981;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
          padding: 0.25rem 0.65rem;
          border-radius: 6px;
        }

        .intro-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 2rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .intro-card h2 {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--heading-color);
          margin: 0 0 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          letter-spacing: -0.01em;
        }

        .intro-card h2 i {
          color: #10b981;
        }

        .intro-card p {
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0;
          font-size: 0.95rem;
        }

        .nptel-section {
          margin-top: 0.5rem;
        }

        .nptel-heading {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--heading-color);
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .nptel-heading i {
          color: #10b981;
        }

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

        @media (max-width: 480px) {
          .content-wrapper {
            padding: 1rem;
          }
          .nptel-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
