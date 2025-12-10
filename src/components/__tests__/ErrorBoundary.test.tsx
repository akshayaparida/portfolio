import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '@/components/ErrorBoundary';

// Test component that will throw an error
const BrokenComponent = () => {
  throw new Error('Test error');
};

// Test component that works normally
const WorkingComponent = () => {
  return <div data-testid="working-component">Working Component</div>;
};

describe('ErrorBoundary Component', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <WorkingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('working-component')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('renders fallback UI when error occurs', () => {
    console.error = jest.fn(); // Mock console.error to avoid logging errors in tests

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    console.error = jest.fn(); // Mock console.error to avoid logging errors in tests

    const CustomFallback: React.FC<{ error?: Error }> = ({ error }) => (
      <div data-testid="custom-fallback">
        Custom Error: {error?.message}
      </div>
    );

    render(
      <ErrorBoundary fallback={CustomFallback}>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    expect(screen.getByText(/Custom Error: Test error/i)).toBeInTheDocument();
  });

  it('resets error state when reset button is clicked', () => {
    console.error = jest.fn(); // Mock console.error to avoid logging errors in tests

    // Create a component that uses a global variable to control error state
    let throwError = true;

    const ToggleErrorComponent = () => {
      if (throwError) {
        throw new Error('Component error');
      }
      return <div data-testid="working-component">Working Component</div>;
    };

    render(
      <ErrorBoundary>
        <ToggleErrorComponent />
      </ErrorBoundary>
    );

    // Initially should show error fallback because the component throws
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();

    // Change the variable to stop throwing error
    throwError = false;

    // Click the reset button
    const resetButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(resetButton);

    // After reset, the ErrorBoundary will re-render the children and won't throw
    expect(screen.getByTestId('working-component')).toBeInTheDocument();
  });

  it('captures error in componentDidCatch', () => {
    console.error = jest.fn(); // Mock console.error to avoid logging errors in tests

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(console.error).toHaveBeenCalledWith(
      'ErrorBoundary caught an error:',
      expect.any(Error),
      expect.any(Object) // errorInfo
    );
  });
});