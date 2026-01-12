interface StatusBadgeProps {
  icon: string;
  text: string;
  variant?: "default" | "highlight";
}

export default function StatusBadge({
  icon,
  text,
  variant = "default",
}: StatusBadgeProps) {
  const baseClasses =
    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm min-w-fit";
  const variantClasses =
    variant === "highlight"
      ? "bg-green-50 border border-green-500 text-green-700"
      : "bg-gray-100 text-gray-700";

  return (
    <div className={`${baseClasses} ${variantClasses}`}>
      <i className={`${icon} text-base`}></i>
      <span>{text}</span>
    </div>
  );
}
