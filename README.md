# Sandesh Barde — AI & Full Stack Developer Portfolio & CMS

Production-grade, full-stack personal developer portfolio and content management system for **Sandesh Barde** (Pune, Maharashtra, India). Built with **FastAPI**, **PostgreSQL**, **React (TypeScript)**, **Vite**, and **Tailwind CSS**.

---

## 🌟 Key Highlights

- **8 Rich Public Sections**: `#home`, `#about`, `#skills`, `#projects`, `#cases`, `#journey`, `#services`, `#contact` + sticky navbar and footer.
- **Cyberpunk / Deep-Space Aesthetic**: Obsidian background (`#050014`), glowing neon accents (`#8B5CF6`, `#A855F7`, `#38BDF8`, `#D946EF`), glassmorphism cards, and interactive canvas starfield.
- **Interactive Deep-Dive Lab**: 6 case studies with architectural flow diagrams and an expandable lightbox modal with keyboard Escape support.
- **Persistent Lead Capture**: Client inquiries submitted to FastAPI backend and saved to PostgreSQL, with anti-spam honeypot filtering and optional background email alerts.
- **Protected Admin CMS Dashboard**: `/admin/dashboard` protected by Argon2 authentication and secure HttpOnly session cookies for managing projects, skills, profile, and inquiries.
- **CSV Inquiry Export**: One-click export of all client inquiries directly from the dashboard.
- **Zero Horizontal Overflow**: Fully responsive from 360px mobile viewports up to 1920px ultrawide displays.

---

## 🏗️ Architecture & Project Structure

```
Sandesh barde AI&DS/
├── frontend/                     # React 18 + Vite + TypeScript + Tailwind
│   ├── public/assets/            # Extracted WebP/PNG/JPG images & logos
│   ├── src/
│   │   ├── components/           # Modular components by section
│   │   ├── pages/                # PortfolioPage, AdminDashboard, AdminLogin
│   │   ├── lib/api.ts            # Type-safe API client
│   │   └── styles/globals.css    # Neon tokens & glassmorphism utilities
│   ├── Dockerfile
│   └── package.json
│
├── backend/                      # Python 3.11+ FastAPI Service
│   ├── app/
│   │   ├── api/v1/               # Public & Admin API Routers
│   │   ├── core/                 # Config & Security (Argon2, Session Tokens)
│   │   ├── db/                   # Database engine & session management
│   │   ├── models/               # SQLAlchemy 2.0 ORM models
│   │   ├── schemas/              # Pydantic v2 validation models
│   │   └── services/             # Idempotent seed & email dispatcher
│   ├── Dockerfile
│   └── requirements.txt
│
├── docs/                         # Architecture, Security, API & QA specifications
│   ├── SOURCE_AUDIT.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   ├── API.md
│   ├── SECURITY.md
│   ├── DEPLOYMENT.md
│   ├── QA_REPORT.md
│   └── OWNER_ACTIONS_REQUIRED.md
│
├── scripts/                      # Windows PowerShell automated runner scripts
│   ├── setup.ps1
│   └── run-dev.ps1
│
├── legacy/                       # Untouched legacy prototypes and raw assets
│   ├── index-original.html
│   └── logo.jpg
│
├── docker-compose.yml            # Multi-container orchestration (Postgres, API, Web)
├── .env.example                  # Documented environment template
└── README.md
```

---

## 🚀 Quick Start (Windows 11 PowerShell)

### Automated Setup
```powershell
.\scripts\setup.ps1
.\scripts\run-dev.ps1
```

### Manual Setup
1. **Backend**:
   ```powershell
   cd backend
   py -m venv .venv
   .\.venv\Scripts\python.exe -m pip install -r requirements.txt
   .\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
   ```
2. **Frontend** (in another terminal):
   ```powershell
   cd frontend
   cmd.exe /c "npm install"
   cmd.exe /c "npm run dev"
   ```

### Docker Compose
```bash
docker compose up --build
```

---

## 🌐 URLs & Access Points
- **Public Portfolio:** http://localhost:5173
- **Owner Admin Portal:** http://localhost:5173/admin/login
- **Interactive Swagger Docs:** http://127.0.0.1:8000/api/docs

---

## 🔒 Security Standards
- Password hashing using Argon2.
- Session tokens stored in database as SHA-256 hashes only.
- Client authentication managed via `HttpOnly`, `SameSite=Lax` cookies.
- Honeypot anti-spam protection on contact form.
- Zero client-side token exposure.
