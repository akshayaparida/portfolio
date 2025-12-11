'use client';

import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize from 'rehype-sanitize';
import { mathematicsModules } from '@/data/mathematics';
import CodeBlock from '@/components/CodeBlock';
import ErrorBoundary from '@/components/ErrorBoundary';
import MathErrorFallback from '@/components/MathErrorFallback';
import MathContentSkeleton from '@/components/MathContentSkeleton';
import gitMetadata from '@/data/git-metadata.json';

// Dynamically import visualization components with loading fallbacks
const VectorSpace2D = lazy(() => import('@/components/math-visualizations/VectorSpace2D'));
const MatrixMultiplication = lazy(() => import('@/components/math-visualizations/MatrixMultiplication'));
const PCAVisualization = lazy(() => import('@/components/math-visualizations/PCAVisualization'));
const GradientDescentPlayground = lazy(() => import('@/components/math-visualizations/GradientDescentPlayground'));
const ActivationFunctions = lazy(() => import('@/components/math-visualizations/ActivationFunctions'));
const ScalarMultiplication = lazy(() => import('@/components/math-visualizations/ScalarMultiplication'));

const demoComponents: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  'vectors': VectorSpace2D,
  'matrices': MatrixMultiplication,
  'pca': PCAVisualization,
  'gradient-descent': GradientDescentPlayground,
  'activations': ActivationFunctions,
  'scalar-mult': ScalarMultiplication,
};

