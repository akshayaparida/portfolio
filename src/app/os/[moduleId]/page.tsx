import { notFound } from "next/navigation";
import { osModules } from "@/data/os";
import ModuleViewer from "@/components/ModuleViewer";

export function generateStaticParams() {
  return osModules.map((module) => ({
    moduleId: module.id,
  }));
}

export default async function OSModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = osModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const index = osModules.findIndex((m) => m.id === moduleId);

  return <ModuleViewer module={currentModule} index={index} />;
}
