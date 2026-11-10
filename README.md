# ASG – Aman Safety Glass Group website

Static site: open `index.html` in a browser, or upload the whole folder to any web host. No build step.

## Pages
- `index.html` – home: part finder, brand strip, glass range, laminated vs tempered guide, about, services, quote form.
- `shop.html` – full catalog (16,252 parts, 114 brands): search, filters (part, glass type, tint, brand), sorting, pages,
  and a quote list that sends one email with all chosen parts. Filters live in the URL, e.g.
  `shop.html?brand=toyota&cat=windshield`, so links can be shared.

## Files
| File | Purpose |
|---|---|
| `styles.css` | All styling. Colours are CSS variables at the top. |
| `script.js` | Home page behaviour. |
| `shop.js` | Shop search, filters, quote list. |
| `glass-art.js` | Draws each glass part as a tinted illustration and decodes catalog codes (LAM/TEMP, CL/GN/GY/BR/BL, SH band, Arabic codes). |
| `products-data.js` | The catalog (unchanged format). |
| `catalog-summary.js` | Small summary used by the home page. Regenerate if the catalog changes. |
| `brand-logos.js` + `assets/logos/` | Vehicle brand logos (WebP). Brands not listed show a typographic badge. |
| `assets/brand/` | ASG logo as vector SVG (gold, white, navy, on-navy), PNGs, favicons. |
| `social_media_manager.py` | Unchanged. |

## To finish before going live
- Forms open the visitor's email app (mailto). For in-page submission, connect a form service or backend.
- Add social media links in the footer once the accounts are ready.
- Logos removed because the files were wrong (wrong company/image): Asia, Chrysler, Eagle, Ghabbour, Hyundai, MAN, MAZ,
  Nasr, Pontiac, Samsung, Tesla. Drop a correct logo into `assets/logos/<brand-key>.webp` and add it to `brand-logos.js`.
- Real product/factory photos: none were included (the old site pointed to `../ASG/Photos/`, which wasn't in the folder).
  The site uses drawn glass illustrations instead; real photos can be added to the hero or range cards later.
