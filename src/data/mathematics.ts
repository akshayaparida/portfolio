import { GateTag, LearningModule } from "@/types/learning";
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

const mathGateTag: GateTag = {
  label: "Engg. Math",
  anchorId: "engineering-mathematics",
};

export const mathematicsModules: LearningModule[] = [
  { ...basicMathModule, gateTag: mathGateTag },
  { ...setTheoryModule, gateTag: mathGateTag },
  { ...mathematicalLogicModule, gateTag: mathGateTag },
  { ...relationsModule, gateTag: mathGateTag },
  { ...algebraModule, gateTag: mathGateTag },
  { ...coordinateGeometryModule, gateTag: mathGateTag },
  { ...linearAlgebraModule, gateTag: mathGateTag },
  { ...calculusModule, gateTag: mathGateTag },
  { ...probabilityStatsModule, gateTag: mathGateTag },
  { ...linearModelsModule, gateTag: mathGateTag },
];
