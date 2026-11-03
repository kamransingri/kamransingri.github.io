/* Renders content/data.js into the page, then wires up small interactions.
   The page is also pre-rendered (tools/prerender.mjs), so it reads fine without JS. */
(function () {
  "use strict";
  var S = window.SITE, R = window.Render;
  if (!S || !R) return;

  /* ---------- Render ---------- */
  var slug = document.body.getAttribute("data-project");
  if (slug) {
    var host = document.querySelector('[data-render="project"]');
    if (host) host.innerHTML = R.projectPage(S, slug);
    var p = S.projects.filter(function (x) { return x.slug === slug; })[0];
    if (p) document.title = p.title + " · " + S.person.name;
  } else {
    ["intro", "about", "experience", "filters", "featured", "others", "education", "activities", "contact"].forEach(function (k) {
      var el = document.querySelector('[data-render="' + k + '"]');
      if (el && R[k]) el.innerHTML = R[k](S);
    });
  }
})();

/* ---------- Chart: re-draw at the real container width so text stays 11–12px ---------- */
(function () {
  "use strict";
  var S = window.SITE, R = window.Render;
  if (!S || !R) return;
  var wraps = document.querySelectorAll("[data-chart]");
  if (!wraps.length) return;
  var tall = !!document.body.getAttribute("data-project");
  var lastW = 0;
  function draw() {
    Array.prototype.forEach.call(wraps, function (w) {
      var width = w.clientWidth - 8;
      if (width < 200 || Math.abs(width - lastW) < 2) return;
      var tip = w.querySelector(".tip");
      var old = w.querySelector("svg");
      var tmp = document.createElement("div");
      tmp.innerHTML = R.chartSvg(S, { w: width, tall: tall });
      w.replaceChild(tmp.firstChild, old);
      if (tip) w.appendChild(tip);
    });
    lastW = wraps[0].clientWidth - 8;
    document.dispatchEvent(new CustomEvent("chart:drawn"));
  }
  draw();
  var t;
  window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(draw, 120); });
})();

/* ---------- Small interactions. Each one is optional: the page works without it. ---------- */
(function () {
  "use strict";
  var doc = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Theme toggle: system preference by default, explicit choice saved in localStorage. */
  var toggle = document.querySelector(".theme-toggle");
  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  function saved() { try { return localStorage.getItem("theme"); } catch (e) { return null; } }
  function current() {
    var t = doc.getAttribute("data-theme");
    if (t === "light" || t === "dark") return t;
    return media && media.matches ? "dark" : "light";
  }
  function syncToggle() {
    if (!toggle) return;
    var next = current() === "dark" ? "light" : "dark";
    toggle.setAttribute("aria-label", "Switch to " + next + " theme");
    toggle.setAttribute("title", "Switch to " + next + " theme");
  }
  if (toggle) {
    toggle.hidden = false;
    syncToggle();
    toggle.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      doc.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* storage blocked: still switch for this visit */ }
      syncToggle();
    });
    if (media && media.addEventListener) {
      media.addEventListener("change", function () { if (!saved()) { doc.removeAttribute("data-theme"); syncToggle(); } });
    }
  }

  /* Sticky nav: mark the section currently in view. */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (links.length && "IntersectionObserver" in window) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
      var active = null;
      // the last section (in page order) whose band is in view wins
      Object.keys(byId).forEach(function (id) { if (visible[id]) active = id; });
      links.forEach(function (a) {
        if (a === byId[active]) {
          a.setAttribute("aria-current", "location");
          if (a.scrollIntoView && window.innerWidth < 720) {
            var nav = a.closest("nav");
            if (nav) nav.scrollTo({ left: a.offsetLeft - 16, behavior: reduceMotion ? "auto" : "smooth" });
          }
        } else a.removeAttribute("aria-current");
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(byId).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* Project filter by tag. */
  var bar = document.querySelector(".filters");
  if (bar) {
    bar.hidden = false;
    var items = document.querySelectorAll(".project[data-tags], .other[data-tags]");
    var otherTitle = document.getElementById("other-title");
    var empty = document.querySelector(".filter-empty");
    var count = bar.querySelector(".filter-count");
    bar.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      var f = btn.getAttribute("data-filter");
      Array.prototype.forEach.call(bar.querySelectorAll("button[data-filter]"), function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      var shown = 0, othersShown = 0;
      Array.prototype.forEach.call(items, function (it) {
        var ok = f === "all" || (" " + it.getAttribute("data-tags") + " ").indexOf(" " + f + " ") >= 0;
        it.hidden = !ok;
        if (ok) { shown++; if (it.classList.contains("other")) othersShown++; }
      });
      if (otherTitle) otherTitle.hidden = othersShown === 0;
      if (empty) empty.hidden = shown !== 0;
      if (count) count.textContent = f === "all" ? "" : shown + " of " + items.length + " shown";
    });
  }

  /* Copy email with a short confirmation. */
  var copyBtn = document.querySelector(".copy[data-copy]");
  if (copyBtn) {
    var status = document.querySelector(".copied");
    copyBtn.hidden = false;
    var timer;
    function done(msg) {
      if (!status) return;
      status.textContent = msg;
      clearTimeout(timer);
      timer = setTimeout(function () { status.textContent = ""; }, 2000);
    }
    function fallback(text) {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      done(ok ? "Copied" : "Press Ctrl+C to copy");
    }
    copyBtn.addEventListener("click", function () {
      var text = copyBtn.getAttribute("data-copy");
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { done("Copied"); }, function () { fallback(text); });
      } else fallback(text);
    });
  }

  /* Chart tooltips: hover, tap or keyboard focus on a point. */
  Array.prototype.forEach.call(document.querySelectorAll("[data-chart]"), function (wrap) {
    var tip = wrap.querySelector(".tip");
    if (!tip) return;
    var on = null;
    function show(pt) {
      if (!pt) return;
      if (on && on !== pt) on.classList.remove("on");
      on = pt; pt.classList.add("on");
      var dot = pt.querySelector(".dot").getBoundingClientRect(), box = wrap.getBoundingClientRect();
      tip.textContent = pt.getAttribute("data-tip");
      tip.hidden = false;
      var x = dot.left + dot.width / 2 - box.left, y = dot.top - box.top - 8;
      var half = tip.offsetWidth / 2;
      x = Math.max(half + 4, Math.min(box.width - half - 4, x));
      tip.style.left = x + "px";
      tip.style.top = y + "px";
    }
    function hide() { tip.hidden = true; if (on) on.classList.remove("on"); on = null; }
    wrap.addEventListener("pointerover", function (e) { show(e.target.closest(".pt")); });
    wrap.addEventListener("pointerleave", hide);
    wrap.addEventListener("focusin", function (e) { show(e.target.closest(".pt")); });
    wrap.addEventListener("focusout", function (e) { if (!wrap.contains(e.relatedTarget)) hide(); });
    wrap.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { hide(); return; }
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      var pts = Array.prototype.slice.call(wrap.querySelectorAll(".pt"));
      var i = pts.indexOf(document.activeElement && document.activeElement.closest ? document.activeElement.closest(".pt") : null);
      if (i < 0) return;
      e.preventDefault();
      var n = pts[Math.max(0, Math.min(pts.length - 1, i + (e.key === "ArrowRight" ? 1 : -1)))];
      n.focus();
    });
    document.addEventListener("chart:drawn", hide);
  });
})();
