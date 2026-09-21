import { notFound } from "next/navigation";
import { digitalFundamentalsModules } from "@/data/digital-fundamentals";
import ModuleViewer from "@/components/ModuleViewer";
import { createModuleMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const SUBJECT_NAME = "Digital Fundamentals & Logic Design";
const SUBJECT_SLUG = "digital-fundamentals";

export function generateStaticParams() {
  return digitalFundamentalsModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = digitalFundamentalsModules.find(
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

export default async function DigitalFundamentalsModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = digitalFundamentalsModules.find(
    (m) => m.id === moduleId,
  );

  if (!currentModule) {
    notFound();
  }

  const index = digitalFundamentalsModules.findIndex((m) => m.id === moduleId);
  const prevModule =
    index > 0 ? digitalFundamentalsModules[index - 1] : undefined;
  const nextModule =
    index < digitalFundamentalsModules.length - 1
      ? digitalFundamentalsModules[index + 1]
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
