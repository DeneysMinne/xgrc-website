# Adding a new use case / ISO / regulatory / inspection page

Every `/use-cases/<slug>/` page (use cases, ISO readiness, regulatory
compliance, and inspection checklists) is generated from one registry:
`src/data/useCaseRegistry.js`. There is no per-page `.astro` file to create —
add a registry entry and a checklist (if the page has a downloadable
resource) and the site handles the rest.

## 1. Add a registry entry

Open `src/data/useCaseRegistry.js` and copy the shape of an existing entry in
the same category. Required fields:

| Field | Notes |
|---|---|
| `slug` | kebab-case, becomes `/use-cases/<slug>/` |
| `category` | one of `'Use Case'`, `'ISO Readiness'`, `'Regulatory'`, `'Inspection Checklist'` |
| `crumbLabel`, `heroEyebrow`, `title`, `metaDescription`, `h1`, `lede` | page copy |
| `relatedSolution` | a key from `solutionDetails` in `src/data/site.js` — must exist |
| `frameworks` | array of standard/framework tag strings |
| `problems`, `approach`, `howItWorks`, `manual`, `withXgrc`, `scope` | content arrays — see an existing entry for exact counts |
| `platformNote` | `{ title, body }` |
| `relatedUseCases` | array of other registry slugs for internal linking |
| `resource` | omit entirely if the page has no downloadable checklist (see below) |

Optional headline overrides (`problemHeadline`, `approachHeadline`,
`howItWorksHeadline`, `compareHeadline`, `ctaHeadline`, `ctaBody`,
`frameworksHeadline`, `scopeHeadline`) let you replace the layout's generic
section headings with page-specific copy — set these for anything user-facing
that should read as written-for-this-page rather than templated.

Ground copy in real product capability: check `solutionDetails[relatedSolution].moduleGroups`
in `site.js` before claiming a feature exists. Follow the brand and tone
rules in the original content brief (correct trademark forms — XGRC®,
SHEQX®, MSX®, ENVIRX®, XGRC Compliance Hub, MSXCyber, MAIA, XLOGIC® — no
buzzwords, no invented capabilities). Note: standard/regulation names like
ISO 27001, GDPR, POPIA, PAIA and King V are **not** XGRC trademarks — never
put a ® after them.

## 2. Add the checklist (if the page has a downloadable resource)

If your registry entry includes a `resource` block:

1. Set `resource.checklistSlug` (e.g. `my-page-checklist`) and
   `resource.pdfPath` to `/resources/xgrc-<checklistSlug>-v1-0.pdf`.
2. Create `src/content/checklists/<checklistSlug>.json`:
   ```json
   {
     "slug": "my-page-checklist",
     "title": "My Page Checklist",
     "subtitle": "One-line description",
     "isoTags": ["ISO 9001"],
     "intro": "1-2 sentence intro in a plain, practical voice.",
     "sections": [
       { "letter": "A", "title": "Section Name", "items": ["Practical, specific item", "..."] }
     ],
     "version": "v1.0",
     "classification": "Public"
   }
   ```
   Framework-readiness checklists: 6-8 sections, 4-5 items each, organised by
   the standard's real clause structure. Inspection checklists: 8-10 groups,
   4-5 field-level yes/no questions each. Items must be concrete and testable
   ("Are fire extinguishers accessible, inspected, and within service date?"),
   never generic ("Is safety managed properly?").
3. Generate the PDF:
   ```
   npm run generate-pdfs
   ```
   This regenerates every checklist under `src/content/checklists/` into
   `public/resources/`. Existing legacy checklists (the original 8, with
   `pdfPath` at the site root, not under `/resources/`) have no JSON file and
   are skipped automatically — never delete or rename those PDFs.

## 3. Validate and build

```
npm run validate-content   # checks the registry for missing fields, broken
                            # links, and missing PDFs — fix everything it flags
npm run build               # full Astro build
```

## 4. Update landing pages (usually automatic)

`/use-cases/`, `/use-cases/iso-compliance/`, `/use-cases/regulatory-compliance/`,
`/resources/`, and `/resources/inspection-checklists/` all read directly from
`useCaseRegistry` and filter by `category` — a new entry appears on the
correct landing page automatically. No manual edit needed unless you're
adding a new category.

## 5. Gated download

The download modal, lead-capture form, and PDF delivery are handled generically
by `src/layouts/UseCaseLayout.astro` for any entry with a `resource` block —
nothing to wire up per page. It posts to `/api/demo` (see `form-handler/app.py`)
with the resource title and PDF URL, then triggers the download immediately
regardless of email delivery success.
