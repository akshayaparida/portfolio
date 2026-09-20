import {
  SearchIndexItem,
  SearchResultItem,
  SearchFilterOption,
} from "@/types/search";
import { LearningModule, SubModule } from "@/types/learning";
import { mathematicsModules } from "@/data/mathematics";
import { osModules } from "@/data/os";
import { dsaModules } from "@/data/dsa";
import { dataStructuresModules } from "@/data/data-structures";
import { cProgrammingModules } from "@/data/c-programming";
import { algorithmsModules } from "@/data/algorithms";
import { dbmsModules } from "@/data/dbms";
import { networksModules } from "@/data/networks";
import { awsModules } from "@/data/aws";
import { mlopsModules } from "@/data/mlops";
import { digitalFundamentalsModules } from "@/data/digital-fundamentals";
import { reasoningModules } from "@/data/reasoning";
import { learningModules } from "@/data/learningJourney";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { navigationLinks } from "@/data/navigationLinks";
import { engineeringBlogs } from "@/data/engineeringBlogs";
import {
  politicalParties,
  bilateralRelations,
  borderChallenges,
  studentWings,
  internalSecurityThreats,
} from "@/data/politicsAndGeopolitics";

/**
 * URL/anchor-friendly slug generator consistent with TableOfContents and ModuleViewer
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Strips markdown symbols for clean text searching
 */
export function cleanMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, " ") // remove code blocks
    .replace(/`([^`]+)`/g, "$1") // inline code
    .replace(/!\[.*?\]\(.*?\)/g, " ") // images
    .replace(/\[([^\]]+)\]\(.*?\)/g, "$1") // links
    .replace(/[#*_~>-]/g, " ") // headers, emphasis, blockquotes
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Extracts sections/subheadings from module detailed content markdown
 */
function extractSectionsFromMarkdown(
  markdown: string,
  basePath: string,
  domain: string,
  moduleTitle: string,
  icon: string,
): SearchIndexItem[] {
  const sections: SearchIndexItem[] = [];
  const lines = markdown.split("\n");
  let currentHeading = "";
  let currentContent: string[] = [];
  const slugCounts = new Map<string, number>();

  const flushSection = () => {
    if (currentHeading) {
      const cleanTitle = currentHeading.replace(/[*_`]/g, "").trim();
      const baseSlug = slugify(cleanTitle);
      const count = (slugCounts.get(baseSlug) || 0) + 1;
      slugCounts.set(baseSlug, count);
      const slug = count === 1 ? baseSlug : `${baseSlug}-${count}`;

      const textContent = cleanMarkdown(currentContent.join(" "));
      const snippet = textContent.slice(0, 180);

      sections.push({
        id: `${basePath}#${slug}`,
        title: cleanTitle,
        description: snippet || `Section in ${moduleTitle}`,
        content: textContent,
        category: "section",
        categoryLabel: "Section",
        domain,
        icon: icon || "fa-solid fa-file-lines",
        url: `${basePath}#${baseSlug}`,
        breadcrumb: `${domain} > ${moduleTitle} > ${cleanTitle}`,
        keywords: [domain, moduleTitle, cleanTitle],
      });
    }
    currentContent = [];
  };

  let inCodeBlock = false;
  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const headingMatch = line.match(/^#{2,4}\s+(.+)$/);
    if (headingMatch) {
      flushSection();
      currentHeading = headingMatch[1].trim();
    } else if (currentHeading) {
      currentContent.push(line);
    }
  }
  flushSection();

  return sections;
}

/**
 * Generates search items for a list of LearningModules
 */
