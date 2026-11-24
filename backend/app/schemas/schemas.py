import datetime
from typing import List, Optional, Any, Dict
from pydantic import BaseModel, EmailStr, Field

# Profile Schemas
class ProfileOut(BaseModel):
    full_name: str
    headline: str
    bio: Optional[str]
    location: str
    availability: str
    email: str
    phone: str
    github_url: Optional[str]
    linkedin_url: Optional[str]
    instagram_url: Optional[str]
    twitter_url: Optional[str]
    youtube_url: Optional[str]
    resume_url: Optional[str]
    avatar_url: Optional[str]
    logo_url: Optional[str]
    projects_count: int
    skills_count: int

    class Config:
        from_attributes = True

class ProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    headline: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    availability: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    instagram_url: Optional[str] = None
    twitter_url: Optional[str] = None
    youtube_url: Optional[str] = None
    resume_url: Optional[str] = None

# Project Schemas
class ProjectOut(BaseModel):
    id: int
    slug: str
    title: str
    tagline: str
    description: str
    category: str
    technologies: List[str]
    github_url: Optional[str]
    demo_url: Optional[str]
    image_url: Optional[str]
    is_featured: bool
    is_published: bool
    sort_order: int

    class Config:
        from_attributes = True

class ProjectCreate(BaseModel):
    slug: str
    title: str
    tagline: str
    description: str
    category: str
    technologies: List[str] = Field(default_factory=list)
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    image_url: Optional[str] = None
    is_featured: bool = True
    is_published: bool = True
    sort_order: int = 0

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    tagline: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    technologies: Optional[List[str]] = None
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    image_url: Optional[str] = None
    is_featured: Optional[bool] = None
    is_published: Optional[bool] = None
    sort_order: Optional[int] = None

# Case Study Schemas
class CaseStudyOut(BaseModel):
    id: int
    project_id: int
    overview_pitch: Optional[str]
    problem_statement: Optional[str]
    objectives: List[str] = Field(default_factory=list)
    architecture_flow: Dict[str, Any] = Field(default_factory=dict)
    technologies_used: List[str] = Field(default_factory=list)
    key_features: List[str] = Field(default_factory=list)
    challenges_solutions: List[Dict[str, str]] = Field(default_factory=list)
    outcomes_results: Optional[str]
    is_published: bool

    class Config:
        from_attributes = True

class CaseStudyUpdate(BaseModel):
    overview_pitch: Optional[str] = None
    problem_statement: Optional[str] = None
    objectives: Optional[List[str]] = None
    architecture_flow: Optional[Dict[str, Any]] = None
    technologies_used: Optional[List[str]] = None
    key_features: Optional[List[str]] = None
    challenges_solutions: Optional[List[Dict[str, str]]] = None
    outcomes_results: Optional[str] = None
    is_published: Optional[bool] = None

# Skills
class SkillItem(BaseModel):
    id: int
    name: str
    description: str
    icon: Optional[str]
    sort_order: int

    class Config:
        from_attributes = True

class SkillCategoryOut(BaseModel):
    id: int
    name: str
    sort_order: int
    skills: List[SkillItem] = Field(default_factory=list)

    class Config:
        from_attributes = True

class SkillCreate(BaseModel):
    category_id: int
    name: str
    description: str
    icon: Optional[str] = None
    sort_order: int = 0

# Services
class ServiceOut(BaseModel):
    id: int
    title: str
    tagline: str
    deliverables: List[str]
    tech_stack: str
    sort_order: int
    is_active: bool

    class Config:
        from_attributes = True

class ServiceCreate(BaseModel):
    title: str
    tagline: str
    deliverables: List[str] = Field(default_factory=list)
    tech_stack: str
    sort_order: int = 0
    is_active: bool = True

# Journey items
class ExperienceOut(BaseModel):
    id: int
    title: str
    organization: str
    period: str
    description: str
    sort_order: int

    class Config:
        from_attributes = True

class EducationOut(BaseModel):
    id: int
    institution: str
    degree: str
    period: str
    details: Optional[str]
    sort_order: int

    class Config:
        from_attributes = True

class CertificateOut(BaseModel):
    id: int
    title: str
    issuer: str
    credential_url: Optional[str]
    image_url: Optional[str]
    sort_order: int

    class Config:
        from_attributes = True

# Inquiry Schemas
class InquiryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    project_type: str = Field(..., min_length=2, max_length=100)
    budget: Optional[str] = Field(default="", max_length=50)
    message: str = Field(..., min_length=10, max_length=2000)
    hp: Optional[str] = Field(default="")

class InquiryOut(BaseModel):
    id: int
    name: str
    email: str
    project_type: str
    budget: Optional[str]
    message: str
    status: str
    admin_notes: Optional[str]
    created_at: datetime.datetime

    class Config:
        from_attributes = True

class InquiryStatusUpdate(BaseModel):
    status: str = Field(..., pattern="^(new|read|replied|archived)$")
    admin_notes: Optional[str] = None

# Auth Schemas
class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)

class AdminUserOut(BaseModel):
    id: int
    email: str
    full_name: str
    is_active: bool

    class Config:
        from_attributes = True

# Dashboard Stats
class AdminStatsOut(BaseModel):
    total_projects: int
    total_skills: int
    total_certificates: int
    total_inquiries: int
    unread_inquiries: int
