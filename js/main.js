/* ============================================
   Howell Health Insurance Group — Main JS
   howellhealthfl.com
   ============================================ */

(function () {
  'use strict';

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

  // Close mobile nav when a link is clicked
  if (mobileNav) {
    var links = mobileNav.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', closeMobileNav);
    }
  }

  /* --- Smooth Scroll for Anchor Links --- */
  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  for (var j = 0; j < anchorLinks.length; j++) {
    anchorLinks[j].addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var headerHeight = document.querySelector('.site-header')
          ? document.querySelector('.site-header').offsetHeight
          : 0;
        var top =
          target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  }

  /* --- Sticky Header Shadow on Scroll --- */
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener(
      'scroll',
      function () {
        if (window.scrollY > 10) {
          header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        } else {
          header.style.boxShadow = 'none';
        }
      },
      { passive: true }
    );
  }
})();
