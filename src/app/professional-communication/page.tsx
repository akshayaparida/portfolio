"use client";

import Link from "next/link";

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
      <header className="page-header">
        <Link href="/" className="back-btn" title="Back to Home">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <div className="header-titles">
          <span className="badge">Study Resources</span>
          <h1 className="main-title">Professional Communication</h1>
        </div>
      </header>

      <main className="content-wrapper">
        <section className="intro-card">
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

      <style jsx>{`
        .page-container {
          min-height: 100vh;
          background: #fafafa;
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .page-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }
        .back-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
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
        .badge {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #10b981;
          background: #ecfdf5;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
        }
        .main-title {
          font-size: 1.75rem;
          font-weight: 800;
          color: #111827;
          margin: 0.25rem 0 0 0;
        }
        .content-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .intro-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 2rem;
        }
        .intro-card h2 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
          margin-top: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .intro-card h2 i {
          color: #10b981;
        }
        .intro-card p {
          color: #4b5563;
          line-height: 1.6;
          margin: 0;
        }
        .nptel-section {
          margin-top: 0.5rem;
        }
        .nptel-heading {
          font-size: 1.2rem;
          font-weight: 700;
          color: #111827;
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
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.2s ease;
        }
        .nptel-card:hover {
          border-color: #10b981;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
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
          font-size: 0.7rem;
          font-weight: 600;
          color: #374151;
          background: #f3f4f6;
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }
        .nptel-badge-inst i {
          color: #10b981;
        }
        .nptel-badge-weeks {
          font-size: 0.7rem;
          font-weight: 600;
          color: #6b7280;
          background: #fafafa;
          border: 1px solid #f3f4f6;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }
        .nptel-course-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #111827;
          margin: 0.25rem 0 0.35rem 0;
          line-height: 1.35;
        }
        .nptel-instructor-name {
          font-size: 0.825rem;
          color: #6b7280;
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
          color: #4b5563;
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
          padding: 0.55rem 0.9rem;
          background: #fafafa;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          color: #374151;
          font-size: 0.825rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .nptel-card:hover .nptel-link-btn {
          background: #10b981;
          border-color: #10b981;
          color: #ffffff;
        }

        @media (max-width: 480px) {
          .page-container {
            padding: 1rem;
          }
          .main-title {
            font-size: 1.35rem;
          }
          .nptel-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
