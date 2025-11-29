import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import CodeBlock from '../CodeBlock';

describe('CodeBlock Component', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
      }
    });
  });

  it('renders code content correctly', () => {
    const code = 'console.log("test")';
    render(<CodeBlock className="language-js">{code}</CodeBlock>);
    expect(screen.getByText(code)).toBeInTheDocument();
  });

  it('displays the correct language label', () => {
    render(<CodeBlock className="language-python">{"print(\"test\")"}</CodeBlock>);
    expect(screen.getByText('python')).toBeInTheDocument();
  });

  it('copies code to clipboard when button is clicked', async () => {
    const code = 'const x = 1;';
    render(<CodeBlock className="language-ts">{code}</CodeBlock>);
    
    const copyButton = screen.getByRole('button', { name: /copy/i });
    await act(async () => {
      fireEvent.click(copyButton);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(code);
    expect(screen.getByText('Copied!')).toBeInTheDocument();
  });

  it('reverts copy button text after delay', async () => {
    jest.useFakeTimers();
    const code = 'test';
    render(<CodeBlock className="language-text">{code}</CodeBlock>);
    
    const copyButton = screen.getByRole('button', { name: /copy/i });
    await act(async () => {
      fireEvent.click(copyButton);
    });

    expect(screen.getByText('Copied!')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByText('Copy')).toBeInTheDocument();
    jest.useRealTimers();
  });
});
