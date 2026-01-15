"use client";

import { useEffect, useRef } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

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

    const currentCards = cardsRef.current;

    return () => {
      currentCards.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section className="projects-section">
      <h2 className="projects-title">Latest Projects</h2>
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          project={project}
          onRef={(el: HTMLDivElement | null) => {
            cardsRef.current[index] = el;
          }}
        />
      ))}
    </section>
  );
}
