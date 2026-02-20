import React from "react";

type NetworksModuleIconProps = {
  moduleId: string;
  className?: string;
};

export default function NetworksModuleIcon({
  moduleId,
  className,
}: NetworksModuleIconProps) {
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
    case "01-network-basics":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="3" />
          <circle cx="4" cy="6" r="2" />
          <circle cx="20" cy="6" r="2" />
          <circle cx="4" cy="18" r="2" />
          <circle cx="20" cy="18" r="2" />
          <path d="M6 6l4.5 4.5M14.5 10.5L18 6M6 18l4.5-4.5M14.5 13.5L18 18" />
        </svg>
      );
    case "02-data-link-layer":
      return (
        <svg {...iconProps}>
          <rect x="2" y="4" width="20" height="4" rx="1" />
          <rect x="2" y="10" width="20" height="4" rx="1" />
          <rect x="2" y="16" width="20" height="4" rx="1" />
          <path d="M6 4v16M18 4v16" />
        </svg>
      );
    case "03-network-layer":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="4" r="2" />
          <circle cx="6" cy="12" r="2" />
          <circle cx="18" cy="12" r="2" />
          <circle cx="4" cy="20" r="2" />
          <circle cx="12" cy="20" r="2" />
          <circle cx="20" cy="20" r="2" />
          <path d="M12 6v4M8 12l-2 6M16 12l2 6M10 12v6M14 12v6" />
        </svg>
      );
    case "04-transport-layer":
      return (
        <svg {...iconProps}>
          <path d="M4 4h16v16H4z" />
          <path d="M4 8h16M4 12h16M4 16h16" />
          <path d="M8 4v16M16 4v16" />
        </svg>
      );
    case "05-application-layer":
      return (
        <svg {...iconProps}>
          <rect x="3" y="3" width="18" height="14" rx="2" />
          <path d="M3 9h18" />
          <circle cx="6" cy="6" r="1" />
          <circle cx="9" cy="6" r="1" />
          <path d="M7 21h10M12 17v4" />
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
