"use client";

import React from "react";
import ModuleViewer from "@/components/ModuleViewer";
import VectorSpace2D from "@/components/math-visualizations/VectorSpace2D";
import MatrixMultiplication from "@/components/math-visualizations/MatrixMultiplication";
import PCAVisualization from "@/components/math-visualizations/PCAVisualization";
import GradientDescentPlayground from "@/components/math-visualizations/GradientDescentPlayground";
import ActivationFunctions from "@/components/math-visualizations/ActivationFunctions";
import ScalarMultiplication from "@/components/math-visualizations/ScalarMultiplication";
import { LearningModule } from "@/types/learning";

const demoComponents: Record<string, React.ComponentType> = {
  vectors: VectorSpace2D,
  matrices: MatrixMultiplication,
  pca: PCAVisualization,
  "gradient-descent": GradientDescentPlayground,
  activations: ActivationFunctions,
  "scalar-mult": ScalarMultiplication,
};

export default function MathModuleClient({
  module,
  index,
  subjectName,
  subjectSlug,
  prevModule,
  nextModule,
}: {
  module: LearningModule;
  index: number;
  subjectName?: string;
  subjectSlug?: string;
  prevModule?: LearningModule;
  nextModule?: LearningModule;
}) {
  return (
    <ModuleViewer
      module={module}
      index={index}
      subjectName={subjectName}
      subjectSlug={subjectSlug}
      prevModule={prevModule}
      nextModule={nextModule}
      demoComponents={demoComponents}
    />
  );
}
