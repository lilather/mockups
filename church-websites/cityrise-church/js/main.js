/* =========================================================
   Cityrise Church — main.js
   Hamburger nav, smooth scroll, newsletter form
   ========================================================= */
(function () {
  'use strict';

  /* ---------- AOS init ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      disable: function () {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      }
    });
  }

  /* ---------- Mobile hamburger nav ---------- */
  var hamburger = document.getElementById('hamburger');
  var nav = document.querySelector('.main-nav');

  function closeNav() {
    if (!hamburger || !nav) return;
    nav.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
  }

  function toggleNav() {
    if (!hamburger || !nav) return;
    var isOpen = nav.classList.toggle('is-open');
    hamburger.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  }

  if (hamburger && nav) {
    hamburger.addEventListener('click', toggleNav);

    /* Close menu after clicking a nav link */
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeNav();
        hamburger.focus();
      }
    });

    /* Reset state when resizing back up to desktop */
    window.addEventListener('resize', function () {
      if (window.innerWidth > 780) closeNav();
    });
  }

  /* ---------- Smooth scroll for in-page anchors ---------- */
  var prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = anchor.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReduced ? 'auto' : 'smooth',
        block: 'start'
      });

      /* Move focus to target for accessibility */
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  /* ---------- Newsletter form ---------- */
  var form = document.getElementById('newsletter-form');
  var message = document.getElementById('form-message');

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (form && message) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameInput = document.getElementById('nl-name');
      var emailInput = document.getElementById('nl-email');
      var name = nameInput.value.trim();
      var email = emailInput.value.trim();

      nameInput.classList.remove('invalid');
      emailInput.classList.remove('invalid');
      message.className = 'form-message';

      if (!name) {
        nameInput.classList.add('invalid');
        message.textContent = 'Please tell us your name.';
        message.classList.add('error');
        nameInput.focus();
        return;
      }

      if (!isValidEmail(email)) {
        emailInput.classList.add('invalid');
        message.textContent = 'Please enter a valid email address.';
        message.classList.add('error');
        emailInput.focus();
        return;
      }

      /* No real backend — show a friendly confirmation */
      form.reset();
      message.textContent =
        'Thanks, ' + name + '! You are on the list. See you Sunday.';
      message.classList.add('success');
    });
  }

  /* ---------- Latest message play button (placeholder) ---------- */
  var playBtn = document.querySelector('.play-btn');
  if (playBtn) {
    playBtn.addEventListener('click', function () {
      var msg = document.getElementById('message');
      if (msg) {
        msg.scrollIntoView({
          behavior: prefersReduced ? 'auto' : 'smooth'
        });
      }
      window.alert(
        'The full message would play here. Catch "Courage Over Comfort" on our YouTube channel.'
      );
    });
  }
})();
