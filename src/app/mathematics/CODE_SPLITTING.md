# Code Splitting Implementation

This document explains the code splitting implementation in the portfolio project mathematics page.

## Overview

To improve initial page load time and Core Web Vitals scores, we've implemented code splitting for the mathematics visualization components using Next.js dynamic imports. This approach loads each visualization component only when it's needed, rather than bundling all components upfront.

## Implementation Details

### Dynamic Imports

Each visualization component in the mathematics page is now loaded dynamically using React's `lazy` function and `Suspense`:

```tsx
import { lazy, Suspense } from 'react';

// Dynamically import visualization components with loading fallbacks
const VectorSpace2D = lazy(() => import('@/components/math-visualizations/VectorSpace2D'));
const MatrixMultiplication = lazy(() => import('@/components/math-visualizations/MatrixMultiplication'));
// ... other components

// Loading component to show while the visualization is loading
const LoadingDemo = () => (
  <div className="loading-demo">
    <div className="loading-spinner"></div>
    <p className="loading-text">Loading interactive demo...</p>
  </div>
);

// Using the components with Suspense
<Suspense fallback={<LoadingDemo />}>
  <DemoComponent />
</Suspense>
```

### Benefits

- **Faster initial page load**: Only the essential code is loaded initially
- **Better Core Web Vitals scores**: Reduced Largest Contentful Paint (LCP) and First Input Delay (FID)
- **Improved user experience**: Interactive demos load on-demand without blocking the main thread
- **Reduced bandwidth usage**: Users only download code for the components they interact with

## Usage

When adding new visualization components to the mathematics page:

1. Add the component to the dynamic imports at the top of the file
2. Add the component to the `demoComponents` mapping
3. The component will be automatically loaded on-demand when the user opens the corresponding section

## Performance Considerations

- Each visualization component is loaded as a separate JavaScript bundle
- Loading states are provided with a fallback UI to maintain good UX
- Error boundaries wrap the components to handle loading errors gracefully
- The initial page bundle is significantly smaller than before

## Testing

To verify code splitting is working:

1. Open browser DevTools Network tab
2. Go to the mathematics page
3. You should see separate bundle requests when opening different math modules
4. The main bundle size should be smaller than before

## Future Improvements

- Consider preloading critical components based on user behavior patterns
- Implement more sophisticated loading states
- Add progress indicators for larger components
- Analyze bundle sizes regularly to maintain performance gains