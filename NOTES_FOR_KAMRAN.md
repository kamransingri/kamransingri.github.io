# Notes for Kamran

_Last updated: Phase 3 complete._

## Status
- [x] Phase 1: inventory and project selection
- [x] Phase 2: core site
- [x] Phase 3: project write-ups and visuals
- [ ] Phase 4: interactivity
- [ ] Phase 5: QA
- [ ] Phase 6: polish

## Important: where the work is and why it isn't pushed
- **Where:** everything is on a new branch, `site-redesign`, in a fresh clone of your `kamransingri.github.io` repo. Your live `main` branch is untouched.
- **Why it isn't pushed:** this cloud session wasn't allowed to get push access to the repo; the request was blocked by the session's permission settings. Commits are made locally after every phase.
- **Fallback:** after each phase I also send you a zip of the site and a `git bundle` of the branch in the chat, so nothing is lost if the session ends.
  - To use the bundle, run `git fetch <bundle-file> site-redesign:site-redesign` inside your repo, then push the branch yourself.

## What I could and couldn't access
- **Couldn't open:** the Windows paths in your message (`C:\Users\kamra\...`), including `Kamran_Singri_Resume_v3.docx`, `Claude Resume Version 1.docx` and the `Final Version Projects CSA&CSP` folder. The session runs in a cloud container, not on your PC.
- **Used instead:**
  - The two resumes you uploaded. `KAMRAN_SINGRI.docx` (Oct 22) is the newest, so it wins any conflict.
  - Your old site (already in the repo), whose project descriptions were written from your project code in an earlier session.
  - Your GitHub repos.
- **Not received:** the Common App activities list wasn't attached, so nothing on the site comes from it.

## Please confirm
1. **Java projects (Tower Defense, Connect 4, Civ Tycoon, Sports Sim):** descriptions come from your old site, not from code I could read this time. Please skim them for accuracy.
2. **NBA four-point line (Data Science Club):** your brief left "I did Y" blank. From GitHub, your commit reorganized and renamed the files and set up `nba_four_point_graphs.py`. That's all the site claims, plus "the team is working on the analysis". Tell me what you actually own (graphs? analysis?) and I'll update it.
3. **NBA chart:** the chart on the site (3P% by shot distance) is one I computed from the team's committed CSVs for this site. It's labelled that way. Remove it if you'd rather not show unfinished club work.
4. **Apartment app with friends:** mentioned in your brief's example, but I found no repo for it. Not on the site.
5. **API_Autopilot:** you have push access, but all 141 commits are by Ishaan and Ayush Kansal. Left off the site. Tell me your role if you want it added.
6. **"Directed activities for up to 60 students":** in the Oct resume but not the Aug one. Used, because the newest resume wins.
7. **Claims dropped from the old site (not in either resume):**
   - "25+ meets" and "helped coaches with event setup" (Track)
   - "Ran in 4+ fundraising races" (Kids Against Hunger)
   - Maven and IntelliJ in skills
   - Re-add any of these if they're true.
8. **Graduation and contact details:** expected graduation May 2030, GitHub `kamransingri` and LinkedIn `kamran-singri-745344428` were taken from your resume, repo owner name and old site, because the brief left them blank.
9. **Resume PDF:** `assets/resume.pdf` is converted from `KAMRAN_SINGRI.docx`. It includes your phone number and home town, as your resume does. The page itself shows email only.
10. **Bus Reliability Tracker:** it's listed as "in progress, phase 1 of 5". Its LICENSE still says "YOUR NAME HERE", and it is a private repo, so the site doesn't link it.

## Security scan
- **Bus Reliability Tracker** (`transit-bus-delay`): only `.env.example`, containing placeholders (`CHANGE_ME`, `you@example.com`). No real `.env`, no keys.
- **API_Autopilot:** only fake AWS-style keys used as test fixtures. Nothing copied.
- **NBA repo and Alien Shooter:** no secrets. The NBA repo has committed `__pycache__/*.pyc` files (harmless, but worth a `.gitignore`).
- **Personal data:** your phone number is in the resume PDF only, not in the site's HTML.

## High-school items cut
- **Business Professionals of America:** competition entries; no leadership or technical depth.
- **Track & Field:** folded into a one-line activity (recruiting 5+ athletes) and the About text.

## Project pages (Phase 3)
- **Pages:** `projects/space-tower-defense.html`, `nba-four-point-line.html`, `connect-4-variant.html`, `alien-shooter.html`.
- **Visuals:**
  - **Alien Shooter:** two real screenshots, taken by running the game in a headless browser. For the boss shot I skipped to wave 4 from the browser console. There are also two verbatim code excerpts, `bossAttack` and `collision`.
  - **NBA:** a chart computed from the team's CSVs, plus your `nba_four_point_graphs.py` shown verbatim.
  - **Tower Defense:** your real sprites, plus a simple diagram of the class hierarchies and game systems. It uses descriptive labels, not your actual class names, which I couldn't see.
  - **Connect 4:** a labelled illustration of the breadth-first infection. The board layout is made up; the spread logic follows the description of your code.
- **Please confirm:** every "What I learned" paragraph is my draft based on the code and project facts. Please rewrite them in your own words; they're the most personal part of each page.
- **Please confirm (Tower Defense & Connect 4):** the pages say "Code isn't public yet." Push those projects to GitHub and add a `links` entry in `content/data.js` to show a code link.

## Next
Phase 4: interactivity.
