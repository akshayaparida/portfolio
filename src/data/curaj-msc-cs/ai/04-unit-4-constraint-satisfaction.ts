import { LearningModule } from "@/types/learning";

export const unit4ConstraintSatisfactionModule: LearningModule = {
  id: "unit-4-constraint-satisfaction",
  title: "Unit 4: Constraint Satisfaction Problems (CSPs)",
  description:
    "CSPs, Constraint Networks, Binary and Non-binary Constraints, Consistency (Node, Arc, Path), Backtracking Search, and Constraint Propagation.",
  status: "not-started",
  tags: ["CURAJ MSc CS", "Core 1: 6.0CSC01"],
  detailedContent: `# Unit 4: Constraint Satisfaction Problems (CSPs)

> **CURAJ M.Sc. Computer Science — Course Code: 6.0CSC01 (Core 1, 4 Credits)**  
> **Syllabus Coverage**: Constraint networks, Variables, Domains, Constraints, Arc Consistency (AC-3), Backtracking search, MRV and Degree heuristics, Forward checking, and handling temporal/spatial constraints.

---

## Unit Topics Outline

1. **Formal Definition of CSP**:
   - Variables $X = \{X_1, \\dots, X_n\}$, Domains $D = \{D_1, \\dots, D_n\}$, Constraints $C = \{C_1, \\dots, C_m\}$.
2. **Constraint Propagation & Consistency**:
   - Node Consistency, Arc Consistency (AC-3 algorithm), Path Consistency, and $k$-Consistency.
3. **Backtracking Search for CSPs**:
   - Variable Selection: Minimum Remaining Values (MRV / Most Constrained Variable), Degree Heuristic.
   - Value Selection: Least Constraining Value (LCV).
   - Inference: Forward Checking, Maintaining Arc Consistency (MAC).
`,
};
