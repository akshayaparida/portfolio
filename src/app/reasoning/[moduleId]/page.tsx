import { notFound } from "next/navigation";
import { reasoningModules } from "@/data/reasoning";
import ModuleViewer from "@/components/ModuleViewer";
import { createModuleMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const SUBJECT_NAME = "Reasoning & Quantitative Aptitude";
const SUBJECT_SLUG = "reasoning";

export function generateStaticParams() {
  return reasoningModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = reasoningModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    return {
      title: "Module Not Found",
    };
  }

  return createModuleMetadata({
    module: currentModule,
    subjectName: SUBJECT_NAME,
    subjectSlug: SUBJECT_SLUG,
  });
}

export default async function ReasoningModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = reasoningModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const index = reasoningModules.findIndex((m) => m.id === moduleId);
  const prevModule = index > 0 ? reasoningModules[index - 1] : undefined;
  const nextModule =
    index < reasoningModules.length - 1
      ? reasoningModules[index + 1]
      : undefined;

  return (
    <ModuleViewer
      module={currentModule}
      index={index}
      subjectName={SUBJECT_NAME}
      subjectSlug={SUBJECT_SLUG}
      prevModule={prevModule}
      nextModule={nextModule}
    />
  );
}
