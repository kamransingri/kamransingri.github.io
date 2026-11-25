/*
 * ALL SITE CONTENT LIVES HERE.
 * Edit text in this file, save, and reload the page. Nothing else needs to change.
 * (Optional: run `node tools/prerender.mjs` afterwards so visitors without
 * JavaScript, and link previews, see the same text. See README.md.)
 *
 * Plain strings only. To add a link inside a paragraph, use [text](url).
 */
window.SITE = {
  person: {
    name: "Kamran Singri",
    initials: "KS",
    // Short facts shown right under the name, in this order.
    credentials: ["Statistics & CS at UIUC", "Class of 2029", "James Scholar Honors", "GPA 4.0"],
    intro:
      "I'm a first-year drawn to data science. Right now I'm working out where an NBA four-point line should sit with my Data Science Club team, and building Simmer, a recipe and nutrition web app. Before that, I built games and simulations in Java.",
    // The ask, shown in the hero under the intro.
    seeking: "Looking for data science and software engineering internships.",
    email: "kamransingri@gmail.com",
    github: "https://github.com/kamransingri",
    linkedin: "https://www.linkedin.com/in/kamran-singri-745344428/",
    resume: "assets/resume.pdf",
    siteUrl: "https://kamransingri.github.io/",
    location: ""
  },

  about: [
    "I study Statistics & Computer Science at UIUC in the James Scholar Honors Program. A lot of what I've built so far is in Java: games and simulations with a lot of moving objects. Lately I've been pulling toward data, and both of my current projects lean on it: the NBA analysis, and the nutrition matching behind Simmer, which I'm writing in TypeScript. I've also started a project tracking how reliable Champaign's buses actually are.",
    "Before college I mentored elementary schoolers through Computer Science Kids, tutored high school students in math, and ran track. I've also packed meals with Kids Against Hunger since 2016. Away from the keyboard, most of my free time goes to sports, music, the gym and cooking."
  ],

  // Newest first (by end date).
  experience: [
    {
      role: "Tutor",
      org: "Math Tutoring",
      place: "Hoffman Estates, IL",
      start: "Sep 2025",
      end: "Jan 2026",
      summary:
        "Tutored high school students twice a week in everything from geometry to calculus.",
      details: [
        "Worked one on one with 5+ students a session, using visual demonstrations and worked examples.",
        "Worked with the other tutors on different ways to explain a topic when a student was stuck."
      ]
    },
    {
      role: "Mentor",
      org: "Computer Science Kids",
      place: "Hoffman Estates, IL",
      start: "Sep 2023",
      end: "Dec 2025",
      summary:
        "Taught intro computer science to classes of 15+ elementary school students.",
      details: [
        "Turned abstract programming ideas into lessons that made sense to elementary schoolers.",
        "Ran large-group activities for up to 60 students per session.",
        "Designed and ran hands-on activities with a team of other mentors to reinforce core CS concepts."
      ]
    }
  ],

  /* Projects, in display order. featured: true → big entry on the homepage. A page: {...} block → its own write-up at projects/<slug>.html (featured or not).
     tags are metadata only. visual.type: "sprites" | "chart" | "board" | "image" | "diagram" */
  projects: [
    {
      slug: "nba-four-point-line",
      title: "NBA Four-Point Line",
      featured: true,
      status: "In progress",
      summary:
        "A Data Science Club team of five using multi-season NBA shooting data to find where a four-point line should sit, and how it would change player performance and style of play.",
      tags: ["Python", "Data"],
      stack: ["Python", "pandas"],
      context: "UIUC Data Science Club · team of 5 · Aug 2026 – present",
      links: [
        { label: "Team repo", href: "https://github.com/UIUC-DSC/team-Starting-Five-Minus-One" }
      ],
      visual: {
        type: "chart",
        // 6 of the 7 distances from 27 to 33 ft beat 1.15 as a 4 (31 ft, at 1.14, doesn't). Recheck if the rows change.
        takeaway: "Counted as 4 past a 27-foot line, shots at 6 of 7 distances would beat an average three.",
        caption:
          "Expected points per shot is the make rate times what the shot is worth. This is the analysis I built for the team, redrawn from its dataset: each season's 50 players with the most made threes, 2021-22 to 2025-26. Bars are 95% confidence intervals; the 22 ft point is mostly corner threes.",
        source: "nba"
      },
      page: {
        question:
          "What could a four-point line look like in the NBA? Our team in UIUC's Data Science Club is exploring that with real shooting data.",
        built: [
          "I built the team's expected-points analysis: at every distance, the make rate times what the shot is worth, as a 3 and as a 4 past a proposed line at 27 feet. Most deep shots worth 4 would beat an average three, which is the case for a line there. The chart above redraws it.",
          "I built a k-means model that sorts 250 player-seasons into three shooter types: corner / catch-and-shoot, volume above-the-break, and deep-range creators. A 4-point line would mostly reward the deep-range creators, at about 0.2 extra points per game from 30+ ft makes against under 0.05 for the other two types.",
          "I helped define what our Monte Carlo simulation would model (a teammate implemented it). The simulation is validated by backtesting on the 2024-25 and 2025-26 seasons.",
          "The team's dataset covers the top 50 three-point makers in each season from 2021-22 to 2025-26. It gives makes and attempts at every distance, foot by foot from the arc out to 40+ ft, plus distance-bucket summaries for each player.",
          "Now I'm helping build the presentation of our findings for the club board."
        ],
        extras: [
          {
            type: "image",
            src: "assets/img/nba-kmeans.png", w: 1950, h: 750, zoom: true,
            alt: "Two charts from the k-means model. Left: 250 player-seasons plotted by share of threes from 30+ feet against 3-point percentage, colored by shooter type. Right: extra points per game from 30+ foot makes by type, about 0.2 for deep-range creators and under 0.05 for the other two.",
            caption: "My k-means output, as committed to the team repo: the three shooter types (left) and who a 4-point line would reward (right). Tap to open it full size."
          }
        ],
        techniques: [
          ["Expected points per shot", "Make rate times point value at every foot, as a 3 and as a 4, compared with the average three."],
          ["k-means clustering", "Grouping player-seasons into shooter types, then measuring who a 4-point line would reward."],
          ["Monte Carlo simulation", "Helped scope what the team's simulation models, and its backtest on the 2024-25 and 2025-26 seasons."]
        ],
        learned:
          "On a team of five, splitting the work cleanly matters: agreeing on exactly what the simulation should model let a teammate build it while I worked on expected points and shooter types. The data also taught me to respect sample size: very few shots come from 30+ feet, so the confidence intervals there are wide and any four-point estimate that far out needs care.",
        note: ""
      }
    },
    {
      slug: "alien-shooter",
      title: "Alien Shooter",
      featured: true,
      summary:
        "A top-down space shooter that runs in the browser: four waves, a boss with an 8-way fireball attack, and timed power-ups.",
      tags: ["JavaScript", "Games"],
      stack: ["JavaScript", "HTML5 Canvas", "jQuery"],
      context: "Playable in the browser",
      links: [{ label: "Play it", href: "demos/alien-shooter/index.html" }],
      visual: {
        type: "image",
        src: "assets/img/alien-shooter.webp", small: "assets/img/alien-shooter-640.webp",
        alt: "Alien Shooter gameplay: the astronaut on a starfield with aliens closing in",
        caption: "Screenshot from the playable build."
      },
      page: {
        question:
          "How far could I get building a complete arcade game from scratch on a plain HTML canvas, with no game engine?",
        built: [
          "Move with WASD, grab the laser gun that falls in, then click to fire. Aliens home in on you.",
          "Waves: 20 basic aliens, then 12 tougher yellow aliens that take two hits and fire back when destroyed, then a mix, then a boss. Beat the boss and the cycle repeats with more aliens each time.",
          "The boss has 150 HP. It tracks a snapshot of your position, pauses, fires fireballs in 8 directions, then starts chasing again.",
          "Four timed power-ups: a healing kit (+50 HP), ice (freezes aliens for 2 s), invisibility (aliens flee for 2 s), and a speed boost (4 s)."
        ],
        extras: [
          {
            type: "image",
            src: "assets/img/alien-shooter-boss.webp", small: "assets/img/alien-shooter-boss-640.webp",
            alt: "Alien Shooter boss wave: the boss in a space-station room, with pink fireballs flying outward",
            caption: "Boss wave: the fireballs are mid-burst after the boss reaches your last position."
          },
          {
            type: "code",
            file: "script.js, line 456",
            caption: "The boss's attack: remember where the player was, launch all 8 fireballs from the boss, then wait 2.5 seconds before chasing again.",
            text: "function bossAttack(){\n    tempPlayerLeft = player.left\n    tempPlayerTop = player.top\n    bossSpeed = 6\n    boss.move = false\n    if(boss.vis){\n        for(i=0; i<fireballArray.length; i++){\n            fireballArray[i].left = boss.left\n            fireballArray[i].top = boss.top\n            fireballArray[i].vis = true\n        }\n    }\n    setTimeout(function() {boss.move = true;}, 2500);\n}"
          },
          {
            type: "code",
            file: "script.js, line 772",
            caption: "Axis-aligned bounding-box collision, used for every hit in the game.",
            text: "function collision(first, second) {\n    if (first.left + first.width > second.left &&\n        first.left < second.left + second.width &&\n        first.top + first.height > second.top &&\n        first.top < second.top + second.height) {\n        return true\n    }\n}"
          }
        ],
        techniques: [
          ["Game loop", "A requestAnimationFrame loop that moves, collides and redraws every entity each frame."],
          ["Aiming", "Turns the click position relative to the player into one of 8 firing directions."],
          ["Collision", "Axis-aligned bounding-box checks, plus a pass that pushes aliens apart so they don't stack on top of each other."],
          ["Boss state machine", "Chase, pause, burst-fire, resume, all driven by timers."]
        ],
        learned:
          "The whole game is about 780 lines and 33 functions with no classes, and it shows: most state lives in global variables. If I rebuilt it, I'd give every entity a class with its own update and draw methods.",
        note: ""
      }
    },
    {
      slug: "space-tower-defense",
      title: "Space Tower Defense",
      featured: true,
      summary:
        "A lane-based tower defense game in Java. Robot defenders hold off waves of alien invaders.",
      tags: ["Java", "Games"],
      stack: ["Java", "JavaFX", "Object-oriented design"],
      links: [],
      // The class structure shows the engineering; the sprites live on the write-up page.
      visual: {
        type: "diagram",
        caption: "How the game is organized: two class hierarchies plus the systems that drive them.",
        groups: [
          { label: "Enemy classes", items: ["Basic Alien", "Dashing Alien", "Stealer Alien"] },
          { label: "Defender classes", items: ["Robot Shooter", "Robot Shield", "Robot Mine"] },
          { label: "Game systems", items: ["Wave timer (30 s)", "Energy economy", "Power-ups", "JavaFX game loop"] }
        ]
      },
      page: {
        question:
          "What does it take to build a real-time game with an economy, waves that get harder, and lots of different objects interacting every frame?",
        built: [
          "A lane-based tower defense game: robot defenders hold the rows while waves of aliens push in.",
          "Enemies and defenders are two class hierarchies built on inheritance and polymorphism: Basic, Dashing and Stealer aliens on one side, Shooter, Shield and Mine robots on the other.",
          "A new wave spawns every 30 seconds, with a randomized mix of enemies and difficulty that scales up as the game goes on.",
          "The economy runs on collectable Energy, and power-ups can slow enemies down or speed up defender attacks."
        ],
        extras: [
          {
            type: "sprites",
            caption: "Sprites from the game: three robot defenders and two of the aliens.",
            images: [
              { src: "assets/img/pvz/defenders/RobotShooter.webp", alt: "Robot Shooter defender sprite" },
              { src: "assets/img/pvz/defenders/RobotShield.webp", alt: "Robot Shield defender sprite" },
              { src: "assets/img/pvz/defenders/RobotMineActivated.webp", alt: "Robot Mine defender sprite" },
              { src: "assets/img/pvz/enemies/BasicAlien.webp", alt: "Basic Alien enemy sprite" },
              { src: "assets/img/pvz/enemies/DashingAlien.webp", alt: "Dashing Alien enemy sprite" }
            ]
          },
          {
            type: "sprites",
            caption: "More of the game's sprites: Energy, the two power-ups, the Stealer Alien and the Shooter's laser.",
            images: [
              { src: "assets/img/pvz/Energy.webp", alt: "Energy pickup sprite" },
              { src: "assets/img/pvz/PowerUpSlowDownEnemy.webp", alt: "Slow-down-enemies power-up sprite" },
              { src: "assets/img/pvz/PowerUpSpeedUpDefenderAttack.webp", alt: "Speed-up-defenders power-up sprite" },
              { src: "assets/img/pvz/enemies/StealerAlien.webp", alt: "Stealer Alien sprite" },
              { src: "assets/img/pvz/projectiles/RobotShooterLaser.webp", alt: "Robot Shooter laser sprite" }
            ]
          }
        ],
        techniques: [
          ["Inheritance & polymorphism", "Separate enemy and defender hierarchies, so each alien or robot type is its own subclass."],
          ["Real-time game loop", "JavaFX Canvas driven by an AnimationTimer, coordinating 10+ kinds of interacting objects."],
          ["Collision & targeting", "Collision detection, plus row-based targeting so defenders only engage aliens in their own lane."],
          ["Timed systems", "A 30-second wave timer with randomized wave composition and scaling difficulty."]
        ],
        learned:
          "This project was a real workout in object-oriented design. With six unit types, an economy and a wave system all running in one loop, the class hierarchies are what keep the game manageable.",
        note: "Code available on request."
      }
    },
    {
      slug: "simmer",
      title: "Simmer",
      featured: true,
      status: "In progress",
      summary:
        "A recipe and nutrition web app with about 4,300 recipes from two free collections. Search by diet, cuisine, allergens and macros, find what you can cook from your pantry, cook step by step with timers, and log meals against daily goals. It installs on a phone and keeps working on a weak signal.",
      details:
        "I chose USDA food data for nutrition and wrote the matching behind it: each ingredient is matched to a food, and the matcher leaves an ingredient blank rather than guess. Diets and nine allergens are checked ingredient by ingredient, and the app never claims a recipe is allergen-free. 59 test files back it, including click-through tests that drive the whole app in a simulated browser. I plan the roadmap from feedback from 5 classmates, and I use Claude to speed up development while keeping the code organized and tested.",
      tags: ["TypeScript"],
      stack: ["TypeScript", "Vite", "Vitest"],
      context: "Independent project for CS 124 · Aug 2026 – present",
      // The repo is private, so the site links the live app, not the code.
      links: [{ label: "Try it live", href: "https://mise-recipe-box.netlify.app" }]
      // No write-up page or visual yet: it shows as a text-only featured card.
    },
    {
      slug: "connect-4-variant",
      title: "Connect 4: Custom Variant",
      featured: false,
      summary:
        "Connect 4 with a shop and special pieces: bombs, line-clearers, and an infection piece that spreads across the board.",
      tags: ["Java", "Games"],
      stack: ["Java", "JavaFX", "Algorithms"],
      links: [],
      visual: {
        type: "board",
        caption:
          "Illustration, not a screenshot. The infector (●) lands and takes over touching opponent pieces breadth-first: each number is the step a piece was captured on. The real piece stops after 20 tiles. Solid grey pieces are the player's own; outlined ones are the opponent's."
      },
      page: {
        question:
          "What happens to Connect 4 if players can earn currency and spend it on pieces that change the board?",
        built: [
          "Classic Connect 4, plus an in-game currency and a shop.",
          "Four special pieces, each with its own logic: a bomb, a shrapnel bomb, a line-clearer, and an infector.",
          "The infector spreads to neighboring opponent tiles one step at a time (breadth-first), capped at 20 tiles.",
          "Each piece type is its own class, so adding a new piece doesn't touch the core game logic."
        ],
        techniques: [
          ["Breadth-first spread", "The infection expands one step at a time from where it lands, up to 20 tiles."],
          ["Modular piece classes", "Special pieces plug into the board without changes to the core turn logic."],
          ["JavaFX animation", "Timed effects and animations driven by an AnimationTimer."]
        ],
        learned:
          "The infection piece is where breadth-first search stopped being abstract for me: handle one step, then the next, and stop at a cap. Keeping every special piece in its own class also made the shop easy to extend.",
        note: "Code available on request."
      }
    },
    {
      slug: "civ-tycoon",
      title: "Civ Tycoon",
      featured: false,
      summary:
        "City-builder simulation where workers walk between homes, factories and resources while earthquakes and alien invasions hit.",
      details:
        "Building and Person class hierarchies, a nearest-resource search that expands outward square by square, and repair crews sent to broken buildings.",
      tags: ["Java", "Games"],
      stack: ["Java", "JavaFX"],
      links: []
    },
    {
      slug: "sports-team-sim",
      title: "Sports Team Sim",
      featured: false,
      summary:
        "Console basketball manager: build a team, play seven opponents, and upgrade players with your winnings.",
      details:
        "Seven-stat player model rolled into a team rating, a stat store, opponents that improve over time, random events, and PrettyTable output.",
      tags: ["Python", "Games"],
      stack: ["Python", "PrettyTable"],
      links: []
    }
  ],

  education: [
    {
      school: "University of Illinois Urbana-Champaign",
      degree: "B.S. in Statistics & Computer Science",
      when: "Expected May 2029",
      lines: [
        "James Scholar Honors Program · GPA 4.0 / 4.0",
        "Coursework: Programming in Java, Data Analysis & Visualization, Calculus sequence"
      ]
    },
    {
      school: "Conant High School",
      degree: "Hoffman Estates, IL",
      when: "May 2026",
      lines: [
        "GPA 4.0 unweighted",
        "Illinois State Scholar · National Merit Commended Scholar · Seal of Biliteracy (Spanish)"
      ]
    }
  ],

  skills: [
    ["Languages", "Python, Java, TypeScript, JavaScript"],
    ["Data", "pandas, NumPy, Matplotlib, Jupyter, Excel, Google Sheets"],
    ["Tools", "Git & GitHub, VS Code, JavaFX, HTML/CSS, Vite, Vitest, pytest"],
    ["Spoken", "English, Spanish (bilingual proficiency; State Seal of Biliteracy)"]
  ],

  activities: [
    {
      role: "Project team member",
      org: "Data Science Club, UIUC",
      when: "Aug 2026 – present",
      text: "Team of five working out where an NBA four-point line should sit, using multi-season shot-distance data."
    },
    {
      role: "Volunteer",
      org: "Kids Against Hunger",
      when: "2016 – present",
      text: "Monthly meal-packing events of 50+ volunteers that produce nearly 1,000 meals. After 10+ years, I guide new volunteers into roles, and I help run the annual 5K charity run."
    },
    {
      role: "Athlete",
      org: "Track & Field (high school)",
      when: "2022 – 2025",
      text: "Competed in 2–3 events per meet across three winter and spring seasons, and recruited 5+ new athletes when the roster was short."
    },
    {
      role: "Competitor",
      org: "Business Professionals of America",
      when: "Sep 2023 – Feb 2024",
      text: "Competed at regionals three times in Payroll Accounting and Banking & Finance, preparing income statements and balance sheets from business scenarios."
    }
  ],

  contact: {
    heading: "Get in touch",
    text:
      "I'm looking for data science and software engineering internships, and I'm always up for talking about club projects. Email is the fastest way to reach me."
  },

  /* Real data behind the NBA chart, aggregated from the team's committed CSV
     dataset2_top50_3pm_by_distance.csv (sum of 3PM / 3PA by foot, 2021-22 to 2025-26).
     Distances with fewer than 300 attempts are left out. */
  charts: {
    nba: {
      xLabel: "Shot distance (ft)",
      yLabel: "Expected points per shot",
      fourLine: 27, // the proposed 4-point distance in Kamran's notebook (nba_four_point_datasets.ipynb)
      rows: [
        { ft: 22, made: 2990, att: 7101 },
        { ft: 23, made: 5639, att: 13307 },
        { ft: 24, made: 6425, att: 16178 },
        { ft: 25, made: 13544, att: 35132 },
        { ft: 26, made: 10611, att: 28183 },
        { ft: 27, made: 5160, att: 14114 },
        { ft: 28, made: 2362, att: 6581 },
        { ft: 29, made: 1157, att: 3468 },
        { ft: 30, made: 581, att: 1875 },
        { ft: 31, made: 280, att: 981 },
        { ft: 32, made: 183, att: 548 },
        { ft: 33, made: 96, att: 309 }
      ]
    }
  }
};
