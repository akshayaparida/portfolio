import { notFound } from "next/navigation";
import { dataStructuresModules } from "@/data/data-structures";
import ModuleViewer from "@/components/ModuleViewer";
import type { Metadata } from "next";

export function generateStaticParams() {
  return dataStructuresModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = dataStructuresModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    return {
      title: "Module Not Found",
    };
  }

  return {
    title: `${currentModule.title} | Data Structures`,
    description: currentModule.description,
    openGraph: {
      title: `${currentModule.title} | Data Structures | Akshaya Parida`,
      description: currentModule.description,
      url: `https://akshayaparida.vercel.app/data-structures/${moduleId}`,
    },
    alternates: {
      canonical: `/data-structures/${moduleId}`,
    },
  };
}

export default async function DataStructuresModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = dataStructuresModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const index = dataStructuresModules.findIndex((m) => m.id === moduleId);

  return <ModuleViewer module={currentModule} index={index} />;
}
