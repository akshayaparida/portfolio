import { notFound } from "next/navigation";
import { reasoningModules } from "@/data/reasoning";
import ModuleViewer from "@/components/ModuleViewer";
import type { Metadata } from "next";

export function generateStaticParams() {
  return reasoningModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = reasoningModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    return {
      title: "Module Not Found",
    };
  }

  return {
    title: `${currentModule.title} | Reasoning & Aptitude`,
    description: currentModule.description,
    openGraph: {
      title: `${currentModule.title} | Reasoning | Akshaya Parida`,
      description: currentModule.description,
      url: `https://akshayaparida.vercel.app/reasoning/${moduleId}`,
    },
    alternates: {
      canonical: `/reasoning/${moduleId}`,
    },
  };
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
