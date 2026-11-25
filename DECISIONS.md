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

## Polish: a fifth write-up page? No.
- **Bus Reliability Tracker** only has config loading and logging (124 lines). A full page would mostly describe plans, so it stays as a compact "in progress" entry.
- **Civ Tycoon and Sports Team Sim** would be written entirely from the old site's second-hand summary, because their code isn't reachable from this session. That isn't enough to ground "how I built it" and "key techniques" sections.
- **Revisit** once the bus collector exists. That project is the strongest future data-science write-up, with real delay data and a chart. Or revisit if Civ Tycoon's code goes on GitHub.

## Polish: print, OG, 404
- **Print stylesheet:** prints like a resume. Navigation, filters, visuals and buttons are hidden; external URLs are printed; "More detail" entries open for printing; entries don't split across pages.
- **OG image:** the name and one-liner, plus a small line chart drawn from the same real NBA numbers as the site chart.
- **404 page:** uses root-absolute paths, because GitHub Pages serves `404.html` at whatever path was requested.

## Follow-up: Kamran's note on incomplete GitHub projects
- **Bus Reliability Tracker removed** from Other projects. It's a phase-1 skeleton with nothing to show yet; the About text still mentions it as just started.
- **NBA Four-Point Line kept.** It has real data and a real chart, and its "in progress" label and narrow role description are honest.

## Layout: recruiter order (after the Impeccable critique)
- **Why:** the critique found the proof buried. Projects started about 1,600px down, after tutoring, and class year, GPA and the ask weren't on the first screen.
- **Hero:** the name is followed by an at-a-glance line (`person.credentials`: Statistics & CS at UIUC · Class of 2029 · James Scholar · GPA 4.0), then the intro, then the ask (`person.seeking`). The ask is led by a short red-pen tick. The old kicker above the name is gone.
- **Order:** Projects (01) → About (02) → Experience (03, with Leadership & activities as a sub-list) → Education & skills (04) → Contact. The nav dropped Activities, leaving five links.
- **Education & skills:** on wide screens they sit side by side in one band; on phones they stack.
- **Sub-headings** ("Other projects", "Leadership & activities") are unnumbered h3s; their items are h4s. "03b" is gone.

## Distill (after the Impeccable critique)
- **Project filter removed.** Six chips for seven projects added a decision without saving any effort, and "1 of 6 shown" on the Data filter advertised thinness. `tags` stay in `data.js` as metadata if a filter is ever worth bringing back (10+ projects).
- **NBA code excerpt removed.** The 6-line `nba_four_point_graphs.py` file read as negative evidence next to the EPA analysis and simulation work.
- **NBA techniques trimmed** to EPA by shot distance, Monte Carlo simulation and pandas. "Module structure" repeated a "What I built" bullet, and "Git with a team" said nothing specific.

## Polish (final pass of the critique fixes)
- **Tower Defense card** shows the class-structure diagram instead of the sprite row. The sprites (which Kamran likely didn't draw) stay on the write-up page.
- **Project labels:** no more 01–04 numbers on project cards. A context line (team, dates, "Playable in the browser") shows only where there is one.
- **Labels above titles are gone** (write-ups and 404). The context sits under the title instead, like the homepage's at-a-glance line.
- **"Code isn't public yet"** is now "Code available on request." under the tags. The Links section only appears when there are links.
- **NBA chart:** "3-point %" y-axis label, and 95% confidence-interval bars (normal approximation), also in the tooltip and the numbers table.
- **Dark mode sprite tray:** still light (the dark sprites vanish on a dark ground), but dimmed to `#c9c3b8` via `--sprite-tray`.
- **Small finish:** `text-wrap: pretty`/`balance`, themed text selection and scrollbars, tabular numbers in the data table. The project title isn't its own tab stop ("Read the write-up" is).

## Fixes from the second critique (22/32)
- **Order:** NBA leads the featured projects, then Alien Shooter, Space Tower Defense and Simmer. Connect 4 moved to Other projects but keeps its write-up; write-ups now come from a `page` block, not `featured`.
- **Simmer** is featured as a text-only card until it has a screenshot and a write-up (Kamran's call).
- **Chart headline** states the well-sampled trend (24 to 30 ft: 39.7% to 31.0%), not peak-to-trough. The two labeled points match it (`charts.nba.labelFt`).
- **Write-ups** end with the internship ask plus Resume and Email. Their links sit under the tags, and their nav and footer match the homepage.
- **Diagram card** picks 1–3 columns by its own width (container query). This fixes overflow at 880–1,100px.
- **Connect 4 caption** describes pieces as solid grey vs outlined, which is true in both themes.
- **One layout for dated entries** (Experience matches Activities and Education). Skills are split into Data and Tools. The chart shows a keyboard hint once focused.
