import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PoliticsAndGeopoliticsPage from "../page";
import {
  politicalParties,
  studentWings,
  bilateralRelations,
  borderChallenges,
  internalSecurityThreats,
  policyThinkTanks,
} from "@/data/politicsAndGeopolitics";

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

describe("PoliticsAndGeopoliticsPage", () => {
  it("renders the hero section, title, and initial political parties list", () => {
    render(<PoliticsAndGeopoliticsPage />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(
      /Politics, Security & Geopolitical Architecture/i,
    );

    // Initial parties tab is active
    const partyArticles = screen.getAllByRole("article");
    expect(partyArticles.length).toBe(politicalParties.length);
    expect(screen.getByText(/Bharatiya Janata Party/i)).toBeInTheDocument();
    expect(screen.getByText(/Indian National Congress/i)).toBeInTheDocument();
  });

  it("filters political parties by category and alliance", () => {
    render(<PoliticsAndGeopoliticsPage />);

    // Filter by National Parties
    const nationalBtn = screen.getByRole("button", {
      name: /^National Parties$/i,
    });
    fireEvent.click(nationalBtn);

    const nationalCount = politicalParties.filter(
      (p) => p.category === "national",
    ).length;
    const filteredArticles = screen.getAllByRole("article");
    expect(filteredArticles.length).toBe(nationalCount);

    // Filter by NDA Alliance
    const ndaBtn = screen.getByRole("button", { name: /^NDA$/i });
    fireEvent.click(ndaBtn);

    const nationalNdaCount = politicalParties.filter(
      (p) => p.category === "national" && p.alliance === "NDA",
    ).length;
    expect(screen.getAllByRole("article").length).toBe(nationalNdaCount);
  });

  it("switches to Student Wings tab and renders campus organizations", () => {
    render(<PoliticsAndGeopoliticsPage />);

    const studentTabBtn = screen.getByRole("button", {
      name: /Student Wings/i,
    });
    fireEvent.click(studentTabBtn);

    expect(
      screen.getByText(/Akhil Bharatiya Vidyarthi Parishad/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/National Students' Union of India/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Students' Federation of India/i),
    ).toBeInTheDocument();

    const articles = screen.getAllByRole("article");
    expect(articles.length).toBe(studentWings.length);
  });

  it("switches to 18th Lok Sabha Governance tab", () => {
    render(<PoliticsAndGeopoliticsPage />);

    const govTabBtn = screen.getByRole("button", {
      name: /18th Lok Sabha & Cabinet/i,
    });
    fireEvent.click(govTabBtn);

    expect(
      screen.getByText(/National Democratic Alliance/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Dr. S. Jaishankar/i)).toBeInTheDocument();
    expect(screen.getByText(/Rajnath Singh/i)).toBeInTheDocument();
  });

  it("switches to Great Power Relations tab", () => {
    render(<PoliticsAndGeopoliticsPage />);

    const bilateralTabBtn = screen.getByRole("button", {
      name: /Great Power Relations/i,
    });
    fireEvent.click(bilateralTabBtn);

    expect(screen.getByText(/United States of America/i)).toBeInTheDocument();
    expect(screen.getByText(/Russian Federation/i)).toBeInTheDocument();
    expect(screen.getByText(/People's Republic of China/i)).toBeInTheDocument();
    expect(screen.getByText(/European Union & France/i)).toBeInTheDocument();

    const articles = screen.getAllByRole("article");
    expect(articles.length).toBe(bilateralRelations.length);
  });

  it("switches to Border Frontiers tab", () => {
    render(<PoliticsAndGeopoliticsPage />);

    const bordersTabBtn = screen.getByRole("button", {
      name: /Border Frontiers/i,
    });
    fireEvent.click(bordersTabBtn);

    expect(
      screen.getAllByText(/Line of Actual Control/i).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText(/Line of Control/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Indian Ocean Region/i).length).toBeGreaterThan(
      0,
    );
    expect(screen.getAllByText(/Indo-Myanmar Border/i).length).toBeGreaterThan(
      0,
    );

    const articles = screen.getAllByRole("article");
    expect(articles.length).toBe(borderChallenges.length);
  });

  it("switches to Internal Security & FCRA tab", () => {
    render(<PoliticsAndGeopoliticsPage />);

    const securityTabBtn = screen.getByRole("button", {
      name: /Internal Security & FCRA/i,
    });
    fireEvent.click(securityTabBtn);

    expect(
      screen.getByText(/Illicit Foreign Funding & FCRA/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Islamist Radicalization, Sleeper Cells & The PFI Ban/i),
    ).toBeInTheDocument();

    const articles = screen.getAllByRole("article");
    expect(articles.length).toBe(internalSecurityThreats.length);
  });

  it("switches to Think Tanks tab and verifies external link security", () => {
    render(<PoliticsAndGeopoliticsPage />);

    const thinkTanksTabBtn = screen.getByRole("button", {
      name: /Think Tanks/i,
    });
    fireEvent.click(thinkTanksTabBtn);

    expect(
      screen.getByText(
        /Manohar Parrikar Institute for Defence Studies and Analyses/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Observer Research Foundation/i),
    ).toBeInTheDocument();

    const portalLinks = screen.getAllByText("Visit Research Portal");
    expect(portalLinks.length).toBe(policyThinkTanks.length);

    portalLinks.forEach((link) => {
      const anchor = link.closest("a");
      expect(anchor).not.toBeNull();
      expect(anchor).toHaveAttribute("target", "_blank");
      expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
      expect(anchor?.getAttribute("href")).toMatch(/^https?:\/\//);
    });
  });

  it("filters items when a search query is entered", () => {
    render(<PoliticsAndGeopoliticsPage />);

    const searchInput = screen.getByPlaceholderText(/Search in parties/i);
    fireEvent.change(searchInput, { target: { value: "Ambedkarism" } });

    expect(screen.getByText(/Bahujan Samaj Party/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/Bharatiya Janata Party/i),
    ).not.toBeInTheDocument();
  });

  it("renders the interactive geopolitics map with tactical beacons, PoK, Aksai Chin, and filters", () => {
    render(<PoliticsAndGeopoliticsPage />);

    expect(
      screen.getByText(/Interactive Strategic Security & Geopolitical Map/i),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Aksai Chin/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/PoK/i).length).toBeGreaterThan(0);

    // Filter map by LoC & PoK
    const locFilterBtn = screen.getByRole("button", { name: /LoC & PoK/i });
    fireEvent.click(locFilterBtn);

    const pokBeacon = screen.getAllByText(/Pakistan-Occupied Kashmir/i)[0];
    expect(pokBeacon).toBeInTheDocument();

    // Click the PoK beacon to inspect dossier
    fireEvent.click(pokBeacon);
    expect(
      screen.getByText(
        /Forms the land transit corridor for the China-Pakistan Economic Corridor/i,
      ),
    ).toBeInTheDocument();

    // Filter map by LAC & Aksai Chin
    const lacFilterBtn = screen.getByRole("button", {
      name: /LAC & Aksai Chin/i,
    });
    fireEvent.click(lacFilterBtn);

    const aksaiZone = screen.getByTestId("aksai-chin-zone");
    expect(aksaiZone).toBeInTheDocument();

    // Click the Aksai Chin territory
    fireEvent.click(aksaiZone);
    expect(
      screen.getByText(/Traversed by China's strategic National Highway G219/i),
    ).toBeInTheDocument();
  });
});
