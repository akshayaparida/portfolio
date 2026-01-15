import React from "react";
import { render, screen } from "@testing-library/react";
import Sidebar from "../Sidebar";

// Mock next/link
jest.mock("next/link", () => {
  const MockNextLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => {
    return <a href={href}>{children}</a>;
  };
  MockNextLink.displayName = "MockNextLink";
  return MockNextLink;
});

// Mock navigation links
jest.mock("@/data/navigationLinks", () => ({
  navigationLinks: [
    {
      label: "Learning Journey",
      href: "/learning-journey",
      icon: "fa-solid fa-book-open",
    },
    {
      label: "Mathematics",
      href: "/mathematics",
      icon: "fa-solid fa-calculator",
    },
    { label: "MLOps", href: "/mlops", icon: "fa-solid fa-gears" },
    { label: "Blog Posts", href: "/blog", icon: "fa-solid fa-pen-nib" },
  ],
}));

describe("Sidebar", () => {
  it("renders the sidebar with correct structure", () => {
    render(<Sidebar />);

    // Check sidebar title
    expect(screen.getByText("Explore more stuff")).toBeInTheDocument();

    // Check navigation links
    expect(screen.getByText("Learning Journey")).toBeInTheDocument();
    expect(screen.getByText("Mathematics")).toBeInTheDocument();
    expect(screen.getByText("MLOps")).toBeInTheDocument();
    expect(screen.getByText("Blog Posts")).toBeInTheDocument();
  });

  it("renders the connect card", () => {
    render(<Sidebar />);

    expect(screen.getByText("Let's connect")).toBeInTheDocument();
    expect(
      screen.getByText(/I'm always open to discussing new projects/),
    ).toBeInTheDocument();
    expect(screen.getByText("Say hi!")).toBeInTheDocument();
  });

  it("has correct link hrefs", () => {
    render(<Sidebar />);

    const learningLink = screen.getByText("Learning Journey").closest("a");
    expect(learningLink).toHaveAttribute("href", "/learning-journey");

    const mathLink = screen.getByText("Mathematics").closest("a");
    expect(mathLink).toHaveAttribute("href", "/mathematics");

    const mlopsLink = screen.getByText("MLOps").closest("a");
    expect(mlopsLink).toHaveAttribute("href", "/mlops");

    const blogLink = screen.getByText("Blog Posts").closest("a");
    expect(blogLink).toHaveAttribute("href", "/blog");
  });

  it("has correct email link in connect card", () => {
    render(<Sidebar />);

    const emailLink = screen.getByText("Say hi!").closest("a");
    expect(emailLink).toHaveAttribute(
      "href",
      "mailto:akshayaparida2811@gmail.com",
    );
  });

  it("renders with sidebar class for styling", () => {
    const { container } = render(<Sidebar />);

    const sidebar = container.querySelector(".sidebar");
    expect(sidebar).toBeInTheDocument();

    const sidebarInner = container.querySelector(".sidebar-inner");
    expect(sidebarInner).toBeInTheDocument();
  });
});
