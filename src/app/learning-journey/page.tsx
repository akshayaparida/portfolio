'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LearningModule, SubModule } from '@/types/learning';
import { learningModules } from '@/data/learningJourney';
import gitMetadata from '@/data/git-metadata.json';

const STORAGE_KEY = 'learning-journey-user-progress';

interface UserProgress {
  [moduleId: string]: {
    status?: 'not-started' | 'in-progress' | 'completed';
    subModules?: {
      [subModuleId: string]: {
        status?: 'not-started' | 'in-progress' | 'completed';
      };
    };
  };
}

function mergeProgressWithContent(content: LearningModule[], progress: UserProgress): LearningModule[] {
  return content.map(module => {
    const userProgress = progress[module.id];
    if (!userProgress) return module;

    return {
      ...module,
      status: userProgress.status || module.status,
      subModules: module.subModules?.map(sub => ({
        ...sub,
        status: userProgress.subModules?.[sub.id]?.status || sub.status
      }))
    };
  });
}

function extractProgress(modules: LearningModule[]): UserProgress {
  const progress: UserProgress = {};
  modules.forEach(module => {
    progress[module.id] = {
      status: module.status,
      subModules: {}
    };
    module.subModules?.forEach(sub => {
      progress[module.id].subModules![sub.id] = {
        status: sub.status
      };
    });
  });
  return progress;
}

