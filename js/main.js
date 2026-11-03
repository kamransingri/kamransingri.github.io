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
