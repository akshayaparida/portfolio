import { LearningModule } from "@/types/learning";
import { dataExplorationModule } from "./data-exploration";

export const mlopsModules: LearningModule[] = [
  dataExplorationModule,
  // Future modules will be added here:
  // dataValidationModule,
  // featureEngineeringModule,
  // modelTrainingModule,
  // modelDeploymentModule,
  // monitoringModule,
];
