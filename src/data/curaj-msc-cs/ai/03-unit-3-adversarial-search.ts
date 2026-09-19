import { LearningModule } from "@/types/learning";

export const unit3AdversarialSearchModule: LearningModule = {
  id: "unit-3-adversarial-search",
  title: "Unit 3: Adversarial Search & Game Playing",
  description:
    "Game Playing, Minimax Algorithm, Alpha-Beta Pruning, Evaluation Functions, Partially Observable Games, and Stochastic Games.",
  status: "not-started",
  tags: ["CURAJ MSc CS", "Core 1: 6.0CSC01"],
  detailedContent: `# Unit 3: Adversarial Search & Game Playing

> **CURAJ M.Sc. Computer Science — Course Code: 6.0CSC01 (Core 1, 4 Credits)**  
> **Syllabus Coverage**: Deterministic zero-sum games, Minimax algorithm, Alpha-Beta pruning, Move ordering, Evaluation functions, Quiescence search, Horizon effect, Stochastic games (Expectiminimax), and Partially observable games.

---

## Unit Topics Outline

1. **Game Theory & Formalization**:
   - Zero-sum, deterministic, perfect information 2-player games ($S_0$, $Player(s)$, $Actions(s)$, $Result(s, a)$, $TerminalTest(s)$, $Utility(s, p)$).
2. **Minimax Algorithm**:
   - Optimal strategy against a rational opponent:
     $$\\text{Minimax}(s) = \\begin{cases} Utility(s) & \\text{if Terminal}(s) \\ \max_{a} \\text{Minimax}(Result(s, a)) & \\text{if Player}(s) = \\text{MAX} \\ \min_{a} \\text{Minimax}(Result(s, a)) & \\text{if Player}(s) = \\text{MIN} \\end{cases}$$
3. **Alpha-Beta Pruning**:
   - Pruning branches that cannot influence the final decision.
   - $\\alpha$: Best value for MAX found along path so far (initially $-\\infty$).
   - $\\beta$: Best value for MIN found along path so far (initially $+\\infty$).
   - Pruning condition: $\\alpha \\ge \\beta$.
   - Time complexity: With optimal move ordering, reduces effective branching factor from $b^m$ to $b^{m/2}$.
4. **Stochastic Games**:
   - Chance nodes (dice rolls), Expectiminimax algorithm calculating expected utility values.

---

> *Note: Module content will be expanded in detail for the CIA-2 exam cycle.*
`,
};
