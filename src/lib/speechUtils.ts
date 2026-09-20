/**
 * Utility functions to parse and transform technical Markdown and LaTeX
 * into natural, fluent spoken English for the Web Speech API.
 */

/**
 * Maps common LaTeX mathematical symbols and constructs to natural spoken words.
 */
function translateLatexToSpeech(latex: string): string {
  let text = latex;

  // Fractions: \frac{a}{b} -> "a over b"
  text = text.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, "$1 over $2");

  // Square roots: \sqrt{x} -> "square root of x"
  text = text.replace(/\\sqrt\{([^{}]+)\}/g, "square root of $1");

  // Logarithms: \log_b a -> "log base b of a", \log a -> "log of a"
  text = text.replace(
    /\\log_([a-zA-Z0-9]+)\s*\{?([^{}\s]+)\}?/g,
    "log base $1 of $2",
  );
  text = text.replace(/\\log\s*\{?([^{}\s]+)\}?/g, "log of $1");
  text = text.replace(/\\ln\s*\{?([^{}\s]+)\}?/g, "natural log of $1");

  // Asymptotic complexity symbols
  text = text.replace(/\\Theta\s*\(([^)]+)\)/g, "Theta of $1");
  text = text.replace(/\\Theta/g, "Theta");
  text = text.replace(/\\Omega\s*\(([^)]+)\)/g, "Big Omega of $1");
  text = text.replace(/\\Omega/g, "Big Omega");
  text = text.replace(/\\omega\s*\(([^)]+)\)/g, "Little omega of $1");
  text = text.replace(/\\omega/g, "Little omega");
  text = text.replace(/O\s*\(([^)]+)\)/g, "Big O of $1");
  text = text.replace(/o\s*\(([^)]+)\)/g, "Little o of $1");

  // Summations and products
  text = text.replace(
    /\\sum_\{([^}]+)\}\^\{([^}]+)\}/g,
    "summation from $1 to $2 of ",
  );
  text = text.replace(/\\sum/g, "summation of ");

  // Floor, ceiling, parentheses
  text = text.replace(/\\lfloor\s*([^\\|]+?)\s*\\rfloor/g, "floor of $1");
  text = text.replace(/\\lceil\s*([^\\|]+?)\s*\\rceil/g, "ceiling of $1");
  text = text.replace(/\\left[([{|.]/g, "");
  text = text.replace(/\\right[)\]}|.]/g, "");

  // Exponents: n^2 -> "n squared", n^3 -> "n cubed", n^{k} -> "n to the power k"
  text = text.replace(/([a-zA-Z0-9]+)\^2\b/g, "$1 squared");
  text = text.replace(/([a-zA-Z0-9]+)\^3\b/g, "$1 cubed");
  text = text.replace(/([a-zA-Z0-9]+)\^\{([^}]+)\}/g, "$1 to the power $2");
  text = text.replace(/([a-zA-Z0-9]+)\^([a-zA-Z0-9]+)/g, "$1 to the power $2");

  // Subscripts: n_0 -> "n naught" or "n zero", a_i -> "a sub i"
  text = text.replace(/([a-zA-Z])_0\b/g, "$1 naught");
  text = text.replace(/([a-zA-Z])_([a-zA-Z0-9]+)\b/g, "$1 sub $2");
  text = text.replace(/([a-zA-Z])_\{([^}]+)\}/g, "$1 sub $2");

  // Operators and relational symbols
  text = text.replace(/\\le|\\leq/g, " is less than or equal to ");
  text = text.replace(/\\ge|\\geq/g, " is greater than or equal to ");
  text = text.replace(/\\approx/g, " is approximately ");
  text = text.replace(/\\ne|\\neq/g, " is not equal to ");
  text = text.replace(/\\times|\\cdot/g, " times ");
  text = text.replace(/\\pm/g, " plus or minus ");
  text = text.replace(/\\to|\\rightarrow/g, " approaches ");
  text = text.replace(/\\implies/g, " which implies that ");
  text = text.replace(/\\iff/g, " if and only if ");
  text = text.replace(/\\in/g, " in ");
  text = text.replace(/\\forall/g, " for all ");
  text = text.replace(/\\exists/g, " there exists ");

  // Greek letters
  text = text.replace(/\\epsilon/g, "epsilon");
  text = text.replace(/\\alpha/g, "alpha");
  text = text.replace(/\\beta/g, "beta");
  text = text.replace(/\\gamma/g, "gamma");
  text = text.replace(/\\delta/g, "delta");
  text = text.replace(/\\lambda/g, "lambda");
  text = text.replace(/\\pi/g, "pi");
  text = text.replace(/\\infty/g, "infinity");

  // Text inside math: \text{if } -> "if "
  text = text.replace(/\\text\{([^}]+)\}/g, " $1 ");

  // Clean remaining backslashes and LaTeX formatting commands
  text = text.replace(/\\begin\{[^}]+\}/g, " ");
  text = text.replace(/\\end\{[^}]+\}/g, " ");
  text = text.replace(/\\quad|\\qquad|\\;|\\,|\\!/g, " ");
  text = text.replace(/\\mathbf\{([^}]+)\}/g, "$1");
  text = text.replace(/\\math[a-zA-Z]+\{([^}]+)\}/g, "$1");
  text = text.replace(/\\[a-zA-Z]+/g, " ");
  text = text.replace(/[{}]/g, "");

  return text;
}

