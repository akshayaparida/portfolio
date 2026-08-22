import { GateTag, LearningModule } from "@/types/learning";
import { numberSystemsModule } from "./01-number-systems";
import { logicGatesBooleanModule } from "./02-logic-gates-boolean";

const digitalGateTag: GateTag = {
  label: "Digital Logic",
  anchorId: "digital-logic",
};

export const digitalFundamentalsModules: LearningModule[] = [
  { ...numberSystemsModule, gateTag: digitalGateTag },
  { ...logicGatesBooleanModule, gateTag: digitalGateTag },
];
