# A Curtains & Blinds

A responsive one-page website draft for A Curtains & Blinds, showcasing custom window furnishings for Gold Coast and Tweed Coast homes.

## Preview locally

Open `index.html` in a browser, or serve the folder with any static web server.

## Project structure

- `index.html` — page content and structure
- `styles.css` — responsive styling
- `script.js` — navigation and enquiry-form interactions
- `assets/` — WebP-optimised brand artwork, hero photography, and supplied gallery images

The page uses responsive, sized imagery and locally available font fallbacks to keep the initial render lightweight. Supplied imagery is used across the product, selected-work, and showroom sections.

## Performance improvements

The supplied Lighthouse audit was captured on 3 September 2026 using an emulated Moto G Power and Slow 4G. Its baseline Performance score was **76**, with a 2.0 s First Contentful Paint and 6.2 s Largest Contentful Paint.

| Area | Original | Updated implementation |
| --- | --- | --- |
| Brand imagery | 443 KiB across three oversized WebP files | 44 KiB of right-sized local assets (about 90% less transfer) |
| Font loading | 153 KiB Google Fonts request chain on the critical path | No external font request; system font stack renders immediately |
| Hero image | One 2,048px image for every screen | Responsive 900px / 1,440px candidates with `sizes` |
| Layout stability | Lighthouse flagged images without explicit dimensions | Every content image has intrinsic width and height |

Run Lighthouse again against the deployed server (not the development server injection) to record the final score. The expected outcome is a materially faster first render and LCP, especially on mobile/Slow 4G; the final numeric score depends on hosting compression, caching, and network conditions.

## Publishing note

The Peter testimonial is included as supplied from the existing testimonials page. Confirm permission to reuse it and that it remains current before publishing the rebuilt site.
