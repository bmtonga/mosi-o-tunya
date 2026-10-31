# Mosi O Tunya Car Care — Website

Professional car-care website for **Mosi O Tunya Car Care** (Mosi-o-Tunya Properties and Car Care Services Limited), Plot 25313, Mosi-oa-Tunya Road, Woodlands, Lusaka.

Static HTML/CSS/JS on Bootstrap 5. No build step — open `index.html` or serve the folder.

## Design basis

The site combines two licensed templates into one consistent design, restyled to the **Brand Foundation & Usage Guide v1.0**:

| Section | Source pattern |
| --- | --- |
| Top bar, navbar, offcanvas menu | Autozen |
| Hero (full-bleed photo, left scrim, angled shapes) | Fixturbo home-4 |
| About "Know About Us" (image stack, counter, checklist, Read More expanding story + Clean/Care/Elevate pillars) | Fixturbo home-5 |
| Services (6 cards) | Fixturbo |
| Packages (6 pricing cards, no CTA) | Fixturbo |
| Testimonials carousel | Autozen |
| Contact info + map | Autozen |
| Footer | Autozen |

Brand tokens live at the top of `css/style.css`:
Deep Green `#064C3B`, Warm Gold `#CC9722` (accent only), White, Soft White `#F7F7F4`, Muted Sage `#A8C0B8`.
Fonts: Manrope (headings), Inter (body) via Google Fonts.

## Structure

```
index.html
css/style.css              site styles (own)
css/vendor/                bootstrap 5.3.3, aos 2.3, slick 1.8, fontawesome 5.15 (local)
css/webfonts/              Font Awesome webfonts (woff2 + woff only)
js/main.js                 site scripts (AOS, Slick, header measure, nav state, counter)
js/vendor/                 jquery 3.7.1, bootstrap 5.3.3, aos, slick
assets/brand/logos/        SVG logo set (stacked, compact, horizontal, icon × colour/reverse/black/white/green)
assets/brand/icons/        square profile icons 64–1024
assets/img/                hero, about, pillars, services photography
```

## Conventions

- Vanilla HTML/CSS/JS; one stylesheet (`css/style.css`) ordered tokens → base → utilities → components → sections → responsive.
- Class names are kebab-case and section-prefixed (`hero-*`, `about-*`, `pricing-*`, …). Bootstrap utilities are used for grid/spacing only.
- Icons: Font Awesome 5 (`fas`/`far`/`fab`). Headings: one `h1` (hero), `h2` per section, `h3`/`h4` inside.
- Colours come only from the `:root` tokens; gold is an accent, never a surface.
- Dependencies are vendored locally; the only external requests are Google Fonts and the Google Maps embed.

## Accessibility

Audited against WCAG 2.1 AA (contrast computed on rendered colours, keyboard walk-through, landmark/ARIA review):
skip link; one `h1`, labelled sections and landmarks; visible 3 px focus ring on every control; decorative icons
`aria-hidden`; text contrast ≥ 4.5:1 (≥ 3:1 large) on all surfaces; carousel and hero slideshow pause on hover/focus
and have pause buttons; `prefers-reduced-motion` honoured; Read More is a real `<button>`; targets ≥ 24 px.
Re-check contrast whenever a brand colour token changes.

## Status / to-do

- [ ] **Facility photography.** Hero and About use stock photos; replace with real photographs of the Woodlands facility when available.
- [ ] **Confirm package prices.** Values are indicative placeholders in `#pricing`.
- [ ] **Replace testimonials** with real customer feedback.
- [ ] **Booking.** Removed for now (contact is via call/WhatsApp); a booking flow can be added later.
- [ ] Add Instagram URL (Facebook is linked; Instagram still points to instagram.com).
- [ ] Terms & Privacy pages.
