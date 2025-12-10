import React from 'react';

interface SkeletonLoaderProps {
  count?: number;
  height?: string | number;
  width?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  count = 1,
  height = '20px',
  width = '100%',
  className = '',
  style = {}
}) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`skeleton-loader ${className}`}
      style={{
        height,
        width,
        ...style
      }}
    />
  ));

  return <>{skeletons}</>;
};

export default SkeletonLoader;