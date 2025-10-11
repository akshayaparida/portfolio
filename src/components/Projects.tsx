"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Projects() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-visible");
        }
      });
    }, observerOptions);

    const currentCards = cardsRef.current;
    currentCards.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      currentCards.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  const projects = [
    {
      title: "Bengaluru Infra AI Reporter",
      date: "Oct 2025",
      description:
        "A production-ready, full-stack platform enabling Bengaluru citizens to report infrastructure issues (potholes, garbage, water leaks, broken streetlights) with GPS + photo evidence. Features AI classification via Cerebras LLaMA, automated email notifications to authorities, and an intelligent Twitter bot for civic engagement.",
      tech: ["Next.js", "TypeScript", "Cerebras LLaMA", "Docker", "PostgreSQL"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/akshayaparida/bengaluru-infra-aiagent",
        },
      ],
      image: "/bengaluru-infra.png",
    },
    {
      title: "GitHub Contribution Tracker",
      date: "Feb 14, 2025",
      description:
        "This project allows you to track the open/closed issues and pull requests (PRs) for any GitHub user.",
      tech: ["Reactjs", "Nextjs", "TailwindCSS"],
      links: [
        {
          label: "Live",
          url: "https://github-contribution-tracker.vercel.app",
        },
        {
          label: "GitHub",
          url: "https://github.com/akshayaparida/github-contribution-tracker",
        },
      ],
      image: "/githubtracker.png",
    },
  ];

  return (
    <section>
      <h2>Lastest Projects</h2>
      <div className="cards-grid">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card"
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
          >
            <div>
              <h4>{project.title}</h4>
              <p>{project.date}</p>
              <div className="tech-list">
                {project.tech.map((tech, techIndex) => (
                  <div key={techIndex} className="card-button-secondary">
                    <p>{tech}</p>
                  </div>
                ))}
              </div>
              <p>{project.description}</p>
              <div className="project-links">
                {project.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    target="_blank"
                    href={link.url}
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="img-div">
              <Image
                className="big-img"
                src={project.image}
                alt={`${project.title} thumbnail`}
                width={300}
                height={200}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
