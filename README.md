# NS Creative — neezashyaka.com

The creative studio website of **Neeza Shyaka**, Kampala, Uganda.
Concept: **“Enter the Brand World.”** Cinematic, premium, built to close serious clients.

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
    ├── honda1.png             ← add when ready (graceful fallback until then)
    ├── honda2.png             ← add when ready
    ├── honda3.png             ← add when ready
    ├── akright1.png           ← add when ready
    ├── akright2.png           ← add when ready
    └── akright3.png           ← add when ready
```

### Image paths (exact — do not rename or move)

| Project | Path(s) |
|---|---|
| My Weekly Track | `assets/my-weekly-track.png` |
| Ssuubi Fellowship | `assets/ssuubi-fellowship.png` |
| Sun Over Africa | `assets/sun-over-africa.png` |
| Honda by Markh | `assets/honda1.png`, `assets/honda2.png`, `assets/honda3.png` |
| ACRA26 / Akright City Run | `assets/akright1.png`, `assets/akright2.png`, `assets/akright3.png` |

**Graceful fallback:** any missing image is detected automatically and replaced with a premium
CSS-built fallback (gradients, texture, typographic mark) — so no card ever looks broken.
The Honda and Akright cards are showing these fallbacks right now; drop the real PNGs into
`/assets/` with the exact names above and they appear instantly, including the carousels.

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

- **Headline** → `.hero__title` (the lines inside `<span class="line">`)
- **Studio statement** → the `.manifesto__text` section
- **Featured case study** → the `.featured` section
- **Project cards** → the `.bento` section; each `<button class="tile ...">` is one project
- **Case-study overlay content** → the `PROJECTS` object at the top of `script.js`
- **Services / Process / FAQ** → their named sections
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
