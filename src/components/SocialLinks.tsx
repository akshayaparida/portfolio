import { HuggingFace } from "@lobehub/icons";
import { SocialLink } from "@/types/portfolio";

interface SocialLinksProps {
  links: SocialLink[];
  size?: "sm" | "md" | "lg";
}

const sizeClasses: Record<string, string> = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-2xl",
};

const iconSizes: Record<string, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

export default function SocialLinks({ links, size = "md" }: SocialLinksProps) {
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
        >
          {link.platform === "huggingface" ? (
            <HuggingFace.Color size={iconSizes[size]} />
          ) : (
            <i className={`${link.icon} ${sizeClasses[size]}`}></i>
          )}
        </a>
      ))}
    </nav>
  );
}
