# Domain cutover redirect map

Source data: Google Search Console → Page indexing → Indexed pages export for
`xgrcsoftware.com`, 294 URLs, exported 2026-07-18 (last GSC crawl data point:
2026-07-10). This is every URL Google currently has indexed on the live
WordPress site: the set that needs a landing place, or it 404s on launch day
and both users and rankings take the hit.

## Files

- `domain-cutover-redirect-map.csv`: every URL requiring a redirect, its new
  path, and the reason it was routed there. 264 rows.
- `domain-cutover-redirects.conf`: the same data as ready-to-use nginx
  `location =` blocks. Drop inside the production `xgrcsoftware.com` server
  block, **before** the SPA `try_files` fallback, so these take priority.

30 of the 294 URLs need **no redirect at all** and are not in either file:
the homepage, the 12 solution pages that already live at the same path on
the new site (`/sheqx/`, `/msx/`, etc.), the 3 static pages that already
match (`/contact/`, `/customers/`, `/solutions/`), 2 already covered by an
existing nginx rule (`/compliancehub/`, `/pix/`), and all 14 legal/trust
document paths. The new site's legal section was deliberately built to
reuse the old site's exact URLs, so those need nothing.

## How the 264 were resolved

1. **21 exact matches**: old blog post slug is byte-identical to a slug in
   the new Insights section, redirected to `/insights/{slug}/`.
2. **7 curated fuzzy matches**: old slug differs slightly (typo, trailing
   `-2`, mangled date, reworded title) from a new article but is clearly the
   same piece, reviewed by hand rather than trusted on string similarity
   alone. Example: `iso-31000-vs-coso-key-erm-framework-differences-xgrc` →
   `/insights/iso-31000-vs-coso-key-erm-framework-differences/`.
3. **1 renamed solution**: `/cyber-security/` → `/msxcyber/`.
4. **1 renamed legal doc**: `/privacy-policy-and-eula/` → `/legal/privacy-policy/`.
5. **26 WordPress structural pages**: category archives (`/category/*`) and
   pagination (`/latest-news/page/N/`) have no equivalent concept on the new
   site, so both redirect to `/insights/`.
6. **22 old PDF media-library uploads**: matched against the new site's
   actual PDF inventory where one exists (e.g. `PPLE-Case-Study.pdf` →
   `/case-studies/pple-group.pdf`, which really exists), otherwise sent to
   the relevant solution page. The old infographics and booklets themselves
   are not being recreated; this just stops the old links from 404ing.
7. **8 static pages with no direct new equivalent**: judgment calls, e.g.
   `/internal-audit-software/` → `/use-cases/internal-audit/`,
   `/become-a-partner/` → `/contact/`, `/release-notes/` → `/` (no marketing
   equivalent exists; release notes are an in-app XRM feature).
8. **~180 orphaned blog posts** (no matching new article): keyword-routed
   to the most topically relevant solution or use-case page (e.g. anything
   with "sheq"/"safety"/"ppe" → `/sheqx/`, anything ERM/risk-themed →
   `/erm/`), with named customer case-study posts (Servest, TN Ceramics,
   Kintetsu, etc.) routed to `/customers/` ahead of generic keywords.
   **44 of these had no confident topic match and fall back to `/insights/`**,
   mostly the category and pagination URLs above, plus genuinely generic
   posts (COVID-era commentary, "business trends" pieces, and similar).

## What this is not

This is a first-pass, keyword-driven map, not a page-by-page editorial
review of all 264 posts. The exact and curated article matches (29 rows)
and the solution/legal renames are high-confidence. The ~180 keyword-routed
orphans are a reasonable default, not a guarantee that every single one
landed on the *best possible* page: spot-check the `/sheqx/`, `/erm/`,
`/esg/`, and `/msxcyber/` buckets (the largest) if time allows before
launch. None of them are wrong in the sense of landing somewhere
irrelevant; some may just be a notch more generic than a human editor
would choose.

