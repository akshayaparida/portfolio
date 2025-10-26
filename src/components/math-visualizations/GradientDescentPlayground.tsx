'use client';

import { useState, useEffect, useRef } from 'react';
import { Mafs, Coordinates, Plot, Point } from 'mafs';
import 'mafs/core.css';

export default function GradientDescentPlayground() {
  const [learningRate, setLearningRate] = useState(0.1);
  const [position, setPosition] = useState<[number, number]>([-2, 3]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [path, setPath] = useState<[number, number][]>([]);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  // Loss function: simple quadratic (paraboloid)
  const lossFunction = (x: number) => x * x;

  // Gradient (derivative) of loss function
  const gradient = (x: number) => 2 * x;

  const startDescent = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setPath([position]);
    let currentPos = [...position] as [number, number];
    let step = 0;
    const maxSteps = 50;

    animationRef.current = setInterval(() => {
      const [x] = currentPos;
      const grad = gradient(x);
      const newX = x - learningRate * grad;
      
      // Stop if converged or max steps reached
      if (Math.abs(grad) < 0.01 || step >= maxSteps) {
        setIsAnimating(false);
        if (animationRef.current) clearInterval(animationRef.current);
        return;
      }

      currentPos = [newX, lossFunction(newX)];
      setPosition(currentPos);
      setPath(prev => [...prev, currentPos]);
      step++;
    }, 200);
  };

  const reset = () => {
    if (animationRef.current) clearInterval(animationRef.current);
    setIsAnimating(false);
    setPosition([-2, lossFunction(-2)]);
    setPath([]);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, []);

  return (
    <div className="gradient-container">
      <div className="controls-section">
        <div className="control-group">
          <label>Learning Rate: {learningRate.toFixed(2)}</label>
          <input
            type="range"
            min="0.01"
            max="0.5"
            step="0.01"
            value={learningRate}
            onChange={(e) => setLearningRate(parseFloat(e.target.value))}
            disabled={isAnimating}
            className="slider"
          />
          <div className="slider-labels">
            <span>Slow (0.01)</span>
            <span>Fast (0.5)</span>
          </div>
        </div>

        <div className="button-group">
          <button 
            onClick={startDescent} 
            disabled={isAnimating}
            className="action-button primary"
          >
            {isAnimating ? 'Optimizing...' : 'Start Gradient Descent'}
          </button>
          <button 
            onClick={reset}
            className="action-button secondary"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="visualization-section">
        <Mafs
          width={600}
          height={400}
          viewBox={{
            x: [-3, 3],
            y: [-1, 10],
          }}
        >
          <Coordinates.Cartesian />
          <Plot.OfX y={(x) => lossFunction(x)} color="#3b82f6" weight={3} />
          
          {path.map((pos, idx) => (
            <Point key={idx} x={pos[0]} y={pos[1]} color="#f59e0b" opacity={0.5} />
          ))}
          
          <Point x={position[0]} y={position[1]} color="#10b981" />
        </Mafs>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-label">Current Position (x)</div>
          <div className="stat-value">{position[0].toFixed(3)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Current Loss</div>
          <div className="stat-value">{position[1].toFixed(3)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Gradient</div>
          <div className="stat-value">{gradient(position[0]).toFixed(3)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Steps Taken</div>
          <div className="stat-value">{path.length}</div>
        </div>
      </div>

      <div className="explanation">
        <h3>How Gradient Descent Works</h3>
        <p>
          <strong>This is how neural networks learn.</strong> The green dot represents current parameter values.
          The gradient tells us which direction makes loss worse. We move in the <strong>opposite direction</strong>
          (that&apos;s the minus sign in gradient descent).
        </p>
        <p>
          <strong>Learning rate</strong> controls step size. Too small = slow convergence. Too large = overshoot the minimum.
          Try adjusting it to see the difference.
        </p>
      </div>

      <style jsx>{`
        .gradient-container {
          background: #fff;
          border: 3px solid #1a1a1a;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 6px 6px 0 #1a1a1a;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .controls-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .control-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .control-group label {
          font-size: 14px;
          font-weight: 700;
          color: #1a1a1a;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .slider {
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background: #e0e0e0;
          outline: none;
          -webkit-appearance: none;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #1a1a1a;
        }

        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #1a1a1a;
        }

        .slider:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .slider-labels {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #666;
        }

        .button-group {
          display: flex;
          gap: 12px;
        }

        .action-button {
          flex: 1;
          padding: 14px 20px;
          border: 2px solid #1a1a1a;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .action-button.primary {
          background: #1a1a1a;
          color: #fff;
        }

        .action-button.primary:hover:not(:disabled) {
          background: #3b82f6;
          border-color: #3b82f6;
          transform: translateY(-2px);
        }

        .action-button.primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .action-button.secondary {
          background: #fff;
          color: #1a1a1a;
        }

        .action-button.secondary:hover {
          background: #fafafa;
          transform: translateY(-2px);
        }

        .visualization-section {
          display: flex;
          justify-content: center;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          background: #fafafa;
        }

        .stats-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 12px;
        }

        .stat-card {
          padding: 16px;
          background: #f0f9ff;
          border: 2px solid #3b82f6;
          border-radius: 8px;
          text-align: center;
        }

        .stat-label {
          font-size: 11px;
          font-weight: 700;
          color: #3b82f6;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        .stat-value {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
          font-family: 'Courier New', monospace;
        }

        .explanation {
          padding: 20px;
          background: #fff9e6;
          border: 2px solid #fbbf24;
          border-radius: 8px;
        }

        .explanation h3 {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 12px 0;
        }

        .explanation p {
          font-size: 14px;
          color: #666;
          line-height: 1.6;
          margin: 0 0 12px 0;
        }

        .explanation p:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .gradient-container {
            padding: 20px;
          }

          .button-group {
            flex-direction: column;
          }

          .stats-section {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
