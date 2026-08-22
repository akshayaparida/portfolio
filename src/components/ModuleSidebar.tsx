"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { LearningModule } from "@/types/learning";

interface ModuleSidebarProps {
  modules: LearningModule[];
  basePath: string;
}

const DEFAULT_GATE_TAGS: Record<string, { label: string; anchorId: string }> = {
  "/mathematics": { label: "Engg. Math", anchorId: "engineering-mathematics" },
  "/digital-fundamentals": {
    label: "Digital Logic",
    anchorId: "digital-logic",
  },
  "/dsa": { label: "DSA", anchorId: "dsa" },
  "/dbms": { label: "Databases", anchorId: "databases" },
  "/networks": { label: "Networks", anchorId: "networks" },
  "/os": { label: "Operating Systems", anchorId: "os" },
  "/reasoning": { label: "General Aptitude", anchorId: "general-aptitude" },
};

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
          const gateTag = module.gateTag || DEFAULT_GATE_TAGS[basePath];

          return (
            <div
              key={module.id}
              className={`nav-item-wrapper ${isActive ? "active" : ""}`}
            >
              <Link
                href={href}
                className={`nav-item ${isActive ? "active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="nav-index">{idx + 1}</span>
                <span className="nav-text">{module.title}</span>
                <i className="fa-solid fa-chevron-right nav-arrow"></i>
              </Link>
              {gateTag && (
                <Link
                  href={`/gate-cs#${gateTag.anchorId}`}
                  className="gate-topic-badge"
                  title={`View ${gateTag.label} on GATE CS syllabus`}
                  aria-label={`GATE CS Topic: ${gateTag.label}`}
                >
                  <i className="fa-solid fa-bookmark gate-badge-icon"></i>
                  <span className="gate-badge-label">
                    GATE: {gateTag.label}
                  </span>
                  <i className="fa-solid fa-arrow-up-right-from-square gate-badge-arrow"></i>
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
