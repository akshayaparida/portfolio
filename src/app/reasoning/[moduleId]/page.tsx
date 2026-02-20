import { notFound } from "next/navigation";
import { reasoningModules } from "@/data/reasoning";
import ModuleViewer from "@/components/ModuleViewer";

export function generateStaticParams() {
  return reasoningModules.map((module) => ({
    moduleId: module.id,
  }));
}

export default async function ReasoningModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = reasoningModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const index = reasoningModules.findIndex((m) => m.id === moduleId);

  return <ModuleViewer module={currentModule} index={index} />;
}
