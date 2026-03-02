import { axe, toHaveNoViolations } from "jest-axe";

// Extend Jest with the axe matcher
expect.extend(toHaveNoViolations);

/**
 * Helper function to run accessibility tests on a React component
 * @param element - The React element to test for accessibility
 * @param options - Optional axe configuration options
 * @returns Promise resolving to axe results
 */

export const runAccessibilityTest = async (
  element: HTMLElement | React.ReactElement,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any,
): Promise<void> => {
  // Default axe configuration to ignore certain rules that might be overly strict
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defaultOptions: any = {
    // Ignore contrast issues initially to focus on more critical issues
    rules: {
      // You can disable certain rules temporarily if needed
      // 'color-contrast': { enabled: false },
    },
  };

  // Merge user options with defaults
  const configOptions = {
    ...defaultOptions,
    ...(options || {}),
  };

  // Render the component and run axe accessibility tests
  const results = await axe(element as Element, configOptions);

  // Check for violations and throw error if any are found
  expect(results).toHaveNoViolations();
};

/**
 * Specific helper to test for common accessibility issues
 * @param element - The React element to test
 */
export const testCommonAccessibility = async (
  element: HTMLElement | React.ReactElement,
): Promise<void> => {
  await runAccessibilityTest(element, {
    rules: {
      // Ensure all images have alt attributes
      "image-alt": { enabled: true },
      // Ensure form elements have associated labels
      label: { enabled: true },
      // Ensure links have discernible names
      "link-name": { enabled: true },
      // Ensure color contrast meets minimum ratios
      "color-contrast": { enabled: true },
    },
  });
};
