import { notFound } from "next/navigation";
import { networksModules } from "@/data/networks";
import ModuleViewer from "@/components/ModuleViewer";

export function generateStaticParams() {
  return networksModules.map((module) => ({
    moduleId: module.id,
  }));
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

  return <ModuleViewer module={currentModule} index={index} />;
}
