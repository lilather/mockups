/* =====================================================
   Wellspring Church — main.js
   Vanilla JS: hamburger nav, smooth scroll, AOS init
   ===================================================== */
(function () {
  'use strict';

  /* ---------- Mobile hamburger nav ---------- */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('primary-nav');

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }

  function openNav() {
    if (!nav || !toggle) return;
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.contains('is-open');
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    /* Close the menu when a nav link is tapped (mobile) */
    nav.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (link) closeNav();
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    /* Close if resized up to desktop so state can't get stuck */
    window.addEventListener('resize', function () {
      if (window.innerWidth > 800) closeNav();
    });
  }

  /* ---------- Smooth scroll for in-page anchors ---------- */
  /* Accounts for the sticky header so sections aren't hidden. */
  var header = document.querySelector('.site-header');
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (!id || id === '#') return;

      var target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();

      var headerH = header ? header.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerH;

      window.scrollTo({
        top: top,
        behavior: prefersReduced ? 'auto' : 'smooth'
      });

      /* Move focus for accessibility without an extra visible jump */
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  /* ---------- AOS scroll animations ---------- */
  if (window.AOS) {
    window.AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      disable: prefersReduced
    });
  }
})();
