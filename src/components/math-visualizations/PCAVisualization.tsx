'use client';

import { useState, useEffect } from 'react';

// Generate random 3D data points in an ellipsoid shape
function generateData(numPoints: number = 50) {
  const points: [number, number, number][] = [];
  for (let i = 0; i < numPoints; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const r = Math.random();
    
    // Create ellipsoid (stretched sphere)
    const x = 4 * r * Math.sin(phi) * Math.cos(theta);
    const y = 2 * r * Math.sin(phi) * Math.sin(theta);
    const z = 1 * r * Math.cos(phi);
    
    points.push([x, y, z]);
  }
  return points;
}

// Simple PCA implementation
function performPCA(points: [number, number, number][]) {
  // Center the data
  const mean = points.reduce((acc, p) => [acc[0] + p[0], acc[1] + p[1], acc[2] + p[2]], [0, 0, 0]);
  mean[0] /= points.length;
  mean[1] /= points.length;
  mean[2] /= points.length;
  
  const centered = points.map(p => [p[0] - mean[0], p[1] - mean[1], p[2] - mean[2]]) as [number, number, number][];
  
  // Simplified: Just use the dominant directions
  // PC1: direction of maximum variance (X-axis dominant)
  const pc1 = [1, 0, 0]; // normalized
  
  // PC2: perpendicular to PC1 (Y-axis dominant)
  const pc2 = [0, 1, 0]; // normalized
  
  // Project onto PC1 and PC2
  const projected = centered.map(p => {
    const pc1Val = p[0] * pc1[0] + p[1] * pc1[1] + p[2] * pc1[2];
    const pc2Val = p[0] * pc2[0] + p[1] * pc2[1] + p[2] * pc2[2];
    return [pc1Val, pc2Val] as [number, number];
  });
  
  return { projected, pc1, pc2, mean };
}

