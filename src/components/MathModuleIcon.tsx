import React from "react";

type MathModuleIconProps = {
  moduleId: string;
  className?: string;
};

/**
 * Reusable icon component for mathematics module navigation.
 * Returns the appropriate SVG icon based on the module ID.
 */
export default function MathModuleIcon({
  moduleId,
  className,
}: MathModuleIconProps) {
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
    case "set-theory":
      return (
        <svg {...iconProps}>
          {/* Venn diagram */}
          <circle cx="9" cy="12" r="6" strokeWidth="2" />
          <circle cx="15" cy="12" r="6" strokeWidth="2" />
        </svg>
      );
    case "algebra":
      return (
        <svg {...iconProps}>
          {/* X variable symbol */}
          <path d="M6 6l12 12M18 6L6 18" strokeWidth="2" />
          <path d="M3 12h4M17 12h4" strokeWidth="1.5" />
        </svg>
      );
    case "coordinate-geometry":
      return (
        <svg {...iconProps}>
          {/* Coordinate axes with point */}
          <path d="M3 21V3M3 21h18" strokeWidth="2" />
          <circle cx="12" cy="10" r="2" fill="currentColor" />
          <path d="M3 10h7M12 10v11" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      );
    case "linear-algebra":
      return (
        <svg {...iconProps}>
          <path d="M4 12l8-8m0 0l8 8m-8-8v16" strokeWidth="2" />
          <path
            d="M2 6v12M22 6v12M2 6h2M2 18h2M22 6h-2M22 18h-2"
            strokeWidth="2"
          />
        </svg>
      );
    case "calculus":
      return (
        <svg {...iconProps}>
          <path d="M2 20c2-6 4-8 6-6s2 8 4 6s2-8 4-6s4 0 6 6" strokeWidth="2" />
          <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "probability-stats":
      return (
        <svg {...iconProps}>
          <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" />
          <circle cx="9" cy="9" r="1.2" fill="currentColor" />
          <circle cx="15" cy="9" r="1.2" fill="currentColor" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" />
          <circle cx="9" cy="15" r="1.2" fill="currentColor" />
          <circle cx="15" cy="15" r="1.2" fill="currentColor" />
        </svg>
      );
    case "linear-models":
      return (
        <svg {...iconProps}>
          <path d="M3 21h18M3 21V3" strokeWidth="2" />
          <path d="M4 18l16-12" strokeWidth="2" />
          <circle cx="7" cy="14" r="1.5" fill="currentColor" opacity="0.6" />
          <circle cx="12" cy="10" r="1.5" fill="currentColor" opacity="0.6" />
          <circle cx="18" cy="6" r="1.5" fill="currentColor" opacity="0.6" />
        </svg>
      );
    default:
      return null;
  }
}
