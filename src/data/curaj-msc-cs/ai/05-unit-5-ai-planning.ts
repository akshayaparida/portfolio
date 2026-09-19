import { LearningModule } from "@/types/learning";

export const unit5AIPlanningModule: LearningModule = {
  id: "unit-5-ai-planning",
  title: "Unit 5: AI Planning & GraphPlan",
  description:
    "Domain-Independent Planning, PDDL Syntax, Forward vs Backward State-Space Search, Planning Graphs, and GraphPlan Algorithm.",
  status: "not-started",
  tags: ["CURAJ MSc CS", "Core 1: 6.0CSC01"],
  detailedContent: `# Unit 5: AI Planning & GraphPlan

> **CURAJ M.Sc. Computer Science — Course Code: 6.0CSC01 (Core 1, 4 Credits)**  
> **Syllabus Coverage**: PDDL (Planning Domain Definition Language), Domain descriptions, Preconditions and Effects, Forward search (Progression), Backward search (Regression), Planning Graph, Mutual Exclusion (Mutex) relations, and GraphPlan algorithm.

---

## Unit Topics Outline

1. **Planning Domain Definition Language (PDDL)**:
   - State representation via fluents (first-order logic ground literals).
   - Actions with \`Precondition\` and \`Effect\` lists (Add-list and Delete-list).
2. **State-Space Planning Approaches**:
   - Forward State-Space Search (Progression Planning).
   - Backward Search (Regression Planning / Goal-directed).
3. **Planning Graphs & GraphPlan**:
   - Alternating levels of propositions ($P_i$) and actions ($A_i$).
   - Mutual Exclusion (Mutex) relations: Inconsistent Effects, Interference, Competing Needs, Inconsistent Support.
`,
};
