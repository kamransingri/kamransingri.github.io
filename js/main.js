const PROJECTS = [
  {
    id: "tower-defense",
    title: "Space Tower Defense",
    langs: ["Java"],
    tags: ["Java", "JavaFX", "Canvas", "OOP"],
    summary: "Wave-based, lane tower defense where robot defenders hold off alien invaders.",
    details: [
      "Object-oriented enemy and defender class hierarchies: Basic, Dashing and Stealer aliens; Shooter, Shield and Mine robots, using inheritance and polymorphism.",
      "Wave system that spawns waves on a 30-second timer with randomized composition and scaling difficulty.",
      "Resource economy built on collectable Energy, plus power-ups that slow enemies or speed up defender attacks.",
      "Real-time game loop on JavaFX Canvas and AnimationTimer, coordinating 10+ interacting object types with collision detection and row-based targeting."
    ],
    images: ["assets/img/pvz/defenders/RobotShooter.png", "assets/img/pvz/defenders/RobotShield.png", "assets/img/pvz/enemies/BasicAlien.png", "assets/img/pvz/enemies/DashingAlien.png"],
    featured: true
  },
  {
    id: "connect4",
    title: "Connect 4: Custom Variant",
    langs: ["Java"],
    tags: ["Java", "JavaFX", "Algorithms"],
    summary: "Classic Connect 4 extended with a shop and special pieces: bombs, line-clearers and an infection piece.",
    details: [
      "Players earn currency and buy special pieces: bomb, shrapnel bomb, line-clearer and infector, each driven by its own game logic.",
      "The infection piece spreads across the board with a breadth-first, generation-by-generation expansion that captures opponent tiles.",
      "Piece classes are modular, so new piece types can be added without changing core game logic.",
      "Timed effects and animations handled with JavaFX AnimationTimer."
    ],
    glyph: "4×",
    featured: true
  },
  {
    id: "alien-shooter",
    title: "Alien Shooter",
    langs: ["JavaScript"],
    tags: ["JavaScript", "HTML5 Canvas", "Game dev"],
    summary: "Top-down space shooter you can play in your browser. Click to aim and fire.",
    details: [
      "Click-to-aim lasers using trajectory math from the player to the cursor.",
      "Multiple enemy wave types, a 150-health boss that chases the player and fires fireballs.",
      "Four power-ups: healing kit, invisibility, speed boost and ice cube, plus health bars and reset.",
      "Built from scratch on HTML5 Canvas with a requestAnimationFrame loop."
    ],
    images: ["demos/alien-shooter/Pictures/Astronaut.png", "demos/alien-shooter/Pictures/Alien1.png", "demos/alien-shooter/Pictures/BossAlien.png"],
    demo: "demos/alien-shooter/index.html",
    badge: "Playable",
    featured: true
  },
  {
    id: "civ-tycoon",
    title: "Civ Tycoon",
    langs: ["Java"],
    tags: ["Java", "JavaFX", "Simulation"],
    summary: "City-builder where workers walk between homes, factories and resources while disasters strike.",
    details: [
      "Building and Person hierarchies: Apartment, Factory, ConstructionFacility and ResourceArea; FactoryWorker and ConstructionWorker.",
      "Nearest-resource search that expands outward square by square, and repair crews dispatched to broken buildings.",
      "Random events such as earthquakes and alien invasions, with a day tracker driving the simulation."
    ],
    glyph: "CIV"
  },
  {
    id: "battle-game",
    title: "Battle Game",
    langs: ["Java"],
    tags: ["Java", "JavaFX", "OOP"],
    summary: "Turn-based RPG battler with characters, weapons, items and special abilities.",
    details: [
      "Pick a character, fight opponents, and spend winnings in a weapon and item shop.",
      "Separate classes for characters, battles, abilities, attack moves and items; sprites loaded from file."
    ],
    images: ["assets/img/battle/Knight.png", "assets/img/battle/Wizard.png", "assets/img/battle/Dragon.png", "assets/img/battle/Goblin.png"]
  },
  {
    id: "nerdle",
    title: "Nerdle Clone",
    langs: ["Java"],
    tags: ["Java", "JavaFX", "File I/O"],
    summary: "Wordle-style math equation puzzle with persistent player stats.",
    details: [
      "Parses a typed equation into numbers and operators, validates it and evaluates both sides.",
      "Green and purple tile feedback computed with per-letter used-flags so repeated symbols are handled correctly.",
      "Puzzle equations loaded from a text file; player stats read from and written to disk."
    ],
    glyph: "1+2=3"
  },
  {
    id: "wordsearch",
    title: "Word Search",
    langs: ["Java"],
    tags: ["Java", "JavaFX", "Algorithms"],
    summary: "Word search generator and game with themed puzzles loaded from files.",
    details: [
      "Places words at random grid positions and directions, checking for overlaps with conflicting letters.",
      "Tracks the player's selection across cells; word lists (animals, Christmas, computer science) load from text files."
    ],
    glyph: "A·B·C"
  },
  {
    id: "sports-sim",
    title: "Sports Team Sim",
    langs: ["Python"],
    tags: ["Python", "Simulation", "CLI"],
    summary: "Console basketball manager: build a team, play seven opponents, upgrade players with earnings.",
    details: [
      "Seven-stat player model (speed, agility, strength, jumpshot, stamina, dunk, defense) rolled into a team rating.",
      "Stat store for spending winnings, opponents that improve over time, and random events that help or hurt teams.",
      "Formatted tables via PrettyTable."
    ],
    glyph: "py"
  }
];

