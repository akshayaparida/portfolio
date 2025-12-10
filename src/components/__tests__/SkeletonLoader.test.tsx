import React from 'react';
import { render, screen } from '@testing-library/react';
import SkeletonLoader from '@/components/SkeletonLoader';

describe('SkeletonLoader Component', () => {
  it('renders a single skeleton loader by default', () => {
    render(<SkeletonLoader />);

    const skeleton = screen.getByTestId('skeleton-loader');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('skeleton-loader');
  });

  it('renders multiple skeleton loaders when count prop is provided', () => {
    render(<SkeletonLoader count={3} />);

    const skeletons = screen.getAllByTestId('skeleton-loader');
    expect(skeletons).toHaveLength(3);
  });

  it('applies custom height and width when provided', () => {
    render(<SkeletonLoader height="50px" width="200px" />);

    const skeleton = screen.getByTestId('skeleton-loader');
    expect(skeleton).toHaveStyle({ height: '50px', width: '200px' });
  });

  it('applies custom className when provided', () => {
    render(<SkeletonLoader className="custom-skeleton" />);

    const skeleton = screen.getByTestId('skeleton-loader');
    expect(skeleton).toHaveClass('skeleton-loader');
    expect(skeleton).toHaveClass('custom-skeleton');
  });

  it('applies custom style when provided', () => {
    const customStyle = { backgroundColor: 'red', borderRadius: '10px' };
    render(<SkeletonLoader style={customStyle} />);

    const skeleton = screen.getByTestId('skeleton-loader');
    expect(skeleton).toHaveStyle('background-color: rgb(255, 0, 0)');  // 'red' becomes 'rgb(255, 0, 0)'
    expect(skeleton).toHaveStyle('border-radius: 10px');
  });

  it('has default height and width', () => {
    render(<SkeletonLoader />);

    const skeleton = screen.getByTestId('skeleton-loader');
    expect(skeleton).toHaveStyle({ height: '20px', width: '100%' });
  });
});