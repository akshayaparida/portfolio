import { notFound } from "next/navigation";
import { mathematicsModules } from "@/data/mathematics";
import MathModuleClient from "@/components/MathModuleClient";
import { createModuleMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const SUBJECT_NAME = "Mathematics for AI & Computer Science";
const SUBJECT_SLUG = "mathematics";

export function generateStaticParams() {
  return mathematicsModules.map((m) => ({
    moduleId: m.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = mathematicsModules.find((m) => m.id === moduleId);

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

export default async function MathModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = mathematicsModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const index = mathematicsModules.findIndex((m) => m.id === moduleId);
  const prevModule = index > 0 ? mathematicsModules[index - 1] : undefined;
  const nextModule =
    index < mathematicsModules.length - 1
      ? mathematicsModules[index + 1]
      : undefined;

  return (
    <MathModuleClient
      module={currentModule}
      index={index}
      subjectName={SUBJECT_NAME}
      subjectSlug={SUBJECT_SLUG}
      prevModule={prevModule}
      nextModule={nextModule}
    />
  );
}
