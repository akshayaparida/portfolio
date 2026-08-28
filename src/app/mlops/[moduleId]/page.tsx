import { notFound } from "next/navigation";
import { mlopsModules } from "@/data/mlops";
import ModuleViewer from "@/components/ModuleViewer";
import type { Metadata } from "next";

export function generateStaticParams() {
  return mlopsModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = mlopsModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    return {
      title: "Module Not Found",
    };
  }

  return {
    title: `${currentModule.title} | MLOps Engineering`,
    description: currentModule.description,
    openGraph: {
      title: `${currentModule.title} | MLOps | Akshaya Parida`,
      description: currentModule.description,
      url: `https://akshayaparida.vercel.app/mlops/${moduleId}`,
    },
    alternates: {
      canonical: `/mlops/${moduleId}`,
    },
  };
}

export default async function MLOpsModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = mlopsModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const index = mlopsModules.findIndex((m) => m.id === moduleId);

  return <ModuleViewer module={currentModule} index={index} />;
}
