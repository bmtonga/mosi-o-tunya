# Mosi O Tunya Car Care — Website

Professional car-care website for **Mosi O Tunya Car Care** (Mosi-o-Tunya Properties and Car Care Services Limited), Plot 25313, Mosi-oa-Tunya Road, Woodlands, Lusaka.

Static HTML/CSS/JS on Bootstrap 5. No build step — open `index.html` or serve the folder.

## Design basis

The site combines two licensed templates into one consistent design, restyled to the **Brand Foundation & Usage Guide v1.0**:

| Section | Source pattern |
| --- | --- |
| Top bar, navbar, offcanvas menu | Autozen |
| Hero (split headline, ghost title, Ken Burns carousel) | Autozen |
| Brand-pillar strip (Clean · Care · Elevate · Corporate) | Autozen "why" boxes |
| About (overlapping images, badge, checklist) | Fixturbo |
| Services (6 cards) | Fixturbo |
| Results — before/after compare slider inside tabs | Autozen project tabs + custom slider |
| Packages (6 pricing cards) | Fixturbo |
| Testimonials carousel | Autozen |
| Contact info + booking form + map | Autozen |
| Footer | Autozen |

Brand tokens live at the top of `css/style.css`:
Deep Green `#064C3B`, Warm Gold `#CC9722` (accent only), White, Soft White `#F7F7F4`, Muted Sage `#A8C0B8`.
Fonts: Manrope (headings), Inter (body) via Google Fonts.

## Structure

```
index.html
css/style.css              site styles (own)
css/vendor/                bootstrap, aos, slick, fancybox, fontawesome (local)
css/webfonts/              Font Awesome 5 webfonts
js/main.js                 site scripts (AOS, Slick, compare slider, form, nav)
js/vendor/                 jquery, bootstrap, aos, slick, fancybox
assets/brand/logos/        SVG logo set (stacked, compact, horizontal, icon × colour/reverse/black/white/green)
assets/brand/icons/        square profile icons 64–1024
assets/img/                hero, about, gallery, site photography
```

## Status / to-do

- [ ] **Replace demonstration imagery.** Hero, about and before/after images are brand-concept renders from the identity presentation (some still show the earlier "Car Spa" descriptor). Swap for real photographs of the Woodlands facility. Before/after pairs go in `assets/img/gallery/<name>-before.jpg` / `<name>-after.jpg` (16:9).
- [ ] **Confirm package prices.** Values are indicative placeholders in `#pricing`.
- [ ] **Replace testimonials** with real customer feedback.
- [ ] **Booking backend.** The form currently validates client-side and shows a confirmation toast; wire it to email/WhatsApp/booking system (see `js/main.js`).
- [ ] Add real social media URLs (currently generic Facebook/Instagram links).
- [ ] Terms & Privacy pages.
