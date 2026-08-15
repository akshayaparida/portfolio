"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TechnicalSkills from "./TechnicalSkills";
import { skillCategories } from "@/data/skills";

export default function Hero() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    function updateDate() {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const dateString = `${day}-${month}-${year}`;
      setCurrentDate(dateString);
    }

    updateDate();
  }, []);

  return (
    <>
      <section className="hero-section">
        <div className="hero-bio-flow">
          <div className="hero-photo-wrapper float-left">
            <Image
              src="/akshaya-photo.jpg"
              alt="Akshaya Parida"
              width={360}
              height={360}
              className="hero-photo"
              quality={100}
              unoptimized
              priority
            />
          </div>

          <h1
            className="hero-title"
            style={{ marginTop: 0, marginBottom: "0.5rem" }}
          >
            <span className="wave-hand">👋</span> Hi, I&apos;m Akshaya Parida
          </h1>

          <p className="hero-description">
            I&apos;m a philomath pursuing advanced postgraduate CS studies,
            propelled by an innate high-agency mindset and an aggressive pace of
            learning. My work bridges AI engineering with systemic policy
            analysis. Fueled by relentless curiosity and a deep interest in
            computer vision.
          </p>

          <p className="hero-description" style={{ marginTop: "0.75rem" }}>
            Beyond code, my academic interest extends to Indian law, digital
            governance, and civic infrastructure. I believe robust legal
            frameworks are the engine to transform India into a truly developed
            nation. Driven by the philosophy that truth and absolute reality
            always survive systemic friction, my trajectory combines CS with
            legal analysis to optimize public structures.
          </p>

          <p className="hero-description" style={{ marginTop: "0.75rem" }}>
            Currently building{" "}
            <a
              href="https://github.com/akshayaparida/rip_social"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#2563eb",
                textDecoration: "underline",
                fontWeight: "600",
              }}
            >
              rip_social
            </a>
            , an open-source web software for civic engagement where verified
            citizens discuss real issues, moderated by AI, with direct routes to
            government action. Learn how I&apos;m building rip_social open
            source, contribute, and be part of the revolution! It is currently
            in the planning phase. Feel free to{" "}
            <a
              href="https://discord.gg/yuFE2Rwzep"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#2563eb",
                textDecoration: "underline",
                fontWeight: "600",
              }}
            >
              join my Discord
            </a>{" "}
            to take part in the architecture &amp; discussions, and watch my{" "}
            <a
              href="https://www.youtube.com/@akshaya.parida"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#2563eb",
                textDecoration: "underline",
                fontWeight: "600",
              }}
            >
              YouTube videos
            </a>{" "}
            for upcoming sessions on building open source rip_social!
          </p>
        </div>
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
