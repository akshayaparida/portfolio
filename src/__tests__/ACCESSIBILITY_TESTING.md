# Accessibility Testing

This document explains how to implement and run accessibility tests in the portfolio project.

## Overview

We use [axe-core](https://github.com/dequelabs/axe-core) with [jest-axe](https://github.com/nickcolley/jest-axe) to run automated accessibility tests in our Jest test suite. These tests help us catch accessibility issues early in the development process and ensure our components meet WCAG 2.1 AA standards.

## Setup

The accessibility testing is already configured in the project:

1. `axe-core` and `jest-axe` are installed as dev dependencies
2. Jest is configured to use the `jest-axe/extend-expect` matcher in `jest.setup.js`
3. We have utility functions in `src/__tests__/utils/accessibilityHelper.ts` to streamline testing

## Writing Accessibility Tests

### Basic Test

To run accessibility tests on a component, use the `runAccessibilityTest` helper:

```tsx
import { render } from '@testing-library/react';
import { runAccessibilityTest } from '../../utils/accessibilityHelper';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should pass accessibility tests', async () => {
    const { container } = render(<MyComponent />);
    await runAccessibilityTest(container);
  });
});
```

### Common Accessibility Tests

For specific common accessibility checks, use the `testCommonAccessibility` helper:

```tsx
import { render } from '@testing-library/react';
import { testCommonAccessibility } from '../../utils/accessibilityHelper';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should pass common accessibility checks', async () => {
    const { container } = render(<MyComponent />);
    await testCommonAccessibility(container);
  });
});
```

## Test File Location

Place accessibility tests in `__tests__` directories alongside the component being tested:

```
src/components/
├── MyComponent.tsx
└── __tests__/
    └── MyComponent.test.tsx  # Accessibility tests go here
```

## CI Integration

Accessibility tests run automatically in our CI pipeline as a separate job that executes after the primary tests pass.

To run accessibility tests locally:

```bash
# Run all tests (including accessibility)
pnpm test

# Run only accessibility tests
pnpm test -- src/components/__tests__/
```

## Troubleshooting

### Canvas Elements

If you're testing components that use canvas elements (like those from the `mafs` library), you might see console warnings about unimplemented canvas features. These are expected in the JSDOM environment and don't affect the accessibility test results.

### False Positives

Sometimes axe-core may flag issues that are acceptable in specific contexts. If you need to disable a specific rule for a test, you can pass options to the accessibility helper:

```tsx
await runAccessibilityTest(container, {
  rules: {
    'color-contrast': { enabled: false }  // Disable contrast checking temporarily
  }
});
```

However, be cautious when disabling rules and ensure it's justified.

## Best Practices

1. Run accessibility tests early and often during development
2. Write tests for all new components
3. Focus on critical user journeys first
4. Remember that automated tests catch ~30% of accessibility issues; manual testing is also necessary
5. Test with keyboard navigation and screen readers in addition to automated tools