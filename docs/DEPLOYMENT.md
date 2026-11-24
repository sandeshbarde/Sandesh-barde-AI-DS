# Deployment & Operational Runbook
**Application:** Sandesh Barde — AI & Full Stack Developer Portfolio  
**Target Architecture:** FastAPI (Python 3.11+) + PostgreSQL + Vite React (TypeScript)  

---

## 1. Local Development (Windows 11 PowerShell)

### Prerequisites
- Node.js 18+ (https://nodejs.org)
- Python 3.11+ (https://www.python.org)
- Docker Desktop (Optional for Docker Compose route)

### Setup Commands
```powershell
# Run the automated setup script
.\scripts\setup.ps1

# Or run manually:
# Backend setup:
cd backend
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000

# Frontend setup (in a separate terminal):
cd frontend
cmd.exe /c "npm install"
cmd.exe /c "npm run dev"
```

### URLs
- **Public Portfolio:** http://localhost:5173
- **Admin Dashboard:** http://localhost:5173/admin/login
- **API Swagger Documentation:** http://127.0.0.1:8000/api/docs

---

## 2. Docker Compose Deployment (Single Host / VPS)

You can launch the complete production stack (PostgreSQL + FastAPI + Nginx Frontend) with one command:
```bash
docker compose up --build -d
```
All database tables, seed records, and admin credentials are automatically provisioned via the FastAPI lifespan startup event.

---

## 3. Cloud Production Deployment (Split Hosting)

### A. Frontend Hosting (Vercel)
1. Push the repository to GitHub.
2. In Vercel, import the repository and set the **Root Directory** to `frontend`.
3. Add Environment Variable:
   - `VITE_API_BASE_URL`: `https://api.yourdomain.com` (your backend URL)
4. Deploy!

### B. Backend API & PostgreSQL (Render / Railway / Fly.io)
1. Create a Managed PostgreSQL database instance on Render, Railway, or Supabase.
2. Deploy the `backend` directory as a Web Service.
3. Configure Environment Variables in the cloud dashboard:
   - `APP_ENV`: `production`
   - `DATABASE_URL`: `postgresql+psycopg://user:password@host:5432/dbname`
   - `SESSION_SECRET`: Long random 64-character hex string
   - `COOKIE_SECURE`: `true`
   - `FRONTEND_ORIGIN`: `https://yourportfolio.vercel.app`
   - `ADMIN_BOOTSTRAP_EMAIL`: `sandeshbarde2214@gmail.com`
   - `ADMIN_BOOTSTRAP_PASSWORD`: Strong master password
   - `CONTACT_RECEIVER_EMAIL`: `sandeshbarde2214@gmail.com`
   - `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`: Optional SMTP details

---

## 4. Admin Bootstrap & Credentials Management
The database automatically seeds an initial admin on first startup if configured in `.env`.
To reset or create a new administrator account at any time:
```python
from app.db.session import SessionLocal
from app.models.models import AdminUser
from app.core.security import get_password_hash

db = SessionLocal()
admin = db.query(AdminUser).filter_by(email="sandeshbarde2214@gmail.com").first()
if not admin:
    admin = AdminUser(email="sandeshbarde2214@gmail.com")
    db.add(admin)
admin.hashed_password = get_password_hash("NewSecurePasswordHere!")
db.commit()
print("Admin password successfully updated.")
```

---

## 5. Maintenance & Backup Routine
- **Database Backup**:
  `pg_dump -U portfolio_user -d sandesh_portfolio > backup_$(date +%Y%m%d).sql`
- **Inquiries Export**:
  Navigate to `/admin/dashboard` and click **Export CSV** to save inquiry records offline.
