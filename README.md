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

## Sport photos

The sports marquee photos `public/img/sport_*.webp` added in 2026-10 come from Wikimedia Commons, all
CC0 (no attribution required). The run club, tennis, hiking, strength, swimming, football, padel, volleyball, skateboarding, dance, rugby, boxing and martial arts photos are Unsplash images (Unsplash licence, free to use) picked by the team. Cropped to 4:5, 640×800, WebP quality 70 (12 to 112 KB each). Source files:

- `sport_surfing.webp`: File:Trickster surfer (Unsplash).jpg
- `sport_kitesurf.webp`: File:Kitesurfing in Sweden.jpg
- `sport_basketball.webp`: File:Freestanding basketball net (Unsplash).jpg
- `sport_rowing.webp`: File:Fluidesign Quad Rowing Team At Dawn.jpg
- `sport_kayak.webp`: File:Kayak Rotankid.jpg
- `sport_pilates.webp`: File:Pilates Wunda Chair.jpg
- `sport_badminton.webp`: File:Badminton-1428046.jpg
- `sport_sailing.webp`: File:Sailboat in front of Campbell Point and the Angel Island Ferry Landing, Angel Island, 2011.jpg
- `sport_pickleball.webp`: File:Harry B. Anderson Tennis Center - Pickleball Courts 1-3.jpg
- `sport_skiing.webp`: File:Skier on a slope (Unsplash).jpg
- `sport_golf.webp`: File:Golf swing sunset.jpg

## Legal pages

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

Work on a branch and open a pull request into `staging` (the default branch): pull requests and pushes to
`staging` run the checks without deploying. To ship, Actions > release > Run workflow
(`.github/workflows/release.yml`): it fast-forwards `main` to `staging`, tags the next `vX.Y.Z`, publishes a
GitHub release, then `ci.yml` deploys that tag to production and smoke-tests the site. To roll back,
Actions > ci > Run workflow on an older tag.

The repository needs:

- the variable `CLOUDFLARE_ACCOUNT_ID`;
- the secret `CLOUDFLARE_API_TOKEN`: a token from the "Edit Cloudflare Workers" template, limited to
  this account and the `getdrafft.com` zone (the custom domains need Workers Routes and DNS on the zone).

Scripts and styles are cache-busted with `?v=` in `index.html`: bump it when `main.js`, `i18n.js` or
`styles.css` change.
