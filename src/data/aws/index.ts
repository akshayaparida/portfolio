import { LearningModule } from "@/types/learning";
import { cloudFoundationsModule } from "./cloud-foundations";
import { awsAccountSetupModule } from "./aws-account-setup";
import { iamDeepDiveModule } from "./iam-deep-dive";
import { ec2DeepDiveModule } from "./ec2-deep-dive";

export const awsModules: LearningModule[] = [
  cloudFoundationsModule,
  awsAccountSetupModule,
  iamDeepDiveModule,
  ec2DeepDiveModule,
  // Future modules will be added here
];
