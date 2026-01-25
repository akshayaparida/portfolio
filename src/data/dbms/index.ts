import { databaseFundamentalsModule } from "./database-fundamentals";
import { sqlQueriesModule } from "./sql-queries";
import { normalizationModule } from "./normalization";
import { transactionsConcurrencyModule } from "./transactions-concurrency";
import { indexingStorageModule } from "./indexing-storage";

export const dbmsModules = [
  databaseFundamentalsModule,
  sqlQueriesModule,
  normalizationModule,
  transactionsConcurrencyModule,
  indexingStorageModule,
];
