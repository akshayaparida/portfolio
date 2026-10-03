import { LearningModule } from "@/types/learning";
import { discreteMathWeek1Module } from "./discrete-math-week-1";
import { discreteMathWeek2Module } from "./discrete-math-week-2";

export const discreteMathModule: LearningModule = {
  id: "discrete-math",
  title: "Discrete Mathematics (Weeks 1 & 2)",
  description:
    "Complete NPTEL & GATE CS Discrete Mathematics: Week 1 (Combinatorics, Catalan Numbers, Dyck Paths, Recurrences, LIFO Stacks) and Week 2 (Set Theory, Venn Diagrams, Inclusion-Exclusion, 20 Topics).",
  status: "completed",
  tags: [
    "Discrete Mathematics",
    "NPTEL",
    "Combinatorics",
    "Set Theory",
    "Venn Diagrams",
    "Inclusion-Exclusion",
    "Catalan Numbers",
    "Permutations",
    "Combinations",
    "Power Sets",
  ],
  detailedContent: discreteMathWeek1Module.detailedContent,
  subModules: [
    ...(discreteMathWeek1Module.subModules || []),
    ...(discreteMathWeek2Module.subModules || []),
  ],
  practiceQuiz: [
    ...(discreteMathWeek1Module.practiceQuiz || []),
    ...(discreteMathWeek2Module.practiceQuiz || []),
  ],
};

export { discreteMathWeek1Module, discreteMathWeek2Module };
