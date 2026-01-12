import Link from "next/link";
import { NavigationLink } from "@/types/portfolio";

interface NavigationSidebarProps {
  links: NavigationLink[];
}

export default function NavigationSidebar({ links }: NavigationSidebarProps) {
  return (
    <aside className="explore-sidebar">
      <span className="explore-title">Explore</span>
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="explore-link">
          <i className="fa-solid fa-arrow-right explore-arrow"></i>
          <span>{link.label}</span>
        </Link>
      ))}
    </aside>
  );
}
