import React from "react";

type ReasoningModuleIconProps = {
  moduleId: string;
  className?: string;
};

export default function ReasoningModuleIcon({
  moduleId,
  className,
}: ReasoningModuleIconProps) {
  const iconProps = {
    viewBox: "0 0 24 24",
    width: 24,
    height: 24,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  switch (moduleId) {
    case "number-series":
      return (
        <svg {...iconProps}>
          <path d="M4 6h2M10 6h2M16 6h2M4 12h4M12 12h4M4 18h6M14 18h6" />
        </svg>
      );
    case "coding-decoding":
      return (
        <svg {...iconProps}>
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    case "analogies-classification":
      return (
        <svg {...iconProps}>
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="18" r="3" />
          <path d="M9 6h6M6 9v6M18 9v6M9 18h6" />
        </svg>
      );
    case "syllogisms":
      return (
        <svg {...iconProps}>
          <circle cx="9" cy="9" r="5" />
          <circle cx="15" cy="9" r="5" />
          <circle cx="12" cy="15" r="5" />
        </svg>
      );
    case "blood-relations-directions":
      return (
        <svg {...iconProps}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
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
