import { notFound } from "next/navigation";
import { osModules } from "@/data/os";
import ModuleViewer from "@/components/ModuleViewer";
import type { Metadata } from "next";

export function generateStaticParams() {
  return osModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = osModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    return {
      title: "Module Not Found",
    };
  }

  return {
    title: `${currentModule.title} | Operating Systems`,
    description: currentModule.description,
    openGraph: {
      title: `${currentModule.title} | Operating Systems | Akshaya Parida`,
      description: currentModule.description,
      url: `https://akshayaparida.vercel.app/os/${moduleId}`,
    },
    alternates: {
      canonical: `/os/${moduleId}`,
    },
  };
}

export default async function OSModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = osModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const index = osModules.findIndex((m) => m.id === moduleId);

  return <ModuleViewer module={currentModule} index={index} />;
}
