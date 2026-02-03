import { LearningModule } from "@/types/learning";
import { cloudFoundationsModule } from "./cloud-foundations";
import { awsAccountSetupModule } from "./aws-account-setup";

export const awsModules: LearningModule[] = [
  cloudFoundationsModule,
  awsAccountSetupModule,
  // Future modules will be added here
];
