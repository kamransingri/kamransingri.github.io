# Notes for Kamran

_Final: all six phases done._

## What was built
- **A redesigned personal site** on the branch **`site-redesign`** of your `kamransingri.github.io` repo. Your live `main` branch is untouched.
- **One-page home:**
  - **Intro:** name, "UIUC · Statistics & CS · data science", and links to your resume PDF, GitHub, LinkedIn and email.
  - **Sections:** About, an Experience timeline (expandable details), Featured projects (with a tag filter), Other projects, Education + skills, Leadership & activities, and Contact (with a copy-email button).
- **Four project write-ups** in `projects/`. Each covers the question, what I built, key techniques, what I learned, and links.
  - **Space Tower Defense:** your sprites, plus a diagram of the class hierarchies and systems.
  - **NBA Four-Point Line:** an interactive chart of 3P% by distance, computed from your team's real CSVs, with hover/keyboard tooltips and a data table.
  - **Connect 4 variant:** a labelled illustration of the breadth-first infection.
  - **Alien Shooter:** two real gameplay screenshots, two verbatim code excerpts, and a link to the playable game.
- **Design:**
  - Source Serif 4 + IBM Plex Mono (self-hosted), warm paper/ink colors and one "red pen" accent.
  - Section dividers drawn as chart axes with tick marks.
  - Light/dark toggle that follows your system theme and remembers your choice.
  - Full reasoning is in `DECISIONS.md`.
- **Content:** all of it is in **`content/data.js`**. The HTML also carries a prerendered copy (`node tools/prerender.mjs`), so the site works with JavaScript off.
- **Extras:** favicon (KS), OG preview image with a real-data sparkline, print stylesheet, 404 page, and resume PDF (`assets/resume.pdf`, converted from `KAMRAN_SINGRI.docx`).
- **Quality:**
  - Lighthouse: home page 96 (mobile) / 100 (desktop) for performance, 100 for accessibility, best practices and SEO. Project pages: 98+ / 100.
  - Text contrast meets WCAG AA in both themes.
  - No console errors and no broken internal links.
  - Every interactive control works with the keyboard and respects reduced motion.
  - Images shrank the site from 5.0 MB to 1.7 MB.
- **Docs:** `README.md` covers how to edit, preview and deploy. `content/inventory.md` lists every fact with its source. `content/projects-ranking.md` has the project scoring.

## The work isn't pushed yet: please do this
This cloud session wasn't allowed push access to your repo; the request was blocked by the session's permission settings. All work is committed locally on `site-redesign`, and I sent you two files in the chat:
- **`kamransingri-site-redesign.bundle`**, a git bundle of the branch with full history. In your local clone of `kamransingri.github.io`:
  ```bash
  git fetch /path/to/kamransingri-site-redesign.bundle site-redesign:site-redesign
  git push -u origin site-redesign
  ```
- **`kamransingri-site.zip`**, a plain copy of the site files, if you'd rather upload them directly.

## Deployment steps
1. Push `site-redesign` (above), then open a pull request into `main` on GitHub and review it.
2. Merge it.
3. **Settings → Pages → Source:** "Deploy from a branch", **Branch:** `main` / `(root)`, **Save** (skip if already set).
4. Wait about a minute, then open https://kamransingri.github.io. Click the GitHub and LinkedIn links once; this sandbox couldn't reach those sites to check them.
5. Optional: paste the URL into LinkedIn's Post Inspector to check the preview card.

More detail is in `README.md`.

## Please confirm
1. **Java project facts (Tower Defense, Connect 4, Civ Tycoon, Sports Sim):**
   - Your projects folder was on your PC (`C:\...` / `D:\...`), which this cloud session can't open.
   - These descriptions come from your previous site's data, which was written from that code. Please skim them.
   - If you push those projects to GitHub, add `links: [{ label: "Code", href: "…" }]` in `data.js`.
2. **NBA four-point line, your role:**
   - The site only claims what GitHub shows: you reorganized and renamed the files and created `nba_four_point_graphs.py`.
   - Tell me (or edit `data.js`) what else you own: graphs, analysis, the presentation.
   - The team's exact research question isn't stated anywhere, so the page uses neutral wording.
