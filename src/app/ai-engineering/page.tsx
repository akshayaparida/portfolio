"use client";

import { useState } from "react";
import BlogPageHeader from "@/components/BlogPageHeader";
import PageFooter from "@/components/PageFooter";
import { learningModules } from "@/data/learningJourney";

export default function AIEngineeringPage() {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const activeModule = learningModules[activeModuleIndex];

  return (
    <div className="ai-eng-container">
      {/* Consistent Header */}
      <BlogPageHeader
        title="AI Engineering Resources"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div className="main-layout">
        {/* Sidebar Navigation - Left Side */}
        <aside className="sidebar">
          <h3 className="sidebar-title">Modules</h3>
          <nav className="module-nav">
            {learningModules.map((module, index) => (
              <button
                key={module.id}
                onClick={() => setActiveModuleIndex(index)}
                className={`nav-item ${index === activeModuleIndex ? "active" : ""}`}
              >
                <span className="nav-number">{index + 1}</span>
                <span className="nav-text">{module.title}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="content-area">
          <article className="module-card">
            <div className="module-header">
              <span className="module-number">
                Module {activeModuleIndex + 1}
              </span>
              <h2 className="module-title">{activeModule.title}</h2>
              <p className="module-description">{activeModule.description}</p>
            </div>

            {activeModule.detailedContent && (
              <div className="module-content">
                <pre>{activeModule.detailedContent}</pre>
              </div>
            )}

            {activeModule.subModules && activeModule.subModules.length > 0 && (
              <div className="submodules">
                <h3 className="section-title">Topics</h3>
                {activeModule.subModules.map((sub) => (
                  <div key={sub.id} className="submodule">
                    <h4 className="submodule-title">{sub.title}</h4>
                    <p className="submodule-description">{sub.description}</p>

                    {sub.resources && sub.resources.length > 0 && (
                      <div className="resources">
                        <h5 className="resources-title">Resources</h5>
                        <ul className="resources-list">
                          {sub.resources.map((resource, idx) => (
                            <li key={idx}>
                              <a
                                href={resource.url}
                                target={
                                  resource.url.startsWith("/")
                                    ? "_self"
                                    : "_blank"
                                }
                                rel="noopener noreferrer"
                                className="resource-link"
                              >
                                {resource.title}
                                <span className="resource-type">
                                  {resource.type}
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </article>
        </main>
      </div>

      {/* Consistent Footer */}
      <PageFooter moduleName="AI Engineering" issueLabel="ai-engineering" />

      <style jsx>{`
        .ai-eng-container {
          min-height: 100vh;
          background: var(--bg-light);
          color: var(--text-primary);
          display: flex;
          flex-direction: column;
          overflow-y: scroll;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
          background: rgba(250, 250, 250, 0.95);
          backdrop-filter: blur(10px);
          z-index: 100;
          border-bottom: 1px solid #e5e7eb;
        }

        .header-title {
          flex: 1;
          font-size: 1.1rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .back-link,
        .home-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          color: #374151;
          text-decoration: none;
          transition: all 0.2s;
          background: #fff;
          border: 1px solid #e5e7eb;
        }

        .back-link:hover,
        .home-link:hover {
          background: #f3f4f6;
          color: #111827;
        }

        .main-layout {
          display: grid;
          grid-template-columns: 250px minmax(0, 1fr);
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          flex: 1;
          align-items: start;
          width: 100%;
          box-sizing: border-box;
        }

        .content-area {
          min-width: 0;
          min-height: 100vh;
          width: 100%;
          max-width: 100%;
        }

        .module-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 2rem;
          width: 100%;
          box-sizing: border-box;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .module-header {
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
        }

        .module-number {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .module-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--heading-color);
          margin: 0.5rem 0;
        }

        .module-description {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        .module-content {
          background: var(--bg-light);
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          overflow-x: auto;
          border: 1px solid var(--border);
        }

        .module-content pre {
          font-family: inherit;
          font-size: 0.85rem;
          color: var(--text-primary);
          line-height: 1.7;
          white-space: pre-wrap;
          margin: 0;
        }

        .section-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--heading-color);
          margin: 0 0 1rem 0;
        }

        .submodules {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .submodule {
          padding: 1.25rem;
          background: var(--bg-light);
          border-radius: 8px;
          border-left: 3px solid #10b981;
          border-top: 1px solid var(--border);
          border-right: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .submodule-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--heading-color);
          margin: 0 0 0.5rem 0;
        }

        .submodule-description {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin: 0 0 1rem 0;
        }

        .resources-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0 0 0.75rem 0;
        }

        .resources-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .resource-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0.75rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: #10b981;
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .resource-link:hover {
          background: var(--bg-light);
          border-color: #10b981;
        }

        .resource-type {
          font-size: 0.65rem;
          color: var(--text-muted);
          text-transform: uppercase;
          padding: 0.15rem 0.35rem;
          background: var(--bg-light);
          border: 1px solid var(--border);
          border-radius: 4px;
        }

        /* Sidebar */
        .sidebar {
          position: sticky;
          top: 80px;
          height: fit-content;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.25rem;
        }

        .sidebar-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0 0 1rem 0;
        }

        .module-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--surface);
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .nav-item:hover {
          background: var(--bg-light);
          border-color: #10b981;
        }

        .nav-item.active {
          background: rgba(16, 185, 129, 0.1);
          border-color: #10b981;
        }

        .nav-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--bg-light);
          border: 1px solid var(--border);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .nav-item.active .nav-number {
          background: #10b981;
          color: #fff;
          border-color: #10b981;
        }

        .nav-text {
          flex: 1;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
          line-height: 1.3;
        }

        .nav-item.active .nav-text {
          color: var(--heading-color);
          font-weight: 700;
        }

        /* Mobile */
        @media (max-width: 900px) {
          .main-layout {
            display: flex;
            flex-direction: column;
            padding: 1rem;
          }

          .sidebar {
            position: static;
            order: -1;
            display: block !important;
            margin-bottom: 1rem;
          }

          .module-nav {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .nav-item {
            flex: 1;
            min-width: 120px;
            padding: 0.5rem 0.75rem;
          }

          .nav-text {
            font-size: 0.75rem;
          }

          .module-card {
            min-height: auto;
          }
        }

        @media (max-width: 600px) {
          .module-card {
            padding: 1.25rem;
            min-height: auto;
          }

          .module-title {
            font-size: 1.25rem;
          }

          .nav-item {
            min-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
