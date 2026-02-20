import React from "react";

type DBMSModuleIconProps = {
  moduleId: string;
  className?: string;
};

export default function DBMSModuleIcon({
  moduleId,
  className,
}: DBMSModuleIconProps) {
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
    case "database-fundamentals":
      return (
        <svg {...iconProps}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case "sql-queries":
      return (
        <svg {...iconProps}>
          <path d="M4 7V4h16v3" strokeWidth="2" />
          <path d="M9 20h6" strokeWidth="2" />
          <path d="M12 4v16" strokeWidth="2" />
        </svg>
      );
    case "normalization":
      return (
        <svg {...iconProps}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "transactions-concurrency":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 10v6M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24M1 12h6m10 0h6M4.22 19.78l4.24-4.24m7.08-7.08l4.24-4.24" />
        </svg>
      );
    case "indexing-storage":
      return (
        <svg {...iconProps}>
          <path d="M4 6h16M4 10h16M4 14h16M4 18h16" strokeWidth="2" />
          <path d="M8 6v12" strokeWidth="2" />
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
