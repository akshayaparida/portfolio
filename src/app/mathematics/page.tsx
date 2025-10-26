'use client';

import { useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { mathematicsModules } from '@/data/mathematics';
import VectorSpace2D from '@/components/math-visualizations/VectorSpace2D';
import MatrixMultiplication from '@/components/math-visualizations/MatrixMultiplication';
import GradientDescentPlayground from '@/components/math-visualizations/GradientDescentPlayground';
import ActivationFunctions from '@/components/math-visualizations/ActivationFunctions';
import gitMetadata from '@/data/git-metadata.json';

const demoComponents: Record<string, React.ComponentType> = {
  'vectors': VectorSpace2D,
  'matrices': MatrixMultiplication,
  'gradient-descent': GradientDescentPlayground,
  'activations': ActivationFunctions,
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
            {mathematicsModules.map((module, index) => (
              <button
                key={module.id}
                onClick={() => setSelectedSection(module.id)}
                className={`section-card ${selectedSection === module.id ? 'active' : ''}`}
              >
                <div className="section-number">{index + 1}</div>
                <div className="section-title">{module.title}</div>
                <div className="section-description">{module.description}</div>
                <div className="section-action">Explore Theory + Interactive Demos →</div>
              </button>
            ))}
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
                <h1 className="section-main-title">{selectedModule.title}</h1>
                <p className="section-tagline">{selectedModule.description}</p>
              </div>

              <div className="theory-section">
                <div className="theory-header">
                  <span className="theory-badge">Theory</span>
                </div>
                <div className="markdown-content">
                  <ReactMarkdown>{selectedModule.detailedContent}</ReactMarkdown>
                </div>
              </div>

              {selectedModule.subModules && selectedModule.subModules.length > 0 && (
                <div className="interactive-section">
                  <div className="interactive-header">
                    <span className="interactive-badge">Interactive Demos</span>
                    <p>Learn by doing - manipulate these visualizations to build intuition</p>
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
          background: #f0f9ff;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          color: #3b82f6;
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
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
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
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-height: 200px;
        }

        .section-card:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 #1a1a1a;
        }

        .section-card.active {
          background: #dbeafe;
          border-color: #3b82f6;
        }

        .section-number {
          width: 48px;
          height: 48px;
          background: #1a1a1a;
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 700;
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
        }

        .section-main-title {
          font-size: 42px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 12px 0;
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