function indexModuleCategory(
  modules: LearningModule[],
  basePath: string,
  domain: string,
  icon: string,
): SearchIndexItem[] {
  const items: SearchIndexItem[] = [];

  modules.forEach((mod, index) => {
    const modUrl = `${basePath}/${mod.id}`;
    const cleanBody = mod.detailedContent
      ? cleanMarkdown(mod.detailedContent)
      : "";

    // 1. Index the Module itself
    items.push({
      id: `${basePath}-${mod.id}`,
      title: mod.title,
      description: mod.description,
      content: `${mod.title} ${mod.description} ${cleanBody}`,
      category: "module",
      categoryLabel: "Module",
      domain,
      icon,
      url: modUrl,
      breadcrumb: `${domain} > Module ${index + 1}: ${mod.title}`,
      tags: mod.tags || [],
      keywords: [domain, mod.title, ...(mod.tags || []), ...(mod.skills || [])],
    });

    // 2. Index SubModules if any
    if (mod.subModules && mod.subModules.length > 0) {
      mod.subModules.forEach((sub: SubModule) => {
        const subClean = sub.detailedContent
          ? cleanMarkdown(sub.detailedContent)
          : "";
        items.push({
          id: `${modUrl}-${sub.id}`,
          title: sub.title,
          description: sub.description,
          content: `${sub.title} ${sub.description} ${subClean}`,
          category: "section",
          categoryLabel: "Subtopic",
          domain,
          icon,
          url: `${modUrl}#${slugify(sub.title)}`,
          breadcrumb: `${domain} > ${mod.title} > ${sub.title}`,
          keywords: [domain, mod.title, sub.title],
        });
      });
    }

    // 3. Index Practice Quiz if any
    if (mod.practiceQuiz && mod.practiceQuiz.length > 0) {
      items.push({
        id: `${modUrl}-practice-quiz`,
        title: `${mod.title} - Practice Quiz (${mod.practiceQuiz.length} Questions)`,
        description: `Test your knowledge on ${mod.title} with practice multiple choice & numerical questions.`,
        content: mod.practiceQuiz
          .map((q) => `${q.question} ${q.options.join(" ")} ${q.explanation}`)
          .join(" "),
        category: "quiz",
        categoryLabel: "Quiz",
        domain,
        icon: "fa-solid fa-circle-question",
        url: `${modUrl}#practice-quiz`,
        breadcrumb: `${domain} > ${mod.title} > Practice Quiz`,
        keywords: [domain, "Quiz", "MCQ", "Practice", mod.title],
      });
    }

    // 4. Index Detailed Content Headings & Deep Sections
    if (mod.detailedContent) {
      const sectionItems = extractSectionsFromMarkdown(
        mod.detailedContent,
        modUrl,
        domain,
        mod.title,
        icon,
      );
      items.push(...sectionItems);
    }
  });

  return items;
}

/**
 * Builds the complete unified search index of all topics, notes, projects, skills, and pages
 */
