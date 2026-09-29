# drafft-web

The drafft marketing site, getdrafft.com: static HTML, CSS and JS in `public/`, served by a Cloudflare
Worker with static assets (`wrangler.jsonc`). The Worker only redirects `www.getdrafft.com` to the apex.

```sh
pnpm install
pnpm dev      # http://localhost:8787, with the production headers (public/_headers)
pnpm legal    # rebuild the legal pages from legal/
pnpm check    # legal pages up to date and complete, then bundle without deploying
pnpm wording  # the copy against WORDING.md's forbidden wording (CI runs it too)
```

All page copy (`public/i18n.js`, 7 languages) follows [WORDING.md](WORDING.md), a synced copy of the one in
the `drafft` repository.

## Legal pages

The legal notice, privacy policy and terms of use exist in the 7 languages: `/legal`, `/privacy` and
`/terms` in English, `/<lang>/legal` and so on for the others (fr, es, de, it, pt, nl). Like the home
page, they follow the browser's language: a page opened in another language moves to its own version
(English when none matches), so any of these URLs can be shared.

- Texts: `legal/pages/<lang>/<page>.html`, an `<h1>` then `<h2 id="…">` sections. The section ids are the
  same in every language, so a link like `/fr/privacy#retention` works in all of them. The French
  version prevails and the others follow it.
- Contact details: `legal/entity.json`, in one place for every page. `{{key}}` in a text shows the
  value, `{{@key}}` a link to it. Change `updated` whenever a text changes.
- `pnpm legal` writes `public/**/{legal,privacy,terms}.html`; commit them with the sources. `pnpm check`
  (so CI, and every deploy) fails while a generated page is stale or a value in `legal/entity.json` is
  empty: the pages can't ship with a gap.

## Deploying

Every push to `main` deploys to production (`.github/workflows/ci.yml`), then smoke-tests the site.
Work on a branch and open a pull request: the PR runs the same checks without deploying.

The repository needs:

- the variable `CLOUDFLARE_ACCOUNT_ID`;
- the secret `CLOUDFLARE_API_TOKEN`: a token from the "Edit Cloudflare Workers" template, limited to
  this account and the `getdrafft.com` zone (the custom domains need Workers Routes and DNS on the zone).

Scripts and styles are cache-busted with `?v=` in `index.html`: bump it when `main.js`, `i18n.js` or
`styles.css` change.
