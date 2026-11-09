import { notFound } from "next/navigation";
import { openSourceModules } from "@/data/open-source";
import ModuleViewer from "@/components/ModuleViewer";
import { createModuleMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const SUBJECT_NAME = "Building Global Open Source Software";
const SUBJECT_SLUG = "open-source";

export function generateStaticParams() {
  return openSourceModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = openSourceModules.find((m) => m.id === moduleId);

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

export default async function OpenSourceModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = openSourceModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const index = openSourceModules.findIndex((m) => m.id === moduleId);
  const prevModule = index > 0 ? openSourceModules[index - 1] : undefined;
  const nextModule =
    index < openSourceModules.length - 1
      ? openSourceModules[index + 1]
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
