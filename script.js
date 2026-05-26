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
    const eased = 1 - Math.pow(1 - t, 4);
    n = Math.floor(eased * 100);
    
    if (countEl) countEl.textContent = String(n).padStart(3, '0');
    
    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      countEl && (countEl.textContent = '100');
      setTimeout(() => { if(loader) loader.classList.add('is-done'); }, 300);
      setTimeout(() => { if(loader && loader.parentNode) loader.parentNode.removeChild(loader); }, 1500);
    }
  }
  requestAnimationFrame(step);

  /* ── 2. MAGNETIC BUTTONS & CUSTOM CURSOR ── */
  const cursor = document.getElementById('cursor');
  const hoverable = 'a, button, .card, .svc, .magnetic';
  
  if (cursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduced) {
    let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    let tx = cx, ty = cy;
    
    window.addEventListener('mousemove', e => { 
      tx = e.clientX; ty = e.clientY; 
    }, { passive: true });
    
    function cursorLoop() {
      cx += (tx - cx) * 0.2; 
      cy += (ty - cy) * 0.2;
      cursor.style.transform = `translate(${cx - 12}px, ${cy - 12}px)`;
      requestAnimationFrame(cursorLoop);
    }
    cursorLoop();
    
    document.addEventListener('mouseover', e => {
      if (e.target.closest(hoverable)) cursor.classList.add('is-hover');
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest(hoverable)) cursor.classList.remove('is-hover');
    });

    const magnetics = document.querySelectorAll('.magnetic');
    magnetics.forEach(mag => {
      mag.addEventListener('mousemove', function(e) {
        const rect = mag.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        mag.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });
      mag.addEventListener('mouseleave', function() {
        mag.style.transform = `translate(0px, 0px)`;
      });
    });
  }

  /* ── 3. 3D TILT EFFECT FOR CARDS ── */
  if (!reduced && window.matchMedia('(hover: hover)').matches) {
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
      let currentX = 0, currentY = 0, targetX = 0, targetY = 0;
      let frameId;

      function renderTilt() {
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;
        card.style.transform = `perspective(1000px) rotateX(${currentX}deg) rotateY(${currentY}deg) scale3d(1.02, 1.02, 1.02)`;
        frameId = requestAnimationFrame(renderTilt);
      }

      card.addEventListener('mouseenter', () => {
        frameId = requestAnimationFrame(renderTilt);
      });

      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        targetX = ((y - centerY) / centerY) * -6; 
        targetY = ((x - centerX) / centerX) * 6;
      });

      card.addEventListener('mouseleave', () => {
        targetX = 0; targetY = 0;
        setTimeout(() => {
          cancelAnimationFrame(frameId);
          card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        }, 500); 
      });
    });
  }

  /* ── 4. DYNAMIC IMAGE CYCLERS ── */
  
  // 4a. Hover-Triggered Cycler (e.g., Akright)
  const hoverGalleries = document.querySelectorAll('.hover-gallery-trigger');
  hoverGalleries.forEach(trigger => {
    const cycler = trigger.querySelector('.image-cycler');
    if (!cycler) return;
    const imgs = cycler.querySelectorAll('img');
    if (imgs.length <= 1) return;

    let intervalId;
    let currentIndex = 0;

    trigger.addEventListener('mouseenter', () => {
      intervalId = setInterval(() => {
        imgs[currentIndex].classList.remove('is-active');
        currentIndex = (currentIndex + 1) % imgs.length;
        imgs[currentIndex].classList.add('is-active');
      }, 1200); 
    });

    trigger.addEventListener('mouseleave', () => {
      clearInterval(intervalId);
      imgs.forEach(img => img.classList.remove('is-active'));
      currentIndex = 0;
      imgs[0].classList.add('is-active');
    });
  });

  // 4b. Auto-Sliding Carousel (e.g., Honda)
  const autoCyclers = document.querySelectorAll('.auto-cycler');
  autoCyclers.forEach(cycler => {
    const imgs = cycler.querySelectorAll('img');
    if (imgs.length <= 1) return;
    
    let currentIndex = 0;
    setInterval(() => {
      imgs[currentIndex].classList.remove('is-active');
      currentIndex = (currentIndex + 1) % imgs.length;
      imgs[currentIndex].classList.add('is-active');
    }, 2500); // Automatically fades to the next image every 2.5 seconds
  });

  /* ── 5. CLOCK + STATUS BAR ── */
  function updateClock() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const kampala = new Date(utc + (3 * 3600000));
    const h = String(kampala.getHours()).padStart(2, '0');
    const m = String(kampala.getMinutes()).padStart(2, '0');
    const el = document.getElementById('clock');
    if (el) el.textContent = h + ':' + m;
  }
  updateClock();
  setInterval(updateClock, 30000); 

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
  }

  /* ── 6. GLASSMORPHIC NAV SWITCHER ── */
  const nav = document.getElementById('nav');
  const darkSections = document.querySelectorAll('.work, .about, .footer, .ticker, .featured-soa, .manifesto');
  
  function checkNav() {
    if(!nav) return;
    const navMid = nav.offsetTop + (nav.offsetHeight / 2) + 40;
    let onDark = false;
    
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

  /* ── 7. PREMIUM REVEAL-ON-SCROLL ── */
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target); 
        }
      });
    }, { 
      threshold: 0.1, 
      rootMargin: '0px 0px -10% 0px' 
    });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }

})();