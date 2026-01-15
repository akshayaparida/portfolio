import { render, screen } from "@testing-library/react";
import ProjectCard from "../ProjectCard";
import { Project } from "@/data/projects";

const mockProject: Project = {
  title: "Test Project",
  date: "Jan 2026",
  description: "A test project description.",
  tech: ["React", "TypeScript"],
  links: [
    { label: "GitHub", url: "https://github.com/test" },
    { label: "Live Demo", url: "https://demo.com" },
  ],
  image: "/test-image.png",
};

describe("ProjectCard", () => {
  it("renders project details correctly", () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(screen.getByText("Jan 2026")).toBeInTheDocument();
    expect(screen.getByText("A test project description.")).toBeInTheDocument();
  });

  it("renders tech tags", () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("renders correct links with icons", () => {
    render(<ProjectCard project={mockProject} />);

    const githubLink = screen.getByText("GitHub").closest("a");
    const demoLink = screen.getByText("Live Demo").closest("a");

    expect(githubLink).toHaveAttribute("href", "https://github.com/test");
    expect(demoLink).toHaveAttribute("href", "https://demo.com");
    expect(githubLink).toHaveClass("project-btn");
    expect(demoLink).toHaveClass("project-btn");
  });

  it("renders project image", () => {
    render(<ProjectCard project={mockProject} />);
    const image = screen.getByAltText("Test Project project screenshot");
    expect(image).toBeInTheDocument();
  });
});
