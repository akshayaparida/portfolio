import { SkillCategory } from "@/types/portfolio";

export const skillCategories: SkillCategory[] = [
  {
    title: "Machine Learning",
    icon: "fa-solid fa-brain",
    skills: [
      { name: "TensorFlow" },
      { name: "Scikit-learn" },
      { name: "OpenCV" },
      { name: "Spark" },
    ],
  },
  {
    title: "GenAI & LLMs",
    icon: "fa-solid fa-robot",
    skills: [
      { name: "LangChain" },
      { name: "LlamaIndex" },
      { name: "RAG" },
      { name: "Transformers" },
    ],
  },
  {
    title: "Languages",
    icon: "fa-solid fa-code",
    skills: [
      { name: "Python" },
      { name: "TypeScript" },
      { name: "C++" },
      { name: "SQL" },
    ],
  },
  {
    title: "Tools & Deployment",
    icon: "fa-solid fa-server",
    skills: [
      { name: "AWS" },
      { name: "Docker" },
      { name: "Git" },
      { name: "Linux" },
    ],
  },
];
