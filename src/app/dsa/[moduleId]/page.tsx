"use client";

import { dsaModules } from "@/data/dsa";
import ModuleViewer from "@/components/ModuleViewer";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import React from "react";

export default function DSAModulePage() {
  const { moduleId } = useParams() as { moduleId: string };

  const currentModule = dsaModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    return notFound();
  }

  // Calculate index for display (1-based)
  const index = dsaModules.findIndex((m) => m.id === moduleId);

  return <ModuleViewer module={currentModule} index={index} />;
}
