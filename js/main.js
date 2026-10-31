/* Mosi O Tunya Car Care — site scripts */
(function ($) {
  'use strict';

  $(function () {
    // Animate on scroll
    if (window.AOS) {
      AOS.init({ duration: 800, once: true, offset: 40, anchorPlacement: 'top-bottom' });
      // AOS only reacts to scroll events, so anchor jumps (nav clicks, #contact links,
      // back/forward) can leave a section invisible. Reveal anything in view ourselves.
      var revealInView = function () {
        var vh = window.innerHeight;
        document.querySelectorAll('[data-aos]:not(.aos-animate)').forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (r.top < vh && r.bottom > 0) el.classList.add('aos-animate');
        });
      };
      var revealSoon = function () { [0, 150, 500, 1000].forEach(function (t) { setTimeout(revealInView, t); }); };
      document.addEventListener('aos:in', revealInView);
      window.addEventListener('hashchange', revealSoon);
      window.addEventListener('pageshow', revealSoon);
      window.addEventListener('resize', revealInView);
      window.addEventListener('scroll', revealInView, { passive: true });
      $(document).on('click', 'a[href^="#"]', revealSoon);
      revealSoon();
      // Final safety net: nothing stays hidden for more than a few seconds
      setTimeout(function () { document.documentElement.classList.add('aos-settled'); }, 4000);
    }

    // Testimonials carousel (Slick)
    if ($.fn.slick) {
      var $slider = $('.testimonial-slide').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4500,
        dots: false,
        arrows: false,
        pauseOnHover: true,
        pauseOnFocus: true,
        accessibility: true,
        responsive: [
          { breakpoint: 1200, settings: { slidesToShow: 2 } },
          { breakpoint: 768, settings: { slidesToShow: 1 } }
        ]
      });
      // Pause / resume control (WCAG 2.2.2)
      var tPause = document.getElementById('testimonialPause');
      if (tPause) {
        tPause.addEventListener('click', function () {
          var paused = tPause.getAttribute('aria-pressed') === 'true';
          $slider.slick(paused ? 'slickPlay' : 'slickPause');
          tPause.setAttribute('aria-pressed', String(!paused));
          tPause.setAttribute('aria-label', paused ? 'Pause reviews carousel' : 'Play reviews carousel');
          tPause.querySelector('i').className = paused ? 'fas fa-pause' : 'fas fa-play';
        });
      }
    }

    // Team carousel (Slick)
    if ($.fn.slick && $('.team-slider').length) {
      var $team = $('.team-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        dots: false,
        arrows: false,
        pauseOnHover: true,
        pauseOnFocus: true,
        accessibility: true,
        responsive: [
          { breakpoint: 992, settings: { slidesToShow: 2 } },
          { breakpoint: 576, settings: { slidesToShow: 1 } }
        ]
      });
      var teamPause = document.getElementById('teamPause');
      if (teamPause) {
        teamPause.addEventListener('click', function () {
          var paused = teamPause.getAttribute('aria-pressed') === 'true';
          $team.slick(paused ? 'slickPlay' : 'slickPause');
          teamPause.setAttribute('aria-pressed', String(!paused));
          teamPause.setAttribute('aria-label', paused ? 'Pause team carousel' : 'Play team carousel');
          teamPause.querySelector('i').className = paused ? 'fas fa-pause' : 'fas fa-play';
        });
      }
    }

    // Hero slideshow pause control (WCAG 2.2.2)
    var hPause = document.getElementById('heroPause');
    if (hPause) {
      hPause.addEventListener('click', function () {
        var hero = document.getElementById('hero');
        var paused = hero.classList.toggle('is-paused');
        hPause.setAttribute('aria-pressed', String(paused));
        hPause.setAttribute('aria-label', paused ? 'Play background slideshow' : 'Pause background slideshow');
        hPause.querySelector('i').className = paused ? 'fas fa-play' : 'fas fa-pause';
      });
    }

    // Measure the full header (top bar + navbar) so the hero fits the first screen
    var headerWrap = document.querySelector('.site-header-wrap');
    function setHeaderHeight() {
      document.documentElement.style.setProperty('--header-h', headerWrap.offsetHeight + 'px');
      var tb = document.querySelector('.topbar');
      document.documentElement.style.setProperty('--topbar-h', (tb ? tb.offsetHeight : 0) + 'px');
    }
    setHeaderHeight();
    $(window).on('resize', setHeaderHeight);

    // Header shadow once scrolled
    var header = document.querySelector('.site-header');
    $(window).on('scroll', function () { header.classList.toggle('scrolled', window.scrollY > 24); });

    // Active nav link on scroll
    var sections = $('main section[id]');
    var navLinks = $('.navbar .nav-link');
    function setActive() {
      var pos = $(window).scrollTop() + 140;
      var current = 'top';
      sections.each(function () {
        if ($(this).offset().top <= pos) current = this.id;
      });
      navLinks.removeClass('active').filter('[href="#' + current + '"]').addClass('active');
    }
    $(window).on('scroll', setActive);
    setActive();

    // Close offcanvas when a link is clicked
    $('#siteNav .nav-link, #siteNav .btn').on('click', function () {
      var oc = bootstrap.Offcanvas.getInstance(document.getElementById('siteNav'));
      if (oc) oc.hide();
    });

    // Count-up for the About counter (runs once when it scrolls into view)
    var counters = document.querySelectorAll('.counter[data-count]');
    if (counters.length && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var el = en.target, target = parseInt(el.dataset.count, 10), start = null;
          function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / 900, 1);
            el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          io.unobserve(el);
        });
      }, { threshold: 0.6 });
      counters.forEach(function (c) { io.observe(c); });
    } else {
      counters.forEach(function (c) { c.textContent = c.dataset.count; });
    }

    // About: scroll the expanded story into view once it has opened (respect sticky header)
    var aboutMore = document.getElementById('aboutMore');
    if (aboutMore) {
      aboutMore.addEventListener('shown.bs.collapse', function () {
        var offset = (document.querySelector('.site-header') || {}).offsetHeight || 0;
        var top = aboutMore.getBoundingClientRect().top + window.pageYOffset - offset - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
        aboutMore.setAttribute('tabindex', '-1');
        aboutMore.focus({ preventScroll: true });
      });
      aboutMore.addEventListener('hidden.bs.collapse', function () {
        var btn = document.querySelector('.about-more-btn');
        var offset = (document.querySelector('.site-header') || {}).offsetHeight || 0;
        var top = btn.getBoundingClientRect().top + window.pageYOffset - offset - window.innerHeight * 0.4;
        window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
        btn.focus({ preventScroll: true });
      });
    }

    // Map facade: the Google Maps embed is only fetched on request
    var loadMap = document.getElementById('loadMap');
    if (loadMap) {
      loadMap.addEventListener('click', function () {
        var wrap = document.getElementById('mapWrap');
        var iframe = document.createElement('iframe');
        iframe.title = 'Map: Plot 25313, Mosi-oa-Tunya Road, Woodlands, Lusaka';
        iframe.referrerPolicy = 'no-referrer-when-downgrade';
        iframe.src = 'https://maps.google.com/maps?q=Mosi-oa-Tunya%20Road%2C%20Woodlands%2C%20Lusaka%2C%20Zambia&t=&z=15&ie=UTF8&iwloc=&output=embed';
        wrap.innerHTML = '';
        wrap.appendChild(iframe);
      });
    }
  });
})(jQuery);
