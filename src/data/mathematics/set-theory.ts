import { LearningModule } from "@/types/learning";
import { discreteMathWeek2Module } from "./discrete-math-week-2";

// Export setTheoryModule as alias/wrapper around discreteMathWeek2Module for backward compatibility
export const setTheoryModule: LearningModule = {
  ...discreteMathWeek2Module,
  id: "set-theory",
};

export { discreteMathWeek2Module };
