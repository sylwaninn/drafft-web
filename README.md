<div align="center">

<img src="docs/sticker.png" alt="drafft web" width="480">

**Meet someone who gets your rhythm.**

[getdrafft.com](https://getdrafft.com): the website of drafft, the dating app for people who train.<br>
The home page, the legal pages the apps open, and the account deletion page, in 7 languages.

[![ci](https://github.com/sylwaninn/drafft-web/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/sylwaninn/drafft-web/actions/workflows/ci.yml)
[![pr](https://github.com/sylwaninn/drafft-web/actions/workflows/pr.yml/badge.svg)](https://github.com/sylwaninn/drafft-web/actions/workflows/pr.yml)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white)
![Languages](https://img.shields.io/badge/languages-7-2EA44F)
![License](https://img.shields.io/badge/license-proprietary-lightgrey)

[How it works](#how-it-works) · [Getting started](#getting-started) · [Deploy](#deploy) · [Docs](#documentation)

</div>

## How it works

Static HTML, CSS and JS in `public/`, with no framework and no build step, served by one Cloudflare Worker with
static assets. The Worker runs first on every request (`run_worker_first`), so nothing skips its rules.

```mermaid
flowchart LR
  Browser["Browser"] --> Worker["Worker<br/>worker/index.js"]
  Worker -- "host www.getdrafft.com" --> Redirect["301 to getdrafft.com<br/>same path and query"]
  Worker -- "POST /ingest/…" --> PostHog["PostHog EU<br/>eu.i.posthog.com"]
  Worker -- "any other request" --> Assets["Static assets<br/>public/"]
```

### Requests

| Step | What happens |
|---|---|
| Domains | `getdrafft.com` and `www.getdrafft.com` only; no `workers.dev` or preview URLs |
| Redirect | a `www.` host gets a 301 to the apex; `http` to `https` is the zone's Always Use HTTPS |
| Assets | `public/`, with the headers of `public/_headers`: CSP `default-src 'self'`, `frame-ancestors 'none'`, HSTS, `nosniff`, no camera, microphone or location |
| Caching | `/fonts/`, `/vendor/` and `/img/` for a week; `main.js`, `i18n.js`, `styles.css` and `analytics.js` are cache-busted with `?v=` |

### Languages

- **Home page:** one HTML file, translated in the browser by `public/i18n.js` (7 languages). It takes the first
  browser language it knows, else English, then fills every `data-i18n` text, the title and the meta tags.
- **Legal pages:** English at `/<page>`, the others at `/<lang>/<page>`. A small script on each page picks
  `?lang=<code>` first (the apps pass it, so a page opens in the app's language), else the browser's language,
  and moves to that version. Each page lists its 7 alternates (`hreflang`).

### Legal pages

`scripts/legal.mjs` builds them from `legal/`: 4 pages (`legal`, `privacy`, `terms`, `delete-account`) in
7 languages, 28 files written to `public/`. Contact details come from `legal/entity.json` (`{{key}}`, `{{@key}}`
for a link). The build fails on a missing section anchor or an empty value, and `--check` fails while a
generated page is stale. Details: [docs/legal.md](docs/legal.md).

### Page views

`public/analytics.js` loads PostHog once the page is loaded and the browser idle, and counts page views and
time on page only: no cookie, no storage, no autocapture, no replay. It sends nothing with Do Not Track or
Global Privacy Control on, or on another host than `getdrafft.com`. Events go to `/ingest` on the same domain;
the Worker relays three PostHog paths only, POST only, 256 KiB at most, with four headers (`content-type`,
`content-encoding`, `user-agent`, `accept-language`). Details: [docs/analytics.md](docs/analytics.md).

### Layout

| Path | What |
|---|---|
| `public/` | the site: `index.html`, `styles.css`, `main.js`, `i18n.js`, `analytics.js`, generated legal pages |
| `legal/` | legal page sources: texts per language, contact details |
| `worker/` | the Worker and its tests |
| `scripts/` | legal page generator, wording check, smoke test |

## Getting started

```sh
git config core.hooksPath .agents/git-hooks
pnpm install
pnpm dev       # http://localhost:8787, with the production headers
```

| Command | What |
|---|---|
| `pnpm legal` | rebuild the legal pages from `legal/` (commit them with the sources) |
| `pnpm check` | legal pages up to date and complete, then bundle without deploying |
| `pnpm wording` | the copy against WORDING.md's forbidden wording |
| `pnpm test` | the Worker: redirect, relay allow list, POST only, size limit |

Bump `?v=` in `index.html` when `main.js`, `i18n.js` or `styles.css` change.

## Deploy

There is no staging: pull requests go into `main`.

| When | CI (`.github/workflows/ci.yml`) |
|---|---|
| Pull request | title format; `pnpm check`, `pnpm test`, `pnpm wording`; `pnpm audit`, gitleaks, actionlint, zizmor, shellcheck |
| Push to `main` | the same checks, then `wrangler deploy` to production and a smoke test: `/` answers 200 with its CSP, and `www` and `http` land on `https://getdrafft.com/` |

The repository needs the variable `CLOUDFLARE_ACCOUNT_ID` and the secret `CLOUDFLARE_API_TOKEN` (template "Edit
Cloudflare Workers", this account and the `getdrafft.com` zone).

## Documentation

| Document | Read it when you |
|---|---|
| [WORDING.md](WORDING.md) | write any copy, in any language |
| [PRODUCT.md](PRODUCT.md) | need the product and its positioning |
| [docs/legal.md](docs/legal.md) | change a legal text, add a page or a language |
| [docs/analytics.md](docs/analytics.md) | touch page view measurement |
| [AGENTS.md](AGENTS.md) | run a coding agent, or need the repository rules |

## Related repositories

| Repository | Role |
|---|---|
| [drafft-ios](https://github.com/sylwaninn/drafft-ios) | iPhone app |
| [drafft-android](https://github.com/sylwaninn/drafft-android) | Android app |
| [drafft-backend](https://github.com/sylwaninn/drafft-backend) | Supabase, Edge Functions, media and support Workers |
| [drafft-sophros](https://github.com/sylwaninn/drafft-sophros) | moderation and support dashboard |

## License

Proprietary. Copyright © 2026 the drafft authors. All rights reserved. No permission is granted to use, copy,
modify or distribute this code without written consent.
