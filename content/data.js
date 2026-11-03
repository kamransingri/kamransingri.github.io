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
    oneLiner: "UIUC · Statistics & CS · data science",
    intro:
      "I'm a first-year at the University of Illinois Urbana-Champaign. I'm most comfortable in Python and Java, I'm most interested in data science, and I'm open to software engineering roles too.",
    email: "kamransingri@gmail.com",
    github: "https://github.com/kamransingri",
    linkedin: "https://www.linkedin.com/in/kamran-singri-745344428/",
    resume: "assets/resume.pdf",
    siteUrl: "https://kamransingri.github.io/",
    location: "Champaign, IL · from Roselle, IL"
  },

  about: [
    "I study Statistics & Computer Science at UIUC as part of the James Scholar Honors Program. Most of what I've built so far is Java: games and simulations with a lot of moving objects. Lately I've been pulling toward data. This semester I'm on a Data Science Club team looking at what a four-point line would mean for NBA shooters, and I've started a project tracking how reliable Champaign's buses actually are.",
    "Before college I mentored elementary schoolers through Computer Science Kids, tutored high school students in math, and ran track. I've also packed meals with Kids Against Hunger since 2016. When I'm not at a keyboard I'm usually at the gym, playing sports, listening to music, or cooking."
  ],

  experience: [
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
        "Ran large-group activities for up to 60 students per session and kept them moving.",
        "Designed and ran hands-on activities with a team of other mentors to reinforce core CS concepts."
      ]
    },
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
        "Worked out alternative ways to explain things with other tutors for students who needed extra help."
      ]
    }
  ],

  /* Projects. featured: true → big entry with its own page at projects/<slug>.html.
     tags drive the filter buttons. visual.type: "sprites" | "chart" | "board" | "image" */
  projects: [
    {
      slug: "space-tower-defense",
      title: "Space Tower Defense",
      featured: true,
      summary:
        "A lane-based tower defense game in Java. Robot defenders hold off waves of alien invaders.",
      tags: ["Java", "Games"],
      stack: ["Java", "JavaFX", "OOP"],
      links: [],
      visual: {
        type: "sprites",
        caption: "Sprites from the game: three robot defenders and two of the aliens.",
        images: [
          { src: "assets/img/pvz/defenders/RobotShooter.png", alt: "Robot Shooter defender sprite" },
          { src: "assets/img/pvz/defenders/RobotShield.png", alt: "Robot Shield defender sprite" },
          { src: "assets/img/pvz/defenders/RobotMineActivated.png", alt: "Robot Mine defender sprite" },
          { src: "assets/img/pvz/enemies/BasicAlien.png", alt: "Basic Alien enemy sprite" },
          { src: "assets/img/pvz/enemies/DashingAlien.png", alt: "Dashing Alien enemy sprite" }
        ]
      },
      page: {
        question:
          "What does it take to build a real-time strategy game with an economy, waves that get harder, and lots of different objects interacting every frame?",
        built: [
          "A lane-based tower defense game: robot defenders hold the rows while waves of aliens push in.",
          "Enemies and defenders are two class hierarchies built on inheritance and polymorphism: Basic, Dashing and Stealer aliens on one side, Shooter, Shield and Mine robots on the other.",
          "A new wave spawns every 30 seconds, with a randomized mix of enemies and difficulty that scales up as the game goes on.",
          "The economy runs on collectable Energy, and power-ups can slow enemies down or speed up defender attacks."
        ],
        extras: [
          {
            type: "diagram",
            caption: "How the game is organized: two class hierarchies plus the systems that drive them.",
            groups: [
              { label: "Aliens (enemy hierarchy)", items: ["Basic Alien", "Dashing Alien", "Stealer Alien"] },
              { label: "Robots (defender hierarchy)", items: ["Robot Shooter", "Robot Shield", "Robot Mine"] },
              { label: "Systems", items: ["30-second wave timer", "Energy economy", "Power-ups", "JavaFX game loop"] }
            ]
          },
          {
            type: "sprites",
            caption: "More of the game's sprites: Energy, the two power-ups, the Stealer Alien and the Shooter's laser.",
            images: [
              { src: "assets/img/pvz/Energy.png", alt: "Energy pickup sprite" },
              { src: "assets/img/pvz/PowerUpSlowDownEnemy.png", alt: "Slow-down-enemies power-up sprite" },
              { src: "assets/img/pvz/PowerUpSpeedUpDefenderAttack.png", alt: "Speed-up-defenders power-up sprite" },
              { src: "assets/img/pvz/enemies/StealerAlien.png", alt: "Stealer Alien sprite" },
              { src: "assets/img/pvz/projectiles/RobotShooterLaser.png", alt: "Robot Shooter laser sprite" }
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
          "This was my biggest exercise in object-oriented design: with six unit types, an economy and a wave system all running in one loop, the class hierarchies are what kept the game manageable.",
        note: "Code isn't public yet."
      }
    },
    {
      slug: "nba-four-point-line",
      title: "NBA Four-Point Line",
      featured: true,
      status: "In progress",
      summary:
        "A Data Science Club team project on a hypothetical NBA four-point line, using five seasons of shot-distance data for the league's top 3-point shooters.",
      tags: ["Python", "Data"],
      stack: ["Python", "pandas", "Team project"],
      context: "UIUC Data Science Club · team project · Fall 2026",
      links: [
        { label: "Team repo", href: "https://github.com/UIUC-DSC/team-Starting-Five-Minus-One" }
      ],
      visual: {
        type: "chart",
        caption:
          "3-point percentage by shot distance, top-50 3PM shooters per season, 2021-22 to 2025-26. I computed it from the team's dataset for this site; it isn't a team result.",
        source: "nba"
      },
      page: {
        question:
          "If the NBA painted a four-point line, where would it go, and how would it change the value of a deep shot? Our team in UIUC's Data Science Club is working through that with real shooting data.",
        built: [
          "The team's dataset covers the top 50 three-point makers in each season from 2021-22 to 2025-26. It gives makes and attempts at every distance, foot by foot from 22 ft out to 40+ ft, plus distance-bucket summaries for each player.",
          "My part so far: I reorganized the repo and set up the project's structure. I renamed the loader to `nba_four_point_datasets.py` and created `nba_four_point_graphs.py`, which imports the loaded DataFrame so graphing code stays separate from data loading.",
          "The analysis itself is still in progress with the team."
        ],
        extras: [
          {
            type: "code",
            file: "nba_four_point_graphs.py",
            caption: "The graphing module I set up (the full file as committed). It pulls in the loaded DataFrame from the dataset module so graph code stays separate.",
            text: "#MAKE GRAPHS HERE\nimport pandas as pd\n#Imports other python file so we can use its variables and functions\nimport nba_four_point_datasets\n#To access these var and functions do file name.variable_name or file name.function_name\nprint(nba_four_point_datasets.df)"
          }
        ],
        techniques: [
          ["pandas", "Loading and reshaping the shot-distance CSVs."],
          ["Module structure", "Separating data loading from graphing so teammates can work on graphs without touching the cleaning code."],
          ["Git with a team", "Working in a shared repo in the club's GitHub organization."]
        ],
        learned:
          "Mostly, so far, how to work in a shared repo: keeping loading and graphing in separate files means teammates can work in parallel. The chart on this page is my own quick look at the data. Accuracy drops steadily past the current line, and very few shots come from 30+ feet, so any four-point estimate that far out rests on small samples.",
        note: ""
      }
    },
    {
      slug: "connect-4-variant",
      title: "Connect 4: Custom Variant",
      featured: true,
      summary:
        "Connect 4 with a shop and special pieces: bombs, line-clearers, and an infection piece that spreads across the board.",
      tags: ["Java", "Games"],
      stack: ["Java", "JavaFX", "Algorithms"],
      links: [],
      visual: {
        type: "board",
        caption:
          "Illustration, not a screenshot: the infector (●) lands and captures connected opponent pieces breadth-first. Numbers are generations; the real piece stops at 20 tiles. Dark pieces are the player's own."
      },
      page: {
        question:
          "What happens to Connect 4 if players can earn currency and spend it on pieces that change the board?",
        built: [
          "Classic Connect 4, plus an in-game currency and a shop.",
          "Four special pieces, each with its own logic: a bomb, a shrapnel bomb, a line-clearer, and an infector.",
          "The infector spreads to neighboring opponent tiles one generation at a time (breadth-first), capped at 20 tiles.",
          "Each piece type is its own class, so adding a new piece doesn't touch the core game logic."
        ],
        techniques: [
          ["Breadth-first spread", "The infection expands in generations from where it lands, which gives a visible wave instead of an instant fill."],
          ["Modular piece classes", "Special pieces plug into the board without changes to the core turn logic."],
          ["JavaFX animation", "Timed effects and animations driven by an AnimationTimer."]
        ],
        learned:
          "The infection piece was my first real use of a breadth-first spread. Processing it one generation at a time, instead of all at once, is what let each step be animated.",
        note: "Code isn't public yet."
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
        src: "assets/img/alien-shooter.webp",
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
            src: "assets/img/alien-shooter-boss.webp",
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
          "Looking back at it, the whole game is about 780 lines and 33 functions with no classes, and you can feel it: a lot of state is shared globally. If I rebuilt it, I'd give every entity a class with its own update and draw.",
        note: ""
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
      slug: "bus-reliability-tracker",
      title: "Bus Reliability Tracker",
      featured: false,
      status: "In progress",
      summary:
        "Early-stage Python project to collect Champaign-Urbana MTD real-time bus data and measure how reliable routes actually are.",
      details:
        "Phase 1 of 5, the project skeleton, is in place: validated config loading (reports every problem at once and rejects placeholder values), UTC rotating-file logging, pytest tests, and CI with ruff on GitHub Actions. Next up: the GTFS-Realtime feed collector.",
      tags: ["Python", "Data"],
      stack: ["Python", "pytest", "GitHub Actions"],
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
      when: "Expected May 2030",
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
    ["Languages", "Java (proficient), Python, JavaScript"],
    ["Data & tools", "pandas, JavaFX, HTML/CSS, Git & GitHub, pytest, Excel, Google Sheets"],
    ["Spoken", "English, Spanish (conversational; Seal of Biliteracy)"]
  ],

  activities: [
    {
      role: "Project team member",
      org: "Data Science Club, UIUC",
      when: "Fall 2026",
      text: "Team project analyzing a hypothetical NBA four-point line with five seasons of shot-distance data."
    },
    {
      role: "Volunteer",
      org: "Kids Against Hunger",
      when: "2016 – present",
      text: "Monthly meal-packing for 10+ years. I set up logistics for the annual 5K charity run and onboard new volunteers."
    },
    {
      role: "Athlete",
      org: "Track & Field (high school)",
      when: "2022 – 2025",
      text: "Competed in 2–3 events per meet across three winter and spring seasons, and recruited 5+ new athletes when the roster was short."
    }
  ],

  contact: {
    heading: "Get in touch",
    text:
      "I'm looking for data science and software engineering internships, and I'm happy to talk about club projects too. Email is the fastest way to reach me."
  },

  /* Real data behind the NBA chart, aggregated from the team's committed CSV
     dataset2_top50_3pm_by_distance.csv (sum of 3PM / 3PA by foot, 2021-22 to 2025-26).
     Distances with fewer than 300 attempts are left out. */
  charts: {
    nba: {
      xLabel: "Shot distance (ft)",
      yLabel: "3P%",
      line: 0.4, // reference line drawn at 40%
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
