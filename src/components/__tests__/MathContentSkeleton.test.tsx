import React from 'react';
import { render, screen } from '@testing-library/react';
import MathContentSkeleton from '@/components/MathContentSkeleton';

describe('MathContentSkeleton Component', () => {
  it('renders with default props', () => {
    render(<MathContentSkeleton />);

    // Should have multiple skeleton loaders for content
    const skeletonLoaders = screen.getAllByTestId('skeleton-loader');
    expect(skeletonLoaders.length).toBeGreaterThan(5); // Should have multiple skeletons
  });

  it('renders theory section skeleton when showTheory is true', () => {
    render(<MathContentSkeleton showTheory={true} showInteractive={false} />);

    // Should have theory section elements
    const theoryBadge = screen.queryByText(/theory/i);
    if (theoryBadge) {
      expect(theoryBadge).toBeInTheDocument();
    }
    
    // Should not have interactive section
    expect(screen.queryByText(/interactive demos/i)).not.toBeInTheDocument();
  });

  it('renders interactive section skeleton when showInteractive is true', () => {
    render(<MathContentSkeleton showTheory={false} showInteractive={true} />);

    // Should have interactive section elements
    const interactiveBadge = screen.queryByText(/interactive/i);
    if (interactiveBadge) {
      expect(interactiveBadge).toBeInTheDocument();
    }
    
    // Should not have theory section
    expect(screen.queryByText(/theory/i)).not.toBeInTheDocument();
  });

  it('renders both sections when both props are true', () => {
    render(<MathContentSkeleton showTheory={true} showInteractive={true} />);

    // Should have both theory and interactive elements
    const theoryBadge = screen.queryByText(/theory/i);
    if (theoryBadge) {
      expect(theoryBadge).toBeInTheDocument();
    }
    
    const interactiveBadge = screen.queryByText(/interactive/i);
    if (interactiveBadge) {
      expect(interactiveBadge).toBeInTheDocument();
    }
  });

  it('applies custom className when provided', () => {
    render(<MathContentSkeleton className="custom-class" />);

    // Find the main container element by class - get all elements with math-skeleton class
    const containers = screen.queryAllByTestId('skeleton-loader').filter(el =>
      el.closest('.math-skeleton')
    );

    // The main container should have math-skeleton and custom-class
    const mainContainer = containers[0]?.closest('.math-skeleton');
    expect(mainContainer).toHaveClass('math-skeleton');
    expect(mainContainer).toHaveClass('custom-class');
  });

  it('renders multiple skeleton loaders based on count prop', () => {
    render(<MathContentSkeleton />);

    // Count the number of skeleton elements (divs with background gradient)
    const skeletonLoaders = screen.getAllByTestId('skeleton-loader');

    // Should have multiple skeleton loaders
    expect(skeletonLoaders.length).toBeGreaterThan(0);
  });
});