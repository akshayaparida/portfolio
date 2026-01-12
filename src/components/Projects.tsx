"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Projects() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardsRef.current.forEach((card) => {
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
        "This project allows you to track the open/closed issues and pull requests (PRs) for any GitHub user. Visualize your open source impact with clean, interactive charts.",
      tech: ["Reactjs", "Nextjs", "TailwindCSS"],
      links: [
        {
          label: "Live Demo",
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
    <section className="projects-section">
      <h2 className="projects-title">Latest Projects</h2>
      {projects.map((project, index) => (
        <article
          key={index}
          className="project-card"
          ref={(el: HTMLDivElement | null) => {
            cardsRef.current[index] = el;
          }}
        >
          <div className="project-content">
            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-date">{project.date}</p>
              <div className="project-tech">
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className="skill-tag">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-links">
                {project.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`project-btn ${linkIndex === 0 ? "primary" : "secondary"}`}
                  >
                    {link.label === "GitHub" && (
                      <i className="fa-brands fa-github"></i>
                    )}
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="project-image-wrapper">
              <Image
                src={project.image}
                alt={`${project.title} project screenshot`}
                fill
                loading="lazy"
              />
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
