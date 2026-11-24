# Testing Guide — Sandesh Barde Portfolio

## 1. Automated (47 checks) — ~30 seconds
```bash
pip install playwright && playwright install chromium
python3 test_site.py index.html      # writes report.md
```
Covers: JS errors · duplicate ids · all 8 sections · every in-page link target · title/meta/favicon/alt/lang ·
all 8 nav links scroll correctly · 6 case studies × 6 tabs · lightbox open/Esc-close · project filters ·
certificate carousel · services quote preselect · contact validation (empty / bad email) · char counter ·
honeypot · copy button · field labels · single H1 · no horizontal overflow at 390/768/1024/1456/1920 ·
mobile burger open/close · reduced-motion · keyboard focus · file size.

## 2. Manual checklist (5 minutes)
- [ ] Fonts load (headings are sans-serif Space Grotesk, not serif)
- [ ] Logo + favicon show in tab; nav active link changes while scrolling
- [ ] Hover tilt on cards (desktop); no tilt on phone
- [ ] Set `CFG.github/linkedin/instagram/twitter/youtube` → icons become clickable, open new tab
- [ ] Set `CFG.phone` → contact page shows real number; copy button copies it
- [ ] Submit contact form with valid data → mail app opens with To = your email, subject/body filled
- [ ] Add real GitHub/Live URLs in `PJ[i].links` → buttons become links
- [ ] Print preview / zoom 200% still usable

## 3. Cross-browser / device matrix
Chrome, Edge, Firefox, Safari (macOS + iOS), Android Chrome · widths 360, 390, 768, 1024, 1440, 1920.

## 4. Lighthouse (Chrome DevTools → Lighthouse)
Targets: Performance ≥ 90 · Accessibility ≥ 95 · Best Practices ≥ 95 · SEO ≥ 95.

## 5. Accessibility
Tab through the entire page (focus ring visible, logical order) · screen-reader check of nav, forms and tabs · test with OS “reduce motion” enabled.

## 6. Before you publish
Replace placeholder phone · add real social/project/demo links · add resume PDF URL to `CFG.resume` ·
host on Netlify / Vercel / GitHub Pages · add a real domain + `<meta property="og:image">` for link previews.
