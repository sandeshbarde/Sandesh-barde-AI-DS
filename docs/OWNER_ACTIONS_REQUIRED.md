# Owner Actions Required Before Launch
**Owner:** Sandesh Barde  

This document tracks configuration items and files that only the site owner can supply:

### 1. Resume Document (PDF)
- **Current State**: Download button gracefully points to your GitHub profile or displays "Coming Soon" if unconfigured.
- **Action**: Place your finalized `sandesh-barde-resume.pdf` in `frontend/public/assets/` or provide an external drive/Cloudflare link in the Admin Dashboard (`Profile Settings -> Resume URL`).

### 2. SMTP Email Notifications (Optional)
- **Current State**: Inquiries are permanently stored in PostgreSQL and immediately accessible in the Admin Dashboard.
- **Action**: To receive an instant email notification every time a client submits an inquiry, add your SMTP credentials to `.env`:
  ```env
  MAIL_HOST=smtp.gmail.com
  MAIL_PORT=587
  MAIL_USERNAME=sandeshbarde2214@gmail.com
  MAIL_PASSWORD=your-app-password
  MAIL_FROM=sandeshbarde2214@gmail.com
  CONTACT_RECEIVER_EMAIL=sandeshbarde2214@gmail.com
  ```

### 3. Production Domain & Canonical URL
- **Current State**: `PUBLIC_SITE_URL` is left empty for local development.
- **Action**: Once deployed to Vercel/Render or your custom domain (e.g. `sandeshbarde.com`), update `PUBLIC_SITE_URL` in `.env`.

### 4. Optional Social Links (Twitter / YouTube)
- **Current State**: Kept hidden since no real links were supplied in the source.
- **Action**: If you launch a tech Twitter/X or YouTube channel, you can turn them on anytime via the Admin Dashboard (`/admin/profile`).
