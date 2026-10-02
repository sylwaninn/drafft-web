#!/usr/bin/env node
// Builds the legal pages (legal notice, privacy policy, terms of use, account deletion) in the site's 7
// languages.
//
//   legal/pages/<lang>/<page>.html   the text of each page: an <h1>, then <h2 id="…"> sections
//   legal/entity.json                who publishes drafft; {{key}} in a text becomes its value,
//                                    {{@key}} a link to it (mailto: for an email address)
//
// English lives at /<page>, the other languages at /<lang>/<page>. Every page gets the same frame:
// wordmark, date, contents, and the footer links in its language. Like the home page, a page follows the
// browser's language: opened in another one, it moves to its own version (English when none matches).
//
//   node scripts/legal.mjs           write public/**/{legal,privacy,terms}.html
//   node scripts/legal.mjs --check   fail if those files are stale or a value in entity.json is empty
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname } from "node:path";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const check = process.argv.includes("--check");

const SITE = "https://getdrafft.com";
const CSS_VERSION = "1790760000";
const ANALYTICS_VERSION = "1790910000";
const PAGES = ["legal", "privacy", "terms", "delete-account"];
const LANGS = {
  en: { name: "English", locale: "en-GB", legal: "Legal notice", privacy: "Privacy policy", terms: "Terms of use", "delete-account": "Delete your account",
    updated: "Updated on {date}", toc: "Contents", home: "drafft home", skip: "Skip to content",
    footer: "Dating for people who train.", legalNav: "Legal" },
  fr: { name: "Français", locale: "fr-FR", legal: "Mentions légales", privacy: "Politique de confidentialité", terms: "Conditions d’utilisation", "delete-account": "Supprimer ton compte",
    updated: "Mis à jour le {date}", toc: "Sommaire", home: "Accueil drafft", skip: "Aller au contenu",
    footer: "Les rencontres pour les personnes qui s’entraînent.", legalNav: "Informations légales" },
  es: { name: "Español", locale: "es-ES", legal: "Aviso legal", privacy: "Política de privacidad", terms: "Condiciones de uso", "delete-account": "Eliminar tu cuenta",
    updated: "Actualizado el {date}", toc: "Índice", home: "Inicio de drafft", skip: "Ir al contenido",
    footer: "Citas para quienes entrenan.", legalNav: "Información legal" },
  de: { name: "Deutsch", locale: "de-DE", legal: "Impressum", privacy: "Datenschutzerklärung", terms: "Nutzungsbedingungen", "delete-account": "Konto löschen",
    updated: "Aktualisiert am {date}", toc: "Inhalt", home: "drafft Startseite", skip: "Zum Inhalt",
    footer: "Dating für Menschen, die trainieren.", legalNav: "Rechtliches" },
  it: { name: "Italiano", locale: "it-IT", legal: "Note legali", privacy: "Informativa sulla privacy", terms: "Termini di utilizzo", "delete-account": "Eliminare il tuo account",
    updated: "Aggiornato il {date}", toc: "Indice", home: "Home di drafft", skip: "Vai al contenuto",
    footer: "Incontri per chi si allena.", legalNav: "Note legali" },
  pt: { name: "Português", locale: "pt-PT", legal: "Aviso legal", privacy: "Política de privacidade", terms: "Termos de utilização", "delete-account": "Eliminar a tua conta",
    updated: "Atualizado a {date}", toc: "Índice", home: "Início do drafft", skip: "Ir para o conteúdo",
    footer: "Encontros para quem treina.", legalNav: "Informação legal" },
  nl: { name: "Nederlands", locale: "nl-NL", legal: "Juridische informatie", privacy: "Privacybeleid", terms: "Gebruiksvoorwaarden", "delete-account": "Je account verwijderen",
    updated: "Bijgewerkt op {date}", toc: "Inhoud", home: "drafft home", skip: "Naar de inhoud",
    footer: "Daten voor mensen die trainen.", legalNav: "Juridisch" },
};

const entity = JSON.parse(read("legal/entity.json"));
const missing = new Set();
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const gap = (key) => { missing.add(key); return `<mark class="lg-todo">[${key}]</mark>`; };
const fill = (html) => html.replace(/\{\{(@?)(\w+)\}\}/g, (_, link, key) => {
  if (!(key in entity)) throw new Error(`legal: unknown key {{${key}}}`);
  const v = String(entity[key] ?? "").trim();
  if (!v) return gap(key);
  if (!link) return esc(v);
  const href = v.includes("@") ? `mailto:${v}` : /^https?:\/\//.test(v) ? v : `https://${v}`;
  return `<a href="${esc(href)}">${esc(v.replace(/^https?:\/\//, ""))}</a>`;
});
// French typography: a no-break space before : ; ! ? and inside « », in text only (never in tags).
const frType = (html) => html.replace(/(^|>)([^<]+)/g, (_, gt, text) => gt + text
  .replace(/ ([:;!?»])/g, " $1").replace(/« /g, "« "));

const path = (lang, page) => (lang === "en" ? `/${page}` : `/${lang}/${page}`);