export function buildSearchIndex(): SearchIndexItem[] {
  const index: SearchIndexItem[] = [];

  // 1. Mathematics Modules
  index.push(
    ...indexModuleCategory(
      mathematicsModules,
      "/mathematics",
      "Mathematics",
      "fa-solid fa-calculator",
    ),
  );

  // 2. Core CS: Operating Systems
  index.push(
    ...indexModuleCategory(osModules, "/os", "OS", "fa-solid fa-laptop"),
  );

  // 3. Core CS: Data Structures & Algorithms
  index.push(
    ...indexModuleCategory(dsaModules, "/dsa", "DSA", "fa-solid fa-code"),
  );
  index.push(
    ...indexModuleCategory(
      cProgrammingModules,
      "/c-programming",
      "C Programming",
      "fa-solid fa-c",
    ),
  );
  index.push(
    ...indexModuleCategory(
      dataStructuresModules,
      "/data-structures",
      "Data Structures",
      "fa-solid fa-diagram-project",
    ),
  );
  index.push(
    ...indexModuleCategory(
      algorithmsModules,
      "/algorithms",
      "Algorithms",
      "fa-solid fa-code-branch",
    ),
  );

  // 4. Core CS: DBMS
  index.push(
    ...indexModuleCategory(
      dbmsModules,
      "/dbms",
      "DBMS",
      "fa-solid fa-database",
    ),
  );

  // 5. Core CS: Networks
  index.push(
    ...indexModuleCategory(
      networksModules,
      "/networks",
      "Networks",
      "fa-solid fa-network-wired",
    ),
  );

  // 6. Cloud: AWS
  index.push(
    ...indexModuleCategory(awsModules, "/aws", "AWS", "fa-solid fa-cloud"),
  );

  // 7. AI/ML: MLOps
  index.push(
    ...indexModuleCategory(
      mlopsModules,
      "/mlops",
      "MLOps",
      "fa-solid fa-gears",
    ),
  );

  // 8. Core CS: Digital Fundamentals
  index.push(
    ...indexModuleCategory(
      digitalFundamentalsModules,
      "/digital-fundamentals",
      "Digital Fundamentals",
      "fa-solid fa-microchip",
    ),
  );

  // 9. Reasoning & Aptitude
  index.push(
    ...indexModuleCategory(
      reasoningModules,
      "/reasoning",
      "Reasoning",
      "fa-solid fa-brain",
    ),
  );

  // 10. AI Engineering & Learning Journey Modules
  learningModules.forEach((mod, i) => {
    const cleanBody = mod.detailedContent
      ? cleanMarkdown(mod.detailedContent)
      : "";
    index.push({
      id: `ai-eng-${mod.id}`,
      title: mod.title,
      description: mod.description,
      content: `${mod.title} ${mod.description} ${cleanBody}`,
      category: "module",
      categoryLabel: "AI Engineering",
      domain: "AI Engineering",
      icon: "fa-solid fa-robot",
      url: "/ai-engineering",
      breadcrumb: `AI Engineering > Module ${i + 1}: ${mod.title}`,
      keywords: [
        "AI Engineering",
        "Machine Learning",
        mod.title,
        ...(mod.skills || []),
      ],
    });

    if (mod.subModules) {
      mod.subModules.forEach((sub) => {
        index.push({
          id: `ai-eng-${sub.id}`,
          title: sub.title,
          description: sub.description,
          content: `${sub.title} ${sub.description}`,
          category: "section",
          categoryLabel: "Subtopic",
          domain: "AI Engineering",
          icon: "fa-solid fa-robot",
          url: "/ai-engineering",
          breadcrumb: `AI Engineering > ${mod.title} > ${sub.title}`,
          keywords: ["AI Engineering", mod.title, sub.title],
        });
      });
    }
  });

  // 11. Projects
  projects.forEach((proj) => {
    index.push({
      id: `project-${slugify(proj.title)}`,
      title: proj.title,
      description: proj.description,
      content: `${proj.title} ${proj.description} Tech: ${proj.tech.join(" ")} Date: ${proj.date}`,
      category: "project",
      categoryLabel: "Project",
      domain: "Projects",
      icon: "fa-solid fa-folder-open",
      url: `/#projects`,
      breadcrumb: `Projects > ${proj.title}`,
      tags: proj.tech,
      keywords: ["Project", proj.title, ...proj.tech],
    });
  });

  // 12. Skills
  skillCategories.forEach((cat) => {
    const skillList = cat.skills.map((s) => s.name).join(", ");
    index.push({
      id: `skills-${slugify(cat.title)}`,
      title: `${cat.title} Skills`,
      description: skillList,
      content: `${cat.title} skills: ${skillList}`,
      category: "skill",
      categoryLabel: "Skill",
      domain: "Skills",
      icon: cat.icon || "fa-solid fa-wand-magic-sparkles",
      url: `/#skills`,
      breadcrumb: `Skills > ${cat.title}`,
      keywords: ["Skills", cat.title, ...cat.skills.map((s) => s.name)],
    });

    cat.skills.forEach((skill) => {
      index.push({
        id: `skill-${slugify(cat.title)}-${slugify(skill.name)}`,
        title: skill.name,
        description: `Proficiency in ${skill.name} (${cat.title})`,
        content: `${skill.name} ${cat.title}`,
        category: "skill",
        categoryLabel: "Skill",
        domain: "Skills",
        icon: cat.icon || "fa-solid fa-check",
        url: `/#skills`,
        breadcrumb: `Skills > ${cat.title} > ${skill.name}`,
        keywords: [skill.name, cat.title, "Skill"],
      });
    });
  });

  // 13. Curricula & Exams Pages
  const staticCurricula = [
    {
      title: "GATE Computer Science (GATE CS)",
      desc: "Complete GATE CS syllabus, subject weightages, key concepts (DSA, OS, DBMS, Networks, TOC, CD, COA, Math), and NPTEL course links.",
      url: "/gate-cs",
      domain: "GATE CS",
      icon: "fa-solid fa-book-bookmark",
      keywords: ["GATE", "GATE CS", "Computer Science", "NPTEL", "Syllabus"],
    },
    {
      title: "CURAJ MSc Computer Science (AI & ML)",
      desc: "Curriculum structure, semester-wise courses (AI, Advanced Algorithms, Machine Learning, Cloud Computing), credits, and syllabus.",
      url: "/curaj-msc-cs",
      domain: "CURAJ",
      icon: "fa-solid fa-graduation-cap",
      keywords: [
        "CURAJ",
        "MSc",
        "Computer Science",
        "Artificial Intelligence",
        "Central University of Rajasthan",
      ],
    },
    {
      title: "CURAJ MSc CS — Continuous Assessments & CIA Hub",
      desc: "Question papers, exam dates, syllabus units, and step-by-step verified solutions for Continuous Internal Assessments (CIA-1 & CIA-2).",
      url: "/curaj-msc-cs/assessments",
      domain: "CURAJ",
      icon: "fa-solid fa-file-signature",
      keywords: [
        "CURAJ",
        "CIA",
        "CIA 1",
        "CIA 2",
        "Python CIA",
        "6.0CSC03",
        "Question Paper",
        "Solutions",
        "Internal Assessment",
        "Advanced Python",
      ],
    },
    {
      title: "Advanced Python Programming CIA-1 Question Paper & Solutions",
      desc: "Official September 16, 2026 CIA-1 paper for 6.0CSC03 with complete code solutions: lists vs tuples, args, break/continue/pass, OOP, slicing, and inheritance.",
      url: "/curaj-msc-cs/assessments?course=6.0CSC03&id=sem1-python-cia1",
      domain: "CURAJ",
      icon: "fa-brands fa-python",
      keywords: [
        "Python CIA 1",
        "6.0CSC03",
        "CIA 1 Solutions",
        "CURAJ Python",
        "Palindrome",
        "Method Overriding",
        "Shape Rectangle",
      ],
    },
    {
      title: "CURAJ MSc CS — Artificial Intelligence (6.0CSC01) Notes",
      desc: "Comprehensive syllabus-aligned study notes and quizzes for Introduction to Artificial Intelligence at CURAJ: Uninformed Search, BFS, DFS, IDS, UCS, and CIA-1 exam prep.",
      url: "/curaj-msc-cs/ai",
      domain: "CURAJ",
      icon: "fa-solid fa-brain",
      keywords: [
        "CURAJ AI",
        "6.0CSC01",
        "Artificial Intelligence Notes",
        "Uninformed Search",
        "CIA-1 AI",
        "UGC NET AI",
        "Central University of Rajasthan",
      ],
    },
    {
      title:
        "CURAJ AI Unit 1: Introduction, Problem Solving & Uninformed Search",
      desc: "Complete Unit 1 master notes covering Turing Test, State vs Node, BFS, DFS, DLS, IDS, UCS, Bidirectional search, CIA-1 model answers, and 15+ interactive practice quiz questions.",
      url: "/curaj-msc-cs/ai/unit-1-uninformed-search",
      domain: "CURAJ",
      icon: "fa-solid fa-book-open-reader",
      keywords: [
        "CURAJ AI Unit 1",
        "Uninformed Search",
        "BFS",
        "DFS",
        "Iterative Deepening Search",
        "Uniform Cost Search",
        "State vs Node",
        "Turing Test",
        "Chinese Room",
        "CIA-1 Model Answers",
        "UGC NET JRF Quiz",
        "Rich and Knight AI",
        "Physical Symbol System Hypothesis",
        "PSSH",
        "Problem Characteristics",
        "Tic-Tac-Toe AI",
        "Production Systems",
        "Cryptarithmetic",
      ],
    },
    {
      title: "CURAJ MSc CS — Advanced Algorithms (6.0CSC02) Notes",
      desc: "Comprehensive syllabus-aligned study notes and quizzes for Advanced Algorithms at CURAJ: Asymptotic Analysis, Recurrence Relations, Master Theorem, Divide and Conquer in C, and CIA-1 exam solutions.",
      url: "/curaj-msc-cs/advanced-algorithms/unit-1-analysis-divide-conquer",
      domain: "CURAJ",
      icon: "fa-solid fa-code-merge",
      keywords: [
        "CURAJ Algorithms",
        "6.0CSC02",
        "CSC-404",
        "Advanced Algorithms Notes",
        "Divide and Conquer C",
        "Master Theorem",
        "CIA-1 Algorithms",
        "GATE CS Algorithms",
        "Central University of Rajasthan",
      ],
    },
    {
      title:
        "CURAJ Algorithms Unit 1: Analysis of Algorithms & Divide-and-Conquer (C Lang)",
      desc: "Complete Unit 1 master notes covering Asymptotic Notations (Big-O, Omega, Theta), Master Theorem, Substitution Method, Divide and Conquer (Binary Search, Merge Sort, QuickSort, Strassen Matrix) implemented in pure C, CIA-1 2024 model answers, and 20 practice quiz questions.",
      url: "/curaj-msc-cs/advanced-algorithms/unit-1-analysis-divide-conquer",
      domain: "CURAJ",
      icon: "fa-solid fa-laptop-code",
      keywords: [
        "CURAJ Algorithms Unit 1",
        "Asymptotic Analysis",
        "Master Method",
        "Big-O",
        "Big-Omega",
        "Big-Theta",
        "Binary Search C",
        "Merge Sort C",
        "QuickSort C",
        "Strassen Matrix Multiplication",
        "CLRS Algorithms",
        "Horowitz Sahni",
        "CIA-1 Model Answers",
        "Recurrence Relations",
        "Substitution Method",
      ],
    },
    {
      title: "UGC NET JRF Computer Science",
      desc: "UGC NET JRF Paper 1 & Paper 2 syllabus, unit breakdown, teaching/research aptitude, discrete structures, and study materials.",
      url: "/ugc-net-jrf",
      domain: "UGC NET JRF",
      icon: "fa-solid fa-award",
      keywords: ["UGC NET", "JRF", "Paper 1", "Paper 2", "Assistant Professor"],
    },
    {
      title: "Professional Communication",
      desc: "Workplace communication, technical writing, resume building, presentation skills, and professional email etiquette.",
      url: "/professional-communication",
      domain: "Communication",
      icon: "fa-solid fa-comments",
      keywords: [
        "Communication",
        "Professional",
        "Resume",
        "Interview",
        "Email",
      ],
    },
    {
      title: "Learning Journey Timeline",
      desc: "Milestones, learning roadmap, completed topics, hours logged, and ongoing technical growth.",
      url: "/learning-journey",
      domain: "Journey",
      icon: "fa-solid fa-book-open",
      keywords: ["Journey", "Roadmap", "Milestones", "Learning", "Progress"],
    },
  ];

  staticCurricula.forEach((curr) => {
    index.push({
      id: `curriculum-${slugify(curr.title)}`,
      title: curr.title,
      description: curr.desc,
      content: `${curr.title} ${curr.desc}`,
      category: "curriculum",
      categoryLabel: "Curriculum",
      domain: curr.domain,
      icon: curr.icon,
      url: curr.url,
      breadcrumb: `Curriculum > ${curr.title}`,
      keywords: curr.keywords,
    });
  });

  // 14. Engineering Blogs & Deep Tech Publications
  engineeringBlogs.forEach((blog) => {
    const articleTitles = blog.featuredArticles
      ? blog.featuredArticles.map((a) => a.title).join(" ")
      : "";
    index.push({
      id: `eng-blog-${blog.id}`,
      title: blog.title,
      description: blog.description,
      content: `${blog.title} ${blog.organization} ${blog.description} ${blog.tags.join(" ")} ${articleTitles}`,
      category: "page",
      categoryLabel: blog.categoryLabel,
      domain: blog.categoryLabel,
      icon: blog.icon || "fa-solid fa-newspaper",
      url: `/engineering-blogs`,
      breadcrumb: `Engineering Blogs > ${blog.categoryLabel} > ${blog.title}`,
      tags: blog.tags,
      keywords: [
        "Engineering Blog",
        "Deep Tech",
        blog.title,
        blog.organization,
        blog.categoryLabel,
        ...blog.tags,
        ...(blog.isIndiaTech
          ? ["India Tech", "ISRO", "DRDO", "Make In India"]
          : []),
        ...(blog.isGovtScheme
          ? ["Government Scheme", "National Mission", "MeitY", "DST"]
          : []),
      ],
    });
  });

  // 15. Politics & Geopolitics: Political Parties
  politicalParties.forEach((party) => {
    index.push({
      id: `party-${party.id}`,
      title: `${party.name} (${party.abbreviation})`,
      description: `${party.categoryLabel} • Alliance: ${party.alliance} • Leader: ${party.currentLeader}`,
      content: `${party.corePhilosophy} ${party.economicVision} ${party.foreignPolicyStance}`,
      category: "section",
      categoryLabel: "Political Party",
      domain: "Politics & Geopolitics",
      icon: "fa-solid fa-landmark",
      url: `/politics-and-geopolitics`,
      breadcrumb: `Politics > Parties > ${party.name}`,
      tags: party.coreIdeologies,
      keywords: [
        party.name,
        party.abbreviation,
        party.alliance,
        party.currentLeader,
        ...party.coreIdeologies,
        party.primaryBase,
      ],
    });
  });

  // 16. Politics & Geopolitics: Bilateral Relations
  bilateralRelations.forEach((rel) => {
    index.push({
      id: `bilateral-${rel.id}`,
      title: `India–${rel.country} Relations (${rel.partnershipTitle})`,
      description: rel.executiveSummary,
      content: `${rel.executiveSummary} ${rel.keyStrategicConvergences.join(" ")} ${rel.frictionPointsAndChallenges.join(" ")}`,
      category: "section",
      categoryLabel: "Geopolitics",
      domain: "Politics & Geopolitics",
      icon: "fa-solid fa-earth-americas",
      url: `/politics-and-geopolitics`,
      breadcrumb: `Geopolitics > Bilateral > India–${rel.country}`,
      tags: ["Foreign Policy", "Geopolitics", rel.country],
      keywords: [
        rel.country,
        rel.partnershipTitle,
        "Foreign Policy",
        "Geopolitics",
        ...rel.keyStrategicConvergences,
      ],
    });
  });

  // 17. Politics & Geopolitics: Border Frontiers
  borderChallenges.forEach((border) => {
    index.push({
      id: `border-${border.id}`,
      title: `${border.borderName} (${border.front})`,
      description: border.strategicSignificance,
      content: `${border.strategicSignificance} ${border.majorFlashpointsAndChallenges.join(" ")} ${border.infrastructureAndDefensiveMeasures.join(" ")}`,
      category: "section",
      categoryLabel: "Border Security",
      domain: "Politics & Geopolitics",
      icon: "fa-solid fa-shield-halved",
      url: `/politics-and-geopolitics`,
      breadcrumb: `National Security > Frontiers > ${border.borderName}`,
      tags: ["Border Security", "National Defense", border.front],
      keywords: [
        border.borderName,
        border.counterpartCountry,
        "LAC",
        "LoC",
        "National Defense",
        ...border.keySectors,
      ],
    });
  });

  // 18. Politics & Geopolitics: Student Wings
  studentWings.forEach((wing) => {
    index.push({
      id: `student-wing-${wing.id}`,
      title: `${wing.name} (${wing.abbreviation})`,
      description: `${wing.ideologicalStance} • ${wing.parentPartyOrIdeology}`,
      content: `${wing.description} ${wing.coreIssues.join(" ")}`,
      category: "section",
      categoryLabel: "Student Politics",
      domain: "Politics & Geopolitics",
      icon: "fa-solid fa-graduation-cap",
      url: `/politics-and-geopolitics`,
      breadcrumb: `Politics > Student Wings > ${wing.name}`,
      tags: ["Student Politics", wing.abbreviation],
      keywords: [
        wing.name,
        wing.abbreviation,
        wing.parentPartyOrIdeology,
        ...wing.keyCampusHubs,
      ],
    });
  });

  // 19. Politics & Geopolitics: Internal Security & FCRA
  internalSecurityThreats.forEach((threat) => {
    index.push({
      id: `security-${threat.id}`,
      title: threat.title,
      description: threat.threatDescription,
      content: `${threat.threatDescription} ${threat.mechanismsAndVectors.join(" ")} ${threat.regulatoryAndLegalFramework.join(" ")}`,
      category: "section",
      categoryLabel: "Internal Security",
      domain: "Politics & Geopolitics",
      icon: "fa-solid fa-lock",
      url: `/politics-and-geopolitics`,
      breadcrumb: `National Security > Internal > ${threat.title}`,
      tags: ["Internal Security", "FCRA", "UAPA"],
      keywords: [
        threat.title,
        "FCRA",
        "UAPA",
        "Terror Financing",
        "PFI Ban",
        ...threat.enforcementAgencies,
      ],
    });
  });

  // 20. Top Navigation Links
  navigationLinks.forEach((nav) => {
    if (!index.some((item) => item.url === nav.href)) {
      index.push({
        id: `nav-${slugify(nav.label)}`,
        title: nav.label,
        description: `Navigate to ${nav.label}`,
        content: nav.label,
        category: "page",
        categoryLabel: "Page",
        domain: "Navigation",
        icon: nav.icon || "fa-solid fa-link",
        url: nav.href,
        breadcrumb: `Home > ${nav.label}`,
        keywords: [nav.label],
      });
    }
  });

  return index;
}

