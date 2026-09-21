import { notFound } from "next/navigation";
import { mlopsModules } from "@/data/mlops";
import ModuleViewer from "@/components/ModuleViewer";
import { createModuleMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const SUBJECT_NAME = "MLOps & Machine Learning Systems";
const SUBJECT_SLUG = "mlops";

export function generateStaticParams() {
  return mlopsModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = mlopsModules.find((m) => m.id === moduleId);

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

export default async function MLOpsModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = mlopsModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const index = mlopsModules.findIndex((m) => m.id === moduleId);
  const prevModule = index > 0 ? mlopsModules[index - 1] : undefined;
  const nextModule =
    index < mlopsModules.length - 1 ? mlopsModules[index + 1] : undefined;

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
