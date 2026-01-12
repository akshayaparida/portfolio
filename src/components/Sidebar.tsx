import Link from "next/link";
import { navigationLinks } from "@/data/navigationLinks";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        <h4 className="sidebar-title">Explore</h4>
        <nav className="sidebar-links">
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href} className="sidebar-link">
              <i className="fa-solid fa-arrow-trend-up"></i>
              <span>{link.label}</span>
              <span className="arrow">→</span>
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
            Get in touch →
          </a>
        </div>
      </div>
    </aside>
  );
}
