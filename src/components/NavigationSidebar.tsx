import Link from "next/link";
import { NavigationLink } from "@/types/portfolio";

interface NavigationSidebarProps {
  links: NavigationLink[];
}

export default function NavigationSidebar({ links }: NavigationSidebarProps) {
  return (
    <aside className="fixed right-6 top-1/4 hidden lg:flex flex-col gap-3 z-50">
      <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">
        Explore
      </span>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all hover:-translate-x-1"
        >
          <i className="fa-solid fa-arrow-right text-xs text-gray-400"></i>
          <span>{link.label}</span>
        </Link>
      ))}
    </aside>
  );
}
