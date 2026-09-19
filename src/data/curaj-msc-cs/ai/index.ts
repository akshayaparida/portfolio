import { LearningModule } from "@/types/learning";
import { unit1UninformedSearchModule } from "./01-unit-1-uninformed-search";
import { unit2InformedSearchModule } from "./02-unit-2-informed-search";
import { unit3AdversarialSearchModule } from "./03-unit-3-adversarial-search";
import { unit4ConstraintSatisfactionModule } from "./04-unit-4-constraint-satisfaction";
import { unit5AIPlanningModule } from "./05-unit-5-ai-planning";
import { unit6ProbabilisticReasoningModule } from "./06-unit-6-probabilistic-reasoning";

export const aiModules: LearningModule[] = [
  unit1UninformedSearchModule,
  unit2InformedSearchModule,
  unit3AdversarialSearchModule,
  unit4ConstraintSatisfactionModule,
  unit5AIPlanningModule,
  unit6ProbabilisticReasoningModule,
];

export {
  unit1UninformedSearchModule,
  unit2InformedSearchModule,
  unit3AdversarialSearchModule,
  unit4ConstraintSatisfactionModule,
  unit5AIPlanningModule,
  unit6ProbabilisticReasoningModule,
};
