import logging
from sqlalchemy.orm import Session
from app.models.models import (
    ProfileSettings, Project, CaseStudy, SkillCategory, Skill,
    Service, ExperienceItem, EducationItem, Certificate, AdminUser
)
from app.core.security import get_password_hash
from app.core.config import settings

logger = logging.getLogger("seed")

def seed_database(db: Session):
    """Seed verified facts and projects into the database idempotently."""
    logger.info("Checking database seed status...")

    # 1. Profile Settings
    profile = db.query(ProfileSettings).first()
    if not profile:
        profile = ProfileSettings(
            full_name="Sandesh Barde",
            headline="AI & Full Stack Developer",
            bio="B.Tech Artificial Intelligence & Data Science student and full-stack developer based in Pune, India. Passionate about engineering scalable web applications, machine learning workflows, and intelligent software systems.",
            location="Pune, Maharashtra, India",
            availability="Open for Freelance Projects",
            email="sandeshbarde2214@gmail.com",
            phone="+91 9850751835",
            github_url="https://github.com/sandeshbarde",
            linkedin_url="https://www.linkedin.com/in/sandesh-barde-26ba3839b",
            instagram_url="https://www.instagram.com/__sandy_gk_1_/",
            avatar_url="/assets/portrait.jpg",
            logo_url="/assets/sb-logo.png"
        )
        db.add(profile)
        logger.info("Profile settings seeded.")

    # 2. Skill Categories & Skills
    skills_data = {
        "Frontend": [
            ("React", "UI library for building interactive interfaces"),
            ("Next.js", "Production React framework with SSR/SSG"),
            ("JavaScript", "Modern ES6+ web development"),
            ("TypeScript", "Type-safe JavaScript for scalable codebases"),
            ("HTML5", "Semantic markup and accessibility"),
            ("CSS3", "Modern styling, flexbox, and grid layouts"),
            ("Tailwind CSS", "Utility-first modern CSS framework")
        ],
        "Backend": [
            ("Python", "General-purpose language for backend & AI"),
            ("FastAPI", "High-performance asynchronous Python REST APIs"),
            ("Node.js", "Asynchronous JavaScript runtime environment"),
            ("REST APIs", "Robust API architecture and integration")
        ],
        "AI / ML": [
            ("Machine Learning", "Statistical modeling and algorithms"),
            ("NLP", "Natural language processing and text mining"),
            ("Generative AI", "LLM-driven intelligent features and agents"),
            ("Hugging Face", "Model hub, pipelines, and transformer libraries"),
            ("LLM Integration", "Connecting AI models to real-world software"),
            ("Sentence Transformers", "Semantic search and text embedding generation")
        ],
        "Database": [
            ("PostgreSQL", "Robust ACID-compliant relational database"),
            ("MySQL", "Widely adopted relational database management"),
            ("SQLite", "Lightweight embedded database for apps & testing"),
            ("ChromaDB", "Fast vector database for AI embeddings")
        ],
        "Tools & Platforms": [
            ("Git", "Distributed version control system"),
            ("GitHub", "Code hosting, collaboration, and CI/CD"),
            ("VS Code", "Extensible primary code editor"),
            ("Docker", "Containerization and environment reproducibility"),
            ("Postman", "API testing, documentation, and automation"),
            ("Vercel", "Optimized cloud platform for frontend deployment")
        ]
    }

    for cat_order, (cat_name, skills_list) in enumerate(skills_data.items()):
        category = db.query(SkillCategory).filter_by(name=cat_name).first()
        if not category:
            category = SkillCategory(name=cat_name, sort_order=cat_order)
            db.add(category)
            db.flush()

        for sk_order, (s_name, s_desc) in enumerate(skills_list):
            existing_skill = db.query(Skill).filter_by(category_id=category.id, name=s_name).first()
            if not existing_skill:
                skill = Skill(
                    category_id=category.id,
                    name=s_name,
                    description=s_desc,
                    sort_order=sk_order
                )
                db.add(skill)

    # 3. Projects and Case Studies
    projects_data = [
        {
            "slug": "joblens-ai",
            "title": "JobLens AI",
            "tagline": "AI Labor Market Intelligence Platform",
            "description": "An AI-powered platform that analyzes job trends, required skills, and market demand patterns to help students and professionals discover optimal career trajectories.",
            "category": "AI / ML",
            "technologies": ["Python", "FastAPI", "Hugging Face", "ChromaDB", "Streamlit"],
            "github_url": "https://github.com/sandeshbarde/JobLens-AI",
            "demo_url": None,
            "image_url": "/assets/projects/joblens.jpg",
            "case_study": {
                "overview_pitch": "An AI-powered platform that analyzes real-time job postings, required skills, and industry demand patterns to help job seekers find opportunities matched to their capabilities.",
                "problem_statement": "Job seekers struggle to understand evolving market demand, identify trending skills, and locate high-relevance vacancies in real time.",
                "objectives": [
                    "Aggregate and parse dynamic job postings across sectors",
                    "Extract and categorize technical competencies using NLP models",
                    "Deliver semantic search over resumes and job requirements",
                    "Provide an intuitive interactive analytics dashboard"
                ],
                "architecture_flow": {
                    "pipeline": [
                        {"stage": "Job Data", "tool": "Scrapy"},
                        {"stage": "Data Cleaning", "tool": "Pandas"},
                        {"stage": "AI Skill Tagger", "tool": "Hugging Face"},
                        {"stage": "Semantic Search", "tool": "Sentence Transformers + ChromaDB"}
                    ],
                    "backend": ["FastAPI Asynchronous Engine", "Streamlit Analytics Dashboard"]
                },
                "technologies_used": ["Python", "Scrapy", "FastAPI", "ChromaDB", "Hugging Face", "Streamlit"],
                "key_features": [
                    "Automated web scraping and schema normalization pipeline",
                    "Semantic embeddings search for role-to-skill matching",
                    "Interactive market demand charts and vacancy clustering"
                ],
                "challenges_solutions": [
                    {"challenge": "Noisy unstructured job postings", "solution": "Built custom regex and Hugging Face entity recognition pipeline for automated cleaning"},
                    {"challenge": "Slow keyword matching at scale", "solution": "Implemented vector similarity search using ChromaDB and Sentence Transformers"}
                ],
                "outcomes_results": "Successfully deployed an end-to-end prototype providing sub-second semantic search over categorized job postings with accurate skill extraction."
            }
        },
        {
            "slug": "sentinelscan",
            "title": "SentinelScan",
            "tagline": "AI OWASP Vulnerability Scanner",
            "description": "A web vulnerability scanning framework that identifies security flaws, assesses risk severity, and suggests AI-assisted remediation guidelines.",
            "category": "Cybersecurity",
            "technologies": ["FastAPI", "Celery", "Redis", "Python"],
            "github_url": "https://github.com/sandeshbarde/SentinelScan",
            "demo_url": None,
            "image_url": "/assets/projects/sentinelscan.jpg",
            "case_study": {
                "overview_pitch": "Automated security scanning framework focusing on OWASP Top 10 web vulnerabilities with intelligent threat severity categorization.",
                "problem_statement": "Early-stage development teams frequently overlook critical web vulnerabilities prior to production deployment.",
                "objectives": ["Automate scan audits for OWASP Top 10 vulnerabilities", "Generate actionable AI-assisted security remediation guides"],
                "technologies_used": ["FastAPI", "Celery", "Redis", "Python", "Docker"],
                "key_features": ["Asynchronous queue execution for heavy security tests", "Detailed vulnerability breakdown report with CVSS scoring"],
                "challenges_solutions": [{"challenge": "Long-running network probe execution", "solution": "Offloaded scans to distributed Celery worker tasks backed by Redis"}]
            }
        },
        {
            "slug": "ares-ai-assistant",
            "title": "ARES AI Assistant",
            "tagline": "Intelligent Voice Assistant",
            "description": "A voice assistant powered by NLP and speech synthesis, enabling hands-free daily productivity and automated command execution.",
            "category": "AI / ML",
            "technologies": ["Python", "NLP", "SpeechRecognition", "Pyttsx3"],
            "github_url": "https://github.com/sandeshbarde/ARES-AI-Assistant",
            "demo_url": None,
            "image_url": "/assets/projects/ares.jpg",
            "case_study": {
                "overview_pitch": "Local and cloud-enabled voice interaction system for desktop automation, media control, and productivity queries.",
                "problem_statement": "Traditional desktop interfaces require manual navigation for recurring daily workflows.",
                "objectives": ["Implement fast speech-to-text and intent parsing", "Provide seamless desktop command routing"],
                "technologies_used": ["Python", "SpeechRecognition", "NLP", "Pyttsx3"]
            }
        },
        {
            "slug": "ai-resume-screening",
            "title": "AI Resume Screening",
            "tagline": "AI-Powered Recruitment System",
            "description": "An intelligent resume evaluation system that parses candidate resumes, computes match scores against job profiles, and extracts verified competencies.",
            "category": "Full Stack",
            "technologies": ["React", "FastAPI", "Machine Learning", "Python"],
            "github_url": "https://github.com/sandeshbarde/AI-Resume-Screening",
            "demo_url": None,
            "image_url": "/assets/projects/resume-screening.jpg",
            "case_study": {
                "overview_pitch": "Candidate screening portal enabling HR professionals to rank applicants based on semantic match against job descriptions.",
                "problem_statement": "Manual screening of hundreds of unstructured PDF resumes is error-prone and time-consuming.",
                "objectives": ["Automate PDF text extraction and normalization", "Calculate ranking scores based on TF-IDF and semantic similarity"],
                "technologies_used": ["React", "FastAPI", "scikit-learn", "Python"]
            }
        },
        {
            "slug": "jalnirnay-ai",
            "title": "JalNirnay AI",
            "tagline": "Smart Water Management Platform",
            "description": "An urban water management platform for municipal pipeline mapping, IoT sensor monitoring, predictive leak detection, and citizen incident alerts.",
            "category": "Full Stack",
            "technologies": ["React", "Node.js", "Supabase", "PostgreSQL"],
            "github_url": "https://github.com/sandeshbarde/JalNirnay-AI",
            "demo_url": None,
            "image_url": "/assets/projects/jalnirnay.jpg",
            "case_study": {
                "overview_pitch": "Civic utility tracking platform integrating geospatial mapping and sensor logs for municipal water distribution networks.",
                "problem_statement": "Water wastage through underground pipeline fractures goes unnoticed without real-time pressure monitoring.",
                "objectives": ["Visualize pipeline network topologies", "Provide real-time pressure fluctuation alerts to engineers"],
                "technologies_used": ["React", "Node.js", "Supabase", "Leaflet"]
            }
        },
        {
            "slug": "avexni",
            "title": "aveXni",
            "tagline": "Handmade Portraits E-Commerce",
            "description": "A modern portfolio and e-commerce web platform for bespoke handmade pencil portraits, featuring fluid animations and commission ordering.",
            "category": "Web Development",
            "technologies": ["React", "Vite", "TailwindCSS"],
            "github_url": "https://github.com/sandeshbarde/aveXni",
            "demo_url": "https://avexni.vercel.app",
            "image_url": "/assets/projects/avexni.jpg",
            "case_study": {
                "overview_pitch": "Production e-commerce storefront showcasing commissioned art, client portrait galleries, and custom commission requests.",
                "problem_statement": "Independent artists lack dedicated professional presentation platforms optimized for mobile commissions.",
                "objectives": ["Deliver sub-second page loads with modern gallery UX", "Enable direct commission ordering and custom dimensions selection"],
                "technologies_used": ["React", "Vite", "TailwindCSS", "Framer Motion"]
            }
        }
    ]

    for p_order, p_data in enumerate(projects_data):
        cs_data = p_data.pop("case_study", None)
        project = db.query(Project).filter_by(slug=p_data["slug"]).first()
        if not project:
            project = Project(sort_order=p_order, **p_data)
            db.add(project)
            db.flush()

        if cs_data:
            case_study = db.query(CaseStudy).filter_by(project_id=project.id).first()
            if not case_study:
                case_study = CaseStudy(project_id=project.id, **cs_data)
                db.add(case_study)

    # 4. Services
    services_data = [
        ("Full Stack Web Development", "Build responsive, scalable, and modern websites and web applications.", ["Responsive UI Architecture", "REST APIs & Database Integration", "Production Cloud Deployment"], "React · Node.js · FastAPI"),
        ("AI Integration & Automation", "Integrate AI models, LLMs, and intelligent automation into existing business systems.", ["LLM & Agent Integration", "Workflow & Data Automation", "Automated Testing & Validation"], "Python · Hugging Face · LLM APIs"),
        ("AI & ML Application Development", "Develop intelligent applications, ML training workflows, and data-driven solutions.", ["Data Pipeline & ETL", "Model-Backed Backend Applications", "Technical Documentation & Dashboards"], "Python · scikit-learn · ChromaDB"),
        ("Technical Consulting", "Architecture guidance, code reviews, technology stack selection, and full-stack support.", ["System Architecture Reviews", "Codebase Quality Audits", "Modern Technology Recommendations"], "Full Stack · AI · DevOps Basics")
    ]

    for s_order, (s_title, s_tagline, s_deliv, s_tech) in enumerate(services_data):
        service = db.query(Service).filter_by(title=s_title).first()
        if not service:
            service = Service(
                title=s_title,
                tagline=s_tagline,
                deliverables=s_deliv,
                tech_stack=s_tech,
                sort_order=s_order
            )
            db.add(service)

    # 5. Experience & Education & Certificates
    experiences = [
        ("Freelance Full Stack Developer", "Independent", "2024–Present", "Building bespoke responsive web applications, modern APIs, and client storefronts using React and Python."),
        ("AI & Data Science Student Lead", "Alard College of Engineering", "2024–Present", "Leading peer technical projects in machine learning, data structures, and algorithmic software engineering."),
        ("Open Source Contributor", "GitHub Community", "2024–Present", "Publishing open-source developer utilities, AI scripts, and web platforms.")
    ]
    for e_order, (e_title, e_org, e_period, e_desc) in enumerate(experiences):
        if not db.query(ExperienceItem).filter_by(title=e_title, organization=e_org).first():
            db.add(ExperienceItem(title=e_title, organization=e_org, period=e_period, description=e_desc, sort_order=e_order))

    education = [
        ("Alard College of Engineering, Pune", "B.Tech in Artificial Intelligence & Data Science", "2024–2028", "Core coursework: Data Structures, Database Systems, Artificial Intelligence, Python Programming."),
        ("Maharashtra State Board", "Higher Secondary Certificate (HSC) — Science", "2023–2024", "Major in Physics, Chemistry, and Mathematics."),
        ("Maharashtra State Board", "Secondary School Certificate (SSC)", "2021–2022", "Distinction in Mathematics and Science.")
    ]
    for ed_order, (ed_inst, ed_deg, ed_per, ed_det) in enumerate(education):
        if not db.query(EducationItem).filter_by(institution=ed_inst, degree=ed_deg).first():
            db.add(EducationItem(institution=ed_inst, degree=ed_deg, period=ed_per, details=ed_det, sort_order=ed_order))

    certificates = [
        ("Google Cloud Data Analytics Certificate", "Google Cloud", None),
        ("IBM Data Analyst Professional Certificate", "IBM", None),
        ("Generative AI Fundamentals", "Coursera", None),
        ("Google UX Design Professional Certificate", "Google", None),
        ("AI Fundamentals & Prompt Engineering", "DeepLearning.AI", None)
    ]
    for c_order, (c_title, c_issuer, c_url) in enumerate(certificates):
        if not db.query(Certificate).filter_by(title=c_title).first():
            db.add(Certificate(title=c_title, issuer=c_issuer, credential_url=c_url, sort_order=c_order))

    # 6. Admin Bootstrap
    if settings.ADMIN_BOOTSTRAP_EMAIL and settings.ADMIN_BOOTSTRAP_PASSWORD:
        admin = db.query(AdminUser).filter_by(email=settings.ADMIN_BOOTSTRAP_EMAIL).first()
        if not admin:
            admin = AdminUser(
                email=settings.ADMIN_BOOTSTRAP_EMAIL,
                hashed_password=get_password_hash(settings.ADMIN_BOOTSTRAP_PASSWORD),
                full_name="Sandesh Barde (Admin)"
            )
            db.add(admin)
            logger.info(f"Admin user bootstrapped: {settings.ADMIN_BOOTSTRAP_EMAIL}")

    db.commit()
    logger.info("Database seeding successfully verified.")
