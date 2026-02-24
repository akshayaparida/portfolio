import React from "react";

type DigitalFundamentalsModuleIconProps = {
  moduleId: string;
  className?: string;
};

export default function DigitalFundamentalsModuleIcon({
  moduleId,
  className,
}: DigitalFundamentalsModuleIconProps) {
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
    case "number-systems":
      return (
        <svg {...iconProps}>
          <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
          <path d="M7 7h0M17 7h0M7 17h0M17 17h0" strokeWidth="2" />
        </svg>
      );
    case "logic-gates-boolean":
      return (
        <svg {...iconProps}>
          <path d="M2 12h4M18 12h4" />
          <path d="M6 6v12c6 0 10-3 10-6s-4-6-10-6z" />
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
