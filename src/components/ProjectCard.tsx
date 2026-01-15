import Image from "next/image";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onRef?: (el: HTMLDivElement | null) => void;
}

export default function ProjectCard({ project, onRef }: ProjectCardProps) {
  return (
    <article className="project-card" ref={onRef}>
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
                {link.label === "GitHub" ? (
                  <i className="fa-brands fa-github"></i>
                ) : (
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
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
  );
}
