// www.getdrafft.com redirects to the apex; /ingest is the site's audience measurement relayed to PostHog
// (EU cloud); everything else is a static file from public/.
const POSTHOG_HOST = "eu.i.posthog.com";
// What posthog-js sends from the page (public/analytics.js): events, and nothing else. Anything outside
// this list is a 404, so the relay can't be used to reach the rest of PostHog's API.
const EVENT_PATHS = new Set(["/ingest/e/", "/ingest/i/v0/e/", "/ingest/batch/"]);
const MAX_BODY_BYTES = 256 * 1024;

// The first party relay of PostHog's capture endpoint (docs/analytics.md): the page talks to its own
// domain, so no other site is contacted and blockers see no third party. The visitor's IP address goes
// in X-Forwarded-For because PostHog's cookieless mode counts visitors with a daily hash of it and the
// browser; PostHog doesn't store it ("Discard client IP data"). Cookies and credentials never go along.
export async function relayToPostHog(request, upstream = fetch) {
  const url = new URL(request.url);
  if (!EVENT_PATHS.has(url.pathname)) return new Response("Not found", { status: 404 });
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers: { Allow: "POST" } });
  if (Number(request.headers.get("content-length") || 0) > MAX_BODY_BYTES) return new Response("Too large", { status: 413 });

  const headers = new Headers();
  for (const name of ["content-type", "content-encoding", "user-agent", "accept-language"]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  headers.set("x-forwarded-for", request.headers.get("cf-connecting-ip") || "");

  const body = await request.arrayBuffer();
  if (body.byteLength > MAX_BODY_BYTES) return new Response("Too large", { status: 413 });
  const response = await upstream(`https://${POSTHOG_HOST}${url.pathname.slice("/ingest".length)}${url.search}`, {
    method: "POST",
    headers,
    body,
  });
  return new Response(response.body, {
    status: response.status,
    headers: { "content-type": response.headers.get("content-type") || "text/plain", "cache-control": "no-store" },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname.startsWith("www.")) {
      url.hostname = url.hostname.slice(4);
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname.startsWith("/ingest/")) return relayToPostHog(request);
    return env.ASSETS.fetch(request);
  },
};
