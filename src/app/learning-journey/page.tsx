'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { LearningModule } from '@/types/learning';
import { learningModules } from '@/data/learningJourney';

const STORAGE_KEY = 'learning-journey-progress';
const DATA_VERSION = '3';

export default function LearningJourneyPage() {
  const [modules, setModules] = useState<LearningModule[]>(learningModules);
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedVersion = localStorage.getItem(STORAGE_KEY + '-version');
    if (savedVersion !== DATA_VERSION) {
      // Clear old data if version mismatch
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(STORAGE_KEY + '-version', DATA_VERSION);
    }
    
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      try {
        setModules(JSON.parse(savedProgress));
      } catch (error) {
        console.error('Failed to load:', error);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(modules));
    }
  }, [modules, isLoading]);

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa' }}>
        <p style={{ color: '#666' }}>Loading...</p>
      </div>
    );
  }

  const completedCount = modules.reduce((acc, m) => 
    acc + (m.subModules?.filter(s => s.status === 'completed').length || (m.status === 'completed' ? 1 : 0)), 0
  );

  return (
    <div style={{ height: '100vh', overflow: 'hidden', background: '#fafafa', display: 'flex', flexDirection: 'column' }}>
      {/* Home Link */}
      <div style={{ padding: '20px 40px' }}>
        <Link href="/" style={{
          display: 'inline-block',
          padding: '10px 20px',
          background: '#fff',
          border: '2px solid #1a1a1a',
          borderRadius: '8px',
          color: '#1a1a1a',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '14px',
          transition: 'all 0.2s',
          boxShadow: '3px 3px 0 #1a1a1a'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translate(-2px, -2px)';
          e.currentTarget.style.boxShadow = '5px 5px 0 #1a1a1a';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translate(0, 0)';
          e.currentTarget.style.boxShadow = '3px 3px 0 #1a1a1a';
        }}>
          Home
        </Link>
      </div>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 40px 20px', overflow: 'hidden', minHeight: 0 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
          <h1 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '6px', color: '#1a1a1a', textAlign: 'center' }}>
            AI Engineering Learning Journey
          </h1>
          <p style={{ fontSize: '12px', color: '#666', textAlign: 'center', marginBottom: '20px' }}>
            Scroll horizontally to see progress • Click modules for details
          </p>

          {/* Horizontal Timeline */}
          <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', minHeight: 0 }}>
            {/* Horizontal line */}
            <div style={{
              position: 'absolute',
              left: '0',
              right: '0',
              top: '50%',
              height: '3px',
              background: '#1a1a1a',
              transform: 'translateY(-50%)'
            }} />

            {/* Scrollable container */}
            <div style={{
              width: '100%',
              overflowX: 'auto',
              overflowY: 'hidden',
              position: 'relative'
            }}>
              <div style={{
                display: 'flex',
                gap: '100px',
                minWidth: 'max-content',
                padding: '0 40px',
                position: 'relative'
              }}>
                {modules.map((module, index) => {
                  const hasSubModules = module.subModules && module.subModules.length > 0;
                  const completedSubs = module.subModules?.filter(s => s.status === 'completed').length || 0;
                  const totalSubs = module.subModules?.length || 1;
                  const isComplete = hasSubModules ? completedSubs === totalSubs : module.status === 'completed';
                  const isInProgress = hasSubModules ? completedSubs > 0 && completedSubs < totalSubs : module.status === 'in-progress';

                  return (
                    <div key={module.id} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {/* Module box */}
                      <button
                        onClick={() => setSelectedModule(module)}
                        style={{
                          padding: '12px 14px',
                          background: '#fff',
                          border: '3px solid #1a1a1a',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          position: 'relative',
                          zIndex: 2,
                          transition: 'all 0.2s',
                          boxShadow: '4px 4px 0 #1a1a1a',
                          textAlign: 'left'
                        }}
                        className="module-box"
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = 'translate(-2px, -2px)';
                          e.currentTarget.style.boxShadow = '6px 6px 0 #1a1a1a';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = 'translate(0, 0)';
                          e.currentTarget.style.boxShadow = '4px 4px 0 #1a1a1a';
                        }}
                      >
                        <div style={{ fontSize: '11px', fontWeight: '600', color: '#666', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Module {index + 1}
                        </div>
                        <div style={{ fontSize: '15px', fontWeight: '700', color: '#1a1a1a', lineHeight: '1.3', marginBottom: '6px' }}>
                          {module.title}
                        </div>
                        <div style={{ fontSize: '11px', color: '#666', lineHeight: '1.4', marginBottom: '6px' }}>
                          {module.description}
                        </div>
                        {hasSubModules && (
                          <div style={{ fontSize: '9px', color: '#666', marginTop: '4px' }}>
                            {module.subModules?.map((sub) => (
                              <div key={sub.id} style={{ marginBottom: '2px' }}>
                                • {sub.title}
                              </div>
                            ))}
                          </div>
                        )}
                      </button>

                      {/* Connector line to timeline */}
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        width: '3px',
                        height: '30px',
                        background: '#1a1a1a',
                        transform: 'translateX(-50%)'
                      }} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        padding: '1rem 2rem',
        textAlign: 'center',
        background: '#fff',
        borderTop: '1px solid #e0e0e0'
      }}>
        <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </footer>

      {/* Modal Popup */}
      {selectedModule && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setSelectedModule(null)}
        >
          <div
            style={{
              background: '#fff',
              border: '3px solid #1a1a1a',
              borderRadius: '16px',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'auto',
              position: 'relative',
              boxShadow: '8px 8px 0 #1a1a1a',
              animation: 'slideUp 0.3s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedModule(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '36px',
                height: '36px',
                border: '2px solid #1a1a1a',
                borderRadius: '50%',
                background: '#fff',
                cursor: 'pointer',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#1a1a1a';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = '#1a1a1a';
              }}
            >
              ×
            </button>

            <div style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '10px', color: '#1a1a1a', paddingRight: '40px' }}>
                {selectedModule.title}
              </h2>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px', lineHeight: '1.6' }}>
                {selectedModule.description}
              </p>

              {/* Why study this & Importance */}
              {selectedModule.detailedContent && (
                <div style={{
                  padding: '20px',
                  background: '#fafafa',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  marginBottom: '32px'
                }}>
                  <div style={{ fontSize: '14px', color: '#1a1a1a', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                    {selectedModule.detailedContent}
                  </div>
                </div>
              )}

              {/* Sub-modules or content */}
              {selectedModule.subModules && selectedModule.subModules.length > 0 ? (
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Topics Covered
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {selectedModule.subModules.map((sub) => (
                      <div key={sub.id} style={{
                        padding: '16px',
                        background: '#fafafa',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: '2px solid #1a1a1a',
                            background: sub.status === 'completed' ? '#1a1a1a' : 'transparent',
                            flexShrink: 0,
                            marginTop: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {sub.status === 'completed' && (
                              <span style={{ color: '#fff', fontSize: '12px', fontWeight: '700' }}>✓</span>
                            )}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '15px', fontWeight: '600', color: '#1a1a1a', marginBottom: '4px' }}>
                              {sub.title}
                            </div>
                            <div style={{ fontSize: '13px', color: '#666' }}>
                              {sub.description}
                            </div>

                            {/* Resources for this sub-module */}
                            {sub.resources && sub.resources.length > 0 && (
                              <div style={{ marginTop: '12px' }}>
                                <div style={{ fontSize: '12px', fontWeight: '700', color: '#666', marginBottom: '8px', textTransform: 'uppercase' }}>
                                  Resources
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                  {sub.resources.map((resource, idx) => (
                                    <a
                                      key={idx}
                                      href={resource.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        fontSize: '13px',
                                        color: '#3b82f6',
                                        textDecoration: 'none',
                                        fontWeight: '600',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                      }}
                                      onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                      onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                                    >
                                      <span>→</span> {resource.title}
                                      <span style={{ fontSize: '10px', color: '#999', textTransform: 'uppercase' }}>
                                        ({resource.type})
                                      </span>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                selectedModule.resources && selectedModule.resources.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Learning Resources
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {selectedModule.resources.map((resource, idx) => (
                        <a
                          key={idx}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: '16px',
                            background: '#fafafa',
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            color: '#1a1a1a',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'all 0.2s'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.borderColor = '#1a1a1a';
                            e.currentTarget.style.background = '#fff';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.borderColor = '#e0e0e0';
                            e.currentTarget.style.background = '#fafafa';
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px' }}>
                              {resource.title}
                            </div>
                            <div style={{ fontSize: '12px', color: '#999', textTransform: 'uppercase', fontWeight: '600' }}>
                              {resource.type}
                            </div>
                          </div>
                          <span style={{ fontSize: '24px' }}>→</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
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
        /* Hide scrollbar but keep functionality */
        *::-webkit-scrollbar {
          height: 8px;
        }
        *::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        *::-webkit-scrollbar-thumb {
          background: #1a1a1a;
          border-radius: 4px;
        }
        *::-webkit-scrollbar-thumb:hover {
          background: #333;
        }

        /* Mobile Responsive Styles */
        .page-title {
          fontSize: 26px;
        }
        .page-subtitle {
          fontSize: 12px;
        }
        .module-box {
          minWidth: 200px;
          maxWidth: 240px;
        }
        .modules-container {
          gap: 100px;
        }

        @media (max-width: 768px) {
          .home-link-container {
            padding: 12px 15px !important;
          }
          .main-content {
            padding: 10px 15px !important;
          }
          .page-title {
            fontSize: 20px !important;
          }
          .page-subtitle {
            fontSize: 11px !important;
          }
          .module-box {
            minWidth: 160px !important;
            maxWidth: 180px !important;
            padding: 10px 12px !important;
          }
          .modules-container {
            gap: 60px !important;
            padding: 0 15px !important;
          }
        }

        @media (max-width: 480px) {
          .home-link-container {
            padding: 10px !important;
          }
          .main-content {
            padding: 10px !important;
          }
          .page-title {
            fontSize: 18px !important;
          }
          .page-subtitle {
            fontSize: 10px !important;
            marginBottom: 10px !important;
          }
          .module-box {
            minWidth: 140px !important;
            maxWidth: 160px !important;
            padding: 8px 10px !important;
          }
          .modules-container {
            gap: 40px !important;
            padding: 0 10px !important;
          }
        }
      `}</style>
    </div>
  );
}
