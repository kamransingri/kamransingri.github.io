# Decisions

## Content
- **Primary source is the newest resume.** `KAMRAN_SINGRI.docx` (modified 2026-10-22) is primary. The Aug/Sep "Freshman Resume" is secondary.
- **Project facts I couldn't verify against code** come from the old site's data and are flagged in NOTES.
- **Featured projects:** Space Tower Defense, NBA four-point line, Connect 4 variant and Alien Shooter. The scoring is in `content/projects-ranking.md`.
  - The NBA project scores low on completeness but is featured anyway. It's the only data-science work, it's current (Oct 2026), and its committed data supports a real chart.
- **Other projects:** Civ Tycoon, Bus Reliability Tracker (in progress) and Sports Team Sim.
- **Excluded:** API_Autopilot (no authorship evidence); Battle/Nerdle/Word Search (removed earlier by Kamran); empty repos.
- **High-school items kept:** CS Kids mentor, math tutor and Kids Against Hunger, which show leadership, teaching and long-term commitment. Track becomes one line. BPA is cut.
- **Phone number stays off the HTML,** following the old site's recorded decision.

## Research: conventions from strong personal sites
The reference sites (brittanychiang.com, leerob.com, joshwcomeau.com, paco.me, rauno.me) are **blocked by this session's network policy**, so these notes come from what I already know about those sites, not a fresh visit.

- **Name, one line, then links.** No splash and no "Hi, I'm…". Resume, GitHub, LinkedIn and email sit above the fold (Chiang, Robinson).
- **Experience as a dated list.** Date range in a small muted column, then role · org, then one sentence. Detail is optional, behind a click or hover (Chiang).
- **Projects as rows, not a grid of identical cards.** Each has a title, a one-line summary, small tech tags, and a real image or demo where one exists (Chiang).
- **Single column, short line length, lots of whitespace.** Typography does the hierarchy, with almost no boxes or shadows (Robinson, Paco, Rauno).
- **One accent color, used sparingly** for links and the current-state marker. Everything else is near-black and greys (Paco, Rauno).
- **A small signature detail rewards a closer look.** Comeau's playful touches, Rauno's interaction craft. One detail, not ten.
- **First person, plain and specific.** Comeau's About pages talk like a person; the copy says what was built, not adjectives.
- **Sticky, minimal nav that shows where you are** (Chiang's section highlight).

## Design direction
- **Type pairing: Source Serif 4 (text and headings) + IBM Plex Mono (labels, dates, tags, numbers).**
  - A serif text face reads like a stats paper or textbook, which suits a Statistics & CS student. It also steps away from the default Inter/system-sans look.
  - Plex Mono marks anything that is data: dates, counts, tags, chart axes.
  - Both are self-hosted woff2 (3 files, about 150 KB), so there's no third-party request.
- **Palette:**
  - Warm off-white paper (`#f8f6f1`) and near-black ink (`#1c1b19`), with warm greys for rules and muted text.
  - **One accent: a "red pen" vermilion** (`#a53d1b` light / `#f0906e` dark), the color you mark up a printout with.
  - Dark mode is its own selected palette, not an inversion.
- **Signature detail: section dividers are drawn as a chart axis with minor and major tick marks** (pure CSS gradients).
  - The experience timeline is a vertical axis with tick marks.
  - The NBA project shows a real chart in the same ink.
  - It ties the whole page to the data theme without decoration for its own sake.
- **Layout:**
  - One left edge for the whole page. Text blocks are capped at about 42rem (~70 characters).
  - Projects use the wider measure so each row can sit text-left, visual-right.
  - Nothing is centered except the board illustration's cells.

## Build
- **Content:** all of it lives in `content/data.js` (`window.SITE`). `js/render.js` turns it into HTML.
- **Prerendering:**
  - `tools/prerender.mjs` (plain Node, no dependencies) writes the same HTML into `index.html` and `projects/*.html`, so the site reads fine with JS off and link previews see real text.
  - In the browser, `main.js` re-renders from data.js, so an edit shows up even if prerender isn't re-run.
  - This isn't a build step: the site deploys as-is.
- **Project pages** come from `tools/project-template.html`, one per featured project.
- **The NBA chart** is inline SVG built from numbers aggregated from the team's committed CSV.
  - It's redrawn at the actual container width, so labels stay legible on phones.
  - Every point has a `<title>`, and a "Show the numbers" table backs it up.
- **The Connect 4 visual** is a labelled illustration of the breadth-first capture (the code isn't available to screenshot).
- **Removed:** the unused Battle Game sprites (`assets/img/battle/`). Kamran had already pulled that project from the site.
