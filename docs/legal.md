# Legal pages

The legal notice, privacy policy, terms of use and account deletion page exist in the 7 languages:
`/legal`, `/privacy`, `/terms` and `/delete-account` in English, `/<lang>/legal` and so on for the others
(fr, es, de, it, pt, nl). `/delete-account` is the page Google Play asks for (how to delete an account
without the app, what's erased and what's kept): its URL goes in the Play Console's data deletion field. Like the home
page, they follow the browser's language: a page opened in another language moves to its own version
(English when none matches), so any of these URLs can be shared. A link can name the language instead
with `?lang=<code>`: the app does, so its pages open in the app's language, not the phone's.

- Texts: `legal/pages/<lang>/<page>.html`, an `<h1>` then `<h2 id="…">` sections. The section ids are the
  same in every language, so a link like `/fr/privacy#retention` works in all of them. The French
  version prevails and the others follow it.
- Contact details: `legal/entity.json`, in one place for every page. `{{key}}` in a text shows the
  value, `{{@key}}` a link to it. Change `updated` whenever a text changes.
- `pnpm legal` writes `public/**/{legal,privacy,terms}.html`; commit them with the sources. `pnpm check`
  (so CI, and every deploy) fails while a generated page is stale or a value in `legal/entity.json` is
  empty: the pages can't ship with a gap.

## Deploying

