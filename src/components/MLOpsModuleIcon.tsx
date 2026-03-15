import React from "react";

type MLOpsModuleIconProps = {
  moduleId: string;
  className?: string;
};

export default function MLOpsModuleIcon({
  moduleId,
  className,
}: MLOpsModuleIconProps) {
  const iconProps = {
    viewBox: "0 0 24 24",
    width: 24,
    height: 24,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  switch (moduleId) {
    case "01-data-exploration":
      return (
        <svg {...iconProps}>
          <path
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            strokeWidth="2"
          />
          <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.3" />
        </svg>
      );
    case "02-data-validation":
      return (
        <svg {...iconProps}>
          <path
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeWidth="2"
          />
        </svg>
      );
    case "03-reproducible-training":
      return (
        <svg {...iconProps}>
          <path
            d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611l-2.395.479a9.038 9.038 0 01-11.48 0l-2.395-.479c-1.717-.293-2.299-2.379-1.067-3.611L5 14.5"
            strokeWidth="2"
          />
        </svg>
      );
    case "04-api-deployment":
      return (
        <svg {...iconProps}>
          <path
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            strokeWidth="2"
          />
          <circle cx="12" cy="12" r="3" strokeWidth="2" />
        </svg>
      );
    case "05-model-monitoring":
      return (
        <svg {...iconProps}>
          <path
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            strokeWidth="2"
          />
        </svg>
      );
    default:
      return (
        <svg {...iconProps}>
          <path
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            strokeWidth="2"
          />
        </svg>
      );
  }
}
