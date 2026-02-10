import { networkBasicsModule } from "./01-network-basics";
import { dataLinkLayerModule } from "./02-data-link-layer";
import { networkLayerModule } from "./03-network-layer";
import { transportLayerModule } from "./04-transport-layer";
import { applicationLayerModule } from "./05-application-layer";

export const networksModules = [
  networkBasicsModule,
  dataLinkLayerModule,
  networkLayerModule,
  transportLayerModule,
  applicationLayerModule,
];
