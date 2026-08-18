import React from "react";
import { render, screen } from "@testing-library/react";
import TableOfContents, {
  slugify,
  extractHeadings,
} from "@/components/TableOfContents";

describe("TableOfContents Component", () => {
  it("slugifies heading text correctly", () => {
    expect(slugify("1. Number Systems")).toBe("1-number-systems");
    expect(slugify("Arithmetic & PEMDAS")).toBe("arithmetic-pemdas");
    expect(slugify("HCF / LCM")).toBe("hcf-lcm");
  });

  it("extracts headings from markdown", () => {
    const sampleMarkdown = `
# Title
## What You'll Learn
### 1. Number Systems
### 2. Arithmetic & PEMDAS
\`\`\`python
## This is code comment, ignore
\`\`\`
## Key Formulas
`;
    const headings = extractHeadings(sampleMarkdown, true, true);
    expect(headings).toContainEqual({
      id: "what-youll-learn",
      title: "What You'll Learn",
      level: 2,
    });
    expect(headings).toContainEqual({
      id: "1-number-systems",
      title: "1. Number Systems",
      level: 3,
    });
    expect(headings).toContainEqual({
      id: "interactive-demos",
      title: "Interactive Demos",
      level: 2,
    });
    expect(headings).toContainEqual({
      id: "practice-quiz",
      title: "Practice Quiz",
      level: 2,
    });
  });

  it("renders table of contents with items", () => {
    const sampleMarkdown = `
## Key Concepts
### 1. Number Systems
`;
    render(
      <TableOfContents
        content={sampleMarkdown}
        hasDemos={true}
        hasQuiz={true}
        quizCount={10}
      />,
    );

    expect(screen.getByText("On This Page")).toBeInTheDocument();
    expect(screen.getByText("Key Concepts")).toBeInTheDocument();
    expect(screen.getByText("1. Number Systems")).toBeInTheDocument();
    expect(screen.getByText("Practice Quiz (10)")).toBeInTheDocument();
  });

  it("returns null when no headings exist", () => {
    const { container } = render(<TableOfContents content="" />);
    expect(container.firstChild).toBeNull();
  });
});
