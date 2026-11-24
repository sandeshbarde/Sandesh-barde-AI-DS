import datetime
from sqlalchemy import (
    Column, Integer, String, Text, Boolean, DateTime, ForeignKey, JSON
)
from sqlalchemy.orm import relationship
from app.db.session import Base

def utcnow():
    return datetime.datetime.now(datetime.timezone.utc)

class AdminUser(Base):
    __tablename__ = "admin_users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(100), default="Sandesh Barde")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=utcnow)
    last_login = Column(DateTime(timezone=True), nullable=True)
    sessions = relationship("AdminSession", back_populates="user", cascade="all, delete-orphan")

class AdminSession(Base):
    __tablename__ = "admin_sessions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("admin_users.id", ondelete="CASCADE"), nullable=False)
    token_hash = Column(String(64), unique=True, index=True, nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), default=utcnow)
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(String(255), nullable=True)
    user = relationship("AdminUser", back_populates="sessions")

class ProfileSettings(Base):
    __tablename__ = "profile_settings"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), default="Sandesh Barde")
    headline = Column(String(255), default="AI & Full Stack Developer")
    bio = Column(Text, nullable=True)
    location = Column(String(150), default="Pune, Maharashtra, India")
    availability = Column(String(100), default="Open for Freelance Projects")
    email = Column(String(150), default="sandeshbarde2214@gmail.com")
    phone = Column(String(50), default="+91 9850751835")
    github_url = Column(String(255), default="https://github.com/sandeshbarde")
    linkedin_url = Column(String(255), default="https://www.linkedin.com/in/sandesh-barde-26ba3839b")
    instagram_url = Column(String(255), default="https://www.instagram.com/__sandy_gk_1_/")
    twitter_url = Column(String(255), nullable=True)
    youtube_url = Column(String(255), nullable=True)
    resume_url = Column(String(255), nullable=True)
    avatar_url = Column(String(255), default="/assets/portrait.jpg")
    logo_url = Column(String(255), default="/assets/sb-logo.png")
    updated_at = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    title = Column(String(150), nullable=False)
    tagline = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(100), index=True, nullable=False)
    technologies = Column(JSON, default=list)
    github_url = Column(String(255), nullable=True)
    demo_url = Column(String(255), nullable=True)
    image_url = Column(String(255), nullable=True)
    is_featured = Column(Boolean, default=True)
    is_published = Column(Boolean, default=True)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), default=utcnow)
    case_study = relationship("CaseStudy", back_populates="project", uselist=False, cascade="all, delete-orphan")

class CaseStudy(Base):
    __tablename__ = "case_studies"
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), unique=True, nullable=False)
    overview_pitch = Column(Text, nullable=True)
    problem_statement = Column(Text, nullable=True)
    objectives = Column(JSON, default=list)
    architecture_flow = Column(JSON, default=dict)
    technologies_used = Column(JSON, default=list)
    key_features = Column(JSON, default=list)
    challenges_solutions = Column(JSON, default=list)
    outcomes_results = Column(Text, nullable=True)
    is_published = Column(Boolean, default=True)
    updated_at = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)
    project = relationship("Project", back_populates="case_study")

class SkillCategory(Base):
    __tablename__ = "skill_categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    sort_order = Column(Integer, default=0)
    skills = relationship("Skill", back_populates="category", cascade="all, delete-orphan", order_by="Skill.sort_order")

class Skill(Base):
    __tablename__ = "skills"
    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey("skill_categories.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(100), nullable=False)
    description = Column(String(255), nullable=False)
    icon = Column(String(50), nullable=True)
    sort_order = Column(Integer, default=0)
    category = relationship("SkillCategory", back_populates="skills")

class Service(Base):
    __tablename__ = "services"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    tagline = Column(String(255), nullable=False)
    deliverables = Column(JSON, default=list)
    tech_stack = Column(String(255), nullable=False)
    sort_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

class ExperienceItem(Base):
    __tablename__ = "experience_items"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    organization = Column(String(150), nullable=False)
    period = Column(String(50), nullable=False)
    description = Column(Text, nullable=False)
    sort_order = Column(Integer, default=0)

class EducationItem(Base):
    __tablename__ = "education_items"
    id = Column(Integer, primary_key=True, index=True)
    institution = Column(String(150), nullable=False)
    degree = Column(String(150), nullable=False)
    period = Column(String(50), nullable=False)
    details = Column(Text, nullable=True)
    sort_order = Column(Integer, default=0)

class Certificate(Base):
    __tablename__ = "certificates"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    issuer = Column(String(150), nullable=False)
    credential_url = Column(String(255), nullable=True)
    image_url = Column(String(255), nullable=True)
    sort_order = Column(Integer, default=0)

class Inquiry(Base):
    __tablename__ = "inquiries"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), index=True, nullable=False)
    project_type = Column(String(100), nullable=False)
    budget = Column(String(50), nullable=True)
    message = Column(Text, nullable=False)
    status = Column(String(20), default="new", index=True)
    admin_notes = Column(Text, nullable=True)
    ip_address = Column(String(45), nullable=True)
    email_notified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=utcnow, index=True)

class AdminAuditLog(Base):
    __tablename__ = "admin_audit_logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("admin_users.id", ondelete="SET NULL"), nullable=True)
    action = Column(String(50), nullable=False)
    entity_type = Column(String(50), nullable=False)
    entity_id = Column(String(50), nullable=True)
    details = Column(JSON, nullable=True)
    ip_address = Column(String(45), nullable=True)
    created_at = Column(DateTime(timezone=True), default=utcnow)
