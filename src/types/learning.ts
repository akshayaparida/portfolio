// TypeScript types for Learning Journey
export type ModuleStatus = "not-started" | "in-progress" | "completed";

export interface ResourceLink {
  title: string;
  url: string;
  type: "tutorial" | "documentation" | "article" | "video" | "course";
}

export interface SubModule {
  id: string;
  title: string;
  description: string;
  status: ModuleStatus;
  detailedContent?: string;
  resources?: ResourceLink[];
  subModules?: SubModule[];
}

export interface PracticeQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option (0-3)
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  status: ModuleStatus;
  startDate?: string;
  completedDate?: string;
  estimatedHours?: number;
  skills?: string[];
  keyLearnings?: string[];
  detailedContent?: string;
  subModules?: SubModule[];
  resources?: ResourceLink[];
  practiceQuiz?: PracticeQuestion[];
}

export interface LearningJourneyData {
  modules: LearningModule[];
  overallProgress: number;
  totalHours: number;
  completedHours: number;
}
