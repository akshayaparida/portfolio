export type SemesterId =
  | "Semester I"
  | "Semester II"
  | "Semester III"
  | "Semester IV";

export type AssessmentType =
  | "CIA-1"
  | "CIA-2"
  | "End-Sem"
  | "Mid-Sem"
  | "Assignment"
  | "Lab";

export interface AssessmentSolution {
  summary: string;
  explanation?: string[];
  code?: string;
  keyPoints?: string[];
  output?: string;
}

export interface AssessmentQuestion {
  id: string;
  qNumber: string;
  marks: number;
  question: string;
  solution: AssessmentSolution;
}

export interface Assessment {
  id: string;
  courseCode: string;
  courseSlug: string;
  courseTitle: string;
  semester: SemesterId;
  assessmentType: AssessmentType;
  title: string;
  date?: string;
  time?: string;
  totalMarks?: number;
  instructions?: string[];
  paperImages: string[];
  status: "available" | "upcoming";
  notes?: string;
  questions: AssessmentQuestion[];
}

export interface Course {
  code: string;
  slug: string;
  title: string;
  semester: SemesterId;
  type: "Major" | "Minor" | "Elective" | "AEC" | "Project";
  credits: number;
  description: string;
  units: string[];
  nptelTitle: string;
  nptelUrl: string;
}
