import React from "react";
import { render, screen } from "@testing-library/react";
import BlogPageHeader from "@/components/BlogPageHeader";

describe("BlogPageHeader", () => {
  it("renders the title", () => {
    render(<BlogPageHeader title="Test Title" backLink="/back" />);
    expect(
      screen.getByRole("heading", { name: "Test Title" }),
    ).toBeInTheDocument();
  });

  it("renders back link with correct href", () => {
    render(
      <BlogPageHeader
        title="Test Title"
        backLink="/learning-journey"
        backTitle="My Journey"
      />,
    );
    const backLink = screen.getByRole("link", { name: /my journey/i });
    expect(backLink).toHaveAttribute("href", "/learning-journey");
  });

  it("renders home link", () => {
    render(<BlogPageHeader title="Test Title" backLink="/back" />);
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("uses default back title when not provided", () => {
    render(<BlogPageHeader title="Test Title" backLink="/back" />);
    const backLink = screen.getByRole("link", { name: /back/i });
    expect(backLink).toBeInTheDocument();
  });
});
