'use client';

import React from 'react';

interface MathErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
}

const MathErrorFallback: React.FC<MathErrorFallbackProps> = ({ error, resetError }) => {
  return (
    <div className="math-error-fallback" style={{
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: '#fee',
      border: '1px solid #fcc',
      borderRadius: '8px',
      color: '#900'
    }}>
      <h3>Mathematics Content Error</h3>
      <p>We encountered an issue displaying this content.</p>
      {error?.message && (
        <details style={{ textAlign: 'left', marginTop: '1rem', fontSize: '0.9rem' }}>
          <summary>Error details</summary>
          <pre style={{ 
            padding: '0.5rem', 
            backgroundColor: '#fff',
            border: '1px solid #fcc',
            borderRadius: '4px',
            whiteSpace: 'pre-wrap',
            overflow: 'auto',
            maxHeight: '100px'
          }}>
            {error.message}
          </pre>
        </details>
      )}
      {resetError && (
        <button
          onClick={resetError}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer'
          }}
        >
          Reload Content
        </button>
      )}
    </div>
  );
};

export default MathErrorFallback;