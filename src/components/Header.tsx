import Link from "next/link";
import SocialLinks from "./SocialLinks";
import { socialLinks } from "@/data/socialLinks";

export default function Header() {
  return (
    <header>
      <Link href="/">Akshaya Parida</Link>
      <SocialLinks links={socialLinks} size="md" />
    </header>
  );
}
