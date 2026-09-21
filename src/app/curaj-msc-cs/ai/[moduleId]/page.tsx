import { notFound } from "next/navigation";
import { aiModules } from "@/data/curaj-msc-cs/ai";
import ModuleViewer from "@/components/ModuleViewer";
import { createModuleMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const SUBJECT_NAME = "CURAJ MSc CS - Artificial Intelligence";
const SUBJECT_SLUG = "curaj-msc-cs/ai";

export function generateStaticParams() {
  return aiModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = aiModules.find((m) => m.id === moduleId);

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

export default async function CurajAIModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = aiModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const index = aiModules.findIndex((m) => m.id === moduleId);
  const prevModule = index > 0 ? aiModules[index - 1] : undefined;
  const nextModule =
    index < aiModules.length - 1 ? aiModules[index + 1] : undefined;

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
