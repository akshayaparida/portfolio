import { notFound } from "next/navigation";
import { awsModules } from "@/data/aws";
import ModuleViewer from "@/components/ModuleViewer";

export function generateStaticParams() {
  return awsModules.map((module) => ({
    moduleId: module.id,
  }));
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

  return <ModuleViewer module={currentModule} index={index} />;
}
