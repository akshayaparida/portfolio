import React from 'react';
import SkeletonLoader from './SkeletonLoader';

interface MathSkeletonProps {
  showTheory?: boolean;
  showInteractive?: boolean;
  className?: string;
}

const MathContentSkeleton: React.FC<MathSkeletonProps> = ({
  showTheory = true,
  showInteractive = true,
  className = ''
}) => {
  return (
    <div className={`math-skeleton ${className}`} style={{ padding: '32px', borderRadius: '12px', background: '#f9fafb', border: '2px solid #e0e0e0' }}>
      {/* Theory Section Skeleton */}
      {showTheory && (
        <div className="theory-skeleton" style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
            <SkeletonLoader height="24px" width="120px" style={{ borderRadius: '6px', marginRight: '10px' }} />
          </div>
          <div style={{ background: '#fff', padding: '32px', borderRadius: '8px', border: '2px solid #e0e0e0' }}>
            <SkeletonLoader count={3} height="16px" style={{ marginBottom: '12px', borderRadius: '4px' }} />
            <SkeletonLoader height="24px" width="80%" style={{ margin: '20px 0', borderRadius: '4px' }} />
            <SkeletonLoader count={4} height="16px" style={{ marginBottom: '12px', borderRadius: '4px' }} />
            <SkeletonLoader height="20px" width="60%" style={{ margin: '20px 0', borderRadius: '4px' }} />
            <SkeletonLoader count={5} height="16px" style={{ marginBottom: '12px', borderRadius: '4px' }} />
          </div>
        </div>
      )}

      {/* Interactive Section Skeleton */}
      {showInteractive && (
        <div className="interactive-skeleton">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
            <SkeletonLoader height="24px" width="160px" style={{ borderRadius: '6px', marginRight: '10px' }} />
          </div>
          
          <div className="demo-block-skeleton" style={{ 
            padding: '32px', 
            background: '#f0f9ff', 
            border: '3px solid #3b82f6', 
            borderRadius: '12px',
            marginBottom: '48px'
          }}>
            <SkeletonLoader height="22px" width="80%" style={{ marginBottom: '8px', borderRadius: '4px' }} />
            <SkeletonLoader height="14px" width="60%" style={{ marginBottom: '24px', borderRadius: '4px' }} />
            <SkeletonLoader height="300px" width="100%" style={{ borderRadius: '8px' }} />
          </div>
        </div>
      )}

      <style jsx>{`
        .skeleton-loader {
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          display: block;
          position: relative;
        }
        
        @keyframes loading {
          0% {
            background-position-x: 200%;
          }
          100% {
            background-position-x: -200%;
          }
        }
      `}</style>
    </div>
  );
};

export default MathContentSkeleton;