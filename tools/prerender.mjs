// Bakes the content from content/data.js into index.html and projects/*.html,
// so the site reads fine with JavaScript off and link previews see real text.
// Run from the repo root:  node tools/prerender.mjs
// No dependencies. The live site still renders from data.js in the browser, so
// skipping this step only affects visitors without JavaScript.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);

const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, "content/data.js"), "utf8"), ctx);
const S = ctx.window.SITE;
const R = require(path.join(root, "js/render.js"));

function fill(html, key, inner) {
  const re = new RegExp(`<!--r:${key}-->[\\s\\S]*?<!--/r:${key}-->`);
  if (!re.test(html)) throw new Error(`marker r:${key} not found`);
  return html.replace(re, () => `<!--r:${key}-->${inner}<!--/r:${key}-->`);
}

// Home page
const indexPath = path.join(root, "index.html");
let index = fs.readFileSync(indexPath, "utf8");
for (const k of ["intro", "about", "experience", "filters", "featured", "others", "education", "activities", "contact"]) {
  index = fill(index, k, R[k](S));
}
fs.writeFileSync(indexPath, index);

// Project pages (one per featured project), generated from a shared template
const tpl = fs.readFileSync(path.join(root, "tools/project-template.html"), "utf8");
fs.mkdirSync(path.join(root, "projects"), { recursive: true });
const wanted = new Set();
for (const p of S.projects.filter((x) => x.featured)) {
  const file = `${p.slug}.html`;
  wanted.add(file);
  const desc = R.esc(p.summary);
  const title = R.esc(`${p.title} · ${S.person.name}`);
  let html = tpl
    .replaceAll("{{TITLE}}", title)
    .replaceAll("{{DESC}}", desc)
    .replaceAll("{{SLUG}}", p.slug)
    .replaceAll("{{URL}}", `${S.person.siteUrl}projects/${file}`);
  html = fill(html, "project", R.projectPage(S, p.slug));
  fs.writeFileSync(path.join(root, "projects", file), html);
}
console.log(`Prerendered index.html and ${wanted.size} project pages.`);
