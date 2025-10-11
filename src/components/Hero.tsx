"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [currentTime, setCurrentTime] = useState("Loading...");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const timeString = now.toLocaleTimeString("en-IN", options);
      setCurrentTime(timeString);
    }

    function updateDate() {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const dateString = `${day}-${month}-${year}`;
      setCurrentDate(dateString);
    }

    updateTime();
    updateDate();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <div className="intro-header">
        <h1>Hi, I&apos;m Akshaya Parida</h1>
        <p>AI Engineering</p>
      </div>
      <p className="intro-description">
        Currently hands-on learning in AI engineering.
      </p>
      <div className="status-widget">
        <div className="status-item">
          <i className="fa-solid fa-location-dot status-icon"></i>
          <span>Bengaluru, India</span>
        </div>
        <div className="status-item">
          <i className="fa-regular fa-clock status-icon"></i>
          <span id="live-time">{currentTime}</span>
        </div>
        <div className="status-item status-badge">
          <i className="fa-solid fa-circle-check status-icon"></i>
          <span>Open to AI Engineering roles</span>
        </div>
      </div>
      <div className="links-container">
        <i className="fa-solid link-arrow fa-arrow-right"></i>
        <a href="mailto:akshayaparida2811@gmail.com">Email me</a>
        <a target="_blank" href="https://github.com/akshayaparida" rel="noopener noreferrer">
          GitHub
        </a>
        <a target="_blank" href="https://www.linkedin.com/in/akshaya-parida-7036a426a/" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>

      <div className="github-section">
        <h3 className="github-title">GitHub Contributions {currentDate}</h3>
        <div className="github-contribution-wrapper">
          <a href="https://github.com/akshayaparida" target="_blank" rel="noopener noreferrer">
            <Image
              src="https://ghchart.rshah.org/39d353/akshayaparida"
              alt="GitHub Contribution Graph"
              className="github-chart"
              width={800}
              height={150}
              unoptimized
            />
          </a>
        </div>
      </div>
    </section>
  );
}
