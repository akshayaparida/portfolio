'use client';

import { useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { mathematicsModules } from '@/data/mathematics';
import VectorSpace2D from '@/components/math-visualizations/VectorSpace2D';
import MatrixMultiplication from '@/components/math-visualizations/MatrixMultiplication';
import PCAVisualization from '@/components/math-visualizations/PCAVisualization';
import GradientDescentPlayground from '@/components/math-visualizations/GradientDescentPlayground';
import ActivationFunctions from '@/components/math-visualizations/ActivationFunctions';
import ScalarMultiplication from '@/components/math-visualizations/ScalarMultiplication';
import gitMetadata from '@/data/git-metadata.json';

const demoComponents: Record<string, React.ComponentType> = {
  'vectors': VectorSpace2D,
  'matrices': MatrixMultiplication,
  'pca': PCAVisualization,
  'gradient-descent': GradientDescentPlayground,
  'activations': ActivationFunctions,
  'scalar-mult': ScalarMultiplication,
};

export default function MathematicsComprehensive() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const selectedModule = selectedSection ? mathematicsModules.find(m => m.id === selectedSection) : null;

  return (
    <div className="math-comprehensive">
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

          <div className="sections-grid">
            {mathematicsModules.map((module, index) => {
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
                  default:
                    return null;
                }
              };
              return (
                <button
                  key={module.id}
                  onClick={() => setSelectedSection(module.id)}
                  className={`section-card ${selectedSection === module.id ? 'active' : ''}`}
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
          </div>
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
        <div className="modal-overlay" onClick={() => setSelectedSection(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedSection(null)} className="close-button">
              ×
            </button>

            <div className="modal-inner">
              <div className="section-header">
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
                        default:
                          return null;
                      }
                    };
                    return getIcon(selectedModule.id);
                  })()}
                </div>
                <h1 className="section-main-title">{selectedModule.title}</h1>
                <p className="section-tagline">{selectedModule.description}</p>
              </div>

              <div className="theory-section">
                <div className="theory-header">
                  <span className="theory-badge">Theory</span>
                </div>
                <div className="markdown-content">
                  <ReactMarkdown 
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                      code({className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match?.[1] || 'text';
                        
                        // Determine if this is inline vs block based on className presence
                        const isBlock = !!match;
                        
                        if (!isBlock) {
                          return <code className={className}>{children}</code>;
                        }
                        
                        // Properly extract the text content for copying
                        const getTextContent = (nodes: React.ReactNode): string => {
                          if (typeof nodes === 'string') {
                            return nodes;
                          } else if (Array.isArray(nodes)) {
                            return nodes.map(getTextContent).join('');
                          } else if (nodes && typeof nodes === 'object') {
                            // Type assertion to handle the React element safely
                            const element = nodes as { props?: { children?: React.ReactNode } };
                            if (element.props?.children) {
                              return getTextContent(element.props.children);
                            }
                          }
                          return '';
                        };
                        
                        const codeString = getTextContent(children);
                        
                        return (
                          <div className="code-block-wrapper">
                            <div className="code-header">
                              <span className="code-language">{language}</span>
                              <button 
                                className="copy-button" 
                                onClick={() => navigator.clipboard.writeText(codeString)}
                                title="Copy to clipboard"
                              >
                                Copy
                              </button>
                            </div>
                            <pre className={className}>
                              <code className={className}>{children}</code>
                            </pre>
                          </div>
                        );
                      }
                    }}
                  >
                    {selectedModule.detailedContent}
                  </ReactMarkdown>
                </div>
              </div>

              {selectedModule.subModules && selectedModule.subModules.length > 0 && (
                <div className="interactive-section">
                  <div className="interactive-header">
                    <span className="interactive-badge">Interactive Demos</span>
                    <p>Learn by doing</p>
                  </div>

                  {selectedModule.subModules.map((subModule) => {
                    const DemoComponent = demoComponents[subModule.id];
                    return DemoComponent ? (
                      <div key={subModule.id} className="demo-block">
                        <h3 className="demo-block-title">{subModule.title}</h3>
                        <p className="demo-block-description">{subModule.description}</p>
                        <div className="demo-block-content">
                          <DemoComponent />
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
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
          color: #333;
          margin: 12px 0;
        }

        .markdown-content ul {
          margin: 16px 0;
          padding-left: 24px;
        }

        .markdown-content li {
          font-size: 15px;
          line-height: 1.7;
          color: #333;
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

        .code-block-wrapper {
          position: relative;
          margin: 16px 0;
        }

        .code-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #2d2d2d;
          color: #fff;
          padding: 6px 12px;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          font-size: 12px;
          font-family: 'Courier New', monospace;
        }

        .code-language {
          font-weight: bold;
          text-transform: uppercase;
        }

        .copy-button {
          background: #4a5568;
          color: white;
          border: none;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          transition: background 0.2s;
        }

        .copy-button:hover {
          background: #2d3748;
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
          color: #666;
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
          color: #666;
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
          color: #666;
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
          color: #666;
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
          color: #666;
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
