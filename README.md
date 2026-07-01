# Avneel & Rachit — Wedding Invitation Website

A cinematic, single-page wedding invitation built with plain HTML5, CSS3, and JavaScript (ES6) — no frameworks. Features an envelope-opening intro, scroll-driven storytelling, a swipeable photo booth, a live countdown, and an RSVP form.

## Structure

```
index.html
style.css
script.js
assets/
  images/     → the seven engagement/couple photos used throughout the site
  icons/      → (Lucide icons are loaded from CDN; folder reserved for any custom icons)
  music/      → drop your instrumental track here as theme.mp3
  textures/   → reserved for any additional paper/texture assets
README.md
```

## Before you publish, do these three things

1. **Add background music.** Drop an instrumental MP3 at `assets/music/theme.mp3`. The mute button in the bottom-right corner will control it. If the file is missing, the site still works — it just stays silent until you add one.

2. **Connect the RSVP form.** Open `index.html`, find the `<form id="rsvp-form" ... action="https://formspree.io/f/your-form-id">` line, and replace `your-form-id` with your real Formspree endpoint (create one free at formspree.io — it emails you every RSVP).

3. **Check the venue map.** The Google Maps embed and "Open in Google Maps" button both search for "Glory by Shrida" by name. If Maps can't find it precisely, replace the query in the `iframe src` and the maps link in `index.html` with the venue's exact address or Google Place ID for a pinpoint match.

## Customizing content

- **Countdown target date**: set in `script.js` — look for `const weddingDate = new Date('2026-12-03T10:00:00');`
- **Timeline story text**: edit the four `.timeline-item` blocks inside the `#story` section of `index.html`.
- **Event details (Haldi / Sangeet / Wedding)**: edit the `[data-detail]` blocks inside `#event-detail` in `index.html`.
- **Colors**: all defined as CSS variables at the top of `style.css` under `:root` — change `--burgundy`, `--champagne`, or `--gold` to retint the whole site instantly.
- **Easter egg**: tap "AR" five times at the bottom of the page to reveal a hidden mini-gallery.

## Performance notes

- All photos are pre-optimized and served responsively with `loading="lazy"` outside the hero.
- Smooth scrolling (Lenis) and scroll-triggered reveals (GSAP + ScrollTrigger) only initialize after the invitation is opened, keeping the first paint light.
- Reduced-motion preferences are respected globally.

## Tech

- GSAP + ScrollTrigger for animation
- Lenis for smooth scrolling
- Lucide for icons
- Fonts: Bodoni Moda (display), Cormorant Garamond (body), Pinyon Script (signature accents)

With love,
Avneel & Rachit
