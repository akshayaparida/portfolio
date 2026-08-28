import { notFound } from "next/navigation";
import { dsaModules } from "@/data/dsa";
import ModuleViewer from "@/components/ModuleViewer";
import type { Metadata } from "next";

export function generateStaticParams() {
  return dsaModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = dsaModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    return {
      title: "Module Not Found",
    };
  }

  return {
    title: `${currentModule.title} | Data Structures & Algorithms`,
    description: currentModule.description,
    openGraph: {
      title: `${currentModule.title} | DSA | Akshaya Parida`,
      description: currentModule.description,
      url: `https://akshayaparida.vercel.app/dsa/${moduleId}`,
    },
    alternates: {
      canonical: `/dsa/${moduleId}`,
    },
  };
}

export default async function DSAModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = dsaModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const index = dsaModules.findIndex((m) => m.id === moduleId);

  return <ModuleViewer module={currentModule} index={index} />;
}
