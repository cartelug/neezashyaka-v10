/* ═══════════════════════════════════════════════════════════════
   NS CREATIVE · script.js
   Vanilla JS · no dependencies
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* ───────────── PROJECT DATA (for overlay) ───────────── */
  const PROJECTS = {
    acra26: {
      cat: 'Featured · Event Identity',
      title: 'ACRA26 · Akright City Run 2026',
      theme: 'Unganisha — one thread, one city, one run.',
      desc: 'A complete campaign identity for the Akright City Run — built around a single continuous thread that traces every runner into one moving city. Kit design, countdown series, sponsor materials, and a visual system engineered for motion and public energy.',
      meta: { Role: 'Campaign Identity / Kit Design / Visual System', Output: '60+ campaign visuals', Location: 'Akright City', Year: '2026' },
      images: ['assets/akright1.png', 'assets/akright2.png', 'assets/akright3.png'],
      art: { text: 'ACRA26', bg: 'linear-gradient(160deg,#0E1F14,#050403)', color: '#63D471' }
    },
    mwt: {
      cat: 'SaaS · Brand & UI',
      title: 'My Weekly Track',
      theme: 'Performance, made visible.',
      desc: 'A performance tracking SaaS for East African organisations. End-to-end brand and UI direction — logo, colour system, interface design, and launch positioning for a product that helps teams see their week clearly.',
      meta: { Role: 'Brand Identity / UI Direction', Output: 'Brand + product system', Sector: 'SaaS', Year: '2026' },
      images: ['assets/my-weekly-track.png'],
      link: { label: 'Visit myweeklytrack.com', href: 'https://myweeklytrack.com' },
      art: { text: 'MWT', bg: 'linear-gradient(160deg,#2D2B6B,#14132E)', color: '#FFB000' }
    },
    ssuubi: {
      cat: 'Faith · Identity',
      title: 'Ssuubi Fellowship',
      theme: 'Hope, peace, and growth.',
      desc: 'A faith community identity system built around hope, peace, and growth. A calm, premium visual language — warm tones, gold light, and a steady typographic voice for a fellowship that wanted to feel both spiritual and modern.',
      meta: { Role: 'Identity System / Social Content', Output: '16 visuals / month', Sector: 'Faith', Year: '2026' },
      images: ['assets/ssuubi-fellowship.png'],
      art: { text: 'Ssubi', bg: 'radial-gradient(circle at 60% 30%,rgba(212,169,67,0.3),transparent 60%),#120C08', color: '#D4A943' }
    },
    soa: {
      cat: 'AI Film · Brand World',
      title: 'Sun Over Africa',
      theme: 'A Ugandan-made film, built scene by scene.',
      desc: 'A cinematic brand world for an AI-produced Ugandan film. Logo, title treatment, and the visual atmosphere of the production — gold light over deep black, building the identity of a story made entirely in Kampala.',
      meta: { Role: 'Brand World / AI Production', Output: 'Identity + scene system', Sector: 'Film', Year: '2026' },
      images: ['assets/sun-over-africa.png'],
      art: { text: 'SUN', bg: 'radial-gradient(circle at 50% 45%,rgba(212,169,67,0.3),transparent 60%),#050403', color: '#D4A943' }
    },
    retro: {
      cat: 'Event · Campaign',
      title: 'Retro Wave',
      theme: 'CRT texture, posters, rhythm, motion.',
      desc: 'A visual campaign system inspired by CRT texture, vintage posters, rhythm, and motion. Controlled retro energy — nostalgic but premium, built for an event series that needed to feel alive without tipping into cliché.',
      meta: { Role: 'Campaign Creative Direction', Output: 'Poster + social system', Sector: 'Events', Year: '2026' },
      images: [],
      art: { text: 'RETRO WAVE', bg: 'linear-gradient(160deg,#1A1605,#050403)', color: '#FFB000' }
    },
    honda: {
      cat: 'Automotive · Campaign',
      title: 'Honda by Markh',
      theme: 'Speed, rhythm, high-contrast motion.',
      desc: 'Automotive campaign direction with speed, rhythm, and high-contrast motion. A black-and-red visual language built around dashboard energy and cinematic intensity — content designed to make the cars feel fast even when still.',
      meta: { Role: 'Campaign Direction / Social', Output: 'Ongoing content system', Sector: 'Automotive', Year: '2026' },
      images: ['assets/honda1.png', 'assets/honda2.png', 'assets/honda3.png'],
      art: { text: 'HONDA', bg: 'linear-gradient(135deg,#D71920,#6E0E12)', color: '#FFFFFF' }
    }
  };

  /* ───────────── LOADER ───────────── */
  (function loader() {
    const el = $('#loader');
    if (!el) return;
    const countEl = $('#loader-count');
    const fill = $('#loader-fill');
    const dur = reduced ? 200 : 1000;
    const t0 = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      const n = Math.round(eased * 100);
      if (countEl) countEl.textContent = String(n).padStart(3, '0');
      if (fill) fill.style.width = (eased * 100) + '%';
      if (t < 1) requestAnimationFrame(frame);
      else {
        setTimeout(() => el.classList.add('done'), 180);
        setTimeout(() => { el.parentNode && el.parentNode.removeChild(el); startHero(); }, 950);
      }
    }
    requestAnimationFrame(frame);
  })();

  function startHero() {
    if (reduced) { $$('.hero__title .line').forEach(l => l.style.transform = 'none'); return; }
    $$('.hero__title .line').forEach((line, i) => {
      const span = document.createElement('span');
      span.style.display = 'block';
      span.style.transform = 'translateY(110%)';
      span.style.transition = 'transform 0.9s cubic-bezier(0.16,1,0.3,1)';
      span.style.transitionDelay = (0.06 * i) + 's';
      span.innerHTML = line.innerHTML;
      line.innerHTML = '';
      line.appendChild(span);
      requestAnimationFrame(() => requestAnimationFrame(() => { span.style.transform = 'translateY(0)'; }));
    });
  }

  /* ───────────── CURSOR ───────────── */
  if (fine && !reduced) {
    const cur = $('#cursor');
    if (cur) {
      let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y;
      addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; }, { passive: true });
      addEventListener('mousedown', () => cur.classList.add('down'));
      addEventListener('mouseup', () => cur.classList.remove('down'));
      const hov = 'a, button, .tile, .faq__q, .featured__dot';
      document.addEventListener('mouseover', e => { if (e.target.closest(hov)) cur.classList.add('hover'); });
      document.addEventListener('mouseout', e => { if (e.target.closest(hov)) cur.classList.remove('hover'); });
      (function loop() {
        x += (tx - x) * 0.2; y += (ty - y) * 0.2;
        cur.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        requestAnimationFrame(loop);
      })();
    }
  }

  /* ───────────── CLOCK + ROTATING STATUS ───────────── */
  (function clock() {
    const el = $('#clock');
    function tick() {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const kla = new Date(utc + 3 * 3600000);
      if (el) el.textContent = String(kla.getHours()).padStart(2, '0') + ':' + String(kla.getMinutes()).padStart(2, '0');
    }
    tick(); setInterval(tick, 30000);
  })();

  (function rotStatus() {
    const el = $('#now-rot');
    if (!el) return;
    const items = ['Brand Worlds', 'Web Systems', 'Campaign Visuals', 'AI Production'];
    let i = 0;
    setInterval(() => {
      i = (i + 1) % items.length;
      el.style.opacity = '0';
      setTimeout(() => { el.textContent = items[i]; el.style.opacity = '1'; }, 280);
    }, 3200);
  })();

  /* ───────────── NAV BACKGROUND ───────────── */
  (function nav() {
    const n = $('#nav');
    if (!n) return;
    const light = $$('.services, .faq');
    function check() {
      n.classList.toggle('scrolled', scrollY > 40);
      const mid = n.offsetTop + n.offsetHeight / 2 + 34;
      let paper = false;
      light.forEach(s => {
        const top = s.offsetTop, bot = top + s.offsetHeight;
        if (scrollY + mid > top && scrollY + mid < bot) paper = true;
      });
      n.classList.toggle('on-paper', paper);
    }
    addEventListener('scroll', check, { passive: true });
    addEventListener('resize', check);
    check();
  })();

  /* ───────────── MOBILE MENU ───────────── */
  (function menu() {
    const burger = $('#nav-burger');
    const menu = $('#mobile-menu');
    if (!burger || !menu) return;
    function open() {
      menu.classList.add('open'); burger.classList.add('open');
      burger.setAttribute('aria-expanded', 'true');
      menu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      menu.classList.remove('open'); burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    burger.addEventListener('click', () => menu.classList.contains('open') ? close() : open());
    $$('.mobile-menu__link, .mobile-menu__cta', menu).forEach(a => a.addEventListener('click', close));
    addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) close(); });
  })();

  /* ───────────── REVEAL ON SCROLL ───────────── */
  (function reveal() {
    const els = $$('[data-reveal]');
    if (!('IntersectionObserver' in window) || reduced) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(e => io.observe(e));
  })();

  /* ───────────── HERO AURA ───────────── */
  if (fine && !reduced) {
    const aura = $('#hero-aura');
    const hero = $('#hero');
    if (aura && hero) {
      hero.addEventListener('mousemove', e => {
        const r = hero.getBoundingClientRect();
        aura.style.left = (e.clientX - r.left) + 'px';
        aura.style.top = (e.clientY - r.top) + 'px';
      }, { passive: true });
    }
  }

  /* ───────────── MAGNETIC BUTTONS ───────────── */
  if (fine && !reduced) {
    $$('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${mx * 0.25}px, ${my * 0.35}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ───────────── CARD GLOW + 3D TILT ───────────── */
  if (fine && !reduced) {
    $$('.tile').forEach(tile => {
      const glow = $('.tile__glow', tile);
      tile.addEventListener('mousemove', e => {
        const r = tile.getBoundingClientRect();
        const px = e.clientX - r.left, py = e.clientY - r.top;
        if (glow) { glow.style.left = px + 'px'; glow.style.top = py + 'px'; }
        const rx = ((py / r.height) - 0.5) * -6;
        const ry = ((px / r.width) - 0.5) * 6;
        tile.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      });
      tile.addEventListener('mouseleave', () => { tile.style.transform = ''; });
    });
  }

  /* ───────────── MARQUEE SLOW ON HOVER ───────────── */
  (function marquee() {
    const track = $('#marquee-track');
    if (!track || reduced) return;
    track.addEventListener('mouseenter', () => track.classList.add('slow'));
    track.addEventListener('mouseleave', () => track.classList.remove('slow'));
  })();

  /* ───────────── IMAGE CAROUSELS ───────────── */
  function carousel(container, selector, interval) {
    if (reduced) return;
    const start = () => {
      // After load, broken images have removed themselves via onerror
      const imgs = $$(selector, container).filter(im => im.naturalWidth > 0 || !im.complete);
      if (imgs.length < 2) return;
      imgs.forEach((im, idx) => im.classList.toggle('is-active', idx === 0));
      let i = 0;
      setInterval(() => {
        imgs[i].classList.remove('is-active');
        i = (i + 1) % imgs.length;
        imgs[i].classList.add('is-active');
      }, interval);
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start);
  }
  $$('[data-carousel]').forEach(c => {
    const kind = c.getAttribute('data-carousel');
    if (kind === 'honda' || kind === 'akright2') carousel(c, '.tile__carousel-img', 2600);
  });

  /* ───────────── FEATURED STACK (Akright) ───────────── */
  (function featured() {
    const stack = $('#featured-stack');
    const dotsWrap = $('#featured-dots');
    if (!stack) return;
    const slides = $$('.featured__slide', stack);
    if (!slides.length) return;
    slides.forEach((s, idx) => {
      const dot = document.createElement('button');
      dot.className = 'featured__dot' + (idx === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Show image ' + (idx + 1));
      dot.addEventListener('click', () => go(idx));
      dotsWrap && dotsWrap.appendChild(dot);
    });
    const dots = $$('.featured__dot', dotsWrap);
    let i = 0, timer;
    function go(n) {
      slides[i].classList.remove('is-active'); dots[i] && dots[i].classList.remove('is-active');
      i = n;
      slides[i].classList.add('is-active'); dots[i] && dots[i].classList.add('is-active');
      restart();
    }
    function next() { go((i + 1) % slides.length); }
    function restart() { if (reduced) return; clearInterval(timer); timer = setInterval(next, 3400); }
    restart();
  })();

  /* ───────────── FAQ ACCORDION ───────────── */
  (function faq() {
    $$('.faq__q').forEach(q => {
      const a = q.nextElementSibling;
      q.addEventListener('click', () => {
        const open = q.getAttribute('aria-expanded') === 'true';
        $$('.faq__q').forEach(other => {
          if (other !== q) { other.setAttribute('aria-expanded', 'false'); other.nextElementSibling.style.maxHeight = null; }
        });
        if (open) { q.setAttribute('aria-expanded', 'false'); a.style.maxHeight = null; }
        else { q.setAttribute('aria-expanded', 'true'); a.style.maxHeight = a.scrollHeight + 'px'; }
      });
    });
  })();

  /* ───────────── CASE STUDY OVERLAY ───────────── */
  (function overlay() {
    const ov = $('#overlay');
    if (!ov) return;
    const panel = $('.overlay__panel', ov);
    const backdrop = $('#overlay-backdrop');
    const closeBtn = $('#overlay-close');
    const scroll = $('#overlay-scroll');
    let lastFocus = null;

    function buildMedia(p) {
      const wrap = $('#overlay-media');
      wrap.innerHTML = '';
      let added = 0;
      (p.images || []).forEach(src => {
        const img = new Image();
        img.src = src; img.alt = p.title + ' visual'; img.loading = 'lazy';
        img.onerror = () => img.remove();
        img.onload = () => { added++; };
        wrap.appendChild(img);
      });
      // Always include a branded art panel as graceful fallback / opener
      const art = document.createElement('div');
      art.className = 'overlay__art';
      art.style.background = p.art.bg;
      art.style.color = p.art.color;
      art.textContent = p.art.text;
      wrap.insertBefore(art, wrap.firstChild);
    }

    function open(key, trigger) {
      const p = PROJECTS[key];
      if (!p) return;
      lastFocus = trigger || document.activeElement;
      $('#overlay-cat').textContent = p.cat;
      $('#overlay-title').textContent = p.title;
      $('#overlay-theme').textContent = p.theme;
      $('#overlay-desc').textContent = p.desc;
      const meta = $('#overlay-meta'); meta.innerHTML = '';
      Object.entries(p.meta).forEach(([k, v]) => {
        const d = document.createElement('div');
        d.innerHTML = '<dt>' + k + '</dt><dd>' + v + '</dd>';
        meta.appendChild(d);
      });
      buildMedia(p);
      const cta = $('#overlay-cta'); cta.innerHTML = '';
      if (p.link) {
        const a = document.createElement('a');
        a.className = 'btn btn--lime'; a.href = p.link.href; a.target = '_blank'; a.rel = 'noopener';
        a.innerHTML = '<span>' + p.link.label + '</span><span aria-hidden="true">↗</span>';
        cta.appendChild(a);
      }
      const mail = document.createElement('a');
      mail.className = 'btn btn--ghost'; mail.href = 'mailto:info@neezashyaka.com?subject=Project%20Meeting%20with%20NS%20Creative';
      mail.innerHTML = '<span>Start a similar project</span>';
      cta.appendChild(mail);

      ov.classList.add('open');
      ov.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (scroll) scroll.scrollTop = 0;
      setTimeout(() => closeBtn && closeBtn.focus(), 200);
    }

    function close() {
      ov.classList.remove('open');
      ov.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    $$('[data-open-case]').forEach(btn => {
      btn.addEventListener('click', () => open(btn.getAttribute('data-open-case'), btn));
    });
    closeBtn && closeBtn.addEventListener('click', close);
    backdrop && backdrop.addEventListener('click', close);
    addEventListener('keydown', e => { if (e.key === 'Escape' && ov.classList.contains('open')) close(); });

    // Basic focus containment
    ov.addEventListener('keydown', e => {
      if (e.key !== 'Tab' || !ov.classList.contains('open')) return;
      const f = $$('a[href], button', ov).filter(el => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  })();

  /* ───────────── ANCHOR SMOOTH OFFSET (status+nav) ───────────── */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#' || id === '#top') return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + scrollY - 90;
      window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
    });
  });

})();
