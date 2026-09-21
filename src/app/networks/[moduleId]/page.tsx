import { notFound } from "next/navigation";
import { networksModules } from "@/data/networks";
import ModuleViewer from "@/components/ModuleViewer";
import { createModuleMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const SUBJECT_NAME = "Computer Networks";
const SUBJECT_SLUG = "networks";

export function generateStaticParams() {
  return networksModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = networksModules.find((m) => m.id === moduleId);

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

export default async function NetworksModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = networksModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const index = networksModules.findIndex((m) => m.id === moduleId);
  const prevModule = index > 0 ? networksModules[index - 1] : undefined;
  const nextModule =
    index < networksModules.length - 1 ? networksModules[index + 1] : undefined;

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
