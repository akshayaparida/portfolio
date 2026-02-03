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
    <>
      <section>
        <h1 className="hero-title">
          <span className="wave-hand">👋</span> Hi, I&apos;m Akshaya Parida
        </h1>
        <p className="hero-description">
          I&apos;m a <strong>high agency guy</strong> who learns by building.
          Currently hands-on learning <strong>AI Engineering</strong>,{" "}
          <strong>MLOps</strong>, <strong>Agentic AI</strong>, and contributing
          to <strong>Open Source</strong>.
        </p>
        <p className="hero-description" style={{ marginTop: "0.5rem" }}>
          <span style={{ filter: "grayscale(100%)" }}>🚀</span> Building{" "}
          <a
            href="https://github.com/akshayaparida/rip_social"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#2563eb",
              textDecoration: "underline",
              fontWeight: "bold",
            }}
          >
            rip social
          </a>{" "}
          AI-moderated civic platform that transforms public discourse into
          actionable solutions for government.
        </p>
      </section>

      <TechnicalSkills categories={skillCategories} />

      <div className="github-section">
        <div className="github-header">
          <h3 className="section-title">GitHub Contributions</h3>
          <span className="github-date">{currentDate}</span>
        </div>
        <div className="github-wrapper">
          <a
            href="https://github.com/akshayaparida"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://ghchart.rshah.org/10b981/akshayaparida"
              alt={`GitHub contribution graph for Akshaya Parida`}
              className="github-chart"
              width={800}
              height={150}
              loading="lazy"
              unoptimized
            />
          </a>
        </div>
      </div>
    </>
  );
}
