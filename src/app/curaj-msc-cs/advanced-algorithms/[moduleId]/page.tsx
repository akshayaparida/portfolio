import { notFound } from "next/navigation";
import { advancedAlgorithmsModules } from "@/data/curaj-msc-cs/advanced-algorithms";
import ModuleViewer from "@/components/ModuleViewer";
import type { Metadata } from "next";

export function generateStaticParams() {
  return advancedAlgorithmsModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = advancedAlgorithmsModules.find(
    (m) => m.id === moduleId,
  );

  if (!currentModule) {
    return {
      title: "Module Not Found",
    };
  }

  return {
    title: `${currentModule.title} | CURAJ MSc CS Advanced Algorithms`,
    description: currentModule.description,
    openGraph: {
      title: `${currentModule.title} | CURAJ Advanced Algorithms | Akshaya Parida`,
      description: currentModule.description,
      url: `https://akshayaparida.vercel.app/curaj-msc-cs/advanced-algorithms/${moduleId}`,
    },
    alternates: {
      canonical: `/curaj-msc-cs/advanced-algorithms/${moduleId}`,
    },
  };
}

export default async function CurajAdvancedAlgorithmsModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = advancedAlgorithmsModules.find(
    (m) => m.id === moduleId,
  );

  if (!currentModule) {
    notFound();
  }

  const index = advancedAlgorithmsModules.findIndex((m) => m.id === moduleId);

  return <ModuleViewer module={currentModule} index={index} />;
}
