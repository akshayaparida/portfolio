import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link href="/">Akshaya Parida</Link>
      <div className="header-right">
        <nav>
          <a target="_blank" href="https://github.com/akshayaparida" rel="noopener noreferrer">
            <i className="fa-brands fa-github"></i>
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/akshaya-parida-7036a426a" rel="noopener noreferrer">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a target="_blank" href="https://x.com/akshaya_parida_" rel="noopener noreferrer">
            <i className="fa-brands fa-twitter"></i>
          </a>
        </nav>
        <div className="header-learning-links">
          <Link href="/learning-journey">
            <i className="fa-solid fa-arrow-right"></i>
            <span>Learning Journey</span>
          </Link>
          <Link href="/mathematics">
            <i className="fa-solid fa-arrow-right"></i>
            <span>Mathematics</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
