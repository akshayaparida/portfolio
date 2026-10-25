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
    title: "better_AQI",
    date: "Oct 2026",
    description:
      "Hyper-local air quality intelligence, cleanest commute exposure planning, and automated health advisories built with AWS Strands Agents and Amazon Bedrock. Features CPCB 6-tier telemetry, real-time commute PM2.5 & cigarette equivalent exposure calculation, NASA FIRMS stubble fire plume tracking, and an indoor HEPA purifier CADR countdown timer.",
    tech: [
      "AWS Strands Agents",
      "Amazon Bedrock",
      "AWS Lambda",
      "SAM CLI",
      "LocalStack",
      "React",
      "Leaflet",
    ],
    links: [
      {
        label: "Live Demo",
        url: "https://youtu.be/mKXzqpP7C8E?si=HPnkO-XRKNUJv71U",
      },
      {
        label: "GitHub",
        url: "https://github.com/akshayaparida/better_AQI",
      },
    ],
    image: "/betteraqi.png",
  },
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
