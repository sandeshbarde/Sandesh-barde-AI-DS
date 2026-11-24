# REST API Contract Specification
**Base URL:** `/api/v1`  
**Data Format:** `application/json`  

---

## Public Endpoints (Read-Only & Inquiry)

### `GET /api/v1/health`
- **Response:** `200 OK`
```json
{
  "status": "healthy",
  "database": "connected",
  "version": "1.0.0",
  "timestamp": "2026-11-23T09:00:00Z"
}
```

### `GET /api/v1/public/profile`
- **Response:** `200 OK`
- Returns public name, headline, bio, location, availability, verified social links, contact info, and counts.

### `GET /api/v1/public/projects`
- **Query params:** `category` (optional)
- **Response:** `200 OK` — List of published projects.

### `GET /api/v1/public/projects/{slug}/case-study`
- **Response:** `200 OK` — Full case study breakdown or graceful empty payload.

### `GET /api/v1/public/skills`
- **Response:** `200 OK` — Grouped dictionary of categories and skills.

### `GET /api/v1/public/services`
- **Response:** `200 OK` — List of active services with deliverables and technology tags.

### `GET /api/v1/public/journey`
- **Response:** `200 OK` — Combined experience timeline, education, and certificates list.

### `POST /api/v1/public/inquiries`
- **Rate Limit:** 5 requests / 10 minutes per IP
- **Request Body:**
```json
{
  "name": "Alex Johnson",
  "email": "alex@example.com",
  "project_type": "Full Stack Web Development",
  "budget": "$1,000 - $3,000",
  "message": "We would like to build an AI powered analytics portal.",
  "hp": ""
}
```
- **Validation Rules:**
  - `name`: 2–100 chars, trimmed.
  - `email`: valid RFC format.
  - `message`: 10–2000 chars.
  - `hp`: must be empty string (honeypot). If populated, silently accepted without persistence or notification.
- **Response:** `201 Created`
```json
{
  "success": true,
  "message": "Thank you! Your inquiry has been received. Sandesh will get back to you shortly."
}
```

---

## Admin Authentication & CMS Endpoints

### `POST /api/v1/admin/auth/login`
- **Request:** `{ "email": "...", "password": "..." }`
- **Response:** `200 OK`, sets HttpOnly cookie `admin_session`.

### `POST /api/v1/admin/auth/logout`
- **Response:** `200 OK`, clears cookie and revokes session in DB.

### `GET /api/v1/admin/auth/me`
- **Response:** `200 OK` `{ "email": "...", "full_name": "..." }`

### Admin Management Endpoints
- `GET/PUT /api/v1/admin/profile`
- `GET/POST /api/v1/admin/projects`
- `PUT/DELETE /api/v1/admin/projects/{id}`
- `GET/PUT /api/v1/admin/case-studies/{project_id}`
- `GET/POST/PUT/DELETE /api/v1/admin/skills`
- `GET/POST/PUT/DELETE /api/v1/admin/services`
- `GET/POST/PUT/DELETE /api/v1/admin/experience`
- `GET/POST/PUT/DELETE /api/v1/admin/certificates`
- `GET /api/v1/admin/inquiries` (supports pagination & status filter: new/read/replied/archived)
- `PATCH /api/v1/admin/inquiries/{id}/status`
- `POST /api/v1/admin/inquiries/{id}/note`
- `GET /api/v1/admin/inquiries/export.csv`
- `GET /api/v1/admin/stats` (Total projects, skills, certificates, unread inquiries)