## Verified 2026-07-20

Wired into the production `xgrcsoftware.com` vhost (`include` line before the
SPA `try_files` fallback), `nginx -t` passes, and tested directly against the
server via `curl --resolve` (bypassing DNS, which still points at the old
WordPress host at this stage):

- All 29 high-confidence rows (exact + curated + renamed solution): correct
  301, correct target, target returns 200.
- Spot-check across `/sheqx/`, `/erm/`, `/esg/`, `/msxcyber/`,
  `/compliance-hub/`, `/msx/`, `/grc-software/` (26 rows): all correct, all
  topic assignments sane on review.
- All 44 `/insights/` fallback rows: all redirect correctly and land on a
  200. Traffic/impressions/backlink-weighted review of these 44 was **not
  done** — no GSC Performance export or backlink data exists in this repo;
  only the indexed-URL list. Needed before treating this tier as fully
  reviewed, not just functionally correct.
- 32 no-redirect URLs (homepage, 12 solution pages, 3 static pages, 2
  existing-rule paths, 14 legal/trust paths — note this is 32 against the
  "30" figure above, an old count that was never reconciled; not a
  functional issue): all clean 200.
- No redirect chains/loops: no `new_path` value collides with any
  `old_path`, no staging-domain or absolute-URL leakage in the `.conf`, no
  overlap with the vhost's other location blocks.
- http→https and www→non-www: both canonicalize to `https://xgrcsoftware.com`
  in one hop, then the redirect map applies on top (2 hops total for an old
  `www` link — expected, terminates cleanly at 200, not a loop).

## Traffic-weighted review + gap pass — 2026-07-22

The traffic/backlink review flagged above as "not done" is now done, using a
12-month Google Search Console **Performance (Pages)** export and the **external
links (More sample links)** export.

**The 44 `/insights/` fallback tier is closed.** Reviewed against real traffic:
only `/category/occx/` (27 clicks) and `/category/xgrc-software/` (11 clicks)
draw meaningful clicks; the individual old posts in that tier have ~0 clicks.
`/insights/` is the correct like-for-like for WordPress category/archive
listings, so no re-routing was needed. Backlinks: the external-links export
shows every linked page is the homepage, a product page, or the mobile app —
**no old blog post carries backlink equity**, so recreation decisions were made
on evergreen topical value, not link preservation.

**Bigger finding — 86 traffic-drawing old URLs were missing from the map.** The
original map was built from the 294-URL *indexed-pages* export; the *Performance*
export surfaced 86 more old URLs that still receive impressions/clicks but had no
redirect, so they would soft-404 to the homepage (the SPA `try_files` fallback
serves `/index.html` with a 200 for unknown paths — confirmed). **79 were added**
to the map + `.conf` (same curated-keyword method; exact-match where a new
article exists, `/resources/` for old PDFs); 7 pure-junk paths were excluded
(WordPress `ubermenu` plugin assets, stray logo images). All tested: correct 301
to a 200 target, no chains. Map is now 264 → 343 rows.

**Two high-demand posts recreated as real articles** (turning their redirects
into 1:1 matches): `/2025/09/09/what-is-a-grc-software/` (640 impressions) →
`/insights/what-is-grc-software/`, and `/2020/04/25/the-five-risk-management-process-steps/`
(857 impressions) → `/insights/five-risk-management-process-steps/`. Drafts for
review; grounded in `solutionDetails`, no fabricated statistics.

**OCCX removed.** OCCX is a retired product, not in the solution stack. Removed
from the `src/data/site.js` comment and confirmed absent from the built site.
The two old OCCX URLs (`/category/occx/`, `OCCX-Infographic.pdf`) still redirect
to neutral pages (`/insights/`, `/solutions/`) that carry no OCCX branding — kept
to preserve the 27 clicks and avoid a soft-404. Flip these to hard-404 if the
retired URLs should disappear entirely.
