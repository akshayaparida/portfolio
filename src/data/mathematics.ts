import { LearningModule } from "@/types/learning";
import { basicMathModule } from "./mathematics/basic-math";
import { setTheoryModule } from "./mathematics/set-theory";
import { mathematicalLogicModule } from "./mathematics/mathematical-logic";
import { relationsModule } from "./mathematics/relations";
import { algebraModule } from "./mathematics/algebra";
import { coordinateGeometryModule } from "./mathematics/coordinate-geometry";
import { linearAlgebraModule } from "./mathematics/linear-algebra";
import { calculusModule } from "./mathematics/calculus";
import { probabilityStatsModule } from "./mathematics/probability-stats";
import { linearModelsModule } from "./mathematics/linear-models";

export const mathematicsModules: LearningModule[] = [
  basicMathModule,
  setTheoryModule,
  mathematicalLogicModule,
  relationsModule,
  algebraModule,
  coordinateGeometryModule,
  linearAlgebraModule,
  calculusModule,
  probabilityStatsModule,
  linearModelsModule,
];
