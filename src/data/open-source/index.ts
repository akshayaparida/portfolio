import { LearningModule } from "@/types/learning";
import { chapter1Module } from "./chapter-1-ideation-scope";
import { chapter2Module } from "./chapter-2-organization-governance";
import { chapter3Module } from "./chapter-3-licensing-compliance";
import { chapter4Module } from "./chapter-4-repository-anatomy";
import { chapter5Module } from "./chapter-5-cicd-quality-gates";
import { chapter6Module } from "./chapter-6-git-migration-plumbing";
import { chapter7Module } from "./chapter-7-versioning-and-releases";
import { chapter8Module } from "./chapter-8-community-and-scaling";
import { chapter9Module } from "./chapter-9-multi-contributor-governance";
import { chapter10Module } from "./chapter-10-git-workflows-readiness";

export const openSourceModules: LearningModule[] = [
  chapter1Module,
  chapter2Module,
  chapter3Module,
  chapter4Module,
  chapter5Module,
  chapter6Module,
  chapter7Module,
  chapter8Module,
  chapter9Module,
  chapter10Module,
];
