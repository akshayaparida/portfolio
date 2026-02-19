"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mathematicsModules } from "@/data/mathematics";
import MathModuleIcon from "./MathModuleIcon";
import React from "react";

export default function ModuleSidebar() {
  const pathname = usePathname();

  return (
    <aside className="module-sidebar">
      <h3 className="sidebar-title">Modules</h3>
      <nav className="module-nav">
        {mathematicsModules.map((module) => {
          const href = `/mathematics/${module.id}`;
          const isActive = pathname === href;

          return (
            <Link
              key={module.id}
              href={href}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              <span className="nav-icon">
                <MathModuleIcon moduleId={module.id} />
              </span>
              <span className="nav-text">{module.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
