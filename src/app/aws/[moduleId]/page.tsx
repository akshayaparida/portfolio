import { notFound } from "next/navigation";
import { awsModules } from "@/data/aws";
import ModuleViewer from "@/components/ModuleViewer";
import { createModuleMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const SUBJECT_NAME = "AWS Cloud Computing";
const SUBJECT_SLUG = "aws";

export function generateStaticParams() {
  return awsModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = awsModules.find((m) => m.id === moduleId);

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

export default async function AWSModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = awsModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const index = awsModules.findIndex((m) => m.id === moduleId);
  const prevModule = index > 0 ? awsModules[index - 1] : undefined;
  const nextModule =
    index < awsModules.length - 1 ? awsModules[index + 1] : undefined;

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
