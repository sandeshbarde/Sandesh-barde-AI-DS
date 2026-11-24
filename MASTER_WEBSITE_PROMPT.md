# MASTER PROMPT — Build Any Full Website, 0 → 100%

**How to use:** (1) Fill the BRIEF in Part A (2 minutes). (2) Paste Part B into an AI assistant. (3) When it finishes each phase, paste the matching follow-up from Part C. (4) Finish with Part D before launch.

---

## PART A — YOUR BRIEF (fill in, delete what doesn't apply)

```
PROJECT NAME:
TYPE:            (portfolio / business / store / SaaS landing / blog / school / restaurant / app / other)
OWNER / BRAND:
ONE-LINE GOAL:   (what must a visitor do? e.g. "contact me", "buy", "book a demo")
AUDIENCE:        (who, age, country, device they use most)
LANGUAGE(S):
PAGES / SECTIONS: (Home, About, Services, Projects, Pricing, Blog, Contact …)
REAL CONTENT I HAVE: (text, photos, logo, links, prices, testimonials — list them)
BRAND COLORS / FONTS / LOGO:   (or "choose for me")
STYLE REFERENCES: (3 websites I like + what I like about each)
FEATURES NEEDED: (forms, login, payments, search, dark mode, multi-language, blog, CMS …)
TECH PREFERENCE: (single HTML file / React / Next.js / WordPress / no preference)
HOSTING / DOMAIN:
DEADLINE / BUDGET:
MUST NOT HAVE:   (things I dislike)
```

---

## PART B — THE MASTER PROMPT (paste this)

```
ROLE
You are a team in one person: product strategist, UX researcher, senior UI designer,
principal front-end engineer, QA lead, SEO specialist and accessibility auditor.
Build me a complete, production-ready website from zero to 100%. Work in the phases
below and do not skip any. Think like a studio charging premium rates.

MY BRIEF
[PASTE PART A HERE]

NON-NEGOTIABLE RULES
1. Never invent facts: no fake testimonials, clients, numbers, awards, links or prices.
   Where real content is missing, use a clearly marked placeholder and list it at the end.
2. Deliver complete, working code. Never write "rest of code here" or leave TODOs inside code.
3. One source of truth for editable content (a config/data block at the top), so I can
   change text, links and contact details without touching layout code.
4. Mobile-first, responsive from 360px to 1920px, zero horizontal scroll.
5. Accessible (WCAG 2.2 AA): semantic HTML, labels, alt text, focus rings, 4.5:1 contrast,
   keyboard-only operation, reduced-motion support.
6. Fast: no render-blocking waste, optimized images, system-font fallbacks, no heavy libraries
   unless justified.
7. Honest forms: if there is no backend, say so and use mailto/service handoff. Never fake "sent!".
8. Security basics: no secrets in front-end code, sanitize any user-rendered text, rel="noopener" on
   external links, honeypot on forms.

PHASE 0 — DISCOVERY (ask me max 5 questions ONLY if the brief is truly unclear; otherwise
state your assumptions in 5 bullets and continue)

PHASE 1 — STRATEGY
- Define the single primary conversion goal and 2 secondary goals.
- Audience personas (2), their top 3 questions, and objections.
- Sitemap and page-by-page purpose. Content inventory: what exists vs what is missing.
- Unique positioning: one sentence that makes this site different from competitors.

PHASE 2 — UX STRUCTURE
- Wireframe each page in ASCII (desktop + mobile).
- Navigation model, section order, and the call-to-action placement on every screen.
- User flows for the main goal (visitor → action) with the fewest possible clicks.

PHASE 3 — VISUAL DESIGN SYSTEM
- Color palette (name + hex, 5–7 colors) with contrast ratios checked.
- Type scale (font pairing, sizes, weights, line heights).
- Spacing scale, radius, shadows, borders, grid, breakpoints.
- Components: buttons, cards, forms, nav, tabs, modals, badges, footer — with all states
  (hover, focus, active, disabled, error).
- Motion rules: what animates, duration, easing; one signature visual moment only.
- Express everything as CSS variables / design tokens.

PHASE 4 — COPYWRITING
- Write all real copy: headlines, subheads, CTAs, microcopy, error messages, SEO titles and
  meta descriptions. Plain, specific, benefit-led, active voice. No filler or buzzwords.
- Use only the content I provided; mark everything else as [PLACEHOLDER].

PHASE 5 — BUILD
- Produce the final code (file structure first, then every file in full).
- Semantic landmarks, one H1 per page, logical heading order.
- Data-driven rendering for repeating items (projects, services, products, posts).
- Interactions: sticky nav + scroll-spy, mobile menu, tabs/filters, modals with Esc/focus trap,
  forms with inline validation, copy-to-clipboard, smooth scroll, lazy loading.
- Defensive JS: guard every DOM lookup; one missing element must never break the page.

PHASE 6 — SEO & SHARING
- Title/description per page, canonical, Open Graph + Twitter cards, JSON-LD schema
  (Person/Organization/LocalBusiness/Product as relevant), sitemap.xml, robots.txt,
  favicon set, 404 page, clean URLs, alt text.

PHASE 7 — QUALITY ASSURANCE (you must actually run/describe results)
- Automated test script (Playwright) covering: console errors, duplicate ids, every link and
  anchor target, nav, tabs/filters, forms (empty, invalid, valid), modals, responsive overflow at
  390/768/1024/1456/1920, keyboard focus, reduced motion.
- Manual checklist, browser/device matrix, Lighthouse targets
  (Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95).
- Fix every failure, then re-run until 100 % passes. Show the final report.

PHASE 8 — DEPLOY & HANDOVER
- Step-by-step hosting guide (Netlify / Vercel / GitHub Pages / cPanel), custom domain + HTTPS,
  analytics (privacy-friendly), form backend options, backup plan.
- "How to edit" guide for a non-developer: where to change text, images, links, colors.
- Maintenance checklist (monthly) and a 30/60/90-day improvement roadmap.

OUTPUT FORMAT
1. Assumptions & missing-content list
2. Strategy + sitemap + wireframes
3. Design tokens
4. Complete code (every file, in full)
5. Test script + results table
6. Deployment + editing guide
Keep explanations short; spend the words on the deliverables.
```

