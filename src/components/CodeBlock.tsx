'use client';

import { useState } from 'react';

// Using 'any' type to satisfy ReactMarkdown component interface requirements
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CodeBlock: React.FunctionComponent<any> = ({ className, children }) => {
  const [copied, setCopied] = useState(false);
  
  const match = /language-(\w+)/.exec(className || '');
  const language = match?.[1] || 'text';
  
  // Determine if this is inline vs block based on className presence
  const isBlock = !!match;
  
  if (!isBlock) {
    return <code className={className}>{children}</code>;
  }
  
  // Properly extract the text content for copying
  const getTextContent = (nodes: React.ReactNode): string => {
    if (typeof nodes === 'string') {
      return nodes;
    } else if (Array.isArray(nodes)) {
      return nodes.map(getTextContent).join('');
    } else if (nodes && typeof nodes === 'object') {
      // Type assertion to handle the React element safely
      const element = nodes as { props?: { children?: React.ReactNode } };
      if (element.props?.children) {
        return getTextContent(element.props.children);
      }
    }
    return '';
  };
  
  const codeString = getTextContent(children);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(codeString)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      });
  };
  
  return (
    <div className="code-block-wrapper">
      <div className="code-header">
        <span className="code-language">{language}</span>
        <button 
          className="copy-button" 
          onClick={handleCopy}
          title="Copy to clipboard"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className={className}>
        <code className={className}>{children}</code>
      </pre>
      <style jsx>{`
        .code-block-wrapper {
          position: relative;
          margin: 16px 0;
        }

        .code-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #2d2d2d;
          color: #fff;
          padding: 6px 12px;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          font-size: 12px;
          font-family: 'Courier New', monospace;
        }

        .code-language {
          font-weight: bold;
          text-transform: uppercase;
        }

        .copy-button {
          background: #4a5568;
          color: white;
          border: none;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          transition: background 0.2s;
        }

        .copy-button:hover {
          background: #2d3748;
        }
      `}</style>
    </div>
  );
};

export default CodeBlock;
