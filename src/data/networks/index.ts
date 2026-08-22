import { GateTag, LearningModule } from "@/types/learning";
import { networkBasicsModule } from "./01-network-basics";
import { dataLinkLayerModule } from "./02-data-link-layer";
import { networkLayerModule } from "./03-network-layer";
import { transportLayerModule } from "./04-transport-layer";
import { applicationLayerModule } from "./05-application-layer";

const networksGateTag: GateTag = {
  label: "Networks",
  anchorId: "networks",
};

export const networksModules: LearningModule[] = [
  { ...networkBasicsModule, gateTag: networksGateTag },
  { ...dataLinkLayerModule, gateTag: networksGateTag },
  { ...networkLayerModule, gateTag: networksGateTag },
  { ...transportLayerModule, gateTag: networksGateTag },
  { ...applicationLayerModule, gateTag: networksGateTag },
];
