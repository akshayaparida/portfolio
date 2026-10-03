import { notFound } from "next/navigation";
import {
  mathematicsModules,
  discreteMathModule,
  discreteMathWeek1Module,
  discreteMathWeek2Module,
  setTheoryModule,
} from "@/data/mathematics";
import MathModuleClient from "@/components/MathModuleClient";
import { createModuleMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const SUBJECT_NAME = "Mathematics for AI & Computer Science";
const SUBJECT_SLUG = "mathematics";

export function generateStaticParams() {
  const ids = new Set([
    ...mathematicsModules.map((m) => m.id),
    "discrete-math-week-1",
    "discrete-math-week-2",
    "set-theory",
  ]);
  return Array.from(ids).map((moduleId) => ({
    moduleId,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;

  let moduleForMeta = mathematicsModules.find((m) => m.id === moduleId);
  if (!moduleForMeta) {
    if (moduleId === "discrete-math-week-1") {
      moduleForMeta = discreteMathWeek1Module;
    } else if (moduleId === "discrete-math-week-2") {
      moduleForMeta = discreteMathWeek2Module;
    } else if (moduleId === "set-theory") {
      moduleForMeta = setTheoryModule;
    } else if (moduleId === "discrete-math") {
      moduleForMeta = discreteMathModule;
    }
  }

  if (!moduleForMeta) {
    return {
      title: "Module Not Found",
    };
  }

  return createModuleMetadata({
    module: moduleForMeta,
    subjectName: SUBJECT_NAME,
    subjectSlug: SUBJECT_SLUG,
  });
}

export default async function MathModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;

  let targetModuleId = moduleId;
  let initialWeek: "week-1" | "week-2" | undefined;

  if (moduleId === "discrete-math-week-1") {
    targetModuleId = "discrete-math";
    initialWeek = "week-1";
  } else if (moduleId === "discrete-math-week-2" || moduleId === "set-theory") {
    targetModuleId = "discrete-math";
    initialWeek = "week-2";
  }

  const currentModule = mathematicsModules.find((m) => m.id === targetModuleId);

  if (!currentModule) {
    notFound();
  }

  const index = mathematicsModules.findIndex((m) => m.id === targetModuleId);
  const prevModule = index > 0 ? mathematicsModules[index - 1] : undefined;
  const nextModule =
    index < mathematicsModules.length - 1
      ? mathematicsModules[index + 1]
      : undefined;

  return (
    <MathModuleClient
      module={currentModule}
      index={index}
      subjectName={SUBJECT_NAME}
      subjectSlug={SUBJECT_SLUG}
      prevModule={prevModule}
      nextModule={nextModule}
      initialWeek={initialWeek}
    />
  );
}
