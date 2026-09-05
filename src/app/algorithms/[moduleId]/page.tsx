import { notFound } from "next/navigation";
import { algorithmsModules } from "@/data/algorithms";
import ModuleViewer from "@/components/ModuleViewer";
import type { Metadata } from "next";

export function generateStaticParams() {
  return algorithmsModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = algorithmsModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    return {
      title: "Module Not Found",
    };
  }

  return {
    title: `${currentModule.title} | Algorithms`,
    description: currentModule.description,
    openGraph: {
      title: `${currentModule.title} | Algorithms | Akshaya Parida`,
      description: currentModule.description,
      url: `https://akshayaparida.vercel.app/algorithms/${moduleId}`,
    },
    alternates: {
      canonical: `/algorithms/${moduleId}`,
    },
  };
}

export default async function AlgorithmsModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = algorithmsModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const index = algorithmsModules.findIndex((m) => m.id === moduleId);

  return <ModuleViewer module={currentModule} index={index} />;
}
