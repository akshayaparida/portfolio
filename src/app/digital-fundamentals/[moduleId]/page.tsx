import { notFound } from "next/navigation";
import { digitalFundamentalsModules } from "@/data/digital-fundamentals";
import ModuleViewer from "@/components/ModuleViewer";

export function generateStaticParams() {
  return digitalFundamentalsModules.map((module) => ({
    moduleId: module.id,
  }));
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

  return <ModuleViewer module={currentModule} index={index} />;
}
