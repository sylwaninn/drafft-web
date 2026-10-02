# Audience measurement of getdrafft.com (PostHog Web analytics)

What the website sends about its visits, why, and how to switch it on. The apps' own telemetry (Sentry
and PostHog in the iPhone and Android apps) is a separate plan: `docs/telemetry.md` in drafft-ios and
drafft-android.

## What it does

`public/analytics.js` loads the PostHog library (`public/vendor/posthog.slim.js`, pinned, served from
this site) once the page has loaded and the browser is idle, and sends page views and the time on the
page. Nothing else: no autocapture of clicks or forms, no session replay, no survey, no feature flag,
no heatmap, no error tracking.

| | |
|---|---|
| Cookies, localStorage | None (`cookieless_mode: "always"`, `persistence: "memory"`) |
| Visitor | PostHog counts visitors with a hash of the IP address and the browser, salted every day and never stored: nobody is followed from one day to the next. No person profile, no identify |
| Sent | The page (path, and `utm_*` campaign parameters only: any other query string and the fragment are removed), the referring site (domain and path, no query), browser, device, language, screen size, country |
| Not sent | Anything typed (the site has no form), the IP address (not kept: project setting below), clicks |
| Destination | `https://getdrafft.com/ingest/*`, relayed by the Worker to PostHog's EU cloud (`eu.i.posthog.com`, Germany). The browser contacts no other site |
| Off when | there is no project key; the browser sends Do Not Track or Global Privacy Control; the host isn't `getdrafft.com` (`wrangler dev`, previews); the browser is a crawler (posthog-js drops bots) |

Why cookieless and first party: it stays within the CNIL's audience measurement exemption (no consent
banner) as long as the data stays anonymous, isn't cross-referenced, isn't kept longer than 13 months and
the privacy policy says so and lets people object. The policy (`legal/pages/*/privacy.html`, "Cookies
and trackers", the processors table and the retention table) says exactly this, in 7 languages.
Anything added to what is measured (a click event, a form, a replay) changes the legal basis: update the
policy first, and ask for consent.

## The relay (`worker/index.js`)

`POST /ingest/e/`, `/ingest/i/v0/e/` and `/ingest/batch/` go to `https://eu.i.posthog.com/<same path>`;
every other `/ingest/*` path is a 404 and every other method a 405, so it can't reach the rest of
PostHog's API. Cookies and credentials are dropped; the visitor's address goes in `X-Forwarded-For`
because the cookieless hash needs it. Bodies over 256 KB are refused. `pnpm test` covers it.

The CSP (`public/_headers`) needs no change: the script and the library are `'self'` and so is the
`connect-src` of the relay.

## Switching it on

1. PostHog (EU cloud): create a project for the website (one project per environment, never the apps'
   one). Settings:
   - Web analytics > **Cookieless server hash mode: on** (without it, cookieless events are dropped);
   - Project > **Discard client IP data: on** (the policy says the IP address isn't kept);
   - Data retention: events 13 months at most (the policy says so); GeoIP enrichment kept (country only
     is shown).
2. Put the project API key (`phc_...`, public) in `PROJECT_KEY` of `public/analytics.js`, bump the `?v=`
   (`public/index.html`, `ANALYTICS_VERSION` in `scripts/legal.mjs`, then `pnpm legal`), open a pull
   request. Merging deploys it.
3. Web analytics in PostHog shows visits once the first page view arrives. Check one visit from a real
   browser with Do Not Track off, and that the browser's network tab shows `/ingest/e/` and no request
   to another host.

Without a key nothing is sent: the deploy is safe before step 1.

## The vendored library

`public/vendor/posthog.slim.js` is `posthog-js@1.435.6`, `dist/module.slim.no-external.js` (no extension,
nothing loaded from PostHog's servers) with the source map comment removed; licence in
`public/vendor/posthog-js.LICENSE`. To update:

```sh
npm pack posthog-js@<version> && tar xzf posthog-js-<version>.tgz
grep -v '^//# sourceMappingURL' package/dist/module.slim.no-external.js > public/vendor/posthog.slim.js
```

then check a visit in a browser (the cookie-free `$pageview` with `distinct_id` `$posthog_cookieless`,
`$cookieless_mode: true`, `$process_person_profile: false`, and nothing in the storage).
