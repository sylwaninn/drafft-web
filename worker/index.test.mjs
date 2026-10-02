// node --test worker: the PostHog relay only forwards events, as a POST, without the visitor's cookies.
import assert from "node:assert/strict";
import test from "node:test";
import worker, { relayToPostHog } from "./index.js";

const post = (path, init = {}) =>
  new Request(`https://getdrafft.com${path}`, { method: "POST", body: '{"event":"$pageview"}', ...init });

test("an event goes to PostHog's EU host, with the visitor's address and no cookie", async () => {
  let sent;
  const upstream = async (url, init) => {
    sent = { url, init };
    return new Response("{}", { status: 200, headers: { "content-type": "application/json", "set-cookie": "a=b" } });
  };
  const request = post("/ingest/e/?ip=0&ver=1", {
    headers: { "content-type": "application/json", cookie: "secret=1", authorization: "Bearer x", "cf-connecting-ip": "203.0.113.7" },
  });
  const response = await relayToPostHog(request, upstream);
  assert.equal(sent.url, "https://eu.i.posthog.com/e/?ip=0&ver=1");
  assert.equal(sent.init.headers.get("x-forwarded-for"), "203.0.113.7");
  assert.equal(sent.init.headers.get("cookie"), null);
  assert.equal(sent.init.headers.get("authorization"), null);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("set-cookie"), null);
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("only the capture endpoints are relayed", async () => {
  const upstream = async () => assert.fail("must not reach PostHog");
  for (const path of ["/ingest/", "/ingest/decide/", "/ingest/api/projects/1/", "/ingest/e", "/ingest/array/phc_x/config.js"]) {
    assert.equal((await relayToPostHog(post(path), upstream)).status, 404, path);
  }
});

test("only POST", async () => {
  const upstream = async () => assert.fail("must not reach PostHog");
  const response = await relayToPostHog(new Request("https://getdrafft.com/ingest/e/"), upstream);
  assert.equal(response.status, 405);
});

test("an oversized body is refused", async () => {
  const upstream = async () => assert.fail("must not reach PostHog");
  const big = "x".repeat(300 * 1024);
  assert.equal((await relayToPostHog(post("/ingest/e/", { body: big }), upstream)).status, 413);
});

test("www still redirects to the apex and other paths go to the static files", async () => {
  const www = await worker.fetch(new Request("https://www.getdrafft.com/privacy?lang=fr"), {});
  assert.equal(www.status, 301);
  assert.equal(www.headers.get("location"), "https://getdrafft.com/privacy?lang=fr");
  const env = { ASSETS: { fetch: async () => new Response("page") } };
  assert.equal(await (await worker.fetch(new Request("https://getdrafft.com/"), env)).text(), "page");
});
