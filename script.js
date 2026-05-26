(function() {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. LOADER LOGIC ── */
  const loader = document.getElementById('loader');
  const countEl = document.getElementById('loader-count');
  let n = 0;
  const dur = reduced ? 200 : 1200;
  const start = performance.now();
  
  function step(now) {
    const t = Math.min(1, (now - start) / dur);
    // Smooth cubic easing for the loader count
    const eased = 1 - Math.pow(1 - t, 4); 
    n = Math.floor(eased * 100);
    
    if (countEl) countEl.textContent = String(n).padStart(3, '0');
    
    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      countEl && (countEl.textContent = '100');
      setTimeout(() => {
        if(loader) loader.classList.add('is-done');
      }, 300);
      setTimeout(() => {
        if(loader && loader.parentNode) loader.parentNode.removeChild(loader);
      }, 1500);
    }
  }
  requestAnimationFrame(step);

  /* ── 2. ULTRA-SMOOTH CUSTOM CURSOR ── */
  const cursor = document.getElementById('cursor');
  const hoverable = 'a, button, .card, .svc, .faq__q, .nav__cta, .tools__item, .cta__big-button';
  
  if (cursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduced) {
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let tx = cx;
    let ty = cy;
    
    // Listen to mouse movement
    window.addEventListener('mousemove', e => { 
      tx = e.clientX; 
      ty = e.clientY; 
    }, { passive: true });
    
    // Lerp loop for buttery smoothness
    function loop() {
      cx += (tx - cx) * 0.18; // Spring factor
      cy += (ty - cy) * 0.18;
      // Adjust offset based on the cursor size (32px / 2 = 16)
      cursor.style.transform = `translate(${cx - 16}px, ${cy - 16}px)`;
      requestAnimationFrame(loop);
    }
    loop();
    
    // Add hover scale effect when mousing over interactables
    document.addEventListener('mouseover', e => {
      if (e.target.closest(hoverable)) cursor.classList.add('is-hover');
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest(hoverable)) cursor.classList.remove('is-hover');
    });
  }

  /* ── 3. CLOCK + STATUS BAR ── */
  function updateClock() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const kampala = new Date(utc + (3 * 3600000)); // EAT is UTC+3
    const h = String(kampala.getHours()).padStart(2, '0');
    const m = String(kampala.getMinutes()).padStart(2, '0');
    const el = document.getElementById('clock');
    if (el) el.textContent = h + ':' + m;
  }
  updateClock();
  setInterval(updateClock, 30000); // Update every 30 seconds

  /* ── 4. ROTATING "NOW IN STUDIO" STATUS ── */
  const statuses = [
    'Editing Sun Over Africa · Scene 03',
    'Running ACRA26 archive',
    'Drafting WATP shop launch',
    'Building Africa 63 brand',
    'Strategising Akright Summit'
  ];
  const nowEl = document.getElementById('now-status');
  if (nowEl) {
    let i = 0;
    setInterval(() => {
      i = (i + 1) % statuses.length;
      nowEl.style.opacity = '0';
      setTimeout(() => { 
        nowEl.textContent = statuses[i]; 
        nowEl.style.opacity = '1'; 
      }, 300);
    }, 4000);
    nowEl.style.transition = 'opacity 0.4s ease';
  }

  /* ── 5. GLASSMORPHIC NAV SWITCHER ── */
  const nav = document.getElementById('nav');
  const darkSections = document.querySelectorAll('.work, .about, .footer, .ticker, .featured-soa, .manifesto');
  
  function checkNav() {
    if(!nav) return;
    const navMid = nav.offsetTop + (nav.offsetHeight / 2) + 40;
    let onDark = false;
    
    // Check if the center of the nav is over a dark background section
    darkSections.forEach(sec => {
      const top = sec.offsetTop;
      const bot = top + sec.offsetHeight;
      const y = window.scrollY + navMid;
      if (y > top && y < bot) onDark = true;
    });
    
    nav.classList.toggle('on-dark', onDark);
  }
  window.addEventListener('scroll', checkNav, { passive: true });
  window.addEventListener('resize', checkNav);
  checkNav();

  /* ── 6. PREMIUM REVEAL-ON-SCROLL ── */
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target); // Only reveal once for better performance
        }
      });
    }, { 
      threshold: 0.1, 
      rootMargin: '0px 0px -8% 0px' 
    });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    // Fallback for reduced motion or lack of support
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }

})();