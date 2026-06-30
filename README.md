# NS Creative — neezashyaka.com

The creative studio website of **Neeza Shyaka**, Kampala, Uganda.
Concept: **“Enter the Brand World.”** Premium, editorial, built to close serious clients —
a clean white canvas carried by a single Omnitrix-green signal.

---

## Design system (v10 · "White Studio")

- **Surfaces** — pure white `#FFFFFF` with soft green-grey panels (`#F5F7F3`); a deep-ink
  footer (`#0A0E0B`) bookends the page, and the closing CTA is a full Omnitrix-green block.
- **Signal colour** — Ben 10 / Omnitrix green `#1ECE43` (punchier on wide-gamut displays via
  `oklch`). A deeper `#0A7D2B` is used for any green **text/links** so it stays AA-legible on white.
- **Type** — Space Grotesk (display), Inter (body/UI), Fraunces italic (serif emphasis).
- **Motion** — loader, masked hero reveal, scroll reveals, magnetic buttons, image parallax,
  case-study slide-over, FAQ accordion, live Kampala clock. All disabled under
  `prefers-reduced-motion` and on touch devices.

---

## Open it locally

No build step. No dependencies (except Google Fonts, which load from the web).

1. Unzip the folder.
2. Double-click `index.html` — it opens in any browser.

For the cleanest experience (fonts, fetch, etc.), you can also run a tiny local server:

```bash
# Python 3
python3 -m http.server 8000
# then open http://localhost:8000

# or Node
npx serve
```

---

## File structure

```
ns-creative/
├── index.html        ← markup, all 16 sections
├── style.css         ← full cinematic design system
├── script.js         ← all interactions + case-study overlay
├── README.md         ← this file
└── assets/
    ├── my-weekly-track.png    ✓ included
    ├── ssuubi-fellowship.png  ✓ included
    ├── sun-over-africa.png    ✓ included
    ├── honda1.png             ✓ included
    ├── honda2.png             ✓ included
    ├── honda3.png             ✓ included
    ├── akright1.png           ✓ included
    ├── akright2.png           ✓ included
    └── akright3.png           ✓ included
```

> **Note:** `honda1.png` / `honda2.png` were originally HEIC (iPhone) files with a `.png`
> extension, which browsers can't decode — they've been converted to real web-decodable
> JPEGs (keeping the `.png` filename, since browsers sniff image content). When exporting
> new photos, always export to JPEG/PNG/WebP — never just rename a `.heic`/`.HEIC` file.

### Image paths (exact — do not rename or move)

| Project | Path(s) |
|---|---|
| My Weekly Track | `assets/my-weekly-track.png` |
| Ssuubi Fellowship | `assets/ssuubi-fellowship.png` |
| Sun Over Africa | `assets/sun-over-africa.png` |
| Honda by Markh | `assets/honda1.png`, `assets/honda2.png`, `assets/honda3.png` |
| ACRA26 / Akright City Run | `assets/akright1.png`, `assets/akright2.png`, `assets/akright3.png` |

**Graceful fallback:** all project images ship in this repo, so every card shows real artwork.
The fallback is now a safety net — if any image ever fails to load (or you remove one), it's
detected automatically and replaced with a premium CSS-built mark (light gradient + green
typographic logo) so no card looks broken. Carousels drop any failed frame and keep cycling
whatever loads; a card only falls back when *none* of its images load.

---

## Replace / add project images

1. Export your image as a PNG.
2. Name it **exactly** as listed above.
3. Drop it into the `assets/` folder, replacing any existing file.
4. Refresh the page. Done — the card swaps from fallback art to your image automatically.

Honda and ACRA26 cards each cycle through their three images as a carousel once all are present.

---

## Edit the copy

Everything lives in `index.html`, in clearly-commented section blocks
(e.g. `<!-- ═══ HERO ═══ -->`). To change wording, edit the text between the tags.

Common edits:

- **Headline** → `.hero__title` (the masked lines inside `<span class="m"><span class="w">…`)
- **Studio statement** → the `.manifesto__text` section
- **Project cards** → the `.work` section's `.grid`; each `<button class="proj …">` is one project
- **Case-study overlay content** → the `PROJECTS` object at the top of `script.js`
- **Services / Process / Studio / FAQ** → their named sections
- **Contact email** → search for `info@neezashyaka.com` (used in nav, hero, CTA, footer)

The email CTA everywhere points to:
`mailto:info@neezashyaka.com?subject=Project%20Meeting%20with%20NS%20Creative`

---

## Deploy

Any static host works. Easiest options:

- **Netlify** — drag the unzipped folder onto [app.netlify.com/drop](https://app.netlify.com/drop). Live in ~30 seconds.
- **Vercel** — run `vercel` (or `vercel --prod`) inside the folder.
- **GitHub Pages** — push the folder to a repo, enable Pages on the main branch.
- **GoDaddy / cPanel** — upload the folder contents to `public_html/` via FTP.

Then point `neezashyaka.com` at the host. After deploying, update the `og:url` meta tag
in `index.html` if the final domain differs.

---

## Animation & interaction system

- Cinematic loader with 000→100 counter (under 1.2s) and progress bar
- Hero masked line-by-line text reveal + mouse-following aura + grain
- Smooth IntersectionObserver scroll reveals throughout
- Magnetic buttons (desktop)
- Custom cursor that scales on interactive elements (desktop)
- 3D card tilt + cursor-follow glow on work tiles (desktop)
- Honda & Akright image carousels (auto-cycle when images present)
- Featured case study image stack with clickable dots
- Infinite capability marquee (slows on hover)
- FAQ accordion (one open at a time, animated height)
- Full-screen case-study overlay (slide-in panel) driven by the `PROJECTS` data
- Mobile menu with clip-path reveal + staggered links
- Nav background adapts over dark vs. paper sections
- Rotating "now in studio" status + live Kampala clock

---

## Accessibility

- Skip link to main work
- Semantic HTML and ordered headings
- Real `<button>`s for accordions, tiles, and the overlay
- Visible focus states (lime ring)
- `aria-expanded`, `aria-controls`, `aria-modal`, `aria-hidden` where relevant
- **Escape** closes the mobile menu and the case-study overlay
- Focus returns to the triggering card after the overlay closes; basic focus containment inside the overlay
- Body scroll locks while menu/overlay is open
- Full `prefers-reduced-motion` support: disables the cursor, tilt, carousels, marquee, and reveal animations, and shows all content immediately
- Heavy pointer effects (cursor, tilt, magnetic, aura) auto-disable on touch devices

---

## Reduced motion

If a visitor has "reduce motion" enabled in their OS, the site automatically:
serves content with no entrance animations, freezes the marquee, hides the custom cursor,
disables 3D tilt and carousels, and keeps everything fully readable and usable.

---

## SEO

- Descriptive `<title>` and meta description
- Open Graph + Twitter card tags
- JSON-LD `Organization` schema (with founder `Person`)
- Clean semantic structure and heading order

---

© 2026 NS Creative · A division of NS Group · Built in Kampala. Aimed at the world.
