# Security & Privacy Architecture
**Project:** Sandesh Barde Full-Stack Portfolio  

---

## 1. Authentication & Session Hygiene
- **Password Hashing**: Passwords stored using `argon2-cffi` with salt and memory-hardened parameters.
- **Session Tokens**: Cryptographically secure 256-bit random tokens generated via `secrets.token_urlsafe(32)`.
- **Database Token Storage**: Raw session tokens are **never** stored in the database. Only SHA-256 hashes of session tokens are stored (`token_hash`), preventing session hijacking even if database read dumps occur.
- **Cookie Security**:
  - `HttpOnly`: Strictly prevents access from JavaScript `document.cookie` (immune to XSS token theft).
  - `SameSite=Lax`: Defends against Cross-Site Request Forgery (CSRF).
  - `Secure`: Forced in production environments (`COOKIE_SECURE=true`).

---

## 2. Public Protection & Anti-Spam
- **Honeypot Filter**: The contact form features a hidden field (`hp`). Legitimate users and browser autofill ignore this field; bot scripts that blindly populate form inputs trigger a silent drop (returning HTTP 200 without saving spam to the database or firing emails).
- **Rate Limiting**: Public inquiry endpoints enforce client IP rate throttling to mitigate flood attacks.
- **Input Sanitization**: All form inputs are validated with strict bounds via Pydantic (Backend) and Zod (Frontend).
- **HTML Escaping**: User comments, inquiry bodies, and admin notes are rendered via React virtual DOM as plain text, stopping Cross-Site Scripting (XSS).

---

## 3. Privacy Policy & Confidentiality
- **Minimal Data Collection**: The public contact form collects only Name, Email, Project Type, optional Budget, and Message for professional inquiry purposes.
- **No Third-Party Tracking**: Zero invasive trackers, third-party analytics cookies, or client surveillance scripts.
- **Audit Logging**: Sensitive administrative actions (logins, deletions, edits) are logged in `admin_audit_logs`.
