import { HuggingFace } from "@lobehub/icons";
import { SocialLink } from "@/types/portfolio";

interface SocialLinksProps {
  links: SocialLink[];
  size?: "sm" | "md" | "lg";
}

const iconSizes: Record<string, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

export default function SocialLinks({ links, size = "md" }: SocialLinksProps) {
  const getIconColor = (platform: string) => {
    switch (platform) {
      case "github":
        return "#181717";
      case "linkedin":
        return "#0A66C2";
      default:
        return "#6b7280";
    }
  };

  return (
    <nav className="social-links">
      {links.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label={`Visit ${link.platform}`}
          style={{ color: getIconColor(link.platform) }}
        >
          {link.platform === "huggingface" ? (
            <HuggingFace.Color size={iconSizes[size]} />
          ) : (
            <i className={link.icon} style={{ fontSize: iconSizes[size] }}></i>
          )}
        </a>
      ))}
    </nav>
  );
}
