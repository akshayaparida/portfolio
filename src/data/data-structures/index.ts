import { LearningModule } from "@/types/learning";
import { dsDefinitionModule } from "./00-definition-ds";
import { memoryArraysModule } from "./01-memory-arrays";
import { linkedListsModule } from "./02-linked-lists";
import { stacksModule } from "./03-stacks";
import { queuesModule } from "./04-queues";
import { treesBinaryTreesModule } from "./05-trees-binary-trees";
import { bstAvlModule } from "./06-bst-avl";
import { heapsPriorityQueuesModule } from "./07-heaps-priority-queues";
import { hashingModule } from "./08-hashing";
import { graphsRepresentationModule } from "./09-graphs-representation";
import { advancedDsModule } from "./10-advanced-ds";

export const dataStructuresModules: LearningModule[] = [
  dsDefinitionModule,
  memoryArraysModule,
  linkedListsModule,
  stacksModule,
  queuesModule,
  treesBinaryTreesModule,
  bstAvlModule,
  heapsPriorityQueuesModule,
  hashingModule,
  graphsRepresentationModule,
  advancedDsModule,
];
