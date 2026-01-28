import { LearningModule } from "@/types/learning";
import { dataExplorationModule } from "./data-exploration";
import { dataValidationModule } from "./data-validation";
import { reproducibleTrainingModule } from "./reproducible-training";

export const mlopsModules: LearningModule[] = [
  dataExplorationModule,
  dataValidationModule,
  reproducibleTrainingModule,
  // Future modules will be added here:
  // modelDeploymentModule,
  // monitoringModule,
];
