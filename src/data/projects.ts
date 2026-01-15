export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  date: string;
  description: string;
  tech: string[];
  links: ProjectLink[];
  image: string;
}

export const projects: Project[] = [
  {
    title: "Bengaluru Infra AI Reporter",
    date: "Oct 2025",
    description:
      "A production-ready, full-stack platform enabling Bengaluru citizens to report infrastructure issues (potholes, garbage, water leaks, broken streetlights) with GPS + photo evidence. Features AI classification via Cerebras LLaMA, automated email notifications to authorities, and an intelligent Twitter bot for civic engagement.",
    tech: ["Next.js", "TypeScript", "Cerebras LLaMA", "Docker", "PostgreSQL"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/akshayaparida/bengaluru-infra-aiagent",
      },
    ],
    image: "/bengaluru-infra.png",
  },
  {
    title: "GitHub Contribution Tracker",
    date: "Feb 14, 2025",
    description:
      "This project allows you to track the open/closed issues and pull requests (PRs) for any GitHub user. Visualize your open source impact with clean, interactive charts.",
    tech: ["Reactjs", "Nextjs", "TailwindCSS"],
    links: [
      {
        label: "Live Demo",
        url: "https://github-contribution-tracker.vercel.app",
      },
      {
        label: "GitHub",
        url: "https://github.com/akshayaparida/github-contribution-tracker",
      },
    ],
    image: "/githubtracker.png",
  },
];
