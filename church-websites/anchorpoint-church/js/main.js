/* ============================================================
   Anchorpoint Church — main.js
   Slider · hamburger nav · scroll-shadow · smooth scroll
   ============================================================ */
(function () {
  'use strict';

  /* ---------- AOS init ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80
    });
  }

  /* ---------- Sticky nav scroll-shadow ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Hamburger menu ---------- */
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');

  function closeMenu() {
    if (!navToggle || !navMenu) return;
    navToggle.classList.remove('is-open');
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    /* close after choosing a link */
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    /* close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- Smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      /* move focus for accessibility without an extra jump */
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  /* ---------- Hero slider ---------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll('.hero__slide'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('.hero__dot'));
  var prevBtn = document.getElementById('heroPrev');
  var nextBtn = document.getElementById('heroNext');
  var AUTO_MS = 6000;

  if (slides.length > 1) {
    var current = 0;
    var timer = null;

    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        slide.classList.toggle('is-active', i === current);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === current);
        dot.setAttribute('aria-selected', String(i === current));
      });
    }

    function next() { show(current + 1); }
    function prev() { show(current - 1); }

    function startAuto() {
      stopAuto();
      timer = window.setInterval(next, AUTO_MS);
    }
    function stopAuto() {
      if (timer) { window.clearInterval(timer); timer = null; }
    }
    /* reset the countdown after any manual interaction */
    function restartAuto() { startAuto(); }

    if (nextBtn) nextBtn.addEventListener('click', function () { next(); restartAuto(); });
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); restartAuto(); });

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { show(i); restartAuto(); });
    });

    /* pause on hover / focus within the hero */
    var hero = document.getElementById('hero');
    if (hero) {
      hero.addEventListener('mouseenter', stopAuto);
      hero.addEventListener('mouseleave', startAuto);
      hero.addEventListener('focusin', stopAuto);
      hero.addEventListener('focusout', startAuto);
    }

    /* keyboard arrows when hero is in view */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { prev(); restartAuto(); }
      if (e.key === 'ArrowRight') { next(); restartAuto(); }
    });

    /* pause when tab is hidden */
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { stopAuto(); } else { startAuto(); }
    });

    show(0);
    startAuto();
  }

  /* ---------- Footer year (keeps © current) ---------- */
  var yearHost = document.querySelector('.footer__bar p');
  if (yearHost) {
    yearHost.textContent =
      '© ' + new Date().getFullYear() + ' Anchorpoint Church. All rights reserved.';
  }
})();
