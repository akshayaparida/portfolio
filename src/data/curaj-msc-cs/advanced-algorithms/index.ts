import { LearningModule } from "@/types/learning";
import { unit1AnalysisDivideConquerModule } from "./01-unit-1-analysis-divide-conquer";
import {
  algocia126Module,
  cia1OfficialPaper2026Module,
} from "./02-cia1-2026-official-paper";

// Both algocia126 and cia1-2026-paper are supported routes
export const advancedAlgorithmsModules: LearningModule[] = [
  unit1AnalysisDivideConquerModule,
  algocia126Module,
  cia1OfficialPaper2026Module,
];

// Distinct modules displayed in sidebar navigation
export const sidebarAdvancedAlgorithmsModules: LearningModule[] = [
  unit1AnalysisDivideConquerModule,
  algocia126Module,
];

export {
  unit1AnalysisDivideConquerModule,
  algocia126Module,
  cia1OfficialPaper2026Module,
};
