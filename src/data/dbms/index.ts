import { GateTag, LearningModule } from "@/types/learning";
import { databaseFundamentalsModule } from "./database-fundamentals";
import { sqlQueriesModule } from "./sql-queries";
import { normalizationModule } from "./normalization";
import { transactionsConcurrencyModule } from "./transactions-concurrency";
import { indexingStorageModule } from "./indexing-storage";

const dbmsGateTag: GateTag = {
  label: "Databases",
  anchorId: "databases",
};

export const dbmsModules: LearningModule[] = [
  { ...databaseFundamentalsModule, gateTag: dbmsGateTag },
  { ...sqlQueriesModule, gateTag: dbmsGateTag },
  { ...normalizationModule, gateTag: dbmsGateTag },
  { ...transactionsConcurrencyModule, gateTag: dbmsGateTag },
  { ...indexingStorageModule, gateTag: dbmsGateTag },
];
