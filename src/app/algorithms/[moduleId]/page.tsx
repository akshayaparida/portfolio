import { notFound } from "next/navigation";
import { algorithmsModules } from "@/data/algorithms";
import ModuleViewer from "@/components/ModuleViewer";
import { createModuleMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const SUBJECT_NAME = "Algorithms";
const SUBJECT_SLUG = "algorithms";

export function generateStaticParams() {
  return algorithmsModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = algorithmsModules.find((m) => m.id === moduleId);

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

export default async function AlgorithmsModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = algorithmsModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const index = algorithmsModules.findIndex((m) => m.id === moduleId);
  const prevModule = index > 0 ? algorithmsModules[index - 1] : undefined;
  const nextModule =
    index < algorithmsModules.length - 1
      ? algorithmsModules[index + 1]
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
