import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EngineeringBlogsPage from "../page";
import { engineeringBlogs } from "@/data/engineeringBlogs";

// Mock the components used in the page
jest.mock("@/components/BlogPageHeader", () => {
  return function MockBlogPageHeader(props: {
    title: string;
    backLink: string;
  }) {
    return (
      <div data-testid="blog-page-header">
        <a href={props.backLink}>Back</a>
        <span>{props.title}</span>
      </div>
    );
  };
});

jest.mock("@/components/PageFooter", () => {
  return function MockPageFooter(props: { moduleName: string }) {
    return <footer data-testid="page-footer">{props.moduleName}</footer>;
  };
});

describe("EngineeringBlogsPage", () => {
  it("renders the hero section and initial blog list", () => {
    render(<EngineeringBlogsPage />);

    const mainHeading = screen.getByRole("heading", { level: 1 });
    expect(mainHeading).toHaveTextContent(/Engineering Blogs/);

    // Check that publications are rendered
    const articles = screen.getAllByRole("article");
    expect(articles.length).toBe(engineeringBlogs.length);
  });

  it("renders valid hyperlinks with target='_blank' and rel='noopener noreferrer'", () => {
    render(<EngineeringBlogsPage />);

    // Get all external blog links
    const visitButtons = screen.getAllByText("Visit Blog");
    expect(visitButtons.length).toBeGreaterThan(10);

    visitButtons.forEach((btn) => {
      const anchor = btn.closest("a");
      expect(anchor).not.toBeNull();
      expect(anchor).toHaveAttribute("target", "_blank");
      expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
      expect(anchor?.getAttribute("href")).toMatch(/^https?:\/\//);
    });
  });

  it("filters blogs when category buttons are clicked", () => {
    render(<EngineeringBlogsPage />);

    // Click Ethical Hacking
    const ethicalHackingBtn = screen.getByRole("button", {
      name: /Ethical Hacking/i,
    });
    fireEvent.click(ethicalHackingBtn);

    // Filtered count
    const ethicalCount = engineeringBlogs.filter(
      (b) => b.category === "ethical-hacking",
    ).length;
    const filteredArticles = screen.getAllByRole("article");
    expect(filteredArticles.length).toBe(ethicalCount);
  });

  it("filters blogs by India Tech toggle", () => {
    render(<EngineeringBlogsPage />);

    const indiaToggle = screen.getByRole("button", {
      name: /India Tech & Missions/i,
    });
    fireEvent.click(indiaToggle);

    const indiaCount = engineeringBlogs.filter((b) => b.isIndiaTech).length;
    const filteredArticles = screen.getAllByRole("article");
    expect(filteredArticles.length).toBe(indiaCount);
  });

  it("filters blogs via search query", () => {
    render(<EngineeringBlogsPage />);

    const searchInput = screen.getByPlaceholderText(/Search blogs by title/i);
    fireEvent.change(searchInput, { target: { value: "OpenAI" } });

    expect(
      screen.getByText("OpenAI Research & Engineering"),
    ).toBeInTheDocument();
    const articles = screen.getAllByRole("article");
    expect(articles.length).toBeLessThan(engineeringBlogs.length);
  });
});
