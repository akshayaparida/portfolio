import { notFound } from "next/navigation";
import { cProgrammingModules } from "@/data/c-programming";
import ModuleViewer from "@/components/ModuleViewer";
import type { Metadata } from "next";

export function generateStaticParams() {
  return cProgrammingModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = cProgrammingModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    return {
      title: "Module Not Found",
    };
  }

  return {
    title: `${currentModule.title} | C Programming`,
    description: currentModule.description,
    openGraph: {
      title: `${currentModule.title} | C Programming | Akshaya Parida`,
      description: currentModule.description,
      url: `https://akshayaparida.vercel.app/c-programming/${moduleId}`,
    },
    alternates: {
      canonical: `/c-programming/${moduleId}`,
    },
  };
}

export default async function CProgrammingModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = cProgrammingModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const index = cProgrammingModules.findIndex((m) => m.id === moduleId);

  return <ModuleViewer module={currentModule} index={index} />;
}
