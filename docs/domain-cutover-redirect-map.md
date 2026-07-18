# Domain cutover redirect map

Source data: Google Search Console → Page indexing → Indexed pages export for
`xgrcsoftware.com`, 294 URLs, exported 2026-07-18 (last GSC crawl data point:
2026-07-10). This is every URL Google currently has indexed on the live
WordPress site — the set that needs a landing place, or it 404s on launch day
and both users and rankings take the hit.

## Files

- `domain-cutover-redirect-map.csv` — every URL requiring a redirect: old
  path, new path, and the reason it was routed there. 264 rows.
- `domain-cutover-redirects.conf` — the same data as ready-to-use nginx
  `location =` blocks. Drop inside the production `xgrcsoftware.com` server
  block, **before** the SPA `try_files` fallback, so these take priority.

30 of the 294 URLs need **no redirect at all** — they're not in either file:
the homepage, the 12 solution pages that already live at the same path on
the new site (`/sheqx/`, `/msx/`, etc.), the 3 static pages that already
match (`/contact/`, `/customers/`, `/solutions/`), 2 already covered by an
existing nginx rule (`/compliancehub/`, `/pix/`), and all 14 legal/trust
document paths — the new site's legal section was deliberately built to
reuse the old site's exact URLs, so those need nothing.

## How the 264 were resolved

1. **21 exact matches** — old blog post slug is byte-identical to a slug in
   the new Insights section → `/insights/{slug}/`.
2. **7 curated fuzzy matches** — old slug differs slightly (typo, trailing
   `-2`, mangled date, reworded title) from a new article but is clearly the
   same piece — reviewed by hand, not just a string-similarity score.
   Example: `iso-31000-vs-coso-key-erm-framework-differences-xgrc` →
   `/insights/iso-31000-vs-coso-key-erm-framework-differences/`.
3. **1 renamed solution** — `/cyber-security/` → `/msxcyber/`.
4. **1 renamed legal doc** — `/privacy-policy-and-eula/` → `/legal/privacy-policy/`.
5. **26 WordPress structural pages** — category archives (`/category/*`) and
   pagination (`/latest-news/page/N/`) have no equivalent concept on the new
   site → `/insights/`.
6. **22 old PDF media-library uploads** — matched against the new site's
   actual PDF inventory where one exists (e.g. `PPLE-Case-Study.pdf` →
   `/case-studies/pple-group.pdf`, which really exists); otherwise sent to
   the relevant solution page. **The old infographics/booklets themselves
   are not being recreated** — this just stops the old links from 404ing.
7. **8 static pages with no direct new equivalent** — judgment calls, e.g.
   `/internal-audit-software/` → `/use-cases/internal-audit/`,
   `/become-a-partner/` → `/contact/`, `/release-notes/` → `/` (no marketing
   equivalent exists; release notes are an in-app XRM feature).
8. **~180 orphaned blog posts** (no matching new article) — keyword-routed
   to the most topically relevant solution or use-case page (e.g. anything
   with "sheq"/"safety"/"ppe" → `/sheqx/`, anything ERM/risk-themed →
   `/erm/`), with named customer case-study posts (Servest, TN Ceramics,
   Kintetsu, etc.) routed to `/customers/` ahead of generic keywords.
   **44 of these had no confident topic match and fall back to `/insights/`**
   — mostly the category/pagination URLs above plus genuinely generic posts
   (COVID-era commentary, "business trends" pieces, etc.).

## What this is not

This is a first-pass, keyword-driven map, not a page-by-page editorial
review of all 264 posts. The exact/curated article matches (29 rows) and the
solution/legal renames are high-confidence. The ~180 keyword-routed
orphans are a reasonable default, not a guarantee that every single one
landed on the *best possible* page — spot-check the `/sheqx/`, `/erm/`,
`/esg/`, and `/msxcyber/` buckets (the largest) if time allows before launch.
None of them are wrong in the sense of landing somewhere irrelevant; some
may just be a notch more generic than a human editor would choose.

## Before applying

- This `.conf` file is not wired into any server block yet — the production
  `xgrcsoftware.com` nginx config doesn't exist yet either (see the domain
  cutover project notes).
- Test a sample of these redirects against a real request once the
  production server block exists, before pointing DNS.