const grid = document.getElementById("project-grid");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");

function esc(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

function thumbHTML(p) {
  const inner = p.images
    ? p.images.slice(0, 3).map(src => `<img src="${src}" alt="" loading="lazy">`).join("")
    : `<span class="glyph">${esc(p.glyph || "</>")}</span>`;
  const badge = p.badge ? `<span class="badge">${esc(p.badge)}</span>` : "";
  return `<div class="thumb">${inner}${badge}</div>`;
}

function renderCards() {
  grid.innerHTML = PROJECTS.map(p => `
    <button class="card reveal" data-id="${p.id}" data-langs="${p.langs.join(",")}">
      ${thumbHTML(p)}
      <div class="card-body">
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.summary)}</p>
        <ul class="chips">${p.tags.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
      </div>
    </button>`).join("");
}

function openModal(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  const imgs = p.images ? `<div class="modal-thumbs">${p.images.map(s => `<img src="${s}" alt="">`).join("")}</div>` : "";
  const demo = p.demo ? `<a class="btn primary" href="${p.demo}" target="_blank" rel="noopener">Play in browser ↗</a>` : "";
  modalBody.innerHTML = `
    <h3 id="modal-title">${esc(p.title)}</h3>
    <ul class="chips">${p.tags.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
    <p>${esc(p.summary)}</p>
    ${imgs}
    <ul>${p.details.map(d => `<li>${esc(d)}</li>`).join("")}</ul>
    ${demo ? `<div class="cta">${demo}</div>` : ""}`;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-close").focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

renderCards();

grid.addEventListener("click", e => {
  const card = e.target.closest(".card");
  if (card) openModal(card.dataset.id);
});
modal.addEventListener("click", e => {
  if (e.target === modal || e.target.classList.contains("modal-close")) closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !modal.hidden) closeModal();
});

// Filters
document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b === btn));
    const f = btn.dataset.filter;
    grid.querySelectorAll(".card").forEach(c => {
      c.hidden = !(f === "all" || c.dataset.langs.split(",").includes(f));
    });
  });
});

// Mobile nav
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
links.addEventListener("click", e => {
  if (e.target.tagName === "A") {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

// Active nav link
const navAnchors = [...links.querySelectorAll("a")];
const sections = navAnchors.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      navAnchors.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });
sections.forEach(s => spy.observe(s));

// Scroll reveal
document.querySelectorAll(".section h2, .item, .stats li, .skills > div, .two-col > *").forEach(el => el.classList.add("reveal"));
const rev = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("in"); rev.unobserve(en.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll(".reveal").forEach(el => rev.observe(el));

// Show resume button only if the PDF has been added
fetch("assets/Kamran_Singri_Resume.pdf", { method: "HEAD" })
  .then(r => { if (r.ok) document.getElementById("resume-btn").hidden = false; })
  .catch(() => {});
