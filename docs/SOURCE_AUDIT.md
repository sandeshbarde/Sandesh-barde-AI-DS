# Source Audit & Migration Specification
**Project:** Sandesh Barde — AI & Full Stack Developer Portfolio  
**Audit Date:** November 2026  
**Auditor:** Principal Full-Stack & System Architect  

---

## 1. Overview of Inspected Source Files
1. **`legacy/index-original.html` & `legacy/index(1).html`**:
   - 667 lines, ~740 KB. Single-file architecture containing inline CSS, SVG icons, inline base64 images (logo, portrait, project screenshots, architecture flow), and vanilla JS logic.
   - 8 primary public sections: `#home`, `#about`, `#skills`, `#projects`, `#cases`, `#journey`, `#services`, `#contact`, plus navigation and footer.
2. **`logo.jpg` and `logo.png`**:
   - Both files are byte-for-byte identical (344,413 bytes). Both are JPEG files displaying the cyberpunk "SB" circuit board emblem over a baked-in checkerboard pattern (not genuine alpha channel).
   - In contrast, the inline logo inside `index(1).html` (`sb-logo.png`, 74,899 bytes) is a true 32-bit RGBA PNG with real alpha transparency.
3. **`MASTER_WEBSITE_PROMPT.md` & `PROMPT.md`**:
   - Prescribe the complete design system tokens, typography pairing (Space Grotesk + Inter), luxury cyberpunk aesthetic, and functional requirements.
4. **`test_site.py` & `report.md`**:
   - Legacy test suite covering 47 headless Playwright checks for the static HTML prototype.

---

## 2. Existing Page Structure & Navigation Baseline
- **Navigation (`<nav id="nav">`)**:
  - Brand lockup: Transparent SB circuit logo + "Sandesh Barde - AI & Full Stack Developer".
  - Links: `Home` (`#home`), `About` (`#about`), `Skills` (`#skills`), `Projects` (`#projects`), `Case Studies` (`#cases`), `Experience` (`#journey`), `Services` (`#services`), `Contact` (`#contact`).
  - Active section scroll-spy using `IntersectionObserver`.
  - Responsive mobile drawer with hamburger toggle button (`#bg`).
- **Hero (`#home`)**:
  - H1 headline: "Building the Future with Intelligent Technology" with gradient name highlight.
  - Role pill: "Full Stack & AI Developer".
  - CTAs: "Explore My Projects" (`#projects`) and "Download Resume" (currently pointing to GitHub profile; updated to a dedicated download CTA when real PDF is present).
  - Ambient glowing orbital rings with rotating technology badges (React, Python, Node.js, AI, PostgreSQL, GitHub).
  - Verified portrait of Sandesh Barde in formal suit with neon glow ring.
- **About (`#about`)**:
  - Summary bio: B.Tech Artificial Intelligence & Data Science student at Alard College of Engineering, Pune (2024–2028).
  - Location: Pune, Maharashtra, India.
  - Availability: Open for Freelance / Part-time / Collaboration.
  - Core statistics: Dynamic project count, skills count, and academic status.
- **Skills (`#skills`)**:
  - 5 categories: Frontend (7), Backend (4), AI / ML (6), Database (4), Tools & Platforms (6) — total 27 skills.
  - Interactive category filter tabs.
- **Projects (`#projects`)**:
  - 6 verified projects:
    1. *JobLens AI* (AI Labor Market Intelligence Platform)
    2. *SentinelScan* (AI OWASP Vulnerability Scanner)
    3. *ARES AI Assistant* (Intelligent Voice Assistant)
    4. *AI Resume Screening* (AI-Powered Recruitment System)
    5. *JalNirnay AI* (Smart Water Management Platform)
    6. *aveXni* (Handmade Portraits E-Commerce)
  - Categories: All, AI / ML, Web Development, Full Stack, Cybersecurity.
  - Project cards feature numbered badges, screenshot thumbnails, tech tags, GitHub links, and live demo buttons (e.g. `https://avexni.vercel.app`).
- **Case Studies (`#cases`)**:
  - Left project rail (6 selectors) + Right detail panel with 6 tabs: *Overview*, *Architecture*, *Development*, *Features*, *Challenges*, *Results*.
  - Full JobLens AI architectural pipeline: Job Data (Scrapy) → Data Cleaning → AI Skill Tagger (Hugging Face) → Semantic Search (Sentence Transformers + ChromaDB) → FastAPI Backend + Streamlit Dashboard.
  - Lightbox modal (`#klb`) with Escape key trap.
