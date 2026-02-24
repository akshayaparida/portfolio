import React from "react";

type DSAModuleIconProps = {
  moduleId: string;
  className?: string;
};

/**
 * Reusable icon component for DSA module navigation.
 * Returns the appropriate SVG icon based on the module ID.
 */
export default function DSAModuleIcon({
  moduleId,
  className,
}: DSAModuleIconProps) {
  const iconProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  switch (moduleId) {
    case "01-arrays-strings":
      return (
        <svg {...iconProps}>
          <path d="M4 6h16M4 10h16M4 14h16M4 18h16" strokeWidth="2" />
          <rect
            x="7"
            y="4"
            width="2"
            height="16"
            fill="currentColor"
            opacity="0.3"
          />
        </svg>
      );
    case "02-linked-lists":
      return (
        <svg {...iconProps}>
          <rect x="4" y="6" width="6" height="4" rx="1" />
          <rect x="14" y="6" width="6" height="4" rx="1" />
          <path d="M10 8h4M4 14h16" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
      );
    case "03-stacks-queues":
      return (
        <svg {...iconProps}>
          <path d="M6 20h12M6 4v12h12V4" strokeWidth="2" />
          <rect x="8" y="12" width="8" height="4" fill="currentColor" />
          <rect
            x="8"
            y="6"
            width="8"
            height="4"
            fill="currentColor"
            opacity="0.5"
          />
        </svg>
      );
    case "05-trees":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="5" r="3" />
          <circle cx="6" cy="15" r="3" />
          <circle cx="18" cy="15" r="3" />
          <path d="M10.5 7.5l-3 5M13.5 7.5l3 5" />
        </svg>
      );
    case "06-heaps":
      return (
        <svg {...iconProps}>
          <path d="M12 3v18M6 9l6-6 6 6" strokeWidth="2" />
          <path d="M5 21h14" strokeWidth="2" />
        </svg>
      );
    case "07-graphs":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="7" r="3" />
          <circle cx="7" cy="17" r="3" />
          <circle cx="17" cy="17" r="3" />
          <path d="M10.5 9.5l-2 5M13.5 9.5l2 5M9.5 17h5" />
        </svg>
      );
    case "04-hashing":
      return (
        <svg {...iconProps}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path
            d="M8 4v16M16 4v16M4 8h16M4 16h16"
            strokeWidth="1.5"
            opacity="0.5"
          />
        </svg>
      );
    case "08-searching-sorting":
      return (
        <svg {...iconProps}>
          <path d="M8 4h12M8 12h8M8 20h4M4 4v16" strokeWidth="2" />
        </svg>
      );
    case "09-advanced-algorithms":
      return (
        <svg {...iconProps}>
          <path
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
            strokeWidth="2"
          />
          <polyline points="9,14 12,17 16,10" strokeWidth="2" />
        </svg>
      );
    case "10-trie-advanced-ds":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="4" r="2" />
          <circle cx="7" cy="11" r="2" />
          <circle cx="17" cy="11" r="2" />
          <circle cx="4" cy="18" r="2" />
          <circle cx="10" cy="18" r="2" />
          <path d="M12 6v3M9 11l-3 5M9 11l-1 7M15 11l3 5" strokeWidth="1.5" />
        </svg>
      );
    case "00-algorithmic-complexity":
      return (
        <svg {...iconProps}>
          <path d="M4 20L8 12L12 16L16 8L20 4" strokeWidth="2" />
          <text
            x="5"
            y="8"
            fontSize="8"
            fill="currentColor"
            fontWeight="bold"
            stroke="none"
          >
            O
          </text>
        </svg>
      );
    case "00b-ds-introduction":
      return (
        <svg {...iconProps}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" strokeWidth="1.5" />
        </svg>
      );
    default:
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}