function render(lang, page) {
  const L = LANGS[lang];
  let body = fill(read(`legal/pages/${lang}/${page}.html`)).trim();
  if (lang === "fr") body = frType(body);
  const h1 = body.match(/<h1>([\s\S]*?)<\/h1>/);
  if (!h1) throw new Error(`legal: no <h1> in legal/pages/${lang}/${page}.html`);
  const sections = [...body.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)];
  const toc = sections.map(([, id, text]) => `      <li><a href="#${id}">${text}</a></li>`).join("\n");
  const [y, m, d] = entity.updated.split("-").map(Number);
  const date = new Intl.DateTimeFormat(L.locale, { dateStyle: "long", timeZone: "UTC" }).format(Date.UTC(y, m - 1, d));
  const title = h1[1].replace(/<[^>]+>/g, "");
  const alternates = Object.keys(LANGS).map((l) => `  <link rel="alternate" hreflang="${l === "pt" ? "pt-PT" : l}" href="${SITE}${path(l, page)}">`).join("\n");
  const foot = PAGES.map((p) => p === page
    ? `      <a href="${path(lang, p)}" aria-current="page">${L[p]}</a>`
    : `      <a href="${path(lang, p)}">${L[p]}</a>`).join("\n");
  // The intro is everything before the first section: the title and its lead paragraph.
  const cut = sections.length ? sections[0].index : body.length;
  const intro = body.slice(0, cut).trim();
  const rest = body.slice(cut).trim();
  const pageTitle = `drafft${lang === "fr" ? "\u00a0:" : ":"} ${esc(title)}`;

  return `<!doctype html>
<!-- Built by scripts/legal.mjs from legal/pages/${lang}/${page}.html and legal/entity.json: edit those, then run pnpm legal. -->
<html lang="${lang === "pt" ? "pt-PT" : lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <script>
    // A link can name the language (?lang=fr: the app does, so its pages follow the app's language);
    // otherwise the browser's language picks the version, as on the home page (i18n.js). The query
    // and the anchor come along.
    (() => {
      const langs = ${JSON.stringify(Object.keys(LANGS))};
      const asked = new URLSearchParams(location.search).get("lang");
      let want = langs.includes(asked) ? asked : null;
      for (const tag of want ? [] : navigator.languages || [navigator.language || "en"]) {
        const code = String(tag).toLowerCase().split("-")[0];
        if (langs.includes(code)) { want = code; break; }
      }
      want = want || "en";
      if (want !== "${lang}") location.replace(\`\${want === "en" ? "" : \`/\${want}\`}/${page}\${location.search}\${location.hash}\`);
    })();
  </script>
  <title>${pageTitle}</title>
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${SITE}${path(lang, page)}">
${alternates}
  <link rel="alternate" hreflang="x-default" href="${SITE}${path("en", page)}">
  <meta name="theme-color" content="#EEEFF1" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#0E0F10" media="(prefers-color-scheme: dark)">
  <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png?v=graphite">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png?v=graphite">
  <link rel="apple-touch-icon" sizes="180x180" href="/icon.png?v=graphite">
  <link rel="preload" href="/fonts/Inter-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/legal.css?v=${CSS_VERSION}">
  <script src="/analytics.js?v=${ANALYTICS_VERSION}" defer></script>
</head>
<body>
<a class="skip" href="#main">${L.skip}</a>
<header class="lg-head">
  <a class="lg-brand" href="/" aria-label="${L.home}">drafft</a>
</header>
<main id="main" class="lg">
  <div class="lg-intro">
    <p class="lg-date">${L.updated.replace("{date}", `<time datetime="${entity.updated}">${date}</time>`)}</p>
${intro.split("\n").map((l) => (l ? `    ${l}` : l)).join("\n")}
  </div>
${sections.length ? `  <nav class="lg-toc" aria-label="${L.toc}">
    <p class="lg-toc__title">${L.toc}</p>
    <ol>
${toc}
    </ol>
  </nav>
` : ""}  <div class="lg-body">
${rest.split("\n").map((l) => (l ? `    ${l}` : l)).join("\n")}
  </div>
</main>
<footer class="lg-foot">
  <div class="lg-foot__row">
    <p>${L.footer}</p>
    <nav class="lg-foot__links" aria-label="${L.legalNav}">
${foot}
    </nav>
    <p>© ${y} drafft</p>
  </div>
</footer>
</body>
</html>
`;
}

// Anchors other code links to (the app opens /terms#community, the stores /terms#app-stores): every
// language must keep them, or those links land at the top of the page.
const ANCHORS = { terms: ["community", "app-stores", "report"], privacy: ["retention", "rights", "sensitive-data"] };
for (const [page, ids] of Object.entries(ANCHORS)) for (const lang of Object.keys(LANGS)) {
  const text = read(`legal/pages/${lang}/${page}.html`);
  for (const id of ids) if (!text.includes(`id="${id}"`)) throw new Error(`legal: legal/pages/${lang}/${page}.html has no id="${id}"`);
}

const outputs = [];
for (const lang of Object.keys(LANGS)) for (const page of PAGES) {
  outputs.push({ file: `public${path(lang, page)}.html`, html: render(lang, page) });
}

if (check) {
  const stale = outputs.filter(({ file, html }) => !existsSync(new URL(file, root)) || read(file) !== html).map((o) => o.file);
  stale.forEach((f) => console.error(`legal: ${f} is out of date, run pnpm legal`));
  missing.forEach((k) => console.error(`legal: legal/entity.json has no value for "${k}"`));
  console.log(`legal: ${outputs.length} pages, ${stale.length} stale, ${missing.size} missing value(s).`);
  process.exit(stale.length || missing.size ? 1 : 0);
}
for (const { file, html } of outputs) {
  mkdirSync(dirname(new URL(file, root).pathname), { recursive: true });
  writeFileSync(new URL(file, root), html);
}
missing.forEach((k) => console.warn(`legal: legal/entity.json has no value for "${k}" (the pages show a gap)`));
console.log(`legal: wrote ${outputs.length} pages.`);
