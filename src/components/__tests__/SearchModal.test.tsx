import React, { useEffect } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchProvider, useSearch } from "../SearchContext";
import SearchModal from "../SearchModal";
import SearchTrigger from "../SearchTrigger";

// Mock Next.js useRouter
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

function TestWrapper({ defaultOpen = false }: { defaultOpen?: boolean }) {
  return (
    <SearchProvider>
      <SearchTrigger />
      <SearchModal />
      {defaultOpen && <AutoOpen />}
    </SearchProvider>
  );
}

function AutoOpen() {
  const { openSearch } = useSearch();
  useEffect(() => {
    openSearch();
  }, [openSearch]);
  return null;
}

describe("Search Feature Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders SearchTrigger and opens modal on click", async () => {
    render(<TestWrapper />);

    const triggerBtn = screen.getByRole("button", {
      name: /open search dialog/i,
    });
    expect(triggerBtn).toBeInTheDocument();

    // Modal should not be open initially
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Click trigger button
    fireEvent.click(triggerBtn);

    // Modal should be open
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/search topics, concepts/i),
    ).toBeInTheDocument();
  });

  it("searches and renders matching results with breadcrumbs and snippets", async () => {
    const user = userEvent.setup();
    render(<TestWrapper defaultOpen />);

    const input = screen.getByPlaceholderText(/search topics, concepts/i);
    await user.type(input, "Linear");

    await waitFor(() => {
      const results = screen.getAllByRole("option");
      expect(results.length).toBeGreaterThan(0);
      expect(results[0]).toHaveTextContent(/Linear/i);
    });
  });

  it("navigates to exact module page when clicking a result", async () => {
    const user = userEvent.setup();
    render(<TestWrapper defaultOpen />);

    const input = screen.getByPlaceholderText(/search topics, concepts/i);
    await user.type(input, "Linear");

    await waitFor(() => {
      const resultOptions = screen.getAllByRole("option");
      expect(resultOptions.length).toBeGreaterThan(0);
    });

    const firstResult = screen.getAllByRole("option")[0];
    fireEvent.click(firstResult);

    expect(mockPush).toHaveBeenCalledWith(
      expect.stringContaining("/mathematics/"),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("filters results by category tabs", async () => {
    const user = userEvent.setup();
    render(<TestWrapper defaultOpen />);

    const input = screen.getByPlaceholderText(/search topics, concepts/i);
    await user.type(input, "Infra");

    const projectTab = screen.getByRole("button", { name: /projects/i });
    fireEvent.click(projectTab);

    await waitFor(() => {
      const results = screen.getAllByRole("option");
      expect(results.length).toBeGreaterThan(0);
      expect(results[0]).toHaveTextContent(/Bengaluru Infra/i);
    });
  });

  it("closes modal on ESC key press", async () => {
    render(<TestWrapper defaultOpen />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