---

## PART C — FOLLOW-UP PROMPTS (use after each phase)

**Redesign a section**
```
Redesign the [SECTION] to feel more [premium / playful / minimal / bold]. Keep the content and
tokens. Show the full updated code for that section only and explain what changed in 3 bullets.
```
**Match my reference image 100 %**
```
Here is a screenshot. Rebuild this section to match it as closely as possible: layout, spacing,
colors, icons, radii, glows, font sizes. Render it, compare with the screenshot, list every
remaining difference, and fix them.
```
**Debug**
```
Here is the bug: [describe]. Reproduce it, find the root cause (not just the symptom), fix it,
add a test that would have caught it, and confirm the full test suite still passes.
```
**Add a feature**
```
Add [feature] without breaking anything. State which files/sections change, implement it fully,
handle empty/error/loading states, make it accessible, and add tests.
```
**Performance pass**
```
Audit performance: image sizes, fonts, JS, CSS, layout shifts. List the top 10 fixes by impact,
apply them, and show before/after Lighthouse numbers.
```
**SEO pass**
```
Audit SEO for [target keywords + city/country]. Rewrite titles/descriptions/headings, add schema,
internal links and alt text, and give a 10-item content plan for ranking.
```
**Convert technology**
```
Convert this single-file site to [React/Next.js/Astro] with the same design and behaviour.
Keep content in data files, create reusable components, and keep all tests passing.
```
**Content help**
```
Write the copy for [page/section] in my voice: [3 adjectives]. Give 3 headline options, then the
full copy. Use only these facts: [facts]. Mark anything missing as [PLACEHOLDER].
```

---

## PART D — PRE-LAUNCH CHECKLIST (100 %)

**Content**
- [ ] All placeholders replaced with real text, photos, prices, links
- [ ] Spelling/grammar checked; contact details tested
- [ ] Legal pages if needed: Privacy Policy, Terms, Cookie notice

**Function**
- [ ] Every button and link works; forms deliver to the right inbox
- [ ] 404 page exists; favicon shows; print view acceptable

**Design**
- [ ] Looks right on phone, tablet, laptop, large monitor
- [ ] Fonts load; no layout jumps; images sharp but light

**Quality**
- [ ] Automated tests: 100 % pass
- [ ] Lighthouse targets met
- [ ] Keyboard-only and screen-reader pass

**SEO & sharing**
- [ ] Unique title + description per page; sitemap submitted to Google Search Console
- [ ] Link preview (Open Graph image) looks right on WhatsApp/LinkedIn

**Launch**
- [ ] HTTPS on; custom domain connected; www → non-www redirect
- [ ] Analytics installed; backup of source files saved
- [ ] Announce: LinkedIn, GitHub, resume, email signature

---

## QUICK START (copy-paste version for small projects)

```
Build a complete, responsive, accessible, SEO-ready [TYPE] website for [NAME] ([ONE-LINE GOAL]).
Audience: [AUDIENCE]. Pages: [PAGES]. Style: [STYLE]. Single index.html with all CSS/JS inline,
content in a config block at the top, no fake data, honest forms, and a Playwright test script
with a pass/fail report. Work in phases: strategy → wireframes → design tokens → copy → code →
SEO → tests → deployment guide. Return complete code, not snippets.
```
