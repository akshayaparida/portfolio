import { notFound } from "next/navigation";
import { professionalCommunicationModules } from "@/data/curaj-msc-cs/professional-communication";
import ModuleViewer from "@/components/ModuleViewer";
import { createModuleMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const SUBJECT_NAME = "CURAJ MSc CS - Professional Communication";
const SUBJECT_SLUG = "professional-communication";

export function generateStaticParams() {
  return professionalCommunicationModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = professionalCommunicationModules.find(
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

export default async function ProfessionalCommunicationModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = professionalCommunicationModules.find(
    (m) => m.id === moduleId,
  );

  if (!currentModule) {
    notFound();
  }

  const index = professionalCommunicationModules.findIndex(
    (m) => m.id === moduleId,
  );
  const prevModule =
    index > 0 ? professionalCommunicationModules[index - 1] : undefined;
  const nextModule =
    index < professionalCommunicationModules.length - 1
      ? professionalCommunicationModules[index + 1]
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
