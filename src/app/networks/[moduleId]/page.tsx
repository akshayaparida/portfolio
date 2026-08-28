import { notFound } from "next/navigation";
import { networksModules } from "@/data/networks";
import ModuleViewer from "@/components/ModuleViewer";
import type { Metadata } from "next";

export function generateStaticParams() {
  return networksModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = networksModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    return {
      title: "Module Not Found",
    };
  }

  return {
    title: `${currentModule.title} | Computer Networks`,
    description: currentModule.description,
    openGraph: {
      title: `${currentModule.title} | Computer Networks | Akshaya Parida`,
      description: currentModule.description,
      url: `https://akshayaparida.vercel.app/networks/${moduleId}`,
    },
    alternates: {
      canonical: `/networks/${moduleId}`,
    },
  };
}

export default async function NetworksModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = networksModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const index = networksModules.findIndex((m) => m.id === moduleId);

  return <ModuleViewer module={currentModule} index={index} />;
}
