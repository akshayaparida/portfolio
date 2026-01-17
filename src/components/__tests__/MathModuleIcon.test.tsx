import React from "react";
import { render, screen } from "@testing-library/react";
import MathModuleIcon from "@/components/MathModuleIcon";

describe("MathModuleIcon", () => {
  it("renders linear algebra icon", () => {
    const { container } = render(<MathModuleIcon moduleId="linear-algebra" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders calculus icon", () => {
    const { container } = render(<MathModuleIcon moduleId="calculus" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders probability-stats icon", () => {
    const { container } = render(
      <MathModuleIcon moduleId="probability-stats" />,
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
    // Should have dice dots (circles)
    expect(container.querySelectorAll("circle").length).toBeGreaterThan(0);
  });

  it("renders linear-models icon", () => {
    const { container } = render(<MathModuleIcon moduleId="linear-models" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("returns null for unknown module id", () => {
    const { container } = render(<MathModuleIcon moduleId="unknown-module" />);
    expect(container.querySelector("svg")).toBeNull();
  });

  it("applies custom className", () => {
    const { container } = render(
      <MathModuleIcon moduleId="linear-algebra" className="custom-class" />,
    );
    expect(container.querySelector("svg")).toHaveClass("custom-class");
  });
});
