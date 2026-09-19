import { LearningModule } from "@/types/learning";

export const unit6ProbabilisticReasoningModule: LearningModule = {
  id: "unit-6-probabilistic-reasoning",
  title: "Unit 6: Probabilistic Reasoning & Uncertainty",
  description:
    "Handling Uncertainty in AI, Markov Networks, Bayes' Theorem, Bayesian Networks (Representation & Inference), HMMs, DBNs, and Dempster-Shafer Theory.",
  status: "not-started",
  tags: ["CURAJ MSc CS", "Core 1: 6.0CSC01"],
  detailedContent: `# Unit 6: Probabilistic Reasoning & Uncertainty

> **CURAJ M.Sc. Computer Science — Course Code: 6.0CSC01 (Core 1, 4 Credits)**  
> **Syllabus Coverage**: Uncertainties in AI, Axioms of Probability, Conditional Probability and Bayes' Rule, Bayesian Belief Networks (BBNs), Conditional Independence and d-separation, Exact Inference (Variable Elimination), Hidden Markov Models (HMMs), Dynamic Bayesian Networks (DBNs), and Dempster-Shafer Framework of Evidential Reasoning.

---

## Unit Topics Outline

1. **Uncertainty & Probabilistic Foundations**:
   - Prior probability, Conditional probability, Product Rule, and Bayes' Theorem:
     $$P(H \\mid E) = \\frac{P(E \\mid H) \\cdot P(H)}{P(E)}$$
2. **Bayesian Belief Networks (BBNs)**:
   - Directed Acyclic Graphs (DAGs) representing joint probability distributions compactly:
     $$P(X_1, \\dots, X_n) = \prod_{i=1}^n P(X_i \\mid \\text{Parents}(X_i))$$
   - Conditional independence and $d$-separation rules.
3. **Temporal Probabilistic Models**:
   - Markov Chains (Markov Property: $P(X_t \\mid X_{0:t-1}) = P(X_t \\mid X_{t-1})$).
   - Hidden Markov Models (HMMs): State transitions, Observation emissions, Forward-Backward algorithm, Viterbi decoding.
4. **Dempster-Shafer Theory of Evidence**:
   - Frame of discernment, Basic Probability Assignment (Mass function $m$), Belief and Plausibility functions:
     $$Bel(A) \\le P(A) \\le Pl(A)$$
`,
};
