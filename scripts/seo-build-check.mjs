#!/usr/bin/env node
// SEO checks on a built site, before it goes live (SEO Fix Spec, Priority 1).
// Complements scripts/seo-check.sh, which tests a running server.
//   T3  no internal href to a page URL without a trailing slash
//       (and none to a redirect or a missing page)
//   T5  every .md file has a matching HTML page
//   T6  every sitemap URL is built, self-canonical and indexable; every
//       indexable page is in the sitemap; every URL has a lastmod
//   T7  every use-case page has at least 3 internal links pointing to it
// Usage: node scripts/seo-build-check.mjs [distDir]
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const dist = process.argv[2] || 'dist';
const SITE = 'https://xgrcsoftware.com';
const results = [];
const pass = (t, msg) => results.push(`PASS ${t} ${msg}`);
const fail = (t, msg) => results.push(`FAIL ${t} ${msg}`);

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const files = walk(dist);
const pageOf = (f) => '/' + relative(dist, f).split(sep).join('/').replace(/index\.html$/, '');
const pages = new Map(); // url path -> html
for (const f of files.filter((f) => f.endsWith('index.html'))) pages.set(pageOf(f), readFileSync(f, 'utf8'));

// Redirect sources from the single map (exact and pattern rules)
const conf = readFileSync(new URL('../deploy/nginx/redirects.conf', import.meta.url), 'utf8');
const exact = new Set([...conf.matchAll(/location = "?([^"\s{]+)"? \{/g)].map((m) => m[1]));
const patterns = [...conf.matchAll(/location ~\*? "?([^"\s{]+)"? \{/g)].map((m) => new RegExp(m[1]));
const isRedirect = (p) => exact.has(p) || patterns.some((r) => r.test(p));

// ---- T3: internal links ----------------------------------------------------
const inbound = new Map();
const noSlash = new Map();
const toRedirect = new Map();
const broken = new Map();
const note = (map, key, from) => { if (!map.has(key)) map.set(key, new Set()); map.get(key).add(from); };

for (const [from, html] of pages) {
  if (from === '/404.html' || from.startsWith('/preview/')) continue;
  for (const m of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
    let href = m[1].replace(/&amp;/g, '&');
    if (href.startsWith(SITE)) href = href.slice(SITE.length) || '/';
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const path = href.split(/[?#]/)[0];
    if (!path || path.startsWith('/api/') || path.startsWith('/cdn-cgi/')) continue;
    const isFile = /\.[a-z0-9]{2,5}$/i.test(path);
    if (isFile) {
      if (!existsSync(join(dist, decodeURIComponent(path)))) note(broken, path, from);
      continue;
    }
    if (!path.endsWith('/')) { note(noSlash, path, from); continue; }
    if (isRedirect(path)) { note(toRedirect, path, from); continue; }
    if (!pages.has(path)) { note(broken, path, from); continue; }
    if (path !== from) note(inbound, path, from);
  }
}
const report = (t, label, map) => {
  if (!map.size) return pass(t, `no internal links ${label}`);
  for (const [to, froms] of map) fail(t, `${label}: ${to}  (from ${[...froms].slice(0, 3).join(', ')}${froms.size > 3 ? ` +${froms.size - 3}` : ''})`);
};
report('T3', 'without a trailing slash', noSlash);
report('T3', 'to a redirect', toRedirect);
report('T3', 'to a missing page or file', broken);

// ---- T5: .md twins ---------------------------------------------------------
const mdFiles = files.filter((f) => f.endsWith('.md')).map((f) => '/' + relative(dist, f).split(sep).join('/'));
const orphans = mdFiles.filter((m) => !pages.has(m.replace(/\.md$/, '/')));
orphans.length ? orphans.forEach((m) => fail('T5', `${m} has no HTML page (it will be served with noindex)`))
  : pass('T5', `all ${mdFiles.length} .md files have an HTML page`);

// ---- T6: sitemap -----------------------------------------------------------
const smFiles = files.filter((f) => /sitemap-\d+\.xml$/.test(f));
const smUrls = smFiles.flatMap((f) => [...readFileSync(f, 'utf8').matchAll(/<url><loc>([^<]+)<\/loc>(<lastmod>[^<]+<\/lastmod>)?/g)]);
const inSitemap = new Set();
let t6 = 0;
for (const [, loc, lastmod] of smUrls) {
  const path = new URL(loc).pathname;
  inSitemap.add(path);
  const html = pages.get(path);
  if (!html) { fail('T6', `${path} in sitemap but not built`); t6++; continue; }
  const canon = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  if (canon !== SITE + path) { fail('T6', `${path} canonical is ${canon}`); t6++; }
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) { fail('T6', `${path} in sitemap but noindex`); t6++; }
  if (isRedirect(path)) { fail('T6', `${path} in sitemap but redirected`); t6++; }
  if (!lastmod) { fail('T6', `${path} has no lastmod`); t6++; }
}
for (const [path, html] of pages) {
  if (path === '/404.html' || path.startsWith('/preview/') || path.startsWith('/tour/')) continue;
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) continue;
  if (!inSitemap.has(path)) { fail('T6', `${path} is indexable but not in the sitemap`); t6++; }
}
if (!t6) pass('T6', `${smUrls.length} sitemap URLs built, self-canonical, indexable, with lastmod; no indexable page missing`);

// ---- T7: links to use-case pages -------------------------------------------
let t7 = 0;
for (const path of pages.keys()) {
  if (!/^\/use-cases\/[^/]+\/$/.test(path)) continue;
  const n = inbound.get(path)?.size || 0;
  if (n < 3) { fail('T7', `${path} has ${n} internal links pointing to it`); t7++; }
}
if (!t7) pass('T7', 'every use-case page has at least 3 internal links pointing to it');

console.log(results.join('\n'));
process.exit(results.some((r) => r.startsWith('FAIL')) ? 1 : 0);