/**
 * Cleans a markdown document into a sequence of natural, bite-sized spoken phrases.
 * Each chunk is typically 80-250 characters (1-2 sentences) to prevent the known
 * browser Web Speech API 15-second utterance pause/hang bug.
 */
export function cleanMarkdownForSpeech(markdown: string): string[] {
  if (!markdown || !markdown.trim()) return [];

  const chunks: string[] = [];
  const lines = markdown.split("\n");
  let inCodeBlock = false;
  let codeBlockLang = "";
  let inVideoBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (!rawLine) continue;

    // Handle ```video ... ``` custom blocks
    if (rawLine.startsWith("```video")) {
      inVideoBlock = true;
      continue;
    }
    if (inVideoBlock) {
      if (rawLine.startsWith("```")) {
        inVideoBlock = false;
      }
      continue;
    }

    // Handle code blocks ```c ... ```
    if (rawLine.startsWith("```")) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLang = rawLine.replace(/```/, "").trim() || "code";
        // Speak a concise notice about the code block
        const langName = codeBlockLang.toLowerCase().includes("c")
          ? "C language"
          : codeBlockLang;
        chunks.push(
          `Code implementation in ${langName} is provided here. Refer to the code editor on screen.`,
        );
      } else {
        inCodeBlock = false;
      }
      continue;
    }

    // Skip code block internal lines (do not pronounce raw brackets and semicolons)
    if (inCodeBlock) {
      continue;
    }

    // Skip markdown image tags: ![Alt text](url)
    if (/^!\[.*?\]\(.*?\)/.test(rawLine)) {
      continue;
    }

    // Process Headings:
    // "# Heading" -> "Heading."
    let line = rawLine;
    if (/^#{1,6}\s+/.test(line)) {
      const headingText = line
        .replace(/^#{1,6}\s+/, "")
        .replace(/[*_`]/g, "")
        .trim();
      // Remove emojis or icons if any
      const cleanHeading = headingText.replace(/^[^\w\s]+\s*/, "").trim();
      if (cleanHeading) {
        chunks.push(`${cleanHeading}.`);
      }
      continue;
    }

    // Handle blockquotes / callout alerts
    if (line.startsWith(">")) {
      line = line.replace(/^>\s*/, "");
      // Clean alert tags like [!IMPORTANT], [!TIP], [!NOTE]
      line = line.replace(
        /\[!(?:TIP|NOTE|WARNING|CAUTION|IMPORTANT)\]\s*/i,
        "",
      );
    }

    // Skip divider lines
    if (/^[-*_]{3,}$/.test(line)) {
      continue;
    }

    // Handle Markdown Tables: summarize or read cleanly
    if (line.startsWith("|") && line.endsWith("|")) {
      // If it's a separator line |---|:---:|, skip it
      if (/^\|[\s\-:|]+\|$/.test(line)) {
        continue;
      }
      // Read table row items separated by commas
      const cells = line
        .split("|")
        .map((c) => c.trim())
        .filter((c) => c.length > 0);
      if (cells.length > 0) {
        line = cells.join(", ");
      }
    }

    // Translate block math: $$ ... $$
    line = line.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
      return " " + translateLatexToSpeech(math) + " ";
    });

    // Translate inline math: $ ... $
    line = line.replace(/\$([^$]+?)\$/g, (_, math) => {
      return " " + translateLatexToSpeech(math) + " ";
    });

    // Clean Markdown formatting:
    // Links: [Text](url) -> Text
    line = line.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    // Bold / Italics: **text**, *text*, __text__, _text_
    line = line.replace(/(\*\*|__)(.*?)\1/g, "$2");
    line = line.replace(/(\*|_)(.*?)\1/g, "$2");
    // Inline code: `code`
    line = line.replace(/`([^`]+)`/g, "$1");
    // Bullet lists: - item or * item or 1. item
    line = line.replace(/^(\*|-|\+|\d+\.)\s+/, "");

    // Clean extra whitespace
    line = line.replace(/\s+/g, " ").trim();

    if (!line) continue;

    // Split long lines into natural sentence / clause chunks (< 200 chars)
    const sentences = splitIntoSpeechSentences(line);
    for (const sentence of sentences) {
      if (sentence && sentence.length > 0) {
        chunks.push(sentence);
      }
    }
  }

  return chunks;
}

/**
 * Splits a text into natural sentence-level chunks suitable for smooth speech synthesis.
 */
function splitIntoSpeechSentences(text: string): string[] {
  // Split on sentence terminators (. ? !) while keeping the punctuation
  const rawSentences = text.match(/[^.!?]+[.!?]*/g) || [text];
  const result: string[] = [];

  for (let s of rawSentences) {
    s = s.trim();
    if (!s) continue;

    // If a sentence is very long (> 220 chars), break it at semicolons, colons, or commas
    if (s.length > 220) {
      const parts = s.split(/([;:,]\s+)/);
      let current = "";
      for (const part of parts) {
        if ((current + part).length > 220 && current.length > 0) {
          result.push(current.trim());
          current = part;
        } else {
          current += part;
        }
      }
      if (current.trim()) {
        result.push(current.trim());
      }
    } else {
      result.push(s);
    }
  }

  return result;
}

/**
 * Extracts a specific section from markdown based on its heading.
 */
export function extractSectionForSpeech(
  markdown: string,
  sectionHeading: string,
): string[] {
  if (!markdown || !sectionHeading) return [];

  const lines = markdown.split("\n");
  const normalizedTarget = sectionHeading
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .trim();
  let capturing = false;
  const sectionLines: string[] = [];
  let captureLevel = 2;

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const title = headingMatch[2]
        .replace(/[*_`]/g, "")
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .trim();

      if (!capturing) {
        if (
          title.includes(normalizedTarget) ||
          normalizedTarget.includes(title)
        ) {
          capturing = true;
          captureLevel = level;
          sectionLines.push(line);
        }
      } else {
        // If we hit another heading of same or higher level, stop capturing
        if (level <= captureLevel) {
          break;
        }
        sectionLines.push(line);
      }
    } else if (capturing) {
      sectionLines.push(line);
    }
  }

  return cleanMarkdownForSpeech(sectionLines.join("\n"));
}
