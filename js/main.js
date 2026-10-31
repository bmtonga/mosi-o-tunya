/* Mosi O Tunya Car Care — site scripts */
(function ($) {
  'use strict';

  $(function () {
    // Animate on scroll
    if (window.AOS) {
      AOS.init({ duration: 800, once: true, offset: 60 });
    }

    // Testimonials carousel (Slick)
    if ($.fn.slick) {
      $('.testimonial-slide').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4500,
        dots: true,
        arrows: false,
        pauseOnHover: true,
        responsive: [
          { breakpoint: 1200, settings: { slidesToShow: 2 } },
          { breakpoint: 768, settings: { slidesToShow: 1 } }
        ]
      });
    }

    // Before / after comparison sliders
    document.querySelectorAll('[data-ba]').forEach(function (el) {
      var range = el.querySelector('.ba-range');
      var set = function (v) { el.style.setProperty('--pos', v + '%'); };
      set(range.value);
      range.addEventListener('input', function () { set(range.value); });
      // keyboard hint: nudge slightly on load so the handle is noticed
      setTimeout(function () {
        if (range.value === '50') { range.value = 46; set(46); }
      }, 1200);
    });

    // Measure the full header (top bar + navbar) so the hero fits the first screen
    var headerWrap = document.querySelector('.site-header-wrap');
    function setHeaderHeight() {
      document.documentElement.style.setProperty('--header-h', headerWrap.offsetHeight + 'px');
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

    // Booking form: client-side validation + success toast.
    // Backend/booking integration is a later phase.
    var form = document.getElementById('bookingForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!form.checkValidity()) {
          form.classList.add('was-validated');
          return;
        }
        var toastEl = document.getElementById('formSuccess');
        bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 6000 }).show();
        form.reset();
        form.classList.remove('was-validated');
      });
    }

    // Fancybox (for future gallery lightboxes)
    if (window.Fancybox) {
      Fancybox.bind('[data-fancybox]', {});
    }
  });
})(jQuery);