export default function LearningJourneyPage() {
  const [modules, setModules] = useState<LearningModule[]>(learningModules);
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [selectedSubModule, setSelectedSubModule] = useState<SubModule | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedProgressStr = localStorage.getItem(STORAGE_KEY);
    if (savedProgressStr) {
      try {
        const savedProgress: UserProgress = JSON.parse(savedProgressStr);
        const mergedModules = mergeProgressWithContent(learningModules, savedProgress);
        setModules(mergedModules);
      } catch (error) {
        console.error('Failed to load progress:', error);
        setModules(learningModules);
      }
    } else {
      setModules(learningModules);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const progress = extractProgress(modules);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [modules, isLoading]);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="journey-container">
      {/* Home Link */}
      <div className="home-link-wrapper">
        <Link href="/">
          <span className="home-link">Home</span>
        </Link>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          <h1 className="page-title">
            AI Engineering Learning Journey
          </h1>
          <p className="page-subtitle">
            Scroll horizontally • Click modules for details
          </p>

          {/* Horizontal Timeline */}
          <div className="timeline-wrapper">
            {/* Horizontal line */}
            <div className="timeline-line" />

            {/* Scrollable container */}
            <div className="scroll-container">
              <div className="modules-container">
                {modules.map((module, index) => {
                  const hasSubModules = module.subModules && module.subModules.length > 0;

                  return (
                    <div key={module.id} className="module-wrapper">
                      {/* Module box */}
                      <button
                        onClick={() => setSelectedModule(module)}
                        className="module-box"
                      >
                        <div className="module-number">
                          Module {index + 1}
                        </div>
                        <div className="module-title">
                          {module.title}
                        </div>
                        <div className="module-description">
                          {module.description}
                        </div>
                        {hasSubModules && (
                          <div className="module-topics">
                            {module.subModules?.map((sub) => (
                              <div key={sub.id} className="topic-item">
                                • {sub.title}
                              </div>
                            ))}
                          </div>
                        )}
                      </button>

                      {/* Connector line to timeline */}
                      <div className="connector-line" />
                    </div>
                  );
                })}</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>
          Last updated: <a 
            href={gitMetadata.commitUrl}
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            {gitMetadata.commitDate}
          </a>
        </p>
      </footer>

      {/* Modal Popup */}
      {selectedModule && (
        <div className="modal-overlay" onClick={() => setSelectedModule(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button onClick={() => setSelectedModule(null)} className="close-button">
              ×
            </button>

            <div className="modal-inner">
              <h2 className="modal-title">{selectedModule.title}</h2>
              <p className="modal-description">{selectedModule.description}</p>

              {/* Detailed Content */}
              {selectedModule.detailedContent && (
                <div className="modal-detailed-content">
                  <div>{selectedModule.detailedContent}</div>
                </div>
              )}

              {/* Sub-modules */}
              {selectedModule.subModules && selectedModule.subModules.length > 0 && (
                <div className="modal-submodules">
                  <h3 className="submodules-title">Topics Covered</h3>
                  <div className="submodules-list">
                    {selectedModule.subModules.map((sub) => (
                      <div key={sub.id} className="submodule-item">
                        <div className="submodule-checkbox">
                          {sub.status === 'completed' && <span>✓</span>}
                        </div>
                        <div className="submodule-content">
                          <div 
                            className="submodule-title"
                            onClick={() => {
                              if (sub.detailedContent || (sub.subModules && sub.subModules.length > 0)) {
                                setSelectedSubModule(sub);
                              }
                            }}
                            style={{ 
                              cursor: (sub.detailedContent || (sub.subModules && sub.subModules.length > 0)) ? 'pointer' : 'default',
                              textDecoration: (sub.detailedContent || (sub.subModules && sub.subModules.length > 0)) ? 'underline' : 'none'
                            }}
                          >
                            {sub.title}
                          </div>
                          <div className="submodule-description">{sub.description}</div>

                          {/* Resources */}
                          {sub.resources && sub.resources.length > 0 && (
                            <div className="submodule-resources">
                              <div className="resources-title">Resources</div>
                              <div className="resources-list">
                                {sub.resources.map((resource, idx) => (
                                  <a
                                    key={idx}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="resource-link"
                                  >
                                    <span>→</span> {resource.title}
                                    <span className="resource-type">({resource.type})</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SubModule Detail Modal */}
      {selectedSubModule && (
        <div className="modal-overlay" onClick={() => setSelectedSubModule(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedSubModule(null)} className="close-button">
              ×
            </button>

            <div className="modal-inner">
              <h2 className="modal-title">{selectedSubModule.title}</h2>
              <p className="modal-description">{selectedSubModule.description}</p>

              {/* Detailed Content */}
              {selectedSubModule.detailedContent && (
                <div className="modal-detailed-content">
                  <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{selectedSubModule.detailedContent}</pre>
                </div>
              )}

              {/* Nested SubModules if any */}
              {selectedSubModule.subModules && selectedSubModule.subModules.length > 0 && (
                <div className="modal-submodules">
                  <h3 className="submodules-title">Sub-Topics</h3>
                  <div className="submodules-list">
                    {selectedSubModule.subModules.map((nestedSub: SubModule) => (
                      <div key={nestedSub.id} className="submodule-item">
                        <div className="submodule-checkbox">
                          {nestedSub.status === 'completed' && <span>✓</span>}
                        </div>
                        <div className="submodule-content">
                          <div className="submodule-title">{nestedSub.title}</div>
                          <div className="submodule-description">{nestedSub.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources */}
              {selectedSubModule.resources && selectedSubModule.resources.length > 0 && (
                <div className="submodule-resources" style={{ marginTop: '20px' }}>
                  <div className="resources-title">Resources</div>
                  <div className="resources-list">
                    {selectedSubModule.resources.map((resource, idx) => (
                      <a
                        key={idx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resource-link"
                      >
                        <span>→</span> {resource.title}
                        <span className="resource-type">({resource.type})</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Base Styles */
        .loading-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fafafa;
          color: #666;
        }

        .journey-container {
          height: 100vh;
          overflow: hidden;
          background: #fafafa;
          display: flex;
          flex-direction: column;
        }

        .home-link-wrapper {
          padding: 20px 40px;
        }

        .home-link {
          display: inline-block;
          padding: 10px 20px;
          background: #fff;
          border: 2px solid #1a1a1a;
          border-radius: 8px;
          color: #1a1a1a;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s;
          box-shadow: 3px 3px 0 #1a1a1a;
          cursor: pointer;
        }

        .home-link:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 #1a1a1a;
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 20px 40px;
          overflow: hidden;
          min-height: 0;
        }

        .content-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 0;
        }

        .page-title {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 6px;
          color: #1a1a1a;
          text-align: center;
        }

        .page-subtitle {
          font-size: 12px;
          color: #666;
          text-align: center;
          margin-bottom: 20px;
        }

        .timeline-wrapper {
          position: relative;
          flex: 1;
          display: flex;
          align-items: center;
          min-height: 0;
        }

        .timeline-line {
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 3px;
          background: #1a1a1a;
          transform: translateY(-50%);
        }

        .scroll-container {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          position: relative;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
        }

        .modules-container {
          display: flex;
          gap: 100px;
          min-width: max-content;
          padding: 0 40px;
          position: relative;
        }

        .module-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .module-box {
          padding: 12px 14px;
          background: #fff;
          border: 3px solid #1a1a1a;
          border-radius: 10px;
          cursor: pointer;
          position: relative;
          z-index: 2;
          transition: all 0.2s;
          box-shadow: 4px 4px 0 #1a1a1a;
          text-align: left;
          min-width: 200px;
          max-width: 240px;
        }

        .module-box:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 #1a1a1a;
        }

        .module-number {
          font-size: 11px;
          font-weight: 600;
          color: #666;
          margin-bottom: 5px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .module-title {
          font-size: 15px;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1.3;
          margin-bottom: 6px;
        }

        .module-description {
          font-size: 11px;
          color: #666;
          line-height: 1.4;
          margin-bottom: 6px;
        }

        .module-topics {
          font-size: 9px;
          color: #666;
          margin-top: 4px;
        }

        .topic-item {
          margin-bottom: 2px;
        }

        .connector-line {
          position: absolute;
          top: 100%;
          left: 50%;
          width: 3px;
          height: 30px;
          background: #1a1a1a;
          transform: translateX(-50%);
        }

        .footer {
          padding: 1rem 2rem;
          text-align: center;
          background: #fff;
          border-top: 1px solid #e0e0e0;
        }

        .footer p {
          color: #666;
          font-size: 0.9rem;
          margin: 0;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          animation: fadeIn 0.2s ease-out;
        }

        .modal-content {
          background: #fff;
          border: 3px solid #1a1a1a;
          border-radius: 16px;
          max-width: 700px;
          width: 100%;
          max-height: 80vh;
          overflow: auto;
          position: relative;
          box-shadow: 8px 8px 0 #1a1a1a;
          animation: slideUp 0.3s ease-out;
        }

        .close-button {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 36px;
          height: 36px;
          border: 2px solid #1a1a1a;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          transition: all 0.2s;
          z-index: 10;
        }

        .close-button:hover {
          background: #1a1a1a;
          color: #fff;
        }

        .modal-inner {
          padding: 32px;
        }

        .modal-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #1a1a1a;
          padding-right: 40px;
        }

        .modal-description {
          font-size: 14px;
          color: #666;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .modal-detailed-content {
          padding: 20px;
          background: #fafafa;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          margin-bottom: 32px;
          font-size: 14px;
          color: #1a1a1a;
          line-height: 1.7;
          white-space: pre-line;
        }

        .modal-submodules {
          margin-top: 24px;
        }

        .submodules-title {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 16px;
          color: #1a1a1a;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .submodules-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .submodule-item {
          padding: 16px;
          background: #fafafa;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          display: flex;
          align-items: start;
          gap: 12px;
        }

        .submodule-checkbox {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #1a1a1a;
          background: transparent;
          flex-shrink: 0;
          margin-top: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
        }

        .submodule-checkbox span {
          background: #1a1a1a;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .submodule-content {
          flex: 1;
        }

        .submodule-title {
          font-size: 15px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .submodule-description {
          font-size: 13px;
          color: #666;
        }

        .submodule-resources {
          margin-top: 12px;
        }

        .resources-title {
          font-size: 12px;
          font-weight: 700;
          color: #666;
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .resources-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .resource-link {
          font-size: 13px;
          color: #3b82f6;
          text-decoration: none;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .resource-link:hover {
          text-decoration: underline;
        }

        .resource-type {
          font-size: 10px;
          color: #999;
          text-transform: uppercase;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Tablet (768px and below) */
        @media (max-width: 768px) {
          .home-link-wrapper {
            padding: 15px 20px;
          }

          .main-content {
            padding: 15px 20px;
          }

          .page-title {
            font-size: 20px;
          }

          .page-subtitle {
            font-size: 11px;
          }

          .modules-container {
            gap: 60px;
            padding: 0 20px;
          }

          .module-box {
            min-width: 160px;
            max-width: 180px;
            padding: 10px 12px;
          }

          .modal-overlay {
            padding: 15px;
          }

          .modal-content {
            max-width: 95%;
            max-height: 85vh;
            border-radius: 12px;
          }

          .modal-inner {
            padding: 20px;
          }

          .modal-title {
            font-size: 20px;
          }
        }

        /* Mobile (480px and below) */
        @media (max-width: 480px) {
          .home-link-wrapper {
            padding: 10px 15px;
          }

          .home-link {
            padding: 8px 16px;
            font-size: 13px;
          }

          .main-content {
            padding: 10px 15px;
          }

          .page-title {
            font-size: 18px;
          }

          .page-subtitle {
            font-size: 10px;
            margin-bottom: 15px;
          }

          .modules-container {
            gap: 40px;
            padding: 0 15px;
          }

          .module-box {
            min-width: 140px;
            max-width: 160px;
            padding: 8px 10px;
          }

          .module-number {
            font-size: 10px;
          }

          .module-title {
            font-size: 13px;
          }

          .module-description {
            font-size: 10px;
          }

          .module-topics {
            font-size: 8px;
          }

          .scroll-container {
            touch-action: pan-x;
          }

          .modal-overlay {
            padding: 10px;
          }

          .modal-content {
            max-width: 98%;
            max-height: 90vh;
            border-radius: 10px;
            box-shadow: 4px 4px 0 #1a1a1a;
          }

          .modal-inner {
            padding: 16px;
          }

          .modal-title {
            font-size: 18px;
            padding-right: 35px;
          }

          .modal-description {
            font-size: 13px;
          }

          .close-button {
            width: 30px;
            height: 30px;
            top: 15px;
            right: 15px;
            font-size: 18px;
          }

          .modal-detailed-content {
            padding: 15px;
            font-size: 13px;
          }

          .submodule-item {
            padding: 12px;
          }

          .submodule-title {
            font-size: 14px;
          }

          .submodule-description {
            font-size: 12px;
          }
        }

        /* Extra small (360px and below) */
        @media (max-width: 360px) {
          .module-box {
            min-width: 120px;
            max-width: 140px;
          }

          .modules-container {
            gap: 30px;
          }
        }
      `}</style>
    </div>
  );
}
