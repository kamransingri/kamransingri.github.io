# kamransingri.github.io

Kamran Singri's personal site. It's plain HTML, CSS and vanilla JavaScript, with no framework and no build step. It deploys to GitHub Pages exactly as it is in this folder.

## Editing content

**All text lives in one file: `content/data.js`.** Open it, change the words, save, and reload the page.

| To change… | Edit this in `content/data.js` |
|---|---|
| Name, one-liner, intro, links | `person` |
| About paragraphs | `about` (one string per paragraph) |
| Experience timeline | `experience`. `summary` is always shown; `details` sit behind "More detail". |
| Projects | `projects`. See below. |
| Education and skills | `education`, `skills` |
| Leadership & activities | `activities` |
| Contact blurb | `contact` |
| NBA chart numbers | `charts.nba.rows` |

**Formatting:**
- Inside any text you can write `[link text](https://example.com)` for a link and `` `code` `` for inline code.
- Keep the quotes and commas. If the page goes blank after an edit, a missing comma or quote is the usual cause. Open the browser console to see the line number.

**Projects:**
- Each project has `slug`, `title`, `summary`, `tags` (these drive the filter buttons), `stack` (shown as small labels) and optional `links`.
- **To feature a project:** set `featured: true`. Featured projects also need a `visual` and a `page` block (`question`, `built`, `techniques`, `learned`, optional `extras`). The four existing ones are good templates.
- **To add a code link to a project:**
  ```js
  links: [{ label: "Code", href: "https://github.com/kamransingri/<repo>" }]
  ```
- **To add a new featured project page:** add the project to `data.js`, then run the prerender step below. It creates `projects/<slug>.html` from `tools/project-template.html`.

### Optional: refresh the no-JavaScript copy
The browser builds every page from `data.js`. The HTML files also hold a pre-rendered copy, so the site reads fine with JavaScript turned off and link previews show real text. After you edit `data.js`, refresh that copy with Node 18 or newer:

```bash
node tools/prerender.mjs
```

If you skip this, the site still shows your new text to everyone with JavaScript on, which is nearly everyone.

### Other files you might touch
- `assets/resume.pdf`: replace it with your latest resume (keep the file name).
- `assets/img/`: screenshots and sprites. Use `.webp`, at most about 1200 px wide.
- `assets/og.png`: the link-preview image. It's generated from `tools/og.html`; re-create it with any screenshot tool at 1200×630.
- `css/style.css`: colors and fonts are tokens at the top (`--accent`, `--bg`, …). The dark theme is set up in two places, a `prefers-color-scheme` block and a `[data-theme="dark"]` block, so change both.

## Previewing locally

From this folder, run:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. Opening `index.html` straight from disk mostly works too, but a local server is closer to how GitHub Pages behaves.

## Deploying to GitHub Pages at `kamransingri.github.io`

The repo `kamransingri/kamransingri.github.io` already exists, and this redesign is on the branch `site-redesign`.

1. **Get the branch onto GitHub.**
   - If you have the branch locally (from the session's git bundle), run:
     ```bash
     git fetch /path/to/kamransingri-site-redesign.bundle site-redesign:site-redesign
     ```
   - Then push it:
     ```bash
     git push -u origin site-redesign
     ```
2. **Review it.** On GitHub, open a pull request from `site-redesign` into `main` and look through the changes.
3. **Merge** the pull request into `main`.
4. **Turn on Pages** if it isn't already: the repo's **Settings → Pages**, then:
   - *Source:* "Deploy from a branch"
   - *Branch:* `main`, folder `/ (root)`, then **Save**.
5. **Wait about a minute,** then visit https://kamransingri.github.io. The Pages settings screen shows the live URL once the deploy finishes, and the **Actions** tab shows its progress.
6. **Check the preview card.** Paste the link into LinkedIn's Post Inspector or a Discord message to see the `og.png` preview.

**Starting from scratch on a different account:**
1. Create a public repo named `<username>.github.io`.
2. Upload or push the contents of this folder to `main`.
3. Follow steps 4–5 above.
4. Update `person.siteUrl` in `data.js` and the `canonical`/`og:` URLs in `index.html` and `tools/project-template.html`.

## Project layout
```
index.html                  the single page (contains a prerendered copy of data.js content)
projects/*.html             one write-up per featured project (generated)
content/data.js             ALL site content
content/inventory.md        every fact on the site, with its source
content/projects-ranking.md how projects were scored and chosen
js/render.js                turns data.js into HTML (shared by the browser and the prerender script)
js/main.js                  renders the page and runs the small interactions
css/style.css               all styles (tokens at the top)
assets/                     fonts, images, resume PDF, OG image
demos/alien-shooter/        the playable game
tools/                      prerender script, project page template, OG image template
404.html                    "page not found" page
DECISIONS.md                design and content decisions
NOTES_FOR_KAMRAN.md         open questions and status
```
