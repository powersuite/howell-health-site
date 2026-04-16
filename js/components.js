/* ============================================
   Shared Header & Footer Loader
   Howell Health Insurance Group
   ============================================ */

(function () {
  'use strict';

  var headerEl = document.getElementById('site-header');
  var footerEl = document.getElementById('site-footer');

  if (!headerEl && !footerEl) return;

  var fetches = [];
  if (headerEl) fetches.push(fetch('/shared/header.html').then(function (r) { return r.text(); }));
  else fetches.push(Promise.resolve(''));
  if (footerEl) fetches.push(fetch('/shared/footer.html').then(function (r) { return r.text(); }));
  else fetches.push(Promise.resolve(''));

  Promise.all(fetches).then(function (parts) {
    if (headerEl) {
      // Parse the header HTML and split into parts so announcement bar
      // and mobile nav live outside #site-header, allowing it to be sticky
      var tmp = document.createElement('div');
      tmp.innerHTML = parts[0];
      var announcement = tmp.querySelector('.announcement-bar');
      var nav = tmp.querySelector('.site-header');
      var mobileNavEl = tmp.querySelector('.mobile-nav');
      var stickyBar = tmp.querySelector('.mobile-sticky-bar');
      if (announcement) headerEl.parentNode.insertBefore(announcement, headerEl);
      if (nav) headerEl.appendChild(nav);
      if (mobileNavEl) headerEl.parentNode.insertBefore(mobileNavEl, headerEl.nextSibling);
      if (stickyBar) document.body.appendChild(stickyBar);
    }
    if (footerEl) {
      footerEl.innerHTML = parts[1];
      // Re-create <script> tags so they actually execute (innerHTML skips them)
      var scripts = footerEl.querySelectorAll('script');
      for (var s = 0; s < scripts.length; s++) {
        var old = scripts[s];
        var fresh = document.createElement('script');
        for (var a = 0; a < old.attributes.length; a++) {
          fresh.setAttribute(old.attributes[a].name, old.attributes[a].value);
        }
        if (old.textContent) fresh.textContent = old.textContent;
        old.parentNode.replaceChild(fresh, old);
      }
    }
    initComponents();
  });

  function initComponents() {
    /* --- Active Nav Highlighting --- */
    var path = window.location.pathname;
    var navLinks = document.querySelectorAll('.nav-links a');
    for (var i = 0; i < navLinks.length; i++) {
      var href = navLinks[i].getAttribute('href');
      if (href && path.indexOf(href) === 0 && href !== '/') {
        navLinks[i].setAttribute('aria-current', 'page');
      }
    }
    var mobileLinks = document.querySelectorAll('.mobile-nav a');
    for (var m = 0; m < mobileLinks.length; m++) {
      var mhref = mobileLinks[m].getAttribute('href');
      if (mhref && path.indexOf(mhref) === 0 && mhref !== '/') {
        mobileLinks[m].setAttribute('aria-current', 'page');
      }
    }
    // Highlight "Get a Quote" nav CTA on /quote/ pages
    if (path.indexOf('/quote/') === 0) {
      var quoteCta = document.querySelector('.nav-cta');
      if (quoteCta) quoteCta.setAttribute('aria-current', 'page');
    }

    /* --- Announcement Bar Close --- */
    var closeBtn = document.querySelector('.announcement-bar-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        var bar = document.querySelector('.announcement-bar');
        if (bar) bar.style.display = 'none';
      });
    }

    /* --- Mobile Navigation --- */
    var hamburger = document.querySelector('.hamburger');
    var mobileNav = document.querySelector('.mobile-nav');
    var mobileClose = document.querySelector('.mobile-nav-close');

    function openMobileNav() {
      if (mobileNav) {
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeMobileNav() {
      if (mobileNav) {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    if (hamburger) hamburger.addEventListener('click', openMobileNav);
    if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);

    if (mobileNav) {
      var links = mobileNav.querySelectorAll('a');
      for (var j = 0; j < links.length; j++) {
        links[j].addEventListener('click', closeMobileNav);
      }
    }

    /* --- Sticky Header Shadow on Scroll --- */
    var header = document.querySelector('.site-header');
    if (header) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 10) {
          header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        } else {
          header.style.boxShadow = 'none';
        }
      }, { passive: true });
    }

    /* --- Smooth Scroll for Anchor Links --- */
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    for (var k = 0; k < anchorLinks.length; k++) {
      anchorLinks[k].addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var headerHeight = document.querySelector('.site-header')
            ? document.querySelector('.site-header').offsetHeight
            : 0;
          var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    }
  }
})();
