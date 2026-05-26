# NS Creative · neezashyaka.com · V10

The production build of Neeza Shyaka's studio portfolio.

## How to view

Unzip this folder. Open `index.html` in any browser. That's it.

```
neezashyaka-v10/
├── index.html
├── assets/
│   ├── my-weekly-track.png
│   ├── sun-over-africa.png
│   └── ssuubi-fellowship.png
└── README.md
```

No build step. No dependencies. One HTML file with embedded CSS and vanilla JS. Works offline (except web fonts, which fall back gracefully).

## How to deploy

Drop the contents into any static host:

- **Netlify**: drag the folder into netlify.com/drop → live in 30 seconds
- **Vercel**: `vercel --prod` from inside the folder
- **GitHub Pages**: push to a repo, enable Pages
- **GoDaddy / cPanel hosting**: upload via FTP to `public_html/`

## How to edit

The whole site is one file — `index.html`. Everything you'd reasonably want to change has a labelled comment block:

- `01 · DESIGN TOKENS` — change brand colors here
- `02 · RESET & BASE` — global type and body settings
- `07 · HERO` — change the headline copy
- `09 · MANIFESTO` — change the studio statement
- `10 · FEATURED · SUN OVER AFRICA` — the cinematic full-bleed feature
- `11 · WORK GRID` — add / edit / remove project cards
- `13 · SERVICES` — six disciplines
- `16 · FAQ` — change questions and answers
- `17 · CTA` — the lime contact section
- `18 · FOOTER` — the big closing type

To swap a logo, drop a new PNG into `/assets/` with the same filename, or update the `src=` path.

## What was upgraded from V2 → V10

1. **Hero** — now uses the studio's positioning line ("started on WhatsApp") front and center.
2. **Loader sequence** — branded 1s intro with animated count.
3. **Status bar** — always-on, with live Kampala time and rotating "now in studio" status.
4. **Now in Production ticker** — replaced generic marquee with live project status feed.
5. **Manifesto section** — added the studio's philosophy statement.
6. **Featured case (Sun Over Africa)** — full-bleed cinematic section with letterbox bars, gold haze, project specs.
7. **Work grid** — restructured into asymmetric rhythm with ACRA26 as a second featured full-bleed moment.
8. **Tools strip** — added the studio toolkit (Notion, Gemini, Claude, CapCut, etc.).
9. **FAQ section** — added "Working with NS" objection handling with expandable rows.
10. **Footer** — massive editorial typography reading "Built in Kampala. Aimed at the world."
11. **Custom cursor** — subtle dot on desktop, scales on interactive elements.
12. **Accessibility** — skip link, focus styles, `prefers-reduced-motion` respect, semantic HTML, JSON-LD schema.
13. **SEO** — full Open Graph, Twitter cards, JSON-LD Person schema.

## Pending assets (drop into /assets/ when ready)

- `akright1.png`, `akright2.png`, `akright3.png` — currently using a custom SVG of running figures inside the ACRA26 card. The SVG holds up but real photos would push harder. To swap: edit the `<svg class="c-acra__svg">` block inside the ACRA card and replace with `<img src="assets/akright1.png" alt="…" />`.
- `honda1.png`, `honda2.png`, `honda3.png` — currently a typographic treatment with diagonal motion lines. To swap: edit the `.c-honda` card and add an `<img>` element.

## Tech notes

- Fonts: Google Fonts (Fraunces, Hanken Grotesk, JetBrains Mono). Cached after first visit.
- All animations use CSS transforms / opacity (GPU-accelerated).
- Intersection Observer powers reveal-on-scroll.
- The cursor and parallax features auto-disable on touch devices and when `prefers-reduced-motion` is set.
- JSON-LD includes Person schema for SEO.

## Studio

Neeza Shyaka  
NS Creative · Kampala, Uganda  
shyakaneeza@gmail.com  
+256 762 193 386

© 2026 NS Creative · A division of NS Group
