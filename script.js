/* ═══════════════════════════════════════════════════════════════
   NS CREATIVE — script.js  ·  v10 "White Studio"
   Vanilla ES6+. No libraries. Hand-written animation math.
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE    = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const DESKTOP = matchMedia('(min-width: 1025px)').matches;

  /* ─────────── PROJECT DATA ─────────── */
  /* Light-theme artwork tokens: green-wash #E9FBED · mute #ECEFE8 · soft #F0FBF1
     green-ink #0A7D2B · green-deep #075E20 · ink #0A0E0B */
  const PROJECTS = {
    acra26: {
      cat: 'Campaign · Event Identity', title: 'Akright City Run · ACRA26',
      theme: 'Unganisha — one thread, one city, one run.',
      desc: 'NS Creative designed the complete campaign identity — a single continuous thread tracing every runner into one moving city. Kit design, countdown series, sponsor materials, and a visual system engineered for motion and public energy.',
      meta: { Role: 'Campaign Identity / Kit / System', Output: '60+ visuals', Location: 'Akright City', Year: '2026' },
      images: ['assets/akright1.png', 'assets/akright2.png', 'assets/akright3.png'],
      art: { t: 'ACRA26', bg: 'linear-gradient(150deg,#E9FBED,#ECEFE8)', c: '#0A7D2B' }
    },
    mwt: {
      cat: 'SaaS · Brand & UI', title: 'My Weekly Track',
      theme: 'Performance, made visible.',
      desc: 'NS Creative engineered the complete brand identity and product UI for a performance-tracking SaaS built for East African organisations — logo, colour system, interface, and launch positioning.',
      meta: { Role: 'Brand Identity / UI Direction', Output: 'Brand + product system', Sector: 'SaaS', Year: '2026' },
      images: ['assets/my-weekly-track.png'],
      link: { label: 'Visit myweeklytrack.com', href: 'https://myweeklytrack.com' },
      art: { t: 'MWT', bg: 'linear-gradient(150deg,#E9FBED,#ECEFE8)', c: '#0A7D2B' }
    },
    soa: {
      cat: 'AI Film · Brand World', title: 'Sun Over Africa',
      theme: 'A Ugandan film, built scene by scene.',
      desc: 'NS Creative built the cinematic brand world for an AI-produced Ugandan film — title treatment, identity, and the visual atmosphere of the production. Gold light over deep black, made entirely in Kampala.',
      meta: { Role: 'Brand World / AI Production', Output: 'Identity + scene system', Sector: 'Film', Year: '2026' },
      images: ['assets/sun-over-africa.png'],
      art: { t: 'SUN', bg: 'radial-gradient(circle at 50% 45%,#E9FBED,#ECEFE8 72%)', c: '#075E20' }
    },
    ssuubi: {
      cat: 'Faith · Identity', title: 'Ssuubi Fellowship',
      theme: 'Hope, peace, and growth.',
      desc: 'NS Creative shaped a calm, premium identity system for a faith community — warm tones, gold light, and a steady typographic voice built around hope, peace, and growth.',
      meta: { Role: 'Identity System / Social', Output: '16 visuals / month', Sector: 'Faith', Year: '2026' },
      images: ['assets/ssuubi-fellowship.png'],
      art: { t: 'Ssubi', bg: 'radial-gradient(circle at 60% 30%,#E9FBED,#ECEFE8 72%)', c: '#0A7D2B' }
    },
    retro: {
      cat: 'Event · Campaign', title: 'Retro Wave',
      theme: 'CRT texture, posters, rhythm, motion.',
      desc: 'NS Creative built a campaign system charged with CRT texture, vintage poster rhythm, and motion — controlled nostalgia with premium execution, alive without tipping into cliché.',
      meta: { Role: 'Campaign Creative Direction', Output: 'Poster + social system', Sector: 'Events', Year: '2026' },
      images: [],
      art: { t: 'RETRO WAVE', bg: 'linear-gradient(150deg,#ECEFE8,#F0FBF1)', c: '#0A7D2B' }
    },
    honda: {
      cat: 'Automotive · Campaign', title: 'Honda by Markh',
      theme: 'Speed, rhythm, high-contrast motion.',
      desc: 'NS Creative directed a high-contrast automotive campaign system — a black-and-red visual language built around dashboard energy and cinematic intensity, designed to make the cars feel fast even when still.',
      meta: { Role: 'Campaign Direction / Social', Output: 'Ongoing content system', Sector: 'Automotive', Year: '2026' },
      images: ['assets/honda1.png', 'assets/honda2.png', 'assets/honda3.png'],
      art: { t: 'HONDA', bg: 'linear-gradient(135deg,#ECEFE8,#E9FBED)', c: '#0A0E0B' }
    }
  };

  /* ─────────── STATE ─────────── */
  let locked = false;
  let smoothCurrent = null;          // lerped scroll position when smooth active
  const nav = $('#nav');

  /* ─────────── SCROLL-DRIVEN UI (nav state) ─────────── */
  let lastY = 0;
  function onScroll() {
    const y = smoothCurrent != null ? smoothCurrent : window.scrollY;
    if (!nav) return;
    nav.classList.toggle('solid', y > 40);

    // hide on scroll-down, reveal on scroll-up (not while a layer is open)
    if (!locked) {
      if (y > lastY && y > 260) nav.classList.add('hide');
      else nav.classList.remove('hide');
    }
    lastY = y;
  }

  /* ─────────── SMOOTH SCROLL (Lerp engine) ─────────── */
  function initSmooth() {
    const wrap = $('#smooth');
    if (!wrap) return;
    document.documentElement.classList.add('has-smooth');

    let current = window.scrollY || 0;
    let target = current;

    const setHeight = () => { document.body.style.height = wrap.getBoundingClientRect().height + 'px'; };
    setHeight();

    if ('ResizeObserver' in window) new ResizeObserver(setHeight).observe(wrap);
    addEventListener('resize', setHeight);
    addEventListener('load', setHeight);

    const frame = () => {
      if (!locked) target = window.scrollY;
      current = lerp(current, target, 0.085);
      if (Math.abs(target - current) < 0.06) current = target;
      smoothCurrent = current;
      wrap.style.transform = `translate3d(0, ${-current}px, 0)`;
      onScroll();
      requestAnimationFrame(frame);
    };
    frame();
  }

  /* ─────────── ANCHOR NAVIGATION ─────────── */
  function go(hash) {
    const el = $(hash);
    if (!el) return;
    if (smoothCurrent != null) {
      const dest = el.getBoundingClientRect().top + smoothCurrent - 70;
      scrollTo(0, Math.max(0, dest));
    } else {
      const dest = scrollY + el.getBoundingClientRect().top - 70;
      scrollTo({ top: Math.max(0, dest), behavior: REDUCED ? 'auto' : 'smooth' });
    }
  }

  /* ─────────── LOADER ─────────── */
  function initLoader() {
    const el = $('#loader'), num = $('#loader-num'), fill = $('#loader-fill');
    const dur = REDUCED ? 250 : 1050, t0 = performance.now();
    const tick = (now) => {
      const t = clamp((now - t0) / dur, 0, 1);
      const e = 1 - Math.pow(1 - t, 3);
      if (num)  num.textContent = String(Math.round(e * 100)).padStart(3, '0');
      if (fill) fill.style.width = (e * 100) + '%';
      if (t < 1) requestAnimationFrame(tick);
      else {
        setTimeout(() => el && el.classList.add('done'), 160);
        setTimeout(() => {
          el && el.remove();
          if (DESKTOP && !REDUCED) initSmooth();
          startHero();
        }, 900);
      }
    };
    requestAnimationFrame(tick);
  }

  /* ─────────── HERO ENTRANCE (kinetic) ─────────── */
  function startHero() {
    const title = $('.hero__title');
    title && title.classList.add('in');
    $$('.hero [data-reveal]').forEach(el => el.classList.add('in'));
  }

  /* ─────────── REVEALS (IntersectionObserver) ─────────── */
  function initReveals() {
    const els = $$('[data-reveal]').filter(e => !e.closest('.hero'));
    if (REDUCED || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    els.forEach(e => io.observe(e));

    // project tiles also use .in for clip/scale reveal
    const projIO = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); projIO.unobserve(e.target); } });
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
    $$('.proj').forEach(p => projIO.observe(p));
  }
  function revealProjectsFallback() {
    if (REDUCED) $$('.proj').forEach(p => p.classList.add('in'));
  }

  /* ─────────── CUSTOM CURSOR ─────────── */
  function initCursor() {
    if (!FINE || REDUCED) return;
    const cur = $('#cursor'), label = $('#cursor-label');
    if (!cur) return;
    let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y;
    addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; }, { passive: true });

    const overSel = 'a, button, [data-cursor]';
    document.addEventListener('mouseover', e => {
      const t = e.target.closest(overSel);
      if (!t) return;
      const tag = t.getAttribute('data-cursor');
      // ink cursor over the green CTA block and the dark footer (keeps it visible)
      const onDark = !!t.closest('.cta, .footer');
      if (tag) {
        cur.classList.add('lg'); cur.classList.remove('hover');
        if (label) label.textContent = tag === 'view' ? 'View' : tag === 'home' ? 'Home' : tag;
        cur.classList.toggle('dark', onDark);
      } else {
        cur.classList.add('hover');
        cur.classList.toggle('dark', onDark);
      }
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest(overSel)) { cur.classList.remove('lg', 'hover', 'dark'); if (label) label.textContent = ''; }
    });

    const loop = () => { x = lerp(x, tx, 0.2); y = lerp(y, ty, 0.2);
      cur.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`; requestAnimationFrame(loop); };
    loop();
  }

  /* ─────────── MAGNETIC BUTTONS ─────────── */
  function initMagnetic() {
    if (!FINE || REDUCED) return;
    $$('[data-magnetic]').forEach(el => {
      const inner = el.querySelector('[data-magnetic-inner]');
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${mx * 0.3}px, ${my * 0.45}px)`;
        if (inner) inner.style.transform = `translate(${mx * 0.16}px, ${my * 0.22}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; if (inner) inner.style.transform = ''; });
    });
  }

  /* ─────────── CURSOR-TRACKING IMAGE PARALLAX ─────────── */
  function initParallax() {
    if (!FINE || REDUCED) return;
    $$('[data-parallax]').forEach(media => {
      const host = media.closest('.proj') || media;
      host.addEventListener('mousemove', e => {
        const r = media.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        media.style.setProperty('--px', (nx * 8).toFixed(2));
        media.style.setProperty('--py', (ny * 8).toFixed(2));
      });
      host.addEventListener('mouseleave', () => {
        media.style.setProperty('--px', 0); media.style.setProperty('--py', 0);
      });
    });
  }

  /* ─────────── HERO AURA ─────────── */
  function initAura() {
    if (!FINE || REDUCED) return;
    const aura = $('#aura'), hero = $('#hero');
    if (!aura || !hero) return;
    hero.addEventListener('mousemove', e => {
      const r = hero.getBoundingClientRect();
      aura.style.left = (e.clientX - r.left) + 'px';
      aura.style.top  = (e.clientY - r.top) + 'px';
    }, { passive: true });
  }

  /* ─────────── DRAWER ─────────── */
  function lock(on) { locked = on; document.documentElement.classList.toggle('lock', on); }
  function initDrawer() {
    const burger = $('#burger'), drawer = $('#drawer');
    if (!burger || !drawer) return;
    const open = () => { drawer.classList.add('open'); burger.classList.add('x');
      burger.setAttribute('aria-expanded', 'true'); drawer.setAttribute('aria-hidden', 'false'); lock(true); };
    const close = () => { drawer.classList.remove('open'); burger.classList.remove('x');
      burger.setAttribute('aria-expanded', 'false'); drawer.setAttribute('aria-hidden', 'true'); lock(false); };
    burger.addEventListener('click', () => drawer.classList.contains('open') ? close() : open());
    $$('.drawer__link', drawer).forEach(a => a.addEventListener('click', close));
    addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('open')) close(); });
    drawer._close = close;
  }

  /* ─────────── CAROUSELS ─────────── */
  // Robust: drop images that fail to decode; show whatever loads; only fall
  // back to CSS art when none survive; auto-cycle when 2+ remain (motion on).
  function initCarousels() {
    const vet = (host) => {
      const media = host.matches('.proj__media') ? host : host.closest('.proj__media');
      const prune = () => {
        $$('.cimg', host).forEach(im => { if (im.complete && im.naturalWidth === 0) im.remove(); });
        const live = $$('.cimg', host);
        if (!live.length) { media && media.classList.add('no-img'); return live; }
        live.forEach((im, i) => im.classList.toggle('is-on', i === 0));
        return live;
      };
      // catch late failures too
      $$('.cimg', host).forEach(im => im.addEventListener('error', () => {
        im.remove(); if (!$$('.cimg', host).length) media && media.classList.add('no-img');
      }));
      const live = prune();
      if (REDUCED || live.length < 2) return;
      let i = 0;
      setInterval(() => { live[i].classList.remove('is-on'); i = (i + 1) % live.length; live[i].classList.add('is-on'); }, 2600);
    };
    const run = () => $$('[data-carousel]').forEach(vet);
    document.readyState === 'complete' ? run() : addEventListener('load', run);
  }

  /* ─────────── FAQ ─────────── */
  function initFAQ() {
    $$('.qa__q').forEach(q => {
      const a = q.nextElementSibling;
      q.addEventListener('click', () => {
        const isOpen = q.getAttribute('aria-expanded') === 'true';
        $$('.qa__q').forEach(o => { if (o !== q) { o.setAttribute('aria-expanded', 'false'); o.nextElementSibling.style.maxHeight = null; } });
        if (isOpen) { q.setAttribute('aria-expanded', 'false'); a.style.maxHeight = null; }
        else { q.setAttribute('aria-expanded', 'true'); a.style.maxHeight = a.scrollHeight + 'px'; }
      });
    });
  }

  /* ─────────── MARQUEE ─────────── */
  function initMarquee() {
    const t = $('#marq'); if (!t || REDUCED) return;
    t.addEventListener('mouseenter', () => t.classList.add('slow'));
    t.addEventListener('mouseleave', () => t.classList.remove('slow'));
  }

  /* ─────────── CLOCK + ROTATING STATUS ─────────── */
  function initStatus() {
    const clk = $('#clock');
    const tick = () => { const n = new Date(); const k = new Date(n.getTime() + n.getTimezoneOffset() * 6e4 + 3 * 36e5);
      if (clk) clk.textContent = String(k.getHours()).padStart(2, '0') + ':' + String(k.getMinutes()).padStart(2, '0'); };
    tick(); setInterval(tick, 30000);

    const rot = $('#rot');
    if (rot) {
      const items = ['Brand Worlds', 'Web Systems', 'AI Production', 'Campaign Visuals'];
      let i = 0;
      setInterval(() => { i = (i + 1) % items.length; rot.style.opacity = '0';
        setTimeout(() => { rot.textContent = items[i]; rot.style.opacity = '1'; }, 280); }, 3200);
    }
  }

  /* ─────────── CASE STUDY OVERLAY ─────────── */
  function initOverlay() {
    const ov = $('#ov'); if (!ov) return;
    const bg = $('#ov-bg'), closeBtn = $('#ov-close'), scroll = $('#ov-scroll');
    let lastFocus = null;

    const build = (p) => {
      $('#ov-cat').textContent = p.cat;
      $('#ov-title').textContent = p.title;
      $('#ov-theme').textContent = p.theme;
      $('#ov-desc').textContent = p.desc;
      const meta = $('#ov-meta'); meta.innerHTML = '';
      Object.entries(p.meta).forEach(([k, v]) => { const d = document.createElement('div'); d.innerHTML = `<dt>${k}</dt><dd>${v}</dd>`; meta.appendChild(d); });

      const media = $('#ov-media'); media.innerHTML = '';
      const art = document.createElement('div');
      art.className = 'ov__art'; art.style.background = p.art.bg; art.style.color = p.art.c; art.textContent = p.art.t;
      media.appendChild(art);
      (p.images || []).forEach(src => {
        const img = new Image(); img.src = src; img.alt = p.title + ' visual'; img.loading = 'lazy';
        img.onerror = () => img.remove(); media.appendChild(img);
      });

      const row = $('#ov-ctarow'); row.innerHTML = '';
      if (p.link) { const a = document.createElement('a'); a.className = 'btn btn--solid'; a.href = p.link.href;
        a.target = '_blank'; a.rel = 'noopener'; a.innerHTML = `<span>${p.link.label} <i>↗</i></span>`; row.appendChild(a); }
      const m = document.createElement('a'); m.className = 'btn btn--line';
      m.href = 'mailto:info@neezashyaka.com?subject=Project%20Meeting%20with%20NS%20Creative';
      m.innerHTML = '<span>Start a similar project</span>'; row.appendChild(m);
    };

    const open = (key, trigger) => {
      const p = PROJECTS[key]; if (!p) return;
      lastFocus = trigger || document.activeElement;
      build(p);
      ov.classList.add('open'); ov.setAttribute('aria-hidden', 'false'); lock(true);
      if (scroll) scroll.scrollTop = 0;
      setTimeout(() => closeBtn && closeBtn.focus(), 180);
    };
    const close = () => {
      ov.classList.remove('open'); ov.setAttribute('aria-hidden', 'true'); lock(false);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };

    $$('[data-open]').forEach(b => b.addEventListener('click', () => open(b.getAttribute('data-open'), b)));
    closeBtn && closeBtn.addEventListener('click', close);
    bg && bg.addEventListener('click', close);
    addEventListener('keydown', e => { if (e.key === 'Escape' && ov.classList.contains('open')) close(); });
    ov.addEventListener('keydown', e => {
      if (e.key !== 'Tab' || !ov.classList.contains('open')) return;
      const f = $$('a[href], button', ov).filter(el => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ─────────── ANCHORS ─────────── */
  function initAnchors() {
    $$('a[href^="#"]').forEach(a => {
      const hash = a.getAttribute('href');
      if (hash === '#' || hash.length < 2) return;
      a.addEventListener('click', e => {
        const el = $(hash); if (!el) return;
        e.preventDefault();
        const drawer = $('#drawer');
        if (drawer && drawer.classList.contains('open') && drawer._close) drawer._close();
        go(hash);
      });
    });
  }

  /* ─────────── BOOT ─────────── */
  function boot() {
    initStatus();
    initReveals();
    revealProjectsFallback();
    initCursor();
    initMagnetic();
    initParallax();
    initAura();
    initDrawer();
    initCarousels();
    initFAQ();
    initMarquee();
    initOverlay();
    initAnchors();
    addEventListener('scroll', () => { if (smoothCurrent == null) onScroll(); }, { passive: true });
    initLoader();   // last — kicks off smooth scroll + hero on completion
  }
  document.readyState === 'loading' ? addEventListener('DOMContentLoaded', boot) : boot();

})();
