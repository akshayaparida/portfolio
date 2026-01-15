import { render, screen } from "@testing-library/react";
import Projects from "../Projects";

// Mock the intersection observer
beforeAll(() => {
  (
    global as unknown as { IntersectionObserver: unknown }
  ).IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("Projects", () => {
  it("renders the projects section title", () => {
    render(<Projects />);
    expect(screen.getByText("Latest Projects")).toBeInTheDocument();
  });

  it("renders project cards", () => {
    render(<Projects />);
    // Check for some known project titles from the data
    expect(screen.getByText("Bengaluru Infra AI Reporter")).toBeInTheDocument();
    expect(screen.getByText("GitHub Contribution Tracker")).toBeInTheDocument();
  });
});
