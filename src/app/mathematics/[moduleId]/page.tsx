import { notFound } from "next/navigation";
import { mathematicsModules } from "@/data/mathematics";
import MathModuleClient from "@/components/MathModuleClient";
import type { Metadata } from "next";

export function generateStaticParams() {
  return mathematicsModules.map((m) => ({
    moduleId: m.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const currentModule = mathematicsModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    return {
      title: "Module Not Found",
    };
  }

  return {
    title: `${currentModule.title} | Mathematics for AI`,
    description: currentModule.description,
    openGraph: {
      title: `${currentModule.title} | Mathematics for AI | Akshaya Parida`,
      description: currentModule.description,
      url: `https://akshayaparida.vercel.app/mathematics/${moduleId}`,
    },
    alternates: {
      canonical: `/mathematics/${moduleId}`,
    },
  };
}

export default async function MathModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const currentModule = mathematicsModules.find((m) => m.id === moduleId);

  if (!currentModule) {
    notFound();
  }

  const index = mathematicsModules.findIndex((m) => m.id === moduleId);

  return <MathModuleClient module={currentModule} index={index} />;
}
