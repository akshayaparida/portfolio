import { SkillCategory } from "@/types/portfolio";

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: "fa-solid fa-code",
    skills: [
      { name: "TypeScript" },
      { name: "Python" },
      { name: "Golang" },
      { name: "JavaScript" },
    ],
  },
  {
    title: "AI Eng",
    icon: "fa-solid fa-brain",
    skills: [
      { name: "PyTorch" },
      { name: "Pandas" },
      { name: "NumPy" },
      { name: "LangChain" },
      { name: "LangGraph" },
      { name: "HuggingFace" },
      { name: "MLflow" },
      { name: "Ollama" },
      { name: "Docling" },
    ],
  },
  {
    title: "Web & Database",
    icon: "fa-solid fa-globe",
    skills: [{ name: "React.js" }, { name: "MongoDB" }, { name: "PostgreSQL" }],
  },
  {
    title: "Tools & MLOps",
    icon: "fa-solid fa-server",
    skills: [
      { name: "Docker" },
      { name: "Git" },
      { name: "AWS" },
      { name: "DVC" },
      { name: "uv" },
    ],
  },
  {
    title: "AI Dev Tools",
    icon: "fa-solid fa-wand-magic-sparkles",
    skills: [
      { name: "Antigravity" },
      { name: "Zed" },
      { name: "Warp" },
      { name: "Gemini CLI" },
      { name: "Qwen Code CLI" },
      { name: "Google Stitch" },
    ],
  },
];
