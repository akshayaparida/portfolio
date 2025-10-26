'use client';

import { useState } from 'react';

export default function MatrixMultiplication() {
  const [matrixA] = useState([[2, 1], [3, 4]]);
  const [matrixB] = useState([[1, 2], [3, 1]]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  const resultMatrix = [
    [matrixA[0][0] * matrixB[0][0] + matrixA[0][1] * matrixB[1][0], 
     matrixA[0][0] * matrixB[0][1] + matrixA[0][1] * matrixB[1][1]],
    [matrixA[1][0] * matrixB[0][0] + matrixA[1][1] * matrixB[1][0], 
     matrixA[1][0] * matrixB[0][1] + matrixA[1][1] * matrixB[1][1]]
  ];

  const steps = [
    { row: 0, col: 0, calc: `(${matrixA[0][0]} × ${matrixB[0][0]}) + (${matrixA[0][1]} × ${matrixB[1][0]}) = ${resultMatrix[0][0]}` },
    { row: 0, col: 1, calc: `(${matrixA[0][0]} × ${matrixB[0][1]}) + (${matrixA[0][1]} × ${matrixB[1][1]}) = ${resultMatrix[0][1]}` },
    { row: 1, col: 0, calc: `(${matrixA[1][0]} × ${matrixB[0][0]}) + (${matrixA[1][1]} × ${matrixB[1][0]}) = ${resultMatrix[1][0]}` },
    { row: 1, col: 1, calc: `(${matrixA[1][0]} × ${matrixB[0][1]}) + (${matrixA[1][1]} × ${matrixB[1][1]}) = ${resultMatrix[1][1]}` },
  ];

  const animate = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= steps.length) {
        clearInterval(interval);
        setIsAnimating(false);
        setCurrentStep(-1);
      } else {
        setCurrentStep(step);
      }
    }, 1500);
  };

  const currentStepData = currentStep >= 0 ? steps[currentStep] : null;

  return (
    <div className="matrix-container">
      <div className="matrices-wrapper">
        <div className="matrix-display">
          <div className="matrix-label">Matrix A</div>
          <div className="matrix">
            {matrixA.map((row, i) => (
              <div key={i} className="matrix-row">
                {row.map((val, j) => (
                  <div 
                    key={j} 
                    className={`matrix-cell ${currentStepData && currentStepData.row === i ? 'highlight-row' : ''}`}
                  >
                    {val}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="operator">×</div>

        <div className="matrix-display">
          <div className="matrix-label">Matrix B</div>
          <div className="matrix">
            {matrixB.map((row, i) => (
              <div key={i} className="matrix-row">
                {row.map((val, j) => (
                  <div 
                    key={j} 
                    className={`matrix-cell ${currentStepData && currentStepData.col === j ? 'highlight-col' : ''}`}
                  >
                    {val}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="operator">=</div>

        <div className="matrix-display">
          <div className="matrix-label">Result</div>
          <div className="matrix">
            {resultMatrix.map((row, i) => (
              <div key={i} className="matrix-row">
                {row.map((val, j) => (
                  <div 
                    key={j} 
                    className={`matrix-cell ${currentStepData && currentStepData.row === i && currentStepData.col === j ? 'highlight-result' : ''} ${currentStep === -1 || (i === currentStepData?.row && j === currentStepData?.col) || currentStep > steps.findIndex(s => s.row === i && s.col === j) ? 'visible' : 'hidden'}`}
                  >
                    {val}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="calculation-display">
        {currentStepData ? (
          <div className="calculation-step">
            <p className="step-label">Step {currentStep + 1} of {steps.length}</p>
            <p className="calculation">{currentStepData.calc}</p>
          </div>
        ) : (
          <div className="calculation-step">
            <p className="step-label">Click Animate to see how matrix multiplication works</p>
          </div>
        )}
      </div>

      <button 
        onClick={animate} 
        disabled={isAnimating}
        className="animate-button"
      >
        {isAnimating ? 'Animating...' : 'Animate Multiplication'}
      </button>

      <div className="explanation">
        <h3>Why This Matters in AI</h3>
        <p>
          <strong>Every layer in a neural network is a matrix multiplication.</strong> When data flows through a network,
          it&apos;s multiplied by weight matrices. Understanding this operation is fundamental to understanding how
          neural networks transform inputs into outputs.
        </p>
      </div>

      <style jsx>{`
        .matrix-container {
          background: #fff;
          border: 3px solid #1a1a1a;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 6px 6px 0 #1a1a1a;
        }

        .matrices-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }

        .matrix-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .matrix-label {
          font-size: 14px;
          font-weight: 700;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .matrix {
          border: 2px solid #1a1a1a;
          border-radius: 8px;
          padding: 16px;
          background: #fafafa;
        }

        .matrix-row {
          display: flex;
          gap: 12px;
        }

        .matrix-row:not(:last-child) {
          margin-bottom: 12px;
        }

        .matrix-cell {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
          background: #fff;
          border: 2px solid #e0e0e0;
          border-radius: 6px;
          transition: all 0.3s;
          font-family: 'Courier New', monospace;
        }

        .matrix-cell.highlight-row {
          background: #dbeafe;
          border-color: #3b82f6;
          transform: scale(1.1);
        }

        .matrix-cell.highlight-col {
          background: #fef3c7;
          border-color: #f59e0b;
          transform: scale(1.1);
        }

        .matrix-cell.highlight-result {
          background: #d1fae5;
          border-color: #10b981;
          transform: scale(1.15);
          animation: pulse 0.5s ease-in-out;
        }

        .matrix-cell.hidden {
          opacity: 0;
        }

        .matrix-cell.visible {
          opacity: 1;
        }

        .operator {
          font-size: 32px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .calculation-display {
          background: #f0f9ff;
          border: 2px solid #3b82f6;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 24px;
          min-height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .calculation-step {
          text-align: center;
        }

        .step-label {
          font-size: 12px;
          font-weight: 700;
          color: #3b82f6;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0 0 8px 0;
        }

        .calculation {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
          font-family: 'Courier New', monospace;
          margin: 0;
        }

        .animate-button {
          width: 100%;
          padding: 16px 24px;
          background: #1a1a1a;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .animate-button:hover:not(:disabled) {
          background: #3b82f6;
          transform: translateY(-2px);
        }

        .animate-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .explanation {
          margin-top: 32px;
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
          margin: 0;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1.15); }
          50% { transform: scale(1.25); }
        }

        @media (max-width: 768px) {
          .matrix-container {
            padding: 20px;
          }

          .matrices-wrapper {
            gap: 16px;
          }

          .matrix-cell {
            width: 40px;
            height: 40px;
            font-size: 16px;
          }

          .operator {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}
