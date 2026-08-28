import { notFound } from "next/navigation";
import { awsModules } from "@/data/aws";
import ModuleViewer from "@/components/ModuleViewer";
import type { Metadata } from "next";

export function generateStaticParams() {
  return awsModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = awsModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    return {
      title: "Module Not Found",
    };
  }

  return {
    title: `${currentModule.title} | AWS Cloud Computing`,
    description: currentModule.description,
    openGraph: {
      title: `${currentModule.title} | AWS Cloud | Akshaya Parida`,
      description: currentModule.description,
      url: `https://akshayaparida.vercel.app/aws/${moduleId}`,
    },
    alternates: {
      canonical: `/aws/${moduleId}`,
    },
  };
}

export default async function AWSModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = awsModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const index = awsModules.findIndex((m) => m.id === moduleId);

  return <ModuleViewer module={currentModule} index={index} />;
}
