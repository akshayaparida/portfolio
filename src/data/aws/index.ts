import { LearningModule } from "@/types/learning";
import { cloudFoundationsModule } from "./cloud-foundations";
import { awsAccountSetupModule } from "./aws-account-setup";
import { iamDeepDiveModule } from "./iam-deep-dive";

export const awsModules: LearningModule[] = [
  cloudFoundationsModule,
  awsAccountSetupModule,
  iamDeepDiveModule,
  // Future modules will be added here
];