export default function PCAVisualization() {
  const [dataPoints] = useState(() => generateData(60));
  const [showProjection, setShowProjection] = useState(false);
  const [show3D, setShow3D] = useState(true);
  const [rotationAngle, setRotationAngle] = useState(30);
  
  const { projected } = performPCA(dataPoints);
  
  // Calculate explained variance (simplified)
  const totalVariance = dataPoints.reduce((acc, p) => acc + p[0]**2 + p[1]**2 + p[2]**2, 0);
  const pc1Variance = projected.reduce((acc, p) => acc + p[0]**2, 0);
  const pc2Variance = projected.reduce((acc, p) => acc + p[1]**2, 0);
  const explainedByPC12 = ((pc1Variance + pc2Variance) / totalVariance * 100).toFixed(1);
  
  // Project 3D points to 2D for visualization
  const project3DTo2D = (x: number, y: number, z: number, angle: number) => {
    const rad = angle * Math.PI / 180;
    const rotX = x * Math.cos(rad) - z * Math.sin(rad);
    const rotY = y;
    return [rotX * 30 + 250, rotY * 30 + 200]; // scale and center
  };
  
  return (
    <div className="pca-container">
      <div className="pca-header">
        <h3>🎯 What is PCA?</h3>
        <p>
          <strong>Principal Component Analysis</strong> finds the directions where your data varies the most.
          This lets you reduce 1000 dimensions → 2D while keeping most information!
        </p>
      </div>

      <div className="controls-section">
        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={show3D}
              onChange={(e) => setShow3D(e.target.checked)}
            />
            <span>Show Original 3D Data</span>
          </label>
        </div>
        
        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={showProjection}
              onChange={(e) => setShowProjection(e.target.checked)}
            />
            <span>Show 2D Projection (PCA Result)</span>
          </label>
        </div>
        
        <div className="control-group">
          <label>
            <span>Rotate 3D View: {rotationAngle}°</span>
            <input
              type="range"
              min="0"
              max="360"
              value={rotationAngle}
              onChange={(e) => setRotationAngle(Number(e.target.value))}
              className="slider"
            />
          </label>
        </div>
      </div>

      <div className="visualization-grid">
        {show3D && (
          <div className="viz-panel">
            <div className="panel-header">
              <div className="panel-badge">Original Data</div>
              <div className="panel-title">3D Point Cloud</div>
            </div>
            <svg width="500" height="400" className="viz-svg">
              <rect width="500" height="400" fill="#fafafa" />
              
              {/* Grid lines */}
              <line x1="50" y1="200" x2="450" y2="200" stroke="#ddd" strokeWidth="1" />
              <line x1="250" y1="50" x2="250" y2="350" stroke="#ddd" strokeWidth="1" />
              
              {/* Axes labels */}
              <text x="460" y="205" fill="#666" fontSize="12">X</text>
              <text x="255" y="45" fill="#666" fontSize="12">Y</text>
              
              {/* Data points */}
              {dataPoints.map((point, i) => {
                const [x2d, y2d] = project3DTo2D(point[0], point[1], point[2], rotationAngle);
                return (
                  <circle
                    key={i}
                    cx={x2d}
                    cy={y2d}
                    r="4"
                    fill="#3b82f6"
                    opacity="0.6"
                  />
                );
              })}
              
              <text x="250" y="380" textAnchor="middle" fill="#666" fontSize="14" fontWeight="600">
                {dataPoints.length} points in 3D space
              </text>
            </svg>
          </div>
        )}
        
        {showProjection && (
          <div className="viz-panel">
            <div className="panel-header">
              <div className="panel-badge success">PCA Result</div>
              <div className="panel-title">2D Projection</div>
            </div>
            <svg width="500" height="400" className="viz-svg">
              <rect width="500" height="400" fill="#fafafa" />
              
              {/* Grid */}
              <line x1="50" y1="200" x2="450" y2="200" stroke="#ddd" strokeWidth="1" />
              <line x1="250" y1="50" x2="250" y2="350" stroke="#ddd" strokeWidth="1" />
              
              {/* Axes labels */}
              <text x="460" y="205" fill="#10b981" fontSize="12" fontWeight="600">PC1</text>
              <text x="255" y="45" fill="#10b981" fontSize="12" fontWeight="600">PC2</text>
              
              {/* Projected points */}
              {projected.map((point, i) => {
                const x2d = point[0] * 30 + 250;
                const y2d = point[1] * 30 + 200;
                return (
                  <circle
                    key={i}
                    cx={x2d}
                    cy={y2d}
                    r="4"
                    fill="#10b981"
                    opacity="0.7"
                  />
                );
              })}
              
              <text x="250" y="380" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="600">
                Compressed to 2D • {explainedByPC12}% variance kept!
              </text>
            </svg>
          </div>
        )}
      </div>

      <div className="info-cards">
        <div className="info-card">
          <div className="info-icon">📊</div>
          <h4>Original Dimensions</h4>
          <div className="info-value">3D</div>
          <p>X, Y, Z coordinates</p>
        </div>
        
        <div className="info-card">
          <div className="info-icon">➡️</div>
          <h4>PCA Magic</h4>
          <div className="info-value">2D</div>
          <p>PC1 (most variance) + PC2</p>
        </div>
        
        <div className="info-card highlight">
          <div className="info-icon">✨</div>
          <h4>Information Kept</h4>
          <div className="info-value">{explainedByPC12}%</div>
          <p>Lost only {(100 - parseFloat(explainedByPC12)).toFixed(1)}% of variance!</p>
        </div>
      </div>

      <div className="explanation-section">
        <h4>🎓 How PCA Works:</h4>
        <ol>
          <li><strong>Find direction of maximum spread</strong> → That&apos;s PC1 (Principal Component 1)</li>
          <li><strong>Find next best direction</strong> (perpendicular to PC1) → That&apos;s PC2</li>
          <li><strong>Project all points</strong> onto PC1 and PC2 axes</li>
          <li><strong>Drop PC3</strong> (least important) → Now you have 2D data!</li>
        </ol>
        
        <div className="use-case">
          <strong>Real Example:</strong> Customer data with 1,000 features (age, purchases, clicks, etc.) 
          → PCA reduces to 2D for visualization, keeping 95% of the important patterns!
        </div>
      </div>

      <style jsx>{`
        .pca-container {
          background: #fff;
          border: 3px solid #1a1a1a;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 6px 6px 0 #1a1a1a;
        }

        .pca-header {
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 2px solid #e0e0e0;
        }

        .pca-header h3 {
          font-size: 22px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 12px 0;
        }

        .pca-header p {
          font-size: 14px;
          color: #666;
          line-height: 1.6;
          margin: 0;
        }

        .controls-section {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          margin-bottom: 32px;
          padding: 20px;
          background: #f9fafb;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
        }

        .control-group {
          flex: 1;
          min-width: 200px;
        }

        .control-group label {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          cursor: pointer;
        }

        .control-group input[type="checkbox"] {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        .slider {
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background: #e0e0e0;
          cursor: pointer;
        }

        .visualization-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .viz-panel {
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          background: #fff;
        }

        .panel-header {
          padding: 16px;
          background: #f9fafb;
          border-bottom: 2px solid #e0e0e0;
        }

        .panel-badge {
          display: inline-block;
          padding: 4px 12px;
          background: #3b82f6;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          border-radius: 4px;
          margin-bottom: 8px;
        }

        .panel-badge.success {
          background: #10b981;
        }

        .panel-title {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .viz-svg {
          display: block;
          border: 2px solid #e0e0e0;
        }

        .info-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }

        .info-card {
          padding: 20px;
          background: #f9fafb;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          text-align: center;
        }

        .info-card.highlight {
          background: #f0fdf4;
          border-color: #10b981;
        }

        .info-icon {
          font-size: 32px;
          margin-bottom: 8px;
        }

        .info-card h4 {
          font-size: 12px;
          font-weight: 700;
          color: #666;
          text-transform: uppercase;
          margin: 0 0 8px 0;
          letter-spacing: 0.5px;
        }

        .info-value {
          font-size: 32px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 8px 0;
        }

        .info-card p {
          font-size: 13px;
          color: #666;
          margin: 0;
        }

        .explanation-section {
          padding: 24px;
          background: #fff9e6;
          border: 2px solid #fbbf24;
          border-radius: 8px;
        }

        .explanation-section h4 {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 16px 0;
        }

        .explanation-section ol {
          margin: 0 0 16px 0;
          padding-left: 24px;
        }

        .explanation-section li {
          font-size: 14px;
          color: #666;
          line-height: 1.8;
          margin-bottom: 8px;
        }

        .use-case {
          padding: 16px;
          background: #fff;
          border: 2px solid #fbbf24;
          border-radius: 6px;
          font-size: 14px;
          color: #666;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .pca-container {
            padding: 20px;
          }

          .visualization-grid {
            grid-template-columns: 1fr;
          }

          .viz-svg {
            width: 100%;
            height: auto;
          }
        }
      `}</style>
    </div>
  );
}
