import {
  buildSearchIndex,
  getSearchIndex,
  searchItems,
  extractSnippet,
  slugify,
  cleanMarkdown,
} from "@/lib/searchIndex";

describe("searchIndex library", () => {
  it("generates URL-friendly slugs correctly", () => {
    expect(slugify("Banker's Algorithm")).toBe("bankers-algorithm");
    expect(slugify("Process Synchronization & Deadlocks")).toBe(
      "process-synchronization-deadlocks",
    );
    expect(slugify("TCP/IP 3-Way Handshake")).toBe("tcpip-3-way-handshake");
  });

  it("cleans markdown content properly", () => {
    const raw =
      "## Hello *World*\n```js\nconst x = 1;\n```\nCheck [link](https://test.com).";
    const cleaned = cleanMarkdown(raw);
    expect(cleaned).toContain("Hello World");
    expect(cleaned).toContain("Check link");
    expect(cleaned).not.toContain("```");
    expect(cleaned).not.toContain("##");
  });

  it("builds a search index with items from multiple domains", () => {
    const index = buildSearchIndex();
    expect(index.length).toBeGreaterThan(30);

    const domains = new Set(index.map((item) => item.domain));
    expect(domains.has("Mathematics")).toBe(true);
    expect(domains.has("OS")).toBe(true);
    expect(domains.has("DSA")).toBe(true);
    expect(domains.has("Data Structures")).toBe(true);
    expect(domains.has("Algorithms")).toBe(true);
    expect(domains.has("DBMS")).toBe(true);
    expect(domains.has("Networks")).toBe(true);
    expect(domains.has("AWS")).toBe(true);
    expect(domains.has("MLOps")).toBe(true);
    expect(domains.has("Projects")).toBe(true);
    expect(domains.has("Skills")).toBe(true);
  });

  it("indexes deep markdown sections with hash anchor links", () => {
    const index = getSearchIndex();
    const sectionItems = index.filter((item) => item.category === "section");
    expect(sectionItems.length).toBeGreaterThan(10);

    // Verify at least one section has a # in its URL
    const hasHashLink = sectionItems.some((item) => item.url.includes("#"));
    expect(hasHashLink).toBe(true);
  });

  it("searches topics accurately by title and keyword", () => {
    const mathResults = searchItems("Linear Algebra");
    expect(mathResults.length).toBeGreaterThan(0);
    expect(mathResults[0].title).toContain("Linear Algebra");
    expect(mathResults[0].url).toContain("/mathematics/linear-algebra");

    const osResults = searchItems("Deadlocks");
    expect(osResults.length).toBeGreaterThan(0);
    expect(osResults.some((r) => r.domain === "OS")).toBe(true);
  });

  it("supports category filtering", () => {
    const allResults = searchItems("Data", "all");
    const moduleResults = searchItems("Data", "module");
    const projectResults = searchItems("Data", "project");

    expect(moduleResults.every((r) => r.category === "module")).toBe(true);
    expect(projectResults.every((r) => r.category === "project")).toBe(true);
    expect(allResults.length).toBeGreaterThanOrEqual(moduleResults.length);
  });

  it("extracts text snippet centered around query words", () => {
    const text =
      "Operating systems manage hardware and software resources. The Banker's algorithm is a deadlock avoidance algorithm that tests for safety by simulating the allocation.";
    const snippet = extractSnippet(text, ["Banker's", "algorithm"], 80);

    expect(snippet.toLowerCase()).toContain("banker's");
    expect(snippet.length).toBeLessThanOrEqual(100);
  });

  it("returns empty array for whitespace query", () => {
    expect(searchItems("")).toEqual([]);
    expect(searchItems("   ")).toEqual([]);
  });

  it("indexes and searches engineering blogs and high-tech missions", () => {
    const aiResults = searchItems("OpenAI");
    expect(aiResults.length).toBeGreaterThan(0);
    expect(aiResults.some((r) => r.url === "/engineering-blogs")).toBe(true);

    const secResults = searchItems("PortSwigger");
    expect(secResults.length).toBeGreaterThan(0);
    expect(secResults.some((r) => r.url === "/engineering-blogs")).toBe(true);

    const ismResults = searchItems("Semiconductor Mission");
    expect(ismResults.length).toBeGreaterThan(0);
    expect(
      ismResults.some((r) => r.title.includes("India Semiconductor Mission")),
    ).toBe(true);
  });

  it("indexes and searches politics, student wings, and geopolitics dossiers", () => {
    const bjpResults = searchItems("Bharatiya Janata Party");
    expect(bjpResults.length).toBeGreaterThan(0);
    expect(bjpResults.some((r) => r.url === "/politics-and-geopolitics")).toBe(
      true,
    );

    const quadResults = searchItems("Quad");
    expect(quadResults.length).toBeGreaterThan(0);
    expect(quadResults.some((r) => r.url === "/politics-and-geopolitics")).toBe(
      true,
    );

    const abvpResults = searchItems("ABVP");
    expect(abvpResults.length).toBeGreaterThan(0);
    expect(abvpResults.some((r) => r.url === "/politics-and-geopolitics")).toBe(
      true,
    );

    const fcraResults = searchItems("FCRA");
    expect(fcraResults.length).toBeGreaterThan(0);
    expect(fcraResults.some((r) => r.url === "/politics-and-geopolitics")).toBe(
      true,
    );
  });
});
