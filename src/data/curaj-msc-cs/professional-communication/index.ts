import { LearningModule } from "@/types/learning";
import { cia1PredictedModelAnswersModule } from "./01-cia1-predicted-model-answers";
import { cia1OfficialPaper2026Module } from "./02-cia1-2026-official-paper";

// Alias to support both /professional-communication/cia1-2026-paper and /professional-communication/pccia126
const pccia126Module: LearningModule = {
  ...cia1OfficialPaper2026Module,
  id: "pccia126",
};

export const professionalCommunicationModules: LearningModule[] = [
  cia1OfficialPaper2026Module,
  pccia126Module,
  cia1PredictedModelAnswersModule,
];

export {
  cia1OfficialPaper2026Module,
  pccia126Module,
  cia1PredictedModelAnswersModule,
};
