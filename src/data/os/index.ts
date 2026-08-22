import { GateTag, LearningModule } from "@/types/learning";
import { processManagementModule } from "./01-process-management";
import { synchronizationDeadlocksModule } from "./02-synchronization-deadlocks";
import { memoryManagementModule } from "./03-memory-management";
import { diskFileSystemsModule } from "./04-disk-file-systems";

const osGateTag: GateTag = {
  label: "Operating Systems",
  anchorId: "os",
};

export const osModules: LearningModule[] = [
  { ...processManagementModule, gateTag: osGateTag },
  { ...synchronizationDeadlocksModule, gateTag: osGateTag },
  { ...memoryManagementModule, gateTag: osGateTag },
  { ...diskFileSystemsModule, gateTag: osGateTag },
];
