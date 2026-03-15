import React from "react";

type AWSModuleIconProps = {
  moduleId: string;
  className?: string;
};

export default function AWSModuleIcon({
  moduleId,
  className,
}: AWSModuleIconProps) {
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
    case "aws-fundamentals":
      return (
        <svg {...iconProps}>
          <path
            d="M2 15.5l6.5 3.5 8.5-6-3.5-2M2 15.5v-5l6.5-4 8.5 6v5l-8.5 6-6.5-4v-3M15 13.5l7-4.5-7-4.5M15 13.5V9"
            strokeWidth="2"
          />
        </svg>
      );
    case "ec2-deep-dive":
      return (
        <svg {...iconProps}>
          <path
            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
            strokeWidth="2"
          />
        </svg>
      );
    default:
      return (
        <svg {...iconProps}>
          <path
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
            strokeWidth="2"
          />
        </svg>
      );
  }
}
