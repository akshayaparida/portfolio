import { notFound } from "next/navigation";
import { aiModules } from "@/data/curaj-msc-cs/ai";
import ModuleViewer from "@/components/ModuleViewer";
import type { Metadata } from "next";

export function generateStaticParams() {
  return aiModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = aiModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    return {
      title: "Module Not Found",
    };
  }

  return {
    title: `${currentModule.title} | CURAJ MSc CS Artificial Intelligence`,
    description: currentModule.description,
    openGraph: {
      title: `${currentModule.title} | CURAJ AI | Akshaya Parida`,
      description: currentModule.description,
      url: `https://akshayaparida.vercel.app/curaj-msc-cs/ai/${moduleId}`,
    },
    alternates: {
      canonical: `/curaj-msc-cs/ai/${moduleId}`,
    },
  };
}

export default async function CurajAIModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = aiModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const index = aiModules.findIndex((m) => m.id === moduleId);

  return <ModuleViewer module={currentModule} index={index} />;
}
