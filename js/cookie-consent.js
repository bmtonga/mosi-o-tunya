/* Mosi O Tunya Car Care — cookie consent
   Audit (Nov 2026): the site sets no cookies of its own and runs no analytics or
   advertising. The only optional third-party content is the Google Maps embed on the
   Contact page, which is never loaded without the visitor's action. Categories below
   reflect that reality; add a category here only when a tool using it is actually added.
   The visitor's choice is stored in localStorage (strictly necessary) for 12 months. */
(function () {
  'use strict';

  var KEY = 'motcc-consent';
  var VERSION = 1;
  var MAX_AGE_DAYS = 365;
  var CATEGORIES = [
    { id: 'necessary', name: 'Strictly necessary', locked: true,
      desc: 'Needed for the website to work and to remember your cookie choice. This website sets no cookies of its own; your choice is stored in your browser only.' },
    { id: 'maps', name: 'External content (Google Maps)', locked: false,
      desc: 'Lets the "Show map" button on the Contact page load an interactive Google Maps embed. Google may set its own cookies when it loads. Off by default; the address and directions link work without it.' }
  ];

  var consent = null;
  var banner = null, overlay = null, lastFocus = null, bannerWasOpen = false;

  /* ---------- storage ---------- */
  function read() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || data.version !== VERSION || !data.date) return null;
      if ((Date.now() - new Date(data.date).getTime()) / 864e5 > MAX_AGE_DAYS) return null;
      return data;
    } catch (e) { return null; }
  }
  function write(choices) {
    consent = { version: VERSION, date: new Date().toISOString(), categories: choices };
    try { localStorage.setItem(KEY, JSON.stringify(consent)); } catch (e) { /* private mode: in-memory only */ }
    document.dispatchEvent(new CustomEvent('motcc:change', { detail: consent }));
  }
  function allowed(id) {
    var cat = CATEGORIES.filter(function (c) { return c.id === id; })[0];
    if (cat && cat.locked) return true;
    return !!(consent && consent.categories && consent.categories[id]);
  }
  function choicesAll(value) {
    var out = {};
    CATEGORIES.forEach(function (c) { out[c.id] = c.locked ? true : value; });
    return out;
  }

  /* ---------- helpers ---------- */
  function el(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }
  function updateBodyFlag() { document.body.classList.toggle('cc-open', !!(banner || overlay)); }

  /* ---------- banner ---------- */
  function showBanner() {
    if (banner) return;
    banner = el(
      '<section class="cc-banner" role="region" aria-labelledby="ccTitle" aria-describedby="ccDesc">' +
        '<h2 id="ccTitle"><i class="fas fa-cookie-bite" aria-hidden="true"></i>Your privacy</h2>' +
        '<p id="ccDesc">This website sets no cookies of its own. Google Maps is only loaded if you allow it. ' +
          'Read our <a href="privacy-policy.html">Privacy Policy</a> and <a href="cookie-policy.html">Cookie Policy</a>.</p>' +
        '<div class="cc-actions">' +
          '<button type="button" class="btn btn-brand" data-cc="accept">Accept all</button>' +
          '<button type="button" class="btn btn-outline-brand" data-cc="reject">Reject optional</button>' +
          '<button type="button" class="cc-link-btn" data-cc="manage" aria-haspopup="dialog">Manage preferences</button>' +
        '</div>' +
      '</section>');
    document.body.appendChild(banner);
    updateBodyFlag();
    requestAnimationFrame(function () { requestAnimationFrame(function () { banner.classList.add('is-visible'); }); });
    banner.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cc]'); if (!b) return;
      if (b.dataset.cc === 'accept') { write(choicesAll(true)); hideBanner(); }
      else if (b.dataset.cc === 'reject') { write(choicesAll(false)); hideBanner(); }
      else if (b.dataset.cc === 'manage') { bannerWasOpen = true; openDialog(b); }
    });
  }
  function hideBanner() {
    if (!banner) return;
    var b = banner; banner = null;
    b.classList.remove('is-visible');
    setTimeout(function () { if (b.parentNode) b.parentNode.removeChild(b); updateBodyFlag(); }, 300);
    updateBodyFlag();
  }

  /* ---------- preferences dialog ---------- */
  function openDialog(trigger) {
    if (overlay) return;
    lastFocus = trigger || document.activeElement;
    var current = consent ? consent.categories : choicesAll(false);
    var rows = CATEGORIES.map(function (c) {
      var control = c.locked
        ? '<span class="cc-always" aria-hidden="true">Always on</span>'
        : '<label class="cc-switch"><input type="checkbox" role="switch" id="cc-' + c.id + '" data-cat="' + c.id + '"' +
          (current[c.id] ? ' checked' : '') + ' aria-describedby="cc-' + c.id + '-desc"><span></span><span class="visually-hidden">' + c.name + '</span></label>';
      return '<div class="cc-cat"><div><h3 id="cc-' + c.id + '-name">' + c.name + '</h3><p id="cc-' + c.id + '-desc">' + c.desc + '</p></div>' + control + '</div>';
    }).join('');
    overlay = el(
      '<div class="cc-overlay">' +
        '<div class="cc-dialog" role="dialog" aria-modal="true" aria-labelledby="ccDlgTitle" aria-describedby="ccDlgDesc">' +
          '<div class="cc-dialog-head"><h2 id="ccDlgTitle">Cookie preferences</h2>' +
            '<button type="button" class="btn-close" data-cc="close" aria-label="Close"></button></div>' +
          '<div class="cc-dialog-body">' +
            '<p id="ccDlgDesc">Choose which optional content you allow. Strictly necessary items cannot be switched off. ' +
              'Details are in our <a href="cookie-policy.html">Cookie Policy</a>.</p>' + rows +
          '</div>' +
          '<div class="cc-dialog-foot">' +
            '<button type="button" class="btn btn-outline-brand" data-cc="reject">Reject optional</button>' +
            '<button type="button" class="btn btn-outline-brand" data-cc="accept">Accept all</button>' +
            '<button type="button" class="btn btn-brand ms-auto-md" data-cc="save">Save preferences</button>' +
          '</div>' +
        '</div>' +
      '</div>');
    document.body.appendChild(overlay);
    updateBodyFlag();
    requestAnimationFrame(function () { requestAnimationFrame(function () { overlay.classList.add('is-visible'); }); });
    var dialog = overlay.querySelector('.cc-dialog');
    dialog.querySelector('.btn-close').focus();

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) { closeDialog(); return; }
      var b = e.target.closest('[data-cc]'); if (!b) return;
      if (b.dataset.cc === 'close') closeDialog();
      else if (b.dataset.cc === 'accept') { write(choicesAll(true)); closeDialog(true); }
      else if (b.dataset.cc === 'reject') { write(choicesAll(false)); closeDialog(true); }
      else if (b.dataset.cc === 'save') {
        var choices = choicesAll(false);
        overlay.querySelectorAll('input[data-cat]').forEach(function (i) { choices[i.dataset.cat] = i.checked; });
        write(choices); closeDialog(true);
      }
    });
    overlay.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); closeDialog(); return; }
      if (e.key !== 'Tab') return;
      var f = dialog.querySelectorAll('button, input, a[href]');
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }
  function closeDialog(decided) {
    if (!overlay) return;
    var o = overlay; overlay = null;
    o.classList.remove('is-visible');
    setTimeout(function () { if (o.parentNode) o.parentNode.removeChild(o); updateBodyFlag(); }, 250);
    if (decided) { hideBanner(); bannerWasOpen = false; }
    updateBodyFlag();
    // Return focus to where the visitor was; if the banner is still open, back to it
    var target = (banner && bannerWasOpen) ? banner.querySelector('[data-cc="manage"]') : lastFocus;
    if (target && target.focus && document.contains(target)) target.focus();
  }

  /* ---------- public API ---------- */
  window.MOTConsent = {
    allowed: allowed,
    open: function (trigger) { openDialog(trigger); },
    get: function () { return consent; }
  };

  /* ---------- boot ---------- */
  function init() {
    consent = read();
    if (!consent) showBanner();
    document.querySelectorAll('[data-cc-open]').forEach(function (b) {
      b.addEventListener('click', function () { openDialog(b); });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
