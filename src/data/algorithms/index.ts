import { LearningModule } from "@/types/learning";
import { asymptoticAnalysisModule } from "./01-asymptotic-analysis";
import { searchingAlgorithmsModule } from "./02-searching";
import { sortingAlgorithmsModule } from "./03-sorting";
import { divideAndConquerModule } from "./04-divide-and-conquer";
import { greedyAlgorithmsModule } from "./05-greedy-algorithms";
import { dynamicProgrammingModule } from "./06-dynamic-programming";
import { graphAlgorithmsModule } from "./07-graph-algorithms";
import { backtrackingModule } from "./08-backtracking-branch-bound";
import { stringAlgorithmsModule } from "./09-string-algorithms";
import { complexityNpCompleteModule } from "./10-complexity-np-complete";

export const algorithmsModules: LearningModule[] = [
  asymptoticAnalysisModule,
  searchingAlgorithmsModule,
  sortingAlgorithmsModule,
  divideAndConquerModule,
  greedyAlgorithmsModule,
  dynamicProgrammingModule,
  graphAlgorithmsModule,
  backtrackingModule,
  stringAlgorithmsModule,
  complexityNpCompleteModule,
];
