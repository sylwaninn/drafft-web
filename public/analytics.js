// Audience measurement of the website: PostHog (EU cloud), page views only, without a cookie.
//
// - Cookieless: `cookieless_mode: "always"` stores nothing in the browser (no cookie, no localStorage).
//   PostHog counts visitors with a hash of the IP address and the browser, salted every day and never
//   stored, so a visitor isn't followed from one day to the next. No person profile, no identify.
// - First party: the library is served from /vendor and sends to /ingest on this domain (worker/index.js
//   relays it to eu.i.posthog.com), so the page contacts no other site and the CSP stays 'self'.
// - Page views and the time on the page only: no autocapture of clicks or forms, no session replay,
//   no survey, no feature flag, no heatmap. Query strings leave the URL except utm_*, the one thing a
//   campaign needs.
// - Off when there is no project key, when the browser says Do Not Track or Global Privacy Control, and
//   anywhere but getdrafft.com (wrangler dev, previews).
//
// The project key is public (it only lets a page send events). It is the drafft project's, shared with
// the apps: docs/analytics.md. PostHog project settings it relies on: Web analytics > "Cookieless server hash
// mode" on, and "Discard client IP data" on.
(() => {
  const PROJECT_KEY = "phc_v7XkEKcLMvYaaNMfNANZBEidQwYKe4MjzugMQHyxur7W";
  const HOST = "getdrafft.com";

  const quiet = navigator.doNotTrack === "1" || navigator.globalPrivacyControl === true;
  if (!PROJECT_KEY || quiet || location.hostname !== HOST) return;

  // The URL as it is counted: its path, and the campaign (utm_*) parameters only.
  const clean = (value) => {
    try {
      const url = new URL(value);
      for (const key of [...url.searchParams.keys()]) if (!key.startsWith("utm_")) url.searchParams.delete(key);
      url.hash = "";
      return url.toString();
    } catch {
      return value;
    }
  };
  // A referrer is another site's address: its domain and path are enough (PostHog also derives
  // `$referring_domain`).
  const referrer = (value) => {
    try {
      const url = new URL(value);
      return `${url.origin}${url.pathname}`;
    } catch {
      return value;
    }
  };

  // After the page has loaded and the browser is idle: measuring never slows the page down.
  const start = async () => {
    const { default: posthog } = await import("/vendor/posthog.slim.js");
    posthog.init(PROJECT_KEY, {
      api_host: `${location.origin}/ingest`,
      ui_host: "https://eu.posthog.com",
      cookieless_mode: "always",
      person_profiles: "never",
      persistence: "memory",
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: false,
      capture_dead_clicks: false,
      capture_heatmaps: false,
      capture_exceptions: false,
      rageclick: false,
      disable_session_recording: true,
      disable_surveys: true,
      advanced_disable_flags: true,
      disable_external_dependency_loading: true,
      respect_dnt: true,
      mask_personal_data_properties: true,
      before_send: (event) => {
        if (!event) return null;
        const properties = event.properties || {};
        // Same property as the apps' (`app_environment`): one filter keeps production only. This code only
        // runs on getdrafft.com, so every event it sends is production.
        properties.app_environment = "production";
        event.properties = properties;
        if (properties.$current_url) properties.$current_url = clean(properties.$current_url);
        if (properties.$referrer && properties.$referrer !== "$direct") properties.$referrer = referrer(properties.$referrer);
        return event;
      },
    });
  };
  const whenIdle = () => ("requestIdleCallback" in window ? requestIdleCallback(start, { timeout: 4000 }) : setTimeout(start, 1500));
  if (document.readyState === "complete") whenIdle();
  else addEventListener("load", whenIdle, { once: true });
})();
