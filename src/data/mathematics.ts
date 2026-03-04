import { LearningModule } from "@/types/learning";
import { basicMathModule } from "./mathematics/basic-math";
import { setTheoryModule } from "./mathematics/set-theory";
import { algebraModule } from "./mathematics/algebra";
import { coordinateGeometryModule } from "./mathematics/coordinate-geometry";
import { linearAlgebraModule } from "./mathematics/linear-algebra";
import { calculusModule } from "./mathematics/calculus";
import { probabilityStatsModule } from "./mathematics/probability-stats";
import { linearModelsModule } from "./mathematics/linear-models";

export const mathematicsModules: LearningModule[] = [
  basicMathModule,
  setTheoryModule,
  algebraModule,
  coordinateGeometryModule,
  linearAlgebraModule,
  calculusModule,
  probabilityStatsModule,
  linearModelsModule,
];
