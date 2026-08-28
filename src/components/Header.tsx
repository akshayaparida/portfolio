"use client";

import Link from "next/link";
import SocialLinks from "./SocialLinks";
import { socialLinks } from "@/data/socialLinks";
import ThemeToggle from "./ThemeToggle";
import SearchTrigger from "./SearchTrigger";

export default function Header() {
  return (
    <header className="site-header">
      <Link href="/">Akshaya Parida</Link>
      <div className="header-right">
        <SearchTrigger />
        <SocialLinks links={socialLinks} size="md" />
        <ThemeToggle />
      </div>
    </header>
  );
}
