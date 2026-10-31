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
| Packages (6 pricing cards) | Fixturbo |
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
css/vendor/                bootstrap, aos, slick, fancybox, fontawesome (local)
css/webfonts/              Font Awesome 5 webfonts
js/main.js                 site scripts (AOS, Slick, compare slider, form, nav)
js/vendor/                 jquery, bootstrap, aos, slick, fancybox
assets/brand/logos/        SVG logo set (stacked, compact, horizontal, icon × colour/reverse/black/white/green)
assets/brand/icons/        square profile icons 64–1024
assets/img/                hero, about, gallery, site photography
```

## Status / to-do

- [ ] **Replace demonstration imagery.** About images are brand-concept renders from the identity presentation (some show the earlier "Car Spa" descriptor). Swap for real photographs of the Woodlands facility.
- [ ] **Confirm package prices.** Values are indicative placeholders in `#pricing`.
- [ ] **Replace testimonials** with real customer feedback.
- [ ] **Booking.** Removed for now (contact is via call/WhatsApp); a booking flow can be added later.
- [ ] Add real social media URLs (currently generic Facebook/Instagram links).
- [ ] Terms & Privacy pages.
