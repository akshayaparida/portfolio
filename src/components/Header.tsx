import Link from "next/link";
import SocialLinks from "./SocialLinks";
import { socialLinks } from "@/data/socialLinks";

export default function Header() {
  return (
    <header>
      <Link href="/">Akshaya Parida</Link>
      <div className="header-right">
        <SocialLinks links={socialLinks} size="md" />
      </div>
    </header>
  );
}
