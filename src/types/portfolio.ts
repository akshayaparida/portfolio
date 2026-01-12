/**
 * Portfolio shared types and interfaces
 * Used across components for type safety and reusability
 */

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Skill {
  name: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  date: string;
  description: string;
  tech: string[];
  links: ProjectLink[];
  image: string;
}

export interface NavigationLink {
  label: string;
  href: string;
  icon?: string;
}
