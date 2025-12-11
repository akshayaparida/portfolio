import React from 'react';
import { render } from '@testing-library/react';
import MatrixMultiplication from '../MatrixMultiplication';
import { runAccessibilityTest, testCommonAccessibility } from '../../../__tests__/utils/accessibilityHelper';

describe('MatrixMultiplication Accessibility Tests', () => {
  it('should pass basic accessibility tests', async () => {
    const { container } = render(<MatrixMultiplication />);
    
    // Run the accessibility test using our helper
    await runAccessibilityTest(container);
  });

  it('should pass common accessibility checks', async () => {
    const { container } = render(<MatrixMultiplication />);
    
    // Test common accessibility issues
    await testCommonAccessibility(container);
  });

  it('should have proper semantic structure and interactive elements', async () => {
    const { container, getByText, getByRole } = render(<MatrixMultiplication />);
    
    // Check that important elements exist and are accessible
    expect(getByText('Matrix A')).toBeInTheDocument();
    expect(getByText('Matrix B')).toBeInTheDocument();
    expect(getByText('Result')).toBeInTheDocument();
    expect(getByRole('button', { name: /animate/i })).toBeInTheDocument();
    
    // Run accessibility tests on the full container
    await runAccessibilityTest(container);
  });
});