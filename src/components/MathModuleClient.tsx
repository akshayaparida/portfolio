"use client";

import React, { useState, useEffect } from "react";
import ModuleViewer from "@/components/ModuleViewer";
import VectorSpace2D from "@/components/math-visualizations/VectorSpace2D";
import MatrixMultiplication from "@/components/math-visualizations/MatrixMultiplication";
import PCAVisualization from "@/components/math-visualizations/PCAVisualization";
import GradientDescentPlayground from "@/components/math-visualizations/GradientDescentPlayground";
import ActivationFunctions from "@/components/math-visualizations/ActivationFunctions";
import ScalarMultiplication from "@/components/math-visualizations/ScalarMultiplication";
import DiscreteMathWeek1Playground from "@/components/math-visualizations/DiscreteMathWeek1Playground";
import DiscreteMathWeek2Playground from "@/components/math-visualizations/DiscreteMathWeek2Playground";
import { LearningModule } from "@/types/learning";
import { discreteMathWeek1Module } from "@/data/mathematics/discrete-math-week-1";
import { discreteMathWeek2Module } from "@/data/mathematics/discrete-math-week-2";

const demoComponents: Record<string, React.ComponentType> = {
  vectors: VectorSpace2D,
  matrices: MatrixMultiplication,
  pca: PCAVisualization,
  "gradient-descent": GradientDescentPlayground,
  activations: ActivationFunctions,
  "scalar-mult": ScalarMultiplication,
  "discrete-math-week1-lab": DiscreteMathWeek1Playground,
  "discrete-math-week2-lab": DiscreteMathWeek2Playground,
};

export default function MathModuleClient({
  module,
  index,
  subjectName,
  subjectSlug,
  prevModule,
  nextModule,
  initialWeek,
}: {
  module: LearningModule;
  index: number;
  subjectName?: string;
  subjectSlug?: string;
  prevModule?: LearningModule;
  nextModule?: LearningModule;
  initialWeek?: "week-1" | "week-2";
}) {
  const isDiscreteMath =
    module.id === "discrete-math" ||
    module.id === "discrete-math-week-1" ||
    module.id === "discrete-math-week-2" ||
    module.id === "set-theory";

  // Default week determination
  const defaultWeek =
    initialWeek ||
    (module.id === "discrete-math-week-2" || module.id === "set-theory"
      ? "week-2"
      : "week-1");

  const [selectedWeek, setSelectedWeek] = useState<"week-1" | "week-2">(
    defaultWeek,
  );

  // Sync with URL query parameter ?week=week-1 or ?week=week-2 on client mount
  useEffect(() => {
    if (!isDiscreteMath) return;
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const weekParam = params.get("week");
      if (
        weekParam === "2" ||
        weekParam === "week-2" ||
        weekParam === "week2"
      ) {
        setSelectedWeek("week-2");
      } else if (
        weekParam === "1" ||
        weekParam === "week-1" ||
        weekParam === "week1"
      ) {
        setSelectedWeek("week-1");
      }
    }
  }, [isDiscreteMath]);

  const handleWeekChange = (week: "week-1" | "week-2") => {
    setSelectedWeek(week);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("week", week);
      window.history.replaceState(null, "", url.toString());
    }
  };

  if (!isDiscreteMath) {
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

  const activeModuleData =
    selectedWeek === "week-1"
      ? discreteMathWeek1Module
      : discreteMathWeek2Module;

  return (
    <div className="discrete-math-week-wrapper">
      {/* Interactive Dual-Week Switcher */}
      <div
        className="discrete-math-week-nav"
        role="tablist"
        aria-label="Discrete Mathematics Weekly Units"
      >
        <button
          type="button"
          role="tab"
          aria-selected={selectedWeek === "week-1"}
          className={`week-nav-btn ${selectedWeek === "week-1" ? "active" : ""}`}
          onClick={() => handleWeekChange("week-1")}
        >
          <div className="week-nav-top">
            <span className="week-nav-badge">Week 1</span>
            <span className="week-nav-pill">Assignment 1 Cheatsheet</span>
          </div>
          <div className="week-nav-title">
            Combinatorics, Catalan & LIFO Stacks
          </div>
          <div className="week-nav-desc">
            Counting principles, permutations, Dyck paths, polygon
            triangulation, and stack permutations.
          </div>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={selectedWeek === "week-2"}
          className={`week-nav-btn ${selectedWeek === "week-2" ? "active" : ""}`}
          onClick={() => handleWeekChange("week-2")}
        >
          <div className="week-nav-top">
            <span className="week-nav-badge">Week 2</span>
            <span className="week-nav-pill">All 20 Syllabus Topics</span>
          </div>
          <div className="week-nav-title">
            Set Theory, Venn Diagrams & Counting
          </div>
          <div className="week-nav-desc">
            Sets, Venn diagrams, Inclusion-Exclusion, power sets, non-empty
            subsets, and committee selection.
          </div>
        </button>
      </div>

      {/* Render the Active Week's Content, Demos, and Quiz */}
      <ModuleViewer
        key={selectedWeek}
        module={activeModuleData}
        index={index}
        subjectName={subjectName}
        subjectSlug={subjectSlug}
        prevModule={prevModule}
        nextModule={nextModule}
        demoComponents={demoComponents}
      />
    </div>
  );
}
