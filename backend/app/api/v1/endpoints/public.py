from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.models import (
    ProfileSettings, Project, CaseStudy, SkillCategory, Skill,
    Service, ExperienceItem, EducationItem, Certificate
)
from app.schemas.schemas import (
    ProfileOut, ProjectOut, CaseStudyOut, SkillCategoryOut,
    ServiceOut, ExperienceOut, EducationOut, CertificateOut
)

router = APIRouter()

@router.get("/profile", response_model=ProfileOut)
def get_public_profile(db: Session = Depends(get_db)):
    profile = db.query(ProfileSettings).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile settings not initialized")
    
    projects_count = db.query(Project).filter_by(is_published=True).count()
    skills_count = db.query(Skill).count()
    
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
        projects_count=projects_count,
        skills_count=skills_count
    )

@router.get("/projects", response_model=List[ProjectOut])
def get_public_projects(category: Optional[str] = Query(None), db: Session = Depends(get_db)):
    query = db.query(Project).filter_by(is_published=True)
    if category and category.lower() != "all":
        query = query.filter(Project.category.ilike(f"%{category}%"))
    return query.order_by(Project.sort_order.asc(), Project.id.asc()).all()

@router.get("/projects/{slug}", response_model=ProjectOut)
def get_public_project_by_slug(slug: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter_by(slug=slug, is_published=True).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.get("/projects/{slug}/case-study", response_model=CaseStudyOut)
def get_public_case_study(slug: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter_by(slug=slug, is_published=True).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    case_study = db.query(CaseStudy).filter_by(project_id=project.id, is_published=True).first()
    if not case_study:
        raise HTTPException(status_code=404, detail="Case study details not published yet")
    return case_study

@router.get("/skills", response_model=List[SkillCategoryOut])
def get_public_skills(db: Session = Depends(get_db)):
    return db.query(SkillCategory).order_by(SkillCategory.sort_order.asc()).all()

@router.get("/services", response_model=List[ServiceOut])
def get_public_services(db: Session = Depends(get_db)):
    return db.query(Service).filter_by(is_active=True).order_by(Service.sort_order.asc()).all()

@router.get("/journey")
def get_public_journey(db: Session = Depends(get_db)):
    exp = db.query(ExperienceItem).order_by(ExperienceItem.sort_order.asc()).all()
    edu = db.query(EducationItem).order_by(EducationItem.sort_order.asc()).all()
    certs = db.query(Certificate).order_by(Certificate.sort_order.asc()).all()
    return {
        "experience": [ExperienceOut.model_validate(x) for x in exp],
        "education": [EducationOut.model_validate(x) for x in edu],
        "certificates": [CertificateOut.model_validate(x) for x in certs]
    }
