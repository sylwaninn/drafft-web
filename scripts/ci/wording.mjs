#!/usr/bin/env node
// Fails when the site's copy uses wording WORDING.md forbids (its `wording-forbidden` block):
// every string literal of public/i18n.js, and the visible text and attributes of public/index.html
// and of the legal pages (public/**/{legal,privacy,terms,delete-account}.html, built by scripts/legal.mjs).
import { readFileSync, readdirSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../../${path}`, import.meta.url), "utf8");

const block = read("WORDING.md").match(/```wording-forbidden\n([\s\S]*?)```/);
if (!block) {
  console.error("wording: no wording-forbidden block in WORDING.md");
  process.exit(1);
}
const rules = block[1].split("\n").filter(Boolean).map((line) => {
  const at = line.lastIndexOf(" | ");
  return { pattern: new RegExp(line.slice(0, at), "i"), reason: line.slice(at + 3) };
});

const texts = [];
read("public/i18n.js").split("\n").forEach((line, i) => {
  for (const m of line.matchAll(/"((?:[^"\\]|\\.)*)"/g)) texts.push({ where: `public/i18n.js:${i + 1}`, text: m[1] });
});
const legal = ["", ...readdirSync(new URL("../../public/", import.meta.url), { withFileTypes: true })
  .filter((d) => d.isDirectory() && /^[a-z]{2}$/.test(d.name)).map((d) => `${d.name}/`)]
  .flatMap((dir) => ["legal", "privacy", "terms", "delete-account"].map((page) => `public/${dir}${page}.html`));
for (const file of ["public/index.html", ...legal]) {
  read(file).split("\n").forEach((line, i) => {
    const visible = line.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<(?!\/?[a-z])|<[^>]*?(?:alt|title|content|aria-label)="([^"]*)"[^>]*>|<[^>]*>/gi, " $1 ");
    texts.push({ where: `${file}:${i + 1}`, text: visible });
  });
}

let errors = 0;
for (const { where, text } of texts) {
  for (const { pattern, reason } of rules) {
    if (pattern.test(text)) {
      console.error(`${where}: ${reason}, see WORDING.md: ${JSON.stringify(text.trim().slice(0, 160))}`);
      errors++;
    }
  }
}
console.log(`wording: ${errors} error(s).`);
process.exit(errors ? 1 : 0);
