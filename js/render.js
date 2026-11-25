/*
 * Turns window.SITE (content/data.js) into HTML strings.
 * Used in the browser by main.js, and by tools/prerender.mjs to bake the same
 * HTML into the pages for visitors without JavaScript.
 * You shouldn't need to edit this file to change content.
 */
(function (root) {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Escape, then allow `code` and [text](url).
  function inline(s) {
    return esc(s)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (_, t, href) {
        return '<a href="' + href + '">' + t + "</a>";
      });
  }

  function isExternal(href) {
    return /^https?:\/\//.test(href);
  }

  function linkAttrs(href) {
    return isExternal(href) ? ' rel="noopener"' : "";
  }

  // prefix: "" on the home page, "../" on project pages
  function url(href, prefix) {
    if (!href || isExternal(href) || href.charAt(0) === "#" || /^mailto:/.test(href)) return href;
    return (prefix || "") + href;
  }

  /* ---------- Intro ---------- */
  function intro(S) {
    var p = S.person;
    return (
      '<h1 id="intro-title">' + esc(p.name) + "</h1>" +
      (p.credentials && p.credentials.length
        ? '<ul class="creds mono" aria-label="At a glance">' +
          p.credentials.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul>"
        : "") +
      '<p class="lede">' + inline(p.intro) + "</p>" +
      (p.seeking ? '<p class="seeking">' + inline(p.seeking) + "</p>" : "") +
      '<ul class="link-row" aria-label="Links">' +
      '<li><a class="btn btn-primary" href="' + esc(p.resume) + '">Resume <span class="mono small">PDF</span></a></li>' +
      '<li><a class="btn" href="' + esc(p.github) + '" rel="noopener">GitHub</a></li>' +
      '<li><a class="btn" href="' + esc(p.linkedin) + '" rel="noopener">LinkedIn</a></li>' +
      '<li><a class="btn" href="mailto:' + esc(p.email) + '">Email</a></li>' +
      "</ul>"
    );
  }

  function about(S) {
    return S.about.map(function (para) { return "<p>" + inline(para) + "</p>"; }).join("");
  }

  /* ---------- Experience timeline ---------- */
  function experience(S) {
    return (
      '<ol class="timeline">' +
      S.experience.map(function (e, i) {
        var id = "exp-" + i;
        return (
          '<li class="tl-item">' +
          '<p class="tl-when mono">' + esc(e.start) + " – " + esc(e.end) + "</p>" +
          '<div class="tl-body">' +
          "<h3>" + esc(e.role) + ' <span class="at">· ' + esc(e.org) + "</span></h3>" +
          '<p class="meta mono">' + esc(e.place) + "</p>" +
          "<p>" + inline(e.summary) + "</p>" +
          (e.details && e.details.length
            ? '<details class="more" id="' + id + '"><summary>More detail</summary><ul>' +
              e.details.map(function (d) { return "<li>" + inline(d) + "</li>"; }).join("") +
              "</ul></details>"
            : "") +
          "</div></li>"
        );
      }).join("") +
      "</ol>"
    );
  }

  /* ---------- Visuals ---------- */
  function sprites(v, prefix) {
    return (
      '<figure class="visual visual-sprites">' +
      '<div class="sprite-row">' +
      v.images.map(function (im) {
        return '<img src="' + esc(url(im.src, prefix)) + '" alt="' + esc(im.alt) + '" width="72" height="72" loading="lazy" decoding="async">';
      }).join("") +
      "</div>" +
      (v.caption ? "<figcaption>" + inline(v.caption) + "</figcaption>" : "") +
      "</figure>"
    );
  }

  function image(v, prefix) {
    return (
      '<figure class="visual visual-image">' +
      // zoom: a dense figure (like a matplotlib chart) opens full size when tapped
      (v.zoom ? '<a class="zoom" href="' + esc(url(v.src, prefix)) + '">' : "") +
      '<img src="' + esc(url(v.src, prefix)) + '"' +
      (v.small ? ' srcset="' + esc(url(v.small, prefix)) + ' 640w, ' + esc(url(v.src, prefix)) + ' 1200w" sizes="(min-width: 880px) 34rem, 100vw"' : "") +
      ' alt="' + esc(v.alt) + '" width="' + (v.w || 1200) + '" height="' + (v.h || 640) + '" loading="lazy" decoding="async">' +
      (v.zoom ? "</a>" : "") +
      (v.caption ? "<figcaption>" + inline(v.caption) + "</figcaption>" : "") +
      "</figure>"
    );
  }

  // Illustration (not real game output) of the infector's breadth-first capture.
  // Board rows top->bottom. R = the infector's owner, Y = opponent, X = infector, . = empty
  var BOARD = [
    ".......",
    ".......",
    "..YX...",
    ".YYYR..",
    "RYRYYY.",
    "YYRRYRY"
  ];
  function board(v) {
    var rows = BOARD.length, cols = BOARD[0].length, cap = 20, gen = {}, q = [], sx, sy;
    BOARD.forEach(function (r, y) { var x = r.indexOf("X"); if (x >= 0) { sx = x; sy = y; } });
    q.push([sx, sy, 0]); gen[sx + "," + sy] = 0;
    var taken = 0;
    while (q.length && taken < cap) {
      var c = q.shift();
      [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (d) {
        var x = c[0] + d[0], y = c[1] + d[1], k = x + "," + y;
        if (x >= 0 && y >= 0 && x < cols && y < rows && BOARD[y][x] === "Y" && !(k in gen) && taken < cap) {
          gen[k] = c[2] + 1; taken++; q.push([x, y, c[2] + 1]);
        }
      });
    }
    var cells = "";
    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < cols; x++) {
        var ch = BOARD[y][x], g = gen[x + "," + y], cls = "cell", txt = "";
        if (ch === "X") { cls += " inf"; txt = "●"; }
        else if (g !== undefined) { cls += " g"; txt = String(g); }
        else if (ch === "Y") cls += " opp";
        else if (ch === "R") cls += " own";
        cells += '<span class="' + cls + '"' + (g !== undefined && ch !== "X" ? ' style="--g:' + g + '"' : "") + ">" + txt + "</span>";
      }
    }
    return (
      '<figure class="visual visual-board">' +
      '<div class="board" role="img" aria-label="Illustration: the infector piece lands on a Connect 4 board and takes over touching opponent pieces outward, one step at a time.">' +
      cells + "</div>" +
      (v.caption ? "<figcaption>" + inline(v.caption) + "</figcaption>" : "") +
      "</figure>"
    );
  }

  // Expected points per shot by distance: Kamran's analysis in the team repo, recomputed from the
  // same dataset (S.charts.nba). Each distance's make rate x 3, and x 4 past the proposed line.
  function chart(S, opts) {
    opts = opts || {};
    var C = S.charts.nba, rows = C.rows, four = C.fourLine;
    var W = Math.round(opts.w || 640), H = Math.round(Math.max(240, Math.min(opts.tall ? 340 : 300, W * 0.58)));
    var narrow = W < 480;
    var m = { t: 26, r: narrow ? 46 : 54, b: 44, l: 38 };
    var x0 = rows[0].ft - 0.5, x1 = rows[rows.length - 1].ft + 0.5;
    var yMin = 0.8, yMax = 1.5;
    function X(ft) { return m.l + (ft - x0) / (x1 - x0) * (W - m.l - m.r); }
    function Y(v) { return m.t + (1 - (v - yMin) / (yMax - yMin)) * (H - m.t - m.b); }
    function pct(r) { return r.made / r.att; }
    // 95% confidence interval on the make rate (normal approximation to the binomial)
    function ci(r) { var p = pct(r); return 1.96 * Math.sqrt(p * (1 - p) / r.att); }
    function n(x) { return x.toLocaleString("en-US"); }
    var tot = rows.reduce(function (a, r) { return [a[0] + r.made, a[1] + r.att]; }, [0, 0]);
    var avg3 = 3 * tot[0] / tot[1];
    var deep = rows.filter(function (r) { return r.ft >= four; });

    var grid = "", ylab = "";
    for (var k = 0; k <= Math.round((yMax - yMin) * 10); k++) {
      var v = yMin + k / 10, y = Y(v).toFixed(1);
      grid += '<line class="grid" x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + y + '" y2="' + y + '"/>';
      if (!narrow || k % 2 === 0) ylab += '<text class="tick" x="' + (m.l - 7) + '" y="' + (Y(v) + 4).toFixed(1) + '" text-anchor="end">' + v.toFixed(1) + "</text>";
    }
    var xlab = rows.filter(function (r, i) { return !narrow || i % 2 === 0; }).map(function (r) {
      return '<text class="tick" x="' + X(r.ft).toFixed(1) + '" y="' + (H - m.b + 18) + '" text-anchor="middle">' + r.ft + "</text>";
    }).join("");

    // Reference lines: today's arc (23 ft 9 in), the proposed 4-point line, and the average three
    var arc = X(23.75), fx = X(four - 0.5), ay = Y(avg3);
    var refs =
      '<line class="ref" x1="' + arc.toFixed(1) + '" x2="' + arc.toFixed(1) + '" y1="' + m.t + '" y2="' + (H - m.b) + '"/>' +
      '<text class="ref-label" x="' + (arc + 5).toFixed(1) + '" y="' + (H - m.b - 7) + '">' + (narrow ? "arc 23′9″" : "current arc, 23′9″") + "</text>" +
      '<line class="ref four" x1="' + fx.toFixed(1) + '" x2="' + fx.toFixed(1) + '" y1="' + (m.t - 8) + '" y2="' + (H - m.b) + '"/>' +
      '<text class="ref-label four" x="' + (fx + 5).toFixed(1) + '" y="' + (m.t - 1) + '">' + (narrow ? "4-pt line " + four + "′" : "proposed 4-pt line, " + four + " ft") + "</text>" +
      '<line class="ref avg" x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + ay.toFixed(1) + '" y2="' + ay.toFixed(1) + '"/>' +
      '<text class="ref-label" x="' + (m.l + 4) + '" y="' + (ay + 16).toFixed(1) + '">' + (narrow ? "avg 3: " : "average 3: ") + avg3.toFixed(2) + "</text>";

    function series(list, mult, cls) {
      var p = list.map(function (r) { return [X(r.ft), Y(mult * pct(r))]; });
      return {
        p: p,
        path: '<path class="line ' + cls + '" d="M' + p.map(function (q) { return q[0].toFixed(1) + "," + q[1].toFixed(1); }).join("L") + '"/>',
        errs: list.map(function (r, i) {
          var e = mult * ci(r), v = mult * pct(r), x = p[i][0].toFixed(1);
          return '<line class="err ' + cls + '" x1="' + x + '" x2="' + x + '" y1="' + Y(v + e).toFixed(1) + '" y2="' + Y(v - e).toFixed(1) + '"/>';
        }).join(""),
        dots: list.map(function (r, i) { return '<circle class="dot ' + cls + '" cx="' + p[i][0].toFixed(1) + '" cy="' + p[i][1].toFixed(1) + '" r="4"/>'; }).join("")
      };
    }
    var s3 = series(rows, 3, "as3"), s4 = series(deep, 4, "as4");

    // One focusable point per distance (on the worth-3 dot); its label carries both values
    var pts = rows.map(function (r, i) {
      var label = r.ft + " ft: " + (pct(r) * 100).toFixed(1) + "% of " + n(r.att) + " → " + (3 * pct(r)).toFixed(2) + " pts as a 3" +
        (r.ft >= four ? ", " + (4 * pct(r)).toFixed(2) + " as a 4" : "");
      var c = s3.p[i];
      return '<g class="pt" tabindex="' + (i === 0 ? 0 : -1) + '" role="listitem" aria-label="' + label + '" data-tip="' + label + '">' +
        '<circle class="hit" cx="' + c[0].toFixed(1) + '" cy="' + c[1].toFixed(1) + '" r="14"/>' +
        '<circle class="dot as3" cx="' + c[0].toFixed(1) + '" cy="' + c[1].toFixed(1) + '" r="4"/>' +
        "<title>" + label + "</title></g>";
    }).join("");
    var e3 = s3.p[s3.p.length - 1], e4 = s4.p[s4.p.length - 1];
    var ends =
      '<text class="direct as4" x="' + (e4[0] + 9).toFixed(1) + '" y="' + (e4[1] + 4).toFixed(1) + '">as a 4</text>' +
      '<text class="direct as3" x="' + (e3[0] + 9).toFixed(1) + '" y="' + (e3[1] + 4).toFixed(1) + '">as a 3</text>';

    var first = rows[0], last = rows[rows.length - 1];
    var svg =
      '<svg class="chart" viewBox="0 0 ' + W + " " + H + '" role="img" aria-labelledby="nba-chart-title">' +
      '<title id="nba-chart-title">Expected points per shot by distance, ' + first.ft + " to " + last.ft + " feet: as a 3, and as a 4 past a " + four + "-foot line, against an average three worth " + avg3.toFixed(2) + "</title>" +
      grid + ylab + xlab + refs +
      '<text class="axis-label" x="4" y="11">' + esc(C.yLabel) + "</text>" +
      s3.errs + s4.errs + s3.path + s4.path + s4.dots +
      '<g role="list">' + pts + "</g>" + ends +
      '<text class="axis-label" x="' + ((m.l + W - m.r) / 2) + '" y="' + (H - 6) + '" text-anchor="middle">' + esc(C.xLabel) + "</text>" +
      "</svg>";
    var table =
      '<details class="data-table"><summary>Show the numbers</summary><div class="table-wrap"><table>' +
      '<thead><tr><th scope="col">Distance</th><th scope="col">Made</th><th scope="col">Attempted</th><th scope="col">3-point % (95% CI)</th><th scope="col">Pts as a 3</th><th scope="col">Pts as a 4</th></tr></thead><tbody>' +
      rows.map(function (r) {
        return "<tr><td>" + r.ft + " ft</td><td>" + n(r.made) + "</td><td>" + n(r.att) + "</td><td>" + (pct(r) * 100).toFixed(1) + "% ± " + (ci(r) * 100).toFixed(1) + "</td><td>" +
          (3 * pct(r)).toFixed(2) + "</td><td>" + (r.ft >= four ? (4 * pct(r)).toFixed(2) : "–") + "</td></tr>";
      }).join("") +
      "</tbody></table></div></details>";
    return { svg: svg, table: table };
  }

  function chartFigure(S, v, opts) {
    var c = chart(S, opts);
    return (
      '<figure class="visual visual-chart">' +
      (v.takeaway ? '<p class="chart-takeaway">' + inline(v.takeaway) + "</p>" : "") +
      '<div class="chart-wrap" data-chart>' + c.svg + '<div class="tip" role="status" aria-live="polite" hidden></div></div>' +
      '<p class="chart-hint mono">← and → move between points. Esc hides the label.</p>' +
      (v.caption ? "<figcaption>" + inline(v.caption) + "</figcaption>" : "") +
      c.table +
      "</figure>"
    );
  }

  function visual(S, p, prefix, opts) {
    var v = p.visual;
    if (!v) return "";
    if (v.type === "sprites") return sprites(v, prefix);
    if (v.type === "image") return image(v, prefix);
    if (v.type === "board") return board(v);
    if (v.type === "diagram") return diagram(v);
    if (v.type === "chart") return chartFigure(S, v, opts);
    return "";
  }

  /* ---------- Projects ---------- */
  function tagList(p) {
    return '<ul class="tags" aria-label="Tech">' +
      p.stack.map(function (t) { return '<li class="mono">' + esc(t) + "</li>"; }).join("") + "</ul>";
  }

  function status(p) {
    return p.status ? ' <span class="status mono">' + esc(p.status) + "</span>" : "";
  }

  function featured(S) {
    return S.projects.filter(function (p) { return p.featured; }).map(function (p) {
      var page = p.page ? "projects/" + p.slug + ".html" : "";
      var links = (page ? [{ label: "Read the write-up", href: page }] : []).concat(p.links || []);
      return (
        '<article class="project' + (p.visual ? "" : " no-visual") + '" aria-labelledby="pj-' + p.slug + '">' +
        '<div class="project-text">' +
        (p.context ? '<p class="idx mono">' + esc(p.context) + "</p>" : "") +
        // The title links to the write-up too, but "Read the write-up" below is the one tab stop.
        '<h3 id="pj-' + p.slug + '">' + (page ? '<a href="' + page + '" tabindex="-1">' + esc(p.title) + "</a>" : esc(p.title)) + status(p) + "</h3>" +
        "<p>" + inline(p.summary) + "</p>" +
        (p.details ? '<p class="muted">' + inline(p.details) + "</p>" : "") +
        tagList(p) +
        linkList(links) +
        "</div>" +
        (p.visual ? '<div class="project-visual">' + visual(S, p, "") + "</div>" : "") +
        "</article>"
      );
    }).join("");
  }

  function linkList(links) {
    if (!links.length) return "";
    return '<ul class="project-links">' +
      links.map(function (l) {
        return '<li><a href="' + esc(l.href) + '"' + linkAttrs(l.href) + ">" + esc(l.label) + (isExternal(l.href) ? ' <span aria-hidden="true">↗</span>' : ' <span aria-hidden="true">→</span>') + "</a></li>";
      }).join("") + "</ul>";
  }

  function others(S) {
    return '<ul class="others">' +
      S.projects.filter(function (p) { return !p.featured; }).map(function (p) {
        return (
          '<li class="other">' +
          '<h4>' + esc(p.title) + status(p) + "</h4>" +
          "<p>" + inline(p.summary) + "</p>" +
          (p.details ? '<p class="muted">' + inline(p.details) + "</p>" : "") +
          tagList(p) +
          linkList(p.page ? [{ label: "Read the write-up", href: "projects/" + p.slug + ".html" }] : []) +
          "</li>"
        );
      }).join("") + "</ul>";
  }

  /* ---------- Education, activities ---------- */
  function education(S) {
    return (
      '<ul class="edu">' +
      S.education.map(function (e) {
        return (
          '<li><p class="tl-when mono">' + esc(e.when) + "</p><div>" +
          "<h3>" + esc(e.school) + "</h3>" +
          '<p class="meta">' + esc(e.degree) + "</p>" +
          e.lines.map(function (l) { return '<p class="muted">' + inline(l) + "</p>"; }).join("") +
          "</div></li>"
        );
      }).join("") +
      "</ul>" +
      '<dl class="skills">' +
      S.skills.map(function (s) { return '<div><dt class="mono">' + esc(s[0]) + "</dt><dd>" + inline(s[1]) + "</dd></div>"; }).join("") +
      "</dl>"
    );
  }

  function activities(S) {
    return (
      '<ul class="acts">' +
      S.activities.map(function (a) {
        return (
          '<li><p class="tl-when mono">' + esc(a.when) + "</p><div>" +
          "<h4>" + esc(a.role) + ' <span class="at">· ' + esc(a.org) + "</span></h4>" +
          "<p>" + inline(a.text) + "</p></div></li>"
        );
      }).join("") +
      "</ul>"
    );
  }

  function contact(S) {
    var p = S.person;
    return (
      "<h2 id=\"contact-title\">" + esc(S.contact.heading) + "</h2>" +
      "<p>" + inline(S.contact.text) + "</p>" +
      '<p class="email-line"><a class="email mono" href="mailto:' + esc(p.email) + '">' + esc(p.email) + "</a>" +
      '<button type="button" class="btn btn-small copy" data-copy="' + esc(p.email) + '" hidden>Copy</button>' +
      '<span class="copied mono" role="status" aria-live="polite"></span></p>' +
      '<ul class="link-row plain">' +
      '<li><a href="' + esc(p.github) + '" rel="noopener">GitHub</a></li>' +
      '<li><a href="' + esc(p.linkedin) + '" rel="noopener">LinkedIn</a></li>' +
      '<li><a href="' + esc(p.resume) + '">Resume (PDF)</a></li>' +
      "</ul>"
    );
  }

  /* ---------- Extras on project pages: diagrams, code, extra images ---------- */
  function diagram(v) {
    return (
      '<figure class="visual visual-diagram">' +
      '<div class="diagram">' +
      v.groups.map(function (g) {
        return '<div class="dg"><p class="dg-label mono">' + esc(g.label) + "</p><ul>" +
          g.items.map(function (it) { return "<li>" + esc(it) + "</li>"; }).join("") + "</ul></div>";
      }).join("") +
      "</div>" +
      (v.caption ? "<figcaption>" + inline(v.caption) + "</figcaption>" : "") +
      "</figure>"
    );
  }

  function code(v) {
    return (
      '<figure class="visual visual-code">' +
      '<p class="code-file mono">' + esc(v.file) + "</p>" +
      '<pre class="code-excerpt" tabindex="0"><code>' + esc(v.text) + "</code></pre>" +
      (v.caption ? "<figcaption>" + inline(v.caption) + "</figcaption>" : "") +
      "</figure>"
    );
  }

  function extra(v, prefix) {
    if (v.type === "diagram") return diagram(v);
    if (v.type === "code") return code(v);
    if (v.type === "image") return image(v, prefix);
    if (v.type === "sprites") return sprites(v, prefix);
    return "";
  }

  /* ---------- Project page ---------- */
  function projectPage(S, slug) {
    // Every project with a write-up gets a page, featured or not; "Next project" follows data.js order.
    var all = S.projects.filter(function (p) { return p.page; });
    var idx = -1;
    all.forEach(function (p, i) { if (p.slug === slug) idx = i; });
    if (idx < 0) return "<p>Project not found. <a href=\"../index.html#projects\">Back to projects</a></p>";
    var p = all[idx], g = p.page, next = all[(idx + 1) % all.length];
    var links = (p.links || []).map(function (l) {
      return '<li><a class="btn" href="' + esc(url(l.href, "../")) + '"' + linkAttrs(l.href) + ">" + esc(l.label) + (isExternal(l.href) ? ' <span aria-hidden="true">↗</span>' : "") + "</a></li>";
    }).join("");
    return (
      '<p class="crumb mono"><a href="../index.html#projects">← All projects</a></p>' +
      '<header class="page-head">' +
      "<h1>" + esc(p.title) + status(p) + "</h1>" +
      (p.context ? '<p class="page-meta mono">' + esc(p.context) + "</p>" : "") +
      '<p class="lede">' + inline(p.summary) + "</p>" +
      tagList(p) +
      (links ? '<ul class="link-row page-links">' + links + "</ul>" : "") +
      (g.note ? '<p class="code-note mono">' + inline(g.note) + "</p>" : "") +
      "</header>" +
      '<div class="page-visual">' + visual(S, p, "../", { tall: true }) + "</div>" +
      '<section aria-labelledby="q"><h2 id="q"><span class="sec-num mono">01</span>The question</h2><p>' + inline(g.question) + "</p></section>" +
      '<section aria-labelledby="b"><h2 id="b"><span class="sec-num mono">02</span>What I built</h2><ul class="bullets">' +
      g.built.map(function (b) { return "<li>" + inline(b) + "</li>"; }).join("") + "</ul>" +
      (g.extras || []).map(function (x) { return '<div class="extra">' + extra(x, "../") + "</div>"; }).join("") +
      "</section>" +
      '<section aria-labelledby="t"><h2 id="t"><span class="sec-num mono">03</span>Key techniques</h2><dl class="techniques">' +
      g.techniques.map(function (t) { return "<div><dt>" + esc(t[0]) + "</dt><dd>" + inline(t[1]) + "</dd></div>"; }).join("") +
      "</dl></section>" +
      '<section aria-labelledby="l"><h2 id="l"><span class="sec-num mono">04</span>What I learned</h2><p>' + inline(g.learned) + "</p></section>" +
      // Close the page with the ask, so a convinced reader doesn't have to go back to the homepage
      '<aside class="page-cta" aria-label="Contact">' +
      (S.person.seeking ? '<p class="seeking">' + inline(S.person.seeking) + "</p>" : "") +
      '<ul class="link-row">' +
      '<li><a class="btn btn-primary" href="' + esc(url(S.person.resume, "../")) + '">Resume <span class="mono small">PDF</span></a></li>' +
      '<li><a class="btn" href="mailto:' + esc(S.person.email) + '">Email</a></li>' +
      "</ul></aside>" +
      '<nav class="next" aria-label="Next project"><a href="' + next.slug + '.html"><span class="mono small">Next project</span> <span>' + esc(next.title) + ' <span aria-hidden="true">→</span></span></a></nav>'
    );
  }

  var api = {
    esc: esc, inline: inline, intro: intro, about: about, experience: experience,
    chartSvg: function (S, o) { return chart(S, o).svg; },
    featured: featured, others: others, education: education,
    activities: activities, contact: contact, projectPage: projectPage
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Render = api;
})(typeof window !== "undefined" ? window : globalThis);
