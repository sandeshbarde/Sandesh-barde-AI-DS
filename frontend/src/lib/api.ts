import {
  Profile, Project, CaseStudy, SkillCategory, Service,
  ExperienceItem, EducationItem, Certificate, InquiryPayload,
  AdminStats, Inquiry
} from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL !== undefined
  ? import.meta.env.VITE_API_BASE_URL
  : (import.meta.env.DEV ? 'http://localhost:8000' : '');

async function fetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    let errorDetail = 'Network request failed';
    try {
      const errData = await res.json();
      errorDetail = errData.detail || errData.message || errorDetail;
    } catch {}
    throw new Error(errorDetail);
  }

  return res.json();
}

export const api = {
  // Public
  getProfile: () => fetchJson<Profile>('/api/v1/public/profile'),
  getProjects: (category?: string) =>
    fetchJson<Project[]>(`/api/v1/public/projects${category ? `?category=${encodeURIComponent(category)}` : ''}`),
  getCaseStudy: (slug: string) => fetchJson<CaseStudy>(`/api/v1/public/projects/${slug}/case-study`),
  getSkills: () => fetchJson<SkillCategory[]>('/api/v1/public/skills'),
  getServices: () => fetchJson<Service[]>('/api/v1/public/services'),
  getJourney: () =>
    fetchJson<{ experience: ExperienceItem[]; education: EducationItem[]; certificates: Certificate[] }>('/api/v1/public/journey'),
  submitInquiry: (payload: InquiryPayload) =>
    fetchJson<{ success: boolean; message: string }>('/api/v1/public/inquiries', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Admin Auth
  login: (credentials: { email: string; password: string }) =>
    fetchJson<{ success: boolean; user: any }>('/api/v1/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  logout: () => fetchJson<{ success: boolean }>('/api/v1/admin/auth/logout', { method: 'POST' }),
  getMe: () => fetchJson<{ id: number; email: string; full_name: string }>('/api/v1/admin/auth/me'),

  // Admin CMS
  getAdminStats: () => fetchJson<AdminStats>('/api/v1/admin/stats'),
  getAdminProfile: () => fetchJson<Profile>('/api/v1/admin/profile'),
  updateAdminProfile: (data: Partial<Profile>) =>
    fetchJson<Profile>('/api/v1/admin/profile', { method: 'PUT', body: JSON.stringify(data) }),
  getAdminProjects: () => fetchJson<Project[]>('/api/v1/admin/projects'),
  createProject: (data: any) =>
    fetchJson<Project>('/api/v1/admin/projects', { method: 'POST', body: JSON.stringify(data) }),
  updateProject: (id: number, data: any) =>
    fetchJson<Project>(`/api/v1/admin/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProject: (id: number) =>
    fetchJson<{ success: boolean }>(`/api/v1/admin/projects/${id}`, { method: 'DELETE' }),
  getAdminCaseStudy: (projectId: number) =>
    fetchJson<CaseStudy>(`/api/v1/admin/case-studies/${projectId}`),
  updateAdminCaseStudy: (projectId: number, data: any) =>
    fetchJson<CaseStudy>(`/api/v1/admin/case-studies/${projectId}`, { method: 'PUT', body: JSON.stringify(data) }),
  getAdminInquiries: (status?: string) =>
    fetchJson<Inquiry[]>(`/api/v1/admin/inquiries${status ? `?status=${status}` : ''}`),
  updateInquiryStatus: (id: number, status: string, adminNotes?: string) =>
    fetchJson<Inquiry>(`/api/v1/admin/inquiries/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, admin_notes: adminNotes }),
    }),
  exportInquiriesCsvUrl: `${API_BASE}/api/v1/admin/inquiries/export.csv`,
};
