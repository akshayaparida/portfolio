import { GateTag, LearningModule } from "@/types/learning";
import { algorithmicComplexityModule } from "./00-algorithmic-complexity";
import { dsIntroductionModule } from "./00b-ds-introduction";
import { arraysStringsModule } from "./01-arrays-strings";
import { linkedListsModule } from "./02-linked-lists";
import { stacksQueuesModule } from "./03-stacks-queues";
import { hashingModule } from "./04-hashing";
import { treesModule } from "./05-trees";
import { heapsModule } from "./06-heaps";
import { graphsModule } from "./07-graphs";
import { searchingSortingModule } from "./08-searching-sorting";
import { advancedAlgorithmsModule } from "./09-advanced-algorithms";
import { trieAdvancedDSModule } from "./10-trie-advanced-ds";
import { pyqRevisionModule } from "./11-pyq-revision";

const dsaGateTag: GateTag = {
  label: "DSA",
  anchorId: "dsa",
};

export const dsaModules: LearningModule[] = [
  { ...algorithmicComplexityModule, gateTag: dsaGateTag },
  { ...dsIntroductionModule, gateTag: dsaGateTag },
  { ...arraysStringsModule, gateTag: dsaGateTag },
  { ...linkedListsModule, gateTag: dsaGateTag },
  { ...stacksQueuesModule, gateTag: dsaGateTag },
  { ...hashingModule, gateTag: dsaGateTag },
  { ...treesModule, gateTag: dsaGateTag },
  { ...heapsModule, gateTag: dsaGateTag },
  { ...graphsModule, gateTag: dsaGateTag },
  { ...searchingSortingModule, gateTag: dsaGateTag },
  { ...advancedAlgorithmsModule, gateTag: dsaGateTag },
  { ...trieAdvancedDSModule, gateTag: dsaGateTag },
  { ...pyqRevisionModule, gateTag: dsaGateTag },
];
