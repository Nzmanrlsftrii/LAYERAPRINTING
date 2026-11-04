
(function () {
  'use strict';

  /* SVG icons */
  var P = {
    recycle: '<path d="M7 19H4l3-5M17 5h3l-3 5M12 3l3 5H9zM6 14l-3 5h6M18 10l3-5h-6M12 21l-3-5h6"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5"/>',
    cpu: '<rect x="6" y="6" width="12" height="12" rx="1"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
    spool: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M9 6v12"/>',
    ruler: '<path d="M3 17L17 3l4 4L7 21zM8 12l2 2M11 9l2 2M14 6l2 2"/>',
    headset: '<path d="M4 14v-2a8 8 0 0116 0v2"/><rect x="3" y="14" width="4" height="6" rx="1"/><rect x="17" y="14" width="4" height="6" rx="1"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    flask: '<path d="M9 3h6M10 3v6L4 19a2 2 0 002 3h12a2 2 0 002-3l-6-10V3"/>',
    book: '<path d="M4 4h7a2 2 0 012 2v14a2 2 0 00-2-2H4zM20 4h-7v16a2 2 0 012-2h5z"/>',
    users: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-4 3-6 6-6s6 2 6 6M16 5a3 3 0 010 6M21 20c0-3-2-5-4-5.5"/>',
    store: '<path d="M3 9l2-5h14l2 5M4 9v11h16V9M3 9a3 3 0 006 0 3 3 0 006 0 3 3 0 006 0M10 20v-6h4v6"/>',
    plus: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/>',
    play: '<path d="M7 4l13 8-13 8z" fill="currentColor"/>',
    insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/>'
  };

  document.querySelectorAll('[data-icon]').forEach(function (el) {
    if (el.querySelector('svg')) return;

    var big = el.classList.contains('ico');
    var size = big ? 48 : 20;
    var path = P[el.dataset.icon] || '';

    el.insertAdjacentHTML(
      'afterbegin',
      '<svg viewBox="0 0 24 24" width="' + size +
      '" height="' + size +
      '" fill="none" stroke="currentColor" stroke-width="' +
      (big ? 1.2 : 1.8) +
      '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      path +
      '</svg>'
    );
  });

  /* Real product photos */
  var images = {
    printer: 'assets/images/printer.png',
    extruder: 'assets/images/extruder.png',
    shredder: 'assets/images/shredder.png',
    spooler: 'assets/images/spooler.png',
    filament: 'assets/images/filament.png',
    recycler: 'assets/images/recycler.png',
    accessory: 'assets/images/accessory.png',
    loop: 'assets/images/recycler.png',
    video: 'assets/images/extruder.png'
  };

  document.querySelectorAll('img[data-art]').forEach(function (img) {
    var type = img.dataset.art;
    var source = images[type];

    if (!source) return;

    /* Prevent overwriting a real image already specified in HTML. */
    if (img.getAttribute('src') && !img.getAttribute('src').startsWith('data:image/svg+xml')) {
      img.loading = img.loading || 'lazy';
      img.decoding = 'async';
      return;
    }

    img.src = source;
    img.loading = img.classList.contains('h-a') ||
      img.classList.contains('h-b') ||
      img.classList.contains('h-c') ? 'eager' : 'lazy';

    img.decoding = 'async';
  });

  /* Image fallback */
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () {
      img.classList.add('image-error');
    });
  });

  /* Filament colors */
  var colors = [
    '#e53935',
    '#f2b705',
    '#2b6cb0',
    '#2f9e6e',
    '#171717',
    '#f5f5f5',
    '#8e44ad',
    '#ff7a1a',
    '#9aa0a6',
    '#e91e8c'
  ];

  var spools = document.getElementById('spools');

  if (spools && !spools.children.length) {
    colors.forEach(function (color) {
      var spool = document.createElement('span');
      spool.className = 'spool';
      spool.style.backgroundColor = color;
      spools.appendChild(spool);
    });
  }

  /* Mobile navigation */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');

  function closeMenu() {
    if (!menu || !burger) return;

    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Buka menu');
  }

  if (burger && menu) {
    burger.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('open');

      burger.setAttribute('aria-expanded', String(isOpen));
      burger.setAttribute(
        'aria-label',
        isOpen ? 'Tutup menu' : 'Buka menu'
      );
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 820) closeMenu();
    });
  }

  /* Placeholder link notifications */
  var toast = document.getElementById('toast');
  var toastTimer;

  document.querySelectorAll('[data-msg]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var message = link.dataset.msg;

      if (!message || !toast) return;

      event.preventDefault();
      toast.textContent = message;
      toast.classList.add('on');

      window.clearTimeout(toastTimer);

      toastTimer = window.setTimeout(function () {
        toast.classList.remove('on');
      }, 2500);
    });
  });

  /* Smooth scroll for in-page links */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var targetId = link.getAttribute('href');

      if (!targetId || targetId === '#') return;

      var target;

      try {
        target = document.querySelector(targetId);
      } catch (error) {
        return;
      }

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
        block: 'start'
      });
    });
  });

  /* Scroll reveal */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    document.querySelectorAll('.head, .steps, .panel').forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('in');
    });
  }

  /* Automatic footer year */
  var year = document.getElementById('year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();