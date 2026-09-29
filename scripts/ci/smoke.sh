#!/usr/bin/env bash
# After a deploy: the site answers with the page and its security headers, and www redirects to the apex.
# A new custom domain can take a minute to get its certificate, hence the retries.
#
#   scripts/ci/smoke.sh <url>
set -euo pipefail
url=$1
host=${url#https://}

for attempt in 1 2 3 4 5 6 7 8 9 10 11 12; do
  headers=$(curl -sS -D - -o /tmp/smoke-body --max-time 10 "$url/" || true)
  if grep -q '^HTTP/[0-9.]* 200' <<<"$headers"; then
    grep -qi '^content-security-policy:' <<<"$headers" || { echo "::error::$url has no Content-Security-Policy." >&2; exit 1; }
    grep -q 'class="brand"' /tmp/smoke-body || { echo "::error::$url answered 200 without the drafft page." >&2; exit 1; }
    location=$(curl -sS -o /dev/null -w '%{redirect_url}' --max-time 10 "https://www.$host/" || true)
    [ "$location" = "$url/" ] || { echo "::error::www.$host redirects to '${location:-nothing}', not $url/." >&2; exit 1; }
    echo "ok: $url serves the site, www.$host redirects to it"
    exit 0
  fi
  echo "attempt $attempt: $(head -1 <<<"$headers"), retrying"
  sleep 10
done
echo "::error::$url never answered 200." >&2
exit 1
