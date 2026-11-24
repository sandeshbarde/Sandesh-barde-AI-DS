# Database Schema & Entity Relationships
**Database Engine:** PostgreSQL 15+ (Production) / SQLite 3 (Local testing & zero-setup dev)  
**ORM:** SQLAlchemy 2.0  
**Migrations:** Alembic  

---

## Entity Relational Schema

### 1. `admin_users`
- `id` (UUID / Integer, PK)
- `email` (String, Unique, Indexed)
- `hashed_password` (String, Argon2 Hash)
- `full_name` (String)
- `is_active` (Boolean, Default: True)
- `created_at` (DateTime, UTC)
- `last_login` (DateTime, Nullable)

### 2. `admin_sessions`
- `id` (UUID / Integer, PK)
- `user_id` (FK -> admin_users.id, ON DELETE CASCADE)
- `token_hash` (String, Unique, Indexed) — *Never store plain tokens*
- `expires_at` (DateTime, UTC)
- `created_at` (DateTime, UTC)
- `ip_address` (String, Nullable)
- `user_agent` (String, Nullable)

### 3. `profile_settings`
- `id` (Integer, PK)
- `full_name` (String, Default: "Sandesh Barde")
- `headline` (String, Default: "AI & Full Stack Developer")
- `bio` (Text)
- `location` (String, Default: "Pune, Maharashtra, India")
- `availability` (String, Default: "Open for Freelance Projects")
- `email` (String, Default: "sandeshbarde2214@gmail.com")
- `phone` (String, Default: "+91 9850751835")
- `github_url` (String, Nullable)
- `linkedin_url` (String, Nullable)
- `instagram_url` (String, Nullable)
- `twitter_url` (String, Nullable)
- `youtube_url` (String, Nullable)
- `resume_url` (String, Nullable)
- `updated_at` (DateTime, UTC)

### 4. `projects`
- `id` (Integer, PK)
- `slug` (String, Unique, Indexed)
- `title` (String)
- `tagline` (String)
- `description` (Text)
- `category` (String, Indexed) — e.g. "AI / ML", "Full Stack", "Cybersecurity", "Web Development"
- `technologies` (JSON / Array of Strings)
- `github_url` (String, Nullable)
- `demo_url` (String, Nullable)
- `image_url` (String, Nullable)
- `is_featured` (Boolean, Default: True)
- `is_published` (Boolean, Default: True)
- `sort_order` (Integer, Default: 0)
- `created_at` (DateTime, UTC)

### 5. `case_studies`
- `id` (Integer, PK)
- `project_id` (FK -> projects.id, ON DELETE CASCADE, Unique)
- `overview_pitch` (Text, Nullable)
- `problem_statement` (Text, Nullable)
- `objectives` (JSON / Array of Strings, Nullable)
- `architecture_flow` (JSON / Dict, Nullable) — e.g. Top pipeline stages and backend engines
- `technologies_used` (JSON / Array of Strings, Nullable)
- `key_features` (JSON / Array of Strings, Nullable)
- `challenges_solutions` (JSON / Array of Objects, Nullable)
- `outcomes_results` (Text, Nullable)
- `is_published` (Boolean, Default: True)
- `updated_at` (DateTime, UTC)

### 6. `skill_categories` & `skills`
- `skill_categories`:
  - `id` (Integer, PK)
  - `name` (String, Unique) — Frontend, Backend, AI / ML, Database, Tools & Platforms
  - `sort_order` (Integer, Default: 0)
- `skills`:
  - `id` (Integer, PK)
  - `category_id` (FK -> skill_categories.id, ON DELETE CASCADE)
  - `name` (String)
  - `description` (String)
  - `icon` (String, Nullable)
  - `sort_order` (Integer, Default: 0)

### 7. `services`
- `id` (Integer, PK)
- `title` (String)
- `tagline` (String)
- `deliverables` (JSON / Array of Strings)
- `tech_stack` (String)
- `sort_order` (Integer, Default: 0)
- `is_active` (Boolean, Default: True)

### 8. `experience_items` & `education_items` & `certificates`
- `experience_items`: `id`, `title`, `organization`, `period`, `description`, `sort_order`
- `education_items`: `id`, `institution`, `degree`, `period`, `details`, `sort_order`
- `certificates`: `id`, `title`, `issuer`, `credential_url`, `image_url`, `sort_order`

### 9. `inquiries`
- `id` (Integer, PK)
- `name` (String)
- `email` (String, Indexed)
- `project_type` (String)
- `budget` (String, Nullable)
- `message` (Text)
- `status` (Enum/String: "new", "read", "replied", "archived", Default: "new")
- `admin_notes` (Text, Nullable)
- `ip_address` (String, Nullable)
- `email_notified` (Boolean, Default: False)
- `created_at` (DateTime, UTC, Indexed)

### 10. `admin_audit_logs`
- `id` (Integer, PK)
- `user_id` (FK -> admin_users.id, ON DELETE SET NULL, Nullable)
- `action` (String) — e.g. "PROJECT_CREATE", "INQUIRY_STATUS_CHANGE"
- `entity_type` (String)
- `entity_id` (String, Nullable)
- `details` (JSON, Nullable)
- `ip_address` (String, Nullable)
- `created_at` (DateTime, UTC)