3. **NBA chart:** I computed it from the team's committed CSVs; the caption says it's not a team result. Remove it (`visual` in `data.js`) if you'd rather not show unfinished club work.
4. **"What I learned" paragraphs:** these are my drafts, grounded in the code. They're the most personal part of each page, so please rewrite them in your own words.
5. **"Apartment app with friends":** your brief's example mentioned it, but I found no repo or document for it. Not on the site.
6. **API_Autopilot:** all 141 commits are by Ishaan and Ayush Kansal, so it's left off. Add it if you had a role.
7. **"Up to 60 students per session" (CS Kids):** this is in your Oct 2026 resume but not the Aug one. Used, because the newest resume wins.
8. **Old-site claims I dropped** because neither resume has them:
   - Track: "25+ meets", "helped coaches with event setup"
   - Kids Against Hunger: "ran in 4+ fundraising races"
   - Skills: "Maven, IntelliJ"
   - Re-add any of these if they're true.
9. **Not received:**
   - Common App activities list: not attached, so nothing comes from it.
   - `Kamran_Singri_Resume_v3.docx` and `Claude Resume Version 1.docx`: on your PC, so I couldn't open them.
10. **Blank fields in your brief:** filled from your documents and accounts:
    - name "Kamran Singri"
    - graduation May 2030
    - GitHub `kamransingri`
    - LinkedIn `kamran-singri-745344428` (from the old site)
    - email kamransingri@gmail.com
11. **Resume PDF:** it includes your phone number and Roselle, IL, exactly like your resume. The web pages show only your email. Replace `assets/resume.pdf` whenever you update your resume.
12. **About copy:** the brief said "music". I wrote "most of my free time goes to sports, music, the gym and cooking" rather than guessing whether you play or listen.
13. **Alien Shooter change:** I added two `continue` lines in `moveBadLaser` (`demos/alien-shooter/script.js`) to stop a possible TypeError. I left everything else as is. Optional cleanups for you:
    - a per-frame `console.log(wave)`
    - the `H` key that sets health to 3000
    - the "Coordinates:" debug line
    - boss fireballs moving faster than intended
    - click-aim ignoring the canvas position
14. **Bus Reliability Tracker:**
    - It's described as "in progress, phase 1 of 5", without a link, because the repo is private.
    - Its LICENSE still says "YOUR NAME HERE".
    - Five of its six declared dependencies aren't used yet.
15. **"Fall 2026" for the Data Science Club:** inferred from the repo's October 2026 commits.

## Security scan
- **`transit-bus-delay`:** only `.env.example` with placeholders (`CHANGE_ME`, `you@example.com`). No real `.env`, no keys.
- **API_Autopilot:** only fake AWS-style keys used as test fixtures. Nothing copied.
- **NBA repo and Alien Shooter:** no secrets. The NBA repo commits `__pycache__/*.pyc`; consider adding a `.gitignore`.
- **This site:** no keys or tokens. Your phone number appears only inside the resume PDF.

## Decisions worth knowing
Full list in `DECISIONS.md`.
- **Featured:** Tower Defense, NBA Four-Point Line, Connect 4, Alien Shooter.
- **Other:** Civ Tycoon, Bus Tracker, Sports Sim.
- **Excluded:** API_Autopilot, the empty repos, and Battle/Nerdle/Word Search, which you'd removed before.
- **High-school items kept:** CS Kids, Math Tutoring, Kids Against Hunger. Track is now one line. BPA is cut.
- **No fifth write-up page:** nothing left was strong or first-hand enough. The Bus Tracker is the best candidate once it collects real data.
- **The research sites** (brittanychiang.com etc.) were blocked by this session's network policy, so the design notes come from what I already knew about them.

## Ideas for next time
- Push the Java projects to GitHub and link them. Add one screenshot each for Connect 4 and Civ Tycoon (`visual: { type: "image", … }`).
- When the bus collector runs, add a real delay chart and turn it into a featured data project.
- Once the NBA analysis is done, replace my chart with the team's actual graphs and findings.
