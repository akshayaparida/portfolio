import React from 'react';
import { render } from '@testing-library/react';
import VectorSpace2D from '../VectorSpace2D';
import { runAccessibilityTest, testCommonAccessibility } from '../../../__tests__/utils/accessibilityHelper';

describe('VectorSpace2D Accessibility Tests', () => {
  it('should pass basic accessibility tests', async () => {
    const { container } = render(<VectorSpace2D />);
    
    // Run the accessibility test using our helper
    await runAccessibilityTest(container);
  });

  it('should pass common accessibility checks', async () => {
    const { container } = render(<VectorSpace2D />);
    
    // Test common accessibility issues
    await testCommonAccessibility(container);
  });

  it('should have proper semantic structure', async () => {
    const { container, getByText, getByRole } = render(<VectorSpace2D />);
    
    // Check that headings exist and are properly structured
    expect(getByText('Vector A (Blue)')).toBeInTheDocument();
    expect(getByText('Vector B (Red)')).toBeInTheDocument();
    expect(getByText('Similarity Metrics')).toBeInTheDocument();
    
    // Run accessibility tests on the full container
    await runAccessibilityTest(container);
  });
});