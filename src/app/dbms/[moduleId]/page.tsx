import { notFound } from "next/navigation";
import { dbmsModules } from "@/data/dbms";
import ModuleViewer from "@/components/ModuleViewer";
import type { Metadata } from "next";

export function generateStaticParams() {
  return dbmsModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = dbmsModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    return {
      title: "Module Not Found",
    };
  }

  return {
    title: `${currentModule.title} | Database Management Systems`,
    description: currentModule.description,
    openGraph: {
      title: `${currentModule.title} | DBMS | Akshaya Parida`,
      description: currentModule.description,
      url: `https://akshayaparida.vercel.app/dbms/${moduleId}`,
    },
    alternates: {
      canonical: `/dbms/${moduleId}`,
    },
  };
}

export default async function DBMSModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = dbmsModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const index = dbmsModules.findIndex((m) => m.id === moduleId);

  return <ModuleViewer module={currentModule} index={index} />;
}
