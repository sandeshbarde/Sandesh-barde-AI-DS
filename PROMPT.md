# MASTER PROMPT — Sandesh Barde Portfolio (Pro Level)

Paste everything below into an AI coding assistant to rebuild this website from scratch.

---

## ROLE
You are a principal front-end engineer and UI designer. Build a **single-file, production-grade, fully working portfolio website** (`index.html`) for **Sandesh Barde — AI & Full Stack Developer**, Pune, Maharashtra, India. Pure HTML + CSS + vanilla JavaScript. No frameworks, no build step, no external images. Only allowed external resource: Google Fonts (Space Grotesk 400/500/700, Inter 400/500/600/700). The file must open by double-click and work offline (fonts fall back gracefully).

## DESIGN SYSTEM
**Theme:** deep-space neon purple. Glassmorphism cards, glowing borders, subtle starfield, 3D-tilt on hover (desktop only).
**Tokens (CSS variables on :root):** `--bg:#050014; --bg2:#0B071C; --card:#110C25; --p:#8B5CF6; --n:#A855F7; --b:#38BDF8; --pk:#D946EF; --t:#fff; --t2:#A1A1AA; --bd:rgba(168,85,247,.25)`.
**Gradient text (`.gs`):** purple `#A855F7` → blue `#38BDF8`. **Primary button:** `#7C3AED → #C026D3`.
**Type:** headings Space Grotesk 700; body Inter. Always provide fallback stacks (`system-ui, sans-serif`) — never let a heading fall back to serif.
**Cards:** radius 16–22px, 1px `--bd` border, `linear-gradient(160deg, rgba(60,24,130,.5), rgba(11,7,28,.92))`, outer glow `0 0 28px rgba(168,85,247,.28)`.
**Section header pattern:** pill label (`0N. NAME`), H2 with gradient last word, one-line subtitle, right-aligned stat cards with icons.
**Container:** `max-width:1380px`, `section{padding:96px 20px}`, `scroll-padding-top:76px`.

## GLOBAL REQUIREMENTS
1. Semantic HTML5: one `<h1>`, `<nav>`, `<main>`, `<section id>`, `<footer>`; `lang="en"`; meta description; viewport-fit=cover; favicon (inline data-URI of the SB chip logo).
2. Sticky floating **navbar pill**: logo mark (circuit-chip "SB" PNG, transparent) + name + "AI & Full Stack Developer"; links Home · About · Skills · Projects · Case Studies · Experience · Services · Contact; active link in magenta with glowing underline driven by `IntersectionObserver`; vertical divider; three square social icon buttons (GitHub, LinkedIn, Instagram). Burger menu below 900px that closes after a link click.
3. **Single config object** at top of script: `CFG = {email, phone, resume, github, linkedin, instagram, twitter, youtube}`. Empty value ⇒ icon renders as a non-link with a title tooltip. **Never invent links, stats, clients or testimonials.**
4. Accessibility: visible `:focus-visible` outline, labels on every field, `aria-live` on dynamic panels, alt text on all images, contrast ≥ 4.5:1, full keyboard operation, `prefers-reduced-motion` disables animations.
5. Responsive: 1920 / 1456 / 1024 / 768 / 390 px. **Zero horizontal overflow** (`html,body,main{overflow-x:clip}`; decorative glows must never cause sideways scroll).
6. Performance: whole file < 3 MB, images inline as optimized base64, no layout shift, animations via transform/opacity only.
7. No `localStorage` required. No tracking. No fake success states — forms open the visitor’s mail client via `mailto:` and say so.

