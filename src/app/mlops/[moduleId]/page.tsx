import { notFound } from "next/navigation";
import { mlopsModules } from "@/data/mlops";
import ModuleViewer from "@/components/ModuleViewer";

export function generateStaticParams() {
  return mlopsModules.map((module) => ({
    moduleId: module.id,
  }));
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

  return <ModuleViewer module={currentModule} index={index} />;
}
