"use client";

import { mathematicsModules } from "@/data/mathematics";
import ModuleViewer from "@/components/ModuleViewer";
import VectorSpace2D from "@/components/math-visualizations/VectorSpace2D";
import MatrixMultiplication from "@/components/math-visualizations/MatrixMultiplication";
import PCAVisualization from "@/components/math-visualizations/PCAVisualization";
import GradientDescentPlayground from "@/components/math-visualizations/GradientDescentPlayground";
import ActivationFunctions from "@/components/math-visualizations/ActivationFunctions";
import ScalarMultiplication from "@/components/math-visualizations/ScalarMultiplication";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import React from "react";

const demoComponents: Record<string, React.ComponentType> = {
  vectors: VectorSpace2D,
  matrices: MatrixMultiplication,
  pca: PCAVisualization,
  "gradient-descent": GradientDescentPlayground,
  activations: ActivationFunctions,
  "scalar-mult": ScalarMultiplication,
};

export default function ModulePage() {
  const { moduleId } = useParams() as { moduleId: string };

  const currentModule = mathematicsModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    return notFound();
  }

  // Calculate index for display (1-based)
  const index = mathematicsModules.findIndex((m) => m.id === moduleId);

  return (
    <ModuleViewer
      module={currentModule}
      index={index}
      demoComponents={demoComponents}
    />
  );
}
