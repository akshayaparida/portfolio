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
    <aside className="module-sidebar" aria-label="Course Modules Navigation">
      <div className="sidebar-header">
        <h3 className="sidebar-title">
          <i className="fa-solid fa-layer-group"></i> Modules
        </h3>
        <span className="sidebar-count">{modules.length} total</span>
      </div>

      <nav className="module-nav">
        {modules.map((module, idx) => {
          const href = `${basePath}/${module.id}`;
          const isActive = pathname === href;

          return (
            <Link
              key={module.id}
              href={href}
              className={`nav-item ${isActive ? "active" : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="nav-index">{idx + 1}</span>
              <span className="nav-text">{module.title}</span>
              <i className="fa-solid fa-chevron-right nav-arrow"></i>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
