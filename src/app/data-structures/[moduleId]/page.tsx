import { notFound } from "next/navigation";
import { dataStructuresModules } from "@/data/data-structures";
import ModuleViewer from "@/components/ModuleViewer";
import { createModuleMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const SUBJECT_NAME = "Data Structures";
const SUBJECT_SLUG = "data-structures";

export function generateStaticParams() {
  return dataStructuresModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = dataStructuresModules.find((m) => m.id === moduleId);

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

export default async function DataStructuresModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = dataStructuresModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const index = dataStructuresModules.findIndex((m) => m.id === moduleId);
  const prevModule = index > 0 ? dataStructuresModules[index - 1] : undefined;
  const nextModule =
    index < dataStructuresModules.length - 1
      ? dataStructuresModules[index + 1]
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
