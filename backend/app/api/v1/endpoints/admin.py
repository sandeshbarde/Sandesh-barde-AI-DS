import io
import csv
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.api.v1.endpoints.auth import get_current_admin
from app.models.models import (
    AdminUser, ProfileSettings, Project, CaseStudy, SkillCategory, Skill,
    Service, ExperienceItem, EducationItem, Certificate, Inquiry, AdminAuditLog
)
from app.schemas.schemas import (
    AdminStatsOut, ProfileOut, ProfileUpdate, ProjectOut, ProjectCreate, ProjectUpdate,
    CaseStudyOut, CaseStudyUpdate, SkillCategoryOut, SkillCreate,
    ServiceOut, ServiceCreate, InquiryOut, InquiryStatusUpdate,
    ExperienceOut, EducationOut, CertificateOut
)

router = APIRouter()

# 1. Dashboard Stats
@router.get("/stats", response_model=AdminStatsOut)
def get_admin_stats(db: Session = Depends(get_db), current_user: AdminUser = Depends(get_current_admin)):
    total_projects = db.query(Project).count()
    total_skills = db.query(Skill).count()
    total_certificates = db.query(Certificate).count()
    total_inquiries = db.query(Inquiry).count()
    unread_inquiries = db.query(Inquiry).filter_by(status="new").count()
    
    return AdminStatsOut(
        total_projects=total_projects,
        total_skills=total_skills,
        total_certificates=total_certificates,
        total_inquiries=total_inquiries,
        unread_inquiries=unread_inquiries
    )

# 2. Profile Management
@router.get("/profile", response_model=ProfileOut)
def get_admin_profile(db: Session = Depends(get_db), current_user: AdminUser = Depends(get_current_admin)):
    profile = db.query(ProfileSettings).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not initialized")
    return ProfileOut(
        full_name=profile.full_name,
        headline=profile.headline,
        bio=profile.bio,
        location=profile.location,
        availability=profile.availability,
        email=profile.email,
        phone=profile.phone,
        github_url=profile.github_url,
        linkedin_url=profile.linkedin_url,
        instagram_url=profile.instagram_url,
        twitter_url=profile.twitter_url,
        youtube_url=profile.youtube_url,
        resume_url=profile.resume_url,
        avatar_url=profile.avatar_url,
        logo_url=profile.logo_url,
        projects_count=db.query(Project).count(),
        skills_count=db.query(Skill).count()
    )

@router.put("/profile", response_model=ProfileOut)
def update_admin_profile(
    profile_in: ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    profile = db.query(ProfileSettings).first()
    if not profile:
        profile = ProfileSettings()
        db.add(profile)
    
    update_data = profile_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(profile, field, value)
    
    db.commit()
    db.refresh(profile)
    return get_admin_profile(db=db, current_user=current_user)

# 3. Project Management
@router.get("/projects", response_model=List[ProjectOut])
def list_admin_projects(db: Session = Depends(get_db), current_user: AdminUser = Depends(get_current_admin)):
    return db.query(Project).order_by(Project.sort_order.asc(), Project.id.asc()).all()

@router.post("/projects", response_model=ProjectOut, status_code=status.HTTP_201_CREATED)
def create_project(
    project_in: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    if db.query(Project).filter_by(slug=project_in.slug).first():
        raise HTTPException(status_code=400, detail="A project with this slug already exists.")
    
    project = Project(**project_in.model_dump())
    db.add(project)
    db.flush()
    
    # Initialize empty case study
    case_study = CaseStudy(project_id=project.id)
    db.add(case_study)
    
    db.commit()
    db.refresh(project)
    return project

@router.put("/projects/{project_id}", response_model=ProjectOut)
def update_project(
    project_id: int,
    project_in: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    project = db.query(Project).filter_by(id=project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    update_data = project_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(project, field, value)
    
    db.commit()
    db.refresh(project)
    return project

@router.delete("/projects/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db), current_user: AdminUser = Depends(get_current_admin)):
    project = db.query(Project).filter_by(id=project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project)
    db.commit()
    return {"success": True, "message": "Project deleted successfully"}

# 4. Case Studies
@router.get("/case-studies/{project_id}", response_model=CaseStudyOut)
def get_admin_case_study(project_id: int, db: Session = Depends(get_db), current_user: AdminUser = Depends(get_current_admin)):
    cs = db.query(CaseStudy).filter_by(project_id=project_id).first()
    if not cs:
        cs = CaseStudy(project_id=project_id)
        db.add(cs)
        db.commit()
        db.refresh(cs)
    return cs

@router.put("/case-studies/{project_id}", response_model=CaseStudyOut)
def update_admin_case_study(
    project_id: int,
    cs_in: CaseStudyUpdate,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    cs = db.query(CaseStudy).filter_by(project_id=project_id).first()
    if not cs:
        cs = CaseStudy(project_id=project_id)
        db.add(cs)
    
    update_data = cs_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(cs, field, value)
    
    db.commit()
    db.refresh(cs)
    return cs

# 5. Skills
@router.get("/skills", response_model=List[SkillCategoryOut])
def get_admin_skills(db: Session = Depends(get_db), current_user: AdminUser = Depends(get_current_admin)):
    return db.query(SkillCategory).order_by(SkillCategory.sort_order.asc()).all()

@router.post("/skills", status_code=status.HTTP_201_CREATED)
def create_skill(
    skill_in: SkillCreate,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    category = db.query(SkillCategory).filter_by(id=skill_in.category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Skill category not found")
    
    skill = Skill(**skill_in.model_dump())
    db.add(skill)
    db.commit()
    db.refresh(skill)
    return skill

@router.delete("/skills/{skill_id}")
def delete_skill(skill_id: int, db: Session = Depends(get_db), current_user: AdminUser = Depends(get_current_admin)):
    skill = db.query(Skill).filter_by(id=skill_id).first()
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    db.delete(skill)
    db.commit()
    return {"success": True, "message": "Skill deleted"}

# 6. Inquiries Management
@router.get("/inquiries", response_model=List[InquiryOut])
def list_inquiries(
    status_filter: Optional[str] = Query(None, alias="status"),
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    query = db.query(Inquiry)
    if status_filter:
        query = query.filter_by(status=status_filter)
    return query.order_by(Inquiry.created_at.desc()).all()

@router.patch("/inquiries/{inquiry_id}/status", response_model=InquiryOut)
def update_inquiry_status(
    inquiry_id: int,
    status_in: InquiryStatusUpdate,
    db: Session = Depends(get_db),
    current_user: AdminUser = Depends(get_current_admin)
):
    inquiry = db.query(Inquiry).filter_by(id=inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    
    inquiry.status = status_in.status
    if status_in.admin_notes is not None:
        inquiry.admin_notes = status_in.admin_notes
    
    db.commit()
    db.refresh(inquiry)
    return inquiry

@router.get("/inquiries/export.csv")
def export_inquiries_csv(db: Session = Depends(get_db), current_user: AdminUser = Depends(get_current_admin)):
    inquiries = db.query(Inquiry).order_by(Inquiry.created_at.desc()).all()
    
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["ID", "Name", "Email", "Project Type", "Budget", "Status", "Date", "Message", "Admin Notes"])
    
    for inq in inquiries:
        writer.writerow([
            inq.id,
            inq.name,
            inq.email,
            inq.project_type,
            inq.budget or "",
            inq.status,
            inq.created_at.strftime("%Y-%m-%d %H:%M:%S") if inq.created_at else "",
            inq.message,
            inq.admin_notes or ""
        ])
    
    output.seek(0)
    return Response(
        content=output.getvalue(),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=portfolio_inquiries.csv"}
    )
