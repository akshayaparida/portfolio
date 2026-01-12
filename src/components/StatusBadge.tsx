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
      className={`status-badge ${variant === "highlight" ? "highlight" : ""}`}
    >
      <i className={icon}></i>
      <span>{text}</span>
    </div>
  );
}
