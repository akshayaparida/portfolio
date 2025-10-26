'use client';

import { Mafs, Coordinates, Vector, useMovablePoint, Theme } from 'mafs';
import 'mafs/core.css';

export default function VectorSpace2D() {
  const vector1 = useMovablePoint([2, 3], {
    color: Theme.blue,
  });
  const vector2 = useMovablePoint([-1, 2], {
    color: Theme.red,
  });
  
  const v1x = vector1.point[0];
  const v1y = vector1.point[1];
  const v2x = vector2.point[0];
  const v2y = vector2.point[1];
  
  const dotProduct = v1x * v2x + v1y * v2y;
  
  const magnitude1 = Math.sqrt(v1x * v1x + v1y * v1y);
  const magnitude2 = Math.sqrt(v2x * v2x + v2y * v2y);
  
  const cosineSimilarity = magnitude1 === 0 || magnitude2 === 0 
    ? 0 
    : dotProduct / (magnitude1 * magnitude2);
  
  const angleDegrees = Math.acos(Math.max(-1, Math.min(1, cosineSimilarity))) * (180 / Math.PI);
  
  return (
    <div className="vector-space-container">
      <div className="mafs-wrapper">
        <Mafs
          width={600}
          height={400}
          viewBox={{
            x: [-5, 5],
            y: [-5, 5],
          }}
        >
          <Coordinates.Cartesian />
          <Vector tip={vector1.point} color={Theme.blue} />
          <Vector tip={vector2.point} color={Theme.red} />
          {vector1.element}
          {vector2.element}
        </Mafs>
      </div>
      
      <div className="math-output">
        <div className="output-section">
          <h3>Vector A (Blue)</h3>
          <p className="vector-display">[{v1x.toFixed(2)}, {v1y.toFixed(2)}]</p>
          <p className="magnitude">Magnitude: {magnitude1.toFixed(3)}</p>
        </div>
        
        <div className="output-section">
          <h3>Vector B (Red)</h3>
          <p className="vector-display">[{v2x.toFixed(2)}, {v2y.toFixed(2)}]</p>
          <p className="magnitude">Magnitude: {magnitude2.toFixed(3)}</p>
        </div>
        
        <div className="output-section highlight">
          <h3>Similarity Metrics</h3>
          <div className="metric">
            <span className="metric-label">Dot Product:</span>
            <span className="metric-value">{dotProduct.toFixed(3)}</span>
          </div>
          <div className="metric">
            <span className="metric-label">Cosine Similarity:</span>
            <span className="metric-value">{cosineSimilarity.toFixed(3)}</span>
          </div>
          <div className="metric">
            <span className="metric-label">Angle:</span>
            <span className="metric-value">{angleDegrees.toFixed(1)}°</span>
          </div>
        </div>
        
        <div className="explanation">
          <p className="tip">
            💡 <strong>Drag the dots</strong> to move vectors around.
          </p>
          <p className="tip-detail">
            Cosine similarity near <strong>1.0</strong> means vectors point in the same direction (semantically similar).
            Near <strong>0.0</strong> means perpendicular (unrelated).
            Near <strong>-1.0</strong> means opposite directions (semantically opposite).
          </p>
        </div>
      </div>

      <style jsx>{`
        .vector-space-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          background: #fff;
          border: 3px solid #1a1a1a;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 6px 6px 0 #1a1a1a;
        }

        .mafs-wrapper {
          display: flex;
          justify-content: center;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          background: #fafafa;
        }

        .math-output {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .output-section {
          padding: 16px;
          background: #fafafa;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
        }

        .output-section.highlight {
          background: #f0f9ff;
          border-color: #3b82f6;
        }

        .output-section h3 {
          font-size: 14px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 12px 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .vector-display {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
          font-family: 'Courier New', monospace;
          margin: 0 0 8px 0;
        }

        .magnitude {
          font-size: 13px;
          color: #666;
          margin: 0;
        }

        .metric {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .metric:last-child {
          margin-bottom: 0;
        }

        .metric-label {
          font-size: 13px;
          color: #666;
          font-weight: 600;
        }

        .metric-value {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          font-family: 'Courier New', monospace;
        }

        .explanation {
          grid-column: 1 / -1;
          padding: 16px;
          background: #fff9e6;
          border: 2px solid #fbbf24;
          border-radius: 8px;
        }

        .tip {
          font-size: 14px;
          color: #1a1a1a;
          margin: 0 0 8px 0;
          font-weight: 600;
        }

        .tip-detail {
          font-size: 13px;
          color: #666;
          margin: 0;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .vector-space-container {
            padding: 16px;
          }

          .mafs-wrapper {
            overflow-x: auto;
          }

          .math-output {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
