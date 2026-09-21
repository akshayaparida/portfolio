import { notFound } from "next/navigation";
import { advancedAlgorithmsModules } from "@/data/curaj-msc-cs/advanced-algorithms";
import ModuleViewer from "@/components/ModuleViewer";
import { createModuleMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const SUBJECT_NAME = "CURAJ MSc CS - Advanced Algorithms";
const SUBJECT_SLUG = "curaj-msc-cs/advanced-algorithms";

export function generateStaticParams() {
  return advancedAlgorithmsModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = advancedAlgorithmsModules.find(
    (m) => m.id === moduleId,
  );

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

export default async function CurajAdvancedAlgorithmsModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = advancedAlgorithmsModules.find(
    (m) => m.id === moduleId,
  );

  if (!currentModule) {
    notFound();
  }

  const index = advancedAlgorithmsModules.findIndex((m) => m.id === moduleId);
  const prevModule =
    index > 0 ? advancedAlgorithmsModules[index - 1] : undefined;
  const nextModule =
    index < advancedAlgorithmsModules.length - 1
      ? advancedAlgorithmsModules[index + 1]
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
