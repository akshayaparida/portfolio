import { render, screen, waitFor } from "@testing-library/react";
import AnalyticsDashboard from "../AnalyticsDashboard";

// Mock global fetch
global.fetch = jest.fn();

const mockAnalyticsData = {
  visitors: {
    total: 1000,
    unique: 800,
    returning: 200,
  },
  regions: [
    { country: "United States", city: "New York", visitors: 500, percentage: 50 },
    { country: "India", city: "Bangalore", visitors: 500, percentage: 50 },
  ],
  pageViews: [
    { path: "/", views: 500 },
  ],
  devices: [
    { type: "desktop", count: 800, percentage: 80 },
  ],
  browsers: [
    { name: "Chrome", count: 800, percentage: 80 },
  ],
};

describe("AnalyticsDashboard", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it("renders loading state initially", () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      new Promise(() => {}) // Never resolves
    );
    render(<AnalyticsDashboard />);
    // Check for skeleton loading elements (using the class name or structure)
    // The component uses a div with 'animate-pulse'
    const skeletons = document.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders analytics data after successful fetch", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockAnalyticsData,
    });

    render(<AnalyticsDashboard />);

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText("Total Visitors")).toBeInTheDocument();
    });

    // Check Visitor Stats
    expect(screen.getByText("1,000")).toBeInTheDocument(); // Total
    expect(screen.getByText("800")).toBeInTheDocument();   // Unique

    // Check Regions
    expect(screen.getByText("United States")).toBeInTheDocument();
    expect(screen.getByText("India")).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("Bangalore")).toBeInTheDocument();
  });

  it("renders error state when fetch fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(<AnalyticsDashboard />);

    await waitFor(() => {
      expect(screen.getByText("Error loading analytics")).toBeInTheDocument();
    });
  });
});