## SECTIONS (build in this order)
### 01 Home (hero)
Eclipse glow at top, curved horizon line at bottom. Left: greeting, H1 with gradient name, role line, two-sentence bio, CTAs (**Download Resume**, **View Projects**), tech chips orbit. Right: portrait photo in a glowing ring with floating tech badges (React, Python, Node.js, AI, PostgreSQL, GitHub). “Scroll to explore” link.
### 02 About + 03 Skills
About: short real bio, location, availability, 3 stat cards. Skills: tabbed (Frontend, Backend, AI/ML, Database, Tools); each skill = name + one-line description; tab buttons with icons.
### 03 Projects (6 cards)
Filter tabs (All, AI/ML, Web Development, Full Stack, Cybersecurity). Cards: numbered badge, screenshot, title, tagline, tech tags, **GitHub** / **Live Demo** buttons (disabled-looking if no URL). Projects: JobLens AI, SentinelScan, ARES AI Assistant, AI Resume Screening, JalNirnay AI, aveXni.
### 04 Case Studies
Left rail “Select a Project” (6 buttons with icon, name, subtitle; active = purple→magenta gradient). Right detail panel: “Case Study 01 / 06”, big title with gradient last word, subtitle, pitch, 4 tech tags, screenshot with enlarge button (lightbox, closes on click/Esc). Tabs: Overview · Architecture · Development · Features · Challenges · Results. Overview grid: Problem Statement, Project Objective (✓ list), System Architecture (flow boxes with arrows + two backend boxes joined by connector lines), Technologies Used (2-col), Key Features, Challenges & Solutions (red challenge box → solution box), Project Outcome + buttons “View on GitHub ↗” / “Live Demo →”. Content for JobLens AI: Python, Scrapy, FastAPI, ChromaDB, Hugging Face, Streamlit; pipeline Job Data → Data Cleaning → AI Skill Tagger → Semantic Search → FastAPI Backend + Streamlit Dashboard. Other projects show only verified facts + an “add details” placeholder — do not fabricate.
### 05 My Journey
Header with mountain-and-flag graphic and 3 stat cards. Two panels: **Experience** (4 timeline items with icon tile, description, date pill: 2025–Present, 2024–Present, 2025, Ongoing) and **Education** (B.Tech AI & DS, Alard College of Engineering, Pune, 2024–2028; HSC 2023–2024; SSC 2021–2022) with a **Key Subjects** side box. **Certifications** strip with working ‹ › scroll arrows (Google Cloud Data Analytics, IBM Data Analyst, Coursera Generative AI, Google UX Design, AI Fundamentals & Prompt Engineering). **Journey Highlights** bar (5 items).
### 06 Services
Header with laptop hero, floating badges, handwritten “Let’s Build Something Amazing”, 4 pills. Four service cards (numbered 01–04, icon tile, deliverables with ✓, technologies with colored dots, **Get a Quote** that scrolls to and preselects the form): Full Stack Web Development · AI Integration & Automation · AI & ML Application Development · Technical Consulting. “Freelance Project Process” (Discovery → Planning → Development → Testing → Delivery). “Have a Project Idea?” form (type, name, email, details → mailto). CTA bar “Ready to Build Something Great?”.
### 07 Contact (“08. CONTACT” label)
Header with portrait in glowing ring + handwritten note + 4 feature icons. Three columns: **Get in Touch** (email & phone with copy-to-clipboard buttons, location Pune, availability, 5 social icons) · **Send a Message** (name, email, project-type select, budget select, message with live `0 / 500` counter, honeypot field, validation messages, gradient purple→cyan submit button, `mailto:` handoff) · **Why Work With Me?** (5 ✓ points + “Ready to Start?” card).
### Footer
Logo + tagline, quick links, back-to-top, auto-updating © year.

## JAVASCRIPT ARCHITECTURE
- Tiny helpers `$`, `el(html)`. Data-driven rendering: arrays `PJ` (projects), `KD` (case-study content + icons), `SK` (skills). Render functions must be idempotent and never throw on missing optional fields.
- Guard every `querySelector` result that might be absent (a single null error must never stop the rest of the script).
- Hover tilt only when `matchMedia('(hover:hover)')` and not reduced-motion.
- Scroll-spy via `IntersectionObserver` (`rootMargin:'-45% 0px -50% 0px'`).

## QUALITY BAR / DEFINITION OF DONE
Zero console errors · zero duplicate ids · every `href="#x"` resolves · no horizontal scroll at any tested width · all 6 projects × 6 tabs render · forms validate and never fake success · Lighthouse targets: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95. Run `test_site.py` (47 automated checks) and fix until 100 % pass.

## OUTPUT FORMAT
Return exactly one complete `index.html` in a single code block, then a short list of where to edit `CFG`, projects, and certificates. No placeholders like “…rest of code”.