// Global cached index instance
let cachedIndex: SearchIndexItem[] | null = null;

export function getSearchIndex(): SearchIndexItem[] {
  if (!cachedIndex) {
    cachedIndex = buildSearchIndex();
  }
  return cachedIndex;
}

/**
 * Extracts a snippet from text centered around matched search words
 */
export function extractSnippet(
  text: string,
  queryWords: string[],
  maxLength = 140,
): string {
  if (!text || queryWords.length === 0) return "";

  const lowerText = text.toLowerCase();
  let firstMatchIndex = -1;

  for (const word of queryWords) {
    const idx = lowerText.indexOf(word.toLowerCase());
    if (idx !== -1 && (firstMatchIndex === -1 || idx < firstMatchIndex)) {
      firstMatchIndex = idx;
    }
  }

  if (firstMatchIndex === -1) {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }

  const start = Math.max(0, firstMatchIndex - Math.floor(maxLength / 3));
  const end = Math.min(text.length, start + maxLength);
  let snippet = text.slice(start, end).trim();

  if (start > 0) snippet = "..." + snippet;
  if (end < text.length) snippet = snippet + "...";

  return snippet;
}

/**
 * Performs fast fuzzy keyword search over the search index
 */
export function searchItems(
  query: string,
  categoryFilter: SearchFilterOption = "all",
  limit = 20,
): SearchResultItem[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const index = getSearchIndex();
  const queryTokens = trimmed.split(/\s+/).filter(Boolean);

  const results: SearchResultItem[] = [];

  for (const item of index) {
    // Check category filter
    if (categoryFilter !== "all" && item.category !== categoryFilter) {
      continue;
    }

    const titleLower = item.title.toLowerCase();
    const descLower = item.description.toLowerCase();
    const contentLower = item.content.toLowerCase();
    const domainLower = item.domain.toLowerCase();
    const keywordsLower = (item.keywords || []).map((k) => k.toLowerCase());
    const tagsLower = (item.tags || []).map((t) => t.toLowerCase());

    let score = 0;

    // Exact title match (highest)
    if (titleLower === trimmed) {
      score += 120;
    } else if (titleLower.startsWith(trimmed)) {
      score += 80;
    } else if (titleLower.includes(trimmed)) {
      score += 50;
    }

    // Domain / Subject match
    if (domainLower.includes(trimmed)) {
      score += 35;
    }

    // Tag / Keyword matches
    if (
      tagsLower.some((t) => t.includes(trimmed)) ||
      keywordsLower.some((k) => k.includes(trimmed))
    ) {
      score += 30;
    }

    // Check individual query tokens
    let matchedTokensCount = 0;
    for (const token of queryTokens) {
      let tokenFound = false;

      if (titleLower.includes(token)) {
        score += 25;
        tokenFound = true;
      }
      if (domainLower.includes(token)) {
        score += 15;
        tokenFound = true;
      }
      if (keywordsLower.some((k) => k.includes(token))) {
        score += 15;
        tokenFound = true;
      }
      if (descLower.includes(token)) {
        score += 10;
        tokenFound = true;
      }
      if (contentLower.includes(token)) {
        score += 5;
        tokenFound = true;
      }

      if (tokenFound) {
        matchedTokensCount++;
      }
    }

    // Must match all tokens (or at least 80% of tokens for long queries)
    const requiredTokens =
      queryTokens.length <= 2
        ? queryTokens.length
        : Math.ceil(queryTokens.length * 0.7);
    if (matchedTokensCount >= requiredTokens && score > 0) {
      // Prioritize modules and sections slightly over raw skill words if scores are equal
      if (item.category === "module") score += 5;
      if (item.category === "section") score += 3;

      const snippet = extractSnippet(
        item.content || item.description,
        queryTokens,
      );

      results.push({
        ...item,
        score,
        matchSnippet: snippet,
      });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, limit);
}
