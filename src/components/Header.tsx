import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link href="/">Akshaya Parida</Link>
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
    </header>
  );
}
