import { LearningModule } from "@/types/learning";
import { typesOperatorsPrecedenceModule } from "./01-types-operators-precedence";
import { controlFlowStorageClassesModule } from "./02-control-flow-storage-classes";
import { pointersArraysDecayModule } from "./03-pointers-arrays-decay";
import { functionsRecursionCallStackModule } from "./04-functions-recursion-call-stack";
import { dynamicMemoryStructuresUnionsModule } from "./05-dynamic-memory-structures-unions";
import { preprocessorMacrosQualifiersModule } from "./06-preprocessor-macros-qualifiers";
import { cAlgorithmsIdiomsModule } from "./07-c-algorithms-idioms";

export const cProgrammingModules: LearningModule[] = [
  typesOperatorsPrecedenceModule,
  controlFlowStorageClassesModule,
  pointersArraysDecayModule,
  functionsRecursionCallStackModule,
  dynamicMemoryStructuresUnionsModule,
  preprocessorMacrosQualifiersModule,
  cAlgorithmsIdiomsModule,
];
