#!/usr/bin/env bash
# After a deploy: the site answers with the page and its security headers, and http and www end up on
# it. A new custom domain can take a few minutes to get its certificate, hence the retries.
#
#   scripts/ci/smoke.sh <url>
set -euo pipefail
url=$1
host=${url#https://}
body=$(mktemp)

check() {
  local headers location
  headers=$(curl -sS -D - -o "$body" --max-time 10 "$url/" || true)
  grep -q '^HTTP/[0-9.]* 200' <<<"$headers" || { echo "$url: $(head -1 <<<"$headers")"; return 1; }
  grep -qi '^content-security-policy:' <<<"$headers" || { echo "$url: no Content-Security-Policy"; return 1; }
  grep -q 'class="brand"' "$body" || { echo "$url: 200 without the drafft page"; return 1; }
  # www is sent to the apex by the Worker, http to https by the zone (Always Use HTTPS): follow the
  # redirects and check where each one lands.
  for from in "https://www.$host/" "http://$host/" "http://www.$host/"; do
    location=$(curl -sS -L -o /dev/null -w '%{url_effective}' --max-redirs 3 --max-time 10 "$from" || true)
    [ "$location" = "$url/" ] || { echo "$from: lands on '${location:-nothing}', not $url/"; return 1; }
  done
}

for attempt in $(seq 1 30); do
  if report=$(check); then
    echo "ok: $url serves the site; http and www redirect to it"
    exit 0
  fi
  echo "attempt $attempt: $report, retrying"
  sleep 10
done
echo "::error::$url not ready after 5 minutes: $report" >&2
exit 1
