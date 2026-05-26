(function() {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. LOADER LOGIC ── */
  const loader = document.getElementById('loader');
  const countEl = document.getElementById('loader-count');
  let n = 0;
  const dur = reduced ? 200 : 1400;
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

  /* ── 2. HERO AURA TRACKING ── */
  const heroWrap = document.getElementById('hero-wrap');
  if (heroWrap && !reduced) {
    heroWrap.addEventListener('mousemove', e => {
      const rect = heroWrap.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      heroWrap.style.setProperty('--mouse-x', `${x}%`);
      heroWrap.style.setProperty('--mouse-y', `${y}%`);
    });
  }

  /* ── 3. CARD MOUSE TRACKING (GLOW EFFECT) ── */
  const glowCards = document.querySelectorAll('.glow-card');
  glowCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* ── 4. 3D FOLDING MOBILE STACK ── */
  const handleMobileStack = () => {
    if (window.innerWidth > 1024) {
      glowCards.forEach(c => { c.style.transform = ''; c.style.opacity = '1'; });
      return;
    }
    
    glowCards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const stickyTop = 100 + (parseInt(card.style.getPropertyValue('--idx')) * 15);
      
      if (rect.top <= stickyTop + 2) { 
        const parentTop = document.getElementById('mobile-stack-container').getBoundingClientRect().top;
        const scrollPast = Math.max(0, Math.abs(parentTop) - (i * 350)); 
        
        const scale = Math.max(0.85, 1 - (scrollPast * 0.0003));
        const rotateX = Math.min(12, scrollPast * 0.015); // Fold backward
        const opacity = Math.max(0.3, 1 - (scrollPast * 0.0008));
        
        card.style.transform = `perspective(1000px) scale(${scale}) rotateX(${rotateX}deg)`;
        card.style.opacity = opacity;
      } else {
        card.style.transform = `perspective(1000px) scale(1) rotateX(0deg)`;
        card.style.opacity = 1;
      }
    });
  };
  
  if (!reduced) {
    window.addEventListener('scroll', handleMobileStack, { passive: true });
    window.addEventListener('resize', handleMobileStack);
  }

  /* ── 5. 3D TILT EFFECT FOR CARDS (DESKTOP) ── */
  if (!reduced && window.matchMedia('(hover: hover)').matches) {
    glowCards.forEach(card => {
      let currentX = 0, currentY = 0, targetX = 0, targetY = 0;
      let frameId;

      function renderTilt() {
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;
        card.style.transform = `perspective(1500px) rotateX(${currentX}deg) rotateY(${currentY}deg) scale3d(1.02, 1.02, 1.02)`;
        frameId = requestAnimationFrame(renderTilt);
      }

      card.addEventListener('mouseenter', () => {
        if(window.innerWidth <= 1024) return; 
        frameId = requestAnimationFrame(renderTilt);
      });

      card.addEventListener('mousemove', e => {
        if(window.innerWidth <= 1024) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        targetX = ((y - centerY) / centerY) * -8; 
        targetY = ((x - centerX) / centerX) * 8;
      });

      card.addEventListener('mouseleave', () => {
        if(window.innerWidth <= 1024) return;
        targetX = 0; targetY = 0;
        setTimeout(() => {
          cancelAnimationFrame(frameId);
          card.style.transform = `perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        }, 500); 
      });
    });
  }

  /* ── 6. DYNAMIC IMAGE CYCLERS ── */
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
      }, 1500); 
    });

    trigger.addEventListener('mouseleave', () => {
      clearInterval(intervalId);
      imgs.forEach(img => img.classList.remove('is-active'));
      currentIndex = 0;
      imgs[0].classList.add('is-active');
    });
  });

  const autoCyclers = document.querySelectorAll('.auto-cycler');
  autoCyclers.forEach(cycler => {
    const imgs = cycler.querySelectorAll('img');
    if (imgs.length <= 1) return;
    
    let currentIndex = 0;
    setInterval(() => {
      imgs[currentIndex].classList.remove('is-active');
      currentIndex = (currentIndex + 1) % imgs.length;
      imgs[currentIndex].classList.add('is-active');
    }, 2500); 
  });

  /* ── 7. V4 CURSOR WITH TEXT INJECTION ── */
  const cursor = document.getElementById('cursor');
  const cursorText = document.getElementById('cursor-text');
  
  if (cursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduced) {
    let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    let tx = cx, ty = cy;
    
    window.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    
    function cursorLoop() {
      cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
      // Adjust center point based on state
      const offset = cursor.classList.contains('has-text') ? 40 : (cursor.classList.contains('is-hover') ? 25 : 8);
      cursor.style.transform = `translate(${cx - offset}px, ${cy - offset}px)`;
      requestAnimationFrame(cursorLoop);
    }
    cursorLoop();
    
    // Magnetic and Text Injection Logic
    document.addEventListener('mouseover', e => { 
      const target = e.target.closest('a, button, .magnetic, [data-cursor]');
      if (!target) return;
      
      const text = target.getAttribute('data-cursor');
      if (text) {
        cursor.classList.add('has-text');
        cursorText.textContent = text;
      } else {
        cursor.classList.add('is-hover');
      }
    });
    
    document.addEventListener('mouseout', e => { 
      const target = e.target.closest('a, button, .magnetic, [data-cursor]');
      if (!target) return;
      cursor.classList.remove('is-hover', 'has-text');
      cursorText.textContent = '';
    });

    document.querySelectorAll('.magnetic').forEach(mag => {
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

  /* ── 8. PREMIUM REVEAL-ON-SCROLL ── */
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target); 
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }

})();