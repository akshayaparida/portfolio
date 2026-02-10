import { processManagementModule } from "./01-process-management";
import { synchronizationDeadlocksModule } from "./02-synchronization-deadlocks";
import { memoryManagementModule } from "./03-memory-management";
import { diskFileSystemsModule } from "./04-disk-file-systems";

export const osModules = [
  processManagementModule,
  synchronizationDeadlocksModule,
  memoryManagementModule,
  diskFileSystemsModule,
];
