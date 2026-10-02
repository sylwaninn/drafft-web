# Legal pages

The legal notice, privacy policy, terms of use and account deletion page exist in 7 languages (en, fr, es,
de, it, pt, nl): `/legal`, `/privacy`, `/terms` and `/delete-account` in English, `/<lang>/legal` and so on
for the others. `/delete-account` is the page Google Play asks for (how to delete an account without the
app, what's erased and what's kept): its URL goes in the Play Console's data deletion field.

## Languages

Like the home page, a legal page follows the browser's language: opened in another language, it moves to
its own version (English when none matches), so any of these URLs can be shared. A link can name the
language instead with `?lang=<code>`: the apps do, so their pages open in the app's language, not the
phone's. Each page lists its 7 versions (`hreflang`, English as `x-default`).

## Sources

- Texts: `legal/pages/<lang>/<page>.html`, an `<h1>` then `<h2 id="…">` sections. The section ids are the
  same in every language, so a link like `/fr/privacy#retention` works in all of them. The French
  version prevails and the others follow it.
- Contact details: `legal/entity.json`, in one place for every page. `{{key}}` in a text shows the
  value, `{{@key}}` a link to it (`mailto:` for an email address). Change `updated` whenever a text changes.

## Build

`pnpm legal` (`scripts/legal.mjs`) writes `public/**/{legal,privacy,terms,delete-account}.html`; commit them
with the sources.

- It fails on an unknown `{{key}}`, a page without `<h1>`, or a missing required anchor. The apps link to
  these anchors, so every language must have them (`ANCHORS` in `scripts/legal.mjs`):
  - `terms`: `community`, `app-stores`, `report`;
  - `privacy`: `retention`, `rights`, `sensitive-data`.
- An empty value in `legal/entity.json` is written as a visible gap, with a warning.
- `pnpm check` (so CI, and every deploy) runs it with `--check`: it writes nothing and fails while a
  generated page is stale or a value is empty, so the pages can't ship with a gap.

`legal.css` and `analytics.js` are cache-busted on the legal pages by `CSS_VERSION` and `ANALYTICS_VERSION`
in `scripts/legal.mjs`: bump them when either file changes.

## Add a page or a language

- **A page:** add its name to `PAGES` and its title to every language in `LANGS` (`scripts/legal.mjs`), write
  `legal/pages/<lang>/<page>.html` in all 7 languages, then run `pnpm legal`. To link it from the home page,
  add an `<a href="/<page>" data-legal>` in `public/index.html` (`i18n.js` prefixes it with the language)
  and its label in `public/i18n.js`.
- **A language:** add it to `LANGS` (title of each page, footer texts, locale), write
  `legal/pages/<lang>/` for every page, add its table to `public/i18n.js` for the home page, then run
  `pnpm legal`.
