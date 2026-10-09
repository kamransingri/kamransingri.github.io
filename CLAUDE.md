# Kamran Singri personal website

Portfolio site for Kamran Singri (UIUC, B.S. Statistics & CS, James Scholar) to link from his resume for employers. Static HTML/CSS/vanilla JS, no build step, hosted on GitHub Pages.

## Decisions already made
- Style: light, simple and clean (off-white, blue accent, system sans). CSS variables are at the top of `css/style.css`.
- Hosting: GitHub Pages (`<username>.github.io`). Keep it static; no frameworks or bundlers.
- Extras chosen: playable demo (Alien Shooter). Not chosen: headshot, contact form. Contact is `mailto:` only.
- Phone number is deliberately NOT on the site (email only). Ask before adding it.
- Never link the SharePoint resume URLs; they are private (403).

## Layout
- `index.html`: all sections (Hero, About, Education, Projects, Skills, Experience, Contact).
- `css/style.css`: theme and responsive styles.
- `js/main.js`: `PROJECTS` array (edit it to add or change project cards), modal, filters, mobile nav, scroll reveal, resume-button check.
- `demos/alien-shooter/`: self-contained copy of the Alien Shooter game (loads jQuery from a CDN).
- `assets/img/`: sprites from the PvZ-remake and Battle Game projects.
- Preview: `python -m http.server 8000` in this folder.

## Content sources
- Main resume: `C:\Users\kamra\Downloads\Kamran_Singri_Resume_v3.docx`; extras: `...\Freshman_Resume version 1  - Kamran Singri.docx`.
- Project code: `D:\Final Version Projects CSA&CSP` (8 projects). The resume's "Tower Defense Game" is the `Plants v. Zombies remake Final` folder.
- Accuracy note: the Connect 4 infection piece is a breadth-first, generation-by-generation spread (capped at 20), not a classic flood fill. The site says "breadth-first"; the resume still says "flood-fill".

## Open to-dos
- Add resume PDF at `assets/Kamran_Singri_Resume.pdf` (the Resume button appears automatically).
- Add GitHub URL (commented-out link in the Contact section); LinkedIn is added.
- Add screenshots for Connect 4, Civ Tycoon and Sports Sim (they currently use text placeholders).
- Battle Game, Nerdle Clone and Word Search cards were removed from `PROJECTS` on request (kept out for now; sprites in `assets/img/battle/` are unused).
- Add GitHub repo links to project cards once the repos exist.
- Test in a browser at desktop and ~375px width (not yet done after the first build).
- Optional: compress `demos/alien-shooter/Pictures/SpaceBackground.jpg` (1.7 MB).
