import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import LearningJourneyPage from "../page";

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

describe("LearningJourneyPage", () => {
  it("renders the hero section, title, and trajectory milestones", () => {
    render(<LearningJourneyPage />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/My Learning & Geo-Trajectory Journey/i);

    // Verify all 4 major hubs are mentioned
    expect(screen.getAllByText(/Haridwar/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Bhikapada/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Bengaluru|Bangalore/i).length).toBeGreaterThan(
      0,
    );
    expect(screen.getAllByText(/CURAJ/i).length).toBeGreaterThan(0);
  });

  it("renders interactive journey map and updates active dossier when a stop is clicked", () => {
    render(<LearningJourneyPage />);

    // Default selection is CURAJ (Step 4)
    expect(screen.getAllByText(/Bandarsindri/i).length).toBeGreaterThan(0);

    // Switch to Haridwar (Step 1)
    const haridwarBtn = screen.getByRole("button", {
      name: /1.*(DSVV|Haridwar)/i,
    });
    fireEvent.click(haridwarBtn);

    expect(
      screen.getAllByText(/Dev Sanskriti Vishwavidyalaya \(DSVV\)/i).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/The Undergraduate Foundation & Discipline/i).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText(/JavaScript/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Life Management/i).length).toBeGreaterThan(0);

    // Switch to Bhikapada (Step 2)
    const bhikapadaBtn = screen.getByRole("button", {
      name: /2.*(Bhikapada|Khallikote)/i,
    });
    fireEvent.click(bhikapadaBtn);

    expect(
      screen.getAllByText(/The 'High Agency' Mindset Shift & Deep Self-Study/i)
        .length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/COVID-19 Lockdown & Self-Directed Awakening/i)
        .length,
    ).toBeGreaterThan(0);
  });

  it("navigates through steps using Previous and Next buttons", () => {
    render(<LearningJourneyPage />);

    const nextBtn = screen.getByTitle("Next Phase");
    const prevBtn = screen.getByTitle("Previous Phase");

    // Click Next from CURAJ (step 4 -> step 1 Haridwar)
    fireEvent.click(nextBtn);
    expect(
      screen.getAllByText(/The Undergraduate Foundation & Discipline/i).length,
    ).toBeGreaterThan(0);

    // Click Prev (step 1 -> step 4 CURAJ)
    fireEvent.click(prevBtn);
    expect(
      screen.getAllByText(/MSc in Computer Science & Advanced Deep Tech/i)
        .length,
    ).toBeGreaterThan(0);
  });

  it("toggles the auto-play route tour button", () => {
    jest.useFakeTimers();
    render(<LearningJourneyPage />);

    const tourBtn = screen.getByRole("button", { name: /Play Route Tour/i });
    fireEvent.click(tourBtn);

    expect(
      screen.getByRole("button", { name: /Pause Tour/i }),
    ).toBeInTheDocument();

    // Advance timer to trigger step rotation
    act(() => {
      jest.advanceTimersByTime(4500);
    });

    // Pause tour
    const pauseBtn = screen.getByRole("button", { name: /Pause Tour/i });
    fireEvent.click(pauseBtn);

    expect(
      screen.getByRole("button", { name: /Play Route Tour/i }),
    ).toBeInTheDocument();
    jest.useRealTimers();
  });
});
