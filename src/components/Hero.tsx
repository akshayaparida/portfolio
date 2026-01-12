"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import StatusBadge from "./StatusBadge";
import TechnicalSkills from "./TechnicalSkills";
import { skillCategories } from "@/data/skills";

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
        <h3 className="intro-subtitle">AI Engineering</h3>
      </div>
      <p className="intro-description">
        Currently hands-on learning in AI engineering, building robust systems
        and exploring the frontiers of large language models.
      </p>

      {/* Status Badges */}
      <div className="status-widget">
        <StatusBadge icon="fa-solid fa-location-dot" text="Bengaluru, India" />
        <StatusBadge icon="fa-regular fa-clock" text={currentTime} />
        <StatusBadge
          icon="fa-solid fa-circle-check"
          text="Open to AI Engineering roles"
          variant="highlight"
        />
      </div>

      {/* Contact Links */}
      <div className="links-container">
        <i className="fa-solid link-arrow fa-arrow-right"></i>
        <a href="mailto:akshayaparida2811@gmail.com">Email me</a>
        <a
          target="_blank"
          href="https://github.com/akshayaparida"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/akshaya-parida-7036a426a/"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>

      {/* Technical Skills */}
      <TechnicalSkills categories={skillCategories} />

      {/* GitHub Contributions */}
      <div className="github-section">
        <h3 className="github-title">GitHub Contributions {currentDate}</h3>
        <div className="github-contribution-wrapper">
          <a
            href="https://github.com/akshayaparida"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://ghchart.rshah.org/39d353/akshayaparida"
              alt={`GitHub contribution graph for Akshaya Parida showing activity on ${currentDate}`}
              className="github-chart"
              width={800}
              height={150}
              loading="lazy"
              unoptimized
            />
          </a>
        </div>
      </div>
    </section>
  );
}
