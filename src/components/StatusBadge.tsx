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
  return (
    <div
      className={`status-item ${variant === "highlight" ? "status-badge" : ""}`}
    >
      <i className={`${icon} status-icon`}></i>
      <span>{text}</span>
    </div>
  );
}
