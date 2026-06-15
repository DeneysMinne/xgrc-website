# XGRC Software website

A fast, content-first marketing site built with [Astro](https://astro.build). Static output, so it deploys cleanly anywhere and never has the single-page-app routing problems of the old build.

## What's here

- `src/pages/` — one file per route. The filename is the URL. `index.astro` is the home page.
- `src/components/` — `Nav`, `Footer`, and `Hero` (the interactive "Living Architecture" network on canvas).
- `src/layouts/Base.astro` — the shared HTML shell (fonts, nav, footer) that every page uses.
- `src/styles/global.css` — the design system. Colours, spacing, buttons, cards. Edit here to restyle the whole site. Green = action (buttons). Cyan/blue = the architecture.
- `src/data/site.js` — all the content (nav, solutions, customers, articles, team, milestones). Edit copy here once and it flows everywhere.
- `public/assets/` — drop logos, images and PDFs here. Reference them as `/assets/your-file.png`.

## Run it locally

You need Node.js 18.20.8+ or 20.3+ (a current LTS is fine).

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:4321). Edits save and refresh instantly.

To check the production build:

```bash
npm run build      # outputs to dist/
npm run preview    # serves the built site
```

## Deploy (recommended: Vercel)

1. Push this folder to a GitHub repository.
2. In Vercel, "Add New Project" and import that repo.
3. Vercel detects Astro automatically. No settings needed. Click Deploy.
4. Every branch and pull request gets its own preview URL, so your team can test before anything goes live.

Netlify and Cloudflare Pages work the same way.

## Things to fill in

- **Logos and images** into `public/assets`, then reference them in the components.
- **About > timeline**: real milestones in `src/data/site.js` (`milestones`).
- **About > team**: real names and superpowers in `src/data/site.js` (`people`, currently 21 placeholders).
- **Legal Hub**: paste the verbatim Privacy Policy, EULA and SaaS terms into `src/pages/legal-hub.astro` (or split into sub-pages).
- **Resources**: wire the download links to the real files.

## Notes

- The hero animation is plain canvas, no heavy libraries, and respects "reduce motion" accessibility settings.
- Nothing uses browser storage, so it works in any environment.
