"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { LearningModule } from "@/types/learning";

interface ModuleSidebarProps {
  modules: LearningModule[];
  basePath: string;
}

export default function ModuleSidebar({
  modules,
  basePath,
}: ModuleSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="module-sidebar">
      <h3 className="sidebar-title">Modules</h3>
      <nav className="module-nav">
        {modules.map((module) => {
          const href = `${basePath}/${module.id}`;
          const isActive = pathname === href;

          return (
            <Link
              key={module.id}
              href={href}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              <span className="nav-text">{module.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
