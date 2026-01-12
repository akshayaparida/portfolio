interface ConnectCardProps {
  email?: string;
}

export default function ConnectCard({
  email = "akshayaparida2811@gmail.com",
}: ConnectCardProps) {
  return (
    <aside className="connect-card">
      <h4 className="connect-title">Let&apos;s connect!</h4>
      <p className="connect-text">
        I&apos;m always open to discussing new projects, creative ideas or
        opportunities to be part of your vision.
      </p>
      <a href={`mailto:${email}`} className="connect-link">
        Get in touch
        <i className="fa-solid fa-arrow-right connect-arrow"></i>
      </a>
    </aside>
  );
}
