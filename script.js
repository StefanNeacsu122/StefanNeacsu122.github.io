/* ===========================
   FILE: script.js
   Path: /script.js
   Small behavior: nav toggle, smooth scroll, lightbox
   =========================== */
(() => {
  // DOM helpers
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  // year
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // nav toggle
  const navToggle = $('.nav-toggle');
  const nav = $('#primary-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
    // close on link click (mobile)
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // smooth internal scroll
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (href === '#' || href === '') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });

    // Handle hash scrolling on page load (for links from other pages)
  const handleHashScroll = () => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 300); // Increased delay to ensure everything is loaded
      }
    }
  };

  // Try multiple events to ensure it works
  document.addEventListener('DOMContentLoaded', handleHashScroll);
  window.addEventListener('load', handleHashScroll);
  
  // Also handle hash changes (if someone clicks back/forward)
  window.addEventListener('hashchange', handleHashScroll);


  // portfolio lightbox
  const cards = $$('.card');
  const lightbox = $('#lightbox');
  const lbImg = $('.lb-stage img', lightbox);
  const lbClose = $('.lb-close', lightbox);
  const lbPrev = $('.lb-prev', lightbox);
  const lbNext = $('.lb-next', lightbox);
  let currentIndex = -1;

  const openLightbox = (index) => {
    currentIndex = index;
    const src = cards[index].dataset.full || cards[index].querySelector('img').src;
    const alt = cards[index].querySelector('img').alt || '';
    lbImg.src = src;
    lbImg.alt = alt;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    lightbox.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
    document.body.style.overflow = '';
    currentIndex = -1;
  };
  const showNext = (delta = 1) => {
    if (currentIndex < 0) return;
    const next = (currentIndex + delta + cards.length) % cards.length;
    openLightbox(next);
  };

  cards.forEach((c, i) => c.addEventListener('click', () => openLightbox(i)));
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev) lbPrev.addEventListener('click', () => showNext(-1));
  if (lbNext) lbNext.addEventListener('click', () => showNext(1));

  // close lightbox on overlay click
  if (lightbox) lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  // keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext(1);
      if (e.key === 'ArrowLeft') showNext(-1);
    }
  });

  // progressive enhancement: lazyload images (if supported)
  if ('loading' in HTMLImageElement.prototype) {
    $$('.portfolio-grid img').forEach(img => img.setAttribute('loading', 'lazy'));
  }
})();