- **My Journey (`#journey`)**:
  - Experience timeline (Freelance Developer, Open Source Contributor, AI Project Lead).
  - Education (Alard College of Engineering Pune, HSC, SSC).
  - Certifications carousel with prev/next navigation controls.
- **Services (`#services`)**:
  - 4 services: Full Stack Web Development, AI Integration & Automation, AI & ML Application Development, Technical Consulting.
  - 5-step process: Discovery → Planning → Development → Testing → Delivery.
  - "Get a Quote" preselects project type in the enquiry form.
- **Contact (`#contact`)**:
  - Get in touch cards: Email (`sandeshbarde2214@gmail.com`), Phone (`+91 9850751835`), Location, Availability.
  - Working copy-to-clipboard buttons.
  - Form: Name, Email, Project Type, Budget, Message with live 0/500 character counter.
  - Anti-spam honeypot input (`#hp`).
- **Footer**:
  - Brand lockup, quick links, back-to-top button, auto-updating copyright year.

---

## 3. Discovered Flaws & Architectural Deficits in Legacy Source
1. **No Real Backend or Persistent DB**:
   - The contact form simply fired `mailto:` links, which fails if the visitor lacks a configured desktop email client.
2. **Hardcoded Static Arrays**:
   - Projects, skills, case studies, and services were hardcoded inside a monolithic JavaScript tag.
3. **No Protected Content Management System**:
   - The owner could not add projects, edit skills, view received enquiries, or modify profile details without manual HTML editing.
4. **Checkerboard Pattern in Raw Logo Files**:
   - `logo.jpg` and `logo.png` had a baked-in faux transparency pattern. The genuine transparent PNG extracted from the HTML (`sb-logo.png`) solves this cleanly.
5. **Huge Monolithic HTML File Size**:
   - The 740 KB single HTML file contained mega-byte base64 strings inlining images, harming browser cacheability and initial paint times.

---

## 4. Migration & Component Map

| Legacy Element | Target Full-Stack Implementation | Location |
| :--- | :--- | :--- |
| Single `index.html` structure | React 18 + Vite + TypeScript SPA | `frontend/src/pages/PortfolioPage.tsx` |
| Design Tokens (`:root`) | Tailwind Config + Custom CSS Variables | `frontend/src/styles/globals.css` |
| Floating Navbar & Mobile Menu | `Navbar` component with Lucide icons | `frontend/src/components/layout/Navbar.tsx` |
| Starfield Canvas & Eclipse | `StarfieldCanvas` & `HeroVisual` | `frontend/src/components/home/Hero.tsx` |
| Skills Category Tabs | `SkillsSection` with API hydration | `frontend/src/components/skills/SkillsSection.tsx` |
| Projects Grid & Filters | `ProjectsSection` + `ProjectCard` | `frontend/src/components/projects/ProjectsSection.tsx` |
| Case Study Deep-Dive & Modal | `CaseStudiesSection` + `LightboxModal` | `frontend/src/components/case-studies/CaseStudiesSection.tsx` |
| Journey & Cert Carousel | `JourneySection` + `CertCarousel` | `frontend/src/components/journey/JourneySection.tsx` |
| Services & Quote CTA | `ServicesSection` | `frontend/src/components/services/ServicesSection.tsx` |
| Contact Form & Copy Badges | `ContactSection` (Zod + React Hook Form) | `frontend/src/components/contact/ContactSection.tsx` |
| Contact Submission & Storage | FastAPI `POST /api/v1/public/inquiries` | `backend/app/api/v1/endpoints/inquiries.py` |
| Public Dynamic Data | FastAPI `GET /api/v1/public/*` | `backend/app/api/v1/endpoints/public.py` |
| Admin Authentication | Argon2 + Secure HttpOnly Session Cookies | `backend/app/api/v1/endpoints/auth.py` |
| Admin CRUD / CMS | Protected React Dashboard + FastAPI Admin API | `frontend/src/pages/admin/*` & `backend/app/api/v1/endpoints/admin.py` |
| Database Storage | PostgreSQL / SQLite + SQLAlchemy 2.0 ORM | `backend/app/models/*` |
| Extracted Static Assets | WebP/PNG/JPG in public asset folder | `frontend/public/assets/*` |

---

## 5. Non-Negotiable Content & Data Integrity
- No fabricated testimonials, awards, or fake company logos.
- Real verified contacts: `sandeshbarde2214@gmail.com`, `+91 9850751835`, GitHub (`sandeshbarde`), LinkedIn (`sandesh-barde-26ba3839b`), Instagram (`__sandy_gk_1_`).
- Missing case study architecture flows and results for projects 2–6 remain marked as "Details coming soon" and editable through the Admin CMS.
