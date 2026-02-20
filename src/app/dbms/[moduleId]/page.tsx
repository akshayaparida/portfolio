import { notFound } from "next/navigation";
import { dbmsModules } from "@/data/dbms";
import ModuleViewer from "@/components/ModuleViewer";

export function generateStaticParams() {
  return dbmsModules.map((module) => ({
    moduleId: module.id,
  }));
}

export default async function DBMSModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = dbmsModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const index = dbmsModules.findIndex((m) => m.id === moduleId);

  return <ModuleViewer module={currentModule} index={index} />;
}
