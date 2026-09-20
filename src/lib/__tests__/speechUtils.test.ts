import {
  cleanMarkdownForSpeech,
  extractSectionForSpeech,
} from "@/lib/speechUtils";

describe("speechUtils", () => {
  describe("cleanMarkdownForSpeech", () => {
    it("returns empty array for empty or whitespace string", () => {
      expect(cleanMarkdownForSpeech("")).toEqual([]);
      expect(cleanMarkdownForSpeech("   \n\n  ")).toEqual([]);
    });

    it("cleans basic markdown headers and paragraphs", () => {
      const md = `
# Unit 1: Foundations
This is an introductory lesson on algorithm design.
      `;
      const chunks = cleanMarkdownForSpeech(md);
      expect(chunks.length).toBeGreaterThanOrEqual(2);
      expect(chunks[0]).toBe("Unit 1: Foundations.");
      expect(chunks[1]).toBe(
        "This is an introductory lesson on algorithm design.",
      );
    });

    it("translates LaTeX math formulas to natural spoken words", () => {
      const md = `
The running time of Merge Sort is $\\Theta(n \\log n)$.
Binary search requires $O(\\log n)$ time and $O(1)$ space.
Fractional knapsack solves $\\frac{a}{b}$ items where $x \\le y$.
      `;
      const chunks = cleanMarkdownForSpeech(md);
      const fullSpeech = chunks.join(" ");

      expect(fullSpeech).toContain("Theta of n log of n");
      expect(fullSpeech).toContain("Big O of log of n");
      expect(fullSpeech).toContain("Big O of 1");
      expect(fullSpeech).toContain("a over b");
      expect(fullSpeech).toContain("is less than or equal to");
    });

    it("summarizes code blocks instead of pronouncing raw code syntax", () => {
      const md = `
Here is the implementation:
\`\`\`c
int main() {
    printf("Hello World\\n");
    return 0;
}
\`\`\`
Follow the logic carefully.
      `;
      const chunks = cleanMarkdownForSpeech(md);
      const fullSpeech = chunks.join(" ");

      expect(fullSpeech).toContain(
        "Code implementation in C language is provided here",
      );
      expect(fullSpeech).not.toContain("printf");
      expect(fullSpeech).not.toContain("return 0;");
      expect(fullSpeech).toContain("Follow the logic carefully.");
    });

    it("skips markdown image tags and cleans links", () => {
      const md = `
![Paper Question](/paper.jpg)
Visit [Abdul Bari Lectures](https://youtube.com) for full videos.
      `;
      const chunks = cleanMarkdownForSpeech(md);
      const fullSpeech = chunks.join(" ");

      expect(fullSpeech).not.toContain("/paper.jpg");
      expect(fullSpeech).toContain(
        "Visit Abdul Bari Lectures for full videos.",
      );
    });

    it("handles blockquotes and callout alerts cleanly", () => {
      const md = `
> [!IMPORTANT]
> The Master Method does not apply when there is a polynomial gap.
      `;
      const chunks = cleanMarkdownForSpeech(md);
      const fullSpeech = chunks.join(" ");

      expect(fullSpeech).toContain(
        "The Master Method does not apply when there is a polynomial gap.",
      );
      expect(fullSpeech).not.toContain("[!IMPORTANT]");
    });
  });

  describe("extractSectionForSpeech", () => {
    const sampleDoc = `
# Master Algorithms

## Section 1: Foundations
This is the foundations text. It has two sentences.

## Section 2: Recurrences
Here we discuss Master Theorem. It solves divide and conquer equations.

## Section 3: Sorting
QuickSort is an in-place sorting algorithm.
    `;

    it("extracts only the requested section", () => {
      const chunks = extractSectionForSpeech(sampleDoc, "Recurrences");
      const fullSpeech = chunks.join(" ");

      expect(fullSpeech).toContain("Recurrences.");
      expect(fullSpeech).toContain("Here we discuss Master Theorem.");
      expect(fullSpeech).not.toContain("Foundations");
      expect(fullSpeech).not.toContain("QuickSort");
    });

    it("returns empty array if section is not found", () => {
      const chunks = extractSectionForSpeech(sampleDoc, "Nonexistent Section");
      expect(chunks).toEqual([]);
    });
  });
});
