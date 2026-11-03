# Kamran Singri personal website

Static site (HTML/CSS/vanilla JS, no build step) on GitHub Pages.

- **Content:** all of it is in `content/data.js`. `js/render.js` turns it into HTML, and `js/main.js` renders it and handles interactions.
- **After editing data.js:** run `node tools/prerender.mjs` to refresh the no-JS HTML in `index.html` and `projects/*.html`.
- **Ground rules:**
  - No invented facts. `content/inventory.md` lists every allowed fact with its source.
  - Keep the phone number off the site.
  - Don't link the private SharePoint resume URLs.
- **Decision and status logs:** `DECISIONS.md` and `NOTES_FOR_KAMRAN.md`.
