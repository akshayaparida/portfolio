import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InternshipsAndJobsPage from "../page";

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

describe("InternshipsAndJobsPage", () => {
  it("renders the hero section, title, and initial opportunities list", () => {
    render(<InternshipsAndJobsPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Top Tier Internships, Fellowships & Tech Careers/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/IASc-INSA-NASI Summer Research Fellowship/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Google Summer of Code/i)).toBeInTheDocument();
  });

  it("filters opportunities by category tabs", () => {
    render(<InternshipsAndJobsPage />);

    const openSourceTab = screen.getByRole("button", {
      name: /Open Source Fellowships/i,
    });
    fireEvent.click(openSourceTab);

    expect(screen.getByText(/Google Summer of Code/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/IASc-INSA-NASI Summer Research Fellowship/i),
    ).not.toBeInTheDocument();
  });

  it("filters opportunities by search query", () => {
    render(<InternshipsAndJobsPage />);

    const searchInput = screen.getByPlaceholderText(/Filter by keyword/i);
    fireEvent.change(searchInput, { target: { value: "Mitacs" } });

    expect(
      screen.getByText(/Mitacs Globalink Research Internship/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/Google Summer of Code/i),
    ).not.toBeInTheDocument();
  });

  it("switches to cold outreach templates view and displays copyable blueprints", () => {
    render(<InternshipsAndJobsPage />);

    const outreachTab = screen.getByRole("button", {
      name: /Cold Outreach Blueprints/i,
    });
    fireEvent.click(outreachTab);

    expect(
      screen.getByText(/High-Conversion Cold Outreach Blueprints/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Cold Email to University Professors/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Direct Outreach to Startup Founders & Engineering Leads/i,
      ),
    ).toBeInTheDocument();
  });

  it("switches to ATS resume strategy view", () => {
    render(<InternshipsAndJobsPage />);

    const resumeTab = screen.getByRole("button", {
      name: /ATS Resume Strategy/i,
    });
    fireEvent.click(resumeTab);

    expect(
      screen.getByText(/AI\/ML & SWE Resume Architecture/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The Google X-Y-Z Impact Formula/i),
    ).toBeInTheDocument();
  });
});
