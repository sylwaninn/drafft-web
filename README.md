# drafft-web

The drafft marketing site, getdrafft.com: static HTML, CSS and JS in `public/`, served by a Cloudflare
Worker with static assets (`wrangler.jsonc`). The Worker only redirects `www.getdrafft.com` to the apex.

```sh
pnpm install
pnpm dev      # http://localhost:8787, with the production headers (public/_headers)
pnpm check    # bundle without deploying
```

## Deploying

Every push to `main` deploys to production (`.github/workflows/ci.yml`), then smoke-tests the site.
Work on a branch and open a pull request: the PR runs the same checks without deploying.

The repository needs:

- the variable `CLOUDFLARE_ACCOUNT_ID`;
- the secret `CLOUDFLARE_API_TOKEN`: a token from the "Edit Cloudflare Workers" template, limited to
  this account and the `getdrafft.com` zone (the custom domains need Workers Routes and DNS on the zone).

Scripts and styles are cache-busted with `?v=` in `index.html`: bump it when `main.js`, `i18n.js` or
`styles.css` change.
