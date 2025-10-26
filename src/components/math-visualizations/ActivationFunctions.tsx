'use client';

import { useState } from 'react';
import { Mafs, Coordinates, Plot } from 'mafs';
import 'mafs/core.css';

type ActivationType = 'relu' | 'sigmoid' | 'tanh' | 'leaky-relu';

export default function ActivationFunctions() {
  const [selectedFunction, setSelectedFunction] = useState<ActivationType>('relu');
  const [inputValue, setInputValue] = useState(0);
  const [leakyAlpha, setLeakyAlpha] = useState(0.01);

  const activationFunctions = {
    relu: (x: number) => Math.max(0, x),
    sigmoid: (x: number) => 1 / (1 + Math.exp(-x)),
    tanh: (x: number) => Math.tanh(x),
    'leaky-relu': (x: number) => x > 0 ? x : leakyAlpha * x,
  };

  const functionDescriptions = {
    relu: {
      name: 'ReLU (Rectified Linear Unit)',
      formula: 'f(x) = max(0, x)',
      description: 'Most popular activation function. Simple, fast, and works well in practice. Outputs 0 for negative inputs, passes positive inputs unchanged.',
      usage: 'Default choice for hidden layers in most neural networks, especially CNNs.'
    },
    sigmoid: {
      name: 'Sigmoid',
      formula: 'f(x) = 1 / (1 + e^(-x))',
      description: 'Squashes any input to range (0, 1). Used to be popular but has vanishing gradient problems.',
      usage: 'Binary classification output layers, gate mechanisms in LSTMs.'
    },
    tanh: {
      name: 'Tanh (Hyperbolic Tangent)',
      formula: 'f(x) = tanh(x)',
      description: 'Similar to sigmoid but outputs in range (-1, 1). Zero-centered, which helps gradient flow.',
      usage: 'Better than sigmoid for hidden layers, used in RNNs and LSTMs.'
    },
    'leaky-relu': {
      name: 'Leaky ReLU',
      formula: `f(x) = max(${leakyAlpha}x, x)`,
      description: 'Fixes the "dying ReLU" problem by allowing small negative values instead of zero.',
      usage: 'When standard ReLU causes too many dead neurons during training.'
    }
  };

  const currentFunc = activationFunctions[selectedFunction];
  const currentDesc = functionDescriptions[selectedFunction];
  const outputValue = currentFunc(inputValue);

  return (
    <div className="activation-container">
      <div className="function-selector">
        {(Object.keys(activationFunctions) as ActivationType[]).map((func) => (
          <button
            key={func}
            onClick={() => setSelectedFunction(func)}
            className={`function-button ${selectedFunction === func ? 'active' : ''}`}
          >
            {functionDescriptions[func].name}
          </button>
        ))}
      </div>

      <div className="visualization-section">
        <Mafs
          width={600}
          height={400}
          viewBox={{
            x: [-5, 5],
            y: selectedFunction === 'sigmoid' ? [-0.5, 1.5] : [-3, 3],
          }}
        >
          <Coordinates.Cartesian />
          <Plot.OfX 
            y={(x) => currentFunc(x)} 
            color="#3b82f6" 
            weight={3} 
          />
          <Plot.OfX 
            y={(x) => x === inputValue ? outputValue : NaN} 
            color="#10b981" 
            weight={8}
          />
        </Mafs>
      </div>

      <div className="controls-section">
        <div className="control-group">
          <label>Input Value: {inputValue.toFixed(2)}</label>
          <input
            type="range"
            min="-5"
            max="5"
            step="0.1"
            value={inputValue}
            onChange={(e) => setInputValue(parseFloat(e.target.value))}
            className="slider"
          />
          <div className="slider-labels">
            <span>-5</span>
            <span>+5</span>
          </div>
        </div>

        {selectedFunction === 'leaky-relu' && (
          <div className="control-group">
            <label>Leaky Alpha (α): {leakyAlpha.toFixed(3)}</label>
            <input
              type="range"
              min="0.001"
              max="0.3"
              step="0.001"
              value={leakyAlpha}
              onChange={(e) => setLeakyAlpha(parseFloat(e.target.value))}
              className="slider"
            />
            <div className="slider-labels">
              <span>0.001</span>
              <span>0.3</span>
            </div>
          </div>
        )}
      </div>

      <div className="output-display">
        <div className="io-card">
          <div className="io-label">Input</div>
          <div className="io-value">{inputValue.toFixed(3)}</div>
        </div>
        <div className="arrow">→</div>
        <div className="io-card highlight">
          <div className="io-label">{currentDesc.name}</div>
          <div className="io-value">{outputValue.toFixed(3)}</div>
        </div>
      </div>

      <div className="info-section">
        <div className="info-card">
          <h3>{currentDesc.name}</h3>
          <p className="formula">{currentDesc.formula}</p>
          <p className="description">{currentDesc.description}</p>
          <div className="usage-badge">
            <strong>Use Case:</strong> {currentDesc.usage}
          </div>
        </div>
      </div>

      <style jsx>{`
        .activation-container {
          background: #fff;
          border: 3px solid #1a1a1a;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 6px 6px 0 #1a1a1a;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .function-selector {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 12px;
        }

        .function-button {
          padding: 12px 16px;
          background: #fff;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #666;
          cursor: pointer;
          transition: all 0.2s;
        }

        .function-button:hover {
          border-color: #3b82f6;
          color: #3b82f6;
        }

        .function-button.active {
          background: #1a1a1a;
          border-color: #1a1a1a;
          color: #fff;
        }

        .visualization-section {
          display: flex;
          justify-content: center;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          background: #fafafa;
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
          background: #10b981;
          cursor: pointer;
          border: 2px solid #1a1a1a;
        }

        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid #1a1a1a;
        }

        .slider-labels {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #666;
        }

        .output-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          padding: 24px;
          background: #f0f9ff;
          border: 2px solid #3b82f6;
          border-radius: 8px;
        }

        .io-card {
          padding: 20px;
          background: #fff;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          text-align: center;
          min-width: 150px;
        }

        .io-card.highlight {
          background: #d1fae5;
          border-color: #10b981;
        }

        .io-label {
          font-size: 11px;
          font-weight: 700;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        .io-value {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a1a;
          font-family: 'Courier New', monospace;
        }

        .arrow {
          font-size: 32px;
          font-weight: 700;
          color: #3b82f6;
        }

        .info-section {
          padding: 24px;
          background: #fff9e6;
          border: 2px solid #fbbf24;
          border-radius: 8px;
        }

        .info-card h3 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 12px 0;
        }

        .formula {
          font-size: 16px;
          font-weight: 600;
          color: #3b82f6;
          font-family: 'Courier New', monospace;
          margin: 0 0 16px 0;
          padding: 12px;
          background: #f0f9ff;
          border-radius: 6px;
        }

        .description {
          font-size: 14px;
          color: #666;
          line-height: 1.6;
          margin: 0 0 16px 0;
        }

        .usage-badge {
          font-size: 13px;
          color: #1a1a1a;
          padding: 12px;
          background: #fef3c7;
          border-left: 4px solid #f59e0b;
          border-radius: 4px;
        }

        .usage-badge strong {
          color: #f59e0b;
        }

        @media (max-width: 768px) {
          .activation-container {
            padding: 20px;
          }

          .function-selector {
            grid-template-columns: 1fr 1fr;
          }

          .output-display {
            flex-direction: column;
            gap: 12px;
          }

          .arrow {
            transform: rotate(90deg);
          }
        }
      `}</style>
    </div>
  );
}
