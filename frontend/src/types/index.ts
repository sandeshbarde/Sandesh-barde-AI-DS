export interface Profile {
  full_name: string;
  headline: string;
  bio?: string;
  location: string;
  availability: string;
  email: string;
  phone: string;
  github_url?: string;
  linkedin_url?: string;
  instagram_url?: string;
  twitter_url?: string;
  youtube_url?: string;
  resume_url?: string;
  avatar_url?: string;
  logo_url?: string;
  projects_count: number;
  skills_count: number;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  technologies: string[];
  github_url?: string;
  demo_url?: string;
  image_url?: string;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
}

export interface CaseStudy {
  id: number;
  project_id: number;
  overview_pitch?: string;
  problem_statement?: string;
  objectives: string[];
  architecture_flow: {
    pipeline?: Array<{ stage: string; tool: string }>;
    backend?: string[];
    [key: string]: any;
  };
  technologies_used: string[];
  key_features: string[];
  challenges_solutions: Array<{ challenge: string; solution: string }>;
  outcomes_results?: string;
  is_published: boolean;
}

export interface SkillItem {
  id: number;
  name: string;
  description: string;
  icon?: string;
  sort_order: number;
}

export interface SkillCategory {
  id: number;
  name: string;
  sort_order: number;
  skills: SkillItem[];
}

export interface Service {
  id: number;
  title: string;
  tagline: string;
  deliverables: string[];
  tech_stack: string;
  sort_order: number;
  is_active: boolean;
}

export interface ExperienceItem {
  id: number;
  title: string;
  organization: string;
  period: string;
  description: string;
  sort_order: number;
}

export interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  period: string;
  details?: string;
  sort_order: number;
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  credential_url?: string;
  image_url?: string;
  sort_order: number;
}

export interface InquiryPayload {
  name: string;
  email: string;
  project_type: string;
  budget?: string;
  message: string;
  hp?: string;
}

export interface AdminStats {
  total_projects: number;
  total_skills: number;
  total_certificates: number;
  total_inquiries: number;
  unread_inquiries: number;
}

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  project_type: string;
  budget?: string;
  message: string;
  status: string;
  admin_notes?: string;
  created_at: string;
}
