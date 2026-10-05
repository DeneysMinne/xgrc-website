#!/usr/bin/env bash
#
# build-atomic.sh: build the site without taking it offline.
#
# nginx serves dist/ directly, so a plain `astro build` (which empties dist/
# first) left the live site returning errors for every page for the minute or
# so a build takes; Bing logged these as 5xx crawl errors (22 and 28 Sep 2026).
# This builds into .dist-next/ and only swaps it in once the build has
# succeeded and looks sane. A failed build leaves the live site untouched.
#
# `npm run build` runs this, so the hourly What's New sync and the scheduled
# blog deploys get it too. postbuild (IndexNow) still runs after it.
set -euo pipefail
cd "$(dirname "$0")/.."

# One build at a time: the hourly What's New sync, scheduled blog deploys and
# manual builds can start together (seen 5 Oct 2026 07:00), and two builds
# sharing .dist-next would publish a mix. A second build waits up to 10 min.
exec 9>.build.lock
if ! flock -w 600 9; then
  echo "build-atomic: another build is still running after 10 min, giving up" >&2
  exit 1
fi

NEXT=.dist-next
PREV=.dist-prev
rm -rf "$NEXT" "$PREV"

npx astro build --outDir "$NEXT"

# Refuse to publish an obviously broken build.
for f in index.html 404.html sitemap-index.xml insights/index.html; do
  if [ ! -s "$NEXT/$f" ]; then
    echo "build-atomic: $NEXT/$f missing or empty, live site left unchanged" >&2
    exit 1
  fi
done

# Two renames, microseconds apart (coreutils here has no mv --exchange).
if [ -d dist ]; then mv dist "$PREV"; fi
mv "$NEXT" dist
rm -rf "$PREV"
echo "build-atomic: new build is live in dist/"
