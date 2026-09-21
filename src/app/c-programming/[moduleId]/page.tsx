import { notFound } from "next/navigation";
import { cProgrammingModules } from "@/data/c-programming";
import ModuleViewer from "@/components/ModuleViewer";
import { createModuleMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const SUBJECT_NAME = "C Programming";
const SUBJECT_SLUG = "c-programming";

export function generateStaticParams() {
  return cProgrammingModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = cProgrammingModules.find((m) => m.id === moduleId);

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

export default async function CProgrammingModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = cProgrammingModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const index = cProgrammingModules.findIndex((m) => m.id === moduleId);
  const prevModule = index > 0 ? cProgrammingModules[index - 1] : undefined;
  const nextModule =
    index < cProgrammingModules.length - 1
      ? cProgrammingModules[index + 1]
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
