# System Architecture & Design
**Project:** Sandesh Barde Full-Stack Portfolio & CMS  

```
+──────────────────────────────────────────────────────────────────────────+
│                           CLIENT BROWSER                                 │
│                                                                          │
│   ┌─────────────────────────────────┐   ┌────────────────────────────┐   │
│   │   Public Portfolio (React/TS)   │   │   Admin CMS Dashboard      │   │
│   │   - 8 Public Sections           │   │   - Protected via Session  │   │
│   │   - Responsive & Accessible     │   │   - Projects/Skills/Enq    │   │
│   │   - TanStack Query / Axios      │   │   - Metrics & Audit Log    │   │
│   └────────────────┬────────────────┘   └─────────────┬──────────────┘   │
+────────────────────┼──────────────────────────────────┼──────────────────+
                     │ HTTP / JSON                      │ Cookie Auth / JSON
                     ▼                                  ▼
+──────────────────────────────────────────────────────────────────────────+
│                       FASTAPI BACKEND SERVICE                            │
│                                                                          │
│   ┌──────────────────────────────────────────────────────────────────┐   │
│   │  API Routers (/api/v1)                                           │   │
│   │  - /public/* (Profile, Projects, Skills, Services, Inquiries)   │   │
│   │  - /admin/auth/* (Argon2 Hashed Login, Secure HttpOnly Session)  │   │
│   │  - /admin/* (Full CRUD & Status Management)                     │   │
│   └────────────────┬─────────────────────────────────────────────────┘   │
│                    │                                                     │
│   ┌────────────────┴────────────────┐   ┌────────────────────────────┐   │
│   │  Core Services & Security       │   │  Email Dispatch Adapter    │   │
│   │  - Rate Limiter & Honeypot      │   │  - Background SMTP task    │   │
│   │  - Input Validation (Pydantic)  │   │  - Failsafe DB logging     │   │
│   │  - CORS & Secure Headers        │   │                            │   │
│   └────────────────┬────────────────┘   └────────────────────────────┘   │
+────────────────────┼─────────────────────────────────────────────────────+
                     │ SQLAlchemy 2.0 ORM
                     ▼
+──────────────────────────────────────────────────────────────────────────+
│                         PERSISTENT DATABASE                              │
│                                                                          │
│   PostgreSQL (Production) / SQLite Fallback (Local Development)          │
│   - admin_users, admin_sessions, profile_settings                       │
│   - projects, case_studies, skill_categories, skills                     │
│   - services, experience_items, education_items, certificates           │
│   - inquiries, admin_audit_logs                                          │
+──────────────────────────────────────────────────────────────────────────+
```

### Key Architectural Highlights
1. **Decoupled Monorepo Structure**: `frontend/` handles the user presentation and client cache; `backend/` enforces validation, authentication, and database persistence.
2. **Resilient Public API**: Public read endpoints are fast, safe, and only expose published records.
3. **Failsafe Inquiry Processing**: Even if SMTP credentials are not configured or the email provider is temporarily unreachable, the inquiry is permanently committed to the database, ensuring zero lost leads.
4. **Zero Client-Side Secrets**: Admin tokens are never stored in `localStorage` or `sessionStorage`. Server-managed `HttpOnly`, `SameSite=Lax` cookies guard against XSS token theft.
