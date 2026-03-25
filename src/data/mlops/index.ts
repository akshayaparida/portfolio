import { LearningModule } from "@/types/learning";
import { dataExplorationModule } from "./data-exploration";
import { dataValidationModule } from "./data-validation";
import { reproducibleTrainingModule } from "./reproducible-training";
import { modelDeploymentModule } from "./model-deployment";
import { awsDeploymentModule } from "./aws-deployment";

export const mlopsModules: LearningModule[] = [
  dataExplorationModule,
  dataValidationModule,
  reproducibleTrainingModule,
  modelDeploymentModule,
  awsDeploymentModule,
  // Future modules will be added here:
  // monitoringModule,
];
