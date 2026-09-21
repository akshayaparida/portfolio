import { notFound } from "next/navigation";
import { dbmsModules } from "@/data/dbms";
import ModuleViewer from "@/components/ModuleViewer";
import { createModuleMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const SUBJECT_NAME = "Database Management Systems";
const SUBJECT_SLUG = "dbms";

export function generateStaticParams() {
  return dbmsModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = dbmsModules.find((m) => m.id === moduleId);

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

export default async function DBMSModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = dbmsModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const index = dbmsModules.findIndex((m) => m.id === moduleId);
  const prevModule = index > 0 ? dbmsModules[index - 1] : undefined;
  const nextModule =
    index < dbmsModules.length - 1 ? dbmsModules[index + 1] : undefined;

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
