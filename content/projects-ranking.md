# Project survey & ranking

Each project is scored 1–5 on five criteria: **D**epth, **R**elevance to DS/SWE roles, **C**ompleteness, **O**riginality and **V**isual-ability.

**Sources**
- Alien Shooter, NBA four-point line, Bus Reliability Tracker and API_Autopilot were surveyed from their code in this session. I surveyed the NBA project myself because it was two short scripts and three CSVs; the other three each got a subagent.
- Tower Defense, Connect 4, Civ Tycoon and Sports Sim live in `Final Version Projects CSA&CSP` on Kamran's PC, which this session can't reach. Their facts come from the earlier site's project data, which was written from that code. Treat them as second-hand.

| Project | D | R | C | O | V | Total | Decision |
|---|---|---|---|---|---|---|---|
| Space Tower Defense (Java/JavaFX) | 4 | 3 | 4 | 3 | 4 | **18** | Featured |
| NBA four-point line (DSC team, Python/pandas) | 2 | 5 | 1 | 4 | 5 | **17** | Featured (in progress; only data project; chart from real data) |
| Connect 4: Custom Variant (Java/JavaFX) | 4 | 3 | 4 | 4 | 2 | **17** | Featured |
| Alien Shooter (JS/Canvas) | 3 | 2 | 3 | 3 | 5 | **16** | Featured (playable in browser) |
| Civ Tycoon (Java/JavaFX) | 3 | 3 | 3 | 4 | 1 | 14 | Other |
| Bus Reliability Tracker (Python) | 2 | 5 | 1 | 4 | 1 | 13 | Other (labelled "in progress") |
| Sports Team Sim (Python) | 2 | 3 | 3 | 3 | 1 | 12 | Other |
| API_Autopilot (JS CLI) | n/a | | | | | | **Excluded**: no commits by Kamran |
| Battle Game, Nerdle Clone, Word Search | n/a | | | | | | **Excluded**: Kamran had removed them from the old site |
| discovery-micro-projects, github-demo, test | n/a | | | | | | **Excluded**: empty or README-only repos |

## Survey notes

### Alien Shooter: `demos/alien-shooter/` (solo, by all evidence)
- **What it is:** a canvas game (1500×800) with WASD movement. You pick up a falling laser gun, then click to fire.
- **Waves:** 20 one-hit aliens, then 12 yellow aliens with 2 HP (they fire a green laser when destroyed), then a mix, then a boss on a space-station background. After the boss the waves repeat with 2 more aliens each cycle.
- **Boss:** 150 HP, and each laser hit does 10 damage. It homes to a snapshot of your position, pauses 1 s, fires an 8-way fireball burst (30 damage each), then resumes after 2.5 s.
- **Player and power-ups:** the player has 300 HP. Power-ups are a healing kit (+50), ice (freezes aliens for 2 s), invisibility (aliens flee for 2 s) and a speed boost (10 → 15 for 4 s).
- **Collision:** AABB collision, plus pairwise separation so aliens don't stack.
- **Stack and size:** vanilla JS + jQuery 3.5.1 (only for keydown); 778 lines, 33 functions, no classes.
- **Issues:** possible TypeError when an enemy laser is spliced mid-loop, a per-frame `console.log`, an `H` health cheat, a debug coordinates paragraph, fireballs moving 8× too fast, and click aim that ignores the canvas offset. SpaceBackground.jpg is 1.7 MB. No secrets.

### NBA four-point line: `UIUC-DSC/team-Starting-Five-Minus-One` (team of 4 on GitHub)
- **Data:** three CSVs, for seasons 2021-22 to 2025-26.
  - Shooting by range for 700 player-seasons.
  - Top-50 3PM shooters per season, by shot distance (3,183 rows).
  - The same top-50 shooters in distance buckets (250 rows).
- **Code so far:** a pandas loader and a graphs module stub.
- **Kamran's commit:** reorganized and renamed the files and created the graphs module that imports the loaded data.
- **Status:** early. No analysis or graphs committed yet.
- A friend's companion repo (`mallinitin14/nba-four-point-line-datadive`) has only a README.
- **Real-data chart** (aggregated here): 3P% for those shooters falls from 42.1% at 22 ft to 31.0% at 30 ft. Past 30 ft, attempts are few (under 2% of the total).

### Bus Reliability Tracker: `transit-bus-delay` (solo)
- **Goal:** track bus reliability on Champaign-Urbana MTD's GTFS-Realtime feeds.
- **Status:** phase 1 of 5. Only config loading/validation (a frozen dataclass that reports every problem at once and rejects placeholder values) and UTC rotating-file logging exist, 124 lines in total.
- **Tests and tooling:** 7 pytest tests, ruff and pre-commit, GitHub Actions CI.
- **Not built yet:** collection, storage, analysis and the dashboard.
- **Other findings:** no secrets (`.env.example` holds only placeholders), LICENSE still says "YOUR NAME HERE", and 5 of the 6 dependencies are declared but unused.

### API_Autopilot: `ishaanman7898/API_Autopilot`
- **What it is:** a Node CLI and GitHub Action that applies signed migration rules to JS/TS code.
- **Commits:** 141, all by Ishaan and Ayush Kansal. No mention of Kamran anywhere.
- **Decision:** excluded until Kamran confirms a role.

### Second-hand (from the old site, code not available)
- **Tower Defense:**
  - Enemies: Basic, Dashing and Stealer aliens. Defenders: Shooter, Shield and Mine robots. Both use inheritance and polymorphism.
  - Waves spawn on a 30-second timer, with randomized composition and rising difficulty.
  - Energy economy, plus power-ups that slow enemies or speed up attacks.
  - JavaFX Canvas + AnimationTimer, 10+ object types, collision and row-based targeting.
  - Sprites are in `assets/img/pvz/`.
- **Connect 4 variant:**
  - Players earn currency and spend it in a shop.
  - Special pieces: bomb, shrapnel bomb, line-clearer and infector. The infector spreads breadth-first, generation by generation, capped at 20.
  - Modular piece classes; JavaFX AnimationTimer.
- **Civ Tycoon:**
  - Building/Person class hierarchies.
  - Nearest-resource search that expands square by square.
  - Repair crews; random earthquakes and alien invasions; a day tracker.
- **Sports Team Sim:** console basketball manager with a 7-stat player model, a stat store, opponents that improve, random events and PrettyTable output.
