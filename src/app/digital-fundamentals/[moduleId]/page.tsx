import { notFound } from "next/navigation";
import { digitalFundamentalsModules } from "@/data/digital-fundamentals";
import ModuleViewer from "@/components/ModuleViewer";
import type { Metadata } from "next";

export function generateStaticParams() {
  return digitalFundamentalsModules.map((module) => ({
    moduleId: module.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = digitalFundamentalsModules.find(
    (m) => m.id === moduleId,
  );

  if (!currentModule) {
    return {
      title: "Module Not Found",
    };
  }

  return {
    title: `${currentModule.title} | Digital Fundamentals`,
    description: currentModule.description,
    openGraph: {
      title: `${currentModule.title} | Digital Fundamentals | Akshaya Parida`,
      description: currentModule.description,
      url: `https://akshayaparida.vercel.app/digital-fundamentals/${moduleId}`,
    },
    alternates: {
      canonical: `/digital-fundamentals/${moduleId}`,
    },
  };
}

export default async function DigitalFundamentalsModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = digitalFundamentalsModules.find(
    (m) => m.id === moduleId,
  );

  if (!currentModule) {
    notFound();
  }

  const index = digitalFundamentalsModules.findIndex((m) => m.id === moduleId);

  return <ModuleViewer module={currentModule} index={index} />;
}
