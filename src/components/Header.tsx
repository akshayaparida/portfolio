"use client";

import Link from "next/link";
import SocialLinks from "./SocialLinks";
import { socialLinks } from "@/data/socialLinks";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header>
      <Link href="/">Akshaya Parida</Link>
      <div className="header-right">
        <SocialLinks links={socialLinks} size="md" />
        <ThemeToggle />
      </div>
    </header>
  );
}
