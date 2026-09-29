// Adds a real <lastmod> to every sitemap URL (SEO Fix Spec T6).
//
// "Real" means the date the page's visible content last changed, not the
// build date. After each build this hashes the <main> content of every page
// in the sitemap and compares it with a ledger (.seo-lastmod.json in the repo
// root, not committed: it records what was built from this folder). A page
// keeps its date until its content hash changes; then it gets today's date.
//
// A page seen for the first time is seeded from the best real date we have:
// an article's dateModified or date, otherwise the last git commit of the
// page's source file. Must be listed after @astrojs/sitemap in astro.config.
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));
const LEDGER = join(ROOT, '.seo-lastmod.json');

// Content only: <main>, without scripts, styles and build-generated names.
function contentHash(html) {
  const main = (html.match(/<main[\s\S]*<\/main>/) || [html])[0]
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/\sdata-astro-[a-z-]+(="[^"]*")?/g, '')
    .replace(/astro-[a-z0-9]{8}/g, '')
    .replace(/\/_astro\/[^"' )]+/g, '/_astro/')
    .replace(/href="([^"#?]*?)\/?([#?"])/g, 'href="$1$2') // a slash-only link change is not a content change
    .replace(/\s+/g, ' ');
  return createHash('sha256').update(main).digest('hex').slice(0, 16);
}

function gitDate(files) {
  const existing = files.filter((f) => existsSync(join(ROOT, f)));
  if (!existing.length) return null;
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...existing], { cwd: ROOT, encoding: 'utf8' }).trim();
    return out || null;
  } catch {
    return null;
  }
}

// Source files that hold a page's content, for the first-seen seed date.
function sourcesFor(path) {
  const clean = path.replace(/^\/|\/$/g, '');
  const parts = clean.split('/');
  const direct = clean === '' ? ['src/pages/index.astro'] : [`src/pages/${clean}.astro`, `src/pages/${clean}/index.astro`];
  if (direct.some((f) => existsSync(join(ROOT, f)))) return direct;
  if (parts[0] === 'use-cases') return ['src/data/useCaseRegistry.js'];
  if (parts[0] === 'legal' || parts[0] === 'trust') return ['src/data/legalContent.js'];
  if (parts[0] === 'whats-new') return ['src/data/whatsNew.js'];
  return ['src/data/site.js'];
}

async function articleDates() {
  try {
    const { articles } = await import(join(ROOT, 'src/data/site.js'));
    return Object.fromEntries(articles.map((a) => [`/insights/${a.slug}/`, a.dateModified || a.date]));
  } catch {
    return {};
  }
}

export default function sitemapLastmod() {
  return {
    name: 'xgrc-sitemap-lastmod',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const out = fileURLToPath(dir);
        const today = new Date().toISOString().slice(0, 10);
        const ledger = existsSync(LEDGER) ? JSON.parse(readFileSync(LEDGER, 'utf8')) : {};
        const articles = await articleDates();
        let changed = 0;
        let seeded = 0;

        for (const file of readdirSync(out).filter((f) => /^sitemap-\d+\.xml$/.test(f))) {
          const xml = readFileSync(join(out, file), 'utf8');
          const next = xml.replace(/<url><loc>([^<]+)<\/loc>(?:<lastmod>[^<]*<\/lastmod>)?/g, (m, loc) => {
            const path = new URL(loc).pathname;
            const htmlFile = join(out, path, 'index.html');
            if (!existsSync(htmlFile)) return m;
            const hash = contentHash(readFileSync(htmlFile, 'utf8'));
            const prev = ledger[path];
            let date;
            if (!prev) {
              date = articles[path] || gitDate(sourcesFor(path)) || today;
              seeded++;
            } else if (prev.hash !== hash) {
              date = today;
              changed++;
            } else {
              date = prev.date;
            }
            ledger[path] = { hash, date };
            return `<url><loc>${loc}</loc><lastmod>${date}</lastmod>`;
          });
          writeFileSync(join(out, file), next);
        }
        writeFileSync(LEDGER, JSON.stringify(ledger, null, 1) + '\n');
        logger.info(`lastmod: ${changed} changed, ${seeded} first seen, ledger ${LEDGER}`);
      },
    },
  };
}
