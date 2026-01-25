import { LearningModule } from "@/types/learning";
import { dataExplorationModule } from "./data-exploration";
import { dataValidationModule } from "./data-validation";

export const mlopsModules: LearningModule[] = [
  dataExplorationModule,
  dataValidationModule,
  // Future modules will be added here:
  // featureEngineeringModule,
  // modelTrainingModule,
  // modelDeploymentModule,
  // monitoringModule,
];
