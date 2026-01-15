import Link from "next/link";
import { navigationLinks } from "@/data/navigationLinks";

export default function MobileExplore() {
  return (
    <section className="mobile-explore">
      <div className="mobile-explore-inner">
        <h4 className="sidebar-title">Explore more stuff</h4>
        <nav className="sidebar-links">
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href} className="sidebar-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="connect-card">
          <h5 className="connect-title">Let&apos;s connect</h5>
          <p className="connect-text">
            I&apos;m always open to discussing new projects, creative ideas or
            opportunities to be part of your visions.
          </p>
          <a href="mailto:akshayaparida2811@gmail.com" className="connect-link">
            <i className="fa-solid fa-paper-plane"></i>
            Say hi!
          </a>
        </div>
      </div>
    </section>
  );
}