// Loading component for dynamic imports
const LoadingDemo = () => (
  <div className="loading-demo">
    <div className="loading-spinner"></div>
    <p className="loading-text">Loading interactive demo...</p>
    <style jsx>{`
      .loading-demo {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 300px;
        padding: 20px;
        background: #f0f9ff;
        border-radius: 8px;
        border: 2px dashed #3b82f6;
      }
      
      .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #e5e7eb;
        border-top: 4px solid #3b82f6;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 16px;
      }
      
      .loading-text {
        color: #374151;
        margin: 0;
        font-size: 14px;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default function MathematicsComprehensive() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [moduleLoading, setModuleLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const moduleButtonRefs = useRef<Record<string, HTMLElement | null>>({});

  const selectedModule = selectedSection ? mathematicsModules.find(m => m.id === selectedSection) : null;

  // Handle keyboard events for accessibility
  const handleKeyDown = (selectedModuleItem: typeof mathematicsModules[0], event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setSelectedSection(selectedModuleItem.id);
    }
  };

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedSection) {
        setSelectedSection(null);
      }
    };

    window.addEventListener('keydown', handleEsc as EventListener);
    return () => {
      window.removeEventListener('keydown', handleEsc as EventListener);
    };
  }, [selectedSection]);

  // Track when a new module is selected to show loading state and manage focus
  useEffect(() => {
    if (selectedSection) {
      setModuleLoading(true);
      // Store the element that triggered the modal
      triggerRef.current = document.activeElement as HTMLElement;

      // Announce modal opening to screen readers
      const currentModule = mathematicsModules.find(m => m.id === selectedSection);
      if (currentModule) {
        setAlertMessage(`Opened ${currentModule.title} module. Press Escape to close.`);
      }

      // Simulate a small delay for loading indication
      const timer = setTimeout(() => {
        setModuleLoading(false);
        // Focus the modal when it opens
        if (modalRef.current) {
          modalRef.current.focus();
          // Ensure the focused element is not obscured by header
          if (typeof modalRef.current.scrollIntoView === 'function') {
            modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
          }
        }
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setModuleLoading(false);
      // Announce modal closing to screen readers
      setAlertMessage('Closed module.');
      // Return focus to the element that triggered the modal when it closes
      if (triggerRef.current) {
        triggerRef.current.focus();
      }
    }
  }, [selectedSection]);

  return (
    <div className="math-comprehensive">
      {/* ARIA live region for screen reader announcements */}
      <div
        id="alert-region"
        role="alert"
        aria-live="polite"
        className="sr-only"
      >
        {alertMessage}
      </div>

      <div className="home-link-wrapper">
        <Link href="/">
          <span className="home-link">Home</span>
        </Link>
      </div>

      <main className="main-content">
        <div className="content-wrapper">
          <div className="header-section">
            <h1 className="page-title">Mathematics for AI Engineers</h1>
            <p className="page-subtitle">
              Complete guide with theory and interactive visualizations • Everything you need to master AI math
            </p>
          </div>

          <section className="sections-grid">
            <h2 className="visually-hidden">Mathematics Modules</h2>
            {mathematicsModules.map((module) => {
              const getIcon = (id: string) => {
                switch(id) {
                  case 'linear-algebra':
                    return (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        {/* Vector arrows */}
                        <path d="M4 12l8-8m0 0l8 8m-8-8v16" strokeWidth="2"/>
                        <path d="M12 20l-4-4m4 4l4-4" strokeWidth="2"/>
                        {/* Matrix brackets */}
                        <path d="M2 6v12M22 6v12M2 6h2M2 18h2M22 6h-2M22 18h-2" strokeWidth="2.5"/>
                        {/* Grid dots */}
                        <circle cx="8" cy="8" r="1" fill="currentColor"/>
                        <circle cx="12" cy="12" r="1" fill="currentColor"/>
                        <circle cx="16" cy="16" r="1" fill="currentColor"/>
                      </svg>
                    );
                  case 'calculus':
                    return (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        {/* Smooth curve (derivative) */}
                        <path d="M2 20c2-6 4-8 6-6s2 8 4 6s2-8 4-6s4 0 6 6" strokeWidth="2.5"/>
                        {/* Tangent line */}
                        <path d="M8 14l8-4" strokeWidth="2" opacity="0.6"/>
                        {/* Point of tangency */}
                        <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>
                        {/* Gradient symbol ∇ */}
                        <path d="M4 4l2 4 2-4M4 8h4" strokeWidth="1.5"/>
                      </svg>
                    );
                  case 'probability-stats':
                    return (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        {/* Dice face */}
                        <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2"/>
                        {/* Bell curve overlay */}
                        <path d="M7 15c1.5-3 3-4 5-2s3.5 5 5 2" strokeWidth="1.5" opacity="0.5"/>
                        {/* Dice dots arranged as probability */}
                        <circle cx="9" cy="9" r="1.2" fill="currentColor"/>
                        <circle cx="15" cy="9" r="1.2" fill="currentColor"/>
                        <circle cx="12" cy="12" r="1.2" fill="currentColor"/>
                        <circle cx="9" cy="15" r="1.2" fill="currentColor"/>
                        <circle cx="15" cy="15" r="1.2" fill="currentColor"/>
                      </svg>
                    );
                  case 'linear-models':
                    return (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        {/* Axis lines */}
                        <path d="M3 21h18M3 21V3" strokeWidth="2"/>
                        {/* Regression Line */}
                        <path d="M4 18l16-12" strokeWidth="2.5" stroke="currentColor"/>
                        {/* Data points scattered */}
                        <circle cx="7" cy="14" r="1.5" fill="currentColor" opacity="0.6"/>
                        <circle cx="12" cy="10" r="1.5" fill="currentColor" opacity="0.6"/>
                        <circle cx="16" cy="11" r="1.5" fill="currentColor" opacity="0.6"/>
                        <circle cx="18" cy="6" r="1.5" fill="currentColor" opacity="0.6"/>
                        {/* Sigmoid curve hint */}
                        <path d="M14 16c2 0 2-4 4-4" strokeWidth="1.5" opacity="0.4" strokeDasharray="2 2"/>
                      </svg>
                    );
                  default:
                    return null;
                }
              };
              return (
                <button
                  key={module.id}
                  ref={(el) => {
                    if (el) {
                      moduleButtonRefs.current[module.id] = el;
                    } else {
                      delete moduleButtonRefs.current[module.id];
                    }
                  }}
                  onClick={() => {
                    // Store the element that triggered the modal
                    triggerRef.current = moduleButtonRefs.current[module.id] || document.activeElement as HTMLElement;
                    setSelectedSection(module.id);
                  }}
                  onKeyDown={(e) => handleKeyDown(module, e)}
                  className={`section-card ${selectedSection === module.id ? 'active' : ''}`}
                  aria-label={`Explore ${module.title} module`}
                  role="button"
                  tabIndex={0}
                >
                  <div className="section-icon">{getIcon(module.id)}</div>
                  <div className="section-content">
                    <div className="section-title">{module.title}</div>
                    <div className="section-description">{module.description}</div>
                    <div className="section-action">Explore Theory + Interactive Demos →</div>
                  </div>
                </button>
              );
            })}
          </section>
        </div>
      </main>

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

      {selectedModule && (
        <div className="modal-overlay" onClick={() => setSelectedSection(null)} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div
            ref={modalRef}
            tabIndex={-1}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedSection(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedSection(null);
                }
              }}
              className="close-button"
              aria-label="Close modal"
              tabIndex={0}
            >
              ×
            </button>

            <div className="modal-inner">
              <header className="section-header">
                <div className="modal-icon">
                  {(() => {
                    const getIcon = (id: string) => {
                      switch(id) {
                        case 'linear-algebra':
                          return (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 12l8-8m0 0l8 8m-8-8v16" strokeWidth="2"/>
                              <path d="M12 20l-4-4m4 4l4-4" strokeWidth="2"/>
                              <path d="M2 6v12M22 6v12M2 6h2M2 18h2M22 6h-2M22 18h-2" strokeWidth="2.5"/>
                              <circle cx="8" cy="8" r="1" fill="currentColor"/>
                              <circle cx="12" cy="12" r="1" fill="currentColor"/>
                              <circle cx="16" cy="16" r="1" fill="currentColor"/>
                            </svg>
                          );
                        case 'calculus':
                          return (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M2 20c2-6 4-8 6-6s2 8 4 6s2-8 4-6s4 0 6 6" strokeWidth="2.5"/>
                              <path d="M8 14l8-4" strokeWidth="2" opacity="0.6"/>
                              <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>
                              <path d="M4 4l2 4 2-4M4 8h4" strokeWidth="1.5"/>
                            </svg>
                          );
                        case 'probability-stats':
                          return (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2"/>
                              <path d="M7 15c1.5-3 3-4 5-2s3.5 5 5 2" strokeWidth="1.5" opacity="0.5"/>
                              <circle cx="9" cy="9" r="1.2" fill="currentColor"/>
                              <circle cx="15" cy="9" r="1.2" fill="currentColor"/>
                              <circle cx="12" cy="12" r="1.2" fill="currentColor"/>
                              <circle cx="9" cy="15" r="1.2" fill="currentColor"/>
                              <circle cx="15" cy="15" r="1.2" fill="currentColor"/>
                            </svg>
                          );
                        case 'linear-models':
                          return (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 21h18M3 21V3" strokeWidth="2"/>
                              <path d="M4 18l16-12" strokeWidth="2.5" stroke="currentColor"/>
                              <circle cx="7" cy="14" r="1.5" fill="currentColor" opacity="0.6"/>
                              <circle cx="12" cy="10" r="1.5" fill="currentColor" opacity="0.6"/>
                              <circle cx="16" cy="11" r="1.5" fill="currentColor" opacity="0.6"/>
                              <circle cx="18" cy="6" r="1.5" fill="currentColor" opacity="0.6"/>
                              <path d="M14 16c2 0 2-4 4-4" strokeWidth="1.5" opacity="0.4" strokeDasharray="2 2"/>
                            </svg>
                          );
                        default:
                          return null;
                      }
                    };
                    return getIcon(selectedModule.id);
                  })()}
                </div>
                <h1 id="modal-title" className="section-main-title" tabIndex={-1}>{selectedModule.title}</h1>
                <p className="section-tagline">{selectedModule.description}</p>
              </header>

              {moduleLoading ? (
                <MathContentSkeleton />
              ) : (
                <>
                  <section className="theory-section">
                    <header className="theory-header">
                      <span className="theory-badge">Theory</span>
                    </header>
                    <div className="markdown-content">
                      <ErrorBoundary fallback={MathErrorFallback}>
                        <ReactMarkdown
                          rehypePlugins={[rehypeHighlight, rehypeSanitize]}
                          components={{
                            code: CodeBlock
                          }}
                        >
                          {selectedModule.detailedContent}
                        </ReactMarkdown>
                      </ErrorBoundary>
                    </div>
                  </section>

                  {selectedModule.subModules && selectedModule.subModules.length > 0 && (
                    <section className="interactive-section">
                      <header className="interactive-header">
                        <span className="interactive-badge">Interactive Demos</span>
                        <p>Learn by doing</p>
                      </header>

                      {selectedModule.subModules.map((subModule) => {
                        const DemoComponent = demoComponents[subModule.id];
                        return DemoComponent ? (
                          <article key={subModule.id} className="demo-block">
                            <h3 className="demo-block-title">{subModule.title}</h3>
                            <p className="demo-block-description">{subModule.description}</p>
                            <div className="demo-block-content">
                              <ErrorBoundary fallback={MathErrorFallback}>
                                <Suspense fallback={<LoadingDemo />}>
                                  <DemoComponent />
                                </Suspense>
                              </ErrorBoundary>
                            </div>
                          </article>
                        ) : null;
                      })}
                    </section>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .markdown-content h1 {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 32px 0 16px 0;
          padding-bottom: 12px;
          border-bottom: 3px solid #1a1a1a;
        }

        .markdown-content h2 {
          font-size: 22px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 28px 0 12px 0;
        }

        .markdown-content h3 {
          font-size: 18px;
          font-weight: 700;
          color: #3b82f6;
          margin: 20px 0 10px 0;
        }

        .markdown-content p {
          font-size: 15px;
          line-height: 1.8;
          color: #374151;
          margin: 12px 0;
        }

        .markdown-content ul {
          margin: 16px 0;
          padding-left: 24px;
        }

        .markdown-content li {
          font-size: 15px;
          line-height: 1.7;
          color: #374151;
          margin: 8px 0;
          position: relative;
        }

        .markdown-content li::marker {
          color: #3b82f6;
          font-weight: 700;
        }

        .markdown-content strong {
          font-weight: 700;
          color: #1a1a1a;
        }

        .markdown-content code {
          background: #f5f5f5;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          color: #1a1a1a;
          border: 1px solid #e0e0e0;
        }

        .markdown-content pre {
          background: #2d2d2d;
          padding: 16px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 16px 0;
        }

        .markdown-content pre code {
          background: transparent;
          border: none;
          color: #f8f8f2;
          padding: 0;
        }

        .markdown-content pre {
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          margin-top: 0;
        }

        /* Enhanced syntax highlighting with dark theme */
        .hljs-comment,
        .hljs-quote {
          color: #8292a2;
          font-style: italic;
        }

        .hljs-keyword,
        .hljs-selector-tag,
        .hljs-subst {
          color: #f92672;
          font-weight: bold;
        }

        .hljs-number,
        .hljs-literal,
        .hljs-variable,
        .hljs-template-variable,
        .hljs-tag .hljs-attr {
          color: #ae81ff;
        }

        .hljs-string,
        .hljs-doctag {
          color: #e6db74;
        }

        .hljs-title,
        .hljs-section,
        .hljs-selector-id {
          color: #a6e22e;
          font-weight: bold;
        }

        .hljs-subst {
          color: #f8f8f2;
        }

        .hljs-type,
        .hljs-class .hljs-title {
          color: #a6e22e;
        }

        .hljs-tag,
        .hljs-name,
        .hljs-attribute {
          color: #f92672;
        }

        .hljs-regexp,
        .hljs-link {
          color: #fd971f;
        }

        .hljs-symbol,
        .hljs-bullet {
          color: #ae81ff;
        }

        .hljs-built_in,
        .hljs-builtin-name {
          color: #66d9ef;
        }

        .hljs-meta {
          color: #fd971f;
          font-weight: bold;
        }
      `}</style>

      <style jsx>{`
        .math-comprehensive {
          min-height: 100vh;
          background: #fafafa;
          display: flex;
          flex-direction: column;
          scroll-padding-top: 100px;
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
          padding: 20px 40px 60px;
        }

        .content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }

        .header-section {
          text-align: center;
          margin-bottom: 48px;
        }

        .page-title {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 12px;
          color: #1a1a1a;
        }

        .page-subtitle {
          font-size: 15px;
          color: #374151;
          line-height: 1.6;
          max-width: 700px;
          margin: 0 auto;
        }

        .sections-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .section-card {
          padding: 32px;
          background: #fff;
          border: 3px solid #1a1a1a;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 4px 4px 0 #1a1a1a;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          min-height: 280px;
        }

        .section-card:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 #1a1a1a;
        }

        .section-card.active {
          background: #dbeafe;
          border-color: #3b82f6;
        }

        .section-icon {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a1a1a;
          transition: all 0.3s ease;
        }

        .section-icon svg {
          width: 100%;
          height: 100%;
        }

        .section-card:hover .section-icon {
          transform: scale(1.1) rotate(5deg);
          color: #3b82f6;
        }

        .section-card.active .section-icon {
          color: #3b82f6;
        }

        .section-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
          text-align: center;
        }

        .section-title {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1.3;
        }

        .section-description {
          font-size: 14px;
          color: #374151;
          line-height: 1.6;
          flex: 1;
        }

        .section-action {
          font-size: 14px;
          font-weight: 700;
          color: #3b82f6;
          margin-top: 8px;
        }

        .footer {
          padding: 1rem 2rem;
          text-align: center;
          background: #fff;
          border-top: 1px solid #e0e0e0;
        }

        .footer p {
          color: #374151;
          font-size: 0.9rem;
          margin: 0;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          animation: fadeIn 0.2s ease-out;
          overflow-y: auto;
        }

        .modal-content {
          background: #fff;
          border: 3px solid #1a1a1a;
          border-radius: 16px;
          max-width: 1200px;
          width: 100%;
          max-height: 90vh;
          overflow: auto;
          position: relative;
          box-shadow: 8px 8px 0 #1a1a1a;
          animation: slideUp 0.3s ease-out;
          margin: auto;
        }

        .close-button {
          position: sticky;
          top: 20px;
          right: 20px;
          float: right;
          width: 44px;
          height: 44px;
          border: 2px solid #1a1a1a;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          font-size: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          transition: all 0.2s;
          z-index: 10;
          box-shadow: 2px 2px 0 #1a1a1a;
        }

        .close-button:hover {
          background: #1a1a1a;
          color: #fff;
          transform: scale(1.1);
        }

        .modal-inner {
          padding: 48px;
          clear: both;
        }

        .section-header {
          text-align: center;
          margin-bottom: 48px;
          padding-bottom: 24px;
          border-bottom: 3px solid #e0e0e0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .modal-icon {
          width: 96px;
          height: 96px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3b82f6;
        }

        .modal-icon svg {
          width: 100%;
          height: 100%;
        }

        .section-main-title {
          font-size: 42px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0;
        }

        .section-tagline {
          font-size: 18px;
          color: #374151;
          margin: 0;
        }

        .theory-section {
          background: #f9fafb;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          padding: 32px;
          margin-bottom: 48px;
        }

        .theory-header {
          margin-bottom: 24px;
        }

        .theory-badge {
          display: inline-block;
          padding: 8px 16px;
          background: #1a1a1a;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-radius: 6px;
        }

        .markdown-content {
          background: #fff;
          padding: 32px;
          border-radius: 8px;
          border: 2px solid #e0e0e0;
        }

        .content-flow {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .inline-interactive {
          margin: 48px -16px;
          padding: 0;
          background: transparent;
          border: none;
        }

        @media (max-width: 768px) {
          .inline-interactive {
            margin: 32px 0;
          }
        }

        .interactive-section {
          margin-top: 48px;
        }

        .interactive-header {
          margin-bottom: 32px;
        }

        .interactive-badge {
          display: inline-block;
          padding: 8px 16px;
          background: #3b82f6;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-radius: 6px;
        }

        .interactive-header p {
          font-size: 15px;
          color: #666;
          margin: 12px 0 0 0;
        }

        .demo-block {
          margin-bottom: 48px;
          padding: 32px;
          background: #f0f9ff;
          border: 3px solid #3b82f6;
          border-radius: 12px;
        }

        .demo-block-title {
          font-size: 22px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 8px 0;
        }

        .demo-block-description {
          font-size: 14px;
          color: #374151;
          margin: 0 0 24px 0;
        }

        .demo-block-content {
          margin-top: 24px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Screen reader only - visually hidden but accessible to screen readers */
        .sr-only, .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @media (max-width: 768px) {
          .home-link-wrapper {
            padding: 15px 20px;
          }

          .main-content {
            padding: 15px 20px 40px;
          }

          .page-title {
            font-size: 28px;
          }

          .page-subtitle {
            font-size: 14px;
          }

          .sections-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .section-icon {
            width: 64px;
            height: 64px;
          }

          .section-card {
            padding: 24px;
          }

          .modal-content {
            max-width: 95%;
            max-height: 95vh;
          }

          .modal-inner {
            padding: 24px;
          }

          .section-main-title {
            font-size: 28px;
          }

          .section-tagline {
            font-size: 15px;
          }

          .theory-section {
            padding: 20px;
          }

          .markdown-content {
            padding: 20px;
          }

          .demo-block {
            padding: 20px;
          }

          .close-button {
            width: 36px;
            height: 36px;
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}